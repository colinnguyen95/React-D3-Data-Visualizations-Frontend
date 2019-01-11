import React, { Component } from 'react'
//import Range from './Range'
//import './Axis.css'

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultSelection:false
        }; 
      }

    componentWillMount = () => {
        eventEmitter.addListener("reload",this.reloadData);
    }

    componentWillUnmount = () => {
        eventEmitter.removeListener("reload",this.reloadData);
    }

    reloadData = (defaultValue) => {
        this.setState({defaultSelection:defaultValue});
    }

    getData = () => {
        var color=['#53c79f','#64b0cc','#7a6fca','#ca6f96','#e58c72','#e5c072'];
        var heading=['Total Profit', 'Total Sales', "Total Losses", 'Top Product','Worst Product','Most Purchases','Most Popular Category'];

        var count=2000;

        if(this.state.defaultSelection){
            count=200;
        }

        var cards=color.map(function(d,i){
            var style={
                'backgroundColor':d
            };

            var up_down;
            if(i%2===0){
                up_down=(<span>&#8595;</span>);
            }else{
                up_down=(<span>&#8593;</span>);
            }

            return (
                <div className="col-xs-2 custom_padding margin-below-20" key={i}>
                    <div className="card" style={style}>
                        <div className="card_header">
                            <div className="pull-left" >
                                {heading[i]}
                            </div>
                            <div className="pull-right">
                                {up_down}{" "}
                                <span className="header_text">
                                    {Math.floor((Math.random() * 90) + 5)+'%'}
                                </span>
                            </div>
                        </div>
                        <hr className="hr-custom"/>
                        <div className="card_body">
                            {Math.floor((Math.random() * count) + 30)}
                        </div>
                    </div>
                </div>
            );
        });

        return cards;
    }

  render() {
    var cards=this.getData();

    return (
        <div className="row">
            {cards}
        </div>
    )
  }
}

export default Cards;