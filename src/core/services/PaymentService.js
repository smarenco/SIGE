import { clearObj, open } from '../common/functions';
import Payment from '../models/Payment';
import api from "./Api";

const path = 'payment';

export const paymentIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Payment(entity)),
        total: response.total,
    }
}

export const paymentCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });
    
    return response.data.map(entity => new Payment(entity));
}

export const paymentShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return new Payment(response);

}

export const paymentCreate = async (item) => {
    return await api.post(path, item);
}

export const paymentUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const paymentDelete = async (id) => {
    return await api.delete(`${path}/${id}`);
}