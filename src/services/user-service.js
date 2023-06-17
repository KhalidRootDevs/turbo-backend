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
    const { name, email, password, adminType = "user" } = userInputs;
    //console.log(userInputs)
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
        name,
        email,
        password: hashedPassword,
        adminType,
        salt,
      },
    });

    //generate jwt token
    const token = await GenerateSignature({
      email: user.email,
      id: user._id,
      adminType: user.adminType,
    });

    //return final user data
    return FormateData({ id: user._id, token });
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
        return FormateData({ id: existingUser.id, token });
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

    const userWithoutPassword = Exclude(user, ['password']);

    return FormateData(userWithoutPassword);
  } catch (err) {
    throw new APIError("User Not found", err);
  }
};

//Admin - Manage all users
const GetAllUsers = async () => {
  try {
    const users = await prisma.User.findMany();
    const usersWithoutPassword = ExcludeMany(users, ["password"]);

    return FormateData(usersWithoutPassword);
  } catch (error) {
    throw new APIError("Failed to find users", error);
  }
};

//Admin - Update user role
const UpdateUserRole = async (updatedData) => {
  const { id, adminType: updatedInfo } = updatedData;

  try {
    const user = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        adminType: updatedInfo,
      },
    });

    const { password, hashedPassword, ...userInfo } = user;
    return FormateData(userInfo);
  } catch (error) {
    throw new APIError("Failed to find users", error);
  }
};

module.exports = {
  SignUp,
  SignIn,
  GetProfile,
  GetAllUsers,
  UpdateUserRole,
};
