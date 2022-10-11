import React, {useState, useEffect, Component} from 'react';
import {Switch, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SwitchButton = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   let value = isEnabled;
//   const storeOption = async () => {
//     try {
//       await AsyncStorage.setItem('option', JSON.stringify(value));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getOption = async () => {
//     try {
//       const saveOption = await AsyncStorage.getItem('option');
//       console.log('saved option ' + saveOption);
//       const currentOption = JSON.parse(saveOption);
//       setIsEnabled(currentOption);
//       console.log('log CurrentOption ' + currentOption);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOption();
//   });

//   return (
//     <View style={styles.container}>
//       <Switch
//         trackColor={{false: '#767577', true: '#81b0ff'}}
//         thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
//         ios_backgroundColor="#3e3e3e"
//         onValueChange={toggleSwitch}
//         value={isEnabled}
//       />
//     </View>
//   );
// };

export const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
