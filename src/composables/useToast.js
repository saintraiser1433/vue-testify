import Swal from 'sweetalert2'
export const useToast = () => {
  const setToast = (icon, title, timer = 3000) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    })
    return Toast.fire({
      icon: icon,
      title: title
    })
  }

  return { setToast }
}
