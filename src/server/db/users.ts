import { Query } from './index';

// const userName = async (name: string) => Query('SELECT id AS "userid" FROM users WHERE name = ?', [name]);
// const newUsersName = async (name: string) => Query('CALL spIdName(?)', [name]);
const userName = async (name: string) => Query('CALL spIdName(?)', [name]);



export default {
    userName, 
    // newUsersName
}