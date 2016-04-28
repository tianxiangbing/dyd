'use strict'
import React from 'react';

require("./../assets/css/iconf/iconfont.css")
require("./../assets/css/other.css")
require("./../assets/css/form-new.css")

//let Link = require('../factory/Link');
let fetch = self.fetch;

class Contact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        this.props.win.setHeader("","联系我们","")
    }
    render(){

        return(
            <article className="contact-c">
                <section className="form-lists form-lists-access">
                    <a className="form-list" href="javascript:;">
                        <div className="form-list-hd"><i className="iconfont icon-qq"></i></div>
                        <div className="form-list-bd form-list-primary"><p>QQ客服在线为您服务</p></div>
                        <div className="form-list-ft"></div>
                    </a>
                </section>
                <section className="form-lists form-lists-access">
                    <a className="form-list" href="javascript:;">
                        <div className="form-list-hd"><i className="iconfont icon-wedat"></i></div>
                        <div className="form-list-bd form-list-primary"><p>客服微信号：dianyadian123</p></div>
                        <div className="form-list-ft"></div>
                    </a>
                </section>
                <section className="form-lists form-lists-access last-s">
                    <a className="form-list" href="javascript:;">
                        <div className="form-list-hd"><i className="iconfont icon-cs"></i></div>
                        <div className="form-list-bd form-list-primary"><p>热线客服：一对一解答问题</p></div>
                        <div className="form-list-ft"></div>
                    </a>
                </section>
            </article>
        )
    }
}
module.exports = Contact;