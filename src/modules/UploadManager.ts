class UploadManager {
  private files: File[];

  private uploader: HTMLInputElement;

  private update: (newFiles: File[], prevFiles?: File[]) => void = () => {};

  constructor(
    uploader: HTMLInputElement,
    update?: (newFiles: File[], prevFiles?: File[]) => void
  ) {
    this.uploader = uploader;
    this.files = [...uploader.files];
    
    update && (this.update = update);
  }

  public addAll(files: File[], append = false) {
    if (!append) {
      this.files = [];
    }
    const prevFiles = [...this.files];

    files.forEach(file => {
      this.addOne(file);
    });

    this.update(this.files, prevFiles);
  }

  private addOne(newFile: File) {
    const files = this.files;

    if (!files.some((file) => file === newFile)) {
      this.files = [...files, newFile];
    }
  }

  public clear() {
    const prevFiles = [...this.files];
    this.files = [];
    this.update(this.files, prevFiles);
    // this.uploader.outerHTML = this.uploader.outerHTML;
    this.uploader.value = '';
  }

  public submit(callback?: (files: File[]) => void) {
    if (callback) {
      return this.submitCallback(callback);
    }
    return this.promiseSubmit();
  }

  private submitCallback(callback: (files: File[]) => void) {
    callback(this.files);
  }

  private promiseSubmit() {
    return new Promise<File[]>((resolve) => {
      if (this.files) {
        console.warn('暂无上传内容');
      }
      resolve(this.files);
    });
  }
}

export default UploadManager;
