import { useState } from 'react';

export const useAttendanceList = ( formStudents = [], formValidations = {}) => {
    const [students, setStudents] = useState(formStudents.map(record => ({ names: record.names, lastnames: record.lastnames, id: record.id })));
    const [modalAttendanceObservationItem, setModalAttendanceObservationItem] = useState(undefined);
    const [modalAttendanceObservationAuxItem, setModalAttendanceObservationAuxItem] = useState(undefined);
    const [justificationFileList, setJustificationFileList] = useState([]);

    const onChangeAttendanceData = (id, attribute, value) => {
        const updatedStudents = students.map(student => {
            if (student.id === id) {
                const updatedStudent = {
                    ...student,
                    [attribute]: value
                };
                return updatedStudent
            }
            return student
        });
        setStudents(updatedStudents);
        if (attribute !== 'state') {
            setModalAttendanceObservationItem({ ...modalAttendanceObservationItem, [attribute]: value })
        }
        if (attribute === 'justification') {
            if (value !== undefined) {
                setJustificationFileList([value])
            } else {
                setJustificationFileList([])
            }
        }
    }

    const restoreAttendanceObservationData = (restore) => {
        const updatedStudents = students.map(student => {
            if (student.id === modalAttendanceObservationItem.id && restore) {
                return modalAttendanceObservationAuxItem
            }
            if (student.id === modalAttendanceObservationItem.id && !restore) {
                return modalAttendanceObservationItem
            }
            return student
        });
        setStudents(updatedStudents);
        setModalAttendanceObservationItem(undefined)
        setModalAttendanceObservationAuxItem(undefined)
        setJustificationFileList([])
    }

    

    return {
        setStudents,
        students,
        restoreAttendanceObservationData,
        setModalAttendanceObservationItem,
        modalAttendanceObservationItem,
        setModalAttendanceObservationAuxItem,
        onChangeAttendanceData,
        setJustificationFileList,
        justificationFileList,
    }
}