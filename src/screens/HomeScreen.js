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
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

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

  const onPress = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose any 1 Genre</Text>
      </View>
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
        isVisible={isLoading}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.modalContainer}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>
            Generating Audio
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600', marginTop: 8}}>
            Please wait...
          </Text>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="#00A699"
          />
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
    width: '90%',
    padding: 8,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#075E54',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
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
