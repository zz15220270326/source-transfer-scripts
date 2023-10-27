import DomModule from '../DomModule';
import Uploader from './Uploader';

import { Modal } from '../common';

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
      if (!this.oVideonameInput.value) {
        Modal.create('warning', {
          width: 300,
          isShowCloseIcon: false,
          title: '提示',
          content: '请填写上传视频的名称',
          okBtnText: '确定',
          isShowCancelBtn: false
        }).show();
        return;
      }

      const uploadName = this.oVideonameInput.value;

      service.uploadVideoFiles(uploadFilesContent, uploadName)
        .then(((res) => {
          const { data, code, msg } = res;

          if (code === 1) {
            Modal.create('error', {
              width: 360,
              title: '上传失败',
              content: msg,
            });
            return;
          }
          if (code === 0) {
            Modal.create('success', {
              width: 320,
              title: '上传成功',
              content: `
                <p>
                  上传内容：
                  ${data?.videoUrl ? `<a href="${data?.videoUrl}" target="_blank">点击视频链接</a>` : ''}
                </p>
                <p>是否需要清空上传内容？</p>
              `,
              okBtnText: '清除',
              cancelBtnText: '不清除',
              onOk: () => {
                this.uploader.resetUploader(); 
              }
            }).show();
          } else {
            Modal.create('error', {
              width: 360,
              title: '上传失败',
              content: msg,
            });
          }
        })
      );
    });
  }
}

export default BtnGroup;
