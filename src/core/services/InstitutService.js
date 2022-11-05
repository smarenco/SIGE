import { clearObj, open } from '../common/functions';
import Institut from '../models/Institut';
import api from "./Api";

const path = 'institut';

export const institutIndex = async (filter, output = undefined) => {
    let params = filter || {};
    params.page = filter?.page || 1;
    params.pageSize = filter?.pageSize || 50;

    if (output) {
        let exportFilter = { ...filter, output }
        clearObj(exportFilter);
        open(path, exportFilter);
        return;
    }

    const { response } = await api.get(path, { params });
    return {
        data: response.data.map(entity => new Institut(entity)),
        total: response.total,
    }
}

export const institutCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Institut(entity));
}

export const institutShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Institut(response);

}

export const institutCreate = async (item) => {
    return await api.post(path, item);
}

export const institutUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const institutDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}