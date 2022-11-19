import React, { useEffect, useState } from 'react'

import { Form, Input, InputNumber, Select, Switch, Tag } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { renderError } from '../common/functions';
import { userCombo } from '../services/UserService';
import { courseCombo } from '../services/CourseService';
import TextArea from 'antd/lib/input/TextArea';
import { paymentMethodsCombo } from '../services/PaymentMethodsService';

export const PaymentForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName, onInputChangeByObject }) => {    

    const [methodsPayment, setMethodsPayment ] = useState([]);
    const [students, setStudents ] = useState([]);
    const [courses, setCourses ] = useState([]);
    const [total, setTotal ] = useState([]);

    const fetchCourses = async () => {
        try {
            const courses = await courseCombo({ user_id: formState.user_id });
            setCourses(courses);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchStudents = async () => {
        try {
            const students = await userCombo({ type: 'EST'});
            setStudents(students);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchMethodsPayment = async () => {
        try {
            const methodsPayment = await paymentMethodsCombo();
            setMethodsPayment(methodsPayment);
        } catch(err) {
            renderError(err);
        }
    };

    /*useEffect(() => {
        fetchMethodsPayment();
        fetchStudents();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [formState.user_id]);*/

    useEffect(() => {
        onInputChangeByObject(
            {
                apply_surcharge: false, 
                surcharge: undefined, 
                discount: undefined, 
            } 
        );
    }, [formState.apply_discount]);

    useEffect(() => {
        onInputChangeByName('surcharge', undefined);
    }, [formState.apply_surcharge]);

    useEffect(() => {
        let { surcharge, discount, amount_coute, value_coute } = formState;
        surcharge = !isNaN(parseInt(surcharge)) ? parseInt(surcharge) : 0;
        discount = !isNaN(parseInt(discount)) ? parseInt(discount) : 0;
        amount_coute = !isNaN(parseInt(amount_coute)) ? parseInt(amount_coute) : 0;
        value_coute = !isNaN(parseInt(value_coute)) ? parseInt(value_coute) : 0;
        
        console.log(surcharge, discount, amount_coute, value_coute)
        let total = 0;
        total = amount_coute * value_coute;
        total = total + surcharge - discount;

        setTotal(total);
    }, [formState.surcharge, formState.discount, formState.amount_coute, formState.value_coute]);

    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Estudiante`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={user_id => onInputChangeByName('user_id', user_id)}
                            > 
                                {students.map(student => 
                                    <Select.Option value={student.id} key={student.id}>{student.name} - {student.document}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Curso`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={course_id => onInputChangeByName('course_id', course_id)}
                            > 
                                {courses.map(course => 
                                    <Select.Option value={course.id} key={course.id}>{course.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Metodo de pago`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={method_payment_id => onInputChangeByName('method_payment_id', method_payment_id)}
                            > 
                                {methodsPayment.map(methodPayment => 
                                    <Select.Option value={methodPayment.id} key={methodPayment.id}>{methodPayment.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label='Referencia' labelAlign='left' span={12}>
                        <Input name='reference' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.reference} />
                    </Form.Item>
                </LayoutH>
                <LayoutH>
                    <Form.Item label='Aplica descuento' labelAlign='left' span={6}>
                        <Switch name='apply_discount' disabled={view || confirmLoading} onChange={(apply_discount) => onInputChangeByName('apply_discount', apply_discount)} checked={formState?.apply_discount} />
                    </Form.Item>
                    <Form.Item label='Aplica recargo' labelAlign='left' span={6}>
                        <Switch name='apply_surcharge' disabled={view || confirmLoading || formState?.apply_discount} onChange={(apply_surcharge) => onInputChangeByName('apply_surcharge', apply_surcharge)} checked={formState?.apply_surcharge} />
                    </Form.Item>
                    <Form.Item label='Cantidad de cuotas' labelAlign='left' span={6}>
                        <InputNumber name='amount_coute' disabled={view || confirmLoading} onChange={(amount_coute) => onInputChangeByName('amount_coute', amount_coute)} value={formState?.amount_coute} />
                    </Form.Item>
                </LayoutH>
                <LayoutH>
                    <Form.Item label='Descuento' labelAlign='left' span={6}>
                        <InputNumber style={{borderColor: 'green'}} name='discount' disabled={view || confirmLoading || !formState?.apply_discount} onChange={(discount) => onInputChangeByName('discount', discount)} value={formState?.discount} />
                    </Form.Item>
                    <Form.Item label='Recargo' labelAlign='left' span={6}>
                        <InputNumber style={{borderColor: 'red'}} name='surcharge' disabled={view || confirmLoading || formState?.apply_discount || !formState?.apply_surcharge} onChange={(surcharge) => onInputChangeByName('surcharge', surcharge)} value={formState?.surcharge} />
                    </Form.Item>
                    <Form.Item label='Valor Couta' labelAlign='left' span={6}>
                        <InputNumber name='value_coute' disabled={view || confirmLoading} onChange={(value_coute) => onInputChangeByName('value_coute', value_coute)} value={formState?.value_coute} />
                    </Form.Item>
                    <Form.Item label='Total' labelAlign='left' span={6}>
                        <Tag color='green'>{total}</Tag>
                    </Form.Item>
                    <Form.Item label='Observacion' labelAlign='left' span={20}>
                        <TextArea name='observation' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.observation} />
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}