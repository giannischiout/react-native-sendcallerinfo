import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchData = async (urlPost, postData) => {
  // const url = await AsyncStorage.getItem('@URL');
  const url = await AsyncStorage.getItem('@URL');
  console.log('async url: ' + url);

  for (let property in postData) {
    console.log(property);
    console.log(`postData: ${postData[property]}`);
  }

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
      console.log(data);
      return data;
    });
  try {
    if (res.result !== null) {
      console.log(res.result[0]);
      return res.result[0];
    }
    if (res.result == null) {
      return (res.result = 'not found');
    }
  } catch (e) {
    console.log(e);
  }
};
// try {
//   const data = await res.json();
//   console.log('data result' + data.result);
//   if (data.result !== null) {
//     return data.result;
//   }
// } catch (e) {
//   console.log(e);
// }

// return data;
