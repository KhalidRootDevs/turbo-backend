const { APIError } = require("../utils/app-error");
const prisma = require("../../prisma");
const {
  GeneratePassword,
  GenerateSignature,
  GenerateSalt,
  FormateData,
  ValidatePassword,
  ExcludeMany,
  Exclude,
} = require("../utils");

//User Signup
const SignUp = async (userInputs) => {
  try {

    const existingUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).send({ message: "Email already exists" });
    }

    // create salt
    let salt = await GenerateSalt();

    let hashedPassword = await GeneratePassword(password, salt);

    //create user
    const user = await prisma.User.create({
      data: {
        name: userInputs?.name,
        email: userInputs?.email,
        password: hashedPassword,
        adminType: userInputs?.adminType,
        salt: salt,
      },
    });


    //generate jwt token
    const token = await GenerateSignature({
      email: user.email,
      id: user._id,
      adminType: user.adminType,
    });

    const userWithoutPassAndSalt = Exclude(user, ['password', 'salt']);

    //return final user data
    return FormateData({ accessToken: token, user: userWithoutPassAndSalt  });
  } catch (err) {
    throw new APIError("Failed to create user", err);
  }
};

//User Signin
const SignIn = async (userInfo) => {
  try {
    const { email, password } = userInfo;

    const existingUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );

      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          id: existingUser.id,
          adminType: existingUser.adminType,
        });
        const userWithoutPassAndSalt = Exclude(existingUser, ['password', 'salt']);
        return FormateData({ accessToken: token, user: userWithoutPassAndSalt  });
      }
    }

    return FormateData(null);
  } catch (err) {
    throw new APIError("Invalid User Credentials", err);
  }
};

//Admin - User Profile (Both)
const GetProfile = async (id) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });

    const userWithoutPasswordAndSalt = Exclude(user, ['password', 'salt']);

    return FormateData(userWithoutPasswordAndSalt);
  } catch (err) {
    throw new APIError("User Not found", err);
  }
};


module.exports = {
  SignUp,
  SignIn,
  GetProfile
};
