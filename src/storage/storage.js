import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

const db = storage();
const path = 'music/';

export const getUrl = async filePath => {
  console.log("In getUrl");
  const url = await storage()
    .ref('/music/classical/classical1.mid')
    .getDownloadURL()
    .catch(e => console.log(e));
  return url;
};
