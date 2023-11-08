import Star from "../../../assets/starBadge.png"
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react" 

export default function StarBadge() {

const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

const themeStyles = isLightTheme ? light : dark;

    return (
        <>
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
        <p className={isLightTheme ? "lightBadgeexample" : "darkBadgeexample" }style={{fontSize: "1.15rem"}}>
        <br/>
        This means you have an average user rating of four or more stars.
        <br/>
        Incredible!
        <br/>
        It's because of people like you that make our community great.
        </p>
        <img className="badgeexample" src={Star} alt="badge-example" width="480px" />
        </div>
        </>
    )
}