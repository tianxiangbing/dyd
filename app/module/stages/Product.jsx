
'use strict'
import React from 'react';

let Link = require('../factory/Link')

class Product extends React.Component {
    constructor(props){
        super(props)
        let [a,b] = [Math.random(),Math.random()]

        console.log(a,b)
        this.state = {
            style:a>b?{background:"red"}:{background:"green"}
        }
    }
    render(){
        let [win,parent] = [this.props.win,this.props.win.props.parent]
        return (<div style={this.state.style}>
            Product 页面，浏览单品
            {Link({
                win:win,
                stage:window.App.props.stages.Product,
                data:{
                    say:"测试属性，暂时别用"
                }
            })}
        </div>)
    }
}
module.exports = Product;