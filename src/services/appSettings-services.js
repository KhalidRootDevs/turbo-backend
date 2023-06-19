const { APIError } = require('../utils/app-error');
const prisma = require('../../prisma');
const { FormateData, UpdateObject } = require('../utils');

const createSettings = async ({ appSettingsData }) => {
    const { androidSettings, iosSettings, ...data } = appSettingsData;

    try {
        const createdAppSettings = await prisma.AppSettings.create({
            data: {
                ...data,
                androidSettings: { ...androidSettings },
                iosSettings: { ...iosSettings }
            }
        });

        return FormateData(createdAppSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllSettings = async () => {
    try {
        const appSettings = await prisma.AppSettings.findUnique({
            where: { name: 'appsettings' }
        });

        return FormateData(appSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateSettings = async (updatedAppSettingsData) => {
    const { androidSettings, iosSettings, ...data } = updatedAppSettingsData;

    try {
        const dbAppSettings = await prisma.AppSettings.findUnique({
            where: { name: 'appsettings' }
        });

        const updatedAndroidSettings = UpdateObject(
            dbAppSettings.androidSettings,
            androidSettings
        );
        const updatedIosSettings = UpdateObject(
            dbAppSettings.iosSettings,
            iosSettings
        );

        const updatedAppSettings = await prisma.AppSettings.update({
            where: { name: 'appsettings' },
            data: {
                ...data,
                androidSettings: { ...updatedAndroidSettings },
                iosSettings: { ...updatedIosSettings }
            }
        });

        return FormateData(updatedAppSettings);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    createSettings,
    getAllSettings,
    updateSettings
};
