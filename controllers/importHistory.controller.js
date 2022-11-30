const db = require("../db");
const importHistory = db.import_history;
const newHistoryList = require("../config/config");
const Response = require("../utils/responses");
const QueryParser = require("../utils/query");

class importHistoryController {
  async getAllProduct(req, res) {
    try {
      const { limit, offset, page } = QueryParser.paginate(req);
      // NOTE: paginate
      // TODO: filter by attr
      await importHistory.findAll().then(async (result) => {
        const filters = req.query;
        try {
          const data = await importHistory.findAndCountAll({
            where: {},
            order: [],
            limit,
            offset,
          });
        } catch (e) {
          return Response.error(res, err);
        }

        return Response.paginate(res, page, limit, data?.count, data?.rows);
      });
    } catch (err) {
      return Response.error(res, err);
    }
  }

  async createHistory(req, res) {
    try {
      // const list = newHistoryList.importHistory;
      const data = req.body;
      // TODO: VALIDATE DATA
      const newRecord = await importHistory.create(data);
      return Response.success(res, newRecord.toJSON());
    } catch (e) {
      Response.error(res, e);
    }
  }

  async findById(req, res) {
    await importHistory
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
