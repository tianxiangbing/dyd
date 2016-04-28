import React from "react";

require("./../assets/css/header.css")
require("./../assets/css/animate.css")
require("./../assets/css/editor.css")

class LabelImg extends React.Component{
    constructor(props) {
        super(props)
        this.state={}
    }
    componentDidMount(){
        this.props.win.setState({
            header:0
        })
    }
    close(){
        this.props.win.close()
    }

    Heander(){
        return(
            <header className="header-items">
                <div className="header-item-l" onClick={this.close.bind(this)}>
                    <a className="back" href="javascript:;"><span><i className="iconfont icon-arrow_right2"></i>返回</span></a>
                </div>
                <div  className="header-item-c">
                    <h1>编辑照片</h1>
                </div>
                <div className="header-item-r">
                    <p className="next blue">继续</p>
                </div>
            </header>
        )
    }

    onPointHande(e){
        console.log(e);

    }

    render(){
        const context = this;
        return (
            <div>
                {this.Heander()}
                <article className="editor-c" onClick={this.onPointHande.bind(this)}>
                    <section className="editor-c-pic">
                        <img src="../app/module/assets/img/fruit07.jpg" width="100%"/>
                        <div className="tag">
                            <a className="show" href="#">
                                <span className="t-line w26" ></span>
                                <span className="c-line w26"></span>
                                <span className="b-line w26" ></span>
                            </a>
                        </div>
                    </section>
                    <section className="editor-c-des">
                        <p>点击<i></i>可以给图片打标签，长按可删除<br/>可随意拖动标签位置</p>
                    </section>
                </article>
            </div>
        );
    }
}
module.exports = LabelImg