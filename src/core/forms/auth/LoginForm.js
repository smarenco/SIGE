import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from '../../hooks/useForm';
import { login } from '../../services/AuthService';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

// const registerFormFields = {
//   registerName: '',
//   registerEmail: '',
//   registerPassword: '',
//   registerPassword2: '',
// }

const LoginForm = ({ handleError }) => {
  
  const [loading, setLoading] = useState(false)
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const handleOnSubmit = async () => {
    setLoading(true);
    await login(loginEmail, loginPassword);
    setLoading(false);
  }

  return (
    <Form
      action='/auth/login'
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleOnSubmit}
    >
      <Form.Item
        name="loginEmail"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su correo electrónico!',
          },
        ]}
        >
        <Input
          disabled={loading}
          name="loginEmail"
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo Electrónico"
        />
      </Form.Item>
      <Form.Item
        name="loginPassword"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su contraseña!',
          },
        ]}
        >
        <Input.Password
          disabled={loading}
          name="loginPassword"
          onChange={onLoginInputChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox disabled={loading}>Recuerdame</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" disabled={loading} href="/auth/recoveryPassword">
          Olvidé mi contraseña
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" disabled={loading} loading={loading} htmlType="submit" className="login-form-button">
          Iniciar Sesion
        </Button>
        O tambien puedes <a href="/auth/register" disabled={loading}>registrate aqui!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;