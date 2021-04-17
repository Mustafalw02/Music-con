import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export const GenreCard = () => {
  return (
    <TouchableOpacity style={[styles.container, styles.shadow]}>
      <Text>Hi</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '250',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderColor: '#969696',
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
