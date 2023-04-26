import { Link } from "react-router-dom";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Home.scss";

export const Home: React.FunctionComponent = () => {

    return (
        <main className="home-main">
            <h1>Welcome to Weather Forecast App!</h1>
            <div className="icon-container">
                <div className="top">
                    <button className="location">
                        <Link to="/location"> Location
                            <br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Link>
                    </button>
                </div>
                <div className="center">
                    <button className="latlon">
                        <Link to="/latlon"> LatLon
                            <br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Link>
                    </button>
                    <button className="forecast">
                        <Link to="/forecast"> Forecast
                            <br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Link>
                    </button>
                </div>
                <div className="bottom">
                    <button className="test">
                        <Link to="/latlon"> Test
                            <br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Link>
                    </button>
                </div>
            </div>
        </main >
    );
}