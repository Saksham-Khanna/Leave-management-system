<template>
  <aside 
    id="logo-sidebar" 
    class="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-100 sm:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    aria-label="Sidebar"
  >
    <div class="h-full px-4 pb-4 overflow-y-auto bg-white flex flex-col">
      <ul class="space-y-1.5 font-medium flex-1">
        <li v-for="item in menuItems" :key="item.path">
          <router-link 
            :to="item.path" 
            class="flex items-center p-3 text-gray-500 rounded-xl group hover:bg-gray-50 transition-all duration-200 border border-transparent"
            active-class="bg-blue-50/50 !text-blue-600 border-blue-100/50 font-bold"
          >
            <component 
              :is="item.icon" 
              class="w-5 h-5 transition duration-75 group-hover:text-blue-600"
              :class="$route.path === item.path ? 'text-blue-600' : 'text-gray-400'"
            />
            <span class="ml-3 text-sm tracking-tight">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>

      <div class="mt-auto pt-4 border-t border-gray-50">
        <div class="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-100 relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full transition-transform group-hover:scale-150 duration-700"></div>
          <p class="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 relative z-10">Premium Support</p>
          <p class="text-xs text-white/90 font-medium relative z-10 leading-relaxed">Have issues? Contact our internal HR desk.</p>
          <button class="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold rounded-lg transition-colors relative z-10">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Users, 
  UserCircle,
  FileText
} from 'lucide-vue-next';

const props = defineProps({
  user: Object,
  isOpen: Boolean
});

const menuItems = computed(() => {
  const common = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  if (props.user?.role === 'employee') {
    return [
      ...common,
      { name: 'Apply Leave', path: '/apply-leave', icon: PlusCircle },
      { name: 'My Leaves', path: '/my-leaves', icon: History },
      { name: 'Profile', path: '/profile', icon: UserCircle },
    ];
  } else {
    return [
      ...common,
      { name: 'Manage Requests', path: '/manage-requests', icon: FileText },
      { name: 'Team Members', path: '/team-members', icon: Users },
      { name: 'Profile', path: '/profile', icon: UserCircle },
    ];
  }
});
</script>
