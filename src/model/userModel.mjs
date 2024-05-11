import {connection} from '../config/db.mjs';

function addUserModel(data, callback){
    const query="INSERT INTO users (fullname,email,password,role) VALUES(?,?,?,?)";
    connection.query(query, data, callback);
}

function getAllUsersModel(callback) {
    const query = "SELECT * FROM users";
    connection.query(query, callback);
}

function putUsersModel(data,callback) {
    const query = "UPDATE users SET profile=?, fullname=? WHERE user_id=?";
    connection.query(query,data, callback);
}


export {addUserModel,getAllUsersModel,putUsersModel};