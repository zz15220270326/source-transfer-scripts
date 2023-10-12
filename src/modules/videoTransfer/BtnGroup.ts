import DomModule from '../DomModule';
import Uploader from './Uploader';

import {
  getHtmlElement,
  getUploadFilesContent
} from '../../libs/utils';
import VideoTransferService from '../../services/VideoTransferService';

const service = new VideoTransferService();

class BtnGroup extends DomModule {
  private el: HTMLElement;

  private oResetBtn: HTMLElement;

  private oSubmitBtn: HTMLElement;

  private oVideonameInput: HTMLInputElement;

  private uploader: Uploader;

  constructor(el: HTMLElement, uploader: Uploader, oVideonameInput: HTMLInputElement) {
    super();

    this.el = el;
    this.uploader = uploader;
    this.oVideonameInput = oVideonameInput;
  }

  protected initDom(): void {
    this.oResetBtn = getHtmlElement('.J_ResetBtn', this.el);
    this.oSubmitBtn = getHtmlElement('.J_SubmitBtn', this.el);
  }

  protected bindEvent(): void {
    this.el.addEventListener('click', this.handleBtnGroupClick.bind(this), false);
  }

  private handleBtnGroupClick(ev: Event) {
    const e = ev || window.event;
    const tar = e.target || e.srcElement;

    switch (tar) {
      case this.oResetBtn:
        this.handleReset();
        break;
      case this.oSubmitBtn:
        this.handleSubmit();
        break;
      default:
        break;
    }
  }

  private handleReset() {
    this.uploader.resetUploader();
  }

  private handleSubmit() {
    this.uploader.submitUploaderFiles(async (files) => {
      const uploadFilesContent = await getUploadFilesContent(files);
      if (!uploadFilesContent.length) {
        window.alert('请选择需要上传的文件');
        return;
      };
      if (!this.oVideonameInput.value) {
        window.alert('请填写上传视频的名称');
        return;
      }

      const uploadName = this.oVideonameInput.value;

      service.uploadVideoFiles(uploadFilesContent, uploadName)
        .then(((res) => {
          const { data, code, msg } = res;

          if (code === 1) {
            window.alert(msg);
            return;
          }
          if (code === 0) {
            window.alert(`上传成功 : ${JSON.stringify(data)}`);
            const confirm = window.confirm(`是否需要清空上传内容？`);
            if (confirm === true) {
              this.uploader.resetUploader(); 
            }
          } else {
            window.alert(`上传失败，原因：${msg}`);
          }
        })
      );
    });
  }
}

export default BtnGroup;
