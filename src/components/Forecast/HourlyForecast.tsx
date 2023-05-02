import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import './HourlyForecast.scss';

interface HourlyForecastProps {
    day: {
        datetime: string;
        description: string;
        icon: string;
        sunrise: string;
        sunset: string;
        uvindex: number;
        hours: {
            datetime: string;
            temp: number;
            icon: string;
            feelslike: number;
            humidity: number;
            dew: number;
        }[];
    };
    numCols: number;
    currentHour: number;
    getIcon: (hourIcon: string) => string;
}


export const HourlyForecast: React.FunctionComponent<HourlyForecastProps> = ({
    day,
    numCols,
    currentHour,
    getIcon,
}) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    function handleScrollRight() {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 150;
        }
    }

    function handleScrollLeft() {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 150;
        }
    }

    return (
        <div>
            <b>{day.description}</b>
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
            <div className="scroll-buttons-container">
                <button className="scroll-button" onClick={handleScrollLeft}>
                    <FiChevronLeft />
                </button>
                <button className="scroll-button" onClick={handleScrollRight}>
                    <FiChevronRight />
                </button>
            </div>
            <div className="hour-container" ref={scrollRef}>
                <table className='hour-table' >
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
            </div>
        </div>)
};

