import { toast } from "react-toastify";
export const toastType = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      // autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      // autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  warn: (message: string) => {
    toast.warn(message, {
      position: "top-right",
      // autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  info: (message: string) => {
    toast.info(message, {
      position: "top-right",
      // autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  default: (message: string) => {
    toast(message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  },
};
