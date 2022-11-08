import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Input} from '../../LoginForm/LoginInput/LoginInput';
import {LoginButton} from '../../LoginForm/LoginButtons/LoginButton';
import {generalStyles} from '../../generalStyles';
import {fetchData} from '../../Services/fetch';
import {pop_Alert} from '../../Services/validateFIelds';
const urlPost = 'https://ccmde1.cloudon.gr/softone/searchCustomer.php';

export const SearchForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleName = text => setName(text);
  const handleNumber = text => setNumber(text);
  const handleAddress = text => setAddress(text);

  const postData = {
    NAME: name,
    ADDRESS: address,
    PHONE: number,
  };

  const onPressActions = async () => {
    console.log('Fetch Customer');
    if (name || number || address) {
      const payload = await fetchData(urlPost, postData);
      await navigation.push('SearchResult', payload);
    } else {
      pop_Alert('Please Fill at least one parameter');
    }

    // console.log('send payload ' + payload.ADDRESS);
    // console.log('await navigation: ' + navigation);
  };

  return (
    <>
      <View style={generalStyles.body}>
        <View style={generalStyles.containerMedWidthFlex}>
          <Input placeholder={'Όνομα'} text={name} handleType={handleName} />
          <Input
            placeholder={'Διεύθυνση'}
            text={address}
            handleType={handleAddress}
          />
          <Input
            placeholder={'Τηλέφωνο'}
            text={number}
            handleType={handleNumber}
          />
          <LoginButton onPressActions={onPressActions} text={'Search'} />
        </View>
      </View>
    </>
  );
};
