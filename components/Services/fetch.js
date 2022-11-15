import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async (urlPost, postData) => {
  // const url = await AsyncStorage.getItem('@URL');
  const url = await AsyncStorage.getItem('@URL');

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      dataArray: postData,
      url: url,
    }),
  };

  const res = await fetch(urlPost, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data;
    });
  try {
    return res.result;
  } catch (e) {
    console.log(e);
  }
};
