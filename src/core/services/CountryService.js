import { clearObj, open } from '../common/functions';
import Country from '../models/Country';
import api from "./Api";

const path = 'country';

export const countryIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Country(entity)),
        total: response.total,
    }
}

export const countryShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Country(response);

}

export const countryCreate = async (item) => {
    return await api.post(path, item);
}

export const countryUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const countryDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}