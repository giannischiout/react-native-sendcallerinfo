// var globalvar = '';

export const doUserLogIn = async (username, password, company, navigation) => {
  console.log(`Username inside doUserLogin(): ${username} `);
  console.log(`Password inside doUserLogin(): ${password} `);
  console.log(`Company inside doUserLogin(): ${company} `);
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
      company: company,
      softoneURL:
        'https://dgsoft.oncloud.gr/s1services/JS/MobileTest/loginMobApp',
    }),
  };
  try {
    await fetch(
      'https://ccmde1.cloudon.gr/softone/softone.php?validationToken=123',
      requestOptions,
    ).then(response => {
      response.json().then(data => {
        if (
          data.result === 'OK' &&
          data.error === 'No Errors' &&
          data.errorcode === 200 &&
          data.success === true
        ) {
          console.log(
            'Success!',
            `User ${username} has successfully signed in!`,
          );

          navigation.navigate('CallDetect');
        } else if (data.error === 'Wrong Username/Password') {
          //Reload Page

          navigation.navigate('Login');

          // globalvar = 'failure';
        } else {
          console.log('something is wrong');
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
