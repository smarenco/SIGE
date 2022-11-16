import { clearObj, open } from '../common/functions';
import Institute from '../models/Institute';
import api from "./Api";

const path = 'institute';

export const instituteIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Institute(entity)),
        total: response.total,
    }
}

export const instituteCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Institute(entity));
}

export const instituteShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Institute(response);

}

export const instituteCreate = async (item) => {
    return await api.post(path, item);
}

export const instituteUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const instituteDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}