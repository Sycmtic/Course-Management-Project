import React, { Component } from 'react';
import TopicServiceClient from "../services/TopicServiceClient";
import TopicTabsItem from "../components/TopicTabsItem";

class TopicTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topic: {title: ''},
            topics: []
        };
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);

        this.topicService = TopicServiceClient.instance;
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(this.props.courseId, this.props.moduleId, this.props.lessonId);
    }

    componentWillReceiveProps(newProps){
        if (this.props.moduleId !== newProps.moduleId || this.props.courseId !== newProps.courseId || this.props.lessonId !== newProps.lessonId) {
            this.setModuleId(newProps.moduleId);
            this.setCourseId(newProps.courseId);
            this.setLessonId(newProps.lessonId);
            this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
        }
    }

    setTopics(topics) {
        this.setState({topics: topics})
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    createTopic(event) {
        this.topicService
            .createTopic(this.props.courseId, this.props.moduleId, this.props.lessonId, this.state.topic)
            .then(() => this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId));
        this.state.topic.title = '';
    }

    deleteTopic(topicId) {
        this.topicService
            .deteleTopic(topicId)
            .then(() => this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId));
    }

    titleChanged(event) {
        this.setState({topic: {title: event.target.value}});
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then((topics) => {this.setTopics(topics)});
    }
    renderListOfTopics() {
        let topics = this.state.topics.map((topic) =>
            <TopicTabsItem courseId={this.state.courseId} moduleId={this.state.moduleId} lessonId={this.state.lessonId} topic={topic} key={topic.id} delete={this.deleteTopic}/>
        );
        return topics;
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {this.renderListOfTopics()}
                <li className="nav-item">
                    <button onClick={this.createTopic} className="btn btn-primary">
                        <i className="fa fa-plus"></i>
                    </button>
                </li>
                <li className="nav-item">
                    <input onChange={this.titleChanged}
                           value={this.state.topic.title}
                           placeholder="title"
                           className="form-control"/>
                </li>
            </ul>
        );
    }
}

export default TopicTabs;