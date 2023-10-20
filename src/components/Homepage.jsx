import { Carousel } from "antd";
import { Link } from "react-router-dom"
import Football from "../assets/football.jpg"
import Basketball from "../assets/basketball.jpg"
import Swimming from "../assets/swimming.jpg"
import Beachvolleyball from "../assets/beachvolleyball.jpg"

export default function Homepage() {
    const contentStyle = {
        height: '400px',
        lineHeight: '360px',
        textAlign: 'center',
        background: "var(--secondary)",

      };
    return (
        <>
        <div className="heroDiv">
        <h1> Welcome to TeamUp</h1>
        </div>
        <div className="whatIsCon">
        <h2>What is TeamUp?</h2>
        <div className="descriptionCon">
            <p>When you moved to a new city, it can be hard to make new friends. We all have our own story, our own background and it's what makes us unique. 
                <br />
                However, no matter where you are, sport is what unites us. And that's why we created TeamUp. 
                <br/>
                <br/>
                  No matter if you are footballer in need of a kickabout or just want a running partner, TeamUp has got you covered. 
                  <br/>
                  Search for events in your area or, even better, create one, and soon you could be playing a five-a-side game of basketball with like-minded teammates.
                  <br/>
                  <br/>
                  The perfect way to get outside and form new connections.  
                  </p>
                </div>
            </div>
        <div className="howContainer">
            <h2>How it works</h2>
                <div className="stepsContainer">
                    <div className="steps"><h3>1. Register <br/>an account</h3></div>
                    <div className="steps"><h3>2. Look for <br/>or create<br/> a sport event</h3></div>
                    <div className="steps"><h3>3. Attend <br/>the event<br/> and have fun!</h3></div>
                </div>
         </div>
    <div className="typeOfSportContainer">
        <h2>Sport</h2>
    <Carousel 
    className="carouselCon"
    autoplay
    dotHeight="30"
    >
    <Link>
    <div className="carouselItem">
    <img style={contentStyle}  src={Football} />
    <h3>Football</h3>
    </div>
    </Link>
    <Link>
    <div className="carouselItem">
    <img style={contentStyle} src={Basketball} />
    <h3>Basketball</h3>
    </div>
    </Link>
    <Link>
    <div className="carouselItem">
    <img style={contentStyle} src={Beachvolleyball} />
    <h3>Beach Volleyball</h3>
    </div>
    </Link>
    <Link>
    <div className="carouselItem">
    <img style={contentStyle} src={Swimming} />
    <h3>Swimming</h3>
    </div>
    </Link>
  </Carousel>
  </div>
  <div className="reviewContainer">
        <h2>Reviews</h2>
    <Carousel 
    className="carouselReviews"
    autoplay
    dotHeight="30"
    >
    <div>
    <h3 style={contentStyle}>"These guys are great" - Tim</h3>
    </div>
    <div>
    <h3 style={contentStyle}>"These guys are great"- Tim</h3>
    </div>
    <div>
    <h3 style={contentStyle}>"These guys are great" - Tim</h3>
    </div>
    <div>
    <h3 style={contentStyle}>"These guys are great" - Tim</h3>
    </div>
  </Carousel>
  </div>
        </>
    )
}