export const doUserLogIn = async (username, password, navigation) => {
  console.log(`Usenrame inside doUserLogin(): ${username} `);
  console.log(`Password inside doUserLogin(): ${password} `);
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  try {
    await fetch(
      'https://dgsoft.oncloud.gr/s1services/JS/MobileTest/loginMobApp',
      requestOptions,
    ).then(response => {
      response.json().then(data => {
        if (
          data.result === 'OK' &&
          (data.error === 'No Errors') &
            (data.errorcode === 200) &
            (data.success === true)
        ) {
          console.log(
            'Success!',
            `User ${username} has successfully signed in!`,
          );
          navigation.navigate('CallDetect');
        } else if (data.error === 'Wrong Username/Password') {
          console.log('Failure Wrong Username/Password');
          navigation.navigate('Login');
        } else {
          console.log('something is wrong');
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
