<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
    <div class="max-w-md w-full">
      <!-- Logo Header -->
      <div class="text-center mb-8">
        <div class="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <CalendarCheck class="text-white w-7 h-7" />
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
        <p class="text-gray-500 mt-2">Simplify your leave management</p>
      </div>

      <div class="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <Mail class="w-5 h-5" />
              </span>
              <input 
                v-model="form.email"
                type="email" 
                required 
                placeholder="name@company.com"
                class="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <Lock class="w-5 h-5" />
              </span>
              <input 
                v-model="form.password"
                type="password" 
                required 
                placeholder="••••••••"
                class="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50"
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
          >
            <span v-if="loading" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Sign In to Portal
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-gray-500 text-sm">
            Don't have an account? 
            <router-link to="/signup" class="text-blue-600 font-bold hover:underline">Create Account</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Mail, Lock, CalendarCheck } from 'lucide-vue-next';
import api from '../services/api';
import { useToast } from '../services/toast';

const router = useRouter();
const toast = useToast();
const loading = ref(false);

const form = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await api.post('/auth/login', form);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    window.dispatchEvent(new Event('user-changed'));
    toast.success(`Welcome back, ${user.name}!`);
    router.push('/dashboard');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed');
  } finally {
    loading.value = false;
  }
};
</script>
