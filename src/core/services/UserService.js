import { clearObj, open } from '../common/functions';
import User from '../models/User';
import api from "./Api";

const path = 'user';

export const userIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new User(entity)),
        total: response.total,
    }
}

export const documentExpired = async (filter, output = undefined) => {
    let params = filter || {};
    params.page = filter?.page || 1;
    params.pageSize = filter?.pageSize || 50;

    if (output) {
        let exportFilter = { ...filter, output }
        clearObj(exportFilter);
        open(`${path}/documents-expired`, exportFilter);
        return;
    }

    const { response } = await api.get(`${path}/documents-expired`, { params });
    return {
        data: response.data,
        total: response.total,
    }
}

export const notifyExpiredDocument = async (id) => {
    return await api.post(`${path}/notify-document-expired`, { IdUserDocument: id });
}

export const userCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });

    return response.data.map(entity => new User(entity));
}

/**
     * Activar o desactivar múltiples registros
     * @param {boolean} active Activar o desactivar el registro
     * @param {array} records Registros a modificar su estado
     * @returns {Promise}
     */
export const userToggle = async (active, records) => {
    if (!Array.isArray(records)) {
        records = [records];
    }
    return Promise.all(records.map(async (id) => await api.post(`${path}/${id}/${active ? 'activate' : 'desactivate'}`)));
}

export const userShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new User(response);

}

export const userCreate = async (item) => {
    return await api.post(path, item);
}

export const userUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const importUsers = async (file, type) => {
    let formData = new FormData();
    formData.append("file", file);
    return await api.post(`${path}/import/${type}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const userDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}

export const downloadDocument = (filename) =>{
    open(`${path}/download-document/${filename}`);
}

export const uploadDocument = (file, filename) => {
    let formData = new FormData();
    formData.append('Archivo-file', file);
    formData.append('filename', filename);

    return api.post(`${path}/subir-docs`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
    });
}