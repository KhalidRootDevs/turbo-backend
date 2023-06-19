const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const APP_SECRET = process.env.APP_SECRET;

// Utility functions
module.exports.generateSalt = async () => {
  return bcrypt.genSalt();
};

module.exports.generatePassword = async (password, salt) => {
  return bcrypt.hash(password, salt);
};

module.exports.validatePassword = async (enteredPassword, savedPassword, salt) => {
  const hashedPassword = await this.generatePassword(enteredPassword, salt);
  return hashedPassword === savedPassword;
};

module.exports.generateSignature = async (payload) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw new Error("Failed to generate signature.");
  }
};

module.exports.validateSignature = async (req) => {
  try {
    const signature = req.headers.authorization;
    if (!signature) {
      throw new Error("Authorization token is missing.");
    }

    const token = signature.split(" ")[1];
    const payload = await jwt.verify(token, APP_SECRET);
    req.user = payload;
  } catch (error) {
    throw new Error("Failed to validate signature.");
  }
};

module.exports.excludeMany = (users, keys) => {
  if (!Array.isArray(users)) {
    throw new Error("Users must be an array.");
  }

  for (let user of users) {
    for (let key of keys) {
      delete user[key];
    }
  }

  return users;
};

module.exports.exclude = (user, keys) => {
  if (typeof user !== "object" || Array.isArray(user)) {
    throw new Error("User must be an object.");
  }

  for (let key of keys) {
    delete user[key];
  }

  return user;
};

module.exports.formatData = (data) => {
  if (data) {
    return data;
  } else {
    throw new Error("Data not found.");
  }
};

module.exports.updateObject = (oldObject, newObject) => {
  if (typeof oldObject !== "object" || typeof newObject !== "object") {
    throw new Error("Both oldObject and newObject must be objects.");
  }

  for (let key in oldObject) {
    if (newObject.hasOwnProperty(key)) {
      oldObject[key] = newObject[key];
    }
  }

  return oldObject;
};
