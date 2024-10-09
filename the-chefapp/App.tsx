import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

// Define the navigation stack parameter list with correct screen names
type RootStackParamList = {
  Home: undefined;
  AddItemScreen: undefined;
};

// Define the navigation prop types
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Define the interface for menu items
interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string; // Consider changing this to number if calculations are needed
}

const HomeScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Garlic Bread', description: 'Golden bread stuffed with mushroom', course: 'Appetizer', price: '99.99' },
    { id: '2', name: 'Chicken', description: 'Chicken stew with carrots', course: 'Main Course', price: '214.99' },
    { id: '3', name: 'Flan', description: 'Custard dessert with a layer of caramel on top', course: 'Dessert', price: '49.99' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate('AddItemScreen')}
        color="#cd5c5c"
      />
    </View>
  );
};

const AddItemScreen = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Appetizer');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: Math.random().toString(),
      name: dishName,
      description,
      course,
      price,
    };

    // Navigate back to Home and pass the new item as a parameter (if needed)
    navigation.navigate('Home'); // Navigation back to Home
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Dish Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <Text style={styles.label}>Enter Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={course}
        style={styles.input}
        onValueChange={(itemValue: React.SetStateAction<string>) => setCourse(itemValue)}
      >
        <Picker.Item label="Hors D'Oeuvres" value="hors d'oeuvres" />
        <Picker.Item label="Amuse-Bouche" value="amuse-bouche" />
        <Picker.Item label="Soup" value="soup" />
        <Picker.Item label="Appetizer" value="appetizer" />
        <Picker.Item label="Salad" value="salad" />
        <Picker.Item label="Fish" value="fish" />
        <Picker.Item label="First Main Course" value="first main course" />
        <Picker.Item label="Palate Cleanser" value="palate cleanser" />
        <Picker.Item label="Second Main Course" value="second main course" />
        <Picker.Item label="Cheese Course" value="cheese course" />
        <Picker.Item label="Dessert" value="dessert" />
        <Picker.Item label="Mignardise" value="mignardise" />
      </Picker>

      <Text style={styles.label}>Enter Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAddItem} color="#cd5c5c" />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fffacd',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalItems: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cd5c5c',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#8b0000',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#cd5c5c',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default App;