import React, { Component } from 'react'
import Range from './Range'
import Panel from './Panel'
import PanelHeader from './PanelHeader'
//import './Axis.css'

class SubContainer extends Component {
  render() {
    return (
        <div className="row" style={{display: 'flex'}}>
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Profit Per Segment">
                        <Range/>
                    </PanelHeader>
                </Panel>
            </div>
            <div className="col-md-6 custom_padding" >
                <Panel>
                    <PanelHeader title="Sales by Month">
                        <Range/>
                    </PanelHeader>
                </Panel>
            </div>
        </div>
    )
  }
}

export default SubContainer;