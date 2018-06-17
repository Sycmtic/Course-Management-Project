import React, { Component } from 'react';
import LessonTabs from "./LessonTabs";
import LessonEditor from './LessonEditor';
import ModuleService from '../services/ModuleService';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class ModuleEditor extends Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.setModuleId = this.setModuleId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.state = {
            moduleId: '',
            title: ''
        };
    }

    componentDidMount() {
        this.setModuleId(this.props.match.params.moduleId);
        this.moduleService
            .findModuleById(this.props.match.params.moduleId)
            .then((module) => {
                this.setModuleTitle(module)
            });
    }
    componentWillReceiveProps(newProps) {
        if (this.props.match.params.moduleId !== newProps.match.params.moduleId) {
            this.moduleService
                .findModuleById(newProps.match.params.moduleId)
                .then((module) => {
                    this.setModuleTitle(module)
                });
        }
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setModuleTitle(module) {
        this.setState({title: module.title});
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div>
                    <LessonTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>
                </div>
                <div>
                    <Switch>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={LessonEditor}>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ModuleEditor;