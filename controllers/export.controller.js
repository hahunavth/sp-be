const db = require("../models/index");
const Response = require("../utils/responses");
const axios = require("axios");

class ExportController {
  async exportProduct(req, res) {
    //Nhận yêu cầu từ đơn hàng
    const { products, ship_info } = req.body;

    if (!(products && ship_info)) {
      Response.input(res);
    }

    if (!req.body?.order_id) {
      return Response.error(res, "Missing order id");
    }

    const { data, status } = await axios.get(process.env.M01_PROD);
    if (status != 200) {
      return Response.error(res, "Cannot export products from warehouse");
    }

    const { ddata, dstatus } = await axios.post(process.env.O02_DELI_REQ, {
      body: { order_id: req.body?.order_id },
    });
    if (status != 200) {
      return Response.error(res, "Delivery error");
    }

    return Response.success(res, {
      products,
      ship_info,
      data_ship: [],
    });
  }
}

module.exports = new ExportController();
