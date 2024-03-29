const orderModel = require("../../DB/Model/order");

// get all Orders

const allOrder = (req, res) => {
  orderModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

//  New Order function
const addOrder = (req, res) => {
  const { Quantity, user, orders, totalPrice } = req.body;
  const order = new orderModel({
    user,
    orders,
    Quantity,
    totalPrice,
  });

  order
    .save()
    .then(async (result) => {
      //   await userModel.findByIdAndUpdate(seller, { $push: { shop: result } });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

// Update the Order function
const updateOrder = async (req, res) => {
  const { totalPrice, Quantity, orders } = req.body;
  const findOrder = await orderModel.findOne({ orders });

  await orderModel
    .findOneAndUpdate(
     {orders},
      { $set: { totalPrice, Quantity } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(err);
    });
};

// delete the Order function
const deleteOrder = async (req, res) => {
  const { orders } = req.query;
  const find = await orderModel.findOne({ orders });

  await orderModel
    .findByIdAndDelete(find._id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
module.exports = { addOrder, allOrder, updateOrder, deleteOrder };
