let myHeaders = new Headers();

export const logger = (calltype, state, uuid, number, username) => {
  let fixedNum = number.replace('+30', '');
  function randNum() {
    return Math.floor(Math.random() * (99999 - 1000) + 1000);
  }
  let usenrameTrim = username.trim();
  let raw = `{"userName":"thanos","password":"XaMuQ","action":"ThirdPartyCallForAgent","body":["{\\"agent\\":\\"${usenrameTrim}\\",\\"callType\\":\\"${calltype}\\",\\"state\\":\\"${state}\\",\\"phoneNumber\\":\\"${fixedNum}\\",\\"callId\\":\\"${uuid}\\"}"],"messageId":"${randNum()}"}\r\n`;
  myHeaders.append('Content-Type', 'text/plain');
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('http://ipbx.cloudon.gr:8050', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(`result: \n\r ${result} `);
      console.log(`raw: \n\r ${raw}`);
    })
    .catch(error => console.log('error', error));
};
