'use strict'
import React from 'react';
import LazyLoad from 'react-lazy-load'

require("./../assets/css/iconf/iconfont.css")
require("./../assets/css/note.css")



//let Link = require('../factory/Link');

let fetch = self.fetch;
class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ishrt:true,
            heart:this.props.heart||0
        }
    }
    componentDidMount(){
        console.log();
        this.setState({
            heart:this.props.heart
        })
    }
    heartHande(){
        if(this.state.ishrt){
            this.setState({
                ishrt:false,
                heart:this.state.heart-1
            })
        }else{
            this.setState({
                ishrt:true,
                heart:this.state.heart+1
            })
        }
    }
    render(){
        var item = this.props.item;
        return(
            <li>
                <div className="p">
                    <LazyLoad  >
                        <img src={item.img} className="w100"/>
                    </LazyLoad>
                </div>
                <div className="d">
                    <h5 className="f4">{item.title} </h5>
                    <p className="like" name={item.uname}><i className="iu"><img src={item.tx}/></i><span onClick={this.heartHande.bind(this)}><i className={this.state.ishrt?"icon-heart4":"icon-heart3"}/>{this.state.heart}</span></p>
                </div>
            </li>
        )
    }
}
class MyCollection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            conllitems:{},
        }
    }

    componentWillMount(){
        if(this.props.win){
            if(this.props.win.props.options.statcs) {
                this.props.win.setHeader("", "我的收藏", "")
            }
        }

    }
    componentDidMount(){
        let context = this;let win = this.props.win;
        fetch("mock/myCollection.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json)
                context.setState({conllitems:json, heart:json.data.heart});
            });
        //win.setHeader("","我的收藏","")
    }

    coltionRender(){
        let context = this;
        return(
            <ul>
                {
                    [].map.call(this.state.conllitems.data||[],function(item,idx){
                        return <Item item={item} key={idx} heart={item.heart}/>
                    })
                }
            </ul>
        )
    }
    render(){
        var items = [
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
            {title: '海南小台芒果海南小台芒果海南小台芒果海南 ', uname: 'Sporting',img: '../app/module/assets/img/pic.jpg',tx:'../app/assets/images/tx.png', heart: '20'},
        ];
        return(
            <div>
                <section className={items.length<1?"keep_no":"hide"}>
                    <div>
                        <img src="../app/module/assets/img/user_i.png" width="100%"/>
                            <p>您还没有自己的收藏</p>
                    </div>
                </section>
                <div className ={items.length<1?"hide":"keep_box"}>
                    <p className="c_text f7">我的收藏{items.length}条</p>
                    <div className={"list_choice_p"}> {this.coltionRender()}</div>
                </div>
            </div>
        )
    }
}
module.exports = MyCollection;