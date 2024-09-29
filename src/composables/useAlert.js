import Swal from 'sweetalert2'

export const useAlert = () => {
  const setAlert = (icon, title, text, confirmButtonText, timer = 3000) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    })
  }

  return { setAlert }
}
