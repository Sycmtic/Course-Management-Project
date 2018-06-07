let _singleton = Symbol();
const COURSE_API_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/course';

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(response => response.json());
    }

    findCourseById(courseId) {
        return fetch(`${COURSE_API_URL}/${courseId}`)
            .then(response => response.json());
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json());
    }

    deleteCourse(courseId) {
        return fetch(`${COURSE_API_URL}/${courseId}`, {
            method: 'delete'
        });
    }
}
export default CourseService;