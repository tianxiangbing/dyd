import React from 'react';
import LazyLoad from 'react-lazy-load';

class ReleaseNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false
        }
    }

    showModal() {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        let showStyle = {
            display: this.state.checked ? 'inline-block' : 'none'
        }
        return (
            <div>
                <div className={this.state.checked?"launch-mask launch-mask-fade":"launch-mask"} onClickCapture={this.showModal.bind(this)}></div>
                <div className="launch-btn">
                    <a className="launch-btn-shoot" href="#" style={showStyle}><img src="./assets/images/shoot_bg.png"/></a>
                    <a className="launch-btn-pic" href="#"  style={showStyle}><img src="./assets/images/pic_bg.png"/></a>
                    <button className="launch-button" onClickCapture={this.showModal.bind(this)}></button>
                </div>

            </div>
        )
    }
}

module.exports = ReleaseNote;