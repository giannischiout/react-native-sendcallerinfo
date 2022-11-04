// var globalvar = '';

export const doUserLogIn = async (username, password, company) => {
  // console.log(`Username inside doUserLogin(): ${username} `);
  // console.log(`Password inside doUserLogin(): ${password} `);
  // console.log(`Company inside doUserLogin(): ${company} `);
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
  console.log('res:' + (await res.result));
  return res;
};

// const data = await res.json();
// console.log(`data: ${data}`);

//   try {
//     if (
//       data.result === 'OK' &&
//       data.error === 'No Errors' &&
//       data.errorcode === 200 &&
//       data.success === true
//     ) {
//       console.log('Success!', `User ${username} has successfully signed in!`);
//       let message = 'ok';
//       console.log(message);
//       return message;
//     }

//     if (data.error == 1 && data.errorType == 'databaseError') {
//       let message = data.errorMessage;
//       return message;
//     }
//   } catch (e) {
//     console.log('catch error');
//   }
