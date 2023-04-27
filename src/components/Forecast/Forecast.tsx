import { FormEvent, ReactFragment, useState } from 'react';
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
    let numCols = 0;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        getWeatherByLocation(location).then((data) => setWeatherData(data));
    }

    function handleDateClick(date: string) {
        setSelectedDate(date);
    }

    function getIcon(hourIcon: string) {
        let icon = "";
        if (hourIcon === 'cloudy') {
            icon = "./icons/icons8-clouds-48.png";
        } else if (hourIcon === "partly-cloudy-day") {
            icon = "./icons/icons8-partly-cloudy-day.gif";
        } else if (hourIcon === "clear-night") {
            icon = "./icons/icons8-moon-and-stars-48.png";
        } else if (hourIcon === "clear-day") {
            icon = "./icons/icons8-summer.gif";
        } else if (hourIcon === "snow") {
            icon = "./icons/icons8-snow.gif";
        } else if (hourIcon === "rain") {
            icon = "./icons/icons8-rain.gif";
        } else if (hourIcon === "fog") {
            icon = "./icons/icons8-fog.gif";
        } else if (hourIcon === "wind") {
            icon = "./icons/icons8-windy-weather.gif";
        } else if (hourIcon === "partly-cloudy-night") {
            icon = "./icons/icons8-night-48.png";
        }
        return (icon);

    }
    return (
        <main>
            <h2>Weather Forecast</h2>
            <form onSubmit={handleSubmit}>
                <label className="page-header">
                    Enter your location to get the weather forecast &nbsp;
                </label>
                <input
                    className="form-input"
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
                                    <img src={getIcon(day.icon)} />
                                    {today === Number(day.datetime.slice(8, 10)) ? (
                                        numCols = 24 - currentHour,
                                        <p>Today</p>
                                    ) : (
                                        currentHour = 0, numCols = 24,
                                        <p>{day.datetime} </p>
                                    )}
                                </a>
                                {selectedDate === day.datetime && (
                                    <>
                                        {day.description}
                                        <table className='day-info-table'>
                                            <thead>
                                                <th className='day-info-table-header'>
                                                    <img src="./icons/icons8-sunrise-48.png" />
                                                </th>
                                                <th className='day-info-table-header'>
                                                    <img src="./icons/icons8-sunset-48.png" />
                                                </th>
                                                <th className='day-info-table-header'>
                                                    <img src="./icons/uv-index1.png" />
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {day.sunrise.slice(0, 5)}
                                                    </td>
                                                    <td>
                                                        {day.sunset.slice(0, 5)}
                                                    </td>
                                                    <td>
                                                        {day.uvindex}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody className="hour-tbody">
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <th>
                                                                    {hour.datetime.slice(0, 5)}
                                                                </th>
                                                            )
                                                        })}
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <td key={hour.datetime} className="hour-icon">
                                                                    <img src={getIcon(hour.icon)} />
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <td className='temperature'>
                                                                    {hour.temp}&deg;
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                                <tr className="hour-icons-container">

                                                    <td colSpan={numCols} className="span-data">
                                                        Feels Like temperature
                                                    </td>
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <td className="small-font">
                                                                    {hour.feelslike}&deg;
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                                <tr className="hour-icons-container">

                                                    <td colSpan={numCols} className="span-data">
                                                        Humidity
                                                    </td>
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <td>
                                                                    {hour.humidity}
                                                                </td>

                                                            )
                                                        })}
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    <td colSpan={numCols} className="span-data">
                                                        Dew
                                                    </td>
                                                </tr>
                                                <tr className="hour-icons-container">
                                                    {
                                                        Array.from({ length: 24 - currentHour }).map((_, i) => {
                                                            const hour = day.hours[currentHour + i];
                                                            return (
                                                                <td>
                                                                    {hour.dew}
                                                                </td>
                                                            )
                                                        })}
                                                </tr>


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
