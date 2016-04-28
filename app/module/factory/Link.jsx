'use strict'
var React = require('react');

module.exports = React.createFactory(
    class A extends React.Component {
        constructor(props) {
            super(props)
            /**
             * target:在哪里开启,"_blank"
             * stage:要打开什么页面,E.*
             */
        }
        open(){
            let [stage,win] = [this.props.stage,this.props.win]
            win.open(stage)
        }
        render() {
            return <a onClickCapture={this.open.bind(this)}>{this.props.data.say}</a>
        }
    }


);