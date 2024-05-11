import { addUserModel,getAllUsersModel, putUsersModel} from '../model/userModel.mjs';
import bcrypt from 'bcrypt';

async function addUser(req,res){

 const {fullname, email, password}=req.body;
 const pwd= await bcrypt.hash(password,10);
 const data=[fullname, email,pwd,"user"];

 console.log(data);
 addUserModel(data,(err,results)=>{
     if(err){
        res.status(500).json({success:false,message:'Inserted Unsuccessful!'});
        return;
     }else{
        res.status(200).json({success:true,message:'Inserted successful!'});

     }
 });
}

async function getUser(req, res) {
   getAllUsersModel((err, results) => {
       if (err) {
           res.status(500).json({ success: false, message: 'Retrieval Unsuccessful!' });
           return;
       } else {
           res.status(200).json({ success: true, message: 'Retrieval successful!', data: results });
       }
   });
}


async function putUser(req, res) {
    const {fullname} =req.body;
    const {id} =req.params;
    const profile = req.file.filename; 
    const data = [profile,fullname, id];


    putUsersModel(data,(err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Updated Unsuccessful!' });
            return;
        } else {
            res.status(200).json({ success: true, message: 'Updated successful!', data: results });
        }
    });
 }

export {addUser, getUser,putUser};