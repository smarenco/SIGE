import { API_URL } from "../../env";

export const VERSION = '1.0.0';

export const DDMMYYYY = 'DD/MM/YYYY';
export const MMYYYY = 'MM/YYYY';
export const DDMMYYYYHHmm = 'DD/MM/YYYY HH:mm';
export const DDMMYYYYHHmmss = 'DD/MM/YYYY HH:mm:ss';
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

export const levels_educations = [
    {id: 'PRI', name: 'Primaria'},
    {id: 'SEC', name: 'Secundaria'},
    {id: 'TER', name: 'Terciaria'},
    {id: 'POS', name: 'Posgrado'},
];

export const genders = [
    {id: 'FEME', name: 'Femenino'},
    {id: 'MASC', name: 'Masculino'},
    {id: 'NOBIN', name: 'No Binario'},
    {id: 'PRND', name: 'Prefiero no decirlo'},
];

export const typesCategories = [
    {id: 'ADM', name: 'Administrativo/a'},
    {id: 'PRO', name: 'Profesor/a'},
    {id: 'DIR', name: 'Director/a'},
    {id: 'EST', name: 'Estudiante'},
    {id: 'CUR', name: 'Curso'},
]; 