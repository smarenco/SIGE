import moment from 'moment';
import { DDMMYYYY, DDMMYYYYHHmm } from '../common/consts';
import { clearObj, open } from '../common/functions';
import AccountPayment from '../models/AccountPayment';
import api from "./Api";

const path = 'account-payment';

export const accountPaymentIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new AccountPayment(entity)),
        total: response.total,
    }
}

export const accountPaymentCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new AccountPayment(entity));
}

export const downloadDocument = (filename) =>{
    open(path+'/download-document/'+filename);
}

export const uploadDocument = (file, filename) => {
    let formData = new FormData();
    formData.append('Archivo-file', file);
    formData.append('filename', filename);

    return api.post(`${path}/upload-doc`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
    });
}

export const accountPaymentShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new AccountPayment(response);

}

export const accountPaymentCreate = async (item) => {
    return await api.post(path, item);
}

export const accountPaymentUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const accountPaymentDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}