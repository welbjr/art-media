import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";

export const LoginButton = () => {
  const handleLogin = async (res) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        {
          token: res?.tokenId,
        }
      );

      localStorage.setItem("authData", JSON.stringify(result.data));
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("authData");
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
      {/* <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      ></GoogleLogout> */}
    </>
  );
};
