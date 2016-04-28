'use strict'
import React from 'react';

require("./../assets/css/iconf/iconfont.css")
require("./../assets/css/note.css")

//let Link = require('../factory/Link');
let fetch = self.fetch;

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            state:this.props.state
        }
    }
    follHandle(){
        if(this.state.state===2){
            this.setState({
                state:3
            })
        }else{
            this.setState({
                state:2
            })
        }
    }
    render(){
        let item = this.props.item;
        return(
            <a className="fans_list" href="javascript:;">
                <p className="ufans">
                    <i className="iu"><img src={item.tx}/><em name={item.uname} tip="new"></em></i>
                    <span onClick={this.follHandle.bind(this)}><i className={(this.state.state===1?"icon-followed gray":(this.state.state===2?"icon-follow yellow":"icon-fans blue"))}></i></span>
                </p>
            </a>
        )
    }
}
class MyFans extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fanitems:{}
        }
    }

    componentWillMount(){
        if(this.props.win){
            if(this.props.win.props.options.statcs) {
                this.props.win.setHeader("", "我的粉丝", "")
            }
        }
    }

    componentDidMount(){
        let context = this;let win = this.props.win;
        fetch("mock/myFans.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json)
                context.setState({fanitems:json});
            });
        //win.setHeader('','我的粉丝','')
    }
    peopeRender(){
        return(
            <div className="fans_lists follow_box bt">
                {
                    (this.state.fanitems.data||[]).map(function(item,idx){
                        return <Item item={item} key={idx} state={item.state}/>
                    })
                }
            </div>
        )
    }
    render(){
        var items = [
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 3},
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 2},
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 3},
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 2},
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 3},
            {uname: 'Sporting',tx:'../app/assets/images/tx.png', state: 1},
        ];
        return(
            <div>
                <div className="content">
                    <div className="detc con"> {this.peopeRender()}</div>
                </div>
            </div>
        )
    }
}
module.exports = MyFans;