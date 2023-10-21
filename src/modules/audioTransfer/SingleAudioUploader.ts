import AudioUploader from './AudioUploader';

import FileShowList, {
  showFileShowListContent,
  showFileShowListHeader
} from '../../components/FileShowList';
import AudioTransferSerivce from '../../services/AudioTransferService';

const service = new AudioTransferSerivce();

class SingleAudioUploader extends AudioUploader {
  public constructor(el: HTMLElement) {
    super(el);
  }

  protected override handleUploadChange() {
    const file = this.oUploadInput.files[0];
    if (!file) return;

    // 1. 把待上传的文件信息展示出来
    this.oFileShowList.innerHTML = FileShowList(
      showFileShowListHeader(`选择上传的文件：------`),
      showFileShowListContent(
        1,
        `
          <th align="left" width="80px">索引</th>
          <th align="left" width="200px">文件名称</th>
          <th align="left" width="360px">文件大小（单位：MB）</th>
          <th align="left">最近修改时间</th>
        `,
        [file]
      ),
    );

    // 把名称设置到输入框
    this.oAudioNameInput.value = file.name;
  }

  protected override handleSubmitBtnClick() {
    const files: File[] = [...this.oUploadInput.files];
    const inputName = this.oAudioNameInput.value.trim();
    if (!files.length) {
      window.alert('请选择上传的文件！');
      return;
    };
    if (!inputName) {
      window.alert('上传的名称不能为空！');
      return;
    }
    this.handleSubmit(files);
  }

  private async handleSubmit(files: File[]) {
    try {
      const [file] = files;
      const { code, msg, data } = await service.uploadAudioFile(file);
      if (!!code) {
        throw new Error(msg);
      }
      window.alert(`上传成功：${JSON.stringify(data)}`);
      const confirm = window.confirm('是否需要清空数据？');
      confirm && this.handleReset();
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : '未知错误';
      window.alert(`上传失败，原因：${errMsg}`);
    }
  }
}

export default SingleAudioUploader;
