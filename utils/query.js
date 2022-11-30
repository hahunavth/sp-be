class QueryParser {
  static paginate(req) {
    // let isPaginate
    let { page, limit } = req.query;
    page = Number.parseInt(page);
    limit = Number.parseInt(limit);

    const offset = (page - 1) * limit;
    return {
      page: page || undefined,
      offset: offset || undefined,
      limit: limit || undefined,
    };
  }
}
module.exports = QueryParser;
