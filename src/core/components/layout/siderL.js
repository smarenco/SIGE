import { Layout } from 'antd';


export default class SiderLeft extends React.Component {
  render() {
    return (
      <Layout.Sider
        collapsible
        collapsedWidth={0}
        reverseArrow
        theme='light'
        trigger={null}
        width={250}
        {...this.props}>
          {this.props.children}
      </Layout.Sider>
    )
  }
}