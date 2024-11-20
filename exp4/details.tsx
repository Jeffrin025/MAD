import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Link } from 'react-router-native';

interface Student {
  s_no: string;
  rollno: string;
  name: string;
  address: string;
  fathermobilenumber: string;
  mothermobilenumber: string;
  personalmobilenumber: string;
  sem1gpa: string;
  sem2gpa: string;
  sem3gpa: string;
  sem4gpa: string | null;
  cgpa: string;
  govtormanagement: string;
  dayscholarorhosteler: string;
  community: string;
}

const Detail: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get<Student[]>('http://10.0.2.2:3000/details/student');
        setStudents(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Error fetching student details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView>
        {students.map((student) => (
          <View key={student.s_no} style={styles.details}>
            <Text>Roll Number: {student.rollno}</Text>
            <Text>Name: {student.name}</Text>
            <Text>Address: {student.address}</Text>
            <Text>Father's Mobile Number: {student.fathermobilenumber}</Text>
            <Text>Mother's Mobile Number: {student.mothermobilenumber}</Text>
            <Text>Personal Mobile Number: {student.personalmobilenumber}</Text>
            <Text>Semester 1 GPA: {student.sem1gpa}</Text>
            <Text>Semester 2 GPA: {student.sem2gpa}</Text>
            <Text>Semester 3 GPA: {student.sem3gpa}</Text>
            <Text>Semester 4 GPA: {student.sem4gpa}</Text>
            <Text>CGPA: {student.cgpa}</Text>
            <Text>Government or Management: {student.govtormanagement}</Text>
            <Text>Day Scholar or Hosteler: {student.dayscholarorhosteler}</Text>
            <Text>Community: {student.community}</Text>
          </View>
        ))}
      </ScrollView>

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
  details: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 10,
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

export default Detail;
