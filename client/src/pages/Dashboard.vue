<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, {{ userName }}! 👋
        </h1>
        <p class="text-gray-500 mt-1">Here's what's happening with leave requests today.</p>
      </div>
      <div v-if="user?.role === 'employee'">
        <router-link 
          to="/apply-leave" 
          class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-lg shadow-blue-200 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all duration-300 hover:-translate-y-0.5"
        >
          <PlusCircle class="w-5 h-5 mr-2" />
          Apply New Leave
        </router-link>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Total Requests" 
        :value="stats.total" 
        :icon="FileText" 
        iconBg="bg-blue-50" 
        iconColor="text-blue-600" 
      />
      <StatCard 
        label="Pending Approval" 
        :value="stats.pending" 
        :icon="Clock" 
        iconBg="bg-yellow-50" 
        iconColor="text-yellow-600" 
      />
      <StatCard 
        label="Approved" 
        :value="stats.approved" 
        :icon="CheckCircle2" 
        iconBg="bg-green-50" 
        iconColor="text-green-600" 
      />
      <StatCard 
        label="Rejected" 
        :value="stats.rejected" 
        :icon="XCircle" 
        iconBg="bg-red-50" 
        iconColor="text-red-600" 
      />
    </div>

    <!-- Recent Activity Table -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else>
      <LeaveTable 
        :title="user?.role === 'employer' ? 'All Employee Requests' : 'Your Recent Applications'" 
        :leaves="leaves" 
        :role="user?.role"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PlusCircle 
} from 'lucide-vue-next';
import api from '../services/api';
import { useToast } from '../services/toast';
import StatCard from '../components/common/StatCard.vue';
import LeaveTable from '../components/leaves/LeaveTable.vue';

const user = ref(JSON.parse(localStorage.getItem('user')));
const leaves = ref([]);
const loading = ref(true);
const toast = useToast();

const userName = computed(() => {
  if (!user.value || !user.value.name) return 'User';
  return user.value.name.split(' ')[0];
});

const stats = reactive({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
});

const calculateStats = (data) => {
  stats.total = data.length;
  stats.pending = data.filter(l => l.status === 'pending').length;
  stats.approved = data.filter(l => l.status === 'approved').length;
  stats.rejected = data.filter(l => l.status === 'rejected').length;
};

const fetchData = async () => {
  if (leaves.value.length === 0) loading.value = true;
  try {
    const endpoint = user.value.role === 'employer' ? '/leaves/all' : '/leaves/my';
    const response = await api.get(endpoint);
    leaves.value = response.data.data;
    calculateStats(leaves.value);
  } catch (err) {
    toast.error('Failed to load dashboard data');
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
  // Poll every 10 seconds
  pollInterval = setInterval(fetchData, 10000);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});
</script>
