import React, {useState, useEffect} from 'react';
import {generalStyles} from '../generalStyles';
import {StyleSheet, Text, View, PermissionsAndroid, Switch} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

export const CallDetection = () => {
  //Listening to calls
  const [featureOn, setFeatureOn] = useState(false);
  //Set States of StarListener, set the events
  const [incoming, setIncoming] = useState(false);
  const [offhook, setOffhook] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [missed, setMissed] = useState(false);
  //set the Number
  const [number, setNumber] = useState('');
  //State for the switch button
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    isEnabled ? stopListenerTapped() : startListenerTapped();
  };

  let myHeaders = new Headers();
  let fixedNum = number.replace('+30', '');
  function randNum() {
    return Math.floor(Math.random() * (99999 - 1000) + 1000);
  }

  logger = (calltype, state) => {
    let raw = `{"userName":"thanos","password":"XaMuQ","action":"ThirdPartyCallForAgent","body":["{\\"agent\\":\\"Admin\\",\\"callType\\":\\"${calltype}\\",\\"state\\":\\"${state}\\",\\"phoneNumber\\":\\"${fixedNum}\\"}"],"messageId":"${randNum()}"}\r\n`;
    myHeaders.append('Content-Type', 'text/plain');
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://ipbx.cloudon.gr:8050', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(`result: \n\r ${result} `);
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
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
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
      logger('INCOMING', 'RINGING');
    }

    if (incoming && offhook && !disconnected) {
      logger('INCOMING', 'ANSWERED');
    }

    if (incoming && offhook && disconnected) {
      setIncoming(prevState => !prevState);
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);
      //Call is completed, so we can restart the 'enter' variable. Call can now enter the INCOMING, ANSWERED state
      logger('INCOMING', 'DISCONNECTED');
    }

    if (incoming && missed) {
      //reset variables
      setIncoming(prevState => !prevState);
      setMissed(prevState => !prevState);
      logger('INCOMING', 'MISSED');
    }
    //OUTGOING, RINGING
    if (!incoming && offhook && !disconnected) {
      logger('OUTGOING', 'OFFHOOK');
    }
    if (!incoming && offhook && disconnected) {
      setOffhook(prevState => !prevState);
      setDisconnected(prevState => !prevState);

      logger('OUTGOING', 'DISCONNECTED');
    }
  }, [incoming, offhook, missed, disconnected]);

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
