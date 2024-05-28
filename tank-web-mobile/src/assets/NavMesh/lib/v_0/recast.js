(function (root) {
  var exports = undefined,
      module = undefined,
      require = undefined;
  var define = undefined;
  var self = root,
      window = root,
      global = root,
      globalThis = root;
  (function () {
    // 4.2  14个月前
    var Recast = function () {
      var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : undefined;

      return function (Recast) {
        Recast = Recast || {};
        var Module = typeof Recast !== "undefined" ? Recast : {};
        var moduleOverrides = {};
        var key;

        for (key in Module) {
          if (Module.hasOwnProperty(key)) {
            moduleOverrides[key] = Module[key];
          }
        }

        var arguments_ = [];
        var thisProgram = "./this.program";

        var quit_ = function (status, toThrow) {
          throw toThrow;
        };

        var ENVIRONMENT_IS_WEB = false;
        var ENVIRONMENT_IS_WORKER = false;
        var ENVIRONMENT_IS_NODE = false;
        var ENVIRONMENT_HAS_NODE = false;
        var ENVIRONMENT_IS_SHELL = false;
        ENVIRONMENT_IS_WEB = typeof window === "object";
        ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
        ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
        ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
        ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
        var scriptDirectory = "";

        function locateFile(path) {
          if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
          }

          return scriptDirectory + path;
        }

        var read_, readAsync, readBinary, setWindowTitle;

        if (ENVIRONMENT_IS_NODE) {
          scriptDirectory = __dirname + "/";
          var nodeFS;
          var nodePath;

          read_ = function shell_read(filename, binary) {
            var ret;
            ret = tryParseAsDataURI(filename);

            if (!ret) {}

            return binary ? ret : ret.toString();
          };

          readBinary = function readBinary(filename) {
            var ret = read_(filename, true);

            if (!ret.buffer) {
              ret = new Uint8Array(ret);
            }

            assert(ret.buffer);
            return ret;
          };

          if (process["argv"].length > 1) {
            thisProgram = process["argv"][1].replace(/\\/g, "/");
          }

          arguments_ = process["argv"].slice(2);
          process["on"]("uncaughtException", function (ex) {
            if (!(ex instanceof ExitStatus)) {
              throw ex;
            }
          });
          process["on"]("unhandledRejection", abort);

          quit_ = function (status) {
            process["exit"](status);
          };

          Module["inspect"] = function () {
            return "[Emscripten Module object]";
          };
        } else {
          if (ENVIRONMENT_IS_SHELL) {
            if (typeof read != "undefined") {
              read_ = function shell_read(f) {
                var data = tryParseAsDataURI(f);

                if (data) {
                  return intArrayToString(data);
                }

                return read(f);
              };
            }

            readBinary = function readBinary(f) {
              var data;
              data = tryParseAsDataURI(f);

              if (data) {
                return data;
              }

              if (typeof readbuffer === "function") {
                return new Uint8Array(readbuffer(f));
              }

              data = read(f, "binary");
              assert(typeof data === "object");
              return data;
            };

            if (typeof scriptArgs != "undefined") {
              arguments_ = scriptArgs;
            } else {
              if (typeof arguments != "undefined") {
                arguments_ = arguments;
              }
            }

            if (typeof quit === "function") {
              quit_ = function (status) {
                quit(status);
              };
            }

            if (typeof print !== "undefined") {
              if (typeof console === "undefined") {
                console = {};
              }

              console.log = print;
              console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
            }
          } else {
            if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
              if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
              } else {
                if (document.currentScript) {
                  scriptDirectory = document.currentScript.src;
                }
              }

              if (_scriptDir) {
                scriptDirectory = _scriptDir;
              }

              if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
              } else {
                scriptDirectory = "";
              }

              read_ = function shell_read(url) {
                try {
                  var xhr = new XMLHttpRequest();
                  xhr.open("GET", url, false);
                  xhr.send(null);
                  return xhr.responseText;
                } catch (err) {
                  var data = tryParseAsDataURI(url);

                  if (data) {
                    return intArrayToString(data);
                  }

                  throw err;
                }
              };

              if (ENVIRONMENT_IS_WORKER) {
                readBinary = function readBinary(url) {
                  try {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.responseType = "arraybuffer";
                    xhr.send(null);
                    return new Uint8Array(xhr.response);
                  } catch (err) {
                    var data = tryParseAsDataURI(url);

                    if (data) {
                      return data;
                    }

                    throw err;
                  }
                };
              }

              readAsync = function readAsync(url, onload, onerror) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";

                xhr.onload = function xhr_onload() {
                  if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return;
                  }

                  var data = tryParseAsDataURI(url);

                  if (data) {
                    onload(data.buffer);
                    return;
                  }

                  onerror();
                };

                xhr.onerror = onerror;
                xhr.send(null);
              };

              setWindowTitle = function (title) {
                document.title = title;
              };
            } else {}
          }
        }

        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);

        for (key in moduleOverrides) {
          if (moduleOverrides.hasOwnProperty(key)) {
            Module[key] = moduleOverrides[key];
          }
        }

        moduleOverrides = null;

        if (Module["arguments"]) {
          arguments_ = Module["arguments"];
        }

        if (Module["thisProgram"]) {
          thisProgram = Module["thisProgram"];
        }

        if (Module["quit"]) {
          quit_ = Module["quit"];
        }

        var STACK_ALIGN = 16;

        function dynamicAlloc(size) {
          var ret = HEAP32[DYNAMICTOP_PTR >> 2];
          var end = ret + size + 15 & -16;

          if (end > _emscripten_get_heap_size()) {
            abort();
          }

          HEAP32[DYNAMICTOP_PTR >> 2] = end;
          return ret;
        }

        function getNativeTypeSize(type) {
          switch (type) {
            case "i1":
            case "i8":
              return 1;

            case "i16":
              return 2;

            case "i32":
              return 4;

            case "i64":
              return 8;

            case "float":
              return 4;

            case "double":
              return 8;

            default:
              if (type[type.length - 1] === "*") {
                return 4;
              } else {
                if (type[0] === "i") {
                  var bits = parseInt(type.substr(1));
                  assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
                  return bits / 8;
                } else {
                  return 0;
                }
              }

          }
        }

        function warnOnce(text) {
          if (!warnOnce.shown) {
            warnOnce.shown = {};
          }

          if (!warnOnce.shown[text]) {
            warnOnce.shown[text] = 1;
            err(text);
          }
        }

        var jsCallStartIndex = 1;
        var functionPointers = new Array(0);
        var funcWrappers = {};

        function dynCall(sig, ptr, args) {
          if (args && args.length) {
            return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
          } else {
            return Module["dynCall_" + sig].call(null, ptr);
          }
        }

        var tempRet0 = 0;

        var setTempRet0 = function (value) {
          tempRet0 = value;
        };

        var getTempRet0 = function () {
          return tempRet0;
        };

        var GLOBAL_BASE = 8;
        var wasmBinary;

        if (Module["wasmBinary"]) {
          wasmBinary = Module["wasmBinary"];
        }

        var noExitRuntime;

        if (Module["noExitRuntime"]) {
          noExitRuntime = Module["noExitRuntime"];
        }

        function setValue(ptr, value, type, noSafe) {
          type = type || "i8";

          if (type.charAt(type.length - 1) === "*") {
            type = "i32";
          }

          switch (type) {
            case "i1":
              HEAP8[ptr >> 0] = value;
              break;

            case "i8":
              HEAP8[ptr >> 0] = value;
              break;

            case "i16":
              HEAP16[ptr >> 1] = value;
              break;

            case "i32":
              HEAP32[ptr >> 2] = value;
              break;

            case "i64":
              tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= +1 ? tempDouble > +0 ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / +4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
              break;

            case "float":
              HEAPF32[ptr >> 2] = value;
              break;

            case "double":
              HEAPF64[ptr >> 3] = value;
              break;

            default:
              abort("invalid type for setValue: " + type);
          }
        }

        var ABORT = false;
        var EXITSTATUS = 0;

        function assert(condition, text) {
          if (!condition) {
            abort("Assertion failed: " + text);
          }
        }

        function getCFunc(ident) {
          var func = Module["_" + ident];
          assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
          return func;
        }

        function ccall(ident, returnType, argTypes, args, opts) {
          var toC = {
            "string": function (str) {
              var ret = 0;

              if (str !== null && str !== undefined && str !== 0) {
                var len = (str.length << 2) + 1;
                ret = stackAlloc(len);
                stringToUTF8(str, ret, len);
              }

              return ret;
            },
            "array": function (arr) {
              var ret = stackAlloc(arr.length);
              writeArrayToMemory(arr, ret);
              return ret;
            }
          };

          function convertReturnValue(ret) {
            if (returnType === "string") {
              return UTF8ToString(ret);
            }

            if (returnType === "boolean") {
              return Boolean(ret);
            }

            return ret;
          }

          var func = getCFunc(ident);
          var cArgs = [];
          var stack = 0;

          if (args) {
            for (var i = 0; i < args.length; i++) {
              var converter = toC[argTypes[i]];

              if (converter) {
                if (stack === 0) {
                  stack = stackSave();
                }

                cArgs[i] = converter(args[i]);
              } else {
                cArgs[i] = args[i];
              }
            }
          }

          var ret = func.apply(null, cArgs);
          ret = convertReturnValue(ret);

          if (stack !== 0) {
            stackRestore(stack);
          }

          return ret;
        }

        var ALLOC_NONE = 3;

        function Pointer_stringify(ptr, length) {
          abort("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!");
        }

        var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

        function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;

          while (u8Array[endPtr] && !(endPtr >= endIdx)) {
            ++endPtr;
          }

          if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
            return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
          } else {
            var str = "";

            while (idx < endPtr) {
              var u0 = u8Array[idx++];

              if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
              }

              var u1 = u8Array[idx++] & 63;

              if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
              }

              var u2 = u8Array[idx++] & 63;

              if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
              } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
              }

              if (u0 < 65536) {
                str += String.fromCharCode(u0);
              } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              }
            }
          }

          return str;
        }

        function UTF8ToString(ptr, maxBytesToRead) {
          return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }

        function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
          if (!(maxBytesToWrite > 0)) {
            return 0;
          }

          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;

          for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);

            if (u >= 55296 && u <= 57343) {
              var u1 = str.charCodeAt(++i);
              u = 65536 + ((u & 1023) << 10) | u1 & 1023;
            }

            if (u <= 127) {
              if (outIdx >= endIdx) {
                break;
              }

              outU8Array[outIdx++] = u;
            } else {
              if (u <= 2047) {
                if (outIdx + 1 >= endIdx) {
                  break;
                }

                outU8Array[outIdx++] = 192 | u >> 6;
                outU8Array[outIdx++] = 128 | u & 63;
              } else {
                if (u <= 65535) {
                  if (outIdx + 2 >= endIdx) {
                    break;
                  }

                  outU8Array[outIdx++] = 224 | u >> 12;
                  outU8Array[outIdx++] = 128 | u >> 6 & 63;
                  outU8Array[outIdx++] = 128 | u & 63;
                } else {
                  if (outIdx + 3 >= endIdx) {
                    break;
                  }

                  outU8Array[outIdx++] = 240 | u >> 18;
                  outU8Array[outIdx++] = 128 | u >> 12 & 63;
                  outU8Array[outIdx++] = 128 | u >> 6 & 63;
                  outU8Array[outIdx++] = 128 | u & 63;
                }
              }
            }
          }

          outU8Array[outIdx] = 0;
          return outIdx - startIdx;
        }

        function stringToUTF8(str, outPtr, maxBytesToWrite) {
          return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        }

        function lengthBytesUTF8(str) {
          var len = 0;

          for (var i = 0; i < str.length; ++i) {
            var u = str.charCodeAt(i);

            if (u >= 55296 && u <= 57343) {
              u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
            }

            if (u <= 127) {
              ++len;
            } else {
              if (u <= 2047) {
                len += 2;
              } else {
                if (u <= 65535) {
                  len += 3;
                } else {
                  len += 4;
                }
              }
            }
          }

          return len;
        }

        var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

        function allocateUTF8(str) {
          var size = lengthBytesUTF8(str) + 1;

          var ret = _malloc(size);

          if (ret) {
            stringToUTF8Array(str, HEAP8, ret, size);
          }

          return ret;
        }

        function writeArrayToMemory(array, buffer) {
          HEAP8.set(array, buffer);
        }

        function writeAsciiToMemory(str, buffer, dontAddNull) {
          for (var i = 0; i < str.length; ++i) {
            HEAP8[buffer++ >> 0] = str.charCodeAt(i);
          }

          if (!dontAddNull) {
            HEAP8[buffer >> 0] = 0;
          }
        }

        var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

        function updateGlobalBufferAndViews(buf) {
          buffer = buf;
          Module["HEAP8"] = HEAP8 = new Int8Array(buf);
          Module["HEAP16"] = HEAP16 = new Int16Array(buf);
          Module["HEAP32"] = HEAP32 = new Int32Array(buf);
          Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
          Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
          Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
          Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
          Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }

        var STACK_BASE = 24608,
            DYNAMIC_BASE = 5267488,
            DYNAMICTOP_PTR = 24400;
        var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 67108864;

        if (Module["buffer"]) {
          buffer = Module["buffer"];
        } else {
          buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
        }

        INITIAL_TOTAL_MEMORY = buffer.byteLength;
        updateGlobalBufferAndViews(buffer);
        HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

        function callRuntimeCallbacks(callbacks) {
          while (callbacks.length > 0) {
            var callback = callbacks.shift();

            if (typeof callback == "function") {
              callback();
              continue;
            }

            var func = callback.func;

            if (typeof func === "number") {
              if (callback.arg === undefined) {
                Module["dynCall_v"](func);
              } else {
                Module["dynCall_vi"](func, callback.arg);
              }
            } else {
              func(callback.arg === undefined ? null : callback.arg);
            }
          }
        }

        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        var runtimeExited = false;

        function preRun() {
          if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function") {
              Module["preRun"] = [Module["preRun"]];
            }

            while (Module["preRun"].length) {
              addOnPreRun(Module["preRun"].shift());
            }
          }

          callRuntimeCallbacks(__ATPRERUN__);
        }

        function initRuntime() {
          runtimeInitialized = true;
          callRuntimeCallbacks(__ATINIT__);
        }

        function preMain() {
          callRuntimeCallbacks(__ATMAIN__);
        }

        function exitRuntime() {
          runtimeExited = true;
        }

        function postRun() {
          if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function") {
              Module["postRun"] = [Module["postRun"]];
            }

            while (Module["postRun"].length) {
              addOnPostRun(Module["postRun"].shift());
            }
          }

          callRuntimeCallbacks(__ATPOSTRUN__);
        }

        function addOnPreRun(cb) {
          __ATPRERUN__.unshift(cb);
        }

        function addOnPreMain(cb) {
          __ATMAIN__.unshift(cb);
        }

        function addOnPostRun(cb) {
          __ATPOSTRUN__.unshift(cb);
        }

        if (!Math.imul || Math.imul(4294967295, 5) !== -5) {
          Math.imul = function imul(a, b) {
            var ah = a >>> 16;
            var al = a & 65535;
            var bh = b >>> 16;
            var bl = b & 65535;
            return al * bl + (ah * bl + al * bh << 16) | 0;
          };
        }

        if (!Math.clz32) {
          Math.clz32 = function (x) {
            var n = 32;
            var y = x >> 16;

            if (y) {
              n -= 16;
              x = y;
            }

            y = x >> 8;

            if (y) {
              n -= 8;
              x = y;
            }

            y = x >> 4;

            if (y) {
              n -= 4;
              x = y;
            }

            y = x >> 2;

            if (y) {
              n -= 2;
              x = y;
            }

            y = x >> 1;

            if (y) {
              return n - 2;
            }

            return n - x;
          };
        }

        if (!Math.trunc) {
          Math.trunc = function (x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
          };
        }

        var Math_abs = Math.abs;
        var Math_ceil = Math.ceil;
        var Math_floor = Math.floor;
        var Math_min = Math.min;
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;

        function addRunDependency(id) {
          runDependencies++;

          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }
        }

        function removeRunDependency(id) {
          runDependencies--;

          if (Module["monitorRunDependencies"]) {
            Module["monitorRunDependencies"](runDependencies);
          }

          if (runDependencies == 0) {
            if (runDependencyWatcher !== null) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
            }

            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }

        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};

        function abort(what) {
          if (Module["onAbort"]) {
            Module["onAbort"](what);
          }

          what += "";
          out(what);
          err(what);
          ABORT = true;
          EXITSTATUS = 1;
          throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
        }

        var memoryInitializer = null;
        var dataURIPrefix = "data:application/octet-stream;base64,";

        function isDataURI(filename) {
          return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
        }

        var tempDouble;
        var tempI64;

        __ATINIT__.push({
          func: function () {
            globalCtors();
          }
        });

        memoryInitializer = require("./wasmBinaryFile");
        var tempDoublePtr = 24592;

        function demangle(func) {
          return func;
        }

        function demangleAll(text) {
          var regex = /\b__Z[\w\d_]+/g;
          return text.replace(regex, function (x) {
            var y = demangle(x);
            return x === y ? x : y + " [" + x + "]";
          });
        }

        function jsStackTrace() {
          var err = new Error();

          if (!err.stack) {
            try {
              throw new Error(0);
            } catch (e) {
              err = e;
            }

            if (!err.stack) {
              return "(no stack trace available)";
            }
          }

          return err.stack.toString();
        }

        function stackTrace() {
          var js = jsStackTrace();

          if (Module["extraStackTrace"]) {
            js += "\n" + Module["extraStackTrace"]();
          }

          return demangleAll(js);
        }

        function ___cxa_allocate_exception(size) {
          return _malloc(size);
        }

        var ___exception_infos = {};
        var ___exception_caught = [];

        function ___exception_addRef(ptr) {
          if (!ptr) {
            return;
          }

          var info = ___exception_infos[ptr];
          info.refcount++;
        }

        function ___exception_deAdjust(adjusted) {
          if (!adjusted || ___exception_infos[adjusted]) {
            return adjusted;
          }

          for (var key in ___exception_infos) {
            var ptr = +key;
            var adj = ___exception_infos[ptr].adjusted;
            var len = adj.length;

            for (var i = 0; i < len; i++) {
              if (adj[i] === adjusted) {
                return ptr;
              }
            }
          }

          return adjusted;
        }

        function ___cxa_begin_catch(ptr) {
          var info = ___exception_infos[ptr];

          if (info && !info.caught) {
            info.caught = true;
            __ZSt18uncaught_exceptionv.uncaught_exceptions--;
          }

          if (info) {
            info.rethrown = false;
          }

          ___exception_caught.push(ptr);

          ___exception_addRef(___exception_deAdjust(ptr));

          return ptr;
        }

        var ___exception_last = 0;

        function ___cxa_throw(ptr, type, destructor) {
          ___exception_infos[ptr] = {
            ptr: ptr,
            adjusted: [ptr],
            type: type,
            destructor: destructor,
            refcount: 0,
            caught: false,
            rethrown: false
          };
          ___exception_last = ptr;

          if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
            __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
          } else {
            __ZSt18uncaught_exceptionv.uncaught_exceptions++;
          }

          throw ptr;
        }

        function ___gxx_personality_v0() {}

        function ___lock() {}

        function ___setErrNo(value) {
          if (Module["___errno_location"]) {
            HEAP32[Module["___errno_location"]() >> 2] = value;
          }

          return value;
        }

        function ___map_file(pathname, size) {
          ___setErrNo(63);

          return -1;
        }

        var PATH = {
          splitPath: function (filename) {
            var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
            return splitPathRe.exec(filename).slice(1);
          },
          normalizeArray: function (parts, allowAboveRoot) {
            var up = 0;

            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];

              if (last === ".") {
                parts.splice(i, 1);
              } else {
                if (last === "..") {
                  parts.splice(i, 1);
                  up++;
                } else {
                  if (up) {
                    parts.splice(i, 1);
                    up--;
                  }
                }
              }
            }

            if (allowAboveRoot) {
              for (; up; up--) {
                parts.unshift("..");
              }
            }

            return parts;
          },
          normalize: function (path) {
            var isAbsolute = path.charAt(0) === "/",
                trailingSlash = path.substr(-1) === "/";
            path = PATH.normalizeArray(path.split("/").filter(function (p) {
              return !!p;
            }), !isAbsolute).join("/");

            if (!path && !isAbsolute) {
              path = ".";
            }

            if (path && trailingSlash) {
              path += "/";
            }

            return (isAbsolute ? "/" : "") + path;
          },
          dirname: function (path) {
            var result = PATH.splitPath(path),
                root = result[0],
                dir = result[1];

            if (!root && !dir) {
              return ".";
            }

            if (dir) {
              dir = dir.substr(0, dir.length - 1);
            }

            return root + dir;
          },
          basename: function (path) {
            if (path === "/") {
              return "/";
            }

            var lastSlash = path.lastIndexOf("/");

            if (lastSlash === -1) {
              return path;
            }

            return path.substr(lastSlash + 1);
          },
          extname: function (path) {
            return PATH.splitPath(path)[3];
          },
          join: function () {
            var paths = Array.prototype.slice.call(arguments, 0);
            return PATH.normalize(paths.join("/"));
          },
          join2: function (l, r) {
            return PATH.normalize(l + "/" + r);
          }
        };
        var SYSCALLS = {
          buffers: [null, [], []],
          printChar: function (stream, curr) {
            var buffer = SYSCALLS.buffers[stream];

            if (curr === 0 || curr === 10) {
              (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
              buffer.length = 0;
            } else {
              buffer.push(curr);
            }
          },
          varargs: 0,
          get: function (varargs) {
            SYSCALLS.varargs += 4;
            var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
            return ret;
          },
          getStr: function () {
            var ret = UTF8ToString(SYSCALLS.get());
            return ret;
          },
          get64: function () {
            var low = SYSCALLS.get(),
                high = SYSCALLS.get();
            return low;
          },
          getZero: function () {
            SYSCALLS.get();
          }
        };

        function __emscripten_syscall_munmap(addr, len) {
          if (addr === -1 || len === 0) {
            return -28;
          }

          var info = SYSCALLS.mappings[addr];

          if (!info) {
            return 0;
          }

          if (len === info.len) {
            var stream = FS.getStream(info.fd);
            SYSCALLS.doMsync(addr, stream, len, info.flags);
            FS.munmap(stream);
            SYSCALLS.mappings[addr] = null;

            if (info.allocated) {
              _free(info.malloc);
            }
          }

          return 0;
        }

        function ___syscall91(which, varargs) {
          SYSCALLS.varargs = varargs;

          try {
            var addr = SYSCALLS.get(),
                len = SYSCALLS.get();
            return __emscripten_syscall_munmap(addr, len);
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) {
              abort(e);
            }

            return -e.errno;
          }
        }

        function ___unlock() {}

        function _fd_close(fd) {
          try {
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) {
              abort(e);
            }

            return e.errno;
          }
        }

        function ___wasi_fd_close() {
          return _fd_close.apply(null, arguments);
        }

        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = SYSCALLS.doReadv(stream, iov, iovcnt);
            HEAP32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) {
              abort(e);
            }

            return e.errno;
          }
        }

        function ___wasi_fd_read() {
          return _fd_read.apply(null, arguments);
        }

        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
          try {
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) {
              abort(e);
            }

            return e.errno;
          }
        }

        function ___wasi_fd_seek() {
          return _fd_seek.apply(null, arguments);
        }

        function flush_NO_FILESYSTEM() {
          var fflush = Module["_fflush"];

          if (fflush) {
            fflush(0);
          }

          var buffers = SYSCALLS.buffers;

          if (buffers[1].length) {
            SYSCALLS.printChar(1, 10);
          }

          if (buffers[2].length) {
            SYSCALLS.printChar(2, 10);
          }
        }

        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var num = 0;

            for (var i = 0; i < iovcnt; i++) {
              var ptr = HEAP32[iov + i * 8 >> 2];
              var len = HEAP32[iov + (i * 8 + 4) >> 2];

              for (var j = 0; j < len; j++) {
                SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
              }

              num += len;
            }

            HEAP32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) {
              abort(e);
            }

            return e.errno;
          }
        }

        function ___wasi_fd_write() {
          return _fd_write.apply(null, arguments);
        }

        function _abort() {
          abort();
        }

        function _emscripten_get_heap_size() {
          return HEAP8.length;
        }

        function abortOnCannotGrowMemory(requestedSize) {
          abort("OOM");
        }

        function _emscripten_resize_heap(requestedSize) {
          abortOnCannotGrowMemory(requestedSize);
        }

        var ENV = {};

        function _getenv(name) {
          if (name === 0) {
            return 0;
          }

          name = UTF8ToString(name);

          if (!ENV.hasOwnProperty(name)) {
            return 0;
          }

          if (_getenv.ret) {
            _free(_getenv.ret);
          }

          _getenv.ret = allocateUTF8(ENV[name]);
          return _getenv.ret;
        }

        function _llvm_stackrestore(p) {
          var self = _llvm_stacksave;
          var ret = self.LLVM_SAVEDSTACKS[p];
          self.LLVM_SAVEDSTACKS.splice(p, 1);
          stackRestore(ret);
        }

        function _llvm_stacksave() {
          var self = _llvm_stacksave;

          if (!self.LLVM_SAVEDSTACKS) {
            self.LLVM_SAVEDSTACKS = [];
          }

          self.LLVM_SAVEDSTACKS.push(stackSave());
          return self.LLVM_SAVEDSTACKS.length - 1;
        }

        function _emscripten_memcpy_big(dest, src, num) {
          HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
        }

        function __isLeapYear(year) {
          return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }

        function __arraySum(array, index) {
          var sum = 0;

          for (var i = 0; i <= index; sum += array[i++]) {}

          return sum;
        }

        var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        function __addDays(date, days) {
          var newDate = new Date(date.getTime());

          while (days > 0) {
            var leap = __isLeapYear(newDate.getFullYear());

            var currentMonth = newDate.getMonth();
            var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];

            if (days > daysInCurrentMonth - newDate.getDate()) {
              days -= daysInCurrentMonth - newDate.getDate() + 1;
              newDate.setDate(1);

              if (currentMonth < 11) {
                newDate.setMonth(currentMonth + 1);
              } else {
                newDate.setMonth(0);
                newDate.setFullYear(newDate.getFullYear() + 1);
              }
            } else {
              newDate.setDate(newDate.getDate() + days);
              return newDate;
            }
          }

          return newDate;
        }

        function _strftime(s, maxsize, format, tm) {
          var tm_zone = HEAP32[tm + 40 >> 2];
          var date = {
            tm_sec: HEAP32[tm >> 2],
            tm_min: HEAP32[tm + 4 >> 2],
            tm_hour: HEAP32[tm + 8 >> 2],
            tm_mday: HEAP32[tm + 12 >> 2],
            tm_mon: HEAP32[tm + 16 >> 2],
            tm_year: HEAP32[tm + 20 >> 2],
            tm_wday: HEAP32[tm + 24 >> 2],
            tm_yday: HEAP32[tm + 28 >> 2],
            tm_isdst: HEAP32[tm + 32 >> 2],
            tm_gmtoff: HEAP32[tm + 36 >> 2],
            tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
          };
          var pattern = UTF8ToString(format);
          var EXPANSION_RULES_1 = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
          };

          for (var rule in EXPANSION_RULES_1) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
          }

          var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          function leadingSomething(value, digits, character) {
            var str = typeof value === "number" ? value.toString() : value || "";

            while (str.length < digits) {
              str = character[0] + str;
            }

            return str;
          }

          function leadingNulls(value, digits) {
            return leadingSomething(value, digits, "0");
          }

          function compareByDay(date1, date2) {
            function sgn(value) {
              return value < 0 ? -1 : value > 0 ? 1 : 0;
            }

            var compare;

            if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
              if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                compare = sgn(date1.getDate() - date2.getDate());
              }
            }

            return compare;
          }

          function getFirstWeekStartDate(janFourth) {
            switch (janFourth.getDay()) {
              case 0:
                return new Date(janFourth.getFullYear() - 1, 11, 29);

              case 1:
                return janFourth;

              case 2:
                return new Date(janFourth.getFullYear(), 0, 3);

              case 3:
                return new Date(janFourth.getFullYear(), 0, 2);

              case 4:
                return new Date(janFourth.getFullYear(), 0, 1);

              case 5:
                return new Date(janFourth.getFullYear() - 1, 11, 31);

              case 6:
                return new Date(janFourth.getFullYear() - 1, 11, 30);
            }
          }

          function getWeekBasedYear(date) {
            var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);

            var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
            var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);

            if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
              if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                return thisDate.getFullYear() + 1;
              } else {
                return thisDate.getFullYear();
              }
            } else {
              return thisDate.getFullYear() - 1;
            }
          }

          var EXPANSION_RULES_2 = {
            "%a": function (date) {
              return WEEKDAYS[date.tm_wday].substring(0, 3);
            },
            "%A": function (date) {
              return WEEKDAYS[date.tm_wday];
            },
            "%b": function (date) {
              return MONTHS[date.tm_mon].substring(0, 3);
            },
            "%B": function (date) {
              return MONTHS[date.tm_mon];
            },
            "%C": function (date) {
              var year = date.tm_year + 1900;
              return leadingNulls(year / 100 | 0, 2);
            },
            "%d": function (date) {
              return leadingNulls(date.tm_mday, 2);
            },
            "%e": function (date) {
              return leadingSomething(date.tm_mday, 2, " ");
            },
            "%g": function (date) {
              return getWeekBasedYear(date).toString().substring(2);
            },
            "%G": function (date) {
              return getWeekBasedYear(date);
            },
            "%H": function (date) {
              return leadingNulls(date.tm_hour, 2);
            },
            "%I": function (date) {
              var twelveHour = date.tm_hour;

              if (twelveHour == 0) {
                twelveHour = 12;
              } else {
                if (twelveHour > 12) {
                  twelveHour -= 12;
                }
              }

              return leadingNulls(twelveHour, 2);
            },
            "%j": function (date) {
              return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
            },
            "%m": function (date) {
              return leadingNulls(date.tm_mon + 1, 2);
            },
            "%M": function (date) {
              return leadingNulls(date.tm_min, 2);
            },
            "%n": function () {
              return "\n";
            },
            "%p": function (date) {
              if (date.tm_hour >= 0 && date.tm_hour < 12) {
                return "AM";
              } else {
                return "PM";
              }
            },
            "%S": function (date) {
              return leadingNulls(date.tm_sec, 2);
            },
            "%t": function () {
              return "\t";
            },
            "%u": function (date) {
              return date.tm_wday || 7;
            },
            "%U": function (date) {
              var janFirst = new Date(date.tm_year + 1900, 0, 1);
              var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
              var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);

              if (compareByDay(firstSunday, endDate) < 0) {
                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
                var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                return leadingNulls(Math.ceil(days / 7), 2);
              }

              return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
            },
            "%V": function (date) {
              var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
              var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
              var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
              var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);

              var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);

              if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
                return "53";
              }

              if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
                return "01";
              }

              var daysDifference;

              if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
                daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
              } else {
                daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
              }

              return leadingNulls(Math.ceil(daysDifference / 7), 2);
            },
            "%w": function (date) {
              return date.tm_wday;
            },
            "%W": function (date) {
              var janFirst = new Date(date.tm_year, 0, 1);
              var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
              var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);

              if (compareByDay(firstMonday, endDate) < 0) {
                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
                var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                return leadingNulls(Math.ceil(days / 7), 2);
              }

              return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
            },
            "%y": function (date) {
              return (date.tm_year + 1900).toString().substring(2);
            },
            "%Y": function (date) {
              return date.tm_year + 1900;
            },
            "%z": function (date) {
              var off = date.tm_gmtoff;
              var ahead = off >= 0;
              off = Math.abs(off) / 60;
              off = off / 60 * 100 + off % 60;
              return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
            },
            "%Z": function (date) {
              return date.tm_zone;
            },
            "%%": function () {
              return "%";
            }
          };

          for (var rule in EXPANSION_RULES_2) {
            if (pattern.indexOf(rule) >= 0) {
              pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
            }
          }

          var bytes = intArrayFromString(pattern, false);

          if (bytes.length > maxsize) {
            return 0;
          }

          writeArrayToMemory(bytes, s);
          return bytes.length - 1;
        }

        function _strftime_l(s, maxsize, format, tm) {
          return _strftime(s, maxsize, format, tm);
        }

        var ASSERTIONS = false;

        function intArrayFromString(stringy, dontAddNull, length) {
          var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
          var u8array = new Array(len);
          var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);

          if (dontAddNull) {
            u8array.length = numBytesWritten;
          }

          return u8array;
        }

        function intArrayToString(array) {
          var ret = [];

          for (var i = 0; i < array.length; i++) {
            var chr = array[i];

            if (chr > 255) {
              if (ASSERTIONS) {
                assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
              }

              chr &= 255;
            }

            ret.push(String.fromCharCode(chr));
          }

          return ret.join("");
        }

        var decodeBase64 = typeof atob === "function" ? atob : function (input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
              output = output + String.fromCharCode(chr2);
            }

            if (enc4 !== 64) {
              output = output + String.fromCharCode(chr3);
            }
          } while (i < input.length);

          return output;
        };

        function intArrayFromBase64(s) {
          if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
            var buf;

            try {
              buf = Buffer.from(s, "base64");
            } catch (_) {
              buf = new Buffer(s, "base64");
            }

            return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
          }

          try {
            var decoded = decodeBase64(s);
            var bytes = new Uint8Array(decoded.length);

            for (var i = 0; i < decoded.length; ++i) {
              bytes[i] = decoded.charCodeAt(i);
            }

            return bytes;
          } catch (_) {
            throw new Error("Converting base64 string to bytes failed.");
          }
        }

        function tryParseAsDataURI(filename) {
          if (!isDataURI(filename)) {
            return;
          }

          return intArrayFromBase64(filename.slice(dataURIPrefix.length));
        }

        var asmGlobalArg = {
          "Math": Math,
          "Int8Array": Int8Array,
          "Int16Array": Int16Array,
          "Int32Array": Int32Array,
          "Uint8Array": Uint8Array,
          "Uint16Array": Uint16Array,
          "Float32Array": Float32Array,
          "Float64Array": Float64Array,
          "NaN": NaN,
          Infinity: Infinity
        };
        var asmLibraryArg = {
          "A": _fd_close,
          "B": _fd_read,
          "C": _fd_seek,
          "D": _fd_write,
          "E": _getenv,
          "F": _llvm_stackrestore,
          "G": _llvm_stacksave,
          "H": _strftime,
          "I": _strftime_l,
          "J": abortOnCannotGrowMemory,
          "K": demangle,
          "L": demangleAll,
          "M": flush_NO_FILESYSTEM,
          "N": jsStackTrace,
          "O": stackTrace,
          "P": tempDoublePtr,
          "a": abort,
          "b": setTempRet0,
          "c": getTempRet0,
          "d": ___cxa_allocate_exception,
          "e": ___cxa_begin_catch,
          "f": ___cxa_throw,
          "g": ___exception_addRef,
          "h": ___exception_deAdjust,
          "i": ___gxx_personality_v0,
          "j": ___lock,
          "k": ___map_file,
          "l": ___setErrNo,
          "m": ___syscall91,
          "n": ___unlock,
          "o": ___wasi_fd_close,
          "p": ___wasi_fd_read,
          "q": ___wasi_fd_seek,
          "r": ___wasi_fd_write,
          "s": __addDays,
          "t": __arraySum,
          "u": __emscripten_syscall_munmap,
          "v": __isLeapYear,
          "w": _abort,
          "x": _emscripten_get_heap_size,
          "y": _emscripten_memcpy_big,
          "z": _emscripten_resize_heap
        };

        var asm = require("./asm-js")(asmGlobalArg, asmLibraryArg, buffer);

        var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = asm["__ZSt18uncaught_exceptionv"];

        var ___cxa_can_catch = Module["___cxa_can_catch"] = asm["___cxa_can_catch"];

        var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = asm["___cxa_is_pointer_type"];

        var ___muldi3 = Module["___muldi3"] = asm["___muldi3"];

        var ___udivdi3 = Module["___udivdi3"] = asm["___udivdi3"];

        var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];

        var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];

        var _emscripten_bind_Crowd_Crowd_3 = Module["_emscripten_bind_Crowd_Crowd_3"] = asm["_emscripten_bind_Crowd_Crowd_3"];

        var _emscripten_bind_Crowd___destroy___0 = Module["_emscripten_bind_Crowd___destroy___0"] = asm["_emscripten_bind_Crowd___destroy___0"];

        var _emscripten_bind_Crowd_addAgent_2 = Module["_emscripten_bind_Crowd_addAgent_2"] = asm["_emscripten_bind_Crowd_addAgent_2"];

        var _emscripten_bind_Crowd_agentGoto_2 = Module["_emscripten_bind_Crowd_agentGoto_2"] = asm["_emscripten_bind_Crowd_agentGoto_2"];

        var _emscripten_bind_Crowd_agentTeleport_2 = Module["_emscripten_bind_Crowd_agentTeleport_2"] = asm["_emscripten_bind_Crowd_agentTeleport_2"];

        var _emscripten_bind_Crowd_destroy_0 = Module["_emscripten_bind_Crowd_destroy_0"] = asm["_emscripten_bind_Crowd_destroy_0"];

        var _emscripten_bind_Crowd_getAgentNextTargetPath_1 = Module["_emscripten_bind_Crowd_getAgentNextTargetPath_1"] = asm["_emscripten_bind_Crowd_getAgentNextTargetPath_1"];

        var _emscripten_bind_Crowd_getAgentParameters_1 = Module["_emscripten_bind_Crowd_getAgentParameters_1"] = asm["_emscripten_bind_Crowd_getAgentParameters_1"];

        var _emscripten_bind_Crowd_getAgentPosition_1 = Module["_emscripten_bind_Crowd_getAgentPosition_1"] = asm["_emscripten_bind_Crowd_getAgentPosition_1"];

        var _emscripten_bind_Crowd_getAgentState_1 = Module["_emscripten_bind_Crowd_getAgentState_1"] = asm["_emscripten_bind_Crowd_getAgentState_1"];

        var _emscripten_bind_Crowd_getAgentVelocity_1 = Module["_emscripten_bind_Crowd_getAgentVelocity_1"] = asm["_emscripten_bind_Crowd_getAgentVelocity_1"];

        var _emscripten_bind_Crowd_getDefaultQueryExtent_0 = Module["_emscripten_bind_Crowd_getDefaultQueryExtent_0"] = asm["_emscripten_bind_Crowd_getDefaultQueryExtent_0"];

        var _emscripten_bind_Crowd_overOffmeshConnection_1 = Module["_emscripten_bind_Crowd_overOffmeshConnection_1"] = asm["_emscripten_bind_Crowd_overOffmeshConnection_1"];

        var _emscripten_bind_Crowd_removeAgent_1 = Module["_emscripten_bind_Crowd_removeAgent_1"] = asm["_emscripten_bind_Crowd_removeAgent_1"];

        var _emscripten_bind_Crowd_setAgentParameters_2 = Module["_emscripten_bind_Crowd_setAgentParameters_2"] = asm["_emscripten_bind_Crowd_setAgentParameters_2"];

        var _emscripten_bind_Crowd_setDefaultQueryExtent_1 = Module["_emscripten_bind_Crowd_setDefaultQueryExtent_1"] = asm["_emscripten_bind_Crowd_setDefaultQueryExtent_1"];

        var _emscripten_bind_Crowd_update_1 = Module["_emscripten_bind_Crowd_update_1"] = asm["_emscripten_bind_Crowd_update_1"];

        var _emscripten_bind_DebugNavMesh_DebugNavMesh_0 = Module["_emscripten_bind_DebugNavMesh_DebugNavMesh_0"] = asm["_emscripten_bind_DebugNavMesh_DebugNavMesh_0"];

        var _emscripten_bind_DebugNavMesh___destroy___0 = Module["_emscripten_bind_DebugNavMesh___destroy___0"] = asm["_emscripten_bind_DebugNavMesh___destroy___0"];

        var _emscripten_bind_DebugNavMesh_getTriangleCount_0 = Module["_emscripten_bind_DebugNavMesh_getTriangleCount_0"] = asm["_emscripten_bind_DebugNavMesh_getTriangleCount_0"];

        var _emscripten_bind_DebugNavMesh_getTriangle_1 = Module["_emscripten_bind_DebugNavMesh_getTriangle_1"] = asm["_emscripten_bind_DebugNavMesh_getTriangle_1"];

        var _emscripten_bind_NavMesh_NavMesh_0 = Module["_emscripten_bind_NavMesh_NavMesh_0"] = asm["_emscripten_bind_NavMesh_NavMesh_0"];

        var _emscripten_bind_NavMesh___destroy___0 = Module["_emscripten_bind_NavMesh___destroy___0"] = asm["_emscripten_bind_NavMesh___destroy___0"];

        var _emscripten_bind_NavMesh_buildFromNavmeshData_1 = Module["_emscripten_bind_NavMesh_buildFromNavmeshData_1"] = asm["_emscripten_bind_NavMesh_buildFromNavmeshData_1"];

        var _emscripten_bind_NavMesh_build_5 = Module["_emscripten_bind_NavMesh_build_5"] = asm["_emscripten_bind_NavMesh_build_5"];

        var _emscripten_bind_NavMesh_computePath_2 = Module["_emscripten_bind_NavMesh_computePath_2"] = asm["_emscripten_bind_NavMesh_computePath_2"];

        var _emscripten_bind_NavMesh_destroy_0 = Module["_emscripten_bind_NavMesh_destroy_0"] = asm["_emscripten_bind_NavMesh_destroy_0"];

        var _emscripten_bind_NavMesh_freeNavmeshData_1 = Module["_emscripten_bind_NavMesh_freeNavmeshData_1"] = asm["_emscripten_bind_NavMesh_freeNavmeshData_1"];

        var _emscripten_bind_NavMesh_getClosestPoint_1 = Module["_emscripten_bind_NavMesh_getClosestPoint_1"] = asm["_emscripten_bind_NavMesh_getClosestPoint_1"];

        var _emscripten_bind_NavMesh_getDebugNavMesh_0 = Module["_emscripten_bind_NavMesh_getDebugNavMesh_0"] = asm["_emscripten_bind_NavMesh_getDebugNavMesh_0"];

        var _emscripten_bind_NavMesh_getDefaultQueryExtent_0 = Module["_emscripten_bind_NavMesh_getDefaultQueryExtent_0"] = asm["_emscripten_bind_NavMesh_getDefaultQueryExtent_0"];

        var _emscripten_bind_NavMesh_getNavMesh_0 = Module["_emscripten_bind_NavMesh_getNavMesh_0"] = asm["_emscripten_bind_NavMesh_getNavMesh_0"];

        var _emscripten_bind_NavMesh_getNavmeshData_0 = Module["_emscripten_bind_NavMesh_getNavmeshData_0"] = asm["_emscripten_bind_NavMesh_getNavmeshData_0"];

        var _emscripten_bind_NavMesh_getRandomPointAround_2 = Module["_emscripten_bind_NavMesh_getRandomPointAround_2"] = asm["_emscripten_bind_NavMesh_getRandomPointAround_2"];

        var _emscripten_bind_NavMesh_moveAlong_2 = Module["_emscripten_bind_NavMesh_moveAlong_2"] = asm["_emscripten_bind_NavMesh_moveAlong_2"];

        var _emscripten_bind_NavMesh_setDefaultQueryExtent_1 = Module["_emscripten_bind_NavMesh_setDefaultQueryExtent_1"] = asm["_emscripten_bind_NavMesh_setDefaultQueryExtent_1"];

        var _emscripten_bind_NavPath___destroy___0 = Module["_emscripten_bind_NavPath___destroy___0"] = asm["_emscripten_bind_NavPath___destroy___0"];

        var _emscripten_bind_NavPath_getPointCount_0 = Module["_emscripten_bind_NavPath_getPointCount_0"] = asm["_emscripten_bind_NavPath_getPointCount_0"];

        var _emscripten_bind_NavPath_getPoint_1 = Module["_emscripten_bind_NavPath_getPoint_1"] = asm["_emscripten_bind_NavPath_getPoint_1"];

        var _emscripten_bind_NavmeshData_NavmeshData_0 = Module["_emscripten_bind_NavmeshData_NavmeshData_0"] = asm["_emscripten_bind_NavmeshData_NavmeshData_0"];

        var _emscripten_bind_NavmeshData___destroy___0 = Module["_emscripten_bind_NavmeshData___destroy___0"] = asm["_emscripten_bind_NavmeshData___destroy___0"];

        var _emscripten_bind_NavmeshData_get_dataPointer_0 = Module["_emscripten_bind_NavmeshData_get_dataPointer_0"] = asm["_emscripten_bind_NavmeshData_get_dataPointer_0"];

        var _emscripten_bind_NavmeshData_get_size_0 = Module["_emscripten_bind_NavmeshData_get_size_0"] = asm["_emscripten_bind_NavmeshData_get_size_0"];

        var _emscripten_bind_NavmeshData_set_dataPointer_1 = Module["_emscripten_bind_NavmeshData_set_dataPointer_1"] = asm["_emscripten_bind_NavmeshData_set_dataPointer_1"];

        var _emscripten_bind_NavmeshData_set_size_1 = Module["_emscripten_bind_NavmeshData_set_size_1"] = asm["_emscripten_bind_NavmeshData_set_size_1"];

        var _emscripten_bind_Triangle_Triangle_0 = Module["_emscripten_bind_Triangle_Triangle_0"] = asm["_emscripten_bind_Triangle_Triangle_0"];

        var _emscripten_bind_Triangle___destroy___0 = Module["_emscripten_bind_Triangle___destroy___0"] = asm["_emscripten_bind_Triangle___destroy___0"];

        var _emscripten_bind_Triangle_getPoint_1 = Module["_emscripten_bind_Triangle_getPoint_1"] = asm["_emscripten_bind_Triangle_getPoint_1"];

        var _emscripten_bind_Vec3_Vec3_0 = Module["_emscripten_bind_Vec3_Vec3_0"] = asm["_emscripten_bind_Vec3_Vec3_0"];

        var _emscripten_bind_Vec3_Vec3_3 = Module["_emscripten_bind_Vec3_Vec3_3"] = asm["_emscripten_bind_Vec3_Vec3_3"];

        var _emscripten_bind_Vec3___destroy___0 = Module["_emscripten_bind_Vec3___destroy___0"] = asm["_emscripten_bind_Vec3___destroy___0"];

        var _emscripten_bind_Vec3_get_x_0 = Module["_emscripten_bind_Vec3_get_x_0"] = asm["_emscripten_bind_Vec3_get_x_0"];

        var _emscripten_bind_Vec3_get_y_0 = Module["_emscripten_bind_Vec3_get_y_0"] = asm["_emscripten_bind_Vec3_get_y_0"];

        var _emscripten_bind_Vec3_get_z_0 = Module["_emscripten_bind_Vec3_get_z_0"] = asm["_emscripten_bind_Vec3_get_z_0"];

        var _emscripten_bind_Vec3_set_x_1 = Module["_emscripten_bind_Vec3_set_x_1"] = asm["_emscripten_bind_Vec3_set_x_1"];

        var _emscripten_bind_Vec3_set_y_1 = Module["_emscripten_bind_Vec3_set_y_1"] = asm["_emscripten_bind_Vec3_set_y_1"];

        var _emscripten_bind_Vec3_set_z_1 = Module["_emscripten_bind_Vec3_set_z_1"] = asm["_emscripten_bind_Vec3_set_z_1"];

        var _emscripten_bind_VoidPtr___destroy___0 = Module["_emscripten_bind_VoidPtr___destroy___0"] = asm["_emscripten_bind_VoidPtr___destroy___0"];

        var _emscripten_bind_dtCrowdAgentParams___destroy___0 = Module["_emscripten_bind_dtCrowdAgentParams___destroy___0"] = asm["_emscripten_bind_dtCrowdAgentParams___destroy___0"];

        var _emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0 = Module["_emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0"] = asm["_emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_height_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_height_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_height_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_radius_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_radius_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_radius_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_separationWeight_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_separationWeight_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_separationWeight_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_updateFlags_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_updateFlags_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_updateFlags_0"];

        var _emscripten_bind_dtCrowdAgentParams_get_userData_0 = Module["_emscripten_bind_dtCrowdAgentParams_get_userData_0"] = asm["_emscripten_bind_dtCrowdAgentParams_get_userData_0"];

        var _emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_height_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_height_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_height_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_radius_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_radius_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_radius_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_separationWeight_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_separationWeight_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_separationWeight_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_updateFlags_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_updateFlags_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_updateFlags_1"];

        var _emscripten_bind_dtCrowdAgentParams_set_userData_1 = Module["_emscripten_bind_dtCrowdAgentParams_set_userData_1"] = asm["_emscripten_bind_dtCrowdAgentParams_set_userData_1"];

        var _emscripten_bind_dtNavMesh___destroy___0 = Module["_emscripten_bind_dtNavMesh___destroy___0"] = asm["_emscripten_bind_dtNavMesh___destroy___0"];

        var _emscripten_bind_rcConfig___destroy___0 = Module["_emscripten_bind_rcConfig___destroy___0"] = asm["_emscripten_bind_rcConfig___destroy___0"];

        var _emscripten_bind_rcConfig_get_bmax_1 = Module["_emscripten_bind_rcConfig_get_bmax_1"] = asm["_emscripten_bind_rcConfig_get_bmax_1"];

        var _emscripten_bind_rcConfig_get_bmin_1 = Module["_emscripten_bind_rcConfig_get_bmin_1"] = asm["_emscripten_bind_rcConfig_get_bmin_1"];

        var _emscripten_bind_rcConfig_get_borderSize_0 = Module["_emscripten_bind_rcConfig_get_borderSize_0"] = asm["_emscripten_bind_rcConfig_get_borderSize_0"];

        var _emscripten_bind_rcConfig_get_ch_0 = Module["_emscripten_bind_rcConfig_get_ch_0"] = asm["_emscripten_bind_rcConfig_get_ch_0"];

        var _emscripten_bind_rcConfig_get_cs_0 = Module["_emscripten_bind_rcConfig_get_cs_0"] = asm["_emscripten_bind_rcConfig_get_cs_0"];

        var _emscripten_bind_rcConfig_get_detailSampleDist_0 = Module["_emscripten_bind_rcConfig_get_detailSampleDist_0"] = asm["_emscripten_bind_rcConfig_get_detailSampleDist_0"];

        var _emscripten_bind_rcConfig_get_detailSampleMaxError_0 = Module["_emscripten_bind_rcConfig_get_detailSampleMaxError_0"] = asm["_emscripten_bind_rcConfig_get_detailSampleMaxError_0"];

        var _emscripten_bind_rcConfig_get_height_0 = Module["_emscripten_bind_rcConfig_get_height_0"] = asm["_emscripten_bind_rcConfig_get_height_0"];

        var _emscripten_bind_rcConfig_get_maxEdgeLen_0 = Module["_emscripten_bind_rcConfig_get_maxEdgeLen_0"] = asm["_emscripten_bind_rcConfig_get_maxEdgeLen_0"];

        var _emscripten_bind_rcConfig_get_maxSimplificationError_0 = Module["_emscripten_bind_rcConfig_get_maxSimplificationError_0"] = asm["_emscripten_bind_rcConfig_get_maxSimplificationError_0"];

        var _emscripten_bind_rcConfig_get_maxVertsPerPoly_0 = Module["_emscripten_bind_rcConfig_get_maxVertsPerPoly_0"] = asm["_emscripten_bind_rcConfig_get_maxVertsPerPoly_0"];

        var _emscripten_bind_rcConfig_get_mergeRegionArea_0 = Module["_emscripten_bind_rcConfig_get_mergeRegionArea_0"] = asm["_emscripten_bind_rcConfig_get_mergeRegionArea_0"];

        var _emscripten_bind_rcConfig_get_minRegionArea_0 = Module["_emscripten_bind_rcConfig_get_minRegionArea_0"] = asm["_emscripten_bind_rcConfig_get_minRegionArea_0"];

        var _emscripten_bind_rcConfig_get_tileSize_0 = Module["_emscripten_bind_rcConfig_get_tileSize_0"] = asm["_emscripten_bind_rcConfig_get_tileSize_0"];

        var _emscripten_bind_rcConfig_get_walkableClimb_0 = Module["_emscripten_bind_rcConfig_get_walkableClimb_0"] = asm["_emscripten_bind_rcConfig_get_walkableClimb_0"];

        var _emscripten_bind_rcConfig_get_walkableHeight_0 = Module["_emscripten_bind_rcConfig_get_walkableHeight_0"] = asm["_emscripten_bind_rcConfig_get_walkableHeight_0"];

        var _emscripten_bind_rcConfig_get_walkableRadius_0 = Module["_emscripten_bind_rcConfig_get_walkableRadius_0"] = asm["_emscripten_bind_rcConfig_get_walkableRadius_0"];

        var _emscripten_bind_rcConfig_get_walkableSlopeAngle_0 = Module["_emscripten_bind_rcConfig_get_walkableSlopeAngle_0"] = asm["_emscripten_bind_rcConfig_get_walkableSlopeAngle_0"];

        var _emscripten_bind_rcConfig_get_width_0 = Module["_emscripten_bind_rcConfig_get_width_0"] = asm["_emscripten_bind_rcConfig_get_width_0"];

        var _emscripten_bind_rcConfig_rcConfig_0 = Module["_emscripten_bind_rcConfig_rcConfig_0"] = asm["_emscripten_bind_rcConfig_rcConfig_0"];

        var _emscripten_bind_rcConfig_set_bmax_2 = Module["_emscripten_bind_rcConfig_set_bmax_2"] = asm["_emscripten_bind_rcConfig_set_bmax_2"];

        var _emscripten_bind_rcConfig_set_bmin_2 = Module["_emscripten_bind_rcConfig_set_bmin_2"] = asm["_emscripten_bind_rcConfig_set_bmin_2"];

        var _emscripten_bind_rcConfig_set_borderSize_1 = Module["_emscripten_bind_rcConfig_set_borderSize_1"] = asm["_emscripten_bind_rcConfig_set_borderSize_1"];

        var _emscripten_bind_rcConfig_set_ch_1 = Module["_emscripten_bind_rcConfig_set_ch_1"] = asm["_emscripten_bind_rcConfig_set_ch_1"];

        var _emscripten_bind_rcConfig_set_cs_1 = Module["_emscripten_bind_rcConfig_set_cs_1"] = asm["_emscripten_bind_rcConfig_set_cs_1"];

        var _emscripten_bind_rcConfig_set_detailSampleDist_1 = Module["_emscripten_bind_rcConfig_set_detailSampleDist_1"] = asm["_emscripten_bind_rcConfig_set_detailSampleDist_1"];

        var _emscripten_bind_rcConfig_set_detailSampleMaxError_1 = Module["_emscripten_bind_rcConfig_set_detailSampleMaxError_1"] = asm["_emscripten_bind_rcConfig_set_detailSampleMaxError_1"];

        var _emscripten_bind_rcConfig_set_height_1 = Module["_emscripten_bind_rcConfig_set_height_1"] = asm["_emscripten_bind_rcConfig_set_height_1"];

        var _emscripten_bind_rcConfig_set_maxEdgeLen_1 = Module["_emscripten_bind_rcConfig_set_maxEdgeLen_1"] = asm["_emscripten_bind_rcConfig_set_maxEdgeLen_1"];

        var _emscripten_bind_rcConfig_set_maxSimplificationError_1 = Module["_emscripten_bind_rcConfig_set_maxSimplificationError_1"] = asm["_emscripten_bind_rcConfig_set_maxSimplificationError_1"];

        var _emscripten_bind_rcConfig_set_maxVertsPerPoly_1 = Module["_emscripten_bind_rcConfig_set_maxVertsPerPoly_1"] = asm["_emscripten_bind_rcConfig_set_maxVertsPerPoly_1"];

        var _emscripten_bind_rcConfig_set_mergeRegionArea_1 = Module["_emscripten_bind_rcConfig_set_mergeRegionArea_1"] = asm["_emscripten_bind_rcConfig_set_mergeRegionArea_1"];

        var _emscripten_bind_rcConfig_set_minRegionArea_1 = Module["_emscripten_bind_rcConfig_set_minRegionArea_1"] = asm["_emscripten_bind_rcConfig_set_minRegionArea_1"];

        var _emscripten_bind_rcConfig_set_tileSize_1 = Module["_emscripten_bind_rcConfig_set_tileSize_1"] = asm["_emscripten_bind_rcConfig_set_tileSize_1"];

        var _emscripten_bind_rcConfig_set_walkableClimb_1 = Module["_emscripten_bind_rcConfig_set_walkableClimb_1"] = asm["_emscripten_bind_rcConfig_set_walkableClimb_1"];

        var _emscripten_bind_rcConfig_set_walkableHeight_1 = Module["_emscripten_bind_rcConfig_set_walkableHeight_1"] = asm["_emscripten_bind_rcConfig_set_walkableHeight_1"];

        var _emscripten_bind_rcConfig_set_walkableRadius_1 = Module["_emscripten_bind_rcConfig_set_walkableRadius_1"] = asm["_emscripten_bind_rcConfig_set_walkableRadius_1"];

        var _emscripten_bind_rcConfig_set_walkableSlopeAngle_1 = Module["_emscripten_bind_rcConfig_set_walkableSlopeAngle_1"] = asm["_emscripten_bind_rcConfig_set_walkableSlopeAngle_1"];

        var _emscripten_bind_rcConfig_set_width_1 = Module["_emscripten_bind_rcConfig_set_width_1"] = asm["_emscripten_bind_rcConfig_set_width_1"];

        var _emscripten_get_sbrk_ptr = Module["_emscripten_get_sbrk_ptr"] = asm["_emscripten_get_sbrk_ptr"];

        var _free = Module["_free"] = asm["_free"];

        var _i64Add = Module["_i64Add"] = asm["_i64Add"];

        var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];

        var _malloc = Module["_malloc"] = asm["_malloc"];

        var _memcpy = Module["_memcpy"] = asm["_memcpy"];

        var _memmove = Module["_memmove"] = asm["_memmove"];

        var _memset = Module["_memset"] = asm["_memset"];

        var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
        var globalCtors = Module["globalCtors"] = asm["globalCtors"];
        var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
        var stackRestore = Module["stackRestore"] = asm["stackRestore"];
        var stackSave = Module["stackSave"] = asm["stackSave"];
        var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
        var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
        var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
        var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
        var dynCall_iiiiid = Module["dynCall_iiiiid"] = asm["dynCall_iiiiid"];
        var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
        var dynCall_iiiiiid = Module["dynCall_iiiiiid"] = asm["dynCall_iiiiiid"];
        var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = asm["dynCall_iiiiiii"];
        var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = asm["dynCall_iiiiiiii"];
        var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm["dynCall_iiiiiiiii"];
        var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
        var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
        var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
        var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];
        var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
        var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
        Module["asm"] = asm;
        Module["Pointer_stringify"] = Pointer_stringify;

        if (memoryInitializer) {
          if (!isDataURI(memoryInitializer)) {
            memoryInitializer = locateFile(memoryInitializer);
          }

          if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
            var data = readBinary(memoryInitializer);
            HEAPU8.set(data, GLOBAL_BASE);
          } else {
            addRunDependency("memory initializer");

            var applyMemoryInitializer = function (data) {
              if (data.byteLength) {
                data = new Uint8Array(data);
              }

              HEAPU8.set(data, GLOBAL_BASE);

              if (Module["memoryInitializerRequest"]) {
                delete Module["memoryInitializerRequest"].response;
              }

              removeRunDependency("memory initializer");
            };

            var doBrowserLoad = function () {
              readAsync(memoryInitializer, applyMemoryInitializer, function () {
                throw "could not load memory initializer " + memoryInitializer;
              });
            };

            var memoryInitializerBytes = tryParseAsDataURI(memoryInitializer);

            if (memoryInitializerBytes) {
              applyMemoryInitializer(memoryInitializerBytes.buffer);
            } else {
              if (Module["memoryInitializerRequest"]) {
                var useRequest = function () {
                  var request = Module["memoryInitializerRequest"];
                  var response = request.response;

                  if (request.status !== 200 && request.status !== 0) {
                    var data = tryParseAsDataURI(Module["memoryInitializerRequestURL"]);

                    if (data) {
                      response = data.buffer;
                    } else {
                      console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + request.status + ", retrying " + memoryInitializer);
                      doBrowserLoad();
                      return;
                    }
                  }

                  applyMemoryInitializer(response);
                };

                if (Module["memoryInitializerRequest"].response) {
                  setTimeout(useRequest, 0);
                } else {
                  Module["memoryInitializerRequest"].addEventListener("load", useRequest);
                }
              } else {
                doBrowserLoad();
              }
            }
          }
        }

        var calledRun;

        Module["then"] = function (func) {
          if (calledRun) {
            func(Module);
          } else {
            var old = Module["onRuntimeInitialized"];

            Module["onRuntimeInitialized"] = function () {
              if (old) {
                old();
              }

              func(Module);
            };
          }

          return Module;
        };

        function ExitStatus(status) {
          this.name = "ExitStatus";
          this.message = "Program terminated with exit(" + status + ")";
          this.status = status;
        }

        dependenciesFulfilled = function runCaller() {
          if (!calledRun) {
            run();
          }

          if (!calledRun) {
            dependenciesFulfilled = runCaller;
          }
        };

        function run(args) {
          args = args || arguments_;

          if (runDependencies > 0) {
            return;
          }

          preRun();

          if (runDependencies > 0) {
            return;
          }

          function doRun() {
            if (calledRun) {
              return;
            }

            calledRun = true;

            if (ABORT) {
              return;
            }

            initRuntime();
            preMain();

            if (Module["onRuntimeInitialized"]) {
              Module["onRuntimeInitialized"]();
            }

            postRun();
          }

          if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(function () {
              setTimeout(function () {
                Module["setStatus"]("");
              }, 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }

        Module["run"] = run;

        if (Module["preInit"]) {
          if (typeof Module["preInit"] == "function") {
            Module["preInit"] = [Module["preInit"]];
          }

          while (Module["preInit"].length > 0) {
            Module["preInit"].pop()();
          }
        }

        noExitRuntime = true;
        run();

        function WrapperObject() {}

        WrapperObject.prototype = Object.create(WrapperObject.prototype);
        WrapperObject.prototype.constructor = WrapperObject;
        WrapperObject.prototype.__class__ = WrapperObject;
        WrapperObject.__cache__ = {};
        Module["WrapperObject"] = WrapperObject;

        function getCache(__class__) {
          return (__class__ || WrapperObject).__cache__;
        }

        Module["getCache"] = getCache;

        function wrapPointer(ptr, __class__) {
          var cache = getCache(__class__);
          var ret = cache[ptr];

          if (ret) {
            return ret;
          }

          ret = Object.create((__class__ || WrapperObject).prototype);
          ret.ptr = ptr;
          return cache[ptr] = ret;
        }

        Module["wrapPointer"] = wrapPointer;

        function castObject(obj, __class__) {
          return wrapPointer(obj.ptr, __class__);
        }

        Module["castObject"] = castObject;
        Module["NULL"] = wrapPointer(0);

        function destroy(obj) {
          if (!obj["__destroy__"]) {
            throw "Error: Cannot destroy object. (Did you create it yourself?)";
          }

          obj["__destroy__"]();
          delete getCache(obj.__class__)[obj.ptr];
        }

        Module["destroy"] = destroy;

        function compare(obj1, obj2) {
          return obj1.ptr === obj2.ptr;
        }

        Module["compare"] = compare;

        function getPointer(obj) {
          return obj.ptr;
        }

        Module["getPointer"] = getPointer;

        function getClass(obj) {
          return obj.__class__;
        }

        Module["getClass"] = getClass;
        var ensureCache = {
          buffer: 0,
          size: 0,
          pos: 0,
          temps: [],
          needed: 0,
          prepare: function () {
            if (ensureCache.needed) {
              for (var i = 0; i < ensureCache.temps.length; i++) {
                Module["_free"](ensureCache.temps[i]);
              }

              ensureCache.temps.length = 0;
              Module["_free"](ensureCache.buffer);
              ensureCache.buffer = 0;
              ensureCache.size += ensureCache.needed;
              ensureCache.needed = 0;
            }

            if (!ensureCache.buffer) {
              ensureCache.size += 128;
              ensureCache.buffer = Module["_malloc"](ensureCache.size);
              assert(ensureCache.buffer);
            }

            ensureCache.pos = 0;
          },
          alloc: function (array, view) {
            assert(ensureCache.buffer);
            var bytes = view.BYTES_PER_ELEMENT;
            var len = array.length * bytes;
            len = len + 7 & -8;
            var ret;

            if (ensureCache.pos + len >= ensureCache.size) {
              assert(len > 0);
              ensureCache.needed += len;
              ret = Module["_malloc"](len);
              ensureCache.temps.push(ret);
            } else {
              ret = ensureCache.buffer + ensureCache.pos;
              ensureCache.pos += len;
            }

            return ret;
          },
          copy: function (array, view, offset) {
            var offsetShifted = offset;
            var bytes = view.BYTES_PER_ELEMENT;

            switch (bytes) {
              case 2:
                offsetShifted >>= 1;
                break;

              case 4:
                offsetShifted >>= 2;
                break;

              case 8:
                offsetShifted >>= 3;
                break;
            }

            for (var i = 0; i < array.length; i++) {
              view[offsetShifted + i] = array[i];
            }
          }
        };

        function ensureInt32(value) {
          if (typeof value === "object") {
            var offset = ensureCache.alloc(value, HEAP32);
            ensureCache.copy(value, HEAP32, offset);
            return offset;
          }

          return value;
        }

        function ensureFloat32(value) {
          if (typeof value === "object") {
            var offset = ensureCache.alloc(value, HEAPF32);
            ensureCache.copy(value, HEAPF32, offset);
            return offset;
          }

          return value;
        }

        function NavMesh() {
          this.ptr = _emscripten_bind_NavMesh_NavMesh_0();
          getCache(NavMesh)[this.ptr] = this;
        }

        NavMesh.prototype = Object.create(WrapperObject.prototype);
        NavMesh.prototype.constructor = NavMesh;
        NavMesh.prototype.__class__ = NavMesh;
        NavMesh.__cache__ = {};
        Module["NavMesh"] = NavMesh;

        NavMesh.prototype["destroy"] = NavMesh.prototype.destroy = function () {
          var self = this.ptr;

          _emscripten_bind_NavMesh_destroy_0(self);
        };

        NavMesh.prototype["build"] = NavMesh.prototype.build = function (positions, positionCount, indices, indexCount, config) {
          var self = this.ptr;
          ensureCache.prepare();

          if (typeof positions == "object") {
            positions = ensureFloat32(positions);
          }

          if (positionCount && typeof positionCount === "object") {
            positionCount = positionCount.ptr;
          }

          if (typeof indices == "object") {
            indices = ensureInt32(indices);
          }

          if (indexCount && typeof indexCount === "object") {
            indexCount = indexCount.ptr;
          }

          if (config && typeof config === "object") {
            config = config.ptr;
          }

          _emscripten_bind_NavMesh_build_5(self, positions, positionCount, indices, indexCount, config);
        };

        NavMesh.prototype["buildFromNavmeshData"] = NavMesh.prototype.buildFromNavmeshData = function (data) {
          var self = this.ptr;

          if (data && typeof data === "object") {
            data = data.ptr;
          }

          _emscripten_bind_NavMesh_buildFromNavmeshData_1(self, data);
        };

        NavMesh.prototype["getNavmeshData"] = NavMesh.prototype.getNavmeshData = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_NavMesh_getNavmeshData_0(self), NavmeshData);
        };

        NavMesh.prototype["freeNavmeshData"] = NavMesh.prototype.freeNavmeshData = function (data) {
          var self = this.ptr;

          if (data && typeof data === "object") {
            data = data.ptr;
          }

          _emscripten_bind_NavMesh_freeNavmeshData_1(self, data);
        };

        NavMesh.prototype["getDebugNavMesh"] = NavMesh.prototype.getDebugNavMesh = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_NavMesh_getDebugNavMesh_0(self), DebugNavMesh);
        };

        NavMesh.prototype["getClosestPoint"] = NavMesh.prototype.getClosestPoint = function (position) {
          var self = this.ptr;

          if (position && typeof position === "object") {
            position = position.ptr;
          }

          return wrapPointer(_emscripten_bind_NavMesh_getClosestPoint_1(self, position), Vec3);
        };

        NavMesh.prototype["getRandomPointAround"] = NavMesh.prototype.getRandomPointAround = function (position, maxRadius) {
          var self = this.ptr;

          if (position && typeof position === "object") {
            position = position.ptr;
          }

          if (maxRadius && typeof maxRadius === "object") {
            maxRadius = maxRadius.ptr;
          }

          return wrapPointer(_emscripten_bind_NavMesh_getRandomPointAround_2(self, position, maxRadius), Vec3);
        };

        NavMesh.prototype["moveAlong"] = NavMesh.prototype.moveAlong = function (position, destination) {
          var self = this.ptr;

          if (position && typeof position === "object") {
            position = position.ptr;
          }

          if (destination && typeof destination === "object") {
            destination = destination.ptr;
          }

          return wrapPointer(_emscripten_bind_NavMesh_moveAlong_2(self, position, destination), Vec3);
        };

        NavMesh.prototype["getNavMesh"] = NavMesh.prototype.getNavMesh = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_NavMesh_getNavMesh_0(self), dtNavMesh);
        };

        NavMesh.prototype["computePath"] = NavMesh.prototype.computePath = function (start, end) {
          var self = this.ptr;

          if (start && typeof start === "object") {
            start = start.ptr;
          }

          if (end && typeof end === "object") {
            end = end.ptr;
          }

          return wrapPointer(_emscripten_bind_NavMesh_computePath_2(self, start, end), NavPath);
        };

        NavMesh.prototype["setDefaultQueryExtent"] = NavMesh.prototype.setDefaultQueryExtent = function (extent) {
          var self = this.ptr;

          if (extent && typeof extent === "object") {
            extent = extent.ptr;
          }

          _emscripten_bind_NavMesh_setDefaultQueryExtent_1(self, extent);
        };

        NavMesh.prototype["getDefaultQueryExtent"] = NavMesh.prototype.getDefaultQueryExtent = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_NavMesh_getDefaultQueryExtent_0(self), Vec3);
        };

        NavMesh.prototype["__destroy__"] = NavMesh.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_NavMesh___destroy___0(self);
        };

        function Triangle() {
          this.ptr = _emscripten_bind_Triangle_Triangle_0();
          getCache(Triangle)[this.ptr] = this;
        }

        Triangle.prototype = Object.create(WrapperObject.prototype);
        Triangle.prototype.constructor = Triangle;
        Triangle.prototype.__class__ = Triangle;
        Triangle.__cache__ = {};
        Module["Triangle"] = Triangle;

        Triangle.prototype["getPoint"] = Triangle.prototype.getPoint = function (n) {
          var self = this.ptr;

          if (n && typeof n === "object") {
            n = n.ptr;
          }

          return wrapPointer(_emscripten_bind_Triangle_getPoint_1(self, n), Vec3);
        };

        Triangle.prototype["__destroy__"] = Triangle.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_Triangle___destroy___0(self);
        };

        function NavPath() {
          throw "cannot construct a NavPath, no constructor in IDL";
        }

        NavPath.prototype = Object.create(WrapperObject.prototype);
        NavPath.prototype.constructor = NavPath;
        NavPath.prototype.__class__ = NavPath;
        NavPath.__cache__ = {};
        Module["NavPath"] = NavPath;

        NavPath.prototype["getPointCount"] = NavPath.prototype.getPointCount = function () {
          var self = this.ptr;
          return _emscripten_bind_NavPath_getPointCount_0(self);
        };

        NavPath.prototype["getPoint"] = NavPath.prototype.getPoint = function (n) {
          var self = this.ptr;

          if (n && typeof n === "object") {
            n = n.ptr;
          }

          return wrapPointer(_emscripten_bind_NavPath_getPoint_1(self, n), Vec3);
        };

        NavPath.prototype["__destroy__"] = NavPath.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_NavPath___destroy___0(self);
        };

        function Crowd(maxAgents, maxAgentRadius, nav) {
          if (maxAgents && typeof maxAgents === "object") {
            maxAgents = maxAgents.ptr;
          }

          if (maxAgentRadius && typeof maxAgentRadius === "object") {
            maxAgentRadius = maxAgentRadius.ptr;
          }

          if (nav && typeof nav === "object") {
            nav = nav.ptr;
          }

          this.ptr = _emscripten_bind_Crowd_Crowd_3(maxAgents, maxAgentRadius, nav);
          getCache(Crowd)[this.ptr] = this;
        }

        Crowd.prototype = Object.create(WrapperObject.prototype);
        Crowd.prototype.constructor = Crowd;
        Crowd.prototype.__class__ = Crowd;
        Crowd.__cache__ = {};
        Module["Crowd"] = Crowd;

        Crowd.prototype["destroy"] = Crowd.prototype.destroy = function () {
          var self = this.ptr;

          _emscripten_bind_Crowd_destroy_0(self);
        };

        Crowd.prototype["addAgent"] = Crowd.prototype.addAgent = function (position, params) {
          var self = this.ptr;

          if (position && typeof position === "object") {
            position = position.ptr;
          }

          if (params && typeof params === "object") {
            params = params.ptr;
          }

          return _emscripten_bind_Crowd_addAgent_2(self, position, params);
        };

        Crowd.prototype["removeAgent"] = Crowd.prototype.removeAgent = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          _emscripten_bind_Crowd_removeAgent_1(self, idx);
        };

        Crowd.prototype["update"] = Crowd.prototype.update = function (dt) {
          var self = this.ptr;

          if (dt && typeof dt === "object") {
            dt = dt.ptr;
          }

          _emscripten_bind_Crowd_update_1(self, dt);
        };

        Crowd.prototype["getAgentPosition"] = Crowd.prototype.getAgentPosition = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return wrapPointer(_emscripten_bind_Crowd_getAgentPosition_1(self, idx), Vec3);
        };

        Crowd.prototype["getAgentVelocity"] = Crowd.prototype.getAgentVelocity = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return wrapPointer(_emscripten_bind_Crowd_getAgentVelocity_1(self, idx), Vec3);
        };

        Crowd.prototype["getAgentNextTargetPath"] = Crowd.prototype.getAgentNextTargetPath = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return wrapPointer(_emscripten_bind_Crowd_getAgentNextTargetPath_1(self, idx), Vec3);
        };

        Crowd.prototype["getAgentState"] = Crowd.prototype.getAgentState = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return _emscripten_bind_Crowd_getAgentState_1(self, idx);
        };

        Crowd.prototype["overOffmeshConnection"] = Crowd.prototype.overOffmeshConnection = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return !!_emscripten_bind_Crowd_overOffmeshConnection_1(self, idx);
        };

        Crowd.prototype["agentGoto"] = Crowd.prototype.agentGoto = function (idx, destination) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          if (destination && typeof destination === "object") {
            destination = destination.ptr;
          }

          _emscripten_bind_Crowd_agentGoto_2(self, idx, destination);
        };

        Crowd.prototype["agentTeleport"] = Crowd.prototype.agentTeleport = function (idx, destination) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          if (destination && typeof destination === "object") {
            destination = destination.ptr;
          }

          _emscripten_bind_Crowd_agentTeleport_2(self, idx, destination);
        };

        Crowd.prototype["getAgentParameters"] = Crowd.prototype.getAgentParameters = function (idx) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          return wrapPointer(_emscripten_bind_Crowd_getAgentParameters_1(self, idx), dtCrowdAgentParams);
        };

        Crowd.prototype["setAgentParameters"] = Crowd.prototype.setAgentParameters = function (idx, params) {
          var self = this.ptr;

          if (idx && typeof idx === "object") {
            idx = idx.ptr;
          }

          if (params && typeof params === "object") {
            params = params.ptr;
          }

          _emscripten_bind_Crowd_setAgentParameters_2(self, idx, params);
        };

        Crowd.prototype["setDefaultQueryExtent"] = Crowd.prototype.setDefaultQueryExtent = function (extent) {
          var self = this.ptr;

          if (extent && typeof extent === "object") {
            extent = extent.ptr;
          }

          _emscripten_bind_Crowd_setDefaultQueryExtent_1(self, extent);
        };

        Crowd.prototype["getDefaultQueryExtent"] = Crowd.prototype.getDefaultQueryExtent = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_Crowd_getDefaultQueryExtent_0(self), Vec3);
        };

        Crowd.prototype["__destroy__"] = Crowd.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_Crowd___destroy___0(self);
        };

        function rcConfig() {
          this.ptr = _emscripten_bind_rcConfig_rcConfig_0();
          getCache(rcConfig)[this.ptr] = this;
        }

        rcConfig.prototype = Object.create(WrapperObject.prototype);
        rcConfig.prototype.constructor = rcConfig;
        rcConfig.prototype.__class__ = rcConfig;
        rcConfig.__cache__ = {};
        Module["rcConfig"] = rcConfig;

        rcConfig.prototype["get_width"] = rcConfig.prototype.get_width = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_width_0(self);
        };

        rcConfig.prototype["set_width"] = rcConfig.prototype.set_width = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_width_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "width", {
          get: rcConfig.prototype.get_width,
          set: rcConfig.prototype.set_width
        });

        rcConfig.prototype["get_height"] = rcConfig.prototype.get_height = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_height_0(self);
        };

        rcConfig.prototype["set_height"] = rcConfig.prototype.set_height = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_height_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "height", {
          get: rcConfig.prototype.get_height,
          set: rcConfig.prototype.set_height
        });

        rcConfig.prototype["get_tileSize"] = rcConfig.prototype.get_tileSize = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_tileSize_0(self);
        };

        rcConfig.prototype["set_tileSize"] = rcConfig.prototype.set_tileSize = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_tileSize_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "tileSize", {
          get: rcConfig.prototype.get_tileSize,
          set: rcConfig.prototype.set_tileSize
        });

        rcConfig.prototype["get_borderSize"] = rcConfig.prototype.get_borderSize = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_borderSize_0(self);
        };

        rcConfig.prototype["set_borderSize"] = rcConfig.prototype.set_borderSize = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_borderSize_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "borderSize", {
          get: rcConfig.prototype.get_borderSize,
          set: rcConfig.prototype.set_borderSize
        });

        rcConfig.prototype["get_cs"] = rcConfig.prototype.get_cs = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_cs_0(self);
        };

        rcConfig.prototype["set_cs"] = rcConfig.prototype.set_cs = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_cs_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "cs", {
          get: rcConfig.prototype.get_cs,
          set: rcConfig.prototype.set_cs
        });

        rcConfig.prototype["get_ch"] = rcConfig.prototype.get_ch = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_ch_0(self);
        };

        rcConfig.prototype["set_ch"] = rcConfig.prototype.set_ch = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_ch_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "ch", {
          get: rcConfig.prototype.get_ch,
          set: rcConfig.prototype.set_ch
        });

        rcConfig.prototype["get_bmin"] = rcConfig.prototype.get_bmin = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          return _emscripten_bind_rcConfig_get_bmin_1(self, arg0);
        };

        rcConfig.prototype["set_bmin"] = rcConfig.prototype.set_bmin = function (arg0, arg1) {
          var self = this.ptr;
          ensureCache.prepare();

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          if (arg1 && typeof arg1 === "object") {
            arg1 = arg1.ptr;
          }

          _emscripten_bind_rcConfig_set_bmin_2(self, arg0, arg1);
        };

        Object.defineProperty(rcConfig.prototype, "bmin", {
          get: rcConfig.prototype.get_bmin,
          set: rcConfig.prototype.set_bmin
        });

        rcConfig.prototype["get_bmax"] = rcConfig.prototype.get_bmax = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          return _emscripten_bind_rcConfig_get_bmax_1(self, arg0);
        };

        rcConfig.prototype["set_bmax"] = rcConfig.prototype.set_bmax = function (arg0, arg1) {
          var self = this.ptr;
          ensureCache.prepare();

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          if (arg1 && typeof arg1 === "object") {
            arg1 = arg1.ptr;
          }

          _emscripten_bind_rcConfig_set_bmax_2(self, arg0, arg1);
        };

        Object.defineProperty(rcConfig.prototype, "bmax", {
          get: rcConfig.prototype.get_bmax,
          set: rcConfig.prototype.set_bmax
        });

        rcConfig.prototype["get_walkableSlopeAngle"] = rcConfig.prototype.get_walkableSlopeAngle = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_walkableSlopeAngle_0(self);
        };

        rcConfig.prototype["set_walkableSlopeAngle"] = rcConfig.prototype.set_walkableSlopeAngle = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_walkableSlopeAngle_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "walkableSlopeAngle", {
          get: rcConfig.prototype.get_walkableSlopeAngle,
          set: rcConfig.prototype.set_walkableSlopeAngle
        });

        rcConfig.prototype["get_walkableHeight"] = rcConfig.prototype.get_walkableHeight = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_walkableHeight_0(self);
        };

        rcConfig.prototype["set_walkableHeight"] = rcConfig.prototype.set_walkableHeight = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_walkableHeight_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "walkableHeight", {
          get: rcConfig.prototype.get_walkableHeight,
          set: rcConfig.prototype.set_walkableHeight
        });

        rcConfig.prototype["get_walkableClimb"] = rcConfig.prototype.get_walkableClimb = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_walkableClimb_0(self);
        };

        rcConfig.prototype["set_walkableClimb"] = rcConfig.prototype.set_walkableClimb = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_walkableClimb_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "walkableClimb", {
          get: rcConfig.prototype.get_walkableClimb,
          set: rcConfig.prototype.set_walkableClimb
        });

        rcConfig.prototype["get_walkableRadius"] = rcConfig.prototype.get_walkableRadius = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_walkableRadius_0(self);
        };

        rcConfig.prototype["set_walkableRadius"] = rcConfig.prototype.set_walkableRadius = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_walkableRadius_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "walkableRadius", {
          get: rcConfig.prototype.get_walkableRadius,
          set: rcConfig.prototype.set_walkableRadius
        });

        rcConfig.prototype["get_maxEdgeLen"] = rcConfig.prototype.get_maxEdgeLen = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_maxEdgeLen_0(self);
        };

        rcConfig.prototype["set_maxEdgeLen"] = rcConfig.prototype.set_maxEdgeLen = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_maxEdgeLen_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "maxEdgeLen", {
          get: rcConfig.prototype.get_maxEdgeLen,
          set: rcConfig.prototype.set_maxEdgeLen
        });

        rcConfig.prototype["get_maxSimplificationError"] = rcConfig.prototype.get_maxSimplificationError = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_maxSimplificationError_0(self);
        };

        rcConfig.prototype["set_maxSimplificationError"] = rcConfig.prototype.set_maxSimplificationError = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_maxSimplificationError_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "maxSimplificationError", {
          get: rcConfig.prototype.get_maxSimplificationError,
          set: rcConfig.prototype.set_maxSimplificationError
        });

        rcConfig.prototype["get_minRegionArea"] = rcConfig.prototype.get_minRegionArea = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_minRegionArea_0(self);
        };

        rcConfig.prototype["set_minRegionArea"] = rcConfig.prototype.set_minRegionArea = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_minRegionArea_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "minRegionArea", {
          get: rcConfig.prototype.get_minRegionArea,
          set: rcConfig.prototype.set_minRegionArea
        });

        rcConfig.prototype["get_mergeRegionArea"] = rcConfig.prototype.get_mergeRegionArea = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_mergeRegionArea_0(self);
        };

        rcConfig.prototype["set_mergeRegionArea"] = rcConfig.prototype.set_mergeRegionArea = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_mergeRegionArea_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "mergeRegionArea", {
          get: rcConfig.prototype.get_mergeRegionArea,
          set: rcConfig.prototype.set_mergeRegionArea
        });

        rcConfig.prototype["get_maxVertsPerPoly"] = rcConfig.prototype.get_maxVertsPerPoly = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_maxVertsPerPoly_0(self);
        };

        rcConfig.prototype["set_maxVertsPerPoly"] = rcConfig.prototype.set_maxVertsPerPoly = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_maxVertsPerPoly_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "maxVertsPerPoly", {
          get: rcConfig.prototype.get_maxVertsPerPoly,
          set: rcConfig.prototype.set_maxVertsPerPoly
        });

        rcConfig.prototype["get_detailSampleDist"] = rcConfig.prototype.get_detailSampleDist = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_detailSampleDist_0(self);
        };

        rcConfig.prototype["set_detailSampleDist"] = rcConfig.prototype.set_detailSampleDist = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_detailSampleDist_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "detailSampleDist", {
          get: rcConfig.prototype.get_detailSampleDist,
          set: rcConfig.prototype.set_detailSampleDist
        });

        rcConfig.prototype["get_detailSampleMaxError"] = rcConfig.prototype.get_detailSampleMaxError = function () {
          var self = this.ptr;
          return _emscripten_bind_rcConfig_get_detailSampleMaxError_0(self);
        };

        rcConfig.prototype["set_detailSampleMaxError"] = rcConfig.prototype.set_detailSampleMaxError = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_rcConfig_set_detailSampleMaxError_1(self, arg0);
        };

        Object.defineProperty(rcConfig.prototype, "detailSampleMaxError", {
          get: rcConfig.prototype.get_detailSampleMaxError,
          set: rcConfig.prototype.set_detailSampleMaxError
        });

        rcConfig.prototype["__destroy__"] = rcConfig.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_rcConfig___destroy___0(self);
        };

        function DebugNavMesh() {
          this.ptr = _emscripten_bind_DebugNavMesh_DebugNavMesh_0();
          getCache(DebugNavMesh)[this.ptr] = this;
        }

        DebugNavMesh.prototype = Object.create(WrapperObject.prototype);
        DebugNavMesh.prototype.constructor = DebugNavMesh;
        DebugNavMesh.prototype.__class__ = DebugNavMesh;
        DebugNavMesh.__cache__ = {};
        Module["DebugNavMesh"] = DebugNavMesh;

        DebugNavMesh.prototype["getTriangleCount"] = DebugNavMesh.prototype.getTriangleCount = function () {
          var self = this.ptr;
          return _emscripten_bind_DebugNavMesh_getTriangleCount_0(self);
        };

        DebugNavMesh.prototype["getTriangle"] = DebugNavMesh.prototype.getTriangle = function (n) {
          var self = this.ptr;

          if (n && typeof n === "object") {
            n = n.ptr;
          }

          return wrapPointer(_emscripten_bind_DebugNavMesh_getTriangle_1(self, n), Triangle);
        };

        DebugNavMesh.prototype["__destroy__"] = DebugNavMesh.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_DebugNavMesh___destroy___0(self);
        };

        function Vec3(x, y, z) {
          if (x && typeof x === "object") {
            x = x.ptr;
          }

          if (y && typeof y === "object") {
            y = y.ptr;
          }

          if (z && typeof z === "object") {
            z = z.ptr;
          }

          if (x === undefined) {
            this.ptr = _emscripten_bind_Vec3_Vec3_0();
            getCache(Vec3)[this.ptr] = this;
            return;
          }

          if (y === undefined) {
            this.ptr = _emscripten_bind_Vec3_Vec3_1(x);
            getCache(Vec3)[this.ptr] = this;
            return;
          }

          if (z === undefined) {
            this.ptr = _emscripten_bind_Vec3_Vec3_2(x, y);
            getCache(Vec3)[this.ptr] = this;
            return;
          }

          this.ptr = _emscripten_bind_Vec3_Vec3_3(x, y, z);
          getCache(Vec3)[this.ptr] = this;
        }

        Vec3.prototype = Object.create(WrapperObject.prototype);
        Vec3.prototype.constructor = Vec3;
        Vec3.prototype.__class__ = Vec3;
        Vec3.__cache__ = {};
        Module["Vec3"] = Vec3;

        Vec3.prototype["get_x"] = Vec3.prototype.get_x = function () {
          var self = this.ptr;
          return _emscripten_bind_Vec3_get_x_0(self);
        };

        Vec3.prototype["set_x"] = Vec3.prototype.set_x = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_Vec3_set_x_1(self, arg0);
        };

        Object.defineProperty(Vec3.prototype, "x", {
          get: Vec3.prototype.get_x,
          set: Vec3.prototype.set_x
        });

        Vec3.prototype["get_y"] = Vec3.prototype.get_y = function () {
          var self = this.ptr;
          return _emscripten_bind_Vec3_get_y_0(self);
        };

        Vec3.prototype["set_y"] = Vec3.prototype.set_y = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_Vec3_set_y_1(self, arg0);
        };

        Object.defineProperty(Vec3.prototype, "y", {
          get: Vec3.prototype.get_y,
          set: Vec3.prototype.set_y
        });

        Vec3.prototype["get_z"] = Vec3.prototype.get_z = function () {
          var self = this.ptr;
          return _emscripten_bind_Vec3_get_z_0(self);
        };

        Vec3.prototype["set_z"] = Vec3.prototype.set_z = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_Vec3_set_z_1(self, arg0);
        };

        Object.defineProperty(Vec3.prototype, "z", {
          get: Vec3.prototype.get_z,
          set: Vec3.prototype.set_z
        });

        Vec3.prototype["__destroy__"] = Vec3.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_Vec3___destroy___0(self);
        };

        function NavmeshData() {
          this.ptr = _emscripten_bind_NavmeshData_NavmeshData_0();
          getCache(NavmeshData)[this.ptr] = this;
        }

        NavmeshData.prototype = Object.create(WrapperObject.prototype);
        NavmeshData.prototype.constructor = NavmeshData;
        NavmeshData.prototype.__class__ = NavmeshData;
        NavmeshData.__cache__ = {};
        Module["NavmeshData"] = NavmeshData;

        NavmeshData.prototype["get_dataPointer"] = NavmeshData.prototype.get_dataPointer = function () {
          var self = this.ptr;
          return _emscripten_bind_NavmeshData_get_dataPointer_0(self);
        };

        NavmeshData.prototype["set_dataPointer"] = NavmeshData.prototype.set_dataPointer = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_NavmeshData_set_dataPointer_1(self, arg0);
        };

        Object.defineProperty(NavmeshData.prototype, "dataPointer", {
          get: NavmeshData.prototype.get_dataPointer,
          set: NavmeshData.prototype.set_dataPointer
        });

        NavmeshData.prototype["get_size"] = NavmeshData.prototype.get_size = function () {
          var self = this.ptr;
          return _emscripten_bind_NavmeshData_get_size_0(self);
        };

        NavmeshData.prototype["set_size"] = NavmeshData.prototype.set_size = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_NavmeshData_set_size_1(self, arg0);
        };

        Object.defineProperty(NavmeshData.prototype, "size", {
          get: NavmeshData.prototype.get_size,
          set: NavmeshData.prototype.set_size
        });

        NavmeshData.prototype["__destroy__"] = NavmeshData.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_NavmeshData___destroy___0(self);
        };

        function dtCrowdAgentParams() {
          this.ptr = _emscripten_bind_dtCrowdAgentParams_dtCrowdAgentParams_0();
          getCache(dtCrowdAgentParams)[this.ptr] = this;
        }

        dtCrowdAgentParams.prototype = Object.create(WrapperObject.prototype);
        dtCrowdAgentParams.prototype.constructor = dtCrowdAgentParams;
        dtCrowdAgentParams.prototype.__class__ = dtCrowdAgentParams;
        dtCrowdAgentParams.__cache__ = {};
        Module["dtCrowdAgentParams"] = dtCrowdAgentParams;

        dtCrowdAgentParams.prototype["get_radius"] = dtCrowdAgentParams.prototype.get_radius = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_radius_0(self);
        };

        dtCrowdAgentParams.prototype["set_radius"] = dtCrowdAgentParams.prototype.set_radius = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_radius_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "radius", {
          get: dtCrowdAgentParams.prototype.get_radius,
          set: dtCrowdAgentParams.prototype.set_radius
        });

        dtCrowdAgentParams.prototype["get_height"] = dtCrowdAgentParams.prototype.get_height = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_height_0(self);
        };

        dtCrowdAgentParams.prototype["set_height"] = dtCrowdAgentParams.prototype.set_height = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_height_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "height", {
          get: dtCrowdAgentParams.prototype.get_height,
          set: dtCrowdAgentParams.prototype.set_height
        });

        dtCrowdAgentParams.prototype["get_maxAcceleration"] = dtCrowdAgentParams.prototype.get_maxAcceleration = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_maxAcceleration_0(self);
        };

        dtCrowdAgentParams.prototype["set_maxAcceleration"] = dtCrowdAgentParams.prototype.set_maxAcceleration = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_maxAcceleration_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "maxAcceleration", {
          get: dtCrowdAgentParams.prototype.get_maxAcceleration,
          set: dtCrowdAgentParams.prototype.set_maxAcceleration
        });

        dtCrowdAgentParams.prototype["get_maxSpeed"] = dtCrowdAgentParams.prototype.get_maxSpeed = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_maxSpeed_0(self);
        };

        dtCrowdAgentParams.prototype["set_maxSpeed"] = dtCrowdAgentParams.prototype.set_maxSpeed = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_maxSpeed_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "maxSpeed", {
          get: dtCrowdAgentParams.prototype.get_maxSpeed,
          set: dtCrowdAgentParams.prototype.set_maxSpeed
        });

        dtCrowdAgentParams.prototype["get_collisionQueryRange"] = dtCrowdAgentParams.prototype.get_collisionQueryRange = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_collisionQueryRange_0(self);
        };

        dtCrowdAgentParams.prototype["set_collisionQueryRange"] = dtCrowdAgentParams.prototype.set_collisionQueryRange = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_collisionQueryRange_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "collisionQueryRange", {
          get: dtCrowdAgentParams.prototype.get_collisionQueryRange,
          set: dtCrowdAgentParams.prototype.set_collisionQueryRange
        });

        dtCrowdAgentParams.prototype["get_pathOptimizationRange"] = dtCrowdAgentParams.prototype.get_pathOptimizationRange = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_pathOptimizationRange_0(self);
        };

        dtCrowdAgentParams.prototype["set_pathOptimizationRange"] = dtCrowdAgentParams.prototype.set_pathOptimizationRange = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_pathOptimizationRange_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "pathOptimizationRange", {
          get: dtCrowdAgentParams.prototype.get_pathOptimizationRange,
          set: dtCrowdAgentParams.prototype.set_pathOptimizationRange
        });

        dtCrowdAgentParams.prototype["get_separationWeight"] = dtCrowdAgentParams.prototype.get_separationWeight = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_separationWeight_0(self);
        };

        dtCrowdAgentParams.prototype["set_separationWeight"] = dtCrowdAgentParams.prototype.set_separationWeight = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_separationWeight_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "separationWeight", {
          get: dtCrowdAgentParams.prototype.get_separationWeight,
          set: dtCrowdAgentParams.prototype.set_separationWeight
        });

        dtCrowdAgentParams.prototype["get_updateFlags"] = dtCrowdAgentParams.prototype.get_updateFlags = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_updateFlags_0(self);
        };

        dtCrowdAgentParams.prototype["set_updateFlags"] = dtCrowdAgentParams.prototype.set_updateFlags = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_updateFlags_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "updateFlags", {
          get: dtCrowdAgentParams.prototype.get_updateFlags,
          set: dtCrowdAgentParams.prototype.set_updateFlags
        });

        dtCrowdAgentParams.prototype["get_obstacleAvoidanceType"] = dtCrowdAgentParams.prototype.get_obstacleAvoidanceType = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_obstacleAvoidanceType_0(self);
        };

        dtCrowdAgentParams.prototype["set_obstacleAvoidanceType"] = dtCrowdAgentParams.prototype.set_obstacleAvoidanceType = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_obstacleAvoidanceType_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "obstacleAvoidanceType", {
          get: dtCrowdAgentParams.prototype.get_obstacleAvoidanceType,
          set: dtCrowdAgentParams.prototype.set_obstacleAvoidanceType
        });

        dtCrowdAgentParams.prototype["get_queryFilterType"] = dtCrowdAgentParams.prototype.get_queryFilterType = function () {
          var self = this.ptr;
          return _emscripten_bind_dtCrowdAgentParams_get_queryFilterType_0(self);
        };

        dtCrowdAgentParams.prototype["set_queryFilterType"] = dtCrowdAgentParams.prototype.set_queryFilterType = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_queryFilterType_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "queryFilterType", {
          get: dtCrowdAgentParams.prototype.get_queryFilterType,
          set: dtCrowdAgentParams.prototype.set_queryFilterType
        });

        dtCrowdAgentParams.prototype["get_userData"] = dtCrowdAgentParams.prototype.get_userData = function () {
          var self = this.ptr;
          return wrapPointer(_emscripten_bind_dtCrowdAgentParams_get_userData_0(self), VoidPtr);
        };

        dtCrowdAgentParams.prototype["set_userData"] = dtCrowdAgentParams.prototype.set_userData = function (arg0) {
          var self = this.ptr;

          if (arg0 && typeof arg0 === "object") {
            arg0 = arg0.ptr;
          }

          _emscripten_bind_dtCrowdAgentParams_set_userData_1(self, arg0);
        };

        Object.defineProperty(dtCrowdAgentParams.prototype, "userData", {
          get: dtCrowdAgentParams.prototype.get_userData,
          set: dtCrowdAgentParams.prototype.set_userData
        });

        dtCrowdAgentParams.prototype["__destroy__"] = dtCrowdAgentParams.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_dtCrowdAgentParams___destroy___0(self);
        };

        function VoidPtr() {
          throw "cannot construct a VoidPtr, no constructor in IDL";
        }

        VoidPtr.prototype = Object.create(WrapperObject.prototype);
        VoidPtr.prototype.constructor = VoidPtr;
        VoidPtr.prototype.__class__ = VoidPtr;
        VoidPtr.__cache__ = {};
        Module["VoidPtr"] = VoidPtr;

        VoidPtr.prototype["__destroy__"] = VoidPtr.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_VoidPtr___destroy___0(self);
        };

        function dtNavMesh() {
          throw "cannot construct a dtNavMesh, no constructor in IDL";
        }

        dtNavMesh.prototype = Object.create(WrapperObject.prototype);
        dtNavMesh.prototype.constructor = dtNavMesh;
        dtNavMesh.prototype.__class__ = dtNavMesh;
        dtNavMesh.__cache__ = {};
        Module["dtNavMesh"] = dtNavMesh;

        dtNavMesh.prototype["__destroy__"] = dtNavMesh.prototype.__destroy__ = function () {
          var self = this.ptr;

          _emscripten_bind_dtNavMesh___destroy___0(self);
        };

        (function () {
          function setupEnums() {}

          if (runtimeInitialized) {
            setupEnums();
          } else {
            addOnPreMain(setupEnums);
          }
        })();

        this["Recast"] = Module;
        return Recast;
      };
    }();

    if (typeof exports === "object" && typeof module === "object") {
      module.exports = Recast;
    } else {
      if (typeof define === "function" && define["amd"]) {
        define([], function () {
          return Recast;
        });
      } else {
        if (typeof exports === "object") {
          exports["Recast"] = Recast;
        }
      }
    }

    ;
  }).call(root);
})( // The environment-specific global.
function () {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof this !== 'undefined') return this;
  return {};
}.call(this));