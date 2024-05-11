import { getAuthenticatedUserModel} from '../model/authenticatedUserModel.mjs';



async function getAuthenticatedUser(req, res) {
    const {id} =req.params;
    const data=[id];
    getAuthenticatedUserModel(data,(err, results) => {
       if (err) {
           res.status(500).json({ success: false, message: 'Retrieval Unsuccessful!' });
           return;
       } else {
           res.status(200).json({ success: true, message: 'Retrieval successful!', data: results });
       }
   });
}

export {getAuthenticatedUser};