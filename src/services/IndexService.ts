import HTTP from '../libs/HTTP';

class IndexService extends HTTP {
  async removeVideo(videoId: string) {
    const response = await this.request({
      method: 'delete',
      url: `/videos/remove-video/${videoId}`,
      params: {},
    });

    return response.data;
  }

  async removeAudio(audioId: string) {
    const response = await this.request({
      method: 'delete',
      url: `/audios/remove-audio/${audioId}`,
      params: {},
    });

    return response.data;
  }
}

export default IndexService;
