import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, Text, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
      const storedLocations = await AsyncStorage.getItem('locations');
      if (storedLocations) {
        setLocations(JSON.parse(storedLocations));
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const newLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      // Obtener la dirección postal
      const [result] = await Location.reverseGeocodeAsync(newLocation);
      const address = result ? `${result.street}, ${result.city}, ${result.region}` : 'Address not found';

      const updatedLocations = [...locations, { ...newLocation, address }];
      setLocations(updatedLocations);

      await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));
      console.log('Guardado:', newLocation);
    } catch (error) {
      console.error('Error getting location', error);
      Alert.alert('Error', 'Could not get location');
    }
  };

  const clearLocations = async () => {
    try {
      await AsyncStorage.removeItem('locations');
      setLocations([]);
      Alert.alert('Success', 'All locations have been cleared! 🗑️');
    } catch (error) {
      console.error('Error clearing locations', error);
      Alert.alert('Error', 'Could not clear locations');
    }
  };

  // Lista de elementos
  const renderLocationItem = ({ item }: any) => (
    <View style={styles.locationItem}>
      <Text style={styles.addressText}>Dirección: {item.address}</Text>
      <Text style={styles.locationText}>Latitud: {item.latitude}</Text>
      <Text style={styles.locationText}>Longitud: {item.longitude}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="LOCATION NOW" color={"#11d8cc"} onPress={getLocation} />
        <Button title="CLEAR LOCATIONS" color={"red"} onPress={clearLocations} />
      </View>
      <FlatList
        data={locations}
        renderItem={renderLocationItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingBottom: 20,
  },
  locationItem: {
    backgroundColor: '#f53b6c',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
  },
  addressText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
