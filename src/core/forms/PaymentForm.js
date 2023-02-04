import React, { useEffect, useState } from 'react'

import { DatePicker, Form, Input, InputNumber, Select, Switch, Tag } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { renderError } from '../common/functions';
import { userCombo } from '../services/UserService';
import { courseCombo } from '../services/CourseService';
import TextArea from 'antd/lib/input/TextArea';
import { paymentMethodsCombo } from '../services/PaymentMethodsService';
import { DDMMYYYY } from '../common/consts';
import moment from 'moment';

export const PaymentForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName, onInputChangeByObject }) => {    

    const [loadingMethodsPayment, setLoadingMethodsPayment ] = useState([]);
    const [methodsPayment, setMethodsPayment ] = useState([]);
    const [loadingStudents, setLoadingStudents ] = useState([]);
    const [students, setStudents ] = useState([]);
    const [loadingCourses, setLoadingCourses ] = useState([]);
    const [courses, setCourses ] = useState([]);
    const [total, setTotal ] = useState([]);

    const fetchCourses = async () => {
        setLoadingCourses(true);
        try {
            const courses = await courseCombo({ user_id: formState.user_id });
            setCourses(courses);
            setLoadingCourses(false);
        } catch(err) {
            setLoadingCourses(false);
            renderError(err);
        }
    };

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const students = await userCombo({ type: 'EST'});
            setStudents(students);
            setLoadingStudents(false);
        } catch(err) {
            setLoadingStudents(false);
            renderError(err);
        }
    };

    const fetchMethodsPayment = async () => {
        setLoadingMethodsPayment(true);
        try {
            const methodsPayment = await paymentMethodsCombo();
            setMethodsPayment(methodsPayment);
            setLoadingMethodsPayment(false);
        } catch(err) {
            setLoadingMethodsPayment(false);
            renderError(err);
        }
    };

    useEffect(() => {
        fetchMethodsPayment();
        fetchStudents();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [formState.user_id]);

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
        let { surcharge, discount, amount_coute, quota_value } = formState;
        surcharge = !isNaN(parseInt(surcharge)) ? parseInt(surcharge) : 0;
        discount = !isNaN(parseInt(discount)) ? parseInt(discount) : 0;
        amount_coute = !isNaN(parseInt(amount_coute)) ? parseInt(amount_coute) : 0;
        quota_value = !isNaN(parseInt(quota_value)) ? parseInt(quota_value) : 0;
        
        console.log(surcharge, discount, amount_coute, quota_value)
        let total = 0;
        total = amount_coute * quota_value;
        total = total + surcharge - discount;

        setTotal(total);
    }, [formState.surcharge, formState.discount, formState.amount_coute, formState.quota_value]);

    const onChangeCourse = (course_id) =>{
        let course = courses.filter(course => course.id === course_id)[0];
        onInputChangeByObject({course_id, quota_value: course.quota_value});
    }

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Estudiante`} labelAlign='left' span={15}>
                        <Select
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingStudents}
                            loading={loadingStudents}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={student_id => onInputChangeByName('student_id', student_id)}
                            > 
                                {students.map(student => 
                                    <Select.Option value={student.id} key={student.id}>{student.names} {student.lastnames} - {student.document}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Metodo de pago`} labelAlign='left' span={9}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingMethodsPayment}
                            loading={loadingMethodsPayment}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={method_payment_id => onInputChangeByName('method_payment_id', method_payment_id)}
                            > 
                                {methodsPayment.map(methodPayment => 
                                    <Select.Option value={methodPayment.id} key={methodPayment.id}>{methodPayment.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Curso`} labelAlign='left' span={15}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingCourses}
                            loading={loadingCourses}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={onChangeCourse}
                            > 
                                {courses.map(course => 
                                    <Select.Option value={course.id} key={course.id}>{course.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label='Referencia' labelAlign='left' span={9}>
                        <Input name='reference' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.reference} />
                    </Form.Item>
                </LayoutH>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Fecha de pago`} labelAlign='left' span={22}>
                        <DatePicker disabled={view} name='payment_date' onChange={(payment_date) => onInputChangeByName('payment_date', payment_date)} format={DDMMYYYY} value={formState?.payment_date ? moment(formState?.payment_date)  : undefined}/>
                    </Form.Item>
                    <Form.Item label='Aplica descuento' labelAlign='left' span={8}>
                        <Switch name='apply_discount' disabled={view || confirmLoading} onChange={(apply_discount) => onInputChangeByName('apply_discount', apply_discount)} checked={formState?.apply_discount} />
                    </Form.Item>
                    <Form.Item label='Aplica recargo' labelAlign='left' span={8}>
                        <Switch name='apply_surcharge' disabled={view || confirmLoading || formState?.apply_discount} onChange={(apply_surcharge) => onInputChangeByName('apply_surcharge', apply_surcharge)} checked={formState?.apply_surcharge} />
                    </Form.Item>
                    <Form.Item label='Cantidad de cuotas' labelAlign='left' span={8}>
                        <InputNumber min={0} name='amount_coute' disabled={view || confirmLoading} onChange={(amount_coute) => onInputChangeByName('amount_coute', amount_coute)} value={formState?.amount_coute} />
                    </Form.Item>
                </LayoutH>
                <LayoutH>
                    <Form.Item label='Descuento' labelAlign='left' span={8}>
                        <InputNumber min={0} style={{borderColor: 'green'}} name='discount' disabled={view || confirmLoading || !formState?.apply_discount} onChange={(discount) => onInputChangeByName('discount', discount)} value={formState?.discount} />
                    </Form.Item>
                    <Form.Item label='Recargo' labelAlign='left' span={8}>
                        <InputNumber min={0} style={{borderColor: 'red'}} name='surcharge' disabled={view || confirmLoading || formState?.apply_discount || !formState?.apply_surcharge} onChange={(surcharge) => onInputChangeByName('surcharge', surcharge)} value={formState?.surcharge} />
                    </Form.Item>
                    <Form.Item label='Valor Couta' labelAlign='left' span={6}>
                        <InputNumber min={0} name='quota_value' disabled={view || confirmLoading} onChange={(quota_value) => onInputChangeByName('quota_value', quota_value)} value={formState?.quota_value} />
                    </Form.Item>
                    <Form.Item label='Observacion' labelAlign='left' span={22}>
                        <TextArea name='observation' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.observation} />
                    </Form.Item>
                    <div span={24} style={{textAlign: 'right'}}>
                        <h2 style={{marginRight: 40}}>Total  ${total}</h2>
                        {formState.canceled && <h2 style={{padding: 10, textAlign: 'center', backgroundColor: !formState.canceled && '#ffc7c7'}}>Cancelado el 02/05/2201{formState?.canceled_date} por {formState?.user_canceled?.names +' '+ formState?.user_canceled?.lastnames}</h2>}
                    </div>
                </LayoutH>
            </Loading>
        </Form>
    )
}