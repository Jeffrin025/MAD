import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { Link } from 'react-router-native';
import Toast from 'react-native-toast-message';

const DeleteStudent = () => {
  const [rollnum, setRollnum] = useState('');

  const handleDelete = async () => {
    const apiUrl = `http://10.0.2.2:3000/details/${rollnum}`;

    try {
      const response = await axios.delete(apiUrl);
      console.log('Student deleted successfully:', response.data);

      // Show success toast
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Student deleted successfully',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });

      // Reset roll number field
      setRollnum('');

    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      // Show error toast
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Failed to delete student',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        keyboardType="numeric"
        value={rollnum}
        onChangeText={text => setRollnum(text)}
      />
      <Button title="Delete" onPress={handleDelete} />
      <Link to="/" style={styles.link}>
        <Text style={styles.linkText}>Back to Form</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DeleteStudent;
