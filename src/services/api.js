const API_KEY = '13f81ca514a4bba4276e16e8b7d6dbeb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
    if (API_KEY === 'YOUR_API_KEY') {
        console.warn('Using mock data. Please provide a valid API Key.');
        return getMockData(city);
    }

    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Fetch forecast
        const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastData = await forecastResponse.json();

        return { current: data, forecast: forecastData };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getMockData = (city) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                current: {
                    name: city || 'London',
                    main: { temp: 22, humidity: 60, pressure: 1013 },
                    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
                    wind: { speed: 5.2 },
                    sys: { country: 'GB', sunrise: 1625285000, sunset: 1625345000 },
                    dt: Date.now() / 1000,
                },
                forecast: {
                    list: Array(5).fill(0).map((_, i) => ({
                        dt: Date.now() / 1000 + (i + 1) * 86400,
                        main: { temp: 20 + i, temp_min: 18 + i, temp_max: 24 + i },
                        weather: [{ main: 'Clouds', icon: '03d' }],
                    }))
                }
            });
        }, 500);
    });
};
