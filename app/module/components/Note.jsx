import React from 'react';

class Note extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div  className="news-c-b">
                <div className="news-c-b-pic">
                    <img src={this.props.img} alt=""/>
                    <p>{this.props.content}</p>
                </div>
            </div>
        )
    }
}
module.exports = Note;