

import { Button, Form, Upload, message } from 'antd'
import Loading from '../components/common/Loading'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { API_URL } from '../../env';
import { ACCESS_TOKEN } from '../common/consts';

export const AttendanceItemForm = ({ loading, item, fileList, updateItem, updateAttendanceData }) => {
    const downloadJustificationFile = () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const url = `${API_URL}/justification/${item.justification_id}?token=${token}`; // Reemplaza con la URL de tu archivo
        window.open(url, '_blank');
    }

    useEffect(() => {
    }, [])

    return (
        <Form>
            <Form.Item
                style={{ margin: 0, padding: 0, height: 'auto' }}
                name={`attendance_observation`}
                rules={[
                    {
                        required: true,
                        message: `Please enter attendance for`,
                    },
                ]}
            >

                {item.justification_id === null ?
                    <Upload
                        onRemove={(file) => {
                            updateItem(1, 'justification', undefined)
                        }}
                        beforeUpload={(file) => {
                            updateItem(1, 'justification', file)
                            message.success(`Archivo ${file.name} cargado correctamente`)
                            return false;
                        }
                        }
                        fileList={fileList}
                        multilpe={false}
                    >
                        <Button icon={<UploadOutlined />}>Agregar Justificación</Button>
                    </Upload>
                    :
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={downloadJustificationFile}
                    >Descargar Justificación</Button>
                }
            </Form.Item>
            <Form.Item>
                <TextArea
                    style={{ marginTop: 10 }}
                    rows={4}
                    name={`attendance_observation`}
                    placeholder={'Observación'}
                    value={item.observation}
                    onChange={(e) => updateItem(1, 'observation', e.target.value)}
                />
            </Form.Item>
        </Form>
    )
}