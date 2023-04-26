import { FormEvent, useState } from 'react';

import './WeatherByLocation.scss';
import { getWeatherByLocation } from '../clients/apiClient';

interface WeatherData {
    days: any;
}

export const WeatherByLocation: React.FunctionComponent = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [selectedDate, setSelectedDate] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        getWeatherByLocation(location).then((data) => setWeatherData(data));
    }

    function handleDateClick(date: string) {
        setSelectedDate(date);
    }

    return (
        <main>
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
                <div className="weather-cards-container">
                    {weatherData.days.map((day: any) => (
                        <ul className="weather-day" key={day.datetime}>
                            <li>
                                <a onClick={() => handleDateClick(day.datetime)}>
                                    {day.datetime}
                                </a>
                                {selectedDate === day.datetime && (
                                    <>
                                        <br />
                                        {day.description}
                                        <br />
                                        Sunrise - {day.sunrise}&nbsp;&nbsp;&nbsp; Sunset -{" "}
                                        {day.sunset}
                                        <ul className="weather-hour">
                                            {day.hours.map((hour: any) => (
                                                <li key={hour.datetime}>
                                                    <div className="weather-hour-child">
                                                        <div className="hour-detail">  {hour.datetime.slice(0, 5)}</div>
                                                        <p>Temp {hour.temp}&deg;- Feels Like {hour.feelslike}&deg;</p>
                                                        <p> Humidity {hour.humidity} Dew {hour.dew}</p>
                                                        <p> {hour.conditions}</p>
                                                        <p> <img src={hour.icon} alt="icon" /></p>
                                                        <p> Visibility {hour.visibility} - Cloudcover {hour.cloudcover}</p>
                                                        <p> Windspeed {hour.windspeed} - Winddirection {hour.winddir}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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
