webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(92);
	var app_module_1 = __webpack_require__(142);
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
	    .catch(function (err) { return console.error(err); });


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license Angular v2.0.2
	 * (c) 2010-2016 Google, Inc. https://angular.io/
	 * License: MIT
	 */
	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(13), __webpack_require__(340), __webpack_require__(53), __webpack_require__(4), __webpack_require__(328)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/operator/toPromise', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/observable/fromPromise'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.forms = global.ng.forms || {}),global.ng.core,global.Rx.Observable.prototype,global.Rx,global.Rx,global.Rx.Observable));
	}(this, function (exports,_angular_core,rxjs_operator_toPromise,rxjs_Subject,rxjs_Observable,rxjs_observable_fromPromise) { 'use strict';
	
	    function isPresent(obj) {
	        return obj !== undefined && obj !== null;
	    }
	    function isBlank(obj) {
	        return obj === undefined || obj === null;
	    }
	    function isString(obj) {
	        return typeof obj === 'string';
	    }
	    function isStringMap(obj) {
	        return typeof obj === 'object' && obj !== null;
	    }
	    function isArray(obj) {
	        return Array.isArray(obj);
	    }
	    var StringWrapper = (function () {
	        function StringWrapper() {
	        }
	        StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
	        StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
	        StringWrapper.split = function (s, regExp) { return s.split(regExp); };
	        StringWrapper.equals = function (s, s2) { return s === s2; };
	        StringWrapper.stripLeft = function (s, charVal) {
	            if (s && s.length) {
	                var pos = 0;
	                for (var i = 0; i < s.length; i++) {
	                    if (s[i] != charVal)
	                        break;
	                    pos++;
	                }
	                s = s.substring(pos);
	            }
	            return s;
	        };
	        StringWrapper.stripRight = function (s, charVal) {
	            if (s && s.length) {
	                var pos = s.length;
	                for (var i = s.length - 1; i >= 0; i--) {
	                    if (s[i] != charVal)
	                        break;
	                    pos--;
	                }
	                s = s.substring(0, pos);
	            }
	            return s;
	        };
	        StringWrapper.replace = function (s, from, replace) {
	            return s.replace(from, replace);
	        };
	        StringWrapper.replaceAll = function (s, from, replace) {
	            return s.replace(from, replace);
	        };
	        StringWrapper.slice = function (s, from, to) {
	            if (from === void 0) { from = 0; }
	            if (to === void 0) { to = null; }
	            return s.slice(from, to === null ? undefined : to);
	        };
	        StringWrapper.replaceAllMapped = function (s, from, cb) {
	            return s.replace(from, function () {
	                var matches = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    matches[_i - 0] = arguments[_i];
	                }
	                // Remove offset & string from the result array
	                matches.splice(-2, 2);
	                // The callback receives match, p1, ..., pn
	                return cb(matches);
	            });
	        };
	        StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
	        StringWrapper.compare = function (a, b) {
	            if (a < b) {
	                return -1;
	            }
	            else if (a > b) {
	                return 1;
	            }
	            else {
	                return 0;
	            }
	        };
	        return StringWrapper;
	    }());
	    var NumberWrapper = (function () {
	        function NumberWrapper() {
	        }
	        NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
	        NumberWrapper.equal = function (a, b) { return a === b; };
	        NumberWrapper.parseIntAutoRadix = function (text) {
	            var result = parseInt(text);
	            if (isNaN(result)) {
	                throw new Error('Invalid integer literal when parsing ' + text);
	            }
	            return result;
	        };
	        NumberWrapper.parseInt = function (text, radix) {
	            if (radix == 10) {
	                if (/^(\-|\+)?[0-9]+$/.test(text)) {
	                    return parseInt(text, radix);
	                }
	            }
	            else if (radix == 16) {
	                if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
	                    return parseInt(text, radix);
	                }
	            }
	            else {
	                var result = parseInt(text, radix);
	                if (!isNaN(result)) {
	                    return result;
	                }
	            }
	            throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
	        };
	        Object.defineProperty(NumberWrapper, "NaN", {
	            get: function () { return NaN; },
	            enumerable: true,
	            configurable: true
	        });
	        NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
	        NumberWrapper.isNaN = function (value) { return isNaN(value); };
	        NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
	        return NumberWrapper;
	    }());
	    // JS has NaN !== NaN
	    function looseIdentical(a, b) {
	        return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	    }
	    function normalizeBool(obj) {
	        return isBlank(obj) ? false : obj;
	    }
	    function isJsObject(o) {
	        return o !== null && (typeof o === 'function' || typeof o === 'object');
	    }
	    function isPrimitive(obj) {
	        return !isJsObject(obj);
	    }
	    function hasConstructor(value, type) {
	        return value.constructor === type;
	    }
	
	    /**
	     * Base class for control directives.
	     *
	     * Only used internally in the forms module.
	     *
	     * @stable
	     */
	    var AbstractControlDirective = (function () {
	        function AbstractControlDirective() {
	        }
	        Object.defineProperty(AbstractControlDirective.prototype, "control", {
	            get: function () { throw new Error('unimplemented'); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "value", {
	            get: function () { return isPresent(this.control) ? this.control.value : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valid", {
	            get: function () { return isPresent(this.control) ? this.control.valid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
	            get: function () { return isPresent(this.control) ? this.control.invalid : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pending", {
	            get: function () { return isPresent(this.control) ? this.control.pending : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "errors", {
	            get: function () {
	                return isPresent(this.control) ? this.control.errors : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
	            get: function () { return isPresent(this.control) ? this.control.pristine : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
	            get: function () { return isPresent(this.control) ? this.control.dirty : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "touched", {
	            get: function () { return isPresent(this.control) ? this.control.touched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
	            get: function () { return isPresent(this.control) ? this.control.untouched : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
	            get: function () { return isPresent(this.control) ? this.control.disabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
	            get: function () { return isPresent(this.control) ? this.control.enabled : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
	            get: function () {
	                return isPresent(this.control) ? this.control.statusChanges : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
	            get: function () {
	                return isPresent(this.control) ? this.control.valueChanges : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlDirective.prototype, "path", {
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        AbstractControlDirective.prototype.reset = function (value) {
	            if (value === void 0) { value = undefined; }
	            if (isPresent(this.control))
	                this.control.reset(value);
	        };
	        return AbstractControlDirective;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$1 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * A directive that contains multiple {@link NgControl}s.
	     *
	     * Only used by the forms module.
	     *
	     * @stable
	     */
	    var ControlContainer = (function (_super) {
	        __extends$1(ControlContainer, _super);
	        function ControlContainer() {
	            _super.apply(this, arguments);
	        }
	        Object.defineProperty(ControlContainer.prototype, "formDirective", {
	            /**
	             * Get the form to which this container belongs.
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ControlContainer.prototype, "path", {
	            /**
	             * Get the path to this container.
	             */
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        return ControlContainer;
	    }(AbstractControlDirective));
	
	    // Safari and Internet Explorer do not support the iterable parameter to the
	    // Map constructor.  We work around that by manually adding the items.
	    var createMapFromPairs = (function () {
	        try {
	            if (new Map([[1, 2]]).size === 1) {
	                return function createMapFromPairs(pairs) { return new Map(pairs); };
	            }
	        }
	        catch (e) {
	        }
	        return function createMapAndPopulateFromPairs(pairs) {
	            var map = new Map();
	            for (var i = 0; i < pairs.length; i++) {
	                var pair = pairs[i];
	                map.set(pair[0], pair[1]);
	            }
	            return map;
	        };
	    })();
	    var _clearValues = (function () {
	        if ((new Map()).keys().next) {
	            return function _clearValues(m) {
	                var keyIterator = m.keys();
	                var k;
	                while (!((k = keyIterator.next()).done)) {
	                    m.set(k.value, null);
	                }
	            };
	        }
	        else {
	            return function _clearValuesWithForeEach(m) {
	                m.forEach(function (v, k) { m.set(k, null); });
	            };
	        }
	    })();
	    // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
	    // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
	    var _arrayFromMap = (function () {
	        try {
	            if ((new Map()).values().next) {
	                return function createArrayFromMap(m, getValues) {
	                    return getValues ? Array.from(m.values()) : Array.from(m.keys());
	                };
	            }
	        }
	        catch (e) {
	        }
	        return function createArrayFromMapWithForeach(m, getValues) {
	            var res = new Array(m.size), i = 0;
	            m.forEach(function (v, k) {
	                res[i] = getValues ? v : k;
	                i++;
	            });
	            return res;
	        };
	    })();
	    var MapWrapper = (function () {
	        function MapWrapper() {
	        }
	        MapWrapper.createFromStringMap = function (stringMap) {
	            var result = new Map();
	            for (var prop in stringMap) {
	                result.set(prop, stringMap[prop]);
	            }
	            return result;
	        };
	        MapWrapper.toStringMap = function (m) {
	            var r = {};
	            m.forEach(function (v, k) { return r[k] = v; });
	            return r;
	        };
	        MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
	        MapWrapper.iterable = function (m) { return m; };
	        MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
	        MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
	        return MapWrapper;
	    }());
	    /**
	     * Wraps Javascript Objects
	     */
	    var StringMapWrapper = (function () {
	        function StringMapWrapper() {
	        }
	        StringMapWrapper.merge = function (m1, m2) {
	            var m = {};
	            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
	                var k = _a[_i];
	                m[k] = m1[k];
	            }
	            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
	                var k = _c[_b];
	                m[k] = m2[k];
	            }
	            return m;
	        };
	        StringMapWrapper.equals = function (m1, m2) {
	            var k1 = Object.keys(m1);
	            var k2 = Object.keys(m2);
	            if (k1.length != k2.length) {
	                return false;
	            }
	            for (var i = 0; i < k1.length; i++) {
	                var key = k1[i];
	                if (m1[key] !== m2[key]) {
	                    return false;
	                }
	            }
	            return true;
	        };
	        return StringMapWrapper;
	    }());
	    var ListWrapper = (function () {
	        function ListWrapper() {
	        }
	        // JS has no way to express a statically fixed size list, but dart does so we
	        // keep both methods.
	        ListWrapper.createFixedSize = function (size) { return new Array(size); };
	        ListWrapper.createGrowableSize = function (size) { return new Array(size); };
	        ListWrapper.clone = function (array) { return array.slice(0); };
	        ListWrapper.forEachWithIndex = function (array, fn) {
	            for (var i = 0; i < array.length; i++) {
	                fn(array[i], i);
	            }
	        };
	        ListWrapper.first = function (array) {
	            if (!array)
	                return null;
	            return array[0];
	        };
	        ListWrapper.last = function (array) {
	            if (!array || array.length == 0)
	                return null;
	            return array[array.length - 1];
	        };
	        ListWrapper.indexOf = function (array, value, startIndex) {
	            if (startIndex === void 0) { startIndex = 0; }
	            return array.indexOf(value, startIndex);
	        };
	        ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
	        ListWrapper.reversed = function (array) {
	            var a = ListWrapper.clone(array);
	            return a.reverse();
	        };
	        ListWrapper.concat = function (a, b) { return a.concat(b); };
	        ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
	        ListWrapper.removeAt = function (list, index) {
	            var res = list[index];
	            list.splice(index, 1);
	            return res;
	        };
	        ListWrapper.removeAll = function (list, items) {
	            for (var i = 0; i < items.length; ++i) {
	                var index = list.indexOf(items[i]);
	                list.splice(index, 1);
	            }
	        };
	        ListWrapper.remove = function (list, el) {
	            var index = list.indexOf(el);
	            if (index > -1) {
	                list.splice(index, 1);
	                return true;
	            }
	            return false;
	        };
	        ListWrapper.clear = function (list) { list.length = 0; };
	        ListWrapper.isEmpty = function (list) { return list.length == 0; };
	        ListWrapper.fill = function (list, value, start, end) {
	            if (start === void 0) { start = 0; }
	            if (end === void 0) { end = null; }
	            list.fill(value, start, end === null ? list.length : end);
	        };
	        ListWrapper.equals = function (a, b) {
	            if (a.length != b.length)
	                return false;
	            for (var i = 0; i < a.length; ++i) {
	                if (a[i] !== b[i])
	                    return false;
	            }
	            return true;
	        };
	        ListWrapper.slice = function (l, from, to) {
	            if (from === void 0) { from = 0; }
	            if (to === void 0) { to = null; }
	            return l.slice(from, to === null ? undefined : to);
	        };
	        ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
	        ListWrapper.sort = function (l, compareFn) {
	            if (isPresent(compareFn)) {
	                l.sort(compareFn);
	            }
	            else {
	                l.sort();
	            }
	        };
	        ListWrapper.toString = function (l) { return l.toString(); };
	        ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
	        ListWrapper.maximum = function (list, predicate) {
	            if (list.length == 0) {
	                return null;
	            }
	            var solution = null;
	            var maxValue = -Infinity;
	            for (var index = 0; index < list.length; index++) {
	                var candidate = list[index];
	                if (isBlank(candidate)) {
	                    continue;
	                }
	                var candidateValue = predicate(candidate);
	                if (candidateValue > maxValue) {
	                    solution = candidate;
	                    maxValue = candidateValue;
	                }
	            }
	            return solution;
	        };
	        ListWrapper.flatten = function (list) {
	            var target = [];
	            _flattenArray(list, target);
	            return target;
	        };
	        ListWrapper.addAll = function (list, source) {
	            for (var i = 0; i < source.length; i++) {
	                list.push(source[i]);
	            }
	        };
	        return ListWrapper;
	    }());
	    function _flattenArray(source, target) {
	        if (isPresent(source)) {
	            for (var i = 0; i < source.length; i++) {
	                var item = source[i];
	                if (isArray(item)) {
	                    _flattenArray(item, target);
	                }
	                else {
	                    target.push(item);
	                }
	            }
	        }
	        return target;
	    }
	
	    var isPromise = _angular_core.__core_private__.isPromise;
	
	    /**
	     * Providers for validators to be used for {@link FormControl}s in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * ### Example
	     *
	     * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
	     * @stable
	     */
	    var NG_VALIDATORS = new _angular_core.OpaqueToken('NgValidators');
	    /**
	     * Providers for asynchronous validators to be used for {@link FormControl}s
	     * in a form.
	     *
	     * Provide this using `multi: true` to add validators.
	     *
	     * See {@link NG_VALIDATORS} for more details.
	     *
	     * @stable
	     */
	    var NG_ASYNC_VALIDATORS = new _angular_core.OpaqueToken('NgAsyncValidators');
	    /**
	     * Provides a set of validators used by form controls.
	     *
	     * A validator is a function that processes a {@link FormControl} or collection of
	     * controls and returns a map of errors. A null map means that validation has passed.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * var loginControl = new FormControl("", Validators.required)
	     * ```
	     *
	     * @stable
	     */
	    var Validators = (function () {
	        function Validators() {
	        }
	        /**
	         * Validator that requires controls to have a non-empty value.
	         */
	        Validators.required = function (control) {
	            return isBlank(control.value) || (isString(control.value) && control.value == '') ?
	                { 'required': true } :
	                null;
	        };
	        /**
	         * Validator that requires controls to have a value of a minimum length.
	         */
	        Validators.minLength = function (minLength) {
	            return function (control) {
	                if (isPresent(Validators.required(control)))
	                    return null;
	                var v = control.value;
	                return v.length < minLength ?
	                    { 'minlength': { 'requiredLength': minLength, 'actualLength': v.length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires controls to have a value of a maximum length.
	         */
	        Validators.maxLength = function (maxLength) {
	            return function (control) {
	                if (isPresent(Validators.required(control)))
	                    return null;
	                var v = control.value;
	                return v.length > maxLength ?
	                    { 'maxlength': { 'requiredLength': maxLength, 'actualLength': v.length } } :
	                    null;
	            };
	        };
	        /**
	         * Validator that requires a control to match a regex to its value.
	         */
	        Validators.pattern = function (pattern) {
	            return function (control) {
	                var regex = new RegExp("^" + pattern + "$");
	                var v = control.value;
	                return regex.test(v) ? null :
	                    { 'pattern': { 'requiredPattern': "^" + pattern + "$", 'actualValue': v } };
	            };
	        };
	        /**
	         * No-op validator.
	         */
	        Validators.nullValidator = function (c) { return null; };
	        /**
	         * Compose multiple validators into a single function that returns the union
	         * of the individual error maps.
	         */
	        Validators.compose = function (validators) {
	            if (!validators)
	                return null;
	            var presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                return _mergeErrors(_executeValidators(control, presentValidators));
	            };
	        };
	        Validators.composeAsync = function (validators) {
	            if (!validators)
	                return null;
	            var presentValidators = validators.filter(isPresent);
	            if (presentValidators.length == 0)
	                return null;
	            return function (control) {
	                var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
	                return Promise.all(promises).then(_mergeErrors);
	            };
	        };
	        return Validators;
	    }());
	    function _convertToPromise(obj) {
	        return isPromise(obj) ? obj : rxjs_operator_toPromise.toPromise.call(obj);
	    }
	    function _executeValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    function _executeAsyncValidators(control, validators) {
	        return validators.map(function (v) { return v(control); });
	    }
	    function _mergeErrors(arrayOfErrors) {
	        var res = arrayOfErrors.reduce(function (res, errors) {
	            return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
	        }, {});
	        return Object.keys(res).length === 0 ? null : res;
	    }
	
	    /**
	     * Used to provide a {@link ControlValueAccessor} for form controls.
	     *
	     * See {@link DefaultValueAccessor} for how to implement one.
	     * @stable
	     */
	    var NG_VALUE_ACCESSOR = new _angular_core.OpaqueToken('NgValueAccessor');
	
	    var CHECKBOX_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return CheckboxControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a value and listening to changes on a checkbox input element.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="checkbox" name="rememberLogin" ngModel>
	     *  ```
	     *
	     *  @stable
	     */
	    var CheckboxControlValueAccessor = (function () {
	        function CheckboxControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        CheckboxControlValueAccessor.prototype.writeValue = function (value) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
	        };
	        CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        CheckboxControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        CheckboxControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
	                        host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
	                        providers: [CHECKBOX_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        CheckboxControlValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ];
	        return CheckboxControlValueAccessor;
	    }());
	
	    var DEFAULT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return DefaultValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The default accessor for writing a value and listening to changes that is used by the
	     * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="text" name="searchQuery" ngModel>
	     *  ```
	     *
	     *  @stable
	     */
	    var DefaultValueAccessor = (function () {
	        function DefaultValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        DefaultValueAccessor.prototype.writeValue = function (value) {
	            var normalizedValue = isBlank(value) ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
	        DefaultValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        DefaultValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        DefaultValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
	                        // TODO: vsavkin replace the above selector with the one below it once
	                        // https://github.com/angular/angular/issues/3011 is implemented
	                        // selector: '[ngControl],[ngModel],[ngFormControl]',
	                        host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [DEFAULT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        DefaultValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ];
	        return DefaultValueAccessor;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    function normalizeValidator(validator) {
	        if (validator.validate !== undefined) {
	            return function (c) { return validator.validate(c); };
	        }
	        else {
	            return validator;
	        }
	    }
	    function normalizeAsyncValidator(validator) {
	        if (validator.validate !== undefined) {
	            return function (c) { return validator.validate(c); };
	        }
	        else {
	            return validator;
	        }
	    }
	
	    var NUMBER_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return NumberValueAccessor; }),
	        multi: true
	    };
	    /**
	     * The accessor for writing a number value and listening to changes that is used by the
	     * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
	     *
	     *  ### Example
	     *  ```
	     *  <input type="number" [(ngModel)]="age">
	     *  ```
	     */
	    var NumberValueAccessor = (function () {
	        function NumberValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        NumberValueAccessor.prototype.writeValue = function (value) {
	            // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
	            var normalizedValue = isBlank(value) ? '' : value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
	        };
	        NumberValueAccessor.prototype.registerOnChange = function (fn) {
	            this.onChange = function (value) { fn(value == '' ? null : parseFloat(value)); };
	        };
	        NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        NumberValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        NumberValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
	                        host: {
	                            '(change)': 'onChange($event.target.value)',
	                            '(input)': 'onChange($event.target.value)',
	                            '(blur)': 'onTouched()'
	                        },
	                        providers: [NUMBER_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        NumberValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ];
	        return NumberValueAccessor;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$2 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    function unimplemented() {
	        throw new Error('unimplemented');
	    }
	    /**
	     * A base class that all control directive extend.
	     * It binds a {@link FormControl} object to a DOM element.
	     *
	     * Used internally by Angular forms.
	     *
	     * @stable
	     */
	    var NgControl = (function (_super) {
	        __extends$2(NgControl, _super);
	        function NgControl() {
	            _super.apply(this, arguments);
	            /** @internal */
	            this._parent = null;
	            this.name = null;
	            this.valueAccessor = null;
	            /** @internal */
	            this._rawValidators = [];
	            /** @internal */
	            this._rawAsyncValidators = [];
	        }
	        Object.defineProperty(NgControl.prototype, "validator", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgControl.prototype, "asyncValidator", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return NgControl;
	    }(AbstractControlDirective));
	
	    var RADIO_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return RadioControlValueAccessor; }),
	        multi: true
	    };
	    /**
	     * Internal class used by Angular to uncheck radio buttons with the matching name.
	     */
	    var RadioControlRegistry = (function () {
	        function RadioControlRegistry() {
	            this._accessors = [];
	        }
	        RadioControlRegistry.prototype.add = function (control, accessor) {
	            this._accessors.push([control, accessor]);
	        };
	        RadioControlRegistry.prototype.remove = function (accessor) {
	            var indexToRemove = -1;
	            for (var i = 0; i < this._accessors.length; ++i) {
	                if (this._accessors[i][1] === accessor) {
	                    indexToRemove = i;
	                }
	            }
	            ListWrapper.removeAt(this._accessors, indexToRemove);
	        };
	        RadioControlRegistry.prototype.select = function (accessor) {
	            var _this = this;
	            this._accessors.forEach(function (c) {
	                if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
	                    c[1].fireUncheck(accessor.value);
	                }
	            });
	        };
	        RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
	            if (!controlPair[0].control)
	                return false;
	            return controlPair[0]._parent === accessor._control._parent &&
	                controlPair[1].name === accessor.name;
	        };
	        RadioControlRegistry.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        RadioControlRegistry.ctorParameters = [];
	        return RadioControlRegistry;
	    }());
	    /**
	     * @whatItDoes  Writes radio control values and listens to radio control changes.
	     *
	     * Used by {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName}
	     * to keep the view synced with the {@link FormControl} model.
	     *
	     * @howToUse
	     *
	     * If you have imported the {@link FormsModule} or the {@link ReactiveFormsModule}, this
	     * value accessor will be active on any radio control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use radio buttons with form directives
	     *
	     * To use radio buttons in a template-driven form, you'll want to ensure that radio buttons
	     * in the same group have the same `name` attribute.  Radio buttons with different `name`
	     * attributes do not affect each other.
	     *
	     * {@example forms/ts/radioButtons/radio_button_example.ts region='TemplateDriven'}
	     *
	     * When using radio buttons in a reactive form, radio buttons in the same group should have the
	     * same `formControlName`. You can also add a `name` attribute, but it's optional.
	     *
	     * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
	     *
	     *  * **npm package**: `@angular/forms`
	     *
	     *  @stable
	     */
	    var RadioControlValueAccessor = (function () {
	        function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            this._registry = _registry;
	            this._injector = _injector;
	            this.onChange = function () { };
	            this.onTouched = function () { };
	        }
	        RadioControlValueAccessor.prototype.ngOnInit = function () {
	            this._control = this._injector.get(NgControl);
	            this._checkName();
	            this._registry.add(this._control, this);
	        };
	        RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
	        RadioControlValueAccessor.prototype.writeValue = function (value) {
	            this._state = value === this.value;
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', this._state);
	        };
	        RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this._fn = fn;
	            this.onChange = function () {
	                fn(_this.value);
	                _this._registry.select(_this);
	            };
	        };
	        RadioControlValueAccessor.prototype.fireUncheck = function (value) { this.writeValue(value); };
	        RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        RadioControlValueAccessor.prototype._checkName = function () {
	            if (this.name && this.formControlName && this.name !== this.formControlName) {
	                this._throwNameError();
	            }
	            if (!this.name && this.formControlName)
	                this.name = this.formControlName;
	        };
	        RadioControlValueAccessor.prototype._throwNameError = function () {
	            throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
	        };
	        RadioControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
	                        host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
	                        providers: [RADIO_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        RadioControlValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	            { type: RadioControlRegistry, },
	            { type: _angular_core.Injector, },
	        ];
	        RadioControlValueAccessor.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'formControlName': [{ type: _angular_core.Input },],
	            'value': [{ type: _angular_core.Input },],
	        };
	        return RadioControlValueAccessor;
	    }());
	
	    var SELECT_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectControlValueAccessor; }),
	        multi: true
	    };
	    function _buildValueString(id, value) {
	        if (isBlank(id))
	            return "" + value;
	        if (!isPrimitive(value))
	            value = 'Object';
	        return StringWrapper.slice(id + ": " + value, 0, 50);
	    }
	    function _extractId(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * @whatItDoes Writes values and listens to changes on a select element.
	     *
	     * Used by {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName}
	     * to keep the view synced with the {@link FormControl} model.
	     *
	     * @howToUse
	     *
	     * If you have imported the {@link FormsModule} or the {@link ReactiveFormsModule}, this
	     * value accessor will be active on any select control that has a form directive. You do
	     * **not** need to add a special selector to activate it.
	     *
	     * ### How to use select controls with form directives
	     *
	     * To use a select in a template-driven form, simply add an `ngModel` and a `name`
	     * attribute to the main `<select>` tag.
	     *
	     * If your option values are simple strings, you can bind to the normal `value` property
	     * on the option.  If your option values happen to be objects (and you'd like to save the
	     * selection in your form as an object), use `ngValue` instead:
	     *
	     * {@example forms/ts/selectControl/select_control_example.ts region='Component'}
	     *
	     * In reactive forms, you'll also want to add your form directive (`formControlName` or
	     * `formControl`) on the main `<select>` tag. Like in the former example, you have the
	     * choice of binding to the  `value` or `ngValue` property on the select's options.
	     *
	     * {@example forms/ts/reactiveSelectControl/reactive_select_control_example.ts region='Component'}
	     *
	     * Note: We listen to the 'change' event because 'input' events aren't fired
	     * for selects in Firefox and IE:
	     * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
	     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * @stable
	     */
	    var SelectControlValueAccessor = (function () {
	        function SelectControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        SelectControlValueAccessor.prototype.writeValue = function (value) {
	            this.value = value;
	            var valueString = _buildValueString(this._getOptionId(value), value);
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
	        };
	        SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (valueString) {
	                _this.value = valueString;
	                fn(_this._getOptionValue(valueString));
	            };
	        };
	        SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        SelectControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /** @internal */
	        SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
	        /** @internal */
	        SelectControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = MapWrapper.keys(this._optionMap); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id), value))
	                    return id;
	            }
	            return null;
	        };
	        /** @internal */
	        SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var value = this._optionMap.get(_extractId(valueString));
	            return isPresent(value) ? value : valueString;
	        };
	        SelectControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
	                        host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectControlValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ];
	        return SelectControlValueAccessor;
	    }());
	    /**
	     * @whatItDoes Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * @howToUse
	     *
	     * See docs for {@link SelectControlValueAccessor} for usage examples.
	     *
	     * @stable
	     */
	    var NgSelectOption = (function () {
	        function NgSelectOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (isPresent(this._select))
	                this.id = this._select._registerOption();
	        }
	        Object.defineProperty(NgSelectOption.prototype, "ngValue", {
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._select._optionMap.set(this.id, value);
	                this._setElementValue(_buildValueString(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectOption.prototype, "value", {
	            set: function (value) {
	                this._setElementValue(value);
	                if (isPresent(this._select))
	                    this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /** @internal */
	        NgSelectOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        NgSelectOption.prototype.ngOnDestroy = function () {
	            if (isPresent(this._select)) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectOption.ctorParameters = [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ];
	        NgSelectOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectOption;
	    }());
	
	    var SELECT_MULTIPLE_VALUE_ACCESSOR = {
	        provide: NG_VALUE_ACCESSOR,
	        useExisting: _angular_core.forwardRef(function () { return SelectMultipleControlValueAccessor; }),
	        multi: true
	    };
	    function _buildValueString$1(id, value) {
	        if (isBlank(id))
	            return "" + value;
	        if (isString(value))
	            value = "'" + value + "'";
	        if (!isPrimitive(value))
	            value = 'Object';
	        return StringWrapper.slice(id + ": " + value, 0, 50);
	    }
	    function _extractId$1(valueString) {
	        return valueString.split(':')[0];
	    }
	    /**
	     * The accessor for writing a value and listening to changes on a select element.
	     *
	     * @stable
	     */
	    var SelectMultipleControlValueAccessor = (function () {
	        function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
	            this._renderer = _renderer;
	            this._elementRef = _elementRef;
	            /** @internal */
	            this._optionMap = new Map();
	            /** @internal */
	            this._idCounter = 0;
	            this.onChange = function (_) { };
	            this.onTouched = function () { };
	        }
	        SelectMultipleControlValueAccessor.prototype.writeValue = function (value) {
	            var _this = this;
	            this.value = value;
	            if (value == null)
	                return;
	            var values = value;
	            // convert values to ids
	            var ids = values.map(function (v) { return _this._getOptionId(v); });
	            this._optionMap.forEach(function (opt, o) { opt._setSelected(ids.indexOf(o.toString()) > -1); });
	        };
	        SelectMultipleControlValueAccessor.prototype.registerOnChange = function (fn) {
	            var _this = this;
	            this.onChange = function (_) {
	                var selected = [];
	                if (_.hasOwnProperty('selectedOptions')) {
	                    var options = _.selectedOptions;
	                    for (var i = 0; i < options.length; i++) {
	                        var opt = options.item(i);
	                        var val = _this._getOptionValue(opt.value);
	                        selected.push(val);
	                    }
	                }
	                else {
	                    var options = _.options;
	                    for (var i = 0; i < options.length; i++) {
	                        var opt = options.item(i);
	                        if (opt.selected) {
	                            var val = _this._getOptionValue(opt.value);
	                            selected.push(val);
	                        }
	                    }
	                }
	                fn(selected);
	            };
	        };
	        SelectMultipleControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
	        SelectMultipleControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
	            this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
	        };
	        /** @internal */
	        SelectMultipleControlValueAccessor.prototype._registerOption = function (value) {
	            var id = (this._idCounter++).toString();
	            this._optionMap.set(id, value);
	            return id;
	        };
	        /** @internal */
	        SelectMultipleControlValueAccessor.prototype._getOptionId = function (value) {
	            for (var _i = 0, _a = MapWrapper.keys(this._optionMap); _i < _a.length; _i++) {
	                var id = _a[_i];
	                if (looseIdentical(this._optionMap.get(id)._value, value))
	                    return id;
	            }
	            return null;
	        };
	        /** @internal */
	        SelectMultipleControlValueAccessor.prototype._getOptionValue = function (valueString) {
	            var opt = this._optionMap.get(_extractId$1(valueString));
	            return isPresent(opt) ? opt._value : valueString;
	        };
	        SelectMultipleControlValueAccessor.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
	                        host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
	                        providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
	                    },] },
	        ];
	        /** @nocollapse */
	        SelectMultipleControlValueAccessor.ctorParameters = [
	            { type: _angular_core.Renderer, },
	            { type: _angular_core.ElementRef, },
	        ];
	        return SelectMultipleControlValueAccessor;
	    }());
	    /**
	     * Marks `<option>` as dynamic, so Angular can be notified when options change.
	     *
	     * ### Example
	     *
	     * ```
	     * <select multiple name="city" ngModel>
	     *   <option *ngFor="let c of cities" [value]="c"></option>
	     * </select>
	     * ```
	     */
	    var NgSelectMultipleOption = (function () {
	        function NgSelectMultipleOption(_element, _renderer, _select) {
	            this._element = _element;
	            this._renderer = _renderer;
	            this._select = _select;
	            if (isPresent(this._select)) {
	                this.id = this._select._registerOption(this);
	            }
	        }
	        Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
	            set: function (value) {
	                if (this._select == null)
	                    return;
	                this._value = value;
	                this._setElementValue(_buildValueString$1(this.id, value));
	                this._select.writeValue(this._select.value);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
	            set: function (value) {
	                if (isPresent(this._select)) {
	                    this._value = value;
	                    this._setElementValue(_buildValueString$1(this.id, value));
	                    this._select.writeValue(this._select.value);
	                }
	                else {
	                    this._setElementValue(value);
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /** @internal */
	        NgSelectMultipleOption.prototype._setElementValue = function (value) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
	        };
	        /** @internal */
	        NgSelectMultipleOption.prototype._setSelected = function (selected) {
	            this._renderer.setElementProperty(this._element.nativeElement, 'selected', selected);
	        };
	        NgSelectMultipleOption.prototype.ngOnDestroy = function () {
	            if (isPresent(this._select)) {
	                this._select._optionMap.delete(this.id);
	                this._select.writeValue(this._select.value);
	            }
	        };
	        NgSelectMultipleOption.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: 'option' },] },
	        ];
	        /** @nocollapse */
	        NgSelectMultipleOption.ctorParameters = [
	            { type: _angular_core.ElementRef, },
	            { type: _angular_core.Renderer, },
	            { type: SelectMultipleControlValueAccessor, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	        ];
	        NgSelectMultipleOption.propDecorators = {
	            'ngValue': [{ type: _angular_core.Input, args: ['ngValue',] },],
	            'value': [{ type: _angular_core.Input, args: ['value',] },],
	        };
	        return NgSelectMultipleOption;
	    }());
	
	    function controlPath(name, parent) {
	        var p = ListWrapper.clone(parent.path);
	        p.push(name);
	        return p;
	    }
	    function setUpControl(control, dir) {
	        if (!control)
	            _throwError(dir, 'Cannot find control with');
	        if (!dir.valueAccessor)
	            _throwError(dir, 'No value accessor for form control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	        dir.valueAccessor.writeValue(control.value);
	        // view -> model
	        dir.valueAccessor.registerOnChange(function (newValue) {
	            dir.viewToModelUpdate(newValue);
	            control.markAsDirty();
	            control.setValue(newValue, { emitModelToViewChange: false });
	        });
	        // touched
	        dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
	        control.registerOnChange(function (newValue, emitModelEvent) {
	            // control -> view
	            dir.valueAccessor.writeValue(newValue);
	            // control -> ngModel
	            if (emitModelEvent)
	                dir.viewToModelUpdate(newValue);
	        });
	        if (dir.valueAccessor.setDisabledState) {
	            control.registerOnDisabledChange(function (isDisabled) { dir.valueAccessor.setDisabledState(isDisabled); });
	        }
	        // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
	        dir._rawValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange)
	                validator.registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	        dir._rawAsyncValidators.forEach(function (validator) {
	            if (validator.registerOnValidatorChange)
	                validator.registerOnValidatorChange(function () { return control.updateValueAndValidity(); });
	        });
	    }
	    function cleanUpControl(control, dir) {
	        dir.valueAccessor.registerOnChange(function () { return _noControlError(dir); });
	        dir.valueAccessor.registerOnTouched(function () { return _noControlError(dir); });
	        dir._rawValidators.forEach(function (validator) { return validator.registerOnValidatorChange(null); });
	        dir._rawAsyncValidators.forEach(function (validator) { return validator.registerOnValidatorChange(null); });
	        if (control)
	            control._clearChangeFns();
	    }
	    function setUpFormContainer(control, dir) {
	        if (isBlank(control))
	            _throwError(dir, 'Cannot find control with');
	        control.validator = Validators.compose([control.validator, dir.validator]);
	        control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
	    }
	    function _noControlError(dir) {
	        return _throwError(dir, 'There is no FormControl instance attached to form control element with');
	    }
	    function _throwError(dir, message) {
	        var messageEnd;
	        if (dir.path.length > 1) {
	            messageEnd = "path: '" + dir.path.join(' -> ') + "'";
	        }
	        else if (dir.path[0]) {
	            messageEnd = "name: '" + dir.path + "'";
	        }
	        else {
	            messageEnd = 'unspecified name attribute';
	        }
	        throw new Error(message + " " + messageEnd);
	    }
	    function composeValidators(validators) {
	        return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
	    }
	    function composeAsyncValidators(validators) {
	        return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
	            null;
	    }
	    function isPropertyUpdated(changes, viewModel) {
	        if (!changes.hasOwnProperty('model'))
	            return false;
	        var change = changes['model'];
	        if (change.isFirstChange())
	            return true;
	        return !looseIdentical(viewModel, change.currentValue);
	    }
	    function isBuiltInAccessor(valueAccessor) {
	        return (hasConstructor(valueAccessor, CheckboxControlValueAccessor) ||
	            hasConstructor(valueAccessor, NumberValueAccessor) ||
	            hasConstructor(valueAccessor, SelectControlValueAccessor) ||
	            hasConstructor(valueAccessor, SelectMultipleControlValueAccessor) ||
	            hasConstructor(valueAccessor, RadioControlValueAccessor));
	    }
	    // TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
	    function selectValueAccessor(dir, valueAccessors) {
	        if (!valueAccessors)
	            return null;
	        var defaultAccessor;
	        var builtinAccessor;
	        var customAccessor;
	        valueAccessors.forEach(function (v) {
	            if (hasConstructor(v, DefaultValueAccessor)) {
	                defaultAccessor = v;
	            }
	            else if (isBuiltInAccessor(v)) {
	                if (isPresent(builtinAccessor))
	                    _throwError(dir, 'More than one built-in value accessor matches form control with');
	                builtinAccessor = v;
	            }
	            else {
	                if (isPresent(customAccessor))
	                    _throwError(dir, 'More than one custom value accessor matches form control with');
	                customAccessor = v;
	            }
	        });
	        if (isPresent(customAccessor))
	            return customAccessor;
	        if (isPresent(builtinAccessor))
	            return builtinAccessor;
	        if (isPresent(defaultAccessor))
	            return defaultAccessor;
	        _throwError(dir, 'No valid value accessor for form control with');
	        return null;
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * This is a base class for code shared between {@link NgModelGroup} and {@link FormGroupName}.
	     *
	     * @stable
	     */
	    var AbstractFormGroupDirective = (function (_super) {
	        __extends(AbstractFormGroupDirective, _super);
	        function AbstractFormGroupDirective() {
	            _super.apply(this, arguments);
	        }
	        AbstractFormGroupDirective.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormGroup(this);
	        };
	        AbstractFormGroupDirective.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormGroup(this);
	            }
	        };
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
	            /**
	             * Get the {@link FormGroup} backing this binding.
	             */
	            get: function () { return this.formDirective.getFormGroup(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
	            /**
	             * Get the path to this control group.
	             */
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
	            /**
	             * Get the {@link Form} to which this group belongs.
	             */
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        /** @internal */
	        AbstractFormGroupDirective.prototype._checkParentType = function () { };
	        return AbstractFormGroupDirective;
	    }(ControlContainer));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$3 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var AbstractControlStatus = (function () {
	        function AbstractControlStatus(cd) {
	            this._cd = cd;
	        }
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.untouched : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.touched : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.pristine : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.dirty : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.valid : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
	            get: function () {
	                return isPresent(this._cd.control) ? this._cd.control.invalid : false;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return AbstractControlStatus;
	    }());
	    var ngControlStatusHost = {
	        '[class.ng-untouched]': 'ngClassUntouched',
	        '[class.ng-touched]': 'ngClassTouched',
	        '[class.ng-pristine]': 'ngClassPristine',
	        '[class.ng-dirty]': 'ngClassDirty',
	        '[class.ng-valid]': 'ngClassValid',
	        '[class.ng-invalid]': 'ngClassInvalid'
	    };
	    /**
	     * Directive automatically applied to Angular form controls that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * @stable
	     */
	    var NgControlStatus = (function (_super) {
	        __extends$3(NgControlStatus, _super);
	        function NgControlStatus(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatus.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
	        ];
	        /** @nocollapse */
	        NgControlStatus.ctorParameters = [
	            { type: NgControl, decorators: [{ type: _angular_core.Self },] },
	        ];
	        return NgControlStatus;
	    }(AbstractControlStatus));
	    /**
	     * Directive automatically applied to Angular form groups that sets CSS classes
	     * based on control status (valid/invalid/dirty/etc).
	     *
	     * @stable
	     */
	    var NgControlStatusGroup = (function (_super) {
	        __extends$3(NgControlStatusGroup, _super);
	        function NgControlStatusGroup(cd) {
	            _super.call(this, cd);
	        }
	        NgControlStatusGroup.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
	                        host: ngControlStatusHost
	                    },] },
	        ];
	        /** @nocollapse */
	        NgControlStatusGroup.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Self },] },
	        ];
	        return NgControlStatusGroup;
	    }(AbstractControlStatus));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$5 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Use by directives and components to emit custom Events.
	     *
	     * ### Examples
	     *
	     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	     * title gets clicked:
	     *
	     * ```
	     * @Component({
	     *   selector: 'zippy',
	     *   template: `
	     *   <div class="zippy">
	     *     <div (click)="toggle()">Toggle</div>
	     *     <div [hidden]="!visible">
	     *       <ng-content></ng-content>
	     *     </div>
	     *  </div>`})
	     * export class Zippy {
	     *   visible: boolean = true;
	     *   @Output() open: EventEmitter<any> = new EventEmitter();
	     *   @Output() close: EventEmitter<any> = new EventEmitter();
	     *
	     *   toggle() {
	     *     this.visible = !this.visible;
	     *     if (this.visible) {
	     *       this.open.emit(null);
	     *     } else {
	     *       this.close.emit(null);
	     *     }
	     *   }
	     * }
	     * ```
	     *
	     * The events payload can be accessed by the parameter `$event` on the components output event
	     * handler:
	     *
	     * ```
	     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	     * ```
	     *
	     * Uses Rx.Observable but provides an adapter to make it work as specified here:
	     * https://github.com/jhusain/observable-spec
	     *
	     * Once a reference implementation of the spec is available, switch to it.
	     * @stable
	     */
	    var EventEmitter = (function (_super) {
	        __extends$5(EventEmitter, _super);
	        /**
	         * Creates an instance of [EventEmitter], which depending on [isAsync],
	         * delivers events synchronously or asynchronously.
	         */
	        function EventEmitter(isAsync) {
	            if (isAsync === void 0) { isAsync = false; }
	            _super.call(this);
	            this.__isAsync = isAsync;
	        }
	        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	            var schedulerFn;
	            var errorFn = function (err) { return null; };
	            var completeFn = function () { return null; };
	            if (generatorOrNext && typeof generatorOrNext === 'object') {
	                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                    setTimeout(function () { return generatorOrNext.next(value); });
	                } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
	                if (generatorOrNext.error) {
	                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                        function (err) { generatorOrNext.error(err); };
	                }
	                if (generatorOrNext.complete) {
	                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                        function () { generatorOrNext.complete(); };
	                }
	            }
	            else {
	                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                    setTimeout(function () { return generatorOrNext(value); });
	                } : function (value /** TODO #9100 */) { generatorOrNext(value); };
	                if (error) {
	                    errorFn =
	                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	                }
	                if (complete) {
	                    completeFn =
	                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	                }
	            }
	            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	        };
	        return EventEmitter;
	    }(rxjs_Subject.Subject));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$6 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
	     */
	    var VALID = 'VALID';
	    /**
	     * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
	     */
	    var INVALID = 'INVALID';
	    /**
	     * Indicates that a FormControl is pending, i.e. that async validation is occurring and
	     * errors are not yet available for the input value.
	     */
	    var PENDING = 'PENDING';
	    /**
	     * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
	     * calculations of validity or value.
	     */
	    var DISABLED = 'DISABLED';
	    function _find(control, path, delimiter) {
	        if (isBlank(path))
	            return null;
	        if (!(path instanceof Array)) {
	            path = path.split(delimiter);
	        }
	        if (path instanceof Array && ListWrapper.isEmpty(path))
	            return null;
	        return path.reduce(function (v, name) {
	            if (v instanceof FormGroup) {
	                return isPresent(v.controls[name]) ? v.controls[name] : null;
	            }
	            else if (v instanceof FormArray) {
	                var index = name;
	                return isPresent(v.at(index)) ? v.at(index) : null;
	            }
	            else {
	                return null;
	            }
	        }, control);
	    }
	    function toObservable(r) {
	        return isPromise(r) ? rxjs_observable_fromPromise.fromPromise(r) : r;
	    }
	    function coerceToValidator(validator) {
	        return Array.isArray(validator) ? composeValidators(validator) : validator;
	    }
	    function coerceToAsyncValidator(asyncValidator) {
	        return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator;
	    }
	    /**
	     * @whatItDoes This is the base class for {@link FormControl}, {@link FormGroup}, and
	     * {@link FormArray}.
	     *
	     * It provides some of the shared behavior that all controls and groups of controls have, like
	     * running validators, calculating status, and resetting state. It also defines the properties
	     * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
	     * instantiated directly.
	     *
	     * @stable
	     */
	    var AbstractControl = (function () {
	        function AbstractControl(validator, asyncValidator) {
	            this.validator = validator;
	            this.asyncValidator = asyncValidator;
	            /** @internal */
	            this._onCollectionChange = function () { };
	            this._pristine = true;
	            this._touched = false;
	            /** @internal */
	            this._onDisabledChange = [];
	        }
	        Object.defineProperty(AbstractControl.prototype, "value", {
	            /**
	             * The value of the control.
	             */
	            get: function () { return this._value; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "status", {
	            /**
	             * The validation status of the control. There are four possible
	             * validation statuses:
	             *
	             * * **VALID**:  control has passed all validation checks
	             * * **INVALID**: control has failed at least one validation check
	             * * **PENDING**: control is in the midst of conducting a validation check
	             * * **DISABLED**: control is exempt from validation checks
	             *
	             * These statuses are mutually exclusive, so a control cannot be
	             * both valid AND invalid or invalid AND disabled.
	             */
	            get: function () { return this._status; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valid", {
	            /**
	             * A control is `valid` when its `status === VALID`.
	             *
	             * In order to have this status, the control must have passed all its
	             * validation checks.
	             */
	            get: function () { return this._status === VALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "invalid", {
	            /**
	             * A control is `invalid` when its `status === INVALID`.
	             *
	             * In order to have this status, the control must have failed
	             * at least one of its validation checks.
	             */
	            get: function () { return this._status === INVALID; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pending", {
	            /**
	             * A control is `pending` when its `status === PENDING`.
	             *
	             * In order to have this status, the control must be in the
	             * middle of conducting a validation check.
	             */
	            get: function () { return this._status == PENDING; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "disabled", {
	            /**
	             * A control is `disabled` when its `status === DISABLED`.
	             *
	             * Disabled controls are exempt from validation checks and
	             * are not included in the aggregate value of their ancestor
	             * controls.
	             */
	            get: function () { return this._status === DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "enabled", {
	            /**
	             * A control is `enabled` as long as its `status !== DISABLED`.
	             *
	             * In other words, it has a status of `VALID`, `INVALID`, or
	             * `PENDING`.
	             */
	            get: function () { return this._status !== DISABLED; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "errors", {
	            /**
	             * Returns any errors generated by failing validation. If there
	             * are no errors, it will return null.
	             */
	            get: function () { return this._errors; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "pristine", {
	            /**
	             * A control is `pristine` if the user has not yet changed
	             * the value in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             */
	            get: function () { return this._pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "dirty", {
	            /**
	             * A control is `dirty` if the user has changed the value
	             * in the UI.
	             *
	             * Note that programmatic changes to a control's value will
	             * *not* mark it dirty.
	             */
	            get: function () { return !this.pristine; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "touched", {
	            /**
	            * A control is marked `touched` once the user has triggered
	            * a `blur` event on it.
	            */
	            get: function () { return this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "untouched", {
	            /**
	             * A control is `untouched` if the user has not yet triggered
	             * a `blur` event on it.
	             */
	            get: function () { return !this._touched; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "valueChanges", {
	            /**
	             * Emits an event every time the value of the control changes, in
	             * the UI or programmatically.
	             */
	            get: function () { return this._valueChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AbstractControl.prototype, "statusChanges", {
	            /**
	             * Emits an event every time the validation status of the control
	             * is re-calculated.
	             */
	            get: function () { return this._statusChanges; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Sets the synchronous validators that are active on this control.  Calling
	         * this will overwrite any existing sync validators.
	         */
	        AbstractControl.prototype.setValidators = function (newValidator) {
	            this.validator = coerceToValidator(newValidator);
	        };
	        /**
	         * Sets the async validators that are active on this control. Calling this
	         * will overwrite any existing async validators.
	         */
	        AbstractControl.prototype.setAsyncValidators = function (newValidator) {
	            this.asyncValidator = coerceToAsyncValidator(newValidator);
	        };
	        /**
	         * Empties out the sync validator list.
	         */
	        AbstractControl.prototype.clearValidators = function () { this.validator = null; };
	        /**
	         * Empties out the async validator list.
	         */
	        AbstractControl.prototype.clearAsyncValidators = function () { this.asyncValidator = null; };
	        /**
	         * Marks the control as `touched`.
	         *
	         * This will also mark all direct ancestors as `touched` to maintain
	         * the model.
	         */
	        AbstractControl.prototype.markAsTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            onlySelf = normalizeBool(onlySelf);
	            this._touched = true;
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent.markAsTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `untouched`.
	         *
	         * If the control has any children, it will also mark all children as `untouched`
	         * to maintain the model, and re-calculate the `touched` status of all parent
	         * controls.
	         */
	        AbstractControl.prototype.markAsUntouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = false;
	            this._forEachChild(function (control) { control.markAsUntouched({ onlySelf: true }); });
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `dirty`.
	         *
	         * This will also mark all direct ancestors as `dirty` to maintain
	         * the model.
	         */
	        AbstractControl.prototype.markAsDirty = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            onlySelf = normalizeBool(onlySelf);
	            this._pristine = false;
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent.markAsDirty({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pristine`.
	         *
	         * If the control has any children, it will also mark all children as `pristine`
	         * to maintain the model, and re-calculate the `pristine` status of all parent
	         * controls.
	         */
	        AbstractControl.prototype.markAsPristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = true;
	            this._forEachChild(function (control) { control.markAsPristine({ onlySelf: true }); });
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Marks the control as `pending`.
	         */
	        AbstractControl.prototype.markAsPending = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            onlySelf = normalizeBool(onlySelf);
	            this._status = PENDING;
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent.markAsPending({ onlySelf: onlySelf });
	            }
	        };
	        /**
	         * Disables the control. This means the control will be exempt from validation checks and
	         * excluded from the aggregate value of any parent. Its status is `DISABLED`.
	         *
	         * If the control has children, all children will be disabled to maintain the model.
	         */
	        AbstractControl.prototype.disable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            emitEvent = isPresent(emitEvent) ? emitEvent : true;
	            this._status = DISABLED;
	            this._errors = null;
	            this._forEachChild(function (control) { control.disable({ onlySelf: true }); });
	            this._updateValue();
	            if (emitEvent) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(true); });
	        };
	        /**
	         * Enables the control. This means the control will be included in validation checks and
	         * the aggregate value of its parent. Its status is re-calculated based on its value and
	         * its validators.
	         *
	         * If the control has children, all children will be enabled.
	         */
	        AbstractControl.prototype.enable = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            this._status = VALID;
	            this._forEachChild(function (control) { control.enable({ onlySelf: true }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	            this._updateAncestors(onlySelf);
	            this._onDisabledChange.forEach(function (changeFn) { return changeFn(false); });
	        };
	        AbstractControl.prototype._updateAncestors = function (onlySelf) {
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent.updateValueAndValidity();
	                this._parent._updatePristine();
	                this._parent._updateTouched();
	            }
	        };
	        AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
	        /**
	         * Re-calculates the value and validation status of the control.
	         *
	         * By default, it will also update the value and validity of its ancestors.
	         */
	        AbstractControl.prototype.updateValueAndValidity = function (_a) {
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
	            onlySelf = normalizeBool(onlySelf);
	            emitEvent = isPresent(emitEvent) ? emitEvent : true;
	            this._setInitialStatus();
	            this._updateValue();
	            if (this.enabled) {
	                this._errors = this._runValidator();
	                this._status = this._calculateStatus();
	                if (this._status === VALID || this._status === PENDING) {
	                    this._runAsyncValidator(emitEvent);
	                }
	            }
	            if (emitEvent) {
	                this._valueChanges.emit(this._value);
	                this._statusChanges.emit(this._status);
	            }
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	            }
	        };
	        /** @internal */
	        AbstractControl.prototype._updateTreeValidity = function (_a) {
	            var emitEvent = (_a === void 0 ? { emitEvent: true } : _a).emitEvent;
	            this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity({ emitEvent: emitEvent }); });
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
	        };
	        AbstractControl.prototype._setInitialStatus = function () { this._status = this._allControlsDisabled() ? DISABLED : VALID; };
	        AbstractControl.prototype._runValidator = function () {
	            return isPresent(this.validator) ? this.validator(this) : null;
	        };
	        AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
	            var _this = this;
	            if (isPresent(this.asyncValidator)) {
	                this._status = PENDING;
	                this._cancelExistingSubscription();
	                var obs = toObservable(this.asyncValidator(this));
	                this._asyncValidationSubscription = obs.subscribe({ next: function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); } });
	            }
	        };
	        AbstractControl.prototype._cancelExistingSubscription = function () {
	            if (isPresent(this._asyncValidationSubscription)) {
	                this._asyncValidationSubscription.unsubscribe();
	            }
	        };
	        /**
	         * Sets errors on a form control.
	         *
	         * This is used when validations are run manually by the user, rather than automatically.
	         *
	         * Calling `setErrors` will also update the validity of the parent control.
	         *
	         * ### Example
	         *
	         * ```
	         * const login = new FormControl("someLogin");
	         * login.setErrors({
	         *   "notUnique": true
	         * });
	         *
	         * expect(login.valid).toEqual(false);
	         * expect(login.errors).toEqual({"notUnique": true});
	         *
	         * login.setValue("someOtherLogin");
	         *
	         * expect(login.valid).toEqual(true);
	         * ```
	         */
	        AbstractControl.prototype.setErrors = function (errors, _a) {
	            var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
	            emitEvent = isPresent(emitEvent) ? emitEvent : true;
	            this._errors = errors;
	            this._updateControlsErrors(emitEvent);
	        };
	        /**
	         * Retrieves a child control given the control's name or path.
	         *
	         * Paths can be passed in as an array or a string delimited by a dot.
	         *
	         * To get a control nested within a `person` sub-group:
	         *
	         * * `this.form.get('person.name');`
	         *
	         * -OR-
	         *
	         * * `this.form.get(['person', 'name']);`
	         */
	        AbstractControl.prototype.get = function (path) { return _find(this, path, '.'); };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns null or undefined.
	         *
	         * If no path is given, it checks for the error on the present control.
	         */
	        AbstractControl.prototype.getError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            var control = isPresent(path) && !ListWrapper.isEmpty(path) ? this.get(path) : this;
	            if (isPresent(control) && isPresent(control._errors)) {
	                return control._errors[errorCode];
	            }
	            else {
	                return null;
	            }
	        };
	        /**
	         * Returns true if the control with the given path has the error specified. Otherwise
	         * returns false.
	         *
	         * If no path is given, it checks for the error on the present control.
	         */
	        AbstractControl.prototype.hasError = function (errorCode, path) {
	            if (path === void 0) { path = null; }
	            return isPresent(this.getError(errorCode, path));
	        };
	        Object.defineProperty(AbstractControl.prototype, "root", {
	            /**
	             * Retrieves the top-level ancestor of this control.
	             */
	            get: function () {
	                var x = this;
	                while (isPresent(x._parent)) {
	                    x = x._parent;
	                }
	                return x;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /** @internal */
	        AbstractControl.prototype._updateControlsErrors = function (emitEvent) {
	            this._status = this._calculateStatus();
	            if (emitEvent) {
	                this._statusChanges.emit(this._status);
	            }
	            if (isPresent(this._parent)) {
	                this._parent._updateControlsErrors(emitEvent);
	            }
	        };
	        /** @internal */
	        AbstractControl.prototype._initObservables = function () {
	            this._valueChanges = new EventEmitter();
	            this._statusChanges = new EventEmitter();
	        };
	        AbstractControl.prototype._calculateStatus = function () {
	            if (this._allControlsDisabled())
	                return DISABLED;
	            if (isPresent(this._errors))
	                return INVALID;
	            if (this._anyControlsHaveStatus(PENDING))
	                return PENDING;
	            if (this._anyControlsHaveStatus(INVALID))
	                return INVALID;
	            return VALID;
	        };
	        /** @internal */
	        AbstractControl.prototype._anyControlsHaveStatus = function (status) {
	            return this._anyControls(function (control) { return control.status == status; });
	        };
	        /** @internal */
	        AbstractControl.prototype._anyControlsDirty = function () {
	            return this._anyControls(function (control) { return control.dirty; });
	        };
	        /** @internal */
	        AbstractControl.prototype._anyControlsTouched = function () {
	            return this._anyControls(function (control) { return control.touched; });
	        };
	        /** @internal */
	        AbstractControl.prototype._updatePristine = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._pristine = !this._anyControlsDirty();
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent._updatePristine({ onlySelf: onlySelf });
	            }
	        };
	        /** @internal */
	        AbstractControl.prototype._updateTouched = function (_a) {
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._touched = this._anyControlsTouched();
	            if (isPresent(this._parent) && !onlySelf) {
	                this._parent._updateTouched({ onlySelf: onlySelf });
	            }
	        };
	        /** @internal */
	        AbstractControl.prototype._isBoxedValue = function (formState) {
	            return isStringMap(formState) && Object.keys(formState).length === 2 && 'value' in formState &&
	                'disabled' in formState;
	        };
	        /** @internal */
	        AbstractControl.prototype._registerOnCollectionChange = function (fn) { this._onCollectionChange = fn; };
	        return AbstractControl;
	    }());
	    /**
	     * @whatItDoes Tracks the value and validation status of an individual form control.
	     *
	     * It is one of the three fundamental building blocks of Angular forms, along with
	     * {@link FormGroup} and {@link FormArray}.
	     *
	     * @howToUse
	     *
	     * When instantiating a {@link FormControl}, you can pass in an initial value as the
	     * first argument. Example:
	     *
	     * ```ts
	     * const ctrl = new FormControl('some value');
	     * console.log(ctrl.value);     // 'some value'
	     *```
	     *
	     * You can also initialize the control with a form state object on instantiation,
	     * which includes both the value and whether or not the control is disabled.
	     * You can't use the value key without the disabled key; both are required
	     * to use this way of initialization.
	     *
	     * ```ts
	     * const ctrl = new FormControl({value: 'n/a', disabled: true});
	     * console.log(ctrl.value);     // 'n/a'
	     * console.log(ctrl.status);   // 'DISABLED'
	     * ```
	     *
	     * To include a sync validator (or an array of sync validators) with the control,
	     * pass it in as the second argument. Async validators are also supported, but
	     * have to be passed in separately as the third arg.
	     *
	     * ```ts
	     * const ctrl = new FormControl('', Validators.required);
	     * console.log(ctrl.value);     // ''
	     * console.log(ctrl.status);   // 'INVALID'
	     * ```
	     *
	     * See its superclass, {@link AbstractControl}, for more properties and methods.
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * @stable
	     */
	    var FormControl = (function (_super) {
	        __extends$6(FormControl, _super);
	        function FormControl(formState, validator, asyncValidator) {
	            if (formState === void 0) { formState = null; }
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, coerceToValidator(validator), coerceToAsyncValidator(asyncValidator));
	            /** @internal */
	            this._onChange = [];
	            this._applyFormState(formState);
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	            this._initObservables();
	        }
	        /**
	         * Set the value of the form control to `value`.
	         *
	         * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
	         * and not its parent component. This defaults to false.
	         *
	         * If `emitEvent` is `true`, this
	         * change will cause a `valueChanges` event on the `FormControl` to be emitted. This defaults
	         * to true (as it falls through to `updateValueAndValidity`).
	         *
	         * If `emitModelToViewChange` is `true`, the view will be notified about the new value
	         * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
	         * specified.
	         *
	         * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
	         * model.  This is the default behavior if `emitViewToModelChange` is not specified.
	         */
	        FormControl.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange, emitViewToModelChange = _b.emitViewToModelChange;
	            emitModelToViewChange = isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
	            emitViewToModelChange = isPresent(emitViewToModelChange) ? emitViewToModelChange : true;
	            this._value = value;
	            if (this._onChange.length && emitModelToViewChange) {
	                this._onChange.forEach(function (changeFn) { return changeFn(_this._value, emitViewToModelChange); });
	            }
	            this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
	        };
	        /**
	         * Patches the value of a control.
	         *
	         * This function is functionally the same as {@link FormControl.setValue} at this level.
	         * It exists for symmetry with {@link FormGroup.patchValue} on `FormGroups` and `FormArrays`,
	         * where it does behave differently.
	         */
	        FormControl.prototype.patchValue = function (value, options) {
	            if (options === void 0) { options = {}; }
	            this.setValue(value, options);
	        };
	        /**
	         * Resets the form control. This means by default:
	         *
	         * * it is marked as `pristine`
	         * * it is marked as `untouched`
	         * * value is set to null
	         *
	         * You can also reset to a specific form state by passing through a standalone
	         * value or a form state object that contains both a value and a disabled state
	         * (these are the only two properties that cannot be calculated).
	         *
	         * Ex:
	         *
	         * ```ts
	         * this.control.reset('Nancy');
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * ```
	         *
	         * OR
	         *
	         * ```
	         * this.control.reset({value: 'Nancy', disabled: true});
	         *
	         * console.log(this.control.value);  // 'Nancy'
	         * console.log(this.control.status);  // 'DISABLED'
	         * ```
	         */
	        FormControl.prototype.reset = function (formState, _a) {
	            if (formState === void 0) { formState = null; }
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._applyFormState(formState);
	            this.markAsPristine({ onlySelf: onlySelf });
	            this.markAsUntouched({ onlySelf: onlySelf });
	            this.setValue(this._value, { onlySelf: onlySelf });
	        };
	        /**
	         * @internal
	         */
	        FormControl.prototype._updateValue = function () { };
	        /**
	         * @internal
	         */
	        FormControl.prototype._anyControls = function (condition) { return false; };
	        /**
	         * @internal
	         */
	        FormControl.prototype._allControlsDisabled = function () { return this.disabled; };
	        /**
	         * Register a listener for change events.
	         */
	        FormControl.prototype.registerOnChange = function (fn) { this._onChange.push(fn); };
	        /**
	         * @internal
	         */
	        FormControl.prototype._clearChangeFns = function () {
	            this._onChange = [];
	            this._onDisabledChange = [];
	            this._onCollectionChange = function () { };
	        };
	        /**
	         * Register a listener for disabled events.
	         */
	        FormControl.prototype.registerOnDisabledChange = function (fn) {
	            this._onDisabledChange.push(fn);
	        };
	        /**
	         * @internal
	         */
	        FormControl.prototype._forEachChild = function (cb) { };
	        FormControl.prototype._applyFormState = function (formState) {
	            if (this._isBoxedValue(formState)) {
	                this._value = formState.value;
	                formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
	                    this.enable({ onlySelf: true, emitEvent: false });
	            }
	            else {
	                this._value = formState;
	            }
	        };
	        return FormControl;
	    }(AbstractControl));
	    /**
	     * @whatItDoes Tracks the value and validity state of a group of {@link FormControl}
	     * instances.
	     *
	     * A `FormGroup` aggregates the values of each child {@link FormControl} into one object,
	     * with each control name as the key.  It calculates its status by reducing the statuses
	     * of its children. For example, if one of the controls in a group is invalid, the entire
	     * group becomes invalid.
	     *
	     * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {@link FormControl} and {@link FormArray}.
	     *
	     * @howToUse
	     *
	     * When instantiating a {@link FormGroup}, pass in a collection of child controls as the first
	     * argument. The key for each child will be the name under which it is registered.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   first: new FormControl('Nancy', Validators.minLength(2)),
	     *   last: new FormControl('Drew'),
	     * });
	     *
	     * console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
	     * console.log(form.status);  // 'VALID'
	     * ```
	     *
	     * You can also include group-level validators as the second arg, or group-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Example
	     *
	     * ```
	     * const form = new FormGroup({
	     *   password: new FormControl('', Validators.minLength(2)),
	     *   passwordConfirm: new FormControl('', Validators.minLength(2)),
	     * }, passwordMatchValidator);
	     *
	     *
	     * function passwordMatchValidator(g: FormGroup) {
	     *    return g.get('password').value === g.get('passwordConfirm').value
	     *       ? null : {'mismatch': true};
	     * }
	     * ```
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * @stable
	     */
	    var FormGroup = (function (_super) {
	        __extends$6(FormGroup, _super);
	        function FormGroup(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Registers a control with the group's list of controls.
	         *
	         * This method does not update value or validity of the control, so for
	         * most cases you'll want to use {@link FormGroup.addControl} instead.
	         */
	        FormGroup.prototype.registerControl = function (name, control) {
	            if (this.controls[name])
	                return this.controls[name];
	            this.controls[name] = control;
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	            return control;
	        };
	        /**
	         * Add a control to this group.
	         */
	        FormGroup.prototype.addControl = function (name, control) {
	            this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove a control from this group.
	         */
	        FormGroup.prototype.removeControl = function (name) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         */
	        FormGroup.prototype.setControl = function (name, control) {
	            if (this.controls[name])
	                this.controls[name]._registerOnCollectionChange(function () { });
	            delete (this.controls[name]);
	            if (control)
	                this.registerControl(name, control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Check whether there is an enabled control with the given name in the group.
	         *
	         * It will return false for disabled controls. If you'd like to check for
	         * existence in the group only, use {@link AbstractControl.get} instead.
	         */
	        FormGroup.prototype.contains = function (controlName) {
	            return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
	        };
	        /**
	         *  Sets the value of the {@link FormGroup}. It accepts an object that matches
	         *  the structure of the group, with control names as keys.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.setValue({first: 'Nancy', last: 'Drew'});
	         *  console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
	         *
	         *  ```
	         */
	        FormGroup.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._checkAllValuesPresent(value);
	            Object.keys(value).forEach(function (name) {
	                _this._throwIfControlMissing(name);
	                _this.controls[name].setValue(value[name], { onlySelf: true });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	        };
	        /**
	         *  Patches the value of the {@link FormGroup}. It accepts an object with control
	         *  names as keys, and will do its best to match the values to the correct controls
	         *  in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the group without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const form = new FormGroup({
	         *     first: new FormControl(),
	         *     last: new FormControl()
	         *  });
	         *  console.log(form.value);   // {first: null, last: null}
	         *
	         *  form.patchValue({first: 'Nancy'});
	         *  console.log(form.value);   // {first: 'Nancy', last: null}
	         *
	         *  ```
	         */
	        FormGroup.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            Object.keys(value).forEach(function (name) {
	                if (_this.controls[name]) {
	                    _this.controls[name].patchValue(value[name], { onlySelf: true });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	        };
	        /**
	         * Resets the {@link FormGroup}. This means by default:
	         *
	         * * The group and all descendants are marked `pristine`
	         * * The group and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in a map of states
	         * that matches the structure of your form, with control names as keys. The state
	         * can be a standalone value or a form state object with both a value and a disabled
	         * status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.form.reset({first: 'name', last; 'last name'});
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.form.reset({
	         *   first: {value: 'name', disabled: true},
	         *   last: 'last'
	         * });
	         *
	         * console.log(this.form.value);  // {first: 'name', last: 'last name'}
	         * console.log(this.form.get('first').status);  // 'DISABLED'
	         * ```
	         */
	        FormGroup.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = {}; }
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._forEachChild(function (control, name) {
	                control.reset(value[name], { onlySelf: true });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the {@link FormGroup}, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the group.
	         */
	        FormGroup.prototype.getRawValue = function () {
	            return this._reduceChildren({}, function (acc, control, name) {
	                acc[name] = control.value;
	                return acc;
	            });
	        };
	        /** @internal */
	        FormGroup.prototype._throwIfControlMissing = function (name) {
	            if (!Object.keys(this.controls).length) {
	                throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.controls[name]) {
	                throw new Error("Cannot find form control with name: " + name + ".");
	            }
	        };
	        /** @internal */
	        FormGroup.prototype._forEachChild = function (cb) {
	            var _this = this;
	            Object.keys(this.controls).forEach(function (k) { return cb(_this.controls[k], k); });
	        };
	        /** @internal */
	        FormGroup.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) {
	                control.setParent(_this);
	                control._registerOnCollectionChange(_this._onCollectionChange);
	            });
	        };
	        /** @internal */
	        FormGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
	        /** @internal */
	        FormGroup.prototype._anyControls = function (condition) {
	            var _this = this;
	            var res = false;
	            this._forEachChild(function (control, name) {
	                res = res || (_this.contains(name) && condition(control));
	            });
	            return res;
	        };
	        /** @internal */
	        FormGroup.prototype._reduceValue = function () {
	            var _this = this;
	            return this._reduceChildren({}, function (acc, control, name) {
	                if (control.enabled || _this.disabled) {
	                    acc[name] = control.value;
	                }
	                return acc;
	            });
	        };
	        /** @internal */
	        FormGroup.prototype._reduceChildren = function (initValue, fn) {
	            var res = initValue;
	            this._forEachChild(function (control, name) { res = fn(res, control, name); });
	            return res;
	        };
	        /** @internal */
	        FormGroup.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
	                var controlName = _a[_i];
	                if (this.controls[controlName].enabled) {
	                    return false;
	                }
	            }
	            return Object.keys(this.controls).length > 0 || this.disabled;
	        };
	        /** @internal */
	        FormGroup.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, name) {
	                if (value[name] === undefined) {
	                    throw new Error("Must supply a value for form control with name: '" + name + "'.");
	                }
	            });
	        };
	        return FormGroup;
	    }(AbstractControl));
	    /**
	     * @whatItDoes Tracks the value and validity state of an array of {@link FormControl}
	     * instances.
	     *
	     * A `FormArray` aggregates the values of each child {@link FormControl} into an array.
	     * It calculates its status by reducing the statuses of its children. For example, if one of
	     * the controls in a `FormArray` is invalid, the entire array becomes invalid.
	     *
	     * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
	     * along with {@link FormControl} and {@link FormGroup}.
	     *
	     * @howToUse
	     *
	     * When instantiating a {@link FormArray}, pass in an array of child controls as the first
	     * argument.
	     *
	     * ### Example
	     *
	     * ```
	     * const arr = new FormArray([
	     *   new FormControl('Nancy', Validators.minLength(2)),
	     *   new FormControl('Drew'),
	     * ]);
	     *
	     * console.log(arr.value);   // ['Nancy', 'Drew']
	     * console.log(arr.status);  // 'VALID'
	     * ```
	     *
	     * You can also include array-level validators as the second arg, or array-level async
	     * validators as the third arg. These come in handy when you want to perform validation
	     * that considers the value of more than one child control.
	     *
	     * ### Adding or removing controls
	     *
	     * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
	     * in `FormArray` itself. These methods ensure the controls are properly tracked in the
	     * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
	     * the `FormArray` directly, as that will result in strange and unexpected behavior such
	     * as broken change detection.
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * @stable
	     */
	    var FormArray = (function (_super) {
	        __extends$6(FormArray, _super);
	        function FormArray(controls, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            _super.call(this, validator, asyncValidator);
	            this.controls = controls;
	            this._initObservables();
	            this._setUpControls();
	            this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
	        }
	        /**
	         * Get the {@link AbstractControl} at the given `index` in the array.
	         */
	        FormArray.prototype.at = function (index) { return this.controls[index]; };
	        /**
	         * Insert a new {@link AbstractControl} at the end of the array.
	         */
	        FormArray.prototype.push = function (control) {
	            this.controls.push(control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Insert a new {@link AbstractControl} at the given `index` in the array.
	         */
	        FormArray.prototype.insert = function (index, control) {
	            ListWrapper.insert(this.controls, index, control);
	            this._registerControl(control);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Remove the control at the given `index` in the array.
	         */
	        FormArray.prototype.removeAt = function (index) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            ListWrapper.removeAt(this.controls, index);
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        /**
	         * Replace an existing control.
	         */
	        FormArray.prototype.setControl = function (index, control) {
	            if (this.controls[index])
	                this.controls[index]._registerOnCollectionChange(function () { });
	            ListWrapper.removeAt(this.controls, index);
	            if (control) {
	                ListWrapper.insert(this.controls, index, control);
	                this._registerControl(control);
	            }
	            this.updateValueAndValidity();
	            this._onCollectionChange();
	        };
	        Object.defineProperty(FormArray.prototype, "length", {
	            /**
	             * Length of the control array.
	             */
	            get: function () { return this.controls.length; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         *  Sets the value of the {@link FormArray}. It accepts an array that matches
	         *  the structure of the control.
	         *
	         * This method performs strict checks, so it will throw an error if you try
	         * to set the value of a control that doesn't exist or if you exclude the
	         * value of a control.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.setValue(['Nancy', 'Drew']);
	         *  console.log(arr.value);   // ['Nancy', 'Drew']
	         *  ```
	         */
	        FormArray.prototype.setValue = function (value, _a) {
	            var _this = this;
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._checkAllValuesPresent(value);
	            value.forEach(function (newValue, index) {
	                _this._throwIfControlMissing(index);
	                _this.at(index).setValue(newValue, { onlySelf: true });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	        };
	        /**
	         *  Patches the value of the {@link FormArray}. It accepts an array that matches the
	         *  structure of the control, and will do its best to match the values to the correct
	         *  controls in the group.
	         *
	         *  It accepts both super-sets and sub-sets of the array without throwing an error.
	         *
	         *  ### Example
	         *
	         *  ```
	         *  const arr = new FormArray([
	         *     new FormControl(),
	         *     new FormControl()
	         *  ]);
	         *  console.log(arr.value);   // [null, null]
	         *
	         *  arr.patchValue(['Nancy']);
	         *  console.log(arr.value);   // ['Nancy', null]
	         *  ```
	         */
	        FormArray.prototype.patchValue = function (value, _a) {
	            var _this = this;
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            value.forEach(function (newValue, index) {
	                if (_this.at(index)) {
	                    _this.at(index).patchValue(newValue, { onlySelf: true });
	                }
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	        };
	        /**
	         * Resets the {@link FormArray}. This means by default:
	         *
	         * * The array and all descendants are marked `pristine`
	         * * The array and all descendants are marked `untouched`
	         * * The value of all descendants will be null or null maps
	         *
	         * You can also reset to a specific form state by passing in an array of states
	         * that matches the structure of the control. The state can be a standalone value
	         * or a form state object with both a value and a disabled status.
	         *
	         * ### Example
	         *
	         * ```ts
	         * this.arr.reset(['name', 'last name']);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * ```
	         *
	         * - OR -
	         *
	         * ```
	         * this.arr.reset([
	         *   {value: 'name', disabled: true},
	         *   'last'
	         * ]);
	         *
	         * console.log(this.arr.value);  // ['name', 'last name']
	         * console.log(this.arr.get(0).status);  // 'DISABLED'
	         * ```
	         */
	        FormArray.prototype.reset = function (value, _a) {
	            if (value === void 0) { value = []; }
	            var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
	            this._forEachChild(function (control, index) {
	                control.reset(value[index], { onlySelf: true });
	            });
	            this.updateValueAndValidity({ onlySelf: onlySelf });
	            this._updatePristine({ onlySelf: onlySelf });
	            this._updateTouched({ onlySelf: onlySelf });
	        };
	        /**
	         * The aggregate value of the array, including any disabled controls.
	         *
	         * If you'd like to include all values regardless of disabled status, use this method.
	         * Otherwise, the `value` property is the best way to get the value of the array.
	         */
	        FormArray.prototype.getRawValue = function () { return this.controls.map(function (control) { return control.value; }); };
	        /** @internal */
	        FormArray.prototype._throwIfControlMissing = function (index) {
	            if (!this.controls.length) {
	                throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
	            }
	            if (!this.at(index)) {
	                throw new Error("Cannot find form control at index " + index);
	            }
	        };
	        /** @internal */
	        FormArray.prototype._forEachChild = function (cb) {
	            this.controls.forEach(function (control, index) { cb(control, index); });
	        };
	        /** @internal */
	        FormArray.prototype._updateValue = function () {
	            var _this = this;
	            this._value = this.controls.filter(function (control) { return control.enabled || _this.disabled; })
	                .map(function (control) { return control.value; });
	        };
	        /** @internal */
	        FormArray.prototype._anyControls = function (condition) {
	            return this.controls.some(function (control) { return control.enabled && condition(control); });
	        };
	        /** @internal */
	        FormArray.prototype._setUpControls = function () {
	            var _this = this;
	            this._forEachChild(function (control) { return _this._registerControl(control); });
	        };
	        /** @internal */
	        FormArray.prototype._checkAllValuesPresent = function (value) {
	            this._forEachChild(function (control, i) {
	                if (value[i] === undefined) {
	                    throw new Error("Must supply a value for form control at index: " + i + ".");
	                }
	            });
	        };
	        /** @internal */
	        FormArray.prototype._allControlsDisabled = function () {
	            for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
	                var control = _a[_i];
	                if (control.enabled)
	                    return false;
	            }
	            return this.controls.length > 0 || this.disabled;
	        };
	        FormArray.prototype._registerControl = function (control) {
	            control.setParent(this);
	            control._registerOnCollectionChange(this._onCollectionChange);
	        };
	        return FormArray;
	    }(AbstractControl));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$4 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var formDirectiveProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgForm; })
	    };
	    var resolvedPromise = Promise.resolve(null);
	    /**
	     * @whatItDoes Creates a top-level {@link FormGroup} instance and binds it to a form
	     * to track aggregate form value and validation status.
	     *
	     * @howToUse
	     *
	     * As soon as you import the `FormsModule`, this directive becomes active by default on
	     * all `<form>` tags.  You don't need to add a special selector.
	     *
	     * You can export the directive into a local template variable using `ngForm` as the key
	     * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
	     * {@link FormGroup} instance are duplicated on the directive itself, so a reference to it
	     * will give you access to the aggregate value and validity status of the form, as well as
	     * user interaction properties like `dirty` and `touched`.
	     *
	     * To register child controls with the form, you'll want to use {@link NgModel} with a
	     * `name` attribute.  You can also use {@link NgModelGroup} if you'd like to create
	     * sub-groups within the form.
	     *
	     * You can listen to the directive's `ngSubmit` event to be notified when the user has
	     * triggered a form submission.
	     *
	     * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     *  @stable
	     */
	    var NgForm = (function (_super) {
	        __extends$4(NgForm, _super);
	        function NgForm(validators, asyncValidators) {
	            _super.call(this);
	            this._submitted = false;
	            this.ngSubmit = new EventEmitter();
	            this.form =
	                new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
	        }
	        Object.defineProperty(NgForm.prototype, "submitted", {
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "formDirective", {
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "control", {
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "path", {
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgForm.prototype, "controls", {
	            get: function () { return this.form.controls; },
	            enumerable: true,
	            configurable: true
	        });
	        NgForm.prototype.addControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var container = _this._findContainer(dir.path);
	                dir._control = container.registerControl(dir.name, dir.control);
	                setUpControl(dir.control, dir);
	                dir.control.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        NgForm.prototype.getControl = function (dir) { return this.form.get(dir.path); };
	        NgForm.prototype.removeControl = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var container = _this._findContainer(dir.path);
	                if (isPresent(container)) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        NgForm.prototype.addFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var container = _this._findContainer(dir.path);
	                var group = new FormGroup({});
	                setUpFormContainer(group, dir);
	                container.registerControl(dir.name, group);
	                group.updateValueAndValidity({ emitEvent: false });
	            });
	        };
	        NgForm.prototype.removeFormGroup = function (dir) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var container = _this._findContainer(dir.path);
	                if (isPresent(container)) {
	                    container.removeControl(dir.name);
	                }
	            });
	        };
	        NgForm.prototype.getFormGroup = function (dir) { return this.form.get(dir.path); };
	        NgForm.prototype.updateModel = function (dir, value) {
	            var _this = this;
	            resolvedPromise.then(function () {
	                var ctrl = _this.form.get(dir.path);
	                ctrl.setValue(value);
	            });
	        };
	        NgForm.prototype.setValue = function (value) { this.control.setValue(value); };
	        NgForm.prototype.onSubmit = function () {
	            this._submitted = true;
	            this.ngSubmit.emit(null);
	            return false;
	        };
	        NgForm.prototype.onReset = function () { this.resetForm(); };
	        NgForm.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /** @internal */
	        NgForm.prototype._findContainer = function (path) {
	            path.pop();
	            return ListWrapper.isEmpty(path) ? this.form : this.form.get(path);
	        };
	        NgForm.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
	                        providers: [formDirectiveProvider],
	                        host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
	                        outputs: ['ngSubmit'],
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgForm.ctorParameters = [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ];
	        return NgForm;
	    }(ControlContainer));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var Examples = {
	        formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
	        formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
	        formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; let i=index\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
	        ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
	        ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
	    };
	
	    var TemplateDrivenErrors = (function () {
	        function TemplateDrivenErrors() {
	        }
	        TemplateDrivenErrors.modelParentException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + Examples.formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + Examples.ngModelWithFormGroup);
	        };
	        TemplateDrivenErrors.formGroupNameException = function () {
	            throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        TemplateDrivenErrors.missingNameException = function () {
	            throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
	        };
	        TemplateDrivenErrors.modelGroupParentException = function () {
	            throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + Examples.formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + Examples.ngModelGroup);
	        };
	        return TemplateDrivenErrors;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$8 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var modelGroupProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return NgModelGroup; })
	    };
	    /**
	     * @whatItDoes Creates and binds a {@link FormGroup} instance to a DOM element.
	     *
	     * @howToUse
	     *
	     * This directive can only be used as a child of {@link NgForm} (or in other words,
	     * within `<form>` tags).
	     *
	     * Use this directive if you'd like to create a sub-group within a form. This can
	     * come in handy if you want to validate a sub-group of your form separately from
	     * the rest of your form, or if some values in your domain model make more sense to
	     * consume together in a nested object.
	     *
	     * Pass in the name you'd like this sub-group to have and it will become the key
	     * for the sub-group in the form's full value. You can also export the directive into
	     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
	     *
	     * {@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * * **NgModule**: `FormsModule`
	     *
	     * @stable
	     */
	    var NgModelGroup = (function (_super) {
	        __extends$8(NgModelGroup, _super);
	        function NgModelGroup(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /** @internal */
	        NgModelGroup.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelGroupParentException();
	            }
	        };
	        NgModelGroup.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
	        ];
	        /** @nocollapse */
	        NgModelGroup.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ];
	        NgModelGroup.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['ngModelGroup',] },],
	        };
	        return NgModelGroup;
	    }(AbstractFormGroupDirective));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$7 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var formControlBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return NgModel; })
	    };
	    var resolvedPromise$1 = Promise.resolve(null);
	    /**
	     * @whatItDoes Creates a {@link FormControl} instance from a domain model and binds it
	     * to a form control element.
	     *
	     * The {@link FormControl} instance will track the value, user interaction, and
	     * validation status of the control and keep the view synced with the model. If used
	     * within a parent form, the directive will also register itself with the form as a child
	     * control.
	     *
	     * @howToUse
	     *
	     * This directive can be used by itself or as part of a larger form. All you need is the
	     * `ngModel` selector to activate it.
	     *
	     * It accepts a domain model as an optional {@link @Input}. If you have a one-way binding
	     * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
	     * class will set the value in the view. If you have a two-way binding with `[()]` syntax
	     * (also known as 'banana-box syntax'), the value in the UI will always be synced back to
	     * the domain model in your class as well.
	     *
	     * If you wish to inspect the properties of the associated {@link FormControl} (like
	     * validity state), you can also export the directive into a local template variable using
	     * `ngModel` as the key (ex: `#myVar="ngModel"`). You can then access the control using the
	     * directive's `control` property, but most properties you'll need (like `valid` and `dirty`)
	     * will fall through to the control anyway, so you can access them directly. You can see a
	     * full list of properties directly available in {@link AbstractControlDirective}.
	     *
	     * The following is an example of a simple standalone control using `ngModel`:
	     *
	     * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
	     *
	     * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
	     * so that the control can be registered with the parent form under that name.
	     *
	     * It's worth noting that in the context of a parent form, you often can skip one-way or
	     * two-way binding because the parent form will sync the value for you. You can access
	     * its properties by exporting it into a local template variable using `ngForm` (ex:
	     * `#f="ngForm"`). Then you can pass it where it needs to go on submit.
	     *
	     * If you do need to populate initial values into your form, using a one-way binding for
	     * `ngModel` tends to be sufficient as long as you use the exported form's value rather
	     * than the domain model's value on submit.
	     *
	     * Take a look at an example of using `ngModel` within a form:
	     *
	     * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
	     *
	     * To see `ngModel` examples with different form control types, see:
	     *
	     * * Radio buttons: {@link RadioControlValueAccessor}
	     * * Selects: {@link SelectControlValueAccessor}
	     *
	     * **npm package**: `@angular/forms`
	     *
	     * **NgModule**: `FormsModule`
	     *
	     *  @stable
	     */
	    var NgModel = (function (_super) {
	        __extends$7(NgModel, _super);
	        function NgModel(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            /** @internal */
	            this._control = new FormControl();
	            /** @internal */
	            this._registered = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        NgModel.prototype.ngOnChanges = function (changes) {
	            this._checkForErrors();
	            if (!this._registered)
	                this._setUpControl();
	            if ('isDisabled' in changes) {
	                this._updateDisabled(changes);
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this._updateValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
	        Object.defineProperty(NgModel.prototype, "control", {
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "path", {
	            get: function () {
	                return this._parent ? controlPath(this.name, this._parent) : [this.name];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "formDirective", {
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "validator", {
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModel.prototype, "asyncValidator", {
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        NgModel.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        NgModel.prototype._setUpControl = function () {
	            this._isStandalone() ? this._setUpStandalone() :
	                this.formDirective.addControl(this);
	            this._registered = true;
	        };
	        NgModel.prototype._isStandalone = function () {
	            return !this._parent || (this.options && this.options.standalone);
	        };
	        NgModel.prototype._setUpStandalone = function () {
	            setUpControl(this._control, this);
	            this._control.updateValueAndValidity({ emitEvent: false });
	        };
	        NgModel.prototype._checkForErrors = function () {
	            if (!this._isStandalone()) {
	                this._checkParentType();
	            }
	            this._checkName();
	        };
	        NgModel.prototype._checkParentType = function () {
	            if (!(this._parent instanceof NgModelGroup) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                TemplateDrivenErrors.formGroupNameException();
	            }
	            else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
	                TemplateDrivenErrors.modelParentException();
	            }
	        };
	        NgModel.prototype._checkName = function () {
	            if (this.options && this.options.name)
	                this.name = this.options.name;
	            if (!this._isStandalone() && !this.name) {
	                TemplateDrivenErrors.missingNameException();
	            }
	        };
	        NgModel.prototype._updateValue = function (value) {
	            var _this = this;
	            resolvedPromise$1.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
	        };
	        NgModel.prototype._updateDisabled = function (changes) {
	            var _this = this;
	            var disabledValue = changes['isDisabled'].currentValue;
	            var isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
	            resolvedPromise$1.then(function () {
	                if (isDisabled && !_this.control.disabled) {
	                    _this.control.disable();
	                }
	                else if (!isDisabled && _this.control.disabled) {
	                    _this.control.enable();
	                }
	            });
	        };
	        NgModel.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[ngModel]:not([formControlName]):not([formControl])',
	                        providers: [formControlBinding],
	                        exportAs: 'ngModel'
	                    },] },
	        ];
	        /** @nocollapse */
	        NgModel.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ];
	        NgModel.propDecorators = {
	            'name': [{ type: _angular_core.Input },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'options': [{ type: _angular_core.Input, args: ['ngModelOptions',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	        };
	        return NgModel;
	    }(NgControl));
	
	    var ReactiveErrors = (function () {
	        function ReactiveErrors() {
	        }
	        ReactiveErrors.controlParentException = function () {
	            throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formControlName);
	        };
	        ReactiveErrors.ngModelGroupException = function () {
	            throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + Examples.formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + Examples.ngModelGroup);
	        };
	        ReactiveErrors.missingFormException = function () {
	            throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + Examples.formControlName);
	        };
	        ReactiveErrors.groupParentException = function () {
	            throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + Examples.formGroupName);
	        };
	        ReactiveErrors.arrayParentException = function () {
	            throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + Examples.formArrayName);
	        };
	        ReactiveErrors.disabledAttrWarning = function () {
	            console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
	        };
	        return ReactiveErrors;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$9 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var formControlBinding$1 = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlDirective; })
	    };
	    /**
	     * @whatItDoes Syncs a standalone {@link FormControl} instance to a form control element.
	     *
	     * In other words, this directive ensures that any values written to the {@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {@link FormControl} instance (view -> model).
	     *
	     * @howToUse
	     *
	     * Use this directive if you'd like to create and manage a {@link FormControl} instance directly.
	     * Simply create a {@link FormControl}, save it to your component class, and pass it into the
	     * {@link FormControlDirective}.
	     *
	     * This directive is designed to be used as a standalone control.  Unlike {@link FormControlName},
	     * it does not require that your {@link FormControl} instance be part of any parent
	     * {@link FormGroup}, and it won't be registered to any {@link FormGroupDirective} that
	     * exists above it.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {@link FormControl} instance. See a full list of available properties in
	     * {@link AbstractControl}.
	     *
	     * **Set the value**: You can pass in an initial value when instantiating the {@link FormControl},
	     * or you can set it programmatically later using {@link AbstractControl.setValue} or
	     * {@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {@link AbstractControl.valueChanges} event.  You can also listen to
	     * {@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     *  @stable
	     */
	    var FormControlDirective = (function (_super) {
	        __extends$9(FormControlDirective, _super);
	        function FormControlDirective(validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this.update = new EventEmitter();
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        FormControlDirective.prototype.ngOnChanges = function (changes) {
	            if (this._isControlChanged(changes)) {
	                setUpControl(this.form, this);
	                if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                    this.valueAccessor.setDisabledState(true);
	                }
	                this.form.updateValueAndValidity({ emitEvent: false });
	            }
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.form.setValue(this.model);
	                this.viewModel = this.model;
	            }
	        };
	        Object.defineProperty(FormControlDirective.prototype, "path", {
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "validator", {
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlDirective.prototype, "control", {
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        FormControlDirective.prototype._isControlChanged = function (changes) {
	            return changes.hasOwnProperty('form');
	        };
	        FormControlDirective.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControl]', providers: [formControlBinding$1], exportAs: 'ngForm' },] },
	        ];
	        /** @nocollapse */
	        FormControlDirective.ctorParameters = [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ];
	        FormControlDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formControl',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlDirective;
	    }(NgControl));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$11 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var formDirectiveProvider$1 = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupDirective; })
	    };
	    /**
	     * @whatItDoes Binds an existing {@link FormGroup} to a DOM element.
	     *
	     * @howToUse
	     *
	     * This directive accepts an existing {@link FormGroup} instance. It will then use this
	     * {@link FormGroup} instance to match any child {@link FormControl}, {@link FormGroup},
	     * and {@link FormArray} instances to child {@link FormControlName}, {@link FormGroupName},
	     * and {@link FormArrayName} directives.
	     *
	     * **Set value**: You can set the form's initial value when instantiating the
	     * {@link FormGroup}, or you can set it programmatically later using the {@link FormGroup}'s
	     * {@link AbstractControl.setValue} or {@link AbstractControl.patchValue} methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the form, you can subscribe
	     * to the {@link FormGroup}'s {@link AbstractControl.valueChanges} event.  You can also listen to
	     * its {@link AbstractControl.statusChanges} event to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * **npm package**: `@angular/forms`
	     *
	     * **NgModule**: {@link ReactiveFormsModule}
	     *
	     *  @stable
	     */
	    var FormGroupDirective = (function (_super) {
	        __extends$11(FormGroupDirective, _super);
	        function FormGroupDirective(_validators, _asyncValidators) {
	            _super.call(this);
	            this._validators = _validators;
	            this._asyncValidators = _asyncValidators;
	            this._submitted = false;
	            this.directives = [];
	            this.form = null;
	            this.ngSubmit = new EventEmitter();
	        }
	        FormGroupDirective.prototype.ngOnChanges = function (changes) {
	            this._checkFormPresent();
	            if (changes.hasOwnProperty('form')) {
	                this._updateValidators();
	                this._updateDomValue();
	                this._updateRegistrations();
	            }
	        };
	        Object.defineProperty(FormGroupDirective.prototype, "submitted", {
	            get: function () { return this._submitted; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "control", {
	            get: function () { return this.form; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormGroupDirective.prototype, "path", {
	            get: function () { return []; },
	            enumerable: true,
	            configurable: true
	        });
	        FormGroupDirective.prototype.addControl = function (dir) {
	            var ctrl = this.form.get(dir.path);
	            setUpControl(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	            this.directives.push(dir);
	            return ctrl;
	        };
	        FormGroupDirective.prototype.getControl = function (dir) { return this.form.get(dir.path); };
	        FormGroupDirective.prototype.removeControl = function (dir) { ListWrapper.remove(this.directives, dir); };
	        FormGroupDirective.prototype.addFormGroup = function (dir) {
	            var ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        FormGroupDirective.prototype.removeFormGroup = function (dir) { };
	        FormGroupDirective.prototype.getFormGroup = function (dir) { return this.form.get(dir.path); };
	        FormGroupDirective.prototype.addFormArray = function (dir) {
	            var ctrl = this.form.get(dir.path);
	            setUpFormContainer(ctrl, dir);
	            ctrl.updateValueAndValidity({ emitEvent: false });
	        };
	        FormGroupDirective.prototype.removeFormArray = function (dir) { };
	        FormGroupDirective.prototype.getFormArray = function (dir) { return this.form.get(dir.path); };
	        FormGroupDirective.prototype.updateModel = function (dir, value) {
	            var ctrl = this.form.get(dir.path);
	            ctrl.setValue(value);
	        };
	        FormGroupDirective.prototype.onSubmit = function () {
	            this._submitted = true;
	            this.ngSubmit.emit(null);
	            return false;
	        };
	        FormGroupDirective.prototype.onReset = function () { this.resetForm(); };
	        FormGroupDirective.prototype.resetForm = function (value) {
	            if (value === void 0) { value = undefined; }
	            this.form.reset(value);
	            this._submitted = false;
	        };
	        /** @internal */
	        FormGroupDirective.prototype._updateDomValue = function () {
	            var _this = this;
	            this.directives.forEach(function (dir) {
	                var newCtrl = _this.form.get(dir.path);
	                if (dir._control !== newCtrl) {
	                    cleanUpControl(dir._control, dir);
	                    if (newCtrl)
	                        setUpControl(newCtrl, dir);
	                    dir._control = newCtrl;
	                }
	            });
	            this.form._updateTreeValidity({ emitEvent: false });
	        };
	        FormGroupDirective.prototype._updateRegistrations = function () {
	            var _this = this;
	            this.form._registerOnCollectionChange(function () { return _this._updateDomValue(); });
	            if (this._oldForm)
	                this._oldForm._registerOnCollectionChange(function () { });
	            this._oldForm = this.form;
	        };
	        FormGroupDirective.prototype._updateValidators = function () {
	            var sync = composeValidators(this._validators);
	            this.form.validator = Validators.compose([this.form.validator, sync]);
	            var async = composeAsyncValidators(this._asyncValidators);
	            this.form.asyncValidator = Validators.composeAsync([this.form.asyncValidator, async]);
	        };
	        FormGroupDirective.prototype._checkFormPresent = function () {
	            if (!this.form) {
	                ReactiveErrors.missingFormException();
	            }
	        };
	        FormGroupDirective.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[formGroup]',
	                        providers: [formDirectiveProvider$1],
	                        host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
	                        exportAs: 'ngForm'
	                    },] },
	        ];
	        /** @nocollapse */
	        FormGroupDirective.ctorParameters = [
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ];
	        FormGroupDirective.propDecorators = {
	            'form': [{ type: _angular_core.Input, args: ['formGroup',] },],
	            'ngSubmit': [{ type: _angular_core.Output },],
	        };
	        return FormGroupDirective;
	    }(ControlContainer));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$12 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var formGroupNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormGroupName; })
	    };
	    /**
	     * @whatItDoes Syncs a nested {@link FormGroup} to a DOM element.
	     *
	     * @howToUse
	     *
	     * This directive can only be used with a parent {@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {@link FormGroup} you want to link, and
	     * will look for a {@link FormGroup} registered with that name in the parent
	     * {@link FormGroup} instance you passed into {@link FormGroupDirective}.
	     *
	     * Nested form groups can come in handy when you want to validate a sub-group of a
	     * form separately from the rest or when you'd like to group the values of certain
	     * controls into their own nested object.
	     *
	     * **Access the group**: You can access the associated {@link FormGroup} using the
	     * {@link AbstractControl.get} method. Ex: `this.form.get('name')`.
	     *
	     * You can also access individual controls within the group using dot syntax.
	     * Ex: `this.form.get('name.first')`
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {@link FormGroup}. See a full list of available properties in {@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {@link FormGroup}, or you can set it programmatically later using
	     * {@link AbstractControl.setValue} or {@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the group, you can
	     * subscribe to the {@link AbstractControl.valueChanges} event.  You can also listen to
	     * {@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * {@example forms/ts/nestedFormGroup/nested_form_group_example.ts region='Component'}
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * @stable
	     */
	    var FormGroupName = (function (_super) {
	        __extends$12(FormGroupName, _super);
	        function FormGroupName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        /** @internal */
	        FormGroupName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.groupParentException();
	            }
	        };
	        FormGroupName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormGroupName.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ];
	        FormGroupName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formGroupName',] },],
	        };
	        return FormGroupName;
	    }(AbstractFormGroupDirective));
	    var formArrayNameProvider = {
	        provide: ControlContainer,
	        useExisting: _angular_core.forwardRef(function () { return FormArrayName; })
	    };
	    /**
	     * @whatItDoes Syncs a nested {@link FormArray} to a DOM element.
	     *
	     * @howToUse
	     *
	     * This directive is designed to be used with a parent {@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the nested {@link FormArray} you want to link, and
	     * will look for a {@link FormArray} registered with that name in the parent
	     * {@link FormGroup} instance you passed into {@link FormGroupDirective}.
	     *
	     * Nested form arrays can come in handy when you have a group of form controls but
	     * you're not sure how many there will be. Form arrays allow you to create new
	     * form controls dynamically.
	     *
	     * **Access the array**: You can access the associated {@link FormArray} using the
	     * {@link AbstractControl.get} method on the parent {@link FormGroup}.
	     * Ex: `this.form.get('cities')`.
	     *
	     * **Get the value**: the `value` property is always synced and available on the
	     * {@link FormArray}. See a full list of available properties in {@link AbstractControl}.
	     *
	     * **Set the value**: You can set an initial value for each child control when instantiating
	     * the {@link FormArray}, or you can set the value programmatically later using the
	     * {@link FormArray}'s {@link AbstractControl.setValue} or {@link AbstractControl.patchValue}
	     * methods.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the array, you can
	     * subscribe to the {@link FormArray}'s {@link AbstractControl.valueChanges} event.  You can also
	     * listen to its {@link AbstractControl.statusChanges} event to be notified when the validation
	     * status is re-calculated.
	     *
	     * **Add new controls**: You can add new controls to the {@link FormArray} dynamically by
	     * calling its {@link FormArray.push} method.
	     *  Ex: `this.form.get('cities').push(new FormControl());`
	     *
	     * ### Example
	     *
	     * {@example forms/ts/nestedFormArray/nested_form_array_example.ts region='Component'}
	     *
	     * * **npm package**: `@angular/forms`
	     *
	     * * **NgModule**: `ReactiveFormsModule`
	     *
	     * @stable
	     */
	    var FormArrayName = (function (_super) {
	        __extends$12(FormArrayName, _super);
	        function FormArrayName(parent, validators, asyncValidators) {
	            _super.call(this);
	            this._parent = parent;
	            this._validators = validators;
	            this._asyncValidators = asyncValidators;
	        }
	        FormArrayName.prototype.ngOnInit = function () {
	            this._checkParentType();
	            this.formDirective.addFormArray(this);
	        };
	        FormArrayName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeFormArray(this);
	            }
	        };
	        Object.defineProperty(FormArrayName.prototype, "control", {
	            get: function () { return this.formDirective.getFormArray(this); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "formDirective", {
	            get: function () {
	                return this._parent ? this._parent.formDirective : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "path", {
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "validator", {
	            get: function () { return composeValidators(this._validators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
	            get: function () { return composeAsyncValidators(this._asyncValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        FormArrayName.prototype._checkParentType = function () {
	            if (_hasInvalidParent(this._parent)) {
	                ReactiveErrors.arrayParentException();
	            }
	        };
	        FormArrayName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
	        ];
	        /** @nocollapse */
	        FormArrayName.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	        ];
	        FormArrayName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formArrayName',] },],
	        };
	        return FormArrayName;
	    }(ControlContainer));
	    function _hasInvalidParent(parent) {
	        return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) &&
	            !(parent instanceof FormArrayName);
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$10 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var controlNameBinding = {
	        provide: NgControl,
	        useExisting: _angular_core.forwardRef(function () { return FormControlName; })
	    };
	    /**
	     * @whatItDoes  Syncs a {@link FormControl} in an existing {@link FormGroup} to a form control
	     * element by name.
	     *
	     * In other words, this directive ensures that any values written to the {@link FormControl}
	     * instance programmatically will be written to the DOM element (model -> view). Conversely,
	     * any values written to the DOM element through user input will be reflected in the
	     * {@link FormControl} instance (view -> model).
	     *
	     * @howToUse
	     *
	     * This directive is designed to be used with a parent {@link FormGroupDirective} (selector:
	     * `[formGroup]`).
	     *
	     * It accepts the string name of the {@link FormControl} instance you want to
	     * link, and will look for a {@link FormControl} registered with that name in the
	     * closest {@link FormGroup} or {@link FormArray} above it.
	     *
	     * **Access the control**: You can access the {@link FormControl} associated with
	     * this directive by using the {@link AbstractControl.get} method.
	     * Ex: `this.form.get('first');`
	     *
	     * **Get value**: the `value` property is always synced and available on the {@link FormControl}.
	     * See a full list of available properties in {@link AbstractControl}.
	     *
	     *  **Set value**: You can set an initial value for the control when instantiating the
	     *  {@link FormControl}, or you can set it programmatically later using
	     *  {@link AbstractControl.setValue} or {@link AbstractControl.patchValue}.
	     *
	     * **Listen to value**: If you want to listen to changes in the value of the control, you can
	     * subscribe to the {@link AbstractControl.valueChanges} event.  You can also listen to
	     * {@link AbstractControl.statusChanges} to be notified when the validation status is
	     * re-calculated.
	     *
	     * ### Example
	     *
	     * In this example, we create form controls for first name and last name.
	     *
	     * {@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
	     *
	     * To see `formControlName` examples with different form control types, see:
	     *
	     * * Radio buttons: {@link RadioControlValueAccessor}
	     * * Selects: {@link SelectControlValueAccessor}
	     *
	     * **npm package**: `@angular/forms`
	     *
	     * **NgModule**: {@link ReactiveFormsModule}
	     *
	     *  @stable
	     */
	    var FormControlName = (function (_super) {
	        __extends$10(FormControlName, _super);
	        function FormControlName(parent, validators, asyncValidators, valueAccessors) {
	            _super.call(this);
	            this._added = false;
	            this.update = new EventEmitter();
	            this._parent = parent;
	            this._rawValidators = validators || [];
	            this._rawAsyncValidators = asyncValidators || [];
	            this.valueAccessor = selectValueAccessor(this, valueAccessors);
	        }
	        Object.defineProperty(FormControlName.prototype, "isDisabled", {
	            set: function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
	            enumerable: true,
	            configurable: true
	        });
	        FormControlName.prototype.ngOnChanges = function (changes) {
	            if (!this._added)
	                this._setUpControl();
	            if (isPropertyUpdated(changes, this.viewModel)) {
	                this.viewModel = this.model;
	                this.formDirective.updateModel(this, this.model);
	            }
	        };
	        FormControlName.prototype.ngOnDestroy = function () {
	            if (this.formDirective) {
	                this.formDirective.removeControl(this);
	            }
	        };
	        FormControlName.prototype.viewToModelUpdate = function (newValue) {
	            this.viewModel = newValue;
	            this.update.emit(newValue);
	        };
	        Object.defineProperty(FormControlName.prototype, "path", {
	            get: function () { return controlPath(this.name, this._parent); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "formDirective", {
	            get: function () { return this._parent ? this._parent.formDirective : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "validator", {
	            get: function () { return composeValidators(this._rawValidators); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "asyncValidator", {
	            get: function () {
	                return composeAsyncValidators(this._rawAsyncValidators);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(FormControlName.prototype, "control", {
	            get: function () { return this._control; },
	            enumerable: true,
	            configurable: true
	        });
	        FormControlName.prototype._checkParentType = function () {
	            if (!(this._parent instanceof FormGroupName) &&
	                this._parent instanceof AbstractFormGroupDirective) {
	                ReactiveErrors.ngModelGroupException();
	            }
	            else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
	                !(this._parent instanceof FormArrayName)) {
	                ReactiveErrors.controlParentException();
	            }
	        };
	        FormControlName.prototype._setUpControl = function () {
	            this._checkParentType();
	            this._control = this.formDirective.addControl(this);
	            if (this.control.disabled && this.valueAccessor.setDisabledState) {
	                this.valueAccessor.setDisabledState(true);
	            }
	            this._added = true;
	        };
	        FormControlName.decorators = [
	            { type: _angular_core.Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
	        ];
	        /** @nocollapse */
	        FormControlName.ctorParameters = [
	            { type: ControlContainer, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Host }, { type: _angular_core.SkipSelf },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_ASYNC_VALIDATORS,] },] },
	            { type: Array, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Self }, { type: _angular_core.Inject, args: [NG_VALUE_ACCESSOR,] },] },
	        ];
	        FormControlName.propDecorators = {
	            'name': [{ type: _angular_core.Input, args: ['formControlName',] },],
	            'model': [{ type: _angular_core.Input, args: ['ngModel',] },],
	            'update': [{ type: _angular_core.Output, args: ['ngModelChange',] },],
	            'isDisabled': [{ type: _angular_core.Input, args: ['disabled',] },],
	        };
	        return FormControlName;
	    }(NgControl));
	
	    var REQUIRED_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return RequiredValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `required` validator to any controls marked with the
	     * `required` attribute, via the {@link NG_VALIDATORS} binding.
	     *
	     * ### Example
	     *
	     * ```
	     * <input name="fullName" ngModel required>
	     * ```
	     *
	     * @stable
	     */
	    var RequiredValidator = (function () {
	        function RequiredValidator() {
	        }
	        Object.defineProperty(RequiredValidator.prototype, "required", {
	            get: function () { return this._required; },
	            set: function (value) {
	                this._required = isPresent(value) && "" + value !== 'false';
	                if (this._onChange)
	                    this._onChange();
	            },
	            enumerable: true,
	            configurable: true
	        });
	        RequiredValidator.prototype.validate = function (c) {
	            return this.required ? Validators.required(c) : null;
	        };
	        RequiredValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        RequiredValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[required][formControlName],[required][formControl],[required][ngModel]',
	                        providers: [REQUIRED_VALIDATOR],
	                        host: { '[attr.required]': 'required? "" : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        RequiredValidator.ctorParameters = [];
	        RequiredValidator.propDecorators = {
	            'required': [{ type: _angular_core.Input },],
	        };
	        return RequiredValidator;
	    }());
	    /**
	     * Provider which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='min'}
	     */
	    var MIN_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MinLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {@link MinLengthValidator} for any `formControlName`,
	     * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
	     *
	     * @stable
	     */
	    var MinLengthValidator = (function () {
	        function MinLengthValidator() {
	        }
	        MinLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.minLength(parseInt(this.minlength, 10));
	        };
	        MinLengthValidator.prototype.ngOnChanges = function (changes) {
	            if (changes['minlength']) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        MinLengthValidator.prototype.validate = function (c) {
	            return isPresent(this.minlength) ? this._validator(c) : null;
	        };
	        MinLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        MinLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
	                        providers: [MIN_LENGTH_VALIDATOR],
	                        host: { '[attr.minlength]': 'minlength? minlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MinLengthValidator.ctorParameters = [];
	        MinLengthValidator.propDecorators = {
	            'minlength': [{ type: _angular_core.Input },],
	        };
	        return MinLengthValidator;
	    }());
	    /**
	     * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
	     *
	     * ## Example:
	     *
	     * {@example common/forms/ts/validators/validators.ts region='max'}
	     */
	    var MAX_LENGTH_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return MaxLengthValidator; }),
	        multi: true
	    };
	    /**
	     * A directive which installs the {@link MaxLengthValidator} for any `formControlName,
	     * `formControl`,
	     * or control with `ngModel` that also has a `maxlength` attribute.
	     *
	     * @stable
	     */
	    var MaxLengthValidator = (function () {
	        function MaxLengthValidator() {
	        }
	        MaxLengthValidator.prototype._createValidator = function () {
	            this._validator = Validators.maxLength(parseInt(this.maxlength, 10));
	        };
	        MaxLengthValidator.prototype.ngOnChanges = function (changes) {
	            if (changes['maxlength']) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        MaxLengthValidator.prototype.validate = function (c) {
	            return isPresent(this.maxlength) ? this._validator(c) : null;
	        };
	        MaxLengthValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        MaxLengthValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
	                        providers: [MAX_LENGTH_VALIDATOR],
	                        host: { '[attr.maxlength]': 'maxlength? maxlength : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        MaxLengthValidator.ctorParameters = [];
	        MaxLengthValidator.propDecorators = {
	            'maxlength': [{ type: _angular_core.Input },],
	        };
	        return MaxLengthValidator;
	    }());
	    var PATTERN_VALIDATOR = {
	        provide: NG_VALIDATORS,
	        useExisting: _angular_core.forwardRef(function () { return PatternValidator; }),
	        multi: true
	    };
	    /**
	     * A Directive that adds the `pattern` validator to any controls marked with the
	     * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
	     * as the regex to validate Control value against.  Follows pattern attribute
	     * semantics; i.e. regex must match entire Control value.
	     *
	     * ### Example
	     *
	     * ```
	     * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
	     * ```
	     * @stable
	     */
	    var PatternValidator = (function () {
	        function PatternValidator() {
	        }
	        PatternValidator.prototype._createValidator = function () { this._validator = Validators.pattern(this.pattern); };
	        PatternValidator.prototype.ngOnChanges = function (changes) {
	            if (changes['pattern']) {
	                this._createValidator();
	                if (this._onChange)
	                    this._onChange();
	            }
	        };
	        PatternValidator.prototype.validate = function (c) {
	            return isPresent(this.pattern) ? this._validator(c) : null;
	        };
	        PatternValidator.prototype.registerOnValidatorChange = function (fn) { this._onChange = fn; };
	        PatternValidator.decorators = [
	            { type: _angular_core.Directive, args: [{
	                        selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
	                        providers: [PATTERN_VALIDATOR],
	                        host: { '[attr.pattern]': 'pattern? pattern : null' }
	                    },] },
	        ];
	        /** @nocollapse */
	        PatternValidator.ctorParameters = [];
	        PatternValidator.propDecorators = {
	            'pattern': [{ type: _angular_core.Input },],
	        };
	        return PatternValidator;
	    }());
	
	    /**
	     * @whatItDoes Creates an {@link AbstractControl} from a user-specified configuration.
	     *
	     * It is essentially syntactic sugar that shortens the `new FormGroup()`,
	     * `new FormControl()`, and `new FormArray()` boilerplate that can build up in larger
	     * forms.
	     *
	     * @howToUse
	     *
	     * To use, inject `FormBuilder` into your component class. You can then call its methods
	     * directly.
	     *
	     * {@example forms/ts/formBuilder/form_builder_example.ts region='Component'}
	     *
	     *  * **npm package**: `@angular/forms`
	     *
	     *  * **NgModule**: {@link ReactiveFormsModule}
	     *
	     * @stable
	     */
	    var FormBuilder = (function () {
	        function FormBuilder() {
	        }
	        /**
	         * Construct a new {@link FormGroup} with the given map of configuration.
	         * Valid keys for the `extra` parameter map are `validator` and `asyncValidator`.
	         *
	         * See the {@link FormGroup} constructor for more details.
	         */
	        FormBuilder.prototype.group = function (controlsConfig, extra) {
	            if (extra === void 0) { extra = null; }
	            var controls = this._reduceControls(controlsConfig);
	            var validator = isPresent(extra) ? extra['validator'] : null;
	            var asyncValidator = isPresent(extra) ? extra['asyncValidator'] : null;
	            return new FormGroup(controls, validator, asyncValidator);
	        };
	        /**
	         * Construct a new {@link FormControl} with the given `formState`,`validator`, and
	         * `asyncValidator`.
	         *
	         * `formState` can either be a standalone value for the form control or an object
	         * that contains both a value and a disabled status.
	         *
	         */
	        FormBuilder.prototype.control = function (formState, validator, asyncValidator) {
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            return new FormControl(formState, validator, asyncValidator);
	        };
	        /**
	         * Construct a {@link FormArray} from the given `controlsConfig` array of
	         * configuration, with the given optional `validator` and `asyncValidator`.
	         */
	        FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
	            var _this = this;
	            if (validator === void 0) { validator = null; }
	            if (asyncValidator === void 0) { asyncValidator = null; }
	            var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
	            return new FormArray(controls, validator, asyncValidator);
	        };
	        /** @internal */
	        FormBuilder.prototype._reduceControls = function (controlsConfig) {
	            var _this = this;
	            var controls = {};
	            Object.keys(controlsConfig).forEach(function (controlName) {
	                controls[controlName] = _this._createControl(controlsConfig[controlName]);
	            });
	            return controls;
	        };
	        /** @internal */
	        FormBuilder.prototype._createControl = function (controlConfig) {
	            if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
	                controlConfig instanceof FormArray) {
	                return controlConfig;
	            }
	            else if (isArray(controlConfig)) {
	                var value = controlConfig[0];
	                var validator = controlConfig.length > 1 ? controlConfig[1] : null;
	                var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
	                return this.control(value, validator, asyncValidator);
	            }
	            else {
	                return this.control(controlConfig);
	            }
	        };
	        FormBuilder.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        FormBuilder.ctorParameters = [];
	        return FormBuilder;
	    }());
	
	    var SHARED_FORM_DIRECTIVES = [
	        NgSelectOption, NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor,
	        CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor,
	        RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator,
	        MinLengthValidator, MaxLengthValidator, PatternValidator
	    ];
	    var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
	    var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
	    /**
	     * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
	     */
	    var InternalFormsSharedModule = (function () {
	        function InternalFormsSharedModule() {
	        }
	        InternalFormsSharedModule.decorators = [
	            { type: _angular_core.NgModule, args: [{ declarations: SHARED_FORM_DIRECTIVES, exports: SHARED_FORM_DIRECTIVES },] },
	        ];
	        /** @nocollapse */
	        InternalFormsSharedModule.ctorParameters = [];
	        return InternalFormsSharedModule;
	    }());
	
	    /**
	     * The ng module for forms.
	     * @stable
	     */
	    var FormsModule = (function () {
	        function FormsModule() {
	        }
	        FormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: TEMPLATE_DRIVEN_DIRECTIVES,
	                        providers: [RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        FormsModule.ctorParameters = [];
	        return FormsModule;
	    }());
	    /**
	     * The ng module for reactive forms.
	     * @stable
	     */
	    var ReactiveFormsModule = (function () {
	        function ReactiveFormsModule() {
	        }
	        ReactiveFormsModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        declarations: [REACTIVE_DRIVEN_DIRECTIVES],
	                        providers: [FormBuilder, RadioControlRegistry],
	                        exports: [InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
	                    },] },
	        ];
	        /** @nocollapse */
	        ReactiveFormsModule.ctorParameters = [];
	        return ReactiveFormsModule;
	    }());
	
	    exports.AbstractControlDirective = AbstractControlDirective;
	    exports.AbstractFormGroupDirective = AbstractFormGroupDirective;
	    exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
	    exports.ControlContainer = ControlContainer;
	    exports.NG_VALUE_ACCESSOR = NG_VALUE_ACCESSOR;
	    exports.DefaultValueAccessor = DefaultValueAccessor;
	    exports.NgControl = NgControl;
	    exports.NgControlStatus = NgControlStatus;
	    exports.NgControlStatusGroup = NgControlStatusGroup;
	    exports.NgForm = NgForm;
	    exports.NgModel = NgModel;
	    exports.NgModelGroup = NgModelGroup;
	    exports.RadioControlValueAccessor = RadioControlValueAccessor;
	    exports.FormControlDirective = FormControlDirective;
	    exports.FormControlName = FormControlName;
	    exports.FormGroupDirective = FormGroupDirective;
	    exports.FormArrayName = FormArrayName;
	    exports.FormGroupName = FormGroupName;
	    exports.NgSelectOption = NgSelectOption;
	    exports.SelectControlValueAccessor = SelectControlValueAccessor;
	    exports.SelectMultipleControlValueAccessor = SelectMultipleControlValueAccessor;
	    exports.MaxLengthValidator = MaxLengthValidator;
	    exports.MinLengthValidator = MinLengthValidator;
	    exports.PatternValidator = PatternValidator;
	    exports.RequiredValidator = RequiredValidator;
	    exports.FormBuilder = FormBuilder;
	    exports.AbstractControl = AbstractControl;
	    exports.FormArray = FormArray;
	    exports.FormControl = FormControl;
	    exports.FormGroup = FormGroup;
	    exports.NG_ASYNC_VALIDATORS = NG_ASYNC_VALIDATORS;
	    exports.NG_VALIDATORS = NG_VALIDATORS;
	    exports.Validators = Validators;
	    exports.FormsModule = FormsModule;
	    exports.ReactiveFormsModule = ReactiveFormsModule;
	
	}));


/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(4);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(28);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.iterator) {
	        exports.$$iterator = Symbol.iterator;
	    }
	    else if (typeof Symbol.for === 'function') {
	        exports.$$iterator = Symbol.for('iterator');
	    }
	}
	else {
	    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
	        // Bug for mozilla version
	        exports.$$iterator = '@@iterator';
	    }
	    else if (root_1.root.Map) {
	        // es6-shim specific logic
	        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
	                exports.$$iterator = key;
	                break;
	            }
	        }
	    }
	    else {
	        exports.$$iterator = '@@iterator';
	    }
	}
	//# sourceMappingURL=iterator.js.map

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(13);
	var Angular2OptionComponent = (function () {
	    function Angular2OptionComponent(changeDetectionRef) {
	        this.changeDetectionRef = changeDetectionRef;
	        this.disabled = false;
	        this.selected = false;
	        this.onSelect = new core_1.EventEmitter();
	        this.isActive = false;
	        this.text = '';
	    }
	    Angular2OptionComponent.prototype.ngOnInit = function () {
	        if (this.selected)
	            this.markAsSelected(false);
	    };
	    Angular2OptionComponent.prototype.ngAfterViewInit = function () {
	        // get the text of this element
	        this.text = this.DOMContent.nativeElement.innerHTML.trim();
	    };
	    /**
	     * Mark this element as not selected.
	     * Function is called from select.component
	     */
	    Angular2OptionComponent.prototype.unselect = function () {
	        this.isActive = false;
	    };
	    /**
	     * select this element.
	     */
	    Angular2OptionComponent.prototype._select = function (event) {
	        event.stopPropagation();
	        if (this.disabled)
	            return;
	        this.markAsSelected(true);
	    };
	    /**
	     * Mark this option as selected..
	     */
	    Angular2OptionComponent.prototype.markAsSelected = function (emit) {
	        this.isActive = true;
	        this.changeDetectionRef.detectChanges();
	        if (emit)
	            this.onSelect.emit(this.value);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Angular2OptionComponent.prototype, "value", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Angular2OptionComponent.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Angular2OptionComponent.prototype, "selected", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], Angular2OptionComponent.prototype, "onSelect", void 0);
	    __decorate([
	        core_1.ViewChild('contentWrapper'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object)
	    ], Angular2OptionComponent.prototype, "DOMContent", void 0);
	    Angular2OptionComponent = __decorate([
	        core_1.Component({
	            selector: 'bm-ng2-option',
	            template: "\n        <li (click)=\"_select($event)\"\n            [class.disabled]=\"disabled\"\n            [class.active]=\"isActive\">\n            <div class=\"inner\" #contentWrapper>\n                <ng-content></ng-content>\n            </div>\n        </li>\n    ",
	            styles: ["\n        li {\n          clear: both;\n          color: rgba(0, 0, 0, 0.87);\n          height: 50px;\n          line-height: 50px;\n          border-bottom: 1px solid #ededed;\n          width: 100%;\n          text-align: left;\n          text-transform: none;\n          list-style-type: none;\n        }\n\n        li.disabled {\n          color: rgba(0, 0, 0, 0.3);\n          background-color: transparent;\n        }\n\n        li.active {\n          background-color: #F5F5F5;\n        }\n\n        li:not(.disabled):hover {\n          background-color: #eee;\n        }\n\n        li div.inner {\n          padding-left: 20px;\n        }\n\n        li:not(.disabled) {\n          cursor: pointer;\n        }\n    "]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _c) || Object])
	    ], Angular2OptionComponent);
	    return Angular2OptionComponent;
	    var _a, _b, _c;
	}());
	exports.Angular2OptionComponent = Angular2OptionComponent;


/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification = (function () {
	    function Notification(kind, value, exception) {
	        this.kind = kind;
	        this.value = value;
	        this.exception = exception;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.exception);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.exception);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        }
	        else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
	    Notification.prototype.toObservable = function () {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return Observable_1.Observable.of(this.value);
	            case 'E':
	                return Observable_1.Observable.throw(this.exception);
	            case 'C':
	                return Observable_1.Observable.empty();
	        }
	        throw new Error('unexpected notification kind value');
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` exception.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}());
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(4);
	var ScalarObservable_1 = __webpack_require__(134);
	var EmptyObservable_1 = __webpack_require__(87);
	var isScheduler_1 = __webpack_require__(350);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayObservable = (function (_super) {
	    __extends(ArrayObservable, _super);
	    function ArrayObservable(array, scheduler) {
	        _super.call(this);
	        this.array = array;
	        this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            this._isScalar = true;
	            this.value = array[0];
	        }
	    }
	    ArrayObservable.create = function (array, scheduler) {
	        return new ArrayObservable(array, scheduler);
	    };
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` Scheduler, which means the `next`
	     * notifications are sent synchronously, although with a different Scheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
	    ArrayObservable.of = function () {
	        var array = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            array[_i - 0] = arguments[_i];
	        }
	        var scheduler = array[array.length - 1];
	        if (isScheduler_1.isScheduler(scheduler)) {
	            array.pop();
	        }
	        else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        }
	        else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        }
	        else {
	            return new EmptyObservable_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(array[index]);
	        if (subscriber.closed) {
	            return;
	        }
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var array = this.array;
	        var count = array.length;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < count && !subscriber.closed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable));
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=ArrayObservable.js.map

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(28);
	var Observable_1 = __webpack_require__(4);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var PromiseObservable = (function (_super) {
	    __extends(PromiseObservable, _super);
	    function PromiseObservable(promise, scheduler) {
	        _super.call(this);
	        this.promise = promise;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Converts a Promise to an Observable.
	     *
	     * <span class="informal">Returns an Observable that just emits the Promise's
	     * resolved value, then completes.</span>
	     *
	     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
	     * Observable. If the Promise resolves with a value, the output Observable
	     * emits that resolved value as a `next`, and then completes. If the Promise
	     * is rejected, then the output Observable emits the corresponding Error.
	     *
	     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
	     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link bindCallback}
	     * @see {@link from}
	     *
	     * @param {Promise<T>} promise The promise to be converted.
	     * @param {Scheduler} [scheduler] An optional Scheduler to use for scheduling
	     * the delivery of the resolved value (or the rejection).
	     * @return {Observable<T>} An Observable which wraps the Promise.
	     * @static true
	     * @name fromPromise
	     * @owner Observable
	     */
	    PromiseObservable.create = function (promise, scheduler) {
	        return new PromiseObservable(promise, scheduler);
	    };
	    PromiseObservable.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var promise = this.promise;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            if (this._isScalar) {
	                if (!subscriber.closed) {
	                    subscriber.next(this.value);
	                    subscriber.complete();
	                }
	            }
	            else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.next(value);
	                        subscriber.complete();
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
	                        subscriber.error(err);
	                    }
	                })
	                    .then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1.root.setTimeout(function () { throw err; });
	                });
	            }
	        }
	        else {
	            if (this._isScalar) {
	                if (!subscriber.closed) {
	                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
	                }
	            }
	            else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
	                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
	                    }
	                })
	                    .then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1.root.setTimeout(function () { throw err; });
	                });
	            }
	        }
	    };
	    return PromiseObservable;
	}(Observable_1.Observable));
	exports.PromiseObservable = PromiseObservable;
	function dispatchNext(arg) {
	    var value = arg.value, subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.next(value);
	        subscriber.complete();
	    }
	}
	function dispatchError(arg) {
	    var err = arg.err, subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.error(err);
	    }
	}
	//# sourceMappingURL=PromiseObservable.js.map

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(4);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = (function (_super) {
	    __extends(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	        if (scheduler) {
	            this._isScalar = false;
	        }
	    }
	    ScalarObservable.create = function (value, scheduler) {
	        return new ScalarObservable(value, scheduler);
	    };
	    ScalarObservable.dispatch = function (state) {
	        var done = state.done, value = state.value, subscriber = state.subscriber;
	        if (done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.closed) {
	            return;
	        }
	        state.done = true;
	        this.schedule(state);
	    };
	    ScalarObservable.prototype._subscribe = function (subscriber) {
	        var value = this.value;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.next(value);
	            if (!subscriber.closed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable));
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },

/***/ 137:
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(28);
	var isArray_1 = __webpack_require__(64);
	var isPromise_1 = __webpack_require__(137);
	var Observable_1 = __webpack_require__(4);
	var iterator_1 = __webpack_require__(88);
	var InnerSubscriber_1 = __webpack_require__(307);
	var observable_1 = __webpack_require__(89);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.closed) {
	        return null;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return null;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.closed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.closed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        var iterator = result[iterator_1.$$iterator]();
	        do {
	            var item = iterator.next();
	            if (item.done) {
	                destination.complete();
	                break;
	            }
	            destination.next(item.value);
	            if (destination.closed) {
	                break;
	            }
	        } while (true);
	    }
	    else if (typeof result[observable_1.$$observable] === 'function') {
	        var obs = result[observable_1.$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error(new Error('invalid observable'));
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	    return null;
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(13), __webpack_require__(53), __webpack_require__(41), __webpack_require__(45), __webpack_require__(4), __webpack_require__(91), __webpack_require__(65), __webpack_require__(310), __webpack_require__(312), __webpack_require__(319), __webpack_require__(316), __webpack_require__(315), __webpack_require__(320), __webpack_require__(317), __webpack_require__(313), __webpack_require__(318)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/platform-browser', '@angular/forms', 'rxjs/Observable', '@angular/common', '@angular/http', 'rxjs/add/observable/forkJoin', 'rxjs/add/observable/of', 'rxjs/add/operator/map', 'rxjs/add/operator/filter', 'rxjs/add/operator/do', 'rxjs/add/operator/share', 'rxjs/add/operator/finally', 'rxjs/add/operator/catch', 'rxjs/add/operator/first'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}),global.ng.core,global.Rx,global.ng.platformBrowser,global.ng.forms,global.Rx,global.ng.common,global.ng.http,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.rxjs_add_operator_first));
	}(this, (function (exports,_angular_core,rxjs_Subject,_angular_platformBrowser,_angular_forms,rxjs_Observable,_angular_common,_angular_http,rxjs_add_observable_forkJoin,rxjs_add_observable_of,rxjs_add_operator_map,rxjs_add_operator_filter,rxjs_add_operator_do,rxjs_add_operator_share,rxjs_add_operator_finally,rxjs_add_operator_catch,rxjs_add_operator_first) { 'use strict';
	
	var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$1 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Shared directive to count lines inside a text area, such as a list item.
	 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
	 * counted by checking the query list's length.
	 */
	var MdLine = (function () {
	    function MdLine() {
	    }
	    MdLine = __decorate$1([
	        _angular_core.Directive({ selector: '[md-line]' }), 
	        __metadata$1('design:paramtypes', [])
	    ], MdLine);
	    return MdLine;
	}());
	/* Helper that takes a query list of lines and sets the correct class on the host */
	var MdLineSetter = (function () {
	    function MdLineSetter(_lines, _renderer, _element) {
	        var _this = this;
	        this._lines = _lines;
	        this._renderer = _renderer;
	        this._element = _element;
	        this._setLineClass(this._lines.length);
	        this._lines.changes.subscribe(function () {
	            _this._setLineClass(_this._lines.length);
	        });
	    }
	    MdLineSetter.prototype._setLineClass = function (count) {
	        this._resetClasses();
	        if (count === 2 || count === 3) {
	            this._setClass("md-" + count + "-line", true);
	        }
	    };
	    MdLineSetter.prototype._resetClasses = function () {
	        this._setClass('md-2-line', false);
	        this._setClass('md-3-line', false);
	    };
	    MdLineSetter.prototype._setClass = function (className, bool) {
	        this._renderer.setElementClass(this._element.nativeElement, className, bool);
	    };
	    return MdLineSetter;
	}());
	var MdLineModule = (function () {
	    function MdLineModule() {
	    }
	    MdLineModule = __decorate$1([
	        _angular_core.NgModule({
	            exports: [MdLine],
	            declarations: [MdLine],
	        }), 
	        __metadata$1('design:paramtypes', [])
	    ], MdLineModule);
	    return MdLineModule;
	}());
	
	var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$2 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Directive to listen to changes of direction of part of the DOM.
	 *
	 * Applications should use this directive instead of the native attribute so that Material
	 * components can listen on changes of direction.
	 */
	var Dir = (function () {
	    function Dir() {
	        this._dir = 'ltr';
	        this.dirChange = new _angular_core.EventEmitter();
	    }
	    Object.defineProperty(Dir.prototype, "dir", {
	        get: function () {
	            return this._dir;
	        },
	        set: function (v) {
	            var old = this._dir;
	            this._dir = v;
	            if (old != this._dir) {
	                this.dirChange.emit(null);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dir.prototype, "value", {
	        get: function () { return this.dir; },
	        set: function (v) { this.dir = v; },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate$2([
	        _angular_core.Input('dir'), 
	        __metadata$2('design:type', String)
	    ], Dir.prototype, "_dir", void 0);
	    __decorate$2([
	        _angular_core.Output(), 
	        __metadata$2('design:type', Object)
	    ], Dir.prototype, "dirChange", void 0);
	    __decorate$2([
	        _angular_core.HostBinding('attr.dir'), 
	        __metadata$2('design:type', String)
	    ], Dir.prototype, "dir", null);
	    Dir = __decorate$2([
	        _angular_core.Directive({
	            selector: '[dir]',
	            // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
	            exportAs: '$implicit'
	        }), 
	        __metadata$2('design:paramtypes', [])
	    ], Dir);
	    return Dir;
	}());
	var RtlModule = (function () {
	    function RtlModule() {
	    }
	    RtlModule.forRoot = function () {
	        return {
	            ngModule: RtlModule,
	            providers: []
	        };
	    };
	    RtlModule = __decorate$2([
	        _angular_core.NgModule({
	            exports: [Dir],
	            declarations: [Dir]
	        }), 
	        __metadata$2('design:paramtypes', [])
	    ], RtlModule);
	    return RtlModule;
	}());
	
	/** TODO: internal */
	var ForegroundRippleState;
	(function (ForegroundRippleState) {
	    ForegroundRippleState[ForegroundRippleState["NEW"] = 0] = "NEW";
	    ForegroundRippleState[ForegroundRippleState["EXPANDING"] = 1] = "EXPANDING";
	    ForegroundRippleState[ForegroundRippleState["FADING_OUT"] = 2] = "FADING_OUT";
	})(ForegroundRippleState || (ForegroundRippleState = {}));
	/**
	 * Wrapper for a foreground ripple DOM element and its animation state.
	 * TODO: internal
	 */
	var ForegroundRipple = (function () {
	    function ForegroundRipple(rippleElement) {
	        this.rippleElement = rippleElement;
	        this.state = ForegroundRippleState.NEW;
	    }
	    return ForegroundRipple;
	}());
	var RIPPLE_SPEED_PX_PER_SECOND = 1000;
	var MIN_RIPPLE_FILL_TIME_SECONDS = 0.1;
	var MAX_RIPPLE_FILL_TIME_SECONDS = 0.3;
	/**
	 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
	 */
	var distanceToFurthestCorner = function (x, y, rect) {
	    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
	    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
	    return Math.sqrt(distX * distX + distY * distY);
	};
	/**
	 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
	 * The constructor takes a reference to the ripple directive's host element and a map of DOM
	 * event handlers to be installed on the element that triggers ripple animations.
	 * This will eventually become a custom renderer once Angular support exists.
	 * TODO: internal
	 */
	var RippleRenderer = (function () {
	    function RippleRenderer(_elementRef, _eventHandlers) {
	        this._eventHandlers = _eventHandlers;
	        this._rippleElement = _elementRef.nativeElement;
	        // It might be nice to delay creating the background until it's needed, but doing this in
	        // fadeInRippleBackground causes the first click event to not be handled reliably.
	        this._backgroundDiv = document.createElement('div');
	        this._backgroundDiv.classList.add('md-ripple-background');
	        this._rippleElement.appendChild(this._backgroundDiv);
	    }
	    /**
	     * Installs event handlers on the given trigger element, and removes event handlers from the
	     * previous trigger if needed.
	     */
	    RippleRenderer.prototype.setTriggerElement = function (newTrigger) {
	        var _this = this;
	        if (this._triggerElement !== newTrigger) {
	            if (this._triggerElement) {
	                this._eventHandlers.forEach(function (eventHandler, eventName) {
	                    _this._triggerElement.removeEventListener(eventName, eventHandler);
	                });
	            }
	            this._triggerElement = newTrigger;
	            if (this._triggerElement) {
	                this._eventHandlers.forEach(function (eventHandler, eventName) {
	                    _this._triggerElement.addEventListener(eventName, eventHandler);
	                });
	            }
	        }
	    };
	    /**
	     * Installs event handlers on the host element of the md-ripple directive.
	     */
	    RippleRenderer.prototype.setTriggerElementToHost = function () {
	        this.setTriggerElement(this._rippleElement);
	    };
	    /**
	     * Removes event handlers from the current trigger element if needed.
	     */
	    RippleRenderer.prototype.clearTriggerElement = function () {
	        this.setTriggerElement(null);
	    };
	    /**
	     * Creates a foreground ripple and sets its animation to expand and fade in from the position
	     * given by rippleOriginLeft and rippleOriginTop (or from the center of the <md-ripple>
	     * bounding rect if centered is true).
	     */
	    RippleRenderer.prototype.createForegroundRipple = function (rippleOriginLeft, rippleOriginTop, color, centered, radius, speedFactor, transitionEndCallback) {
	        var parentRect = this._rippleElement.getBoundingClientRect();
	        // Create a foreground ripple div with the size and position of the fully expanded ripple.
	        // When the div is created, it's given a transform style that causes the ripple to be displayed
	        // small and centered on the event location (or the center of the bounding rect if the centered
	        // argument is true). Removing that transform causes the ripple to animate to its natural size.
	        var startX = centered ? (parentRect.left + parentRect.width / 2) : rippleOriginLeft;
	        var startY = centered ? (parentRect.top + parentRect.height / 2) : rippleOriginTop;
	        var offsetX = startX - parentRect.left;
	        var offsetY = startY - parentRect.top;
	        var maxRadius = radius > 0 ? radius : distanceToFurthestCorner(startX, startY, parentRect);
	        var rippleDiv = document.createElement('div');
	        this._rippleElement.appendChild(rippleDiv);
	        rippleDiv.classList.add('md-ripple-foreground');
	        rippleDiv.style.left = (offsetX - maxRadius) + "px";
	        rippleDiv.style.top = (offsetY - maxRadius) + "px";
	        rippleDiv.style.width = 2 * maxRadius + "px";
	        rippleDiv.style.height = rippleDiv.style.width;
	        // If color input is not set, this will default to the background color defined in CSS.
	        rippleDiv.style.backgroundColor = color;
	        // Start the ripple tiny.
	        rippleDiv.style.transform = "scale(0.001)";
	        var fadeInSeconds = (1 / (speedFactor || 1)) * Math.max(MIN_RIPPLE_FILL_TIME_SECONDS, Math.min(MAX_RIPPLE_FILL_TIME_SECONDS, maxRadius / RIPPLE_SPEED_PX_PER_SECOND));
	        rippleDiv.style.transitionDuration = fadeInSeconds + "s";
	        // https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
	        window.getComputedStyle(rippleDiv).opacity;
	        rippleDiv.classList.add('md-ripple-fade-in');
	        // Clearing the transform property causes the ripple to animate to its full size.
	        rippleDiv.style.transform = '';
	        var ripple = new ForegroundRipple(rippleDiv);
	        ripple.state = ForegroundRippleState.EXPANDING;
	        rippleDiv.addEventListener('transitionend', function (event) { return transitionEndCallback(ripple, event); });
	    };
	    /**
	     * Fades out a foreground ripple after it has fully expanded and faded in.
	     */
	    RippleRenderer.prototype.fadeOutForegroundRipple = function (ripple) {
	        ripple.classList.remove('md-ripple-fade-in');
	        ripple.classList.add('md-ripple-fade-out');
	    };
	    /**
	     * Removes a foreground ripple from the DOM after it has faded out.
	     */
	    RippleRenderer.prototype.removeRippleFromDom = function (ripple) {
	        ripple.parentElement.removeChild(ripple);
	    };
	    /**
	     * Fades in the ripple background.
	     */
	    RippleRenderer.prototype.fadeInRippleBackground = function (color) {
	        this._backgroundDiv.classList.add('md-ripple-active');
	        // If color is not set, this will default to the background color defined in CSS.
	        this._backgroundDiv.style.backgroundColor = color;
	    };
	    /**
	     * Fades out the ripple background.
	     */
	    RippleRenderer.prototype.fadeOutRippleBackground = function () {
	        if (this._backgroundDiv) {
	            this._backgroundDiv.classList.remove('md-ripple-active');
	        }
	    };
	    return RippleRenderer;
	}());
	
	var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$3 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdRipple = (function () {
	    function MdRipple(_elementRef) {
	        var _this = this;
	        /**
	         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
	         * will be the distance from the center of the ripple to the furthest corner of the host element's
	         * bounding rectangle.
	         */
	        this.maxRadius = 0;
	        /**
	         * If set, the normal duration of ripple animations is divided by this value. For example,
	         * setting it to 0.5 will cause the animations to take twice as long.
	         */
	        this.speedFactor = 1;
	        // These event handlers are attached to the element that triggers the ripple animations.
	        var eventHandlers = new Map();
	        eventHandlers.set('mousedown', function (event) { return _this._mouseDown(event); });
	        eventHandlers.set('click', function (event) { return _this._click(event); });
	        eventHandlers.set('mouseleave', function (event) { return _this._mouseLeave(event); });
	        this._rippleRenderer = new RippleRenderer(_elementRef, eventHandlers);
	    }
	    /** TODO: internal */
	    MdRipple.prototype.ngOnInit = function () {
	        // If no trigger element was explicity set, use the host element
	        if (!this.trigger) {
	            this._rippleRenderer.setTriggerElementToHost();
	        }
	    };
	    /** TODO: internal */
	    MdRipple.prototype.ngOnDestroy = function () {
	        // Remove event listeners on the trigger element.
	        this._rippleRenderer.clearTriggerElement();
	    };
	    /** TODO: internal */
	    MdRipple.prototype.ngOnChanges = function (changes) {
	        // If the trigger element changed (or is being initially set), add event listeners to it.
	        var changedInputs = Object.keys(changes);
	        if (changedInputs.indexOf('trigger') !== -1) {
	            this._rippleRenderer.setTriggerElement(this.trigger);
	        }
	    };
	    /**
	     * Responds to the start of a ripple animation trigger by fading the background in.
	     */
	    MdRipple.prototype.start = function () {
	        this._rippleRenderer.fadeInRippleBackground(this.backgroundColor);
	    };
	    /**
	     * Responds to the end of a ripple animation trigger by fading the background out, and creating a
	     * foreground ripple that expands from the event location (or from the center of the element if
	     * the "centered" property is set or forceCenter is true).
	     */
	    MdRipple.prototype.end = function (left, top, forceCenter) {
	        var _this = this;
	        if (forceCenter === void 0) { forceCenter = true; }
	        this._rippleRenderer.createForegroundRipple(left, top, this.color, this.centered || forceCenter, this.maxRadius, this.speedFactor, function (ripple, e) { return _this._rippleTransitionEnded(ripple, e); });
	        this._rippleRenderer.fadeOutRippleBackground();
	    };
	    MdRipple.prototype._rippleTransitionEnded = function (ripple, event) {
	        if (event.propertyName === 'opacity') {
	            // If the ripple finished expanding, start fading it out. If it finished fading out,
	            // remove it from the DOM.
	            switch (ripple.state) {
	                case ForegroundRippleState.EXPANDING:
	                    this._rippleRenderer.fadeOutForegroundRipple(ripple.rippleElement);
	                    ripple.state = ForegroundRippleState.FADING_OUT;
	                    break;
	                case ForegroundRippleState.FADING_OUT:
	                    this._rippleRenderer.removeRippleFromDom(ripple.rippleElement);
	                    break;
	            }
	        }
	    };
	    /**
	     * Called when the trigger element receives a mousedown event. Starts the ripple animation by
	     * fading in the background.
	     */
	    MdRipple.prototype._mouseDown = function (event) {
	        if (!this.disabled && event.button === 0) {
	            this.start();
	        }
	    };
	    /**
	     * Called when the trigger element receives a click event. Creates a foreground ripple and
	     * runs its animation.
	     */
	    MdRipple.prototype._click = function (event) {
	        if (!this.disabled && event.button === 0) {
	            // If screen and page positions are all 0, this was probably triggered by a keypress.
	            // In that case, use the center of the bounding rect as the ripple origin.
	            // FIXME: This fails on IE11, which still sets pageX/Y and screenX/Y on keyboard clicks.
	            var isKeyEvent = (event.screenX === 0 && event.screenY === 0 && event.pageX === 0 && event.pageY === 0);
	            this.end(event.pageX, event.pageY, isKeyEvent);
	        }
	    };
	    /**
	     * Called when the trigger element receives a mouseleave event. Fades out the background.
	     */
	    MdRipple.prototype._mouseLeave = function (event) {
	        // We can always fade out the background here; It's a no-op if it was already inactive.
	        this._rippleRenderer.fadeOutRippleBackground();
	    };
	    __decorate$3([
	        _angular_core.Input('md-ripple-trigger'), 
	        __metadata$3('design:type', Object)
	    ], MdRipple.prototype, "trigger", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-centered'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "centered", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-disabled'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "disabled", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-max-radius'), 
	        __metadata$3('design:type', Number)
	    ], MdRipple.prototype, "maxRadius", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-speed-factor'), 
	        __metadata$3('design:type', Number)
	    ], MdRipple.prototype, "speedFactor", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-color'), 
	        __metadata$3('design:type', String)
	    ], MdRipple.prototype, "color", void 0);
	    __decorate$3([
	        _angular_core.Input('md-ripple-background-color'), 
	        __metadata$3('design:type', String)
	    ], MdRipple.prototype, "backgroundColor", void 0);
	    __decorate$3([
	        _angular_core.HostBinding('class.md-ripple-focused'),
	        _angular_core.Input('md-ripple-focused'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "focused", void 0);
	    __decorate$3([
	        _angular_core.HostBinding('class.md-ripple-unbounded'),
	        _angular_core.Input('md-ripple-unbounded'), 
	        __metadata$3('design:type', Boolean)
	    ], MdRipple.prototype, "unbounded", void 0);
	    MdRipple = __decorate$3([
	        _angular_core.Directive({
	            selector: '[md-ripple]',
	        }), 
	        __metadata$3('design:paramtypes', [_angular_core.ElementRef])
	    ], MdRipple);
	    return MdRipple;
	}());
	var MdRippleModule = (function () {
	    function MdRippleModule() {
	    }
	    MdRippleModule.forRoot = function () {
	        return {
	            ngModule: MdRippleModule,
	            providers: []
	        };
	    };
	    MdRippleModule = __decorate$3([
	        _angular_core.NgModule({
	            exports: [MdRipple],
	            declarations: [MdRipple],
	        }), 
	        __metadata$3('design:paramtypes', [])
	    ], MdRippleModule);
	    return MdRippleModule;
	}());
	
	// TODO(kara): Revisit why error messages are not being properly set.
	var __extends$3 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Wrapper around Error that sets the error message.
	 */
	var MdError = (function (_super) {
	    __extends$3(MdError, _super);
	    function MdError(value) {
	        _super.call(this);
	        this.message = value;
	    }
	    return MdError;
	}(Error));
	
	var __extends$2 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
	var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
	    __extends$2(MdComponentPortalAttachedToDomWithoutOriginError, _super);
	    function MdComponentPortalAttachedToDomWithoutOriginError() {
	        _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
	            'because the DOM element is not part of the Angular application context.');
	    }
	    return MdComponentPortalAttachedToDomWithoutOriginError;
	}(MdError));
	/** Exception thrown when attempting to attach a null portal to a host. */
	var MdNullPortalError = (function (_super) {
	    __extends$2(MdNullPortalError, _super);
	    function MdNullPortalError() {
	        _super.call(this, 'Must provide a portal to attach');
	    }
	    return MdNullPortalError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to a host that is already attached. */
	var MdPortalAlreadyAttachedError = (function (_super) {
	    __extends$2(MdPortalAlreadyAttachedError, _super);
	    function MdPortalAlreadyAttachedError() {
	        _super.call(this, 'Host already has a portal attached');
	    }
	    return MdPortalAlreadyAttachedError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to an already-disposed host. */
	var MdPortalHostAlreadyDisposedError = (function (_super) {
	    __extends$2(MdPortalHostAlreadyDisposedError, _super);
	    function MdPortalHostAlreadyDisposedError() {
	        _super.call(this, 'This PortalHost has already been disposed');
	    }
	    return MdPortalHostAlreadyDisposedError;
	}(MdError));
	/** Exception thrown when attempting to attach an unknown portal type. */
	var MdUnknownPortalTypeError = (function (_super) {
	    __extends$2(MdUnknownPortalTypeError, _super);
	    function MdUnknownPortalTypeError() {
	        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
	            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
	    }
	    return MdUnknownPortalTypeError;
	}(MdError));
	/** Exception thrown when attempting to attach a portal to a null host. */
	var MdNullPortalHostError = (function (_super) {
	    __extends$2(MdNullPortalHostError, _super);
	    function MdNullPortalHostError() {
	        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
	    }
	    return MdNullPortalHostError;
	}(MdError));
	/** Exception thrown when attempting to detach a portal that is not attached. */
	var MdNoPortalAttachedError = (function (_super) {
	    __extends$2(MdNoPortalAttachedError, _super);
	    function MdNoPortalAttachedError() {
	        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
	    }
	    return MdNoPortalAttachedError;
	}(MdError));
	
	var __extends$1 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A `Portal` is something that you want to render somewhere else.
	 * It can be attach to / detached from a `PortalHost`.
	 */
	var Portal = (function () {
	    function Portal() {
	    }
	    /** Attach this portal to a host. */
	    Portal.prototype.attach = function (host) {
	        if (host == null) {
	            throw new MdNullPortalHostError();
	        }
	        if (host.hasAttached()) {
	            throw new MdPortalAlreadyAttachedError();
	        }
	        this._attachedHost = host;
	        return host.attach(this);
	    };
	    /** Detach this portal from its host */
	    Portal.prototype.detach = function () {
	        var host = this._attachedHost;
	        if (host == null) {
	            throw new MdNoPortalAttachedError();
	        }
	        this._attachedHost = null;
	        return host.detach();
	    };
	    Object.defineProperty(Portal.prototype, "isAttached", {
	        /** Whether this portal is attached to a host. */
	        get: function () {
	            return this._attachedHost != null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Sets the PortalHost reference without performing `attach()`. This is used directly by
	     * the PortalHost when it is performing an `attach()` or `detatch()`.
	     */
	    Portal.prototype.setAttachedHost = function (host) {
	        this._attachedHost = host;
	    };
	    return Portal;
	}());
	/**
	 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
	 */
	var ComponentPortal = (function (_super) {
	    __extends$1(ComponentPortal, _super);
	    function ComponentPortal(component, viewContainerRef, injector) {
	        if (viewContainerRef === void 0) { viewContainerRef = null; }
	        if (injector === void 0) { injector = null; }
	        _super.call(this);
	        this.component = component;
	        this.viewContainerRef = viewContainerRef;
	        this.injector = injector;
	    }
	    return ComponentPortal;
	}(Portal));
	/**
	 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
	 */
	var TemplatePortal = (function (_super) {
	    __extends$1(TemplatePortal, _super);
	    function TemplatePortal(template, viewContainerRef) {
	        _super.call(this);
	        /**
	         * Additional locals for the instantiated embedded view.
	         * These locals can be seen as "exports" for the template, such as how ngFor has
	         * index / event / odd.
	         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
	         */
	        this.locals = new Map();
	        this.templateRef = template;
	        this.viewContainerRef = viewContainerRef;
	    }
	    Object.defineProperty(TemplatePortal.prototype, "origin", {
	        get: function () {
	            return this.templateRef.elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TemplatePortal.prototype.attach = function (host, locals) {
	        this.locals = locals == null ? new Map() : locals;
	        return _super.prototype.attach.call(this, host);
	    };
	    TemplatePortal.prototype.detach = function () {
	        this.locals = new Map();
	        return _super.prototype.detach.call(this);
	    };
	    return TemplatePortal;
	}(Portal));
	/**
	 * Partial implementation of PortalHost that only deals with attaching either a
	 * ComponentPortal or a TemplatePortal.
	 */
	var BasePortalHost = (function () {
	    function BasePortalHost() {
	        /** Whether this host has already been permanently disposed. */
	        this._isDisposed = false;
	    }
	    /** Whether this host has an attached portal. */
	    BasePortalHost.prototype.hasAttached = function () {
	        return this._attachedPortal != null;
	    };
	    BasePortalHost.prototype.attach = function (portal) {
	        if (portal == null) {
	            throw new MdNullPortalError();
	        }
	        if (this.hasAttached()) {
	            throw new MdPortalAlreadyAttachedError();
	        }
	        if (this._isDisposed) {
	            throw new MdPortalHostAlreadyDisposedError();
	        }
	        if (portal instanceof ComponentPortal) {
	            this._attachedPortal = portal;
	            return this.attachComponentPortal(portal);
	        }
	        else if (portal instanceof TemplatePortal) {
	            this._attachedPortal = portal;
	            return this.attachTemplatePortal(portal);
	        }
	        throw new MdUnknownPortalTypeError();
	    };
	    BasePortalHost.prototype.detach = function () {
	        if (this._attachedPortal) {
	            this._attachedPortal.setAttachedHost(null);
	        }
	        this._attachedPortal = null;
	        if (this._disposeFn != null) {
	            this._disposeFn();
	            this._disposeFn = null;
	        }
	    };
	    BasePortalHost.prototype.dispose = function () {
	        if (this.hasAttached()) {
	            this.detach();
	        }
	        this._isDisposed = true;
	    };
	    BasePortalHost.prototype.setDisposeFn = function (fn) {
	        this._disposeFn = fn;
	    };
	    return BasePortalHost;
	}());
	
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$4 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
	 * the directive instance itself can be attached to a host, enabling declarative use of portals.
	 *
	 * Usage:
	 * <template portal #greeting>
	 *   <p> Hello {{name}} </p>
	 * </template>
	 */
	var TemplatePortalDirective = (function (_super) {
	    __extends(TemplatePortalDirective, _super);
	    function TemplatePortalDirective(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    TemplatePortalDirective = __decorate$4([
	        _angular_core.Directive({
	            selector: '[portal]',
	            exportAs: 'portal',
	        }), 
	        __metadata$4('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], TemplatePortalDirective);
	    return TemplatePortalDirective;
	}(TemplatePortal));
	/**
	 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
	 * directly attached to it, enabling declarative use.
	 *
	 * Usage:
	 * <template [portalHost]="greeting"></template>
	 */
	var PortalHostDirective = (function (_super) {
	    __extends(PortalHostDirective, _super);
	    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
	        _super.call(this);
	        this._componentFactoryResolver = _componentFactoryResolver;
	        this._viewContainerRef = _viewContainerRef;
	    }
	    Object.defineProperty(PortalHostDirective.prototype, "portal", {
	        get: function () {
	            return this._portal;
	        },
	        set: function (p) {
	            this._replaceAttachedPortal(p);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Attach the given ComponentPortal to this PortlHost using the ComponentFactoryResolver. */
	    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
	        portal.setAttachedHost(this);
	        // If the portal specifies an origin, use that as the logical location of the component
	        // in the application tree. Otherwise use the location of this PortalHost.
	        var viewContainerRef = portal.viewContainerRef != null ?
	            portal.viewContainerRef :
	            this._viewContainerRef;
	        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
	        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
	        this.setDisposeFn(function () { return ref.destroy(); });
	        return ref;
	    };
	    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
	    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        portal.setAttachedHost(this);
	        this._viewContainerRef.createEmbeddedView(portal.templateRef);
	        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
	        // TODO(jelbourn): return locals from view
	        return new Map();
	    };
	    /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
	    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
	        if (this.hasAttached()) {
	            this.detach();
	        }
	        if (p) {
	            this.attach(p);
	            this._portal = p;
	        }
	    };
	    PortalHostDirective = __decorate$4([
	        _angular_core.Directive({
	            selector: '[portalHost]',
	            inputs: ['portal: portalHost']
	        }), 
	        __metadata$4('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ViewContainerRef])
	    ], PortalHostDirective);
	    return PortalHostDirective;
	}(BasePortalHost));
	var PortalModule = (function () {
	    function PortalModule() {
	    }
	    PortalModule.forRoot = function () {
	        return {
	            ngModule: PortalModule,
	            providers: []
	        };
	    };
	    PortalModule = __decorate$4([
	        _angular_core.NgModule({
	            exports: [TemplatePortalDirective, PortalHostDirective],
	            declarations: [TemplatePortalDirective, PortalHostDirective],
	        }), 
	        __metadata$4('design:paramtypes', [])
	    ], PortalModule);
	    return PortalModule;
	}());
	
	/**
	 * OverlayState is a bag of values for either the initial configuration or current state of an
	 * overlay.
	 */
	var OverlayState = (function () {
	    function OverlayState() {
	        /** Whether the overlay has a backdrop. */
	        this.hasBackdrop = false;
	    }
	    return OverlayState;
	}());
	
	var __extends$4 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
	 * application context.
	 *
	 * This is the only part of the portal core that directly touches the DOM.
	 */
	var DomPortalHost = (function (_super) {
	    __extends$4(DomPortalHost, _super);
	    function DomPortalHost(_hostDomElement, _componentFactoryResolver) {
	        _super.call(this);
	        this._hostDomElement = _hostDomElement;
	        this._componentFactoryResolver = _componentFactoryResolver;
	    }
	    /** Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver. */
	    DomPortalHost.prototype.attachComponentPortal = function (portal) {
	        if (portal.viewContainerRef == null) {
	            throw new MdComponentPortalAttachedToDomWithoutOriginError();
	        }
	        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
	        var ref = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
	        var hostView = ref.hostView;
	        this._hostDomElement.appendChild(hostView.rootNodes[0]);
	        this.setDisposeFn(function () { return ref.destroy(); });
	        return ref;
	    };
	    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        var viewContainer = portal.viewContainerRef;
	        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
	        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
	        this.setDisposeFn((function () {
	            var index = viewContainer.indexOf(viewRef);
	            if (index != -1) {
	                viewContainer.remove(index);
	            }
	        }));
	        // TODO(jelbourn): Return locals from view.
	        return new Map();
	    };
	    DomPortalHost.prototype.dispose = function () {
	        _super.prototype.dispose.call(this);
	        if (this._hostDomElement.parentNode != null) {
	            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
	        }
	    };
	    return DomPortalHost;
	}(BasePortalHost));
	
	/**
	 * Reference to an overlay that has been created with the Overlay service.
	 * Used to manipulate or dispose of said overlay.
	 */
	var OverlayRef = (function () {
	    function OverlayRef(_portalHost, _pane, _state) {
	        this._portalHost = _portalHost;
	        this._pane = _pane;
	        this._state = _state;
	        this._backdropElement = null;
	        this._backdropClick = new rxjs_Subject.Subject();
	    }
	    OverlayRef.prototype.attach = function (portal) {
	        if (this._state.hasBackdrop) {
	            this._attachBackdrop();
	        }
	        var attachResult = this._portalHost.attach(portal);
	        this.updatePosition();
	        return attachResult;
	    };
	    OverlayRef.prototype.detach = function () {
	        this._detatchBackdrop();
	        return this._portalHost.detach();
	    };
	    OverlayRef.prototype.dispose = function () {
	        this._detatchBackdrop();
	        this._portalHost.dispose();
	    };
	    OverlayRef.prototype.hasAttached = function () {
	        return this._portalHost.hasAttached();
	    };
	    OverlayRef.prototype.backdropClick = function () {
	        return this._backdropClick.asObservable();
	    };
	    /** Gets the current state config of the overlay. */
	    OverlayRef.prototype.getState = function () {
	        return this._state;
	    };
	    /** Updates the position of the overlay based on the position strategy. */
	    OverlayRef.prototype.updatePosition = function () {
	        if (this._state.positionStrategy) {
	            this._state.positionStrategy.apply(this._pane);
	        }
	    };
	    /** Attaches a backdrop for this overlay. */
	    OverlayRef.prototype._attachBackdrop = function () {
	        var _this = this;
	        this._backdropElement = document.createElement('div');
	        this._backdropElement.classList.add('md-overlay-backdrop');
	        this._pane.parentElement.appendChild(this._backdropElement);
	        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
	        // action desired when such a click occurs (usually closing the overlay).
	        this._backdropElement.addEventListener('click', function () {
	            _this._backdropClick.next(null);
	        });
	        // Add class to fade-in the backdrop after one frame.
	        requestAnimationFrame(function () {
	            _this._backdropElement.classList.add('md-overlay-backdrop-showing');
	        });
	    };
	    /** Detaches the backdrop (if any) associated with the overlay. */
	    OverlayRef.prototype._detatchBackdrop = function () {
	        var _this = this;
	        var backdropToDetach = this._backdropElement;
	        if (backdropToDetach) {
	            backdropToDetach.classList.remove('md-overlay-backdrop-showing');
	            backdropToDetach.addEventListener('transitionend', function () {
	                backdropToDetach.parentNode.removeChild(backdropToDetach);
	                // It is possible that a new portal has been attached to this overlay since we started
	                // removing the backdrop. If that is the case, only clear the backdrop reference if it
	                // is still the same instance that we started to remove.
	                if (_this._backdropElement == backdropToDetach) {
	                    _this._backdropElement = null;
	                }
	            });
	        }
	    };
	    return OverlayRef;
	}());
	
	var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$8 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Simple utility for getting the bounds of the browser viewport.
	 * TODO: internal
	 */
	var ViewportRuler = (function () {
	    function ViewportRuler() {
	    }
	    // TODO(jelbourn): cache the document's bounding rect and only update it when the window
	    // is resized (debounced).
	    /** Gets a ClientRect for the viewport's bounds. */
	    ViewportRuler.prototype.getViewportRect = function () {
	        // Use the document element's bounding rect rather than the window scroll properties
	        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
	        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
	        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
	        // can disagree when the page is pinch-zoomed (on devices that support touch).
	        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
	        // We use the documentElement instead of the body because, by default (without a css reset)
	        // browsers typically give the document body an 8px margin, which is not included in
	        // getBoundingClientRect().
	        var documentRect = document.documentElement.getBoundingClientRect();
	        var scrollPosition = this.getViewportScrollPosition(documentRect);
	        var height = window.innerHeight;
	        var width = window.innerWidth;
	        return {
	            top: scrollPosition.top,
	            left: scrollPosition.left,
	            bottom: scrollPosition.top + height,
	            right: scrollPosition.left + width,
	            height: height,
	            width: width,
	        };
	    };
	    /**
	     * Gets the (top, left) scroll position of the viewport.
	     * @param documentRect
	     */
	    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
	        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
	        // The top-left-corner of the viewport is determined by the scroll position of the document
	        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
	        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
	        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
	        // `document.documentElement` works consistently, where the `top` and `left` values will
	        // equal negative the scroll position.
	        var top = documentRect.top < 0 && document.body.scrollTop == 0 ?
	            -documentRect.top :
	            document.body.scrollTop;
	        var left = documentRect.left < 0 && document.body.scrollLeft == 0 ?
	            -documentRect.left :
	            document.body.scrollLeft;
	        return { top: top, left: left };
	    };
	    ViewportRuler = __decorate$8([
	        _angular_core.Injectable(), 
	        __metadata$8('design:paramtypes', [])
	    ], ViewportRuler);
	    return ViewportRuler;
	}());
	
	/**
	 * Applies a CSS transform to an element, including browser-prefixed properties.
	 * @param element
	 * @param transformValue
	 */
	function applyCssTransform(element, transformValue) {
	    // It's important to trim the result, because the browser will ignore the set operation
	    // if the string contains only whitespace.
	    var value = transformValue.trim();
	    element.style.transform = value;
	    element.style.webkitTransform = value;
	}
	
	/** The points of the origin element and the overlay element to connect. */
	var ConnectionPositionPair = (function () {
	    function ConnectionPositionPair(origin, overlay) {
	        this.originX = origin.originX;
	        this.originY = origin.originY;
	        this.overlayX = overlay.overlayX;
	        this.overlayY = overlay.overlayY;
	    }
	    return ConnectionPositionPair;
	}());
	
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * implict position relative some origin element. The relative position is defined in terms of
	 * a point on the origin element that is connected to a point on the overlay element. For example,
	 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
	 * of the overlay.
	 */
	var ConnectedPositionStrategy = (function () {
	    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
	        this._connectedTo = _connectedTo;
	        this._originPos = _originPos;
	        this._overlayPos = _overlayPos;
	        this._viewportRuler = _viewportRuler;
	        // TODO(jelbourn): set RTL to the actual value from the app.
	        /** Whether the we're dealing with an RTL context */
	        this._isRtl = false;
	        /** Ordered list of preferred positions, from most to least desirable. */
	        this._preferredPositions = [];
	        this._origin = this._connectedTo.nativeElement;
	        this.withFallbackPosition(_originPos, _overlayPos);
	    }
	    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
	        get: function () {
	            return this._preferredPositions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Updates the position of the overlay element, using whichever preferred position relative
	     * to the origin fits on-screen.
	     * TODO: internal
	     */
	    ConnectedPositionStrategy.prototype.apply = function (element) {
	        // We need the bounding rects for the origin and the overlay to determine how to position
	        // the overlay relative to the origin.
	        var originRect = this._origin.getBoundingClientRect();
	        var overlayRect = element.getBoundingClientRect();
	        // We use the viewport rect to determine whether a position would go off-screen.
	        var viewportRect = this._viewportRuler.getViewportRect();
	        var firstOverlayPoint = null;
	        // We want to place the overlay in the first of the preferred positions such that the
	        // overlay fits on-screen.
	        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
	            var pos = _a[_i];
	            // Get the (x, y) point of connection on the origin, and then use that to get the
	            // (top, left) coordinate for the overlay at `pos`.
	            var originPoint = this._getOriginConnectionPoint(originRect, pos);
	            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
	            firstOverlayPoint = firstOverlayPoint || overlayPoint;
	            // If the overlay in the calculated position fits on-screen, put it there and we're done.
	            if (this._willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect)) {
	                this._setElementPosition(element, overlayPoint);
	                return Promise.resolve(null);
	            }
	        }
	        // TODO(jelbourn): fallback behavior for when none of the preferred positions fit on-screen.
	        // For now, just stick it in the first position and let it go off-screen.
	        this._setElementPosition(element, firstOverlayPoint);
	        return Promise.resolve(null);
	    };
	    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
	        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
	        return this;
	    };
	    /**
	     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
	        return this._isRtl ? rect.right : rect.left;
	    };
	    /**
	     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
	        return this._isRtl ? rect.left : rect.right;
	    };
	    /**
	     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
	     * @param originRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
	        var originStartX = this._getStartX(originRect);
	        var originEndX = this._getEndX(originRect);
	        var x;
	        if (pos.originX == 'center') {
	            x = originStartX + (originRect.width / 2);
	        }
	        else {
	            x = pos.originX == 'start' ? originStartX : originEndX;
	        }
	        var y;
	        if (pos.originY == 'center') {
	            y = originRect.top + (originRect.height / 2);
	        }
	        else {
	            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
	        }
	        return { x: x, y: y };
	    };
	    /**
	     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
	     * origin point to which the overlay should be connected.
	     * @param originPoint
	     * @param overlayRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, pos) {
	        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
	        // relative to the origin point.
	        var overlayStartX;
	        if (pos.overlayX == 'center') {
	            overlayStartX = -overlayRect.width / 2;
	        }
	        else {
	            overlayStartX = pos.overlayX == 'start' ? 0 : -overlayRect.width;
	        }
	        var overlayStartY;
	        if (pos.overlayY == 'center') {
	            overlayStartY = -overlayRect.height / 2;
	        }
	        else {
	            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
	        }
	        return {
	            x: originPoint.x + overlayStartX,
	            y: originPoint.y + overlayStartY
	        };
	    };
	    /**
	     * Gets whether the overlay positioned at the given point will fit on-screen.
	     * @param overlayPoint The top-left coordinate of the overlay.
	     * @param overlayRect Bounding rect of the overlay, used to get its size.
	     * @param viewportRect The bounding viewport.
	     */
	    ConnectedPositionStrategy.prototype._willOverlayFitWithinViewport = function (overlayPoint, overlayRect, viewportRect) {
	        // TODO(jelbourn): probably also want some space between overlay edge and viewport edge.
	        return overlayPoint.x >= viewportRect.left &&
	            overlayPoint.x + overlayRect.width <= viewportRect.right &&
	            overlayPoint.y >= viewportRect.top &&
	            overlayPoint.y + overlayRect.height <= viewportRect.bottom;
	    };
	    /**
	     * Physically positions the overlay element to the given coordinate.
	     * @param element
	     * @param overlayPoint
	     */
	    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
	        var scrollPos = this._viewportRuler.getViewportScrollPosition();
	        var x = overlayPoint.x + scrollPos.left;
	        var y = overlayPoint.y + scrollPos.top;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        applyCssTransform(element, "translateX(" + x + "px) translateY(" + y + "px)");
	    };
	    return ConnectedPositionStrategy;
	}());
	
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * explicit position relative to the browser's viewport.
	 */
	var GlobalPositionStrategy = (function () {
	    function GlobalPositionStrategy() {
	        this._cssPosition = 'absolute';
	        this._top = '';
	        this._bottom = '';
	        this._left = '';
	        this._right = '';
	        /** Array of individual applications of translateX(). Currently only for centering. */
	        this._translateX = [];
	        /** Array of individual applications of translateY(). Currently only for centering. */
	        this._translateY = [];
	    }
	    /** Sets the element to use CSS position: fixed */
	    GlobalPositionStrategy.prototype.fixed = function () {
	        this._cssPosition = 'fixed';
	        return this;
	    };
	    /** Sets the element to use CSS position: absolute. This is the default. */
	    GlobalPositionStrategy.prototype.absolute = function () {
	        this._cssPosition = 'absolute';
	        return this;
	    };
	    /** Sets the top position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.top = function (value) {
	        this._bottom = '';
	        this._translateY = [];
	        this._top = value;
	        return this;
	    };
	    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.left = function (value) {
	        this._right = '';
	        this._translateX = [];
	        this._left = value;
	        return this;
	    };
	    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.bottom = function (value) {
	        this._top = '';
	        this._translateY = [];
	        this._bottom = value;
	        return this;
	    };
	    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.right = function (value) {
	        this._left = '';
	        this._translateX = [];
	        this._right = value;
	        return this;
	    };
	    /**
	     * Centers the overlay horizontally with an optional offset.
	     * Clears any previously set horizontal position.
	     */
	    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._left = '50%';
	        this._right = '';
	        this._translateX = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Centers the overlay vertically with an optional offset.
	     * Clears any previously set vertical position.
	     */
	    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._top = '50%';
	        this._bottom = '';
	        this._translateY = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Apply the position to the element.
	     * TODO: internal
	     */
	    GlobalPositionStrategy.prototype.apply = function (element) {
	        element.style.position = this._cssPosition;
	        element.style.top = this._top;
	        element.style.left = this._left;
	        element.style.bottom = this._bottom;
	        element.style.right = this._right;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        var tranlateX = this._reduceTranslateValues('translateX', this._translateX);
	        var translateY = this._reduceTranslateValues('translateY', this._translateY);
	        applyCssTransform(element, tranlateX + " " + translateY);
	        return Promise.resolve(null);
	    };
	    /** Reduce a list of translate values to a string that can be used in the transform property */
	    GlobalPositionStrategy.prototype._reduceTranslateValues = function (translateFn, values) {
	        return values.map(function (t) { return (translateFn + "(" + t + ")"); }).join(' ');
	    };
	    return GlobalPositionStrategy;
	}());
	
	var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$7 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Builder for overlay position strategy. */
	var OverlayPositionBuilder = (function () {
	    function OverlayPositionBuilder(_viewportRuler) {
	        this._viewportRuler = _viewportRuler;
	    }
	    /** Creates a global position strategy. */
	    OverlayPositionBuilder.prototype.global = function () {
	        return new GlobalPositionStrategy();
	    };
	    /** Creates a relative position strategy. */
	    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
	        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
	    };
	    OverlayPositionBuilder = __decorate$7([
	        _angular_core.Injectable(), 
	        __metadata$7('design:paramtypes', [ViewportRuler])
	    ], OverlayPositionBuilder);
	    return OverlayPositionBuilder;
	}());
	
	/**
	 * The OverlayContainer is the container in which all overlays will load.
	 * It should be provided in the root component to ensure it is properly shared.
	 */
	var OverlayContainer = (function () {
	    function OverlayContainer() {
	    }
	    /**
	     * This method returns the overlay container element.  It will lazily
	     * create the element the first time  it is called to facilitate using
	     * the container in non-browser environments.
	     * @returns {HTMLElement} the container element
	     */
	    OverlayContainer.prototype.getContainerElement = function () {
	        if (!this._containerElement) {
	            this._createContainer();
	        }
	        return this._containerElement;
	    };
	    /**
	     * Create the overlay container element, which is simply a div
	     * with the 'md-overlay-container' class on the document body.
	     */
	    OverlayContainer.prototype._createContainer = function () {
	        var container = document.createElement('div');
	        container.classList.add('md-overlay-container');
	        document.body.appendChild(container);
	        this._containerElement = container;
	    };
	    return OverlayContainer;
	}());
	
	var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$6 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Next overlay unique ID. */
	var nextUniqueId = 0;
	/** The default state for newly created overlays. */
	var defaultState = new OverlayState();
	/**
	 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
	 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
	 * selects, etc. can all be built using overlays. The service should primarily be used by authors
	 * of re-usable components rather than developers building end-user applications.
	 *
	 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
	 */
	var Overlay = (function () {
	    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
	        this._overlayContainer = _overlayContainer;
	        this._componentFactoryResolver = _componentFactoryResolver;
	        this._positionBuilder = _positionBuilder;
	    }
	    /**
	     * Creates an overlay.
	     * @param state State to apply to the overlay.
	     * @returns A reference to the created overlay.
	     */
	    Overlay.prototype.create = function (state) {
	        if (state === void 0) { state = defaultState; }
	        return this._createOverlayRef(this._createPaneElement(), state);
	    };
	    /**
	     * Returns a position builder that can be used, via fluent API,
	     * to construct and configure a position strategy.
	     */
	    Overlay.prototype.position = function () {
	        return this._positionBuilder;
	    };
	    /**
	     * Creates the DOM element for an overlay and appends it to the overlay container.
	     * @returns Promise resolving to the created element.
	     */
	    Overlay.prototype._createPaneElement = function () {
	        var pane = document.createElement('div');
	        pane.id = "md-overlay-" + nextUniqueId++;
	        pane.classList.add('md-overlay-pane');
	        this._overlayContainer.getContainerElement().appendChild(pane);
	        return pane;
	    };
	    /**
	     * Create a DomPortalHost into which the overlay content can be loaded.
	     * @param pane The DOM element to turn into a portal host.
	     * @returns A portal host for the given DOM element.
	     */
	    Overlay.prototype._createPortalHost = function (pane) {
	        return new DomPortalHost(pane, this._componentFactoryResolver);
	    };
	    /**
	     * Creates an OverlayRef for an overlay in the given DOM element.
	     * @param pane DOM element for the overlay
	     * @param state
	     * @returns {OverlayRef}
	     */
	    Overlay.prototype._createOverlayRef = function (pane, state) {
	        return new OverlayRef(this._createPortalHost(pane), pane, state);
	    };
	    Overlay = __decorate$6([
	        _angular_core.Injectable(), 
	        __metadata$6('design:paramtypes', [OverlayContainer, _angular_core.ComponentFactoryResolver, OverlayPositionBuilder])
	    ], Overlay);
	    return Overlay;
	}());
	/** Providers for Overlay and its related injectables. */
	var OVERLAY_PROVIDERS = [
	    ViewportRuler,
	    OverlayPositionBuilder,
	    Overlay,
	    OverlayContainer,
	];
	
	var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$5 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
	var defaultPositionList = [
	    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
	    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
	];
	/**
	 * Directive applied to an element to make it usable as an origin for an Overlay using a
	 * ConnectedPositionStrategy.
	 */
	var OverlayOrigin = (function () {
	    function OverlayOrigin(_elementRef) {
	        this._elementRef = _elementRef;
	    }
	    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
	        get: function () {
	            return this._elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    OverlayOrigin = __decorate$5([
	        _angular_core.Directive({
	            selector: '[overlay-origin]',
	            exportAs: 'overlayOrigin',
	        }), 
	        __metadata$5('design:paramtypes', [_angular_core.ElementRef])
	    ], OverlayOrigin);
	    return OverlayOrigin;
	}());
	/**
	 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
	 */
	var ConnectedOverlayDirective = (function () {
	    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
	    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
	        this._overlay = _overlay;
	        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
	    }
	    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
	        get: function () {
	            return this._overlayRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnInit = function () {
	        this._createOverlay();
	    };
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
	        this._destroyOverlay();
	    };
	    /** Creates an overlay and attaches this directive's template to it. */
	    ConnectedOverlayDirective.prototype._createOverlay = function () {
	        if (!this.positions || !this.positions.length) {
	            this.positions = defaultPositionList;
	        }
	        var overlayConfig = new OverlayState();
	        overlayConfig.positionStrategy =
	            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
	        this._overlayRef = this._overlay.create(overlayConfig);
	        this._overlayRef.attach(this._templatePortal);
	    };
	    /** Destroys the overlay created by this directive. */
	    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
	        this._overlayRef.dispose();
	    };
	    __decorate$5([
	        _angular_core.Input(), 
	        __metadata$5('design:type', OverlayOrigin)
	    ], ConnectedOverlayDirective.prototype, "origin", void 0);
	    __decorate$5([
	        _angular_core.Input(), 
	        __metadata$5('design:type', Array)
	    ], ConnectedOverlayDirective.prototype, "positions", void 0);
	    ConnectedOverlayDirective = __decorate$5([
	        _angular_core.Directive({
	            selector: '[connected-overlay]'
	        }), 
	        __metadata$5('design:paramtypes', [Overlay, _angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], ConnectedOverlayDirective);
	    return ConnectedOverlayDirective;
	}());
	var OverlayModule = (function () {
	    function OverlayModule() {
	    }
	    OverlayModule.forRoot = function () {
	        return {
	            ngModule: OverlayModule,
	            providers: OVERLAY_PROVIDERS,
	        };
	    };
	    OverlayModule = __decorate$5([
	        _angular_core.NgModule({
	            imports: [PortalModule],
	            exports: [ConnectedOverlayDirective, OverlayOrigin],
	            declarations: [ConnectedOverlayDirective, OverlayOrigin],
	        }), 
	        __metadata$5('design:paramtypes', [])
	    ], OverlayModule);
	    return OverlayModule;
	}());
	
	var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$11 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Utility for checking the interactivity of an element, such as whether is is focusable or
	 * tabbable.
	 *
	 * NOTE: Currently does not capture any special element behaviors, browser quirks, or edge cases.
	 * This is a basic/naive starting point onto which further behavior will be added.
	 *
	 * This class uses instance methods instead of static functions so that alternate implementations
	 * can be injected.
	 *
	 * TODO(jelbourn): explore using ally.js directly for its significantly more robust
	 * checks (need to evaluate payload size, performance, and compatibility with tree-shaking).
	 */
	var InteractivityChecker = (function () {
	    function InteractivityChecker() {
	    }
	    /** Gets whether an element is disabled. */
	    InteractivityChecker.prototype.isDisabled = function (element) {
	        // This does not capture some cases, such as a non-form control with a disabled attribute or
	        // a form control inside of a disabled form, but should capture the most common cases.
	        return element.hasAttribute('disabled');
	    };
	    /**
	     * Gets whether an element is visible for the purposes of interactivity.
	     *
	     * This will capture states like `display: none` and `visibility: hidden`, but not things like
	     * being clipped by an `overflow: hidden` parent or being outside the viewport.
	     */
	    InteractivityChecker.prototype.isVisible = function (element) {
	        // There are additional special cases that this does not capture, but this will work for
	        // the most common cases.
	        // Use logic from jQuery to check for `display: none`.
	        // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
	        if (!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)) {
	            return false;
	        }
	        // Check for css `visibility` property.
	        // TODO(jelbourn): do any browsers we support return an empty string instead of 'visible'?
	        return getComputedStyle(element).getPropertyValue('visibility') == 'visible';
	    };
	    /**
	     * Gets whether an element can be reached via Tab key.
	     * Assumes that the element has already been checked with isFocusable.
	     */
	    InteractivityChecker.prototype.isTabbable = function (element) {
	        // Again, naive approach that does not capture many special cases and browser quirks.
	        return element.tabIndex >= 0;
	    };
	    /** Gets whether an element can be focused by the user. */
	    InteractivityChecker.prototype.isFocusable = function (element) {
	        // Perform checks in order of left to most expensive.
	        // Again, naive approach that does not capture many edge cases and browser quirks.
	        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
	    };
	    InteractivityChecker = __decorate$11([
	        _angular_core.Injectable(), 
	        __metadata$11('design:paramtypes', [])
	    ], InteractivityChecker);
	    return InteractivityChecker;
	}());
	/** Gets whether an element's  */
	function isNativeFormElement(element) {
	    var nodeName = element.nodeName.toLowerCase();
	    return nodeName === 'input' ||
	        nodeName === 'select' ||
	        nodeName === 'button' ||
	        nodeName === 'textarea';
	}
	/** Gets whether an element is an <input type="hidden">. */
	function isHiddenInput(element) {
	    return isInputElement(element) && element.type == 'hidden';
	}
	/** Gets whether an element is an anchor that has an href attribute. */
	function isAnchorWithHref(element) {
	    return isAnchorElement(element) && element.hasAttribute('href');
	}
	/** Gets whether an element is an input element. */
	function isInputElement(element) {
	    return element.nodeName == 'input';
	}
	/** Gets whether an element is an anchor element. */
	function isAnchorElement(element) {
	    return element.nodeName.toLowerCase() == 'a';
	}
	/** Gets whether an element has a valid tabindex. */
	function hasValidTabIndex(element) {
	    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
	        return false;
	    }
	    var tabIndex = element.getAttribute('tabindex');
	    // IE11 parses tabindex="" as the value "-32768"
	    if (tabIndex == '-32768') {
	        return false;
	    }
	    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
	}
	/**
	 * Gets whether an element is potentially focusable without taking current visible/disabled state
	 * into account.
	 */
	function isPotentiallyFocusable(element) {
	    // Inputs are potentially focusable *unless* they're type="hidden".
	    if (isHiddenInput(element)) {
	        return false;
	    }
	    return isNativeFormElement(element) ||
	        isAnchorWithHref(element) ||
	        element.hasAttribute('contenteditable') ||
	        hasValidTabIndex(element);
	}
	
	var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$10 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Directive for trapping focus within a region.
	 *
	 * NOTE: This directive currently uses a very simple (naive) approach to focus trapping.
	 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
	 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
	 * This will be replaced with a more intelligent solution before the library is considered stable.
	 */
	var FocusTrap = (function () {
	    function FocusTrap(_checker) {
	        this._checker = _checker;
	    }
	    /** Focuses the first tabbable element within the focus trap region. */
	    FocusTrap.prototype.focusFirstTabbableElement = function () {
	        var redirectToElement = this._getFirstTabbableElement(this.trappedContent.nativeElement);
	        if (redirectToElement) {
	            redirectToElement.focus();
	        }
	    };
	    /** Focuses the last tabbable element within the focus trap region. */
	    FocusTrap.prototype.focusLastTabbableElement = function () {
	        var redirectToElement = this._getLastTabbableElement(this.trappedContent.nativeElement);
	        if (redirectToElement) {
	            redirectToElement.focus();
	        }
	    };
	    /** Get the first tabbable element from a DOM subtree (inclusive). */
	    FocusTrap.prototype._getFirstTabbableElement = function (root) {
	        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
	            return root;
	        }
	        // Iterate in DOM order.
	        var childCount = root.children.length;
	        for (var i = 0; i < childCount; i++) {
	            var tabbableChild = this._getFirstTabbableElement(root.children[i]);
	            if (tabbableChild) {
	                return tabbableChild;
	            }
	        }
	        return null;
	    };
	    /** Get the last tabbable element from a DOM subtree (inclusive). */
	    FocusTrap.prototype._getLastTabbableElement = function (root) {
	        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
	            return root;
	        }
	        // Iterate in reverse DOM order.
	        for (var i = root.children.length - 1; i >= 0; i--) {
	            var tabbableChild = this._getLastTabbableElement(root.children[i]);
	            if (tabbableChild) {
	                return tabbableChild;
	            }
	        }
	        return null;
	    };
	    __decorate$10([
	        _angular_core.ViewChild('trappedContent'), 
	        __metadata$10('design:type', _angular_core.ElementRef)
	    ], FocusTrap.prototype, "trappedContent", void 0);
	    FocusTrap = __decorate$10([
	        _angular_core.Component({selector: 'focus-trap',
	            // TODO(jelbourn): move this to a separate file.
	            template: "\n  <div tabindex=\"0\" (focus)=\"focusLastTabbableElement()\"></div>\n  <div #trappedContent><ng-content></ng-content></div>\n  <div tabindex=\"0\" (focus)=\"focusFirstTabbableElement()\"></div>",
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$10('design:paramtypes', [InteractivityChecker])
	    ], FocusTrap);
	    return FocusTrap;
	}());
	
	var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$12 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var LIVE_ANNOUNCER_ELEMENT_TOKEN = new _angular_core.OpaqueToken('mdLiveAnnouncerElement');
	var MdLiveAnnouncer = (function () {
	    function MdLiveAnnouncer(elementToken) {
	        // We inject the live element as `any` because the constructor signature cannot reference
	        // browser globals (HTMLElement) on non-browser environments, since having a class decorator
	        // causes TypeScript to preserve the constructor signature types.
	        this._liveElement = elementToken || this._createLiveElement();
	    }
	    /**
	     * @param message Message to be announced to the screenreader
	     * @param politeness The politeness of the announcer element.
	     */
	    MdLiveAnnouncer.prototype.announce = function (message, politeness) {
	        var _this = this;
	        if (politeness === void 0) { politeness = 'polite'; }
	        this._liveElement.textContent = '';
	        // TODO: ensure changing the politeness works on all environments we support.
	        this._liveElement.setAttribute('aria-live', politeness);
	        // This 100ms timeout is necessary for some browser + screen-reader combinations:
	        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
	        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
	        //   second time without clearing and then using a non-zero delay.
	        // (using JAWS 17 at time of this writing).
	        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
	    };
	    MdLiveAnnouncer.prototype._createLiveElement = function () {
	        var liveEl = document.createElement('div');
	        liveEl.classList.add('md-visually-hidden');
	        liveEl.setAttribute('aria-atomic', 'true');
	        liveEl.setAttribute('aria-live', 'polite');
	        document.body.appendChild(liveEl);
	        return liveEl;
	    };
	    MdLiveAnnouncer = __decorate$12([
	        _angular_core.Injectable(),
	        __param(0, _angular_core.Optional()),
	        __param(0, _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)), 
	        __metadata$12('design:paramtypes', [Object])
	    ], MdLiveAnnouncer);
	    return MdLiveAnnouncer;
	}());
	
	var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$9 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var A11Y_PROVIDERS = [MdLiveAnnouncer, InteractivityChecker];
	var A11yModule = (function () {
	    function A11yModule() {
	    }
	    A11yModule.forRoot = function () {
	        return {
	            ngModule: A11yModule,
	            providers: A11Y_PROVIDERS,
	        };
	    };
	    A11yModule = __decorate$9([
	        _angular_core.NgModule({
	            declarations: [FocusTrap],
	            exports: [FocusTrap],
	        }), 
	        __metadata$9('design:paramtypes', [])
	    ], A11yModule);
	    return A11yModule;
	}());
	
	var __extends$5 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$13 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/* Adjusts configuration of our gesture library, Hammer. */
	var MdGestureConfig = (function (_super) {
	    __extends$5(MdGestureConfig, _super);
	    function MdGestureConfig() {
	        _super.apply(this, arguments);
	        /* List of new event names to add to the gesture support list */
	        this.events = [
	            'drag',
	            'dragstart',
	            'dragend',
	            'dragright',
	            'dragleft',
	            'longpress',
	            'slide',
	            'slidestart',
	            'slideend',
	            'slideright',
	            'slideleft'
	        ];
	    }
	    /*
	     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
	     *
	     * Our gesture names come from the Material Design gestures spec:
	     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
	     *
	     * More information on default recognizers can be found in Hammer docs:
	     * http://hammerjs.github.io/recognizer-pan/
	     * http://hammerjs.github.io/recognizer-press/
	     *
	     * TODO: Confirm threshold numbers with Material Design UX Team
	     * */
	    MdGestureConfig.prototype.buildHammer = function (element) {
	        var mc = new Hammer(element);
	        // Default Hammer Recognizers.
	        var pan = new Hammer.Pan();
	        var swipe = new Hammer.Swipe();
	        var press = new Hammer.Press();
	        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
	        // Otherwise the previous `recognizeWith` will be dropped.
	        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
	        var drag = this._createRecognizer(slide, { event: 'drag', threshold: 6 }, swipe);
	        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
	        // Overwrite the default `pan` event to use the swipe event.
	        pan.recognizeWith(swipe);
	        // Add customized gestures to Hammer manager
	        mc.add([swipe, press, pan, drag, slide, longpress]);
	        return mc;
	    };
	    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
	    MdGestureConfig.prototype._createRecognizer = function (base, options) {
	        var inheritances = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            inheritances[_i - 2] = arguments[_i];
	        }
	        var recognizer = new base.constructor(options);
	        inheritances.push(base);
	        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
	        return recognizer;
	    };
	    MdGestureConfig = __decorate$13([
	        _angular_core.Injectable(), 
	        __metadata$13('design:paramtypes', [])
	    ], MdGestureConfig);
	    return MdGestureConfig;
	}(_angular_platformBrowser.HammerGestureConfig));
	
	var __decorate$14 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$14 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Class to coordinate unique selection based on name.
	 * Intended to be consumed as an Angular service.
	 * This service is needed because native radio change events are only fired on the item currently
	 * being selected, and we still need to uncheck the previous selection.
	 *
	 * This service does not *store* any IDs and names because they may change at any time, so it is
	 * less error-prone if they are simply passed through when the events occur.
	 */
	var MdUniqueSelectionDispatcher = (function () {
	    function MdUniqueSelectionDispatcher() {
	        this._listeners = [];
	    }
	    /** Notify other items that selection for the given name has been set. */
	    MdUniqueSelectionDispatcher.prototype.notify = function (id, name) {
	        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
	            var listener = _a[_i];
	            listener(id, name);
	        }
	    };
	    /** Listen for future changes to item selection. */
	    MdUniqueSelectionDispatcher.prototype.listen = function (listener) {
	        this._listeners.push(listener);
	    };
	    MdUniqueSelectionDispatcher = __decorate$14([
	        _angular_core.Injectable(), 
	        __metadata$14('design:paramtypes', [])
	    ], MdUniqueSelectionDispatcher);
	    return MdUniqueSelectionDispatcher;
	}());
	
	/**
	 * Annotation Factory that allows HTML style boolean attributes. For example,
	 * a field declared like this:
	
	 * @Directive({ selector: 'component' }) class MyComponent {
	 *   @Input() @BooleanFieldValueFactory() myField: boolean;
	 * }
	 *
	 * You could set it up this way:
	 *   <component myField>
	 * or:
	 *   <component myField="">
	 * @deprecated
	 */
	function BooleanFieldValue() {
	    return function booleanFieldValueMetadata(target, key) {
	        var defaultValue = target[key];
	        var localKey = "__md_private_symbol_" + key;
	        target[localKey] = defaultValue;
	        Object.defineProperty(target, key, {
	            get: function () { return this[localKey]; },
	            set: function (value) {
	                this[localKey] = value != null && "" + value !== 'false';
	            }
	        });
	    };
	}
	
	// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
	// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
	// we are temporarily using a single (keydown) handler.
	// See: https://github.com/angular/angular/issues/9419
	var UP_ARROW = 38;
	var DOWN_ARROW = 40;
	var RIGHT_ARROW = 39;
	var LEFT_ARROW = 37;
	var ENTER = 13;
	var TAB = 9;
	
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdCoreModule = (function () {
	    function MdCoreModule() {
	    }
	    MdCoreModule.forRoot = function () {
	        return {
	            ngModule: MdCoreModule,
	            providers: [A11Y_PROVIDERS, OVERLAY_PROVIDERS],
	        };
	    };
	    MdCoreModule = __decorate([
	        _angular_core.NgModule({
	            imports: [MdLineModule, RtlModule, MdRippleModule, PortalModule, OverlayModule, A11yModule],
	            exports: [MdLineModule, RtlModule, MdRippleModule, PortalModule, OverlayModule, A11yModule],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdCoreModule);
	    return MdCoreModule;
	}());
	
	var __decorate$16 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$16 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	/**
	 * Provider Expression that allows md-button-toggle-group to register as a ControlValueAccessor.
	 * This allows it to support [(ngModel)].
	 */
	var MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdButtonToggleGroup; }),
	    multi: true
	};
	var _uniqueIdCounter = 0;
	/** A simple change event emitted by either MdButtonToggle or MdButtonToggleGroup. */
	var MdButtonToggleChange = (function () {
	    function MdButtonToggleChange() {
	    }
	    return MdButtonToggleChange;
	}());
	/** Exclusive selection button toggle group that behaves like a radio-button group. */
	var MdButtonToggleGroup = (function () {
	    function MdButtonToggleGroup() {
	        /** The value for the button toggle group. Should match currently selected button toggle. */
	        this._value = null;
	        /** The HTML name attribute applied to toggles in this group. */
	        this._name = "md-radio-group-" + _uniqueIdCounter++;
	        /** Disables all toggles in the group. */
	        this._disabled = null;
	        /** The currently selected button toggle, should match the value. */
	        this._selected = null;
	        /** Whether the button toggle group is initialized or not. */
	        this._isInitialized = false;
	        /** The method to be called in order to update ngModel. */
	        this._controlValueAccessorChangeFn = function (value) { };
	        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
	        this.onTouched = function () { };
	        /** Event emitted when the group's value changes. */
	        this._change = new _angular_core.EventEmitter();
	        /** Child button toggle buttons. */
	        this._buttonToggles = null;
	    }
	    Object.defineProperty(MdButtonToggleGroup.prototype, "change", {
	        get: function () {
	            return this._change.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    MdButtonToggleGroup.prototype.ngAfterViewInit = function () {
	        this._isInitialized = true;
	    };
	    Object.defineProperty(MdButtonToggleGroup.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        set: function (value) {
	            this._name = value;
	            this._updateButtonToggleNames();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdButtonToggleGroup.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (value) {
	            this._disabled = (value != null && value !== false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdButtonToggleGroup.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (newValue) {
	            if (this._value != newValue) {
	                this._value = newValue;
	                this._updateSelectedButtonToggleFromValue();
	                // Only emit a change event if the view is completely initialized.
	                // We don't want to emit a change event for the initial values.
	                if (this._isInitialized) {
	                    this._emitChangeEvent();
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdButtonToggleGroup.prototype, "selected", {
	        get: function () {
	            return this._selected;
	        },
	        set: function (selected) {
	            this._selected = selected;
	            this.value = selected ? selected.value : null;
	            if (selected && !selected.checked) {
	                selected.checked = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdButtonToggleGroup.prototype._updateButtonToggleNames = function () {
	        var _this = this;
	        if (this._buttonToggles) {
	            this._buttonToggles.forEach(function (toggle) {
	                toggle.name = _this._name;
	            });
	        }
	    };
	    // TODO: Refactor into shared code with radio.
	    MdButtonToggleGroup.prototype._updateSelectedButtonToggleFromValue = function () {
	        var _this = this;
	        var isAlreadySelected = this._selected != null && this._selected.value == this._value;
	        if (this._buttonToggles != null && !isAlreadySelected) {
	            var matchingButtonToggle = this._buttonToggles.filter(function (buttonToggle) { return buttonToggle.value == _this._value; })[0];
	            if (matchingButtonToggle) {
	                this.selected = matchingButtonToggle;
	            }
	            else if (this.value == null) {
	                this.selected = null;
	                this._buttonToggles.forEach(function (buttonToggle) {
	                    buttonToggle.checked = false;
	                });
	            }
	        }
	    };
	    /** Dispatch change event with current selection and group value. */
	    MdButtonToggleGroup.prototype._emitChangeEvent = function () {
	        var event = new MdButtonToggleChange();
	        event.source = this._selected;
	        event.value = this._value;
	        this._controlValueAccessorChangeFn(event.value);
	        this._change.emit(event);
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdButtonToggleGroup.prototype.writeValue = function (value) {
	        this.value = value;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdButtonToggleGroup.prototype.registerOnChange = function (fn) {
	        this._controlValueAccessorChangeFn = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdButtonToggleGroup.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate$16([
	        _angular_core.Output(), 
	        __metadata$16('design:type', rxjs_Observable.Observable)
	    ], MdButtonToggleGroup.prototype, "change", null);
	    __decorate$16([
	        _angular_core.ContentChildren(_angular_core.forwardRef(function () { return MdButtonToggle; })), 
	        __metadata$16('design:type', _angular_core.QueryList)
	    ], MdButtonToggleGroup.prototype, "_buttonToggles", void 0);
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', String)
	    ], MdButtonToggleGroup.prototype, "name", null);
	    __decorate$16([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$16('design:type', Boolean)
	    ], MdButtonToggleGroup.prototype, "disabled", null);
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', Object)
	    ], MdButtonToggleGroup.prototype, "value", null);
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', Object)
	    ], MdButtonToggleGroup.prototype, "selected", null);
	    MdButtonToggleGroup = __decorate$16([
	        _angular_core.Directive({
	            selector: 'md-button-toggle-group:not([multiple])',
	            providers: [MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
	            host: {
	                'role': 'radiogroup',
	            },
	        }), 
	        __metadata$16('design:paramtypes', [])
	    ], MdButtonToggleGroup);
	    return MdButtonToggleGroup;
	}());
	/** Multiple selection button-toggle group. */
	var MdButtonToggleGroupMultiple = (function () {
	    function MdButtonToggleGroupMultiple() {
	        /** Disables all toggles in the group. */
	        this._disabled = null;
	    }
	    Object.defineProperty(MdButtonToggleGroupMultiple.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (value) {
	            this._disabled = (value != null && value !== false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', Boolean)
	    ], MdButtonToggleGroupMultiple.prototype, "disabled", null);
	    MdButtonToggleGroupMultiple = __decorate$16([
	        _angular_core.Directive({
	            selector: 'md-button-toggle-group[multiple]',
	        }), 
	        __metadata$16('design:paramtypes', [])
	    ], MdButtonToggleGroupMultiple);
	    return MdButtonToggleGroupMultiple;
	}());
	var MdButtonToggle = (function () {
	    function MdButtonToggle(toggleGroup, toggleGroupMultiple, buttonToggleDispatcher) {
	        var _this = this;
	        this.buttonToggleDispatcher = buttonToggleDispatcher;
	        /** Whether or not this button toggle is checked. */
	        this._checked = false;
	        /** Whether or not this button toggle is disabled. */
	        this._disabled = null;
	        /** Value assigned to this button toggle. */
	        this._value = null;
	        /** Whether or not the button toggle is a single selection. */
	        this._isSingleSelector = null;
	        /** Event emitted when the group value changes. */
	        this._change = new _angular_core.EventEmitter();
	        this.buttonToggleGroup = toggleGroup;
	        this.buttonToggleGroupMultiple = toggleGroupMultiple;
	        if (this.buttonToggleGroup) {
	            buttonToggleDispatcher.listen(function (id, name) {
	                if (id != _this.id && name == _this.name) {
	                    _this.checked = false;
	                }
	            });
	            this._type = 'radio';
	            this.name = this.buttonToggleGroup.name;
	            this._isSingleSelector = true;
	        }
	        else {
	            // Even if there is no group at all, treat the button toggle as a checkbox so it can be
	            // toggled on or off.
	            this._type = 'checkbox';
	            this._isSingleSelector = false;
	        }
	    }
	    Object.defineProperty(MdButtonToggle.prototype, "change", {
	        get: function () {
	            return this._change.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdButtonToggle.prototype.ngOnInit = function () {
	        if (this.id == null) {
	            this.id = "md-button-toggle-" + _uniqueIdCounter++;
	        }
	        if (this.buttonToggleGroup && this._value == this.buttonToggleGroup.value) {
	            this._checked = true;
	        }
	    };
	    Object.defineProperty(MdButtonToggle.prototype, "inputId", {
	        get: function () {
	            return this.id + "-input";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdButtonToggle.prototype, "checked", {
	        get: function () {
	            return this._checked;
	        },
	        set: function (newCheckedState) {
	            if (this._isSingleSelector) {
	                if (newCheckedState) {
	                    // Notify all button toggles with the same name (in the same group) to un-check.
	                    this.buttonToggleDispatcher.notify(this.id, this.name);
	                }
	            }
	            this._checked = newCheckedState;
	            if (newCheckedState && this._isSingleSelector && this.buttonToggleGroup.value != this.value) {
	                this.buttonToggleGroup.selected = this;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdButtonToggle.prototype, "value", {
	        /** MdButtonToggleGroup reads this to assign its own value. */
	        get: function () {
	            return this._value;
	        },
	        set: function (value) {
	            if (this._value != value) {
	                if (this.buttonToggleGroup != null && this.checked) {
	                    this.buttonToggleGroup.value = value;
	                }
	                this._value = value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Dispatch change event with current value. */
	    MdButtonToggle.prototype._emitChangeEvent = function () {
	        var event = new MdButtonToggleChange();
	        event.source = this;
	        event.value = this._value;
	        this._change.emit(event);
	    };
	    Object.defineProperty(MdButtonToggle.prototype, "disabled", {
	        get: function () {
	            return this._disabled || (this.buttonToggleGroup != null && this.buttonToggleGroup.disabled) ||
	                (this.buttonToggleGroupMultiple != null && this.buttonToggleGroupMultiple.disabled);
	        },
	        set: function (value) {
	            this._disabled = (value != null && value !== false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Toggle the state of the current button toggle. */
	    MdButtonToggle.prototype._toggle = function () {
	        this.checked = !this.checked;
	    };
	    /** Checks the button toggle due to an interaction with the underlying native input. */
	    MdButtonToggle.prototype._onInputChange = function (event) {
	        event.stopPropagation();
	        if (this._isSingleSelector) {
	            // Propagate the change one-way via the group, which will in turn mark this
	            // button toggle as checked.
	            this.checked = true;
	            this.buttonToggleGroup.selected = this;
	            this.buttonToggleGroup.onTouched();
	        }
	        else {
	            this._toggle();
	        }
	        // Emit a change event when the native input does.
	        this._emitChangeEvent();
	    };
	    /** TODO: internal */
	    MdButtonToggle.prototype._onInputClick = function (event) {
	        // We have to stop propagation for click events on the visual hidden input element.
	        // By default, when a user clicks on a label element, a generated click event will be
	        // dispatched on the associated input element. Since we are using a label element as our
	        // root container, the click event on the `slide-toggle` will be executed twice.
	        // The real click event will bubble up, and the generated click event also tries to bubble up.
	        // This will lead to multiple click events.
	        // Preventing bubbling for the second event will solve that issue.
	        event.stopPropagation();
	    };
	    __decorate$16([
	        _angular_core.HostBinding(),
	        _angular_core.Input(), 
	        __metadata$16('design:type', String)
	    ], MdButtonToggle.prototype, "id", void 0);
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', String)
	    ], MdButtonToggle.prototype, "name", void 0);
	    __decorate$16([
	        _angular_core.Output(), 
	        __metadata$16('design:type', rxjs_Observable.Observable)
	    ], MdButtonToggle.prototype, "change", null);
	    __decorate$16([
	        _angular_core.HostBinding('class.md-button-toggle-checked'),
	        _angular_core.Input(), 
	        __metadata$16('design:type', Boolean)
	    ], MdButtonToggle.prototype, "checked", null);
	    __decorate$16([
	        _angular_core.Input(), 
	        __metadata$16('design:type', Object)
	    ], MdButtonToggle.prototype, "value", null);
	    __decorate$16([
	        _angular_core.HostBinding('class.md-button-toggle-disabled'),
	        _angular_core.Input(), 
	        __metadata$16('design:type', Boolean)
	    ], MdButtonToggle.prototype, "disabled", null);
	    MdButtonToggle = __decorate$16([
	        _angular_core.Component({selector: 'md-button-toggle',
	            template: "<label [attr.for]=\"inputId\" class=\"md-button-toggle-label\"> <input #input class=\"md-button-toggle-input md-visually-hidden\" [type]=\"_type\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"> <div class=\"md-button-toggle-label-content\"> <ng-content></ng-content> </div> </label> ",
	            styles: ["md-button-toggle-group { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); position: relative; display: inline-flex; border-radius: 3px; cursor: pointer; white-space: nowrap; } .md-button-toggle-disabled .md-button-toggle-label-content { cursor: default; } md-button-toggle { white-space: nowrap; } .md-button-toggle-label-content { display: inline-block; line-height: 36px; padding: 0 16px; cursor: pointer; } .md-button-toggle-label-content > * { vertical-align: middle; } /*# sourceMappingURL=button-toggle.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }),
	        __param$1(0, _angular_core.Optional()),
	        __param$1(1, _angular_core.Optional()), 
	        __metadata$16('design:paramtypes', [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdUniqueSelectionDispatcher])
	    ], MdButtonToggle);
	    return MdButtonToggle;
	}());
	var MdButtonToggleModule = (function () {
	    function MdButtonToggleModule() {
	    }
	    MdButtonToggleModule.forRoot = function () {
	        return {
	            ngModule: MdButtonToggleModule,
	            providers: [MdUniqueSelectionDispatcher]
	        };
	    };
	    MdButtonToggleModule = __decorate$16([
	        _angular_core.NgModule({
	            imports: [_angular_forms.FormsModule],
	            exports: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
	            declarations: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
	        }), 
	        __metadata$16('design:paramtypes', [])
	    ], MdButtonToggleModule);
	    return MdButtonToggleModule;
	}());
	
	var __extends$6 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$17 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(jelbourn): Make the `isMouseDown` stuff done with one global listener.
	// TODO(kara): Convert attribute selectors to classes when attr maps become available
	var MdButton = (function () {
	    function MdButton(_elementRef, _renderer) {
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
	        this._isKeyboardFocused = false;
	        /** Whether a mousedown has occurred on this element in the last 100ms. */
	        this._isMouseDown = false;
	        /** Whether the ripple effect on click should be disabled. */
	        this.disableRipple = false;
	    }
	    Object.defineProperty(MdButton.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            this._updateColor(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdButton.prototype._setMousedown = function () {
	        var _this = this;
	        // We only *show* the focus style when focus has come to the button via the keyboard.
	        // The Material Design spec is silent on this topic, and without doing this, the
	        // button continues to look :active after clicking.
	        // @see http://marcysutton.com/button-focus-hell/
	        this._isMouseDown = true;
	        setTimeout(function () { _this._isMouseDown = false; }, 100);
	    };
	    MdButton.prototype._updateColor = function (newColor) {
	        this._setElementColor(this._color, false);
	        this._setElementColor(newColor, true);
	        this._color = newColor;
	    };
	    MdButton.prototype._setElementColor = function (color, isAdd) {
	        if (color != null && color != '') {
	            this._renderer.setElementClass(this._elementRef.nativeElement, "md-" + color, isAdd);
	        }
	    };
	    MdButton.prototype._setKeyboardFocus = function () {
	        this._isKeyboardFocused = !this._isMouseDown;
	    };
	    MdButton.prototype._removeKeyboardFocus = function () {
	        this._isKeyboardFocused = false;
	    };
	    /** TODO(hansl): e2e test this function. */
	    MdButton.prototype.focus = function () {
	        this._elementRef.nativeElement.focus();
	    };
	    MdButton.prototype.getHostElement = function () {
	        return this._elementRef.nativeElement;
	    };
	    MdButton.prototype.isRoundButton = function () {
	        var el = this._elementRef.nativeElement;
	        return el.hasAttribute('md-icon-button') ||
	            el.hasAttribute('md-fab') ||
	            el.hasAttribute('md-mini-fab');
	    };
	    MdButton.prototype.isRippleEnabled = function () {
	        return !this.disableRipple;
	    };
	    __decorate$17([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$17('design:type', Boolean)
	    ], MdButton.prototype, "disableRipple", void 0);
	    __decorate$17([
	        _angular_core.Input(), 
	        __metadata$17('design:type', String)
	    ], MdButton.prototype, "color", null);
	    MdButton = __decorate$17([
	        _angular_core.Component({selector: 'button[md-button], button[md-raised-button], button[md-icon-button], ' +
	                'button[md-fab], button[md-mini-fab]',
	            host: {
	                '[class.md-button-focus]': '_isKeyboardFocused',
	                '(mousedown)': '_setMousedown()',
	                '(focus)': '_setKeyboardFocus()',
	                '(blur)': '_removeKeyboardFocus()',
	            },
	            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> <div md-ripple *ngIf=\"isRippleEnabled()\" class=\"md-button-ripple\" [class.md-button-ripple-round]=\"isRoundButton()\" [md-ripple-trigger]=\"getHostElement()\" [md-ripple-color]=\"isRoundButton() ? 'rgba(255, 255, 255, 0.2)' : ''\" md-ripple-background-color=\"rgba(0, 0, 0, 0)\"></div> ",
	            styles: ["[md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$17('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdButton);
	    return MdButton;
	}());
	var MdAnchor = (function (_super) {
	    __extends$6(MdAnchor, _super);
	    function MdAnchor(elementRef, renderer) {
	        _super.call(this, elementRef, renderer);
	        this._disabled = null;
	    }
	    Object.defineProperty(MdAnchor.prototype, "tabIndex", {
	        get: function () {
	            return this.disabled ? -1 : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdAnchor.prototype, "isAriaDisabled", {
	        get: function () {
	            return this.disabled ? 'true' : 'false';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdAnchor.prototype, "disabled", {
	        get: function () { return this._disabled; },
	        set: function (value) {
	            // The presence of *any* disabled value makes the component disabled, *except* for false.
	            this._disabled = (value != null && value != false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdAnchor.prototype._haltDisabledEvents = function (event) {
	        // A disabled button shouldn't apply any actions
	        if (this.disabled) {
	            event.preventDefault();
	            event.stopImmediatePropagation();
	        }
	    };
	    __decorate$17([
	        _angular_core.HostBinding('tabIndex'), 
	        __metadata$17('design:type', Number)
	    ], MdAnchor.prototype, "tabIndex", null);
	    __decorate$17([
	        _angular_core.HostBinding('attr.aria-disabled'), 
	        __metadata$17('design:type', String)
	    ], MdAnchor.prototype, "isAriaDisabled", null);
	    __decorate$17([
	        _angular_core.HostBinding('attr.disabled'),
	        _angular_core.Input('disabled'), 
	        __metadata$17('design:type', Object)
	    ], MdAnchor.prototype, "disabled", null);
	    MdAnchor = __decorate$17([
	        _angular_core.Component({selector: 'a[md-button], a[md-raised-button], a[md-icon-button], a[md-fab], a[md-mini-fab]',
	            inputs: ['color'],
	            host: {
	                '[class.md-button-focus]': '_isKeyboardFocused',
	                '(mousedown)': '_setMousedown()',
	                '(focus)': '_setKeyboardFocus()',
	                '(blur)': '_removeKeyboardFocus()',
	                '(click)': '_haltDisabledEvents($event)',
	            },
	            template: "<span class=\"md-button-wrapper\"><ng-content></ng-content></span> <div md-ripple *ngIf=\"isRippleEnabled()\" class=\"md-button-ripple\" [class.md-button-ripple-round]=\"isRoundButton()\" [md-ripple-trigger]=\"getHostElement()\" [md-ripple-color]=\"isRoundButton() ? 'rgba(255, 255, 255, 0.2)' : ''\" md-ripple-background-color=\"rgba(0, 0, 0, 0)\"></div> ",
	            styles: ["[md-raised-button], [md-fab], [md-mini-fab], [md-button], [md-icon-button] { box-sizing: border-box; position: relative; cursor: pointer; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: baseline; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; color: currentColor; text-align: center; margin: 0; min-width: 88px; line-height: 36px; padding: 0 16px; border-radius: 3px; } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab], [disabled][md-button], [disabled][md-icon-button] { cursor: default; } .md-button-focus[md-raised-button]::after, .md-button-focus[md-fab]::after, .md-button-focus[md-mini-fab]::after, .md-button-focus[md-button]::after, .md-button-focus[md-icon-button]::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-raised-button], [md-fab], [md-mini-fab] { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); } [md-raised-button]:active, [md-fab]:active, [md-mini-fab]:active { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); } [disabled][md-raised-button], [disabled][md-fab], [disabled][md-mini-fab] { box-shadow: none; } [md-button]:hover::after, [md-icon-button]:hover::after { position: absolute; top: 0; left: 0; bottom: 0; right: 0; content: ''; background-color: rgba(0, 0, 0, 0.12); border-radius: inherit; pointer-events: none; } [md-button][disabled]:hover.md-primary, [md-button][disabled]:hover.md-accent, [md-button][disabled]:hover.md-warn, [md-button][disabled]:hover::after, [md-icon-button][disabled]:hover.md-primary, [md-icon-button][disabled]:hover.md-accent, [md-icon-button][disabled]:hover.md-warn, [md-icon-button][disabled]:hover::after { background-color: transparent; } [md-fab] { min-width: 0; border-radius: 50%; width: 56px; height: 56px; padding: 0; } [md-fab] i, [md-fab] md-icon { padding: 16px 0; } [md-mini-fab] { min-width: 0; border-radius: 50%; width: 40px; height: 40px; padding: 0; } [md-mini-fab] i, [md-mini-fab] md-icon { padding: 8px 0; } [md-icon-button] { min-width: 0; padding: 0; width: 40px; height: 40px; line-height: 24px; border-radius: 50%; } [md-icon-button] .md-button-wrapper > * { vertical-align: middle; } .md-button-ripple { position: absolute; top: 0; left: 0; bottom: 0; right: 0; } .md-button-ripple-round { border-radius: 50%; z-index: 1; } @media screen and (-ms-high-contrast: active) { .md-raised-button, .md-fab, .md-mini-fab { border: 1px solid #fff; } } /*# sourceMappingURL=button.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata$17('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdAnchor);
	    return MdAnchor;
	}(MdButton));
	var MdButtonModule = (function () {
	    function MdButtonModule() {
	    }
	    MdButtonModule.forRoot = function () {
	        return {
	            ngModule: MdButtonModule,
	            providers: []
	        };
	    };
	    MdButtonModule = __decorate$17([
	        _angular_core.NgModule({
	            imports: [_angular_common.CommonModule, MdRippleModule],
	            exports: [MdButton, MdAnchor],
	            declarations: [MdButton, MdAnchor],
	        }), 
	        __metadata$17('design:paramtypes', [])
	    ], MdButtonModule);
	    return MdButtonModule;
	}());
	
	var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$18 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
	 */
	var nextId = 0;
	/**
	 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor. This allows it
	 * to support [(ngModel)].
	 */
	var MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdCheckbox; }),
	    multi: true
	};
	/**
	 * Represents the different states that require custom transitions between them.
	 */
	(function (TransitionCheckState) {
	    /** The initial state of the component before any user interaction. */
	    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
	    /** The state representing the component when it's becoming checked. */
	    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
	    /** The state representing the component when it's becoming unchecked. */
	    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
	    /** The state representing the component when it's becoming indeterminate. */
	    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
	})(exports.TransitionCheckState || (exports.TransitionCheckState = {}));
	// A simple change event emitted by the MdCheckbox component.
	var MdCheckboxChange = (function () {
	    function MdCheckboxChange() {
	    }
	    return MdCheckboxChange;
	}());
	/**
	 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
	 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
	 * disabled. Note that all additional accessibility attributes are taken care of by the component,
	 * so there is no need to provide them yourself. However, if you want to omit a label and still
	 * have the checkbox be accessible, you may supply an [aria-label] input.
	 * See: https://www.google.com/design/spec/components/selection-controls.html
	 */
	var MdCheckbox = (function () {
	    function MdCheckbox(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	        /**
	         * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
	         * take precedence so this may be omitted.
	         */
	        this.ariaLabel = '';
	        /**
	         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
	         */
	        this.ariaLabelledby = null;
	        /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
	        this.id = "md-checkbox-" + ++nextId;
	        /** Whether the checkbox is required or not. */
	        this.required = false;
	        /** Whether or not the checkbox should come before or after the label. */
	        this.align = 'start';
	        /**
	         * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
	         * The correct ARIA attributes are applied to denote this to assistive technology.
	         */
	        this.disabled = false;
	        /**
	         * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
	         * on the host element will be removed. It will be placed back when the checkbox is re-enabled.
	         */
	        this.tabindex = 0;
	        /** Name value will be applied to the input element if present */
	        this.name = null;
	        /** Event emitted when the checkbox's `checked` value changes. */
	        this.change = new _angular_core.EventEmitter();
	        /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
	        this.onTouched = function () { };
	        this._currentAnimationClass = '';
	        this._currentCheckState = exports.TransitionCheckState.Init;
	        this._checked = false;
	        this._indeterminate = false;
	        this._controlValueAccessorChangeFn = function (value) { };
	        this.hasFocus = false;
	    }
	    Object.defineProperty(MdCheckbox.prototype, "inputId", {
	        /** ID to be applied to the `input` element */
	        get: function () {
	            return "input-" + this.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdCheckbox.prototype, "checked", {
	        /**
	         * Whether the checkbox is checked. Note that setting `checked` will immediately set
	         * `indeterminate` to false.
	         */
	        get: function () {
	            return this._checked;
	        },
	        set: function (checked) {
	            if (checked != this.checked) {
	                this._indeterminate = false;
	                this._checked = checked;
	                this._transitionCheckState(this._checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdCheckbox.prototype, "indeterminate", {
	        /**
	         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
	         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
	         * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
	         * false. This differs from the web platform in that indeterminate state on native
	         * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
	         * `checked` property programmatically). However, we feel that this behavior is more accommodating
	         * to the way consumers would envision using this component.
	         */
	        get: function () {
	            return this._indeterminate;
	        },
	        set: function (indeterminate) {
	            this._indeterminate = indeterminate;
	            if (this._indeterminate) {
	                this._transitionCheckState(exports.TransitionCheckState.Indeterminate);
	            }
	            else {
	                this._transitionCheckState(this.checked ? exports.TransitionCheckState.Checked : exports.TransitionCheckState.Unchecked);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdCheckbox.prototype.writeValue = function (value) {
	        this.checked = !!value;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdCheckbox.prototype.registerOnChange = function (fn) {
	        this._controlValueAccessorChangeFn = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdCheckbox.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    MdCheckbox.prototype._transitionCheckState = function (newState) {
	        var oldState = this._currentCheckState;
	        var renderer = this._renderer;
	        var elementRef = this._elementRef;
	        if (oldState === newState) {
	            return;
	        }
	        if (this._currentAnimationClass.length > 0) {
	            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, false);
	        }
	        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
	        this._currentCheckState = newState;
	        if (this._currentAnimationClass.length > 0) {
	            renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, true);
	        }
	    };
	    MdCheckbox.prototype._emitChangeEvent = function () {
	        var event = new MdCheckboxChange();
	        event.source = this;
	        event.checked = this.checked;
	        this._controlValueAccessorChangeFn(this.checked);
	        this.change.emit(event);
	    };
	    /** Informs the component when the input has focus so that we can style accordingly */
	    MdCheckbox.prototype._onInputFocus = function () {
	        this.hasFocus = true;
	    };
	    /** Informs the component when we lose focus in order to style accordingly */
	    MdCheckbox.prototype._onInputBlur = function () {
	        this.hasFocus = false;
	        this.onTouched();
	    };
	    /**
	     * Toggles the `checked` value between true and false
	     */
	    MdCheckbox.prototype.toggle = function () {
	        this.checked = !this.checked;
	    };
	    /**
	     * Event handler for checkbox input element.
	     * Toggles checked state if element is not disabled.
	     * @param event
	     */
	    MdCheckbox.prototype._onInteractionEvent = function (event) {
	        // We always have to stop propagation on the change event.
	        // Otherwise the change event, from the input element, will bubble up and
	        // emit its event object to the `change` output.
	        event.stopPropagation();
	        if (!this.disabled) {
	            this.toggle();
	            // Emit our custom change event if the native input emitted one.
	            // It is important to only emit it, if the native input triggered one, because
	            // we don't want to trigger a change event, when the `checked` variable changes for example.
	            this._emitChangeEvent();
	        }
	    };
	    MdCheckbox.prototype._onInputClick = function (event) {
	        // We have to stop propagation for click events on the visual hidden input element.
	        // By default, when a user clicks on a label element, a generated click event will be
	        // dispatched on the associated input element. Since we are using a label element as our
	        // root container, the click event on the `checkbox` will be executed twice.
	        // The real click event will bubble up, and the generated click event also tries to bubble up.
	        // This will lead to multiple click events.
	        // Preventing bubbling for the second event will solve that issue.
	        event.stopPropagation();
	    };
	    MdCheckbox.prototype._getAnimationClassForCheckStateTransition = function (oldState, newState) {
	        var animSuffix;
	        switch (oldState) {
	            case exports.TransitionCheckState.Init:
	                // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
	                // [checked] bound to it.
	                if (newState === exports.TransitionCheckState.Checked) {
	                    animSuffix = 'unchecked-checked';
	                }
	                else {
	                    return '';
	                }
	                break;
	            case exports.TransitionCheckState.Unchecked:
	                animSuffix = newState === exports.TransitionCheckState.Checked ?
	                    'unchecked-checked' : 'unchecked-indeterminate';
	                break;
	            case exports.TransitionCheckState.Checked:
	                animSuffix = newState === exports.TransitionCheckState.Unchecked ?
	                    'checked-unchecked' : 'checked-indeterminate';
	                break;
	            case exports.TransitionCheckState.Indeterminate:
	                animSuffix = newState === exports.TransitionCheckState.Checked ?
	                    'indeterminate-checked' : 'indeterminate-unchecked';
	        }
	        return "md-checkbox-anim-" + animSuffix;
	    };
	    __decorate$18([
	        _angular_core.Input('aria-label'), 
	        __metadata$18('design:type', String)
	    ], MdCheckbox.prototype, "ariaLabel", void 0);
	    __decorate$18([
	        _angular_core.Input('aria-labelledby'), 
	        __metadata$18('design:type', String)
	    ], MdCheckbox.prototype, "ariaLabelledby", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', String)
	    ], MdCheckbox.prototype, "id", void 0);
	    __decorate$18([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$18('design:type', Boolean)
	    ], MdCheckbox.prototype, "required", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', Object)
	    ], MdCheckbox.prototype, "align", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', Boolean)
	    ], MdCheckbox.prototype, "disabled", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', Number)
	    ], MdCheckbox.prototype, "tabindex", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', String)
	    ], MdCheckbox.prototype, "name", void 0);
	    __decorate$18([
	        _angular_core.Output(), 
	        __metadata$18('design:type', _angular_core.EventEmitter)
	    ], MdCheckbox.prototype, "change", void 0);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', Object)
	    ], MdCheckbox.prototype, "checked", null);
	    __decorate$18([
	        _angular_core.Input(), 
	        __metadata$18('design:type', Object)
	    ], MdCheckbox.prototype, "indeterminate", null);
	    MdCheckbox = __decorate$18([
	        _angular_core.Component({selector: 'md-checkbox',
	            template: "<label class=\"md-checkbox-layout\"> <div class=\"md-checkbox-inner-container\"> <input class=\"md-checkbox-input md-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [tabIndex]=\"tabindex\" [indeterminate]=\"indeterminate\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (change)=\"_onInteractionEvent($event)\" (click)=\"_onInputClick($event)\"> <div class=\"md-ink-ripple\"></div> <div class=\"md-checkbox-frame\"></div> <div class=\"md-checkbox-background\"> <svg version=\"1.1\" class=\"md-checkbox-checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" xml:space=\"preserve\"> <path class=\"md-checkbox-checkmark-path\" fill=\"none\" stroke=\"white\" d=\"M4.1,12.7 9,17.6 20.3,6.3\"/> </svg> <!-- Element for rendering the indeterminate state checkbox. --> <div class=\"md-checkbox-mixedmark\"></div> </div> </div> <span class=\"md-checkbox-label\"> <ng-content></ng-content> </span> </label> ",
	            styles: ["@keyframes md-checkbox-fade-in-background { 0% { opacity: 0; } 50% { opacity: 1; } } @keyframes md-checkbox-fade-out-background { 0%, 50% { opacity: 1; } 100% { opacity: 0; } } @keyframes md-checkbox-unchecked-checked-checkmark-path { 0%, 50% { stroke-dashoffset: 22.91026; } 50% { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); } 100% { stroke-dashoffset: 0; } } @keyframes md-checkbox-unchecked-indeterminate-mixedmark { 0%, 68.2% { transform: scaleX(0); } 68.2% { animation-timing-function: cubic-bezier(0, 0, 0, 1); } 100% { transform: scaleX(1); } } @keyframes md-checkbox-checked-unchecked-checkmark-path { from { animation-timing-function: cubic-bezier(0.4, 0, 1, 1); stroke-dashoffset: 0; } to { stroke-dashoffset: -22.91026; } } @keyframes md-checkbox-checked-indeterminate-checkmark { from { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); opacity: 1; transform: rotate(0deg); } to { opacity: 0; transform: rotate(45deg); } } @keyframes md-checkbox-indeterminate-checked-checkmark { from { animation-timing-function: cubic-bezier(0.14, 0, 0, 1); opacity: 0; transform: rotate(45deg); } to { opacity: 1; transform: rotate(360deg); } } @keyframes md-checkbox-checked-indeterminate-mixedmark { from { animation-timing-function: cubic-bezier(0, 0, 0.2, 0.1); opacity: 0; transform: rotate(-45deg); } to { opacity: 1; transform: rotate(0deg); } } @keyframes md-checkbox-indeterminate-checked-mixedmark { from { animation-timing-function: cubic-bezier(0.14, 0, 0, 1); opacity: 1; transform: rotate(0deg); } to { opacity: 0; transform: rotate(315deg); } } @keyframes md-checkbox-indeterminate-unchecked-mixedmark { 0% { animation-timing-function: linear; opacity: 1; transform: scaleX(1); } 32.8%, 100% { opacity: 0; transform: scaleX(0); } } .md-checkbox-frame, .md-checkbox-background, .md-checkbox-checkmark { bottom: 0; left: 0; position: absolute; right: 0; top: 0; } .md-checkbox-checkmark, .md-checkbox-mixedmark { width: calc(100% - 4px); } .md-checkbox-frame, .md-checkbox-background { border-radius: 2px; box-sizing: border-box; pointer-events: none; } md-checkbox { cursor: pointer; } .md-checkbox-layout { cursor: inherit; align-items: baseline; display: inline-flex; } .md-checkbox-inner-container { display: inline-block; height: 20px; line-height: 0; margin: auto; margin-right: 8px; order: 0; position: relative; vertical-align: middle; white-space: nowrap; width: 20px; } [dir='rtl'] .md-checkbox-inner-container { margin-left: 8px; margin-right: auto; } .md-checkbox-layout .md-checkbox-label { line-height: 24px; } .md-checkbox-frame { background-color: transparent; border: 2px solid; transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1); will-change: border-color; } .md-checkbox-background { align-items: center; display: inline-flex; justify-content: center; transition: background-color 90ms cubic-bezier(0, 0, 0.2, 0.1), opacity 90ms cubic-bezier(0, 0, 0.2, 0.1); will-change: background-color, opacity; } .md-checkbox-checkmark { width: 100%; } .md-checkbox-checkmark-path { stroke-dashoffset: 22.91026; stroke-dasharray: 22.91026; stroke-width: 2.66667px; } .md-checkbox-mixedmark { height: 2px; opacity: 0; transform: scaleX(0) rotate(0deg); } .md-checkbox-align-end .md-checkbox-inner-container { order: 1; margin-left: 8px; margin-right: auto; } [dir='rtl'] .md-checkbox-align-end .md-checkbox-inner-container { margin-left: auto; margin-right: 8px; } .md-checkbox-checked .md-checkbox-checkmark { opacity: 1; } .md-checkbox-checked .md-checkbox-checkmark-path { stroke-dashoffset: 0; } .md-checkbox-checked .md-checkbox-mixedmark { transform: scaleX(1) rotate(-45deg); } .md-checkbox-indeterminate .md-checkbox-checkmark { opacity: 0; transform: rotate(45deg); } .md-checkbox-indeterminate .md-checkbox-checkmark-path { stroke-dashoffset: 0; } .md-checkbox-indeterminate .md-checkbox-mixedmark { opacity: 1; transform: scaleX(1) rotate(0deg); } .md-checkbox-unchecked .md-checkbox-background { background-color: transparent; } .md-checkbox-disabled { cursor: default; } .md-checkbox-anim-unchecked-checked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-in-background; } .md-checkbox-anim-unchecked-checked .md-checkbox-checkmark-path { animation: 180ms linear 0ms md-checkbox-unchecked-checked-checkmark-path; } .md-checkbox-anim-unchecked-indeterminate .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-in-background; } .md-checkbox-anim-unchecked-indeterminate .md-checkbox-mixedmark { animation: 90ms linear 0ms md-checkbox-unchecked-indeterminate-mixedmark; } .md-checkbox-anim-checked-unchecked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-out-background; } .md-checkbox-anim-checked-unchecked .md-checkbox-checkmark-path { animation: 90ms linear 0ms md-checkbox-checked-unchecked-checkmark-path; } .md-checkbox-anim-checked-indeterminate .md-checkbox-checkmark { animation: 90ms linear 0ms md-checkbox-checked-indeterminate-checkmark; } .md-checkbox-anim-checked-indeterminate .md-checkbox-mixedmark { animation: 90ms linear 0ms md-checkbox-checked-indeterminate-mixedmark; } .md-checkbox-anim-indeterminate-checked .md-checkbox-checkmark { animation: 500ms linear 0ms md-checkbox-indeterminate-checked-checkmark; } .md-checkbox-anim-indeterminate-checked .md-checkbox-mixedmark { animation: 500ms linear 0ms md-checkbox-indeterminate-checked-mixedmark; } .md-checkbox-anim-indeterminate-unchecked .md-checkbox-background { animation: 180ms linear 0ms md-checkbox-fade-out-background; } .md-checkbox-anim-indeterminate-unchecked .md-checkbox-mixedmark { animation: 300ms linear 0ms md-checkbox-indeterminate-unchecked-mixedmark; } .md-checkbox-input { bottom: 0; left: 50%; } .md-ink-ripple { border-radius: 50%; opacity: 0; height: 48px; left: 50%; overflow: hidden; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); transition: opacity ease 280ms, background-color ease 280ms; width: 48px; } .md-checkbox-focused .md-ink-ripple { opacity: 1; } .md-checkbox-disabled .md-ink-ripple { background-color: #000; } /*# sourceMappingURL=checkbox.css.map */ "],
	            host: {
	                '[class.md-checkbox-indeterminate]': 'indeterminate',
	                '[class.md-checkbox-checked]': 'checked',
	                '[class.md-checkbox-disabled]': 'disabled',
	                '[class.md-checkbox-align-end]': 'align == "end"',
	                '[class.md-checkbox-focused]': 'hasFocus',
	            },
	            providers: [MD_CHECKBOX_CONTROL_VALUE_ACCESSOR],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata$18('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdCheckbox);
	    return MdCheckbox;
	}());
	var MdCheckboxModule = (function () {
	    function MdCheckboxModule() {
	    }
	    MdCheckboxModule.forRoot = function () {
	        return {
	            ngModule: MdCheckboxModule,
	            providers: []
	        };
	    };
	    MdCheckboxModule = __decorate$18([
	        _angular_core.NgModule({
	            exports: [MdCheckbox],
	            declarations: [MdCheckbox],
	        }), 
	        __metadata$18('design:paramtypes', [])
	    ], MdCheckboxModule);
	    return MdCheckboxModule;
	}());
	
	var __decorate$19 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$19 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	/**
	 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
	 * allows it to support [(ngModel)] and ngControl.
	 */
	var MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdRadioGroup; }),
	    multi: true
	};
	// TODO(mtlin):
	// Ink ripple is currently placeholder.
	// Determine motion spec for button transitions.
	// Design review.
	// RTL
	// Support forms API.
	// Use ChangeDetectionStrategy.OnPush
	var _uniqueIdCounter$1 = 0;
	/** A simple change event emitted by either MdRadioButton or MdRadioGroup. */
	var MdRadioChange = (function () {
	    function MdRadioChange() {
	    }
	    return MdRadioChange;
	}());
	var MdRadioGroup = (function () {
	    function MdRadioGroup() {
	        /**
	         * Selected value for group. Should equal the value of the selected radio button if there *is*
	         * a corresponding radio button with a matching value. If there is *not* such a corresponding
	         * radio button, this value persists to be applied in case a new radio button is added with a
	         * matching value.
	         */
	        this._value = null;
	        /** The HTML name attribute applied to radio buttons in this group. */
	        this._name = "md-radio-group-" + _uniqueIdCounter$1++;
	        /** Disables all individual radio buttons assigned to this group. */
	        this._disabled = false;
	        /** The currently selected radio button. Should match value. */
	        this._selected = null;
	        /** Whether the `value` has been set to its initial value. */
	        this._isInitialized = false;
	        /** The method to be called in order to update ngModel */
	        this._controlValueAccessorChangeFn = function (value) { };
	        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
	        this.onTouched = function () { };
	        /** Event emitted when the group value changes. */
	        this.change = new _angular_core.EventEmitter();
	        /** Child radio buttons. */
	        this._radios = null;
	    }
	    Object.defineProperty(MdRadioGroup.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        set: function (value) {
	            this._name = value;
	            this._updateRadioButtonNames();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioGroup.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (value) {
	            // The presence of *any* disabled value makes the component disabled, *except* for false.
	            this._disabled = (value != null && value !== false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioGroup.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (newValue) {
	            if (this._value != newValue) {
	                // Set this before proceeding to ensure no circular loop occurs with selection.
	                this._value = newValue;
	                this._updateSelectedRadioFromValue();
	                // Only fire a change event if this isn't the first time the value is ever set.
	                if (this._isInitialized) {
	                    this._emitChangeEvent();
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioGroup.prototype, "selected", {
	        get: function () {
	            return this._selected;
	        },
	        set: function (selected) {
	            this._selected = selected;
	            this.value = selected ? selected.value : null;
	            if (selected && !selected.checked) {
	                selected.checked = true;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Initialize properties once content children are available.
	     * This allows us to propagate relevant attributes to associated buttons.
	     * TODO: internal
	     */
	    MdRadioGroup.prototype.ngAfterContentInit = function () {
	        // Mark this component as initialized in AfterContentInit because the initial value can
	        // possibly be set by NgModel on MdRadioGroup, and it is possible that the OnInit of the
	        // NgModel occurs *after* the OnInit of the MdRadioGroup.
	        this._isInitialized = true;
	    };
	    /**
	     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
	     * radio buttons upon their blur.
	     */
	    MdRadioGroup.prototype._touch = function () {
	        if (this.onTouched) {
	            this.onTouched();
	        }
	    };
	    MdRadioGroup.prototype._updateRadioButtonNames = function () {
	        var _this = this;
	        if (this._radios) {
	            this._radios.forEach(function (radio) {
	                radio.name = _this.name;
	            });
	        }
	    };
	    /** Updates the `selected` radio button from the internal _value state. */
	    MdRadioGroup.prototype._updateSelectedRadioFromValue = function () {
	        var _this = this;
	        // If the value already matches the selected radio, do nothing.
	        var isAlreadySelected = this._selected != null && this._selected.value == this._value;
	        if (this._radios != null && !isAlreadySelected) {
	            var matchingRadio = this._radios.filter(function (radio) { return radio.value == _this._value; })[0];
	            if (matchingRadio) {
	                this.selected = matchingRadio;
	            }
	            else if (this.value == null) {
	                this.selected = null;
	                this._radios.forEach(function (radio) { radio.checked = false; });
	            }
	        }
	    };
	    /** Dispatch change event with current selection and group value. */
	    MdRadioGroup.prototype._emitChangeEvent = function () {
	        var event = new MdRadioChange();
	        event.source = this._selected;
	        event.value = this._value;
	        this._controlValueAccessorChangeFn(event.value);
	        this.change.emit(event);
	    };
	    /**
	      * Implemented as part of ControlValueAccessor.
	      * TODO: internal
	      */
	    MdRadioGroup.prototype.writeValue = function (value) {
	        this.value = value;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdRadioGroup.prototype.registerOnChange = function (fn) {
	        this._controlValueAccessorChangeFn = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdRadioGroup.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate$19([
	        _angular_core.Output(), 
	        __metadata$19('design:type', _angular_core.EventEmitter)
	    ], MdRadioGroup.prototype, "change", void 0);
	    __decorate$19([
	        _angular_core.ContentChildren(_angular_core.forwardRef(function () { return MdRadioButton; })), 
	        __metadata$19('design:type', _angular_core.QueryList)
	    ], MdRadioGroup.prototype, "_radios", void 0);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', String)
	    ], MdRadioGroup.prototype, "name", null);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Object)
	    ], MdRadioGroup.prototype, "align", void 0);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Boolean)
	    ], MdRadioGroup.prototype, "disabled", null);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Object)
	    ], MdRadioGroup.prototype, "value", null);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Object)
	    ], MdRadioGroup.prototype, "selected", null);
	    MdRadioGroup = __decorate$19([
	        _angular_core.Directive({
	            selector: 'md-radio-group',
	            providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
	            host: {
	                'role': 'radiogroup',
	            },
	        }), 
	        __metadata$19('design:paramtypes', [])
	    ], MdRadioGroup);
	    return MdRadioGroup;
	}());
	var MdRadioButton = (function () {
	    function MdRadioButton(radioGroup, radioDispatcher) {
	        // Assertions. Ideally these should be stripped out by the compiler.
	        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
	        var _this = this;
	        this.radioDispatcher = radioDispatcher;
	        /** Whether this radio is checked. */
	        this._checked = false;
	        /** The unique ID for the radio button. */
	        this.id = "md-radio-" + _uniqueIdCounter$1++;
	        /** Value assigned to this radio.*/
	        this._value = null;
	        /** Event emitted when the group value changes. */
	        this.change = new _angular_core.EventEmitter();
	        this.radioGroup = radioGroup;
	        radioDispatcher.listen(function (id, name) {
	            if (id != _this.id && name == _this.name) {
	                _this.checked = false;
	            }
	        });
	    }
	    Object.defineProperty(MdRadioButton.prototype, "inputId", {
	        get: function () {
	            return this.id + "-input";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioButton.prototype, "checked", {
	        get: function () {
	            return this._checked;
	        },
	        set: function (newCheckedState) {
	            if (newCheckedState) {
	                // Notify all radio buttons with the same name to un-check.
	                this.radioDispatcher.notify(this.id, this.name);
	            }
	            this._checked = newCheckedState;
	            if (newCheckedState && this.radioGroup && this.radioGroup.value != this.value) {
	                this.radioGroup.selected = this;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioButton.prototype, "value", {
	        /** MdRadioGroup reads this to assign its own value. */
	        get: function () {
	            return this._value;
	        },
	        set: function (value) {
	            if (this._value != value) {
	                if (this.radioGroup != null && this.checked) {
	                    this.radioGroup.value = value;
	                }
	                this._value = value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioButton.prototype, "align", {
	        get: function () {
	            return this._align || (this.radioGroup != null && this.radioGroup.align) || 'start';
	        },
	        set: function (value) {
	            this._align = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdRadioButton.prototype, "disabled", {
	        get: function () {
	            return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
	        },
	        set: function (value) {
	            // The presence of *any* disabled value makes the component disabled, *except* for false.
	            this._disabled = (value != null && value !== false) ? true : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    MdRadioButton.prototype.ngOnInit = function () {
	        if (this.radioGroup) {
	            // If the radio is inside a radio group, determine if it should be checked
	            this.checked = this.radioGroup.value === this._value;
	            // Copy name from parent radio group
	            this.name = this.radioGroup.name;
	        }
	    };
	    /** Dispatch change event with current value. */
	    MdRadioButton.prototype._emitChangeEvent = function () {
	        var event = new MdRadioChange();
	        event.source = this;
	        event.value = this._value;
	        this.change.emit(event);
	    };
	    /**
	     * We use a hidden native input field to handle changes to focus state via keyboard navigation,
	     * with visual rendering done separately. The native element is kept in sync with the overall
	     * state of the component.
	     */
	    MdRadioButton.prototype._onInputFocus = function () {
	        this._isFocused = true;
	    };
	    /** TODO: internal */
	    MdRadioButton.prototype._onInputBlur = function () {
	        this._isFocused = false;
	        if (this.radioGroup) {
	            this.radioGroup._touch();
	        }
	    };
	    /** TODO: internal */
	    MdRadioButton.prototype._onInputClick = function (event) {
	        // We have to stop propagation for click events on the visual hidden input element.
	        // By default, when a user clicks on a label element, a generated click event will be
	        // dispatched on the associated input element. Since we are using a label element as our
	        // root container, the click event on the `radio-button` will be executed twice.
	        // The real click event will bubble up, and the generated click event also tries to bubble up.
	        // This will lead to multiple click events.
	        // Preventing bubbling for the second event will solve that issue.
	        event.stopPropagation();
	    };
	    /**
	     * Triggered when the radio button received a click or the input recognized any change.
	     * Clicking on a label element, will trigger a change event on the associated input.
	     * TODO: internal
	     */
	    MdRadioButton.prototype._onInputChange = function (event) {
	        // We always have to stop propagation on the change event.
	        // Otherwise the change event, from the input element, will bubble up and
	        // emit its event object to the `change` output.
	        event.stopPropagation();
	        this.checked = true;
	        this._emitChangeEvent();
	        if (this.radioGroup) {
	            this.radioGroup._touch();
	        }
	    };
	    __decorate$19([
	        _angular_core.HostBinding('class.md-radio-focused'), 
	        __metadata$19('design:type', Boolean)
	    ], MdRadioButton.prototype, "_isFocused", void 0);
	    __decorate$19([
	        _angular_core.HostBinding('id'),
	        _angular_core.Input(), 
	        __metadata$19('design:type', String)
	    ], MdRadioButton.prototype, "id", void 0);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', String)
	    ], MdRadioButton.prototype, "name", void 0);
	    __decorate$19([
	        _angular_core.Input('aria-label'), 
	        __metadata$19('design:type', String)
	    ], MdRadioButton.prototype, "ariaLabel", void 0);
	    __decorate$19([
	        _angular_core.Input('aria-labelledby'), 
	        __metadata$19('design:type', String)
	    ], MdRadioButton.prototype, "ariaLabelledby", void 0);
	    __decorate$19([
	        _angular_core.Output(), 
	        __metadata$19('design:type', _angular_core.EventEmitter)
	    ], MdRadioButton.prototype, "change", void 0);
	    __decorate$19([
	        _angular_core.HostBinding('class.md-radio-checked'),
	        _angular_core.Input(), 
	        __metadata$19('design:type', Boolean)
	    ], MdRadioButton.prototype, "checked", null);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Object)
	    ], MdRadioButton.prototype, "value", null);
	    __decorate$19([
	        _angular_core.Input(), 
	        __metadata$19('design:type', Object)
	    ], MdRadioButton.prototype, "align", null);
	    __decorate$19([
	        _angular_core.HostBinding('class.md-radio-disabled'),
	        _angular_core.Input(), 
	        __metadata$19('design:type', Boolean)
	    ], MdRadioButton.prototype, "disabled", null);
	    MdRadioButton = __decorate$19([
	        _angular_core.Component({selector: 'md-radio-button',
	            template: "<!-- TODO(jelbourn): render the radio on either side of the content --> <!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. --> <label [attr.for]=\"inputId\" class=\"md-radio-label\"> <!-- The actual 'radio' part of the control. --> <div class=\"md-radio-container\"> <div class=\"md-radio-outer-circle\"></div> <div class=\"md-radio-inner-circle\"></div> <div class=\"md-ink-ripple\"></div> </div> <input #input class=\"md-radio-input md-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onInputChange($event)\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (click)=\"_onInputClick($event)\"> <!-- The label content for radio control. --> <div class=\"md-radio-label-content\" [class.md-radio-align-end]=\"align == 'end'\"> <ng-content></ng-content> </div> </label> ",
	            styles: ["md-radio-button { display: inline-block; } .md-radio-label { cursor: pointer; display: inline-flex; align-items: baseline; white-space: nowrap; } .md-radio-container { box-sizing: border-box; display: inline-block; height: 20px; position: relative; width: 20px; top: 2px; } .md-radio-outer-circle { border: solid 2px; border-radius: 50%; box-sizing: border-box; height: 20px; left: 0; position: absolute; top: 0; transition: border-color ease 280ms; width: 20px; } .md-radio-inner-circle { border-radius: 50%; box-sizing: border-box; height: 20px; left: 0; position: absolute; top: 0; transition: transform ease 280ms, background-color ease 280ms; transform: scale(0); width: 20px; } .md-radio-checked .md-radio-inner-circle { transform: scale(0.5); } .md-radio-label-content { display: inline-block; order: 0; line-height: inherit; padding-left: 8px; padding-right: 0; } [dir='rtl'] .md-radio-label-content { padding-right: 8px; padding-left: 0; } .md-radio-label-content.md-radio-align-end { order: -1; padding-left: 0; padding-right: 8px; } [dir='rtl'] .md-radio-label-content.md-radio-align-end { padding-right: 0; padding-left: 8px; } .md-radio-disabled, .md-radio-disabled .md-radio-label { cursor: default; } .md-ink-ripple { border-radius: 50%; opacity: 0; height: 48px; left: 50%; overflow: hidden; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); transition: opacity ease 280ms, background-color ease 280ms; width: 48px; } .md-radio-focused .md-ink-ripple { opacity: 1; } .md-radio-disabled .md-ink-ripple { background-color: #000; } /*# sourceMappingURL=radio.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }),
	        __param$2(0, _angular_core.Optional()), 
	        __metadata$19('design:paramtypes', [MdRadioGroup, MdUniqueSelectionDispatcher])
	    ], MdRadioButton);
	    return MdRadioButton;
	}());
	var MdRadioModule = (function () {
	    function MdRadioModule() {
	    }
	    MdRadioModule.forRoot = function () {
	        return {
	            ngModule: MdRadioModule,
	            providers: [MdUniqueSelectionDispatcher],
	        };
	    };
	    MdRadioModule = __decorate$19([
	        _angular_core.NgModule({
	            exports: [MdRadioGroup, MdRadioButton],
	            declarations: [MdRadioGroup, MdRadioButton],
	        }), 
	        __metadata$19('design:paramtypes', [])
	    ], MdRadioModule);
	    return MdRadioModule;
	}());
	
	var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$21 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdSelect = (function () {
	    function MdSelect() {
	    }
	    MdSelect = __decorate$21([
	        _angular_core.Component({selector: 'md-select',
	            template: "I'm a select!",
	            styles: [" /*# sourceMappingURL=select.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata$21('design:paramtypes', [])
	    ], MdSelect);
	    return MdSelect;
	}());
	
	var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$20 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdSelectModule = (function () {
	    function MdSelectModule() {
	    }
	    MdSelectModule.forRoot = function () {
	        return {
	            ngModule: MdSelectModule,
	            providers: []
	        };
	    };
	    MdSelectModule = __decorate$20([
	        _angular_core.NgModule({
	            imports: [],
	            exports: [MdSelect],
	            declarations: [MdSelect],
	        }), 
	        __metadata$20('design:paramtypes', [])
	    ], MdSelectModule);
	    return MdSelectModule;
	}());
	
	var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$22 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MD_SLIDE_TOGGLE_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdSlideToggle; }),
	    multi: true
	};
	// A simple change event emitted by the MdSlideToggle component.
	var MdSlideToggleChange = (function () {
	    function MdSlideToggleChange() {
	    }
	    return MdSlideToggleChange;
	}());
	// Increasing integer for generating unique ids for slide-toggle components.
	var nextId$1 = 0;
	var MdSlideToggle = (function () {
	    function MdSlideToggle(_elementRef, _renderer) {
	        var _this = this;
	        this._elementRef = _elementRef;
	        this._renderer = _renderer;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        // A unique id for the slide-toggle. By default the id is auto-generated.
	        this._uniqueId = "md-slide-toggle-" + ++nextId$1;
	        this._checked = false;
	        this._hasFocus = false;
	        this._isMousedown = false;
	        this._slideRenderer = null;
	        this.disabled = false;
	        this.required = false;
	        this.name = null;
	        this.id = this._uniqueId;
	        this.tabIndex = 0;
	        this.ariaLabel = null;
	        this.ariaLabelledby = null;
	        this._change = new _angular_core.EventEmitter();
	        this.change = this._change.asObservable();
	        // Returns the unique id for the visual hidden input.
	        this.getInputId = function () { return ((_this.id || _this._uniqueId) + "-input"); };
	    }
	    /** TODO: internal */
	    MdSlideToggle.prototype.ngAfterContentInit = function () {
	        this._slideRenderer = new SlideToggleRenderer(this._elementRef);
	    };
	    /**
	     * The onChangeEvent method will be also called on click.
	     * This is because everything for the slide-toggle is wrapped inside of a label,
	     * which triggers a onChange event on click.
	     */
	    MdSlideToggle.prototype._onChangeEvent = function (event) {
	        // We always have to stop propagation on the change event.
	        // Otherwise the change event, from the input element, will bubble up and
	        // emit its event object to the component's `change` output.
	        event.stopPropagation();
	        // Once a drag is currently in progress, we do not want to toggle the slide-toggle on a click.
	        if (!this.disabled && !this._slideRenderer.isDragging()) {
	            this.toggle();
	            // Emit our custom change event if the native input emitted one.
	            // It is important to only emit it, if the native input triggered one, because
	            // we don't want to trigger a change event, when the `checked` variable changes for example.
	            this._emitChangeEvent();
	        }
	    };
	    MdSlideToggle.prototype._onInputClick = function (event) {
	        this.onTouched();
	        // We have to stop propagation for click events on the visual hidden input element.
	        // By default, when a user clicks on a label element, a generated click event will be
	        // dispatched on the associated input element. Since we are using a label element as our
	        // root container, the click event on the `slide-toggle` will be executed twice.
	        // The real click event will bubble up, and the generated click event also tries to bubble up.
	        // This will lead to multiple click events.
	        // Preventing bubbling for the second event will solve that issue.
	        event.stopPropagation();
	    };
	    MdSlideToggle.prototype._setMousedown = function () {
	        var _this = this;
	        // We only *show* the focus style when focus has come to the button via the keyboard.
	        // The Material Design spec is silent on this topic, and without doing this, the
	        // button continues to look :active after clicking.
	        // @see http://marcysutton.com/button-focus-hell/
	        this._isMousedown = true;
	        setTimeout(function () { return _this._isMousedown = false; }, 100);
	    };
	    MdSlideToggle.prototype._onInputFocus = function () {
	        // Only show the focus / ripple indicator when the focus was not triggered by a mouse
	        // interaction on the component.
	        if (!this._isMousedown) {
	            this._hasFocus = true;
	        }
	    };
	    MdSlideToggle.prototype._onInputBlur = function () {
	        this._hasFocus = false;
	        this.onTouched();
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlideToggle.prototype.writeValue = function (value) {
	        this.checked = value;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlideToggle.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlideToggle.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    Object.defineProperty(MdSlideToggle.prototype, "checked", {
	        get: function () {
	            return !!this._checked;
	        },
	        set: function (value) {
	            if (this.checked !== !!value) {
	                this._checked = value;
	                this.onChange(this._checked);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSlideToggle.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            this._updateColor(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdSlideToggle.prototype.toggle = function () {
	        this.checked = !this.checked;
	    };
	    MdSlideToggle.prototype._updateColor = function (newColor) {
	        this._setElementColor(this._color, false);
	        this._setElementColor(newColor, true);
	        this._color = newColor;
	    };
	    MdSlideToggle.prototype._setElementColor = function (color, isAdd) {
	        if (color != null && color != '') {
	            this._renderer.setElementClass(this._elementRef.nativeElement, "md-" + color, isAdd);
	        }
	    };
	    /** Emits the change event to the `change` output EventEmitter */
	    MdSlideToggle.prototype._emitChangeEvent = function () {
	        var event = new MdSlideToggleChange();
	        event.source = this;
	        event.checked = this.checked;
	        this._change.emit(event);
	    };
	    /** TODO: internal */
	    MdSlideToggle.prototype._onDragStart = function () {
	        this._slideRenderer.startThumbDrag(this.checked);
	    };
	    /** TODO: internal */
	    MdSlideToggle.prototype._onDrag = function (event) {
	        this._slideRenderer.updateThumbPosition(event.deltaX);
	    };
	    /** TODO: internal */
	    MdSlideToggle.prototype._onDragEnd = function () {
	        var _this = this;
	        // Notice that we have to stop outside of the current event handler,
	        // because otherwise the click event will be fired and will reset the new checked variable.
	        setTimeout(function () {
	            _this.checked = _this._slideRenderer.stopThumbDrag();
	        }, 0);
	    };
	    __decorate$22([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$22('design:type', Boolean)
	    ], MdSlideToggle.prototype, "disabled", void 0);
	    __decorate$22([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$22('design:type', Boolean)
	    ], MdSlideToggle.prototype, "required", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', String)
	    ], MdSlideToggle.prototype, "name", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', String)
	    ], MdSlideToggle.prototype, "id", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', Number)
	    ], MdSlideToggle.prototype, "tabIndex", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', String)
	    ], MdSlideToggle.prototype, "ariaLabel", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', String)
	    ], MdSlideToggle.prototype, "ariaLabelledby", void 0);
	    __decorate$22([
	        _angular_core.Output(), 
	        __metadata$22('design:type', rxjs_Observable.Observable)
	    ], MdSlideToggle.prototype, "change", void 0);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', Object)
	    ], MdSlideToggle.prototype, "checked", null);
	    __decorate$22([
	        _angular_core.Input(), 
	        __metadata$22('design:type', String)
	    ], MdSlideToggle.prototype, "color", null);
	    MdSlideToggle = __decorate$22([
	        _angular_core.Component({selector: 'md-slide-toggle',
	            host: {
	                '[class.md-checked]': 'checked',
	                '[class.md-disabled]': 'disabled',
	                // This md-slide-toggle prefix will change, once the temporary ripple is removed.
	                '[class.md-slide-toggle-focused]': '_hasFocus',
	                '(mousedown)': '_setMousedown()'
	            },
	            template: "<label class=\"md-slide-toggle-label\"> <div class=\"md-slide-toggle-container\"> <div class=\"md-slide-toggle-bar\"></div> <div class=\"md-slide-toggle-thumb-container\" (slidestart)=\"_onDragStart()\" (slide)=\"_onDrag($event)\" (slideend)=\"_onDragEnd()\"> <div class=\"md-slide-toggle-thumb\"> <div class=\"md-ink-ripple\"></div> </div> </div> <input #input class=\"md-slide-toggle-input md-visually-hidden\" type=\"checkbox\" [id]=\"getInputId()\" [required]=\"required\" [tabIndex]=\"tabIndex\" [checked]=\"checked\" [disabled]=\"disabled\" [attr.name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (blur)=\"_onInputBlur()\" (focus)=\"_onInputFocus()\" (change)=\"_onChangeEvent($event)\" (click)=\"_onInputClick($event)\"> </div> <span class=\"md-slide-toggle-content\"> <ng-content></ng-content> </span> </label> ",
	            styles: [":host { display: flex; height: 24px; margin: 16px 0; line-height: 24px; white-space: nowrap; user-select: none; outline: none; } :host.md-checked .md-slide-toggle-thumb-container { transform: translate3d(100%, 0, 0); } :host .md-ink-ripple { border-radius: 50%; opacity: 0; height: 48px; left: 50%; overflow: hidden; pointer-events: none; position: absolute; top: 50%; transform: translate(-50%, -50%); transition: opacity ease 280ms, background-color ease 280ms; width: 48px; } :host.md-slide-toggle-focused .md-ink-ripple { opacity: 1; } :host.md-slide-toggle-disabled .md-ink-ripple { background-color: #000; } :host.md-disabled .md-slide-toggle-label, :host.md-disabled .md-slide-toggle-container { cursor: default; } .md-slide-toggle-content { font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; } .md-slide-toggle-label { display: flex; flex: 1; cursor: pointer; } .md-slide-toggle-container { cursor: grab; width: 36px; height: 24px; position: relative; user-select: none; margin-right: 8px; } .md-slide-toggle-thumb-container { position: absolute; top: 2px; left: 0; z-index: 1; width: 16px; transform: translate3d(0, 0, 0); transition: all 80ms linear; transition-property: transform; } .md-slide-toggle-thumb-container.md-dragging { transition-duration: 0ms; } .md-slide-toggle-thumb { position: absolute; margin: 0; left: 0; top: 0; height: 20px; width: 20px; border-radius: 50%; box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); } .md-slide-toggle-bar { position: absolute; left: 1px; top: 5px; width: 34px; height: 14px; border-radius: 8px; } .md-slide-toggle-input { bottom: 0; left: 10px; } .md-slide-toggle-bar, .md-slide-toggle-thumb { transition: all 80ms linear; transition-property: background-color; transition-delay: 50ms; } /*# sourceMappingURL=slide-toggle.css.map */ "],
	            providers: [MD_SLIDE_TOGGLE_VALUE_ACCESSOR],
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata$22('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdSlideToggle);
	    return MdSlideToggle;
	}());
	/**
	 * Renderer for the Slide Toggle component, which separates DOM modification in its own class
	 */
	var SlideToggleRenderer = (function () {
	    function SlideToggleRenderer(_elementRef) {
	        this._elementRef = _elementRef;
	        this._thumbEl = _elementRef.nativeElement.querySelector('.md-slide-toggle-thumb-container');
	        this._thumbBarEl = _elementRef.nativeElement.querySelector('.md-slide-toggle-bar');
	    }
	    /** Whether the slide-toggle is currently dragging. */
	    SlideToggleRenderer.prototype.isDragging = function () {
	        return !!this._thumbBarWidth;
	    };
	    /** Initializes the drag of the slide-toggle. */
	    SlideToggleRenderer.prototype.startThumbDrag = function (checked) {
	        if (!this._thumbBarWidth) {
	            this._thumbBarWidth = this._thumbBarEl.clientWidth - this._thumbEl.clientWidth;
	            this._checked = checked;
	            this._thumbEl.classList.add('md-dragging');
	        }
	    };
	    /** Stops the current drag and returns the new checked value. */
	    SlideToggleRenderer.prototype.stopThumbDrag = function () {
	        if (this._thumbBarWidth) {
	            this._thumbBarWidth = null;
	            this._thumbEl.classList.remove('md-dragging');
	            applyCssTransform(this._thumbEl, '');
	            return this._percentage > 50;
	        }
	    };
	    /** Updates the thumb containers position from the specified distance. */
	    SlideToggleRenderer.prototype.updateThumbPosition = function (distance) {
	        if (this._thumbBarWidth) {
	            this._percentage = this._getThumbPercentage(distance);
	            applyCssTransform(this._thumbEl, "translate3d(" + this._percentage + "%, 0, 0)");
	        }
	    };
	    /** Retrieves the percentage of thumb from the moved distance. */
	    SlideToggleRenderer.prototype._getThumbPercentage = function (distance) {
	        var percentage = (distance / this._thumbBarWidth) * 100;
	        // When the toggle was initially checked, then we have to start the drag at the end.
	        if (this._checked) {
	            percentage += 100;
	        }
	        return Math.max(0, Math.min(percentage, 100));
	    };
	    return SlideToggleRenderer;
	}());
	var MdSlideToggleModule = (function () {
	    function MdSlideToggleModule() {
	    }
	    MdSlideToggleModule.forRoot = function () {
	        return {
	            ngModule: MdSlideToggleModule,
	            providers: [{ provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig }]
	        };
	    };
	    MdSlideToggleModule = __decorate$22([
	        _angular_core.NgModule({
	            imports: [_angular_forms.FormsModule],
	            exports: [MdSlideToggle],
	            declarations: [MdSlideToggle],
	        }), 
	        __metadata$22('design:paramtypes', [])
	    ], MdSlideToggleModule);
	    return MdSlideToggleModule;
	}());
	
	var __decorate$23 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$23 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
	 * the default separation we chose.
	 */
	var MIN_AUTO_TICK_SEPARATION = 30;
	/**
	 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
	 * This allows it to support [(ngModel)] and [formControl].
	 */
	var MD_SLIDER_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdSlider; }),
	    multi: true
	};
	var MdSlider = (function () {
	    function MdSlider(elementRef) {
	        /** A renderer to handle updating the slider's thumb and fill track. */
	        this._renderer = null;
	        /** The dimensions of the slider. */
	        this._sliderDimensions = null;
	        this.disabled = false;
	        /** Whether or not to show the thumb label. */
	        this.thumbLabel = false;
	        /** The miniumum value that the slider can have. */
	        this._min = 0;
	        /** The maximum value that the slider can have. */
	        this._max = 100;
	        /** The percentage of the slider that coincides with the value. */
	        this._percent = 0;
	        this._controlValueAccessorChangeFn = function (value) { };
	        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
	        this.onTouched = function () { };
	        /** The values at which the thumb will snap. */
	        this.step = 1;
	        /**
	         * Whether or not the thumb is sliding.
	         * Used to determine if there should be a transition for the thumb and fill track.
	         * TODO: internal
	         */
	        this.isSliding = false;
	        /**
	         * Whether or not the slider is active (clicked or sliding).
	         * Used to shrink and grow the thumb as according to the Material Design spec.
	         * TODO: internal
	         */
	        this.isActive = false;
	        /** Indicator for if the value has been set or not. */
	        this._isInitialized = false;
	        /** Value of the slider. */
	        this._value = 0;
	        this._renderer = new SliderRenderer(elementRef);
	    }
	    Object.defineProperty(MdSlider.prototype, "min", {
	        get: function () {
	            return this._min;
	        },
	        set: function (v) {
	            // This has to be forced as a number to handle the math later.
	            this._min = Number(v);
	            // If the value wasn't explicitly set by the user, set it to the min.
	            if (!this._isInitialized) {
	                this.value = this._min;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSlider.prototype, "max", {
	        get: function () {
	            return this._max;
	        },
	        set: function (v) {
	            this._max = Number(v);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSlider.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (v) {
	            // Only set the value to a valid number. v is casted to an any as we know it will come in as a
	            // string but it is labeled as a number which causes parseFloat to not accept it.
	            if (isNaN(parseFloat(v))) {
	                return;
	            }
	            this._value = Number(v);
	            this._isInitialized = true;
	            this._controlValueAccessorChangeFn(this._value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Once the slider has rendered, grab the dimensions and update the position of the thumb and
	     * fill track.
	     * TODO: internal
	     */
	    MdSlider.prototype.ngAfterContentInit = function () {
	        this._sliderDimensions = this._renderer.getSliderDimensions();
	        // This needs to be called after content init because the value can be set to the min if the
	        // value itself isn't set. If this happens, the control value accessor needs to be updated.
	        this._controlValueAccessorChangeFn(this.value);
	        this.snapThumbToValue();
	        this._updateTickSeparation();
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onClick = function (event) {
	        if (this.disabled) {
	            return;
	        }
	        this.isActive = true;
	        this.isSliding = false;
	        this._renderer.addFocus();
	        this.updateValueFromPosition(event.clientX);
	        this.snapThumbToValue();
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onSlide = function (event) {
	        if (this.disabled) {
	            return;
	        }
	        // Prevent the slide from selecting anything else.
	        event.preventDefault();
	        this.updateValueFromPosition(event.center.x);
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onSlideStart = function (event) {
	        if (this.disabled) {
	            return;
	        }
	        event.preventDefault();
	        this.isSliding = true;
	        this.isActive = true;
	        this._renderer.addFocus();
	        this.updateValueFromPosition(event.center.x);
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onSlideEnd = function () {
	        this.isSliding = false;
	        this.snapThumbToValue();
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onResize = function () {
	        this.isSliding = true;
	        this._sliderDimensions = this._renderer.getSliderDimensions();
	        // Skip updating the value and position as there is no new placement.
	        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
	    };
	    /** TODO: internal */
	    MdSlider.prototype.onBlur = function () {
	        this.isActive = false;
	        this.onTouched();
	    };
	    /**
	     * When the value changes without a physical position, the percentage needs to be recalculated
	     * independent of the physical location.
	     * This is also used to move the thumb to a snapped value once sliding is done.
	     */
	    MdSlider.prototype.updatePercentFromValue = function () {
	        this._percent = this.calculatePercentage(this.value);
	    };
	    /**
	     * Calculate the new value from the new physical location. The value will always be snapped.
	     */
	    MdSlider.prototype.updateValueFromPosition = function (pos) {
	        var offset = this._sliderDimensions.left;
	        var size = this._sliderDimensions.width;
	        // The exact value is calculated from the event and used to find the closest snap value.
	        this._percent = this.clamp((pos - offset) / size);
	        var exactValue = this.calculateValue(this._percent);
	        // This calculation finds the closest step by finding the closest whole number divisible by the
	        // step relative to the min.
	        var closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
	        // The value needs to snap to the min and max.
	        this.value = this.clamp(closestValue, this.min, this.max);
	        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
	    };
	    /**
	     * Snaps the thumb to the current value.
	     * Called after a click or drag event is over.
	     */
	    MdSlider.prototype.snapThumbToValue = function () {
	        this.updatePercentFromValue();
	        this._renderer.updateThumbAndFillPosition(this._percent, this._sliderDimensions.width);
	    };
	    /**
	     * Calculates the separation in pixels of tick marks. If there is no tick interval or the interval
	     * is set to something other than a number or 'auto', nothing happens.
	     */
	    MdSlider.prototype._updateTickSeparation = function () {
	        if (this._tickInterval == 'auto') {
	            this._updateAutoTickSeparation();
	        }
	        else if (Number(this._tickInterval)) {
	            this._updateTickSeparationFromInterval();
	        }
	    };
	    /**
	     * Calculates the optimal separation in pixels of tick marks based on the minimum auto tick
	     * separation constant.
	     */
	    MdSlider.prototype._updateAutoTickSeparation = function () {
	        // We're looking for the multiple of step for which the separation between is greater than the
	        // minimum tick separation.
	        var sliderWidth = this._sliderDimensions.width;
	        // This is the total "width" of the slider in terms of values.
	        var valueWidth = this.max - this.min;
	        // Calculate how many values exist within 1px on the slider.
	        var valuePerPixel = valueWidth / sliderWidth;
	        // Calculate how many values exist in the minimum tick separation (px).
	        var valuePerSeparation = valuePerPixel * MIN_AUTO_TICK_SEPARATION;
	        // Calculate how many steps exist in this separation. This will be the lowest value you can
	        // multiply step by to get a separation that is greater than or equal to the minimum tick
	        // separation.
	        var stepsPerSeparation = Math.ceil(valuePerSeparation / this.step);
	        // Get the percentage of the slider for which this tick would be located so we can then draw
	        // it on the slider.
	        var tickPercentage = this.calculatePercentage((this.step * stepsPerSeparation) + this.min);
	        // The pixel value of the tick is the percentage * the width of the slider. Use this to draw
	        // the ticks on the slider.
	        this._renderer.drawTicks(sliderWidth * tickPercentage);
	    };
	    /**
	     * Calculates the separation of tick marks by finding the pixel value of the tickInterval.
	     */
	    MdSlider.prototype._updateTickSeparationFromInterval = function () {
	        // Force tickInterval to be a number so it can be used in calculations.
	        var interval = this._tickInterval;
	        // Calculate the first value a tick will be located at by getting the step at which the interval
	        // lands and adding that to the min.
	        var tickValue = (this.step * interval) + this.min;
	        // The percentage of the step on the slider is needed in order to calculate the pixel offset
	        // from the beginning of the slider. This offset is the tick separation.
	        var tickPercentage = this.calculatePercentage(tickValue);
	        this._renderer.drawTicks(this._sliderDimensions.width * tickPercentage);
	    };
	    /**
	     * Calculates the percentage of the slider that a value is.
	     */
	    MdSlider.prototype.calculatePercentage = function (value) {
	        return (value - this.min) / (this.max - this.min);
	    };
	    /**
	     * Calculates the value a percentage of the slider corresponds to.
	     */
	    MdSlider.prototype.calculateValue = function (percentage) {
	        return this.min + (percentage * (this.max - this.min));
	    };
	    /**
	     * Return a number between two numbers.
	     */
	    MdSlider.prototype.clamp = function (value, min, max) {
	        if (min === void 0) { min = 0; }
	        if (max === void 0) { max = 1; }
	        return Math.max(min, Math.min(value, max));
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlider.prototype.writeValue = function (value) {
	        this.value = value;
	        if (this._sliderDimensions) {
	            this.snapThumbToValue();
	        }
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlider.prototype.registerOnChange = function (fn) {
	        this._controlValueAccessorChangeFn = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdSlider.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate$23([
	        _angular_core.Input(),
	        BooleanFieldValue(),
	        _angular_core.HostBinding('class.md-slider-disabled'),
	        _angular_core.HostBinding('attr.aria-disabled'), 
	        __metadata$23('design:type', Boolean)
	    ], MdSlider.prototype, "disabled", void 0);
	    __decorate$23([
	        _angular_core.Input('thumb-label'),
	        BooleanFieldValue(), 
	        __metadata$23('design:type', Boolean)
	    ], MdSlider.prototype, "thumbLabel", void 0);
	    __decorate$23([
	        _angular_core.Input(), 
	        __metadata$23('design:type', Number)
	    ], MdSlider.prototype, "step", void 0);
	    __decorate$23([
	        _angular_core.Input('tick-interval'), 
	        __metadata$23('design:type', Object)
	    ], MdSlider.prototype, "_tickInterval", void 0);
	    __decorate$23([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.aria-valuemin'), 
	        __metadata$23('design:type', Object)
	    ], MdSlider.prototype, "min", null);
	    __decorate$23([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.aria-valuemax'), 
	        __metadata$23('design:type', Object)
	    ], MdSlider.prototype, "max", null);
	    __decorate$23([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.aria-valuenow'), 
	        __metadata$23('design:type', Object)
	    ], MdSlider.prototype, "value", null);
	    MdSlider = __decorate$23([
	        _angular_core.Component({selector: 'md-slider',
	            providers: [MD_SLIDER_VALUE_ACCESSOR],
	            host: {
	                'tabindex': '0',
	                '(click)': 'onClick($event)',
	                '(slide)': 'onSlide($event)',
	                '(slidestart)': 'onSlideStart($event)',
	                '(slideend)': 'onSlideEnd()',
	                '(window:resize)': 'onResize()',
	                '(blur)': 'onBlur()',
	            },
	            template: "<div class=\"md-slider-wrapper\"> <div class=\"md-slider-container\" [class.md-slider-sliding]=\"isSliding\" [class.md-slider-active]=\"isActive\" [class.md-slider-thumb-label-showing]=\"thumbLabel\"> <div class=\"md-slider-track-container\"> <div class=\"md-slider-track\"></div> <div class=\"md-slider-track md-slider-track-fill\"></div> <div class=\"md-slider-tick-container\"></div> <div class=\"md-slider-last-tick-container\"></div> </div> <div class=\"md-slider-thumb-container\"> <div class=\"md-slider-thumb-position\"> <div class=\"md-slider-thumb\"></div> <div class=\"md-slider-thumb-label\"> <span class=\"md-slider-thumb-label-text\">{{value}}</span> </div> </div> </div> </div> </div> ",
	            styles: ["md-slider { height: 48px; min-width: 128px; position: relative; padding: 0; display: inline-block; outline: none; vertical-align: middle; } md-slider *, md-slider *::after { box-sizing: border-box; } .md-slider-wrapper { width: 100%; height: 100%; padding-left: 8px; padding-right: 8px; } .md-slider-container { position: relative; } .md-slider-track-container { width: 100%; position: absolute; top: 23px; height: 2px; } .md-slider-track { position: absolute; left: 0; right: 0; height: 100%; } .md-slider-track-fill { transition-duration: 400ms; transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); transition-property: width, height; } .md-slider-tick-container, .md-slider-last-tick-container { position: absolute; left: 0; right: 0; height: 100%; } .md-slider-thumb-container { position: absolute; left: 0; top: 50%; transform: translate3d(-50%, -50%, 0); transition-duration: 400ms; transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); transition-property: left, bottom; } .md-slider-thumb-position { transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-thumb { z-index: 1; position: absolute; top: 14px; left: -10px; width: 20px; height: 20px; border-radius: 20px; transform: scale(0.7); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-slider-thumb::after { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 20px; border-width: 3px; border-style: solid; transition: inherit; } .md-slider-thumb-label { display: flex; align-items: center; justify-content: center; position: absolute; left: -14px; top: -17px; width: 28px; height: 28px; border-radius: 50%; transform: scale(0.4) translate3d(0, 67.5px, 0) rotate(45deg); transition: 300ms cubic-bezier(0.35, 0, 0.25, 1); transition-property: transform, border-radius; } .md-slider-thumb-label-text { z-index: 1; font-size: 12px; font-weight: bold; opacity: 0; transform: rotate(-45deg); transition: opacity 300ms cubic-bezier(0.35, 0, 0.25, 1); } .md-slider-container:not(.md-slider-thumb-label-showing) .md-slider-thumb-label { display: none; } .md-slider-active.md-slider-thumb-label-showing .md-slider-thumb { transform: scale(0); } .md-slider-sliding .md-slider-thumb-position, .md-slider-sliding .md-slider-track-fill { transition: none; cursor: default; } .md-slider-active .md-slider-thumb { transform: scale(1); } .md-slider-active .md-slider-thumb-label { border-radius: 50% 50% 0; transform: rotate(45deg); } .md-slider-active .md-slider-thumb-label-text { opacity: 1; } /*# sourceMappingURL=slider.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$23('design:paramtypes', [_angular_core.ElementRef])
	    ], MdSlider);
	    return MdSlider;
	}());
	/**
	 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
	 */
	var SliderRenderer = (function () {
	    function SliderRenderer(elementRef) {
	        this._sliderElement = elementRef.nativeElement;
	    }
	    /**
	     * Get the bounding client rect of the slider track element.
	     * The track is used rather than the native element to ignore the extra space that the thumb can
	     * take up.
	     */
	    SliderRenderer.prototype.getSliderDimensions = function () {
	        var trackElement = this._sliderElement.querySelector('.md-slider-track');
	        return trackElement.getBoundingClientRect();
	    };
	    /**
	     * Update the physical position of the thumb and fill track on the slider.
	     */
	    SliderRenderer.prototype.updateThumbAndFillPosition = function (percent, width) {
	        // A container element that is used to avoid overwriting the transform on the thumb itself.
	        var thumbPositionElement = this._sliderElement.querySelector('.md-slider-thumb-position');
	        var fillTrackElement = this._sliderElement.querySelector('.md-slider-track-fill');
	        var position = Math.round(percent * width);
	        fillTrackElement.style.width = position + "px";
	        applyCssTransform(thumbPositionElement, "translateX(" + position + "px)");
	    };
	    /**
	     * Focuses the native element.
	     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
	     */
	    SliderRenderer.prototype.addFocus = function () {
	        this._sliderElement.focus();
	    };
	    /**
	     * Draws ticks onto the tick container.
	     */
	    SliderRenderer.prototype.drawTicks = function (tickSeparation) {
	        var tickContainer = this._sliderElement.querySelector('.md-slider-tick-container');
	        var tickContainerWidth = tickContainer.getBoundingClientRect().width;
	        // An extra element for the last tick is needed because the linear gradient cannot be told to
	        // always draw a tick at the end of the gradient. To get around this, there is a second
	        // container for ticks that has a single tick mark on the very right edge.
	        var lastTickContainer = this._sliderElement.querySelector('.md-slider-last-tick-container');
	        // Subtract 1 from the tick separation to center the tick.
	        // TODO: Evaluate the rendering performance of using repeating background gradients.
	        tickContainer.style.background = "repeating-linear-gradient(to right, black, black 2px, " +
	            ("transparent 2px, transparent " + (tickSeparation - 1) + "px)");
	        // Add a tick to the very end by starting on the right side and adding a 2px black line.
	        lastTickContainer.style.background = "linear-gradient(to left, black, black 2px, transparent " +
	            "2px, transparent)";
	        // If the second to last tick is too close (a separation of less than half the normal
	        // separation), don't show it by decreasing the width of the tick container element.
	        if (tickContainerWidth % tickSeparation < (tickSeparation / 2)) {
	            tickContainer.style.width = tickContainerWidth - tickSeparation + 'px';
	        }
	    };
	    return SliderRenderer;
	}());
	var MdSliderModule = (function () {
	    function MdSliderModule() {
	    }
	    MdSliderModule.forRoot = function () {
	        return {
	            ngModule: MdSliderModule,
	            providers: [{ provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig }]
	        };
	    };
	    MdSliderModule = __decorate$23([
	        _angular_core.NgModule({
	            imports: [_angular_forms.FormsModule],
	            exports: [MdSlider],
	            declarations: [MdSlider],
	            providers: [
	                { provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig },
	            ],
	        }), 
	        __metadata$23('design:paramtypes', [])
	    ], MdSliderModule);
	    return MdSliderModule;
	}());
	
	var __extends$7 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$24 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$24 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	/** Exception thrown when two MdSidenav are matching the same side. */
	var MdDuplicatedSidenavError = (function (_super) {
	    __extends$7(MdDuplicatedSidenavError, _super);
	    function MdDuplicatedSidenavError(align) {
	        _super.call(this, "A sidenav was already declared for 'align=\"" + align + "\"'");
	    }
	    return MdDuplicatedSidenavError;
	}(MdError));
	/**
	 * <md-sidenav> component.
	 *
	 * This component corresponds to the drawer of the sidenav.
	 *
	 * Please refer to README.md for examples on how to use it.
	 */
	var MdSidenav = (function () {
	    /**
	     * @param _elementRef The DOM element reference. Used for transition and width calculation.
	     *     If not available we do not hook on transitions.
	     */
	    function MdSidenav(_elementRef) {
	        this._elementRef = _elementRef;
	        /** Alignment of the sidenav (direction neutral); whether 'start' or 'end'. */
	        this.align = 'start';
	        /** Mode of the sidenav; whether 'over' or 'side'. */
	        this.mode = 'over';
	        /** Whether the sidenav is opened. */
	        this._opened = false;
	        /** Event emitted when the sidenav is being opened. Use this to synchronize animations. */
	        this.onOpenStart = new _angular_core.EventEmitter();
	        /** Event emitted when the sidenav is fully opened. */
	        this.onOpen = new _angular_core.EventEmitter();
	        /** Event emitted when the sidenav is being closed. Use this to synchronize animations. */
	        this.onCloseStart = new _angular_core.EventEmitter();
	        /** Event emitted when the sidenav is fully closed. */
	        this.onClose = new _angular_core.EventEmitter();
	        this._transition = false;
	    }
	    Object.defineProperty(MdSidenav.prototype, "opened", {
	        /**
	         * Whether the sidenav is opened. We overload this because we trigger an event when it
	         * starts or end.
	         */
	        get: function () { return this._opened; },
	        set: function (v) {
	            // TODO(jelbourn): this coercion goes away when BooleanFieldValue is removed.
	            var booleanValue = v != null && "" + v !== 'false';
	            this.toggle(booleanValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Open this sidenav, and return a Promise that will resolve when it's fully opened (or get
	     * rejected if it didn't). */
	    MdSidenav.prototype.open = function () {
	        return this.toggle(true);
	    };
	    /**
	     * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get
	     * rejected if it didn't).
	     */
	    MdSidenav.prototype.close = function () {
	        return this.toggle(false);
	    };
	    /**
	     * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or
	     * close() when it's closed.
	     * @param isOpen
	     */
	    MdSidenav.prototype.toggle = function (isOpen) {
	        var _this = this;
	        if (isOpen === void 0) { isOpen = !this.opened; }
	        // Shortcut it if we're already opened.
	        if (isOpen === this.opened) {
	            if (!this._transition) {
	                return Promise.resolve(null);
	            }
	            else {
	                return isOpen ? this._openPromise : this._closePromise;
	            }
	        }
	        this._opened = isOpen;
	        this._transition = true;
	        if (isOpen) {
	            this.onOpenStart.emit(null);
	        }
	        else {
	            this.onCloseStart.emit(null);
	        }
	        if (isOpen) {
	            if (this._openPromise == null) {
	                this._openPromise = new Promise(function (resolve, reject) {
	                    _this._openPromiseResolve = resolve;
	                    _this._openPromiseReject = reject;
	                });
	            }
	            return this._openPromise;
	        }
	        else {
	            if (this._closePromise == null) {
	                this._closePromise = new Promise(function (resolve, reject) {
	                    _this._closePromiseResolve = resolve;
	                    _this._closePromiseReject = reject;
	                });
	            }
	            return this._closePromise;
	        }
	    };
	    /**
	     * When transition has finished, set the internal state for classes and emit the proper event.
	     * The event passed is actually of type TransitionEvent, but that type is not available in
	     * Android so we use any.
	     */
	    MdSidenav.prototype._onTransitionEnd = function (transitionEvent) {
	        if (transitionEvent.target == this._elementRef.nativeElement
	            && transitionEvent.propertyName.endsWith('transform')) {
	            this._transition = false;
	            if (this._opened) {
	                if (this._openPromise != null) {
	                    this._openPromiseResolve();
	                }
	                if (this._closePromise != null) {
	                    this._closePromiseReject();
	                }
	                this.onOpen.emit(null);
	            }
	            else {
	                if (this._closePromise != null) {
	                    this._closePromiseResolve();
	                }
	                if (this._openPromise != null) {
	                    this._openPromiseReject();
	                }
	                this.onClose.emit(null);
	            }
	            this._openPromise = null;
	            this._closePromise = null;
	        }
	    };
	    Object.defineProperty(MdSidenav.prototype, "_isClosing", {
	        get: function () {
	            return !this._opened && this._transition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_isOpening", {
	        get: function () {
	            return this._opened && this._transition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_isClosed", {
	        get: function () {
	            return !this._opened && !this._transition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_isOpened", {
	        get: function () {
	            return this._opened && !this._transition;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_isEnd", {
	        get: function () {
	            return this.align == 'end';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_modeSide", {
	        get: function () {
	            return this.mode == 'side';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_modeOver", {
	        get: function () {
	            return this.mode == 'over';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_modePush", {
	        get: function () {
	            return this.mode == 'push';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenav.prototype, "_width", {
	        /** TODO: internal (needed by MdSidenavLayout). */
	        get: function () {
	            if (this._elementRef.nativeElement) {
	                return this._elementRef.nativeElement.offsetWidth;
	            }
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate$24([
	        _angular_core.Input(), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "align", void 0);
	    __decorate$24([
	        _angular_core.Input(), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "mode", void 0);
	    __decorate$24([
	        _angular_core.Output('open-start'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "onOpenStart", void 0);
	    __decorate$24([
	        _angular_core.Output('open'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "onOpen", void 0);
	    __decorate$24([
	        _angular_core.Output('close-start'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "onCloseStart", void 0);
	    __decorate$24([
	        _angular_core.Output('close'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "onClose", void 0);
	    __decorate$24([
	        _angular_core.Input(), 
	        __metadata$24('design:type', Boolean)
	    ], MdSidenav.prototype, "opened", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-closing'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_isClosing", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-opening'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_isOpening", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-closed'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_isClosed", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-opened'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_isOpened", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-end'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_isEnd", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-side'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_modeSide", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-over'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_modeOver", null);
	    __decorate$24([
	        _angular_core.HostBinding('class.md-sidenav-push'), 
	        __metadata$24('design:type', Object)
	    ], MdSidenav.prototype, "_modePush", null);
	    MdSidenav = __decorate$24([
	        _angular_core.Component({selector: 'md-sidenav',
	            template: '<ng-content></ng-content>',
	            host: {
	                '(transitionend)': '_onTransitionEnd($event)',
	                // must prevent the browser from aligning text based on value
	                '[attr.align]': 'null'
	            },
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$24('design:paramtypes', [_angular_core.ElementRef])
	    ], MdSidenav);
	    return MdSidenav;
	}());
	/**
	 * <md-sidenav-layout> component.
	 *
	 * This is the parent component to one or two <md-sidenav>s that validates the state internally
	 * and coordinate the backdrop and content styling.
	 */
	var MdSidenavLayout = (function () {
	    function MdSidenavLayout(_dir, _element, _renderer) {
	        var _this = this;
	        this._dir = _dir;
	        this._element = _element;
	        this._renderer = _renderer;
	        // If a `Dir` directive exists up the tree, listen direction changes and update the left/right
	        // properties to point to the proper start/end.
	        if (_dir != null) {
	            _dir.dirChange.subscribe(function () { return _this._validateDrawers(); });
	        }
	    }
	    Object.defineProperty(MdSidenavLayout.prototype, "start", {
	        get: function () { return this._start; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSidenavLayout.prototype, "end", {
	        get: function () { return this._end; },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    MdSidenavLayout.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        // On changes, assert on consistency.
	        this._sidenavs.changes.subscribe(function () { return _this._validateDrawers(); });
	        this._sidenavs.forEach(function (sidenav) { return _this._watchSidenavToggle(sidenav); });
	        this._validateDrawers();
	    };
	    /*
	    * Subscribes to sidenav events in order to set a class on the main layout element when the sidenav
	    * is open and the backdrop is visible. This ensures any overflow on the layout element is properly
	    * hidden.
	    */
	    MdSidenavLayout.prototype._watchSidenavToggle = function (sidenav) {
	        var _this = this;
	        if (!sidenav || sidenav.mode === 'side') {
	            return;
	        }
	        sidenav.onOpen.subscribe(function () { return _this._setLayoutClass(sidenav, true); });
	        sidenav.onClose.subscribe(function () { return _this._setLayoutClass(sidenav, false); });
	    };
	    /* Toggles the 'md-sidenav-opened' class on the main 'md-sidenav-layout' element. */
	    MdSidenavLayout.prototype._setLayoutClass = function (sidenav, bool) {
	        this._renderer.setElementClass(this._element.nativeElement, 'md-sidenav-opened', bool);
	    };
	    /** Validate the state of the sidenav children components. */
	    MdSidenavLayout.prototype._validateDrawers = function () {
	        var _this = this;
	        this._start = this._end = null;
	        // Ensure that we have at most one start and one end sidenav.
	        this._sidenavs.forEach(function (sidenav) {
	            if (sidenav.align == 'end') {
	                if (_this._end != null) {
	                    throw new MdDuplicatedSidenavError('end');
	                }
	                _this._end = sidenav;
	            }
	            else {
	                if (_this._start != null) {
	                    throw new MdDuplicatedSidenavError('start');
	                }
	                _this._start = sidenav;
	            }
	        });
	        this._right = this._left = null;
	        // Detect if we're LTR or RTL.
	        if (this._dir == null || this._dir.value == 'ltr') {
	            this._left = this._start;
	            this._right = this._end;
	        }
	        else {
	            this._left = this._end;
	            this._right = this._start;
	        }
	    };
	    MdSidenavLayout.prototype._closeModalSidenav = function () {
	        if (this._start != null && this._start.mode != 'side') {
	            this._start.close();
	        }
	        if (this._end != null && this._end.mode != 'side') {
	            this._end.close();
	        }
	    };
	    MdSidenavLayout.prototype._isShowingBackdrop = function () {
	        return (this._isSidenavOpen(this._start) && this._start.mode != 'side')
	            || (this._isSidenavOpen(this._end) && this._end.mode != 'side');
	    };
	    MdSidenavLayout.prototype._isSidenavOpen = function (side) {
	        return side != null && side.opened;
	    };
	    /**
	     * Return the width of the sidenav, if it's in the proper mode and opened.
	     * This may relayout the view, so do not call this often.
	     * @param sidenav
	     * @param mode
	     */
	    MdSidenavLayout.prototype._getSidenavEffectiveWidth = function (sidenav, mode) {
	        return (this._isSidenavOpen(sidenav) && sidenav.mode == mode) ? sidenav._width : 0;
	    };
	    MdSidenavLayout.prototype._getMarginLeft = function () {
	        return this._getSidenavEffectiveWidth(this._left, 'side');
	    };
	    MdSidenavLayout.prototype._getMarginRight = function () {
	        return this._getSidenavEffectiveWidth(this._right, 'side');
	    };
	    MdSidenavLayout.prototype._getPositionLeft = function () {
	        return this._getSidenavEffectiveWidth(this._left, 'push');
	    };
	    MdSidenavLayout.prototype._getPositionRight = function () {
	        return this._getSidenavEffectiveWidth(this._right, 'push');
	    };
	    /**
	     * Returns the horizontal offset for the content area.  There should never be a value for both
	     * left and right, so by subtracting the right value from the left value, we should always get
	     * the appropriate offset.
	     */
	    MdSidenavLayout.prototype._getPositionOffset = function () {
	        return this._getPositionLeft() - this._getPositionRight();
	    };
	    /**
	     * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
	     * doesn't seem to work right now.
	     */
	    MdSidenavLayout.prototype._getStyles = function () {
	        return {
	            marginLeft: this._getMarginLeft() + "px",
	            marginRight: this._getMarginRight() + "px",
	            transform: "translate3d(" + this._getPositionOffset() + "px, 0, 0)"
	        };
	    };
	    __decorate$24([
	        _angular_core.ContentChildren(MdSidenav), 
	        __metadata$24('design:type', _angular_core.QueryList)
	    ], MdSidenavLayout.prototype, "_sidenavs", void 0);
	    MdSidenavLayout = __decorate$24([
	        _angular_core.Component({selector: 'md-sidenav-layout',
	            // Do not use ChangeDetectionStrategy.OnPush. It does not work for this component because
	            // technically it is a sibling of MdSidenav (on the content tree) and isn't updated when MdSidenav
	            // changes its state.
	            template: "<div class=\"md-sidenav-backdrop\" (click)=\"_closeModalSidenav()\" [class.md-sidenav-shown]=\"_isShowingBackdrop()\"></div> <ng-content select=\"md-sidenav\"></ng-content> <div class=\"md-sidenav-content\" [ngStyle]=\"_getStyles()\"> <ng-content></ng-content> </div> ",
	            styles: ["md-sidenav-layout { position: relative; transform: translate3d(0, 0, 0); box-sizing: border-box; -webkit-overflow-scrolling: touch; display: block; overflow: hidden; } md-sidenav-layout[fullscreen] { position: fixed; top: 0; left: 0; right: 0; bottom: 0; } md-sidenav-layout[fullscreen].md-sidenav-opened { overflow: hidden; } .md-sidenav-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: block; z-index: 2; visibility: hidden; } .md-sidenav-backdrop.md-sidenav-shown { visibility: visible; } .md-sidenav-content { position: relative; transform: translate3d(0, 0, 0); display: block; height: 100%; overflow: auto; } md-sidenav { position: relative; transform: translate3d(0, 0, 0); display: block; position: absolute; top: 0; bottom: 0; z-index: 3; min-width: 5%; overflow-y: auto; transform: translate3d(-100%, 0, 0); } md-sidenav.md-sidenav-closed { visibility: hidden; } md-sidenav.md-sidenav-closing { transform: translate3d(-100%, 0, 0); will-change: transform; } md-sidenav.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } md-sidenav.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } md-sidenav.md-sidenav-side { z-index: 1; } md-sidenav.md-sidenav-end { right: 0; transform: translate3d(100%, 0, 0); } md-sidenav.md-sidenav-end.md-sidenav-closed { visibility: hidden; } md-sidenav.md-sidenav-end.md-sidenav-closing { transform: translate3d(100%, 0, 0); will-change: transform; } md-sidenav.md-sidenav-end.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } md-sidenav.md-sidenav-end.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } [dir='rtl'] md-sidenav { transform: translate3d(100%, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-closed { visibility: hidden; } [dir='rtl'] md-sidenav.md-sidenav-closing { transform: translate3d(100%, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-end { left: 0; right: auto; transform: translate3d(-100%, 0, 0); } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-closed { visibility: hidden; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-closing { transform: translate3d(-100%, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-opening { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); visibility: visible; transform: translate3d(0, 0, 0); will-change: transform; } [dir='rtl'] md-sidenav.md-sidenav-end.md-sidenav-opened { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transform: translate3d(0, 0, 0); } /*# sourceMappingURL=sidenav.css.map */ ",
	"md-sidenav { transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-sidenav-content { transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-sidenav-backdrop.md-sidenav-shown { transition: background-color 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } /*# sourceMappingURL=sidenav-transitions.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }),
	        __param$3(0, _angular_core.Optional()), 
	        __metadata$24('design:paramtypes', [Dir, _angular_core.ElementRef, _angular_core.Renderer])
	    ], MdSidenavLayout);
	    return MdSidenavLayout;
	}());
	var MdSidenavModule = (function () {
	    function MdSidenavModule() {
	    }
	    MdSidenavModule.forRoot = function () {
	        return {
	            ngModule: MdSidenavModule,
	            providers: []
	        };
	    };
	    MdSidenavModule = __decorate$24([
	        _angular_core.NgModule({
	            imports: [_angular_common.CommonModule],
	            exports: [MdSidenavLayout, MdSidenav],
	            declarations: [MdSidenavLayout, MdSidenav],
	        }), 
	        __metadata$24('design:paramtypes', [])
	    ], MdSidenavModule);
	    return MdSidenavModule;
	}());
	
	var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$25 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdListDivider = (function () {
	    function MdListDivider() {
	    }
	    MdListDivider = __decorate$25([
	        _angular_core.Directive({
	            selector: 'md-divider'
	        }), 
	        __metadata$25('design:paramtypes', [])
	    ], MdListDivider);
	    return MdListDivider;
	}());
	var MdList = (function () {
	    function MdList() {
	    }
	    MdList = __decorate$25([
	        _angular_core.Component({selector: 'md-list, md-nav-list',
	            host: { 'role': 'list' },
	            template: '<ng-content></ng-content>',
	            styles: ["md-list, md-nav-list { padding-top: 8px; display: block; } md-list [md-subheader], md-nav-list [md-subheader] { display: block; box-sizing: border-box; height: 48px; padding: 16px; margin: 0; font-size: 14px; font-weight: 500; } md-list [md-subheader]:first-child, md-nav-list [md-subheader]:first-child { margin-top: -8px; } md-list md-list-item .md-list-item, md-list a[md-list-item] .md-list-item, md-nav-list md-list-item .md-list-item, md-nav-list a[md-list-item] .md-list-item { display: flex; flex-direction: row; align-items: center; font-family: Roboto, \"Helvetica Neue\", sans-serif; box-sizing: border-box; font-size: 16px; height: 48px; padding: 0 16px; } md-list md-list-item.md-list-avatar .md-list-item, md-list a[md-list-item].md-list-avatar .md-list-item, md-nav-list md-list-item.md-list-avatar .md-list-item, md-nav-list a[md-list-item].md-list-avatar .md-list-item { height: 56px; } md-list md-list-item.md-2-line .md-list-item, md-list a[md-list-item].md-2-line .md-list-item, md-nav-list md-list-item.md-2-line .md-list-item, md-nav-list a[md-list-item].md-2-line .md-list-item { height: 72px; } md-list md-list-item.md-3-line .md-list-item, md-list a[md-list-item].md-3-line .md-list-item, md-nav-list md-list-item.md-3-line .md-list-item, md-nav-list a[md-list-item].md-3-line .md-list-item { height: 88px; } md-list md-list-item .md-list-text, md-list a[md-list-item] .md-list-text, md-nav-list md-list-item .md-list-text, md-nav-list a[md-list-item] .md-list-text { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; overflow: hidden; padding: 0 16px; } md-list md-list-item .md-list-text > *, md-list a[md-list-item] .md-list-text > *, md-nav-list md-list-item .md-list-text > *, md-nav-list a[md-list-item] .md-list-text > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-list md-list-item .md-list-text:empty, md-list a[md-list-item] .md-list-text:empty, md-nav-list md-list-item .md-list-text:empty, md-nav-list a[md-list-item] .md-list-text:empty { display: none; } md-list md-list-item .md-list-text:first-child, md-list a[md-list-item] .md-list-text:first-child, md-nav-list md-list-item .md-list-text:first-child, md-nav-list a[md-list-item] .md-list-text:first-child { padding: 0; } md-list md-list-item [md-list-avatar], md-list a[md-list-item] [md-list-avatar], md-nav-list md-list-item [md-list-avatar], md-nav-list a[md-list-item] [md-list-avatar] { width: 40px; height: 40px; border-radius: 50%; } md-list md-list-item [md-list-icon], md-list a[md-list-item] [md-list-icon], md-nav-list md-list-item [md-list-icon], md-nav-list a[md-list-item] [md-list-icon] { width: 24px; height: 24px; border-radius: 50%; padding: 4px; } md-list md-list-item [md-line], md-list a[md-list-item] [md-line], md-nav-list md-list-item [md-line], md-nav-list a[md-list-item] [md-line] { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; box-sizing: border-box; } md-list md-list-item [md-line]:nth-child(n+2), md-list a[md-list-item] [md-line]:nth-child(n+2), md-nav-list md-list-item [md-line]:nth-child(n+2), md-nav-list a[md-list-item] [md-line]:nth-child(n+2) { font-size: 14px; } md-list[dense], md-nav-list[dense] { padding-top: 4px; display: block; } md-list[dense] [md-subheader], md-nav-list[dense] [md-subheader] { display: block; box-sizing: border-box; height: 40px; padding: 16px; margin: 0; font-size: 13px; font-weight: 500; } md-list[dense] [md-subheader]:first-child, md-nav-list[dense] [md-subheader]:first-child { margin-top: -4px; } md-list[dense] md-list-item .md-list-item, md-list[dense] a[md-list-item] .md-list-item, md-nav-list[dense] md-list-item .md-list-item, md-nav-list[dense] a[md-list-item] .md-list-item { display: flex; flex-direction: row; align-items: center; font-family: Roboto, \"Helvetica Neue\", sans-serif; box-sizing: border-box; font-size: 13px; height: 40px; padding: 0 16px; } md-list[dense] md-list-item.md-list-avatar .md-list-item, md-list[dense] a[md-list-item].md-list-avatar .md-list-item, md-nav-list[dense] md-list-item.md-list-avatar .md-list-item, md-nav-list[dense] a[md-list-item].md-list-avatar .md-list-item { height: 48px; } md-list[dense] md-list-item.md-2-line .md-list-item, md-list[dense] a[md-list-item].md-2-line .md-list-item, md-nav-list[dense] md-list-item.md-2-line .md-list-item, md-nav-list[dense] a[md-list-item].md-2-line .md-list-item { height: 60px; } md-list[dense] md-list-item.md-3-line .md-list-item, md-list[dense] a[md-list-item].md-3-line .md-list-item, md-nav-list[dense] md-list-item.md-3-line .md-list-item, md-nav-list[dense] a[md-list-item].md-3-line .md-list-item { height: 76px; } md-list[dense] md-list-item .md-list-text, md-list[dense] a[md-list-item] .md-list-text, md-nav-list[dense] md-list-item .md-list-text, md-nav-list[dense] a[md-list-item] .md-list-text { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; overflow: hidden; padding: 0 16px; } md-list[dense] md-list-item .md-list-text > *, md-list[dense] a[md-list-item] .md-list-text > *, md-nav-list[dense] md-list-item .md-list-text > *, md-nav-list[dense] a[md-list-item] .md-list-text > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-list[dense] md-list-item .md-list-text:empty, md-list[dense] a[md-list-item] .md-list-text:empty, md-nav-list[dense] md-list-item .md-list-text:empty, md-nav-list[dense] a[md-list-item] .md-list-text:empty { display: none; } md-list[dense] md-list-item .md-list-text:first-child, md-list[dense] a[md-list-item] .md-list-text:first-child, md-nav-list[dense] md-list-item .md-list-text:first-child, md-nav-list[dense] a[md-list-item] .md-list-text:first-child { padding: 0; } md-list[dense] md-list-item [md-list-avatar], md-list[dense] a[md-list-item] [md-list-avatar], md-nav-list[dense] md-list-item [md-list-avatar], md-nav-list[dense] a[md-list-item] [md-list-avatar] { width: 40px; height: 40px; border-radius: 50%; } md-list[dense] md-list-item [md-list-icon], md-list[dense] a[md-list-item] [md-list-icon], md-nav-list[dense] md-list-item [md-list-icon], md-nav-list[dense] a[md-list-item] [md-list-icon] { width: 24px; height: 24px; border-radius: 50%; padding: 4px; } md-list[dense] md-list-item [md-line], md-list[dense] a[md-list-item] [md-line], md-nav-list[dense] md-list-item [md-line], md-nav-list[dense] a[md-list-item] [md-line] { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; box-sizing: border-box; } md-list[dense] md-list-item [md-line]:nth-child(n+2), md-list[dense] a[md-list-item] [md-line]:nth-child(n+2), md-nav-list[dense] md-list-item [md-line]:nth-child(n+2), md-nav-list[dense] a[md-list-item] [md-line]:nth-child(n+2) { font-size: 13px; } md-divider { display: block; border-top: 1px solid; margin: 0; } md-nav-list a { text-decoration: none; color: inherit; } md-nav-list .md-list-item { cursor: pointer; } md-nav-list .md-list-item:hover, md-nav-list .md-list-item.md-list-item-focus { outline: none; } /*# sourceMappingURL=list.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata$25('design:paramtypes', [])
	    ], MdList);
	    return MdList;
	}());
	/* Need directive for a ContentChild query in list-item */
	var MdListAvatar = (function () {
	    function MdListAvatar() {
	    }
	    MdListAvatar = __decorate$25([
	        _angular_core.Directive({ selector: '[md-list-avatar]' }), 
	        __metadata$25('design:paramtypes', [])
	    ], MdListAvatar);
	    return MdListAvatar;
	}());
	var MdListItem = (function () {
	    function MdListItem(_renderer, _element) {
	        this._renderer = _renderer;
	        this._element = _element;
	        this._hasFocus = false;
	    }
	    Object.defineProperty(MdListItem.prototype, "_hasAvatar", {
	        set: function (avatar) {
	            this._renderer.setElementClass(this._element.nativeElement, 'md-list-avatar', avatar != null);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    MdListItem.prototype.ngAfterContentInit = function () {
	        this._lineSetter = new MdLineSetter(this._lines, this._renderer, this._element);
	    };
	    MdListItem.prototype._handleFocus = function () {
	        this._hasFocus = true;
	    };
	    MdListItem.prototype._handleBlur = function () {
	        this._hasFocus = false;
	    };
	    __decorate$25([
	        _angular_core.ContentChildren(MdLine), 
	        __metadata$25('design:type', _angular_core.QueryList)
	    ], MdListItem.prototype, "_lines", void 0);
	    __decorate$25([
	        _angular_core.ContentChild(MdListAvatar), 
	        __metadata$25('design:type', MdListAvatar), 
	        __metadata$25('design:paramtypes', [MdListAvatar])
	    ], MdListItem.prototype, "_hasAvatar", null);
	    MdListItem = __decorate$25([
	        _angular_core.Component({selector: 'md-list-item, a[md-list-item]',
	            host: {
	                'role': 'listitem',
	                '(focus)': '_handleFocus()',
	                '(blur)': '_handleBlur()',
	            },
	            template: "<div class=\"md-list-item\" [class.md-list-item-focus]=\"_hasFocus\"> <ng-content select=\"[md-list-avatar],[md-list-icon]\"></ng-content> <div class=\"md-list-text\"><ng-content select=\"[md-line]\"></ng-content></div> <ng-content></ng-content> </div> ",
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata$25('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdListItem);
	    return MdListItem;
	}());
	var MdListModule = (function () {
	    function MdListModule() {
	    }
	    MdListModule.forRoot = function () {
	        return {
	            ngModule: MdListModule,
	            providers: []
	        };
	    };
	    MdListModule = __decorate$25([
	        _angular_core.NgModule({
	            imports: [MdLineModule],
	            exports: [MdList, MdListItem, MdListDivider, MdListAvatar, MdLineModule],
	            declarations: [MdList, MdListItem, MdListDivider, MdListAvatar],
	        }), 
	        __metadata$25('design:paramtypes', [])
	    ], MdListModule);
	    return MdListModule;
	}());
	
	/**
	 * Converts values into strings. Falsy values become empty strings.
	 * TODO: internal
	 */
	function coerceToString(value) {
	    return "" + (value || '');
	}
	/**
	 * Converts a value that might be a string into a number.
	 * TODO: internal
	 */
	function coerceToNumber(value) {
	    return typeof value === 'string' ? parseInt(value, 10) : value;
	}
	
	var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$27 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdGridTile = (function () {
	    function MdGridTile(_renderer, _element) {
	        this._renderer = _renderer;
	        this._element = _element;
	        this._rowspan = 1;
	        this._colspan = 1;
	    }
	    Object.defineProperty(MdGridTile.prototype, "rowspan", {
	        get: function () {
	            return this._rowspan;
	        },
	        set: function (value) {
	            this._rowspan = coerceToNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdGridTile.prototype, "colspan", {
	        get: function () {
	            return this._colspan;
	        },
	        set: function (value) {
	            this._colspan = coerceToNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Sets the style of the grid-tile element.  Needs to be set manually to avoid
	     * "Changed after checked" errors that would occur with HostBinding.
	     */
	    MdGridTile.prototype._setStyle = function (property, value) {
	        this._renderer.setElementStyle(this._element.nativeElement, property, value);
	    };
	    __decorate$27([
	        _angular_core.Input(), 
	        __metadata$27('design:type', Object)
	    ], MdGridTile.prototype, "rowspan", null);
	    __decorate$27([
	        _angular_core.Input(), 
	        __metadata$27('design:type', Object)
	    ], MdGridTile.prototype, "colspan", null);
	    MdGridTile = __decorate$27([
	        _angular_core.Component({selector: 'md-grid-tile',
	            host: { 'role': 'listitem' },
	            template: "<!-- TODO(kara): Revisit why this is a figure.--> <figure> <ng-content></ng-content> </figure>",
	            styles: ["md-grid-list { display: block; position: relative; } md-grid-tile { display: block; position: absolute; overflow: hidden; } md-grid-tile figure { display: flex; position: absolute; align-items: center; justify-content: center; height: 100%; top: 0; right: 0; bottom: 0; left: 0; padding: 0; margin: 0; } md-grid-tile md-grid-tile-header, md-grid-tile md-grid-tile-footer { display: flex; align-items: center; height: 48px; color: #fff; background: rgba(0, 0, 0, 0.38); overflow: hidden; padding: 0 16px; font-size: 16px; position: absolute; left: 0; right: 0; } md-grid-tile md-grid-tile-header [md-line], md-grid-tile md-grid-tile-footer [md-line] { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; box-sizing: border-box; } md-grid-tile md-grid-tile-header [md-line]:nth-child(n+2), md-grid-tile md-grid-tile-footer [md-line]:nth-child(n+2) { font-size: 12px; } md-grid-tile md-grid-tile-header > *, md-grid-tile md-grid-tile-footer > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile md-grid-tile-header.md-2-line, md-grid-tile md-grid-tile-footer.md-2-line { height: 68px; } md-grid-tile .md-grid-list-text { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; overflow: hidden; } md-grid-tile .md-grid-list-text > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile .md-grid-list-text:empty { display: none; } md-grid-tile md-grid-tile-header { top: 0; } md-grid-tile md-grid-tile-footer { bottom: 0; } md-grid-tile [md-grid-avatar] { padding-right: 16px; } [dir='rtl'] md-grid-tile [md-grid-avatar] { padding-right: 0; padding-left: 16px; } md-grid-tile [md-grid-avatar]:empty { display: none; } /*# sourceMappingURL=grid-list.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$27('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdGridTile);
	    return MdGridTile;
	}());
	var MdGridTileText = (function () {
	    function MdGridTileText(_renderer, _element) {
	        this._renderer = _renderer;
	        this._element = _element;
	    }
	    MdGridTileText.prototype.ngAfterContentInit = function () {
	        this._lineSetter = new MdLineSetter(this._lines, this._renderer, this._element);
	    };
	    __decorate$27([
	        _angular_core.ContentChildren(MdLine), 
	        __metadata$27('design:type', _angular_core.QueryList)
	    ], MdGridTileText.prototype, "_lines", void 0);
	    MdGridTileText = __decorate$27([
	        _angular_core.Component({selector: 'md-grid-tile-header, md-grid-tile-footer',
	            template: "<ng-content select=\"[md-grid-avatar]\"></ng-content> <div class=\"md-grid-list-text\"><ng-content select=\"[md-line]\"></ng-content></div> <ng-content></ng-content>"
	        }), 
	        __metadata$27('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdGridTileText);
	    return MdGridTileText;
	}());
	
	var __extends$8 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Exception thrown when cols property is missing from grid-list
	 */
	var MdGridListColsError = (function (_super) {
	    __extends$8(MdGridListColsError, _super);
	    function MdGridListColsError() {
	        _super.call(this, "md-grid-list: must pass in number of columns. Example: <md-grid-list cols=\"3\">");
	    }
	    return MdGridListColsError;
	}(MdError));
	/**
	 * Exception thrown when a tile's colspan is longer than the number of cols in list
	 */
	var MdGridTileTooWideError = (function (_super) {
	    __extends$8(MdGridTileTooWideError, _super);
	    function MdGridTileTooWideError(cols, listLength) {
	        _super.call(this, "md-grid-list: tile with colspan " + cols + " is wider than grid with cols=\"" + listLength + "\".");
	    }
	    return MdGridTileTooWideError;
	}(MdError));
	/**
	 * Exception thrown when an invalid ratio is passed in as a rowHeight
	 */
	var MdGridListBadRatioError = (function (_super) {
	    __extends$8(MdGridListBadRatioError, _super);
	    function MdGridListBadRatioError(value) {
	        _super.call(this, "md-grid-list: invalid ratio given for row-height: \"" + value + "\"");
	    }
	    return MdGridListBadRatioError;
	}(MdError));
	
	/**
	 * Class for determining, from a list of tiles, the (row, col) position of each of those tiles
	 * in the grid. This is necessary (rather than just rendering the tiles in normal document flow)
	 * because the tiles can have a rowspan.
	 *
	 * The positioning algorithm greedily places each tile as soon as it encounters a gap in the grid
	 * large enough to accommodate it so that the tiles still render in the same order in which they
	 * are given.
	 *
	 * The basis of the algorithm is the use of an array to track the already placed tiles. Each
	 * element of the array corresponds to a column, and the value indicates how many cells in that
	 * column are already occupied; zero indicates an empty cell. Moving "down" to the next row
	 * decrements each value in the tracking array (indicating that the column is one cell closer to
	 * being free).
	 */
	var TileCoordinator = (function () {
	    function TileCoordinator(numColumns, tiles) {
	        var _this = this;
	        /** Index at which the search for the next gap will start. */
	        this.columnIndex = 0;
	        /** The current row index. */
	        this.rowIndex = 0;
	        this.tracker = new Array(numColumns);
	        this.tracker.fill(0, 0, this.tracker.length);
	        this.positions = tiles.map(function (tile) { return _this._trackTile(tile); });
	    }
	    Object.defineProperty(TileCoordinator.prototype, "rowCount", {
	        /** Gets the total number of rows occupied by tiles */
	        get: function () { return this.rowIndex + 1; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TileCoordinator.prototype, "rowspan", {
	        /** Gets the total span of rows occupied by tiles.
	         * Ex: A list with 1 row that contains a tile with rowspan 2 will have a total rowspan of 2. */
	        get: function () {
	            var lastRowMax = Math.max.apply(Math, this.tracker);
	            // if any of the tiles has a rowspan that pushes it beyond the total row count,
	            // add the difference to the rowcount
	            return lastRowMax > 1 ? this.rowCount + lastRowMax - 1 : this.rowCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Calculates the row and col position of a tile. */
	    TileCoordinator.prototype._trackTile = function (tile) {
	        // Find a gap large enough for this tile.
	        var gapStartIndex = this._findMatchingGap(tile.colspan);
	        // Place tile in the resulting gap.
	        this._markTilePosition(gapStartIndex, tile);
	        // The next time we look for a gap, the search will start at columnIndex, which should be
	        // immediately after the tile that has just been placed.
	        this.columnIndex = gapStartIndex + tile.colspan;
	        return new TilePosition(this.rowIndex, gapStartIndex);
	    };
	    /** Finds the next available space large enough to fit the tile. */
	    TileCoordinator.prototype._findMatchingGap = function (tileCols) {
	        if (tileCols > this.tracker.length) {
	            throw new MdGridTileTooWideError(tileCols, this.tracker.length);
	        }
	        // Start index is inclusive, end index is exclusive.
	        var gapStartIndex = -1;
	        var gapEndIndex = -1;
	        // Look for a gap large enough to fit the given tile. Empty spaces are marked with a zero.
	        do {
	            // If we've reached the end of the row, go to the next row.
	            if (this.columnIndex + tileCols > this.tracker.length) {
	                this._nextRow();
	                continue;
	            }
	            gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
	            // If there are no more empty spaces in this row at all, move on to the next row.
	            if (gapStartIndex == -1) {
	                this._nextRow();
	                continue;
	            }
	            gapEndIndex = this._findGapEndIndex(gapStartIndex);
	            // If a gap large enough isn't found, we want to start looking immediately after the current
	            // gap on the next iteration.
	            this.columnIndex = gapStartIndex + 1;
	        } while (gapEndIndex - gapStartIndex < tileCols);
	        return gapStartIndex;
	    };
	    /** Move "down" to the next row. */
	    TileCoordinator.prototype._nextRow = function () {
	        this.columnIndex = 0;
	        this.rowIndex++;
	        // Decrement all spaces by one to reflect moving down one row.
	        for (var i = 0; i < this.tracker.length; i++) {
	            this.tracker[i] = Math.max(0, this.tracker[i] - 1);
	        }
	    };
	    /**
	     * Finds the end index (exclusive) of a gap given the index from which to start looking.
	     * The gap ends when a non-zero value is found.
	     */
	    TileCoordinator.prototype._findGapEndIndex = function (gapStartIndex) {
	        for (var i = gapStartIndex + 1; i < this.tracker.length; i++) {
	            if (this.tracker[i] != 0) {
	                return i;
	            }
	        }
	        // The gap ends with the end of the row.
	        return this.tracker.length;
	    };
	    /** Update the tile tracker to account for the given tile in the given space. */
	    TileCoordinator.prototype._markTilePosition = function (start, tile) {
	        for (var i = 0; i < tile.colspan; i++) {
	            this.tracker[start + i] = tile.rowspan;
	        }
	    };
	    return TileCoordinator;
	}());
	/** Simple data structure for tile position (row, col). */
	var TilePosition = (function () {
	    function TilePosition(row, col) {
	        this.row = row;
	        this.col = col;
	    }
	    return TilePosition;
	}());
	
	var __extends$9 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Sets the style properties for an individual tile, given the position calculated by the
	 * Tile Coordinator.
	 * TODO: internal
	 */
	var TileStyler = (function () {
	    function TileStyler() {
	        this._rows = 0;
	        this._rowspan = 0;
	    }
	    /**
	     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
	     * because these properties haven't been calculated by that point.
	     */
	    TileStyler.prototype.init = function (_gutterSize, tracker, cols, direction) {
	        this._gutterSize = normalizeUnits(_gutterSize);
	        this._rows = tracker.rowCount;
	        this._rowspan = tracker.rowspan;
	        this._cols = cols;
	        this._direction = direction;
	    };
	    /**
	     * Computes the amount of space a single 1x1 tile would take up (width or height).
	     * Used as a basis for other calculations.
	     * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
	     * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
	     * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
	     */
	    TileStyler.prototype.getBaseTileSize = function (sizePercent, gutterFraction) {
	        // Take the base size percent (as would be if evenly dividing the size between cells),
	        // and then subtracting the size of one gutter. However, since there are no gutters on the
	        // edges, each tile only uses a fraction (gutterShare = numGutters / numCells) of the gutter
	        // size. (Imagine having one gutter per tile, and then breaking up the extra gutter on the
	        // edge evenly among the cells).
	        return "(" + sizePercent + "% - ( " + this._gutterSize + " * " + gutterFraction + " ))";
	    };
	    /**
	     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
	     * @param offset Number of tiles that have already been rendered in the row/column.
	     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
	     * @return Position of the tile as a CSS calc() expression.
	     */
	    TileStyler.prototype.getTilePosition = function (baseSize, offset) {
	        // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
	        // row/column (offset).
	        return calc("(" + baseSize + " + " + this._gutterSize + ") * " + offset);
	    };
	    /**
	     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
	     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
	     * @param span The tile's rowspan or colspan.
	     * @return Size of the tile as a CSS calc() expression.
	     */
	    TileStyler.prototype.getTileSize = function (baseSize, span) {
	        return "(" + baseSize + " * " + span + ") + (" + (span - 1) + " * " + this._gutterSize + ")";
	    };
	    /** Gets the style properties to be applied to a tile for the given row and column index. */
	    TileStyler.prototype.setStyle = function (tile, rowIndex, colIndex) {
	        // Percent of the available horizontal space that one column takes up.
	        var percentWidthPerTile = 100 / this._cols;
	        // Fraction of the vertical gutter size that each column takes up.
	        // For example, if there are 5 columns, each column uses 4/5 = 0.8 times the gutter width.
	        var gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
	        this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
	        this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
	    };
	    /** Sets the horizontal placement of the tile in the list. */
	    TileStyler.prototype.setColStyles = function (tile, colIndex, percentWidth, gutterWidth) {
	        // Base horizontal size of a column.
	        var baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
	        // The width and horizontal position of each tile is always calculated the same way, but the
	        // height and vertical position depends on the rowMode.
	        var side = this._direction === 'ltr' ? 'left' : 'right';
	        tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
	        tile._setStyle('width', calc(this.getTileSize(baseTileWidth, tile.colspan)));
	    };
	    /** Calculates the total size taken up by gutters across one axis of a list. */
	    TileStyler.prototype.getGutterSpan = function () {
	        return this._gutterSize + " * (" + this._rowspan + " - 1)";
	    };
	    /** Calculates the total size taken up by tiles across one axis of a list. */
	    TileStyler.prototype.getTileSpan = function (tileHeight) {
	        return this._rowspan + " * " + this.getTileSize(tileHeight, 1);
	    };
	    /**
	     * Sets the vertical placement of the tile in the list.
	     * This method will be implemented by each type of TileStyler.
	     */
	    TileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) { };
	    /**
	     * Calculates the computed height and returns the correct style property to set.
	     * This method will be implemented by each type of TileStyler.
	     */
	    TileStyler.prototype.getComputedHeight = function () { return null; };
	    return TileStyler;
	}());
	/**
	 * This type of styler is instantiated when the user passes in a fixed row height.
	 * Example <md-grid-list cols="3" rowHeight="100px">
	 * TODO: internal
	 */
	var FixedTileStyler = (function (_super) {
	    __extends$9(FixedTileStyler, _super);
	    function FixedTileStyler(fixedRowHeight) {
	        _super.call(this);
	        this.fixedRowHeight = fixedRowHeight;
	    }
	    FixedTileStyler.prototype.init = function (gutterSize, tracker, cols, direction) {
	        _super.prototype.init.call(this, gutterSize, tracker, cols, direction);
	        this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
	    };
	    FixedTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
	        tile._setStyle('top', this.getTilePosition(this.fixedRowHeight, rowIndex));
	        tile._setStyle('height', calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
	    };
	    FixedTileStyler.prototype.getComputedHeight = function () {
	        return [
	            'height', calc(this.getTileSpan(this.fixedRowHeight) + " + " + this.getGutterSpan())
	        ];
	    };
	    return FixedTileStyler;
	}(TileStyler));
	/**
	 * This type of styler is instantiated when the user passes in a width:height ratio
	 * for the row height.  Example <md-grid-list cols="3" rowHeight="3:1">
	 * TODO: internal
	 */
	var RatioTileStyler = (function (_super) {
	    __extends$9(RatioTileStyler, _super);
	    function RatioTileStyler(value) {
	        _super.call(this);
	        this._parseRatio(value);
	    }
	    RatioTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
	        var percentHeightPerTile = percentWidth / this.rowHeightRatio;
	        this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
	        // Use paddingTop and marginTop to maintain the given aspect ratio, as
	        // a percentage-based value for these properties is applied versus the *width* of the
	        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
	        tile._setStyle('marginTop', this.getTilePosition(this.baseTileHeight, rowIndex));
	        tile._setStyle('paddingTop', calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
	    };
	    RatioTileStyler.prototype.getComputedHeight = function () {
	        return [
	            'paddingBottom', calc(this.getTileSpan(this.baseTileHeight) + " + " + this.getGutterSpan())
	        ];
	    };
	    RatioTileStyler.prototype._parseRatio = function (value) {
	        var ratioParts = value.split(':');
	        if (ratioParts.length !== 2) {
	            throw new MdGridListBadRatioError(value);
	        }
	        this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
	    };
	    return RatioTileStyler;
	}(TileStyler));
	/*  This type of styler is instantiated when the user selects a "fit" row height mode.
	 *  In other words, the row height will reflect the total height of the container divided
	 *  by the number of rows.  Example <md-grid-list cols="3" rowHeight="fit"> */
	var FitTileStyler = (function (_super) {
	    __extends$9(FitTileStyler, _super);
	    function FitTileStyler() {
	        _super.apply(this, arguments);
	    }
	    FitTileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) {
	        // Percent of the available vertical space that one row takes up.
	        var percentHeightPerTile = 100 / this._rowspan;
	        // Fraction of the horizontal gutter size that each column takes up.
	        var gutterHeightPerTile = (this._rows - 1) / this._rows;
	        // Base vertical size of a column.
	        var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
	        tile._setStyle('top', this.getTilePosition(baseTileHeight, rowIndex));
	        tile._setStyle('height', calc(this.getTileSize(baseTileHeight, tile.rowspan)));
	    };
	    return FitTileStyler;
	}(TileStyler));
	/** Wraps a CSS string in a calc function */
	function calc(exp) { return "calc(" + exp + ")"; }
	/** Appends pixels to a CSS string if no units are given. */
	function normalizeUnits(value) {
	    return (value.match(/px|em|rem/)) ? value : value + 'px';
	}
	
	var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$26 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	// TODO(kara): Conditional (responsive) column count / row size.
	// TODO(kara): Re-layout on window resize / media change (debounced).
	// TODO(kara): gridTileHeader and gridTileFooter.
	var MD_FIT_MODE = 'fit';
	var MdGridList = (function () {
	    function MdGridList(_renderer, _element, _dir) {
	        this._renderer = _renderer;
	        this._element = _element;
	        this._dir = _dir;
	        /** The amount of space between tiles. This will be something like '5px' or '2em'. */
	        this._gutter = '1px';
	    }
	    Object.defineProperty(MdGridList.prototype, "cols", {
	        get: function () {
	            return this._cols;
	        },
	        set: function (value) {
	            this._cols = coerceToNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdGridList.prototype, "gutterSize", {
	        get: function () {
	            return this._gutter;
	        },
	        set: function (value) {
	            this._gutter = coerceToString(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdGridList.prototype, "rowHeight", {
	        /** Set internal representation of row height from the user-provided value. */
	        set: function (value) {
	            this._rowHeight = coerceToString(value);
	            this._setTileStyler();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    MdGridList.prototype.ngOnInit = function () {
	        this._checkCols();
	        this._checkRowHeight();
	    };
	    /**
	     * The layout calculation is fairly cheap if nothing changes, so there's little cost
	     * to run it frequently.
	     * TODO: internal
	     */
	    MdGridList.prototype.ngAfterContentChecked = function () {
	        this._layoutTiles();
	    };
	    /** Throw a friendly error if cols property is missing */
	    MdGridList.prototype._checkCols = function () {
	        if (!this.cols) {
	            throw new MdGridListColsError();
	        }
	    };
	    /** Default to equal width:height if rowHeight property is missing */
	    MdGridList.prototype._checkRowHeight = function () {
	        if (!this._rowHeight) {
	            this._tileStyler = new RatioTileStyler('1:1');
	        }
	    };
	    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
	    MdGridList.prototype._setTileStyler = function () {
	        if (this._rowHeight === MD_FIT_MODE) {
	            this._tileStyler = new FitTileStyler();
	        }
	        else if (this._rowHeight && this._rowHeight.match(/:/g)) {
	            this._tileStyler = new RatioTileStyler(this._rowHeight);
	        }
	        else {
	            this._tileStyler = new FixedTileStyler(this._rowHeight);
	        }
	    };
	    /** Computes and applies the size and position for all children grid tiles. */
	    MdGridList.prototype._layoutTiles = function () {
	        var tiles = this._tiles.toArray();
	        var tracker = new TileCoordinator(this.cols, tiles);
	        var direction = this._dir ? this._dir.value : 'ltr';
	        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
	        for (var i = 0; i < tiles.length; i++) {
	            var pos = tracker.positions[i];
	            var tile = tiles[i];
	            this._tileStyler.setStyle(tile, pos.row, pos.col);
	        }
	        this._setListStyle(this._tileStyler.getComputedHeight());
	    };
	    /** Sets style on the main grid-list element, given the style name and value. */
	    MdGridList.prototype._setListStyle = function (style) {
	        if (style) {
	            this._renderer.setElementStyle(this._element.nativeElement, style[0], style[1]);
	        }
	    };
	    __decorate$26([
	        _angular_core.ContentChildren(MdGridTile), 
	        __metadata$26('design:type', _angular_core.QueryList)
	    ], MdGridList.prototype, "_tiles", void 0);
	    __decorate$26([
	        _angular_core.Input(), 
	        __metadata$26('design:type', Object)
	    ], MdGridList.prototype, "cols", null);
	    __decorate$26([
	        _angular_core.Input('gutterSize'), 
	        __metadata$26('design:type', Object)
	    ], MdGridList.prototype, "gutterSize", null);
	    __decorate$26([
	        _angular_core.Input(), 
	        __metadata$26('design:type', Object), 
	        __metadata$26('design:paramtypes', [Object])
	    ], MdGridList.prototype, "rowHeight", null);
	    MdGridList = __decorate$26([
	        _angular_core.Component({selector: 'md-grid-list',
	            template: "<div class=\"md-grid-list\"> <ng-content></ng-content> </div>",
	            styles: ["md-grid-list { display: block; position: relative; } md-grid-tile { display: block; position: absolute; overflow: hidden; } md-grid-tile figure { display: flex; position: absolute; align-items: center; justify-content: center; height: 100%; top: 0; right: 0; bottom: 0; left: 0; padding: 0; margin: 0; } md-grid-tile md-grid-tile-header, md-grid-tile md-grid-tile-footer { display: flex; align-items: center; height: 48px; color: #fff; background: rgba(0, 0, 0, 0.38); overflow: hidden; padding: 0 16px; font-size: 16px; position: absolute; left: 0; right: 0; } md-grid-tile md-grid-tile-header [md-line], md-grid-tile md-grid-tile-footer [md-line] { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; box-sizing: border-box; } md-grid-tile md-grid-tile-header [md-line]:nth-child(n+2), md-grid-tile md-grid-tile-footer [md-line]:nth-child(n+2) { font-size: 12px; } md-grid-tile md-grid-tile-header > *, md-grid-tile md-grid-tile-footer > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile md-grid-tile-header.md-2-line, md-grid-tile md-grid-tile-footer.md-2-line { height: 68px; } md-grid-tile .md-grid-list-text { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; overflow: hidden; } md-grid-tile .md-grid-list-text > * { margin: 0; padding: 0; font-weight: normal; font-size: inherit; } md-grid-tile .md-grid-list-text:empty { display: none; } md-grid-tile md-grid-tile-header { top: 0; } md-grid-tile md-grid-tile-footer { bottom: 0; } md-grid-tile [md-grid-avatar] { padding-right: 16px; } [dir='rtl'] md-grid-tile [md-grid-avatar] { padding-right: 0; padding-left: 16px; } md-grid-tile [md-grid-avatar]:empty { display: none; } /*# sourceMappingURL=grid-list.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }),
	        __param$4(2, _angular_core.Optional()), 
	        __metadata$26('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef, Dir])
	    ], MdGridList);
	    return MdGridList;
	}());
	var MdGridListModule = (function () {
	    function MdGridListModule() {
	    }
	    MdGridListModule.forRoot = function () {
	        return {
	            ngModule: MdGridListModule,
	            providers: []
	        };
	    };
	    MdGridListModule = __decorate$26([
	        _angular_core.NgModule({
	            imports: [MdLineModule],
	            exports: [MdGridList, MdGridTile, MdGridTileText, MdLineModule],
	            declarations: [MdGridList, MdGridTile, MdGridTileText],
	        }), 
	        __metadata$26('design:paramtypes', [])
	    ], MdGridListModule);
	    return MdGridListModule;
	}());
	
	var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$28 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Content of a card, needed as it's used as a selector in the API.
	 */
	var MdCardContent = (function () {
	    function MdCardContent() {
	    }
	    MdCardContent = __decorate$28([
	        _angular_core.Directive({
	            selector: 'md-card-content'
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardContent);
	    return MdCardContent;
	}());
	/**
	 * Title of a card, needed as it's used as a selector in the API.
	 */
	var MdCardTitle = (function () {
	    function MdCardTitle() {
	    }
	    MdCardTitle = __decorate$28([
	        _angular_core.Directive({
	            selector: 'md-card-title'
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardTitle);
	    return MdCardTitle;
	}());
	/**
	 * Sub-title of a card, needed as it's used as a selector in the API.
	 */
	var MdCardSubtitle = (function () {
	    function MdCardSubtitle() {
	    }
	    MdCardSubtitle = __decorate$28([
	        _angular_core.Directive({
	            selector: 'md-card-subtitle'
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardSubtitle);
	    return MdCardSubtitle;
	}());
	/**
	 * Action section of a card, needed as it's used as a selector in the API.
	 */
	var MdCardActions = (function () {
	    function MdCardActions() {
	    }
	    MdCardActions = __decorate$28([
	        _angular_core.Directive({
	            selector: 'md-card-actions'
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardActions);
	    return MdCardActions;
	}());
	/**
	 * Footer of a card, needed as it's used as a selector in the API.
	 */
	var MdCardFooter = (function () {
	    function MdCardFooter() {
	    }
	    MdCardFooter = __decorate$28([
	        _angular_core.Directive({
	            selector: 'md-card-footer'
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardFooter);
	    return MdCardFooter;
	}());
	/*
	
	<md-card> is a basic content container component that adds the styles of a material design card.
	
	While you can use this component alone,
	it also provides a number of preset styles for common card sections, including:
	 - md-card-title
	 - md-card-subtitle
	 - md-card-content
	 - md-card-actions
	 - md-card-footer
	
	 You can see some examples of cards here:
	 http://embed.plnkr.co/s5O4YcyvbLhIApSrIhtj/
	
	 TODO(kara): update link to demo site when it exists
	
	*/
	var MdCard = (function () {
	    function MdCard() {
	    }
	    MdCard = __decorate$28([
	        _angular_core.Component({selector: 'md-card',
	            template: "<ng-content></ng-content> ",
	            styles: ["md-card { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); will-change: box-shadow; display: block; position: relative; padding: 24px; border-radius: 2px; font-family: Roboto, \"Helvetica Neue\", sans-serif; } md-card:hover { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); } .md-card-flat { box-shadow: none; } md-card-title, md-card-subtitle, md-card-content, md-card-actions { display: block; margin-bottom: 16px; } md-card-title { font-size: 24px; font-weight: 400; } md-card-subtitle { font-size: 14px; } md-card-content { font-size: 14px; } md-card-actions { margin-left: -16px; margin-right: -16px; padding: 8px 0; } md-card-actions[align='end'] { display: flex; justify-content: flex-end; } [md-card-image] { width: calc(100% + 48px); margin: 0 -24px 16px -24px; } [md-card-xl-image] { width: 240px; height: 240px; margin: -8px; } md-card-footer { position: absolute; width: 100%; min-height: 5px; bottom: 0; left: 0; } md-card-actions [md-button], md-card-actions [md-raised-button] { margin: 0 4px; } md-card-header { display: flex; flex-direction: row; height: 40px; margin: -8px 0 16px 0; } .md-card-header-text { height: 40px; margin: 0 8px; } [md-card-avatar] { height: 40px; width: 40px; border-radius: 50%; } md-card-header md-card-title { font-size: 14px; } [md-card-sm-image], [md-card-md-image], [md-card-lg-image] { margin: -8px 0; } md-card-title-group { display: flex; justify-content: space-between; margin: 0 -8px; } [md-card-sm-image] { width: 80px; height: 80px; } [md-card-md-image] { width: 112px; height: 112px; } [md-card-lg-image] { width: 152px; height: 152px; } @media (max-width: 600px) { md-card { padding: 24px 16px; } [md-card-image] { width: calc(100% + 32px); margin: 16px -16px; } md-card-title-group { margin: 0; } [md-card-xl-image] { margin-left: 0; margin-right: 0; } md-card-header { margin: -8px 0 0 0; } } md-card > :first-child, md-card-content > :first-child { margin-top: 0; } md-card > :last-child, md-card-content > :last-child { margin-bottom: 0; } [md-card-image]:first-child { margin-top: -24px; } md-card > md-card-actions:last-child { margin-bottom: -16px; padding-bottom: 0; } md-card-actions [md-button]:first-child, md-card-actions [md-raised-button]:first-child { margin-left: 0; margin-right: 0; } md-card-title:not(:first-child), md-card-subtitle:not(:first-child) { margin-top: -4px; } md-card-header md-card-subtitle:not(:first-child) { margin-top: -8px; } md-card > [md-card-xl-image]:first-child { margin-top: -8px; } md-card > [md-card-xl-image]:last-child { margin-bottom: -8px; } /*# sourceMappingURL=card.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCard);
	    return MdCard;
	}());
	/*  The following components don't have any behavior.
	 They simply use content projection to wrap user content
	 for flex layout purposes in <md-card> (and thus allow a cleaner, boilerplate-free API).
	
	
	<md-card-header> is a component intended to be used within the <md-card> component.
	It adds styles for a preset header section (i.e. a title, subtitle, and avatar layout).
	
	You can see an example of a card with a header here:
	http://embed.plnkr.co/tvJl19z3gZTQd6WmwkIa/
	
	TODO(kara): update link to demo site when it exists
	*/
	var MdCardHeader = (function () {
	    function MdCardHeader() {
	    }
	    MdCardHeader = __decorate$28([
	        _angular_core.Component({selector: 'md-card-header',
	            template: "<ng-content select=\"[md-card-avatar]\"></ng-content> <div class=\"md-card-header-text\"> <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content> </div> <ng-content></ng-content> ",
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardHeader);
	    return MdCardHeader;
	}());
	/*
	
	<md-card-title-group> is a component intended to be used within the <md-card> component.
	It adds styles for a preset layout that groups an image with a title section.
	
	You can see an example of a card with a title-group section here:
	http://embed.plnkr.co/EDfgCF9eKcXjini1WODm/
	
	TODO(kara): update link to demo site when it exists
	*/
	var MdCardTitleGroup = (function () {
	    function MdCardTitleGroup() {
	    }
	    MdCardTitleGroup = __decorate$28([
	        _angular_core.Component({selector: 'md-card-title-group',
	            template: "<div> <ng-content select=\"md-card-title, md-card-subtitle\"></ng-content> </div> <ng-content select=\"img\"></ng-content> <ng-content></ng-content> ",
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardTitleGroup);
	    return MdCardTitleGroup;
	}());
	var MdCardModule = (function () {
	    function MdCardModule() {
	    }
	    MdCardModule.forRoot = function () {
	        return {
	            ngModule: MdCardModule,
	            providers: []
	        };
	    };
	    MdCardModule = __decorate$28([
	        _angular_core.NgModule({
	            exports: [
	                MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
	                MdCardActions, MdCardFooter
	            ],
	            declarations: [
	                MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
	                MdCardActions, MdCardFooter
	            ],
	        }), 
	        __metadata$28('design:paramtypes', [])
	    ], MdCardModule);
	    return MdCardModule;
	}());
	
	var __extends$11 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$30 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$30 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Exception thrown when attempting to load an icon with a name that cannot be found. */
	var MdIconNameNotFoundError = (function (_super) {
	    __extends$11(MdIconNameNotFoundError, _super);
	    function MdIconNameNotFoundError(iconName) {
	        _super.call(this, "Unable to find icon with the name \"" + iconName + "\"");
	    }
	    return MdIconNameNotFoundError;
	}(MdError));
	/**
	 * Exception thrown when attempting to load SVG content that does not contain the expected
	 * <svg> tag.
	 */
	var MdIconSvgTagNotFoundError = (function (_super) {
	    __extends$11(MdIconSvgTagNotFoundError, _super);
	    function MdIconSvgTagNotFoundError() {
	        _super.call(this, '<svg> tag not found');
	    }
	    return MdIconSvgTagNotFoundError;
	}(MdError));
	/** Configuration for an icon, including the URL and possibly the cached SVG element. */
	var SvgIconConfig = (function () {
	    function SvgIconConfig(url) {
	        this.url = url;
	        this.svgElement = null;
	    }
	    return SvgIconConfig;
	}());
	/** Returns the cache key to use for an icon namespace and name. */
	var iconKey = function (namespace, name) { return namespace + ':' + name; };
	/**
	 * Service to register and display icons used by the <md-icon> component.
	 * - Registers icon URLs by namespace and name.
	 * - Registers icon set URLs by namespace.
	 * - Registers aliases for CSS classes, for use with icon fonts.
	 * - Loads icons from URLs and extracts individual icons from icon sets.
	 */
	var MdIconRegistry = (function () {
	    function MdIconRegistry(_http) {
	        this._http = _http;
	        /**
	         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
	         */
	        this._svgIconConfigs = new Map();
	        /**
	         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
	         * Multiple icon sets can be registered under the same namespace.
	         */
	        this._iconSetConfigs = new Map();
	        /** Cache for icons loaded by direct URLs. */
	        this._cachedIconsByUrl = new Map();
	        /** In-progress icon fetches. Used to coalesce multiple requests to the same URL. */
	        this._inProgressUrlFetches = new Map();
	        /** Map from font identifiers to their CSS class names. Used for icon fonts. */
	        this._fontCssClassesByAlias = new Map();
	        /**
	         * The CSS class to apply when an <md-icon> component has no icon name, url, or font specified.
	         * The default 'material-icons' value assumes that the material icon font has been loaded as
	         * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
	         */
	        this._defaultFontSetClass = 'material-icons';
	    }
	    /** Registers an icon by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIcon = function (iconName, url) {
	        return this.addSvgIconInNamespace('', iconName, url);
	    };
	    /** Registers an icon by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconInNamespace = function (namespace, iconName, url) {
	        var key = iconKey(namespace, iconName);
	        this._svgIconConfigs.set(key, new SvgIconConfig(url));
	        return this;
	    };
	    /** Registers an icon set by URL in the default namespace. */
	    MdIconRegistry.prototype.addSvgIconSet = function (url) {
	        return this.addSvgIconSetInNamespace('', url);
	    };
	    /** Registers an icon set by URL in the specified namespace. */
	    MdIconRegistry.prototype.addSvgIconSetInNamespace = function (namespace, url) {
	        var config = new SvgIconConfig(url);
	        if (this._iconSetConfigs.has(namespace)) {
	            this._iconSetConfigs.get(namespace).push(config);
	        }
	        else {
	            this._iconSetConfigs.set(namespace, [config]);
	        }
	        return this;
	    };
	    /**
	     * Defines an alias for a CSS class name to be used for icon fonts. Creating an mdIcon
	     * component with the alias as the fontSet input will cause the class name to be applied
	     * to the <md-icon> element.
	     */
	    MdIconRegistry.prototype.registerFontClassAlias = function (alias, className) {
	        if (className === void 0) { className = alias; }
	        this._fontCssClassesByAlias.set(alias, className);
	        return this;
	    };
	    /**
	     * Returns the CSS class name associated with the alias by a previous call to
	     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
	     */
	    MdIconRegistry.prototype.classNameForFontAlias = function (alias) {
	        return this._fontCssClassesByAlias.get(alias) || alias;
	    };
	    /**
	     * Sets the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.setDefaultFontSetClass = function (className) {
	        this._defaultFontSetClass = className;
	        return this;
	    };
	    /**
	     * Returns the CSS class name to be used for icon fonts when an <md-icon> component does not
	     * have a fontSet input value, and is not loading an icon by name or URL.
	     */
	    MdIconRegistry.prototype.getDefaultFontSetClass = function () {
	        return this._defaultFontSetClass;
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) from the given URL.
	     * The response from the URL may be cached so this will not always cause an HTTP request, but
	     * the produced element will always be a new copy of the originally fetched icon. (That is,
	     * it will not contain any modifications made to elements previously returned).
	     */
	    MdIconRegistry.prototype.getSvgIconFromUrl = function (url) {
	        var _this = this;
	        if (this._cachedIconsByUrl.has(url)) {
	            return rxjs_Observable.Observable.of(cloneSvg(this._cachedIconsByUrl.get(url)));
	        }
	        return this._loadSvgIconFromConfig(new SvgIconConfig(url))
	            .do(function (svg) { return _this._cachedIconsByUrl.set(url, svg); })
	            .map(function (svg) { return cloneSvg(svg); });
	    };
	    /**
	     * Returns an Observable that produces the icon (as an <svg> DOM element) with the given name
	     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
	     * if not, the Observable will throw an MdIconNameNotFoundError.
	     */
	    MdIconRegistry.prototype.getNamedSvgIcon = function (name, namespace) {
	        if (namespace === void 0) { namespace = ''; }
	        // Return (copy of) cached icon if possible.
	        var key = iconKey(namespace, name);
	        if (this._svgIconConfigs.has(key)) {
	            return this._getSvgFromConfig(this._svgIconConfigs.get(key));
	        }
	        // See if we have any icon sets registered for the namespace.
	        var iconSetConfigs = this._iconSetConfigs.get(namespace);
	        if (iconSetConfigs) {
	            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
	        }
	        return rxjs_Observable.Observable.throw(new MdIconNameNotFoundError(key));
	    };
	    /**
	     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
	     */
	    MdIconRegistry.prototype._getSvgFromConfig = function (config) {
	        if (config.svgElement) {
	            // We already have the SVG element for this icon, return a copy.
	            return rxjs_Observable.Observable.of(cloneSvg(config.svgElement));
	        }
	        else {
	            // Fetch the icon from the config's URL, cache it, and return a copy.
	            return this._loadSvgIconFromConfig(config)
	                .do(function (svg) { return config.svgElement = svg; })
	                .map(function (svg) { return cloneSvg(svg); });
	        }
	    };
	    /**
	     * Attempts to find an icon with the specified name in any of the SVG icon sets.
	     * First searches the available cached icons for a nested element with a matching name, and
	     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
	     * that have not been cached, and searches again after all fetches are completed.
	     * The returned Observable produces the SVG element if possible, and throws
	     * MdIconNameNotFoundError if no icon with the specified name can be found.
	     */
	    MdIconRegistry.prototype._getSvgFromIconSetConfigs = function (name, iconSetConfigs) {
	        var _this = this;
	        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
	        // requested name.
	        var namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	        if (namedIcon) {
	            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
	            // time anyway, there's probably not much advantage compared to just always extracting
	            // it from the icon set.
	            return rxjs_Observable.Observable.of(namedIcon);
	        }
	        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
	        // fetched, fetch them now and look for iconName in the results.
	        var iconSetFetchRequests = iconSetConfigs
	            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
	            .map(function (iconSetConfig) {
	            return _this._loadSvgIconSetFromConfig(iconSetConfig)
	                .catch(function (err, caught) {
	                // Swallow errors fetching individual URLs so the combined Observable won't
	                // necessarily fail.
	                console.log("Loading icon set URL: " + iconSetConfig.url + " failed: " + err);
	                return rxjs_Observable.Observable.of(null);
	            })
	                .do(function (svg) {
	                // Cache SVG element.
	                if (svg) {
	                    iconSetConfig.svgElement = svg;
	                }
	            });
	        });
	        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
	        // cached SVG element (unless the request failed), and we can check again for the icon.
	        return rxjs_Observable.Observable.forkJoin(iconSetFetchRequests)
	            .map(function (ignoredResults) {
	            var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
	            if (!foundIcon) {
	                throw new MdIconNameNotFoundError(name);
	            }
	            return foundIcon;
	        });
	    };
	    /**
	     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractIconWithNameFromAnySet = function (iconName, iconSetConfigs) {
	        // Iterate backwards, so icon sets added later have precedence.
	        for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
	            var config = iconSetConfigs[i];
	            if (config.svgElement) {
	                var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName, config);
	                if (foundIcon) {
	                    return foundIcon;
	                }
	            }
	        }
	        return null;
	    };
	    /**
	     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconFromConfig = function (config) {
	        var _this = this;
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText, config); });
	    };
	    /**
	     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
	     * from it.
	     */
	    MdIconRegistry.prototype._loadSvgIconSetFromConfig = function (config) {
	        var _this = this;
	        // TODO: Document that icons should only be loaded from trusted sources.
	        return this._fetchUrl(config.url)
	            .map(function (svgText) { return _this._svgElementFromString(svgText); });
	    };
	    /**
	     * Creates a DOM element from the given SVG string, and adds default attributes.
	     */
	    MdIconRegistry.prototype._createSvgElementForSingleIcon = function (responseText, config) {
	        var svg = this._svgElementFromString(responseText);
	        this._setSvgAttributes(svg, config);
	        return svg;
	    };
	    /**
	     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
	     * tag matches the specified name. If found, copies the nested element to a new SVG element and
	     * returns it. Returns null if no matching element is found.
	     */
	    MdIconRegistry.prototype._extractSvgIconFromSet = function (iconSet, iconName, config) {
	        var iconNode = iconSet.querySelector('#' + iconName);
	        if (!iconNode) {
	            return null;
	        }
	        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
	        // the content of a new <svg> node.
	        if (iconNode.tagName.toLowerCase() == 'svg') {
	            return this._setSvgAttributes(iconNode.cloneNode(true), config);
	        }
	        // createElement('SVG') doesn't work as expected; the DOM ends up with
	        // the correct nodes, but the SVG content doesn't render. Instead we
	        // have to create an empty SVG node using innerHTML and append its content.
	        // Elements created using DOMParser.parseFromString have the same problem.
	        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
	        var svg = this._svgElementFromString('<svg></svg>');
	        // Clone the node so we don't remove it from the parent icon set element.
	        svg.appendChild(iconNode.cloneNode(true));
	        return this._setSvgAttributes(svg, config);
	    };
	    /**
	     * Creates a DOM element from the given SVG string.
	     */
	    MdIconRegistry.prototype._svgElementFromString = function (str) {
	        // TODO: Is there a better way than innerHTML? Renderer doesn't appear to have a method for
	        // creating an element from an HTML string.
	        var div = document.createElement('DIV');
	        div.innerHTML = str;
	        var svg = div.querySelector('svg');
	        if (!svg) {
	            throw new MdIconSvgTagNotFoundError();
	        }
	        return svg;
	    };
	    /**
	     * Sets the default attributes for an SVG element to be used as an icon.
	     */
	    MdIconRegistry.prototype._setSvgAttributes = function (svg, config) {
	        if (!svg.getAttribute('xmlns')) {
	            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	        }
	        svg.setAttribute('fit', '');
	        svg.setAttribute('height', '100%');
	        svg.setAttribute('width', '100%');
	        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
	        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
	        return svg;
	    };
	    /**
	     * Returns an Observable which produces the string contents of the given URL. Results may be
	     * cached, so future calls with the same URL may not cause another HTTP request.
	     */
	    MdIconRegistry.prototype._fetchUrl = function (url) {
	        var _this = this;
	        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
	        // already a request in progress for that URL. It's necessary to call share() on the
	        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
	        if (this._inProgressUrlFetches.has(url)) {
	            return this._inProgressUrlFetches.get(url);
	        }
	        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
	        // Observable. Figure out why and fix it.
	        var req = this._http.get(url)
	            .map(function (response) { return response.text(); })
	            .finally(function () {
	            _this._inProgressUrlFetches.delete(url);
	        })
	            .share();
	        this._inProgressUrlFetches.set(url, req);
	        return req;
	    };
	    MdIconRegistry = __decorate$30([
	        _angular_core.Injectable(), 
	        __metadata$30('design:paramtypes', [_angular_http.Http])
	    ], MdIconRegistry);
	    return MdIconRegistry;
	}());
	/** Clones an SVGElement while preserving type information. */
	function cloneSvg(svg) {
	    return svg.cloneNode(true);
	}
	
	var __extends$10 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$29 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Exception thrown when an invalid icon name is passed to an md-icon component. */
	var MdIconInvalidNameError = (function (_super) {
	    __extends$10(MdIconInvalidNameError, _super);
	    function MdIconInvalidNameError(iconName) {
	        _super.call(this, "Invalid icon name: \"" + iconName + "\"");
	    }
	    return MdIconInvalidNameError;
	}(MdError));
	/**
	 * Component to display an icon. It can be used in the following ways:
	 * - Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined
	 *   as a child of the <md-icon> component, so that CSS styles can easily be applied to it.
	 *   The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its
	 *   server must be configured to allow cross-domain requests.
	 *   Example:
	 *     <md-icon svgSrc="assets/arrow.svg"></md-icon>
	 *
	 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
	 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
	 *   MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
	 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
	 *   Examples:
	 *     <md-icon svgIcon="left-arrow"></md-icon>
	 *     <md-icon svgIcon="animals:cat"></md-icon>
	 *
	 * - Use a font ligature as an icon by putting the ligature text in the content of the <md-icon>
	 *   component. By default the Material icons font is used as described at
	 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
	 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
	 *   desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
	 *   Examples:
	 *     <md-icon>home</md-icon>
	 *     <md-icon fontSet="myfont">sun</md-icon>
	 *
	 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
	 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
	 *   CSS class which causes the glyph to be displayed via a :before selector, as in
	 *   https://fortawesome.github.io/Font-Awesome/examples/
	 *   Example:
	 *     <md-icon fontSet="fa" fontIcon="alarm"></md-icon>
	 */
	var MdIcon = (function () {
	    function MdIcon(_element, _renderer, _mdIconRegistry) {
	        this._element = _element;
	        this._renderer = _renderer;
	        this._mdIconRegistry = _mdIconRegistry;
	        this.hostAriaLabel = '';
	    }
	    /**
	     * Splits an svgIcon binding value into its icon set and icon name components.
	     * Returns a 2-element array of [(icon set), (icon name)].
	     * The separator for the two fields is ':'. If there is no separator, an empty
	     * string is returned for the icon set and the entire value is returned for
	     * the icon name. If the argument is falsy, returns an array of two empty strings.
	     * Throws a MdIconInvalidNameError if the name contains two or more ':' separators.
	     * Examples:
	     *   'social:cake' -> ['social', 'cake']
	     *   'penguin' -> ['', 'penguin']
	     *   null -> ['', '']
	     *   'a:b:c' -> (throws MdIconInvalidNameError)
	     */
	    MdIcon.prototype._splitIconName = function (iconName) {
	        if (!iconName) {
	            return ['', ''];
	        }
	        var parts = iconName.split(':');
	        switch (parts.length) {
	            case 1:
	                // Use default namespace.
	                return ['', parts[0]];
	            case 2:
	                return parts;
	            default:
	                throw new MdIconInvalidNameError(iconName);
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        var changedInputs = Object.keys(changes);
	        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
	        if (changedInputs.indexOf('svgIcon') != -1 || changedInputs.indexOf('svgSrc') != -1) {
	            if (this.svgIcon) {
	                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
	                this._mdIconRegistry.getNamedSvgIcon(iconName, namespace).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	            else if (this.svgSrc) {
	                this._mdIconRegistry.getSvgIconFromUrl(this.svgSrc).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err); });
	            }
	        }
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	        this._updateAriaLabel();
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngOnInit = function () {
	        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
	        // e.g. <md-icon>arrow</md-icon>. In this case we need to add a CSS class for the default font.
	        if (this._usingFontIcon()) {
	            this._updateFontIconClasses();
	        }
	    };
	    /** TODO: internal */
	    MdIcon.prototype.ngAfterViewChecked = function () {
	        // Update aria label here because it may depend on the projected text content.
	        // (e.g. <md-icon>home</md-icon> should use 'home').
	        this._updateAriaLabel();
	    };
	    MdIcon.prototype._updateAriaLabel = function () {
	        var ariaLabel = this._getAriaLabel();
	        if (ariaLabel) {
	            this._renderer.setElementAttribute(this._element.nativeElement, 'aria-label', ariaLabel);
	        }
	    };
	    MdIcon.prototype._getAriaLabel = function () {
	        // If the parent provided an aria-label attribute value, use it as-is. Otherwise look for a
	        // reasonable value from the alt attribute, font icon name, SVG icon name, or (for ligatures)
	        // the text content of the directive.
	        var label = this.hostAriaLabel ||
	            this.alt ||
	            this.fontIcon ||
	            this._splitIconName(this.svgIcon)[1];
	        if (label) {
	            return label;
	        }
	        // The "content" of an SVG icon is not a useful label.
	        if (this._usingFontIcon()) {
	            var text = this._element.nativeElement.textContent;
	            if (text) {
	                return text;
	            }
	        }
	        // TODO: Warn here in dev mode.
	        return null;
	    };
	    MdIcon.prototype._usingFontIcon = function () {
	        return !(this.svgIcon || this.svgSrc);
	    };
	    MdIcon.prototype._setSvgElement = function (svg) {
	        var layoutElement = this._element.nativeElement;
	        // Remove existing child nodes and add the new SVG element.
	        // We would use renderer.detachView(Array.from(layoutElement.childNodes)) here,
	        // but it fails in IE11: https://github.com/angular/angular/issues/6327
	        layoutElement.innerHTML = '';
	        this._renderer.projectNodes(layoutElement, [svg]);
	    };
	    MdIcon.prototype._updateFontIconClasses = function () {
	        if (!this._usingFontIcon()) {
	            return;
	        }
	        var elem = this._element.nativeElement;
	        var fontSetClass = this.fontSet ?
	            this._mdIconRegistry.classNameForFontAlias(this.fontSet) :
	            this._mdIconRegistry.getDefaultFontSetClass();
	        if (fontSetClass != this._previousFontSetClass) {
	            if (this._previousFontSetClass) {
	                this._renderer.setElementClass(elem, this._previousFontSetClass, false);
	            }
	            if (fontSetClass) {
	                this._renderer.setElementClass(elem, fontSetClass, true);
	            }
	            this._previousFontSetClass = fontSetClass;
	        }
	        if (this.fontIcon != this._previousFontIconClass) {
	            if (this._previousFontIconClass) {
	                this._renderer.setElementClass(elem, this._previousFontIconClass, false);
	            }
	            if (this.fontIcon) {
	                this._renderer.setElementClass(elem, this.fontIcon, true);
	            }
	            this._previousFontIconClass = this.fontIcon;
	        }
	    };
	    __decorate$29([
	        _angular_core.Input(), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "svgSrc", void 0);
	    __decorate$29([
	        _angular_core.Input(), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "svgIcon", void 0);
	    __decorate$29([
	        _angular_core.Input(), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "fontSet", void 0);
	    __decorate$29([
	        _angular_core.Input(), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "fontIcon", void 0);
	    __decorate$29([
	        _angular_core.Input(), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "alt", void 0);
	    __decorate$29([
	        _angular_core.Input('aria-label'), 
	        __metadata$29('design:type', String)
	    ], MdIcon.prototype, "hostAriaLabel", void 0);
	    MdIcon = __decorate$29([
	        _angular_core.Component({template: '<ng-content></ng-content>',
	            selector: 'md-icon',
	            styles: ["md-icon { background-repeat: no-repeat; display: inline-block; fill: currentColor; height: 24px; width: 24px; } /*# sourceMappingURL=icon.css.map */ "],
	            host: {
	                'role': 'img',
	            },
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$29('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer, MdIconRegistry])
	    ], MdIcon);
	    return MdIcon;
	}());
	var MdIconModule = (function () {
	    function MdIconModule() {
	    }
	    MdIconModule.forRoot = function () {
	        return {
	            ngModule: MdIconModule,
	            providers: [MdIconRegistry],
	        };
	    };
	    MdIconModule = __decorate$29([
	        _angular_core.NgModule({
	            imports: [_angular_http.HttpModule],
	            exports: [MdIcon],
	            declarations: [MdIcon],
	        }), 
	        __metadata$29('design:paramtypes', [])
	    ], MdIconModule);
	    return MdIconModule;
	}());
	
	var __extends$12 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$31 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$31 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(josephperrott): Benchpress tests.
	/** A single degree in radians. */
	var DEGREE_IN_RADIANS = Math.PI / 180;
	/** Duration of the indeterminate animation. */
	var DURATION_INDETERMINATE = 667;
	/** Duration of the indeterminate animation. */
	var DURATION_DETERMINATE = 225;
	/** Start animation value of the indeterminate animation */
	var startIndeterminate = 3;
	/** End animation value of the indeterminate animation */
	var endIndeterminate = 80;
	/**
	 * <md-progress-circle> component.
	 */
	var MdProgressCircle = (function () {
	    function MdProgressCircle(_changeDetectorRef) {
	        this._changeDetectorRef = _changeDetectorRef;
	        /** The id of the last requested animation. */
	        this._lastAnimationId = 0;
	        this._mode = 'determinate';
	    }
	    Object.defineProperty(MdProgressCircle.prototype, "_ariaValueMin", {
	        /**
	         * Values for aria max and min are only defined as numbers when in a determinate mode.  We do this
	         * because voiceover does not report the progress indicator as indeterminate if the aria min
	         * and/or max value are number values.
	         */
	        get: function () {
	            return this.mode == 'determinate' ? 0 : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdProgressCircle.prototype, "_ariaValueMax", {
	        get: function () {
	            return this.mode == 'determinate' ? 100 : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdProgressCircle.prototype, "interdeterminateInterval", {
	        /** TODO: internal */
	        get: function () {
	            return this._interdeterminateInterval;
	        },
	        /** TODO: internal */
	        set: function (interval) {
	            clearInterval(this._interdeterminateInterval);
	            this._interdeterminateInterval = interval;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdProgressCircle.prototype, "currentPath", {
	        /** TODO: internal */
	        get: function () {
	            return this._currentPath;
	        },
	        set: function (path) {
	            this._currentPath = path;
	            // Mark for check as our ChangeDetectionStrategy is OnPush, when changes come from within the
	            // component, change detection must be called for.
	            this._changeDetectorRef.markForCheck();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Clean up any animations that were running. */
	    MdProgressCircle.prototype.ngOnDestroy = function () {
	        this._cleanupIndeterminateAnimation();
	    };
	    Object.defineProperty(MdProgressCircle.prototype, "value", {
	        get: function () {
	            if (this.mode == 'determinate') {
	                return this._value;
	            }
	        },
	        set: function (v) {
	            if (v && this.mode == 'determinate') {
	                var newValue = clamp(v);
	                this._animateCircle((this.value || 0), newValue, linearEase, DURATION_DETERMINATE, 0);
	                this._value = newValue;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdProgressCircle.prototype, "mode", {
	        /**
	         * Mode of the progress circle
	         *
	         * Input must be one of the values from ProgressMode, defaults to 'determinate'.
	         * mode is bound to the host as the attribute host.
	         */
	        get: function () {
	            return this._mode;
	        },
	        set: function (m) {
	            if (m == 'indeterminate') {
	                this._startIndeterminateAnimation();
	            }
	            else {
	                this._cleanupIndeterminateAnimation();
	            }
	            this._mode = m;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Animates the circle from one percentage value to another.
	     *
	     * @param animateFrom The percentage of the circle filled starting the animation.
	     * @param animateTo The percentage of the circle filled ending the animation.
	     * @param ease The easing function to manage the pace of change in the animation.
	     * @param duration The length of time to show the animation, in milliseconds.
	     * @param rotation The starting angle of the circle fill, with 0° represented at the top center
	     *    of the circle.
	     */
	    MdProgressCircle.prototype._animateCircle = function (animateFrom, animateTo, ease, duration, rotation) {
	        var _this = this;
	        var id = ++this._lastAnimationId;
	        var startTime = Date.now();
	        var changeInValue = animateTo - animateFrom;
	        // No need to animate it if the values are the same
	        if (animateTo === animateFrom) {
	            this.currentPath = getSvgArc(animateTo, rotation);
	        }
	        else {
	            var animation_1 = function () {
	                var elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));
	                _this.currentPath = getSvgArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
	                // Prevent overlapping animations by checking if a new animation has been called for and
	                // if the animation has lasted long than the animation duration.
	                if (id === _this._lastAnimationId && elapsedTime < duration) {
	                    requestAnimationFrame(animation_1);
	                }
	            };
	            requestAnimationFrame(animation_1);
	        }
	    };
	    /**
	     * Starts the indeterminate animation interval, if it is not already running.
	     */
	    MdProgressCircle.prototype._startIndeterminateAnimation = function () {
	        var _this = this;
	        var rotationStartPoint = 0;
	        var start = startIndeterminate;
	        var end = endIndeterminate;
	        var duration = DURATION_INDETERMINATE;
	        var animate = function () {
	            _this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
	            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
	            rotationStartPoint = (rotationStartPoint + end) % 100;
	            var temp = start;
	            start = -end;
	            end = -temp;
	        };
	        if (!this.interdeterminateInterval) {
	            this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
	            animate();
	        }
	    };
	    /**
	     * Removes interval, ending the animation.
	     */
	    MdProgressCircle.prototype._cleanupIndeterminateAnimation = function () {
	        this.interdeterminateInterval = null;
	    };
	    __decorate$31([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.aria-valuenow'), 
	        __metadata$31('design:type', Object)
	    ], MdProgressCircle.prototype, "value", null);
	    __decorate$31([
	        _angular_core.HostBinding('attr.mode'),
	        _angular_core.Input(), 
	        __metadata$31('design:type', Object)
	    ], MdProgressCircle.prototype, "mode", null);
	    MdProgressCircle = __decorate$31([
	        _angular_core.Component({selector: 'md-progress-circle',
	            host: {
	                'role': 'progressbar',
	                '[attr.aria-valuemin]': '_ariaValueMin',
	                '[attr.aria-valuemax]': '_ariaValueMax',
	            },
	            template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center.  The center of the circle with remain at the center of the md-progress-circle element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path [attr.d]=\"currentPath\"></path> </svg> ",
	            styles: [":host { display: block; height: 100px; width: 100px; } :host svg { height: 100%; width: 100%; transform-origin: center; } :host path { fill: transparent; stroke-width: 10px; } :host[mode='indeterminate'] { animation-duration: 5250ms, 2887.5ms; animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; animation-iteration-count: infinite; transition: none; } @keyframes md-progress-circle-linear-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } @keyframes md-progress-circle-sporadic-rotate { 12.5% { transform: rotate(135deg); } 25% { transform: rotate(270deg); } 37.5% { transform: rotate(405deg); } 50% { transform: rotate(540deg); } 62.5% { transform: rotate(675deg); } 75% { transform: rotate(810deg); } 87.5% { transform: rotate(945deg); } 100% { transform: rotate(1080deg); } } /*# sourceMappingURL=progress-circle.css.map */ "],
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$31('design:paramtypes', [_angular_core.ChangeDetectorRef])
	    ], MdProgressCircle);
	    return MdProgressCircle;
	}());
	/**
	 * <md-spinner> component.
	 *
	 * This is a component definition to be used as a convenience reference to create an
	 * indeterminate <md-progress-circle> instance.
	 */
	var MdSpinner = (function (_super) {
	    __extends$12(MdSpinner, _super);
	    function MdSpinner(changeDetectorRef) {
	        _super.call(this, changeDetectorRef);
	        this.mode = 'indeterminate';
	    }
	    MdSpinner = __decorate$31([
	        _angular_core.Component({selector: 'md-spinner',
	            host: {
	                'role': 'progressbar',
	                'mode': 'indeterminate',
	            },
	            template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center.  The center of the circle with remain at the center of the md-progress-circle element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path [attr.d]=\"currentPath\"></path> </svg> ",
	            styles: [":host { display: block; height: 100px; width: 100px; } :host svg { height: 100%; width: 100%; transform-origin: center; } :host path { fill: transparent; stroke-width: 10px; } :host[mode='indeterminate'] { animation-duration: 5250ms, 2887.5ms; animation-name: md-progress-circle-sporadic-rotate, md-progress-circle-linear-rotate; animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1), linear; animation-iteration-count: infinite; transition: none; } @keyframes md-progress-circle-linear-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } @keyframes md-progress-circle-sporadic-rotate { 12.5% { transform: rotate(135deg); } 25% { transform: rotate(270deg); } 37.5% { transform: rotate(405deg); } 50% { transform: rotate(540deg); } 62.5% { transform: rotate(675deg); } 75% { transform: rotate(810deg); } 87.5% { transform: rotate(945deg); } 100% { transform: rotate(1080deg); } } /*# sourceMappingURL=progress-circle.css.map */ "],
	        }), 
	        __metadata$31('design:paramtypes', [_angular_core.ChangeDetectorRef])
	    ], MdSpinner);
	    return MdSpinner;
	}(MdProgressCircle));
	/**
	 * Module functions.
	 */
	/** Clamps a value to be between 0 and 100. */
	function clamp(v) {
	    return Math.max(0, Math.min(100, v));
	}
	/**
	 * Converts Polar coordinates to Cartesian.
	 */
	function polarToCartesian(radius, pathRadius, angleInDegrees) {
	    var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
	    return (radius + (pathRadius * Math.cos(angleInRadians))) +
	        ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
	}
	/**
	 * Easing function for linear animation.
	 */
	function linearEase(currentTime, startValue, changeInValue, duration) {
	    return changeInValue * currentTime / duration + startValue;
	}
	/**
	 * Easing function to match material design indeterminate animation.
	 */
	function materialEase(currentTime, startValue, changeInValue, duration) {
	    var time = currentTime / duration;
	    var timeCubed = Math.pow(time, 3);
	    var timeQuad = Math.pow(time, 4);
	    var timeQuint = Math.pow(time, 5);
	    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
	}
	/**
	 * Determines the path value to define the arc.  Converting percentage values to to polar
	 * coordinates on the circle, and then to cartesian coordinates in the viewport.
	 *
	 * @param currentValue The current percentage value of the progress circle, the percentage of the
	 *    circle to fill.
	 * @param rotation The starting point of the circle with 0 being the 0 degree point.
	 * @return A string for an SVG path representing a circle filled from the starting point to the
	 *    percentage value provided.
	 */
	function getSvgArc(currentValue, rotation) {
	    // The angle can't be exactly 360, because the arc becomes hidden.
	    var maximumAngle = 359.99 / 100;
	    var startPoint = rotation || 0;
	    var radius = 50;
	    var pathRadius = 40;
	    var startAngle = startPoint * maximumAngle;
	    var endAngle = currentValue * maximumAngle;
	    var start = polarToCartesian(radius, pathRadius, startAngle);
	    var end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
	    var arcSweep = endAngle < 0 ? 0 : 1;
	    var largeArcFlag;
	    if (endAngle < 0) {
	        largeArcFlag = endAngle >= -180 ? 0 : 1;
	    }
	    else {
	        largeArcFlag = endAngle <= 180 ? 0 : 1;
	    }
	    return "M" + start + "A" + pathRadius + "," + pathRadius + " 0 " + largeArcFlag + "," + arcSweep + " " + end;
	}
	var MdProgressCircleModule = (function () {
	    function MdProgressCircleModule() {
	    }
	    MdProgressCircleModule.forRoot = function () {
	        return {
	            ngModule: MdProgressCircleModule,
	            providers: []
	        };
	    };
	    MdProgressCircleModule = __decorate$31([
	        _angular_core.NgModule({
	            exports: [MdProgressCircle, MdSpinner],
	            declarations: [MdProgressCircle, MdSpinner],
	        }), 
	        __metadata$31('design:paramtypes', [])
	    ], MdProgressCircleModule);
	    return MdProgressCircleModule;
	}());
	
	var __decorate$32 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$32 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(josephperrott): Benchpress tests.
	// TODO(josephperrott): Add ARIA attributes for progressbar "for".
	/**
	 * <md-progress-bar> component.
	 */
	var MdProgressBar = (function () {
	    function MdProgressBar() {
	        /** Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow. */
	        this._value = 0;
	        /** Buffer value of the progress bar. Defaults to zero. */
	        this._bufferValue = 0;
	        /**
	         * Mode of the progress bar.
	         *
	         * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
	         * 'determinate'.
	         * Mirrored to mode attribute.
	         */
	        this.mode = 'determinate';
	    }
	    Object.defineProperty(MdProgressBar.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (v) {
	            this._value = clamp$1(v || 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdProgressBar.prototype, "bufferValue", {
	        get: function () {
	            return this._bufferValue;
	        },
	        set: function (v) {
	            this._bufferValue = clamp$1(v || 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Gets the current transform value for the progress bar's primary indicator. */
	    MdProgressBar.prototype._primaryTransform = function () {
	        var scale = this.value / 100;
	        return { transform: "scaleX(" + scale + ")" };
	    };
	    /**
	     * Gets the current transform value for the progress bar's buffer indicator.  Only used if the
	     * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
	     */
	    MdProgressBar.prototype._bufferTransform = function () {
	        if (this.mode == 'buffer') {
	            var scale = this.bufferValue / 100;
	            return { transform: "scaleX(" + scale + ")" };
	        }
	    };
	    __decorate$32([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.aria-valuenow'), 
	        __metadata$32('design:type', Object)
	    ], MdProgressBar.prototype, "value", null);
	    __decorate$32([
	        _angular_core.Input(), 
	        __metadata$32('design:type', Object)
	    ], MdProgressBar.prototype, "bufferValue", null);
	    __decorate$32([
	        _angular_core.Input(),
	        _angular_core.HostBinding('attr.mode'), 
	        __metadata$32('design:type', Object)
	    ], MdProgressBar.prototype, "mode", void 0);
	    MdProgressBar = __decorate$32([
	        _angular_core.Component({selector: 'md-progress-bar',
	            host: {
	                'role': 'progressbar',
	                'aria-valuemin': '0',
	                'aria-valuemax': '100',
	            },
	            template: "<!-- The background div is named as such because it appears below the other divs and is not sized based on values. --> <div class=\"md-progress-bar-background\"></div> <div class=\"md-progress-bar-buffer\" [ngStyle]=\"_bufferTransform()\"></div> <div class=\"md-progress-bar-primary md-progress-bar-fill\" [ngStyle]=\"_primaryTransform()\"></div> <div class=\"md-progress-bar-secondary md-progress-bar-fill\"></div> ",
	            styles: [":host { display: block; height: 5px; overflow: hidden; position: relative; transform: translateZ(0); transition: opacity 250ms linear; width: 100%; } :host .md-progress-bar-background { background-repeat: repeat-x; background-size: 10px 4px; height: 100%; position: absolute; visibility: hidden; width: 100%; } :host .md-progress-bar-buffer { height: 100%; position: absolute; transform-origin: top left; transition: transform 250ms ease; width: 100%; } :host .md-progress-bar-secondary { visibility: hidden; } :host .md-progress-bar-fill { animation: none; height: 100%; position: absolute; transform-origin: top left; transition: transform 250ms ease; width: 100%; } :host .md-progress-bar-fill::after { animation: none; content: ''; display: inline-block; height: 100%; position: absolute; width: 100%; } :host[mode='query'] { transform: rotateZ(180deg); } :host[mode='indeterminate'] .md-progress-bar-fill, :host[mode='query'] .md-progress-bar-fill { transition: none; } :host[mode='indeterminate'] .md-progress-bar-primary, :host[mode='query'] .md-progress-bar-primary { animation: md-progress-bar-primary-indeterminate-translate 2000ms infinite linear; left: -145.166611%; } :host[mode='indeterminate'] .md-progress-bar-primary.md-progress-bar-fill::after, :host[mode='query'] .md-progress-bar-primary.md-progress-bar-fill::after { animation: md-progress-bar-primary-indeterminate-scale 2000ms infinite linear; } :host[mode='indeterminate'] .md-progress-bar-secondary, :host[mode='query'] .md-progress-bar-secondary { animation: md-progress-bar-secondary-indeterminate-translate 2000ms infinite linear; left: -54.888891%; visibility: visible; } :host[mode='indeterminate'] .md-progress-bar-secondary.md-progress-bar-fill::after, :host[mode='query'] .md-progress-bar-secondary.md-progress-bar-fill::after { animation: md-progress-bar-secondary-indeterminate-scale 2000ms infinite linear; } :host[mode='buffer'] .md-progress-bar-background { animation: md-progress-bar-background-scroll 250ms infinite linear; visibility: visible; } :host-context([dir='rtl']) { transform: rotateY(180deg); } @keyframes md-progress-bar-primary-indeterminate-translate { 0% { transform: translateX(0); } 20% { animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582); transform: translateX(0); } 59.15% { animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635); transform: translateX(83.67142%); } 100% { transform: translateX(200.61106%); } } @keyframes md-progress-bar-primary-indeterminate-scale { 0% { transform: scaleX(0.08); } 36.65% { animation-timing-function: cubic-bezier(0.33473, 0.12482, 0.78584, 1); transform: scaleX(0.08); } 69.15% { animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1); transform: scaleX(0.66148); } 100% { transform: scaleX(0.08); } } @keyframes md-progress-bar-secondary-indeterminate-translate { 0% { animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969); transform: translateX(0); } 25% { animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371); transform: translateX(37.65191%); } 48.35% { animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203); transform: translateX(84.38617%); } 100% { transform: translateX(160.27778%); } } @keyframes md-progress-bar-secondary-indeterminate-scale { 0% { animation-timing-function: cubic-bezier(0.15, 0, 0.51506, 0.40969); transform: scaleX(0.08); } 19.15% { animation-timing-function: cubic-bezier(0.31033, 0.28406, 0.8, 0.73371); transform: scaleX(0.4571); } 44.15% { animation-timing-function: cubic-bezier(0.4, 0.62704, 0.6, 0.90203); transform: scaleX(0.72796); } 100% { transform: scaleX(0.08); } } @keyframes md-progress-bar-background-scroll { to { transform: translateX(-10px); } } /*# sourceMappingURL=progress-bar.css.map */ "],
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	        }), 
	        __metadata$32('design:paramtypes', [])
	    ], MdProgressBar);
	    return MdProgressBar;
	}());
	/** Clamps a value to be between two numbers, by default 0 and 100. */
	function clamp$1(v, min, max) {
	    if (min === void 0) { min = 0; }
	    if (max === void 0) { max = 100; }
	    return Math.max(min, Math.min(max, v));
	}
	var MdProgressBarModule = (function () {
	    function MdProgressBarModule() {
	    }
	    MdProgressBarModule.forRoot = function () {
	        return {
	            ngModule: MdProgressBarModule,
	            providers: []
	        };
	    };
	    MdProgressBarModule = __decorate$32([
	        _angular_core.NgModule({
	            imports: [_angular_common.CommonModule],
	            exports: [MdProgressBar],
	            declarations: [MdProgressBar],
	        }), 
	        __metadata$32('design:paramtypes', [])
	    ], MdProgressBarModule);
	    return MdProgressBarModule;
	}());
	
	var __extends$13 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$33 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$33 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var noop = function () { };
	var MD_INPUT_CONTROL_VALUE_ACCESSOR = {
	    provide: _angular_forms.NG_VALUE_ACCESSOR,
	    useExisting: _angular_core.forwardRef(function () { return MdInput; }),
	    multi: true
	};
	// Invalid input type. Using one of these will throw an MdInputUnsupportedTypeError.
	var MD_INPUT_INVALID_INPUT_TYPE = [
	    'file',
	    'radio',
	    'checkbox',
	];
	var nextUniqueId$1 = 0;
	var MdInputPlaceholderConflictError = (function (_super) {
	    __extends$13(MdInputPlaceholderConflictError, _super);
	    function MdInputPlaceholderConflictError() {
	        _super.call(this, 'Placeholder attribute and child element were both specified.');
	    }
	    return MdInputPlaceholderConflictError;
	}(MdError));
	var MdInputUnsupportedTypeError = (function (_super) {
	    __extends$13(MdInputUnsupportedTypeError, _super);
	    function MdInputUnsupportedTypeError(type) {
	        _super.call(this, "Input type \"" + type + "\" isn't supported by md-input.");
	    }
	    return MdInputUnsupportedTypeError;
	}(MdError));
	var MdInputDuplicatedHintError = (function (_super) {
	    __extends$13(MdInputDuplicatedHintError, _super);
	    function MdInputDuplicatedHintError(align) {
	        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
	    }
	    return MdInputDuplicatedHintError;
	}(MdError));
	/**
	 * The placeholder directive. The content can declare this to implement more
	 * complex placeholders.
	 */
	var MdPlaceholder = (function () {
	    function MdPlaceholder() {
	    }
	    MdPlaceholder = __decorate$33([
	        _angular_core.Directive({
	            selector: 'md-placeholder'
	        }), 
	        __metadata$33('design:paramtypes', [])
	    ], MdPlaceholder);
	    return MdPlaceholder;
	}());
	/** The hint directive, used to tag content as hint labels (going under the input). */
	var MdHint = (function () {
	    function MdHint() {
	        // Whether to align the hint label at the start or end of the line.
	        this.align = 'start';
	    }
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdHint.prototype, "align", void 0);
	    MdHint = __decorate$33([
	        _angular_core.Directive({
	            selector: 'md-hint',
	            host: {
	                '[class.md-right]': 'align == "end"',
	                '[class.md-hint]': 'true'
	            }
	        }), 
	        __metadata$33('design:paramtypes', [])
	    ], MdHint);
	    return MdHint;
	}());
	/**
	 * Component that represents a text input. It encapsulates the <input> HTMLElement and
	 * improve on its behaviour, along with styling it according to the Material Design.
	 */
	var MdInput = (function () {
	    function MdInput() {
	        this._focused = false;
	        this._value = '';
	        /** Callback registered via registerOnTouched (ControlValueAccessor) */
	        this._onTouchedCallback = noop;
	        /** Callback registered via registerOnChange (ControlValueAccessor) */
	        this._onChangeCallback = noop;
	        /**
	         * Bindings.
	         */
	        this.align = 'start';
	        this.dividerColor = 'primary';
	        this.floatingPlaceholder = true;
	        this.hintLabel = '';
	        this.autofocus = false;
	        this.disabled = false;
	        this.id = "md-input-" + nextUniqueId$1++;
	        this.list = null;
	        this.max = null;
	        this.maxlength = null;
	        this.min = null;
	        this.minlength = null;
	        this.placeholder = null;
	        this.readonly = false;
	        this.required = false;
	        this.spellcheck = false;
	        this.step = null;
	        this.tabindex = null;
	        this.type = 'text';
	        this.name = null;
	        this._blurEmitter = new _angular_core.EventEmitter();
	        this._focusEmitter = new _angular_core.EventEmitter();
	    }
	    Object.defineProperty(MdInput.prototype, "focused", {
	        /** Readonly properties. */
	        get: function () { return this._focused; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "empty", {
	        get: function () { return (this._value == null || this._value === '') && this.type !== 'date'; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "characterCount", {
	        get: function () {
	            return this.empty ? 0 : ('' + this._value).length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "inputId", {
	        get: function () { return this.id + "-input"; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "onBlur", {
	        get: function () {
	            return this._blurEmitter.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "onFocus", {
	        get: function () {
	            return this._focusEmitter.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "value", {
	        get: function () { return this._value; },
	        set: function (v) {
	            v = this._convertValueForInputType(v);
	            if (v !== this._value) {
	                this._value = v;
	                this._onChangeCallback(v);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(MdInput.prototype, "_align", {
	        // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
	        // might place it as RTL when we don't want to. We still want to use `align` as an
	        // Input though, so we use HostBinding.
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    /** Set focus on input */
	    MdInput.prototype.focus = function () {
	        this._inputElement.nativeElement.focus();
	    };
	    MdInput.prototype._handleFocus = function (event) {
	        this._focused = true;
	        this._focusEmitter.emit(event);
	    };
	    MdInput.prototype._handleBlur = function (event) {
	        this._focused = false;
	        this._onTouchedCallback();
	        this._blurEmitter.emit(event);
	    };
	    MdInput.prototype._handleChange = function (event) {
	        this.value = event.target.value;
	        this._onTouchedCallback();
	    };
	    MdInput.prototype._hasPlaceholder = function () {
	        return !!this.placeholder || this._placeholderChild != null;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdInput.prototype.writeValue = function (value) {
	        this._value = value;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdInput.prototype.registerOnChange = function (fn) {
	        this._onChangeCallback = fn;
	    };
	    /**
	     * Implemented as part of ControlValueAccessor.
	     * TODO: internal
	     */
	    MdInput.prototype.registerOnTouched = function (fn) {
	        this._onTouchedCallback = fn;
	    };
	    /** TODO: internal */
	    MdInput.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        this._validateConstraints();
	        // Trigger validation when the hint children change.
	        this._hintChildren.changes.subscribe(function () {
	            _this._validateConstraints();
	        });
	    };
	    /** TODO: internal */
	    MdInput.prototype.ngOnChanges = function (changes) {
	        this._validateConstraints();
	    };
	    /**
	     * Convert the value passed in to a value that is expected from the type of the md-input.
	     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
	     * on our internal input it won't work locally.
	     * @private
	     */
	    MdInput.prototype._convertValueForInputType = function (v) {
	        switch (this.type) {
	            case 'number': return parseFloat(v);
	            default: return v;
	        }
	    };
	    /**
	     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
	     * Constraints for now:
	     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
	     *   - type attribute is not one of the forbidden types (see constant at the top).
	     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
	     *     considered as align="start".
	     * @private
	     */
	    MdInput.prototype._validateConstraints = function () {
	        var _this = this;
	        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
	            throw new MdInputPlaceholderConflictError();
	        }
	        if (MD_INPUT_INVALID_INPUT_TYPE.indexOf(this.type) != -1) {
	            throw new MdInputUnsupportedTypeError(this.type);
	        }
	        if (this._hintChildren) {
	            // Validate the hint labels.
	            var startHint_1 = null;
	            var endHint_1 = null;
	            this._hintChildren.forEach(function (hint) {
	                if (hint.align == 'start') {
	                    if (startHint_1 || _this.hintLabel) {
	                        throw new MdInputDuplicatedHintError('start');
	                    }
	                    startHint_1 = hint;
	                }
	                else if (hint.align == 'end') {
	                    if (endHint_1) {
	                        throw new MdInputDuplicatedHintError('end');
	                    }
	                    endHint_1 = hint;
	                }
	            });
	        }
	    };
	    __decorate$33([
	        _angular_core.Input('aria-label'), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "ariaLabel", void 0);
	    __decorate$33([
	        _angular_core.Input('aria-labelledby'), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "ariaLabelledBy", void 0);
	    __decorate$33([
	        _angular_core.Input('aria-disabled'),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "ariaDisabled", void 0);
	    __decorate$33([
	        _angular_core.Input('aria-required'),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "ariaRequired", void 0);
	    __decorate$33([
	        _angular_core.Input('aria-invalid'),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "ariaInvalid", void 0);
	    __decorate$33([
	        _angular_core.ContentChild(MdPlaceholder), 
	        __metadata$33('design:type', MdPlaceholder)
	    ], MdInput.prototype, "_placeholderChild", void 0);
	    __decorate$33([
	        _angular_core.ContentChildren(MdHint), 
	        __metadata$33('design:type', _angular_core.QueryList)
	    ], MdInput.prototype, "_hintChildren", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "align", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "dividerColor", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "floatingPlaceholder", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "hintLabel", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "autocomplete", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "autocorrect", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "autocapitalize", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "autofocus", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "disabled", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "id", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "list", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "max", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Number)
	    ], MdInput.prototype, "maxlength", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "min", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Number)
	    ], MdInput.prototype, "minlength", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "placeholder", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "readonly", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "required", void 0);
	    __decorate$33([
	        _angular_core.Input(),
	        BooleanFieldValue(), 
	        __metadata$33('design:type', Boolean)
	    ], MdInput.prototype, "spellcheck", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Number)
	    ], MdInput.prototype, "step", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Number)
	    ], MdInput.prototype, "tabindex", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "type", void 0);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', String)
	    ], MdInput.prototype, "name", void 0);
	    __decorate$33([
	        _angular_core.Output('blur'), 
	        __metadata$33('design:type', rxjs_Observable.Observable)
	    ], MdInput.prototype, "onBlur", null);
	    __decorate$33([
	        _angular_core.Output('focus'), 
	        __metadata$33('design:type', rxjs_Observable.Observable)
	    ], MdInput.prototype, "onFocus", null);
	    __decorate$33([
	        _angular_core.Input(), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "value", null);
	    __decorate$33([
	        _angular_core.HostBinding('attr.align'), 
	        __metadata$33('design:type', Object)
	    ], MdInput.prototype, "_align", null);
	    __decorate$33([
	        _angular_core.ViewChild('input'), 
	        __metadata$33('design:type', _angular_core.ElementRef)
	    ], MdInput.prototype, "_inputElement", void 0);
	    MdInput = __decorate$33([
	        _angular_core.Component({selector: 'md-input',
	            template: "<div class=\"md-input-wrapper\"> <div class=\"md-input-table\"> <div class=\"md-input-prefix\"><ng-content select=\"[md-prefix]\"></ng-content></div> <div class=\"md-input-infix\"> <input #input aria-target class=\"md-input-element\" [class.md-end]=\"align == 'end'\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-disabled]=\"ariaDisabled\" [attr.aria-required]=\"ariaRequired\" [attr.aria-invalid]=\"ariaInvalid\" [attr.autocomplete]=\"autocomplete\" [attr.autocorrect]=\"autocorrect\" [attr.autocapitalize]=\"autocapitalize\" [autofocus]=\"autofocus\" [disabled]=\"disabled\" [id]=\"inputId\" [attr.list]=\"list\" [attr.max]=\"max\" [attr.maxlength]=\"maxlength\" [attr.min]=\"min\" [attr.minlength]=\"minlength\" [readonly]=\"readonly\" [required]=\"required\" [spellcheck]=\"spellcheck\" [attr.step]=\"step\" [attr.tabindex]=\"tabindex\" [type]=\"type\" [attr.name]=\"name\" (focus)=\"_handleFocus($event)\" (blur)=\"_handleBlur($event)\" [(ngModel)]=\"value\" (change)=\"_handleChange($event)\"> <label class=\"md-input-placeholder\" [attr.for]=\"inputId\" [class.md-empty]=\"empty\" [class.md-focused]=\"focused\" [class.md-float]=\"floatingPlaceholder\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\" *ngIf=\"_hasPlaceholder()\"> <ng-content select=\"md-placeholder\"></ng-content> {{placeholder}} <span class=\"md-placeholder-required\" *ngIf=\"required\">*</span> </label> </div> <div class=\"md-input-suffix\"><ng-content select=\"[md-suffix]\"></ng-content></div> </div> <div class=\"md-input-underline\" [class.md-disabled]=\"disabled\"> <span class=\"md-input-ripple\" [class.md-focused]=\"focused\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\"></span> </div> <div *ngIf=\"hintLabel != ''\" class=\"md-hint\">{{hintLabel}}</div> <ng-content select=\"md-hint\"></ng-content> </div> ",
	            styles: ["md-input { display: inline-block; position: relative; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: left; } [dir='rtl'] md-input { text-align: right; } .md-input-wrapper { margin: 16px 0; } .md-input-table { display: inline-table; flex-flow: column; vertical-align: bottom; width: 100%; } .md-input-table > * { display: table-cell; } .md-input-infix { position: relative; } .md-input-element { font: inherit; background: transparent; color: currentColor; border: none; outline: none; padding: 0; width: 100%; } .md-input-element.md-end { text-align: right; } [dir='rtl'] .md-input-element.md-end { text-align: left; } .md-input-element:-moz-ui-invalid { box-shadow: none; } .md-input-element:-webkit-autofill + .md-input-placeholder { display: block; padding-bottom: 5px; transform: translateY(-100%) scale(0.75); width: 133.33333%; } .md-input-placeholder { position: absolute; left: 0; top: 0; font-size: 100%; pointer-events: none; z-index: 1; width: 100%; display: none; white-space: nowrap; text-overflow: ellipsis; overflow-x: hidden; transform: translateY(0); transform-origin: bottom left; transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), scale 400ms cubic-bezier(0.25, 0.8, 0.25, 1), color 400ms cubic-bezier(0.25, 0.8, 0.25, 1), width 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-input-placeholder.md-empty { display: block; cursor: text; } .md-input-placeholder.md-float:not(.md-empty), .md-input-placeholder.md-float.md-focused { display: block; padding-bottom: 5px; transform: translateY(-100%) scale(0.75); width: 133.33333%; } [dir='rtl'] .md-input-placeholder { transform-origin: bottom right; } .md-input-underline { position: absolute; height: 1px; width: 100%; margin-top: 4px; border-top-width: 1px; border-top-style: solid; } .md-input-underline.md-disabled { border-top: 0; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%); background-position: 0; background-size: 4px 1px; background-repeat: repeat-x; } .md-input-underline .md-input-ripple { position: absolute; height: 2px; z-index: 1; top: -1px; width: 100%; transform-origin: top; opacity: 0; transform: scaleY(0); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1), opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md-input-underline .md-input-ripple.md-focused { opacity: 1; transform: scaleY(1); } .md-hint { position: absolute; font-size: 75%; bottom: -0.5em; } .md-hint.md-right { right: 0; } [dir='rtl'] .md-hint { right: 0; left: auto; } [dir='rtl'] .md-hint.md-right { right: auto; left: 0; } /*# sourceMappingURL=input.css.map */ "],
	            providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
	            host: { '(click)': 'focus()' },
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$33('design:paramtypes', [])
	    ], MdInput);
	    return MdInput;
	}());
	var MdInputModule = (function () {
	    function MdInputModule() {
	    }
	    MdInputModule.forRoot = function () {
	        return {
	            ngModule: MdInputModule,
	            providers: []
	        };
	    };
	    MdInputModule = __decorate$33([
	        _angular_core.NgModule({
	            declarations: [MdPlaceholder, MdInput, MdHint],
	            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
	            exports: [MdPlaceholder, MdInput, MdHint],
	        }), 
	        __metadata$33('design:paramtypes', [])
	    ], MdInputModule);
	    return MdInputModule;
	}());
	
	// TODO(josephperrott): Implement onAction observable.
	/**
	 * Reference to a snack bar dispatched from the snack bar service.
	 */
	var MdSnackBarRef = (function () {
	    function MdSnackBarRef(instance, _overlayRef) {
	        this._overlayRef = _overlayRef;
	        /** Subject for notifying the user that the snack bar has closed. */
	        this._afterClosed = new rxjs_Subject.Subject();
	        // Sets the readonly instance of the snack bar content component.
	        this.instance = instance;
	    }
	    /** Dismisses the snack bar. */
	    MdSnackBarRef.prototype.dismiss = function () {
	        if (!this._afterClosed.closed) {
	            this._overlayRef.dispose();
	            this._afterClosed.complete();
	        }
	    };
	    /** Gets an observable that is notified when the snack bar is finished closing. */
	    MdSnackBarRef.prototype.afterDismissed = function () {
	        return this._afterClosed.asObservable();
	    };
	    return MdSnackBarRef;
	}());
	
	var __extends$15 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var MdSnackBarContentAlreadyAttached = (function (_super) {
	    __extends$15(MdSnackBarContentAlreadyAttached, _super);
	    function MdSnackBarContentAlreadyAttached() {
	        _super.call(this, 'Attempting to attach snack bar content after content is already attached');
	    }
	    return MdSnackBarContentAlreadyAttached;
	}(MdError));
	
	var __extends$14 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$35 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$35 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Internal component that wraps user-provided snack bar content.
	 */
	var MdSnackBarContainer = (function (_super) {
	    __extends$14(MdSnackBarContainer, _super);
	    function MdSnackBarContainer() {
	        _super.apply(this, arguments);
	    }
	    /** Attach a portal as content to this snack bar container. */
	    MdSnackBarContainer.prototype.attachComponentPortal = function (portal) {
	        if (this._portalHost.hasAttached()) {
	            throw new MdSnackBarContentAlreadyAttached();
	        }
	        return this._portalHost.attachComponentPortal(portal);
	    };
	    MdSnackBarContainer.prototype.attachTemplatePortal = function (portal) {
	        throw Error('Not yet implemented');
	    };
	    __decorate$35([
	        _angular_core.ViewChild(PortalHostDirective), 
	        __metadata$35('design:type', PortalHostDirective)
	    ], MdSnackBarContainer.prototype, "_portalHost", void 0);
	    MdSnackBarContainer = __decorate$35([
	        _angular_core.Component({selector: 'snack-bar-container',
	            template: "<template portalHost></template>",
	            styles: [":host { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); background: #323232; border-radius: 2px; display: block; height: 20px; max-width: 568px; min-width: 288px; overflow: hidden; padding: 14px 24px; } /*# sourceMappingURL=snack-bar-container.css.map */ "],
	            host: {
	                'role': 'alert'
	            }
	        }), 
	        __metadata$35('design:paramtypes', [])
	    ], MdSnackBarContainer);
	    return MdSnackBarContainer;
	}(BasePortalHost));
	
	var __decorate$36 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$36 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * A component used to open as the default snack bar, matching material spec.
	 * This should only be used internally by the snack bar service.
	 */
	var SimpleSnackBar = (function () {
	    function SimpleSnackBar() {
	    }
	    /** Dismisses the snack bar. */
	    SimpleSnackBar.prototype.dismiss = function () {
	        this.snackBarRef.dismiss();
	    };
	    Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
	        /** If the action button should be shown. */
	        get: function () { return !!this.action; },
	        enumerable: true,
	        configurable: true
	    });
	    SimpleSnackBar = __decorate$36([
	        _angular_core.Component({selector: 'simple-snack-bar',
	            template: "<span class=\"md-simple-snackbar-message\">{{message}}</span> <button md-button class=\"md-simple-snackbar-action\" *ngIf=\"hasAction\" (click)=\"dismiss()\">{{action}}</button>",
	            styles: ["md-simple-snackbar { display: flex; justify-content: space-between; } .md-simple-snackbar-message { box-sizing: border-box; border: none; color: white; font-family: Roboto, 'Helvetica Neue', sans-serif; font-size: 14px; line-height: 20px; outline: none; text-decoration: none; word-break: break-all; } .md-simple-snackbar-action { box-sizing: border-box; color: white; float: right; font-weight: 600; line-height: 20px; margin: -5px 0 0 48px; min-width: initial; padding: 5px; text-transform: uppercase; } /*# sourceMappingURL=simple-snack-bar.css.map */ "],
	        }), 
	        __metadata$36('design:paramtypes', [])
	    ], SimpleSnackBar);
	    return SimpleSnackBar;
	}());
	
	var MdSnackBarConfig = (function () {
	    function MdSnackBarConfig(viewContainerRef) {
	        /** The politeness level for the MdAriaLiveAnnouncer announcement. */
	        this.politeness = 'assertive';
	        this.viewContainerRef = viewContainerRef;
	    }
	    return MdSnackBarConfig;
	}());
	
	var __decorate$34 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$34 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(josephperrott): Animate entrance and exit of snack bars.
	// TODO(josephperrott): Automate dismiss after timeout.
	/**
	 * Service to dispatch Material Design snack bar messages.
	 */
	var MdSnackBar = (function () {
	    function MdSnackBar(_overlay, _live) {
	        this._overlay = _overlay;
	        this._live = _live;
	    }
	    /**
	     * Creates and dispatches a snack bar with a custom component for the content, removing any
	     * currently opened snack bars.
	     */
	    MdSnackBar.prototype.openFromComponent = function (component, config) {
	        if (this._snackBarRef) {
	            this._snackBarRef.dismiss();
	        }
	        var overlayRef = this._createOverlay();
	        var snackBarContainer = this._attachSnackBarContainer(overlayRef, config);
	        var mdSnackBarRef = this._attachSnackbarContent(component, snackBarContainer, overlayRef);
	        this._live.announce(config.announcementMessage, config.politeness);
	        return mdSnackBarRef;
	    };
	    /**
	     * Creates and dispatches a snack bar.
	     */
	    MdSnackBar.prototype.open = function (message, actionLabel, config) {
	        config.announcementMessage = message;
	        var simpleSnackBarRef = this.openFromComponent(SimpleSnackBar, config);
	        simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
	        simpleSnackBarRef.instance.message = message;
	        simpleSnackBarRef.instance.action = actionLabel;
	        return simpleSnackBarRef;
	    };
	    /**
	     * Attaches the snack bar container component to the overlay.
	     */
	    MdSnackBar.prototype._attachSnackBarContainer = function (overlayRef, config) {
	        var containerPortal = new ComponentPortal(MdSnackBarContainer, config.viewContainerRef);
	        var containerRef = overlayRef.attach(containerPortal);
	        containerRef.instance.snackBarConfig = config;
	        return containerRef.instance;
	    };
	    /**
	     * Places a new component as the content of the snack bar container.
	     */
	    MdSnackBar.prototype._attachSnackbarContent = function (component, container, overlayRef) {
	        var portal = new ComponentPortal(component);
	        var contentRef = container.attachComponentPortal(portal);
	        var snackBarRef = new MdSnackBarRef(contentRef.instance, overlayRef);
	        this._snackBarRef = snackBarRef;
	        return snackBarRef;
	    };
	    /**
	     * Creates a new overlay and places it in the correct location.
	     */
	    MdSnackBar.prototype._createOverlay = function () {
	        var state = new OverlayState();
	        state.positionStrategy = this._overlay.position().global()
	            .fixed()
	            .centerHorizontally()
	            .bottom('0');
	        return this._overlay.create(state);
	    };
	    MdSnackBar = __decorate$34([
	        _angular_core.Injectable(), 
	        __metadata$34('design:paramtypes', [Overlay, MdLiveAnnouncer])
	    ], MdSnackBar);
	    return MdSnackBar;
	}());
	var MdSnackBarModule = (function () {
	    function MdSnackBarModule() {
	    }
	    MdSnackBarModule.forRoot = function () {
	        return {
	            ngModule: MdSnackBarModule,
	            providers: [MdSnackBar, OVERLAY_PROVIDERS, MdLiveAnnouncer]
	        };
	    };
	    MdSnackBarModule = __decorate$34([
	        _angular_core.NgModule({
	            imports: [OverlayModule, PortalModule, _angular_common.CommonModule],
	            exports: [MdSnackBarContainer],
	            declarations: [MdSnackBarContainer, SimpleSnackBar],
	            entryComponents: [MdSnackBarContainer, SimpleSnackBar],
	        }), 
	        __metadata$34('design:paramtypes', [])
	    ], MdSnackBarModule);
	    return MdSnackBarModule;
	}());
	
	var __extends$16 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$38 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$38 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Used to flag tab labels for use with the portal directive */
	var MdTabLabel = (function (_super) {
	    __extends$16(MdTabLabel, _super);
	    function MdTabLabel(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    MdTabLabel = __decorate$38([
	        _angular_core.Directive({
	            selector: '[md-tab-label]',
	        }), 
	        __metadata$38('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], MdTabLabel);
	    return MdTabLabel;
	}(TemplatePortalDirective));
	
	var __extends$17 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$39 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$39 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Used to flag tab contents for use with the portal directive */
	var MdTabContent = (function (_super) {
	    __extends$17(MdTabContent, _super);
	    function MdTabContent(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    MdTabContent = __decorate$39([
	        _angular_core.Directive({
	            selector: '[md-tab-content]'
	        }), 
	        __metadata$39('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
	    ], MdTabContent);
	    return MdTabContent;
	}(TemplatePortalDirective));
	
	var __decorate$40 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$40 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Used in the `md-tab-group` view to display tab labels */
	var MdTabLabelWrapper = (function () {
	    function MdTabLabelWrapper(elementRef) {
	        this.elementRef = elementRef;
	    }
	    /**
	     * Sets focus on the wrapper element
	     */
	    MdTabLabelWrapper.prototype.focus = function () {
	        this.elementRef.nativeElement.focus();
	    };
	    MdTabLabelWrapper = __decorate$40([
	        _angular_core.Directive({
	            selector: '[md-tab-label-wrapper]'
	        }), 
	        __metadata$40('design:paramtypes', [_angular_core.ElementRef])
	    ], MdTabLabelWrapper);
	    return MdTabLabelWrapper;
	}());
	
	var __decorate$41 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$41 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** The ink-bar is used to display and animate the line underneath the current active tab label. */
	var MdInkBar = (function () {
	    function MdInkBar(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	    }
	    /**
	     * Calculates the styles from the provided element in order to align the ink-bar to that element.
	     * @param element
	     */
	    MdInkBar.prototype.alignToElement = function (element) {
	        this._renderer.setElementStyle(this._elementRef.nativeElement, 'left', this._getLeftPosition(element));
	        this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', this._getElementWidth(element));
	    };
	    /**
	     * Generates the pixel distance from the left based on the provided element in string format.
	     * @param element
	     * @returns {string}
	     */
	    MdInkBar.prototype._getLeftPosition = function (element) {
	        return element ? element.offsetLeft + 'px' : '0';
	    };
	    /**
	     * Generates the pixel width from the provided element in string format.
	     * @param element
	     * @returns {string}
	     */
	    MdInkBar.prototype._getElementWidth = function (element) {
	        return element ? element.offsetWidth + 'px' : '0';
	    };
	    MdInkBar = __decorate$41([
	        _angular_core.Directive({
	            selector: 'md-ink-bar',
	        }), 
	        __metadata$41('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdInkBar);
	    return MdInkBar;
	}());
	
	var __decorate$37 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$37 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/** Used to generate unique ID's for each tab component */
	var nextId$2 = 0;
	/** A simple change event emitted on focus or selection changes. */
	var MdTabChangeEvent = (function () {
	    function MdTabChangeEvent() {
	    }
	    return MdTabChangeEvent;
	}());
	var MdTab = (function () {
	    function MdTab() {
	        // TODO: Replace this when BooleanFieldValue is removed.
	        this._disabled = false;
	    }
	    Object.defineProperty(MdTab.prototype, "disabled", {
	        get: function () {
	            return this._disabled;
	        },
	        set: function (value) {
	            this._disabled = (value != null && "" + value !== 'false');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate$37([
	        _angular_core.ContentChild(MdTabLabel), 
	        __metadata$37('design:type', MdTabLabel)
	    ], MdTab.prototype, "label", void 0);
	    __decorate$37([
	        _angular_core.ContentChild(MdTabContent), 
	        __metadata$37('design:type', MdTabContent)
	    ], MdTab.prototype, "content", void 0);
	    __decorate$37([
	        _angular_core.Input('disabled'), 
	        __metadata$37('design:type', Boolean), 
	        __metadata$37('design:paramtypes', [Boolean])
	    ], MdTab.prototype, "disabled", null);
	    MdTab = __decorate$37([
	        _angular_core.Directive({
	            selector: 'md-tab'
	        }), 
	        __metadata$37('design:paramtypes', [])
	    ], MdTab);
	    return MdTab;
	}());
	/**
	 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
	 * animated ink-bar, keyboard navigation, and screen reader.
	 * See: https://www.google.com/design/spec/components/tabs.html
	 */
	var MdTabGroup = (function () {
	    function MdTabGroup(_zone) {
	        this._zone = _zone;
	        this._isInitialized = false;
	        this._selectedIndex = 0;
	        this._onFocusChange = new _angular_core.EventEmitter();
	        this._onSelectChange = new _angular_core.EventEmitter();
	        this._focusIndex = 0;
	        this._groupId = nextId$2++;
	    }
	    Object.defineProperty(MdTabGroup.prototype, "selectedIndex", {
	        get: function () {
	            return this._selectedIndex;
	        },
	        set: function (value) {
	            if (value != this._selectedIndex && this.isValidIndex(value)) {
	                this._selectedIndex = value;
	                if (this._isInitialized) {
	                    this._onSelectChange.emit(this._createChangeEvent(value));
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
	     * providing a valid index and return true.
	     */
	    MdTabGroup.prototype.isValidIndex = function (index) {
	        if (this._tabs) {
	            var tab = this._tabs.toArray()[index];
	            return tab && !tab.disabled;
	        }
	        else {
	            return true;
	        }
	    };
	    Object.defineProperty(MdTabGroup.prototype, "_selectedIndexChange", {
	        /** Output to enable support for two-way binding on `selectedIndex`. */
	        get: function () {
	            return this.selectChange.map(function (event) { return event.index; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdTabGroup.prototype, "focusChange", {
	        get: function () {
	            return this._onFocusChange.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdTabGroup.prototype, "selectChange", {
	        get: function () {
	            return this._onSelectChange.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Waits one frame for the view to update, then upates the ink bar
	     * Note: This must be run outside of the zone or it will create an infinite change detection loop
	     * TODO: internal
	     */
	    MdTabGroup.prototype.ngAfterViewChecked = function () {
	        var _this = this;
	        this._zone.runOutsideAngular(function () {
	            window.requestAnimationFrame(function () {
	                _this._updateInkBar();
	            });
	        });
	        this._isInitialized = true;
	    };
	    /** Tells the ink-bar to align itself to the current label wrapper */
	    MdTabGroup.prototype._updateInkBar = function () {
	        this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
	    };
	    Object.defineProperty(MdTabGroup.prototype, "_currentLabelWrapper", {
	        /**
	         * Reference to the current label wrapper; defaults to null for initial render before the
	         * ViewChildren references are ready.
	         */
	        get: function () {
	            return this._labelWrappers && this._labelWrappers.length
	                ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
	                : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdTabGroup.prototype, "focusIndex", {
	        /** Tracks which element has focus; used for keyboard navigation */
	        get: function () {
	            return this._focusIndex;
	        },
	        /** When the focus index is set, we must manually send focus to the correct label */
	        set: function (value) {
	            if (this.isValidIndex(value)) {
	                this._focusIndex = value;
	                if (this._isInitialized) {
	                    this._onFocusChange.emit(this._createChangeEvent(value));
	                }
	                if (this._labelWrappers && this._labelWrappers.length) {
	                    this._labelWrappers.toArray()[value].focus();
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdTabGroup.prototype._createChangeEvent = function (index) {
	        var event = new MdTabChangeEvent;
	        event.index = index;
	        if (this._tabs && this._tabs.length) {
	            event.tab = this._tabs.toArray()[index];
	        }
	        return event;
	    };
	    /** Returns a unique id for each tab label element */
	    MdTabGroup.prototype._getTabLabelId = function (i) {
	        return "md-tab-label-" + this._groupId + "-" + i;
	    };
	    /** Returns a unique id for each tab content element */
	    MdTabGroup.prototype._getTabContentId = function (i) {
	        return "md-tab-content-" + this._groupId + "-" + i;
	    };
	    MdTabGroup.prototype.handleKeydown = function (event) {
	        switch (event.keyCode) {
	            case RIGHT_ARROW:
	                this.focusNextTab();
	                break;
	            case LEFT_ARROW:
	                this.focusPreviousTab();
	                break;
	            case ENTER:
	                this.selectedIndex = this.focusIndex;
	                break;
	        }
	    };
	    /**
	     * Moves the focus left or right depending on the offset provided.  Valid offsets are 1 and -1.
	     */
	    MdTabGroup.prototype.moveFocus = function (offset) {
	        if (this._labelWrappers) {
	            var tabs = this._tabs.toArray();
	            for (var i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
	                if (this.isValidIndex(i)) {
	                    this.focusIndex = i;
	                    return;
	                }
	            }
	        }
	    };
	    /** Increment the focus index by 1 until a valid tab is found. */
	    MdTabGroup.prototype.focusNextTab = function () {
	        this.moveFocus(1);
	    };
	    /** Decrement the focus index by 1 until a valid tab is found. */
	    MdTabGroup.prototype.focusPreviousTab = function () {
	        this.moveFocus(-1);
	    };
	    __decorate$37([
	        _angular_core.ContentChildren(MdTab), 
	        __metadata$37('design:type', _angular_core.QueryList)
	    ], MdTabGroup.prototype, "_tabs", void 0);
	    __decorate$37([
	        _angular_core.ViewChildren(MdTabLabelWrapper), 
	        __metadata$37('design:type', _angular_core.QueryList)
	    ], MdTabGroup.prototype, "_labelWrappers", void 0);
	    __decorate$37([
	        _angular_core.ViewChildren(MdInkBar), 
	        __metadata$37('design:type', _angular_core.QueryList)
	    ], MdTabGroup.prototype, "_inkBar", void 0);
	    __decorate$37([
	        _angular_core.Input(), 
	        __metadata$37('design:type', Number), 
	        __metadata$37('design:paramtypes', [Number])
	    ], MdTabGroup.prototype, "selectedIndex", null);
	    __decorate$37([
	        _angular_core.Output('selectedIndexChange'), 
	        __metadata$37('design:type', rxjs_Observable.Observable)
	    ], MdTabGroup.prototype, "_selectedIndexChange", null);
	    __decorate$37([
	        _angular_core.Output('focusChange'), 
	        __metadata$37('design:type', rxjs_Observable.Observable)
	    ], MdTabGroup.prototype, "focusChange", null);
	    __decorate$37([
	        _angular_core.Output('selectChange'), 
	        __metadata$37('design:type', rxjs_Observable.Observable)
	    ], MdTabGroup.prototype, "selectChange", null);
	    MdTabGroup = __decorate$37([
	        _angular_core.Component({selector: 'md-tab-group',
	            template: "<div class=\"md-tab-header\" role=\"tablist\" (keydown)=\"handleKeydown($event)\"> <div class=\"md-tab-label\" role=\"tab\" md-tab-label-wrapper *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.md-tab-active]=\"selectedIndex == i\" [class.md-tab-disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"> <template [portalHost]=\"tab.label\"></template> </div> <md-ink-bar></md-ink-bar> </div> <div class=\"md-tab-body-wrapper\"> <div class=\"md-tab-body\" role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [class.md-tab-active]=\"selectedIndex == i\" [attr.aria-labelledby]=\"_getTabLabelId(i)\"> <template [ngIf]=\"selectedIndex == i\"> <template [portalHost]=\"tab.content\"></template> </template> </div> </div> ",
	            styles: [":host { display: flex; flex-direction: column; font-family: Roboto, \"Helvetica Neue\", sans-serif; } .md-tab-header { overflow: hidden; position: relative; display: flex; flex-direction: row; flex-shrink: 0; } .md-tab-label { line-height: 48px; height: 48px; padding: 0 12px; font-size: 14px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-weight: 500; cursor: pointer; box-sizing: border-box; color: currentColor; opacity: 0.6; min-width: 160px; text-align: center; } .md-tab-label:focus { outline: none; opacity: 1; } .md-tab-disabled { cursor: default; pointer-events: none; } .md-tab-body-wrapper { position: relative; overflow: hidden; flex-grow: 1; display: flex; } .md-tab-body { display: none; overflow: auto; box-sizing: border-box; flex-grow: 1; flex-shrink: 1; } .md-tab-body.md-tab-active { display: block; } md-ink-bar { position: absolute; bottom: 0; height: 2px; transition: 350ms ease-out; } /*# sourceMappingURL=tab-group.css.map */ "],
	        }), 
	        __metadata$37('design:paramtypes', [_angular_core.NgZone])
	    ], MdTabGroup);
	    return MdTabGroup;
	}());
	var MdTabsModule = (function () {
	    function MdTabsModule() {
	    }
	    MdTabsModule.forRoot = function () {
	        return {
	            ngModule: MdTabsModule,
	            providers: []
	        };
	    };
	    MdTabsModule = __decorate$37([
	        _angular_core.NgModule({
	            imports: [_angular_common.CommonModule, PortalModule],
	            // Don't export MdInkBar or MdTabLabelWrapper, as they are internal implementatino details.
	            exports: [MdTabGroup, MdTabLabel, MdTabContent, MdTab],
	            declarations: [MdTabGroup, MdTabLabel, MdTabContent, MdTab, MdInkBar, MdTabLabelWrapper],
	        }), 
	        __metadata$37('design:paramtypes', [])
	    ], MdTabsModule);
	    return MdTabsModule;
	}());
	
	var __decorate$42 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$42 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdToolbarRow = (function () {
	    function MdToolbarRow() {
	    }
	    MdToolbarRow = __decorate$42([
	        _angular_core.Directive({
	            selector: 'md-toolbar-row'
	        }), 
	        __metadata$42('design:paramtypes', [])
	    ], MdToolbarRow);
	    return MdToolbarRow;
	}());
	var MdToolbar = (function () {
	    function MdToolbar(elementRef, renderer) {
	        this.elementRef = elementRef;
	        this.renderer = renderer;
	    }
	    Object.defineProperty(MdToolbar.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            this._updateColor(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdToolbar.prototype._updateColor = function (newColor) {
	        this._setElementColor(this._color, false);
	        this._setElementColor(newColor, true);
	        this._color = newColor;
	    };
	    MdToolbar.prototype._setElementColor = function (color, isAdd) {
	        if (color != null && color != '') {
	            this.renderer.setElementClass(this.elementRef.nativeElement, "md-" + color, isAdd);
	        }
	    };
	    __decorate$42([
	        _angular_core.Input(), 
	        __metadata$42('design:type', String)
	    ], MdToolbar.prototype, "color", null);
	    MdToolbar = __decorate$42([
	        _angular_core.Component({selector: 'md-toolbar',
	            template: "<div class=\"md-toolbar-layout\"> <md-toolbar-row> <ng-content></ng-content> </md-toolbar-row> <ng-content select=\"md-toolbar-row\"></ng-content> </div>",
	            styles: ["md-toolbar { display: flex; box-sizing: border-box; width: 100%; min-height: 64px; font-size: 20px; font-weight: 400; font-family: Roboto, \"Helvetica Neue\", sans-serif; padding: 0 16px; flex-direction: column; } md-toolbar md-toolbar-row { display: flex; box-sizing: border-box; width: 100%; height: 64px; flex-direction: row; align-items: center; } /*# sourceMappingURL=toolbar.css.map */ "],
	            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
	            encapsulation: _angular_core.ViewEncapsulation.None
	        }), 
	        __metadata$42('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
	    ], MdToolbar);
	    return MdToolbar;
	}());
	var MdToolbarModule = (function () {
	    function MdToolbarModule() {
	    }
	    MdToolbarModule.forRoot = function () {
	        return {
	            ngModule: MdToolbarModule,
	            providers: []
	        };
	    };
	    MdToolbarModule = __decorate$42([
	        _angular_core.NgModule({
	            exports: [MdToolbar, MdToolbarRow],
	            declarations: [MdToolbar, MdToolbarRow],
	        }), 
	        __metadata$42('design:paramtypes', [])
	    ], MdToolbarModule);
	    return MdToolbarModule;
	}());
	
	var __decorate$43 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$43 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdTooltip = (function () {
	    function MdTooltip(_overlay, _elementRef, _viewContainerRef, _changeDetectionRef) {
	        this._overlay = _overlay;
	        this._elementRef = _elementRef;
	        this._viewContainerRef = _viewContainerRef;
	        this._changeDetectionRef = _changeDetectionRef;
	        this.visible = false;
	        /** Allows the user to define the position of the tooltip relative to the parent element */
	        this._position = 'below';
	    }
	    Object.defineProperty(MdTooltip.prototype, "position", {
	        get: function () {
	            return this._position;
	        },
	        set: function (value) {
	            if (value !== this._position) {
	                this._position = value;
	                this._createOverlay();
	                this._updatePosition();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdTooltip.prototype, "message", {
	        get: function () {
	            return this._message;
	        },
	        set: function (value) {
	            this._message = value;
	            this._updatePosition();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Create overlay on init
	     * TODO: internal
	     */
	    MdTooltip.prototype.ngOnInit = function () {
	        this._createOverlay();
	    };
	    /**
	     * Create the overlay config and position strategy
	     */
	    MdTooltip.prototype._createOverlay = function () {
	        if (this._overlayRef) {
	            if (this.visible) {
	                // if visible, hide before destroying
	                this.hide();
	                this._createOverlay();
	            }
	            else {
	                // if not visible, dispose and recreate
	                this._overlayRef.dispose();
	                this._overlayRef = null;
	                this._createOverlay();
	            }
	        }
	        else {
	            var origin = this._getOrigin();
	            var position = this._getOverlayPosition();
	            var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
	            var config = new OverlayState();
	            config.positionStrategy = strategy;
	            this._overlayRef = this._overlay.create(config);
	        }
	    };
	    /**
	     * Returns the origin position based on the user's position preference
	     */
	    MdTooltip.prototype._getOrigin = function () {
	        switch (this.position) {
	            case 'before': return { originX: 'start', originY: 'center' };
	            case 'after': return { originX: 'end', originY: 'center' };
	            case 'above': return { originX: 'center', originY: 'top' };
	            case 'below': return { originX: 'center', originY: 'bottom' };
	        }
	    };
	    /**
	     * Returns the overlay position based on the user's preference
	     */
	    MdTooltip.prototype._getOverlayPosition = function () {
	        switch (this.position) {
	            case 'before': return { overlayX: 'end', overlayY: 'center' };
	            case 'after': return { overlayX: 'start', overlayY: 'center' };
	            case 'above': return { overlayX: 'center', overlayY: 'bottom' };
	            case 'below': return { overlayX: 'center', overlayY: 'top' };
	        }
	    };
	    /**
	     * Shows the tooltip on mouse enter
	     * @param event
	     */
	    MdTooltip.prototype._handleMouseEnter = function (event) {
	        this.show();
	    };
	    /**
	     * Hides the tooltip on mouse leave
	     * @param event
	     */
	    MdTooltip.prototype._handleMouseLeave = function (event) {
	        this.hide();
	    };
	    /**
	     * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
	     */
	    MdTooltip.prototype.show = function () {
	        if (!this.visible && this._overlayRef && !this._overlayRef.hasAttached()) {
	            this.visible = true;
	            var portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
	            var tooltipRef = this._overlayRef.attach(portal);
	            tooltipRef.instance.message = this.message;
	            this._updatePosition();
	        }
	    };
	    /**
	     * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
	     */
	    MdTooltip.prototype.hide = function () {
	        if (this.visible && this._overlayRef && this._overlayRef.hasAttached()) {
	            this.visible = false;
	            this._overlayRef.detach();
	        }
	    };
	    /**
	     * Shows/hides the tooltip and returns a promise that will resolve when it is done
	     */
	    MdTooltip.prototype.toggle = function () {
	        if (this.visible) {
	            this.hide();
	        }
	        else {
	            this.show();
	        }
	    };
	    /**
	     * Updates the tooltip's position
	     */
	    MdTooltip.prototype._updatePosition = function () {
	        if (this._overlayRef) {
	            this._changeDetectionRef.detectChanges();
	            this._overlayRef.updatePosition();
	        }
	    };
	    __decorate$43([
	        _angular_core.Input('tooltip-position'), 
	        __metadata$43('design:type', String)
	    ], MdTooltip.prototype, "position", null);
	    __decorate$43([
	        _angular_core.Input('md-tooltip'), 
	        __metadata$43('design:type', Object)
	    ], MdTooltip.prototype, "message", null);
	    MdTooltip = __decorate$43([
	        _angular_core.Directive({
	            selector: '[md-tooltip]',
	            host: {
	                '(mouseenter)': '_handleMouseEnter($event)',
	                '(mouseleave)': '_handleMouseLeave($event)',
	            }
	        }), 
	        __metadata$43('design:paramtypes', [Overlay, _angular_core.ElementRef, _angular_core.ViewContainerRef, _angular_core.ChangeDetectorRef])
	    ], MdTooltip);
	    return MdTooltip;
	}());
	var TooltipComponent = (function () {
	    function TooltipComponent() {
	    }
	    TooltipComponent = __decorate$43([
	        _angular_core.Component({selector: 'md-tooltip-component',
	            template: "<div class=\"md-tooltip\">{{message}}</div>",
	            styles: [":host { pointer-events: none; } .md-tooltip { color: white; padding: 0 8px; border-radius: 2px; font-family: Roboto, \"Helvetica Neue\", sans-serif; font-size: 10px; margin: 14px; height: 22px; line-height: 22px; } /*# sourceMappingURL=tooltip.css.map */ "],
	        }), 
	        __metadata$43('design:paramtypes', [])
	    ], TooltipComponent);
	    return TooltipComponent;
	}());
	var MdTooltipModule = (function () {
	    function MdTooltipModule() {
	    }
	    MdTooltipModule.forRoot = function () {
	        return {
	            ngModule: MdTooltipModule,
	            providers: OVERLAY_PROVIDERS,
	        };
	    };
	    MdTooltipModule = __decorate$43([
	        _angular_core.NgModule({
	            imports: [OverlayModule],
	            exports: [MdTooltip, TooltipComponent],
	            declarations: [MdTooltip, TooltipComponent],
	            entryComponents: [TooltipComponent],
	        }), 
	        __metadata$43('design:paramtypes', [])
	    ], MdTooltipModule);
	    return MdTooltipModule;
	}());
	
	var __extends$18 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Exception thrown when menu trigger doesn't have a valid md-menu instance
	 */
	var MdMenuMissingError = (function (_super) {
	    __extends$18(MdMenuMissingError, _super);
	    function MdMenuMissingError() {
	        _super.call(this, "md-menu-trigger: must pass in an md-menu instance.\n\n    Example:\n      <md-menu #menu=\"mdMenu\"></md-menu>\n      <button [md-menu-trigger-for]=\"menu\"></button>\n    ");
	    }
	    return MdMenuMissingError;
	}(MdError));
	/**
	 * Exception thrown when menu's x-position value isn't valid.
	 * In other words, it doesn't match 'before' or 'after'.
	 */
	var MdMenuInvalidPositionX = (function (_super) {
	    __extends$18(MdMenuInvalidPositionX, _super);
	    function MdMenuInvalidPositionX() {
	        _super.call(this, "x-position value must be either 'before' or after'.\n      Example: <md-menu x-position=\"before\" #menu=\"mdMenu\"></md-menu>\n    ");
	    }
	    return MdMenuInvalidPositionX;
	}(MdError));
	/**
	 * Exception thrown when menu's y-position value isn't valid.
	 * In other words, it doesn't match 'above' or 'below'.
	 */
	var MdMenuInvalidPositionY = (function (_super) {
	    __extends$18(MdMenuInvalidPositionY, _super);
	    function MdMenuInvalidPositionY() {
	        _super.call(this, "y-position value must be either 'above' or below'.\n      Example: <md-menu y-position=\"above\" #menu=\"mdMenu\"></md-menu>\n    ");
	    }
	    return MdMenuInvalidPositionY;
	}(MdError));
	
	var __decorate$46 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$46 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * This directive is intended to be used inside an md-menu tag.
	 * It exists mostly to set the role attribute.
	 */
	var MdMenuItem = (function () {
	    function MdMenuItem(_renderer, _elementRef) {
	        this._renderer = _renderer;
	        this._elementRef = _elementRef;
	    }
	    MdMenuItem.prototype.focus = function () {
	        this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus');
	    };
	    Object.defineProperty(MdMenuItem.prototype, "disabled", {
	        // this is necessary to support anchors
	        get: function () {
	            return this._disabled;
	        },
	        set: function (value) {
	            this._disabled = (value === false || value === undefined) ? null : true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdMenuItem.prototype, "isAriaDisabled", {
	        get: function () {
	            return String(this.disabled);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * TODO: internal
	     */
	    MdMenuItem.prototype._checkDisabled = function (event) {
	        if (this.disabled) {
	            event.preventDefault();
	            event.stopPropagation();
	        }
	    };
	    __decorate$46([
	        _angular_core.HostBinding('attr.disabled'),
	        _angular_core.Input(), 
	        __metadata$46('design:type', Boolean)
	    ], MdMenuItem.prototype, "disabled", null);
	    __decorate$46([
	        _angular_core.HostBinding('attr.aria-disabled'), 
	        __metadata$46('design:type', String)
	    ], MdMenuItem.prototype, "isAriaDisabled", null);
	    MdMenuItem = __decorate$46([
	        _angular_core.Directive({
	            selector: '[md-menu-item]',
	            host: {
	                'role': 'menuitem',
	                '(click)': '_checkDisabled($event)',
	                'tabindex': '-1'
	            },
	            exportAs: 'mdMenuItem'
	        }), 
	        __metadata$46('design:paramtypes', [_angular_core.Renderer, _angular_core.ElementRef])
	    ], MdMenuItem);
	    return MdMenuItem;
	}());
	
	// TODO(kara): prevent-close functionality
	var __decorate$45 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$45 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var MdMenu = (function () {
	    function MdMenu(posX, posY) {
	        this._showClickCatcher = false;
	        this._focusedItemIndex = 0;
	        this.positionX = 'after';
	        this.positionY = 'below';
	        this.close = new _angular_core.EventEmitter;
	        if (posX) {
	            this._setPositionX(posX);
	        }
	        if (posY) {
	            this._setPositionY(posY);
	        }
	    }
	    Object.defineProperty(MdMenu.prototype, "classList", {
	        /**
	         * This method takes classes set on the host md-menu element and applies them on the
	         * menu template that displays in the overlay container.  Otherwise, it's difficult
	         * to style the containing menu from outside the component.
	         * @param classes list of class names
	         */
	        set: function (classes) {
	            this._classList = classes.split(' ').reduce(function (obj, className) {
	                obj[className] = true;
	                return obj;
	            }, {});
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * This function toggles the display of the menu's click catcher element.
	     * This element covers the viewport when the menu is open to detect clicks outside the menu.
	     * TODO: internal
	     */
	    MdMenu.prototype._setClickCatcher = function (bool) {
	        this._showClickCatcher = bool;
	    };
	    /**
	     * Focus the first item in the menu. This method is used by the menu trigger
	     * to focus the first item when the menu is opened by the ENTER key.
	     * TODO: internal
	     */
	    MdMenu.prototype._focusFirstItem = function () {
	        this.items.first.focus();
	    };
	    // TODO(kara): update this when (keydown.downArrow) testability is fixed
	    // TODO: internal
	    MdMenu.prototype._handleKeydown = function (event) {
	        if (event.keyCode === DOWN_ARROW) {
	            this._focusNextItem();
	        }
	        else if (event.keyCode === UP_ARROW) {
	            this._focusPreviousItem();
	        }
	        else if (event.keyCode === TAB) {
	            this._emitCloseEvent();
	        }
	    };
	    /**
	     * This emits a close event to which the trigger is subscribed. When emitted, the
	     * trigger will close the menu.
	     */
	    MdMenu.prototype._emitCloseEvent = function () {
	        this._focusedItemIndex = 0;
	        this.close.emit(null);
	    };
	    MdMenu.prototype._focusNextItem = function () {
	        this._updateFocusedItemIndex(1);
	        this.items.toArray()[this._focusedItemIndex].focus();
	    };
	    MdMenu.prototype._focusPreviousItem = function () {
	        this._updateFocusedItemIndex(-1);
	        this.items.toArray()[this._focusedItemIndex].focus();
	    };
	    /**
	     * This method sets focus to the correct menu item, given a list of menu items and the delta
	     * between the currently focused menu item and the new menu item to be focused. It will
	     * continue to move down the list until it finds an item that is not disabled, and it will wrap
	     * if it encounters either end of the menu.
	     *
	     * @param delta the desired change in focus index
	     * @param menuItems the menu items that should be focused
	     * @private
	       */
	    MdMenu.prototype._updateFocusedItemIndex = function (delta, menuItems) {
	        if (menuItems === void 0) { menuItems = this.items.toArray(); }
	        // when focus would leave menu, wrap to beginning or end
	        this._focusedItemIndex = (this._focusedItemIndex + delta + this.items.length)
	            % this.items.length;
	        // skip all disabled menu items recursively until an active one
	        // is reached or the menu closes for overreaching bounds
	        while (menuItems[this._focusedItemIndex].disabled) {
	            this._updateFocusedItemIndex(delta, menuItems);
	        }
	    };
	    MdMenu.prototype._setPositionX = function (pos) {
	        if (pos !== 'before' && pos !== 'after') {
	            throw new MdMenuInvalidPositionX();
	        }
	        this.positionX = pos;
	    };
	    MdMenu.prototype._setPositionY = function (pos) {
	        if (pos !== 'above' && pos !== 'below') {
	            throw new MdMenuInvalidPositionY();
	        }
	        this.positionY = pos;
	    };
	    __decorate$45([
	        _angular_core.ViewChild(_angular_core.TemplateRef), 
	        __metadata$45('design:type', _angular_core.TemplateRef)
	    ], MdMenu.prototype, "templateRef", void 0);
	    __decorate$45([
	        _angular_core.ContentChildren(MdMenuItem), 
	        __metadata$45('design:type', _angular_core.QueryList)
	    ], MdMenu.prototype, "items", void 0);
	    __decorate$45([
	        _angular_core.Input('class'), 
	        __metadata$45('design:type', String), 
	        __metadata$45('design:paramtypes', [String])
	    ], MdMenu.prototype, "classList", null);
	    __decorate$45([
	        _angular_core.Output(), 
	        __metadata$45('design:type', Object)
	    ], MdMenu.prototype, "close", void 0);
	    MdMenu = __decorate$45([
	        _angular_core.Component({selector: 'md-menu',
	            host: { 'role': 'menu' },
	            template: "<template> <div class=\"md-menu\" [ngClass]=\"_classList\" (click)=\"_emitCloseEvent()\" (keydown)=\"_handleKeydown($event)\"> <ng-content></ng-content> </div> </template> <div class=\"md-menu-click-catcher\" *ngIf=\"_showClickCatcher\" (click)=\"_emitCloseEvent()\"></div>",
	            styles: [".md-menu { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 8px; padding-bottom: 8px; } [md-menu-item] { cursor: pointer; user-select: none; outline: none; border: none; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; } [md-menu-item][disabled] { cursor: default; } button[md-menu-item] { width: 100%; } .md-menu-click-catcher { position: fixed; top: 0; left: 0; right: 0; bottom: 0; } /*# sourceMappingURL=menu.css.map */ "],
	            encapsulation: _angular_core.ViewEncapsulation.None,
	            exportAs: 'mdMenu'
	        }),
	        __param$5(0, _angular_core.Attribute('x-position')),
	        __param$5(1, _angular_core.Attribute('y-position')), 
	        __metadata$45('design:paramtypes', [String, String])
	    ], MdMenu);
	    return MdMenu;
	}());
	
	var __decorate$47 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$47 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * This directive is intended to be used in conjunction with an md-menu tag.  It is
	 * responsible for toggling the display of the provided menu instance.
	 */
	var MdMenuTrigger = (function () {
	    function MdMenuTrigger(_overlay, _element, _viewContainerRef, _renderer) {
	        this._overlay = _overlay;
	        this._element = _element;
	        this._viewContainerRef = _viewContainerRef;
	        this._renderer = _renderer;
	        this._menuOpen = false;
	        // tracking input type is necessary so it's possible to only auto-focus
	        // the first item of the list when the menu is opened via the keyboard
	        this._openedFromKeyboard = false;
	        this.onMenuOpen = new _angular_core.EventEmitter();
	        this.onMenuClose = new _angular_core.EventEmitter();
	    }
	    MdMenuTrigger.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        this._checkMenu();
	        this.menu.close.subscribe(function () { return _this.closeMenu(); });
	    };
	    MdMenuTrigger.prototype.ngOnDestroy = function () { this.destroyMenu(); };
	    Object.defineProperty(MdMenuTrigger.prototype, "menuOpen", {
	        get: function () { return this._menuOpen; },
	        enumerable: true,
	        configurable: true
	    });
	    MdMenuTrigger.prototype.toggleMenu = function () {
	        return this._menuOpen ? this.closeMenu() : this.openMenu();
	    };
	    MdMenuTrigger.prototype.openMenu = function () {
	        this._createOverlay();
	        this._overlayRef.attach(this._portal);
	        this._initMenu();
	    };
	    MdMenuTrigger.prototype.closeMenu = function () {
	        if (this._overlayRef) {
	            this._overlayRef.detach();
	            this._resetMenu();
	        }
	    };
	    MdMenuTrigger.prototype.destroyMenu = function () {
	        if (this._overlayRef) {
	            this._overlayRef.dispose();
	            this._overlayRef = null;
	        }
	    };
	    MdMenuTrigger.prototype.focus = function () {
	        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
	    };
	    /**
	     * This method sets the menu state to open and focuses the first item if
	     * the menu was opened via the keyboard.
	     */
	    MdMenuTrigger.prototype._initMenu = function () {
	        this._setIsMenuOpen(true);
	        if (this._openedFromKeyboard) {
	            this.menu._focusFirstItem();
	        }
	    };
	    ;
	    /**
	     * This method resets the menu when it's closed, most importantly restoring
	     * focus to the menu trigger if the menu was opened via the keyboard.
	     */
	    MdMenuTrigger.prototype._resetMenu = function () {
	        this._setIsMenuOpen(false);
	        if (this._openedFromKeyboard) {
	            this.focus();
	            this._openedFromKeyboard = false;
	        }
	    };
	    // set state rather than toggle to support triggers sharing a menu
	    MdMenuTrigger.prototype._setIsMenuOpen = function (isOpen) {
	        this._menuOpen = isOpen;
	        this.menu._setClickCatcher(isOpen);
	        this._menuOpen ? this.onMenuOpen.emit(null) : this.onMenuClose.emit(null);
	    };
	    /**
	     *  This method checks that a valid instance of MdMenu has been passed into
	     *  md-menu-trigger-for.  If not, an exception is thrown.
	     */
	    MdMenuTrigger.prototype._checkMenu = function () {
	        if (!this.menu || !(this.menu instanceof MdMenu)) {
	            throw new MdMenuMissingError();
	        }
	    };
	    /**
	     *  This method creates the overlay from the provided menu's template and saves its
	     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
	     */
	    MdMenuTrigger.prototype._createOverlay = function () {
	        if (!this._overlayRef) {
	            this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
	            this._overlayRef = this._overlay.create(this._getOverlayConfig());
	        }
	    };
	    /**
	     * This method builds the configuration object needed to create the overlay, the OverlayState.
	     * @returns OverlayState
	     */
	    MdMenuTrigger.prototype._getOverlayConfig = function () {
	        var overlayState = new OverlayState();
	        overlayState.positionStrategy = this._getPosition();
	        return overlayState;
	    };
	    /**
	     * This method builds the position strategy for the overlay, so the menu is properly connected
	     * to the trigger.
	     * @returns ConnectedPositionStrategy
	     */
	    MdMenuTrigger.prototype._getPosition = function () {
	        var positionX = this.menu.positionX === 'before' ? 'end' : 'start';
	        var positionY = this.menu.positionY === 'above' ? 'bottom' : 'top';
	        return this._overlay.position().connectedTo(this._element, { originX: positionX, originY: positionY }, { overlayX: positionX, overlayY: positionY });
	    };
	    // TODO: internal
	    MdMenuTrigger.prototype._handleKeydown = function (event) {
	        if (event.keyCode === ENTER) {
	            this._openedFromKeyboard = true;
	        }
	    };
	    __decorate$47([
	        _angular_core.Input('md-menu-trigger-for'), 
	        __metadata$47('design:type', MdMenu)
	    ], MdMenuTrigger.prototype, "menu", void 0);
	    __decorate$47([
	        _angular_core.Output(), 
	        __metadata$47('design:type', Object)
	    ], MdMenuTrigger.prototype, "onMenuOpen", void 0);
	    __decorate$47([
	        _angular_core.Output(), 
	        __metadata$47('design:type', Object)
	    ], MdMenuTrigger.prototype, "onMenuClose", void 0);
	    __decorate$47([
	        _angular_core.HostListener('click'), 
	        __metadata$47('design:type', Function), 
	        __metadata$47('design:paramtypes', []), 
	        __metadata$47('design:returntype', void 0)
	    ], MdMenuTrigger.prototype, "toggleMenu", null);
	    MdMenuTrigger = __decorate$47([
	        _angular_core.Directive({
	            selector: '[md-menu-trigger-for]',
	            host: {
	                'aria-haspopup': 'true',
	                '(keydown)': '_handleKeydown($event)'
	            },
	            exportAs: 'mdMenuTrigger'
	        }), 
	        __metadata$47('design:paramtypes', [Overlay, _angular_core.ElementRef, _angular_core.ViewContainerRef, _angular_core.Renderer])
	    ], MdMenuTrigger);
	    return MdMenuTrigger;
	}());
	
	var __decorate$44 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$44 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MdMenuModule = (function () {
	    function MdMenuModule() {
	    }
	    MdMenuModule.forRoot = function () {
	        return {
	            ngModule: MdMenuModule,
	            providers: OVERLAY_PROVIDERS,
	        };
	    };
	    MdMenuModule = __decorate$44([
	        _angular_core.NgModule({
	            imports: [OverlayModule, _angular_common.CommonModule],
	            exports: [MdMenu, MdMenuItem, MdMenuTrigger],
	            declarations: [MdMenu, MdMenuItem, MdMenuTrigger],
	        }), 
	        __metadata$44('design:paramtypes', [])
	    ], MdMenuModule);
	    return MdMenuModule;
	}());
	
	// TODO(jelbourn): resizing
	// TODO(jelbourn): afterOpen and beforeClose
	/**
	 * Reference to a dialog opened via the MdDialog service.
	 */
	var MdDialogRef = (function () {
	    function MdDialogRef(_overlayRef) {
	        this._overlayRef = _overlayRef;
	        /** Subject for notifying the user that the dialog has finished closing. */
	        this._afterClosed = new rxjs_Subject.Subject();
	    }
	    /**
	     * Close the dialog.
	     * @param dialogResult Optional result to return to the dialog opener.
	     */
	    MdDialogRef.prototype.close = function (dialogResult) {
	        this._overlayRef.dispose();
	        this._afterClosed.next(dialogResult);
	        this._afterClosed.complete();
	    };
	    /** Gets an observable that is notified when the dialog is finished closing. */
	    MdDialogRef.prototype.afterClosed = function () {
	        return this._afterClosed.asObservable();
	    };
	    return MdDialogRef;
	}());
	
	/** Custom injector type specifically for instantiating components with a dialog. */
	var DialogInjector = (function () {
	    function DialogInjector(_dialogRef, _parentInjector) {
	        this._dialogRef = _dialogRef;
	        this._parentInjector = _parentInjector;
	    }
	    DialogInjector.prototype.get = function (token, notFoundValue) {
	        if (token === MdDialogRef) {
	            return this._dialogRef;
	        }
	        return this._parentInjector.get(token, notFoundValue);
	    };
	    return DialogInjector;
	}());
	
	var __extends$20 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
	var MdDialogContentAlreadyAttachedError = (function (_super) {
	    __extends$20(MdDialogContentAlreadyAttachedError, _super);
	    function MdDialogContentAlreadyAttachedError() {
	        _super.call(this, 'Attempting to attach dialog content after content is already attached');
	    }
	    return MdDialogContentAlreadyAttachedError;
	}(MdError));
	
	var __extends$19 = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate$49 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$49 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Internal component that wraps user-provided dialog content.
	 */
	var MdDialogContainer = (function (_super) {
	    __extends$19(MdDialogContainer, _super);
	    function MdDialogContainer(_ngZone) {
	        _super.call(this);
	        this._ngZone = _ngZone;
	        /** Element that was focused before the dialog was opened. Save this to restore upon close. */
	        this._elementFocusedBeforeDialogWasOpened = null;
	    }
	    /** Attach a portal as content to this dialog container. */
	    MdDialogContainer.prototype.attachComponentPortal = function (portal) {
	        var _this = this;
	        if (this._portalHost.hasAttached()) {
	            throw new MdDialogContentAlreadyAttachedError();
	        }
	        var attachResult = this._portalHost.attachComponentPortal(portal);
	        // If were to attempt to focus immediately, then the content of the dialog would not yet be
	        // ready in instances where change detection has to run first. To deal with this, we simply
	        // wait for the microtask queue to be empty.
	        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
	            _this._elementFocusedBeforeDialogWasOpened = document.activeElement;
	            _this._focusTrap.focusFirstTabbableElement();
	        });
	        return attachResult;
	    };
	    MdDialogContainer.prototype.attachTemplatePortal = function (portal) {
	        throw Error('Not yet implemented');
	    };
	    /** Handles the user pressing the Escape key. */
	    MdDialogContainer.prototype.handleEscapeKey = function () {
	        // TODO(jelbourn): add MdDialogConfig option to disable this behavior.
	        this.dialogRef.close();
	    };
	    MdDialogContainer.prototype.ngOnDestroy = function () {
	        var _this = this;
	        // When the dialog is destroyed, return focus to the element that originally had it before
	        // the dialog was opened. Wait for the DOM to finish settling before changing the focus so
	        // that it doesn't end up back on the <body>.
	        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
	            _this._elementFocusedBeforeDialogWasOpened.focus();
	        });
	    };
	    __decorate$49([
	        _angular_core.ViewChild(PortalHostDirective), 
	        __metadata$49('design:type', PortalHostDirective)
	    ], MdDialogContainer.prototype, "_portalHost", void 0);
	    __decorate$49([
	        _angular_core.ViewChild(FocusTrap), 
	        __metadata$49('design:type', FocusTrap)
	    ], MdDialogContainer.prototype, "_focusTrap", void 0);
	    MdDialogContainer = __decorate$49([
	        _angular_core.Component({selector: 'md-dialog-container',
	            template: "<focus-trap> <template portalHost></template> </focus-trap> ",
	            styles: ["md-dialog-container { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); display: block; overflow: hidden; padding: 24px; } /*# sourceMappingURL=dialog-container.css.map */ "],
	            host: {
	                'class': 'md-dialog-container',
	                '[attr.role]': 'dialogConfig?.role',
	                '(keydown.escape)': 'handleEscapeKey()',
	            },
	            encapsulation: _angular_core.ViewEncapsulation.None,
	        }), 
	        __metadata$49('design:paramtypes', [_angular_core.NgZone])
	    ], MdDialogContainer);
	    return MdDialogContainer;
	}(BasePortalHost));
	
	/**
	 * Configuration for opening a modal dialog with the MdDialog service.
	 */
	var MdDialogConfig = (function () {
	    function MdDialogConfig() {
	        /** The ARIA role of the dialog element. */
	        this.role = 'dialog';
	    }
	    return MdDialogConfig;
	}());
	
	var __decorate$48 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$48 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	// TODO(jelbourn): add support for opening with a TemplateRef
	// TODO(jelbourn): add `closeAll` method
	// TODO(jelbourn): default dialog config
	// TODO(jelbourn): escape key closes dialog
	// TODO(jelbourn): dialog content directives (e.g., md-dialog-header)
	// TODO(jelbourn): animations
	/**
	 * Service to open Material Design modal dialogs.
	 */
	var MdDialog = (function () {
	    function MdDialog(_overlay, _injector) {
	        this._overlay = _overlay;
	        this._injector = _injector;
	    }
	    /**
	     * Opens a modal dialog containing the given component.
	     * @param component Type of the component to load into the load.
	     * @param config
	     */
	    MdDialog.prototype.open = function (component, config) {
	        var overlayRef = this._createOverlay(config);
	        var dialogContainer = this._attachDialogContainer(overlayRef, config);
	        return this._attachDialogContent(component, dialogContainer, overlayRef);
	    };
	    /**
	     * Creates the overlay into which the dialog will be loaded.
	     * @param dialogConfig The dialog configuration.
	     * @returns A promise resolving to the OverlayRef for the created overlay.
	     */
	    MdDialog.prototype._createOverlay = function (dialogConfig) {
	        var overlayState = this._getOverlayState(dialogConfig);
	        return this._overlay.create(overlayState);
	    };
	    /**
	     * Attaches an MdDialogContainer to a dialog's already-created overlay.
	     * @param overlay Reference to the dialog's underlying overlay.
	     * @param config The dialog configuration.
	     * @returns A promise resolving to a ComponentRef for the attached container.
	     */
	    MdDialog.prototype._attachDialogContainer = function (overlay, config) {
	        var containerPortal = new ComponentPortal(MdDialogContainer, config.viewContainerRef);
	        var containerRef = overlay.attach(containerPortal);
	        containerRef.instance.dialogConfig = config;
	        return containerRef.instance;
	    };
	    /**
	     * Attaches the user-provided component to the already-created MdDialogContainer.
	     * @param component The type of component being loaded into the dialog.
	     * @param dialogContainer Reference to the wrapping MdDialogContainer.
	     * @param overlayRef Reference to the overlay in which the dialog resides.
	     * @returns A promise resolving to the MdDialogRef that should be returned to the user.
	     */
	    MdDialog.prototype._attachDialogContent = function (component, dialogContainer, overlayRef) {
	        // Create a reference to the dialog we're creating in order to give the user a handle
	        // to modify and close it.
	        var dialogRef = new MdDialogRef(overlayRef);
	        // When the dialog backdrop is clicked, we want to close it.
	        overlayRef.backdropClick().subscribe(function () { return dialogRef.close(); });
	        // Set the dialogRef to the container so that it can use the ref to close the dialog.
	        dialogContainer.dialogRef = dialogRef;
	        // We create an injector specifically for the component we're instantiating so that it can
	        // inject the MdDialogRef. This allows a component loaded inside of a dialog to close itself
	        // and, optionally, to return a value.
	        var dialogInjector = new DialogInjector(dialogRef, this._injector);
	        var contentPortal = new ComponentPortal(component, null, dialogInjector);
	        var contentRef = dialogContainer.attachComponentPortal(contentPortal);
	        dialogRef.componentInstance = contentRef.instance;
	        return dialogRef;
	    };
	    /**
	     * Creates an overlay state from a dialog config.
	     * @param dialogConfig The dialog configuration.
	     * @returns The overlay configuration.
	     */
	    MdDialog.prototype._getOverlayState = function (dialogConfig) {
	        var state = new OverlayState();
	        state.hasBackdrop = true;
	        state.positionStrategy = this._overlay.position()
	            .global()
	            .centerHorizontally()
	            .centerVertically();
	        return state;
	    };
	    MdDialog = __decorate$48([
	        _angular_core.Injectable(), 
	        __metadata$48('design:paramtypes', [Overlay, _angular_core.Injector])
	    ], MdDialog);
	    return MdDialog;
	}());
	var MdDialogModule = (function () {
	    function MdDialogModule() {
	    }
	    MdDialogModule.forRoot = function () {
	        return {
	            ngModule: MdDialogModule,
	            providers: [MdDialog, OVERLAY_PROVIDERS, InteractivityChecker],
	        };
	    };
	    MdDialogModule = __decorate$48([
	        _angular_core.NgModule({
	            imports: [OverlayModule, PortalModule, A11yModule],
	            exports: [MdDialogContainer],
	            declarations: [MdDialogContainer],
	            entryComponents: [MdDialogContainer],
	        }), 
	        __metadata$48('design:paramtypes', [])
	    ], MdDialogModule);
	    return MdDialogModule;
	}());
	
	var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata$15 = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var MATERIAL_MODULES = [
	    MdButtonModule,
	    MdButtonToggleModule,
	    MdCardModule,
	    MdCheckboxModule,
	    MdDialogModule,
	    MdGridListModule,
	    MdIconModule,
	    MdInputModule,
	    MdListModule,
	    MdMenuModule,
	    MdProgressBarModule,
	    MdProgressCircleModule,
	    MdRadioModule,
	    MdRippleModule,
	    MdSelectModule,
	    MdSidenavModule,
	    MdSliderModule,
	    MdSlideToggleModule,
	    MdSnackBarModule,
	    MdTabsModule,
	    MdToolbarModule,
	    MdTooltipModule,
	    OverlayModule,
	    PortalModule,
	    RtlModule,
	    A11yModule,
	];
	var MaterialRootModule = (function () {
	    function MaterialRootModule() {
	    }
	    MaterialRootModule = __decorate$15([
	        _angular_core.NgModule({
	            imports: [
	                MdButtonModule.forRoot(),
	                MdCardModule.forRoot(),
	                MdCheckboxModule.forRoot(),
	                MdGridListModule.forRoot(),
	                MdInputModule.forRoot(),
	                MdListModule.forRoot(),
	                MdProgressBarModule.forRoot(),
	                MdProgressCircleModule.forRoot(),
	                MdRippleModule.forRoot(),
	                MdSelectModule.forRoot(),
	                MdSidenavModule.forRoot(),
	                MdTabsModule.forRoot(),
	                MdToolbarModule.forRoot(),
	                PortalModule.forRoot(),
	                RtlModule.forRoot(),
	                // These modules include providers.
	                A11yModule.forRoot(),
	                MdButtonToggleModule.forRoot(),
	                MdDialogModule.forRoot(),
	                MdIconModule.forRoot(),
	                MdMenuModule.forRoot(),
	                MdRadioModule.forRoot(),
	                MdSliderModule.forRoot(),
	                MdSlideToggleModule.forRoot(),
	                MdSnackBarModule.forRoot(),
	                MdTooltipModule.forRoot(),
	                OverlayModule.forRoot(),
	            ],
	            exports: MATERIAL_MODULES,
	        }), 
	        __metadata$15('design:paramtypes', [])
	    ], MaterialRootModule);
	    return MaterialRootModule;
	}());
	var MaterialModule = (function () {
	    function MaterialModule() {
	    }
	    MaterialModule.forRoot = function () {
	        return { ngModule: MaterialRootModule };
	    };
	    MaterialModule = __decorate$15([
	        _angular_core.NgModule({
	            imports: MATERIAL_MODULES,
	            exports: MATERIAL_MODULES,
	        }), 
	        __metadata$15('design:paramtypes', [])
	    ], MaterialModule);
	    return MaterialModule;
	}());
	
	exports.MdCoreModule = MdCoreModule;
	exports.Dir = Dir;
	exports.RtlModule = RtlModule;
	exports.Portal = Portal;
	exports.BasePortalHost = BasePortalHost;
	exports.ComponentPortal = ComponentPortal;
	exports.TemplatePortal = TemplatePortal;
	exports.PortalHostDirective = PortalHostDirective;
	exports.TemplatePortalDirective = TemplatePortalDirective;
	exports.PortalModule = PortalModule;
	exports.DomPortalHost = DomPortalHost;
	exports.Overlay = Overlay;
	exports.OVERLAY_PROVIDERS = OVERLAY_PROVIDERS;
	exports.OverlayContainer = OverlayContainer;
	exports.OverlayRef = OverlayRef;
	exports.OverlayState = OverlayState;
	exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
	exports.OverlayOrigin = OverlayOrigin;
	exports.OverlayModule = OverlayModule;
	exports.MdGestureConfig = MdGestureConfig;
	exports.MdRipple = MdRipple;
	exports.MdRippleModule = MdRippleModule;
	exports.MdLiveAnnouncer = MdLiveAnnouncer;
	exports.LIVE_ANNOUNCER_ELEMENT_TOKEN = LIVE_ANNOUNCER_ELEMENT_TOKEN;
	exports.FocusTrap = FocusTrap;
	exports.InteractivityChecker = InteractivityChecker;
	exports.A11yModule = A11yModule;
	exports.MdUniqueSelectionDispatcher = MdUniqueSelectionDispatcher;
	exports.MdLineModule = MdLineModule;
	exports.MdLine = MdLine;
	exports.MdLineSetter = MdLineSetter;
	exports.applyCssTransform = applyCssTransform;
	exports.MdError = MdError;
	exports.BooleanFieldValue = BooleanFieldValue;
	exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
	exports.ConnectionPositionPair = ConnectionPositionPair;
	exports.UP_ARROW = UP_ARROW;
	exports.DOWN_ARROW = DOWN_ARROW;
	exports.RIGHT_ARROW = RIGHT_ARROW;
	exports.LEFT_ARROW = LEFT_ARROW;
	exports.ENTER = ENTER;
	exports.TAB = TAB;
	exports.MaterialRootModule = MaterialRootModule;
	exports.MaterialModule = MaterialModule;
	exports.MdButton = MdButton;
	exports.MdAnchor = MdAnchor;
	exports.MdButtonModule = MdButtonModule;
	exports.MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR;
	exports.MdButtonToggleChange = MdButtonToggleChange;
	exports.MdButtonToggleGroup = MdButtonToggleGroup;
	exports.MdButtonToggleGroupMultiple = MdButtonToggleGroupMultiple;
	exports.MdButtonToggle = MdButtonToggle;
	exports.MdButtonToggleModule = MdButtonToggleModule;
	exports.MdCardContent = MdCardContent;
	exports.MdCardTitle = MdCardTitle;
	exports.MdCardSubtitle = MdCardSubtitle;
	exports.MdCardActions = MdCardActions;
	exports.MdCardFooter = MdCardFooter;
	exports.MdCard = MdCard;
	exports.MdCardHeader = MdCardHeader;
	exports.MdCardTitleGroup = MdCardTitleGroup;
	exports.MdCardModule = MdCardModule;
	exports.MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = MD_CHECKBOX_CONTROL_VALUE_ACCESSOR;
	exports.MdCheckboxChange = MdCheckboxChange;
	exports.MdCheckbox = MdCheckbox;
	exports.MdCheckboxModule = MdCheckboxModule;
	exports.MdDialog = MdDialog;
	exports.MdDialogModule = MdDialogModule;
	exports.MdDialogConfig = MdDialogConfig;
	exports.MdDialogRef = MdDialogRef;
	exports.MdDialogContainer = MdDialogContainer;
	exports.MdGridList = MdGridList;
	exports.MdGridListModule = MdGridListModule;
	exports.MdIconInvalidNameError = MdIconInvalidNameError;
	exports.MdIcon = MdIcon;
	exports.MdIconModule = MdIconModule;
	exports.MdIconRegistry = MdIconRegistry;
	exports.MD_INPUT_CONTROL_VALUE_ACCESSOR = MD_INPUT_CONTROL_VALUE_ACCESSOR;
	exports.MdInputPlaceholderConflictError = MdInputPlaceholderConflictError;
	exports.MdInputUnsupportedTypeError = MdInputUnsupportedTypeError;
	exports.MdInputDuplicatedHintError = MdInputDuplicatedHintError;
	exports.MdPlaceholder = MdPlaceholder;
	exports.MdHint = MdHint;
	exports.MdInput = MdInput;
	exports.MdInputModule = MdInputModule;
	exports.MdListDivider = MdListDivider;
	exports.MdList = MdList;
	exports.MdListAvatar = MdListAvatar;
	exports.MdListItem = MdListItem;
	exports.MdListModule = MdListModule;
	exports.MdMenuModule = MdMenuModule;
	exports.MdMenu = MdMenu;
	exports.MdMenuItem = MdMenuItem;
	exports.MdMenuTrigger = MdMenuTrigger;
	exports.MdProgressBar = MdProgressBar;
	exports.MdProgressBarModule = MdProgressBarModule;
	exports.MdProgressCircle = MdProgressCircle;
	exports.MdSpinner = MdSpinner;
	exports.MdProgressCircleModule = MdProgressCircleModule;
	exports.MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR;
	exports.MdRadioChange = MdRadioChange;
	exports.MdRadioGroup = MdRadioGroup;
	exports.MdRadioButton = MdRadioButton;
	exports.MdRadioModule = MdRadioModule;
	exports.MdSelectModule = MdSelectModule;
	exports.MdSelect = MdSelect;
	exports.MdDuplicatedSidenavError = MdDuplicatedSidenavError;
	exports.MdSidenav = MdSidenav;
	exports.MdSidenavLayout = MdSidenavLayout;
	exports.MdSidenavModule = MdSidenavModule;
	exports.MD_SLIDER_VALUE_ACCESSOR = MD_SLIDER_VALUE_ACCESSOR;
	exports.MdSlider = MdSlider;
	exports.SliderRenderer = SliderRenderer;
	exports.MdSliderModule = MdSliderModule;
	exports.MD_SLIDE_TOGGLE_VALUE_ACCESSOR = MD_SLIDE_TOGGLE_VALUE_ACCESSOR;
	exports.MdSlideToggleChange = MdSlideToggleChange;
	exports.MdSlideToggle = MdSlideToggle;
	exports.MdSlideToggleModule = MdSlideToggleModule;
	exports.MdSnackBar = MdSnackBar;
	exports.MdSnackBarModule = MdSnackBarModule;
	exports.MdSnackBarRef = MdSnackBarRef;
	exports.MdSnackBarConfig = MdSnackBarConfig;
	exports.MdSnackBarContainer = MdSnackBarContainer;
	exports.MdTabChangeEvent = MdTabChangeEvent;
	exports.MdTab = MdTab;
	exports.MdTabGroup = MdTabGroup;
	exports.MdTabsModule = MdTabsModule;
	exports.MdToolbarRow = MdToolbarRow;
	exports.MdToolbar = MdToolbar;
	exports.MdToolbarModule = MdToolbarModule;
	exports.MdTooltip = MdTooltip;
	exports.TooltipComponent = TooltipComponent;
	exports.MdTooltipModule = MdTooltipModule;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	
	//# sourceMappingURL=./material.umd.js.map


/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(13);
	var forms_1 = __webpack_require__(45);
	var Observable_1 = __webpack_require__(4);
	__webpack_require__(311);
	__webpack_require__(314);
	var Option = (function () {
	    function Option() {
	    }
	    return Option;
	}());
	exports.Option = Option;
	var AppComponent = (function () {
	    function AppComponent() {
	        this.selectorOptions = [];
	        this.formName = 'YELLOW';
	    }
	    AppComponent.prototype.ngOnInit = function () {
	        this.demoForm = new forms_1.FormGroup({
	            person: new forms_1.FormControl({ value: '', disabled: false })
	        });
	        this.getAsynchronously();
	    };
	    AppComponent.prototype.getAsynchronously = function () {
	        var _this = this;
	        var options = [{
	                value: 'SOFA',
	                name: 'Sofa'
	            }, {
	                value: 'TV',
	                name: 'TV',
	                selected: true
	            }, {
	                value: 'TABLE',
	                name: 'Table',
	                disabled: true
	            }];
	        var subscription = Observable_1.Observable.from(options).delay(1000).subscribe(function (option) {
	            _this.selectorOptions.push(option);
	        }, function (err) {
	            console.log(err);
	        }, function () {
	            _this.setMessage('Content of selector asynchronously loaded!');
	        });
	    };
	    AppComponent.prototype.setMessage = function (msg) {
	        this.message = msg;
	        this.clearMessage();
	    };
	    AppComponent.prototype.clearMessage = function () {
	        var _this = this;
	        if (this.messageClearTimeout)
	            clearTimeout(this.messageClearTimeout);
	        this.messageClearTimeout = setTimeout(function () { _this.message = null; }, 2000);
	    };
	    AppComponent.prototype.onSelectionChange = function (selector, value) {
	        this.setMessage('Selector ' + selector + ' value has changed to: ' + value);
	    };
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            styles: ["\n        div.selector-container {\n            width:200px;\n            margin:20px;\n            float:left;\n        }\n        div.notifications {\n            position: fixed;\n            bottom:0;\n            padding:40px;\n        }\n        div.error {\n            color: red;\n        }\n        div.divider {\n            clear:both;\n            margin:20px;\n        }\n    "],
	            template: "\n    <div>\n        <h2>angular2-select</h2>\n        <div class=\"selector-container\">\n            <h4>Simple selector:</h4>\n            <bm-ng2-select\n                placeholder=\"Select a country\"\n                (selectionChanged)=\"onSelectionChange('Country', $event);\">\n                <bm-ng2-option value=\"PL\">Poland</bm-ng2-option>\n                <bm-ng2-option value=\"US\" disabled=\"true\">USA</bm-ng2-option>\n                <bm-ng2-option value=\"DK\" selected=\"true\">Denmark</bm-ng2-option>\n                <bm-ng2-option value=\"FR\">France</bm-ng2-option>\n            </bm-ng2-select>\n        </div>\n        <div class=\"selector-container\">\n            <h4>Asynchronously loaded:</h4>\n            <bm-ng2-select\n                placeholder=\"Select an item\"\n                (selectionChanged)=\"onSelectionChange('Item', $event);\">\n                <bm-ng2-option\n                    *ngFor=\"let item of selectorOptions\"\n                    value=\"{{item.value}}\"\n                    selected=\"{{item.selected}}\"\n                    disabled=\"{{item.disabled}}\">{{item.name}}</bm-ng2-option>\n            </bm-ng2-select>\n        </div>\n        <div class=\"divider\"></div>\n        <div class=\"selector-container\">\n            <form [formGroup]=\"demoForm\">\n                <h4>Model driven form:</h4>\n                <bm-ng2-select\n                    formControlName=\"person\"\n                    placeholder=\"Select person\"\n                    required=true\n                    (selectionChanged)=\"onSelectionChange('Name', $event);\">\n                    <bm-ng2-option value=\"ANNA\">Anna</bm-ng2-option>\n                    <bm-ng2-option value=\"NATALIA\">Natalia</bm-ng2-option>\n                    <bm-ng2-option value=\"KASIA\">Kasia</bm-ng2-option>\n                </bm-ng2-select>\n            </form>\n            <div class=\"error\" *ngIf=\"!demoForm.controls.person.valid\">\n                This field is required\n            </div>\n        </div>\n        <div class=\"selector-container\">\n            <form #f=\"ngForm\">\n                <h4>Template driven form:</h4>\n                <bm-ng2-select\n                    [(ngModel)]=\"formName\"\n                    name=\"color\"\n                    placeholder=\"Select color\"\n                    (selectionChanged)=\"onSelectionChange('Color', $event);\">\n                    <bm-ng2-option value=\"RED\">Red</bm-ng2-option>\n                    <bm-ng2-option value=\"BLACK\">Black</bm-ng2-option>\n                    <bm-ng2-option value=\"YELLOW\">Yellow</bm-ng2-option>\n                </bm-ng2-select>\n            </form>\n        </div>\n        <div class=\"notifications\">\n            Notifications: {{ message }}\n        </div>\n    </div>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var platform_browser_1 = __webpack_require__(41);
	var core_1 = __webpack_require__(13);
	var forms_1 = __webpack_require__(45);
	var app_component_1 = __webpack_require__(141);
	var module_1 = __webpack_require__(144);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    AppModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                platform_browser_1.BrowserModule,
	                forms_1.FormsModule,
	                forms_1.ReactiveFormsModule,
	                module_1.Angular2SelectModule
	            ],
	            declarations: [app_component_1.AppComponent],
	            bootstrap: [app_component_1.AppComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppModule);
	    return AppModule;
	}());
	exports.AppModule = AppModule;


/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(13);
	var forms_1 = __webpack_require__(45);
	var option_component_1 = __webpack_require__(93);
	var Angular2SelectComponent = (function () {
	    function Angular2SelectComponent(el, renderer, changeDetectionRef) {
	        this.el = el;
	        this.renderer = renderer;
	        this.changeDetectionRef = changeDetectionRef;
	        this.required = false;
	        this.selectionChanged = new core_1.EventEmitter();
	        this.selection = {
	            value: null,
	            text: ''
	        };
	        this.areOptionsVisible = false;
	        this.animateState = 'hidden';
	        // to propagate change event to external form
	        this.propagateChange = function (_) { };
	        // to propagate touch event to external form
	        this.propagateTouch = function (_) { };
	        // information if we have subscribed to all options change events
	        this.initialized = false;
	    }
	    /**
	     * Function binds click event to the document. The options will hide whenever
	     * user click anywhere outside the selector.
	     * TODO: make it as an @Input() so the default behaviour can be configured
	     * @param event MouseEvent
	     */
	    Angular2SelectComponent.prototype.onClick = function (event) {
	        // check if the element that was clicked is contained within this component
	        // if not just hide the options
	        if (!this.el.nativeElement.contains(event.target))
	            this._hideOptions();
	    };
	    /**
	     * Function binds to all options onSelect emitted events.
	     * We do it in AfterContentChecked life cycle hook because the options
	     * can be loaded asynchronously with some delay. Using initialized flag we
	     * make sure we subscribe to it just once.
	     */
	    Angular2SelectComponent.prototype.ngAfterContentChecked = function () {
	        var _this = this;
	        if (!this.options.length || this.initialized)
	            return;
	        // mark as initialized
	        this.initialized = true;
	        // subscribe to all options emitted events
	        this.options.forEach(function (option) {
	            option.onSelect.subscribe(function (value) {
	                _this._unselectAllOtherOptions(value);
	                _this._markSelectionOnPlaceholder(option);
	                _this._hideOptions();
	            });
	            if (option.selected)
	                _this.selection.value = option.value;
	        });
	        // now we can setup text property.
	        // we could do this above when looping through options and finding selected one,
	        // but it will work only in case we have a property selected in option.
	        // in case we use selector in form and set data for it using [(ngModel)]
	        // we ahve only value of selection (function writeValue is called before the view is initiaded).
	        this._markOptionAsSelected(this.selection.value);
	    };
	    /*
	     * In model driven form if the value is set when initializing the form, eg:
	     * person: new FormControl('ANNA') then the life cycle of library is:
	     * writeValue (from ControlValueAccessor) -> ngAfterContentChecked -> options ngAfterViewInit.
	     * we set the selected text in:
	     * a) writeValue (if ngAfterContentChecked already called - this happens in template driven forms)
	     * b) ngAfterContentChecked (when we load data asynchronously)
	     * but in this case (model driven form) we have no text as it is set in option ngAfterViewInit
	     * So we have to set the selection text here if value is set but no text.
	     */
	    Angular2SelectComponent.prototype.ngAfterViewInit = function () {
	        if (this.selection.value && !this.selection.text) {
	            this._markOptionAsSelected(this.selection.value);
	            this.changeDetectionRef.detectChanges();
	        }
	    };
	    /**
	     * Implementation of ControlValueAccessor interface
	     */
	    Angular2SelectComponent.prototype.writeValue = function (value) {
	        if (value !== undefined) {
	            this.selection.value = value;
	            // selector was initialized before so to get a selection text
	            // we have to do it now
	            if (this.initialized && !this.selection.text) {
	                this._markOptionAsSelected(this.selection.value);
	            }
	        }
	    };
	    /**
	     * Implementation of ControlValueAccessor interface
	     */
	    Angular2SelectComponent.prototype.registerOnChange = function (fn) {
	        this.propagateChange = fn;
	    };
	    /**
	     * Implementation of ControlValueAccessor interface
	     */
	    Angular2SelectComponent.prototype.registerOnTouched = function (fn) {
	        this.propagateTouch = fn;
	    };
	    /**
	     * Implementation of ControlValueAccessor interface
	     */
	    Angular2SelectComponent.prototype.setDisabledState = function (isDisabled) {
	        this.internalInput.disabled = isDisabled;
	    };
	    /**
	     * Function looks for specific bm-ng2-option element and mark it as active
	     * @param value string value of bm-ng2-option element to be selected
	     */
	    Angular2SelectComponent.prototype._markOptionAsSelected = function (value) {
	        // options is undefined when called before view is initiaded
	        // which is the first call of writeValue
	        if (typeof this.options == 'undefined')
	            this.selection.value = value;
	        else {
	            var option = this.options.filter(function (opt) {
	                return opt.value == value;
	            });
	            if (option && option.length) {
	                option[0].markAsSelected(false);
	                this.selection.text = option[0].text;
	            }
	        }
	    };
	    /**
	     * Function sets the value of select placeholder. It is called after bm-ng2-option is being clicked.
	     * @param option Angular2OptionComponent clicked bm-ng2-option
	     */
	    Angular2SelectComponent.prototype._markSelectionOnPlaceholder = function (option) {
	        this.selection = {
	            value: option.value,
	            text: option.text
	        };
	        this.propagateChange(option.value);
	        this.selectionChanged.emit(option.value);
	    };
	    /**
	     * Function loops through all bm-ng2-options and deselects them
	     * @param value string value of bm-ng2-option element not to be changed
	     */
	    Angular2SelectComponent.prototype._unselectAllOtherOptions = function (value) {
	        this.options.forEach(function (option) {
	            if (option.value != value)
	                option.unselect();
	        });
	    };
	    /**
	     * Close selector
	     */
	    Angular2SelectComponent.prototype._hideOptions = function () {
	        var _this = this;
	        this.animateState = 'hidden';
	        setTimeout(function () { _this.areOptionsVisible = false; }, 300);
	    };
	    /**
	     * Function that is triggered when md-input is focused
	     */
	    Angular2SelectComponent.prototype._onEnter = function () {
	        // when the md-input field get focused than the document is not receiving the click event
	        // (maybe because the md-input stops propagating it)
	        // in this case we have trigger the click event manually on the component
	        // so it will close other open selec boxes as this event is propagated down to document
	        var event = new MouseEvent('click', { bubbles: true });
	        this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [event]);
	        // propagate touch event. Part of ControlValueAccessor interface.
	        this.propagateTouch(true);
	        // open selector options
	        this.areOptionsVisible = true;
	        this.animateState = 'visible';
	    };
	    /**
	     * Deselect current selection
	     * @param event MouseEvent
	     */
	    Angular2SelectComponent.prototype._clear = function (event) {
	        // we have to stop propagation to not to open the options when
	        // clear icon is being clicked
	        event.stopPropagation();
	        this.selection = {
	            value: null,
	            text: ''
	        };
	        // make sure the options are maked ad not active
	        this._unselectAllOtherOptions('');
	        // emit the event
	        this.propagateChange(null);
	        this.selectionChanged.emit(null);
	    };
	    /**
	     * Opens options after the arrow icon is being clicked
	     * @param event MouseEvent
	     */
	    Angular2SelectComponent.prototype._open = function (event) {
	        event.stopPropagation();
	        this.internalInput.focus();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Angular2SelectComponent.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Angular2SelectComponent.prototype, "required", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], Angular2SelectComponent.prototype, "selectionChanged", void 0);
	    __decorate([
	        core_1.ViewChild('internalInput'), 
	        __metadata('design:type', Object)
	    ], Angular2SelectComponent.prototype, "internalInput", void 0);
	    __decorate([
	        core_1.ContentChildren(option_component_1.Angular2OptionComponent), 
	        __metadata('design:type', (typeof (_b = typeof core_1.QueryList !== 'undefined' && core_1.QueryList) === 'function' && _b) || Object)
	    ], Angular2SelectComponent.prototype, "options", void 0);
	    __decorate([
	        core_1.HostListener('document:click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Angular2SelectComponent.prototype, "onClick", null);
	    Angular2SelectComponent = __decorate([
	        core_1.Component({
	            selector: 'bm-ng2-select',
	            template: "\n        <div class=\"bm-ng2-select-container\">\n            <md-input\n                #internalInput\n                autoComplete=\"off\"\n                readonly=\"true\"\n                [(ngModel)] = \"selection.text\"\n                (focus)=\"_onEnter($event)\"\n                placeholder=\"{{placeholder}}\"\n                required=\"{{required}}\">\n            </md-input>\n            <md-icon\n                *ngIf=\"!required && selection.value\"\n                fontSet=\"fa\"\n                fontIcon=\"fa-times\"\n                (click)=\"_clear($event)\">\n            </md-icon>\n            <md-icon\n                *ngIf=\"required || !selection.value\"\n                fontSet=\"fa\"\n                fontIcon=\"fa-caret-down\"\n                (click)=\"_open($event)\">\n            </md-icon>\n            <div class=\"options\"\n                [hidden]=\"!areOptionsVisible\"\n                [@animateState]=\"animateState\">\n                <md-card>\n                    <ul>\n                        <ng-content></ng-content>\n                    </ul>\n                </md-card>\n            </div>\n        </div>\n    ",
	            styles: ["\n        div.bm-ng2-select-container {\n          position: relative;\n        }\n\n        div.bm-ng2-select-container md-input {\n          width: 100%;\n          z-index: 1;\n        }\n\n        div.bm-ng2-select-container md-icon {\n          position: absolute;\n          top: 16px;\n          right: 0;\n          color: rgba(0, 0, 0, 0.38);\n          cursor: pointer;\n          z-index: 2;\n        }\n\n        div.bm-ng2-select-container div.options {\n          position: absolute;\n          top: 0;\n          width: 100%;\n          z-index: 3;\n          background: white;\n        }\n\n        div.bm-ng2-select-container div.options md-card {\n          padding: 0;\n          max-height: 254px;\n          overflow-y: auto;\n        }\n\n        div.bm-ng2-select-container div.options md-card ul {\n          list-style-type: none;\n          padding: 0;\n        }\n    "],
	            animations: [
	                core_1.trigger('animateState', [
	                    core_1.state('hidden', core_1.style({
	                        opacity: 0,
	                        height: 0
	                    })),
	                    core_1.state('visible', core_1.style({
	                        opacity: 1,
	                        height: 'auto'
	                    })),
	                    core_1.transition('hidden => visible', core_1.animate(300)),
	                    core_1.transition('visible => hidden', core_1.animate(150))
	                ])
	            ],
	            providers: [{
	                    provide: forms_1.NG_VALUE_ACCESSOR,
	                    useExisting: core_1.forwardRef(function () { return Angular2SelectComponent; }),
	                    multi: true
	                }]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object, (typeof (_e = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _e) || Object])
	    ], Angular2SelectComponent);
	    return Angular2SelectComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.Angular2SelectComponent = Angular2SelectComponent;


/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(13);
	var platform_browser_1 = __webpack_require__(41);
	var http_1 = __webpack_require__(65);
	var forms_1 = __webpack_require__(45);
	var material_1 = __webpack_require__(140);
	var select_component_1 = __webpack_require__(143);
	var option_component_1 = __webpack_require__(93);
	var Angular2SelectModule = (function () {
	    function Angular2SelectModule() {
	    }
	    Angular2SelectModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                platform_browser_1.BrowserModule,
	                http_1.HttpModule,
	                material_1.MaterialModule,
	                forms_1.FormsModule,
	                forms_1.ReactiveFormsModule
	            ],
	            providers: [
	                material_1.MdIconRegistry
	            ],
	            declarations: [
	                select_component_1.Angular2SelectComponent,
	                option_component_1.Angular2OptionComponent
	            ],
	            exports: [
	                select_component_1.Angular2SelectComponent,
	                option_component_1.Angular2OptionComponent
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Angular2SelectModule);
	    return Angular2SelectModule;
	}());
	exports.Angular2SelectModule = Angular2SelectModule;


/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },

/***/ 308:
/***/ function(module, exports) {

	"use strict";
	/**
	 * An execution context and a data structure to order tasks and schedule their
	 * execution. Provides a notion of (potentially virtual) time, through the
	 * `now()` getter method.
	 *
	 * Each unit of work in a Scheduler is called an {@link Action}.
	 *
	 * ```ts
	 * class Scheduler {
	 *   now(): number;
	 *   schedule(work, delay?, state?): Subscription;
	 * }
	 * ```
	 *
	 * @class Scheduler
	 */
	var Scheduler = (function () {
	    function Scheduler(SchedulerAction, now) {
	        if (now === void 0) { now = Scheduler.now; }
	        this.SchedulerAction = SchedulerAction;
	        this.now = now;
	    }
	    /**
	     * Schedules a function, `work`, for execution. May happen at some point in
	     * the future, according to the `delay` parameter, if specified. May be passed
	     * some context object, `state`, which will be passed to the `work` function.
	     *
	     * The given arguments will be processed an stored as an Action object in a
	     * queue of actions.
	     *
	     * @param {function(state: ?T): ?Subscription} work A function representing a
	     * task, or some unit of work to be executed by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler itself.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @return {Subscription} A subscription in order to be able to unsubscribe
	     * the scheduled work.
	     */
	    Scheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return new this.SchedulerAction(this, work).schedule(state, delay);
	    };
	    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
	    return Scheduler;
	}());
	exports.Scheduler = Scheduler;
	//# sourceMappingURL=Scheduler.js.map

/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var forkJoin_1 = __webpack_require__(326);
	Observable_1.Observable.forkJoin = forkJoin_1.forkJoin;
	//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var from_1 = __webpack_require__(327);
	Observable_1.Observable.from = from_1.from;
	//# sourceMappingURL=from.js.map

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var of_1 = __webpack_require__(329);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var catch_1 = __webpack_require__(330);
	Observable_1.Observable.prototype.catch = catch_1._catch;
	Observable_1.Observable.prototype._catch = catch_1._catch;
	//# sourceMappingURL=catch.js.map

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var delay_1 = __webpack_require__(331);
	Observable_1.Observable.prototype.delay = delay_1.delay;
	//# sourceMappingURL=delay.js.map

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var do_1 = __webpack_require__(332);
	Observable_1.Observable.prototype.do = do_1._do;
	Observable_1.Observable.prototype._do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var filter_1 = __webpack_require__(333);
	Observable_1.Observable.prototype.filter = filter_1.filter;
	//# sourceMappingURL=filter.js.map

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var finally_1 = __webpack_require__(334);
	Observable_1.Observable.prototype.finally = finally_1._finally;
	Observable_1.Observable.prototype._finally = finally_1._finally;
	//# sourceMappingURL=finally.js.map

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var first_1 = __webpack_require__(335);
	Observable_1.Observable.prototype.first = first_1.first;
	//# sourceMappingURL=first.js.map

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var map_1 = __webpack_require__(336);
	Observable_1.Observable.prototype.map = map_1.map;
	//# sourceMappingURL=map.js.map

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(4);
	var share_1 = __webpack_require__(339);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(4);
	var ScalarObservable_1 = __webpack_require__(134);
	var EmptyObservable_1 = __webpack_require__(87);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayLikeObservable = (function (_super) {
	    __extends(ArrayLikeObservable, _super);
	    function ArrayLikeObservable(arrayLike, scheduler) {
	        _super.call(this);
	        this.arrayLike = arrayLike;
	        this.scheduler = scheduler;
	        if (!scheduler && arrayLike.length === 1) {
	            this._isScalar = true;
	            this.value = arrayLike[0];
	        }
	    }
	    ArrayLikeObservable.create = function (arrayLike, scheduler) {
	        var length = arrayLike.length;
	        if (length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        else if (length === 1) {
	            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
	        }
	        else {
	            return new ArrayLikeObservable(arrayLike, scheduler);
	        }
	    };
	    ArrayLikeObservable.dispatch = function (state) {
	        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
	        if (subscriber.closed) {
	            return;
	        }
	        if (index >= length) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(arrayLike[index]);
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
	        var length = arrayLike.length;
	        if (scheduler) {
	            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < length && !subscriber.closed; i++) {
	                subscriber.next(arrayLike[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayLikeObservable;
	}(Observable_1.Observable));
	exports.ArrayLikeObservable = ArrayLikeObservable;
	//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(53);
	var Observable_1 = __webpack_require__(4);
	var Subscriber_1 = __webpack_require__(18);
	var Subscription_1 = __webpack_require__(44);
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this._refCount = 0;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            connection.add(this.source
	                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            }
	            else {
	                this._connection = connection;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return this.lift(new RefCountOperator(this));
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	exports.ConnectableObservable = ConnectableObservable;
	exports.connectableObservableDescriptor = {
	    operator: { value: null },
	    _refCount: { value: 0, writable: true },
	    _subscribe: { value: ConnectableObservable.prototype._subscribe },
	    getSubject: { value: ConnectableObservable.prototype.getSubject },
	    connect: { value: ConnectableObservable.prototype.connect },
	    refCount: { value: ConnectableObservable.prototype.refCount }
	};
	var ConnectableSubscriber = (function (_super) {
	    __extends(ConnectableSubscriber, _super);
	    function ConnectableSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    ConnectableSubscriber.prototype._error = function (err) {
	        this._unsubscribe();
	        _super.prototype._error.call(this, err);
	    };
	    ConnectableSubscriber.prototype._complete = function () {
	        this._unsubscribe();
	        _super.prototype._complete.call(this);
	    };
	    ConnectableSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (connectable) {
	            this.connectable = null;
	            var connection = connectable._connection;
	            connectable._refCount = 0;
	            connectable._subject = null;
	            connectable._connection = null;
	            if (connection) {
	                connection.unsubscribe();
	            }
	        }
	    };
	    return ConnectableSubscriber;
	}(Subject_1.SubjectSubscriber));
	var RefCountOperator = (function () {
	    function RefCountOperator(connectable) {
	        this.connectable = connectable;
	    }
	    RefCountOperator.prototype.call = function (subscriber, source) {
	        var connectable = this.connectable;
	        connectable._refCount++;
	        var refCounter = new RefCountSubscriber(subscriber, connectable);
	        var subscription = source._subscribe(refCounter);
	        if (!refCounter.closed) {
	            refCounter.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountOperator;
	}());
	var RefCountSubscriber = (function (_super) {
	    __extends(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (!connectable) {
	            this.connection = null;
	            return;
	        }
	        this.connectable = null;
	        var refCount = connectable._refCount;
	        if (refCount <= 0) {
	            this.connection = null;
	            return;
	        }
	        connectable._refCount = refCount - 1;
	        if (refCount > 1) {
	            this.connection = null;
	            return;
	        }
	        ///
	        // Compare the local RefCountSubscriber's connection Subscription to the
	        // connection Subscription on the shared ConnectableObservable. In cases
	        // where the ConnectableObservable source synchronously emits values, and
	        // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
	        // execution continues to here before the RefCountOperator has a chance to
	        // supply the RefCountSubscriber with the shared connection Subscription.
	        // For example:
	        // ```
	        // Observable.range(0, 10)
	        //   .publish()
	        //   .refCount()
	        //   .take(5)
	        //   .subscribe();
	        // ```
	        // In order to account for this case, RefCountSubscriber should only dispose
	        // the ConnectableObservable's shared connection Subscription if the
	        // connection Subscription exists, *and* either:
	        //   a. RefCountSubscriber doesn't have a reference to the shared connection
	        //      Subscription yet, or,
	        //   b. RefCountSubscriber's connection Subscription reference is identical
	        //      to the shared connection Subscription
	        ///
	        var connection = this.connection;
	        var sharedConnection = connectable._connection;
	        this.connection = null;
	        if (sharedConnection && (!connection || sharedConnection === connection)) {
	            sharedConnection.unsubscribe();
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(4);
	var EmptyObservable_1 = __webpack_require__(87);
	var isArray_1 = __webpack_require__(64);
	var subscribeToResult_1 = __webpack_require__(138);
	var OuterSubscriber_1 = __webpack_require__(131);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ForkJoinObservable = (function (_super) {
	    __extends(ForkJoinObservable, _super);
	    function ForkJoinObservable(sources, resultSelector) {
	        _super.call(this);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * @param sources
	     * @return {any}
	     * @static true
	     * @name forkJoin
	     * @owner Observable
	     */
	    ForkJoinObservable.create = function () {
	        var sources = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            sources[_i - 0] = arguments[_i];
	        }
	        if (sources === null || arguments.length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        var resultSelector = null;
	        if (typeof sources[sources.length - 1] === 'function') {
	            resultSelector = sources.pop();
	        }
	        // if the first and only other argument besides the resultSelector is an array
	        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
	        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
	            sources = sources[0];
	        }
	        if (sources.length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        return new ForkJoinObservable(sources, resultSelector);
	    };
	    ForkJoinObservable.prototype._subscribe = function (subscriber) {
	        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
	    };
	    return ForkJoinObservable;
	}(Observable_1.Observable));
	exports.ForkJoinObservable = ForkJoinObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ForkJoinSubscriber = (function (_super) {
	    __extends(ForkJoinSubscriber, _super);
	    function ForkJoinSubscriber(destination, sources, resultSelector) {
	        _super.call(this, destination);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	        this.completed = 0;
	        this.haveValues = 0;
	        var len = sources.length;
	        this.total = len;
	        this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            var source = sources[i];
	            var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
	            if (innerSubscription) {
	                innerSubscription.outerIndex = i;
	                this.add(innerSubscription);
	            }
	        }
	    }
	    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values[outerIndex] = innerValue;
	        if (!innerSub._hasValue) {
	            innerSub._hasValue = true;
	            this.haveValues++;
	        }
	    };
	    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
	        var destination = this.destination;
	        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
	        var len = values.length;
	        if (!innerSub._hasValue) {
	            destination.complete();
	            return;
	        }
	        this.completed++;
	        if (this.completed !== len) {
	            return;
	        }
	        if (haveValues === len) {
	            var value = resultSelector ? resultSelector.apply(this, values) : values;
	            destination.next(value);
	        }
	        destination.complete();
	    };
	    return ForkJoinSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(64);
	var isPromise_1 = __webpack_require__(137);
	var PromiseObservable_1 = __webpack_require__(133);
	var IteratorObservable_1 = __webpack_require__(325);
	var ArrayObservable_1 = __webpack_require__(132);
	var ArrayLikeObservable_1 = __webpack_require__(321);
	var iterator_1 = __webpack_require__(88);
	var Observable_1 = __webpack_require__(4);
	var observeOn_1 = __webpack_require__(338);
	var observable_1 = __webpack_require__(89);
	var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromObservable = (function (_super) {
	    __extends(FromObservable, _super);
	    function FromObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable from an Array, an array-like object, a Promise, an
	     * iterable object, or an Observable-like object.
	     *
	     * <span class="informal">Converts almost anything to an Observable.</span>
	     *
	     * <img src="./img/from.png" width="100%">
	     *
	     * Convert various other objects and data types into Observables. `from`
	     * converts a Promise or an array-like or an
	     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
	     * object into an Observable that emits the items in that promise or array or
	     * iterable. A String, in this context, is treated as an array of characters.
	     * Observable-like objects (contains a function named with the ES2015 Symbol
	     * for Observable) can also be converted through this operator.
	     *
	     * @example <caption>Converts an array to an Observable</caption>
	     * var array = [10, 20, 30];
	     * var result = Rx.Observable.from(array);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
	     * function* generateDoubles(seed) {
	     *   var i = seed;
	     *   while (true) {
	     *     yield i;
	     *     i = 2 * i; // double it
	     *   }
	     * }
	     *
	     * var iterator = generateDoubles(3);
	     * var result = Rx.Observable.from(iterator).take(10);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link fromEvent}
	     * @see {@link fromEventPattern}
	     * @see {@link fromPromise}
	     *
	     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
	     * Observable-like, an Array, an iterable or an array-like object to be
	     * converted.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * emissions of values.
	     * @return {Observable<T>} The Observable whose values are originally from the
	     * input object that was converted.
	     * @static true
	     * @name from
	     * @owner Observable
	     */
	    FromObservable.create = function (ish, scheduler) {
	        if (ish != null) {
	            if (typeof ish[observable_1.$$observable] === 'function') {
	                if (ish instanceof Observable_1.Observable && !scheduler) {
	                    return ish;
	                }
	                return new FromObservable(ish, scheduler);
	            }
	            else if (isArray_1.isArray(ish)) {
	                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
	            }
	            else if (isPromise_1.isPromise(ish)) {
	                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
	            }
	            else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
	                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
	            }
	            else if (isArrayLike(ish)) {
	                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[observable_1.$$observable]().subscribe(subscriber);
	        }
	        else {
	            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1.Observable));
	exports.FromObservable = FromObservable;
	//# sourceMappingURL=FromObservable.js.map

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(28);
	var Observable_1 = __webpack_require__(4);
	var iterator_1 = __webpack_require__(88);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IteratorObservable = (function (_super) {
	    __extends(IteratorObservable, _super);
	    function IteratorObservable(iterator, scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        this.iterator = getIterator(iterator);
	    }
	    IteratorObservable.create = function (iterator, scheduler) {
	        return new IteratorObservable(iterator, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
	        if (hasError) {
	            subscriber.error(state.error);
	            return;
	        }
	        var result = iterator.next();
	        if (result.done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(result.value);
	        state.index = index + 1;
	        if (subscriber.closed) {
	            return;
	        }
	        this.schedule(state);
	    };
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, iterator: iterator, subscriber: subscriber
	            });
	        }
	        else {
	            do {
	                var result = iterator.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                }
	                else {
	                    subscriber.next(result.value);
	                }
	                if (subscriber.closed) {
	                    break;
	                }
	            } while (true);
	        }
	    };
	    return IteratorObservable;
	}(Observable_1.Observable));
	exports.IteratorObservable = IteratorObservable;
	var StringIterator = (function () {
	    function StringIterator(str, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = str.length; }
	        this.str = str;
	        this.idx = idx;
	        this.len = len;
	    }
	    StringIterator.prototype[iterator_1.$$iterator] = function () { return (this); };
	    StringIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.str.charAt(this.idx++)
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return StringIterator;
	}());
	var ArrayIterator = (function () {
	    function ArrayIterator(arr, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = toLength(arr); }
	        this.arr = arr;
	        this.idx = idx;
	        this.len = len;
	    }
	    ArrayIterator.prototype[iterator_1.$$iterator] = function () { return this; };
	    ArrayIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.arr[this.idx++]
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return ArrayIterator;
	}());
	function getIterator(obj) {
	    var i = obj[iterator_1.$$iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('object is not iterable');
	    }
	    return obj[iterator_1.$$iterator]();
	}
	var maxSafeInteger = Math.pow(2, 53) - 1;
	function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) {
	        return 0;
	    }
	    if (len === 0 || !numberIsFinite(len)) {
	        return len;
	    }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) {
	        return 0;
	    }
	    if (len > maxSafeInteger) {
	        return maxSafeInteger;
	    }
	    return len;
	}
	function numberIsFinite(value) {
	    return typeof value === 'number' && root_1.root.isFinite(value);
	}
	function sign(value) {
	    var valueAsNumber = +value;
	    if (valueAsNumber === 0) {
	        return valueAsNumber;
	    }
	    if (isNaN(valueAsNumber)) {
	        return valueAsNumber;
	    }
	    return valueAsNumber < 0 ? -1 : 1;
	}
	//# sourceMappingURL=IteratorObservable.js.map

/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ForkJoinObservable_1 = __webpack_require__(323);
	exports.forkJoin = ForkJoinObservable_1.ForkJoinObservable.create;
	//# sourceMappingURL=forkJoin.js.map

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FromObservable_1 = __webpack_require__(324);
	exports.from = FromObservable_1.FromObservable.create;
	//# sourceMappingURL=from.js.map

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PromiseObservable_1 = __webpack_require__(133);
	exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
	//# sourceMappingURL=fromPromise.js.map

/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ArrayObservable_1 = __webpack_require__(132);
	exports.of = ArrayObservable_1.ArrayObservable.of;
	//# sourceMappingURL=of.js.map

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(131);
	var subscribeToResult_1 = __webpack_require__(138);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @owner Observable
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return (operator.caught = caught);
	}
	exports._catch = _catch;
	var CatchOperator = (function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = (function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            }
	            catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.unsubscribe();
	            this.destination.remove(this);
	            subscribeToResult_1.subscribeToResult(this, result);
	        }
	    };
	    return CatchSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=catch.js.map

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1 = __webpack_require__(344);
	var isDate_1 = __webpack_require__(348);
	var Subscriber_1 = __webpack_require__(18);
	var Notification_1 = __webpack_require__(129);
	/**
	 * Delays the emission of items from the source Observable by a given timeout or
	 * until a given Date.
	 *
	 * <span class="informal">Time shifts each item by some specified amount of
	 * milliseconds.</span>
	 *
	 * <img src="./img/delay.png" width="100%">
	 *
	 * If the delay argument is a Number, this operator time shifts the source
	 * Observable by that amount of time expressed in milliseconds. The relative
	 * time intervals between the values are preserved.
	 *
	 * If the delay argument is a Date, this operator time shifts the start of the
	 * Observable execution until the given date occurs.
	 *
	 * @example <caption>Delay each click by one second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
	 * delayedClicks.subscribe(x => console.log(x));
	 *
	 * @example <caption>Delay all clicks until a future date happens</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var date = new Date('March 15, 2050 12:00:00'); // in the future
	 * var delayedClicks = clicks.delay(date); // click emitted only after that date
	 * delayedClicks.subscribe(x => console.log(x));
	 *
	 * @see {@link debounceTime}
	 * @see {@link delayWhen}
	 *
	 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
	 * a `Date` until which the emission of the source items is delayed.
	 * @param {Scheduler} [scheduler=async] The Scheduler to use for
	 * managing the timers that handle the time-shift for each item.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by the specified timeout or Date.
	 * @method delay
	 * @owner Observable
	 */
	function delay(delay, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.async; }
	    var absoluteDelay = isDate_1.isDate(delay);
	    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
	    return this.lift(new DelayOperator(delayFor, scheduler));
	}
	exports.delay = delay;
	var DelayOperator = (function () {
	    function DelayOperator(delay, scheduler) {
	        this.delay = delay;
	        this.scheduler = scheduler;
	    }
	    DelayOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
	    };
	    return DelayOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DelaySubscriber = (function (_super) {
	    __extends(DelaySubscriber, _super);
	    function DelaySubscriber(destination, delay, scheduler) {
	        _super.call(this, destination);
	        this.delay = delay;
	        this.scheduler = scheduler;
	        this.queue = [];
	        this.active = false;
	        this.errored = false;
	    }
	    DelaySubscriber.dispatch = function (state) {
	        var source = state.source;
	        var queue = source.queue;
	        var scheduler = state.scheduler;
	        var destination = state.destination;
	        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
	            queue.shift().notification.observe(destination);
	        }
	        if (queue.length > 0) {
	            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
	            this.schedule(state, delay_1);
	        }
	        else {
	            source.active = false;
	        }
	    };
	    DelaySubscriber.prototype._schedule = function (scheduler) {
	        this.active = true;
	        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
	            source: this, destination: this.destination, scheduler: scheduler
	        }));
	    };
	    DelaySubscriber.prototype.scheduleNotification = function (notification) {
	        if (this.errored === true) {
	            return;
	        }
	        var scheduler = this.scheduler;
	        var message = new DelayMessage(scheduler.now() + this.delay, notification);
	        this.queue.push(message);
	        if (this.active === false) {
	            this._schedule(scheduler);
	        }
	    };
	    DelaySubscriber.prototype._next = function (value) {
	        this.scheduleNotification(Notification_1.Notification.createNext(value));
	    };
	    DelaySubscriber.prototype._error = function (err) {
	        this.errored = true;
	        this.queue = [];
	        this.destination.error(err);
	    };
	    DelaySubscriber.prototype._complete = function () {
	        this.scheduleNotification(Notification_1.Notification.createComplete());
	    };
	    return DelaySubscriber;
	}(Subscriber_1.Subscriber));
	var DelayMessage = (function () {
	    function DelayMessage(time, notification) {
	        this.time = time;
	        this.notification = notification;
	    }
	    return DelayMessage;
	}());
	//# sourceMappingURL=delay.js.map

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	/* tslint:disable:max-line-length */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	/* tslint:disable:max-line-length */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ },

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	var Subscription_1 = __webpack_require__(44);
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} callback function to be called when source terminates.
	 * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 * @method finally
	 * @owner Observable
	 */
	function _finally(callback) {
	    return this.lift(new FinallyOperator(callback));
	}
	exports._finally = _finally;
	var FinallyOperator = (function () {
	    function FinallyOperator(callback) {
	        this.callback = callback;
	    }
	    FinallyOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FinallySubscriber(subscriber, this.callback));
	    };
	    return FinallyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FinallySubscriber = (function (_super) {
	    __extends(FinallySubscriber, _super);
	    function FinallySubscriber(destination, callback) {
	        _super.call(this, destination);
	        this.add(new Subscription_1.Subscription(callback));
	    }
	    return FinallySubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=finally.js.map

/***/ },

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	var EmptyError_1 = __webpack_require__(345);
	/* tslint:disable:max-line-length */
	function first(predicate, resultSelector, defaultValue) {
	    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
	}
	exports.first = first;
	var FirstOperator = (function () {
	    function FirstOperator(predicate, resultSelector, defaultValue, source) {
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }
	    FirstOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
	    };
	    return FirstOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FirstSubscriber = (function (_super) {
	    __extends(FirstSubscriber, _super);
	    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	        this.index = 0;
	        this.hasCompleted = false;
	    }
	    FirstSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this._tryPredicate(value, index);
	        }
	        else {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._tryPredicate = function (value, index) {
	        var result;
	        try {
	            result = this.predicate(value, index, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._emit = function (value, index) {
	        if (this.resultSelector) {
	            this._tryResultSelector(value, index);
	            return;
	        }
	        this._emitFinal(value);
	    };
	    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
	        var result;
	        try {
	            result = this.resultSelector(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this._emitFinal(result);
	    };
	    FirstSubscriber.prototype._emitFinal = function (value) {
	        var destination = this.destination;
	        destination.next(value);
	        destination.complete();
	        this.hasCompleted = true;
	    };
	    FirstSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
	            destination.next(this.defaultValue);
	            destination.complete();
	        }
	        else if (!this.hasCompleted) {
	            destination.error(new EmptyError_1.EmptyError);
	        }
	    };
	    return FirstSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=first.js.map

/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	exports.MapOperator = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ConnectableObservable_1 = __webpack_require__(322);
	/* tslint:disable:max-line-length */
	function multicast(subjectOrSubjectFactory, selector) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    }
	    else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    if (typeof selector === 'function') {
	        return this.lift(new MulticastOperator(subjectFactory, selector));
	    }
	    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
	    connectable.source = this;
	    connectable.subjectFactory = subjectFactory;
	    return connectable;
	}
	exports.multicast = multicast;
	var MulticastOperator = (function () {
	    function MulticastOperator(subjectFactory, selector) {
	        this.subjectFactory = subjectFactory;
	        this.selector = selector;
	    }
	    MulticastOperator.prototype.call = function (subscriber, self) {
	        var selector = this.selector;
	        var connectable = new ConnectableObservable_1.ConnectableObservable(self.source, this.subjectFactory);
	        var subscription = selector(connectable).subscribe(subscriber);
	        subscription.add(connectable.connect());
	        return subscription;
	    };
	    return MulticastOperator;
	}());
	exports.MulticastOperator = MulticastOperator;
	//# sourceMappingURL=multicast.js.map

/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(18);
	var Notification_1 = __webpack_require__(129);
	/**
	 * @see {@link Notification}
	 *
	 * @param scheduler
	 * @param delay
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	var ObserveOnOperator = (function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}());
	exports.ObserveOnOperator = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ObserveOnSubscriber = (function (_super) {
	    __extends(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification, destination = arg.destination;
	        notification.observe(destination);
	    };
	    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	    };
	    ObserveOnSubscriber.prototype._next = function (value) {
	        this.scheduleMessage(Notification_1.Notification.createNext(value));
	    };
	    ObserveOnSubscriber.prototype._error = function (err) {
	        this.scheduleMessage(Notification_1.Notification.createError(err));
	    };
	    ObserveOnSubscriber.prototype._complete = function () {
	        this.scheduleMessage(Notification_1.Notification.createComplete());
	    };
	    return ObserveOnSubscriber;
	}(Subscriber_1.Subscriber));
	exports.ObserveOnSubscriber = ObserveOnSubscriber;
	var ObserveOnMessage = (function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}());
	exports.ObserveOnMessage = ObserveOnMessage;
	//# sourceMappingURL=observeOn.js.map

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var multicast_1 = __webpack_require__(337);
	var Subject_1 = __webpack_require__(53);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(28);
	/* tslint:disable:max-line-length */
	function toPromise(PromiseCtor) {
	    var _this = this;
	    if (!PromiseCtor) {
	        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	            PromiseCtor = root_1.root.Rx.config.Promise;
	        }
	        else if (root_1.root.Promise) {
	            PromiseCtor = root_1.root.Promise;
	        }
	    }
	    if (!PromiseCtor) {
	        throw new Error('no Promise impl found');
	    }
	    return new PromiseCtor(function (resolve, reject) {
	        var value;
	        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
	    });
	}
	exports.toPromise = toPromise;
	//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(44);
	/**
	 * A unit of work to be executed in a {@link Scheduler}. An action is typically
	 * created from within a Scheduler and an RxJS user does not need to concern
	 * themselves about creating and manipulating an Action.
	 *
	 * ```ts
	 * class Action<T> extends Subscription {
	 *   new (scheduler: Scheduler, work: (state?: T) => void);
	 *   schedule(state?: T, delay: number = 0): Subscription;
	 * }
	 * ```
	 *
	 * @class Action<T>
	 */
	var Action = (function (_super) {
	    __extends(Action, _super);
	    function Action(scheduler, work) {
	        _super.call(this);
	    }
	    /**
	     * Schedules this action on its parent Scheduler for execution. May be passed
	     * some context object, `state`. May happen at some point in the future,
	     * according to the `delay` parameter, if specified.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler.
	     * @return {void}
	     */
	    Action.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        return this;
	    };
	    return Action;
	}(Subscription_1.Subscription));
	exports.Action = Action;
	//# sourceMappingURL=Action.js.map

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(28);
	var Action_1 = __webpack_require__(341);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AsyncAction = (function (_super) {
	    __extends(AsyncAction, _super);
	    function AsyncAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.pending = false;
	    }
	    AsyncAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (this.closed) {
	            return this;
	        }
	        // Always replace the current state with the new state.
	        this.state = state;
	        // Set the pending flag indicating that this action has been scheduled, or
	        // has recursively rescheduled itself.
	        this.pending = true;
	        var id = this.id;
	        var scheduler = this.scheduler;
	        //
	        // Important implementation note:
	        //
	        // Actions only execute once by default, unless rescheduled from within the
	        // scheduled callback. This allows us to implement single and repeat
	        // actions via the same code path, without adding API surface area, as well
	        // as mimic traditional recursion but across asynchronous boundaries.
	        //
	        // However, JS runtimes and timers distinguish between intervals achieved by
	        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
	        // serial `setTimeout` calls can be individually delayed, which delays
	        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
	        // guarantee the interval callback will be invoked more precisely to the
	        // interval period, regardless of load.
	        //
	        // Therefore, we use `setInterval` to schedule single and repeat actions.
	        // If the action reschedules itself with the same delay, the interval is not
	        // canceled. If the action doesn't reschedule, or reschedules with a
	        // different delay, the interval will be canceled after scheduled callback
	        // execution.
	        //
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, delay);
	        }
	        this.delay = delay;
	        // If this action has already an async Id, don't request a new one.
	        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
	        return this;
	    };
	    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
	    };
	    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If this action is rescheduled with the same delay time, don't clear the interval id.
	        if (delay !== null && this.delay === delay) {
	            return id;
	        }
	        // Otherwise, if the action's delay time is different from the current delay,
	        // clear the interval id
	        return root_1.root.clearInterval(id) && undefined || undefined;
	    };
	    /**
	     * Immediately executes this action and the `work` it contains.
	     * @return {any}
	     */
	    AsyncAction.prototype.execute = function (state, delay) {
	        if (this.closed) {
	            return new Error('executing a cancelled action');
	        }
	        this.pending = false;
	        var error = this._execute(state, delay);
	        if (error) {
	            return error;
	        }
	        else if (this.pending === false && this.id != null) {
	            // Dequeue if the action didn't reschedule itself. Don't call
	            // unsubscribe(), because the action could reschedule later.
	            // For example:
	            // ```
	            // scheduler.schedule(function doWork(counter) {
	            //   /* ... I'm a busy worker bee ... */
	            //   var originalAction = this;
	            //   /* wait 100ms before rescheduling the action */
	            //   setTimeout(function () {
	            //     originalAction.schedule(counter + 1);
	            //   }, 100);
	            // }, 1000);
	            // ```
	            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	        }
	    };
	    AsyncAction.prototype._execute = function (state, delay) {
	        var errored = false;
	        var errorValue = undefined;
	        try {
	            this.work(state);
	        }
	        catch (e) {
	            errored = true;
	            errorValue = !!e && e || new Error(e);
	        }
	        if (errored) {
	            this.unsubscribe();
	            return errorValue;
	        }
	    };
	    AsyncAction.prototype._unsubscribe = function () {
	        var id = this.id;
	        var scheduler = this.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        this.work = null;
	        this.delay = null;
	        this.state = null;
	        this.pending = false;
	        this.scheduler = null;
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, null);
	        }
	    };
	    return AsyncAction;
	}(Action_1.Action));
	exports.AsyncAction = AsyncAction;
	//# sourceMappingURL=AsyncAction.js.map

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Scheduler_1 = __webpack_require__(308);
	var AsyncScheduler = (function (_super) {
	    __extends(AsyncScheduler, _super);
	    function AsyncScheduler() {
	        _super.apply(this, arguments);
	        this.actions = [];
	        /**
	         * A flag to indicate whether the Scheduler is currently executing a batch of
	         * queued actions.
	         * @type {boolean}
	         */
	        this.active = false;
	        /**
	         * An internal ID used to track the latest asynchronous task such as those
	         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
	         * others.
	         * @type {any}
	         */
	        this.scheduled = undefined;
	    }
	    AsyncScheduler.prototype.flush = function (action) {
	        var actions = this.actions;
	        if (this.active) {
	            actions.push(action);
	            return;
	        }
	        var error;
	        this.active = true;
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (action = actions.shift()); // exhaust the scheduler queue
	        this.active = false;
	        if (error) {
	            while (action = actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsyncScheduler;
	}(Scheduler_1.Scheduler));
	exports.AsyncScheduler = AsyncScheduler;
	//# sourceMappingURL=AsyncScheduler.js.map

/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AsyncAction_1 = __webpack_require__(342);
	var AsyncScheduler_1 = __webpack_require__(343);
	exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
	//# sourceMappingURL=async.js.map

/***/ },

/***/ 345:
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an Observable or a sequence was queried but has no
	 * elements.
	 *
	 * @see {@link first}
	 * @see {@link last}
	 * @see {@link single}
	 *
	 * @class EmptyError
	 */
	var EmptyError = (function (_super) {
	    __extends(EmptyError, _super);
	    function EmptyError() {
	        var err = _super.call(this, 'no elements in sequence');
	        this.name = err.name = 'EmptyError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return EmptyError;
	}(Error));
	exports.EmptyError = EmptyError;
	//# sourceMappingURL=EmptyError.js.map

/***/ },

/***/ 348:
/***/ function(module, exports) {

	"use strict";
	function isDate(value) {
	    return value instanceof Date && !isNaN(+value);
	}
	exports.isDate = isDate;
	//# sourceMappingURL=isDate.js.map

/***/ },

/***/ 350:
/***/ function(module, exports) {

	"use strict";
	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ }

});
//# sourceMappingURL=main.map