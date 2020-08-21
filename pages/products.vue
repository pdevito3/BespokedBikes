<template>
  <div>
    <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Style
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Quantity On Hand
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th class="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="product in products"
              :key="product.productId" >
              <td class="px-6 py-4 whitespace-no-wrap">
                <div class="flex items-center">
                  <div class="">
                    <div class="text-sm leading-5 font-medium text-gray-900">
                      {{product.name}}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      {{product.manufacturer}}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {{product.style}}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <div class="text-sm leading-5 text-gray-500">{{centsToDollars(product.salePrice)}}</div>
                <div class="text-sm leading-5 text-gray-900">{{centsToDollars(product.purchasePrice)}}</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="[product.quantityOnHand < 100 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800']">
                  {{product.quantityOnHand}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                {{decimalToPercentage(product.commissionPercentage)}}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>

            <!-- More rows... -->
          </tbody>
        </table>
          <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <!-- <div class="hidden sm:block">
            <p class="text-sm leading-5 text-gray-700">
              Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium">10</span>
              of
              <span class="font-medium">20</span>
              results
            </p>
          </div> -->
          <div class="flex-1 flex justify-between sm:justify-end">
            <button @click="previousPage()" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
              Previous
            </button>
            <button @click="nextPage()" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import axios from '@nuxtjs/axios';
import numeral from 'numeral';

export default {
  components: {
  },
  data() {
    return {
      page: 1
    };
  },
  created() {
    this.getProducts(this.page);
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      products: state => state.products.products,
    }),
  },
  methods: {
    ...mapActions({ 
      getProducts: 'products/getProducts',
    }),
    centsToDollars(cents){
      return numeral(cents/100).format('$0,0.00');
    },
    decimalToPercentage(decimal){
      return numeral(decimal).format('0%');
    },
    nextPage(){
      this.page ++;
      this.getProducts(this.page);
    },
    previousPage(){
      if(this.page > 1){
        this.page--;
        this.getProducts(this.page);
      }
    }
  }
}
</script>