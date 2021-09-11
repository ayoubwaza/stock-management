import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
function Loading() {
  let [loading, setLoading] = React.useState(true);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const color = "#00B5BE";
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  body {background: rgba(7, 1, 48, 0.9);}
          `,
        }}
      />
      <div>
        <RingLoader
          speedMultiplier={2}
          color={color}
          loading={loading}
          css={override}
          size={150}
        />
      </div>
    </div>
  );
}
export default Loading;
