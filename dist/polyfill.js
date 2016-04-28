/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!*************************!*\
  !*** ./app/polyfill.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! ./polyfill/remAdapter.js */ 222);
	
	__webpack_require__(/*! ./polyfill/base64.js */ 223);
	
	__webpack_require__(/*! ./polyfill/fetch.js */ 224);

/***/ },

/***/ 222:
/*!************************************!*\
  !*** ./app/polyfill/remAdapter.js ***!
  \************************************/
/***/ function(module, exports) {

	'use strict';
	
	!function (N, M) {
	    function L() {
	        var a = I.getBoundingClientRect().width; //计量当前窗口矩形像素
	        a / F > 540 && (a = 540 * F);
	        var d = a / 10;
	        I.style.fontSize = d + "px", D.rem = N.rem = d;
	    }
	    var K,
	        J = N.document,
	        I = J.documentElement,
	        H = J.querySelector('meta[name="viewport"]'),
	        G = J.querySelector('meta[name="flexible"]'),
	        F = 0,
	        E = 0,
	        D = M.flexible || (M.flexible = {});
	    if (H) {
	        console.warn("将根据已有的meta标签来设置缩放比例");
	        var C = H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
	        C && (E = parseFloat(C[1]), F = parseInt(1 / E));
	    } else {
	        if (G) {
	            var B = G.getAttribute("content");
	            if (B) {
	                var A = B.match(/initial\-dpr=([\d\.]+)/),
	                    z = B.match(/maximum\-dpr=([\d\.]+)/);
	                A && (F = parseFloat(A[1]), E = parseFloat((1 / F).toFixed(2))), z && (F = parseFloat(z[1]), E = parseFloat((1 / F).toFixed(2)));
	            }
	        }
	    }
	    if (!F && !E) {
	        var y = N.navigator.userAgent,
	            x = (!!y.match(/android/gi), !!y.match(/iphone/gi)),
	            w = x && !!y.match(/OS 9_3/),
	            v = N.devicePixelRatio;
	        F = x && !w ? v >= 3 && (!F || F >= 3) ? 3 : v >= 2 && (!F || F >= 2) ? 2 : 1 : 1, E = 1 / F;
	    }
	    if (I.setAttribute("data-dpr", F), !H) {
	        if (H = J.createElement("meta"), H.setAttribute("name", "viewport"), H.setAttribute("content", "initial-scale=" + E + ", maximum-scale=" + E + ", minimum-scale=" + E + ", user-scalable=no"), I.firstElementChild) {
	            I.firstElementChild.appendChild(H);
	        } else {
	            var u = J.createElement("div");
	            u.appendChild(H), J.write(u.innerHTML);
	        }
	    }
	    N.addEventListener("resize", function () {
	        clearTimeout(K), K = setTimeout(L, 300);
	    }, !1), N.addEventListener("pageshow", function (b) {
	        b.persisted && (clearTimeout(K), K = setTimeout(L, 300));
	    }, !1), "complete" === J.readyState ? J.body.style.fontSize = 12 * F + "px" : J.addEventListener("DOMContentLoaded", function () {
	        J.body.style.fontSize = 12 * F + "px";
	    }, !1), L(), D.dpr = N.dpr = F, D.refreshRem = L, D.rem2px = function (d) {
	        var c = parseFloat(d) * this.rem;
	        return "string" == typeof d && d.match(/rem$/) && (c += "px"), c;
	    }, D.px2rem = function (d) {
	        var c = parseFloat(d) / this.rem;
	        return "string" == typeof d && d.match(/px$/) && (c += "rem"), c;
	    };
	}(window, window.lib || (window.lib = {}));

/***/ },

