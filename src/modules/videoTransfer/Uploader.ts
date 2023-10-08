import { getHtmlElement } from '../../libs/utils';

import DomModule from '../DomModule';
import UploadManager from '../UploadManager';

import FileShowList, {
  showFileShowListHeader,
  showFileShowListContent,
  showNoDataTip
} from '../../components/FileShowList';

class Uploader extends DomModule {
  private el: HTMLElement;

  private oUploader: HTMLInputElement;

  private oFileShowList: HTMLElement;

  private oUploaderBtn: HTMLElement;

  private uploadManager: UploadManager;

  constructor(el: HTMLElement) {
    super();

    this.el = el;
  }

  override init(): void {
    this.initDom();
    this.uploadManager = new UploadManager(this.oUploader, this.handleUploadManagerUpdate.bind(this));
    this.bindEvent();
  }

  protected initDom(): void {
    this.oUploader = getHtmlElement<HTMLInputElement>('.J_UploaderInput', this.el);
    this.oFileShowList = getHtmlElement('.J_Files', this.el);
    this.oUploaderBtn = getHtmlElement('.J_UploaderBtn', this.el.parentNode as HTMLElement);
  }

  protected bindEvent(): void {
    this.oUploaderBtn.addEventListener('click', this.handleUploadBtnClick.bind(this), false);
    this.oUploader.addEventListener('change', this.handleUploaderChange.bind(this), false);
  }

  private handleUploadBtnClick() {
    this.oUploader.click();
  }

  private handleUploaderChange(): void {
    const files = this.oUploader.files;
    this.uploadManager.addAll([...files]);
  }

  private handleUploadManagerUpdate(newFiles: File[], prevFiles: File[]) {
    if (!newFiles.length) {
      // 渲染无数据组件
      this.oFileShowList.innerHTML = showNoDataTip('== 数据已被清空 ==', true);
    } else {
      this.oFileShowList.innerHTML = FileShowList(
        showFileShowListHeader(`选择上传的文件：------`),
        showFileShowListContent(
          newFiles.length,
          `
            <th align="left" width="200px">文件名称</th>
            <th align="left" width="360px">文件路径</th>
            <th align="left">最近修改时间</th>
          `,
          newFiles
        ),
      );
    }
  }

  public resetUploader() {
    this.uploadManager.clear();
  }
  
  public submitUploaderFiles(callback?: (files: File[]) => void) {
    return this.uploadManager.submit(callback);
  }
}

export default Uploader;
