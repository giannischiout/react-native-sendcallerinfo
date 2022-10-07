/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

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
});

export class CallDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureOn: false,
      incoming: false,
      number: null,
    };
  }
  componentDidMount() {
    this.askPermission();
  }

  logger(num, message) {
    console.log(num);
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
      console.log('Permissions are:', permissions);
    } catch (err) {
      console.warn(err);
    }
  };

  startListenerTapped = () => {
    this.setState({featureOn: true});
    this.callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === 'Disconnected') {
          // Do something call got disconnected
          this.setState({incoming: false, number: null});
        } else if (event === 'Incoming') {
          // Do something call got incoming
          this.setState({incoming: true, number});
          this.logger(number, 'Log Incoming call');
        } else if (event === 'Offhook') {
          this.setState({incoming: true, number});
          this.logger(number, 'Log Outgoin Call');
        }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  };

  stopListenerTapped = () => {
    this.setState({featureOn: false});
    this.callDetector && this.callDetector.dispose();
  };

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Should the detection be on?</Text>
        <TouchableHighlight
          onPress={
            this.state.featureOn
              ? this.stopListenerTapped
              : this.startListenerTapped
          }>
          <View
            style={{
              width: 200,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: this.state.featureOn
                ? 'greenyellow'
                : 'indianred',
            }}>
            <Text style={styles.text}>
              {this.state.featureOn ? `ON` : `OFF`}{' '}
            </Text>
          </View>
        </TouchableHighlight>
        {this.state.incoming && (
          <Text style={{fontSize: 50}}>PUHELU {this.state.number}</Text>
        )}
      </View>
    );
  }
}
