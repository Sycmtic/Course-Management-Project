import React, { Component } from 'react';
import TopicServiceClient from "../services/TopicServiceClient";

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
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
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
            <li className="nav-item" key={topic.id}>
                <a className="nav-link active" href="#">{topic.title}
                    <span className="delete-lesson" onClick={() => this.deleteTopic(topic.id)}>X</span>
                </a>
            </li>
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