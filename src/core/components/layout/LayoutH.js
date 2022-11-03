import { Col, Row } from 'antd';
import React from 'react';

export default class extends React.Component {
    render() {
        const span = Math.floor(24 / React.Children.count(React.Children.map(this.props.children, child => child || undefined)));
        return (
            <Row gutter={8} {...this.props} style={{ marginBottom: 0, ...this.props.style }}>
                {React.Children.map(this.props.children, (child) => {
                    return child ? <Col span={child.props.span || span}>{child}</Col> : undefined
                })}
            </Row>
        );
    }
}