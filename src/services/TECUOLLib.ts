import { Op, Sequelize, Transaction, UniqueConstraintError, ValidationError } from 'sequelize';
import { globalConstant } from '../utils/enum';
import { logError } from './logging.service';
import { paginate } from './paginate.service';

interface CreateOrUpdateRequest {
    data: any;
    tran?: Transaction;
    model: any;
    returnData?: boolean;
    include?: any[]
    req?: any
    parentId?: any
    parentKey?: string
    idKey?: string
}

export interface CreateOrUpdateResponse {
    data?: any;
    status: number;
    error?: any;
    message?: string;
}

export interface GetOptions {
    req: any,
    res?: any,
    model: any,
    include?: any
    getKey: any

}

const createOrUpdate = async (req: CreateOrUpdateRequest): Promise<CreateOrUpdateResponse> => {
    const { data, tran, model, returnData, parentKey, parentId, } = req;
    let results: any[];
    try {
        if (Array.isArray(data)) {
            if (!data.length) {
                return { message: 'No data provided for create or update', status: 0 };
            }

            for (let item of data) {
                item = {
                    ...item,
                    [parentKey]: parentId
                }
                await createOrUpdateOne(item, model, tran, req);
            }

            if (returnData && parentKey && parentId) {
                const fetchedData = await model.findAll({ where: { [parentKey]: parentId, include: req.include } });
                results = fetchedData;
            }
        } else {
            results = await createOrUpdateOne(data, model, tran, req);
            if (returnData) {
                results = await model.findByPk(data?.id, { include: req.include });
            }
        }
        return { data: results, status: 1, message: successResponse(data) };
    } catch (error) {
        logError(error, req?.req)
        return errorResponse(error);
    }
};

const createOrUpdateOne = async (item: any, model: any, tran?: Transaction, req?: CreateOrUpdateRequest): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let idKey = 'id'
        if (req?.idKey)
            idKey = req?.idKey;
        try {
            console.log(item?.url, item?.id)
            if (item[idKey]) {
                await model.update(item, { where: { [idKey]: item[idKey] }, transaction: tran });
                resolve(item)
            } else {
                let data = await model.create(item, { transaction: tran });
                item[idKey] = data[idKey];
                resolve(item)
            }
        } catch (error) {
            reject(error)
        }
    })
};


const errorResponse = (error: any): CreateOrUpdateResponse => {
    try {
        if (error instanceof UniqueConstraintError) {
            return {
                message: 'Unique constraint violation: ' + error.errors.map((err: any) => err.message),
                error: error.message,
                status: 0,

            };
        } else if (error instanceof ValidationError) {
            const validationErrors = error.errors.map((err: any) => err.message);
            return {
                message: 'Validation errors: ' + validationErrors.join(', '),
                error: error,
                status: 0,
            };
        } else {
            return {
                message: error?.message || error,
                error: error,
                status: 0,
            };
        }
    } catch (error) {
        console.error('Error creating error response:', error);
        return {
            message: 'Internal server error',
            error: 'Failed to create error response',
            status: 0,
        };
    }
};


const successResponse = (data?: any): string => {
    let message = '';
    if (!data) {
        message = globalConstant.success_delete_message;
    }
    else if (data?.id) {
        message = globalConstant.success_update_message;
    } else {
        message = globalConstant.success_create_message;
    }
    return message;
};

const deleteParmanently = async (req: CreateOrUpdateRequest): Promise<CreateOrUpdateResponse> => {
    const { data, tran, model } = req;
    try {
        await model.destroy({ where: { id: data.id }, transaction: tran });
        return { status: 1, message: successResponse() };
    } catch (error) {
        if (tran) {
            await tran.rollback()
        }
        logError(error, req?.req)
        return errorResponse(error);
    }

}


