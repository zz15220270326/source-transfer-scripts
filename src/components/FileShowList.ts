import { getFormatTime } from '../libs/utils';

export default function (header: string, content: string) {
  return `
    <!-- 显示头部 -->
    ${header}

    <!-- 显示内容 -->
    ${content}
  `;
}

export function showFileShowListHeader(title: string = '上传的文件') {
  return `
    <header class="show-list-header">
      <h2>${title}</h2>
    </header>
  `;
}

export function showFileShowListContent(num: number, head: string, files: File[]) {
  return `
    <section class="show-list-content">
      <p class="file-nums">共${num}条数据</p>

      <table class="show-list-table" border="0" align="left">
        <thead>
          <tr>
            ${head}
          </tr>
        </thead>
        <tbody>
          ${
            files.map(file => {
              const { name, lastModified, size, webkitRelativePath } = file;
        
              return `
                <tr>
                  <td>${name}</td>
                  <td>${(size / 1024 / 1024).toFixed(2)}</td>
                  <td>${getFormatTime(lastModified)}</td>
                </tr>
              `;
            }).join('\n')
          }
        </tbody>
      </table>
    </section>
  `;
}

export function showNoDataTip(tip: string = '数据已被清空', showImg: boolean = true) {
  return `
    <div class="no-data-tip">
      <h2>数据已被清空</h2>
      ${ showImg ? '<img alt="" src="/imgs/lazyload.webp" width="600" />' : '' }
    </div>
  `;
}

// this.oFileShowList.innerHTML = `
//   <header>
//     <h2>上传的文件</h2>
//   </header>
//   <section>
//     <p>共${newFiles.length}条</p>

//     <table border="0" align="left">
//       <thead>
//         <tr>
//           <th align="left" width="200px">文件名称</th>
//           <th align="left" width="360px">文件路径</th>
//           <th align="left">最近修改时间</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${
//           newFiles.map(file => {
//             const { name, lastModified, webkitRelativePath } = file;

//             return `
//               <tr>
//                 <td>${name}</td>
//                 <td>${webkitRelativePath || `-----/---/${name}`}</td>
//                 <td>${lastModified}</td>
//               </tr>
//             `;
//           }).join('\n')
//         }
//       </tbody>
//     </table>

//     ${
//       ''
//       /*
//       <ul class="file-list">
//       ${
//         newFiles.map(file => {
//           const { name, lastModified, webkitRelativePath } = file;
//           return `
//             <li>
//               <p>文件名称 ：${name}</p>
//               <p>文件路径 ：${webkitRelativePath}</p>
//               <p>最近修改时间 ：${lastModified}</p>
//             </li>
//           `;
//         }).join('\n')
//       }
//     </ul>
//       */
//     }
//   </section>
// `;
