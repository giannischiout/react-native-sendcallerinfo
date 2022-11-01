const fetchCallerInfo = async number => {
  console.log(`fetch  number ${number}`);
  const url = await AsyncStorage.getItem('@URL');
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      callingParty: number,
      url: url,
    }),
  };

  const res = await fetch(
    'https://ccmde1.cloudon.gr/softone/soneCustomer.php',
    requestOptions,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
  if (res.result !== null) {
    return res.result;
  }
};

module.export = fetchCallerInfo;
