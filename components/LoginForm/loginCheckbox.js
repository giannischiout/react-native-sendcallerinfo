import React from "react";
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';



export const LoginCheckBox = (isChecked, setIsCkecked ) => {
    
    return (
      <ButtonContainer style={Styles.checkBoxBtn}>
        <View>
          
        </View>
      </ButtonContainer>
      
    );
}

const ButtonContainer = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${props => props.bgColor};
`;
  
  const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
