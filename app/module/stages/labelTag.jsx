import React from "react";
import '../assets/css/launch.css';

class LabelTag extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            fruit:"水果",
            area:"产地",
            auts:"自定义标签"
        }
    }
    componentDidMount(){
        let context = this;
        this.props.win.setHeader("","编辑标签","")
    }

    FruitHandle(){
        this.props.win.open("Search",{type:1,callLabelParent:this.onChildLabel.bind(this)});
    }
    locateHandle(){
        this.props.win.open("Search",{type:2,callLabelParent:this.onChildLabel.bind(this)});
    }
    tagHandle(){
        this.props.win.open("Search",{type:3,callLabelParent:this.onChildLabel.bind(this)});
    }
    onChildLabel(value){
        if(value){
            if(value[1]===1){
                this.setState({fruit:value[0]})
            }if(value[1]===2){
                this.setState({area:value[0]})
            }if(value[1]===3){
                this.setState({auts:value[0]})
            }
        }
    }
    render(){
        const context = this;
        return (
            <article className="tag-c tag-fade" >
                <section className="tag-c-s">
                    <div onClickCapture={context.FruitHandle.bind(this)} >
                        <i className="iconfont icon-fruits" name=" ">  {this.state.fruit}</i>
                    </div>
                    <div onClick={this.locateHandle.bind(this)}>
                        <i className="iconfont icon-locate" name=" ">   {this.state.area}</i>
                    </div>
                    <div onClick={this.tagHandle.bind(this)}>
                        <i className="iconfont icon-add" name="">   {this.state.auts}</i>
                    </div>
                </section>
            </article>
        );
    }
}
module.exports = LabelTag