/***/ 223:
/*!********************************!*\
  !*** ./app/polyfill/base64.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	/*
	 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 *  References:
	 *    http://en.wikipedia.org/wiki/Base64
	 */
	
	(function (global) {
	    'use strict';
	    // existing version for noConflict()
	
	    var _Base64 = global.Base64;
	    var version = "2.1.9";
	    //// if node.js, we use Buffer
	    var buffer;
	    //if (typeof module !== 'undefined' && module.exports) {
	    //    try {
	    //        buffer = require('buffer').Buffer;
	    //    } catch (err) {}
	    //}
	    // constants
	    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    var b64tab = function (bin) {
	        var t = {};
	        for (var i = 0, l = bin.length; i < l; i++) {
	            t[bin.charAt(i)] = i;
	        }return t;
	    }(b64chars);
	    var fromCharCode = String.fromCharCode;
	    // encoder stuff
	    var cb_utob = function cb_utob(c) {
	        if (c.length < 2) {
	            var cc = c.charCodeAt(0);
	            return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
	        } else {
	            var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
	            return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
	        }
	    };
	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	    var utob = function utob(u) {
	        return u.replace(re_utob, cb_utob);
	    };
	    var cb_encode = function cb_encode(ccc) {
	        var padlen = [0, 2, 1][ccc.length % 3],
	            ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
	            chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
	        return chars.join('');
	    };
	    var btoa = global.btoa ? function (b) {
	        return global.btoa(b);
	    } : function (b) {
	        return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };
	    var _encode = buffer ? function (u) {
	        return (u.constructor === buffer.constructor ? u : new buffer(u)).toString('base64');
	    } : function (u) {
	        return btoa(utob(u));
	    };
	    var encode = function encode(u, urisafe) {
	        return !urisafe ? _encode(String(u)) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
	            return m0 == '+' ? '-' : '_';
	        }).replace(/=/g, '');
	    };
	    var encodeURI = function encodeURI(u) {
	        return encode(u, true);
	    };
	    // decoder stuff
	    var re_btou = new RegExp(['[\xC0-\xDF][\x80-\xBF]', '[\xE0-\xEF][\x80-\xBF]{2}', '[\xF0-\xF7][\x80-\xBF]{3}'].join('|'), 'g');
	    var cb_btou = function cb_btou(cccc) {
	        switch (cccc.length) {
	            case 4:
	                var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
	                    offset = cp - 0x10000;
	                return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);
	            case 3:
	                return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));
	            default:
	                return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
	        }
	    };
	    var btou = function btou(b) {
	        return b.replace(re_btou, cb_btou);
	    };
	    var cb_decode = function cb_decode(cccc) {
	        var len = cccc.length,
	            padlen = len % 4,
	            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
	            chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
	        chars.length -= [0, 0, 2, 1][padlen];
	        return chars.join('');
	    };
	    var atob = global.atob ? function (a) {
	        return global.atob(a);
	    } : function (a) {
	        return a.replace(/[\s\S]{1,4}/g, cb_decode);
	    };
	    var _decode = buffer ? function (a) {
	        return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
	    } : function (a) {
	        return btou(atob(a));
	    };
	    var decode = function decode(a) {
	        return _decode(String(a).replace(/[-_]/g, function (m0) {
	            return m0 == '-' ? '+' : '/';
	        }).replace(/[^A-Za-z0-9\+\/]/g, ''));
	    };
	    var noConflict = function noConflict() {
	        var Base64 = global.Base64;
	        global.Base64 = _Base64;
	        return Base64;
	    };
	    // export Base64
	    global.Base64 = {
	        VERSION: version,
	        atob: atob,
	        btoa: btoa,
	        fromBase64: decode,
	        toBase64: encode,
	        utob: utob,
	        encode: encode,
	        encodeURI: encodeURI,
	        btou: btou,
	        decode: decode,
	        noConflict: noConflict
	    };
	    // if ES5 is available, make Base64.extendString() available
	    if (typeof Object.defineProperty === 'function') {
	        var noEnum = function noEnum(v) {
	            return { value: v, enumerable: false, writable: true, configurable: true };
	        };
	        global.Base64.extendString = function () {
	            Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
	                return decode(this);
	            }));
	            Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
	                return encode(this, urisafe);
	            }));
	            Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
	                return encode(this, true);
	            }));
	        };
	    }
	})(self || window);

/***/ },

/***/ 224:
/*!*******************************!*\
  !*** ./app/polyfill/fetch.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	(function (self) {
	  'use strict';
	
	  if (self.fetch) {
	    return;
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }
	
	  function Headers(headers) {
	    this.map = {};
	
	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }
	
	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };
	
	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };
	
	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };
	
	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };
	
	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };
	
	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };
	
	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };
	
	  function Body() {
	    this.bodyUsed = false;
	
	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };
	
	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };
	
	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };
	
	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }
	
	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }
	
	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };
	
	    return this;
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }
	
	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }
	
	  Request.prototype.clone = function () {
	    return new Request(this);
	  };
	
	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }
	
	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }
	
	  Body.call(Request.prototype);
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }
	
	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }
	
	  Body.call(Response.prototype);
	
	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };
	
	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };
	
	  var redirectStatuses = [301, 302, 303, 307, 308];
	
	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }
	
	    return new Response(null, { status: status, headers: { location: url } });
	  };
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }
	
	      var xhr = new XMLHttpRequest();
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }
	
	        return;
	      }
	
	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };
	
	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };
	
	      xhr.open(request.method, request.url, true);
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }
	
	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ }

/******/ });
//# sourceMappingURL=polyfill.js.map