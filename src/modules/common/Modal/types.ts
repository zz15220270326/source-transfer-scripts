/** 模态框的类型 */
export type TmodalType = 'success' | 'warning' | 'info' | 'error';

/** Modal 的配置参数 */
export interface IModalOptions {
  width: number | undefined;
  title: string;
  content: string;
  isShowCloseIcon: boolean;
  isShowCancelBtn: boolean;
  cancelBtnText: string;
  isShowOkBtn: boolean;
  okBtnText: string;
  modalType: TmodalType;
  modalElement: HTMLElement | null;
  mountNode: HTMLElement;
  onOk: () => void;
  onCancel: () => void;
}

/** Modal 的类名枚举 */
export enum ModalCls {
  MODAL = 'modal',
  INFO_MODAL = 'info-modal',
  SUCCESS_MODAL = 'success-modal',
  ERROR_MODAL = 'error-modal',
  WARNING_MODAL = 'warning-modal',

  MODAL_INNER = 'modal-inner',

  MODAL_HEADER = 'modal-header',
  MODAL_TITLE = 'modal-title',
  MODAL_CLOSE_ICON = 'modal-close-icon J_CloseIcon',

  MODAL_CONTENT = 'modal-content',
  MODAL_BODY = 'modal-body',
  MODAL_FOOTER = 'modal-footer',
  MODAL_CANCEL_BTN = 'btn modal-cancel-btn J_CancelBtn',
  MODAL_OK_BTN = 'btn modal-ok-btn J_OkBtn',
}

/** 事件选择器 */
export enum EventSelector {
  CLOSE_ICON = 'J_CloseIcon',
  CANCEL_BTN = 'J_CancelBtn',
  OK_BTN = 'J_OkBtn',
}
