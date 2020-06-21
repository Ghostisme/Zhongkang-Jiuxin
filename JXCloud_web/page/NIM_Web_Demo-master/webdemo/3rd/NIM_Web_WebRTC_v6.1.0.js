! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.WebRTC = t() : e.WebRTC = t()
}(window, function() {
	return function(e) {
		var t = {};

		function n(r) {
			if(t[r]) return t[r].exports;
			var i = t[r] = {
				i: r,
				l: !1,
				exports: {}
			};
			return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
		}
		return n.m = e, n.c = t, n.d = function(e, t, r) {
			n.o(e, t) || Object.defineProperty(e, t, {
				configurable: !1,
				enumerable: !0,
				get: r
			})
		}, n.r = function(e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, n.n = function(e) {
			var t = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return n.d(t, "a", t), t
		}, n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "", n(n.s = 477)
	}([function(e, t, n) {
		"use strict";
		var r, i = n(9),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		var o = n(73),
			s = n(67);
		n(91);
		var c, d, u = n(11),
			l = u.getGlobal(),
			p = /\s+/;
		u.deduplicate = function(e) {
			var t = [];
			return e.forEach(function(e) {
				-1 === t.indexOf(e) && t.push(e)
			}), t
		}, u.capFirstLetter = function(e) {
			return e ? (e = "" + e).slice(0, 1).toUpperCase() + e.slice(1) : ""
		}, u.guid = (c = function() {
			return(65536 * (1 + Math.random()) | 0).toString(16).substring(1)
		}, function() {
			return c() + c() + c() + c() + c() + c() + c() + c()
		}), u.extend = function(e, t, n) {
			for(var r in t) void 0 !== e[r] && !0 !== n || (e[r] = t[r])
		}, u.filterObj = function(e, t) {
			var n = {};
			return u.isString(t) && (t = t.split(p)), t.forEach(function(t) {
				e.hasOwnProperty(t) && (n[t] = e[t])
			}), n
		}, u.copy = function(e, t) {
			return t = t || {}, e ? (Object.keys(e).forEach(function(n) {
				u.exist(e[n]) && (t[n] = e[n])
			}), t) : t
		}, u.copyWithNull = function(e, t) {
			return t = t || {}, e ? (Object.keys(e).forEach(function(n) {
				(u.exist(e[n]) || u.isnull(e[n])) && (t[n] = e[n])
			}), t) : t
		}, u.findObjIndexInArray = function(e, t) {
			e = e || [];
			var n = t.keyPath || "id",
				r = -1;
			return e.some(function(e, i) {
				if(s(e, n) === t.value) return r = i, !0
			}), r
		}, u.findObjInArray = function(e, t) {
			var n = u.findObjIndexInArray(e, t);
			return -1 === n ? null : e[n]
		}, u.mergeObjArray = function() {
			var e = [],
				t = [].slice.call(arguments, 0, -1),
				n = arguments[arguments.length - 1];
			u.isArray(n) && (t.push(n), n = {});
			var r, i = n.keyPath = n.keyPath || "id";
			for(n.sortPath = n.sortPath || i; !e.length && t.length;) e = (e = t.shift() || []).slice(0);
			return t.forEach(function(t) {
				t && t.forEach(function(t) {
					-1 !== (r = u.findObjIndexInArray(e, {
						keyPath: i,
						value: s(t, i)
					})) ? e[r] = u.merge({}, e[r], t) : e.push(t)
				})
			}), n.notSort || (e = u.sortObjArray(e, n)), e
		}, u.cutObjArray = function(e) {
			var t = e.slice(0),
				n = arguments.length,
				r = [].slice.call(arguments, 1, n - 1),
				i = arguments[n - 1];
			u.isObject(i) || (r.push(i), i = {});
			var a, o = i.keyPath = i.keyPath || "id";
			return r.forEach(function(e) {
				u.isArray(e) || (e = [e]), e.forEach(function(e) {
					e && (i.value = s(e, o), -1 !== (a = u.findObjIndexInArray(t, i)) && t.splice(a, 1))
				})
			}), t
		}, u.sortObjArray = function(e, t) {
			var n = (t = t || {}).sortPath || "id";
			o.insensitive = !!t.insensitive;
			var r, i, a, c = !!t.desc;
			return a = u.isFunction(t.compare) ? t.compare : function(e, t) {
				return r = s(e, n), i = s(t, n), c ? o(i, r) : o(r, i)
			}, e.sort(a)
		}, u.emptyFunc = function() {}, u.isEmptyFunc = function(e) {
			return e === u.emptyFunc
		}, u.notEmptyFunc = function(e) {
			return e !== u.emptyFunc
		}, u.splice = function(e, t, n) {
			return [].splice.call(e, t, n)
		}, u.reshape2d = function(e, t) {
			if(Array.isArray(e)) {
				u.verifyParamType("type", t, "number", "util::reshape2d");
				var n = e.length;
				if(n <= t) return [e];
				for(var r = Math.ceil(n / t), i = [], a = 0; a < r; a++) i.push(e.slice(a * t, (a + 1) * t));
				return i
			}
			return e
		}, u.flatten2d = function(e) {
			if(Array.isArray(e)) {
				var t = [];
				return e.forEach(function(e) {
					t = t.concat(e)
				}), t
			}
			return e
		}, u.dropArrayDuplicates = function(e) {
			if(Array.isArray(e)) {
				for(var t = {}, n = []; e.length > 0;) {
					t[e.shift()] = !0
				}
				for(var r in t) !0 === t[r] && n.push(r);
				return n
			}
			return e
		}, u.onError = function(e) {
			throw new function(e) {
				"object" === (void 0 === e ? "undefined" : (0, a.default)(e)) ? (this.callFunc = e.callFunc || null, this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date, this.timetag = +this.time
			}(e)
		}, u.verifyParamPresent = function(e, t, n, r) {
			n = n || "";
			var i = !1;
			switch(u.typeOf(t)) {
				case "undefined":
				case "null":
					i = !0;
					break;
				case "string":
					"" === t && (i = !0);
					break;
				case "StrStrMap":
				case "object":
					Object.keys(t).length || (i = !0);
					break;
				case "array":
					t.length ? t.some(function(e) {
						if(u.notexist(e)) return i = !0, !0
					}) : i = !0
			}
			i && u.onParamAbsent(n + e, r)
		}, u.onParamAbsent = function(e, t) {
			u.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
		}, u.verifyParamAbsent = function(e, t, n, r) {
			n = n || "", void 0 !== t && u.onParamPresent(n + e, r)
		}, u.onParamPresent = function(e, t) {
			u.onParamError("多余的参数 " + e, t)
		}, u.verifyParamType = function(e, t, n, r) {
			var i = u.typeOf(t).toLowerCase();
			u.isArray(n) || (n = [n]);
			var a = !0;
			switch(-1 === (n = n.map(function(e) {
				return e.toLowerCase()
			})).indexOf(i) && (a = !1), i) {
				case "number":
					isNaN(t) && (a = !1);
					break;
				case "string":
					"numeric or numeric string" === n.join("") && (a = !!/^[0-9]+$/.test(t))
			}
			a || u.onParamInvalidType(e, n, "", r)
		}, u.onParamInvalidType = function(e, t, n, r) {
			n = n || "", t = u.isArray(t) ? (t = t.map(function(e) {
				return '"' + e + '"'
			})).join(", ") : '"' + t + '"', u.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]", r)
		}, u.verifyParamValid = function(e, t, n, r) {
			u.isArray(n) || (n = [n]), -1 === n.indexOf(t) && u.onParamInvalidValue(e, n, r)
		}, u.onParamInvalidValue = function(e, t, n) {
			u.isArray(t) || (t = [t]), t = t.map(function(e) {
				return '"' + e + '"'
			}), u.isArray(t) && (t = t.join(", ")), u.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(t) + "]", n)
		}, u.verifyParamMin = function(e, t, n, r) {
			t < n && u.onParamError("参数" + e + "的值不能小于" + n, r)
		}, u.verifyParamMax = function(e, t, n, r) {
			t > n && u.onParamError("参数" + e + "的值不能大于" + n, r)
		}, u.verifyArrayMax = function(e, t, n, r) {
			t.length > n && u.onParamError("参数" + e + "的长度不能大于" + n, r)
		}, u.verifyEmail = (d = /^\S+@\S+$/, function(e, t, n) {
			d.test(t) || u.onParamError("参数" + e + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", n)
		}), u.verifyTel = function() {
			var e = /^[+\-()\d]+$/;
			return function(t, n, r) {
				e.test(n) || u.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", r)
			}
		}(), u.verifyBirth = function() {
			var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
			return function(t, n, r) {
				e.test(n) || u.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', r)
			}
		}(), u.onParamError = function(e, t) {
			u.onError({
				message: e,
				callFunc: t
			})
		}, u.verifyOptions = function(e, t, n, r, i) {
			if(e = e || {}, t && (u.isString(t) && (t = t.split(p)), u.isArray(t))) {
				"boolean" != typeof n && (i = n || null, n = !0, r = "");
				var a = n ? u.verifyParamPresent : u.verifyParamAbsent;
				t.forEach(function(t) {
					a.call(u, t, e[t], r, i)
				})
			}
			return e
		}, u.verifyParamAtLeastPresentOne = function(e, t, n) {
			t && (u.isString(t) && (t = t.split(p)), u.isArray(t) && (t.some(function(t) {
				return u.exist(e[t])
			}) || u.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", n)))
		}, u.verifyParamPresentJustOne = function(e, t, n) {
			t && (u.isString(t) && (t = t.split(p)), u.isArray(t) && 1 !== t.reduce(function(t, n) {
				return u.exist(e[n]) && t++, t
			}, 0) && u.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", n))
		}, u.verifyBooleanWithDefault = function(e, t, n, r, i) {
			u.undef(n) && (n = !0), p.test(t) && (t = t.split(p)), u.isArray(t) ? t.forEach(function(t) {
				u.verifyBooleanWithDefault(e, t, n, r, i)
			}) : void 0 === e[t] ? e[t] = n : u.isBoolean(e[t]) || u.onParamInvalidType(t, "boolean", r, i)
		}, u.verifyFileInput = function(e, t) {
			return u.verifyParamPresent("fileInput", e, "", t), u.isString(e) && ((e = document.getElementById(e)) || u.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() && "file" === e.type.toLowerCase() || u.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" + e.tagName + ", filetype:" + e.type, t), e
		}, u.verifyFileType = function(e, t) {
			u.verifyParamValid("type", e, u.validFileTypes, t)
		}, u.verifyCallback = function(e, t, n) {
			p.test(t) && (t = t.split(p)), u.isArray(t) ? t.forEach(function(t) {
				u.verifyCallback(e, t, n)
			}) : e[t] ? u.isFunction(e[t]) || u.onParamInvalidType(t, "function", "", n) : e[t] = u.emptyFunc
		}, u.verifyFileUploadCallback = function(e, t) {
			u.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
		}, u.validFileTypes = ["image", "audio", "video", "file"], u.validFileExts = {
			image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
			audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
			video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
		}, u.filterFiles = function(e, t) {
			var n, r, i = "file" === (t = t.toLowerCase()),
				a = [];
			return [].forEach.call(e, function(e) {
				if(i) a.push(e);
				else if(n = e.name.slice(e.name.lastIndexOf(".") + 1), (r = e.type.split("/"))[0] && r[1]) {
					(r[0].toLowerCase() === t || -1 !== u.validFileExts[t].indexOf(n)) && a.push(e)
				}
			}), a
		};
		var f, h, m = u.supportFormData = u.notundef(l.FormData);
		u.getFileName = function(e) {
			return e = u.verifyFileInput(e), m ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
		}, u.getFileInfo = (f = {
			ppt: 1,
			pptx: 2,
			pdf: 3
		}, function(e) {
			var t = {};
			if(!(e = u.verifyFileInput(e)).files) return t;
			var n = e.files[0];
			return m && (t.name = n.name, t.size = n.size, t.type = n.name.match(/\.(\w+)$/), t.type = t.type && t.type[1].toLowerCase(), t.transcodeType = f[t.type] || 0), t
		}), u.sizeText = (h = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"], function(e) {
			var t, n = 0;
			do {
				t = (e = Math.floor(100 * e) / 100) + h[n], e /= 1024, n++
			} while (e > 1);
			return t
		}), u.promises2cmds = function(e) {
			return e.map(function(e) {
				return e.cmd
			})
		}, u.objs2accounts = function(e) {
			return e.map(function(e) {
				return e.account
			})
		}, u.teams2ids = function(e) {
			return e.map(function(e) {
				return e.teamId
			})
		}, u.objs2ids = function(e) {
			return e.map(function(e) {
				return e.id
			})
		}, u.getMaxUpdateTime = function(e) {
			var t = e.map(function(e) {
				return +e.updateTime
			});
			return Math.max.apply(Math, t)
		}, u.genCheckUniqueFunc = function(e, t) {
			return e = e || "id", t = t || 1e3,
				function(t) {
					this.uniqueSet = this.uniqueSet || {}, this.uniqueSet[e] = this.uniqueSet[e] || {};
					var n = this.uniqueSet[e],
						r = t[e];
					return !n[r] && (n[r] = !0, !0)
				}
		}, u.fillPropertyWithDefault = function(e, t, n) {
			return !!u.undef(e[t]) && (e[t] = n, !0)
		}, e.exports = u
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0, t.default = function(e, t) {
			if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		}
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r = o(n(165)),
			i = o(n(161)),
			a = o(n(9));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function(e, t) {
			if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, a.default)(t)));
			e.prototype = (0, i.default)(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (r.default ? (0, r.default)(e, t) : e.__proto__ = t)
		}
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r, i = n(9),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = function(e, t) {
			if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return !t || "object" !== (void 0 === t ? "undefined" : (0, a.default)(t)) && "function" != typeof t ? e : t
		}
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r, i = n(122),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = function() {
			function e(e, t) {
				for(var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, a.default)(e, r.key, r)
				}
			}
			return function(t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t
			}
		}()
	}, function(e, t, n) {
		"use strict";
		var r = {
			info: {
				hash: "72a05ab157b45e124943cbce31cd2ae438f8f577",
				shortHash: "72a05ab1",
				version: "6.1.0",
				sdkVersion: "52",
				nrtcVersion: "4.4.0",
				nrtcSdkVersion: "1",
				protocolVersion: 1
			},
			agentVersion: "2.8.0.906",
			lbsUrl: "https://lbs.netease.im/lbs/webconf.jsp",
			roomserver: "roomserver.netease.im",
			connectTimeout: 8e3,
			xhrTimeout: 8e3,
			socketTimeout: 8e3,
			reconnectionDelay: 1600,
			reconnectionDelayMax: 8e3,
			reconnectionJitter: .01,
			reconnectiontimer: null,
			heartbeatInterval: 8e3,
			cmdTimeout: 8e3,
			defaultReportUrl: "https://dr.netease.im/1.gif",
			isWeixinApp: !1,
			isNodejs: !1,
			isRN: !1,
			PUSHTOKEN: "",
			PUSHCONFIG: {},
			CLIENTTYPE: 16,
			PushPermissionAsked: !1,
			iosPushConfig: null,
			androidPushConfig: null,
			netDetectAddr: "https://roomserver-dev.netease.im/v1/sdk/detect/local",
			weixinNetcall: {
				checkSumUrl: "https://nrtc.netease.im/demo/getChecksum.action",
				getChannelInfoUrl: "https://nrtc.netease.im/nrtc/getChannelInfos.action"
			},
			formatSocketUrl: function(e) {
				var t = e.url,
					n = e.secure ? "https" : "http";
				return -1 === t.indexOf("http") ? n + "://" + t : t
			},
			uploadUrl: "https://nos.netease.com",
			replaceUrl: "https://{bucket}-nosdn.netease.im/{object}",
			downloadHost: "nos.netease.com",
			downloadUrl: "https://{bucket}-nosdn.netease.im/{object}",
			httpsEnabled: !1,
			threshold: 0,
			genUploadUrl: function(e) {
				return r.uploadUrl + "/" + e
			},
			genDownloadUrl: function(e, t) {
				var n = e.bucket,
					i = (e.tag, e.expireSec),
					a = +new Date,
					o = i ? "&survivalTime=" + i : "",
					s = r.replaceUrl + "?createTime=" + a + o;
				return /^http/.test(s) ? r.httpsEnabled && (s = s.replace("http", "https")) : s = r.httpsEnabled ? "https://" + s : "http://" + s, s.replace("{bucket}", n).replace("{object}", t)
			}
		};
		e.exports = r
	}, function(e, t, n) {
		var r = n(41)("wks"),
			i = n(28),
			a = n(8).Symbol,
			o = "function" == typeof a;
		(e.exports = function(e) {
			return r[e] || (r[e] = o && a[e] || (o ? a : i)("Symbol." + e))
		}).store = r
	}, function(e, t) {
		var n = e.exports = {
			version: "2.5.5"
		};
		"number" == typeof __e && (__e = n)
	}, function(e, t) {
		var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
		"number" == typeof __g && (__g = n)
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r = o(n(110)),
			i = o(n(100)),
			a = "function" == typeof i.default && "symbol" == typeof r.default ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : typeof e
			};

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = "function" == typeof i.default && "symbol" === a(r.default) ? function(e) {
			return void 0 === e ? "undefined" : a(e)
		} : function(e) {
			return e && "function" == typeof i.default && e.constructor === i.default && e !== i.default.prototype ? "symbol" : void 0 === e ? "undefined" : a(e)
		}
	}, function(e, t, n) {
		"use strict";
		var r = Object.prototype.hasOwnProperty,
			i = "~";

		function a() {}

		function o(e, t, n) {
			this.fn = e, this.context = t, this.once = n || !1
		}

		function s() {
			this._events = new a, this._eventsCount = 0
		}
		Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (i = !1)), s.prototype.eventNames = function() {
			var e, t, n = [];
			if(0 === this._eventsCount) return n;
			for(t in e = this._events) r.call(e, t) && n.push(i ? t.slice(1) : t);
			return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
		}, s.prototype.listeners = function(e, t) {
			var n = i ? i + e : e,
				r = this._events[n];
			if(t) return !!r;
			if(!r) return [];
			if(r.fn) return [r.fn];
			for(var a = 0, o = r.length, s = new Array(o); a < o; a++) s[a] = r[a].fn;
			return s
		}, s.prototype.emit = function(e, t, n, r, a, o) {
			var s = i ? i + e : e;
			if(!this._events[s]) return !1;
			var c, d, u = this._events[s],
				l = arguments.length;
			if(u.fn) {
				switch(u.once && this.removeListener(e, u.fn, void 0, !0), l) {
					case 1:
						return u.fn.call(u.context), !0;
					case 2:
						return u.fn.call(u.context, t), !0;
					case 3:
						return u.fn.call(u.context, t, n), !0;
					case 4:
						return u.fn.call(u.context, t, n, r), !0;
					case 5:
						return u.fn.call(u.context, t, n, r, a), !0;
					case 6:
						return u.fn.call(u.context, t, n, r, a, o), !0
				}
				for(d = 1, c = new Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
				u.fn.apply(u.context, c)
			} else {
				var p, f = u.length;
				for(d = 0; d < f; d++) switch(u[d].once && this.removeListener(e, u[d].fn, void 0, !0), l) {
					case 1:
						u[d].fn.call(u[d].context);
						break;
					case 2:
						u[d].fn.call(u[d].context, t);
						break;
					case 3:
						u[d].fn.call(u[d].context, t, n);
						break;
					case 4:
						u[d].fn.call(u[d].context, t, n, r);
						break;
					default:
						if(!c)
							for(p = 1, c = new Array(l - 1); p < l; p++) c[p - 1] = arguments[p];
						u[d].fn.apply(u[d].context, c)
				}
			}
			return !0
		}, s.prototype.on = function(e, t, n) {
			var r = new o(t, n || this),
				a = i ? i + e : e;
			return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], r] : this._events[a].push(r) : (this._events[a] = r, this._eventsCount++), this
		}, s.prototype.once = function(e, t, n) {
			var r = new o(t, n || this, !0),
				a = i ? i + e : e;
			return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], r] : this._events[a].push(r) : (this._events[a] = r, this._eventsCount++), this
		}, s.prototype.removeListener = function(e, t, n, r) {
			var o = i ? i + e : e;
			if(!this._events[o]) return this;
			if(!t) return 0 == --this._eventsCount ? this._events = new a : delete this._events[o], this;
			var s = this._events[o];
			if(s.fn) s.fn !== t || r && !s.once || n && s.context !== n || (0 == --this._eventsCount ? this._events = new a : delete this._events[o]);
			else {
				for(var c = 0, d = [], u = s.length; c < u; c++)(s[c].fn !== t || r && !s[c].once || n && s[c].context !== n) && d.push(s[c]);
				d.length ? this._events[o] = 1 === d.length ? d[0] : d : 0 == --this._eventsCount ? this._events = new a : delete this._events[o]
			}
			return this
		}, s.prototype.removeAllListeners = function(e) {
			var t;
			return e ? (t = i ? i + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new a : delete this._events[t])) : (this._events = new a, this._eventsCount = 0), this
		}, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function() {
			return this
		}, s.prefixed = i, s.EventEmitter = s, e.exports = s
	}, function(e, t, n) {
		"use strict";
		(function(e) {
			Object.defineProperty(t, "__esModule", {
				value: !0
			}), t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format = t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0;
			var r, i = n(9),
				a = (r = i) && r.__esModule ? r : {
					default: r
				};
			t.getGlobal = o, t.detectCSSFeature = function(e) {
				var t = !1,
					n = "Webkit Moz ms O".split(" "),
					r = document.createElement("div"),
					i = null;
				e = e.toLowerCase(), void 0 !== r.style[e] && (t = !0);
				if(!1 === t) {
					i = e.charAt(0).toUpperCase() + e.substr(1);
					for(var a = 0; a < n.length; a++)
						if(void 0 !== r.style[n[a] + i]) {
							t = !0;
							break
						}
				}
				return t
			}, t.fix = s, t.getYearStr = c, t.getMonthStr = d, t.getDayStr = u, t.getHourStr = l, t.getMinuteStr = p, t.getSecondStr = f, t.getMillisecondStr = h, t.dateFromDateTimeLocal = function(e) {
				return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "))
			}, t.getClass = _, t.typeOf = R, t.isString = g, t.isNumber = function(e) {
				return "number" === R(e)
			}, t.isBoolean = function(e) {
				return "boolean" === R(e)
			}, t.isArray = y, t.isFunction = C, t.isDate = T, t.isRegExp = function(e) {
				return "regexp" === R(e)
			}, t.isError = function(e) {
				return "error" === R(e)
			}, t.isnull = E, t.notnull = b, t.undef = S, t.notundef = O, t.exist = P, t.notexist = k, t.isObject = I, t.isEmpty = function(e) {
				return k(e) || (g(e) || y(e)) && 0 === e.length
			}, t.containsNode = function(e, t) {
				if(e === t) return !0;
				for(; t.parentNode;) {
					if(t.parentNode === e) return !0;
					t = t.parentNode
				}
				return !1
			}, t.calcHeight = function(e) {
				var t = e.parentNode || document.body;
				(e = e.cloneNode(!0)).style.display = "block", e.style.opacity = 0, e.style.height = "auto", t.appendChild(e);
				var n = e.offsetHeight;
				return t.removeChild(e), n
			}, t.remove = function(e) {
				e.parentNode && e.parentNode.removeChild(e)
			}, t.dataset = function(e, t, n) {
				if(!P(n)) return e.getAttribute("data-" + t);
				e.setAttribute("data-" + t, n)
			}, t.target = function(e) {
				return e.target || e.srcElement
			}, t.createIframe = function(e) {
				var t;
				if((e = e || {}).name) try {
					(t = document.createElement('<iframe name="' + e.name + '"></iframe>')).frameBorder = 0
				} catch(n) {
					(t = document.createElement("iframe")).name = e.name
				} else t = document.createElement("iframe");
				e.visible || (t.style.display = "none");
				C(e.onload) && L(t, "load", function n(r) {
					if(!t.src) return;
					e.multi || w(t, "load", n);
					e.onload(r)
				});
				(e.parent || document.body).appendChild(t);
				var n = e.src || "about:blank";
				return setTimeout(function() {
					t.src = n
				}, 0), t
			}, t.html2node = function(e) {
				var t = document.createElement("div");
				t.innerHTML = e;
				var n = [],
					r = void 0,
					i = void 0;
				if(t.children)
					for(r = 0, i = t.children.length; r < i; r++) n.push(t.children[r]);
				else
					for(r = 0, i = t.childNodes.length; r < i; r++) {
						var a = t.childNodes[r];
						1 === a.nodeType && n.push(a)
					}
				return n.length > 1 ? t : n[0]
			}, t.scrollTop = function(e) {
				P(e) && (document.documentElement.scrollTop = document.body.scrollTop = e);
				return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
			}, t.forOwn = M, t.mixin = W, t.isJSON = N, t.parseJSON = function e(t) {
				try {
					N(t) && (t = JSON.parse(t)), I(t) && M(t, function(n, r) {
						switch(R(r)) {
							case "string":
							case "object":
								t[n] = e(r)
						}
					})
				} catch(e) {
					console.log("error:", e)
				}
				return t
			}, t.simpleClone = function(e) {
				var t = [],
					n = JSON.stringify(e, function(e, n) {
						if("object" === (void 0 === n ? "undefined" : (0, a.default)(n)) && null !== n) {
							if(-1 !== t.indexOf(n)) return;
							t.push(n)
						}
						return n
					});
				return JSON.parse(n)
			}, t.merge = function() {
				for(var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
				return n.forEach(function(t) {
					W(e, t)
				}), e
			}, t.fillUndef = function(e, t) {
				return M(t, function(t, n) {
					S(e[t]) && (e[t] = n)
				}), e
			}, t.checkWithDefault = function(e, t, n) {
				var r = e[t] || e[t.toLowerCase()];
				k(r) && (r = n, e[t] = r);
				return r
			}, t.fetch = function(e, t) {
				return M(e, function(n, r) {
					P(t[n]) && (e[n] = t[n])
				}), e
			}, t.string2object = function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
					n = {};
				return e.split(t).forEach(function(e) {
					var t = e.split("="),
						r = t.shift();
					r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join("=")))
				}), n
			}, t.object2string = G, t.genUrlSep = function(e) {
				return e.indexOf("?") < 0 ? "?" : "&"
			}, t.object2query = function(e) {
				return G(e, "&", !0)
			}, t.isFileInput = x, t.getKeys = function(e, t) {
				var n = Object.keys(e);
				t && n.sort(function(t, n) {
					var r = x(e[t]),
						i = x(e[n]);
					return r === i ? 0 : r ? 1 : -1
				});
				return n
			};
			t.o = {}, t.emptyObj = {}, t.f = function() {}, t.emptyFunc = function() {}, t.regBlank = /\s+/gi, t.regWhiteSpace = /\s+/gi;

			function o() {
				return "undefined" != typeof window ? window : void 0 !== e ? e : {}
			}

			function s(e, t) {
				t = t || 2;
				for(var n = "" + e; n.length < t;) n = "0" + n;
				return n
			}

			function c(e) {
				return "" + e.getFullYear()
			}

			function d(e) {
				return s(e.getMonth() + 1)
			}

			function u(e) {
				return s(e.getDate())
			}

			function l(e) {
				return s(e.getHours())
			}

			function p(e) {
				return s(e.getMinutes())
			}

			function f(e) {
				return s(e.getSeconds())
			}

			function h(e) {
				return s(e.getMilliseconds(), 3)
			}
			var m, v;
			t.format = (m = /yyyy|MM|dd|hh|mm|ss|SSS/g, v = {
				yyyy: c,
				MM: d,
				dd: u,
				hh: l,
				mm: p,
				ss: f,
				SSS: h
			}, function(e, t) {
				return e = new Date(e), isNaN(+e) ? "invalid date" : (t = t || "yyyy-MM-dd").replace(m, function(t) {
					return v[t](e)
				})
			});

			function _(e) {
				return Object.prototype.toString.call(e).slice(8, -1)
			}

			function R(e) {
				return _(e).toLowerCase()
			}

			function g(e) {
				return "string" === R(e)
			}

			function y(e) {
				return "array" === R(e)
			}

			function C(e) {
				return "function" === R(e)
			}

			function T(e) {
				return "date" === R(e)
			}

			function E(e) {
				return null === e
			}

			function b(e) {
				return null !== e
			}

			function S(e) {
				return void 0 === e
			}

			function O(e) {
				return void 0 !== e
			}

			function P(e) {
				return O(e) && b(e)
			}

			function k(e) {
				return S(e) || E(e)
			}

			function I(e) {
				return P(e) && "object" === R(e)
			}
			var A = t.addEventListener = function(e, t, n) {
					e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
				},
				L = t.on = A,
				D = t.removeEventListener = function(e, t, n) {
					e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
				},
				w = t.off = D;

			function M() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
					n = arguments[2];
				for(var r in e) e.hasOwnProperty(r) && t.call(n, r, e[r])
			}

			function W(e, t) {
				M(t, function(t, n) {
					e[t] = n
				})
			}
			var B;
			t.uniqueID = (B = 0, function() {
				return "" + B++
			});

			function N(e) {
				return g(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
			}

			function G(e, t, n) {
				if(!e) return "";
				var r = [];
				return M(e, function(e, t) {
					C(t) || (T(t) ? t = t.getTime() : y(t) ? t = t.join(",") : I(t) && (t = JSON.stringify(t)), n && (t = encodeURIComponent(t)), r.push(encodeURIComponent(e) + "=" + t))
				}), r.join(t || ",")
			}
			t.url2origin = function() {
				var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
				return function(t) {
					return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
				}
			}();

			function x(e) {
				var t = o();
				return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
			}
		}).call(this, n(30))
	}, function(e, t, n) {
		var r = n(15),
			i = n(62),
			a = n(43),
			o = Object.defineProperty;
		t.f = n(14) ? Object.defineProperty : function(e, t, n) {
			if(r(e), t = a(t, !0), r(n), i) try {
				return o(e, t, n)
			} catch(e) {}
			if("get" in n || "set" in n) throw TypeError("Accessors not supported!");
			return "value" in n && (e[t] = n.value), e
		}
	}, function(e, t) {
		var n = {}.hasOwnProperty;
		e.exports = function(e, t) {
			return n.call(e, t)
		}
	}, function(e, t, n) {
		e.exports = !n(20)(function() {
			return 7 != Object.defineProperty({}, "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, function(e, t, n) {
		var r = n(18);
		e.exports = function(e) {
			if(!r(e)) throw TypeError(e + " is not an object!");
			return e
		}
	}, function(e, t, n) {
		var r = n(8),
			i = n(7),
			a = n(36),
			o = n(19),
			s = n(13),
			c = function(e, t, n) {
				var d, u, l, p = e & c.F,
					f = e & c.G,
					h = e & c.S,
					m = e & c.P,
					v = e & c.B,
					_ = e & c.W,
					R = f ? i : i[t] || (i[t] = {}),
					g = R.prototype,
					y = f ? r : h ? r[t] : (r[t] || {}).prototype;
				for(d in f && (n = t), n)(u = !p && y && void 0 !== y[d]) && s(R, d) || (l = u ? y[d] : n[d], R[d] = f && "function" != typeof y[d] ? n[d] : v && u ? a(l, r) : _ && y[d] == l ? function(e) {
					var t = function(t, n, r) {
						if(this instanceof e) {
							switch(arguments.length) {
								case 0:
									return new e;
								case 1:
									return new e(t);
								case 2:
									return new e(t, n)
							}
							return new e(t, n, r)
						}
						return e.apply(this, arguments)
					};
					return t.prototype = e.prototype, t
				}(l) : m && "function" == typeof l ? a(Function.call, l) : l, m && ((R.virtual || (R.virtual = {}))[d] = l, e & c.R && g && !g[d] && o(g, d, l)))
			};
		c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
	}, function(e, t, n) {
		var r = n(59),
			i = n(44);
		e.exports = function(e) {
			return r(i(e))
		}
	}, function(e, t) {
		e.exports = function(e) {
			return "object" == typeof e ? null !== e : "function" == typeof e
		}
	}, function(e, t, n) {
		var r = n(12),
			i = n(26);
		e.exports = n(14) ? function(e, t, n) {
			return r.f(e, t, i(1, n))
		} : function(e, t, n) {
			return e[t] = n, e
		}
	}, function(e, t) {
		e.exports = function(e) {
			try {
				return !!e()
			} catch(e) {
				return !0
			}
		}
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			var r, i = n(9),
				a = (r = i) && r.__esModule ? r : {
					default: r
				};
			var o = function() {
				var e = "object" === (void 0 === t ? "undefined" : (0, a.default)(t)) ? t : window,
					n = Math.pow(2, 53) - 1,
					r = /\bOpera/,
					i = Object.prototype,
					o = i.hasOwnProperty,
					s = i.toString;

				function c(e) {
					return(e = String(e)).charAt(0).toUpperCase() + e.slice(1)
				}

				function d(e) {
					return e = h(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : c(e)
				}

				function u(e, t) {
					for(var n in e) o.call(e, n) && t(e[n], n, e)
				}

				function l(e) {
					return null == e ? c(e) : s.call(e).slice(8, -1)
				}

				function p(e) {
					return String(e).replace(/([ -])(?!$)/g, "$1?")
				}

				function f(e, t) {
					var r = null;
					return function(e, t) {
						var r = -1,
							i = e ? e.length : 0;
						if("number" == typeof i && i > -1 && i <= n)
							for(; ++r < i;) t(e[r], r, e);
						else u(e, t)
					}(e, function(n, i) {
						r = t(r, n, i, e)
					}), r
				}

				function h(e) {
					return String(e).replace(/^ +| +$/g, "")
				}
				return function t(n) {
					var i = e,
						o = n && "object" === (void 0 === n ? "undefined" : (0, a.default)(n)) && "String" != l(n);
					o && (i = n, n = null);
					var c = i.navigator || {},
						m = c.userAgent || "";
					n || (n = m);
					var v, _, R, g, y, C = o ? !!c.likeChrome : /\bChrome\b/.test(n) && !/internal|\n/i.test(s.toString()),
						T = o ? "Object" : "ScriptBridgingProxyObject",
						E = o ? "Object" : "Environment",
						b = o && i.java ? "JavaPackage" : l(i.java),
						S = o ? "Object" : "RuntimeObject",
						O = /\bJava/.test(b) && i.java,
						P = O && l(i.environment) == E,
						k = O ? "a" : "α",
						I = O ? "b" : "β",
						A = i.document || {},
						L = i.operamini || i.opera,
						D = r.test(D = o && L ? L["[[Class]]"] : l(L)) ? D : L = null,
						w = n,
						M = [],
						W = null,
						B = n == m,
						N = B && L && "function" == typeof L.version && L.version(),
						G = f([{
							label: "EdgeHTML",
							pattern: "Edge"
						}, "Trident", {
							label: "WebKit",
							pattern: "AppleWebKit"
						}, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function(e, t) {
							return e || RegExp("\\b" + (t.pattern || p(t)) + "\\b", "i").exec(n) && (t.label || t)
						}),
						x = function(e) {
							return f(e, function(e, t) {
								return e || RegExp("\\b" + (t.pattern || p(t)) + "\\b", "i").exec(n) && (t.label || t)
							})
						}(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
							label: "Microsoft Edge",
							pattern: "Edge"
						}, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
							label: "Samsung Internet",
							pattern: "SamsungBrowser"
						}, "SeaMonkey", {
							label: "Silk",
							pattern: "(?:Cloud9|Silk-Accelerated)"
						}, "Sleipnir", "SlimBrowser", {
							label: "SRWare Iron",
							pattern: "Iron"
						}, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
							label: "Opera Mini",
							pattern: "OPiOS"
						}, "Opera", {
							label: "Opera",
							pattern: "OPR"
						}, "Chrome", {
							label: "Chrome Mobile",
							pattern: "(?:CriOS|CrMo)"
						}, {
							label: "Firefox",
							pattern: "(?:Firefox|Minefield)"
						}, {
							label: "Firefox for iOS",
							pattern: "FxiOS"
						}, {
							label: "IE",
							pattern: "IEMobile"
						}, {
							label: "IE",
							pattern: "MSIE"
						}, "Safari"]),
						j = V([{
							label: "BlackBerry",
							pattern: "BB10"
						}, "BlackBerry", {
							label: "Galaxy S",
							pattern: "GT-I9000"
						}, {
							label: "Galaxy S2",
							pattern: "GT-I9100"
						}, {
							label: "Galaxy S3",
							pattern: "GT-I9300"
						}, {
							label: "Galaxy S4",
							pattern: "GT-I9500"
						}, {
							label: "Galaxy S5",
							pattern: "SM-G900"
						}, {
							label: "Galaxy S6",
							pattern: "SM-G920"
						}, {
							label: "Galaxy S6 Edge",
							pattern: "SM-G925"
						}, {
							label: "Galaxy S7",
							pattern: "SM-G930"
						}, {
							label: "Galaxy S7 Edge",
							pattern: "SM-G935"
						}, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
							label: "Kindle Fire",
							pattern: "(?:Cloud9|Silk-Accelerated)"
						}, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
							label: "Wii U",
							pattern: "WiiU"
						}, "Wii", "Xbox One", {
							label: "Xbox 360",
							pattern: "Xbox"
						}, "Xoom"]),
						F = function(e) {
							return f(e, function(e, t, r) {
								return e || (t[j] || t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(j)] || RegExp("\\b" + p(r) + "(?:\\b|\\w*\\d)", "i").exec(n)) && r
							})
						}({
							Apple: {
								iPad: 1,
								iPhone: 1,
								iPod: 1
							},
							Archos: {},
							Amazon: {
								Kindle: 1,
								"Kindle Fire": 1
							},
							Asus: {
								Transformer: 1
							},
							"Barnes & Noble": {
								Nook: 1
							},
							BlackBerry: {
								PlayBook: 1
							},
							Google: {
								"Google TV": 1,
								Nexus: 1
							},
							HP: {
								TouchPad: 1
							},
							HTC: {},
							LG: {},
							Microsoft: {
								Xbox: 1,
								"Xbox One": 1
							},
							Motorola: {
								Xoom: 1
							},
							Nintendo: {
								"Wii U": 1,
								Wii: 1
							},
							Nokia: {
								Lumia: 1
							},
							Samsung: {
								"Galaxy S": 1,
								"Galaxy S2": 1,
								"Galaxy S3": 1,
								"Galaxy S4": 1
							},
							Sony: {
								PlayStation: 1,
								"PlayStation Vita": 1
							}
						}),
						U = function(e) {
							return f(e, function(e, t) {
								var r = t.pattern || p(t);
								return !e && (e = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(n)) && (e = function(e, t, n) {
									var r = {
										"10.0": "10",
										6.4: "10 Technical Preview",
										6.3: "8.1",
										6.2: "8",
										6.1: "Server 2008 R2 / 7",
										"6.0": "Server 2008 / Vista",
										5.2: "Server 2003 / XP 64-bit",
										5.1: "XP",
										5.01: "2000 SP1",
										"5.0": "2000",
										"4.0": "NT",
										"4.90": "ME"
									};
									return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = d(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
								}(e, r, t.label || t)), e
							})
						}(["Windows Phone", "Android", "CentOS", {
							label: "Chrome OS",
							pattern: "CrOS"
						}, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);

					function V(e) {
						return f(e, function(e, t) {
							var r = t.pattern || p(t);
							return !e && (e = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(n) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(n) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(n)) && ((e = String(t.label && !RegExp(r, "i").test(t.label) ? t.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) && (e[0] += " " + e[1]), t = t.label || t, e = d(e[0].replace(RegExp(r, "i"), t).replace(RegExp("; *(?:" + t + "[_-])?", "i"), " ").replace(RegExp("(" + t + ")[-_.]?(\\w)", "i"), "$1 $2"))), e
						})
					}
					if(G && (G = [G]), F && !j && (j = V([F])), (v = /\bGoogle TV\b/.exec(j)) && (j = v[0]), /\bSimulator\b/i.test(n) && (j = (j ? j + " " : "") + "Simulator"), "Opera Mini" == x && /\bOPiOS\b/.test(n) && M.push("running in Turbo/Uncompressed mode"), "IE" == x && /\blike iPhone OS\b/.test(n) ? (F = (v = t(n.replace(/like iPhone OS/, ""))).manufacturer, j = v.product) : /^iP/.test(j) ? (x || (x = "Safari"), U = "iOS" + ((v = / OS ([\d_]+)/i.exec(n)) ? " " + v[1].replace(/_/g, ".") : "")) : "Konqueror" != x || /buntu/i.test(U) ? F && "Google" != F && (/Chrome/.test(x) && !/\bMobile Safari\b/i.test(n) || /\bVita\b/.test(j)) || /\bAndroid\b/.test(U) && /^Chrome/.test(x) && /\bVersion\//i.test(n) ? (x = "Android Browser", U = /\bAndroid\b/.test(U) ? U : "Android") : "Silk" == x ? (/\bMobi/i.test(n) || (U = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(n) && M.unshift("accelerated")) : "PaleMoon" == x && (v = /\bFirefox\/([\d.]+)\b/.exec(n)) ? M.push("identifying as Firefox " + v[1]) : "Firefox" == x && (v = /\b(Mobile|Tablet|TV)\b/i.exec(n)) ? (U || (U = "Firefox OS"), j || (j = v[1])) : !x || (v = !/\bMinefield\b/i.test(n) && /\b(?:Firefox|Safari)\b/.exec(x)) ? (x && !j && /[\/,]|^[^(]+?\)/.test(n.slice(n.indexOf(v + "/") + 8)) && (x = null), (v = j || F || U) && (j || F || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(U)) && (x = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(U) ? U : v) + " Browser")) : "Electron" == x && (v = (/\bChrome\/([\d.]+)\b/.exec(n) || 0)[1]) && M.push("Chromium " + v) : U = "Kubuntu", N || (N = f(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", p(x), "(?:Firefox|Minefield|NetFront)"], function(e, t) {
							return e || (RegExp(t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(n) || 0)[1] || null
						})), (v = ("iCab" == G && parseFloat(N) > 3 ? "WebKit" : /\bOpera\b/.test(x) && (/\bOPR\b/.test(n) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(n) && !/^(?:Trident|EdgeHTML)$/.test(G) && "WebKit" || !G && /\bMSIE\b/i.test(n) && ("Mac OS" == U ? "Tasman" : "Trident") || "WebKit" == G && /\bPlayStation\b(?! Vita\b)/i.test(x) && "NetFront") && (G = [v]), "IE" == x && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(n) || 0)[1]) ? (x += " Mobile", U = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(n) ? (x = "IE Mobile", U = "Windows Phone 8.x", M.unshift("desktop mode"), N || (N = (/\brv:([\d.]+)/.exec(n) || 0)[1])) : "IE" != x && "Trident" == G && (v = /\brv:([\d.]+)/.exec(n)) && (x && M.push("identifying as " + x + (N ? " " + N : "")), x = "IE", N = v[1]), B) {
						if(g = "global", y = null != (R = i) ? (0, a.default)(R[g]) : "number", /^(?:boolean|number|string|undefined)$/.test(y) || "object" == y && !R[g]) l(v = i.runtime) == T ? (x = "Adobe AIR", U = v.flash.system.Capabilities.os) : l(v = i.phantom) == S ? (x = "PhantomJS", N = (v = v.version || null) && v.major + "." + v.minor + "." + v.patch) : "number" == typeof A.documentMode && (v = /\bTrident\/(\d+)/i.exec(n)) ? (N = [N, A.documentMode], (v = +v[1] + 4) != N[1] && (M.push("IE " + N[1] + " mode"), G && (G[1] = ""), N[1] = v), N = "IE" == x ? String(N[1].toFixed(1)) : N[0]) : "number" == typeof A.documentMode && /^(?:Chrome|Firefox)\b/.test(x) && (M.push("masking as " + x + " " + N), x = "IE", N = "11.0", G = ["Trident"], U = "Windows");
						else if(O && (w = (v = O.lang.System).getProperty("os.arch"), U = U || v.getProperty("os.name") + " " + v.getProperty("os.version")), P) {
							try {
								N = i.require("ringo/engine").version.join("."), x = "RingoJS"
							} catch(e) {
								(v = i.system) && v.global.system == i.system && (x = "Narwhal", U || (U = v[0].os || null))
							}
							x || (x = "Rhino")
						} else "object" === (0, a.default)(i.process) && !i.process.browser && (v = i.process) && ("object" === (0, a.default)(v.versions) && ("string" == typeof v.versions.electron ? (M.push("Node " + v.versions.node), x = "Electron", N = v.versions.electron) : "string" == typeof v.versions.nw && (M.push("Chromium " + N, "Node " + v.versions.node), x = "NW.js", N = v.versions.nw)), x || (x = "Node.js", w = v.arch, U = v.platform, N = (N = /[\d.]+/.exec(v.version)) ? N[0] : null));
						U = U && d(U)
					}
					if(N && (v = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(N) || /(?:alpha|beta)(?: ?\d)?/i.exec(n + ";" + (B && c.appMinorVersion)) || /\bMinefield\b/i.test(n) && "a") && (W = /b/i.test(v) ? "beta" : "alpha", N = N.replace(RegExp(v + "\\+?$"), "") + ("beta" == W ? I : k) + (/\d+\+?/.exec(v) || "")), "Fennec" == x || "Firefox" == x && /\b(?:Android|Firefox OS)\b/.test(U)) x = "Firefox Mobile";
					else if("Maxthon" == x && N) N = N.replace(/\.[\d.]+/, ".x");
					else if(/\bXbox\b/i.test(j)) "Xbox 360" == j && (U = null), "Xbox 360" == j && /\bIEMobile\b/.test(n) && M.unshift("mobile mode");
					else if(!/^(?:Chrome|IE|Opera)$/.test(x) && (!x || j || /Browser|Mobi/.test(x)) || "Windows CE" != U && !/Mobi/i.test(n))
						if("IE" == x && B) try {
							null === i.external && M.unshift("platform preview")
						} catch(e) {
							M.unshift("embedded")
						} else(/\bBlackBerry\b/.test(j) || /\bBB10\b/.test(n)) && (v = (RegExp(j.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(n) || 0)[1] || N) ? (U = ((v = [v, /BB10/.test(n)])[1] ? (j = null, F = "BlackBerry") : "Device Software") + " " + v[0], N = null) : this != u && "Wii" != j && (B && L || /Opera/.test(x) && /\b(?:MSIE|Firefox)\b/i.test(n) || "Firefox" == x && /\bOS X (?:\d+\.){2,}/.test(U) || "IE" == x && (U && !/^Win/.test(U) && N > 5.5 || /\bWindows XP\b/.test(U) && N > 8 || 8 == N && !/\bTrident\b/.test(n))) && !r.test(v = t.call(u, n.replace(r, "") + ";")) && v.name && (v = "ing as " + v.name + ((v = v.version) ? " " + v : ""), r.test(x) ? (/\bIE\b/.test(v) && "Mac OS" == U && (U = null), v = "identify" + v) : (v = "mask" + v, x = D ? d(D.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(v) && (U = null), B || (N = null)), G = ["Presto"], M.push(v));
						else x += " Mobile";
					(v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(n) || 0)[1]) && (v = [parseFloat(v.replace(/\.(\d)$/, ".0$1")), v], "Safari" == x && "+" == v[1].slice(-1) ? (x = "WebKit Nightly", W = "alpha", N = v[1].slice(0, -1)) : N != v[1] && N != (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(n) || 0)[1]) || (N = null), v[1] = (/\bChrome\/([\d.]+)/i.exec(n) || 0)[1], 537.36 == v[0] && 537.36 == v[2] && parseFloat(v[1]) >= 28 && "WebKit" == G && (G = ["Blink"]), B && (C || v[1]) ? (G && (G[1] = "like Chrome"), v = v[1] || ((v = v[0]) < 530 ? 1 : v < 532 ? 2 : v < 532.05 ? 3 : v < 533 ? 4 : v < 534.03 ? 5 : v < 534.07 ? 6 : v < 534.1 ? 7 : v < 534.13 ? 8 : v < 534.16 ? 9 : v < 534.24 ? 10 : v < 534.3 ? 11 : v < 535.01 ? 12 : v < 535.02 ? "13+" : v < 535.07 ? 15 : v < 535.11 ? 16 : v < 535.19 ? 17 : v < 536.05 ? 18 : v < 536.1 ? 19 : v < 537.01 ? 20 : v < 537.11 ? "21+" : v < 537.13 ? 23 : v < 537.18 ? 24 : v < 537.24 ? 25 : v < 537.36 ? 26 : "Blink" != G ? "27" : "28")) : (G && (G[1] = "like Safari"), v = (v = v[0]) < 400 ? 1 : v < 500 ? 2 : v < 526 ? 3 : v < 533 ? 4 : v < 534 ? "4+" : v < 535 ? 5 : v < 537 ? 6 : v < 538 ? 7 : v < 601 ? 8 : "8"), G && (G[1] += " " + (v += "number" == typeof v ? ".x" : /[.+]/.test(v) ? "" : "+")), "Safari" == x && (!N || parseInt(N) > 45) && (N = v)), "Opera" == x && (v = /\bzbov|zvav$/.exec(U)) ? (x += " ", M.unshift("desktop mode"), "zvav" == v ? (x += "Mini", N = null) : x += "Mobile", U = U.replace(RegExp(" *" + v + "$"), "")) : "Safari" == x && /\bChrome\b/.exec(G && G[1]) && (M.unshift("desktop mode"), x = "Chrome Mobile", N = null, /\bOS X\b/.test(U) ? (F = "Apple", U = "iOS 4.3+") : U = null), N && 0 == N.indexOf(v = /[\d.]+$/.exec(U)) && n.indexOf("/" + v + "-") > -1 && (U = h(U.replace(v, ""))), G && !/\b(?:Avant|Nook)\b/.test(x) && (/Browser|Lunascape|Maxthon/.test(x) || "Safari" != x && /^iOS/.test(U) && /\bSafari\b/.test(G[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(x) && G[1]) && (v = G[G.length - 1]) && M.push(v), M.length && (M = ["(" + M.join("; ") + ")"]), F && j && j.indexOf(F) < 0 && M.push("on " + F), j && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + j), U && (v = / ([\d.+]+)$/.exec(U), _ = v && "/" == U.charAt(U.length - v[0].length - 1), U = {
						architecture: 32,
						family: v && !_ ? U.replace(v[0], "") : U,
						version: v ? v[1] : null,
						toString: function() {
							var e = this.version;
							return this.family + (e && !_ ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
						}
					}), (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(w)) && !/\bi686\b/i.test(w) ? (U && (U.architecture = 64, U.family = U.family.replace(RegExp(" *" + v), "")), x && (/\bWOW64\b/i.test(n) || B && /\w(?:86|32)$/.test(c.cpuClass || c.platform) && !/\bWin64; x64\b/i.test(n)) && M.unshift("32-bit")) : U && /^OS X/.test(U.family) && "Chrome" == x && parseFloat(N) >= 39 && (U.architecture = 64), n || (n = null);
					var H = {};
					return H.description = n, H.layout = G && G[0], H.manufacturer = F, H.name = x, H.prerelease = W, H.product = j, H.ua = n, H.version = x && N, H.os = U || {
						architecture: null,
						family: null,
						version: null,
						toString: function() {
							return "null"
						}
					}, H.parse = t, H.toString = function() {
						return this.description || ""
					}, H.version && M.unshift(N), H.name && M.unshift(x), U && x && (U != String(U).split(" ")[0] || U != x.split(" ")[0] && !j) && M.push(j ? "(" + U + ")" : "on " + U), M.length && (H.description = M.join(" ")), H
				}()
			}();
			e.exports = o
		}).call(this, n(30))
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(379);
		Object.defineProperty(t, "RTC_EVENTS", {
			enumerable: !0,
			get: function() {
				return r.RTC_EVENTS
			}
		}), Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return r.BeCallingEvent
			}
		}), Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return r.CallResponseEvent
			}
		}), Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return r.CallerAckSyncEvent
			}
		}), Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return r.HangupEvent
			}
		}), Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return r.ControlEvent
			}
		}), Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return r.JoinChannelEvent
			}
		}), Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return r.RemoteTrackEvent
			}
		}), Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return r.LeaveChannelEvent
			}
		});
		var i = n(368);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return i.PushConfig
			}
		}), Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig
			}
		}), Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4P2P
			}
		}), Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4Meeting
			}
		}), Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig4Live
			}
		}), Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return i.NetcallOption
			}
		}), Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		}), Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return i.NRTCOption
			}
		}), Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return i.CallRequestParam
			}
		}), Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ResponseRequestParam
			}
		}), Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ControlRequestParam
			}
		}), Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return i.CreateChannelRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelRequestParam
			}
		}), Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoScaleRequestParam
			}
		}), Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return i.StartDeviceRequestParam
			}
		}), Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return i.StartRemoteStreamRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoViewSizeRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return i.SetVideoViewRemoteSizeRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelRequestParam4NRTC
			}
		}), Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return i.validateVideoQuality
			}
		}), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return i.validateVideoFrameRate
			}
		}), Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return i.CONTROL_TYPE
			}
		}), Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return i.CONFIG_MAP
			}
		}), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DECTECT_RESULT_TYPE
			}
		}), Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DECTECT_TYPE
			}
		}), Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return i.DEVICE_TYPE
			}
		}), Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return i.NETCALL_TYPE
			}
		}), Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return i.SCALE_TYPE
			}
		}), Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return i.SPLIT_MODE
			}
		}), Object.defineProperty(t, "MIX_VIDEO_MODE", {
			enumerable: !0,
			get: function() {
				return i.MIX_VIDEO_MODE
			}
		}), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_ENCODE_MODE
			}
		}), Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return i.ROLE_FOR_MEETING
			}
		}), Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return i.HANGUP_TYPE
			}
		}), Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return i.SESSION_MODE
			}
		}), Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NRTC_OPTION
			}
		}), Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return i.GATE_WAY_RESPONSE_CODE
			}
		});
		var a = n(318);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_JOIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_LOGIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_ERROR_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.CLIENT_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.ICE_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.ICE_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.LOGIN_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.SDP_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return a.WEBRTC_GATE_WAY_API
			}
		})
	}, function(e, t) {
		e.exports = {}
	}, , , function(e, t) {
		e.exports = function(e, t) {
			return {
				enumerable: !(1 & e),
				configurable: !(2 & e),
				writable: !(4 & e),
				value: t
			}
		}
	}, function(e, t) {
		t.f = {}.propertyIsEnumerable
	}, function(e, t) {
		var n = 0,
			r = Math.random();
		e.exports = function(e) {
			return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
		}
	}, function(e, t, n) {
		var r = n(60),
			i = n(40);
		e.exports = Object.keys || function(e) {
			return r(e, i)
		}
	}, function(e, t) {
		var n;
		n = function() {
			return this
		}();
		try {
			n = n || Function("return this")() || (0, eval)("this")
		} catch(e) {
			"object" == typeof window && (n = window)
		}
		e.exports = n
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(222);
		Object.defineProperty(t, "element", {
			enumerable: !0,
			get: function() {
				return r.element
			}
		});
		var i = n(221);
		Object.defineProperty(t, "ajax", {
			enumerable: !0,
			get: function() {
				return i.ajax
			}
		});
		var a = n(220);
		Object.defineProperty(t, "tool", {
			enumerable: !0,
			get: function() {
				return a.tool
			}
		});
		var o = n(115);
		Object.defineProperty(t, "ApiInvokeData", {
			enumerable: !0,
			get: function() {
				return o.ApiInvokeData
			}
		}), Object.defineProperty(t, "DataRtc", {
			enumerable: !0,
			get: function() {
				return o.DataRtc
			}
		}), Object.defineProperty(t, "DataStats", {
			enumerable: !0,
			get: function() {
				return o.DataStats
			}
		});
		var s = n(215);
		Object.defineProperty(t, "Device", {
			enumerable: !0,
			get: function() {
				return s.Device
			}
		}), Object.defineProperty(t, "MDevices", {
			enumerable: !0,
			get: function() {
				return s.MDevices
			}
		}), Object.defineProperty(t, "Recorder", {
			enumerable: !0,
			get: function() {
				return s.Recorder
			}
		}), Object.defineProperty(t, "MStream", {
			enumerable: !0,
			get: function() {
				return s.MStream
			}
		});
		var c = n(78);
		Object.defineProperty(t, "RtcUtil", {
			enumerable: !0,
			get: function() {
				return c.RtcUtil
			}
		}), Object.defineProperty(t, "SdpUtil", {
			enumerable: !0,
			get: function() {
				return c.SdpUtil
			}
		}), Object.defineProperty(t, "RtcStats", {
			enumerable: !0,
			get: function() {
				return c.RtcStats
			}
		}), Object.defineProperty(t, "RtcStatsNew", {
			enumerable: !0,
			get: function() {
				return c.RtcStatsNew
			}
		}), Object.defineProperty(t, "RtcSupport", {
			enumerable: !0,
			get: function() {
				return c.RtcSupport
			}
		});
		var d = n(127);
		Object.defineProperty(t, "WebAudio", {
			enumerable: !0,
			get: function() {
				return d.WebAudio
			}
		})
	}, , function(e, t) {
		var n = {}.toString;
		e.exports = function(e) {
			return n.call(e).slice(8, -1)
		}
	}, function(e, t, n) {
		var r = n(12).f,
			i = n(13),
			a = n(6)("toStringTag");
		e.exports = function(e, t, n) {
			e && !i(e = n ? e : e.prototype, a) && r(e, a, {
				configurable: !0,
				value: t
			})
		}
	}, function(e, t) {
		e.exports = !0
	}, function(e, t, n) {
		var r = n(55);
		e.exports = function(e, t, n) {
			if(r(e), void 0 === t) return e;
			switch(n) {
				case 1:
					return function(n) {
						return e.call(t, n)
					};
				case 2:
					return function(n, r) {
						return e.call(t, n, r)
					};
				case 3:
					return function(n, r, i) {
						return e.call(t, n, r, i)
					}
			}
			return function() {
				return e.apply(t, arguments)
			}
		}
	}, function(e, t) {
		t.f = Object.getOwnPropertySymbols
	}, function(e, t, n) {
		var r = n(8),
			i = n(7),
			a = n(35),
			o = n(39),
			s = n(12).f;
		e.exports = function(e) {
			var t = i.Symbol || (i.Symbol = a ? {} : r.Symbol || {});
			"_" == e.charAt(0) || e in t || s(t, e, {
				value: o.f(e)
			})
		}
	}, function(e, t, n) {
		t.f = n(6)
	}, function(e, t) {
		e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
	}, function(e, t, n) {
		var r = n(8),
			i = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
		e.exports = function(e) {
			return i[e] || (i[e] = {})
		}
	}, function(e, t, n) {
		var r = n(41)("keys"),
			i = n(28);
		e.exports = function(e) {
			return r[e] || (r[e] = i(e))
		}
	}, function(e, t, n) {
		var r = n(18);
		e.exports = function(e, t) {
			if(!r(e)) return e;
			var n, i;
			if(t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
			if("function" == typeof(n = e.valueOf) && !r(i = n.call(e))) return i;
			if(!t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
			throw TypeError("Can't convert object to primitive value")
		}
	}, function(e, t) {
		e.exports = function(e) {
			if(null == e) throw TypeError("Can't call method on  " + e);
			return e
		}
	}, function(e, t) {
		var n = Math.ceil,
			r = Math.floor;
		e.exports = function(e) {
			return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
		}
	}, , function(e, t, n) {
		var r = n(44);
		e.exports = function(e) {
			return Object(r(e))
		}
	}, function(e, t, n) {
		var r = n(15),
			i = n(106),
			a = n(40),
			o = n(42)("IE_PROTO"),
			s = function() {},
			c = function() {
				var e, t = n(52)("iframe"),
					r = a.length;
				for(t.style.display = "none", n(76).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;) delete c.prototype[a[r]];
				return c()
			};
		e.exports = Object.create || function(e, t) {
			var n;
			return null !== e ? (s.prototype = r(e), n = new s, s.prototype = null, n[o] = e) : n = c(), void 0 === t ? n : i(n, t)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(108)(!0);
		n(63)(String, "String", function(e) {
			this._t = String(e), this._i = 0
		}, function() {
			var e, t = this._t,
				n = this._i;
			return n >= t.length ? {
				value: void 0,
				done: !0
			} : (e = r(t, n), this._i += e.length, {
				value: e,
				done: !1
			})
		})
	}, , function(e, t, n) {
		"use strict";
		var r = n(66),
			i = n(136),
			a = n(135);
		r.json = i, r.upload = a, e.exports = r
	}, function(e, t, n) {
		var r = n(18),
			i = n(8).document,
			a = r(i) && r(i.createElement);
		e.exports = function(e) {
			return a ? i.createElement(e) : {}
		}
	}, , function(e, t, n) {
		n(103);
		for(var r = n(8), i = n(19), a = n(23), o = n(6)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
			var d = s[c],
				u = r[d],
				l = u && u.prototype;
			l && !l[o] && i(l, o, d), a[d] = a.Array
		}
	}, function(e, t) {
		e.exports = function(e) {
			if("function" != typeof e) throw TypeError(e + " is not a function!");
			return e
		}
	}, , function(e, t, n) {
		var r = n(27),
			i = n(26),
			a = n(17),
			o = n(43),
			s = n(13),
			c = n(62),
			d = Object.getOwnPropertyDescriptor;
		t.f = n(14) ? d : function(e, t) {
			if(e = a(e), t = o(t, !0), c) try {
				return d(e, t)
			} catch(e) {}
			if(s(e, t)) return i(!r.f.call(e, t), e[t])
		}
	}, function(e, t, n) {
		var r = n(60),
			i = n(40).concat("length", "prototype");
		t.f = Object.getOwnPropertyNames || function(e) {
			return r(e, i)
		}
	}, function(e, t, n) {
		var r = n(33);
		e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
			return "String" == r(e) ? e.split("") : Object(e)
		}
	}, function(e, t, n) {
		var r = n(13),
			i = n(17),
			a = n(105)(!1),
			o = n(42)("IE_PROTO");
		e.exports = function(e, t) {
			var n, s = i(e),
				c = 0,
				d = [];
			for(n in s) n != o && r(s, n) && d.push(n);
			for(; t.length > c;) r(s, n = t[c++]) && (~a(d, n) || d.push(n));
			return d
		}
	}, function(e, t, n) {
		e.exports = n(19)
	}, function(e, t, n) {
		e.exports = !n(14) && !n(20)(function() {
			return 7 != Object.defineProperty(n(52)("div"), "a", {
				get: function() {
					return 7
				}
			}).a
		})
	}, function(e, t, n) {
		"use strict";
		var r = n(35),
			i = n(16),
			a = n(61),
			o = n(19),
			s = n(23),
			c = n(107),
			d = n(34),
			u = n(75),
			l = n(6)("iterator"),
			p = !([].keys && "next" in [].keys()),
			f = function() {
				return this
			};
		e.exports = function(e, t, n, h, m, v, _) {
			c(n, t, h);
			var R, g, y, C = function(e) {
					if(!p && e in S) return S[e];
					switch(e) {
						case "keys":
						case "values":
							return function() {
								return new n(this, e)
							}
					}
					return function() {
						return new n(this, e)
					}
				},
				T = t + " Iterator",
				E = "values" == m,
				b = !1,
				S = e.prototype,
				O = S[l] || S["@@iterator"] || m && S[m],
				P = O || C(m),
				k = m ? E ? C("entries") : P : void 0,
				I = "Array" == t && S.entries || O;
			if(I && (y = u(I.call(new e))) !== Object.prototype && y.next && (d(y, T, !0), r || "function" == typeof y[l] || o(y, l, f)), E && O && "values" !== O.name && (b = !0, P = function() {
					return O.call(this)
				}), r && !_ || !p && !b && S[l] || o(S, l, P), s[t] = P, s[T] = f, m)
				if(R = {
						values: E ? P : C("values"),
						keys: v ? P : C("keys"),
						entries: k
					}, _)
					for(g in R) g in S || a(S, g, R[g]);
				else i(i.P + i.F * (p || b), t, R);
			return R
		}
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r, i = n(89),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = a.default || function(e) {
			for(var t = 1; t < arguments.length; t++) {
				var n = arguments[t];
				for(var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
			}
			return e
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = r.f,
			a = n(139);

		function o(e) {
			e.onload && this.once("load", e.onload), e.onerror && this.once("error", e.onerror), e.onbeforesend && this.once("beforesend", e.onbeforesend), e.onaftersend && this.once("aftersend", e.onaftersend);
			var t = (e = this.options = r.fetch({
				method: "GET",
				url: "",
				sync: !1,
				data: null,
				headers: {},
				cookie: !1,
				timeout: 6e4,
				type: "text",
				form: null,
				input: null,
				putFileAtEnd: !1,
				proxyUrl: ""
			}, e)).headers;
			r.notexist(t["Content-Type"]) && (t["Content-Type"] = "application/x-www-form-urlencoded"), this.send()
		}
		var s = o.prototype = Object.create(a.prototype);
		s.send = function() {
			var e = this,
				t = e.options;
			setTimeout(function() {
				try {
					try {
						e.emit("beforesend", t)
					} catch(e) {
						console.log("error:", "ignore error ajax beforesend,", e)
					}
					e.doSend()
				} catch(t) {
					console.log("error:", "ignore error server error,", t), e.onError("serverError", "请求失败:" + t.message)
				}
			}, 0)
		}, s.doSend = i, s.afterSend = function() {
			var e = this;
			setTimeout(function() {
				e.emit("aftersend", e.options)
			}, 0)
		}, s.onLoad = function(e) {
			var t = this.options,
				n = e.status,
				r = e.result;
			if(0 === ("" + n).indexOf("2")) {
				if("json" === t.type) try {
					r = JSON.parse(r)
				} catch(e) {
					return console.log("error:", "ignore error parse json,", e), void this.onError("parseError", r)
				}
				this.emit("load", r)
			} else this.onError("serverError", "服务器返回异常状态", {
				status: n,
				result: r
			})
		}, s.onError = function(e, t, n) {
			var i = r.isObject(n) ? n : {};
			i.code = e || "error", i.message = t || "发生错误", this.emit("error", i)
		}, s.onTimeout = function() {
			this.onError("timeout", "请求超时")
		}, s.abort = function() {
			this.onError("abort", "客户端中止")
		}, s.header = function(e) {
			var t = this;
			if(!r.isArray(e)) return t.getResponseHeader(e || "");
			var n = {};
			return e.forEach(function(e) {
				n[e] = t.header(e)
			}), n
		}, s.getResponseHeader = i, s.destroy = i, e.exports = o
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = n(140),
			a = n(138),
			o = n(137),
			s = {},
			c = r.f;

		function d(e) {
			var t = e.upload = "multipart/form-data" === (e.headers || r.o)["Content-Type"],
				n = !1;
			try {
				n = (location.protocol + "//" + location.host).toLowerCase() !== r.url2origin(e.url)
			} catch(e) {}
			return e.cors = n, t || n || e.mode ? function(e) {
				var t = e.mode,
					n = i,
					s = r.getGlobal();
				return !s.FormData && s.document && (t = "iframe"), "iframe" === t && (n = e.upload ? a : o), new n(e)
			}(e) : new i(e)
		}

		function u(e, t, n) {
			var r = s[e];
			if(r) {
				"onload" === t && r.result && (n = function(e, t) {
						t = {
							data: t
						};
						var n = e.result.headers;
						return n && (t.headers = e.req.header(n)), t
					}(r, n)),
					function(e) {
						var t = s[e];
						t && (t.req.destroy(), delete s[e])
					}(e);
				var i = {
					type: t,
					result: n
				};
				c(i), i.stopped || r[t](i.result)
			}
		}

		function l(e, t) {
			var n = r.genUrlSep(e);
			return t = t || "", r.isObject(t) && (t = r.object2query(t)), t && (e += n + t), e
		}

		function p(e, t) {
			t = t || {};
			var n = r.uniqueID(),
				i = {
					result: t.result,
					onload: t.onload || r.f,
					onerror: t.onerror || r.f
				};
			s[n] = i, t.onload = function(e, t) {
				u(e, "onload", t)
			}.bind(null, n), t.onerror = function(e, t) {
				u(e, "onerror", t)
			}.bind(null, n), t.query && (e = l(e, t.query));
			var a = t.method || "";
			return a && !/get/i.test(a) || !t.data || (e = l(e, t.data), t.data = null), t.url = e, i.req = d(t), n
		}
		p.filter = function(e) {
			r.isFunction(e) && (c = e)
		}, p.abort = function(e) {
			var t = s[e];
			t && t.req.abort()
		}, e.exports = p
	}, function(e, t) {
		e.exports = function(e, t) {
			var n = t.split(".");
			for(; n.length;) {
				var r = n.shift(),
					i = !1;
				if("?" == r[r.length - 1] && (r = r.slice(0, -1), i = !0), !(e = e[r]) && i) return e
			}
			return e
		}
	}, function(e, t, n) {
		var r = n(45),
			i = Math.min;
		e.exports = function(e) {
			return e > 0 ? i(r(e), 9007199254740991) : 0
		}
	}, function(e, t, n) {
		"use strict";
		var r = !0,
			i = !0,
			a = {
				disableLog: function(e) {
					return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (r = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
				},
				disableWarnings: function(e) {
					return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (i = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
				},
				log: function() {
					if("object" == typeof window) {
						if(r) return;
						"undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
					}
				},
				deprecated: function(e, t) {
					i && console.warn(e + " is deprecated, please use " + t + " instead.")
				},
				extractVersion: function(e, t, n) {
					var r = e.match(t);
					return r && r.length >= n && parseInt(r[n], 10)
				},
				detectBrowser: function(e) {
					var t = e && e.navigator,
						n = {
							browser: null,
							version: null
						};
					if(void 0 === e || !e.navigator) return n.browser = "Not a browser.", n;
					if(t.mozGetUserMedia) n.browser = "firefox", n.version = this.extractVersion(t.userAgent, /Firefox\/(\d+)\./, 1);
					else if(t.webkitGetUserMedia)
						if(e.webkitRTCPeerConnection) n.browser = "chrome", n.version = this.extractVersion(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
						else {
							if(!t.userAgent.match(/Version\/(\d+).(\d+)/)) return n.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", n;
							n.browser = "safari", n.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
						}
					else if(t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) n.browser = "edge", n.version = this.extractVersion(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
					else {
						if(!t.mediaDevices || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return n.browser = "Not a supported browser.", n;
						n.browser = "safari", n.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
					}
					return n
				}
			};
		e.exports = {
			log: a.log,
			deprecated: a.deprecated,
			disableLog: a.disableLog,
			disableWarnings: a.disableWarnings,
			extractVersion: a.extractVersion,
			shimCreateObjectURL: a.shimCreateObjectURL,
			detectBrowser: a.detectBrowser.bind(a)
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(367);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return r.PushConfig
			}
		});
		var i = n(126);
		Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return i.SessionConfig
			}
		});
		var a = n(366);
		Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return a.SessionConfig4P2P
			}
		});
		var o = n(365);
		Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return o.SessionConfig4Meeting
			}
		});
		var s = n(364);
		Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return s.SessionConfig4Live
			}
		})
	}, , , function(e, t) {
		e.exports = function e(t, n) {
			"use strict";
			var r, i, a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
				o = /(^[ ]*|[ ]*$)/g,
				s = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
				c = /^0x[0-9a-f]+$/i,
				d = /^0/,
				u = function(t) {
					return e.insensitive && ("" + t).toLowerCase() || "" + t
				},
				l = u(t).replace(o, "") || "",
				p = u(n).replace(o, "") || "",
				f = l.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
				h = p.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
				m = parseInt(l.match(c), 16) || 1 !== f.length && l.match(s) && Date.parse(l),
				v = parseInt(p.match(c), 16) || m && p.match(s) && Date.parse(p) || null;
			if(v) {
				if(m < v) return -1;
				if(m > v) return 1
			}
			for(var _ = 0, R = Math.max(f.length, h.length); _ < R; _++) {
				if(r = !(f[_] || "").match(d) && parseFloat(f[_]) || f[_] || 0, i = !(h[_] || "").match(d) && parseFloat(h[_]) || h[_] || 0, isNaN(r) !== isNaN(i)) return isNaN(r) ? 1 : -1;
				if(typeof r != typeof i && (r += "", i += ""), r < i) return -1;
				if(r > i) return 1
			}
			return 0
		}
	}, function(e, t) {}, function(e, t, n) {
		var r = n(13),
			i = n(47),
			a = n(42)("IE_PROTO"),
			o = Object.prototype;
		e.exports = Object.getPrototypeOf || function(e) {
			return e = i(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
		}
	}, function(e, t, n) {
		var r = n(8).document;
		e.exports = r && r.documentElement
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(348);
		Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return r.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return r.validateVideoQuality
			}
		});
		var i = n(347);
		Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return i.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return i.validateVideoFrameRate
			}
		});
		var a = n(346);
		Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return a.CONTROL_TYPE
			}
		});
		var o = n(345);
		Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return o.CONFIG_MAP
			}
		});
		var s = n(344);
		Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return s.DEVICE_TYPE
			}
		});
		var c = n(343);
		Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return c.NETCALL_TYPE
			}
		});
		var d = n(342);
		Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return d.SPLIT_MODE
			}
		});
		var u = n(341);
		Object.defineProperty(t, "MIX_VIDEO_MODE", {
			enumerable: !0,
			get: function() {
				return u.MIX_VIDEO_MODE
			}
		});
		var l = n(340);
		Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return l.ROLE_FOR_MEETING
			}
		});
		var p = n(339);
		Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return p.HANGUP_TYPE
			}
		});
		var f = n(338);
		Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return f.SESSION_MODE
			}
		});
		var h = n(337);
		Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return h.DECTECT_RESULT_TYPE
			}
		});
		var m = n(336);
		Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return m.DECTECT_TYPE
			}
		});
		var v = n(335);
		Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return v.VIDEO_ENCODE_MODE
			}
		});
		var _ = n(334);
		Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return _.SCALE_TYPE
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(198);
		Object.defineProperty(t, "RtcUtil", {
			enumerable: !0,
			get: function() {
				return s(r).default
			}
		});
		var i = n(195);
		Object.defineProperty(t, "SdpUtil", {
			enumerable: !0,
			get: function() {
				return s(i).default
			}
		});
		var a = n(187);
		Object.defineProperty(t, "RtcStatsNew", {
			enumerable: !0,
			get: function() {
				return s(a).default
			}
		});
		var o = n(143);

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "RtcSupport", {
			enumerable: !0,
			get: function() {
				return s(o).default
			}
		})
	}, function(e, t, n) {
		var r = n(33),
			i = n(6)("toStringTag"),
			a = "Arguments" == r(function() {
				return arguments
			}());
		e.exports = function(e) {
			var t, n, o;
			return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
				try {
					return e[t]
				} catch(e) {}
			}(t = Object(e), i)) ? n : a ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ? "Arguments" : o
		}
	}, function(e, t, n) {
		"use strict";
		var r = {
				link: {
					id: 1,
					heartbeat: 2
				},
				sync: {
					id: 5,
					sync: 1,
					syncTeamMembers: 2
				},
				misc: {
					id: 6,
					getSimpleNosToken: 1,
					getNosToken: 2,
					notifyUploadLog: 3,
					uploadSdkLogUrl: 4,
					audioToText: 5,
					processImage: 6,
					getNosTokenTrans: 7,
					notifyTransLog: 8,
					fetchFile: 9,
					fetchFileList: 10,
					removeFile: 11,
					getClientAntispam: 17,
					fileQuickTransfer: 18
				},
				avSignal: {
					id: 15,
					signalingCreate: 1,
					signalingDelay: 2,
					signalingClose: 3,
					signalingJoin: 4,
					signalingLeave: 5,
					signalingInvite: 6,
					signalingCancel: 7,
					signalingReject: 8,
					signalingAccept: 9,
					signalingControl: 10,
					signalingNotify: 11,
					signalingMutilClientSyncNotify: 12,
					signalingUnreadMessageSyncNotify: 13,
					signalingChannelsSyncNotify: 14
				}
			},
			i = {
				heartbeat: {
					sid: r.link.id,
					cid: r.link.heartbeat
				},
				getSimpleNosToken: {
					sid: r.misc.id,
					cid: r.misc.getSimpleNosToken,
					params: [{
						type: "int",
						name: "num"
					}]
				},
				getNosToken: {
					sid: r.misc.id,
					cid: r.misc.getNosToken,
					params: [{
						type: "String",
						name: "responseBody"
					}, {
						type: "Property",
						name: "nosToken",
						entity: "nosToken"
					}]
				},
				uploadSdkLogUrl: {
					sid: r.misc.id,
					cid: r.misc.uploadSdkLogUrl,
					params: [{
						type: "string",
						name: "url"
					}]
				},
				audioToText: {
					sid: r.misc.id,
					cid: r.misc.audioToText,
					params: [{
						type: "Property",
						name: "audioToText"
					}]
				},
				processImage: {
					sid: r.misc.id,
					cid: r.misc.processImage,
					params: [{
						type: "String",
						name: "url"
					}, {
						type: "PropertyArray",
						name: "imageOps",
						entity: "imageOp"
					}]
				},
				getClientAntispam: {
					sid: r.misc.id,
					cid: r.misc.getClientAntispam,
					params: [{
						type: "Property",
						name: "clientAntispam"
					}]
				},
				fileQuickTransfer: {
					sid: r.misc.id,
					cid: r.misc.fileQuickTransfer,
					params: [{
						type: "Property",
						name: "fileQuickTransfer"
					}]
				},
				getNosTokenTrans: {
					sid: r.misc.id,
					cid: r.misc.getNosTokenTrans,
					params: [{
						type: "Property",
						name: "transToken"
					}]
				},
				fetchFile: {
					sid: r.misc.id,
					cid: r.misc.fetchFile,
					params: [{
						type: "String",
						name: "docId"
					}]
				},
				fetchFileList: {
					sid: r.misc.id,
					cid: r.misc.fetchFileList,
					params: [{
						type: "Property",
						name: "fileListParam"
					}]
				},
				removeFile: {
					sid: r.misc.id,
					cid: r.misc.removeFile,
					params: [{
						type: "String",
						name: "docId"
					}]
				},
				signalingCreate: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingCreate,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingDelay: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingDelay,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingClose: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingClose,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingJoin: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingJoin,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingLeave: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingLeave,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingInvite: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingInvite,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingCancel: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingCancel,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingReject: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingReject,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingAccept: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingAccept,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				signalingControl: {
					sid: r.avSignal.id,
					cid: r.avSignal.signalingControl,
					params: [{
						type: "Property",
						name: "avSignalTag"
					}]
				}
			};
		e.exports = {
			idMap: r,
			cmdConfig: i,
			packetConfig: {
				"1_2": {
					service: "link",
					cmd: "heartbeat"
				},
				"6_1": {
					service: "misc",
					cmd: "getSimpleNosToken",
					response: [{
						type: "PropertyArray",
						name: "nosTokens",
						entity: "nosToken"
					}]
				},
				"6_2": {
					service: "misc",
					cmd: "getNosToken",
					response: [{
						type: "Property",
						name: "nosToken"
					}]
				},
				"6_3": {
					service: "misc",
					cmd: "notifyUploadLog"
				},
				"6_5": {
					service: "misc",
					cmd: "audioToText",
					response: [{
						type: "String",
						name: "text"
					}]
				},
				"6_6": {
					service: "misc",
					cmd: "processImage",
					response: [{
						type: "String",
						name: "url"
					}]
				},
				"6_7": {
					service: "misc",
					cmd: "getNosTokenTrans",
					response: [{
						type: "Property",
						name: "nosToken"
					}, {
						type: "String",
						name: "docId"
					}]
				},
				"6_8": {
					service: "misc",
					cmd: "notifyTransLog",
					response: [{
						type: "Property",
						name: "transInfo"
					}]
				},
				"6_9": {
					service: "misc",
					cmd: "fetchFile",
					response: [{
						type: "Property",
						name: "info",
						entity: "transInfo"
					}]
				},
				"6_10": {
					service: "misc",
					cmd: "fetchFileList",
					response: [{
						type: "PropertyArray",
						name: "list",
						entity: "transInfo"
					}, {
						type: "Number",
						name: "totalCount"
					}]
				},
				"6_11": {
					service: "misc",
					cmd: "removeFile",
					response: [{
						type: "String",
						name: "res"
					}]
				},
				"6_17": {
					service: "misc",
					cmd: "getClientAntispam",
					response: [{
						type: "Property",
						name: "clientAntispam"
					}]
				},
				"6_18": {
					service: "misc",
					cmd: "fileQuickTransfer",
					response: [{
						type: "Property",
						name: "fileQuickTransfer"
					}]
				},
				"15_1": {
					service: "avSignal",
					cmd: "signalingCreate",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_2": {
					service: "avSignal",
					cmd: "signalingDelay",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_3": {
					service: "avSignal",
					cmd: "signalingClose",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_4": {
					service: "avSignal",
					cmd: "signalingJoin",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_5": {
					service: "avSignal",
					cmd: "signalingLeave",
					response: []
				},
				"15_6": {
					service: "avSignal",
					cmd: "signalingInvite",
					response: []
				},
				"15_7": {
					service: "avSignal",
					cmd: "signalingCancel",
					response: []
				},
				"15_8": {
					service: "avSignal",
					cmd: "signalingReject",
					response: []
				},
				"15_9": {
					service: "avSignal",
					cmd: "signalingAccept",
					response: []
				},
				"15_10": {
					service: "avSignal",
					cmd: "signalingControl",
					response: []
				},
				"15_11": {
					service: "avSignal",
					cmd: "signalingNotify",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_12": {
					service: "avSignal",
					cmd: "signalingMutilClientSyncNotify",
					response: [{
						type: "Property",
						name: "avSignalTag"
					}]
				},
				"15_13": {
					service: "avSignal",
					cmd: "signalingUnreadMessageSyncNotify",
					response: [{
						type: "PropertyArray",
						name: "avSignalTag"
					}]
				},
				"15_14": {
					service: "avSignal",
					cmd: "signalingChannelsSyncNotify",
					response: [{
						type: "PropertyArray",
						name: "avSignalTag"
					}]
				}
			}
		}
	}, , function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r, i = n(212),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = function(e) {
			return function() {
				var t = e.apply(this, arguments);
				return new a.default(function(e, n) {
					return function r(i, o) {
						try {
							var s = t[i](o),
								c = s.value
						} catch(e) {
							return void n(e)
						}
						if(!s.done) return a.default.resolve(c).then(function(e) {
							r("next", e)
						}, function(e) {
							r("throw", e)
						});
						e(c)
					}("next")
				})
			}
		}
	}, function(e, t, n) {
		e.exports = n(214)
	}, , function(e, t, n) {
		"use strict";
		var r = n(11),
			i = r.getGlobal(),
			a = {},
			o = i.name || "_parent",
			s = [],
			c = [];
		a.addMsgListener = function(e) {
			s.push(e)
		};
		var d, u, l, p, f = (d = /^([\w]+?:\/\/.*?(?=\/|$))/i, function(e) {
				return e = e || "", d.test(e) ? RegExp.$1 : "*"
			}),
			h = function() {
				var e = unescape(i.name || "").trim();
				if(e && 0 === e.indexOf("MSG|")) {
					i.name = "";
					var t = r.string2object(e.replace("MSG|", ""), "|"),
						n = (t.origin || "").toLowerCase();
					n && "*" !== n && 0 !== location.href.toLowerCase().indexOf(n) || function(e) {
						for(var t = 0, n = s.length; t < n; t++) try {
							s[t].call(null, e)
						} catch(e) {}
					}({
						data: JSON.parse(t.data || "null"),
						source: i.frames[t.self] || t.self,
						origin: f(t.ref || document.referrer)
					})
				}
			},
			m = (l = function(e, t) {
				for(var n = 0, r = e.length; n < r; n++)
					if(e[n] === t) return !0;
				return !1
			}, function() {
				if(c.length) {
					u = [];
					for(var e, t = c.length - 1; t >= 0; t--) e = c[t], l(u, e.w) || (u.push(e.w), c.splice(t, 1), e.w.name = e.d);
					u = null
				}
			}),
			v = a.startTimer = (p = !1, function() {
				p || (p = !0, i.postMessage || (setInterval(m, 100), setInterval(h, 20)))
			});
		a.postMessage = function(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			if(r.fillUndef(t, {
					origin: "*",
					source: o
				}), i.postMessage) {
				var n = t.data;
				i.FormData || (n = JSON.stringify(n)), e.postMessage(n, t.origin)
			} else {
				if(v(), r.isObject(t)) {
					var a = {};
					a.origin = t.origin || "", a.ref = location.href, a.self = t.source, a.data = JSON.stringify(t.data), t = "MSG|" + r.object2string(a, "|", !0)
				}
				c.unshift({
					w: e,
					d: escape(t)
				})
			}
		}, e.exports = a
	}, function(e, t, n) {
		"use strict";
		var r = n(29),
			i = n(37),
			a = n(27),
			o = n(47),
			s = n(59),
			c = Object.assign;
		e.exports = !c || n(20)(function() {
			var e = {},
				t = {},
				n = Symbol(),
				r = "abcdefghijklmnopqrst";
			return e[n] = 7, r.split("").forEach(function(e) {
				t[e] = e
			}), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r
		}) ? function(e, t) {
			for(var n = o(e), c = arguments.length, d = 1, u = i.f, l = a.f; c > d;)
				for(var p, f = s(arguments[d++]), h = u ? r(f).concat(u(f)) : r(f), m = h.length, v = 0; m > v;) l.call(f, p = h[v++]) && (n[p] = f[p]);
			return n
		} : c
	}, function(e, t, n) {
		var r = n(16);
		r(r.S + r.F, "Object", {
			assign: n(86)
		})
	}, function(e, t, n) {
		n(87), e.exports = n(7).Object.assign
	}, function(e, t, n) {
		e.exports = {
			default: n(88),
			__esModule: !0
		}
	}, , function(e, t, n) {
		"use strict";
		var r = n(5);
		"undefined" != typeof window && (window.console || r.isWeixinApp || (window.console = {
			log: function() {},
			info: function() {},
			warn: function() {},
			error: function() {}
		}))
	}, function(e, t, n) {
		n(38)("observable")
	}, function(e, t, n) {
		n(38)("asyncIterator")
	}, function(e, t, n) {
		var r = n(17),
			i = n(58).f,
			a = {}.toString,
			o = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
		e.exports.f = function(e) {
			return o && "[object Window]" == a.call(e) ? function(e) {
				try {
					return i(e)
				} catch(e) {
					return o.slice()
				}
			}(e) : i(r(e))
		}
	}, function(e, t, n) {
		var r = n(33);
		e.exports = Array.isArray || function(e) {
			return "Array" == r(e)
		}
	}, function(e, t, n) {
		var r = n(29),
			i = n(37),
			a = n(27);
		e.exports = function(e) {
			var t = r(e),
				n = i.f;
			if(n)
				for(var o, s = n(e), c = a.f, d = 0; s.length > d;) c.call(e, o = s[d++]) && t.push(o);
			return t
		}
	}, function(e, t, n) {
		var r = n(28)("meta"),
			i = n(18),
			a = n(13),
			o = n(12).f,
			s = 0,
			c = Object.isExtensible || function() {
				return !0
			},
			d = !n(20)(function() {
				return c(Object.preventExtensions({}))
			}),
			u = function(e) {
				o(e, r, {
					value: {
						i: "O" + ++s,
						w: {}
					}
				})
			},
			l = e.exports = {
				KEY: r,
				NEED: !1,
				fastKey: function(e, t) {
					if(!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
					if(!a(e, r)) {
						if(!c(e)) return "F";
						if(!t) return "E";
						u(e)
					}
					return e[r].i
				},
				getWeak: function(e, t) {
					if(!a(e, r)) {
						if(!c(e)) return !0;
						if(!t) return !1;
						u(e)
					}
					return e[r].w
				},
				onFreeze: function(e) {
					return d && l.NEED && c(e) && !a(e, r) && u(e), e
				}
			}
	}, function(e, t, n) {
		"use strict";
		var r = n(8),
			i = n(13),
			a = n(14),
			o = n(16),
			s = n(61),
			c = n(97).KEY,
			d = n(20),
			u = n(41),
			l = n(34),
			p = n(28),
			f = n(6),
			h = n(39),
			m = n(38),
			v = n(96),
			_ = n(95),
			R = n(15),
			g = n(18),
			y = n(17),
			C = n(43),
			T = n(26),
			E = n(48),
			b = n(94),
			S = n(57),
			O = n(12),
			P = n(29),
			k = S.f,
			I = O.f,
			A = b.f,
			L = r.Symbol,
			D = r.JSON,
			w = D && D.stringify,
			M = f("_hidden"),
			W = f("toPrimitive"),
			B = {}.propertyIsEnumerable,
			N = u("symbol-registry"),
			G = u("symbols"),
			x = u("op-symbols"),
			j = Object.prototype,
			F = "function" == typeof L,
			U = r.QObject,
			V = !U || !U.prototype || !U.prototype.findChild,
			H = a && d(function() {
				return 7 != E(I({}, "a", {
					get: function() {
						return I(this, "a", {
							value: 7
						}).a
					}
				})).a
			}) ? function(e, t, n) {
				var r = k(j, t);
				r && delete j[t], I(e, t, n), r && e !== j && I(j, t, r)
			} : I,
			Y = function(e) {
				var t = G[e] = E(L.prototype);
				return t._k = e, t
			},
			K = F && "symbol" == typeof L.iterator ? function(e) {
				return "symbol" == typeof e
			} : function(e) {
				return e instanceof L
			},
			q = function(e, t, n) {
				return e === j && q(x, t, n), R(e), t = C(t, !0), R(n), i(G, t) ? (n.enumerable ? (i(e, M) && e[M][t] && (e[M][t] = !1), n = E(n, {
					enumerable: T(0, !1)
				})) : (i(e, M) || I(e, M, T(1, {})), e[M][t] = !0), H(e, t, n)) : I(e, t, n)
			},
			J = function(e, t) {
				R(e);
				for(var n, r = v(t = y(t)), i = 0, a = r.length; a > i;) q(e, n = r[i++], t[n]);
				return e
			},
			z = function(e) {
				var t = B.call(this, e = C(e, !0));
				return !(this === j && i(G, e) && !i(x, e)) && (!(t || !i(this, e) || !i(G, e) || i(this, M) && this[M][e]) || t)
			},
			Q = function(e, t) {
				if(e = y(e), t = C(t, !0), e !== j || !i(G, t) || i(x, t)) {
					var n = k(e, t);
					return !n || !i(G, t) || i(e, M) && e[M][t] || (n.enumerable = !0), n
				}
			},
			$ = function(e) {
				for(var t, n = A(y(e)), r = [], a = 0; n.length > a;) i(G, t = n[a++]) || t == M || t == c || r.push(t);
				return r
			},
			X = function(e) {
				for(var t, n = e === j, r = A(n ? x : y(e)), a = [], o = 0; r.length > o;) !i(G, t = r[o++]) || n && !i(j, t) || a.push(G[t]);
				return a
			};
		F || (s((L = function() {
			if(this instanceof L) throw TypeError("Symbol is not a constructor!");
			var e = p(arguments.length > 0 ? arguments[0] : void 0),
				t = function(n) {
					this === j && t.call(x, n), i(this, M) && i(this[M], e) && (this[M][e] = !1), H(this, e, T(1, n))
				};
			return a && V && H(j, e, {
				configurable: !0,
				set: t
			}), Y(e)
		}).prototype, "toString", function() {
			return this._k
		}), S.f = Q, O.f = q, n(58).f = b.f = $, n(27).f = z, n(37).f = X, a && !n(35) && s(j, "propertyIsEnumerable", z, !0), h.f = function(e) {
			return Y(f(e))
		}), o(o.G + o.W + o.F * !F, {
			Symbol: L
		});
		for(var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ee = 0; Z.length > ee;) f(Z[ee++]);
		for(var te = P(f.store), ne = 0; te.length > ne;) m(te[ne++]);
		o(o.S + o.F * !F, "Symbol", {
			for: function(e) {
				return i(N, e += "") ? N[e] : N[e] = L(e)
			},
			keyFor: function(e) {
				if(!K(e)) throw TypeError(e + " is not a symbol!");
				for(var t in N)
					if(N[t] === e) return t
			},
			useSetter: function() {
				V = !0
			},
			useSimple: function() {
				V = !1
			}
		}), o(o.S + o.F * !F, "Object", {
			create: function(e, t) {
				return void 0 === t ? E(e) : J(E(e), t)
			},
			defineProperty: q,
			defineProperties: J,
			getOwnPropertyDescriptor: Q,
			getOwnPropertyNames: $,
			getOwnPropertySymbols: X
		}), D && o(o.S + o.F * (!F || d(function() {
			var e = L();
			return "[null]" != w([e]) || "{}" != w({
				a: e
			}) || "{}" != w(Object(e))
		})), "JSON", {
			stringify: function(e) {
				for(var t, n, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
				if(n = t = r[1], (g(t) || void 0 !== e) && !K(e)) return _(t) || (t = function(e, t) {
					if("function" == typeof n && (t = n.call(this, e, t)), !K(t)) return t
				}), r[1] = t, w.apply(D, r)
			}
		}), L.prototype[W] || n(19)(L.prototype, W, L.prototype.valueOf), l(L, "Symbol"), l(Math, "Math", !0), l(r.JSON, "JSON", !0)
	}, function(e, t, n) {
		n(98), n(74), n(93), n(92), e.exports = n(7).Symbol
	}, function(e, t, n) {
		e.exports = {
			default: n(99),
			__esModule: !0
		}
	}, function(e, t) {
		e.exports = function(e, t) {
			return {
				value: t,
				done: !!e
			}
		}
	}, function(e, t) {
		e.exports = function() {}
	}, function(e, t, n) {
		"use strict";
		var r = n(102),
			i = n(101),
			a = n(23),
			o = n(17);
		e.exports = n(63)(Array, "Array", function(e, t) {
			this._t = o(e), this._i = 0, this._k = t
		}, function() {
			var e = this._t,
				t = this._k,
				n = this._i++;
			return !e || n >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
		}, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
	}, function(e, t, n) {
		var r = n(45),
			i = Math.max,
			a = Math.min;
		e.exports = function(e, t) {
			return(e = r(e)) < 0 ? i(e + t, 0) : a(e, t)
		}
	}, function(e, t, n) {
		var r = n(17),
			i = n(68),
			a = n(104);
		e.exports = function(e) {
			return function(t, n, o) {
				var s, c = r(t),
					d = i(c.length),
					u = a(o, d);
				if(e && n != n) {
					for(; d > u;)
						if((s = c[u++]) != s) return !0
				} else
					for(; d > u; u++)
						if((e || u in c) && c[u] === n) return e || u || 0;
				return !e && -1
			}
		}
	}, function(e, t, n) {
		var r = n(12),
			i = n(15),
			a = n(29);
		e.exports = n(14) ? Object.defineProperties : function(e, t) {
			i(e);
			for(var n, o = a(t), s = o.length, c = 0; s > c;) r.f(e, n = o[c++], t[n]);
			return e
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(48),
			i = n(26),
			a = n(34),
			o = {};
		n(19)(o, n(6)("iterator"), function() {
			return this
		}), e.exports = function(e, t, n) {
			e.prototype = r(o, {
				next: i(1, n)
			}), a(e, t + " Iterator")
		}
	}, function(e, t, n) {
		var r = n(45),
			i = n(44);
		e.exports = function(e) {
			return function(t, n) {
				var a, o, s = String(i(t)),
					c = r(n),
					d = s.length;
				return c < 0 || c >= d ? e ? "" : void 0 : (a = s.charCodeAt(c)) < 55296 || a > 56319 || c + 1 === d || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) : o - 56320 + (a - 55296 << 10) + 65536
			}
		}
	}, function(e, t, n) {
		n(49), n(54), e.exports = n(39).f("iterator")
	}, function(e, t, n) {
		e.exports = {
			default: n(109),
			__esModule: !0
		}
	}, function(e, t, n) {
		var r = n(79),
			i = n(6)("iterator"),
			a = n(23);
		e.exports = n(7).getIteratorMethod = function(e) {
			if(null != e) return e[i] || e["@@iterator"] || a[r(e)]
		}
	}, function(e, t, n) {
		var r = n(197),
			i = n(196);
		t.write = i, t.parse = r.parse, t.parseFmtpConfig = r.parseFmtpConfig, t.parseParams = r.parseParams, t.parsePayloads = r.parsePayloads, t.parseRemoteCandidates = r.parseRemoteCandidates, t.parseImageAttributes = r.parseImageAttributes, t.parseSimulcastStreamList = r.parseSimulcastStreamList
	}, function(e, t, n) {
		"use strict";
		var r = n(55);
		e.exports.f = function(e) {
			return new function(e) {
				var t, n;
				this.promise = new e(function(e, r) {
					if(void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
					t = e, n = r
				}), this.resolve = r(t), this.reject = r(n)
			}(e)
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = a(n(83)),
			i = a(n(82));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = {
			getDevices: function() {
				var e = this;
				return(0, i.default)(r.default.mark(function t() {
					var n;
					return r.default.wrap(function(e) {
						for(;;) switch(e.prev = e.next) {
							case 0:
								if(WEBRTCLOG.log("开始获取设备列表"), n = null, navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
									e.next = 4;
									break
								}
								return e.abrupt("return", Promise.reject("your browser not support this feature, see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices"));
							case 4:
								return e.next = 6, navigator.mediaDevices.enumerateDevices().then(function(e) {
									0 !== e.length && (n = {
										video: [],
										audioIn: [],
										audioOut: []
									}, e.forEach(function(e) {
										"videoinput" === e.kind ? n.video.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "camera " + (n.video.length + 1)
										}) : "audioinput" === e.kind ? n.audioIn.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "microphone " + (n.audioIn.length + 1)
										}) : "audiooutput" === e.kind && n.audioOut.push({
											deviceId: e.deviceId,
											label: e.label ? e.label : "speaker " + (n.audioOut.length + 1)
										})
									}))
								});
							case 6:
								return e.abrupt("return", n);
							case 7:
							case "end":
								return e.stop()
						}
					}, t, e)
				}))()
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = s(n(219)),
			i = s(n(218)),
			a = s(n(217)),
			o = s(n(216));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = {
			ApiInvokeData: function(e) {
				return new r.default(e)
			},
			LogData: function(e) {
				return new i.default(e)
			},
			FormatDataFromStats: function(e) {
				return new a.default(e)
			},
			RawDataFromStats: function(e) {
				return new o.default(e)
			}
		}, e.exports = t.default
	}, , , , , , function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r = a(n(230)),
			i = a(n(227));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function e(t, n, a) {
			null === t && (t = Function.prototype);
			var o = (0, i.default)(t, n);
			if(void 0 === o) {
				var s = (0, r.default)(t);
				return null === s ? void 0 : e(s, n, a)
			}
			if("value" in o) return o.value;
			var c = o.get;
			return void 0 !== c ? c.call(a) : void 0
		}
	}, function(e, t, n) {
		e.exports = {
			default: n(167),
			__esModule: !0
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractWebRTC = void 0;
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2));
		n(290);
		var s = n(10),
			c = n(31),
			d = n(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.imInfo = e.imInfo, n.targetUid = e.targetUid || n.imInfo.uid, n.adapterRef = e.adapterRef, n._init(), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_resetOfferRelativeStatus",
				value: function() {
					this.sdpOffer = null, this.sdpAnswer = null, this.iceOffer = [], this.iceAnswer = [], this.offerCount = 0
				}
			}, {
				key: "_reset",
				value: function() {
					this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection = null, this.currStream = null, this.isNeedUpdataSdp = !1, this.imInfo = null, this.targetUid = null
				}
			}, {
				key: "_resetPeerTimeOut",
				value: function() {
					this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection = null, this.isNeedUpdataSdp = !1
				}
			}, {
				key: "_init",
				value: function() {
					var e = this;
					if(this.rtcConnection) WEBRTCLOG.log("AbstractWebRTC:init 已存在rtcConnection");
					else {
						var t = {
								iceServers: [{
									urls: ["stun:turn.ideasip.com"]
								}],
								rtcpMuxPolicy: "require"
							},
							n = {
								relayaddrs: null,
								relaytoken: null,
								uid: this.imInfo.uid,
								cid: this.imInfo.cid
							};
						"WebRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] && this.imInfo.serverMap ? (n.relayaddrs = this.imInfo.serverMap.relayaddrs, n.relaytoken = this.imInfo.serverMap.relaytoken) : "NRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] && (n.relayaddrs = this.imInfo.relayaddrs, n.relaytoken = this.imInfo.relaytoken), this.adapterRef.isPrivateDeployment && this.adapterRef.privateDeploymentConf && this.adapterRef.privateDeploymentConf.turnServer ? (t.iceServers = [], t.iceServers.push({
							urls: "turn:" + this.adapterRef.privateDeploymentConf.turnServer,
							credential: "netease",
							username: "netease"
						}), t.iceTransportPolicy = "relay") : n.relayaddrs && n.relayaddrs.length && n.relaytoken ? (n.relayaddrs = Array.from(new Set(n.relayaddrs)), t.iceServers = [], n.relayaddrs.forEach(function(e) {
							t.iceServers.push({
								urls: "turn:" + e + "?transport=udp",
								credential: n.uid + "/" + n.cid,
								username: n.relaytoken
							}), t.iceServers.push({
								urls: "turn:" + e + "?transport=tcp",
								credential: n.uid + "/" + n.cid,
								username: n.relaytoken
							})
						}), t.iceTransportPolicy = "relay", this.timer = setTimeout(function() {
							e.rtcConnection && e.emit("iceCandidateTimeOut", {
								rtc: e,
								state: e.rtcConnection.iceConnectionState
							})
						}, 15e3)) : this.timer && (clearTimeout(this.timer), this.timer = null), WEBRTCLOG.log("AbstractWebRTC:init create rtcConnection");
						var r = null;
						(r = /Firefox/gi.test(navigator.userAgent) ? this.rtcConnection = new RTCPeerConnection(t) : this.rtcConnection = new RTCPeerConnection(t, {
							optional: [{
								googIPv6: !1
							}, {
								googScreencastMinBitrate: 400
							}, {
								googPayloadPadding: !0
							}, {
								googHighStartBitrate: 100
							}, {
								googImprovedWifiBwe: !0
							}, {
								googDscp: !0
							}, {
								googSuspendBelowMinBitrate: !1
							}, {
								googCombinedAudioVideoBwe: !0
							}, {
								googCpuOveruseDetection: !1
							}, {
								googCpuOveruseEncodeUsage: !0
							}, {
								googCpuUnderuseThreshold: 75
							}, {
								googCpuOveruseThreshold: 85
							}]
						})).uid = this.imInfo.uid, r.targetUid = this.targetUid, r.onicecandidate = this.onIceCandidate.bind(this), r.onnegotiationneeded = this.onNegotiationNeeded.bind(this), r.oniceconnectionstatechange = this.onIceStateChange.bind(this), /Firefox/gi.test(navigator.userAgent) ? r.ontrack = this.onAddRemoteTrack.bind(this) : r.onaddstream = this.onAddRemoteStream.bind(this), r.onremovestream = this.onRemoveRemoteStream.bind(this)
					}
				}
			}, {
				key: "onIceCandidate",
				value: function(e) {
					!e.candidate || this.rtcConnection.iceGatheringState && "complete" === this.rtcConnection.iceGatheringState ? WEBRTCLOG.log("AbstractWebRTC:onIceCandidate 收集完成: ", e) : / tcp /gi.test(e.candidate.candidate) || /\.1 /gi.test(e.candidate.candidate) || / 2 UDP /gi.test(e.candidate.candidate) || (WEBRTCLOG.log("AbstractWebRTC:onIceCandidate targetUid: %s , gather candidate : %o", this.targetUid, e.candidate.candidate), this.iceOffer.push(e.candidate), this.offerCount++, this.rtcConnection && this.rtcConnection.signalingState && "stable" == this.rtcConnection.signalingState && this.doSendIce())
				}
			}, {
				key: "onNegotiationNeeded",
				value: function(e) {
					this.emit("negotiaionNeeded", e)
				}
			}, {
				key: "onIceStateChange",
				value: function(e) {
					if(this.rtcConnection && this.adapterRef && this.adapterRef.webrtcGateWayBusiness) {
						var t = this.rtcConnection.iceConnectionState;
						WEBRTCLOG.log("AbstractWebRTC:onIceStateChange: %s, %s", t, this.targetUid), "connected" !== t && "completed" !== t || (this.timer && (clearTimeout(this.timer), this.timer = null), this.iceCompleted = !0, this.setProgress(!1)), "failed" === t && (this.iceCompleted = !1), this.emit("iceStateChange", {
							rtc: this,
							state: this.rtcConnection.iceConnectionState
						})
					} else WEBRTCLOG.warn("AbstractWebRTC:onIceStateChange 不存在的 rtcConnection")
				}
			}, {
				key: "onAddRemoteStream",
				value: function(e) {
					WEBRTCLOG.log("AbstractWebRTC:onAddRemoteStream ", e), this.targetUid != this.imInfo.uid ? (WEBRTCLOG.log("AbstractWebRTC:onAddRemoteStream targetUid: %s, remote Stream: %o ", this.targetUid, e.stream.id), e.stream && "default" === e.stream.id ? WEBRTCLOG.error("AbstractWebRTC:onAddRemoteStream ID为default的流收到时不做任何事") : this.emit("getRemoteStream", {
						uid: this.targetUid,
						stream: e.stream
					})) : WEBRTCLOG.error("AbstractWebRTC:onAddRemoteStream 自己的远程流直接忽略")
				}
			}, {
				key: "onAddRemoteTrack",
				value: function(e) {
					if(this.targetUid != this.imInfo.uid) {
						var t = e.streams[0];
						t ? this.emit("getRemoteStream", {
							uid: this.targetUid,
							stream: t,
							track: e.track
						}) : WEBRTCLOG.error("AbstractWebRTC:onAddRemoteTrack 未找到流")
					} else WEBRTCLOG.log("AbstractWebRTC:onAddRemoteTrack 自己的远程流直接忽略")
				}
			}, {
				key: "onRemoveRemoteStream",
				value: function(e) {
					WEBRTCLOG.log("AbstractWebRTC:onRemoveRemoteStream targetUid: %s, stream: %o ", this.targetUid, e.stream)
				}
			}, {
				key: "setProgress",
				value: function(e) {
					this.isProgress = e, !1 === e && "completed" === this.rtcConnection.iceConnectionState && this.emit("ready")
				}
			}, {
				key: "getReceivers",
				value: function() {
					return this.rtcConnection.getReceivers()
				}
			}, {
				key: "getRemoteStreams",
				value: function() {
					return this.rtcConnection.getRemoteStreams()
				}
			}, {
				key: "getIceConnectionState",
				value: function() {
					if(this.rtcConnection) return this.rtcConnection.iceConnectionState
				}
			}, {
				key: "close",
				value: function() {
					WEBRTCLOG.log("AbstractWebRTC:close targetUid: %s", this.targetUid);
					var e = this.rtcConnection;
					e && (e.onicecandidate = null, e.onnegotiationneeded = null, e.oniceconnectionstatechange = null, e.ontrack = null, e.onaddstream = null, e.onremovestream = null, e.close(), this.rtcConnection = null)
				}
			}, {
				key: "doSendIce",
				value: function() {
					if(this.sdpAnswer) {
						if(this.iceCompleted) return WEBRTCLOG.log("AbstractWebRTC:doSendIce ice已协商完成"), void(this.iceOffer.length = 0);
						if(0 !== this.iceOffer.length) {
							var e = this.iceOffer.shift();
							this.emit("iceCandidate", {
								uid: this.targetUid,
								ice: e
							}), this.doSendIce()
						} else WEBRTCLOG.log("AbstractWebRTC:doSendIce iceOffer队列为空")
					} else WEBRTCLOG.log("AbstractWebRTC:doSendIce 未协商完sdp，无法发送ice")
				}
			}, {
				key: "updateStream",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
					c.RtcUtil.updateMediaStream({
						peer: this.rtcConnection,
						currStream: this.currStream,
						streams: t
					}).then(function(t) {
						e.currStream || (e.currStream = t)
					})
				}
			}, {
				key: "getLocalSdp",
				value: function() {
					return this.rtcConnection.localDescription
				}
			}, {
				key: "getRemoteSdp",
				value: function() {
					return this.rtcConnection.remoteDescription
				}
			}, {
				key: "checkMediaStatus",
				value: function(e, t, n) {
					return c.RtcUtil.checkMediaStatus(e, t, n)
				}
			}, {
				key: "addRemoteIceCandidate",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("AbstractWebRTC:addRemoteIceCandidate targetUid:%s , ice candidate: %o ", this.targetUid, e), this.adapterRef.instance._isMobileSafari() || this.adapterRef.instance._isWeixinBrowser() || this.rtcConnection.addIceCandidate(new RTCIceCandidate(e)).then(function() {
						t.iceAnswer.push(e), t.iceAnswer.length === t.offerCount && (t.iceAnswer = [], t.offerCount = 0)
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:addRemoteIceCandidate error:%o", e)
					})
				}
			}, {
				key: "createOffer",
				value: function() {
					var e = this;
					return this.setProgress(!0), c.RtcUtil.createOffer(this.rtcConnection).then(function(t) {
						return WEBRTCLOG.log("********************** 创建 sdp offer **********************"), WEBRTCLOG.log("AbstractWebRTC:createOffer"), e._resetOfferRelativeStatus(), t.sdp = c.SdpUtil.maybePreferVideoReceiveCodec(t.sdp, {
							videoRecvCodec: "H264"
						}), e.currStream && WEBRTCLOG.log("AbstractWebRTC:createOffer currentStream: %o", e.currStream.getTracks()), (t = c.RtcUtil.formatSdp({
							offerOrAnswer: t,
							uid: e.imInfo.uid,
							cid: e.imInfo.cid,
							chromeScreenShareOpened: e.adapterRef.state.chromeScreenShareOpened,
							stream: e.currStream,
							highAudio: e.imInfo.sessionConfig.highAudio,
							stero: e.imInfo.sessionConfig.stero,
							targetUid: e.targetUid,
							netDetect: e.imInfo.netDetect,
							codec: e.imInfo.codec
						})) ? Promise.resolve(t) : (e.adapterRef.imInfo && "p2p" === e.adapterRef.imInfo.sessionMode ? (e.adapterRef.instance.hangup && e.adapterRef.instance.hangup(), e.adapterRef.instance.emit(d.RTC_EVENTS.hangup.key, {
							channelId: e.imInfo.cid,
							account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid),
							type: -1
						})) : (e.adapterRef.instance.leaveChannel && e.adapterRef.instance.leaveChannel(), e.adapterRef.instance.emit(d.RTC_EVENTS.leaveChannel.key, {
							channelId: e.imInfo.cid,
							account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid)
						})), e.adapterRef.instance.emit(d.RTC_EVENTS.error.key, {
							desc: "clientError: 该机型浏览器不支持H264编码",
							code: 500
						}), Promise.reject("该机型浏览器不支持H264编码"))
					})
				}
			}, {
				key: "createAnswer",
				value: function(e) {
					var t = this;
					return this.setProgress(!0), this.rtcConnection.createAnswer().then(function(e) {
						return WEBRTCLOG.log("AbstractWebRTC:createAnswer 原始sdp answer", e), e.sdp = c.SdpUtil.maybePreferVideoReceiveCodec(e.sdp, {
							videoRecvCodec: "H264"
						}), e = c.RtcUtil.formatSdp({
							offerOrAnswer: e,
							uid: t.imInfo.uid,
							cid: t.imInfo.cid,
							chromeScreenShareOpened: t.adapterRef.state.chromeScreenShareOpened,
							stream: t.currStream,
							highAudio: t.imInfo.sessionConfig.highAudio,
							stero: t.imInfo.sessionConfig.stero,
							targetUid: t.targetUid,
							netDetect: t.imInfo.netDetect
						})
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:createAnswer error: %o", e)
					})
				}
			}, {
				key: "setLocalDescription",
				value: function(e, t) {
					var n = this;
					return this.sdpOffer = e, WEBRTCLOG.log("AbstractWebRTC:setLocalDescription 设置到本地：\n", e.sdp), this.rtcConnection.setLocalDescription(e).then(function() {
						return WEBRTCLOG.log("setLocalDescription 成功"), e.sdp = c.RtcUtil.setMediaBitrates({
							sdp: e.sdp
						}), "answer" === e.type ? (n.sdpAnswer = e, n.iceCompleted && n.emit("iceCompleted"), n.setProgress(!1)) : n.sdpAnswer = null, Promise.resolve(e)
					}).catch(function(e) {
						WEBRTCLOG.error("AbstractWebRTC:setLocalDescription  , error: %o", e)
					})
				}
			}, {
				key: "setRemoteDescription",
				value: function(e, t) {
					var n = this;
					"offer" === e.type && (WEBRTCLOG.log("********************** 创建 sdp offer(remote) **********************"), WEBRTCLOG.log("AbstractWebRTC:setRemoteDescription 对端 targetUid: %s, 原始SDP: %o", this.targetUid, e)), this.setProgress("offer" === e.type);
					var r = {
						sdp: e.sdp,
						type: e.type
					};
					if("offer" === e.type && !this.sdpAnswer) return Promise.reject();
					r.sdp = c.SdpUtil.maybePreferVideoSendCodec(r.sdp, {
						videoRecvCodec: "H264"
					}), r.sdp = c.RtcUtil.formatSdpRemote(r.sdp, this.sdpOffer, this.adapterRef.state.chromeScreenShareOpened), (/Firefox/gi.test(navigator.userAgent) || this.adapterRef && this.adapterRef.isPrivateDeployment && this.adapterRef.privateDeploymentConf.turnServer || this.imInfo.serverMap && this.imInfo.serverMap.relayaddrs && this.imInfo.serverMap.relayaddrs.length > 0 && this.imInfo.serverMap.relaytoken) && (r.sdp = r.sdp.replace(/\na=candidate:.+/g, "")), this.sdpAnswer = "answer" === e.type ? r : null;
					var i = this.rtcConnection;
					return WEBRTCLOG.log("peer state: ", i.signalingState), i.signalingState && "have-local-offer" == i.signalingState ? i.setRemoteDescription(r).then(function() {
						if(WEBRTCLOG.log("#### setRemoteDescription 成功... type: ", e.type), "answer" === e.type) {
							if(n.iceCompleted) return WEBRTCLOG.log("ice已协商完成, targetUid:", i.targetUid), void n.emit("iceCompleted", i.targetUid);
							n.doSendIce()
						}
						return Promise.resolve()
					}).catch(function(e) {
						return WEBRTCLOG.error("AbstractWebRTC:setRemoteDescription uid:%s, error: %o", i.uid, e), Promise.reject(e)
					}) : Promise.resolve()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AbstractWebRTC:destroy"), this.close(), this._reset()
				}
			}]), t
		}(s.EventEmitter);
		t.AbstractWebRTC = l
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractBusiness = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, r.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
			}
			return(0, a.default)(t, e), t
		}(n(10).EventEmitter);
		t.AbstractBusiness = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(363);
		Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return r.NetcallOption
			}
		});
		var i = n(362);
		Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		});
		var a = n(361);
		Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return a.NRTCOption
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.SessionConfig = function e(t) {
			(0, a.default)(this, e);
			var n = t.maxVideoQuality,
				r = t.videoQuality,
				i = t.videoFrameRate,
				o = t.videoBitrate,
				s = t.videoEncodeMode,
				c = t.highAudio,
				d = t.recordVideo,
				u = t.recordAudio,
				l = t.isHostSpeaker,
				p = t.recordType,
				f = t.rtmpUrl,
				h = t.splitMode,
				m = t.layout,
				v = t.liveEnable;
			this.maxVideoQuality = n, this.videoQuality = r, this.videoFrameRate = i, this.videoBitrate = o, this.videoEncodeMode = s, this.highAudio = c, this.liveEnable = v, void 0 !== d && (this.recordVideo = d), void 0 !== u && (this.recordAudio = u), void 0 !== l && (this.isHostSpeaker = l), void 0 !== p && (this.recordType = p), void 0 !== f && (this.rtmpUrl = f), void 0 !== h && (this.splitMode = h), void 0 !== m && (this.layout = m)
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebAudio = void 0;
		var r = n(78).RtcSupport.checkWebAudio();

		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.stream,
				n = e.uid,
				i = e.isAnalyze,
				a = e.isRemote;
			this.support = r.WebAudio && r.MediaStream, this.gain = 1, this.stream = t, this.support && (this.audioIn = {}, this.uid = n || 0, this.isAnalyze = i, this.isRemote = a || !1, this.instant = 0, this.slow = 0, this.clip = 0, this.init())
		}
		i.ac = r.WebAudio && r.MediaStream ? new window.AudioContext : {}, i.destination = i.ac.createMediaStreamDestination ? i.ac.createMediaStreamDestination() : {};
		var a = i.prototype;
		a.context = i.ac, a.init = function() {
			this.validateInput() && (this.isAnalyze && this.initMonitor(), this.formatStreams(), this.initWebAudio(), this.initAudioIn())
		}, a.validateInput = function() {
			return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor)
		}, a.initMonitor = function() {
			var e = this;
			(this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function(t) {
				var n, r = t.inputBuffer.getChannelData(0),
					i = 0,
					a = 0;
				for(n = 0; n < r.length; ++n) i += Math.abs(r[n]), Math.abs(r[n]) > .99 && (a += 1);
				e.instant = Math.sqrt(i / r.length), e.slow = .95 * e.slow + .05 * e.instant, e.clip = a / r.length
			}
		}, a.initWebAudio = function() {
			var e = this.context;
			this.gainFilter = e.createGain(), this.destination = this.isRemote ? i.destination : e.createMediaStreamDestination(), this.gainFilter.gain.value = this.gain, this.gainFilter.connect(this.destination)
		}, a.initAudioIn = function() {
			var e = this,
				t = this,
				n = this.stream,
				r = this.context,
				i = void 0;
			if(/(MediaStream|LocalMediaStream)/.test(n.constructor)) return a(n), void(this.outputStream = this.destination.stream);

			function a(e) {
				if(!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
				if(0 === e.getAudioTracks().length) return null;
				var n = r.createMediaStreamSource(e);
				return t.isAnalyze && t.script && (n.connect(t.script), t.script.connect(t.gainFilter)), n.connect(t.gainFilter), n
			}
			n.constructor === Array && (n.forEach(function(t) {
				(i = a(t)) && (e.audioIn[t.id] = i)
			}), this.outputStream = this.destination.stream), WEBRTCLOG.log("初始化音频 state: ", r.state), "running" != r.state && r.resume().then(function() {
				WEBRTCLOG.log("状态变更成功 state: ", r.state)
			}).catch(function(e) {
				WEBRTCLOG.log("状态变更出错: ", e), r.resume()
			})
		}, a.formatStreams = function() {
			var e = this.stream,
				t = [];
			if(/(MediaStream|LocalMediaStream)/.test(e.constructor)) return e.getAudioTracks().map(function(e) {
				t.push(new MediaStream([e]))
			}), void(this.stream = t);
			e.constructor === Array && (e.map(function(e) {
				e.getAudioTracks().map(function(e) {
					t.push(new MediaStream([e]))
				})
			}), this.stream = t)
		}, a.addStream = function(e) {
			var t = this.context;
			if(0 !== e.getAudioTracks().length) {
				var n = t.createMediaStreamSource(e);
				this.isAnalyze && this.script && n.connect(this.script), n.connect(this.gainFilter), this.audioIn[e.id] = n, this.outputStream = this.destination.stream
			}
		}, a.updateStream = function(e) {
			if(this.audioIn)
				for(var t in this.audioIn) this.audioIn[t] && this.audioIn[t].disconnect(0), this.audioIn[t] = null;
			this.audioIn = {}, this.stream = e, this.initAudioIn()
		}, a.setGain = function(e) {
			this.support && (this.gainFilter.gain.value = e, this.gain = e)
		}, a.getGain = function() {
			return this.gain
		}, a.off = function() {
			return this.setGain(0)
		}, a.on = function() {
			this.setGain(1)
		}, a.destroy = function() {
			if(this.instant = 0, this.slow = 0, this.clip = 0, this.gainFilter && this.gainFilter.disconnect(0), this.script && this.script.disconnect(0), this.audioIn)
				for(var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
			this.audioIn = {};
			var t = this.stream;

			function n(e) {
				e && e.getTracks().forEach(function(t) {
					e.removeTrack(t)
				})
			}
			/(MediaStream|LocalMediaStream)/.test(t.constructor) && n(t), t.constructor === Array && t.forEach(function(e) {
				n(e)
			}), this.stream = null, this.outputStream = null
		}, a.getVolumeData = function() {
			return this.instant.toFixed(2)
		}, t.WebAudio = i
	}, , , , , function(e, t, n) {
		var r = n(6)("iterator"),
			i = !1;
		try {
			var a = [7][r]();
			a.return = function() {
				i = !0
			}, Array.from(a, function() {
				throw 2
			})
		} catch(e) {}
		e.exports = function(e, t) {
			if(!t && !i) return !1;
			var n = !1;
			try {
				var a = [7],
					o = a[r]();
				o.next = function() {
					return {
						done: n = !0
					}
				}, a[r] = function() {
					return o
				}, e(a)
			} catch(e) {}
			return n
		}
	}, function(e, t, n) {
		var r = n(23),
			i = n(6)("iterator"),
			a = Array.prototype;
		e.exports = function(e) {
			return void 0 !== e && (r.Array === e || a[i] === e)
		}
	}, function(e, t, n) {
		var r = n(15);
		e.exports = function(e, t, n, i) {
			try {
				return i ? t(r(n)[0], n[1]) : t(n)
			} catch(t) {
				var a = e.return;
				throw void 0 !== a && r(a.call(e)), t
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(66);
		e.exports = function(e, t) {
			return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] = "multipart/form-data", t.timeout = 0, t.type = t.type || "json", r(e, t)
		}
	}, function(e, t, n) {
		"use strict";
		var r, i, a = n(11),
			o = n(66),
			s = (r = /json/i, i = /post/i, function(e, t) {
				var n = (t = t || {}).data = t.data || {},
					s = t.headers = t.headers || {},
					c = a.checkWithDefault(s, "Accept", "application/json"),
					d = a.checkWithDefault(s, "Content-Type", "application/json");
				return r.test(c) && (t.type = "json"), i.test(t.method) && r.test(d) && (t.data = JSON.stringify(n)), o(e, t)
			});
		e.exports = s
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = n(85),
			a = n(65),
			o = {};

		function s(e) {
			this.init(), a.call(this, e)
		}
		var c = a.prototype,
			d = s.prototype = Object.create(c);
		d.init = function() {
			var e = "NEJ-AJAX-DATA:",
				t = !1;

			function n(t) {
				var n = t.data;
				if(0 === n.indexOf(e)) {
					var r = (n = JSON.parse(n.replace(e, ""))).key,
						i = o[r];
					i && (delete o[r], n.result = decodeURIComponent(n.result || ""), i.onLoad(n))
				}
			}
			return function() {
				! function() {
					if(!t) {
						t = !0;
						var e = r.getGlobal();
						e.postMessage ? r.on(e, "message", n) : i.addMsgListener(n)
					}
				}()
			}
		}(), d.doSend = function() {
			var e = this.options,
				t = r.url2origin(e.url),
				n = e.proxyUrl || t + "/res/nej_proxy_frame.html",
				a = o[n];
			if(r.isArray(a)) a.push(this.doSend.bind(this, e));
			else {
				if(!a) return o[n] = [this.doSend.bind(this, e)], void r.createIframe({
					src: n,
					onload: function(e) {
						var t = o[n];
						o[n] = r.target(e).contentWindow, t.forEach(function(e) {
							try {
								e()
							} catch(e) {
								console.log("error:", e)
							}
						})
					}
				});
				if(!this.aborted) {
					var s = this.key = r.uniqueID();
					o[s] = this;
					var c = r.fetch({
						method: "GET",
						url: "",
						data: null,
						headers: {},
						timeout: 0
					}, e);
					c.key = s, i.postMessage(a, {
						data: c
					}), this.afterSend()
				}
			}
		}, d.abort = function() {
			this.aborted = !0, delete o[this.key], c.abort.call(this)
		}, e.exports = s
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = n(65),
			a = n(85),
			o = "NEJ-UPLOAD-RESULT:",
			s = {};

		function c(e) {
			this.init(), i.call(this, e)
		}
		var d = i.prototype,
			u = c.prototype = Object.create(d);
		u.init = function() {
			var e = !1;

			function t(e) {
				var t = e.data;
				if(0 === t.indexOf(o)) {
					var n = (t = JSON.parse(t.replace(o, ""))).key,
						r = s[n];
					r && (delete s[n], t.result = decodeURIComponent(t.result || ""), r.onLoad(t.result))
				}
			}
			return function() {
				! function() {
					if(!e) {
						e = !0;
						var n = r.getGlobal();
						n.postMessage ? r.on(n, "message", t) : (a.addMsgListener(t), a.startTimer())
					}
				}()
			}
		}(), u.doSend = function() {
			var e = this,
				t = e.options,
				n = e.key = "zoro-ajax-upload-iframe-" + r.uniqueID();
			s[n] = e;
			var i = e.form = r.html2node('<form style="display:none;"></form>');
			document.body.appendChild(i), i.target = n, i.method = "POST", i.enctype = "multipart/form-data", i.encoding = "multipart/form-data";
			var a = t.url,
				o = r.genUrlSep(a);
			i.action = a + o + "_proxy_=form";
			var c = t.data,
				d = [],
				u = [];

			function l() {
				d.forEach(function(e, t) {
					var n = u[t];
					n.parentNode && (e.name = n.name, r.isFunction(e.setAttribute) && e.setAttribute("form", n.getAttribute("form")), n.parentNode.replaceChild(e, n))
				})
			}
			c && r.getKeys(c, t.putFileAtEnd).forEach(function(e) {
				var t = c[e];
				if(t.tagName && "INPUT" === t.tagName.toUpperCase()) {
					if("file" === t.type) {
						var n = t,
							a = n.cloneNode(!0);
						n.parentNode.insertBefore(a, n);
						var o = r.dataset(n, "name");
						o && (n.name = o), i.appendChild(n), r.isFunction(n.setAttribute) && (n.setAttribute("form", ""), n.removeAttribute("form")), d.push(t), u.push(a)
					}
				} else {
					var s = r.html2node('<input type="hidden"/>');
					s.name = e, s.value = t, i.appendChild(s)
				}
			});
			var p = e.iframe = r.createIframe({
				name: n,
				onload: function() {
					e.aborted ? l() : (r.on(p, "load", e.checkResult.bind(e)), i.submit(), l(), e.afterSend())
				}
			})
		}, u.checkResult = function() {
			var e, t;
			try {
				if((t = ((e = this.iframe.contentWindow.document.body).innerText || e.textContent || "").trim()).indexOf(o) >= 0 || e.innerHTML.indexOf(o) >= 0) return
			} catch(e) {
				return void console.log("error:", "ignore error if not same domain,", e)
			}
			this.onLoad(t)
		}, u.onLoad = function(e) {
			d.onLoad.call(this, {
				status: 200,
				result: e
			}), r.remove(this.form), r.remove(this.iframe), d.destroy.call(this)
		}, u.destroy = function() {
			r.remove(this.iframe), r.remove(this.form)
		}, u.abort = function() {
			this.aborted = !0, delete s[this.key], d.abort.call(this)
		}, e.exports = c
	}, function(e, t, n) {
		var r;
		/*!
		 * EventEmitter v5.2.4 - git.io/ee
		 * Unlicense - http://unlicense.org/
		 * Oliver Caldwell - http://oli.me.uk/
		 * @preserve
		 */
		! function(t) {
			"use strict";

			function i() {}
			var a = i.prototype,
				o = t.EventEmitter;

			function s(e, t) {
				for(var n = e.length; n--;)
					if(e[n].listener === t) return n;
				return -1
			}

			function c(e) {
				return function() {
					return this[e].apply(this, arguments)
				}
			}
			a.getListeners = function(e) {
				var t, n, r = this._getEvents();
				if(e instanceof RegExp)
					for(n in t = {}, r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);
				else t = r[e] || (r[e] = []);
				return t
			}, a.flattenListeners = function(e) {
				var t, n = [];
				for(t = 0; t < e.length; t += 1) n.push(e[t].listener);
				return n
			}, a.getListenersAsObject = function(e) {
				var t, n = this.getListeners(e);
				return n instanceof Array && ((t = {})[e] = n), t || n
			}, a.addListener = function(e, t) {
				if(! function e(t) {
						return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
					}(t)) throw new TypeError("listener must be a function");
				var n, r = this.getListenersAsObject(e),
					i = "object" == typeof t;
				for(n in r) r.hasOwnProperty(n) && -1 === s(r[n], t) && r[n].push(i ? t : {
					listener: t,
					once: !1
				});
				return this
			}, a.on = c("addListener"), a.addOnceListener = function(e, t) {
				return this.addListener(e, {
					listener: t,
					once: !0
				})
			}, a.once = c("addOnceListener"), a.defineEvent = function(e) {
				return this.getListeners(e), this
			}, a.defineEvents = function(e) {
				for(var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
				return this
			}, a.removeListener = function(e, t) {
				var n, r, i = this.getListenersAsObject(e);
				for(r in i) i.hasOwnProperty(r) && -1 !== (n = s(i[r], t)) && i[r].splice(n, 1);
				return this
			}, a.off = c("removeListener"), a.addListeners = function(e, t) {
				return this.manipulateListeners(!1, e, t)
			}, a.removeListeners = function(e, t) {
				return this.manipulateListeners(!0, e, t)
			}, a.manipulateListeners = function(e, t, n) {
				var r, i, a = e ? this.removeListener : this.addListener,
					o = e ? this.removeListeners : this.addListeners;
				if("object" != typeof t || t instanceof RegExp)
					for(r = n.length; r--;) a.call(this, t, n[r]);
				else
					for(r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? a.call(this, r, i) : o.call(this, r, i));
				return this
			}, a.removeEvent = function(e) {
				var t, n = typeof e,
					r = this._getEvents();
				if("string" === n) delete r[e];
				else if(e instanceof RegExp)
					for(t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
				else delete this._events;
				return this
			}, a.removeAllListeners = c("removeEvent"), a.emitEvent = function(e, t) {
				var n, r, i, a, o = this.getListenersAsObject(e);
				for(a in o)
					if(o.hasOwnProperty(a))
						for(n = o[a].slice(0), i = 0; i < n.length; i++) !0 === (r = n[i]).once && this.removeListener(e, r.listener), r.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, r.listener);
				return this
			}, a.trigger = c("emitEvent"), a.emit = function(e) {
				var t = Array.prototype.slice.call(arguments, 1);
				return this.emitEvent(e, t)
			}, a.setOnceReturnValue = function(e) {
				return this._onceReturnValue = e, this
			}, a._getOnceReturnValue = function() {
				return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
			}, a._getEvents = function() {
				return this._events || (this._events = {})
			}, i.noConflict = function() {
				return t.EventEmitter = o, i
			}, void 0 === (r = function() {
				return i
			}.call(t, n, t, e)) || (e.exports = r)
		}(this || {})
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = n(65);

		function a(e) {
			e.onuploading && this.on("uploading", e.onuploading), i.call(this, e)
		}
		var o = i.prototype,
			s = a.prototype = Object.create(o);
		s.doSend = function() {
			var e = this.options,
				t = e.headers,
				n = this.xhr = new XMLHttpRequest;
			if("multipart/form-data" === t["Content-Type"]) {
				delete t["Content-Type"], n.upload.onprogress = this.onProgress.bind(this), n.upload.onload = this.onProgress.bind(this);
				var i = e.data;
				e.data = new window.FormData, i && r.getKeys(i, e.putFileAtEnd).forEach(function(t) {
					var n = i[t];
					n.tagName && "INPUT" === n.tagName.toUpperCase() ? "file" === n.type && [].forEach.call(n.files, function(t) {
						e.data.append(r.dataset(n, "name") || n.name || t.name || "file-" + r.uniqueID(), t)
					}) : e.data.append(t, n)
				})
			}
			n.onreadystatechange = this.onStateChange.bind(this), 0 !== e.timeout && (this.timer = setTimeout(this.onTimeout.bind(this), e.timeout)), n.open(e.method, e.url, !e.sync), Object.keys(t).forEach(function(e) {
				n.setRequestHeader(e, t[e])
			}), e.cookie && "withCredentials" in n && (n.withCredentials = !0), n.send(e.data), this.afterSend()
		}, s.onProgress = function(e) {
			e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
		}, s.onStateChange = function() {
			var e = this.xhr;
			4 === e.readyState && this.onLoad({
				status: e.status,
				result: e.responseText || ""
			})
		}, s.getResponseHeader = function(e) {
			var t = this.xhr;
			return t ? t.getResponseHeader(e) : ""
		}, s.destroy = function() {
			clearTimeout(this.timer);
			try {
				this.xhr.onreadystatechange = r.f, this.xhr.abort()
			} catch(e) {
				console.log("error:", "ignore error ajax destroy,", e)
			}
			o.destroy.call(this)
		}, e.exports = a
	}, , function(e, t) {
		var n = e.exports = {
			v: [{
				name: "version",
				reg: /^(\d*)$/
			}],
			o: [{
				name: "origin",
				reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
				names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
				format: "%s %s %d %s IP%d %s"
			}],
			s: [{
				name: "name"
			}],
			i: [{
				name: "description"
			}],
			u: [{
				name: "uri"
			}],
			e: [{
				name: "email"
			}],
			p: [{
				name: "phone"
			}],
			z: [{
				name: "timezones"
			}],
			r: [{
				name: "repeats"
			}],
			t: [{
				name: "timing",
				reg: /^(\d*) (\d*)/,
				names: ["start", "stop"],
				format: "%d %d"
			}],
			c: [{
				name: "connection",
				reg: /^IN IP(\d) (\S*)/,
				names: ["version", "ip"],
				format: "IN IP%d %s"
			}],
			b: [{
				push: "bandwidth",
				reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
				names: ["type", "limit"],
				format: "%s:%s"
			}],
			m: [{
				reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
				names: ["type", "port", "protocol", "payloads"],
				format: "%s %d %s %s"
			}],
			a: [{
				push: "rtp",
				reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
				names: ["payload", "codec", "rate", "encoding"],
				format: function(e) {
					return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
				}
			}, {
				push: "fmtp",
				reg: /^fmtp:(\d*) ([\S| ]*)/,
				names: ["payload", "config"],
				format: "fmtp:%d %s"
			}, {
				name: "control",
				reg: /^control:(.*)/,
				format: "control:%s"
			}, {
				name: "rtcp",
				reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
				names: ["port", "netType", "ipVer", "address"],
				format: function(e) {
					return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
				}
			}, {
				push: "rtcpFbTrrInt",
				reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
				names: ["payload", "value"],
				format: "rtcp-fb:%d trr-int %d"
			}, {
				push: "rtcpFb",
				reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
				names: ["payload", "type", "subtype"],
				format: function(e) {
					return null != e.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
				}
			}, {
				push: "ext",
				reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
				names: ["value", "direction", "uri", "config"],
				format: function(e) {
					return "extmap:%d" + (e.direction ? "/%s" : "%v") + " %s" + (e.config ? " %s" : "")
				}
			}, {
				push: "crypto",
				reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
				names: ["id", "suite", "config", "sessionConfig"],
				format: function(e) {
					return null != e.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
				}
			}, {
				name: "setup",
				reg: /^setup:(\w*)/,
				format: "setup:%s"
			}, {
				name: "mid",
				reg: /^mid:([^\s]*)/,
				format: "mid:%s"
			}, {
				name: "msid",
				reg: /^msid:(.*)/,
				format: "msid:%s"
			}, {
				name: "ptime",
				reg: /^ptime:(\d*)/,
				format: "ptime:%d"
			}, {
				name: "maxptime",
				reg: /^maxptime:(\d*)/,
				format: "maxptime:%d"
			}, {
				name: "direction",
				reg: /^(sendrecv|recvonly|sendonly|inactive)/
			}, {
				name: "icelite",
				reg: /^(ice-lite)/
			}, {
				name: "iceUfrag",
				reg: /^ice-ufrag:(\S*)/,
				format: "ice-ufrag:%s"
			}, {
				name: "icePwd",
				reg: /^ice-pwd:(\S*)/,
				format: "ice-pwd:%s"
			}, {
				name: "fingerprint",
				reg: /^fingerprint:(\S*) (\S*)/,
				names: ["type", "hash"],
				format: "fingerprint:%s %s"
			}, {
				push: "candidates",
				reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
				names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
				format: function(e) {
					var t = "candidate:%s %d %s %d %s %d typ %s";
					return t += null != e.raddr ? " raddr %s rport %d" : "%v%v", t += null != e.tcptype ? " tcptype %s" : "%v", null != e.generation && (t += " generation %d"), t += null != e["network-id"] ? " network-id %d" : "%v", t += null != e["network-cost"] ? " network-cost %d" : "%v"
				}
			}, {
				name: "endOfCandidates",
				reg: /^(end-of-candidates)/
			}, {
				name: "remoteCandidates",
				reg: /^remote-candidates:(.*)/,
				format: "remote-candidates:%s"
			}, {
				name: "iceOptions",
				reg: /^ice-options:(\S*)/,
				format: "ice-options:%s"
			}, {
				push: "ssrcs",
				reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
				names: ["id", "attribute", "value"],
				format: function(e) {
					var t = "ssrc:%d";
					return null != e.attribute && (t += " %s", null != e.value && (t += ":%s")), t
				}
			}, {
				push: "ssrcGroups",
				reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
				names: ["semantics", "ssrcs"],
				format: "ssrc-group:%s %s"
			}, {
				name: "msidSemantic",
				reg: /^msid-semantic:\s?(\w*) (\S*)/,
				names: ["semantic", "token"],
				format: "msid-semantic: %s %s"
			}, {
				push: "groups",
				reg: /^group:(\w*) (.*)/,
				names: ["type", "mids"],
				format: "group:%s %s"
			}, {
				name: "rtcpMux",
				reg: /^(rtcp-mux)/
			}, {
				name: "rtcpRsize",
				reg: /^(rtcp-rsize)/
			}, {
				name: "sctpmap",
				reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
				names: ["sctpmapNumber", "app", "maxMessageSize"],
				format: function(e) {
					return null != e.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
				}
			}, {
				name: "xGoogleFlag",
				reg: /^x-google-flag:([^\s]*)/,
				format: "x-google-flag:%s"
			}, {
				push: "rids",
				reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
				names: ["id", "direction", "params"],
				format: function(e) {
					return e.params ? "rid:%s %s %s" : "rid:%s %s"
				}
			}, {
				push: "imageattrs",
				reg: new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"),
				names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
				format: function(e) {
					return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "")
				}
			}, {
				name: "simulcast",
				reg: new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),
				names: ["dir1", "list1", "dir2", "list2"],
				format: function(e) {
					return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "")
				}
			}, {
				name: "simulcast_03",
				reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
				names: ["value"],
				format: "simulcast: %s"
			}, {
				name: "framerate",
				reg: /^framerate:(\d+(?:$|\.\d+))/,
				format: "framerate:%s"
			}, {
				name: "sourceFilter",
				reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
				names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
				format: "source-filter: %s %s %s %s %s"
			}, {
				push: "invalid",
				names: ["value"]
			}]
		};
		Object.keys(n).forEach(function(e) {
			n[e].forEach(function(e) {
				e.reg || (e.reg = /(.*)/), e.format || (e.format = "%s")
			})
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = o(n(83)),
			i = o(n(82)),
			a = o(n(114));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = n(21),
			c = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia,
			d = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext,
			u = window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
			l = window.RTCDataChannel = window.RTCDataChannel || window.DataChannel,
			p = window.MediaStream = window.MediaStream || window.webkitMediaStream;

		function f(e) {
			var t = void 0;
			return t || (t = document.createElement("video")), !!t.canPlayType({
				ogg: 'video/ogg; codecs="theora"',
				h264: 'video/mp4; codecs="avc1.42E01E"',
				webm: 'video/webm; codecs="vp8, vorbis"',
				vp9: 'video/webm; codecs="vp9"',
				hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
			}[e] || e)
		}
		var h = {
			WebRTC: !!u && !!p,
			RTCPeerConnection: !!u,
			Vp8: f("webm"),
			Vp9: f("vp9"),
			H264: f("h264"),
			GetUserMedia: !!c && !!navigator.mediaDevices,
			DataChannel: !!(u && l && u.prototype && u.prototype.createDataChannel),
			WebAudio: !(!d || !d.prototype.createMediaStreamSource),
			MediaStream: !!p
		};

		function m() {
			var e = s && s.name,
				t = s && s.version;
			return console.log("platform", s), {
				prefix: e,
				version: t = (t = t && t.match(/(\d|\.)+/)[0]) && t.match(/\d+/)[0]
			}
		}
		t.default = {
			checkWebAudio: function() {
				return {
					WebAudio: h.WebAudio,
					MediaStream: h.MediaStream
				}
			},
			checkCompatibility: function() {
				var e = Object.assign(m(), {
					system: s && s.os.family + " " + s.os.version,
					browser: s && s.name,
					version: s && s.version
				});
				return new Promise(function(t, n) {
					var o = this;
					(0, i.default)(r.default.mark(function n() {
						var i, s;
						return r.default.wrap(function(n) {
							for(;;) switch(n.prev = n.next) {
								case 0:
									return i = Object.assign(e, h, {
										ScreenSharing: !1
									}), n.next = 3, a.default.getDevices().catch(function(e) {
										return console.warn(e), t(i)
									});
								case 3:
									return s = n.sent, i.MicrophoneList = s && s.audioIn || [], i.CameraList = s && s.video || [], i.Microphone = s && s.audioIn && s.audioIn.length > 0 || !1, i.Camera = s && s.video && s.video.length > 0 || !1, n.abrupt("return", t(i));
								case 9:
								case "end":
									return n.stop()
							}
						}, n, o)
					}))()
				})
			},
			checkVersion: function() {
				return m()
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		var r = n(15),
			i = n(18),
			a = n(113);
		e.exports = function(e, t) {
			if(r(e), i(t) && t.constructor === e) return t;
			var n = a.f(e);
			return(0, n.resolve)(t), n.promise
		}
	}, function(e, t) {
		e.exports = function(e) {
			try {
				return {
					e: !1,
					v: e()
				}
			} catch(e) {
				return {
					e: !0,
					v: e
				}
			}
		}
	}, function(e, t, n) {
		var r, i, a, o = n(36),
			s = n(207),
			c = n(76),
			d = n(52),
			u = n(8),
			l = u.process,
			p = u.setImmediate,
			f = u.clearImmediate,
			h = u.MessageChannel,
			m = u.Dispatch,
			v = 0,
			_ = {},
			R = function() {
				var e = +this;
				if(_.hasOwnProperty(e)) {
					var t = _[e];
					delete _[e], t()
				}
			},
			g = function(e) {
				R.call(e.data)
			};
		p && f || (p = function(e) {
			for(var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
			return _[++v] = function() {
				s("function" == typeof e ? e : Function(e), t)
			}, r(v), v
		}, f = function(e) {
			delete _[e]
		}, "process" == n(33)(l) ? r = function(e) {
			l.nextTick(o(R, e, 1))
		} : m && m.now ? r = function(e) {
			m.now(o(R, e, 1))
		} : h ? (a = (i = new h).port2, i.port1.onmessage = g, r = o(a.postMessage, a, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (r = function(e) {
			u.postMessage(e + "", "*")
		}, u.addEventListener("message", g, !1)) : r = "onreadystatechange" in d("script") ? function(e) {
			c.appendChild(d("script")).onreadystatechange = function() {
				c.removeChild(this), R.call(e)
			}
		} : function(e) {
			setTimeout(o(R, e, 1), 0)
		}), e.exports = {
			set: p,
			clear: f
		}
	}, function(e, t, n) {
		var r = n(15),
			i = n(55),
			a = n(6)("species");
		e.exports = function(e, t) {
			var n, o = r(e).constructor;
			return void 0 === o || null == (n = r(o)[a]) ? t : i(n)
		}
	}, function(e, t, n) {
		var r = n(16),
			i = n(7),
			a = n(20);
		e.exports = function(e, t) {
			var n = (i.Object || {})[e] || Object[e],
				o = {};
			o[e] = t(n), r(r.S + r.F * a(function() {
				n(1)
			}), "Object", o)
		}
	}, , , , , , , function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(381);
		Object.defineProperty(t, "WebRTCGateWay", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWay
			}
		});
		var i = n(184);
		Object.defineProperty(t, "WebRTCGateWayContext", {
			enumerable: !0,
			get: function() {
				return i.WebRTCGateWayContext
			}
		});
		var a = n(309);
		Object.defineProperty(t, "WebRTCGateWayManager", {
			enumerable: !0,
			get: function() {
				return a.WebRTCGateWayManager
			}
		});
		var o = n(307);
		Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return o.WebRTCGateWayProtocolHandler
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(155);
		Object.defineProperty(t, "WebRTCGateWay", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWay
			}
		}), Object.defineProperty(t, "WebRTCGateWayContext", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWayContext
			}
		}), Object.defineProperty(t, "WebRTCGateWayManager", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWayManager
			}
		}), Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWayProtocolHandler
			}
		});
		var i = n(305);
		Object.defineProperty(t, "MediaDeviceHelper", {
			enumerable: !0,
			get: function() {
				return i.MediaDeviceHelper
			}
		});
		var a = n(304);
		Object.defineProperty(t, "MediaRecordHelper", {
			enumerable: !0,
			get: function() {
				return a.MediaRecordHelper
			}
		});
		var o = n(303);
		Object.defineProperty(t, "AudioHelper", {
			enumerable: !0,
			get: function() {
				return o.AudioHelper
			}
		});
		var s = n(301);
		Object.defineProperty(t, "VideoHelper", {
			enumerable: !0,
			get: function() {
				return s.VideoHelper
			}
		});
		var c = n(299);
		Object.defineProperty(t, "ApiReportHelper", {
			enumerable: !0,
			get: function() {
				return c.ApiReportHelper
			}
		}), Object.defineProperty(t, "LogReportHelper", {
			enumerable: !0,
			get: function() {
				return c.LogReportHelper
			}
		}), Object.defineProperty(t, "StatsReportHelper", {
			enumerable: !0,
			get: function() {
				return c.StatsReportHelper
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(382);
		Object.defineProperty(t, "WebRTC", {
			enumerable: !0,
			get: function() {
				return r.WebRTC
			}
		});
		var i = n(265);
		Object.defineProperty(t, "NRTCAdapter", {
			enumerable: !0,
			get: function() {
				return i.NRTCAdapter
			}
		})
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r, i = n(122),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = function(e, t, n) {
			return t in e ? (0, a.default)(e, t, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : e[t] = n, e
		}
	}, function(e, t, n) {
		var r = n(16);
		r(r.S, "Object", {
			create: n(48)
		})
	}, function(e, t, n) {
		n(159);
		var r = n(7).Object;
		e.exports = function(e, t) {
			return r.create(e, t)
		}
	}, function(e, t, n) {
		e.exports = {
			default: n(160),
			__esModule: !0
		}
	}, function(e, t, n) {
		var r = n(18),
			i = n(15),
			a = function(e, t) {
				if(i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
			};
		e.exports = {
			set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
				try {
					(r = n(36)(Function.call, n(57).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
				} catch(e) {
					t = !0
				}
				return function(e, n) {
					return a(e, n), t ? e.__proto__ = n : r(e, n), e
				}
			}({}, !1) : void 0),
			check: a
		}
	}, function(e, t, n) {
		var r = n(16);
		r(r.S, "Object", {
			setPrototypeOf: n(162).set
		})
	}, function(e, t, n) {
		n(163), e.exports = n(7).Object.setPrototypeOf
	}, function(e, t, n) {
		e.exports = {
			default: n(164),
			__esModule: !0
		}
	}, function(e, t, n) {
		var r = n(16);
		r(r.S + r.F * !n(14), "Object", {
			defineProperty: n(12).f
		})
	}, function(e, t, n) {
		n(166);
		var r = n(7).Object;
		e.exports = function(e, t, n) {
			return r.defineProperty(e, t, n)
		}
	}, , , , , , , , , , , function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4SafariRelease = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, r.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(n(123).AbstractWebRTC);
		t.WebRTC4SafariRelease = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4FirefoxRelease = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, r.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(n(123).AbstractWebRTC);
		t.WebRTC4FirefoxRelease = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC4ChromeRelease = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, r.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(n(123).AbstractWebRTC);
		t.WebRTC4ChromeRelease = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.isMatchVersion = function(e, t) {
			var n = r[e];
			if(!(n && n.length > 0)) return !1;
			return -1 !== n.findIndex(function(e, n) {
				return e === t
			})
		}, t.maxVersion = function(e) {
			var t = r[e];
			if(!(t && t.length > 0)) return -1;
			for(var n = t[0], i = 0, a = t.length; i < a; i++) n = Math.max(n, t[i]);
			return n
		};
		var r = t.RELEASE_VERSION_MAP = {
			chrome: ["65"],
			firefox: ["59"],
			safari: ["11"]
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.getMediaStream = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
				audio: !0,
				video: !0
			};
			return /safari/gi.test(platform.name) && e.video && (e.video = !0), WEBRTCLOG.log("MediaTool: getLocalStream constraint:", JSON.stringify(e, null, " ")), navigator.mediaDevices.getUserMedia(e).then(function(t) {
				if(/Firefox/gi.test(platform.name) && t.getVideoTracks().length > 0) {
					var n = {
							width: {
								max: e.video.width
							},
							height: {
								max: e.video.height
							},
							advanced: [{
								width: e.video.width,
								height: e.video.height
							}]
						},
						r = t.getVideoTracks()[0];
					return WEBRTCLOG.warn("MediaTool:constraints:", n), r.applyConstraints(n).then(function() {
						return WEBRTCLOG.warn("变更视频流成功: ", t), Promise.resolve(t)
					}).catch(function(e) {
						WEBRTCLOG.error("变更视频流失败，", e);
						var t = {
							event: e
						};
						return Promise.reject(t)
					})
				}
				return Promise.resolve(t)
			}).catch(function(e) {
				var t = {
					event: e
				};
				return Promise.reject(t)
			})
		}, t.getScreenStream = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
				audio: !0,
				video: !0
			};
			WEBRTCLOG.log("MediaTool: getLocalStream constraint:", JSON.stringify(e, null, " "));
			var t = Promise.resolve(),
				n = {
					video: {
						cursor: "always",
						displaySurface: "monitor"
					},
					audio: {
						echoCancellation: !0,
						noiseSuppression: !0,
						sampleRate: 44100
					}
				};
			return navigator.mediaDevices.getDisplayMedia ? t = navigator.mediaDevices.getDisplayMedia : navigator.getDisplayMedia ? t = navigator.getDisplayMedia : (n = {
				video: {
					mediaSource: "screen"
				}
			}, t = navigator.mediaDevices.getUserMedia), t(n).then(function(e) {
				return Promise.resolve(e)
			}).catch(function(e) {
				var t = {
					event: e
				};
				return Promise.reject(t)
			})
		}, t.removeTrackFromMediaStream = function(e) {
			if(e) {
				var t = e.getTracks();
				t && 0 !== t.length && t.forEach(function(t) {
					WEBRTCLOG.log("stop track", e.id), t.stop(), e.removeTrack(t)
				})
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractProtocolHandler = void 0;
		var r = a(n(1)),
			i = a(n(4));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var o = function() {
			function e() {
				(0, r.default)(this, e)
			}
			return(0, i.default)(e, [{
				key: "pack",
				value: function(e, t) {
					WEBRTCLOG.error("AbstractProtocolHandler:pack 需要子类实现")
				}
			}, {
				key: "unpack",
				value: function(e) {
					WEBRTCLOG.error("AbstractProtocolHandler:unpack 需要子类实现")
				}
			}]), e
		}();
		t.AbstractProtocolHandler = o
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayContext = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				n.uid = "" + n.uid, n.cid = "" + n.cid;
				var a = e.hasAudio,
					o = e.hasVideo,
					s = e.netDetect,
					c = e.session_mode,
					d = e.params,
					u = e.browser,
					l = e.bypass_rtmp,
					p = e.record;
				return n.hasAudio = a, n.hasVideo = o, n.netDetect = s, n.session_mode = c, n.params = d, n.browser = u, n.bypass_rtmp = l, n.record = p, n
			}
			return(0, a.default)(t, e), t
		}(n(310).AbstractGateWayContext);
		t.WebRTCGateWayContext = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractAdapter = void 0;
		var r = m(n(1)),
			i = m(n(4)),
			a = m(n(3)),
			o = m(n(2)),
			s = n(10),
			c = n(156),
			d = n(22),
			u = n(78),
			l = n(295),
			p = n(275),
			f = n(31),
			h = n(157);

		function m(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var v = n(266),
			_ = function(e) {
				function t(e) {
					(0, r.default)(this, t);
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return n._reset(), n.adapterRef.system = u.RtcSupport.checkVersion(), n.adapterRef.container = e.container, n.adapterRef.remoteContainer = e.remoteContainer, n.adapterRef.chromeId = e.chromeId, n.adapterRef.isPrivateDeployment = !1, n.adapterRef.privateDeploymentConf = null, n.adapterRef.debug = e.debug, n.adapterRef.mixVideoConf = null, n.adapterRef.nim = e.nim, n.apiList = e.apiList, n.sdkRef = e.ref, n.channelId = null, window.WEBRTCLOG = new v({
						debug: e.debug,
						prefix: "WEBRTC"
					}), n._init(), n
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this._resetGlobalParam(), this._resetSDKParam(), this._resetBusinessParam(), this._resetHelperParam(), this._resetApiParam(), this._resetStateParam()
					}
				}, {
					key: "_resetGlobalParam",
					value: function() {
						this.apiList = [], this.sdkRef = null, this.adapterRef = {}
					}
				}, {
					key: "_resetSDKParam",
					value: function() {
						this.adapterRef.container = null, this.adapterRef.remoteContainer = null, this.adapterRef.chromeId = null, this.adapterRef.debug = !1, this.adapterRef.nim = null
					}
				}, {
					key: "_resetBusinessParam",
					value: function() {
						this.adapterRef.webrtcGateWayBusiness = null, this.adapterRef.deviceBusiness = null, this.adapterRef.webrtcBusiness = null
					}
				}, {
					key: "_resetHelperParam",
					value: function() {
						this.adapterRef.mediaRecordHelper = null, this.adapterRef.system = null
					}
				}, {
					key: "_resetApiParam",
					value: function() {
						this.adapterRef.deviceApi = null, this.adapterRef.playApi = null, this.adapterRef.recordApi = null, this.adapterRef.commonApi = null, this.adapterRef.meeting4NRTCApi = null, this.adapterRef.meeting4WebRTCApi = null, this.adapterRef.captureApi = null, this.adapterRef.p2p4WebRTCApi = null
					}
				}, {
					key: "_resetStateParam",
					value: function() {
						var e = this;
						this.adapterRef.imInfo = null, this.adapterRef.monitorRemoteStreamStartTime = null, this.adapterRef.userJoinTimeoutId = null, this.adapterRef.audioHelperMap = {}, this.adapterRef.videoHelperMap = {}, this.adapterRef.signalInited = !1, this.adapterRef.needQueryAccountMap = {}, this.adapterRef.account4UidMap = {}, this.adapterRef.uid4AccountMap = {}, this.adapterRef.isCaller = !1, this.adapterRef.calling = !1, this.adapterRef.callee = null, this.adapterRef.channelId = null, this.adapterRef.type = null, this.adapterRef.beCalledInfo = null, this.adapterRef.callerInfo = null, this.adapterRef.target = {
							account: null,
							uid: null
						}, this.adapterRef.callAccepted = !1, this.adapterRef.sessionMode = null, this.adapterRef.state = {
							lastDeviceStatus: {
								audio: {
									type: null,
									device: null
								},
								video: {
									type: null,
									device: null
								}
							},
							audioDeviceHasOpened: !1,
							videoDeviceHasOpened: !1,
							chromeScreenShareOpened: !1,
							isFirstOpenMediaDevice: !0,
							rtcConnected: !1,
							startSessionTime: null,
							endSessionTime: null
						}, this.adapterRef.reconnectState ? (this.adapterRef.reconnectState.count = 0, this.adapterRef.reconnectState.isReconnect = !1, setTimeout(function() {
							e.adapterRef.reconnectState && e.adapterRef.reconnectState.wssTime && clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.isStoped = !1
						}, 300)) : this.adapterRef.reconnectState = {
							count: 0,
							isReconnect: !1,
							startReconnect: !1,
							isStoped: !1,
							wssTime: null
						}
					}
				}, {
					key: "_resetParamNeededByReConnect",
					value: function() {
						this.adapterRef.webrtcBusiness._destroyRtcSelf(), this.doDestroyRemoteResourceByUid(), this.apiList = [], this.adapterRef.container = null, this.adapterRef.remoteContainer = null, this.adapterRef.debug = !1, this._doDestroyBusinessObjects(), this._resetHelperParam(), this.adapterRef.playApi = null, this.adapterRef.recordApi = null, this.adapterRef.commonApi = null, this.adapterRef.meeting4NRTCApi = null, this.adapterRef.meeting4WebRTCApi = null, this.adapterRef.captureApi = null, this.adapterRef.p2p4WebRTCApi = null, this.adapterRef.monitorRemoteStreamStartTime = null, this.adapterRef.userJoinTimeoutId = null, this.adapterRef.reconnectState.isReconnect = !1, this.adapterRef.statsReportHelper = null, this.adapterRef.logReportHelper = null
					}
				}, {
					key: "_init",
					value: function() {
						this._initBindEvents(), this._initBusiness(), this._initHelper(), this._initApi()
					}
				}, {
					key: "_initBindEvents",
					value: function() {
						var e = this;
						this.on("leaveChannel", function() {
							1 == e.adapterRef.mediaRecordHelper.checkIsRecording() && (WEBRTCLOG.log("对端离开：正在录制远端视频，即将停止"), e.adapterRef.mediaRecordHelper.uid != e.adapterRef.imInfo.uid && e.adapterRef.mediaRecordHelper.stop())
						})
					}
				}, {
					key: "_initBusiness",
					value: function() {
						this._initWebRTCGateWayBusiness(), this._initDeviceBusiness(), this._initWebRTCBusiness()
					}
				}, {
					key: "_initHelper",
					value: function() {
						this._initMediaRecordHelper()
					}
				}, {
					key: "_initApi",
					value: function() {
						this._initDeviceApi(), this._initPlayApi(), this._initRecordApi(), this._initCommonApi(), this._initMeeting4NRTCApi(), this._initCaptureApi(), this._initMeeting4WebRTCApi(), this._initP2P4WebRTCApi()
					}
				}, {
					key: "_initWebRTCGateWayBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initWebRTCGateWayBusiness 初始化webrtc网关业务处理器..."), this.adapterRef.webrtcGateWayBusiness ? WEBRTCLOG.log("AbstractAdapter:_initWebRTCGateWayBusiness 已存在的WebRTC网关业务处理器，不重复创建...") : this.adapterRef.webrtcGateWayBusiness = new l.WebRTCGateWayBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initDeviceBusiness",
					value: function() {
						this._isWeixinBrowser() || (WEBRTCLOG.log("AbstractAdapter:_initDeviceBusiness 初始化设备业务处理器..."), this.adapterRef.deviceBusiness ? WEBRTCLOG.log("AbstractAdapter:_initDeviceBusiness 已存在的设备业务处理器，不重复创建...") : this.adapterRef.deviceBusiness = new l.DeviceBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						}))
					}
				}, {
					key: "_initWebRTCBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initWebRTCBusiness"), this.adapterRef.webrtcBusiness ? WEBRTCLOG.log("已存在的webrtcBusiness对象，不需要重复创建...") : this.adapterRef.webrtcBusiness = new l.WebRTCBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initIMBusiness",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initIMBusiness"), this.adapterRef.imBusiness ? WEBRTCLOG.log("已存在的imBusiness对象，不需要重复创建...") : this.adapterRef.imBusiness = new l.IMBusiness({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_getWebRTCGateWayManager",
					value: function() {
						return this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
					}
				}, {
					key: "_getAudioHelperByUid",
					value: function(e) {
						e = "" + e;
						var t = this.adapterRef.audioHelperMap[e];
						return this.adapterRef.imInfo ? (t || (t = new c.AudioHelper({
							uid: e,
							isRemote: this.adapterRef.imInfo.uid != e,
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}), this.adapterRef.audioHelperMap[e] = t), t) : (WEBRTCLOG.error("不存在的imInfo信息对象，直接返回"), null)
					}
				}, {
					key: "_getVideoHelperByUid",
					value: function(e) {
						e = "" + e;
						var t = this.adapterRef.videoHelperMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getVideoHelperByUid 获取videoHelper uid=%o", e), t || (t = new c.VideoHelper({
							uid: e,
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}), this.adapterRef.videoHelperMap[e] = t), t
					}
				}, {
					key: "_updateRtc",
					value: function() {
						var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
						return WEBRTCLOG.log("AbstractAdapter:_updateRtc isUpdate=%s ", e), this.adapterRef.instance._isPlayer() || this.adapterRef.webrtcBusiness.selfWebRtcInstance ? (this.selfWebRtcInstance || this.adapterRef.webrtcBusiness._initWebRTCInstance4Self(!0), this.adapterRef.webrtcBusiness.selfWebRtcInstance && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.localDescription && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.getSenders().length > 0 && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && "connected" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && "completed" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState ? (WEBRTCLOG.log("update rtc later"), Promise.resolve()) : (this.adapterRef.webrtcBusiness._updateRtcStream(), this.adapterRef.webrtcBusiness._createOffer({
							isUpdate: e
						}))) : (WEBRTCLOG.warn("AbstractAdapter:_updateRtc 非互动者并且自己的RTC实例不存在，直接返回..."), Promise.resolve())
					}
				}, {
					key: "_initDeviceApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initDeviceApi"), this.adapterRef.deviceApi ? WEBRTCLOG.log("deviceApi已初始化，不用重复创建...") : this.adapterRef.deviceApi = new p.DeviceApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initPlayApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initPlayApi"), this.adapterRef.playApi ? WEBRTCLOG.log("playApi已初始化，不用重复创建...") : this.adapterRef.playApi = new p.PlayApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initRecordApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initRecordApi"), this.adapterRef.recordApi ? WEBRTCLOG.log("recordApi已初始化，不用重复创建...") : this.adapterRef.recordApi = new p.RecordApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initCommonApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initCommonApi"), this.adapterRef.commonApi ? WEBRTCLOG.log("commonApi已初始化，不用重复创建...") : this.adapterRef.commonApi = new p.CommonApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initMeeting4NRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMeeting4NRTCApi"), this.adapterRef.meeting4NRTCApi ? WEBRTCLOG.log("meeting4NRTCApi已初始化，不用重复创建...") : this.adapterRef.meeting4NRTCApi = new p.Meeting4NRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initCaptureApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initCaptureApi"), this.adapterRef.captureApi ? WEBRTCLOG.log("captureApi已初始化，不用重复创建...") : this.adapterRef.captureApi = new p.CaptureApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initMeeting4WebRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMeeting4WebRTCApi"), this.adapterRef.meeting4WebRTCApi ? WEBRTCLOG.log("meeting4WebRTCApi已初始化，不用重复创建...") : this.adapterRef.meeting4WebRTCApi = new p.Meeting4WebRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initP2P4WebRTCApi",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initP2P4WebRTCApi"), this.adapterRef.p2p4WebRTCApi ? WEBRTCLOG.log("p2p4WebRTCApi已初始化，不用重复创建...") : this.adapterRef.p2p4WebRTCApi = new p.P2P4WebRTCApi({
							adapterRef: this.adapterRef,
							sdkRef: this.sdkRef
						})
					}
				}, {
					key: "_initApiReportHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initApiReportHelper 初始化数据上报管理器 ..."), this.adapterRef.apiReportHelper || (this.adapterRef.apiReportHelper = new c.ApiReportHelper({
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef,
							platform: d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE]
						}))
					}
				}, {
					key: "_initLogReportHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initLogReportHelper 初始化数据上报管理器 ..."), this.adapterRef.logReportHelper || (this.adapterRef.logReportHelper = new c.LogReportHelper)
					}
				}, {
					key: "_initStatsReportHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initStatsReportHelper 初始化数据上报管理器 ..."), this.adapterRef.statsReportHelper || (this.adapterRef.statsReportHelper = new c.StatsReportHelper({
							sdkRef: this.sdkRef,
							adapterRef: this.adapterRef
						}))
					}
				}, {
					key: "_initMediaRecordHelper",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_initMediaRecordHelper 初始化媒体录制管理器 ..."), this.adapterRef.mediaRecordHelper ? WEBRTCLOG.log("已存在的mediaRecordHelper对象，不需要重复...") : this.adapterRef.mediaRecordHelper = new c.MediaRecordHelper
					}
				}, {
					key: "doClearAfterRemoteLeave",
					value: function(e) {
						this.doDestroyRemoteResourceByUid(e), this.adapterRef.mediaRecordHelper && this.adapterRef.mediaRecordHelper.leave({
							uid: e
						})
					}
				}, {
					key: "doDestroyRemoteResourceByUid",
					value: function(e) {
						var t = this;
						if(WEBRTCLOG.log("AbstractAdapter:doDestroyRemoteResourceByUid uid=%o", e), e) return this._doDestroyRemoteRtcByUid(e), this._doDestroyRemoteMediaStreamByUid(e), void this._doDestroyMediaHelperByUid(e);
						var n = [],
							r = Object.keys(this.adapterRef.videoHelperMap),
							i = Object.keys(this.adapterRef.audioHelperMap);
						0 != r.length ? n = r : 0 != i.length && (n = i), n.map(function(e) {
							t.adapterRef.imInfo && t.adapterRef.imInfo.uid != e && (t._doDestroyRemoteRtcByUid(e), t._doDestroyRemoteMediaStreamByUid(e), t._doDestroyMediaHelperByUid(e))
						})
					}
				}, {
					key: "_doDestroyRemoteRtcByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyRemoteRtcByUid uid=%o", e), e ? this.adapterRef.webrtcBusiness ? this.adapterRef.webrtcBusiness._destroyRtcByUid(e) : WEBRTCLOG.warn("不存在的webrtcBusiness对象，直接返回") : WEBRTCLOG.warn("不存在uid=%s，直接返回", e)
					}
				}, {
					key: "_doDestroyRemoteMediaStreamByUid",
					value: function(e) {
						if(WEBRTCLOG.log("AbstractAdapter:_doDestroyRemoteMediaStreamByUid uid=%o", e), e) {
							var t = this._getAudioHelperByUid(e);
							t && t.remoteAudioStream && (t.removeTrackFromMediaStream(t.remoteAudioStream), this.adapterRef.webrtcBusiness.switchTrackEvent({
								stream: t.remoteAudioStream,
								uid: e,
								bindTrackEvent: !1
							}), t.remoteAudioStream = null);
							var n = this._getVideoHelperByUid(e);
							n && n.remoteVideoStream && (n.removeTrackFromMediaStream(n.remoteVideoStream), this.adapterRef.webrtcBusiness.switchTrackEvent({
								stream: n.remoteVideoStream,
								uid: e,
								bindTrackEvent: !1
							}), n.remoteVideoStream = null)
						} else WEBRTCLOG.error("不存在uid=%s，直接返回", e)
					}
				}, {
					key: "_isFirefox",
					value: function() {
						return /Firefox/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isChrome",
					value: function() {
						return /Chrome/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isSafari",
					value: function() {
						return /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent)
					}
				}, {
					key: "_isMobileSafari",
					value: function() {
						return this._isSafari() && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
					}
				}, {
					key: "_isWeixinBrowser",
					value: function() {
						return /micromessenger/.test(navigator.userAgent.toLowerCase())
					}
				}, {
					key: "_isFirefoxMoreThan59",
					value: function() {
						return this._isFirefox() && this.adapterRef.system.version >= 59
					}
				}, {
					key: "_isFirefoxLessThan59",
					value: function() {
						return this._isFirefox() && this.adapterRef.system.version < 59
					}
				}, {
					key: "_doRemoteStream",
					value: function(e, t, n) {
						this._isFirefox() ? this._doRemoteStream4Firefox(e, t, n) : this._doRemoteStream4Other(e, t, n)
					}
				}, {
					key: "_doRemoteStream4Firefox",
					value: function(e, t, n) {
						if(e)
							if(this.adapterRef.imInfo.netDetect) WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Firefox 网络探测...");
							else {
								var r = this._getAudioHelperByUid(t),
									i = this._getVideoHelperByUid(t);
								if(this.adapterRef.webrtcBusiness.getRtcObject(t))
									if(n) {
										WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Firefox remote stream uid: %s, track num: %d " + t + " " + e.getTracks().length);
										var a = e.getAudioTracks()[0],
											o = e.getVideoTracks()[0];
										a && r.setIsRemote(!0).composeTrack(t, a), o && i.setIsRemote(!0).composeTrack(t, o), this.emit(d.RTC_EVENTS.remoteTrack.key, {
											uid: t,
											account: this._getAccountByUid(t),
											track: n
										})
									} else WEBRTCLOG.warn("不存在的轨道...");
								else WEBRTCLOG.error("不存在的远程rtc对象 , track")
							}
						else WEBRTCLOG.error("AbstractAdapter:_doRemoteStream4Firefox 远程流不存在...")
					}
				}, {
					key: "_doRemoteStream4Other",
					value: function(e, t, n) {
						if(e)
							if(this.adapterRef.imInfo.netDetect) WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Other 网络探测...");
							else {
								WEBRTCLOG.log("AbstractAdapter:_doRemoteStream4Other remote stream uid: %s, track num: %d", t, e.getTracks().length), e.getTracks().forEach(function(e) {
									WEBRTCLOG.log("--\x3e track kind=%s, id=%s , %o", e.kind, e.id, e)
								});
								var r = e.getAudioTracks()[0],
									i = e.getVideoTracks()[0];
								r && this._getAudioHelperByUid(t).setIsRemote(!0).composeTrack(t, r), i && this._getVideoHelperByUid(t).setIsRemote(!0).composeTrack(t, i), this.adapterRef.webrtcBusiness.switchTrackEvent({
									stream: e,
									uid: t
								}), r && this.emit(d.RTC_EVENTS.remoteTrack.key, {
									uid: t,
									account: this._getAccountByUid(t),
									track: r
								}), i && this.emit(d.RTC_EVENTS.remoteTrack.key, {
									uid: t,
									account: this._getAccountByUid(t),
									track: i
								})
							}
						else WEBRTCLOG.error("AbstractAdapter:_doRemoteStream4Other 远程流不存在...")
					}
				}, {
					key: "_setSessionConfig",
					value: function(e) {
						this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig = Object.assign(this.adapterRef.imInfo.sessionConfig, e), WEBRTCLOG.log("AbstractAdapter:_setSessionConfig value ", JSON.stringify(this.adapterRef.imInfo, null, " "))
					}
				}, {
					key: "_setSessionVideoQuality",
					value: function(e) {
						this._validateVideoQuality(e) ? (this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig.videoQuality = e) : WEBRTCLOG.error("AbstractAdapter:_setSessionVideoQuality 非法值：%d", e)
					}
				}, {
					key: "_setSessionVideoFrameRate",
					value: function(e) {
						this._validateVideoFrameRate(e) ? (this.adapterRef.imInfo || (WEBRTCLOG.log("不存在的imInfo，初始化..."), this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig || (WEBRTCLOG.log("不存在的imInfo.sessionConfig，初始化..."), this.adapterRef.imInfo.sessionConfig = {}), this.adapterRef.imInfo.sessionConfig.videoFrameRate = e) : WEBRTCLOG.error("AbstractAdapter:_setSessionVideoFrameRate 非法值：%d", e)
					}
				}, {
					key: "_startSession",
					value: function() {
						WEBRTCLOG.log("待校验的imInfo: %o", this.adapterRef.imInfo), this.adapterRef.imInfo.cid = this.adapterRef.imInfo.cid || this.adapterRef.imInfo.channelId, this.channelId = this.adapterRef.imInfo.cid, this.adapterRef.imInfo.sessionMode = this.adapterRef.imInfo.sessionMode || d.SESSION_MODE.P2P, this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.constructor === String && (this.adapterRef.imInfo.serverMap = JSON.parse(this.adapterRef.imInfo.serverMap)), this.adapterRef.instance.constructor === h.NRTCAdapter || this.adapterRef.imInfo.netDetect ? (WEBRTCLOG.log("NRTCAdapter实例 额外校验字段..."), f.tool.verifyOptions(this.adapterRef.imInfo, "appkey cid uid token sessionMode wssArr")) : this.adapterRef.imInfo.token = this.adapterRef.imInfo.cid, this.adapterRef.imInfo.sessionConfig.videoQuality == d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL && (this.adapterRef.imInfo.sessionConfig.videoQuality = d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_480P);
						var e = this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig).quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality;
						WEBRTCLOG.log("maxQuality:", e, ", quality:", this.adapterRef.imInfo.sessionConfig.videoQuality), this.adapterRef.imInfo.sessionConfig.videoQuality > e && (this.adapterRef.imInfo.sessionConfig.videoQuality = e), WEBRTCLOG.log("quality:", this.adapterRef.imInfo.sessionConfig.videoQuality);
						var t = this.sdkRef.getVideoSessionConfig({
							quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
							frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
						});
						if(this.adapterRef.imInfo = Object.assign(this.adapterRef.imInfo, {
								videoConfig: t
							}), WEBRTCLOG.log("启动会话后的imInfo: ", JSON.stringify(this.adapterRef.imInfo, null, " ")), this._init(), this._initStatsReportHelper(), this._initApiReportHelper(), this._initLogReportHelper(), this.adapterRef.statsReportHelper.startStats(), this.adapterRef.logReportHelper.uploadData("sessionInfo", this.adapterRef.imInfo), this.adapterRef.apiReportHelper.uploadDataApi("start", {
								uid: this.adapterRef.imInfo.uid
							}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "meeting"
							}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: this.adapterRef.imInfo.sessionMode
							}), this.adapterRef.imInfo.sessionConfig.recordAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_audio"
							}), this.adapterRef.imInfo.sessionConfig.recordVideo && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_video"
							}), this.adapterRef.imInfo.sessionConfig.singleRecord && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "server_record_single_user"
							}), this.adapterRef.imInfo.sessionConfig.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "hd_audio"
							}), void 0 !== this.adapterRef.imInfo.sessionConfig.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "fps",
								ext: 0 == +this.adapterRef.imInfo.sessionConfig.videoFrameRate ? 0 : +this.adapterRef.imInfo.sessionConfig.videoFrameRate + 1
							}), this.adapterRef.imInfo.sessionConfig.liveEnable && this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "bypass",
								ext: void 0 !== this.adapterRef.imInfo.sessionConfig.splitMode ? +this.adapterRef.imInfo.sessionConfig.splitMode + 1 : 0
							}), void 0 !== this.adapterRef.imInfo.sessionConfig.videoQuality) {
							var n = +this.adapterRef.imInfo.sessionConfig.videoQuality;
							n === d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? n = d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : n === d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (n = d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
								key: "video_quality",
								ext: n || 0
							})
						}
						return this.adapterRef.webrtcGateWayBusiness.doTryInit()
					}
				}, {
					key: "_stopSession",
					value: function() {
						return this._stopAllDataUpload(), this._stopIfInRecording(), this._resetStatus(), Promise.resolve()
					}
				}, {
					key: "_stopAllDataUpload",
					value: function() {
						this.adapterRef.statsReportHelper ? this.adapterRef.statsReportHelper.stopStats() : WEBRTCLOG.log("AbstractAdapter: _stopSession: 已停止stats统计，请勿重复！"), this.adapterRef.apiReportHelper ? this.adapterRef.apiReportHelper.uploadDataApi("send") : WEBRTCLOG.log("AbstractAdapter: _stopSession: 已停止api统计，请勿重复！"), this.adapterRef.logReportHelper ? this.adapterRef.logReportHelper.uploadData("send") : WEBRTCLOG.log("AbstractAdapter: _stopSession: 已停止log统计，请勿重复！")
					}
				}, {
					key: "_doDestroyLocalMediaStream",
					value: function() {
						this._doDestroyLocalMediaStream4Audio(), this._doDestroyLocalMediaStream4Video()
					}
				}, {
					key: "_doDestroyLocalMediaStream4Audio",
					value: function() {
						var e = this._getAudioHelperByUid(this.adapterRef.imInfo.uid);
						e && e.localAudioStream && (e.localAudioStream = null)
					}
				}, {
					key: "_doDestroyLocalMediaStream4Video",
					value: function() {
						var e = this._getVideoHelperByUid(this.adapterRef.imInfo.uid);
						e && e.localVideoStream && (e.localVideoStream = null)
					}
				}, {
					key: "_stopIfInRecording",
					value: function() {
						!0 === this._checkIsInRecording() && this.adapterRef.mediaRecordHelper.stop()
					}
				}, {
					key: "_checkIsInRecording",
					value: function() {
						return !(!this.adapterRef.mediaRecordHelper || !0 !== this.adapterRef.mediaRecordHelper.checkIsRecording())
					}
				}, {
					key: "_isDetectNetworkOfselfWebRtcConnected",
					value: function() {
						if(this.adapterRef && this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.selfWebRtcInstance && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection) return this.adapterRef && this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.selfWebRtcInstance && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && ("completed" == this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState || "connected" == this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState)
					}
				}, {
					key: "_isDetectNetworkOfremoteWebRtcConnected",
					value: function() {
						if(this.adapterRef && this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.remoteWebRtcInstanceMap) {
							var e = this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(this.adapterRef.imInfo.remoteUid);
							if(e && e.rtcConnection) return e.rtcConnection && ("completed" == e.rtcConnection.iceConnectionState || "connected" == e.rtcConnection.iceConnectionState)
						}
						return !1
					}
				}, {
					key: "_isDetectNetwork",
					value: function() {
						return this._isDetectNetworkOfselfWebRtcConnected() && this._isDetectNetworkOfremoteWebRtcConnected()
					}
				}, {
					key: "_resetStatus",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_resetStatus"), this.adapterRef.imInfo && this.adapterRef.imInfo.uid && (this._getVideoHelperByUid(this.adapterRef.imInfo.uid).destroy(), this.adapterRef.deviceApi.stopDevice(d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN), this.adapterRef.deviceApi.stopDevice(d.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this._doDestroyLocalMediaStream()), this.doDestroyRemoteResourceByUid(), this._doDestroyBusinessObjects(), this._doDestroyApiObjects(), this._doDestroyHelperObjects(), this._resetStateParam()
					}
				}, {
					key: "_doDestroyBusinessObjects",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyBusinessObjects 销毁Business类子对象 "), this.adapterRef.webrtcGateWayBusiness && (this.adapterRef.webrtcGateWayBusiness.destroy(), this.adapterRef.webrtcGateWayBusiness = null), this.adapterRef.deviceBusiness && (this.adapterRef.deviceBusiness.destroy(), this.adapterRef.deviceBusiness = null), this.adapterRef.webrtcBusiness && (this.adapterRef.webrtcBusiness.destroy(), this.adapterRef.webrtcBusiness = null)
					}
				}, {
					key: "_doDestroyApiObjects",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyApiObjects 销毁Api类子对象 ")
					}
				}, {
					key: "_doDestroyHelperObjects",
					value: function() {
						WEBRTCLOG.log("AsbtractAdapter:_doDestroyHelperObjects 销毁helper类子对象"), this.adapterRef.statsReportHelper && (this.adapterRef.statsReportHelper = null), this.adapterRef.logReportHelper && (this.adapterRef.logReportHelper = null)
					}
				}, {
					key: "_doDestroyMediaHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyMediaHelperByUid uid=%o", e), this._doDestroyAudioHelperByUid(e), this._doDestroyVideoHelperByUid(e)
					}
				}, {
					key: "_doDestroyAudioHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyAudioHelperByUid uid=%o", e);
						var t = this.adapterRef.audioHelperMap[e];
						t && (t.destroy(), t = null), delete this.adapterRef.audioHelperMap[e]
					}
				}, {
					key: "_doDestroyVideoHelperByUid",
					value: function(e) {
						WEBRTCLOG.log("AbstractAdapter:_doDestroyVideoHelperByUid uid=%o", e);
						var t = this.adapterRef.videoHelperMap[e];
						t && (t.destroy(), t = null), delete this.adapterRef.videoHelperMap[e]
					}
				}, {
					key: "_isPlayer",
					value: function() {
						return this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.MEETING && this.adapterRef.imInfo.role === d.ROLE_FOR_MEETING.ROLE_PLAYER || this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P
					}
				}, {
					key: "_getUidByAccount",
					value: function(e) {
						var t = this.adapterRef.account4UidMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getUidByAccount " + e + " => " + t), t
					}
				}, {
					key: "_getAccountByUid",
					value: function(e) {
						var t = this.adapterRef.uid4AccountMap[e];
						return WEBRTCLOG.log("AbstractAdapter:_getAccountByUid " + e + " => " + t), t
					}
				}, {
					key: "_convertToUidIfAccout",
					value: function(e) {
						var t = e;
						return d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] === d.CONFIG_MAP.SDK_TYPE.WEBRTC && (t = this.adapterRef.instance._getUidByAccount(e)), t
					}
				}, {
					key: "_validateVideoQuality",
					value: function(e) {
						return(0, d.validateVideoQuality)(e)
					}
				}, {
					key: "_validateVideoFrameRate",
					value: function(e) {
						return(0, d.validateVideoFrameRate)(e)
					}
				}, {
					key: "_onSignalTimeout",
					value: function(e) {
						this.adapterRef.webrtcGateWayBusiness && this.adapterRef.webrtcGateWayBusiness._onSignalTimeout ? (WEBRTCLOG.log("AbstractAdapter: _onSignalTimeout 网络断开了!"), this.adapterRef.webrtcGateWayBusiness._onSignalTimeout()) : WEBRTCLOG.log("AbstractAdapter: _onSignalTimeout _onSignalTimeout undefined！")
					}
				}, {
					key: "judgeSendSdpOfferOrUpdate",
					value: function() {
						WEBRTCLOG.log("judgeSendSdpOfferOrUpdate"), 1 == this.adapterRef.state.isFirstOpenMediaDevice ? (this.adapterRef.instance._updateRtc(!1), this.adapterRef.state.isFirstOpenMediaDevice = !1) : this.adapterRef.instance._updateRtc(!0)
					}
				}, {
					key: "checkExist",
					value: function(e) {
						return !!this[e]
					}
				}, {
					key: "setStartSessionTime",
					value: function() {
						this.adapterRef.state.startSessionTime = Date.now()
					}
				}, {
					key: "setEndSessionTime",
					value: function() {
						if(this.adapterRef.state.startSessionTime) {
							this.adapterRef.state.endSessionTime = Date.now();
							var e = this.adapterRef.state.endSessionTime - this.adapterRef.state.startSessionTime;
							this.emit(d.RTC_EVENTS.sessionDuration.key, e), this.adapterRef.state.startSessionTime = 0, this.adapterRef.state.endSessionTime = 0
						} else WEBRTCLOG.log("AbstractGateWay:send ->", "没有通话开始时间异常")
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("AbstractAdapter:destroy"), this._doDestroyBusinessObjects(), this._doDestroyApiObjects(), this._doDestroyHelperObjects(), this._reset()
					}
				}]), t
			}(s.EventEmitter);
		t.AbstractAdapter = _
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = {
				framesEncoded: 1,
				qpSum: 1,
				audioOutputLevel: 1,
				googDecodingCTN: 1,
				googDecodingNormal: 1,
				googAvailableSendBandwidth: 1,
				googTargetEncBitrate: 1,
				googActualEncBitrate: 1,
				googRetransmitBitrate: 1,
				googTransmitBitrate: 1
			},
			i = {
				googCaptureStartNtpTimeMs: 1
			};
		t.default = {
			getStats: function(e) {
				var t = this;
				if(e && !/(failed|closed)/gi.test(e.iceConnectionState)) return navigator.mozGetUserMedia ? this.getStatsFirefox(e) : /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent) ? this.getStatsSafari(e) : new Promise(function(n, r) {
					e.getStats(function(r) {
						var i = {};
						r.result().forEach(function(e) {
							var t = {};
							e.names().forEach(function(n) {
								t[n] = e.stat(n)
							}), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, i[t.id] = t
						}), e.lastStats = e.lastStats || {}, i = t.format(e, i), n(i)
					})
				})
			},
			getStatsFirefox: function(e) {
				var t = this;
				return e.getStats(null).then(function(n) {
					return e.lastStats = e.lastStats || {}, n = t.format(e, n), Promise.resolve(n)
				})
			},
			getStatsSafari: function(e) {
				var t = this;
				return e.getStats().then(function(n) {
					return e.lastStats = e.lastStats || {}, n = t._formatSSRC_S(e, n), Promise.resolve(n)
				})
			},
			format: function(e, t) {
				return !e || /(failed|closed)/gi.test(e.iceConnectionState) ? {} : t = parseInt(e.uid) - parseInt(e.targetUid) == 0 ? this.ssrcLocal(e, t) : this.ssrcRemote(e, t)
			},
			formatSSRC: function(e, t, n, r) {
				return this[navigator.mozGetUserMedia ? "_formatSSRC_F" : "_formatSSRC_G"](e, t, n, r)
			},
			_formatSSRC_G: function(e, t, n, r) {
				var i = this,
					a = {};
				return Object.values(t).map(function(t) {
					if(("recv" !== r || /^ssrc_/gi.test(t.id)) && ("send" !== r || /^(bweforvideo|Conn-audio-1-0|ssrc_)/gi.test(t.id))) {
						t = i.formatData(t);
						var n = new RegExp("ssrc_(\\d+)_" + r),
							o = t.id.match(n),
							s = t.id;
						a[s] = t, o && o[1] && ("recv" !== r || 0 !== e.uid ? (t.id = "ssrc_" + e.uid + "_" + r + "_" + ("recv" === r ? e.targetUid : 0) + "_" + t.mediaType, -1 == (t = i.computeData(e, t)).googInterframeDelayMax && (t.googInterframeDelayMax = 0), a[t.id] = t, delete a[s]) : delete a[s])
					}
				}), a
			},
			_formatSSRC_F: function(e, t, n, r) {
				var i = this,
					a = {},
					o = new RegExp("^" + ("send" === r ? "outbound" : "inbound") + "_", "i");
				return Object.values(t).map(function(t) {
					if(o.test(t.id)) {
						var n = t.id;
						t.id = t.id.replace(/\d+/, e.uid + "_" + r + "_" + ("recv" === r ? e.targetUid : 0)), t = i.computeData(e, t), a[t.id] = t, delete a[n]
					}
				}), a
			},
			_formatSSRC_S: function(e, t) {
				var n = this,
					r = {},
					i = null;
				return t.forEach(function(t) {
					if("inbound-rtp" === t.type || "inboundrtp" === t.type) {
						if(-1 != t.id.indexOf("Video")) {
							var a = "ssrc_" + ((t = n.computeData(e, t)).ssrc || "123456") + "_recv_0_video";
							i = a, r[a] = {}, r[a].bitsReceivedPerSecond = t.bitsReceivedPerSecond || 0, r[a].bytesReceived = t.bytesReceived || 0, r[a].packetsLost = t.packetsLost || 0, r[a].packetsReceived = t.packetsReceived || 0, r[a].packetsReceivedPerSecond = t.packetsReceivedPerSecond || 0, r[a].framesDecoded = t.framesDecoded || 0, r[a].googFrameRateOutput = t.framesDecoded || 0
						}
					} else if("outbound-rtp" === t.type || "outboundrtp" === t.type) {
						if(-1 != t.id.indexOf("Video")) {
							var o = "ssrc_" + ((t = n.computeData(e, t)).ssrc || "123456") + "_send_0_video";
							r[o] = {}, r[o].bitsSentPerSecond = t.bitsSentPerSecond || 0, r[o].bytesSent = t.bytesSent || 0, r[o].packetsLost = t.packetsLost || 0, r[o].packetsSent = t.packetsSent || 0, r[o].packetsSentPerSecond = t.packetsSentPerSecond || 0, r[o].framesEncoded = t.framesEncoded || 0, r[o].googFrameRateSent = t.framesEncoded || 0
						}
					} else "track" === t.type && (r.track = t)
				}), r.track && i && (r[i].googFrameHeightReceived = r.track.frameHeight, r[i].googFrameWidthReceived = r.track.frameWidth), r
			},
			formatData: function(e) {
				return Object.keys(e).map(function(t) {
					r[t] && (e[t] = (e[t] / 1024).toFixed(2)), i[t] && (e[t] = (e[t] / 1024 / 1024).toFixed(2))
				}), e
			},
			computeData: function(e, t) {
				var n = {
					peer: e,
					ssrcKey: t.ssrc,
					currentItem: t
				};
				return t.bytesSent && (t.bitsSentPerSecond = this.getLastStats(Object.assign({}, n, {
					valueKey: "bytesSent"
				}))), t.packetsSent && (t.packetsSentPerSecond = this.getLastStats(Object.assign({}, n, {
					valueKey: "packetsSent"
				}))), t.bytesReceived && (t.bitsReceivedPerSecond = this.getLastStats(Object.assign({}, n, {
					valueKey: "bytesReceived"
				}))), t.packetsReceived && (t.packetsReceivedPerSecond = this.getLastStats(Object.assign({}, n, {
					valueKey: "packetsReceived"
				}))), t
			},
			ssrcLocal: function(e, t) {
				if(e && e.localDescription) {
					var n = e.localDescription;
					return this.formatSSRC(e, t, n.sdp, "send")
				}
			},
			ssrcRemote: function(e, t) {
				if(e && e.remoteDescription) {
					var n = e.remoteDescription;
					return this.formatSSRC(e, t, n.sdp, "recv")
				}
			},
			getLastStats: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.peer,
					n = e.ssrcKey,
					r = e.valueKey,
					i = e.currentItem,
					a = 0;
				return t.lastStats[n] && t.lastStats[n][r] ? i[r] > t.lastStats[n][r] && (a = i[r] - t.lastStats[n][r]) : (t.lastStats[n] || (t.lastStats[n] = {}), a = i[r]), a = /bytes/gi.test(r) ? Math.round(8 * a / 1e3) : a, t.lastStats[n][r] = i[r], a
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = l(n(83)),
			i = l(n(82)),
			a = l(n(1)),
			o = l(n(4)),
			s = l(n(3)),
			c = l(n(2)),
			d = n(10),
			u = l(n(186));

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = function(e) {
			function t(e) {
				(0, a.default)(this, t);
				var n = (0, s.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n.webrtcBusiness = e.webrtcBusiness || null, n.interval = e.interval || 1e3, n
			}
			return(0, c.default)(t, e), (0, o.default)(t, [{
				key: "reset",
				value: function() {
					this.times = 0, this.timer && clearInterval(this.timer), this.timer = null, this.webrtcBusiness = null
				}
			}, {
				key: "start",
				value: function() {
					this.timer = setInterval(this.getStats.bind(this), this.interval)
				}
			}, {
				key: "stop",
				value: function() {
					this.reset()
				}
			}, {
				key: "getStats",
				value: function() {
					var e = (0, i.default)(r.default.mark(function e() {
						var t;
						return r.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									if(this.webrtcBusiness && this.webrtcBusiness.selfWebRtcInstance && this.webrtcBusiness.selfWebRtcInstance.rtcConnection) {
										e.next = 2;
										break
									}
									return e.abrupt("return");
								case 2:
									if(!this.webrtcBusiness.adapterRef.imInfo || !this.webrtcBusiness.adapterRef.imInfo.netDetect || this.webrtcBusiness.adapterRef.instance._isDetectNetwork()) {
										e.next = 4;
										break
									}
									return e.abrupt("return");
								case 4:
									return t = {}, e.next = 7, this.getLocalStats();
								case 7:
									return t.self = e.sent, e.next = 10, this.getRemoteStats();
								case 10:
									t.other = e.sent, Object.keys(t.other).map(function(e) {
										t.self = Object.assign(t.self, t.other[e])
									}), this.times = (this.times || 0) + 1, this.emit("stats", t.self, this.times);
								case 14:
								case "end":
									return e.stop()
							}
						}, e, this)
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}, {
				key: "getLocalStats",
				value: function() {
					var e = (0, i.default)(r.default.mark(function e() {
						var t;
						return r.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									if((t = this.webrtcBusiness) && t.selfWebRtcInstance) {
										e.next = 3;
										break
									}
									return e.abrupt("return", {});
								case 3:
									return e.next = 5, u.default.getStats(t.selfWebRtcInstance.rtcConnection);
								case 5:
									return e.abrupt("return", e.sent);
								case 6:
								case "end":
									return e.stop()
							}
						}, e, this)
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}, {
				key: "getRemoteStats",
				value: function() {
					var e = (0, i.default)(r.default.mark(function e() {
						var t, n, a, o, s, c, d, l, p, f, h = this;
						return r.default.wrap(function(e) {
							for(;;) switch(e.prev = e.next) {
								case 0:
									if((t = this.webrtcBusiness) && t.remoteWebRtcInstanceMap) {
										e.next = 3;
										break
									}
									return e.abrupt("return", {});
								case 3:
									n = {}, a = t.remoteWebRtcInstanceMap, o = Object.keys(a).map(function() {
										var e = (0, i.default)(r.default.mark(function e(t) {
											return r.default.wrap(function(e) {
												for(;;) switch(e.prev = e.next) {
													case 0:
														if(!a[t] || !a[t].rtcConnection) {
															e.next = 5;
															break
														}
														return e.next = 3, u.default.getStats(a[t].rtcConnection);
													case 3:
														return n[t] = e.sent, e.abrupt("return", n[t]);
													case 5:
													case "end":
														return e.stop()
												}
											}, e, h)
										}));
										return function(t) {
											return e.apply(this, arguments)
										}
									}()), s = !0, c = !1, d = void 0, e.prev = 9, l = o[Symbol.iterator]();
								case 11:
									if(s = (p = l.next()).done) {
										e.next = 18;
										break
									}
									return f = p.value, e.next = 15, f;
								case 15:
									s = !0, e.next = 11;
									break;
								case 18:
									e.next = 24;
									break;
								case 20:
									e.prev = 20, e.t0 = e.catch(9), c = !0, d = e.t0;
								case 24:
									e.prev = 24, e.prev = 25, !s && l.return && l.return();
								case 27:
									if(e.prev = 27, !c) {
										e.next = 30;
										break
									}
									throw d;
								case 30:
									return e.finish(27);
								case 31:
									return e.finish(24);
								case 32:
									return e.abrupt("return", n);
								case 33:
								case "end":
									return e.stop()
							}
						}, e, this, [
							[9, 20, 24, 32],
							[25, , 27, 31]
						])
					}));
					return function() {
						return e.apply(this, arguments)
					}
				}()
			}]), t
		}(d.EventEmitter);
		t.default = p, e.exports = t.default
	}, function(e, t, n) {
		var r = n(15),
			i = n(111);
		e.exports = n(7).getIterator = function(e) {
			var t = i(e);
			if("function" != typeof t) throw TypeError(e + " is not iterable!");
			return r(t.call(e))
		}
	}, function(e, t, n) {
		n(54), n(49), e.exports = n(188)
	}, function(e, t, n) {
		e.exports = {
			default: n(189),
			__esModule: !0
		}
	}, function(e, t, n) {
		var r = n(79),
			i = n(6)("iterator"),
			a = n(23);
		e.exports = n(7).isIterable = function(e) {
			var t = Object(e);
			return void 0 !== t[i] || "@@iterator" in t || a.hasOwnProperty(r(t))
		}
	}, function(e, t, n) {
		n(54), n(49), e.exports = n(191)
	}, function(e, t, n) {
		e.exports = {
			default: n(192),
			__esModule: !0
		}
	}, function(e, t, n) {
		"use strict";
		t.__esModule = !0;
		var r = a(n(193)),
			i = a(n(190));

		function a(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		t.default = function() {
			return function(e, t) {
				if(Array.isArray(e)) return e;
				if((0, r.default)(Object(e))) return function(e, t) {
					var n = [],
						r = !0,
						a = !1,
						o = void 0;
					try {
						for(var s, c = (0, i.default)(e); !(r = (s = c.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
					} catch(e) {
						a = !0, o = e
					} finally {
						try {
							!r && c.return && c.return()
						} finally {
							if(a) throw o
						}
					}
					return n
				}(e, t);
				throw new TypeError("Invalid attempt to destructure non-iterable instance")
			}
		}()
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r, i = n(194),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.default = {
			randomSSRC: function() {
				var e = Math.floor(1e8 * Math.random()) + 1e7;
				return e > 1e8 ? 99999999 : e
			},
			_createLocalDescription: function(e, t) {
				var n = {},
					r = this._iceGatherer.getLocalParameters(),
					i = this._iceGatherer.getLocalCandidates(),
					o = this._dtlsTransport.getLocalParameters(),
					s = this._dtlsTransport.getRemoteParameters(),
					c = this._localCapabilities,
					d = this._localTrackInfos;
				"offer" === t && this._sdpGlobalFields.version++, n.version = 0, n.origin = {
					address: "127.0.0.1",
					ipVer: 4,
					netType: "IN",
					sessionId: this._sdpGlobalFields.id,
					sessionVersion: this._sdpGlobalFields.version,
					username: "jitsi-ortc-webrtc-shim"
				}, n.name = "-", n.timing = {
					start: 0,
					stop: 0
				}, n.msidSemantic = {
					semantic: "WMS",
					token: "*"
				}, n.groups = [{
					mids: Array.from(this._mids.keys()).join(" "),
					type: "BUNDLE"
				}], n.media = [], n.fingerprint = {
					hash: o.fingerprints[0].value,
					type: o.fingerprints[0].algorithm
				};
				var u = !1,
					l = !0,
					p = !1,
					f = void 0;
				try {
					for(var h, m = c.codecs[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
						var v = h.value;
						if("video" === v.kind && "rtx" === v.name) {
							u = !0;
							break
						}
					}
				} catch(e) {
					p = !0, f = e
				} finally {
					try {
						!l && m.return && m.return()
					} finally {
						if(p) throw f
					}
				}
				var _ = !0,
					R = !1,
					g = void 0;
				try {
					for(var y, C = this._mids[Symbol.iterator](); !(_ = (y = C.next()).done); _ = !0) {
						var T = y.value,
							E = (0, a.default)(T, 2),
							b = E[0],
							S = E[1];
						O.call(this, b, S)
					}
				} catch(e) {
					R = !0, g = e
				} finally {
					try {
						!_ && C.return && C.return()
					} finally {
						if(R) throw g
					}
				}
				return new RTCSessionDescription({
					type: t,
					_sdpObject: n
				});

				function O(e, a) {
					var o = {};
					switch(o.type = a, a) {
						case "audio":
						case "video":
							o.protocol = "RTP/SAVPF", o.port = 9, o.direction = "sendrecv";
							break;
						case "application":
							o.protocol = "DTLS/SCTP", o.port = 0, o.payloads = "0", o.direction = "inactive"
					}
					o.connection = {
						ip: "127.0.0.1",
						version: 4
					}, o.mid = e, o.iceUfrag = r.usernameFragment, o.icePwd = r.password, o.candidates = [];
					var l = !0,
						p = !1,
						f = void 0;
					try {
						for(var h, m = i[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
							var v = h.value,
								_ = {
									component: 1
								};
							_.foundation = v.foundation, _.ip = v.ip, _.port = v.port, _.priority = v.priority, _.transport = v.protocol.toLowerCase(), _.type = v.type, "tcp" === _.transport && (_.tcptype = v.tcpType), o.candidates.push(_)
						}
					} catch(e) {
						p = !0, f = e
					} finally {
						try {
							!l && m.return && m.return()
						} finally {
							if(p) throw f
						}
					}
					if(o.endOfCandidates = "end-of-candidates", o.setup = "offer" === t ? "actpass" : "server" === s.role ? "active" : "passive", "audio" === a || "video" === a) {
						o.rtp = [], o.rtcpFb = [], o.fmtp = [];
						var R = [],
							g = !0,
							y = !1,
							C = void 0;
						try {
							for(var T, E = c.codecs[Symbol.iterator](); !(g = (T = E.next()).done); g = !0) {
								var b = T.value;
								if(!b.kind || b.kind === a) {
									R.push(b.preferredPayloadType);
									var S = {
										codec: b.name,
										payload: b.preferredPayloadType,
										rate: b.clockRate
									};
									if(b.numChannels > 1 && (S.encoding = b.numChannels), o.rtp.push(S), b.parameters) {
										var O = {
												config: "",
												payload: b.preferredPayloadType
											},
											P = !0,
											k = !1,
											I = void 0;
										try {
											for(var A, L = Object.keys(b.parameters)[Symbol.iterator](); !(P = (A = L.next()).done); P = !0) {
												var D = A.value;
												O.config && (O.config += ";"), O.config += D + "=" + b.parameters[D]
											}
										} catch(e) {
											k = !0, I = e
										} finally {
											try {
												!P && L.return && L.return()
											} finally {
												if(k) throw I
											}
										}
										O.config && o.fmtp.push(O)
									}
									var w = !0,
										M = !1,
										W = void 0;
									try {
										for(var B, N = (b.rtcpFeedback || [])[Symbol.iterator](); !(w = (B = N.next()).done); w = !0) {
											var G = B.value;
											o.rtcpFb.push({
												payload: b.preferredPayloadType,
												subtype: G.parameter || void 0,
												type: G.type
											})
										}
									} catch(e) {
										M = !0, W = e
									} finally {
										try {
											!w && N.return && N.return()
										} finally {
											if(M) throw W
										}
									}
								}
							}
						} catch(e) {
							y = !0, C = e
						} finally {
							try {
								!g && E.return && E.return()
							} finally {
								if(y) throw C
							}
						}
						0 === R.length ? (o.payloads = "9", o.port = 0, o.direction = "inactive") : o.payloads = R.join(" "), o.ssrcs = [], o.ssrcGroups = [];
						var x = !0,
							j = !1,
							F = void 0;
						try {
							for(var U, V = d.values()[Symbol.iterator](); !(x = (U = V.next()).done); x = !0) {
								var H = U.value,
									Y = H.rtpSender,
									K = H.stream.id,
									q = Y.track;
								if("ended" !== q.readyState && q.kind === a) {
									H.ssrc || (H.ssrc = this.randomSSRC());
									var J = u && "video" === q.kind;
									J && !H.rtxSsrc && (H.rtxSsrc = H.ssrc + 1), o.ssrcs.push({
										attribute: "cname",
										id: H.ssrc,
										value: CNAME
									}), o.ssrcs.push({
										attribute: "msid",
										id: H.ssrc,
										value: K + " " + q.id
									}), o.ssrcs.push({
										attribute: "mslabel",
										id: H.ssrc,
										value: K
									}), o.ssrcs.push({
										attribute: "label",
										id: H.ssrc,
										value: q.id
									}), J && (o.ssrcs.push({
										attribute: "cname",
										id: H.rtxSsrc,
										value: CNAME
									}), o.ssrcs.push({
										attribute: "msid",
										id: H.rtxSsrc,
										value: K + " " + q.id
									}), o.ssrcs.push({
										attribute: "mslabel",
										id: H.rtxSsrc,
										value: K
									}), o.ssrcs.push({
										attribute: "label",
										id: H.rtxSsrc,
										value: q.id
									}), o.ssrcGroups.push({
										semantics: "FID",
										ssrcs: H.ssrc + " " + H.rtxSsrc
									}))
								}
							}
						} catch(e) {
							j = !0, F = e
						} finally {
							try {
								!x && V.return && V.return()
							} finally {
								if(j) throw F
							}
						}
						o.ext = [];
						var z = !0,
							Q = !1,
							$ = void 0;
						try {
							for(var X, Z = c.headerExtensions[Symbol.iterator](); !(z = (X = Z.next()).done); z = !0) {
								var ee = X.value;
								ee.kind && ee.kind !== a || o.ext.push({
									value: ee.preferredId,
									uri: ee.uri
								})
							}
						} catch(e) {
							Q = !0, $ = e
						} finally {
							try {
								!z && Z.return && Z.return()
							} finally {
								if(Q) throw $
							}
						}
						o.rtcpMux = "rtcp-mux", o.rtcpRsize = "rtcp-rsize"
					}
					n.media.push(o)
				}
			},
			mergeConstraints: function(e, t) {
				if(!e || !t) return e || t;
				var n = e;
				for(var r in t) n[r] = t[r];
				return n
			},
			iceCandidateType: function(e) {
				return e.split(" ")[7]
			},
			formatTypePreference: function(e) {
				if(/Chrome\/\d+/.test(navigator.userAgent)) switch(e) {
					case 0:
						return "TURN/TLS";
					case 1:
						return "TURN/TCP";
					case 2:
						return "TURN/UDP"
				} else if(/Firefox\/\d+/.test(navigator.userAgent)) switch(e) {
					case 0:
						return "TURN/TCP";
					case 5:
						return "TURN/UDP"
				}
				return ""
			},
			maybeSetOpusOptions: function(e, t) {
				return "true" === t.opusStereo ? e = this.setCodecParam(e, "opus/48000", "stereo", "1") : "false" === t.opusStereo && (e = this.removeCodecParam(e, "opus/48000", "stereo")), "true" === t.opusFec ? e = this.setCodecParam(e, "opus/48000", "useinbandfec", "1") : "false" === t.opusFec && (e = this.removeCodecParam(e, "opus/48000", "useinbandfec")), "true" === t.opusDtx ? e = this.setCodecParam(e, "opus/48000", "usedtx", "1") : "false" === t.opusDtx && (e = this.removeCodecParam(e, "opus/48000", "usedtx")), t.opusMaxPbr && (e = this.setCodecParam(e, "opus/48000", "maxplaybackrate", t.opusMaxPbr)), e
			},
			maybeSetAudioSendBitRate: function(e, t) {
				return t.audioSendBitrate ? (WEBRTCLOG.log("Prefer audio send bitrate: " + t.audioSendBitrate), this.preferBitRate(e, t.audioSendBitrate, "audio")) : e
			},
			maybeSetAudioReceiveBitRate: function(e, t) {
				return t.audioRecvBitrate ? (WEBRTCLOG.log("Prefer audio receive bitrate: " + t.audioRecvBitrate), this.preferBitRate(e, t.audioRecvBitrate, "audio")) : e
			},
			maybeSetVideoSendBitRate: function(e, t) {
				return t.videoSendBitrate ? (WEBRTCLOG.log("Prefer video send bitrate: " + t.videoSendBitrate), this.preferBitRate(e, t.videoSendBitrate, "video")) : e
			},
			maybeSetVideoReceiveBitRate: function(e, t) {
				return t.videoRecvBitrate ? (WEBRTCLOG.log("Prefer video receive bitrate: " + t.videoRecvBitrate), this.preferBitRate(e, t.videoRecvBitrate, "video")) : e
			},
			preferBitRate: function(e, t, n) {
				var r = e.split("\r\n"),
					i = this.findLine(r, "m=", n);
				if(null === i) return WEBRTCLOG.log("Failed to add bandwidth line to sdp, as no m-line found"), e;
				var a = this.findLineInRange(r, i + 1, -1, "m=");
				null === a && (a = r.length);
				var o = this.findLineInRange(r, i + 1, a, "c=");
				if(null === o) return WEBRTCLOG.log("Failed to add bandwidth line to sdp, as no c-line found"), e;
				var s = this.findLineInRange(r, o + 1, a, "b=AS");
				s && r.splice(s, 1);
				var c = "b=AS:" + t;
				return r.splice(o + 1, 0, c), e = r.join("\r\n")
			},
			maybeSetVideoSendInitialBitRate: function(e, t) {
				var n = t.videoSendInitialBitrate;
				if(!n) return e;
				var r = n,
					i = t.videoSendBitrate;
				i && (n > i && (WEBRTCLOG.log("Clamping initial bitrate to max bitrate of " + i + " kbps."), n = i, t.videoSendInitialBitrate = n), r = i);
				var a = e.split("\r\n");
				if(null === this.findLine(a, "m=", "video")) return WEBRTCLOG.log("Failed to find video m-line"), e;
				var o = t.videoRecvCodec;
				return e = this.setCodecParam(e, o, "x-google-min-bitrate", t.videoSendInitialBitrate.toString()), e = this.setCodecParam(e, o, "x-google-max-bitrate", r.toString())
			},
			removePayloadTypeFromMline: function(e, t) {
				e = e.split(" ");
				for(var n = 0; n < e.length; ++n) e[n] === t.toString() && e.splice(n, 1);
				return e.join(" ")
			},
			removeCodecByName: function(e, t) {
				var n = this.findLine(e, "a=rtpmap", t);
				if(null === n) return e;
				var r = this.getCodecPayloadTypeFromLine(e[n]);
				e.splice(n, 1);
				var i = this.findLine(e, "m=", "video");
				return null === i ? e : (e[i] = this.removePayloadTypeFromMline(e[i], r), e)
			},
			removeCodecByPayloadType: function(e, t) {
				var n = this.findLine(e, "a=rtpmap", t.toString());
				if(null === n) return e;
				e.splice(n, 1);
				var r = this.findLine(e, "m=", "video");
				return null === r ? e : (e[r] = this.removePayloadTypeFromMline(e[r], t), e)
			},
			maybeRemoveVideoFec: function(e, t) {
				if("false" !== t.videoFec) return e;
				var n = e.split("\r\n"),
					r = this.findLine(n, "a=rtpmap", "red");
				if(null === r) return e;
				var i = this.getCodecPayloadTypeFromLine(n[r]);
				if(n = this.removeCodecByPayloadType(n, i), n = this.removeCodecByName(n, "ulpfec"), null === (r = this.findLine(n, "a=fmtp", i.toString()))) return e;
				var a = this.parseFmtpLine(n[r]).pt;
				return null === a ? e : (n.splice(r, 1), (n = this.removeCodecByPayloadType(n, a)).join("\r\n"))
			},
			maybePreferAudioSendCodec: function(e, t) {
				return this.maybePreferCodec(e, "audio", "send", t.audioSendCodec)
			},
			maybePreferAudioReceiveCodec: function(e, t) {
				return this.maybePreferCodec(e, "audio", "receive", t.audioRecvCodec)
			},
			maybePreferVideoSendCodec: function(e, t) {
				return this.maybePreferCodec(e, "video", "send", t.videoSendCodec)
			},
			maybePreferVideoReceiveCodec: function(e, t) {
				return this.maybePreferCodec(e, "video", "receive", t.videoRecvCodec)
			},
			maybePreferCodec: function(e, t, n, r) {
				var i = t + " " + n + " codec";
				if(!r) return WEBRTCLOG.log("No preference on " + i + "."), e;
				WEBRTCLOG.log("Prefer " + i + ": " + r);
				var a = e.split("\r\n"),
					o = this.findLine(a, "m=", t);
				if(null === o) return e;
				var s = this.getCodecPayloadType(a, r);
				return s ? a[o] = this.setDefaultCodec(a[o], s) : WEBRTCLOG.error("no prefered codec found for ", r), e = a.join("\r\n")
			},
			setCodecParam: function(e, t, n, r) {
				var i = e.split("\r\n"),
					a = this.findFmtpLine(i, t),
					o = {};
				if(null === a) {
					var s = this.findLine(i, "a=rtpmap", t);
					if(null === s) return e;
					var c = this.getCodecPayloadTypeFromLine(i[s]);
					o.pt = c.toString(), o.params = {}, o.params[n] = r, i.splice(s + 1, 0, this.writeFmtpLine(o))
				} else(o = this.parseFmtpLine(i[a])).params[n] = r, i[a] = this.writeFmtpLine(o);
				return e = i.join("\r\n")
			},
			removeCodecParam: function(e, t, n) {
				var r = e.split("\r\n"),
					i = this.findFmtpLine(r, t);
				if(null === i) return e;
				var a = this.parseFmtpLine(r[i]);
				delete a.params[n];
				var o = this.writeFmtpLine(a);
				return null === o ? r.splice(i, 1) : r[i] = o, e = r.join("\r\n")
			},
			parseFmtpLine: function(e) {
				var t = {},
					n = e.indexOf(" "),
					r = e.substring(n + 1).split("; "),
					i = new RegExp("a=fmtp:(\\d+)"),
					a = e.match(i);
				if(!a || 2 !== a.length) return null;
				t.pt = a[1];
				for(var o = {}, s = 0; s < r.length; ++s) {
					var c = r[s].split("=");
					2 === c.length && (o[c[0]] = c[1])
				}
				return t.params = o, t
			},
			writeFmtpLine: function(e) {
				if(!e.hasOwnProperty("pt") || !e.hasOwnProperty("params")) return null;
				var t = e.pt,
					n = e.params,
					r = [],
					i = 0;
				for(var a in n) r[i] = a + "=" + n[a], ++i;
				return 0 === i ? null : "a=fmtp:" + t.toString() + " " + r.join("; ")
			},
			findFmtpLine: function(e, t) {
				var n = this.getCodecPayloadType(e, t);
				return n ? this.findLine(e, "a=fmtp:" + n.toString()) : null
			},
			findLine: function(e, t, n) {
				return this.findLineInRange(e, 0, -1, t, n)
			},
			findLineInRange: function(e, t, n, r, i) {
				for(var a = -1 !== n ? n : e.length, o = t; o < a; ++o)
					if(0 === e[o].indexOf(r) && (!i || -1 !== e[o].toLowerCase().indexOf(i.toLowerCase()))) return o;
				return null
			},
			getCodecPayloadType: function(e, t) {
				var n = this.findLine(e, "a=rtpmap", t);
				return n ? this.getCodecPayloadTypeFromLine(e[n]) : null
			},
			getCodecPayloadTypeFromLine: function(e) {
				var t = new RegExp("a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+"),
					n = e.match(t);
				return n && 2 === n.length ? n[1] : null
			},
			setDefaultCodec: function(e, t) {
				var n = e.split(" "),
					r = n.slice(0, 3);
				r.push(t);
				for(var i = 3; i < n.length; i++) n[i] !== t && r.push(n[i]);
				return r.join(" ")
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		var r = n(142),
			i = /%[sdv%]/g,
			a = function(e, t, n) {
				var r = [e + "=" + (t.format instanceof Function ? t.format(t.push ? n : n[t.name]) : t.format)];
				if(t.names)
					for(var a = 0; a < t.names.length; a += 1) {
						var o = t.names[a];
						t.name ? r.push(n[t.name][o]) : r.push(n[t.names[a]])
					} else r.push(n[t.name]);
				return function(e) {
					var t = 1,
						n = arguments,
						r = n.length;
					return e.replace(i, function(e) {
						if(t >= r) return e;
						var i = n[t];
						switch(t += 1, e) {
							case "%%":
								return "%";
							case "%s":
								return String(i);
							case "%d":
								return Number(i);
							case "%v":
								return ""
						}
					})
				}.apply(null, r)
			},
			o = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
			s = ["i", "c", "b", "a"];
		e.exports = function(e, t) {
			t = t || {}, null == e.version && (e.version = 0), null == e.name && (e.name = " "), e.media.forEach(function(e) {
				null == e.payloads && (e.payloads = "")
			});
			var n = t.outerOrder || o,
				i = t.innerOrder || s,
				c = [];
			return n.forEach(function(t) {
				r[t].forEach(function(n) {
					n.name in e && null != e[n.name] ? c.push(a(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
						c.push(a(t, n, e))
					})
				})
			}), e.media.forEach(function(e) {
				c.push(a("m", r.m[0], e)), i.forEach(function(t) {
					r[t].forEach(function(n) {
						n.name in e && null != e[n.name] ? c.push(a(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
							c.push(a(t, n, e))
						})
					})
				})
			}), c.join("\r\n") + "\r\n"
		}
	}, function(e, t, n) {
		var r = function(e) {
				return String(Number(e)) === e ? Number(e) : e
			},
			i = function(e, t, n) {
				var i = e.name && e.names;
				e.push && !t[e.push] ? t[e.push] = [] : i && !t[e.name] && (t[e.name] = {});
				var a = e.push ? {} : i ? t[e.name] : t;
				! function(e, t, n, i) {
					if(i && !n) t[i] = r(e[1]);
					else
						for(var a = 0; a < n.length; a += 1) null != e[a + 1] && (t[n[a]] = r(e[a + 1]))
				}(n.match(e.reg), a, e.names, e.name), e.push && t[e.push].push(a)
			},
			a = n(142),
			o = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
		t.parse = function(e) {
			var t = {},
				n = [],
				r = t;
			return e.split(/(\r\n|\r|\n)/).filter(o).forEach(function(e) {
				var t = e[0],
					o = e.slice(2);
				"m" === t && (n.push({
					rtp: [],
					fmtp: []
				}), r = n[n.length - 1]);
				for(var s = 0; s < (a[t] || []).length; s += 1) {
					var c = a[t][s];
					if(c.reg.test(o)) return i(c, r, o)
				}
			}), t.media = n, t
		};
		var s = function(e, t) {
			var n = t.split(/=(.+)/, 2);
			return 2 === n.length ? e[n[0]] = r(n[1]) : 1 === n.length && t.length > 1 && (e[n[0]] = void 0), e
		};
		t.parseParams = function(e) {
			return e.split(/\;\s?/).reduce(s, {})
		}, t.parseFmtpConfig = t.parseParams, t.parsePayloads = function(e) {
			return e.split(" ").map(Number)
		}, t.parseRemoteCandidates = function(e) {
			for(var t = [], n = e.split(" ").map(r), i = 0; i < n.length; i += 3) t.push({
				component: n[i],
				ip: n[i + 1],
				port: n[i + 2]
			});
			return t
		}, t.parseImageAttributes = function(e) {
			return e.split(" ").map(function(e) {
				return e.substring(1, e.length - 1).split(",").reduce(s, {})
			})
		}, t.parseSimulcastStreamList = function(e) {
			return e.split(";").map(function(e) {
				return e.split(",").map(function(e) {
					var t, n = !1;
					return "~" !== e[0] ? t = r(e) : (t = r(e.substring(1, e.length)), n = !0), {
						scid: t,
						paused: n
					}
				})
			})
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r, i = n(143),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		var o = n(112),
			s = a.default.checkVersion(),
			c = {};
		t.default = {
			fnShake: function(e) {
				var t = this,
					n = e.fn,
					r = e.peer,
					i = void 0 === r ? {} : r;
				if(n) {
					if(i) return i.id || (i.id = Object.keys(c).length + 1), n = "_" + n, c[i.id] || (c[i.id] = {}), c[i.id] && c[i.id][n] && (WEBRTCLOG.log("destroy " + n + " timer"), clearTimeout(c[i.id][n]), c[i.id][n] = null), WEBRTCLOG.log("create " + n + " timer"), new Promise(function(r) {
						c[i.id][n] = setTimeout(function() {
							c[i.id][n] = null, r(t[n](e))
						}, 200)
					});
					WEBRTCLOG.error("RtcUtil:fnShake peer is null")
				}
			},
			createOffer: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				return this.fnShake({
					peer: e,
					fn: "createOffer"
				})
			},
			_createOffer: function() {
				var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).peer;
				if(e) {
					WEBRTCLOG.log("------ do createoffer ------");
					var t = {
						offerToReceiveVideo: 1,
						offerToReceiveAudio: 1
					};
					if(e.uid - e.targetUid != 0) {
						var n = e.getLocalStreams(),
							r = n[0] && n[0].getTracks() || !1;
						r && 0 !== r.length || e.addTransceiver && "Safari" === s.prefix && (e.addTransceiver("audio"), e.addTransceiver("video"))
					}
					return WEBRTCLOG.log("iceConnectionState :", e.iceConnectionState), e.iceConnectionState && "failed" == e.iceConnectionState ? t.iceRestart = !0 : "connected" != e.iceConnectionState && "completed" != e.iceConnectionState && "closed" != e.iceConnectionState && (t.iceRestart = !0), e.createOffer(t)
				}
			},
			formatSdp: function() {
				var e = this,
					t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					n = t.offerOrAnswer,
					r = t.uid,
					i = t.highAudio,
					a = t.stero,
					c = t.targetUid,
					d = t.netDetect,
					u = t.codec,
					l = t.chromeScreenShareOpened,
					p = t.stream || new MediaStream,
					f = n.sdp,
					h = n.type,
					m = [],
					v = [],
					_ = o.parse(f);
				WEBRTCLOG.log(c + " 原始sdp " + h + " \n", f);
				var R = p.getAudioTracks()[0],
					g = p.getVideoTracks()[0];
				return _.rtcpXr = "rcvr-rtt=all:10000", _.media && _.media.map(function(t) {
					if(t.candidates && delete t.candidates, t.direction = c !== r ? "recvonly" : /recvonly/.test(t.direction) ? "recvonly" : "sendonly", (/audio/.test(t.type) && !R || /video/.test(t.type) && !g) && delete t.ssrcs && delete t.ssrcGroups && delete t.msid, "audio" === t.type && (v.push(t.mid), t, t.rtcpFb && 1 == t.rtcpFb.length && t.rtcpFb.push({
							payload: t.rtcpFb[0].payload,
							type: "nack"
						})), "video" === t.type && g) {
						if(!/h264/i.test(f)) return void WEBRTCLOG.error("该机型浏览器不支持H264编码");
						var o = [];
						if(t.rtp && t.rtp.length && t.rtp.map(function(e) {
								"H264" === e.codec && o.push(e.payload)
							}), t.fmtp && t.fmtp.length && t.fmtp.map(function(e) {
								l ? -1 != o.indexOf(e.payload) && e.config && (e.config.indexOf("x-google-min-bitrate=512") > 0 && (e.config = e.config.replace(";x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024", "")), -1 === e.config.indexOf("x-google-min-bitrate=1024") && (e.config += ";x-google-min-bitrate=1024")) : -1 != o.indexOf(e.payload) && e.config && (e.config.indexOf("x-google-min-bitrate=1024") > 0 && (e.config = e.config.replace(";x-google-min-bitrate=1024", "")), -1 === e.config.indexOf("x-google-min-bitrate=512") && (e.config += ";x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024"))
							}), t.ssrcs.map(function(e) {
								/^label$/.test(e.attribute) && e.value !== g.id && m.push(e.id)
							}), "Firefox" === s.prefix && t.msid) {
							var d = t.msid.split(" ");
							if(d[1] == g.id) {
								d[1] = d[1].replace(/([\da-zA-Z]{4})/, function(e, t, n) {
									var r = "",
										i = t,
										a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
									e && (i = Math.round(Math.random() * (n - t)) + t);
									for(var o = 0; o < i; o++) r += a[Math.round(Math.random() * (a.length - 1))];
									return r
								}(!1, 4))
							} else d[1] = g.id;
							t.msid = d.join(" ")
						}
					}
					if("audio" === t.type && (t.ptime = 60, t.maxptime = 60, t.fmtp && t.fmtp.length)) {
						var u = !1,
							p = i ? 48e3 : 16e3;
						t.fmtp.map(function(e) {
							e.config && -1 !== e.config.indexOf("minptime=") && (e.config = e.config.replace(/minptime=\d+/, "minptime=60")), e.config && -1 !== e.config.indexOf("sprop-maxcapturerate=") && -1 !== e.config.indexOf("maxplaybackrate") && (u = !0, e.config = e.config.replace(/sprop-maxcapturerate=\d+/, "sprop-maxcapturerate=" + p), e.config = e.config.replace(/maxplaybackrate=\d+/, "maxplaybackrate=" + p)), u || (e.config += ";maxplaybackrate=" + p + ";sprop-maxcapturerate=" + p), a && (e.config += ";maxaveragebitrate=131072;stereo=1;sprop-stereo=1;cbr=1")
						})
					}
					if("offer" === n.type) {
						var h = t.mid;
						_.groups && _.groups.map(function(e) {
							var n = e.mids.split(" "); - 1 !== n.indexOf(h) && (n.splice(n.indexOf(h), 1, t.mid), e.mids = n.join(" "))
						})
					}
					t.fmtp = e.limitFrame(t.fmtp)
				}), d && (_ = this.deleteCodec(_, u)), n.sdp = o.write(_), n.sdp = n.sdp.replace(/t=([0-9 ]*)\r\n/, "t=$1\r\na=rtcp-xr:rcvr-rtt=all:10000\r\n"), m.length > 0 && m.map(function(e) {
					var t = new RegExp("a=ssrc:" + e + ".+\\r\\n", "gi");
					n.sdp = n.sdp.replace(t, "")
				}), n
			},
			deleteCodec: function(e, t) {
				if(t && e) {
					var n = [];
					return e.media.map(function(e) {
						if("video" === e.type && (e.rtp && e.rtp.length && e.rtp.map(function(e) {
								var r = e.codec.toLowerCase();
								r !== t && "red" !== r && "ulpfec" !== r || n.push(e.payload)
							}), n.length && e.fmtp && e.fmtp.length && e.fmtp.map(function(e) {
								var t = /apt=(\d*)/gi.exec(e.config);
								t && t.length && n.map(function(r) {
									r === parseInt(t[t.length - 1], 10) && n.push(e.payload)
								})
							}), n.length)) {
							var i = [],
								a = e.payloads.split(" ");
							a && a.length && a.map(function(e) {
								n.map(function(t) {
									e === t && i.push(e)
								})
							}), i.length && (e.payloads = i.join(" ")), e.fmtp = r(e.fmtp, n), e.rtcpFb = r(e.rtcpFb, n), e.rtp = r(e.rtp, n)
						}
					}), e
				}

				function r(e, t) {
					var n = [];
					if(e.map(function(e) {
							t.map(function(t) {
								e.payload === t && n.push(e)
							})
						}), n.length) return n
				}
				WEBRTCLOG.log("deleteCodec: Invalid Argument")
			},
			limitFrame: function(e) {
				return e.map(function(e) {
					/42e01f/gi.test(e.config) && (e.config += ";max-fs=12288")
				}), e
			},
			setMediaBitrates: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.sdp,
					n = e.bit,
					r = void 0 === n ? {} : n,
					i = r.video,
					a = void 0 === i ? 500 : i,
					s = r.audio,
					c = void 0 === s ? 500 : s,
					d = o.parse(t);
				return d.media && d.media.map(function(e) {
					e.bandwidth = [{
						type: navigator.mozGetUserMedia ? "TIAS" : "AS",
						limit: "audio" === e.type ? c : a
					}]
				}), o.write(d)
			},
			formatSSRCChrome: function(e, t, n) {
				return e.map(function(e, r) {
					return e.id = t + "0" + n + "0" + Math.floor(r / 4), e.id -= 0, e
				})
			},
			formatSSRCFirefox: function(e, t, n) {
				return e.map(function(e, r) {
					return e.id = t + "0" + n + "0" + Math.floor(r / 4), e.id -= 0, e
				})
			},
			formatSdpRemote: function(e, t, n) {
				return /Chrome/gi.test(navigator.userAgent) ? this.formatSdpRemoteChrome(e, t, n) : this.formatSdpRemoteFirefox(e, t)
			},
			formatSdpRemoteChrome: function(e, t) {
				return -1 === (e = e.replace(/a=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
					var t = e.match(/a=ssrc:(\d+)/),
						n = e.match(/a=msid:(.+) (.+)/);
					return t[1] && (e = e.replace("a=msid", "a=ssrc:" + t[1] + " msid")), n[1] && t[1] && (e = e + "\r\na=ssrc:" + t[1] + " mslabel:" + n[1]), n[2] && t[1] && (e = e + "\r\na=ssrc:" + t[1] + " label:" + n[2]), e
				})).indexOf("b=AS:1024") && t && (e += "b=AS:1024\r\n"), WEBRTCLOG.log("formated: \n", e), e
			},
			formatSdpRemoteFirefox: function(e, t) {
				if(e = e.replace(/\r\na=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
						var t = e.match(/\r\na=ssrc:\d+ cname:.+/);
						return e = (e = e.replace(/a=ssrc:\d+ cname:.+/, "")).replace("a=msid", t[0] + "\r\na=msid")
					}), t && t.sdp) {
					var n = o.parse(e),
						r = o.parse(t.sdp);
					n.media.length, r.media.length
				}
				return WEBRTCLOG.log("formated: \n", e), e
			},
			parse: function(e) {
				var t = o.parse(e);
				WEBRTCLOG.log("原始sdp\n", e), WEBRTCLOG.log(t)
			},
			updateMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				return e.fn = "updateMediaStream", this.fnShake(e)
			},
			_updateMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				WEBRTCLOG.log("_updateMediaStream");
				var t = e.peer,
					n = e.currStream,
					r = e.streams,
					i = void 0 === r ? [] : r,
					a = this.checkCurrStream(t),
					o = {},
					c = t,
					d = n || new MediaStream;
				i.map(function(e) {
					e.getTracks().map(function(e) {
						o[e.id] = e
					})
				});
				var u = Object.keys(a.tracks).filter(function(e) {
					return !o[e]
				});
				WEBRTCLOG.log("webrtc-rtc::获取移除的列表", u);
				var l = Object.keys(o).filter(function(e) {
					return !a.tracks[e]
				});
				return WEBRTCLOG.log("webrtc-rtc::获取新加的列表", l), u && u.map(function(e) {
					var n = a.tracks[e].sender,
						r = a.tracks[e].track;
					if(r && WEBRTCLOG.log("remove old track ", r.id), "Firefox" === s.prefix) {
						var i = "audio" === r.kind ? t.audioSender : t.videoSender;
						i && i.replaceTrack(null)
					} else c.removeTrack(n);
					d.removeTrack(r)
				}), l && l.map(function(e) {
					var n = o[e];
					WEBRTCLOG.log("add new track: ", n && n.id), d.addTrack(n), "Firefox" === s.prefix ? "audio" === n.kind ? t.audioSender ? t.audioSender.replaceTrack(n) : t.audioSender = c.addTrack(n, d) : "video" === n.kind && (t.videoSender ? (WEBRTCLOG.info("open the camera"), t.videoSender.replaceTrack(n)) : t.videoSender = c.addTrack(n, d)) : c.addTrack(n, d)
				}), this.checkCurrStream(t), Promise.resolve(d)
			},
			removeTrack: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.peer,
					n = e.currStream,
					r = e.tracks,
					i = void 0 === r ? [] : r;
				if(0 !== i.length) {
					var a = this.checkCurrStream(t);
					i.map(function(e) {
						a.tracks[e.id] && (WEBRTCLOG.log("====remove track", e, e.readyState, a.tracks[e.id].sender), n.removeTrack(e), t.removeTrack(a.tracks[e.id].sender))
					})
				}
			},
			checkCurrStream: function(e) {
				var t = {},
					n = [],
					r = e.getSenders();
				return r && r.map(function(e) {
					var r = e.track;
					r ? (t[r.id] = {
						sender: e,
						track: r
					}, WEBRTCLOG.log(" --\x3e track id:", r.kind + ":" + r.id)) : n.push(e)
				}), {
					tracks: t,
					empty: n
				}
			},
			checkMediaStatus: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.videoTrack,
					n = e.sdp,
					r = (e.uid, {
						video: !1
					});
				return r.video = new RegExp(t.id).test(n), WEBRTCLOG.log("checkMediaStatus ----\x3e result", r), r
			},
			validMediaStream: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.sdp,
					n = e.msid,
					r = e.trackid;
				if(!n || !r) return !1;
				var i = !1;
				return n && (i = new RegExp(n).test(t)), i ? (r && (i = new RegExp(r).test(t)), i) : i
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.default = i;
		var r = n(78).RtcSupport.checkWebAudio();

		function i() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
				t = e.stream,
				n = e.uid,
				i = e.isAnalyze,
				a = e.isRemote;
			this.support = r.WebAudio && r.MediaStream, this.gain = 1, this.stream = t, this.support && (this.audioIn = {}, this.uid = n || 0, this.isAnalyze = i, this.isRemote = a || !1, this.instant = 0, this.slow = 0, this.clip = 0, this.init())
		}
		i.ac = r.WebAudio && r.MediaStream ? new window.AudioContext : {}, i.destination = i.ac.createMediaStreamDestination ? i.ac.createMediaStreamDestination() : {};
		var a = i.prototype;
		a.context = i.ac, a.init = function() {
			this.validateInput() && (this.isAnalyze && this.initMonitor(), this.formatStreams(), this.initWebAudio(), this.initAudioIn())
		}, a.validateInput = function() {
			return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor)
		}, a.initMonitor = function() {
			var e = this;
			(this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function(t) {
				var n, r = t.inputBuffer.getChannelData(0),
					i = 0,
					a = 0;
				for(n = 0; n < r.length; ++n) i += Math.abs(r[n]), Math.abs(r[n]) > .99 && (a += 1);
				e.instant = Math.sqrt(i / r.length), e.slow = .95 * e.slow + .05 * e.instant, e.clip = a / r.length
			}
		}, a.initWebAudio = function() {
			var e = this.context;
			this.gainFilter = e.createGain(), this.destination = this.isRemote ? i.destination : e.createMediaStreamDestination(), this.gainFilter.gain.value = this.gain, this.gainFilter.connect(this.destination)
		}, a.initAudioIn = function() {
			var e = this,
				t = this,
				n = this.stream,
				r = this.context,
				i = void 0;
			if(/(MediaStream|LocalMediaStream)/.test(n.constructor)) return a(n), void(this.outputStream = this.destination.stream);

			function a(e) {
				if(!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
				if(0 === e.getAudioTracks().length) return null;
				var n = r.createMediaStreamSource(e);
				return t.isAnalyze && t.script && (n.connect(t.script), t.script.connect(t.gainFilter)), n.connect(t.gainFilter), n
			}
			n.constructor === Array && (n.forEach(function(t) {
				(i = a(t)) && (e.audioIn[t.id] = i)
			}), this.outputStream = this.destination.stream)
		}, a.formatStreams = function() {
			var e = this.stream,
				t = [];
			if(/(MediaStream|LocalMediaStream)/.test(e.constructor)) return e.getAudioTracks().map(function(e) {
				t.push(new MediaStream([e]))
			}), void(this.stream = t);
			e.constructor === Array && (e.map(function(e) {
				e.getAudioTracks().map(function(e) {
					t.push(new MediaStream([e]))
				})
			}), this.stream = t)
		}, a.addStream = function(e) {
			var t = this.context;
			if(0 !== e.getAudioTracks().length) {
				var n = t.createMediaStreamSource(e);
				this.isAnalyze && this.script && n.connect(this.script), n.connect(this.gainFilter), this.audioIn[e.id] = n, this.outputStream = this.destination.stream
			}
		}, a.updateStream = function(e) {
			if(this.audioIn)
				for(var t in this.audioIn) this.audioIn[t] && this.audioIn[t].disconnect(0), this.audioIn[t] = null;
			this.audioIn = {}, this.stream = e, this.initAudioIn()
		}, a.setGain = function(e) {
			this.support && (this.gainFilter.gain.value = e, this.gain = e)
		}, a.getGain = function() {
			return this.gain
		}, a.off = function() {
			return this.setGain(0)
		}, a.on = function() {
			this.setGain(1)
		}, a.destroy = function() {
			if(this.instant = 0, this.slow = 0, this.clip = 0, this.gainFilter && this.gainFilter.disconnect(0), this.script && this.script.disconnect(0), this.audioIn)
				for(var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
			this.audioIn = {};
			var t = this.stream;

			function n(e) {
				e && e.getTracks().forEach(function(t) {
					e.removeTrack(t)
				})
			}
			/(MediaStream|LocalMediaStream)/.test(t.constructor) && n(t), t.constructor === Array && t.forEach(function(e) {
				n(e)
			}), this.stream = null, this.outputStream = null
		}, a.getVolumeData = function() {
			return this.instant.toFixed(2)
		}, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = c(n(1)),
			i = c(n(4)),
			a = c(n(3)),
			o = c(n(2)),
			s = c(n(199));

		function c(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = n(10),
			u = function(e) {
				function t() {
					(0, r.default)(this, t);
					var e = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return e.recordedChunks = [], e.isRecording = !1, e.contentTypes = ["video/mp4;codecs=opus", "video/webm", "video/webm;codecs=h264", "video/x-matroska;codecs=opus", "video/invalid"], e
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "validation",
					value: function(e) {
						return e.filter(function(e) {
							return MediaRecorder.isTypeSupported(e)
						})
					}
				}, {
					key: "format",
					value: function() {
						var e = this,
							t = this.stream,
							n = this.option;
						return new Promise(function(r, i) {
							if(/(MediaStream)/.test(t.constructor) && (t = [t]), t.constructor !== Array) return i("音视频录制输入错误");
							if("audio" === n.type) return e.audioController = new s.default({
								stream: t,
								uid: e.uid
							}), e.opStream = e.audioController.outputStream, r();
							var a = new MediaStream;
							if(t.forEach(function(e) {
									e && /(MediaStream)/.test(e.constructor) && e.getTracks().forEach(function(e) {
										a.addTrack(e)
									})
								}), 0 === a.getTracks().length) return i("当前没有任何音视频数据，无法进行录制");
							e.opStream = a, r()
						})
					}
				}, {
					key: "start",
					value: function(e) {
						var t = this,
							n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
								type: "video"
							};
						return n.uid || n.account ? e ? window.MediaRecorder && MediaRecorder.isTypeSupported ? (this.stream = e, this.option = n, "audio" === n.type && (this.contentTypes = ["audio/wav", "audio/ogg", "audio/pcm", "audio/webm"]), (this.mimeType = this.validation(this.contentTypes)[0]) ? this.isRecording ? Promise.reject("音视频正在录制中，请勿重复操作") : this.format().then(function() {
							return t._start()
						}).catch(function(e) {
							return Promise.reject(e)
						}) : Promise.reject("当前浏览器不支持对应格式的视频录制")) : Promise.reject("当前浏览器不支持音视频录制功能") : Promise.reject("获取视频流失败") : Promise.reject("需要录制的帐号缺失")
					}
				}, {
					key: "_start",
					value: function() {
						var e = {
								audioBitsPerSecond: 128e3,
								videoBitsPerSecond: 25e5,
								mimeType: this.mimeType
							},
							t = this.recorder = new MediaRecorder(this.opStream, e);
						return t.ondataavailable = this.ondataavailable.bind(this), t.onstop = this.onstop.bind(this), this.isRecording = !0, this.status = "started", this.recorder.start(), this.startTimer(), Promise.resolve(this.option)
					}
				}, {
					key: "stop",
					value: function(e) {
						if(!this.isRecording || !this.recorder) return Promise.reject("请先开启音视频录制");
						if(this.status = "stopped", WEBRTCLOG.log("MediaRecorder: stop event", this.recorder.state), "inactive" === this.recorder.state) return WEBRTCLOG.warn("MediaRecorder already stopped:", this.recorder.state), Promise.reject("音视频录制已结束，请勿重复操作");
						var t = (this.option.account || this.option.uid) + "--" + Date.now() + "--" + (this.option.type || "video");
						return this.fileName = e || t, this.recorder.stop(), Promise.resolve()
					}
				}, {
					key: "leave",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						if(this.isRecording && this.recorder) {
							var t = e.uid;
							t && this.option && this.option && t == this.option.uid && this.stop()
						}
					}
				}, {
					key: "ondataavailable",
					value: function(e) {
						if(WEBRTCLOG.log("MediaRecorder: data received"), !(e.data.size > 0)) return this.stop(), Promise.reject("获取视频流失败");
						this.recordedChunks.push(e.data)
					}
				}, {
					key: "onstop",
					value: function() {
						if(WEBRTCLOG.log("MediaRecorder: onstop"), "stopped" !== this.status) return this._start();
						var e = new Blob(this.recordedChunks, {
								type: this.mimeType
							}),
							t = URL.createObjectURL(e),
							n = document.createElement("a");
						document.body.appendChild(n), n.style = "display: none", n.href = t, n.download = (this.fileName || Date.now()) + ".webm", n.click(), window.URL.revokeObjectURL(t), this.destroy(), this.clearTimer(), this.emit("stopRecord")
					}
				}, {
					key: "pause",
					value: function() {
						this.recorder && this.recorder.pause()
					}
				}, {
					key: "resume",
					value: function() {
						this.recorder && this.recorder.resume()
					}
				}, {
					key: "destroy",
					value: function() {
						this.stream = null, this.recorder = null, this.recordedChunks = [], this.isRecording = !1, this.audioController && this.audioController.destroy(), this.audioController = null, this.fileName = this.fileNameDefault = "", this.option = {}, this.status = ""
					}
				}, {
					key: "startTimer",
					value: function() {
						var e = this;
						this.timer || (this.timer = setInterval(function() {
							WEBRTCLOG.log((new Date).toLocaleString() + " --\x3e MediaRecorder status: " + e.recorder.state)
						}, 2e3))
					}
				}, {
					key: "clearTimer",
					value: function() {
						this.timer && (clearInterval(this.timer), this.timer = null)
					}
				}], [{
					key: "init",
					value: function(e) {
						e || window.Logger
					}
				}]), t
			}(d);
		t.default = u, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = d(n(83)),
			i = d(n(82)),
			a = d(n(1)),
			o = d(n(3)),
			s = d(n(2)),
			c = d(n(114));

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t() {
				(0, a.default)(this, t);
				var e = (0, o.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return e.init(), e
			}
			return(0, s.default)(t, e), t
		}(n(10));
		t.default = u;
		var l = u.prototype;
		l.init = function() {
			if(this.getDevices().catch(function(e) {
					WEBRTCLOG.warn(e)
				}), navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
				var e = void 0,
					t = this;
				navigator.mediaDevices.ondevicechange = function(n) {
					e && (clearTimeout(e), e = null);
					var r = Object.assign({}, t.devicesCache);
					e = setTimeout(function() {
						e = null, t.getDevices(!0).then(function() {
							t.emit("deviceStatus", t.devicesCache), t.filterDeviceChange(t.devicesCache, r)
						}).catch(function() {})
					}, 500)
				}
			}
		}, l.filterDeviceChange = function(e, t) {
			function n(e) {
				var t = {};
				return Object.keys(e).forEach(function(n) {
					e[n].forEach(function(e) {
						t[n + e.deviceId] = Object.assign({}, e, {
							type: n
						})
					})
				}), t
			}
			var r = n(e),
				i = n(t),
				a = Object.keys(r),
				o = Object.keys(i);
			if(a.length > o.length) {
				var s = [];
				a.forEach(function(e) {
					-1 === o.indexOf(e) && s.push(r[e])
				}), s.length && this.emit("deviceAdd", s)
			} else {
				var c = [];
				o.forEach(function(e) {
					-1 === a.indexOf(e) && c.push(i[e])
				}), c.length && this.emit("deviceRemove", c)
			}
		}, l.getDevicesOfType = function(e) {
			return void 0 !== e ? this.getDevices().then(function(t) {
				return t[e]
			}) : this.getDevices()
		}, l.getDevices = function(e) {
			var t = this,
				n = void 0;
			return !e && this.devicesCache ? Promise.resolve(this.devicesCache) : new Promise(function(e, a) {
				var o = this;
				(0, i.default)(r.default.mark(function i() {
					return r.default.wrap(function(r) {
						for(;;) switch(r.prev = r.next) {
							case 0:
								return r.next = 2, c.default.getDevices().catch(function(e) {
									return a(e)
								});
							case 2:
								if(n = r.sent) {
									r.next = 5;
									break
								}
								return r.abrupt("return", a("没有找到可用设备"));
							case 5:
								return t.devicesCache = n, r.abrupt("return", e(n));
							case 7:
							case "end":
								return r.stop()
						}
					}, i, o)
				}))()
			})
		}, l.getDeviceStatus = function() {
			return {
				hasAudio: this.devicesCache && this.devicesCache.audioIn.length > 0 || !1,
				hasVideo: this.devicesCache && this.devicesCache.video.length > 0 || !1
			}
		}, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		var r = n(16),
			i = n(113),
			a = n(145);
		r(r.S, "Promise", {
			try: function(e) {
				var t = i.f(this),
					n = a(e);
				return(n.e ? t.reject : t.resolve)(n.v), t.promise
			}
		})
	}, function(e, t, n) {
		"use strict";
		var r = n(16),
			i = n(7),
			a = n(8),
			o = n(147),
			s = n(144);
		r(r.P + r.R, "Promise", {
			finally: function(e) {
				var t = o(this, i.Promise || a.Promise),
					n = "function" == typeof e;
				return this.then(n ? function(n) {
					return s(t, e()).then(function() {
						return n
					})
				} : e, n ? function(n) {
					return s(t, e()).then(function() {
						throw n
					})
				} : e)
			}
		})
	}, function(e, t, n) {
		"use strict";
		var r = n(8),
			i = n(7),
			a = n(12),
			o = n(14),
			s = n(6)("species");
		e.exports = function(e) {
			var t = "function" == typeof i[e] ? i[e] : r[e];
			o && t && !t[s] && a.f(t, s, {
				configurable: !0,
				get: function() {
					return this
				}
			})
		}
	}, function(e, t, n) {
		var r = n(19);
		e.exports = function(e, t, n) {
			for(var i in t) n && e[i] ? e[i] = t[i] : r(e, i, t[i]);
			return e
		}
	}, function(e, t, n) {
		var r = n(8),
			i = n(146).set,
			a = r.MutationObserver || r.WebKitMutationObserver,
			o = r.process,
			s = r.Promise,
			c = "process" == n(33)(o);
		e.exports = function() {
			var e, t, n, d = function() {
				var r, i;
				for(c && (r = o.domain) && r.exit(); e;) {
					i = e.fn, e = e.next;
					try {
						i()
					} catch(r) {
						throw e ? n() : t = void 0, r
					}
				}
				t = void 0, r && r.enter()
			};
			if(c) n = function() {
				o.nextTick(d)
			};
			else if(!a || r.navigator && r.navigator.standalone)
				if(s && s.resolve) {
					var u = s.resolve();
					n = function() {
						u.then(d)
					}
				} else n = function() {
					i.call(r, d)
				};
			else {
				var l = !0,
					p = document.createTextNode("");
				new a(d).observe(p, {
					characterData: !0
				}), n = function() {
					p.data = l = !l
				}
			}
			return function(r) {
				var i = {
					fn: r,
					next: void 0
				};
				t && (t.next = i), e || (e = i, n()), t = i
			}
		}
	}, function(e, t) {
		e.exports = function(e, t, n) {
			var r = void 0 === n;
			switch(t.length) {
				case 0:
					return r ? e() : e.call(n);
				case 1:
					return r ? e(t[0]) : e.call(n, t[0]);
				case 2:
					return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
				case 3:
					return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
				case 4:
					return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
			}
			return e.apply(n, t)
		}
	}, function(e, t, n) {
		var r = n(36),
			i = n(134),
			a = n(133),
			o = n(15),
			s = n(68),
			c = n(111),
			d = {},
			u = {};
		(t = e.exports = function(e, t, n, l, p) {
			var f, h, m, v, _ = p ? function() {
					return e
				} : c(e),
				R = r(n, l, t ? 2 : 1),
				g = 0;
			if("function" != typeof _) throw TypeError(e + " is not iterable!");
			if(a(_)) {
				for(f = s(e.length); f > g; g++)
					if((v = t ? R(o(h = e[g])[0], h[1]) : R(e[g])) === d || v === u) return v
			} else
				for(m = _.call(e); !(h = m.next()).done;)
					if((v = i(m, R, h.value, t)) === d || v === u) return v
		}).BREAK = d, t.RETURN = u
	}, function(e, t) {
		e.exports = function(e, t, n, r) {
			if(!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
			return e
		}
	}, function(e, t, n) {
		"use strict";
		var r, i, a, o, s = n(35),
			c = n(8),
			d = n(36),
			u = n(79),
			l = n(16),
			p = n(18),
			f = n(55),
			h = n(209),
			m = n(208),
			v = n(147),
			_ = n(146).set,
			R = n(206)(),
			g = n(113),
			y = n(145),
			C = n(144),
			T = c.TypeError,
			E = c.process,
			b = c.Promise,
			S = "process" == u(E),
			O = function() {},
			P = i = g.f,
			k = !! function() {
				try {
					var e = b.resolve(1),
						t = (e.constructor = {})[n(6)("species")] = function(e) {
							e(O, O)
						};
					return(S || "function" == typeof PromiseRejectionEvent) && e.then(O) instanceof t
				} catch(e) {}
			}(),
			I = function(e) {
				var t;
				return !(!p(e) || "function" != typeof(t = e.then)) && t
			},
			A = function(e, t) {
				if(!e._n) {
					e._n = !0;
					var n = e._c;
					R(function() {
						for(var r = e._v, i = 1 == e._s, a = 0, o = function(t) {
								var n, a, o, s = i ? t.ok : t.fail,
									c = t.resolve,
									d = t.reject,
									u = t.domain;
								try {
									s ? (i || (2 == e._h && w(e), e._h = 1), !0 === s ? n = r : (u && u.enter(), n = s(r), u && (u.exit(), o = !0)), n === t.promise ? d(T("Promise-chain cycle")) : (a = I(n)) ? a.call(n, c, d) : c(n)) : d(r)
								} catch(e) {
									u && !o && u.exit(), d(e)
								}
							}; n.length > a;) o(n[a++]);
						e._c = [], e._n = !1, t && !e._h && L(e)
					})
				}
			},
			L = function(e) {
				_.call(c, function() {
					var t, n, r, i = e._v,
						a = D(e);
					if(a && (t = y(function() {
							S ? E.emit("unhandledRejection", i, e) : (n = c.onunhandledrejection) ? n({
								promise: e,
								reason: i
							}) : (r = c.console) && r.error && r.error("Unhandled promise rejection", i)
						}), e._h = S || D(e) ? 2 : 1), e._a = void 0, a && t.e) throw t.v
				})
			},
			D = function(e) {
				return 1 !== e._h && 0 === (e._a || e._c).length
			},
			w = function(e) {
				_.call(c, function() {
					var t;
					S ? E.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
						promise: e,
						reason: e._v
					})
				})
			},
			M = function(e) {
				var t = this;
				t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), A(t, !0))
			},
			W = function(e) {
				var t, n = this;
				if(!n._d) {
					n._d = !0, n = n._w || n;
					try {
						if(n === e) throw T("Promise can't be resolved itself");
						(t = I(e)) ? R(function() {
							var r = {
								_w: n,
								_d: !1
							};
							try {
								t.call(e, d(W, r, 1), d(M, r, 1))
							} catch(e) {
								M.call(r, e)
							}
						}): (n._v = e, n._s = 1, A(n, !1))
					} catch(e) {
						M.call({
							_w: n,
							_d: !1
						}, e)
					}
				}
			};
		k || (b = function(e) {
			h(this, b, "Promise", "_h"), f(e), r.call(this);
			try {
				e(d(W, this, 1), d(M, this, 1))
			} catch(e) {
				M.call(this, e)
			}
		}, (r = function(e) {
			this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
		}).prototype = n(205)(b.prototype, {
			then: function(e, t) {
				var n = P(v(this, b));
				return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = S ? E.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && A(this, !1), n.promise
			},
			catch: function(e) {
				return this.then(void 0, e)
			}
		}), a = function() {
			var e = new r;
			this.promise = e, this.resolve = d(W, e, 1), this.reject = d(M, e, 1)
		}, g.f = P = function(e) {
			return e === b || e === o ? new a(e) : i(e)
		}), l(l.G + l.W + l.F * !k, {
			Promise: b
		}), n(34)(b, "Promise"), n(204)("Promise"), o = n(7).Promise, l(l.S + l.F * !k, "Promise", {
			reject: function(e) {
				var t = P(this);
				return(0, t.reject)(e), t.promise
			}
		}), l(l.S + l.F * (s || !k), "Promise", {
			resolve: function(e) {
				return C(s && this === o ? b : this, e)
			}
		}), l(l.S + l.F * !(k && n(132)(function(e) {
			b.all(e).catch(O)
		})), "Promise", {
			all: function(e) {
				var t = this,
					n = P(t),
					r = n.resolve,
					i = n.reject,
					a = y(function() {
						var n = [],
							a = 0,
							o = 1;
						m(e, !1, function(e) {
							var s = a++,
								c = !1;
							n.push(void 0), o++, t.resolve(e).then(function(e) {
								c || (c = !0, n[s] = e, --o || r(n))
							}, i)
						}), --o || r(n)
					});
				return a.e && i(a.v), n.promise
			},
			race: function(e) {
				var t = this,
					n = P(t),
					r = n.reject,
					i = y(function() {
						m(e, !1, function(e) {
							t.resolve(e).then(n.resolve, r)
						})
					});
				return i.e && r(i.v), n.promise
			}
		})
	}, function(e, t, n) {
		n(74), n(49), n(54), n(210), n(203), n(202), e.exports = n(7).Promise
	}, function(e, t, n) {
		e.exports = {
			default: n(211),
			__esModule: !0
		}
	}, function(e, t) {
		! function(t) {
			"use strict";
			var n, r = Object.prototype,
				i = r.hasOwnProperty,
				a = "function" == typeof Symbol ? Symbol : {},
				o = a.iterator || "@@iterator",
				s = a.asyncIterator || "@@asyncIterator",
				c = a.toStringTag || "@@toStringTag",
				d = "object" == typeof e,
				u = t.regeneratorRuntime;
			if(u) d && (e.exports = u);
			else {
				(u = t.regeneratorRuntime = d ? e.exports : {}).wrap = y;
				var l = "suspendedStart",
					p = "suspendedYield",
					f = "executing",
					h = "completed",
					m = {},
					v = {};
				v[o] = function() {
					return this
				};
				var _ = Object.getPrototypeOf,
					R = _ && _(_(L([])));
				R && R !== r && i.call(R, o) && (v = R);
				var g = b.prototype = T.prototype = Object.create(v);
				E.prototype = g.constructor = b, b.constructor = E, b[c] = E.displayName = "GeneratorFunction", u.isGeneratorFunction = function(e) {
					var t = "function" == typeof e && e.constructor;
					return !!t && (t === E || "GeneratorFunction" === (t.displayName || t.name))
				}, u.mark = function(e) {
					return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, c in e || (e[c] = "GeneratorFunction")), e.prototype = Object.create(g), e
				}, u.awrap = function(e) {
					return {
						__await: e
					}
				}, S(O.prototype), O.prototype[s] = function() {
					return this
				}, u.AsyncIterator = O, u.async = function(e, t, n, r) {
					var i = new O(y(e, t, n, r));
					return u.isGeneratorFunction(t) ? i : i.next().then(function(e) {
						return e.done ? e.value : i.next()
					})
				}, S(g), g[c] = "Generator", g[o] = function() {
					return this
				}, g.toString = function() {
					return "[object Generator]"
				}, u.keys = function(e) {
					var t = [];
					for(var n in e) t.push(n);
					return t.reverse(),
						function n() {
							for(; t.length;) {
								var r = t.pop();
								if(r in e) return n.value = r, n.done = !1, n
							}
							return n.done = !0, n
						}
				}, u.values = L, A.prototype = {
					constructor: A,
					reset: function(e) {
						if(this.prev = 0, this.next = 0, this.sent = this._sent = n, this.done = !1, this.delegate = null, this.method = "next", this.arg = n, this.tryEntries.forEach(I), !e)
							for(var t in this) "t" === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n)
					},
					stop: function() {
						this.done = !0;
						var e = this.tryEntries[0].completion;
						if("throw" === e.type) throw e.arg;
						return this.rval
					},
					dispatchException: function(e) {
						if(this.done) throw e;
						var t = this;

						function r(r, i) {
							return s.type = "throw", s.arg = e, t.next = r, i && (t.method = "next", t.arg = n), !!i
						}
						for(var a = this.tryEntries.length - 1; a >= 0; --a) {
							var o = this.tryEntries[a],
								s = o.completion;
							if("root" === o.tryLoc) return r("end");
							if(o.tryLoc <= this.prev) {
								var c = i.call(o, "catchLoc"),
									d = i.call(o, "finallyLoc");
								if(c && d) {
									if(this.prev < o.catchLoc) return r(o.catchLoc, !0);
									if(this.prev < o.finallyLoc) return r(o.finallyLoc)
								} else if(c) {
									if(this.prev < o.catchLoc) return r(o.catchLoc, !0)
								} else {
									if(!d) throw new Error("try statement without catch or finally");
									if(this.prev < o.finallyLoc) return r(o.finallyLoc)
								}
							}
						}
					},
					abrupt: function(e, t) {
						for(var n = this.tryEntries.length - 1; n >= 0; --n) {
							var r = this.tryEntries[n];
							if(r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
								var a = r;
								break
							}
						}
						a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
						var o = a ? a.completion : {};
						return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, m) : this.complete(o)
					},
					complete: function(e, t) {
						if("throw" === e.type) throw e.arg;
						return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), m
					},
					finish: function(e) {
						for(var t = this.tryEntries.length - 1; t >= 0; --t) {
							var n = this.tryEntries[t];
							if(n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), I(n), m
						}
					},
					catch: function(e) {
						for(var t = this.tryEntries.length - 1; t >= 0; --t) {
							var n = this.tryEntries[t];
							if(n.tryLoc === e) {
								var r = n.completion;
								if("throw" === r.type) {
									var i = r.arg;
									I(n)
								}
								return i
							}
						}
						throw new Error("illegal catch attempt")
					},
					delegateYield: function(e, t, r) {
						return this.delegate = {
							iterator: L(e),
							resultName: t,
							nextLoc: r
						}, "next" === this.method && (this.arg = n), m
					}
				}
			}

			function y(e, t, n, r) {
				var i = t && t.prototype instanceof T ? t : T,
					a = Object.create(i.prototype),
					o = new A(r || []);
				return a._invoke = function(e, t, n) {
					var r = l;
					return function(i, a) {
						if(r === f) throw new Error("Generator is already running");
						if(r === h) {
							if("throw" === i) throw a;
							return D()
						}
						for(n.method = i, n.arg = a;;) {
							var o = n.delegate;
							if(o) {
								var s = P(o, n);
								if(s) {
									if(s === m) continue;
									return s
								}
							}
							if("next" === n.method) n.sent = n._sent = n.arg;
							else if("throw" === n.method) {
								if(r === l) throw r = h, n.arg;
								n.dispatchException(n.arg)
							} else "return" === n.method && n.abrupt("return", n.arg);
							r = f;
							var c = C(e, t, n);
							if("normal" === c.type) {
								if(r = n.done ? h : p, c.arg === m) continue;
								return {
									value: c.arg,
									done: n.done
								}
							}
							"throw" === c.type && (r = h, n.method = "throw", n.arg = c.arg)
						}
					}
				}(e, n, o), a
			}

			function C(e, t, n) {
				try {
					return {
						type: "normal",
						arg: e.call(t, n)
					}
				} catch(e) {
					return {
						type: "throw",
						arg: e
					}
				}
			}

			function T() {}

			function E() {}

			function b() {}

			function S(e) {
				["next", "throw", "return"].forEach(function(t) {
					e[t] = function(e) {
						return this._invoke(t, e)
					}
				})
			}

			function O(e) {
				var t;
				this._invoke = function(n, r) {
					function a() {
						return new Promise(function(t, a) {
							! function t(n, r, a, o) {
								var s = C(e[n], e, r);
								if("throw" !== s.type) {
									var c = s.arg,
										d = c.value;
									return d && "object" == typeof d && i.call(d, "__await") ? Promise.resolve(d.__await).then(function(e) {
										t("next", e, a, o)
									}, function(e) {
										t("throw", e, a, o)
									}) : Promise.resolve(d).then(function(e) {
										c.value = e, a(c)
									}, o)
								}
								o(s.arg)
							}(n, r, t, a)
						})
					}
					return t = t ? t.then(a, a) : a()
				}
			}

			function P(e, t) {
				var r = e.iterator[t.method];
				if(r === n) {
					if(t.delegate = null, "throw" === t.method) {
						if(e.iterator.return && (t.method = "return", t.arg = n, P(e, t), "throw" === t.method)) return m;
						t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
					}
					return m
				}
				var i = C(r, e.iterator, t.arg);
				if("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, m;
				var a = i.arg;
				return a ? a.done ? (t[e.resultName] = a.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = n), t.delegate = null, m) : a : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, m)
			}

			function k(e) {
				var t = {
					tryLoc: e[0]
				};
				1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
			}

			function I(e) {
				var t = e.completion || {};
				t.type = "normal", delete t.arg, e.completion = t
			}

			function A(e) {
				this.tryEntries = [{
					tryLoc: "root"
				}], e.forEach(k, this), this.reset(!0)
			}

			function L(e) {
				if(e) {
					var t = e[o];
					if(t) return t.call(e);
					if("function" == typeof e.next) return e;
					if(!isNaN(e.length)) {
						var r = -1,
							a = function t() {
								for(; ++r < e.length;)
									if(i.call(e, r)) return t.value = e[r], t.done = !1, t;
								return t.value = n, t.done = !0, t
							};
						return a.next = a
					}
				}
				return {
					next: D
				}
			}

			function D() {
				return {
					value: n,
					done: !0
				}
			}
		}(function() {
			return this
		}() || Function("return this")())
	}, function(e, t, n) {
		var r = function() {
				return this
			}() || Function("return this")(),
			i = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime") >= 0,
			a = i && r.regeneratorRuntime;
		if(r.regeneratorRuntime = void 0, e.exports = n(213), i) r.regeneratorRuntime = a;
		else try {
			delete r.regeneratorRuntime
		} catch(e) {
			r.regeneratorRuntime = void 0
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(114);
		Object.defineProperty(t, "Device", {
			enumerable: !0,
			get: function() {
				return o(r).default
			}
		});
		var i = n(201);
		Object.defineProperty(t, "MDevices", {
			enumerable: !0,
			get: function() {
				return o(i).default
			}
		});
		var a = n(200);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "Recorder", {
			enumerable: !0,
			get: function() {
				return o(a).default
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = o(n(1)),
			i = o(n(4)),
			a = n(31);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = n(5),
			c = s.info.nrtcVersion,
			d = n(21),
			u = "//statistic.live.126.net/webrtc/stat",
			l = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, r.default)(this, e);
					var n = t.appkey;
					this.infos = {}, this.init(n), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "resetStatus",
					value: function() {}
				}, {
					key: "init",
					value: function(e) {
						this.infos = Object.assign(this.infos, {
							interval: 30,
							ver: 2,
							platform: p.convertPlatform(d.os.family) + "-" + d.os.version,
							browser: d.name + "-" + d.version,
							sdk_ver: c || "3.6.0",
							uid: null,
							appkey: e,
							time: null,
							data: {}
						})
					}
				}, {
					key: "clear",
					value: function() {
						this.infos.data = {}
					}
				}, {
					key: "start",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						this.infos.appkey = e.appKey || e.appkey || this.infos.appkey, this.infos.cid = e.cid, this.infos.uid = e.uid
					}
				}, {
					key: "stop",
					value: function() {
						this.clear()
					}
				}, {
					key: "update",
					value: function(e) {
						this.infos.data["stat_" + Date.now()] = e, Object.keys(this.infos.data).length === this.infos.interval && this.send()
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						0 !== Object.keys(this.infos.data).length && (this.infos.time = Date.now(), s.wssServer && (u = u.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
							type: "post",
							url: u,
							data: this.infos
						}).then(function(t) {
							e.clear()
						}).catch(function(e) {
							WEBRTCLOG.log("err", e)
						}))
					}
				}]), e
			}();
		t.default = l;
		var p = {
			convertNetwork: function(e) {
				return {
					wlan: "wifi",
					lan: "ethernet"
				}[e] || "unknown"
			},
			convertPlatform: function(e) {
				var t = void 0;
				return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
			}
		};
		e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = o(n(1)),
			i = o(n(4)),
			a = n(31);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = n(5),
			c = s.info.nrtcVersion,
			d = n(21),
			u = "https://statistic.live.126.net/statistic/realtime/sdkinfo",
			l = "https://statistic.live.126.net/statics/report/webrtc/networkProbeLog",
			p = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, r.default)(this, e);
					var n = t.appkey;
					this.infos = {}, this.userlist = [], this.localVolumn = 0, this.local = {}, this.remote = {}, this.audioBwe = {
						bitsSentCurrent: 0,
						bitsRecvCurrent: []
					}, this.videoBwe = {
						bitsSentCurrent: 0,
						bitsRecvCurrent: []
					}, this.netDetectDownData = {
						v_lost: [],
						rtt: [],
						real_v_res: [],
						real_v_kbps_n: [],
						v_fps: []
					}, this.publicIP = "", this.init(n), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "init",
					value: function(e) {
						this.infos = Object.assign(this.infos, {
							ver: 2,
							device: -1,
							isp: -1,
							platform: f.convertPlatform(d.os.family) + "-" + d.os.version,
							browser: d.name + "-" + d.version,
							sdk_ver: c || "3.6.0",
							appkey: e,
							interval: 60,
							samples: 30,
							time: null,
							qos_algorithm: -1,
							fec_algorithm: -1,
							qos_scene: -1,
							qos_strategy: -1
						})
					}
				}, {
					key: "resetStatus",
					value: function() {
						this.infos = Object.assign(this.infos, {
							uid: null,
							cid: null,
							push_url: null,
							turn_ip: null,
							proxy_ip: null,
							meeting: !1,
							live: !1
						}), this.clearInfoData(), this.uidSsrcMap = {}, this.userlist = [], this.audioBwe = {
							bitsSentCurrent: 0,
							bitsRecvCurrent: []
						}, this.videoBwe = {
							bitsSentCurrent: 0,
							bitsRecvCurrent: []
						}
					}
				}, {
					key: "initInfoData",
					value: function(e) {
						var t = {
							uid: e,
							cid: this.imInfo && this.imInfo.cid || -1,
							push_url: this.sessionConfig && this.sessionConfig.rtmpUrl || -1,
							turn_ip: this.imInfo && this.imInfo.turnMap || -1,
							proxy_ip: this.imInfo && this.imInfo.turnMap || -1,
							meeting: /^meeting$/gi.test(this.imInfo.sessionMode),
							live: this.sessionConfig && this.sessionConfig.liveEnable || !1,
							p2p: !1,
							isp: -1,
							net: -1,
							connect_state: this.imInfo && this.imInfo.code || 200,
							signalling_time: (this.sessionConfig && this.sessionConfig.signalEndTime || 0) - (this.sessionConfig && this.sessionConfig.signalStartTime || 0),
							connect_time: (this.sessionConfig && this.sessionConfig.rtcEndTime || 0) - (this.sessionConfig && this.sessionConfig.rtcStartTime || 0)
						};
						this.infos = Object.assign(this.infos, t)
					}
				}, {
					key: "clearInfoData",
					value: function() {
						this.localVolumn = 0, this.infos = Object.assign(this.infos, {
							rx: {
								audio: [],
								video: []
							},
							tx: {
								a_lost: [],
								v_lost: [],
								rtt: [],
								rtt_mdev: [],
								set_v_fps: [],
								qos_v_fps: [],
								v_fps: [],
								set_v_quality: [],
								real_v_res: [],
								real_v_kbps: [],
								real_v_kbps_n: [],
								real_a_kbps: [],
								real_a_kbps_n: [],
								set_v_kbps: [],
								qos_v_kbps: [],
								tx_bw_kbps: [],
								a_volume: []
							}
						})
					}
				}, {
					key: "start",
					value: function(e) {
						var t = e.imInfo,
							n = e.sessionConfig,
							r = e.videoConfig;
						t && (this.infos.appkey = this.infos.appkey, this.imInfo = t || {}, this.infos.cid = this.imInfo.cid, this.infos.uid = this.imInfo.uid, this.sessionConfig = n || {}, this.videoConfig = r || {}, this.clearSecond(), this.getTurnMap(), this.initInfoData(this.infos.uid))
					}
				}, {
					key: "stop",
					value: function() {
						this.resetStatus()
					}
				}, {
					key: "clearSecond",
					value: function() {
						this.paramSecond = {
							packetsLostAudio: "",
							packetsLostAudioList: [],
							packetsSentPerSecondAudio: [],
							packetsLostVideo: "",
							packetsLostVideoList: [],
							packetsSentPerSecondVideo: [],
							googInterframeDelayMaxList: [],
							vrdolr: "",
							vrdohr: "",
							downPacketsLostVideo: "",
							downPacketsLostVideoList: [],
							downPpacketsSentPerSecondVideo: []
						}
					}
				}, {
					key: "update",
					value: function(e, t) {
						this.imInfo.netDetect && console.log("sdk数据上报更新 data: ", e);
						var n = [],
							r = [],
							i = [],
							a = [];
						for(var o in e) - 1 !== o.indexOf("_send_") && -1 !== o.indexOf("_audio") ? n.push(e[o]) : -1 !== o.indexOf("_send_") && -1 !== o.indexOf("_video") ? r.push(e[o]) : -1 !== o.indexOf("_recv_") && -1 !== o.indexOf("_audio") ? i.push(e[o]) : -1 !== o.indexOf("_recv_") && -1 !== o.indexOf("_video") ? a.push(e[o]) : -1 !== o.indexOf("Conn-audio-1-0") ? this.publicIP = e[o] && e[o].googLocalAddress.match(/([0-9\.]+)/)[1] : this.network = e[o] && e[o].network;
						if(3 === this.paramSecond.packetsLostAudioList.length && this.paramSecond.packetsLostAudioList.shift(), 3 === this.paramSecond.packetsLostVideoList.length && this.paramSecond.packetsLostVideoList.shift(), 3 === this.paramSecond.packetsSentPerSecondAudio.length && this.paramSecond.packetsSentPerSecondAudio.shift(), 3 === this.paramSecond.packetsSentPerSecondVideo.length && this.paramSecond.packetsSentPerSecondVideo.shift(), 3 === this.paramSecond.googInterframeDelayMaxList.length && this.paramSecond.googInterframeDelayMaxList.shift(), this.paramSecond.packetsLostAudioList.push(parseFloat(n[0] && n[0].packetsLost || 0)), this.paramSecond.packetsLostVideoList.push(parseFloat(r[0] && r[0].packetsLost || 0)), this.paramSecond.downPacketsLostVideoList.push(parseFloat(a[0] && a[0].packetsLost || 0)), this.paramSecond.packetsSentPerSecondAudio.push(parseFloat(n[0] && n[0].packetsSent || 0)), this.paramSecond.packetsSentPerSecondVideo.push(parseFloat(r[0] && r[0].packetsSent || 0)), this.paramSecond.downPpacketsSentPerSecondVideo.push(parseFloat(a[0] && a[0].packetsReceived || 0)), this.paramSecond.googInterframeDelayMaxList.push(parseFloat(a[0] && a[0].googInterframeDelayMax || 0)), 1 !== t) {
							if(2 === t) {
								this.paramSecond.packetsLostAudio = (this.paramSecond.packetsLostAudioList[1] - this.paramSecond.packetsLostAudioList[0]) / (this.paramSecond.packetsSentPerSecondAudio[0] + this.paramSecond.packetsSentPerSecondAudio[1]) / 2 * 100, this.paramSecond.packetsLostVideo = ((this.paramSecond.packetsLostVideoList[1] - this.paramSecond.packetsLostVideoList[0]) / (this.paramSecond.packetsSentPerSecondVideo[0] + this.paramSecond.packetsSentPerSecondVideo[1]) / 2 * 100).toFixed(1), this.paramSecond.downPacketsLostVideo = (this.paramSecond.downPacketsLostVideoList[1] - this.paramSecond.downPacketsLostVideoList[0]) / (this.paramSecond.downPpacketsSentPerSecondVideo[0] + this.paramSecond.downPpacketsSentPerSecondVideo[1]) / 2 * 100;
								var s = 0,
									c = 0,
									d = 0,
									u = 0;
								this.paramSecond.googInterframeDelayMaxList[0] > 200 && this.paramSecond.googInterframeDelayMaxList[0] < 400 && (s = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[1] < 400 && (c = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[0] > 400 && (d = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 400 && (u = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond.vrdolr = s + c, this.paramSecond.vrdohr = d + u
							} else if(t % 2 == 1) {
								var l = this.paramSecond.packetsLostAudioList.length,
									p = this.paramSecond.packetsSentPerSecondAudio.length,
									f = this.paramSecond.packetsLostAudioList[l - 1],
									h = this.paramSecond.packetsSentPerSecondAudio[p - 1];
								this.paramSecond.packetsLostAudio = f / (f + h) * 100, l = this.paramSecond.packetsLostVideoList.length, p = this.paramSecond.packetsSentPerSecondVideo.length, f = this.paramSecond.packetsLostVideoList[l - 1], h = this.paramSecond.packetsSentPerSecondVideo[p - 1], this.paramSecond.packetsLostVideo = (f / (f + h) * 100).toFixed(1), l = this.paramSecond.downPacketsLostVideoList.length, p = this.paramSecond.downPpacketsSentPerSecondVideo.length, f = this.paramSecond.downPacketsLostVideoList[l - 1], h = this.paramSecond.downPpacketsSentPerSecondVideo[p - 1], this.paramSecond.downPacketsLostVideo = (f / (f + h) * 100).toFixed(1);
								var m = 0,
									v = 0,
									_ = 0,
									R = 0;
								this.paramSecond.googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[1] < 400 && (m = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[2] > 200 && this.paramSecond.googInterframeDelayMaxList[2] < 400 && (v = this.paramSecond.googInterframeDelayMaxList[2] / 2e3), this.paramSecond.googInterframeDelayMaxList[1] > 400 && (_ = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[2] > 400 && (R = this.paramSecond.googInterframeDelayMaxList[2] / 2e3), this.paramSecond.vrdolr = m + v, this.paramSecond.vrdohr = _ + R
							}
							t % 2 == 0 && (this.updateTxMediaInfo(n, r), this.updateRxMediaInfo(i, a), Object.keys(this.infos.rx.audio).length === this.infos.interval / 2 && this.send())
						}
					}
				}, {
					key: "updateOnce",
					value: function(e) {
						var t = e.imInfo,
							n = e.sessionConfig,
							r = e.rtcConnection;
						t && (this.imInfo = t || {}, this.sessionConfig = n || {}, this.rtcConnection = r || {}, this.videoConfig = e.videoConfig || {}, this.getTurnMap(), this.initInfoData(), this.send())
					}
				}, {
					key: "updateLocalVolumn",
					value: function(e) {
						this.localVolumn = e
					}
				}, {
					key: "updateRxMediaInfo",
					value: function(e, t) {
						var n = this;
						if(this.imInfo.netDetect) {
							var r = {
								v_lost: this.paramSecond.downPacketsLostVideo || 0,
								rtt: parseFloat(t[0] && t[0].googRtt || 0) || 0,
								real_v_kbps_n: t.length && t[0].bitsReceivedPerSecond || 0,
								v_fps: parseFloat(t[0] && t[0].googFrameRateOutput || 0) || 0,
								real_v_res: (t[0] && t[0].googFrameWidthReceived || 0) + "x" + (t[0] && t[0].googFrameHeightReceived || 0)
							};
							for(var i in r) this.netDetectDownData[i].push(r[i])
						}
						var a = {
								u: [],
								g: [],
								c: [],
								bn: [],
								bc: []
							},
							o = {
								u: [],
								i: [],
								bn: [],
								bc: [],
								r: [],
								f: [],
								vrdolr: [],
								vrdohr: []
							};
						e.map(function(e) {
							e.id && a.u.push(parseFloat(e.id.split("_")[3])), a.g.push(-1), a.c.push(-1), a.bn.push(e.bitsReceivedPerSecond || 0), a.bc.push(-1)
						}), t.map(function(e) {
							e.id && o.u.push(parseFloat(e.id.split("_")[3])), o.i.push(parseFloat(e.googInterframeDelayMax)), o.bn.push(e.bitsReceivedPerSecond || 0), o.bc.push(-1), o.r.push((e.googFrameWidthReceived || 0) + "x" + (e.googFrameHeightReceived || 0)), o.f.push(parseFloat(e.googFrameRateReceived)), o.vrdolr.push(n.paramSecond.vrdolr || -1), o.vrdohr.push(n.paramSecond.vrdohr || -1)
						}), this.infos.rx.audio.push(a), this.infos.rx.video.push(o)
					}
				}, {
					key: "getLocalMediaStats",
					value: function(e, t) {
						return {
							a_lost: this.paramSecond.packetsLostAudio || 0,
							v_lost: parseFloat(this.paramSecond.packetsLostVideo) || 0,
							rtt: parseFloat(t[0] && t[0].googRtt || 0) || 0,
							rtt_mdev: -1,
							set_v_fps: this.videoConfig.frameRate || 0,
							qos_v_fps: parseFloat(t[0] && t[0].googFrameRateInput || 0) || 0,
							v_fps: parseFloat(t[0] && t[0].googFrameRateSent || 0) || 0,
							set_v_quality: this.sessionConfig.videoQuality,
							real_v_res: (t[0] && t[0].googFrameWidthSent || 0) + "x" + (t[0] && t[0].googFrameHeightSent || 0),
							real_v_kbps: parseFloat(t[0] && t[0].googEncodeUsagePercent || 0) || 0,
							real_v_kbps_n: t[0] && t[0].bitsSentPerSecond || 0,
							real_a_kbps: -1,
							real_a_kbps_n: t[0] && t[0].bitsSentPerSecond || 0,
							set_v_kbps: -1,
							qos_v_kbps: 0,
							tx_bw_kbps: t[0] && t[0].bitsSentPerSecond || 0,
							a_volume: parseFloat(this.localVolumn) || 0
						}
					}
				}, {
					key: "updateTxMediaInfo",
					value: function(e, t) {
						var n = this.getLocalMediaStats(e, t);
						for(var r in n) this.infos.tx[r].push(n[r]);
						var i = ((navigator.connection || {}).type || "unknown").toString().toLowerCase();
						this.infos.net = f.convertNetwork(this.network || i)
					}
				}, {
					key: "getTurnMap",
					value: function() {
						if(this.imInfo) {
							var e = this.imInfo;
							e.serverMap && (e.serverMap.constructor === Object ? e.turnMap = e.serverMap || null : e.turnMap = JSON.parse(e.serverMap || null), e.turnMap = e.turnMap && e.turnMap.turnaddrs, e.turnMap = e.turnMap && e.turnMap[0], e.turnMap = e.turnMap.constructor === Array ? e.turnMap[0] : e.turnMap, e.turnMap = e.turnMap && e.turnMap.match(/\d+\.\d+.\d+\.\d+/), e.turnMap = e.turnMap[0])
						} else WEBRTCLOG.warn("尚未连接网关，不统计")
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						this.infos.uid && this.infos.cid && (this.imInfo.netDetect || (this.infos.time = Date.now(), this.infos.samples = this.infos.rx.audio.length, s.wssServer && (u = u.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
							type: "post",
							url: u,
							data: this.infos
						}).then(function(t) {
							e.clearInfoData()
						}).catch(function(t) {
							WEBRTCLOG.log("data uploader send", t), e.clearInfoData()
						})))
					}
				}, {
					key: "disposalDataForNetDetect",
					value: function(e) {
						var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
							n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
						return this.NetDetectData = {}, this.NetDetectData.cid = this.infos.cid, this.NetDetectData.user_ip = this.publicIP || "127.0.0.1", this.NetDetectData.browser = d.name + "-" + d.version, this.NetDetectData.server_ip = this.imInfo.wssArr && this.imInfo.wssArr.length && this.imInfo.wssArr[0], this.NetDetectData.upload_network_status = [], this.NetDetectData.download_network_status = [], this.imInfo.netDetect && (WEBRTCLOG.log("整理网络探测的数据: 计算RTT: ", this.infos.tx.rtt), WEBRTCLOG.log("整理网络探测的数据: 计算上行帧率: ", this.infos.tx.v_fps), WEBRTCLOG.log("整理网络探测的数据: 计算下行帧率: ", this.netDetectDownData.v_fps), WEBRTCLOG.log("整理网络探测的数据: 计算上行丢包率: ", this.infos.tx.v_lost), WEBRTCLOG.log("整理网络探测的数据: 计算下行丢包率: ", this.netDetectDownData.v_lost), WEBRTCLOG.log("整理网络探测的数据: 计算上行带宽: ", this.infos.tx.real_v_kbps_n), WEBRTCLOG.log("整理网络探测的数据: 计算下行带宽: ", this.netDetectDownData.real_v_kbps_n)), this.NetDetectData.upload_network_status.push({
							up_rtt: f.getRealValue(this.infos.tx.rtt) || 0,
							up_loss: parseInt(f.getRealValue(this.infos.tx.v_lost)) || 0,
							up_bwe: f.calculateAverage(this.infos.tx.real_v_kbps_n, 0) || 0,
							up_framerate: f.getRealValue(this.infos.tx.v_fps) || 0,
							up_resolution: f.getRealValue(this.infos.tx.real_v_res) || "0x0",
							codec: this.imInfo.codec,
							network_status: "",
							up_status: t ? "success" : "failed"
						}), this.NetDetectData.download_network_status.push({
							down_rtt: this.NetDetectData.upload_network_status[this.NetDetectData.upload_network_status.length - 1].up_rtt || 0,
							down_loss: parseInt(f.getRealValue(this.netDetectDownData.v_lost)) || 0,
							down_bwe: f.calculateAverage(this.netDetectDownData.real_v_kbps_n, 0) || 0,
							down_framerate: f.getRealValue(this.netDetectDownData.v_fps) || 0,
							down_resolution: f.getRealValue(this.netDetectDownData.real_v_res) || "0X0",
							codec: this.imInfo.codec,
							network_status: "",
							down_status: n ? "success" : "failed"
						}), e && (WEBRTCLOG.log("Safari自己计算的统计结果: ", JSON.stringify(this.NetDetectData, null, " ")), WEBRTCLOG.log("服务器反馈后的统计结果: ", JSON.stringify(e, null, " ")), this.NetDetectData.user_ip = e.user_ip, e.upload_network_status && (this.NetDetectData.upload_network_status[0].up_rtt = e.upload_network_status.up_rtt, this.NetDetectData.upload_network_status[0].up_loss = e.upload_network_status.up_loss), e.download_network_status && (this.NetDetectData.download_network_status[0].down_rtt = e.download_network_status.down_rtt), this.NetDetectData.download_network_status[0].down_rtt && this.NetDetectData.upload_network_status[0].up_rtt ? this.NetDetectData.download_network_status[0].down_rtt > this.NetDetectData.upload_network_status[0].up_rtt ? this.NetDetectData.download_network_status[0].down_rtt = this.NetDetectData.upload_network_status[0].up_rtt : this.NetDetectData.upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[0].down_rtt : this.NetDetectData.download_network_status[0].down_rtt ? this.NetDetectData.upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[0].down_rtt : this.NetDetectData.upload_network_status[0].up_rtt && (this.NetDetectData.download_network_status[0].down_rtt = this.NetDetectData.upload_network_status[0].up_rtt), this.NetDetectData.upload_network_status[0].up_framerate = f.calculateFrameRate(this.infos.tx.v_fps) || 0, this.NetDetectData.download_network_status[0].down_framerate = f.calculateFrameRate(this.netDetectDownData.v_fps) || 0, WEBRTCLOG.log("safar自己统计并且结合服务器反馈后的重合结果: ", JSON.stringify(this.NetDetectData, null, " "))), this.NetDetectData = f.assignResolution(this.NetDetectData), this.NetDetectData = this.computeNetStatus(this.NetDetectData), this.transportTime = 0, this.sendNetDetectData(this.NetDetectData), this.NetDetectData
					}
				}, {
					key: "computeNetStatus",
					value: function(e) {
						if(e) {
							if(e.download_network_status) {
								e.download_network_status[0].down_loss > e.upload_network_status[0].up_loss ? (e.loss_rate = e.download_network_status[0].down_loss, e.download_network_status[0].down_loss = e.download_network_status[0].down_loss - e.upload_network_status[0].up_loss) : e.download_network_status[0].down_loss - e.upload_network_status[0].up_loss <= 3 && e.download_network_status[0].down_loss - e.upload_network_status[0].up_loss >= -3 ? (WEBRTCLOG.log("差距少于等于3"), e.download_network_status[0].down_loss = 0, e.loss_rate = e.upload_network_status[0].up_loss) : (WEBRTCLOG.log("差距大"), e.download_network_status[0].down_loss = 0, e.loss_rate = e.upload_network_status[0].up_loss);
								var t = e.loss_rate / 20 * .5 + e.download_network_status[0].down_rtt / 1200 * .25 + 50 / 150 * .25;
								WEBRTCLOG.log("网络探测计算结果：", t), e.download_network_status[0].network_status = t <= .2625 ? "网络状况非常好，音视频通话流畅" : t < .55 ? "网络状况好，音视频通话偶有卡顿" : t <= 1 ? "网络状况差, 音频通话流畅" : "网络状况非常差，音频通话偶有卡顿", e.upload_network_status[0].up_bwe && e.upload_network_status[0].up_framerate && e.upload_network_status[0].up_rtt || (WEBRTCLOG.log("统计信息，没有获取到上行行带宽、帧率或者時延"), e.download_network_status[0].network_status = "网络状况非常糟糕，无法进行音视频通话"), e.upload_network_status[0].network_status = e.download_network_status[0].network_status
							}
							return e
						}
						WEBRTCLOG.log("computeNetStatus: Invalid Parameter")
					}
				}, {
					key: "sendNetDetectData",
					value: function(e) {
						var t = this;
						s.wssServer && (l = l.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
							type: "post",
							url: l,
							data: e
						}).then(function(e) {
							e && e.code && 200 == e.code && console.warn("网络探测结果发送成功：", e)
						}).catch(function(e) {
							WEBRTCLOG.log("网络探测结果发送失败：", e), t.transportTime < 2 ? (t.sendNetDetectData(t.NetDetectData), t.transportTime++) : t.transportTime = 0
						})
					}
				}]), e
			}();
		t.default = p;
		var f = {
			convertNetwork: function(e) {
				return {
					wlan: "wifi",
					lan: "ethernet"
				}[e] || "unknown"
			},
			convertPlatform: function(e) {
				var t = void 0;
				return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
			},
			calculateAverage: function(e, t) {
				if(e && 0 != e.length) return e.length < 3 && e.length > 1 ? e[e.length - 1] || e[e.length - 2] : 1 == e.length ? e[0] : ((e = e.slice(2)).sort(function(e, t) {
					return e - t
				}), 0 == t ? Math.round(e.reduce(n) / e.length) : (e.reduce(n) / e.length).toFixed(t));

				function n(e, t) {
					return e + t
				}
			},
			getRealValue: function(e) {
				if(e && 0 != e.length) {
					for(var t = e.length; t > 0; t--)
						if(e[t]) return e[t];
					return 0
				}
			},
			calculateFrameRate: function(e) {
				if(!e || 0 == e.length) return 0;
				if(1 == e.length) return e[0];
				for(var t = null, n = null, r = e.length; r >= 0; r--) {
					if(n && n > e[r]) {
						t = e[r];
						break
					}
					e[r] && !n && (n = e[r])
				}
				return n && t ? Math.round((n - t) / 2) : 0
			},
			assignResolution: function(e) {
				return e && e.upload_network_status && 0 != e.upload_network_status.length && e.download_network_status && 0 != e.download_network_status.length ? "0x0" != e.upload_network_status[0].up_resolution && "0X0" != e.download_network_status[0].down_resolution ? e : "0x0" != e.download_network_status[0].down_resolution ? (e.upload_network_status[0].up_resolution = e.download_network_status[0].down_resolution, e) : "0x0" != e.upload_network_status[0].up_resolution ? (e.download_network_status[0].down_resolution = e.upload_network_status[0].up_resolution, e) : e : e
			}
		};
		e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = o(n(1)),
			i = o(n(4)),
			a = n(31);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = n(5),
			c = (s.info.nrtcVersion, "https://statistic.live.126.net/statics/report/webrtc/global"),
			d = function() {
				function e() {
					arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
					(0, r.default)(this, e), this.data = {}, this.init()
				}
				return(0, i.default)(e, [{
					key: "init",
					value: function() {
						this.calling = !1, this.data = Object.assign(this.data, {
							account: "",
							uid: 0,
							cid: 0,
							deviceList: [],
							sessionInfo: {},
							mediaConstraint: {},
							peerConnections: [],
							mediaPlay: {},
							ext: ""
						})
					}
				}, {
					key: "update",
					value: function(e) {
						Object.assign(this.data, e)
					}
				}, {
					key: "send",
					value: function(e) {
						var t = this;
						WEBRTCLOG.log("----- send apiData ------", e), s.wssServer && (c = c.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
							type: "post",
							url: c,
							data: e
						}).then(function(e) {
							t.init()
						}).catch(function(e) {
							WEBRTCLOG.log("err", e), t.init()
						})
					}
				}]), e
			}();
		t.default = d, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = o(n(1)),
			i = o(n(4)),
			a = n(31);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = n(5),
			c = s.info.nrtcVersion,
			d = "https://statistic.live.126.net/statistic/realtime/sdkFunctioninfo",
			u = function() {
				function e() {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					(0, r.default)(this, e);
					var n = t.appkey,
						i = t.platform;
					this.apis = {}, this.isRtc = /WebRTC/.test(i), this.init(n, i), this.resetStatus()
				}
				return(0, i.default)(e, [{
					key: "init",
					value: function(e, t) {
						this.apis = Object.assign(this.apis, {
							ver: 1,
							platform: t,
							sdk_ver: c || "v4.4.0",
							uid: null,
							appkey: e,
							time: null
						})
					}
				}, {
					key: "start",
					value: function(e) {
						this.calling = !0, this.apis = Object.assign(this.apis, e)
					}
				}, {
					key: "resetStatus",
					value: function() {
						this.calling = !1, this.apis = Object.assign(this.apis, {
							p2p: {
								value: 0
							},
							meeting: {
								value: 0
							},
							bypass: {
								value: 0
							},
							call_control_type: {
								value: 0
							},
							self_mute: {
								value: -1
							},
							self_mic_mute: {
								value: -1
							},
							switch_p2p_type: {
								value: 0
							},
							set_speaker: {
								value: -1
							},
							net_detect: {
								value: this.isRtc ? -1 : 0
							},
							beautify: {
								value: -1
							},
							water_mark: {
								value: -1
							},
							audio_samples: {
								value: -1
							},
							video_samples: {
								value: -1
							},
							pre_view_mirror: {
								value: -1
							},
							code_mirror: {
								value: -1
							},
							custom_audio: {
								value: -1
							},
							custom_video: {
								value: -1
							},
							audio_mix: {
								value: -1
							},
							snap_shot: {
								value: -1
							},
							record: {
								value: 0
							},
							audio_record: {
								value: 0
							},
							display: {
								value: 0
							},
							android_compatibility: {
								value: -1
							},
							hd_audio: {
								value: 0
							},
							video_quality: {
								value: 0
							},
							fps: {
								value: 0
							},
							prefered_video_encoder: {
								value: -1
							},
							prefered_video_decoder: {
								value: -1
							},
							video_max_encode_bitrate: {
								value: this.isRtc ? -1 : 0
							},
							audio_scene: {
								value: -1
							},
							video_adaptive_strategy: {
								value: this.isRtc ? -1 : 0
							},
							ans: {
								value: this.isRtc ? -1 : 0
							},
							agc: {
								value: -1
							},
							dtx: {
								value: -1
							},
							aec: {
								value: this.isRtc ? -1 : 0
							},
							awc: {
								value: this.isRtc ? -1 : 0
							},
							actor: {
								value: 0
							},
							always_keep_calling: {
								value: 0
							},
							server_record_audio: {
								value: 0
							},
							server_record_video: {
								value: 0
							},
							server_record_single_user: {
								value: 0
							},
							screen_sharing_module: {
								value: 0
							},
							video_crop: {
								value: 0
							}
						})
					}
				}, {
					key: "update",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = arguments[1],
							n = e.key,
							r = e.ext;
						e.constructor === String && (n = e), r = r || t, this.apis[n] && (this.apis[n].value = 1, void 0 !== r && (this.apis[n].ext = r), /(p2p|meeting)/.test(n) && (this.calling = !0))
					}
				}, {
					key: "send",
					value: function() {
						var e = this;
						this.calling && (this.calling = !1, this.apis.time = Date.now(), s.wssServer && (d = d.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
							type: "post",
							url: d,
							data: this.apis
						}).then(function(t) {
							e.resetStatus()
						}).catch(function(t) {
							WEBRTCLOG.log("err", t), e.resetStatus()
						}))
					}
				}]), e
			}();
		t.default = u, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r;
		t.tool = {
			merge: function() {
				var e = arguments;
				return e[0] = Object.assign.apply(Object.assign, arguments), e[0]
			},
			verifyOptions: function() {
				var e = arguments;
				if(e[0] && e[0].constructor === Object)
					for(var t = 1; t < arguments.length; t++) {
						var n = e[t];
						(n = n.split(" ")).map(function(t) {
							if(!e[0][t]) throw Error("参数缺失 " + t)
						})
					}
			},
			guid: (r = function() {
				return(65536 * (1 + Math.random()) | 0).toString(16).substring(1)
			}, function() {
				return r() + r() + r() + r() + r() + r() + r() + r()
			}),
			sortDevices: function(e) {
				e && e.length > 1 && e.sort(function(e, t) {
					var n = -1 !== e.name.toLowerCase().indexOf("virtual"),
						r = -1 !== e.path.toLowerCase().indexOf("virtual"),
						i = -1 !== t.name.toLowerCase().indexOf("virtual"),
						a = -1 !== t.path.toLowerCase().indexOf("virtual");
					return r ? 1 : a ? -1 : n && i ? 0 : n ? 1 : i ? -1 : 0
				})
			},
			randomNum: function(e, t) {
				var n = t - e,
					r = Math.random();
				return 0 == Math.round(r * n) ? e + 1 : Math.round(r * t) == t ? (index++, t - 1) : e + Math.round(r * n) - 1
			},
			isString: function(e) {
				return e.constructor === String
			},
			isNumber: function(e) {
				return e.constructor === Number
			},
			isBoolean: function(e) {
				return e.constructor === Boolean
			},
			isObject: function(e) {
				return e.constructor === Object
			},
			isArray: function(e) {
				return e.constructor === Array
			},
			isFunction: function(e) {
				return e.constructor === Function
			},
			isDate: function(e) {
				return e.constructor === Date
			},
			isRegExp: function(e) {
				return e.constructor === RegExp
			},
			isNull: function(e) {
				return null === e
			},
			isUndefined: function(e) {
				return void 0 === e
			},
			exist: function(e) {
				return !isNull(e) && !isUndefined(e)
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ajax = function(e) {
			if(!e.url || !e.data) return Promise.reject("参数不完整，无法发起请求");
			e.dataType = e.dataType || "json";
			var t = new XMLHttpRequest;
			return t.open(e.type || "GET", e.url, !0), t.responseType = "" + e.dataType, e.contentType, t.setRequestHeader("Content-type", "application/json;charset=UTF-8"), e.header && Object.keys(e.header).map(function(n) {
				t.setRequestHeader(n, e.header[n])
			}), new Promise(function(n, r) {
				t.onload = function() {
					var e = t.response;
					n(e)
				}, t.onerror = function(e) {
					r(e)
				}, t.send(JSON.stringify(e.data))
			})
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.element = {
			html2node: function(e) {
				var t = document.createElement("div");
				t.innerHTML = e;
				var n = [],
					r = void 0,
					i = void 0;
				if(t.children)
					for(r = 0, i = t.children.length; r < i; r++) n.push(t.children[r]);
				else
					for(r = 0, i = t.childNodes.length; r < i; r++) {
						var a = t.childNodes[r];
						1 == a.nodeType && n.push(a)
					}
				return n.length > 1 ? t : n[0]
			},
			n2node: function(e) {
				return e ? /HTML.+Element/gi.test(e) ? e : e[0] && /HTML.+Element/gi.test(e[0]) ? e[0] : null : null
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(11),
			i = n(21),
			a = r.getGlobal();

		function o(e, t) {
			for(var n in t) e[n] = t[n];
			return e
		}
		a.Object.assign || (console.log("Object.assign polyfill"), a.Object.assign = function() {
			for(var e = arguments, t = 1; t < e.length; t++) e[0] = o(e[0], e[t]);
			return e[0]
		}), a.platform = i
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.default = function(e) {
			var t = e.util;
			return r = t.notundef, i
		};
		var r = void 0;

		function i(e) {
			r(e.enable) && (this.enable = e.enable ? 1 : 0), r(e.needBadge) && (this.needBadge = e.needBadge ? 1 : 0), r(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0), r(e.pushContent) && (this.pushContent = "" + e.pushContent), r(e.custom) && (this.custom = "" + e.custom), r(e.pushPayload) && (this.pushPayload = "" + e.pushPayload), r(e.sound) && (this.sound = "" + e.sound), r(e.webrtcEnable) && (this.webrtcEnable = e.webrtcEnable ? 1 : 0), r(e.forceKeepCalling) && (this.forceKeepCalling = e.forceKeepCalling ? 1 : 0)
		}
		e.exports = t.default
	}, function(e, t, n) {
		var r = n(17),
			i = n(57).f;
		n(148)("getOwnPropertyDescriptor", function() {
			return function(e, t) {
				return i(r(e), t)
			}
		})
	}, function(e, t, n) {
		n(225);
		var r = n(7).Object;
		e.exports = function(e, t) {
			return r.getOwnPropertyDescriptor(e, t)
		}
	}, function(e, t, n) {
		e.exports = {
			default: n(226),
			__esModule: !0
		}
	}, function(e, t, n) {
		var r = n(47),
			i = n(75);
		n(148)("getPrototypeOf", function() {
			return function(e) {
				return i(r(e))
			}
		})
	}, function(e, t, n) {
		n(228), e.exports = n(7).Object.getPrototypeOf
	}, function(e, t, n) {
		e.exports = {
			default: n(229),
			__esModule: !0
		}
	}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NRTCAdapter = void 0;
		var r = l(n(1)),
			i = l(n(4)),
			a = l(n(3)),
			o = l(n(121)),
			s = l(n(2)),
			c = n(185),
			d = n(22),
			u = n(31);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = n(5),
			f = function(e) {
				function t(e) {
					(0, r.default)(this, t), e = Object.assign(d.DEFAULT_NRTC_OPTION, e), d.CONFIG_MAP.CURRENT.SDK_TYPE = d.CONFIG_MAP.SDK_TYPE.NRTC;
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return n.adapterRef.instance = n, d.CONFIG_MAP.CURRENT.SDK_TYPE = d.CONFIG_MAP.SDK_TYPE.NRTC, n.adapterRef.instance._isFirefox() ? window.addEventListener("beforeunload", function() {
						WEBRTCLOG.log("pagehide event fire"), n.leaveChannel()
					}) : window.addEventListener("pagehide", function() {
						WEBRTCLOG.log("pagehide event fire"), n.leaveChannel()
					}), n
				}
				return(0, s.default)(t, e), (0, i.default)(t, [{
					key: "getAccount",
					value: function() {
						if(this.adapterRef) {
							var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
							return e ? e.account : null
						}
					}
				}, {
					key: "getUid",
					value: function() {
						if(this.adapterRef) {
							var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
							return e ? e.uid : null
						}
					}
				}, {
					key: "setAudioBlack",
					value: function(e) {
						this.adapterRef.commonApi.setAudioBlack(e)
					}
				}, {
					key: "setAudioStart",
					value: function(e) {
						this.adapterRef.commonApi.setAudioStart(e)
					}
				}, {
					key: "setVideoBlack",
					value: function(e) {
						this.adapterRef.commonApi.setVideoBlack(e)
					}
				}, {
					key: "setVideoShow",
					value: function(e) {
						this.adapterRef.commonApi.setVideoShow(e)
					}
				}, {
					key: "startRtc",
					value: function() {
						return this.adapterRef.commonApi.startRtc()
					}
				}, {
					key: "createChannel",
					value: function(e) {
						return this.adapterRef.meeting4NRTCApi.createChannel(e)
					}
				}, {
					key: "joinChannel",
					value: function(e) {
						return this.setStartSessionTime(), this.adapterRef.meeting4NRTCApi.joinChannel(e)
					}
				}, {
					key: "leaveChannel",
					value: function() {
						return this.setEndSessionTime(), this.adapterRef.meeting4NRTCApi.leaveChannel()
					}
				}, {
					key: "changeRoleToPlayer",
					value: function() {
						return this.adapterRef.meeting4NRTCApi.changeRoleToPlayer()
					}
				}, {
					key: "changeRoleToAudience",
					value: function() {
						return this.adapterRef.meeting4NRTCApi.changeRoleToAudience()
					}
				}, {
					key: "setCaptureVolume",
					value: function(e) {
						this.adapterRef.captureApi.setCaptureVolume(e)
					}
				}, {
					key: "getDevicesOfType",
					value: function(e) {
						return this.adapterRef.deviceApi.getDevicesOfType(e)
					}
				}, {
					key: "startDevice",
					value: function(e) {
						return this.adapterRef.deviceApi.startDevice(e)
					}
				}, {
					key: "stopDevice",
					value: function(e) {
						return this.adapterRef.deviceApi.stopDevice(e)
					}
				}, {
					key: "startLocalStream",
					value: function(e) {
						this.adapterRef.playApi.startLocalStream(e)
					}
				}, {
					key: "stopLocalStream",
					value: function() {
						this.adapterRef.playApi.stopLocalStream()
					}
				}, {
					key: "startRemoteStream",
					value: function(e) {
						this.adapterRef.playApi.startRemoteStream(e)
					}
				}, {
					key: "stopRemoteStream",
					value: function(e) {
						this.adapterRef.playApi.stopRemoteStream(e)
					}
				}, {
					key: "setPlayVolume",
					value: function(e) {
						this.adapterRef.playApi.setPlayVolume(e)
					}
				}, {
					key: "setVideoViewSize",
					value: function(e) {
						this.adapterRef.playApi.setVideoViewSize(e)
					}
				}, {
					key: "setVideoViewRemoteSize",
					value: function(e) {
						this.adapterRef.playApi.setVideoViewRemoteSize(e)
					}
				}, {
					key: "resumeLocalStream",
					value: function() {
						this.adapterRef.playApi.resumeLocalStream()
					}
				}, {
					key: "suspendLocalStream",
					value: function() {
						this.adapterRef.playApi.suspendLocalStream()
					}
				}, {
					key: "resumeRemoteStream",
					value: function(e) {
						this.adapterRef.playApi.resumeRemoteStream(e)
					}
				}, {
					key: "suspendRemoteStream",
					value: function(e) {
						this.adapterRef.playApi.suspendRemoteStream(e)
					}
				}, {
					key: "startRecordMp4",
					value: function(e) {
						var t = e;
						return this.adapterRef.recordApi.startRecordMp4(t)
					}
				}, {
					key: "startRecordAac",
					value: function() {
						return this.adapterRef.recordApi.startRecordAac()
					}
				}, {
					key: "stopRecordMp4",
					value: function() {
						return this.adapterRef.recordApi.stopRecordMp4()
					}
				}, {
					key: "stopRecordAac",
					value: function() {
						return this.adapterRef.recordApi.stopRecordMp4()
					}
				}, {
					key: "updateRtmpHost",
					value: function(e) {
						var t = e.uid;
						return t ? this.adapterRef.meeting4NRTCApi.updateRtmpHost(t) : Promise.reject("nrtc: 请填写设置互动直播主画面操作uid！")
					}
				}, {
					key: "setPrivateDeploymentConf",
					value: function(e) {
						e && e.IMServer && e.wssServer || WEBRTCLOG.warn("setVideoViewRemoteSize: 无效的参数"), this.adapterRef && (this.adapterRef.privateDeploymentConf = e)
					}
				}, {
					key: "setIsPrivateDeployment",
					value: function(e) {
						this.adapterRef && (this.adapterRef.isPrivateDeployment = e)
					}
				}, {
					key: "setMixConf",
					value: function(e) {
						if(e && void 0 !== e.enableMixVideo)
							if(!0 === e.enableMixVideo) {
								if(WEBRTCLOG.log("启动混频配置成功"), this.adapterRef.mixVideoConf = {}, this.adapterRef.mixVideoConf.videoLayout = e.videoLayout || d.MIX_VIDEO_MODE.LAYOUT_TOP_RIGHT, this.adapterRef.mixVideoConf.videoCompressSize = e.videoCompressSize || d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_LOW, !this.adapterRef.imInfo || !this.adapterRef.imInfo.uid) return;
								var t = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
								t && t.setMixConf()
							} else !1 === e.enableMixVideo && (WEBRTCLOG.log("取消混频配置成功"), this.adapterRef.mixVideoConf = null);
						else WEBRTCLOG.warn("混频配置失败：Invalid Argument")
					}
				}, {
					key: "detectNetworkStatus",
					value: function(e) {
						var t = this;
						if(WEBRTCLOG.log("开始探测网络状况, options: ", JSON.stringify(e, null, " ")), !e) return WEBRTCLOG.warn("detectNetworkStatus: Invalid parameter"), new Promise(function(e, t) {
							t("参数错误")
						});
						if(this.adapterRef.instance._isWeixinBrowser()) WEBRTCLOG.warn("当前是微信浏览器"), e.codec = "vp9";
						else if(this.adapterRef.instance._isMobileSafari()) WEBRTCLOG.warn("当前是移动端safar浏览器"), e.codec = "h264";
						else if(!this._isChrome()) return WEBRTCLOG.warn("不支持探测"), new Promise(function(e, t) {
							t("不支持探测\r\npc端请使用chrome内核浏览器\r\n安卓端请使用微信\r\nios端请使用Safari浏览器")
						});
						this.detectDom = e.videoDom || null;
						var n = u.tool.randomNum(1e15, 9007199254740990);
						e.wssArr ? this.startDetect({
							uid: e.uid,
							cid: e.cid,
							token: e.token,
							wssArr: e.wssArr,
							codec: e.codec || "h264"
						}) : (WEBRTCLOG.log("config config: ", p.netDetectAddr), (0, u.ajax)({
							type: "post",
							url: p.netDetectAddr,
							contentType: "application/json",
							data: {
								uid: n
							}
						}).then(function(r) {
							WEBRTCLOG.log("探测到网络地址：", r), t.startDetect({
								uid: n,
								cid: r.cid,
								token: r.token,
								wssArr: r.detectAddrs.splice(0, 1),
								codec: e.codec || "h264"
							})
						}).catch(function(e) {
							WEBRTCLOG.warn("获取探测地址 error: ", e)
						}));
						var r = e.detectTime || 60;
						return new Promise(function(n, i) {
							t.detectNetworkStatusResolve = n, t.detectNetworkStatusReject = i, t.detectNetworkStatusTimer = setTimeout(function() {
								if(WEBRTCLOG.log("探测结束"), t.canvasTimer && (clearInterval(t.canvasTimer), t.canvasTimer = null), t._isDetectNetwork()) {
									t.stream = null;
									var e = null;
									t.adapterRef.instance._isMobileSafari() && (e = t.adapterRef.webrtcGateWayBusiness.detectNetworkResult);
									var r = t.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(e);
									n(r), t.stream = null, t.leaveChannel()
								} else t.adapterRef.statsReportHelper && t.adapterRef.statsReportHelper.formatDataFromStats && t.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(t.adapterRef.instance._isDetectNetworkOfselfWebRtcConnected(), t.adapterRef.instance._isDetectNetworkOfremoteWebRtcConnected()), WEBRTCLOG.log("探测失败"), i("无法与服务器建立连接"), t.stream = null, t.leaveChannel()
							}, 1e3 * r), t.detectDom && !e.videoDom && (t.getStreamFromFileTimer = setTimeout(function() {
								WEBRTCLOG.log("获取视频文件错误，无法进行网络探测，请重试"), i("无法与服务器建立连接"), t.stream = null, t.leaveChannel(), t.detectNetworkStatusTimer && (clearTimeout(t.detectNetworkStatusTimer), t.detectNetworkStatusTimer = null), t.detectDom && t.detectDom.oncanplay && (t.detectDom.oncanplay = null), t.detectDom = null
							}, 1e4))
						})
					}
				}, {
					key: "startDetect",
					value: function(e) {
						var t = this,
							n = {
								role: 0,
								uid: e.uid,
								cid: e.cid,
								sessionMode: "meeting",
								appkey: "4c418f22935f1e2cf8488ff1c84229c0",
								token: e.token,
								turnToken: null,
								wssArr: e.wssArr || ["webrtcgwhz.netease.im?ip=223.252.198.177:5060"],
								relayaddrs: null,
								relaytoken: null,
								liveEnable: !1,
								rtmpRecord: !1,
								netDetect: !0,
								codec: e.codec,
								sessionConfig: {}
							};
						this.adapterRef.meeting4NRTCApi.joinChannel(n), this.adapterRef.commonApi.startRtc().then(function() {
							t.adapterRef.instance._isWeixinBrowser() ? t.wxCreateStream() : t.adapterRef.instance._isMobileSafari() ? t.createStream() : t.detectDom ? t.getStreamFromFile() : t.startDeviceWithMp4File()
						}).catch(function(e) {
							WEBRTCLOG.warn("连接网关出错: %s", e), t.detectNetworkStatusReject(e), t.detectNetworkStatusReject = null, t.stream = null, t.leaveChannel(), t.detectNetworkStatusTimer && (clearTimeout(t.detectNetworkStatusTimer), t.detectNetworkStatusTimer = null), t.detectDom && t.detectDom.oncanplay && (t.detectDom.oncanplay = null), t.detectDom = null
						})
					}
				}, {
					key: "startDeviceWithMp4File",
					value: function() {
						WEBRTCLOG.log("从服务器获取视频文件"), this.stream = null, this.detectDom = document.createElement("video"), this.detectDom.autoplay = "atuoplay", this.detectDom.loop = !0, this.detectDom.volume = .1 / 255, this.detectDom.oncanplay = this.getStreamFromFile.bind(this), this.detectDom.crossOrigin = "anonymous", this.detectDom.src = "https://vodegkofxdv.vod.126.net/vodegkofxdv/77a47edc-9942-4782-88ff-90bb46317813.mp4"
					}
				}, {
					key: "getStreamFromFile",
					value: function() {
						if(WEBRTCLOG.log("得到stream: ", this.detectDom), this.getStreamFromFileTimer && (clearTimeout(this.getStreamFromFileTimer), this.getStreamFromFileTimer = null), this.detectDom.oncanplay = null, this.detectDom.captureStream) this.stream = this.detectDom.captureStream();
						else {
							if(!this.detectDom.mozCaptureStream) return void WEBRTCLOG.warn("don support captureStream");
							this.stream = this.detectDom.mozCaptureStream()
						}
						if(this.stream) {
							var e = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
							e && e.handleStreamFromMp4File(this.stream), this.adapterRef.instance.judgeSendSdpOfferOrUpdate(), this.adapterRef.imInfo.remoteUid = u.tool.randomNum(1e15, 9007199254740990), this.adapterRef.webrtcBusiness.doClientJoin(this.adapterRef.imInfo.remoteUid)
						}
					}
				}, {
					key: "wxCreateStream",
					value: function() {
						var e = this,
							t = document.getElementById("canvas");
						this.stream = t.captureStream(), setTimeout(function() {
							if(WEBRTCLOG.log("wx localVideoStream: ", e.stream), e.stream) {
								var t = e.adapterRef.instance._getVideoHelperByUid(e.adapterRef.imInfo.uid);
								t && t.handleStreamFromMp4File(e.stream), e.adapterRef.instance.judgeSendSdpOfferOrUpdate(), setTimeout(function() {
									e.adapterRef.imInfo.remoteUid = u.tool.randomNum(1e15, 9007199254740990), e.adapterRef.webrtcBusiness.doClientJoin(e.adapterRef.imInfo.remoteUid)
								}, 500)
							}
						}, 500)
					}
				}, {
					key: "createStream",
					value: function() {
						var e = this;
						this.imgDom = document.getElementById("myPhoto"), this.canvas = document.createElement("canvas"), this.canvas.width = 1280, this.canvas.height = 720;
						this.canvasTimer && (clearInterval(this.canvasTimer), this.canvasTimer = null), this.canvasTimer = setInterval(function() {
							e.canvas.getContext("2d").drawImage(e.imgDom, 0, 0)
						}, 20), setTimeout(function() {
							if(e.stream = e.canvas.captureStream(), WEBRTCLOG.log("safari localVideoStream: ", e.stream), e.stream) {
								var t = e.adapterRef.instance._getVideoHelperByUid(e.adapterRef.imInfo.uid);
								t && t.handleStreamFromMp4File(e.stream), e.adapterRef.instance.judgeSendSdpOfferOrUpdate(), setTimeout(function() {
									e.adapterRef.imInfo.remoteUid = u.tool.randomNum(1e15, 9007199254740990), e.adapterRef.webrtcBusiness.doClientJoin(e.adapterRef.imInfo.remoteUid)
								}, 1e3)
							}
						}, 500)
					}
				}, {
					key: "destroy",
					value: function() {
						(0, o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
					}
				}]), t
			}(c.AbstractAdapter);
		t.NRTCAdapter = f
	}, function(e, t, n) {
		"use strict";
		var r = n(21),
			i = n(0);
		n(51);

		function a() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			i.merge(this, {
				options: e,
				debug: !1,
				api: "log",
				style: "color:#1cb977;",
				log: i.emptyFunc,
				info: i.emptyFunc,
				warn: i.emptyFunc,
				error: i.emptyFunc
			}), this.prefix = e.prefix || "", this.setDebug(e.debug)
		}
		var o = a.prototype,
			s = ["Chrome", "Safari", "Firefox"];
		o.setDebug = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
				t = this;
			if(t.debug = e, e.style && (t.style = e.style), t.debug && i.exist(console)) {
				var n = console;
				t.debug = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("debug", e)
				}, t.log = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("log", e)
				}, t.info = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("info", e)
				}, t.warn = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("warn", e)
				}, t.error = function() {
					var e = t.formatArgs(arguments); - 1 !== s.indexOf(r.name) && i.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("error", e)
				}, t._log = function(e, r) {
					var a = t.options.logFunc,
						o = null;
					if(a && (a[e] && (o = a[e]), i.isFunction(o))) o.apply(a, r);
					else if(n[e]) try {
						n[e].apply ? t.chrome(e, r) : t.ie(e, r)
					} catch(e) {}
				}, t.chrome = function(e, i) {
					-1 !== s.indexOf(r.name) ? n[e].apply(n, i) : t.ie(e, i)
				}, t.ie = function(e, t) {
					t.forEach(function(t) {
						n[e](JSON.stringify(t, null, 4))
					})
				}
			}
		}, o.formatArgs = function(e) {
			e = [].slice.call(e, 0);
			var t = new Date,
				n = "[WEBRTC LOG " + (c(t.getMonth() + 1) + "-" + c(t.getDate()) + " " + c(t.getHours()) + ":" + c(t.getMinutes()) + ":" + c(t.getSeconds()) + ":" + c(t.getMilliseconds(), 3)) + " " + this.prefix.toUpperCase() + "]  ";
			return i.isString(e[0]) ? e[0] = n + e[0] : e.splice(0, 0, n), e.forEach(function(t, n) {
				(i.isArray(t) || i.isObject(t)) && (e[n] = i.simpleClone(t))
			}), e
		};
		var c = function(e, t) {
			t = t || 2;
			for(var n = "" + e; n.length < t;) n = "0" + n;
			return n
		};
		e.exports = a
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PlayApi = void 0;
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "startLocalStream",
				value: function(e) {
					return this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "display"
					}), this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid).show(e), Promise.resolve()
				}
			}, {
				key: "stopLocalStream",
				value: function() {
					this.adapterRef.imInfo && this.adapterRef.imInfo.uid && this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid).hide()
				}
			}, {
				key: "startRemoteStream",
				value: function(e) {
					var t = this,
						n = e.account,
						r = e.node,
						i = e.poster,
						a = n;
					if(a) {
						var o = this.adapterRef.instance._getVideoHelperByUid(a);
						return o.poster = i, o.show(r || this.adapterRef.remoteContainer), Promise.resolve()
					}
					return Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, n) {
						if(e != t.adapterRef.imInfo.uid) {
							var a = t.adapterRef.instance._getVideoHelperByUid(e);
							a.poster = i, a.show(r || t.adapterRef.remoteContainer)
						}
					}), Promise.resolve()
				}
			}, {
				key: "stopRemoteStream",
				value: function(e) {
					var t = this,
						n = e;
					n ? this.adapterRef.instance._getVideoHelperByUid(n).hide() : Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, n) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).hide()
					})
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					var t = this;
					if("number" == typeof e) {
						Object.keys(this.adapterRef.audioHelperMap).map(function(n) {
							t.adapterRef.instance._getAudioHelperByUid(n).setPlayVolume(e)
						})
					} else {
						var n = e.uid;
						e = void 0 === e.volume ? 1 : e.volume, this.adapterRef.instance._getAudioHelperByUid(n).setPlayVolume(e)
					}
					return Promise.resolve()
				}
			}, {
				key: "setVideoViewSize",
				value: function(e) {
					this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "video_crop"
					});
					var t = this.adapterRef.imInfo.uid,
						n = this.adapterRef.instance._getVideoHelperByUid(t);
					!0 === n._checkHasVideoStream() && n.videoDomHelper ? n.videoDomHelper.resize(e) : WEBRTCLOG.warn("play: show: 未检测到视频流，请检查媒体设备是否开启...")
				}
			}, {
				key: "setVideoViewRemoteSize",
				value: function(e) {
					var t = this;
					if(this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_crop"
						}), e.account) {
						var n = e.account;
						this.adapterRef.instance._getVideoHelperByUid(n).videoDomHelper.resize({
							width: e.width,
							height: e.height,
							cut: e.cut
						})
					} else {
						Object.keys(this.adapterRef.videoHelperMap).map(function(n) {
							var r = t.adapterRef.instance._getVideoHelperByUid(n);
							!0 === r._checkHasVideoStream() && n != t.adapterRef.imInfo.uid ? r.videoDomHelper ? r.videoDomHelper.resize({
								width: e.width,
								height: e.height,
								cut: e.cut
							}) : WEBRTCLOG.warn("play: setVideoViewRemoteSize: 远程节点的承载容器尚未创建出来， " + r.uid) : WEBRTCLOG.warn("play: setVideoViewRemoteSize: 未检测到视频流，请检查媒体设备是否开启..." + r.uid)
						})
					}
					return Promise.resolve()
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					var e = this.adapterRef.imInfo.uid;
					this.adapterRef.instance._getVideoHelperByUid(e).resumeLocalStream()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					var e = this.adapterRef.imInfo.uid;
					this.adapterRef.instance._getVideoHelperByUid(e).suspendLocalStream()
				}
			}, {
				key: "resumeRemoteStream",
				value: function(e) {
					var t = this;
					e ? this.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(e) : Object.keys(this.adapterRef.videoHelperMap).map(function(e) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(e)
					})
				}
			}, {
				key: "suspendRemoteStream",
				value: function(e) {
					var t = this;
					e ? this.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream() : Object.keys(this.adapterRef.videoHelperMap).map(function(e) {
						e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream()
					})
				}
			}]), t
		}(n(10).EventEmitter);
		t.PlayApi = c
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CommonApi = void 0;
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "_doStopDevice4PlayVideo",
				value: function(e) {
					return Promise.resolve()
				}
			}, {
				key: "setAudioBlack",
				value: function(e) {
					var t = this;
					if(e)
						if(-1 == e) {
							this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid).stopAudio()
						} else {
							this.adapterRef.instance._getAudioHelperByUid(e).stopAudio()
						}
					else Object.keys(this.adapterRef.audioHelperMap).map(function(e) {
						t.adapterRef.imInfo.uid != e && t.adapterRef.instance._getAudioHelperByUid(e).stopAudio()
					})
				}
			}, {
				key: "setAudioStart",
				value: function(e) {
					-1 == e ? this.adapterRef.deviceApi._doStartDevice4PlayLocalAudio() : this.adapterRef.deviceApi._doStartDevice4PlayRemoteAudio(e)
				}
			}, {
				key: "setVideoBlack",
				value: function(e) {}
			}, {
				key: "setVideoShow",
				value: function(e) {}
			}, {
				key: "startRtc",
				value: function() {
					return this.adapterRef.instance._startSession()
				}
			}]), t
		}(n(10).EventEmitter);
		t.CommonApi = c
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.P2P4WebRTCApi = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(10),
			c = n(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "call",
				value: function(e) {
					if(this.adapterRef.calling) return Promise.reject({
						type: "statusNotMatch",
						error: "呼叫失败: 当前正在通话中"
					});
					var t = e.account,
						n = e.type,
						r = e.pushConfig,
						i = e.sessionConfig;
					if(this.adapterRef.calling = !0, this.adapterRef.isCaller = !0, this.adapterRef.callee = t, this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig(i), this.adapterRef.instance._setSessionConfig({
							signalStartTime: Date.now()
						}), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "p2p"
						}), i.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "hd_audio"
						}), r.forceKeepCalling && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "always_keep_calling"
						}), void 0 !== i.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "fps",
							ext: 0 == +i.videoFrameRate ? 0 : +i.videoFrameRate + 1
						}), void 0 !== i.videoQuality) {
						var a = +i.videoQuality;
						a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_quality",
							ext: a || 0
						})
					}
					return this.adapterRef.imBusiness.initNetcall({
						type: n,
						pushConfig: r
					})
				}
			}, {
				key: "setNetcallSession",
				value: function(e) {
					return this.adapterRef.calling ? Promise.reject({
						type: "statusNotMatch",
						error: "开启会话失败: 当前正在通话中"
					}) : (this.adapterRef.signalInited = !0, this.adapterRef.calling = !0, this.adapterRef.channelId = e.channelId, this.adapterRef.imInfo = e, this.adapterRef.type = e.netcallType, this.adapterRef.imInfo.serverAddrs = e.rtcServerMap, this.adapterRef.imInfo.rtcUrls = e.rtcServerMap, this.beCalledInfo = this.adapterRef.imInfo, this.adapterRef.imInfo.sessionConfig && this.adapterRef.instance._setSessionConfig(this.adapterRef.imInfo.sessionConfig), this.adapterRef.imBusiness._parseAccountUidMap(e.accountUidMap), Promise.resolve())
				}
			}, {
				key: "response",
				value: function(e) {
					var t = e.sessionConfig,
						n = void 0 === t ? {} : t,
						r = e;
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "p2p"
						}), n.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "hd_audio"
						}), void 0 !== n.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "fps",
							ext: 0 == +n.videoFrameRate ? 0 : +n.videoFrameRate + 1
						}), void 0 !== n.videoQuality) {
						var i = +n.videoQuality;
						i === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? i = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P : i === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (i = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P), this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_quality",
							ext: i || 0
						})
					}
					return r.fn = "calleeAck", this.adapterRef.imBusiness.baseResponse(r)
				}
			}, {
				key: "hangup",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					e.fn = "hangup", e.recordType = "cancelNetcallBeforeAccept", this.adapterRef.imBusiness.baseHangup(e)
				}
			}, {
				key: "control",
				value: function(e) {
					var t = e;
					return t.fn = "netcallControl", this.adapterRef.imBusiness.baseControl(t)
				}
			}, {
				key: "switchAudioToVideo",
				value: function() {
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "switch_p2p_type"
						}), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise.reject("no connection");
					var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
					return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._enableDevice(c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_VIDEO, Promise.resolve()
				}
			}, {
				key: "switchVideoToAudio",
				value: function() {
					if(this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "switch_p2p_type"
						}), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise.reject("no connection");
					var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
					return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._disableDevice(c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_AUDIO, Promise.resolve()
				}
			}]), t
		}(s.EventEmitter);
		t.P2P4WebRTCApi = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Meeting4WebRTCApi = void 0;
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(31),
			d = n(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "createChannel",
				value: function(e) {
					var t = this,
						n = e;
					return c.tool.verifyOptions(n, "channelName"), n.custom = n.custom || "", n.webrtcEnable = !0, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "meeting"
					}), this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.imBusiness.baseCreateChannel("createChannel", n).then(function(e) {
						return Promise.resolve(e)
					}).catch(function(e) {
						return WEBRTCLOG.error("createChannel error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					var t = this,
						n = e;
					if(this.adapterRef.signalInited) return WEBRTCLOG.error("已经加入房间..."), Promise.reject("已经加入房间");
					c.tool.verifyOptions(n, "channelName type");
					var r = n.sessionConfig,
						i = void 0 === r ? {} : r;
					return i.liveEnable = n.liveEnable || i.liveEnable, i.rtmpRecord = n.rtmpRecord || i.rtmpRecord, this.adapterRef.instance._setSessionConfig(i), this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.imBusiness.baseJoinChannel("joinChannel", {
						channelName: n.channelName,
						liveEnable: n.liveEnable,
						rtmpRecord: n.rtmpRecord
					}).then(function(e) {
						return WEBRTCLOG.log("joinChannel success=%o", e), t.adapterRef.type = e.type = n.type, e.account = t.adapterRef.nim.account, t.adapterRef.imInfo = Object.assign(t.adapterRef.imInfo, e), t.adapterRef.imInfo.role = void 0 === n.role ? d.ROLE_FOR_MEETING.ROLE_PLAYER : n.role, t.adapterRef.channelId = e.channelId, t.adapterRef.apiReportHelper.uploadDataApi("start", {
							uid: e.uid
						}), Promise.resolve({
							uid: e.uid,
							account: t.adapterRef.nim.account,
							channelId: t.adapterRef.channelId,
							type: e.type,
							custom: e.custom
						})
					}).catch(function(e) {
						return WEBRTCLOG.log("joinchannel error=%o", e), Promise.reject(e)
					})
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.adapterRef.imInfo && this.adapterRef.imInfo.netDetect ? (this.adapterRef.apiReportHelper.uploadDataApi("send"), this.adapterRef.logReportHelper.uploadData("send"), this.adapterRef.imBusiness.hangup(), this.adapterRef.instance._resetStatus(), Promise.resolve()) : this.adapterRef.signalInited ? this.adapterRef.sessionMode ? this.adapterRef.sessionMode !== d.SESSION_MODE.MEETING ? (WEBRTCLOG.error("not in a meeting"), Promise.reject({
						code: "not in a meeting"
					})) : (this.adapterRef.apiReportHelper.uploadDataApi("send"), this.adapterRef.logReportHelper.uploadData("send"), this.adapterRef.imBusiness.hangup(), this.adapterRef.instance._resetStatus(), Promise.resolve()) : (WEBRTCLOG.error("sessionMode is null"), Promise.reject({
						code: "noConnection"
					})) : (WEBRTCLOG.error("noConnection"), Promise.reject({
						code: "noConnection"
					}))
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					if(this.adapterRef.imInfo.sessionMode !== d.SESSION_MODE.P2P) return this.adapterRef.imInfo.role === d.ROLE_FOR_MEETING.ROLE_PLAYER ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "actor"
					}), this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "player"
						})
					}));
					WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法")
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					if(this.adapterRef.imInfo.sessionMode !== d.SESSION_MODE.P2P) return this.adapterRef.imInfo.role === d.ROLE_FOR_MEETING.ROLE_AUDIENCE ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_AUDIENCE, this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "audience"
						})
					}));
					WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法")
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = (this.adapterRef.imInfo.sessionConfig.roomServerUrl || "https://roomserver.netease.im/v1/sdk/command/rooms/") + this.adapterRef.imInfo.cid,
						n = this.adapterRef.imInfo.turnToken || this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.token;
					return n ? (0, c.ajax)({
						type: "post",
						url: t,
						data: {
							suid: this.adapterRef.imInfo.uid,
							cid: this.adapterRef.imInfo.cid,
							uid: parseInt(e),
							cmd: 10001
						},
						header: {
							Token: n
						}
					}).then(function(e) {
						if(200 === e.code) return Promise.resolve();
						var t = void 0;
						switch(e.code) {
							case 404:
								t = "房间不存在";
								break;
							case 405:
								t = "目标用户不在房间中";
								break;
							case 406:
								t = "没有权限";
								break;
							case 417:
								t = "请求数据不对";
								break;
							case 600:
								t = "服务器内部错误";
								break;
							default:
								t = "请求参数不正确"
						}
						return Promise.reject(t)
					}) : Promise.reject("token缺失, 请检查")
				}
			}]), t
		}(s.EventEmitter);
		t.Meeting4WebRTCApi = l
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.Meeting4NRTCApi = void 0;
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(31),
			d = n(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "createChannel",
				value: function(e) {
					return Promise.reject("NRTC暂无创建房间接口")
				}
			}, {
				key: "joinChannel",
				value: function(e) {
					var t = e;
					c.tool.verifyOptions(t, "appkey cid uid token sessionMode wssArr"), t.liveEnable && c.tool.verifyOptions(t, "turnToken");
					var n = Object.assign(t.sessionMode === d.SESSION_MODE.P2P ? d.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC : d.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC, t.sessionConfig);
					return this.adapterRef.imInfo = t, n.liveEnable = t.liveEnable, n.rtmpRecord = t.rtmpRecord, t.wssArr.constructor === String && (t.wssArr = [t.wssArr]), this.adapterRef.imInfo.sessionConfig = n, Promise.resolve(t)
				}
			}, {
				key: "leaveChannel",
				value: function() {
					return this.adapterRef.instance._stopSession()
				}
			}, {
				key: "changeRoleToPlayer",
				value: function() {
					return this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P ? (WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法"), Promise.reject("点对点场景不支持此方法")) : this.adapterRef.imInfo.role === d.ROLE_FOR_MEETING.ROLE_PLAYER ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "actor"
					}), this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "player"
						})
					}))
				}
			}, {
				key: "changeRoleToAudience",
				value: function() {
					return this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P ? (WEBRTCLOG.error("NRTCAdapter:changeRoleToPlayer 点对点场景不支持此方法"), Promise.rejct("点对点场景不支持此方法")) : this.adapterRef.imInfo.role === d.ROLE_FOR_MEETING.ROLE_AUDIENCE ? Promise.resolve({
						role: "player"
					}) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_AUDIENCE, this.adapterRef.webrtcBusiness._switchRole().then(function() {
						return Promise.resolve({
							role: "audience"
						})
					}))
				}
			}, {
				key: "updateRtmpHost",
				value: function(e) {
					var t = (this.adapterRef.imInfo.sessionConfig.roomServerUrl || "https://roomserver.netease.im/v1/sdk/command/rooms/") + this.adapterRef.imInfo.cid,
						n = this.adapterRef.imInfo.turnToken || this.adapterRef.imInfo.serverMap && this.adapterRef.imInfo.serverMap.token;
					return n ? (0, c.ajax)({
						type: "post",
						url: t,
						data: {
							suid: this.adapterRef.imInfo.uid,
							cid: this.adapterRef.imInfo.cid,
							uid: parseInt(e),
							cmd: 10001
						},
						header: {
							Token: n
						}
					}).then(function(e) {
						if(200 === e.code) return Promise.resolve();
						var t = void 0;
						switch(e.code) {
							case 404:
								t = "房间不存在";
								break;
							case 405:
								t = "目标用户不在房间中";
								break;
							case 406:
								t = "没有权限";
								break;
							case 417:
								t = "请求数据不对";
								break;
							case 600:
								t = "服务器内部错误";
								break;
							default:
								t = "请求参数不正确"
						}
						return Promise.reject(t)
					}) : Promise.reject("token缺失, 请检查")
				}
			}]), t
		}(s.EventEmitter);
		t.Meeting4NRTCApi = l
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RecordApi = void 0;
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "startRecordMp4",
				value: function(e) {
					this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "record"
					});
					var t = [],
						n = null,
						r = null;
					if(e || (e = this.adapterRef.imInfo.uid), n = this.adapterRef.instance._getAudioHelperByUid(e), r = this.adapterRef.instance._getVideoHelperByUid(e), e == this.adapterRef.imInfo.uid) n.getLocalAudioStream() && t.push(n.getLocalAudioStream()), r.getLocalVideoStream() && t.push(r.getLocalVideoStream());
					else {
						if(!n || !r) return Promise.reject("需要录制的账号不正确");
						n.remoteAudioStream && t.push(n.remoteAudioStream), r.remoteVideoStream && t.push(r.remoteVideoStream)
					}
					return 0 === t.length ? Promise.reject("当前没有音视频数据，无法进行录制") : this.adapterRef.mediaRecordHelper.start(t, {
						uid: e
					})
				}
			}, {
				key: "startRecordAac",
				value: function() {
					this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "audio_record"
					});
					var e = this.adapterRef.imInfo.uid,
						t = [],
						n = this.adapterRef.audioHelperMap;
					for(var r in n)(n[r].remoteAudioStream || n[r].localAudioStream) && t.push(n[r].remoteAudioStream || n[r].localAudioStream);
					return this.adapterRef.mediaRecordHelper.start(t, {
						uid: e,
						type: "audio"
					})
				}
			}, {
				key: "stopRecordMp4",
				value: function() {
					return this.adapterRef.mediaRecordHelper.stop()
				}
			}, {
				key: "stopRecordAac",
				value: function() {
					return this.adapterRef.mediaRecordHelper.stop()
				}
			}]), t
		}(n(10).EventEmitter);
		t.RecordApi = c
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CaptureApi = void 0;
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "setCaptureVolume",
				value: function(e) {
					this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid).setGain(e)
				}
			}]), t
		}(n(10).EventEmitter);
		t.CaptureApi = c
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DeviceApi = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(10),
			c = n(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "getDevicesOfType",
				value: function(e) {
					var t = this.sdkRef.getDeviceTypeMap(e);
					return this.adapterRef && this.adapterRef.deviceBusiness && this.adapterRef.deviceBusiness.mediaDeviceHelper && this.adapterRef.deviceBusiness.mediaDeviceHelper.getDevicesOfType(t)
				}
			}, {
				key: "startDevice",
				value: function(e) {
					var t = e.type,
						n = e.device,
						r = e.account,
						i = e.uid;
					return t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (WEBRTCLOG.log("开启设备, 播放本地声音"), this._doStartDevice4PlayLocalAudio()) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT ? this._doStartDevice4PlayRemoteAudio(r, i) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN ? (this.adapterRef.state.lastDeviceStatus.audio = {
						type: t,
						device: n
					}, this.adapterRef.state.audioDeviceHasOpened = !0, this._doStartDeviceCommon(t, n)) : t === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO ? (this.adapterRef.state.lastDeviceStatus.video = {
						type: t,
						device: n
					}, this.adapterRef.state.chromeScreenShareOpened = !1, this.adapterRef.state.videoDeviceHasOpened = !0, this._doStartDeviceCommon(t, n)) : t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW || t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN ? (this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
						key: "screen_sharing_module"
					}), this.adapterRef.state.chromeScreenShareOpened = !0, this._doStartDeviceCommon(t, n)) : Promise.reject("不支持的开启设备类型")
				}
			}, {
				key: "stopDevice",
				value: function(e) {
					var t = this;
					return new Promise(function(n, r) {
						if(e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
							var i = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid);
							return t.adapterRef.state.videoDeviceHasOpened = !1, i ? i.stopVideoDevice(n) : (WEBRTCLOG.error("不存在的videoHelper对象，直接返回"), Promise.reject("不存在的videoHelper对象"))
						}
						if(e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN) {
							var a = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid);
							return t.adapterRef.state.chromeScreenShareOpened = !1, a ? a.stopScreenShare(n) : (WEBRTCLOG.error("不存在的videoHelper对象，直接返回"), Promise.reject("不存在的videoHelper对象"))
						}
						if(e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
							var o = t.adapterRef.instance._getAudioHelperByUid(t.adapterRef.imInfo.uid);
							if(t.adapterRef.state.audioDeviceHasOpened = !1, !o) return WEBRTCLOG.error("不存在的audioHelper对象，直接返回"), Promise.reject("不存在的audioHelper对象");
							o.destroyMedia(), n()
						} else e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (t._doStopDevice4PlayLocalAudio(), n()) : e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT && (t._doStopDevice4PlayRemoteAudio(), n())
					})
				}
			}, {
				key: "_doStopDevice4PlayLocalAudio",
				value: function() {
					return this.adapterRef.audioHelperMap[this.imInfo.uid].stopAudio(), Promise.resolve()
				}
			}, {
				key: "_doStopDevice4PlayRemoteAudio",
				value: function(e, t) {
					return t || e ? t ? this._doStopRemoteAudioByUid(t) : e && (t = this._getUidByAccount(e), this._doStopRemoteAudioByUid(t)) : this._doStopChatAudioOfAllRemoteAudio(), Promise.resolve()
				}
			}, {
				key: "_doStopChatAudioOfAllRemoteAudio",
				value: function() {
					for(var e = Object.keys(this.adapterRef.audioHelperMap), t = 0; t < e.length; t++) {
						this.adapterRef.imInfo.uid != e[t] && this._doStopRemoteAudioByUid(e[t])
					}
				}
			}, {
				key: "_doStopRemoteAudioByUid",
				value: function(e) {
					this.adapterRef.imInfo.uid != e ? this.adapterRef.instance._getAudioHelperByUid(e).stopAudio() : WEBRTCLOG.warn("NRTCAdapter:_doPlayRemoteAudioByUid 非远程流账号或UID，无法停止：UID=%s", e)
				}
			}, {
				key: "_doStartDevice4PlayLocalAudio",
				value: function() {
					return this.adapterRef.audioHelperMap[this.adapterRef.imInfo.uid].playAudio(), Promise.resolve()
				}
			}, {
				key: "_doStartDevice4PlayRemoteAudio",
				value: function(e) {
					return e ? e && this._doPlayRemoteAudioByUid(e) : this._doPlayChatAudioOfAllRemoteAudio(), Promise.resolve()
				}
			}, {
				key: "_doPlayChatAudioOfAllRemoteAudio",
				value: function() {
					var e = this;
					Object.keys(this.adapterRef.audioHelperMap).map(function(t) {
						e.adapterRef.imInfo.uid != t && e._doPlayRemoteAudioByUid(t)
					})
				}
			}, {
				key: "_doPlayRemoteAudioByUid",
				value: function(e) {
					this.adapterRef.imInfo.uid != e ? this.adapterRef.instance._getAudioHelperByUid(e).playAudio() : WEBRTCLOG.warn("NRTCAdapter:_doPlayRemoteAudioByUid 非远程流账号或UID，无法播放：UID=%s", e)
				}
			}, {
				key: "_doStartDeviceCommon",
				value: function(e, t) {
					var n = this,
						r = Promise.resolve(),
						i = !t || !t.deviceId;
					return i && (r = this.getDevicesOfType(e)), new Promise(function(a, o) {
						r.then(function(r) {
							var s = null,
								d = e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN;
							if(i && !d) {
								if(!r || 0 == r.length) return void o("无任何设备，无法开启");
								s = r[0]
							} else s = t;
							if(e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
								var u = n.adapterRef.instance._getAudioHelperByUid(n.adapterRef.imInfo.uid);
								return u.hasStartAudioDeviceRepeat(s).then(function() {
									return u.getAudioStream(s, a, o)
								}).catch(function(e) {
									/重复操作/.test(e) ? a() : o(e)
								})
							}
							if(e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
								var l = n.adapterRef.instance._getVideoHelperByUid(n.adapterRef.imInfo.uid);
								return l.hasStartVideoDeviceRepeat(s).then(function() {
									return l.getVideoStream(s, a, o)
								}).catch(function(e) {
									/重复操作/.test(e) ? a() : o(e)
								})
							}
							if(d) {
								var p = n.adapterRef.instance._getVideoHelperByUid(n.adapterRef.imInfo.uid);
								return n.adapterRef.chromeId ? p.getScreenStreamPlugin(s, a, o) : p.getScreenStreamNative(s, a, o)
							}
						}).catch(function(e) {
							o(e)
						})
					})
				}
			}]), t
		}(s.EventEmitter);
		t.DeviceApi = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(274);
		Object.defineProperty(t, "DeviceApi", {
			enumerable: !0,
			get: function() {
				return r.DeviceApi
			}
		});
		var i = n(273);
		Object.defineProperty(t, "CaptureApi", {
			enumerable: !0,
			get: function() {
				return i.CaptureApi
			}
		});
		var a = n(272);
		Object.defineProperty(t, "RecordApi", {
			enumerable: !0,
			get: function() {
				return a.RecordApi
			}
		});
		var o = n(271);
		Object.defineProperty(t, "Meeting4NRTCApi", {
			enumerable: !0,
			get: function() {
				return o.Meeting4NRTCApi
			}
		});
		var s = n(270);
		Object.defineProperty(t, "Meeting4WebRTCApi", {
			enumerable: !0,
			get: function() {
				return s.Meeting4WebRTCApi
			}
		});
		var c = n(269);
		Object.defineProperty(t, "P2P4WebRTCApi", {
			enumerable: !0,
			get: function() {
				return c.P2P4WebRTCApi
			}
		});
		var d = n(268);
		Object.defineProperty(t, "CommonApi", {
			enumerable: !0,
			get: function() {
				return d.CommonApi
			}
		});
		var u = n(267);
		Object.defineProperty(t, "PlayApi", {
			enumerable: !0,
			get: function() {
				return u.PlayApi
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.IMBusiness = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(31),
			c = n(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n._bindImEvent(), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null
				}
			}, {
				key: "_isCurrentChannelId",
				value: function(e) {
					return this.adapterRef.channelId && this.adapterRef.channelId == e
				}
			}, {
				key: "resetWhenHangup",
				value: function() {
					this.adapterRef.instance._stopSession(), this.adapterRef.nim.protocol.setCurrentNetcall()
				}
			}, {
				key: "_initSession",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					this.adapterRef.sessionMode = c.SESSION_MODE.P2P;
					var n = this.adapterRef.isCaller ? this.adapterRef.callerInfo : t.beCalledInfo;
					this._parseAccountUidMap(n.accountUidMap), !n.account && n.uid && (n.account = this.adapterRef.instance._getAccountByUid(n.uid)), this.adapterRef.callAccepted = !0, this.adapterRef.instance._setSessionConfig({
						signalEndTime: Date.now()
					}), this.adapterRef.apiReportHelper.uploadDataApi("start", {
						uid: n.uid
					}), this.adapterRef.target.uid = this.adapterRef.instance._getUidByAccount(this.adapterRef.target.account);
					var r = {
						type: n.type,
						account: this.adapterRef.target && this.adapterRef.target.account || n.account,
						channelId: n.channelId
					};
					n.netcallType && (r.netcallType = n.netcallType), this.adapterRef.imInfo.target = this.target, setTimeout(function() {
						e.adapterRef.instance.setStartSessionTime(), e.adapterRef.instance.emit("callAccepted", r)
					}, 1)
				}
			}, {
				key: "_bindImEvent",
				value: function() {
					WEBRTCLOG.log("IMBusiness:_bindImEvent");
					var e = this.adapterRef.nim;
					e ? (e.on("beCalled", this._handleBeCalledEvent.bind(this)), e.on("notifyCalleeAck", this._hanldeNotifyCalleeAckEvent.bind(this)), e.on("notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.on("netcallControl", this._handleNetCallControlEvent.bind(this)), e.on("notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.on("notifyJoin", this._handleNotifyJoinEvent.bind(this))) : WEBRTCLOG.warn("IMBusiness:_bindImEvent 不存在nim实例...")
				}
			}, {
				key: "_unbindImEvent",
				value: function() {
					var e = this.adapterRef.nim;
					e ? (e.removeListener("beCalled", this._handleBeCalledEvent.bind(this)), e.removeListener("notifyCalleeAck", this._hanldeNotifyCalleeAckEvent.bind(this)), e.removeListener("notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.removeListener("netcallControl", this._handleNetCallControlEvent.bind(this)), e.removeListener("notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.removeListener("notifyJoin", this._handleNotifyJoinEvent.bind(this))) : WEBRTCLOG.warn("IMBusiness:_bindImEvent 不存在nim实例...")
				}
			}, {
				key: "_handleBeCalledEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleBeCalledEvent event=%o", e), this.adapterRef.signalInited = !0, this.adapterRef.channelId = e.channelId, this.adapterRef.beCalledInfo = e, this.adapterRef.imInfo || (this.adapterRef.imInfo = {}), this.adapterRef.imInfo.uid = e.uid, this.adapterRef.instance.emit("beCalling", e)
				}
			}, {
				key: "_hanldeNotifyCalleeAckEvent",
				value: function(e) {
					console.log("!!!!!new -> old", e.channelId, this.adapterRef.channelId), WEBRTCLOG.log("IMBusiness:_hanldeNotifyCalleeAckEvent event=%o", e);
					var t = e.account,
						n = e.type,
						r = e.accepted,
						i = e.channelId;
					if(this._isCurrentChannelId(i)) {
						var a = this.adapterRef.beCalledInfo || this.adapterRef.callerInfo;
						this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), r ? (WEBRTCLOG.log("对方已接收本次通话， channelId=%s", i), this.adapterRef.callAccepted = !0, this._initSession()) : (WEBRTCLOG.log("对方已拒绝本次通话， channelId=%s", i), this._packNetcallRecord({
							type: n,
							channelId: i,
							isCaller: !0,
							target: t,
							recordType: "netcallRejected"
						}), this.resetWhenHangup(), this.adapterRef.instance.emit("callRejected", {
							type: a.type,
							account: t
						}))
					} else WEBRTCLOG.warn("非当前频道ID的通话，直接忽略...")
				}
			}, {
				key: "_hanldeNotifyHangupEvent",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("IMBusiness:_hanldeNotifyHangupEvent event=%o", e);
					var n = e.channelId,
						r = e.account,
						i = e.timetag;
					this.adapterRef.channelId ? this.adapterRef.sessionMode == c.SESSION_MODE.P2P || this.adapterRef.beCalledInfo ? (this.adapterRef.target && this.adapterRef.target.account == r && (this.adapterRef.apiReportHelper.uploadDataApi("send"), this.adapterRef.logReportHelper.uploadData("send"), setTimeout(function() {
						WEBRTCLOG.log("主动挂断处理，1s后"), t.resetWhenHangup()
					}, 1e3), this.adapterRef.instance.setEndSessionTime()), this.adapterRef.instance.emit("hangup", {
						channelId: n,
						account: r,
						timetag: i,
						type: c.HANGUP_TYPE.HANGUP_TYPE_NORMAL
					})) : WEBRTCLOG.warn("非点对点会话模式...") : WEBRTCLOG.warn("未定义的channelId ... ")
				}
			}, {
				key: "_handleNetCallControlEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNetCallControlEvent event=%o", e);
					e.channelId, e.type;
					var t = {};
					t.channelId = e.channelId, t.type = e.type, t.command = e.type, e.account && (t.account = e.account), this.adapterRef.instance.emit("control", t)
				}
			}, {
				key: "_handleNotifyCalleeAckSyncEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNotifyCalleeAckSyncEvent event=%o", e);
					var t = e.timetag,
						n = e.channelId,
						r = e.type,
						i = e.accepted,
						a = e.fromClientType;
					this.adapterRef.instance.emit("callerAckSync", {
						timetag: t,
						channelId: n,
						type: r,
						accepted: i,
						fromClientType: a
					}), this._isCurrentChannelId(n) && this.resetWhenHangup()
				}
			}, {
				key: "_handleNotifyJoinEvent",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_handleNotifyJoinEvent event=%o", e);
					var t = e.accountUidMap;
					this._parseAccountUidMap(t);
					var n = this.adapterRef.needQueryAccountMap;
					for(var r in t) {
						var i = t[r];
						if(i in n) {
							var a = n[i];
							a.account = r, WEBRTCLOG.log("IMBusiness:_handleNotifyJoinEvent 需要反查映射表删除键 uid=%s, account=%s", i, r), delete n[i], this.adapterRef.instance.emit("joinChannel", a)
						}
					}
				}
			}, {
				key: "_packNetcallRecord",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:_packNetcallRecord options=%o", e);
					var t = e.recordType,
						n = e.type || this.adapterRef.type,
						r = e.channelId || this.adapterRef.channelId,
						i = e.duration || 0,
						a = e.isCaller || this.adapterRef.isCaller,
						o = e.target || this.adapterRef.target.account,
						c = this.adapterRef.nim && this.adapterRef.nim.account,
						d = a ? c : o,
						u = a ? o : c,
						l = +new Date;
					this.adapterRef.nim.protocol.onMsg({
						content: {
							msg: {
								attach: JSON.stringify({
									data: {
										calltype: n,
										channel: r,
										duration: i,
										ids: [c, o],
										time: l
									},
									id: t
								}),
								from: d,
								fromClientType: a ? 16 : 0,
								fromDeviceId: "",
								fromNick: "",
								idClient: s.tool.guid(),
								idServer: s.tool.guid(),
								scene: 0,
								time: l,
								to: u,
								type: 5
							}
						}
					})
				}
			}, {
				key: "_parseAccountUidMap",
				value: function(e) {
					var t = this;
					WEBRTCLOG.log("IMBusiness:_parseAccountUidMap 解析点对点映射表..."), Object.keys(e).forEach(function(n) {
						t._addAccountUidMap({
							account: n,
							uid: e[n]
						})
					})
				}
			}, {
				key: "_addAccountUidMap",
				value: function(e) {
					WEBRTCLOG.log("IMBusiness:_addAccountUidMap 追加正反向映射表...");
					var t = e.account,
						n = e.uid;
					this._addUid4AccountMap(t, n), this._addAccount4UidMap(t, n)
				}
			}, {
				key: "_addUid4AccountMap",
				value: function(e, t) {
					WEBRTCLOG.log("IMBusiness:_addUid4AccountMap uid -> account 映射表..."), this.adapterRef.uid4AccountMap || (WEBRTCLOG.log("初始化uid4AccountMap ={} "), this.adapterRef.uid4AccountMap = {}), this.adapterRef.uid4AccountMap[t] = e
				}
			}, {
				key: "_addAccount4UidMap",
				value: function(e, t) {
					WEBRTCLOG.log("IMBusiness:_addAccount4UidMap uid -> account 映射表..."), this.adapterRef.account4UidMap || (WEBRTCLOG.log("初始化account4UidMap ={} "), this.adapterRef.account4UidMap = {}), this.adapterRef.account4UidMap[e] = t
				}
			}, {
				key: "initNetcall",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:initNetcall options=%o", e);
					var t = this,
						n = e.type,
						r = e.pushConfig;
					return this.adapterRef.type = n, this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.nim.initNetcall({
						type: n,
						accounts: [this.adapterRef.callee],
						pushConfig: r,
						webrtcEnable: !0
					}).then(function(e) {
						WEBRTCLOG.log("IMBusiness:initNetcall response=%o", e), t.adapterRef.signalInited = !0, t.adapterRef.sessionMode = c.SESSION_MODE.P2P, t.adapterRef.callerInfo = Object.assign({}, e), t.adapterRef.channelId = e.channelId, t.adapterRef.imInfo = Object.assign(t.adapterRef.imInfo, t.adapterRef.callerInfo), t.adapterRef.imInfo.sessionMode = t.adapterRef.sessionMode, t.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER
					}).catch(function(e) {
						return WEBRTCLOG.error("IMBusiness:initNetcall error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), t.resetWhenHangup(), Promise.reject(e)
					})
				}
			}, {
				key: "baseResponse",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:baseResponse options=%o", t);
					var n = t.fn || "calleeAck",
						r = t.beCalledInfo || this.adapterRef.beCalledInfo,
						i = r.accepted = 0 != t.accepted;
					return i ? (this.adapterRef.sessionMode = c.SESSION_MODE.P2P, this.adapterRef.type = r.type, this.adapterRef.channelId = r.channelId, this.adapterRef.target.account = r.account, this.adapterRef.calling = !0, this.adapterRef.imInfo = r, this.adapterRef.imInfo.sessionMode = this.adapterRef.sessionMode, this.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					})) : this._packNetcallRecord({
						type: r.type,
						channelId: r.channelId,
						isCaller: !1,
						target: r.account,
						recordType: "rejectNetcall"
					}), this.adapterRef.nim[n](r).then(function() {
						WEBRTCLOG.log("IMBusiness:baseResponse success"), i && (t.sessionConfig && e.adapterRef.instance._setSessionConfig(t.sessionConfig), e.adapterRefbeCalledInfo = r, e._initSession({
							beCalledInfo: r
						}))
					}, function(e) {
						throw WEBRTCLOG.error("IMBusiness:baseResponse error=%o", e), e
					})
				}
			}, {
				key: "baseHangup",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					WEBRTCLOG.log("IMBusiness:baseHandup options=%o", e), this.adapterRef.apiReportHelper.uploadDataApi("send"), this.adapterRef.logReportHelper && this.adapterRef.logReportHelper.uploadData("send");
					var t = e.channelId,
						n = e.recordType;
					if(!t && this.adapterRef.calling && this.adapterRef.channelId && (t = this.adapterRef.channelId), console.log("===== baseHangup", e, t), t) {
						var r = e.fn || "hangup";
						this.adapterRef.nim[r]({
							channelId: t
						})
					}
					t === this.adapterRef.channelId && (this.adapterRef.isCaller && !this.adapterRef.callAccepted && this._packNetcallRecord({
						recordType: n
					}), this.resetWhenHangup())
				}
			}, {
				key: "baseControl",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					if(WEBRTCLOG.log("IMBusiness:baseControl options=%o", e), e.channelId = e.channelId || this.adapterRef.channelId, e.command && e.channelId) {
						this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "call_control_type"
						});
						var t = e.fn || "netcallControl";
						return e.type = e.command, this.adapterRef.nim[t](e).catch(function(e) {
							WEBRTCLOG.error("IMBusiness:baseControl error=%o", e)
						})
					}
				}
			}, {
				key: "baseCreateChannel",
				value: function(e) {
					var t = this,
						n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return s.tool.verifyOptions(n, "channelName"), n.custom = n.custom || "", this.adapterRef.instance._setSessionConfig({
						signalStartTime: Date.now()
					}), this.adapterRef.nim[e](n).then(function(e) {
						return WEBRTCLOG.log("IMBusiness:baseCreateChannel success=%o", e), Promise.resolve(e)
					}).catch(function(e) {
						return WEBRTCLOG.error("IMBusiness:baseCreateChannel error=%o", e), t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "baseJoinChannel",
				value: function(e) {
					var t = this,
						n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return this.adapterRef.nim[e](n).then(function(e) {
						return t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), t.adapterRef.signalInited = !0, t.adapterRef.sessionMode = e.sessionMode = "meeting", t._parseAccountUidMap(e.accountUidMap), e.uid = t.adapterRef.instance._getUidByAccount(t.adapterRef.nim.account), Promise.resolve(e)
					}).catch(function(e) {
						return t.adapterRef.instance._setSessionConfig({
							signalEndTime: Date.now()
						}), Promise.reject(e)
					})
				}
			}, {
				key: "hangup",
				value: function() {
					this.adapterRef.instance._stopSession(), null != this.adapterRef.userJoinTimeoutId && (clearTimeout(this.adapterRef.userJoinTimeoutId), this.adapterRef.userJoinTimeoutId = null), this.adapterRef.instance._resetStatus()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("IMBusiness:destroy"), this.delayTimer && (clearInterval(this.delayTimer), this.delayTimer = null), this._unbindImEvent()
				}
			}]), t
		}(n(124).AbstractBusiness);
		t.IMBusiness = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCBuilder = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = n(181),
			o = n(180),
			s = n(179),
			c = n(178);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function() {
			function e(t) {
				(0, r.default)(this, e);
				var n = t.imInfo,
					i = t.targetUid,
					a = t.platformName,
					o = t.platformVersion,
					s = t.adapterRef;
				this.webrtcInstance = null, this.adapterRef = s, this.imInfo = n, this.targetUid = i, this.platformName = a, this.platformVersion = o
			}
			return(0, i.default)(e, [{
				key: "getVersion4User",
				value: function() {
					return this.platformVersion.split(".")[0]
				}
			}, {
				key: "build",
				value: function() {
					var e = this.platformName.toLowerCase(),
						t = this.getVersion4User(),
						n = (0, a.isMatchVersion)(e, t),
						r = (0, a.maxVersion)(e);
					switch(this.platformName) {
						case "Chrome":
							this.webrtcInstance = this.buildChrome4DefinedVersion(n ? t : r);
							break;
						case "Firefox":
							this.webrtcInstance = this.buildFirefox4DefinedVersion(n ? t : r);
							break;
						case "Safari":
							this.webrtcInstance = this.buildSafari4DefinedVersion(n ? t : r);
							break;
						default:
							this.webrtcInstance = this.buildChrome4DefinedVersion("69")
					}
					return this.webrtcInstance
				}
			}, {
				key: "buildChrome4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "65":
						default:
							t = this.createChromeReleaseInstance()
					}
					return t
				}
			}, {
				key: "buildFirefox4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "59":
						default:
							t = this.createFirefoxReleaseInstance()
					}
					return t
				}
			}, {
				key: "buildSafari4DefinedVersion",
				value: function(e) {
					var t = null;
					switch(e) {
						case "11":
						default:
							t = this.createSafariReleaseInstance()
					}
					return t
				}
			}, {
				key: "createChromeReleaseInstance",
				value: function() {
					return new o.WebRTC4ChromeRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}, {
				key: "createFirefoxReleaseInstance",
				value: function() {
					return new s.WebRTC4FirefoxRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}, {
				key: "createSafariReleaseInstance",
				value: function() {
					return new c.WebRTC4SafariRelease({
						adapterRef: this.adapterRef,
						imInfo: this.imInfo,
						targetUid: this.targetUid
					})
				}
			}]), e
		}();
		t.WebRTCBuilder = u
	}, function(e, t, n) {
		"use strict";
		var r = {
			generateIdentifier: function() {
				return Math.random().toString(36).substr(2, 10)
			}
		};
		r.localCName = r.generateIdentifier(), r.splitLines = function(e) {
			return e.trim().split("\n").map(function(e) {
				return e.trim()
			})
		}, r.splitSections = function(e) {
			return e.split("\nm=").map(function(e, t) {
				return(t > 0 ? "m=" + e : e).trim() + "\r\n"
			})
		}, r.getDescription = function(e) {
			var t = r.splitSections(e);
			return t && t[0]
		}, r.getMediaSections = function(e) {
			var t = r.splitSections(e);
			return t.shift(), t
		}, r.matchPrefix = function(e, t) {
			return r.splitLines(e).filter(function(e) {
				return 0 === e.indexOf(t)
			})
		}, r.parseCandidate = function(e) {
			for(var t, n = {
					foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
					component: parseInt(t[1], 10),
					protocol: t[2].toLowerCase(),
					priority: parseInt(t[3], 10),
					ip: t[4],
					port: parseInt(t[5], 10),
					type: t[7]
				}, r = 8; r < t.length; r += 2) switch(t[r]) {
				case "raddr":
					n.relatedAddress = t[r + 1];
					break;
				case "rport":
					n.relatedPort = parseInt(t[r + 1], 10);
					break;
				case "tcptype":
					n.tcpType = t[r + 1];
					break;
				case "ufrag":
					n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
					break;
				default:
					n[t[r]] = t[r + 1]
			}
			return n
		}, r.writeCandidate = function(e) {
			var t = [];
			t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
			var n = e.type;
			return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
		}, r.parseIceOptions = function(e) {
			return e.substr(14).split(" ")
		}, r.parseRtpMap = function(e) {
			var t = e.substr(9).split(" "),
				n = {
					payloadType: parseInt(t.shift(), 10)
				};
			return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n
		}, r.writeRtpMap = function(e) {
			var t = e.payloadType;
			void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
			var n = e.channels || e.numChannels || 1;
			return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n"
		}, r.parseExtmap = function(e) {
			var t = e.substr(9).split(" ");
			return {
				id: parseInt(t[0], 10),
				direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
				uri: t[1]
			}
		}, r.writeExtmap = function(e) {
			return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
		}, r.parseFmtp = function(e) {
			for(var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split("="))[0].trim()] = t[1];
			return n
		}, r.writeFmtp = function(e) {
			var t = "",
				n = e.payloadType;
			if(void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
				var r = [];
				Object.keys(e.parameters).forEach(function(t) {
					e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
				}), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
			}
			return t
		}, r.parseRtcpFb = function(e) {
			var t = e.substr(e.indexOf(" ") + 1).split(" ");
			return {
				type: t.shift(),
				parameter: t.join(" ")
			}
		}, r.writeRtcpFb = function(e) {
			var t = "",
				n = e.payloadType;
			return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
				t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
			}), t
		}, r.parseSsrcMedia = function(e) {
			var t = e.indexOf(" "),
				n = {
					ssrc: parseInt(e.substr(7, t - 7), 10)
				},
				r = e.indexOf(":", t);
			return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
		}, r.parseSsrcGroup = function(e) {
			var t = e.substr(13).split(" ");
			return {
				semantics: t.shift(),
				ssrcs: t.map(function(e) {
					return parseInt(e, 10)
				})
			}
		}, r.getMid = function(e) {
			var t = r.matchPrefix(e, "a=mid:")[0];
			if(t) return t.substr(6)
		}, r.parseFingerprint = function(e) {
			var t = e.substr(14).split(" ");
			return {
				algorithm: t[0].toLowerCase(),
				value: t[1]
			}
		}, r.getDtlsParameters = function(e, t) {
			return {
				role: "auto",
				fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)
			}
		}, r.writeDtlsParameters = function(e, t) {
			var n = "a=setup:" + t + "\r\n";
			return e.fingerprints.forEach(function(e) {
				n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
			}), n
		}, r.getIceParameters = function(e, t) {
			var n = r.splitLines(e);
			return {
				usernameFragment: (n = n.concat(r.splitLines(t))).filter(function(e) {
					return 0 === e.indexOf("a=ice-ufrag:")
				})[0].substr(12),
				password: n.filter(function(e) {
					return 0 === e.indexOf("a=ice-pwd:")
				})[0].substr(10)
			}
		}, r.writeIceParameters = function(e) {
			return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
		}, r.parseRtpParameters = function(e) {
			for(var t = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: [],
					rtcp: []
				}, n = r.splitLines(e)[0].split(" "), i = 3; i < n.length; i++) {
				var a = n[i],
					o = r.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
				if(o) {
					var s = r.parseRtpMap(o),
						c = r.matchPrefix(e, "a=fmtp:" + a + " ");
					switch(s.parameters = c.length ? r.parseFmtp(c[0]) : {}, s.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(r.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
						case "RED":
						case "ULPFEC":
							t.fecMechanisms.push(s.name.toUpperCase())
					}
				}
			}
			return r.matchPrefix(e, "a=extmap:").forEach(function(e) {
				t.headerExtensions.push(r.parseExtmap(e))
			}), t
		}, r.writeRtpDescription = function(e, t) {
			var n = "";
			n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function(e) {
				return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
			}).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
				n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e)
			});
			var i = 0;
			return t.codecs.forEach(function(e) {
				e.maxptime > i && (i = e.maxptime)
			}), i > 0 && (n += "a=maxptime:" + i + "\r\n"), n += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e) {
				n += r.writeExtmap(e)
			}), n
		}, r.parseRtpEncodingParameters = function(e) {
			var t, n = [],
				i = r.parseRtpParameters(e),
				a = -1 !== i.fecMechanisms.indexOf("RED"),
				o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
				s = r.matchPrefix(e, "a=ssrc:").map(function(e) {
					return r.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				}),
				c = s.length > 0 && s[0].ssrc,
				d = r.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
					return e.substr(17).split(" ").map(function(e) {
						return parseInt(e, 10)
					})
				});
			d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]), i.codecs.forEach(function(e) {
				if("RTX" === e.name.toUpperCase() && e.parameters.apt) {
					var r = {
						ssrc: c,
						codecPayloadType: parseInt(e.parameters.apt, 10)
					};
					c && t && (r.rtx = {
						ssrc: t
					}), n.push(r), a && ((r = JSON.parse(JSON.stringify(r))).fec = {
						ssrc: t,
						mechanism: o ? "red+ulpfec" : "red"
					}, n.push(r))
				}
			}), 0 === n.length && c && n.push({
				ssrc: c
			});
			var u = r.matchPrefix(e, "b=");
			return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, n.forEach(function(e) {
				e.maxBitrate = u
			})), n
		}, r.parseRtcpParameters = function(e) {
			var t = {},
				n = r.matchPrefix(e, "a=ssrc:").map(function(e) {
					return r.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				})[0];
			n && (t.cname = n.value, t.ssrc = n.ssrc);
			var i = r.matchPrefix(e, "a=rtcp-rsize");
			t.reducedSize = i.length > 0, t.compound = 0 === i.length;
			var a = r.matchPrefix(e, "a=rtcp-mux");
			return t.mux = a.length > 0, t
		}, r.parseMsid = function(e) {
			var t, n = r.matchPrefix(e, "a=msid:");
			if(1 === n.length) return {
				stream: (t = n[0].substr(7).split(" "))[0],
				track: t[1]
			};
			var i = r.matchPrefix(e, "a=ssrc:").map(function(e) {
				return r.parseSsrcMedia(e)
			}).filter(function(e) {
				return "msid" === e.attribute
			});
			return i.length > 0 ? {
				stream: (t = i[0].value.split(" "))[0],
				track: t[1]
			} : void 0
		}, r.generateSessionId = function() {
			return Math.random().toString().substr(2, 21)
		}, r.writeSessionBoilerplate = function(e, t) {
			var n = void 0 !== t ? t : 2;
			return "v=0\r\no=thisisadapterortc " + (e || r.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
		}, r.writeMediaSection = function(e, t, n, i) {
			var a = r.writeRtpDescription(e.kind, t);
			if(a += r.writeIceParameters(e.iceGatherer.getLocalParameters()), a += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ? a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ? a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
				var o = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
				a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), a
		}, r.getDirection = function(e, t) {
			for(var n = r.splitLines(e), i = 0; i < n.length; i++) switch(n[i]) {
				case "a=sendrecv":
				case "a=sendonly":
				case "a=recvonly":
				case "a=inactive":
					return n[i].substr(2)
			}
			return t ? r.getDirection(t) : "sendrecv"
		}, r.getKind = function(e) {
			return r.splitLines(e)[0].split(" ")[0].substr(2)
		}, r.isRejected = function(e) {
			return "0" === e.split(" ", 2)[1]
		}, r.parseMLine = function(e) {
			var t = r.splitLines(e)[0].substr(2).split(" ");
			return {
				kind: t[0],
				port: parseInt(t[1], 10),
				protocol: t[2],
				fmt: t.slice(3).join(" ")
			}
		}, r.parseOLine = function(e) {
			var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
			return {
				username: t[0],
				sessionId: t[1],
				sessionVersion: parseInt(t[2], 10),
				netType: t[3],
				addressType: t[4],
				address: t[5]
			}
		}, r.isValidSDP = function(e) {
			if("string" != typeof e || 0 === e.length) return !1;
			for(var t = r.splitLines(e), n = 0; n < t.length; n++)
				if(t[n].length < 2 || "=" !== t[n].charAt(1)) return !1;
			return !0
		}, e.exports = r
	}, function(e, t, n) {
		"use strict";
		var r = n(278),
			i = n(69);
		e.exports = {
			shimRTCIceCandidate: function(e) {
				if(!(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
					var t = e.RTCIceCandidate;
					e.RTCIceCandidate = function(e) {
							"object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2));
							var n = new t(e),
								i = r.parseCandidate(e.candidate),
								a = Object.assign(n, i);
							return a.toJSON = function() {
								return {
									candidate: a.candidate,
									sdpMid: a.sdpMid,
									sdpMLineIndex: a.sdpMLineIndex,
									usernameFragment: a.usernameFragment
								}
							}, a
						},
						function(e, t, n) {
							if(e.RTCPeerConnection) {
								var r = e.RTCPeerConnection.prototype,
									i = r.addEventListener;
								r.addEventListener = function(e, r) {
									if(e !== t) return i.apply(this, arguments);
									var a = function(e) {
										r(n(e))
									};
									return this._eventMap = this._eventMap || {}, this._eventMap[r] = a, i.apply(this, [e, a])
								};
								var a = r.removeEventListener;
								r.removeEventListener = function(e, n) {
									if(e !== t || !this._eventMap || !this._eventMap[n]) return a.apply(this, arguments);
									var r = this._eventMap[n];
									return delete this._eventMap[n], a.apply(this, [e, r])
								}, Object.defineProperty(r, "on" + t, {
									get: function() {
										return this["_on" + t]
									},
									set: function(e) {
										this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
									}
								})
							}
						}(e, "icecandidate", function(t) {
							return t.candidate && Object.defineProperty(t, "candidate", {
								value: new e.RTCIceCandidate(t.candidate),
								writable: "false"
							}), t
						})
				}
			},
			shimCreateObjectURL: function(e) {
				var t = e && e.URL;
				if("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL && t.revokeObjectURL) {
					var n = t.createObjectURL.bind(t),
						r = t.revokeObjectURL.bind(t),
						a = new Map,
						o = 0;
					t.createObjectURL = function(e) {
						if("getTracks" in e) {
							var t = "polyblob:" + ++o;
							return a.set(t, e), i.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"), t
						}
						return n(e)
					}, t.revokeObjectURL = function(e) {
						r(e), a.delete(e)
					};
					var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
					Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
						get: function() {
							return s.get.apply(this)
						},
						set: function(e) {
							return this.srcObject = a.get(e) || null, s.set.apply(this, [e])
						}
					});
					var c = e.HTMLMediaElement.prototype.setAttribute;
					e.HTMLMediaElement.prototype.setAttribute = function() {
						return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = a.get(arguments[1]) || null), c.apply(this, arguments)
					}
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = {
				shimLocalStreamsAPI: function(e) {
					if("object" == typeof e && e.RTCPeerConnection) {
						if("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
								return this._localStreams || (this._localStreams = []), this._localStreams
							}), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById = function(e) {
								var t = null;
								return this._localStreams && this._localStreams.forEach(function(n) {
									n.id === e && (t = n)
								}), this._remoteStreams && this._remoteStreams.forEach(function(n) {
									n.id === e && (t = n)
								}), t
							}), !("addStream" in e.RTCPeerConnection.prototype)) {
							var t = e.RTCPeerConnection.prototype.addTrack;
							e.RTCPeerConnection.prototype.addStream = function(e) {
								this._localStreams || (this._localStreams = []), -1 === this._localStreams.indexOf(e) && this._localStreams.push(e);
								var n = this;
								e.getTracks().forEach(function(r) {
									t.call(n, r, e)
								})
							}, e.RTCPeerConnection.prototype.addTrack = function(e, n) {
								return n && (this._localStreams ? -1 === this._localStreams.indexOf(n) && this._localStreams.push(n) : this._localStreams = [n]), t.call(this, e, n)
							}
						}
						"removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
							this._localStreams || (this._localStreams = []);
							var t = this._localStreams.indexOf(e);
							if(-1 !== t) {
								this._localStreams.splice(t, 1);
								var n = this,
									r = e.getTracks();
								this.getSenders().forEach(function(e) {
									-1 !== r.indexOf(e.track) && n.removeTrack(e)
								})
							}
						})
					}
				},
				shimRemoteStreamsAPI: function(e) {
					"object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
						return this._remoteStreams ? this._remoteStreams : []
					}), "onaddstream" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
						get: function() {
							return this._onaddstream
						},
						set: function(e) {
							this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function(e) {
								var t = e.streams[0];
								if(this._remoteStreams || (this._remoteStreams = []), !(this._remoteStreams.indexOf(t) >= 0)) {
									this._remoteStreams.push(t);
									var n = new Event("addstream");
									n.stream = e.streams[0], this.dispatchEvent(n)
								}
							}.bind(this))
						}
					}))
				},
				shimCallbacksAPI: function(e) {
					if("object" == typeof e && e.RTCPeerConnection) {
						var t = e.RTCPeerConnection.prototype,
							n = t.createOffer,
							r = t.createAnswer,
							i = t.setLocalDescription,
							a = t.setRemoteDescription,
							o = t.addIceCandidate;
						t.createOffer = function(e, t) {
							var r = arguments.length >= 2 ? arguments[2] : arguments[0],
								i = n.apply(this, [r]);
							return t ? (i.then(e, t), Promise.resolve()) : i
						}, t.createAnswer = function(e, t) {
							var n = arguments.length >= 2 ? arguments[2] : arguments[0],
								i = r.apply(this, [n]);
							return t ? (i.then(e, t), Promise.resolve()) : i
						};
						var s = function(e, t, n) {
							var r = i.apply(this, [e]);
							return n ? (r.then(t, n), Promise.resolve()) : r
						};
						t.setLocalDescription = s, s = function(e, t, n) {
							var r = a.apply(this, [e]);
							return n ? (r.then(t, n), Promise.resolve()) : r
						}, t.setRemoteDescription = s, s = function(e, t, n) {
							var r = o.apply(this, [e]);
							return n ? (r.then(t, n), Promise.resolve()) : r
						}, t.addIceCandidate = s
					}
				},
				shimGetUserMedia: function(e) {
					var t = e && e.navigator;
					t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
						t.mediaDevices.getUserMedia(e).then(n, r)
					}.bind(t)))
				},
				shimRTCIceServerUrls: function(e) {
					var t = e.RTCPeerConnection;
					e.RTCPeerConnection = function(e, n) {
						if(e && e.iceServers) {
							for(var i = [], a = 0; a < e.iceServers.length; a++) {
								var o = e.iceServers[a];
								!o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (r.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, delete o.url, i.push(o)) : i.push(e.iceServers[a])
							}
							e.iceServers = i
						}
						return new t(e, n)
					}, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
						get: function() {
							return t.generateCertificate
						}
					})
				},
				shimTrackEventTransceiver: function(e) {
					"object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
						get: function() {
							return {
								receiver: this.receiver
							}
						}
					})
				},
				shimCreateOfferLegacy: function(e) {
					var t = e.RTCPeerConnection.prototype.createOffer;
					e.RTCPeerConnection.prototype.createOffer = function(e) {
						var n = this;
						if(e) {
							var r = n.getTransceivers().find(function(e) {
								return e.sender.track && "audio" === e.sender.track.kind
							});
							!1 === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection("sendonly") : "recvonly" === r.direction && r.setDirection("inactive") : !0 !== e.offerToReceiveAudio || r || n.addTransceiver("audio");
							var i = n.getTransceivers().find(function(e) {
								return e.sender.track && "video" === e.sender.track.kind
							});
							!1 === e.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") : "recvonly" === i.direction && i.setDirection("inactive") : !0 !== e.offerToReceiveVideo || i || n.addTransceiver("video")
						}
						return t.apply(n, arguments)
					}
				}
			};
		e.exports = {
			shimCallbacksAPI: i.shimCallbacksAPI,
			shimLocalStreamsAPI: i.shimLocalStreamsAPI,
			shimRemoteStreamsAPI: i.shimRemoteStreamsAPI,
			shimGetUserMedia: i.shimGetUserMedia,
			shimRTCIceServerUrls: i.shimRTCIceServerUrls,
			shimTrackEventTransceiver: i.shimTrackEventTransceiver,
			shimCreateOfferLegacy: i.shimCreateOfferLegacy
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = r.log;
		e.exports = function(e) {
			var t = r.detectBrowser(e),
				n = e && e.navigator,
				a = e && e.MediaStreamTrack,
				o = function(e) {
					return {
						name: {
							InternalError: "NotReadableError",
							NotSupportedError: "TypeError",
							PermissionDeniedError: "NotAllowedError",
							SecurityError: "NotAllowedError"
						}[e.name] || e.name,
						message: {
							"The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
						}[e.message] || e.message,
						constraint: e.constraint,
						toString: function() {
							return this.name + (this.message && ": ") + this.message
						}
					}
				},
				s = function(e, r, a) {
					var s = function(e) {
						if("object" != typeof e || e.require) return e;
						var t = [];
						return Object.keys(e).forEach(function(n) {
							if("require" !== n && "advanced" !== n && "mediaSource" !== n) {
								var r = e[n] = "object" == typeof e[n] ? e[n] : {
									ideal: e[n]
								};
								if(void 0 === r.min && void 0 === r.max && void 0 === r.exact || t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
									e.advanced = e.advanced || [];
									var i = {};
									"number" == typeof r.ideal ? i[n] = {
										min: r.ideal,
										max: r.ideal
									} : i[n] = r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
								}
							}
						}), t.length && (e.require = t), e
					};
					return e = JSON.parse(JSON.stringify(e)), t.version < 38 && (i("spec: " + JSON.stringify(e)), e.audio && (e.audio = s(e.audio)), e.video && (e.video = s(e.video)), i("ff37: " + JSON.stringify(e))), n.mozGetUserMedia(e, r, function(e) {
						a(o(e))
					})
				};
			if(n.mediaDevices || (n.mediaDevices = {
					getUserMedia: function(e) {
						return new Promise(function(t, n) {
							s(e, t, n)
						})
					},
					addEventListener: function() {},
					removeEventListener: function() {}
				}), n.mediaDevices.enumerateDevices = n.mediaDevices.enumerateDevices || function() {
					return new Promise(function(e) {
						e([{
							kind: "audioinput",
							deviceId: "default",
							label: "",
							groupId: ""
						}, {
							kind: "videoinput",
							deviceId: "default",
							label: "",
							groupId: ""
						}])
					})
				}, t.version < 41) {
				var c = n.mediaDevices.enumerateDevices.bind(n.mediaDevices);
				n.mediaDevices.enumerateDevices = function() {
					return c().then(void 0, function(e) {
						if("NotFoundError" === e.name) return [];
						throw e
					})
				}
			}
			if(t.version < 49) {
				var d = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
				n.mediaDevices.getUserMedia = function(e) {
					return d(e).then(function(t) {
						if(e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
							e.stop()
						}), new DOMException("The object can not be found here.", "NotFoundError");
						return t
					}, function(e) {
						return Promise.reject(o(e))
					})
				}
			}
			if(!(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
				var u = function(e, t, n) {
						t in e && !(n in e) && (e[n] = e[t], delete e[t])
					},
					l = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
				if(n.mediaDevices.getUserMedia = function(e) {
						return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)), u(e.audio, "autoGainControl", "mozAutoGainControl"), u(e.audio, "noiseSuppression", "mozNoiseSuppression")), l(e)
					}, a && a.prototype.getSettings) {
					var p = a.prototype.getSettings;
					a.prototype.getSettings = function() {
						var e = p.apply(this, arguments);
						return u(e, "mozAutoGainControl", "autoGainControl"), u(e, "mozNoiseSuppression", "noiseSuppression"), e
					}
				}
				if(a && a.prototype.applyConstraints) {
					var f = a.prototype.applyConstraints;
					a.prototype.applyConstraints = function(e) {
						return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), u(e, "autoGainControl", "mozAutoGainControl"), u(e, "noiseSuppression", "mozNoiseSuppression")), f.apply(this, [e])
					}
				}
			}
			n.getUserMedia = function(e, i, a) {
				if(t.version < 44) return s(e, i, a);
				r.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(i, a)
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = {
				shimOnTrack: function(e) {
					"object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
						get: function() {
							return this._ontrack
						},
						set: function(e) {
							this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function(e) {
								e.stream.getTracks().forEach(function(t) {
									var n = new Event("track");
									n.track = t, n.receiver = {
										track: t
									}, n.transceiver = {
										receiver: n.receiver
									}, n.streams = [e.stream], this.dispatchEvent(n)
								}.bind(this))
							}.bind(this))
						}
					}), "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
						get: function() {
							return {
								receiver: this.receiver
							}
						}
					})
				},
				shimSourceObject: function(e) {
					"object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
						get: function() {
							return this.mozSrcObject
						},
						set: function(e) {
							this.mozSrcObject = e
						}
					}))
				},
				shimPeerConnection: function(e) {
					var t = r.detectBrowser(e);
					if("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
						e.RTCPeerConnection || (e.RTCPeerConnection = function(n, r) {
							if(t.version < 38 && n && n.iceServers) {
								for(var i = [], a = 0; a < n.iceServers.length; a++) {
									var o = n.iceServers[a];
									if(o.hasOwnProperty("urls"))
										for(var s = 0; s < o.urls.length; s++) {
											var c = {
												url: o.urls[s]
											};
											0 === o.urls[s].indexOf("turn") && (c.username = o.username, c.credential = o.credential), i.push(c)
										} else i.push(n.iceServers[a])
								}
								n.iceServers = i
							}
							return new e.mozRTCPeerConnection(n, r)
						}, e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
							get: function() {
								return e.mozRTCPeerConnection.generateCertificate
							}
						}), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
							var n = e.RTCPeerConnection.prototype[t];
							e.RTCPeerConnection.prototype[t] = function() {
								return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
							}
						});
						var n = e.RTCPeerConnection.prototype.addIceCandidate;
						e.RTCPeerConnection.prototype.addIceCandidate = function() {
							return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
						};
						var i = {
								inboundrtp: "inbound-rtp",
								outboundrtp: "outbound-rtp",
								candidatepair: "candidate-pair",
								localcandidate: "local-candidate",
								remotecandidate: "remote-candidate"
							},
							a = e.RTCPeerConnection.prototype.getStats;
						e.RTCPeerConnection.prototype.getStats = function(e, n, r) {
							return a.apply(this, [e || null]).then(function(e) {
								if(t.version < 48 && (e = function(e) {
										var t = new Map;
										return Object.keys(e).forEach(function(n) {
											t.set(n, e[n]), t[n] = e[n]
										}), t
									}(e)), t.version < 53 && !n) try {
									e.forEach(function(e) {
										e.type = i[e.type] || e.type
									})
								} catch(t) {
									if("TypeError" !== t.name) throw t;
									e.forEach(function(t, n) {
										e.set(n, Object.assign({}, t, {
											type: i[t.type] || t.type
										}))
									})
								}
								return e
							}).then(n, r)
						}
					}
				},
				shimRemoveStream: function(e) {
					!e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
						var t = this;
						r.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(n) {
							n.track && -1 !== e.getTracks().indexOf(n.track) && t.removeTrack(n)
						})
					})
				}
			};
		e.exports = {
			shimOnTrack: i.shimOnTrack,
			shimSourceObject: i.shimSourceObject,
			shimPeerConnection: i.shimPeerConnection,
			shimRemoveStream: i.shimRemoveStream,
			shimGetUserMedia: n(281)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			var t = e && e.navigator,
				n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
			t.mediaDevices.getUserMedia = function(e) {
				return n(e).catch(function(e) {
					return Promise.reject(function(e) {
						return {
							name: {
								PermissionDeniedError: "NotAllowedError"
							}[e.name] || e.name,
							message: e.message,
							constraint: e.constraint,
							toString: function() {
								return this.name
							}
						}
					}(e))
				})
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = {
			generateIdentifier: function() {
				return Math.random().toString(36).substr(2, 10)
			}
		};
		r.localCName = r.generateIdentifier(), r.splitLines = function(e) {
			return e.trim().split("\n").map(function(e) {
				return e.trim()
			})
		}, r.splitSections = function(e) {
			return e.split("\nm=").map(function(e, t) {
				return(t > 0 ? "m=" + e : e).trim() + "\r\n"
			})
		}, r.getDescription = function(e) {
			var t = r.splitSections(e);
			return t && t[0]
		}, r.getMediaSections = function(e) {
			var t = r.splitSections(e);
			return t.shift(), t
		}, r.matchPrefix = function(e, t) {
			return r.splitLines(e).filter(function(e) {
				return 0 === e.indexOf(t)
			})
		}, r.parseCandidate = function(e) {
			for(var t, n = {
					foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
					component: parseInt(t[1], 10),
					protocol: t[2].toLowerCase(),
					priority: parseInt(t[3], 10),
					ip: t[4],
					port: parseInt(t[5], 10),
					type: t[7]
				}, r = 8; r < t.length; r += 2) switch(t[r]) {
				case "raddr":
					n.relatedAddress = t[r + 1];
					break;
				case "rport":
					n.relatedPort = parseInt(t[r + 1], 10);
					break;
				case "tcptype":
					n.tcpType = t[r + 1];
					break;
				case "ufrag":
					n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
					break;
				default:
					n[t[r]] = t[r + 1]
			}
			return n
		}, r.writeCandidate = function(e) {
			var t = [];
			t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
			var n = e.type;
			return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
		}, r.parseIceOptions = function(e) {
			return e.substr(14).split(" ")
		}, r.parseRtpMap = function(e) {
			var t = e.substr(9).split(" "),
				n = {
					payloadType: parseInt(t.shift(), 10)
				};
			return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, n
		}, r.writeRtpMap = function(e) {
			var t = e.payloadType;
			return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
		}, r.parseExtmap = function(e) {
			var t = e.substr(9).split(" ");
			return {
				id: parseInt(t[0], 10),
				direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
				uri: t[1]
			}
		}, r.writeExtmap = function(e) {
			return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
		}, r.parseFmtp = function(e) {
			for(var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split("="))[0].trim()] = t[1];
			return n
		}, r.writeFmtp = function(e) {
			var t = "",
				n = e.payloadType;
			if(void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
				var r = [];
				Object.keys(e.parameters).forEach(function(t) {
					r.push(t + "=" + e.parameters[t])
				}), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
			}
			return t
		}, r.parseRtcpFb = function(e) {
			var t = e.substr(e.indexOf(" ") + 1).split(" ");
			return {
				type: t.shift(),
				parameter: t.join(" ")
			}
		}, r.writeRtcpFb = function(e) {
			var t = "",
				n = e.payloadType;
			return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
				t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
			}), t
		}, r.parseSsrcMedia = function(e) {
			var t = e.indexOf(" "),
				n = {
					ssrc: parseInt(e.substr(7, t - 7), 10)
				},
				r = e.indexOf(":", t);
			return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
		}, r.getMid = function(e) {
			var t = r.matchPrefix(e, "a=mid:")[0];
			if(t) return t.substr(6)
		}, r.parseFingerprint = function(e) {
			var t = e.substr(14).split(" ");
			return {
				algorithm: t[0].toLowerCase(),
				value: t[1]
			}
		}, r.getDtlsParameters = function(e, t) {
			return {
				role: "auto",
				fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)
			}
		}, r.writeDtlsParameters = function(e, t) {
			var n = "a=setup:" + t + "\r\n";
			return e.fingerprints.forEach(function(e) {
				n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
			}), n
		}, r.getIceParameters = function(e, t) {
			var n = r.splitLines(e);
			return {
				usernameFragment: (n = n.concat(r.splitLines(t))).filter(function(e) {
					return 0 === e.indexOf("a=ice-ufrag:")
				})[0].substr(12),
				password: n.filter(function(e) {
					return 0 === e.indexOf("a=ice-pwd:")
				})[0].substr(10)
			}
		}, r.writeIceParameters = function(e) {
			return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
		}, r.parseRtpParameters = function(e) {
			for(var t = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: [],
					rtcp: []
				}, n = r.splitLines(e)[0].split(" "), i = 3; i < n.length; i++) {
				var a = n[i],
					o = r.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
				if(o) {
					var s = r.parseRtpMap(o),
						c = r.matchPrefix(e, "a=fmtp:" + a + " ");
					switch(s.parameters = c.length ? r.parseFmtp(c[0]) : {}, s.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(r.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
						case "RED":
						case "ULPFEC":
							t.fecMechanisms.push(s.name.toUpperCase())
					}
				}
			}
			return r.matchPrefix(e, "a=extmap:").forEach(function(e) {
				t.headerExtensions.push(r.parseExtmap(e))
			}), t
		}, r.writeRtpDescription = function(e, t) {
			var n = "";
			n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function(e) {
				return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
			}).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
				n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e)
			});
			var i = 0;
			return t.codecs.forEach(function(e) {
				e.maxptime > i && (i = e.maxptime)
			}), i > 0 && (n += "a=maxptime:" + i + "\r\n"), n += "a=rtcp-mux\r\n", t.headerExtensions.forEach(function(e) {
				n += r.writeExtmap(e)
			}), n
		}, r.parseRtpEncodingParameters = function(e) {
			var t, n = [],
				i = r.parseRtpParameters(e),
				a = -1 !== i.fecMechanisms.indexOf("RED"),
				o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
				s = r.matchPrefix(e, "a=ssrc:").map(function(e) {
					return r.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				}),
				c = s.length > 0 && s[0].ssrc,
				d = r.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
					var t = e.split(" ");
					return t.shift(), t.map(function(e) {
						return parseInt(e, 10)
					})
				});
			d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]), i.codecs.forEach(function(e) {
				if("RTX" === e.name.toUpperCase() && e.parameters.apt) {
					var r = {
						ssrc: c,
						codecPayloadType: parseInt(e.parameters.apt, 10),
						rtx: {
							ssrc: t
						}
					};
					n.push(r), a && ((r = JSON.parse(JSON.stringify(r))).fec = {
						ssrc: t,
						mechanism: o ? "red+ulpfec" : "red"
					}, n.push(r))
				}
			}), 0 === n.length && c && n.push({
				ssrc: c
			});
			var u = r.matchPrefix(e, "b=");
			return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, n.forEach(function(e) {
				e.maxBitrate = u
			})), n
		}, r.parseRtcpParameters = function(e) {
			var t = {},
				n = r.matchPrefix(e, "a=ssrc:").map(function(e) {
					return r.parseSsrcMedia(e)
				}).filter(function(e) {
					return "cname" === e.attribute
				})[0];
			n && (t.cname = n.value, t.ssrc = n.ssrc);
			var i = r.matchPrefix(e, "a=rtcp-rsize");
			t.reducedSize = i.length > 0, t.compound = 0 === i.length;
			var a = r.matchPrefix(e, "a=rtcp-mux");
			return t.mux = a.length > 0, t
		}, r.parseMsid = function(e) {
			var t, n = r.matchPrefix(e, "a=msid:");
			if(1 === n.length) return {
				stream: (t = n[0].substr(7).split(" "))[0],
				track: t[1]
			};
			var i = r.matchPrefix(e, "a=ssrc:").map(function(e) {
				return r.parseSsrcMedia(e)
			}).filter(function(e) {
				return "msid" === e.attribute
			});
			return i.length > 0 ? {
				stream: (t = i[0].value.split(" "))[0],
				track: t[1]
			} : void 0
		}, r.generateSessionId = function() {
			return Math.random().toString().substr(2, 21)
		}, r.writeSessionBoilerplate = function(e, t) {
			var n = void 0 !== t ? t : 2;
			return "v=0\r\no=thisisadapterortc " + (e || r.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
		}, r.writeMediaSection = function(e, t, n, i) {
			var a = r.writeRtpDescription(e.kind, t);
			if(a += r.writeIceParameters(e.iceGatherer.getLocalParameters()), a += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ? a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ? a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
				var o = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
				a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), a
		}, r.getDirection = function(e, t) {
			for(var n = r.splitLines(e), i = 0; i < n.length; i++) switch(n[i]) {
				case "a=sendrecv":
				case "a=sendonly":
				case "a=recvonly":
				case "a=inactive":
					return n[i].substr(2)
			}
			return t ? r.getDirection(t) : "sendrecv"
		}, r.getKind = function(e) {
			return r.splitLines(e)[0].split(" ")[0].substr(2)
		}, r.isRejected = function(e) {
			return "0" === e.split(" ", 2)[1]
		}, r.parseMLine = function(e) {
			var t = r.splitLines(e)[0].substr(2).split(" ");
			return {
				kind: t[0],
				port: parseInt(t[1], 10),
				protocol: t[2],
				fmt: t.slice(3).join(" ")
			}
		}, r.parseOLine = function(e) {
			var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
			return {
				username: t[0],
				sessionId: t[1],
				sessionVersion: parseInt(t[2], 10),
				netType: t[3],
				addressType: t[4],
				address: t[5]
			}
		}, e.exports = r
	}, function(e, t, n) {
		"use strict";
		var r = n(284);

		function i(e, t, n, i, a) {
			var o = r.writeRtpDescription(e.kind, t);
			if(o += r.writeIceParameters(e.iceGatherer.getLocalParameters()), o += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : a || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
				var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
				e.rtpSender._initialTrackId = s;
				var c = "msid:" + (i ? i.id : "-") + " " + s + "\r\n";
				o += "a=" + c, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
			}
			return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), o
		}

		function a(e, t) {
			var n = {
					codecs: [],
					headerExtensions: [],
					fecMechanisms: []
				},
				r = function(e, t) {
					e = parseInt(e, 10);
					for(var n = 0; n < t.length; n++)
						if(t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
				},
				i = function(e, t, n, i) {
					var a = r(e.parameters.apt, n),
						o = r(t.parameters.apt, i);
					return a && o && a.name.toLowerCase() === o.name.toLowerCase()
				};
			return e.codecs.forEach(function(r) {
				for(var a = 0; a < t.codecs.length; a++) {
					var o = t.codecs[a];
					if(r.name.toLowerCase() === o.name.toLowerCase() && r.clockRate === o.clockRate) {
						if("rtx" === r.name.toLowerCase() && r.parameters && o.parameters.apt && !i(r, o, e.codecs, t.codecs)) continue;
						(o = JSON.parse(JSON.stringify(o))).numChannels = Math.min(r.numChannels, o.numChannels), n.codecs.push(o), o.rtcpFeedback = o.rtcpFeedback.filter(function(e) {
							for(var t = 0; t < r.rtcpFeedback.length; t++)
								if(r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return !0;
							return !1
						});
						break
					}
				}
			}), e.headerExtensions.forEach(function(e) {
				for(var r = 0; r < t.headerExtensions.length; r++) {
					var i = t.headerExtensions[r];
					if(e.uri === i.uri) {
						n.headerExtensions.push(i);
						break
					}
				}
			}), n
		}

		function o(e, t, n) {
			return -1 !== {
				offer: {
					setLocalDescription: ["stable", "have-local-offer"],
					setRemoteDescription: ["stable", "have-remote-offer"]
				},
				answer: {
					setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
					setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
				}
			}[t][e].indexOf(n)
		}

		function s(e, t) {
			var n = e.getRemoteCandidates().find(function(e) {
				return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
			});
			return n || e.addRemoteCandidate(t), !n
		}

		function c(e, t) {
			var n = new Error(t);
			return n.name = e, n.code = {
				NotSupportedError: 9,
				InvalidStateError: 11,
				InvalidAccessError: 15,
				TypeError: void 0,
				OperationError: void 0
			}[e], n
		}
		e.exports = function(e, t) {
			function n(t, n) {
				n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
					track: t
				}))
			}

			function d(t, n, r, i) {
				var a = new Event("track");
				a.track = n, a.receiver = r, a.transceiver = {
					receiver: r
				}, a.streams = i, e.setTimeout(function() {
					t._dispatchEvent("track", a)
				})
			}
			var u = function(n) {
				var i = this,
					a = document.createDocumentFragment();
				if(["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
						i[e] = a[e].bind(a)
					}), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
				switch(n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
					case "all":
					case "relay":
						break;
					default:
						n.iceTransportPolicy = "all"
				}
				switch(n.bundlePolicy) {
					case "balanced":
					case "max-compat":
					case "max-bundle":
						break;
					default:
						n.bundlePolicy = "balanced"
				}
				if(n.iceServers = function(e, t) {
						var n = !1;
						return(e = JSON.parse(JSON.stringify(e))).filter(function(e) {
							if(e && (e.urls || e.url)) {
								var r = e.urls || e.url;
								e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
								var i = "string" == typeof r;
								return i && (r = [r]), r = r.filter(function(e) {
									return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || n ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (n = !0, !0)
								}), delete e.url, e.urls = i ? r[0] : r, !!r.length
							}
						})
					}(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize)
					for(var o = n.iceCandidatePoolSize; o > 0; o--) this._iceGatherers.push(new e.RTCIceGatherer({
						iceServers: n.iceServers,
						gatherPolicy: n.iceTransportPolicy
					}));
				else n.iceCandidatePoolSize = 0;
				this._config = n, this.transceivers = [], this._sdpSessionId = r.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1
			};
			Object.defineProperty(u.prototype, "localDescription", {
				configurable: !0,
				get: function() {
					return this._localDescription
				}
			}), Object.defineProperty(u.prototype, "remoteDescription", {
				configurable: !0,
				get: function() {
					return this._remoteDescription
				}
			}), u.prototype.onicecandidate = null, u.prototype.onaddstream = null, u.prototype.ontrack = null, u.prototype.onremovestream = null, u.prototype.onsignalingstatechange = null, u.prototype.oniceconnectionstatechange = null, u.prototype.onconnectionstatechange = null, u.prototype.onicegatheringstatechange = null, u.prototype.onnegotiationneeded = null, u.prototype.ondatachannel = null, u.prototype._dispatchEvent = function(e, t) {
				this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
			}, u.prototype._emitGatheringStateChange = function() {
				var e = new Event("icegatheringstatechange");
				this._dispatchEvent("icegatheringstatechange", e)
			}, u.prototype.getConfiguration = function() {
				return this._config
			}, u.prototype.getLocalStreams = function() {
				return this.localStreams
			}, u.prototype.getRemoteStreams = function() {
				return this.remoteStreams
			}, u.prototype._createTransceiver = function(e, t) {
				var n = this.transceivers.length > 0,
					r = {
						track: null,
						iceGatherer: null,
						iceTransport: null,
						dtlsTransport: null,
						localCapabilities: null,
						remoteCapabilities: null,
						rtpSender: null,
						rtpReceiver: null,
						kind: e,
						mid: null,
						sendEncodingParameters: null,
						recvEncodingParameters: null,
						stream: null,
						associatedRemoteMediaStreams: [],
						wantReceive: !0
					};
				if(this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport, r.dtlsTransport = this.transceivers[0].dtlsTransport;
				else {
					var i = this._createIceAndDtlsTransports();
					r.iceTransport = i.iceTransport, r.dtlsTransport = i.dtlsTransport
				}
				return t || this.transceivers.push(r), r
			}, u.prototype.addTrack = function(t, n) {
				if(this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
				var r;
				if(this.transceivers.find(function(e) {
						return e.track === t
					})) throw c("InvalidAccessError", "Track already exists.");
				for(var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (r = this.transceivers[i]);
				return r || (r = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(n) && this.localStreams.push(n), r.track = t, r.stream = n, r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport), r.rtpSender
			}, u.prototype.addStream = function(e) {
				var n = this;
				if(t >= 15025) e.getTracks().forEach(function(t) {
					n.addTrack(t, e)
				});
				else {
					var r = e.clone();
					e.getTracks().forEach(function(e, t) {
						var n = r.getTracks()[t];
						e.addEventListener("enabled", function(e) {
							n.enabled = e.enabled
						})
					}), r.getTracks().forEach(function(e) {
						n.addTrack(e, r)
					})
				}
			}, u.prototype.removeTrack = function(t) {
				if(this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
				if(!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
				var n = this.transceivers.find(function(e) {
					return e.rtpSender === t
				});
				if(!n) throw c("InvalidAccessError", "Sender was not created by this connection.");
				var r = n.stream;
				n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map(function(e) {
					return e.stream
				}).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded()
			}, u.prototype.removeStream = function(e) {
				var t = this;
				e.getTracks().forEach(function(e) {
					var n = t.getSenders().find(function(t) {
						return t.track === e
					});
					n && t.removeTrack(n)
				})
			}, u.prototype.getSenders = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpSender
				}).map(function(e) {
					return e.rtpSender
				})
			}, u.prototype.getReceivers = function() {
				return this.transceivers.filter(function(e) {
					return !!e.rtpReceiver
				}).map(function(e) {
					return e.rtpReceiver
				})
			}, u.prototype._createIceGatherer = function(t, n) {
				var r = this;
				if(n && t > 0) return this.transceivers[0].iceGatherer;
				if(this._iceGatherers.length) return this._iceGatherers.shift();
				var i = new e.RTCIceGatherer({
					iceServers: this._config.iceServers,
					gatherPolicy: this._config.iceTransportPolicy
				});
				return Object.defineProperty(i, "state", {
					value: "new",
					writable: !0
				}), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
					var n = !e.candidate || 0 === Object.keys(e.candidate).length;
					i.state = n ? "completed" : "gathering", null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
				}, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
			}, u.prototype._gather = function(t, n) {
				var i = this,
					a = this.transceivers[n].iceGatherer;
				if(!a.onlocalcandidate) {
					var o = this.transceivers[n].bufferedCandidateEvents;
					this.transceivers[n].bufferedCandidateEvents = null, a.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates), a.onlocalcandidate = function(e) {
						if(!(i.usingBundle && n > 0)) {
							var o = new Event("icecandidate");
							o.candidate = {
								sdpMid: t,
								sdpMLineIndex: n
							};
							var s = e.candidate,
								c = !s || 0 === Object.keys(s).length;
							if(c) "new" !== a.state && "gathering" !== a.state || (a.state = "completed");
							else {
								"new" === a.state && (a.state = "gathering"), s.component = 1, s.ufrag = a.getLocalParameters().usernameFragment;
								var d = r.writeCandidate(s);
								o.candidate = Object.assign(o.candidate, r.parseCandidate(d)), o.candidate.candidate = d, o.candidate.toJSON = function() {
									return {
										candidate: o.candidate.candidate,
										sdpMid: o.candidate.sdpMid,
										sdpMLineIndex: o.candidate.sdpMLineIndex,
										usernameFragment: o.candidate.usernameFragment
									}
								}
							}
							var u = r.getMediaSections(i._localDescription.sdp);
							u[o.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", i._localDescription.sdp = r.getDescription(i._localDescription.sdp) + u.join("");
							var l = i.transceivers.every(function(e) {
								return e.iceGatherer && "completed" === e.iceGatherer.state
							});
							"gathering" !== i.iceGatheringState && (i.iceGatheringState = "gathering", i._emitGatheringStateChange()), c || i._dispatchEvent("icecandidate", o), l && (i._dispatchEvent("icecandidate", new Event("icecandidate")), i.iceGatheringState = "complete", i._emitGatheringStateChange())
						}
					}, e.setTimeout(function() {
						o.forEach(function(e) {
							a.onlocalcandidate(e)
						})
					}, 0)
				}
			}, u.prototype._createIceAndDtlsTransports = function() {
				var t = this,
					n = new e.RTCIceTransport(null);
				n.onicestatechange = function() {
					t._updateIceConnectionState(), t._updateConnectionState()
				};
				var r = new e.RTCDtlsTransport(n);
				return r.ondtlsstatechange = function() {
					t._updateConnectionState()
				}, r.onerror = function() {
					Object.defineProperty(r, "state", {
						value: "failed",
						writable: !0
					}), t._updateConnectionState()
				}, {
					iceTransport: n,
					dtlsTransport: r
				}
			}, u.prototype._disposeIceAndDtlsTransports = function(e) {
				var t = this.transceivers[e].iceGatherer;
				t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
				var n = this.transceivers[e].iceTransport;
				n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
				var r = this.transceivers[e].dtlsTransport;
				r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
			}, u.prototype._transceive = function(e, n, i) {
				var o = a(e.localCapabilities, e.remoteCapabilities);
				n && e.rtpSender && (o.encodings = e.sendEncodingParameters, o.rtcp = {
					cname: r.localCName,
					compound: e.rtcpParameters.compound
				}, e.recvEncodingParameters.length && (o.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(o)), i && e.rtpReceiver && o.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
					delete e.rtx
				}), e.recvEncodingParameters.length ? o.encodings = e.recvEncodingParameters : o.encodings = [{}], o.rtcp = {
					compound: e.rtcpParameters.compound
				}, e.rtcpParameters.cname && (o.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (o.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(o))
			}, u.prototype.setLocalDescription = function(e) {
				var t, n, i = this;
				if(-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
				if(!o("setLocalDescription", e.type, i.signalingState) || i._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + i.signalingState));
				if("offer" === e.type) t = r.splitSections(e.sdp), n = t.shift(), t.forEach(function(e, t) {
					var n = r.parseRtpParameters(e);
					i.transceivers[t].localCapabilities = n
				}), i.transceivers.forEach(function(e, t) {
					i._gather(e.mid, t)
				});
				else if("answer" === e.type) {
					t = r.splitSections(i._remoteDescription.sdp), n = t.shift();
					var s = r.matchPrefix(n, "a=ice-lite").length > 0;
					t.forEach(function(e, t) {
						var o = i.transceivers[t],
							c = o.iceGatherer,
							d = o.iceTransport,
							u = o.dtlsTransport,
							l = o.localCapabilities,
							p = o.remoteCapabilities;
						if(!(r.isRejected(e) && 0 === r.matchPrefix(e, "a=bundle-only").length) && !o.rejected) {
							var f = r.getIceParameters(e, n),
								h = r.getDtlsParameters(e, n);
							s && (h.role = "server"), i.usingBundle && 0 !== t || (i._gather(o.mid, t), "new" === d.state && d.start(c, f, s ? "controlling" : "controlled"), "new" === u.state && u.start(h));
							var m = a(l, p);
							i._transceive(o, m.codecs.length > 0, !1)
						}
					})
				}
				return i._localDescription = {
					type: e.type,
					sdp: e.sdp
				}, "offer" === e.type ? i._updateSignalingState("have-local-offer") : i._updateSignalingState("stable"), Promise.resolve()
			}, u.prototype.setRemoteDescription = function(i) {
				var a = this;
				if(-1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + i.type + '"'));
				if(!o("setRemoteDescription", i.type, a.signalingState) || a._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + i.type + " in state " + a.signalingState));
				var u = {};
				a.remoteStreams.forEach(function(e) {
					u[e.id] = e
				});
				var l = [],
					p = r.splitSections(i.sdp),
					f = p.shift(),
					h = r.matchPrefix(f, "a=ice-lite").length > 0,
					m = r.matchPrefix(f, "a=group:BUNDLE ").length > 0;
				a.usingBundle = m;
				var v = r.matchPrefix(f, "a=ice-options:")[0];
				return a.canTrickleIceCandidates = !!v && v.substr(14).split(" ").indexOf("trickle") >= 0, p.forEach(function(o, c) {
					var d = r.splitLines(o),
						p = r.getKind(o),
						v = r.isRejected(o) && 0 === r.matchPrefix(o, "a=bundle-only").length,
						_ = d[0].substr(2).split(" ")[2],
						R = r.getDirection(o, f),
						g = r.parseMsid(o),
						y = r.getMid(o) || r.generateIdentifier();
					if(v || "application" === p && ("DTLS/SCTP" === _ || "UDP/DTLS/SCTP" === _)) a.transceivers[c] = {
						mid: y,
						kind: p,
						protocol: _,
						rejected: !0
					};
					else {
						var C, T, E, b, S, O, P, k, I;
						!v && a.transceivers[c] && a.transceivers[c].rejected && (a.transceivers[c] = a._createTransceiver(p, !0));
						var A, L, D = r.parseRtpParameters(o);
						v || (A = r.getIceParameters(o, f), (L = r.getDtlsParameters(o, f)).role = "client"), P = r.parseRtpEncodingParameters(o);
						var w = r.parseRtcpParameters(o),
							M = r.matchPrefix(o, "a=end-of-candidates", f).length > 0,
							W = r.matchPrefix(o, "a=candidate:").map(function(e) {
								return r.parseCandidate(e)
							}).filter(function(e) {
								return 1 === e.component
							});
						if(("offer" === i.type || "answer" === i.type) && !v && m && c > 0 && a.transceivers[c] && (a._disposeIceAndDtlsTransports(c), a.transceivers[c].iceGatherer = a.transceivers[0].iceGatherer, a.transceivers[c].iceTransport = a.transceivers[0].iceTransport, a.transceivers[c].dtlsTransport = a.transceivers[0].dtlsTransport, a.transceivers[c].rtpSender && a.transceivers[c].rtpSender.setTransport(a.transceivers[0].dtlsTransport), a.transceivers[c].rtpReceiver && a.transceivers[c].rtpReceiver.setTransport(a.transceivers[0].dtlsTransport)), "offer" !== i.type || v) "answer" !== i.type || v || (T = (C = a.transceivers[c]).iceGatherer, E = C.iceTransport, b = C.dtlsTransport, S = C.rtpReceiver, O = C.sendEncodingParameters, k = C.localCapabilities, a.transceivers[c].recvEncodingParameters = P, a.transceivers[c].remoteCapabilities = D, a.transceivers[c].rtcpParameters = w, W.length && "new" === E.state && (!h && !M || m && 0 !== c ? W.forEach(function(e) {
							s(C.iceTransport, e)
						}) : E.setRemoteCandidates(W)), m && 0 !== c || ("new" === E.state && E.start(T, A, "controlling"), "new" === b.state && b.start(L)), a._transceive(C, "sendrecv" === R || "recvonly" === R, "sendrecv" === R || "sendonly" === R), !S || "sendrecv" !== R && "sendonly" !== R ? delete C.rtpReceiver : (I = S.track, g ? (u[g.stream] || (u[g.stream] = new e.MediaStream), n(I, u[g.stream]), l.push([I, S, u[g.stream]])) : (u.default || (u.default = new e.MediaStream), n(I, u.default), l.push([I, S, u.default]))));
						else {
							(C = a.transceivers[c] || a._createTransceiver(p)).mid = y, C.iceGatherer || (C.iceGatherer = a._createIceGatherer(c, m)), W.length && "new" === C.iceTransport.state && (!M || m && 0 !== c ? W.forEach(function(e) {
								s(C.iceTransport, e)
							}) : C.iceTransport.setRemoteCandidates(W)), k = e.RTCRtpReceiver.getCapabilities(p), t < 15019 && (k.codecs = k.codecs.filter(function(e) {
								return "rtx" !== e.name
							})), O = C.sendEncodingParameters || [{
								ssrc: 1001 * (2 * c + 2)
							}];
							var B, N = !1;
							if("sendrecv" === R || "sendonly" === R) {
								if(N = !C.rtpReceiver, S = C.rtpReceiver || new e.RTCRtpReceiver(C.dtlsTransport, p), N) I = S.track, g && "-" === g.stream || (g ? (u[g.stream] || (u[g.stream] = new e.MediaStream, Object.defineProperty(u[g.stream], "id", {
									get: function() {
										return g.stream
									}
								})), Object.defineProperty(I, "id", {
									get: function() {
										return g.track
									}
								}), B = u[g.stream]) : (u.default || (u.default = new e.MediaStream), B = u.default)), B && (n(I, B), C.associatedRemoteMediaStreams.push(B)), l.push([I, S, B])
							} else C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function(t) {
								var n, r, i = t.getTracks().find(function(e) {
									return e.id === C.rtpReceiver.track.id
								});
								i && (n = i, (r = t).removeTrack(n), r.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
									track: n
								})))
							}), C.associatedRemoteMediaStreams = []);
							C.localCapabilities = k, C.remoteCapabilities = D, C.rtpReceiver = S, C.rtcpParameters = w, C.sendEncodingParameters = O, C.recvEncodingParameters = P, a._transceive(a.transceivers[c], !1, N)
						}
					}
				}), void 0 === a._dtlsRole && (a._dtlsRole = "offer" === i.type ? "active" : "passive"), a._remoteDescription = {
					type: i.type,
					sdp: i.sdp
				}, "offer" === i.type ? a._updateSignalingState("have-remote-offer") : a._updateSignalingState("stable"), Object.keys(u).forEach(function(t) {
					var n = u[t];
					if(n.getTracks().length) {
						if(-1 === a.remoteStreams.indexOf(n)) {
							a.remoteStreams.push(n);
							var r = new Event("addstream");
							r.stream = n, e.setTimeout(function() {
								a._dispatchEvent("addstream", r)
							})
						}
						l.forEach(function(e) {
							var t = e[0],
								r = e[1];
							n.id === e[2].id && d(a, t, r, [n])
						})
					}
				}), l.forEach(function(e) {
					e[2] || d(a, e[0], e[1], [])
				}), e.setTimeout(function() {
					a && a.transceivers && a.transceivers.forEach(function(e) {
						e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
					})
				}, 4e3), Promise.resolve()
			}, u.prototype.close = function() {
				this.transceivers.forEach(function(e) {
					e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
				}), this._isClosed = !0, this._updateSignalingState("closed")
			}, u.prototype._updateSignalingState = function(e) {
				this.signalingState = e;
				var t = new Event("signalingstatechange");
				this._dispatchEvent("signalingstatechange", t)
			}, u.prototype._maybeFireNegotiationNeeded = function() {
				var t = this;
				"stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function() {
					if(t.needNegotiation) {
						t.needNegotiation = !1;
						var e = new Event("negotiationneeded");
						t._dispatchEvent("negotiationneeded", e)
					}
				}, 0))
			}, u.prototype._updateIceConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					checking: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if(this.transceivers.forEach(function(e) {
						t[e.iceTransport.state]++
					}), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
					this.iceConnectionState = e;
					var n = new Event("iceconnectionstatechange");
					this._dispatchEvent("iceconnectionstatechange", n)
				}
			}, u.prototype._updateConnectionState = function() {
				var e, t = {
					new: 0,
					closed: 0,
					connecting: 0,
					connected: 0,
					completed: 0,
					disconnected: 0,
					failed: 0
				};
				if(this.transceivers.forEach(function(e) {
						t[e.iceTransport.state]++, t[e.dtlsTransport.state]++
					}), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
					this.connectionState = e;
					var n = new Event("connectionstatechange");
					this._dispatchEvent("connectionstatechange", n)
				}
			}, u.prototype.createOffer = function() {
				var n = this;
				if(n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
				var a = n.transceivers.filter(function(e) {
						return "audio" === e.kind
					}).length,
					o = n.transceivers.filter(function(e) {
						return "video" === e.kind
					}).length,
					s = arguments[0];
				if(s) {
					if(s.mandatory || s.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
					void 0 !== s.offerToReceiveAudio && (a = !0 === s.offerToReceiveAudio ? 1 : !1 === s.offerToReceiveAudio ? 0 : s.offerToReceiveAudio), void 0 !== s.offerToReceiveVideo && (o = !0 === s.offerToReceiveVideo ? 1 : !1 === s.offerToReceiveVideo ? 0 : s.offerToReceiveVideo)
				}
				for(n.transceivers.forEach(function(e) {
						"audio" === e.kind ? --a < 0 && (e.wantReceive = !1) : "video" === e.kind && --o < 0 && (e.wantReceive = !1)
					}); a > 0 || o > 0;) a > 0 && (n._createTransceiver("audio"), a--), o > 0 && (n._createTransceiver("video"), o--);
				var d = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
				n.transceivers.forEach(function(i, a) {
					var o = i.track,
						s = i.kind,
						c = i.mid || r.generateIdentifier();
					i.mid = c, i.iceGatherer || (i.iceGatherer = n._createIceGatherer(a, n.usingBundle));
					var d = e.RTCRtpSender.getCapabilities(s);
					t < 15019 && (d.codecs = d.codecs.filter(function(e) {
						return "rtx" !== e.name
					})), d.codecs.forEach(function(e) {
						"H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), i.remoteCapabilities && i.remoteCapabilities.codecs && i.remoteCapabilities.codecs.forEach(function(t) {
							e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
						})
					}), d.headerExtensions.forEach(function(e) {
						(i.remoteCapabilities && i.remoteCapabilities.headerExtensions || []).forEach(function(t) {
							e.uri === t.uri && (e.id = t.id)
						})
					});
					var u = i.sendEncodingParameters || [{
						ssrc: 1001 * (2 * a + 1)
					}];
					o && t >= 15019 && "video" === s && !u[0].rtx && (u[0].rtx = {
						ssrc: u[0].ssrc + 1
					}), i.wantReceive && (i.rtpReceiver = new e.RTCRtpReceiver(i.dtlsTransport, s)), i.localCapabilities = d, i.sendEncodingParameters = u
				}), "max-compat" !== n._config.bundlePolicy && (d += "a=group:BUNDLE " + n.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n"), d += "a=ice-options:trickle\r\n", n.transceivers.forEach(function(e, t) {
					d += i(e, e.localCapabilities, "offer", e.stream, n._dtlsRole), d += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
						e.component = 1, d += "a=" + r.writeCandidate(e) + "\r\n"
					}), "completed" === e.iceGatherer.state && (d += "a=end-of-candidates\r\n"))
				});
				var u = new e.RTCSessionDescription({
					type: "offer",
					sdp: d
				});
				return Promise.resolve(u)
			}, u.prototype.createAnswer = function() {
				var n = this;
				if(n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
				if("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
				var o = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
				n.usingBundle && (o += "a=group:BUNDLE " + n.transceivers.map(function(e) {
					return e.mid
				}).join(" ") + "\r\n");
				var s = r.getMediaSections(n._remoteDescription.sdp).length;
				n.transceivers.forEach(function(e, r) {
					if(!(r + 1 > s)) {
						if(e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? o += "m=application 0 DTLS/SCTP 5000\r\n" : o += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? o += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (o += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(o += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
						var c;
						if(e.stream) "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
							ssrc: e.sendEncodingParameters[0].ssrc + 1
						});
						var d = a(e.localCapabilities, e.remoteCapabilities);
						!d.codecs.filter(function(e) {
							return "rtx" === e.name.toLowerCase()
						}).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, o += i(e, d, "answer", e.stream, n._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (o += "a=rtcp-rsize\r\n")
					}
				});
				var d = new e.RTCSessionDescription({
					type: "answer",
					sdp: o
				});
				return Promise.resolve(d)
			}, u.prototype.addIceCandidate = function(e) {
				var t, n = this;
				return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(i, a) {
					if(!n._remoteDescription) return a(c("InvalidStateError", "Can not add ICE candidate without a remote description"));
					if(e && "" !== e.candidate) {
						var o = e.sdpMLineIndex;
						if(e.sdpMid)
							for(var d = 0; d < n.transceivers.length; d++)
								if(n.transceivers[d].mid === e.sdpMid) {
									o = d;
									break
								}
						var u = n.transceivers[o];
						if(!u) return a(c("OperationError", "Can not add ICE candidate"));
						if(u.rejected) return i();
						var l = Object.keys(e.candidate).length > 0 ? r.parseCandidate(e.candidate) : {};
						if("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return i();
						if(l.component && 1 !== l.component) return i();
						if((0 === o || o > 0 && u.iceTransport !== n.transceivers[0].iceTransport) && !s(u.iceTransport, l)) return a(c("OperationError", "Can not add ICE candidate"));
						var p = e.candidate.trim();
						0 === p.indexOf("a=") && (p = p.substr(2)), (t = r.getMediaSections(n._remoteDescription.sdp))[o] += "a=" + (l.type ? p : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join("")
					} else
						for(var f = 0; f < n.transceivers.length && (n.transceivers[f].rejected || (n.transceivers[f].iceTransport.addRemoteCandidate({}), (t = r.getMediaSections(n._remoteDescription.sdp))[f] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join(""), !n.usingBundle)); f++);
					i()
				})
			}, u.prototype.getStats = function(t) {
				if(t && t instanceof e.MediaStreamTrack) {
					var n = null;
					if(this.transceivers.forEach(function(e) {
							e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
						}), !n) throw c("InvalidAccessError", "Invalid selector.");
					return n.getStats()
				}
				var r = [];
				return this.transceivers.forEach(function(e) {
					["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
						e[t] && r.push(e[t].getStats())
					})
				}), Promise.all(r).then(function(e) {
					var t = new Map;
					return e.forEach(function(e) {
						e.forEach(function(e) {
							t.set(e.id, e)
						})
					}), t
				})
			};
			["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
				var n = e[t];
				if(n && n.prototype && n.prototype.getStats) {
					var r = n.prototype.getStats;
					n.prototype.getStats = function() {
						return r.apply(this).then(function(e) {
							var t = new Map;
							return Object.keys(e).forEach(function(n) {
								var r;
								e[n].type = {
									inboundrtp: "inbound-rtp",
									outboundrtp: "outbound-rtp",
									candidatepair: "candidate-pair",
									localcandidate: "local-candidate",
									remotecandidate: "remote-candidate"
								}[(r = e[n]).type] || r.type, t.set(n, e[n])
							}), t
						})
					}
				}
			});
			var l = ["createOffer", "createAnswer"];
			return l.forEach(function(e) {
				var t = u.prototype[e];
				u.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
						"function" == typeof e[0] && e[0].apply(null, [t])
					}, function(t) {
						"function" == typeof e[1] && e[1].apply(null, [t])
					}) : t.apply(this, arguments)
				}
			}), (l = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
				var t = u.prototype[e];
				u.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
						"function" == typeof e[1] && e[1].apply(null)
					}, function(t) {
						"function" == typeof e[2] && e[2].apply(null, [t])
					}) : t.apply(this, arguments)
				}
			}), ["getStats"].forEach(function(e) {
				var t = u.prototype[e];
				u.prototype[e] = function() {
					var e = arguments;
					return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
						"function" == typeof e[1] && e[1].apply(null)
					}) : t.apply(this, arguments)
				}
			}), u
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = n(285);
		e.exports = {
			shimGetUserMedia: n(283),
			shimPeerConnection: function(e) {
				var t = r.detectBrowser(e);
				if(e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
						return e
					}), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
						return e
					}), t.version < 15025)) {
					var n = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
					Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
						set: function(e) {
							n.set.call(this, e);
							var t = new Event("enabled");
							t.enabled = e, this.dispatchEvent(t)
						}
					})
				}!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
					get: function() {
						return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
					}
				}), e.RTCPeerConnection = i(e, t.version)
			},
			shimReplaceTrack: function(e) {
				!e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = r.log;
		e.exports = function(e) {
			var t = r.detectBrowser(e),
				n = e && e.navigator,
				a = function(e) {
					if("object" != typeof e || e.mandatory || e.optional) return e;
					var t = {};
					return Object.keys(e).forEach(function(n) {
						if("require" !== n && "advanced" !== n && "mediaSource" !== n) {
							var r = "object" == typeof e[n] ? e[n] : {
								ideal: e[n]
							};
							void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
							var i = function(e, t) {
								return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
							};
							if(void 0 !== r.ideal) {
								t.optional = t.optional || [];
								var a = {};
								"number" == typeof r.ideal ? (a[i("min", n)] = r.ideal, t.optional.push(a), (a = {})[i("max", n)] = r.ideal, t.optional.push(a)) : (a[i("", n)] = r.ideal, t.optional.push(a))
							}
							void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function(e) {
								void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
							})
						}
					}), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
				},
				o = function(e, r) {
					if(t.version >= 61) return r(e);
					if((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
						var o = function(e, t, n) {
							t in e && !(n in e) && (e[n] = e[t], delete e[t])
						};
						o((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), o(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = a(e.audio)
					}
					if(e && "object" == typeof e.video) {
						var s = e.video.facingMode;
						s = s && ("object" == typeof s ? s : {
							ideal: s
						});
						var c, d = t.version < 66;
						if(s && ("user" === s.exact || "environment" === s.exact || "user" === s.ideal || "environment" === s.ideal) && (!n.mediaDevices.getSupportedConstraints || !n.mediaDevices.getSupportedConstraints().facingMode || d))
							if(delete e.video.facingMode, "environment" === s.exact || "environment" === s.ideal ? c = ["back", "rear"] : "user" !== s.exact && "user" !== s.ideal || (c = ["front"]), c) return n.mediaDevices.enumerateDevices().then(function(t) {
								var n = (t = t.filter(function(e) {
									return "videoinput" === e.kind
								})).find(function(e) {
									return c.some(function(t) {
										return -1 !== e.label.toLowerCase().indexOf(t)
									})
								});
								return !n && t.length && -1 !== c.indexOf("back") && (n = t[t.length - 1]), n && (e.video.deviceId = s.exact ? {
									exact: n.deviceId
								} : {
									ideal: n.deviceId
								}), e.video = a(e.video), i("chrome: " + JSON.stringify(e)), r(e)
							});
						e.video = a(e.video)
					}
					return i("chrome: " + JSON.stringify(e)), r(e)
				},
				s = function(e) {
					return {
						name: {
							PermissionDeniedError: "NotAllowedError",
							InvalidStateError: "NotReadableError",
							DevicesNotFoundError: "NotFoundError",
							ConstraintNotSatisfiedError: "OverconstrainedError",
							TrackStartError: "NotReadableError",
							MediaDeviceFailedDueToShutdown: "NotReadableError",
							MediaDeviceKillSwitchOn: "NotReadableError"
						}[e.name] || e.name,
						message: e.message,
						constraint: e.constraintName,
						toString: function() {
							return this.name + (this.message && ": ") + this.message
						}
					}
				};
			n.getUserMedia = function(e, t, r) {
				o(e, function(e) {
					n.webkitGetUserMedia(e, t, function(e) {
						r && r(s(e))
					})
				})
			};
			var c = function(e) {
				return new Promise(function(t, r) {
					n.getUserMedia(e, t, r)
				})
			};
			if(n.mediaDevices || (n.mediaDevices = {
					getUserMedia: c,
					enumerateDevices: function() {
						return new Promise(function(t) {
							var n = {
								audio: "audioinput",
								video: "videoinput"
							};
							return e.MediaStreamTrack.getSources(function(e) {
								t(e.map(function(e) {
									return {
										label: e.label,
										kind: n[e.kind],
										deviceId: e.id,
										groupId: ""
									}
								}))
							})
						})
					},
					getSupportedConstraints: function() {
						return {
							deviceId: !0,
							echoCancellation: !0,
							facingMode: !0,
							frameRate: !0,
							height: !0,
							width: !0
						}
					}
				}), n.mediaDevices.getUserMedia) {
				var d = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
				n.mediaDevices.getUserMedia = function(e) {
					return o(e, function(e) {
						return d(e).then(function(t) {
							if(e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
								e.stop()
							}), new DOMException("", "NotFoundError");
							return t
						}, function(e) {
							return Promise.reject(s(e))
						})
					})
				}
			} else n.mediaDevices.getUserMedia = function(e) {
				return c(e)
			};
			void 0 === n.mediaDevices.addEventListener && (n.mediaDevices.addEventListener = function() {
				i("Dummy mediaDevices.addEventListener called.")
			}), void 0 === n.mediaDevices.removeEventListener && (n.mediaDevices.removeEventListener = function() {
				i("Dummy mediaDevices.removeEventListener called.")
			})
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69),
			i = r.log,
			a = {
				shimMediaStream: function(e) {
					e.MediaStream = e.MediaStream || e.webkitMediaStream
				},
				shimOnTrack: function(e) {
					if("object" == typeof e && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
						Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
							get: function() {
								return this._ontrack
							},
							set: function(e) {
								this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e)
							}
						});
						var t = e.RTCPeerConnection.prototype.setRemoteDescription;
						e.RTCPeerConnection.prototype.setRemoteDescription = function() {
							var n = this;
							return n._ontrackpoly || (n._ontrackpoly = function(t) {
								t.stream.addEventListener("addtrack", function(r) {
									var i;
									i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
										return e.track && e.track.id === r.track.id
									}) : {
										track: r.track
									};
									var a = new Event("track");
									a.track = r.track, a.receiver = i, a.transceiver = {
										receiver: i
									}, a.streams = [t.stream], n.dispatchEvent(a)
								}), t.stream.getTracks().forEach(function(r) {
									var i;
									i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
										return e.track && e.track.id === r.id
									}) : {
										track: r
									};
									var a = new Event("track");
									a.track = r, a.receiver = i, a.transceiver = {
										receiver: i
									}, a.streams = [t.stream], n.dispatchEvent(a)
								})
							}, n.addEventListener("addstream", n._ontrackpoly)), t.apply(n, arguments)
						}
					}
				},
				shimGetSendersWithDtmf: function(e) {
					if("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
						var t = function(e, t) {
							return {
								track: t,
								get dtmf() {
									return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf
								},
								_pc: e
							}
						};
						if(!e.RTCPeerConnection.prototype.getSenders) {
							e.RTCPeerConnection.prototype.getSenders = function() {
								return this._senders = this._senders || [], this._senders.slice()
							};
							var n = e.RTCPeerConnection.prototype.addTrack;
							e.RTCPeerConnection.prototype.addTrack = function(e, r) {
								var i = n.apply(this, arguments);
								return i || (i = t(this, e), this._senders.push(i)), i
							};
							var r = e.RTCPeerConnection.prototype.removeTrack;
							e.RTCPeerConnection.prototype.removeTrack = function(e) {
								r.apply(this, arguments);
								var t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
							}
						}
						var i = e.RTCPeerConnection.prototype.addStream;
						e.RTCPeerConnection.prototype.addStream = function(e) {
							var n = this;
							n._senders = n._senders || [], i.apply(n, [e]), e.getTracks().forEach(function(e) {
								n._senders.push(t(n, e))
							})
						};
						var a = e.RTCPeerConnection.prototype.removeStream;
						e.RTCPeerConnection.prototype.removeStream = function(e) {
							var t = this;
							t._senders = t._senders || [], a.apply(t, [e]), e.getTracks().forEach(function(e) {
								var n = t._senders.find(function(t) {
									return t.track === e
								});
								n && t._senders.splice(t._senders.indexOf(n), 1)
							})
						}
					} else if("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
						var o = e.RTCPeerConnection.prototype.getSenders;
						e.RTCPeerConnection.prototype.getSenders = function() {
							var e = this,
								t = o.apply(e, []);
							return t.forEach(function(t) {
								t._pc = e
							}), t
						}, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
							get: function() {
								return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf
							}
						})
					}
				},
				shimSourceObject: function(e) {
					var t = e && e.URL;
					"object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
						get: function() {
							return this._srcObject
						},
						set: function(e) {
							var n = this;
							this._srcObject = e, this.src && t.revokeObjectURL(this.src), e ? (this.src = t.createObjectURL(e), e.addEventListener("addtrack", function() {
								n.src && t.revokeObjectURL(n.src), n.src = t.createObjectURL(e)
							}), e.addEventListener("removetrack", function() {
								n.src && t.revokeObjectURL(n.src), n.src = t.createObjectURL(e)
							})) : this.src = ""
						}
					}))
				},
				shimAddTrackRemoveTrack: function(e) {
					var t = r.detectBrowser(e);
					if(!(e.RTCPeerConnection.prototype.addTrack && t.version >= 64)) {
						var n = e.RTCPeerConnection.prototype.getLocalStreams;
						e.RTCPeerConnection.prototype.getLocalStreams = function() {
							var e = this,
								t = n.apply(this);
							return e._reverseStreams = e._reverseStreams || {}, t.map(function(t) {
								return e._reverseStreams[t.id]
							})
						};
						var i = e.RTCPeerConnection.prototype.addStream;
						e.RTCPeerConnection.prototype.addStream = function(t) {
							var n = this;
							if(n._streams = n._streams || {}, n._reverseStreams = n._reverseStreams || {}, t.getTracks().forEach(function(e) {
									if(n.getSenders().find(function(t) {
											return t.track === e
										})) throw new DOMException("Track already exists.", "InvalidAccessError")
								}), !n._reverseStreams[t.id]) {
								var r = new e.MediaStream(t.getTracks());
								n._streams[t.id] = r, n._reverseStreams[r.id] = t, t = r
							}
							i.apply(n, [t])
						};
						var a = e.RTCPeerConnection.prototype.removeStream;
						e.RTCPeerConnection.prototype.removeStream = function(e) {
							var t = this;
							t._streams = t._streams || {}, t._reverseStreams = t._reverseStreams || {}, a.apply(t, [t._streams[e.id] || e]), delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id], delete t._streams[e.id]
						}, e.RTCPeerConnection.prototype.addTrack = function(t, n) {
							var r = this;
							if("closed" === r.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
							var i = [].slice.call(arguments, 1);
							if(1 !== i.length || !i[0].getTracks().find(function(e) {
									return e === t
								})) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
							if(r.getSenders().find(function(e) {
									return e.track === t
								})) throw new DOMException("Track already exists.", "InvalidAccessError");
							r._streams = r._streams || {}, r._reverseStreams = r._reverseStreams || {};
							var a = r._streams[n.id];
							if(a) a.addTrack(t), Promise.resolve().then(function() {
								r.dispatchEvent(new Event("negotiationneeded"))
							});
							else {
								var o = new e.MediaStream([t]);
								r._streams[n.id] = o, r._reverseStreams[o.id] = n, r.addStream(o)
							}
							return r.getSenders().find(function(e) {
								return e.track === t
							})
						}, ["createOffer", "createAnswer"].forEach(function(t) {
							var n = e.RTCPeerConnection.prototype[t];
							e.RTCPeerConnection.prototype[t] = function() {
								var e = this,
									t = arguments;
								return arguments.length && "function" == typeof arguments[0] ? n.apply(e, [function(n) {
									var r = c(e, n);
									t[0].apply(null, [r])
								}, function(e) {
									t[1] && t[1].apply(null, e)
								}, arguments[2]]) : n.apply(e, arguments).then(function(t) {
									return c(e, t)
								})
							}
						});
						var o = e.RTCPeerConnection.prototype.setLocalDescription;
						e.RTCPeerConnection.prototype.setLocalDescription = function() {
							return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
								var n = t.sdp;
								return Object.keys(e._reverseStreams || []).forEach(function(t) {
									var r = e._reverseStreams[t],
										i = e._streams[r.id];
									n = n.replace(new RegExp(r.id, "g"), i.id)
								}), new RTCSessionDescription({
									type: t.type,
									sdp: n
								})
							}(this, arguments[0]), o.apply(this, arguments)) : o.apply(this, arguments)
						};
						var s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
						Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
							get: function() {
								var e = s.get.apply(this);
								return "" === e.type ? e : c(this, e)
							}
						}), e.RTCPeerConnection.prototype.removeTrack = function(e) {
							var t, n = this;
							if("closed" === n.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
							if(!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
							if(!(e._pc === n)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
							n._streams = n._streams || {}, Object.keys(n._streams).forEach(function(r) {
								n._streams[r].getTracks().find(function(t) {
									return e.track === t
								}) && (t = n._streams[r])
							}), t && (1 === t.getTracks().length ? n.removeStream(n._reverseStreams[t.id]) : t.removeTrack(e.track), n.dispatchEvent(new Event("negotiationneeded")))
						}
					}

					function c(e, t) {
						var n = t.sdp;
						return Object.keys(e._reverseStreams || []).forEach(function(t) {
							var r = e._reverseStreams[t],
								i = e._streams[r.id];
							n = n.replace(new RegExp(i.id, "g"), r.id)
						}), new RTCSessionDescription({
							type: t.type,
							sdp: n
						})
					}
				},
				shimPeerConnection: function(e) {
					var t = r.detectBrowser(e);
					if(e.RTCPeerConnection) {
						var n = e.RTCPeerConnection;
						e.RTCPeerConnection = function(e, t) {
							if(e && e.iceServers) {
								for(var i = [], a = 0; a < e.iceServers.length; a++) {
									var o = e.iceServers[a];
									!o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (r.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, i.push(o)) : i.push(e.iceServers[a])
								}
								e.iceServers = i
							}
							return new n(e, t)
						}, e.RTCPeerConnection.prototype = n.prototype, Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
							get: function() {
								return n.generateCertificate
							}
						})
					} else e.RTCPeerConnection = function(t, n) {
						return i("PeerConnection"), t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy), new e.webkitRTCPeerConnection(t, n)
					}, e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype, e.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
						get: function() {
							return e.webkitRTCPeerConnection.generateCertificate
						}
					});
					var a = e.RTCPeerConnection.prototype.getStats;
					e.RTCPeerConnection.prototype.getStats = function(e, t, n) {
						var r = this,
							i = arguments;
						if(arguments.length > 0 && "function" == typeof e) return a.apply(this, arguments);
						if(0 === a.length && (0 === arguments.length || "function" != typeof arguments[0])) return a.apply(this, []);
						var o = function(e) {
								var t = {};
								return e.result().forEach(function(e) {
									var n = {
										id: e.id,
										timestamp: e.timestamp,
										type: {
											localcandidate: "local-candidate",
											remotecandidate: "remote-candidate"
										}[e.type] || e.type
									};
									e.names().forEach(function(t) {
										n[t] = e.stat(t)
									}), t[n.id] = n
								}), t
							},
							s = function(e) {
								return new Map(Object.keys(e).map(function(t) {
									return [t, e[t]]
								}))
							};
						if(arguments.length >= 2) {
							return a.apply(this, [function(e) {
								i[1](s(o(e)))
							}, arguments[0]])
						}
						return new Promise(function(e, t) {
							a.apply(r, [function(t) {
								e(s(o(t)))
							}, t])
						}).then(t, n)
					}, t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
						var n = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							var e = arguments,
								t = this,
								r = new Promise(function(r, i) {
									n.apply(t, [e[0], r, i])
								});
							return e.length < 2 ? r : r.then(function() {
								e[1].apply(null, [])
							}, function(t) {
								e.length >= 3 && e[2].apply(null, [t])
							})
						}
					}), t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
						var n = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							var e = this;
							if(arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
								var t = 1 === arguments.length ? arguments[0] : void 0;
								return new Promise(function(r, i) {
									n.apply(e, [r, i, t])
								})
							}
							return n.apply(this, arguments)
						}
					}), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
						var n = e.RTCPeerConnection.prototype[t];
						e.RTCPeerConnection.prototype[t] = function() {
							return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
						}
					});
					var o = e.RTCPeerConnection.prototype.addIceCandidate;
					e.RTCPeerConnection.prototype.addIceCandidate = function() {
						return arguments[0] ? o.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
					}
				}
			};
		e.exports = {
			shimMediaStream: a.shimMediaStream,
			shimOnTrack: a.shimOnTrack,
			shimAddTrackRemoveTrack: a.shimAddTrackRemoveTrack,
			shimGetSendersWithDtmf: a.shimGetSendersWithDtmf,
			shimSourceObject: a.shimSourceObject,
			shimPeerConnection: a.shimPeerConnection,
			shimGetUserMedia: n(287)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(69);
		e.exports = function(e, t) {
			var i = e && e.window,
				a = {
					shimChrome: !0,
					shimFirefox: !0,
					shimEdge: !0,
					shimSafari: !0
				};
			for(var o in t) hasOwnProperty.call(t, o) && (a[o] = t[o]);
			var s = r.log,
				c = r.detectBrowser(i),
				d = {
					browserDetails: c,
					extractVersion: r.extractVersion,
					disableLog: r.disableLog,
					disableWarnings: r.disableWarnings
				},
				u = n(288) || null,
				l = n(286) || null,
				p = n(282) || null,
				f = n(280) || null,
				h = n(279) || null;
			switch(c.browser) {
				case "chrome":
					if(!u || !u.shimPeerConnection || !a.shimChrome) return s("Chrome shim is not included in this adapter release."), d;
					s("adapter.js shimming chrome."), d.browserShim = u, h.shimCreateObjectURL(i), u.shimGetUserMedia(i), u.shimMediaStream(i), u.shimSourceObject(i), u.shimPeerConnection(i), u.shimOnTrack(i), u.shimAddTrackRemoveTrack(i), u.shimGetSendersWithDtmf(i), h.shimRTCIceCandidate(i);
					break;
				case "firefox":
					if(!p || !p.shimPeerConnection || !a.shimFirefox) return s("Firefox shim is not included in this adapter release."), d;
					s("adapter.js shimming firefox."), d.browserShim = p, h.shimCreateObjectURL(i), p.shimGetUserMedia(i), p.shimSourceObject(i), p.shimPeerConnection(i), p.shimOnTrack(i), p.shimRemoveStream(i), h.shimRTCIceCandidate(i);
					break;
				case "edge":
					if(!l || !l.shimPeerConnection || !a.shimEdge) return s("MS edge shim is not included in this adapter release."), d;
					s("adapter.js shimming edge."), d.browserShim = l, h.shimCreateObjectURL(i), l.shimGetUserMedia(i), l.shimPeerConnection(i), l.shimReplaceTrack(i);
					break;
				case "safari":
					if(!f || !a.shimSafari) return s("Safari shim is not included in this adapter release."), d;
					s("adapter.js shimming safari."), d.browserShim = f, h.shimCreateObjectURL(i), f.shimRTCIceServerUrls(i), f.shimCallbacksAPI(i), f.shimLocalStreamsAPI(i), f.shimRemoteStreamsAPI(i), f.shimTrackEventTransceiver(i), f.shimGetUserMedia(i), f.shimCreateOfferLegacy(i), h.shimRTCIceCandidate(i);
					break;
				default:
					s("Unsupported browser!")
			}
			return d
		}
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			var r = n(289);
			e.exports = r({
				window: t.window
			})
		}).call(this, n(30))
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(123);
		Object.defineProperty(t, "AbstractWebRTC", {
			enumerable: !0,
			get: function() {
				return r.AbstractWebRTC
			}
		});
		var i = n(181);
		Object.defineProperty(t, "RELEASE_VERSION_MAP", {
			enumerable: !0,
			get: function() {
				return i.RELEASE_VERSION_MAP
			}
		}), Object.defineProperty(t, "isMatchVersion", {
			enumerable: !0,
			get: function() {
				return i.isMatchVersion
			}
		}), Object.defineProperty(t, "maxVersion", {
			enumerable: !0,
			get: function() {
				return i.maxVersion
			}
		});
		var a = n(277);
		Object.defineProperty(t, "WebRTCBuilder", {
			enumerable: !0,
			get: function() {
				return a.WebRTCBuilder
			}
		});
		var o = n(180);
		Object.defineProperty(t, "WebRTC4ChromeRelease", {
			enumerable: !0,
			get: function() {
				return o.WebRTC4ChromeRelease
			}
		});
		var s = n(179);
		Object.defineProperty(t, "WebRTC4FirefoxRelease", {
			enumerable: !0,
			get: function() {
				return s.WebRTC4FirefoxRelease
			}
		});
		var c = n(178);
		Object.defineProperty(t, "WebRTC4SafariRelease", {
			enumerable: !0,
			get: function() {
				return c.WebRTC4SafariRelease
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCBusiness = void 0;
		var r = l(n(1)),
			i = l(n(4)),
			a = l(n(3)),
			o = l(n(2)),
			s = n(124),
			c = l(n(21)),
			d = n(291),
			u = (function(e) {
				if(e && e.__esModule) return e;
				var t = {};
				if(null != e)
					for(var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
				t.default = e
			}(n(112)), n(22));

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = n(5),
			f = p.info.nrtcSdkVersion,
			h = p.info.version,
			m = function(e) {
				function t(e) {
					(0, r.default)(this, t);
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this.adapterRef = null, this.sdkRef = null, this.selfWebRtcInstance = null, this.remoteWebRtcInstanceMap = {}
					}
				}, {
					key: "_createWebRTCInstance",
					value: function(e) {
						return new d.WebRTCBuilder({
							imInfo: this.adapterRef.imInfo,
							adapterRef: this.adapterRef,
							targetUid: e,
							platformName: c.default.name,
							platformVersion: c.default.version
						}).build()
					}
				}, {
					key: "createSelfWebRTCInstance",
					value: function() {
						var e = this._createWebRTCInstance(this.adapterRef.imInfo.uid);
						return this.selfWebRtcInstance = e, this._bindWebRTCEvent(e), e
					}
				}, {
					key: "_destroyRtcSelf",
					value: function() {
						var e = this.selfWebRtcInstance;
						e ? (e.close(), this.selfWebRtcInstance = null) : WEBRTCLOG.log("local rtc 为空，已被提前关闭")
					}
				}, {
					key: "_destroyRtcByUid",
					value: function(e) {
						var t = this.remoteWebRtcInstanceMap[e];
						t ? (t.close(), clearInterval(t.reConnectTimer), delete this.remoteWebRtcInstanceMap[e]) : WEBRTCLOG.log("remote rtc 为空，已被提前关闭")
					}
				}, {
					key: "createRemoteWebRTCInstance",
					value: function(e) {
						var t = this._createWebRTCInstance(e);
						return this.remoteWebRtcInstanceMap[e] = t, this._bindWebRTCEvent(t), t
					}
				}, {
					key: "_bindWebRTCEvent",
					value: function(e) {
						e.on("ready", this._handleReadyEvent4WebRTC.bind(this)), e.on("iceCandidate", this._handleIceCandidateEvent4WebRTC.bind(this)), e.on("iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.on("negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.on("iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.on("iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.on("getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
					}
				}, {
					key: "_unbindWebRTCEvent",
					value: function(e) {
						e.removeListener("ready", this._handleReadyEvent4WebRTC.bind(this)), e.removeListener("iceCandidate", this._handleIceCandidateEvent4WebRTC.bind(this)), e.removeListener("iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.removeListener("negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.removeListener("iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.removeListener("iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.removeListener("getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
					}
				}, {
					key: "_handleReadyEvent4WebRTC",
					value: function(e) {}
				}, {
					key: "_handleIceCandidateEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleIceCandidateEvent4WebRTC event: %o", e);
						var t = e.uid,
							n = e.ice;
						/\d tcp \d/gi.test(n.candidate) ? WEBRTCLOG.warn("tcp candidate 忽略 ") : this.adapterRef.instance._getWebRTCGateWayManager().doSendIceOffer({
							params: {
								dst_id: t,
								content: n
							}
						})
					}
				}, {
					key: "_handleIceCompletedEvent4WebRTC",
					value: function(e) {
						if(WEBRTCLOG.log("WebRTCBusiness:_handleIceCompletedEvent4WebRTC event: ", e), e) {
							var t = e;
							WEBRTCLOG.log("确保是拉流的updata sdp 触发的");
							var n = this.getRtcObject(t),
								r = this.adapterRef.instance._getVideoHelperByUid(t);
							if(r && n && n.rtcConnection && n.rtcConnection.remoteDescription && n.rtcConnection.remoteDescription.sdp) {
								var i = n.rtcConnection.remoteDescription.sdp;
								if(r.checkRemoteTrack(t, i, n.rtcConnection) && (WEBRTCLOG.log("视频需要检查远程轨道"), r.delayVideoShow(t, !0), r.remoteVideoStream)) {
									var a = r.remoteVideoStream.getVideoTracks()[0];
									this.adapterRef.instance.emit(u.RTC_EVENTS.remoteTrack.key, {
										account: this.adapterRef.instance._getAccountByUid(t),
										uid: t,
										track: a
									})
								}
							}
							this._handleUpdateLog(t, "completed", n)
						}
					}
				}, {
					key: "_handleNegotiationNeededEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleNegotiationNeededEvent4WebRTC event: %o", e)
					}
				}, {
					key: "_handleIceStateChangeEvent4WebRTC",
					value: function(e) {
						if(this.adapterRef.webrtcBusiness) {
							WEBRTCLOG.log("WebRTCBusiness:_handleIceStateChange4WebRTC event: ", e.state);
							var t = e.rtc,
								n = e.state,
								r = t.targetUid;
							if(this.adapterRef.imInfo.netDetect && (WEBRTCLOG.log("重新赋值remoteWebRtcInstanceMap"), this.adapterRef.webrtcBusiness.remoteWebRtcInstanceMap = this.remoteWebRtcInstanceMap), "connected" === n && r == this.adapterRef.imInfo.uid && this.adapterRef.instance.emit(u.RTC_EVENTS.sessionConnected.key), "connected" !== n && "completed" !== n || (t && t.reConnectTimer && (WEBRTCLOG.warn("下行重连成功: ", r), clearInterval(t.reConnectTimer), t.reConnectTimer = null), this._doSdpUpdata(t)), "failed" === n) {
								if(WEBRTCLOG.warn("ICE 连接失败: ", r), r == this.adapterRef.imInfo.uid || this.adapterRef.instance._isFirefox()) return void this._doIceFail4Self();
								this._doIceFail4Remote(r)
							}
							"failed" !== n && "completed" !== n || !this.adapterRef.logReportHelper || this._handleUpdateLog(r, n, t)
						}
					}
				}, {
					key: "_handleIceCandidateTimeOutEvent4WebRTC",
					value: function(e) {
						var t = e.rtc,
							n = e.state;
						"completed" !== n && "connected" !== n && "closed" !== n && t && (WEBRTCLOG.log("WebRTCBusiness:_handleGetRemoteStreamEvent4WebRTC event: %o", "中继连接失败开始直连"), "WebRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] ? this.adapterRef.imInfo.serverMap.relayaddrs = null : "NRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] && (this.adapterRef.imInfo.relayaddrs = null), t.close(), t._resetPeerTimeOut(), t._init(), t.targetUid == this.adapterRef.imInfo.uid ? this.adapterRef.instance.judgeSendSdpOfferOrUpdate() : this.adapterRef.webrtcBusiness._createOffer({
							rtc: t
						}))
					}
				}, {
					key: "_handleUpdateLog",
					value: function(e, t, n) {
						if(this.adapterRef.logReportHelper) {
							var r = function(e) {
									var t = {
										audioId: "",
										videoId: "",
										ext: ""
									};
									if(e && e.length) {
										e.map(function(e) {
											e.track && "audio" == e.track.kind ? t.audioId = e.track.id : e.track && "video" == e.track.kind && (t.videoId = e.track.id)
										})
									}
									return t.ext = "", t
								},
								i = {};
							i.uid = this.adapterRef.imInfo && this.adapterRef.imInfo.uid || "", i.remoteUid = e, i.ext = "", i.iceConnection = t, i.localSdp = n.rtcConnection.localDescription.sdp, i.remoteSdp = n.rtcConnection.remoteDescription.sdp, i.locallCECandidates = [], i.remoteICECandidates = [], i.upStream = r(n.rtcConnection.getSenders()), i.downStream = r(n.rtcConnection.getReceivers()), this.adapterRef.logReportHelper.uploadData("peerConnections", i)
						}
					}
				}, {
					key: "_handleGetRemoteStreamEvent4WebRTC",
					value: function(e) {
						WEBRTCLOG.log("WebRTCBusiness:_handleGetRemoteStreamEvent4WebRTC event: %o", e);
						var t = e.uid,
							n = e.stream,
							r = e.track;
						t ? this.adapterRef.instance._doRemoteStream(n, t, r) : WEBRTCLOG.error("未找到远程流的UID...")
					}
				}, {
					key: "_doSdpUpdata",
					value: function(e) {
						var t = e.rtcConnection;
						WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata");
						var n = t.getSenders();
						if(e.targetUid == this.adapterRef.imInfo.uid && n && n.length > 0)
							if(n.length > 1 && n[0].track && n[1] && n[1].track) WEBRTCLOG.log(" --\x3e media type: %s %s", n[0].track.kind, n[1].track.kind);
							else {
								if(!this.adapterRef.instance._isPlayer()) return;
								var r = [],
									i = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
									a = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
									o = i.getLocalAudioStream(),
									s = a.getLocalVideoStream();
								o && r.push(o), s && r.push(s), 2 == r.length && (WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata 上行需要进行sdp协商!"), this.selfWebRtcInstance.updateStream(r), this._createOffer({
									rtc: e
								}))
							}
						else e.isNeedUpdataSdp && (WEBRTCLOG.log("WebRTCBusiness: _doSdpUpdata 下行(%s)需要进行sdp协商!", e.targetUid), e.isNeedUpdataSdp = !1, this._createOffer({
							rtc: e
						}));
						if(e.targetUid != this.adapterRef.imInfo.uid && this.adapterRef.instance._isSafari()) {
							var c = this.adapterRef.instance._getAudioHelperByUid(e.targetUid);
							if(!c || !c.audioDomHelper || void 0 === c.audioDomHelper.audioDom.srcObject) return;
							c.audioDomHelper.audioDom.played.length, WEBRTCLOG.log("rtc.targetUid: ", e.targetUid), this.adapterRef.deviceApi._doStartDevice4PlayRemoteAudio(e.targetUid)
						}
					}
				}, {
					key: "_doIceFail4Self",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness: _doIceFail4Self 自己断开，_onSignalTimeout 开始重连!"), this.adapterRef.reconnectState.isReconnect = !0, this.adapterRef.instance._onSignalTimeout()
					}
				}, {
					key: "_doIceFail4Remote",
					value: function(e) {
						var t = this;
						WEBRTCLOG.log("WebRTCBusiness:_doIceFail4Remote (%s）断开连接了，现在开始进行下行第一次重连...", e);
						var n = this.getRtcObject(e);
						n ? this.adapterRef && this.adapterRef.reconnectState && this.adapterRef.reconnectState.isStoped || this.adapterRef && this.adapterRef.reconnectState && this.adapterRef.reconnectState.startReconnect || (n.reConnectTimer = setInterval(function() {
							n && !n.rtcConnection && t.adapterRef && t.adapterRef.webrtcBusiness ? n.rtcConnection.iceConnectionState || "connected" == n.rtcConnection.iceConnectionState || "completed" == n.rtcConnection.iceConnectionState || "closed" == n.rtcConnection.iceConnectionState ? clearInterval(n.reConnectTimer) : (WEBRTCLOG.warn("(%s)下行第%s重连结束, state: ", e, n.count, n.rtcConnection.iceConnectionState), n.count > 2 && (clearInterval(n.reConnectTimer), WEBRTCLOG.warn("(%s)连接失败，现在清除该下行重连...", e), t.adapterRef.instance.emit(u.RTC_EVENTS.remoteSignalClosed.key, e), t.adapterRef.instance.doClearAfterRemoteLeave(e)), n.count++, t._createOffer({
								rtc: n
							})) : clearInterval(n.reConnectTimer)
						}, 15e3), n.count = 0, n.count++, this._createOffer({
							rtc: n
						})) : WEBRTCLOG.error("WebRTCBusiness:_doIceFail4Remote 不存在的远程rtc对象")
					}
				}, {
					key: "getRtcObject",
					value: function(e) {
						var t = null;
						return t = e == this.adapterRef.imInfo.uid ? this._getSelfWebRtcInstance() : this._getRemoteWebRtcInstance(e), WEBRTCLOG.log("WebRTCBusiness:getRtcObject %s, uid=%s", e == this.adapterRef.imInfo.uid ? "上行" : "下行", e), t
					}
				}, {
					key: "_hasAudio",
					value: function() {
						return this.adapterRef.deviceBusiness ? this.adapterRef.deviceBusiness.hasAudio(this.adapterRef.deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef.state.audioDeviceHasOpened, this.adapterRef.imInfo.role) : (WEBRTCLOG.log("no deviceBusiness"), !1)
					}
				}, {
					key: "_hasVideo",
					value: function() {
						return this.adapterRef.deviceBusiness ? this.adapterRef.deviceBusiness.hasVideo(this.adapterRef.deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef.state.videoDeviceHasOpened, this.adapterRef.state.chromeScreenShareOpened, this.adapterRef.imInfo.role) : (WEBRTCLOG.log("no deviceBusiness"), !1)
					}
				}, {
					key: "_getSelfWebRtcInstance",
					value: function() {
						return this.selfWebRtcInstance
					}
				}, {
					key: "_getRemoteWebRtcInstance",
					value: function(e) {
						return this.remoteWebRtcInstanceMap[e]
					}
				}, {
					key: "_startRTCIfHasDeviceOpened",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:_startRTCIfHasDeviceOpened 如果有本地设备启用则初始化rtc"), this.adapterRef.imInfo.netDetect || this._hasAudio() || this._hasVideo() ? this._initWebRTCInstance4Self(!1, !0) : WEBRTCLOG.log("重连之后，不需要推流")
					}
				}, {
					key: "_initWebRTCInstance4Self",
					value: function() {
						arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
						var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
						if(WEBRTCLOG.log("WebRTCBusiness:_initWebRTCInstance4Self 初始化WebRTC流程管理器 ..."), this.selfWebRtcInstance) return WEBRTCLOG.log("WebRTCBusiness:_initWebRTCInstance4Self 已初始流程管理器，只更新流"), void(e && (this._updateRtcStream(), this._startRtc(!0)));
						this.createSelfWebRTCInstance(), e && (this._updateRtcStream(), this._startRtc(!0))
					}
				}, {
					key: "_updateRtcStream",
					value: function() {
						if(WEBRTCLOG.log("WebRTCBusiness:_updateRtcStream 更新流到RTC中"), this.selfWebRtcInstance) {
							var e = [];
							if(this.adapterRef.instance._isPlayer()) {
								var t = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
									n = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
									r = t.getLocalAudioStream(),
									i = n.getLocalVideoStream();
								r && e.push(r), i && e.push(i)
							}
							this.selfWebRtcInstance.updateStream(e)
						} else WEBRTCLOG.error("WebRTCBusiness:_updateRtcStream 自己的上行webrtc流程管理器实例未创建，无法更新流")
					}
				}, {
					key: "_startRtc",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
						return this._createOffer({
							isUpdate: t
						}).then(function() {
							return new Promise(function(t, n) {
								e.once("sessionConnected", function(n) {
									WEBRTCLOG.log("WebRTCBusiness:_startRtc ===== RTC连接成功...."), e.adapterRef.state.rtcConnected = !0, e.adapterRef.instance._setSessionConfig({
										rtcEndTime: Date.now()
									}), t(n)
								}), e.once("rtcConnectError", function(e) {
									WEBRTCLOG.error("WebRTCBusiness:_startRtc ===== RTC连接失败..."), n(e)
								})
							})
						}).catch(function(e) {
							return WEBRTCLOG.error("WebRTCBusiness:_startRtc 发起上行流失败 error=%o", e), Promise.reject(e)
						})
					}
				}, {
					key: "_createOffer",
					value: function() {
						var e = this,
							t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							n = t.isUpdate,
							r = void 0 !== n && n,
							i = t.rtc,
							a = void 0 === i ? this.selfWebRtcInstance : i;
						return WEBRTCLOG.log("WebRTCBusiness:_createOffer isUpdate=%o", r), a.createOffer().then(function(e) {
							return WEBRTCLOG.log("WebRTCBusiness:_createOffer, 开始设置本地描述..."), a.setLocalDescription(e, r)
						}).then(function(t) {
							WEBRTCLOG.log("WebRTCBusiness:_createOffer 本地描述设置成功, targetUid: ", a.targetUid);
							var n = a.targetUid == e.adapterRef.imInfo.uid,
								i = e.adapterRef.imInfo,
								o = e.adapterRef.imInfo.videoConfig,
								s = e.adapterRef.imInfo.sessionConfig,
								c = {
									params: {
										version: +f,
										token: i.token || i.cid + "",
										user_type: i.token ? 3 : 2,
										user_token_type: 0,
										content: t,
										dst_id: n ? i.uid : a.targetUid,
										is_multi_peerconnection: !0,
										sdk_version: h
									}
								};
							if(n) {
								var d = !!e.adapterRef.imInfo.netDetect || e._hasAudio(),
									u = !!e.adapterRef.imInfo.netDetect || e._hasVideo();
								WEBRTCLOG.log("WebRTCBusiness:_createOffer  hasAudio: %s, hasVideo: %s ", d, u), c.hasAudio = d, c.hasVideo = u, c.params.streamSetting = {
									video: {
										width: e.adapterRef.state.chromeScreenShareOpened ? 1280 : o.width,
										height: e.adapterRef.state.chromeScreenShareOpened ? 720 : o.height,
										frameRate: e.adapterRef.state.chromeScreenShareOpened ? 5 : s.liveEnable && o.frameRate > 15 ? 15 : o.frameRate
									}
								}
							}
							r ? e.adapterRef.instance._getWebRTCGateWayManager().doSendSdpUpdate(c) : e.adapterRef.instance._getWebRTCGateWayManager().doSendSdpOffer(c)
						})
					}
				}, {
					key: "doClientJoin",
					value: function(e) {
						if(WEBRTCLOG.log("AbstractAdapter: _onclient_join: ===== 人员加入，创建下行流..."), this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(e)) return WEBRTCLOG.log("AbstractAdapter: _onclient_join: 已存在远程rtc实例，即将执行_onclient_update"), this.doClientUpdate(e, !0);
						var t = this.adapterRef.webrtcBusiness.createRemoteWebRTCInstance(e);
						if(!this.adapterRef.imInfo.netDetect) {
							var n = this.adapterRef.instance._getAudioHelperByUid(e),
								r = this.adapterRef.instance._getVideoHelperByUid(e);
							r.setVideoContainer(this.adapterRef.remoteContainer), r.isJoined = !0, r.setRTC(t), n.setRTC(t)
						}
						this._createOffer({
							rtc: t
						})
					}
				}, {
					key: "doClientUpdate",
					value: function(e, t) {
						if(WEBRTCLOG.log("WebRTCBusiness:doClientUpdate uid=%o, hasVideo=%o", e, t), !this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(e)) return WEBRTCLOG.log("WebRTCBusiness: doClientUpdate: 不存在远程rtc实例，即将执行doClientJoin"), this.doClientJoin(e);
						var n = this.getRtcObject(e);
						n ? 1 == t ? n.rtcConnection && n.rtcConnection.localDescription && n.rtcConnection.iceConnectionState && "connected" !== n.rtcConnection.iceConnectionState && "completed" !== n.rtcConnection.iceConnectionState ? (WEBRTCLOG.warn("create rtc later"), n.isNeedUpdataSdp = !0) : this._createOffer({
							rtc: n
						}) : this.adapterRef.instance._getVideoHelperByUid(e).delayVideoShow(e, t) : WEBRTCLOG.error("WebRTCBusiness:doClientUpdate 不存在的远程rtc对象")
					}
				}, {
					key: "switchTrackEvent",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							t = e.stream,
							n = e.uid,
							r = e.bindTrackEvent,
							i = void 0 === r || r;
						WEBRTCLOG.log("WebRTCBusiness:switchTrackEvent stream=%o, uid=%o, bindTrackEvent=%o", t, n, i), t && n ? i ? this._doBindTrackEvent(e) : this._doUnBindTrackEvent(e) : WEBRTCLOG.error("WebRTCBusiness:switchTrackEvent 不存在的流或uid")
					}
				}, {
					key: "_doUnBindTrackEvent",
					value: function(e) {
						var t = e.stream,
							n = e.uid;
						WEBRTCLOG.log("WebRTCBusiness:_doUnBindTrackEvent 解绑轨道事件 stream=%o, uid=%o", t, n), t.onaddtrack = null, t.onremovetrack = null
					}
				}, {
					key: "_doBindTrackEvent",
					value: function(e) {
						var t = e.stream,
							n = e.uid;
						WEBRTCLOG.log("WebRTCBusiness:_doBindTrackEvent 绑定轨道事件 stream=%o, uid=%o", t, n), t && n ? (t.onaddtrack || this._doRegisterAddTrackEvent(t, n), t.onremovetrack || this._doRegisterRemoveTrackEvent(t, n)) : WEBRTCLOG.error("WebRTCBusiness:_doBindTrackEvent 不存在的流对象或uid")
					}
				}, {
					key: "_doRegisterAddTrackEvent",
					value: function(e, t) {
						var n = this;
						WEBRTCLOG.log("WebRTCBusiness:_doRegisterAddTrackEvent 添加轨道添加事件 stream=%o, uid=%o", e, t), e.onaddtrack = function(e) {
							if(n.adapterRef.imInfo.netDetect) WEBRTCLOG.log("audioHelper:_composeTrack 网络探测直接忽略");
							else {
								n.adapterRef.instance.emit(u.RTC_EVENTS.addTrack.key, e), WEBRTCLOG.log("stream 添加轨道添加事件: ", e);
								var r = e.track;
								if("audio" == r.kind) return n.adapterRef.instance._getAudioHelperByUid(t).composeTrack(t, r), void WEBRTCLOG.warn("WebRTCBusiness:_doRegisterAddTrackEvent 非video直接返回...");
								var i = n.adapterRef.instance._getVideoHelperByUid(t);
								i.composeTrack(t, r), i.setIsRemote(!0);
								var a = n.getRtcObject(t);
								if(n.adapterRef.instance.emit(u.RTC_EVENTS.remoteTrack.key, {
										account: n.adapterRef.instance._getAccountByUid(t),
										uid: t,
										track: r
									}), a.rtcConnection && a.rtcConnection.remoteDescription && a.rtcConnection.remoteDescription.sdp) {
									var o = a.rtcConnection.remoteDescription.sdp;
									i.checkRemoteTrack(t, o)
								}
								i.delayVideoShow(t)
							}
						}
					}
				}, {
					key: "_doRegisterRemoveTrackEvent",
					value: function(e, t) {
						var n = this;
						WEBRTCLOG.log("WebRTCBusiness:_doRegisterRemoveTrackEvent 删除轨道事件 stream=%o, uid=%o", e, t), e.onremovetrack = function(e) {
							var r = e.track.kind;
							if(n.adapterRef.instance.emit(u.RTC_EVENTS.removeTrack.key, e), "audio" !== r) {
								var i = n.adapterRef.instance._getVideoHelperByUid(t);
								i.remoteVideoStream && i.hide()
							} else WEBRTCLOG.warn("WebRTCBusiness:_doRegisterRemoveTrackEvent 非video直接返回...")
						}
					}
				}, {
					key: "_switchRole",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:_switchRole ");
						var e = this.adapterRef.instance._getWebRTCGateWayManager();
						return e && e.state.hasLogined ? this.adapterRef.instance._updateRtc(!0) : (WEBRTCLOG.error("WebRTCBusiness:_switchRole 网关未登录"), Promise.resolve())
					}
				}, {
					key: "_enableDevice",
					value: function(e) {
						return WEBRTCLOG.log("WebRTCBusiness:_enableDevice 设备解禁"), this._switchDeviceTrackStatus(e, !0), Promise.resolve()
					}
				}, {
					key: "_disableDevice",
					value: function(e) {
						return WEBRTCLOG.log("WebRTCBusiness:_disableDevice 设备禁用"), this._switchDeviceTrackStatus(e, !1), Promise.resolve()
					}
				}, {
					key: "_switchDeviceTrackStatus",
					value: function(e, t) {
						var n = [];
						if(e === u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
							var r = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
							r.localAudioStream && (n = r.localAudioStream.getTracks())
						} else {
							var i = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
							i.localVideoStream && (n = i.localVideoStream.getTracks())
						}
						n.map(function(e) {
							e.enabled = t
						})
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCBusiness:destroy: ", this), this.selfWebRtcInstance && (this._unbindWebRTCEvent(this.selfWebRtcInstance), this.selfWebRtcInstance.destroy(), this.selfWebRtcInstance = null);
						var e = this.remoteWebRtcInstanceMap;
						for(var t in e) {
							var n = e[t];
							n && (this._unbindWebRTCEvent(n), n.destroy(), n = null)
						}
					}
				}]), t
			}(s.AbstractBusiness);
		t.WebRTCBusiness = m
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DeviceBusiness = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(156),
			c = n(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), n._initMediaDeviceHelper(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.adapterRef = null, this.sdkRef = null, this.mediaDeviceHelper = null
				}
			}, {
				key: "_initMediaDeviceHelper",
				value: function() {
					WEBRTCLOG.log("DeviceBusiness:_initMediaDeviceHelper 初始化媒体设备管理器 ..."), this.mediaDeviceHelper ? WEBRTCLOG.warn("DeviceBusiness:_initMediaDeviceHelper 已存在的MediaDeviceHelper实例，不重复创建...") : (this.mediaDeviceHelper = new s.MediaDeviceHelper, this._bindDeviceEvent())
				}
			}, {
				key: "_bindDeviceEvent",
				value: function() {
					this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceAdd.key, this._onDeviceAdd.bind(this)), this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceRemove.key, this._onDeviceRemove.bind(this)), this.mediaDeviceHelper.on(c.RTC_EVENTS.deviceStatus.key, this._onDeviceStatus.bind(this))
				}
			}, {
				key: "_unbindDeviceEvent",
				value: function() {
					this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceAdd.key, this._onDeviceAdd.bind(this)), this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceRemove.key, this._onDeviceRemove.bind(this)), this.mediaDeviceHelper.removeListener(c.RTC_EVENTS.deviceStatus.key, this._onDeviceStatus.bind(this))
				}
			}, {
				key: "_onDeviceAdd",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceAdd ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceAdd.key, e)
				}
			}, {
				key: "_onDeviceRemove",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceRemove ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceRemove.key, e)
				}
			}, {
				key: "_onDeviceStatus",
				value: function(e) {
					WEBRTCLOG.log("DeviceBusiness:_onDeviceStatus ", e), this.adapterRef.instance.emit(c.RTC_EVENTS.deviceStatus.key, e)
				}
			}, {
				key: "hasAudio",
				value: function(e, t, n) {
					return WEBRTCLOG.log("DeviceBusiness:hasAudio 检测是否有音频, audioDeviceHasOpened=%o, role=%o", t, n), WEBRTCLOG.log("deviceStatus: ", e), t && n === c.ROLE_FOR_MEETING.ROLE_PLAYER
				}
			}, {
				key: "hasVideo",
				value: function(e, t, n, r) {
					return WEBRTCLOG.log("DeviceBusiness:hasVideo 检测是否有视频, videoDeviceHasOpened=%o, chromeScreenShareOpened=%o, role=%o", t, n, r), n || t && r === c.ROLE_FOR_MEETING.ROLE_PLAYER
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("DeviceBusiness:destroy "), this.mediaDeviceHelper && (this._unbindDeviceEvent(), this.mediaDeviceHelper.destroy(), this.mediaDeviceHelper = null)
				}
			}]), t
		}(n(124).AbstractBusiness);
		t.DeviceBusiness = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayBusiness = void 0;
		var r = p(n(1)),
			i = p(n(4)),
			a = p(n(3)),
			o = p(n(2)),
			s = n(156),
			c = n(124),
			d = p(n(21)),
			u = n(157),
			l = n(22);

		function p(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = n(5),
			h = function(e) {
				function t(e) {
					(0, r.default)(this, t);
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return n._reset(), n.adapterRef = e.adapterRef, n.sdkRef = e.sdkRef, n.detectNetworkResult = null, n
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_reset",
					value: function() {
						this.adapterRef = null, this.sdkRef = null, this.webRTCGateWayManager = null
					}
				}, {
					key: "_onWaitForWssocket",
					value: function() {
						var e = this;
						return WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 等待连接"), new Promise(function(t, n) {
							if(WEBRTCLOG.log("_onWaitForWssocket startReconnect: ", e.adapterRef.reconnectState.startReconnect), !e.adapterRef.reconnectState.startReconnect)
								if(e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket wss已经连接成功");
								else {
									var r = 0;
									e.adapterRef.reconnectState.wssTime && (clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.wssTime = null), e.adapterRef.reconnectState.wssTime = setInterval(function() {
										r++ > 450 && (clearInterval(e.adapterRef.reconnectState.wssTime), WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket wss连接超时"), r = 0, n("wss connect timeout")), e.adapterRef.webrtcGateWayBusiness, e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined ? (WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 连接成功, wssTime: ", e.adapterRef.reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.wssTime = null, t(e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager)) : e.adapterRef.reconnectState.isStoped && (WEBRTCLOG.log("webrtcGateWayBusiness： _onWaitForWssocket 连接失败, wssTime: ", e.adapterRef.reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.wssTime = null, e.adapterRef.reconnectState.isStoped = !1, n("wss connect timeout"))
									}, 200)
								}
						})
					}
				}, {
					key: "doTryInit",
					value: function() {
						var e = this.adapterRef.imInfo,
							t = e.serverMap,
							n = void 0 === t ? {} : t,
							r = e.wssArr;
						WEBRTCLOG.log("WebRTCGateWayBusiness:doTryInit serverMap=%o, wssArr=%o", n, r);
						var i = null;
						if(r = r || n.webrtcarry || [n.webrtc], WEBRTCLOG.log("合并后的wssArr=%o", r), !r || 0 === r.length) {
							var a = "无可用的网关地址(如果当前应用是WebRTC音视频, 请确保对方打开了WebRTC兼容开关)";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:doTryInit msg=%s", a), Promise.reject(a)
						}
						return i = r[0], this.adapterRef.isPrivateDeployment && this.adapterRef.privateDeploymentConf && this.adapterRef.privateDeploymentConf.wssServer && (i = this.adapterRef.privateDeploymentConf.wssServer + "/?" + i.split("/?")[1], f.wssServer = this.adapterRef.privateDeploymentConf.wssServer), this._initWebRTCGateWayManager({
							url: i,
							context: this._transform2WebRTCGateWayContext(this.adapterRef.imInfo),
							keepAliveInterval4Second: 5
						}), this._onWaitForWssocket()
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCGateWayBusiness:destroy");
						var e = this.webRTCGateWayManager;
						e && (this._unbindWebRTCGateWayManagerEvent(e), e.state.hasLogined ? e.doSendLogout({
							params: {
								content: {
									timestamp: Date.now()
								}
							}
						}) : WEBRTCLOG.warn("WebRTCGateWayBusiness:destroy, 没有login，无需logout"), e.destroy(), e = null)
					}
				}, {
					key: "_initWebRTCGateWayManager",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_initWebRTCGateWayManager 初始化网关管理器 ...");
						var t = e.url,
							n = e.context,
							r = e.keepAliveInterval4Second;
						if(null != this.webRTCGateWayManager) {
							var i = "网关管理器【已初始化】，不需要重复操作";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:_initWebRTCGateWayManager msg=%s", i), Promise.reject(i)
						}
						if(null != this.webRTCGateWayManager && this.webRTCGateWayManager.state.hasLogined) {
							var a = "网关管理器【已登录】，不需要重复操作";
							return WEBRTCLOG.error("WebRTCGateWayBusiness:_initWebRTCGateWayManager msg=%s", a), Promise.reject(a)
						}
						this.webRTCGateWayManager = new s.WebRTCGateWayManager({
							url: t,
							context: n,
							keepAliveInterval4Second: r
						}), this._bindWebRTCGateWayManagerEvent(this.webRTCGateWayManager)
					}
				}, {
					key: "_bindWebRTCGateWayManagerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_bindWebRTCGateWayManagerEvent 网关管理器事件绑定 ..."), e.on("error", this._handleErrorEvent.bind(this)), e.on("close", this._handleCloseEvent.bind(this)), e.on("login", this._handleLoginEvent.bind(this)), e.on("sdpAnswer", this._handleSdpAnswerEvent.bind(this)), e.on("iceAnswer", this._handleIceAnswerEvent.bind(this)), e.on("userJoin", this._handleUserJoinEvent.bind(this)), e.on("userUpdate", this._handleUserUpdateEvent.bind(this)), e.on("userLeave", this._handleUserLeaveEvent.bind(this)), e.on("clientError", this._handleClentErrorEvent.bind(this)), e.on("detectNetwork", this._handleDetectNetworkEvent.bind(this))
					}
				}, {
					key: "_unbindWebRTCGateWayManagerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_unbindWebRTCGateWayManagerEvent 网关管理器事件解除绑定 ..."), e.removeListener("error", this._handleErrorEvent.bind(this)), e.removeListener("close", this._handleCloseEvent.bind(this)), e.removeListener("login", this._handleLoginEvent.bind(this)), e.removeListener("sdpAnswer", this._handleSdpAnswerEvent.bind(this)), e.removeListener("iceAnswer", this._handleIceAnswerEvent.bind(this)), e.removeListener("userJoin", this._handleUserJoinEvent.bind(this)), e.removeListener("userUpdate", this._handleUserUpdateEvent.bind(this)), e.removeListener("userLeave", this._handleUserLeaveEvent.bind(this)), e.removeListener("clientError", this._handleClentErrorEvent.bind(this)), e.removeListener("detectNetwork", this._handleDetectNetworkEvent.bind(this))
					}
				}, {
					key: "_onSignalTimeout",
					value: function() {
						var e = this;
						if(!this.adapterRef.reconnectState.isStoped)
							if(this.adapterRef.reconnectState.startReconnect) WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 正在重连中 ...");
							else if(0 == this.adapterRef.reconnectState.count && WEBRTCLOG.warn("webrtcGateWayBusiness： _onSignalTimeout 网络断开了，现在开始重连"), this.adapterRef.reconnectState.isReconnect) {
							if(this.adapterRef.reconnectState.count > 6 && this.adapterRef.webrtcGateWayBusiness && 0 == this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return this.adapterRef.reconnectState.isStoped = !0, WEBRTCLOG.log("_onSignalTimeout 重连次数(%s)超限，不再重连", this.adapterRef.reconnectState.count), void(this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ? (this.adapterRef.instance.emit("hangup", {
								channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
								account: this.adapterRef.instance.getAccount(),
								desc: "Network error",
								type: -1
							}), this.adapterRef.instance.hangup && this.adapterRef.instance.hangup()) : (this.adapterRef.instance.emit("leaveChannel", {
								channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
								account: this.adapterRef.instance.getAccount(),
								desc: "Network error",
								type: -1
							}), this.adapterRef.instance.leaveChannel()));
							this.adapterRef.instance._stopAllDataUpload(), this.adapterRef.reconnectState.count++, WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 第 %s 次重连中", this.adapterRef.reconnectState.count), this.adapterRef.instance._resetParamNeededByReConnect(), this.adapterRef.reconnectState.startReconnect = !0, this.adapterRef.instance._startSession(), this.adapterRef.reconnectState.connectTimer && (clearTimeout(this.adapterRef.reconnectState.connectTimer), this.adapterRef.reconnectState.connectTimer = null), this.adapterRef.reconnectState.connectTimer = setTimeout(function() {
								WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout webrtcGateWayBusiness: ", e.adapterRef.webrtcGateWayBusiness), e.adapterRef.reconnectState.startReconnect = !1;
								(e.adapterRef.webrtcBusiness && e.adapterRef.webrtcBusiness.selfWebRtcInstance && e.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection ? "completed" != e.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState && "connected" != e.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState : e.adapterRef.webrtcGateWayBusiness && 0 == e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) ? (WEBRTCLOG.log("webrtcGateWayBusiness： _onSignalTimeout 第 %s 次重连不成功", e.adapterRef.reconnectState.count), e.adapterRef.reconnectState.isReconnect = !0, e._onSignalTimeout()) : (e.adapterRef.reconnectState.isReconnect = !1, e.adapterRef.reconnectState.count = 0)
							}, 2 * this.adapterRef.reconnectState.count * 1e3)
						}
					}
				}, {
					key: "_handleErrorEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleErrorEvent 网关发生错误，event=%o", e)
					}
				}, {
					key: "_handleCloseEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleCloseEvent 网关关闭，event=%o", e), this.adapterRef && this.adapterRef.webrtcGateWayBusiness && (this.adapterRef.reconnectState.isReconnect = !0, this._onSignalTimeout())
					}
				}, {
					key: "_handleLoginEvent",
					value: function(e) {
						if(WEBRTCLOG.log("WebRTCGateWayBusiness:_handleLoginEvent 网关登录结果, event:", e), !e.success) return WEBRTCLOG.warn("登录失败，断开连接"), void this.emit("signalClosed", {
							code: "login-fail",
							error: "登录失败，断开连接"
						});
						WEBRTCLOG.log("startReconnect: ", this.adapterRef.reconnectState.startReconnect), 1 == this.adapterRef.reconnectState.startReconnect && this.adapterRef.webrtcBusiness && (WEBRTCLOG.log("重连之后，重新推流"), this.adapterRef.reconnectState.startReconnect = !1, this.adapterRef.reconnectState.isReconnect = !1, this.adapterRef.reconnectState.count = 0, this.adapterRef.reconnectState.connectTimer && (clearTimeout(this.adapterRef.reconnectState.connectTimer), this.adapterRef.reconnectState.connectTimer = null), /Firefox/gi.test(navigator.userAgent) ? this._handleReconnect(!0) : this.adapterRef.webrtcBusiness._startRTCIfHasDeviceOpened())
					}
				}, {
					key: "_handleSdpAnswerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleSdpAnswerEvent 收到SDP ANSWER (网关）");
						var t = e.success,
							n = e.code,
							r = e.dst_id,
							i = e.type,
							a = e.sdp;
						if(!t) return WEBRTCLOG.error("SDP ANSWER 非200，断开"), void this.emit("signalClosed", {
							code: n,
							error: "服务器验证不通过，断开连接"
						});
						var o = this.adapterRef.webrtcBusiness.getRtcObject(r);
						WEBRTCLOG.log("当前收到SDP answer 的uid=%s", r), o && o.rtcConnection.signalingState && "have-local-offer" == o.rtcConnection.signalingState && o.setRemoteDescription({
							type: i,
							sdp: a
						}, "answer")
					}
				}, {
					key: "_handleIceAnswerEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleIceAnswerEvent 收到ICE ANSWER (网关） event=%o", e);
						var t = e.dst_id,
							n = {
								candidate: e.candidate,
								sdpMid: e.sdpMid,
								sdpMLineIndex: e.sdpMLineIndex
							},
							r = this.adapterRef.webrtcBusiness.getRtcObject(t);
						r ? r.addRemoteIceCandidate(n) : WEBRTCLOG.error("不存在rtc对象")
					}
				}, {
					key: "_handleUserJoinEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserJoinEvent 信令网关有人加入通知 event=%o", e);
						var t = e.client_id,
							n = {
								uid: t,
								account: this.adapterRef.instance._getAccountByUid(t),
								channelId: this.adapterRef.imInfo.cid
							};
						"NRTC" === l.CONFIG_MAP.SDK_NAME[l.CONFIG_MAP.CURRENT.SDK_TYPE] && "p2p" === this.adapterRef.imInfo.sessionMode && this.adapterRef.instance.setStartSessionTime(), this.adapterRef.instance.emit("joinChannel", n), this.adapterRef.state.isFirstOpenCamera = !0
					}
				}, {
					key: "_handleUserUpdateEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserUpdateEvent 信令网关有人更新通知 event=%o", e);
						var t = e.client_id,
							n = e.has_audio,
							r = e.has_video;
						this.adapterRef.instance.emit("remoteStreamUpdate", {
							uid: t,
							audio: n,
							video: r
						}), 1 == this.adapterRef.instance._getVideoHelperByUid(t).isJoined ? this.adapterRef.webrtcBusiness.doClientUpdate(t, r) : (n || r) && (/Firefox/gi.test(navigator.userAgent) && this.adapterRef.reconnectState ? this._handleReconnect(!1, t) : this.adapterRef.webrtcBusiness.doClientJoin(t))
					}
				}, {
					key: "_handleUserLeaveEvent",
					value: function(e) {
						if(this.adapterRef && this.adapterRef.imInfo) {
							WEBRTCLOG.log("WebRTCGateWayBusiness:_handleUserLeaveEvent %s 离开了...", e.uid);
							var t = e.uid,
								n = e.logout_type;
							n = "normal" === n ? this.sdkRef.HANGUP_TYPE_NORMAL : this.sdkRef.HANGUP_TYPE_TIMEOUT, "p2p" === this.adapterRef.imInfo.sessionMode ? this.adapterRef.instance.emit("hangup", {
								account: this.adapterRef.instance._getAccountByUid(t) || t,
								channelId: this.adapterRef.imInfo.cid,
								type: n
							}) : this.adapterRef.instance.emit("leaveChannel", {
								account: this.adapterRef.instance._getAccountByUid(t) || t,
								channelId: this.adapterRef.imInfo.cid
							}), this.adapterRef.instance.doClearAfterRemoteLeave(t)
						}
					}
				}, {
					key: "_handleClentErrorEvent",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayBusiness:_handleClientErrorEvent 网关反馈错误: ", e);
						var t = e.uid,
							n = e.error_code;
						509 != n && 510 != n && 102 != n && 103 != n && 104 != n && 105 != n && 106 != n || (this.adapterRef.instance.emit("error", {
							code: n,
							desc: "clientError"
						}), this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ? (this.adapterRef.instance.hangup && this.adapterRef.instance.hangup(), this.adapterRef.instance.emit("hangup", {
							channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
							account: this.adapterRef.instance._getAccountByUid(t),
							type: -1,
							code: n
						})) : (this.adapterRef.instance.leaveChannel(), this.adapterRef.instance.emit("leaveChannel", {
							channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
							account: this.adapterRef.instance._getAccountByUid(t),
							code: n
						})))
					}
				}, {
					key: "_handleDetectNetworkEvent",
					value: function(e) {
						if(e) {
							WEBRTCLOG.log("WebRTCGateWayBusiness:_handleClientErrorEvent 网关反馈网络探测结果: ", JSON.stringify(e, null, " "));
							var t = e.uid,
								n = e.content;
							!this.detectNetworkResult && (this.detectNetworkResult = {}), this.detectNetworkResult.user_ip = n.params.ip, t == n.params.dst_id ? (this.detectNetworkResult.upload_network_status || (this.detectNetworkResult.upload_network_status = {}), this.detectNetworkResult.upload_network_status.up_rtt = parseInt(n.params.rtt), this.detectNetworkResult.upload_network_status.up_loss = parseInt(n.params.loss)) : (this.detectNetworkResult.download_network_status || (this.detectNetworkResult.download_network_status = {}), this.detectNetworkResult.download_network_status.down_rtt = parseInt(n.params.rtt), this.detectNetworkResult.download_network_status.down_loss = parseInt(n.params.loss))
						}
					}
				}, {
					key: "_handleReconnect",
					value: function(e) {
						var t = this,
							n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
						WEBRTCLOG.log("_handleReconnect isPush: ", e), WEBRTCLOG.log("_handleReconnect clientId: ", n);
						try {
							if(e) this.adapterRef.webrtcBusiness._startRTCIfHasDeviceOpened();
							else {
								if(!n) return void WEBRTCLOG.log("_handleReconnect: invalid argument");
								this.adapterRef.webrtcBusiness.doClientJoin(n)
							}
						} catch(r) {
							e ? WEBRTCLOG.log("_handleReconnect 重连之后，重新推流 err: ", r) : WEBRTCLOG.log("_handleReconnect 重连之后，重新拉流 err: ", r), setTimeout(function() {
								t._handleReconnect(e, n)
							}, 1e3)
						}
					}
				}, {
					key: "_transform2WebRTCGateWayContext",
					value: function(e) {
						var t = Object.assign({}, e),
							n = new s.WebRTCGateWayContext({
								uid: t.uid,
								cid: t.cid,
								hasAudio: !1,
								hasVideo: !1,
								netDetect: t.netDetect,
								session_mode: t.sessionMode,
								params: {
									content: "",
									dst_id: t.uid,
									user_token_type: 0,
									token: t.token,
									user_type: this.adapterRef.instance.constructor === u.NRTCAdapter ? 3 : 2,
									version: 1,
									is_multi_peerconnection: !0,
									sdk_version: f.info.version,
									streamSetting: {
										video: t.videoConfig
									}
								},
								browser: {
									name: d.default.name,
									version: d.default.version
								},
								bypass_rtmp: {
									is_host: !!t.sessionConfig.rtmpUrl,
									support_bypass_rtmp: t.sessionConfig.liveEnable || !1,
									support_bypass_rtmp_record: t.sessionConfig.rtmpRecord || !1,
									bypass_rtmp_url: t.sessionConfig.rtmpUrl || "",
									layout: t.sessionConfig.layout || "",
									participant_mode: "M-" + t.sessionConfig.splitMode
								},
								record: {
									support_audio_record: t.sessionConfig.recordAudio || !1,
									support_video_record: t.sessionConfig.recordVideo || !1,
									single_record_in_meeting: t.sessionConfig.singleRecord || !1,
									is_host_speaker: t.sessionConfig.isHostSpeaker || !1,
									record_type: t.sessionConfig.recordType || "0"
								}
							});
						return WEBRTCLOG.log("webrtcGateWayContext: ", n), n
					}
				}]), t
			}(c.AbstractBusiness);
		t.WebRTCGateWayBusiness = h
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(294);
		Object.defineProperty(t, "WebRTCGateWayBusiness", {
			enumerable: !0,
			get: function() {
				return r.WebRTCGateWayBusiness
			}
		});
		var i = n(293);
		Object.defineProperty(t, "DeviceBusiness", {
			enumerable: !0,
			get: function() {
				return i.DeviceBusiness
			}
		});
		var a = n(292);
		Object.defineProperty(t, "WebRTCBusiness", {
			enumerable: !0,
			get: function() {
				return a.WebRTCBusiness
			}
		});
		var o = n(276);
		Object.defineProperty(t, "IMBusiness", {
			enumerable: !0,
			get: function() {
				return o.IMBusiness
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = l(n(1)),
			i = l(n(4)),
			a = l(n(3)),
			o = l(n(2)),
			s = n(10),
			c = n(22),
			d = n(78),
			u = n(115);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n._reset(), n.sdkRef = e.sdkRef, n.adapterRef = e.adapterRef, n.appKey = n.adapterRef.imInfo.appkey || n.adapterRef.nim && n.adapterRef.nim.options && n.adapterRef.nim.options.appKey, n.statsNew = new d.RtcStatsNew({
					webrtcBusiness: n.adapterRef.webrtcBusiness,
					interval: 1e3
				}), n.statsNew.on("stats", function(e, t) {
					t % 2 == 0 && n._uploadRawDataStats(e), n._uploadFormatDataStats(!1, e, t)
				}), n.formatDataFromStats = new u.FormatDataFromStats({
					appkey: n.appKey
				}), n.rawDataFromStats = new u.RawDataFromStats({
					appkey: n.appKey
				}), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.statsNew = null, this.formatDataFromStats = null, this.rawDataFromStats = null
				}
			}, {
				key: "stopStats",
				value: function() {
					this.statsNew && this.statsNew.stop(), this.formatDataFromStats && this.formatDataFromStats.stop(), this.rawDataFromStats && this.rawDataFromStats.stop()
				}
			}, {
				key: "startStats",
				value: function() {
					this.statsNew.start(), this._uploadRawDataStatsStart(), this._uploadFormatDataStatsStart()
				}
			}, {
				key: "_uploadRawDataStatsStart",
				value: function() {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats.start({
						info: this.adapterRef.imInfo,
						cid: this.adapterRef.imInfo.cid,
						uid: this.adapterRef.imInfo.uid
					})
				}
			}, {
				key: "_uploadRawDataStats",
				value: function(e) {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats.update(e)
				}
			}, {
				key: "_uploadFormatDataStatsStart",
				value: function() {
					this.appKey ? c.CONFIG_MAP.STATS_FUN[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats && this.formatDataFromStats.start({
						controller: this,
						imInfo: this.adapterRef.imInfo,
						sessionConfig: this.adapterRef.imInfo.sessionConfig,
						videoConfig: this.adapterRef.imInfo.videoConfig
					}) : WEBRTCLOG.warn("_uploadFormatDataStatsStart: 不存在appkey， 本次format debug数据未能上报")
				}
			}, {
				key: "_uploadFormatDataStats",
				value: function(e, t, n) {
					if(c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE])
						if(this.appKey) {
							if(this.formatDataFromStats)
								if("volume" !== e) {
									if(this.adapterRef && this.adapterRef.imInfo) {
										var r = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
										r && r.webAudio && this.formatDataFromStats.updateLocalVolumn(r.webAudio.getVolumeData())
									}
									this.formatDataFromStats.update(t, n)
								} else this.formatDataFromStats.updateLocalVolumn(t)
						} else WEBRTCLOG.warn("_uploadFormatDataStats: 不存在appkey， 本次format debug数据未能上报")
				}
			}, {
				key: "uploadFormatDataStatsOnce",
				value: function(e) {
					c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats && this.formatDataFromStats.updateOnce({
						imInfo: e,
						sessionConfig: this.adapterRef.imInfo.sessionConfig,
						videoConfig: videoConfig
					})
				}
			}]), t
		}(s.EventEmitter);
		t.default = p, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(115),
			d = n(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n.info = {}, n.logData = new c.LogData, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "uploadData",
				value: function(e, t) {
					if(d.CONFIG_MAP.STATS_FUN[d.CONFIG_MAP.CURRENT.SDK_TYPE])
						if("sessionInfo" == e && t) 2 == d.CONFIG_MAP.CURRENT.SDK_TYPE ? this.info.sessionInfo = {
							role: t.role,
							uid: t.uid,
							cid: t.cid,
							sessionMode: t.sessionMode,
							appkey: "",
							token: t.serverMap && t.serverMap.token,
							turnToken: "",
							wssArr: t.serverMap && t.serverMap.webrtcarray,
							relayaddrs: null,
							relaytoken: null,
							liveEnable: t.sessionConfig && t.sessionConfig.liveEnable,
							rtmpRecord: t.sessionConfig && t.sessionConfig.rtmpRecord,
							sessionConfig: {
								maxVideoQuality: t.sessionConfig.maxVideoQuality,
								videoQuality: t.sessionConfig.videoQuality,
								videoFrameRate: t.sessionConfig.videoFrameRate,
								highAudio: t.sessionConfig.highAudio,
								liveEnable: t.sessionConfig.liveEnable,
								recordVideo: t.sessionConfig.recordVideo,
								recordAudio: t.sessionConfig.recordAudio,
								singleRecord: t.sessionConfig.singleRecord,
								rtmpUrl: t.sessionConfig.rtmpUrl,
								layout: t.sessionConfig.layout,
								splitMode: t.sessionConfig.splitMode,
								isHostSpeaker: t.sessionConfig.isHostSpeaker,
								recordType: t.sessionConfig.recordType,
								roomServerUrl: t.sessionConfig.roomServerUrl,
								rtmpRecord: t.sessionConfig.rtmpRecord
							},
							videoConfig: t.videoConfig
						} : this.info.sessionInfo = t, this.info.account = t.accountUidMap ? Object.keys(t.accountUidMap)[0] : "", this.info.uid = t.uid || t.accountUidMap[this.info.account], this.info.cid = t.cid || t.channelId;
						else if("deviceList" == e) this.info.deviceList || (this.info.deviceList = {}), this.info.deviceList[Object.keys(t)[0]] = Object.values(t)[0];
					else if("mediaConstraint" == e) this.info.mediaConstraint || (this.info.mediaConstraint = {}, this.info.mediaConstraint.audio = [], this.info.mediaConstraint.video = []), t.audio && this.info.mediaConstraint.audio.push(t.audio), t.video && this.info.mediaConstraint.video.push(t.video);
					else if("mediaPlay" == e) this.info.mediaPlay || (this.info.mediaPlay = {}, this.info.mediaPlay.audio = [], this.info.mediaPlay.video = []), t.audio && this.info.mediaPlay.audio.push(t.audio), t.video && this.info.mediaPlay.video.push(t.video);
					else if("peerConnections" == e) this.info.peerConnections || (this.info.peerConnections = []), t.localSdp = "", t.remoteSdp = "", this.info.peerConnections.push(t);
					else if("send" == e && this.info) return this.logData.send(this.info), void(this.info = null)
				}
			}, {
				key: "trimSdp",
				value: function(e) {
					if(e) {
						var t = "",
							n = e.match(/a=rtpmap:(\d+) opus/g)[0].match(/a=rtpmap:(\d+)/)[1],
							r = e.match(/a=rtpmap:(\d+) H264/g)[0].match(/a=rtpmap:(\d+)/)[1],
							i = e.match(/a=msid-semantic:([0-9- \/A-Za-z:]*)/g),
							a = e.match(/a=candidate:([0-9- \/A-Za-z:]*)/g),
							o = e.match(/a=extmap:([0-9- \.\/A-Za-z:]*)/g),
							s = e.match(/a=rtpmap:([0-9- \.\/A-Za-z:]*)/g),
							c = e.match(/a=rtcp-fb:([0-9- \.\/A-Za-z:]*)/g),
							d = e.match(/a=fmtp:([0-9- =;\.\/A-Za-z:]*)/g),
							u = e.match(/a=ssrc:(\d)+/g);
						return t += this.handleList(i) + this.handleList(a) + this.handleList(o) + this.handleList(s, n, r) + this.handleList(c, n, r) + this.handleList(d, n, r) + this.handleList(u)
					}
				}
			}, {
				key: "handleList",
				value: function(e, t, n) {
					if(!e || 0 == e.length) return "";
					if(e && e.length && !t) return e.join("\n");
					for(var r = 0; r < e.length; r++) - 1 == e[r].indexOf(t) && -1 == e[r].indexOf(n) && (e.splice(r, 1), r--);
					return e.length ? e.join("\n") : ""
				}
			}]), t
		}(s.EventEmitter);
		t.default = l, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(115),
			d = n(22);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				return n.sdkRef = e.sdkRef, n.adapterRef = e.adapterRef, n.adapterRef.imInfo && n.adapterRef.imInfo.appkey ? n.appkey = n.adapterRef.imInfo.appkey : n.appkey = n.adapterRef.nim && n.adapterRef.nim.options && n.adapterRef.nim.options.appKey, n.dataApi = new c.ApiInvokeData({
					appkey: n.appkey,
					platform: e.platform
				}), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "uploadDataApi",
				value: function(e, t) {
					d.CONFIG_MAP.STATS_FUN[d.CONFIG_MAP.CURRENT.SDK_TYPE] && this.appkey && ("start" === e && (t.appkey = this.appkey), this.dataApi[e] && this.dataApi[e](t))
				}
			}]), t
		}(s.EventEmitter);
		t.default = l, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(298);
		Object.defineProperty(t, "ApiReportHelper", {
			enumerable: !0,
			get: function() {
				return o(r).default
			}
		});
		var i = n(297);
		Object.defineProperty(t, "LogReportHelper", {
			enumerable: !0,
			get: function() {
				return o(i).default
			}
		});
		var a = n(296);

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		Object.defineProperty(t, "StatsReportHelper", {
			enumerable: !0,
			get: function() {
				return o(a).default
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), n.uid = e.uid || 0, n.adapterRef = e.adapterRef, n._initNode(), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.videoContainerDom = null, this.videoDom = null, this.uid = null, this.containerSize = {
						width: 0,
						height: 0
					}
				}
			}, {
				key: "_initNode",
				value: function() {
					var e = this._initVideoContainer();
					this.videoContainerDom = e;
					var t = this._initVideo();
					this.videoDom = t, e.appendChild(t)
				}
			}, {
				key: "_initVideoContainer",
				value: function() {
					var e = document.createElement("div");
					return e.style.overflow = "hidden", e.style.position = "relative", e.style.width = this.containerSize.width + "px", e.style.height = this.containerSize.height + "px", e.style.display = "inline-block", e
				}
			}, {
				key: "_initVideo",
				value: function() {
					var e = document.createElement("video");
					return e.style.position = "absolute", e.style.left = "50%", e.style.top = "50%", e.style.transform = "translate(-50%,-50%)", e.setAttribute("x-webkit-airplay", "x-webkit-airplay"), e.setAttribute("playsinline", "playsinline"), e.setAttribute("webkit-playsinline", "webkit-playsinline"), e.preload = "auto", e.dataset.uid = this.uid, e.autoplay = "autoplay", e
				}
			}, {
				key: "resize",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
						width: 100,
						height: 100,
						cut: !0
					};
					if(e.cut && this.adapterRef.apiReportHelper.uploadDataApi("update", {
							key: "video_crop"
						}), this.containerSize = e, this.videoContainerDom.style.width = e.width + "px", this.videoContainerDom.style.height = e.height + "px", !e.cut) return this.videoDom.style.height = "100%", void(this.videoDom.style.width = "100%");
					this.videoDom.videoWidth / this.videoDom.videoHeight > e.width / e.height ? (this.videoDom.style.width = "auto", this.videoDom.style.height = "100%") : (this.videoDom.style.width = "100%", this.videoDom.style.height = "auto")
				}
			}, {
				key: "destory",
				value: function() {
					WEBRTCLOG.log("VideoDomHelper:destroy"), this.videoContainerDom && this.videoDom && this.videoContainerDom.removeChild(this.videoDom), this.videoDom && !this.videoDom.paused && this.videoDom.pause(), this._reset()
				}
			}]), t
		}(n(10).EventEmitter);
		t.default = c, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.VideoHelper = void 0;
		var r = h(n(1)),
			i = h(n(4)),
			a = h(n(3)),
			o = h(n(2)),
			s = n(10),
			c = n(31),
			d = f(n(112)),
			u = f(n(182)),
			l = h(n(300)),
			p = n(22);

		function f(e) {
			if(e && e.__esModule) return e;
			var t = {};
			if(null != e)
				for(var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t.default = e, t
		}

		function h(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var m = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), n.sdkRef = e.sdkRef, n.adapterRef = e.adapterRef, n.uid = e.uid, n.poster = e.poster || "", n.videoContainer = e.videoContainer || document.body, n.videoDomHelper = n._createVideoDomHelper(), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.sdkRef = null, this.adapterRef = null, this._resetStateParam(), this._resetMixParam()
				}
			}, {
				key: "_resetStateParam",
				value: function() {
					this.isPlaying = !1, this.system = c.RtcSupport.checkVersion(), this.uid = null, this.poster = "", this.rtc = null, this.constraint = {}, this.videoContainer = null, this.videoDomHelper = null, this.webAudio = null, this.localVideoStream = null, this.localScreenStream = null, this.remoteVideoStream = null
				}
			}, {
				key: "_resetMixParam",
				value: function() {
					this.videoDom = null, this.screenDom = null, this.canvasTimer = null
				}
			}, {
				key: "getVideoStream",
				value: function(e, t, n) {
					return this._getVideoStream(e, t, n)
				}
			}, {
				key: "setIsRemote",
				value: function(e) {
					return this.isRemote = e, this
				}
			}, {
				key: "setRemoteVideoStream",
				value: function(e) {
					this.remoteVideoStream = e, this.hide()
				}
			}, {
				key: "setRTC",
				value: function(e) {
					this.rtc = e
				}
			}, {
				key: "setVideoContainer",
				value: function(e) {
					e ? this.videoContainer = e : WEBRTCLOG.log("不存在dom")
				}
			}, {
				key: "updateStream",
				value: function(e) {
					var t = null;
					this.isRemote ? (t = this.remoteVideoStream, this.remoteVideoStream = e) : (t = this.localVideoStream, this.localVideoStream = e), u.removeTrackFromMediaStream(t)
				}
			}, {
				key: "composeTrack",
				value: function(e, t) {
					if(e != this.adapterRef.imInfo.uid)
						if(this.remoteVideoStream && this.remoteVideoStream.getVideoTracks && this.remoteVideoStream.getVideoTracks() > 0 && this.remoteVideoStream.getVideoTracks()[0].id == t.id) WEBRTCLOG.log("videoHelper:_composeTrack 已经添加过该轨道");
						else if(this.adapterRef.imInfo.netDetect) WEBRTCLOG.log("videoHelper:_composeTrack 网络探测直接忽略");
					else {
						var n = new MediaStream;
						n.addTrack(t), this.setRemoteVideoStream(n), WEBRTCLOG.log("NRTCAdapter:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), WEBRTCLOG.log("remoteVideoStream: ", this.remoteVideoStream), this.delayVideoShow(e)
					} else WEBRTCLOG.log("videoHelper:_composeTrack 自己的轨道直接忽略")
				}
			}, {
				key: "delayVideoShow",
				value: function(e) {
					var t = this,
						n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
					WEBRTCLOG.log("VideoHelper:delayVideoShow uid=%o, has_video=%o", e, n), setTimeout(function() {
						t._doDelayVideoShow(e, n)
					}, 100)
				}
			}, {
				key: "_doDelayVideoShow",
				value: function(e) {
					var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
					if(e && e != this.adapterRef.imInfo.uid)
						if(this.remoteVideoStream) {
							if(WEBRTCLOG.log("VideoHelper:_doDelayVideoShow uid=%s, has_video=%s", e, t), !this.adapterRef.instance._isFirefox()) {
								var n = {};
								t && (n = this.checkRemoteTrack(e, this.rtc.sdpAnswer.sdp)), t = n.video
							}!0 === t ? (WEBRTCLOG.log("show..."), this.show()) : (WEBRTCLOG.log("hide..."), this.hide())
						} else WEBRTCLOG.log("VideoHelper:_doDeplayVideoShow 不存在的远程视频流， 不显示");
					else WEBRTCLOG.log("VideoHelper:_doDelayVideoShow 自己直接返回， 不显示")
				}
			}, {
				key: "checkRemoteTrack",
				value: function(e, t, n) {
					if(!this.remoteVideoStream) return WEBRTCLOG.log("不存在远端的对象..."), {};
					if(!this.remoteVideoStream || !this.rtc) return WEBRTCLOG.log("远程视频流均不存在，或者流程管理器不存在"), {};
					var r = this.remoteVideoStream.getVideoTracks()[0];
					if(r && "ended" == r.readyState && n.getReceivers().length > 1) {
						r = n.getReceivers()[1].track;
						var i = new MediaStream;
						i.addTrack(r), this.setRemoteVideoStream(i), WEBRTCLOG.log("webrtc::checkMediaStatus new videoTrack ----\x3e ", r)
					} else WEBRTCLOG.log("webrtc::checkMediaStatus videoTrack ----\x3e ", r);
					var a = this.rtc.checkMediaStatus({
						videoTrack: r,
						sdp: t,
						uid: e
					});
					return this.adapterRef.instance._isSafari() && (a.video = !0), a.video || this.hide(), a
				}
			}, {
				key: "_getVideoStream",
				value: function(e, t, n) {
					var r = this,
						i = {};
					i.deviceId = e.deviceId;
					var a = this.sdkRef.getVideoSessionConfig({
						maxQuality: this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig).quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality,
						quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
						frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
					});
					return i = Object.assign(i, a), this.constraint.video = i, this.adapterRef.imInfo.netDetect && (this.constraint = {
						audio: !1,
						video: {
							width: 1280,
							height: 720,
							frameRate: 30,
							deviceId: {
								exact: e.deviceId
							}
						}
					}), WEBRTCLOG.log("videoHelper::_getVideoStream"), u.getMediaStream(this.constraint).then(function(i) {
						if(WEBRTCLOG.log("videoHelper::获取到视频流:", i.id), r.localCameraStream ? r.destroy(r.localCameraStream) : !r.adapterRef.mixVideoConf && r.localVideoStream && r.destroy(r.localVideoStream), r.localCameraStream = i, WEBRTCLOG.log("webrtc-controller::获取到视频流 mixVideoConf:", r.adapterRef.mixVideoConf), WEBRTCLOG.log("webrtc-controller::获取到视频流 localScreenStream:", r.localScreenStream), r.adapterRef.mixVideoConf && r.localScreenStream ? r.startMCU(r.localCameraStream, r.localScreenStream) : (r.localVideoStream = i, r.adapterRef.webrtcGateWayBusiness || (r.destroy(), n("logout")), r.adapterRef.instance.judgeSendSdpOfferOrUpdate()), r.adapterRef.logReportHelper) {
							var a = {};
							Object.assign(a, r.constraint), a.streamId = i.id, r.adapterRef.logReportHelper.uploadData("mediaConstraint", {
								video: a
							}), r.adapterRef.deviceBusiness && r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache && r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.video ? r.adapterRef.logReportHelper.uploadData("deviceList", {
								video: r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.video
							}) : r.adapterRef.deviceApi.getDevicesOfType().then(function(e) {
								r.adapterRef.logReportHelper.uploadData("deviceList", {
									video: e.video
								})
							})
						}
						t({
							device: e,
							stream: i
						})
					}).catch(function(e) {
						n(e)
					})
				}
			}, {
				key: "handleStreamFromMp4File",
				value: function(e) {
					if(e && e.getVideoTracks().length) {
						var t = new MediaStream,
							n = e.getVideoTracks()[0];
						WEBRTCLOG.log("处理制造的stream track: ", n), t.addTrack(e.getVideoTracks()[0]), this.localVideoStream = t, WEBRTCLOG.log("new localVideoStream: ", this.localVideoStream)
					} else WEBRTCLOG.warn("handleStreamFromMp4File: Invalid Parameter")
				}
			}, {
				key: "getScreenStreamPlugin",
				value: function(e, t, n) {
					return this._getScreenStreamPlugin(e, t, n)
				}
			}, {
				key: "getScreenStreamNative",
				value: function(e, t, n) {
					return this._getScreenStreamNative(e, t, n)
				}
			}, {
				key: "enableDevice",
				value: function(e) {
					WEBRTCLOG.log("AudioHelper: enableDevice: 恢复设备 Audio");
					var t = [];
					return this.localVideoStream && (t = this.localVideoStream.getTracks()), t.map(function(e) {
						e.enabled = !0
					}), Promise.resolve()
				}
			}, {
				key: "removeTrackFromMediaStream",
				value: function(e) {
					u.removeTrackFromMediaStream(e)
				}
			}, {
				key: "destroy",
				value: function(e) {
					WEBRTCLOG.log("videoHelper:destroy 移除本地远程流"), this.hide(), e && u.removeTrackFromMediaStream(e), !e && this.localScreenStream && (WEBRTCLOG.log("videoHelper:destroy 移除本地screen流:", this.localScreenStream), u.removeTrackFromMediaStream(this.localScreenStream), this.localScreenStream = null), null !== this.videoRatioIntervalId && (window.clearInterval(this.videoRatioIntervalId), this.videoRatioIntervalId = null), this._resetStateParam()
				}
			}, {
				key: "_getScreenStreamPlugin",
				value: function(e, t, n) {
					var r = this,
						i = this.adapterRef.chromeId;
					if(!i) return WEBRTCLOG.warn("chrome屏幕共享id未设置"), t("chrome屏幕共享id未设置");
					var a = {
						sources: ["window", "screen", "tab"]
					};
					return new Promise(function() {
						chrome.runtime.sendMessage(i, a, {}, function(e) {
							if(WEBRTCLOG.log("chrome 屏幕共享", e), e && "success" === e.type) {
								var i = {
									video: {
										mandatory: {
											maxWidth: 1280,
											maxHeight: 720,
											maxFrameRate: 5,
											minFrameRate: 1,
											chromeMediaSource: "desktop",
											chromeMediaSourceId: e.streamId
										}
									}
								};
								return WEBRTCLOG.log("webrtc-controller::_getScreenStreamPlugin"), u.getMediaStream(i).then(function(e) {
									WEBRTCLOG.log("webrtc-controller::获取到演示流:", e.id), r.localScreenStream ? r.destroy(r.localScreenStream) : !r.adapterRef.mixVideoConf && r.localVideoStream && r.destroy(r.localVideoStream), r.localScreenStream = e, WEBRTCLOG.log("webrtc-controller::获取到演示流 mixVideoConf:", r.adapterRef.mixVideoConf), WEBRTCLOG.log("webrtc-controller::获取到演示流 localCameraStream:", r.localCameraStream), r.adapterRef.mixVideoConf && r.adapterRef.mixVideoConf.videoCompressSize && r.localCameraStream ? r.startMCU(r.localCameraStream, r.localScreenStream) : (r.localVideoStream = e, r.adapterRef.webrtcGateWayBusiness || (r.destroy(), n(VideoErrorCode.VideoUserHasBeenLeft)), r.adapterRef.instance.judgeSendSdpOfferOrUpdate()), t()
								}).catch(function(e) {
									var t = Object.assign({
										event: e
									}, VideoErrorCode.VideoStreamFetchError);
									return Promise.reject(t)
								})
							}
							e ? (WEBRTCLOG.error("获取流失败"), n(VideoErrorCode.VideoStreamFetchError)) : (WEBRTCLOG.error("未安装插件"), n(DeviceErrorCode.DevicePluginNotInstalled))
						})
					})
				}
			}, {
				key: "_getScreenStreamNative",
				value: function(e, t, n) {
					var r = this;
					return u.getScreenStream({
						video: !0
					}).then(function(e) {
						WEBRTCLOG.log("webrtc-controller::获取到演示流:", e.id), r.localScreenStream ? r.destroy(r.localScreenStream) : !r.adapterRef.mixVideoConf && r.localVideoStream && r.destroy(r.localVideoStream), r.localScreenStream = e, WEBRTCLOG.log("webrtc-controller::获取到演示流 mixVideoConf:", r.adapterRef.mixVideoConf), WEBRTCLOG.log("webrtc-controller::获取到演示流 localCameraStream:", r.localCameraStream), r.adapterRef.mixVideoConf && r.adapterRef.mixVideoConf.videoCompressSize && r.localCameraStream ? r.startMCU(r.localCameraStream, r.localScreenStream) : (r.localVideoStream = e, r.adapterRef.webrtcGateWayBusiness || (r.destroy(), n(VideoErrorCode.VideoUserHasBeenLeft)), r.adapterRef.instance.judgeSendSdpOfferOrUpdate()), t()
					}).catch(function(e) {
						var t = Object.assign({
							event: e
						}, VideoErrorCode.VideoStreamFetchError);
						return Promise.reject(t)
					})
				}
			}, {
				key: "setMixCoordinates",
				value: function() {
					if(WEBRTCLOG.log("setMixCoordinates videoDom.videoWidth: ", this.videoDom.videoWidth), this.coordinatesX = 0, this.coordinatesY = 0, this.adapterRef && this.adapterRef.mixVideoConf && this.adapterRef.mixVideoConf.videoLayout) switch(this.adapterRef.mixVideoConf.videoLayout) {
						case p.MIX_VIDEO_MODE.LAYOUT_TOP_LEFT:
							break;
						case p.MIX_VIDEO_MODE.LAYOUT_BOTTOM_LEFT:
							this.coordinatesY = this.canvas.height - this.videoDom.videoHeight, WEBRTCLOG.log("左下角 coordinatesY: ", this.coordinatesY);
							break;
						case p.MIX_VIDEO_MODE.LAYOUT_BOTTOM_RIGHT:
							this.coordinatesX = this.canvas.width - this.videoDom.videoWidth, this.coordinatesY = this.canvas.height - this.videoDom.videoHeight, WEBRTCLOG.log("右下角 coordinatesX: ", this.coordinatesX), WEBRTCLOG.log("右下角 coordinatesY: ", this.coordinatesY);
							break;
						case p.MIX_VIDEO_MODE.LAYOUT_TOP_RIGHT:
						default:
							this.coordinatesX = this.canvas.width - this.videoDom.videoWidth, WEBRTCLOG.log("右上角 coordinatesY: ", this.coordinatesY)
					} else this.coordinatesX = this.canvas.width - this.videoDom.videoWidth;
					WEBRTCLOG.log("coordinatesX: ", this.coordinatesX), WEBRTCLOG.log("coordinatesY: ", this.coordinatesY)
				}
			}, {
				key: "setMixConf",
				value: function() {
					var e = this;
					if(this.canvasTimer && this.videoDom && this.screenDom && this.localCameraStream && this.localScreenStream) {
						var t = this.sdkRef.getVideoSessionConfig({
							quality: this.adapterRef.mixVideoConf.videoCompressSize,
							frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
						});
						if(t.width == this.videoDom.videoWidth) WEBRTCLOG.log("camera video大小无变化，仅仅更新布局即可"), this.setMixCoordinates();
						else {
							var n = {
								width: t.width,
								height: t.height
							};
							WEBRTCLOG.log("camera video大小发生变化，开始更新camera video大小, constraint: ", JSON.stringify(n, null, " ")), this.videoDom.srcObject.getVideoTracks()[0].applyConstraints(n).then(function() {
								WEBRTCLOG.log("更新camera video大小成功，开始更新混频参数")
							}), videoDom.onresize = function() {
								WEBRTCLOG.log("onresize videoWidth: ", e.videoDom.videoWidth), e.setMixCoordinates()
							}
						}
					} else WEBRTCLOG.log("当前没有在进行视频和演示的混流，先记录配置信息，后续使用")
				}
			}, {
				key: "startMCU",
				value: function(e, t) {
					var n = this;
					if(e && t) {
						var r = this.sdkRef.getVideoSessionConfig({
								quality: this.adapterRef.mixVideoConf.videoCompressSize,
								frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
							}),
							i = {
								width: r.width,
								height: r.height
							};
						WEBRTCLOG.log("开始压缩video constraint: ", JSON.stringify(i, null, " ")), window.videoStream = e, e.getVideoTracks()[0].applyConstraints(i).then(function() {
							WEBRTCLOG.log("video压缩成功，开始混频");
							var r = n;
							n.videoDom || (n.videoDom = document.createElement("video"), n.videoDom.autoplay = "atuoplay"), n.videoDom.oncanplay = null, n.videoDom.oncanplay = function() {
								WEBRTCLOG.log("videoDom.videoWidth: ", r.videoDom.videoWidth), r.screenDom = document.createElement("video"), r.screenDom.autoplay = "atuoplay", r.screenDom.oncanplay = function() {
									r.canvas = document.createElement("canvas"), WEBRTCLOG.log("self.screenDom.videoWidth: ", r.screenDom.videoWidth), r.canvas.width = r.screenDom.videoWidth, r.canvas.height = r.screenDom.videoHeight, WEBRTCLOG.log("canvas: ", r.canvas), r.canvasTimer && clearInterval(r.canvasTimer), r.setMixCoordinates(), r.canvasTimer = setInterval(function() {
										r.canvas.getContext("2d").drawImage(r.screenDom, 0, 0, r.canvas.width, r.canvas.height), r.canvas.getContext("2d").drawImage(r.videoDom, r.coordinatesX, r.coordinatesY)
									}, 25), r.localVideoStream = r.canvas.captureStream(), r.videoDomHelper.videoDom.srcObject = r.localVideoStream, r.adapterRef.instance.judgeSendSdpOfferOrUpdate()
								}, n.screenDom.srcObject = t
							}, n.videoDom.srcObject = e
						}).catch(function(e) {
							console.warn("改变失败，e:", e)
						})
					} else WEBRTCLOG.warn("startMCU: stream is null")
				}
			}, {
				key: "clearOneStreamFormMixture",
				value: function(e) {
					var t = this;
					if(e) WEBRTCLOG.log("清除 camera stream: ", this.localCameraStream.id), this.localVideoStream = this.localScreenStream, this.videoDomHelper.videoDom.srcObject = this.localVideoStream, u.removeTrackFromMediaStream(this.localCameraStream), this.localCameraStream = null, this.adapterRef.instance._updateRtc(!0);
					else {
						WEBRTCLOG.log("清除 screen stream: ", this.localScreenStream.id);
						var n = this.sdkRef.getVideoSessionConfig({
							quality: this.adapterRef.imInfo.videoQuality,
							frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
						});
						WEBRTCLOG.log("开始回复video constraint: ", JSON.stringify(n, null, " ")), this.localCameraStream.getVideoTracks()[0].applyConstraints(n).then(function() {
							WEBRTCLOG.log("video回复成功，开始发送stream: ", t.localCameraStream), t.localVideoStream = t.localCameraStream, WEBRTCLOG.log("原来播放的stream: ", t.videoDomHelper.videoDom.srcObject), t.videoDomHelper.videoDom.srcObject = t.localVideoStream, t.adapterRef.instance._updateRtc(!0)
						}).catch(function(e) {
							console.log("video回复失败，e:", e), t.localVideoStream = t.localCameraStream, t.adapterRef.instance._updateRtc(!0), t.videoDomHelper.videoDom.srcObject = t.localCameraStream
						}), u.removeTrackFromMediaStream(this.localScreenStream), this.localScreenStream = null
					}
					clearInterval(this.canvasTimer), this.videoDom = null, this.screenDom = null, this.canvas = null
				}
			}, {
				key: "stopStream",
				value: function(e, t) {
					return 0 == this.adapterRef.state.startSessionTime && (u.removeTrackFromMediaStream(this.localCameraStream), u.removeTrackFromMediaStream(this.localScreenStream)), this.adapterRef.mixVideoConf && this.localScreenStream && this.localCameraStream ? (this.clearOneStreamFormMixture(e), t()) : this.localVideoStream ? (WEBRTCLOG.log("清除 localVideoStream"), this.destroy(this.localVideoStream), this.localVideoStream = null, this.localScreenStream = null, this.localCameraStream = null, this.adapterRef.instance._updateRtc(!0), t()) : t("摄像头未开启")
				}
			}, {
				key: "stopVideoDevice",
				value: function(e) {
					WEBRTCLOG.log("开始关闭摄像头"), this.stopStream(!0, e)
				}
			}, {
				key: "stopScreenShare",
				value: function(e) {
					WEBRTCLOG.log("开始关闭屏幕共享"), this.stopStream(!1, e)
				}
			}, {
				key: "disableDevice",
				value: function() {
					WEBRTCLOG.log("设备禁用");
					var e = [];
					return this.localVideoStream && (e = this.localVideoStream.getTracks()), e.map(function(e) {
						e.enabled = !1
					}), Promise.resolve()
				}
			}, {
				key: "hide",
				value: function() {
					if(WEBRTCLOG.log("隐藏video并清理DOM节点"), this.videoDomHelper) {
						var e = this.videoDomHelper.videoContainerDom;
						if(e) {
							if(this.canvasTimer && 0 !== this.adapterRef.state.startSessionTime) return clearInterval(this.canvasTimer), this.canvasTimer = null, void WEBRTCLOG.log("VideoHelper:hide 当前需要展示视频或者屏幕共享");
							e.parentNode && this.videoContainer.removeChild(e), this.videoDomHelper.destory(), this.videoDomHelper = null, this.isPlaying = !1
						} else WEBRTCLOG.log("VideoHelper:hide videoContainerDom不存在")
					} else WEBRTCLOG.log("VideoHelper:hide videoDomHelper不存在")
				}
			}, {
				key: "_createVideoDomHelper",
				value: function() {
					return new l.default({
						adapterRef: this.adapterRef,
						uid: this.uid
					})
				}
			}, {
				key: "show",
				value: function(e) {
					!1 !== this._checkHasVideoStream() ? this.videoContainer || e ? (this.videoDomHelper || (this.videoDomHelper = this._createVideoDomHelper()), e && this.setVideoContainer(e), this._mountVideoToDom(), this.play()) : WEBRTCLOG.log("请先设置容器后再调用此方法，或传入对应渲染容器节点...") : WEBRTCLOG.log("videoHelper: show: 未检测到视频流，请检查媒体设备是否开启...")
				}
			}, {
				key: "_mountVideoToDom",
				value: function() {
					var e = this.videoDomHelper.videoContainerDom,
						t = this.videoContainer;
					e && t ? t != e.parentNode ? (WEBRTCLOG.log("videoContainerDom: ", e), WEBRTCLOG.log("container: ", t), t.appendChild(e)) : WEBRTCLOG.log("videoHelper: _mountVideoToDom: 节点已挂载，请勿重复挂载") : WEBRTCLOG.error("videoHelper: _mountVideoToDom: 未设置渲染根节点或子节点为空")
				}
			}, {
				key: "play",
				value: function() {
					var e = this;
					if(WEBRTCLOG.log("播放视频"), 1 != this.isPlaying) {
						var t = this.videoDomHelper.videoDom;
						if(0 != t.paused) {
							this.poster && (t.poster = this.poster), WEBRTCLOG.log("isRemote: ", this.isRemote), t.srcObject || (WEBRTCLOG.log("设置播放对象"), t.srcObject = this.isRemote ? this.remoteVideoStream : this.localVideoStream, WEBRTCLOG.log("video: ", t.srcObject.id)), 4 !== t.readyState && t.load();
							var n = t.play();
							void 0 !== n && n.catch(function(e) {
								WEBRTCLOG.warn(e)
							}).then(function() {
								if(e.isPlaying = !0, WEBRTCLOG.log("video playing-。-\n videoDom:", t), WEBRTCLOG.log("div:", t.parentNode), WEBRTCLOG.log("streamId:", t.srcObject && t.srcObject.id), WEBRTCLOG.log("isPlaying: ", t.played.length), t.parentNode && 0 == t.played.length && setTimeout(function() {
										t && 0 == t.played.length && (WEBRTCLOG.log("再次播放"), t.play())
									}, 500), e.adapterRef.logReportHelper && t && t.parentNode) {
									var n = {};
									n.uid = e.adapterRef.imInfo && e.adapterRef.imInfo.uid || "", n.remoteUid = e.uid || "", n.streamId = t.srcObject.id || "", n.playEvent = t.parentNode.innerHTML || "", n.videoSize = t.videoWidth + "x" + t.videoHeight || "", n.windowsSize = t.parentNode.clientWidth + "x" + t.parentNode.clientHeight || "", e.adapterRef.logReportHelper.uploadData("mediaPlay", {
										video: n
									})
								}
							})
						} else WEBRTCLOG.log("已经播放，请勿重复播放")
					} else WEBRTCLOG.log("正在播放，请勿重复播放")
				}
			}, {
				key: "getLocalVideoStream",
				value: function() {
					return this.localVideoStream
				}
			}, {
				key: "resumeLocalStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.play()
				}
			}, {
				key: "suspendLocalStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.pause()
				}
			}, {
				key: "resumeRemoteStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.play()
				}
			}, {
				key: "suspendRemoteStream",
				value: function() {
					this.videoDomHelper && this.videoDomHelper.videoDom.pause()
				}
			}, {
				key: "hasStartVideoDeviceRepeat",
				value: function(e) {
					this.localVideoStream;
					return(this.localCameraStream || this.localScreenStream) && this.localCameraStream, this.localStream && this.constraint.video && this.constraint.video.deviceId == e.deviceId ? (this.enableDevice(), Promise.reject("设备已开启，重复操作")) : Promise.resolve()
				}
			}, {
				key: "checkMediaTrackBySDP",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						t = e.video,
						n = e.sdp,
						r = e.uid,
						i = {
							video: !1
						},
						a = d.parse(n),
						o = t && t.getVideoTracks()[0];
					return WEBRTCLOG.log(r + " checkMediaTrackBySDP ----\x3e track status", a), o && WEBRTCLOG.log("webrtc::checkMediaTrackBySDP videoTrack ----\x3e ", o), i.video = o && "ended" !== o.readyState && new RegExp(o.id).test(n), i
				}
			}, {
				key: "_checkHasVideoStream",
				value: function() {
					return Boolean(this.localVideoStream) || Boolean(this.remoteVideoStream)
				}
			}]), t
		}(s.EventEmitter);
		t.VideoHelper = m
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = s(n(1)),
			i = s(n(4)),
			a = s(n(3)),
			o = s(n(2));

		function s(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var c = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), n._initNode(), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.audioDom = null
				}
			}, {
				key: "_initNode",
				value: function() {
					this.audioDom = document.createElement("audio")
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AudioDomHelper:destroy"), this._reset()
				}
			}]), t
		}(n(10).EventEmitter);
		t.default = c, e.exports = t.default
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AudioHelper = void 0;
		var r = f(n(1)),
			i = f(n(4)),
			a = f(n(3)),
			o = f(n(2)),
			s = n(10),
			c = n(127),
			d = p(n(182)),
			u = f(n(302)),
			l = p(n(112));

		function p(e) {
			if(e && e.__esModule) return e;
			var t = {};
			if(null != e)
				for(var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
			return t.default = e, t
		}

		function f(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var h = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), n.sdkRef = e.sdkRef, n.adapterRef = e.adapterRef, n.uid = e.uid, n.isRemote = e.isRemote, n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "_reset",
				value: function() {
					this.sdkRef = null, this.adapterRef = null, this._resetStateParam()
				}
			}, {
				key: "_resetStateParam",
				value: function() {
					this.constraint = {}, this.system = null, this.uid = null, this.isRemote = !1, this.rtc = null, this.audioDomHelper = new u.default, this.localAudioStream = null, this.remoteAudioStream = null, this.localAudioStreamFromMIC = null, this.webAudio && this.webAudio.context && this.webAudio.destroy && this.webAudio.destroy(), this.webAudio = null, this.muted = !1, this.volume = 100, this.gainVolume = .5, this.gainOff = !1
				}
			}, {
				key: "_getMediaStream",
				value: function() {
					var e = this;
					!1 === this.isRemote && d.getMediaStream({
						video: !1,
						audio: !0
					}).then(function(t) {
						e.localAudioStream = t
					})
				}
			}, {
				key: "playAudio",
				value: function() {
					(this.localAudioStream || this.remoteAudioStream) && (!1 === this.isRemote ? this.audioDomHelper.audioDom.srcObject = this.localAudioStream : !0 === this.isRemote && (this.audioDomHelper.audioDom.srcObject = this.remoteAudioStream), this.muted && this.setMuted(!1), this.play())
				}
			}, {
				key: "stopAudio",
				value: function() {
					this.setMuted(!0)
				}
			}, {
				key: "setIsRemote",
				value: function(e) {
					return this.isRemote = e, this
				}
			}, {
				key: "setRemoteAudioStream",
				value: function(e) {
					this.remoteAudioStream = e
				}
			}, {
				key: "setRTC",
				value: function(e) {
					this.rtc = e
				}
			}, {
				key: "setMuted",
				value: function(e) {
					this.muted = !!e, this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.muted = !!e, this.setPlayVolume())
				}
			}, {
				key: "play",
				value: function() {
					var e = this,
						t = this.audioDomHelper.audioDom;
					4 !== t.readyState && t.load(), 0 !== t.played.length && t.pause();
					var n = t.play();
					void 0 !== n && n.then(function() {
						if(WEBRTCLOG.warn("audioHelper: play: muted-" + t.muted + " " + t.parentNode + " " + (t.srcObject && t.srcObject.id)), e.adapterRef.logReportHelper) {
							var n = {};
							n.uid = e.adapterRef.imInfo && e.adapterRef.imInfo.uid || "", n.remoteUid = e.uid, n.streamId = t.srcObject.id, n.playEvent = t.innerHTML, e.adapterRef.logReportHelper.uploadData("mediaPlay", {
								audio: n
							})
						}
					}).catch(function(e) {
						WEBRTCLOG.warn("播放声音error: ", e)
					})
				}
			}, {
				key: "setPlayVolume",
				value: function(e) {
					var t = void 0;
					t = e || 0 == e ? e < 0 ? 0 : e > 255 ? 255 : e : this.volume, this.volume = t, this.getMuted() || this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.volume = t / 255)
				}
			}, {
				key: "setGain",
				value: function(e) {
					var t = 0 === e || 0 !== e && e ? e / 255 : 1;
					this.gainVolume = t, this.localAudioStream && !this.isRemote ? this.gainOff ? WEBRTCLOG.log("audioHelper: setGain: 本地音频被禁止采集") : this.webAudio && (this.webAudio.setGain(t), WEBRTCLOG.log("audioHelper: setGain: webAudio: 设置音量", t)) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "getGain",
				value: function() {
					return this.gainVolume
				}
			}, {
				key: "setGainOff",
				value: function() {
					this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(0), this.gainOff = !0) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "setGainOn",
				value: function() {
					this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(this.gainVolume), this.gainOff = !1) : WEBRTCLOG.log("audioHelper: setGain: 缺失本地音频")
				}
			}, {
				key: "getMuted",
				value: function() {
					return !!this.muted
				}
			}, {
				key: "composeTrack",
				value: function(e, t) {
					if(e != this.adapterRef.imInfo.uid)
						if(this.adapterRef.imInfo.netDetect) WEBRTCLOG.log("audioHelper:_composeTrack 网络探测直接忽略");
						else {
							var n = new MediaStream;
							n.addTrack(t), this.remoteAudioStream && !this.adapterRef.instance._isSafari() ? this.updateStream(n) : this.setRemoteAudioStream(n), WEBRTCLOG.log("audioHelper:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), WEBRTCLOG.log("重组轨道，stream id:", n.id), this.playAudio()
						}
					else WEBRTCLOG.warn("audioHelper:_composeTrack 自己的轨道直接忽略")
				}
			}, {
				key: "stopAudioDevice",
				value: function() {
					this.localAudioStreamFromMIC && d.removeTrackFromMediaStream(this.localAudioStreamFromMIC)
				}
			}, {
				key: "getAudioStream",
				value: function(e, t, n) {
					return this._getAudioStream(e, t, n)
				}
			}, {
				key: "_getAudioStream",
				value: function(e, t, n) {
					var r = this,
						i = e && e.deviceId;
					return this.constraint.audio = !i || {
						deviceId: i
					}, this.adapterRef.imInfo.netDetect && (this.constraint = {
						audio: !0,
						video: !1
					}), WEBRTCLOG.log("audioHelper::_getAudioStream:", this.constraint), d.getMediaStream(this.constraint).then(function(i) {
						r.stopAudioDevice(), WEBRTCLOG.log("获取到音频流:", i), r.adapterRef.webrtcGateWayBusiness || (d.removeTrackFromMediaStream(i), n("logout")), r.adapterRef.logReportHelper && (r.adapterRef.logReportHelper.uploadData("mediaConstraint", {
							audio: {
								deviceId: r.constraint.audio.deviceId || "",
								streamId: i.id || ""
							}
						}), r.adapterRef.deviceBusiness && r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache && r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.audioIn ? r.adapterRef.logReportHelper.uploadData("deviceList", {
							audio: r.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.audioIn
						}) : r.adapterRef.deviceApi.getDevicesOfType().then(function(e) {
							r.adapterRef.logReportHelper.uploadData("deviceList", {
								audio: e.audioIn
							})
						})), r._initAudioStream(r.constraint, i), t({
							device: e,
							stream: i
						})
					}).catch(function(e) {
						n(e)
					})
				}
			}, {
				key: "_initAudioStream",
				value: function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new MediaStream;
					this.localAudioStreamFromMIC = t, this.localAudioStream || this.webAudio ? this.updateStream(t) : (this.localAudioStream = t, this.adapterRef.instance._isSafari() || (this.webAudio = new c.WebAudio({
						stream: t,
						uid: this.uid,
						isAnalyze: !0,
						isRemote: this.isRemote
					}), 1 == this.isRemote ? this.remoteAudioStream = this.webAudio.outputStream : (this.localAudioStream = this.webAudio.outputStream, WEBRTCLOG.log("_initAudioStream, 本地音频: ", this.localAudioStream))), this.adapterRef.instance.judgeSendSdpOfferOrUpdate())
				}
			}, {
				key: "disableDevice",
				value: function() {
					WEBRTCLOG.log("AudioHelper: disableDevice: 暂停设备 Audio");
					var e = [];
					return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
						e.enabled = !1
					}), Promise.resolve()
				}
			}, {
				key: "enableDevice",
				value: function() {
					WEBRTCLOG.log("AudioHelper: enableDevice: 恢复设备 Audio");
					var e = [];
					return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
						e.enabled = !0
					}), Promise.resolve()
				}
			}, {
				key: "updateStream",
				value: function(e) {
					this.audioDomHelper.audioDom && e && (WEBRTCLOG.log("AudioHelper: updateStream : updateAudioTrack", e.getTracks()), 1 == this.isRemote ? (this.remoteAudioStream = e, WEBRTCLOG.log("remoteAudioStream:", this.remoteAudioStream)) : this.webAudio && (this.webAudio.updateStream(e), this.localAudioStream = this.webAudio.outputStream, WEBRTCLOG.log("updaStream，localAudioStream:", this.localAudioStream)))
				}
			}, {
				key: "getAudioVolume",
				value: function() {
					return this.webAudio && this.webAudio.getVolumeData() || 0
				}
			}, {
				key: "removeTrackFromMediaStream",
				value: function(e) {
					d.removeTrackFromMediaStream(e)
				}
			}, {
				key: "destroyMedia",
				value: function() {
					WEBRTCLOG.log("audioHelper: stopDevice: 销毁音频流 " + this.uid + ", localAudioStream:\n", this.localAudioStreamFromMIC), this.adapterRef.instance._isSafari() ? this.disableDevice() : (d.removeTrackFromMediaStream(this.localAudioStreamFromMIC), this.localAudioStreamFromMIC = null)
				}
			}, {
				key: "getLocalAudioStream",
				value: function() {
					return this.localAudioStream
				}
			}, {
				key: "hasStartAudioDeviceRepeat",
				value: function(e) {
					return this.localAudioStreamFromMIC && this.constraint.audio.deviceId == e.deviceId ? (this.enableDevice(), Promise.reject("设备已开启，重复操作")) : (this.localAudioStreamFromMIC && this.stopAudioDevice(), Promise.resolve())
				}
			}, {
				key: "checkMediaTrackBySDP",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						t = e.audio,
						n = e.sdp,
						r = e.uid,
						i = {
							audio: !1
						},
						a = l.parse(n),
						o = t && t.getAudioTracks()[0];
					return WEBRTCLOG.log(r + " checkMediaTrackBySDP ----\x3e track status", a), o && WEBRTCLOG.log("webrtc::checkMediaTrackBySDP audioTrack ----\x3e ", o), i.audio = o && "ended" !== o.readyState && new RegExp(o.id).test(n), i
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AudioHelper:destroy "), this.audioDomHelper && (this.audioDomHelper.destroy(), this.audioDomHelper = null), this._resetStateParam()
				}
			}]), t
		}(s.EventEmitter);
		t.AudioHelper = h
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.MediaRecordHelper = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(10),
			c = n(127);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
				return n._reset(), window.addEventListener("beforeunload", function(e) {
					if(WEBRTCLOG.log("beforeunload event fire: will stop recording"), !0 === n.checkIsRecording()) {
						n.stop();
						return(e || window.event).returnValue = "o/", "o/"
					}
				}), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "start",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
							uid: 0,
							account: "",
							type: "video"
						};
					return n.uid || n.account ? t ? window.MediaRecorder && MediaRecorder.isTypeSupported ? (this.stream = t, this.option = n, "audio" === n.type ? this.contentTypes = ["audio/wav", "audio/ogg", "audio/pcm", "audio/webm"] : this.contentTypes = ["video/mp4;codecs=opus", "video/webm", "video/webm;codecs=h264", "video/x-matroska;codecs=opus", "video/invalid"], (this.mimeType = this._validation(this.contentTypes)[0]) ? this.isRecording ? Promise.reject("音视频正在录制中，请勿重复操作") : this._format().then(function() {
						return e._start()
					}).catch(function(e) {
						return Promise.reject(e)
					}) : Promise.reject("当前浏览器不支持对应格式的视频录制")) : (WEBRTCLOG.log("MediaRecordHelper: start : 当前浏览器不支持音视频录制功能"), Promise.reject("当前浏览器不支持音视频录制功能")) : (WEBRTCLOG.log("MediaRecordHelper: start : stream流数据为空"), Promise.reject("获取视频流失败")) : (WEBRTCLOG.log("MediaRecordHelper: start : option参数缺失"), Promise.reject("需要录制的帐号缺失"))
				}
			}, {
				key: "stop",
				value: function(e) {
					var t = this;
					return this.isRecording && this.recorder ? (this.status = "stopped", WEBRTCLOG.log("MediaRecordHelper: stop start : " + this.recorder.state), "inactive" === this.recorder.state ? (WEBRTCLOG.warn("MediaRecordHelper: stop stopped: this.recorder.state"), Promise.reject("音视频录制已结束，请勿重复操作")) : new Promise(function(n, r) {
						t.recorder.onstop = function() {
							t._onStop(), n()
						};
						var i = (t.option.account || t.option.uid) + "--" + Date.now() + "--" + (t.option.type || "video");
						t.fileName = e || i, t.recorder.stop()
					})) : Promise.reject("请先开启音视频录制")
				}
			}, {
				key: "leave",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
						uid: 0
					};
					if(this.isRecording && this.recorder) {
						var t = e.uid;
						t && this.option && this.option && t === +this.option.uid && this.stop()
					}
				}
			}, {
				key: "pause",
				value: function() {
					this.recorder && this.recorder.pause()
				}
			}, {
				key: "resume",
				value: function() {
					this.recorder && this.recorder.resume()
				}
			}, {
				key: "_reset",
				value: function() {
					this.recordedChunks = [], this.isRecording = !1, this.stream = null, this.option = null, this.contentTypes = [], this.mimeType = "", this.audioController = null, this.opStream = null, this.recorder = null, this.status = "", this.timer = null, this.fileName = null, this.recordId = 0
				}
			}, {
				key: "_validation",
				value: function(e) {
					return e.filter(function(e) {
						return MediaRecorder.isTypeSupported(e)
					})
				}
			}, {
				key: "_format",
				value: function() {
					var e = this,
						t = this.stream,
						n = this.option;
					return new Promise(function(r, i) {
						var a = new MediaStream;
						return e._matchLocalStreamConstructor(t.constructor) && (t = [t]), t.constructor !== Array ? i("音视频录制输入错误") : "audio" === n.type ? (e.audioController = new c.WebAudio({
							stream: t,
							uid: n.uid
						}), e.opStream = e.audioController.outputStream, r()) : (t.forEach(function(t) {
							t && e._matchLocalStreamConstructor(t.constructor) && t.getTracks().forEach(function(e) {
								a.addTrack(e)
							})
						}), 0 === a.getTracks().length ? i("当前没有任何音视频数据，无法进行录制") : (e.opStream = a, void r()))
					})
				}
			}, {
				key: "_matchLocalStreamConstructor",
				value: function(e) {
					return /(LocalMediaStream|MediaStream)/.test(e)
				}
			}, {
				key: "_start",
				value: function() {
					var e = {
							audioBitsPerSecond: 128e3,
							videoBitsPerSecond: 25e5,
							mimeType: this.mimeType
						},
						t = this.recorder = new MediaRecorder(this.opStream, e);
					return t.ondataavailable = this._onDataAvailable.bind(this), t.onstop = this._onStop.bind(this), this.isRecording = !0, this.status = "started", this.recordId += 1, this.recorder.start(), this._startTimer(), Promise.resolve(this.option)
				}
			}, {
				key: "updateRecordStream",
				value: function(e) {}
			}, {
				key: "_startTimer",
				value: function() {
					var e = this;
					this.timer || (this.timer = setInterval(function() {
						WEBRTCLOG.log("MediaRecordHelper: startTimer " + (new Date).toLocaleString() + " --\x3e MediaRecorder status: " + e.recorder.state)
					}, 2e3))
				}
			}, {
				key: "_onStop",
				value: function() {
					if(WEBRTCLOG.log("MediaRecordHelper: onstop"), "stopped" !== this.status) return this._start();
					var e = new Blob(this.recordedChunks, {
							type: this.mimeType
						}),
						t = URL.createObjectURL(e),
						n = document.createElement("a");
					document.body.appendChild(n), n.style = "display: none", n.href = t, n.download = (this.fileName || Date.now()) + ".webm", n.click(), window.URL.revokeObjectURL(t), this._destroy(), this._clearTimer()
				}
			}, {
				key: "_destroy",
				value: function() {
					this.stream = null, this.recorder = null, this.recordedChunks = [], this.isRecording = !1, this.audioController && this.audioController.destroy(), this.audioController = null, this.fileName = "", this.option = {}, this.status = ""
				}
			}, {
				key: "_clearTimer",
				value: function() {
					this.timer && (clearInterval(this.timer), this.timer = null)
				}
			}, {
				key: "_onDataAvailable",
				value: function(e) {
					if(WEBRTCLOG.log("MediaRecordHelper: ondataavailable data received"), !(e.data.size > 0)) return this.stop(), Promise.reject("获取视频流失败");
					this.recordedChunks.push(e.data)
				}
			}, {
				key: "checkIsRecording",
				value: function() {
					return this.isRecording
				}
			}]), t
		}(s.EventEmitter);
		t.MediaRecordHelper = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.MediaDeviceHelper = void 0;
		var r = c(n(1)),
			i = c(n(4)),
			a = c(n(3)),
			o = c(n(2)),
			s = n(10);

		function c(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var d = (0, n(11).getGlobal)(),
			u = function(e) {
				function t() {
					(0, r.default)(this, t);
					var e = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					return e.devicesCache = {}, e.deviceChangeCheckTimer = null, e._init(), e
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "_init",
					value: function() {
						var e = this;
						WEBRTCLOG.log("MediaDeviceHelper:_init"), this._getDevices(function(t) {
							e.devicesCache = e._transformDeviceData(t), e._registerDeviceChangeEvent()
						}, function(e) {
							WEBRTCLOG.error("MediaDeviceHelper:_init 获取可用设备列表失败：", e)
						})
					}
				}, {
					key: "_registerDeviceChangeEvent",
					value: function() {
						WEBRTCLOG.log("MediaDeviceHelper:_registerDeviceChangeEvent"), navigator.mediaDevices.ondevicechange = this._onDeviceChangeHandler.bind(this)
					}
				}, {
					key: "_onDeviceChangeHandler",
					value: function(e) {
						var t = this;
						WEBRTCLOG.log("MediaDeviceHelper:_onDeviceChangeHandler"), this.deviceChangeCheckTimer && (d.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer = null);
						var n = Object.assign({}, this.devicesCache);
						this.deviceChangeCheckTimer = d.setTimeout(function() {
							t._getDevices(function(e) {
								t.devicesCache = t._transformDeviceData(e), t.emit("deviceStatus", t.devicesCache), t._filterDeviceChange(t.devicesCache, n)
							}, function(e) {
								WEBRTCLOG.error("MediaDeviceHelper:_onDeviceChangeHandler 获取可用设备列表失败：", e)
							})
						}, 500)
					}
				}, {
					key: "_filterDeviceChange",
					value: function(e, t) {
						var n = function(e) {
								var t = {};
								return Object.keys(e).forEach(function(n) {
									e[n].forEach(function(e) {
										t[n + e.deviceId] = Object.assign({}, e, {
											type: n
										})
									})
								}), t
							},
							r = n(e),
							i = n(t),
							a = Object.keys(r),
							o = Object.keys(i);
						if(a.length > o.length) {
							var s = [];
							a.forEach(function(e) {
								-1 === o.indexOf(e) && s.push(r[e])
							}), s.length && this.emit("deviceAdd", s)
						} else {
							var c = [];
							o.forEach(function(e) {
								-1 === a.indexOf(e) && c.push(i[e])
							}), c.length && this.emit("deviceRemove", c)
						}
					}
				}, {
					key: "_getDevices",
					value: function(e, t) {
						if(WEBRTCLOG.log("MediaDeviceHelper:_getDevices 开始获取设备列表"), !navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
							return WEBRTCLOG.error("enumerateDevices 接口不支持"), void t("enumerateDevices 接口不支持")
						}
						navigator.mediaDevices.enumerateDevices().then(e).catch(t)
					}
				}, {
					key: "_transformDeviceData",
					value: function(e) {
						WEBRTCLOG.log("MediaDeviceHelper:_transformDeviceData 转换设备列表");
						var t = {
							video: [],
							audioIn: [],
							audioOut: []
						};
						return 0 === e.length ? t : (e.forEach(function(e) {
							var n = void 0;
							switch(e.kind) {
								case "videoinput":
									n = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "camera " + (t.video.length + 1)
									}, t.video.push(n);
									break;
								case "audioinput":
									n = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "microphone " + (t.audioIn.length + 1)
									}, t.audioIn.push(n);
									break;
								case "audiooutput":
									n = {
										deviceId: e.deviceId,
										label: e.label ? e.label : "speaker " + (t.audioOut.length + 1)
									}, t.audioOut.push(n)
							}
						}), t)
					}
				}, {
					key: "getDevicesOfType",
					value: function(e) {
						var t = this;
						return new Promise(function(n, r) {
							t._getDevices(function(r) {
								var i = t._transformDeviceData(r);
								void 0 === e && n(i), n(i[e])
							}, function(e) {
								WEBRTCLOG.error("MediaDeviceHelper:getDevicesOfType 获取可用设备列表失败：", e), r(e)
							})
						})
					}
				}, {
					key: "getDeviceStatus",
					value: function() {
						var e = {
							hasAudioDevice: !1,
							hasVideoDevice: !1
						};
						return this.devicesCache && (this.devicesCache.audioIn && this.devicesCache.audioIn.length > 0 && (e.hasAudioDevice = !0), this.devicesCache.video && this.devicesCache.video.length > 0 && (e.hasVideoDevice = !0)), e
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("MediaDeviceHelper:destory"), this.devicesCache && (this.devicesCache = {}), this.deviceChangeCheckTimer && (d.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer = null)
					}
				}]), t
			}(s.EventEmitter);
		t.MediaDeviceHelper = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayProtocolHandler = void 0;
		var r = d(n(1)),
			i = d(n(4)),
			a = d(n(3)),
			o = d(n(2)),
			s = n(183),
			c = n(22);

		function d(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var u = function(e) {
			function t() {
				return(0, r.default)(this, t), (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "pack",
				value: function(e, t) {
					switch(e) {
						case c.WEBRTC_GATE_WAY_API.client_login.key:
							return this.generateClientLoginPackData(t);
						case c.WEBRTC_GATE_WAY_API.sdp_offer.key:
							return this.generateSdpOfferPackData(t);
						case c.WEBRTC_GATE_WAY_API.ice_offer.key:
							return this.generateIceOfferPackData(t);
						case c.WEBRTC_GATE_WAY_API.keep_alive.key:
							return this.generateKeepAlivePackData(t);
						case c.WEBRTC_GATE_WAY_API.sdp_update.key:
							return this.genearateSdkUpdatePackData(t);
						case c.WEBRTC_GATE_WAY_API.logout.key:
							return this.generateLogoutPackData(t);
						default:
							return null
					}
				}
			}, {
				key: "unpack",
				value: function(e) {
					try {
						e = JSON.parse(e)
					} catch(e) {
						return console.warn(e), null
					}
					switch(e.type) {
						case c.WEBRTC_GATE_WAY_API.login_ack.key:
							return this.parseLoginAckPackData(e);
						case c.WEBRTC_GATE_WAY_API.sdp_answer.key:
							return this.parseSdpAnswerPackData(e);
						case c.WEBRTC_GATE_WAY_API.ice_answer.key:
							return this.parseIceAnswerPackData(e);
						case c.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
							return this.parseKeepAliveAckPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_join.key:
							return this.parseClientJoinPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_update.key:
							return this.parseClientUpdatePackData(e);
						case c.WEBRTC_GATE_WAY_API.client_logout.key:
							return this.parseClientLogoutPackData(e);
						case c.WEBRTC_GATE_WAY_API.client_error.key:
							return this.parseClientErrorPackData(e);
						case c.WEBRTC_GATE_WAY_API.detect_network.key:
							return this.parseDetectNetworkResultPackData(e);
						default:
							return null
					}
				}
			}, {
				key: "generateClientLoginPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_LOGIN_OF_WEBRTC, e)
				}
			}, {
				key: "generateSdpOfferPackData",
				value: function(e) {
					return Object.assign(c.SDP_OFFER_OF_WEBRTC, e)
				}
			}, {
				key: "generateIceOfferPackData",
				value: function(e) {
					return Object.assign(c.ICE_OFFER_OF_WEBRTC, e)
				}
			}, {
				key: "generateKeepAlivePackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_OF_WEBRTC, e)
				}
			}, {
				key: "genearateSdkUpdatePackData",
				value: function(e) {
					return Object.assign(c.SDP_UPDATE_OF_WEBRTC, e)
				}
			}, {
				key: "generateLogoutPackData",
				value: function(e) {
					return Object.assign(c.LOGOUT_OF_WEBRTC, e)
				}
			}, {
				key: "parseLoginAckPackData",
				value: function(e) {
					return Object.assign(c.LOGIN_ACK_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientJoinPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_JOIN_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientUpdatePackData",
				value: function(e) {
					return Object.assign(c.CLIENT_UPDATE_OF_WEBRTC, e)
				}
			}, {
				key: "parseKeepAliveAckPackData",
				value: function(e) {
					return Object.assign(c.KEEP_ALIVE_ACK_OF_WEBRTC, e)
				}
			}, {
				key: "parseSdpAnswerPackData",
				value: function(e) {
					return Object.assign(c.SDP_ANSWER_OF_WEBRTC, e)
				}
			}, {
				key: "parseIceAnswerPackData",
				value: function(e) {
					return Object.assign(c.ICE_ANSWER_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientLogoutPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_LOGOUT_OF_WEBRTC, e)
				}
			}, {
				key: "parseClientErrorPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_ERROR_OF_WEBRTC, e)
				}
			}, {
				key: "parseDetectNetworkResultPackData",
				value: function(e) {
					return Object.assign(c.CLIENT_DETECT_NETWORK_RESULT_WEBRTC, e)
				}
			}]), t
		}(s.AbstractProtocolHandler);
		t.WebRTCGateWayProtocolHandler = u
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(183);
		Object.defineProperty(t, "AbstractProtocolHandler", {
			enumerable: !0,
			get: function() {
				return r.AbstractProtocolHandler
			}
		});
		var i = n(306);
		Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
			enumerable: !0,
			get: function() {
				return i.WebRTCGateWayProtocolHandler
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWayManager = void 0;
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(11),
			d = n(155);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = (0, c.getGlobal)(),
			p = function(e) {
				function t(e) {
					(0, r.default)(this, t);
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
						i = e.url,
						o = e.context,
						s = e.keepAliveInterval4Second;
					return n.reset(), n.gateway = new d.WebRTCGateWay({
						url: i,
						protocolHandler: new d.WebRTCGateWayProtocolHandler
					}), n.context = o, n.keepAliveInterval4Second = s || 5, n
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "reset",
					value: function() {
						this.gateway = null, this.context = null, this.state = {
							hasLogined: !1
						}, this.cmd = {
							lastCmd: null
						}, this.keepAliveInterval4Second = 5, this.keepAliveTimer = null, this.keepAliveTimer && (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
					}
				}, {
					key: "setState",
					value: function(e) {
						var t = e.hasLogined,
							n = e.waiting4Message;
						void 0 !== t && (this.state.hasLogined = t), void 0 !== n && (this.state.waiting4Message = n)
					}
				}, {
					key: "startKeepAliveTimer",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:startKeepAliveTimer "), this.keepAliveTimer && this.stopKeepAliveTimer(), this.doSendKeepAliveTask()
					}
				}, {
					key: "stopKeepAliveTimer",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:stopKeepAliveTimer "), this.keepAliveTimer && (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
					}
				}, {
					key: "doSendKeepAliveTask",
					value: function() {
						WEBRTCLOG.error("心跳包发送逻辑未在子类实现")
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("AbstractGateWayManager:destroy"), this.gateway && (this.gateway.destroy(), this.reset())
					}
				}]), t
			}(s.EventEmitter);
		t.AbstractGateWayManager = p
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWayManager = void 0;
		var r = l(n(1)),
			i = l(n(4)),
			a = l(n(3)),
			o = l(n(121)),
			s = l(n(2)),
			c = n(308),
			d = n(22),
			u = n(184);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = (0, n(11).getGlobal)(),
			f = function(e) {
				function t(e) {
					(0, r.default)(this, t);
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return n._bindGateWayEvent(), n
				}
				return(0, s.default)(t, e), (0, i.default)(t, [{
					key: "_bindGateWayEvent",
					value: function() {
						this.gateway.on("open", this.doSendClientLogin.bind(this)), this.gateway.on("message", this._handleMessage.bind(this)), this.gateway.on("close", this._handleClose.bind(this)), this.gateway.on("error", this._handleError.bind(this))
					}
				}, {
					key: "_unbindGateWayEvent",
					value: function() {
						this.gateway.removeListener("open", this.doSendClientLogin.bind(this)), this.gateway.removeListener("message", this._handleMessage.bind(this)), this.gateway.removeListener("close", this._handleClose.bind(this)), this.gateway.removeListener("error", this._handleError.bind(this))
					}
				}, {
					key: "_handleMessage",
					value: function(e) {
						var t = 0,
							n = null,
							r = null;
						switch(e.type) {
							case d.WEBRTC_GATE_WAY_API.login_ack.key:
								if(200 != (t = e.params.auth_res)) return this.setState({
									hasLogined: !1
								}), void this.emit("login", {
									success: !1
								});
								WEBRTCLOG.warn("登录成功，设置状态"), this.setState({
									hasLogined: !0
								}), this.startKeepAliveTimer(), this.emit("login", {
									success: !0
								});
								break;
							case d.WEBRTC_GATE_WAY_API.sdp_answer.key:
								if(200 != (t = e.params.auth_res)) return void this.emit("sdpAnswer", {
									success: !1
								});
								n = e.params.content, this.emit("sdpAnswer", {
									success: !0,
									code: t,
									dst_id: e.params.dst_id,
									type: n.type,
									sdp: n.sdp
								});
								break;
							case d.WEBRTC_GATE_WAY_API.ice_answer.key:
								n = e.params.content, this.emit("iceAnswer", {
									dst_id: e.params.dst_id,
									candidate: n.candidate,
									sdpMid: n.sdpMid,
									sdpMLineIndex: n.sdpMLineIndex
								});
								break;
							case d.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
								this.doSendKeepAliveTask();
								break;
							case d.WEBRTC_GATE_WAY_API.client_join.key:
								r = e.params, this.emit("userJoin", {
									client_id: r.client_id,
									has_audio: r.has_audio,
									has_video: r.has_video
								});
								break;
							case d.WEBRTC_GATE_WAY_API.client_update.key:
								r = e.params, this.emit("userUpdate", {
									client_id: r.client_id,
									has_audio: r.has_audio,
									has_video: r.has_video
								});
								break;
							case d.WEBRTC_GATE_WAY_API.client_logout.key:
								n = e.params.content, this.emit("userLeave", {
									uid: e.uid,
									logout_type: n.logout_type,
									timestamp: n.timestamp
								});
								break;
							case d.WEBRTC_GATE_WAY_API.client_error.key:
								n = e.params.content, this.emit("clientError", {
									uid: e.uid,
									error_code: n.error_code,
									timestamp: n.timestamp
								});
								break;
							case d.WEBRTC_GATE_WAY_API.detect_network.key:
								n = e, console.warn("网关反馈网络探测结果, content: ", n), this.emit("detectNetwork", {
									uid: e.uid,
									content: n
								})
						}
					}
				}, {
					key: "_handleClose",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayManager:_handleClose <- ", e), this.emit("close", e)
					}
				}, {
					key: "_handleError",
					value: function(e) {
						WEBRTCLOG.log("WebRTCGateWayManager:_handleError <- ", e), this.emit("error", e)
					}
				}, {
					key: "doSendKeepAliveTask",
					value: function() {
						var e = this;
						this.context && this.context.browser && this.context.browser.name && this.context.browser.version ? this.keepAliveTimer = p.setTimeout(function() {
							e.state && e.state.hasLogined && e.doSendKeepAlive({
								browser: {
									name: e.context.browser.name,
									version: e.context.browser.version
								},
								params: {
									content: {
										timestamp: "" + Date.now()
									}
								}
							})
						}, 1e3 * this.keepAliveInterval4Second) : WEBRTCLOG.error("WebRTCGateWayManager:doSendKeepAliveTask 上下文字段不存在")
					}
				}, {
					key: "doSendClientLogin",
					value: function() {
						if(!this.state || !this.state.hasLogined) {
							this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.client_login.key;
							var e = {
									uid: this.context.uid,
									cid: this.context.cid,
									hasAudio: this.context.hasAudio,
									hasVideo: this.context.hasVideo,
									netDetect: this.context.netDetect,
									session_mode: this.context.session_mode,
									params: this.context.params,
									browser: this.context.browser,
									bypass_rtmp: this.context.bypass_rtmp,
									record: this.context.record
								},
								t = new u.WebRTCGateWayContext(e),
								n = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.client_login.key, t),
								r = this.gateway.send(n);
							if(r.code !== d.GATE_WAY_RESPONSE_CODE.OK) return WEBRTCLOG.error("WebRTCGateWayManager:doSendClientLogin:send fail, code=%s", r.code), void this.setState({
								hasLogined: !1
							});
							WEBRTCLOG.log("WebRTCGateWayManager:doSendClientLogin:send success")
						}
					}
				}, {
					key: "doSendSdpOffer",
					value: function(e) {
						this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.sdp_offer.key;
						var t = e.hasAudio,
							n = e.hasVideo,
							r = e.session_mode,
							i = e.params,
							a = e.browser,
							o = e.bypass_rtmp,
							s = e.record,
							c = {
								uid: this.context.uid,
								cid: this.context.cid,
								hasAudio: t || this.context.hasAudio,
								hasVideo: n || this.context.hasVideo,
								session_mode: r || this.context.session_mode,
								params: i,
								browser: a || this.context.browser,
								bypass_rtmp: o || this.context.bypass_rtmp,
								record: s || this.context.record
							},
							l = new u.WebRTCGateWayContext(c),
							p = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.sdp_offer.key, l);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpOffer -> ", p);
						var f = this.gateway.send(p);
						f.code === d.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpOffer:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendSdpOffer:send fail, code=%s", f.code)
					}
				}, {
					key: "doSendIceOffer",
					value: function(e) {
						this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.ice_offer.key;
						var t = e.params,
							n = {
								uid: this.context.uid,
								cid: this.context.cid,
								params: t
							},
							r = new u.WebRTCGateWayContext(n),
							i = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.ice_offer.key, r),
							a = this.gateway.send(i);
						a.code === d.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendIceOffer:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendIceOffer:send fail, code=%s", a.code)
					}
				}, {
					key: "doSendSdpUpdate",
					value: function(e) {
						this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.sdp_update.key;
						var t = e.hasAudio,
							n = e.hasVideo,
							r = e.session_mode,
							i = e.params,
							a = e.browser,
							o = e.bypass_rtmp,
							s = e.record,
							c = {
								uid: this.context.uid,
								cid: this.context.cid,
								hasAudio: t || this.context.hasAudio,
								hasVideo: n || this.context.hasVideo,
								session_mode: r || this.context.session_mode,
								params: i,
								browser: a || this.context.browser,
								bypass_rtmp: o || this.context.bypass_rtmp,
								record: s || this.context.record
							},
							l = new u.WebRTCGateWayContext(c),
							p = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.sdp_update.key, l);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpUpdate");
						var f = this.gateway.send(p);
						f.code === d.GATE_WAY_RESPONSE_CODE.OK ? WEBRTCLOG.log("WebRTCGateWayManager:doSendSdpUpdate:send success") : WEBRTCLOG.error("WebRTCGateWayManager:doSendSdpUpdate:send fail, code=%s", f.code)
					}
				}, {
					key: "doSendKeepAlive",
					value: function(e) {
						var t = e.browser,
							n = e.params,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								browser: t || this.context.browser,
								params: n
							},
							i = new u.WebRTCGateWayContext(r),
							a = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.keep_alive.key, i),
							o = this.gateway.send(a);
						o.code !== d.GATE_WAY_RESPONSE_CODE.OK && WEBRTCLOG.warn("WebRTCGateWayManager:doSendKeepAlive:send fail, code=%s", o.code)
					}
				}, {
					key: "doSendLogout",
					value: function(e) {
						var t = e.browser,
							n = e.params,
							r = {
								uid: this.context.uid,
								cid: this.context.cid,
								browser: t || this.context.browser,
								params: n
							},
							i = new u.WebRTCGateWayContext(r),
							a = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.logout.key, i);
						WEBRTCLOG.log("WebRTCGateWayManager:doSendLogout -> ", a);
						var o = this.gateway.send(a);
						o.code === d.GATE_WAY_RESPONSE_CODE.OK ? (WEBRTCLOG.log("WebRTCGateWayManager:doSendLogout:send success"), this.setState({
							hasLogined: !1
						}), this.stopKeepAliveTimer()) : WEBRTCLOG.error("WebRTCGateWayManager:doSendLogout:send fail, code=%s", o.code)
					}
				}, {
					key: "destroy",
					value: function() {
						WEBRTCLOG.log("WebRTCGateWayManager:destroy"), this._unbindGateWayEvent(), (0, o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
					}
				}]), t
			}(c.AbstractGateWayManager);
		t.WebRTCGateWayManager = f
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWayContext = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.AbstractGateWayContext = function e(t) {
			(0, a.default)(this, e);
			var n = t.uid,
				r = t.cid;
			this.uid = n, this.cid = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.WEBRTC_GATE_WAY_API = {
			client_login: {
				key: "client_login",
				label: "登录"
			},
			login_ack: {
				key: "login_ack",
				label: "登录响应"
			},
			sdp_offer: {
				key: "sdp_offer",
				label: "发送sdp offer描述"
			},
			sdp_answer: {
				key: "sdp_answer",
				label: "sdp answer响应"
			},
			ice_offer: {
				key: "ice_offer",
				label: "发送ice offer描述"
			},
			ice_answer: {
				key: "ice_answer",
				label: "ice answer响应"
			},
			keep_alive: {
				key: "keep_alive",
				label: "信令层探活"
			},
			keep_alive_ack: {
				key: "keep_alive_ack",
				label: "信令层探活响应"
			},
			sdp_update: {
				key: "sdp_update",
				label: "sdp更新（关闭/打开设备时发送）"
			},
			client_join: {
				key: "client_join",
				label: "人员加入通知"
			},
			client_update: {
				key: "client_update",
				label: "人员更新（关闭/打开设备时发送）"
			},
			client_logout: {
				key: "client_logout",
				label: "人员离开"
			},
			logout: {
				key: "logout",
				label: "退出"
			},
			client_error: {
				key: "client_error",
				label: "客户端出现错误"
			},
			detect_network: {
				key: "net_detect_result",
				label: "网关反馈网络探测结果"
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SDP_ANSWER_OF_WEBRTC = {
			type: "sdp_answer",
			uid: "",
			cid: "",
			params: {
				auth_res: 200,
				dst_id: "",
				content: {
					type: "answer",
					sdp: ""
				}
			}
		}, t.SDP_OFFER_OF_WEBRTC = {
			type: "sdp_offer",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			session_mode: "p2p",
			params: {
				content: {
					type: "offer",
					sdp: ""
				},
				dst_id: "",
				user_token_type: 0,
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1
			}
		}, t.SDP_UPDATE_OF_WEBRTC = {
			type: "sdp_update",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			session_mode: "p2p",
			params: {
				content: {
					type: "offer",
					sdp: ""
				},
				dst_id: "",
				user_token_type: 0,
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.LOGIN_ACK_OF_WEBRTC = {
			type: "login_ack",
			uid: "",
			cid: "",
			params: {
				auth_res: 200
			}
		}, t.LOGOUT_OF_WEBRTC = {
			type: "logout",
			uid: "",
			cid: "",
			browser: {
				name: "",
				version: ""
			},
			params: {
				content: {
					timestamp: 0
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.KEEP_ALIVE_OF_WEBRTC = {
			type: "keep_alive",
			uid: "",
			cid: "",
			browser: {
				name: "",
				version: ""
			},
			params: {
				content: {
					timestamp: 0
				}
			}
		}, t.KEEP_ALIVE_ACK_OF_WEBRTC = {
			type: "keep_alive_ack",
			uid: "",
			cid: "",
			params: {
				content: {
					timestamp: 0
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ICE_ANSWER_OF_WEBRTC = {
			type: "ice_answer",
			uid: "",
			cid: "",
			params: {
				dst_id: "",
				content: {
					candidate: "",
					sdpMid: "",
					sdpMLineIndex: ""
				}
			}
		}, t.ICE_OFFER_OF_WEBRTC = {
			type: "ice_offer",
			uid: "",
			cid: "",
			params: {
				dst_id: "",
				content: {
					candidate: "",
					sdpMid: "",
					sdpMLineIndex: "",
					usernameFragment: ""
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CLIENT_LOGIN_OF_WEBRTC = {
			type: "client_login",
			uid: "",
			cid: "",
			hasAudio: !0,
			hasVideo: !0,
			netDetect: !1,
			session_mode: "p2p",
			params: {
				content: {},
				dst_id: "",
				user_token_type: 0,
				token: "",
				user_type: 3,
				version: 1,
				is_multi_peerconnection: !0,
				sdk_version: "5.4.0",
				streamSetting: {
					video: {
						width: 640,
						height: 480,
						frameRate: 20
					}
				}
			},
			browser: {
				name: "",
				version: ""
			},
			bypass_rtmp: {
				is_host: !1,
				support_bypass_rtmp: !1,
				support_bypass_rtmp_record: !1,
				bypass_rtmp_url: "",
				layout: "",
				participant_mode: ""
			},
			record: {
				support_audio_record: !1,
				support_video_record: !1,
				single_record_in_meeting: !1
			}
		}, t.CLIENT_LOGOUT_OF_WEBRTC = {
			type: "client_logout",
			uid: "",
			cid: "",
			params: {
				content: {
					logout_type: "normal",
					timestamp: 0
				}
			}
		}, t.CLIENT_JOIN_OF_WEBRTC = {
			type: "client_join",
			uid: "",
			cid: "",
			params: {
				client_id: "123122",
				has_audio: !0,
				has_video: !0
			}
		}, t.CLIENT_UPDATE_OF_WEBRTC = {
			type: "client_update",
			uid: "",
			cid: "",
			params: {
				client_id: "123122",
				has_audio: !0,
				has_video: !0
			}
		}, t.CLIENT_DETECT_NETWORK_RESULT_WEBRTC = {
			type: "net_detect_result",
			uid: "",
			cid: "",
			params: {
				dst_id: "",
				loss: "",
				rtt: ""
			}
		}, t.CLIENT_ERROR_OF_WEBRTC = {
			type: "client_error",
			uid: "",
			cid: "",
			params: {
				content: {
					error_code: "",
					timestamp: 0
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(316);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_JOIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_LOGIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_ERROR_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_UPDATE_OF_WEBRTC
			}
		});
		var i = n(315);
		Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.ICE_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return i.ICE_OFFER_OF_WEBRTC
			}
		});
		var a = n(314);
		Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		});
		var o = n(313);
		Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return o.LOGIN_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return o.LOGOUT_OF_WEBRTC
			}
		});
		var s = n(312);
		Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.SDP_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.SDP_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.SDP_UPDATE_OF_WEBRTC
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(317);
		Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_JOIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_LOGIN_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_ERROR_OF_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
			}
		}), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.CLIENT_UPDATE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.ICE_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.ICE_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.KEEP_ALIVE_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.KEEP_ALIVE_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.LOGIN_ACK_OF_WEBRTC
			}
		}), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.LOGOUT_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.SDP_ANSWER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.SDP_OFFER_OF_WEBRTC
			}
		}), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.SDP_UPDATE_OF_WEBRTC
			}
		});
		var i = n(311);
		Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
			enumerable: !0,
			get: function() {
				return i.WEBRTC_GATE_WAY_API
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.GATE_WAY_RESPONSE_CODE = {
			OK: "OK",
			NO_CONNECTION: "NO_CONNECTION"
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(319);
		Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return r.GATE_WAY_RESPONSE_CODE
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_NRTC_OPTION = void 0;
		var r = n(125);
		t.DEFAULT_NRTC_OPTION = new r.NRTCOption({
			container: null,
			remoteContainer: null,
			chromeId: null,
			debug: !1
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_WEBRTC_OPTION = void 0;
		var r = n(125);
		t.DEFAULT_WEBRTC_OPTION = new r.WebRTCOption({
			nim: null,
			container: null,
			remoteContainer: null,
			chromeId: null,
			debug: !1
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_NETCALL_OPTION = void 0;
		var r = n(125);
		t.DEFAULT_NETCALL_OPTION = new r.NetcallOption({
			kickLast: !1,
			nim: null,
			container: null,
			remoteContainer: null,
			mirror: !1,
			mirrorRemote: !1
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(323);
		Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_NETCALL_OPTION
			}
		});
		var i = n(322);
		Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		});
		var a = n(321);
		Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return a.DEFAULT_NRTC_OPTION
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				rtmpUrl: "",
				splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
				layout: ""
			};
		t.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC = new r.SessionConfig4Live(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordType: 0,
				isHostSpeaker: 0,
				rtmpUrl: "",
				splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
				layout: "",
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT = new r.SessionConfig4Live(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				liveEnable: !1
			};
		t.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC = new r.SessionConfig4Meeting(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				isHostSpeaker: !1,
				recordType: 0,
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT = new r.SessionConfig4Meeting(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordVideo: !1,
				recordAudio: !1,
				singleRecord: !1,
				isHostSpeaker: !1,
				recordType: "0",
				liveEnabled: !1
			};
		t.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC = new r.SessionConfig4P2P(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT = void 0;
		var r = n(70),
			i = n(77),
			a = {
				videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
				videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
				highAudio: !1,
				recordVideo: !1,
				recordAudio: !1,
				singleRecord: !1,
				isHostSpeaker: !1,
				recordType: 0,
				videoBitrate: 1e5,
				videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
			};
		t.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT = new r.SessionConfig4P2P(a)
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.DEFAULT_PUSH_CONFIG = void 0;
		var r = n(70);
		t.DEFAULT_PUSH_CONFIG = new r.PushConfig({
			enable: !0,
			needBadge: !0,
			needPushNick: !0,
			pushContent: "",
			custom: "",
			pushPayload: "",
			sound: !0
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(331);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_PUSH_CONFIG
			}
		});
		var i = n(330);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		});
		var a = n(329);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return a.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		});
		var o = n(328);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return o.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		});
		var s = n(327);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		});
		var c = n(326);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return c.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		});
		var d = n(325);
		Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return d.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(332);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return r.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		});
		var i = n(324);
		Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return i.DEFAULT_NRTC_OPTION
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SCALE_TYPE = {
			CHAT_VIDEO_SCALE_None: 0,
			CHAT_VIDEO_SCALE_1x1: 1,
			CHAT_VIDEO_SCALE_4x3: 2,
			CHAT_VIDEO_SCALE_16x9: 3
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.VIDEO_ENCODE_MODE = {
			CHAT_VIDEO_ENCODEMODE_NORMAL: 0,
			CHAT_VIDEO_ENCODEMODE_SMOOTH: 1,
			CHAT_VIDEO_ENCODEMODE_QUALITY: 2,
			CHAT_VIDEO_ENCODEMODE_SCREEN: 3
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DECTECT_TYPE = {
			NETDETECT_AUDIO: 0,
			NETDETECT_VIDEO: 1
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DECTECT_RESULT_TYPE = {
			CHAT_NET_STATUS_VERY_GOOD: 0,
			CHAT_NET_STATUS_GOOD: 1,
			CHAT_NET_STATUS_POOR: 2,
			CHAT_NET_STATUS_BAD: 3,
			CHAT_NET_STATUS_VERY_BAD: 4,
			CHAT_NET_STATUS_VERY_BAD_VIDEO_CLOSE: -1
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SESSION_MODE = {
			P2P: "p2p",
			MEETING: "meeting"
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.HANGUP_TYPE = {
			HANGUP_TYPE_NORMAL: 0,
			HANGUP_TYPE_TIMEOUT: -1
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.ROLE_FOR_MEETING = {
			ROLE_PLAYER: 0,
			ROLE_AUDIENCE: 1
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.MIX_VIDEO_MODE = {
			LAYOUT_TOP_LEFT: 1,
			LAYOUT_TOP_RIGHT: 2,
			LAYOUT_BOTTOM_LEFT: 3,
			LAYOUT_BOTTOM_RIGHT: 4
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.SPLIT_MODE = {
			LAYOUT_SPLITBOTTOMHORFLOATING: 0,
			LAYOUT_SPLITTOPHORFLOATING: 1,
			LAYOUT_SPLITLATTICETILE: 2,
			LAYOUT_SPLITLATTICECUTTINGTILE: 3,
			LAYOUT_SPLITCUSTOM: 4,
			LAYOUT_SPLITAUDIO: 5
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.NETCALL_TYPE = {
			NETCALL_TYPE_AUDIO: 1,
			NETCALL_TYPE_VIDEO: 2
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.DEVICE_TYPE = {
			DEVICE_TYPE_AUDIO_IN: 0,
			DEVICE_TYPE_AUDIO_OUT_LOCAL: 1,
			DEVICE_TYPE_AUDIO_OUT_CHAT: 2,
			DEVICE_TYPE_VIDEO: 3,
			DEVICE_TYPE_DESKTOP_SCREEN: 4,
			DEVICE_TYPE_DESKTOP_WINDOW: 5,
			DEVICE_TYPE_DESKTOP_CHROME_SCREEN: 6
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CONFIG_MAP = void 0;
		var r, i, a, o = n(158),
			s = (r = o) && r.__esModule ? r : {
				default: r
			};
		var c = {
			CURRENT: {
				SDK_TYPE: null
			},
			SDK_TYPE: {
				NETCALL: 1,
				WEBRTC: 2,
				WHITEBOARD: 3,
				NRTC: 4
			},
			SDK_NAME: {
				1: "Netcall",
				2: "WebRTC",
				3: "WhiteBoard",
				4: "NRTC"
			}
		};
		c.STATS_FUN = (i = {}, (0, s.default)(i, c.SDK_TYPE.NETCALL, 1), (0, s.default)(i, c.SDK_TYPE.WEBRTC, 1), (0, s.default)(i, c.SDK_TYPE.NRTC, 1), (0, s.default)(i, c.SDK_TYPE.WHITEBOARD, 0), i), c.STATS_RTC = (a = {}, (0, s.default)(a, c.SDK_TYPE.WEBRTC, 1), (0, s.default)(a, c.SDK_TYPE.NRTC, 1), (0, s.default)(a, c.SDK_TYPE.WHITEBOARD, 0), a), t.CONFIG_MAP = c
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.CONTROL_TYPE = {
			NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON: 1,
			NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF: 2,
			NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON: 3,
			NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF: 4,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO: 5,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE: 6,
			NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT: 7,
			NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO: 8,
			NETCALL_CONTROL_COMMAND_BUSY: 9,
			NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID: 10,
			NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND: 11,
			NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED: 12,
			NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START: 13,
			NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP: 14,
			NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID: 16
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.validateVideoFrameRate = function(e) {
			var t = Object.keys(r),
				n = !1;
			for(var i in t) r[i] === e && (n = !0);
			return n
		};
		var r = t.VIDEO_FRAME_RATE = {
			CHAT_VIDEO_FRAME_RATE_NORMAL: 0,
			CHAT_VIDEO_FRAME_RATE_5: 1,
			CHAT_VIDEO_FRAME_RATE_10: 2,
			CHAT_VIDEO_FRAME_RATE_15: 3,
			CHAT_VIDEO_FRAME_RATE_20: 4,
			CHAT_VIDEO_FRAME_RATE_25: 5
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.validateVideoQuality = function(e) {
			var t = Object.keys(r),
				n = !1;
			for(var i in t) r[i] === e && (n = !0);
			return n
		};
		var r = t.VIDEO_QUALITY = {
			CHAT_VIDEO_QUALITY_NORMAL: 0,
			CHAT_VIDEO_QUALITY_LOW: 1,
			CHAT_VIDEO_QUALITY_MEDIUM: 2,
			CHAT_VIDEO_QUALITY_HIGH: 3,
			CHAT_VIDEO_QUALITY_480P: 4,
			CHAT_VIDEO_QUALITY_540P: 5,
			CHAT_VIDEO_QUALITY_720P: 6,
			CHAT_VIDEO_QUALITY_1080P: 7
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelRequestParam4NRTC = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.JoinChannelRequestParam4NRTC = function e(t) {
			(0, a.default)(this, e);
			var n = t.appkey,
				r = t.cid,
				i = t.uid,
				o = t.token,
				s = t.turnToken,
				c = t.role,
				d = t.liveEnable,
				u = t.sessionMode,
				l = t.wssArr,
				p = t.sessionConfig;
			this.appkey = n, this.cid = r, this.uid = i, this.token = o, this.turnToken = s, this.role = c, this.liveEnable = d, this.sessionMode = u, this.wssArr = l, this.sessionConfig = p
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoViewRemoteSizeRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.SetVideoViewRemoteSizeRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.width,
				i = t.height,
				o = t.cut;
			this.account = n, this.width = r, this.height = i, this.cut = o
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoViewSizeRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.SetVideoViewSizeRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.width,
				r = t.height,
				i = t.cut;
			this.width = n, this.height = r, this.cut = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.StartRemoteStreamRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.StartRemoteStreamRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.node,
				i = t.poster;
			this.account = n, this.node = r, this.poster = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.StartDeviceRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.StartDeviceRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.type,
				r = t.device,
				i = t.width,
				o = t.height,
				s = t.account,
				c = t.uid;
			this.type = n, this.device = r, void 0 !== i && (this.width = i), void 0 !== o && (this.height = o), void 0 !== s && (this.account = s), void 0 !== c && (this.uid = c)
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SetVideoScaleRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.SetVideoScaleRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.type;
			this.account = n, this.type = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.JoinChannelRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.channelName,
				r = t.type,
				i = t.sessionConfig;
			this.channelName = n, this.type = r, this.sessionConfig = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CreateChannelRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.CreateChannelRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.channelName,
				r = t.custom,
				i = t.webrtcEnable;
			this.channelName = n, this.custom = r, this.webrtcEnable = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ControlRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.ControlRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.channelId,
				r = t.command;
			this.channelId = n, this.command = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ResponseRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.ResponseRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.accepted,
				r = t.beCalledInfo,
				i = t.sessionConfig,
				o = t.channelId,
				s = t.command;
			this.accepted = n, this.beCalledInfo = r, this.sessionConfig = i, this.channelId = o, this.command = s
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallRequestParam = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.CallRequestParam = function e(t) {
			(0, a.default)(this, e);
			var n = t.type,
				r = t.webrtcEnable,
				i = t.account,
				o = t.pushConfig,
				s = t.sessionConfig;
			this.type = n, this.webrtcEnable = r, this.account = i, this.pushConfig = o, this.sessionConfig = s
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(359);
		Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return r.CallRequestParam
			}
		});
		var i = n(358);
		Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return i.ResponseRequestParam
			}
		});
		var a = n(357);
		Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ControlRequestParam
			}
		});
		var o = n(356);
		Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return o.CreateChannelRequestParam
			}
		});
		var s = n(355);
		Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return s.JoinChannelRequestParam
			}
		});
		var c = n(354);
		Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return c.SetVideoScaleRequestParam
			}
		});
		var d = n(353);
		Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return d.StartDeviceRequestParam
			}
		});
		var u = n(352);
		Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return u.StartRemoteStreamRequestParam
			}
		});
		var l = n(351);
		Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return l.SetVideoViewSizeRequestParam
			}
		});
		var p = n(350);
		Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return p.SetVideoViewRemoteSizeRequestParam
			}
		});
		var f = n(349);
		Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return f.JoinChannelRequestParam4NRTC
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NRTCOption = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.NRTCOption = function e(t) {
			(0, a.default)(this, e);
			var n = t.container,
				r = t.remoteContainer,
				i = t.chromeId,
				o = t.debug;
			this.container = n, this.remoteContainer = r, this.chromeId = i, this.debug = o
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCOption = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.WebRTCOption = function e(t) {
			(0, a.default)(this, e);
			var n = t.nim,
				r = t.container,
				i = t.remoteContainer,
				o = t.chromeId,
				s = t.debug;
			this.nim = n, this.container = r, this.remoteContainer = i, this.chromeId = o, this.debug = s
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.NetcallOption = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.NetcallOption = function e(t) {
			(0, a.default)(this, e);
			var n = t.kickLast,
				r = t.nim,
				i = t.container,
				o = t.remoteContainer,
				s = t.mirror,
				c = t.mirrorRemote;
			this.kickLast = n, this.nim = r, this.container = i, this.remoteContainer = o, this.mirror = s, this.mirrorRemote = c
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4Live = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, r.default)(this, t), e.recordVideo = void 0, e.recordAudio = void 0, e.isHostSpeaker = void 0, e.recordType = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(n(126).SessionConfig);
		t.SessionConfig4Live = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4Meeting = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, r.default)(this, t), e.recordVideo = void 0, e.recordAudio = void 0, e.isHostSpeaker = void 0, e.recordType = void 0, e.rtmpUrl = void 0, e.splitMode = void 0, e.layout = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(n(126).SessionConfig);
		t.SessionConfig4Meeting = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.SessionConfig4P2P = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t(e) {
				return(0, r.default)(this, t), e.rtmpUrl = void 0, e.splitMode = void 0, e.layout = void 0, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
			}
			return(0, a.default)(t, e), t
		}(n(126).SessionConfig);
		t.SessionConfig4P2P = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.PushConfig = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.PushConfig = function e(t) {
			(0, a.default)(this, e);
			var n = t.enable,
				r = t.needBadge,
				i = t.needPushNick,
				o = t.pushContent,
				s = t.custom,
				c = t.pushPayload,
				d = t.sound;
			this.enable = n, this.needBadge = r, this.needPushNick = i, this.pushContent = o, this.custom = s, this.pushPayload = c, this.sound = d
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(70);
		Object.defineProperty(t, "PushConfig", {
			enumerable: !0,
			get: function() {
				return r.PushConfig
			}
		}), Object.defineProperty(t, "SessionConfig", {
			enumerable: !0,
			get: function() {
				return r.SessionConfig
			}
		}), Object.defineProperty(t, "SessionConfig4P2P", {
			enumerable: !0,
			get: function() {
				return r.SessionConfig4P2P
			}
		}), Object.defineProperty(t, "SessionConfig4Meeting", {
			enumerable: !0,
			get: function() {
				return r.SessionConfig4Meeting
			}
		}), Object.defineProperty(t, "SessionConfig4Live", {
			enumerable: !0,
			get: function() {
				return r.SessionConfig4Live
			}
		});
		var i = n(125);
		Object.defineProperty(t, "NetcallOption", {
			enumerable: !0,
			get: function() {
				return i.NetcallOption
			}
		}), Object.defineProperty(t, "WebRTCOption", {
			enumerable: !0,
			get: function() {
				return i.WebRTCOption
			}
		}), Object.defineProperty(t, "NRTCOption", {
			enumerable: !0,
			get: function() {
				return i.NRTCOption
			}
		});
		var a = n(360);
		Object.defineProperty(t, "CallRequestParam", {
			enumerable: !0,
			get: function() {
				return a.CallRequestParam
			}
		}), Object.defineProperty(t, "ResponseRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ResponseRequestParam
			}
		}), Object.defineProperty(t, "ControlRequestParam", {
			enumerable: !0,
			get: function() {
				return a.ControlRequestParam
			}
		}), Object.defineProperty(t, "CreateChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return a.CreateChannelRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam", {
			enumerable: !0,
			get: function() {
				return a.JoinChannelRequestParam
			}
		}), Object.defineProperty(t, "SetVideoScaleRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoScaleRequestParam
			}
		}), Object.defineProperty(t, "StartDeviceRequestParam", {
			enumerable: !0,
			get: function() {
				return a.StartDeviceRequestParam
			}
		}), Object.defineProperty(t, "StartRemoteStreamRequestParam", {
			enumerable: !0,
			get: function() {
				return a.StartRemoteStreamRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoViewSizeRequestParam
			}
		}), Object.defineProperty(t, "SetVideoViewRemoteSizeRequestParam", {
			enumerable: !0,
			get: function() {
				return a.SetVideoViewRemoteSizeRequestParam
			}
		}), Object.defineProperty(t, "JoinChannelRequestParam4NRTC", {
			enumerable: !0,
			get: function() {
				return a.JoinChannelRequestParam4NRTC
			}
		});
		var o = n(77);
		Object.defineProperty(t, "VIDEO_QUALITY", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_QUALITY
			}
		}), Object.defineProperty(t, "validateVideoQuality", {
			enumerable: !0,
			get: function() {
				return o.validateVideoQuality
			}
		}), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_FRAME_RATE
			}
		}), Object.defineProperty(t, "validateVideoFrameRate", {
			enumerable: !0,
			get: function() {
				return o.validateVideoFrameRate
			}
		}), Object.defineProperty(t, "CONTROL_TYPE", {
			enumerable: !0,
			get: function() {
				return o.CONTROL_TYPE
			}
		}), Object.defineProperty(t, "CONFIG_MAP", {
			enumerable: !0,
			get: function() {
				return o.CONFIG_MAP
			}
		}), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DECTECT_RESULT_TYPE
			}
		}), Object.defineProperty(t, "DECTECT_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DECTECT_TYPE
			}
		}), Object.defineProperty(t, "DEVICE_TYPE", {
			enumerable: !0,
			get: function() {
				return o.DEVICE_TYPE
			}
		}), Object.defineProperty(t, "NETCALL_TYPE", {
			enumerable: !0,
			get: function() {
				return o.NETCALL_TYPE
			}
		}), Object.defineProperty(t, "SCALE_TYPE", {
			enumerable: !0,
			get: function() {
				return o.SCALE_TYPE
			}
		}), Object.defineProperty(t, "SPLIT_MODE", {
			enumerable: !0,
			get: function() {
				return o.SPLIT_MODE
			}
		}), Object.defineProperty(t, "MIX_VIDEO_MODE", {
			enumerable: !0,
			get: function() {
				return o.MIX_VIDEO_MODE
			}
		}), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
			enumerable: !0,
			get: function() {
				return o.VIDEO_ENCODE_MODE
			}
		}), Object.defineProperty(t, "ROLE_FOR_MEETING", {
			enumerable: !0,
			get: function() {
				return o.ROLE_FOR_MEETING
			}
		}), Object.defineProperty(t, "HANGUP_TYPE", {
			enumerable: !0,
			get: function() {
				return o.HANGUP_TYPE
			}
		}), Object.defineProperty(t, "SESSION_MODE", {
			enumerable: !0,
			get: function() {
				return o.SESSION_MODE
			}
		});
		var s = n(333);
		Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_PUSH_CONFIG
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4P2P_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4P2P_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4MEETING_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4LIVE_4PCAGENT
			}
		}), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_SESSION_CONFIG_4LIVE_4WEBRTC
			}
		}), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_NETCALL_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_WEBRTC_OPTION
			}
		}), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
			enumerable: !0,
			get: function() {
				return s.DEFAULT_NRTC_OPTION
			}
		});
		var c = n(320);
		Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
			enumerable: !0,
			get: function() {
				return c.GATE_WAY_RESPONSE_CODE
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.LeaveChannelEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.LeaveChannelEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.channelId;
			this.account = n, this.channelId = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.RemoteTrackEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.RemoteTrackEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.track,
				r = t.account,
				i = t.channelId;
			this.track = n, this.account = r, this.channelId = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.JoinChannelEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.JoinChannelEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.channelId;
			this.account = n, this.channelId = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.ControlEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.ControlEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.channelId,
				r = t.command;
			this.channelId = n, this.command = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.HangupEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.HangupEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.timetag,
				r = t.channelId,
				i = t.account,
				o = t.type;
			this.timetag = n, this.channelId = r, this.account = i, this.type = o
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallerAckSyncEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.CallerAckSyncEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.timetag,
				r = t.channelId,
				i = t.type,
				o = t.accepted,
				s = t.fromClientType;
			this.timetag = n, this.channelId = r, this.type = i, this.accepted = o, this.fromClientType = s
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.CallResponseEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.CallResponseEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.type;
			this.account = n, this.type = r
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.BeCallingEvent = void 0;
		var r, i = n(1),
			a = (r = i) && r.__esModule ? r : {
				default: r
			};
		t.BeCallingEvent = function e(t) {
			(0, a.default)(this, e);
			var n = t.account,
				r = t.type,
				i = t.channelId;
			this.account = n, this.type = r, this.channelId = i
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(376);
		Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return r.BeCallingEvent
			}
		});
		var i = n(375);
		Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return i.CallResponseEvent
			}
		});
		var a = n(374);
		Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return a.CallerAckSyncEvent
			}
		});
		var o = n(373);
		Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return o.HangupEvent
			}
		});
		var s = n(372);
		Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return s.ControlEvent
			}
		});
		var c = n(371);
		Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return c.JoinChannelEvent
			}
		});
		var d = n(370);
		Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return d.RemoteTrackEvent
			}
		});
		var u = n(369);
		Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return u.LeaveChannelEvent
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.RTC_EVENTS = {
			error: {
				key: "error",
				label: "异常事件"
			},
			beCalling: {
				key: "beCalling",
				label: "收到呼叫通知"
			},
			callAccepted: {
				key: "callAccepted",
				label: "主叫收到被叫应答通知: 接受"
			},
			callRejected: {
				key: "callRejected",
				label: "主叫收到被叫应答通知: 拒绝"
			},
			control: {
				key: "control",
				label: "通话进行中收到对端的控制通知"
			},
			hangup: {
				key: "hangup",
				label: "收到挂断通知"
			},
			callerAckSync: {
				key: "callerAckSync",
				label: "其他端已处理的通知"
			},
			joinChannel: {
				key: "joinChannel",
				label: "收到用户加入房间的通知"
			},
			leaveChannel: {
				key: "leaveChannel",
				label: "收到用户离开房间的通知"
			},
			sessionDuration: {
				key: "sessionDuration",
				label: "通话计时"
			},
			audioVolume: {
				key: "audioVolume",
				label: "当前所有参与通话者的音量大小实时回调通知"
			},
			deviceAdd: {
				key: "deviceAdd",
				label: "设备新增通知"
			},
			deviceRemove: {
				key: "deviceRemove",
				label: "设备移除通知"
			},
			deviceStatus: {
				key: "deviceStatus",
				label: "设备状态变化通知"
			},
			remoteTrack: {
				key: "remoteTrack",
				label: "收到用户媒体流的通知"
			},
			addTrack: {
				key: "addTrack",
				label: "添加轨道事件"
			},
			removeTrack: {
				key: "removeTrack",
				label: "删除轨道事件"
			},
			remoteSignalClosed: {
				key: "remoteSignalClosed",
				label: "远端信令已关闭"
			},
			sessionConnected: {
				key: "sessionConnected",
				label: "会话已连接"
			}
		}
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r = n(378);
		Object.defineProperty(t, "RTC_EVENTS", {
			enumerable: !0,
			get: function() {
				return r.RTC_EVENTS
			}
		});
		var i = n(377);
		Object.defineProperty(t, "BeCallingEvent", {
			enumerable: !0,
			get: function() {
				return i.BeCallingEvent
			}
		}), Object.defineProperty(t, "CallResponseEvent", {
			enumerable: !0,
			get: function() {
				return i.CallResponseEvent
			}
		}), Object.defineProperty(t, "CallerAckSyncEvent", {
			enumerable: !0,
			get: function() {
				return i.CallerAckSyncEvent
			}
		}), Object.defineProperty(t, "HangupEvent", {
			enumerable: !0,
			get: function() {
				return i.HangupEvent
			}
		}), Object.defineProperty(t, "ControlEvent", {
			enumerable: !0,
			get: function() {
				return i.ControlEvent
			}
		}), Object.defineProperty(t, "JoinChannelEvent", {
			enumerable: !0,
			get: function() {
				return i.JoinChannelEvent
			}
		}), Object.defineProperty(t, "RemoteTrackEvent", {
			enumerable: !0,
			get: function() {
				return i.RemoteTrackEvent
			}
		}), Object.defineProperty(t, "LeaveChannelEvent", {
			enumerable: !0,
			get: function() {
				return i.LeaveChannelEvent
			}
		})
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.AbstractGateWay = void 0;
		var r = u(n(1)),
			i = u(n(4)),
			a = u(n(3)),
			o = u(n(2)),
			s = n(10),
			c = n(22),
			d = n(155);

		function u(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var l = function(e) {
			function t(e) {
				(0, r.default)(this, t);
				var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
				n.reset();
				var i = e.url,
					o = e.protocolHandler;
				return n.protocolHandler = o, n.initSocket(i), n
			}
			return(0, o.default)(t, e), (0, i.default)(t, [{
				key: "reset",
				value: function() {
					this.protocolHandler = null, this.url = "", this.ws = null, this.inited = !1
				}
			}, {
				key: "initSocket",
				value: function(e) {
					/^wss:\/\//.test(e) || (e = "wss://" + e), this.url = e, this.ws = new WebSocket(e);
					var t = this.ws;
					t.onopen = this.onOpen.bind(this), t.onmessage = this.onMessage.bind(this), t.onclose = this.onClose.bind(this), t.onerror = this.onError.bind(this)
				}
			}, {
				key: "onOpen",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onOpen"), this.inited = !0, this.emit("open", e)
				}
			}, {
				key: "onMessage",
				value: function(e) {
					var t = this.protocolHandler.unpack(e.data);
					null != t ? (this.protocolHandler.constructor === d.WebRTCGateWayProtocolHandler && t.type !== c.WEBRTC_GATE_WAY_API.keep_alive_ack.key && WEBRTCLOG.log("AbstractGateWay:onMessage <- ", e.data), this.emit("message", t)) : WEBRTCLOG.error("解包数据为空")
				}
			}, {
				key: "onClose",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onClose <- ", e), this.emit("close", e)
				}
			}, {
				key: "onError",
				value: function(e) {
					WEBRTCLOG.log("AbstractGateWay:onError <- ", e), this.emit("error", e)
				}
			}, {
				key: "send",
				value: function(e) {
					return this.protocolHandler.constructor === d.WebRTCGateWayProtocolHandler && e.type !== c.WEBRTC_GATE_WAY_API.keep_alive.key && WEBRTCLOG.log("AbstractGateWay:send -> ", JSON.stringify(e, null, "")), this.ws && this.ws.readyState === WebSocket.OPEN ? (this.ws.send(JSON.stringify(e)), {
						code: c.GATE_WAY_RESPONSE_CODE.OK
					}) : (WEBRTCLOG.log("AbstractGateWay:当前不能发送，等待ws连接成功之后发送"), {
						code: c.GATE_WAY_RESPONSE_CODE.NO_CONNECTION
					})
				}
			}, {
				key: "close",
				value: function() {
					WEBRTCLOG.log("AbstractGateWay:close"), this.ws && this.ws.close()
				}
			}, {
				key: "destroy",
				value: function() {
					WEBRTCLOG.log("AbstractGateWay:destroy"), this.close(), this.protocolHandler = null, this.url = null, this.ws.onopen = null, this.ws.onmessage = null, this.ws.onclose = null, this.ws.onerror = null, this.ws = null
				}
			}]), t
		}(s.EventEmitter);
		t.AbstractGateWay = l
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTCGateWay = void 0;
		var r = o(n(1)),
			i = o(n(3)),
			a = o(n(2));

		function o(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s = function(e) {
			function t() {
				return(0, r.default)(this, t), (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
			}
			return(0, a.default)(t, e), t
		}(n(380).AbstractGateWay);
		t.WebRTCGateWay = s
	}, function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.WebRTC = void 0;
		var r = p(n(1)),
			i = p(n(4)),
			a = p(n(3)),
			o = p(n(2)),
			s = p(n(121)),
			c = n(185),
			d = n(22),
			u = p(n(21)),
			l = n(31);

		function p(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var f = n(5),
			h = function(e) {
				function t(e) {
					(0, r.default)(this, t), e = Object.assign(d.DEFAULT_WEBRTC_OPTION, e), d.CONFIG_MAP.CURRENT.SDK_TYPE = d.CONFIG_MAP.SDK_TYPE.WEBRTC;
					var n = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
					return n.adapterRef.instance = n, n.adapterRef.nim = e.nim, n._initApiReportHelper(), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_initIMBusiness", n).call(n), /safari/gi.test(u.default.name) ? window.addEventListener("pagehide", n.beforeunload.bind(n)) : window.addEventListener("beforeunload", n.beforeunload.bind(n)), n
				}
				return(0, o.default)(t, e), (0, i.default)(t, [{
					key: "beforeunload",
					value: function() {
						console.log("beforeunload event fire", this.adapterRef.imInfo), this.adapterRef.imInfo && (this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P ? (WEBRTCLOG.log("===== 即将执行SDK内部的hangup逻辑"), this.adapterRef.instance.emit("hangup", {
							channelId: this.adapterRef.imInfo.cid,
							account: this.adapterRef.instance._getAccountByUid(this.adapterRef.imInfo.uid),
							type: 0
						}), this.hangup()) : this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.MEETING ? (this.adapterRef.instance.emit("leaveChannel", {
							account: this.adapterRef.instance._getAccountByUid(this.adapterRef.imInfo.uid),
							channelId: this.adapterRef.imInfo.cid
						}), this.leaveChannel()) : this.adapterRef.beCalledInfo && (WEBRTCLOG.log("===== 拒绝来电"), WEBRTCLOG.log("beCalledInfo:", this.adapterRef.beCalledInfo), this.control({
							channelId: this.adapterRef.beCalledInfo.channelId,
							command: d.CONTROL_TYPE.NETCALL_CONTROL_COMMAND_BUSY
						}), this.response({
							accepted: !1,
							beCalledInfo: this.adapterRef.beCalledInfo
						})))
					}
				}, {
					key: "isCurrentChannelId",
					value: function(e) {
						return this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
					}
				}, {
					key: "notCurrentChannelId",
					value: function(e) {
						return !this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
					}
				}, {
					key: "resetWhenHangup",
					value: function() {
						(0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_stopSession", this).call(this), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_resetStatus", this).call(this)
					}
				}, {
					key: "setIsPrivateDeployment",
					value: function(e) {
						this.adapterRef && (this.adapterRef.isPrivateDeployment = e)
					}
				}, {
					key: "setPrivateDeploymentConf",
					value: function(e) {
						e && e.turnServer || WEBRTCLOG.log("setPrivateDeploymentConf: 无效的参数"), this.adapterRef && (this.adapterRef.privateDeploymentConf = e)
					}
				}, {
					key: "setAudioBlack",
					value: function(e) {
						var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
						this.adapterRef.commonApi.setAudioBlack(t)
					}
				}, {
					key: "setAudioStart",
					value: function(e) {
						var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
						this.adapterRef.commonApi.setAudioStart(t)
					}
				}, {
					key: "setVideoBlack",
					value: function(e) {
						var t = this.adapterRef.account4UidMap[e];
						this.adapterRef.commonApi.setVideoBlack(t)
					}
				}, {
					key: "setVideoShow",
					value: function(e) {
						var t = this.adapterRef.account4UidMap[e];
						this.adapterRef.commonApi.setVideoShow(t)
					}
				}, {
					key: "startRtc",
					value: function() {
						return this.adapterRef.commonApi.startRtc()
					}
				}, {
					key: "initSignal",
					value: function() {
						return Promise.resolve()
					}
				}, {
					key: "setNetcallSession",
					value: function(e) {
						return this.adapterRef.p2p4WebRTCApi.setNetcallSession(e)
					}
				}, {
					key: "call",
					value: function(e) {
						return this.adapterRef.p2p4WebRTCApi.call(e)
					}
				}, {
					key: "response",
					value: function(e) {
						return this.setStartSessionTime(), this.adapterRef.p2p4WebRTCApi.response(e)
					}
				}, {
					key: "hangup",
					value: function() {
						this.setEndSessionTime(), this.adapterRef.p2p4WebRTCApi.hangup()
					}
				}, {
					key: "control",
					value: function(e) {
						this.adapterRef.p2p4WebRTCApi.control(e)
					}
				}, {
					key: "switchAudioToVideo",
					value: function() {
						this.adapterRef.p2p4WebRTCApi.switchAudioToVideo()
					}
				}, {
					key: "switchVideoToAudio",
					value: function() {
						this.adapterRef.p2p4WebRTCApi.switchVideoToAudio()
					}
				}, {
					key: "createChannel",
					value: function(e) {
						return this.adapterRef.meeting4WebRTCApi.createChannel(e)
					}
				}, {
					key: "joinChannel",
					value: function(e) {
						return this.setStartSessionTime(), this.adapterRef.meeting4WebRTCApi.joinChannel(e)
					}
				}, {
					key: "leaveChannel",
					value: function() {
						return this.setEndSessionTime(), this.adapterRef.meeting4WebRTCApi.leaveChannel()
					}
				}, {
					key: "getAccount",
					value: function() {
						if(this.adapterRef) {
							var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
							return e ? e.account : null
						}
					}
				}, {
					key: "getUid",
					value: function() {
						if(this.adapterRef) {
							var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
							return e ? e.uid : null
						}
					}
				}, {
					key: "changeRoleToPlayer",
					value: function() {
						return this.adapterRef.meeting4WebRTCApi.changeRoleToPlayer()
					}
				}, {
					key: "changeRoleToAudience",
					value: function() {
						return this.adapterRef.meeting4WebRTCApi.changeRoleToAudience()
					}
				}, {
					key: "setCaptureVolume",
					value: function(e) {
						this.adapterRef.captureApi.setCaptureVolume(e)
					}
				}, {
					key: "getDevicesOfType",
					value: function(e) {
						return this.adapterRef.deviceApi.getDevicesOfType(e)
					}
				}, {
					key: "startDevice",
					value: function(e) {
						return this.adapterRef.deviceApi.startDevice(e)
					}
				}, {
					key: "stopDevice",
					value: function(e) {
						if(this.adapterRef.imInfo) return this.adapterRef.deviceApi.stopDevice(e)
					}
				}, {
					key: "startLocalStream",
					value: function(e) {
						return this.adapterRef.playApi.startLocalStream(e)
					}
				}, {
					key: "stopLocalStream",
					value: function() {
						this.adapterRef.playApi.stopLocalStream()
					}
				}, {
					key: "startRemoteStream",
					value: function(e) {
						var t = e.account;
						return t && (e.account = this._getUidByAccount(t)), this.adapterRef.playApi.startRemoteStream(e)
					}
				}, {
					key: "stopRemoteStream",
					value: function(e) {
						if(this.adapterRef.imInfo) {
							var t = "";
							e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.stopRemoteStream(t)
						}
					}
				}, {
					key: "setPlayVolume",
					value: function(e, t) {
						var n = e;
						t && (n = {
							volume: e,
							uid: this._getUidByAccount(t)
						});
						return this.adapterRef.playApi.setPlayVolume(n)
					}
				}, {
					key: "setVideoViewSize",
					value: function(e) {
						return this.adapterRef.playApi.setVideoViewSize(e)
					}
				}, {
					key: "setVideoViewRemoteSize",
					value: function(e) {
						var t = e.account;
						return t && (e.account = this._getUidByAccount(t)), this.adapterRef.playApi.setVideoViewRemoteSize(e)
					}
				}, {
					key: "resumeLocalStream",
					value: function() {
						this.adapterRef.playApi.resumeLocalStream()
					}
				}, {
					key: "suspendLocalStream",
					value: function() {
						this.adapterRef.playApi.suspendLocalStream()
					}
				}, {
					key: "resumeRemoteStream",
					value: function(e) {
						var t = "";
						e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.resumeRemoteStream(t)
					}
				}, {
					key: "suspendRemoteStream",
					value: function(e) {
						var t = "";
						e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.suspendRemoteStream(t)
					}
				}, {
					key: "startRecordMp4",
					value: function(e) {
						var n = (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_getUidByAccount", this).call(this, e);
						return this.adapterRef.recordApi.startRecordMp4(n)
					}
				}, {
					key: "startRecordAac",
					value: function() {
						return this.adapterRef.recordApi.startRecordAac()
					}
				}, {
					key: "stopRecordMp4",
					value: function() {
						return this.adapterRef.recordApi.stopRecordMp4()
					}
				}, {
					key: "stopRecordAac",
					value: function() {
						return this.adapterRef.recordApi.stopRecordMp4()
					}
				}, {
					key: "updateRtmpHost",
					value: function(e) {
						var t = e.uid;
						return t ? this.adapterRef.meeting4NRTCApi.updateRtmpHost(t) : Promise.reject("nrtc: 请填写设置互动直播主画面操作uid！")
					}
				}, {
					key: "setMixConf",
					value: function(e) {
						if(e && void 0 !== e.enableMixVideo)
							if(!0 === e.enableMixVideo) {
								if(WEBRTCLOG.log("启动混频配置成功"), this.adapterRef.mixVideoConf = {}, this.adapterRef.mixVideoConf.videoLayout = e.videoLayout || d.MIX_VIDEO_MODE.LAYOUT_TOP_RIGHT, this.adapterRef.mixVideoConf.videoCompressSize = e.videoCompressSize || d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_LOW, !this.adapterRef.imInfo || !this.adapterRef.imInfo.uid) return;
								var t = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
								t && t.setMixConf()
							} else !1 === e.enableMixVideo && (WEBRTCLOG.log("取消混频配置成功"), this.adapterRef.mixVideoConf = null);
						else WEBRTCLOG.warn("混频配置失败：Invalid Argument")
					}
				}, {
					key: "detectNetworkStatus",
					value: function(e) {
						var t = this;
						if(WEBRTCLOG.log("开始探测网络状况, options: ", JSON.stringify(e, null, " ")), e) {
							this.detectDom = e.videoDom || null;
							var n = l.tool.randomNum(1e15, 9007199254740990);
							e.wssArr ? this.startDetect({
								uid: e.uid,
								cid: e.cid,
								token: e.token,
								wssArr: e.wssArr,
								codec: e.codec || "h264"
							}) : (WEBRTCLOG.log("config config: ", f.netDetectAddr), (0, l.ajax)({
								type: "post",
								url: f.netDetectAddr,
								contentType: "application/json",
								data: {
									uid: n
								}
							}).then(function(r) {
								WEBRTCLOG.log("探测到网络地址：", r), t.startDetect({
									uid: n,
									cid: r.cid,
									token: r.token,
									wssArr: r.detectAddrs.splice(0, 1),
									codec: e.codec || "h264"
								})
							}).catch(function(e) {
								WEBRTCLOG.warn("获取探测地址 error: ", e)
							}));
							var r = e.detectTime || 60;
							return new Promise(function(e, n) {
								t.detectNetworkStatusResolve = e, t.detectNetworkStatusReject = n, t.detectNetworkStatusTimer = setTimeout(function() {
									if(WEBRTCLOG.log("网络探测结束"), t.canvasTimer && (clearInterval(t.canvasTimer), t.canvasTimer = null), t._isDetectNetwork()) {
										var r = t.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(null);
										e(r);
										var i = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid).getLocalVideoStream();
										t.stopTrack(i), t.leaveChannel()
									} else {
										t.adapterRef.statsReportHelper && t.adapterRef.statsReportHelper.formatDataFromStats && t.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(t.adapterRef.instance._isDetectNetworkOfselfWebRtcConnected(), t.adapterRef.instance._isDetectNetworkOfremoteWebRtcConnected()), WEBRTCLOG.warn("网络探测失败"), n("无法与服务器建立连接，探测失败");
										var a = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid);
										if(a) {
											var o = a.getLocalVideoStream();
											t.stopTrack(o)
										}
										t.leaveChannel()
									}
								}, 1e3 * r)
							})
						}
						WEBRTCLOG.warn("detectNetworkStatus: Invalid parameter")
					}
				}, {
					key: "startDetect",
					value: function(e) {
						var t = this,
							n = {
								role: 0,
								uid: e.uid,
								cid: e.cid,
								sessionMode: "meeting",
								appkey: "4c418f22935f1e2cf8488ff1c84229c0",
								token: e.token,
								turnToken: null,
								wssArr: e.wssArr || ["webrtcgwhz.netease.im?ip=223.252.198.177:5060"],
								relayaddrs: null,
								relaytoken: null,
								liveEnable: !1,
								rtmpRecord: !1,
								netDetect: !0,
								codec: e.codec,
								sessionConfig: {}
							};
						this.adapterRef.meeting4NRTCApi.joinChannel(n), this.adapterRef.commonApi.startRtc().then(function() {
							var e = t.startDevice({
								type: d.DEVICE_TYPE.DEVICE_TYPE_VIDEO,
								device: null
							});
							Promise.all([e]).then(function(e) {
								WEBRTCLOG.info("网络探测 开启音、视频设备成功"), t.adapterRef.imInfo.remoteUid = l.tool.randomNum(1e15, 9007199254740990), t.adapterRef.webrtcBusiness.doClientJoin(t.adapterRef.imInfo.remoteUid)
							}).catch(function(e) {
								WEBRTCLOG.warn("网络探测 开启设备出错: %s", e)
							})
						}).catch(function(e) {
							WEBRTCLOG.warn("网络探测 连接网关出错: %s", e), t.detectNetworkStatusReject(e), t.detectNetworkStatusReject = null;
							var n = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid);
							if(n) {
								var r = n.getLocalVideoStream();
								t.stopTrack(r)
							}
							t.leaveChannel(), t.detectNetworkStatusTimer && (clearTimeout(t.detectNetworkStatusTimer), t.detectNetworkStatusTimer = null)
						})
					}
				}, {
					key: "stopTrack",
					value: function(e) {
						if(e) {
							var t = e.getTracks();
							t && 0 !== t.length && t.forEach(function(t) {
								WEBRTCLOG.log("stop track", e.id), t.stop(), e.removeTrack(t)
							})
						}
					}
				}, {
					key: "destroy",
					value: function() {
						(0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
					}
				}]), t
			}(c.AbstractAdapter);
		t.WebRTC = h
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			pushConfig: {
				1: "enable",
				2: "needBadge",
				3: "needPushNick",
				4: "pushContent",
				5: "custom",
				6: "pushPayload",
				7: "sound",
				9: "forceKeepCalling",
				10: "webrtcEnable"
			},
			liveOption: {
				1: "liveEnable",
				2: "webrtcEnable"
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			pushConfig: {
				enable: 1,
				needBadge: 2,
				needPushNick: 3,
				pushContent: 4,
				custom: 5,
				pushPayload: 6,
				sound: 7,
				forceKeepCalling: 9,
				webrtcEnable: 10
			},
			liveOption: {
				liveEnable: 1,
				webrtcEnable: 2
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(0),
			i = n(80),
			a = r.merge({}, i.idMap, {
				netcall: {
					id: 9,
					initNetcall: 1,
					keepCalling: 3,
					calleeAck: 4,
					notifyCalleeAck: 5,
					hangup: 6,
					notifyHangup: 7,
					netcallControl: 8,
					notifyNetcallControl: 9,
					verifyChannelId: 10,
					createChannel: 13,
					joinChannel: 14,
					queryAccountUidMap: 16
				}
			}),
			o = {
				initNetcall: {
					sid: a.netcall.id,
					cid: a.netcall.initNetcall,
					params: [{
						type: "byte",
						name: "type"
					}, {
						type: "StrArray",
						name: "accounts"
					}, {
						type: "String",
						name: "pushContent"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "Property",
						name: "pushConfig"
					}]
				},
				keepCalling: {
					sid: a.netcall.id,
					cid: a.netcall.keepCalling,
					params: [{
						type: "byte",
						name: "type"
					}, {
						type: "StrArray",
						name: "accounts"
					}, {
						type: "long",
						name: "channelId"
					}]
				},
				calleeAck: {
					sid: a.netcall.id,
					cid: a.netcall.calleeAck,
					params: [{
						type: "string",
						name: "account"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}]
				},
				hangup: {
					sid: a.netcall.id,
					cid: a.netcall.hangup,
					params: [{
						type: "long",
						name: "channelId"
					}]
				},
				netcallControl: {
					sid: a.netcall.id,
					cid: a.netcall.netcallControl,
					params: [{
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}]
				},
				verifyChannelId: {
					sid: a.netcall.id,
					cid: a.netcall.verifyChannelId,
					params: [{
						type: "long",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}]
				},
				createChannel: {
					sid: a.netcall.id,
					cid: a.netcall.createChannel,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "String",
						name: "webrtcEnable"
					}]
				},
				joinChannel: {
					sid: a.netcall.id,
					cid: a.netcall.joinChannel,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "Property",
						name: "liveOption"
					}]
				},
				queryAccountUidMap: {
					sid: a.netcall.id,
					cid: a.netcall.queryAccountUidMap,
					params: [{
						type: "String",
						name: "channelName"
					}, {
						type: "LongArray",
						name: "uids"
					}]
				}
			};
		e.exports = {
			idMap: a,
			cmdConfig: o,
			packetConfig: {
				"9_1": {
					service: "netcall",
					cmd: "initNetcall",
					response: [{
						type: "Number",
						name: "timetag"
					}, {
						type: "Number",
						name: "uid"
					}, {
						type: "Number",
						name: "channelId"
					}, {
						type: "StrArray",
						name: "turnServerList"
					}, {
						type: "StrArray",
						name: "sturnServerList"
					}, {
						type: "StrArray",
						name: "proxyServerList"
					}, {
						type: "StrArray",
						name: "keepCallingAccounts"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "serverMap"
					}]
				},
				"9_2": {
					service: "netcall",
					cmd: "beCalled",
					response: [{
						type: "Number",
						name: "timetag"
					}, {
						type: "Number",
						name: "type"
					}, {
						type: "Number",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}, {
						type: "Number",
						name: "uid"
					}, {
						type: "StrArray",
						name: "turnServerList"
					}, {
						type: "StrArray",
						name: "sturnServerList"
					}, {
						type: "StrArray",
						name: "proxyServerList"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "custom"
					}, {
						type: "Property",
						name: "pushConfig"
					}, {
						type: "String",
						name: "serverMap"
					}]
				},
				"9_3": {
					service: "netcall",
					cmd: "keepCalling",
					response: [{
						type: "StrArr",
						name: "accounts"
					}]
				},
				"9_4": {
					service: "netcall",
					cmd: "calleeAck",
					response: []
				},
				"9_5": {
					service: "netcall",
					cmd: "notifyCalleeAck",
					response: [{
						type: "String",
						name: "account"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}]
				},
				"9_6": {
					service: "netcall",
					cmd: "hangup",
					response: []
				},
				"9_7": {
					service: "netcall",
					cmd: "notifyHangup",
					response: [{
						type: "long",
						name: "channelId"
					}, {
						type: "String",
						name: "account"
					}, {
						type: "long",
						name: "timetag"
					}]
				},
				"9_8": {
					service: "netcall",
					cmd: "netcallControl",
					response: []
				},
				"9_9": {
					service: "netcall",
					cmd: "notifyNetcallControl",
					response: [{
						type: "String",
						name: "account"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "long",
						name: "channelId"
					}]
				},
				"9_10": {
					service: "netcall",
					cmd: "verifyChannelId",
					response: []
				},
				"9_11": {
					service: "netcall",
					cmd: "notifyNetcallRecord",
					response: [{
						type: "Property",
						name: "msg"
					}]
				},
				"9_12": {
					service: "netcall",
					cmd: "notifyCalleeAckSync",
					response: [{
						type: "String",
						name: "timetag"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "byte",
						name: "type"
					}, {
						type: "bool",
						name: "accepted"
					}, {
						type: "byte",
						name: "fromClientType"
					}]
				},
				"9_13": {
					service: "netcall",
					cmd: "createChannel",
					response: [{
						type: "long",
						name: "timetag"
					}]
				},
				"9_14": {
					service: "netcall",
					cmd: "joinChannel",
					response: [{
						type: "long",
						name: "timetag"
					}, {
						type: "long",
						name: "channelId"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}, {
						type: "String",
						name: "serverMap"
					}, {
						type: "String",
						name: "clientConfig"
					}, {
						type: "String",
						name: "custom"
					}]
				},
				"9_15": {
					service: "netcall",
					cmd: "notifyJoin",
					response: [{
						type: "Long",
						name: "channelId"
					}, {
						type: "StrLongMap",
						name: "accountUidMap"
					}]
				},
				"9_16": {
					service: "netcall",
					cmd: "queryAccountUidMap",
					response: []
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = {
			install: function(e) {
				var t = e.Protocol.fn;
				t.processNetcall = function(e) {
					switch(e.cmd) {
						case "initNetcall":
							this.onInitNetcall(e);
							break;
						case "beCalled":
							this.onBeCalled(e);
							break;
						case "keepCalling":
							this.onKeepCalling(e);
							break;
						case "calleeAck":
							break;
						case "notifyCalleeAck":
							this.onNotifyCalleeAck(e);
							break;
						case "hangup":
							break;
						case "notifyHangup":
							this.onNotifyHangup(e);
							break;
						case "notifyNetcallControl":
							this.onNetcallControl(e);
							break;
						case "notifyCalleeAckSync":
							this.onNotifyCalleeAckSync(e);
							break;
						case "notifyNetcallRecord":
							this.onMsg(e);
							break;
						case "createChannel":
							break;
						case "joinChannel":
							this.joinChannel(e);
							break;
						case "notifyJoin":
							this.notifyJoin(e)
					}
				}, t.onInitNetcall = function(e) {
					if(!e.error) {
						var t = e.obj.type;
						e.obj = e.content, e.obj.type = t, e.obj.accounts = e.obj.keepCallingAccounts, this.setCurrentNetcall(e.obj.channelId), this.keepCalling(e)
					}
				}, t.setCurrentNetcall = function(e) {
					this.currentNetcallChannelId = e
				}, t.onKeepCalling = function(e) {
					e.error || e.content.accounts.length && this.keepCalling(e)
				}, t.keepCalling = function(e) {
					var t = this,
						n = e.obj,
						r = n.type,
						i = n.accounts,
						a = n.channelId;
					i && i.length && setTimeout(function() {
						t.currentNetcallChannelId && t.currentNetcallChannelId === a && t.api.keepCalling({
							type: r,
							accounts: i,
							channelId: a
						}).catch(function() {})
					}, 3e3)
				}, t.onBeCalled = function(e) {
					e.error || this.emitAPI({
						type: "beCalled",
						obj: e.content
					})
				}, t.onNotifyCalleeAck = function(e) {
					e.error || this.emitAPI({
						type: "notifyCalleeAck",
						obj: e.content
					})
				}, t.onNotifyHangup = function(e) {
					e.error || this.emitAPI({
						type: "notifyHangup",
						obj: e.content
					})
				}, t.onNetcallControl = function(e) {
					e.error || this.emitAPI({
						type: "netcallControl",
						obj: e.content
					})
				}, t.onNotifyCalleeAckSync = function(e) {
					e.error || this.emitAPI({
						type: "notifyCalleeAckSync",
						obj: e.content
					})
				}, t.notifyJoin = function(e) {
					e.error || this.emitAPI({
						type: "notifyJoin",
						obj: e.content
					})
				}, t.joinChannel = function(e) {
					e.obj = e.content
				}
			}
		};
		e.exports = r
	}, function(e, t, n) {
		"use strict";
		var r = n(224),
			i = {
				install: function(e) {
					var t = e.fn,
						n = e.util,
						i = r({
							util: n
						});
					t.initNetcall = function(e) {
						return n.verifyOptions(e, "type accounts", "netcall::initNetcall"), e.pushContent = "", e.custom = "", e.pushConfig || (e.pushConfig = {}), e.pushConfig.webrtcEnable = e.webrtcEnable, e.pushConfig = new i(e.pushConfig), this.cbAndSendCmd("initNetcall", e)
					}, t.keepCalling = function(e) {
						return n.verifyOptions(e, "type accounts channelId", "netcall::keepCalling"), this.cbAndSendCmd("keepCalling", e)
					}, t.calleeAck = function(e) {
						return n.verifyOptions(e, "account channelId type accepted", "netcall::calleeAck"), this.cbAndSendCmd("calleeAck", e)
					}, t.hangup = function(e) {
						return n.verifyOptions(e, "channelId", "netcall::hangup"), this.cbAndSendCmd("hangup", e)
					}, t.netcallControl = function(e) {
						return n.verifyOptions(e, "channelId type", "netcall::netcallControl"), this.cbAndSendCmd("netcallControl", e)
					}, t.createChannel = function(e) {
						return this.cbAndSendCmd("createChannel", e)
					}, t.joinChannel = function(e) {
						return n.verifyOptions(e, "channelName", "netcall::joinChannel"), n.verifyBooleanWithDefault(e, "liveEnable", !1, "", "netcall::joinChannel"), n.verifyBooleanWithDefault(e, "webrtcEnable", !1, "", "netcall::joinChannel"), this.cbAndSendCmd("joinChannel", {
							channelName: e.channelName,
							liveOption: {
								liveEnable: e.liveEnable ? 1 : 0,
								webrtcEnable: e.webrtcEnable ? 1 : 0
							}
						})
					}, t.queryAccountUidMap = function(e, t) {
						return this.cbAndSendCmd("queryAccountUidMap", {
							channelName: e,
							uids: t
						})
					}
				}
			};
		e.exports = i
	}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		var r, i, a, o = l(n(158)),
			s = l(n(64));
		n(223);
		var c = n(157),
			d = n(22),
			u = n(31);

		function l(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var p = n(387),
			f = n(386),
			h = n(385),
			m = n(384),
			v = n(383),
			_ = n(5);
		window.WEBRTCLOG = window.WEBRTCLOG ? window.WEBRTCLOG : console, t.default = (0, s.default)({
			version: _.info.version,
			versionRtc: _.info.nrtcVersion
		}, u.RtcSupport, d.NETCALL_TYPE, d.DEVICE_TYPE, d.VIDEO_QUALITY, d.VIDEO_FRAME_RATE, d.SPLIT_MODE, d.MIX_VIDEO_MODE, d.NIM_SIGNALING, d.ROLE_FOR_MEETING, d.HANGUP_TYPE, d.CONTROL_TYPE, {
			deviceTypeMap: (r = {}, (0, o.default)(r, d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN, "audioIn"), (0, o.default)(r, d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL, "audioOut"), (0, o.default)(r, d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT, "audioOut"), (0, o.default)(r, d.DEVICE_TYPE.DEVICE_TYPE_VIDEO, "video"), r),
			videoMap: {
				frame: (i = {}, (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL, "640x480"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_LOW, "176x144"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_MEDIUM, "352x288"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_HIGH, "480x360"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_480P, "640x480"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P, "960x540"), (0, o.default)(i, d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P, "1280x720"), i),
				frameRate: (a = {}, (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL, 15), (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_5, 5), (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_10, 10), (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_15, 15), (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_20, 20), (0, o.default)(a, d.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_25, 25), a)
			},
			getVideoSessionConfig: function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
					t = e.quality,
					n = void 0 === t ? d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL : t,
					r = e.frameRate,
					i = void 0 === r ? d.VIDEO_QUALITY.CHAT_VIDEO_FRAME_RATE_NORMAL : r,
					a = {},
					o = this.videoMap.frame[n];
				return a.frameRate = this.videoMap.frameRate[i], a.width = +o.split("x")[0], a.height = +o.split("x")[1], a
			},
			getDeviceTypeMap: function(e) {
				return this.deviceTypeMap[e]
			},
			install: function(e, t) {
				p.install(e, t), f.install(e, t), e.parser.mixin({
					configMap: h,
					serializeMap: m,
					unserializeMap: v
				})
			},
			getInstance: function(e) {
				var t = e.container,
					n = e.remoteContainer,
					r = e.chromeId,
					i = e.debug,
					a = e.nim;
				return new c.WebRTC({
					container: t,
					remoteContainer: n,
					debug: i,
					nim: a,
					chromeId: r,
					apiList: [],
					ref: this
				})
			},
			destroy: function(e) {
				e && (e.destroy(), e = null)
			}
		}), e.exports = t.default
	}])
});