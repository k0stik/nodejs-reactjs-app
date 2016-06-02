import Base from './Base';

export default class SessionAPI extends Base {
    create({Login, Password}) {
        return this.apiClient.post('session/', {Login, Password});
    }

    delete() {
        return this.apiClient.post('session/');
    }
}