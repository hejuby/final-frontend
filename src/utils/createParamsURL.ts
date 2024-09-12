const createParamsURL = (
  method: "set" | "delete",
  searchParams: Record<string, string>,
  pathname: string,
  paramName: string,
  paramValue?: string,
) => {
  const params = new URLSearchParams(searchParams);
  if (method === "set") {
    if (!paramValue) {
      return `${pathname}?${params.toString()}`;
    }
    params.set(paramName, paramValue);
  }
  if (method === "delete") {
    params.delete(paramName);
  }
  return `${pathname}?${params.toString()}`;
};

export default createParamsURL;
