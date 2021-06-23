import TutorialDataServiceService from '../services/TutorialDataService';

export const tutorial = {
  namespaced: true,
  actions: {
    createTutorial: (async ({ commit }, user) => {
      try {
        const { data } = await TutorialDataServiceService.create(user)
        commit('success', '')
        return data
      } catch (error) {
        return false
      }

    }),
    updateTutorial({ commit }, user) {
      commit('success', '')
      return TutorialDataServiceService.update(user.id, user).then(
        u => {
          return Promise.resolve(u.data);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    async deleteTutorial({ commit }, user) {
      try {
        const { data } = await TutorialDataServiceService.delete(user)
        commit('success', '')
        return data
      } catch (error) {
        return false
      }
    },
    async getTutorial({ commit }, user) {
      try {
        const { data } = await TutorialDataServiceService.get(user)
        commit('success', '')
        return data
      } catch (error) {
        return false
      }
    }
  },
  mutations: {
    success() {
      return true
    }
  }
}