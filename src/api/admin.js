
const { 
    UpdateProfile, GetAllAdmins, 
    GetSingleAdminDetails, UpdateSingleAdminDetails, 
    DeleteSingleAdminDetails, GetSingleUserDetails, 
    DeleteSingleUserDetails, UpdateSingleUserDetails } 
    = require("../services/admin-services.js");
const {
    SignIn,
    GetProfile,
    GetAllUsers,
    UpdateUserRole,
} = require("../services/user-service.js");
// const userAuth = require('./middleware/userAuth.js');
const { userAuth, userAuthorization } = require("./middleware/userAuth");

module.exports = (app) => {
    //Admin - Admin Signin
    app.post("/admin/signin", async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await SignIn({ email, password });

            res.json({
                message: "User signed in successfully",
                data,
            });
        } catch (err) {
            next(err);
        }
    });

    //Admin - Get Admin Profile
    app.get(
        "/admin/profile",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const { id } = req.user;
                const data = await GetProfile(id);
                return res.json({
                    message: "User profile found",
                    data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Edit Admin Profile
    app.put(
        "/admin/profile",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const { id } = req.user;
                const updatedData = req.body;
                const data = await UpdateProfile({ id, updatedData });
                return res.json({
                    message: "Admin profile updated successfully",
                    data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    // //Admin - Logut
    // app.get("/admin/logout", userAuth, userAuthorization, async (req, res, next) => {
    //     try {
    //         console.log(req.logout())
    //         // req.logout();
    //         // req?.session.destroy();
    //         // return res.json({
    //         //     message: "Admin logged out successfully",
    //         // });
    //     } catch (err) {
    //         next(err);
    //     }
    // });


    //Admin - Manage All Admins
    app.get(
        "/admin/admins",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const data = await GetAllAdmins();
                res.json({
                    message: "All admins are fetched successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Get Single Admin Details
    app.get(
        "/admin/details/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const adminId = req.params.id;

                const data = await GetSingleAdminDetails({ adminId });

                res.json({
                    message: "Admin details is fetched successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Update Single Admin Details
    app.put(
        "/admin/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const adminId = req.params.id;
                const updatedData = req.body;

                const data = await UpdateSingleAdminDetails({ adminId, updatedData });

                res.json({
                    message: "Admin details is updated successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Delete Single Admin Details
    app.delete(
        "/admin/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const adminId = req.params.id;

                const data = await DeleteSingleAdminDetails({ adminId });

                res.json({
                    message: "Admin details is deleted successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );


    //Admin - Get All Users
    app.get(
        "/admin/users",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const data = await GetAllUsers();
                res.json({
                    message: "All users are fetched successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Get Single User Details
    app.get(
        "/admin/user/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const userId = req.params.id;

                const data = await GetSingleUserDetails({ userId });

                res.json({
                    message: "User details is fetched successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

     //Admin - Update Single User Details
     app.put(
        "/admin/user/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const userId = req.params.id;
                const userData = req.body;

                const data = await UpdateSingleUserDetails({ userId, userData });

                res.json({
                    message: "User details is updated successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );

    //Admin - Delete Single User Details
    app.delete(
        "/admin/user/:id",
        userAuth,
        userAuthorization,
        async (req, res, next) => {
            try {
                const userId = req.params.id;

                const data = await DeleteSingleUserDetails({ userId });

                res.json({
                    message: "User details is deleted successfully",
                    data: data,
                });
            } catch (err) {
                next(err);
            }
        }
    );


};


