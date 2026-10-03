import { test } from 'node:test';
import assert from 'node:assert/strict';
import { introValues, uvToHero, qualityStep } from '../src/components/hero/heroMath.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) < e, `${a} ≈ ${b}`);

test('sunrise starts at dawn with the sun below the hills', () => {
  assert.deepEqual(introValues(0, false), { rise: 0, dawn: 1, sun: 1 });
});
test('sunrise ends in day with a softer sun', () => {
  assert.deepEqual(introValues(20, false), { rise: 1, dawn: 0, sun: 0.5 });
});
test('replay from day starts with no dawn grade and fades into it', () => {
  assert.equal(introValues(0, true).dawn, 0);
  assert.ok(introValues(1.1, true).dawn > 0.8);
});
test('uvToHero maps the image centre to the hero centre (cover fit)', () => {
  assert.deepEqual(uvToHero(0.5, 0.5, 1000, 500, 1.79), { x: 500, y: 250 });
});
test('uvToHero crops sides on a tall hero', () => {
  const p = uvToHero(0.505, 0.43, 400, 800, 1.79);
  assert.ok(p.x > 200 && p.y < 400);
});
test('slow frames for 3s at full quality step down to 0.6', () => {
  assert.deepEqual(qualityStep({ quality: 1, slowFor: 2.95 }, 30, 0.1), { quality: 0.6, slowFor: 0, fallback: false });
});
test('still slow at 0.6 falls back to the still photo', () => {
  assert.equal(qualityStep({ quality: 0.6, slowFor: 2.95 }, 45, 0.1).fallback, true);
});
test('fast frames drain the slow timer', () => {
  const s = qualityStep({ quality: 1, slowFor: 1 }, 16, 0.1);
  near(s.slowFor, 0.9);
  assert.equal(s.quality, 1);
  assert.equal(s.fallback, false);
});
test('35ms frames are fine at 0.6 (threshold there is 42ms)', () => {
  const s = qualityStep({ quality: 0.6, slowFor: 0 }, 35, 0.1);
  assert.equal(s.slowFor, 0);
});
