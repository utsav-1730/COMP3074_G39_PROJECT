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
  FlatList,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Details = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Utsav Changani', rating: 4, comment: 'Amazing food and ambiance!' },
    { id: 2, name: 'Jane Smith', rating: 5, comment: 'Best restaurant in town!' },
    { id: 3, name: 'Alice Brown', rating: 3, comment: 'Good food but service was slow.' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [isEditUnlocked, setIsEditUnlocked] = useState(false);

  const famousItems = [
    { id: 1, name: 'Grilled Salmon', description: 'Perfectly grilled with a tangy lemon sauce.' },
    { id: 2, name: 'Truffle Pasta', description: 'Rich and creamy with a hint of truffle oil.' },
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const handleUnlockEdit = () => {
    setModalVisible(true);
  };

  const handlePasswordSubmit = () => {
    if (inputPassword.trim() === '') {
      Alert.alert('Validation Error', 'Password cannot be empty.');
    } else {
      setIsEditUnlocked(true);
      setModalVisible(false);
      setInputPassword('');
      Alert.alert('Success', 'Edit Post button unlocked!');
    }
  };

  const handleAddReview = () => {
    if (newComment.trim() === '' || newRating === 0) {
      Alert.alert('Validation Error', 'Please provide a rating and a comment.');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      name: 'You',
      rating: newRating,
      comment: newComment,
    };

    setReviews([newReview, ...reviews]);
    setNewComment('');
    setNewRating(0);
  };

  const handleActionPress = (action) => {
    switch (action) {
      case 'Get Direction':
        navigation.navigate('Direction', {
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          name: restaurant.name,
          address: restaurant.description,
        });
        break;
      case 'Edit Post':
        if (isEditUnlocked) {
          navigation.navigate('EditRestaurant', { restaurant });
        } else {
          Alert.alert('Access Denied', 'Unlock the button with a password first.');
        }
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

  const renderFamousItem = ({ item }) => (
    <View style={styles.famousItemContainer}>
      <Text style={styles.famousItemName}>{item.name}</Text>
      <Text style={styles.famousItemDescription}>{item.description}</Text>
    </View>
  );

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={18}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/background.jpeg')}
        style={styles.backgroundImage}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
            backgroundColor="transparent"
            translucent
          />

          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{restaurant.name}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Average Rating</Text>
              <View style={styles.averageRatingContainer}>
                <Icon name="star" size={24} color="#FFD700" />
                <Text style={styles.averageRatingText}>{averageRating.toFixed(1)} / 5</Text>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Famous Items</Text>
              <FlatList
                data={famousItems}
                renderItem={renderFamousItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.famousItemsList}
              />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.reviewsList}
              />
            </View>

            <View style={styles.addReviewContainer}>
              <Text style={styles.sectionTitle}>Add a Review</Text>
              <View style={styles.ratingInputContainer}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setNewRating(i + 1)}
                  >
                    <Icon
                      name={i < newRating ? 'star' : 'star-outline'}
                      size={30}
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.commentInput}
                placeholder="Write your review here..."
                placeholderTextColor="#aaa"
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleActionPress('Get Direction')}
              >
                <Icon
                  name="navigate"
                  size={20}
                  color="#fff"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.actionButtonText}>Get Direction</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleActionPress('Share Post')}
              >
                <Icon name="share-social" size={20} color="#fff" style={styles.actionButtonIcon} />
                <Text style={styles.actionButtonText}>Share Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUnlockEdit}
              >
                <Icon
                  name="lock-open-outline"
                  size={20}
                  color="#fff"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.actionButtonText}>Unlock Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, isEditUnlocked ? styles.enabledButton : styles.disabledButton]}
                onPress={() => handleActionPress('Edit Post')}
              >
                <Icon
                  name="create"
                  size={20}
                  color="#fff"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.actionButtonText}>Edit Post</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleActionPress('About')}
              >
                <Icon
                  name="information-circle-outline"
                  size={20}
                  color="#fff"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.actionButtonText}>About</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Password Modal */}
        <Modal
          transparent
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Password</Text>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={inputPassword}
                onChangeText={setInputPassword}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handlePasswordSubmit}>
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { marginRight: 16 },
  headerText: { fontSize: 32, fontWeight: 'bold', color: '#fff', flex: 1 },
  sectionContainer: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  averageRatingContainer: { flexDirection: 'row', alignItems: 'center' },
  averageRatingText: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', marginLeft: 8 },
  famousItemsList: { paddingBottom: 8 },
  famousItemContainer: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 16, marginRight: 12 },
  famousItemName: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  famousItemDescription: { fontSize: 14, color: '#ddd' },
  reviewsList: { paddingBottom: 8 },
  reviewContainer: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 16, marginBottom: 12 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reviewerName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  reviewComment: { fontSize: 14, color: '#ddd' },
  ratingContainer: { flexDirection: 'row' },
  addReviewContainer: { marginBottom: 24 },
  ratingInputContainer: { flexDirection: 'row', marginVertical: 8 },
  commentInput: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, color: '#fff', padding: 10, fontSize: 16, height: 80, textAlignVertical: 'top' },
  submitButton: { marginTop: 10, backgroundColor: '#3498db', padding: 12, borderRadius: 10, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionButtonsContainer: { marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionButton: { width: width * 0.4, backgroundColor: 'rgba(255,255,255,0.2)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, marginBottom: 12 },
  actionButtonIcon: { marginRight: 8 },
  actionButtonText: { color: '#fff', fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passwordInput: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  enabledButton: {
    opacity: 1,
  },
});

export default Details;
