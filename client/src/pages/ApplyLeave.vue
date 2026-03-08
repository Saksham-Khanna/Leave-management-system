<template>
  <div class="max-w-3xl mx-auto py-4">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Apply for Leave</h1>
      <p class="text-gray-500 mt-1">Please fill out the form below to submit your leave request.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div class="p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <!-- Leave Type -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">Leave Type</label>
              <div class="relative">
                <select 
                  v-model="form.leaveType"
                  required
                  class="block w-full px-4 py-3 rounded-xl border border-gray-200 appearance-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-gray-700 bg-gray-50/50"
                >
                  <option value="" disabled>Select a type...</option>
                  <option value="Sick">🤒 Sick Leave</option>
                  <option value="Casual">🏖️ Casual Leave</option>
                  <option value="Paid">💰 Paid Leave</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown class="w-4 h-4" />
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
              <input 
                v-model="form.startDate"
                type="date" 
                required
                class="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">End Date</label>
              <input 
                v-model="form.endDate"
                type="date" 
                required
                class="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50"
              />
            </div>

            <!-- Reason -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">Reason for Leave</label>
              <textarea 
                v-model="form.reason"
                rows="4" 
                required
                placeholder="Explain why you need this time off..."
                class="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50/50 resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4">
            <button 
              type="button" 
              @click="$router.back()"
              class="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronDown } from 'lucide-vue-next';
import api from '../services/api';
import { useToast } from '../services/toast';

const router = useRouter();
const toast = useToast();
const loading = ref(false);

const form = reactive({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: ''
});

const handleSubmit = async () => {
  if (new Date(form.startDate) > new Date(form.endDate)) {
    toast.error('Start date cannot be after end date.');
    return;
  }

  loading.value = true;
  try {
    await api.post('/leaves/apply', form);
    toast.success('Your leave request has been submitted!');
    router.push('/dashboard');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Submission failed');
  } finally {
    loading.value = false;
  }
};
</script>
