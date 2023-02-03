import { clearObj, open } from '../common/functions';
import City from '../models/City';
import api from "./Api";

const path = 'city';

export const cityIndex = async (filter, output = undefined) => {
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
    console.log(response)
    return {
        data: response.data.map(entity => new City(entity)),
        total: response.total,
    }
}

export const cityCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new City(entity));
}

export const cityShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new City(response);

}

export const cityCreate = async (item) => {
    return await api.post(path, item);
}

export const cityUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const cityDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}