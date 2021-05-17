import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "firebase/app";
import firebaseActions from "@/store/firebaseActions";
import toastActions from "@/store/toastActions";

export default createStore({
  plugins: [createPersistedState()],

  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },

    SET_USER_MESSAGES(state, messages) {
      state.user.data.messages = messages;
    },

    SET_USER_APP_RATING(state, rating) {
      state.user.data.appRating = rating;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },

    fetchUserAppRating({ commit }, rating) {
      commit("SET_USER_APP_RATING", rating);
    },

    async loginUser({ commit, dispatch }, user) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      await dispatch("fetchUser", firebase.auth().currentUser);
      let userMessages = await firebaseActions.getUserMessages();
      commit("SET_USER_MESSAGES", userMessages);
    },

    async logoutUser({ commit }) {
      await firebase.auth().signOut();
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
    },

    async  getAndFetchUserMessages({ commit }) {
      let messages = await firebase
        .database()
        .ref("users")
        .child(this.state.user.data.uid)
        .child("messages")
        .once("value")
        .then((data) => data.val());
    
       commit("SET_USER_MESSAGES", messages);
    },

     listenChangesInUserMessages({ dispatch }) {
      firebase
        .database()
        .ref("users")
        .child(this.state.user.data.uid)
        .child("messages")
        .on("child_added", () => {
          dispatch('getAndFetchUserMessages')
          toastActions.showInfoMessage("You have been received a new message!");
        });
  
      firebase
        .database()
        .ref("users")
        .child(this.state.user.data.uid)
        .child("messages")
        .on("child_removed", () => {
          dispatch('getAndFetchUserMessages')
          toastActions.showInfoMessage(
            "Your message has been successfully deleted!"
          );
        });
    },
  },
  modules: {},
});
