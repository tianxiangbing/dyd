'use strict'
import React from 'react';

//所有组件
let MyFans = require('../stages/MyFans')
let MyCollection = require('../stages/MyCollection')

require("./../assets/css/iconf/iconfont.css")
require("./../assets/css/note.css")

//let Link = require('../factory/Link');

class MyAttention extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            swit:true,
            scontin:true
        }
    }
    componentWillMount(){
        this.props.win.setHeader("","我的关注","")
    }
    handleTopic(){
        this.setState({
            swit:true,
            scontin:true
        })
    }
    handleAttention(){
        this.setState({
            swit:false,
            scontin:false
        })
    }

    renderCollection(){
        return  <MyCollection/>
    }
    renderFans(){
        return <MyFans/>
    }

    render(){
        return(
            <div>
                <div className={"o_tran bt"}>
                    <ul>
                        <li className={this.state.swit?" on ":"stats"}  onClick={this.handleTopic.bind(this)}><a href="javascript:void(0)">我关注的话题</a></li>
                        <li className={this.state.swit?"detail":"on"} onClick={this.handleAttention.bind(this)}><a href="javascript:void(0)">我关注的人</a></li>
                    </ul>
                </div>
                <div className="content">
                    {
                        this.state.scontin?this.renderCollection():this.renderFans()
                    }
                </div>
            </div>
        )
    }
}
module.exports = MyAttention;