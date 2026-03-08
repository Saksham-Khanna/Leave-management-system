<template>
  <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <div :class="`p-3 rounded-xl mr-4 ${iconBg}`">
      <component :is="icon" :class="`w-6 h-6 ${iconColor}`" />
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">{{ label }}</p>
      <h3 class="text-2xl font-bold text-gray-800">{{ value }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  icon: Object,
  iconBg: String,
  iconColor: String
});
</script>
