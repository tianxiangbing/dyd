'use strict'
import React from 'react';
import LazyLoad from 'react-lazy-load';

let ItemList = require('../components/ItemList')
let Swiper = require('../components/Swiper')




const _LOADING = "_LOADING";
const _LOADED = "_LOADED";

let fetch = self.fetch;

const BaseStage = require('../base/BaseStage')
class Home extends BaseStage {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let context = this;
        fetch("mock/items.json")
            .then(response=>response.json())
            .then((json)=> {
                context.setState({
                    items: json
                })
            })
    }
    renderList() {
        return <ItemList items={this.state.items} type={1} stage={this}/>
    }
    MyMessageHandle(){
        this.props.win.open(App.props.stages.MyMessage,{title:'所有消息'});
    }
    NoteDetailHandle(){
        this.props.win.open(App.props.stages.NoteDetail,{title:'笔记详情',isShare:true});
    }
    topicDetailHandle() {
        console.log('Topic ');
        this.props.win.open(App.props.stages.TopicDetail,{title:'话题详情'});
    }
    openMI(){
        window.App.MI({
            placeholder:"哈哈哈哈",
            "text":"点我",
            show:true,
            onSend:(msg,context)=>{
                console.log(msg,context)
                window.App.alert(msg)
            }
        })
    }
    singleNoteHandle() {
        //this.props.win.open(App.props.stages.SingleNote);
        this._open("SingleNote")
    }

    MyAttHandle(){
        console.log("open MyAttention")
        this._open("MyAttention")
    }
    CollectonHandle(){
        this.props.win.open(App.props.stages.MyCollection);
    }
    peopleHandle(){
        this.props.win.open(App.props.stages.MyFans);
    }
    homeHandle(){
        this.props.win.open(App.props.stages.MyHome);
    }
    noteHandle(){
        this.props.win.open(App.props.stages.Note);
    }
    tagHandle(){
        this.props.win.open(App.props.stages.LabelTag);
    }
    releaseandle(){
        this.props.win.open(App.props.stages.ReleaseNotes);
    }
    imgHandle(){
        this.props.win.open(App.props.stages.LabelImg);
    }
    contactHandle(){
        this.props.win.open(App.props.stages.Contact);
    }

    render() {
        return (
            <div>
                <Swiper height="181px" width="100%">
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/1.jpeg"
                             width="100%"/>
                    </LazyLoad>
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/2.jpg"
                             width="100%"/>
                    </LazyLoad>
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/1.jpeg"
                             width="100%"/>
                    </LazyLoad>
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/2.jpg"
                             width="100%"/>
                    </LazyLoad>
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/1.jpeg"
                             width="100%"/>
                    </LazyLoad>
                    <LazyLoad className="swiper-slide">
                        <img className="j_SliderBanner"
                             src="assets/images/2.jpg"
                             width="100%"/>
                    </LazyLoad>
                </Swiper>
                <input type="button" value="我的消息" className="menu" onClick={this.MyMessageHandle.bind(this)}/>
                <input type="button" value="笔记详情" className="menu" onClick={this.NoteDetailHandle.bind(this)}/>

                <div>
                    <p>徐卓帅</p>
                    <input className="menu" type="button" value="话题详细场景" onClick={this.topicDetailHandle.bind(this)}/>
                    <br/>
                    <input className="menu" type="button" value="笔记详情" onClick={this.singleNoteHandle.bind(this)}/>

                    <p>小易</p>
                    <input type="button" value="我的关注" onClick={this.MyAttHandle.bind(this)}/>
                    <input type="button" value="我的收藏" onClick={this.CollectonHandle.bind(this)}/>
                    <input type="button" value="我的关注人" onClick={this.peopleHandle.bind(this)}/>
                    <input type="button" value="个人主页" onClick={this.homeHandle.bind(this)}/>
                    <input type="button" value="单个笔记回复" onClick={this.noteHandle.bind(this)}/>
                    <input type="button" value="发布" onClick={this.releaseandle.bind(this)}/>
                    <input type="button" value="tag" onClick={this.tagHandle.bind(this)}/>
                    <input type="button" value="图片标签" onClick={this.imgHandle.bind(this)}/>
                    <input type="button" value="联系我们" onClick={this.contactHandle.bind(this)}/>
                </div>

                {this.renderList()}
                {this.renderList()}
                {this.renderList()}
                <a onClick={this.openMI.bind(this)}>点击</a>
            </div>
        );
    }
}
module.exports = Home;
