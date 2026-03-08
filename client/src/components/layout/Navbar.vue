<template>
  <nav class="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button @click="$emit('toggle-sidebar')" class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 rounded">
            <Menu class="w-6 h-6" />
          </button>
          <router-link to="/" class="flex ml-2 md:mr-24">
            <div class="bg-blue-600 p-1.5 rounded-lg mr-2">
              <CalendarCheck class="w-6 h-6 text-white" />
            </div>
            <span class="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-800">LeavePortal</span>
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div class="text-right mr-4 hidden sm:block">
              <p class="text-sm font-semibold text-gray-900 leading-none mb-1">{{ user?.name }}</p>
              <span 
                :class="user?.role === 'employer' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full"
              >
                {{ user?.role }}
              </span>
            </div>
            <button @click="handleLogout" class="flex items-center text-gray-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
              <LogOut class="w-5 h-5" />
              <span class="ml-2 text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { CalendarCheck, LogOut, Menu } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

defineProps(['user']);
const emit = defineEmits(['toggle-sidebar']);
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('user-changed'));
  router.push('/login');
};
</script>
