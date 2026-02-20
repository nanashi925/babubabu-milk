// OGP用サムネイル画像を生成するスクリプトでち
// 使い方: node generate-og-image.js
const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// --- 背景グラデーション ---
const bg = ctx.createLinearGradient(0, 0, W, H);
bg.addColorStop(0, '#D6EEFF');
bg.addColorStop(0.5, '#F0F7FF');
bg.addColorStop(1, '#E8F4FD');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// --- 装飾の丸 ---
const circles = [
  { x: 100, y: 80, r: 60, c: '#89CFF0', a: 0.08 },
  { x: 1100, y: 120, r: 90, c: '#FFB3BA', a: 0.08 },
  { x: 200, y: 550, r: 70, c: '#C7CEEA', a: 0.08 },
  { x: 1000, y: 500, r: 80, c: '#B5EAD7', a: 0.08 },
  { x: 600, y: 50, r: 40, c: '#FFB3BA', a: 0.06 },
  { x: 50, y: 350, r: 50, c: '#89CFF0', a: 0.06 },
  { x: 1150, y: 400, r: 45, c: '#C7CEEA', a: 0.06 },
];
for (const c of circles) {
  ctx.globalAlpha = c.a;
  ctx.fillStyle = c.c;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.fill();
}
ctx.globalAlpha = 1;

// --- メインカード（白い角丸四角） ---
ctx.fillStyle = 'rgba(255,255,255,0.95)';
ctx.shadowColor = 'rgba(137,207,240,0.3)';
ctx.shadowBlur = 24;
ctx.shadowOffsetY = 4;
roundRect(ctx, 120, 100, 960, 430, 32);
ctx.fill();
ctx.shadowColor = 'transparent';

// --- 天使ちゃん絵文字（テキストで描画） ---
ctx.font = '90px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('👼🍼', W / 2, 210);

// --- タイトル ---
const titleGrad = ctx.createLinearGradient(300, 0, 900, 0);
titleGrad.addColorStop(0, '#5BA3D9');
titleGrad.addColorStop(0.5, '#4A8DB7');
titleGrad.addColorStop(1, '#E88DA0');
ctx.fillStyle = titleGrad;
ctx.font = 'bold 68px sans-serif';
ctx.fillText('ばぶばぶみるく', W / 2, 330);

// --- サブタイトル ---
ctx.fillStyle = '#7A8EA0';
ctx.font = 'bold 28px sans-serif';
ctx.fillText('Claude Code ぜんぶ解説でち', W / 2, 395);

// --- タグライン背景 ---
ctx.fillStyle = '#D6EEFF';
roundRect(ctx, 310, 425, 580, 46, 23);
ctx.fill();

// --- タグラインテキスト ---
ctx.fillStyle = '#5B7FA3';
ctx.font = 'bold 20px sans-serif';
ctx.fillText('🌟 専門用語ゼロ・省略ゼロ・やさしいガイド 🌟', W / 2, 452);

// --- キラキラ ---
ctx.font = '26px serif';
ctx.globalAlpha = 0.25;
ctx.fillStyle = '#89CFF0';
ctx.fillText('✦', 150, 150);
ctx.fillText('✦', 80, 450);
ctx.fillStyle = '#FFB3BA';
ctx.fillText('✧', 1020, 200);
ctx.fillText('✦', 1100, 300);
ctx.fillStyle = '#C7CEEA';
ctx.fillText('✦', 300, 520);
ctx.fillStyle = '#B5EAD7';
ctx.fillText('✧', 900, 560);
ctx.globalAlpha = 1;

// --- PNG保存 ---
const buf = canvas.toBuffer('image/png');
fs.writeFileSync('og-image.png', buf);
console.log('og-image.png generated! (' + buf.length + ' bytes)');

// 角丸四角を描くヘルパー
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
