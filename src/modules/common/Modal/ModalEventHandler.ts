import { EventSelector } from './types';
import BaseModal from './BaseModal';

class ModalEventHandler {
  private readonly modal: BaseModal;

  constructor(modal: BaseModal) {
    this.modal = modal;

    this.bindEvent();
  }

  private bindEvent() {
    const modaElement = this.modal.getModalElement();

    modaElement.addEventListener('click', this.handleModalClick.bind(this), false);
  }

  private handleModalClick(ev: Event) {
    const e = ev || window.event;
    const el: HTMLElement = (e.target || e.srcElement) as HTMLElement;
    const elClassList: string[] = el.className.split(' ');

    if (
      elClassList.includes(EventSelector.CANCEL_BTN)
      || elClassList.includes(EventSelector.CLOSE_ICON)
    ) {
      this.handleCancelBtnClick();
      return;
    }
    if (elClassList.includes(EventSelector.OK_BTN)) {
      this.handleOkBtnClick();
    }
  }

  private handleCancelBtnClick(): void {
    this.modal.hide('cancel');
  }

  private handleOkBtnClick(): void {
    this.modal.hide('ok');
  }
}

export default ModalEventHandler;
