import React, { useState, useEffect, useContext } from 'react';
import { generalStyles } from '../generalStyles';
import { Text, View } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import { CustomSwitch } from './CustomSwitch/CustomSwitch';
import { settingsBar } from './SettingsBar/SettingsBar';
//import components:
import { LastCaller } from './lastCaller/lastCaller';
//Import Services:
import { create_UUID } from '../Services/createUUID';
import { logger } from '../Services/callDetecRequest';
//CallDetection Component:
import { UserContext } from '../../useContext/context';
export const CallDetection = ({ route }) => {
  // const { username } = route.params;
  const dataUser = route.params;
  console.log('dataUser')
  console.log(dataUser)
  //import company from Login:
  // const {company} = route.params;
  //Listening to calls:
  const [featureOn, setFeatureOn] = useState(false);
  //Set States of StarListener, set the events:
  const [incoming, setIncoming] = useState(false);
  const [offhook, setOffhook] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [missed, setMissed] = useState(false);
  //set the Number:
  const [number, setNumber] = useState('');
  //Create the Unique ids that will be sent with the POST request:
  const [incUUID, setIncUUID] = useState(create_UUID());
  const [outUUID, setOutUUID] = useState(create_UUID());



  const startListenerTapped = () => {
    setFeatureOn(true);
    console.log(`just STARTED listening calls\n\t feature is ${featureOn}`);
    let callDetector = new CallDetectorManager(
      (event, number) => {
        setNumber(number);
        if (event === 'Disconnected') {
          setDisconnected(true);
          // console.log('inside disconnected');
        } else if (event === 'Incoming') {
          // console.log('inside incoming');
          setIncoming(true);
        } else if (event === 'Offhook') {
          // console.log('inside offhook');
          setOffhook(true);
        } else if (event === 'Missed') {
          // console.log('Inside Missed');
          setMissed(true);
        }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => { }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );
  };

  //INCOMING RINGING
  useEffect(() => {
    if (incoming && !offhook && !disconnected && !missed) {
      logger('INCOMING', 'RINGING', incUUID, number, dataUser);
    }

    if (incoming && offhook && !disconnected) {
      console.log('answered');
      logger('INCOMING', 'ANSWERED', incUUID, number, dataUser);
    }

    if (incoming && offhook && disconnected) {
      setIncoming(prevState => !prevState);
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);
      //Call is completed, so we can restart the 'enter' variable. Call can now enter the INCOMING, ANSWERED state
      logger('INCOMING', 'DISCONNECTED', incUUID, number, dataUser);
      setIncUUID(create_UUID());
    }

    if (incoming && missed) {
      //reset variables
      setIncoming(prevState => !prevState);
      setMissed(prevState => !prevState);
      logger('INCOMING', 'MISSED', incUUID, number, dataUser);
    }
    //OUTGOING, RINGING:
    if (!incoming && offhook && !disconnected) {
      logger('OUTGOING', 'OFFHOOK', outUUID, number, dataUser);
    }

    //OUTGOING, Disconnected:
    if (!incoming && offhook && disconnected) {
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);
      setOutUUID(create_UUID());
      logger('OUTGOING', 'DISCONNECTED', outUUID, number, dataUser);
    }
  }, [incoming, offhook, missed, disconnected, incUUID, outUUID]);

  const stopListenerTapped = () => {
    console.log(`just STOPED listening calls\n\t feature is ${featureOn}`);
    let callDetector = new CallDetectorManager();
    callDetector && callDetector.dispose();
  };

  return (
    <View style={generalStyles.body}>
      <View style={generalStyles.containerMedWidth}>
        <View style={settingsBar.container}>
          <Text style={generalStyles.textMediumGrey}>
            Call Detection State:
          </Text>
          <CustomSwitch
            startListenerTapped={startListenerTapped}
            stopListenerTapped={stopListenerTapped}></CustomSwitch>
        </View>
        <LastCaller number={number}></LastCaller>
      </View>
    </View>
  );
};
