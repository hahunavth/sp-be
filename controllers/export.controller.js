const db = require("../db");
const Export1 = db.exports;
const Response = require("../utils/responses");

class ExportController {
  async exportProduct(req, res) {
    //Nhận yêu cầu từ đơn hàng
    const { products, ship_info } = req.body;

    if (!(products && ship_info)) {
      Response.input(res);
    }

    const dateShip = new Date();
    //Kiểm tra tính khả dụng của đơn hàng
    // if(req.)
    // goi api kho
    // const response = await fetch(
    //   "http://localhost/getInfoProduct/id/" +
    //     req.body.productId +
    //     "/size/" +
    //     req.body.size +
    //     "/color/" +
    //     req.body.color
    // );
    // const resJson = await response.json();

    // if (dataProduct.quantity < resJson.Amount) {
    //   res.send("Khong du so luong");
    // }

    Response.success(res, {
      products,
      ship_info,
      data_ship: [],
    });
  }
}

module.exports = new ExportController();
