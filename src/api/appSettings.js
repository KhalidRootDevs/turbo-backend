const { CreateSettings, GetAllSettings, UpdateSettings } = require('../services/appSettings-services');


const { userAuth, userAuthorization } = require('./middleware/userAuth');
    
    module.exports = app => {

        // Create initial settings  (One Time)

        app.post(
            '/settings',
            userAuth,
            userAuthorization,
            async (req, res, next) => {
                const appSettingsData = req.body;
                const API_KEY =  req.headers.api_key
                if(API_KEY !== process.env.API_KEY) {
                    res.json({
                        message: 'Invalid API key Or API key is not found'
                    })
                }
                const data = await CreateSettings({ appSettingsData });
    
                res.json({
                    message: 'App settings created successfully',
                    data: data
                });
            }
        );
    
        //Get all settings
        app.get(
            '/settings',
            userAuth,
            userAuthorization,
            async (req, res, next) => {
                const API_KEY =  req.headers.api_key
                if(API_KEY !== process.env.API_KEY) {
                    res.json({
                        message: 'Invalid API key Or API key is not found'
                    })
                }
                const data = await GetAllSettings();
                res.json({
                    message: 'All settings fetched successfully',
                    data: data
                });
            }
        );
    
        //Update settings
        app.put(
            '/settings',
            userAuth,
            userAuthorization,
            async (req, res, next) => {
                const updatedAppSettingsData = req.body;
                const API_KEY =  req.headers.api_key
                if(API_KEY !== process.env.API_KEY) {
                    res.json({
                        message: 'Invalid API key Or API key is not found'
                    })
                }
                const data = await UpdateSettings(updatedAppSettingsData);
                res.json({
                    message: 'All settings updated successfully',
                    data: data
                });
            }
        );
    };


