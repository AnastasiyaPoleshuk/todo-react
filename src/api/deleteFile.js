import { storage } from "../firebase.config";

/**
 * 
 * @param {string} fileName 
 * @returns {boolean} response
 */

const deleteFile = async (fileName) => {
  const ref = storage.ref();
  
  const response = await ref.child(fileName).delete()
    .then(() => {
      return { isSuccess: true}
    }).catch(() => {
      return { isSuccess: false }
    });

  return response;
};

export default deleteFile;