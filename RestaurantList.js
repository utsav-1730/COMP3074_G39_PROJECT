import React, { useState } from 'react';
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
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const restaurantData = [
  { id: '1', name: 'The Gourmet Grill', description: 'Delight in sizzling steaks.', cuisine: 'American', rating: 4.5 },
  { id: '2', name: 'Pasta Paradise', description: 'Authentic Italian pasta.', cuisine: 'Italian', rating: 4.8 },
  { id: '3', name: 'Sushi Sensation', description: 'Fresh sushi and sashimi.', cuisine: 'Japanese', rating: 4.7 },
  { id: '4', name: 'Curry Culture', description: 'Aromatic curries.', cuisine: 'Indian', rating: 4.6 },
  { id: '5', name: 'Taco Fiesta', description: 'Bold Mexican dishes.', cuisine: 'Mexican', rating: 4.4 },
  { id: '6', name: 'Bistro Bonjour', description: 'French classics.', cuisine: 'French', rating: 4.3 },
  { id: '7', name: 'The Vegan Haven', description: 'Plant-based delights.', cuisine: 'Vegan', rating: 4.9 },
  { id: '8', name: 'Fusion Flavors', description: 'Eclectic cuisines.', cuisine: 'Fusion', rating: 4.2 },
  { id: '9', name: 'The Dessert Bar', description: 'Heavenly cakes.', cuisine: 'Dessert', rating: 4.8 },
];

const cuisines = ['All', 'American', 'Italian', 'Japanese', 'Indian', 'Mexican', 'French', 'Vegan', 'Fusion', 'Dessert'];

const RestaurantList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantData);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurantData.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRestaurants(restaurantData);
  };

  const applyFilters = () => {
    setFilteredRestaurants(
      restaurantData.filter(
        (restaurant) =>
          (selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine) &&
          restaurant.rating >= minRating
      )
    );
    setFilterVisible(false);
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('Details', { restaurant: item })}
    >
      <View style={styles.frostedGlass}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        <Text style={styles.restaurantDescription}>{item.description}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/background.jpeg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
            backgroundColor="transparent"
            translucent
          />

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Discover Restaurants</Text>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search restaurants"
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
                  <Icon name="close-circle" size={20} color="#aaa" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Filter Button */}
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <Icon name="options" size={20} color="#fff" style={styles.filterIcon} />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>

          {/* Restaurant List */}
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No restaurants found</Text>
              </View>
            }
          />

          {/* Filter Modal */}
          <Modal visible={filterVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Filters</Text>

                {/* Cuisine Filter */}
                <Text style={styles.filterLabel}>Cuisine</Text>
                <FlatList
                  horizontal
                  data={cuisines}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.cuisineButton,
                        selectedCuisine === item && styles.selectedCuisineButton,
                      ]}
                      onPress={() => setSelectedCuisine(item)}
                    >
                      <Text
                        style={[
                          styles.cuisineButtonText,
                          selectedCuisine === item && styles.selectedCuisineButtonText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                />

                {/* Rating Filter */}
                <Text style={styles.filterLabel}>Minimum Rating</Text>
                <View style={styles.ratingInputContainer}>
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => setMinRating(rating)}
                      style={styles.ratingOption}
                    >
                      <Icon
                        name={rating <= minRating ? 'star' : 'star-outline'}
                        size={30}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Apply Button */}
                <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>

                {/* Close Button */}
                <TouchableOpacity style={styles.closeButton} onPress={() => setFilterVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for better text contrast
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 10,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  restaurantCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  frostedGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  restaurantCuisine: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 8,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background for modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cuisineButton: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  selectedCuisineButton: {
    backgroundColor: '#3498db',
  },
  cuisineButtonText: {
    fontSize: 14,
  },
  selectedCuisineButtonText: {
    color: '#fff',
  },
  ratingInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingOption: {
    marginHorizontal: 5,
  },
  applyButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});


export default RestaurantList;
