// var globalvar = '';
export const doUserLogIn = async (username, password, company) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      company: company,
    }),
  };
  const res = await fetch(
    'https://ccmde1.cloudon.gr/softone/softone.php?validationToken=123',
    requestOptions,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
  try {

    console.log(res)
    return res;
  } catch (e) {
    Alert.alert('Error Message', `${e})`);
  }
};
