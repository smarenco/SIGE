import { createSlice } from '@reduxjs/toolkit';
import { ActividadesPage } from '../../pages/administrations/ActividadesPage';
import { AsistenciaPage } from '../../pages/administrations/AsistenciaPage';
import { FuncionariosPage } from '../../pages/administrations/FuncionariosPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { HomePage } from '../../pages/HomePage';

export const appStore = createSlice({
    name: 'app',
    initialState: {
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
            { key: 'funcionarios', name:'Funcionarios', path: '/funcionarios/', component: FuncionariosPage },
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
        services: {},
    },
    reducers: {
                
    }
})


export const { } = appStore.actions;