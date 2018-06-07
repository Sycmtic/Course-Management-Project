import React from 'react';
import ReactDom from 'react-dom';
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import HelloWorld from './components/Hello';
import Stateless from './components/Stateless';
import ModuleListItem from "./components/ModuleListItem";
import "./styles/index.css";

ReactDom.render(
    <div className="container-fluid">
        <CourseManager />
    </div>,
    document.getElementById('root')
);