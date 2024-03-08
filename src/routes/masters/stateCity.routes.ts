import { Router } from 'express';
import countryStateCityController from '../../controllers/countryStateCity.controller';
const StateCityRouts = Router();

StateCityRouts.post('/state_dropdown', countryStateCityController.stateDropdown);
StateCityRouts.post('/city_dropdown', countryStateCityController.cityDropdown);

export default StateCityRouts;