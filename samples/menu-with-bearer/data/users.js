let users = {
    'john@test.com': {
        password: '$2a$10$e93qS.dVq3WTgIh9rO2kfeYnNpi91d6LQ/wbE1coh6hUjK12oriEK', // password = fakepassword
        roles: ['user', 'admin']
    },
    'bob@test.com': {
        password: '$2a$10$UOgQjgPSu1xgZy5zU.YL0eOA4Hoxuxj76fLaDuKVZ5ZphjnkKc4Ka', // password = fakepassword
        roles: ['user']
    }
}

function getUser(email) {
    return users[email];
}
module.exports = getUser;
