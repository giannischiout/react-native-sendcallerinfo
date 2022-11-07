import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../Colors';

export const Logo = () => {
  return (
    <>
      <View style={Styles.container}>
        <Image
          style={[Styles.logo]}
          source={require('../../../assets/imgs/ccm2.png')}
        />
        {/* <Text style={Styles.introText}>Login in to continue</Text> */}
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 30,
    marginBottom: 30,
  },
  introText: {
    marginVertical: 20,
    fontSize: 25,
    color: COLORS.fontPrimary,
    fontFamily: 'NotoSans-Medium',
  },
});
