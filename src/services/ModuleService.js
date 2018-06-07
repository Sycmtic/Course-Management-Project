const MODULE_API_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/course/CID/module';
const MODULE_DEL_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/module/MID';
const MODULE_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/module';

let _singleton = Symbol();
class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId), {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(response => response.json());
    }

    findAllModules() {
        return fetch(MODULE_URL)
            .then(response => response.json());
    }

    findAllModulesForCourse(courseId) {
        return fetch(MODULE_API_URL.replace('CID', courseId))
            .then(response => response.json());
    }

    findModuleById(moduleId) {
        return fetch(`${MODULE_URL}/${moduleId}`)
            .then(response => response.json());
    }

    deleteModule(moduleId) {
        return fetch(MODULE_DEL_URL.replace('MID', moduleId), {
            method: 'delete'
        });
    }
}

export default ModuleService;