

import { Button, DatePicker, Form, Modal, Select, Table, Upload, message } from 'antd'
import Loading from '../components/common/Loading'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DDMMYYYY } from '../common/consts';

export const AttendanceListForm = ({ setStudents, setFecha, fecha, restoreAttendanceObservationData, onChangeAttendanceData, setModalAttendanceObservationItem, modalAttendanceObservationItem, setModalAttendanceObservationAuxItem, setJustificationFileList, justificationFileList, formStudents, view, loading, confirmLoading }) => {
    const [showModalAttendanceObservation, setShowModalAttendanceObservation] = useState(false);

    const columns = [
        {
            title: 'Estudiante',
            key: 'name',
            ellipsis: true,
            render: (_, record) => `${record.names} ${record.lastnames}`
        },
        {
            title: `Estado`,
            key: 'estado',
            width: 150,
            render: (_, record) => {
                return (
                    <Form.Item
                        style={{ margin: 0, padding: 0, height: 'auto' }}
                        rules={[
                            {
                                required: true,
                                message: `Please enter attendance for ${record.name}`,
                            },
                        ]}
                    >
                        <Select
                            name={`attendance_state_${record.id}`}
                            disabled={loading}
                            onChange={(e) => onChangeAttendanceData(record.id, 'state', e)}
                            value={record.state}
                        >
                            <Select.Option value={true} key={`${record.id}_asistio`}>Asisitió</Select.Option>
                            <Select.Option value={false} key={`${record.id}_no_asistio`}>No asisitió</Select.Option>
                        </Select>
                    </Form.Item>
                )
            },
        },
        {
            title: '',
            key: 'attendance_observation',
            width: 50,
            render: (_, record) => <Button onClick={() => {
                setModalAttendanceObservationItem({ ...record })
                setModalAttendanceObservationAuxItem({ ...record })
                if (record.justification !== undefined) {
                    setJustificationFileList([record.justification])
                }
            }} icon={<PlusCircleOutlined />} />
        }
    ];

    const onChangeDate = (value) => {
        setFecha(value)
    }

    useEffect(() => {
        if (modalAttendanceObservationItem === undefined) setShowModalAttendanceObservation(false)
        setShowModalAttendanceObservation(true)
    }, [modalAttendanceObservationItem])

    return (
        loading ? <Loading /> : <Form>
            <Form.Item label='Fecha de asistencia' value={fecha} labelAlign='left' span={5}>
                <DatePicker name='attendance_date' value={fecha} disabled={view || confirmLoading} onChange={(attendance_date) => onChangeDate(attendance_date)} format={DDMMYYYY} />
            </Form.Item>
            <Table
                dataSource={formStudents}
                key={'id'}
                columns={columns}
                pagination={false}
                bordered
                size='small'
            />
            {modalAttendanceObservationItem && <Modal
                open={showModalAttendanceObservation}
                onCancel={() => restoreAttendanceObservationData(true)}
                onOk={() => restoreAttendanceObservationData(false)}
                title='Datos Extra'
                style={{ paddingTop: 10 }}
            >
                <Form>
                    <Form.Item
                        style={{ margin: 0, padding: 0, height: 'auto' }}
                        name={`attendance_observation`}
                        rules={[
                            {
                                required: true,
                                message: `Please enter attendance for ${modalAttendanceObservationItem.name}`,
                            },
                        ]}
                    >
                        {modalAttendanceObservationItem && <Upload
                            onRemove={(file) => {
                                onChangeAttendanceData(modalAttendanceObservationItem.id, 'justification', undefined)
                            }}
                            beforeUpload={(file) => {
                                onChangeAttendanceData(modalAttendanceObservationItem.id, 'justification', file)
                                message.success(`Archivo ${file.name} cargado correctamente`)
                                return false;
                            }
                            }
                            fileList={justificationFileList}
                            multilpe={false}
                        >
                            <Button icon={<UploadOutlined />}>Agregar Justificación</Button>
                        </Upload>}
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            style={{ marginTop: 10 }}
                            rows={4}
                            name={`attendance_observation`}
                            placeholder={'Observación'}
                            value={modalAttendanceObservationItem.attendance_observation}
                            onChange={(e) => onChangeAttendanceData(modalAttendanceObservationItem.id, 'attendance_observation', e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>}
        </Form>
    )
}