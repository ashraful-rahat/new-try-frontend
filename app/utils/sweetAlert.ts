import Swal from 'sweetalert2';

// SweetAlert configuration
export const sweetAlert = {
  // Success Alert
  success: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'success' as const,
      confirmButtonColor: '#22c55e', // green-500
      confirmButtonText: 'ঠিক আছে',
      timer: 3000,
      timerProgressBar: true,
    });
  },

  // Error Alert
  error: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'error' as const,
      confirmButtonColor: '#ef4444', // red-500
      confirmButtonText: 'বুঝেছি',
    });
  },

  // Warning Alert
  warning: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning' as const,
      confirmButtonColor: '#f59e0b', // yellow-500
      confirmButtonText: 'বুঝেছি',
    });
  },

  // Info Alert
  info: (title: string, text?: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'info' as const,
      confirmButtonColor: '#3b82f6', // blue-500
      confirmButtonText: 'ঠিক আছে',
    });
  },

  // Question/Confirmation Dialog
  confirm: (title: string, text: string, confirmText: string = 'হ্যাঁ', cancelText: string = 'না') => {
    return Swal.fire({
      title,
      text,
      icon: 'question' as const,
      showCancelButton: true,
      confirmButtonColor: '#22c55e', // green-500
      cancelButtonColor: '#ef4444', // red-500
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });
  },

  // Loading Alert
  loading: (title: string = 'লোড হচ্ছে...') => {
    return Swal.fire({
      title,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  // Close Alert
  close: () => {
    Swal.close();
  },

  // Toast Notification
  toast: (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon,
      title,
    });
  },

  // Input Dialog
  prompt: (title: string, text: string, inputType: 'text' | 'textarea' | 'number' = 'text', placeholder?: string) => {
    return Swal.fire({
      title,
      text,
      input: inputType,
      inputPlaceholder: placeholder,
      showCancelButton: true,
      confirmButtonText: 'সাবমিট',
      cancelButtonText: 'বাতিল',
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      reverseButtons: true,
    });
  },

  // Custom HTML Alert
  html: (title: string, html: string, confirmText: string = 'ঠিক আছে') => {
    return Swal.fire({
      title,
      html,
      confirmButtonText: confirmText,
      confirmButtonColor: '#22c55e',
    });
  },
};