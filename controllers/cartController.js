



// update user cart data : /api/cart/update

import User from "../models/User.js";

export const updateCart = async(req,res) =>{
    try {

        const {userId,cartItems}  = req.body;
      await User.findByIdAndUpdate(userId, {  cartItems });

        
     res.json({
            success : true,
            message : 'Cart Updated '
        })
    } catch (error) {
         console.log(error.message)
        res.json({success : false,message : error.message})
    }
}

// import User from "../models/User.js";

// export const updateCart = async (req, res) => {
//   try {
//     const { userId, cartItems } = req.body;

//     console.log('Incoming cartItems:', cartItems);

//     const updated = await User.findByIdAndUpdate(
//       userId,
//       { $set: { cartItems } },
//       { new: true }
//     );

//     console.log('Updated user:', updated);

//     res.json({
//       success: true,
//       message: "Cart Updated",
//       data: updated
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
