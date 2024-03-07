"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToURL = exports.getCurrentDateTimeIST = exports.mapIds = exports.saveIfNotExist = exports.dropdownList = exports.getData = exports.getGroupFilterData = exports.getDataList = exports.deleteParmanently = exports.createOrUpdate = void 0;
const sequelize_1 = require("sequelize");
const enum_1 = require("../utils/enum");
const logging_service_1 = require("./logging.service");
const paginate_service_1 = require("./paginate.service");
const createOrUpdate = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, tran, model, returnData, parentKey, parentId, } = req;
    let results;
    try {
        if (Array.isArray(data)) {
            if (!data.length) {
                return { message: 'No data provided for create or update', status: 0 };
            }
            for (let item of data) {
                item = Object.assign(Object.assign({}, item), { [parentKey]: parentId });
                yield createOrUpdateOne(item, model, tran, req);
            }
            if (returnData && parentKey && parentId) {
                const fetchedData = yield model.findAll({ where: { [parentKey]: parentId, include: req.include } });
                results = fetchedData;
            }
        }
        else {
            results = yield createOrUpdateOne(data, model, tran, req);
            if (returnData) {
                results = yield model.findByPk(data === null || data === void 0 ? void 0 : data.id, { include: req.include });
            }
        }
        return { data: results, status: 1, message: successResponse(data) };
    }
    catch (error) {
        (0, logging_service_1.logError)(error, req === null || req === void 0 ? void 0 : req.req);
        return errorResponse(error);
    }
});
exports.createOrUpdate = createOrUpdate;
const createOrUpdateOne = (item, model, tran, req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let idKey = 'id';
        if (req === null || req === void 0 ? void 0 : req.idKey)
            idKey = req === null || req === void 0 ? void 0 : req.idKey;
        try {
            console.log(item === null || item === void 0 ? void 0 : item.url, item === null || item === void 0 ? void 0 : item.id);
            if (item[idKey]) {
                yield model.update(item, { where: { [idKey]: item[idKey] }, transaction: tran });
                resolve(item);
            }
            else {
                let data = yield model.create(item, { transaction: tran });
                item[idKey] = data[idKey];
                resolve(item);
            }
        }
        catch (error) {
            reject(error);
        }
    }));
});
const errorResponse = (error) => {
    try {
        if (error instanceof sequelize_1.UniqueConstraintError) {
            return {
                message: 'Unique constraint violation: ' + error.errors.map((err) => err.message),
                error: error.message,
                status: 0,
            };
        }
        else if (error instanceof sequelize_1.ValidationError) {
            const validationErrors = error.errors.map((err) => err.message);
            return {
                message: 'Validation errors: ' + validationErrors.join(', '),
                error: error,
                status: 0,
            };
        }
        else {
            return {
                message: (error === null || error === void 0 ? void 0 : error.message) || error,
                error: error,
                status: 0,
            };
        }
    }
    catch (error) {
        console.error('Error creating error response:', error);
        return {
            message: 'Internal server error',
            error: 'Failed to create error response',
            status: 0,
        };
    }
};
const successResponse = (data) => {
    let message = '';
    if (!data) {
        message = enum_1.globalConstant.success_delete_message;
    }
    else if (data === null || data === void 0 ? void 0 : data.id) {
        message = enum_1.globalConstant.success_update_message;
    }
    else {
        message = enum_1.globalConstant.success_create_message;
    }
    return message;
};
const deleteParmanently = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, tran, model } = req;
    try {
        yield model.destroy({ where: { id: data.id }, transaction: tran });
        return { status: 1, message: successResponse() };
    }
    catch (error) {
        if (tran) {
            yield tran.rollback();
        }
        (0, logging_service_1.logError)(error, req === null || req === void 0 ? void 0 : req.req);
        return errorResponse(error);
    }
});
exports.deleteParmanently = deleteParmanently;
//Get Data Ulits
const getDataList = (req, res, model, search_items = [], include = {}, returnResult = false, transform, customOrder = null) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { q, page, limit, order_by, order_direction, exclude_, search_by, search } = req.body;
        let filter = req.body;
        let order = [];
        let opAnd = [];
        let opOr = [];
        let options = {};
        let isGroup = true;
        let groupOption = {};
        if (q) {
            for (let index = 0; index < (search_items === null || search_items === void 0 ? void 0 : search_items.length); index++) {
                const element = search_items[index];
                let accessKey = element;
                if (element.includes('.')) {
                    accessKey = `$${element}$`;
                }
                opOr.push({
                    [accessKey]: {
                        [sequelize_1.Op.like]: `%${q}%`
                    }
                });
            }
            opAnd.push({
                [sequelize_1.Op.or]: opOr
            });
        }
        if (search_by) {
            opAnd.push({
                [search_by.includes('.') ? `$${search_by}$` : search_by]: {
                    [sequelize_1.Op.like]: `%${search}%`
                }
            });
        }
        for (let key in exclude_) {
            if (exclude_.hasOwnProperty(key) && exclude_[key].length != 0) {
                let accessKey = key;
                if (key.includes('.')) {
                    accessKey = `$${key}$`;
                }
                opAnd.push({
                    [accessKey]: {
                        [sequelize_1.Op.notIn]: exclude_[key]
                    }
                });
            }
        }
        // add the order parameters to the order
        if (customOrder) {
            order.push(sequelize_1.Sequelize.literal(customOrder));
        }
        else {
            if (order_by && order_direction) {
                if (order_by.includes('.')) {
                    order.push(sequelize_1.Sequelize.literal(`${order_by + ' ' + order_direction}`));
                }
                else {
                    order.push([order_by, order_direction]);
                }
            }
        }
        if (include) {
            options = include['where'] ? include['where'] : {};
            isGroup = include['apply_group'] == false ? false : true;
        }
        //Remove Groupby if not nested include 
        if (isGroup) {
            groupOption['group'] = ['id'];
        }
        for (const key in filter) {
            if (filter.hasOwnProperty(key) && checkparams(key)) {
                if (filter[key]) {
                    let accessKey = key;
                    if (key.includes('.')) {
                        accessKey = `$${key}$`;
                    }
                    if ((Array.isArray(filter[key]) == false && filter[key]) || (Array.isArray(filter[key]) == true && filter[key].length != 0)) {
                        opAnd.push({
                            [accessKey]: filter[key]
                        });
                    }
                }
            }
        }
        options[sequelize_1.Op.and] = opAnd;
        const result = yield (0, paginate_service_1.paginate)(model, page, limit, {}, order, transform, Object.assign(Object.assign(Object.assign(Object.assign({}, include), { subQuery: false }), groupOption), { where: Object.assign({}, options) }), (_a = req.body) === null || _a === void 0 ? void 0 : _a.summary_options);
        if (returnResult) {
            return result === null || result === void 0 ? void 0 : result.rows;
        }
        else {
            res.send(Object.assign({ status: 1 }, result));
        }
    }
    catch (e) {
        (0, logging_service_1.logError)(e, req === null || req === void 0 ? void 0 : req.req);
        res.send({
            status: -1,
            message: (e === null || e === void 0 ? void 0 : e.message) ? e.message : e,
            error: e
        });
    }
});
exports.getDataList = getDataList;
const getData = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { model, include, req, res, getKey } = options;
    const key = getKey || 'id';
    let where;
    //check if request is GET or POST
    if (req.method == 'GET' && (req === null || req === void 0 ? void 0 : req.query[key])) {
        where = {
            [key]: req === null || req === void 0 ? void 0 : req.query[key]
        };
    }
    else if (req.body) {
        where = Object.assign({}, req.body);
    }
    else {
        res.send({
            status: 0,
            message: 'No data found'
        });
        return 0;
    }
    try {
        const response = yield (model === null || model === void 0 ? void 0 : model.findOne({ where: Object.assign({}, where), include: include }));
        res.send({
            status: 1,
            data: response
        });
    }
    catch (e) {
        (0, logging_service_1.logError)(e, req === null || req === void 0 ? void 0 : req.req);
        res.send(errorResponse(e));
    }
});
exports.getData = getData;
const checkparams = (key) => {
    if (key == 'q') {
        return false;
    }
    else if (key == 'order_by') {
        return false;
    }
    else if (key == 'order_direction') {
        return false;
    }
    else if (key == 'limit') {
        return false;
    }
    else if (key == 'page') {
        return false;
    }
    else if (key == 'exclude_') {
        return false;
    }
    else if (key == 'search_by') {
        return false;
    }
    else if (key == 'search') {
        return false;
    }
    else if (key == 'summary_options') {
        return false;
    }
    return true;
};
const getGroupFilterData = (req, res, model, include = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, page, limit, order_by, order_direction, key } = req.query;
        let order = [];
        let options = {};
        let opOr = [];
        order.push([order_by, order_direction]);
        if (q) {
            let accessKey = key;
            if (key.includes('.')) {
                accessKey = `$${key}$`;
            }
            opOr.push({
                [accessKey]: {
                    [sequelize_1.Op.like]: `%${q}%`
                }
            });
        }
        if (opOr.length != 0) {
            options[sequelize_1.Op.or] = opOr;
        }
        const result = yield (0, paginate_service_1.paginate)(model, parseInt(page), parseInt(limit), {}, null, null, Object.assign(Object.assign({}, include), { attributes: [key], subQuery: false, group: [key], where: Object.assign({}, options) }));
        res.send(Object.assign({ status: 1 }, result));
    }
    catch (e) {
        (0, logging_service_1.logError)(e, req === null || req === void 0 ? void 0 : req.req);
        res.send({
            status: -1,
            message: (e === null || e === void 0 ? void 0 : e.message) ? e.message : e,
            error: e
        });
    }
});
exports.getGroupFilterData = getGroupFilterData;
const dropdownList = (options) => __awaiter(void 0, void 0, void 0, function* () {
    let { req, res, model, include, table_name, search_by, search_items, order_list } = options;
    if (!table_name) {
        table_name = model === null || model === void 0 ? void 0 : model.name;
    }
    if ((search_items === null || search_items === void 0 ? void 0 : search_items.length) && !search_by) {
        search_by = search_items[0];
    }
    console.log({ table_name, search_by });
    try {
        let { q, page, limit, order_by, order_direction, parentIdValue, parentId, selectedId, selectedIdKey, otherParentIdValue, otherParentId } = req.body;
        if (selectedId)
            selectedId = selectedId.split(',');
        let search = {};
        let order = [];
        let opAnd = [];
        let opOr = [];
        let lastIndex = 0;
        if (parentIdValue) {
            opAnd.push({
                [parentIdValue]: parentId || null
            });
        }
        if (otherParentIdValue) {
            opAnd.push({
                [otherParentIdValue]: otherParentId || null
            });
        }
        let options = {};
        if (q) {
            if (selectedId) {
                if (selectedId['length'] == 0)
                    return;
                let sqlQuery = '';
                for (let index = 0; index < selectedId.length; index++) {
                    const element = selectedId[index];
                    if (index == 0) {
                        sqlQuery = `CASE WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`;
                    }
                    else {
                        sqlQuery += ` WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`;
                    }
                    lastIndex = index + 1;
                }
                sqlQuery += ` WHEN ${table_name}.${search_by} = '${q}' THEN ${lastIndex} WHEN ${table_name}.${search_by} like '${q}%' THEN ${lastIndex + 1} ELSE ${lastIndex + 2} END`;
                order.push(sequelize_1.Sequelize.literal(sqlQuery));
                lastIndex + 2;
            }
            else {
                let sqlQuery = `CASE WHEN ${table_name}.${search_by} = '${q}' THEN ${0} WHEN ${table_name}.${search_by} like '${q}%' THEN ${1} ELSE ${2} END`;
                order.push(sequelize_1.Sequelize.literal(sqlQuery));
                lastIndex + 2;
            }
            for (let index = 0; index < (search_items === null || search_items === void 0 ? void 0 : search_items.length); index++) {
                const element = search_items[index];
                opOr.push({
                    [element]: {
                        [sequelize_1.Op.like]: `%${q}%`
                    }
                });
            }
            opAnd.push({
                [sequelize_1.Op.or]: opOr
            });
        }
        else {
            if (selectedId) {
                if (selectedId['length'] == 0)
                    return;
                let sqlQuery = '';
                for (let index = 0; index < selectedId.length; index++) {
                    const element = selectedId[index];
                    if (index == 0) {
                        sqlQuery = `CASE WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`;
                    }
                    else {
                        sqlQuery += ` WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`;
                    }
                    lastIndex = index + 1;
                }
                sqlQuery += ` ELSE ${lastIndex} END`;
                order.push(sequelize_1.Sequelize.literal(sqlQuery));
            }
        }
        if (order_list === null || order_list === void 0 ? void 0 : order_list.length) {
            let sqlQuery = '';
            for (let index = 0; index < (order_list === null || order_list === void 0 ? void 0 : order_list.length); index++) {
                const element = order_list[index];
                if (index == 0) {
                    sqlQuery = `CASE WHEN  ${table_name}.id = '${element}' THEN ${lastIndex}`;
                }
                else {
                    sqlQuery += ` WHEN ${table_name}.id = '${element}' THEN ${lastIndex}`;
                }
                lastIndex = lastIndex + 1;
            }
            sqlQuery += ` ELSE ${lastIndex} END`;
            order.push(sequelize_1.Sequelize.literal(sqlQuery));
        }
        // add the order parameters to the order
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }
        if (include) {
            options = include['where'] ? include['where'] : {};
        }
        if (options[sequelize_1.Op.and]) {
            options[sequelize_1.Op.and] = options[sequelize_1.Op.and].concat(opAnd);
        }
        else {
            options[sequelize_1.Op.and] = opAnd;
        }
        let result = yield (0, paginate_service_1.paginate)(model, page, limit, search, order, null, Object.assign(Object.assign({}, include), { where: Object.assign({}, options) }));
        res.send(Object.assign({ status: 1 }, result));
    }
    catch (err) {
        (0, logging_service_1.logError)(err, req === null || req === void 0 ? void 0 : req.req);
        res.send({
            status: 0,
            message: 'cannot fetch'
        });
    }
});
exports.dropdownList = dropdownList;
const mapIds = (data) => {
    const processObject = (obj) => {
        const newObj = Object.assign({}, obj);
        for (const key in newObj) {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                const value = newObj[key];
                if (Array.isArray(value)) {
                    if (key.endsWith('Ids')) {
                        newObj[key] = value.map((subItem) => subItem.id).join(',');
                    }
                    else {
                        newObj[key] = value.map((subItem) => {
                            return processObject(subItem);
                        });
                    }
                }
                else if (value && typeof value === 'object') {
                    newObj[key + 'Id'] = value.id || null;
                }
            }
        }
        return newObj;
    };
    return processObject(Object.assign({}, data));
};
exports.mapIds = mapIds;
const saveIfNotExist = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { model, req, getKey } = options;
        try {
            const data = req.body[getKey];
            if ((data === null || data === void 0 ? void 0 : data.id) && (data === null || data === void 0 ? void 0 : data.id) == 'nf') {
                data === null || data === void 0 ? true : delete data.id;
                let response = yield model.create(data);
                if (response === null || response === void 0 ? void 0 : response.id) {
                    req.body[getKey + 'Id'] = response === null || response === void 0 ? void 0 : response.id;
                }
                else {
                    req.body[getKey] = null;
                }
            }
            else if (data === null || data === void 0 ? void 0 : data.id) {
                req.body[getKey + 'Id'] = data === null || data === void 0 ? void 0 : data.id;
            }
            resolve(req.body);
        }
        catch (e) {
            (0, logging_service_1.logError)(e, req === null || req === void 0 ? void 0 : req.req);
            reject(errorResponse(e));
        }
    }));
});
exports.saveIfNotExist = saveIfNotExist;
function getCurrentDateTimeIST() {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
    const currentDateTime = new Date().toLocaleString(undefined, options);
    return currentDateTime.replace(',', ''); // Removing comma after date
}
exports.getCurrentDateTimeIST = getCurrentDateTimeIST;
function convertToURL(title) {
    // Remove special characters, punctuation, and spaces except for hyphens and whitespace
    let cleanedText = title.replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove multiple hyphens
        .trim(); // Trim leading/trailing whitespace and hyphens
    // Convert to lowercase
    cleanedText = cleanedText.toLowerCase();
    // Get current date in the format "DD-MMM-YYYY"
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '-').replace(',', '').toLowerCase(); // Convert spaces to hyphens and make lowercase
    // Append current date to the cleaned text
    const url = `${cleanedText}`;
    return url;
}
exports.convertToURL = convertToURL;
