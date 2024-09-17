import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { cookies, headers } from "next/headers";

const BASE_URL = "https://g6-server.dainreview.kr/api";

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV.trim() === "development") {
    console.log(message);
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request`);

  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // logOnDev(
  //   `[API] ${config.method?.toUpperCase()} ${config.url} | Response ${status}`,
  // );

  return response;
};

const onError = (error: AxiosError | Error): AxiosResponse["data"] | Error => {
  if (axios.isAxiosError(error)) {
    logOnDev(`[API] ${error}`);
    // const { message } = error;
    // const { method, url } = error.config as AxiosRequestConfig;
    // const { status, statusText } = error.response as AxiosResponse;
    // logOnDev(
    //   `[API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}\n`,
    // );
    // logOnDev(
    //   `${error.response.data.result.result_code} | ${error.response.data.result.result_message}`,
    // );
    // return error.response.data;
  }
  // throw new Error();
};

const setUpInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponse, onError);

  return instance;
};

export default setUpInterceptors(api);

export function createServerAxiosInstance() {
  const axiosServer = axios.create({
    baseURL: BASE_URL,
  });

  // 서버 사이드 인터셉터
  axiosServer.interceptors.request.use((config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    console.log(
      "cookie : \n",
      cookieStore
        .getAll()
        .map((c) => `${c.name} ${c.value}`)
        .join("\n"),
    );
    if (token) {
      // eslint-disable-next-line
      config.headers.Cookie = `access_token=${token.value}`;
    }
    return config;
  });

  return axiosServer;
}
