class QueryParser {
  static paginate(req) {
    // let isPaginate
    let { page, limit } = req.query;
    page = Number.parseInt(page);
    limit = Number.parseInt(limit);
    if (!page || !limit) {
      return {
        page,
        limit,
        offset: null,
      };
    }
    const offset = (page - 1) * limit;
    return {
      page,
      offset,
      limit,
    };
  }
}
module.exports = QueryParser;
