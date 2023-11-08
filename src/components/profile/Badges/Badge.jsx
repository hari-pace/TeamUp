import Badgeexample from "../../../assets/badgeexample.png"
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";

export default function Badge() {
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          className={isLightTheme ? "lightBadgeexample" : "darkBadgeexample"}
          style={{ fontSize: "1.15rem" }}
        >
          Badges are rewards for actively participating in the TeamUp community.
          <br />
          This could mean hosting a few events, attending many or receiving all
          around positive feedback.
          <br />
          TeamUp values on its community greatly, so get out there and earn some
          badges!
        </p>
        <img
          className="badgeexample"
          src={Badgeexample}
          alt="badge-example"
          width="480px"
        />
      </div>
    </>
  );
}
