import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('RestaurantList');
    }, 2000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/splash.jpeg')} 
        style={styles.image}
        resizeMode="fit" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', 
    height: '100%',
  },
});

export default SplashScreen;
