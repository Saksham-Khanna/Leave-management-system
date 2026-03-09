<template>
  <div class="space-y-6">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Review Leave Requests</h1>
        <p class="text-gray-500 mt-1">Manage and respond to pending leave applications from your team.</p>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else>
      <LeaveTable 
        title="Active Requests Review" 
        :leaves="leaves" 
        role="employer"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import api from '../services/api';
import { useToast } from '../services/toast';
import LeaveTable from '../components/leaves/LeaveTable.vue';

const leaves = ref([]);
const loading = ref(true);
const toast = useToast();

const fetchData = async () => {
  if (leaves.value.length === 0) loading.value = true;
  try {
    const response = await api.get('/leaves/all');
    leaves.value = response.data.data;
  } catch (err) {
    toast.error('Failed to load leave requests');
  } finally {
    loading.value = false;
  }
};

const handleAction = async (id, action) => {
  try {
    await api.put(`/leaves/${id}/${action}`);
    toast.success(`Request ${action}d successfully`);
    fetchData(); // Refresh
  } catch (err) {
    toast.error(`Failed to ${action} request`);
  }
};

let pollInterval;

onMounted(() => {
  fetchData();
  // Poll every 10 seconds for new requests
  pollInterval = setInterval(fetchData, 10000);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});
</script>
