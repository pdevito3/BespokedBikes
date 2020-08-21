// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  customers: [],
  addCustomersModalOpen: false,
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
  SET_EDITABLECUSTOMER(state, editableCustomer) {
    state.editableCustomer = editableCustomer;
  },
  TOGGLE_ADDCUSTOMERMODAL(state) {
    state.addCustomersModalOpen = !state.addCustomersModalOpen;
  },
}

// acts like global computed methods
export const getters = {}

//asynchronously wrap business logic around mutations. 
export const actions = {
  getCustomers({commit}, page ) {
      //axios.get(`http://localhost:5000/api/customers/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/customers/?pagesize=8&pageNumber=${page}`)
      .then(res => {
        commit('UPDATE_CUSTOMERS', res.data);
        return res.data;
      });
  },
  toggleCustomerModal({ commit }){
    commit('TOGGLE_ADDCUSTOMERMODAL')
  },
  setEditableCustomer({ commit }, editableCustomer) {
    commit('SET_EDITABLECUSTOMER', editableCustomer)
  },
  addCustomerToList({ commit, dispatch }, customer) {
      this.$axios.post(
        `http://localhost:5000/api/customers/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getCustomers");
        });
  }
}

export const modules = {
}

export const namespaced = true