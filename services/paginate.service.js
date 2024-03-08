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
exports.paginate = void 0;
const paginate = (model, pageSize, pageLimit, search = {}, order = [], transform, options, summary_options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageSize, 10) || 1;
        let table_summary = {};
        // create an options object
        options.offset = getOffset(page, limit);
        options.limit = limit;
        options.distinct = true;
        // check if the search object is empty
        if (Object.keys(search).length) {
            options = Object.assign(Object.assign({}, search), options);
        }
        // check if the order array is empty
        if (order && order.length) {
            options['order'] = order;
        }
        let attributes = [];
        // if (summary_options && summary_options?.summary_attributes) {
        //     let local_options = { ...options }
        //     if (!summary_options?.custom_summary) {
        //         local_options.where = {}
        //         delete local_options.where
        //         delete local_options.offset
        //         delete local_options.limit
        //     } else {
        //         local_options.where = summary_options?.where ? summary_options?.where : local_options.where
        //     }
        //     delete local_options.group
        //     delete local_options.order
        //     for (let index = 0; index < summary_options?.summary_attributes.length; index++) {
        //         const column = summary_options?.summary_attributes[index];
        //         attributes.push(
        //             [Sequelize.literal(`sum(${column})`), column + '_sum']
        //         )
        //     }
        //     local_options = {
        //         ...local_options,
        //         attributes: attributes,
        //     }
        //     console.log({ local_options })
        //     table_summary = await model.findOne({
        //         ...local_options, subQuery: false,
        //     })
        //     delete summary_options.summary_attributes
        // }
        // take in the model, take in the options
        let { count, rows } = yield model.findAndCountAll(options);
        // check if the transform is a function and is not null
        if (transform && typeof transform === 'function') {
            rows = yield transform(rows);
        }
        if (Array.isArray(count)) {
            count = count.length;
        }
        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows,
            table_summary: table_summary
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.paginate = paginate;
const getOffset = (page, limit) => {
    return (page * limit) - limit;
};
const getNextPage = (page, limit, total) => {
    if ((total / limit) > page) {
        return page + 1;
    }
    return null;
};
const getPreviousPage = (page) => {
    if (page <= 1) {
        return null;
    }
    return page - 1;
};
