let _singleton = Symbol();
const LESSON_API_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/course/CID/module/MID/lesson';
const LESSON_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/lesson';

class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId), {
            body: JSON.stringify(lesson),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json());
    }

    deteleLesson(lessonId) {
        return fetch(`${LESSON_URL}/${lessonId}`, {
            method: 'delete'
        });
    }

    findAllLessons() {
        return fetch(LESSON_URL)
            .then(response => response.json());
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(LESSON_API_URL.replace('CID', courseId).replace('MID', moduleId))
            .then(response => response.json());
    }
}

export default LessonServiceClient;