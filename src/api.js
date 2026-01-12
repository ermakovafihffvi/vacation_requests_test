import axios from 'axios';

const api = {
    loadUsers: async () => {
        return await axios.get('/api/users');
    },

    sendVacationRequest: async (data) => {
        return await axios.post('/api/send-vacation-request', data);
    },

    loadVacations: async (userId = 0, sort = {}) => {
        const sortDirection = sort.direction;
        const sortParam = sort.param;
        let url = '/api/get-vacations/' + (userId ? userId : '');
        if (sortDirection && sortParam) {
            url = url + '?sortDirection=' + sortDirection + '&sortParam=' + sortParam;
        }
        return await axios.get(url);
    },

    handleVacationRequest: async (id, data) => {
        return await axios.post('/api/handle-vacation-request/' + id, data);
    },
};

export default api;
