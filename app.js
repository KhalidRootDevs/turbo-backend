
const express = require('express');
const cors = require('cors');
const user = require('./src/api/user.js');
const admin = require('./src/api/admin.js');
const manageMatch = require('./src/api/match.js');
const manageAppSettings = require('./src/api/appSettings.js');
// const HandleErrors = require('./utils/error-handler')

 const expressApp = async (app) => {

    // middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    // app.use(express.json({ limit: '1mb'}));
    // app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    // app.use(cors());
    // app.use(express.static(__dirname + '/public'))

    // //api
    user(app);
    admin(app);
    manageMatch(app);
    manageAppSettings(app);

    // // error handling
    // app.use(HandleErrors);
    
}

module.exports = expressApp;