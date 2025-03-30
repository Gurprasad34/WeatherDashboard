import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public tempF: number,
    public iconDescription: string,
    public humidity: number,
    public windSpeed: number,
    public city: string,
    public date: string,
    public icon: string,
  ) {}
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org';
  private apiKey = process.env.API_KEY || '';
  private cityName: string = '';

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    console.log(url)
    const response = await fetch(url);
    return response.json();
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    console.log(locationData)
    return {
      latitude: locationData[0].lat,
      longitude: locationData[0].lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {
  //   return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  // }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    // console.log(url)
    const response = await fetch(url);
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    // console.log(response)
    return new Weather(
      response.list[0].main.temp,
      response.list[0].weather[0].description,
      response.list[0].main.humidity,
      response.list[0].wind.speed,
      this.cityName,
      response.list[0].dt_txt,
      response.list[0].weather[0].icon

    );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const weatherArray = []
for(let i=7; i<weatherData.length; i+=8) {
  console.log(weatherData[i])
  console.log("==============================")
  weatherArray.push(new Weather( weatherData[i].main.temp,
    weatherData[i].weather[0].description,
    weatherData[i].main.humidity,
    weatherData[i].wind.speed,
    this.cityName,
    weatherData[i].dt_txt,
    weatherData[i].weather[0].icon))

}
    return [currentWeather, ...weatherArray];
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
   
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeatherData = this.parseCurrentWeather(weatherData);
    const weatherArray = this.buildForecastArray(currentWeatherData, weatherData.list)
    return weatherArray
  }
}

export default new WeatherService();
