let _singleton = Symbol();
const TOPIC_API_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';
const TOPIC_URL = 'https://webdev-summer1-2018-1.herokuapp.com/api/topic';

class TopicServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }

    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId), {
            body: JSON.stringify(topic),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(response => response.json());
    }

    deteleTopic(topicId) {
        return fetch(`${TOPIC_URL}/${topicId}`, {
            method: 'delete'
        });
    }

    findAllTopics() {
        return fetch(TOPIC_URL)
            .then(response => response.json());
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(TOPIC_API_URL.replace('CID', courseId).replace('MID', moduleId).replace('LID', lessonId))
            .then(response => response.json());
    }
}

export default TopicServiceClient;