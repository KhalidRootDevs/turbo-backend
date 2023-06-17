const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const  APP_SECRET  = process.env.APP_SECRET;

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    //const signature = req.get("Authorization"); //Another way from direct Authorization 
    const signature = req.headers.authorization;  //Taking auth token from headers
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.ExcludeMany = async (users, keys) => {

  let allUsers = [];
  users?.map(user => {
      for (let key of keys) {
          delete user[key];
      }
      allUsers.push(user);
  });
  return allUsers;
  
}

// function exclude(user, keys) {
//   for (let key of keys) {
//       delete user[key];
//   }
//   return user;
// }


module.exports.Exclude =  (user, keys) => {
  for(let key of keys) {
    delete user[key];
  }
  return user;
}



module.exports.FormateData = (data) => {
  if (data) {
    return data;
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.UpdateObject = (oldObject, newObject) => {
 // console.log('inside helper func', oldObject);
  const newData = Object?.entries(oldObject);
  newData.forEach(item => {
      const key = item[0];
      const value = item[1];

      if (newObject.hasOwnProperty(key)) {
          oldObject[key] = newObject[key];
      }
  });
  return oldObject;
};
