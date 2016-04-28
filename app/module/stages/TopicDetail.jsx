/*话题详情
 * by tianxiangbing 2016.4.26
 * */
import React from 'react';
import "../assets/css/header.css";
import AboutNote from "../components/AboutNote";
import AboutGoods from "../components/AboutGoods";

import LazyLoad from 'react-lazy-load';
let Swiper = require('../components/Swiper')
let {Component} = React;
class TopicDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            follow: false,
            aboutNotes: [],
            aboutGoods: [],
            detail: {
                title: "笔记详情"
            }
        }
    }

    setWinHeader() {
        let win = this.props.win;
        win.setHeader.apply(win, this.getHeader.call(this))
    }

    componentDidMount() {
        let context = this;

        fetch("mock/topic.json")
            .then(response=>response.json())
            .then((json)=> {
                context.setState({
                    detail: json
                })

                context.setWinHeader.call(context)

            });
        fetch("mock/aboutNote.json")
            .then(response=>response.json())
            .then((json)=> {
                context.setState({
                    aboutNotes: json
                })
            });
        fetch("mock/aboutGoods.json")
            .then(response=>response.json())
            .then((json)=> {
                context.setState({
                    aboutGoods: json
                })
            });
    }

    follow() {
        let context = this;
        fetch("mock/comment.json")
            .then((json)=> {
                !context.state.follow ? context.state.detail.heart++ : context.state.detail.heart--;
                context.setState({follow: !context.state.follow, detail: context.state.detail});

                context.setWinHeader.call(context)

            });
    }

    onBackHandle() {
        this.props.win.close();
    }

    componentWillMount() {
        let win = this.props.win;
        win.setHeader.apply(win, this.getHeader.call(this))
    }

    getHeader() {
        return [
            undefined,
            this.state.detail.title,
            <span className="focus" onClick={this.follow.bind(this)}>
                {this.state.follow ? <span>已关注</span> : <span><i className="icon-add"/> 关注</span>}
            </span>
        ]
    }

    render() {
        return (
            <div style={{backgroundColor:"#f5f5f5"}}>
                <article className="user-c">
                    <section className="user-c-des">
                        <p><span className="note">笔记·{this.state.detail.node_num}</span><span
                            className="fan">粉丝·{this.state.detail.heart}</span></p>
                        <p>{this.state.detail.content}</p>
                    </section>
                    <seciton className="user-c-pic">
                        <ul>
                            {(this.state.detail.goods || []).map((item, index)=> {
                                return <li key={index}><img src={item.img} alt=""/><p>{item.name}</p></li>
                            })}
                        </ul>
                    </seciton>
                </article>
                <AboutGoods items={this.state.aboutGoods} win={this.props.win}/>
                <AboutNote items={this.state.aboutNotes} win={this.props.win}/>
            </div>
        );
    }
}
module.exports = TopicDetail;