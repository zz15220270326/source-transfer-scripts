import AudioUploader from './AudioUploader';

import { Modal } from '../common';

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
      Modal.create('warning', {
        width: 300,
        isShowCloseIcon: false,
        title: '提示',
        content: '请选择需要上传的文件',
        okBtnText: '确定',
        isShowCancelBtn: false
      }).show();
      return;
    };
    if (!inputName) {
      Modal.create('warning', {
        width: 300,
        isShowCloseIcon: false,
        title: '提示',
        content: '上传的名称不能为空！',
        okBtnText: '确定',
        isShowCancelBtn: false
      }).show();
      return;
    }
    this.handleSubmit(files);
  }

  private async handleSubmit(files: File[]) {
    const loadingModal = Modal.create('info', {
      width: 300,
      title: '正在上传视频',
      content: '请耐心等待 。。。',
      isShowOkBtn: false,
      isShowCancelBtn: false,
      isShowCloseIcon: false,
    });
    try {
      loadingModal.show();
      const [file] = files;
      const { code, msg, data } = await service.uploadAudioFile(file);
      loadingModal.hide();
      if (!!code) {
        throw new Error(msg);
      }
      Modal.create('success', {
        width: 320,
        title: '上传成功',
        content: `
          <p>
            上传内容：
            ${data?.playUrl ? `<a href="${data?.playUrl}" target="_blank">点击音频链接</a>` : ''}
          </p>
          <p>是否需要清空上传内容？</p>
        `,
        okBtnText: '清除',
        cancelBtnText: '不清除',
        onOk: () => {
          this.handleReset(); 
        }
      }).show();
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : '未知错误';
      Modal.create('error', {
        width: 360,
        title: '上传失败',
        content: errMsg,
      });
    }
  }
}

export default SingleAudioUploader;
