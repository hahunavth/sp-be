const db = require('../db');
const supplier = db.supplier;
const newSupplier = require('../config/config.json');

class supplierController {
  async getAllSupplier(req, res) {
    await supplier
      .findAll()
      .then((result) => {
        const filters = req.query;
        const filteredSuppliers = result.filter((supplier) => {
          let isValid = true;
          for (let key in filters) {
            isValid = isValid && supplier[key] == filters[key];
          }
          return isValid;
        });
        return res.status(200).json({
          page: 0,
          limit: 0,
          data: { filteredSuppliers },
          message: 'Sucessfully',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createHistory(req, res) {
    const list = newSupplier.supplier;
    await supplier
      .bulkCreate(list)
      .then((result) => {
        return res.json({
          status: 200,
          data: {},
          message: 'Create list history successfull',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findById(req, res) {
    await supplier
      .findByPk(req.params.id)
      .then((result) => {
        return res.status(200).json({
          data: { result },
          message: 'Sucessfully',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateHistory(req, res) {
    try {
      await supplier.update(req.body, { where: { id: req.params.id } });

      return res.status(200).send('Updated!');
    } catch (error) {
      return res.json({
        Error: 'Something went wrong! Check this message: ' + error,
      });
    }
  }

  async deleteHistory(req, res) {
    try {
      await supplier.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send('Deleted!');
    } catch (error) {
      return res.json({
        Error: 'Something went wrong! Check this message: ' + error,
      });
    }
  }
}

module.exports = new supplierController();
