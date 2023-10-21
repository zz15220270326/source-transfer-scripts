import DomModule from '../DomModule';

import { getHtmlElement } from '../../libs/utils';

abstract class AudioUploader extends DomModule {
  protected el: HTMLElement;

  protected oUploader: HTMLElement;

  protected oUploadBtn: HTMLElement;

  protected oUploadInput: HTMLInputElement;

  protected oAudioNameInput: HTMLInputElement;

  protected oFileShowList: HTMLElement;

  protected oBtnGroup: HTMLElement;

  constructor(el: HTMLElement) {
    super();

    this.el = el;
  }

  protected override initDom(): void {
    this.oUploader = getHtmlElement('.J_Uploader', this.el);
    this.oUploadBtn = getHtmlElement('.J_UploaderBtn', this.oUploader);
    this.oUploadInput = getHtmlElement('.J_UploaderInput', this.oUploader);
    this.oAudioNameInput = getHtmlElement('.J_AudionameInput', this.el);
    this.oFileShowList = getHtmlElement('.J_Files', this.el);
    this.oBtnGroup = getHtmlElement('.J_UploadBtnGroup', this.el);

    console.log('initDom', this);
  }

  protected override bindEvent(): void {
    this.oUploadBtn.addEventListener('click', this.handleUploadBtnClick.bind(this), false);
    this.oUploader.addEventListener('change', this.handleUploadChange.bind(this), false);
    this.oBtnGroup.addEventListener('click', this.handleBtnClick.bind(this), false);
  }

  protected handleUploadBtnClick() {
    this.oUploadInput.click();
  }

  protected abstract handleUploadChange(): void;

  protected handleBtnClick(ev: Event) {
    const e = ev || window.event;
    const el = e.target || e.srcElement;

    if (!(el instanceof HTMLElement)) return;

    const elClassList = el.className.split(' ');

    if (elClassList.includes('J_ResetBtn')) {
      this.handleResetBtnClick();
    }
    if (elClassList.includes('J_SubmitBtn')) {
      this.handleSubmitBtnClick();
    }
  }

  protected handleResetBtnClick(): void {
    this.handleReset();
  }

  protected handleReset() {
    // 1. 清空 uploader 中的内容
    this.oUploadInput.value = null;
    // 2. 把输入的名称也设置为空
    this.oAudioNameInput.value = '';
    // 2. 把待上传的文件信息清空
    this.oFileShowList.innerHTML = '';
  }

  protected abstract handleSubmitBtnClick(): void;
}

export default AudioUploader;
