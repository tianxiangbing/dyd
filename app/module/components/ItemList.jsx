import React from 'react';

require("./../assets/css/list-item.css")

//import LazyLoad from './../tools/LazyLoad'
import LazyLoad from 'react-lazy-load'

class Item extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count:0
        }
    }
    addCount(){
        let count = this.state.count

        this.setState({count:++count})
    }
    cutCount(){
        let count = this.state.count
        if(--count<0)count = 0
        this.setState({count:count})
    }
    select(){
        let dialog = {
            show:true,
            title:"dialog title",
            content:"dialog content",
            buttonPlace:"left",
            buttons:[
                {
                    text:"确2222定",
                    events:{
                        "click":function(){
                            this.close()
                        }
                    }
                },{
                    text:"关111闭",
                    events:{
                        "click":function(){
                            this.close()
                        }
                    }
                }
            ]
        }

        var App = window.App;
        //this.props.stage.props.win.open(App.props.stages.Product)
        //App.setState({dialog});
        //App.alert("打开新窗口?",()=>{
            this.props.stage.props.win.open(App.props.stages.Product)
        //})
    }
    render() {
        var item = this.props.item

        return (
            <li onClickCapture={this.select.bind(this)}>
                <div className="p">
                    <LazyLoad  >
                        <img src={item.image} className="w100"/>
                    </LazyLoad>
                    {/**<img src={item.image} className="w100"/>*/}
                    <i className="item_sj"></i>
                </div>
                <div className="d">
                    <h5 className="f4">{item.title}</h5>
                    <h6 className="f6">{item.description}</h6>
                    <p className="d-price"><em>￥</em><span className="org">{item.price}</span><del>￥{item.priceOrg}</del></p>
                    <div className="buy ios-click">
                        <span className="btn buy_cut btn-buy" onClickCapture={this.cutCount.bind(this)}></span>
                        <span className="red f15">{this.state.count}</span>
                        <span className="btn buy_add btn-buy" onClickCapture={this.addCount.bind(this)}></span>
                    </div>
                </div>
            </li>
        );
    }
}

class ItemList extends React.Component {
    constructor(props){
        super(props)
    }
    renderItems(){
        let context = this;
        if(!context.props.items){
            return
        }
        return (<ul>{
            [].map.call(context.props.items||[],function(item,idx){
                return <Item item={item} key={idx} stage={context.props.stage}/>
            })
        }</ul>)
    }
    render() {
        let context = this
        return (function(){
            if(!context.props.items){
                return <div className="ajax-loading">loading</div>
            }else{
                return <div className={"list-item-"+(context.props.type==1?"p":"t")}>
                    {context.renderItems()}
                </div>
            }
        })()
    }
}

module.exports = ItemList;
