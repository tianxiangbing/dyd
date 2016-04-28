import React from 'react';
import '../assets/css/dialog.css';
let {Component} = React;
class Dialog extends Component{
    constructor(props) {
        super(props)
        this.state = {
            show:props.show
        }
    }

    componentDidMount() {
        setTimeout(()=> {
            if (this.state.status !== "closed") {
                this.setState({status: "in"})
            }
        }, 0);
    }

    close() {
        this.setState({status: "closed"})
        setTimeout(()=> {
            this.props.App.setState({dialog: 0})
        }, 100)
        return false
    }

    componentWillUnmount() {
        this.setState({status: ""})
    }

    alert() {

    }
//
    render() {
        let options = this.props || {};
        let context = this;
        let d = undefined;
        let isAlert = !options.buttons||options.buttons.length==0;
        console.log(isAlert)
        if (context.state.show) {
            d = (
                <div className="ui-dialog">
                    <div className={"container "+this.state.status+" "+(isAlert?"ui-alert":"")}>
                        {options.title?<div className="header">{options.title}</div>:""}
                        {options.content?<div className="content">{options.content}</div>:""}
                        {
                            (()=>{
                                if(options.buttons&&options.buttons.length>0){
                                    return (<div className="footer">
                                        {
                                            (options.buttons || []).map((btn, i)=> {
                                                return <a key={i} className={btn.cls +" " + (options.buttons.length==1 ? " single":"")}
                                                          onClickCapture={btn.events.click.bind(context,context)}>{btn.text}</a>
                                            })
                                        }
                                    </div>)
                                }
                            })()
                        }
                    </div>
                    {options.mask===false?"":<div className="mask" onClick={this.close.bind(this)}></div>}
                </div>
            )
        }
        return (
            <div>{d}</div>
        )
    }
}
module.exports = Dialog;
