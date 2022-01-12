const orderModel = require("../../DB/Model/order");

const addOrder = (req, res) => {
  const { Quantity, user, orders } = req.body;
  const order = new orderModel({
    user,
    orders,
    Quantity,
  });

  order
    .save()
    .then(async (result) => {
    //   await userModel.findByIdAndUpdate(seller, { $push: { shop: result } });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addOrder };
