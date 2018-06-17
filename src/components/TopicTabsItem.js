import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopicTabsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                    {this.props.topic.title}
                </Link>
                <span className="float-right">
                    <span className="delete-topic" onClick={() => this.props.delete(this.props.topic.id)}>X</span>
                </span>
            </li>
        );
    }
}

export default TopicTabsItem;