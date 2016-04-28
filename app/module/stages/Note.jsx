'use strict'
import React from 'react';

require("./../assets/css/note.css")

//let Link = require('../factory/Link');

let fetch = self.fetch;

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    reply(item){
        window.App.MI({
            placeholder:"回复："+item.uname,
            "text":"发送",
            show:true,
            onSend:(msg,context)=>{
                //发送
            }
        })
    }
    render(){
        var item = this.props.item;
        return(
            <section className="comment-c-s" onClickCapture={this.reply.bind(this,item)}>
                <p><span className="iu"><img src={item.tx}/></span><label>{item.uname}</label><time>{item.time}</time></p>
                <p><span className="reply">{item.repname}</span>{item.reply}</p>
            </section>
        )
    }
}
class Note extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            noteitems:{}
        }
    }

    componentDidMount(){
        let context = this;
        fetch("mock/notes.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json)
                context.setState({noteitems:json});
            });

        window.App.MI({
            placeholder:"添加一条评论",
            "text":"发送",
            show:true,
            onSend:(msg,context)=>{
                //发送
            }
        })

    }

    noteRender(items){
        let context = this;
        return(
            <div>
                {
                    [].map.call(context.state.noteitems.data||[],function(item,idx){
                        return <Item item={item} key={idx} />
                    })
                }
            </div>
        )
    }
    render(){
        return(
            <article className="comment-c">
                {this.noteRender()}
            </article>
        )
    }
}
module.exports = Note;