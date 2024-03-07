"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default_sender_reciver_emails = exports.default_citie_list = exports.default_state_list = void 0;
// Array of state objects with name, ID, and code
const default_state_list = [
    { id: 1, name: 'Ladakh', code: 'LD' },
    { id: 2, name: 'Jammu and Kashmir', code: 'JK' },
    { id: 3, name: 'Punjab', code: 'PB' },
    { id: 4, name: 'Himachal Pradesh', code: 'HP' },
    { id: 5, name: 'Haryana', code: 'HR' },
    { id: 6, name: 'Delhi', code: 'DL' },
    { id: 7, name: 'Andhra Pradesh', code: 'AP' },
    { id: 8, name: 'Arunachal Pradesh', code: 'AR' },
    { id: 9, name: 'Assam', code: 'AS' },
    { id: 10, name: 'Bihar', code: 'BR' },
    { id: 11, name: 'Chhattisgarh', code: 'CG' },
    { id: 12, name: 'Goa', code: 'GA' },
    { id: 13, name: 'Gujarat', code: 'GJ' },
    { id: 14, name: 'Jharkhand', code: 'JH' },
    { id: 15, name: 'Karnataka', code: 'KA' },
    { id: 16, name: 'Kerala', code: 'KL' },
    { id: 17, name: 'Madhya Pradesh', code: 'MP' },
    { id: 18, name: 'Maharashtra', code: 'MH' },
    { id: 19, name: 'Manipur', code: 'MN' },
    { id: 20, name: 'Meghalaya', code: 'ML' },
    { id: 21, name: 'Mizoram', code: 'MZ' },
    { id: 22, name: 'Nagaland', code: 'NL' },
    { id: 23, name: 'Odisha', code: 'OD' },
    { id: 24, name: 'Rajasthan', code: 'RJ' },
    { id: 25, name: 'Sikkim', code: 'SK' },
    { id: 26, name: 'Tamil Nadu', code: 'TN' },
    { id: 27, name: 'Telangana', code: 'TG' },
    { id: 28, name: 'Tripura', code: 'TR' },
    { id: 29, name: 'Uttar Pradesh', code: 'UP' },
    { id: 30, name: 'Uttarakhand', code: 'UK' },
    { id: 31, name: 'West Bengal', code: 'WB' }
];
exports.default_state_list = default_state_list;
// Array of city objects with name, ID, state ID, and code
const default_citie_list = [
    { id: 1, name: 'Kargil', stateId: 1, code: 'KAR' },
    { id: 2, name: 'Leh', stateId: 1, code: 'LEH' },
    { id: 3, name: 'Diskit', stateId: 1, code: 'DIS' },
    { id: 4, name: 'Hunder', stateId: 1, code: 'HUN' },
    { id: 5, name: 'Alchi', stateId: 1, code: 'ALC' },
    { id: 6, name: 'Drass', stateId: 1, code: 'DRS' },
    { id: 7, name: 'Suru', stateId: 1, code: 'SUR' },
    { id: 8, name: 'Panikhar', stateId: 1, code: 'PNK' },
    { id: 9, name: 'Zanskar', stateId: 1, code: 'ZAN' },
    { id: 10, name: 'Rangdom', stateId: 1, code: 'RNG' },
    { id: 11, name: 'Srinagar', stateId: 2, code: 'SRN' },
    { id: 12, name: 'Jammu', stateId: 2, code: 'JMU' },
    { id: 13, name: 'Anantnag', stateId: 2, code: 'ATG' },
    { id: 14, name: 'Udhampur', stateId: 2, code: 'UDH' },
    { id: 15, name: 'Baramulla', stateId: 2, code: 'BRM' },
    { id: 16, name: 'Amritsar', stateId: 3, code: 'AMR' },
    { id: 17, name: 'Ludhiana', stateId: 3, code: 'LDH' },
    { id: 18, name: 'Jalandhar', stateId: 3, code: 'JLD' },
    { id: 19, name: 'Patiala', stateId: 3, code: 'PAT' },
    { id: 20, name: 'Bathinda', stateId: 3, code: 'BTH' },
    { id: 21, name: 'Pathankot', stateId: 3, code: 'PTK' },
    { id: 22, name: 'Delhi', stateId: 6, code: 'DEL' },
    { id: 23, name: 'Noida', stateId: 6, code: 'NDA' },
    { id: 24, name: 'Gurgaon', stateId: 6, code: 'GUR' },
    { id: 25, name: 'Faridabad', stateId: 6, code: 'FRD' },
    { id: 26, name: 'Ghaziabad', stateId: 6, code: 'GZB' } // Delhi
];
exports.default_citie_list = default_citie_list;
const default_sender_reciver_emails = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
};
exports.default_sender_reciver_emails = default_sender_reciver_emails;
