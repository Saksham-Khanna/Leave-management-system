<template>
  <div class="h-screen bg-[#FDFDFF] font-sans antialiased text-gray-900 overflow-hidden flex flex-col">
    <Toast />
    
    <!-- Navbar (only for logged in users) -->
    <Navbar v-if="user" :user="user" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 overflow-hidden pt-16">
      <!-- Sidebar (only for logged in users) -->
      <Sidebar v-if="user" :user="user" :isOpen="sidebarOpen" />

      <!-- Main Content -->
      <main 
        :class="[user ? 'lg:ml-64 p-4 lg:p-8' : '', 'flex-1 overflow-y-auto transition-all duration-300']"
      >
        <div :class="user ? 'max-w-7xl mx-auto' : ''">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/layout/Navbar.vue';
import Sidebar from './components/layout/Sidebar.vue';
import Toast from './components/common/Toast.vue';

const user = ref(null);
const sidebarOpen = ref(false);

const updateUser = () => {
  const storedUser = localStorage.getItem('user');
  user.value = storedUser ? JSON.parse(storedUser) : null;
};

onMounted(() => {
  updateUser();
  window.addEventListener('user-changed', updateUser);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  @apply bg-[#FDFDFF];
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-200 rounded-full hover:bg-gray-300;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
