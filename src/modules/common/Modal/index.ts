import { IModalOptions, TmodalType } from './types';

import BaseModal from './BaseModal';

import InfoModal from './InfoModal';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import WarningModal from './WarningModal';

class Modal {
  public static InfoModal = InfoModal;

  public static SuccessModal = SuccessModal;

  public static ErrorModal = ErrorModal;

  public static WarningModal = WarningModal;

  public static create(modalType: TmodalType, options: Partial<IModalOptions>): BaseModal {
    switch (modalType) {
      case 'success':
        return new SuccessModal(options);
      case 'error':
        return new ErrorModal(options);
      case 'warning':
        return new WarningModal(options);
      case 'info':
      default:
        return new InfoModal(options);
    }
  }
}

export default Modal;
