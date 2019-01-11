import React, { Component } from 'react';
import Range from './Range';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import DonutChart from './DonutChart/DonutChart';
import BarChart from './BarChart/BarChart';

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

class SubContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultBar:false,
            defaultPie:false,
            dataPie:[],
            dataBar:[]
        }; 
    }

    componentDidMount = () => {
        this.reloadBarData();
        this.reloadPieData();
        eventEmitter.addListener("reload",this.reloadData);
    }

    componentWillUnmount = () => {
        eventEmitter.removeListener("reload",this.reloadData);
    }

    reloadData = (defaultValue) => {
        this.reloadBarData(defaultValue);
        this.reloadPieData(defaultValue);
    }

    reloadBarData = (defaultValue) => {
        var dataBar=[
            { month:'Jan', new:20, old:30 },
            { month:'Feb', new:29, old:83 },
            { month:'Mar', new:86, old:75 },
            { month:'Apr', new:13, old:57 },
            { month:'May', new:30, old:23 },
            { month:'Jun', new:50, old:27 }

        ];

        for(var i=0,j=5;i<6;++i,--j){

            var d=dataBar[i];
            d.new=Math.floor((Math.random() * 200) + 5);
            d.old=Math.floor((Math.random() * 200) + 5);


            dataBar[i]=d;
        }

        this.setState({dataBar:dataBar,defaultBar:defaultValue});
    }

    reloadPieData = () => {
        fetch('http://localhost:5000/profitpercategory')
        .then(response => response.json())
        .then(data => this.setState({ dataPie: data }))
        .catch(error => console.log('parsing failed', error));
        // var dataPie = [
        //     { name: 'Maintenance' },
        //     { name: 'New Development' },
        //     { name: 'Support'},
        //     { name: 'ISLA'},
        //     { name: 'Others'}

        // ];

        // for(var i=0,j=4;i<5;++i,--j){

        //     var d=dataPie[j];
        //     d.count=Math.floor((Math.random() * 50) + 5);
        //     dataPie[j]=d;
        // }

        //this.setState({dataPie:dataPie,defaultPie:defaultValue});

    }

  render() {

    var color=['#53c79f','#e58c72','#7a6fca','#ca6f96','#64b0cc','#e5c072'];

    var margin={
        top: 20, right: 30, bottom: 40, left: 50
    };

    var keys=['new','old'];

    return (
        <div className="row">
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Profit Per Category">
                    <Range loadData={this.state.dataPie} defaultSelection={this.state.defaultBar}/>
                    </PanelHeader>
                    <div className="text-center padding-top-10">
                        <DonutChart id="bs_chart" data={this.state.dataPie} color={color} height={300} width={500}
                                    enable3d={true} innerRadiusRatio={3} label="Segment" point="Profit">
                            <legend radius={10}></legend>
                        </DonutChart>
                    </div>
                </Panel>
            </div>
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Top 5 Products">
                        <Range/>
                    </PanelHeader>
                    <BarChart />
                </Panel>
            </div>
        </div>
    )
  }
}

export default SubContainer;