<template>
  <div>
    <div class="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
      <h2 class="text-lg leading-6 font-medium text-gray-900">
        Customers
      </h2>
      <div>
        <span class="shadow-sm rounded-md">
          <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out">
            Add new customer
          </button>
        </span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    StartDate
                  </th>
                  <th class="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="customer in customers"
                  :key="customer.customerId" >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          {{customer.lastName}},  {{customer.firstName}}
                        </div>
                        <div class="mt-1 text-sm leading-5 text-gray-500 flex items-center justify-start">
                          <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <p class="ml-2">
                            {{customer.phoneNumber}}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <span class="block text-sm leading-5">{{customer.address1}}</span>
                    <span class="block text-sm leading-5">{{customer.address2}}</span>
                    <span class="block text-sm leading-5">{{customer.city}}, {{customer.state}} {{customer.postalCode}}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm leading-5 text-gray-900">{{GetFormattedDate(customer.startDate)}}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{customer.manager}}
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
import moment from 'moment';

export default {
  components: {
  },
  data() {
    return {
      page: 1
    };
  },
  created() {
    this.getCustomers(this.page);
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      customers: state => state.customers.customers,
    }),
  },
  methods: {
    ...mapActions({ 
      getCustomers: 'customers/getCustomers',
    }),
    centsToDollars(cents){
      return numeral(cents/100).format('$0,0.00');
    },
    decimalToPercentage(decimal){
      return numeral(decimal).format('0%');
    },
    GetFormattedDate(dateVal) {
      return moment(dateVal).format("MM/DD/YYYY")
    },
    nextPage(){
      this.page ++;
      this.getCustomers(this.page);
    },
    previousPage(){
      if(this.page > 1){
        this.page--;
        this.getCustomers(this.page);
      }
    },
    getTerminationString(termDate){
      if(termDate == null){
        return 'Present'
      }

      return this.GetFormattedDate(termDate)
    }
  }
}
</script>