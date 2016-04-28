import React from 'react';
import LazyLoad from 'react-lazy-load';
let Swiper = require('../components/Swiper');

class ImgPreview extends  React.Component{
    constructor(props){
        console.log(props);
        super(props);
        this.state = {
            swipeStyle: {}
        }
        this.currentState = {
            currentX: 0,
            index: 0,
            size: this.props.list.length
        }

        var test = {"b":1,"a":2}
        for(var i in test){
            console.log(i);
        }

    }
    hide(){
        App.setState({ImgPreview:0})
    }
    returnFalse(e){
        e.stopPropagation();
    }
    componentDidMount() {
        //获取一屏宽度
        this.currentState.width = this.refs['swiper'].offsetWidth;
    }
    componentWillUnmount() {
        //console.log("over")
        clearInterval(this.timer)
    }

    //前一个
    prev() {
        let state = this.currentState;
        this.stay(state.index-1)
    }

    //下一个
    next() {
        let state = this.currentState;
        this.stay(state.index+1)
    }

    //随着手指移动
    move(delta) {
        this.setState({
            swipeStyle: {
                transitionDuration: "0ms",
                "transform": "translate3d(" + delta + "px,0px,0px)"
            }
        })
    }
    //到idx位置或者回到当前位置
    stay(idx) {
        //console.log("stay", idx)
        let state = this.currentState;
        if (idx !== void 0
            && idx >= 0
            && idx < state.size) {

        }
        idx = (idx===void 0)?state.index:idx;
        if(idx <0 )idx =0;

        if(idx >= state.size )idx = state.size-1;

        state.index = idx;

        let delta = 0 - state.index * state.width;
        this.setState({
            swipeStyle: {
                transitionDuration: ".3s",
                "transform": "translate3d(" + delta + "px,0px,0px)"
            }
        });
        state.currentX = delta
    }
    swipe() {
        let context = this;
        let state = this.currentState;
        return {
            onTouchStart(e){
                let touches = e.touches;
                if (touches.length === 1) {
                    let touch = touches[0];
                    state.startX = touch.clientX || touch.pageX;
                    state.startY = touch.clientY || touch.pageY;
                    state.goLeft = false;
                    state.goRight = false;
                }
            },
            onTouchCancel(){
                //[state.startX,state.startY,state.goAway] = [undefined,undefined,undefined]
            },
            onTouchEnd(e){
                let state = context.currentState;
                if (state.goLeft) {
                    context.next()
                } else if (state.goRight) {
                    context.prev()
                } else {
                    context.stay()
                }
            },
            onTouchMove(e){
                let touches = e.touches;
                if (touches.length === 1) {
                    let touch = touches[0];

                    //判断方向，上下移动距离与左右移动距离取最大
                    let deltaX = (touch.clientX || touch.pageX) - state.startX
                    let deltaY = (touch.clientY || touch.pageY) - state.startY
                    //通过移动距离判断是左右还是上下

                    let deltaX_abs = Math.abs(deltaX);

                    if (deltaX_abs < 2) {
                        return
                    }

                    let isHorizontal = deltaX_abs > Math.abs(deltaY)

                    state.goRight = deltaX > 100;
                    state.goLeft = deltaX < -100;

                    context.move(state.currentX + deltaX)
                }
                e.stopPropagation()
            }
        }
    }

    render(){
        return (
            <div className="preview" onClick={this.hide.bind(this)}>
                <div ref="swiper" className="preview-list" style={this.state.swipeStyle} {...this.swipe.call(this)}>
                    {
                        (this.props.list||[]).map((item,index)=>{
                            return  <img key={index} className="w100"
                                     src={item}
                                     width="100%" height="auto" onClick={this.returnFalse.bind(this)}/>
                        })
                    }
                </div>
            </div>
        );
    }
}
module.exports = ImgPreview;