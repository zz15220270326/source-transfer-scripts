import HTTP from '../libs/HTTP';

import { IUploadVideoObject } from '../types';
import { Modal } from '../modules/common';

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
    const loadingModal = Modal.create('info', {
      width: 300,
      title: '正在上传视频',
      content: '请耐心等待 。。。',
      isShowOkBtn: false,
      isShowCancelBtn: false,
      isShowCloseIcon: false,
    });
    loadingModal.show();
    const resList: Record<string, any>[] = await Promise.all(uploadObjectList.map((uploadObject) => {
      const { file } = uploadObject;
      return this.uploadVideoFile(file);
    }));
    loadingModal.hide();
    if (resList.every(item => item.code === 0)) {
      return new Promise<Record<string, any>>((resolve) => {
        Modal.create('success', {
          width: 360,
          title: '上传成功',
          content: '转换视频 ?（可能需要一些时间，请耐心等候）',
          onOk: async () => {
            const response = await this.createVideo(filename);
            resolve(response);
          },
          onCancel: () => {
            resolve({
              code: 1,
              msg: '您取消了上传'
            });
          },
          okBtnText: '确认转换',
          cancelBtnText: '取消转换',
          isShowCloseIcon: false
        }).show();
      });
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
