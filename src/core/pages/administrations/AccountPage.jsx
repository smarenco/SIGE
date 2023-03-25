import { Button, Card, Form, Input, InputNumber } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { renderError } from '../../common/functions';
import Account from '../../models/Account';
import { AuthService } from '../../services/AuthService';

import { accountUpdate, accountShow } from '../../services/AccountService';
import LayoutH from '../../components/layout/LayoutH';
import Loading from '../../components/common/Loading';

export const AccountPage = ({ app }) => {

    const [ item, setItem ] = useState(new Account); 
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { user } = AuthService();

    const getAccount = async () => {
        try {
            const account = await accountShow();
            setItem(account);
        } catch(err) {
            renderError(err);
        }
    };

    const onInputChange = ({ target }) => {
        setItem( {...item, [target.name]: target.value });
    }

    const onInputChangeByName = (name, value) => {
        setItem( {...item, [name]: value });
    }

    useEffect(() => {
        getAccount();
    }, []);

    const onOk = async() => {
        setConfirmLoading(true);
        try {
            await accountUpdate(item.id, item);
        } catch(err) {
            renderError(err);
        }

        setConfirmLoading(false)        
    }

    return (
        loading ? <Loading /> : <Card
            title={(<strong>Cuenta</strong>)}
            className='ant-section'
            actions={[
                <Button type="primary" key="edit" onClick={onOk}>Guardar</Button>,
                ]}
        >
            <Form layout='vertical' style={{margin: 10}}>
                <LayoutH>
                    <Form.Item label='Documento' labelAlign='left' span={8}>
                        <Input name='document' disabled={confirmLoading} onChange={onInputChange} value={item?.document} />
                    </Form.Item>
                    <Form.Item label='Nombre' labelAlign='left' span={8}>
                        <Input name='name' disabled={confirmLoading} onChange={onInputChange} value={item?.name} />
                    </Form.Item>
                    <Form.Item label='Teléfono' labelAlign='left' span={8}>
                        <Input name='phone' disabled={confirmLoading} onChange={onInputChange} value={item?.phone} />
                    </Form.Item>
                    <Form.Item label='Contacto nombre' labelAlign='left' span={8}>
                        <Input name='contact_name' disabled={confirmLoading} onChange={onInputChange} value={item?.contact_name} />
                    </Form.Item>
                    <Form.Item label='Contacto E-mail' labelAlign='left' span={8}>
                        <Input name='contact_email' disabled={confirmLoading} onChange={onInputChange} value={item?.contact_email} />
                    </Form.Item>
                    <Form.Item label='Contacto teléfono' labelAlign='left' span={8}>
                        <Input name='contact_phone' disabled={confirmLoading} onChange={onInputChange} value={item?.contact_phone} />
                    </Form.Item>
                    <Form.Item label='Día limite pago' labelAlign='left' span={8}>
                        <InputNumber min={0} name='limit_pay_day' disabled={confirmLoading} onChange={(limit_pay_day) => onInputChangeByName('limit_pay_day', limit_pay_day)} value={item?.limit_pay_day} />
                    </Form.Item>
                </LayoutH>
            </Form>
        </Card>
    )
}
