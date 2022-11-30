const db = require("../db");
const supplier = db.supplier;
// const newSupplier = require("../config/config.json");
const Response = require("../utils/responses");

class supplierController {
  /**
   * NOTE - api cung cấp danh sách gồm product_id và giá nhập của tất cả sp
   * LINK - cung cấp cho module Product
   */
  async getProductImportPriceList(req, res) {
    try {
      const data = await supplier.findAll({
        attributes: { include: ["product_id", "price"] },
      });
      return Response.success(res, data);
    } catch (e) {
      return Response.error(res, e);
    }
  }

  async getAllSupplier(req, res) {
    // TODO: paginate
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
        // return res.status(200).json({
        //   page: 0,
        //   limit: 0,
        //   data: { filteredSuppliers },
        //   message: 'Sucessfully',
        // });
        return Response.paginate(res, filteredSuppliers);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async createHistory(req, res) {
    const list = newSupplier.supplier;
    await supplier
      .bulkCreate(list)
      .then((result) => {
        // return res.json({
        //   status: 200,
        //   data: {},
        //   message: "Create list history successfull",
        // });
        return Response.success(res, list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findById(req, res) {
    await supplier
      .findByPk(req.params.id)
      .then((result) => {
        // return res.status(200).json({
        //   data: { result },
        //   message: "Sucessfully",
        // });
        return Response.success(result);
      })
      .catch((err) => {
        // console.log(err);
        return Response.error(res, err);
      });
  }

  async updateHistory(req, res) {
    try {
      await supplier.update(req.body, { where: { id: req.params.id } });

      return res.status(200).send("Updated!");
    } catch (error) {
      // return res.json({
      //   Error: "Something went wrong! Check this message: " + error,
      // });
      return Response.error(res, error);
    }
  }

  async deleteHistory(req, res) {
    try {
      await supplier.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send("Deleted!");
    } catch (error) {
      // return res.json({
      //   Error: "Something went wrong! Check this message: " + error,
      // });
      return Response.error(res, err);
    }
  }
}

module.exports = new supplierController();
