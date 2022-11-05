import { clearObj, open } from '../common/functions';
import Turn from '../models/Turn';
import api from "./Api";

const path = 'turn';

export const turnIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Turn(entity)),
        total: response.total,
    }
}

export const turnCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Turn(entity));
}

export const turnShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Turn(response);

}

export const turnCreate = async (item) => {
    return await api.post(path, item);
}

export const turnUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const turnDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}