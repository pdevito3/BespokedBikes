// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  salespersons: [],
  editableSalesperson: [],
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
  setEditableSalesperson({ commit }, editableSalesperson) {
    commit('SET_EDITABLESALESPERSON', editableSalesperson)
  },
  updateSalesperson({ commit, dispatch }, salesperson) {
      this.$axios.put(
        `http://localhost:5000/api/salespersons/${salesperson.salespersonId}`,
        JSON.stringify(salesperson),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getSalespersons", 1);
          //dispatch("getSalesperson",salesperson.salespersonId);
        });
  }
}

export const modules = {
}

export const namespaced = true