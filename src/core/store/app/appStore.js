import { AimOutlined, ApartmentOutlined, BankOutlined, CarOutlined, ClockCircleOutlined, ContainerOutlined, ControlOutlined, CreditCardOutlined, DollarCircleOutlined, ExceptionOutlined, FileOutlined, GoldOutlined, HddOutlined, HeartOutlined, HomeOutlined, IdcardOutlined, MedicineBoxOutlined, PayCircleOutlined, ScheduleOutlined, SettingOutlined, SolutionOutlined, TeamOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '../../common/consts';
import { AbsenteeismCausesPage } from '../../pages/administrations/AbsenteeismCausesPage';
import { AccountPage } from '../../pages/administrations/AccountPage';
import { ActividadesPage } from '../../pages/administrations/ActividadesPage';
import { AttendancePage } from '../../pages/administrations/AttendancePage';
import { CityPage } from '../../pages/administrations/CityPage';
import { CountryPage } from '../../pages/administrations/CountryPage';
import { CoursePage } from '../../pages/administrations/CoursePage';
import { DocumentCategoryPage } from '../../pages/administrations/DocumentCategoryPage';
import { DocumentPage } from '../../pages/administrations/DocumentPage';
import { GroupPage } from '../../pages/administrations/GroupPage';
import { InstitutePage } from '../../pages/administrations/InstitutePage';
import { MedicalCoveragePage } from '../../pages/administrations/MedicalCoveragePage';
import { PaymentMethodsPage } from '../../pages/administrations/PaymentMethodsPage';
import { ConsultPaymentPage } from '../../pages/administrations/ConsultPaymentPage';
import { TurnPage } from '../../pages/administrations/TurnPage';
import { UserPage } from '../../pages/administrations/UserPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { PaymentPage } from '../../pages/administrations/PaymentPage';
import { UserProfilePage } from '../../pages/administrations/UserProfilePage';
import { AccountPaymentPage } from '../../pages/administrations/AccountPaymentPage';



export const appStore = createSlice({
    name: 'app',
    initialState: {
        params: {

        },
        session: {

        },
        routes: [
            { key: 'home', name:'Home', path: '/', component: HomePage, icon: <HomeOutlined /> },
            // Sesión
            { key: 'chkLogin', path: '/auth', component: LoginPage, isPublic: true, clean: true },
            { key: 'profile', name: 'Perfil', path: '/perfil', component: UserProfilePage, icon: <UserOutlined /> },
            { key: 'adm-cities', name: 'Ciudades', path: '/ciudades', component: CityPage, icon: <AimOutlined /> },
            { key: 'adm-medicalCoverage', name: 'Coberturas Medicas', path: '/coberturas-medicas', component: MedicalCoveragePage, icon: <HeartOutlined /> },
            { key: 'adm-courses', name: 'Cursos', path: '/cursos', component: CoursePage, icon: <ApartmentOutlined /> },
            { key: 'adm-instituts', name: 'Institutos', path: '/institutos', component: InstitutePage, icon: <BankOutlined /> },
            { key: 'adm-absenteeismCauses', name: 'Causas de ausentismos', path: '/causas-ausentismos', component: AbsenteeismCausesPage, icon: <MedicineBoxOutlined /> },
            { key: 'adm-documentCategory', name: 'Categorias de documentos', path: '/categorias-documentos', component: DocumentCategoryPage, icon: <HddOutlined /> },
            { key: 'adm-turn', name: 'Turnos', path: '/turnos', component: TurnPage, icon: <ClockCircleOutlined /> },
            { key: 'adm-paymentMethods', name: 'Metodos de pago', path: '/payment-methods', component: PaymentMethodsPage, icon: <PayCircleOutlined /> },
            { key: 'adm-group', name: 'Grupos', path: '/grupos', component: GroupPage, icon: <UsergroupAddOutlined /> },
            { key: 'adm-document', name: 'Documentos', path: '/documentos', component: DocumentPage, icon: <IdcardOutlined /> },
            { key: 'conf-consult-payment', name: 'Consulta Pagos', path: '/consulta-pago', component: ConsultPaymentPage, icon: <PayCircleOutlined /> },
            { key: 'conf-payment', name: 'Pagos', path: '/pago', component: PaymentPage, icon: <PayCircleOutlined /> },
            { key: 'conf-users', name: 'Usuarios', path: '/usuarios', component: UserPage, icon: <UserOutlined /> },
            { key: 'conf-account', name: 'Cuenta', path: '/cuenta', component: AccountPage, icon: <SettingOutlined /> },
            { key: 'conf-accountPayment', name: 'Pagos Cuenta', path: '/pago-cuenta', component: AccountPaymentPage, icon: <UserOutlined /> },
            { key: 'asistencia', name:'Asistencia', path: '/asistencia', component: AttendancePage },
            // /// Configuración
            // { key: 'auditoria', path: '/auditoria', component: Auditoria },
            // { key: 'auditoria-detail', path: '/auditoria/:id', component: AuditoriaDetalle, keysPage: ['id'] },
        ], // 'authenticated', 'not-authenticated'
        menu: {
            main: [
                // { key: '', to: '', icon: '', text: '', title: '', items: [] },
                { key: 'home', to: '/', icon: <HomeOutlined />, title: 'Home'},
                { key: 'profile', to: '/perfil', icon: <SolutionOutlined />, title: 'Perfil'},
                { key: 'IsDivider', IsDivider: true},
                {
                    key: 'adm-administrations', icon: <HomeOutlined />, title: 'Administracion' , items: [
                        { key: 'adm-documentCategory', to: '/categorias-documentos', icon: <ExceptionOutlined />, title: 'Categorias de documentos'},
                        { key: 'adm-absenteeismCauses', to: '/causas-ausentismos', icon: <ScheduleOutlined />, title: 'Causas de ausentismos'},
                        { key: 'adm-cities', to: '/ciudades', icon: <AimOutlined />, title: 'Ciudades'},
                        { key: 'adm-medicalCoverage', to: '/coberturas-medicas', icon: <CarOutlined />, title: 'Coberturas medicas'},
                        { key: 'adm-courses', to: '/cursos', icon: <ContainerOutlined />, title: 'Cursos'},
                        { key: 'adm-document', to: '/documentos', icon: <FileOutlined />, title: 'Documentos'},
                        { key: 'adm-group', to: '/grupos', icon: <GoldOutlined />, title: 'Grupos'},
                        { key: 'adm-instituts', to: '/institutos', icon: <BankOutlined />, title: 'Institutos'},
                        { key: 'adm-turn', to: '/turnos', icon: <ContainerOutlined />, title: 'Turnos'},

                    ]
                },
                {
                    key: 'conf-config', icon: <SettingOutlined />, title: 'Configuracion', items: [
                        { key: 'conf-account', to: '/cuenta', icon: <ControlOutlined />, title: 'Cuenta'},
                        { key: 'conf-consult-payment', to: '/consulta-pago', icon: <CreditCardOutlined />, title: 'Consulta pagos'}, 
                        { key: 'conf-paymentMethods', to: '/payment-methods', icon: <CreditCardOutlined />, title: 'Metodos de pago'},
                        { key: 'conf-payment', to: '/pago', icon: <DollarCircleOutlined />, title: 'Pagos'},
                        { key: 'conf-accountPayment', to: '/pago-cuenta', icon: <DollarCircleOutlined />, title: 'Pagos cuentas'},
                        { key: 'conf-users', to: '/usuarios', icon: <TeamOutlined />, title: 'Usuarios'},
                    ]
                }
            ],
            mainRight: [
                { key: 'logout', to: '/auth/logout', icon: 'logout', title: 'Cerrar sesión' },
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