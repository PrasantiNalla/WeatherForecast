

export async function getWeatherByLocation(location: string): Promise<any> {

    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4QSEE87XEBY2CVC2FYUVTE3XT&contentType=json`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(await response.json());
    }
    else {
        return (await response.json());
    }
}