import React, { Component } from 'react';
import TopicTabs from "./TopicTabs";
import LessonServiceClient from '../services/LessonServiceClient';
import TopicEditor from "./TopicEditor";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class LessonEditor extends Component {
    constructor(props) {
        super(props);
        this.lessonService = LessonServiceClient.instance;
        this.setLessonId = this.setLessonId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.state = {
            lessonId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.setLessonId(this.props.match.params.lessonId);
        this.lessonService
            .findLessonById(this.props.match.params.lessonId)
            .then((lesson) => {
                this.setLessonTitle(lesson)
            });
    }
    componentWillReceiveProps(newProps) {
        if (this.props.match.params.lessonId !== newProps.match.params.lessonId) {
            this.lessonService
                .findLessonById(newProps.match.params.lessonId)
                .then((lesson) => {
                    this.setLessonTitle(lesson)
                });
        }
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setLessonTitle(lesson) {
        this.setState({title: lesson.title});
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div>
                    <TopicTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId} lessonId={this.props.match.params.lessonId}/>
                </div>
                <Switch>
                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                           component={TopicEditor}>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default LessonEditor;