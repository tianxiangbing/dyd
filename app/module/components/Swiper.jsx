'use strict'
import React from 'react';

require('../assets/css/swipe.css')
/**
 * 轮播组件
 */
class Swiper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            swipeStyle: {},
            size:this.props.children.length
        }
        this.currentState = {
            currentX: 0,
            index: 0,
            size: this.props.children.length
        }
    }
    componentDidMount() {
        //获取一屏宽度
        this.currentState.width = this.refs['swiper'].offsetWidth;
        this.timer = setInterval(function(){
            this.next();
            //console.log("走着")
        }.bind(this),this.props.delay || 5000)
        //开启定时器
    }
    componentWillUnmount() {
        //console.log("over")
        clearInterval(this.timer)
    }
    componentWillReceiveProps(){
        this.currentState.size = this.props.children.length
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
        if(idx <0 )idx = state.size-1;

        if(idx >= state.size )idx = 0;

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

    render() {
        var context = this;
        return (
            <div className="swiper-container-horizontal" ref="swiper"
                 style={{"height":context.props.height,"position":"relative","overflow":"hidden"}}>
                <div className="swiper-wrapper" style={context.state.swipeStyle} {...this.swipe.call(this)}>
                    {
                        React.Children.map(context.props.children, (Child)=> {
                            return Child;
                        })
                    }
                </div>
                <div className="swiper-pagination">
                    {(function () {
                        let dot = []
                        for (let i = 0, len = context.currentState.size; i < len; i++) {
                            dot.push(<span key={i}
                                           className={"swiper-pagination-bullet "+ (context.currentState.index===i?"swiper-pagination-bullet-active":"")}/>)
                        }
                        return dot;
                    })()}
                </div>
            </div>
        )
    }
}
module.exports = Swiper;

