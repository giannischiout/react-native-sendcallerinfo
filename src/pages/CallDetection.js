import React, { useState, useEffect, useContext } from 'react';
import { generalStyles } from '../generalStyles';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import { CustomSwitch } from '../../src/Components/Atoms/CustomSwitch';
//import components:
import { LastCaller } from './lastCaller/lastCaller';
//Import Services:
// import { create_UUID } from '../Services/createUUID';
import { create_UUID } from '../utils/uuid';
// import { logger } from '../Services/callDetecRequest';
import callDetectRequest from '../api/callDetectRequest';
//CallDetection Component:
import { UserContext } from '../../useContext/context';
import ViewBody from '../Components/Atoms/Views/ViewBody';
import ViewRow from '../Components/Atoms/Views/ViewRow';
import TextBold from '../Components/Atoms/Texts/TextBold';
import Information from '../Components/Molecules/Instruction';

const CallDetect = ({ route }) => {
  // const { username } = route.params;
  const dataUser = route.params;
  const { number, setNumber } = useContext(UserContext);
  const [incoming, setIncoming] = useState(false);
  const [offhook, setOffhook] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [missed, setMissed] = useState(false);
  const [incUUID, setIncUUID] = useState(create_UUID());
  const [outUUID, setOutUUID] = useState(create_UUID());



  const startListenerTapped = () => {
    let callDetector = new CallDetectorManager(
      (event, num) => {
        if (number !== num) {
          setNumber(() => num.replace('+30', ''))
        }
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
      callDetectRequest('INCOMING', 'RINGING', incUUID, number, dataUser);
    }

    if (incoming && offhook && !disconnected) {
      console.log('answered');
      callDetectRequest('INCOMING', 'ANSWERED', incUUID, number, dataUser);
    }

    if (incoming && offhook && disconnected) {
      setIncoming(prevState => !prevState);
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);
      //Call is completed, so we can restart the 'enter' variable. Call can now enter the INCOMING, ANSWERED state
      callDetectRequest('INCOMING', 'DISCONNECTED', incUUID, number, dataUser);
      setIncUUID(create_UUID());
    }

    if (incoming && missed) {
      //reset variables
      setIncoming(prevState => !prevState);
      setMissed(prevState => !prevState);
      callDetectRequest('INCOMING', 'MISSED', incUUID, number, dataUser);
    }
    //OUTGOING, RINGING:
    if (!incoming && offhook && !disconnected) {
      callDetectRequest('OUTGOING', 'OFFHOOK', outUUID, number, dataUser);
    }

    //OUTGOING, Disconnected:
    if (!incoming && offhook && disconnected) {
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);
      setOutUUID(create_UUID());
      callDetectRequest('OUTGOING', 'DISCONNECTED', outUUID, number, dataUser);
    }
  }, [incoming, offhook, missed, disconnected, incUUID, outUUID]);

  const stopListenerTapped = () => {
    let callDetector = new CallDetectorManager();
    callDetector && callDetector.dispose();
  };

  return (
    // <View style={generalStyles.body}>
    //   <View style={generalStyles.containerMedWidth}>
    //     <View style={settingsBar.container}>
    //       <Text style={generalStyles.textMediumGrey}>
    //         Call Detection State:
    //       </Text>
    //       <CustomSwitch
    //         startListenerTapped={startListenerTapped}
    //         stopListenerTapped={stopListenerTapped}></CustomSwitch>
    //     </View>
    //     {/* <ScrollView> */}

    //     {/* </ScrollView> */}
    //   </View>
    //   <LastCaller number={number}></LastCaller>
    // </View >
    <>
      <ViewBody>
        <View style={styles.dividerRow}>
          <ViewRow style={styles.row} spaceBetween={true}>
            <TextBold style={styles.textHeader}>Call Detection State:</TextBold>
            <CustomSwitch
              startListenerTapped={startListenerTapped}
              stopListenerTapped={stopListenerTapped} />
          </ViewRow>
          <Information />
        </View>

      </ViewBody>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    minheight: 80,
  },
  textHeader: {
    fontSize: 17
  },
  dividerRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 10,
  }
});
export default CallDetect;