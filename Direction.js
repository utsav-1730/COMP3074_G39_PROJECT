// Direction.js
import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const Direction = () => {
  const navigation = useNavigation();

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  // Get device dimensions
  const { width, height } = Dimensions.get('window');

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <Text style={styles.headerText}>Restaurant Location</Text>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825, // Example coordinates
              longitude: -122.4324,
              latitudeDelta: 0.005, // Zoom level
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true} // Show user's current location
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="Restaurant Name"
              description="123 Main St, City, Country"
            />
          </MapView>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDetails}>
          <Text style={styles.buttonText}>Back to Details</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for contrast
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Adjust for status bar
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
  },
  map: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
    elevation: 5, // Shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Direction;
