import { storage } from "../firebase.config";

/**
 * 
 * @param {{lastModified: number; lastModifiedDate: date; name: string; size: number; type: string; webkitRelativePath: string}} data 
 * @returns {string} response
 */

const setFile = async (data) => {
  const ref = storage.ref();
  const name = data.name;
  const metadata = {
    contentType: data.type
  }

  const response = await ref.child(name).put(data, metadata)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => { return url })
  
  return response;
};

export default setFile;
