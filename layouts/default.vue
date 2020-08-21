<template>
    <div class="h-screen flex overflow-hidden bg-gray-100 antialiased font-sans" @keydown.escape="toggleSidebar(false)">
    <sidebar :sidebarOpen="sidebarOpen" @closeSidebar="toggleSidebar" />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden px-1 pt-1 sm:px-3 sm:pt-3 flex items-center justify-between">
        <button @click.stop="sidebarOpen = true" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <p class="pr-3 text-xl text-gray-800 font-bold uppercase">Bespoked Bikes</p>
      </div>
      <portal-target name="modals" multiple></portal-target>
      <main
        class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
        tabindex="0"
      >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {  
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar(toggleVal) {
      this.sidebarOpen = toggleVal;
    }
  }
}
</script>