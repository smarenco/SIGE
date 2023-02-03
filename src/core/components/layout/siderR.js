import { Layout } from 'antd';


export default class extends React.Component {
	render() {
		return (
			<Layout.Sider
				collapsible
				collapsedWidth={0}
				reverseArrow
				theme='light'
				trigger={null}
				width={320}
				{...this.props}>
				{this.props.children}
			</Layout.Sider>
		)
	}
}