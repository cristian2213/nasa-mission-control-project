// NOTE IF I PASS ZERO LIKE A NUMBER IN THE QUERY MONGO'S GONNA RETUNR ALL DOCUMENTS
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit; // (page-1)*limit <===> (2 - 1) * 10;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
