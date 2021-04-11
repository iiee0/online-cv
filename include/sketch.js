let url = "https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51";
let dc;
let palette;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	dc = drawingContext;
	palette = createPalette(url);
}

function draw() {
	background(0, 0, 95);

	let offset = width / 10;
	let x = -offset;
	let y = -offset;
	let w = width + offset;
	let h = height + offset;
	let xStep, yStep;

	dc.shadowColor = color(0, 0, 0, 16);
	dc.shadowBlur = offset / 3;
	while (y < h) {
		yStep = random(h / 8, h / 2) / 2;
		x = -offset;
		if (y + yStep > h) yStep = h - y;
		while (x < w) {
			xStep = random(w / 8, w / 2) / 2;
			if (x + xStep > w) xStep = w - x;
			drawConnectedNode(x, y, xStep, yStep);
			x += xStep;
		}
		y += yStep;
	}

	frameRate(1 / 2);
	noLoop();
}

function drawConnectedNode(x, y, w, h) {
	let colors = shuffle(palette.concat());
	push();
	translate(x, y);
	stroke(0, 0, 20);
	noStroke();
	fill(colors[0]);
	let sep = 20;
	rect(w / sep, h / sep, w * (sep - 2) / sep, h * (sep - 2) / sep, max(w, h));
	// stroke(colors[0]);
	// // noFill();
	// fill(0, 0, 100, 0);
	// rect(0, 0, w, h);
	drawingContext.clip();
	translate(w / 2, h / 2);
	let points = [];

	let x1 = random(-w / 4, w / 4);
	let y1 = random(-h / 4, h / 4);
	let r1 = w / 10;
	let n = 0;
	points.push(createVector(x1, y1, r1));
	while (n < 5) {
		let m = int(random(3, 7));
		let x2, y2, r2;
		let i = 0;
		while (i < m) {
			let angle = random(360);
			r2 = random(w / 10 / 2, w / 3);
			x2 = x1 + cos(angle) * (r1 + r2);
			y2 = y1 + sin(angle) * (r1 + r2);
			let distance = dist(x1, y1, x2, y2);
			strokeWeight(distance / 10);
			stroke(0, 0, 20);;
			line(x1, y1, x2, y2);
			points.push(createVector(x2, y2, r2));
			i++;
		}
		x1 = x2;
		y1 = y2;
		r1 = r2;
		n++;
	}
	points.reverse();
	for (let p of points) {
		strokeWeight(1);
		noStroke();
		let t = int(random(1, colors.length));
		fill(colors[t]);
		circle(p.x, p.y, p.z);
	}
	pop();
}

function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = color('#' + arr[i]);
	}
	return arr;
}