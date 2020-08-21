// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  sales: [],
  editableSale: [],
  addSalesModalOpen: false,
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_SALES(state, sales) {
    state.sales = sales;
  },
  SET_EDITABLESALE(state, editableSale) {
    state.editableSale = editableSale;
  },
  TOGGLE_ADDSALEMODAL(state) {
    state.addSalesModalOpen = !state.addSalesModalOpen;
  },
}

// acts like global computed methods
export const getters = {}

//asynchronously wrap business logic around mutations. 
export const actions = {
  getSales({commit}, page ) {
      //axios.get(`http://localhost:5000/api/sales/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/sales/?pagesize=8&pageNumber=${page}`)
      .then(res => {
        commit('UPDATE_SALES', res.data);
        return res.data;
      });
  },
  toggleSaleModal({ commit }){
    commit('TOGGLE_ADDSALEMODAL')
  },
  setEditableSale({ commit }, editableSale) {
    commit('SET_EDITABLESALE', editableSale)
  },
  addSaleToList({ commit, dispatch }, sale) {
      this.$axios.post(
        `http://localhost:5000/api/sales/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getSales");
        });
  }
}

export const modules = {
}

export const namespaced = true