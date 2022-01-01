const rateModel = require("../../DB/Model/rating");



const allRates = (req, res) => {
  rateModel
  .find()
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
}








const addRate = (req, res) => {
  const { rate, productId, byUser, toUser } = req.body;
  const rating = new rateModel({ rate, productId, byUser, toUser });
  rating
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addRate, allRates };
