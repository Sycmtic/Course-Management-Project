import React, { Component } from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from '../services/CourseService';
import '../styles/CourseList.css';

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;

        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {
            course: {
                tittle: '',
                owner: 'me',
            },
            courses: []
        };
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    titleChanged(event) {
        this.setState({course: { title: event.target.value }});
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            });
    }

    renderCourseRows() {
        let courses = null;
        if (this.state.courses.length > 0) {
            courses = this.state.courses.map((course) =>
                <CourseRow course={course} key={course.id} delete={this.deleteCourse}/>
            );
        }
        return (courses);
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

                    <a className="navbar-brand" href="/courses">Course Manager</a>
                    <form className="form-inline">
                    <input onChange={this.titleChanged}
                           className="form-control"
                           id="titleFld"
                           placeholder="New Course Title"/>
                        <i className="fas fa-plus-circle fa-2x" onClick={this.createCourse}></i>
                    </form>
                </nav>
                <div style={{backgroundColor: "white"}} className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: "50%"}}>Title</th>
                        <th>Owned by</th>
                        <th>Last modified by me</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default CourseList;