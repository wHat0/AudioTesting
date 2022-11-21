// import {Blob, Buffer} from 'buffer';
// import axios from '../../Axios';
// import React, {useState, useEffect, useContext} from 'react';
// import {
//   View,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   Image,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
// import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePicker from 'react-native-image-crop-picker';
// import Ionicon from 'react-native-vector-icons/Ionicons';
// import colors from '../../config/colors';
// import AudioRecorderPlayer, {
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';
// import Sound from 'react-native-sound';
// import {AuthContext} from '../../Context/AuthContext';

// const ChatScreen = ({navigation}) => {
//   const [messages, setMessages] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [startAudio, setStartAudio] = useState(false);
//   const [image, SetImage] = useState();
//   const [chat, setChat] = useState([]);
//   const ctx = useContext(AuthContext);

//   const renderAudio = props => {
//     return !props.currentMessage.audio ? (
//       <View />
//     ) : (
//       <Ionicon
//         name="ios-play"
//         size={25}
//         color={playAudio ? 'red' : 'white'}
//         style={styles.Listener}
//         onPress={() => {
//           setPlayAudio(!playAudio);
//           const sound = new Sound(props.currentMessage.audio, '', error => {
//             if (error) {
//               console.log(error);
//             }

//             if (!playAudio) {
//               sound.play(success => {
//                 setPlayAudio(false);

//                 if (!success) {
//                   setPlayAudio(false);
//                   Alert.alert('There was an error playing this audio');
//                 }
//               });
//             } else {
//               sound.stop();
//             }
//           });
//         }}
//       />
//     );
//   };

//   async function Permission() {
//     if (Platform.OS === 'android') {
//       try {
//         const grants = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);

//         if (
//           grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//           grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//           grants['android.permission.RECORD_AUDIO'] ===
//             PermissionsAndroid.RESULTS.GRANTED
//         ) {
//           console.log('Permissions granted');
//         } else {
//           return;
//         }
//       } catch (err) {
//         return;
//       }
//     }
//   }
