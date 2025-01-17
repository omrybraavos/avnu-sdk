"use strict";
var avnu = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
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
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // node_modules/whatwg-fetch/fetch.js
  var fetch_exports = {};
  __export(fetch_exports, {
    DOMException: () => DOMException,
    Headers: () => Headers,
    Request: () => Request,
    Response: () => Response,
    fetch: () => fetch2
  });
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }
  function normalizeName(name) {
    if (typeof name !== "string") {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
      throw new TypeError('Invalid character in header field name: "' + name + '"');
    }
    return name.toLowerCase();
  }
  function normalizeValue(value) {
    if (typeof value !== "string") {
      value = String(value);
    }
    return value;
  }
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return { done: value === void 0, value };
      }
    };
    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator;
      };
    }
    return iterator;
  }
  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }
  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError("Already read"));
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    });
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }
  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join("");
  }
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }
  function Body() {
    this.bodyUsed = false;
    this._initBody = function(body) {
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._bodyText = "";
      } else if (typeof body === "string") {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }
      if (!this.headers.get("content-type")) {
        if (typeof body === "string") {
          this.headers.set("content-type", "text/plain;charset=UTF-8");
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set("content-type", this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        }
      }
    };
    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error("could not read FormData body as blob");
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed;
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            );
          } else {
            return Promise.resolve(this._bodyArrayBuffer);
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }
    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error("could not read FormData body as text");
      } else {
        return Promise.resolve(this._bodyText);
      }
    };
    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode);
      };
    }
    this.json = function() {
      return this.text().then(JSON.parse);
    };
    return this;
  }
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }
  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    options = options || {};
    var body = options.body;
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError("Already read");
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }
    this.credentials = options.credentials || this.credentials || "same-origin";
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || "GET");
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;
    if ((this.method === "GET" || this.method === "HEAD") && body) {
      throw new TypeError("Body not allowed for GET or HEAD requests");
    }
    this._initBody(body);
    if (this.method === "GET" || this.method === "HEAD") {
      if (options.cache === "no-store" || options.cache === "no-cache") {
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
        } else {
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
        }
      }
    }
  }
  function decode(body) {
    var form = new FormData();
    body.trim().split("&").forEach(function(bytes2) {
      if (bytes2) {
        var split2 = bytes2.split("=");
        var name = split2.shift().replace(/\+/g, " ");
        var value = split2.join("=").replace(/\+/g, " ");
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }
  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split("\r").map(function(header) {
      return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
    }).forEach(function(line) {
      var parts = line.split(":");
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(":").trim();
        headers.append(key, value);
      }
    });
    return headers;
  }
  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    if (!options) {
      options = {};
    }
    this.type = "default";
    this.status = options.status === void 0 ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
    this.headers = new Headers(options.headers);
    this.url = options.url || "";
    this._initBody(bodyInit);
  }
  function fetch2(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      if (request.signal && request.signal.aborted) {
        return reject(new DOMException("Aborted", "AbortError"));
      }
      var xhr = new XMLHttpRequest();
      function abortXhr() {
        xhr.abort();
      }
      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || "")
        };
        options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
        var body = "response" in xhr ? xhr.response : xhr.responseText;
        setTimeout(function() {
          resolve(new Response(body, options));
        }, 0);
      };
      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError("Network request failed"));
        }, 0);
      };
      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError("Network request failed"));
        }, 0);
      };
      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException("Aborted", "AbortError"));
        }, 0);
      };
      function fixUrl(url) {
        try {
          return url === "" && global2.location.href ? global2.location.href : url;
        } catch (e) {
          return url;
        }
      }
      xhr.open(request.method, fixUrl(request.url), true);
      if (request.credentials === "include") {
        xhr.withCredentials = true;
      } else if (request.credentials === "omit") {
        xhr.withCredentials = false;
      }
      if ("responseType" in xhr) {
        if (support.blob) {
          xhr.responseType = "blob";
        } else if (support.arrayBuffer && request.headers.get("Content-Type") && request.headers.get("Content-Type").indexOf("application/octet-stream") !== -1) {
          xhr.responseType = "arraybuffer";
        }
      }
      if (init && typeof init.headers === "object" && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
      } else {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });
      }
      if (request.signal) {
        request.signal.addEventListener("abort", abortXhr);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            request.signal.removeEventListener("abort", abortXhr);
          }
        };
      }
      xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
    });
  }
  var global2, support, viewClasses, isArrayBufferView, methods, redirectStatuses, DOMException;
  var init_fetch = __esm({
    "node_modules/whatwg-fetch/fetch.js"() {
      "use strict";
      global2 = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global2 !== "undefined" && global2;
      support = {
        searchParams: "URLSearchParams" in global2,
        iterable: "Symbol" in global2 && "iterator" in Symbol,
        blob: "FileReader" in global2 && "Blob" in global2 && function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: "FormData" in global2,
        arrayBuffer: "ArrayBuffer" in global2
      };
      if (support.arrayBuffer) {
        viewClasses = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ];
        isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ", " + value : value;
      };
      Headers.prototype["delete"] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };
      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }
      methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit });
      };
      Body.call(Request.prototype);
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, { status: 0, statusText: "" });
        response.type = "error";
        return response;
      };
      redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response(null, { status, headers: { location: url } });
      };
      DOMException = global2.DOMException;
      try {
        new DOMException();
      } catch (err2) {
        DOMException = function(message, name) {
          this.message = message;
          this.name = name;
          var error = Error(message);
          this.stack = error.stack;
        };
        DOMException.prototype = Object.create(Error.prototype);
        DOMException.prototype.constructor = DOMException;
      }
      fetch2.polyfill = true;
      if (!global2.fetch) {
        global2.fetch = fetch2;
        global2.Headers = Headers;
        global2.Request = Request;
        global2.Response = Response;
      }
    }
  });

  // node_modules/isomorphic-fetch/fetch-npm-browserify.js
  var require_fetch_npm_browserify = __commonJS({
    "node_modules/isomorphic-fetch/fetch-npm-browserify.js"(exports, module) {
      "use strict";
      init_fetch();
      module.exports = self.fetch.bind(self);
    }
  });

  // node_modules/url-join/lib/url-join.js
  var require_url_join = __commonJS({
    "node_modules/url-join/lib/url-join.js"(exports, module) {
      "use strict";
      (function(name, context, definition) {
        if (typeof module !== "undefined" && module.exports)
          module.exports = definition();
        else if (typeof define === "function" && define.amd)
          define(definition);
        else
          context[name] = definition();
      })("urljoin", exports, function() {
        function normalize(strArray) {
          var resultArray = [];
          if (strArray.length === 0) {
            return "";
          }
          if (typeof strArray[0] !== "string") {
            throw new TypeError("Url must be a string. Received " + strArray[0]);
          }
          if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
            var first = strArray.shift();
            strArray[0] = first + strArray[0];
          }
          if (strArray[0].match(/^file:\/\/\//)) {
            strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1:///");
          } else {
            strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1://");
          }
          for (var i = 0; i < strArray.length; i++) {
            var component = strArray[i];
            if (typeof component !== "string") {
              throw new TypeError("Url must be a string. Received " + component);
            }
            if (component === "") {
              continue;
            }
            if (i > 0) {
              component = component.replace(/^[\/]+/, "");
            }
            if (i < strArray.length - 1) {
              component = component.replace(/[\/]+$/, "");
            } else {
              component = component.replace(/[\/]+$/, "/");
            }
            resultArray.push(component);
          }
          var str = resultArray.join("/");
          str = str.replace(/\/(\?|&|#[^!])/g, "$1");
          var parts = str.split("?");
          str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
          return str;
        }
        return function() {
          var input;
          if (typeof arguments[0] === "object") {
            input = arguments[0];
          } else {
            input = [].slice.call(arguments);
          }
          return normalize(input);
        };
      });
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (sym in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/has-proto/index.js
  var require_has_proto = __commonJS({
    "node_modules/has-proto/index.js"(exports, module) {
      "use strict";
      var test = {
        foo: {}
      };
      var $Object = Object;
      module.exports = function hasProto() {
        return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
      };
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var slice = Array.prototype.slice;
      var toStr2 = Object.prototype.toString;
      var funcType = "[object Function]";
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr2.call(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slice.call(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          } else {
            return target.apply(
              that,
              args.concat(slice.call(arguments))
            );
          }
        };
        var boundLength = Math.max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs.push("$" + i);
        }
        bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/has/src/index.js
  var require_src = __commonJS({
    "node_modules/has/src/index.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $SyntaxError = SyntaxError;
      var $Function = Function;
      var $TypeError = TypeError;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = Object.getOwnPropertyDescriptor;
      if ($gOPD) {
        try {
          $gOPD({}, "");
        } catch (e) {
          $gOPD = null;
        }
      }
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var hasProto = require_has_proto()();
      var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
        return x.__proto__;
      } : null);
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": RangeError,
        "%ReferenceError%": ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen2 = doEval2("%AsyncGenerator%");
          if (gen2 && getProto) {
            value = getProto(gen2.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_src();
      var $concat = bind.call(Function.call, Array.prototype.concat);
      var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
      var $replace = bind.call(Function.call, String.prototype.replace);
      var $strSlice = bind.call(Function.call, String.prototype.slice);
      var $exec = bind.call(Function.call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number2, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number2 || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var bind = require_function_bind();
      var GetIntrinsic = require_get_intrinsic();
      var $apply = GetIntrinsic("%Function.prototype.apply%");
      var $call = GetIntrinsic("%Function.prototype.call%");
      var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
      var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
      var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
      var $max = GetIntrinsic("%Math.max%");
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = null;
        }
      }
      module.exports = function callBind(originalFunction) {
        var func = $reflectApply(bind, $call, arguments);
        if ($gOPD && $defineProperty) {
          var desc = $gOPD(func, "length");
          if (desc.configurable) {
            $defineProperty(
              func,
              "length",
              { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
            );
          }
        }
        return func;
      };
      var applyBind = function applyBind2() {
        return $reflectApply(bind, $apply, arguments);
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // (disabled):node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):node_modules/object-inspect/util.inspect"() {
      "use strict";
    }
  });

  // node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "node_modules/object-inspect/index.js"(exports, module) {
      "use strict";
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      module.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError2(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key) {
              mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber2(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt2(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (!isDate(obj) && !isRegExp(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr2(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function isArray(obj) {
        return toStr2(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isDate(obj) {
        return toStr2(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isRegExp(obj) {
        return toStr2(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isError2(obj) {
        return toStr2(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isString(obj) {
        return toStr2(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isNumber2(obj) {
        return toStr2(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isBoolean(obj) {
        return toStr2(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt2(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr2(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key in obj) {
          if (!has(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // node_modules/side-channel/index.js
  var require_side_channel = __commonJS({
    "node_modules/side-channel/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_callBound();
      var inspect = require_object_inspect();
      var $TypeError = GetIntrinsic("%TypeError%");
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $Map = GetIntrinsic("%Map%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var listGetNode = function(list, key) {
        for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            curr.next = list.next;
            list.next = curr;
            return curr;
          }
        }
      };
      var listGet = function(objects, key) {
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
          node.value = value;
        } else {
          objects.next = {
            // eslint-disable-line no-param-reassign
            key,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key) {
        return !!listGetNode(objects, key);
      };
      module.exports = function getSideChannel() {
        var $wm;
        var $m;
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapGet($m, key);
              }
            } else {
              if ($o) {
                return listGet($o, key);
              }
            }
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            } else if ($Map) {
              if ($m) {
                return $mapHas($m, key);
              }
            } else {
              if ($o) {
                return listHas($o, key);
              }
            }
            return false;
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if ($Map) {
              if (!$m) {
                $m = new $Map();
              }
              $mapSet($m, key, value);
            } else {
              if (!$o) {
                $o = { key: {}, next: null };
              }
              listSet($o, key, value);
            }
          }
        };
        return channel;
      };
    }
  });

  // node_modules/qs/lib/formats.js
  var require_formats = __commonJS({
    "node_modules/qs/lib/formats.js"(exports, module) {
      "use strict";
      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;
      var Format = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      };
      module.exports = {
        "default": Format.RFC3986,
        formatters: {
          RFC1738: function(value) {
            return replace.call(value, percentTwenties, "+");
          },
          RFC3986: function(value) {
            return String(value);
          }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
      };
    }
  });

  // node_modules/qs/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/qs/lib/utils.js"(exports, module) {
      "use strict";
      var formats = require_formats();
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var hexTable = function() {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
        }
        return array;
      }();
      var compactQueue = function compactQueue2(queue) {
        while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];
          if (isArray(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== "undefined") {
                compacted.push(obj[j]);
              }
            }
            item.obj[item.prop] = compacted;
          }
        }
      };
      var arrayToObject = function arrayToObject2(source, options) {
        var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== "undefined") {
            obj[i] = source[i];
          }
        }
        return obj;
      };
      var merge = function merge2(target, source, options) {
        if (!source) {
          return target;
        }
        if (typeof source !== "object") {
          if (isArray(target)) {
            target.push(source);
          } else if (target && typeof target === "object") {
            if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
              target[source] = true;
            }
          } else {
            return [target, source];
          }
          return target;
        }
        if (!target || typeof target !== "object") {
          return [target].concat(source);
        }
        var mergeTarget = target;
        if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
        }
        if (isArray(target) && isArray(source)) {
          source.forEach(function(item, i) {
            if (has.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                target[i] = merge2(targetItem, item, options);
              } else {
                target.push(item);
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }
        return Object.keys(source).reduce(function(acc, key) {
          var value = source[key];
          if (has.call(acc, key)) {
            acc[key] = merge2(acc[key], value, options);
          } else {
            acc[key] = value;
          }
          return acc;
        }, mergeTarget);
      };
      var assign2 = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function(acc, key) {
          acc[key] = source[key];
          return acc;
        }, target);
      };
      var decode2 = function(str, decoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };
      var encode = function encode2(str, defaultEncoder, charset, kind, format) {
        if (str.length === 0) {
          return str;
        }
        var string = str;
        if (typeof str === "symbol") {
          string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== "string") {
          string = String(str);
        }
        if (charset === "iso-8859-1") {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
          });
        }
        var out = "";
        for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);
          if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
            out += string.charAt(i);
            continue;
          }
          if (c < 128) {
            out = out + hexTable[c];
            continue;
          }
          if (c < 2048) {
            out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
            continue;
          }
          if (c < 55296 || c >= 57344) {
            out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
            continue;
          }
          i += 1;
          c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
          out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
        }
        return out;
      };
      var compact = function compact2(value) {
        var queue = [{ obj: { o: value }, prop: "o" }];
        var refs = [];
        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];
          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
              queue.push({ obj, prop: key });
              refs.push(val);
            }
          }
        }
        compactQueue(queue);
        return value;
      };
      var isRegExp = function isRegExp2(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      };
      var isBuffer = function isBuffer2(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };
      var combine = function combine2(a, b) {
        return [].concat(a, b);
      };
      var maybeMap = function maybeMap2(val, fn) {
        if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
          }
          return mapped;
        }
        return fn(val);
      };
      module.exports = {
        arrayToObject,
        assign: assign2,
        combine,
        compact,
        decode: decode2,
        encode,
        isBuffer,
        isRegExp,
        maybeMap,
        merge
      };
    }
  });

  // node_modules/qs/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/qs/lib/stringify.js"(exports, module) {
      "use strict";
      var getSideChannel = require_side_channel();
      var utils2 = require_utils();
      var formats = require_formats();
      var has = Object.prototype.hasOwnProperty;
      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
          return prefix + "[]";
        },
        comma: "comma",
        indices: function indices(prefix, key) {
          return prefix + "[" + key + "]";
        },
        repeat: function repeat(prefix) {
          return prefix;
        }
      };
      var isArray = Array.isArray;
      var push = Array.prototype.push;
      var pushToArray = function(arr, valueOrArray) {
        push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
      };
      var toISO = Date.prototype.toISOString;
      var defaultFormat = formats["default"];
      var defaults = {
        addQueryPrefix: false,
        allowDots: false,
        charset: "utf-8",
        charsetSentinel: false,
        delimiter: "&",
        encode: true,
        encoder: utils2.encode,
        encodeValuesOnly: false,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };
      var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
        return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
      };
      var sentinel = {};
      var stringify4 = function stringify5(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter2, encodeValuesOnly, charset, sideChannel) {
        var obj = object;
        var tmpSc = sideChannel;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
          var pos = tmpSc.get(object);
          step += 1;
          if (typeof pos !== "undefined") {
            if (pos === step) {
              throw new RangeError("Cyclic object value");
            } else {
              findFlag = true;
            }
          }
          if (typeof tmpSc.get(sentinel) === "undefined") {
            step = 0;
          }
        }
        if (typeof filter === "function") {
          obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (generateArrayPrefix === "comma" && isArray(obj)) {
          obj = utils2.maybeMap(obj, function(value2) {
            if (value2 instanceof Date) {
              return serializeDate(value2);
            }
            return value2;
          });
        }
        if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
          }
          obj = "";
        }
        if (isNonNullishPrimitive(obj) || utils2.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
            return [formatter2(keyValue) + "=" + formatter2(encoder(obj, defaults.encoder, charset, "value", format))];
          }
          return [formatter2(prefix) + "=" + formatter2(String(obj))];
        }
        var values = [];
        if (typeof obj === "undefined") {
          return values;
        }
        var objKeys;
        if (generateArrayPrefix === "comma" && isArray(obj)) {
          if (encodeValuesOnly && encoder) {
            obj = utils2.maybeMap(obj, encoder);
          }
          objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
        } else if (isArray(filter)) {
          objKeys = filter;
        } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }
        var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
        for (var j = 0; j < objKeys.length; ++j) {
          var key = objKeys[j];
          var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
          if (skipNulls && value === null) {
            continue;
          }
          var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
          sideChannel.set(object, step);
          var valueSideChannel = getSideChannel();
          valueSideChannel.set(sentinel, sideChannel);
          pushToArray(values, stringify5(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter2,
            encodeValuesOnly,
            charset,
            valueSideChannel
          ));
        }
        return values;
      };
      var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
        if (!opts) {
          return defaults;
        }
        if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
          throw new TypeError("Encoder has to be a function.");
        }
        var charset = opts.charset || defaults.charset;
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var format = formats["default"];
        if (typeof opts.format !== "undefined") {
          if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError("Unknown format option provided.");
          }
          format = opts.format;
        }
        var formatter2 = formats.formatters[format];
        var filter = defaults.filter;
        if (typeof opts.filter === "function" || isArray(opts.filter)) {
          filter = opts.filter;
        }
        return {
          addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter,
          format,
          formatter: formatter2,
          serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === "function" ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };
      module.exports = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter;
        if (typeof options.filter === "function") {
          filter = options.filter;
          obj = filter("", obj);
        } else if (isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
        }
        var keys = [];
        if (typeof obj !== "object" || obj === null) {
          return "";
        }
        var arrayFormat;
        if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
        } else if (opts && "indices" in opts) {
          arrayFormat = opts.indices ? "indices" : "repeat";
        } else {
          arrayFormat = "indices";
        }
        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
        if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
          throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        }
        var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
        if (!objKeys) {
          objKeys = Object.keys(obj);
        }
        if (options.sort) {
          objKeys.sort(options.sort);
        }
        var sideChannel = getSideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          if (options.skipNulls && obj[key] === null) {
            continue;
          }
          pushToArray(keys, stringify4(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
          ));
        }
        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? "?" : "";
        if (options.charsetSentinel) {
          if (options.charset === "iso-8859-1") {
            prefix += "utf8=%26%2310003%3B&";
          } else {
            prefix += "utf8=%E2%9C%93&";
          }
        }
        return joined.length > 0 ? prefix + joined : "";
      };
    }
  });

  // node_modules/qs/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/qs/lib/parse.js"(exports, module) {
      "use strict";
      var utils2 = require_utils();
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var defaults = {
        allowDots: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: false,
        comma: false,
        decoder: utils2.decode,
        delimiter: "&",
        depth: 5,
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1e3,
        parseArrays: true,
        plainObjects: false,
        strictNullHandling: false
      };
      var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, function($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        });
      };
      var parseArrayValue = function(val, options) {
        if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
          return val.split(",");
        }
        return val;
      };
      var isoSentinel = "utf8=%26%2310003%3B";
      var charsetSentinel = "utf8=%E2%9C%93";
      var parseValues = function parseQueryStringValues(str, options) {
        var obj = { __proto__: null };
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
        var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1;
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf("utf8=") === 0) {
              if (parts[i] === charsetSentinel) {
                charset = "utf-8";
              } else if (parts[i] === isoSentinel) {
                charset = "iso-8859-1";
              }
              skipIndex = i;
              i = parts.length;
            }
          }
        }
        for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
            continue;
          }
          var part = parts[i];
          var bracketEqualsPos = part.indexOf("]=");
          var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
          var key, val;
          if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, "key");
            val = options.strictNullHandling ? null : "";
          } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
            val = utils2.maybeMap(
              parseArrayValue(part.slice(pos + 1), options),
              function(encodedVal) {
                return options.decoder(encodedVal, defaults.decoder, charset, "value");
              }
            );
          }
          if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
            val = interpretNumericEntities(val);
          }
          if (part.indexOf("[]=") > -1) {
            val = isArray(val) ? [val] : val;
          }
          if (has.call(obj, key)) {
            obj[key] = utils2.combine(obj[key], val);
          } else {
            obj[key] = val;
          }
        }
        return obj;
      };
      var parseObject = function(chain, val, options, valuesParsed) {
        var leaf = valuesParsed ? val : parseArrayValue(val, options);
        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];
          if (root === "[]" && options.parseArrays) {
            obj = [].concat(leaf);
          } else {
            obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
            var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === "") {
              obj = { 0: leaf };
            } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
              obj = [];
              obj[index] = leaf;
            } else if (cleanRoot !== "__proto__") {
              obj[cleanRoot] = leaf;
            }
          }
          leaf = obj;
        }
        return leaf;
      };
      var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
          return;
        }
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;
        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;
        var keys = [];
        if (parent) {
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(parent);
        }
        var i = 0;
        while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(segment[1]);
        }
        if (segment) {
          keys.push("[" + key.slice(segment.index) + "]");
        }
        return parseObject(keys, val, options, valuesParsed);
      };
      var normalizeParseOptions = function normalizeParseOptions2(opts) {
        if (!opts) {
          return defaults;
        }
        if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
          throw new TypeError("Decoder has to be a function.");
        }
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
        return {
          allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
          allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
          arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
          decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
          delimiter: typeof opts.delimiter === "string" || utils2.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };
      module.exports = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === "" || str === null || typeof str === "undefined") {
          return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        }
        var tempObj = typeof str === "string" ? parseValues(str, options) : str;
        var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
          obj = utils2.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) {
          return obj;
        }
        return utils2.compact(obj);
      };
    }
  });

  // node_modules/qs/lib/index.js
  var require_lib = __commonJS({
    "node_modules/qs/lib/index.js"(exports, module) {
      "use strict";
      var stringify4 = require_stringify();
      var parse3 = require_parse();
      var formats = require_formats();
      module.exports = {
        formats,
        parse: parse3,
        stringify: stringify4
      };
    }
  });

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

  // node_modules/@noble/curves/esm/abstract/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    bitGet: () => bitGet,
    bitLen: () => bitLen,
    bitMask: () => bitMask,
    bitSet: () => bitSet,
    bytesToHex: () => bytesToHex,
    bytesToNumberBE: () => bytesToNumberBE,
    bytesToNumberLE: () => bytesToNumberLE,
    concatBytes: () => concatBytes,
    createHmacDrbg: () => createHmacDrbg,
    ensureBytes: () => ensureBytes,
    equalBytes: () => equalBytes,
    hexToBytes: () => hexToBytes,
    hexToNumber: () => hexToNumber,
    numberToBytesBE: () => numberToBytesBE,
    numberToBytesLE: () => numberToBytesLE,
    numberToHexUnpadded: () => numberToHexUnpadded,
    numberToVarBytesBE: () => numberToVarBytesBE,
    utf8ToBytes: () => utf8ToBytes,
    validateObject: () => validateObject
  });
  var _0n = BigInt(0);
  var _1n = BigInt(1);
  var _2n = BigInt(2);
  var u8a = (a) => a instanceof Uint8Array;
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes2) {
    if (!u8a(bytes2))
      throw new Error("Uint8Array expected");
    let hex = "";
    for (let i = 0; i < bytes2.length; i++) {
      hex += hexes[bytes2[i]];
    }
    return hex;
  }
  function numberToHexUnpadded(num) {
    const hex = num.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
  }
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return BigInt(hex === "" ? "0" : `0x${hex}`);
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    const len = hex.length;
    if (len % 2)
      throw new Error("padded hex string expected, got unpadded hex of length " + len);
    const array = new Uint8Array(len / 2);
    for (let i = 0; i < array.length; i++) {
      const j = i * 2;
      const hexByte = hex.slice(j, j + 2);
      const byte = Number.parseInt(hexByte, 16);
      if (Number.isNaN(byte) || byte < 0)
        throw new Error("Invalid byte sequence");
      array[i] = byte;
    }
    return array;
  }
  function bytesToNumberBE(bytes2) {
    return hexToNumber(bytesToHex(bytes2));
  }
  function bytesToNumberLE(bytes2) {
    if (!u8a(bytes2))
      throw new Error("Uint8Array expected");
    return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes(numberToHexUnpadded(n));
  }
  function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes(hex);
      } catch (e) {
        throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
      }
    } else if (u8a(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
  }
  function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad = 0;
    arrays.forEach((a) => {
      if (!u8a(a))
        throw new Error("Uint8Array expected");
      r.set(a, pad);
      pad += a.length;
    });
    return r;
  }
  function equalBytes(b1, b2) {
    if (b1.length !== b2.length)
      return false;
    for (let i = 0; i < b1.length; i++)
      if (b1[i] !== b2[i])
        return false;
    return true;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function bitLen(n) {
    let len;
    for (len = 0; n > _0n; n >>= _1n, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n;
  }
  var bitSet = (n, pos, value) => {
    return n | (value ? _1n : _0n) << BigInt(pos);
  };
  var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
  var u8n = (data) => new Uint8Array(data);
  var u8fr = (arr) => Uint8Array.from(arr);
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k = u8n(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n()) => {
      k = h(u8fr([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr([1]), seed);
      v = h();
    };
    const gen2 = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen2())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  var validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error(`Invalid validator "${type}", expected function`);
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }

  // node_modules/@scure/starknet/lib/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    CURVE: () => CURVE,
    Fp251: () => Fp251,
    MAX_VALUE: () => MAX_VALUE,
    ProjectivePoint: () => ProjectivePoint,
    Signature: () => Signature,
    _poseidonMDS: () => _poseidonMDS,
    _starkCurve: () => _starkCurve,
    computeHashOnElements: () => computeHashOnElements,
    ethSigToPrivate: () => ethSigToPrivate,
    getAccountPath: () => getAccountPath,
    getPublicKey: () => getPublicKey,
    getSharedSecret: () => getSharedSecret,
    getStarkKey: () => getStarkKey,
    grindKey: () => grindKey,
    keccak: () => keccak,
    pedersen: () => pedersen,
    poseidonBasic: () => poseidonBasic,
    poseidonCreate: () => poseidonCreate,
    poseidonHash: () => poseidonHash,
    poseidonHashFunc: () => poseidonHashFunc,
    poseidonHashMany: () => poseidonHashMany,
    poseidonHashSingle: () => poseidonHashSingle,
    poseidonSmall: () => poseidonSmall,
    sign: () => sign,
    utils: () => utils,
    verify: () => verify
  });

  // node_modules/@noble/hashes/esm/_assert.js
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`Wrong positive integer: ${n}`);
  }
  function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
  }
  function hash(hash2) {
    if (typeof hash2 !== "function" || typeof hash2.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(hash2.outputLen);
    number(hash2.blockLen);
  }
  function exists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }

  // node_modules/@noble/hashes/esm/_u64.js
  var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
  var _32n = /* @__PURE__ */ BigInt(32);
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

  // node_modules/@noble/hashes/esm/crypto.js
  var crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/@noble/hashes/esm/utils.js
  var u8a2 = (a) => a instanceof Uint8Array;
  var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var rotr = (word, shift) => word << 32 - shift | word >>> shift;
  var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE)
    throw new Error("Non little-endian hardware is not supported");
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes2(data);
    if (!u8a2(data))
      throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
  }
  function concatBytes2(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad = 0;
    arrays.forEach((a) => {
      if (!u8a2(a))
        throw new Error("Uint8Array expected");
      r.set(a, pad);
      pad += a.length;
    });
    return r;
  }
  var Hash = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  var toStr = {}.toString;
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto && typeof crypto.getRandomValues === "function") {
      return crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/@noble/hashes/esm/sha3.js
  var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
  var _0n2 = /* @__PURE__ */ BigInt(0);
  var _1n2 = /* @__PURE__ */ BigInt(1);
  var _2n2 = /* @__PURE__ */ BigInt(2);
  var _7n = /* @__PURE__ */ BigInt(7);
  var _256n = /* @__PURE__ */ BigInt(256);
  var _0x71n = /* @__PURE__ */ BigInt(113);
  for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n2;
    for (let j = 0; j < 7; j++) {
      R = (R << _1n2 ^ (R >> _7n) * _0x71n) % _256n;
      if (R & _2n2)
        t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
    }
    _SHA3_IOTA.push(t);
  }
  var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
  var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
  var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
  }
  var Keccak = class _Keccak extends Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
      super();
      this.blockLen = blockLen;
      this.suffix = suffix;
      this.outputLen = outputLen;
      this.enableXOF = enableXOF;
      this.rounds = rounds;
      this.pos = 0;
      this.posOut = 0;
      this.finished = false;
      this.destroyed = false;
      number(outputLen);
      if (0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200);
      this.state32 = u32(this.state);
    }
    keccak() {
      keccakP(this.state32, this.rounds);
      this.posOut = 0;
      this.pos = 0;
    }
    update(data) {
      exists(this);
      const { blockLen, state } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        for (let i = 0; i < take; i++)
          state[this.pos++] ^= data[pos++];
        if (this.pos === blockLen)
          this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = true;
      const { state, suffix, pos, blockLen } = this;
      state[pos] ^= suffix;
      if ((suffix & 128) !== 0 && pos === blockLen - 1)
        this.keccak();
      state[blockLen - 1] ^= 128;
      this.keccak();
    }
    writeInto(out) {
      exists(this, false);
      bytes(out);
      this.finish();
      const bufferOut = this.state;
      const { blockLen } = this;
      for (let pos = 0, len = out.length; pos < len; ) {
        if (this.posOut >= blockLen)
          this.keccak();
        const take = Math.min(blockLen - this.posOut, len - pos);
        out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
        this.posOut += take;
        pos += take;
      }
      return out;
    }
    xofInto(out) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(out);
    }
    xof(bytes2) {
      number(bytes2);
      return this.xofInto(new Uint8Array(bytes2));
    }
    digestInto(out) {
      output(out, this);
      if (this.finished)
        throw new Error("digest() was already called");
      this.writeInto(out);
      this.destroy();
      return out;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = true;
      this.state.fill(0);
    }
    _cloneInto(to) {
      const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
      to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
      to.state32.set(this.state32);
      to.pos = this.pos;
      to.posOut = this.posOut;
      to.finished = this.finished;
      to.rounds = rounds;
      to.suffix = suffix;
      to.outputLen = outputLen;
      to.enableXOF = enableXOF;
      to.destroyed = this.destroyed;
      return to;
    }
  };
  var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
  var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
  var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
  var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
  var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
  var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
  var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
  var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
  var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
  var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
  var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
  var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

  // node_modules/@noble/hashes/esm/_sha2.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  var SHA2 = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE2) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE2;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      exists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      exists(this);
      output(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE2 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE2);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/@noble/hashes/esm/sha256.js
  var Chi = (a, b, c) => a & b ^ ~a & c;
  var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
  var SHA256_K = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var IV = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends SHA2 {
    constructor() {
      super(64, 32, 8, false);
      this.A = IV[0] | 0;
      this.B = IV[1] | 0;
      this.C = IV[2] | 0;
      this.D = IV[3] | 0;
      this.E = IV[4] | 0;
      this.F = IV[5] | 0;
      this.G = IV[6] | 0;
      this.H = IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W[i - 15];
        const W2 = SHA256_W[i - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

  // node_modules/@noble/curves/esm/abstract/modular.js
  var _0n3 = BigInt(0);
  var _1n3 = BigInt(1);
  var _2n3 = BigInt(2);
  var _3n = BigInt(3);
  var _4n = BigInt(4);
  var _5n = BigInt(5);
  var _8n = BigInt(8);
  var _9n = BigInt(9);
  var _16n = BigInt(16);
  function mod(a, b) {
    const result = a % b;
    return result >= _0n3 ? result : b + result;
  }
  function pow(num, power, modulo) {
    if (modulo <= _0n3 || power < _0n3)
      throw new Error("Expected power/modulo > 0");
    if (modulo === _1n3)
      return _0n3;
    let res = _1n3;
    while (power > _0n3) {
      if (power & _1n3)
        res = res * num % modulo;
      num = num * num % modulo;
      power >>= _1n3;
    }
    return res;
  }
  function invert(number2, modulo) {
    if (number2 === _0n3 || modulo <= _0n3) {
      throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
    }
    let a = mod(number2, modulo);
    let b = modulo;
    let x = _0n3, y = _1n3, u = _1n3, v = _0n3;
    while (a !== _0n3) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n3)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function tonelliShanks(P) {
    const legendreC = (P - _1n3) / _2n3;
    let Q, S, Z;
    for (Q = P - _1n3, S = 0; Q % _2n3 === _0n3; Q /= _2n3, S++)
      ;
    for (Z = _2n3; Z < P && pow(Z, legendreC, P) !== P - _1n3; Z++)
      ;
    if (S === 1) {
      const p1div4 = (P + _1n3) / _4n;
      return function tonelliFast(Fp, n) {
        const root = Fp.pow(n, p1div4);
        if (!Fp.eql(Fp.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n3) / _2n3;
    return function tonelliSlow(Fp, n) {
      if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
      let x = Fp.pow(n, Q1div2);
      let b = Fp.pow(n, Q);
      while (!Fp.eql(b, Fp.ONE)) {
        if (Fp.eql(b, Fp.ZERO))
          return Fp.ZERO;
        let m = 1;
        for (let t2 = Fp.sqr(b); m < r; m++) {
          if (Fp.eql(t2, Fp.ONE))
            break;
          t2 = Fp.sqr(t2);
        }
        const ge = Fp.pow(g, _1n3 << BigInt(r - m - 1));
        g = Fp.sqr(ge);
        x = Fp.mul(x, ge);
        b = Fp.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt(P) {
    if (P % _4n === _3n) {
      const p1div4 = (P + _1n3) / _4n;
      return function sqrt3mod4(Fp, n) {
        const root = Fp.pow(n, p1div4);
        if (!Fp.eql(Fp.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _8n === _5n) {
      const c1 = (P - _5n) / _8n;
      return function sqrt5mod8(Fp, n) {
        const n2 = Fp.mul(n, _2n3);
        const v = Fp.pow(n2, c1);
        const nv = Fp.mul(n, v);
        const i = Fp.mul(Fp.mul(nv, _2n3), v);
        const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
        if (!Fp.eql(Fp.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _16n === _9n) {
    }
    return tonelliShanks(P);
  }
  var FIELD_FIELDS = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(f, num, power) {
    if (power < _0n3)
      throw new Error("Expected power > 0");
    if (power === _0n3)
      return f.ONE;
    if (power === _1n3)
      return num;
    let p = f.ONE;
    let d = num;
    while (power > _0n3) {
      if (power & _1n3)
        p = f.mul(p, d);
      d = f.sqr(d);
      power >>= _1n3;
    }
    return p;
  }
  function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = acc;
      return f.mul(acc, num);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num, i) => {
      if (f.is0(num))
        return acc;
      tmp[i] = f.mul(acc, tmp[i]);
      return f.mul(acc, num);
    }, inverted);
    return tmp;
  }
  function nLength(n, nBitLength2) {
    const _nBitLength = nBitLength2 !== void 0 ? nBitLength2 : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
    if (ORDER <= _0n3)
      throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("Field lengths over 2048 bytes are not supported");
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
      ORDER,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n3,
      ONE: _1n3,
      create: (num) => mod(num, ORDER),
      isValid: (num) => {
        if (typeof num !== "bigint")
          throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
        return _0n3 <= num && num < ORDER;
      },
      is0: (num) => num === _0n3,
      isOdd: (num) => (num & _1n3) === _1n3,
      neg: (num) => mod(-num, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num) => mod(num * num, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num, power) => FpPow(f, num, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num) => num * num,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num) => invert(num, ORDER),
      sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
      invertBatch: (lst) => FpInvertBatch(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
      fromBytes: (bytes2) => {
        if (bytes2.length !== BYTES)
          throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
        return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField(key, fieldOrder, isLE2 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
    const reduced = mod(num, fieldOrder - _1n3) + _1n3;
    return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }

  // node_modules/@noble/curves/esm/abstract/poseidon.js
  var poseidon_exports = {};
  __export(poseidon_exports, {
    poseidon: () => poseidon,
    splitConstants: () => splitConstants,
    validateOpts: () => validateOpts
  });
  function validateOpts(opts) {
    const { Fp, mds, reversePartialPowIdx: rev, roundConstants: rc } = opts;
    const { roundsFull, roundsPartial, sboxPower, t } = opts;
    validateField(Fp);
    for (const i of ["t", "roundsFull", "roundsPartial"]) {
      if (typeof opts[i] !== "number" || !Number.isSafeInteger(opts[i]))
        throw new Error(`Poseidon: invalid param ${i}=${opts[i]} (${typeof opts[i]})`);
    }
    if (!Array.isArray(mds) || mds.length !== t)
      throw new Error("Poseidon: wrong MDS matrix");
    const _mds = mds.map((mdsRow) => {
      if (!Array.isArray(mdsRow) || mdsRow.length !== t)
        throw new Error(`Poseidon MDS matrix row: ${mdsRow}`);
      return mdsRow.map((i) => {
        if (typeof i !== "bigint")
          throw new Error(`Poseidon MDS matrix value=${i}`);
        return Fp.create(i);
      });
    });
    if (rev !== void 0 && typeof rev !== "boolean")
      throw new Error(`Poseidon: invalid param reversePartialPowIdx=${rev}`);
    if (roundsFull % 2 !== 0)
      throw new Error(`Poseidon roundsFull is not even: ${roundsFull}`);
    const rounds = roundsFull + roundsPartial;
    if (!Array.isArray(rc) || rc.length !== rounds)
      throw new Error("Poseidon: wrong round constants");
    const roundConstants = rc.map((rc2) => {
      if (!Array.isArray(rc2) || rc2.length !== t)
        throw new Error(`Poseidon wrong round constants: ${rc2}`);
      return rc2.map((i) => {
        if (typeof i !== "bigint" || !Fp.isValid(i))
          throw new Error(`Poseidon wrong round constant=${i}`);
        return Fp.create(i);
      });
    });
    if (!sboxPower || ![3, 5, 7].includes(sboxPower))
      throw new Error(`Poseidon wrong sboxPower=${sboxPower}`);
    const _sboxPower = BigInt(sboxPower);
    let sboxFn = (n) => FpPow(Fp, n, _sboxPower);
    if (sboxPower === 3)
      sboxFn = (n) => Fp.mul(Fp.sqrN(n), n);
    else if (sboxPower === 5)
      sboxFn = (n) => Fp.mul(Fp.sqrN(Fp.sqrN(n)), n);
    return Object.freeze({ ...opts, rounds, sboxFn, roundConstants, mds: _mds });
  }
  function splitConstants(rc, t) {
    if (typeof t !== "number")
      throw new Error("poseidonSplitConstants: wrong t");
    if (!Array.isArray(rc) || rc.length % t)
      throw new Error("poseidonSplitConstants: wrong rc");
    const res = [];
    let tmp = [];
    for (let i = 0; i < rc.length; i++) {
      tmp.push(rc[i]);
      if (tmp.length === t) {
        res.push(tmp);
        tmp = [];
      }
    }
    return res;
  }
  function poseidon(opts) {
    const _opts = validateOpts(opts);
    const { Fp, mds, roundConstants, rounds, roundsPartial, sboxFn, t } = _opts;
    const halfRoundsFull = _opts.roundsFull / 2;
    const partialIdx = _opts.reversePartialPowIdx ? t - 1 : 0;
    const poseidonRound = (values, isFull, idx) => {
      values = values.map((i, j) => Fp.add(i, roundConstants[idx][j]));
      if (isFull)
        values = values.map((i) => sboxFn(i));
      else
        values[partialIdx] = sboxFn(values[partialIdx]);
      values = mds.map((i) => i.reduce((acc, i2, j) => Fp.add(acc, Fp.mulN(i2, values[j])), Fp.ZERO));
      return values;
    };
    const poseidonHash2 = function poseidonHash3(values) {
      if (!Array.isArray(values) || values.length !== t)
        throw new Error(`Poseidon: wrong values (expected array of bigints with length ${t})`);
      values = values.map((i) => {
        if (typeof i !== "bigint")
          throw new Error(`Poseidon: wrong value=${i} (${typeof i})`);
        return Fp.create(i);
      });
      let round = 0;
      for (let i = 0; i < halfRoundsFull; i++)
        values = poseidonRound(values, true, round++);
      for (let i = 0; i < roundsPartial; i++)
        values = poseidonRound(values, false, round++);
      for (let i = 0; i < halfRoundsFull; i++)
        values = poseidonRound(values, true, round++);
      if (round !== rounds)
        throw new Error(`Poseidon: wrong number of rounds: last round=${round}, total=${rounds}`);
      return values;
    };
    poseidonHash2.roundConstants = roundConstants;
    return poseidonHash2;
  }

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  var weierstrass_exports = {};
  __export(weierstrass_exports, {
    DER: () => DER,
    SWUFpSqrtRatio: () => SWUFpSqrtRatio,
    mapToCurveSimpleSWU: () => mapToCurveSimpleSWU,
    weierstrass: () => weierstrass,
    weierstrassPoints: () => weierstrassPoints
  });

  // node_modules/@noble/curves/esm/abstract/curve.js
  var _0n4 = BigInt(0);
  var _1n4 = BigInt(1);
  function wNAF(c, bits) {
    const constTimeNegate = (condition, item) => {
      const neg = item.negate();
      return condition ? neg : item;
    };
    const opts = (W) => {
      const windows = Math.ceil(bits / W) + 1;
      const windowSize = 2 ** (W - 1);
      return { windows, windowSize };
    };
    return {
      constTimeNegate,
      // non-const time multiplication ladder
      unsafeLadder(elm, n) {
        let p = c.ZERO;
        let d = elm;
        while (n > _0n4) {
          if (n & _1n4)
            p = p.add(d);
          d = d.double();
          n >>= _1n4;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = opts(W);
        const points = [];
        let p = elm;
        let base = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base = p;
          points.push(base);
          for (let i = 1; i < windowSize; i++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        const { windows, windowSize } = opts(W);
        let p = c.ZERO;
        let f = c.BASE;
        const mask2 = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          let wbits = Number(n & mask2);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n4;
          }
          const offset1 = offset;
          const offset2 = offset + Math.abs(wbits) - 1;
          const cond1 = window2 % 2 !== 0;
          const cond2 = wbits < 0;
          if (wbits === 0) {
            f = f.add(constTimeNegate(cond1, precomputes[offset1]));
          } else {
            p = p.add(constTimeNegate(cond2, precomputes[offset2]));
          }
        }
        return { p, f };
      },
      wNAFCached(P, precomputesMap, n, transform) {
        const W = P._WINDOW_SIZE || 1;
        let comp = precomputesMap.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1) {
            precomputesMap.set(P, transform(comp));
          }
        }
        return this.wNAF(W, comp, n);
      }
    };
  }
  function validateBasic(curve2) {
    validateField(curve2.Fp);
    validateObject(curve2, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve2.n, curve2.nBitLength),
      ...curve2,
      ...{ p: curve2.Fp.ORDER }
    });
  }

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validatePointOpts(curve2) {
    const opts = validateBasic(curve2);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp, a } = opts;
    if (endo) {
      if (!Fp.eql(a, Fp.ZERO)) {
        throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
  var DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
      constructor(m = "") {
        super(m);
      }
    },
    _parseInt(data) {
      const { Err: E } = DER;
      if (data.length < 2 || data[0] !== 2)
        throw new E("Invalid signature integer tag");
      const len = data[1];
      const res = data.subarray(2, len + 2);
      if (!len || res.length !== len)
        throw new E("Invalid signature integer: wrong length");
      if (res[0] & 128)
        throw new E("Invalid signature integer: negative");
      if (res[0] === 0 && !(res[1] & 128))
        throw new E("Invalid signature integer: unnecessary leading zero");
      return { d: b2n(res), l: data.subarray(len + 2) };
    },
    toSig(hex) {
      const { Err: E } = DER;
      const data = typeof hex === "string" ? h2b(hex) : hex;
      if (!(data instanceof Uint8Array))
        throw new Error("ui8a expected");
      let l = data.length;
      if (l < 2 || data[0] != 48)
        throw new E("Invalid signature tag");
      if (data[1] !== l - 2)
        throw new E("Invalid signature: incorrect length");
      const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
      const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
      if (rBytesLeft.length)
        throw new E("Invalid signature: left bytes after parsing");
      return { r, s };
    },
    hexFromSig(sig) {
      const slice = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
      const h = (num) => {
        const hex = num.toString(16);
        return hex.length & 1 ? `0${hex}` : hex;
      };
      const s = slice(h(sig.s));
      const r = slice(h(sig.r));
      const shl = s.length / 2;
      const rhl = r.length / 2;
      const sl = h(shl);
      const rl = h(rhl);
      return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
  };
  var _0n5 = BigInt(0);
  var _1n5 = BigInt(1);
  var _2n4 = BigInt(2);
  var _3n2 = BigInt(3);
  var _4n2 = BigInt(4);
  function weierstrassPoints(opts) {
    const CURVE2 = validatePointOpts(opts);
    const { Fp } = CURVE2;
    const toBytes2 = CURVE2.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
    });
    const fromBytes = CURVE2.fromBytes || ((bytes2) => {
      const tail = bytes2.subarray(1);
      const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
      const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE2;
      const x2 = Fp.sqr(x);
      const x3 = Fp.mul(x2, x);
      return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
    }
    if (!Fp.eql(Fp.sqr(CURVE2.Gy), weierstrassEquation(CURVE2.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num) {
      return typeof num === "bigint" && _0n5 < num && num < CURVE2.n;
    }
    function assertGE(num) {
      if (!isWithinCurveOrder(num))
        throw new Error("Expected valid bigint: 0 < bigint < curve.n");
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE2;
      if (lengths && typeof key !== "bigint") {
        if (key instanceof Uint8Array)
          key = bytesToHex(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("Invalid key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num;
      try {
        num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
      }
      if (wrapPrivateKey)
        num = mod(num, n);
      assertGE(num);
      return num;
    }
    const pointPrecomputes = /* @__PURE__ */ new Map();
    function assertPrjPoint(other) {
      if (!(other instanceof Point))
        throw new Error("ProjectivePoint expected");
    }
    class Point {
      constructor(px, py, pz) {
        this.px = px;
        this.py = py;
        this.pz = pz;
        if (px == null || !Fp.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp.isValid(pz))
          throw new Error("z required");
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point)
          throw new Error("projective point not allowed");
        const is0 = (i) => Fp.eql(i, Fp.ZERO);
        if (is0(x) && is0(y))
          return Point.ZERO;
        return new Point(x, y, Fp.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp.invertBatch(points.map((p) => p.pz));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex) {
        const P = Point.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        if (this.is0()) {
          if (CURVE2.allowInfinityPoint && !Fp.is0(this.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = this.toAffine();
        if (!Fp.isValid(x) || !Fp.isValid(y))
          throw new Error("bad point: x or y not FE");
        const left = Fp.sqr(y);
        const right = weierstrassEquation(x);
        if (!Fp.eql(left, right))
          throw new Error("bad point: equation left != right");
        if (!this.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp.isOdd)
          return !Fp.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
        const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point(this.px, Fp.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE2;
        const b3 = Fp.mul(b, _3n2);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
        let t0 = Fp.mul(X1, X1);
        let t1 = Fp.mul(Y1, Y1);
        let t2 = Fp.mul(Z1, Z1);
        let t3 = Fp.mul(X1, Y1);
        t3 = Fp.add(t3, t3);
        Z3 = Fp.mul(X1, Z1);
        Z3 = Fp.add(Z3, Z3);
        X3 = Fp.mul(a, Z3);
        Y3 = Fp.mul(b3, t2);
        Y3 = Fp.add(X3, Y3);
        X3 = Fp.sub(t1, Y3);
        Y3 = Fp.add(t1, Y3);
        Y3 = Fp.mul(X3, Y3);
        X3 = Fp.mul(t3, X3);
        Z3 = Fp.mul(b3, Z3);
        t2 = Fp.mul(a, t2);
        t3 = Fp.sub(t0, t2);
        t3 = Fp.mul(a, t3);
        t3 = Fp.add(t3, Z3);
        Z3 = Fp.add(t0, t0);
        t0 = Fp.add(Z3, t0);
        t0 = Fp.add(t0, t2);
        t0 = Fp.mul(t0, t3);
        Y3 = Fp.add(Y3, t0);
        t2 = Fp.mul(Y1, Z1);
        t2 = Fp.add(t2, t2);
        t0 = Fp.mul(t2, t3);
        X3 = Fp.sub(X3, t0);
        Z3 = Fp.mul(t2, t1);
        Z3 = Fp.add(Z3, Z3);
        Z3 = Fp.add(Z3, Z3);
        return new Point(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
        const a = CURVE2.a;
        const b3 = Fp.mul(CURVE2.b, _3n2);
        let t0 = Fp.mul(X1, X2);
        let t1 = Fp.mul(Y1, Y2);
        let t2 = Fp.mul(Z1, Z2);
        let t3 = Fp.add(X1, Y1);
        let t4 = Fp.add(X2, Y2);
        t3 = Fp.mul(t3, t4);
        t4 = Fp.add(t0, t1);
        t3 = Fp.sub(t3, t4);
        t4 = Fp.add(X1, Z1);
        let t5 = Fp.add(X2, Z2);
        t4 = Fp.mul(t4, t5);
        t5 = Fp.add(t0, t2);
        t4 = Fp.sub(t4, t5);
        t5 = Fp.add(Y1, Z1);
        X3 = Fp.add(Y2, Z2);
        t5 = Fp.mul(t5, X3);
        X3 = Fp.add(t1, t2);
        t5 = Fp.sub(t5, X3);
        Z3 = Fp.mul(a, t4);
        X3 = Fp.mul(b3, t2);
        Z3 = Fp.add(X3, Z3);
        X3 = Fp.sub(t1, Z3);
        Z3 = Fp.add(t1, Z3);
        Y3 = Fp.mul(X3, Z3);
        t1 = Fp.add(t0, t0);
        t1 = Fp.add(t1, t0);
        t2 = Fp.mul(a, t2);
        t4 = Fp.mul(b3, t4);
        t1 = Fp.add(t1, t2);
        t2 = Fp.sub(t0, t2);
        t2 = Fp.mul(a, t2);
        t4 = Fp.add(t4, t2);
        t0 = Fp.mul(t1, t4);
        Y3 = Fp.add(Y3, t0);
        t0 = Fp.mul(t5, t4);
        X3 = Fp.mul(t3, X3);
        X3 = Fp.sub(X3, t0);
        t0 = Fp.mul(t3, t1);
        Z3 = Fp.mul(t5, Z3);
        Z3 = Fp.add(Z3, t0);
        return new Point(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
          const toInv = Fp.invertBatch(comp.map((p) => p.pz));
          return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
        });
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(n) {
        const I = Point.ZERO;
        if (n === _0n5)
          return I;
        assertGE(n);
        if (n === _1n5)
          return this;
        const { endo } = CURVE2;
        if (!endo)
          return wnaf.unsafeLadder(this, n);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let k1p = I;
        let k2p = I;
        let d = this;
        while (k1 > _0n5 || k2 > _0n5) {
          if (k1 & _1n5)
            k1p = k1p.add(d);
          if (k2 & _1n5)
            k2p = k2p.add(d);
          d = d.double();
          k1 >>= _1n5;
          k2 >>= _1n5;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        assertGE(scalar);
        let n = scalar;
        let point, fake;
        const { endo } = CURVE2;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(n);
          point = p;
          fake = f;
        }
        return Point.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point.BASE;
        const mul = (P, a2) => a2 === _0n5 || a2 === _1n5 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
        const sum = mul(this, a).add(mul(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        const { px: x, py: y, pz: z } = this;
        const is0 = this.is0();
        if (iz == null)
          iz = is0 ? Fp.ONE : Fp.inv(z);
        const ax = Fp.mul(x, iz);
        const ay = Fp.mul(y, iz);
        const zz = Fp.mul(z, iz);
        if (is0)
          return { x: Fp.ZERO, y: Fp.ZERO };
        if (!Fp.eql(zz, Fp.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE2;
        if (cofactor === _1n5)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE2;
        if (cofactor === _1n5)
          return this;
        if (clearCofactor)
          return clearCofactor(Point, this);
        return this.multiplyUnsafe(CURVE2.h);
      }
      toRawBytes(isCompressed = true) {
        this.assertValidity();
        return toBytes2(Point, this, isCompressed);
      }
      toHex(isCompressed = true) {
        return bytesToHex(this.toRawBytes(isCompressed));
      }
    }
    Point.BASE = new Point(CURVE2.Gx, CURVE2.Gy, Fp.ONE);
    Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
    const _bits = CURVE2.nBitLength;
    const wnaf = wNAF(Point, CURVE2.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE: CURVE2,
      ProjectivePoint: Point,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts2(curve2) {
    const opts = validateBasic(curve2);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE2 = validateOpts2(curveDef);
    const { Fp, n: CURVE_ORDER2 } = CURVE2;
    const compressedLen = Fp.BYTES + 1;
    const uncompressedLen = 2 * Fp.BYTES + 1;
    function isValidFieldElement(num) {
      return _0n5 < num && num < Fp.ORDER;
    }
    function modN(a) {
      return mod(a, CURVE_ORDER2);
    }
    function invN(a) {
      return invert(a, CURVE_ORDER2);
    }
    const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE2,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp.toBytes(a.x);
        const cat = concatBytes;
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
        }
      },
      fromBytes(bytes2) {
        const len = bytes2.length;
        const head = bytes2[0];
        const tail = bytes2.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!isValidFieldElement(x))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y = Fp.sqrt(y2);
          const isYOdd = (y & _1n5) === _1n5;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
          const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
          return { x, y };
        } else {
          throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
        }
      }
    });
    const numToNByteStr = (num) => bytesToHex(numberToBytesBE(num, CURVE2.nByteLength));
    function isBiggerThanHalfOrder(number2) {
      const HALF = CURVE_ORDER2 >> _1n5;
      return number2 > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN(-s) : s;
    }
    const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
    class Signature3 {
      constructor(r, s, recovery) {
        this.r = r;
        this.s = s;
        this.recovery = recovery;
        this.assertValidity();
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex) {
        const l = CURVE2.nByteLength;
        hex = ensureBytes("compactSignature", hex, l * 2);
        return new Signature3(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex) {
        const { r, s } = DER.toSig(ensureBytes("DER", hex));
        return new Signature3(r, s);
      }
      assertValidity() {
        if (!isWithinCurveOrder(this.r))
          throw new Error("r must be 0 < r < CURVE.n");
        if (!isWithinCurveOrder(this.s))
          throw new Error("s must be 0 < s < CURVE.n");
      }
      addRecoveryBit(recovery) {
        return new Signature3(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE2.n : r;
        if (radj >= Fp.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point.fromHex(prefix + numToNByteStr(radj));
        const ir = invN(radj);
        const u1 = modN(-h * ir);
        const u2 = modN(s * ir);
        const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature3(this.r, modN(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteStr(this.r) + numToNByteStr(this.s);
      }
    }
    const utils2 = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength(CURVE2.n);
        return mapHashToField(CURVE2.randomBytes(length), CURVE2.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey2(privateKey, isCompressed = true) {
      return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      const arr = item instanceof Uint8Array;
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
      if (arr)
        return len === compressedLen || len === uncompressedLen;
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
      if (item instanceof Point)
        return true;
      return false;
    }
    function getSharedSecret2(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA))
        throw new Error("first arg must be private key");
      if (!isProbPub(publicB))
        throw new Error("second arg must be public key");
      const b = Point.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int2 = CURVE2.bits2int || function(bytes2) {
      const num = bytesToNumberBE(bytes2);
      const delta = bytes2.length * 8 - CURVE2.nBitLength;
      return delta > 0 ? num >> BigInt(delta) : num;
    };
    const bits2int_modN = CURVE2.bits2int_modN || function(bytes2) {
      return modN(bits2int2(bytes2));
    };
    const ORDER_MASK = bitMask(CURVE2.nBitLength);
    function int2octets(num) {
      if (typeof num !== "bigint")
        throw new Error("bigint expected");
      if (!(_0n5 <= num && num < ORDER_MASK))
        throw new Error(`bigint expected < 2^${CURVE2.nBitLength}`);
      return numberToBytesBE(num, CURVE2.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash2, randomBytes: randomBytes2 } = CURVE2;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d), int2octets(h1int)];
      if (ent != null) {
        const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e));
      }
      const seed = concatBytes(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int2(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point.BASE.multiply(k).toAffine();
        const r = modN(q.x);
        if (r === _0n5)
          return;
        const s = modN(ik * modN(m + r * d));
        if (s === _0n5)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n5);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature3(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE2.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE2.lowS, prehash: false };
    function sign2(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE2;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point.BASE._setWindowSize(8);
    function verify2(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      const { lowS, prehash } = opts;
      let _sig = void 0;
      let P;
      try {
        if (typeof sg === "string" || sg instanceof Uint8Array) {
          try {
            _sig = Signature3.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
            _sig = Signature3.fromCompact(sg);
          }
        } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
          const { r: r2, s: s2 } = sg;
          _sig = new Signature3(r2, s2);
        } else {
          throw new Error("PARSE");
        }
        P = Point.fromHex(publicKey);
      } catch (error) {
        if (error.message === "PARSE")
          throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
        return false;
      }
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE2.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN(h * is);
      const u2 = modN(r * is);
      const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN(R.x);
      return v === r;
    }
    return {
      CURVE: CURVE2,
      getPublicKey: getPublicKey2,
      getSharedSecret: getSharedSecret2,
      sign: sign2,
      verify: verify2,
      ProjectivePoint: Point,
      Signature: Signature3,
      utils: utils2
    };
  }
  function SWUFpSqrtRatio(Fp, Z) {
    const q = Fp.ORDER;
    let l = _0n5;
    for (let o = q - _1n5; o % _2n4 === _0n5; o /= _2n4)
      l += _1n5;
    const c1 = l;
    const _2n_pow_c1_1 = _2n4 << c1 - _1n5 - _1n5;
    const _2n_pow_c1 = _2n_pow_c1_1 * _2n4;
    const c2 = (q - _1n5) / _2n_pow_c1;
    const c3 = (c2 - _1n5) / _2n4;
    const c4 = _2n_pow_c1 - _1n5;
    const c5 = _2n_pow_c1_1;
    const c6 = Fp.pow(Z, c2);
    const c7 = Fp.pow(Z, (c2 + _1n5) / _2n4);
    let sqrtRatio = (u, v) => {
      let tv1 = c6;
      let tv2 = Fp.pow(v, c4);
      let tv3 = Fp.sqr(tv2);
      tv3 = Fp.mul(tv3, v);
      let tv5 = Fp.mul(u, tv3);
      tv5 = Fp.pow(tv5, c3);
      tv5 = Fp.mul(tv5, tv2);
      tv2 = Fp.mul(tv5, v);
      tv3 = Fp.mul(tv5, u);
      let tv4 = Fp.mul(tv3, tv2);
      tv5 = Fp.pow(tv4, c5);
      let isQR = Fp.eql(tv5, Fp.ONE);
      tv2 = Fp.mul(tv3, c7);
      tv5 = Fp.mul(tv4, tv1);
      tv3 = Fp.cmov(tv2, tv3, isQR);
      tv4 = Fp.cmov(tv5, tv4, isQR);
      for (let i = c1; i > _1n5; i--) {
        let tv52 = i - _2n4;
        tv52 = _2n4 << tv52 - _1n5;
        let tvv5 = Fp.pow(tv4, tv52);
        const e1 = Fp.eql(tvv5, Fp.ONE);
        tv2 = Fp.mul(tv3, tv1);
        tv1 = Fp.mul(tv1, tv1);
        tvv5 = Fp.mul(tv4, tv1);
        tv3 = Fp.cmov(tv2, tv3, e1);
        tv4 = Fp.cmov(tvv5, tv4, e1);
      }
      return { isValid: isQR, value: tv3 };
    };
    if (Fp.ORDER % _4n2 === _3n2) {
      const c12 = (Fp.ORDER - _3n2) / _4n2;
      const c22 = Fp.sqrt(Fp.neg(Z));
      sqrtRatio = (u, v) => {
        let tv1 = Fp.sqr(v);
        const tv2 = Fp.mul(u, v);
        tv1 = Fp.mul(tv1, tv2);
        let y1 = Fp.pow(tv1, c12);
        y1 = Fp.mul(y1, tv2);
        const y2 = Fp.mul(y1, c22);
        const tv3 = Fp.mul(Fp.sqr(y1), v);
        const isQR = Fp.eql(tv3, u);
        let y = Fp.cmov(y2, y1, isQR);
        return { isValid: isQR, value: y };
      };
    }
    return sqrtRatio;
  }
  function mapToCurveSimpleSWU(Fp, opts) {
    validateField(Fp);
    if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
      throw new Error("mapToCurveSimpleSWU: invalid opts");
    const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
    if (!Fp.isOdd)
      throw new Error("Fp.isOdd is not implemented!");
    return (u) => {
      let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
      tv1 = Fp.sqr(u);
      tv1 = Fp.mul(tv1, opts.Z);
      tv2 = Fp.sqr(tv1);
      tv2 = Fp.add(tv2, tv1);
      tv3 = Fp.add(tv2, Fp.ONE);
      tv3 = Fp.mul(tv3, opts.B);
      tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
      tv4 = Fp.mul(tv4, opts.A);
      tv2 = Fp.sqr(tv3);
      tv6 = Fp.sqr(tv4);
      tv5 = Fp.mul(tv6, opts.A);
      tv2 = Fp.add(tv2, tv5);
      tv2 = Fp.mul(tv2, tv3);
      tv6 = Fp.mul(tv6, tv4);
      tv5 = Fp.mul(tv6, opts.B);
      tv2 = Fp.add(tv2, tv5);
      x = Fp.mul(tv1, tv3);
      const { isValid, value } = sqrtRatio(tv2, tv6);
      y = Fp.mul(tv1, u);
      y = Fp.mul(y, value);
      x = Fp.cmov(x, tv3, isValid);
      y = Fp.cmov(y, value, isValid);
      const e1 = Fp.isOdd(u) === Fp.isOdd(y);
      y = Fp.cmov(Fp.neg(y), y, e1);
      x = Fp.div(x, tv4);
      return { x, y };
    };
  }

  // node_modules/@noble/hashes/esm/hmac.js
  var HMAC = class extends Hash {
    constructor(hash2, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      hash(hash2);
      const key = toBytes(_key);
      this.iHash = hash2.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad = new Uint8Array(blockLen);
      pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54;
      this.iHash.update(pad);
      this.oHash = hash2.create();
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54 ^ 92;
      this.oHash.update(pad);
      pad.fill(0);
    }
    update(buf) {
      exists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      exists(this);
      bytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
  hmac.create = (hash2, key) => new HMAC(hash2, key);

  // node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash(hash2) {
    return {
      hash: hash2,
      hmac: (key, ...msgs) => hmac(hash2, key, concatBytes2(...msgs)),
      randomBytes
    };
  }

  // node_modules/@scure/starknet/lib/esm/index.js
  var CURVE_ORDER = BigInt("3618502788666131213697322783095070105526743751716087489154079457884512865583");
  var MAX_VALUE = BigInt("0x800000000000000000000000000000000000000000000000000000000000000");
  var nBitLength = 252;
  function bits2int(bytes2) {
    while (bytes2[0] === 0)
      bytes2 = bytes2.subarray(1);
    const delta = bytes2.length * 8 - nBitLength;
    const num = bytesToNumberBE(bytes2);
    return delta > 0 ? num >> BigInt(delta) : num;
  }
  function hex0xToBytes(hex) {
    if (typeof hex === "string") {
      hex = strip0x(hex);
      if (hex.length & 1)
        hex = "0" + hex;
    }
    return hexToBytes(hex);
  }
  var curve = weierstrass({
    a: BigInt(1),
    b: BigInt("3141592653589793238462643383279502884197169399375105820974944592307816406665"),
    Fp: Field(BigInt("0x800000000000011000000000000000000000000000000000000000000000001")),
    n: CURVE_ORDER,
    nBitLength,
    Gx: BigInt("874739451078007766457464989774322083649278607533249481151382481072868806602"),
    Gy: BigInt("152666792071518830868575557812948353041420400780739481342941381225525861407"),
    h: BigInt(1),
    lowS: false,
    ...getHash(sha256),
    bits2int,
    bits2int_modN: (bytes2) => {
      const hex = bytesToNumberBE(bytes2).toString(16);
      if (hex.length === 63)
        bytes2 = hex0xToBytes(hex + "0");
      return mod(bits2int(bytes2), CURVE_ORDER);
    }
  });
  var _starkCurve = curve;
  function ensureBytes2(hex) {
    return ensureBytes("", typeof hex === "string" ? hex0xToBytes(hex) : hex);
  }
  function normPrivKey(privKey) {
    return bytesToHex(ensureBytes2(privKey)).padStart(64, "0");
  }
  function getPublicKey(privKey, isCompressed = false) {
    return curve.getPublicKey(normPrivKey(privKey), isCompressed);
  }
  function getSharedSecret(privKeyA, pubKeyB) {
    return curve.getSharedSecret(normPrivKey(privKeyA), pubKeyB);
  }
  function checkSignature(signature) {
    const { r, s } = signature;
    if (r < 0n || r >= MAX_VALUE)
      throw new Error(`Signature.r should be [1, ${MAX_VALUE})`);
    const w = invert(s, CURVE_ORDER);
    if (w < 0n || w >= MAX_VALUE)
      throw new Error(`inv(Signature.s) should be [1, ${MAX_VALUE})`);
  }
  function checkMessage(msgHash) {
    const bytes2 = ensureBytes2(msgHash);
    const num = bytesToNumberBE(bytes2);
    if (num >= MAX_VALUE)
      throw new Error(`msgHash should be [0, ${MAX_VALUE})`);
    return bytes2;
  }
  function sign(msgHash, privKey, opts) {
    const sig = curve.sign(checkMessage(msgHash), normPrivKey(privKey), opts);
    checkSignature(sig);
    return sig;
  }
  function verify(signature, msgHash, pubKey) {
    if (!(signature instanceof Signature)) {
      const bytes2 = ensureBytes2(signature);
      try {
        signature = Signature.fromDER(bytes2);
      } catch (derError) {
        if (!(derError instanceof DER.Err))
          throw derError;
        signature = Signature.fromCompact(bytes2);
      }
    }
    checkSignature(signature);
    return curve.verify(signature, checkMessage(msgHash), ensureBytes2(pubKey));
  }
  var { CURVE, ProjectivePoint, Signature, utils } = curve;
  function extractX(bytes2) {
    const hex = bytesToHex(bytes2.subarray(1));
    const stripped = hex.replace(/^0+/gm, "");
    return `0x${stripped}`;
  }
  function strip0x(hex) {
    return hex.replace(/^0x/i, "");
  }
  function grindKey(seed) {
    const _seed = ensureBytes2(seed);
    const sha256mask = 2n ** 256n;
    const limit = sha256mask - mod(sha256mask, CURVE_ORDER);
    for (let i = 0; ; i++) {
      const key = sha256Num(concatBytes(_seed, numberToVarBytesBE(BigInt(i))));
      if (key < limit)
        return mod(key, CURVE_ORDER).toString(16);
      if (i === 1e5)
        throw new Error("grindKey is broken: tried 100k vals");
    }
  }
  function getStarkKey(privateKey) {
    return extractX(getPublicKey(privateKey, true));
  }
  function ethSigToPrivate(signature) {
    signature = strip0x(signature);
    if (signature.length !== 130)
      throw new Error("Wrong ethereum signature");
    return grindKey(signature.substring(0, 64));
  }
  var MASK_31 = 2n ** 31n - 1n;
  var int31 = (n) => Number(n & MASK_31);
  function getAccountPath(layer, application, ethereumAddress, index) {
    const layerNum = int31(sha256Num(layer));
    const applicationNum = int31(sha256Num(application));
    const eth = hexToNumber(strip0x(ethereumAddress));
    return `m/2645'/${layerNum}'/${applicationNum}'/${int31(eth)}'/${int31(eth >> 31n)}'/${index}`;
  }
  var PEDERSEN_POINTS = [
    new ProjectivePoint(2089986280348253421170679821480865132823066470938446095505822317253594081284n, 1713931329540660377023406109199410414810705867260802078187082345529207694986n, 1n),
    new ProjectivePoint(996781205833008774514500082376783249102396023663454813447423147977397232763n, 1668503676786377725805489344771023921079126552019160156920634619255970485781n, 1n),
    new ProjectivePoint(2251563274489750535117886426533222435294046428347329203627021249169616184184n, 1798716007562728905295480679789526322175868328062420237419143593021674992973n, 1n),
    new ProjectivePoint(2138414695194151160943305727036575959195309218611738193261179310511854807447n, 113410276730064486255102093846540133784865286929052426931474106396135072156n, 1n),
    new ProjectivePoint(2379962749567351885752724891227938183011949129833673362440656643086021394946n, 776496453633298175483985398648758586525933812536653089401905292063708816422n, 1n)
  ];
  function pedersenPrecompute(p1, p2) {
    const out = [];
    let p = p1;
    for (let i = 0; i < 248; i++) {
      out.push(p);
      p = p.double();
    }
    p = p2;
    for (let i = 0; i < 4; i++) {
      out.push(p);
      p = p.double();
    }
    return out;
  }
  var PEDERSEN_POINTS1 = pedersenPrecompute(PEDERSEN_POINTS[1], PEDERSEN_POINTS[2]);
  var PEDERSEN_POINTS2 = pedersenPrecompute(PEDERSEN_POINTS[3], PEDERSEN_POINTS[4]);
  function pedersenArg(arg) {
    let value;
    if (typeof arg === "bigint") {
      value = arg;
    } else if (typeof arg === "number") {
      if (!Number.isSafeInteger(arg))
        throw new Error(`Invalid pedersenArg: ${arg}`);
      value = BigInt(arg);
    } else {
      value = bytesToNumberBE(ensureBytes2(arg));
    }
    if (!(0n <= value && value < curve.CURVE.Fp.ORDER))
      throw new Error(`PedersenArg should be 0 <= value < CURVE.P: ${value}`);
    return value;
  }
  function pedersenSingle(point, value, constants2) {
    let x = pedersenArg(value);
    for (let j = 0; j < 252; j++) {
      const pt = constants2[j];
      if (pt.equals(point))
        throw new Error("Same point");
      if ((x & 1n) !== 0n)
        point = point.add(pt);
      x >>= 1n;
    }
    return point;
  }
  function pedersen(x, y) {
    let point = PEDERSEN_POINTS[0];
    point = pedersenSingle(point, x, PEDERSEN_POINTS1);
    point = pedersenSingle(point, y, PEDERSEN_POINTS2);
    return extractX(point.toRawBytes(true));
  }
  var computeHashOnElements = (data, fn = pedersen) => [0, ...data, data.length].reduce((x, y) => fn(x, y));
  var MASK_250 = bitMask(250);
  var keccak = (data) => bytesToNumberBE(keccak_256(data)) & MASK_250;
  var sha256Num = (data) => bytesToNumberBE(sha256(data));
  var Fp251 = Field(BigInt("3618502788666131213697322783095070105623107215331596699973092056135872020481"));
  function poseidonRoundConstant(Fp, name, idx) {
    const val = Fp.fromBytes(sha256(utf8ToBytes2(`${name}${idx}`)));
    return Fp.create(val);
  }
  function _poseidonMDS(Fp, name, m, attempt = 0) {
    const x_values = [];
    const y_values = [];
    for (let i = 0; i < m; i++) {
      x_values.push(poseidonRoundConstant(Fp, `${name}x`, attempt * m + i));
      y_values.push(poseidonRoundConstant(Fp, `${name}y`, attempt * m + i));
    }
    if ((/* @__PURE__ */ new Set([...x_values, ...y_values])).size !== 2 * m)
      throw new Error("X and Y values are not distinct");
    return x_values.map((x) => y_values.map((y) => Fp.inv(Fp.sub(x, y))));
  }
  var MDS_SMALL = [
    [3, 1, 1],
    [1, -1, 1],
    [1, 1, -2]
  ].map((i) => i.map(BigInt));
  function poseidonBasic(opts, mds) {
    validateField(opts.Fp);
    if (!Number.isSafeInteger(opts.rate) || !Number.isSafeInteger(opts.capacity))
      throw new Error(`Wrong poseidon opts: ${opts}`);
    const m = opts.rate + opts.capacity;
    const rounds = opts.roundsFull + opts.roundsPartial;
    const roundConstants = [];
    for (let i = 0; i < rounds; i++) {
      const row = [];
      for (let j = 0; j < m; j++)
        row.push(poseidonRoundConstant(opts.Fp, "Hades", m * i + j));
      roundConstants.push(row);
    }
    const res = poseidon({
      ...opts,
      t: m,
      sboxPower: 3,
      reversePartialPowIdx: true,
      mds,
      roundConstants
    });
    res.m = m;
    res.rate = opts.rate;
    res.capacity = opts.capacity;
    return res;
  }
  function poseidonCreate(opts, mdsAttempt = 0) {
    const m = opts.rate + opts.capacity;
    if (!Number.isSafeInteger(mdsAttempt))
      throw new Error(`Wrong mdsAttempt=${mdsAttempt}`);
    return poseidonBasic(opts, _poseidonMDS(opts.Fp, "HadesMDS", m, mdsAttempt));
  }
  var poseidonSmall = poseidonBasic({ Fp: Fp251, rate: 2, capacity: 1, roundsFull: 8, roundsPartial: 83 }, MDS_SMALL);
  function poseidonHash(x, y, fn = poseidonSmall) {
    return fn([x, y, 2n])[0];
  }
  function poseidonHashFunc(x, y, fn = poseidonSmall) {
    return numberToVarBytesBE(poseidonHash(bytesToNumberBE(x), bytesToNumberBE(y), fn));
  }
  function poseidonHashSingle(x, fn = poseidonSmall) {
    return fn([x, 0n, 1n])[0];
  }
  function poseidonHashMany(values, fn = poseidonSmall) {
    const { m, rate } = fn;
    if (!Array.isArray(values))
      throw new Error("bigint array expected in values");
    const padded = Array.from(values);
    padded.push(1n);
    while (padded.length % rate !== 0)
      padded.push(0n);
    let state = new Array(m).fill(0n);
    for (let i = 0; i < padded.length; i += rate) {
      for (let j = 0; j < rate; j++)
        state[j] += padded[i + j];
      state = fn(state);
    }
    return state[0];
  }

  // node_modules/lossless-json/lib/esm/utils.js
  function isInteger(value) {
    return INTEGER_REGEX.test(value);
  }
  var INTEGER_REGEX = /^-?[0-9]+$/;
  function isNumber(value) {
    return NUMBER_REGEX.test(value);
  }
  var NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
  function isSafeNumber(value, config2) {
    var num = parseFloat(value);
    var str = String(num);
    var v = extractSignificantDigits(value);
    var s = extractSignificantDigits(str);
    if (v === s) {
      return true;
    }
    if ((config2 === null || config2 === void 0 ? void 0 : config2.approx) === true) {
      var requiredDigits = 14;
      if (!isInteger(value) && s.length >= requiredDigits && v.startsWith(s.substring(0, requiredDigits))) {
        return true;
      }
    }
    return false;
  }
  var UnsafeNumberReason = /* @__PURE__ */ function(UnsafeNumberReason2) {
    UnsafeNumberReason2["underflow"] = "underflow";
    UnsafeNumberReason2["overflow"] = "overflow";
    UnsafeNumberReason2["truncate_integer"] = "truncate_integer";
    UnsafeNumberReason2["truncate_float"] = "truncate_float";
    return UnsafeNumberReason2;
  }({});
  function getUnsafeNumberReason(value) {
    if (isSafeNumber(value, {
      approx: false
    })) {
      return void 0;
    }
    if (isInteger(value)) {
      return UnsafeNumberReason.truncate_integer;
    }
    var num = parseFloat(value);
    if (!isFinite(num)) {
      return UnsafeNumberReason.overflow;
    }
    if (num === 0) {
      return UnsafeNumberReason.underflow;
    }
    return UnsafeNumberReason.truncate_float;
  }
  function extractSignificantDigits(value) {
    return value.replace(EXPONENTIAL_PART_REGEX, "").replace(DOT_REGEX, "").replace(TRAILING_ZEROS_REGEX, "").replace(LEADING_MINUS_AND_ZEROS_REGEX, "");
  }
  var EXPONENTIAL_PART_REGEX = /[eE][+-]?\d+$/;
  var LEADING_MINUS_AND_ZEROS_REGEX = /^-?(0*)?/;
  var DOT_REGEX = /\./;
  var TRAILING_ZEROS_REGEX = /0+$/;

  // node_modules/lossless-json/lib/esm/LosslessNumber.js
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var LosslessNumber = /* @__PURE__ */ function() {
    function LosslessNumber2(value) {
      _classCallCheck(this, LosslessNumber2);
      _defineProperty(this, "isLosslessNumber", true);
      if (!isNumber(value)) {
        throw new Error('Invalid number (value: "' + value + '")');
      }
      this.value = value;
    }
    _createClass(LosslessNumber2, [{
      key: "valueOf",
      value: function valueOf() {
        var unsafeReason = getUnsafeNumberReason(this.value);
        if (unsafeReason === void 0 || unsafeReason === UnsafeNumberReason.truncate_float) {
          return parseFloat(this.value);
        }
        if (isInteger(this.value)) {
          return BigInt(this.value);
        }
        throw new Error("Cannot safely convert to number: " + "the value '".concat(this.value, "' would ").concat(unsafeReason, " and become ").concat(parseFloat(this.value)));
      }
      /**
       * Get the value of the LosslessNumber as string.
       */
    }, {
      key: "toString",
      value: function toString3() {
        return this.value;
      }
      // Note: we do NOT implement a .toJSON() method, and you should not implement
      // or use that, it cannot safely turn the numeric value in the string into
      // stringified JSON since it has to be parsed into a number first.
    }]);
    return LosslessNumber2;
  }();
  function isLosslessNumber(value) {
    return value && _typeof(value) === "object" && value.isLosslessNumber === true || false;
  }

  // node_modules/lossless-json/lib/esm/numberParsers.js
  function parseLosslessNumber(value) {
    return new LosslessNumber(value);
  }
  function parseNumberAndBigInt(value) {
    return isInteger(value) ? BigInt(value) : parseFloat(value);
  }

  // node_modules/lossless-json/lib/esm/revive.js
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof2(obj);
  }
  function revive(json, reviver) {
    return reviveValue({
      "": json
    }, "", json, reviver);
  }
  function reviveValue(context, key, value, reviver) {
    if (Array.isArray(value)) {
      return reviver.call(context, key, reviveArray(value, reviver));
    } else if (value && _typeof2(value) === "object" && !isLosslessNumber(value)) {
      return reviver.call(context, key, reviveObject(value, reviver));
    } else {
      return reviver.call(context, key, value);
    }
  }
  function reviveObject(object, reviver) {
    Object.keys(object).forEach(function(key) {
      var value = reviveValue(object, key, object[key], reviver);
      if (value !== void 0) {
        object[key] = value;
      } else {
        delete object[key];
      }
    });
    return object;
  }
  function reviveArray(array, reviver) {
    for (var i = 0; i < array.length; i++) {
      array[i] = reviveValue(array, i + "", array[i], reviver);
    }
    return array;
  }

  // node_modules/lossless-json/lib/esm/parse.js
  function _typeof3(obj) {
    "@babel/helpers - typeof";
    return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof3(obj);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function parse(text, reviver) {
    var parseNumber = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : parseLosslessNumber;
    var i = 0;
    var value = parseValue();
    expectValue(value);
    expectEndOfInput();
    return reviver ? revive(value, reviver) : value;
    function parseObject() {
      if (text.charCodeAt(i) === codeOpeningBrace) {
        i++;
        skipWhitespace();
        var object = {};
        var initial = true;
        while (i < text.length && text.charCodeAt(i) !== codeClosingBrace) {
          if (!initial) {
            eatComma();
            skipWhitespace();
          } else {
            initial = false;
          }
          var start = i;
          var key = parseString();
          if (key === void 0) {
            throwObjectKeyExpected();
          }
          skipWhitespace();
          eatColon();
          var _value = parseValue();
          if (_value === void 0) {
            throwObjectValueExpected();
          }
          if (Object.prototype.hasOwnProperty.call(object, key) && !isDeepEqual(_value, object[key])) {
            throwDuplicateKey(key, start + 1);
          }
          object[key] = _value;
        }
        if (text.charCodeAt(i) !== codeClosingBrace) {
          throwObjectKeyOrEndExpected();
        }
        i++;
        return object;
      }
    }
    function parseArray() {
      if (text.charCodeAt(i) === codeOpeningBracket) {
        i++;
        skipWhitespace();
        var array = [];
        var initial = true;
        while (i < text.length && text.charCodeAt(i) !== codeClosingBracket) {
          if (!initial) {
            eatComma();
          } else {
            initial = false;
          }
          var _value2 = parseValue();
          expectArrayItem(_value2);
          array.push(_value2);
        }
        if (text.charCodeAt(i) !== codeClosingBracket) {
          throwArrayItemOrEndExpected();
        }
        i++;
        return array;
      }
    }
    function parseValue() {
      var _ref, _ref2, _ref3, _ref4, _ref5, _parseString;
      skipWhitespace();
      var value2 = (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_parseString = parseString()) !== null && _parseString !== void 0 ? _parseString : parseNumeric()) !== null && _ref5 !== void 0 ? _ref5 : parseObject()) !== null && _ref4 !== void 0 ? _ref4 : parseArray()) !== null && _ref3 !== void 0 ? _ref3 : parseKeyword("true", true)) !== null && _ref2 !== void 0 ? _ref2 : parseKeyword("false", false)) !== null && _ref !== void 0 ? _ref : parseKeyword("null", null);
      skipWhitespace();
      return value2;
    }
    function parseKeyword(name, value2) {
      if (text.slice(i, i + name.length) === name) {
        i += name.length;
        return value2;
      }
    }
    function skipWhitespace() {
      while (isWhitespace(text.charCodeAt(i))) {
        i++;
      }
    }
    function parseString() {
      if (text.charCodeAt(i) === codeDoubleQuote) {
        i++;
        var result = "";
        while (i < text.length && text.charCodeAt(i) !== codeDoubleQuote) {
          if (text.charCodeAt(i) === codeBackslash) {
            var char = text[i + 1];
            var escapeChar = escapeCharacters[char];
            if (escapeChar !== void 0) {
              result += escapeChar;
              i++;
            } else if (char === "u") {
              if (isHex(text.charCodeAt(i + 2)) && isHex(text.charCodeAt(i + 3)) && isHex(text.charCodeAt(i + 4)) && isHex(text.charCodeAt(i + 5))) {
                result += String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16));
                i += 5;
              } else {
                throwInvalidUnicodeCharacter(i);
              }
            } else {
              throwInvalidEscapeCharacter(i);
            }
          } else {
            if (isValidStringCharacter(text.charCodeAt(i))) {
              result += text[i];
            } else {
              throwInvalidCharacter(text[i]);
            }
          }
          i++;
        }
        expectEndOfString();
        i++;
        return result;
      }
    }
    function parseNumeric() {
      var start = i;
      if (text.charCodeAt(i) === codeMinus) {
        i++;
        expectDigit(start);
      }
      if (text.charCodeAt(i) === codeZero) {
        i++;
      } else if (isNonZeroDigit(text.charCodeAt(i))) {
        i++;
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (text.charCodeAt(i) === codeDot) {
        i++;
        expectDigit(start);
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (text.charCodeAt(i) === codeLowercaseE || text.charCodeAt(i) === codeUppercaseE) {
        i++;
        if (text.charCodeAt(i) === codeMinus || text.charCodeAt(i) === codePlus) {
          i++;
        }
        expectDigit(start);
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (i > start) {
        return parseNumber(text.slice(start, i));
      }
    }
    function eatComma() {
      if (text.charCodeAt(i) !== codeComma) {
        throw new SyntaxError("Comma ',' expected after value ".concat(gotAt()));
      }
      i++;
    }
    function eatColon() {
      if (text.charCodeAt(i) !== codeColon) {
        throw new SyntaxError("Colon ':' expected after property name ".concat(gotAt()));
      }
      i++;
    }
    function expectValue(value2) {
      if (value2 === void 0) {
        throw new SyntaxError("JSON value expected ".concat(gotAt()));
      }
    }
    function expectArrayItem(value2) {
      if (value2 === void 0) {
        throw new SyntaxError("Array item expected ".concat(gotAt()));
      }
    }
    function expectEndOfInput() {
      if (i < text.length) {
        throw new SyntaxError("Expected end of input ".concat(gotAt()));
      }
    }
    function expectDigit(start) {
      if (!isDigit(text.charCodeAt(i))) {
        var numSoFar = text.slice(start, i);
        throw new SyntaxError("Invalid number '".concat(numSoFar, "', expecting a digit ").concat(gotAt()));
      }
    }
    function expectEndOfString() {
      if (text.charCodeAt(i) !== codeDoubleQuote) {
        throw new SyntaxError(`End of string '"' expected `.concat(gotAt()));
      }
    }
    function throwObjectKeyExpected() {
      throw new SyntaxError("Quoted object key expected ".concat(gotAt()));
    }
    function throwDuplicateKey(key, pos2) {
      throw new SyntaxError("Duplicate key '".concat(key, "' encountered at position ").concat(pos2));
    }
    function throwObjectKeyOrEndExpected() {
      throw new SyntaxError("Quoted object key or end of object '}' expected ".concat(gotAt()));
    }
    function throwArrayItemOrEndExpected() {
      throw new SyntaxError("Array item or end of array ']' expected ".concat(gotAt()));
    }
    function throwInvalidCharacter(char) {
      throw new SyntaxError("Invalid character '".concat(char, "' ").concat(pos()));
    }
    function throwInvalidEscapeCharacter(start) {
      var chars = text.slice(start, start + 2);
      throw new SyntaxError("Invalid escape character '".concat(chars, "' ").concat(pos()));
    }
    function throwObjectValueExpected() {
      throw new SyntaxError("Object value expected after ':' ".concat(pos()));
    }
    function throwInvalidUnicodeCharacter(start) {
      var end = start + 2;
      while (/\w/.test(text[end])) {
        end++;
      }
      var chars = text.slice(start, end);
      throw new SyntaxError("Invalid unicode character '".concat(chars, "' ").concat(pos()));
    }
    function pos() {
      return "at position ".concat(i);
    }
    function got() {
      return i < text.length ? "but got '".concat(text[i], "'") : "but reached end of input";
    }
    function gotAt() {
      return got() + " " + pos();
    }
  }
  function isWhitespace(code) {
    return code === codeSpace || code === codeNewline || code === codeTab || code === codeReturn;
  }
  function isHex(code) {
    return code >= codeZero && code <= codeNine || code >= codeUppercaseA && code <= codeUppercaseF || code >= codeLowercaseA && code <= codeLowercaseF;
  }
  function isDigit(code) {
    return code >= codeZero && code <= codeNine;
  }
  function isNonZeroDigit(code) {
    return code >= codeOne && code <= codeNine;
  }
  function isValidStringCharacter(code) {
    return code >= 32 && code <= 1114111;
  }
  function isDeepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every(function(item, index) {
        return isDeepEqual(item, b[index]);
      });
    }
    if (isObject(a) && isObject(b)) {
      var keys = _toConsumableArray(new Set([].concat(_toConsumableArray(Object.keys(a)), _toConsumableArray(Object.keys(b)))));
      return keys.every(function(key) {
        return isDeepEqual(a[key], b[key]);
      });
    }
    return false;
  }
  function isObject(value) {
    return _typeof3(value) === "object" && value !== null;
  }
  var escapeCharacters = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "	"
    // note that \u is handled separately in parseString()
  };
  var codeBackslash = 92;
  var codeOpeningBrace = 123;
  var codeClosingBrace = 125;
  var codeOpeningBracket = 91;
  var codeClosingBracket = 93;
  var codeSpace = 32;
  var codeNewline = 10;
  var codeTab = 9;
  var codeReturn = 13;
  var codeDoubleQuote = 34;
  var codePlus = 43;
  var codeMinus = 45;
  var codeZero = 48;
  var codeOne = 49;
  var codeNine = 57;
  var codeComma = 44;
  var codeDot = 46;
  var codeColon = 58;
  var codeUppercaseA = 65;
  var codeLowercaseA = 97;
  var codeUppercaseE = 69;
  var codeLowercaseE = 101;
  var codeUppercaseF = 70;
  var codeLowercaseF = 102;

  // node_modules/lossless-json/lib/esm/stringify.js
  function _typeof4(obj) {
    "@babel/helpers - typeof";
    return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof4(obj);
  }
  function stringify(value, replacer, space, numberStringifiers) {
    var resolvedSpace = resolveSpace(space);
    var replacedValue = typeof replacer === "function" ? replacer.call({
      "": value
    }, "", value) : value;
    return stringifyValue(replacedValue, "");
    function stringifyValue(value2, indent) {
      if (Array.isArray(numberStringifiers)) {
        var stringifier = numberStringifiers.find(function(item) {
          return item.test(value2);
        });
        if (stringifier) {
          var str = stringifier.stringify(value2);
          if (typeof str !== "string" || !isNumber(str)) {
            throw new Error("Invalid JSON number: output of a number stringifier must be a string containing a JSON number " + "(output: ".concat(str, ")"));
          }
          return str;
        }
      }
      if (typeof value2 === "boolean" || typeof value2 === "number" || typeof value2 === "string" || value2 === null || value2 instanceof Date || value2 instanceof Boolean || value2 instanceof Number || value2 instanceof String) {
        return JSON.stringify(value2);
      }
      if (value2 && value2.isLosslessNumber) {
        return value2.toString();
      }
      if (typeof value2 === "bigint") {
        return value2.toString();
      }
      if (Array.isArray(value2)) {
        return stringifyArray(value2, indent);
      }
      if (value2 && _typeof4(value2) === "object") {
        return stringifyObject(value2, indent);
      }
      return void 0;
    }
    function stringifyArray(array, indent) {
      if (array.length === 0) {
        return "[]";
      }
      var childIndent = resolvedSpace ? indent + resolvedSpace : void 0;
      var str = resolvedSpace ? "[\n" : "[";
      for (var i = 0; i < array.length; i++) {
        var item = typeof replacer === "function" ? replacer.call(array, String(i), array[i]) : array[i];
        if (resolvedSpace) {
          str += childIndent;
        }
        if (typeof item !== "undefined" && typeof item !== "function") {
          str += stringifyValue(item, childIndent);
        } else {
          str += "null";
        }
        if (i < array.length - 1) {
          str += resolvedSpace ? ",\n" : ",";
        }
      }
      str += resolvedSpace ? "\n" + indent + "]" : "]";
      return str;
    }
    function stringifyObject(object, indent) {
      if (typeof object.toJSON === "function") {
        return stringify(object.toJSON(), replacer, space, void 0);
      }
      var keys = Array.isArray(replacer) ? replacer.map(String) : Object.keys(object);
      if (keys.length === 0) {
        return "{}";
      }
      var childIndent = resolvedSpace ? indent + resolvedSpace : void 0;
      var first = true;
      var str = resolvedSpace ? "{\n" : "{";
      keys.forEach(function(key) {
        var value2 = typeof replacer === "function" ? replacer.call(object, key, object[key]) : object[key];
        if (includeProperty(key, value2)) {
          if (first) {
            first = false;
          } else {
            str += resolvedSpace ? ",\n" : ",";
          }
          var keyStr = JSON.stringify(key);
          str += resolvedSpace ? childIndent + keyStr + ": " : keyStr + ":";
          str += stringifyValue(value2, childIndent);
        }
      });
      str += resolvedSpace ? "\n" + indent + "}" : "}";
      return str;
    }
    function includeProperty(key, value2) {
      return typeof value2 !== "undefined" && typeof value2 !== "function" && _typeof4(value2) !== "symbol";
    }
  }
  function resolveSpace(space) {
    if (typeof space === "number") {
      return " ".repeat(space);
    }
    if (typeof space === "string" && space !== "") {
      return space;
    }
    return void 0;
  }

  // node_modules/pako/dist/pako.esm.mjs
  var Z_FIXED$1 = 4;
  var Z_BINARY = 0;
  var Z_TEXT = 1;
  var Z_UNKNOWN$1 = 2;
  function zero$1(buf) {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  }
  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  var LENGTH_CODES$1 = 29;
  var LITERALS$1 = 256;
  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  var D_CODES$1 = 30;
  var BL_CODES$1 = 19;
  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  var MAX_BITS$1 = 15;
  var Buf_size = 16;
  var MAX_BL_BITS = 7;
  var END_BLOCK = 256;
  var REP_3_6 = 16;
  var REPZ_3_10 = 17;
  var REPZ_11_138 = 18;
  var extra_lbits = (
    /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  );
  var extra_dbits = (
    /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  );
  var extra_blbits = (
    /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  );
  var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var DIST_CODE_LEN = 512;
  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    this.extra_bits = extra_bits;
    this.extra_base = extra_base;
    this.elems = elems;
    this.max_length = max_length;
    this.has_stree = static_tree && static_tree.length;
  }
  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;
  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    this.max_code = 0;
    this.stat_desc = stat_desc;
  }
  var d_code = (dist) => {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  };
  var put_short = (s, w) => {
    s.pending_buf[s.pending++] = w & 255;
    s.pending_buf[s.pending++] = w >>> 8 & 255;
  };
  var send_bits = (s, value, length) => {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 65535;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 65535;
      s.bi_valid += length;
    }
  };
  var send_code = (s, c, tree) => {
    send_bits(
      s,
      tree[c * 2],
      tree[c * 2 + 1]
      /*.Len*/
    );
  };
  var bi_reverse = (code, len) => {
    let res = 0;
    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);
    return res >>> 1;
  };
  var bi_flush = (s) => {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 255;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  };
  var gen_bitlen = (s, desc) => {
    const tree = desc.dyn_tree;
    const max_code = desc.max_code;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const extra = desc.stat_desc.extra_bits;
    const base = desc.stat_desc.extra_base;
    const max_length = desc.stat_desc.max_length;
    let h;
    let n, m;
    let bits;
    let xbits;
    let f;
    let overflow = 0;
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }
    tree[s.heap[s.heap_max] * 2 + 1] = 0;
    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }
      tree[n * 2 + 1] = bits;
      if (n > max_code) {
        continue;
      }
      s.bl_count[bits]++;
      xbits = 0;
      if (n >= base) {
        xbits = extra[n - base];
      }
      f = tree[n * 2];
      s.opt_len += f * (bits + xbits);
      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1] + xbits);
      }
    }
    if (overflow === 0) {
      return;
    }
    do {
      bits = max_length - 1;
      while (s.bl_count[bits] === 0) {
        bits--;
      }
      s.bl_count[bits]--;
      s.bl_count[bits + 1] += 2;
      s.bl_count[max_length]--;
      overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];
      while (n !== 0) {
        m = s.heap[--h];
        if (m > max_code) {
          continue;
        }
        if (tree[m * 2 + 1] !== bits) {
          s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
          tree[m * 2 + 1] = bits;
        }
        n--;
      }
    }
  };
  var gen_codes = (tree, max_code, bl_count) => {
    const next_code = new Array(MAX_BITS$1 + 1);
    let code = 0;
    let bits;
    let n;
    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      code = code + bl_count[bits - 1] << 1;
      next_code[bits] = code;
    }
    for (n = 0; n <= max_code; n++) {
      let len = tree[n * 2 + 1];
      if (len === 0) {
        continue;
      }
      tree[n * 2] = bi_reverse(next_code[len]++, len);
    }
  };
  var tr_static_init = () => {
    let n;
    let bits;
    let length;
    let code;
    let dist;
    const bl_count = new Array(MAX_BITS$1 + 1);
    length = 0;
    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;
      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    }
    _length_code[length - 1] = code;
    dist = 0;
    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;
      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    }
    dist >>= 7;
    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;
      for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    }
    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }
    n = 0;
    while (n <= 143) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    while (n <= 255) {
      static_ltree[n * 2 + 1] = 9;
      n++;
      bl_count[9]++;
    }
    while (n <= 279) {
      static_ltree[n * 2 + 1] = 7;
      n++;
      bl_count[7]++;
    }
    while (n <= 287) {
      static_ltree[n * 2 + 1] = 8;
      n++;
      bl_count[8]++;
    }
    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1] = 5;
      static_dtree[n * 2] = bi_reverse(n, 5);
    }
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
  };
  var init_block = (s) => {
    let n;
    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2] = 0;
    }
    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2] = 0;
    }
    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2] = 0;
    }
    s.dyn_ltree[END_BLOCK * 2] = 1;
    s.opt_len = s.static_len = 0;
    s.sym_next = s.matches = 0;
  };
  var bi_windup = (s) => {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      s.pending_buf[s.pending++] = s.bi_buf;
    }
    s.bi_buf = 0;
    s.bi_valid = 0;
  };
  var smaller = (tree, n, m, depth) => {
    const _n2 = n * 2;
    const _m2 = m * 2;
    return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
  };
  var pqdownheap = (s, tree, k) => {
    const v = s.heap[k];
    let j = k << 1;
    while (j <= s.heap_len) {
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      s.heap[k] = s.heap[j];
      k = j;
      j <<= 1;
    }
    s.heap[k] = v;
  };
  var compress_block = (s, ltree, dtree) => {
    let dist;
    let lc;
    let sx = 0;
    let code;
    let extra;
    if (s.sym_next !== 0) {
      do {
        dist = s.pending_buf[s.sym_buf + sx++] & 255;
        dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
        lc = s.pending_buf[s.sym_buf + sx++];
        if (dist === 0) {
          send_code(s, lc, ltree);
        } else {
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree);
          extra = extra_lbits[code];
          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
          }
          dist--;
          code = d_code(dist);
          send_code(s, code, dtree);
          extra = extra_dbits[code];
          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
          }
        }
      } while (sx < s.sym_next);
    }
    send_code(s, END_BLOCK, ltree);
  };
  var build_tree = (s, desc) => {
    const tree = desc.dyn_tree;
    const stree = desc.stat_desc.static_tree;
    const has_stree = desc.stat_desc.has_stree;
    const elems = desc.stat_desc.elems;
    let n, m;
    let max_code = -1;
    let node;
    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;
    for (n = 0; n < elems; n++) {
      if (tree[n * 2] !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1] = 0;
      }
    }
    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2] = 1;
      s.depth[node] = 0;
      s.opt_len--;
      if (has_stree) {
        s.static_len -= stree[node * 2 + 1];
      }
    }
    desc.max_code = max_code;
    for (n = s.heap_len >> 1; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    node = elems;
    do {
      n = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[
        1
        /*SMALLEST*/
      ] = s.heap[s.heap_len--];
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
      m = s.heap[
        1
        /*SMALLEST*/
      ];
      s.heap[--s.heap_max] = n;
      s.heap[--s.heap_max] = m;
      tree[node * 2] = tree[n * 2] + tree[m * 2];
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1] = tree[m * 2 + 1] = node;
      s.heap[
        1
        /*SMALLEST*/
      ] = node++;
      pqdownheap(
        s,
        tree,
        1
        /*SMALLEST*/
      );
    } while (s.heap_len >= 2);
    s.heap[--s.heap_max] = s.heap[
      1
      /*SMALLEST*/
    ];
    gen_bitlen(s, desc);
    gen_codes(tree, max_code, s.bl_count);
  };
  var scan_tree = (s, tree, max_code) => {
    let n;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    tree[(max_code + 1) * 2 + 1] = 65535;
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2] += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2]++;
        }
        s.bl_tree[REP_3_6 * 2]++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2]++;
      } else {
        s.bl_tree[REPZ_11_138 * 2]++;
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var send_tree = (s, tree, max_code) => {
    let n;
    let prevlen = -1;
    let curlen;
    let nextlen = tree[0 * 2 + 1];
    let count = 0;
    let max_count = 7;
    let min_count = 4;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }
    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1];
      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        }
        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }
      count = 0;
      prevlen = curlen;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  var build_bl_tree = (s) => {
    let max_blindex;
    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    build_tree(s, s.bl_desc);
    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
        break;
      }
    }
    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex;
  };
  var send_all_trees = (s, lcodes, dcodes, blcodes) => {
    let rank2;
    send_bits(s, lcodes - 257, 5);
    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    for (rank2 = 0; rank2 < blcodes; rank2++) {
      send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
    }
    send_tree(s, s.dyn_ltree, lcodes - 1);
    send_tree(s, s.dyn_dtree, dcodes - 1);
  };
  var detect_data_type = (s) => {
    let block_mask = 4093624447;
    let n;
    for (n = 0; n <= 31; n++, block_mask >>>= 1) {
      if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
        return Z_BINARY;
      }
    }
    if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
      return Z_TEXT;
    }
    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2] !== 0) {
        return Z_TEXT;
      }
    }
    return Z_BINARY;
  };
  var static_init_done = false;
  var _tr_init$1 = (s) => {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }
    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    init_block(s);
  };
  var _tr_stored_block$1 = (s, buf, stored_len, last) => {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    bi_windup(s);
    put_short(s, stored_len);
    put_short(s, ~stored_len);
    if (stored_len) {
      s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
    }
    s.pending += stored_len;
  };
  var _tr_align$1 = (s) => {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  };
  var _tr_flush_block$1 = (s, buf, stored_len, last) => {
    let opt_lenb, static_lenb;
    let max_blindex = 0;
    if (s.level > 0) {
      if (s.strm.data_type === Z_UNKNOWN$1) {
        s.strm.data_type = detect_data_type(s);
      }
      build_tree(s, s.l_desc);
      build_tree(s, s.d_desc);
      max_blindex = build_bl_tree(s);
      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3;
      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      opt_lenb = static_lenb = stored_len + 5;
    }
    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      _tr_stored_block$1(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    }
    init_block(s);
    if (last) {
      bi_windup(s);
    }
  };
  var _tr_tally$1 = (s, dist, lc) => {
    s.pending_buf[s.sym_buf + s.sym_next++] = dist;
    s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
    s.pending_buf[s.sym_buf + s.sym_next++] = lc;
    if (dist === 0) {
      s.dyn_ltree[lc * 2]++;
    } else {
      s.matches++;
      dist--;
      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
      s.dyn_dtree[d_code(dist) * 2]++;
    }
    return s.sym_next === s.sym_end;
  };
  var _tr_init_1 = _tr_init$1;
  var _tr_stored_block_1 = _tr_stored_block$1;
  var _tr_flush_block_1 = _tr_flush_block$1;
  var _tr_tally_1 = _tr_tally$1;
  var _tr_align_1 = _tr_align$1;
  var trees = {
    _tr_init: _tr_init_1,
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: _tr_flush_block_1,
    _tr_tally: _tr_tally_1,
    _tr_align: _tr_align_1
  };
  var adler32 = (adler, buf, len, pos) => {
    let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
    while (len !== 0) {
      n = len > 2e3 ? 2e3 : len;
      len -= n;
      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);
      s1 %= 65521;
      s2 %= 65521;
    }
    return s1 | s2 << 16 | 0;
  };
  var adler32_1 = adler32;
  var makeTable = () => {
    let c, table = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      table[n] = c;
    }
    return table;
  };
  var crcTable = new Uint32Array(makeTable());
  var crc32 = (crc, buf, len, pos) => {
    const t = crcTable;
    const end = pos + len;
    crc ^= -1;
    for (let i = pos; i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
    }
    return crc ^ -1;
  };
  var crc32_1 = crc32;
  var messages = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  };
  var constants$2 = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  };
  var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$2,
    Z_PARTIAL_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH$1,
    Z_FINISH: Z_FINISH$3,
    Z_BLOCK: Z_BLOCK$1,
    Z_OK: Z_OK$3,
    Z_STREAM_END: Z_STREAM_END$3,
    Z_STREAM_ERROR: Z_STREAM_ERROR$2,
    Z_DATA_ERROR: Z_DATA_ERROR$2,
    Z_BUF_ERROR: Z_BUF_ERROR$1,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
    Z_FILTERED,
    Z_HUFFMAN_ONLY,
    Z_RLE,
    Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
    Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED$2
  } = constants$2;
  var MAX_MEM_LEVEL = 9;
  var MAX_WBITS$1 = 15;
  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  var LITERALS = 256;
  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  var D_CODES = 30;
  var BL_CODES = 19;
  var HEAP_SIZE = 2 * L_CODES + 1;
  var MAX_BITS = 15;
  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 32;
  var INIT_STATE = 42;
  var GZIP_STATE = 57;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  var BS_BLOCK_DONE = 2;
  var BS_FINISH_STARTED = 3;
  var BS_FINISH_DONE = 4;
  var OS_CODE = 3;
  var err = (strm, errorCode) => {
    strm.msg = messages[errorCode];
    return errorCode;
  };
  var rank = (f) => {
    return f * 2 - (f > 4 ? 9 : 0);
  };
  var zero = (buf) => {
    let len = buf.length;
    while (--len >= 0) {
      buf[len] = 0;
    }
  };
  var slide_hash = (s) => {
    let n, m;
    let p;
    let wsize = s.w_size;
    n = s.hash_size;
    p = n;
    do {
      m = s.head[--p];
      s.head[p] = m >= wsize ? m - wsize : 0;
    } while (--n);
    n = wsize;
    p = n;
    do {
      m = s.prev[--p];
      s.prev[p] = m >= wsize ? m - wsize : 0;
    } while (--n);
  };
  var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
  var HASH = HASH_ZLIB;
  var flush_pending = (strm) => {
    const s = strm.state;
    let len = s.pending;
    if (len > strm.avail_out) {
      len = strm.avail_out;
    }
    if (len === 0) {
      return;
    }
    strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;
    if (s.pending === 0) {
      s.pending_out = 0;
    }
  };
  var flush_block_only = (s, last) => {
    _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
    s.block_start = s.strstart;
    flush_pending(s.strm);
  };
  var put_byte = (s, b) => {
    s.pending_buf[s.pending++] = b;
  };
  var putShortMSB = (s, b) => {
    s.pending_buf[s.pending++] = b >>> 8 & 255;
    s.pending_buf[s.pending++] = b & 255;
  };
  var read_buf = (strm, buf, start, size) => {
    let len = strm.avail_in;
    if (len > size) {
      len = size;
    }
    if (len === 0) {
      return 0;
    }
    strm.avail_in -= len;
    buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }
    strm.next_in += len;
    strm.total_in += len;
    return len;
  };
  var longest_match = (s, cur_match) => {
    let chain_length = s.max_chain_length;
    let scan = s.strstart;
    let match;
    let len;
    let best_len = s.prev_length;
    let nice_match = s.nice_match;
    const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
    const _win = s.window;
    const wmask = s.w_mask;
    const prev = s.prev;
    const strend = s.strstart + MAX_MATCH;
    let scan_end1 = _win[scan + best_len - 1];
    let scan_end = _win[scan + best_len];
    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    }
    do {
      match = cur_match;
      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      scan += 2;
      match++;
      do {
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;
      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;
        if (len >= nice_match) {
          break;
        }
        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
    if (best_len <= s.lookahead) {
      return best_len;
    }
    return s.lookahead;
  };
  var fill_window = (s) => {
    const _w_size = s.w_size;
    let n, more, str;
    do {
      more = s.window_size - s.lookahead - s.strstart;
      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        s.block_start -= _w_size;
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
        slide_hash(s);
        more += _w_size;
      }
      if (s.strm.avail_in === 0) {
        break;
      }
      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
        while (s.insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;
          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
  };
  var deflate_stored = (s, flush) => {
    let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
    let len, left, have, last = 0;
    let used = s.strm.avail_in;
    do {
      len = 65535;
      have = s.bi_valid + 42 >> 3;
      if (s.strm.avail_out < have) {
        break;
      }
      have = s.strm.avail_out - have;
      left = s.strstart - s.block_start;
      if (len > left + s.strm.avail_in) {
        len = left + s.strm.avail_in;
      }
      if (len > have) {
        len = have;
      }
      if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
        break;
      }
      last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
      _tr_stored_block(s, 0, 0, last);
      s.pending_buf[s.pending - 4] = len;
      s.pending_buf[s.pending - 3] = len >> 8;
      s.pending_buf[s.pending - 2] = ~len;
      s.pending_buf[s.pending - 1] = ~len >> 8;
      flush_pending(s.strm);
      if (left) {
        if (left > len) {
          left = len;
        }
        s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
        s.strm.next_out += left;
        s.strm.avail_out -= left;
        s.strm.total_out += left;
        s.block_start += left;
        len -= left;
      }
      if (len) {
        read_buf(s.strm, s.strm.output, s.strm.next_out, len);
        s.strm.next_out += len;
        s.strm.avail_out -= len;
        s.strm.total_out += len;
      }
    } while (last === 0);
    used -= s.strm.avail_in;
    if (used) {
      if (used >= s.w_size) {
        s.matches = 2;
        s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
        s.strstart = s.w_size;
        s.insert = s.strstart;
      } else {
        if (s.window_size - s.strstart <= used) {
          s.strstart -= s.w_size;
          s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
          if (s.matches < 2) {
            s.matches++;
          }
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
        }
        s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
        s.strstart += used;
        s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
      }
      s.block_start = s.strstart;
    }
    if (s.high_water < s.strstart) {
      s.high_water = s.strstart;
    }
    if (last) {
      return BS_FINISH_DONE;
    }
    if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
      return BS_BLOCK_DONE;
    }
    have = s.window_size - s.strstart;
    if (s.strm.avail_in > have && s.block_start >= s.w_size) {
      s.block_start -= s.w_size;
      s.strstart -= s.w_size;
      s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
      if (s.matches < 2) {
        s.matches++;
      }
      have += s.w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
    }
    if (have > s.strm.avail_in) {
      have = s.strm.avail_in;
    }
    if (have) {
      read_buf(s.strm, s.window, s.strstart, have);
      s.strstart += have;
      s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
    }
    if (s.high_water < s.strstart) {
      s.high_water = s.strstart;
    }
    have = s.bi_valid + 42 >> 3;
    have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
    min_block = have > s.w_size ? s.w_size : have;
    left = s.strstart - s.block_start;
    if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
      len = left > have ? have : left;
      last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
      _tr_stored_block(s, s.block_start, len, last);
      s.block_start += len;
      flush_pending(s.strm);
    }
    return last ? BS_FINISH_STARTED : BS_NEED_MORE;
  };
  var deflate_fast = (s, flush) => {
    let hash_head;
    let bflush;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          do {
            s.strstart++;
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          } while (--s.match_length !== 0);
          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
        }
      } else {
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_slow = (s, flush) => {
    let hash_head;
    let bflush;
    let max_insert;
    for (; ; ) {
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);
        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      hash_head = 0;
      if (s.lookahead >= MIN_MATCH) {
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
      }
      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;
      if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        s.match_length = longest_match(s, hash_head);
        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
          s.match_length = MIN_MATCH - 1;
        }
      }
      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;
        do {
          if (++s.strstart <= max_insert) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
        } while (--s.prev_length !== 0);
        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      } else if (s.match_available) {
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
        if (bflush) {
          flush_block_only(s, false);
        }
        s.strstart++;
        s.lookahead--;
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    }
    if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }
    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_rle = (s, flush) => {
    let bflush;
    let prev;
    let scan, strend;
    const _win = s.window;
    for (; ; ) {
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);
        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        if (s.lookahead === 0) {
          break;
        }
      }
      s.match_length = 0;
      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];
        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;
          do {
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
          s.match_length = MAX_MATCH - (strend - scan);
          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        }
      }
      if (s.match_length >= MIN_MATCH) {
        bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  var deflate_huff = (s, flush) => {
    let bflush;
    for (; ; ) {
      if (s.lookahead === 0) {
        fill_window(s);
        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          break;
        }
      }
      s.match_length = 0;
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    }
    s.insert = 0;
    if (flush === Z_FINISH$3) {
      flush_block_only(s, true);
      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      return BS_FINISH_DONE;
    }
    if (s.sym_next) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    return BS_BLOCK_DONE;
  };
  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }
  var configuration_table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),
    /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),
    /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),
    /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),
    /* 3 */
    new Config(4, 4, 16, 16, deflate_slow),
    /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),
    /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),
    /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),
    /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),
    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
  ];
  var lm_init = (s) => {
    s.window_size = 2 * s.w_size;
    zero(s.head);
    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  };
  function DeflateState() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED$2;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
    this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
    this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new Uint16Array(MAX_BITS + 1);
    this.heap = new Uint16Array(2 * L_CODES + 1);
    zero(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new Uint16Array(2 * L_CODES + 1);
    zero(this.depth);
    this.sym_buf = 0;
    this.lit_bufsize = 0;
    this.sym_next = 0;
    this.sym_end = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
  }
  var deflateStateCheck = (strm) => {
    if (!strm) {
      return 1;
    }
    const s = strm.state;
    if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
    s.status !== GZIP_STATE && //#endif
    s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
      return 1;
    }
    return 0;
  };
  var deflateResetKeep = (strm) => {
    if (deflateStateCheck(strm)) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    const s = strm.state;
    s.pending = 0;
    s.pending_out = 0;
    if (s.wrap < 0) {
      s.wrap = -s.wrap;
    }
    s.status = //#ifdef GZIP
    s.wrap === 2 ? GZIP_STATE : (
      //#endif
      s.wrap ? INIT_STATE : BUSY_STATE
    );
    strm.adler = s.wrap === 2 ? 0 : 1;
    s.last_flush = -2;
    _tr_init(s);
    return Z_OK$3;
  };
  var deflateReset = (strm) => {
    const ret = deflateResetKeep(strm);
    if (ret === Z_OK$3) {
      lm_init(strm.state);
    }
    return ret;
  };
  var deflateSetHeader = (strm, head) => {
    if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$2;
    }
    strm.state.gzhead = head;
    return Z_OK$3;
  };
  var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
    if (!strm) {
      return Z_STREAM_ERROR$2;
    }
    let wrap = 1;
    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      windowBits -= 16;
    }
    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
      return err(strm, Z_STREAM_ERROR$2);
    }
    if (windowBits === 8) {
      windowBits = 9;
    }
    const s = new DeflateState();
    strm.state = s;
    s.strm = strm;
    s.status = INIT_STATE;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new Uint8Array(s.w_size * 2);
    s.head = new Uint16Array(s.hash_size);
    s.prev = new Uint16Array(s.w_size);
    s.lit_bufsize = 1 << memLevel + 6;
    s.pending_buf_size = s.lit_bufsize * 4;
    s.pending_buf = new Uint8Array(s.pending_buf_size);
    s.sym_buf = s.lit_bufsize;
    s.sym_end = (s.lit_bufsize - 1) * 3;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  };
  var deflateInit = (strm, level) => {
    return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
  };
  var deflate$2 = (strm, flush) => {
    if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    }
    const s = strm.state;
    if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
    }
    const old_flush = s.last_flush;
    s.last_flush = flush;
    if (s.pending !== 0) {
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    if (s.status === INIT_STATE && s.wrap === 0) {
      s.status = BUSY_STATE;
    }
    if (s.status === INIT_STATE) {
      let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
      let level_flags = -1;
      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= level_flags << 6;
      if (s.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - header % 31;
      putShortMSB(s, header);
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      strm.adler = 1;
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
    if (s.status === GZIP_STATE) {
      strm.adler = 0;
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) {
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      } else {
        put_byte(
          s,
          (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 255);
        put_byte(s, s.gzhead.time >> 8 & 255);
        put_byte(s, s.gzhead.time >> 16 & 255);
        put_byte(s, s.gzhead.time >> 24 & 255);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, s.gzhead.os & 255);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 255);
          put_byte(s, s.gzhead.extra.length >> 8 & 255);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra) {
        let beg = s.pending;
        let left = (s.gzhead.extra.length & 65535) - s.gzindex;
        while (s.pending + left > s.pending_buf_size) {
          let copy = s.pending_buf_size - s.pending;
          s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
          s.pending = s.pending_buf_size;
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          s.gzindex += copy;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
          left -= copy;
        }
        let gzhead_extra = new Uint8Array(s.gzhead.extra);
        s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
        s.pending += left;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex = 0;
      }
      s.status = NAME_STATE;
    }
    if (s.status === NAME_STATE) {
      if (s.gzhead.name) {
        let beg = s.pending;
        let val;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
          }
          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex = 0;
      }
      s.status = COMMENT_STATE;
    }
    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment) {
        let beg = s.pending;
        let val;
        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
          }
          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
          } else {
            val = 0;
          }
          put_byte(s, val);
        } while (val !== 0);
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
      }
      s.status = HCRC_STATE;
    }
    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        strm.adler = 0;
      }
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
      let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }
      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
        }
        return Z_OK$3;
      }
      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          _tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          _tr_stored_block(s, 0, 0, false);
          if (flush === Z_FULL_FLUSH$1) {
            zero(s.head);
            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
    }
    if (flush !== Z_FINISH$3) {
      return Z_OK$3;
    }
    if (s.wrap <= 0) {
      return Z_STREAM_END$3;
    }
    if (s.wrap === 2) {
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      put_byte(s, strm.adler >> 16 & 255);
      put_byte(s, strm.adler >> 24 & 255);
      put_byte(s, strm.total_in & 255);
      put_byte(s, strm.total_in >> 8 & 255);
      put_byte(s, strm.total_in >> 16 & 255);
      put_byte(s, strm.total_in >> 24 & 255);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    flush_pending(strm);
    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
  };
  var deflateEnd = (strm) => {
    if (deflateStateCheck(strm)) {
      return Z_STREAM_ERROR$2;
    }
    const status = strm.state.status;
    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
  };
  var deflateSetDictionary = (strm, dictionary) => {
    let dictLength = dictionary.length;
    if (deflateStateCheck(strm)) {
      return Z_STREAM_ERROR$2;
    }
    const s = strm.state;
    const wrap = s.wrap;
    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR$2;
    }
    if (wrap === 1) {
      strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
    }
    s.wrap = 0;
    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        zero(s.head);
        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      let tmpDict = new Uint8Array(s.w_size);
      tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    const avail = strm.avail_in;
    const next = strm.next_in;
    const input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);
    while (s.lookahead >= MIN_MATCH) {
      let str = s.strstart;
      let n = s.lookahead - (MIN_MATCH - 1);
      do {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);
      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }
    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK$3;
  };
  var deflateInit_1 = deflateInit;
  var deflateInit2_1 = deflateInit2;
  var deflateReset_1 = deflateReset;
  var deflateResetKeep_1 = deflateResetKeep;
  var deflateSetHeader_1 = deflateSetHeader;
  var deflate_2$1 = deflate$2;
  var deflateEnd_1 = deflateEnd;
  var deflateSetDictionary_1 = deflateSetDictionary;
  var deflateInfo = "pako deflate (from Nodeca project)";
  var deflate_1$2 = {
    deflateInit: deflateInit_1,
    deflateInit2: deflateInit2_1,
    deflateReset: deflateReset_1,
    deflateResetKeep: deflateResetKeep_1,
    deflateSetHeader: deflateSetHeader_1,
    deflate: deflate_2$1,
    deflateEnd: deflateEnd_1,
    deflateSetDictionary: deflateSetDictionary_1,
    deflateInfo
  };
  var _has = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  var assign = function(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    while (sources.length) {
      const source = sources.shift();
      if (!source) {
        continue;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be non-object");
      }
      for (const p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }
    return obj;
  };
  var flattenChunks = (chunks) => {
    let len = 0;
    for (let i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }
    const result = new Uint8Array(len);
    for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
      let chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }
    return result;
  };
  var common = {
    assign,
    flattenChunks
  };
  var STR_APPLY_UIA_OK = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  }
  var _utf8len = new Uint8Array(256);
  for (let q = 0; q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = (str) => {
    if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
      return new TextEncoder().encode(str);
    }
    let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    }
    buf = new Uint8Array(buf_len);
    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);
      if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);
        if ((c2 & 64512) === 56320) {
          c = 65536 + (c - 55296 << 10) + (c2 - 56320);
          m_pos++;
        }
      }
      if (c < 128) {
        buf[i++] = c;
      } else if (c < 2048) {
        buf[i++] = 192 | c >>> 6;
        buf[i++] = 128 | c & 63;
      } else if (c < 65536) {
        buf[i++] = 224 | c >>> 12;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      } else {
        buf[i++] = 240 | c >>> 18;
        buf[i++] = 128 | c >>> 12 & 63;
        buf[i++] = 128 | c >>> 6 & 63;
        buf[i++] = 128 | c & 63;
      }
    }
    return buf;
  };
  var buf2binstring = (buf, len) => {
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }
    let result = "";
    for (let i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }
    return result;
  };
  var buf2string = (buf, max) => {
    const len = max || buf.length;
    if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
      return new TextDecoder().decode(buf.subarray(0, max));
    }
    let i, out;
    const utf16buf = new Array(len * 2);
    for (out = 0, i = 0; i < len; ) {
      let c = buf[i++];
      if (c < 128) {
        utf16buf[out++] = c;
        continue;
      }
      let c_len = _utf8len[c];
      if (c_len > 4) {
        utf16buf[out++] = 65533;
        i += c_len - 1;
        continue;
      }
      c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 63;
        c_len--;
      }
      if (c_len > 1) {
        utf16buf[out++] = 65533;
        continue;
      }
      if (c < 65536) {
        utf16buf[out++] = c;
      } else {
        c -= 65536;
        utf16buf[out++] = 55296 | c >> 10 & 1023;
        utf16buf[out++] = 56320 | c & 1023;
      }
    }
    return buf2binstring(utf16buf, out);
  };
  var utf8border = (buf, max) => {
    max = max || buf.length;
    if (max > buf.length) {
      max = buf.length;
    }
    let pos = max - 1;
    while (pos >= 0 && (buf[pos] & 192) === 128) {
      pos--;
    }
    if (pos < 0) {
      return max;
    }
    if (pos === 0) {
      return max;
    }
    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };
  var strings = {
    string2buf,
    buf2string,
    utf8border
  };
  function ZStream() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
  }
  var zstream = ZStream;
  var toString$1 = Object.prototype.toString;
  var {
    Z_NO_FLUSH: Z_NO_FLUSH$1,
    Z_SYNC_FLUSH,
    Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH$2,
    Z_OK: Z_OK$2,
    Z_STREAM_END: Z_STREAM_END$2,
    Z_DEFAULT_COMPRESSION,
    Z_DEFAULT_STRATEGY,
    Z_DEFLATED: Z_DEFLATED$1
  } = constants$2;
  function Deflate$1(options) {
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});
    let opt = this.options;
    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = deflate_1$2.deflateInit2(
      this.strm,
      opt.level,
      opt.method,
      opt.windowBits,
      opt.memLevel,
      opt.strategy
    );
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    if (opt.header) {
      deflate_1$2.deflateSetHeader(this.strm, opt.header);
    }
    if (opt.dictionary) {
      let dict;
      if (typeof opt.dictionary === "string") {
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }
      status = deflate_1$2.deflateSetDictionary(this.strm, dict);
      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }
      this._dict_set = true;
    }
  }
  Deflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    let status, _flush_mode;
    if (this.ended) {
      return false;
    }
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
    if (typeof data === "string") {
      strm.input = strings.string2buf(data);
    } else if (toString$1.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      status = deflate_1$2.deflate(strm, _flush_mode);
      if (status === Z_STREAM_END$2) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }
        status = deflate_1$2.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK$2;
      }
      if (strm.avail_out === 0) {
        this.onData(strm.output);
        continue;
      }
      if (_flush_mode > 0 && strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Deflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Deflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK$2) {
      this.result = common.flattenChunks(this.chunks);
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function deflate$1(input, options) {
    const deflator = new Deflate$1(options);
    deflator.push(input, true);
    if (deflator.err) {
      throw deflator.msg || messages[deflator.err];
    }
    return deflator.result;
  }
  function deflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  function gzip$1(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }
  var Deflate_1$1 = Deflate$1;
  var deflate_2 = deflate$1;
  var deflateRaw_1$1 = deflateRaw$1;
  var gzip_1$1 = gzip$1;
  var constants$1 = constants$2;
  var deflate_1$1 = {
    Deflate: Deflate_1$1,
    deflate: deflate_2,
    deflateRaw: deflateRaw_1$1,
    gzip: gzip_1$1,
    constants: constants$1
  };
  var BAD$1 = 16209;
  var TYPE$1 = 16191;
  var inffast = function inflate_fast(strm, start) {
    let _in;
    let last;
    let _out;
    let beg;
    let end;
    let dmax;
    let wsize;
    let whave;
    let wnext;
    let s_window;
    let hold;
    let bits;
    let lcode;
    let dcode;
    let lmask;
    let dmask;
    let here;
    let op;
    let len;
    let dist;
    let from;
    let from_source;
    let input, output2;
    const state = strm.state;
    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output2 = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257);
    dmax = state.dmax;
    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    top:
      do {
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = lcode[hold & lmask];
        dolen:
          for (; ; ) {
            op = here >>> 24;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 255;
            if (op === 0) {
              output2[_out++] = here & 65535;
            } else if (op & 16) {
              len = here & 65535;
              op &= 15;
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & (1 << op) - 1;
                hold >>>= op;
                bits -= op;
              }
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
              dodist:
                for (; ; ) {
                  op = here >>> 24;
                  hold >>>= op;
                  bits -= op;
                  op = here >>> 16 & 255;
                  if (op & 16) {
                    dist = here & 65535;
                    op &= 15;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                      }
                    }
                    dist += hold & (1 << op) - 1;
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD$1;
                      break top;
                    }
                    hold >>>= op;
                    bits -= op;
                    op = _out - beg;
                    if (dist > op) {
                      op = dist - op;
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD$1;
                          break top;
                        }
                      }
                      from = 0;
                      from_source = s_window;
                      if (wnext === 0) {
                        from += wsize - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output2[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output2;
                        }
                      } else if (wnext < op) {
                        from += wsize + wnext - op;
                        op -= wnext;
                        if (op < len) {
                          len -= op;
                          do {
                            output2[_out++] = s_window[from++];
                          } while (--op);
                          from = 0;
                          if (wnext < len) {
                            op = wnext;
                            len -= op;
                            do {
                              output2[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output2;
                          }
                        }
                      } else {
                        from += wnext - op;
                        if (op < len) {
                          len -= op;
                          do {
                            output2[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output2;
                        }
                      }
                      while (len > 2) {
                        output2[_out++] = from_source[from++];
                        output2[_out++] = from_source[from++];
                        output2[_out++] = from_source[from++];
                        len -= 3;
                      }
                      if (len) {
                        output2[_out++] = from_source[from++];
                        if (len > 1) {
                          output2[_out++] = from_source[from++];
                        }
                      }
                    } else {
                      from = _out - dist;
                      do {
                        output2[_out++] = output2[from++];
                        output2[_out++] = output2[from++];
                        output2[_out++] = output2[from++];
                        len -= 3;
                      } while (len > 2);
                      if (len) {
                        output2[_out++] = output2[from++];
                        if (len > 1) {
                          output2[_out++] = output2[from++];
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                    continue dodist;
                  } else {
                    strm.msg = "invalid distance code";
                    state.mode = BAD$1;
                    break top;
                  }
                  break;
                }
            } else if ((op & 64) === 0) {
              here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
              continue dolen;
            } else if (op & 32) {
              state.mode = TYPE$1;
              break top;
            } else {
              strm.msg = "invalid literal/length code";
              state.mode = BAD$1;
              break top;
            }
            break;
          }
      } while (_in < last && _out < end);
    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };
  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592;
  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = new Uint16Array([
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ]);
  var lext = new Uint8Array([
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ]);
  var dbase = new Uint16Array([
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ]);
  var dext = new Uint8Array([
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ]);
  var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
    const bits = opts.bits;
    let len = 0;
    let sym = 0;
    let min = 0, max = 0;
    let root = 0;
    let curr = 0;
    let drop = 0;
    let left = 0;
    let used = 0;
    let huff = 0;
    let incr;
    let fill;
    let low;
    let mask2;
    let next;
    let base = null;
    let match;
    const count = new Uint16Array(MAXBITS + 1);
    const offs = new Uint16Array(MAXBITS + 1);
    let extra = null;
    let here_bits, here_op, here_val;
    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }
    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    root = bits;
    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }
    if (root > max) {
      root = max;
    }
    if (max === 0) {
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
    }
    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }
    if (root < min) {
      root = min;
    }
    left = 1;
    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];
      if (left < 0) {
        return -1;
      }
    }
    if (left > 0 && (type === CODES$1 || max !== 1)) {
      return -1;
    }
    offs[1] = 0;
    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    if (type === CODES$1) {
      base = extra = work;
      match = 20;
    } else if (type === LENS$1) {
      base = lbase;
      extra = lext;
      match = 257;
    } else {
      base = dbase;
      extra = dext;
      match = 0;
    }
    huff = 0;
    sym = 0;
    len = min;
    next = table_index;
    curr = root;
    drop = 0;
    low = -1;
    used = 1 << root;
    mask2 = used - 1;
    if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    for (; ; ) {
      here_bits = len - drop;
      if (work[sym] + 1 < match) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] >= match) {
        here_op = extra[work[sym] - match];
        here_val = base[work[sym] - match];
      } else {
        here_op = 32 + 64;
        here_val = 0;
      }
      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      incr = 1 << len - 1;
      while (huff & incr) {
        incr >>= 1;
      }
      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      sym++;
      if (--count[len] === 0) {
        if (len === max) {
          break;
        }
        len = lens[lens_index + work[sym]];
      }
      if (len > root && (huff & mask2) !== low) {
        if (drop === 0) {
          drop = root;
        }
        next += min;
        curr = len - drop;
        left = 1 << curr;
        while (curr + drop < max) {
          left -= count[curr + drop];
          if (left <= 0) {
            break;
          }
          curr++;
          left <<= 1;
        }
        used += 1 << curr;
        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        low = huff & mask2;
        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    if (huff !== 0) {
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    opts.bits = root;
    return 0;
  };
  var inftrees = inflate_table;
  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  var {
    Z_FINISH: Z_FINISH$1,
    Z_BLOCK,
    Z_TREES,
    Z_OK: Z_OK$1,
    Z_STREAM_END: Z_STREAM_END$1,
    Z_NEED_DICT: Z_NEED_DICT$1,
    Z_STREAM_ERROR: Z_STREAM_ERROR$1,
    Z_DATA_ERROR: Z_DATA_ERROR$1,
    Z_MEM_ERROR: Z_MEM_ERROR$1,
    Z_BUF_ERROR,
    Z_DEFLATED
  } = constants$2;
  var HEAD = 16180;
  var FLAGS = 16181;
  var TIME = 16182;
  var OS = 16183;
  var EXLEN = 16184;
  var EXTRA = 16185;
  var NAME = 16186;
  var COMMENT = 16187;
  var HCRC = 16188;
  var DICTID = 16189;
  var DICT = 16190;
  var TYPE = 16191;
  var TYPEDO = 16192;
  var STORED = 16193;
  var COPY_ = 16194;
  var COPY = 16195;
  var TABLE = 16196;
  var LENLENS = 16197;
  var CODELENS = 16198;
  var LEN_ = 16199;
  var LEN = 16200;
  var LENEXT = 16201;
  var DIST = 16202;
  var DISTEXT = 16203;
  var MATCH = 16204;
  var LIT = 16205;
  var CHECK = 16206;
  var LENGTH = 16207;
  var DONE = 16208;
  var BAD = 16209;
  var MEM = 16210;
  var SYNC = 16211;
  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592;
  var MAX_WBITS = 15;
  var DEF_WBITS = MAX_WBITS;
  var zswap32 = (q) => {
    return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
  };
  function InflateState() {
    this.strm = null;
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new Uint16Array(320);
    this.work = new Uint16Array(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
  }
  var inflateStateCheck = (strm) => {
    if (!strm) {
      return 1;
    }
    const state = strm.state;
    if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
      return 1;
    }
    return 0;
  };
  var inflateResetKeep = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = "";
    if (state.wrap) {
      strm.adler = state.wrap & 1;
    }
    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.flags = -1;
    state.dmax = 32768;
    state.head = null;
    state.hold = 0;
    state.bits = 0;
    state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
    state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1;
    return Z_OK$1;
  };
  var inflateReset = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  };
  var inflateReset2 = (strm, windowBits) => {
    let wrap;
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 5;
      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }
    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  };
  var inflateInit2 = (strm, windowBits) => {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    }
    const state = new InflateState();
    strm.state = state;
    state.strm = strm;
    state.window = null;
    state.mode = HEAD;
    const ret = inflateReset2(strm, windowBits);
    if (ret !== Z_OK$1) {
      strm.state = null;
    }
    return ret;
  };
  var inflateInit = (strm) => {
    return inflateInit2(strm, DEF_WBITS);
  };
  var virgin = true;
  var lenfix;
  var distfix;
  var fixedtables = (state) => {
    if (virgin) {
      lenfix = new Int32Array(512);
      distfix = new Int32Array(32);
      let sym = 0;
      while (sym < 144) {
        state.lens[sym++] = 8;
      }
      while (sym < 256) {
        state.lens[sym++] = 9;
      }
      while (sym < 280) {
        state.lens[sym++] = 7;
      }
      while (sym < 288) {
        state.lens[sym++] = 8;
      }
      inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
      sym = 0;
      while (sym < 32) {
        state.lens[sym++] = 5;
      }
      inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
      virgin = false;
    }
    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  };
  var updatewindow = (strm, src, end, copy) => {
    let dist;
    const state = strm.state;
    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new Uint8Array(state.wsize);
    }
    if (copy >= state.wsize) {
      state.window.set(src.subarray(end - state.wsize, end), 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;
      if (dist > copy) {
        dist = copy;
      }
      state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
      copy -= dist;
      if (copy) {
        state.window.set(src.subarray(end - copy, end), 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;
        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }
        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }
    return 0;
  };
  var inflate$2 = (strm, flush) => {
    let state;
    let input, output2;
    let next;
    let put;
    let have, left;
    let hold;
    let bits;
    let _in, _out;
    let copy;
    let from;
    let from_source;
    let here = 0;
    let here_bits, here_op, here_val;
    let last_bits, last_op, last_val;
    let len;
    let ret;
    const hbuf = new Uint8Array(4);
    let opts;
    let n;
    const order = (
      /* permutation of code lengths */
      new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
    );
    if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    put = strm.next_out;
    output2 = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits;
    _in = have;
    _out = left;
    ret = Z_OK$1;
    inf_leave:
      for (; ; ) {
        switch (state.mode) {
          case HEAD:
            if (state.wrap === 0) {
              state.mode = TYPEDO;
              break;
            }
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 2 && hold === 35615) {
              if (state.wbits === 0) {
                state.wbits = 15;
              }
              state.check = 0;
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
              hold = 0;
              bits = 0;
              state.mode = FLAGS;
              break;
            }
            if (state.head) {
              state.head.done = false;
            }
            if (!(state.wrap & 1) || /* check if zlib header allowed */
            (((hold & 255) << 8) + (hold >> 8)) % 31) {
              strm.msg = "incorrect header check";
              state.mode = BAD;
              break;
            }
            if ((hold & 15) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            hold >>>= 4;
            bits -= 4;
            len = (hold & 15) + 8;
            if (state.wbits === 0) {
              state.wbits = len;
            }
            if (len > 15 || len > state.wbits) {
              strm.msg = "invalid window size";
              state.mode = BAD;
              break;
            }
            state.dmax = 1 << state.wbits;
            state.flags = 0;
            strm.adler = state.check = 1;
            state.mode = hold & 512 ? DICTID : TYPE;
            hold = 0;
            bits = 0;
            break;
          case FLAGS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.flags = hold;
            if ((state.flags & 255) !== Z_DEFLATED) {
              strm.msg = "unknown compression method";
              state.mode = BAD;
              break;
            }
            if (state.flags & 57344) {
              strm.msg = "unknown header flags set";
              state.mode = BAD;
              break;
            }
            if (state.head) {
              state.head.text = hold >> 8 & 1;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = TIME;
          case TIME:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.time = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              hbuf[2] = hold >>> 16 & 255;
              hbuf[3] = hold >>> 24 & 255;
              state.check = crc32_1(state.check, hbuf, 4, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = OS;
          case OS:
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.head) {
              state.head.xflags = hold & 255;
              state.head.os = hold >> 8;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
            state.mode = EXLEN;
          case EXLEN:
            if (state.flags & 1024) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length = hold;
              if (state.head) {
                state.head.extra_len = hold;
              }
              if (state.flags & 512 && state.wrap & 4) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
            } else if (state.head) {
              state.head.extra = null;
            }
            state.mode = EXTRA;
          case EXTRA:
            if (state.flags & 1024) {
              copy = state.length;
              if (copy > have) {
                copy = have;
              }
              if (copy) {
                if (state.head) {
                  len = state.head.extra_len - state.length;
                  if (!state.head.extra) {
                    state.head.extra = new Uint8Array(state.head.extra_len);
                  }
                  state.head.extra.set(
                    input.subarray(
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      next + copy
                    ),
                    /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                    len
                  );
                }
                if (state.flags & 512 && state.wrap & 4) {
                  state.check = crc32_1(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                state.length -= copy;
              }
              if (state.length) {
                break inf_leave;
              }
            }
            state.length = 0;
            state.mode = NAME;
          case NAME:
            if (state.flags & 2048) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.name += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.name = null;
            }
            state.length = 0;
            state.mode = COMMENT;
          case COMMENT:
            if (state.flags & 4096) {
              if (have === 0) {
                break inf_leave;
              }
              copy = 0;
              do {
                len = input[next + copy++];
                if (state.head && len && state.length < 65536) {
                  state.head.comment += String.fromCharCode(len);
                }
              } while (len && copy < have);
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              if (len) {
                break inf_leave;
              }
            } else if (state.head) {
              state.head.comment = null;
            }
            state.mode = HCRC;
          case HCRC:
            if (state.flags & 512) {
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 4 && hold !== (state.check & 65535)) {
                strm.msg = "header crc mismatch";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            if (state.head) {
              state.head.hcrc = state.flags >> 9 & 1;
              state.head.done = true;
            }
            strm.adler = state.check = 0;
            state.mode = TYPE;
            break;
          case DICTID:
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            strm.adler = state.check = zswap32(hold);
            hold = 0;
            bits = 0;
            state.mode = DICT;
          case DICT:
            if (state.havedict === 0) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              return Z_NEED_DICT$1;
            }
            strm.adler = state.check = 1;
            state.mode = TYPE;
          case TYPE:
            if (flush === Z_BLOCK || flush === Z_TREES) {
              break inf_leave;
            }
          case TYPEDO:
            if (state.last) {
              hold >>>= bits & 7;
              bits -= bits & 7;
              state.mode = CHECK;
              break;
            }
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.last = hold & 1;
            hold >>>= 1;
            bits -= 1;
            switch (hold & 3) {
              case 0:
                state.mode = STORED;
                break;
              case 1:
                fixedtables(state);
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  hold >>>= 2;
                  bits -= 2;
                  break inf_leave;
                }
                break;
              case 2:
                state.mode = TABLE;
                break;
              case 3:
                strm.msg = "invalid block type";
                state.mode = BAD;
            }
            hold >>>= 2;
            bits -= 2;
            break;
          case STORED:
            hold >>>= bits & 7;
            bits -= bits & 7;
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
              strm.msg = "invalid stored block lengths";
              state.mode = BAD;
              break;
            }
            state.length = hold & 65535;
            hold = 0;
            bits = 0;
            state.mode = COPY_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case COPY_:
            state.mode = COPY;
          case COPY:
            copy = state.length;
            if (copy) {
              if (copy > have) {
                copy = have;
              }
              if (copy > left) {
                copy = left;
              }
              if (copy === 0) {
                break inf_leave;
              }
              output2.set(input.subarray(next, next + copy), put);
              have -= copy;
              next += copy;
              left -= copy;
              put += copy;
              state.length -= copy;
              break;
            }
            state.mode = TYPE;
            break;
          case TABLE:
            while (bits < 14) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.nlen = (hold & 31) + 257;
            hold >>>= 5;
            bits -= 5;
            state.ndist = (hold & 31) + 1;
            hold >>>= 5;
            bits -= 5;
            state.ncode = (hold & 15) + 4;
            hold >>>= 4;
            bits -= 4;
            if (state.nlen > 286 || state.ndist > 30) {
              strm.msg = "too many length or distance symbols";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = LENLENS;
          case LENLENS:
            while (state.have < state.ncode) {
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.lens[order[state.have++]] = hold & 7;
              hold >>>= 3;
              bits -= 3;
            }
            while (state.have < 19) {
              state.lens[order[state.have++]] = 0;
            }
            state.lencode = state.lendyn;
            state.lenbits = 7;
            opts = { bits: state.lenbits };
            ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid code lengths set";
              state.mode = BAD;
              break;
            }
            state.have = 0;
            state.mode = CODELENS;
          case CODELENS:
            while (state.have < state.nlen + state.ndist) {
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_val < 16) {
                hold >>>= here_bits;
                bits -= here_bits;
                state.lens[state.have++] = here_val;
              } else {
                if (here_val === 16) {
                  n = here_bits + 2;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  if (state.have === 0) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  len = state.lens[state.have - 1];
                  copy = 3 + (hold & 3);
                  hold >>>= 2;
                  bits -= 2;
                } else if (here_val === 17) {
                  n = here_bits + 3;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 3 + (hold & 7);
                  hold >>>= 3;
                  bits -= 3;
                } else {
                  n = here_bits + 7;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  len = 0;
                  copy = 11 + (hold & 127);
                  hold >>>= 7;
                  bits -= 7;
                }
                if (state.have + copy > state.nlen + state.ndist) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                while (copy--) {
                  state.lens[state.have++] = len;
                }
              }
            }
            if (state.mode === BAD) {
              break;
            }
            if (state.lens[256] === 0) {
              strm.msg = "invalid code -- missing end-of-block";
              state.mode = BAD;
              break;
            }
            state.lenbits = 9;
            opts = { bits: state.lenbits };
            ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
            state.lenbits = opts.bits;
            if (ret) {
              strm.msg = "invalid literal/lengths set";
              state.mode = BAD;
              break;
            }
            state.distbits = 6;
            state.distcode = state.distdyn;
            opts = { bits: state.distbits };
            ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
            state.distbits = opts.bits;
            if (ret) {
              strm.msg = "invalid distances set";
              state.mode = BAD;
              break;
            }
            state.mode = LEN_;
            if (flush === Z_TREES) {
              break inf_leave;
            }
          case LEN_:
            state.mode = LEN;
          case LEN:
            if (have >= 6 && left >= 258) {
              strm.next_out = put;
              strm.avail_out = left;
              strm.next_in = next;
              strm.avail_in = have;
              state.hold = hold;
              state.bits = bits;
              inffast(strm, _out);
              put = strm.next_out;
              output2 = strm.output;
              left = strm.avail_out;
              next = strm.next_in;
              input = strm.input;
              have = strm.avail_in;
              hold = state.hold;
              bits = state.bits;
              if (state.mode === TYPE) {
                state.back = -1;
              }
              break;
            }
            state.back = 0;
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_op && (here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            state.length = here_val;
            if (here_op === 0) {
              state.mode = LIT;
              break;
            }
            if (here_op & 32) {
              state.back = -1;
              state.mode = TYPE;
              break;
            }
            if (here_op & 64) {
              strm.msg = "invalid literal/length code";
              state.mode = BAD;
              break;
            }
            state.extra = here_op & 15;
            state.mode = LENEXT;
          case LENEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.length += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            state.was = state.length;
            state.mode = DIST;
          case DIST:
            for (; ; ) {
              here = state.distcode[hold & (1 << state.distbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if ((here_op & 240) === 0) {
              last_bits = here_bits;
              last_op = here_op;
              last_val = here_val;
              for (; ; ) {
                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (last_bits + here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              hold >>>= last_bits;
              bits -= last_bits;
              state.back += last_bits;
            }
            hold >>>= here_bits;
            bits -= here_bits;
            state.back += here_bits;
            if (here_op & 64) {
              strm.msg = "invalid distance code";
              state.mode = BAD;
              break;
            }
            state.offset = here_val;
            state.extra = here_op & 15;
            state.mode = DISTEXT;
          case DISTEXT:
            if (state.extra) {
              n = state.extra;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.offset += hold & (1 << state.extra) - 1;
              hold >>>= state.extra;
              bits -= state.extra;
              state.back += state.extra;
            }
            if (state.offset > state.dmax) {
              strm.msg = "invalid distance too far back";
              state.mode = BAD;
              break;
            }
            state.mode = MATCH;
          case MATCH:
            if (left === 0) {
              break inf_leave;
            }
            copy = _out - left;
            if (state.offset > copy) {
              copy = state.offset - copy;
              if (copy > state.whave) {
                if (state.sane) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
              }
              if (copy > state.wnext) {
                copy -= state.wnext;
                from = state.wsize - copy;
              } else {
                from = state.wnext - copy;
              }
              if (copy > state.length) {
                copy = state.length;
              }
              from_source = state.window;
            } else {
              from_source = output2;
              from = put - state.offset;
              copy = state.length;
            }
            if (copy > left) {
              copy = left;
            }
            left -= copy;
            state.length -= copy;
            do {
              output2[put++] = from_source[from++];
            } while (--copy);
            if (state.length === 0) {
              state.mode = LEN;
            }
            break;
          case LIT:
            if (left === 0) {
              break inf_leave;
            }
            output2[put++] = state.length;
            left--;
            state.mode = LEN;
            break;
          case CHECK:
            if (state.wrap) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold |= input[next++] << bits;
                bits += 8;
              }
              _out -= left;
              strm.total_out += _out;
              state.total += _out;
              if (state.wrap & 4 && _out) {
                strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                state.flags ? crc32_1(state.check, output2, _out, put - _out) : adler32_1(state.check, output2, _out, put - _out);
              }
              _out = left;
              if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
                strm.msg = "incorrect data check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = LENGTH;
          case LENGTH:
            if (state.wrap && state.flags) {
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                strm.msg = "incorrect length check";
                state.mode = BAD;
                break;
              }
              hold = 0;
              bits = 0;
            }
            state.mode = DONE;
          case DONE:
            ret = Z_STREAM_END$1;
            break inf_leave;
          case BAD:
            ret = Z_DATA_ERROR$1;
            break inf_leave;
          case MEM:
            return Z_MEM_ERROR$1;
          case SYNC:
          default:
            return Z_STREAM_ERROR$1;
        }
      }
    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits;
    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
        ;
    }
    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;
    if (state.wrap & 4 && _out) {
      strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
      state.flags ? crc32_1(state.check, output2, _out, strm.next_out - _out) : adler32_1(state.check, output2, _out, strm.next_out - _out);
    }
    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
    if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
      ret = Z_BUF_ERROR;
    }
    return ret;
  };
  var inflateEnd = (strm) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    let state = strm.state;
    if (state.window) {
      state.window = null;
    }
    strm.state = null;
    return Z_OK$1;
  };
  var inflateGetHeader = (strm, head) => {
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    const state = strm.state;
    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR$1;
    }
    state.head = head;
    head.done = false;
    return Z_OK$1;
  };
  var inflateSetDictionary = (strm, dictionary) => {
    const dictLength = dictionary.length;
    let state;
    let dictid;
    let ret;
    if (inflateStateCheck(strm)) {
      return Z_STREAM_ERROR$1;
    }
    state = strm.state;
    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR$1;
    }
    if (state.mode === DICT) {
      dictid = 1;
      dictid = adler32_1(dictid, dictionary, dictLength, 0);
      if (dictid !== state.check) {
        return Z_DATA_ERROR$1;
      }
    }
    ret = updatewindow(strm, dictionary, dictLength, dictLength);
    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR$1;
    }
    state.havedict = 1;
    return Z_OK$1;
  };
  var inflateReset_1 = inflateReset;
  var inflateReset2_1 = inflateReset2;
  var inflateResetKeep_1 = inflateResetKeep;
  var inflateInit_1 = inflateInit;
  var inflateInit2_1 = inflateInit2;
  var inflate_2$1 = inflate$2;
  var inflateEnd_1 = inflateEnd;
  var inflateGetHeader_1 = inflateGetHeader;
  var inflateSetDictionary_1 = inflateSetDictionary;
  var inflateInfo = "pako inflate (from Nodeca project)";
  var inflate_1$2 = {
    inflateReset: inflateReset_1,
    inflateReset2: inflateReset2_1,
    inflateResetKeep: inflateResetKeep_1,
    inflateInit: inflateInit_1,
    inflateInit2: inflateInit2_1,
    inflate: inflate_2$1,
    inflateEnd: inflateEnd_1,
    inflateGetHeader: inflateGetHeader_1,
    inflateSetDictionary: inflateSetDictionary_1,
    inflateInfo
  };
  function GZheader() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
  }
  var gzheader = GZheader;
  var toString = Object.prototype.toString;
  var {
    Z_NO_FLUSH,
    Z_FINISH,
    Z_OK,
    Z_STREAM_END,
    Z_NEED_DICT,
    Z_STREAM_ERROR,
    Z_DATA_ERROR,
    Z_MEM_ERROR
  } = constants$2;
  function Inflate$1(options) {
    this.options = common.assign({
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ""
    }, options || {});
    const opt = this.options;
    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;
      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    }
    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    }
    if (opt.windowBits > 15 && opt.windowBits < 48) {
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }
    this.err = 0;
    this.msg = "";
    this.ended = false;
    this.chunks = [];
    this.strm = new zstream();
    this.strm.avail_out = 0;
    let status = inflate_1$2.inflateInit2(
      this.strm,
      opt.windowBits
    );
    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }
    this.header = new gzheader();
    inflate_1$2.inflateGetHeader(this.strm, this.header);
    if (opt.dictionary) {
      if (typeof opt.dictionary === "string") {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }
      if (opt.raw) {
        status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  Inflate$1.prototype.push = function(data, flush_mode) {
    const strm = this.strm;
    const chunkSize = this.options.chunkSize;
    const dictionary = this.options.dictionary;
    let status, _flush_mode, last_avail_out;
    if (this.ended)
      return false;
    if (flush_mode === ~~flush_mode)
      _flush_mode = flush_mode;
    else
      _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
    if (toString.call(data) === "[object ArrayBuffer]") {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }
    strm.next_in = 0;
    strm.avail_in = strm.input.length;
    for (; ; ) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }
      status = inflate_1$2.inflate(strm, _flush_mode);
      if (status === Z_NEED_DICT && dictionary) {
        status = inflate_1$2.inflateSetDictionary(strm, dictionary);
        if (status === Z_OK) {
          status = inflate_1$2.inflate(strm, _flush_mode);
        } else if (status === Z_DATA_ERROR) {
          status = Z_NEED_DICT;
        }
      }
      while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
        inflate_1$2.inflateReset(strm);
        status = inflate_1$2.inflate(strm, _flush_mode);
      }
      switch (status) {
        case Z_STREAM_ERROR:
        case Z_DATA_ERROR:
        case Z_NEED_DICT:
        case Z_MEM_ERROR:
          this.onEnd(status);
          this.ended = true;
          return false;
      }
      last_avail_out = strm.avail_out;
      if (strm.next_out) {
        if (strm.avail_out === 0 || status === Z_STREAM_END) {
          if (this.options.to === "string") {
            let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            let tail = strm.next_out - next_out_utf8;
            let utf8str = strings.buf2string(strm.output, next_out_utf8);
            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail)
              strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
            this.onData(utf8str);
          } else {
            this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
          }
        }
      }
      if (status === Z_OK && last_avail_out === 0)
        continue;
      if (status === Z_STREAM_END) {
        status = inflate_1$2.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return true;
      }
      if (strm.avail_in === 0)
        break;
    }
    return true;
  };
  Inflate$1.prototype.onData = function(chunk) {
    this.chunks.push(chunk);
  };
  Inflate$1.prototype.onEnd = function(status) {
    if (status === Z_OK) {
      if (this.options.to === "string") {
        this.result = this.chunks.join("");
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }
    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  function inflate$1(input, options) {
    const inflator = new Inflate$1(options);
    inflator.push(input);
    if (inflator.err)
      throw inflator.msg || messages[inflator.err];
    return inflator.result;
  }
  function inflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  var Inflate_1$1 = Inflate$1;
  var inflate_2 = inflate$1;
  var inflateRaw_1$1 = inflateRaw$1;
  var ungzip$1 = inflate$1;
  var constants = constants$2;
  var inflate_1$1 = {
    Inflate: Inflate_1$1,
    inflate: inflate_2,
    inflateRaw: inflateRaw_1$1,
    ungzip: ungzip$1,
    constants
  };
  var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
  var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
  var gzip_1 = gzip;
  var ungzip_1 = ungzip;

  // node_modules/starknet/dist/index.mjs
  var import_isomorphic_fetch = __toESM(require_fetch_npm_browserify(), 1);
  var import_url_join = __toESM(require_url_join(), 1);
  var import_url_join2 = __toESM(require_url_join(), 1);
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var constants_exports = {};
  __export2(constants_exports, {
    ALPHA: () => ALPHA,
    API_VERSION: () => API_VERSION,
    BETA: () => BETA,
    BaseUrl: () => BaseUrl,
    CONSTANT_POINTS: () => CONSTANT_POINTS,
    EC_ORDER: () => EC_ORDER,
    FIELD_GEN: () => FIELD_GEN,
    FIELD_PRIME: () => FIELD_PRIME,
    FIELD_SIZE: () => FIELD_SIZE,
    HEX_STR_TRANSACTION_VERSION_1: () => HEX_STR_TRANSACTION_VERSION_1,
    HEX_STR_TRANSACTION_VERSION_2: () => HEX_STR_TRANSACTION_VERSION_2,
    IS_BROWSER: () => IS_BROWSER,
    MASK_250: () => MASK_2502,
    MASK_251: () => MASK_251,
    MAX_ECDSA_VAL: () => MAX_ECDSA_VAL,
    NetworkName: () => NetworkName,
    StarknetChainId: () => StarknetChainId,
    TransactionHashPrefix: () => TransactionHashPrefix,
    UDC: () => UDC,
    ZERO: () => ZERO
  });
  var encode_exports = {};
  __export2(encode_exports, {
    IS_BROWSER: () => IS_BROWSER,
    addHexPrefix: () => addHexPrefix,
    arrayBufferToString: () => arrayBufferToString,
    atobUniversal: () => atobUniversal,
    btoaUniversal: () => btoaUniversal,
    buf2hex: () => buf2hex,
    calcByteLength: () => calcByteLength,
    padLeft: () => padLeft,
    pascalToSnake: () => pascalToSnake,
    removeHexPrefix: () => removeHexPrefix,
    sanitizeBytes: () => sanitizeBytes,
    sanitizeHex: () => sanitizeHex,
    stringToArrayBuffer: () => stringToArrayBuffer,
    utf8ToArray: () => utf8ToArray
  });
  var IS_BROWSER = typeof window !== "undefined";
  var STRING_ZERO = "0";
  function arrayBufferToString(array) {
    return new Uint8Array(array).reduce((data, byte) => data + String.fromCharCode(byte), "");
  }
  function stringToArrayBuffer(s) {
    return Uint8Array.from(s, (c) => c.charCodeAt(0));
  }
  function atobUniversal(a) {
    return IS_BROWSER ? stringToArrayBuffer(atob(a)) : Buffer.from(a, "base64");
  }
  function btoaUniversal(b) {
    return IS_BROWSER ? btoa(arrayBufferToString(b)) : Buffer.from(b).toString("base64");
  }
  function buf2hex(buffer) {
    return [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  function removeHexPrefix(hex) {
    return hex.replace(/^0x/i, "");
  }
  function addHexPrefix(hex) {
    return `0x${removeHexPrefix(hex)}`;
  }
  function padString(str, length, left, padding = STRING_ZERO) {
    const diff = length - str.length;
    let result = str;
    if (diff > 0) {
      const pad = padding.repeat(diff);
      result = left ? pad + str : str + pad;
    }
    return result;
  }
  function padLeft(str, length, padding = STRING_ZERO) {
    return padString(str, length, true, padding);
  }
  function calcByteLength(length, byteSize = 8) {
    const remainder = length % byteSize;
    return remainder ? (length - remainder) / byteSize * byteSize + byteSize : length;
  }
  function sanitizeBytes(str, byteSize = 8, padding = STRING_ZERO) {
    return padLeft(str, calcByteLength(str.length, byteSize), padding);
  }
  function sanitizeHex(hex) {
    hex = removeHexPrefix(hex);
    hex = sanitizeBytes(hex, 2);
    if (hex) {
      hex = addHexPrefix(hex);
    }
    return hex;
  }
  function utf8ToArray(str) {
    return new TextEncoder().encode(str);
  }
  var pascalToSnake = (text) => /[a-z]/.test(text) ? text.split(/(?=[A-Z])/).join("_").toUpperCase() : text;
  var HEX_STR_TRANSACTION_VERSION_1 = "0x1";
  var HEX_STR_TRANSACTION_VERSION_2 = "0x2";
  var ZERO = 0n;
  var MASK_2502 = 2n ** 250n - 1n;
  var MASK_251 = 2n ** 251n;
  var API_VERSION = ZERO;
  var BaseUrl = /* @__PURE__ */ ((BaseUrl2) => {
    BaseUrl2["SN_MAIN"] = "https://alpha-mainnet.starknet.io";
    BaseUrl2["SN_GOERLI"] = "https://alpha4.starknet.io";
    BaseUrl2["SN_GOERLI2"] = "https://alpha4-2.starknet.io";
    return BaseUrl2;
  })(BaseUrl || {});
  var NetworkName = /* @__PURE__ */ ((NetworkName2) => {
    NetworkName2["SN_MAIN"] = "SN_MAIN";
    NetworkName2["SN_GOERLI"] = "SN_GOERLI";
    NetworkName2["SN_GOERLI2"] = "SN_GOERLI2";
    return NetworkName2;
  })(NetworkName || {});
  var StarknetChainId = /* @__PURE__ */ ((StarknetChainId4) => {
    StarknetChainId4["SN_MAIN"] = "0x534e5f4d41494e";
    StarknetChainId4["SN_GOERLI"] = "0x534e5f474f45524c49";
    StarknetChainId4["SN_GOERLI2"] = "0x534e5f474f45524c4932";
    return StarknetChainId4;
  })(StarknetChainId || {});
  var TransactionHashPrefix = /* @__PURE__ */ ((TransactionHashPrefix2) => {
    TransactionHashPrefix2["DECLARE"] = "0x6465636c617265";
    TransactionHashPrefix2["DEPLOY"] = "0x6465706c6f79";
    TransactionHashPrefix2["DEPLOY_ACCOUNT"] = "0x6465706c6f795f6163636f756e74";
    TransactionHashPrefix2["INVOKE"] = "0x696e766f6b65";
    TransactionHashPrefix2["L1_HANDLER"] = "0x6c315f68616e646c6572";
    return TransactionHashPrefix2;
  })(TransactionHashPrefix || {});
  var UDC = {
    ADDRESS: "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
    ENTRYPOINT: "deployContract"
  };
  var FIELD_PRIME = "800000000000011000000000000000000000000000000000000000000000001";
  var FIELD_GEN = "3";
  var FIELD_SIZE = 251;
  var EC_ORDER = "800000000000010FFFFFFFFFFFFFFFFB781126DCAE7B2321E66A241ADC64D2F";
  var ALPHA = "1";
  var BETA = "6F21413EFBE40DE150E596D72F7A8C5609AD26C15C915C1F4CDFCB99CEE9E89";
  var MAX_ECDSA_VAL = "800000000000000000000000000000000000000000000000000000000000000";
  var CONSTANT_POINTS = [
    [
      "49ee3eba8c1600700ee1b87eb599f16716b0b1022947733551fde4050ca6804",
      "3ca0cfe4b3bc6ddf346d49d06ea0ed34e621062c0e056c1d0405d266e10268a"
    ],
    [
      "1ef15c18599971b7beced415a40f0c7deacfd9b0d1819e03d723d8bc943cfca",
      "5668060aa49730b7be4801df46ec62de53ecd11abe43a32873000c36e8dc1f"
    ],
    [
      "234287dcbaffe7f969c748655fca9e58fa8120b6d56eb0c1080d17957ebe47b",
      "3b056f100f96fb21e889527d41f4e39940135dd7a6c94cc6ed0268ee89e5615"
    ],
    [
      "3909690e1123c80678a7ba0fde0e8447f6f02b3f6b960034d1e93524f8b476",
      "7122e9063d239d89d4e336753845b76f2b33ca0d7f0c1acd4b9fe974994cc19"
    ],
    [
      "40fd002e38ea01a01b2702eb7c643e9decc2894cbf31765922e281939ab542c",
      "109f720a79e2a41471f054ca885efd90c8cfbbec37991d1b6343991e0a3e740"
    ],
    [
      "2f52066635c139fc2f64eb0bd5e3fd7a705f576854ec4f00aa60361fddb981b",
      "6d78a24d8a5f97fc600318ce16b3c840315979c3273078ec1a285f217ee6a26"
    ],
    [
      "6a0767a1fd60d5b9027a35af1b68e57a1c366ebcde2006cdd07af27043ef674",
      "606b72c0ca0498b8c1817ed7922d550894c324f5efdfc85a19a1ae382411ca2"
    ],
    [
      "7fa463ee2a2d6a585d5c3358918270f6c28c66df1f86803374d1edf3819cc62",
      "a996edf01598832e644e1cae9a37288865ad80e2787f9bf958aceccc99afae"
    ],
    [
      "3d4da70d1540da597dbae1651d28487604a4e66a4a1823b97e8e9639393dbec",
      "45cdef70c35d3b6f0a2273a9886ccb6306d813e8204bdfd30b4efee63c8a3f9"
    ],
    [
      "1e448fdbcd9896c6fbf5f36cb7e7fcb77a751ff2d942593cae023363cc7750e",
      "30c81da0f3a8cb64468eaa491c7ae7b4842b62cb4148820da211afc4caffb3a"
    ],
    [
      "6531acf1a7cb90a4eb27de0b7f915e387a3b0fd063ba6e1289b91f48411be26",
      "31330f5daa091889981a3ea782ae997f5f171336ed0487a03f051551a2cafa2"
    ],
    [
      "54be016394d5662d67d7e82f5e889ed2f97ccf95d911f57dd2362c4040ed4f4",
      "c6cb184053f054d6a59c1bf0986d17090d25089b3fdcdaf185edc87ef113e5"
    ],
    [
      "35b9ecd0499ca1d5d42dcbb0c6b4042b3733c64b607ca711e706e786ef2afc6",
      "5624b476a5b21c3a544f0712d4817b06ad380a5a6529d323bf64da8ef862d8d"
    ],
    [
      "4ce0378e3ee8f77ed58f2ddbd8bb7676c8a38bfb1d3694c275254bd8ca38e23",
      "5a16fcbff0769c9cf2b02c31621878ec819fff4b8231bff82c6183db2746820"
    ],
    [
      "648d5c6f98680a1b926bfeb01c00224c56fdcf751b251c4449c8a94f425cfcf",
      "72c05ac793cd1620a833fbe2214d36900ebe446e095c62fcb740937f98cca8c"
    ],
    [
      "bd09be3e4e1af8a14189977e334f097c18e4a8bf42577ef5aafa0f807bd89b",
      "6e0e72ed7eb65c86cee29c411fb4761122558ee81013344ba8509c49de9f9b6"
    ],
    [
      "35ea4e339b44ae7724419bdfbe07022253137a4afb7cbaffad341ea61249357",
      "3665d676a026a174f367bb4417780e53a7803cb02d0db32eb4545c267c42f14"
    ],
    [
      "36457bc744f42e697b825c2d1afd8f4029d696a4514710f81da52d88e178643",
      "7c93715896735492a68c7969a024b3a8fd538bffc1521538107de1a5f13ce9c"
    ],
    [
      "5b3a08ebcf9c109cc9082f70d9df2b9c11b5428ee23917b4e790c4c10f6e661",
      "9d7b42ab0c20f5510df7ea5e196eec99342739077e9a168198c89da859753"
    ],
    [
      "21883ef8580fc06e59481955d52ece3aca6e82c8c9fc58e216dcf46f96990c6",
      "51a6423543e6e8a43e71da34cd90f5b520b8d33b67c4bf857573ab9e301aa4c"
    ],
    [
      "19e86b77f9b581e81092b305c852faf53940a8f15f0a6990c414f04c0fa7ef9",
      "515630e35d4398c9c79fc4ee08e1023fa47d8e03c6e7819c6d2ccef45398fa"
    ],
    [
      "888ab8eb4c31bb2ac5b54aa320dbe1a69c96b864e8a5f54d89c1d1a6b86c24",
      "730e148467f6a55ce22c5296f5380df88f38de76ef0b2de844cd3094aaaf3ea"
    ],
    [
      "75e79ff13a894e7120dac17b7429c0c32ce7828f726c9973728c0977a5f5977",
      "4960526e59c1c736561a201bc56f7d762641b39f609d273cc996f5d9197cfb8"
    ],
    [
      "640fe009249115d7254f72ecafb3006139e4bed7e9041af51458c737282d1d5",
      "3cc6c978a575246e2ce4f7ef1fcc7f63085db9ff98a1b1f3fe374087c0332c"
    ],
    [
      "6d6fd09ccab7c26de9b3906191235deb5c34685580c488275356a05e209ca96",
      "7157f81a34213dd8f91dea4f6df1bcfabc4ee091a3049eeeb3b7923d39b8645"
    ],
    [
      "5531ca1d00f151d71da820918f74caf2985b24dca20e124721fff507b5a5876",
      "518529643d3f25e47f72c322223ba60a63d6bfe78cf3f612215d9c19bf29200"
    ],
    [
      "6192d454e4f8fe212bdfccd5b15dd5056d7622ffe456c6c67e5a7265aea49c4",
      "2377a45dc630017ae863cb968ddb38333a70c7946d8684e6d7a6213f634b7bc"
    ],
    [
      "542fb44b4ef3640a64fdb22a2560fb26668065c069cf31d1df424819a39ff18",
      "5dbae9b0948e0361aea443503840341c322aa1a1366ce5390e71bf161f78f8c"
    ],
    [
      "299ff3e3412a7eb4cb4a3051b07b1be2e7b1c4b789f39ffb52cba3d048b71de",
      "1951d3175c02761b291d86b6c0a08387ad5e2a2130ccc33c852530572cb3958"
    ],
    [
      "628ce3f5367dadc1411133e55eb25e2e3c2880d6e28754a5cb1c5d109627e73",
      "ae3e9b7d50964e28bd15380400b7659b87affdef5d2586cbefcd9be7d67c0d"
    ],
    [
      "6ea54aff064895eccf9db2283225d62044ae67621192b3346338948382f5933",
      "6431507e51aadacfaf39f102a8ff387756e9b5e1bc8323d44acae55130d93db"
    ],
    [
      "28097d50d175a6235320fe8cfe138dd9e46895d189582e472c38ad7a67d923a",
      "7f9eab4133d7d09a7ff63368d6135c26262b62336eca1b5ca33f2096ce388ba"
    ],
    [
      "619fd09cdd6ff4323973f256c2cbdcb224f7f25b8aef623af2d4a0105e62e02",
      "2c95f0ae11d47eeae1bc7f1350f75f9185c5bc840382ceb38a797cae9c40308"
    ],
    [
      "641c18982ced304512a3f2395942a38add0d6a7156229c2a7c8b8dfbe9beb96",
      "6f6288c9c659b6af5ac975f4180deffe53d516399b2cc62f31732e9d4ba9837"
    ],
    [
      "58ab546e51fe49fc5a382e4064a2bd6cfc268904412f86c26de14f28a71d0f2",
      "124b7217943e7e328408e8afdfa7da00dcbc94a2bb85fd8e01fb162d2c2c0a9"
    ],
    [
      "a82c2fdedbb26c3c762a12f7e86b0e01e65320e0a25a8399d665f6e266bf74",
      "1a1de28e253f3e10f44d0111e8074f882d7f42e5900780ccbdc31da372d3fd8"
    ],
    [
      "744c725a7455a992e3cf5bd007bc234dd4668dba285f553f38350ad94c1615b",
      "7f721a87f48798bdc4a9c0eb88559e2ad7a74112fd901e70ea159e67a9c33f"
    ],
    [
      "434df142ddaa60f7881b6348d91687de40457de7ccfb07f0304b9e820705d0c",
      "7fae425e3b53f97dd1f5b20e49ed9fe24ff1efc341ba5e017ac89cf8df0cc39"
    ],
    [
      "7a1e2b809dff46277021cbc376f79c37e1b683bbd6bca5317014f0dc0e1ae73",
      "56790278a231912c334eff05281e08af1558e85516b4411ef64647c13bea431"
    ],
    [
      "4931b7990348d41cf8907be79f45bb7991fd18f8a57868351c92fa7a34cbcd7",
      "ca35091815cdf0837d396e25aad6052ad32d497a33b123256cffdc008bc50e"
    ],
    [
      "250b815d352fd89f8210b624b147ea7d0a4f47bcac49f3ac9b777840da93ebe",
      "1173f10e9691948b7da7632f328520455aadcba46e017f891e0a1d7da2bef04"
    ],
    [
      "2223b85032fa67292f6e1f822628e6756e5c3cc08fc252ab88d63d624e4dfb2",
      "55619ba96a7dcec77832fcb22cd5c21c7dcebc0280d730cba0002b67e0a8c63"
    ],
    [
      "249b131e04de73af9820d3e22492d9ec51bdc0c4c4f34d95352fa44dd61f245",
      "7576d3b5d136368ff01170a77d8286d0d1c7c40688862fb40813b4af3c6065e"
    ],
    [
      "6777915d9b4769027eb7e04733f8a2d669c84fe06080f55e8a55674dfbf9efb",
      "640d0ff384c9635e1af364760f104e058e3c86209fa9d2320aeac887b2e02d8"
    ],
    [
      "2abe3f237681052f002414399111cf07f8421535af41251edc427a36b5b19c9",
      "636ce4deaf468a503ab20ccb2f7e5bdc98551656ebf53e9c7786b11dd9090be"
    ],
    [
      "4d5cc5414758ea1be55be779bd7da296c7e11f1564d9e8797ceea347c16f8ea",
      "1a680c4c410cf5ddc74e95ff2897c193edaaecce5b2cde4e96bbae5c0054eff"
    ],
    [
      "46c375c684b30adf4d51de81e92afee52b1a3847e177403372c82109373edca",
      "1eaadc5783c90a0261306423d52009e991126b3f620e9cb6cffca41ca096f4f"
    ],
    [
      "2ddfb71f51205888118cbabba8fd07d460a810289bfdeeb7118707e310cb152",
      "1fd905d07b3933be886f2518246bdafa6f33259a174668808223cd7c28183c7"
    ],
    [
      "386f3879960713d41fdb3b1e41bbebf26b1c0e27a9a75bb1adcc1a0d3e8547b",
      "2b21498c0f34ec6f17c720334dc0f36021c2f87afbbbc8847d0bd536eb265e5"
    ],
    [
      "407eae62c6c4de3b942195afec3f45efec71ddb5e6edee3d427631bcdbf9b90",
      "436e7f2d78268ef62c4172d2ff1469028bad1f1d0f97ab007064418e61caa8f"
    ],
    [
      "1b881175e21201d17e095e9b3966b354f47de8c1acee5177f5909e0fd72328f",
      "69954b1a9b8bfccf8ec384d32924518a935758f3d3662ef754bcc88f1f6f3ec"
    ],
    [
      "7d545a82bff003b8115be32a0c437f7c0a98f776bcf7fddb0392822844f3c5e",
      "34b6e53a9565a7daa010711f5bf72254a4e61da3e6a562210a9abc9e8b66d69"
    ],
    [
      "299b9fcd4fadfc4b6141457a3036aaa68501c23df579de26df69d4def89b913",
      "b95bf2c2bb303c38bb396382edc798ca6a4847e573ce19b7b08533d1912675"
    ],
    [
      "551f5a4dae4a341a3e20336a7d2f365ddd45849351ec6dd4fcbedfe4806d5d5",
      "5865c977a0ecf13ce85ae14c5c316872080bd36f0f614f56b6dfc7ece83792e"
    ],
    [
      "7a1d69c08e68c80ad8b310736e6247a53bcba0183b9b8798833bc696a0fb6e2",
      "3ce803a20ebb3b120d5eaf0ad64bed0522fad1a0f2ce39a5c5cbae98c4438f6"
    ],
    [
      "28acacc0bc41d84e83663f02b36981a2c8272ecd72d3901164be2affb09c504",
      "7a5aee0b160eaff5b5968ab1a0304ce58c3d5ae0148d9191c39e87668229e5b"
    ],
    [
      "1f78cfdbcc767b68e69a224a077468cdfcb0afd6952b85bccbdb96d1fb8500b",
      "4772ba173c6b583284eb001cfc2a124104833f464ff9df096443e10ef3e9dd4"
    ],
    [
      "2774108962ca9897e7f22c064d2ccedac4fef5fc9569331c27cdc336c95774b",
      "9e13d79b68e8dc8091c019618f5b07283a710ddf1733dc674a99fc32c12911"
    ],
    [
      "770d116415cd2c4ace0d8b721dd77e4a2ef766591f9ec9fa0b61304548994ed",
      "42165d93c82f687635aa2b68492b3adffd516beb4baa94520efa11467a209fd"
    ],
    [
      "5e6e4ece6621e2275415e1fda1e7c4f496de498b77c0b913073c6a6099394b9",
      "3d92ce044fc77fa227adc31f6fc17ef8b4ec1c5aafc44630c0d9195075bf56d"
    ],
    [
      "6e69c717b5d98807ff1e404a5187a9ceaf0110b83aa15a84f930928b1171825",
      "1ee7cfc3a9744d7fa380ba28604af9df33ac077724374c04588bd71fa16b177"
    ],
    [
      "404318f2d2ceb44f549c80f9d7de9879d8f7da4b81e7350c00e974ebf2daef1",
      "3934831b5af70d17a3f1da9d2931bd757e6acf2893236264fc7e0d92ff1a1cb"
    ],
    [
      "20dcb6f394fea6d549b2e75748f61b7ec03b6e52319cb14163373a9c22bb9dc",
      "106a8c96cfb95a331618b7416d1498554730499e194a58fbf63019890480fc7"
    ],
    [
      "119000f277ccee013e6bb121194ec1ab5460fb6a96eb702a14079865f4170aa",
      "1737a32f5415e8720a5606ec1dd4756f02e7c6817e3723b453d091f2d192773"
    ],
    [
      "45d0fb5cd95db76d05dec3faa12e467a308eabaad363a062353db3cd2d9b749",
      "ae08691b5b0cdd19ec499132421638f470f493320e4003d123ab1da761b965"
    ],
    [
      "1257b3e65cdfb6367c6d0942327e799bc66eb221e70c6573a9862889eb51c38",
      "593309fd45755dd2cc4afd2b9316bc4638b0c5ddb3009694fcb7b250d0c8a2f"
    ],
    [
      "186dcf9950f72e868014a8accf14aa36e82a7a2a29f86ba37f6632da4189db3",
      "55684c9f7a043fc523ed78f756f834b4db823d5e4161bd79602c17d55a5cd8c"
    ],
    [
      "58791d5569f282f5c3b01ecdc9388df7ba3ca223a2dc1eed5edaf2a1d302fb9",
      "6298d7dd51561a045bb4089deda9f40b2865589ed433e56d54554f8b45e79f0"
    ],
    [
      "13fd87144aa5aa4b24d5a7bf907d8280d15937fed262d41084898cb688fc28b",
      "3fa54367770cc4479a857411ddcabe86627b405ce1cd14ad3b2863bde13abe4"
    ],
    [
      "48118139445415f0c1879224e2dee744ed35280ff00537260402a1741ec3676",
      "4dfa39dadaabecfc54ecb7a25319444f8e952782d863790e42a9887064fc0c1"
    ],
    [
      "4ad031bb9eda84f2fe5d354c7948d41558ca657a04508654721810ee72ef158",
      "620ebd5d0086b92c6009a42777b946a351c2c7ba852b57d3c9905fc337459ef"
    ],
    [
      "4a34abb016ad8cb4575ea5bd28385d2348e5bcc0cbba90059f90f9c71f86e8b",
      "4f781829ad83f9ed1e1b6de0e5f4ac60dfdfe7f23cb4411e815817e705e52c8"
    ],
    [
      "7fc632d7512aab5356b7915dca854c8b12b369ab54f524fbce352f00eb9b9f9",
      "2ce80b944fc9158005f630b34385d50c3ad84450a9e1e529925b3211dd2a1de"
    ],
    [
      "65ed10347503cbc0216ca03f7536cca16b6abd18d332a9258685907f2e5c23f",
      "3be1a18c6bfa6f2f4898ebefad5a8e844c74626d5baa04a820d407fe28bbca6"
    ],
    [
      "1a8abba1be2e276cdd1f28c912280833a5ede1ec121738fcca47dc070dcc71d",
      "21b724378bc029a5199799df005922590d4e59cae52976f8e437bf6693eec4a"
    ],
    [
      "3a99c22dafcfe9004ebb674805736a26aeed7ed5d465ae37226dcbe270a972b",
      "5bf67552af08e1e6e2a24bf562c23225e89869cab9bef8becb3669175a3c94f"
    ],
    [
      "4a6a5e4b3501f2b7bbdd8da73ea81ffca347170bdfb6776a037cdd74c560fb4",
      "5af167ebb259c2da88740ec559ee04052bb66480b836cadd0e2590c32d7111b"
    ],
    [
      "6890d95308525f0bac9dc25cc1189eb92d29d4b3fe61bc8aee1c716ac17b1e8",
      "e6f23f78e882026b53ea4fac6950e56e3da461e52339eb43d2fdb2dade7ca9"
    ],
    [
      "748f4cf4f027efdeaed7c7f91ef3730ff2f2bb0bfc2db8f27aadde947f7d4d5",
      "3a1cbc550699411052c76293b8c41a3a8a1ecf12cbbc029a1b2b6ea986fca93"
    ],
    [
      "7321f3f581690922cd0dec40c9c352aae412ec2ccdf718f137f7786ab452cd3",
      "5be5130c9277cdb76d7409452438ec15d246b211dd1e276ee58e82a81c98fd4"
    ],
    [
      "6c4d6cb7e7ae70955224b8a912ff57ca218635a2436b36cee25dce8a5cdf51f",
      "32f8c03c6db3246946e432e4148e69f5628b200c6d7d72449df6eeac0998039"
    ],
    [
      "1dad5f2e795ea6fa5177f110989516eacf8fb37bd6a091c7c93f1d73a2fe309",
      "56b2298c538180e99dea3e171dbb5c6fba0bd0a9ed40537277c0c2373a8e2c4"
    ],
    [
      "1610605baacc9bc62c4cc923dc943347cfece7ae241e746fbe6c2c878221dbd",
      "431a82d657e0d109d00dea88cf3fa9b999845221b7b5590a20c40fc71368c1c"
    ],
    [
      "6a4f5c787fb09a5be2b04d2eafa1e6f3d3c863ee22960eb0b64f6eaf6659162",
      "14dbc3eaea6146ee7eaace5a91ed9430dad3a47e9ca2f68b455171f8fe6a7b3"
    ],
    [
      "738415b73e55412b0e582e45ff0d7bf4b1bf2922db581783fdcc75559f40e",
      "33825aeb3fd8459999eb418d15102ba5864b069c6ea517f0c6e9eab8d9aca47"
    ],
    [
      "2603e72ce53985c70782774057a17944f7b4ce224a809be4e2b5af3606aa1d8",
      "92822921809c42318f42dac4d773325f41c43069e990adac7818a45e2554dc"
    ],
    [
      "181cd967ab4615357cc96c82eae9152ce7598c1a1dfdd91a458bddb016ae9fe",
      "5d562fdaeb0e12647e230e50eaf216bed52fa73c6b7378821a3bfc4cd66d4ff"
    ],
    [
      "1121726069b9ef5954ba6490100b226e0be53fef3e071b7c58a1286174b789a",
      "4b25594cf4e9eb2d14b3f52f2661a9992234fc222c0a0d44517cb77deb9c16f"
    ],
    [
      "e543663969b915337f105f80995a77b356f1a51d8b4a4fb12d44364130e873",
      "34b2e3c009fdab4cb7349a580df2e64c0098a123280078e5da6623a9ec6b44f"
    ],
    [
      "4e2f8909bb62de5ef65600e61bbf969293815296b6e23702875e049b3ce5c45",
      "3cb81f2c21f22a7add26fa38a9ce5d9cce1bb251bd2698f90c34ff0a84f7af"
    ],
    [
      "37b546e403a1ba970c17b67c2f1361ab9c803f8d2b5cd93803014faa08861ed",
      "37079184ea46272f5809b523d060686633f7995167897a153be1772fd6566f6"
    ],
    [
      "27bddca77f7bd7f66b3693567a4238f2e6751d95b0bcb409f6b24d08f84798c",
      "6417a85cbfd6fc02df560d3963a241a986baacdfa423f65d7227ce49a96c57d"
    ],
    [
      "2de71a39aa043057d1bc66e45f804542acddf18f7a6d88c0d7fb0ca240debdf",
      "306c1ce39ab46300f7cca0f3a2fbfa77296a27e24bc66b0b8044968ec0ee413"
    ],
    [
      "307c877154364c0c03534e7327d5a88e1380ceef6481567ade37a14ee7c1a72",
      "3404bc7dbfb33b95d922d0693aaf9358f77888d7d95e773c38d83dbe2e5f995"
    ],
    [
      "79f09ff7c60850e5f5ea020722659a1ed27db4c95dca131f99552f785c8afbc",
      "40429528c099349b426ddbf129497176951a64a53db5f9d8bd2be0252cb22b2"
    ],
    [
      "4027dc6b56d446e5972f35464eeac85c5254ef377c902d9fe37aea841bb5292",
      "7c3ea37689ef679fa2f5c7e031a78e23d484a8317990fd34d44d95cc1db3717"
    ],
    [
      "645dbf78a3c228c4b7151450b5e65edb58e71f37e1e4bc5f471e0f1abd6d9c2",
      "15cfe7850f327b256e23b00627451560c5c6ab60db78d45b7ab286afb6f13ab"
    ],
    [
      "1503ca373757677ad1d911a2b599d01c46eb879d1ce21ae171c7e439846a85f",
      "583eb269b7030da6a0c324026919de3f9489d2ff6ae0e6320c36f05469ad66c"
    ],
    [
      "66e1819ba3ec4ad4ae9f7d7588d23baa004e29d3aad2393d52af204a81626ca",
      "505249980cbe6273b82ad5038fe04a981896f4117345ac1abcc67e2525c0ee4"
    ],
    [
      "5ec20dbb290254545f9292c0a8e4fbbfb80ad9aab0a0e0e9e9923f784d70ed1",
      "bdb1ca3a859227cf5d00eaae1f22584e826ed83b7ccdb65483ed5213dc4323"
    ],
    [
      "a5c1a5011f4b81c5c01ef0b07c0fbf0a166de77280f0ae241f2db6cba15194",
      "4444521fb9b33d7dfeb1247d0ee1a2b854ad166cb663d9dd2e686909362a689"
    ],
    [
      "1f35335de40e00c62642dac2fda8b30f071986ce4f11db849df11bc45ad4e0c",
      "7801a2c761b90fd4477ba0be9a775003d5dfcd959b1ed198b4681f15e7acbf"
    ],
    [
      "48db4798cf6821c1ffb8178b1d3bb6020e04186c96aaf4670972d367f4ed5f",
      "781019494df95b888f1578f1b4a3f8e125ea60eca47ef9207a10630671217a3"
    ],
    [
      "17f653d904210148a8e74d8e719a3061683c164aa6d79c902a19f185ab437bd",
      "6780e97985932c3860d810af1e065d454b1cb4be0e7ffe2d8cea7d52526e223"
    ],
    [
      "5c4d0c7432f9b0070436240f9855adae1467cdc9826952ae01b68cd52a3ad89",
      "1c5747f968ed91261b7ae9bf1023c999da9816e37de602d6a1a50d397752bff"
    ],
    [
      "6fedd7639fdaa2f7bad4ca0b391710f6f8a7e890250ae8ae4252bb8b39a1e58",
      "436a215f655a3fd3778b2335ffdc9aca6b98474e43d764c1f8362830b084f0e"
    ],
    [
      "7fbd45a889c5e9d127bb4f8474d6be7cb9796bbfff923b75e42a1ad4cae37d6",
      "484bd12622a6ba81cd53049c550d9ed682a8e765b656b1cbff9bbea637bd1f4"
    ],
    [
      "17d984d47937263f7966a3e7b1eea04071e678494bd749c9e02b48b3234f06d",
      "7b341ff08722c4e161005d0037204a7a2001fdda7af2cc1a0b04a027f115a0f"
    ],
    [
      "7f1822045db45ea07e1519c3ee1f7705915f35fe4dd8db1e8921b5d1c740edf",
      "33d41e06b93320ad1b3d9580380ec797a05dac3f1cc8008899110ebefde2f78"
    ],
    [
      "7b19453ecb74b7d0e2a66b9890ff73bfbbcd61a266abd6d82dbe665bf32f34d",
      "6dba2355420dac582b1f349609ea1c89b89bba2d1a68a0642f1dd12d86e73cb"
    ],
    [
      "273e82a15f395ddf2489a95685bec8bac62c4b459d1b28987d3cb27e4bc9128",
      "653375b48a4cf5d5b101c9ef533039bedce5dbeef3f59e8f168bdc99b06ca5f"
    ],
    [
      "3006c9e7fc6a553d8eb4e8a47ce9f10d1a39576ac255ae9e0a4ce3869e76212",
      "65fe9e2ef2aae608be309332d464f57e28f1df5de1a6a519751b056971f932e"
    ],
    [
      "5e8f384c8a4607fbe9789fcc52d54249d304d698562597d114c1d81452d3dee",
      "3c8bc78066b5d947dc1e405e326ee55ea606c7988f666748d259850fa259a22"
    ],
    [
      "7841b2102e9aa103fb53a642b3e167b21113ea44751ab38e0b5ef8312654db9",
      "71bf5c8308fcf9c4a7847494cd9bdd946fddf7d3a37e8bb0b201ff2343deb8e"
    ],
    [
      "40f68027420c11e3ade9aae041978dc18081c4f94943463aac92d887f922a62",
      "499c6062594a6c7e21a3cb91ea451813393bff365a27a08f1a515439b83cf42"
    ],
    [
      "6ce77a50d038b222634e87948df0590b79d66087b01e42b9b6d8fa30ebb1465",
      "35f5c46bb1be8555a93f155a174d54ec048c2ac8676e7c743054ddc52709d37"
    ],
    [
      "604f8b9f2dacb13d569262864063c2d4bb2b2cd716db6eeb2b1eeabc57746f6",
      "68c6799e24f3b44eec3049973445174727a66970f1614a782efa2b91ab1e457"
    ],
    [
      "73d620f3bfe77f672943d448d7dc05327adf64b8e7af50039c469d7f7c994c4",
      "4859deb36eaf0c802f0d1514602368143a33ec6ce8fd55248b59025debc6afb"
    ],
    [
      "3fd2bcd1c89d706a3647fbd354097f09c76636e93ae504973f944d8fc3bcc1",
      "677ef842cf5eb2444941f527abec567725e469469192354ad509a26ebb3d0e0"
    ],
    [
      "39222ea924ac17b533c72ffb2c47ffdc11d6a7f7c70fbde3a10fb0b8f35eb2f",
      "20dc4bd1089019bc1d7379b4feb3eae6eb5af59e9f253845da9fd633057e952"
    ],
    [
      "326f58994e1347f62e4102183215b5db956378d2f61f14aba4dec94577f53c",
      "7a03284c296003bbe05178a1d82efdb7b8125511d63e20e50aed789c2e52e1"
    ],
    [
      "53aa8939c74d4ee58f03bc88bace5a45c7bfcf27466201da05dc6723a5f5632",
      "2e32535ca7732904a048183247b04b426ecf9b39fc393a9cebe92fb1dc7a7f1"
    ],
    [
      "6cee1a03145e93b3e826e6067005f09c06099c98198c91c222407ba5c8c132e",
      "beaecad1274e7c6e5476a100c271aa1a6f86ee5a9fa5c2f26124d5886fa63"
    ],
    [
      "3ec659b8175e1be1bd5a252108714776b813e330393f587814f5f1f32a73332",
      "529a5cf9f8c237ae69a94217d173c8d19c156952041f5c980da557990863fa7"
    ],
    [
      "3d66ec5963d0c534d4139c8cef2e1ac48b3e7965fafabf58be26f903318af4e",
      "3d3f2de7a95f59b683725ee6283cbaf31f97c4b600df9a4621413223a468740"
    ],
    [
      "7fb38ace8e0932fac2ea0d3eb676db8d684db1817e2e4d59da7996ce398b4a",
      "68f92bd5768cdd4710249f9d49ef1d5654e497b9a4ba10bd2971366d83fb400"
    ],
    [
      "1c4a49314d6b4969cdd142c76ceb7682bfb868ace7f7568b0fc8635bda5a9fb",
      "5fc0519f1f4cc10b5771312458748c036313b87707ed0540026ac64a5955aa9"
    ],
    [
      "3073c95d08d3b97caea5f0be16b2789bee766f76b7e5499f8ce8f96abb0f344",
      "52a8974b4eb9a1f6a0ae2c83cb4715bf18d73f057255fcb3f63b74f7e78f590"
    ],
    [
      "44485b16d597a5de3604df6f7ed7e00b8aeef9e7e8dea8688255153b8bb16aa",
      "6cccb0ba170123266f24b5d93a744397dc2c44820edc4f8f5b9a0f5c9b3b940"
    ],
    [
      "7618f77b7b32d512688dd62e0b48231d9574c6361e8be353a7dc04f7c3a115e",
      "78ffcd16d80636381ca231aae70d99c9e20298b4f5388fd823ea9fa2b8ddfd9"
    ],
    [
      "7dc82fee1ef95cf5b3720fcc07f63246654bfe39762627839da40e51c75654d",
      "4c0ccdd70955da74558de20c88352df8a02aa97e4d5971c500e884740a8cb62"
    ],
    [
      "7fa5d460dc10cbb418b444d9bde97e92c70a99a222b99f244dccee7e62cc04c",
      "636163901baa5b7576c38c43407af578b8c4607e01e86011ae2dde587a89f84"
    ],
    [
      "758930d46006623a756c89bd0cc378f6a3c1f43c9a0edbb42274c35e75c16d2",
      "1d74dd9f81c2fec811b8cbd6168a745b0a111932b2a345265ef2853b50b6245"
    ],
    [
      "7332ee0626b044d664ef228f8cb84df7c643e52f6a2591ae1c9007ad61ec16e",
      "229bd8e630572cbdee54283234cf3e9f060e6382f99943bf234119d47b54470"
    ],
    [
      "78a16ef803aa20a075bb2f66c61bb2dae5698bebb94a0995fa74c3d53de1614",
      "246d588b68edb6fed96c128349908c42dcd64c46341b205e79f4aed9b5d3675"
    ],
    [
      "6e1933939bd03b67bba753cc0cbe7d2f25bad68c993887ef8c9e2fcd59b0647",
      "599413f7c204a11a5ce315eab11299ab7326603412bb00bc1c59ff75a37d6b4"
    ],
    [
      "4a79957a5a1888ad063b51c69565a2b48e8eb917183e220a1c8d3374526d30e",
      "1f092de0e069bba7fc5386e2e9a114c1618f88c4b95e220cd35ffe96f99fcad"
    ],
    [
      "3148aa3df9ece39aca84f59489f2710522216f14be6055ee0027529d1d55e2d",
      "617e9a52a92975db0ba1977f71116f7058a0d31b869ac7f3ee2fd80b0c5100c"
    ],
    [
      "5c1188e72384160ae39d07328346cda4f6c12d227448e6236f04dc971625287",
      "1643006eb3a3bc6aafd5f685cf054f2a572e6ca58c0118bcec0b833741f116d"
    ],
    [
      "3f72efc93c9b71adc4c51d8fc69d3940b20d08733af2b7d05140fdb1d1c1004",
      "7399259987c8f4ebfab46e522380707e58427d3962ee0c2a91760813f76d232"
    ],
    [
      "3129b34c03c51aa8f611e91d5cfcc9bd3ef108ee66e6d3ee35a0e0e50055bb",
      "563b18b5650085efb4cf179a029e6afff27b1d3091cd28eaa68d24fa1f801c6"
    ],
    [
      "16eac0f9fb4c67cf89a7fa4ee615bbe731d8edcb709a1b9b50c7d873a530f52",
      "7ff8288b6e199ca8f316192881424a37fb080c29daa76b1f0edaccaf580a80e"
    ],
    [
      "75f6b6028c43ce832f65d7e8e620d43b16cba215b4b94df5b60fc24e9655ee4",
      "35e9ccfaed2293a8b94b28de03bcb13eb64a26c831e26cc61a39b97969a2ff0"
    ],
    [
      "3c6152fe093bd6316897917ec56a218640ec1b2148f21db9b14fc7a5ff362e8",
      "6eef2df27ae7d63a28856b07b73e7aad7ca94f317201a1e675ffc6f9a1710dd"
    ],
    [
      "54e01b5fe4fd96052aad55b3f26b1d254dfc7e2525fffb9ae0a77eb8cc5579",
      "7c3d39232ab333675b219abc766ed9b4782c840e6b046614dedb8a619696eb0"
    ],
    [
      "d1e63f8ea8a76429cf254a6d3b668761f0dc572d4bfac4fd56d9eaf58fb6c0",
      "2bd0a84d3908a63085824c9329a0983913006ba155b56a58eb3f9becab29c45"
    ],
    [
      "2d6122f2a702edd4da7385b1580796a71d13bd72be94cfb3fec01149c006c2d",
      "70eb282fae992efa6f5915e578b640653549f23385ef3a29ab29b1b9b8ad63b"
    ],
    [
      "752fec14beaadb5ddbba6b3a17fcb86579fa588ef407fad0ea07dbb22a640d3",
      "3feb6728eca21a1e84e8f9f23010387a53a96a1cb62d86fb37996150a1299ef"
    ],
    [
      "63f94a92f27acde8f5ed949b459506f51d70c85bcc61a34d647264ecc53c65e",
      "37e5dce0646ee66f4fdb93b82d54d83a054948fa7d7fa74ab6b36246fc7383e"
    ],
    [
      "d6aa909287a2f05b9528690c741702c4c5f4d486c19a46c38215f52ef79c7b",
      "5ebe1128dd81093df4aca0df365d58adab848d1be1a94b95eeb649afd66a018"
    ],
    [
      "12866812b3053e2f7a9572bdaf5ef2b48c6fb62a0eed9ff0356df50e7d05557",
      "6785f7eb2cd1c120e4c7167b46861d10117040a2e9f2ca86a71e9d67df90613"
    ],
    [
      "46a730d05330b1b13673cb8a1b8f45460035e4a9f1a1751cfba099c4355c1c",
      "76fb0ec6cd16a8141cdcd875c8b2de9fce42d296072643d148ac7e7fa7472df"
    ],
    [
      "4bd4380a22900bd34835e0a908eacf4b6edb61eda0cf483f9212453b37e7516",
      "5e9551cd20d8d7ddbf4366880b7d5267385afa1966ff30da4baaf273b009d29"
    ],
    [
      "71f1994ad40baa2922424ae222663a64f93d8b67929e9a10f9e4c1ab19f3833",
      "85320fe68ec0d37cc19fdfd03589d66906ffa4046c80e1b094a85f27676346"
    ],
    [
      "5a63b1bf5232f28f808765c6be7ce1f81c52145b39f01c879fae0f4303bee61",
      "3bc5d6df68bb6d0577bf9ae2ae59ec0e9b2dc7dd56ea179fb38a41e853db950"
    ],
    [
      "161ded55ff1087032381e6c1449704f63ad2d88df82dfc44a71890fa09b3941",
      "78a52e0013842037274ea75daaf8eb4afc04ccc4b07bfaf3f5ee47d165e01b"
    ],
    [
      "1bfce5229c5fbff5c0f452a22317fcfcd9262f23df41840f84fe7d44cfba1a1",
      "66b387872c00e63c73006a955d42cf49c46c5708fc9d1579b9ae38341b24a3d"
    ],
    [
      "56d47dadc9cbd1dcb2ee3efcd5d4af5e6aea71df10815c68b54a14e81d11b44",
      "47e966ba54df48e9b612a903685e0060a67e4725402e8cb4cf654e54e813a3e"
    ],
    [
      "4b1c44438afd4ddf20a2cf612df2ee494ce84c7274c5529e857693e73018491",
      "430403bd31d8f0677e06abff7159384560f27b9622943fea1a3192f14bf40d4"
    ],
    [
      "7f7281728fc2214aa1dbf13176a4624b53814734abd570eb6ef7c7e32379606",
      "312da47be347fb3fa2c9089b38df372560dcace2effeeacab4d96ab11567295"
    ],
    [
      "16a28884a1be8183e0d3fc0db84a9afbf47126fd3be548c2a584aaafbfa7dfe",
      "7c3f57b3b895564ba562c1cd80b71fda6d2e611665c6ab87744f5390858fe24"
    ],
    [
      "323339f37b327a731232a9580e79952063c7c232bd1380146d8a83c285f4b8b",
      "4f16be1d983c7232f92cce6b9690695978d42cecc8eeb8c206e125d1098a265"
    ],
    [
      "624d26cbaa197e104eb83cebf2adeed09a5cdad359993fe5e3529d4d0def21d",
      "261b7da3cfb55c788977e0d8d640e3e93ae5a325d962ce85c816d7d32cfc430"
    ],
    [
      "f24ecb7ee83a3e28dab54a330dc93d0429a7aea36412e922dce8fbff40d60d",
      "b043e36a258d1df1d21b0cc7be9c4dcae1bd4ed326c110e668ac23d86805a6"
    ],
    [
      "686cea46b710bde1231483bfdbc700cfa3da6ecd5841c0e0c782f9ea24328ec",
      "7eb7407aa58edd6911c7c7e8d1e03bb52ead4a2415a0c33325872ff3a521dd6"
    ],
    [
      "3866ee1186264549df3dfcdf8705c0380c9372eef6d4081c2454d3aded1720e",
      "634c6d3e8eb8af652a4be73e3b613452c2213104ca875b66b4b15ee5b1716af"
    ],
    [
      "484c687cd2969a1d20a58cdfb9a60f280a473284503b1ecff5de514aaf8206b",
      "34d44d26b7427e51a646d1b924084762f5b461685450f21d6a472de565bebd8"
    ],
    [
      "203561333771fa0fe22c4033349f7b877d15b0542a5598e81e067968768247a",
      "2b6a533aff6e2163a36a2a89cb7415848bef48db40f952ffd380f47676707c2"
    ],
    [
      "2ffa6cca6233695760251206fc5e34c8d3692498589478cdd3d5b09f0b7c05d",
      "6c57d605478fa9626c4ed769554d075daa53e1a1d0bd4d94174d3bfeeb11ad6"
    ],
    [
      "5dccf0fa46a5571f204d0b033b45f299cbb3d9f80fded57253ea4f1c64faaef",
      "30a38e131ee8756ee5ea2a3e16618a5dbc28b5b9311308bf037ecc2039dfc7d"
    ],
    [
      "57b0a2eaebeafd950221facdd24790d7d1ab8883e5c5d55635f0d14a1ee4741",
      "7b41cc478fa6be38417271db8ed12efc0da6982552c1496025d2df0576bf4ad"
    ],
    [
      "611b5725101f611c387ccaa13889ecf3bb5595071a179ce350029bfca4ad7f1",
      "3129755977abc8995fec7eec1123a1561e429fde37ff36af002d3211831ecf4"
    ],
    [
      "1c06bbd0c52fdab9fcaf680c7a93fb821e538a2ed79f00f3c34d5afb9ea6b31",
      "3873d3bdfe0be0157bbc141198dc95497823cc222986d24c594b87bd48dc527"
    ],
    [
      "275cdbabc989c615130d36dabfa55ca9d539ed5f67c187444b0a9a12e5b7234",
      "2b7f723e68e579e551115d56f0ae71a3b787b843cc04a35b9f11084b006521"
    ],
    [
      "6cc702eb20f8b5940c7da71f8b1801f55c8c2d8e2e4a3c6c983f00bc1ffdd95",
      "5d15b3727bc66f3aba6d589acdd139fae115232eb845abe61fbdfc51341352e"
    ],
    [
      "44defb418700cee8c9bd696b872adb005490512d8bba081f8f99a9f15cc981c",
      "3b2072cdb1d919b2b65b5cb3557f0a3381d7ca293c267ca4a38f83e77bcc96e"
    ],
    [
      "fd83ce77b1578b3a9b8c3cbeaddb1504d2fd4a19c901c21ac65961224e4966",
      "110cbe64fc10c6b9c66f15ca406a35f50b723b35d83c5eb9797a57f8395f4f9"
    ],
    [
      "9dc6ff90e341875e113bbfb507724dc7095a280d2f32cb6ba61a1e0c2d2aef",
      "4aeb622896c852c2747454e8f172c9482955a42ecbe522d6ce07ecde79d0a51"
    ],
    [
      "71c58b0e47b9dd9107ebd8a8c8fa9f0534e78231bac612c1ddc7a94edf33eb7",
      "7f90edaf4792bf8334adbaa0f4ee7c654312725af188682d75f34874c4eccb9"
    ],
    [
      "1f6de1f14988778ceb2dfe844f92394f1f1e72fd1581ceb3bf336c95ce50345",
      "4f6007ed4e022d2ee9fe4ca8207c5f6c766c4f3b85260e941fb24ad0dcbf0bc"
    ],
    [
      "3ddc3ac25ede4a67a97547ed27dc920239b585fb3624177e2e8d59eba678115",
      "a9afd8f8bb759cbd1dff2addc63f47da4ba1291ea34229c09c0637dc5c8d24"
    ],
    [
      "c56b0269d8431556e471cab9d70edda3a37b391696f107b2dc370631de51d",
      "729c52f6b134f733eb750c14bd9f95c077f0f6f6ff4005701e5bedc6544599d"
    ],
    [
      "44d32ce19ac6807cb22e4f25fe1486a36a13926f147fbfa054b63ff0446177d",
      "212a21e8c124c9cd37c80d2dd66913ceaa6b6f666522f115c39382b2d5925e8"
    ],
    [
      "35dfc16f3ae6ccc06a267bf6d931601e52f3e45359ffc513570b65b96adc4f",
      "74311d10f4bece01b5ae65a6affe5c931463aa1b73a3320eeb41bbb7bb1ff62"
    ],
    [
      "e0acd9d2d907031b319b80121dc90699d003d220ea785d50e5033cdb3b1a03",
      "3911ba78d6e507485d6374b0f7d2e6198f6462a7d6d3cf046404a07af690357"
    ],
    [
      "3c57918ca254c0cb7dac251ef4e10c7d82327969552eae15d26c4c52660922a",
      "5fd5f5ff3f14e671548074114c72c48409df8a2e71fc8aa3c8acb506e2a88df"
    ],
    [
      "222ad8b61e219ba2b581f606b7c996516850a46a3db72fe1f72b5a9be6c324c",
      "72015a5e2db648112abd284fd867b59fc5606645177d26cf6e9a655c9912d42"
    ],
    [
      "3c86d5d774bc614469768ad38f7be9a53e9a233942c5c553b82e49aae684764",
      "480febea8229e130dedffff89c11f3c43e11724e6bd89d5566d78752859d41c"
    ],
    [
      "adb73bb8352d0c10175df371f7868ef2c9e0c79ac788430c480c0f7d85c187",
      "60b564785248111502e6f39c4994d6293fac22bc25f4d764b2fb1957d3c9bd8"
    ],
    [
      "3836ab8b46cf4f453a22532c886940b982029b29c42adca90ded5bf77e6bcb9",
      "7b15e91d6355f147b171a90b064a9d8b2d7bf3699bbf4987664c61c950d8996"
    ],
    [
      "12ed96af1a97c45ec31f1531e96f6fb28a03ba52ab8484545fbe0dddc97bb32",
      "6d1f522b6c6cad0940cff8e23decc72bb8d4164696af031415508b025aa8be1"
    ],
    [
      "27382994ae5878223ef802e9b4882f481a1b4008f1eec8484483471f7aa742b",
      "c31750d242b3975b0026a0e86ccdd17d0f680a8c6f53f197fc25eb1f777917"
    ],
    [
      "431677eba3715455bc235557518a74f3b111a88844ef13e159ad44bc16de3e6",
      "30000e1eb6a17d9df776981e65c6e500fded1ac12003adc9446b269812c9197"
    ],
    [
      "4b563e6f42589671579eabfa2cda5502b361c46a5ac8d45c8ed44741a925b33",
      "627bdb41678443fdd1aa607709e9699b652308615f4bea760a3b79ee0d9ab5c"
    ],
    [
      "2932fd3f81fc973ca9def6b7f1bb50f980fe589187cfe9e9f52ba4d356cf2c8",
      "1e6bfd00fa976c4770263a227048214c38850fe0f059e7b3d2c7871ef07d68f"
    ],
    [
      "e44e4f3d96d9dec775b996be57e57fdc28e7c68023109b221c414a244a0dbc",
      "58b1e52fa274812e5184e00e9ad812bec2463140adfb4bea3b2d665867dcc9"
    ],
    [
      "7fcb89be1f4bec745887bb891e53fefd665c53d00a9e74de16b8a7e1f7adfb5",
      "74af0b06633f779897e199609c71cc5649bbb65bc2c0abd4c678f0480c198d1"
    ],
    [
      "62a381ffb904ea3ff4d451d4c8459457cdbc3dc2fd2da646a95d8c1e90c0b7b",
      "1ba058658e09db9e319fa73de8ab4a992b71e4efc22c273725bdcab84e2a315"
    ],
    [
      "1b0fbb7a84c67e668450a54449c7a46261a2d355589f8b84ebfbaf9a77ee938",
      "44f8fffa33dd33a6146c35d196595e22cc4a215f61ee9197cd751400970a1b"
    ],
    [
      "78fe920bd96a356d4d95ee34adafe8fecf071d3107c36f047b4024ddc4b3eea",
      "6162f29607fdbec10181fbac6e57d5cb41b922c5791fb24bd28bcdd75d16c41"
    ],
    [
      "5629b849e026e65d119ac11821d7ab7efd9c52226f75c7427505d6818bb0c8d",
      "1539c0f90970ee8b490e45bbe5568170e5708521a0e59f976be680595906feb"
    ],
    [
      "62bc853f349bac8c6e5921d27ba85dbd9ba20a375d70a7bc008928f3e123b04",
      "6acfeb1de05ba43c3ef1a9110a983a320e77b3ca294abbc04aeca19b194f26f"
    ],
    [
      "4cf4bed663464418285cbae359b5d84ec76b5997d24f3640984c7663421190f",
      "941f818e3e3e8fb1568da85217d17f9250ebc948379014d900a7b1a848494"
    ],
    [
      "52ff3d9ffe9a302f6dfaaf74bab57c08027d5cb699a69b30830540c0a2d47a1",
      "987dd8876873778d933fbfed37aab2f7d6f669c37024f926b1edcb2ca55782"
    ],
    [
      "1109ee32f0bc53de6bfa457060b366e909d7c18061ec9845f46ac715496897f",
      "38f36f172bdfd454b9285f86e6bdece8fdffc95182c7d801b03c671cc55139b"
    ],
    [
      "4b4482f1d84efe23dadf3bb10df3dcaa251312dcdd604f616f1eb540e1f3232",
      "7c9c149dcae9135f940fb54482f9c3cd8193721643a6e23157b8020410d439c"
    ],
    [
      "69cb459b9e415b7581ca163611c470d875971d5d7949de732d1f0f200544a73",
      "a7136fa9dd00c0469863b7def3f83a5611ed628810d7e807e7a873da5a9897"
    ],
    [
      "b66a4e32ac9a4baa8f64780acd94ed3628b2b0ea874ba4dece629af65f9e62",
      "24328ba9996a24389658e3467b8b90dc3927ef8419fe28b3f55b1c1aaa51915"
    ],
    [
      "5ecc3080062dd451236de0e4eb91c5c75100733364bc5469f5fa76f79021ecb",
      "6da4abb9031a27b5be94529324fad8026e7d871570780081b0f424d4fe543c9"
    ],
    [
      "1e3146f00880bb22486d5bc73e54367d54251f4002bcf342d0393b05a4b9ce0",
      "23b6fb8e945d3205f633ba724202db5a99305f807137edf942cd60eef867699"
    ],
    [
      "2e1da8013285598b899f026c6974185db12c97b4c63509769d3d4ad1d18a4e5",
      "1e7e7b668674d1593c39d58bc7bccbf568208732b3519bc2cdf93db34366862"
    ],
    [
      "d26c3f389d81709506f184b53871497c8d36c5c9eee8e3737358204c1acba3",
      "34649c3d39f3b825947fedbca215ae30c5a5995e93b1c8efca4944cf85a082a"
    ],
    [
      "91300478a83595d548f32f259033291fc7d083953b0b8bde88c7559660c563",
      "e5d2bff57fc6551e9b80c06ac7314a71907cdcc66ce82f2cce721a670df10a"
    ],
    [
      "1f7abcb9d462c63ffe92aa56619ae8590089cca4d93ee3e5f34a63882452cc7",
      "7e9f85c7b7ca6e9a4f3a026d1048adbeef69ea9d876c6f647c257b879a81bdd"
    ],
    [
      "4d2caa1323012e4c83b0ad387308b8aef5637bc35ddd882e7f5e41cf2ca410f",
      "47150e808c81a540b6f8864e9d6636589cacaa516f82caaa96506edfbd6f0e"
    ],
    [
      "3c10a6083c38351deb3e6d1b386827d0acf48979b66b95249eb8700ec26b069",
      "47e34bfe561d903cffdd1d849b85aa3cbd31cb4a9bbd8cc2e5fd2f95016cabc"
    ],
    [
      "758bd54868eec045d0b4d3d2bc415d24bce13fee47cefdfda46425c109b657",
      "3392a7c66ea3bd7b044680bbe9f78ae86752097404c067e9d2572f55330df83"
    ],
    [
      "19e718e0ca1d2d6fadbc6006ee7dda7a385430e29f5e239cdd4bb7c3fdcb2f8",
      "5c68249b7fe03ea2e13481a63b6cd4bf74ce42009a89fee0b3f8f968b3ec709"
    ],
    [
      "28077f57ea62401806367e6d54fe45d02de5b072db787ffdcc3854e12a3e855",
      "14f3762689072f5fb41d03e94b01808c739f6d42b7b785b0e464100b150efd2"
    ],
    [
      "3b8a8cefd017363ce867265af3293cec081fa589fe561830f0078778cbd338f",
      "69ccf2383cb7b4f9c806d72535812483e7c5e9a1a5928529d64ca7e085e758d"
    ],
    [
      "77878f388d22161a2953e5aca6bac1ea480e102f329574b4b201640d44a296b",
      "7eb35706a90a03aff7c2fecca72659136547cee98038746db5aba16fd7178df"
    ],
    [
      "97332e6da70961f2ef31b7b628f1018d21db8db015922a301fca7d6fc6a8e6",
      "2e37b06f639fc7a82601b744570a2619e543cbfaf60e474107fcaf4686d3223"
    ],
    [
      "a81518d452d3aac48bf0386c3ff170ef4e684a4def242c964e129c64f4d647",
      "37506e44c85908ec7b7adda9547fbdcc2e3605151fefa77fbf127ce3bc938f2"
    ],
    [
      "e80336b2220b1d666074f6b0dac85353d0e4c2e8bd0f37055a2236a6a9fadc",
      "1cae76d73eda7a5964c5d9d3ad6748aff51f5543c56441d2fdb7b444a39846a"
    ],
    [
      "2c01fd8430ecb44e066f352c4f697fc9fda177dbe162f82862d7b9ea8c918de",
      "6e1dfa99640fdf5b30603d34c7c97c1aa6e6b7f3a2c52a21fc64b0fcac7d591"
    ],
    [
      "744e37b511cd0ddcfe15f3581947014c159de81ed055d15a13c7a2d1fa39f0f",
      "685caa8ff6979a6c63640ac638a3f9c75737f2031bd55322a47384357af164d"
    ],
    [
      "40e627ff84e1a7a9068b4368770f5956128a4d9e9e33e9cf5e24d9a242149fd",
      "2465bd6cb20bbdf810e2bc5c3c458cecf4f3aa163a7ac99c2579e5f33417f2e"
    ],
    [
      "5f635af7f554a17bceb6ccb6e637abf89ab6dadd399189b0a0390e87b1896bc",
      "2aa6238a69f89665646c0e3ca2ba5f709cc6e14351cf71e1b00ec45201417a2"
    ],
    [
      "5edad3063c9fa8305978d7e6a4e037c9fa519b8023c7608dfc3b66e5c1e8985",
      "49f405d07d7d01919da51159ecdad1031a5ac208c026fdfc14d38f633d92183"
    ],
    [
      "2fdf2e8a45858c12926a1f25a62255fb2d02d0149a15ef669f859806683e649",
      "61cfb686bb31e2524470d4ad2ae09e3cc91b16305a21d748098feb1d8ce3b3d"
    ],
    [
      "ecdbd7c37f1dffa3943977278da3bb429afdf948b4ea6cdebace3d3be82381",
      "190b67fb34f7f3ad6afd3d6b6427aa327547d8ac0fb4deeb0feeba1f63d6c60"
    ],
    [
      "233021b483f578dfa5222f8cccba5766ceee0ac65f6d4a3b1673b302a21fb3c",
      "7d4b6d44d175d4b593f06f5a6dcba2cdbc4eaa2097abaf613123546866cf4ef"
    ],
    [
      "42db4e953c2a7a743de9fe20c5798f2247f51db4eabc6f40e86c13909a310ce",
      "12c1a0764a0b9f3666e431923ce15e7fcd0ded5ab153f0b48d362cca1604e65"
    ],
    [
      "30d539e2b545fb957e40e2255f6463b52d227c9808472cee6a3d521aa283a44",
      "5f9eccf747fe6313570f99e845db32b40070acee9ce9e34da7f3c29ca53a07a"
    ],
    [
      "4bd64e5ade3e2733580a6116b4af328751198e7128f9acfe3a3496b545efb5a",
      "4d584768900dabfc0dbaa086632b8051bb3905ef79b84d96c01514441d0cc93"
    ],
    [
      "62d6e771f02e591557197d13c3e77dfa2d1794ac1808407bd8227c4be31b466",
      "5c6f5607c1808e899ba36a425911fa8566b7ea9cc80de8a80538c0fceb837c0"
    ],
    [
      "5ce406218cb2852b1d2fe1836b19462f664631785216e87ffbce26030e2101f",
      "5225f107743c255ab50e7be4a090fe39478d1ef4ff558468559d8cfa87bb94"
    ],
    [
      "670286486e8dda3dc66b0ed3149be7697d3e06c8279844079daa7e42d5af728",
      "26becabe7430380c56e320f5ae3329569cae7b0af06fd5327ee23979d200eb0"
    ],
    [
      "3ef448df33a4394c43e93e5850cd0c5a6dcb18ae1cd865d00fe8ede9336a9f5",
      "56711f6ab7e0e4f7365ac34e284ac2879f40208c46f6febcc1dcf7146ecf015"
    ],
    [
      "4b63fc130288e92f2d6ba238caa7a6364804e29829ac037c57df32fbf762bc3",
      "1eb8c80af55278b4113286c038fff2bfad2da62763bb03426506b869139da0e"
    ],
    [
      "4e7e998557b29a95f805a6e2e26efc1e970108272d4755738c04f28572295c0",
      "97cfcc2f447bde61bde71049d8200a74a3028b21703bc139143d81a3623f09"
    ],
    [
      "574b67898f02964c408f68e9470e7b615be037e40b824e6617f89cb56c21219",
      "49392d5f8e6740a1b0b7444f56d7a17363f8656c6e4c628678c86223f2e46c8"
    ],
    [
      "7e8cb50ea5d5c1b09e219e7305bcb601d99b6d7185b1c388aa8e36fe1e56554",
      "47fefa308645455c12ccb5817da338f0c4f423b341aff4a9d158891a4fd69ba"
    ],
    [
      "67266dea9e71b4ed2bf24a597a823dd048cf31e725db511edceac72998c9ef6",
      "39babd65850befde1f7c28e41dbdbb4caf82bbcf3bcb5b33161f1c2960b2d8"
    ],
    [
      "63e99c2cb9c74eb9227d48065e27abb8f606df8fc83b2c44e4ea38b046bad2b",
      "60494a53dd13ecf34e08079d343c88fb655d6d810785af81f08d5aa9bcdcf9"
    ],
    [
      "3cf0600b0f5a2a4eb78c487cd385350e8c7848e3f6983231881d7f1bbe28543",
      "56dee4288528de609976ef6b903b652127c37b0590e91a2fdbebc3f11df2628"
    ],
    [
      "758f09245fa4b8b23d290ee2b3bfcede199b4fdb11f3cf2502a8ceedd61b129",
      "622d9baadfde781e985d9722e0a04715666769a4cc7a9bea0b96d6386be1746"
    ],
    [
      "38e1a45b81492aa95d7abea2b08b8c14dc0b8a41108b036871fb737910ae18c",
      "145c611262656385e5ed6243568cd3f9f59dbfed7a01ba11e22bb8bb272e08e"
    ],
    [
      "206e54ca53a2f155bd4fc45bf2edb77798ae6623defd4cf22f2dd4a7d119dad",
      "6c94e7f0825ad81680e4cdbcaaaf4df806d57a0d1fb2331926c3fe2b79d22e8"
    ],
    [
      "56e98d2862893caebf66180e84badf19ffc8b53041eaaa313ae7286a8fac3d",
      "526306f9c01afd6e0c1198ea5de17630f5a39c4ecd02d8e6f0d613c355995c6"
    ],
    [
      "4fa56f376c83db33f9dab2656558f3399099ec1de5e3018b7a6932dba8aa378",
      "3fa0984c931c9e38113e0c0e47e4401562761f92a7a23b45168f4e80ff5b54d"
    ],
    [
      "450cfaadfecdb8a2fbd4b95c44cb1db723ee5ac9677c9c188b3d7c8eff4ca58",
      "1a552bdfc0c81be734f1f6ca9a6dd3ab4daa61c11fb53ebb7046eee25d617c7"
    ],
    [
      "6fe20e5c8a8004e33eafc84d16ef770f2f0b7bace19adaaa150f987d295a34d",
      "28a35040a2ebe9a14a162d3208d5eabc6e2f3a8310f926bd80be65aa71775e2"
    ],
    [
      "1bd65f45a35bf62ae8f9ffcbd7de2976b90518b6820c219f039c50043bb1edf",
      "fb5f0f8659f9b6ed7cb0ddd7999506d0c20b26bbe69d1915a31842cfac41eb"
    ],
    [
      "4ba4cc166be8dec764910f75b45f74b40c690c74709e90f3aa372f0bd2d6997",
      "40301cf5c1751f4b971e46c4ede85fcac5c59a5ce5ae7c48151f27b24b219c"
    ],
    [
      "21cfbc678f5a279ebb6ed124273c8df37eaf12a2d04180403ae6b5ec0b1e1ef",
      "4478ed6a346d899ad7b0b10350270aad39ddd5b68529297e4c91a54357f0a7f"
    ],
    [
      "350bfefbe3d864eaadac9cc1195c14159bb736be743aed7380d2384cadd2046",
      "5e2a4b3ad0e1d7b9b8ef72b10d68a80e5ee691d7db591fcfbaad6240d41da8b"
    ],
    [
      "529acd569127f73c8d34345f87e96cebfb48ee12a00a3861cda209337ed94e6",
      "3120671a89b705e5bfd99b0e7fd2118b4914a3ac309b3d74527cacb5ad7491"
    ],
    [
      "55d3d7956a97d10e65a4d8ffeba40deaf0db0b57f8e022cdb3df6df613f5c6d",
      "159e59a6f92f48fcf85aa96c1a03749a4c4e2cf9e2bc94dd36796daebd9b8b9"
    ],
    [
      "405f019ee8f2e972a005c549b0884b5051f63d1e78480b73208dc07d8c65a1f",
      "4301a3d0c285ad309ff24a12c100ead7f48ba1368143712f32ac141ab4d9e8d"
    ],
    [
      "376d59b298d982f02dccad0edd5bbd4e5e8fad7898750675ed0856850a7babe",
      "5233b12bbc50564eb61cc098a17d3d97f06ec7a230380e4c5d3b725cc318eba"
    ],
    [
      "2f55624af6109ef04b2ed035a44a904ace8627f55889f011f768aabf4de9a38",
      "7f64209ce7dfb63337ccf3d8c14f4093295f86996cabfee23b1655549aca089"
    ],
    [
      "3b8965e942bed2714bc2e685fb103496e1e3595ac6a343d6df45fb5ef6979ed",
      "5b7cac7a165cb69ae103dd9052fb39c00ed0aad47989005aee53972d82d45b5"
    ],
    [
      "7abfe3accdec1eae1a50049efdd9a8eb7c2921a08e8bf1fe606e9d5a4039ec4",
      "3af178e7e831f8148244d2d2b284a32991852db6212ad0a9d77540ef648a5fe"
    ],
    [
      "4983196df6ad7d6f0a8d76f86af3863ad8611374a03fc0fd00793181dbde9d",
      "204c1f91b70f975a21d24a8face664e496f00f602daaafa69a3b56098a4cf89"
    ],
    [
      "79e2b91c1531a3b16dbd53e72d94e16bf265cbec261658151acfaea3718ea72",
      "3d9bdb47e8b148c1c5e9e694ffbc2cf71aac74ae1a85e8d8c3f77e580f962eb"
    ],
    [
      "297efceec61b3be17565843cae465c52524b4ecd9331a4170f54f7de8c4556c",
      "6ccef1733624cc8b973ac63dd54e7a53604929affe81c3439525ae5ed6af993"
    ],
    [
      "44f04b1966264a23ccdc870c8563ad2efcd4c8087b5469b90e792287a5581c7",
      "1c417f0e9829fa3d3cbb7c3cf4dc7aac04c5bf66ff3f86b833a42c533aed1fc"
    ],
    [
      "6ff83f5d8b51db3be0bda80eed2e2adb7037f2f58f705e88f0f98197431ac26",
      "64f59b8428894c2b7afd740866065ded42e716c7d48accd3f117f22768ed9fd"
    ],
    [
      "14aa8187c9559f77cd1cf96b2dfc949182529936f2b0b4050ea56e134073b24",
      "5f36508c68b1dc586f3fd3f4e2bd29c6d8258491b8a6aa19ede811ce0d3d0a1"
    ],
    [
      "95e8882a68c5000d1c2be7c0b43e7f2a6f8de906485241f0285a5c73a27a83",
      "1e4cb67207ab73bc1e5d19fa2146fde6d03021393b77a55df4ddda1fd28f5b1"
    ],
    [
      "2ae0704dacb3da47d564514b4c3543505b403ba09a248c6e74593cba1867ff5",
      "5a4b5818088dc9ef4066b90a8893ae80fc89584f987ec1928ef9d72cea2bd67"
    ],
    [
      "61a10898a76fb99989e51c0e823cb60b95ec7ccccb917c42b2b28014f5fd94d",
      "23d8ec1de45366d3b86c64c2da05a2ce3d171adf52ca5522e652ffd0eeee795"
    ],
    [
      "79884133c879cf07734976fd64de220c5a972e04c2a3afb74c362d6c3beecbf",
      "2aaa0e6d4891b792b5643fdf09873343cd0e3fbba3cbd0601b481a4083f32b6"
    ],
    [
      "45f73d2fa82be6c5ccd0f62d2237efe8727c479967d27cce28e42b9a44bad5b",
      "2fa4932215f72d56d8be5205c5851c9b3e5f2a14468e4a7acace5437c6b27dd"
    ],
    [
      "37f53f771850f52f9c8f87b53c6bf0c93c2bed76f5fd1d5697356d0b2325007",
      "50f1a052b79b446fbc7b93ffa1a4515f6c3be3a76a2b0bc5eb8ff327549960c"
    ],
    [
      "71bd6d23e0d2f312d47582efa609101f15b9ccc571fca8ac4fe3457c67fbc9b",
      "3b3fdf86bd4c7fc26d60540a6439b4d179dcbf7b91efb0ddc60dfbff9a148c6"
    ],
    [
      "78219ba049438385b829c13a4993874a4a326c4143de0dd581c7b9956f99b06",
      "5505f1268dcdd4ee01b77abac3bfdcbf3f0513ab097c69ff777b4a631aaf256"
    ],
    [
      "b81e924a86536dcf68bc5a2ca2065a61103ba6c9eb0ae4cf8cce9dbe286f15",
      "653a6dfb51acfe8a844fb8362795e5549d424aed88d3a090366a44f840b5b83"
    ],
    [
      "441c0d7b7aa705046dc0e07ba5f33a7d9df23f694a05192ff8c2d7be2aa3fdc",
      "4c06568c0902bb99d428bfa0a946ed0f0ca0a51fbf07cad88e06e9c78e38a59"
    ],
    [
      "2569c8c78b6d6b92533f29f767c95720d377fa63ad5a3b9827ee0a74b0488aa",
      "4b59c81d3cfe08834f946d9d57614f5366e0bcd9349475aaaebe01341196fe0"
    ],
    [
      "3f2fa285a0471647b214eac652bbad9d58a9f2dd2e812aff0210d0d8a6eb32f",
      "4cdb18e1c2848c2b52c1a6557165bd1a8f55c2f7562f5cc0b326f73c25b696c"
    ],
    [
      "5bb5141ab4fcc5290ae9151b8045a2cd8391547ce7b3b33cbbb10f8fb538092",
      "5a36bfd52acc6a83a9913b937ec086cc27fed030b5fa70dbc5d3c12c9515f56"
    ],
    [
      "3f3fed272edf91aa7f8ca5d70005d390fbc67830ffc69c5fa3ae17582d2771",
      "459057e0883c44d8776fa217405f443e5954f08c4a5db68e437becaa664a999"
    ],
    [
      "5237ca6656237a717a739a4509f70db1b9dedbb6cd232f60c9bd8c4563a6b1f",
      "56c7799dd02896dbe7d69dd8bb9718270549592099569d107b7b49c34bf5a49"
    ],
    [
      "1cf6b8499ac881e0b2fc7def9bc1a28937033b2fc52de99e75909a620c7a281",
      "5769cf4f735366fa386b6858043dc99a100f86fbc77b16d57d77766197ba27a"
    ],
    [
      "1b74b8a6b86dbf9638cdb0601e1a332b8d880753423d38c3394902c57f15e40",
      "6bb2dc10d2ecbb913219d0ebdc8d3337d644ed8b6c4e70637ef4c7e50887488"
    ],
    [
      "61e4da415661bba52a4737e2bcde1a837787c4796b2e1854778534f1582c29b",
      "27c43e632cb7652e8508c9c38e3b4ad0d3dd6ba748d42dc84ec2685e64b9aad"
    ],
    [
      "7c460a204d23f20ce86596dae6ac9b36734e4a9f7c5b43262c97a36c6a41c6e",
      "481a11f9300ab4c4bf6924c5ca884728cc361247377065920966785d043fbbf"
    ],
    [
      "124ff5e55e4effa40daa5b9618d75c49c8b6fad95cbe8c0bfdd83cb9bed8316",
      "33a2ea15d0f71f58a00de71acd7f22ccf9002115e49dd1f7631faa0d32f9987"
    ],
    [
      "61c9f8fc86715e95ff43583a865c5a6515f93381839d557ef884a68637eaf4c",
      "5877daaa42bbab9083b571e12648a9d62ced4470d71653092b6546f4a5acceb"
    ],
    [
      "70a6b9a9e5d1fcc07dd9ebef6d8f5fcf04c6cb34932d0fe2335330ac6dc8d3d",
      "3f0cbd332ac56922e886656bee74f6e9bb4bb88f7af7bba9098678af1f38fc"
    ],
    [
      "41db8a0f1ea78443a39e08a54323743c8897eed1ddc28f41aec6f2655040d9f",
      "7d4bf32f8f4719c2e4af8b7889f3b65cfdd033dc2f971798a12170f2b26efce"
    ],
    [
      "62f035e01acdfe841104942d6c8c07f0fbd618cb85998ea24bcc24cfac1f8",
      "1caa886104b7d753fda93645a746989794cd825c62473b526ea34b3d51b5771"
    ],
    [
      "441c6f016d270e86c19843727b83b864cec060cafc813b23d7e41e5abb1a60a",
      "29fece4e40400f3acae0586f4fc8ed535e805e472123ec38d662d8a0b01c086"
    ],
    [
      "2c791ba0fb0b66177815c98191fa6188dba9c795e34a7c3c8a19086215e3cee",
      "11123151389d4b330db6a665a560407e7cd8c3807c749e2b0cffd9c3074ba77"
    ],
    [
      "5292da4ca71ae75ed0554c267747e39c7a129b3b863e1af3ebb3e368439c4ea",
      "63af6a5016deea8cc674c44f16c63c1db31f09af4fb4d2ea7917c28116661fc"
    ],
    [
      "3367388d5d1b7758dc3d92e244f227bb8a54e3d9909e7b7dd62ab5965e3efc7",
      "7ffb4833071e4b03ea755ccb9938487a478248fe9b1158a08f1ac298801c092"
    ],
    [
      "95c863314b7f18090f8eee602403be823a367a1b416d54c32e5f914e67d922",
      "159c2824f899171deee23e0ed520d4825bd667983df0a8d45d3a1f7156d91f9"
    ],
    [
      "621c6e08b3c57404644ad49ac7629832c141273fa1f323781b3395393fe985c",
      "65d1eb0140652958c4371ebec791e03317d6b2e689d90e304666f1b610783dd"
    ],
    [
      "54313129bf13993952cd2b31ed06013aba85e74c1b8a00e062031f32188a84e",
      "680129efc9eb8ec07fc180e8f6877e5f0f9f44e3000a2c586ed4ce49d12a313"
    ],
    [
      "21ea57a1c8286bb45872e78617853c47b89091670ba51c124afa3362e7260d",
      "7087e5c1536df233ec9bfe2f983e8d7622892b9bf64c450c9823898e2cc2fc8"
    ],
    [
      "3793b05b99e7a57d88db4ed0dbc3b771285abcd9052da50f88595354409f3f3",
      "12164105041c056f127e737c7cd63981e05f246bd2b6b65d1f427019c7c3801"
    ],
    [
      "befd345cef5fcae22ac37dacd6b9128cc58cbba3e3fd774e11b421c2ba392",
      "6209d25f24f88f7876ca604db23d05f78e6b3b67fb033f2f1bee221f352b8c8"
    ],
    [
      "15fa536045fda4c65ff74f10b4e669ce88b9996c6772288289d3ad725987fa6",
      "30e0c2124a35e265e931ccc66ce5ac3697d982814beb407144ff6762cb691df"
    ],
    [
      "38b795bd77ac573576dc204857a488cac2cce19809882631ca2069598c577c8",
      "786ba555d55ebef688b068bb9186a34a08cb00bdfef51619bbf911890ae9a13"
    ],
    [
      "6c66853592196c3eb8d9526dc155205e2c64097adf8684bb0e15eb460ce1c72",
      "1bb4ebf654f4250c8dd1061a4e1b464b31a8a9999ac9960446ef8108a66871a"
    ],
    [
      "5b08dfbc87ad9c00b88e78816973ad2f9c10c70f2156908892cc7b7a2a1fd30",
      "1151f407a77e2556073173d8f5c9ff561d8a23742121ca15f7d0ac391af50ea"
    ],
    [
      "309190eba106aa6ead54b5ca5817969aa68b4b4c627700799a49fc6bdd32ba1",
      "505b6a2bc7b0d78ca6ce2abe7dfb7312369918a4599cccf8a615f6701cfd851"
    ],
    [
      "89cc205966af08acc8910d563af7443d5dfbb5d88dae79c013c678c65dcecc",
      "1f8cf955694b246a423ac725791231257b88936e00347ecaa1e17045c0ab540"
    ],
    [
      "480086b61a80c36cf1e1a350baf554e58ee8d9333186b70c9c512fb9e9d5a84",
      "511edfe58f8d36a6170df743731da1ff525cfd5108be20e30ac4183d1281570"
    ],
    [
      "3caf14fb1d2e90a13ad4eb091250fe37133aabf6029633e905e5a93ead41dbb",
      "49122aff6059dfda19e4b973aba5ebe3804c91728936c6381c1ed1ea9380920"
    ],
    [
      "66d1b8fb2cabc46cd79741ce1cb7326077ad8ea3227a6427244bdd3806bdadd",
      "4a52eb74f4d5371ba3265dffd61c844f9e68d4ff0b44dc4936182f9280bb66b"
    ],
    [
      "373330c5afd53c31257fcc9050fef873e15ea9f81d9810f30744309b04e02b3",
      "5889806607b3dc97a9c5b0c8a2f16d1792099a22866b879ca480cb89a11ef5c"
    ],
    [
      "26840d0ec69a22c6818ff64b8b14633b531508c866e21d1dc9239778ae9e8c7",
      "157971f9a6e3a24d3b307be0e7c8cd352e2eb5cad33cf276270c0f309ee63fc"
    ],
    [
      "ebb84848f1c38c19a754d1b5d9460e39624dadbb30800987c9419c0f933b9f",
      "517b297cf32f4064e6d6c8e761ba8db89809604a701c7b3aa1a9c6beb370ea7"
    ],
    [
      "25780380bc0795ed0dca727c55240f1d63593e552d224adb40df2d3721c0f66",
      "10215fb5a893e0275e9f1f66b217dde35addee91ed0e8f7d79531a2ff57b8c8"
    ],
    [
      "243e1581cd1abfbf18c31c19a4c3d1cedfe69a40bb57b607c9af2717eefc742",
      "1296c27929f14535718c3a4ebe045f00afdc60afc74c7d398d8ce1b6609dc0f"
    ],
    [
      "48babb8649e054bc8e0b902c89e6940c265f48464520649502ef1064eb94562",
      "3235be7852b0526d1a16f6969ec0e5b0e09cedaadc65863dea4e47f4f398264"
    ],
    [
      "592db7c27e63489ef4bcef2eafce89f40067cd9a1ba48bc3dc76b5fc62ad9ca",
      "48b7711b570cd9ac65910e75e752f4b751fdbfb4091a28f59b8c046d3d9f8bc"
    ],
    [
      "31d133456222586ae42a9ec7ce8539ee04afbe0b2ed00a2564dab0798d9b55d",
      "a77c52fa1fd718db5c83e7fda6d7d4d9aafef9ad95cad621470f2b753729e5"
    ],
    [
      "4651668379883521e7983aafcb93811b4a72ef2975b3277773746708ef3e3fc",
      "512507f3f544d80ba5d47f73b571881e8d70d7b1d305b9704bdad036b7abc47"
    ],
    [
      "26069e359b2e847affaef604f772f36224608b7642245d0e643889ed231bddc",
      "75ae1ec379f074ebc91270077c74b4d34347ce183b676b4dbe100bfff143b9e"
    ],
    [
      "3196d01d1fa11dc3803b4813c4bbc6326869f61410f2bd14bc0f570d875aebe",
      "20313217cac79875bd2a503db1e86d1e5559911667a02524759344468d9561d"
    ],
    [
      "483256607f75f06fb126addc60cadddd602154cc4782bcc08351a48745d0b97",
      "2950a7e500ebbe9775f08be37cc2e62ccf9030de18948d1bab07a4a9173f75d"
    ],
    [
      "65f07b6050a2fc6eebe2c29ffa62f764060f7f9d3c82d2cb5e4e368aaa442c9",
      "562c9654b646cb84a213b41de203c871b3eae0a05c9c105a66a53c319c06373"
    ],
    [
      "284870f6181c43f3b01d94baa9c5b6ada0deb861145523ad9169580eb7bed35",
      "5e03e6c40c1cfa3cafb01fd0622349871832a9d35499d06408a83edc1b76d02"
    ],
    [
      "32229810a52137f0e6c3d37595c46f6132822d4b05f42674b48d7a7ac3ad85",
      "7babde959a0cf2c53ee59fc52c77c3adf899453f077f441965629f9aead30cd"
    ],
    [
      "1ea8b98a6b85e74e0a2fbc18b206e290f3ed94ce99ca665e8e2351dfade990a",
      "478e93c4724115fb1648c8d5347422adbc1a0bbf962b2312e14aec80e1be742"
    ],
    [
      "270cbaa08c79140c85b864475a0bf569cc03ac785e57f543dc444f37ce746cf",
      "3a9b8d894016680ae9d1bf3deb931d8987d4d8d8bfed45b81ccc595ec79046b"
    ],
    [
      "6943922708b8ae5b40dd7031ef2e487abc4ac39a3591368285e83d6c9c51f4d",
      "5f157c37d09634e8cbfbef90ea50af59815d011e419a691c67ca3402b5efc33"
    ],
    [
      "48ac6a80979fab4912cf0cb557d917a0bd68825d8658ec100496eaae6ff62e1",
      "2b6931350ab183402e39476340eb1177b7006f7a552915581e29a79bd7203a0"
    ],
    [
      "e3adf9517d92ef22d1e2a787740a292ba32d5ca69faa9e8675f63ed816dce5",
      "36bccf69bb12dadd610145a3399213248d193660d8dc90a2e206f23bf2c7997"
    ],
    [
      "5e6c8ae5afb2fa470f767581f3d578cf6a49547e4b78665edfd45776948bef8",
      "6cbfc11953dd7e195d2ce74e52a60df524767b44c4608bdd755be4bc85eb74c"
    ],
    [
      "15a576a1242d39300f0db3ad770983825988da0457718ecd596c63a0a0eb4a6",
      "69a42e5f6f5a63349b57683a4609bba90f556a1680fa1ec3b02ee7d3211f903"
    ],
    [
      "274cd14e4fbf2ed07402e8ad8075b320c5f76b7ea45ea36af523e95ed63ab50",
      "6ca640f9557c5f2d8b27f6ce95b108880ff4e4816b26b70b6506114389ce656"
    ],
    [
      "4d8284e132e2fe81c5f71be1e3c79ab51b229e2c56c323e207cda179999d123",
      "116cfc00e9fbee1cf16af6282123cdf20eed13021c2037ef4c86f94eb6e6cba"
    ],
    [
      "4056194fb5643e97991942ef5b63cadd89080bf57a01489c4398aca03f0980a",
      "2e2cddb434fa6f6da7859c3d518f0ced8795eea043a6c9613fb3e020103339f"
    ],
    [
      "5d119d5c5ce532afc0875e0ee9b026d878c8773d34237f90a0d0670da6f01b3",
      "4a79fc025ce076b6a4742fbcc8cad313d0a8220c58024a41a5a674c0947e64b"
    ],
    [
      "11800ce4061d99b9d53fd4138802335258f7798c5a935c9979f5a949ce1d483",
      "36745a4741a5c7290eaa8f2a3f9ec955ccb7ca323272e5d35d35c2a724ffac8"
    ],
    [
      "4302525bceb97fa642fd5560a4a39fba3d2c06f68e6aff3332ff1854439ebb3",
      "e31edfd081ce82f8177b2d7d96e69851d09e908c2517114ffb37ee12c0ac64"
    ],
    [
      "2f5fcbb96f0a66fd3bdfbcc78bda361cb812570f50e7c476533d56eee01c0e3",
      "527428a34855b5695c479d8fb7e831a299f7897f36682a74169cc60d160df2d"
    ],
    [
      "52167df045ad0dc999b98de3d035aced9da4434211149b8cf4bf20e774580cf",
      "19051d2a1ad3fab190c5dfaf45188b49b4e90cca22aae54f0a785562d3d3f41"
    ],
    [
      "541b5332491dbdb2b6f6bccceb7634970c046963891fae936dd950f4432b961",
      "78fa54da996a51e3a9c06091d58c2405a806649da2bb1f323807c4eec50eda2"
    ],
    [
      "5f11e973da659b7738f87ca5bd4f3bd02207dd3c8d978f0d3e83fe81030febd",
      "137aba7027069f62d25caed416e13537687bb1428e71e5f0a0c52d52f2e65bc"
    ],
    [
      "15ec941ee6c2110b819b5541be52981c09d83484c9dc735c43f39f5778718b4",
      "4561826142dc5b56acfcf605a78a4090472bb61235bcd605a765e05d0a7e549"
    ],
    [
      "68ba398736d659522f484406110b43c68158bf4992094acf797a38979c587a4",
      "7c1d9e1702e28afddf22fed7a7a79df4315c174d0c6c4f4c75bc77d9b56777f"
    ],
    [
      "67889cea31c81a429fbae643a4fce0ecd690a5c32b99397e39ed6d7a08702df",
      "7ea277c80b671146c9e455b98f42f45b941ac95ca2d15c8fa9ea82ee9b45e01"
    ],
    [
      "596f2c68390ac26505d3c2eca5c77d46f8f3acbed192a2649d8c525a58d2334",
      "49f3bd8c62c610d5c19c52d970bde24b270c4ff7ae900453b909e72483974a0"
    ],
    [
      "567779fb8b0afe592cea284629e3621ccfae3c4d7d3dc559c9fed750591a395",
      "6010bdc33f1cdb374facefff537e7910b72a1120502f312a7ce41df0d552ddd"
    ],
    [
      "cebed0233e810aa6a29a8b0829d28f1c92f303d14dd73d6b12da98117dfc7",
      "4bdd51e1192a00df23aa8d0673e4915877ca41ddb8c9eaf21d39dd167fde7b7"
    ],
    [
      "4c7085f066adeb6781596771972b188177e63f2e2b3788d03e033cdd5af1f06",
      "2929ee89f525862b0cedb3ab9b5166e1680cb77fb4668f10a6a3d76b5434566"
    ],
    [
      "760e341bd836899c226176f47685f69438270c150c6fe7744cd723cd1e72359",
      "1bf09f2f1aac1a10ce8bdf20d5d178db747f01a4aa0aa8a5e4bfeef562cd94e"
    ],
    [
      "6016b94c00b54920027ef64902c61478244b1936337d2ad41d9a8d43dd6a4b2",
      "3bf3dd9bce7f6d6f120de87fcbce6219340b59c2c1d75ee0d45105d33aab1cd"
    ],
    [
      "4929e44ff692eb944d1045bee96e750219cda3bda0500029f0df49a1db30b5b",
      "2e138dcbd092242699004b4ce98764ffe4e892841f56830af298581cd1e523f"
    ],
    [
      "5972d0e526311bacb70a04e88969b6c63c7399b578f0dc28bbd00d65ef01da7",
      "76b22bca9ac12d26530e7b0757e646beb3bbc5680d0f3f82fb8ee57ed4b5e39"
    ],
    [
      "2ca0a42a26e26934ca2d48db960b4719113d87c5e57fb437d557c5eb4e03ac7",
      "62778c02561d4ec5d83a132afd7763a8349207c6b5d01fba70b56ba660cba2e"
    ],
    [
      "5137ee53f076e21a2c23da09f63c0d275408c31e4634a6b6373be5cf13e6c00",
      "14fb446c077beb78e04de3282a63bfde12f9af85caaca4ddfab506cee31c0c1"
    ],
    [
      "7d944853d1627b63f560aeda33acf640d35a4ee4d23a744957a2dae9d5b7c6c",
      "bcb411a210710acbcb9ea12680d89e3e4e652228b6786d3886e95f4d9e6970"
    ],
    [
      "37d412c2ffb173a728477446b60b2b702d07a5243cb5fc8963e623a5ee75843",
      "672c79968908f92cd0cb0b4c65ba86e8f359b015623a89441e1bf859bba84cb"
    ],
    [
      "5b37f472aa80398bff12cc74c8ee784c4fc89757292580d3a498bff17e9f114",
      "7d79da1aab9cfef58a5f3d1c9ec466956a45f8d2af0c1da6dd4c93f720fae6e"
    ],
    [
      "25c09b3f1188c562571536202eb0f5fc4b9a7590417b8ea58b4343685d88a63",
      "3d5b817c73b37e9a1d24ca923351359b42ced2f3cafbcac8c2d6322dc767bb"
    ],
    [
      "32e60904e73f9756f71e0a918d302aeca17cad4acacc81bab15702ab5ff78f0",
      "bcf4c0204f8275072f98a65b09ac58b87cdc9c70c4edfe99fe18870a3a5459"
    ],
    [
      "49c35575996c1517d2daed90d2fe4a58e674d6b4aaa7288d0642c8bf59e562f",
      "57eeee00adea4ca80eeabab57852cbf03f1a57e21872cd44221e0550b9193b8"
    ],
    [
      "10e1776b4c2a867bf1b028c6edec224cc6616c747e272f49e69b67b02a893dd",
      "8d45d62ec8e627b56950f2f7622a0438647f9e9f28e723e4a37cebc039a1b0"
    ],
    [
      "79a93a75ecbe943acc964fd39ecfc971dc6555b2bc335e7b53f52f4eb16cd36",
      "146132a68ce2ca8b48363612226771ac547eb3cf52b6eb7981718faac08aa3c"
    ],
    [
      "6b22d32e0590e169504e7f19864fd646d0994e7ed3e578a5b88f6e095913439",
      "68c3b22d859fb85e5c8fa0a8aea932285945b230957e603394333e9ad5acd82"
    ],
    [
      "71ce5ec8286eb8c93b8481c6d19cf0a288ef4da4397e9c80f65023e516bc097",
      "54470babc742780cd8a05499026e738ccbf81d4170d1731734de68a8e5b402c"
    ],
    [
      "27beb13a43bc6a1f6ce046da438b0beac5899ff4d57962dcfb6476b563f74b",
      "14074e9e93ee45394dfbe833998b9d1691961f8ba3166224b36404448c61bb3"
    ],
    [
      "6b1de6c8f161aa6509a1dcacf2c0aa1bcf6ee9d9b40e032a9d72f77a6fa298c",
      "5e9312eb5b59d6cbadd7d3dcbc39f1b5bd9a8346fdcfdf1107bada6f9cc048"
    ],
    [
      "32670fc3fa43bf39974ba72ea51f0d045d92d084a81fe5282dfc8309aa900b9",
      "518fee521bf1af62356aac3b7e53fdbf57121e030c6e9572b3de69912ca4eb4"
    ],
    [
      "4b9ca363eabed9c66091a347375f7065cd28f49f914447de7cc1461f1375f1e",
      "3a1a3a2e5e7e72476befe2571ece708052d740d02cbe6fed58740968ae609c4"
    ],
    [
      "4cc6da42863a3deca62fa218b7a3b50e034eb4bafd393eccba3f4cbe192ef10",
      "20bfa683c884f203713953b26d2821287ecd305fa2cb70570474533fc07f918"
    ],
    [
      "87705353c44a5ccec8de65cf5433be6b3d9bd21eea49b60e6c907cf1a67a6a",
      "112804b13eee56e3b01aff75fa08fa8374c44fc461aed8a30ad54acd09c24eb"
    ],
    [
      "6cf6eeeb9d339c0a05f72fd5af73fc7588e6d957100ee8999109437bc126cae",
      "54fa257cea22032eac272fcd034dadf2e00d602ef9e519cf7072023c130aad1"
    ],
    [
      "19b32925048c5519d929650c833661b452ef7be7963fab0b6b328ab7dd7a28a",
      "1bd0c14a10bf9b88ea61011c0b2e64d07da151c6203800d5a5d12063838a510"
    ],
    [
      "12a5fc5559428bc3b4eff97b21b63668b866e0722807f1db1f19696bacd9b0d",
      "4c2eb07f0c24047a3d73b560144f3fd32c99d6dbd9fc7cd2fd2a72a6e4b24c7"
    ],
    [
      "13662b7a7d390aa76eb86a7c3bff6d9913eb28db6bd1a7c42de5cdad2e35ce2",
      "40626aded7f56f82cc431ae30527b096f57fbfbc04d3e12a5abae3edf301cf1"
    ],
    [
      "255825bd49b8a2cce114360bd9c8fe8c641af64c8e7710107213cfcb006f43d",
      "3619cce4482335232f9e76a1460be9d296f2d468d26e4f95a78c71524fe59cc"
    ],
    [
      "7f83009eeed4f12f54d341bbf06066480cfcdf51dda103ac54d4bcecf6b3b31",
      "4269519d28faafd7fd68bebfd8404d71ba05d62c4bb6d65d24aa6802fb84ab6"
    ],
    [
      "2f325650eb316646b4eec903fe44828fcb11054f1bd42ca3a77f7e734110b35",
      "44f976082271016f9048e22c507d97d628722bb431f8d5cc1890524e6c386bf"
    ],
    [
      "750b166bb6edc0ee80fae39c7c106879036738df2d79fb2294e1c21e9a24d6b",
      "54f8aa297a1afafe2a17a3254f45861167414327e918d17003c6aad01d0b24c"
    ],
    [
      "3aedb10db9cf3285cdeee375879396fac1fb50dd259e1716f8c01e66f67ca72",
      "7feb9400f621f58c21601f23b7ec7c94a9b6b193c1cd74a8a60846aedadd359"
    ],
    [
      "4ab7151702de76faa493e7a0b1ac20ee4d10c33b83fec9477547cb1236973eb",
      "63f1f122e3ef3acc46b0915ac69c3f5772879799cad889a817f55f5853d1235"
    ],
    [
      "1675ead0d20e5bc3a7a7331999a87ac4c916ae29669e54197bb02aa6364520f",
      "4d1122da90d49e491922d9b533a6a668e2f65a2737ebb391ebb29fb7c1f8a9d"
    ],
    [
      "2f7148111ef53c613157aeec12e16a20f13481da4390b6ce18a85d1d8547087",
      "2eeda779ab395597651d2a0b833ccf53b10280750139916ae2baf4ec57c633d"
    ],
    [
      "4439c7810e7b2ba772b701ec3acdca0b80c9df23047710b87f7dc3f13b337d3",
      "5029cfe704c602a8a4662af0a5860ec03fb88f046d0e3400f2ce7638014c621"
    ],
    [
      "2248eec40b5732a6a488b681f093643af7937071bc73118acae295a32b51b05",
      "1577e4aec30a97b648de4d0b19cf8891151b4eb11f8de9c6d7312f091552e19"
    ],
    [
      "4738424e558d4e0d87a3124ca02ea24f0adc6b7a9768b0d3945ed2a6104857c",
      "33576f92aca3f0c8ae689c3c274c2de6b918940d86a6852e02fc99e35d1614"
    ],
    [
      "7829edd8b866ebf7baaf604ed13d19a9797578f44bbc51b1cd67ca53803e96b",
      "5559040a6083f2af1f9133ccaf5bc2ce06e56ddfc7dd410e9635c0116b62722"
    ],
    [
      "7f927b881f2cdc05e1a69e40bb714af47b630d1425f08ab5d574ee698f33d51",
      "26a465288e96572de303203bd38f4a03031e8158da0591cb037c0a5111d1056"
    ],
    [
      "36a65598552f8753580d1655417d645a140966e10a1e1663015f9fdfae44881",
      "33d5bbfaebf59eae72b89b1aea12ab2ba3c9617f8c3baed1ec16bdf668381b5"
    ],
    [
      "403becfa545c826782026ff409cc16c9d4fe428f1b5b6e630c92439d2fa5fd",
      "47bd6f2bf5d74f710ecb479c79b01fb774fbdad590e683a415cdedf33f71dc5"
    ],
    [
      "3a747826d241b877d3d56b16e0b810cf088eda4fd6048da174c9991a942a5eb",
      "2c7ba19b0a3486a2cdb84d4a388d34beb077a0e467ba44590166f93f6a09d2e"
    ],
    [
      "3d60cd375842714b37bda89dd1f13a7e0f3ff133b522209617d031bce05a537",
      "f77f216451ab01ad5226844d2162a7f32744688bcb4325445539e2ce5cec4"
    ],
    [
      "235bf66f67c9100e7f0e22bb299cdfaa603644b240e0770aec7e7fd163e2a65",
      "37110b3fa83ece3990afca2bea8d5ebb3c7aace60a0147f8e6ab733e2f2b4d5"
    ],
    [
      "3b796d4eb69a55471fa86108f787b3604874e92b6887a7667a6c2bfbbd9a42b",
      "4912d6dc0419732ef82cb3278415851d4e2d7ca89e0f4d7128cc9de51b810fe"
    ],
    [
      "48d53516dd51e49faa7ab46c8c10db1befd10f23c6a9d9bc3640a2f0da44518",
      "73a2fb3d064adadf21aa1362c04affc660598f38a9e069b3afb74d0a99ae9ee"
    ],
    [
      "48c32cff161ed145da0d5b73084897647abb777adf65738559ceab6939cf3e0",
      "3d99308978e828f857c382df32b472bda81e8ec8e30c8844077ba6d6d2ba903"
    ],
    [
      "2947ff091a8ec9684affbc9a62e09e598841c4a6dc638088492aa47dea57097",
      "19a2cc97975e547f97a4d02e42f89e6ced6f5a953cfccdec347867d26926541"
    ],
    [
      "1960d85f30475615f82484eba0bdafb7ea7cac3809f0518a757d66f02b01676",
      "36c8f77baabf0cc8805d993bbe62041fcf4e3239cf9d53278a4fbd91e75eeb7"
    ],
    [
      "2765f28074d21d5a055340b6d40092d2bbef807e02009fabfa08ec0b9bdf38b",
      "7fb189e0553d5df52b6843661814824b3f3cbebbd54988f042fb256c6bf30b"
    ],
    [
      "348836cb2aaa00212f4b1a4e2d7fc5417f246bf2fe5c9a16ebabda449e2e08a",
      "3f7276fd7d69e0d55ce5ee1d2d830534a27227fe0b6d8a36c93f9a78b872969"
    ],
    [
      "7afb9d34b6a42ea8c6d870e4b8191c274201dc1f93a1a2219a2392b7e345a31",
      "42bbc20dc7115e0758b364a110227b16b64ec58fc535ce5ff1a9ad8b8a09fdd"
    ],
    [
      "2cae0c2afee1767fd4c66f52e1f176d217e92e89cc19eb36d5a6c1715f641a",
      "5335efe2d9bc3667d25ea88bf76438a4d6ab9ba5c512f9da7d0529b79b62d83"
    ],
    [
      "1cc5fde334707723c3a06f00c106db88664284a2df47bb6b144d9f960aea3e2",
      "dbbf610d100316938bcd8bcd078513512ecb50d4579690dbefaa419c05980d"
    ],
    [
      "54e90cb8f3a2998d2675c5780679e06c0556b1e618f8fdf07f9a4b2466fbf1e",
      "16248676b6f06ec5e34994bc3115f85c8147b54f34d8500928f2fdc051e2089"
    ],
    [
      "525c70a2ba0dbdd68d75640f47f13d0d415ea595f7030f533f4625c2a46523b",
      "58292c8675e5e1a438f49e0c05648d9a7aa997f2f1fd77d5de1944afe5d7eea"
    ],
    [
      "54726d78d099007393348787a03107ab492e59690a46c87fb02ec554f2353bd",
      "53b54b77184ba75a3391e0ebfa6d6974db028f3f8e34bbd5460759a5848dd76"
    ],
    [
      "4ac81a66903537769d3aac6c483ccc08535cb767b6b5e1ec8017a7393ab70ae",
      "2cb22b77a8a05d26f11a4dec80eff292633aa05553a889c5ab16b6ac6e2ab17"
    ],
    [
      "21d0175349e21114988a2930b9a607d43245783cb4a0c984ce27f4c4206708",
      "59f1f49342cc5496213d3329bf4ca7fb0044337449c579bf53147a1dac9e67c"
    ],
    [
      "167f821b381f4c8adcc39789475fb55ba639e5124fe75f26dd61be396dd5e66",
      "22002c87d4cafb47ac9d27286d5cf5ff7a6715d69814118269b0729be9e4b3a"
    ],
    [
      "31010666c6db83a9f9e4db4c48173afd405783ac53852a6e38a8ff925528843",
      "1f466dc9b5d9094107c741dbf380f9fd98d8549cd50f67169901516f8cce74c"
    ],
    [
      "1ad3875769a5053388a86edc85dd80fdffbbda6a456aea497ff81a0f1f6707b",
      "2de7cdec5e2bad56a71bd2f33a4ae4c874e1ad4210a6ac32b443cfa34e85b1b"
    ],
    [
      "c489650fb7f459ce09cd05a456fc5a46b849b38a671298ed645bcdaab168b0",
      "45610d092b8af1c43ceed474cd17f7bbee65120aa6fa4d37f949e7e41f25327"
    ],
    [
      "394256a5ef4d7af5459587a0bd2edb8acaf5ecfef2563c9a04daf34a4abe4c6",
      "1ebee390dae1403c0c53994e1d064fa64e20fcb45392e209b2b99486a559ffd"
    ],
    [
      "410a1511fead6151e9bedb089b9832d0fe01fab76d3f8459929f767525aeb27",
      "361f0a5ffe09fcc3ad4eff3f5e89508ac247af80267100b69de3c59df561cfa"
    ],
    [
      "38cd437c9f659e110a869605c182ee9fdc26de36baf559d9229e258267bb734",
      "624b1128ea7739bf1cbd0e423af92a4884323c868d2ba0ee9d362946edee2d1"
    ],
    [
      "78b126e50b7042d2a019f95cb87a3213c664ca1bafe345999b1e9e2dac1e608",
      "19e398196b22f4488cbe854c614ad8c353839abc5ab3a4f3f5c03c16ba8a198"
    ],
    [
      "6d3a5ce91132f385a91823c5c8046c4b638f5fe63357424410d901457cdb867",
      "7b80bae16d2d487e122495174f7a70992bc5dafbed72bf84127ead7c57302bb"
    ],
    [
      "32d053a904dc4d88fbe7d0b96e0cbeca22a00aa5c79c753d52b0b60abf31602",
      "3af6a02e5cae6d6490354ae51185149e3fdb6d0d9caab90e95ff58aa0c40377"
    ],
    [
      "49b1fbff5bdb0aa6938b066dde0ed772c0d81f9eff52e7fe038b0ccbd78adb5",
      "1c6e57834eb14d507eed8b36c81ddf92fa91c242467061927a742fafa82b43d"
    ],
    [
      "2f28b8994ca6f234d9293d26196b43b9d1d5306844348c4a638102c05de85f5",
      "759cfb172eab065d477248b3569f4ff5791055f01e95fe71b94b8e615d73c96"
    ],
    [
      "3c2ee954ff534f856f59188fa0f29ed8a022aee0cac52d634f6dc58cd514d70",
      "22bd162e74925f0a876bd8a206b8767dfdd7c898576a73a490f138d9a7f99c6"
    ],
    [
      "5763a7cab001e1aaeabf9ab5b9b2fffe6cc2b299ab04ec4933da74d960e1ab",
      "715ee4f8ee93ab5a1dba00f0a6abc4eec47d49b61254cc27fc36a031e32f0f8"
    ],
    [
      "19976ad8d7b7f47c785408243a227401996b36e47c7a78a7bc7d4256233ba9a",
      "896b713c5d7777b0703821a73c1d9a4c3755501042120534ff13990975e1f5"
    ],
    [
      "61674b992c29827186cab5ff454758dbbed8e89bc23d0bd33193afccc3a04bc",
      "38e1020744c13903809ea30a0662fdb5226ae760cdcf10800faabec452e00f8"
    ],
    [
      "2ea2d48bcb83c0c9cda4efe11f07165cfcbc9ccd26526e5fb12556316d4b1df",
      "1d2d68b74ad384c5c4a9c85453104216357bfcdf635680b40215f0f800974cb"
    ],
    [
      "7881212050264c40c336ed3a15dd2cd868ec9a558f5b728869eab66e8b8ed54",
      "21aaefcc8ad8a161b8971d6880321781dbd939570c540da4c330922b8c81e9b"
    ],
    [
      "b6be88ce0461d20f59c5199573cda0170b61decf6e8e69a6d32f1695adc4ed",
      "5536e4808370716f2bb3423a9a49a38ddbfe91faf3b7a35eb53d3519238b6cf"
    ],
    [
      "e5972af1655eb6dde2e8c77cc58044299922441b5ee41ceaf5cafedc765bcc",
      "550282f37a4783dd60801c237045992d6fbe82a5902e7d837ea25f6f98c7b3a"
    ],
    [
      "7efc1aad1f580d8f50274f1c114c40056be19a8c96fa8c4cb5bf85e1e7f3e4",
      "2689f1c3898b114d668be6413643ee9f879913d40c262541fd0316264c60a4f"
    ],
    [
      "7939db98037f59b0113e9d60051f75ac9c3cfd1a3eb535c73e2d945068c6c5c",
      "410914ca8bbf3c65cdf3e9772ca790c19131c50068d34b7346c10260a578a8e"
    ],
    [
      "225b77ad00a2b83d26690190b74867326eca4f55bfbc3a13be036225ca3b1b5",
      "411faafef89042ce6beb64309fdaff70fa53e9d32d79a21e7f82f80e79ff05e"
    ],
    [
      "1501e64c99c8b6658b0479f2c05c9142d246eaabfccf2fcec8dc4399539d8e1",
      "3bab1e3339e42c9ee66c65b0b20236fdd9362d3ce786ad3a9779ab578af50a8"
    ],
    [
      "59b907b941f24fb8ea2458153e55f07534b388e835af7b69f3c9f54392a335",
      "1d5438c4f2f68a417f3d56f916d899a6ffe910f5f2989ca31687f1b10f60db8"
    ],
    [
      "2887d08a26f484546f360e33abbf7a998b7170a5b30070938b84f072c676bf3",
      "62a78e8d00e5d3a59e2fc424ffa08961567ba1ef24c8531cd7bceee6074a535"
    ],
    [
      "6e3cc8076b3d45377929033af35aab0c6d19ae4fd47c0daf844079ca04c46eb",
      "7b90f338e4d848aa8f19d0b5c3bca916a2a9024acbf14bddb278bca2aa39e5f"
    ],
    [
      "34844dacdd3ec54a3af328bb9d67715ab33425e194ac9977ca02ef22e8f7a88",
      "3c1affc6372f32a1634748124f9e1a03c4f0c993971da0dc28888b0801279d"
    ],
    [
      "436b192e03a49796cf9bc5e93c88268b71c9c24f9c3a85322bba634ebea309d",
      "67a8091ef69d62abcb28ce5df4dc7d53f8dc2b9690344f75ecd03a6d9386044"
    ],
    [
      "592d25b68baff87a6d7fd41ff0dadbddc1bd1316683de3b2d677501c0eb14e4",
      "27ad1e1099683f54589010faeefb19e38569ace43653be8787a42b0591e7bc5"
    ],
    [
      "89a5111ae911512ba62e87b97f643c0219702f235c70f62c6678a129302009",
      "557fa3d98e9ce7b83b47545013a4498f3de43787fb66b1a54521222242f7c1b"
    ],
    [
      "1c9b5e53377e72da5066cb08566bbf9ec31ec1877f455d932cd9b1aa375d34e",
      "72f79555a8bc207863f32d482fca54692825449fd8963fcea3de3a8183a739a"
    ],
    [
      "574a6e05eb14591729515be239ea8c1fa9e12d4049d42876f76c8ff37bca03",
      "5f99b3af43ca68c1c73e8190d5f73c8de162ba643d7d5f0cd73cfa8135db6d3"
    ],
    [
      "513fc5c2e16505b2b25a2f284e167d5401194bcac0dc3ecf8b7c9acb560daa1",
      "687ee7a1a8954d08d3856e1a16ded808e419e789736d3f55f79f7693bad69f5"
    ],
    [
      "53d48bd1205274b1c2b0a0ceb3d21c5fcd7c8892a784931603240b288a598b9",
      "35387abd7ea59c9b956de44d36533cad1f6668c438d666651695ff3862159be"
    ],
    [
      "213eb1ea99e08825110dd61094eb6e8145119dc1c507636f068730b1e086d44",
      "744f6853f4f02f4f042468d0739e0c9f64df720b87ed77d1979547084ef7a89"
    ],
    [
      "735ef017d091ca23264ad0aa7bb9b2be3309b4539605e79ed4a652ccb2fbe3c",
      "7f0ccc7a5747c4e921fff97d431169f690763427e2cfd1ad74d7a0308d7faa9"
    ],
    [
      "3f36babc5a30070b610ed97db44997e6d9115c9c0579ad8f75d295a17130001",
      "79047908a2474e32d5c712a07bf5c4ad522590bb5d6cefda410d30528e12ca8"
    ],
    [
      "51c04907ae88a5926b242fb2862cb1f2c651a94e6caad5bff8601c079fded74",
      "10a585a269f460aed43f54c7de13cdf623fc8de5957526997278be939ef32ad"
    ],
    [
      "c1e1bd626a735aa2c065831317217ecce68e377eb1f67e54ce2e97bc2ef2dc",
      "53c5af23a9b482f420be6dfd37b6886154cfd130794098e1f51c1885ac2556a"
    ],
    [
      "5aff3b30775ae4758e604a4a6262803a545f5ef4e7855fa245ac6a6431a9ece",
      "39a4799e5519047f29333bee9c86c99bfa8056d4aa381c396c4a44331fe795f"
    ],
    [
      "3d753e9723701a8e9d99b91bb93dee2eda7ffa5072fb2cd5c5fd99aebcdb299",
      "15798bf5c17d6d5880fed1553af32dd8d8baf2888c715a886575448a24c7975"
    ],
    [
      "6593e5078466b07a4222d2e544da826d2c583c9cc5f2eaea148b129b00d4aa0",
      "11b352b08a0a61d3cd67d1dc08069dec3bde907b3da0f56de5011b956bf8744"
    ],
    [
      "7a6eb353c5be9ff03fe4a06c01fb71aad2b38144179a291ebcbb2c2417cca65",
      "3de3ecb12f2fa699b46a9d399abf77ca17bebc3e491bfb2542dd0fba991e2bb"
    ],
    [
      "2c7ead583d6c32162091034a9eddfa775b4e84b8bdbea939edb2a80dcf64f6",
      "461790ce40d9c276d962b2a1e9a74d66e9d7335962e234e8a2fc6963d31722d"
    ],
    [
      "34285af023d9b4c2c2b88e8704bf2c05a9b553b00b2e70ff05f8c2970cb134f",
      "33fe678e7671760a83836107428dbade68c3593fbe568f3f8f1b2c568099c44"
    ],
    [
      "6222f720a24466263db6a11842f117fc4bb78da6705f140e48869db3e087441",
      "6eff5b9bf3aeedc962bc5a24b66e7bdad2153450ed53a058bf2c8dbf2907693"
    ],
    [
      "17c6ec5ea206eb97cbf53851e37ce391080e0d2bf1e5395610f79ab0503f7ce",
      "3adb71ca3523d88ceb1e365f12dfb24895453c14daf0046b2626cddadfdf5f7"
    ],
    [
      "70859f9771a713e54974ce11cdaf44b0dcc3e9befa0c0834908d877eeaafd27",
      "d18f794bf0cc0623b711e7450030424e52326c45ba9b03341883ae4828a5f8"
    ],
    [
      "2a820cfd0fd4ab0871e7b303cd545a3086caf8fa818c087a4017197da74efbf",
      "5f992683ff37f6c041b84bfc01503d333ac9763505cc8f69473da01812969d1"
    ],
    [
      "5b0526de2c07fe7cd73e3884f642d57a0ac5e13c68590ed03a14e530616e8c1",
      "eec69d0cbd92c9fca31ec967dba848bec368e792d6678797946a5e34fe3487"
    ],
    [
      "6cf6b3efee707210cb3a72f1e885c3d0953aefb43e5e148c740aa1641725c61",
      "911cb630b898e2c1a9115f9e45bafe3b819edfb1eab6e15612d14289939984"
    ],
    [
      "74e913de55f1e46143cb2ecfc580f8d3d3908f200281322b84e21c989cda293",
      "761d2736c9ac7670ba905bc2629c6c0dbe988820a4454ff415ba68710f7df92"
    ],
    [
      "44084305e0c911a40b7cbefe5f13cffe9a99375d1a584c4a2200958050af7a9",
      "249c83877371564708ea525b64b1e7e12785460d83364446531c9adcacba5f0"
    ],
    [
      "2bf71ad4d1bee1a67fb300477029f54bdb0e09f78bf2ac2e8afc7465a7adbcc",
      "6244dd6cad282539049be57487bfd9900bb0d5da805d02b535096368fcb4cd5"
    ],
    [
      "3a62d8f763b62def36e4089458046a49c5ecb91b861549530773e0548ff2bb",
      "6a10a03ba61e6ac657270465c09aa9526cf1ebe96bdecdf0e7000476a47b9eb"
    ],
    [
      "284eed3a17c51e0677d4fe897f056abe9def8af07a4630e6ca5723e2aa6677",
      "516a06ac1d5626ed03d2eee9de6f60f0311eca703a99b0fb31b9c66b01c27c7"
    ],
    [
      "2a2c63b16cccd685f731d06fe93ce2cffb358d34d03dda9a7368185c1eb0c32",
      "7180baca0ba81284809f92eca1654cd76b925a9242e5d5e0f18d0a55d13c6ec"
    ],
    [
      "5f9466017ec09769611389ea5370ad68dda936d3f5816c9e928ff9574abf9a7",
      "6619b5b145bb5f4f29deb7a4cd68ef4da3995312fa6537f0d01684da4267ece"
    ],
    [
      "74f229babe01b4962b3307589c1a13019134b1db6822698388bebb55d21c30f",
      "156ae857ab3279f754facba0db36398dffec8c31e5e160473198f2f891b7531"
    ],
    [
      "334b9fe3a5fd99bc966ddd1309698fd32afd1f235062f2c275b6616a185de45",
      "221a60053583cc0607f6f2e6966b62fc9dac00538bb7eb1148e007a92116d2"
    ],
    [
      "7ad710ba002a67c731efbaba2149d16fec5d2f7aa3d126fd9886172e9f4ea30",
      "3a10f8e902a7a13aec94d66415347e1314f9bac83a7db176096b809b25ffb86"
    ],
    [
      "4306dd0a184a3283c3097ff8f7434cec80912e9dc04b7df21ba73fda9f8e6d8",
      "6d42bd3d1a8dbddafd09e872e2aa3891ae79ec939dc1b382196bc21c4ab749"
    ],
    [
      "1c3f2124e1135c32a426d1d14e471edd9e0f2c7bd703ee123cbbd608e8c4be7",
      "3cc607a3c3f1ab68dd5fa56c65996002721b8ad8ad4b0dd9e5b1467d316583"
    ],
    [
      "294af33272ffcee0b56a436de1b73759cbddebef4c07888b42c2f92b0b68e1",
      "d837164311d5dca8d37b99ef9eb22708643c83d1cbdfe852f63ea07b06fbad"
    ],
    [
      "753bdb5439a19bbffdfa02b1dc24e8368f22d0a8276b109c11e6feb26f56f39",
      "6ed396231af93647633eab467f1a034f38e76823eb85baf97cae56e2dcd9f75"
    ],
    [
      "5674f0cb892b733fc0b50e121d8679afed0a925c32594cc65ffe83bebe7748e",
      "7fbf0325dd38dd94905adab2c52758552292a6a103d9edfcb11938828e828c8"
    ],
    [
      "4a8f053573a0a74251059d0229d89b6660407ba0b491779fd10f87a5117c81f",
      "21b70112485398bf67ec9d733df24a1df30dea718a93b786f41ed04e3ae3c5e"
    ],
    [
      "726c01ec4a08df8fc8de173311f50d4f3b97c5a9cf68c1536146f827db95ae8",
      "15013cafadefa7f1c4e4dfdd70bd4d3979dd18bd7f0332572ce2a3fd8773d12"
    ],
    [
      "38ac0fbfa98937257460db7e6645d7e5112b6fce7234813fc8a704e8ade8da2",
      "73c0109f86048aad08c443f781ae60ad13b99f7b9cfdf3128fe6d6eeb799a7b"
    ],
    [
      "6f6d3a38621582ace092eb50ecfe9eff265df141ebdcab8653299116fcea291",
      "4a1bf3f39bc919c8f1b720a0b1ce952cad17f2ba98308ee6b76dd9b6f3d7b75"
    ],
    [
      "6a307fc28e1df8d9ad01766419e097797d65cb674436fa1c8f012d3de2c2a1f",
      "26911a635ba824db004875d79dd84834a97ac12643e42829015bf88c1fd6f05"
    ],
    [
      "2a74860e3336d6db916555894cc8028f41508812925db1925457afe40257155",
      "5f8da573f4c39816ce2dba8a20224223a7cfec53117ec78973930c0e9b60244"
    ],
    [
      "4d2b49e1ed0799f719b8269f092cb489a466a645bc0ccabafdc678864c176d7",
      "5410083df7d256f18cbf5697ae5e52c31e075d8a3b27e21d6f5177ca882f6c1"
    ],
    [
      "110ecb9fbf6c333d168cee473cc5ad98809b6cb9eb5d1f6cd28ab5fab504fd3",
      "7e3c54d7533d9f8c3310f219dab0cc3ea4d39b418a748eeffd6bae2b8637a43"
    ],
    [
      "5be4d711b80da70e6d3ac493250bbfd16f20b25f31919b3a91cf14ffbac1096",
      "7f55a0919f082e8885f1515e83c5b39b6022404503507498e1b4422d79c43e2"
    ],
    [
      "2605125b95ca4ba93a21cbbba5762898a7cf9e988f07ab9e64cb3868e3b139d",
      "62f0ccf55b9fc0eaf9736fc8ee484e2acdbe259813af9803cf815829a5e9d3b"
    ],
    [
      "1092bbbf206f2a3068167c3dd99a72de31e206f6c504c071c8214d105ff814d",
      "309f489f68a62089f53b96df5d4fbc3ecc5a1a42eb7ece0e49bad17ad490ff4"
    ],
    [
      "2abdee9409d9c92559ca3f4e6bddd649c31aa09b90bfcb4a612af491241e18d",
      "3ffa8eac180a29de3f8a69efca84bac046f921f5725e96a6ff0530be1436aaf"
    ],
    [
      "376313f27d00bb1aae7ec991745efe6ee28c6b50de0c6cd9845cc4bb4f83543",
      "6a8e0a9389ba528b156fa94ac090a895d7b795818d4941c29415d9e2984c547"
    ],
    [
      "a80380c71bd466a696b3f0fbf02817c9459d9798f4f3899cf32edf647fe066",
      "6a09805e814e7cdfc76eba4b79f1df5ae559e0f0aba9f728d3cba4ea5c57471"
    ],
    [
      "223694b921d247d989a79b9b2b2f07496036c40cb043eab074a9d6a2cd2ffed",
      "c247217f1b1df35e30d9e15fdaadf42d6fb0edd3a5a7e265d4cdc426c120aa"
    ],
    [
      "102333620df278c6714bbc880fc087db58c1b9b4d77ed4d61b32a74bfc7c3e2",
      "6a77d37727ccf71c2caeb151faf4404d4b94e9047f9f0a7c3966367f3b53c65"
    ],
    [
      "891626f466536929ee7eadcd18b41925706dedab7528ed5f0f7abf039eb9d2",
      "5f73d11c141c933a35b2d0d06e5cbae614a20d17dc3b439f8bcdc3413c5ea37"
    ],
    [
      "215c23fd3f073f870e5e80303967391bf173f8adcdbeec72d131c557babc203",
      "10634332e9d9439a321597dc5b0fac9ff478834c3d6e281735f21a4a5e13266"
    ],
    [
      "21ea0bdc1332bc36e6aeb43be9071651c27e4ea2eadec636c8d818d4af72a36",
      "3a523d9643dccc6bb9c7c58413312caa3e60ba9c7c7f0177e0f3f469a3241e3"
    ],
    [
      "60deaed1bffb6190beed40caaf2bfab5e43d3707aff7ad3f278d571aa247eae",
      "e41f71ff254c1418e6a66992af307789fe04d6606fb2670900bb1a089fd879"
    ],
    [
      "1e1fac4a1646253fb1332fadc21fbdd3e3a24a840d129400f520ae4116a4cf5",
      "69c406f9f46576afad68808de0ab7e8922b6226af748e721d9097e21f1800f3"
    ],
    [
      "5db0ddcdf79ffe74d6454c12d2bc60b06776db03c75dc413f5be42ea9a91b5e",
      "134c3d6c699841f17306835bb193785228ffe7ab212a01a861c56b086a18cec"
    ],
    [
      "626814e320fb5bea505b248fd1c1389ad586c1cfe04923fe2f83173e915f4f8",
      "7ae407a926e887206a8b85cf485f1f327c9bb8ccbb6897024e2d122877d8ee0"
    ],
    [
      "23186237dc7d3b570cea645282ad4c359731bbfa54e7f036426bf6493812cd",
      "7d1fbab7e61a22d3b00993290d9f4cd5d820061573e787f66c2cff9a18e1eaf"
    ],
    [
      "54302dcb0e6cc1c6e44cca8f61a63bb2ca65048d53fb325d36ff12c49a58202",
      "1b77b3e37d13504b348046268d8ae25ce98ad783c25561a879dcc77e99c2426"
    ],
    [
      "13961b56b9fc0e412e468c385c22bd0680a25624ec211ffbb6bc877b2a6926c",
      "62f7f7792c77cd981fad13cb6863fe099c4d971c1374109185eae99943f16e9"
    ],
    [
      "47abd7308c70659af3f00fafe6837298af3cb530b6c2ba710ffd07a6bc1ae98",
      "75d0c8a7377aa9f0663d0c124a5659750847afabc29e39893fd27534a4a03cb"
    ],
    [
      "2c6276b764fb398fa555857dbe0ce0ec18fab7a233bf23851295739801f0585",
      "5d8f4897ce44007ec5bfcb9aeb78b8f6e1d40a514f72d213c9300d2770d2b8c"
    ]
  ];
  var types_exports = {};
  __export2(types_exports, {
    BlockStatus: () => BlockStatus,
    BlockTag: () => BlockTag,
    EntryPointType: () => EntryPointType,
    Litteral: () => Litteral,
    RPC: () => rpc_exports,
    SIMULATION_FLAG: () => SIMULATION_FLAG,
    Sequencer: () => sequencer_exports,
    TransactionExecutionStatus: () => TransactionExecutionStatus,
    TransactionFinalityStatus: () => TransactionFinalityStatus,
    TransactionStatus: () => TransactionStatus,
    TransactionType: () => TransactionType,
    Uint: () => Uint,
    ValidateType: () => ValidateType
  });
  var SIMULATION_FLAG = /* @__PURE__ */ ((SIMULATION_FLAG3) => {
    SIMULATION_FLAG3["SKIP_VALIDATE"] = "SKIP_VALIDATE";
    SIMULATION_FLAG3["SKIP_EXECUTE"] = "SKIP_EXECUTE";
    return SIMULATION_FLAG3;
  })(SIMULATION_FLAG || {});
  var ValidateType = /* @__PURE__ */ ((ValidateType2) => {
    ValidateType2["DEPLOY"] = "DEPLOY";
    ValidateType2["CALL"] = "CALL";
    ValidateType2["INVOKE"] = "INVOKE";
    return ValidateType2;
  })(ValidateType || {});
  var Uint = /* @__PURE__ */ ((Uint2) => {
    Uint2["u8"] = "core::integer::u8";
    Uint2["u16"] = "core::integer::u16";
    Uint2["u32"] = "core::integer::u32";
    Uint2["u64"] = "core::integer::u64";
    Uint2["u128"] = "core::integer::u128";
    Uint2["u256"] = "core::integer::u256";
    return Uint2;
  })(Uint || {});
  var Litteral = /* @__PURE__ */ ((Litteral2) => {
    Litteral2["ClassHash"] = "core::starknet::class_hash::ClassHash";
    Litteral2["ContractAddress"] = "core::starknet::contract_address::ContractAddress";
    return Litteral2;
  })(Litteral || {});
  var EntryPointType = /* @__PURE__ */ ((EntryPointType2) => {
    EntryPointType2["EXTERNAL"] = "EXTERNAL";
    EntryPointType2["L1_HANDLER"] = "L1_HANDLER";
    EntryPointType2["CONSTRUCTOR"] = "CONSTRUCTOR";
    return EntryPointType2;
  })(EntryPointType || {});
  var TransactionType = /* @__PURE__ */ ((TransactionType3) => {
    TransactionType3["DECLARE"] = "DECLARE";
    TransactionType3["DEPLOY"] = "DEPLOY";
    TransactionType3["DEPLOY_ACCOUNT"] = "DEPLOY_ACCOUNT";
    TransactionType3["INVOKE"] = "INVOKE_FUNCTION";
    return TransactionType3;
  })(TransactionType || {});
  var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
    TransactionStatus2["NOT_RECEIVED"] = "NOT_RECEIVED";
    TransactionStatus2["RECEIVED"] = "RECEIVED";
    TransactionStatus2["ACCEPTED_ON_L2"] = "ACCEPTED_ON_L2";
    TransactionStatus2["ACCEPTED_ON_L1"] = "ACCEPTED_ON_L1";
    TransactionStatus2["REJECTED"] = "REJECTED";
    TransactionStatus2["REVERTED"] = "REVERTED";
    return TransactionStatus2;
  })(TransactionStatus || {});
  var TransactionFinalityStatus = /* @__PURE__ */ ((TransactionFinalityStatus3) => {
    TransactionFinalityStatus3["NOT_RECEIVED"] = "NOT_RECEIVED";
    TransactionFinalityStatus3["RECEIVED"] = "RECEIVED";
    TransactionFinalityStatus3["ACCEPTED_ON_L2"] = "ACCEPTED_ON_L2";
    TransactionFinalityStatus3["ACCEPTED_ON_L1"] = "ACCEPTED_ON_L1";
    return TransactionFinalityStatus3;
  })(TransactionFinalityStatus || {});
  var TransactionExecutionStatus = /* @__PURE__ */ ((TransactionExecutionStatus3) => {
    TransactionExecutionStatus3["REJECTED"] = "REJECTED";
    TransactionExecutionStatus3["REVERTED"] = "REVERTED";
    TransactionExecutionStatus3["SUCCEEDED"] = "SUCCEEDED";
    return TransactionExecutionStatus3;
  })(TransactionExecutionStatus || {});
  var BlockStatus = /* @__PURE__ */ ((BlockStatus2) => {
    BlockStatus2["PENDING"] = "PENDING";
    BlockStatus2["ACCEPTED_ON_L1"] = "ACCEPTED_ON_L1";
    BlockStatus2["ACCEPTED_ON_L2"] = "ACCEPTED_ON_L2";
    BlockStatus2["REJECTED"] = "REJECTED";
    return BlockStatus2;
  })(BlockStatus || {});
  var BlockTag = /* @__PURE__ */ ((BlockTag2) => {
    BlockTag2["pending"] = "pending";
    BlockTag2["latest"] = "latest";
    return BlockTag2;
  })(BlockTag || {});
  var rpc_exports = {};
  __export2(rpc_exports, {
    SimulationFlag: () => SimulationFlag,
    TransactionExecutionStatus: () => TransactionExecutionStatus2,
    TransactionFinalityStatus: () => TransactionFinalityStatus2,
    TransactionType: () => TransactionType2
  });
  var TXN_TYPE = /* @__PURE__ */ ((TXN_TYPE2) => {
    TXN_TYPE2["DECLARE"] = "DECLARE";
    TXN_TYPE2["DEPLOY"] = "DEPLOY";
    TXN_TYPE2["DEPLOY_ACCOUNT"] = "DEPLOY_ACCOUNT";
    TXN_TYPE2["INVOKE"] = "INVOKE";
    TXN_TYPE2["L1_HANDLER"] = "L1_HANDLER";
    return TXN_TYPE2;
  })(TXN_TYPE || {});
  var TXN_FINALITY_STATUS = /* @__PURE__ */ ((TXN_FINALITY_STATUS2) => {
    TXN_FINALITY_STATUS2["ACCEPTED_ON_L2"] = "ACCEPTED_ON_L2";
    TXN_FINALITY_STATUS2["ACCEPTED_ON_L1"] = "ACCEPTED_ON_L1";
    return TXN_FINALITY_STATUS2;
  })(TXN_FINALITY_STATUS || {});
  var TXN_EXECUTION_STATUS = /* @__PURE__ */ ((TXN_EXECUTION_STATUS2) => {
    TXN_EXECUTION_STATUS2["SUCCEEDED"] = "SUCCEEDED";
    TXN_EXECUTION_STATUS2["REVERTED"] = "REVERTED";
    return TXN_EXECUTION_STATUS2;
  })(TXN_EXECUTION_STATUS || {});
  var SIMULATION_FLAG2 = /* @__PURE__ */ ((SIMULATION_FLAG3) => {
    SIMULATION_FLAG3["SKIP_VALIDATE"] = "SKIP_VALIDATE";
    SIMULATION_FLAG3["SKIP_FEE_CHARGE"] = "SKIP_FEE_CHARGE";
    return SIMULATION_FLAG3;
  })(SIMULATION_FLAG2 || {});
  var TransactionType2 = TXN_TYPE;
  var SimulationFlag = SIMULATION_FLAG2;
  var TransactionFinalityStatus2 = TXN_FINALITY_STATUS;
  var TransactionExecutionStatus2 = TXN_EXECUTION_STATUS;
  var sequencer_exports = {};
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failure");
    }
  }
  var num_exports = {};
  __export2(num_exports, {
    assertInRange: () => assertInRange,
    bigNumberishArrayToDecimalStringArray: () => bigNumberishArrayToDecimalStringArray,
    bigNumberishArrayToHexadecimalStringArray: () => bigNumberishArrayToHexadecimalStringArray,
    cleanHex: () => cleanHex,
    getDecimalString: () => getDecimalString,
    getHexString: () => getHexString,
    getHexStringArray: () => getHexStringArray,
    hexToBytes: () => hexToBytes2,
    hexToDecimalString: () => hexToDecimalString,
    isBigInt: () => isBigInt,
    isHex: () => isHex2,
    isStringWholeNumber: () => isStringWholeNumber,
    toBigInt: () => toBigInt,
    toCairoBool: () => toCairoBool,
    toHex: () => toHex,
    toHexString: () => toHexString,
    toStorageKey: () => toStorageKey
  });
  function isHex2(hex) {
    return /^0x[0-9a-f]*$/i.test(hex);
  }
  function toBigInt(value) {
    return BigInt(value);
  }
  function isBigInt(value) {
    return typeof value === "bigint";
  }
  function toHex(number2) {
    return addHexPrefix(toBigInt(number2).toString(16));
  }
  function toStorageKey(number2) {
    const res = addHexPrefix(toBigInt(number2).toString(16).padStart(64, "0"));
    return res;
  }
  function hexToDecimalString(hex) {
    return BigInt(addHexPrefix(hex)).toString(10);
  }
  var cleanHex = (hex) => hex.toLowerCase().replace(/^(0x)0+/, "$1");
  function assertInRange(input, lowerBound, upperBound, inputName = "") {
    const messageSuffix = inputName === "" ? "invalid length" : `invalid ${inputName} length`;
    const inputBigInt = BigInt(input);
    const lowerBoundBigInt = BigInt(lowerBound);
    const upperBoundBigInt = BigInt(upperBound);
    assert(
      inputBigInt >= lowerBoundBigInt && inputBigInt <= upperBoundBigInt,
      `Message not signable, ${messageSuffix}.`
    );
  }
  function bigNumberishArrayToDecimalStringArray(rawCalldata) {
    return rawCalldata.map((x) => toBigInt(x).toString(10));
  }
  function bigNumberishArrayToHexadecimalStringArray(rawCalldata) {
    return rawCalldata.map((x) => toHex(x));
  }
  var isStringWholeNumber = (value) => /^\d+$/.test(value);
  var toHexString = (value) => toHex(value);
  function getDecimalString(value) {
    if (isHex2(value)) {
      return hexToDecimalString(value);
    }
    if (isStringWholeNumber(value)) {
      return value;
    }
    throw new Error(`${value} need to be hex-string or whole-number-string`);
  }
  function getHexString(value) {
    if (isHex2(value)) {
      return value;
    }
    if (isStringWholeNumber(value)) {
      return toHexString(value);
    }
    throw new Error(`${value} need to be hex-string or whole-number-string`);
  }
  function getHexStringArray(value) {
    return value.map((el) => getHexString(el));
  }
  var toCairoBool = (value) => (+value).toString();
  function hexToBytes2(value) {
    if (!isHex2(value))
      throw new Error(`${value} need to be a hex-string`);
    let adaptedValue = removeHexPrefix(value);
    if (adaptedValue.length % 2 !== 0) {
      adaptedValue = `0${adaptedValue}`;
    }
    return hexToBytes(adaptedValue);
  }
  var selector_exports = {};
  __export2(selector_exports, {
    getSelector: () => getSelector,
    getSelectorFromName: () => getSelectorFromName,
    keccakBn: () => keccakBn,
    starknetKeccak: () => starknetKeccak
  });
  function keccakBn(value) {
    const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
    const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
    return addHexPrefix(keccak(hexToBytes2(addHexPrefix(evenHex))).toString(16));
  }
  function keccakHex(value) {
    return addHexPrefix(keccak(utf8ToArray(value)).toString(16));
  }
  function starknetKeccak(value) {
    const hash2 = BigInt(keccakHex(value));
    return hash2 & MASK_2502;
  }
  function getSelectorFromName(funcName) {
    return toHex(starknetKeccak(funcName));
  }
  function getSelector(value) {
    if (isHex2(value)) {
      return value;
    }
    if (isStringWholeNumber(value)) {
      return toHexString(value);
    }
    return getSelectorFromName(value);
  }
  var shortString_exports = {};
  __export2(shortString_exports, {
    decodeShortString: () => decodeShortString,
    encodeShortString: () => encodeShortString,
    isASCII: () => isASCII,
    isDecimalString: () => isDecimalString,
    isLongText: () => isLongText,
    isShortString: () => isShortString,
    isShortText: () => isShortText,
    isText: () => isText,
    splitLongString: () => splitLongString
  });
  var TEXT_TO_FELT_MAX_LEN = 31;
  function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
  }
  function isShortString(str) {
    return str.length <= TEXT_TO_FELT_MAX_LEN;
  }
  function isDecimalString(decim) {
    return /^[0-9]*$/i.test(decim);
  }
  function isText(val) {
    return typeof val === "string" && !isHex2(val) && !isStringWholeNumber(val);
  }
  var isShortText = (val) => isText(val) && isShortString(val);
  var isLongText = (val) => isText(val) && !isShortString(val);
  function splitLongString(longStr) {
    const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, "g");
    return longStr.match(regex) || [];
  }
  function encodeShortString(str) {
    if (!isASCII(str))
      throw new Error(`${str} is not an ASCII string`);
    if (!isShortString(str))
      throw new Error(`${str} is too long`);
    return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
  }
  function decodeShortString(str) {
    if (!isASCII(str))
      throw new Error(`${str} is not an ASCII string`);
    if (isHex2(str)) {
      return removeHexPrefix(str).replace(/.{2}/g, (hex) => String.fromCharCode(parseInt(hex, 16)));
    }
    if (isDecimalString(str)) {
      return decodeShortString("0X".concat(BigInt(str).toString(16)));
    }
    throw new Error(`${str} is not Hex or decimal`);
  }
  var cairo_exports = {};
  __export2(cairo_exports, {
    felt: () => felt,
    getArrayType: () => getArrayType,
    isCairo1Abi: () => isCairo1Abi,
    isCairo1Type: () => isCairo1Type,
    isLen: () => isLen,
    isTypeArray: () => isTypeArray,
    isTypeBool: () => isTypeBool,
    isTypeContractAddress: () => isTypeContractAddress,
    isTypeEnum: () => isTypeEnum,
    isTypeEthAddress: () => isTypeEthAddress,
    isTypeFelt: () => isTypeFelt,
    isTypeLitteral: () => isTypeLitteral,
    isTypeNamedTuple: () => isTypeNamedTuple,
    isTypeOption: () => isTypeOption,
    isTypeResult: () => isTypeResult,
    isTypeStruct: () => isTypeStruct,
    isTypeTuple: () => isTypeTuple,
    isTypeUint: () => isTypeUint,
    isTypeUint256: () => isTypeUint256,
    tuple: () => tuple,
    uint256: () => uint256
  });
  var uint256_exports = {};
  __export2(uint256_exports, {
    UINT_128_MAX: () => UINT_128_MAX,
    UINT_256_MAX: () => UINT_256_MAX,
    bnToUint256: () => bnToUint256,
    isUint256: () => isUint256,
    uint256ToBN: () => uint256ToBN
  });
  function uint256ToBN(uint2562) {
    return (toBigInt(uint2562.high) << 128n) + toBigInt(uint2562.low);
  }
  var UINT_128_MAX = (1n << 128n) - 1n;
  var UINT_256_MAX = (1n << 256n) - 1n;
  function isUint256(bn) {
    return toBigInt(bn) <= UINT_256_MAX;
  }
  function bnToUint256(bignumber) {
    const bn = toBigInt(bignumber);
    if (!isUint256(bn))
      throw new Error("Number is too large");
    return {
      low: addHexPrefix((bn & UINT_128_MAX).toString(16)),
      high: addHexPrefix((bn >> 128n).toString(16))
    };
  }
  var isLen = (name) => /_len$/.test(name);
  var isTypeFelt = (type) => type === "felt" || type === "core::felt252";
  var isTypeArray = (type) => /\*/.test(type) || type.startsWith("core::array::Array::") || type.startsWith("core::array::Span::");
  var isTypeTuple = (type) => /^\(.*\)$/i.test(type);
  var isTypeNamedTuple = (type) => /\(.*\)/i.test(type) && type.includes(":");
  var isTypeStruct = (type, structs) => type in structs;
  var isTypeEnum = (type, enums) => type in enums;
  var isTypeOption = (type) => type.startsWith("core::option::Option::");
  var isTypeResult = (type) => type.startsWith("core::result::Result::");
  var isTypeUint = (type) => Object.values(Uint).includes(type);
  var isTypeLitteral = (type) => Object.values(Litteral).includes(type);
  var isTypeUint256 = (type) => type === "core::integer::u256";
  var isTypeBool = (type) => type === "core::bool";
  var isTypeContractAddress = (type) => type === "core::starknet::contract_address::ContractAddress";
  var isTypeEthAddress = (type) => type === "core::starknet::eth_address::EthAddress";
  var isCairo1Type = (type) => type.includes("core::");
  var getArrayType = (type) => {
    if (isCairo1Type(type)) {
      return type.substring(type.indexOf("<") + 1, type.lastIndexOf(">"));
    }
    return type.replace("*", "");
  };
  function isCairo1Abi(abi) {
    const firstFunction = abi.find((entry) => entry.type === "function");
    if (!firstFunction) {
      if (abi.find((it) => it.type === "interface")) {
        return true;
      }
      throw new Error(`Error in ABI. No function in ABI.`);
    }
    if (firstFunction.inputs.length) {
      return isCairo1Type(firstFunction.inputs[0].type);
    }
    if (firstFunction.outputs.length) {
      return isCairo1Type(firstFunction.outputs[0].type);
    }
    throw new Error(`Error in ABI. No input/output in function ${firstFunction.name}`);
  }
  var uint256 = (it) => {
    const bn = BigInt(it);
    if (!isUint256(bn))
      throw new Error("Number is too large");
    return {
      // eslint-disable-next-line no-bitwise
      low: (bn & UINT_128_MAX).toString(10),
      // eslint-disable-next-line no-bitwise
      high: (bn >> 128n).toString(10)
    };
  };
  var tuple = (...args) => ({ ...args });
  function felt(it) {
    if (isBigInt(it) || typeof it === "number" && Number.isInteger(it)) {
      return it.toString();
    }
    if (isText(it)) {
      if (!isShortString(it))
        throw new Error(
          `${it} is a long string > 31 chars, felt can store short strings, split it to array of short strings`
        );
      const encoded = encodeShortString(it);
      return BigInt(encoded).toString();
    }
    if (typeof it === "string" && isHex2(it)) {
      return BigInt(it).toString();
    }
    if (typeof it === "string" && isStringWholeNumber(it)) {
      return it;
    }
    if (typeof it === "boolean") {
      return `${+it}`;
    }
    throw new Error(`${it} can't be computed by felt()`);
  }
  var CairoCustomEnum = class {
    /**
     * @param enumContent an object with the variants as keys and the content as value. Only one content shall be defined.
     */
    constructor(enumContent) {
      const variantsList = Object.values(enumContent);
      if (variantsList.length === 0) {
        throw new Error("This Enum must have a least 1 variant");
      }
      const nbActiveVariants = variantsList.filter(
        (content) => typeof content !== "undefined"
      ).length;
      if (nbActiveVariants !== 1) {
        throw new Error("This Enum must have exactly one active variant");
      }
      this.variant = enumContent;
    }
    /**
     *
     * @returns the content of the valid variant of a Cairo custom Enum.
     */
    unwrap() {
      const variants = Object.entries(this.variant);
      const activeVariant = variants.find((item) => typeof item[1] !== "undefined");
      if (typeof activeVariant === "undefined") {
        return void 0;
      }
      return activeVariant[1];
    }
    /**
     *
     * @returns the name of the valid variant of a Cairo custom Enum.
     */
    activeVariant() {
      const variants = Object.entries(this.variant);
      const activeVariant = variants.find((item) => typeof item[1] !== "undefined");
      if (typeof activeVariant === "undefined") {
        return "";
      }
      return activeVariant[0];
    }
  };
  var CairoOptionVariant = /* @__PURE__ */ ((CairoOptionVariant2) => {
    CairoOptionVariant2[CairoOptionVariant2["Some"] = 0] = "Some";
    CairoOptionVariant2[CairoOptionVariant2["None"] = 1] = "None";
    return CairoOptionVariant2;
  })(CairoOptionVariant || {});
  var CairoOption = class {
    constructor(variant, someContent) {
      if (!(variant in CairoOptionVariant)) {
        throw new Error("Wrong variant : should be CairoOptionVariant.Some or .None.");
      }
      if (variant === 0) {
        if (typeof someContent === "undefined") {
          throw new Error(
            'The creation of a Cairo Option with "Some" variant needs a content as input.'
          );
        }
        this.Some = someContent;
        this.None = void 0;
      } else {
        this.Some = void 0;
        this.None = true;
      }
    }
    /**
     *
     * @returns the content of the valid variant of a Cairo custom Enum.
     *  If None, returns 'undefined'.
     */
    unwrap() {
      if (this.None) {
        return void 0;
      }
      return this.Some;
    }
    /**
     *
     * @returns true if the valid variant is 'isSome'.
     */
    isSome() {
      return !(typeof this.Some === "undefined");
    }
    /**
     *
     * @returns true if the valid variant is 'isNone'.
     */
    isNone() {
      return this.None === true;
    }
  };
  var CairoResultVariant = /* @__PURE__ */ ((CairoResultVariant2) => {
    CairoResultVariant2[CairoResultVariant2["Ok"] = 0] = "Ok";
    CairoResultVariant2[CairoResultVariant2["Err"] = 1] = "Err";
    return CairoResultVariant2;
  })(CairoResultVariant || {});
  var CairoResult = class {
    constructor(variant, resultContent) {
      if (!(variant in CairoResultVariant)) {
        throw new Error("Wrong variant : should be CairoResultVariant.Ok or .Err.");
      }
      if (variant === 0) {
        this.Ok = resultContent;
        this.Err = void 0;
      } else {
        this.Ok = void 0;
        this.Err = resultContent;
      }
    }
    /**
     *
     * @returns the content of the valid variant of a Cairo Result.
     */
    unwrap() {
      if (typeof this.Ok !== "undefined") {
        return this.Ok;
      }
      if (typeof this.Err !== "undefined") {
        return this.Err;
      }
      throw new Error("Both Result.Ok and .Err are undefined. Not authorized.");
    }
    /**
     *
     * @returns true if the valid variant is 'Ok'.
     */
    isOk() {
      return !(typeof this.Ok === "undefined");
    }
    /**
     *
     * @returns true if the valid variant is 'isErr'.
     */
    isErr() {
      return !(typeof this.Err === "undefined");
    }
  };
  var guard = {
    isBN: (data, type, key) => {
      if (!isBigInt(data[key]))
        throw new Error(
          `Data and formatter mismatch on ${key}:${type[key]}, expected response data ${key}:${data[key]} to be BN instead it is ${typeof data[key]}`
        );
    },
    unknown: (data, type, key) => {
      throw new Error(`Unhandled formatter type on ${key}:${type[key]} for data ${key}:${data[key]}`);
    }
  };
  function formatter(data, type, sameType) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const elType = sameType ?? type[key];
      if (!(key in type) && !sameType) {
        acc[key] = value;
        return acc;
      }
      if (elType === "string") {
        if (Array.isArray(data[key])) {
          const arrayStr = formatter(
            data[key],
            data[key].map((_) => elType)
          );
          acc[key] = Object.values(arrayStr).join("");
          return acc;
        }
        guard.isBN(data, type, key);
        acc[key] = decodeShortString(value);
        return acc;
      }
      if (elType === "number") {
        guard.isBN(data, type, key);
        acc[key] = Number(value);
        return acc;
      }
      if (typeof elType === "function") {
        acc[key] = elType(value);
        return acc;
      }
      if (Array.isArray(elType)) {
        const arrayObj = formatter(data[key], elType, elType[0]);
        acc[key] = Object.values(arrayObj);
        return acc;
      }
      if (typeof elType === "object") {
        acc[key] = formatter(data[key], elType);
        return acc;
      }
      guard.unknown(data, type, key);
      return acc;
    }, {});
  }
  var AbiParser1 = class {
    constructor(abi) {
      this.abi = abi;
    }
    /**
     * abi method inputs length without '_len' inputs
     * cairo 0 reducer
     * @param abiMethod FunctionAbi
     * @returns number
     */
    methodInputsLength(abiMethod) {
      return abiMethod.inputs.reduce((acc, input) => !isLen(input.name) ? acc + 1 : acc, 0);
    }
    /**
     * get method definition from abi
     * @param name string
     * @returns FunctionAbi | undefined
     */
    getMethod(name) {
      return this.abi.find((it) => it.name === name);
    }
    /**
     * Get Abi in legacy format
     * @returns Abi
     */
    getLegacyFormat() {
      return this.abi;
    }
  };
  var AbiParser2 = class {
    constructor(abi) {
      this.abi = abi;
    }
    /**
     * abi method inputs length
     * @param abiMethod FunctionAbi
     * @returns number
     */
    methodInputsLength(abiMethod) {
      return abiMethod.inputs.length;
    }
    /**
     * get method definition from abi
     * @param name string
     * @returns FunctionAbi | undefined
     */
    getMethod(name) {
      const intf = this.abi.find((it) => it.type === "interface");
      return intf.items.find((it) => it.name === name);
    }
    /**
     * Get Abi in legacy format
     * @returns Abi
     */
    getLegacyFormat() {
      return this.abi.flatMap((e) => {
        if (e.type === "interface") {
          return e.items;
        }
        return e;
      });
    }
  };
  function createAbiParser(abi) {
    const version2 = getAbiVersion(abi);
    if (version2 === 0 || version2 === 1) {
      return new AbiParser1(abi);
    }
    if (version2 === 2) {
      return new AbiParser2(abi);
    }
    throw Error(`Unsupported ABI version ${version2}`);
  }
  function getAbiVersion(abi) {
    if (abi.find((it) => it.type === "interface"))
      return 2;
    if (isCairo1Abi(abi))
      return 1;
    return 0;
  }
  function isNoConstructorValid(method, argsCalldata, abiMethod) {
    return method === "constructor" && !abiMethod && !argsCalldata.length;
  }
  function parseNamedTuple(namedTuple) {
    const name = namedTuple.substring(0, namedTuple.indexOf(":"));
    const type = namedTuple.substring(name.length + ":".length);
    return { name, type };
  }
  function parseSubTuple(s) {
    if (!s.includes("("))
      return { subTuple: [], result: s };
    const subTuple = [];
    let result = "";
    let i = 0;
    while (i < s.length) {
      if (s[i] === "(") {
        let counter = 1;
        const lBracket = i;
        i++;
        while (counter) {
          if (s[i] === ")")
            counter--;
          if (s[i] === "(")
            counter++;
          i++;
        }
        subTuple.push(s.substring(lBracket, i));
        result += " ";
        i--;
      } else {
        result += s[i];
      }
      i++;
    }
    return {
      subTuple,
      result
    };
  }
  function extractCairo0Tuple(type) {
    const cleanType = type.replace(/\s/g, "").slice(1, -1);
    const { subTuple, result } = parseSubTuple(cleanType);
    let recomposed = result.split(",").map((it) => {
      return subTuple.length ? it.replace(" ", subTuple.shift()) : it;
    });
    if (isTypeNamedTuple(type)) {
      recomposed = recomposed.reduce((acc, it) => {
        return acc.concat(parseNamedTuple(it));
      }, []);
    }
    return recomposed;
  }
  function extractCairo1Tuple(type) {
    const cleanType = type.replace(/\s/g, "").slice(1, -1);
    const { subTuple, result } = parseSubTuple(cleanType);
    const recomposed = result.split(",").map((it) => {
      return subTuple.length ? it.replace(" ", subTuple.shift()) : it;
    });
    return recomposed;
  }
  function extractTupleMemberTypes(type) {
    if (isCairo1Type(type)) {
      return extractCairo1Tuple(type);
    }
    return extractCairo0Tuple(type);
  }
  function errorU256(key) {
    return Error(
      `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
    );
  }
  function orderPropsByAbi(unorderedObject, abiOfObject, structs, enums) {
    const orderInput = (unorderedItem, abiType) => {
      if (isTypeArray(abiType)) {
        return orderArray(unorderedItem, abiType);
      }
      if (isTypeEnum(abiType, enums)) {
        const abiObj = enums[abiType];
        return orderEnum(unorderedItem, abiObj);
      }
      if (isTypeTuple(abiType)) {
        return orderTuple(unorderedItem, abiType);
      }
      if (isTypeEthAddress(abiType)) {
        return unorderedItem;
      }
      if (isTypeUint256(abiType)) {
        const u256 = unorderedItem;
        if (typeof u256 !== "object") {
          return u256;
        }
        if (!("low" in u256 && "high" in u256)) {
          throw errorU256(abiType);
        }
        return { low: u256.low, high: u256.high };
      }
      if (isTypeStruct(abiType, structs)) {
        const abiOfStruct = structs[abiType].members;
        return orderStruct(unorderedItem, abiOfStruct);
      }
      return unorderedItem;
    };
    const orderStruct = (unorderedObject2, abiObject) => {
      const orderedObject2 = abiObject.reduce((orderedObject, abiParam) => {
        const setProperty = (value) => Object.defineProperty(orderedObject, abiParam.name, {
          enumerable: true,
          value: value ?? unorderedObject2[abiParam.name]
        });
        if (unorderedObject2[abiParam.name] === "undefined") {
          if (isCairo1Type(abiParam.type) || !isLen(abiParam.name)) {
            throw Error(`Your object needs a property with key : ${abiParam.name} .`);
          }
        }
        setProperty(orderInput(unorderedObject2[abiParam.name], abiParam.type));
        return orderedObject;
      }, {});
      return orderedObject2;
    };
    function orderArray(myArray, abiParam) {
      const typeInArray = getArrayType(abiParam);
      if (typeof myArray === "string") {
        return myArray;
      }
      return myArray.map((myElem) => orderInput(myElem, typeInArray));
    }
    function orderTuple(unorderedObject2, abiParam) {
      const typeList = extractTupleMemberTypes(abiParam);
      const orderedObject2 = typeList.reduce((orderedObject, abiTypeCairoX, index) => {
        const myObjKeys = Object.keys(unorderedObject2);
        const setProperty = (value) => Object.defineProperty(orderedObject, index.toString(), {
          enumerable: true,
          value: value ?? unorderedObject2[myObjKeys[index]]
        });
        const abiType = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX;
        setProperty(orderInput(unorderedObject2[myObjKeys[index]], abiType));
        return orderedObject;
      }, {});
      return orderedObject2;
    }
    const orderEnum = (unorderedObject2, abiObject) => {
      if (isTypeResult(abiObject.name)) {
        const unorderedResult = unorderedObject2;
        const resultOkType = abiObject.name.substring(
          abiObject.name.indexOf("<") + 1,
          abiObject.name.lastIndexOf(",")
        );
        const resultErrType = abiObject.name.substring(
          abiObject.name.indexOf(",") + 1,
          abiObject.name.lastIndexOf(">")
        );
        if (unorderedResult.isOk()) {
          return new CairoResult(
            0,
            orderInput(unorderedObject2.unwrap(), resultOkType)
          );
        }
        return new CairoResult(
          1,
          orderInput(unorderedObject2.unwrap(), resultErrType)
        );
      }
      if (isTypeOption(abiObject.name)) {
        const unorderedOption = unorderedObject2;
        const resultSomeType = abiObject.name.substring(
          abiObject.name.indexOf("<") + 1,
          abiObject.name.lastIndexOf(">")
        );
        if (unorderedOption.isSome()) {
          return new CairoOption(
            0,
            orderInput(unorderedOption.unwrap(), resultSomeType)
          );
        }
        return new CairoOption(1, {});
      }
      const unorderedCustomEnum = unorderedObject2;
      const variants = Object.entries(unorderedCustomEnum.variant);
      const newEntries = variants.map((variant) => {
        if (typeof variant[1] === "undefined") {
          return variant;
        }
        const variantType = abiObject.type.substring(
          abiObject.type.lastIndexOf("<") + 1,
          abiObject.type.lastIndexOf(">")
        );
        if (variantType === "()") {
          return variant;
        }
        return [variant[0], orderInput(unorderedCustomEnum.unwrap(), variantType)];
      });
      return new CairoCustomEnum(Object.fromEntries(newEntries));
    };
    const finalOrderedObject = abiOfObject.reduce((orderedObject, abiParam) => {
      const setProperty = (value) => Object.defineProperty(orderedObject, abiParam.name, {
        enumerable: true,
        value
      });
      if (isLen(abiParam.name)) {
        return orderedObject;
      }
      setProperty(orderInput(unorderedObject[abiParam.name], abiParam.type));
      return orderedObject;
    }, {});
    return finalOrderedObject;
  }
  function parseBaseTypes(type, val) {
    switch (true) {
      case isTypeUint256(type):
        const el_uint256 = uint256(val);
        return [felt(el_uint256.low), felt(el_uint256.high)];
      default:
        return felt(val);
    }
  }
  function parseTuple(element, typeStr) {
    const memberTypes = extractTupleMemberTypes(typeStr);
    const elements = Object.values(element);
    if (elements.length !== memberTypes.length) {
      throw Error(
        `ParseTuple: provided and expected abi tuple size do not match.
      provided: ${elements} 
      expected: ${memberTypes}`
      );
    }
    return memberTypes.map((it, dx) => {
      return {
        element: elements[dx],
        type: it.type ?? it
      };
    });
  }
  function parseUint256(element) {
    if (typeof element === "object") {
      const { low, high } = element;
      return [felt(low), felt(high)];
    }
    const el_uint256 = uint256(element);
    return [felt(el_uint256.low), felt(el_uint256.high)];
  }
  function parseCalldataValue(element, type, structs, enums) {
    if (element === void 0) {
      throw Error(`Missing parameter for type ${type}`);
    }
    if (Array.isArray(element)) {
      const result = [];
      result.push(felt(element.length));
      const arrayType = getArrayType(type);
      return element.reduce((acc, it) => {
        return acc.concat(parseCalldataValue(it, arrayType, structs, enums));
      }, result);
    }
    if (structs[type] && structs[type].members.length) {
      if (isTypeUint256(type)) {
        return parseUint256(element);
      }
      if (type === "core::starknet::eth_address::EthAddress")
        return parseBaseTypes(type, element);
      const { members } = structs[type];
      const subElement = element;
      return members.reduce((acc, it) => {
        return acc.concat(parseCalldataValue(subElement[it.name], it.type, structs, enums));
      }, []);
    }
    if (isTypeTuple(type)) {
      const tupled = parseTuple(element, type);
      return tupled.reduce((acc, it) => {
        const parsedData = parseCalldataValue(it.element, it.type, structs, enums);
        return acc.concat(parsedData);
      }, []);
    }
    if (isTypeUint256(type)) {
      return parseUint256(element);
    }
    if (isTypeEnum(type, enums)) {
      const { variants } = enums[type];
      if (isTypeOption(type)) {
        const myOption = element;
        if (myOption.isSome()) {
          const listTypeVariant2 = variants.find((variant) => variant.name === "Some");
          if (typeof listTypeVariant2 === "undefined") {
            throw Error(`Error in abi : Option has no 'Some' variant.`);
          }
          const typeVariantSome = listTypeVariant2.type;
          if (typeVariantSome === "()") {
            return 0 .toString();
          }
          const parsedParameter2 = parseCalldataValue(
            myOption.unwrap(),
            typeVariantSome,
            structs,
            enums
          );
          if (Array.isArray(parsedParameter2)) {
            return [0 .toString(), ...parsedParameter2];
          }
          return [0 .toString(), parsedParameter2];
        }
        return 1 .toString();
      }
      if (isTypeResult(type)) {
        const myResult = element;
        if (myResult.isOk()) {
          const listTypeVariant3 = variants.find((variant) => variant.name === "Ok");
          if (typeof listTypeVariant3 === "undefined") {
            throw Error(`Error in abi : Result has no 'Ok' variant.`);
          }
          const typeVariantOk = listTypeVariant3.type;
          if (typeVariantOk === "()") {
            return 0 .toString();
          }
          const parsedParameter3 = parseCalldataValue(
            myResult.unwrap(),
            typeVariantOk,
            structs,
            enums
          );
          if (Array.isArray(parsedParameter3)) {
            return [0 .toString(), ...parsedParameter3];
          }
          return [0 .toString(), parsedParameter3];
        }
        const listTypeVariant2 = variants.find((variant) => variant.name === "Err");
        if (typeof listTypeVariant2 === "undefined") {
          throw Error(`Error in abi : Result has no 'Err' variant.`);
        }
        const typeVariantErr = listTypeVariant2.type;
        if (typeVariantErr === "()") {
          return 1 .toString();
        }
        const parsedParameter2 = parseCalldataValue(myResult.unwrap(), typeVariantErr, structs, enums);
        if (Array.isArray(parsedParameter2)) {
          return [1 .toString(), ...parsedParameter2];
        }
        return [1 .toString(), parsedParameter2];
      }
      const myEnum = element;
      const activeVariant = myEnum.activeVariant();
      const listTypeVariant = variants.find((variant) => variant.name === activeVariant);
      if (typeof listTypeVariant === "undefined") {
        throw Error(`Not find in abi : Enum has no '${activeVariant}' variant.`);
      }
      const typeActiveVariant = listTypeVariant.type;
      const numActiveVariant = variants.findIndex((variant) => variant.name === activeVariant);
      if (typeActiveVariant === "()") {
        return numActiveVariant.toString();
      }
      const parsedParameter = parseCalldataValue(myEnum.unwrap(), typeActiveVariant, structs, enums);
      if (Array.isArray(parsedParameter)) {
        return [numActiveVariant.toString(), ...parsedParameter];
      }
      return [numActiveVariant.toString(), parsedParameter];
    }
    if (typeof element === "object") {
      throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
    }
    return parseBaseTypes(type, element);
  }
  function parseCalldataField(argsIterator, input, structs, enums) {
    const { name, type } = input;
    let { value } = argsIterator.next();
    switch (true) {
      case isTypeArray(type):
        if (!Array.isArray(value) && !isText(value)) {
          throw Error(`ABI expected parameter ${name} to be array or long string, got ${value}`);
        }
        if (typeof value === "string") {
          value = splitLongString(value);
        }
        return parseCalldataValue(value, input.type, structs, enums);
      case type === "core::starknet::eth_address::EthAddress":
        return parseBaseTypes(type, value);
      case (isTypeStruct(type, structs) || isTypeTuple(type) || isTypeUint256(type)):
        return parseCalldataValue(value, type, structs, enums);
      case isTypeEnum(type, enums):
        return parseCalldataValue(
          value,
          type,
          structs,
          enums
        );
      default:
        return parseBaseTypes(type, value);
    }
  }
  function parseBaseTypes2(type, it) {
    let temp;
    switch (true) {
      case isTypeBool(type):
        temp = it.next().value;
        return Boolean(BigInt(temp));
      case isTypeUint256(type):
        const low = it.next().value;
        const high = it.next().value;
        return uint256ToBN({ low, high });
      case type === "core::starknet::eth_address::EthAddress":
        temp = it.next().value;
        return BigInt(temp);
      default:
        temp = it.next().value;
        return BigInt(temp);
    }
  }
  function parseResponseValue(responseIterator, element, structs, enums) {
    if (element.type === "()") {
      return {};
    }
    if (isTypeUint256(element.type)) {
      const low = responseIterator.next().value;
      const high = responseIterator.next().value;
      return uint256ToBN({ low, high });
    }
    if (isTypeArray(element.type)) {
      const parsedDataArr = [];
      const el = { name: "", type: getArrayType(element.type) };
      const len = BigInt(responseIterator.next().value);
      while (parsedDataArr.length < len) {
        parsedDataArr.push(parseResponseValue(responseIterator, el, structs, enums));
      }
      return parsedDataArr;
    }
    if (structs && element.type in structs && structs[element.type]) {
      if (element.type === "core::starknet::eth_address::EthAddress") {
        return parseBaseTypes2(element.type, responseIterator);
      }
      return structs[element.type].members.reduce((acc, el) => {
        acc[el.name] = parseResponseValue(responseIterator, el, structs, enums);
        return acc;
      }, {});
    }
    if (enums && element.type in enums && enums[element.type]) {
      const variantNum = Number(responseIterator.next().value);
      const rawEnum = enums[element.type].variants.reduce((acc, variant, num) => {
        if (num === variantNum) {
          acc[variant.name] = parseResponseValue(
            responseIterator,
            { name: "", type: variant.type },
            structs,
            enums
          );
          return acc;
        }
        acc[variant.name] = void 0;
        return acc;
      }, {});
      if (element.type.startsWith("core::option::Option")) {
        const content = variantNum === 0 ? rawEnum.Some : void 0;
        return new CairoOption(variantNum, content);
      }
      if (element.type.startsWith("core::result::Result")) {
        let content;
        if (variantNum === 0) {
          content = rawEnum.Ok;
        } else {
          content = rawEnum.Err;
        }
        return new CairoResult(variantNum, content);
      }
      const customEnum = new CairoCustomEnum(rawEnum);
      return customEnum;
    }
    if (isTypeTuple(element.type)) {
      const memberTypes = extractTupleMemberTypes(element.type);
      return memberTypes.reduce((acc, it, idx) => {
        const name = it?.name ? it.name : idx;
        const type = it?.type ? it.type : it;
        const el = { name, type };
        acc[name] = parseResponseValue(responseIterator, el, structs, enums);
        return acc;
      }, {});
    }
    if (isTypeArray(element.type)) {
      const parsedDataArr = [];
      const el = { name: "", type: getArrayType(element.type) };
      const len = BigInt(responseIterator.next().value);
      while (parsedDataArr.length < len) {
        parsedDataArr.push(parseResponseValue(responseIterator, el, structs, enums));
      }
      return parsedDataArr;
    }
    return parseBaseTypes2(element.type, responseIterator);
  }
  function responseParser(responseIterator, output2, structs, enums, parsedResult) {
    const { name, type } = output2;
    let temp;
    switch (true) {
      case isLen(name):
        temp = responseIterator.next().value;
        return BigInt(temp);
      case (structs && type in structs || isTypeTuple(type)):
        return parseResponseValue(responseIterator, output2, structs, enums);
      case (enums && isTypeEnum(type, enums)):
        return parseResponseValue(responseIterator, output2, structs, enums);
      case isTypeArray(type):
        if (isCairo1Type(type)) {
          return parseResponseValue(responseIterator, output2, structs, enums);
        }
        const parsedDataArr = [];
        if (parsedResult && parsedResult[`${name}_len`]) {
          const arrLen = parsedResult[`${name}_len`];
          while (parsedDataArr.length < arrLen) {
            parsedDataArr.push(
              parseResponseValue(
                responseIterator,
                { name, type: output2.type.replace("*", "") },
                structs,
                enums
              )
            );
          }
        }
        return parsedDataArr;
      default:
        return parseBaseTypes2(type, responseIterator);
    }
  }
  var validateFelt = (parameter, input) => {
    assert(
      typeof parameter === "string" || typeof parameter === "number" || typeof parameter === "bigint",
      `Validate: arg ${input.name} should be a felt typed as (String, Number or BigInt)`
    );
    if (typeof parameter === "string" && !isHex2(parameter))
      return;
    const param = BigInt(parameter.toString(10));
    assert(
      // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1266
      param >= 0n && param <= 2n ** 252n - 1n,
      `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
    );
  };
  var validateUint = (parameter, input) => {
    if (typeof parameter === "number") {
      assert(
        parameter <= Number.MAX_SAFE_INTEGER,
        `Validation: Parameter is to large to be typed as Number use (BigInt or String)`
      );
    }
    assert(
      typeof parameter === "string" || typeof parameter === "number" || typeof parameter === "bigint" || typeof parameter === "object" && "low" in parameter && "high" in parameter,
      `Validate: arg ${input.name} of cairo type ${input.type} should be type (String, Number or BigInt), but is ${typeof parameter} ${parameter}.`
    );
    const param = typeof parameter === "object" ? uint256ToBN(parameter) : toBigInt(parameter);
    switch (input.type) {
      case "core::integer::u8":
        assert(
          param >= 0n && param <= 255n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0 - 255]`
        );
        break;
      case "core::integer::u16":
        assert(
          param >= 0n && param <= 65535n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 65535]`
        );
        break;
      case "core::integer::u32":
        assert(
          param >= 0n && param <= 4294967295n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 4294967295]`
        );
        break;
      case "core::integer::u64":
        assert(
          param >= 0n && param <= 2n ** 64n - 1n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^64-1]`
        );
        break;
      case "core::integer::u128":
        assert(
          param >= 0n && param <= 2n ** 128n - 1n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^128-1]`
        );
        break;
      case "core::integer::u256":
        assert(
          param >= 0n && param <= 2n ** 256n - 1n,
          `Validate: arg ${input.name} is ${input.type} 0 - 2^256-1`
        );
        break;
      case "core::starknet::class_hash::ClassHash":
        assert(
          // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1670
          param >= 0n && param <= 2n ** 252n - 1n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
        );
        break;
      case "core::starknet::contract_address::ContractAddress":
        assert(
          // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1245
          param >= 0n && param <= 2n ** 252n - 1n,
          `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
        );
        break;
      default:
        break;
    }
  };
  var validateBool = (parameter, input) => {
    assert(
      typeof parameter === "boolean",
      `Validate: arg ${input.name} of cairo type ${input.type} should be type (Boolean)`
    );
  };
  var validateStruct = (parameter, input, structs) => {
    if (input.type === "core::integer::u256") {
      validateUint(parameter, input);
      return;
    }
    if (input.type === "core::starknet::eth_address::EthAddress") {
      assert(
        typeof parameter !== "object",
        `EthAdress type is waiting a BigNumberish. Got ${parameter}`
      );
      const param = BigInt(parameter.toString(10));
      assert(
        // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1259
        param >= 0n && param <= 2n ** 160n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^160-1]`
      );
      return;
    }
    assert(
      typeof parameter === "object" && !Array.isArray(parameter),
      `Validate: arg ${input.name} is cairo type struct (${input.type}), and should be defined as js object (not array)`
    );
    structs[input.type].members.forEach(({ name }) => {
      assert(
        Object.keys(parameter).includes(name),
        `Validate: arg ${input.name} should have a property ${name}`
      );
    });
  };
  var validateEnum = (parameter, input) => {
    assert(
      typeof parameter === "object" && !Array.isArray(parameter),
      `Validate: arg ${input.name} is cairo type Enum (${input.type}), and should be defined as js object (not array)`
    );
    const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(parameter));
    const keys = [...Object.getOwnPropertyNames(parameter), ...methodsKeys];
    if (isTypeOption(input.type) && keys.includes("isSome") && keys.includes("isNone")) {
      return;
    }
    if (isTypeResult(input.type) && keys.includes("isOk") && keys.includes("isErr")) {
      return;
    }
    if (keys.includes("variant") && keys.includes("activeVariant")) {
      return;
    }
    throw new Error(
      `Validate Enum: argument ${input.name}, type ${input.type}, value received ${parameter}, is not an Enum.`
    );
  };
  var validateTuple = (parameter, input) => {
    assert(
      typeof parameter === "object" && !Array.isArray(parameter),
      `Validate: arg ${input.name} should be a tuple (defined as object)`
    );
  };
  var validateArray = (parameter, input, structs, enums) => {
    const baseType = getArrayType(input.type);
    if (isTypeFelt(baseType) && isLongText(parameter)) {
      return;
    }
    assert(Array.isArray(parameter), `Validate: arg ${input.name} should be an Array`);
    switch (true) {
      case isTypeFelt(baseType):
        parameter.forEach((param) => validateFelt(param, input));
        break;
      case isTypeTuple(baseType):
        parameter.forEach((it) => validateTuple(it, { name: input.name, type: baseType }));
        break;
      case isTypeArray(baseType):
        parameter.forEach(
          (param) => validateArray(param, { name: "", type: baseType }, structs, enums)
        );
        break;
      case isTypeStruct(baseType, structs):
        parameter.forEach(
          (it) => validateStruct(it, { name: input.name, type: baseType }, structs)
        );
        break;
      case isTypeEnum(baseType, enums):
        parameter.forEach((it) => validateEnum(it, { name: input.name, type: baseType }));
        break;
      case (isTypeUint(baseType) || isTypeLitteral(baseType)):
        parameter.forEach((param) => validateUint(param, input));
        break;
      case isTypeBool(baseType):
        parameter.forEach((param) => validateBool(param, input));
        break;
      default:
        throw new Error(
          `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
        );
    }
  };
  function validateFields(abiMethod, args, structs, enums) {
    abiMethod.inputs.reduce((acc, input) => {
      const parameter = args[acc];
      switch (true) {
        case isLen(input.name):
          return acc;
        case isTypeFelt(input.type):
          validateFelt(parameter, input);
          break;
        case (isTypeUint(input.type) || isTypeLitteral(input.type)):
          validateUint(parameter, input);
          break;
        case isTypeBool(input.type):
          validateBool(parameter, input);
          break;
        case isTypeArray(input.type):
          validateArray(parameter, input, structs, enums);
          break;
        case isTypeStruct(input.type, structs):
          validateStruct(parameter, input, structs);
          break;
        case isTypeEnum(input.type, enums):
          validateEnum(parameter, input);
          break;
        case isTypeTuple(input.type):
          validateTuple(parameter, input);
          break;
        default:
          throw new Error(
            `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
          );
      }
      return acc + 1;
    }, 0);
  }
  var CallData = class {
    constructor(abi) {
      this.structs = CallData.getAbiStruct(abi);
      this.enums = CallData.getAbiEnum(abi);
      this.parser = createAbiParser(abi);
      this.abi = this.parser.getLegacyFormat();
    }
    /**
     * Validate arguments passed to the method as corresponding to the ones in the abi
     * @param type ValidateType - type of the method
     * @param method string - name of the method
     * @param args ArgsOrCalldata - arguments that are passed to the method
     */
    validate(type, method, args = []) {
      if (type !== "DEPLOY") {
        const invocableFunctionNames = this.abi.filter((abi) => {
          if (abi.type !== "function")
            return false;
          const isView = abi.stateMutability === "view" || abi.state_mutability === "view";
          return type === "INVOKE" ? !isView : isView;
        }).map((abi) => abi.name);
        assert(
          invocableFunctionNames.includes(method),
          `${type === "INVOKE" ? "invocable" : "viewable"} method not found in abi`
        );
      }
      const abiMethod = this.abi.find(
        (abi) => type === "DEPLOY" ? abi.name === method && abi.type === "constructor" : abi.name === method && abi.type === "function"
      );
      if (isNoConstructorValid(method, args, abiMethod)) {
        return;
      }
      const inputsLength = this.parser.methodInputsLength(abiMethod);
      if (args.length !== inputsLength) {
        throw Error(
          `Invalid number of arguments, expected ${inputsLength} arguments, but got ${args.length}`
        );
      }
      validateFields(abiMethod, args, this.structs, this.enums);
    }
    /**
     * Compile contract callData with abi
     * Parse the calldata by using input fields from the abi for that method
     * @param method string - method name
     * @param args RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).
     * @return Calldata - parsed arguments in format that contract is expecting
     * @example
     * ```typescript
     * const calldata = myCallData.compile("constructor",["0x34a",[1,3n]]);
     * ```
     * ```typescript
     * const calldata2 = myCallData.compile("constructor",{list:[1,3n],balance:"0x34"}); // wrong order is valid
     * ```
     */
    compile(method, argsCalldata) {
      const abiMethod = this.abi.find((abiFunction) => abiFunction.name === method);
      if (isNoConstructorValid(method, argsCalldata, abiMethod)) {
        return [];
      }
      let args;
      if (Array.isArray(argsCalldata)) {
        args = argsCalldata;
      } else {
        const orderedObject = orderPropsByAbi(
          argsCalldata,
          abiMethod.inputs,
          this.structs,
          this.enums
        );
        args = Object.values(orderedObject);
        validateFields(abiMethod, args, this.structs, this.enums);
      }
      const argsIterator = args[Symbol.iterator]();
      const callArray = abiMethod.inputs.reduce(
        (acc, input) => isLen(input.name) ? acc : acc.concat(parseCalldataField(argsIterator, input, this.structs, this.enums)),
        []
      );
      Object.defineProperty(callArray, "__compiled__", {
        enumerable: false,
        writable: false,
        value: true
      });
      return callArray;
    }
    /**
     * Compile contract callData without abi
     * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
     * @returns Calldata
     */
    static compile(rawArgs) {
      const createTree = (obj) => {
        const getEntries = (o, prefix = ".") => {
          const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
          return Object.entries(oe).flatMap(([k, v]) => {
            let value = v;
            if (isLongText(value))
              value = splitLongString(value);
            if (k === "entrypoint")
              value = getSelectorFromName(value);
            const kk = Array.isArray(oe) && k === "0" ? "$$len" : k;
            if (isBigInt(value))
              return [[`${prefix}${kk}`, felt(value)]];
            if (Object(value) === value) {
              const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(value));
              const keys = [...Object.getOwnPropertyNames(value), ...methodsKeys];
              if (keys.includes("isSome") && keys.includes("isNone")) {
                const myOption = value;
                const variantNb = myOption.isSome() ? 0 : 1;
                if (myOption.isSome())
                  return getEntries({ 0: variantNb, 1: myOption.unwrap() }, `${prefix}${kk}.`);
                return [[`${prefix}${kk}`, felt(variantNb)]];
              }
              if (keys.includes("isOk") && keys.includes("isErr")) {
                const myResult = value;
                const variantNb = myResult.isOk() ? 0 : 1;
                return getEntries({ 0: variantNb, 1: myResult.unwrap() }, `${prefix}${kk}.`);
              }
              if (keys.includes("variant") && keys.includes("activeVariant")) {
                const myEnum = value;
                const activeVariant = myEnum.activeVariant();
                const listVariants = Object.keys(myEnum.variant);
                const activeVariantNb = listVariants.findIndex(
                  (variant) => variant === activeVariant
                );
                if (typeof myEnum.unwrap() === "object" && Object.keys(myEnum.unwrap()).length === 0) {
                  return [[`${prefix}${kk}`, felt(activeVariantNb)]];
                }
                return getEntries({ 0: activeVariantNb, 1: myEnum.unwrap() }, `${prefix}${kk}.`);
              }
              return getEntries(value, `${prefix}${kk}.`);
            }
            return [[`${prefix}${kk}`, felt(value)]];
          });
        };
        const result = Object.fromEntries(getEntries(obj));
        return result;
      };
      let callTreeArray;
      if (!Array.isArray(rawArgs)) {
        const callTree = createTree(rawArgs);
        callTreeArray = Object.values(callTree);
      } else {
        const callObj = { ...rawArgs };
        const callTree = createTree(callObj);
        callTreeArray = Object.values(callTree);
      }
      Object.defineProperty(callTreeArray, "__compiled__", {
        enumerable: false,
        writable: false,
        value: true
      });
      return callTreeArray;
    }
    /**
     * Parse elements of the response array and structuring them into response object
     * @param method string - method name
     * @param response string[] - response from the method
     * @return Result - parsed response corresponding to the abi
     */
    parse(method, response) {
      const { outputs } = this.abi.find((abi) => abi.name === method);
      const responseIterator = response.flat()[Symbol.iterator]();
      const parsed = outputs.flat().reduce((acc, output2, idx) => {
        const propName = output2.name ?? idx;
        acc[propName] = responseParser(responseIterator, output2, this.structs, this.enums, acc);
        if (acc[propName] && acc[`${propName}_len`]) {
          delete acc[`${propName}_len`];
        }
        return acc;
      }, {});
      return Object.keys(parsed).length === 1 && 0 in parsed ? parsed[0] : parsed;
    }
    /**
     * Format cairo method response data to native js values based on provided format schema
     * @param method string - cairo method name
     * @param response string[] - cairo method response
     * @param format object - formatter object schema
     * @returns Result - parsed and formatted response object
     */
    format(method, response, format) {
      const parsed = this.parse(method, response);
      return formatter(parsed, format);
    }
    /**
     * Helper to extract structs from abi
     * @param abi Abi
     * @returns AbiStructs - structs from abi
     */
    static getAbiStruct(abi) {
      return abi.filter((abiEntry) => abiEntry.type === "struct").reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry
        }),
        {}
      );
    }
    /**
     * Helper to extract enums from abi
     * @param abi Abi
     * @returns AbiEnums - enums from abi
     */
    static getAbiEnum(abi) {
      const fullEnumList = abi.filter((abiEntry) => abiEntry.type === "enum").reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry
        }),
        {}
      );
      delete fullEnumList["core::bool"];
      return fullEnumList;
    }
    /**
     * Helper: Compile HexCalldata | RawCalldata | RawArgs
     * @param rawCalldata HexCalldata | RawCalldata | RawArgs
     * @returns Calldata
     */
    static toCalldata(rawCalldata = []) {
      return CallData.compile(rawCalldata);
    }
    /**
     * Helper: Convert raw to HexCalldata
     * @param raw HexCalldata | RawCalldata | RawArgs
     * @returns HexCalldata
     */
    static toHex(raw = []) {
      const calldata = CallData.compile(raw);
      return calldata.map((it) => toHex(it));
    }
  };
  var hash_exports = {};
  __export2(hash_exports, {
    calculateContractAddressFromHash: () => calculateContractAddressFromHash,
    calculateDeclareTransactionHash: () => calculateDeclareTransactionHash,
    calculateDeployAccountTransactionHash: () => calculateDeployAccountTransactionHash,
    calculateDeployTransactionHash: () => calculateDeployTransactionHash,
    calculateTransactionHash: () => calculateTransactionHash,
    calculateTransactionHashCommon: () => calculateTransactionHashCommon,
    computeCompiledClassHash: () => computeCompiledClassHash,
    computeContractClassHash: () => computeContractClassHash,
    computeHashOnElements: () => computeHashOnElements2,
    computeLegacyContractClassHash: () => computeLegacyContractClassHash,
    computeSierraContractClassHash: () => computeSierraContractClassHash,
    default: () => computeHintedClassHash,
    feeTransactionVersion: () => feeTransactionVersion,
    feeTransactionVersion_2: () => feeTransactionVersion_2,
    formatSpaces: () => formatSpaces,
    getSelector: () => getSelector,
    getSelectorFromName: () => getSelectorFromName,
    getVersionsByType: () => getVersionsByType,
    keccakBn: () => keccakBn,
    poseidon: () => poseidon_exports,
    starknetKeccak: () => starknetKeccak,
    transactionVersion: () => transactionVersion,
    transactionVersion_2: () => transactionVersion_2
  });
  var ec_exports = {};
  __export2(ec_exports, {
    starkCurve: () => esm_exports,
    weierstrass: () => weierstrass_exports
  });
  var json_exports = {};
  __export2(json_exports, {
    parse: () => parse2,
    parseAlwaysAsBig: () => parseAlwaysAsBig,
    stringify: () => stringify2,
    stringifyAlwaysAsBig: () => stringifyAlwaysAsBig
  });
  var parseIntAsNumberOrBigInt = (x) => {
    if (!isInteger(x))
      return parseFloat(x);
    const v = parseInt(x, 10);
    return Number.isSafeInteger(v) ? v : BigInt(x);
  };
  var parse2 = (x) => parse(String(x), void 0, parseIntAsNumberOrBigInt);
  var parseAlwaysAsBig = (x) => parse(String(x), void 0, parseNumberAndBigInt);
  var stringify2 = (value, replacer, space, numberStringifiers) => stringify(value, replacer, space, numberStringifiers);
  var stringifyAlwaysAsBig = stringify2;
  var transactionVersion = 1n;
  var transactionVersion_2 = 2n;
  var feeTransactionVersion = 2n ** 128n + transactionVersion;
  var feeTransactionVersion_2 = 2n ** 128n + transactionVersion_2;
  function getVersionsByType(versionType) {
    return versionType === "fee" ? { v1: feeTransactionVersion, v2: feeTransactionVersion_2 } : { v1: transactionVersion, v2: transactionVersion_2 };
  }
  function computeHashOnElements2(data) {
    return [...data, data.length].reduce((x, y) => pedersen(toBigInt(x), toBigInt(y)), 0).toString();
  }
  function calculateTransactionHashCommon(txHashPrefix, version2, contractAddress, entryPointSelector, calldata, maxFee, chainId, additionalData = []) {
    const calldataHash = computeHashOnElements2(calldata);
    const dataToHash = [
      txHashPrefix,
      version2,
      contractAddress,
      entryPointSelector,
      calldataHash,
      maxFee,
      chainId,
      ...additionalData
    ];
    return computeHashOnElements2(dataToHash);
  }
  function calculateDeployTransactionHash(contractAddress, constructorCalldata, version2, chainId, constructorName = "constructor") {
    return calculateTransactionHashCommon(
      "0x6465706c6f79",
      version2,
      contractAddress,
      getSelectorFromName(constructorName),
      constructorCalldata,
      0,
      chainId
    );
  }
  function calculateDeclareTransactionHash(classHash, senderAddress, version2, maxFee, chainId, nonce, compiledClassHash) {
    return calculateTransactionHashCommon(
      "0x6465636c617265",
      version2,
      senderAddress,
      0,
      [classHash],
      maxFee,
      chainId,
      [nonce, ...compiledClassHash ? [compiledClassHash] : []]
    );
  }
  function calculateDeployAccountTransactionHash(contractAddress, classHash, constructorCalldata, salt, version2, maxFee, chainId, nonce) {
    const calldata = [classHash, salt, ...constructorCalldata];
    return calculateTransactionHashCommon(
      "0x6465706c6f795f6163636f756e74",
      version2,
      contractAddress,
      0,
      calldata,
      maxFee,
      chainId,
      [nonce]
    );
  }
  function calculateTransactionHash(contractAddress, version2, calldata, maxFee, chainId, nonce) {
    return calculateTransactionHashCommon(
      "0x696e766f6b65",
      version2,
      contractAddress,
      0,
      calldata,
      maxFee,
      chainId,
      [nonce]
    );
  }
  function calculateContractAddressFromHash(salt, classHash, constructorCalldata, deployerAddress) {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const constructorCalldataHash = computeHashOnElements2(compiledCalldata);
    const CONTRACT_ADDRESS_PREFIX = felt("0x535441524b4e45545f434f4e54524143545f41444452455353");
    return computeHashOnElements2([
      CONTRACT_ADDRESS_PREFIX,
      deployerAddress,
      salt,
      classHash,
      constructorCalldataHash
    ]);
  }
  function nullSkipReplacer(key, value) {
    if (key === "attributes" || key === "accessible_scopes") {
      return Array.isArray(value) && value.length === 0 ? void 0 : value;
    }
    if (key === "debug_info") {
      return null;
    }
    return value === null ? void 0 : value;
  }
  function formatSpaces(json2) {
    let insideQuotes = false;
    const newString = [];
    for (const char of json2) {
      if (char === '"' && (newString.length > 0 && newString.slice(-1)[0] === "\\") === false) {
        insideQuotes = !insideQuotes;
      }
      if (insideQuotes) {
        newString.push(char);
      } else {
        newString.push(char === ":" ? ": " : char === "," ? ", " : char);
      }
    }
    return newString.join("");
  }
  function computeHintedClassHash(compiledContract) {
    const { abi, program } = compiledContract;
    const contractClass = { abi, program };
    const serializedJson = formatSpaces(stringify2(contractClass, nullSkipReplacer));
    return addHexPrefix(keccak(utf8ToArray(serializedJson)).toString(16));
  }
  function computeLegacyContractClassHash(contract) {
    const compiledContract = typeof contract === "string" ? parse2(contract) : contract;
    const apiVersion = toHex(API_VERSION);
    const externalEntryPointsHash = computeHashOnElements2(
      compiledContract.entry_points_by_type.EXTERNAL.flatMap((e) => [e.selector, e.offset])
    );
    const l1HandlerEntryPointsHash = computeHashOnElements2(
      compiledContract.entry_points_by_type.L1_HANDLER.flatMap((e) => [e.selector, e.offset])
    );
    const constructorEntryPointHash = computeHashOnElements2(
      compiledContract.entry_points_by_type.CONSTRUCTOR.flatMap((e) => [e.selector, e.offset])
    );
    const builtinsHash = computeHashOnElements2(
      compiledContract.program.builtins.map((s) => encodeShortString(s))
    );
    const hintedClassHash = computeHintedClassHash(compiledContract);
    const dataHash = computeHashOnElements2(compiledContract.program.data);
    return computeHashOnElements2([
      apiVersion,
      externalEntryPointsHash,
      l1HandlerEntryPointsHash,
      constructorEntryPointHash,
      builtinsHash,
      hintedClassHash,
      dataHash
    ]);
  }
  function hashBuiltins(builtins) {
    return poseidonHashMany(
      builtins.flatMap((it) => {
        return BigInt(encodeShortString(it));
      })
    );
  }
  function hashEntryPoint(data) {
    const base = data.flatMap((it) => {
      return [BigInt(it.selector), BigInt(it.offset), hashBuiltins(it.builtins)];
    });
    return poseidonHashMany(base);
  }
  function computeCompiledClassHash(casm) {
    const COMPILED_CLASS_VERSION = "COMPILED_CLASS_V1";
    const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_VERSION));
    const externalEntryPointsHash = hashEntryPoint(casm.entry_points_by_type.EXTERNAL);
    const l1Handlers = hashEntryPoint(casm.entry_points_by_type.L1_HANDLER);
    const constructor = hashEntryPoint(casm.entry_points_by_type.CONSTRUCTOR);
    const bytecode = poseidonHashMany(casm.bytecode.map((it) => BigInt(it)));
    return toHex(
      poseidonHashMany([
        compiledClassVersion,
        externalEntryPointsHash,
        l1Handlers,
        constructor,
        bytecode
      ])
    );
  }
  function hashEntryPointSierra(data) {
    const base = data.flatMap((it) => {
      return [BigInt(it.selector), BigInt(it.function_idx)];
    });
    return poseidonHashMany(base);
  }
  function hashAbi(sierra) {
    const indentString = formatSpaces(stringify2(sierra.abi, null));
    return BigInt(addHexPrefix(keccak(utf8ToArray(indentString)).toString(16)));
  }
  function computeSierraContractClassHash(sierra) {
    const CONTRACT_CLASS_VERSION = "CONTRACT_CLASS_V0.1.0";
    const compiledClassVersion = BigInt(encodeShortString(CONTRACT_CLASS_VERSION));
    const externalEntryPointsHash = hashEntryPointSierra(sierra.entry_points_by_type.EXTERNAL);
    const l1Handlers = hashEntryPointSierra(sierra.entry_points_by_type.L1_HANDLER);
    const constructor = hashEntryPointSierra(sierra.entry_points_by_type.CONSTRUCTOR);
    const abiHash = hashAbi(sierra);
    const sierraProgram = poseidonHashMany(sierra.sierra_program.map((it) => BigInt(it)));
    return toHex(
      poseidonHashMany([
        compiledClassVersion,
        externalEntryPointsHash,
        l1Handlers,
        constructor,
        abiHash,
        sierraProgram
      ])
    );
  }
  function computeContractClassHash(contract) {
    const compiledContract = typeof contract === "string" ? parse2(contract) : contract;
    if ("sierra_program" in compiledContract) {
      return computeSierraContractClassHash(compiledContract);
    }
    return computeLegacyContractClassHash(compiledContract);
  }
  var stark_exports = {};
  __export2(stark_exports, {
    compressProgram: () => compressProgram,
    decompressProgram: () => decompressProgram,
    estimatedFeeToMaxFee: () => estimatedFeeToMaxFee,
    formatSignature: () => formatSignature,
    makeAddress: () => makeAddress,
    randomAddress: () => randomAddress,
    signatureToDecimalArray: () => signatureToDecimalArray,
    signatureToHexArray: () => signatureToHexArray
  });
  function compressProgram(jsonProgram) {
    const stringified = typeof jsonProgram === "string" ? jsonProgram : stringify2(jsonProgram);
    const compressedProgram = gzip_1(stringified);
    return btoaUniversal(compressedProgram);
  }
  function decompressProgram(base64) {
    if (Array.isArray(base64))
      return base64;
    const decompressed = arrayBufferToString(ungzip_1(atobUniversal(base64)));
    return parse2(decompressed);
  }
  function randomAddress() {
    const randomKeyPair = utils.randomPrivateKey();
    return getStarkKey(randomKeyPair);
  }
  function makeAddress(input) {
    return addHexPrefix(input).toLowerCase();
  }
  function formatSignature(sig) {
    if (!sig)
      throw Error("formatSignature: provided signature is undefined");
    if (Array.isArray(sig)) {
      return sig.map((it) => toHex(it));
    }
    try {
      const { r, s } = sig;
      return [toHex(r), toHex(s)];
    } catch (e) {
      throw new Error("Signature need to be weierstrass.SignatureType or an array for custom");
    }
  }
  function signatureToDecimalArray(sig) {
    return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
  }
  function signatureToHexArray(sig) {
    return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
  }
  function estimatedFeeToMaxFee(estimatedFee, overhead = 0.5) {
    const overHeadPercent = Math.round((1 + overhead) * 100);
    return toBigInt(estimatedFee) * toBigInt(overHeadPercent) / 100n;
  }
  function isSierra(contract) {
    const compiledContract = typeof contract === "string" ? parse2(contract) : contract;
    return "sierra_program" in compiledContract;
  }
  var fetchPonyfill_default = typeof window !== "undefined" && window.fetch || // use buildin fetch in browser if available
  typeof global !== "undefined" && global.fetch || // use buildin fetch in node, react-native and service worker if available
  import_isomorphic_fetch.default;
  var provider_exports = {};
  __export2(provider_exports, {
    createSierraContractClass: () => createSierraContractClass,
    parseContract: () => parseContract,
    wait: () => wait
  });
  function wait(delay) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }
  function createSierraContractClass(contract) {
    const result = { ...contract };
    delete result.sierra_program_debug_info;
    result.abi = formatSpaces(stringify2(contract.abi));
    result.sierra_program = formatSpaces(stringify2(contract.sierra_program));
    result.sierra_program = compressProgram(result.sierra_program);
    return result;
  }
  function parseContract(contract) {
    const parsedContract = typeof contract === "string" ? parse2(contract) : contract;
    if (!isSierra(contract)) {
      return {
        ...parsedContract,
        ..."program" in parsedContract && { program: compressProgram(parsedContract.program) }
      };
    }
    return createSierraContractClass(parsedContract);
  }
  var RPCResponseParser = class {
    parseGetBlockResponse(res) {
      return {
        timestamp: res.timestamp,
        block_hash: res.block_hash,
        block_number: res.block_number,
        new_root: res.new_root,
        parent_hash: res.parent_hash,
        status: res.status,
        transactions: res.transactions
      };
    }
    parseGetTransactionResponse(res) {
      return {
        calldata: res.calldata || [],
        contract_address: res.contract_address,
        sender_address: res.contract_address,
        max_fee: res.max_fee,
        nonce: res.nonce,
        signature: res.signature || [],
        transaction_hash: res.transaction_hash,
        version: res.version
      };
    }
    parseFeeEstimateResponse(res) {
      return {
        overall_fee: toBigInt(res[0].overall_fee),
        gas_consumed: toBigInt(res[0].gas_consumed),
        gas_price: toBigInt(res[0].gas_price)
      };
    }
    parseFeeEstimateBulkResponse(res) {
      return res.map((val) => ({
        overall_fee: toBigInt(val.overall_fee),
        gas_consumed: toBigInt(val.gas_consumed),
        gas_price: toBigInt(val.gas_price)
      }));
    }
    parseCallContractResponse(res) {
      return {
        result: res
      };
    }
    parseSimulateTransactionResponse(res) {
      return res.map((it) => {
        return {
          ...it,
          suggestedMaxFee: estimatedFeeToMaxFee(BigInt(it.fee_estimation.overall_fee))
        };
      });
    }
    parseContractClassResponse(res) {
      return {
        ...res,
        abi: typeof res.abi === "string" ? JSON.parse(res.abi) : res.abi
      };
    }
  };
  function fixStack(target, fn = target.constructor) {
    const { captureStackTrace } = Error;
    captureStackTrace && captureStackTrace(target, fn);
  }
  function fixProto(target, prototype) {
    const { setPrototypeOf } = Object;
    setPrototypeOf ? setPrototypeOf(target, prototype) : target.__proto__ = prototype;
  }
  var CustomError = class extends Error {
    constructor(message) {
      super(message);
      Object.defineProperty(this, "name", {
        value: new.target.name,
        enumerable: false,
        configurable: true
      });
      fixProto(this, new.target.prototype);
      fixStack(this);
    }
  };
  var LibraryError = class extends CustomError {
  };
  var GatewayError = class extends LibraryError {
    constructor(message, errorCode) {
      super(message);
      this.errorCode = errorCode;
    }
  };
  var HttpError = class extends LibraryError {
    constructor(message, errorCode) {
      super(message);
      this.errorCode = errorCode;
    }
  };
  var starknetId_exports = {};
  __export2(starknetId_exports, {
    StarknetIdContract: () => StarknetIdContract,
    getStarknetIdContract: () => getStarknetIdContract,
    useDecoded: () => useDecoded,
    useEncoded: () => useEncoded
  });
  var basicAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789-";
  var basicSizePlusOne = BigInt(basicAlphabet.length + 1);
  var bigAlphabet = "\u8FD9\u6765";
  var basicAlphabetSize = BigInt(basicAlphabet.length);
  var bigAlphabetSize = BigInt(bigAlphabet.length);
  var bigAlphabetSizePlusOne = BigInt(bigAlphabet.length + 1);
  function extractStars(str) {
    let k = 0;
    while (str.endsWith(bigAlphabet[bigAlphabet.length - 1])) {
      str = str.substring(0, str.length - 1);
      k += 1;
    }
    return [str, k];
  }
  function useDecoded(encoded) {
    let decoded = "";
    encoded.forEach((subdomain) => {
      while (subdomain !== ZERO) {
        const code = subdomain % basicSizePlusOne;
        subdomain /= basicSizePlusOne;
        if (code === BigInt(basicAlphabet.length)) {
          const nextSubdomain = subdomain / bigAlphabetSizePlusOne;
          if (nextSubdomain === ZERO) {
            const code2 = subdomain % bigAlphabetSizePlusOne;
            subdomain = nextSubdomain;
            if (code2 === ZERO)
              decoded += basicAlphabet[0];
            else
              decoded += bigAlphabet[Number(code2) - 1];
          } else {
            const code2 = subdomain % bigAlphabetSize;
            decoded += bigAlphabet[Number(code2)];
            subdomain /= bigAlphabetSize;
          }
        } else
          decoded += basicAlphabet[Number(code)];
      }
      const [str, k] = extractStars(decoded);
      if (k)
        decoded = str + (k % 2 === 0 ? bigAlphabet[bigAlphabet.length - 1].repeat(k / 2 - 1) + bigAlphabet[0] + basicAlphabet[1] : bigAlphabet[bigAlphabet.length - 1].repeat((k - 1) / 2 + 1));
      decoded += ".";
    });
    if (!decoded) {
      return decoded;
    }
    return decoded.concat("stark");
  }
  function useEncoded(decoded) {
    let encoded = BigInt(0);
    let multiplier = BigInt(1);
    if (decoded.endsWith(bigAlphabet[0] + basicAlphabet[1])) {
      const [str, k] = extractStars(decoded.substring(0, decoded.length - 2));
      decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(2 * (k + 1));
    } else {
      const [str, k] = extractStars(decoded);
      if (k)
        decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(1 + 2 * (k - 1));
    }
    for (let i = 0; i < decoded.length; i += 1) {
      const char = decoded[i];
      const index = basicAlphabet.indexOf(char);
      const bnIndex = BigInt(basicAlphabet.indexOf(char));
      if (index !== -1) {
        if (i === decoded.length - 1 && decoded[i] === basicAlphabet[0]) {
          encoded += multiplier * basicAlphabetSize;
          multiplier *= basicSizePlusOne;
          multiplier *= basicSizePlusOne;
        } else {
          encoded += multiplier * bnIndex;
          multiplier *= basicSizePlusOne;
        }
      } else if (bigAlphabet.indexOf(char) !== -1) {
        encoded += multiplier * basicAlphabetSize;
        multiplier *= basicSizePlusOne;
        const newid = (i === decoded.length - 1 ? 1 : 0) + bigAlphabet.indexOf(char);
        encoded += multiplier * BigInt(newid);
        multiplier *= bigAlphabetSize;
      }
    }
    return encoded;
  }
  var StarknetIdContract = /* @__PURE__ */ ((StarknetIdContract2) => {
    StarknetIdContract2["MAINNET"] = "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678";
    StarknetIdContract2["TESTNET"] = "0x3bab268e932d2cecd1946f100ae67ce3dff9fd234119ea2f6da57d16d29fce";
    return StarknetIdContract2;
  })(StarknetIdContract || {});
  function getStarknetIdContract(chainId) {
    switch (chainId) {
      case "0x534e5f4d41494e":
        return "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678";
      case "0x534e5f474f45524c49":
        return "0x3bab268e932d2cecd1946f100ae67ce3dff9fd234119ea2f6da57d16d29fce";
      default:
        throw new Error("Starknet.id is not yet deployed on this network");
    }
  }
  async function getStarkName(provider, address, StarknetIdContract2) {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract2 ?? getStarknetIdContract(chainId);
    try {
      const hexDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: "address_to_domain",
        calldata: CallData.compile({
          address
        })
      });
      const decimalDomain = hexDomain.result.map((element) => BigInt(element)).slice(1);
      const stringDomain = useDecoded(decimalDomain);
      if (!stringDomain) {
        throw Error("Starkname not found");
      }
      return stringDomain;
    } catch (e) {
      if (e instanceof Error && e.message === "Starkname not found") {
        throw e;
      }
      throw Error("Could not get stark name");
    }
  }
  async function getAddressFromStarkName(provider, name, StarknetIdContract2) {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract2 ?? getStarknetIdContract(chainId);
    try {
      const addressData = await provider.callContract({
        contractAddress: contract,
        entrypoint: "domain_to_address",
        calldata: CallData.compile({
          domain: [useEncoded(name.replace(".stark", "")).toString(10)]
        })
      });
      return addressData.result[0];
    } catch {
      throw Error("Could not get address from stark name");
    }
  }
  var validBlockTags = Object.values(BlockTag);
  var Block = class {
    constructor(_identifier) {
      this.hash = null;
      this.number = null;
      this.tag = null;
      this.valueOf = () => this.number;
      this.toString = () => this.hash;
      this.setIdentifier(_identifier);
    }
    setIdentifier(__identifier) {
      if (typeof __identifier === "string" && isHex2(__identifier)) {
        this.hash = __identifier;
      } else if (typeof __identifier === "bigint") {
        this.hash = toHex(__identifier);
      } else if (typeof __identifier === "number") {
        this.number = __identifier;
      } else if (typeof __identifier === "string" && validBlockTags.includes(__identifier)) {
        this.tag = __identifier;
      } else {
        this.tag = "pending";
      }
    }
    // TODO: fix any
    get queryIdentifier() {
      if (this.number !== null) {
        return `blockNumber=${this.number}`;
      }
      if (this.hash !== null) {
        return `blockHash=${this.hash}`;
      }
      return `blockNumber=${this.tag}`;
    }
    // TODO: fix any
    get identifier() {
      if (this.number !== null) {
        return { block_number: this.number };
      }
      if (this.hash !== null) {
        return { block_hash: this.hash };
      }
      return this.tag;
    }
    set identifier(_identifier) {
      this.setIdentifier(_identifier);
    }
    get sequencerIdentifier() {
      return this.hash !== null ? { blockHash: this.hash } : { blockNumber: this.number ?? this.tag };
    }
  };
  var defaultOptions = {
    headers: { "Content-Type": "application/json" },
    blockIdentifier: "pending",
    retries: 200
  };
  var RpcProvider = class {
    constructor(optionsOrProvider) {
      this.responseParser = new RPCResponseParser();
      const { nodeUrl, retries, headers, blockIdentifier, chainId } = optionsOrProvider;
      this.nodeUrl = nodeUrl;
      this.retries = retries || defaultOptions.retries;
      this.headers = { ...defaultOptions.headers, ...headers };
      this.blockIdentifier = blockIdentifier || defaultOptions.blockIdentifier;
      this.chainId = chainId;
      this.getChainId();
    }
    fetch(method, params) {
      const body = stringify2({ method, jsonrpc: "2.0", params, id: 0 });
      return fetchPonyfill_default(this.nodeUrl, {
        method: "POST",
        body,
        headers: this.headers
      });
    }
    errorHandler(error) {
      if (error) {
        const { code, message } = error;
        throw new LibraryError(`${code}: ${message}`);
      }
    }
    async fetchEndpoint(method, params) {
      try {
        const rawResult = await this.fetch(method, params);
        const { error, result } = await rawResult.json();
        this.errorHandler(error);
        return result;
      } catch (error) {
        this.errorHandler(error?.response?.data);
        throw error;
      }
    }
    // Methods from Interface
    async getChainId() {
      this.chainId ?? (this.chainId = await this.fetchEndpoint("starknet_chainId"));
      return this.chainId;
    }
    async getBlock(blockIdentifier = this.blockIdentifier) {
      return this.getBlockWithTxHashes(blockIdentifier).then(
        this.responseParser.parseGetBlockResponse
      );
    }
    async getBlockHashAndNumber() {
      return this.fetchEndpoint("starknet_blockHashAndNumber");
    }
    async getBlockWithTxHashes(blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getBlockWithTxHashes", { block_id });
    }
    async getBlockWithTxs(blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getBlockWithTxs", { block_id });
    }
    async getClassHashAt(contractAddress, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getClassHashAt", {
        block_id,
        contract_address: contractAddress
      });
    }
    async getNonceForAddress(contractAddress, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getNonce", {
        contract_address: contractAddress,
        block_id
      });
    }
    async getPendingTransactions() {
      return this.fetchEndpoint("starknet_pendingTransactions");
    }
    async getProtocolVersion() {
      throw new Error("Pathfinder does not implement this rpc 0.1.0 method");
    }
    async getStateUpdate(blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getStateUpdate", { block_id });
    }
    async getStorageAt(contractAddress, key, blockIdentifier = this.blockIdentifier) {
      const parsedKey = toStorageKey(key);
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getStorageAt", {
        contract_address: contractAddress,
        key: parsedKey,
        block_id
      });
    }
    // Methods from Interface
    async getTransaction(txHash) {
      return this.getTransactionByHash(txHash).then(this.responseParser.parseGetTransactionResponse);
    }
    async getTransactionByHash(txHash) {
      return this.fetchEndpoint("starknet_getTransactionByHash", { transaction_hash: txHash });
    }
    async getTransactionByBlockIdAndIndex(blockIdentifier, index) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getTransactionByBlockIdAndIndex", { block_id, index });
    }
    async getTransactionReceipt(txHash) {
      return this.fetchEndpoint("starknet_getTransactionReceipt", { transaction_hash: txHash });
    }
    async getClassByHash(classHash) {
      return this.getClass(classHash);
    }
    async getClass(classHash, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getClass", {
        class_hash: classHash,
        block_id
      }).then(this.responseParser.parseContractClassResponse);
    }
    async getClassAt(contractAddress, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getClassAt", {
        block_id,
        contract_address: contractAddress
      }).then(this.responseParser.parseContractClassResponse);
    }
    async getCode(_contractAddress, _blockIdentifier) {
      throw new Error("RPC does not implement getCode function");
    }
    async getEstimateFee(invocation, invocationDetails, blockIdentifier = this.blockIdentifier) {
      return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier);
    }
    async getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      const transaction = this.buildTransaction(
        {
          type: "INVOKE_FUNCTION",
          ...invocation,
          ...invocationDetails
        },
        "fee"
      );
      return this.fetchEndpoint("starknet_estimateFee", {
        request: [transaction],
        block_id
      }).then(this.responseParser.parseFeeEstimateResponse);
    }
    async getDeclareEstimateFee(invocation, details, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      const transaction = this.buildTransaction(
        {
          type: "DECLARE",
          ...invocation,
          ...details
        },
        "fee"
      );
      return this.fetchEndpoint("starknet_estimateFee", {
        request: [transaction],
        block_id
      }).then(this.responseParser.parseFeeEstimateResponse);
    }
    async getDeployAccountEstimateFee(invocation, details, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      const transaction = this.buildTransaction(
        {
          type: "DEPLOY_ACCOUNT",
          ...invocation,
          ...details
        },
        "fee"
      );
      return this.fetchEndpoint("starknet_estimateFee", {
        request: [transaction],
        block_id
      }).then(this.responseParser.parseFeeEstimateResponse);
    }
    async getEstimateFeeBulk(invocations, { blockIdentifier = this.blockIdentifier, skipValidate = false }) {
      if (skipValidate) {
        console.warn("getEstimateFeeBulk RPC does not support skipValidate");
      }
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_estimateFee", {
        request: invocations.map((it) => this.buildTransaction(it, "fee")),
        block_id
      }).then(this.responseParser.parseFeeEstimateBulkResponse);
    }
    async declareContract({ contract, signature, senderAddress, compiledClassHash }, details) {
      if (!isSierra(contract)) {
        return this.fetchEndpoint("starknet_addDeclareTransaction", {
          declare_transaction: {
            type: rpc_exports.TransactionType.DECLARE,
            contract_class: {
              program: contract.program,
              entry_points_by_type: contract.entry_points_by_type,
              abi: contract.abi
            },
            version: HEX_STR_TRANSACTION_VERSION_1,
            max_fee: toHex(details.maxFee || 0),
            signature: signatureToHexArray(signature),
            sender_address: senderAddress,
            nonce: toHex(details.nonce)
          }
        });
      }
      return this.fetchEndpoint("starknet_addDeclareTransaction", {
        declare_transaction: {
          type: rpc_exports.TransactionType.DECLARE,
          contract_class: {
            sierra_program: decompressProgram(contract.sierra_program),
            contract_class_version: contract.contract_class_version,
            entry_points_by_type: contract.entry_points_by_type,
            abi: contract.abi
          },
          compiled_class_hash: compiledClassHash || "",
          version: HEX_STR_TRANSACTION_VERSION_2,
          max_fee: toHex(details.maxFee || 0),
          signature: signatureToHexArray(signature),
          sender_address: senderAddress,
          nonce: toHex(details.nonce)
        }
      });
    }
    async deployAccountContract({ classHash, constructorCalldata, addressSalt, signature }, details) {
      return this.fetchEndpoint("starknet_addDeployAccountTransaction", {
        deploy_account_transaction: {
          constructor_calldata: CallData.toHex(constructorCalldata || []),
          class_hash: toHex(classHash),
          contract_address_salt: toHex(addressSalt || 0),
          type: rpc_exports.TransactionType.DEPLOY_ACCOUNT,
          max_fee: toHex(details.maxFee || 0),
          version: toHex(details.version || 0),
          signature: signatureToHexArray(signature),
          nonce: toHex(details.nonce)
        }
      });
    }
    async invokeFunction(functionInvocation, details) {
      return this.fetchEndpoint("starknet_addInvokeTransaction", {
        invoke_transaction: {
          sender_address: functionInvocation.contractAddress,
          calldata: CallData.toHex(functionInvocation.calldata),
          type: rpc_exports.TransactionType.INVOKE,
          max_fee: toHex(details.maxFee || 0),
          version: "0x1",
          signature: signatureToHexArray(functionInvocation.signature),
          nonce: toHex(details.nonce)
        }
      });
    }
    // Methods from Interface
    async callContract(call, blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      const result = await this.fetchEndpoint("starknet_call", {
        request: {
          contract_address: call.contractAddress,
          entry_point_selector: getSelectorFromName(call.entrypoint),
          calldata: CallData.toHex(call.calldata)
        },
        block_id
      });
      return this.responseParser.parseCallContractResponse(result);
    }
    async traceTransaction(transactionHash) {
      return this.fetchEndpoint("starknet_traceTransaction", { transaction_hash: transactionHash });
    }
    async traceBlockTransactions(blockHash) {
      return this.fetchEndpoint("starknet_traceBlockTransactions", { block_hash: blockHash });
    }
    async waitForTransaction(txHash, options) {
      let { retries } = this;
      let onchain = false;
      let isErrorState = false;
      let txReceipt = {};
      const retryInterval = options?.retryInterval ?? 5e3;
      const errorStates = options?.errorStates ?? [TransactionExecutionStatus2.REVERTED];
      const successStates = options?.successStates ?? [
        TransactionExecutionStatus2.SUCCEEDED,
        TransactionFinalityStatus2.ACCEPTED_ON_L1,
        TransactionFinalityStatus2.ACCEPTED_ON_L2
      ];
      while (!onchain) {
        await wait(retryInterval);
        try {
          txReceipt = await this.getTransactionReceipt(txHash);
          const executionStatus = pascalToSnake(txReceipt.execution_status);
          const finalityStatus = pascalToSnake(txReceipt.finality_status);
          if (!executionStatus || !finalityStatus) {
            const error = new Error("waiting for transaction status");
            throw error;
          }
          if (successStates.includes(executionStatus) || successStates.includes(finalityStatus)) {
            onchain = true;
          } else if (errorStates.includes(executionStatus) || errorStates.includes(finalityStatus)) {
            const message = `${executionStatus}: ${finalityStatus}: ${txReceipt.revert_reason}`;
            const error = new Error(message);
            error.response = txReceipt;
            isErrorState = true;
            throw error;
          }
        } catch (error) {
          if (error instanceof Error && isErrorState) {
            throw error;
          }
          if (retries === 0) {
            throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
          }
        }
        retries -= 1;
      }
      await wait(retryInterval);
      return txReceipt;
    }
    /**
     * Gets the transaction count from a block.
     *
     *
     * @param blockIdentifier
     * @returns Number of transactions
     */
    async getTransactionCount(blockIdentifier = this.blockIdentifier) {
      const block_id = new Block(blockIdentifier).identifier;
      return this.fetchEndpoint("starknet_getBlockTransactionCount", { block_id });
    }
    /**
     * Gets the latest block number
     *
     *
     * @returns Number of the latest block
     */
    async getBlockNumber() {
      return this.fetchEndpoint("starknet_blockNumber");
    }
    /**
     * Gets syncing status of the node
     *
     *
     * @returns Object with the stats data
     */
    async getSyncingStats() {
      return this.fetchEndpoint("starknet_syncing");
    }
    /**
     * Gets all the events filtered
     *
     *
     * @returns events and the pagination of the events
     */
    async getEvents(eventFilter) {
      return this.fetchEndpoint("starknet_getEvents", { filter: eventFilter });
    }
    async getSimulateTransaction(invocations, {
      blockIdentifier = this.blockIdentifier,
      skipValidate = false,
      skipExecute = false,
      // @deprecated
      skipFeeCharge = true
      // Pathfinder currently does not support `starknet_simulateTransactions` without `SKIP_FEE_CHARGE` simulation flag being set. This will become supported in a future release
    }) {
      const block_id = new Block(blockIdentifier).identifier;
      const simulationFlags = [];
      if (skipValidate)
        simulationFlags.push(SimulationFlag.SKIP_VALIDATE);
      if (skipExecute || skipFeeCharge)
        simulationFlags.push(SimulationFlag.SKIP_FEE_CHARGE);
      return this.fetchEndpoint("starknet_simulateTransactions", {
        block_id,
        transactions: invocations.map((it) => this.buildTransaction(it)),
        simulation_flags: simulationFlags
      }).then(this.responseParser.parseSimulateTransactionResponse);
    }
    async getStarkName(address, StarknetIdContract2) {
      return getStarkName(this, address, StarknetIdContract2);
    }
    async getAddressFromStarkName(name, StarknetIdContract2) {
      return getAddressFromStarkName(this, name, StarknetIdContract2);
    }
    buildTransaction(invocation, versionType) {
      const defaultVersions = getVersionsByType(versionType);
      const details = {
        signature: signatureToHexArray(invocation.signature),
        nonce: toHex(invocation.nonce),
        max_fee: toHex(invocation.maxFee || 0)
      };
      if (invocation.type === "INVOKE_FUNCTION") {
        return {
          type: rpc_exports.TransactionType.INVOKE,
          // Diff between sequencer and rpc invoke type
          sender_address: invocation.contractAddress,
          calldata: CallData.toHex(invocation.calldata),
          version: toHex(invocation.version || defaultVersions.v1),
          // HEX_STR_TRANSACTION_VERSION_1, // as any HOTFIX TODO: Resolve spec version
          ...details
        };
      }
      if (invocation.type === "DECLARE") {
        if (!isSierra(invocation.contract)) {
          return {
            type: invocation.type,
            contract_class: invocation.contract,
            sender_address: invocation.senderAddress,
            version: toHex(invocation.version || defaultVersions.v1),
            // HEX_STR_TRANSACTION_VERSION_1, // as any HOTFIX TODO: Resolve spec version
            ...details
          };
        }
        return {
          // compiled_class_hash
          type: invocation.type,
          contract_class: {
            ...invocation.contract,
            sierra_program: decompressProgram(invocation.contract.sierra_program)
          },
          compiled_class_hash: invocation.compiledClassHash || "",
          sender_address: invocation.senderAddress,
          version: toHex(invocation.version || defaultVersions.v2),
          // HEX_STR_TRANSACTION_VERSION_2, // as any HOTFIX TODO: Resolve spec version
          ...details
        };
      }
      if (invocation.type === "DEPLOY_ACCOUNT") {
        return {
          type: invocation.type,
          constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
          class_hash: toHex(invocation.classHash),
          contract_address_salt: toHex(invocation.addressSalt || 0),
          version: toHex(invocation.version || defaultVersions.v1),
          ...details
        };
      }
      throw Error("RPC buildTransaction received unknown TransactionType");
    }
  };
  var ResponseParser = class {
  };
  var SequencerAPIResponseParser = class extends ResponseParser {
    parseGetBlockResponse(res) {
      return {
        ...res,
        new_root: res.state_root,
        parent_hash: res.parent_block_hash,
        transactions: Object.values(res.transactions).map((value) => "transaction_hash" in value && value.transaction_hash).filter(Boolean)
      };
    }
    parseGetTransactionResponse(res) {
      if (res.status === "NOT_RECEIVED" && res.finality_status === "NOT_RECEIVED") {
        throw new LibraryError();
      }
      return {
        ...res,
        calldata: "calldata" in res.transaction ? res.transaction.calldata : [],
        contract_class: "contract_class" in res.transaction ? res.transaction.contract_class : void 0,
        entry_point_selector: "entry_point_selector" in res.transaction ? res.transaction.entry_point_selector : void 0,
        max_fee: "max_fee" in res.transaction ? res.transaction.max_fee : void 0,
        nonce: res.transaction.nonce,
        sender_address: "sender_address" in res.transaction ? res.transaction.sender_address : void 0,
        signature: "signature" in res.transaction ? res.transaction.signature : void 0,
        transaction_hash: "transaction_hash" in res.transaction ? res.transaction.transaction_hash : void 0,
        version: "version" in res.transaction ? res.transaction.version : void 0
      };
    }
    parseGetTransactionReceiptResponse(res) {
      return {
        ...res,
        messages_sent: res.l2_to_l1_messages,
        ..."revert_error" in res && { revert_reason: res.revert_error }
      };
    }
    parseFeeEstimateResponse(res) {
      if ("overall_fee" in res) {
        let gasInfo = {};
        try {
          gasInfo = {
            gas_consumed: toBigInt(res.gas_usage),
            gas_price: toBigInt(res.gas_price)
          };
        } catch {
        }
        return {
          overall_fee: toBigInt(res.overall_fee),
          ...gasInfo
        };
      }
      return {
        overall_fee: toBigInt(res.amount)
      };
    }
    parseFeeEstimateBulkResponse(res) {
      return [].concat(res).map((item) => {
        if ("overall_fee" in item) {
          let gasInfo = {};
          try {
            gasInfo = {
              gas_consumed: toBigInt(item.gas_usage),
              gas_price: toBigInt(item.gas_price)
            };
          } catch {
          }
          return {
            overall_fee: toBigInt(item.overall_fee),
            ...gasInfo
          };
        }
        return {
          overall_fee: toBigInt(item.amount)
        };
      });
    }
    parseSimulateTransactionResponse(res) {
      const suggestedMaxFee = "overall_fee" in res.fee_estimation ? res.fee_estimation.overall_fee : res.fee_estimation.amount;
      return [
        {
          transaction_trace: res.trace,
          fee_estimation: res.fee_estimation,
          suggestedMaxFee: estimatedFeeToMaxFee(BigInt(suggestedMaxFee))
        }
      ];
    }
    parseCallContractResponse(res) {
      return {
        result: res.result
      };
    }
    parseInvokeFunctionResponse(res) {
      return {
        transaction_hash: res.transaction_hash
      };
    }
    parseDeployContractResponse(res) {
      return {
        transaction_hash: res.transaction_hash,
        contract_address: res.address
      };
    }
    parseDeclareContractResponse(res) {
      return {
        transaction_hash: res.transaction_hash,
        class_hash: res.class_hash
      };
    }
    parseGetStateUpdateResponse(res) {
      const nonces = Object.entries(res.state_diff.nonces).map(([contract_address, nonce]) => ({
        contract_address,
        nonce
      }));
      const storage_diffs = Object.entries(res.state_diff.storage_diffs).map(
        ([address, storage_entries]) => ({ address, storage_entries })
      );
      return {
        ...res,
        state_diff: {
          ...res.state_diff,
          storage_diffs,
          nonces
        }
      };
    }
    parseContractClassResponse(res) {
      const response = isSierra(res) ? res : parseContract(res);
      return {
        ...response,
        abi: typeof response.abi === "string" ? JSON.parse(response.abi) : response.abi
      };
    }
  };
  var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
  var localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
  var nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;
  function isUrl(s) {
    if (!s) {
      return false;
    }
    if (typeof s !== "string") {
      return false;
    }
    const match = s.match(protocolAndDomainRE);
    if (!match) {
      return false;
    }
    const everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
      return false;
    }
    if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
      return true;
    }
    return false;
  }
  function buildUrl(baseUrl, defaultPath, urlOrPath) {
    return isUrl(urlOrPath) ? urlOrPath : (0, import_url_join2.default)(baseUrl, urlOrPath ?? defaultPath);
  }
  function isEmptyQueryObject(obj) {
    return obj === void 0 || Object.keys(obj).length === 0 || Object.keys(obj).length === 1 && Object.entries(obj).every(([k, v]) => k === "blockIdentifier" && v === null);
  }
  var defaultOptions2 = {
    network: "SN_GOERLI2",
    blockIdentifier: "pending"
    /* pending */
  };
  var SequencerProvider = class {
    constructor(optionsOrProvider = defaultOptions2) {
      this.responseParser = new SequencerAPIResponseParser();
      if ("network" in optionsOrProvider) {
        this.baseUrl = SequencerProvider.getNetworkFromName(optionsOrProvider.network);
        this.feederGatewayUrl = buildUrl(this.baseUrl, "feeder_gateway");
        this.gatewayUrl = buildUrl(this.baseUrl, "gateway");
      } else {
        this.baseUrl = optionsOrProvider.baseUrl;
        this.feederGatewayUrl = buildUrl(
          this.baseUrl,
          "feeder_gateway",
          optionsOrProvider.feederGatewayUrl
        );
        this.gatewayUrl = buildUrl(this.baseUrl, "gateway", optionsOrProvider.gatewayUrl);
      }
      this.chainId = optionsOrProvider?.chainId ?? SequencerProvider.getChainIdFromBaseUrl(this.baseUrl);
      this.headers = optionsOrProvider.headers;
      this.blockIdentifier = optionsOrProvider?.blockIdentifier || defaultOptions2.blockIdentifier;
    }
    static getNetworkFromName(name) {
      switch (name) {
        case "SN_MAIN":
        case "0x534e5f4d41494e":
          return "https://alpha-mainnet.starknet.io";
        case "SN_GOERLI":
        case "0x534e5f474f45524c49":
          return "https://alpha4.starknet.io";
        case "SN_GOERLI2":
        case "0x534e5f474f45524c4932":
          return "https://alpha4-2.starknet.io";
        default:
          throw new Error("Could not detect base url from NetworkName");
      }
    }
    static getChainIdFromBaseUrl(baseUrl) {
      try {
        const url = new URL(baseUrl);
        if (url.host.includes("mainnet.starknet.io")) {
          return "0x534e5f4d41494e";
        }
        if (url.host.includes("alpha4-2.starknet.io")) {
          return "0x534e5f474f45524c4932";
        }
        return "0x534e5f474f45524c49";
      } catch {
        console.error(`Could not parse baseUrl: ${baseUrl}`);
        return "0x534e5f474f45524c49";
      }
    }
    getFetchUrl(endpoint) {
      const gatewayUrlEndpoints = ["add_transaction"];
      return gatewayUrlEndpoints.includes(endpoint) ? this.gatewayUrl : this.feederGatewayUrl;
    }
    getFetchMethod(endpoint) {
      const postMethodEndpoints = [
        "add_transaction",
        "call_contract",
        "estimate_fee",
        "estimate_message_fee",
        "estimate_fee_bulk",
        "simulate_transaction"
      ];
      return postMethodEndpoints.includes(endpoint) ? "POST" : "GET";
    }
    getQueryString(query) {
      if (isEmptyQueryObject(query)) {
        return "";
      }
      const queryString = Object.entries(query).map(([key, value]) => {
        if (key === "blockIdentifier") {
          const block = new Block(value);
          return `${block.queryIdentifier}`;
        }
        return `${key}=${value}`;
      }).join("&");
      return `?${queryString}`;
    }
    getHeaders(method) {
      if (method === "POST") {
        return {
          "Content-Type": "application/json",
          ...this.headers
        };
      }
      return this.headers;
    }
    // typesafe fetch
    async fetchEndpoint(endpoint, ...[query, request]) {
      const baseUrl = this.getFetchUrl(endpoint);
      const method = this.getFetchMethod(endpoint);
      const queryString = this.getQueryString(query);
      const url = (0, import_url_join.default)(baseUrl, endpoint, queryString);
      return this.fetch(url, {
        method,
        body: request
      });
    }
    async fetch(endpoint, options) {
      const url = buildUrl(this.baseUrl, "", endpoint);
      const method = options?.method ?? "GET";
      const headers = this.getHeaders(method);
      const body = stringify2(options?.body);
      try {
        const response = await fetchPonyfill_default(url, {
          method,
          body,
          headers
        });
        const textResponse = await response.text();
        if (!response.ok) {
          let responseBody;
          try {
            responseBody = parse2(textResponse);
          } catch {
            throw new HttpError(response.statusText, response.status);
          }
          throw new GatewayError(responseBody.message, responseBody.code);
        }
        const parseChoice = options?.parseAlwaysAsBigInt ? parseAlwaysAsBig : parse2;
        return parseChoice(textResponse);
      } catch (error) {
        if (error instanceof Error && !(error instanceof LibraryError))
          throw Error(`Could not ${method} from endpoint \`${url}\`: ${error.message}`);
        throw error;
      }
    }
    async getChainId() {
      return Promise.resolve(this.chainId);
    }
    async callContract({ contractAddress, entrypoint: entryPointSelector, calldata = [] }, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint(
        "call_contract",
        { blockIdentifier },
        {
          // TODO - determine best choice once both are fully supported in devnet
          // signature: [],
          // sender_address: contractAddress,
          contract_address: contractAddress,
          entry_point_selector: getSelectorFromName(entryPointSelector),
          calldata: CallData.compile(calldata)
        }
      ).then(this.responseParser.parseCallContractResponse);
    }
    async getBlock(blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_block", { blockIdentifier }).then(
        this.responseParser.parseGetBlockResponse
      );
    }
    async getNonceForAddress(contractAddress, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_nonce", { contractAddress, blockIdentifier });
    }
    async getStorageAt(contractAddress, key, blockIdentifier = this.blockIdentifier) {
      const parsedKey = toBigInt(key).toString(10);
      return this.fetchEndpoint("get_storage_at", {
        blockIdentifier,
        contractAddress,
        key: parsedKey
      });
    }
    async getTransaction(txHash) {
      const txHashHex = toHex(txHash);
      return this.fetchEndpoint("get_transaction", { transactionHash: txHashHex }).then((result) => {
        if (Object.values(result).length === 1)
          throw new LibraryError(result.status);
        return this.responseParser.parseGetTransactionResponse(result);
      });
    }
    async getTransactionReceipt(txHash) {
      const txHashHex = toHex(txHash);
      return this.fetchEndpoint("get_transaction_receipt", { transactionHash: txHashHex }).then(
        this.responseParser.parseGetTransactionReceiptResponse
      );
    }
    async getClassAt(contractAddress, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_full_contract", { blockIdentifier, contractAddress }).then(
        this.responseParser.parseContractClassResponse
      );
    }
    async getClassHashAt(contractAddress, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_class_hash_at", { blockIdentifier, contractAddress });
    }
    async getClassByHash(classHash, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_class_by_hash", { classHash, blockIdentifier }).then(
        this.responseParser.parseContractClassResponse
      );
    }
    async getCompiledClassByClassHash(classHash, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_compiled_class_by_class_hash", { classHash, blockIdentifier });
    }
    async invokeFunction(functionInvocation, details) {
      return this.fetchEndpoint("add_transaction", void 0, {
        type: "INVOKE_FUNCTION",
        sender_address: functionInvocation.contractAddress,
        calldata: CallData.compile(functionInvocation.calldata ?? []),
        signature: signatureToDecimalArray(functionInvocation.signature),
        nonce: toHex(details.nonce),
        max_fee: toHex(details.maxFee || 0),
        version: "0x1"
      }).then(this.responseParser.parseInvokeFunctionResponse);
    }
    async deployAccountContract({ classHash, constructorCalldata, addressSalt, signature }, details) {
      return this.fetchEndpoint("add_transaction", void 0, {
        type: "DEPLOY_ACCOUNT",
        contract_address_salt: addressSalt ?? randomAddress(),
        constructor_calldata: CallData.compile(constructorCalldata ?? []),
        class_hash: toHex(classHash),
        max_fee: toHex(details.maxFee || 0),
        version: toHex(details.version || 0),
        nonce: toHex(details.nonce),
        signature: signatureToDecimalArray(signature)
      }).then(this.responseParser.parseDeployContractResponse);
    }
    async declareContract({ senderAddress, contract, signature, compiledClassHash }, details) {
      if (!isSierra(contract)) {
        return this.fetchEndpoint("add_transaction", void 0, {
          type: "DECLARE",
          contract_class: contract,
          nonce: toHex(details.nonce),
          signature: signatureToDecimalArray(signature),
          sender_address: senderAddress,
          max_fee: toHex(details.maxFee || 0),
          version: toHex(transactionVersion)
        }).then(this.responseParser.parseDeclareContractResponse);
      }
      return this.fetchEndpoint("add_transaction", void 0, {
        type: "DECLARE",
        sender_address: senderAddress,
        compiled_class_hash: compiledClassHash,
        contract_class: contract,
        nonce: toHex(details.nonce),
        signature: signatureToDecimalArray(signature),
        max_fee: toHex(details.maxFee || 0),
        version: toHex(transactionVersion_2)
      }).then(this.responseParser.parseDeclareContractResponse);
    }
    async getEstimateFee(invocation, invocationDetails, blockIdentifier = this.blockIdentifier, skipValidate = false) {
      return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier, skipValidate);
    }
    async getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier = this.blockIdentifier, skipValidate = false) {
      const transaction = this.buildTransaction(
        {
          type: "INVOKE_FUNCTION",
          ...invocation,
          ...invocationDetails
        },
        "fee"
      );
      return this.fetchEndpoint("estimate_fee", { blockIdentifier, skipValidate }, transaction).then(
        this.responseParser.parseFeeEstimateResponse
      );
    }
    async getDeclareEstimateFee(invocation, details, blockIdentifier = this.blockIdentifier, skipValidate = false) {
      const transaction = this.buildTransaction(
        {
          type: "DECLARE",
          ...invocation,
          ...details
        },
        "fee"
      );
      return this.fetchEndpoint("estimate_fee", { blockIdentifier, skipValidate }, transaction).then(
        this.responseParser.parseFeeEstimateResponse
      );
    }
    async getDeployAccountEstimateFee(invocation, details, blockIdentifier = this.blockIdentifier, skipValidate = false) {
      const transaction = this.buildTransaction(
        {
          type: "DEPLOY_ACCOUNT",
          ...invocation,
          ...details
        },
        "fee"
      );
      return this.fetchEndpoint("estimate_fee", { blockIdentifier, skipValidate }, transaction).then(
        this.responseParser.parseFeeEstimateResponse
      );
    }
    async getEstimateFeeBulk(invocations, { blockIdentifier = this.blockIdentifier, skipValidate = false }) {
      const transactions = invocations.map((it) => this.buildTransaction(it, "fee"));
      return this.fetchEndpoint(
        "estimate_fee_bulk",
        { blockIdentifier, skipValidate },
        transactions
      ).then(this.responseParser.parseFeeEstimateBulkResponse);
    }
    async getCode(contractAddress, blockIdentifier = this.blockIdentifier) {
      return this.fetchEndpoint("get_code", { contractAddress, blockIdentifier });
    }
    async waitForTransaction(txHash, options) {
      let res;
      let completed = false;
      let retries = 0;
      const retryInterval = options?.retryInterval ?? 5e3;
      const errorStates = options?.errorStates ?? [
        "REJECTED",
        "NOT_RECEIVED",
        "REVERTED"
        /* REVERTED */
      ];
      const successStates = options?.successStates ?? [
        "SUCCEEDED",
        "ACCEPTED_ON_L1",
        "ACCEPTED_ON_L2"
        /* ACCEPTED_ON_L2 */
      ];
      while (!completed) {
        await wait(retryInterval);
        res = await this.getTransactionStatus(txHash);
        if ("NOT_RECEIVED" === res.finality_status && retries < 3) {
          retries += 1;
        } else if (successStates.includes(res.finality_status) || successStates.includes(res.execution_status)) {
          completed = true;
        } else if (errorStates.includes(res.finality_status) || errorStates.includes(res.execution_status)) {
          let message;
          if (res.tx_failure_reason) {
            message = `${res.tx_status}: ${res.tx_failure_reason.code}
${res.tx_failure_reason.error_message}`;
          } else if (res.tx_revert_reason) {
            message = `${res.tx_status}: ${res.tx_revert_reason}`;
          } else {
            message = res.tx_status;
          }
          const error = new Error(message);
          error.response = res;
          throw error;
        }
      }
      const txReceipt = await this.getTransactionReceipt(txHash);
      return txReceipt;
    }
    /**
     * Gets the status of a transaction.
     * @param txHash BigNumberish
     * @returns GetTransactionStatusResponse - the transaction status object
     */
    async getTransactionStatus(txHash) {
      const txHashHex = toHex(txHash);
      return this.fetchEndpoint("get_transaction_status", { transactionHash: txHashHex });
    }
    /**
     * Gets the smart contract address on the goerli testnet.
     * @returns GetContractAddressesResponse - starknet smart contract addresses
     */
    async getContractAddresses() {
      return this.fetchEndpoint("get_contract_addresses");
    }
    /**
     * Gets the transaction trace from a tx id.
     * @param txHash BigNumberish
     * @returns TransactionTraceResponse - the transaction trace
     */
    async getTransactionTrace(txHash) {
      const txHashHex = toHex(txHash);
      return this.fetchEndpoint("get_transaction_trace", { transactionHash: txHashHex });
    }
    async estimateMessageFee({ from_address, to_address, entry_point_selector, payload }, blockIdentifier = this.blockIdentifier) {
      const validCallL1Handler = {
        from_address: getDecimalString(from_address),
        to_address: getHexString(to_address),
        entry_point_selector: getSelector(entry_point_selector),
        payload: getHexStringArray(payload)
      };
      return this.fetchEndpoint("estimate_message_fee", { blockIdentifier }, validCallL1Handler);
    }
    /**
     * Simulate transaction using Sequencer provider
     * WARNING!: Sequencer will process only first element from invocations array
     *
     * @param invocations Array of invocations, but only first invocation will be processed
     * @param blockIdentifier block identifier, default 'latest'
     * @param skipValidate Skip Account __validate__ method
     * @returns
     */
    async getSimulateTransaction(invocations, {
      blockIdentifier = this.blockIdentifier,
      skipValidate = false,
      skipExecute = false
    }) {
      if (invocations.length > 1) {
        console.warn("Sequencer simulate process only first element from invocations list");
      }
      if (skipExecute) {
        console.warn("Sequencer can't skip account __execute__");
      }
      const transaction = this.buildTransaction(invocations[0]);
      return this.fetchEndpoint(
        "simulate_transaction",
        {
          blockIdentifier,
          skipValidate: skipValidate ?? false
        },
        transaction
      ).then(this.responseParser.parseSimulateTransactionResponse);
    }
    async getStateUpdate(blockIdentifier = this.blockIdentifier) {
      const args = new Block(blockIdentifier).sequencerIdentifier;
      return this.fetchEndpoint("get_state_update", { ...args }).then(
        this.responseParser.parseGetStateUpdateResponse
      );
    }
    // consider adding an optional trace retrieval parameter to the getBlock method
    async getBlockTraces(blockIdentifier = this.blockIdentifier) {
      const args = new Block(blockIdentifier).sequencerIdentifier;
      return this.fetchEndpoint("get_block_traces", { ...args });
    }
    async getStarkName(address, StarknetIdContract2) {
      return getStarkName(this, address, StarknetIdContract2);
    }
    async getAddressFromStarkName(name, StarknetIdContract2) {
      return getAddressFromStarkName(this, name, StarknetIdContract2);
    }
    /**
     * Build Single AccountTransaction from Single AccountInvocation
     * @param invocation AccountInvocationItem
     * @param versionType 'fee' | 'transaction' - used to determine default versions
     * @returns AccountTransactionItem
     */
    buildTransaction(invocation, versionType) {
      const defaultVersions = getVersionsByType(versionType);
      const details = {
        signature: signatureToDecimalArray(invocation.signature),
        nonce: toHex(invocation.nonce)
      };
      if (invocation.type === "INVOKE_FUNCTION") {
        return {
          type: invocation.type,
          sender_address: invocation.contractAddress,
          calldata: CallData.compile(invocation.calldata ?? []),
          version: toHex(invocation.version || defaultVersions.v1),
          ...details
        };
      }
      if (invocation.type === "DECLARE") {
        if (!isSierra(invocation.contract)) {
          return {
            type: invocation.type,
            contract_class: invocation.contract,
            sender_address: invocation.senderAddress,
            version: toHex(invocation.version || defaultVersions.v1),
            // fee from getDeclareEstimateFee use t.v. instead of feet.v.
            ...details
          };
        }
        return {
          type: invocation.type,
          contract_class: invocation.contract,
          compiled_class_hash: invocation.compiledClassHash,
          sender_address: invocation.senderAddress,
          version: toHex(invocation.version || defaultVersions.v2),
          // fee on getDeclareEstimateFee use t.v. instead of feet.v.
          ...details
        };
      }
      if (invocation.type === "DEPLOY_ACCOUNT") {
        return {
          type: invocation.type,
          constructor_calldata: CallData.compile(invocation.constructorCalldata || []),
          class_hash: toHex(invocation.classHash),
          contract_address_salt: toHex(invocation.addressSalt || 0),
          version: toHex(invocation.version || defaultVersions.v1),
          ...details
        };
      }
      throw Error("Sequencer buildTransaction received unknown TransactionType");
    }
  };
  var Provider = class {
    constructor(providerOrOptions) {
      if (providerOrOptions instanceof Provider) {
        this.provider = providerOrOptions.provider;
      } else if (providerOrOptions instanceof RpcProvider || providerOrOptions instanceof SequencerProvider) {
        this.provider = providerOrOptions;
      } else if (providerOrOptions && "rpc" in providerOrOptions) {
        this.provider = new RpcProvider(providerOrOptions.rpc);
      } else if (providerOrOptions && "sequencer" in providerOrOptions) {
        this.provider = new SequencerProvider(providerOrOptions.sequencer);
      } else {
        this.provider = new SequencerProvider();
      }
    }
    async getChainId() {
      return this.provider.getChainId();
    }
    async getBlock(blockIdentifier) {
      return this.provider.getBlock(blockIdentifier);
    }
    async getClassAt(contractAddress, blockIdentifier) {
      return this.provider.getClassAt(contractAddress, blockIdentifier);
    }
    async getClassHashAt(contractAddress, blockIdentifier) {
      return this.provider.getClassHashAt(contractAddress, blockIdentifier);
    }
    getClassByHash(classHash) {
      return this.provider.getClassByHash(classHash);
    }
    async getEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier) {
      return this.provider.getEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier);
    }
    async getInvokeEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier, skipValidate) {
      return this.provider.getInvokeEstimateFee(
        invocationWithTxType,
        invocationDetails,
        blockIdentifier,
        skipValidate
      );
    }
    async getEstimateFeeBulk(invocations, options) {
      return this.provider.getEstimateFeeBulk(invocations, options);
    }
    async getNonceForAddress(contractAddress, blockIdentifier) {
      return this.provider.getNonceForAddress(contractAddress, blockIdentifier);
    }
    async getStorageAt(contractAddress, key, blockIdentifier) {
      return this.provider.getStorageAt(contractAddress, key, blockIdentifier);
    }
    async getTransaction(txHash) {
      return this.provider.getTransaction(txHash);
    }
    async getTransactionReceipt(txHash) {
      return this.provider.getTransactionReceipt(txHash);
    }
    async callContract(request, blockIdentifier) {
      return this.provider.callContract(request, blockIdentifier);
    }
    async invokeFunction(functionInvocation, details) {
      return this.provider.invokeFunction(functionInvocation, details);
    }
    async deployAccountContract(payload, details) {
      return this.provider.deployAccountContract(payload, details);
    }
    async declareContract(transaction, details) {
      return this.provider.declareContract(transaction, details);
    }
    async getDeclareEstimateFee(transaction, details, blockIdentifier, skipValidate) {
      return this.provider.getDeclareEstimateFee(transaction, details, blockIdentifier, skipValidate);
    }
    getDeployAccountEstimateFee(transaction, details, blockIdentifier, skipValidate) {
      return this.provider.getDeployAccountEstimateFee(
        transaction,
        details,
        blockIdentifier,
        skipValidate
      );
    }
    async getCode(contractAddress, blockIdentifier) {
      return this.provider.getCode(contractAddress, blockIdentifier);
    }
    async waitForTransaction(txHash, options) {
      return this.provider.waitForTransaction(txHash, options);
    }
    async getSimulateTransaction(invocations, options) {
      return this.provider.getSimulateTransaction(invocations, options);
    }
    async getStateUpdate(blockIdentifier) {
      return this.provider.getStateUpdate(blockIdentifier);
    }
    async getStarkName(address, StarknetIdContract2) {
      return getStarkName(this, address, StarknetIdContract2);
    }
    async getAddressFromStarkName(name, StarknetIdContract2) {
      return getAddressFromStarkName(this, name, StarknetIdContract2);
    }
  };
  var transaction_exports = {};
  __export2(transaction_exports, {
    fromCallsToExecuteCalldata: () => fromCallsToExecuteCalldata,
    fromCallsToExecuteCalldataWithNonce: () => fromCallsToExecuteCalldataWithNonce,
    fromCallsToExecuteCalldata_cairo1: () => fromCallsToExecuteCalldata_cairo1,
    getExecuteCalldata: () => getExecuteCalldata,
    transformCallsToMulticallArrays: () => transformCallsToMulticallArrays,
    transformCallsToMulticallArrays_cairo1: () => transformCallsToMulticallArrays_cairo1
  });
  var transformCallsToMulticallArrays = (calls) => {
    const callArray = [];
    const calldata = [];
    calls.forEach((call) => {
      const data = CallData.compile(call.calldata || []);
      callArray.push({
        to: toBigInt(call.contractAddress).toString(10),
        selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
        data_offset: calldata.length.toString(),
        data_len: data.length.toString()
      });
      calldata.push(...data);
    });
    return {
      callArray,
      calldata: CallData.compile({ calldata })
    };
  };
  var fromCallsToExecuteCalldata = (calls) => {
    const { callArray, calldata } = transformCallsToMulticallArrays(calls);
    const compiledCalls = CallData.compile({ callArray });
    return [...compiledCalls, ...calldata];
  };
  var fromCallsToExecuteCalldataWithNonce = (calls, nonce) => {
    return [...fromCallsToExecuteCalldata(calls), toBigInt(nonce).toString()];
  };
  var transformCallsToMulticallArrays_cairo1 = (calls) => {
    const callArray = calls.map((call) => ({
      to: toBigInt(call.contractAddress).toString(10),
      selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
      calldata: CallData.compile(call.calldata || [])
    }));
    return callArray;
  };
  var fromCallsToExecuteCalldata_cairo1 = (calls) => {
    const orderCalls = calls.map((call) => ({
      contractAddress: call.contractAddress,
      entrypoint: call.entrypoint,
      calldata: call.calldata
    }));
    return CallData.compile({ orderCalls });
  };
  var getExecuteCalldata = (calls, cairoVersion = "0") => {
    if (cairoVersion === "1") {
      return fromCallsToExecuteCalldata_cairo1(calls);
    }
    return fromCallsToExecuteCalldata(calls);
  };
  var typedData_exports = {};
  __export2(typedData_exports, {
    encodeData: () => encodeData,
    encodeType: () => encodeType,
    encodeValue: () => encodeValue,
    getDependencies: () => getDependencies,
    getMessageHash: () => getMessageHash,
    getStructHash: () => getStructHash,
    getTypeHash: () => getTypeHash,
    isMerkleTreeType: () => isMerkleTreeType,
    prepareSelector: () => prepareSelector
  });
  var merkle_exports = {};
  __export2(merkle_exports, {
    MerkleTree: () => MerkleTree,
    proofMerklePath: () => proofMerklePath
  });
  var MerkleTree = class {
    constructor(leafHashes) {
      this.branches = [];
      this.leaves = leafHashes;
      this.root = this.build(leafHashes);
    }
    build(leaves) {
      if (leaves.length === 1) {
        return leaves[0];
      }
      if (leaves.length !== this.leaves.length) {
        this.branches.push(leaves);
      }
      const newLeaves = [];
      for (let i = 0; i < leaves.length; i += 2) {
        if (i + 1 === leaves.length) {
          newLeaves.push(MerkleTree.hash(leaves[i], "0x0"));
        } else {
          newLeaves.push(MerkleTree.hash(leaves[i], leaves[i + 1]));
        }
      }
      return this.build(newLeaves);
    }
    static hash(a, b) {
      const [aSorted, bSorted] = [toBigInt(a), toBigInt(b)].sort((x, y) => x >= y ? 1 : -1);
      return pedersen(aSorted, bSorted);
    }
    getProof(leaf, branch = this.leaves, hashPath = []) {
      const index = branch.indexOf(leaf);
      if (index === -1) {
        throw new Error("leaf not found");
      }
      if (branch.length === 1) {
        return hashPath;
      }
      const isLeft = index % 2 === 0;
      const neededBranch = (isLeft ? branch[index + 1] : branch[index - 1]) ?? "0x0";
      const newHashPath = [...hashPath, neededBranch];
      const currentBranchLevelIndex = this.leaves.length === branch.length ? -1 : this.branches.findIndex((b) => b.length === branch.length);
      const nextBranch = this.branches[currentBranchLevelIndex + 1] ?? [this.root];
      return this.getProof(
        MerkleTree.hash(isLeft ? leaf : neededBranch, isLeft ? neededBranch : leaf),
        nextBranch,
        newHashPath
      );
    }
  };
  function proofMerklePath(root, leaf, path) {
    if (path.length === 0) {
      return root === leaf;
    }
    const [next, ...rest] = path;
    return proofMerklePath(root, MerkleTree.hash(leaf, next), rest);
  }
  function getHex(value) {
    try {
      return toHex(value);
    } catch (e) {
      if (typeof value === "string") {
        return toHex(encodeShortString(value));
      }
      throw new Error(`Invalid BigNumberish: ${value}`);
    }
  }
  var validateTypedData = (data) => {
    const typedData = data;
    const valid = Boolean(typedData.types && typedData.primaryType && typedData.message);
    return valid;
  };
  function prepareSelector(selector) {
    return isHex2(selector) ? selector : getSelectorFromName(selector);
  }
  function isMerkleTreeType(type) {
    return type.type === "merkletree";
  }
  var getDependencies = (types, type, dependencies = []) => {
    if (type[type.length - 1] === "*") {
      type = type.slice(0, -1);
    }
    if (dependencies.includes(type)) {
      return dependencies;
    }
    if (!types[type]) {
      return dependencies;
    }
    return [
      type,
      ...types[type].reduce(
        (previous, t) => [
          ...previous,
          ...getDependencies(types, t.type, previous).filter(
            (dependency) => !previous.includes(dependency)
          )
        ],
        []
      )
    ];
  };
  function getMerkleTreeType(types, ctx) {
    if (ctx.parent && ctx.key) {
      const parentType = types[ctx.parent];
      const merkleType = parentType.find((t) => t.name === ctx.key);
      const isMerkleTree = isMerkleTreeType(merkleType);
      if (!isMerkleTree) {
        throw new Error(`${ctx.key} is not a merkle tree`);
      }
      if (merkleType.contains.endsWith("*")) {
        throw new Error(`Merkle tree contain property must not be an array but was given ${ctx.key}`);
      }
      return merkleType.contains;
    }
    return "raw";
  }
  var encodeType = (types, type) => {
    const [primary, ...dependencies] = getDependencies(types, type);
    const newTypes = !primary ? [] : [primary, ...dependencies.sort()];
    return newTypes.map((dependency) => {
      return `${dependency}(${types[dependency].map((t) => `${t.name}:${t.type}`)})`;
    }).join("");
  };
  var getTypeHash = (types, type) => {
    return getSelectorFromName(encodeType(types, type));
  };
  var encodeValue = (types, type, data, ctx = {}) => {
    if (types[type]) {
      return [type, getStructHash(types, type, data)];
    }
    if (Object.keys(types).map((x) => `${x}*`).includes(type)) {
      const structHashes = data.map((struct) => {
        return getStructHash(types, type.slice(0, -1), struct);
      });
      return [type, computeHashOnElements2(structHashes)];
    }
    if (type === "merkletree") {
      const merkleTreeType = getMerkleTreeType(types, ctx);
      const structHashes = data.map((struct) => {
        return encodeValue(types, merkleTreeType, struct)[1];
      });
      const { root } = new MerkleTree(structHashes);
      return ["felt", root];
    }
    if (type === "felt*") {
      return ["felt*", computeHashOnElements2(data)];
    }
    if (type === "selector") {
      return ["felt", prepareSelector(data)];
    }
    return [type, getHex(data)];
  };
  var encodeData = (types, type, data) => {
    const [returnTypes, values] = types[type].reduce(
      ([ts, vs], field) => {
        if (data[field.name] === void 0 || data[field.name] === null) {
          throw new Error(`Cannot encode data: missing data for '${field.name}'`);
        }
        const value = data[field.name];
        const [t, encodedValue] = encodeValue(types, field.type, value, {
          parent: type,
          key: field.name
        });
        return [
          [...ts, t],
          [...vs, encodedValue]
        ];
      },
      [["felt"], [getTypeHash(types, type)]]
    );
    return [returnTypes, values];
  };
  var getStructHash = (types, type, data) => {
    return computeHashOnElements2(encodeData(types, type, data)[1]);
  };
  var getMessageHash = (typedData, account) => {
    if (!validateTypedData(typedData)) {
      throw new Error("Typed data does not match JSON schema");
    }
    const message = [
      encodeShortString("StarkNet Message"),
      getStructHash(typedData.types, "StarkNetDomain", typedData.domain),
      account,
      getStructHash(typedData.types, typedData.primaryType, typedData.message)
    ];
    return computeHashOnElements2(message);
  };
  var defaultProvider = new Provider();
  var events_exports = {};
  __export2(events_exports, {
    getAbiEvents: () => getAbiEvents,
    parseEvents: () => parseEvents
  });
  function getAbiEvents(abi) {
    return abi.filter((abiEntry) => abiEntry.type === "event" && (abiEntry.size || abiEntry.kind !== "enum")).reduce((acc, abiEntry) => {
      const entryName = abiEntry.name.slice(abiEntry.name.lastIndexOf(":") + 1);
      const abiEntryMod = { ...abiEntry };
      abiEntryMod.name = entryName;
      return {
        ...acc,
        [addHexPrefix(keccak(utf8ToArray(entryName)).toString(16))]: abiEntryMod
      };
    }, {});
  }
  function parseEvents(providerReceivedEvents, abiEvents, abiStructs, abiEnums) {
    const ret = providerReceivedEvents.flat().reduce((acc, recEvent) => {
      const abiEvent = abiEvents[recEvent.keys[0]];
      if (!abiEvent) {
        return acc;
      }
      const parsedEvent = {};
      parsedEvent[abiEvent.name] = {};
      recEvent.keys.shift();
      const keysIter = recEvent.keys[Symbol.iterator]();
      const dataIter = recEvent.data[Symbol.iterator]();
      const abiEventKeys = abiEvent.members?.filter((it) => it.kind === "key") || abiEvent.keys;
      const abiEventData = abiEvent.members?.filter((it) => it.kind === "data") || abiEvent.data;
      abiEventKeys.forEach((key) => {
        parsedEvent[abiEvent.name][key.name] = responseParser(
          keysIter,
          key,
          abiStructs,
          abiEnums,
          parsedEvent[abiEvent.name]
        );
      });
      abiEventData.forEach((data) => {
        parsedEvent[abiEvent.name][data.name] = responseParser(
          dataIter,
          data,
          abiStructs,
          abiEnums,
          parsedEvent[abiEvent.name]
        );
      });
      acc.push(parsedEvent);
      return acc;
    }, []);
    return ret;
  }

  // src/constants.ts
  var STAGING_BASE_URL = "https://goerli.api.avnu.fi";
  var BASE_URL = "https://starknet.api.avnu.fi";
  var AVNU_ADDRESS = {
    [constants_exports.StarknetChainId.SN_MAIN]: "0x4270219d365d6b017231b52e92b3fb5d7c8378b05e9abc97724537a80e93b0f",
    [`${constants_exports.StarknetChainId.SN_MAIN}-dev`]: "0x33c21d4cd5db846109448b3e827d175e50b6d449387f76ca7f91a881edca44b",
    [constants_exports.StarknetChainId.SN_GOERLI]: "0x7e36202ace0ab52bf438bd8a8b64b3731c48d09f0d8879f5b006384c2f35032",
    [`${constants_exports.StarknetChainId.SN_GOERLI}-dev`]: "0x6d8cd321dcbbf54512eab67c8a6849faf920077a3996f40bb4761adc4f021d2"
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
  function stringify3(value) {
    if (value == null) {
      return "null";
    }
    if (Array.isArray(value)) {
      return "[ " + value.map(stringify3).join(", ") + " ]";
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
      return stringify3(value.toJSON());
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
        return "{ " + keys.map((k) => `${stringify3(k)}: ${stringify3(value[k])}`).join(", ") + " }";
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
          throw new Error(`value will overwrite populated values: ${stringify3(info)}`);
        }
        for (const key in info) {
          if (key === "shortMessage") {
            continue;
          }
          const value = info[key];
          details.push(key + "=" + stringify3(value));
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
  function assert2(check, message, code, info) {
    if (!check) {
      throw makeError(message, code, info);
    }
  }
  function assertArgument(check, message, name, value) {
    assert2(check, message, "INVALID_ARGUMENT", { argument: name, value });
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
  function assertPrivate(givenGuard, guard2, className) {
    if (className == null) {
      className = "";
    }
    if (givenGuard !== guard2) {
      let method = className, operation = "new";
      if (className) {
        method += ".";
        operation += " " + className;
      }
      assert2(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", {
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
    assert2(value >> width === BN_0, "overflow", "NUMERIC_FAULT", {
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
    assert2(result >= BN_0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
      fault: "overflow",
      operation: "getUint",
      value
    });
    return result;
  }
  var Nibbles = "0123456789abcdef";
  function toBigInt2(value) {
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
      assert2(width * 2 >= result.length, `value exceeds width (${width} bytes)`, "NUMERIC_FAULT", {
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
      assert2(safeOp == null || val >= -limit && val < limit, "overflow", "NUMERIC_FAULT", {
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
      assert2(safeOp == null || val >= 0 && val < limit, "overflow", "NUMERIC_FAULT", {
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
  function toString2(val, decimals) {
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
    constructor(guard2, value, format) {
      assertPrivate(guard2, _guard, "FixedNumber");
      this.#val = value;
      this.#format = format;
      const _value = toString2(value, format.decimals);
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
      assert2(value % this.#tens === BN_02, "precision lost during signalling mul", "NUMERIC_FAULT", {
        operation: "mulSignal",
        fault: "underflow",
        value: this
      });
      return this.#checkValue(value / this.#tens, "mulSignal");
    }
    #div(o, safeOp) {
      assert2(o.#val !== BN_02, "division by zero", "NUMERIC_FAULT", {
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
      assert2(other.#val !== BN_02, "division by zero", "NUMERIC_FAULT", {
        operation: "div",
        fault: "divide-by-zero",
        value: this
      });
      this.#checkFormat(other);
      const value = this.#val * this.#tens;
      assert2(value % other.#val === BN_02, "precision lost during signalling div", "NUMERIC_FAULT", {
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
        assert2(value % tens === BN_02, "value loses precision for format", "NUMERIC_FAULT", {
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
      assert2(decimal.substring(format.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
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
      let value = toBigInt2(getBytes(_value, "value"));
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
    chainId: constants_exports.StarknetChainId.SN_GOERLI,
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
    chainId: constants_exports.StarknetChainId.SN_GOERLI,
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
    chainId: constants_exports.StarknetChainId.SN_GOERLI,
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
    chainId: constants_exports.StarknetChainId.SN_GOERLI,
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
    chainId: constants_exports.StarknetChainId.SN_GOERLI,
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
  var aPage = (content, size = 10, number2 = 0, totalPages = 1, totalElements = 1) => ({
    content,
    size,
    totalPages,
    number: number2,
    totalElements
  });
  var aSource = () => ({
    name: "AMM1",
    address: "0x975910cd99bc56bd289eaaa5cee6cd557f0ddafdb2ce6ebea15b158eb2c661",
    icon: "https://pbs.twimg.com/profile_images/1567441002063069184/SGtDtW-C_400x400.jpg",
    type: "DEX" /* DEX */
  });

  // src/services.ts
  var import_qs = __toESM(require_lib());
  var getBaseUrl = () => false ? STAGING_BASE_URL2 : BASE_URL;
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
        const hashResponse = hash_exports.computeHashOnElements([hash_exports.starknetKeccak(textResponse)]);
        const formattedSig = signature.split(",").map((s) => BigInt(s));
        const signatureType = new ec_exports.starkCurve.Signature(formattedSig[0], formattedSig[1]);
        if (!ec_exports.starkCurve.verify(signatureType, hashResponse, avnuPublicKey))
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
    const value = uint256_exports.bnToUint256(toBeHex(sellAmount));
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
  var hashQuote = (accountAddress, quote, nonce, chainId) => typedData_exports.getMessageHash(
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
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/poseidon.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
//# sourceMappingURL=index.global.js.map