'use strict'
import React from 'react';
import '../assets/css/header.css';


//所有组件

let Footer = require('./Footer')
class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
    }
    onBackHandle(){
        this.props.parentCallback();
    }
    render() {
        return (
            <header className="header-items ios-click" id="1">
                <div className="header-item-l">
                    <a className="back" onClick={this.onBackHandle.bind(this)} href="javascript:;"><i className="iconfont">&#xe618;</i></a>
                </div>
                    {
                        (()=>{
                            if (this.props.win.props.options) {
                                return (
                                    <nav className="header-item-c">
                                        {this.props.win.props.options.title}
                                        {this.props.win.props.options.isShare?<span className="fr">分享</span>:''}
                                    </nav>
                                )
                            }else{
                                return (
                                    <div>
                                        <nav className="header-item-c">
                                                <a className="checked" href="javascript:;">热门</a>
                                                <a href="javascript:;">直播</a>
                                                <a href="javascript:;">关注</a>
                                        </nav>
                                        <nav className="header-item-r">
                                        <a href="javascript:;"><i className="iconfont">&#xe637;</i></a>
                                        <a href="javascript:;"><i className="iconfont" name="62">&#xe603;<span></span></i></a>
                                        </nav>
                                    </div>
                                )
                            }
                        })()
                    }
            </header>
        )
    }
}
module.exports = Header;

