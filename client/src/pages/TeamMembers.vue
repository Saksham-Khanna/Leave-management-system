<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Team Members</h1>
      <p class="text-gray-500 mt-1">A comprehensive list of all employees in the organization.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Table -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50/50 border-b border-gray-100">
            <tr class="text-xs uppercase text-gray-400 font-bold">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4 text-center">Total Leaves</th>
              <th class="px-6 py-4 text-right">Joined Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="user in users" :key="user._id" class="hover:bg-blue-50/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                    {{ user.name[0] }}
                  </div>
                  <span class="text-sm font-bold text-gray-800">{{ user.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-lg border border-green-100">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold text-xs border border-gray-200">
                  {{ user.totalLeaves }}
                </span>
              </td>
              <td class="px-6 py-4 text-right text-xs text-gray-400 font-medium">
                {{ formatDate(user.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useToast } from '../services/toast';

const users = ref([]);
const loading = ref(true);
const toast = useToast();

const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data.data;
  } catch (err) {
    toast.error('Failed to load team members');
  } finally {
    loading.value = false;
  }
};

const formatDate = (d) => {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

onMounted(fetchUsers);
</script>
