import { ModalCls, IModalOptions } from './types';

class ModalTemplate {
  public static create(
    options: Pick<
      IModalOptions,
        | 'width'
        | 'title'
        | 'content'
        | 'isShowCloseIcon'
        | 'okBtnText'
        | 'isShowOkBtn'
        | 'isShowCancelBtn'
        | 'cancelBtnText'
    >
  ): string {
    const { createModalHeader, createModalContent, createModalBtnGroup } = ModalTemplate;
    const {
      width,
      title,
      content,
      isShowCloseIcon,
      ...btnGroupOptions
    } = options;

    return `
      <div class="${ModalCls.MODAL_INNER}" ${ width ? `style="width: ${width}px;"` : '' }>
        <!-- 模态框头部 -->
        ${createModalHeader(title, isShowCloseIcon)}
        <!-- 模态框内容 -->
        ${createModalContent(content)}
        <!-- 模态框下面的操作按钮 -->
        ${createModalBtnGroup(btnGroupOptions)}
      </div>
    `;
  }

  public static createModalHeader(title: string, isShowCloseIcon: boolean): string {
    return `
      <header class="${ModalCls.MODAL_HEADER}">
        <h1 class="${ModalCls.MODAL_TITLE}">${title}</h1>
        ${
          isShowCloseIcon ? `<i class="${ModalCls.MODAL_CLOSE_ICON}">❌</i>` : ''
        }
      </header>
    `;
  }

  public static createModalContent(content: string): string {
    return `
      <section class="${ModalCls.MODAL_CONTENT}">
        ${content}
      </section>
    `;
  }

  public static createModalBtnGroup(
    options: Pick<
      IModalOptions,
      'okBtnText'
        | 'isShowOkBtn'
        | 'isShowCancelBtn'
        | 'cancelBtnText'
    >
  ): string {
    const { isShowOkBtn, okBtnText, isShowCancelBtn, cancelBtnText } = options;

    return `
      <footer class="${ModalCls.MODAL_FOOTER}">
        ${
          isShowCancelBtn
          ? `<button class="${ModalCls.MODAL_CANCEL_BTN}">${cancelBtnText}</button>`
          : ''
        }
        ${
          isShowOkBtn
            ? `<button class="${ModalCls.MODAL_OK_BTN}">${okBtnText}</button>`
            : ''
        }
      </footer>
    `;
  }
}

export default ModalTemplate;
