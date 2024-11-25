// SharePost.js
import React from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SharePost = () => {
  const navigation = useNavigation();

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  const handleShare = (platform) => {
    // Simulate sharing functionality
    let url = '';
    if (platform === 'facebook') {
      url = 'https://www.facebook.com/sharer/sharer.php?u=yoururl.com';
    } else if (platform === 'twitter') {
      url = 'https://twitter.com/intent/tweet?url=yoururl.com&text=Check this out!';
    }
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.titleText}>Share Post</Text>

        <Text style={styles.descriptionText}>Choose your social media platform</Text>

        {/* Icons for Facebook and Twitter */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('facebook')}
          >
            <Icon name="facebook" size={60} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('twitter')}
          >
            <Icon name="twitter" size={60} color="#fff" />
          </TouchableOpacity>
        </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for better contrast
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 32, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Evenly distribute icons
    width: '100%',
    marginBottom: 32,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    padding: 20,
    borderRadius: 50,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5, // Add shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SharePost;
