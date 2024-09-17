const createPaginationArray = (
  chunkSize: number,
  totalPages: number,
  currentPage: number,
) =>
  Array.from(
    { length: chunkSize },
    (_, i) =>
      i +
      Math.floor((currentPage < 0 ? 0 : currentPage) / chunkSize) * chunkSize,
  ).filter((index) => index < totalPages);

export default createPaginationArray;
