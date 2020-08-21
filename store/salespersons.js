// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  salespersons: [],
  editableSalesperson: [],
  addSalespersonsModalOpen: false,
  page: 1
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_SALESPERSONS(state, salespersons) {
    state.salespersons = salespersons;
  },
  UPDATE_PAGE(state, page) {
    state.page = page;
  },
  SET_EDITABLESALESPERSON(state, editableSalesperson) {
    state.editableSalesperson = editableSalesperson;
  },
  TOGGLE_ADDSALESPERSONMODAL(state) {
    state.addSalespersonsModalOpen = !state.addSalespersonsModalOpen;
  },
}

// acts like global computed methods
export const getters = {}

//asynchronously wrap business logic around mutations. 
export const actions = {
  getSalespersons({commit, state} ) {
      //axios.get(`http://localhost:5000/api/salespersons/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/salespersons/?pagesize=8&pageNumber=${state.page}`)
      .then(res => {
        commit('UPDATE_SALESPERSONS', res.data);
        return res.data;
      });
  },
  getSalesperson({commit}, id ) {
      //axios.get(`http://localhost:5000/api/salespersons/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/salespersons/${id}`)
      .then(res => {
        return res.data;
      });
  },
  toggleSalespersonModal({ commit }){
    commit('TOGGLE_ADDSALESPERSONMODAL')
  },
  updatePage({ commit }, page){
    commit('UPDATE_PAGE', page)
  },
  setEditableSalesperson({ commit }, editableSalesperson) {
    commit('SET_EDITABLESALESPERSON', editableSalesperson)
  },
  updateSalesperson({ commit, state, dispatch }, salesperson) {
      this.$axios.put(
        `http://localhost:5000/api/salespersons/${salesperson.salespersonId}`,
        JSON.stringify(salesperson),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getSalespersons", state.page);
          //dispatch("getSalesperson",salesperson.salespersonId);
        });
  },
  addSalesperson({ commit, dispatch, state }, salesperson) {
      this.$axios.post(
        `http://localhost:5000/api/salespersons/`,
        JSON.stringify(salesperson),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getSalespersons", state.page);
          //dispatch("getSalesperson",salesperson.salespersonId);
        });
  }
}

export const modules = {
}

export const namespaced = true