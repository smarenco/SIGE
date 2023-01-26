
import { Button, Form, Input, Select, Tabs } from 'antd'
import { useEffect, useState } from 'react';
import { typesCategories } from '../common/consts';
import { alertError, renderError } from '../common/functions';
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { documentCombo } from '../services/DocumentService';
import { DocumentCategoryDocumentTable } from '../tables/DocumentCategoryDocumentTable';

export const DocumentCategoryForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    let [documents, setDocuments ] = useState([]);
    let [loadingDocuments, setLoadingDocuments ] = useState(false);
    let [documentSelected, setDocumentSelected ] = useState(undefined);

    const addDocument = () =>{
        if(!documentSelected){
            alertError('Debe seleccionar un documento');
            return;
        }

        let formStateDocument = formState.documents;
        const documentExists = formStateDocument.filter(document => document.id === documentSelected);

        if(documentExists.length > 0){
            alertError('Documento ya agregado');
            return false;
        }

        formStateDocument.push(documents.filter(document => document.id === documentSelected)[0]);
        onInputChangeByName('documents', formStateDocument);
    }

    const deleteDocument = (idDocument) =>{
        let formStateDocuments = formState.documents.filter(document => document.id !== idDocument);
        onInputChangeByName('documents', formStateDocuments);
    }

    const fetchDocuments = async () => {
        setLoadingDocuments(true);
        try {
            const documents = await documentCombo();
            setDocuments(documents);
            setLoadingDocuments(false);
        } catch(err) {
            setLoadingDocuments(false);
            renderError(err);
        }
    };

    useEffect(() => {
        fetchDocuments();
      }, []);

    const items = [
        { 
            label: 'Datos Basicos', 
            key: 'info_basic', 
            children:
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Tipo categoria`} labelAlign='left' span={7}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='type'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(type) => onInputChangeByName('type', type)} 
                            value={formState?.type}
                        >
                            {typesCategories.map(type => 
                                <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </LayoutH>,
        }, {
            label: 'Documentos', 
            key: 'info_documents', 
            children: 
                <>
                    <LayoutH>
                        <Form.Item label={`Documento`} labelAlign='left' span={12}>
                            <Select 
                                allowClear
                                showSearch
                                disabled={view || confirmLoading || loadingDocuments}
                                loading={loadingDocuments}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={documentSelected => setDocumentSelected(documentSelected)}
                                > 
                                    {documents.map(document => 
                                        <Select.Option key={document.id} value={document.id}>{document.name}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Button style={{marginTop: 30}} type='Primary' onClick={addDocument}>Agregar Documento</Button>
                    </LayoutH>
                    <DocumentCategoryDocumentTable
                        data={formState.documents}
                        onDeleteDocument={deleteDocument}
                    />
                </>
        }

    ];

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <Tabs
                    style={{ marginTop: -15 }}
                    size='small'
                    items={items}
                />
            </Loading>
        </Form>
    )
}