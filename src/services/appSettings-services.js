const { APIError } = require('../utils/app-error');
const prisma = require('../../prisma');
const { FormateData, UpdateObject } = require('../utils');

const CreateSettings = async ({appSettingsData}) => {
    
    let newAndroidSettingsData = { ...appSettingsData.androidSettings };
    let newIosSettingsData = { ...appSettingsData.iosSettings };


    try {
        const createdAppSettings = await prisma.AppSettings.create({
            data: {
                notificationType: appSettingsData?.notificationType,
                oneSignalAppID: appSettingsData?.oneSignalAppID,
                oneSignalApiKey: appSettingsData?.oneSignalApiKey,
                firebaseServerKey: appSettingsData?.firebaseServerKey,
                firebaseTopics: appSettingsData?.firebaseTopics,
                sportsApiBasedUrl: appSettingsData?.sportsApiBasedUrl,
                sportsApiKey: appSettingsData?.sportsApiKey,
                androidSettings: newAndroidSettingsData,
                iosSettings: newIosSettingsData
            }
        });
        return FormateData(createdAppSettings);
    } catch (error) {
        console.error(error);
        throw new APIError('Failed to create settings', error);
    }
};

const GetAllSettings = async () => {
    try {
        const appSettings = await prisma.AppSettings.findUnique({
            where: { name: 'appsettings' }
        });
        return FormateData(appSettings)
    } catch (error) {
        console.error(error);
        throw new APIError('Failed to fetch app settings, Try again');
    }
};

const UpdateSettings = async updatedAppSettingsData => {
    const { androidSettings, iosSettings } = updatedAppSettingsData;

    // fetch old app settings data
    const dbAppSettings = await prisma.AppSettings.findUnique({
        where: { name: 'appsettings' }
    });
    const oldAndroidSettings = dbAppSettings.androidSettings;
    const oldIosSettings = dbAppSettings.iosSettings;
    let latestAndSettings = UpdateObject(oldAndroidSettings, androidSettings);
    let latestIosSettings = UpdateObject(oldIosSettings, iosSettings);

    try {
        const updatedAppSettings = await prisma.AppSettings.update({
            where: { name: 'appsettings' },
            data: {
                notificationType: updatedAppSettingsData?.notificationType,
                oneSignalAppID: updatedAppSettingsData?.oneSignalAppID,
                oneSignalApiKey: updatedAppSettingsData?.oneSignalApiKey,
                firebaseServerKey: updatedAppSettingsData?.firebaseServerKey,
                firebaseTopics: updatedAppSettingsData?.firebaseTopics,
                sportsApiBasedUrl: updatedAppSettingsData?.sportsApiBasedUrl,
                sportsApiKey: updatedAppSettingsData?.sportsApiKey,
                androidSettings: latestAndSettings,
                iosSettings: latestIosSettings
            }
        });

        return FormateData(updatedAppSettings)
    } catch (error) {
        console.error(error);
        throw new APIError('Failed to update app settings, Try again');
    }
};

module.exports = {
    CreateSettings,
    GetAllSettings,
    UpdateSettings
};