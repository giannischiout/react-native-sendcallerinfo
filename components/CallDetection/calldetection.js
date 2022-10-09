/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import { generalStyles } from '../generalStyles';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
  Switch,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';


export const CallDetection = () => {
  const [featureOn, setFeatureOn] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [number, setNumber] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    isEnabled ? stopListenerTapped() : startListenerTapped()
  };
  

  useEffect(() => {
    askPermission();
  })
  
  logger = (num, message) => {
    
    fetch('https://webhook.site/88393fec-2e62-45c7-9745-ef9a9f4608a7', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneSent: num,
        messageSent: message,
      }),
    });
  }
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
    setFeatureOn(true)
    console.log(`just STARTED listening calls\n\t feature is ${featureOn}`)
     let callDetector = new CallDetectorManager(
      (event, number) => {
        if(event === 'Disconnected') {
          setIncoming(false);
          setNumber(null);
        } else if (event === 'Incoming') {
          setIncoming(true)
          setNumber(number)
          logger(number, 'Log Incoming Call');
        } else if (event === 'Offhook') {
          setIncoming(true);
          setNumber(number)
          console.log(number);
          logger(number, 'Log Outgoin Call');
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
    console.log(`just STOPED listening calls\n\t feature is ${featureOn}`)
    let callDetector = new CallDetectorManager()
    callDetector && callDetector.dispose();
    setFeatureOn(false);
  };

  return (
    <View style={generalStyles.body}>
      <Text style={styles.text}>Should the detection be on?</Text>
      
      {incoming && (
        <Text style={{fontSize: 30}}>phone: {number}</Text>
      )}
      <View style={styles.toggle}>
        
        <Switch
          
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>

  );
  }



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
    marginTop: 30
  }
});


