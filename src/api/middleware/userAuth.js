const { ValidateSignature } = require("../../utils");

const userAuth = async (req, res, next) => {
  try {
    const isSignatureValid = await ValidateSignature(req);

    console.log("IsAuthorized", isSignatureValid);

    if (isSignatureValid) {
      return next();
    }

    return res.status(403).json({ message: "Please log in first" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userAuthorization = (req, res, next) => {
  const { adminType } = req.user;

  if (adminType === "superAdmin" || adminType === "admin" || adminType === "subAdmin") {
    return next();
  }

  return res.status(403).json({ message: "Your credentials are not authorized" });
};

module.exports = {
  userAuth,
  userAuthorization,
};
