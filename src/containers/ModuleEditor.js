import React, { Component } from 'react';
import LessonTabs from "./LessonTabs";
import ModuleService from '../services/ModuleService';

class ModuleEditor extends Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.selectModule = this.selectModule.bind(this);
        this.state = {
            moduleId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.moduleService
            .findModuleById(this.props.match.params.moduleId)
            .then((module) => {
                this.selectModule(module)
            });
    }
    componentWillReceiveProps(newProps) {
        this.moduleService
            .findModuleById(newProps.match.params.moduleId)
            .then((module) => {
                this.selectModule(module)
            });
    }

    selectModule(module) {
        this.setState({moduleId: module.id});
        this.setState({title: module.title});
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <LessonTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>
            </div>
        )
    }
}

export default ModuleEditor;