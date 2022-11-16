import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '../../common/consts';
import { ActividadesPage } from '../../pages/administrations/ActividadesPage';
import { AsistenciaPage } from '../../pages/administrations/AsistenciaPage';
import { CityPage } from '../../pages/administrations/CityPage';
import { CountryPage } from '../../pages/administrations/CountryPage';
import { CoursePage } from '../../pages/administrations/CoursePage';
import { DocumentCategoryPage } from '../../pages/administrations/DocumentCategoryPage';
import { DocumentPage } from '../../pages/administrations/DocumentPage';
import { GroupPage } from '../../pages/administrations/GroupPage';
import { InstitutePage } from '../../pages/administrations/InstitutePage';
import { MedicalCoveragePage } from '../../pages/administrations/MedicalCoveragePage';
import { TurnPage } from '../../pages/administrations/TurnPage';
import { UserPage } from '../../pages/administrations/UserPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { HomePage } from '../../pages/HomePage';



export const appStore = createSlice({
    name: 'app',
    initialState: {
        params: {

        },
        session: {

        },
        routes: [
            { key: 'chkHome', name:'Home' ,path: '/', component: HomePage },
            // Sesión
            { key: 'chkLogin', path: '/auth', component: LoginPage, isPublic: true, clean: true },
            // { key: 'chkLoginByToken', path: '/auth/login-by-token', component: AuthLoginByToken, isPublic: true, clean: true },
            // { key: 'chkLogout', path: '/auth/logout', component: AuthLogout, isPublic: true, clean: true },
            // { key: 'chkAdmContraseña', path: '/account/password', component: undefined },
            // { key: 'chkVisitanteQR', path: '/auth/visitantes-qr', component: VisitantesQr, isPublic: true, clean: true },
            // Administraciones
            //{ key: 'actividades', name:'Actividades', path: '/actividades', component: ActividadesPage },
            //{ key: 'countries', name:'Paises', path: '/paises', component: CountryPage },
            { key: 'cities', name:'Ciudades', path: '/ciudades', component: CityPage },
            { key: 'medicalCoverage', name:'Coberturas Medicas', path: '/coberturasMedicas', component: MedicalCoveragePage },
            { key: 'courses', name:'Cursos', path: '/cursos', component: CoursePage },
            { key: 'instituts', name:'Institutos', path: '/institutos', component: InstitutePage },
            { key: 'users', name:'Usuarios', path: '/usuarios/', component: UserPage },
            { key: 'documentCategory', name:'Categorias de documentos', path: '/categoriasDocumentos/', component: DocumentCategoryPage },
            { key: 'document', name:'Documentos', path: '/documentos/', component: DocumentPage },
            { key: 'turn', name:'Turnos', path: '/turnos/', component: TurnPage },
            { key: 'group', name:'Grupos', path: '/grupos/', component: GroupPage },
            // { key: 'marcas', path: '/marcas/', component: Marcas },
            //{ key: 'asistencia', name:'Asistencia', path: '/asistencia/', component: AsistenciaPage },
            // /// Configuración
            // { key: 'empresa', path: '/empresa/', component: Empresa },
            // { key: 'auditoria', path: '/auditoria/', component: Auditoria },
            // { key: 'auditoria-detail', path: '/auditoria/:id', component: AuditoriaDetalle, keysPage: ['id'] },
            // { key: 'usuarios', path: '/usuarios/', component: Usuarios },
        ], // 'authenticated', 'not-authenticated'
        menu: {
            main: [],
            mainRight: [
                { key: 'logout', to: '/auth/logout', icon: 'logout', title: 'Cerrar sesión', fastAccess: true },
                // { key: 'config', to: '/config', icon: 'setting', title: i18n.t('global.menu.configuration'), fastAccess: true },
            ],
        },

        config: JSON.parse(localStorage.getItem(CONFIG) || '{}'),
        
    },
    reducers: {
        getParams(state){
            
            /*loadParams().then(params => {
                localStorage.setItem('params', JSON.stringify(params));
                state.params = { ...params }
            });*/
        }         
    }
})


export const { getParams } = appStore.actions;