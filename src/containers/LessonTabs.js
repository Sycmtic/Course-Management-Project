import React, { Component } from 'react';
import LessonServiceClient from "../services/LessonServiceClient";
import LessonTabsItem from '../components/LessonTabsItem';

class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        };
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);

        this.lessonService = LessonServiceClient.instance;
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
    }

    componentWillReceiveProps(newProps){
        if (this.props.moduleId !== newProps.moduleId || this.props.courseId !== newProps.courseId) {
            this.setCourseId(newProps.courseId);
            this.setModuleId(newProps.moduleId);
            this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
        }
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    createLesson(event) {
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
            .then(() => this.findAllLessonsForModule(this.state.courseId, this.state.moduleId));
        this.state.lesson.title = '';
    }

    deleteLesson(lessonId) {
        this.lessonService
            .deteleLesson(lessonId)
            .then(() => this.findAllLessonsForModule(this.state.courseId, this.state.moduleId));
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }
    renderListOfLessons() {
        let lessons = this.state.lessons.map((lesson) =>
            <LessonTabsItem courseId={this.state.courseId} moduleId={this.state.moduleId} lesson={lesson} key={lesson.id} delete={this.deleteLesson}/>
        );
        return lessons;
    }

    render() {
        return(
        <ul className="nav nav-tabs">
            {this.renderListOfLessons()}
            <li className="nav-item">
                <button onClick={this.createLesson} className="btn btn-primary">
                    <i className="fa fa-plus"></i>
                </button>
            </li>
            <li className="nav-item">
            <input onChange={this.titleChanged}
                   value={this.state.lesson.title}
                   placeholder="title"
                   className="form-control"/>
            </li>
        </ul>
        );
    }
}

export default LessonTabs;