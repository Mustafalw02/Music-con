import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff" shifting>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#075E54',
        tabBarIcon: ({color}) => (
          <Icon name="home" type="antdesign" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#00A699',
        tabBarIcon: ({color}) => (
          <Icon name="account-circle" type="material" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const renderLeft = navigation => {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{paddingLeft: 12}}>
      <Icon name="menu" type="feather" color="white" size={28} />
    </TouchableOpacity>
  );
};

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#075E54',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Music-Con',
        headerLeft: () => renderLeft(navigation),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00A699',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
    }}>
    <HomeStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerLeft: () => renderLeft(navigation),
      }}
    />
  </HomeStack.Navigator>
);
