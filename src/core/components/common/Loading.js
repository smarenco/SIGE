import React from 'react'
import { Spin } from 'antd';

const styleSpinner = {
    textAlign: 'center',
    padding: '30px 50px',
    margin: '20px 0',
}

export default class extends React.Component {

    render() {
        if (this.props.loading) {
            return (<div style={{ ...styleSpinner, ...this.props.style }}><Spin tip={this.props.tip || 'Cargando...'} /></div>);
        } else {
            return this.props.children;
        }
    }

}