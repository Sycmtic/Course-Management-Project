import React, { Component } from 'react';
import ModuleList from './ModuleList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModuleEditor from "./ModuleEditor";
import CourseService from '../services/CourseService';
import '../styles/CourseEditor.css';


class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {
            courseId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.courseService
            .findCourseById(this.props.match.params.courseId)
            .then((course) => {
                this.selectCourse(course)
            });
    }

    selectCourse(course) {
        this.setState({courseId: course.id});
        this.setState({title: course.title});
    }

    render() {
        return (
            <div>
                <nav id="custom-nav" className="navbar navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Main menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="navbar-brand" href="/courses">{this.state.title}</a>
                </nav>
                <div className="row">
                    <div className="col-4">
                        <ModuleList courseId={this.props.match.params.courseId}/>
                    </div>
                    <div className="col-8">
                        <Switch>
                            <Route path="/course/:courseId/module/:moduleId"
                                   component={ModuleEditor}>
                            </Route>
                        </Switch>
                    </div>
                </div>

            </div>
        )
    }
}

export default CourseEditor;