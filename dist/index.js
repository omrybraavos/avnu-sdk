"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AVNU_ADDRESS: () => AVNU_ADDRESS,
  BASE_URL: () => BASE_URL,
  STAGING_BASE_URL: () => STAGING_BASE_URL,
  SourceType: () => SourceType,
  aBuildSwapTransaction: () => aBuildSwapTransaction,
  aPage: () => aPage,
  aPair: () => aPair,
  aPrice: () => aPrice,
  aPriceRequest: () => aPriceRequest,
  aQuote: () => aQuote,
  aQuoteRequest: () => aQuoteRequest,
  aQuoteWithManyComplexRoutes: () => aQuoteWithManyComplexRoutes,
  aQuoteWithManySubRoutes: () => aQuoteWithManySubRoutes,
  aSource: () => aSource,
  anInvokeSwapResponse: () => anInvokeSwapResponse,
  btcToken: () => btcToken,
  buildApproveTx: () => buildApproveTx,
  buildGetNonce: () => buildGetNonce,
  calculateMinAmount: () => calculateMinAmount,
  checkContractAddress: () => checkContractAddress,
  ethToken: () => ethToken,
  executeSwap: () => executeSwap,
  fetchBuildExecuteTransaction: () => fetchBuildExecuteTransaction,
  fetchExecuteSwapTransaction: () => fetchExecuteSwapTransaction,
  fetchPrices: () => fetchPrices,
  fetchQuotes: () => fetchQuotes,
  fetchSources: () => fetchSources,
  fetchTokens: () => fetchTokens,
  hashQuote: () => hashQuote,
  signQuote: () => signQuote
});
module.exports = __toCommonJS(src_exports);

// src/constants.ts
var import_starknet = require("starknet");
var STAGING_BASE_URL = "https://goerli.api.avnu.fi";
var BASE_URL = "https://starknet.api.avnu.fi";
var AVNU_ADDRESS = {
  [import_starknet.constants.StarknetChainId.SN_MAIN]: "0x4270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f",
  [`${import_starknet.constants.StarknetChainId.SN_MAIN}-dev`]: "0x33c21d4cd5db846109448b3e827d175e50b6d449387f76ca7f91a881edca44b",
  [import_starknet.constants.StarknetChainId.SN_GOERLI]: "0x7e36202ace0ab52bf438bd8a8b64b3731c48d09f0d8879f5b006384c2f35032",
  [`${import_starknet.constants.StarknetChainId.SN_GOERLI}-dev`]: "0x6d8cd321dcbbf54512eab67c8a6849faf920077a3996f40bb4761adc4f021d2"
};

// node_modules/ethers/lib.esm/_version.js
var version = "6.8.1";

// node_modules/ethers/lib.esm/utils/properties.js
function checkType(value, type, name) {
  const types = type.split("|").map((t) => t.trim());
  for (let i = 0; i < types.length; i++) {
    switch (type) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof value === type) {
          return;
        }
    }
  }
  const error = new Error(`invalid value for type ${type}`);
  error.code = "INVALID_ARGUMENT";
  error.argument = `value.${name}`;
  error.value = value;
  throw error;
}
function defineProperties(target, values, types) {
  for (let key in values) {
    let value = values[key];
    const type = types ? types[key] : null;
    if (type) {
      checkType(value, type, key);
    }
    Object.defineProperty(target, key, { enumerable: true, value, writable: false });
  }
}

