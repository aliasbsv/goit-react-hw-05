/* import toast from 'react-hot-toast';

export const sendNoteEmptyField = () =>
  toast('You must enter the name of the movie in the input field');

export const sendNoteBadRequest = () => toast('Bad request. Try again');

export const sendErrorNotification = message =>
  toast.error(message || 'An error occurred. Please try again.'); */

import toast from 'react-hot-toast';

const toastOptions = {
  position: 'top-right',
  duration: 3000,
  style: {
    background: '#363636',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
  },
};

export const sendNoteEmptyField = () =>
  toast.error(
    'You must enter the name of the movie in the input field',
    toastOptions
  );

export const sendNoteBadRequest = () =>
  toast.error('Bad request. Try again', toastOptions);

export const sendErrorNotification = message =>
  toast.error(message || 'An error occurred. Please try again.', toastOptions);

export const sendSuccessNotification = message =>
  toast.success(message || 'Operation successful!', toastOptions);
