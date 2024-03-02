const query = `
    select exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
        and table_name = 'users'
    )
`;

const createTable = `
    create table users (
        id text not null,
        login varchar(50) not null,
        password text not null
    )
`;

const createTableToken = `
    create table token (
        id text not null,
        refreshToken text not null
    )
`;

const selectRowsFromTable = (login) => `
    select login, password from users where login='${login}'
`;

const insertInto = (id, login, password) => `
    insert into users(id, login, password) values(
        '${id}',
        '${login}',
        '${password}'
    )
`;

const insertIntoToken = (id, refreshToken) => `
    insert into token(id, refreshToken) values(
        '${id}',
        '${refreshToken}'
    )
`;

const sqlHandlers = {
    query,
    createTable,
    createTableToken,
    selectRowsFromTable,
    insertInto,
    insertIntoToken
}

module.exports = {
    sqlHandlers
}