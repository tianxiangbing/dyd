import React from "react";
import LazyLoad from 'react-lazy-load';

class AboutNote extends React.Component{
    constructor(props){
        super(props);
    }
    AboutNoteClick(){
        this.props.win.open("NoteDetail")
    }
    render(){
        return (
            <section className="r_note_box">
                <div className="c_title">
                    <span>相关笔记</span>
                </div>
                <div className="list_choice_p">
                    <ul>
                        {
                            (this.props.items||[]).map((item,index)=>{
                                return (
                                    <li key={index} onClick={this.AboutNoteClick.bind(this)}>
                                        <div className="p">
                                            <LazyLoad><img src={item.img} className="w100"/></LazyLoad>
                                        </div>
                                        <div className="d">
                                            <h5 className="f4">{item.title}</h5>
                                            <p className="like" name={item.name}><i className="iu"></i><span><i className="iconfont">&#xe60b;</i>{item.heart}</span></p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        );
    }
}
module.exports = AboutNote;