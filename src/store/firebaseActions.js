import firebase from "firebase/app";
import store from "@/store/index";
import toastActions from "@/store/toastActions";
import dateFilter from "@/filters/date.filter";

export default {
  async registerUser(userName, userEmail, userPassword, callback) {
    let userCreation = await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword);

    await firebase
      .database()
      .ref("users/" + userCreation.user.uid)
      .set({
        Name: userName,
        Email: userEmail,
        messages: false,
      });
    await userCreation.user.updateProfile({ displayName: userName });
    callback();
  },

  async loginUser(userEmail, userPassword, callback) {
    try {
      await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);

      await store.dispatch("fetchUser", firebase.auth().currentUser);

      await getAndFetchUserMessages();

      callback();
    } catch (err) {
      console.log("sign err", err);
    }
  },

  async logoutUser(callback) {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch("fetchUser", false);
        store.dispatch("fetchUserLog", false);
      });
    callback();
  },

  listenChangesInUserMessages() {
    firebase
      .database()
      .ref("users")
      .child(store.getters.user.data.uid)
      .child("messages")
      .on("child_added", () => {
        getAndFetchUserMessages();
        toastActions.showInfoMessage("You have been received a new message!");
      });

    firebase
      .database()
      .ref("users")
      .child(store.getters.user.data.uid)
      .child("messages")
      .on("child_removed", () => {
        getAndFetchUserMessages();
        toastActions.showInfoMessage(
          "Your message has been successfully deleted!"
        );
      });
  },

  async sendTheMessage(receiver, user, callback) {
    let adresser = await firebase
      .database()
      .ref("users")
      .orderByChild("Email")
      .equalTo(receiver.email)
      .once("value")
      .then((d) => d.val());

    if (adresser) {
      callback();

      let userUid = Object.keys(adresser)[0];
      let currStamp = Date.now();
      let currDate = dateFilter(currStamp, "datetime");

      await firebase
        .database()
        .ref("users")
        .child(`${userUid}/` + "messages")
        .push({
          senderName: user.data.displayName,
          senderEmail: user.data.email,
          topic: receiver.theMessage.topic,
          message: receiver.theMessage.currentMessage,
          date: currDate.toString(),
        });
    } else {
      console.log("no user");
    }
  },

  async getCurrencyFromFirebase() {
    let currencies = await firebase
      .database()
      .ref("currencies")
      .once("value")
      .then((data) => Object.values(data.val()));
    return currencies;
  },

  async addUserRating(user) {
    let currUserRating = await firebase
      .database()
      .ref("ratings")
      .orderByChild("userId")
      .equalTo(user.data.uid)
      .once("value")
      .then((data) => data.val());

    if (!currUserRating) {
      await firebase
        .database()
        .ref("ratings")
        .push({
          userName: user.data.displayName,
          userId: user.data.uid,
          rating: user.data.appRating,
        });
    } else {
      let postId = Object.keys(currUserRating)
      await firebase.database().ref(`ratings/${postId}`).update({
        rating: user.data.appRating
      })
    }
  },

  async getAverageRating() {
  let allRatings =  await firebase.database().ref('ratings').once('value').then(data => Object.values(data.val()).map(el => el.rating))
  let averageRating = allRatings.reduce((previous, current) => (previous + current)) / allRatings.length
  return {
    rating: averageRating,
    numberOfUsers: allRatings.length
  }
  }
};

async function getAndFetchUserMessages() {
  let messages = await firebase
    .database()
    .ref("users")
    .child(store.getters.user.data.uid)
    .child("messages")
    .once("value")
    .then((data) => data.val());

  await store.dispatch("fetchUserMessages", messages);
}
