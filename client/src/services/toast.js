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
    const index = state.toasts.findIndex(t => t.id === id);
    if (index !== -1) {
      state.toasts.splice(index, 1);
    }
  };

  return {
    toasts: state.toasts,
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    removeToast
  };
};
