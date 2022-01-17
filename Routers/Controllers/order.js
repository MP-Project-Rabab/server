const orderModel = require("../../DB/Model/order");

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
      console.log(result);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
};

module.exports = { addOrder };
