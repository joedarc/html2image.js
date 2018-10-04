class HTML2Image {

  constructor(element, options) {
    this.element = element.cloneNode(true);
    let defaultBounds = element.getBoundingClientRect();
    this.height = options.height || defaultBounds.height;
    this.width = options.width || defaultBounds.width;
    this.exportName = options.exportName || 'download.png';
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
    foreignObject.appendChild(this.element);
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    svg.appendChild(foreignObject);
    console.log(svg);
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
}
