# bitcoin

## Features

- Avoids rounding errors by using a [big number](https://www.npmjs.com/package/big.js) package
- Converts from/to a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number),
  [Big](https://www.npmjs.com/package/big.js) or
  [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- Units can be added or removed

## Getting started

```
const btcConvert = require('./index');    
const coins = btcConvert(4.6, 'Satoshi', 'BTC');  

console.log(coins);
```
    
## API

### btcConvert (from, fromUnit, toUnit, [representation])

Converts an amount from one unit to another unit.

- `from` (number | string | [Big](https://www.npmjs.com/package/big.js)) - the amount to convert
- `fromUnit` (string) - the unit of the amount
- `toUnit` (string) - the unit to convert to
- `representation` (string) - the type of value to return, defaults to 'Number'.
   - 'Number' - returns a standard javascript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
   -  'Big' - returns a [Big](https://www.npmjs.com/package/big.js) number
   -  'String' - returns a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

#### Examples

    btcConvert(2, 'BTC', 'bit') // returns 2000000
    btcConvert(2, 'BTC', 'bit', 'String') // returns '2000000'

### btcConvert.units()

Returns an Array of unit symbols that can be used for conversion.

#### Example

    console.log(btcConvert.units())
    // produces
    // ['BTC', 'mBTC', 'μBTC', 'bit', 'Satoshi', 'sat']

### btcConvert.addUnit (unit, factor)

Adds a new `unit` for conversion.  Throws when `unit` already exists and the factors are different.

- `unit` (string) - the new unit symbol
- `factor` (number | string | Big) - conversion factor to yield a `BTC`.

#### Example

    convert.addUnit('finney', 0.0000001);
    convert(30, 'finney', 'BTC') // produces 0.000003

    // 10 satoshis can be expressed as 1 finney
    convert(20, 'Satoshi', 'finney') // produces 2

### btcConvert.removeUnit (unit)

Removes the `unit` from conversion.  Throws when `unit` is pre-defined. Removing a non-existing symbol is allowed.

- `unit` (string) - the unit symbol to remove.
