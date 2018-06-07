import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ModuleListItem.css'

class ModuleListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>
                <span className="float-right">
                    <span className="delete-module" onClick={() => this.props.delete(this.props.module.id)}>X</span>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;