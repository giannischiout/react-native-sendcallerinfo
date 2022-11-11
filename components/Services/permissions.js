import {PermissionsAndroid} from 'react-native';
export const requestCallLogPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_LOG,
      {
        title: 'CCM wants to access your Call Log',
        // message:
        //   'Cool Photo App needs access to your camera ' +
        //   'so you can take awesome pictures.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the call Log');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
export const requestPhoneStatePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: 'CCM wants to access your Phone State',
        // message:
        //   'Cool Photo App needs access to your camera ' +
        //   'so you can take awesome pictures.',
        // buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
