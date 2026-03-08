<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
      <div v-if="searchable" class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search class="w-4 h-4 text-gray-400" />
        </span>
        <input 
          v-model="search" 
          type="text" 
          placeholder="Search..." 
          class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white">
          <tr class="text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
            <th v-if="role === 'employer'" class="px-6 py-4">Employee</th>
            <th class="px-6 py-4">Type</th>
            <th class="px-6 py-4">Duration</th>
            <th class="px-6 py-4">Reason</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th v-if="role === 'employer'" class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr 
            v-for="leave in filteredLeaves" 
            :key="leave._id"
            class="hover:bg-blue-50/30 transition-colors"
          >
            <td v-if="role === 'employer'" class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3 text-sm">
                  {{ leave.employeeId?.name?.[0] }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800 leading-tight">{{ leave.employeeId?.name }}</p>
                  <p class="text-xs text-gray-400">{{ leave.employeeId?.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-sm font-medium text-gray-700">{{ leave.leaveType }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="text-xs font-semibold text-gray-700">{{ formatDate(leave.startDate) }}</div>
              <div class="text-[10px] text-gray-400">to {{ formatDate(leave.endDate) }}</div>
            </td>
            <td class="px-6 py-4">
              <p class="text-xs text-gray-500 line-clamp-2 max-w-[200px]">{{ leave.reason }}</p>
            </td>
            <td class="px-6 py-4 text-center">
              <StatusBadge :status="leave.status" />
            </td>
            <td v-if="role === 'employer'" class="px-6 py-4 text-right">
              <div v-if="leave.status === 'pending'" class="flex justify-end space-x-2">
                <button 
                  @click="$emit('action', leave._id, 'approve')"
                  class="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors border border-green-100"
                  title="Approve"
                >
                  <CheckCircle class="w-4 h-4" />
                </button>
                <button 
                  @click="$emit('action', leave._id, 'reject')"
                  class="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                  title="Reject"
                >
                  <XCircle class="w-4 h-4" />
                </button>
              </div>
              <span v-else class="text-[10px] uppercase font-bold text-gray-300 italic">No actions</span>
            </td>
          </tr>
          <tr v-if="filteredLeaves.length === 0">
            <td :colspan="role === 'employer' ? 6 : 5" class="px-6 py-20 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="bg-gray-50 p-4 rounded-full mb-4">
                  <ClipboardList class="w-12 h-12 text-gray-300" />
                </div>
                <h4 class="text-gray-900 font-semibold">No records found</h4>
                <p class="text-gray-400 text-sm">Update your search or check later.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Simple Pagination Concept -->
    <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
      <p class="text-xs text-gray-500 italic">Showing {{ filteredLeaves.length }} records</p>
      <div class="flex space-x-2">
        <button disabled class="px-3 py-1 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-white">Previous</button>
        <button disabled class="px-3 py-1 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-white">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, CheckCircle, XCircle, ClipboardList } from 'lucide-vue-next';
import StatusBadge from '../common/StatusBadge.vue';

const props = defineProps({
  title: String,
  leaves: Array,
  role: String,
  searchable: { type: Boolean, default: true }
});

defineEmits(['action']);

const search = ref('');

const filteredLeaves = computed(() => {
  if (!search.value) return props.leaves;
  const q = search.value.toLowerCase();
  return props.leaves.filter(l => 
    l.leaveType.toLowerCase().includes(q) || 
    l.reason.toLowerCase().includes(q) ||
    l.employeeId?.name?.toLowerCase().includes(q)
  );
});

const formatDate = (d) => {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};
</script>
