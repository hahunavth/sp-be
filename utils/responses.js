class Response {
  static input(res) {
    return res.status(400).json({
      status: 400,
      errors: ["Input error"],
    });
  }

  static error(res, err) {
    // NOTE: SHOW ERROR IN CONSOLE!
    console.error(err);

    return res.status(500).json({
      status: 400,
      errors: [err.message || "Server error"],
    });
  }

  static success(res, data) {
    return res.status(200).json({
      status: 200,
      message: "Sucessfully",
      data,
    });
  }

  static paginate(res, page, limit, count, data, message) {
    return res.status(200).json({
      status: 200,
      message: message || "Successfully",
      page,
      limit,
      count,
      data,
    });
  }
}

module.exports = Response;
