import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Platform, 
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Details = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleActionPress = (action) => {
    switch (action) {
      case 'Get Direction':
        navigation.navigate('Direction', { restaurant });
        break;
      case 'Edit Post':
        navigation.navigate('EditRestaurant', { restaurant });
        break;
      case 'Share Post':
        navigation.navigate('SharePost', { restaurant });
        break;
      case 'About':
        navigation.navigate('About', { restaurant });
        break;
      default:
        break;
    }
  };

  const renderRatingStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity 
        key={star} 
        onPress={() => handleRatingChange(star)}
      >
        <Icon 
          name={star <= rating ? "star" : "star-outline"} 
          size={30} 
          color="#FFD700" 
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/background.jpeg')}
        style={styles.backgroundImage}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          {/* Status Bar Configuration */}
          <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
            backgroundColor="transparent"
            translucent
          />

          <ScrollView 
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{restaurant.name}</Text>
            </View>

            {/* Restaurant Details */}
            <View style={styles.detailsContainer}>
              {/* Address Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={styles.sectionContent}>64 Main Street</Text>
              </View>

              {/* Description Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.sectionContent}>{restaurant.description}</Text>
              </View>

              {/* Phone Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phone</Text>
                <Text style={styles.sectionContent}>413-234-0000</Text>
              </View>

              {/* Cuisine Tag */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Cuisine</Text>
                <View style={styles.cuisineTag}>
                  <Text style={styles.cuisineTagText}>{restaurant.cuisine}</Text>
                </View>
              </View>

              {/* Ratings Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Your Rating</Text>
                <View style={styles.ratingContainer}>
                  {renderRatingStars()}
                </View>
              </View>

              {/* Comment Input */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Add a Comment</Text>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Share your experience..."
                  placeholderTextColor="#aaa"
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                {[
                  { title: 'Get Direction', icon: 'navigate' },
                  { title: 'Edit Post', icon: 'create' },
                  { title: 'Share Post', icon: 'share-social' },
                  { title: 'About', icon: 'information-circle' }
                ].map((action) => (
                  <TouchableOpacity 
                    key={action.title}
                    style={styles.actionButton} 
                    onPress={() => handleActionPress(action.title)}
                  >
                    <Icon name={action.icon} size={20} color="#fff" style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}>{action.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    ...Platform.select({
      ios: { fontFamily: 'Arial-BoldMT' },
      android: { fontFamily: 'sans-serif-bold' },
    }),
  },
  detailsContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#ddd',
  },
  cuisineTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  cuisineTagText: {
    color: '#fff',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    height: 120,
  },
  actionButtonsContainer: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Details;