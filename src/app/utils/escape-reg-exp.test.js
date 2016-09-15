import angular from 'angular';
import 'angular-mocks';
import '.';

describe('escape reg exp', function() {
  beforeEach(angular.mock.module('radar.utils'));

  var escapeRegExp;

  beforeEach(angular.mock.inject(function(_escapeRegExp_) {
    escapeRegExp = _escapeRegExp_;
  }));

  it('escapes .', function() {
    expect(escapeRegExp('.')).toBe('\\.');
  });

  it('escapes *', function() {
    expect(escapeRegExp('.*')).toBe('\\.\\*');
  });

  it('escapes ?', function() {
    expect(escapeRegExp('.?')).toBe('\\.\\?');
  });

  it('escapes [...]', function() {
    expect(escapeRegExp('[abc]')).toBe('\\[abc\\]');
  });

  it('escapes (...)', function() {
    expect(escapeRegExp('(abc)')).toBe('\\(abc\\)');
  });

  it('escapes {x}', function() {
    expect(escapeRegExp('a{42}')).toBe('a\\{42\\}');
  });

  it('escapes {x,y}', function() {
    expect(escapeRegExp('a{1,42}')).toBe('a\\{1,42\\}');
  });

  it('escapes ^', function() {
    expect(escapeRegExp('^')).toBe('\\^');
  });

  it('escapes $', function() {
    expect(escapeRegExp('$')).toBe('\\$');
  });
});
