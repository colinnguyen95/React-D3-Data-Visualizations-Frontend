import React, { Component } from 'react'
import Range from './Range'
import Panel from './Panel'
import PanelHeader from './PanelHeader'
import Chart from './BarChart/Chart'
//import './Axis.css'

class MainContainer extends Component {
  render() {
    return (
        <div style={{display: 'flex'}}>
            <div className="custom_padding" >
                <Panel>
                    <PanelHeader title="Top 10 Products">
                        <Range/>
                    </PanelHeader>
                    <Chart />
                </Panel>
                
            </div>
            <div className="custom_padding" >
                <Panel>
                    <PanelHeader title="Sales by State">
                        <Range/>
                    </PanelHeader>
                </Panel>
            </div>
        </div>
    )
  }
}

export default MainContainer;