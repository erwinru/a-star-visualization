class Line {
  constructor(color, lineWidth, startX, startY, endX, endY) {
    this.color = color;
    this.lineWidth = lineWidth;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();

    ctx.restore();
  }

}


export class Grid {
  constructor(
    color = "black", lineWidth = 0.5, font = "16px Monospace", step = 20
  ) {
    this.color = color;
    this.lineWidth = lineWidth;
    this.step = step;
    this.font = font;

    this.lines = null;
  }

  createLines(canvas) {
    const lines = [];

    // vertical lines
    for (let x = 0; x < canvas.width; x += this.step) {
      lines.push(new Line(this.color, this.lineWidth, x, 0, x, canvas.height));
    }
    // horizontal lines
    for (var y = 0; y < canvas.height; y += this.step) {
      lines.push(new Line(this.color, this.lineWidth, 0, y, canvas.width, y));
    }

    this.lines = lines;
  }

  drawLines(canvas, ctx) {
    if (!this.lines) {
      this.createLines(canvas);
    }

    this.lines.forEach(line => line.draw(ctx));
  }
}

export default Grid;