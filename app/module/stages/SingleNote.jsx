import React from 'react';
import LazyLoad from 'react-lazy-load';
let Swiper = require('../components/Swiper');
require('../assets/css/note.css');

class SingleNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
    }

    componentDidMount() {
        fetch('./mock/SingleNote.json')
            .then((response)=>response.json())
            .then((data)=> {
                this.setState({
                    info: data
                })
            })
    }

    render() {
        let swiper;
        console.log(11);

        if (this.state.info.release_img) {
            swiper = (
                <Swiper height="7rem">
                    {
                        this.state.info.release_img.map((item, index)=> {
                            return (
                                <LazyLoad className="swiper-slide" key={index}>
                                    <img className="j_SliderBanner"
                                         src={item}
                                         width="100%"/>
                                </LazyLoad>
                            )
                        })
                    }
                </Swiper>
            );
        }
        //数据结构后 传入
        let [release_img,...rest] = this.state.info;
        console.log(rest);

        return (
            <div>
                {/* 轮播图 */}
                {swiper}
                {/* 相关商品缩略图 */}
                <RelGoods {...rest}/>

                {/* <RelGoods></RelGoods> */}

                {/* 相关笔记缩略图 */}
            </div>
        )
    }
}
/**
 * 相关商品缩略图
 */
class RelGoods extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div></div>
        )
    }
}

class RelNotes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div></div>
        )
    }
}

module.exports = SingleNote;