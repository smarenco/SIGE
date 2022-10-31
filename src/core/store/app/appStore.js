import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '../../common/consts';
import { ActividadesPage } from '../../pages/administrations/ActividadesPage';
import { AsistenciaPage } from '../../pages/administrations/AsistenciaPage';
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
        config: {
            eventosTiempoRealAccesos: [],
            eventosTiempoRealShowMobiles: false,
            eventosActivosIdAcceso: undefined,
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
            { key: 'actividades', name:'Actividades', path: '/actividades', component: ActividadesPage },
            // { key: 'derechoAdmision', path: '/derechoAdmision/', component: DerechoAdmision },
            // { key: 'categoria', path: '/categoria/', component: Categoria },
            // { key: 'requisito', path: '/requisito/', component: Requisito },
            // { key: 'zonaMarcacion', path: '/zonaMarcacion/', component: ZonaMarcacion },
            // { key: 'dispositivos-moviles', path: '/dispositivos-moviles/', component: DispositivosMoviles },
            { key: 'users', name:'Users', path: '/users/', component: UserPage },
            // { key: 'visitantes', path: '/visitantes/', component: Visitantes },
            // { key: 'marcas', path: '/marcas/', component: Marcas },
            { key: 'asistencia', name:'Asistencia', path: '/asistencia/', component: AsistenciaPage },
            // { key: 'eventos-tiempo-real', path: '/eventos-tiempo-real/', component: EventosTiempoReal },
            // // GYM
            // { key: 'gym-registrar-pagos', path: '/gym-registrar-pagos/', component: RegistrarPagos },
            // { key: 'gym-consulta-pagos', path: '/gym-consulta-pagos/', component: ConsultaPagos },
            // { key: 'gym-tipo-cuota', path: '/gym-tipo-cuota/', component: TipoCuota },
            // { key: 'gym-sucursales', path: '/gym-sucursales/', component: Sucursal },
            // // { key: 'menasjes', path: '/menasjes/', component: Mensajes },
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

        params: {},

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