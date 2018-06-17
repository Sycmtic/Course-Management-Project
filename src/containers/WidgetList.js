import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/Widget'
import Switch from 'react-toggle-switch'
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import "../styles/WidgetList.css"

class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgetsForTopic(this.props.topicId)
        this.state = {
            switched: false
        };
    }

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
        });
    };

    render() {
        return(
            <div>
                <div className="button-container">
                    <button type="button" className="save-button btn btn-md btn-success" hidden={this.props.previewMode} onClick={() => this.props.save(this.props.topicId)}>
                        Save
                    </button>
                    <h5 style={{marginBottom: "0", marginLeft:"10px", marginRight:"10px"}}>Preview</h5>
                    <Switch className="switch-button" onClick={(event) => { this.toggleSwitch(); this.props.preview();}} on={this.state.switched}/>
                </div>
                <ul style={{listStyleType: "none", paddingLeft: "10px"}}>
                    {this.renderWidgets(this.props.widgets)}
                </ul>
                    <i style={{fontSize: "41px", color: "#dc3545", float:"right"}} onClick={this.props.addWidget} className="fas fa-plus-square"></i>
            </div>
        )
    }

    renderWidgets(widgets) {
        if (widgets.length > 0) {
            return this.props.widgets
                .sort((a, b) => a.widgetOrder - b.widgetOrder)
                .map(widget => (
                <WidgetContainer widget={widget}
                                 length = {widgets.length}
                                 preview={this.props.previewMode}
                                 key={widget.id}/>
            ))
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.topicId !== newProps.topicId) {
            this.props.findAllWidgetsForTopic(newProps.topicId)
        }
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})
const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgetsForTopic: (topicId) => actions.findAllWidgetsForTopic(dispatch, topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: (topicId) => actions.save(dispatch, topicId),
    preview: () => actions.preview(dispatch)
})
const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default App