import DomModule from '../DomModule';

class AudioSwitchTab extends DomModule {
  protected el: HTMLElement;

  private oNavItems: HTMLElement[] = [];

  private oPageItems: HTMLElement[] = [];

  constructor(el: HTMLElement) {
    super();

    this.el = el;
  }

  protected initDom(): void {
    this.oNavItems = Array.from(this.el.querySelectorAll('.switch-tab-nav-item'));
    this.oPageItems = Array.from(this.el.querySelectorAll('.tab-page-item'));
    console.log('initDom', this);
  }

  protected bindEvent(): void {
    this.el.addEventListener('click', this.handleTabClick.bind(this), false);
  }

  private handleTabClick(ev: Event): void {
    const e = ev || window.event;
    const el = (e.target || e.srcElement) as HTMLElement;
    const elTagName = el.tagName.toLowerCase();

    if (elTagName === 'input') {
      this.handleRadioCheck(el as HTMLInputElement);
    }
    if (elTagName === 'label') {
      const oRadio: HTMLInputElement = el.parentNode.querySelector('input');
      this.handleRadioCheck(oRadio);
    }
  }

  private handleRadioCheck(el: HTMLInputElement) {
    if (el.getAttribute('type') !== 'radio') return;

    const { value } = el.dataset;

    this.oPageItems.forEach(el => {
      el.classList.remove('active');

      if (el.dataset.value === value) {
        el.classList.add('active');
      }
    });
  }
}

export default AudioSwitchTab;
