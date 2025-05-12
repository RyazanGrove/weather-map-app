import { render, screen } from '@testing-library/react';
import ForecastDisplay from './ForecastDisplay';

test('should show \'Now\' for current forecast', ()=>{
    render(<ForecastDisplay temperature={10.4} weatherCode={2} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/Now/i)).toBeInTheDocument();
})

test('should show time if forecast is not current', ()=>{
    render(<ForecastDisplay temperature={10.4} weatherCode={2} current={false} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/18:00/i)).toBeInTheDocument();
})

test('should show correct temperature in different formats', ()=>{
    // Celsius
    render(<ForecastDisplay temperature={10.4} weatherCode={2} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/10.4/i)).toBeInTheDocument();

    // Fahrenheit
    render(<ForecastDisplay temperature={10.4} weatherCode={2} current={true} time={"1995-12-17T18:00:00"} unit={"F"}></ForecastDisplay>)
    expect(screen.getByText(/50.7/i)).toBeInTheDocument();
})

test('should handle weather code correctly', ()=>{
    // Clear
    render(<ForecastDisplay temperature={10.4} weatherCode={0} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/☀️/i)).toBeInTheDocument();

    // Cloudy
    render(<ForecastDisplay temperature={10.4} weatherCode={3} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/☁️/i)).toBeInTheDocument();

    // Rain
    render(<ForecastDisplay temperature={10.4} weatherCode={65} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/🌧️/i)).toBeInTheDocument();
    
    // Snow
    render(<ForecastDisplay temperature={10.4} weatherCode={77} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/❄️/i)).toBeInTheDocument();

    // Unknown
    render(<ForecastDisplay temperature={10.4} weatherCode={100} current={true} time={"1995-12-17T18:00:00"} unit={"C"}></ForecastDisplay>)
    expect(screen.getByText(/❓/i)).toBeInTheDocument();
})