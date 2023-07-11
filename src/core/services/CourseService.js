import { clearObj, open } from '../common/functions';
import Course from '../models/Course';
import api from "./Api";

const path = 'course';

export const courseIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Course(entity)),
        total: response.total,
    }
}

export const courseCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Course(entity));
}

export const courseShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Course(response);

}

export const courseCreate = async (item) => {
    return await api.post(path, item);
}

export const courseUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const courseDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}

export const importCourses = async (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return await api.post(`${path}/import`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}