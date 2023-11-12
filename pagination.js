
function paginate(items, page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const paginatedItems = items.slice(startIndex, endIndex);
  
    const paginationInfo = {
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(items.length / pageSize),
      totalItems: items.length,
      hasNextPage: endIndex < items.length,
      hasPreviousPage: startIndex > 0,
    };
  
    return { items: paginatedItems, paginationInfo };
  }
  
  module.exports = paginate;
  