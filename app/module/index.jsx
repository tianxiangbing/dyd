'use strict'

import base_style from "./assets/css/base.css"

module.exports = {
    //Components
    //组件
    "E": {
        "ItemList": require('./components/ItemList')
        , "Dialog": require('./components/Dialog')

        , "Header": require('./components/Header')
        , "Footer": require('./components/Footer')

        //滑动轮播
        , "Swiper": require('./components/Swiper')

        //消息发送器
        , "MessageInput": require('./components/MessageInput')
        //窗口组件
        , Win: require('./components/Win')
        ,'ImgPreview':require('./components/ImgPreview')

        //发布组件
        ,"ReleaseNote":require('./components/ReleaseNote')
    },
    //工厂
    "F": {
        "Link": require('./factory/Link')
    },
    //工具
    "T": {
        "shareLink":require('./tools/shareLink')
    },
    //场景
    "S":{
        "Error":require("./stages/Error")
        ,"Product":require("./stages/Product")
        ,"Home":require("./stages/Home"),
        "MyMessage":require('./stages/MyMessage'),
        "NoteDetail":require('./stages/NoteDetail'),
        'HotNote': require('./stages/HotNote'),
        "CommentList":require('./stages/CommentList'),
        "Praise":require('./stages/Praise'),
        "MyAttention":require('./stages/MyAttention'),
        "MyFans":require('./stages/MyFans'),
        "MyCollection":require('./stages/MyCollection'),
        "MyHome":require('./stages/MyHome'),
        "Search":require('./stages/Search'),
        "LabelTag":require('./stages/LabelTag'),
        "LabelImg":require('./stages/LabelImg'),
        "Contact":require('./stages/Contact'),
        "ReleaseNotes":require('./stages/ReleaseNotes'),
        'Index': require('./stages/Index'),
        "SingleNote": require('./Stages/SingleNote'),
        'TopicDetail':require('./stages/TopicDetail')
    }
};
