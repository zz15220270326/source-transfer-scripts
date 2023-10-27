import DomModule from '../DomModule';

import { Modal } from '../common';

import { lazyLoadImg, throttle } from '../../libs/utils';
import IndexService from '../../services/IndexService';

const indexService = new IndexService();

class VideoListTable extends DomModule {
  private el: HTMLElement;

  private oTableHead: HTMLElement;

  private oTableBody: HTMLElement;

  private oImgItems: HTMLCollectionOf<HTMLElement>;

  constructor(el: HTMLElement) {
    super();
    this.el = el;
  }

  override init(): void {
    this.initDom();
    setTimeout(() => {
      window.scrollTo(0, 0);
      lazyLoadImg(
        this.oImgItems,
        document.documentElement.clientHeight,
        document.documentElement.scrollTop,
      );
      Promise.resolve().then(() => {
        this.bindEvent();
      });
    }, 150);
  }

  protected initDom() {
    this.oTableHead = this.el.querySelector('.list-table-head');
    this.oTableBody = this.el.querySelector('.list-table-body');
    this.oImgItems = this.oTableBody.getElementsByClassName('list-table-data') as HTMLCollectionOf<HTMLElement>;
  }

  protected bindEvent(): void {
    // 容器滚动 - 图片懒加载
    window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 150), false);
    // 点击表格
    this.el.addEventListener('click', this.handleElClick.bind(this), false);
  }

  handleScroll(e: Event) {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    lazyLoadImg(
      this.oImgItems,
      clientHeight,
      scrollTop
    );
  }

  private handleElClick(ev: Event): void {
    const e = ev || window.event;
    const tar = e.target || e.srcElement;
    // e.preventDefault();

    if (!(tar instanceof HTMLElement)) return;

    const tagName: string = tar.tagName.toLowerCase();
    const classList: string[] = tar.className.split(' ').filter(item => item);

    if (tagName === 'button') {
      classList.includes('J_BtnOperateRemove') && this.handleRemoveBtnClick(tar);
    }

    
  }

  private async handleRemoveBtnClick(el: HTMLElement) {
    const oTr = (el.parentNode?.parentNode) as HTMLElement;

    const id = oTr.getAttribute('data-id');
    const sourceName = oTr.getAttribute('data-name');
    const sourceType = oTr.getAttribute('data-type');

    Modal.create('info', {
      width: 500,
      title: '删除确认',
      content: `确定要删除电影 【${sourceName}】 吗？`,
      onOk: async () => {
        try {
          switch (sourceType) {
            case 'video':
              await indexService.removeVideo(id);
              break;
            case 'audio':
              await indexService.removeAudio(id);
              break;
            default:
              break;
          }
          location.reload();
        } catch (e) {
          const errMsg = e instanceof Error ? e.message : `${e}`;
          Modal.create('error', {
            width: 500,
            title: '删除失败了',
            content: errMsg,
            okBtnText: '知道了',
            isShowCancelBtn: false
          });
        }
      },
      okBtnText: '确定',
      cancelBtnText: '取消'
    }).show();
  }
}

export default VideoListTable;
