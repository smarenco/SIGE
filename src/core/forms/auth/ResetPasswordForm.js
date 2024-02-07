import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/AuthService';
import { getQueryString } from '../../common/functions';

const loginFormFields = {
  resetEmail: ''
}

const ResetPasswordForm = ({ handleError }) => {
  const { new_password, repeat_password, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const handleOnSubmit = async () => {
    try {
      const token = getQueryString('token');
      const { response } = await resetPassword(token, new_password, repeat_password);
      message.success(response.message);
    }catch(err){
      handleError('Error en la autenticacion');
    }
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
          style={{marginBottom: 5}}
          name="new_password"
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nueva contraseña"
        />
        <Input
          name="repeat_password"
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Repita la contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Resetear Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;