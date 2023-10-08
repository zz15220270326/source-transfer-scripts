import '../assets/css/reset.scss';
import '../assets/css/videoTransfer.scss';

import { getHtmlElement } from '../libs/utils';
import DomModule from '../modules/DomModule';

import { Uploader, BtnGroup } from '../modules/videoTransfer';

;(() => {
  const oContainer = getHtmlElement('.J_VideoTransferPage');

  const oUploader = getHtmlElement('.J_Uploader', oContainer);
  const oBtnGroup = getHtmlElement('J_UploadBtnGroup', oContainer);
  const oVideonameInput = getHtmlElement<HTMLInputElement>('.J_VideonameInput', oContainer);

  const init = () => {
    const uploader = new Uploader(oUploader);
    const btnGroup = new BtnGroup(oBtnGroup, uploader, oVideonameInput);

    DomModule.init([
      uploader,
      btnGroup
    ]);
  }
  
  init();
})();
