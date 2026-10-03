import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveMotion, shouldStartHidden, countUpValue, MOTION_KEY } from '../src/lib/motion.js';

test('auto follows the system reduced-motion setting', () => {
  assert.equal(resolveMotion('auto', true), false);
  assert.equal(resolveMotion('auto', false), true);
});
test('explicit on/off win over the system', () => {
  assert.equal(resolveMotion('on', true), true);
  assert.equal(resolveMotion('off', false), false);
});
test('unknown setting behaves as auto', () => {
  assert.equal(resolveMotion(null, true), false);
  assert.equal(resolveMotion('garbage', false), true);
});
test('elements already in view never start hidden', () => {
  assert.equal(shouldStartHidden({ top: 100 }, 800, true), false);
});
test('elements below the fold start hidden only when motion is on', () => {
  assert.equal(shouldStartHidden({ top: 900 }, 800, true), true);
  assert.equal(shouldStartHidden({ top: 900 }, 800, false), false);
});
test('countUpValue eases out and rounds', () => {
  assert.equal(countUpValue(40, 0), 0);
  assert.equal(countUpValue(40, 1), 40);
  assert.equal(countUpValue(100, 0.5), 88);
  assert.equal(countUpValue(100, 2), 100);
});
test('storage key', () => assert.equal(MOTION_KEY, 'nikha2-motion'));
