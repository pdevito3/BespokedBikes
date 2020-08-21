<template>
  <portal to="modals">
    <div v-show="open" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div v-show="open" x-description="Background overlay, show/hide based on modal state." 
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
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <!-- content -->
          </div>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button @click="open = false;" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Go back to dashboard
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {
      // open: true
    };
  },  
}
</script>

<style>

</style>