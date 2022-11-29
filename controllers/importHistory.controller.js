const db = require("../db");
const importHistory = db.import_history;
const newHistoryList = require("../config/config.json");

class importHistoryController {
  async getAllProduct(req, res) {
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
        return res.status(200).json({
          page: 0,
          limit: 0,
          data: { filteredProducts },
          message: "Sucessfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createHistory(req, res) {
    const list = newHistoryList.importHistory;
    await importHistory
      .bulkCreate(list)
      .then((result) => {
        return res.json({
          status: 200,
          data: {},
          message: "Create list history successfull",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findById(req, res) {
    await importHistory
      .findByPk(req.params.id)
      .then((result) => {
        return res.status(200).json({
          data: { result },
          message: "Sucessfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateHistory(req, res) {
    try {
      await importHistory.update(req.body, { where: { id: req.params.id } });

      return res.status(200).send("Updated!");
    } catch (error) {
      return res.json({
        Error: "Something went wrong! Check this message: " + error,
      });
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
      return res.json({
        Error: "Something went wrong! Check this message: " + error,
      });
    }
  }
}

module.exports = new importHistoryController();
