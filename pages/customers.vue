<template>
  <div class="">
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li 
          v-for="customer in customers"
          :key="customer.customerId" 
          class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
        <div class="flex-1 flex flex-col p-4">
          <!-- <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""> -->
          <h3 class="text-gray-900 text-xl font-semibold">{{customer.firstName}} {{customer.lastName}}</h3>
          <div class="">
            <dl class="mt-1 pb-4 flex-grow flex flex-col justify-between border-b-2 border-gray-400">
              <dt class="sr-only">Start Date</dt>
              <dd class="text-gray-500 text-sm leading-5">{{GetFormattedDate(customer.startDate)}}</dd>
            </dl>
            <dl class="mt-1 pt-4 flex-grow flex flex-col justify-between">
              <dt class="sr-only">Address1</dt>
              <dd class="text-gray-500 text-sm leading-5">{{customer.address1}}</dd>
              <dt class="sr-only">Address2</dt>
              <dd class="text-gray-500 text-sm leading-5">{{customer.address2}}</dd>
              <dt class="sr-only">City, State, and Postal Code</dt>
              <dd class="text-gray-500 text-sm leading-5">{{customer.city}}, {{customer.state}} {{customer.postalCode}}</dd>
            </dl>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="-mt-px flex">
            <div class="-ml-px w-0 flex-1 flex">
              <a href="#" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="ml-3">Call ({{customer.phoneNumber}})</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from '@nuxtjs/axios';
import moment from 'moment';

export default {
  components: {
  },
  data() {
    return {
      addIngredientModalIsOpen: false,
      mine: []
    };
  },
  created() {
    this.getCustomers();
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      customers: state => state.customers.customers,
    }),
  },
  methods: {
    ...mapActions({ 
      getCustomers: 'customers/getCustomers'
    }),
    GetFormattedDate(dateVal) {
      return moment(dateVal).format("MM-DD-YYYY")
    }
  }
}
</script>