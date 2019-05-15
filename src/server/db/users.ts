import { Query } from './index';

const userName = async (name: string) => Query('SELECT id AS "userid" FROM users WHERE name = ?', [name]);

export default {
    userName
}