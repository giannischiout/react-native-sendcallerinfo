import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

export const FadeInView = ({children, style}) => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <>
      <Animated.View
        style={[
          style,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
        {children}
      </Animated.View>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
