import { Query } from './index';

const userName = async (name: string) => Query('CALL spIdName(?)', [name]);
const allUserNames = async () => Query('SELECT name, id FROM users');

export default {
    userName, 
    allUserNames
}