import HTTP from '../libs/HTTP';

class VideoTransferService extends HTTP {
  async uploadAudioFile<Res extends Record<string, any>>(file: File) {
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
  }
}

export default VideoTransferService;
