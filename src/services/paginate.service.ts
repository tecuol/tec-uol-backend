import { Sequelize } from "sequelize";

export const paginate = async (model?: any, pageSize?: any, pageLimit?: any, search: any = {}, order: any = [], transform?: any, options?: any, summary_options?: any) => {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageSize, 10) || 1;
        let table_summary = {}

        // create an options object
        options.offset = getOffset(page, limit);
        options.limit = limit;
        options.distinct = true

        // check if the search object is empty
        if (Object.keys(search).length) {
            options = { ...search, ...options };
        }

        // check if the order array is empty
        if (order && order.length) {
            options['order'] = order;
        }

        let attributes = []
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
        let { count, rows } = await model.findAndCountAll(options);

        // check if the transform is a function and is not null
        if (transform && typeof transform === 'function') {
            rows = await transform(rows);
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
        }
    } catch (error) {
        console.log(error);
    }
}

const getOffset = (page: number, limit: number) => {
    return (page * limit) - limit;
}

const getNextPage = (page: number, limit: number, total: number) => {
    if ((total / limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page: number) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}