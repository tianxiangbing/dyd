import React from 'react';
import LazyLoad from 'react-lazy-load';

let Swiper = require('../components/Swiper');
let ReleaseNote = require('./ReleaseNote');

export class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicList: []
        }
    }
    closeThisStage (){
        this.props.win.close();
    }
    openStage (props){
        this.props.win.open('NoteDetail',props);
    }
    componentDidMount(){
        //装载首页的数据
        fetch('./mock/hotTopic.json')
            .then((response)=>{
                console.log(response);
                return response.json();
            })
            .then((data)=>{
                this.setState({
                    topicList: data.topicList
                })
            })
    }

    render() {
        return (
            <div className="" style={{backgroundColor:'#EEE'}}>
                {
                    this.state.topicList.map((item,index)=>{
                        console.log(this.state.topicList);
                        return (<TopicBody {...item} key={index} openStage={this.openStage.bind(this)} />)
                    })
                }
                <ReleaseNote/>
            </div>
        );
    }
}

class TopicBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkMore : false,
            attentState : this.props.attention_state
        };


        //console.log('SingleNote获取的数据:' + props);
        //console.log( props);
    }

    checkMoreHandle(){
        this.setState({
            checkMore : !this.state.checkMore
        })
    }

    openStage(url,props){
        console.log('tidasd12121');
        this.props.openStage(url,props)
    }
    checkAttention(){

        fetch('./mock/checkAttention.json')
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                if(data.code == 1){
                    this.setState({
                        attentState: data.attention
                    })
                }
            })
    }
    render() {
        let iuStyle = {
            backgroundImage: `url(${this.props.release_user_head_img})`,
            backgroundSize: '100%'
        };
        let picSet;
        if (this.props.release_img.length == 1) {
            let tagPosition = {
                top: this.props.tag_position.split(',')[0],
                left: this.props.tag_position.split(',')[1],
                position: 'absolute'
            };
            picSet = (
                <div style={{position: 'relative'}}>
                    <LazyLoad>
                        <img src={this.props.release_img[0]} onClickCapture={this.openStage.bind(this,'NoteDetail')}/>
                    </LazyLoad>
                    <div style={tagPosition}>
                        {
                            this.props.tag_content.map((item,index)=>{
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        else {
            picSet = (
                this.props.release_img.map((item,index)=>{
                    return (
                        <LazyLoad key={index}>
                            <img src={this.props.release_img[index]} onClickCapture={this.openStage.bind(this,'NoteDetail')}/>
                        </LazyLoad>)
                })
            );
        }

        return (
            <article className="topic-c">
                <section className="topic-s-iu">
                    <span className="iu" style={iuStyle}> </span>
                    <div><span>{this.props.release_user_name}</span><p><span>{this.props.release_time}</span>在<span>{this.props.release_address}</span></p></div>
                    <span className={this.state.attentState? 'focus': 'focus unattention'} onClickCapture={this.checkAttention.bind(this)}><i className="iconfont">&#xe61d;</i>{this.state.attentState? '关注': '未关注'}</span>
                </section>
                <section className="topic-s-pic">
                    {
                        picSet
                    }
                </section>
                <section className="topic-s-d">
                    <p className={this.state.checkMore?'less':''}>{this.props.release_text_content}</p>
                    <p onClickCapture={this.checkMoreHandle.bind(this)}>{this.state.checkMore ? '收起' : '查看更多'}</p>
                </section>
                <section className="topic-s-tag">
                    {
                        this.props.label_list.map((item, index)=> {
                            return (
                                <label key={index}>{item}</label>
                            )
                        })
                    }
                </section>
                <section className="topic-s-com">
                    <ul>
                        {
                            this.props.show_comment_list.map((item, index)=> {
                                return (<li name={item.username && (item.username + ': ')} key={index}>{item.content}</li>)
                            })
                        }
                        <li><span onClickCapture={this.openStage.bind(this,'Praise')}>查看所有{this.props.components_total}条评论</span>
                            {/*
                             <span onClickCapture={this.openStage.bind(this,this.props.check_more_comment_url)}>查看所有{this.props.components_total}条评论</span>
                            */}
                        </li>
                    </ul>
                </section>
                <section className="topic-s-i">
                    <div className="topic-s-i-l">
                        <a href="javascript:void 0"  name="评论"><i className="iconfont">&#xe652;</i></a>
                    </div>
                    <div className="topic-s-i-r">
                        <a href="javascript:void 0"  name={this.props.praise_total}><i className="iconfont">&#xe60c;</i></a>
                        <a href="javascript:void 0"  name="收藏"><i className="iconfont">&#xe613;</i></a>
                        <a href="javascript:void 0"  name="分享"><i className="iconfont">&#xe615;</i></a>
                    </div>
                </section>
            </article>
        )
    }
}
