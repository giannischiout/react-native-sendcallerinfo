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
  const [number, setNumber] = useState(null);
  const [event, setEvent] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    isEnabled ? stopListenerTapped() : startListenerTapped();
  };

  useEffect(() => {
    askPermission();
  });

  logger2 = () => {
    fetch('http://ipbx.cloudon.gr:8050', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'thanos',
        password: 'XaMuQ1',
        action: 'ThirdPartyCallForAgent',
        body: [
          {
            agent: 'Admin',
            callType: 'INCOMING',
            phoneNumber: 6946411111,
          },
        ],

        messageId: '12344',
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  logger = () => {
    fetch('http://ipbx.cloudon.gr:8050', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'thanos',
        password: 'XaMuQ1',
        action: 'ThirdPartyCallForAgent',
        body: [
          {
            agent: 'Admin',
            callType: event,
            phoneNumber: number,
          },
        ],

        messageId: '12344',
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

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
        if (event === 'Disconnected') {
          setIncoming(false);

          setNumber(null);
        } else if (event === 'Incoming') {
          setIncoming(true);
          setNumber(number);
          setEvent(event);
          console.log(number);
          logger();
        } else if (event === 'Offhook') {
          setIncoming(true);
          setNumber(number);
          setEvent(event);
          console.log(number);
          logger();
        }
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
        {incoming && <Text style={{fontSize: 30}}>{number}</Text>}
      </View>
      <Button
        title="fake call"
        onPress={() => {
          logger2();
        }}></Button>
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
