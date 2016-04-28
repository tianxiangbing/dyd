import React from "react";

require('../assets/css/form-new.css');
require('../assets/css/launch.css');

class ReleaseNotes extends React.Component{
    constructor(props) {
        super(props)
        this.state={}
    }
    componentDidMount(){
        let context = this;
        this.props.win.setHeader("","发布","")
    }

    render(){
        return (
            <div>
            <article className="launch-content">
                <div className="launch-share">
                    <img src="../app/module/assets/img/fruit01.jpg" alt=""/>
                        <textarea name="" id="" rows="5" placeholder="分享您的购买/体验心得"></textarea>
                </div>
                <div className="launch-form form-lists ">
                    <div className="form-list launch-a">
                        <div className="form-list-hd"><i className="iconfont icon-locate"></i></div>
                        <div className="form-list-bd form-list-primary"><p>发布于</p></div>
                        <div className="form-list-ftr"><span>中国，杭州市，西湖区</span><i className="iconfont icon-close del"></i></div>
                    </div>
                    <div className="launch-tag label_tar">
                        <div className="launch-tag-a"><i className="iconfont icon-tag tag"></i><p>标签</p></div>
                        <div className="launch-tag-b"><span>解馋小果<i className="iconfont icon-close del-r"></i></span>
                            <span>车厘子<i className="iconfont icon-close del-r"></i></span><span>蓝莓椰子<i className="iconfont icon-close del-r"></i></span>
                            <span><i className="iconfont icon-add add"></i></span></div>
                    </div>
                    <div className="launch-tag">
                        <div className="launch-tag-a"><i className="iconfont icon-flag type"></i><p>发布类型</p></div>
                        <div className="launch-tag-b"><span className="checked">直播</span><span>晒单</span></div>
                    </div>

                </div>
                <div className="launch-pic">
                    <div className="launch-upload">
                        <span><img src="../app/module/assets/img/fruit02.jpg" alt=""/><i className="iconfont icon-close del-r"></i></span>
                        <span><img src="../app/module/assets/img/fruit02.jpg" alt=""/><i className="iconfont icon-close del-r"></i></span>
                        <span className="upload"><p>补充图片</p></span>
                    </div>
                </div>
            </article>
            <footer className="launch-footer">
                <div><a href="javascript:;">发布</a></div>
            </footer>
            </div>
        );
    }
}
module.exports = ReleaseNotes