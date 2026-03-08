<template>
  <div class="fixed bottom-5 right-5 z-[100] flex flex-col space-y-3 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="`pointer-events-auto p-4 rounded-xl shadow-lg border-l-4 flex items-center min-w-[300px] ${config[toast.type].bg} ${config[toast.type].border}`"
      >
        <component :is="config[toast.type].icon" :class="`w-5 h-5 mr-3 ${config[toast.type].text}`" />
        <p :class="`text-sm font-semibold ${config[toast.type].text}`">{{ toast.message }}</p>
        <button @click="removeToast(toast.id)" class="ml-auto text-gray-400 hover:text-gray-600">
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next';
import { useToast } from '../../services/toast';

const { toasts, removeToast } = useToast();

const config = {
  success: { bg: 'bg-white', border: 'border-green-500', text: 'text-green-700', icon: CheckCircle },
  error: { bg: 'bg-white', border: 'border-red-500', text: 'text-red-700', icon: XCircle },
  info: { bg: 'bg-white', border: 'border-blue-500', text: 'text-blue-700', icon: Info },
};
</script>
