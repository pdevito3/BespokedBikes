<template>
  <portal to="modals">
    <div v-show="open" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div v-show="open" @click="closeModal()" x-description="Background overlay, show/hide based on modal state." 
          enter-active-class="ease-out duration-300" 
          enter-class="opacity-0" 
          enter-to-class="opacity-100" 
          leave-active-class="ease-in duration-200" 
          leave-class="opacity-100" 
          leave-to-class="opacity-0" 
          class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>​
        <div v-show="open" x-description="Modal panel, show/hide based on modal state." 
          enter-active-class="ease-out duration-300" 
          enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
          enter-to-class="opacity-100 translate-y-0 sm:scale-100" 
          leave-active-class="ease-in duration-200" 
          leave-class="opacity-100 translate-y-0 sm:scale-100" 
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>

            <!-- content -->
            <div class="">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Salesperson Information
                </h3>
              </div>
              <div class="mt-6 sm:mt-5">
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    First name
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.firstName" id="first_name" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label for="last_name" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    Last name
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.lastName" id="last_name" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label for="address1" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    Address
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.address1" id="address1" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <div class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    <label for="address2" class="sr-only">
                      Address2
                    </label>
                  </div>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.address2" id="address2" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label for="city" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    City
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.city" id="city" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label for="state" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    State
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.state" id="state" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>

                <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label for="zip" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                    ZIP / Postal
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                      <input v-model="salesperson.postalCode" id="zip" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label for="phone_number" class="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Phone Number
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <div class="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input v-model="salesperson.phoneNumber" id="phone_number" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </div>
              </div>
            </div>

          </div>
          <div class="mt-5 sm:mt-6 space-y-2">
            <span class="flex w-full rounded-md shadow-sm">
              <button @click="submit(salesperson)" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Submit
              </button>
            </span>
            
            <span class="flex w-full rounded-md shadow-sm">
              <button @click="closeModal()" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ['open','formAction', 'salesperson'],
  data() {
    return {
    };
  },  
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    // ...mapState({
    //   editableSalesperson: state => state.salespersons.editableSalesperson,
    // }),
  },
  methods: {
    ...mapActions({ 
      updateSalesperson: 'salespersons/updateSalesperson',
      addSalesperson: 'salespersons/addSalesperson',
    }),
    closeModal() {
      this.$emit("closeModal");
    },
    submit() {
      if(this.formAction == "edit")
        this.updateSalesperson(this.salesperson);
      if(this.formAction == "add")
        this.addSalesperson(this.salesperson);
      
      this.$emit("closeModal");
    },
  }
}
</script>

<style>

</style>