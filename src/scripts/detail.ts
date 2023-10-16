import '../assets/css/reset.scss';
import '../assets/css/detail.scss';
import 'video.js/dist/video-js.min.css';
// import VideoJS from 'video.js';

import { getHtmlElement } from '../libs/utils';

import DomModule from '../modules/DomModule';

;(() => {
  const init = () => {
    DomModule.init([
    ]);
  }

  init();
})();

