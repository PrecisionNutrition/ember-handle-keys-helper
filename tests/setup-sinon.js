/**
  Sinon integration for QUnit.
  https://sinonjs.org/releases/latest/assertions
*/

import QUnit from 'qunit';
import sinon from 'sinon';
import setupSinon from 'ember-sinon-qunit';

export default function() {
  sinon.assert.pass = assertion => QUnit.assert.ok(true, assertion);
  sinon.assert.fail = assertion => QUnit.assert.ok(false, assertion);

  QUnit.assert.spy = sinon.assert;

  setupSinon();
}
