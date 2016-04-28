'use strict'
var React = require('react');

require('./../assets/css/dialog.css')

const shareLink = require('./../tools/shareLink')

class Win extends React.Component {
    constructor(props) {
        super(props)
        //{onDropDown:<Function>,onDropUp:<Function>}
        this.state = {
            win:undefined,
            status:props.parent?"waiting":"in",
            //到顶下拉,0:什么也没做,1:拉开
            dropdown:0,
            //到底上拉,0:什么也没做,1:拉开
            dropup:0
        }
    }
    setHeader(left,center,right){
        let header = <header className="header-items" style={{left:0}}>
            <div className="header-item-l">
                {left?left:<a className="back ios-click" href="#" onClickCapture={this.close.bind(this)}><span><i className="iconfont icon-arrow_right2"/>返回</span></a>}
            </div>
            <nav className="header-item-c">
                {center}
            </nav>
            <nav className="header-item-r">
                {right}
            </nav>
        </header>
        this.setState({
            header:header
        })
    }
    getShareLink(p,s){
        var link = shareLink.create(this.props.stage,p||{},s||{})
        //var state = shareLink.analyze(link)
        //console.log(link,state)
        return link;
    }

    //关闭当前窗口
    close() {
        var context = this;
        context.setState({
            "status":""
        });
        setTimeout(function(){
            context.props.parent.setState({win:0})
        },500)
        window.App.onSwitchStage()
        event.preventDefault();
    }

    //打开新窗口
    open(stage,options){
        let str = stage;
        if(typeof stage === 'string'){
            stage = App.props.stages[str]
        }
        if(stage===undefined){
            console.error("场景 ",str," 不存在，无法渲染，请检查代码open方法的参数");
            return ;
        }
        this.setState({
            win:{
                stage:stage,
                options:options,
                parent:this
            }
        })
        window.App.onSwitchStage()
    }
    componentDidMount(){
        var context = this;

        context.ref_stage = context.refs.stage;

        setTimeout(function(){
            if(context.state.status==="waiting") {
                context.setState({
                    status: "in"
                })
            }
        },0)
    }
    renderChild(){
        return <Win {...this.state.win} />
    }
    renderHeader(){
        return this.setHeader()
    }
    renderFooter(){
        return this.state.footer
    }

    //计算头脚的上下边距
    calStyle(){
        let style = {};
        if(!this.props.parent){
            //style.top = 0
        }
        if(!this.state.fotter){
            style.bottom = 0
        }

        if(this.state.dropdown === 1){
            style.paddingTop = "1rem"
        }else{
            style.paddingTop = 0
        }

        if(this.state.dropup === 1){
            style.paddingBottom = "1rem"
        }else{
            style.paddingBottom = 0
        }
        return style;
    }
    componentWillUpdate(){
        //console.log("this.state.style",this.state.style)
    }
    catchEvents(){
        let swipeData = {};
        let context = this;
        let ref_stage = this.ref_stage;
        let options = context.props.options||{}
        return {
            onTouchStart(e){
                let touches = e.touches;
                if (touches.length === 1) {
                    let touch = touches[0];
                    swipeData = {
                        startX: touch.pageX,//开始位置
                        startY: touch.pageY,
                        deltaMode: 0,//拖拽类型,1:左右;2:上下
                        deltaX: 0,//x移动距离，右正左负
                        deltaY: 0//y移动距离,下正右负
                    }
                }
            },
            onTouchMove(e){
                let touches = e.touches;
                if (touches.length === 1) {
                    let touch = touches[0];
                    swipeData.deltaX = touch.pageX - swipeData.startX;
                    swipeData.deltaY = touch.pageY - swipeData.startY;
                    swipeData.deltaMode = Math.abs(swipeData.deltaX)> Math.abs(swipeData.deltaY)?1:2;
                    if(ref_stage.scrollTop===0
                        && swipeData.deltaMode===2
                        && context.state.dropdown!==1
                        && swipeData.deltaY > 10
                        && options.onDropDown!==undefined
                        && options.onDropDown instanceof Function
                    ){
                        context.setState({
                            dropdown:1
                        })
                    }

                    if((ref_stage.scrollTop + ref_stage.clientHeight +1 )>=ref_stage.scrollHeight
                        && swipeData.deltaMode===2
                        && context.state.dropup!==1
                        && swipeData.deltaY < -10
                        && options.onDropUp!==undefined
                        && options.onDropUp instanceof Function
                    ){
                        context.setState({
                            dropup:1
                        })
                    }

                }
            },
            onTouchCancel(){
                context.setState({
                    dropdown:0,
                    dropup:0
                })
            },
            onTouchEnd(){
                var callback_closure = function(){
                    context.setState({
                        dropdown:0,
                        dropup:0
                    })
                };
                if(context.state.dropdown===1){
                    var fn = options.onDropDown?options.onDropDown:function(c){c()}
                    fn(callback_closure)
                }
                if(context.state.dropup===1){
                    var fn = options.onDropUp?options.onDropUp:function(c){c()}
                    fn(callback_closure)
                }
            }
        }
    }
    render() {
        return (
            <div className={"Win "+(this.state.status=="in"?"am-left-in":"")} >
                {this.state.header}
                <div className={"Win-Stage"}
                     ref="stage"
                     data-downword={this.state.dropdown===1?this.props.options.downword:''}
                     data-upword={this.state.dropup===1?this.props.options.upword:''}
                     style={this.calStyle.call(this)} {...this.catchEvents.call(this)}>
                    <this.props.stage win={this}/>
                </div>
                {this.renderFooter()}
                {this.state.win?this.renderChild.call(this):undefined}
            </div>
        )
    }
}

module.exports = Win;