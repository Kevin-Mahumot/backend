import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginModel, ChangeUserPasswordModel, verificationCodeModel,verifyCodeModel,newPasswordModel } from '../model/loginModel.mjs';
import { main } from '../utils/email.mjs';

async function loginUser(req, res) {
    const { email, password } = req.body;

    loginModel([email], async (err, results) => {
        if (err) {
            res.json({ success: false, error: 'Internal server error!' });
            return;
        }

        if (results.length === 0) {
            return res.json({ success: false, error: 'User not found!' });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, 'secret_key');
        res.json({ success: true, token });
    });
}
async function ChangeUserPassword(req, res) {
    const email = req.body.email;
    const numberOfDigits = 4; 
    const min = Math.pow(10, numberOfDigits - 1);
    const max = Math.pow(10, numberOfDigits) - 1;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;

    ChangeUserPasswordModel(email, async (err, results) => {
        if (err) {
            res.json({ success: false, error: 'Internal server error!' });
            return;
        }
        if (results.length === 0) {
            res.json({ success: false, error: 'User not found' });
            return;
        }

        let userId = results[0].user_id;

        const data = [
            userId,
            email,
            code
        ];
        
        verificationCodeModel(data, async (err, results) => {
            if (err) {
                res.json({ success: false, error: 'Internal server error!' });
                return;
            }
            await main(email, code);
            res.json({ success: true, msg: 'Please Check your Email and use the code to verify!' });
        });
    });
}


async function verifyCode(req, res) {
    const { code } = req.body;

    verifyCodeModel([code], async (err, results) => {
        if (err) {
            res.json({ success: false, error: 'Internal server error!' });
            return;
        }
        if(results.length===0){
            res.json({ success: false, error: 'Code does not match!' });
            return;
        }
        res.json({ success: true, msg:'Your Email is verified!' });
    });
}

async function  newPassword(req, res) {
    const { password } = req.body;
    const pwd = await bcrypt.hash(password,10);
    const { id } = req.params;
    const data =[
    pwd,
    id
    ];
    newPasswordModel(data, async (err, results) => {
        if (err) {
            res.json({ success: false, error: 'Internal server error!' });
            return;
        }
        res.json({ success: true, msg:'Your Password has been change Successfully!' });
    });
}
export { loginUser, ChangeUserPassword, verifyCode, newPassword};