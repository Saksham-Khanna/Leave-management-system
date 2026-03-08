import { reactive } from 'vue';

const state = reactive({
  toasts: []
});

export const useToast = () => {
  const addToast = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    state.toasts.push({ id, message, type });
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    state.toasts = state.toasts.filter(t => t.id !== id);
  };

  return {
    toasts: state.toasts,
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    removeToast
  };
};
