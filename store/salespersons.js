// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  salespersons: [],
  addSalespersonsModalOpen: false,
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_SALESPERSONS(state, salespersons) {
    state.salespersons = salespersons;
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
  getSalespersons({commit}, page ) {
      //axios.get(`http://localhost:5000/api/salespersons/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/salespersons/?pagesize=8&pageNumber=${page}`)
      .then(res => {
        commit('UPDATE_SALESPERSONS', res.data);
        return res.data;
      });
  },
  toggleSalespersonModal({ commit }){
    commit('TOGGLE_ADDSALESPERSONMODAL')
  },
  setEditableSalesperson({ commit }, editableSalesperson) {
    commit('SET_EDITABLESALESPERSON', editableSalesperson)
  },
  addSalespersonToList({ commit, dispatch }, salesperson) {
      this.$axios.post(
        `http://localhost:5000/api/salespersons/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getSalespersons");
        });
  }
}

export const modules = {
}

export const namespaced = true