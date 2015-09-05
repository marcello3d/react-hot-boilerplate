const React = require('react')

const style = {
    border: 'solid 1px black',
    padding: 5
};

module.exports = React.createClass({
    displayName: 'SharedWidget',
    propTypes: {
        children:React.PropTypes.node
    },
    render() {
        return (
            <span style={style}><em>SharedWidget[{this.props.children}]</em></span>
        )
    }
});