//Get Data Ulits
const getDataList = async (req: any, res: any, model: any, search_items: any = [], include: any = {}, returnResult: boolean = false, transform?: Function, customOrder: any = null) => {
    try {
        let {
            q,
            page,
            limit,
            order_by,
            order_direction,
            exclude_,
            search_by,
            search
        } = req.body;
        let filter = req.body
        let order = [];
        let opAnd = []
        let opOr = []

        let options: any = {}
        let isGroup: boolean = true
        let groupOption: any = {

        }
        if (q) {
            for (let index = 0; index < search_items?.length; index++) {
                const element = search_items[index];
                let accessKey = element
                if (element.includes('.')) {
                    accessKey = `$${element}$`
                }
                opOr.push({
                    [accessKey]: {
                        [Op.like]: `%${q}%`
                    }
                })
            }
            opAnd.push({
                [Op.or]: opOr
            })
        }

        if (search_by) {
            opAnd.push({
                [search_by.includes('.') ? `$${search_by}$` : search_by]: {
                    [Op.like]: `%${search}%`
                }
            })
        }

        for (let key in exclude_) {
            if (exclude_.hasOwnProperty(key) && exclude_[key].length != 0) {
                let accessKey = key
                if (key.includes('.')) {
                    accessKey = `$${key}$`
                }
                opAnd.push({
                    [accessKey]: {
                        [Op.notIn]: exclude_[key]
                    }
                })
            }
        }


        // add the order parameters to the order
        if (customOrder) {
            order.push(Sequelize.literal(customOrder))
        } else {
            if (order_by && order_direction) {
                if (order_by.includes('.')) {
                    order.push(Sequelize.literal(`${order_by + ' ' + order_direction}`));
                } else {
                    order.push([order_by, order_direction]);
                }
            }
        }

        if (include) {
            options = include['where'] ? include['where'] : {}
            isGroup = include['apply_group'] == false ? false : true;
        }

        //Remove Groupby if not nested include 
        if (isGroup) {
            groupOption['group'] = ['id']
        }

        for (const key in filter) {
            if (filter.hasOwnProperty(key) && checkparams(key)) {
                if (filter[key]) {
                    let accessKey = key
                    if (key.includes('.')) {
                        accessKey = `$${key}$`
                    }
                    if ((Array.isArray(filter[key]) == false && filter[key]) || (Array.isArray(filter[key]) == true && filter[key].length != 0)) {
                        opAnd.push({
                            [accessKey]: filter[key]
                        })
                    }
                }
            }
        }

        options[Op.and] = opAnd
        const result: any = await paginate(model, page, limit, {}, order, transform, {
            ...include,
            subQuery: false,
            ...groupOption,
            where: {
                ...options
            },
        }, req.body?.summary_options);

        if (returnResult) {
            return result?.rows
        } else {
            res.send({
                status: 1,
                ...result
            });
        }
    } catch (e: any) {
        logError(e, req?.req)
        res.send({
            status: -1,
            message: e?.message ? e.message : e,
            error: e
        })
    }
}

const getData = async (options: any) => {
    const { model, include, req, res, getKey } = options
    const key = getKey || 'id'
    let where: any
    //check if request is GET or POST
    if (req.method == 'GET' && req?.query[key]) {
        where = {
            [key]: req?.query[key]
        }
    } else if (req.body) {
        where = {
            ...req.body
        }
    } else {
        res.send({
            status: 0,
            message: 'No data found'
        })
        return 0;
    }
    try {
        const response = await model?.findOne({ where: { ...where }, include: include })
        res.send({
            status: 1,
            data: response
        })
    } catch (e) {
        logError(e, req?.req)
        res.send(errorResponse(e))
    }
}

const checkparams = (key: any) => {
    if (key == 'q') {
        return false
    } else if (key == 'order_by') {
        return false
    } else if (key == 'order_direction') {
        return false
    } else if (key == 'limit') {
        return false
    } else if (key == 'page') {
        return false
    }
    else if (key == 'exclude_') {
        return false
    }
    else if (key == 'search_by') {
        return false
    }
    else if (key == 'search') {
        return false
    }
    else if (key == 'summary_options') {
        return false
    }
    return true
}

const getGroupFilterData = async (req: any, res: any, model: any, include: any = {}) => {
    try {
        const {
            q,
            page,
            limit,
            order_by,
            order_direction,
            key
        } = req.query
        let order: any = [];
        let options: any = {}
        let opOr: any = []
        order.push([order_by, order_direction]);
        if (q) {
            let accessKey = key
            if (key.includes('.')) {
                accessKey = `$${key}$`
            }
            opOr.push({
                [accessKey]: {
                    [Op.like]: `%${q}%`
                }
            })
        }
        if (opOr.length != 0) {
            options[Op.or] = opOr
        }
        const result = await paginate(model, parseInt(page), parseInt(limit), {}, null, null, {
            ...include,
            attributes: [key],
            subQuery: false,
            group: [key],
            where: {
                ...options
            },
        });

        res.send({
            status: 1,
            ...result
        });
    } catch (e: any) {
        logError(e, req?.req)
        res.send({
            status: -1,
            message: e?.message ? e.message : e,
            error: e
        })
    }
}

