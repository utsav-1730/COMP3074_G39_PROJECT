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
              <View style={styles.iconContainer}>
                <Icon name="person-circle-outline" size={60} color="#3498db" />
              </View>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>ID: {student.studentId}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToDetails}>
          <Icon name="arrow-back" size={20} color="#fff" style={styles.buttonIcon} />
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
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Slightly darker overlay for better readability
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 10,
  },
  studentInfo: {
    marginLeft: 20,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  studentId: {
    fontSize: 18,
    color: '#ddd',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default About;
