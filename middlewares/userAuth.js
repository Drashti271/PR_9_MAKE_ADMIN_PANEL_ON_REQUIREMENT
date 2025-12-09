import UserModel from "../models/user.model.js";

const userAuth = async function(req,res,next){
    const {id} = req.cookies;
    if(!id){
        return res.redirect('/login');
    }

    res.locals.user = await UserModel.findById(id);
    return next();
}

export default userAuth;
