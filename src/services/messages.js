import toast from 'react-hot-toast';

export const sendNoteEmptyField = () =>
  toast('You must enter the name of the movie in the input field');

export const sendNoteBadRequest = () => toast('Bad request. Try again');
