import React from 'react';
import ReactDOM from 'react-dom';
//所有组件
import {E,S,T} from './module/index';
require('./module/assets/css/animation.css')
require('./module/assets/css/note.css')

const shareLink = T.shareLink
//所有页面
'use strict'
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

        let hash = location.hash.slice(1)

        var current = shareLink.analyze(hash)

        let stage = current?this.props.stages[current.stage]:undefined

        //this.state.home = S.Home
        this.state.home = S.Index

        this.state.options = {
            "downword":"下拉加载更多",
            "upword":"上拉加载更多",
            //配置了就有，没配置就没有这个功能
            onDropDown:function(dropBack){
                dropBack()
            },
            onDropUp:function(dropBack){
                dropBack()
            }
        }
        if(stage){
            this.state.home = stage
            this.state.options = current.props
        }

        window.App = this;
    }

    componentDidMount(){
        console.log(shareLink.create("Index",{},{}))
    }

    //切换场景时候触发，处理公共组件的隐藏
    onSwitchStage(){
        this.setState({
            dialog:0,
            messageInput:0
        })
    }

    alert(msg, callback) {
        callback = (callback && callback instanceof Function) ? callback : function () {
        };
        this.setState({
            dialog: {
                title: "提示",
                show: true,
                content: msg,
                buttons: [{
                    text: "知道了",
                    cls:"ok",
                    events: {
                        click(){
                            callback();
                            this.close();
                        }
                    }
                }]
            }
        })
    }
    confirm(msg,callback){
        callback = (callback && callback instanceof Function) ? callback : function () {
        };
        this.setState({
            dialog: {
                title: "提示",
                show: true,
                content: msg,
                buttons: [{
                    text: "取消",
                    events: {
                        click(){
                            this.close();
                        }
                    }
                },{
                    text: "确定",
                    cls:"ok",
                    events: {
                        click(){
                            callback();
                            this.close();
                        }
                    }
                }]
            }
        })
    }
    tip(msg){
        this.setState({
            dialog: {
                show: true,
                title: msg,
            }
        })
        setTimeout(()=>{
            this.setState({
                dialog:0
            });
        },2000);
    }
    renderDialog(){
        return <E.Dialog App={this} {...this.state.dialog}/>
    }
    open(){
        this.alert('hehehe');
    }
    close(){
        this.setState({dialog:null});
    }
    MI(state){
        this.setState({
            messageInput:state
        })
    }
    renderMI(){
        return <E.MessageInput {...this.state.messageInput}/>
    }
    render(){
        return(
            <div id="app">
                <E.Win stage={this.state.home} options={this.state.options} parent={undefined}>

                </E.Win>
                {this.state.dialog?this.renderDialog():undefined}
                {this.state.messageInput?this.renderMI():undefined}
            </div>
        )
    }
}

ReactDOM.render(<App stages={S} />, document.querySelector("#container"));

