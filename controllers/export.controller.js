const db = require("../db");
const Export1 = db.exports;

class ExportController {
  // async createExport(req,res){
  //   const {
  //     productId,
  //     size,
  //     color,
  //     quantity,
  //     from,i
  //     to,
  //     shipDate} = req.body
  //   await const export1 = Export1.create({
  //     pro
  //   })
  // }
  async exportProduct(req, res) {
    //Nhận yêu cầu từ đơn hàng
    const dataProduct = req.body.products;
    const shipInfo = req.body.shippingInfo;
    const dateShip = new Date();
    //Kiểm tra tính khả dụng của đơn hàng
    // if(req.)
    // goi api kho
    const response = await fetch(
      "http://localhost/getInfoProduct/id/" +
        req.body.productId +
        "/size/" +
        req.body.size +
        "/color/" +
        req.body.color
    );
    const resJson = await response.json();

    if (dataProduct.quantity < resJson.Amount) {
      res.send("Khong du so luong");
    }

    res.status(200).json({
      dataProduct: { dataProduct },
      shipInfo: { shipInfo },
      dateShip: { dateShip },
      message: "Sucessfully",
    });
  }
}

module.exports = new ExportController();
