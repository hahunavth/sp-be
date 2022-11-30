const db = require("../models/index");
const supplier = db["supplier"];
const Response = require("../utils/responses");
const QueryParser = require("../utils/query");

class supplierController {
  /**
   * NOTE - api cung cấp danh sách gồm product_id và giá nhập của tất cả sp
   * LINK - cung cấp cho module Product
   */
  async getProductImportPriceList(req, res) {
    try {
      const data = await supplier.findAll({
        // attributes: { include: ["product_id", "price"] },
      });
      return Response.success(res, data);
    } catch (e) {
      return Response.error(res, e);
    }
  }

  async getAllSupplier(req, res) {
    // TODO: paginate
    const { limit, offset, page } = QueryParser.paginate(req);

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

        const data = filteredSuppliers.findAndCountAll({
          where: {},
          order: [],
          limit,
          offset,
        });
        return Response.paginate(res, page, limit, data?.count, data?.rows);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async createHistory(req, res) {
    try {
      const data = req.body;
      // TODO: VALIDATE DATA
      const newRecord = await supplier.create(data);
      return Response.success(res, newRecord.toJSON());
    } catch (e) {
      Response.error(res, e);
    }
  }

  async findById(req, res) {
    await supplier
      .findByPk(req.params.id)
      .then((result) => {
        return Response.success(res, result);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async updateHistory(req, res) {
    try {
      const updated = await supplier.update(req.body, {
        where: { id: req.params.id },
      });
      return Response.success(res);
    } catch (e) {
      Response.error(res, e);
    }
  }

  async deleteHistory(req, res) {
    try {
      await supplier.destroy({
        where: {
          id: req.params.id,
        },
      });

      return Response.success(res);
    } catch (error) {
      return Response.error(res, error);
    }
  }
}

module.exports = new supplierController();
