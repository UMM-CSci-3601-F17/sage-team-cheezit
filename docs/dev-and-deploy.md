# Development and Deployment

## Prerequisites

You will need to have installed:
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Angular CLI](https://cli.angular.io/)
- [Firebase CLI](https://firebase.google.com/docs/cli/) - This is only required to deploy to Firebase Hosting

You will need to have a [Firebase](https://firebase.google.com/) account.

## Project Setup

To get started, clone the repository and then run `yarn` to install the nessecary dependencies.

### Firebase Setup

The next step is to add Firebase configuration information to the project.

Go to your [Firebase console](https://console.firebase.google.com/) and create an project if you have not already. Next, open the project and click the "Add Firebase to your web app" link. Copy the contents of the config variable, it should look like this:
```js
{ 
   apiKey: '<your-key>', 
   authDomain: '<your-project-authdomain>', 
   databaseURL: '<your-database-URL>', 
   projectId: '<your-project-id>', 
   storageBucket: '<your-storage-bucket>', 
   messagingSenderId: '<your-messaging-sender-id>' 
}
```
Paste these into the `src/environment/environment.ts` and `src/environment/environment.prod.ts` files replacing the placeholders.

You can also get this information from `firebase setup:web`

Next, enable Firebase Authentication by going to the Authentication section of the dashboard, then to the sign-in method section. Next, click on Google and toggle it to enabled, then save.

## Running the Project

To run the development server, run `ng serve`. This will start hosting the site on `localhost:9000` and automatically rebuild and refresh the site when it detects changes.

## Testing

To run the unit tests for the project, run `ng test`.

## Deploying the Project

This project can be deployed on any web server. We are using [Firebase Hosting](https://firebase.google.com/docs/hosting/).

To build the production version of the app, run `ng build --prod`. This will produce a `dist` folder containing everything needed to host the site. If you are using Firebase Hosting, make sure you are signed in with `firebase login`. Then to deploy to Firebase run `firebase deploy`. This uploads the contents of `dist` to Firebase Hosting as well as the Realtime Database and Firestore rules files.
