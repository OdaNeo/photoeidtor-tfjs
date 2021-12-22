class formatUtil {
  public static arrayToHTML(arr: Array<unknown>): string {
    let html = ''
    arr.forEach((item: unknown) => {
      if (Array.isArray(item)) {
        // array
        html += `
          <div style="margin-left:24px;">
            <div>[</div>
            <div>${this.arrayToHTML(item)}</div>
            <div>],</div>
          </div>
          `
      } else if (Object.prototype.toString.call(item) === '[object Object]') {
        // object
        html += `
          <div style="margin-left:24px;">
            <span>{</span>
            <div>${this.objToHTML(item)}</div>
            <span>},</span>
          </div>
          `
      } else if (typeof item === 'string') {
        // string
        item = item.replaceAll('\n', '<br />')
        html += `
          <span style="margin-left:24px;">
            <span>"${item}",</span>
          </span>
          `
      } else {
        // number or other
        html += `
          <span style="margin-left:24px;">
            <span>${item},</span>
          </span>
          `
      }
    })
    return html
  }

  public static objToHTML(obj: any): string {
    let html = ''
    for (const p in obj) {
      if (Array.isArray(obj[p])) {
        // array
        html += `
          <div style="margin-left:24px;">
            <span>"${p}":</span>
            <span>[</span>
            <div>${this.arrayToHTML(obj[p])}</div>
            <span>],</span>
          </div>
          `
      } else if (Object.prototype.toString.call(obj[p]) === '[object Object]') {
        // object
        html += `
          <div style="margin-left:24px;">
            <span>"${p}":</span>
            <span>{</span>
            <div>${this.objToHTML(obj[p])}</div>
            <span>},</span>
          </div>
          `
      } else if (typeof obj[p] === 'string') {
        // string
        obj[p] = obj[p].replaceAll('\n', '<br />')
        html += `
          <div style="margin-left:24px;">
            <span>"${p}":</span>
            <span>"${obj[p]}",</span>
          </div>
          `
      } else {
        // number or other
        html += `
          <div style="margin-left:24px;">
            <span>"${p}":</span>
            <span>${obj[p]},</span>
          </div>
          `
      }
    }
    return html
  }
}
export default formatUtil