// node_modules/ethers/lib.esm/utils/errors.js
function stringify(value) {
  if (value == null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "[ " + value.map(stringify).join(", ") + " ]";
  }
  if (value instanceof Uint8Array) {
    const HEX = "0123456789abcdef";
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      result += HEX[value[i] >> 4];
      result += HEX[value[i] & 15];
    }
    return result;
  }
  if (typeof value === "object" && typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  switch (typeof value) {
    case "boolean":
    case "symbol":
      return value.toString();
    case "bigint":
      return BigInt(value).toString();
    case "number":
      return value.toString();
    case "string":
      return JSON.stringify(value);
    case "object": {
      const keys = Object.keys(value);
      keys.sort();
      return "{ " + keys.map((k) => `${stringify(k)}: ${stringify(value[k])}`).join(", ") + " }";
    }
  }
  return `[ COULD NOT SERIALIZE ]`;
}
function makeError(message, code, info) {
  let shortMessage = message;
  {
    const details = [];
    if (info) {
      if ("message" in info || "code" in info || "name" in info) {
        throw new Error(`value will overwrite populated values: ${stringify(info)}`);
      }
      for (const key in info) {
        if (key === "shortMessage") {
          continue;
        }
        const value = info[key];
        details.push(key + "=" + stringify(value));
      }
    }
    details.push(`code=${code}`);
    details.push(`version=${version}`);
    if (details.length) {
      message += " (" + details.join(", ") + ")";
    }
  }
  let error;
  switch (code) {
    case "INVALID_ARGUMENT":
      error = new TypeError(message);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      error = new RangeError(message);
      break;
    default:
      error = new Error(message);
  }
  defineProperties(error, { code });
  if (info) {
    Object.assign(error, info);
  }
  if (error.shortMessage == null) {
    defineProperties(error, { shortMessage });
  }
  return error;
}
function assert(check, message, code, info) {
  if (!check) {
    throw makeError(message, code, info);
  }
}
function assertArgument(check, message, name, value) {
  assert(check, message, "INVALID_ARGUMENT", { argument: name, value });
}
var _normalizeForms = ["NFD", "NFC", "NFKD", "NFKC"].reduce((accum, form) => {
  try {
    if ("test".normalize(form) !== "test") {
      throw new Error("bad");
    }
    ;
    if (form === "NFD") {
      const check = String.fromCharCode(233).normalize("NFD");
      const expected = String.fromCharCode(101, 769);
      if (check !== expected) {
        throw new Error("broken");
      }
    }
    accum.push(form);
  } catch (error) {
  }
  return accum;
}, []);
function assertPrivate(givenGuard, guard, className) {
  if (className == null) {
    className = "";
  }
  if (givenGuard !== guard) {
    let method = className, operation = "new";
    if (className) {
      method += ".";
      operation += " " + className;
    }
    assert(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", {
      operation
    });
  }
}

// node_modules/ethers/lib.esm/utils/data.js
function _getBytes(value, name, copy) {
  if (value instanceof Uint8Array) {
    if (copy) {
      return new Uint8Array(value);
    }
    return value;
  }
  if (typeof value === "string" && value.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const result = new Uint8Array((value.length - 2) / 2);
    let offset = 2;
    for (let i = 0; i < result.length; i++) {
      result[i] = parseInt(value.substring(offset, offset + 2), 16);
      offset += 2;
    }
    return result;
  }
  assertArgument(false, "invalid BytesLike value", name || "value", value);
}
function getBytes(value, name) {
  return _getBytes(value, name, false);
}

