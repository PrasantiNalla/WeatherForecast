// call to weather api
export async function getWeatherByLocation(location: string): Promise<Response> {
    // location = "London";
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4QSEE87XEBY2CVC2FYUVTE3XT&contentType=json`);
    if (!response.ok) {
        throw new Error(await response.json());
    }
    else {
        return (await response.json());
    }
}