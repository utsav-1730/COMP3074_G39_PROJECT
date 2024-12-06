import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SharePost = () => {
  const navigation = useNavigation();

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = 'https://www.facebook.com/sharer/sharer.php?u=yoururl.com';
        break;
      case 'twitter':
        url = 'https://twitter.com/intent/tweet?url=yoururl.com&text=Check this out!';
        break;
      case 'whatsapp':
        url = 'https://api.whatsapp.com/send?text=Check%20this%20out:%20yoururl.com';
        break;
      case 'instagram':
        Alert.alert(
          'Instagram Sharing',
          'Instagram does not support direct sharing via URL. Please copy the link manually.'
        );
        return;
      default:
        Alert.alert('Error', 'Sharing platform not supported.');
        return;
    }

    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open the sharing link.')
    );
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.titleText}>Share Post</Text>
        <Text style={styles.descriptionText}>
          Choose your favorite social media platform
        </Text>

        {/* Icons for sharing platforms */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('facebook')}
          >
            <Icon name="facebook" size={50} color="#3b5998" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('twitter')}
          >
            <Icon name="twitter" size={50} color="#00acee" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('whatsapp')}
          >
            <Icon name="whatsapp" size={50} color="#25D366" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare('instagram')}
          >
            <Icon name="instagram" size={50} color="#C13584" />
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better readability
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    borderRadius: 50,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    elevation: 8, // Add shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SharePost;
