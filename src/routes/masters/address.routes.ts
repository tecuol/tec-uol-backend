import { Router } from 'express';
import AddressController from '../../controllers/masters/address.controller';
const AddressRouts = Router();

AddressRouts.post('/list', AddressController.getList);
AddressRouts.post('/dropdown', AddressController.dropdown);
AddressRouts.get('/', AddressController.get);
AddressRouts.post('/', AddressController.save);
AddressRouts.delete('/', AddressController.delete);

export default AddressRouts;