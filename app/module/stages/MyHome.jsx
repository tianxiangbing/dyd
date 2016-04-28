'use strict'
import React from 'react';

require("./../assets/css/iconf/iconfont.css");
require("../assets/css/ihome.css");

//let Link = require('../factory/Link');

let fetch = self.fetch;

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        var item = this.props.item;
        return (
            <dl className="website_list">
                <dt className="fl website_list_t">
                    <h1>{item.day}</h1>
                    <p className="f5">{item.month}</p>
                </dt>
                <dd className="fl website_list_d first">
                    <p className="website_pic">
                        <img src={item.img}/>
                    </p>
                    <h3>{item.cont}</h3>
                    <p className="f6 website_list_c">
                        <i className="icon-locate"/>{item.adres}
                        <span className="fr"> <i className="icon-star5"/><span>{item.zan} </span><i
                            className="icon-heart5"/><span>{item.collection}</span></span>
                    </p>
                </dd>
            </dl>
        )
    }
}
class MyHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            flowValue: "关注",
            bc: "ibde",
            mis: false
        }
    }

    componentWillMount(){
        this.props.win.setHeader("","我的主页","")
    }
    componentDidMount() {
        var context = this;let win = this.props.win;

        fetch("mock/myhome.json")
            .then(response=>response.json())
            .then((json)=> {
                console.log(json)

                context.setState({data: json});
            });
        win.setHeader("","我的主页","")
    }

    flowHande() {
        if (this.state.bc === "ibde") {
            this.setState({
                bc: 'bde',
                flowValue: "已关注"
            })
        } else {
            this.setState({
                bc: 'ibde',
                flowValue: "关注"
            })
        }
    }
    titRender() {
        return (
            <div className="infor_box Stage-Header-Place">
                <p className="infor">
                    <i className="iu"><img src="../app/assets/images/tx.png"/></i>
                    <em name="齐小吓" data-area="浙江 杭州"/>
                    <span className={this.state.mis?"fr btm_edit f5":"hide"}>编辑资料</span>
                    <span className={this.state.mis?"hide":"fr btm_flow f1 " +this.state.bc}
                          onClick={this.flowHande.bind(this)}><i className="icon-add" ref="flow"/>{this.state.flowValue}</span>
                </p>
            </div>
        )
    }

    stepTo(stage,options) {
        this.props.win.open(stage,options)
        event.preventDefault()
    }

    shouRender() {
        return (
            <div className="mt10 website_nav">
                <a href="#" onClickCapture={this.stepTo.bind(this,"MyCollection",{statcs:true})}><em className="f3">5</em><p>我的收藏</p>
                </a>
                <a href="#" onClickCapture={this.stepTo.bind(this,"MyAttention",{statcs:false})}><em className="f3">12</em><p>我的关注</p>
                </a>
                <a href="#" onClickCapture={this.stepTo.bind(this,"MyFans",{statcs:true})}><em className="f3">678</em><p>我的粉丝</p></a>
            </div>
        )
    }

    detailRender() {
        return (
            <div className="website ks-clear mt10">
                <p className="website_text fz14">我的笔记<em className="orange"> 151 </em>条</p>
                {
                    (this.state.data.data || []).map(function (item, idx) {
                        return <Item key={idx} item={item}/>
                    })
                }
                <p className="center f7 website_bottom">没有更多了</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.titRender()}
                {this.shouRender()}
                {this.detailRender()}
            </div>
        )
    }

}
module.exports = MyHome;