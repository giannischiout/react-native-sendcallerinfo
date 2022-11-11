import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    if (name || number || address) {
      const payload = await fetchData(urlPost, postData);
      await navigation.push('SearchResult', payload);
    } else {
      pop_Alert('Please Fill at least one parameter');
    }
  };

  return (
    <>
      <View style={generalStyles.body}>
        <View style={generalStyles.containerMedWidthFlex}>
          <Text style={[generalStyles.textMediumGrey, Styles.text]}>
            Aναζήτηση Πελάτη στο Softone
          </Text>
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

const Styles = StyleSheet.create({
  text: {
    marginBottom: 2,
  },
});
