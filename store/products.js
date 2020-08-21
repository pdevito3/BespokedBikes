// import Vue from 'vue';
// import Vuex from 'vuex';
// import axios from 'axios';

// Vue.use(Vuex);

export const state = {
  products: [],
  editableProduct: [],
  addProductsModalOpen: false,
}

//update state synchronously 
//**mutations should always be abstracted out and put into actions**
export const mutations = {
  UPDATE_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_EDITABLEPRODUCT(state, editableProduct) {
    state.editableProduct = editableProduct;
  },
  TOGGLE_ADDPRODUCTMODAL(state) {
    state.addProductsModalOpen = !state.addProductsModalOpen;
  },
}

// acts like global computed methods
export const getters = {}

//asynchronously wrap business logic around mutations. 
export const actions = {
  getProducts({commit}, page ) {
      //axios.get(`http://localhost:5000/api/products/?filters=acquired==false, hidden==false`)
      this.$axios.get(`http://localhost:5000/api/products/?pagesize=8&pageNumber=${page}`)
      .then(res => {
        commit('UPDATE_PRODUCTS', res.data);
        return res.data;
      });
  },
  toggleProductModal({ commit }){
    commit('TOGGLE_ADDPRODUCTMODAL')
  },
  setEditableProduct({ commit }, editableProduct) {
    commit('SET_EDITABLEPRODUCT', editableProduct)
  },
  addProductToList({ commit, dispatch }, product) {
      this.$axios.post(
        `http://localhost:5000/api/products/`,
        JSON.stringify(itemToAdd),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch("getProducts");
        });
  }
}

export const modules = {
}

export const namespaced = true