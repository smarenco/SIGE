import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';

const loginFormFields = {
  resetEmail: ''
}

const ResetPasswordForm = ({ handleError }) => {
  const { resetEmail, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { startResetPassword, errorMessage } = useAuthStore();

    useEffect(() => {
        if (errorMessage !== undefined) {
          handleError('Error en la autenticacion', errorMessage);
        }

    }, [errorMessage, handleError])

  const handleOnSubmit = (event) => {
    startResetPassword({ username: resetEmail });
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
        name="resetEmail"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su correo electrónico!',
          },
        ]}
        >
        <Input
          name="resetEmail"
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo Electrónico"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Recuperar Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;