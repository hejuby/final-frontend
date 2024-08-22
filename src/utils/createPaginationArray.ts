const createPaginationArray = (
  chunkSize: number,
  totalPages: number,
  currentPage: number,
) =>
  Array.from(
    { length: chunkSize },
    (_, i) =>
      i +
      1 +
      Math.floor((currentPage < 1 ? 1 : currentPage - 1) / chunkSize) *
        chunkSize,
  ).filter((index) => index <= totalPages);

export default createPaginationArray;
