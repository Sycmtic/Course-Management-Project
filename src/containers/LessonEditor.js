import React, { Component } from 'react';
import TopicTabs from "./TopicTabs";
import LessonServiceClient from '../services/LessonServiceClient';

class LessonEditor extends Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonServiceClient.instance;
        this.selectLesson = this.selectLesson.bind(this);
        this.state = {
            lessonId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.lessonService
            .findLessonById(this.props.match.params.lessonId)
            .then((lesson) => {
                this.selectLesson(lesson)
            });
    }
    componentWillReceiveProps(newProps) {
        this.lessonService
            .findLessonById(newProps.match.params.lessonId)
            .then((lesson) => {
                this.selectLesson(lesson)
            });
    }

    selectLesson(lesson) {
        this.setState({lessonId: lesson.id});
        this.setState({title: lesson.title});
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <TopicTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId} lessonId={this.props.match.params.lessonId}/>
            </div>
        )
    }
}

export default LessonEditor;