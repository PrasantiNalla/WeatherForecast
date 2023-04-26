import { FormEvent, useState } from 'react';
import { getWeatherByLocation } from '../../clients/apiClient';
import './Forecast.scss';

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
    let currentDayFlag = true;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        getWeatherByLocation(location).then((data) => setWeatherData(data));
    }

    function handleDateClick(date: string) {
        setSelectedDate(date);
    }

    return (
        <main>
            <h1>Welcome to Weather Forecast App!</h1>
            <form onSubmit={handleSubmit}>
                <label className="page-header">
                    Enter your location to get the weather forecast &nbsp;
                </label>
                <input
                    type="text"
                    name="userLoc"
                    id="userLoc"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                />&nbsp;
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div className="weather-cards-container">
                    {weatherData.days.map((day: any) => (
                        <ul className="weather-day" key={day.datetime}>
                            <li>
                                <a onClick={() => handleDateClick(day.datetime)}>
                                    {today === Number(day.datetime.slice(8, 10)) ? (
                                        currentDayFlag = false,
                                        <p>Today</p>
                                    ) : (
                                        currentDayFlag = true,
                                        <p>{day.datetime}</p>
                                    )}
                                </a>
                                {selectedDate === day.datetime && (
                                    <>
                                        <div>
                                            {day.description} <br />
                                            <img src="./icons/icons8-sunrise-48.png" />&nbsp;&nbsp;&nbsp;
                                            <img src="./icons/icons8-sunset-48.png" /> <br />
                                            {day.sunrise} &nbsp;&nbsp;&nbsp;
                                            {day.sunset}
                                        </div>
                                        {currentDayFlag === true && (currentHour = 0)}
                                        <table>
                                            <tbody className="hour-tbody">
                                                {Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                    const hour = day.hours[currentHour + i];
                                                    let icon = null;
                                                    if (hour.icon === 'cloudy') {
                                                        icon = <img src="./icons/icons8-clouds-48.png" />;
                                                    } else if (hour.icon === "partly-cloudy-day") {
                                                        icon = <img src="./icons/icons8-partly-cloudy-day.gif" />;
                                                    } else if (hour.icon === "clear-night") {
                                                        icon = <img src="./icons/icons8-moon-and-stars-48.png" />;
                                                    } else if (hour.icon === "clear-day") {
                                                        icon = <img src="./icons/icons8-summer.gif" />;
                                                    } else if (hour.icon === "snow") {
                                                        icon = <img src="./icons/icons8-snow.gif" />;
                                                    } else if (hour.icon === "rain") {
                                                        icon = <img src="./icons/icons8-rain.gif" />;
                                                    } else if (hour.icon === "fog") {
                                                        icon = <img src="./icons/icons8-fog.gif" />;
                                                    } else if (hour.icon === "wind") {
                                                        icon = <img src="./icons/icons8-windy-weather.gif" />;
                                                    } else if (hour.icon === "partly-cloudy-night") {
                                                        icon = <img src="./icons/icons8-night-48.png" />;
                                                    }
                                                    return (
                                                        <tr className="hour-table">
                                                            <tr>
                                                                <th>{hour.datetime.slice(0, 5)}</th>
                                                            </tr>
                                                            <tr>
                                                                <td>{icon}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='temperature'>{hour.temp}&deg;</td>
                                                            </tr>
                                                            <tr>
                                                                <th colSpan={10}>Feels like temperature</th>
                                                            </tr>
                                                            <tr>
                                                                <td className='small-font'>{hour.feelslike}&deg;</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Humidity {hour.humidity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dew {hour.dew}</td>
                                                            </tr>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </li>
                        </ul>
                    ))}
                </div >
            )
            }
        </main >
    );
}
