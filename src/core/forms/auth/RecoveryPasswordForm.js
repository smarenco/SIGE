import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from '../../hooks/useForm';
import { recoveryPassword } from '../../services/AuthService';

const loginFormFields = {
  recoveryEmail: ''
}

const RecoveryPasswordForm = ({ handleError }) => {
  const { recoveryEmail, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const [loading, setLoading] = useState(false)

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      const { response } = await recoveryPassword(recoveryEmail);
      Modal.confirm({
        title: response,
        content: 'Si la dirección de correo es correcta enviamos un mensaje con instrucciones para establecer su nueva contraseña.',
        cancelButtonProps: { style: { display: 'none' } },
        onOk: () => window.location.href = '/auth/login',
      });
      setLoading(false);
    }catch(err){
      setLoading(false);
      Modal.error({
        title: 'Error al enviar correo',
        content: <p>{err.response.message}</p>,
        okText: 'Aceptar',
      });
    }
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
          disabled={loading}
          onChange={onLoginInputChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Correo Electrónico"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" loading={loading} disabled={loading} htmlType="submit" className="login-form-button">
          Recuperar Contraseña
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RecoveryPasswordForm;