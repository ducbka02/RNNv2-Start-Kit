// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, Alert } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LoginManager, AccessToken } from "react-native-fbsdk";

import { pushSingleScreenApp, pushTabBasedApp } from "src/navigation";
import { getFacebookUserData } from "../../actions/accounts";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#039893"
  }
});

class LoginScreen extends PureComponent {
  loginWithFacebook = () => {
    const { getFacebookUserData, screenType } = this.props;

    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject("Facebook login cancelled.");
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        if (data.accessToken) {
          getFacebookUserData({ facebookToken: data.accessToken });
          if (screenType === "Single") {
            pushSingleScreenApp();
          } else {
            pushTabBasedApp();
          }
        } else {
          Alert.alert(
            "ReactNativeStarterKit",
            "Failed to get facebook access token."
          );
        }
      })
      .catch(() =>
        Alert.alert("ReactNativeStarterKit", "Something went wrong.")
      );
  };

  render() {
    return (
      <View style={styles.flex}>
        <FontAwesome5.Button
          solid
          name={"facebook"}
          style={styles.button}
          onPress={this.loginWithFacebook}
        >
          Login with Facebook
        </FontAwesome5.Button>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  getFacebookUserData: PropTypes.func.isRequired,
  screenType: PropTypes.oneOf(["Single", "Tab"]).isRequired
};

const mapStateToProps = state => ({
  ...state.accounts
});

const mapDispatchToProps = dispatch => ({
  getFacebookUserData(data) {
    dispatch(getFacebookUserData(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
