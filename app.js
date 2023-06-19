const express = require('express');
const cors = require('cors');
const adminRouter = require('./src/api/admin.js');
const appSettingsRouter = require('./src/api/appSettings.js');
const matchRouter = require('./src/api/match.js');
const userRouter = require('./src/api/user.js');
const errorHandler = require('./utils/error-handler');

const expressApp = (app) => {
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    // API routes
    app.use('/admin', adminRouter);
    app.use('/appsettings', appSettingsRouter);
    app.use('/match', matchRouter);
    app.use('/user', userRouter);

    // Error handling middleware
    app.use(errorHandler);
};

module.exports = expressApp;
