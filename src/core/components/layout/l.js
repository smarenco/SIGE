import { Col, Row } from 'antd';


export default class extends React.Component {
	render() {
		return (
			<Row type='flex' align='middle' justify='start' gutter={8} {...this.props}>
				{React.Children.map(this.props.children, (child) => (
					<Col>{child}</Col>
				))}
			</Row>
		);
	}
}