/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

const registerUser = () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  const poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
  ];

  userPool.signUp(email, password, attributeList, null, function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    alert('Sign-up successful! Please check your email for the verification code.');
    // Redirect to verification page or show code input
  });
};

