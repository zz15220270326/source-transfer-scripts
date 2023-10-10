import { IUploadVideoObject } from "../types";

/**
   * @function lazyLoadImg
   * @description 懒加载图片元素
   * @description 容器的整体高度 + 当前容器已滚动的高度 > imgItem的偏移高度 ? 懒加载图片 : 不作处理
   * @param {HTMLCollectionOf<HTMLElement>} oImgItems 图片元素集合
   * @param {number} clientHeight 容器的整体高度
   * @param {number} scrollTop 当前容器已滚动的高度
   * @return {void} 没有返回值
   */
export function lazyLoadImg(
  oImgItems: HTMLCollectionOf<HTMLElement>,
  clientHeight: number,
  scrollTop: number
): void {
  for (var i = 0; i < oImgItems.length; i++) {
    var oImgItem = oImgItems[i];
    var oImg = oImgItem.getElementsByTagName('img')[0];
    var offsetTop = oImgItem.offsetTop;

    if (!oImg) continue;
    
    if (clientHeight + scrollTop >= offsetTop) {
      const dataSrc = oImg.getAttribute('data-src');
      if (!!dataSrc) {
        oImg.setAttribute('src', dataSrc);
        oImg.removeAttribute('data-src');
      }
    }
  }
}

/**
 * @function throttle
 * @description 节流函数
 * @param {Function} fn 需要被节流执行的函数
 * @param {number | undefined} delay 需要被节流的时长 (默认是 300 ms)
 * @return {Function} 返回一个被节流的执行函数
 */
export function throttle<T extends Function>(fn: T, delay?: number) {
  var _delay = typeof delay === 'number' && delay > 0 ? delay : 300;
  var timer: NodeJS.Timeout | null = null;
  var startTime = Date.now();

  return function (this: any) {
    var args = arguments;
    var ctx = this;
    var endTime = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (endTime - startTime >= _delay) {
      startTime = endTime;
    } else {
      timer = setTimeout(function () {
        fn.apply(ctx, args);
        startTime = Date.now();
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }, endTime - startTime);
    }
  }
}

/**
 * @function debounce
 * @description 防抖函数
 * @param {Function} fn 需要被防抖的函数
 * @param {number|undefined} delay 防抖的延迟事件
 * @return {Function} 返回一个被防抖的函数
 */
export function debounce<T extends Function>(fn: T, delay?: number) {
  var _delay = typeof delay === 'number' && delay > 0 ? delay : 300;
  var timer: NodeJS.Timeout | null = null;

  return function (this: any) {
    var args = arguments;
    var ctx = this;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function() {
      fn.apply(ctx, args);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }, _delay);
  }
}

/**
 * @function getHtmlElement
 * @description 根据标签符号获取 HTML 元素
 * @param {string | HTMLElement} selector 获取的标签符号
 * @param {HTMLElement | Document} from 选择元素时的父元素（不填默认为 `document`）
 */
export function getHtmlElement<T extends HTMLElement>(
  selector: string | HTMLElement,
  from: HTMLElement | Document = document
): T | null {
  if (selector instanceof HTMLElement) {
    return selector as T;
  }
  if (/^(\.|\#)/.test(selector)) {
    return from.querySelector(selector) as T;
  }
  if (from.getElementsByClassName(selector).length) {
    return from.getElementsByClassName(selector)[0] as T;
  }
  if (from.getElementsByTagName(selector).length) {
    return from.getElementsByTagName(selector)[0] as T;
  }
  if (document.getElementById(selector)) {
    return document.getElementById(selector) as T;
  }
  return null;
}

/**
 * @function getUploadFiles
 * @description 异步获取到所有的 files 的内容
 * @param {} files
 */
export function getUploadFilesContent(files: File[]): Promise<IUploadVideoObject[]> {
  return Promise.all(files.map((file) => {
    const fileReader = new FileReader();

    return new Promise<IUploadVideoObject>((resolve, reject) => {
      try {
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const content = e.target.result as ArrayBuffer;
          resolve({
            content,
            file
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  }));
}

/**
 * @function getLocationHref
 * @description 获取 location 跳转的地址
 * @param {string} path 跳转的路径
 * @param {object} query 跳转时需要传递的 query 参数
 * @return {string} 返回跳转的路径
 */
export function getLocationHref<T extends Record<string, any>>(path: string, query?: T): string {
  let locationHref = '';

  // 添加 path
  locationHref += path;

  // 添加 query
  locationHref += '?';
  if (query) {
    for (let k in query) {
      locationHref += `${k}=${query[k]}&`;
    }
  }
  locationHref = locationHref.replace(/\&$/, '');

  return locationHref;
}

/**
 * @function getQueryObject
 * @description 获取搜索的 query 对象
 * @param {string} search 当前的 search 字符串
 * @return {Record<string, string>} 返回一个 query 对象
 */
export function getQueryObject(search: string): Record<string, string> {
  const query: Record<string, string> = {};
  const searchArr = search.substr(1).split('&');
  searchArr.forEach((item) => {
    const [key, value] = item.split('=');
    query[key] = value;
  });
  return query;
}
