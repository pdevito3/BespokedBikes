<template>
  <div class="">
    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li 
          v-for="customer in customers"
          :key="customer.customerId" 
          class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
        <div class="flex-1 flex flex-col pt-4 px-4">
          <!-- <img class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""> -->
          <h3 class="text-gray-900 text-xl font-semibold truncate">{{customer.firstName}} {{customer.lastName}}</h3>
          <div class="pb-2 ">
            <dl class="mt-1 pb-4 flex-grow flex flex-col justify-between border-b-2 border-gray-400 gap-y-1">
              <div class="flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-400" aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" class=""></path></svg>
                <dt class="sr-only">Start Date</dt>
                <dd class="ml-2 text-gray-900 text-sm leading-5">{{GetFormattedDate(customer.startDate)}}</dd>
              </div>
              <div class="flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <dt class="sr-only">Phone Number</dt>
                <dd class="ml-2 text-gray-500 text-sm leading-5">{{customer.phoneNumber}}</dd>
              </div>
            </dl>
            <dl class="mt-1 pt-4 flex-grow flex flex-col justify-between text-gray-900">
              <dt class="sr-only">Address1</dt>
              <dd class="text-sm leading-5">{{customer.address1}}</dd>
              <dt class="sr-only">Address2</dt>
              <dd class="text-sm leading-5">{{customer.address2}}</dd>
              <dt class="sr-only">City, State, and Postal Code</dt>
              <dd class="text-sm leading-5">{{customer.city}}, {{customer.state}} {{customer.postalCode}}</dd>
            </dl>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="-mt-px flex">
            <div class="-ml-px w-0 flex-1 flex">
              <button class="group relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" class=""></path>
                </svg>
                <span class="ml-3 text-gray-400 group-hover:text-gray-500">Edit</span>
              </button>
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
import Clock from '@fortawesome/fontawesome-free/svgs/regular/clock.svg'

export default {
  components: {
    Clock
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