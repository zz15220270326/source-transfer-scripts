import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HTTP {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      timeout: 5 * 60 * 1000,
      headers: {},
    });
  }

  private _interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      config => {
        // Do something before request is sent
        return config;
      },
      (error) => Promise.reject(error)
    );


    instance.interceptors.response.use(
      response => {
        return response;
      },
      (error) => Promise.reject(error)
    );
  }

  protected request<Res>(axiosConfig: AxiosRequestConfig): Promise<AxiosResponse<Res, Res>> {
    this._interceptors(this.axios);
    return this.axios.request(axiosConfig);
  }
}

export default HTTP;
