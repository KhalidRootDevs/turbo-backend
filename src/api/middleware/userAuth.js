const { ValidateSignature } = require("../../utils");

const userAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);

  console.log("IsAuthorized", isAuthorized);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: "Please do login first" });
};

const userAuthorization = async (req, res, next) => {
  if (
    req.user.adminType === "superAdmin" ||
    req.user.adminType === "admin" ||
    req.user.adminType === "subAdmin"
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Your crtedentials are not authorized" });
};

module.exports = {
  userAuth,
  userAuthorization,
};