export interface DropdownListOptions {
    req: any,
    res: any,
    model: any,
    include?: any,
    table_name?: string,
    search_by?: string,
    search_items?: any[],
    order_list?: any[]
}
const dropdownList = async (options: DropdownListOptions) => {
    let { req, res, model, include, table_name, search_by, search_items, order_list } = options
    if (!table_name) {
        table_name = model?.name
    }
    if (search_items?.length && !search_by) {
        search_by = search_items[0]
    }
    console.log({ table_name, search_by })
    try {
        let {
            q,
            page,
            limit,
            order_by,
            order_direction,
            parentIdValue,
            parentId,
            selectedId,
            selectedIdKey,
            otherParentIdValue,
            otherParentId
        } = req.body;
        if (selectedId)
            selectedId = selectedId.split(',')

        let search = {
        };
        let order = [];
        let opAnd = []
        let opOr = []
        let lastIndex = 0

        if (parentIdValue) {
            opAnd.push({
                [parentIdValue]: parentId || null
            })
        }

        if (otherParentIdValue) {
            opAnd.push({
                [otherParentIdValue]: otherParentId || null
            })
        }

        let options: any = {}

        if (q) {
            if (selectedId) {
                if (selectedId['length'] == 0) return
                let sqlQuery = ''
                for (let index = 0; index < selectedId.length; index++) {
                    const element = selectedId[index];
                    if (index == 0) {
                        sqlQuery = `CASE WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`
                    } else {
                        sqlQuery += ` WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`
                    }
                    lastIndex = index + 1
                }
                sqlQuery += ` WHEN ${table_name}.${search_by} = '${q}' THEN ${lastIndex} WHEN ${table_name}.${search_by} like '${q}%' THEN ${lastIndex + 1} ELSE ${lastIndex + 2} END`
                order.push(Sequelize.literal(sqlQuery))
                lastIndex + 2
            } else {
                let sqlQuery = `CASE WHEN ${table_name}.${search_by} = '${q}' THEN ${0} WHEN ${table_name}.${search_by} like '${q}%' THEN ${1} ELSE ${2} END`
                order.push(Sequelize.literal(sqlQuery))
                lastIndex + 2
            }
            for (let index = 0; index < search_items?.length; index++) {
                const element = search_items[index];
                opOr.push({
                    [element]: {
                        [Op.like]: `%${q}%`
                    }
                })
            }
            opAnd.push({
                [Op.or]: opOr
            })
        } else {
            if (selectedId) {
                if (selectedId['length'] == 0) return
                let sqlQuery = ''
                for (let index = 0; index < selectedId.length; index++) {
                    const element = selectedId[index];
                    if (index == 0) {
                        sqlQuery = `CASE WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`
                    } else {
                        sqlQuery += ` WHEN ${table_name}.${selectedIdKey} = '${element}' THEN ${index}`
                    }
                    lastIndex = index + 1
                }
                sqlQuery += ` ELSE ${lastIndex} END`
                order.push(Sequelize.literal(sqlQuery))
            }
        }

        if (order_list?.length) {
            let sqlQuery = ''
            for (let index = 0; index < order_list?.length; index++) {
                const element = order_list[index];
                if (index == 0) {
                    sqlQuery = `CASE WHEN  ${table_name}.id = '${element}' THEN ${lastIndex}`
                } else {
                    sqlQuery += ` WHEN ${table_name}.id = '${element}' THEN ${lastIndex}`
                }
                lastIndex = lastIndex + 1
            }
            sqlQuery += ` ELSE ${lastIndex} END`
            order.push(Sequelize.literal(sqlQuery))
        }

        // add the order parameters to the order
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }
        if (include) {
            options = include['where'] ? include['where'] : {}
        }
        if (options[Op.and]) {
            options[Op.and] = options[Op.and].concat(opAnd)
        } else {
            options[Op.and] = opAnd
        }

        let result = await paginate(model, page, limit, search, order, null, {
            ...include,
            where: {
                ...options
            }
        });

        res.send({
            status: 1,
            ...result
        });

    } catch (err) {
        logError(err, req?.req);
        res.send({
            status: 0,
            message: 'cannot fetch'
        });
    }
}


const mapIds = (data: Record<string, any>): Record<string, any> => {
    const processObject = (obj: Record<string, any>): Record<string, any> => {
        const newObj: Record<string, any> = { ...obj };
        for (const key in newObj) {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                const value = newObj[key];
                if (Array.isArray(value)) {
                    if (key.endsWith('Ids')) {
                        newObj[key] = value.map((subItem: any) => subItem.id).join(',');
                    } else {
                        newObj[key] = value.map((subItem: any) => {
                            return processObject(subItem);
                        });
                    }
                } else if (value && typeof value === 'object') {
                    newObj[key + 'Id'] = value.id || null;
                }
            }
        }
        return newObj;
    };

    return processObject({ ...data });
};

const saveIfNotExist = async (options: GetOptions) => {
    return new Promise(async (resolve, reject) => {
        const { model, req, getKey } = options
        try {
            const data = req.body[getKey]
            if (data?.id && data?.id == 'nf') {
                delete data?.id;
                let response = await model.create(data)
                if (response?.id) {
                    req.body[getKey + 'Id'] = response?.id
                } else {
                    req.body[getKey] = null
                }
            } else if (data?.id) {
                req.body[getKey + 'Id'] = data?.id
            }
            resolve(req.body)
        } catch (e) {
            logError(e, req?.req)
            reject(errorResponse(e))
        }
    })
}

function getCurrentDateTimeIST() {
    const options: any = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
    const currentDateTime = new Date().toLocaleString(undefined, options);
    return currentDateTime.replace(',', ''); // Removing comma after date
}

function convertToURL(title: string) {
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

export { createOrUpdate, deleteParmanently, getDataList, getGroupFilterData, getData, dropdownList, saveIfNotExist, mapIds, getCurrentDateTimeIST, convertToURL };
