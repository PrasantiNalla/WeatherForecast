import { FormEvent, useState } from 'react';
import { getWeatherByLocation } from '../../clients/apiClient';
import './WeatherByLocation.scss';

interface WeatherData {
    days: any;
}

export const WeatherByLocation: React.FunctionComponent = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const currentDate = new Date();
    const today = currentDate.getDate();
    const currentHour = currentDate.getHours();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        getWeatherByLocation(location).then((data) => setWeatherData(data));
        console.log(today,)
    }
    function handleDateClick(date: string) {
        setSelectedDate(date);
    }


    return (
        <main>
            <h1>Welcome to Weather Forecast App!</h1>
            <form onSubmit={handleSubmit}>
                <label className="page-header">
                    Enter your location to get the weather forecast
                </label>
                <input
                    type="text"
                    name="userLoc"
                    id="userLoc"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div className="weather-container">
                    {weatherData.days.map((day: any) => (
                        // {selectedDate === day.datetime &&
                        <div className="day-detail">
                            <a onClick={() => handleDateClick(day.datetime)}>
                                {day.datetime}
                            </a>
                            <div className="hour-header">
                                {today === Number(day.datetime.slice(8, 10)) ? (
                                    <p>Today</p>
                                ) : (
                                    <p>{day.datetime}</p>
                                )}
                                {day.description} <br />
                                <img src="./icons/icons8-sunrise-48.png" />&nbsp;&nbsp;&nbsp;
                                <img src="./icons/icons8-sunset-48.png" /> <br />
                                {day.sunrise} &nbsp;&nbsp;&nbsp;
                                {day.sunset}
                            </div>
                            <div className="hour-detail">
                                {Array.from({ length: 24 - currentHour }).map((_, i) => {
                                    const hour = day.hours[currentHour + i];
                                    let icon = null;
                                    if (hour.icon === 'cloudy') {
                                        icon = <img src="./icons/icons8-clouds-48.png" />;
                                    } else if (hour.icon === "partly-cloudy-day") {
                                        icon = <img src="./icons/icons8-partly-cloudy-day.gif" />;
                                    }
                                    else if (hour.icon === "clear-night") {
                                        icon = <img src="./icons/icons8-moon-and-stars-48.png" />;
                                    } else if (hour.icon === "clear-day") {
                                        icon = <img src="./icons/icons8-summer.gif" />;
                                    } else if (hour.icon === "snow") {
                                        icon = <img src="./icons/icons8-snow.gif" />;
                                    }
                                    else if (hour.icon === "rain") {
                                        icon = <img src="./icons/icons8-rain.gif" />;
                                    }
                                    else if (hour.icon === "fog") {
                                        icon = <img src="./icons/icons8-fog.gif" />;
                                    }
                                    else if (hour.icon === "wind") {
                                        icon = <img src="./icons/icons8-windy-weather.gif" />;
                                    }
                                    else if (hour.icon === "partly-cloudy-night") {
                                        icon = <img src="./icons/icons8-night-48.png" />;
                                    }
                                    return (
                                        <table className="hour-table">
                                            <th>
                                                {hour.datetime.slice(0, 5)}
                                            </th>
                                            <tr>
                                                {icon}
                                            </tr>
                                            <tr>
                                                {hour.temp}&deg;
                                                <p className='small-font'>{hour.feelslike}&deg;</p>
                                            </tr>
                                            <tr>
                                                Humidity {hour.humidity}
                                            </tr>
                                            <tr>
                                                Dew {hour.dew}
                                            </tr>
                                        </table>
                                        // {/*
                                        //             Visibility {hour.visibility} - Cloudcover {hour.cloudcover}
                                        //         </p>
                                        //         <p>
                                        //             Windspeed {hour.windspeed} - Winddirection {hour.winddir}
                                        //         </p>
                                        //     </div>
                                        // </li> */}
                                    );
                                })}
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </main>
    );
}
