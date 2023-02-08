import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';

const loginFormFields = {
  recoveryEmail: ''
}

const RecoveryPasswordForm = ({ handleError }) => {
  const { recoveryEmail, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { startRecoveryPassword, errorMessage } = useAuthStore();

    useEffect(() => {
        if (errorMessage !== undefined) {
          handleError('Error en la autenticacion', errorMessage);
        }

    }, [errorMessage, handleError])

  const handleOnSubmit = (event) => {
    startRecoveryPassword({ username: recoveryEmail });
  }

  return (
    <Form
      action='/auth/login'
      name="normal_login"
      className="reset-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleOnSubmit}
    >
      <Form.Item
        name="recoveryEmail"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su correo electrónico!',
          },
        ]}
        >
        <Input
          name="recoveryEmail"
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

export default RecoveryPasswordForm;