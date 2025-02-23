import HttpClient from './axios';

interface OssSignatureResponse {
    policy: string;
    ossAccessKeyId: string;
    signature: string; // 上传用到的签名
    dir: string; // 上传目录
    host: string; // 上传的 host
}

export const upload = async (file: File | null, filename: string): Promise<string> => {
    if (!file) {
        return Promise.reject(new TypeError(`File ${filename} not found`));
    }
    // 获取签名
    const response = await HttpClient.get<OssSignatureResponse>("v1/oss/signature");

    if (response.status !== 200) {
        throw new Error("获取签名失败");
    }

    const data = response.data;

    // 创建表单数据
    const formData = new FormData();
    formData.append("name", filename);
    formData.append("policy", data.policy);
    formData.append("OSSAccessKeyId", data.ossAccessKeyId);
    formData.append("success_action_status", "200");
    formData.append("signature", data.signature);
    formData.append("key", data.dir + filename);
    formData.append("file", file);

    // 上传文件到 OSS
    await HttpClient.post(data.host, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return new Promise<string>((resolve) => {
        const url = `${data.host + data.dir + filename}`
        resolve(url)
    })
};