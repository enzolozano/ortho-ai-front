import { Bounce, toast } from 'react-toastify'

const toastOptions = {
  closeOnClick: true,
  theme: 'colored',
  transition: Bounce
}

export const ToastSuccess = (text) => {
  toast.success(text, toastOptions)
}

export const ToastWarning = (text) => {
  toast.success(text, toastOptions)
}

export const ToastError = (text) => {
  toast.error(text, toastOptions)
}
