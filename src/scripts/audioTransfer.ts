import '../assets/css/reset.scss';
import '../assets/css/audioTransfer.scss';

import DomModule from '../modules/DomModule';
import { SingleAudioUploader, MultiAudioUploader } from '../modules/audioTransfer';

import { getHtmlElement } from '../libs/utils';

;(() => {
  const oContainer = getHtmlElement('.J_AudioTransferPage');

  const oSingleAudioUploader = getHtmlElement('.J_SingleAudioUploadTransfer', oContainer);
  const oMultiAudioUploader = getHtmlElement('.J_MultiAudioUploadTransfer', oContainer);

  const singleAudioUploader = new SingleAudioUploader(oSingleAudioUploader);
  const multiAudioUploader = new MultiAudioUploader(oMultiAudioUploader);

  const init = () => {
    DomModule.init([
      singleAudioUploader,
      multiAudioUploader
    ]);
  }

  init();
})();
