import React from 'react';
import LazyLoad from 'react-lazy-load';

let Swiper = require('../components/Swiper');
let ReleaseNote = require('../components/ReleaseNote');
let shareLink = require('../tools/shareLink')
/**
 * 话题系统首页
 *
 */
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicList: []
        }
        console.log(shareLink.create("Index"))
    }

    closeThisStage() {
        this.props.win.close();
    }

    openStage(stage, props) {
        this.props.win.open(stage, props);
    }

    componentDidMount() {
        //装载首页的数据
        fetch('./mock/hotTopic.json')
            .then((response)=> {
                console.log(response);
                return response.json();
            })
            .then((data)=> {
                this.setState({
                    topicList: data.topicList
                })
            })
    }

    componentWillMount() {
        let context = this;
        var win = this.props.win;
        win.setHeader.apply(win, context.getHeader.call(context))
    }

    /**
     * 设置头部
     * @return [左，中，右],左如果不填写则默认返回按钮
     *
     */
    getHeader() {
        return [<a href="http://www.dianyadian.net">首页</a>,
            <span>
                    <a className="checked" href="#">热门</a>
                    <a href="#">直播</a>
                    <a href="#">关注</a>
                </span>
            ,
            <span>
                    <a href="#" onClickCapture={this.openStage.bind(this,"MyHome")}><i className="iconfont icon-girl"/></a>
                    <a href="#" onClickCapture={this.openStage.bind(this,"MyMessage")}><i
                        className="iconfont icon-heart3" name="62"><span/></i></a>
                </span>
        ]

    }

    render() {
        return (
            <div style={{backgroundColor:'#EEE'}}>
                {
                    this.state.topicList.map((item, index)=> {
                        //console.log(this.state.topicList);
                        return (<TopicBody {...item} key={index} openStage={this.openStage.bind(this)}/>)
                    })
                }
                {/**this.renderHeader()*/}
                {/**<ReleaseNote/>*/}
            </div>
        );
    }
}

class TopicBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkMore: false,
            attentState: this.props.attention_state,
            praiseState: this.props.praise_state,
            praiseTotal: this.props.praise_total,
            enshrineState: this.props.enshrine_state,
            shareState: this.props.share_state
        };


        //console.log('SingleNote获取的数据:' + props);
        //console.log( props);
    }

    checkMoreHandle() {
        this.setState({
            checkMore: !this.state.checkMore
        })
    }

    openStage(url, props) {
        this.props.openStage(url, props)
    }

    checkAttention() {
        fetch('./mock/checkAttention.json')
            .then((response)=> {
                return response.json()
            })
            .then((data)=> {
                if (data.code == 1) {
                    this.setState({
                        attentState: data.attention
                    })
                }
            })
    }
    praise (){
        let praiseTota = this.state.praiseTotal;

        this.setState({
            praiseState : !this.state.praiseState,
            praiseTotal : this.state.praiseState? --praiseTota : ++praiseTota

        })
    }
    enshrine (){
        console.log('分享');
        this.setState({
            enshrineState: !this.state.enshrineState
        })
    }
    share() {
        this.setState({
            shareState: !this.state.shareState
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
            console.log(this.props.release_img[0]);
            picSet = (
                <div style={{position: 'relative'}}>
                   <LazyLoad>
                       <div className="scale-img"
                            onClickCapture={this.openStage.bind(this,'NoteDetail')}
                            style={{
                            'backgroundImage': 'url(' + this.props.release_img[0] + ')'
                       }}></div>
                   </LazyLoad>
                    <div style={tagPosition}>
                        {
                            this.props.tag_content.map((item, index)=> {
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
            console.log('多图渲染');
            picSet = (
                    <div> {
                        this.props.release_img.map((item, index)=> {
                            return (
                                <LazyLoad key={index}>
                                    <div className={("scale-img n-" + (index + 1))}
                                         onClickCapture={this.openStage.bind(this,'NoteDetail')}
                                         style={{
                                                'backgroundImage': 'url(' + this.props.release_img[index] + ')'
                                        }}></div>
                                </LazyLoad>
                            )
                        })
                    }
                    </div>
                );
        }

        console.log(picSet);

        //this.state.attentend
        return (
            <article className="topic-c">
                <section className="topic-s-iu">
                    <span className="iu" style={iuStyle}> </span>
                    <div><span>{this.props.release_user_name}</span><p>
                        <span>{this.props.release_time}</span>在<span>{this.props.release_address}</span></p></div>
                    <span className="ios-click" className={this.state.attentState? 'focus': 'no-focus'}
                          onClickCapture={this.checkAttention.bind(this)}>
                        {this.state.attentState ? '关注' : '未关注'}
                    </span>
                </section>
                <section className={"topic-s-pic lay-" + this.props.release_img.length }>
                    {
                        picSet
                    }
                </section>
                <section className="topic-s-d">
                    <p className={this.state.checkMore?'':'ui-nowrap-multi-2'}>{this.props.release_text_content}</p>
                    <p className="ios-click"
                       onClickCapture={this.checkMoreHandle.bind(this)}>{this.state.checkMore ? '收起' : '查看更多'}</p>
                </section>
                <section className="topic-s-tag">
                    {
                        this.props.label_list.map((item, index)=> {
                            return (
                                <label key={index} className="ios-click"
                                       onClickCapture={this.openStage.bind(this,'TopicDetail')}>{item}</label>
                            )
                        })
                    }
                </section>
                <section className="topic-s-com">
                    <ul>
                        {
                            this.props.show_comment_list.map((item, index)=> {
                                return (
                                    <li name={item.username && (item.username + ': ')} key={index}>{item.content}</li>)
                            })
                        }
                        <li><span className="ios-click"
                                  onClickCapture={this.openStage.bind(this,'CommentList')}>查看所有{this.props.components_total}条评论</span>
                        </li>
                    </ul>
                </section>
                <section className="topic-s-i">
                    <div className="topic-s-i-l">
                        <a href="javascript:void 0" name="评论" onClickCapture= {this.openStage.bind(this,'MyMessage')}><i className="iconfont">&#xe652;</i></a>
                    </div>
                    <div className="topic-s-i-r">
                        <a className= {this.state.praiseState? "active": ""}
                            href="javascript:void 0"
                            name={this.state.praiseTotal}
                            onClickCapture= {this.praise.bind(this)}><i className="iconfont">&#xe60c;</i></a>
                        <a className= {this.state.enshrineState? "active": ""}
                           onClickCapture = {this.enshrine.bind(this)}
                            href="javascript:void 0" name="收藏"><i className="iconfont">&#xe613;</i></a>
                        <a className={this.state.shareState? "active": ""}
                            onClickCapture = {this.share.bind(this)}
                            href="javascript:void 0" name="分享"><i className="iconfont">&#xe615;</i></a>
                    </div>
                </section>
            </article>
        )
    }
}

module.exports = Index;