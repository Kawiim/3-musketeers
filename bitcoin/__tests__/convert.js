'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
  expect(typeof convert(2, 'BTC', 'BTC')).toBe("number");
});

test('should return a Number', () => {
  expect(typeof convert(2, 'BTC', 'BTC')).toBe("number");
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big').constructor.name).toBe("Big");
});

test('should return a String', () => {
  expect(typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe("string");
});

test('should convert an integer', () => {
  expect(convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toEqual(1234567.89012345);
});

test('should convert a number', () => {
  expect(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toEqual(123456789012345);
});

test('should convert a string', () => {
  expect(convert('2', 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should convert a Big number', () => {
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should convert a NaN to a Number', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'Number')).toBe("number");
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe("number");
});

test('should convert a NaN to a String', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'String')).toBe("string");
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe("string");
});

test('should not convert a NaN to a Big', () => {
  expect(() => { convert(NaN, 'BTC', 'BTC', 'Big') }).toThrow();
});

test('should handle rounding errors', () => {
  expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).toEqual(4.6e-8);
  expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toEqual(4.6);
});

test('should throw when untest is undefined', () => {
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow();
});

test('should allow untest aliases', () => {
  expect(convert(4.6, 'Satoshi', 'sat')).toEqual(4.6);
  expect(() => {convert(4.6, 'μBTC', 'btest')}).toThrow();
});

test('should allow adding new units', () => {
  expect(() => {convert.addUnit('BTC', 0.0001)}).toThrow();
  convert.addUnit('KAR', 10);
  expect(convert.units()).toContain('KAR');
});

test('should allow removing units', () => {
  expect(() => {convert.removeUnit('BTC')}).toThrow();
});
