import React, { Component } from 'react'
//import './Axis.css'

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

class Range extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSelection:false,
            master:false
        }; 
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.defaultSelection !== this.state.defaultSelection) {
            this.setState({defaultSelection: newProps.defaultSelection});
        }
    }

    componentWillMount = () => {
        this.setState({defaultSelection:this.props.defaultSelection});
    }

    toggleSection =() => {
        if(this.props.master){
            eventEmitter.emitEvent("reload",[!this.state.defaultSelection]);
        }else {
            this.props.loadData(!this.state.defaultSelection);
        }
        this.setState({defaultSelection:!this.state.defaultSelection});
    }

    selectColor = () => {
        if(this.state.defaultSelection){
            this.fill7='#e58c72';
            this.fill30='#8f8f8f';
        }else{
            this.fill30='#e58c72';
            this.fill7='#8f8f8f';
        }
    }

  render() {

    this.selectColor();

    return (
        <div onClick={this.toggleSection} className="filter-selection">
            <span className="range-span" >
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill={this.fill7}/>
                </svg>
                <span className="padding-left-5">2014</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill={this.fill7}/>
                </svg>
                <span className="padding-left-5">2015</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill={this.fill7}/>
                </svg>
                <span className="padding-left-5">2016</span>
            </span>
            <span className="range-span">
                <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill={this.fill30}/>
                </svg>
                <span className="padding-left-5">2017</span>
            </span>
        </div>
    )
  }
}

export default Range;