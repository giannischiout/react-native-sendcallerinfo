import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {generalStyles} from '../../generalStyles';
import AntIcon from '../../../node_modules/react-native-vector-icons/AntDesign';

export const Topbar = ({navigation}) => {
  return (
    <>
      <View
        style={{
          ...generalStyles.containerRow,
          ...generalStyles.backgroundDarkGrey,
          ...generalStyles.padding15,
          ...generalStyles.marginBottom30,
        }}>
        <View style={styles.container}>
          <Image
            style={{...styles.image, ...styles.container}}
            source={require('../../../assets/imgs/ccm.png')}
          />
        </View>
        <View style={styles.containerEnd}>
          <TouchableOpacity>
            <AntIcon
              style={{
                ...generalStyles.text,
                ...generalStyles.text18,
              }}
              onPress={() => navigation.navigate('Login')}
              name="arrowleft"></AntIcon>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 30,
  },
  container: {
    width: '50%',
  },
  containerEnd: {
    alignItems: 'flex-end',
    width: '50%',
  },
});
