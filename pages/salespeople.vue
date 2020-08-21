<template>
  <div @keydown.escape="closeModal(false)">
    <div class="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
      <h2 class="text-lg leading-6 font-medium text-gray-900">
        Salespeople
      </h2>
      <div>
        <span class="shadow-sm rounded-md">
          <button @click="addSalesPerson()" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out">
            Add new salesperson
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
                    Salesperson
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Tenure
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th class="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="salesperson in salespersons"
                  :key="salesperson.salespersonId" >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div class="">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          {{salesperson.lastName}},  {{salesperson.firstName}}
                        </div>
                        <div class="mt-1 text-sm leading-5 text-gray-500 flex items-center justify-start">
                          <svg class="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <p class="ml-2">
                            {{salesperson.phoneNumber}}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <span class="block text-sm leading-5">{{salesperson.address1}}</span>
                    <span class="block text-sm leading-5">{{salesperson.address2}}</span>
                    <span class="block text-sm leading-5">{{salesperson.city}}, {{salesperson.state}} {{salesperson.postalCode}}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm leading-5 text-gray-900">{{GetFormattedDate(salesperson.startDate)}}-{{getTerminationString(salesperson.terminationDate)}}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {{salesperson.manager}}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <button @click="editSalesPerson(salesperson)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
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

    <ModifySalesperson :open="openModifyModal" :formAction="formAction" :salesperson.sync="editable" @closeModal="closeModal" />
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
      page: 1,
      openModifyModal: false,
      formAction: "edit",
      editable: []
    };
  },
  created() {
    this.getSalespersons(this.page);
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      salespersons: state => state.salespersons.salespersons,
    }),
  },
  methods: {
    ...mapActions({ 
      getSalespersons: 'salespersons/getSalespersons',
      setEditableSalesperson: 'salespersons/setEditableSalesperson',
      updatePage: 'salespersons/updatePage'
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
      this.updatePage(this.page + 1)
        this.getSalespersons(this.page);
    },
    previousPage(){
      if(this.page > 1){
        this.updatePage(this.page - 1)
        this.getSalespersons(this.page);
      }
    },
    getTerminationString(termDate){
      if(termDate == null){
        return 'Present'
      }

      return this.GetFormattedDate(termDate)
    },
    closeModal() {
      this.editable = [];
      this.openModifyModal = false;
    },
    editSalesPerson(salesperson){
      this.formAction = "edit";
      this.openModifyModal = true;
      this.editable = Object.assign({}, salesperson);
      //this.setEditableSalesperson(salesperson);
    },
    addSalesPerson(){
      this.formAction = "add";
      this.openModifyModal = true;
      this.editable = Object.assign({}, []);
      //this.setEditableSalesperson(salesperson);
    },
  }
}
</script>