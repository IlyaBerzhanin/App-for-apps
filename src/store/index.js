import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },

  getters: {
    user(state) {
      return state.user
    }
  },

  mutations: {

    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },

    SET_USER(state, data) {
      state.user.data = data
    },

    SET_USER_MESSAGES(state, messages) {
      state.user.data.messages = messages
    },

    SET_USER_APP_RATING(state, rating) {
      state.user.data.appRating = rating
    }

  },
  actions: {

    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)
      if(user) {
        commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        })
      }
      else {
        commit('SET_USER', null)
      }
    },

    fetchUserLog({ commit }, value) {
      commit('SET_LOGGED_IN', value)
    },

     fetchUserMessages({commit}, messages) {
       commit('SET_USER_MESSAGES', messages)
    },

    fetchUserAppRating({commit}, rating) {
      commit('SET_USER_APP_RATING', rating)
    }

  },
  modules: {
  }
})



