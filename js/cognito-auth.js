/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

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

