'use strict'
var React = require('react');

var ReactDOM = require('react-dom');

require('./../assets/css/dialog.css')

class MessageInput extends React.Component {
    constructor(props) {
        console.log("props",props)
        super(props)
        this.state = {
            placeholder:props.placeholder||"输入文本",
            text:props.text||"发送",
            show:props.show||false
        }
    }
    getMessage(){
        let message = this.refs.input.value;
        let onSend = this.props.onSend;
        if(onSend && onSend instanceof Function){
            onSend(message,this)
        }
        this.refs.input.value=""
        this.refs.input.blur()
    }
    componentWillReceiveProps(props){
        this.setState({
            placeholder:props.placeholder||"",
            text:props.text||"发送",
            show:props.show||false
        })

    }
    show(state){
        state.show = true;
        this.setState(state);
        //ReactDOM.findDOMNode(this.refs.input).focus()
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.input).focus()
    }
    componentWillUpdate(){
        ReactDOM.findDOMNode(this.refs.input).focus()
    }
    render() {
        let states = this.state || {};
        let context = this;
        return (
            <footer className="comment-footer" style={context.state.show?{}:{display:"none"}}>
                <p><input type="text" ref="input" placeholder={states.placeholder}/><a href="#" onClickCapture={context.getMessage.bind(this)}>{states.text}</a></p>
            </footer>
        )
    }
}
module.exports = MessageInput;