import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDjndkhWdXSpdV4hZpTHDvLpIdaIOgZ6y8",
    authDomain: "catch-of-the-day-21e46.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-21e46.firebaseio.com"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;