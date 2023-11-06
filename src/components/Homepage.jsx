import { Carousel } from "antd";
import { Link } from "react-router-dom"
import Football from "../assets/football.jpg"
import Basketball from "../assets/basketball.jpg"
import Swimming from "../assets/swimming.jpg"
import Beachvolleyball from "../assets/beachvolleyball.jpg"
import Cycling from "../assets/cycling2.jpg";
import Yoga from "../assets/yoga2.jpg";
import Tennis from "../assets/tennis3.jpg";
import Handball from "../assets/handball1.jpg";
import Cricket from "../assets/cricket2.jpg";
import Fitness from "../assets/fitness1.jpg";
import Skiing from "../assets/ski1.jpg";
import { ParallaxBanner } from "react-scroll-parallax";
import Hero2 from "../assets/hero2.png"
import "./styling/homepage.css"
import VolleyballVid from "../assets/VolleyballVid.mp4"
import Team from "../assets/team.png"
import Register from "../assets/register.png"
import Search from "../assets/search.png"
import Fun from "../assets/fun.png"

export default function Homepage() {
    const contentStyle = {
        height: '400px',
        lineHeight: '360px',
        textAlign: 'center',
        background: "var(--secondary)",

      };
    return (
        <>
<div className="video-container">
    <div className="heroDiv">
    <h1 className="text"> Welcome to TeamUp</h1>
    <video 
    autoPlay 
    loop 
    muted 
    src={VolleyballVid} type="video/mp4">
    </video>
    </div>
    </div>
        <div className="whatIsCon">
        <h2>What is TeamUp?</h2>
        <div className="descriptionCon">
            <p>When you move to a new city, it can be hard to make new friends. We all have our own story, our own background and it's what makes us unique. 
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
        <img src={Team} alt="team" className="teamImage" />
                </div>
            </div>
            <div className="howContainer">
            <h2>How it works</h2>
                <div className="stepsContainer">
                    <div className="steps">
                        <h3>1. Register </h3> 
                        <img className="stepsIcons" src={Register} alt="register" /> 
                        </div>
                    <div className="steps">
                        <h3>2. Look for <br/>or create<br/> a sport event</h3>
                        <img className="stepsIcons" src={Search} alt="search" />
                        </div>
                    <div className="steps">
                        <h3>3. Attend <br/> and have fun!</h3>
                        <img className="stepsIcons" src={Fun} alt="fun" />
                    </div>
                </div>
         </div>
    <div className="typeOfSportContainer">
        <h2>Sport</h2>
    <Carousel 
    className="carouselCon"
    autoplay
    dotHeight="30"
    >
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Football</h3>
    </div>
    <img style={contentStyle}  src={Football} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Basketball</h3>
    </div>
    <img style={contentStyle} src={Basketball} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Volleyball</h3>
    </div>
    <img style={contentStyle} src={Beachvolleyball} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Swimming</h3>
    </div>
    <img style={contentStyle} src={Swimming} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Cycling</h3>
    </div>
    <img style={contentStyle} src={Cycling} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Yoga</h3>
    </div>
    <img style={contentStyle} src={Yoga} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Tennis</h3>
    </div>
    <img style={contentStyle} src={Tennis} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Handball</h3>
    </div>
    <img style={contentStyle} src={Handball} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Cricket</h3>
    </div>
    <img style={contentStyle} src={Cricket} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Fitness</h3>
    </div>
    <img style={contentStyle} src={Fitness} />
    </div>
    </Link>
    <Link to="events">
    <div className="carouselItem">
    <div className="carouselTitle">
    <h3>Skiing</h3>
    </div>
    <img style={contentStyle} src={Skiing} />
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
    <div className="reviewItem">
    <h3 style={contentStyle}>"So easy now to play a game of B-ball" - Kate</h3>
    </div>
    <div className="reviewItem">
    <h3 style={contentStyle}>"Perfect for Handball"- Hari</h3>
    </div>
    <div className="reviewItem">
    <h3 style={contentStyle}>"Sport is the true panacea" - Dazbot</h3>
    </div>
    <div className="reviewItem">
    <h3 style={contentStyle}>"Perfect for organising cricket!" - Ehsan</h3>
    </div>
  </Carousel>
  </div>
        </>
    )
}