'use strict'
import React from 'react';

require("./../assets/css/search.css")

let fetch = self.fetch;

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            values:this.props.value,
            name:null,
            content:null
        }
    }
    handleChose(event){
        this.props.callbackParent(this.refs.name.innerText);
    }
    render(){
        const item = this.props.item;
        return(
            <li onClick={this.handleChose.bind(this)} >
                <h3 ref="name">{item.name}</h3>
                <div>{item.content}</div>
            </li>
        )
    }
}

class ItemHead  extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            values:this.props.value,
            name:null,
            content:null
        }
    }
    handleHeadChose(event){
        this.props.callbackHeadParent(this.refs.hname.innerText);
        this.props.callbacklabelParent([this.refs.hname.innerText,this.props.type]);

        this.props.win.close();
    }
    render(){
        const item = this.props.item;
        return(
            <div className={"form-lists form-lists-access"}  onClick={this.handleHeadChose.bind(this)} >
                <a className={"form-list"} href="javascript:;">
                    <div className={"form-list-bd form-list-primary"}><p ref="hname">{item.name}</p></div>
                    <div className={"form-list-ft"}></div>
                </a>
            </div>
        )
    }
}
class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:{},
            items:{},
            hitems:{},
            type:this.props.win.props.options.type, //1.水果 2.产地 3.自定义标签 4.地址搜索
            btnok:null,
            seartxt:{},
            labelParent:function(){},
            searValue:null,
            headValue:null,
            more:false,
            headmor:false,
            show:0
        }
    }
    componentDidMount(){

        console.log( this.props.win.props.options.type);

        console.log(this.props.win.props);

        this.props.win.setState({
            header:0
        })
        this.setState({
            type:this.props.win.props.options.type,
            labelParent:this.props.win.props.options.callLabelParent
        })

        let context = this;
        fetch("mock/search.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json);
                context.setState({data:json});
            });
    }
    handleChange(event){
        var srv= event.target.value;
        if(srv){
            this.setState({show:1,more:true});
        }else{
            this.setState({show:0,more:false});
        }
        this.setState({searValue:srv});
    }
    handleHeads(event){
        var srv= event.target.value;

        if(srv){
            this.setState({headmor:true});
        }else{
            this.setState({headmor:false});
        }
        this.setState({headValue:srv});
    }
    handleRemove(){
        this.setState({searValue:this.state.vnull,show:0,more:false});
    }

    onChildChanged(newValue){
        this.setState({
            searValue:newValue
        })
    }
    onHeadChanged(value){
        console.log(value);
        this.setState({
            headValue:value
        });
        console.log(this.prop);
        //this.props.win.close();
    }
    renderItems(value){
        var context = this;
        return (
            <ul className="adrewind">
                {
                    (context.state.data.adress||[]).map(function(item,inx){
                        return <Item key={inx} item={item} value={value} callbackParent={context.onChildChanged.bind(context)} />;
                    })
                }
            </ul>
        )
    }

    renderHItems(value){
        var context = this;
        console.log(context.state.labelParent);
        return(
            <article className="search-c">
                <div className={"form-lists search-c-d"}>
                    <div className="form-list">
                        <div className={"form-list-bd form-list-primary"}><i className="iconfont">&#xe60f;</i><span name="点击添加：">苹果</span></div>
                    </div>
                </div>
                {
                    (context.state.data.adress||[]).map(function(item,inx){
                        return <ItemHead key={inx} item={item} value={value} type={context.state.type} win={context.props.win} callbackHeadParent={context.onHeadChanged.bind(context)} callbacklabelParent={context.state.labelParent}/>
                    })
                }
            </article>
        )
    }
    renderSea(show,value,btnok){
        return (
            <div className="add">
                <div className="head">
                    <form className="inputbox" action="#">
                        <i className="isearch iconfont icon-shouyesousuo"></i>
                        <input type="text" className="inputarea" placeholder={btnok} onInput={this.handleChange.bind(this)} value={this.state.searValue }/>
                        <i className={"iremove iconfont " +(show<1?"hide":"icon-shanchu")} onClick={this.handleRemove.bind(this)}></i>
                    </form>
                    <span className={"goodsearch " +(show<1?"hide":"")}>{btnok}</span>
                </div>
            </div>
        )
    }
    close(){
        this.props.win.close()
    }
    renderHed(show){
        return(
            <header className={"header-items " +(show<1?"":"hide")}>
                <div className="header-item-l">
                    <a className="back" href="javascript:;" onClick={this.close.bind(this)}><i className="iconfont icon-arrow_right2"></i></a>
                </div>
                <div className="header-search">
                    <input type="text" placeholder={this.state.type===1?"输入水果名称":(this.state.type===2?"输入产地名称":"输入自定义标签")} onInput={this.handleHeads.bind(this)} value={this.state.headValue}/>
                </div>
                <div className="header-cancel">
                    <a className="header-OK h-blue" href="javascript:;">确认</a>
                </div>
            </header>
        )
    }

    render(){
        let item = this.state.data;
        var type = this.props.win.props.options.type;
        return(
            <div className="container body-content">
                <div className={this.state.type===1?"":(this.state.type===2?"":(this.state.type===3?"":"hide"))}>
                    {
                        this.renderHed(this.state.show)
                    }
                </div>

                <div className={this.state.headmor?"":"hide"}>
                    {
                        this.renderHItems(this.state.headValue)
                    }
                </div>
                <div className={this.state.type===4?"":"hide"}>
                    {
                       this.renderSea(this.state.show,this.state.searValue,item.btnok)
                    }
                </div>

                <div className={this.state.more?"adres":"hide"}>
                    {
                        this.renderItems(this.state.searValue)
                    }
                </div>
            </div>
        )
    }
}

module.exports = Search;


