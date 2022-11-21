import React, {useEffect, useState} from 'react';

import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {Blob, Buffer} from 'buffer';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';

export default function AudioTest() {
  const Record = new AudioRecorderPlayer();
  const [voice, SetVoice] = useState();

  const [playAudio, setPlayAudio] = useState(false);
  const [startAudio, setStartAudio] = useState(false);

  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.aac`,
  });

  const onSend = async messages => {
    console.log('voice aa gi', voice);
    const formData = new FormData();
    formData.append('voice', {
      name: `voice ${new Date()} `,
      uri: voice.path,
      type: voice.mime,
    });
    formData.append('text', ' messages[0].text');
    formData.append('receiver', '6377afd549de4bb1f0168c73');
    console.log('====================================');
    console.log(formData);
    console.log('====================================');
    console.log(formData._parts[0]);
  };

  useEffect(() => {
    async function Checker() {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    }
    Checker();
  }, []);

  async function handleAudio() {
    const audioSets = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    // const path = 'hello.m4a';

    const uri = await Record.startRecorder(path, audioSets);

    Record.addRecordBackListener(e => {
      console.log(e);
    });

    console.log('FROM Voice Recorder', uri);
  }

  const AudioStop = async () => {
    // setStartAudio(false);
    SetVoice(null);
    const aud = await Record.stopRecorder();
    console.log(Record.mmss());
    console.log(aud);
    // const chunk = Buffer.from(aud, 'base64');
    // const blob = new Blob([Buffer(aud, 'data')]);
    // console.log('BLOB', blob);
    // console.log('Buffer', chunk.byteLength);
    SetVoice({path: aud, mime: 'audio/aac'});

    Record.removeRecordBackListener();
  };

  const AudioEnd = async () => {
    Record.stopPlayer();
    Record.removePlayBackListener();
  };

  async function onStartPlay() {
    const msg = await Record.startPlayer();
    console.log(msg);
    Record.addPlayBackListener(e => {
      return;
    });
  }

  function Soundplay() {
    // setPlayAudio(!playAudio);
    const sound = new Sound(
      'file:////data/user/0/com.audio/cache/hello.aac',
      '',
      error => {
        if (error) {
          console.log(error);
        }

        if (!playAudio) {
          sound.play(success => {
            setPlayAudio(false);

            if (!success) {
              setPlayAudio(false);
              Alert.alert('There was an error playing this audio');
            }
          });
        } else {
          sound.stop();
        }
      },
    );
  }

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.Button} onPress={() => handleAudio()}>
          <Text style={styles.text}>Audio Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={AudioStop}>
          <Text style={styles.text}>Audio Record Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => onStartPlay()}>
          <Text style={styles.text}>Audio Pllay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={() => onSend()}>
          <Text style={styles.text}>Send Pllay</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.Button} onPress={() => Soundplay()}>
        <Text style={styles.text}>Sound Play</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: 'pink',
    width: '20%',
    // height: '5%',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    justifyContent: 'center',
    // padding: '7%',
  },
  dateText: {color: 'black', fontWeight: 'bold', textAlign: 'center'},
  text: {color: 'black', fontWeight: 'bold', textAlign: 'center'},
});
