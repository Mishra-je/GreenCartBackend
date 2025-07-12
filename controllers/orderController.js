import Order from "../models/Order.js";
import Product from "../models/Product.js";



// place order cod : - /api/oreder/cod


export const placeOrderrCOD =  async(req,res) => {
    try {
        const {userId,items,address} = req.body;
        if(!address || items.length === 0){
            return res.json({success : false,message : 'Invalid Data' })
        }

        let amount =  await items.reduce(async (acc,item) => {
            const product =  await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)


        // add Tax charge 2 % 

        amount =  Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })


        return res.json({success : true, message : 
            'Order Placed SuccessFully '
        })
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message : error.message })
    }
}



// Get Orders by user Id  : /api/order/user

// export const getUserOrders = async(req,res) => {
//     try {
//         const userId  = req.body;
//         const orders = await Order.find({userId, $or : [{paymentType : 'COD'}, {isPaid : true}]}).populate("items.product address ").sort({
//             createdAt : -1
//         })

//         res.json({success : true, orders})
//     } catch (error) {
//         res.json({success : false,  message : error.message})
//     }
// }


// export const getUserOrders = async (req, res) => {
//   try {
//     const  userId  = req.body; // if POST
//     console.log("REQ BODY:", req.body);
//     console.log("USER ID:", userId);

//     const orders = await Order.find({
//     userId,  // must exactly match in DB
//       $or: [{ paymentType: "COD" }, { isPaid: true }]
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, orders });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.query.userId; // ✅ use query param
    console.log("REQ QUERY:", req.query);
    console.log("USER ID:", userId);

    if (!userId) {
      return res.json({ success: false, message: "No userId provided" });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};














// Get all orders for seller and admin : /api/order/seller

// export const getAllOrders = async(req,res) => {
//     try {
        
//         const orders = await Order.find({ $or : [{paymentType : 'COD'}, {isPaid : true}]}).populate("items.product address ").sort({createdAt : -1})

//         res.json({success : true, orders})
//     } catch (error) {
//         res.json({success : false,  message : error.message})
//     }
// }

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address") // ✅ no extra space!
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

