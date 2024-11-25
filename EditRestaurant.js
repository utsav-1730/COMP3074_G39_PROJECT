import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  ScrollView, 
  Alert 
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

  const handleSaveRestaurant = () => {
    // Validate inputs
    if (!name || !address || !description) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    const restaurantData: RestaurantData = {
      name,
      address,
      description,
      phone,
      tags: tags.split(',').map(tag => tag.trim()),
      ratings
    };

    console.log('Saving Restaurant:', restaurantData);
    // TODO: Implement actual save logic
  };

  const handleDeleteRestaurant = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this restaurant?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            console.log('Deleting Restaurant');
            // TODO: Implement actual delete logic
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainTitle}>Edit Restaurant</Text>

          <Text style={styles.label}>Restaurant Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter restaurant name"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us about your restaurant"
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter contact number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Tags (comma-separated):</Text>
          <TextInput
            style={styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="e.g. Italian, Vegan, Gluten-free"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Restaurant Rating:</Text>
          <View style={styles.ratingsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRatings(star)}
              >
                <Icon
                  name={ratings >= star ? 'star' : 'star-outline'}
                  size={35}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSaveRestaurant}
            >
              <Icon name="save" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]} 
              onPress={handleDeleteRestaurant}
            >
              <Icon name="trash" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Delete Restaurant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 8,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditRestaurant;