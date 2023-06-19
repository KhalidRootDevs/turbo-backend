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




const signIn = async (userInfo) => {
  try {
    const { email, password } = userInfo;

    const existingUser = await prisma.User.findUnique({
      where: {
        email,
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
        const userWithoutPassAndSalt = Exclude(existingUser, [
          "password",
          "salt",
        ]);
        return FormateData({
          accessToken: token,
          admin: userWithoutPassAndSalt,
        });
      }
    }

    return FormateData(null);
  } catch (error) {
    throw error;
  }
};

const getAdminProfile = async (adminInfo) => {
  try {
    const { adminId } = adminInfo;

    const admin = await prisma.User.findUnique({
      where: {
        id: adminId,
      },
    });

    const adminDetails = Exclude(admin, ["password", "salt"]);
    return FormateData(adminDetails);
  } catch (error) {
    throw error;
  }
};

const updateAdminProfile = async (updateInfo) => {
  const { id, updatedData } = updateInfo;

  try {
    const user = await prisma.User.update({
      where: {
        id,
      },
      data: {
        name: updatedData?.name,
        email: updatedData?.email,
        image: updatedData?.image,
      },
    });

    const updatedUser = Exclude(user, ["password", "salt"]);

    return FormateData(updatedUser);
  } catch (error) {
    throw error;
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await prisma.User.findMany({
      where: {
        adminType: {
          in: ["superAdmin", "admin", "subAdmin"],
        },
      },
    });
    const adminsWithoutPassword = ExcludeMany(admins, ["password", "salt"]);

    return FormateData(adminsWithoutPassword);
  } catch (error) {
    throw error;
  }
};

const getSingleAdminDetails = async (adminInfo) => {
  try {
    const { adminId } = adminInfo;

    const adminDetails = await prisma.User.findUnique({
      where: {
        id: adminId,
      },
    });

    const updatedAdminDetails = Exclude(adminDetails, ["password", "salt"]);
    return FormateData(updatedAdminDetails);
  } catch (error) {
    throw error;
  }
};

const updateSingleAdminDetails = async (adminInfo) => {
  try {
    const { adminId, updatedData } = adminInfo;

    const adminDetails = await prisma.User.update({
      where: {
        id: adminId,
      },
      data: {
        name: updatedData?.name,
        email: updatedData?.email,
        adminType: updatedData?.adminType,
        status: updatedData?.status,
        image: updatedData?.image,
      },
    });

    const updatedAdminDetails = Exclude(adminDetails, ["password", "salt"]);
    return FormateData(updatedAdminDetails);
  } catch (error) {
    throw error;
  }
};

const deleteSingleAdminDetails = async (adminInfo) => {
  try {
    const { adminId } = adminInfo;

    const adminDetails = await prisma.User.delete({
      where: {
        id: adminId,
      },
    });

    return FormateData(adminDetails?.id);
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.User.findMany();

    const usersWithoutPassword = ExcludeMany(users, ["password", "salt"]);
    return FormateData(usersWithoutPassword);
  } catch (error) {
    throw error;
  }
};

const getSingleUserDetails = async (adminInfo) => {
  try {
    const { userId } = adminInfo;

    const admin = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    const userDetails = Exclude(admin, ["password", "salt"]);
    return FormateData(userDetails);
  } catch (error) {
    throw error;
  }
};

const deleteSingleUserDetails = async (adminInfo) => {
  try {
    const { userId } = adminInfo;

    const user = await prisma.User.delete({
      where: {
        id: userId,
      },
    });

    return FormateData(user?.id);
  } catch (error) {
    throw error;
  }
};

const updateSingleUserDetails = async (userInfo) => {
  try {
    const { userId, userData } = userInfo;
    const user = await prisma.User.update({
      where: {
        id: userId,
      },
      data: {
        name: userData?.name,
        email: userData?.email,
        adminType: userData?.adminType,
        status: userData?.status,
        image: userData?.image,
      },
    });

    const updatedUserDetails = Exclude(user, ["password", "salt"]);
    return FormateData(updatedUserDetails);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signIn,
  getAdminProfile,
  updateAdminProfile,
  getAllAdmins,
  getSingleAdminDetails,
  updateSingleAdminDetails,
  deleteSingleAdminDetails,
  getAllUsers,
  getSingleUserDetails,
  updateSingleUserDetails,
  deleteSingleUserDetails,
};
