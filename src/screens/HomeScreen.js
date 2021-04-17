/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {AudioPlayer} from 'react-native-simple-audio-player';

import {useTheme} from '@react-navigation/native';
import {getUrl} from '../storage/storage';

const genre = [
  {
    name: 'Classical',
    uri: require('../../assets/images/classical.jpeg'),
  },
  {
    name: 'HipHop',
    uri: require('../../assets/images/hiphop.jpeg'),
  },
  {
    name: 'Jazz',
    uri: require('../../assets/images/jazz.jpg'),
  },
];

const type = {
  Classical: 'classical',
  HipHop: 'hiphop',
  Jazz: 'jazz',
};

const HomeScreen = ({navigation}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [music, setMusic] = useState('');

  const callback = audioUrl => {
    setUrl(audioUrl);
    setIsLoading(false);
  };

  const onPress = async item => {
    setMusic(item);
    setIsLoading(true);
    setIsVisible(true);
    const filePath = type[item];
    const audioUrl = await getUrl(filePath);
    await setTimeout(() => callback(audioUrl), 5000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={styles.headerTitle}>Pick a Genre</Text>
      <View style={styles.header} />
      {url !== "" && (
        <TouchableOpacity
          onPress={async () => await Linking.openURL(url)}
          style={[styles.box, styles.shadow]}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            Download the last played song
          </Text>
          <Icon name="download" type="feather" />
        </TouchableOpacity>
      )}
      {genre.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(item.name)}
            key={`${index}`}
            style={[styles.cardContainer, styles.shadow]}>
            <Image
              source={item.uri}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
            <View style={styles.mask}>
              <Icon
                name="play-circle-outline"
                type="material"
                size={100}
                color="#ffffff"
              />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <Modal
        isVisible={isVisible}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.modalContainer}>
          {!isLoading && (
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={{alignSelf: 'flex-end'}}>
              <Icon name="close" type="material" size={24} />
            </TouchableOpacity>
          )}
          <Text style={{fontSize: 20, fontWeight: '700'}}>
            {isLoading ? 'Generating Audio' : 'Enjoy!'}
          </Text>
          {isLoading ? (
            <>
              <Text style={{fontSize: 16, fontWeight: '600', marginTop: 8}}>
                Please wait...
              </Text>
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color="#00A699"
              />
            </>
          ) : (
            <>
              <View style={styles.player}>
                <Image
                  source={require('../../assets/album-art.png')}
                  style={{width: 200, height: 200, alignSelf: 'center'}}
                  resizeMode="contain"
                />
                <Text style={styles.playerText}>{music}</Text>
                <AudioPlayer url={url} />
              </View>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  box: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '91%',
    borderWidth: 2,
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#075E5475',
  },
  player: {
    borderWidth: 1,
    backgroundColor: '#075E5475',
    justifyContent: 'center',
    marginTop: 16,
    paddingBottom: 12,
    borderRadius: 24,
  },
  playerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 32,
    marginTop: -16,
  },
  header: {
    width: '91%',
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 0.75,
    alignSelf: 'center',
    borderColor: '#075E5475',
  },
  headerTitle: {
    marginTop: 16,
    fontSize: 24,
    paddingLeft: 18,
    alignSelf: 'flex-start',
    fontWeight: '700',
    color: '#075E54',
  },
  cardContainer: {
    width: '75%',
    height: 250,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderColor: '#EEEEEE',
  },
  cardText: {
    borderWidth: 2,
    borderRadius: 16,
    width: '50%',
    borderColor: '#075E54',
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#075E54',
  },
  modalContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    minWidth: '60%',
  },
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff75',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  shadow: {
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
});
