import { clearObj, open } from '../common/functions';
import Group from '../models/Group';
import User from '../models/User';
import api from "./Api";

const path = 'group';

export const groupIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Group(entity)),
        total: response.total,
    }
}

export const groupCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Group(entity));
}

export const groupShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Group(response);

}

export const groupCreate = async (item) => {
    return await api.post(path, item);
}

export const addStudent = async (id, student) => {
    const { response } = await api.post(`${path}/${id}/student`, student);
    return new User(response);
}

export const groupUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const groupDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}

export const importGroups = async (file, type) => {
    let formData = new FormData();
    formData.append("file", file);
    return await api.post(`${path}/import`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}