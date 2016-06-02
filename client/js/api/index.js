'use strict';

import ApiClient  from './ApiClient';
import Session    from './Session';
import Users      from './Users';

const api = new ApiClient({ prefix: 'http://localhost:8000/api' });

module.exports = {
    session: new Session({ apiClient: api }),
    users: new Users({ apiClient: api })
};