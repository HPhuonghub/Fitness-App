// import React, { useState, useEffect } from 'react';
// import {
//   TouchableOpacity,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ImageSourcePropType,
// } from 'react-native';

// import {
//   Bars3Icon,
//   PlayCircleIcon,
//   CheckCircleIcon,
// } from 'react-native-heroicons/solid';
// import { MusicList as MusicListType } from '@/data';
// import Colors from '@/constants/Colors';
// import axios from 'axios';
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from 'react-native-document-picker';

// const { width, height } = Dimensions.get('window');

// const FormMusic = ({ updateMusic }) => {
//   const [inputData, setInputData] = useState('');

//   const handleChange = (event) => {};

//   const [audioFile, setAudioFile] =
//     (useState < DocumentPickerResponse) | (null > null);

//   const handleChooseFile = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.audio],
//       });
//       setAudioFile(res);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         console.log('Error:', err);
//       }
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       if (!audioFile) {
//         console.log('No file selected');
//         return;
//       }

//       // Đọc file âm thanh và chuyển đổi thành chuỗi base64
//       const audioData = await readFile(audioFile.uri, 'base64');
//       console.log('check audioData:', audioData);

//       // Gửi dữ liệu âm thanh lên backend
//       //       const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
//       //         audioData: audioData,
//       //       });

//       //       console.log('Upload successful:', response.data);
//     } catch (error) {
//       console.log('Error uploading audio:', error);
//     }
//   };

//   return (
//     <TouchableOpacity style={styles.container}>
//       <TouchableOpacity style={styles.modalContent}>
//         <Text>FormMusic</Text>
//         <View style={{ padding: 20 }}>
//           <TouchableOpacity onPress={handleChooseFile}>
//             <Text>Chọn file âm thanh</Text>
//           </TouchableOpacity>
//           {audioFile && (
//             <Text style={{ marginTop: 10 }}>
//               File đã chọn: {audioFile.name}
//             </Text>
//           )}
//           <TouchableOpacity onPress={handleUpload} disabled={!audioFile}>
//             <Text
//               style={{
//                 backgroundColor: '#007bff',
//                 color: '#fff',
//                 padding: 10,
//                 textAlign: 'center',
//                 borderRadius: 5,
//                 marginTop: 20,
//               }}
//               disabled={!audioFile}
//             >
//               Tải lên
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// };

// export default FormMusic;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 1)',
//   },

//   modalContent: {
//     backgroundColor: Colors.primary,
//     height: height * 0.85,
//     width: width,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
