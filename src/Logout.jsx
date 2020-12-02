import React from "react";
import { Redirect } from "react-router-dom";

import Http from "./api/Http";

const Logout = (props) => {
  let logoutToken = localStorage.getItem("logout_token");

  async function logoutApi() {
    const res = await Http.post(
      `/user/logout?_format=json&token=${logoutToken}`
    )
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        emptyStorage();
        props.history.push("/");
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  }
  if (logoutToken) {
    logoutApi();
  } else {
    emptyStorage();
    return <Redirect to="/" />;
  }

  function emptyStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("logout_token");
    localStorage.removeItem("csrf");
  }

  return (
    <>
      <h1>Logout Page</h1>
    </>
  );
};

export default Logout;
