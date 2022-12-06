import { clearObj, open, renderError } from '../common/functions';
import MedicalCoverage from '../models/MedicalCoverage';
import api from "./Api";

const path = 'medical-coverage';

export const medicalCoverageIndex = async (filter, output = undefined) => {
    let params = filter || {};
    params.page = filter?.page || 1;
    params.pageSize = filter?.pageSize || 50;

    if (output) {
        let exportFilter = { ...filter, output }
        clearObj(exportFilter);
        open(path, exportFilter);
        return;
    }

    try{
        const { response } = await api.get(path, { params });
        return {
            data: response.data.map(entity => new MedicalCoverage(entity)),
            total: response.total,
        }
    }catch(err) {
        renderError(err);
    }
    
}

export const medicalCoverageCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new MedicalCoverage(entity));
}

export const medicalCoverageShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new MedicalCoverage(response);

}

export const medicalCoverageCreate = async (item) => {
    return await api.post(path, item);
}

export const medicalCoverageUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const medicalCoverageDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}