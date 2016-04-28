/*话题详情
 * by tianxiangbing 2016.4.21
 * */
"use strict";
import React from "react";
import "../assets/css/note.css";
import "../assets/css/launch.css";

import AboutGoods from "../components/AboutGoods";
import AboutNote from "../components/AboutNote";

import LazyLoad from 'react-lazy-load';

let Swiper = require('../components/Swiper')
let {Component}=React;
let fetch = self.fetch;

/*笔记详情*/
class NoteDetail extends Component{
    constructor(props){
        super(props);
        this.displayName = "笔记详情"
        this.state ={detail:{},aboutNotes:null,isheart:false,isstar:false,heart:0,star:false,follow:false};
    }
    componentWillMount(){
        this.props.win.setHeader("","笔记详情","")
    }
    componentDidMount(){
        let context = this;
        fetch("mock/noteDetail.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json)

                context.setState({
                    detail:json,
                    isheart:json.isheart,
                    heart:json.heart,
                    star:json.star,
                    follow:json.follow
                })

            });
        fetch("mock/aboutNote.json")
            .then(response=>response.json())
            .then((json)=>{
                context.setState({
                    aboutNotes:json
                })
            });
        fetch("mock/aboutGoods.json")
            .then(response=>response.json())
            .then((json)=>{
                context.setState({
                    aboutGoods:json
                })
            });
    }
    PraiseHandle(){
        this.props.win.open("Praise",{title:'点赞数（'+this.state.detail.praise_count+'）'});
    }
    AllComment(){
        this.props.win.open("CommentList",{title:'笔记评价（'+this.state.detail.comments_count+'）'});
    }
    heartHandle(){
        fetch("mock/heart.json").then(function(){
            if(!this.state.isheart){
                this.setState({isheart:true});
                this.setState({heart:this.state.heart+1});
            }else{
                this.setState({isheart:false});
                this.setState({heart:this.state.heart-1});
            }
        }.bind(this))
    }
    starHandle(){
        fetch("mock/heart.json").then(function(){
            if(!this.state.star){
                this.setState({star:true});
            }else{
                this.setState({star:false});
            }
        }.bind(this))
    }
    CommentHandle(item,e,b){
        var evt=e;
        if(!item.name){
            evt = item;
            this.openMI('添加一条评论');
        }else{
            this.openMI('回复'+item.name+'：');
        }
        evt.stopPropagation();
        return false;
    }
    replyHandle(msg,user){
        let context = this;
        if(msg=="")return;
        fetch("mock/comment.json")
            .then(response=>response.json())
            .then((json)=>{
                let list =[json].concat(context.state.detail.comments);
                context.state.detail.comments = list;
                context.setState({detail:context.state.detail});
            });
    }
    openMI(p,user){
        var _this = this;
        window.App.MI({
            placeholder:p,
            "text":"发送",
            show:true,
            onSend:(msg,context)=>{
                console.log(msg,context)
                _this.replyHandle(msg,user);
                window.App.alert(msg);
                _this.closeIm();
            }
        })
        return false;
    }
    follow(){
        let context = this;
        fetch("mock/comment.json")
            .then((json)=>{
                context.setState({follow:!context.state.follow})
            });
    }
    closeIm(){
        window.App.setState({messageInput:0});
    }
    touchHandle(item,e){
        if(item.name!="我"){
            this.CommentHandle(item,e);
        }else{
            item.del = true;
            this.setState({detail:this.state.detail});
        }
    }
    del(index){
        delete  this.state.detail.comments[index]
        this.setState({detail:this.state.detail});
    }
    renderPreview(imgs){
        console.log(arguments)
        App.setState({ImgPreview:{list:imgs}});
    }
    render(){
        return (
            <div style={{backgroundColor:"#f5f5f5"}} onClick={this.closeIm.bind(this)}>
                <article className="topic-c">
                    <section className="topic-s-iu">

                        <span className="iu" style={{backgroundImage:"url("+this.state.detail.tx+")",display:"inline-block",backgroundSize:'100%'}}/>
                        <div><span>{this.state.detail.name}</span><p>{this.state.detail.date}</p></div>
                        <span className="focus" onClick={this.follow.bind(this)}>
                            {this.state.follow?<span>已关注</span>:<span><i className="icon-add"/> 关注</span>}
                        </span>
                    </section>
                </article>
                <section className="slide_box">
                    <div className="bd" onClick={this.renderPreview.bind(this,this.state.detail.imgs)}>
                        <Swiper height="181px" width="100%">
                        {
                            (this.state.detail.imgs||[]).map((item,index)=>{
                                console.log("item",item)
                                return  <LazyLoad key={index} className="swiper-slide">
                                            <img className="w100"
                                                 src={item}
                                                 width="100%" height="100%"/>
                                        </LazyLoad>
                            })
                        }
                        </Swiper>
                    </div>
                </section>
                <section className="topic_main">
                    <h3>{this.state.detail.title}</h3>
                    <div className="label_list">
                        {
                        (this.state.detail.tags||[]).map(function(item,index){
                            return <label key={index} className="label">{item.name}</label>;
                        })
                        }
                    </div>
                    <div className="cmnt_box">
                        <p className="count mt10">共<em>{this.state.detail.comments_count}</em>条评论，<em>{this.state.detail.praise_count}</em>个赞，<em>{this.state.detail.collection}</em>次收藏</p>
                        <p className="avatar_box" onClick={this.PraiseHandle.bind(this)}>
                            {
                                (this.state.detail.praise||[]).map(function(item,index){
                                    return <span key={index} className="iu" style={{backgroundImage:"url("+item.tx+")",display:"inline-block"}}/>
                                })
                            }
                            <span className="form-list-ft"/>
                        </p>
                        <ul className="cmnt_list">
                            {
                                (this.state.detail.comments||[]).map(function(item,index) {
                                    console.log(item)
                                return <li key={index} onClick={this.touchHandle.bind(this,item)}><span>{item.name+"："}</span>{item.content}{item.del?<a href="#" onClick={this.del.bind(this,index)}>删除</a>:''}</li>
                                }.bind(this))
                            }
                            {this.state.detail.comments_count>3?<li onClick={this.AllComment.bind(this)}>查看所有{this.state.detail.comments_count}条评论</li>:""}
                        </ul>
                    </div>
                </section>
                <AboutGoods items={this.state.aboutGoods}/>
                <AboutNote items={this.state.aboutNotes}/>
                <section className="topic-s-i" style={{position:"fixed",bottom:0,width:'100%'}}>
                    <div className="topic-s-i-l">
                        <a href="#" onClick={this.CommentHandle.bind(this)} name="评论"><i className="iconfont icon-comment"/></a>
                    </div>
                    <div className="topic-s-i-r">
                        <a href="#" onClick={this.heartHandle.bind(this)} name={this.state.heart}>{this.state.isheart?<i className="iconfont icon-heart2"></i>:<i className="iconfont icon-heart"></i>}</a>
                        <a href="#" onClick={this.starHandle.bind(this)} name="收藏">{this.state.star?<i className="iconfont icon-star2"></i>:<i className="iconfont icon-star"></i>}</a>
                    </div>
                </section>
                    </div>
        )
    }
}
module.exports = NoteDetail;