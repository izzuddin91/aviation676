import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confirmButtonStyle =
  "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-300 rounded px-5 py-2.5 mr-2 mb-2";
const cancelButtonStyle =
  "focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-1 focus:ring-red-300 rounded px-5 py-2.5 mr-2 mb-2";

export const successAlert = (
  title: string,
  text: string,
  onProceed?: Function,
  confirmButtonText = "Ok"
) => {
  MySwal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText,
    showCancelButton: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonStyle,
    },
  }).then(() => {
    if (onProceed) {
      onProceed();
    }
  });
};

export const errorAlert = (
  title: string,
  text: string,
  onProceed?: Function,
  confirmButtonText = "Ok"
) => {
  MySwal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText,
    showCancelButton: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonStyle,
    },
  }).then(() => {
    if (onProceed) {
      onProceed();
    }
  });
};

export const confirmAlert = (
  title: string,
  text: string,
  onConfirm?: Function,
  onCancel?: Function,
  confirmButtonText = "Yes",
  cancelButtonText = "No"
) => {
  MySwal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    buttonsStyling: false,
    customClass: {
      confirmButton: confirmButtonStyle,
      cancelButton: cancelButtonStyle,
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) {
        onConfirm();
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (onCancel) {
        onCancel();
      }
    }
  });
};
