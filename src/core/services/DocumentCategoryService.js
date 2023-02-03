import { clearObj, open } from '../common/functions';
import DocumentCategory from '../models/DocumentCategory';
import api from "./Api";

const path = 'documental-category';

export const documentCategoryIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new DocumentCategory(entity)),
        total: response.total,
    }
}

export const documentCategoryCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new DocumentCategory(entity));
}

export const documentCategoryShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new DocumentCategory(response);

}

export const documentCategoryCreate = async (item) => {
    return await api.post(path, item);
}

export const documentCategoryUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const documentCategoryDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}