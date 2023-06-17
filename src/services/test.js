import prisma from '../../prisma/index.js';

// Post app settings
export const postAppSettings = async (req, res) => {
    console.log('Inside post app settings');

    const appSettingsData = req.body;

    const {
        androidPrivacyPolicy,
        androidTermsAndCondition,
        androidAppShareLink,
        androidAppDefalutPage,
        androidAppPublishControl,
        androidHideLiveByVersionCode,
        androidAdsType,
        androidClickControl,
        androidGoogleAppId,
        androidGoogleAppOpenAddCode,
        androidGoogleBannerAdsCode,
        androidGoogleInterstitialAdsCode,
        androidGoogleNativeAdsCode,
        androidGoogleRewardedAdsCode,
        androidVersionName,
        androidVersionCode,
        androidForceUpdate,
        androidAppUrl,
        androidButtonText,
        androidDescription
    } = appSettingsData.androidSettings;

    const {
        iosPrivacyPolicy,
        iosTermsAndCondition,
        iosAppShareLink,
        iosAppRatingLink,
        iosAppDefalutPage,
        iosAppPublishControl,
        iosHideLiveByVersionCode,
        iosAdsType,
        iosClickControl,
        iosGoogleAppId,
        iosGoogleAppOpenAddCode,
        iosGoogleBannerAdsCode,
        iosGoogleInterstitialAdsCode,
        iosGoogleNativeAdsCode,
        iosGoogleRewardedAdsCode,
        iosVersionName,
        iosVersionCode,
        iosForceUpdate,
        iosAppUrl,
        iosButtonText,
        iosDescription
    } = appSettingsData.iosSettings;

    let androidSettingsData = {
        androidPrivacyPolicy,
        androidTermsAndCondition,
        androidAppShareLink,
        androidAppDefalutPage,
        androidAppPublishControl,
        androidHideLiveByVersionCode,
        androidAdsType,
        androidClickControl,
        androidGoogleAppId,
        androidGoogleAppOpenAddCode,
        androidGoogleBannerAdsCode,
        androidGoogleInterstitialAdsCode,
        androidGoogleNativeAdsCode,
        androidGoogleRewardedAdsCode,
        androidVersionName,
        androidVersionCode,
        androidForceUpdate,
        androidAppUrl,
        androidButtonText,
        androidDescription
    };

    let iosSettingsData = {
        iosPrivacyPolicy,
        iosTermsAndCondition,
        iosAppShareLink,
        iosAppRatingLink,
        iosAppDefalutPage,
        iosAppPublishControl,
        iosHideLiveByVersionCode,
        iosAdsType,
        iosClickControl,
        iosGoogleAppId,
        iosGoogleAppOpenAddCode,
        iosGoogleBannerAdsCode,
        iosGoogleInterstitialAdsCode,
        iosGoogleNativeAdsCode,
        iosGoogleRewardedAdsCode,
        iosVersionName,
        iosVersionCode,
        iosForceUpdate,
        iosAppUrl,
        iosButtonText,
        iosDescription
    };

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
                androidSettings: androidSettingsData,
                iosSettings: iosSettingsData
            }
        });
        return res.status(200).send({ message: 'App setting posted', createdAppSettings });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to post app settingss, Try again' });
    }
};

// Get app settings
export const getAppSettings = async (req, res) => {
    try {
        const appSettings = await prisma.AppSettings.findMany();
        return res.status(200).send(appSettings);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch app settings, Try again' });
    }
};

