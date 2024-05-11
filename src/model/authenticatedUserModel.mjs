import {connection} from '../config/db.mjs';


function  getAuthenticatedUserModel(data,callback) {
    const query = "SELECT * FROM users WHERE user_id=?";
    connection.query(query,data, callback);
}


export {getAuthenticatedUserModel};