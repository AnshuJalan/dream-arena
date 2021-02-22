import React from "react";

const Warning = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        flexDirection: "column",
      }}
    >
      <img src={process.env.PUBLIC_URL + "/images/network.png"} width={128} />

      <span style={{ marginTop: "24px", fontWeight: "bold", fontSize: "32px" }}>
        PLEASE SWITCH TO KOVAN TEST NETWORK
      </span>

      <a style={{ color: "white" }} href="/matches">
        <span style={{ textDecoration: "underline" }}>
          Click here after switching to Kovan
        </span>
      </a>
    </div>
  );
};

export default Warning;
