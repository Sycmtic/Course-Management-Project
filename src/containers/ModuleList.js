import React, { Component } from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        };
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);

        this.moduleService = ModuleService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        if (this.props.courseId !== newProps.courseId) {
            this.setCourseId(newProps.courseId);
            this.findAllModulesForCourse(newProps.courseId);
        }
    }

    setModules(modules) {
        this.setState({modules: modules})
    }
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    createModule(event) {
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => this.findAllModulesForCourse(this.state.courseId));
        this.state.module.title = '';
    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => this.findAllModulesForCourse(this.state.courseId));
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }
    renderListOfModules() {
        let modules = this.state.modules.map((module) =>
            <ModuleListItem courseId={this.state.courseId} module={module} key={module.id} delete={this.deleteModule}/>
        );
        return modules;
    }

    render() {
        return (
            <div>
                <h3>Modules:</h3>

                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
                <br/>
                <input onChange={this.titleChanged}
                       value={this.state.module.title}
                       placeholder="title"
                       className="form-control"/>
                <button onClick={this.createModule} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        );
    }
}

export default ModuleList;
