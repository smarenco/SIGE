

export default class extends React.Component {
	render() {
		const alignItems = this.props.alignItems || 'center';
		const justifyContent = this.props.justifyContent || 'left';
		const gutter = this.props.gutter || 10;
		return (
			<div style={{ display: 'flex', alignItems, justifyContent, ...this.props.style}}>
				{React.Children.map(this.props.children, (child) => {
                    if (child && child.props) {
                        let flexGrow = child.props.flexGrow || 0;
                        let gutterChild = child.props.gutter || gutter;
                        return (<div style={{ flexGrow, margin: gutterChild }}>{child}</div>);
                    }
				})}
			</div>
		);
	}
}