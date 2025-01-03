# MeetUp

App for organizating parties, events, concerts, and other things where people can meet and have some nice time spend together

# How to install and start app

1. clone repo from github
2. run in terminal - 'npm install'
3. next step is to create .env file in root folder with two variables, it is necessary to have functional maps and navigation: REACT_APP_DIRECTION_API_KEY and REACT_APP_GOOGLE_MAPS_API_KEY
4. REACT_APP_GOOGLE_MAPS_API_KEY - instruction you can find here https://docs.expo.dev/versions/latest/sdk/map-view/
5. same way as you enabled 'Maps SDK for iOS' you can enable 'Directions API' in your project and set generated api_key to REACT_APP_DIRECTION_API_KEY
6. then if you run 'npm start' you should see 'meetapp@1.0.0 start', 'expo start' and QR code and so on
7. you can use XCode simulator or Android Studio to run it on computer or you can use real device, but you have to install 'Expo go' aplication
8. if you use real device after installation 'Expo go' - on ios open camera and scan QR code from terminal, on android go to 'Expo go' app and there is option to scan QR code

# App description

App is devided to different folders
- images and icon are in assets folder
- components are divided into subfolders according to their usage
- in constants folder is just one file for now - Colors
- in mapStyleSettings are som dummy data about events - all events are localizated in Bratislava so if can't see them zoom out in your map view 
- mapStyle can be configure on https://mapstyle.withgoogle.com/
- app content is divided into two main folders - pages and screens - for expample SignUpPage.js contains of two screens - FirstSignUpScreen and LastSignUpScreen - that is the pattern for other pages and screens
- redux folder - for fetching api endpoints, states and data hendling using redux toolkit
