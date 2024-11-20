import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, PermissionsAndroid, Platform, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const App = () => {
  const [fileUri, setFileUri] = useState('');
  const [transcription, setTranscription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Function to request storage permission (for Android)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to pick audio files.',

            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to select audio files.');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      if (res && res[0]) {
        setFileUri(res[0].uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'User canceled the file picker');
      } else {
        Alert.alert('Error', 'Failed to pick file');
        console.error('Error selecting file:', err);
      }
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert('Error', 'No file selected');
      return;
    }

    try {
      const uploadUri = Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri;

      const response = await RNFetchBlob.fetch(
        'POST',
        'http://10.0.2.2:5000/transcribe',
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'file',
            filename: 'audio.wav',
            type: 'audio/wav',
            data: RNFetchBlob.wrap(uploadUri),
          },
        ],
      );

      const result = await response.json();
      if (result.transcription) {
        setTranscription(result.transcription);
        setModalVisible(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to transcribe');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload and transcribe audio');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio File Transcription</Text>
      <Button title="Select WAV File" onPress={selectFile} color="#6200EE" />
      {fileUri ? (
        <>
          <View style={styles.fileContainer}>
            <Text style={styles.fileText}>🎵 Selected File:</Text>
            <Text style={styles.fileName}>{fileUri}</Text>
            <Button title="Upload and Transcribe" onPress={uploadFile} color="#03DAC5" />
            <Text style={styles.successMessage}>✔️ File ready for upload</Text>
          </View>
        </>
      ) : (
        <Text style={styles.noFileText}>No file selected</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Transcribe</Text>
            <Text style={styles.modalText}>{transcription}</Text>
            <Text style={styles.infoText}>
              📝 Your audio has been successfully transcribed. You can now translate Tamil speech to Tamil text or use the transcription for further processing.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 20,
  },
  fileContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    borderColor: '#2196F3',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  fileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  fileName: {
    fontSize: 16,
    color: '#424242',
    marginTop: 5,
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 15,
    textAlign: 'center',
  },
  noFileText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
