import { clearObj, open } from '../common/functions';
import Document from '../models/Document';
import api from "./Api";

const path = 'document';

export const documentIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Document(entity)),
        total: response.total,
    }
}

export const downloadDocument = (filename) =>{
    open(path+'/document/'+filename);
}

export const documentCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Document(entity));
}

export const documentShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Document(response);

}

export const documentCreate = async (item) => {
    return await api.post(path, item);
}

export const documentUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const documentDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}