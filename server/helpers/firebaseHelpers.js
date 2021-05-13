const axios = require("axios");
const KEY = "22512e2b320bb4f207b12d3ca6d3f50d";
const quantityOfCurrenciesInDatabase = 7

const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyDgxb4KWUFcKfPUHX9V76M0R_fesgwPgU4",
    authDomain: "scrimba-crm.firebaseapp.com",
    databaseURL:
      "https://scrimba-crm-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "scrimba-crm",
    storageBucket: "scrimba-crm.appspot.com",
    messagingSenderId: "94806750930",
    appId: "1:94806750930:web:999df315631d2d9f481f0b",
    measurementId: "G-VP9HGCZ2TS",
  };


  function initFirebase() {
    firebase.initializeApp(firebaseConfig);
  }

 async function getCurrencyFromApiAndPushToFirebase() {

    let currencies = await firebase
    .database()
    .ref("currencies")
    .once("value")
    .then((data) => Object.values(data.val()));


  let freshCurrency = await axios
  .get(
    `http://data.fixer.io/api/latest?access_key=${KEY}&symbols=USD,BYN,RUB,UAH,)`
  )
  .then((data) => {
    let currentDate = Date.now()
    data.data.fullDate = currentDate
    return data.data
  })
  .catch((e) => console.log(e));

   if(currencies.length >= quantityOfCurrenciesInDatabase) {
       currencies.shift()
       currencies.push(freshCurrency)
       firebase.database().ref('currencies').set(currencies)
   }
   else {
       firebase.database().ref('currencies').push(freshCurrency)
   }
 
}
 
module.exports = { getCurrencyFromApiAndPushToFirebase, initFirebase }