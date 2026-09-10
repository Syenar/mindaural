/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\r\n?/g,hk=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();

"use strict";
(() => {
  // src/core/types.ts
  var APP_VERSION = "1.0.0";
  var ENGINE_VERSION = "1.0.0-webgpu";
  var uid = (prefix = "id") => `${prefix}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;

  // src/core/project.ts
  function createVoice(name = "Binaural voice", type = "binaural", carrier = 400, beat = 10, waveform = "sine") {
    return { id: uid("voice"), name, type, leftHz: carrier - beat / 2, rightHz: carrier + beat / 2, amplitude: 0.18, leftLevel: 1, rightLevel: 1, phaseLeft: 0, phaseRight: 0, waveform, duty: 0.5, routingBus: "protected-stereo", fadeIn: 0.08, fadeOut: 0.12, start: 0, duration: 1200, loop: false, repetitions: 1, mute: false, solo: false, automation: [], links: [] };
  }
  function createDefaultProject(title = "Untitled session") {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const v = createVoice();
    return { schemaVersion: "1.0.0", id: uid("project"), title, description: "A custom binaural session.", duration: 1200, sampleRate: 48e3, masterGain: 0.8, voices: [v], noiseTracks: [], audioTracks: [], assets: [], segments: [{ id: uid("segment"), name: "Main", start: 0, duration: 1200, repeat: 1, crossfade: 0.05 }], markers: [], evidence: { state: "Experimental", claim: "Custom stimulus; no outcome is guaranteed." }, provenance: { author: "Local user", createdAt: now, updatedAt: now, appVersion: APP_VERSION, engineVersion: ENGINE_VERSION }, tags: [], revision: 1 };
  }
  function setCenterBeat(v, carrier, beat) {
    return { ...v, leftHz: carrier - beat / 2, rightHz: carrier + beat / 2 };
  }
  function carrierOf(v) {
    return (v.leftHz + v.rightHz) / 2;
  }
  function beatOf(v) {
    return Math.abs(v.rightHz - v.leftHz);
  }
  function touchProject(p) {
    return { ...p, revision: p.revision + 1, provenance: { ...p.provenance, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } };
  }

  // src/data/soundscapes.ts
  var mk = (id2, title, description, layers) => ({ id: id2, title, description, layers, license: "project-owned", provenance: "Procedurally synthesized by Mindaural; no third-party recording." });
  var SOUNDSCAPES = [
    mk("soft-rain", "Soft rain", "Diffuse rain-like pink/brown texture", [{ kind: "pink", amplitude: 0.12, slopeDbOct: -3, lowpass: 9e3, stereoCorrelation: 0.35 }, { kind: "brown", amplitude: 0.05, slopeDbOct: -6, lowpass: 3500, stereoCorrelation: 0.1 }]),
    mk("heavy-rain", "Heavy rain", "Dense broadband rain texture", [{ kind: "pink", amplitude: 0.18, slopeDbOct: -3, lowpass: 12e3, stereoCorrelation: 0.2 }, { kind: "white", amplitude: 0.04, slopeDbOct: 0, highpass: 4500, stereoCorrelation: 0.05 }]),
    mk("distant-storm", "Distant storm", "Low rolling ambience with air", [{ kind: "brown", amplitude: 0.16, slopeDbOct: -6, lowpass: 1e3, stereoCorrelation: 0.75 }, { kind: "pink", amplitude: 0.05, slopeDbOct: -3, lowpass: 5e3, stereoCorrelation: 0.4 }]),
    mk("ocean-calm", "Calm ocean", "Slow, soft surf-like spectrum", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 1800, stereoCorrelation: 0.55 }, { kind: "pink", amplitude: 0.05, slopeDbOct: -3, lowpass: 7e3, stereoCorrelation: 0.25 }]),
    mk("ocean-wide", "Wide ocean", "Brighter wide surf texture", [{ kind: "pink", amplitude: 0.15, slopeDbOct: -3, lowpass: 1e4, stereoCorrelation: 0.1 }, { kind: "brown", amplitude: 0.07, slopeDbOct: -6, lowpass: 2200, stereoCorrelation: 0.5 }]),
    mk("river", "River", "Continuous mid-band water-like noise", [{ kind: "pink", amplitude: 0.13, slopeDbOct: -3, highpass: 250, lowpass: 7e3, stereoCorrelation: 0.22 }]),
    mk("forest", "Forest air", "Soft filtered air with spacious variation", [{ kind: "pink", amplitude: 0.08, slopeDbOct: -3, lowpass: 6e3, stereoCorrelation: 0.3 }, { kind: "brown", amplitude: 0.05, slopeDbOct: -6, lowpass: 1400, stereoCorrelation: 0.65 }]),
    mk("wind-soft", "Soft wind", "Low-pass airy wind texture", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, lowpass: 4200, stereoCorrelation: 0.42 }]),
    mk("wind-deep", "Deep wind", "Low spectral wind bed", [{ kind: "brown", amplitude: 0.14, slopeDbOct: -6, lowpass: 1800, stereoCorrelation: 0.48 }]),
    mk("fireplace", "Fireplace", "Warm low-mid crackle-like bed", [{ kind: "brown", amplitude: 0.09, slopeDbOct: -6, lowpass: 2500, stereoCorrelation: 0.55 }, { kind: "white", amplitude: 0.025, slopeDbOct: 0, highpass: 1800, lowpass: 9e3, stereoCorrelation: 0.05 }]),
    mk("fan-low", "Low fan", "Stable deep fan masking texture", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 2600, stereoCorrelation: 0.9 }]),
    mk("fan-bright", "Bright fan", "Steady pink fan-like texture", [{ kind: "pink", amplitude: 0.11, slopeDbOct: -3, lowpass: 7e3, stereoCorrelation: 0.88 }]),
    mk("aircraft", "Aircraft cabin", "Low continuous cabin rumble", [{ kind: "brown", amplitude: 0.15, slopeDbOct: -6, lowpass: 1200, stereoCorrelation: 0.95 }, { kind: "pink", amplitude: 0.04, slopeDbOct: -3, lowpass: 4500, stereoCorrelation: 0.8 }]),
    mk("cafe", "Caf\xE9 room", "Diffuse room-like masking spectrum", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, highpass: 180, lowpass: 5500, stereoCorrelation: 0.38 }, { kind: "brown", amplitude: 0.04, slopeDbOct: -6, lowpass: 1e3, stereoCorrelation: 0.6 }]),
    mk("room", "Quiet room", "Barely audible neutral room noise", [{ kind: "pink", amplitude: 0.045, slopeDbOct: -3, lowpass: 6e3, stereoCorrelation: 0.75 }]),
    mk("brown-deep", "Deep brown", "Very low-frequency masking", [{ kind: "brown", amplitude: 0.13, slopeDbOct: -6, lowpass: 2200, stereoCorrelation: 0.1 }]),
    mk("pink-balanced", "Balanced pink", "Classic pink masking", [{ kind: "pink", amplitude: 0.1, slopeDbOct: -3, stereoCorrelation: 0.08 }]),
    mk("white-clean", "Clean white", "Flat broadband noise", [{ kind: "white", amplitude: 0.075, slopeDbOct: 0, stereoCorrelation: 0.05 }]),
    mk("grey-soft", "Soft grey", "Perceptually softened broad noise", [{ kind: "grey", amplitude: 0.08, slopeDbOct: -1, lowpass: 12e3, stereoCorrelation: 0.2 }]),
    mk("blue-air", "Blue air", "High-frequency tilted airy noise", [{ kind: "blue", amplitude: 0.055, slopeDbOct: 3, highpass: 800, stereoCorrelation: 0.12 }]),
    mk("violet-air", "Violet air", "Very bright high-frequency texture", [{ kind: "violet", amplitude: 0.035, slopeDbOct: 6, highpass: 1800, stereoCorrelation: 0.08 }]),
    mk("night", "Night room", "Very dark low-level ambience", [{ kind: "brown", amplitude: 0.06, slopeDbOct: -6, lowpass: 1300, stereoCorrelation: 0.65 }]),
    mk("focus-mask", "Focus mask", "Controlled pink masking bed", [{ kind: "pink", amplitude: 0.07, slopeDbOct: -3, highpass: 120, lowpass: 8e3, stereoCorrelation: 0.15 }]),
    mk("sleep-mask", "Sleep mask", "Low, smooth brown-pink blend", [{ kind: "brown", amplitude: 0.09, slopeDbOct: -6, lowpass: 2400, stereoCorrelation: 0.4 }, { kind: "pink", amplitude: 0.035, slopeDbOct: -3, lowpass: 5500, stereoCorrelation: 0.25 }])
  ];

  // src/data/presets.ts
  function make(id2, title, purpose, beat, carrier, duration, collection, state, description, tags, citation) {
    let p = createDefaultProject(title);
    p.duration = duration * 60;
    p.voices[0] = { ...setCenterBeat(p.voices[0], carrier, beat), duration: p.duration };
    p.segments[0].duration = p.duration;
    p.tags = tags;
    p.evidence = { state, claim: collection === "research" ? "Reproduces a published stimulus configuration; observed outcomes are protocol-specific." : `Designed for ${purpose.toLowerCase()}; no outcome is guaranteed.`, citation };
    p.provenance.source = collection === "research" ? citation : "Mindaural curated design";
    return { id: id2, title, collection, description, duration: p.duration, purpose, evidence: p.evidence, tags, project: p, rating: collection === "community" ? 4.2 : void 0, reviews: collection === "community" ? 12 : void 0 };
  }
  var curated = [
    ["c01", "Clear Start", "Focus", 16, 400, 20, "A steady beta-range design with soft onset.", ["focus", "steady"]],
    ["c02", "Quiet Ten", "Relaxation", 10, 400, 30, "A simple 10 Hz listening design.", ["relax", "alpha"]],
    ["c03", "Slow Descent", "Meditation", 8, 360, 25, "Ramps gently from 12 Hz to 8 Hz.", ["meditation", "ramp"]],
    ["c04", "Deep Drift", "Rest", 6, 300, 35, "Low difference-frequency listening design.", ["rest", "theta"]],
    ["c05", "Sleep Entry", "Sleep", 4, 280, 45, "Slow low-frequency design for bedtime listening intent.", ["sleep"]],
    ["c06", "Study Block", "Focus", 18, 420, 50, "Longer steady study-session design.", ["focus", "study"]],
    ["c07", "Soft Alpha", "Relaxation", 9, 340, 20, "Lower-carrier alpha-range design.", ["relax"]],
    ["c08", "Evening Wind", "Unwind", 7, 380, 30, "Gentle evening transition.", ["unwind"]],
    ["c09", "Pulse Lab", "Experiment", 12, 400, 15, "Isochronic comparison design.", ["isochronic", "experiment"]],
    ["c10", "Monaural Compare", "Experiment", 10, 400, 15, "Monaural comparison design.", ["monaural", "experiment"]],
    ["c11", "AM Compare", "Experiment", 10, 400, 15, "Amplitude-modulation comparison design.", ["am", "experiment"]],
    ["c12", "Fractional 7.83", "Experiment", 7.83, 400, 20, "Fractional-frequency engineering example; no special biological claim.", ["fractional", "experiment"]],
    ["c13", "Twenty", "Focus", 20, 400, 20, "20 Hz beta-range design.", ["beta", "focus"]],
    ["c14", "Gamma Edge", "Experiment", 40, 340, 12, "40 Hz experimental comparison setting.", ["gamma", "experiment"]],
    ["c15", "Carrier 250", "Experiment", 10, 250, 15, "Carrier-frequency comparison.", ["carrier", "experiment"]],
    ["c16", "Carrier 500", "Experiment", 10, 500, 15, "Carrier-frequency comparison.", ["carrier", "experiment"]],
    ["c17", "Short Reset", "Unwind", 10, 400, 5, "Five-minute simple listening design.", ["short"]],
    ["c18", "Hour Bed", "Rest", 5, 320, 60, "Long low-difference session.", ["long", "rest"]],
    ["c19", "Bright Mask", "Focus", 14, 410, 30, "Focus-intent design with brighter masking recipe.", ["mask", "focus"]],
    ["c20", "Deep Mask", "Rest", 6, 330, 40, "Rest-intent design with dark masking recipe.", ["mask", "rest"]]
  ];
  var PRESETS = [];
  for (const x of curated) {
    const pr = make(x[0], x[1], x[2], x[3], x[4], x[5], "curated", "Experimental", x[6], Array.from(x[7]));
    if (x[0] === "c09") pr.project.voices[0].type = "isochronic";
    if (x[0] === "c10") pr.project.voices[0].type = "monaural";
    if (x[0] === "c11") pr.project.voices[0].type = "am";
    if (x[0] === "c03") pr.project.voices[0].automation = [{ parameter: "beatHz", points: [{ id: "a", time: 0, value: 12, curve: "linear" }, { id: "b", time: pr.duration, value: 8, curve: "linear" }] }];
    PRESETS.push(pr);
  }
  var research = [
    ["r01", "Research: 10 Hz / 400 Hz", "Attention protocol example", 10, 400, 20, "Mixed Evidence", "Published-study style reproduction template; verify source-specific parameters before use.", "PMID 30073406"],
    ["r02", "Research: 20 Hz beta", "Memory protocol example", 20, 400, 15, "Promising Outcome Evidence", "Protocol-oriented beta comparison template.", "PMID 29222722"],
    ["r03", "Research: 5 Hz theta", "Memory comparison", 5, 400, 15, "Mixed Evidence", "Theta comparison template from memory literature.", "PMID 29222722"],
    ["r04", "Research: 40 Hz / 340 Hz", "Attention parameter study", 40, 340, 20, "Promising Outcome Evidence", "Parameter-specific gamma/carrier research template.", "2025 parametric study"],
    ["r05", "Research: theta review anchor", "Theta evidence review", 6, 400, 20, "Limited Evidence", "Template anchored to 2026 theta systematic review; not a treatment claim.", "PMID 42349368"],
    ["r06", "Research: 10 Hz entrainment", "Neural response", 10, 400, 10, "Neural Response Observed", "Auditory steady-state response comparison template.", "eNeuro 2020"],
    ["r07", "Research: monaural control", "Control comparison", 10, 400, 10, "Neural Response Observed", "Monaural control condition.", "eNeuro 2020"],
    ["r08", "Research: sham matched carrier", "Sham/control", 0, 400, 10, "Experimental", "Matched-carrier sham condition.", "Internal research control"],
    ["r09", "Research: 16 Hz", "Beta protocol", 16, 400, 20, "Mixed Evidence", "Protocol comparison setting.", "Evidence matrix"],
    ["r10", "Research: 30 Hz", "Upper conventional range", 30, 400, 20, "Limited Evidence", "Upper conventional/experimental boundary test.", "Evidence matrix"]
  ];
  for (const x of research) {
    const pr = make(x[0], x[1], x[2], x[3], x[4], x[5], "research", x[6], x[7], ["research", "protocol"], x[8]);
    if (x[0] === "r07") pr.project.voices[0].type = "monaural";
    if (x[0] === "r08") pr.project.voices[0].type = "sham";
    PRESETS.push(pr);
  }

  // src/audio/signalMath.ts
  var TAU = Math.PI * 2;
  var clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  function curveValue(a, b, t) {
    const span = Math.max(1e-12, b.time - a.time), x = clamp((t - a.time) / span, 0, 1);
    switch (a.curve) {
      case "hold":
        return a.value;
      case "smooth": {
        const s = x * x * (3 - 2 * x);
        return a.value + (b.value - a.value) * s;
      }
      case "exponential": {
        if (a.value === 0 || b.value === 0 || Math.sign(a.value) !== Math.sign(b.value)) return a.value + (b.value - a.value) * x;
        return a.value * Math.pow(b.value / a.value, x);
      }
      case "logarithmic": {
        const s = Math.log1p(9 * x) / Math.log(10);
        return a.value + (b.value - a.value) * s;
      }
      case "bezier": {
        const c1 = a.c1 ?? 0.33, c2 = a.c2 ?? 0.67;
        const u = 1 - x;
        const s = 3 * u * u * x * c1 + 3 * u * x * x * c2 + x * x * x;
        return a.value + (b.value - a.value) * s;
      }
      default:
        return a.value + (b.value - a.value) * x;
    }
  }
  function automationValue(lane, time, fallback) {
    if (!lane || lane.points.length === 0) return fallback;
    const pts = lane.points;
    if (time <= pts[0].time) return pts[0].value;
    if (time >= pts[pts.length - 1].time) return pts[pts.length - 1].value;
    for (let i = 0; i < pts.length - 1; i++) if (time >= pts[i].time && time <= pts[i + 1].time) return curveValue(pts[i], pts[i + 1], time);
    return fallback;
  }
  function trackParameterValue(lanes, parameter, time, fallback, mods) {
    let v = automationValue(lanes?.find((x) => x.parameter === parameter), time, fallback);
    for (const m of mods || []) if (m.target === parameter && Number.isFinite(m.rateHz) && Number.isFinite(m.depth)) v += (m.offset || 0) + Math.sin(TAU * m.rateHz * time + (m.phase || 0)) * m.depth;
    return v;
  }
  function waveformAt(v, time) {
    const pts = v.waveformAutomation;
    if (!pts?.length) return v.waveform;
    let out = v.waveform;
    for (const p of pts.slice().sort((a, b) => a.time - b.time)) {
      if (time + 1e-12 < p.time) break;
      out = p.waveform;
    }
    return out;
  }
  function createModulationRuntime() {
    return { values: /* @__PURE__ */ new Map() };
  }
  function baseVoiceParameter(v, key, time) {
    const lane = v.automation.find((x) => x.parameter === key);
    const carrier = (v.leftHz + v.rightHz) / 2, beat = Math.abs(v.rightHz - v.leftHz);
    const fallback = key === "leftHz" ? v.leftHz : key === "rightHz" ? v.rightHz : key === "beatHz" ? beat : key === "carrierHz" ? carrier : key === "amplitude" ? v.amplitude : key === "duty" ? v.duty : 0;
    return automationValue(lane, time, fallback);
  }
  function sourceValue(v, link, time) {
    const t = Math.max(0, time - Math.max(0, link.delayMs || 0) / 1e3);
    if (link.source === "time") return t;
    return baseVoiceParameter(v, link.source, t);
  }
  function mapLink(link, src) {
    let x = src;
    if (link.invert) {
      if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax)) x = link.sourceMin + link.sourceMax - x;
      else x = -x;
    }
    let y;
    if (Number.isFinite(link.sourceMin) && Number.isFinite(link.sourceMax) && Number.isFinite(link.targetMin) && Number.isFinite(link.targetMax) && link.sourceMax !== link.sourceMin) {
      const n = (x - link.sourceMin) / (link.sourceMax - link.sourceMin);
      y = link.targetMin + n * (link.targetMax - link.targetMin);
      y = y * link.scale + link.offset;
    } else y = x * link.scale + link.offset;
    if (Number.isFinite(link.min)) y = Math.max(link.min, y);
    if (Number.isFinite(link.max)) y = Math.min(link.max, y);
    if ((link.quantize || 0) > 0) y = Math.round(y / link.quantize) * link.quantize;
    return y;
  }
  function voiceParameter(v, key, time, runtime, dt = 0) {
    let result = baseVoiceParameter(v, key, time);
    for (const link of v.links) {
      if (link.target !== key) continue;
      let target = mapLink(link, sourceValue(v, link, time));
      const ms = Math.max(0, link.smoothingMs || 0);
      if (ms > 0 && runtime && dt > 0) {
        const prior = runtime.values.get(link.id);
        if (prior === void 0) runtime.values.set(link.id, target);
        else {
          const alpha = 1 - Math.exp(-dt / (ms / 1e3));
          target = prior + alpha * (target - prior);
          runtime.values.set(link.id, target);
        }
      }
      result = target;
    }
    return result;
  }
  function resolveVoiceFrame(v, time, runtime, dt = 0) {
    const hasDirectLeft = v.automation.some((x) => x.parameter === "leftHz") || v.links.some((x) => x.target === "leftHz");
    const hasDirectRight = v.automation.some((x) => x.parameter === "rightHz") || v.links.some((x) => x.target === "rightHz");
    const carrierHz = voiceParameter(v, "carrierHz", time, runtime, dt), beatHz = Math.abs(voiceParameter(v, "beatHz", time, runtime, dt));
    const derivedLeft = carrierHz - beatHz / 2, derivedRight = carrierHz + beatHz / 2;
    const leftHz = hasDirectLeft ? voiceParameter(v, "leftHz", time, runtime, dt) : derivedLeft;
    const rightHz = hasDirectRight ? voiceParameter(v, "rightHz", time, runtime, dt) : derivedRight;
    return { leftHz, rightHz, carrierHz: (leftHz + rightHz) / 2, beatHz: Math.abs(rightHz - leftHz), amplitude: voiceParameter(v, "amplitude", time, runtime, dt), duty: voiceParameter(v, "duty", time, runtime, dt), pan: clamp(voiceParameter(v, "pan", time, runtime, dt), -1, 1) };
  }
  function waveformSample(kind, phase, duty = 0.5) {
    const p = (phase / TAU % 1 + 1) % 1;
    switch (kind) {
      case "sine2": {
        const s = Math.sin(phase);
        return Math.sign(s) * s * s;
      }
      case "triangle":
        return 1 - 4 * Math.abs(p - 0.5);
      case "square":
        return p < 0.5 ? 1 : -1;
      case "smooth-square":
        return Math.tanh(3 * Math.sin(phase)) / Math.tanh(3);
      case "saw":
        return 2 * p - 1;
      case "reverse-saw":
        return 1 - 2 * p;
      case "pulse":
        return p < clamp(duty, 0.01, 0.99) ? 1 : -1;
      default:
        return Math.sin(phase);
    }
  }
  function envelope(v, localTime) {
    if (localTime < 0 || localTime > v.duration) return 0;
    let g = 1;
    if (v.fadeIn > 0 && localTime < v.fadeIn) g *= clamp(localTime / v.fadeIn, 0, 1);
    const remain = v.duration - localTime;
    if (v.fadeOut > 0 && remain < v.fadeOut) g *= clamp(remain / v.fadeOut, 0, 1);
    return g;
  }
  function phaseStep(freq, sampleRate) {
    return TAU * freq / sampleRate;
  }
  function deterministicNoise(id2, index) {
    let h = 2166136261;
    for (let i = 0; i < id2.length; i++) h = Math.imul(h ^ id2.charCodeAt(i), 16777619);
    let x = h ^ Math.imul(index | 0, 2654435761) | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967295 * 2 - 1;
  }
  function advancedWaveformSample(kind, phase, duty, freq, sampleRate, harmonics, cycle) {
    if (kind === "custom-harmonic") {
      const hs = harmonics?.length ? harmonics : [1, 0.5, 0.25];
      let sum = 0, norm = 0;
      for (let i = 0; i < hs.length; i++) {
        sum += hs[i] * Math.sin((i + 1) * phase);
        norm += Math.abs(hs[i]);
      }
      return norm ? sum / norm : 0;
    }
    if (kind === "imported-cycle") {
      if (!cycle?.length) return Math.sin(phase);
      const p = (phase / TAU % 1 + 1) % 1, pos = p * cycle.length, i = Math.floor(pos) % cycle.length, j = (i + 1) % cycle.length, f = pos - Math.floor(pos);
      return cycle[i] * (1 - f) + cycle[j] * f;
    }
    const maxH = Math.max(1, Math.min(127, Math.floor(sampleRate * 0.49 / Math.max(1e-9, Math.abs(freq)))));
    if (kind === "bandlimited-square") {
      let s = 0;
      for (let k = 1; k <= maxH; k += 2) s += Math.sin(k * phase) / k;
      return clamp(4 / Math.PI * s, -1.2, 1.2);
    }
    if (kind === "bandlimited-saw") {
      let s = 0;
      for (let k = 1; k <= maxH; k++) s += (k & 1 ? 1 : -1) * Math.sin(k * phase) / k;
      return clamp(2 / Math.PI * s, -1.2, 1.2);
    }
    return waveformSample(kind, phase, duty);
  }
  function segmentContext(project, trackId, time) {
    const segments = project.segments || [];
    if (!segments.length) return { time, gain: 1 };
    let applies = false;
    for (const s of segments) {
      if (Array.isArray(s.trackIds) && s.trackIds.length && !s.trackIds.includes(trackId)) continue;
      applies = true;
      const repeat = Math.max(1, Math.floor(s.repeat || 1)), dur = Math.max(1e-9, Number(s.duration) || 0), span = dur * repeat;
      if (time < s.start || time >= s.start + span) continue;
      const rel = time - s.start, it = Math.min(repeat - 1, Math.floor(rel / dur)), local = rel - it * dur, cf = Math.max(0, Math.min(Number(s.crossfade) || 0, dur * 0.49));
      let gain = 1;
      if (cf > 0 && repeat > 1) {
        if (it > 0 && local < cf) gain = Math.sin(local / cf * Math.PI / 2);
        if (it < repeat - 1 && dur - local < cf) gain = Math.min(gain, Math.cos((cf - (dur - local)) / cf * Math.PI / 2));
      }
      return { time: s.start + local, gain, segmentId: s.id, iteration: it, overrides: s.overrides || void 0 };
    }
    return applies ? null : { time, gain: 1 };
  }

  // src/audio/noise.ts
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h | 0;
  }
  function channel(seed) {
    return { seed: seed || 1, pink0: 0, pink1: 0, pink2: 0, brown: 0, prev1: 0, prev2: 0, lpHigh: 0, lpLow: 0 };
  }
  function createNoiseState(trackId, seed = 1369948382) {
    const h = hash(trackId);
    return { left: channel(seed ^ h ^ 521288629), right: channel(seed ^ h ^ 1597334677), shared: channel(seed ^ h ^ 324508639) };
  }
  function rng(s) {
    let x = s.seed | 0;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    s.seed = x | 0;
    return (x >>> 0) / 4294967295 * 2 - 1;
  }
  function baseKinds(s) {
    const w = rng(s);
    s.pink0 = 0.99765 * s.pink0 + w * 0.099046;
    s.pink1 = 0.963 * s.pink1 + w * 0.2965164;
    s.pink2 = 0.57 * s.pink2 + w * 1.0526913;
    const pink = (s.pink0 + s.pink1 + s.pink2 + w * 0.1848) * 0.18;
    s.brown = clamp((s.brown + 0.02 * w) / 1.02, -1, 1);
    const brown = s.brown * 3.5, blue = clamp((w - s.prev1) * 0.7, -1, 1), violet = clamp((w - 2 * s.prev1 + s.prev2) * 0.35, -1, 1);
    s.prev2 = s.prev1;
    s.prev1 = w;
    const grey = 0.7 * w + 0.3 * Math.sign(w) * Math.sqrt(Math.abs(w));
    return { white: w, pink, brown, blue, violet, grey };
  }
  function color(track, s, slopeOverride) {
    const k = baseKinds(s);
    if (track.kind === "slope") {
      const x = clamp(slopeOverride ?? track.slopeDbOct, -6, 6);
      if (x <= -3) {
        const t2 = (x + 6) / 3;
        return k.brown * (1 - t2) + k.pink * t2;
      }
      if (x <= 0) {
        const t2 = (x + 3) / 3;
        return k.pink * (1 - t2) + k.white * t2;
      }
      if (x <= 3) {
        const t2 = x / 3;
        return k.white * (1 - t2) + k.blue * t2;
      }
      const t = (x - 3) / 3;
      return k.blue * (1 - t) + k.violet * t;
    }
    return k[track.kind] ?? k.white;
  }
  function filter(track, s, x, sr, highpass = track.highpass || 0, lowpass = track.lowpass || 0) {
    let y = x;
    if (highpass > 0) {
      const a = 1 - Math.exp(-2 * Math.PI * Math.min(highpass, sr * 0.45) / sr);
      s.lpHigh += a * (y - s.lpHigh);
      y -= s.lpHigh;
    }
    if (lowpass > 0) {
      const a = 1 - Math.exp(-2 * Math.PI * Math.min(lowpass, sr * 0.45) / sr);
      s.lpLow += a * (y - s.lpLow);
      y = s.lpLow;
    }
    return y;
  }
  function nextNoiseStereo(track, state, sampleRate, out, time = 0) {
    const amp = trackParameterValue(track.automation, "amplitude", time, track.amplitude, track.modulation), slope = trackParameterValue(track.automation, "slopeDbOct", time, track.slopeDbOct, track.modulation), hp = trackParameterValue(track.automation, "highpass", time, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", time, track.lowpass || 0, track.modulation), corr = trackParameterValue(track.automation, "stereoCorrelation", time, track.stereoCorrelation, track.modulation);
    const a = color(track, state.left, slope), b = color(track, state.right, slope), shared = color(track, state.shared, slope), c = clamp(corr, 0, 1), s = Math.sqrt(c), i = Math.sqrt(1 - c);
    out[0] = filter(track, state.left, a * i + shared * s, sampleRate, hp, lp) * amp;
    out[1] = filter(track, state.right, b * i + shared * s, sampleRate, hp, lp) * amp;
  }

  // src/audio/audioTrackMath.ts
  function createAudioTrackRuntime() {
    return { lpL: 0, lpR: 0, hpL: 0, hpR: 0 };
  }
  function sampleChannel(src, time, channel2) {
    const arr = src[channel2];
    if (time < 0 || time >= src.duration || !arr.length) return 0;
    const pos = time * src.sampleRate, j = Math.floor(pos), f = pos - j, k = Math.min(j + 1, arr.length - 1);
    return arr[j] * (1 - f) + arr[k] * f;
  }
  function filter2(x, side, track, rt, sr) {
    if (!rt) return x;
    let y = x;
    if (track.highpass && track.highpass > 0) {
      const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.highpass, sr * 0.45) / sr), key = side === "L" ? "hpL" : "hpR";
      rt[key] += a * (y - rt[key]);
      y -= rt[key];
    }
    if (track.lowpass && track.lowpass > 0) {
      const a = 1 - Math.exp(-2 * Math.PI * Math.min(track.lowpass, sr * 0.45) / sr), key = side === "L" ? "lpL" : "lpR";
      rt[key] += a * (y - rt[key]);
      y = rt[key];
    }
    return y;
  }
  function audioTrackSample(track, src, projectTime, out, runtime, outputSampleRate = src.sampleRate) {
    out[0] = 0;
    out[1] = 0;
    if (track.mute || projectTime < track.start) return false;
    const clipT = projectTime - track.start;
    if (!track.loop && clipT >= track.duration) return false;
    if ((track.intervalSeconds || 0) > 0) {
      const cycle = clipT % track.intervalSeconds, on = Math.min(track.intervalSeconds, track.intervalOnSeconds ?? track.intervalSeconds);
      if (cycle >= on) return false;
    }
    let at = clipT + track.offset;
    if (track.loop && src.duration > 0) at = (at % src.duration + src.duration) % src.duration;
    if (at < 0 || at >= src.duration) return false;
    let env2 = 1;
    if (track.fadeIn > 0 && clipT < track.fadeIn) env2 *= clamp(clipT / track.fadeIn, 0, 1);
    const remain = track.duration - clipT;
    if (track.fadeOut > 0 && remain < track.fadeOut) env2 *= clamp(remain / track.fadeOut, 0, 1);
    const amp = trackParameterValue(track.automation, "amplitude", clipT, track.amplitude, track.modulation), pan = clamp(trackParameterValue(track.automation, "pan", clipT, track.pan, track.modulation), -1, 1), width = clamp(trackParameterValue(track.automation, "stereoWidth", clipT, track.stereoWidth ?? 1, track.modulation), 0, 2), dl = trackParameterValue(track.automation, "leftDelayMs", clipT, track.leftDelayMs || 0, track.modulation) / 1e3, dr = trackParameterValue(track.automation, "rightDelayMs", clipT, track.rightDelayMs || 0, track.modulation) / 1e3, hp = trackParameterValue(track.automation, "highpass", clipT, track.highpass || 0, track.modulation), lp = trackParameterValue(track.automation, "lowpass", clipT, track.lowpass || 0, track.modulation);
    let l = sampleChannel(src, at - dl, "left"), r = sampleChannel(src, at - dr, "right");
    const mid = (l + r) * 0.5, side = (l - r) * 0.5 * width;
    l = mid + side;
    r = mid - side;
    const dynamic = { ...track, highpass: hp, lowpass: lp };
    l = filter2(l, "L", dynamic, runtime, outputSampleRate);
    r = filter2(r, "R", dynamic, runtime, outputSampleRate);
    const gL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, gR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
    out[0] = l * amp * env2 * gL;
    out[1] = r * amp * env2 * gR;
    return true;
  }

  // src/audio/render.ts
  function activeVoice(v, t) {
    if (v.mute || t < v.start) return null;
    const span = Math.max(1e-9, v.duration), rel = t - v.start, total = v.loop ? Infinity : span * Math.max(1, v.repetitions);
    if (rel >= total) return null;
    return rel % span;
  }
  var ProjectRenderer = class {
    constructor(project, assets = {}, sampleRate = project.sampleRate, seed = 1369948382) {
      this.project = project;
      this.assets = assets;
      this.sampleRate = sampleRate;
      this.seed = seed;
      this.anySolo = project.voices.some((v) => v.solo) || project.noiseTracks.some((n) => n.solo) || project.audioTracks.some((a) => a.solo);
    }
    project;
    assets;
    sampleRate;
    state = { phaseL: /* @__PURE__ */ new Map(), phaseR: /* @__PURE__ */ new Map(), noise: /* @__PURE__ */ new Map(), links: /* @__PURE__ */ new Map(), audio: /* @__PURE__ */ new Map() };
    frame = 0;
    noiseTmp = new Float64Array(2);
    audioTmp = new Float64Array(2);
    seed;
    anySolo;
    get positionSeconds() {
      return this.frame / this.sampleRate;
    }
    reset() {
      this.frame = 0;
      this.state = { phaseL: /* @__PURE__ */ new Map(), phaseR: /* @__PURE__ */ new Map(), noise: /* @__PURE__ */ new Map(), links: /* @__PURE__ */ new Map(), audio: /* @__PURE__ */ new Map() };
    }
    advanceTo(seconds) {
      const target = Math.max(0, Math.round(seconds * this.sampleRate));
      if (target < this.frame) this.reset();
      const scratch = 4096;
      while (this.frame < target) this.renderFrames(Math.min(scratch, target - this.frame), false);
    }
    renderFrames(count, capture = true) {
      count = Math.max(0, Math.floor(count));
      const left = new Float32Array(capture ? count : 0), right = new Float32Array(capture ? count : 0);
      for (let oi = 0; oi < count; oi++) {
        const t = this.frame / this.sampleRate;
        let l = 0, r = 0;
        for (const v of this.project.voices) {
          if (this.anySolo && !v.solo) continue;
          const sc = segmentContext(this.project, v.id, t);
          if (!sc) continue;
          const local = activeVoice(v, sc.time);
          if (local === null) continue;
          let mr = this.state.links.get(v.id);
          if (!mr) {
            mr = createModulationRuntime();
            this.state.links.set(v.id, mr);
          }
          const fp = resolveVoiceFrame(v, local, mr, 1 / this.sampleRate);
          if (sc.overrides) {
            if (Number.isFinite(sc.overrides.carrierHz)) {
              const b = fp.beatHz;
              fp.leftHz = Number(sc.overrides.carrierHz) - b / 2;
              fp.rightHz = Number(sc.overrides.carrierHz) + b / 2;
            }
            if (Number.isFinite(sc.overrides.beatHz)) {
              const c = (fp.leftHz + fp.rightHz) / 2, b = Math.abs(Number(sc.overrides.beatHz));
              fp.leftHz = c - b / 2;
              fp.rightHz = c + b / 2;
            }
            if (Number.isFinite(sc.overrides.amplitude)) fp.amplitude = Number(sc.overrides.amplitude);
            if (Number.isFinite(sc.overrides.pan)) fp.pan = Number(sc.overrides.pan);
            if (Number.isFinite(sc.overrides.duty)) fp.duty = Number(sc.overrides.duty);
          }
          let fl = fp.leftHz, fr = fp.rightHz;
          const amp = fp.amplitude * envelope(v, local) * sc.gain;
          let pl = this.state.phaseL.get(v.id) ?? v.phaseLeft, pr = this.state.phaseR.get(v.id) ?? v.phaseRight;
          const duty = fp.duty, pan = fp.pan, cycle = v.cycleAssetId ? this.assets[v.cycleAssetId]?.left : void 0, sampleL = () => advancedWaveformSample(waveformAt(v, local), pl, duty, fl, this.sampleRate, v.harmonics, cycle), sampleR = () => advancedWaveformSample(waveformAt(v, local), pr, duty, fr, this.sampleRate, v.harmonics, cycle), panL = Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2, panR = Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
          if (v.type === "monaural") {
            const a = sampleL(), b = sampleR(), m = (a + b) * 0.5 * amp;
            l += m * v.leftLevel * panL;
            r += m * v.rightLevel * panR;
          } else if (v.type === "isochronic") {
            const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), gate = t * mod % 1 < duty ? 1 : 0, s = sampleL() * amp * gate;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "am") {
            const carrier = (fl + fr) / 2, mod = Math.abs(fr - fl), m = 0.5 + 0.5 * Math.sin(TAU * mod * t), s = sampleL() * amp * m;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "sham") {
            const carrier = (fl + fr) / 2, s = sampleL() * amp;
            l += s * v.leftLevel * panL;
            r += s * v.rightLevel * panR;
            fl = fr = carrier;
          } else if (v.type === "noise-modulated") {
            const carrier = (fl + fr) / 2, depth = clamp(duty, 0, 1), nm = 1 - depth + depth * (deterministicNoise(v.id, this.frame) * 0.5 + 0.5), sl = sampleL() * amp * nm, sr = sampleR() * amp * nm;
            l += sl * v.leftLevel * panL;
            r += sr * v.rightLevel * panR;
            fl = fr = carrier;
          } else {
            l += sampleL() * amp * v.leftLevel * panL;
            r += sampleR() * amp * v.rightLevel * panR;
          }
          pl = (pl + phaseStep(fl, this.sampleRate)) % TAU;
          pr = (pr + phaseStep(fr, this.sampleRate)) % TAU;
          this.state.phaseL.set(v.id, pl);
          this.state.phaseR.set(v.id, pr);
        }
        for (const n of this.project.noiseTracks) {
          const sc = segmentContext(this.project, n.id, t);
          if (!sc || n.mute || this.anySolo && !n.solo || sc.time < n.start || !n.loop && sc.time >= n.start + n.duration) continue;
          let ns = this.state.noise.get(n.id);
          if (!ns) {
            ns = createNoiseState(n.id, this.seed);
            this.state.noise.set(n.id, ns);
          }
          nextNoiseStereo(n, ns, this.sampleRate, this.noiseTmp, sc.time - n.start);
          l += this.noiseTmp[0];
          r += this.noiseTmp[1];
        }
        for (const a of this.project.audioTracks) {
          const sc = segmentContext(this.project, a.id, t);
          if (!sc || a.mute || this.anySolo && !a.solo || sc.time < a.start) continue;
          const src = this.assets[a.assetId];
          if (!src) continue;
          let ar = this.state.audio.get(a.id);
          if (!ar) {
            ar = createAudioTrackRuntime();
            this.state.audio.set(a.id, ar);
          }
          if (audioTrackSample(a, src, sc.time, this.audioTmp, ar, this.sampleRate)) {
            l += this.audioTmp[0] * sc.gain;
            r += this.audioTmp[1] * sc.gain;
          }
        }
        if (capture) {
          left[oi] = l * this.project.masterGain;
          right[oi] = r * this.project.masterGain;
        }
        this.frame++;
      }
      return { sampleRate: this.sampleRate, left, right, duration: count / this.sampleRate };
    }
  };
  function renderProject(project, options = {}) {
    const sr = options.sampleRate ?? project.sampleRate, start = Math.max(0, options.start ?? 0), dur = Math.max(0, Math.min(options.duration ?? project.duration - start, project.duration - start)), frames = Math.max(0, Math.round(dur * sr)), renderer = new ProjectRenderer(project, options.assets || {}, sr, options.seed);
    renderer.advanceTo(start);
    const chunk = renderer.renderFrames(frames);
    options.onProgress?.(1);
    return chunk;
  }
  function* renderProjectChunks(project, chunkSeconds = 10, options = {}) {
    const sr = options.sampleRate ?? project.sampleRate, renderer = new ProjectRenderer(project, options.assets || {}, sr, options.seed), chunkFrames = Math.max(1, Math.round(chunkSeconds * sr)), total = Math.round(project.duration * sr);
    let done = 0;
    while (done < total) {
      const n = Math.min(chunkFrames, total - done);
      yield renderer.renderFrames(n);
      done += n;
      options.onProgress?.(done / total);
    }
  }

  // src/audio/liveEngine.ts
  var LiveEngine = class {
    ctx = null;
    node = null;
    fallback = false;
    fallbackSource = null;
    fallbackProject = null;
    fallbackAssets = {};
    fallbackOffset = 0;
    ended = () => {
    };
    async init() {
      if (this.ctx) return;
      this.ctx = new AudioContext();
      try {
        await this.ctx.audioWorklet.addModule("./public/worklet.js");
        this.node = new AudioWorkletNode(this.ctx, "binaural-studio", { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
        this.node.channelCount = 2;
        this.node.channelCountMode = "explicit";
        this.node.channelInterpretation = "discrete";
        this.node.port.onmessage = (e) => {
          if (e.data?.type === "ended") this.ended();
        };
        this.node.connect(this.ctx.destination);
      } catch {
        this.fallback = true;
      }
    }
    async playFallbackChunk() {
      if (!this.ctx || !this.fallbackProject) return;
      const p = this.fallbackProject, remaining = Math.max(0, p.duration - this.fallbackOffset);
      if (remaining <= 0) {
        this.ended();
        return;
      }
      const duration = Math.min(30, remaining), rendered = renderProject(p, { start: this.fallbackOffset, duration, assets: this.fallbackAssets });
      const buffer = this.ctx.createBuffer(2, rendered.left.length, rendered.sampleRate);
      buffer.copyToChannel(rendered.left, 0);
      buffer.copyToChannel(rendered.right, 1);
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ctx.destination);
      this.fallbackSource = source;
      this.fallbackOffset += duration;
      source.onended = () => {
        if (this.fallbackSource === source) {
          this.fallbackSource = null;
          void this.playFallbackChunk();
        }
      };
      source.start();
    }
    async start(project, position = 0, onEnded, assets = {}) {
      if (position !== 0) throw new Error("Non-zero live seek is not enabled until exact phase/noise state transfer is available.");
      await this.init();
      if (onEnded) this.ended = onEnded;
      await this.ctx.resume();
      if (this.fallback) {
        this.fallbackProject = structuredClone(project);
        this.fallbackAssets = assets;
        this.fallbackOffset = 0;
        await this.playFallbackChunk();
        return;
      }
      this.node.port.postMessage({ type: "project", project: structuredClone(project), assets });
      this.node.port.postMessage({ type: "start", position: 0 });
    }
    update(project, assets = {}) {
      if (this.fallback) {
        this.fallbackProject = structuredClone(project);
        this.fallbackAssets = assets;
        return;
      }
      this.node?.port.postMessage({ type: "project", project: structuredClone(project), assets });
    }
    stop() {
      if (this.fallback) {
        try {
          this.fallbackSource?.stop();
        } catch {
        }
        this.fallbackSource?.disconnect();
        this.fallbackSource = null;
        this.fallbackProject = null;
        return;
      }
      this.node?.port.postMessage({ type: "stop" });
    }
    get sampleRate() {
      return this.ctx?.sampleRate ?? 0;
    }
  };

  // src/audio/analyze.ts
  var clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
  function stats(buf) {
    let pl = 0, pr = 0, sl = 0, sr = 0, xy = 0, x2 = 0, y2 = 0, dl = 0, dr = 0, diff2 = 0;
    for (let i = 0; i < buf.left.length; i++) {
      const l = buf.left[i], r = buf.right[i];
      pl = Math.max(pl, Math.abs(l));
      pr = Math.max(pr, Math.abs(r));
      sl += l * l;
      sr += r * r;
      xy += l * r;
      x2 += l * l;
      y2 += r * r;
      dl += l;
      dr += r;
      const d = l - r;
      diff2 += d * d;
    }
    const n = Math.max(1, buf.left.length), rmsL = Math.sqrt(sl / n), rmsR = Math.sqrt(sr / n), diffRms = Math.sqrt(diff2 / n);
    return { peakLeft: pl, peakRight: pr, rmsLeft: rmsL, rmsRight: rmsR, correlation: xy / Math.sqrt(Math.max(1e-20, x2 * y2)), clipping: pl >= 0.999999 || pr >= 0.999999, dcLeft: dl / n, dcRight: dr / n, mono: diffRms < Math.max(1e-7, (rmsL + rmsR) * 1e-4), channelUnique: diffRms >= Math.max(1e-7, (rmsL + rmsR) * 1e-4) };
  }
  function goertzel(samples, sampleRate, freq) {
    if (freq <= 0 || freq >= sampleRate / 2) return 0;
    const w = 2 * Math.PI * freq / sampleRate, c = 2 * Math.cos(w);
    let s0 = 0, s1 = 0, s2 = 0;
    for (let i = 0; i < samples.length; i++) {
      s0 = samples[i] + c * s1 - s2;
      s2 = s1;
      s1 = s0;
    }
    return Math.sqrt(Math.max(0, s1 * s1 + s2 * s2 - c * s1 * s2)) / Math.max(1, samples.length);
  }
  function dominantFrequency(samples, sampleRate, minHz = 20, maxHz = 1400) {
    const n = Math.min(samples.length, Math.max(4096, Math.floor(sampleRate * 2))), src = samples.subarray(0, n);
    let best = 0, bestMag = -1;
    const resolution = sampleRate / n, lo = Math.max(1, Math.floor(minHz / resolution)), hi = Math.min(Math.floor(maxHz / resolution), Math.floor(n / 2) - 1);
    for (let k = lo; k <= hi; k++) {
      const f = k * resolution, m = goertzel(src, sampleRate, f);
      if (m > bestMag) {
        bestMag = m;
        best = f;
      }
    }
    return best;
  }
  function cpuSpectrum(samples, sampleRate, bins = 512) {
    const n = Math.min(samples.length, 4096), src = samples.subarray(0, n), freqs = new Float32Array(bins), mags = new Float32Array(bins), max = sampleRate / 2;
    for (let i = 0; i < bins; i++) {
      const f = (i + 1) * max / (bins + 1);
      freqs[i] = f;
      mags[i] = goertzel(src, sampleRate, f);
    }
    return { frequencies: freqs, magnitudes: mags, backend: "cpu" };
  }
  function cpuSpectrogram(samples, sampleRate, bins = 96, windowSize = 2048, hop = 512) {
    windowSize = Math.max(128, Math.min(windowSize, samples.length || 128));
    hop = Math.max(1, hop);
    const frames = Math.max(1, 1 + Math.floor(Math.max(0, samples.length - windowSize) / hop)), times = new Float32Array(frames), freqs = new Float32Array(bins), out = new Float32Array(frames * bins);
    for (let b = 0; b < bins; b++) freqs[b] = (b + 1) * (sampleRate * 0.5) / (bins + 1);
    for (let f = 0; f < frames; f++) {
      const start = Math.min(f * hop, Math.max(0, samples.length - windowSize)), win = samples.subarray(start, start + windowSize);
      times[f] = (start + windowSize / 2) / sampleRate;
      for (let b = 0; b < bins; b++) out[f * bins + b] = goertzel(win, sampleRate, freqs[b]);
    }
    return { times, frequencies: freqs, magnitudes: out, frames, bins, backend: "cpu" };
  }
  function topPeaks(samples, sr, min = 40, max = 1200, count = 6) {
    const n = Math.min(samples.length, Math.max(4096, Math.floor(sr * 2))), res = sr / n, candidates = [];
    for (let k = Math.max(1, Math.floor(min / res)); k <= Math.min(Math.floor(max / res), Math.floor(n / 2) - 1); k++) {
      const f = k * res, m = goertzel(samples.subarray(0, n), sr, f);
      if (candidates.length < count || m > candidates[candidates.length - 1].m) {
        candidates.push({ f, m });
        candidates.sort((a, b) => b.m - a.m);
        candidates.length = Math.min(count, candidates.length);
      }
    }
    return candidates;
  }
  function analyzeStereo(buf) {
    const st = stats(buf), dl = dominantFrequency(buf.left, buf.sampleRate), dr = dominantFrequency(buf.right, buf.sampleRate), diff = Math.abs(dr - dl), ownL = goertzel(buf.left, buf.sampleRate, dl), ownR = goertzel(buf.right, buf.sampleRate, dr), crossL = goertzel(buf.left, buf.sampleRate, dr), crossR = goertzel(buf.right, buf.sampleRate, dl), leak = Math.max(crossL / Math.max(1e-12, ownL), crossR / Math.max(1e-12, ownR)), leakageDb = 20 * Math.log10(Math.max(1e-12, leak));
    const purity = Math.max(ownL, ownR), confidence = clamp2(purity * 8 * (1 - Math.abs(st.correlation) * 0.2) * (st.mono ? 0.2 : 1), 0, 1), lp = topPeaks(buf.left, buf.sampleRate), rp = topPeaks(buf.right, buf.sampleRate), candidates = [];
    for (const l of lp) for (const r of rp) {
      const d = Math.abs(r.f - l.f);
      if (d <= 100) candidates.push({ leftHz: l.f, rightHz: r.f, differenceHz: d, score: l.m * r.m });
    }
    candidates.sort((a, b) => b.score - a.score);
    candidates.length = Math.min(8, candidates.length);
    const issues = [];
    if (st.mono) issues.push("Channels are effectively mono/identical.");
    if (st.clipping) issues.push("Digital clipping detected.");
    if (Math.abs(st.dcLeft) > 0.01 || Math.abs(st.dcRight) > 0.01) issues.push("Material DC offset detected.");
    if (diff < 0.05 || diff > 100) issues.push("No conventional binaural carrier difference was identified.");
    return { ...st, duration: buf.duration, sampleRate: buf.sampleRate, dominantLeftHz: dl, dominantRightHz: dr, differenceHz: diff, leakageDb, confidence, classification: !st.mono && diff > 0.05 && diff < 100 ? "Consistent with a stereo carrier pair" : "No clear binaural carrier pair detected", candidates, integrityIssues: issues, backend: "cpu", spectrum: cpuSpectrum(buf.left, buf.sampleRate) };
  }
  function compareAgainstProject(buf, project, toleranceHz = 0.75) {
    const issues = [];
    const a = analyzeStereo(buf), v = project.voices.find((x) => x.type === "binaural" && !x.mute);
    if (a.clipping) issues.push("clipping");
    if (a.mono) issues.push("mono-summed");
    if (v) {
      const direct = v.automation.some((x) => ["leftHz", "rightHz", "beatHz", "carrierHz"].includes(x.parameter));
      if (!direct) {
        if (Math.abs(a.dominantLeftHz - v.leftHz) > toleranceHz) issues.push("left-carrier-mismatch");
        if (Math.abs(a.dominantRightHz - v.rightHz) > toleranceHz) issues.push("right-carrier-mismatch");
        if (Math.abs(a.dominantLeftHz - v.rightHz) <= toleranceHz && Math.abs(a.dominantRightHz - v.leftHz) <= toleranceHz) issues.push("channels-swapped");
      }
    }
    return { pass: issues.length === 0, issues, analysis: a };
  }

  // src/gpu/webgpu.ts
  var WebGpuAnalyzer = class {
    device = null;
    status = { available: false, active: false, reason: "Not initialized" };
    getStatus() {
      return { ...this.status };
    }
    async init(force = false) {
      if (this.device && !force) return this.status;
      try {
        const gpu2 = navigator.gpu;
        if (!gpu2) {
          this.status = { available: false, active: false, reason: "WebGPU unavailable" };
          return this.status;
        }
        const adapter = await gpu2.requestAdapter();
        if (!adapter) {
          this.status = { available: false, active: false, reason: "No WebGPU adapter" };
          return this.status;
        }
        this.device = await adapter.requestDevice();
        this.device.lost.then((info) => {
          this.device = null;
          this.status = { available: true, active: false, reason: `Device lost: ${info?.message || "unknown"}` };
        });
        const limits = {};
        for (const k of ["maxBufferSize", "maxStorageBufferBindingSize", "maxComputeWorkgroupSizeX", "maxComputeInvocationsPerWorkgroup"]) if (adapter.limits?.[k] != null) limits[k] = Number(adapter.limits[k]);
        this.status = { available: true, active: true, adapterName: adapter.info?.description || adapter.info?.vendor || "WebGPU adapter", limits };
        return this.status;
      } catch (e) {
        this.device = null;
        this.status = { available: false, active: false, reason: e instanceof Error ? e.message : String(e) };
        return this.status;
      }
    }
    async spectrum(samples, sampleRate, bins = 512) {
      if (!this.device) await this.init();
      if (!this.device) return cpuSpectrum(samples, sampleRate, bins);
      const n = Math.min(samples.length, 4096), src = samples.slice(0, n), device = this.device;
      const shader = `struct P{n:u32;bins:u32;sampleRate:f32;pad:f32};@group(0) @binding(0)var<storage,read>x:array<f32>;@group(0) @binding(1)var<storage,read_write>out:array<f32>;@group(0) @binding(2)var<uniform>p:P;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id)id:vec3<u32>){let k=id.x;if(k>=p.bins){return;}let f=f32(k+1u)*(p.sampleRate*.5)/f32(p.bins+1u);var re:f32=0.0;var im:f32=0.0;for(var i:u32=0u;i<p.n;i=i+1u){let a=6.28318530718*f*f32(i)/p.sampleRate;re=re+x[i]*cos(a);im=im-x[i]*sin(a);}out[k]=sqrt(re*re+im*im)/f32(p.n);}`;
      try {
        const module = device.createShaderModule({ code: shader });
        const info = await module.getCompilationInfo?.();
        if (info?.messages?.some((m) => m.type === "error")) throw new Error(info.messages.map((m) => m.message).join("; "));
        const inBuf = device.createBuffer({ size: Math.max(4, src.byteLength), usage: 128 | 8, mappedAtCreation: true });
        new Float32Array(inBuf.getMappedRange()).set(src);
        inBuf.unmap();
        const outBuf = device.createBuffer({ size: bins * 4, usage: 128 | 4 }), readBuf = device.createBuffer({ size: bins * 4, usage: 1 | 8 }), uniform = device.createBuffer({ size: 16, usage: 64 | 8, mappedAtCreation: true });
        const dv = new DataView(uniform.getMappedRange());
        dv.setUint32(0, n, true);
        dv.setUint32(4, bins, true);
        dv.setFloat32(8, sampleRate, true);
        uniform.unmap();
        const layout = device.createBindGroupLayout({ entries: [{ binding: 0, visibility: 4, buffer: { type: "read-only-storage" } }, { binding: 1, visibility: 4, buffer: { type: "storage" } }, { binding: 2, visibility: 4, buffer: { type: "uniform" } }] }), pipeline = device.createComputePipeline({ layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }), compute: { module, entryPoint: "main" } }), bind = device.createBindGroup({ layout, entries: [{ binding: 0, resource: { buffer: inBuf } }, { binding: 1, resource: { buffer: outBuf } }, { binding: 2, resource: { buffer: uniform } }] }), enc = device.createCommandEncoder(), pass = enc.beginComputePass();
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bind);
        pass.dispatchWorkgroups(Math.ceil(bins / 64));
        pass.end();
        enc.copyBufferToBuffer(outBuf, 0, readBuf, 0, bins * 4);
        device.queue.submit([enc.finish()]);
        await readBuf.mapAsync(1);
        const mags = new Float32Array(readBuf.getMappedRange().slice(0));
        readBuf.unmap();
        const freqs = new Float32Array(bins);
        for (let i = 0; i < bins; i++) freqs[i] = (i + 1) * (sampleRate * 0.5) / (bins + 1);
        inBuf.destroy();
        outBuf.destroy();
        readBuf.destroy();
        uniform.destroy();
        return { frequencies: freqs, magnitudes: mags, backend: "webgpu" };
      } catch (e) {
        this.status = { available: true, active: false, reason: `WebGPU analysis failed: ${e instanceof Error ? e.message : String(e)}; CPU fallback active` };
        return cpuSpectrum(samples, sampleRate, bins);
      }
    }
    async spectrogram(samples, sampleRate, bins = 96, windowSize = 2048, hop = 512) {
      if (!this.device) await this.init();
      if (!this.device) return cpuSpectrogram(samples, sampleRate, bins, windowSize, hop);
      const frames = Math.max(1, 1 + Math.floor(Math.max(0, samples.length - windowSize) / hop)), times = new Float32Array(frames), freqs = new Float32Array(bins), mags = new Float32Array(frames * bins);
      for (let f = 0; f < frames; f++) {
        const start = Math.min(f * hop, Math.max(0, samples.length - windowSize)), r = await this.spectrum(samples.subarray(start, start + windowSize), sampleRate, bins);
        times[f] = (start + windowSize / 2) / sampleRate;
        if (r.backend !== "webgpu") return cpuSpectrogram(samples, sampleRate, bins, windowSize, hop);
        if (f === 0) freqs.set(r.frequencies);
        mags.set(r.magnitudes, f * bins);
      }
      return { times, frequencies: freqs, magnitudes: mags, frames, bins, backend: "webgpu" };
    }
    async recover() {
      this.device = null;
      return this.init(true);
    }
  };

  // src/core/sessionSchema.ts
  var genOut = { binaural: "binaural", monaural: "monaural", isochronic: "isochronic", am: "am", stereo: "stereo-carrier", "noise-modulated": "noise-modulated", sham: "sham-control" };
  var genIn = { binaural: "binaural", monaural: "monaural", isochronic: "isochronic", am: "am", "stereo-carrier": "stereo", "noise-modulated": "noise-modulated", "sham-control": "sham" };
  var waveOut = { sine: "sine", sine2: "sine-squared", triangle: "triangle", square: "square", "smooth-square": "smoothed-square", saw: "saw", "reverse-saw": "reverse-saw", pulse: "pulse", "bandlimited-square": "square", "bandlimited-saw": "saw", "custom-harmonic": "custom-harmonic", "imported-cycle": "imported-cycle" };
  var waveIn = { sine: "sine", "sine-squared": "sine2", triangle: "triangle", square: "square", "smoothed-square": "smooth-square", saw: "saw", "reverse-saw": "reverse-saw", pulse: "pulse", "custom-harmonic": "custom-harmonic", "imported-cycle": "imported-cycle" };
  var evidenceOut = { "Established Percept": "established-percept", "Neural Response Observed": "neural-response-observed", "Promising Outcome Evidence": "promising-outcome", "Mixed Evidence": "mixed", "Limited Evidence": "limited", "Experimental": "experimental", "Community Claim": "community-claim" };
  var evidenceIn = { "established-percept": "Established Percept", "neural-response-observed": "Neural Response Observed", "promising-outcome": "Promising Outcome Evidence", mixed: "Mixed Evidence", limited: "Limited Evidence", experimental: "Experimental", "community-claim": "Community Claim" };
  var g2db = (g) => 20 * Math.log10(Math.max(1e-12, g));
  var db2g = (db) => Math.pow(10, db / 20);
  function laneOut(a, sr) {
    return { parameter: a.parameter, unit: a.parameter.endsWith("Hz") ? "Hz" : a.parameter === "amplitude" ? "linear" : "", points: a.points.map((p) => ({ frame: Math.max(0, Math.round(p.time * sr)), value: p.value, curve: p.curve, curveData: p.curve === "bezier" ? { c1: p.c1, c2: p.c2 } : void 0 })).map((x) => Object.fromEntries(Object.entries(x).filter(([, v]) => v !== void 0))) };
  }
  function laneIn(a, sr) {
    return { parameter: a.parameter, points: (a.points || []).map((p, i) => ({ id: `ap-${i}`, time: p.frame / sr, value: p.value, curve: p.curve, c1: p.curveData?.c1, c2: p.curveData?.c2 })) };
  }
  function voiceOut(v, sr) {
    return { id: v.id, generator: genOut[v.type], startFrame: Math.round(v.start * sr), durationFrames: Math.max(1, Math.round(v.duration * sr)), leftHz: v.leftHz, rightHz: v.rightHz, centerHz: (v.leftHz + v.rightHz) / 2, beatHz: Math.abs(v.rightHz - v.leftHz), waveform: waveOut[v.waveform], gainDb: g2db(v.amplitude), leftGainDb: g2db(v.leftLevel), rightGainDb: g2db(v.rightLevel), phaseLeftRad: v.phaseLeft, phaseRightRad: v.phaseRight, loop: v.loop, automation: v.automation.map((a) => laneOut(a, sr)), extensions: { name: v.name, duty: v.duty, fadeInFrames: Math.round(v.fadeIn * sr), fadeOutFrames: Math.round(v.fadeOut * sr), repetitions: v.repetitions, links: v.links, harmonics: v.harmonics, waveformAutomation: v.waveformAutomation, cycleAssetId: v.cycleAssetId, routingBus: v.routingBus, bandLimited: v.waveform.startsWith("bandlimited-") } };
  }
  function serializeSession(p) {
    const sr = p.sampleRate;
    return { schemaVersion: "1.0.0", id: p.id, metadata: { title: p.title, author: p.provenance.author, description: p.description, createdAt: p.provenance.createdAt, updatedAt: p.provenance.updatedAt, tags: p.tags }, sampleRatePolicy: { live: "device", offlineHz: sr }, tracks: [...p.voices.map((v) => ({ id: `track-${v.id}`, type: "stimulus", name: v.name, muted: v.mute, solo: v.solo, gainDb: 0, voices: [voiceOut(v, sr)], routingBus: "protected-stereo", extensions: {} })), ...p.noiseTracks.map((n) => ({ id: n.id, type: "noise", name: n.name, muted: n.mute, solo: n.solo, gainDb: g2db(n.amplitude), routingBus: "background", extensions: { noise: n } })), ...p.audioTracks.map((a) => ({ id: a.id, type: "audio", name: a.name, muted: a.mute, solo: a.solo, gainDb: g2db(a.amplitude), routingBus: "background", clips: [a], extensions: {} }))], assets: p.assets.map((a) => Object.fromEntries(Object.entries({ id: a.id, sha256: a.hash, mediaType: a.mime, sizeBytes: a.size, source: a.source || "local", license: a.license, embeddedPath: a.hash ? `assets/${a.id}` : void 0, extensions: { name: a.name } }).filter(([, v]) => v !== void 0))), segments: p.segments.map((s) => ({ id: s.id, name: s.name, startFrame: Math.round(s.start * sr), durationFrames: Math.max(1, Math.round(s.duration * sr)), repeatCount: s.repeat, crossfadeFrames: Math.round(s.crossfade * sr), extensions: { trackIds: s.trackIds, overrides: s.overrides, phaseContinuous: s.phaseContinuous } })), master: { monitorGainDb: g2db(p.masterGain), hardMonitorSafety: true, extensions: {} }, evidence: [{ level: evidenceOut[p.evidence.state], claim: p.evidence.claim, citations: [p.evidence.citation, p.evidence.doi ? `doi:${p.evidence.doi}` : void 0, p.evidence.pmid ? `pmid:${p.evidence.pmid}` : void 0].filter(Boolean), protocolNotes: p.evidence.notes }], provenance: { engineVersion: p.provenance.engineVersion, legacySource: p.provenance.source ? { source: p.provenance.source } : void 0, citations: p.evidence.citation ? [p.evidence.citation] : [], extensions: { appVersion: p.provenance.appVersion, lineage: p.provenance.lineage || [] } }, exportDefaults: { sampleRate: sr }, extensions: { durationSeconds: p.duration, revision: p.revision } };
  }
  function deserializeSession(s) {
    if (!s || s.schemaVersion !== "1.0.0") throw new Error("Unsupported session schema");
    const sr = Number(s.sampleRatePolicy?.offlineHz) || 48e3;
    const voices = [];
    const noiseTracks = [];
    const audioTracks = [];
    for (const t of s.tracks || []) {
      if (t.type === "stimulus") for (const x of t.voices || []) {
        const ex = x.extensions || {};
        voices.push({ id: x.id, name: ex.name || t.name || "Voice", type: genIn[x.generator] || "binaural", leftHz: Number(x.leftHz ?? x.centerHz - (x.beatHz || 0) / 2), rightHz: Number(x.rightHz ?? x.centerHz + (x.beatHz || 0) / 2), amplitude: db2g(Number(x.gainDb) || 0), leftLevel: db2g(Number(x.leftGainDb) || 0), rightLevel: db2g(Number(x.rightGainDb) || 0), phaseLeft: Number(x.phaseLeftRad) || 0, phaseRight: Number(x.phaseRightRad) || 0, waveform: ex.bandLimited && x.waveform === "square" ? "bandlimited-square" : ex.bandLimited && x.waveform === "saw" ? "bandlimited-saw" : waveIn[x.waveform] || "sine", duty: Number(ex.duty ?? 0.5), fadeIn: Number(ex.fadeInFrames || 0) / sr, fadeOut: Number(ex.fadeOutFrames || 0) / sr, start: Number(x.startFrame || 0) / sr, duration: Number(x.durationFrames || 1) / sr, loop: !!x.loop, repetitions: Number(ex.repetitions) || 1, mute: !!t.muted, solo: !!t.solo, automation: (x.automation || []).map((a) => laneIn(a, sr)), links: Array.isArray(ex.links) ? ex.links : [], harmonics: Array.isArray(ex.harmonics) ? ex.harmonics : void 0, waveformAutomation: Array.isArray(ex.waveformAutomation) ? ex.waveformAutomation : void 0, cycleAssetId: ex.cycleAssetId, routingBus: ex.routingBus || "protected-stereo" });
      }
      else if (t.type === "noise" && t.extensions?.noise) noiseTracks.push({ ...t.extensions.noise, mute: !!t.muted, solo: !!t.solo });
      else if (t.type === "audio") for (const c of t.clips || []) audioTracks.push({ ...c, mute: !!t.muted, solo: !!t.solo });
    }
    const ev = s.evidence?.[0] || { level: "experimental", claim: "Imported session" };
    const created = s.metadata?.createdAt || (/* @__PURE__ */ new Date()).toISOString(), updated = s.metadata?.updatedAt || created;
    const segs = (s.segments || []).map((x) => ({ id: x.id, name: x.name, start: Number(x.startFrame || 0) / sr, duration: Number(x.durationFrames || 1) / sr, repeat: Number(x.repeatCount) || 1, crossfade: Number(x.crossfadeFrames || 0) / sr, trackIds: Array.isArray(x.extensions?.trackIds) ? x.extensions.trackIds : void 0, overrides: x.extensions?.overrides, phaseContinuous: x.extensions?.phaseContinuous !== false }));
    const duration = Number(s.extensions?.durationSeconds) || Math.max(1, ...segs.map((x) => x.start + x.duration * x.repeat));
    return { schemaVersion: "1.0.0", id: s.id, title: s.metadata?.title || "Imported session", description: s.metadata?.description || "", duration, sampleRate: sr, masterGain: db2g(Number(s.master?.monitorGainDb) || 0), voices, noiseTracks, audioTracks, assets: (s.assets || []).map((a) => ({ id: a.id, name: a.extensions?.name || a.id, mime: a.mediaType, size: a.sizeBytes || 0, hash: a.sha256 || void 0, license: a.license || "unknown", source: a.source })), segments: segs, markers: [], evidence: { state: evidenceIn[ev.level] || "Experimental", claim: ev.claim || "", citation: ev.citations?.[0], notes: ev.protocolNotes }, provenance: { author: s.metadata?.author || "Unknown", createdAt: created, updatedAt: updated, appVersion: s.provenance?.extensions?.appVersion || "1.0.0", engineVersion: s.provenance?.engineVersion || "unknown", source: s.provenance?.legacySource?.source, lineage: s.provenance?.extensions?.lineage || [] }, tags: s.metadata?.tags || [], revision: Number(s.extensions?.revision) || 1 };
  }

  // src/security/signing.ts
  var te = new TextEncoder();
  function b64(b) {
    const u = b instanceof Uint8Array ? b : new Uint8Array(b);
    let s = "";
    for (const x of u) s += String.fromCharCode(x);
    return btoa(s);
  }
  function unb64(s) {
    const r = atob(s), b = new Uint8Array(r.length);
    for (let i = 0; i < r.length; i++) b[i] = r.charCodeAt(i);
    return b;
  }
  async function createSigningKey() {
    const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
    return { publicKey: b64(await crypto.subtle.exportKey("spki", pair.publicKey)), privateKey: b64(await crypto.subtle.exportKey("pkcs8", pair.privateKey)), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  async function signBytes(data, privateKey) {
    const key = await crypto.subtle.importKey("pkcs8", unb64(privateKey), { name: "Ed25519" }, false, ["sign"]);
    return b64(await crypto.subtle.sign("Ed25519", key, new Uint8Array(data)));
  }
  async function verifyBytes(data, signature, publicKey) {
    const key = await crypto.subtle.importKey("spki", unb64(publicKey), { name: "Ed25519" }, false, ["verify"]);
    return crypto.subtle.verify("Ed25519", key, unb64(signature), new Uint8Array(data));
  }
  async function deriveAesKey(passphrase, salt, iterations, usage) {
    const base = await crypto.subtle.importKey("raw", te.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: new Uint8Array(salt), iterations }, base, { name: "AES-GCM", length: 256 }, false, usage);
  }
  async function encryptSigningKey(bundle, passphrase, iterations = 31e4) {
    if (passphrase.length < 10) throw new Error("Signing-key passphrase must be at least 10 characters.");
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), key = await deriveAesKey(passphrase, salt, iterations, ["encrypt"]);
    const plaintext = te.encode(bundle.privateKey), ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, plaintext);
    plaintext.fill(0);
    return { version: 1, algorithm: "PBKDF2-SHA256/AES-256-GCM", publicKey: bundle.publicKey, createdAt: bundle.createdAt, salt: b64(salt), iv: b64(iv), iterations, ciphertext: b64(ciphertext) };
  }
  async function decryptSigningKey(box, passphrase) {
    if (box.version !== 1 || box.algorithm !== "PBKDF2-SHA256/AES-256-GCM") throw new Error("Unsupported encrypted signing-key format.");
    const key = await deriveAesKey(passphrase, unb64(box.salt), box.iterations, ["decrypt"]);
    let plain;
    try {
      plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(box.iv) }, key, unb64(box.ciphertext));
    } catch {
      throw new Error("Incorrect passphrase or damaged signing key.");
    }
    return { publicKey: box.publicKey, privateKey: new TextDecoder().decode(plain), createdAt: box.createdAt };
  }

  // src/formats/zip.ts
  var te2 = new TextEncoder();
  function crc32(data) {
    let c = 4294967295;
    for (const b of data) {
      c ^= b;
      for (let k = 0; k < 8; k++) c = c >>> 1 ^ (c & 1 ? 3988292384 : 0);
    }
    return (c ^ 4294967295) >>> 0;
  }
  function u16(a, v) {
    a.push(v & 255, v >>> 8 & 255);
  }
  function u32(a, v) {
    u16(a, v & 65535);
    u16(a, v >>> 16);
  }
  function createZip(entries) {
    const out = [], central = [];
    let offset = 0, count = 0;
    for (const [name, val] of Object.entries(entries)) {
      if (name.includes("..") || name.startsWith("/") || name.includes("\\")) throw new Error("Unsafe ZIP path");
      const n = te2.encode(name), d = typeof val === "string" ? te2.encode(val) : val, crc = crc32(d);
      const local = [];
      u32(local, 67324752);
      u16(local, 20);
      u16(local, 0);
      u16(local, 0);
      u16(local, 0);
      u16(local, 0);
      u32(local, crc);
      u32(local, d.length);
      u32(local, d.length);
      u16(local, n.length);
      u16(local, 0);
      local.push(...n, ...d);
      out.push(...local);
      const c = [];
      u32(c, 33639248);
      u16(c, 20);
      u16(c, 20);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u32(c, crc);
      u32(c, d.length);
      u32(c, d.length);
      u16(c, n.length);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u16(c, 0);
      u32(c, 0);
      u32(c, offset);
      c.push(...n);
      central.push(...c);
      offset += local.length;
      count++;
    }
    const start = out.length;
    out.push(...central);
    const end = [];
    u32(end, 101010256);
    u16(end, 0);
    u16(end, 0);
    u16(end, count);
    u16(end, count);
    u32(end, central.length);
    u32(end, start);
    u16(end, 0);
    out.push(...end);
    return new Uint8Array(out);
  }
  function readStoredZip(bytes, maxEntries = 256, maxTotal = 256 * 1024 * 1024) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), td3 = new TextDecoder(), res = {};
    let p = 0, total = 0, count = 0;
    while (p + 30 <= bytes.length && dv.getUint32(p, true) === 67324752) {
      const method = dv.getUint16(p + 8, true), size = dv.getUint32(p + 18, true), nameLen = dv.getUint16(p + 26, true), extra = dv.getUint16(p + 28, true);
      if (method !== 0) throw new Error("Compressed ZIP entries are not supported by the safe project reader");
      const name = td3.decode(bytes.slice(p + 30, p + 30 + nameLen));
      if (name.includes("..") || name.startsWith("/") || name.includes("\\") || res[name]) throw new Error("Unsafe or duplicate ZIP path");
      const start = p + 30 + nameLen + extra, end = start + size;
      if (end > bytes.length) throw new Error("Truncated ZIP");
      total += size;
      if (++count > maxEntries || total > maxTotal) throw new Error("ZIP safety limit exceeded");
      res[name] = bytes.slice(start, end);
      p = end;
    }
    return res;
  }

  // src/formats/projectPackage.ts
  var te3 = new TextEncoder();
  var td = new TextDecoder();
  async function sha256(b) {
    const copy = new Uint8Array(b);
    const h = await crypto.subtle.digest("SHA-256", copy.buffer);
    return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function exportProjectPackage(project, assetBytes = {}, signer2) {
    const normalized = structuredClone(project);
    for (const a of normalized.assets) {
      const bytes = assetBytes[a.id];
      if (bytes) a.hash = await sha256(bytes);
    }
    const session = te3.encode(JSON.stringify(serializeSession(normalized), null, 2));
    const entries = { "session.json": session, "provenance.json": JSON.stringify(normalized.provenance, null, 2) };
    const manifestEntries = [{ path: "session.json", sha256: await sha256(session), size: session.length }];
    for (const a of normalized.assets) {
      const bytes = assetBytes[a.id];
      if (!bytes) continue;
      const path = `assets/${a.id}`;
      entries[path] = bytes;
      manifestEntries.push({ path, sha256: await sha256(bytes), size: bytes.length, mediaType: a.mime, license: a.license });
    }
    const manifest = { format: "bbeat", version: 1, schemaVersion: "1.0.0", createdAt: (/* @__PURE__ */ new Date()).toISOString(), entries: manifestEntries };
    const manifestBytes = te3.encode(JSON.stringify(manifest, null, 2));
    entries["manifest.json"] = manifestBytes;
    if (signer2) {
      const sig = { version: 1, algorithm: "Ed25519", signedPath: "manifest.json", publicKey: signer2.publicKey, signature: await signBytes(manifestBytes, signer2.privateKey) };
      entries["signature.json"] = JSON.stringify(sig, null, 2);
    }
    return createZip(entries);
  }
  async function importProjectPackageDetailed(bytes) {
    const e = readStoredZip(bytes);
    if (!e["manifest.json"] || !e["session.json"]) throw new Error("Invalid .bbeat package");
    const manifestBytes = e["manifest.json"], manifest = JSON.parse(td.decode(manifestBytes));
    if (manifest.format !== "bbeat" || manifest.version !== 1) throw new Error("Unsupported .bbeat version");
    for (const item of manifest.entries || []) {
      const data = e[item.path];
      if (!data) throw new Error(`Missing package entry: ${item.path}`);
      if (data.length !== item.size || await sha256(data) !== item.sha256) throw new Error(`Project integrity check failed: ${item.path}`);
    }
    let signature = { state: "unsigned" };
    if (e["signature.json"]) {
      try {
        const sig = JSON.parse(td.decode(e["signature.json"]));
        if (sig.version !== 1 || sig.algorithm !== "Ed25519" || sig.signedPath !== "manifest.json" || !sig.publicKey || !sig.signature) throw new Error("Unsupported signature metadata");
        const ok = await verifyBytes(manifestBytes, sig.signature, sig.publicKey);
        signature = ok ? { state: "valid", publicKey: sig.publicKey } : { state: "invalid", publicKey: sig.publicKey, reason: "Signature verification failed" };
      } catch (err) {
        signature = { state: "invalid", reason: err instanceof Error ? err.message : String(err) };
      }
    }
    const project = deserializeSession(JSON.parse(td.decode(e["session.json"]))), assets = {};
    for (const a of project.assets) {
      const path = `assets/${a.id}`;
      if (e[path]) assets[a.id] = e[path];
    }
    return { project, assets, signature };
  }

  // src/formats/streamPcm.ts
  function ascii(v, o, s) {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  }
  function ext80(rate) {
    let exp = Math.floor(Math.log2(rate)), frac = rate / Math.pow(2, exp), e = exp + 16383;
    return { e, hi: Math.floor(frac * Math.pow(2, 31)), lo: Math.floor(frac * Math.pow(2, 63) % Math.pow(2, 32)) };
  }
  function wavHeader(frames, sampleRate, bits) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(44), v = new DataView(ab);
    ascii(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    ascii(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 2, true);
    v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * 2 * bytes, true);
    v.setUint16(32, 2 * bytes, true);
    v.setUint16(34, bps, true);
    ascii(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    return new Uint8Array(ab);
  }
  function wavPcm(b, bits) {
    const depth = bits === "f32" ? 32 : bits, bytes = depth / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab);
    let o = 0;
    for (let i = 0; i < b.left.length; i++) for (const x0 of [b.left[i], b.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function aiffHeader(frames, sampleRate, bits) {
    const bytes = bits / 8, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(54), v = new DataView(ab);
    ascii(v, 0, "FORM");
    v.setUint32(4, 46 + dataBytes, false);
    ascii(v, 8, "AIFF");
    ascii(v, 12, "COMM");
    v.setUint32(16, 18, false);
    v.setUint16(20, 2, false);
    v.setUint32(22, frames, false);
    v.setUint16(26, bits, false);
    const x = ext80(sampleRate);
    v.setUint16(28, x.e, false);
    v.setUint32(30, x.hi, false);
    v.setUint32(34, x.lo, false);
    ascii(v, 38, "SSND");
    v.setUint32(42, 8 + dataBytes, false);
    v.setUint32(46, 0, false);
    v.setUint32(50, 0, false);
    return new Uint8Array(ab);
  }
  function aiffPcm(b, bits) {
    const bytes = bits / 8, ab = new ArrayBuffer(b.left.length * 2 * bytes), v = new DataView(ab);
    let o = 0;
    for (let i = 0; i < b.left.length; i++) for (const x0 of [b.left[i], b.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), false);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q >> 16 & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), false);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function parts(project, assets, chunkSeconds, onProgress, convert) {
    const out = [], frames = Math.round(project.duration * project.sampleRate);
    let done = 0;
    for (const b of renderProjectChunks(project, chunkSeconds, { assets })) {
      out.push(convert(b));
      done += b.left.length;
      onProgress?.(done / Math.max(1, frames));
    }
    return out;
  }
  function renderWavBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) {
    const frames = Math.round(project.duration * project.sampleRate);
    return new Blob([wavHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, (b) => wavPcm(b, bits))], { type: "audio/wav" });
  }
  function renderAiffBlob(project, bits = 24, assets = {}, chunkSeconds = 5, onProgress) {
    const frames = Math.round(project.duration * project.sampleRate);
    return new Blob([aiffHeader(frames, project.sampleRate, bits), ...parts(project, assets, chunkSeconds, onProgress, (b) => aiffPcm(b, bits))], { type: "audio/aiff" });
  }

  // src/formats/flac.ts
  function crc8(bytes) {
    let crc = 0;
    for (const b of bytes) {
      crc ^= b;
      for (let i = 0; i < 8; i++) crc = crc & 128 ? (crc << 1 ^ 7) & 255 : crc << 1 & 255;
    }
    return crc;
  }
  function crc16(bytes) {
    let crc = 0;
    for (const b of bytes) {
      crc ^= b << 8;
      for (let i = 0; i < 8; i++) crc = crc & 32768 ? (crc << 1 ^ 32773) & 65535 : crc << 1 & 65535;
    }
    return crc;
  }
  function utf8Uint(n) {
    n = Math.max(0, Math.floor(n));
    if (n < 128) return [n];
    if (n < 2048) return [192 | n >> 6, 128 | n & 63];
    if (n < 65536) return [224 | n >> 12, 128 | n >> 6 & 63, 128 | n & 63];
    if (n < 2097152) return [240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
    if (n < 67108864) return [248 | n >> 24, 128 | n >> 18 & 63, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
    return [252 | n / 1073741824 & 1, 128 | n >> 24 & 63, 128 | n >> 18 & 63, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | n & 63];
  }
  function put24(a, o, n) {
    a[o] = n >>> 16 & 255;
    a[o + 1] = n >>> 8 & 255;
    a[o + 2] = n & 255;
  }
  function pcmInt(x, bits) {
    x = Math.max(-1, Math.min(1, x));
    return Math.round(x < 0 ? x * Math.pow(2, bits - 1) : x * (Math.pow(2, bits - 1) - 1));
  }
  function writeSigned(out, n, bits) {
    if (bits === 16) {
      out.push(n >> 8 & 255, n & 255);
    } else out.push(n >> 16 & 255, n >> 8 & 255, n & 255);
  }
  function makeFrame(buf, start, count, bits, frameNo) {
    const header = [255, 248, 112, 16 | (bits === 16 ? 4 : 6) << 1, ...utf8Uint(frameNo), count - 1 >> 8, count - 1 & 255];
    header.push(crc8(Uint8Array.from(header)));
    const body = [];
    for (const channel2 of [buf.left, buf.right]) {
      body.push(2);
      for (let i = 0; i < count; i++) writeSigned(body, pcmInt(channel2[start + i], bits), bits);
    }
    const frame = Uint8Array.from([...header, ...body]);
    const c = crc16(frame);
    return Uint8Array.from([...frame, c >> 8 & 255, c & 255]);
  }
  function encodeFlac(buf, bits = 24, blockSize = 4096) {
    if (buf.left.length !== buf.right.length) throw new Error("FLAC requires equal channel lengths");
    if (!Number.isInteger(buf.sampleRate) || buf.sampleRate < 1 || buf.sampleRate > 1048575) throw new Error("FLAC sample rate is out of range");
    blockSize = Math.max(16, Math.min(65535, Math.floor(blockSize)));
    const frames = [];
    for (let p = 0, n = 0; p < buf.left.length; p += blockSize, n++) frames.push(makeFrame(buf, p, Math.min(blockSize, buf.left.length - p), bits, n));
    const minBlock = buf.left.length ? Math.min(blockSize, buf.left.length) : blockSize, maxBlock = buf.left.length ? Math.min(blockSize, buf.left.length) : blockSize, minFrame = frames.length ? Math.min(...frames.map((x) => x.length)) : 0, maxFrame = frames.length ? Math.max(...frames.map((x) => x.length)) : 0;
    const stream = new Uint8Array(4 + 4 + 34);
    stream.set([102, 76, 97, 67], 0);
    stream[4] = 128;
    put24(stream, 5, 34);
    const v = new DataView(stream.buffer);
    v.setUint16(8, minBlock, false);
    v.setUint16(10, maxBlock, false);
    put24(stream, 12, minFrame);
    put24(stream, 15, maxFrame);
    let packed = BigInt(buf.sampleRate) << 44n | 1n << 41n | BigInt(bits - 1) << 36n | BigInt(buf.left.length);
    for (let i = 0; i < 8; i++) stream[18 + 7 - i] = Number(packed >> BigInt(i * 8) & 255n);
    let size = stream.length;
    for (const f of frames) size += f.length;
    const out = new Uint8Array(size);
    out.set(stream);
    let o = stream.length;
    for (const f of frames) {
      out.set(f, o);
      o += f.length;
    }
    return out;
  }
  function readUtf8Uint(a, state) {
    const b = a[state.o++];
    if (b < 128) return b;
    let count = 0, mask = 128;
    while (b & mask) {
      count++;
      mask >>= 1;
    }
    if (count < 2 || count > 6) throw new Error("Invalid FLAC UTF-8 integer");
    let n = b & (1 << 7 - count) - 1;
    for (let i = 1; i < count; i++) {
      const c = a[state.o++];
      if ((c & 192) !== 128) throw new Error("Invalid FLAC UTF-8 continuation");
      n = n * 64 + (c & 63);
    }
    return n;
  }
  function readSigned(a, state, bits) {
    if (bits === 16) {
      let n = a[state.o] << 8 | a[state.o + 1];
      state.o += 2;
      if (n & 32768) n -= 65536;
      return n / 32768;
    }
    if (bits === 24) {
      let n = a[state.o] << 16 | a[state.o + 1] << 8 | a[state.o + 2];
      state.o += 3;
      if (n & 8388608) n -= 16777216;
      return n / 8388608;
    }
    throw new Error("Unsupported FLAC bit depth");
  }
  function decodeFlacVerbatim(bytes) {
    if (bytes.length < 42 || String.fromCharCode(...bytes.slice(0, 4)) !== "fLaC") throw new Error("Not a FLAC stream");
    let o = 4, sampleRate = 0, bits = 0, total = 0, last = false;
    while (!last) {
      if (o + 4 > bytes.length) throw new Error("Truncated FLAC metadata");
      const h = bytes[o++];
      last = !!(h & 128);
      const type = h & 127, len = bytes[o] << 16 | bytes[o + 1] << 8 | bytes[o + 2];
      o += 3;
      if (o + len > bytes.length) throw new Error("Truncated FLAC metadata block");
      if (type === 0) {
        if (len !== 34) throw new Error("Invalid STREAMINFO");
        let x = 0n;
        for (let i = 0; i < 8; i++) x = x << 8n | BigInt(bytes[o + 10 + i]);
        sampleRate = Number(x >> 44n & 0xfffffn);
        const channels = Number(x >> 41n & 7n) + 1;
        bits = Number(x >> 36n & 31n) + 1;
        total = Number(x & 0xfffffffffn);
        if (channels !== 2) throw new Error("Only stereo FLAC is supported by the deterministic decoder");
        if (bits !== 16 && bits !== 24) throw new Error("Only 16/24-bit verbatim FLAC is supported by the deterministic decoder");
      }
      o += len;
    }
    if (!sampleRate) throw new Error("Missing FLAC STREAMINFO");
    const left = new Float32Array(total), right = new Float32Array(total);
    let written = 0;
    while (o < bytes.length && written < total) {
      const frameStart = o;
      if (bytes[o] !== 255 || (bytes[o + 1] & 254) !== 248) throw new Error("Invalid FLAC frame sync");
      o += 2;
      const blockCode = bytes[o] >> 4, srCode = bytes[o] & 15;
      o++;
      const assignment = bytes[o] >> 4, sizeCode = bytes[o] >> 1 & 7;
      o++;
      if (blockCode !== 7 || srCode !== 0 || assignment !== 1 || !(bits === 16 && sizeCode === 4 || bits === 24 && sizeCode === 6)) throw new Error("FLAC frame uses features outside deterministic verbatim subset");
      const s = { o };
      readUtf8Uint(bytes, s);
      o = s.o;
      const count = (bytes[o] << 8 | bytes[o + 1]) + 1;
      o += 2;
      const headerNoCrc = bytes.slice(frameStart, o), headerCrc = bytes[o++];
      if (crc8(headerNoCrc) !== headerCrc) throw new Error("FLAC header CRC mismatch");
      for (let ch = 0; ch < 2; ch++) {
        if (bytes[o++] !== 2) throw new Error("Only FLAC verbatim subframes are supported");
        const st = { o };
        const dst = ch === 0 ? left : right;
        for (let i = 0; i < count && written + i < total; i++) dst[written + i] = readSigned(bytes, st, bits);
        o = st.o;
      }
      if (o + 2 > bytes.length) throw new Error("Truncated FLAC frame CRC");
      const expect = bytes[o] << 8 | bytes[o + 1], actual = crc16(bytes.slice(frameStart, o));
      o += 2;
      if (expect !== actual) throw new Error("FLAC frame CRC mismatch");
      written += count;
    }
    if (written !== total) throw new Error(`FLAC sample count mismatch: ${written}/${total}`);
    return { sampleRate, left, right, duration: total / sampleRate };
  }

  // src/formats/wav.ts
  function str(v, o, s) {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  }
  function encodeWav(buf, bits = 24) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, frames = buf.left.length, dataBytes = frames * 2 * bytes, ab = new ArrayBuffer(44 + dataBytes), v = new DataView(ab);
    str(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    str(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 2, true);
    v.setUint32(24, buf.sampleRate, true);
    v.setUint32(28, buf.sampleRate * 2 * bytes, true);
    v.setUint16(32, 2 * bytes, true);
    v.setUint16(34, bps, true);
    str(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    let o = 44;
    for (let i = 0; i < frames; i++) for (const x0 of [buf.left[i], buf.right[i]]) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        let q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }
  function decodeWav(bytes) {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (String.fromCharCode(...bytes.slice(0, 4)) !== "RIFF" || String.fromCharCode(...bytes.slice(8, 12)) !== "WAVE") throw new Error("Not a RIFF/WAVE file");
    let p = 12, fmt4 = 0, ch = 0, sr = 0, bits = 0, dataOff = 0, dataLen = 0;
    while (p + 8 <= bytes.length) {
      const id2 = String.fromCharCode(...bytes.slice(p, p + 4)), len = v.getUint32(p + 4, true);
      if (id2 === "fmt ") {
        fmt4 = v.getUint16(p + 8, true);
        ch = v.getUint16(p + 10, true);
        sr = v.getUint32(p + 12, true);
        bits = v.getUint16(p + 22, true);
      }
      if (id2 === "data") {
        dataOff = p + 8;
        dataLen = len;
        break;
      }
      p += 8 + len + (len & 1);
    }
    if (ch !== 2 || ![1, 3].includes(fmt4) || ![16, 24, 32].includes(bits)) throw new Error("Unsupported WAV encoding");
    const bps = bits / 8, frames = Math.floor(dataLen / (ch * bps)), l = new Float32Array(frames), r = new Float32Array(frames);
    let o = dataOff;
    const read = () => {
      if (fmt4 === 3) {
        const x2 = v.getFloat32(o, true);
        o += 4;
        return x2;
      }
      if (bits === 16) {
        const x2 = v.getInt16(o, true) / 32768;
        o += 2;
        return x2;
      }
      if (bits === 24) {
        let q = v.getUint8(o) | v.getUint8(o + 1) << 8 | v.getUint8(o + 2) << 16;
        if (q & 8388608) q |= 4278190080;
        o += 3;
        return q / 8388608;
      }
      const x = v.getInt32(o, true) / 2147483648;
      o += 4;
      return x;
    };
    for (let i = 0; i < frames; i++) {
      l[i] = read();
      r[i] = read();
    }
    return { sampleRate: sr, left: l, right: r, duration: frames / sr };
  }
  function encodeMonoWav(samples, sampleRate, bits = 24) {
    const bps = bits === "f32" ? 32 : bits, bytes = bps / 8, dataBytes = samples.length * bytes, ab = new ArrayBuffer(44 + dataBytes), v = new DataView(ab);
    str(v, 0, "RIFF");
    v.setUint32(4, 36 + dataBytes, true);
    str(v, 8, "WAVEfmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, bits === "f32" ? 3 : 1, true);
    v.setUint16(22, 1, true);
    v.setUint32(24, sampleRate, true);
    v.setUint32(28, sampleRate * bytes, true);
    v.setUint16(32, bytes, true);
    v.setUint16(34, bps, true);
    str(v, 36, "data");
    v.setUint32(40, dataBytes, true);
    let o = 44;
    for (const x0 of samples) {
      const x = Math.max(-1, Math.min(1, x0));
      if (bits === "f32") {
        v.setFloat32(o, x, true);
        o += 4;
      } else if (bits === 16) {
        v.setInt16(o, Math.round(x < 0 ? x * 32768 : x * 32767), true);
        o += 2;
      } else if (bits === 24) {
        const q = Math.round(x < 0 ? x * 8388608 : x * 8388607);
        v.setUint8(o, q & 255);
        v.setUint8(o + 1, q >> 8 & 255);
        v.setUint8(o + 2, q >> 16 & 255);
        o += 3;
      } else {
        v.setInt32(o, Math.round(x < 0 ? x * 2147483648 : x * 2147483647), true);
        o += 4;
      }
    }
    return new Uint8Array(ab);
  }

  // src/formats/exportBundle.ts
  function safe(s) {
    return s.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "track";
  }
  function stimulusManifest(project) {
    return { format: "mindaural-stimulus-manifest", version: 1, generatedAt: (/* @__PURE__ */ new Date()).toISOString(), project: { id: project.id, title: project.title, revision: project.revision, schemaVersion: project.schemaVersion, engineVersion: project.provenance.engineVersion, sampleRate: project.sampleRate, duration: project.duration }, evidence: project.evidence, voices: project.voices.map((v) => ({ id: v.id, name: v.name, type: v.type, leftHz: v.leftHz, rightHz: v.rightHz, beatHz: Math.abs(v.rightHz - v.leftHz), centerHz: (v.leftHz + v.rightHz) / 2, amplitude: v.amplitude, leftLevel: v.leftLevel, rightLevel: v.rightLevel, phaseLeft: v.phaseLeft, phaseRight: v.phaseRight, waveform: v.waveform, duty: v.duty, start: v.start, duration: v.duration, automation: v.automation, links: v.links, routingBus: v.routingBus })), noiseTracks: project.noiseTracks, audioTracks: project.audioTracks.map((a) => ({ ...a, asset: project.assets.find((x) => x.id === a.assetId) })), segments: project.segments, provenance: project.provenance };
  }
  function recipeJson(project) {
    const s = serializeSession(project);
    s.assets = (s.assets || []).map((a) => ({ ...a, embeddedPath: void 0 }));
    return JSON.stringify({ format: "mindaural-recipe", version: 1, session: s }, null, 2);
  }
  function researchManifestJson(project) {
    return JSON.stringify(stimulusManifest(project), null, 2);
  }
  function scopeProject(project, scope) {
    const p = structuredClone(project);
    if (scope === "stimulus") {
      p.noiseTracks = [];
      p.audioTracks = [];
    } else if (scope === "background") {
      p.voices = [];
    }
    return p;
  }
  function renderScope(project, assets, scope, start = 0, duration) {
    return renderProject(scopeProject(project, scope), { start, duration: duration ?? Math.max(0, project.duration - start), assets });
  }
  function createStemBundle(project, assets) {
    const entries = { "manifest.json": JSON.stringify(stimulusManifest(project), null, 2) };
    for (const v of project.voices) {
      const p = structuredClone(project);
      p.voices = p.voices.filter((x) => x.id === v.id);
      p.noiseTracks = [];
      p.audioTracks = [];
      entries[`stems/voice-${safe(v.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    for (const n of project.noiseTracks) {
      const p = structuredClone(project);
      p.voices = [];
      p.noiseTracks = p.noiseTracks.filter((x) => x.id === n.id);
      p.audioTracks = [];
      entries[`stems/noise-${safe(n.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    for (const a of project.audioTracks) {
      const p = structuredClone(project);
      p.voices = [];
      p.noiseTracks = [];
      p.audioTracks = p.audioTracks.filter((x) => x.id === a.id);
      entries[`stems/audio-${safe(a.name)}.wav`] = encodeWav(renderProject(p, { assets }), 24);
    }
    return createZip(entries);
  }
  function createDiagnosticChannels(project, assets) {
    const b = renderProject(project, { assets });
    return { left: encodeMonoWav(b.left, b.sampleRate, 24), right: encodeMonoWav(b.right, b.sampleRate, 24) };
  }

  // src/formats/opus.ts
  var te4 = new TextEncoder();
  function concat(parts2) {
    const n = parts2.reduce((s, p) => s + p.length, 0), out = new Uint8Array(n);
    let o = 0;
    for (const p of parts2) {
      out.set(p, o);
      o += p.length;
    }
    return out;
  }
  function u16le(n) {
    return Uint8Array.of(n & 255, n >>> 8 & 255);
  }
  function u32le(n) {
    return Uint8Array.of(n & 255, n >>> 8 & 255, n >>> 16 & 255, n >>> 24 & 255);
  }
  function u64le(n) {
    let x = BigInt(Math.max(0, Math.floor(n))), a = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      a[i] = Number(x & 255n);
      x >>= 8n;
    }
    return a;
  }
  function u16be(n) {
    return Uint8Array.of(n >>> 8 & 255, n & 255);
  }
  function makeOpusHead(channels = 2, preSkip = 0, inputRate = 48e3) {
    return concat([te4.encode("OpusHead"), Uint8Array.of(1, channels), u16le(preSkip), u32le(inputRate), u16le(0), Uint8Array.of(0)]);
  }
  function makeOpusTags(vendor = "Mindaural") {
    const v = te4.encode(vendor);
    return concat([te4.encode("OpusTags"), u32le(v.length), v, u32le(0)]);
  }
  var oggTable = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let r = i << 24;
      for (let j = 0; j < 8; j++) r = (r << 1 ^ (r & 2147483648 ? 79764919 : 0)) >>> 0;
      t[i] = r;
    }
    return t;
  })();
  function oggCrc(a) {
    let crc = 0;
    for (const b of a) crc = (crc << 8 ^ oggTable[(crc >>> 24 ^ b) & 255]) >>> 0;
    return crc >>> 0;
  }
  function oggPage(packet, serial, seq, granule, flags) {
    const segs = Math.ceil(packet.length / 255) + (packet.length % 255 === 0 ? 1 : 0);
    if (segs > 255) throw new Error("Opus packet too large for single Ogg page");
    const lace = new Uint8Array(segs);
    let left = packet.length;
    for (let i = 0; i < segs; i++) {
      lace[i] = Math.min(255, left);
      left -= lace[i];
    }
    const h = new Uint8Array(27 + segs);
    h.set(te4.encode("OggS"));
    h[4] = 0;
    h[5] = flags;
    h.set(u64le(granule), 6);
    h.set(u32le(serial), 14);
    h.set(u32le(seq), 18);
    h[26] = segs;
    h.set(lace, 27);
    const page = concat([h, packet]), crc = oggCrc(page);
    page[22] = crc & 255;
    page[23] = crc >>> 8 & 255;
    page[24] = crc >>> 16 & 255;
    page[25] = crc >>> 24 & 255;
    return page;
  }
  function muxOggOpus(packets, channels = 2, sampleRate = 48e3) {
    const serial = 1111642929;
    let seq = 0, granule = 0;
    const pages = [oggPage(makeOpusHead(channels, 0, sampleRate), serial, seq++, 0, 2), oggPage(makeOpusTags(), serial, seq++, 0, 0)];
    for (let i = 0; i < packets.length; i++) {
      granule += packets[i].samples;
      pages.push(oggPage(packets[i].data, serial, seq++, granule, i === packets.length - 1 ? 4 : 0));
    }
    return concat(pages);
  }
  function id(...n) {
    return Uint8Array.from(n);
  }
  function vintSize(n) {
    for (let len = 1; len <= 8; len++) {
      const max = Math.pow(2, 7 * len) - 2;
      if (n <= max) {
        const a = new Uint8Array(len);
        let x = BigInt(n);
        for (let i = len - 1; i >= 0; i--) {
          a[i] = Number(x & 255n);
          x >>= 8n;
        }
        a[0] |= 1 << 8 - len;
        return a;
      }
    }
    throw new Error("EBML element too large");
  }
  function elem(elementId, payload) {
    return concat([elementId, vintSize(payload.length), payload]);
  }
  function uint(n, bytes) {
    let len = bytes || 1;
    while (!bytes && n >= Math.pow(256, len) && len < 8) len++;
    const a = new Uint8Array(len);
    let x = BigInt(Math.floor(n));
    for (let i = len - 1; i >= 0; i--) {
      a[i] = Number(x & 255n);
      x >>= 8n;
    }
    return a;
  }
  function str2(s) {
    return te4.encode(s);
  }
  function float64(n) {
    const a = new Uint8Array(8);
    new DataView(a.buffer).setFloat64(0, n, false);
    return a;
  }
  function ebml(...parts2) {
    return concat(parts2);
  }
  function simpleBlock(packet, relativeMs) {
    const tc = Math.max(-32768, Math.min(32767, Math.round(relativeMs))), payload = concat([Uint8Array.of(129), u16be(tc & 65535), Uint8Array.of(128), packet]);
    return elem(id(163), payload);
  }
  function muxWebmOpus(packets, channels = 2, sampleRate = 48e3) {
    const ebmlHeader = elem(id(26, 69, 223, 163), ebml(
      elem(id(66, 134), uint(1)),
      elem(id(66, 247), uint(1)),
      elem(id(66, 242), uint(4)),
      elem(id(66, 243), uint(8)),
      elem(id(66, 130), str2("webm")),
      elem(id(66, 135), uint(4)),
      elem(id(66, 133), uint(2))
    ));
    const info = elem(id(21, 73, 169, 102), ebml(elem(id(42, 215, 177), uint(1e6, 4)), elem(id(77, 128), str2("Mindaural")), elem(id(87, 65), str2("Mindaural"))));
    const audio = elem(id(225), ebml(elem(id(181), float64(sampleRate)), elem(id(159), uint(channels)), elem(id(98, 100), uint(32))));
    const track = elem(id(174), ebml(elem(id(215), uint(1)), elem(id(115, 197), uint(1)), elem(id(131), uint(2)), elem(id(134), str2("A_OPUS")), elem(id(99, 162), makeOpusHead(channels, 0, sampleRate)), elem(id(86, 170), uint(0)), elem(id(86, 187), uint(8e7, 4)), audio));
    const tracks = elem(id(22, 84, 174, 107), track);
    const clusters = [];
    let i = 0;
    while (i < packets.length) {
      const baseMs = Math.floor(packets[i].timestampUs / 1e3), items = [elem(id(231), uint(baseMs))];
      while (i < packets.length) {
        const ms = packets[i].timestampUs / 1e3, rel = ms - baseMs;
        if (rel > 3e4) break;
        items.push(simpleBlock(packets[i].data, rel));
        i++;
      }
      clusters.push(elem(id(31, 67, 182, 117), ebml(...items)));
    }
    const segmentPayload = ebml(info, tracks, ...clusters);
    return concat([ebmlHeader, elem(id(24, 83, 128, 103), segmentPayload)]);
  }
  function linearResample(input, target = 48e3) {
    if (input.sampleRate === target) return input;
    const n = Math.max(1, Math.round(input.left.length * target / input.sampleRate)), l = new Float32Array(n), r = new Float32Array(n), ratio = input.sampleRate / target;
    for (let i = 0; i < n; i++) {
      const p = i * ratio, a = Math.floor(p), b = Math.min(input.left.length - 1, a + 1), f = p - a;
      l[i] = input.left[a] * (1 - f) + input.left[b] * f;
      r[i] = input.right[a] * (1 - f) + input.right[b] * f;
    }
    return { sampleRate: target, left: l, right: r, duration: n / target };
  }
  async function encodeOpusPackets(input, bitrate = 128e3) {
    const AE = globalThis.AudioEncoder, AD = globalThis.AudioData;
    if (!AE || !AD) throw new Error("This browser does not expose WebCodecs Opus encoding.");
    const b = linearResample(input, 48e3), config = { codec: "opus", sampleRate: 48e3, numberOfChannels: 2, bitrate };
    if (AE.isConfigSupported) {
      const s = await AE.isConfigSupported(config);
      if (!s.supported) throw new Error("This browser does not support WebCodecs Opus encoding.");
    }
    const out = [];
    let fatal = null;
    const encoder = new AE({ output: (chunk) => {
      const data = new Uint8Array(chunk.byteLength);
      chunk.copyTo(data);
      const dur = Number(chunk.duration || 2e4), samples = Math.max(1, Math.round(dur * 48e3 / 1e6));
      out.push({ data, samples, timestampUs: Number(chunk.timestamp || 0) });
    }, error: (e) => {
      fatal = e;
    } });
    encoder.configure(config);
    const frame = 960;
    for (let p = 0; p < b.left.length; p += frame) {
      const count = Math.min(frame, b.left.length - p), planes = new Float32Array(count * 2);
      planes.set(b.left.subarray(p, p + count), 0);
      planes.set(b.right.subarray(p, p + count), count);
      const audio = new AD({ format: "f32-planar", sampleRate: 48e3, numberOfFrames: count, numberOfChannels: 2, timestamp: Math.round(p / 48e3 * 1e6), data: planes });
      encoder.encode(audio);
      audio.close();
    }
    await encoder.flush();
    encoder.close();
    if (fatal) throw fatal;
    out.sort((a, b2) => a.timestampUs - b2.timestampUs);
    if (!out.length) throw new Error("Opus encoder returned no packets.");
    return out;
  }
  async function encodeOggOpus(input, bitrate = 128e3) {
    const packets = await encodeOpusPackets(input, bitrate);
    return muxOggOpus(packets, 2, 48e3);
  }
  async function encodeWebmOpus(input, bitrate = 128e3) {
    const packets = await encodeOpusPackets(input, bitrate);
    return muxWebmOpus(packets, 2, 48e3);
  }

  // src/storage/projects.ts
  var DB = "mindaural";
  var STORE = "projects";
  var VERSION = 3;
  function open() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB, VERSION);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("assets")) r.result.createObjectStore("assets", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("playlists")) r.result.createObjectStore("playlists", { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  async function saveProject(p) {
    const db = await open();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(p);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function loadProjects() {
    const db = await open();
    const rows = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE).objectStore(STORE).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return rows.sort((a, b) => b.provenance.updatedAt.localeCompare(a.provenance.updatedAt));
  }

  // src/storage/assets.ts
  var DB2 = "mindaural";
  var STORE2 = "assets";
  var VERSION2 = 3;
  function open2() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB2, VERSION2);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains("projects")) r.result.createObjectStore("projects", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains(STORE2)) r.result.createObjectStore(STORE2, { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("playlists")) r.result.createObjectStore("playlists", { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  async function saveAssetBytes(id2, bytes, mime, name) {
    const db = await open2();
    const stable = new Uint8Array(bytes);
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE2, "readwrite");
      tx.objectStore(STORE2).put({ id: id2, bytes: stable.buffer, mime, name, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function loadAssetBytes(id2) {
    const db = await open2();
    const row2 = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE2).objectStore(STORE2).get(id2);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return row2?.bytes ? new Uint8Array(row2.bytes) : null;
  }

  // src/formats/aiff.ts
  function readExt80(v, o) {
    const e = v.getUint16(o, false);
    if (e === 0) return 0;
    const hi = v.getUint32(o + 2, false), lo = v.getUint32(o + 6, false), frac = hi / Math.pow(2, 31) + lo / Math.pow(2, 63);
    return frac * Math.pow(2, e - 16383);
  }
  function decodeAiff(bytes) {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), tag = (o2) => String.fromCharCode(...bytes.slice(o2, o2 + 4));
    if (tag(0) !== "FORM" || !["AIFF", "AIFC"].includes(tag(8))) throw new Error("Not an AIFF file");
    if (tag(8) === "AIFC") throw new Error("Compressed AIFC is not supported by the project PCM reader");
    let p = 12, ch = 0, frames = 0, bits = 0, sr = 0, ssnd = -1, ssndLen = 0, offset = 0;
    while (p + 8 <= bytes.length) {
      const id2 = tag(p), len = v.getUint32(p + 4, false), body = p + 8;
      if (id2 === "COMM") {
        ch = v.getUint16(body, false);
        frames = v.getUint32(body + 2, false);
        bits = v.getUint16(body + 6, false);
        sr = Math.round(readExt80(v, body + 8));
      } else if (id2 === "SSND") {
        ssnd = body + 8;
        ssndLen = Math.max(0, len - 8);
        offset = v.getUint32(body, false);
        ssnd += offset;
      }
      p += 8 + len + (len & 1);
    }
    if (ch !== 1 && ch !== 2) throw new Error("AIFF must be mono or stereo");
    if (![16, 24, 32].includes(bits) || !sr || ssnd < 0) throw new Error("Unsupported AIFF PCM format");
    const bps = bits / 8, available = Math.floor((ssndLen - offset) / (ch * bps)), count = Math.min(frames || available, available), l = new Float32Array(count), r = new Float32Array(count);
    let o = ssnd;
    const read = () => {
      if (bits === 16) {
        const x2 = v.getInt16(o, false) / 32768;
        o += 2;
        return x2;
      }
      if (bits === 24) {
        let q = v.getUint8(o) << 16 | v.getUint8(o + 1) << 8 | v.getUint8(o + 2);
        if (q & 8388608) q |= 4278190080;
        o += 3;
        return q / 8388608;
      }
      const x = v.getInt32(o, false) / 2147483648;
      o += 4;
      return x;
    };
    for (let i = 0; i < count; i++) {
      l[i] = read();
      r[i] = ch === 2 ? read() : l[i];
    }
    return { sampleRate: sr, left: l, right: r, duration: count / sr };
  }

  // src/audio/import.ts
  var banned = /\.(m4a|aac|mp4)$/i;
  function allowedAudioName(name) {
    return /\.(wav|wave|aif|aiff|flac|mp3|ogg|oga|opus|webm)$/i.test(name) && !banned.test(name);
  }
  async function decodeAudioBytes(bytes, name, mime = "") {
    if (banned.test(name) || /aac|mp4/i.test(mime)) throw new Error("AAC/M4A is intentionally unsupported");
    if (/\.wav$|\.wave$/i.test(name) || /audio\/wav/i.test(mime)) return decodeWav(bytes);
    if (/\.aif$|\.aiff$/i.test(name) || /audio\/(aiff|x-aiff)/i.test(mime)) return decodeAiff(bytes);
    if (/\.flac$/i.test(name) || /audio\/flac/i.test(mime)) {
      try {
        return decodeFlacVerbatim(bytes);
      } catch {
      }
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) throw new Error("No browser audio decoder is available");
    const ctx = new AC();
    try {
      const copy = bytes.slice().buffer, ab = await ctx.decodeAudioData(copy), l = new Float32Array(ab.length), r = new Float32Array(ab.length);
      ab.copyFromChannel(l, 0);
      ab.copyFromChannel(r, Math.min(1, ab.numberOfChannels - 1));
      return { sampleRate: ab.sampleRate, left: l, right: r, duration: ab.duration };
    } finally {
      await ctx.close();
    }
  }

  // src/legacy/bwg.ts
  var td2 = new TextDecoder("latin1");
  function importBwg(bytes) {
    const text = td2.decode(bytes);
    if (/\0/.test(text.slice(0, 128))) throw new Error("Binary BWG variant is not recognized safely by this build");
    const p = createDefaultProject("Imported BWGen preset");
    const warnings = [], unsupported = [];
    const get = (...keys) => {
      for (const k of keys) {
        const m = text.match(new RegExp(`(?:^|\\n)\\s*${k}\\s*[=:]\\s*([-+0-9.]+)`, "i"));
        if (m) return Number(m[1]);
      }
      return void 0;
    };
    const carrier = get("carrier", "basefreq", "base frequency"), beat = get("beat", "beatfreq", "beat frequency"), duration = get("duration", "length");
    if (Number.isFinite(carrier) && Number.isFinite(beat)) p.voices[0] = setCenterBeat(p.voices[0], carrier, beat);
    else warnings.push("Carrier/beat fields were not found; defaults retained.");
    if (Number.isFinite(duration)) {
      p.duration = Math.max(1, duration);
      p.voices[0].duration = p.duration;
      p.segments[0].duration = p.duration;
    }
    for (const term of ["visual", "audiostrobe", "background", "noise", "modulation", "segment"]) if (new RegExp(term, "i").test(text)) unsupported.push(`${term} data requires exact field mapping before lossless import`);
    return { project: p, report: { supported: unsupported.length === 0, imported: 1, warnings, unsupported, sourceFormat: "BWGen text preset" } };
  }
  function exportBwg(project) {
    const unsupported = [];
    if (project.voices.length !== 1) unsupported.push("multiple voices");
    if (project.noiseTracks.length) unsupported.push("noise tracks");
    if (project.audioTracks.length) unsupported.push("audio tracks");
    if (project.voices[0]?.automation.length) unsupported.push("automation");
    if (project.segments.length !== 1) unsupported.push("multiple segments");
    if (unsupported.length) return { bytes: null, report: { supported: false, imported: 0, warnings: [], unsupported, sourceFormat: "BWGen text subset" } };
    const v = project.voices[0];
    const carrier = (v.leftHz + v.rightHz) / 2, beat = Math.abs(v.rightHz - v.leftHz);
    const text = `; Mindaural BWGen-compatible text subset
Carrier=${carrier}
Beat=${beat}
Duration=${project.duration}
Volume=${v.amplitude}
Waveform=${v.waveform}
`;
    return { bytes: new TextEncoder().encode(text), report: { supported: true, imported: 0, warnings: [], unsupported: [], sourceFormat: "BWGen text subset" } };
  }

  // src/core/history.ts
  var History = class {
    constructor(initial, limit = 100) {
      this.limit = limit;
      this.present = structuredClone(initial);
    }
    limit;
    past = [];
    present;
    future = [];
    push(next) {
      this.past.push(structuredClone(this.present));
      if (this.past.length > this.limit) this.past.shift();
      this.present = structuredClone(next);
      this.future = [];
      return structuredClone(this.present);
    }
    undo() {
      if (!this.past.length) return null;
      this.future.unshift(structuredClone(this.present));
      this.present = this.past.pop();
      return structuredClone(this.present);
    }
    redo() {
      if (!this.future.length) return null;
      this.past.push(structuredClone(this.present));
      this.present = this.future.shift();
      return structuredClone(this.present);
    }
    replace(next) {
      this.present = structuredClone(next);
      this.past = [];
      this.future = [];
    }
    canUndo() {
      return this.past.length > 0;
    }
    canRedo() {
      return this.future.length > 0;
    }
  };

  // src/research/session.ts
  function randomInt(max) {
    const x = new Uint32Array(1);
    crypto.getRandomValues(x);
    return x[0] % max;
  }
  function blindCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) s += alphabet[randomInt(alphabet.length)];
    return s;
  }
  function makeCondition(role, project) {
    return { id: crypto.randomUUID(), role, blindLabel: blindCode(), project: structuredClone(project) };
  }
  function randomize(ids) {
    const a = ids.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function createResearchRun(project) {
    const a = makeCondition("A", project), control = makeCondition("control", { ...structuredClone(project), voices: project.voices.map((v) => ({ ...v, type: "sham" })) });
    const conditions = [a, control];
    return { id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString(), conditions, order: randomize(conditions.map((x) => x.id)), preRating: 50, postRating: 50, notes: "", events: [], reactionTimesMs: [] };
  }
  function logEvent(run, type, data) {
    const now = performance.now(), start = run.startedAt ?? now;
    return { ...run, startedAt: run.startedAt ?? now, events: [...run.events, { at: (/* @__PURE__ */ new Date()).toISOString(), elapsedMs: Math.round(now - start), type, data }] };
  }
  function exportResearchJson(run) {
    return JSON.stringify({ ...run, conditions: run.conditions.map((c) => ({ ...c, project: serializeSession(c.project) })) }, null, 2);
  }
  function cell(x) {
    const s = String(x ?? "");
    return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
  }
  function exportResearchCsv(run) {
    const rows = [["run_id", "condition_id", "role", "blind_label", "order", "pre_rating", "post_rating", "reaction_times_ms", "notes"], ...run.conditions.map((c) => [run.id, c.id, c.role, c.blindLabel, run.order.indexOf(c.id) + 1, run.preRating, run.postRating, run.reactionTimesMs.join("|"), run.notes])];
    return rows.map((r) => r.map(cell).join(",")).join("\n");
  }

  // src/ui/StudioSurface.tsx
  var fmt = (n, d = 2) => Number.isFinite(n) ? Number(n).toFixed(d) : "\u2014";
  var curves = ["hold", "linear", "smooth", "exponential", "logarithmic", "bezier"];
  var waveforms = ["sine", "sine2", "triangle", "square", "smooth-square", "saw", "reverse-saw", "pulse", "bandlimited-square", "bandlimited-saw", "custom-harmonic", "imported-cycle"];
  var generators = ["binaural", "monaural", "isochronic", "am", "stereo", "noise-modulated", "sham"];
  var laneParams = ["beatHz", "carrierHz", "leftHz", "rightHz", "amplitude", "pan", "duty"];
  function num(x, f = 0) {
    const n = Number(x);
    return Number.isFinite(n) ? n : f;
  }
  function NumberInput({ label, value, onChange, min, max, step = 0.01, suffix }) {
    return /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("div", { className: "input-suffix" }, /* @__PURE__ */ React.createElement("input", { type: "number", value: Number.isFinite(value) ? value : "", min, max, step, onChange: (e) => onChange(num(e.target.value, value)) }), suffix && /* @__PURE__ */ React.createElement("i", null, suffix)));
  }
  function TrackRows({ project, selection, setSelection, setProject }) {
    const toggle = (kind, id2, key) => setProject((p) => touchProject({ ...p, [kind]: p[kind] instanceof Array ? p[kind].map((x) => x.id === id2 ? { ...x, [key]: !x[key] } : x) : p[kind] }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-track-list", role: "listbox", "aria-label": "Tracks" }, /* @__PURE__ */ React.createElement("div", { className: "track-group-label" }, "STIMULUS"), project.voices.map((v) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "voice" && selection.id === v.id ? "selected" : ""), key: v.id, onClick: () => setSelection({ kind: "voice", id: v.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, v.name), /* @__PURE__ */ React.createElement("small", null, v.type, " \xB7 \u0394 ", fmt(beatOf(v)), " Hz")), /* @__PURE__ */ React.createElement("button", { "aria-label": `Mute ${v.name}`, className: v.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("voices", v.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { "aria-label": `Solo ${v.name}`, className: v.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("voices", v.id, "solo");
    } }, "S"))), /* @__PURE__ */ React.createElement("div", { className: "track-group-label" }, "NOISE / BACKGROUND"), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "noise" && selection.id === n.id ? "selected" : ""), key: n.id, onClick: () => setSelection({ kind: "noise", id: n.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, n.name), /* @__PURE__ */ React.createElement("small", null, n.kind, " noise")), /* @__PURE__ */ React.createElement("button", { className: n.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("noiseTracks", n.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { className: n.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("noiseTracks", n.id, "solo");
    } }, "S"))), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("div", { className: "studio-track-row " + (selection.kind === "audio" && selection.id === a.id ? "selected" : ""), key: a.id, onClick: () => setSelection({ kind: "audio", id: a.id }) }, /* @__PURE__ */ React.createElement("button", { className: "track-main" }, /* @__PURE__ */ React.createElement("b", null, a.name), /* @__PURE__ */ React.createElement("small", null, "audio \xB7 ", fmt(a.duration, 1), " s")), /* @__PURE__ */ React.createElement("button", { className: a.mute ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("audioTracks", a.id, "mute");
    } }, "M"), /* @__PURE__ */ React.createElement("button", { className: a.solo ? "tiny active" : "", onClick: (e) => {
      e.stopPropagation();
      toggle("audioTracks", a.id, "solo");
    } }, "S"))));
  }
  function Clip({ start, duration, total, label, sub, onChange }) {
    const drag = React.useRef(null);
    const down = (e) => {
      if (e.button !== 0) return;
      drag.current = { x: e.clientX, start };
      const move = (m) => {
        if (!drag.current) return;
        const el = e.currentTarget.parentElement, w = Math.max(1, el.getBoundingClientRect().width), dt = (m.clientX - drag.current.x) / w * total;
        onChange(Math.max(0, Math.min(total - duration, drag.current.start + dt)));
      };
      const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
        drag.current = null;
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "timeline-clip", onPointerDown: down, style: { left: `${start / total * 100}%`, width: `${Math.max(0.5, duration / total * 100)}%` } }, /* @__PURE__ */ React.createElement("b", null, label), /* @__PURE__ */ React.createElement("small", null, sub));
  }
  function AutomationEditor({ voice, setProject, project }) {
    const [parameter, setParameter] = React.useState("beatHz");
    const [clipboard, setClipboard] = React.useState(null);
    const lane = voice.automation.find((x) => x.parameter === parameter);
    const fallback = parameter === "beatHz" ? beatOf(voice) : parameter === "carrierHz" ? carrierOf(voice) : parameter === "leftHz" ? voice.leftHz : parameter === "rightHz" ? voice.rightHz : parameter === "amplitude" ? voice.amplitude : parameter === "duty" ? voice.duty : 0;
    const points = lane?.points?.length ? lane.points : [{ id: "virtual-a", time: 0, value: fallback, curve: "linear" }, { id: "virtual-b", time: voice.duration, value: fallback, curve: "linear" }];
    const vals = points.map((p) => p.value), lo = Math.min(...vals, fallback), hi = Math.max(...vals, fallback), range = Math.max(1e-6, hi - lo), pad = range * 0.2;
    const yMin = lo - pad, yMax = hi + pad;
    const update = (next) => setProject((p) => touchProject({ ...p, voices: p.voices.map((v) => v.id === voice.id ? { ...v, automation: [...v.automation.filter((a) => a.parameter !== parameter), { parameter, points: next.sort((a, b) => a.time - b.time) }] } : v) }));
    const add = (e) => {
      const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, time = Math.max(0, Math.min(voice.duration, x * voice.duration)), value = yMax - y * (yMax - yMin);
      update([...lane?.points || [], { id: uid("point"), time, value, curve: "linear" }]);
    };
    const drag = (e, p) => {
      e.stopPropagation();
      const svg = e.currentTarget.ownerSVGElement, r = svg.getBoundingClientRect();
      const move = (m) => {
        const x = Math.max(0, Math.min(1, (m.clientX - r.left) / r.width)), y = Math.max(0, Math.min(1, (m.clientY - r.top) / r.height));
        update(points.filter((x2) => !x2.id.startsWith("virtual")).map((q) => q.id === p.id ? { ...q, time: x * voice.duration, value: yMax - y * (yMax - yMin) } : q));
      };
      const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
      };
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
    };
    const real = lane?.points || [];
    const path = points.map((p, i) => `${i ? "L" : "M"} ${p.time / voice.duration * 800} ${100 - (p.value - yMin) / (yMax - yMin) * 100}`).join(" ");
    return /* @__PURE__ */ React.createElement("section", { className: "automation-editor" }, /* @__PURE__ */ React.createElement("div", { className: "automation-head" }, /* @__PURE__ */ React.createElement("b", null, "Automation"), /* @__PURE__ */ React.createElement("select", { value: parameter, onChange: (e) => setParameter(e.target.value) }, laneParams.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: () => setClipboard(lane ? structuredClone(lane) : null), disabled: !lane }, "Copy"), /* @__PURE__ */ React.createElement("button", { onClick: () => clipboard && update(clipboard.points.map((p) => ({ ...p, id: uid("point") }))), disabled: !clipboard }, "Paste"), /* @__PURE__ */ React.createElement("button", { onClick: () => update([]), disabled: !lane }, "Clear")), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 100", preserveAspectRatio: "none", onDoubleClick: add, "aria-label": `${parameter} automation graph` }, /* @__PURE__ */ React.createElement("path", { d: path, fill: "none", stroke: "currentColor", strokeWidth: "2" }), points.map((p) => /* @__PURE__ */ React.createElement("circle", { key: p.id, cx: p.time / voice.duration * 800, cy: 100 - (p.value - yMin) / (yMax - yMin) * 100, r: "6", onPointerDown: (e) => !p.id.startsWith("virtual") && drag(e, p) }))), /* @__PURE__ */ React.createElement("small", null, "Double-click graph to add a point; drag points to edit."), real.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "automation-table" }, real.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Point time", type: "number", step: ".01", value: p.time, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, time: Math.max(0, Math.min(voice.duration, num(e.target.value))) } : q)) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "Point value", type: "number", step: ".01", value: p.value, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, value: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("select", { value: p.curve, onChange: (e) => update(real.map((q) => q.id === p.id ? { ...q, curve: e.target.value } : q)) }, curves.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("button", { "aria-label": "Delete automation point", onClick: () => update(real.filter((q) => q.id !== p.id)) }, "\xD7")))));
  }
  function TrackAutomationControls({ track, patch, parameters }) {
    const [parameter, setParameter] = React.useState(parameters[0]);
    const lane = (track.automation || []).find((x) => x.parameter === parameter);
    const fallback = Number(track[parameter] ?? 0);
    const setLane = (points) => patch({ automation: [...(track.automation || []).filter((x) => x.parameter !== parameter), { parameter, points }] });
    const addRamp = () => setLane([{ id: uid("point"), time: 0, value: fallback, curve: "linear" }, { id: uid("point"), time: track.duration || 1, value: fallback, curve: "linear" }]);
    const addMod = () => patch({ modulation: [...track.modulation || [], { target: parameter, rateHz: 1, depth: 0.05, phase: 0, offset: 0 }] });
    return /* @__PURE__ */ React.createElement("div", { className: "track-automation" }, /* @__PURE__ */ React.createElement("h4", null, "Automation / modulation"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Parameter"), /* @__PURE__ */ React.createElement("select", { value: parameter, onChange: (e) => setParameter(e.target.value) }, parameters.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: addRamp }, lane ? "Reset ramp" : "+ Ramp"), /* @__PURE__ */ React.createElement("button", { onClick: addMod }, "+ LFO")), lane && /* @__PURE__ */ React.createElement("div", { className: "automation-table" }, lane.points.map((pt) => /* @__PURE__ */ React.createElement("div", { key: pt.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Automation time", type: "number", min: "0", max: track.duration, step: ".01", value: pt.time, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, time: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "Automation value", type: "number", step: ".01", value: pt.value, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, value: num(e.target.value) } : q)) }), /* @__PURE__ */ React.createElement("select", { value: pt.curve, onChange: (e) => setLane(lane.points.map((q) => q.id === pt.id ? { ...q, curve: e.target.value } : q)) }, curves.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))), /* @__PURE__ */ React.createElement("button", { onClick: () => setLane(lane.points.filter((q) => q.id !== pt.id)) }, "\xD7")))), (track.modulation || []).map((m, i) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: `${m.target}-${i}` }, /* @__PURE__ */ React.createElement("select", { value: m.target, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, target: e.target.value } : q) }) }, parameters.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("input", { "aria-label": "LFO rate Hz", type: "number", min: "0", step: ".01", value: m.rateHz, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, rateHz: num(e.target.value) } : q) }) }), /* @__PURE__ */ React.createElement("input", { "aria-label": "LFO depth", type: "number", step: ".01", value: m.depth, onChange: (e) => patch({ modulation: track.modulation.map((q, j) => j === i ? { ...q, depth: num(e.target.value) } : q) }) }), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ modulation: track.modulation.filter((_, j) => j !== i) }) }, "\xD7"))));
  }
  function VoiceInspector({ project, voice, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, voices: p.voices.map((v) => v.id === voice.id ? { ...v, ...x } : v) }));
    const addLink = () => patch({ links: [...voice.links, { id: uid("link"), source: "time", target: "beatHz", scale: 1, offset: 0 }] });
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Voice"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: voice.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Generator"), /* @__PURE__ */ React.createElement("select", { value: voice.type, onChange: (e) => patch({ type: e.target.value }) }, generators.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: voice.waveform, onChange: (e) => patch({ waveform: e.target.value }) }, waveforms.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), voice.waveform === "custom-harmonic" && /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Harmonics (comma amplitudes)"), /* @__PURE__ */ React.createElement("input", { value: (voice.harmonics || [1, 0.5, 0.25]).join(","), onChange: (e) => patch({ harmonics: e.target.value.split(",").map(Number).filter(Number.isFinite).slice(0, 64) }) })), voice.waveform === "imported-cycle" && /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Cycle source"), /* @__PURE__ */ React.createElement("select", { value: voice.cycleAssetId || "", onChange: (e) => patch({ cycleAssetId: e.target.value || void 0 }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Choose imported audio\u2026"), project.assets.map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id }, a.name))), /* @__PURE__ */ React.createElement("small", null, "The selected audio asset is treated as one periodic waveform cycle; use a clean single-cycle source for predictable spectra.")), /* @__PURE__ */ React.createElement("h4", null, "Waveform timeline"), (voice.waveformAutomation || []).map((wp) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: wp.id }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Waveform change time", type: "number", min: "0", max: voice.duration, step: ".01", value: wp.time, onChange: (e) => patch({ waveformAutomation: (voice.waveformAutomation || []).map((x) => x.id === wp.id ? { ...x, time: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("select", { value: wp.waveform, onChange: (e) => patch({ waveformAutomation: (voice.waveformAutomation || []).map((x) => x.id === wp.id ? { ...x, waveform: e.target.value } : x) }) }, waveforms.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ waveformAutomation: (voice.waveformAutomation || []).filter((x) => x.id !== wp.id) }) }, "\xD7"))), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ waveformAutomation: [...voice.waveformAutomation || [], { id: uid("wavepoint"), time: voice.duration / 2, waveform: "triangle" }] }) }, "+ Waveform change"), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left ear", value: voice.leftHz, suffix: "Hz", step: ".001", min: 1e-3, onChange: (x) => patch({ leftHz: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right ear", value: voice.rightHz, suffix: "Hz", step: ".001", min: 1e-3, onChange: (x) => patch({ rightHz: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Amplitude", value: voice.amplitude, step: ".005", min: 0, max: 2, onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left level", value: voice.leftLevel, step: ".01", min: 0, max: 2, onChange: (x) => patch({ leftLevel: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right level", value: voice.rightLevel, step: ".01", min: 0, max: 2, onChange: (x) => patch({ rightLevel: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: voice.start, suffix: "s", min: 0, onChange: (x) => patch({ start: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: voice.duration, suffix: "s", min: 0.01, onChange: (x) => patch({ duration: x }) }), /* @__PURE__ */ React.createElement("div", { className: "two-mini" }, /* @__PURE__ */ React.createElement(NumberInput, { label: "Fade in", value: voice.fadeIn, suffix: "s", min: 0, onChange: (x) => patch({ fadeIn: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Fade out", value: voice.fadeOut, suffix: "s", min: 0, onChange: (x) => patch({ fadeOut: x }) })), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duty / modulation depth", value: voice.duty, min: 0.01, max: 0.99, step: ".01", onChange: (x) => patch({ duty: x }) }), /* @__PURE__ */ React.createElement("div", { className: "checks" }, /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.loop, onChange: (e) => patch({ loop: e.target.checked }) }), " Loop"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.mute, onChange: (e) => patch({ mute: e.target.checked }) }), " Mute"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: voice.solo, onChange: (e) => patch({ solo: e.target.checked }) }), " Solo")), /* @__PURE__ */ React.createElement("h4", null, "Parameter links"), voice.links.map((l) => /* @__PURE__ */ React.createElement("div", { className: "link-row", key: l.id }, /* @__PURE__ */ React.createElement("select", { value: l.source, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, source: e.target.value } : x) }) }, ["time", "beatHz", "carrierHz", "amplitude"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("span", null, "\u2192"), /* @__PURE__ */ React.createElement("select", { value: l.target, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, target: e.target.value } : x) }) }, laneParams.map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("input", { title: "Scale", type: "number", step: ".1", value: l.scale, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, scale: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("input", { title: "Offset", type: "number", step: ".1", value: l.offset, onChange: (e) => patch({ links: voice.links.map((x) => x.id === l.id ? { ...x, offset: num(e.target.value) } : x) }) }), /* @__PURE__ */ React.createElement("button", { onClick: () => patch({ links: voice.links.filter((x) => x.id !== l.id) }) }, "\xD7"))), /* @__PURE__ */ React.createElement("button", { onClick: addLink }, "+ Parameter link"), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Signal help"), /* @__PURE__ */ React.createElement("p", null, "Left/right frequencies are stored explicitly. Center carrier is ", carrierOf(voice).toFixed(3), " Hz and the current difference is ", beatOf(voice).toFixed(3), " Hz. A frequency label does not guarantee a psychological outcome.")));
  }
  function NoiseInspector({ project, track, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, noiseTracks: p.noiseTracks.map((n) => n.id === track.id ? { ...n, ...x } : n) }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Noise"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: track.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Color"), /* @__PURE__ */ React.createElement("select", { value: track.kind, onChange: (e) => patch({ kind: e.target.value }) }, ["white", "pink", "brown", "blue", "violet", "grey", "slope"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x)))), /* @__PURE__ */ React.createElement(NumberInput, { label: "Amplitude", value: track.amplitude, step: ".005", min: 0, max: 1, onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Slope", value: track.slopeDbOct, suffix: "dB/oct", min: -6, max: 6, onChange: (x) => patch({ slopeDbOct: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "High-pass", value: track.highpass || 0, suffix: "Hz", onChange: (x) => patch({ highpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Low-pass", value: track.lowpass || 0, suffix: "Hz", onChange: (x) => patch({ lowpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Stereo correlation", value: track.stereoCorrelation, step: ".01", min: 0, max: 1, onChange: (x) => patch({ stereoCorrelation: x }) }), /* @__PURE__ */ React.createElement(TrackAutomationControls, { track, patch, parameters: ["amplitude", "slopeDbOct", "highpass", "lowpass", "stereoCorrelation"] }), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Noise help"), /* @__PURE__ */ React.createElement("p", null, "Noise automation is evaluated in track-local time. Stereo correlation 0 uses independent channels; 1 shares the same stochastic component.")));
  }
  function AudioInspector({ project, track, setProject }) {
    const patch = (x) => setProject((p) => touchProject({ ...p, audioTracks: p.audioTracks.map((a) => a.id === track.id ? { ...a, ...x } : a) }));
    return /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("h3", null, "Audio clip"), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Name"), /* @__PURE__ */ React.createElement("input", { value: track.name, onChange: (e) => patch({ name: e.target.value }) })), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: track.start, suffix: "s", min: 0, onChange: (x) => patch({ start: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: track.duration, suffix: "s", min: 0.01, onChange: (x) => patch({ duration: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Source offset", value: track.offset, suffix: "s", min: 0, onChange: (x) => patch({ offset: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Level", value: track.amplitude, min: 0, max: 2, step: ".01", onChange: (x) => patch({ amplitude: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Pan", value: track.pan, min: -1, max: 1, step: ".01", onChange: (x) => patch({ pan: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Stereo width", value: track.stereoWidth ?? 1, min: 0, max: 2, step: ".01", onChange: (x) => patch({ stereoWidth: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Left delay", value: track.leftDelayMs || 0, suffix: "ms", min: 0, onChange: (x) => patch({ leftDelayMs: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Right delay", value: track.rightDelayMs || 0, suffix: "ms", min: 0, onChange: (x) => patch({ rightDelayMs: x }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "High-pass", value: track.highpass || 0, suffix: "Hz", min: 0, onChange: (x) => patch({ highpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Low-pass", value: track.lowpass || 0, suffix: "Hz", min: 0, onChange: (x) => patch({ lowpass: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Interval", value: track.intervalSeconds || 0, suffix: "s", min: 0, onChange: (x) => patch({ intervalSeconds: x || void 0 }) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Interval on", value: track.intervalOnSeconds || 0, suffix: "s", min: 0, onChange: (x) => patch({ intervalOnSeconds: x || void 0 }) }), /* @__PURE__ */ React.createElement(TrackAutomationControls, { track, patch, parameters: ["amplitude", "pan", "stereoWidth", "leftDelayMs", "rightDelayMs", "highpass", "lowpass"] }), /* @__PURE__ */ React.createElement("details", { className: "context-help" }, /* @__PURE__ */ React.createElement("summary", null, "Background help"), /* @__PURE__ */ React.createElement("p", null, "Automation and modulation are evaluated in clip-local time. Delay and width controls affect only background tracks, never the protected binaural signal bus.")));
  }
  function StudioSurface({ project, setProject, onPlay, playing, onSave, onExport, onUndo, onRedo, canUndo, canRedo }) {
    const [selection, setSelection] = React.useState({ kind: "voice", id: project.voices[0]?.id || "" });
    const [zoom, setZoom] = React.useState(1);
    const selectedVoice = selection.kind === "voice" ? project.voices.find((v) => v.id === selection.id) : void 0, selectedNoise = selection.kind === "noise" ? project.noiseTracks.find((v) => v.id === selection.id) : void 0, selectedAudio = selection.kind === "audio" ? project.audioTracks.find((v) => v.id === selection.id) : void 0;
    React.useEffect(() => {
      if (selection.kind === "voice" && !project.voices.some((v) => v.id === selection.id) && project.voices[0]) setSelection({ kind: "voice", id: project.voices[0].id });
    }, [project.voices.length]);
    const addVoice = () => setProject((p) => {
      const v = createVoice(`Voice ${p.voices.length + 1}`);
      v.duration = p.duration;
      return touchProject({ ...p, voices: [...p.voices, v] });
    });
    const addNoise = () => setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, { id: uid("noise"), name: `Noise ${p.noiseTracks.length + 1}`, kind: "pink", amplitude: 0.06, slopeDbOct: -3, stereoCorrelation: 0.2, start: 0, duration: p.duration, loop: true, mute: false, solo: false }] }));
    const duplicateSelected = () => {
      if (selectedVoice) setProject((p) => touchProject({ ...p, voices: [...p.voices, { ...structuredClone(selectedVoice), id: uid("voice"), name: selectedVoice.name + " copy" }] }));
      else if (selectedNoise) setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, { ...structuredClone(selectedNoise), id: uid("noise"), name: selectedNoise.name + " copy" }] }));
      else if (selectedAudio) setProject((p) => touchProject({ ...p, audioTracks: [...p.audioTracks, { ...structuredClone(selectedAudio), id: uid("audio"), name: selectedAudio.name + " copy" }] }));
    };
    const deleteSelected = () => setProject((p) => {
      if (selection.kind === "voice" && p.voices.length > 1) return touchProject({ ...p, voices: p.voices.filter((v) => v.id !== selection.id) });
      if (selection.kind === "noise") return touchProject({ ...p, noiseTracks: p.noiseTracks.filter((v) => v.id !== selection.id) });
      if (selection.kind === "audio") return touchProject({ ...p, audioTracks: p.audioTracks.filter((v) => v.id !== selection.id) });
      return p;
    });
    const addSegment = () => setProject((p) => {
      const start = p.segments.reduce((m, s) => Math.max(m, s.start + s.duration * s.repeat), 0), duration = Math.min(60, Math.max(1, p.duration)), end = start + duration, newDuration = Math.max(p.duration, end);
      return touchProject({ ...p, duration: newDuration, voices: p.voices.map((v) => v.start + v.duration >= p.duration - 1e-3 ? { ...v, duration: Math.max(v.duration, newDuration - v.start) } : v), noiseTracks: p.noiseTracks.map((n) => n.start + n.duration >= p.duration - 1e-3 ? { ...n, duration: Math.max(n.duration, newDuration - n.start) } : n), segments: [...p.segments, { id: uid("segment"), name: `Segment ${p.segments.length + 1}`, start, duration, repeat: 1, crossfade: 0.05, phaseContinuous: true }] });
    });
    const addMarker = () => setProject((p) => touchProject({ ...p, markers: [...p.markers, { id: uid("marker"), time: 0, label: `Marker ${p.markers.length + 1}` }] }));
    const total = Math.max(1, project.duration);
    return /* @__PURE__ */ React.createElement("section", { className: "page studio-v2" }, /* @__PURE__ */ React.createElement("div", { className: "studio-v2-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "STUDIO"), /* @__PURE__ */ React.createElement("input", { className: "title-edit", value: project.title, onChange: (e) => setProject((p) => touchProject({ ...p, title: e.target.value })) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: onUndo, disabled: !canUndo, "aria-label": "Undo" }, "\u21B6"), /* @__PURE__ */ React.createElement("button", { onClick: onRedo, disabled: !canRedo, "aria-label": "Redo" }, "\u21B7"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: onPlay }, playing ? "\u25A0 Stop" : "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: onSave }, "Save"), /* @__PURE__ */ React.createElement("div", { className: "menu" }, /* @__PURE__ */ React.createElement("button", null, "Export \u25BE"), /* @__PURE__ */ React.createElement("div", { className: "menu-pop" }, /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav") }, "WAV 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("aiff") }, "AIFF 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("flac") }, "FLAC 24-bit"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("ogg-opus") }, "Ogg Opus"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("webm-opus") }, "WebM Opus"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bbeat") }, ".bbeat project"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bbeat-signed") }, "Signed .bbeat"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("bwg") }, "Legacy .bwg"), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("recipe") }, "Recipe JSON"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("manifest") }, "Stimulus manifest"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("stems") }, "WAV stems ZIP"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("diagnostic") }, "Diagnostic L/R WAVs"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav-stimulus") }, "Stimulus-only WAV"), /* @__PURE__ */ React.createElement("button", { onClick: () => onExport("wav-background") }, "Background-only WAV"))))), /* @__PURE__ */ React.createElement("div", { className: "studio-toolbar" }, /* @__PURE__ */ React.createElement("button", { onClick: addVoice }, "+ Voice"), /* @__PURE__ */ React.createElement("button", { onClick: addNoise }, "+ Noise"), /* @__PURE__ */ React.createElement("button", { onClick: duplicateSelected }, "Duplicate"), /* @__PURE__ */ React.createElement("button", { onClick: deleteSelected }, "Delete"), /* @__PURE__ */ React.createElement("button", { onClick: addSegment }, "+ Segment"), /* @__PURE__ */ React.createElement("button", { onClick: addMarker }, "+ Marker"), /* @__PURE__ */ React.createElement("label", null, "Zoom ", /* @__PURE__ */ React.createElement("input", { type: "range", min: "1", max: "6", step: ".25", value: zoom, onChange: (e) => setZoom(Number(e.target.value)) })), /* @__PURE__ */ React.createElement("label", null, "Master ", /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "1.5", step: ".01", value: project.masterGain, onChange: (e) => setProject((p) => touchProject({ ...p, masterGain: Number(e.target.value) })) }))), /* @__PURE__ */ React.createElement("div", { className: "studio-grid" }, /* @__PURE__ */ React.createElement(TrackRows, { project, selection, setSelection, setProject }), /* @__PURE__ */ React.createElement("div", { className: "timeline-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "timeline-v2", style: { width: `${Math.max(100, zoom * 100)}%` } }, /* @__PURE__ */ React.createElement("div", { className: "timeline-ruler" }, Array.from({ length: 11 }, (_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { left: `${i * 10}%` } }, Math.round(total * i / 10), "s"))), project.markers.map((m) => /* @__PURE__ */ React.createElement("div", { className: "marker-line", key: m.id, style: { left: `${m.time / total * 100}%` }, title: m.label })), project.voices.map((v) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: v.id }, /* @__PURE__ */ React.createElement(Clip, { start: v.start, duration: v.duration, total, label: v.name, sub: `${v.type} \xB7 ${fmt(v.leftHz)}\u2194${fmt(v.rightHz)} Hz`, onChange: (x) => setProject((p) => touchProject({ ...p, voices: p.voices.map((q) => q.id === v.id ? { ...q, start: x } : q) })) }))), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: n.id }, /* @__PURE__ */ React.createElement(Clip, { start: n.start, duration: n.duration, total, label: n.name, sub: `${n.kind} noise`, onChange: (x) => setProject((p) => touchProject({ ...p, noiseTracks: p.noiseTracks.map((q) => q.id === n.id ? { ...q, start: x } : q) })) }))), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("div", { className: "lane-row", key: a.id }, /* @__PURE__ */ React.createElement(Clip, { start: a.start, duration: a.duration, total, label: a.name, sub: "imported audio", onChange: (x) => setProject((p) => touchProject({ ...p, audioTracks: p.audioTracks.map((q) => q.id === a.id ? { ...q, start: x } : q) })) }))), selectedVoice && /* @__PURE__ */ React.createElement(AutomationEditor, { voice: selectedVoice, project, setProject }), /* @__PURE__ */ React.createElement("section", { className: "segment-strip" }, /* @__PURE__ */ React.createElement("b", null, "Segments"), project.segments.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "segment-row", key: s.id }, /* @__PURE__ */ React.createElement("input", { value: s.name, onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, name: e.target.value } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Start", value: s.start, min: 0, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, start: v } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Duration", value: s.duration, min: 0.01, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, duration: v } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Repeat", value: s.repeat, min: 1, step: 1, onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, repeat: Math.max(1, Math.round(v)) } : x) })) }), /* @__PURE__ */ React.createElement(NumberInput, { label: "Crossfade", value: s.crossfade, min: 0, suffix: "s", onChange: (v) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, crossfade: v } : x) })) }), /* @__PURE__ */ React.createElement("label", { className: "compact-field" }, "Scope", /* @__PURE__ */ React.createElement("select", { value: s.trackIds?.length === 1 ? s.trackIds[0] : "all", onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, trackIds: e.target.value === "all" ? void 0 : [e.target.value] } : x) })) }, /* @__PURE__ */ React.createElement("option", { value: "all" }, "All tracks"), project.voices.map((v) => /* @__PURE__ */ React.createElement("option", { value: v.id, key: v.id }, v.name)), project.noiseTracks.map((n) => /* @__PURE__ */ React.createElement("option", { value: n.id, key: n.id }, n.name)), project.audioTracks.map((a) => /* @__PURE__ */ React.createElement("option", { value: a.id, key: a.id }, a.name)))), /* @__PURE__ */ React.createElement("label", { className: "compact-field" }, "Beat override", /* @__PURE__ */ React.createElement("input", { type: "number", step: ".01", placeholder: "none", value: s.overrides?.beatHz ?? "", onChange: (e) => setProject((p) => touchProject({ ...p, segments: p.segments.map((x) => x.id === s.id ? { ...x, overrides: e.target.value === "" ? { ...x.overrides || {}, beatHz: void 0 } : { ...x.overrides || {}, beatHz: Number(e.target.value) } } : x) })) })), /* @__PURE__ */ React.createElement("button", { disabled: i === 0, onClick: () => setProject((p) => {
      const a = p.segments.slice(), j = a.findIndex((x) => x.id === s.id);
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      return touchProject({ ...p, segments: a });
    }) }, "\u2191"), /* @__PURE__ */ React.createElement("button", { onClick: () => setProject((p) => touchProject({ ...p, segments: [...p.segments, { ...structuredClone(s), id: uid("segment"), name: s.name + " copy" }] })) }, "\u29C9")))), /* @__PURE__ */ React.createElement("section", { className: "marker-strip" }, /* @__PURE__ */ React.createElement("b", null, "Markers"), project.markers.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.id }, /* @__PURE__ */ React.createElement("input", { value: m.label, onChange: (e) => setProject((p) => touchProject({ ...p, markers: p.markers.map((x) => x.id === m.id ? { ...x, label: e.target.value } : x) })) }), /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", max: total, step: ".01", value: m.time, onChange: (e) => setProject((p) => touchProject({ ...p, markers: p.markers.map((x) => x.id === m.id ? { ...x, time: num(e.target.value) } : x) })) }), /* @__PURE__ */ React.createElement("button", { onClick: () => setProject((p) => touchProject({ ...p, markers: p.markers.filter((x) => x.id !== m.id) })) }, "\xD7")))))), selectedVoice ? /* @__PURE__ */ React.createElement(VoiceInspector, { project, voice: selectedVoice, setProject }) : selectedNoise ? /* @__PURE__ */ React.createElement(NoiseInspector, { project, track: selectedNoise, setProject }) : selectedAudio ? /* @__PURE__ */ React.createElement(AudioInspector, { project, track: selectedAudio, setProject }) : /* @__PURE__ */ React.createElement("div", { className: "studio-inspector" }, /* @__PURE__ */ React.createElement("p", null, "Select a track."))));
  }

  // src/audio/calibration.ts
  var KEY = "bbs.calibration.v1";
  function loadCalibration() {
    try {
      return { ...emptyCalibration(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch {
      return emptyCalibration();
    }
  }
  function emptyCalibration() {
    return { version: 1, leftConfirmed: false, rightConfirmed: false, alternatingConfirmed: false, centerConfirmed: false, headphonesConfirmed: false, spatialAudioWarningAcknowledged: false };
  }
  function saveCalibration(x) {
    const done = x.leftConfirmed && x.rightConfirmed && x.alternatingConfirmed && x.centerConfirmed && x.headphonesConfirmed && x.spatialAudioWarningAcknowledged;
    const y = { ...x, completedAt: done ? x.completedAt || (/* @__PURE__ */ new Date()).toISOString() : void 0 };
    localStorage.setItem(KEY, JSON.stringify(y));
    return y;
  }
  function calibrationComplete(x = loadCalibration()) {
    return !!x.completedAt;
  }
  async function playCalibrationCue(mode, frequency = 440) {
    const C = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!C) throw new Error("Web Audio is unavailable.");
    const c = new C();
    await c.resume();
    const master = c.createGain();
    master.gain.value = 0.035;
    master.connect(c.destination);
    const play = (panValue, at, duration = 0.28) => {
      const o = c.createOscillator(), p = c.createStereoPanner(), g = c.createGain();
      o.frequency.value = frequency;
      p.pan.value = panValue;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(1, at + 0.02);
      g.gain.setValueAtTime(1, at + duration - 0.03);
      g.gain.linearRampToValueAtTime(0, at + duration);
      o.connect(g).connect(p).connect(master);
      o.start(at);
      o.stop(at + duration + 0.01);
    };
    const t = c.currentTime + 0.03;
    if (mode === "alternating") {
      play(-1, t);
      play(1, t + 0.38);
      play(-1, t + 0.76);
      play(1, t + 1.14);
      setTimeout(() => c.close(), 1700);
    } else {
      play(mode === "left" ? -1 : mode === "right" ? 1 : 0, t, 0.55);
      setTimeout(() => c.close(), 800);
    }
  }

  // src/cloud/supabase.ts
  var SupabaseRest = class {
    constructor(config) {
      this.config = config;
    }
    config;
    base() {
      return this.config.url.replace(/\/$/, "");
    }
    headers(extra = {}) {
      return { "apikey": this.config.anonKey, "Authorization": `Bearer ${this.config.accessToken || this.config.anonKey}`, ...extra };
    }
    async request(path, init = {}) {
      const r = await fetch(`${this.base()}${path}`, { ...init, headers: { ...this.headers(), ...init.headers || {} } });
      if (r.status === 204) return null;
      const ct = r.headers.get("content-type") || "", raw = await r.text();
      let data = raw;
      try {
        if (raw && ct.includes("json")) data = JSON.parse(raw);
      } catch {
      }
      if (!r.ok) throw new Error(data?.msg || data?.message || data?.error_description || data?.error || `Cloud request failed: ${r.status}`);
      return data;
    }
    json(path, init = {}) {
      return this.request(path, { ...init, headers: { "Content-Type": "application/json", ...init.headers || {} } });
    }
    async signUp(email, password) {
      return this.json("/auth/v1/signup", { method: "POST", body: JSON.stringify({ email, password }) });
    }
    async signIn(email, password) {
      const s = await this.json("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
      this.config.accessToken = s.access_token;
      this.config.refreshToken = s.refresh_token;
      return s;
    }
    async refresh() {
      if (!this.config.refreshToken) throw new Error("No refresh token");
      const s = await this.json("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: this.config.refreshToken }) });
      this.config.accessToken = s.access_token;
      this.config.refreshToken = s.refresh_token;
      return s;
    }
    async me() {
      return this.json("/auth/v1/user");
    }
    async signOut() {
      await this.json("/auth/v1/logout", { method: "POST" });
      this.config.accessToken = void 0;
      this.config.refreshToken = void 0;
    }
    async listPublicPresets(limit = 50) {
      return this.json(`/rest/v1/presets?visibility=eq.public&select=*&order=created_at.desc&limit=${Math.max(1, Math.min(100, limit))}`);
    }
    async listMine() {
      return this.json("/rest/v1/presets?select=*&order=updated_at.desc");
    }
    async saveProjectVersion(project) {
      const body = { project_id: project.id, version: project.revision, session: serializeSession(project) };
      return this.json("/rest/v1/project_versions", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(body) });
    }
    async listProjectVersions(projectId) {
      return this.json(`/rest/v1/project_versions?project_id=eq.${encodeURIComponent(projectId)}&select=*&order=version.desc`);
    }
    async publishPreset(project, metadata) {
      if (!metadata.rightsDeclared) throw new Error("Publishing requires a rights declaration");
      return this.json("/rest/v1/presets", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ title: metadata.title, description: metadata.description, visibility: "public", evidence_level: metadata.evidenceLevel, session: serializeSession(project), rights_declared: true }) });
    }
    async updatePreset(id2, patch) {
      return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id2)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(patch) });
    }
    async deletePreset(id2) {
      return this.json(`/rest/v1/presets?id=eq.${encodeURIComponent(id2)}`, { method: "DELETE" });
    }
    async createShare(projectVersionId, expiresAt) {
      return this.json("/rest/v1/rpc/create_share_link", { method: "POST", body: JSON.stringify({ p_project_version_id: projectVersionId, p_expires_at: expiresAt || null }) });
    }
    async resolveShare(token) {
      return this.json("/rest/v1/rpc/resolve_share_link", { method: "POST", body: JSON.stringify({ p_token: token }) });
    }
    async revokeShare(id2) {
      return this.json("/rest/v1/share_links?id=eq." + encodeURIComponent(id2), { method: "PATCH", body: JSON.stringify({ revoked_at: (/* @__PURE__ */ new Date()).toISOString() }) });
    }
    async listShares() {
      return this.json("/rest/v1/share_links?select=id,project_version_id,expires_at,revoked_at,created_at&order=created_at.desc");
    }
    async favorite(presetId, userId) {
      const body = { preset_id: presetId };
      if (userId) body.user_id = userId;
      return this.json("/rest/v1/favorites", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify(body) });
    }
    async unfavorite(presetId) {
      return this.json(`/rest/v1/favorites?preset_id=eq.${encodeURIComponent(presetId)}`, { method: "DELETE" });
    }
    async listFavorites() {
      return this.json("/rest/v1/favorites?select=preset_id,created_at,presets(*)&order=created_at.desc");
    }
    async review(presetId, rating, body) {
      return this.json("/rest/v1/reviews", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ preset_id: presetId, rating: Math.max(1, Math.min(5, Math.round(rating))), body: body.slice(0, 4e3) }) });
    }
    async reviews(presetId) {
      return this.json(`/rest/v1/reviews?preset_id=eq.${encodeURIComponent(presetId)}&select=id,user_id,rating,body,created_at,updated_at&order=created_at.desc`);
    }
    async report(targetType, targetId, reason) {
      if (reason.trim().length < 3) throw new Error("Please provide a report reason.");
      return this.json("/rest/v1/reports", { method: "POST", body: JSON.stringify({ target_type: targetType, target_id: targetId, reason: reason.trim().slice(0, 2e3) }) });
    }
    async uploadPrivateAsset(userId, name, bytes, contentType = "application/octet-stream") {
      const clean = name.replace(/[^a-zA-Z0-9._-]/g, "_"), path = `${userId}/${crypto.randomUUID()}-${clean}`;
      return this.request(`/storage/v1/object/project-assets/${encodeURIComponent(path).replace(/%2F/g, "/")}`, { method: "POST", headers: { "Content-Type": contentType, "x-upsert": "false" }, body: new Blob([bytes], { type: contentType }) });
    }
    async removePrivateAsset(path) {
      return this.request(`/storage/v1/object/project-assets/${path.split("/").map(encodeURIComponent).join("/")}`, { method: "DELETE" });
    }
    async setPublicSigningKey(publicKey) {
      return this.json("/rest/v1/profiles?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ public_signing_key: publicKey }) });
    }
    async exportMyData() {
      return this.json("/rest/v1/rpc/export_my_data", { method: "POST", body: "{}" });
    }
    async deleteMyAccount() {
      return this.json("/rest/v1/rpc/delete_my_account", { method: "POST", body: "{}" });
    }
  };
  function cloudConfigured() {
    return !!(localStorage.getItem("bbs.supabase.url") && localStorage.getItem("bbs.supabase.key"));
  }
  function cloudFromStorage() {
    const url = localStorage.getItem("bbs.supabase.url") || "", anonKey = localStorage.getItem("bbs.supabase.key") || "", accessToken = sessionStorage.getItem("bbs.supabase.token") || void 0, refreshToken = sessionStorage.getItem("bbs.supabase.refresh") || void 0;
    if (!url || !anonKey) throw new Error("Configure the Supabase URL and anonymous public key in Settings.");
    return new SupabaseRest({ url, anonKey, accessToken, refreshToken });
  }
  function storeCloudSession(s) {
    sessionStorage.setItem("bbs.supabase.token", s.access_token);
    sessionStorage.setItem("bbs.supabase.refresh", s.refresh_token);
  }
  function clearCloudSession() {
    sessionStorage.removeItem("bbs.supabase.token");
    sessionStorage.removeItem("bbs.supabase.refresh");
  }

  // src/security/keyStore.ts
  var STORAGE = "bbs.signing.encrypted.v1";
  var unlocked = null;
  function encryptedKey() {
    try {
      const s = localStorage.getItem(STORAGE);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }
  function signer() {
    return unlocked ? { publicKey: unlocked.publicKey, privateKey: unlocked.privateKey } : void 0;
  }
  function signingStatus() {
    const box = encryptedKey();
    return { exists: !!box, unlocked: !!unlocked, publicKey: unlocked?.publicKey || box?.publicKey, createdAt: unlocked?.createdAt || box?.createdAt };
  }
  async function createAndStoreSigningKey(passphrase) {
    const bundle = await createSigningKey(), box = await encryptSigningKey(bundle, passphrase);
    localStorage.setItem(STORAGE, JSON.stringify(box));
    unlocked = bundle;
    return signingStatus();
  }
  async function unlockSigningKey(passphrase) {
    const box = encryptedKey();
    if (!box) throw new Error("No local signing key exists.");
    unlocked = await decryptSigningKey(box, passphrase);
    return signingStatus();
  }
  function lockSigningKey() {
    unlocked = null;
    return signingStatus();
  }
  function removeSigningKey() {
    unlocked = null;
    localStorage.removeItem(STORAGE);
  }
  function exportEncryptedSigningKey() {
    const box = encryptedKey();
    if (!box) throw new Error("No signing key to export.");
    return JSON.stringify(box, null, 2);
  }
  function importEncryptedSigningKey(text) {
    const x = JSON.parse(text);
    if (x.version !== 1 || x.algorithm !== "PBKDF2-SHA256/AES-256-GCM" || !x.publicKey || !x.ciphertext) throw new Error("Unsupported signing-key file.");
    localStorage.setItem(STORAGE, JSON.stringify(x));
    unlocked = null;
    return signingStatus();
  }

  // src/ui/SettingsSurface.tsx
  function saveText(name, text) {
    const u = URL.createObjectURL(new Blob([text], { type: "application/json" })), a = document.createElement("a");
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1e3);
  }
  function SettingsSurface({ setMessage }) {
    const [theme, setTheme] = React.useState(localStorage.getItem("bbs.theme") || "system");
    const [cal, setCal] = React.useState(() => loadCalibration());
    const [url, setUrl] = React.useState(localStorage.getItem("bbs.supabase.url") || "");
    const [key, setKey] = React.useState(localStorage.getItem("bbs.supabase.key") || "");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [passphrase, setPassphrase] = React.useState("");
    const [signState, setSignState] = React.useState(() => signingStatus());
    const keyFile = React.useRef(null);
    const mark = (k, v) => setCal(saveCalibration({ ...cal, [k]: v }));
    const cue = async (mode) => {
      try {
        await playCalibrationCue(mode);
        setMessage?.(`Played ${mode} channel cue.`);
      } catch (e) {
        setMessage?.(String(e));
      }
    };
    const saveCloud = () => {
      localStorage.setItem("bbs.supabase.url", url.trim().replace(/\/$/, ""));
      localStorage.setItem("bbs.supabase.key", key.trim());
      setMessage?.("Cloud configuration saved locally.");
    };
    const signin = async (kind) => {
      try {
        saveCloud();
        const api = cloudFromStorage(), s = kind === "in" ? await api.signIn(email, password) : await api.signUp(email, password);
        if (s?.access_token) storeCloudSession(s);
        setUser(s?.user || await api.me().catch(() => null));
        setMessage?.(kind === "in" ? "Signed in." : "Account created; verify email if required by your Supabase project.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "SETTINGS"), /* @__PURE__ */ React.createElement("h1", null, "Device, identity & cloud"), /* @__PURE__ */ React.createElement("div", { className: "settings-grid" }, /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Headphone & channel calibration"), /* @__PURE__ */ React.createElement("p", null, "The browser cannot detect headphones or physical sound pressure. Complete these listening checks yourself."), /* @__PURE__ */ React.createElement("div", { className: "cal-steps" }, /* @__PURE__ */ React.createElement("button", { onClick: () => cue("left") }, "\u25B6 Left-only cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.leftConfirmed, onChange: (e) => mark("leftConfirmed", e.target.checked) }), " I heard it only on the left"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("right") }, "\u25B6 Right-only cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.rightConfirmed, onChange: (e) => mark("rightConfirmed", e.target.checked) }), " I heard it only on the right"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("alternating") }, "\u25B6 Alternating L/R cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.alternatingConfirmed, onChange: (e) => mark("alternatingConfirmed", e.target.checked) }), " Alternation was correct"), /* @__PURE__ */ React.createElement("button", { onClick: () => cue("center") }, "\u25B6 Center cue"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.centerConfirmed, onChange: (e) => mark("centerConfirmed", e.target.checked) }), " Center appeared centered"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.headphonesConfirmed, onChange: (e) => mark("headphonesConfirmed", e.target.checked) }), " I confirm I am using stereo headphones/earbuds"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: cal.spatialAudioWarningAcknowledged, onChange: (e) => mark("spatialAudioWarningAcknowledged", e.target.checked) }), " I checked that mono/spatial/crossfeed processing is disabled when reproducibility matters")), /* @__PURE__ */ React.createElement("b", { className: calibrationComplete(cal) ? "pass" : "warn" }, calibrationComplete(cal) ? `Calibration completed ${new Date(cal.completedAt).toLocaleString()}` : "Calibration incomplete")), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Project signing key"), /* @__PURE__ */ React.createElement("p", null, "Ed25519 signatures authenticate package integrity/key control. The private key is stored only as PBKDF2 + AES-256-GCM encrypted data."), /* @__PURE__ */ React.createElement("label", null, "Key passphrase", /* @__PURE__ */ React.createElement("input", { type: "password", value: passphrase, onChange: (e) => setPassphrase(e.target.value), minLength: 10 })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        setSignState(await createAndStoreSigningKey(passphrase));
        setMessage?.("New encrypted signing key created and unlocked.");
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Create/replace key"), /* @__PURE__ */ React.createElement("button", { disabled: !signState.exists, onClick: async () => {
      try {
        setSignState(await unlockSigningKey(passphrase));
        setMessage?.("Signing key unlocked for this app session.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    } }, "Unlock"), /* @__PURE__ */ React.createElement("button", { disabled: !signState.unlocked, onClick: () => setSignState(lockSigningKey()) }, "Lock")), /* @__PURE__ */ React.createElement("small", null, signState.exists ? `${signState.unlocked ? "Unlocked" : "Locked"} \xB7 public key ${signState.publicKey?.slice(0, 24)}\u2026` : "No local signing key"), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: !signState.exists, onClick: () => saveText("mindaural-signing-key.json", exportEncryptedSigningKey()) }, "Back up encrypted key"), /* @__PURE__ */ React.createElement("button", { onClick: () => keyFile.current?.click() }, "Import encrypted key"), /* @__PURE__ */ React.createElement("input", { hidden: true, ref: keyFile, type: "file", accept: ".json,application/json", onChange: async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      try {
        setSignState(importEncryptedSigningKey(await f.text()));
        setMessage?.("Encrypted signing key imported; unlock it with its passphrase.");
      } catch (err) {
        setMessage?.(String(err));
      }
    } }), /* @__PURE__ */ React.createElement("button", { className: "danger", disabled: !signState.exists, onClick: () => {
      if (confirm("Remove the encrypted signing key from this browser?")) {
        removeSigningKey();
        setSignState(signingStatus());
      }
    } }, "Remove key"))), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Supabase community backend"), /* @__PURE__ */ React.createElement("label", null, "Project URL", /* @__PURE__ */ React.createElement("input", { value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://\u2026supabase.co" })), /* @__PURE__ */ React.createElement("label", null, "Anonymous public key", /* @__PURE__ */ React.createElement("input", { type: "password", value: key, onChange: (e) => setKey(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: saveCloud }, "Save endpoint"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        saveCloud();
        const u = await cloudFromStorage().me();
        setUser(u);
        setMessage?.("Cloud connection authenticated.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    } }, "Test session")), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("label", null, "Email", /* @__PURE__ */ React.createElement("input", { type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value) })), /* @__PURE__ */ React.createElement("label", null, "Password", /* @__PURE__ */ React.createElement("input", { type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => signin("in") }, "Sign in"), /* @__PURE__ */ React.createElement("button", { onClick: () => signin("up") }, "Create account"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        await cloudFromStorage().signOut();
      } catch {
      }
      clearCloudSession();
      setUser(null);
      setMessage?.("Signed out locally.");
    } }, "Sign out")), user && /* @__PURE__ */ React.createElement("small", null, "Signed in: ", user.email || user.id)), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Appearance & accessibility"), /* @__PURE__ */ React.createElement("label", null, "Theme", /* @__PURE__ */ React.createElement("select", { value: theme, onChange: (e) => {
      const v = e.target.value;
      setTheme(v);
      localStorage.setItem("bbs.theme", v);
      document.documentElement.dataset.theme = v;
    } }, /* @__PURE__ */ React.createElement("option", { value: "system" }, "System"), /* @__PURE__ */ React.createElement("option", { value: "light" }, "Light"), /* @__PURE__ */ React.createElement("option", { value: "dark" }, "Dark"))), /* @__PURE__ */ React.createElement("p", null, "Keyboard focus is always visible; reduced-motion preferences disable nonessential animation.")), /* @__PURE__ */ React.createElement("div", { className: "settings-card" }, /* @__PURE__ */ React.createElement("h3", null, "Format policy"), /* @__PURE__ */ React.createElement("p", null, "Bundled targets: WAV \xB7 AIFF \xB7 FLAC \xB7 MP3 \xB7 Ogg Vorbis \xB7 Ogg Opus \xB7 WebM Opus."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "AAC/M4A:"), " intentionally unsupported. ", /* @__PURE__ */ React.createElement("b", null, "FFmpeg:"), " prohibited throughout the project."))));
  }

  // src/labs/lightControl.ts
  var TAU2 = Math.PI * 2;
  var CARRIER = 19200;
  var DEFAULT_LIGHT_CONTROL = { frequencyHz: 10, leftAmplitude: 0.25, rightAmplitude: 0.25, leftPhase: 0, rightPhase: 0, duty: 0.5, waveform: "square" };
  function env(spec, t, phase) {
    const p = ((t * spec.frequencyHz + phase / TAU2) % 1 + 1) % 1;
    if (spec.waveform === "sine") return 0.5 + 0.5 * Math.sin(TAU2 * p);
    return p < Math.max(0.01, Math.min(0.99, spec.duty)) ? 1 : 0;
  }
  function renderLightControl(duration, sampleRate, spec = DEFAULT_LIGHT_CONTROL) {
    if (sampleRate < 44100) throw new Error("19.2 kHz light-control export requires at least 44.1 kHz sample rate");
    const n = Math.max(1, Math.round(duration * sampleRate)), left = new Float32Array(n), right = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / sampleRate, carrier = Math.sin(TAU2 * CARRIER * t);
      left[i] = carrier * spec.leftAmplitude * env(spec, t, spec.leftPhase);
      right[i] = carrier * spec.rightAmplitude * env(spec, t, spec.rightPhase);
    }
    return { sampleRate, left, right, duration: n / sampleRate };
  }
  function analyzeLightControl(buf) {
    const l = goertzel(buf.left, buf.sampleRate, CARRIER), r = goertzel(buf.right, buf.sampleRate, CARRIER), present = Math.max(l, r) > 2e-3;
    return { carrierHz: CARRIER, leftCarrierMagnitude: l, rightCarrierMagnitude: r, present, confidence: Math.min(1, Math.max(l, r) * 8) };
  }

  // src/ui/LabsSurface.tsx
  function download(name, bytes, type = "audio/wav") {
    const u = URL.createObjectURL(new Blob([bytes], { type })), a = document.createElement("a");
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1e3);
  }
  function N({ label, value, onChange, min = 0, max = 100, step = 0.01, suffix = "" }) {
    return /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("input", { type: "number", min, max, step, value, onChange: (e) => onChange(Number(e.target.value)) }), /* @__PURE__ */ React.createElement("small", null, suffix));
  }
  async function estimateRefresh(samples = 45) {
    return new Promise((resolve) => {
      let last = 0, vals = [];
      const tick = (t) => {
        if (last) vals.push(t - last);
        last = t;
        if (vals.length >= samples) {
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
          resolve(1e3 / avg);
        } else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  function LabsSurface({ setMessage }) {
    const [armed, setArmed] = React.useState(false), [visualHz, setVisualHz] = React.useState(10), [visualDuty, setVisualDuty] = React.useState(0.5), [visualWave, setVisualWave] = React.useState("square"), [brightness, setBrightness] = React.useState(0.72), [refresh, setRefresh] = React.useState(null), [spec, setSpec] = React.useState({ ...DEFAULT_LIGHT_CONTROL }), [duration, setDuration] = React.useState(60), [rate, setRate] = React.useState(48e3), [diag, setDiag] = React.useState(null);
    const patch = (p) => setSpec((s) => ({ ...s, ...p }));
    const effectiveHz = refresh && visualWave === "square" ? Math.max(0.5, Math.min(visualHz, refresh / 2)) : visualHz;
    React.useEffect(() => {
      estimateRefresh().then(setRefresh).catch(() => {
      });
    }, []);
    const render = () => {
      try {
        const b = renderLightControl(duration, rate, spec);
        setDiag(analyzeLightControl(b));
        return b;
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
        return null;
      }
    };
    const exportWav = () => {
      const b = render();
      if (!b) return;
      download(`light-control-${spec.frequencyHz}hz.wav`, encodeWav(b, 24));
      setMessage?.("Lossless 24-bit legacy light-control WAV exported. Do not use lossy encoding on the 19.2 kHz carrier.");
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LABS"), /* @__PURE__ */ React.createElement("h1", null, "Visual & legacy light-control laboratory"), /* @__PURE__ */ React.createElement("div", { className: "warning" }, /* @__PURE__ */ React.createElement("b", null, "Photosensitive seizure warning"), /* @__PURE__ */ React.createElement("p", null, "Flashing light can trigger seizures in susceptible people. Enable it only after acknowledging this warning; stop immediately if you feel unwell. Display timing is not laboratory calibrated."), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: armed, onChange: (e) => setArmed(e.target.checked) }), " I understand and want to enable visual flicker controls")), /* @__PURE__ */ React.createElement("div", { className: "labs-grid" }, /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Visual stimulation"), /* @__PURE__ */ React.createElement("p", null, "Measured display refresh: ", /* @__PURE__ */ React.createElement("b", null, refresh ? `${refresh.toFixed(1)} Hz` : "measuring\u2026"), ". Requested patterns are bounded by observable refresh timing."), /* @__PURE__ */ React.createElement(N, { label: "Frequency", value: visualHz, min: 0.5, max: Math.max(1, (refresh || 60) / 2), step: 0.1, suffix: "Hz", onChange: setVisualHz }), /* @__PURE__ */ React.createElement(N, { label: "Duty cycle", value: visualDuty, min: 0.05, max: 0.95, step: 0.01, onChange: setVisualDuty }), /* @__PURE__ */ React.createElement(N, { label: "Brightness", value: brightness, min: 0.05, max: 1, step: 0.01, onChange: setBrightness }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: visualWave, onChange: (e) => setVisualWave(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "square" }, "Square"), /* @__PURE__ */ React.createElement("option", { value: "sine" }, "Sine"))), /* @__PURE__ */ React.createElement("div", { className: `visual-preview ${armed ? "armed" : ""}`, style: armed ? { ["--visual-period"]: `${1 / effectiveHz}s`, ["--visual-duty"]: `${visualDuty * 100}%`, opacity: brightness } : void 0 }, /* @__PURE__ */ React.createElement("span", null, armed ? `${effectiveHz.toFixed(2)} Hz preview` : "Safety interlock off")), /* @__PURE__ */ React.createElement("small", null, "Browser scheduling, display response, compositing and refresh rate prevent a laboratory-precision timing claim.")), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Legacy 19.2 kHz Light Control"), /* @__PURE__ */ React.createElement("p", null, "Creates one amplitude-gated 19.2 kHz control carrier per stereo channel for compatible legacy decoders. Keep this path lossless."), /* @__PURE__ */ React.createElement(N, { label: "Light modulation", value: spec.frequencyHz, min: 0.1, max: 40, step: 0.1, suffix: "Hz", onChange: (x) => patch({ frequencyHz: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Left amplitude", value: spec.leftAmplitude, min: 0, max: 0.8, step: 0.01, onChange: (x) => patch({ leftAmplitude: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Right amplitude", value: spec.rightAmplitude, min: 0, max: 0.8, step: 0.01, onChange: (x) => patch({ rightAmplitude: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Left phase", value: spec.leftPhase, min: -6.283, max: 6.283, step: 0.01, suffix: "rad", onChange: (x) => patch({ leftPhase: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Right phase", value: spec.rightPhase, min: -6.283, max: 6.283, step: 0.01, suffix: "rad", onChange: (x) => patch({ rightPhase: x }) }), /* @__PURE__ */ React.createElement(N, { label: "Duty cycle", value: spec.duty, min: 0.01, max: 0.99, step: 0.01, onChange: (x) => patch({ duty: x }) }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: spec.waveform, onChange: (e) => patch({ waveform: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "square" }, "Square gate"), /* @__PURE__ */ React.createElement("option", { value: "sine" }, "Sine gate"))), /* @__PURE__ */ React.createElement(N, { label: "Duration", value: duration, min: 0.1, max: 3600, step: 1, suffix: "s", onChange: setDuration }), /* @__PURE__ */ React.createElement("label", { className: "studio-field" }, /* @__PURE__ */ React.createElement("span", null, "Sample rate"), /* @__PURE__ */ React.createElement("select", { value: rate, onChange: (e) => setRate(Number(e.target.value)) }, /* @__PURE__ */ React.createElement("option", { value: "44100" }, "44.1 kHz"), /* @__PURE__ */ React.createElement("option", { value: "48000" }, "48 kHz"), /* @__PURE__ */ React.createElement("option", { value: "96000" }, "96 kHz"), /* @__PURE__ */ React.createElement("option", { value: "192000" }, "192 kHz"))), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => render() }, "Validate signal"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: exportWav }, "Export lossless WAV")), diag && /* @__PURE__ */ React.createElement("div", { className: "technical" }, /* @__PURE__ */ React.createElement("b", null, diag.present ? "19.2 kHz carrier detected" : "Carrier validation failed"), /* @__PURE__ */ React.createElement("span", null, "L ", diag.leftCarrierMagnitude.toFixed(4), " \xB7 R ", diag.rightCarrierMagnitude.toFixed(4), " \xB7 confidence ", Math.round(diag.confidence * 100), "%"))), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Hardware bridges"), /* @__PURE__ */ React.createElement("p", null, "These capabilities are optional transport bridges; the 19.2 kHz audio file remains the compatibility artifact."), /* @__PURE__ */ React.createElement("div", { className: "chips" }, /* @__PURE__ */ React.createElement("span", null, "Web MIDI: ", navigator.requestMIDIAccess ? "available" : "unavailable"), /* @__PURE__ */ React.createElement("span", null, "Web Serial: ", navigator.serial ? "available" : "unavailable"), /* @__PURE__ */ React.createElement("span", null, "Web Bluetooth: ", navigator.bluetooth ? "available" : "unavailable")), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.requestMIDIAccess, onClick: async () => {
      try {
        const access = await navigator.requestMIDIAccess();
        setMessage?.(`MIDI access granted \xB7 ${access.outputs.size} outputs.`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Request MIDI access"), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.serial, onClick: async () => {
      try {
        const port = await navigator.serial.requestPort();
        setMessage?.(`Serial device selected: ${port.getInfo ? JSON.stringify(port.getInfo()) : "ready"}`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Choose serial device"), /* @__PURE__ */ React.createElement("button", { disabled: !navigator.bluetooth, onClick: async () => {
      try {
        const d = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        setMessage?.(`Bluetooth device selected: ${d.name || d.id}`);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Choose Bluetooth device")), /* @__PURE__ */ React.createElement("div", { className: "lab-card" }, /* @__PURE__ */ React.createElement("h3", null, "Compatibility validation"), /* @__PURE__ */ React.createElement("p", null, "Legacy 19.2 kHz Light Control is validated in software for carrier frequency, envelope, duty cycle, phase, channel mapping and lossless export. Physical third-party decoder testing is not required for release."), /* @__PURE__ */ React.createElement("div", { className: "chips" }, /* @__PURE__ */ React.createElement("span", null, "Software signal validation"), /* @__PURE__ */ React.createElement("span", null, "Lossless reference export")))));
  }

  // src/storage/playlists.ts
  var DB3 = "mindaural";
  var STORE3 = "playlists";
  var VERSION3 = 3;
  function open3() {
    return new Promise((resolve, reject) => {
      const r = indexedDB.open(DB3, VERSION3);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains("projects")) r.result.createObjectStore("projects", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains("assets")) r.result.createObjectStore("assets", { keyPath: "id" });
        if (!r.result.objectStoreNames.contains(STORE3)) r.result.createObjectStore(STORE3, { keyPath: "id" });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  }
  function createPlaylist(title = "New playlist") {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    return { id: crypto.randomUUID(), title, items: [], createdAt: now, updatedAt: now };
  }
  async function savePlaylist(p) {
    const db = await open3(), row2 = { ...structuredClone(p), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE3, "readwrite");
      tx.objectStore(STORE3).put(row2);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return row2;
  }
  async function loadPlaylists() {
    const db = await open3(), rows = await new Promise((resolve, reject) => {
      const r = db.transaction(STORE3).objectStore(STORE3).getAll();
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    db.close();
    return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  async function deletePlaylist(id2) {
    const db = await open3();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE3, "readwrite");
      tx.objectStore(STORE3).delete(id2);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }
  async function addProjectToPlaylist(playlist, project) {
    const item = { id: crypto.randomUUID(), title: project.title, project: structuredClone(project) };
    return savePlaylist({ ...playlist, items: [...playlist.items, item] });
  }

  // src/ui/PlaylistPanel.tsx
  function PlaylistPanel({ current, onPlay, setMessage }) {
    const [lists, setLists] = React.useState([]), [title, setTitle] = React.useState("");
    const refresh = () => loadPlaylists().then(setLists);
    React.useEffect(() => {
      refresh();
    }, []);
    const create = async () => {
      const p = await savePlaylist(createPlaylist(title.trim() || "New playlist"));
      setTitle("");
      await refresh();
      setMessage?.(`Created playlist ${p.title}.`);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "playlist-panel" }, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Playlists"), /* @__PURE__ */ React.createElement("small", null, "Sequence complete session snapshots.")), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Playlist name", value: title, onChange: (e) => setTitle(e.target.value) }), /* @__PURE__ */ React.createElement("button", { onClick: create }, "Create"))), lists.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, /* @__PURE__ */ React.createElement("p", null, "No playlists yet.")) : lists.map((list) => /* @__PURE__ */ React.createElement("div", { className: "playlist-row", key: list.id }, /* @__PURE__ */ React.createElement("div", { className: "playlist-head" }, /* @__PURE__ */ React.createElement("input", { value: list.title, onChange: async (e) => {
      await savePlaylist({ ...list, title: e.target.value });
      await refresh();
    } }), /* @__PURE__ */ React.createElement("span", null, list.items.length, " sessions \xB7 ", Math.round(list.items.reduce((n, x) => n + x.project.duration, 0) / 60), " min"), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: !list.items.length, onClick: () => onPlay(list.items.map((x) => x.project)) }, "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      await addProjectToPlaylist(list, current);
      await refresh();
      setMessage?.(`Added ${current.title} to ${list.title}.`);
    } }, "+ Current"), /* @__PURE__ */ React.createElement("button", { className: "danger", onClick: async () => {
      if (confirm(`Delete playlist ${list.title}?`)) {
        await deletePlaylist(list.id);
        await refresh();
      }
    } }, "Delete"))), /* @__PURE__ */ React.createElement("div", { className: "playlist-items" }, list.items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: item.id }, /* @__PURE__ */ React.createElement("span", null, i + 1, ". ", item.title), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { disabled: i === 0, onClick: async () => {
      const items = list.items.slice();
      [items[i - 1], items[i]] = [items[i], items[i - 1]];
      await savePlaylist({ ...list, items });
      await refresh();
    } }, "\u2191"), /* @__PURE__ */ React.createElement("button", { disabled: i === list.items.length - 1, onClick: async () => {
      const items = list.items.slice();
      [items[i + 1], items[i]] = [items[i], items[i + 1]];
      await savePlaylist({ ...list, items });
      await refresh();
    } }, "\u2193"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      await savePlaylist({ ...list, items: list.items.filter((x) => x.id !== item.id) });
      await refresh();
    } }, "\xD7"))))))));
  }

  // src/ui/LibrarySurface.tsx
  var collections = ["all", "research", "curated", "community", "personal"];
  function row(p) {
    const v = p.project.voices[0];
    return { type: v?.type || "\u2014", ears: v ? `${v.leftHz.toFixed(2)} / ${v.rightHz.toFixed(2)} Hz` : "\u2014", beat: v ? Math.abs(v.rightHz - v.leftHz).toFixed(2) + " Hz" : "\u2014", duration: Math.round(p.duration / 60) + " min", voices: p.project.voices.length, automation: p.project.voices.reduce((n, v2) => n + v2.automation.length, 0), evidence: p.evidence.state, source: p.project.provenance.source || p.project.provenance.author };
  }
  function LibrarySurface({ saved, project, setProject, setSurface, setMessage, onPlayPlaylist }) {
    const [q, setQ] = React.useState(""), [collection, setCollection] = React.useState("all"), [evidence, setEvidence] = React.useState("all"), [compare, setCompare] = React.useState([]), [cloud, setCloud] = React.useState([]), [loading, setLoading] = React.useState(false), [selectedCloud, setSelectedCloud] = React.useState(null), [rating, setRating] = React.useState(5), [review, setReview] = React.useState(""), [rights, setRights] = React.useState(false), [publishDesc, setPublishDesc] = React.useState(project.description || "");
    const refreshCloud = async () => {
      if (!cloudConfigured()) {
        setMessage?.("Configure Supabase in Settings to load community sessions.");
        return;
      }
      setLoading(true);
      try {
        setCloud(await cloudFromStorage().listPublicPresets(100));
        setMessage?.("Community library refreshed.");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    React.useEffect(() => {
      if (cloudConfigured()) refreshCloud();
    }, []);
    const built = PRESETS.filter((p) => (collection === "all" || p.collection === collection) && (evidence === "all" || p.evidence.state === evidence) && `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
    const local = saved.map((p) => ({ id: `local-${p.id}`, title: p.title, collection: "personal", description: p.description, duration: p.duration, purpose: "Personal", evidence: p.evidence, tags: p.tags, project: p }));
    const visibleLocal = collection === "all" || collection === "personal" ? local.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(q.toLowerCase())) : [];
    const allMap = new Map([...PRESETS, ...local].map((p) => [p.id, p]));
    const comparePresets = compare.map((id2) => allMap.get(id2)).filter(Boolean);
    const toggleCompare = (id2) => setCompare((x) => x.includes(id2) ? x.filter((i) => i !== id2) : x.length < 2 ? [...x, id2] : [x[1], id2]);
    const open4 = (p, source) => {
      const next = structuredClone(p);
      if (source) {
        next.id = crypto.randomUUID();
        next.provenance = { ...next.provenance, source, lineage: [...next.provenance.lineage || [], source], createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        next.revision = 1;
      }
      setProject(next);
      setSurface("Studio");
    };
    const publish = async () => {
      try {
        const res = await cloudFromStorage().publishPreset(project, { title: project.title, description: publishDesc, evidenceLevel: project.evidence.state, rightsDeclared: rights });
        setMessage?.(`Published ${Array.isArray(res) ? res[0]?.title || project.title : project.title}.`);
        setRights(false);
        await refreshCloud();
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    const submitReview = async () => {
      if (!selectedCloud) return;
      try {
        await cloudFromStorage().review(selectedCloud.id, rating, review);
        setMessage?.("Review saved.");
        setReview("");
      } catch (e) {
        setMessage?.(e instanceof Error ? e.message : String(e));
      }
    };
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LIBRARY"), /* @__PURE__ */ React.createElement("h1", null, "Research, curated, community, and yours"), /* @__PURE__ */ React.createElement("div", { className: "library-toolbar" }, /* @__PURE__ */ React.createElement("input", { className: "search", placeholder: "Search title, tags, description", value: q, onChange: (e) => setQ(e.target.value) }), /* @__PURE__ */ React.createElement("select", { value: evidence, onChange: (e) => setEvidence(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "all" }, "All evidence"), Array.from(new Set(PRESETS.map((p) => p.evidence.state))).map((x) => /* @__PURE__ */ React.createElement("option", { key: x }, x))), /* @__PURE__ */ React.createElement("button", { onClick: refreshCloud, disabled: loading }, loading ? "Loading\u2026" : "Refresh community")), /* @__PURE__ */ React.createElement("div", { className: "tabs" }, collections.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: collection === c ? "active" : "", onClick: () => setCollection(c) }, c[0].toUpperCase() + c.slice(1)))), comparePresets.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "compare-panel" }, /* @__PURE__ */ React.createElement("div", { className: "compare-head" }, /* @__PURE__ */ React.createElement("h3", null, "Preset comparison"), /* @__PURE__ */ React.createElement("button", { onClick: () => setCompare([]) }, "Clear")), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Attribute"), comparePresets.map((p) => /* @__PURE__ */ React.createElement("th", { key: p.id }, p.title)))), /* @__PURE__ */ React.createElement("tbody", null, ["type", "ears", "beat", "duration", "voices", "automation", "evidence", "source"].map((k) => /* @__PURE__ */ React.createElement("tr", { key: k }, /* @__PURE__ */ React.createElement("th", null, k), comparePresets.map((p) => /* @__PURE__ */ React.createElement("td", { key: p.id }, String(row(p)[k]))))))), /* @__PURE__ */ React.createElement("small", null, "Select a preset and open it to copy individual tracks/envelopes in Studio. Opening a built-in/community item creates an editable local fork.")), visibleLocal.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "My Library"), /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, visibleLocal.map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "collection" }, "personal"), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description), /* @__PURE__ */ React.createElement("small", null, "Revision ", p.project.revision)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? "Compared \u2713" : "Compare"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(p.project) }, "Open")))))), (collection === "all" || collection === "research" || collection === "curated") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Built in \xB7 ", built.length), /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, built.map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "preset-meta" }, /* @__PURE__ */ React.createElement("span", { className: "collection" }, p.collection), /* @__PURE__ */ React.createElement("span", { className: "evidence-tag" }, p.evidence.state)), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description), /* @__PURE__ */ React.createElement("small", null, row(p).ears, " \xB7 \u0394 ", row(p).beat, " \xB7 ", row(p).duration)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggleCompare(p.id) }, compare.includes(p.id) ? "Compared \u2713" : "Compare"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(p.project, `builtin:${p.id}`) }, "Open fork")))))), (collection === "all" || collection === "community") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "section-head" }, /* @__PURE__ */ React.createElement("h2", null, "Community \xB7 ", cloud.length), /* @__PURE__ */ React.createElement("small", null, "Community claims are user-submitted and are not scientific validation.")), cloud.length ? /* @__PURE__ */ React.createElement("div", { className: "card-grid compact" }, cloud.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(q.toLowerCase())).map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "preset-meta" }, /* @__PURE__ */ React.createElement("span", { className: "collection" }, "community"), /* @__PURE__ */ React.createElement("span", { className: "evidence-tag" }, p.evidence_level || "community-claim")), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description)), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedCloud(p) }, "Review"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      try {
        await cloudFromStorage().favorite(p.id);
        setMessage?.("Added to favorites.");
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "\u2661 Favorite"), /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: () => open4(deserializeSession(p.session), `community:${p.id}`) }, "Open fork"))))) : /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, /* @__PURE__ */ React.createElement("b", null, cloudConfigured() ? "No community sessions returned." : "Cloud not configured."), /* @__PURE__ */ React.createElement("p", null, cloudConfigured() ? "Publish a session or refresh the library." : "Local and built-in libraries remain fully functional without an account."))), /* @__PURE__ */ React.createElement("div", { className: "publish-card" }, /* @__PURE__ */ React.createElement("h2", null, "Publish current session"), /* @__PURE__ */ React.createElement("p", null, "Publishing requires a verified account and a rights declaration. Imported commercial audio cannot be redistributed without permission."), /* @__PURE__ */ React.createElement("label", null, "Description", /* @__PURE__ */ React.createElement("textarea", { value: publishDesc, onChange: (e) => setPublishDesc(e.target.value) })), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: rights, onChange: (e) => setRights(e.target.checked) }), " I have redistribution rights for every embedded/public asset in this session."), /* @__PURE__ */ React.createElement("button", { className: "primary", disabled: !rights, onClick: publish }, "Publish to community")), /* @__PURE__ */ React.createElement(PlaylistPanel, { current: project, onPlay: onPlayPlaylist, setMessage }), selectedCloud && /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: () => setSelectedCloud(null) }, /* @__PURE__ */ React.createElement("div", { className: "modal-card", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("h3", null, "Review ", selectedCloud.title), /* @__PURE__ */ React.createElement("label", null, "Rating", /* @__PURE__ */ React.createElement("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)) }, [5, 4, 3, 2, 1].map((x) => /* @__PURE__ */ React.createElement("option", { key: x, value: x }, x, " / 5")))), /* @__PURE__ */ React.createElement("label", null, "Review", /* @__PURE__ */ React.createElement("textarea", { value: review, onChange: (e) => setReview(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary small", onClick: submitReview }, "Save review"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
      const why = prompt("Why are you reporting this preset?");
      if (!why) return;
      try {
        await cloudFromStorage().report("preset", selectedCloud.id, why);
        setMessage?.("Report submitted.");
        setSelectedCloud(null);
      } catch (e) {
        setMessage?.(String(e));
      }
    } }, "Report"), /* @__PURE__ */ React.createElement("button", { onClick: () => setSelectedCloud(null) }, "Close")))));
  }

  // src/ui/AnalyzerSurface.tsx
  function fmt2(n, d = 2) {
    return Number.isFinite(n) ? n.toFixed(d) : "\u2014";
  }
  function Metric({ label, value, detail }) {
    return /* @__PURE__ */ React.createElement("div", { className: "metric" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, value), detail && /* @__PURE__ */ React.createElement("small", null, detail));
  }
  function Spectrum({ spectrum }) {
    if (!spectrum) return null;
    const m = Array.from(spectrum.magnitudes), max = Math.max(...m, 1e-9), pts = m.map((v, i) => `${i / Math.max(1, m.length - 1) * 800},${145 - v / max * 135}`).join(" ");
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Spectrum"), /* @__PURE__ */ React.createElement("span", null, spectrum.backend)), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 150", preserveAspectRatio: "none", "aria-label": "Frequency spectrum" }, /* @__PURE__ */ React.createElement("polyline", { points: pts, fill: "none", stroke: "currentColor", strokeWidth: "2" })), /* @__PURE__ */ React.createElement("div", { className: "axis" }, /* @__PURE__ */ React.createElement("span", null, "0 Hz"), /* @__PURE__ */ React.createElement("span", null, Math.round(spectrum.frequencies.at(-1) || 0), " Hz")));
  }
  function Waveform2({ left, right }) {
    if (!left || !right) return null;
    const path = (a, offset) => a.map((v, i) => `${i ? "L" : "M"} ${i / Math.max(1, a.length - 1) * 800} ${offset - v * 50}`).join(" ");
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Waveform preview"), /* @__PURE__ */ React.createElement("span", null, "Left / Right")), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 800 160", preserveAspectRatio: "none", "aria-label": "Stereo waveform" }, /* @__PURE__ */ React.createElement("line", { x1: "0", x2: "800", y1: "50", y2: "50", stroke: "currentColor", opacity: ".15" }), /* @__PURE__ */ React.createElement("line", { x1: "0", x2: "800", y1: "115", y2: "115", stroke: "currentColor", opacity: ".15" }), /* @__PURE__ */ React.createElement("path", { d: path(left, 50), fill: "none", stroke: "currentColor", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("path", { d: path(right, 115), fill: "none", stroke: "currentColor", strokeWidth: "1.5", opacity: ".65" })));
  }
  function Spectrogram({ data }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const c = ref.current;
      if (!c || !data) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const w = data.frames, h = data.bins, img = ctx.createImageData(w, h), m = data.magnitudes;
      let max = 1e-12;
      for (const x of m) max = Math.max(max, x);
      for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
        const v = Math.max(0, Math.min(1, Math.log1p(m[x * h + y] / max * 80) / Math.log(81))), i = ((h - 1 - y) * w + x) * 4;
        img.data[i] = Math.round(40 + 210 * v);
        img.data[i + 1] = Math.round(60 + 120 * v);
        img.data[i + 2] = Math.round(120 + 90 * (1 - v));
        img.data[i + 3] = 255;
      }
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      off.getContext("2d").putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(off, 0, 0, c.width, c.height);
    }, [data]);
    return /* @__PURE__ */ React.createElement("div", { className: "viz-card" }, /* @__PURE__ */ React.createElement("div", { className: "viz-head" }, /* @__PURE__ */ React.createElement("b", null, "Spectrogram"), /* @__PURE__ */ React.createElement("span", null, data.backend, " \xB7 ", data.frames, " frames")), /* @__PURE__ */ React.createElement("canvas", { ref, width: "800", height: "240", "aria-label": "Spectrogram heatmap" }), /* @__PURE__ */ React.createElement("div", { className: "axis" }, /* @__PURE__ */ React.createElement("span", null, "0 s"), /* @__PURE__ */ React.createElement("span", null, fmt2(data.times?.at(-1) || 0, 2), " s")));
  }
  function AnalyzerSurface({ analysis, onAnalyze, gpuStatus }) {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "ANALYZER"), /* @__PURE__ */ React.createElement("h1", null, "Verify the signal, not the label"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Analyze the current project or drop a supported audio file anywhere while this page is open. Clean carrier pairs can be measured precisely; complex mixes are reported with candidates and confidence rather than false certainty."), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: onAnalyze }, "Analyze current session")), analysis && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "analysis-grid" }, /* @__PURE__ */ React.createElement(Metric, { label: "Left carrier", value: `${fmt2(analysis.dominantLeftHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Right carrier", value: `${fmt2(analysis.dominantRightHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Difference", value: `${fmt2(analysis.differenceHz)} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Stereo correlation", value: fmt2(analysis.correlation, 4) }), /* @__PURE__ */ React.createElement(Metric, { label: "Peak L / R", value: `${fmt2(analysis.peakLeft, 4)} / ${fmt2(analysis.peakRight, 4)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "RMS L / R", value: `${fmt2(analysis.rmsLeft, 4)} / ${fmt2(analysis.rmsRight, 4)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "DC L / R", value: `${fmt2(analysis.dcLeft, 5)} / ${fmt2(analysis.dcRight, 5)}` }), /* @__PURE__ */ React.createElement(Metric, { label: "Cross-channel leakage", value: `${fmt2(analysis.leakageDb, 1)} dB` }), /* @__PURE__ */ React.createElement(Metric, { label: "Sample rate", value: `${analysis.sampleRate} Hz` }), /* @__PURE__ */ React.createElement(Metric, { label: "Duration", value: `${fmt2(analysis.duration, 3)} s` }), /* @__PURE__ */ React.createElement(Metric, { label: "Compute", value: analysis.backend }), /* @__PURE__ */ React.createElement(Metric, { label: "Confidence", value: `${Math.round(analysis.confidence * 100)}%` })), /* @__PURE__ */ React.createElement("div", { className: `integrity-card ${analysis.integrity?.pass ? "pass-card" : analysis.integrity ? "fail-card" : ""}` }, /* @__PURE__ */ React.createElement("h3", null, analysis.classification), /* @__PURE__ */ React.createElement("p", null, analysis.integrity ? analysis.integrity.pass ? "Scientific integrity comparison passed for the current manifest." : "Manifest comparison found discrepancies." : "No source manifest comparison was available for this imported file."), analysis.integrity?.issues?.length > 0 && /* @__PURE__ */ React.createElement("ul", null, analysis.integrity.issues.map((x) => /* @__PURE__ */ React.createElement("li", { key: x }, x))), analysis.integrityIssues?.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("b", null, "Signal diagnostics"), /* @__PURE__ */ React.createElement("ul", null, analysis.integrityIssues.map((x) => /* @__PURE__ */ React.createElement("li", { key: x }, x))))), /* @__PURE__ */ React.createElement(Waveform2, { left: analysis.waveformLeft, right: analysis.waveformRight }), /* @__PURE__ */ React.createElement(Spectrum, { spectrum: analysis.spectrum }), /* @__PURE__ */ React.createElement(Spectrogram, { data: analysis.spectrogram }), analysis.candidates?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "candidate-card" }, /* @__PURE__ */ React.createElement("h3", null, "Carrier-pair candidates"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Left"), /* @__PURE__ */ React.createElement("th", null, "Right"), /* @__PURE__ */ React.createElement("th", null, "Difference"), /* @__PURE__ */ React.createElement("th", null, "Relative score"))), /* @__PURE__ */ React.createElement("tbody", null, analysis.candidates.map((c, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, fmt2(c.leftHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.rightHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.differenceHz), " Hz"), /* @__PURE__ */ React.createElement("td", null, fmt2(c.score, 5)))))))), /* @__PURE__ */ React.createElement("div", { className: "technical" }, /* @__PURE__ */ React.createElement("b", null, "Compute status"), /* @__PURE__ */ React.createElement("span", null, gpuStatus.active ? "WebGPU active" : "CPU reference fallback", gpuStatus.adapterName ? ` \xB7 ${gpuStatus.adapterName}` : "", gpuStatus.reason ? ` \xB7 ${gpuStatus.reason}` : ""), gpuStatus.limits && /* @__PURE__ */ React.createElement("small", null, Object.entries(gpuStatus.limits).map(([k, v]) => `${k}=${v}`).join(" \xB7 "))));
  }

  // src/ui/App.tsx
  var engine = new LiveEngine();
  var gpu = new WebGpuAnalyzer();
  function download2(name, data, type = "application/octet-stream") {
    const blob = data instanceof Blob ? data : new Blob([data], { type }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  function fmt3(n, d = 1) {
    return Number.isFinite(n) ? n.toFixed(d) : "\u2014";
  }
  function evidenceClass(s) {
    return s.toLowerCase().replace(/\s+/g, "-");
  }
  async function loadProjectAssets(p) {
    const pcm = {}, bytes = {};
    for (const a of p.assets) {
      const b = await loadAssetBytes(a.id);
      if (!b) continue;
      bytes[a.id] = b;
      try {
        pcm[a.id] = await decodeAudioBytes(b, a.name, a.mime);
      } catch {
      }
    }
    return { pcm, bytes };
  }
  async function consumeShareTarget(handle) {
    const q = new URLSearchParams(location.search), token = q.get("share_token"), count = Number(q.get("share_count") || 0);
    if (!token || !count) return;
    const files = [];
    for (let i = 0; i < count; i++) {
      const r = await fetch(`./__share_inbox__/${token}/${i}`);
      if (!r.ok) continue;
      const name = decodeURIComponent(r.headers.get("x-bbs-filename") || `shared-${i}`), blob = await r.blob();
      files.push(new File([blob], name, { type: blob.type }));
    }
    if (files.length) await handle(files);
    history.replaceState(null, "", location.pathname);
  }
  function App() {
    const [surface, setSurface] = React.useState("Create");
    const [project, setProjectRaw] = React.useState(() => createDefaultProject("My binaural session"));
    const historyRef = React.useRef(null);
    if (!historyRef.current) historyRef.current = new History(project, 120);
    const setProject = (value) => setProjectRaw((prev) => historyRef.current.push(typeof value === "function" ? value(prev) : value));
    const replaceProject = (next) => {
      historyRef.current.replace(next);
      setProjectRaw(structuredClone(next));
    };
    const undo = () => {
      const x = historyRef.current.undo();
      if (x) setProjectRaw(x);
    };
    const redo = () => {
      const x = historyRef.current.redo();
      if (x) setProjectRaw(x);
    };
    const [playing, setPlaying] = React.useState(false);
    const [analysis, setAnalysis] = React.useState(null);
    const [gpuStatus, setGpuStatus] = React.useState({ active: false, reason: "Not checked" });
    const [saved, setSaved] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const fileRef = React.useRef(null);
    const playlistRunRef = React.useRef(0);
    React.useEffect(() => {
      loadProjects().then(setSaved).catch(() => {
      });
      gpu.init().then(setGpuStatus);
      const theme = localStorage.getItem("bbs.theme") || "system";
      document.documentElement.dataset.theme = theme;
      if ("serviceWorker" in navigator) navigator.serviceWorker.register("./public/service-worker.js").then(() => consumeShareTarget(handleFiles).catch((e) => setMessage(`Shared-file import: ${e instanceof Error ? e.message : e}`))).catch(() => {
      });
    }, []);
    React.useEffect(() => {
      const key = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          e.shiftKey ? redo() : undo();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          e.preventDefault();
          redo();
        }
      };
      addEventListener("keydown", key);
      return () => removeEventListener("keydown", key);
    }, []);
    const voice = project.voices[0];
    const updateVoice = (patch) => setProject((p) => touchProject({ ...p, voices: [{ ...p.voices[0], ...patch }, ...p.voices.slice(1)] }));
    const changeCenter = (c, b = beatOf(voice)) => setProject((p) => touchProject({ ...p, voices: [setCenterBeat(p.voices[0], c, b), ...p.voices.slice(1)] }));
    const changeBeat = (b, c = carrierOf(voice)) => changeCenter(c, b);
    async function toggle() {
      try {
        playlistRunRef.current++;
        if (playing) {
          engine.stop();
          setPlaying(false);
        } else {
          const loaded = await loadProjectAssets(project);
          await engine.start(project, 0, () => setPlaying(false), loaded.pcm);
          setPlaying(true);
          setMessage(`Live at ${engine.sampleRate || "device"} Hz`);
        }
      } catch (e) {
        setMessage(`Audio: ${e instanceof Error ? e.message : e}`);
      }
    }
    async function playPlaylist(projects) {
      if (!projects.length) return;
      engine.stop();
      const run = ++playlistRunRef.current;
      setPlaying(true);
      const playAt = async (index) => {
        if (run !== playlistRunRef.current) return;
        if (index >= projects.length) {
          setPlaying(false);
          setMessage("Playlist complete.");
          return;
        }
        const p = projects[index], loaded = await loadProjectAssets(p);
        setMessage(`Playlist ${index + 1}/${projects.length} \xB7 ${p.title}`);
        await engine.start(p, 0, () => {
          void playAt(index + 1);
        }, loaded.pcm);
      };
      try {
        await playAt(0);
      } catch (e) {
        if (run === playlistRunRef.current) {
          setPlaying(false);
          setMessage(e instanceof Error ? e.message : String(e));
        }
      }
    }
    async function save() {
      await saveProject(project);
      setSaved(await loadProjects());
      setMessage("Saved locally.");
    }
    async function analyze() {
      setMessage("Rendering analysis window\u2026");
      await new Promise((r) => setTimeout(r, 0));
      const loaded = await loadProjectAssets(project), p = { ...project, duration: Math.min(project.duration, 4), voices: project.voices.map((v) => ({ ...v, duration: Math.min(v.duration, 4) })), segments: project.segments.map((s) => ({ ...s, duration: Math.min(s.duration, 4) })) };
      const b = renderProject(p, { duration: Math.min(4, p.duration), assets: loaded.pcm });
      const a = analyzeStereo(b);
      a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256);
      a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4)));
      a.backend = a.spectrum.backend;
      a.integrity = compareAgainstProject(b, p);
      const dec = Math.max(1, Math.floor(b.left.length / 500));
      a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500));
      a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500));
      setGpuStatus(gpu.getStatus());
      setAnalysis(a);
      setMessage(`Analysis complete using ${a.backend}.`);
    }
    async function exportAudio(kind, opts = {}) {
      setMessage("Preparing export\u2026");
      await new Promise((r) => setTimeout(r, 0));
      try {
        const loaded = await loadProjectAssets(project);
        if (kind === "bbeat" || kind === "bbeat-signed") {
          const s = kind === "bbeat-signed" ? signer() : void 0;
          if (kind === "bbeat-signed" && !s) throw new Error("Unlock or create a signing key in Settings first.");
          download2(`${project.title}${kind === "bbeat-signed" ? "-signed" : ""}.bbeat`, await exportProjectPackage(project, loaded.bytes, s), "application/x-bbeat+zip");
          setMessage(kind === "bbeat-signed" ? "Signed self-contained project package exported." : "Self-contained project package exported.");
          return;
        }
        if (kind === "bwg") {
          const x = exportBwg(project);
          if (!x.bytes) throw new Error(`BWG lossless export refused: ${x.report.unsupported.join(", ")}`);
          download2(`${project.title}.bwg`, x.bytes);
          setMessage("BWG-compatible subset exported.");
          return;
        }
        if (kind === "recipe") {
          download2(`${project.title}-recipe.json`, new TextEncoder().encode(recipeJson(project)), "application/json");
          setMessage("Recipe JSON exported.");
          return;
        }
        if (kind === "manifest") {
          download2(`${project.title}-stimulus-manifest.json`, new TextEncoder().encode(researchManifestJson(project)), "application/json");
          setMessage("Stimulus manifest exported.");
          return;
        }
        if (kind === "stems") {
          download2(`${project.title}-stems.zip`, createStemBundle(project, loaded.pcm), "application/zip");
          setMessage("Per-track WAV stems exported.");
          return;
        }
        if (kind === "diagnostic") {
          const d = createDiagnosticChannels(project, loaded.pcm);
          download2(`${project.title}-left.wav`, d.left, "audio/wav");
          download2(`${project.title}-right.wav`, d.right, "audio/wav");
          setMessage("Left/right diagnostic WAVs exported.");
          return;
        }
        if (kind === "wav-stimulus" || kind === "wav-background" || kind === "wav-selection") {
          const scope = kind === "wav-stimulus" ? "stimulus" : kind === "wav-background" ? "background" : "full", b = renderScope(project, loaded.pcm, scope, Number(opts.start) || 0, opts.duration == null ? void 0 : Number(opts.duration));
          download2(`${project.title}-${kind.replace("wav-", "")}.wav`, encodeWav(b, 24), "audio/wav");
          setMessage(`${kind.replace("wav-", "")} WAV export complete.`);
          return;
        }
        const progress = (x) => setMessage(`Rendering ${kind.toUpperCase()} \xB7 ${Math.round(x * 100)}%`);
        if (kind === "flac") {
          const b = renderProject(project, { assets: loaded.pcm });
          progress(1);
          download2(`${project.title}.flac`, encodeFlac(b, 24), "audio/flac");
          setMessage("FLAC export complete.");
          return;
        }
        if (kind === "ogg-opus" || kind === "webm-opus") {
          const b = renderProject(project, { assets: loaded.pcm });
          const bytes = kind === "ogg-opus" ? await encodeOggOpus(b) : await encodeWebmOpus(b);
          download2(`${project.title}.${kind === "ogg-opus" ? "opus" : "webm"}`, bytes, kind === "ogg-opus" ? "audio/ogg; codecs=opus" : "audio/webm; codecs=opus");
          setMessage(`${kind === "ogg-opus" ? "Ogg Opus" : "WebM Opus"} export complete.`);
          return;
        }
        const blob = kind === "wav" ? renderWavBlob(project, 24, loaded.pcm, 5, progress) : renderAiffBlob(project, 24, loaded.pcm, 5, progress);
        download2(`${project.title}.${kind}`, blob);
        setMessage(`${kind.toUpperCase()} export complete.`);
      } catch (e) {
        setMessage(e instanceof Error ? e.message : String(e));
      }
    }
    async function importAudioFile(f, bytes) {
      if (!allowedAudioName(f.name)) throw new Error("Unsupported audio type");
      const decoded = await decodeAudioBytes(bytes, f.name, f.type), hash2 = await sha256(bytes), id2 = `asset-${hash2.slice(0, 20)}`;
      await saveAssetBytes(id2, bytes, f.type || "application/octet-stream", f.name);
      setProject((p) => {
        const asset = p.assets.some((a) => a.id === id2) ? p.assets : [...p.assets, { id: id2, name: f.name, mime: f.type || "application/octet-stream", size: bytes.length, hash: hash2, license: "user-owned", source: "local import" }];
        const track = { id: uid("audio"), name: f.name, assetId: id2, start: 0, duration: decoded.duration, offset: 0, amplitude: 0.65, pan: 0, loop: false, fadeIn: 0.05, fadeOut: 0.05, mute: false, solo: false };
        return touchProject({ ...p, assets: asset, audioTracks: [...p.audioTracks, track] });
      });
      setSurface("Studio");
      setMessage(`Imported ${f.name} as a timeline audio track.`);
    }
    async function handleFiles(files) {
      for (const f of Array.from(files)) {
        try {
          const bytes = new Uint8Array(await f.arrayBuffer());
          if (f.name.toLowerCase().endsWith(".bbeat")) {
            const x = await importProjectPackageDetailed(bytes);
            for (const a of x.project.assets) if (x.assets[a.id]) await saveAssetBytes(a.id, x.assets[a.id], a.mime, a.name);
            replaceProject(x.project);
            setSurface("Studio");
            setMessage(`Project imported and ${Object.keys(x.assets).length} embedded assets verified.`);
          } else if (f.name.toLowerCase().endsWith(".bwg")) {
            const x = importBwg(bytes);
            replaceProject(x.project);
            setSurface("Studio");
            setMessage(x.report.unsupported.length ? `Imported with compatibility warnings: ${x.report.unsupported.join("; ")}` : "BWG preset imported.");
          } else if (allowedAudioName(f.name)) {
            if (surface === "Analyzer") {
              const b = await decodeAudioBytes(bytes, f.name, f.type), a = analyzeStereo(b);
              a.spectrum = await gpu.spectrum(b.left, b.sampleRate, 256);
              a.spectrogram = await gpu.spectrogram(b.left, b.sampleRate, 96, Math.min(2048, b.left.length), Math.max(128, Math.floor(Math.min(2048, b.left.length) / 4)));
              a.backend = a.spectrum.backend;
              const dec = Math.max(1, Math.floor(b.left.length / 500));
              a.waveformLeft = Array.from(b.left.filter((_, i) => i % dec === 0).slice(0, 500));
              a.waveformRight = Array.from(b.right.filter((_, i) => i % dec === 0).slice(0, 500));
              setAnalysis(a);
              setMessage(`Analyzed ${f.name}.`);
            } else await importAudioFile(f, bytes);
          } else throw new Error("Unsupported file. AAC/M4A is intentionally excluded.");
        } catch (e) {
          setMessage(`${f.name}: ${e instanceof Error ? e.message : e}`);
        }
      }
    }
    function addSoundscape(id2) {
      const def = SOUNDSCAPES.find((x) => x.id === id2);
      if (!def) return;
      setProject((p) => touchProject({ ...p, noiseTracks: [...p.noiseTracks, ...def.layers.map((l, i) => ({ id: uid("noise"), name: `${def.title} ${i + 1}`, kind: l.kind, amplitude: l.amplitude, slopeDbOct: l.slopeDbOct, lowpass: l.lowpass, highpass: l.highpass, stereoCorrelation: l.stereoCorrelation, start: 0, duration: p.duration, loop: true, mute: false, solo: false }))] }));
      setMessage(`${def.title} added as procedural background.`);
    }
    const nav = ["Listen", "Create", "Studio", "Library", "Analyzer", "Research", "Learn", "Labs", "Settings"];
    return /* @__PURE__ */ React.createElement("div", { className: "app", onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }, onDrop: (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    } }, /* @__PURE__ */ React.createElement("a", { className: "skip-link", href: "#main-content" }, "Skip to editor"), /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", { className: "brand" }, /* @__PURE__ */ React.createElement("div", { className: "mark" }, "\u223F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "Mindaural"), /* @__PURE__ */ React.createElement("span", null, "Scientific audio workstation"))), /* @__PURE__ */ React.createElement("button", { className: "import", onClick: () => fileRef.current?.click() }, "Import"), /* @__PURE__ */ React.createElement("input", { ref: fileRef, hidden: true, type: "file", multiple: true, accept: ".bbeat,.bwg,.wav,.flac,.mp3,.aiff,.ogg,.opus,.webm", onChange: (e) => e.target.files && handleFiles(e.target.files) })), /* @__PURE__ */ React.createElement("aside", null, nav.map((n) => /* @__PURE__ */ React.createElement("button", { key: n, className: surface === n ? "active" : "", onClick: () => setSurface(n) }, /* @__PURE__ */ React.createElement("span", null, icon(n)), n)), /* @__PURE__ */ React.createElement("div", { className: "status" }, /* @__PURE__ */ React.createElement("i", { className: gpuStatus.active ? "ok" : "" }), /* @__PURE__ */ React.createElement("span", null, gpuStatus.active ? "WebGPU active" : "CPU fallback"))), /* @__PURE__ */ React.createElement("main", { id: "main-content", tabIndex: -1 }, surface === "Create" && /* @__PURE__ */ React.createElement(Create, { project, voice, setProject, changeCenter, changeBeat, updateVoice, onPlay: toggle, playing, onSave: save, onStudio: () => setSurface("Studio"), onSoundscape: addSoundscape }), " ", surface === "Studio" && /* @__PURE__ */ React.createElement(Studio, { project, setProject, updateVoice, onPlay: toggle, playing, onSave: save, onExport: exportAudio, onUndo: undo, onRedo: redo, canUndo: historyRef.current.canUndo(), canRedo: historyRef.current.canRedo() }), " ", surface === "Listen" && /* @__PURE__ */ React.createElement(Listen, { setProject, setSurface }), " ", surface === "Library" && /* @__PURE__ */ React.createElement(LibrarySurface, { saved, project, setProject, setSurface, setMessage, onPlayPlaylist: playPlaylist }), " ", surface === "Analyzer" && /* @__PURE__ */ React.createElement(AnalyzerSurface, { analysis, onAnalyze: analyze, gpuStatus }), " ", surface === "Research" && /* @__PURE__ */ React.createElement(Research, { project, setMessage }), " ", surface === "Learn" && /* @__PURE__ */ React.createElement(Learn, null), " ", surface === "Labs" && /* @__PURE__ */ React.createElement(LabsSurface, { setMessage }), " ", surface === "Settings" && /* @__PURE__ */ React.createElement(SettingsSurface, { setMessage })), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("span", null, message || "Drop .bbeat, .bwg, or audio files anywhere to import."), /* @__PURE__ */ React.createElement("span", null, fmt3(voice.leftHz), " / ", fmt3(voice.rightHz), " Hz \xB7 \u0394 ", fmt3(beatOf(voice)), " Hz")));
  }
  function icon(n) {
    return { Listen: "\u25B6", Create: "\uFF0B", Studio: "\u224B", Library: "\u25A6", Analyzer: "\u2301", Research: "\u2299", Learn: "?", Labs: "\u25C7", Settings: "\u2699" }[n];
  }
  function Create({ project, voice, setProject, changeCenter, changeBeat, updateVoice, onPlay, playing, onSave, onStudio, onSoundscape }) {
    const [advanced, setAdvanced] = React.useState(false);
    const exact = (side, v) => updateVoice({ [side]: Math.max(1e-3, v) });
    return /* @__PURE__ */ React.createElement("section", { className: "page create" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "CREATE"), /* @__PURE__ */ React.createElement("h1", null, "Build a precise stereo session"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Choose the acoustic stimulus you want. Goal labels describe intent, not guaranteed physiological outcomes."), /* @__PURE__ */ React.createElement("div", { className: "creator-card" }, /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Stimulus"), /* @__PURE__ */ React.createElement("select", { value: voice.type, onChange: (e) => updateVoice({ type: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "binaural" }, "Binaural beat"), /* @__PURE__ */ React.createElement("option", { value: "monaural" }, "Monaural beat"), /* @__PURE__ */ React.createElement("option", { value: "isochronic" }, "Isochronic tone"), /* @__PURE__ */ React.createElement("option", { value: "am" }, "Amplitude modulated"), /* @__PURE__ */ React.createElement("option", { value: "stereo" }, "Independent stereo carriers"), /* @__PURE__ */ React.createElement("option", { value: "noise-modulated" }, "Noise-modulated carrier"), /* @__PURE__ */ React.createElement("option", { value: "sham" }, "Sham / control"))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Duration ", /* @__PURE__ */ React.createElement("b", null, Math.round(project.duration / 60), " min")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "1", max: "120", value: project.duration / 60, onChange: (e) => {
      const d = Number(e.target.value) * 60;
      setProject((p) => touchProject({ ...p, duration: d, voices: p.voices.map((v, i) => i ? v : { ...v, duration: d }), noiseTracks: p.noiseTracks.map((n) => ({ ...n, duration: Math.max(n.duration, d) })), segments: p.segments.map((s, i) => i ? s : { ...s, duration: d }) }));
    } })), /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Center carrier", value: carrierOf(voice), suffix: "Hz", onChange: changeCenter }), /* @__PURE__ */ React.createElement(NumberField, { label: "Beat difference", value: beatOf(voice), suffix: "Hz", onChange: changeBeat })), /* @__PURE__ */ React.createElement("div", { className: "ears" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "LEFT EAR"), /* @__PURE__ */ React.createElement("strong", null, fmt3(voice.leftHz, 2), " Hz")), /* @__PURE__ */ React.createElement("div", { className: "delta" }, "\u0394 ", fmt3(beatOf(voice), 2), " Hz"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "RIGHT EAR"), /* @__PURE__ */ React.createElement("strong", null, fmt3(voice.rightHz, 2), " Hz"))), /* @__PURE__ */ React.createElement("button", { className: "text-button", "aria-expanded": advanced, onClick: () => setAdvanced(!advanced) }, advanced ? "Hide advanced" : "Advanced exact controls"), advanced && /* @__PURE__ */ React.createElement("div", { className: "advanced-create" }, /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Exact left ear", value: voice.leftHz, suffix: "Hz", onChange: (v) => exact("leftHz", v) }), /* @__PURE__ */ React.createElement(NumberField, { label: "Exact right ear", value: voice.rightHz, suffix: "Hz", onChange: (v) => exact("rightHz", v) })), /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement(NumberField, { label: "Fade in", value: voice.fadeIn, suffix: "s", onChange: (v) => updateVoice({ fadeIn: Math.max(0, v) }) }), /* @__PURE__ */ React.createElement(NumberField, { label: "Fade out", value: voice.fadeOut, suffix: "s", onChange: (v) => updateVoice({ fadeOut: Math.max(0, v) }) })), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Waveform"), /* @__PURE__ */ React.createElement("select", { value: voice.waveform, onChange: (e) => updateVoice({ waveform: e.target.value }) }, ["sine", "sine2", "triangle", "square", "smooth-square", "saw", "reverse-saw", "pulse", "bandlimited-square", "bandlimited-saw", "custom-harmonic"].map((x) => /* @__PURE__ */ React.createElement("option", { key: x, value: x }, x)))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Duty / modulation depth ", /* @__PURE__ */ React.createElement("b", null, Math.round(voice.duty * 100), "%")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0.01", max: "0.99", step: "0.01", value: voice.duty, onChange: (e) => updateVoice({ duty: Number(e.target.value) }) }))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Soundscape"), /* @__PURE__ */ React.createElement("select", { defaultValue: "", onChange: (e) => {
      if (e.target.value) onSoundscape(e.target.value);
      e.target.value = "";
    } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Add optional background\u2026"), SOUNDSCAPES.map((s) => /* @__PURE__ */ React.createElement("option", { value: s.id, key: s.id }, s.title)))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", null, "Level ", /* @__PURE__ */ React.createElement("b", null, Math.round(voice.amplitude * 100), "%")), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "0.4", step: "0.005", value: voice.amplitude, onChange: (e) => updateVoice({ amplitude: Number(e.target.value) }) })), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: onPlay }, playing ? "\u25A0 Stop" : "\u25B6 Play"), /* @__PURE__ */ React.createElement("button", { onClick: onSave }, "Save"), /* @__PURE__ */ React.createElement("button", { onClick: onStudio }, "Open in Studio"))), /* @__PURE__ */ React.createElement(EvidenceCard, { state: project.evidence.state, claim: project.evidence.claim }));
  }
  function NumberField({ label, value, suffix, onChange }) {
    return /* @__PURE__ */ React.createElement("div", { className: "number-field" }, /* @__PURE__ */ React.createElement("label", null, label), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "0.01", value: Number(value.toFixed(3)), onChange: (e) => onChange(Number(e.target.value)) }), /* @__PURE__ */ React.createElement("span", null, suffix)));
  }
  function EvidenceCard({ state, claim }) {
    return /* @__PURE__ */ React.createElement("div", { className: "evidence" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${evidenceClass(state)}` }, state), /* @__PURE__ */ React.createElement("p", null, claim));
  }
  function Studio(props) {
    return /* @__PURE__ */ React.createElement(StudioSurface, { ...props });
  }
  function Listen({ setProject, setSurface }) {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LISTEN"), /* @__PURE__ */ React.createElement("h1", null, "Start with a transparent preset"), /* @__PURE__ */ React.createElement("div", { className: "card-grid" }, PRESETS.slice(0, 12).map((p) => /* @__PURE__ */ React.createElement("article", { className: "preset", key: p.id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: `badge ${evidenceClass(p.evidence.state)}` }, p.evidence.state), /* @__PURE__ */ React.createElement("h3", null, p.title), /* @__PURE__ */ React.createElement("p", null, p.description)), /* @__PURE__ */ React.createElement("div", { className: "preset-foot" }, /* @__PURE__ */ React.createElement("span", null, Math.round(p.duration / 60), " min \xB7 ", fmt3(Math.abs(p.project.voices[0].rightHz - p.project.voices[0].leftHz)), " Hz"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setProject(structuredClone(p.project));
      setSurface("Create");
    } }, "Use"))))));
  }
  function Research({ project, setMessage }) {
    const [run, setRun] = React.useState(() => createResearchRun(project));
    const [reveal, setReveal] = React.useState(false);
    const [rt, setRt] = React.useState("idle");
    const goAt = React.useRef(0);
    const startReaction = () => {
      if (rt !== "idle") return;
      setRt("waiting");
      setRun((r) => logEvent(r, "reaction-wait"));
      setTimeout(() => {
        goAt.current = performance.now();
        setRt("go");
      }, 800 + Math.random() * 1700);
    };
    const hit = () => {
      if (rt === "waiting") {
        setRun((r) => logEvent(r, "reaction-early"));
        setRt("idle");
        return;
      }
      if (rt === "go") {
        const ms = Math.round(performance.now() - goAt.current);
        setRun((r) => logEvent({ ...r, reactionTimesMs: [...r.reactionTimesMs, ms] }, "reaction", { ms }));
        setRt("idle");
      }
    };
    const addB = () => setRun((r) => {
      const c = makeCondition("B", project), conditions = [...r.conditions.filter((x) => x.role !== "B"), c];
      return { ...r, conditions, order: randomize(conditions.map((x) => x.id)) };
    });
    const dl = (name, text, type) => download2(name, new Blob([text], { type }));
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "RESEARCH"), /* @__PURE__ */ React.createElement("h1", null, "Build blinded A/B/control sessions"), /* @__PURE__ */ React.createElement("p", { className: "lede" }, "Exploratory protocol tooling. Participant responses remain local/export-only by default; this is not a clinical measurement system."), /* @__PURE__ */ React.createElement("div", { className: "research-toolbar" }, /* @__PURE__ */ React.createElement("button", { onClick: addB }, "Use current project as B"), /* @__PURE__ */ React.createElement("button", { onClick: () => setRun((r) => ({ ...r, order: randomize(r.conditions.map((x) => x.id)) })) }, "Randomize order"), /* @__PURE__ */ React.createElement("button", { onClick: () => setReveal(!reveal) }, reveal ? "Hide roles" : "Reveal roles")), /* @__PURE__ */ React.createElement("div", { className: "condition-grid" }, run.order.map((id2, index) => {
      const c = run.conditions.find((x) => x.id === id2);
      return /* @__PURE__ */ React.createElement("article", { className: "condition", key: id2 }, /* @__PURE__ */ React.createElement("span", null, "Condition ", index + 1), /* @__PURE__ */ React.createElement("strong", null, c.blindLabel), /* @__PURE__ */ React.createElement("p", null, reveal ? `${c.role.toUpperCase()} \xB7 ${c.project.title}` : "Blinded condition"), /* @__PURE__ */ React.createElement("button", { onClick: async () => {
        const loaded = await loadProjectAssets(c.project);
        await engine.start(c.project, 0, void 0, loaded.pcm);
        setRun((r) => logEvent(r, "condition-play", { conditionId: id2, blindLabel: c.blindLabel }));
        setMessage(`Playing blinded condition ${c.blindLabel}`);
      } }, "\u25B6 Play"));
    })), /* @__PURE__ */ React.createElement("div", { className: "research-form" }, /* @__PURE__ */ React.createElement("label", null, "Pre-session neutral rating ", /* @__PURE__ */ React.createElement("b", null, run.preRating), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "100", value: run.preRating, onChange: (e) => setRun((r) => ({ ...r, preRating: Number(e.target.value) })) })), /* @__PURE__ */ React.createElement("label", null, "Post-session neutral rating ", /* @__PURE__ */ React.createElement("b", null, run.postRating), /* @__PURE__ */ React.createElement("input", { type: "range", min: "0", max: "100", value: run.postRating, onChange: (e) => setRun((r) => ({ ...r, postRating: Number(e.target.value) })) })), /* @__PURE__ */ React.createElement("label", null, "Notes", /* @__PURE__ */ React.createElement("textarea", { value: run.notes, onChange: (e) => setRun((r) => ({ ...r, notes: e.target.value })) }))), /* @__PURE__ */ React.createElement("div", { className: "reaction-card" }, /* @__PURE__ */ React.createElement("h3", null, "Reaction-time task"), /* @__PURE__ */ React.createElement("p", null, "Optional simple behavioral hook. Run several trials under the same protocol."), /* @__PURE__ */ React.createElement("button", { className: rt === "go" ? "primary reaction-go" : "", onClick: rt === "idle" ? startReaction : hit }, rt === "idle" ? "Start trial" : rt === "waiting" ? "Wait\u2026" : "CLICK"), /* @__PURE__ */ React.createElement("span", null, run.reactionTimesMs.length ? `Last: ${run.reactionTimesMs.at(-1)} ms \xB7 n=${run.reactionTimesMs.length}` : "No trials yet")), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("button", { onClick: () => dl(`research-${run.id}.json`, exportResearchJson(run), "application/json") }, "Export JSON + stimulus manifests"), /* @__PURE__ */ React.createElement("button", { onClick: () => dl(`research-${run.id}.csv`, exportResearchCsv(run), "text/csv") }, "Export CSV")));
  }
  function Learn() {
    return /* @__PURE__ */ React.createElement("section", { className: "page" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "LEARN"), /* @__PURE__ */ React.createElement("h1", null, "What binaural beats actually are"), /* @__PURE__ */ React.createElement("div", { className: "learn-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "1. Acoustic setup"), /* @__PURE__ */ React.createElement("p", null, "Two separate tones are delivered to the ears. A 395 Hz left tone and 405 Hz right tone have a 10 Hz frequency difference. The application does not inject a 10 Hz audible tone into either channel.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "2. Perception"), /* @__PURE__ */ React.createElement("p", null, "The binaural beat is an auditory percept arising from binaural processing. Separate channels are therefore part of the stimulus definition.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "3. Neural response"), /* @__PURE__ */ React.createElement("p", null, "Frequency-following neural responses have been observed under some protocols, but results vary with stimulus parameters and methodology.")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("h3", null, "4. Outcomes"), /* @__PURE__ */ React.createElement("p", null, "Relaxation, attention, sleep, pain, anxiety, and memory findings are heterogeneous. The app labels evidence rather than promising a mental state from a frequency."))), /* @__PURE__ */ React.createElement("div", { className: "citation-box" }, /* @__PURE__ */ React.createElement("b", null, "Research rule"), /* @__PURE__ */ React.createElement("p", null, "Research presets preserve the actual published left/right frequencies, timing, masking, and control conditions when those details are available.")));
  }

  // src/main.tsx
  var element = /* @__PURE__ */ React.createElement(App, null);
  if (typeof ReactDOM.createRoot === "function") {
    ReactDOM.createRoot(document.getElementById("root")).render(element);
  } else {
    ReactDOM.render(element, document.getElementById("root"));
  }
  document.documentElement.dataset.appReady = "true";
})();

