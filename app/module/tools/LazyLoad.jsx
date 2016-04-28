'use strict'
var React = require('react');

class LazyLoad extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            src:"data:image/jpeg;base64,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"
        }
    }
    componentDidMount(){
        setTimeout(function(){
            this.setState({
                src:this.props.src
            })
        }.bind(this),1000)
    }
    render(){
        return <img src={this.state.src} style={this.props.style} className={this.props.className}/>
    }
}
module.exports = LazyLoad;