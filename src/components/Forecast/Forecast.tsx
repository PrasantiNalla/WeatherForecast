import { FormEvent, useRef, useState } from 'react';
import { getWeatherByLocation } from '../../clients/apiClient';
import './Forecast.scss';
import { HourlyForecast } from './HourlyForecast';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface WeatherData {
    days: any;
}

export const Forecast: React.FunctionComponent = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const currentDate = new Date();
    const today = currentDate.getDate();
    let currentHour = currentDate.getHours();
    let numCols = 0;
    const scrollRef = useRef<HTMLDivElement>(null);

    function handleScrollRight() {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 50;
        }
    }

    function handleScrollLeft() {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 50;
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        getWeatherByLocation(location).then((data) => setWeatherData(data));
    }

    function handleDateClick(date: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        setSelectedDate(date);
        const selectedDaySelector = event.currentTarget.parentElement as HTMLDivElement;
        selectedDaySelector.classList.toggle('selected-day-selector');
    }

    function getIcon(hourIcon: string) {
        let icon = "";
        if (hourIcon === 'cloudy') {
            icon = "./icons/cloudy.svg";
        } else if (hourIcon === "partly-cloudy-day") {
            icon = "./icons/cloudy-day-2.svg";
        } else if (hourIcon === "clear-night") {
            icon = "./icons/night.svg";
        } else if (hourIcon === "clear-day") {
            icon = "./icons/day.svg";
        } else if (hourIcon === "snow") {
            icon = "./icons/snowy-6.svg";
        } else if (hourIcon === "rain") {
            icon = "./icons/rainy-7.svg";
        } else if (hourIcon === "fog") {
            icon = "./icons/icons8-fog.gif";
        } else if (hourIcon === "wind") {
            icon = "./icons/icons8-windy-weather.gif";
        } else if (hourIcon === "partly-cloudy-night") {
            icon = "./icons/cloudy-night-2.svg";
        }
        return (icon);
    }

    return (
        <main>
            <h2>Weather Forecast</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    Enter your location to get weather forecast &nbsp;
                </label>
                <input
                    className="form-input"
                    type="text"
                    name="userLoc"
                    id="userLoc"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className='day-scroll-button'>
                <button className="scroll-button" onClick={handleScrollLeft}>
                    <FiChevronLeft />
                </button>
                <button className="scroll-button" onClick={handleScrollRight}>
                    <FiChevronRight />
                </button>
            </div>
            {weatherData && (
                <div className="weather-cards-container" ref={scrollRef}>
                    <br />
                    {weatherData.days.slice(0, 10).map((day: any) => (
                        <ul className="weather-day" key={day.datetime}>
                            <li>
                                <div className={`day-selector ${day.datetime === selectedDate ? 'selected-day-selector' : ''}`}>
                                    <a onClick={(event) => handleDateClick(day.datetime, event)}>
                                        <img src={getIcon(day.icon)} />
                                        {today === Number(day.datetime.slice(8, 10)) ? (
                                            numCols = 24 - currentHour,
                                            <p>Today</p>
                                        ) : (
                                            currentHour = 0, numCols = 24,
                                            <p>{day.datetime} </p>
                                        )}
                                    </a>
                                </div>
                                <div className={` ${selectedDate !== day.datetime ? 'day-container-none' : 'day-container'}`} >
                                    <HourlyForecast day={day} numCols={numCols} currentHour={currentHour} getIcon={getIcon} />
                                </div>

                            </li>
                        </ul>
                    ))}
                </div >
            )
            }

        </main >
    );
}
