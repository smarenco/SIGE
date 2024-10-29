import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN } from '../common/consts';
import { API_URL } from '../../env';
import { attendanceUpdate } from '../services/AttendanceService';

export const MyAttendanceTable = ({ data: propAttendance, loading, uploadJustification: propUploadJustification }) => {
    const [attendance, setAttendance] = useState([]);
    const [justificationFileList, setJustificationFileList] = useState([]);

    const uploadJustification = (file) => {
        if (file !== undefined) {
            propUploadJustification(file);
        }
    }

    const columns = [
        {
            title: 'Dia',
            dataIndex: 'day',
            key: 'day',
            width: 60
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
            width: 90,
            render: (state) => (
                <Tag color={state === 'Presente' ? 'green' : 'red'}>
                    {state}
                </Tag>
            ),
        },
        { title: 'Observación', dataIndex: 'observation', key: 'observation', ellipsis: true },
        {
            title: 'Acción',
            key: 'action',
            width: 80,
            render: (text, record) => (
                record.justification_id === null ?
                    <Upload
                        onRemove={(file) => {
                            uploadJustification(undefined)
                        }}
                        beforeUpload={(file) => {
                            uploadJustification(file)
                            message.success(`Archivo ${file.name} cargado correctamente`)
                            return false;
                        }
                        }
                        fileList={[]}
                        multilpe={false}
                    >
                        <Button icon={<PlusCircleOutlined />} />
                    </Upload>
                    :
                    <Button
                        type='default'
                        icon={<DownloadOutlined />}
                        onClick={() => downloadJustification(record?.justification_id)}
                    />
            ),
        },
    ];

    const downloadJustification = (justificationId) => {
        if(justificationId){
            const token = localStorage.getItem(ACCESS_TOKEN);
            const url = `${API_URL}/justification/${justificationId}?token=${token}`; // Reemplaza con la URL de tu archivo
            window.open(url, '_blank');
        }
    }

    useEffect(() => {
        let transformedAttendance = [];

        if (propAttendance.length > 0) {
            transformedAttendance = Object.keys(propAttendance[0])
                .filter(key => key !== 'student_id' && key !== 'student_name')
                .map(day => ({
                    day,
                    state: propAttendance[0][day].state ? 'Presente' : 'Falta',
                    observation: propAttendance[0][day]?.observation,
                    justification_id: propAttendance[0][day]?.justification_id,
                }));
        }

        setAttendance(transformedAttendance)
    }, [propAttendance]);

    return (
        <Table
            columns={columns}
            dataSource={attendance}
            loading={loading}
            scroll={{ x: '100%', y: 500 }}
        />
    )
}