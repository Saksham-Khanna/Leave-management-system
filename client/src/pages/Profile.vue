<template>
  <div class="max-w-2xl mx-auto py-4">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Your Profile</h1>
      <p class="text-gray-500 mt-1">Manage your account information and preferences.</p>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else class="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
      <div class="flex items-center space-x-6 mb-10">
        <div class="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-100">
          {{ user.name?.[0] }}
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900 leading-tight">{{ user.name }}</h2>
          <p class="text-gray-500 font-medium">{{ user.email }}</p>
          <div class="mt-2">
            <span class="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-full border border-blue-100">
              {{ user.role }}
            </span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleUpdate" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50 font-semibold"
          />
        </div>

        <div class="flex items-center justify-end space-x-3 pt-4">
          <button 
            type="submit" 
            :disabled="updating"
            class="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            {{ updating ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../services/api';
import { useToast } from '../services/toast';

const user = ref({});
const loading = ref(true);
const updating = ref(false);
const toast = useToast();

const form = reactive({
  name: ''
});

const fetchProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    user.value = response.data.data;
    form.name = user.value.name;
  } catch (err) {
    toast.error('Failed to load profile');
  } finally {
    loading.value = false;
  }
};

const handleUpdate = async () => {
  updating.value = true;
  try {
    const response = await api.put('/auth/profile', { name: form.name });
    user.value = response.data.data;
    
    // Update local storage name too
    const storedUser = JSON.parse(localStorage.getItem('user'));
    storedUser.name = user.value.name;
    localStorage.setItem('user', JSON.stringify(storedUser));
    
    // Notify app
    window.dispatchEvent(new Event('user-changed'));
    
    toast.success('Profile updated successfully!');
  } catch (err) {
    toast.error('Failed to update profile');
  } finally {
    updating.value = false;
  }
};

onMounted(fetchProfile);
</script>
