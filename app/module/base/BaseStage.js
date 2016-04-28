/**
 * Created by Administrator on 2016/4/28.
 */
import React from 'react'
import ReactDOM from 'react-dom'
const shareLink = require('./../tools/shareLink')
/**
 * 场景基类,提供场景常用基础函数
 */
class BaseStage extends React.Component{
    constructor(props){
        super(props)
    }
    _open(stage,props){
        let win = this.props.win;
        if(!!win
            && win.open
            && win.open instanceof Function){
            win.open(stage,props)
        }
    }
    _setHeader(left,center,right){
        let win = this.props.win;
        if(!!win
            && win.setHeader
            && win.setHeader instanceof Function){
            win.setHeader(left,center,right)
        }
    }
    _getShareLink(p,s){
        return shareLink.create(this,p||{},s||{})
    }
}
module.exports = BaseStage;