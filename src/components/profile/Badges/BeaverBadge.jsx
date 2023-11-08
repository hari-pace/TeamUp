import Beaver from "../../../assets/beaver.png"
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react" 

export default function BeaverBadge() {

const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

const themeStyles = isLightTheme ? light : dark;

    return (
        <>
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
        <p className={isLightTheme ? "lightBadgeexample" : "darkBadgeexample" }style={{fontSize: "1.15rem"}}>
        <br/>
        This means you have participated in three or more events.
        <br/>
        Great work! There's plenty more where that came from.
        </p>
        <img className="badgeexample" src={Beaver} alt="badge-example" width="480px" />
        </div>
        </>
    )
}