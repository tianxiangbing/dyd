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

        this.state.home = S.Home
        if(stage){
            this.state.home = stage
            this.state.options = current.props
        }

        window.App = this;
    }
    onSwitchStage(){
        this.setState({
            dialog:0,
            messageInput:0
        })
    }
    alert(msg,callback){
        callback = (callback&&callback instanceof Function)?callback:function(){};
        this.setState({dialog:{
            title:"提示",
            show:true,
            content:msg,
            buttons:[{
                text:"知道了",
                events:{
                    click(){
                        callback();
                        this.close();
                    }
                }
            }]
        }})
    }
    renderDialog(){
        return <E.Dialog {...this.state.dialog}/>
    }
    MI(state){
        this.setState({
            messageInput:state
        })
    }
    renderMI(){
        return <E.MessageInput {...this.state.messageInput}/>
    }
    renderImgPreview(){
        return <E.ImgPreview {...this.state.ImgPreview}/>
    }
    render(){
        return(
            <div id="app">
                <E.Win stage={this.state.home}  options={this.state.options} parent={undefined}>

                </E.Win>
                {this.state.dialog?this.renderDialog():undefined}
                {this.state.messageInput?this.renderMI():undefined}
                {this.state.ImgPreview?this.renderImgPreview():undefined}
            </div>
        )
    }
}

ReactDOM.render(<App stages={S} />, document.querySelector("#container"));

