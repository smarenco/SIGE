import moment from 'moment';
import { HHmm } from '../common/consts';
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
    let params = { ...item };
    params.start_time = moment(params.start_time).format(HHmm);
    params.finish_time = moment(params.finish_time).format(HHmm);
    return await api.post(path, params);
}

export const turnUpdate = async (id, item) => {
    let params = { ...item };
    params.start_time = moment(params.start_time).format(HHmm);
    params.finish_time = moment(params.finish_time).format(HHmm);
    return await api.put(`${path}/${id}`, params);
}

export const turnDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}