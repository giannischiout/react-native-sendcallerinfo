/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {generalStyles} from '../generalStyles';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
  Switch,
  Button,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

export const CallDetection = () => {
  const [featureOn, setFeatureOn] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [number, setNumber] = useState('');
  const [event, setEvent] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    isEnabled ? stopListenerTapped() : startListenerTapped();
  };
  const eventCap = event.toUpperCase();
  let myHeaders = new Headers();
  let fixedNum = number.replace('+30', '');
  function randNum() {
    return Math.floor(Math.random() * (99999 - 1000) + 1000);
  }

  myHeaders.append('Content-Type', 'text/plain');
  let raw = `{"userName":"thanos","password":"XaMuQ","action":"ThirdPartyCallForAgent","body":["{\\"agent\\":\\"Admin\\",\\"callType\\":\\"${eventCap}\\",\\"phoneNumber\\":\\"${fixedNum}\\"}"],"messageId":"${randNum()}"}\r\n`;
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  logger = () => {
    fetch('http://ipbx.cloudon.gr:8050', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log(`raw: \n\r ${raw}`);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    askPermission();
  });

  askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
      // console.log('Permissions are:', permissions);
    } catch (err) {
      console.warn(err);
    }
  };

  startListenerTapped = () => {
    setFeatureOn(true);
    console.log(`just STARTED listening calls\n\t feature is ${featureOn}`);
    let callDetector = new CallDetectorManager(
      (event, number) => {
        setNumber(number);
        setEvent(event);
        console.log(`Event: ${event}, Number: ${number}`);
        if (event === 'Disconnected') {
          setIncoming(false);
          setNumber(number);
        } else if (event === 'Incoming') {
          setIncoming(true);
        } else if (event === 'Connected') {
          setIncoming(true);
          console.log('call got connected');
        } else if (event === 'Dialing') {
          console.log('call dialing');
        } else if (event === 'Offhook') {
          console.log('offhook');
          setIncoming(true);

          console.log(number);
        } else if (event === 'Missed') {
          console.log('missed call');
        }
        logger();
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );
  };

  stopListenerTapped = () => {
    console.log(`just STOPED listening calls\n\t feature is ${featureOn}`);
    let callDetector = new CallDetectorManager();
    callDetector && callDetector.dispose();
    setFeatureOn(false);
  };

  return (
    <View style={generalStyles.body}>
      <Text style={styles.text}>Should the detection be on?</Text>

      <View style={styles.toggle}>
        <Switch
          style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
          trackColor={{false: 'grey', true: 'white'}}
          thumbColor={isEnabled ? '#64fd1f' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.loggerInfoContainer}>
        {incoming && <Text style={styles.callerHeader}>Caller's Phone :</Text>}
        {incoming && (
          <Text style={{fontSize: 30, color: 'white'}}>{number}</Text>
        )}
      </View>
      {/* <Button title="fake call" onPress={() => {}}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'honeydew',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    padding: 20,
    fontSize: 20,
  },
  button: {},
  toggle: {
    marginTop: 30,
    marginBottom: 30,
  },

  loggerInfoContainer: {
    width: '80%',
    height: 150,
    backgroundColor: '#101010',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  callerHeader: {
    fontSize: 18,
    color: '#ecf0f1',
  },
});