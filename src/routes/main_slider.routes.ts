import { Router } from 'express';
import MainSliderController from '../controllers/main_slider.controller'
const MainSliderRouts = Router();

MainSliderRouts.get('/list', MainSliderController.getList);
MainSliderRouts.post('/list', MainSliderController.getList);
// MainSliderRouts.get('/', MainSliderController.get);
MainSliderRouts.post('/', MainSliderController.save);
MainSliderRouts.post('/order', MainSliderController.changeOrderOfSliders);
MainSliderRouts.delete('/', MainSliderController.delete);

export default MainSliderRouts;    