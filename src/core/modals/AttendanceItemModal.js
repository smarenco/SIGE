import { Modal, Tag } from 'antd'
import { AttendanceItemForm } from '../forms/AttendanceItemForm';
import { useEffect, useState } from 'react';
import { renderError } from '../common/functions';
import Loading from '../components/common/Loading';

export const AttendanceItemModal = ({ item, open, onOk: onOkProp, loading, onCancel: onCancelProp }) => {
    const [auxItem, setAuxItem] = useState({})
    const [justificationFileList, setJustificationFileList] = useState([]);

    const onChangeAttendanceItem = (id, attribute, value) => {
        // console.log(id, attribute, value)
        if (attribute === 'observation') {
            setAuxItem({ ...auxItem, [attribute]: value })
        }
        if (attribute === 'justification') {
            if (value !== undefined) {
                setAuxItem({ ...auxItem, [attribute]: value })
                setJustificationFileList([value])
            } else {
                setJustificationFileList([])
            }
        }
    }

    const onOk = () => {
        onOkProp(auxItem);
        setAuxItem({})
        setJustificationFileList([])
    }

    const onCancel = () => {
        setAuxItem({})
        setJustificationFileList([])
        onCancelProp();
    }

    useEffect(() => {
        setAuxItem(item)
        // console.log(auxItem)
    }, [item])

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            title={<span>Item Asistencia {item.state ? <Tag color='green'>Asistió</Tag> : <Tag color='red'>No asistió</Tag>}</span>}
            style={{ paddingTop: 10 }}
        >
            {
                loading ?
                    <Loading loading={loading} />
                    :
                    <AttendanceItemForm
                        loading={loading}
                        item={auxItem}
                        updateItem={onChangeAttendanceItem}
                        fileList={justificationFileList}
                    />
            }
        </Modal>
    );
}
