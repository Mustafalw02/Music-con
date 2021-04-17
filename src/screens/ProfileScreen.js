import React, {useContext} from 'react';
import {View, Text, StatusBar, StyleSheet, Linking} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';

const ProfileScreen = () => {
  const {user} = useContext(AuthContext);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View>
        <Avatar.Image
          source={{
            uri:
              'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg',
          }}
          style={[styles.avatar, styles.shadow]}
          size={250}
        />
      </View>
      <View style={[styles.InfoCard, styles.shadow]}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Username: </Text>
          <Text style={styles.textDescription}>
            @{user.email.split('@')[0]}
          </Text>
        </View>
        <View style={[styles.textContainer, {marginBottom: 0}]}>
          <Text style={styles.textTitle}>E-mail: </Text>
          <Text style={styles.textDescription}>{user.email}</Text>
        </View>
      </View>
      <Text style={{fontSize: 16, fontWeight: '600', color: '#00000080'}}>
        Leave us a feedback at{' '}
        <Text
          onPress={async () => {
            await Linking.openURL(`mailto:thedeepmusiccon@gmail.com`);
          }}
          style={{fontSize: 16, fontWeight: '600', color: '#075E54'}}>
          thedeepmusiccon@gmail.com
        </Text>
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#075E5480',
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  textDescription: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 16,
  },
  InfoCard: {
    width: '80%',
    borderWidth: 1,
    marginVertical: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderColor: '#075E5480',
  },
  shadow: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
});
