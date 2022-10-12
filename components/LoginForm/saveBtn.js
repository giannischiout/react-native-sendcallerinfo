import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Button,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const BtnSave = () => {
    const [isChecked, setIsChecked] = useState();

    useEffect(() => { 
        
        getButtonOption() 
    }, [])


      const getButtonOption = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('buttonCheck', )
          const value = JSON.parse(jsonValue)
          
          if (value != null){
            console.log(`value inside getButton is: ${value}`)
            setIsChecked(value) 
         }
         else {
            console.log('Frist time set false')
            setIsChecked(false)
            }



         
        } catch(e) {
          console.log(e)
        }
      }

      //Execute when i click the button
      const buttonActions = async () => {
        
        setIsChecked(previousValue => !previousValue)
        buttonSaveClicked();
      };

      const buttonSaveClicked = async () => {
        let btnValue = isChecked.toString();
        //Have to click twice to change the value 
        console.log(`btn value is: ${btnValue}`)
        await AsyncStorage.setItem('buttonCheck',btnValue )
      };
    
    return  (
        <TouchableOpacity>

      <View>
        <Button  title='save settings' onPress={buttonActions}></Button>
      </View>
    </TouchableOpacity>

    )
}