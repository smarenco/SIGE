import { USER } from '../common/consts';
import { clearObj, open } from '../common/functions';
import Account from '../models/Account';
import api from "./Api";
import { forceLogout } from './AuthService';

const path = 'account';

export const accountIndex = async (filter, output = undefined) => {
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
        data: response.data.map(entity => new Account(entity)),
        total: response.total,
    }
}

export const accountCombo = async (filter) => {
    let params = filter || {};
    const { response } = await api.get(path, { params });

    return response.data.map(entity => new Account(entity));
}

export const accountShow = async () => {
    const user = JSON.parse(localStorage.getItem(USER));
    if(user){
        const { response } = await api.get(`${path}/${user.account_id}`);
        return new Account(response);
    }else{
        forceLogout();
    }
    
}

export const accountCreate = async (item) => {
    return await api.post(path, item);
}

export const accountUpdate = async (id, item) => {
    return await api.put(`${path}/${id}`, item);
}

export const accountDelete = async (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
}