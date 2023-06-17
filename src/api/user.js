const prisma = require('../../prisma/index.js');
const { SignUp, SignIn, GetProfile, GetAllUsers, UpdateUserRole } = require('../services/user-service.js');
// const userAuth = require('./middleware/userAuth.js');
const {userAuth, userAuthorization} = require('./middleware/userAuth');

module.exports = (app) => {
    
  //User SignUp
    app.post("/user/signup", async (req, res, next) => {
      try {
        const { name, email, password, adminType } = req.body;
        const data  = await SignUp({name, email, password, adminType });
     
        res.json({
            message: "User signed up successfully",
            data
        })
      } catch (err) {
        next(err);
      }
    });

    //Admin - Admin Signin
    app.post("/user/signin", async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const  data  = await SignIn({ email, password });
        
        res.json({
          message: "User signed in successfully",
          data
        })
      } catch (err) {
        next(err);
      }
    });

    //Admin - Get Single User Profile
    app.get("/user/profile", userAuth, async (req, res, next) => {
      try {
        const { id } = req.user;
        const data  = await GetProfile(id);
        return res.json({
          message: "User profile found",
          data
        });
      } catch (err) {
        next(err);
      }
    });


    // //User - Update Single User Details
    // app.get("/user/:id", userAuth, async (req, res, next) => {
    //   try {
    //     const { id } = req.params;
    //     const data  = await GetProfile(id);
    //     return res.json({
    //       message: "User profile found",
    //       data
    //     });
    //   } catch (err) {
    //     next(err);
    //   }
    // });


}


