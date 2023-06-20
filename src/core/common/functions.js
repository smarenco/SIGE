import { Form, message, Modal } from "antd";
import { ACCESS_TOKEN, LOCALE } from "./consts";
import { API_URL } from "../../env";


export const loadTypes = (gender) => {
    let typesUsers = [
        {id: 'administrative', name: 'Administrativo/a'},
        {id: 'teacher', name: 'Profesor/a'},
        {id: 'director', name: 'Director/a'},
        {id: 'student', name: 'Estudiante'},
    ];

    switch (gender) {
        case 'MALE':
            typesUsers = [
                {id: 'administrative', name: 'Administrativo'},
                {id: 'teacher', name: 'Profesor'},
                {id: 'director', name: 'Director'},
                {id: 'student', name: 'Estudiante'},
            ];
            break;
        case 'FEMALE':
            typesUsers = [
                {id: 'administrative', name: 'Administrativa'},
                {id: 'teacher', name: 'Profesora'},
                {id: 'director', name: 'Directora'},
                {id: 'student', name: 'Estudiante'},
            ];
            break;
    }

    return typesUsers;
    
};

export const renderFormItem = (key, label, initialValue, component) => {
    let labelExt, valuePropName = 'value';
    if (typeof initialValue === 'boolean') {
        valuePropName = 'checked';
        labelExt = label;
        label = undefined;
    }
    const { getFieldDecorator } = this.props.form;
    const fieldDecorator = getFieldDecorator(key, { rules: this.rules[key], initialValue, valuePropName });
    return (
        <Form.Item label={label} validateStatus={this.state.errors[key] ? 'error' : ''} help={this.state.help[key]}>
            {fieldDecorator(component)} {labelExt}
        </Form.Item>
    )
}

export const renderError = (err, noDestroy) => {
    if (err?.status === 500 && err?.response?.message) {
        let msgArr = err.response.message.split('.');
        let title = msgArr.shift().trim();
        alertError(title, msgArr.join('.'));
        return err;
    }
    if (noDestroy !== true) {
        message.destroy();
    }
    if (err.response && err.response.message) {
        message.error(err.response.message, 10);
    } else if (err && err.message) {
        message.error(err.message, 10);
    } else if (typeof err === 'string') {
        message.error(err, 10);
    } else if (err.response) {
        message.error('No hay un mensaje de error definido');
    } else {
        message.error('No se pudo procesar internamente la solicitud');
    }
    if (err.status === 401 && err.response && err.response.action === 'logout') {
        // logout();
        alert('Debe cerrar su sesión para continuar');
    }
    return err;
}

export const alertError = (title, err) => {
    if (typeof err === 'undefined') {
        err = title;
        title = 'Error';
    }
    if (err.response && err.response.message) {
        let width = err.response.message.length > 100 ? 700 : 600;
        Modal.error({
            width,
            title,
            content: err.response.message,
            okText: 'Aceptar',
        });
    } else if (err && err.message) {
        let width = err.message.length > 100 ? 700 : 600;
        Modal.error({
            width,
            title,
            content: err.message,
            okText: 'Aceptar',
        });
    } else if (typeof err === 'string') {
        let width = err.length > 100 ? 700 : 600;
        Modal.error({
            width,
            title,
            content: err,
            okText: 'Aceptar',
        });
    } else if (err.response) {
        Modal.error({
            title,
            content: 'No hay un mensaje de error definido',
            okText: 'Aceptar',
        });
    } else {
        Modal.error({
            title,
            content: 'No se pudo procesar internamente la solicitud',
            okText: 'Aceptar',
        });
    }
    if (err.status === 401 && err.response && err.response.action === 'logout') {
        // logout();
        alert('Debe cerrar su sesión para continuar');
    }
    return err;
}

export const eqArr = (a, b) => {
    if (!a || !b)
        return false;
    if (a.length != b.length)
        return false;
    for (var i = 0, l = a.length; i < l; i++) {
        if (a[i] instanceof Array && b[i] instanceof Array) {
            if (!eqArr(a[i], b[i]))
                return false;
        }
        else if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

export const formatDate = (date, showTime, shortDate) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    let formated = [[day, month, date.getFullYear()].join('/')];
    if (showTime === true) {
        if (shortDate === true) {
            formated.push([hours, minutes].join(':'))
        } else {
            formated.push([hours, minutes, '00'].join(':'))
        }
    }
    return formated.join(' ')
}
/**
 * Obtener contenido del archivo como `base64`.
 * 
 * @param {Blob} blob
 * @param {*} cb 
 */
export const getBase64 = (blob, cb) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => cb(reader.result));
    reader.readAsDataURL(blob);
}

