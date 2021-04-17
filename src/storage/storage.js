import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

const db = storage();
const path = '/music/';

export const getUrl = async filePath => {
  const x = Math.floor((Math.random() * 10) + 1);
  const fullPath = `${path}${filePath}/${filePath}${x}.mid`;
  const url = await storage()
    .ref(fullPath)
    .getDownloadURL()
    .catch(e => console.log(e));
  return url;
};
