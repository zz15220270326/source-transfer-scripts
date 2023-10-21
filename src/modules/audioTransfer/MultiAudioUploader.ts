import AudioUploader from './AudioUploader';

import FileShowList, {
  showFileShowListContent,
  showFileShowListHeader
} from '../../components/FileShowList';
import AudioTransferSerivce from '../../services/AudioTransferService';

const service = new AudioTransferSerivce();


class MultiAudioUploader extends AudioUploader {
  public constructor(el: HTMLElement) {
    super(el);
  }

  protected override handleUploadChange() {
    const { files } = this.oUploadInput;
    if (!files.length) return;

    // 1. 把待上传的文件信息展示出来
    this.oFileShowList.innerHTML = FileShowList(
      showFileShowListHeader(`选择上传的文件：------`),
      showFileShowListContent(
        files.length,
        `
          <th align="left" width="80px">索引</th>
          <th align="left" width="200px">文件名称</th>
          <th align="left" width="360px">文件大小（单位：MB）</th>
          <th align="left">最近修改时间</th>
        `,
        [...files]
      ),
    );
    // 2. 把名称设置到输入框
    this.oAudioNameInput.value = [...files].map(file => file.name).join('、');
  }

  protected handleSubmitBtnClick() {
    const files = this.oUploadInput.files;
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

  protected async handleSubmit(files: FileList) {
    try {
      const { code, msg, data } = await service.uploadAudioFileList(files);
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

export default MultiAudioUploader;
