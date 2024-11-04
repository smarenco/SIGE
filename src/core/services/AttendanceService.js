import dayjs from 'dayjs';
import { clearObj, open } from '../common/functions';
import api from "./Api";
import { MMYYYY, YYYYMMDDHHmmss } from '../common/consts';

const path = 'attendance';

export const attendanceIndex = async (filter, output = undefined) => {
    let params = filter || {};
    params.page = filter?.page || 1;
    params.pageSize = filter?.pageSize || 50;
    params.month = filter?.attendanceMonth?.format(YYYYMMDDHHmmss);
    params.group_id = filter?.group_id;
    params.student_id = filter?.student_id;

    if (output) {
        let exportFilter = { ...filter, output }
        clearObj(exportFilter);
        open(path, exportFilter);
        return;
    }

    const { response } = await api.get(path, { params });
    return {
        data: response.data,
        total: response.total,
    }
}

export const attendanceShow = async (id) => {
    const { response } = await api.get(`${path}/${id}`);
    return response;
}

export const attendanceCreate = async ({ attendanceList, group_id, attendance_date }) => {
    const formData = new FormData();

    formData.append('group_id', group_id);
    formData.append('attendance_date', attendance_date.format(YYYYMMDDHHmmss));
    
    attendanceList.forEach(student => {
        if (student.justification !== undefined) formData.append(`${student.id}-file`, student.justification);
        formData.append(student.id, JSON.stringify(student));
    })

    return await api.post(path, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const attendanceUpdate = async ({ attendanceMonth, group_id, student_id }, data) => {
    // console.log(data.justification)
    const formData = new FormData();
    formData.append('group_id', group_id);
    formData.append('student_id', student_id);
    formData.append('attendance_month', attendanceMonth);
    
    for(let key in data){
        if(key !== 'justification')
            formData.append(key, data[key]);
    }

    formData.append('justification', data.justification)
    return await api.post(`${path}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// export const attendanceDelete = async (ids) => {
//     if (!Array.isArray(ids)) {
//         ids = [ids];
//     }
//     return Promise.all(ids.map(async (id) => await api.delete(`${path}/${id}`)));
// }