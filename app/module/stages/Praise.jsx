import React from "react";
let fetch = self.fetch;
class Praise extends React.Component{
    constructor(props){
        super(props);
        this.state={list:[]};
    }
    componentWillMount(){
        this.props.win.setHeader("","赞","")
    }
    componentDidMount(){
        let context = this;
        fetch("mock/praise.json")
            .then(response=>response.json())
            .then((json)=>{
                console.log(json)
                context.setState({
                    list:json
                })
            });
    }
    render(){
        return (
                <div className="fans_lists follow_box bt">
                    {
                    (this.state.list||[]).map(function(item,index){
                        return (
                            <a className="fans_list" key={index} href="javascript:;">
                                <p className="ufans"><i className="iu" style={{backgroundImage:"url("+item.tx+")",display:"inline-block"}}></i><em name={item.name} tip="new"></em></p>
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}
module.exports = Praise;