// Update General App Settings
export const updateAppSettings = async (req, res) => {
    console.log('Inside update app settings');
    const updatedAppSettingsData = req.body;

    const { androidSettings, iosSettings } = updatedAppSettingsData;

    const dbAppSettings = await prisma.AppSettings.findUnique({
        where: { name: 'appsettings' }
    });

    const dbAndroidSettings = dbAppSettings.androidSettings;
    const newIosSettings = dbAppSettings.iosSettings;

    let newAndroidSettings = Object.entries(dbAndroidSettings);

    // let androidUpdateObj = keys.map(key => {
    //     key = androidSettings?.key || newAndroidSettings?.key;
    // });

   const convertedAndroidSettings = newAndroidSettings.map((itemAndroidSettings) => {

    let key = itemAndroidSettings[0];
    let value = itemAndroidSettings[1];

            return {
            key: androidSettings?.androidPrivacyPolicy || value,
            androidTermsAndCondition: androidSettings?.androidTermsAndCondition || newAndroidSettings?.androidTermsAndCondition,
            androidAppShareLink: androidSettings?.androidAppShareLink || newAndroidSettings?.androidAppShareLink,
            androidAppDefalutPage: androidSettings?.androidAppDefalutPage || newAndroidSettings?.androidAppDefalutPage,
            androidAppPublishControl: androidSettings?.androidAppPublishControl || newAndroidSettings?.androidAppPublishControl,
            androidHideLiveByVersionCode: androidSettings?.androidHideLiveByVersionCode || newAndroidSettings?.androidHideLiveByVersionCode,
            androidAdsType: androidSettings?.androidAdsType || newAndroidSettings?.androidAdsType,
            androidClickControl: androidSettings?.androidClickControl || newAndroidSettings?.androidClickControl,
            androidGoogleAppId: androidSettings?.androidGoogleAppId || newAndroidSettings?.androidGoogleAppId,
            androidGoogleAppOpenAddCode: androidSettings?.androidGoogleAppOpenAddCode || newAndroidSettings?.androidGoogleAppOpenAddCode,
            androidGoogleBannerAdsCode: androidSettings?.androidGoogleBannerAdsCode || newAndroidSettings?.androidGoogleBannerAdsCode,
            androidGoogleInterstitialAdsCode:
                androidSettings?.androidGoogleInterstitialAdsCode || newAndroidSettings?.androidGoogleInterstitialAdsCode,
            androidGoogleNativeAdsCode: androidSettings?.androidGoogleNativeAdsCode || newAndroidSettings?.androidGoogleNativeAdsCode,
            androidGoogleRewardedAdsCode: androidSettings?.androidGoogleRewardedAdsCode || newAndroidSettings?.androidGoogleRewardedAdsCode,
            androidVersionName: androidSettings?.androidVersionName || newAndroidSettings?.androidVersionName,
            androidVersionCode: androidSettings?.androidVersionCode || newAndroidSettings?.androidVersionCode,
            androidForceUpdate: androidSettings?.androidForceUpdate || newAndroidSettings?.androidForceUpdate,
            androidAppUrl: androidSettings?.androidAppUrl || newAndroidSettings?.androidAppUrl,
            androidButtonText: androidSettings?.androidButtonText || newAndroidSettings?.androidButtonText,
            androidDescription: androidSettings?.androidDescription || newAndroidSettings?.androidDescription
            }
    })

    let finalAndroidSettings;
    let finalIosSettings;

    if (dbAppSettings !== null) {
        finalAndroidSettings = {
            ...newAndroidSettings,
            androidPrivacyPolicy: androidSettings?.androidPrivacyPolicy || newAndroidSettings?.androidPrivacyPolicy,
            androidTermsAndCondition: androidSettings?.androidTermsAndCondition || newAndroidSettings?.androidTermsAndCondition,
            androidAppShareLink: androidSettings?.androidAppShareLink || newAndroidSettings?.androidAppShareLink,
            androidAppDefalutPage: androidSettings?.androidAppDefalutPage || newAndroidSettings?.androidAppDefalutPage,
            androidAppPublishControl: androidSettings?.androidAppPublishControl || newAndroidSettings?.androidAppPublishControl,
            androidHideLiveByVersionCode: androidSettings?.androidHideLiveByVersionCode || newAndroidSettings?.androidHideLiveByVersionCode,
            androidAdsType: androidSettings?.androidAdsType || newAndroidSettings?.androidAdsType,
            androidClickControl: androidSettings?.androidClickControl || newAndroidSettings?.androidClickControl,
            androidGoogleAppId: androidSettings?.androidGoogleAppId || newAndroidSettings?.androidGoogleAppId,
            androidGoogleAppOpenAddCode: androidSettings?.androidGoogleAppOpenAddCode || newAndroidSettings?.androidGoogleAppOpenAddCode,
            androidGoogleBannerAdsCode: androidSettings?.androidGoogleBannerAdsCode || newAndroidSettings?.androidGoogleBannerAdsCode,
            androidGoogleInterstitialAdsCode:
                androidSettings?.androidGoogleInterstitialAdsCode || newAndroidSettings?.androidGoogleInterstitialAdsCode,
            androidGoogleNativeAdsCode: androidSettings?.androidGoogleNativeAdsCode || newAndroidSettings?.androidGoogleNativeAdsCode,
            androidGoogleRewardedAdsCode: androidSettings?.androidGoogleRewardedAdsCode || newAndroidSettings?.androidGoogleRewardedAdsCode,
            androidVersionName: androidSettings?.androidVersionName || newAndroidSettings?.androidVersionName,
            androidVersionCode: androidSettings?.androidVersionCode || newAndroidSettings?.androidVersionCode,
            androidForceUpdate: androidSettings?.androidForceUpdate || newAndroidSettings?.androidForceUpdate,
            androidAppUrl: androidSettings?.androidAppUrl || newAndroidSettings?.androidAppUrl,
            androidButtonText: androidSettings?.androidButtonText || newAndroidSettings?.androidButtonText,
            androidDescription: androidSettings?.androidDescription || newAndroidSettings?.androidDescription
        };
    }

    if (dbAppSettings !== null) {
        finalIosSettings = {
            ...newIosSettings,
            iosPrivacyPolicy: iosSettings?.iosPrivacyPolicy || newIosSettings?.iosPrivacyPolicy,
            iosTermsAndCondition: iosSettings?.iosTermsAndCondition || newIosSettings?.iosTermsAndCondition,
            iosAppShareLink: iosSettings?.iosAppShareLink || newIosSettings?.iosAppShareLink,
            iosAppRatingLink: iosSettings?.iosAppRatingLink || newIosSettings?.iosAppRatingLink,
            iosAppDefalutPage: iosSettings?.iosAppDefalutPage || newIosSettings?.iosAppDefalutPage,
            iosAppPublishControl: iosSettings?.iosAppPublishControl || newIosSettings?.iosAppPublishControl,
            iosHideLiveByVersionCode: iosSettings?.iosHideLiveByVersionCode || newIosSettings?.iosHideLiveByVersionCode,
            iosAdsType: iosSettings?.iosAdsType || newIosSettings?.iosAdsType,
            iosClickControl: iosSettings?.iosClickControl || newIosSettings?.iosClickControl,
            iosGoogleAppId: iosSettings?.iosGoogleAppId || newIosSettings?.iosGoogleAppId,
            iosGoogleAppOpenAddCode: iosSettings?.iosGoogleAppOpenAddCode || newIosSettings?.iosGoogleAppOpenAddCode,
            iosGoogleBannerAdsCode: iosSettings?.iosGoogleBannerAdsCode || newIosSettings?.iosGoogleBannerAdsCode,
            iosGoogleInterstitialAdsCode: iosSettings?.iosGoogleInterstitialAdsCode || newIosSettings?.iosGoogleInterstitialAdsCode,
            iosGoogleNativeAdsCode: iosSettings?.iosGoogleNativeAdsCode || newIosSettings?.iosGoogleNativeAdsCode,
            iosGoogleRewardedAdsCode: iosSettings?.iosGoogleRewardedAdsCode || newIosSettings?.iosGoogleRewardedAdsCode,
            iosVersionName: iosSettings?.iosVersionName || newIosSettings?.iosVersionName,
            iosVersionCode: iosSettings?.iosVersionCode || newIosSettings?.iosVersionCode,
            iosForceUpdate: iosSettings?.iosForceUpdate || newIosSettings?.iosForceUpdate,
            iosAppUrl: iosSettings?.iosAppUrl || newIosSettings?.iosAppUrl,
            iosButtonText: iosSettings?.iosButtonText || newIosSettings?.iosButtonText,
            iosDescription: iosSettings?.iosDescription || newIosSettings?.iosDescription
        };
    }

    // if (dbAppSettings !== null) {
    //     finalAndroidSettings = {
    //         ...newAndroidSettings,
    //         androidPrivacyPolicy: androidSettings?.androidPrivacyPolicy || newAndroidSettings?.androidPrivacyPolicy,
    //         androidTermsAndCondition: androidSettings?.androidTermsAndCondition || newAndroidSettings?.androidTermsAndCondition,
    //         androidAppShareLink: androidSettings?.androidAppShareLink || newAndroidSettings?.androidAppShareLink,
    //         androidAppDefalutPage: androidSettings?.androidAppDefalutPage || newAndroidSettings?.androidAppDefalutPage,
    //         androidAppPublishControl: androidSettings?.androidAppPublishControl || newAndroidSettings?.androidAppPublishControl,
    //         androidHideLiveByVersionCode: androidSettings?.androidHideLiveByVersionCode || newAndroidSettings?.androidHideLiveByVersionCode,
    //         androidAdsType: androidSettings?.androidAdsType || newAndroidSettings?.androidAdsType,
    //         androidClickControl: androidSettings?.androidClickControl || newAndroidSettings?.androidClickControl,
    //         androidGoogleAppId: androidSettings?.androidGoogleAppId || newAndroidSettings?.androidGoogleAppId,
    //         androidGoogleAppOpenAddCode: androidSettings?.androidGoogleAppOpenAddCode || newAndroidSettings?.androidGoogleAppOpenAddCode,
    //         androidGoogleBannerAdsCode: androidSettings?.androidGoogleBannerAdsCode || newAndroidSettings?.androidGoogleBannerAdsCode,
    //         androidGoogleInterstitialAdsCode:
    //             androidSettings?.androidGoogleInterstitialAdsCode || newAndroidSettings?.androidGoogleInterstitialAdsCode,
    //         androidGoogleNativeAdsCode: androidSettings?.androidGoogleNativeAdsCode || newAndroidSettings?.androidGoogleNativeAdsCode,
    //         androidGoogleRewardedAdsCode: androidSettings?.androidGoogleRewardedAdsCode || newAndroidSettings?.androidGoogleRewardedAdsCode,
    //         androidVersionName: androidSettings?.androidVersionName || newAndroidSettings?.androidVersionName,
    //         androidVersionCode: androidSettings?.androidVersionCode || newAndroidSettings?.androidVersionCode,
    //         androidForceUpdate: androidSettings?.androidForceUpdate || newAndroidSettings?.androidForceUpdate,
    //         androidAppUrl: androidSettings?.androidAppUrl || newAndroidSettings?.androidAppUrl,
    //         androidButtonText: androidSettings?.androidButtonText || newAndroidSettings?.androidButtonText,
    //         androidDescription: androidSettings?.androidDescription || newAndroidSettings?.androidDescription
    //     };
    // }

    // if (dbAppSettings !== null) {
    //     finalIosSettings = {
    //         ...newIosSettings,
    //         iosPrivacyPolicy: iosSettings?.iosPrivacyPolicy || newIosSettings?.iosPrivacyPolicy,
    //         iosTermsAndCondition: iosSettings?.iosTermsAndCondition || newIosSettings?.iosTermsAndCondition,
    //         iosAppShareLink: iosSettings?.iosAppShareLink || newIosSettings?.iosAppShareLink,
    //         iosAppRatingLink: iosSettings?.iosAppRatingLink || newIosSettings?.iosAppRatingLink,
    //         iosAppDefalutPage: iosSettings?.iosAppDefalutPage || newIosSettings?.iosAppDefalutPage,
    //         iosAppPublishControl: iosSettings?.iosAppPublishControl || newIosSettings?.iosAppPublishControl,
    //         iosHideLiveByVersionCode: iosSettings?.iosHideLiveByVersionCode || newIosSettings?.iosHideLiveByVersionCode,
    //         iosAdsType: iosSettings?.iosAdsType || newIosSettings?.iosAdsType,
    //         iosClickControl: iosSettings?.iosClickControl || newIosSettings?.iosClickControl,
    //         iosGoogleAppId: iosSettings?.iosGoogleAppId || newIosSettings?.iosGoogleAppId,
    //         iosGoogleAppOpenAddCode: iosSettings?.iosGoogleAppOpenAddCode || newIosSettings?.iosGoogleAppOpenAddCode,
    //         iosGoogleBannerAdsCode: iosSettings?.iosGoogleBannerAdsCode || newIosSettings?.iosGoogleBannerAdsCode,
    //         iosGoogleInterstitialAdsCode: iosSettings?.iosGoogleInterstitialAdsCode || newIosSettings?.iosGoogleInterstitialAdsCode,
    //         iosGoogleNativeAdsCode: iosSettings?.iosGoogleNativeAdsCode || newIosSettings?.iosGoogleNativeAdsCode,
    //         iosGoogleRewardedAdsCode: iosSettings?.iosGoogleRewardedAdsCode || newIosSettings?.iosGoogleRewardedAdsCode,
    //         iosVersionName: iosSettings?.iosVersionName || newIosSettings?.iosVersionName,
    //         iosVersionCode: iosSettings?.iosVersionCode || newIosSettings?.iosVersionCode,
    //         iosForceUpdate: iosSettings?.iosForceUpdate || newIosSettings?.iosForceUpdate,
    //         iosAppUrl: iosSettings?.iosAppUrl || newIosSettings?.iosAppUrl,
    //         iosButtonText: iosSettings?.iosButtonText || newIosSettings?.iosButtonText,
    //         iosDescription: iosSettings?.iosDescription || newIosSettings?.iosDescription
    //     };
    // }

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
                androidSettings: finalAndroidSettings,
                iosSettings: finalIosSettings
            }
        });

        console.log(updatedAppSettings);

        return res.status(200).send({ message: 'App settings updated', updatedAppSettings });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to update app settingss, Try again' });
    }
};