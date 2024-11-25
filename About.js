// About.js
import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = () => {
  const navigation = useNavigation();

  const students = [
    { name: 'Utsav Changani', studentId: '101476134' },
    { name: 'Patel Pruthvi', studentId: '101411644' },
    { name: 'Tej Patel', studentId: '101450840' },
    { name: 'Subhan Mohammed', studentId: '101397394' },
  ];

  const handleBackToDetails = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.titleText}>About Us</Text>

        {/* Student Information */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {students.map((student, index) => (
            <View key={index} style={styles.studentCard}>
              <Icon name="person-circle-outline" size={50} color="#fff" />
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>ID: {student.studentId}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDetails}>
          <Text style={styles.buttonText}>Back to Main Screen</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for contrast
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: width * 0.9,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  studentInfo: {
    marginLeft: 20,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  studentId: {
    fontSize: 18,
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default About;
