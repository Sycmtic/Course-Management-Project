import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td style={{width: "50%"}}>
                    <i className="fas fa-file-alt" style={{paddingRight: "10px", color:"#4285f4"}}></i>
                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>
                    <p>me</p>
                </td>
                <td>
                    <p>{this.props.course.modified}</p>
                </td>
                <td>
                    <button className="btn btn-outline-danger my-2 my-sm-0" style={{border: "none", float:"right"}} onClick={() => {
                        this.props.delete(this.props.course.id)
                    }}>X</button>
                </td>
            </tr>
        )
    }
}

export default CourseRow;