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
        return FormateData({ accessToken: token, admin: userWithoutPassAndSalt  });
      }
    }

    return FormateData(null);
  } catch (err) {
    throw new APIError("Invalid User Credentials", err);
  }
};

// Admin - Get Single Admin/SubAdmin Profile
const GetAdminProfile = async (adminInfo) => {
    
    try{
        const { adminId } = adminInfo;

    const admin = await prisma.User.findUnique({
        where: {
            id: adminId
        }
    })

    const adminDetails = Exclude(admin, ['password', 'salt']);
    return FormateData(adminDetails);

    } catch (error) {
        throw new APIError("Failed to find admin details", error);
      }
    
  }


//Admin - Update Admin Profile
const UpdateAdminProfile = async (updateInfo) => {

    const { id, updatedData } = updateInfo;

    try {
      const user = await prisma.User.update({
        where: {
          id: id,
        },
        data: {
            name: updatedData?.name,
            email: updatedData?.email,
            image: updatedData?.image
        }
      });
  
      const updatedUser = Exclude(user, ['password', 'salt']);
  
      return FormateData(updatedUser);
    } catch (err) {
      throw new APIError("User Not found", err);
    }
  };


//Admin - Manage Admin 
// ---- Get All Admins
const GetAllAdmins = async () => {
    try {
      const admins = await prisma.User.findMany({
        where: {
           OR:[
            {
                adminType: 'superAdmin',
            },
            {
                adminType: 'admin',
            },
            {
               adminType: 'subAdmin' 
            }
           ]
        }
      });
      const adminsWithoutPassword = ExcludeMany(admins, ["password", "salt"]);
  
      return FormateData(adminsWithoutPassword);
    } catch (error) {
      throw new APIError("Failed to find admins", error);
    }
  };

  //Admin - Manage Admin 

// --- Update Single Admin/SubAdmin Details
const GetSingleAdminDetails = async (adminInfo) => {
    
  try{

      const { adminId } = adminInfo;

      const adminDetails = await prisma.User.findUnique({
          where: {
            id: adminId
          }
      })

  const updatedAdminDetails = Exclude(adminDetails, ['password', 'salt']);
  return FormateData(updatedAdminDetails);

  } catch (error) {
      throw new APIError("Failed to find admin details", error);
    }
  
}


  // --- Update Single Admin/SubAdmin Details
  const UpdateSingleAdminDetails = async (adminInfo) => {
    
    try{
        const { adminId, updatedData } = adminInfo;

        const adminDetails = await prisma.User.update({
            where: {
                id: adminId
            },
            data: {
                name: updatedData?.name,
                email: updatedData?.email,
                adminType: updatedData?.adminType,
                status: updatedData?.status,
                image: updatedData?.image
            }
        })

    const updatedAdminDetails = Exclude(adminDetails, ['password', 'salt']);
    return FormateData(updatedAdminDetails);

    } catch (error) {
        throw new APIError("Failed to find admin details", error);
      }
    
  }

  //Admin - Manage Admin 
  // --- Delete Single Admin/SubAdmin Details
  const DeleteSingleAdminDetails = async (adminInfo) => {
    
    try{
        const { adminId } = adminInfo;

    const adminDetails = await prisma.User.delete({
        where: {
            id: adminId
        }
    })

    return FormateData(adminDetails?.id);

    } catch (error) {
        throw new APIError("Failed to delete admin details", error);
      }
    
  }

//Admin - Manage Admin 
// --- Get All users
const GetAllUsers = async () => {
  try {
    const users = await prisma.User.findMany();

    const usersWithoutPassword = ExcludeMany(users, ["password", "salt"]);
    return FormateData(usersWithoutPassword);

  } catch (error) {
    throw new APIError("Failed to find users", error);
  }
};

  //Admin - Manage Admin 
  // --- Get Single User Details
  const GetSingleUserDetails = async (adminInfo) => {
    
    try{
        const { userId } = adminInfo;

    const admin = await prisma.User.findUnique({
        where: {
            id: userId
        }
    })

    const userDetails = Exclude(admin, ['password', 'salt']);
    return FormateData(userDetails);

    } catch (error) {
        throw new APIError("Failed to find admin details", error);
      }
    
  }

    //Admin - Manage Admin 
  // --- Get Single User Details
  const DeleteSingleUserDetails = async (adminInfo) => {
    
    try{
        const { userId } = adminInfo;

    const user = await prisma.User.delete({
        where: {
            id: userId
        }
    })

    return FormateData(user.id);

    } catch (error) {
        throw new APIError("Failed to delete user", error);
      }
    
  }

      //Admin - Manage Admin 
  // --- Get Single User Details
  const UpdateSingleUserDetails = async (userInfo) => {
    
    try{
    
    const { userId, userData } = userInfo;
    const user = await prisma.User.update({
        where: {
            id: userId
        },
        data: {
            name: userData?.name,
            email: userData.email,
            adminType: userData?.adminType,
            status: userData?.status,
            image: userData?.image

        }
    })

    const updatedUserDetails = Exclude(user, ['password', 'salt']);
    return FormateData(updatedUserDetails);


    } catch (error) {
        throw new APIError("Failed to update user", error);
      }
    
  }




module.exports = {
  SignIn,
  GetAdminProfile,
  UpdateAdminProfile,
  GetAllAdmins,
  GetSingleAdminDetails,
  UpdateSingleAdminDetails,
  DeleteSingleAdminDetails,
  GetAllUsers,
  GetSingleUserDetails,
  UpdateSingleUserDetails,
  DeleteSingleUserDetails,
};
