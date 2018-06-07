import React, { Component } from 'react';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h1>{this.props.message}</h1>
        )
    }
}

export default HelloWorld;