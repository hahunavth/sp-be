const db = require('../db');
const products = db.products;

class ProductController {
  async getAllProduct(req, res) {
    await products
      .findAll()
      .then((result) => {
        const filters = req.query;
        const filteredProducts = result.filter((product) => {
          let isValid = true;
          for (let key in filters) {
            isValid = isValid && product[key] == filters[key];
          }
          return isValid;
        });
        return res.status(200).json({
          page: 0,
          limit: 0,
          data: { filteredProducts },
          message: 'Sucessfully',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new ProductController();
