import { Modal } from 'antd';
// import { alertError } from '../../common/functions';
import LoginForm from '../../forms/auth/LoginForm';
import './LoginPage.css';

export const RegisterPage = () => {
    const error = (title, content) => {
        Modal.error({
            title,
            content,
        });
    };

    return (
        <div className='login-background'>
            <div className='login-aside'>
                <img width={100} src={require('../../../assets/logo1.png')} alt='logo-urusige'/>
                <h2 style={{width: '100%', marginTop: 20, textAlign: 'center'}}>Bienvenides a <span style={{color: '#95c66e', fontWeight: 'bold'}}>URU</span><span style={{color: '#2995d3', fontWeight: 'bold'}}>SIGE</span></h2>
                <LoginForm handleError={error} />
            </div>
            <div className='login-cover'>
            <span>.</span>
            </div>
        </div>
    )
}