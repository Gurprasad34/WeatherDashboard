import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // TODO: GET weather data from city name
    const { cityName } = req.body;
    // if (!cityName) {
    // return res.status(400).json({ error: 'City name is required' });
    // }
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // TODO: save city to search history
    await HistoryService.addCity(cityName);

    res.json(weatherData);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.json({ message: 'City removed from history' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;
