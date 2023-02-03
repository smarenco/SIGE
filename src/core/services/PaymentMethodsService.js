import { clearObj, open } from '../common/functions';
import PaymentMethods from '../models/PaymentMethods';
import api from "./Api";

const path = 'payment-methods';

export const paymentMethodsIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new PaymentMethods(entity)),
        total: response.total,
    }
}

export const paymentMethodsCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new PaymentMethods(entity));
}

export const paymentMethodsShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new PaymentMethods(response);
}

export const paymentMethodsCreate = async (item) => {
    return await api.post(path, item);
}

export const paymentMethodsUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const paymentMethodsDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}