import DomModule from '../DomModule';

import { getHtmlElement } from '../../libs/utils';

import FileShowList, {
  showFileShowListContent,
  showFileShowListHeader
} from '../../components/FileShowList';
import AudioTransferSerivce from '../../services/AudioTransferService';

const service = new AudioTransferSerivce();

class SingleAudioUploader extends DomModule {
  private el: HTMLElement;

  private oUploader: HTMLElement;

  private oUploadBtn: HTMLElement;

  private oUploadInput: HTMLInputElement;

  private oAudioNameInput: HTMLInputElement;

  private oFileShowList: HTMLElement;

  private oBtnGroup: HTMLElement;

  public constructor(el: HTMLElement) {
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
    this.oUploadBtn.addEventListener('click', this.handleUploadBtnClick.bind(this), false)
    this.oUploader.addEventListener('change', this.handleUploadChange.bind(this), false);
    this.oBtnGroup.addEventListener('click', this.handleBtnClick.bind(this), false);
  }

  private handleUploadBtnClick() {
    this.oUploadInput.click();
  }

  private handleUploadChange() {
    const file = this.oUploadInput.files[0];
    if (!file) return;

    // 1. 把待上传的文件信息展示出来
    this.oFileShowList.innerHTML = FileShowList(
      showFileShowListHeader(`选择上传的文件：------`),
      showFileShowListContent(
        1,
        `
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

  private handleBtnClick(ev: Event) {
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

  private handleResetBtnClick() {
    this.handleReset();
  }

  private handleReset() {
    // 1. 清空 uploader 中的内容
    this.oUploadInput.value = null;
    // 2. 把输入的名称也设置为空
    this.oAudioNameInput.value = '';
    // 2. 把待上传的文件信息清空
    this.oFileShowList.innerHTML = '';
  }

  private handleSubmitBtnClick() {
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
