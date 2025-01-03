const myValue = 'MeetApp';

module.exports = ({ config }) => ({
  ...config,
  // All values in extra will be passed to your app.

  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mycompany.meetupapp',
    config: {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/splash.png',
      backgroundColor: '#000000',
    },
    package: 'com.mycompany.meetupapp',
    config: {
      googleMaps: {
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      },
    },
  },
});
