import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { Link } from 'react-router-native';

const StudentForm = () => {
  const [details, setDetails] = useState({
    s_no: "",  // Corresponds to S_NO
    rollno: "",  // Corresponds to RollNo
    name: "",  // Corresponds to Name
    address: "",  // Corresponds to Address
    fathermobilenumber: "",  // Corresponds to FatherMobileNumber
    mothermobilenumber: "",  // Corresponds to MotherMobileNumber
    personalmobilenumber: "",  // Corresponds to PersonalMobileNumber
    sem1gpa: "",  // Corresponds to sem1GPA
    sem2gpa: "",  // Corresponds to sem2GPA
    sem3gpa: "",  // Corresponds to sem3GPA
    sem4gpa: "",  // Corresponds to sem4GPA
    cgpa: "",  // Corresponds to CGPA
    govtormanagement: "",  // Corresponds to GovtOrManagement
    dayscholarorhosteler: "",  // Corresponds to DayScholarOrHosteler
    community: ""  // Corresponds to Community
  });

  const handleInputChange = (name: string, value: string) => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { s_no, rollno, name, address, fathermobilenumber, mothermobilenumber, personalmobilenumber, sem1gpa, sem2gpa, sem3gpa, sem4gpa, cgpa, govtormanagement, dayscholarorhosteler, community } = details;
    const apiUrl = 'http://10.0.2.2:3000/details';

    console.log('Submitting form with:', { s_no, rollno, name, address, fathermobilenumber, mothermobilenumber, personalmobilenumber, sem1gpa, sem2gpa, sem3gpa, sem4gpa, cgpa, govtormanagement, dayscholarorhosteler, community });

    try {
      const response = await axios.post(apiUrl, {
        s_no,
        rollno,
        name,
        address,
        fathermobilenumber,
        mothermobilenumber,
        personalmobilenumber,
        sem1gpa,
        sem2gpa,
        sem3gpa,
        sem4gpa,
        cgpa,
        govtormanagement,
        dayscholarorhosteler,
        community,
      });

      console.log('Student added successfully:', response.data);

      // Reset form fields
      setDetails({
        s_no: "",
        rollno: "",
        name: "",
        address: "",
        fathermobilenumber: "",
        mothermobilenumber: "",
        personalmobilenumber: "",
        sem1gpa: "",
        sem2gpa: "",
        sem3gpa: "",
        sem4gpa: "",
        cgpa: "",
        govtormanagement: "",
        dayscholarorhosteler: "",
        community: ""
      });

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
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={details.rollno}
        onChangeText={text => handleInputChange('rollno', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={details.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={details.address}
        onChangeText={text => handleInputChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Personal Mobile Number"
        keyboardType="phone-pad"
        value={details.personalmobilenumber}
        onChangeText={text => handleInputChange('personalmobilenumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Semester 1 GPA"
        keyboardType="numeric"
        value={details.sem1gpa}
        onChangeText={text => handleInputChange('sem1gpa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Semester 2 GPA"
        keyboardType="numeric"
        value={details.sem2gpa}
        onChangeText={text => handleInputChange('sem2gpa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Semester 3 GPA"
        keyboardType="numeric"
        value={details.sem3gpa}
        onChangeText={text => handleInputChange('sem3gpa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="CGPA"
        keyboardType="numeric"
        value={details.cgpa}
        onChangeText={text => handleInputChange('cgpa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Govt or Management"
        value={details.govtormanagement}
        onChangeText={text => handleInputChange('govtormanagement', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Day Scholar or Hosteler"
        value={details.dayscholarorhosteler}
        onChangeText={text => handleInputChange('dayscholarorhosteler', text)}
      />
      
      <Button title="Submit" onPress={handleSubmit} /> */}
      <Link to="/details" style={styles.link}>
        <Text style={styles.linkText}>View Details</Text>
      </Link>
      <Link to="/delete" style={styles.link}>
        <Text style={styles.linkText}>Delete Details</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StudentForm;
