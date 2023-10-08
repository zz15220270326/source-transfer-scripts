import HTTP from '../libs/HTTP';

class IndexService extends HTTP {
  async removeVideo(videoName: string) {
    const response = await this.request({
      method: 'delete',
      url: `/videos/remove-video/${videoName}`,
      params: {},
    });

    return response.data;
  }
}

export default IndexService;
