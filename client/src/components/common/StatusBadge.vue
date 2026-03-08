<template>
  <span 
    :class="`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text} ${config.border} border`"
  >
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: String
});

const config = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'approved':
      return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100' };
    case 'rejected':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' };
    case 'pending':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100' };
  }
});
</script>