// node_modules/ethers/lib.esm/utils/maths.js
var BN_0 = BigInt(0);
var BN_1 = BigInt(1);
var maxValue = 9007199254740991;
function fromTwos(_value, _width) {
  const value = getUint(_value, "value");
  const width = BigInt(getNumber(_width, "width"));
  assert(value >> width === BN_0, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: _value
  });
  if (value >> width - BN_1) {
    const mask2 = (BN_1 << width) - BN_1;
    return -((~value & mask2) + BN_1);
  }
  return value;
}
function mask(_value, _bits) {
  const value = getUint(_value, "value");
  const bits = BigInt(getNumber(_bits, "bits"));
  return value & (BN_1 << bits) - BN_1;
}
function getBigInt(value, name) {
  switch (typeof value) {
    case "bigint":
      return value;
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return BigInt(value);
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        if (value[0] === "-" && value[1] !== "-") {
          return -BigInt(value.substring(1));
        }
        return BigInt(value);
      } catch (e) {
        assertArgument(false, `invalid BigNumberish string: ${e.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid BigNumberish value", name || "value", value);
}
function getUint(value, name) {
  const result = getBigInt(value, name);
  assert(result >= BN_0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value
  });
  return result;
}
var Nibbles = "0123456789abcdef";
function toBigInt(value) {
  if (value instanceof Uint8Array) {
    let result = "0x0";
    for (const v of value) {
      result += Nibbles[v >> 4];
      result += Nibbles[v & 15];
    }
    return BigInt(result);
  }
  return getBigInt(value);
}
function getNumber(value, name) {
  switch (typeof value) {
    case "bigint":
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return Number(value);
    case "number":
      assertArgument(Number.isInteger(value), "underflow", name || "value", value);
      assertArgument(value >= -maxValue && value <= maxValue, "overflow", name || "value", value);
      return value;
    case "string":
      try {
        if (value === "") {
          throw new Error("empty string");
        }
        return getNumber(BigInt(value), name);
      } catch (e) {
        assertArgument(false, `invalid numeric string: ${e.message}`, name || "value", value);
      }
  }
  assertArgument(false, "invalid numeric value", name || "value", value);
}
function toBeHex(_value, _width) {
  const value = getUint(_value, "value");
  let result = value.toString(16);
  if (_width == null) {
    if (result.length % 2) {
      result = "0" + result;
    }
  } else {
    const width = getNumber(_width, "width");
    assert(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: _value
    });
    while (result.length < width * 2) {
      result = "0" + result;
    }
  }
  return "0x" + result;
}

// node_modules/ethers/lib.esm/utils/fixednumber.js
var BN_N1 = BigInt(-1);
var BN_02 = BigInt(0);
var BN_12 = BigInt(1);
var BN_5 = BigInt(5);
var _guard = {};
var Zeros = "0000";
while (Zeros.length < 80) {
  Zeros += Zeros;
}
function getTens(decimals) {
  let result = Zeros;
  while (result.length < decimals) {
    result += result;
  }
  return BigInt("1" + result.substring(0, decimals));
}
function checkValue(val, format, safeOp) {
  const width = BigInt(format.width);
  if (format.signed) {
    const limit = BN_12 << width - BN_12;
    assert(safeOp == null || val >= -limit && val < limit, "overflow", "NUMERIC_FAULT", {
      operation: safeOp,
      fault: "overflow",
      value: val
    });
    if (val > BN_02) {
      val = fromTwos(mask(val, width), width);
    } else {
      val = -fromTwos(mask(-val, width), width);
    }
  } else {
    const limit = BN_12 << width;
    assert(safeOp == null || val >= 0 && val < limit, "overflow", "NUMERIC_FAULT", {
      operation: safeOp,
      fault: "overflow",
      value: val
    });
    val = (val % limit + limit) % limit & limit - BN_12;
  }
  return val;
}
function getFormat(value) {
  if (typeof value === "number") {
    value = `fixed128x${value}`;
  }
  let signed = true;
  let width = 128;
  let decimals = 18;
  if (typeof value === "string") {
    if (value === "fixed") {
    } else if (value === "ufixed") {
      signed = false;
    } else {
      const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
      assertArgument(match, "invalid fixed format", "format", value);
      signed = match[1] !== "u";
      width = parseInt(match[2]);
      decimals = parseInt(match[3]);
    }
  } else if (value) {
    const v = value;
    const check = (key, type, defaultValue) => {
      if (v[key] == null) {
        return defaultValue;
      }
      assertArgument(typeof v[key] === type, "invalid fixed format (" + key + " not " + type + ")", "format." + key, v[key]);
      return v[key];
    };
    signed = check("signed", "boolean", signed);
    width = check("width", "number", width);
    decimals = check("decimals", "number", decimals);
  }
  assertArgument(width % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", width);
  assertArgument(decimals <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", decimals);
  const name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
  return { signed, width, decimals, name };
}
function toString(val, decimals) {
  let negative = "";
  if (val < BN_02) {
    negative = "-";
    val *= BN_N1;
  }
  let str = val.toString();
  if (decimals === 0) {
    return negative + str;
  }
  while (str.length <= decimals) {
    str = Zeros + str;
  }
  const index = str.length - decimals;
  str = str.substring(0, index) + "." + str.substring(index);
  while (str[0] === "0" && str[1] !== ".") {
    str = str.substring(1);
  }
  while (str[str.length - 1] === "0" && str[str.length - 2] !== ".") {
    str = str.substring(0, str.length - 1);
  }
  return negative + str;
}
var FixedNumber = class _FixedNumber {
  /**
   *  The specific fixed-point arithmetic field for this value.
   */
  format;
  #format;
  // The actual value (accounting for decimals)
  #val;
  // A base-10 value to multiple values by to maintain the magnitude
  #tens;
  /**
   *  This is a property so console.log shows a human-meaningful value.
   *
   *  @private
   */
  _value;
  // Use this when changing this file to get some typing info,
  // but then switch to any to mask the internal type
  //constructor(guard: any, value: bigint, format: _FixedFormat) {
  /**
   *  @private
   */
  constructor(guard, value, format) {
    assertPrivate(guard, _guard, "FixedNumber");
    this.#val = value;
    this.#format = format;
    const _value = toString(value, format.decimals);
    defineProperties(this, { format: format.name, _value });
    this.#tens = getTens(format.decimals);
  }
  /**
   *  If true, negative values are permitted, otherwise only
   *  positive values and zero are allowed.
   */
  get signed() {
    return this.#format.signed;
  }
  /**
   *  The number of bits available to store the value.
   */
  get width() {
    return this.#format.width;
  }
  /**
   *  The number of decimal places in the fixed-point arithment field.
   */
  get decimals() {
    return this.#format.decimals;
  }
  /**
   *  The value as an integer, based on the smallest unit the
   *  [[decimals]] allow.
   */
  get value() {
    return this.#val;
  }
  #checkFormat(other) {
    assertArgument(this.format === other.format, "incompatible format; use fixedNumber.toFormat", "other", other);
  }
  #checkValue(val, safeOp) {
    val = checkValue(val, this.#format, safeOp);
    return new _FixedNumber(_guard, val, this.#format);
  }
  #add(o, safeOp) {
    this.#checkFormat(o);
    return this.#checkValue(this.#val + o.#val, safeOp);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  addUnsafe(other) {
    return this.#add(other);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  add(other) {
    return this.#add(other, "add");
  }
  #sub(o, safeOp) {
    this.#checkFormat(o);
    return this.#checkValue(this.#val - o.#val, safeOp);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  subUnsafe(other) {
    return this.#sub(other);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  sub(other) {
    return this.#sub(other, "sub");
  }
  #mul(o, safeOp) {
    this.#checkFormat(o);
    return this.#checkValue(this.#val * o.#val / this.#tens, safeOp);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mulUnsafe(other) {
    return this.#mul(other);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  mul(other) {
    return this.#mul(other, "mul");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs or if underflow (precision loss) occurs.
   */
  mulSignal(other) {
    this.#checkFormat(other);
    const value = this.#val * other.#val;
    assert(value % this.#tens === BN_02, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    });
    return this.#checkValue(value / this.#tens, "mulSignal");
  }
  #div(o, safeOp) {
    assert(o.#val !== BN_02, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    });
    this.#checkFormat(o);
    return this.#checkValue(this.#val * this.#tens / o.#val, safeOp);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  divUnsafe(other) {
    return this.#div(other);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(other) {
    return this.#div(other, "div");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
   *  (precision loss) occurs.
   */
  divSignal(other) {
    assert(other.#val !== BN_02, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    });
    this.#checkFormat(other);
    const value = this.#val * this.#tens;
    assert(value % other.#val === BN_02, "precision lost during signalling div", "NUMERIC_FAULT", {
      operation: "divSignal",
      fault: "underflow",
      value: this
    });
    return this.#checkValue(value / other.#val, "divSignal");
  }
  /**
   *  Returns a comparison result between %%this%% and %%other%%.
   *
   *  This is suitable for use in sorting, where ``-1`` implies %%this%%
   *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
   *  both are equal.
   */
  cmp(other) {
    let a = this.value, b = other.value;
    const delta = this.decimals - other.decimals;
    if (delta > 0) {
      b *= getTens(delta);
    } else if (delta < 0) {
      a *= getTens(-delta);
    }
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }
  /**
   *  Returns true if %%other%% is equal to %%this%%.
   */
  eq(other) {
    return this.cmp(other) === 0;
  }
  /**
   *  Returns true if %%other%% is less than to %%this%%.
   */
  lt(other) {
    return this.cmp(other) < 0;
  }
  /**
   *  Returns true if %%other%% is less than or equal to %%this%%.
   */
  lte(other) {
    return this.cmp(other) <= 0;
  }
  /**
   *  Returns true if %%other%% is greater than to %%this%%.
   */
  gt(other) {
    return this.cmp(other) > 0;
  }
  /**
   *  Returns true if %%other%% is greater than or equal to %%this%%.
   */
  gte(other) {
    return this.cmp(other) >= 0;
  }
  /**
   *  Returns a new [[FixedNumber]] which is the largest **integer**
   *  that is less than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  floor() {
    let val = this.#val;
    if (this.#val < BN_02) {
      val -= this.#tens - BN_12;
    }
    val = this.#val / this.#tens * this.#tens;
    return this.#checkValue(val, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let val = this.#val;
    if (this.#val > BN_02) {
      val += this.#tens - BN_12;
    }
    val = this.#val / this.#tens * this.#tens;
    return this.#checkValue(val, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(decimals) {
    if (decimals == null) {
      decimals = 0;
    }
    if (decimals >= this.decimals) {
      return this;
    }
    const delta = this.decimals - decimals;
    const bump = BN_5 * getTens(delta - 1);
    let value = this.value + bump;
    const tens = getTens(delta);
    value = value / tens * tens;
    checkValue(value, this.#format, "round");
    return new _FixedNumber(_guard, value, this.#format);
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return this.#val === BN_02;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return this.#val < BN_02;
  }
  /**
   *  Returns the string representation of %%this%%.
   */
  toString() {
    return this._value;
  }
  /**
   *  Returns a float approximation.
   *
   *  Due to IEEE 754 precission (or lack thereof), this function
   *  can only return an approximation and most values will contain
   *  rounding errors.
   */
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  /**
   *  Return a new [[FixedNumber]] with the same value but has had
   *  its field set to %%format%%.
   *
   *  This will throw if the value cannot fit into %%format%%.
   */
  toFormat(format) {
    return _FixedNumber.fromString(this.toString(), format);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% divided by
   *  %%decimal%% places with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% (once adjusted
   *  for %%decimals%%) cannot fit in %%format%%, either due to overflow
   *  or underflow (precision loss).
   */
  static fromValue(_value, _decimals, _format) {
    const decimals = _decimals == null ? 0 : getNumber(_decimals);
    const format = getFormat(_format);
    let value = getBigInt(_value, "value");
    const delta = decimals - format.decimals;
    if (delta > 0) {
      const tens = getTens(delta);
      assert(value % tens === BN_02, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: _value
      });
      value /= tens;
    } else if (delta < 0) {
      value *= getTens(-delta);
    }
    checkValue(value, format, "fromValue");
    return new _FixedNumber(_guard, value, format);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%%, either due to overflow or underflow (precision loss).
   */
  static fromString(_value, _format) {
    const match = _value.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
    assertArgument(match && match[2].length + match[3].length > 0, "invalid FixedNumber string value", "value", _value);
    const format = getFormat(_format);
    let whole = match[2] || "0", decimal = match[3] || "";
    while (decimal.length < format.decimals) {
      decimal += Zeros;
    }
    assert(decimal.substring(format.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: _value
    });
    decimal = decimal.substring(0, format.decimals);
    const value = BigInt(match[1] + whole + decimal);
    checkValue(value, format, "fromString");
    return new _FixedNumber(_guard, value, format);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(_value, _format) {
    let value = toBigInt(getBytes(_value, "value"));
    const format = getFormat(_format);
    if (format.signed) {
      value = fromTwos(value, format.width);
    }
    checkValue(value, format, "fromBytes");
    return new _FixedNumber(_guard, value, format);
  }
};

// node_modules/ethers/lib.esm/utils/units.js
var names = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function parseUnits(value, unit) {
  assertArgument(typeof value === "string", "value must be a string", "value", value);
  let decimals = 18;
  if (typeof unit === "string") {
    const index = names.indexOf(unit);
    assertArgument(index >= 0, "invalid unit", "unit", unit);
    decimals = 3 * index;
  } else if (unit != null) {
    decimals = getNumber(unit, "unit");
  }
  return FixedNumber.fromString(value, { decimals, width: 512 }).value;
}

// src/fixtures.ts
var import_starknet2 = require("starknet");

// src/types.ts
var SourceType = /* @__PURE__ */ ((SourceType2) => {
  SourceType2["DEX"] = "DEX";
  SourceType2["MARKET_MAKER"] = "MARKET_MAKER";
  SourceType2["SOLVER"] = "SOLVER";
  return SourceType2;
})(SourceType || {});

// src/fixtures.ts
var aPriceRequest = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7"
});
var aQuoteRequest = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  size: 1,
  takerAddress: "0x0"
});
var aPrice = () => ({
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: parseUnits("2", 18),
  buyAmountInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  sourceName: "AMM1",
  priceRatioUsd: 0,
  gasFees: BigInt(0),
  gasFeesInUsd: 0
});
var aQuote = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: parseUnits("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: parseUnits("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 1,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
      routes: []
    }
  ],
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  suggestedSolution: void 0
});
var aQuoteWithManySubRoutes = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: parseUnits("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: parseUnits("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 1,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 1,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
          routes: [
            {
              name: "AMM1",
              address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
              percent: 1,
              sellTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
              buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
              routes: []
            }
          ]
        }
      ]
    }
  ],
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  suggestedSolution: void 0
});
var aQuoteWithManyComplexRoutes = () => ({
  quoteId: "quoteId",
  sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  sellAmount: parseUnits("1", 18),
  sellAmountInUsd: 1700,
  buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  buyAmount: parseUnits("2", 18),
  buyAmountInUsd: 1700,
  buyAmountWithoutFees: parseUnits("2", 18),
  buyAmountWithoutFeesInUsd: 1700,
  blockNumber: 1,
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  expiry: 1e11,
  gasFees: BigInt("0x0"),
  gasFeesInUsd: 0,
  avnuFees: BigInt("0x0"),
  avnuFeesInUsd: 0,
  avnuFeesBps: BigInt("0x0"),
  integratorFees: BigInt("0x0"),
  integratorFeesInUsd: 0,
  integratorFeesBps: BigInt("0x0"),
  priceRatioUsd: 0,
  liquiditySource: "DEX_AGGREGATOR",
  routes: [
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.5,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 0.5,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
          routes: [
            {
              name: "AMM1",
              address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
              percent: 1,
              sellTokenAddress: "0x2e2faab2cad8ecdde5e991798673ddcc08983b872304a66e5f99fbb24e14abc",
              buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
              routes: []
            }
          ]
        },
        {
          name: "AMM1",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
          percent: 0.5,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        }
      ]
    },
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.2,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
      routes: []
    },
    {
      name: "AMM1",
      address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
      percent: 0.3,
      sellTokenAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      buyTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      routes: [
        {
          name: "AMM2",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c662",
          percent: 0.2,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        },
        {
          name: "AMM1",
          address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
          percent: 0.8,
          sellTokenAddress: "0x3e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
          buyTokenAddress: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
          routes: []
        }
      ]
    }
  ],
  suggestedSolution: void 0
});
var anInvokeSwapResponse = () => ({
  transactionHash: "0x0"
});
var aBuildSwapTransaction = () => ({
  chainId: import_starknet2.constants.StarknetChainId.SN_GOERLI,
  contractAddress: "0x0",
  entrypoint: "execute",
  calldata: []
});
var ethToken = () => ({
  name: "Ethereum",
  address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  symbol: "ETH",
  decimals: 18,
  chainId: "0x534e5f474f45524c49",
  logoUri: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
});
var btcToken = () => ({
  name: "Wrapped Bitcoin",
  address: "0x72df4dc5b6c4df72e4288857317caf2ce9da166ab8719ab8306516a2fddfff7",
  symbol: "WBTC",
  decimals: 18,
  chainId: "0x534e5f474f45524c49",
  logoUri: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
});
var aPair = () => ({
  token1: ethToken(),
  token2: btcToken()
});
var aPage = (content, size = 10, number = 0, totalPages = 1, totalElements = 1) => ({
  content,
  size,
  totalPages,
  number,
  totalElements
});
var aSource = () => ({
  name: "AMM1",
  address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
  icon: "https://pbs.twimg.com/profile_images/1567441002063069184/SGtDtW-C_400x400.jpg",
  type: "DEX" /* DEX */
});

// src/services.ts
var import_qs = __toESM(require("qs"));
var import_starknet3 = require("starknet");
var getBaseUrl = () => process.env.NODE_ENV === "dev" ? STAGING_BASE_URL : BASE_URL;
var parseResponse = (response, avnuPublicKey) => {
  if (response.status === 400) {
    return response.json().then((error) => {
      throw new Error(error.messages[0]);
    });
  }
  if (response.status > 400) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  if (avnuPublicKey) {
    const signature = response.headers.get("signature");
    if (!signature)
      throw new Error("No server signature");
    return response.clone().text().then((textResponse) => {
      const hashResponse = import_starknet3.hash.computeHashOnElements([import_starknet3.hash.starknetKeccak(textResponse)]);
      const formattedSig = signature.split(",").map((s) => BigInt(s));
      const signatureType = new import_starknet3.ec.starkCurve.Signature(formattedSig[0], formattedSig[1]);
      if (!import_starknet3.ec.starkCurve.verify(signatureType, hashResponse, avnuPublicKey))
        throw new Error("Invalid server signature");
    }).then(() => response.json());
  }
  return response.json();
};
var fetchPrices = (request, options) => {
  const queryParams = import_qs.default.stringify({ ...request, sellAmount: toBeHex(request.sellAmount) }, { arrayFormat: "repeat" });
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/prices?${queryParams}`, {
    signal: options?.abortSignal,
    headers: { ...options?.avnuPublicKey !== void 0 && { "ask-signature": "true" } }
  }).then((response) => parseResponse(response, options?.avnuPublicKey)).then(
    (prices) => prices.map((price) => ({
      ...price,
      sellAmount: BigInt(price.sellAmount),
      buyAmount: BigInt(price.buyAmount),
      gasFees: BigInt(price.gasFees)
    }))
  );
};
var fetchQuotes = (request, options) => {
  const queryParams = import_qs.default.stringify(
    {
      ...request,
      sellAmount: toBeHex(request.sellAmount),
      integratorFees: request.integratorFees ? toBeHex(request.integratorFees) : void 0
    },
    { arrayFormat: "repeat" }
  );
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/quotes?${queryParams}`, {
    signal: options?.abortSignal,
    headers: { ...options?.avnuPublicKey !== void 0 && { "ask-signature": "true" } }
  }).then((response) => parseResponse(response, options?.avnuPublicKey)).then(
    (quotes) => quotes.map((quote) => ({
      ...quote,
      sellAmount: BigInt(quote.sellAmount),
      buyAmount: BigInt(quote.buyAmount),
      buyAmountWithoutFees: BigInt(quote.buyAmountWithoutFees),
      gasFees: BigInt(quote.gasFees),
      avnuFees: BigInt(quote.avnuFees),
      integratorFees: BigInt(quote.integratorFees),
      avnuFeesBps: BigInt(quote.avnuFeesBps),
      integratorFeesBps: BigInt(quote.integratorFeesBps),
      suggestedSolution: quote.suggestedSolution ? {
        ...quote.suggestedSolution,
        sellAmount: BigInt(quote.suggestedSolution.sellAmount),
        buyAmount: BigInt(quote.suggestedSolution.buyAmount)
      } : void 0
    }))
  );
};
var fetchExecuteSwapTransaction = (quoteId, takerSignature, nonce, takerAddress, slippage, options) => {
  let signature = [];
  if (Array.isArray(takerSignature)) {
    signature = takerSignature.map((sig) => toBeHex(BigInt(sig)));
  } else if (takerSignature.r && takerSignature.s) {
    signature = [toBeHex(BigInt(takerSignature.r)), toBeHex(BigInt(takerSignature.s))];
  }
  return fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/execute`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options?.avnuPublicKey && { "ask-signature": "true" }
    },
    body: JSON.stringify({
      quoteId,
      takerAddress,
      nonce,
      slippage,
      takerSignature: signature
    })
  }).then((response) => parseResponse(response, options?.avnuPublicKey));
};
var fetchBuildExecuteTransaction = (quoteId, nonce, takerAddress, slippage, options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/build`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options?.avnuPublicKey && { "ask-signature": "true" }
  },
  body: JSON.stringify({ quoteId, takerAddress, nonce, slippage })
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var fetchTokens = (request, options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/tokens?${import_qs.default.stringify(request ?? {})}`, {
  signal: options?.abortSignal,
  headers: { ...options?.avnuPublicKey && { "ask-signature": "true" } }
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var fetchSources = (options) => fetch(`${options?.baseUrl ?? getBaseUrl()}/swap/v1/sources`, {
  signal: options?.abortSignal,
  headers: { ...options?.avnuPublicKey && { "ask-signature": "true" } }
}).then((response) => parseResponse(response, options?.avnuPublicKey));
var checkContractAddress = (contractAddress, chainId, dev) => {
  if (!(dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId])?.includes(contractAddress)) {
    throw Error(`Contract ${contractAddress} is not whitelisted`);
  }
};
var buildApproveTx = (sellTokenAddress, sellAmount, chainId, dev) => {
  const value = import_starknet3.uint256.bnToUint256(toBeHex(sellAmount));
  return {
    contractAddress: sellTokenAddress,
    entrypoint: "approve",
    calldata: [dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId], value.low, value.high]
  };
};
var buildGetNonce = (takerAddress, chainId, dev) => ({
  contractAddress: dev ? AVNU_ADDRESS[`${chainId}-dev`] : AVNU_ADDRESS[chainId],
  entrypoint: "getNonce",
  calldata: [BigInt(takerAddress).toString()]
});
var signQuote = (account, quote, nonce, chainId) => account.signMessage({
  domain: { name: "AVNUFinance", version: "1", chainId },
  message: {
    taker_address: account.address,
    taker_token_address: quote.sellTokenAddress,
    taker_token_amount: toBeHex(quote.sellAmount),
    maker_address: quote.routes[0].address,
    maker_token_address: quote.buyTokenAddress,
    maker_token_amount: toBeHex(quote.buyAmount),
    nonce
  },
  primaryType: "TakerMessage",
  types: {
    StarkNetDomain: [
      { name: "name", type: "felt" },
      { name: "version", type: "felt" },
      { name: "chainId", type: "felt" }
    ],
    TakerMessage: [
      { name: "taker_address", type: "felt" },
      { name: "taker_token_address", type: "felt" },
      { name: "taker_token_amount", type: "felt" },
      { name: "maker_address", type: "felt" },
      { name: "maker_token_address", type: "felt" },
      { name: "maker_token_amount", type: "felt" },
      { name: "nonce", type: "felt" }
    ]
  }
});
var hashQuote = (accountAddress, quote, nonce, chainId) => import_starknet3.typedData.getMessageHash(
  {
    domain: { name: "AVNUFinance", version: "1", chainId },
    message: {
      taker_address: accountAddress,
      taker_token_address: quote.sellTokenAddress,
      taker_token_amount: toBeHex(quote.sellAmount),
      maker_address: quote.routes[0].address,
      maker_token_address: quote.buyTokenAddress,
      maker_token_amount: toBeHex(quote.buyAmount),
      nonce
    },
    primaryType: "TakerMessage",
    types: {
      StarkNetDomain: [
        { name: "name", type: "felt" },
        { name: "version", type: "felt" },
        { name: "chainId", type: "felt" }
      ],
      TakerMessage: [
        { name: "taker_address", type: "felt" },
        { name: "taker_token_address", type: "felt" },
        { name: "taker_token_amount", type: "felt" },
        { name: "maker_address", type: "felt" },
        { name: "maker_token_address", type: "felt" },
        { name: "maker_token_amount", type: "felt" },
        { name: "nonce", type: "felt" }
      ]
    }
  },
  accountAddress
);
var executeSwap = async (account, quote, { executeApprove = true, gasless = false, takerSignature, slippage } = {}, options) => {
  const chainId = await account.getChainId();
  if (chainId !== quote.chainId) {
    throw Error(`Invalid chainId`);
  }
  const approve = executeApprove ? buildApproveTx(quote.sellTokenAddress, quote.sellAmount, quote.chainId, options?.dev) : void 0;
  let nonce = void 0;
  if (quote.liquiditySource === "MARKET_MAKER" || gasless) {
    const getNonce = buildGetNonce(account.address, chainId, options?.dev);
    const response = await account.callContract(getNonce);
    nonce = response.result[0];
  }
  if (gasless) {
    if (approve)
      await account.execute([approve]);
    takerSignature = takerSignature ?? await signQuote(account, quote, nonce, quote.chainId);
    return fetchExecuteSwapTransaction(quote.quoteId, takerSignature, nonce, account.address, slippage, options);
  } else {
    return fetchBuildExecuteTransaction(quote.quoteId, nonce, account.address, slippage, options).then((call) => {
      checkContractAddress(call.contractAddress, call.chainId, options?.dev);
      return account.execute(approve ? [approve, call] : [call]);
    }).then((value) => ({ transactionHash: value.transaction_hash }));
  }
};
var calculateMinAmount = (amount, slippage) => amount - amount * BigInt(slippage) / BigInt(1e4);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AVNU_ADDRESS,
  BASE_URL,
  STAGING_BASE_URL,
  SourceType,
  aBuildSwapTransaction,
  aPage,
  aPair,
  aPrice,
  aPriceRequest,
  aQuote,
  aQuoteRequest,
  aQuoteWithManyComplexRoutes,
  aQuoteWithManySubRoutes,
  aSource,
  anInvokeSwapResponse,
  btcToken,
  buildApproveTx,
  buildGetNonce,
  calculateMinAmount,
  checkContractAddress,
  ethToken,
  executeSwap,
  fetchBuildExecuteTransaction,
  fetchExecuteSwapTransaction,
  fetchPrices,
  fetchQuotes,
  fetchSources,
  fetchTokens,
  hashQuote,
  signQuote
});
//# sourceMappingURL=index.js.map