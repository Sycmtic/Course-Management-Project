import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LessonTabsItem.css';

class LessonTabsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                    {this.props.lesson.title}
                </Link>
                <span className="float-right">
                    <span className="delete-lesson" onClick={() => this.props.delete(this.props.lesson.id)}>X</span>
                </span>
            </li>
        );
    }
}

export default LessonTabsItem;