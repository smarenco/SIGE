import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';

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
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { startLogin, errorMessage } = useAuthStore();

    useEffect(() => {
        if (errorMessage !== undefined) {
          handleError('Error en la autenticacion', errorMessage);
        }

    }, [errorMessage, handleError])

  const handleOnSubmit = (event) => {
    console.log(loginEmail, loginPassword)
    startLogin({ username: loginEmail, password: loginPassword });
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
          name="loginPassword"
          onChange={onLoginInputChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recuerdame</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/auth/resetPassword">
          Olvidé mi contraseña
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Iniciar Sesion
        </Button>
        O tambien puedes <a href="/auth/register">registrate aqui!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;