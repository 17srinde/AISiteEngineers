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

const signInUser = () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  const authenticationData = {
    Username: email,
    Password: password
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
  });

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const idToken = result.getIdToken().getJwtToken();
      console.log("Login successful. Token:", idToken);
    },
    onFailure: (err) => {
      alert(err.message || JSON.stringify(err));
    }
  });
};

