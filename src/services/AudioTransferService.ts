import HTTP from '../libs/HTTP';

class VideoTransferService extends HTTP {
  /** 上传单个音频文件 */
  async uploadAudioFile<Res extends Record<string, any>>(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await this.request<Res>({
        method: 'POST',
        url: '/audios/transfer-ncm-to-mp3',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data: Res = response.data?.data || response.data;

      return data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  /** 上传多个音频文件（最多十个） */
  async uploadAudioFileList<Res extends Record<string, any>>(files: FileList) {
    try {
      const formData = new FormData();

      for (let file of files) {
        formData.append('files', file, file.name);
      }

      const response = await this.request<Res>({
        method: 'POST',
        url: '/audios/transfer-ncm-to-mp3s',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data: Res = response.data;

      return data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
}

export default VideoTransferService;
