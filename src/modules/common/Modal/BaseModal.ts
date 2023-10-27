import { TmodalType, IModalOptions } from './types';
import ModalEventHandler from './ModalEventHandler';

/** 基础模态框的抽象类 */
abstract class BaseModal {
  /** 模态框的宽度 */
  protected width: number | undefined;

  /** 模态框标题 */
  protected title: string;

  /** 模态框内容 */
  protected content: string;

  /** 是否显示关闭小叉叉 ❌ */
  protected isShowCloseIcon: boolean;

  /** 是否显示取消按钮 */
  protected isShowCancelBtn: boolean;

  /** 取消按钮的文字 */
  protected cancelBtnText: string;

  /** 是否显示确认按钮 */
  protected isShowOkBtn: boolean;

  /** 确认按钮的文字 */
  protected okBtnText: string;

  /** 模态框的类型 */
  protected modalType: TmodalType = 'info';

  /** 模态框元素实例 */
  protected modalElement: HTMLElement | null;

  /** 需要挂载到的节点 */
  protected mountNode: HTMLElement = document.body;

  /** 点击确认按钮之后触发的回调函数 */
  protected onOk: () => void;

  /** 点击取消按钮之后出发的回调函数 */
  protected onCancel: () => void;

  /** 默认的参数配置 */
  private static defaultOptions: IModalOptions = {
    width: undefined,
    title: 'Modal Title',
    content: 'Modal Content',
    isShowCloseIcon: true,
    isShowCancelBtn: true,
    cancelBtnText: 'Cancel',
    isShowOkBtn: true,
    okBtnText: 'OK',
    modalType: 'info',
    modalElement: null,
    mountNode: document.body,
    onOk() {
      // ...
    },
    onCancel() {
      // ...
    }
  };

  protected constructor(userOptions: Partial<IModalOptions> = {}) {
    const { defaultOptions } = BaseModal;
    const options: IModalOptions = {
      ...defaultOptions,
      ...userOptions
    };
    this.width = options.width;
    this.title = options.title;
    this.content = options.content;
    this.isShowCloseIcon = options.isShowCloseIcon;
    this.isShowCancelBtn = options.isShowCancelBtn;
    this.cancelBtnText = options.cancelBtnText;
    this.isShowOkBtn = options.isShowOkBtn;
    this.okBtnText = options.okBtnText;
    this.modalType = options.modalType;
    this.mountNode = options.mountNode;
    this.onOk = options.onOk;
    this.onCancel = options.onCancel;

    // 下面的 modalElement 需要自己写 (下面的 create() 方法创建)
    this.create();
    // 注册侦听器
    new ModalEventHandler(this);
  }

  /** 创建模态框的方法 (创建视图模板 & 设置 modalElement) */
  public abstract create(): void;

  /** 销毁模态框的方法 */
  protected destroy(): void {
    if (!this.modalElement) return;
    if (!!this.modalElement.remove) {
      this.modalElement.remove();
    } else {
      this.modalElement.parentNode.removeChild(this.modalElement);
    }
  }

  public getModalElement(): HTMLElement {
    return this.modalElement;
  }

  public show(): void {
    if (!this.modalElement) return;
    this.modalElement.classList.add('show');
  }

  public hide(type?: 'ok' | 'cancel'): void {
    if (!this.modalElement) return;
    this.modalElement.classList.remove('show');

    switch (type) {
      case 'ok':
        this.onOk();
        break;
      case 'cancel':
        this.onCancel();
        break;
      default:
        break;
    }

    // 在调用方法之后，定时删除原来的 dom 元素
    setTimeout(() => {
      this.destroy();
    }, 2000);
  }
}

export default BaseModal;
