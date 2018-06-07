import React, { Component } from 'react';
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import CourseEditor from './CourseEditor';
import ModuleEditor from './ModuleEditor';
import CourseList from './CourseList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/CourseManager.css';

class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                <Route path="/courses"
                       component={CourseList}>
                </Route>
                <Route path="/course/:courseId"
                       component={CourseEditor}>
                </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;