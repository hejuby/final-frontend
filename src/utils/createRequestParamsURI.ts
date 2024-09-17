const createRequestParamsURI = (
  searchParams: Record<string | number | symbol, string>,
) =>
  Object.keys(searchParams).length
    ? `?${Object.keys(searchParams)
        .map((param, index) => `${param}=${Object.values(searchParams)[index]}`)
        .join("&")}`
    : "";

export default createRequestParamsURI;
