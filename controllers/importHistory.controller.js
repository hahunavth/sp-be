const db = require("../db");
const importHistory = db.import_history;
const newHistoryList = require("../config/config.json");
const Response = require("../utils/responses");

class importHistoryController {
  async getAllProduct(req, res) {
    // TODO: paginate
    await importHistory
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
        return Response.paginate(res, 0, 0, filteredProducts);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async createHistory(req, res) {
    const list = newHistoryList.importHistory;
    await importHistory
      .bulkCreate(list)
      .then((result) => {
        return Response.success(res, list);
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async findById(req, res) {
    await importHistory
      .findByPk(req.params.id)
      .then((result) => {
        return Response.success(res, result);
        // return res.status(200).json({
        //   data: { result },
        //   message: "Sucessfully",
        // });
      })
      .catch((err) => {
        return Response.error(res, err);
      });
  }

  async updateHistory(req, res) {
    try {
      await importHistory.update(req.body, { where: { id: req.params.id } });

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
      await importHistory.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send("Deleted!");
    } catch (error) {
      // return res.json({
      //   Error: "Something went wrong! Check this message: " + error,
      // });
      return Response.error(res, error);
    }
  }
}

module.exports = new importHistoryController();
