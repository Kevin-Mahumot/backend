import { connection } from '../config/db.mjs';

function loginModel(data, callback) {
    const query = "SELECT * FROM users WHERE email=?";
    connection.query(query, data, callback);
}
function ChangeUserPasswordModel(email, callback) {
    const query = "SELECT user_id FROM users WHERE email=?";
    connection.query(query, email, callback);
}
function verificationCodeModel(data, callback) {
    const query = "INSERT INTO verificationCode (user_id, email, code) VALUES (?, ?, ?)";
    connection.query(query, data, callback);
}

function verifyCodeModel(code,callback){
    const query = "SELECT * FROM verificationCode WHERE code=?";
    connection.query(query, code, callback);
}
function  newPasswordModel(data,callback){
    const query = "UPDATE users SET password=? WHERE user_id=?";
    connection.query(query,data, callback);
}
export { loginModel, ChangeUserPasswordModel, verificationCodeModel,verifyCodeModel,newPasswordModel };