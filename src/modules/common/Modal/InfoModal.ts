import { IModalOptions, ModalCls } from './types';
import BaseModal from './BaseModal';
import ModalTemplate from './ModalTemplate';

class InfoModal extends BaseModal {
  constructor(userOptions?: Partial<IModalOptions>) {
    super(userOptions);
  }

  public create(): void {
    const oModalElement = document.createElement('div');
    oModalElement.className = `${ModalCls.MODAL} ${ModalCls.INFO_MODAL}`;
    oModalElement.innerHTML = ModalTemplate.create({
      width: this.width,
      title: this.title,
      content: this.content,
      isShowCloseIcon: this.isShowCloseIcon,
      okBtnText: this.okBtnText,
      isShowOkBtn: this.isShowOkBtn,
      isShowCancelBtn: this.isShowCancelBtn,
      cancelBtnText: this.cancelBtnText,
    });
    this.modalElement = oModalElement;
    this.mountNode.appendChild(this.modalElement);
  }
}

export default InfoModal;
