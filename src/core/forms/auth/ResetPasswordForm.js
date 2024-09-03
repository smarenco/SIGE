import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/AuthService';
import { getQueryString } from '../../common/functions';

const loginFormFields = {
  resetEmail: ''
}

const ResetPasswordForm = ({ handleError }) => {
  const { new_password, repeat_password, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const [loading, setLoading] = useState(false)

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      const token = getQueryString('token');
      const { response } = await resetPassword(token, new_password, repeat_password);
      Modal.confirm({
        title: response,
        content: 'Contraseña reseteada con éxito. Presione en Aceptar para continuar.',
        onOk: () => window.location.href = '/auth/login',
        okText: 'Aceptar',
        cancelButtonProps: { style: { display: 'none' } }
      });
      setLoading(false);
    }catch(err){
      Modal.error({
          title: 'Error al enviar correo',
          content: <p>{err.response.message}</p>,
          okText: 'Aceptar',
      });
      setLoading(false);
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
        name="new_password"
        rules={[
          {
            required: true,
            message: 'Porfavor ingrese su nueva contraseña!',
          },
        ]}
        >
          <Input
            style={{marginBottom: 5}}
            disabled={loading}
            name="new_password"
            type='password'
            onChange={onLoginInputChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Nueva contraseña"
          />
        </Form.Item>
        <Form.Item
        name="repeat_password"
        rules={[
          {
            required: true,
            message: 'Porfavor confirme su nueva contraseña!',
          },
        ]}>
        <Input
          disabled={loading}
          name="repeat_password"
          type='password'
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Repita la contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" loading={loading} disabled={loading} htmlType="submit" className="login-form-button">
          Resetear Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;