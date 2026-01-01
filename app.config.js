import 'dotenv/config';

export default {
    expo: {
        name: process.env.APP_NAME,
        slug: process.env.APP_SLUG,
        version: '1.0.0',
        orientation: 'portrait',

        icon: './assets/images/icon.png',
        scheme: process.env.APP_SCHEME,

        userInterfaceStyle: 'automatic',
        newArchEnabled: true,

        splash: {
            image: './assets/images/adaptive-icon.png',
            resizeMode: 'contain',
            backgroundColor: '#FF678B',
        },

        ios: {
            supportsTablet: true,
            config: {
                googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
            },
        },

        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            edgeToEdgeEnabled: true,
            package: process.env.ANDROID_PACKAGE,
            config: {
                googleMaps: {
                    apiKey: process.env.GOOGLE_MAPS_API_KEY,
                },
            },
            permissions: ['READ_MEDIA_IMAGES', 'READ_MEDIA_VIDEO'
            ],
        },

        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },

        plugins: [],

        experiments: {
            typedRoutes: true,
        },

        extra: {
            eas: {
                projectId: process.env.EAS_PROJECT_ID,
            },
        },

        owner: process.env.OWNER,

        runtimeVersion: {
            policy: 'appVersion',
        },

        updates: {
            url: process.env.EAS_UPDATE_URL,
        },

        platforms: ['ios', 'android'
        ],
    },
};
