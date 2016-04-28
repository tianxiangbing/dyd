import React from "react";
import Note from '../components/Note';
import '../assets/css/news.css';

class MyMessage extends React.Component{
    constructor(props) {
        super(props)
        this.state={list:null}
    }
    componentWillMount(){
        this.props.win.setHeader("","所有消息","")
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
    }
    replyHandle(){
        let context = this;
        if(this.refs.replyContent.value=="")return;
        fetch("mock/comment.json")
            .then(response=>response.json())
            .then((json)=>{
                App.alert('回复成功');
            });
        this.refs.replyContent.value=""
        console.log(this.refs.replyContent.value)
    }
    CommentHandle(item){
        this.openMI('回复'+item.name+'：');
    }

    openMI(p,user){
        var _this = this;
        window.App.MI({
            placeholder:p,
            "text":"发送",
            show:true,
            onSend:(msg,context)=>{
                console.log(msg,context)
                window.App.alert(msg)
            }
        })
    }
    render(){
        return (
            <div>
                <article className="news-c">
                    {
                        (this.state.list||[]).map((item,index)=>{
                            return (
                                <section key={index}>
                                    <div className="news-c-t">
                                        <span className="iu" style={{backgroundImage:"url("+item.tx+")",display:"inline-block"}}></span><label><p>{item.name}</p><time>16-02-14  14:14</time></label><button onClick={this.CommentHandle.bind(this,item)}>回复</button>
                            </div>
                                    <div className="news-c-c">
                                        <ul>
                                            {item.reply?<li className="reply">回复<span>{item.reply}</span>{item.content}</li>:""}
                                            <li name={item.reply}>{item.content}</li>
                                        </ul>
                                    </div>
                                    <Note img={item.note.img} content={item.note.content}></Note>
                                </section>

                            )
                        })
                    }
                </article>
            </div>
        );
    }
}
module.exports = MyMessage
