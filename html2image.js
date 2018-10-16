class HTML2Image extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    var wrapper = document.createElement('div');
    this.shadow.appendChild(wrapper);
    window.onload = () => {
      let defaultBounds = this.getBoundingClientRect();
      this.height = this.getAttribute('height') || defaultBounds.height;
      this.width = this.getAttribute('width') || defaultBounds.width;
      this.exportName = this.getAttribute('exportName') || 'download.png';
      wrapper.setAttribute('xmlns', this.getAttribute('xmlns'))
      wrapper.setAttribute('class', this.getAttribute('class'))
      wrapper.innerHTML = this.innerHTML;
    };
  }

  toImage() {
    var svg = document.createElement('svg');
    svg.id = 'svg';
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svg.style.display = 'block';
    svg.style.margin = 'auto';
    var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.appendChild(this.cloneNode(true));
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    svg.appendChild(foreignObject);
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = true;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        var anchor = document.createElement('a');
        anchor.download = this.exportName;
        anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      });
    };
    img.src = 'data:image/svg+xml,' + encodeURIComponent(svg.outerHTML);
  }
};

customElements.define('x-html2image', HTML2Image);
