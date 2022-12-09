import { LIMIT_MOBILE_WIDTH } from 'commons/constants';
import sessionManager from 'managers/session-manager';
import { toast, ToastOptions } from 'react-toastify';

const getToastOptions = () => {
    const options = {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: true
    };

    if (window.innerWidth < LIMIT_MOBILE_WIDTH || sessionManager.isMobile) {
        options.position = 'top-center';
        options.closeButton = false;
    }

    return options as ToastOptions;
};

const toasty = {
    success: (message: string) => {
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.success(message, getToastOptions());
    },
    info: (message: string) => {
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.info(message, getToastOptions());
    },
    warn: (message: string) => {
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.warn(message, getToastOptions());
    },
    error: (message: string) => {
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(message, getToastOptions());
    }
};

export default toasty;
