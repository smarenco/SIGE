import { Col, Row } from 'antd';
import React from 'react';

export default class extends React.Component {
	render() {
		return React.Children.map(this.props.children, (child) => (
			<Row gutter={8} {...this.props} style={{ paddingBottom: 8, ...this.props.style }}>
				<Col span={24}>{child}</Col>
			</Row>
		));
	}
}