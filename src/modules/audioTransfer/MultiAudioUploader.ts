import AudioUploader from './AudioUploader';

import { Modal } from '../common';

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

  protected async handleSubmit(files: FileList) {
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
      const { code, msg, data } = await service.uploadAudioFileList(files);
      loadingModal.hide();
      if (!!code) {
        throw new Error(msg);
      }
      // window.alert(`上传成功：${JSON.stringify(data)}`);
      // const confirm = window.confirm('是否需要清空数据？');
      // confirm && this.handleReset();
      Modal.create('success', {
        width: 600,
        title: '上传成功',
        content: `
          <p>
            ${
              Array.isArray(data)
              ?
              `
                <ul class="source-item-list">
                  ${
                    data.map(((item, index) => `
                      <li class="source-item" data-index="${index}">
                        <p>音频名称：${item.name}</p>
                        <p>音频链接：<a href="${item.playUrl}" target="_blank">${item.playUrl}</a></p>
                      </li>
                    `)).join('\n')
                  }
                </ul>
              `
              :
              ''
            }
          </p>
          <hr />
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

export default MultiAudioUploader;
