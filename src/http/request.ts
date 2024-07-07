import { getMessageInfo } from './status';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

interface IBaseResponse<T = any> {
	code: number | string;
	message: string;
	data: T;
}

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_MOCK_ENABLE
		? import.meta.env.VITE_APP_MOCK_BASEURL
		: import.meta.env.VITE_APP_API_BASEURL,
	timeout: 5000
});

// axios请求拦截
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// axios响应拦截
axios.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			return response.data;
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error'
		});
		return response;
	},
	(error) => {
		const { response } = error;
		if (response) {
			ElMessage({
				message: getMessageInfo(response.status),
				type: 'error'
			});
			return Promise.reject(error);
		}
		ElMessage.error('网络连接异常，请重试！');
		return Promise.reject(error);
	}
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
export const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<IBaseResponse>>(conf).then((res: AxiosResponse<IBaseResponse>) => {
			const data = res.data;
			// 如果data.code为错误代码返回message信息
			if (data.code !== 0) {
				ElMessage({
					message: data.message,
					type: 'error'
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: 'success'
				});
				// 此处返回data信息 也就是 api 中配置好的 Response类型
				resolve(data.data as T);
			}
		});
	});
};

export default service;
