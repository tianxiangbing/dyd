/*话题详情
 * by tianxiangbing 2016.4.26
 * */
import React from 'react';
let {Component}=React;
class AboutGoods extends Component{
    render(){
        return (
            <section className="complex_box">
                <div className="c_title">
                    <span>相关商品</span>
                </div>
                <div>
                <div  className="about-goods">
                    <ul>
                        {(this.props.items||[]).map((item,index)=>{
                            return <li key={index}>
                                <img src={item.img} alt=""/>
                                <p className="name">{item.name}</p>
                                <p><span>500g/份</span><span className="price">￥5.90</span></p>
                            </li>
                        })}
                    </ul>
                </div>
                </div>
            </section>
        );
    }
}
module.exports = AboutGoods;