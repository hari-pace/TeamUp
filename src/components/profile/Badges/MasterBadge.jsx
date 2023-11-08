import Trophy from "../../../assets/trophyBadge.png"
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react" 

export default function TrophyBadge() {

const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

const themeStyles = isLightTheme ? light : dark;

    return (
        <>
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
        <p className={isLightTheme ? "lightBadgeexample" : "darkBadgeexample" }style={{fontSize: "1.15rem"}}>
        <br/>
        This means you have created five or more events.
        <br/>
        Excellent job! 
        </p>
        <img className="badgeexample" src={Trophy} alt="badge-example" width="480px" />
        </div>
        </>
    )
}