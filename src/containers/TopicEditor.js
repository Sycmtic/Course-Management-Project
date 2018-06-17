import React, { Component } from 'react';
import TopicServiceClient from '../services/TopicServiceClient';
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import WidgetList from './WidgetList';
import { WidgetReducer } from "../reducers/WidgetReducer"

let store = createStore(WidgetReducer);
class TopicEditor extends Component {
    constructor(props) {
        super(props);
        this.topicService = TopicServiceClient.instance;
        this.setTopicId = this.setTopicId.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.state = {
            topicId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.setTopicId(this.props.match.params.topicId);
        this.topicService
            .findTopicById(this.props.match.params.topicId)
            .then((topic) => {
                this.setTopicTitle(topic)
            });
    }
    componentWillReceiveProps(newProps) {
        if (this.props.match.params.topicId !== newProps.match.params.topicId) {
            this.setTopicId(this.props.match.params.topicId);
            this.topicService
                .findTopicById(newProps.match.params.topicId)
                .then((topic) => {
                    this.setTopicTitle(topic)
                });
        }
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    setTopicTitle(topic) {
        this.setState({title: topic.title});
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <Provider store={store}>
                    <WidgetList topicId={this.props.match.params.topicId}/>
                </Provider>
            </div>
        )
    }
}

export default TopicEditor;