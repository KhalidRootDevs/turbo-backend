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

    //Admin - Get Admin Profile
    app.get("/user/profile", userAuth, userAuthorization, async (req, res, next) => {
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

    //Admin - Manage All Users
    app.get("/users", userAuth, userAuthorization, async (req, res, next) => {
      try {

        const data = await GetAllUsers();
        res.json({
          message: "All users are fetched successfully",
          data: data
        })
      } catch (err) {
        next(err);
      }
    });

    //Admin - Get Single User Details
    app.get("/user/:id", userAuth, userAuthorization, async (req, res, next) => {
      try {
        const { id } = req.params;
        const data  = await GetProfile(id);
        return res.json({
          message: "User profile found",
          data
        });
      } catch (err) {
        next(err);
      }
    });

    //Admin - Update single user profile
    app.put("/user/:id", userAuth, userAuthorization, async (req, res, next) => {
      try {
        const { id } = req.params;
        const { adminType } = req.body;

        const data  = await UpdateUserRole({ id, adminType });
        return res.json({
          message: "User role updated successfully",
          data
        });
      } catch (err) {
        next(err);
      }
    });

}


