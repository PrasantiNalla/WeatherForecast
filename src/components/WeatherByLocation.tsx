import { FormEvent, useState } from 'react';
import { getWeatherByLocation } from '../clients/apiClient';


export function WeatherByLocation() {

    const [location, setLocation] = useState(String);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const apiResponse = getWeatherByLocation(location);
        // api call response
        console.log(apiResponse);
    }
    return (
        <>
            <form
                onSubmit={(e) => { handleSubmit(e) }
                } >
                <label> Enter your location to get the weather forecast </label>
                < input
                    type="text"
                    name="userLoc"
                    id="userLoc"
                    required
                    onChange={e => setLocation(e.target.value)} />
                <button type="submit" >
                    Search
                </button>
            </form>
        </>

    )

}


