const db = require('../db');
const product = db.products;

class ProductController {
  async getAllProduct(req, res) {
    await product
      .findAll()
      .then((result) => {
        var data;
        if (Object.keys(req.query).length === 0) data = result;
        else {
          data = result.filter((value) => {
            if (req.query.name != undefined)
              return value.name.includes(req.query.name);
            if (req.query.size != undefined)
              return value.size.includes(req.query.size);
            if (req.query.color != undefined)
              return value.color.includes(req.query.color);
          });
        }
        return res.status(200).json({
          page: 0,
          limit: 0,
          data: { data },
          message: 'Sucessfully',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new ProductController();
