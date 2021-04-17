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
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import SoundPlayer from 'react-native-sound-player';
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

const HomeScreen = ({navigation}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState('');

  const callback = audioUrl => {
    setIsLoading(false);
    console.log('in call');
    console.log('url:', audioUrl);
    try {
      SoundPlayer.loadUrl(url);
    } catch {
      e => console.log('Error', e);
    }
  };

  const onPress = async () => {
    setIsLoading(true);
    setIsVisible(true);
    const audioUrl = await getUrl('classical/classical1.mid');
    setUrl(audioUrl);
    await setTimeout(() => callback(audioUrl), 5000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={styles.headerTitle}>Pick a Genre</Text>
      <View style={styles.header} />
      {genre.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={onPress}
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
              <View>
                <Text>Hi</Text>
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
    width: '60%',
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
