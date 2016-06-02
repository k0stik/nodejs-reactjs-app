import Base from './Base';

export default class UsersAPI extends Base {
    create({Login, Email, Name, Password, ConfirmPassword}) {
        return this.apiClient.post('users/', {Login, Email, Name, Password, ConfirmPassword});
    }
}