// import jwt from 'jsonwebtoken'

// const authUser = async(req,res,next) => {
//     const {token} = req.cookies;
//     if(!token){
//         return res.json({success : false,message:'Not Authorized'})
//     }

//     try {
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.userId = tokenDecode.id
//         }else{
//             return res.json({ success : false,message:'Not Authorized!'})
//         }

//         next();
//     } catch (error) {
//         res.json({success:false,message : error.message})
//     }
// }


// export default authUser;


import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token payload',
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: ' + error.message,
    });
  }
};

export default authUser;
