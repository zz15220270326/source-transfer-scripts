import HTTP from '../libs/HTTP';

import { IUploadVideoObject } from '../types';

class VideoTransferService extends HTTP {
  async uploadVideoFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await this.request({
      method: 'POST',
      url: '/videos/upload-file',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  }

  async uploadVideoFiles(uploadObjectList: IUploadVideoObject[], filename = 'video') {
    const resList: Record<string, any>[] = await Promise.all(uploadObjectList.map((uploadObject) => {
      const { file } = uploadObject;
      return this.uploadVideoFile(file);
    }));
    if (resList.every(item => item.code === 0)) {
      const confirm = window.confirm('上传成功，转换视频 ?（可能需要一些时间，请耐心等候）');
      if (!confirm) {
        return {
          code: 1,
          msg: '您取消了上传'
        };
      };

      const response = await this.createVideo(filename);
      return response as Record<string, any>;
    }

    return {
      msg: 'error',
      code: -1
    };
  }

  async createVideo(outputPath: string) {
    const response = await this.request({
      method: 'POST',
      url: '/videos/transfer',
      data: {
        outputPath,
        clear: true,
      },
    });

    return response.data;
  }
}

export default VideoTransferService;
