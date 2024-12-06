// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import RestaurantList from './RestaurantList';
import CreatePost from './CreatePost'; 
import EditRestaurant from './EditRestaurant';
import Details from './Details';
import SharePost from './SharePost';
import Direction from './Direction';
import About from './About';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="false">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RestaurantList" component={RestaurantList} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurant} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SharePost" component={SharePost} /> 
        <Stack.Screen name="Direction" component={Direction} /> 
        <Stack.Screen name="About" component={About} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
