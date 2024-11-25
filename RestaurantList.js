import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  Platform,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Device Dimensions
const { width, height } = Dimensions.get('window');

// Original Restaurant Data
const restaurantData = [
  { 
    id: '1', 
    name: 'Restaurant 1', 
    description: 'Authentic flavors, welcoming atmosphere.',
    cuisine: 'Mediterranean',
    rating: 4.5
  },
  { 
    id: '2', 
    name: 'Restaurant 2', 
    description: 'Culinary excellence, intimate dining.',
    cuisine: 'French',
    rating: 4.8
  },
  { 
    id: '3', 
    name: 'Restaurant 3', 
    description: 'Local ingredients, farm-to-table concept.',
    cuisine: 'Farm Fresh',
    rating: 4.3
  },
  { 
    id: '4', 
    name: 'Restaurant 4', 
    description: 'Eclectic flavors, vibrant atmosphere.',
    cuisine: 'Fusion',
    rating: 4.6
  },
  { 
    id: '5', 
    name: 'Restaurant 5', 
    description: 'Contemporary menu, elegant surroundings.',
    cuisine: 'Modern',
    rating: 4.7
  },
  { 
    id: '6', 
    name: 'Restaurant 6', 
    description: 'Classic dishes, rustic charm.',
    cuisine: 'Traditional',
    rating: 4.2
  },
  { 
    id: '7', 
    name: 'Restaurant 7', 
    description: 'Fusion cuisine, trendy urban setting.',
    cuisine: 'Urban Fusion',
    rating: 4.9
  },
  { 
    id: '8', 
    name: 'Restaurant 8', 
    description: 'Bold flavors, stylish dining experience.',
    cuisine: 'Gourmet',
    rating: 4.4
  },
  { 
    id: '9', 
    name: 'Restaurant 9', 
    description: 'Savor gourmet delights, cozy ambiance.',
    cuisine: 'Fine Dining',
    rating: 4.6
  },
];

const RestaurantList = ({ navigation }) => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);

  // Search and Filter Logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurantData.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  // Reset Search
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRestaurants(restaurantData);
  };

  // Render Individual Restaurant Item
  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantContainer}
      onPress={() => navigation.navigate('Details', { restaurant: item })}
    >
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <View style={styles.cuisineTag}>
        <Text style={styles.cuisineTagText}>{item.cuisine}</Text>
      </View>
    </TouchableOpacity>
  );

  // Empty List Component
  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No restaurants found</Text>
      <TouchableOpacity onPress={clearSearch} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Search</Text>
      </TouchableOpacity>
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
          {/* Status Bar Configuration */}
          <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
            backgroundColor="transparent"
            translucent
          />

          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.mainText}>All Restaurants</Text>
            
            {/* Search Container */}
            <View style={styles.searchContainer}>
              <Icon 
                name="search" 
                size={20} 
                color="#fff" 
                style={styles.searchIcon} 
              />
              <TextInput
                style={styles.searchBar}
                placeholder="Search restaurants"
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
                clearButtonMode="while-editing" // iOS clear button
                underlineColorAndroid="transparent" // Android clear underline
              />
              {searchQuery ? (
                <TouchableOpacity 
                  onPress={clearSearch}
                  style={styles.clearSearchIcon}
                >
                  <Icon name="close-circle" size={20} color="#fff" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Restaurant List */}
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyListComponent}
          />
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
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        fontFamily: 'Arial-BoldMT',
      },
      android: {
        fontFamily: 'sans-serif-bold',
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#fff',
  },
  clearSearchIcon: {
    position: 'absolute',
    right: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  restaurantContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
  },
  descriptionText: {
    color: '#ddd',
    marginBottom: 8,
  },
  cuisineTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  cuisineTagText: {
    color: '#fff',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.2,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default RestaurantList;