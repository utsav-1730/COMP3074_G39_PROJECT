import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RestaurantData {
  name: string;
  address: string;
  description: string;
  phone: string;
  tags: string[];
  ratings: number;
}

const EditRestaurant: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [ratings, setRatings] = useState(0);

  const validateInputs = (): boolean => {
    if (!name.trim() || !address.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return false;
    }
    if (phone && !/^\d{10}$/.test(phone)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits.');
      return false;
    }
    return true;
  };

  const handleSaveRestaurant = () => {
    if (!validateInputs()) return;

    const restaurantData: RestaurantData = {
      name,
      address,
      description,
      phone,
      tags: tags.split(',').map((tag) => tag.trim()),
      ratings,
    };

    Alert.alert('Success', 'Restaurant details saved successfully!');
    console.log('Saving Restaurant:', restaurantData);
    // TODO: Implement actual save logic (e.g., API call or state update)
  };

  const handleDeleteRestaurant = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this restaurant?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleting Restaurant');
            Alert.alert('Deleted', 'The restaurant has been deleted.');
            // TODO: Implement actual delete logic
          },
        },
      ]
    );
  };

  const renderRatingStars = () =>
    [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRatings(star)}>
        <Icon
          name={ratings >= star ? 'star' : 'star-outline'}
          size={35}
          color="#FFD700"
          style={styles.starIcon}
        />
      </TouchableOpacity>
    ));

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            <Text style={styles.mainTitle}>Edit Restaurant</Text>

            <Text style={styles.label}>Restaurant Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter restaurant name"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the restaurant"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Tags (comma-separated)</Text>
            <TextInput
              style={styles.input}
              value={tags}
              onChangeText={setTags}
              placeholder="e.g., Italian, Vegan, Family-friendly"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Ratings</Text>
            <View style={styles.ratingsContainer}>{renderRatingStars()}</View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveRestaurant}
              >
                <Icon name="save" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDeleteRestaurant}
              >
                <Icon name="trash" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Delete Restaurant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditRestaurant;
