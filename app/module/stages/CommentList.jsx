import React from 'react';
let fetch = self.fetch;
import '../assets/css/note.css';

class CommentList extends React.Component{
    constructor(props){
        super(props)

        props.win.setHeader("","全部评论","")

        this.state={list:null}
    }
    componentDidMount(){
        let context = this;
        fetch("mock/commentList.json")
            .then(response=>response.json())
            .then((json)=>{
                context.setState({
                    list:json
                })
            });
        this.openMI("发表一条评论");
    }
    openMI(p){
        var _this = this;
        window.App.MI({
            placeholder:p,
            "text":"发送",
            show:true,
            onSend:(msg,context)=>{
                console.log(msg,context)
                _this.replyHandle(msg);
                window.App.alert(msg)
            }
        })
    }
    replyHandle(msg){
        let context = this;
        if(msg=="")return;
        fetch("mock/comment.json")
            .then(response=>response.json())
            .then((json)=>{
                let list =context.state.list.concat([json]);
                context.setState({
                    list:list
                })
            });
    }
    sendMsg(item){
        this.openMI('回复'+item.name);
    }
    render(){
        return (
          <div>
              <article className="comment-c">
                      {
                          (this.state.list||[]).map((item,index)=>{
                              return (
                                  <section key={index} className="comment-c-s" onClick={this.sendMsg.bind(this,item)}>
                                      <p><span className="iu" style={{backgroundImage:"url("+item.tx+")",display:"inline-block"}}></span><label>{item.name}</label><time>{item.date}</time></p>
                                      <p><span className="reply">{item.reply?"回复"+item.reply+"":""}</span>{item.content}</p>
                                  </section>
                              )
                          })
                      }
                </article>
          </div>
        );
    }
}
module.exports = CommentList;