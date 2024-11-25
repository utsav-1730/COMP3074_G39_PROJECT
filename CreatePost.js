// CreatePost.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreatePost = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');
  const [ratings, setRatings] = useState(0);
  const [publish, setPublish] = useState(false);

  const handleCreatePost = () => {
    // Implement logic to create a post with the entered data
    console.log('Creating Post:', { name, address, description, phone, tags, ratings, publish });
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.mainText}>Create Post</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Icon name="person-circle-outline" size={24} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter name"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Address Input */}
          <View style={styles.inputContainer}>
            <Icon name="location-outline" size={24} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Enter address"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Icon name="document-text-outline" size={24} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Enter description"
              placeholderTextColor="#ccc"
              multiline
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={24} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Enter phone number"
              placeholderTextColor="#ccc"
              keyboardType="phone-pad"
            />
          </View>

          {/* Tags Input */}
          <View style={styles.inputContainer}>
            <Icon name="pricetags-outline" size={24} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={tags}
              onChangeText={(text) => setTags(text)}
              placeholder="Enter tags"
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Ratings */}
          <Text style={styles.subLabel}>Rate the Restaurant:</Text>
          <View style={styles.ratingsContainer}>
            {[1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity key={index} onPress={() => setRatings(index)}>
                <Icon
                  name={ratings >= index ? 'star' : 'star-outline'}
                  size={36}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Publish Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.subLabel}>Publish Now:</Text>
            <Switch
              value={publish}
              onValueChange={(value) => setPublish(value)}
              trackColor={{ false: '#767577', true: '#34C759' }}
              thumbColor="#f4f3f4"
            />
          </View>

          {/* Create Post Button */}
          <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
    fontSize: 16,
  },
  subLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ff6b81',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CreatePost;
