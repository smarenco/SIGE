import { API_URL } from "../../env";

export const VERSION = '1.0.0';

export const DDMMYYYY = 'DD/MM/YYYY';
export const MMYYYY = 'MM/YYYY';
export const DDMMYYYYHHmm = 'DD/MM/YYYY HH:mm';
export const DDMMYYYYHHmmss = 'DD/MM/YYYY HH:mm:ss';
export const YYYYMMDDHHmmss = 'YYYY-MM-DD HH:mm:ss';
export const HHmmss = 'HH:mm:ss';
export const HHmm = 'HH:mm';

export const NO_AVATAR = `${API_URL}/assets/no-avatar.png`;

export const ACCESS_TOKEN = "token";
export const SESSION = "session";
export const USER = "user";
export const PARAMS = "params";
export const LOCALE = "lng";
export const MENU = "menu";
export const CONFIG = "config";

export const colors = {
    urusigeSkyblue: '#2995d3',
    urusigeGreen: '#95c56e',
    magenta: '#eb2f96',
    red: '#f5222d',
    volcano: '#fa541c',
    orange: '#fa8c16',
    gold: '#faad14',
    lime: '#a0d911',
    green: '#52c41a',
    cyan: '#13c2c2',
    blue: '#1890ff',
    geekblue: '#2f54eb',
    purple: '#722ed1',
    grey: '#616161',
};

export const methods_payments = [
    {id: 'mercado-pago', name: 'Mercado Pago'},
    {id: 'efectivo', name: 'Efectivo'},
    {id: 'transferencia', name: 'Transferencia'},
];

export const education_level = [
    {id: 'primaria-incompleta', name: 'Primaria Incompleta'},
    {id: 'primaria-completa', name: 'Primaria Completa'},
    {id: 'ciclo-basico-inompleto', name: 'Ciclo Básico Inompleto'},
    {id: 'ciclo-basico-completo', name: 'Ciclo Básico Completo'},
    {id: 'bachillerato-inompleto', name: 'Bachillerato Inompleto'},
    {id: 'bachillerato-completo', name: 'Bachillerato Completo'},
    {id: 'educacion-terciaria-universitaria-inompleta', name: 'Educacion Terciaria Universitaria Inompleta'},
    {id: 'educacion-terciaria-universitaria-completa', name: 'Educacion Terciaria Universitaria Completa'},
    {id: 'educacion-terciaria-no-universitaria-inompleta', name: 'Educacion Terciaria No Universitaria Inompleta'},
    {id: 'educacion-terciaria-no-universitaria-completa', name: 'Educacion Terciaria No Universitaria Completa'},
];

export const genders = [
    {id: 'female', name: 'Femenino'},
    {id: 'male', name: 'Masculino'},
    {id: 'nobin', name: 'No Binario'},
    {id: 'prnd', name: 'Prefiero no decirlo'},
];

export const types_categories = [
    {id: 'administrative', name: 'Administrativo/a'},
    {id: 'teacher', name: 'Profesor/a'},
    {id: 'director', name: 'Director/a'},
    {id: 'student', name: 'Estudiante'},
    //{id: 'course', name: 'Curso'},
]; 