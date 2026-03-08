<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">My Leave History</h1>
      <p class="text-gray-500 mt-1">Track all your previous and currently active leave applications.</p>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else>
      <LeaveTable 
        title="Application Records" 
        :leaves="leaves" 
        role="employee"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useToast } from '../services/toast';
import LeaveTable from '../components/leaves/LeaveTable.vue';

const leaves = ref([]);
const loading = ref(true);
const toast = useToast();

const fetchData = async () => {
  try {
    const response = await api.get('/leaves/my');
    leaves.value = response.data.data;
  } catch (err) {
    toast.error('Failed to load leave records');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>
