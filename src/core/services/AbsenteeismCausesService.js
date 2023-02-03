import { clearObj, open } from '../common/functions';
import AbsenteeismCauses from '../models/AbsenteeismCauses';
import api from "./Api";

const path = 'absenteeism-causes';

export const absenteeismCausesIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new AbsenteeismCauses(entity)),
        total: response.total,
    }
}

export const absenteeismCausesCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new AbsenteeismCauses(entity));
}

export const absenteeismCausesShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new AbsenteeismCauses(response);
}

export const absenteeismCausesCreate = async (item) => {
    return await api.post(path, item);
}

export const absenteeismCausesUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const absenteeismCausesDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}