export const rgb = (r, g, b) => `rgb(${r}, ${g ?? r}, ${b ?? r})`;
export const rgba = (r, g, b, a) => `rgba(${r}, ${g && !b ? r : g}, ${b ?? r}, ${a ?? g})`;

export const maskString = (s, m, cleanBefore, fillWith0) => {
    if (cleanBefore) {
        s = s.replace(/[.:,;\-\_\/\\\s]/g, '');//.replace(/^0+(?!$)/, '');
    }
    if (s.length * m.length > 0) {
        var i = 0;
        var j = 0;
        var rm = m.replace(/[.:,;\-\_\/\\\s]/g, '');
        var result = '';
        var signcount = 0;
        if (fillWith0 && s.length < rm.length) {
            var zeros = '';
            for (var k = 0; k < rm.length - s.length; k++) zeros += '0';
            s = zeros + s;
        }
        while (i <= m.length) {
            var sign = m.substr(i, 1);
            if (sign === '#') {
                result += s.substr(j, 1);
                j++;
            } else if (sign === " ") {
                result += " ";
            } else {
                if (fillWith0 || i <= s.length + signcount) {
                    result += sign;
                    signcount++;
                }
            }
            i++;
        }
        return result;
    }
    return s;
}

/*export const getParams = key => {
    let params;
    try {
        params = JSON.parse(localStorage.getItem('params'));
    } catch (err) {

    }
    if (!params) {
        return undefined;
        // window.location.reload(true);
    }
    if (key !== undefined) {
        if (params[key] === undefined) {
            if (confirm(`Error al cargar el parametro "${key}"\n¿Desea volver a cargar todos los parámetros?`)) {
                localStorage.clear();
                window.location.reload();
            }
            return undefined;
        }
        return params[key];
    }
    return params;
}*/

// export const getParamsAsync = () => {
//     return new Promise((res, rej) => {
//         const maxAttemts = 300;
//         let attemts = 0;
//         let params;
//         const interval = setInterval(() => {
//             params = getParams();
//             if (params || attemts++ > maxAttemts) {
//                 clearInterval(interval);
//                 if (params) {
//                     res(params);
//                 } else {
//                     rej('No se han cargaron los parámetros del sistema');
//                 }
//             }
//         }, 50);
//     });
// }

export const asArr = arr => Object.keys(arr).map(id => ({ id, value: arr[id] }));

export const apiUrl = (url, params = {}) => {
    if (typeof params === 'object') {
        params.token = localStorage.getItem(ACCESS_TOKEN);
        params.locale = localStorage.getItem(LOCALE);
    }
    return `${API_URL}/${url}?${asArr(params).map(v => `${v.id}=${v.value}`).join('&')}`;
}

export const open = (url, params, target = '_blank') => {
    params = params ?? {};
    if (typeof params === 'object') {
        params.token = localStorage.getItem(ACCESS_TOKEN);
        params.locale = localStorage.getItem(LOCALE);
    }
    window.open(`${API_URL}/${url}?${asArr(params).map(v => `${v.id}=${v.value}`).join('&')}`, target);
}

export const clearObj = obj => {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            delete obj[key];
        } else if (obj[key] === undefined || obj[key] === null) {
            delete obj[key]
        }
    });
}

/**
 * @param {string} key 
 */
export const getQueryString = key => {
    const url = window.location.search;
    const position = url.indexOf(`${key}=`);
    if (position > 0) {
        const valuePosition = url.indexOf('&', position + key.length + 1);
        if (valuePosition > -1) {
            return url.substring(position + key.length + 1, valuePosition);
        } else {
            return url.substring(position + key.length + 1);
        }
    }
    return undefined;
}

export const getQuery = key => {
    let search = window.location.search;
    let data = {};

    if (search.indexOf('?') === 0) {
        search = search.substr(1);
    }

    search = search.split('&');

    for (let i in search) {
        data[search[i].split('=')[0]] = search[i].split('=')[1];
    }

    if (key) {
        return data[key];
    }

    return data;
}

/**
 * 
 * @param {object} record 
 * @param {string[]} selectedRowKeys 
 * @param {(selectedRowKeys: string[] | number[], selectedRows: any[]) => void} onRowSelectedChange
 */
export const onTableRow = (record, selectedRowKeys, onRowSelectedChange) => {
    if (window.event.ctrlKey) {
        if (selectedRowKeys.indexOf(record.getId()) >= 0) {
            onRowSelectedChange(selectedRowKeys.filter(v => v !== record.getId()));
        } else {
            onRowSelectedChange(selectedRowKeys.concat([record.getId()]));
        }
    }
}