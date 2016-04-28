//import React from 'react';
//import ReactDom from 'react';
//import LazyLoad from 'react-lazy-load';
//require('whatwg-fetch');
//require('../assets/css/note.css');
//class HotNote extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            noteList: []
//        }
//    }
//    componentDidMount(){
//        //装载首页的数据
//        fetch('./mock/hotNote.json')
//        .then((response)=>{
//            console.log(response);
//            return response.json();
//        })
//        .then((data)=>{
//           this.setState({
//               noteList: data.noteList
//           })
//        })
//    }
//
//    render() {
//        return (
//            <div className="">
//                {/* 轮播图 */}
//
//                {
//                    this.state.noteList.map((item,index)=>{
//                        console.log(this.state.noteList);
//                        return (<SingleNote {...item} key={index} openStage={this.openStage.bind(this)}/>)
//                    })
//                }
//            </div>
//        );
//    }
//}
//class SingleNote extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            checkMore : false
//        };
//    }
//
//    checkMoreHandle(){
//      this.setState({
//          checkMore : !this.state.checkMore
//      })
//    }
//
//    openStage(url,props){
//      this.props.openStage(url,props)
//    }
//
//    render() {
//
//        return (
//            <div></div>
//        )
//    }
//}
//
//module.exports = HotNote;