(() => {
  "use strict";
  let e = !1;
  function t(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function s(e = {}, i = {}) {
    Object.keys(i).forEach((n) => {
      void 0 === e[n]
        ? (e[n] = i[n])
        : t(i[n]) && t(e[n]) && Object.keys(i[n]).length > 0 && s(e[n], i[n]);
    });
  }
  setTimeout(() => {
    if (e) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const i = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function n() {
    const e = "undefined" != typeof document ? document : {};
    return s(e, i), e;
  }
  const a = {
    document: i,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = "undefined" != typeof window ? window : {};
    return s(e, a), e;
  }
  class l extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function o(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...o(e)) : t.push(e);
      }),
      t
    );
  }
  function d(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function c(e, t) {
    const s = r(),
      i = n();
    let a = [];
    if (!t && e instanceof l) return e;
    if (!e) return new l(a);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          a.push(t.childNodes[e]);
      } else
        a = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) s.push(i[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) a.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof l) return e;
      a = e;
    }
    return new l(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(a)
    );
  }
  c.fn = l.prototype;
  const p = "resize scroll".split(" ");
  function u(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          p.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : c(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  u("click"),
    u("blur"),
    u("focus"),
    u("focusin"),
    u("focusout"),
    u("keyup"),
    u("keydown"),
    u("keypress"),
    u("submit"),
    u("change"),
    u("mousedown"),
    u("mousemove"),
    u("mouseup"),
    u("mouseenter"),
    u("mouseleave"),
    u("mouseout"),
    u("mouseover"),
    u("touchstart"),
    u("touchend"),
    u("touchmove"),
    u("resize"),
    u("scroll");
  const h = {
    addClass: function (...e) {
      const t = o(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = o(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = o(e.map((e) => e.split(" ")));
      return (
        d(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = o(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, i, n] = e;
      function a(e) {
        const t = e.target;
        if (!t) return;
        const n = e.target.dom7EventData || [];
        if ((n.indexOf(e) < 0 && n.unshift(e), c(t).is(s))) i.apply(t, n);
        else {
          const e = c(t).parents();
          for (let t = 0; t < e.length; t += 1)
            c(e[t]).is(s) && i.apply(e[t], n);
        }
      }
      function r(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
        n || (n = !1);
      const l = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < l.length; o += 1) {
            const e = l[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: a }),
              t.addEventListener(e, a, n);
          }
        else
          for (o = 0; o < l.length; o += 1) {
            const e = l[o];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: r }),
              t.addEventListener(e, r, n);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, i, n] = e;
      "function" == typeof e[1] && (([t, i, n] = e), (s = void 0)),
        n || (n = !1);
      const a = t.split(" ");
      for (let e = 0; e < a.length; e += 1) {
        const t = a[e];
        for (let e = 0; e < this.length; e += 1) {
          const a = this[e];
          let r;
          if (
            (!s && a.dom7Listeners
              ? (r = a.dom7Listeners[t])
              : s && a.dom7LiveListeners && (r = a.dom7LiveListeners[t]),
            r && r.length)
          )
            for (let e = r.length - 1; e >= 0; e -= 1) {
              const s = r[e];
              (i && s.listener === i) ||
              (i &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === i)
                ? (a.removeEventListener(t, s.proxyListener, n), r.splice(e, 1))
                : i ||
                  (a.removeEventListener(t, s.proxyListener, n),
                  r.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = r(),
        s = e[0].split(" "),
        i = e[1];
      for (let n = 0; n < s.length; n += 1) {
        const a = s[n];
        for (let s = 0; s < this.length; s += 1) {
          const n = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(a, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (n.dom7EventData = e.filter((e, t) => t > 0)),
              n.dispatchEvent(s),
              (n.dom7EventData = []),
              delete n.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = r();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = r(),
          t = n(),
          s = this[0],
          i = s.getBoundingClientRect(),
          a = t.body,
          l = s.clientTop || a.clientTop || 0,
          o = s.clientLeft || a.clientLeft || 0,
          d = s === e ? e.scrollY : s.scrollTop,
          c = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + d - l, left: i.left + c - o };
      }
      return null;
    },
    css: function (e, t) {
      const s = r();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = r(),
        s = n(),
        i = this[0];
      let a, o;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (a = c(e), o = 0; o < a.length; o += 1) if (a[o] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof l) {
        for (a = e.nodeType ? [e] : e, o = 0; o < a.length; o += 1)
          if (a[o] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return c([]);
      if (e < 0) {
        const s = t + e;
        return c(s < 0 ? [] : [this[s]]);
      }
      return c([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = n();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = s.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof l)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = n();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const n = t.createElement("div");
          for (n.innerHTML = e, i = n.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof l)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && c(this[0].nextElementSibling).is(e)
            ? c([this[0].nextElementSibling])
            : c([])
          : this[0].nextElementSibling
          ? c([this[0].nextElementSibling])
          : c([])
        : c([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return c([]);
      for (; s.nextElementSibling; ) {
        const i = s.nextElementSibling;
        e ? c(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return c(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && c(t.previousElementSibling).is(e)
            ? c([t.previousElementSibling])
            : c([])
          : t.previousElementSibling
          ? c([t.previousElementSibling])
          : c([]);
      }
      return c([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return c([]);
      for (; s.previousElementSibling; ) {
        const i = s.previousElementSibling;
        e ? c(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return c(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? c(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return c(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let i = this[s].parentNode;
        for (; i; ) e ? c(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return c(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? c([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return c(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].children;
        for (let s = 0; s < i.length; s += 1)
          (e && !c(i[s]).is(e)) || t.push(i[s]);
      }
      return c(t);
    },
    filter: function (e) {
      return c(d(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(h).forEach((e) => {
    Object.defineProperty(c.fn, e, { value: h[e], writable: !0 });
  });
  const f = c;
  function m(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function g() {
    return Date.now();
  }
  function v(e, t) {
    void 0 === t && (t = "x");
    const s = r();
    let i, n, a;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((n = l.transform || l.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((a =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = a.toString().split(","))),
      "x" === t &&
        (n = s.WebKitCSSMatrix
          ? a.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (n = s.WebKitCSSMatrix
          ? a.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      n || 0
    );
  }
  function w(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function b(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function C() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != i && !b(i)) {
        const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, n = s.length; t < n; t += 1) {
          const n = s[t],
            a = Object.getOwnPropertyDescriptor(i, n);
          void 0 !== a &&
            a.enumerable &&
            (w(e[n]) && w(i[n])
              ? i[n].__swiper__
                ? (e[n] = i[n])
                : C(e[n], i[n])
              : !w(e[n]) && w(i[n])
              ? ((e[n] = {}), i[n].__swiper__ ? (e[n] = i[n]) : C(e[n], i[n]))
              : (e[n] = i[n]));
        }
      }
    }
    return e;
  }
  function T(e, t, s) {
    e.style.setProperty(t, s);
  }
  function S(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const n = r(),
      a = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > a ? "next" : "prev",
      p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (l = new Date().getTime()), null === o && (o = l);
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          r = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = a + r * (s - a);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: c });
            }),
            void n.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = n.requestAnimationFrame(u);
      };
    u();
  }
  let x, y, E;
  function M() {
    return (
      x ||
        (x = (function () {
          const e = r(),
            t = n();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      x
    );
  }
  function k(e) {
    return (
      void 0 === e && (e = {}),
      y ||
        (y = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = M(),
            i = r(),
            n = i.navigator.platform,
            a = t || i.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = i.screen.width,
            d = i.screen.height,
            c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = a.match(/(iPad).*OS\s([\d_]+)/);
          const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
            h = !p && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === n;
          let m = "MacIntel" === n;
          return (
            !p &&
              m &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = a.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (m = !1)),
            c && !f && ((l.os = "android"), (l.android = !0)),
            (p || h || u) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      y
    );
  }
  function $() {
    return (
      E ||
        (E = (function () {
          const e = r();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      E
    );
  }
  const P = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const n = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][n](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function n() {
        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
        for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
          a[r] = arguments[r];
        t.apply(i, a);
      }
      return (n.__emitterProxy = t), i.on(e, n, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, n) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(n, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var n = arguments.length, a = new Array(n), r = 0; r < n; r++)
        a[r] = arguments[r];
      "string" == typeof a[0] || Array.isArray(a[0])
        ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
        : ((t = a[0].events), (s = a[0].data), (i = a[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const L = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        { $wrapperEl: n, size: a, rtlTranslate: r, wrongRTL: l } = e,
        o = e.virtual && i.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = n.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : c.length;
      let u = [];
      const h = [],
        f = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let g = i.slidesOffsetAfter;
      "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        w = e.slidesGrid.length;
      let b = i.spaceBetween,
        C = -m,
        S = 0,
        x = 0;
      if (void 0 === a) return;
      "string" == typeof b &&
        b.indexOf("%") >= 0 &&
        (b = (parseFloat(b.replace("%", "")) / 100) * a),
        (e.virtualSize = -b),
        r
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          (T(e.wrapperEl, "--swiper-centered-offset-before", ""),
          T(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const y = i.grid && i.grid.rows > 1 && e.grid;
      let E;
      y && e.grid.initSlides(p);
      const M =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let n = 0; n < p; n += 1) {
        E = 0;
        const r = c.eq(n);
        if (
          (y && e.grid.updateSlide(n, r, p, t), "none" !== r.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            M && (c[n].style[t("width")] = "");
            const a = getComputedStyle(r[0]),
              l = r[0].style.transform,
              o = r[0].style.webkitTransform;
            if (
              (l && (r[0].style.transform = "none"),
              o && (r[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              E = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
            else {
              const e = s(a, "width"),
                t = s(a, "padding-left"),
                i = s(a, "padding-right"),
                n = s(a, "margin-left"),
                l = s(a, "margin-right"),
                o = a.getPropertyValue("box-sizing");
              if (o && "border-box" === o) E = e + n + l;
              else {
                const { clientWidth: s, offsetWidth: a } = r[0];
                E = e + t + i + n + l + (a - s);
              }
            }
            l && (r[0].style.transform = l),
              o && (r[0].style.webkitTransform = o),
              i.roundLengths && (E = Math.floor(E));
          } else
            (E = (a - (i.slidesPerView - 1) * b) / i.slidesPerView),
              i.roundLengths && (E = Math.floor(E)),
              c[n] && (c[n].style[t("width")] = `${E}px`);
          c[n] && (c[n].swiperSlideSize = E),
            f.push(E),
            i.centeredSlides
              ? ((C = C + E / 2 + S / 2 + b),
                0 === S && 0 !== n && (C = C - a / 2 - b),
                0 === n && (C = C - a / 2 - b),
                Math.abs(C) < 0.001 && (C = 0),
                i.roundLengths && (C = Math.floor(C)),
                x % i.slidesPerGroup == 0 && u.push(C),
                h.push(C))
              : (i.roundLengths && (C = Math.floor(C)),
                (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(C),
                h.push(C),
                (C = C + E + b)),
            (e.virtualSize += E + b),
            (S = E),
            (x += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, a) + g),
        r &&
          l &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          n.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        y && e.grid.updateWrapperSize(E, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let n = u[s];
          i.roundLengths && (n = Math.floor(n)),
            u[s] <= e.virtualSize - a && t.push(n);
        }
        (u = t),
          Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - a);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const s = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
          [s]: `${b}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - a;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < a)
        ) {
          const t = (a - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: f,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        T(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          T(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== w && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(o || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        p <= i.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let n,
        a = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const r = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || f([])).each((e) => {
            s.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !i) break;
            s.push(r(e));
          }
      else s.push(r(t.activeIndex));
      for (n = 0; n < s.length; n += 1)
        if (void 0 !== s[n]) {
          const e = s[n].offsetHeight;
          a = e > a ? e : a;
        }
      (a || 0 === a) && t.$wrapperEl.css("height", `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: n, snapGrid: a } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let r = -e;
      n && (r = e),
        i.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let o = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
        const d =
            (r + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          c =
            (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (l.swiperSlideSize + s.spaceBetween),
          p = -(r - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(s.slideVisibleClass)),
          (l.progress = n ? -d : d),
          (l.originalProgress = n ? -c : c);
      }
      t.visibleSlides = f(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: a, isEnd: r } = t;
      const l = a,
        o = r;
      0 === i
        ? ((n = 0), (a = !0), (r = !0))
        : ((n = (e - t.minTranslate()) / i), (a = n <= 0), (r = n >= 1)),
        Object.assign(t, { progress: n, isBeginning: a, isEnd: r }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        a && !l && t.emit("reachBeginning toEdge"),
        r && !o && t.emit("reachEnd toEdge"),
        ((l && !a) || (o && !r)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: i,
          activeIndex: n,
          realIndex: a,
        } = e,
        r = e.virtual && s.virtual.enabled;
      let l;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (l = r
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${n}"]`
            )
          : t.eq(n)),
        l.addClass(s.slideActiveClass),
        s.loop &&
          (l.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : i
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          d.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: n,
          params: a,
          activeIndex: r,
          realIndex: l,
          snapIndex: o,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (c = e)
              : s >= i[e] && s < i[e + 1] && (c = e + 1)
            : s >= i[e] && (c = e);
        a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (n.indexOf(s) >= 0) d = n.indexOf(s);
      else {
        const e = Math.min(a.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / a.slidesPerGroup);
      }
      if ((d >= n.length && (d = n.length - 1), c === r))
        return void (d !== o && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: p,
        previousIndex: r,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        l !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = f(e).closest(`.${s.slideClass}`)[0];
      let n,
        a = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (a = !0), (n = e);
            break;
          }
      if (!i || !a)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              f(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = n),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const O = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let a = v(n[0], e);
      return s && (a = -a), a || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: i,
          params: n,
          $wrapperEl: a,
          wrapperEl: r,
          progress: l,
        } = s;
      let o,
        d = 0,
        c = 0;
      s.isHorizontal() ? (d = i ? -e : e) : (c = e),
        n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        n.cssMode
          ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -d
              : -c)
          : n.virtualTranslate ||
            a.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? d : c);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== l && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const a = this,
        { params: r, wrapperEl: l } = a;
      if (a.animating && r.preventInteractionOnTransition) return !1;
      const o = a.minTranslate(),
        d = a.maxTranslate();
      let c;
      if (
        ((c = i && e > o ? o : i && e < d ? d : e),
        a.updateProgress(c),
        r.cssMode)
      ) {
        const e = a.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!a.support.smoothScroll)
            return (
              S({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (a.setTransition(0),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, n), a.emit("transitionEnd")))
          : (a.setTransition(t),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, n),
              a.emit("transitionStart")),
            a.animating ||
              ((a.animating = !0),
              a.onTranslateToWrapperTransitionEnd ||
                (a.onTranslateToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd
                    ),
                    a.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      a.onTranslateToWrapperTransitionEnd
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    s && a.emit("transitionEnd"));
                }),
              a.$wrapperEl[0].addEventListener(
                "transitionend",
                a.onTranslateToWrapperTransitionEnd
              ),
              a.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                a.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function A(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
    const { activeIndex: a, previousIndex: r } = t;
    let l = i;
    if (
      (l || (l = a > r ? "next" : a < r ? "prev" : "reset"),
      t.emit(`transition${n}`),
      s && a !== r)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${n}`);
      t.emit(`slideChangeTransition${n}`),
        "next" === l
          ? t.emit(`slideNextTransition${n}`)
          : t.emit(`slidePrevTransition${n}`);
    }
  }
  const D = {
    setTransition: function (e, t) {
      const s = this;
      s.params.cssMode || s.$wrapperEl.transition(e),
        s.emit("setTransition", e, t);
    },
    transitionStart: function (e, t) {
      void 0 === e && (e = !0);
      const s = this,
        { params: i } = s;
      i.cssMode ||
        (i.autoHeight && s.updateAutoHeight(),
        A({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
    },
    transitionEnd: function (e, t) {
      void 0 === e && (e = !0);
      const s = this,
        { params: i } = s;
      (s.animating = !1),
        i.cssMode ||
          (s.setTransition(0),
          A({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
    },
  };
  const I = {
    slideTo: function (e, t, s, i, n) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const a = this;
      let r = e;
      r < 0 && (r = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: f,
      } = a;
      if ((a.animating && l.preventInteractionOnTransition) || (!f && !i && !n))
        return !1;
      const m = Math.min(a.params.slidesPerGroupSkip, r);
      let g = m + Math.floor((r - m) / a.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1),
        (p || l.initialSlide || 0) === (c || 0) &&
          s &&
          a.emit("beforeSlideChangeStart");
      const v = -o[g];
      if ((a.updateProgress(v), l.normalizeSlideIndex))
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (r = e)
              : t >= s && t < i && (r = e + 1)
            : t >= s && (r = e);
        }
      if (a.initialized && r !== p) {
        if (!a.allowSlideNext && v < a.translate && v < a.minTranslate())
          return !1;
        if (
          !a.allowSlidePrev &&
          v > a.translate &&
          v > a.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      let w;
      if (
        ((w = r > p ? "next" : r < p ? "prev" : "reset"),
        (u && -v === a.translate) || (!u && v === a.translate))
      )
        return (
          a.updateActiveIndex(r),
          l.autoHeight && a.updateAutoHeight(),
          a.updateSlidesClasses(),
          "slide" !== l.effect && a.setTranslate(v),
          "reset" !== w && (a.transitionStart(s, w), a.transitionEnd(s, w)),
          !1
        );
      if (l.cssMode) {
        const e = a.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = a.virtual && a.params.virtual.enabled;
          t &&
            ((a.wrapperEl.style.scrollSnapType = "none"),
            (a._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (a.wrapperEl.style.scrollSnapType = ""),
                  (a._swiperImmediateVirtual = !1);
              });
        } else {
          if (!a.support.smoothScroll)
            return (
              S({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        a.setTransition(t),
        a.setTranslate(v),
        a.updateActiveIndex(r),
        a.updateSlidesClasses(),
        a.emit("beforeTransitionStart", t, i),
        a.transitionStart(s, w),
        0 === t
          ? a.transitionEnd(s, w)
          : a.animating ||
            ((a.animating = !0),
            a.onSlideToWrapperTransitionEnd ||
              (a.onSlideToWrapperTransitionEnd = function (e) {
                a &&
                  !a.destroyed &&
                  e.target === this &&
                  (a.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd
                  ),
                  a.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    a.onSlideToWrapperTransitionEnd
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(s, w));
              }),
            a.$wrapperEl[0].addEventListener(
              "transitionend",
              a.onSlideToWrapperTransitionEnd
            ),
            a.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              a.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const n = this;
      let a = e;
      return n.params.loop && (a += n.loopedSlides), n.slideTo(a, t, s, i);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { animating: n, enabled: a, params: r } = i;
      if (!a) return i;
      let l = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l;
      if (r.loop) {
        if (n && r.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return r.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: n,
          animating: a,
          snapGrid: r,
          slidesGrid: l,
          rtlTranslate: o,
          enabled: d,
        } = i;
      if (!d) return i;
      if (n.loop) {
        if (a && n.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = c(o ? i.translate : -i.translate),
        u = r.map((e) => c(e));
      let h = r[u.indexOf(p) - 1];
      if (void 0 === h && n.cssMode) {
        let e;
        r.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== h &&
          ((f = l.indexOf(h)),
          f < 0 && (f = i.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        n.rewind && i.isBeginning)
      ) {
        const n =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(n, e, t, s);
      }
      return i.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const n = this;
      let a = n.activeIndex;
      const r = Math.min(n.params.slidesPerGroupSkip, a),
        l = r + Math.floor((a - r) / n.params.slidesPerGroup),
        o = n.rtlTranslate ? n.translate : -n.translate;
      if (o >= n.snapGrid[l]) {
        const e = n.snapGrid[l];
        o - e > (n.snapGrid[l + 1] - e) * i && (a += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[l - 1];
        o - e <= (n.snapGrid[l] - e) * i && (a -= n.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, n.slidesGrid.length - 1)),
        n.slideTo(a, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        a = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(f(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? a < e.loopedSlides - i / 2 ||
              a > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (a = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                m(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a)
            : a > e.slides.length - i
            ? (e.loopFix(),
              (a = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              m(() => {
                e.slideTo(a);
              }))
            : e.slideTo(a);
      } else e.slideTo(a);
    },
  };
  const z = {
    loopCreate: function () {
      const e = this,
        t = n(),
        { params: s, $wrapperEl: i } = e,
        a = i.children().length > 0 ? f(i.children()[0].parentNode) : i;
      a.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let r = a.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = f(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            a.append(e);
          }
          r = a.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > r.length &&
          e.params.loopedSlidesLimit &&
          (e.loopedSlides = r.length);
      const l = [],
        o = [];
      r.each((e, t) => {
        f(e).attr("data-swiper-slide-index", t);
      });
      for (let t = 0; t < e.loopedSlides; t += 1) {
        const e = t - Math.floor(t / r.length) * r.length;
        o.push(r.eq(e)[0]), l.unshift(r.eq(r.length - e - 1)[0]);
      }
      for (let e = 0; e < o.length; e += 1)
        a.append(f(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = l.length - 1; e >= 0; e -= 1)
        a.prepend(f(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: i,
        allowSlidePrev: n,
        allowSlideNext: a,
        snapGrid: r,
        rtlTranslate: l,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -r[t] - e.getTranslate();
      if (t < i) {
        (o = s.length - 3 * i + t), (o += i);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      } else if (t >= s.length - i) {
        (o = -s.length + t + i), (o += i);
        e.slideTo(o, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = n), (e.allowSlideNext = a), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  const B = {
    setGrabCursor: function (e) {
      const t = this;
      if (
        t.support.touch ||
        !t.params.simulateTouch ||
        (t.params.watchOverflow && t.isLocked) ||
        t.params.cssMode
      )
        return;
      const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
      (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
    },
    unsetGrabCursor: function () {
      const e = this;
      e.support.touch ||
        (e.params.watchOverflow && e.isLocked) ||
        e.params.cssMode ||
        (e[
          "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
        ].style.cursor = "");
    },
  };
  function G(e) {
    const t = this,
      s = n(),
      i = r(),
      a = t.touchEventsData,
      { params: l, touches: o, enabled: d } = t;
    if (!d) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let c = e;
    c.originalEvent && (c = c.originalEvent);
    let p = f(c.target);
    if ("wrapper" === l.touchEventsTarget && !p.closest(t.wrapperEl).length)
      return;
    if (
      ((a.isTouchEvent = "touchstart" === c.type),
      !a.isTouchEvent && "which" in c && 3 === c.which)
    )
      return;
    if (!a.isTouchEvent && "button" in c && c.button > 0) return;
    if (a.isTouched && a.isMoved) return;
    !!l.noSwipingClass &&
      "" !== l.noSwipingClass &&
      c.target &&
      c.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (p = f(e.path[0]));
    const u = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      h = !(!c.target || !c.target.shadowRoot);
    if (
      l.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === n() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(u, p[0])
        : p.closest(u)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !p.closest(l.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === c.type ? c.targetTouches[0].pageX : c.pageX),
      (o.currentY =
        "touchstart" === c.type ? c.targetTouches[0].pageY : c.pageY);
    const m = o.currentX,
      v = o.currentY,
      w = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      b = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (w && (m <= b || m >= i.innerWidth - b)) {
      if ("prevent" !== w) return;
      e.preventDefault();
    }
    if (
      (Object.assign(a, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = m),
      (o.startY = v),
      (a.touchStartTime = g()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (a.allowThresholdMove = !1),
      "touchstart" !== c.type)
    ) {
      let e = !0;
      p.is(a.focusableElements) &&
        ((e = !1), "SELECT" === p[0].nodeName && (a.isTouched = !1)),
        s.activeElement &&
          f(s.activeElement).is(a.focusableElements) &&
          s.activeElement !== p[0] &&
          s.activeElement.blur();
      const i = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !i) ||
        p[0].isContentEditable ||
        c.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", c);
  }
  function N(e) {
    const t = n(),
      s = this,
      i = s.touchEventsData,
      { params: a, touches: r, rtlTranslate: l, enabled: o } = s;
    if (!o) return;
    let d = e;
    if ((d.originalEvent && (d = d.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", d)
      );
    if (i.isTouchEvent && "touchmove" !== d.type) return;
    const c =
        "touchmove" === d.type &&
        d.targetTouches &&
        (d.targetTouches[0] || d.changedTouches[0]),
      p = "touchmove" === d.type ? c.pageX : d.pageX,
      u = "touchmove" === d.type ? c.pageY : d.pageY;
    if (d.preventedByNestedSwiper) return (r.startX = p), void (r.startY = u);
    if (!s.allowTouchMove)
      return (
        f(d.target).is(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(r, { startX: p, startY: u, currentX: p, currentY: u }),
          (i.touchStartTime = g()))
        )
      );
    if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (u < r.startY && s.translate <= s.maxTranslate()) ||
          (u > r.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (p < r.startX && s.translate <= s.maxTranslate()) ||
        (p > r.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      d.target === t.activeElement &&
      f(d.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", d),
      d.targetTouches && d.targetTouches.length > 1)
    )
      return;
    (r.currentX = p), (r.currentY = u);
    const h = r.currentX - r.startX,
      m = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + m ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && r.currentY === r.startY) ||
      (s.isVertical() && r.currentX === r.startX)
        ? (i.isScrolling = !1)
        : h * h + m * m >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(m), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", d),
      void 0 === i.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && d.cancelable && d.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && d.stopPropagation(),
      i.isMoved ||
        (a.loop && !a.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", d)),
      s.emit("sliderMove", d),
      (i.isMoved = !0);
    let v = s.isHorizontal() ? h : m;
    (r.diff = v),
      (v *= a.touchRatio),
      l && (v = -v),
      (s.swipeDirection = v > 0 ? "prev" : "next"),
      (i.currentTranslate = v + i.startTranslate);
    let w = !0,
      b = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (b = 0),
      v > 0 && i.currentTranslate > s.minTranslate()
        ? ((w = !1),
          a.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + v) ** b))
        : v < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((w = !1),
          a.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - v) ** b)),
      w && (d.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(v) > a.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          void (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        a.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function _(e) {
    const t = this,
      s = t.touchEventsData,
      { params: i, touches: n, rtlTranslate: a, slidesGrid: r, enabled: l } = t;
    if (!l) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    i.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = g(),
      c = d - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        c < 300 &&
          d - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = g()),
      m(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = i.followFinger
        ? a
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < r.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== r[e + t]
        ? p >= r[e] && p < r[e + t] && ((u = e), (h = r[e + t] - r[e]))
        : p >= r[e] && ((u = e), (h = r[r.length - 1] - r[r.length - 2]));
    }
    let f = null,
      v = null;
    i.rewind &&
      (t.isBeginning
        ? (v =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (f = 0));
    const w = (p - r[u]) / h,
      b = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (c > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (w >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? f : u + b)
          : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (w > 1 - i.longSwipesRatio
            ? t.slideTo(u + b)
            : null !== v && w < 0 && Math.abs(w) > i.longSwipesRatio
            ? t.slideTo(v)
            : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(u + b)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : u + b),
          "prev" === t.swipeDirection && t.slideTo(null !== v ? v : u));
    }
  }
  function H() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = i),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function F(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function j() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    (n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
      n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let V = !1;
  function W() {}
  const R = (e, t) => {
    const s = n(),
      {
        params: i,
        touchEvents: a,
        el: r,
        wrapperEl: l,
        device: o,
        support: d,
      } = e,
      c = !!i.nested,
      p = "on" === t ? "addEventListener" : "removeEventListener",
      u = t;
    if (d.touch) {
      const t = !(
        "touchstart" !== a.start ||
        !d.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      r[p](a.start, e.onTouchStart, t),
        r[p](
          a.move,
          e.onTouchMove,
          d.passiveListener ? { passive: !1, capture: c } : c
        ),
        r[p](a.end, e.onTouchEnd, t),
        a.cancel && r[p](a.cancel, e.onTouchEnd, t);
    } else
      r[p](a.start, e.onTouchStart, !1),
        s[p](a.move, e.onTouchMove, c),
        s[p](a.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      r[p]("click", e.onClick, !0),
      i.cssMode && l[p]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[u](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            H,
            !0
          )
        : e[u]("observerUpdate", H, !0);
  };
  const X = {
      attachEvents: function () {
        const e = this,
          t = n(),
          { params: s, support: i } = e;
        (e.onTouchStart = G.bind(e)),
          (e.onTouchMove = N.bind(e)),
          (e.onTouchEnd = _.bind(e)),
          s.cssMode && (e.onScroll = j.bind(e)),
          (e.onClick = F.bind(e)),
          i.touch && !V && (t.addEventListener("touchstart", W), (V = !0)),
          R(e, "on");
      },
      detachEvents: function () {
        R(this, "off");
      },
    },
    Y = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const q = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: i = 0,
          params: n,
          $el: a,
        } = e,
        r = n.breakpoints;
      if (!r || (r && 0 === Object.keys(r).length)) return;
      const l = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
      if (!l || e.currentBreakpoint === l) return;
      const o = (l in r ? r[l] : void 0) || e.originalParams,
        d = Y(e, n),
        c = Y(e, o),
        p = n.enabled;
      d && !c
        ? (a.removeClass(
            `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !d &&
          c &&
          (a.addClass(`${n.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) ||
            (!o.grid.fill && "column" === n.grid.fill)) &&
            a.addClass(`${n.containerModifierClass}grid-column`),
          e.emitContainerClasses()),
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const s = n[t] && n[t].enabled,
            i = o[t] && o[t].enabled;
          s && !i && e[t].disable(), !s && i && e[t].enable();
        });
      const u = o.direction && o.direction !== n.direction,
        h = n.loop && (o.slidesPerView !== n.slidesPerView || u);
      u && s && e.changeDirection(), C(e.params, o);
      const f = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !f ? e.disable() : !p && f && e.enable(),
        (e.currentBreakpoint = l),
        e.emit("_beforeBreakpoint", o),
        h &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", o);
    },
    getBreakpoint: function (e, t, s) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
        return;
      let i = !1;
      const n = r(),
        a = "window" === t ? n.innerHeight : s.clientHeight,
        l = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: a * t, point: e };
          }
          return { value: e, point: e };
        });
      l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < l.length; e += 1) {
        const { point: a, value: r } = l[e];
        "window" === t
          ? n.matchMedia(`(min-width: ${r}px)`).matches && (i = a)
          : r <= s.clientWidth && (i = a);
      }
      return i || "max";
    },
  };
  const U = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: i, $el: n, device: a, support: r } = e,
        l = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && s.push(t + i);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !r.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: i },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: a.android },
            { ios: a.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
            { "watch-progress": s.watchSlidesProgress },
          ],
          s.containerModifierClass
        );
      t.push(...l), n.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const K = {
    loadImage: function (e, t, s, i, n, a) {
      const l = r();
      let o;
      function d() {
        a && a();
      }
      f(e).parent("picture")[0] || (e.complete && n)
        ? d()
        : t
        ? ((o = new l.Image()),
          (o.onload = d),
          (o.onerror = d),
          i && (o.sizes = i),
          s && (o.srcset = s),
          t && (o.src = t))
        : d();
    },
    preloadImages: function () {
      const e = this;
      function t() {
        null != e &&
          e &&
          !e.destroyed &&
          (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
          e.imagesLoaded === e.imagesToLoad.length &&
            (e.params.updateOnImagesReady && e.update(),
            e.emit("imagesReady")));
      }
      e.imagesToLoad = e.$el.find("img");
      for (let s = 0; s < e.imagesToLoad.length; s += 1) {
        const i = e.imagesToLoad[s];
        e.loadImage(
          i,
          i.currentSrc || i.getAttribute("src"),
          i.srcset || i.getAttribute("srcset"),
          i.sizes || i.getAttribute("sizes"),
          !0,
          t
        );
      }
    },
  };
  const J = {
      checkOverflow: function () {
        const e = this,
          { isLocked: t, params: s } = e,
          { slidesOffsetBefore: i } = s;
        if (i) {
          const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
          e.isLocked = e.size > s;
        } else e.isLocked = 1 === e.snapGrid.length;
        !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
          !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
          t && t !== e.isLocked && (e.isEnd = !1),
          t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
      },
    },
    Q = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopedSlidesLimit: !0,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
  function Z(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        n = s[i];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in n
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              C(t, s))
            : C(t, s))
        : C(t, s);
    };
  }
  const ee = {
      eventsEmitter: P,
      update: L,
      translate: O,
      transition: D,
      slide: I,
      loop: z,
      grabCursor: B,
      events: X,
      breakpoints: q,
      checkOverflow: J,
      classes: U,
      images: K,
    },
    te = {};
  class se {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
        i[n] = arguments[n];
      if (
        (1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
        t || (t = {}),
        (t = C({}, t)),
        e && !t.el && (t.el = e),
        t.el && f(t.el).length > 1)
      ) {
        const e = [];
        return (
          f(t.el).each((s) => {
            const i = C({}, t, { el: s });
            e.push(new se(i));
          }),
          e
        );
      }
      const a = this;
      (a.__swiper__ = !0),
        (a.support = M()),
        (a.device = k({ userAgent: t.userAgent })),
        (a.browser = $()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
      const r = {};
      a.modules.forEach((e) => {
        e({
          swiper: a,
          extendParams: Z(t, r),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const l = C({}, Q, r);
      return (
        (a.params = C({}, l, te, t)),
        (a.originalParams = C({}, a.params)),
        (a.passedParams = C({}, t)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((e) => {
            a.on(e, a.params.on[e]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        (a.$ = f),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: e,
          classNames: [],
          slides: f(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === a.params.direction,
          isVertical: () => "vertical" === a.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (a.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (a.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              a.support.touch || !a.params.simulateTouch
                ? a.touchEventsTouch
                : a.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: g(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        n = (s.maxTranslate() - i) * e + i;
      s.translateTo(n, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: n,
        slidesSizesGrid: a,
        size: r,
        activeIndex: l,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = i[l].swiperSlideSize;
        for (let s = l + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > r && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < i.length; e += 1) {
          (t ? n[e] + a[e] - n[l] < r : n[e] - n[l] < r) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          n[l] - n[e] < r && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((n =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            n || i()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${i}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = f(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let a = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = f(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children ? s.children(i()) : f(s).children(i());
      })();
      if (0 === a.length && t.params.createElements) {
        const e = n().createElement("div");
        (a = f(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            a.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: a,
          wrapperEl: a[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === a.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, $el: n, $wrapperEl: a, slides: r } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            n.removeAttr("style"),
            a.removeAttr("style"),
            r &&
              r.length &&
              r
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      C(te, e);
    }
    static get extendedDefaults() {
      return te;
    }
    static get defaults() {
      return Q;
    }
    static installModule(e) {
      se.prototype.__modules__ || (se.prototype.__modules__ = []);
      const t = se.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => se.installModule(e)), se)
        : (se.installModule(e), se);
    }
  }
  Object.keys(ee).forEach((e) => {
    Object.keys(ee[e]).forEach((t) => {
      se.prototype[t] = ee[e][t];
    });
  }),
    se.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const n = r();
        let a = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== n.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((a = new ResizeObserver((e) => {
                l = n.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let n = s,
                    a = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: r } = e;
                    (r && r !== t.el) ||
                      ((n = i ? i.width : (s[0] || s).inlineSize),
                      (a = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (n === s && a === i) || o();
                });
              })),
              a.observe(t.el))
            : (n.addEventListener("resize", o),
              n.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            l && n.cancelAnimationFrame(l),
              a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
              n.removeEventListener("resize", o),
              n.removeEventListener("orientationchange", d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = [],
          l = r(),
          o = function (e, t) {
            void 0 === t && (t = {});
            const s = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const t = function () {
                  n("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(t)
                  : l.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              a.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.$el[0], { childList: t.params.observeSlideChildren }),
                o(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            a.forEach((e) => {
              e.disconnect();
            }),
              a.splice(0, a.length);
          });
      },
    ]);
  function ie(e, t, s, i) {
    const a = n();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((n) => {
          if (!s[n] && !0 === s.auto) {
            let r = e.$el.children(`.${i[n]}`)[0];
            r ||
              ((r = a.createElement("div")),
              (r.className = i[n]),
              e.$el.append(r)),
              (s[n] = r),
              (t[n] = r);
          }
        }),
      s
    );
  }
  function ne(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  new se(".swiper", {
    modules: [
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        function a(e) {
          let s;
          return (
            e &&
              ((s = f(e)),
              t.params.uniqueNavElements &&
                "string" == typeof e &&
                s.length > 1 &&
                1 === t.$el.find(e).length &&
                (s = t.$el.find(e))),
            s
          );
        }
        function r(e, s) {
          const i = t.params.navigation;
          e &&
            e.length > 0 &&
            (e[s ? "addClass" : "removeClass"](i.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
        }
        function l() {
          if (t.params.loop) return;
          const { $nextEl: e, $prevEl: s } = t.navigation;
          r(s, t.isBeginning && !t.params.rewind),
            r(e, t.isEnd && !t.params.rewind);
        }
        function o(e) {
          e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) &&
              (t.slidePrev(), n("navigationPrev"));
        }
        function d(e) {
          e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) &&
              (t.slideNext(), n("navigationNext"));
        }
        function c() {
          const e = t.params.navigation;
          if (
            ((t.params.navigation = ie(
              t,
              t.originalParams.navigation,
              t.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !e.nextEl && !e.prevEl)
          )
            return;
          const s = a(e.nextEl),
            i = a(e.prevEl);
          s && s.length > 0 && s.on("click", d),
            i && i.length > 0 && i.on("click", o),
            Object.assign(t.navigation, {
              $nextEl: s,
              nextEl: s && s[0],
              $prevEl: i,
              prevEl: i && i[0],
            }),
            t.enabled ||
              (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
        }
        function p() {
          const { $nextEl: e, $prevEl: s } = t.navigation;
          e &&
            e.length &&
            (e.off("click", d),
            e.removeClass(t.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", o),
              s.removeClass(t.params.navigation.disabledClass));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled",
          },
        }),
          (t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          i("init", () => {
            !1 === t.params.navigation.enabled ? u() : (c(), l());
          }),
          i("toEdge fromEdge lock unlock", () => {
            l();
          }),
          i("destroy", () => {
            p();
          }),
          i("enable disable", () => {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              ),
              s &&
                s[t.enabled ? "removeClass" : "addClass"](
                  t.params.navigation.lockClass
                );
          }),
          i("click", (e, s) => {
            const { $nextEl: i, $prevEl: a } = t.navigation,
              r = s.target;
            if (t.params.navigation.hideOnClick && !f(r).is(a) && !f(r).is(i)) {
              if (
                t.pagination &&
                t.params.pagination &&
                t.params.pagination.clickable &&
                (t.pagination.el === r || t.pagination.el.contains(r))
              )
                return;
              let e;
              i
                ? (e = i.hasClass(t.params.navigation.hiddenClass))
                : a && (e = a.hasClass(t.params.navigation.hiddenClass)),
                n(!0 === e ? "navigationShow" : "navigationHide"),
                i && i.toggleClass(t.params.navigation.hiddenClass),
                a && a.toggleClass(t.params.navigation.hiddenClass);
            }
          });
        const u = () => {
          t.$el.addClass(t.params.navigation.navigationDisabledClass), p();
        };
        Object.assign(t.navigation, {
          enable: () => {
            t.$el.removeClass(t.params.navigation.navigationDisabledClass),
              c(),
              l();
          },
          disable: u,
          update: l,
          init: c,
          destroy: p,
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = "swiper-pagination";
        let r;
        s({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${a}-bullet`,
            bulletActiveClass: `${a}-bullet-active`,
            modifierClass: `${a}-`,
            currentClass: `${a}-current`,
            totalClass: `${a}-total`,
            hiddenClass: `${a}-hidden`,
            progressbarFillClass: `${a}-progressbar-fill`,
            progressbarOppositeClass: `${a}-progressbar-opposite`,
            clickableClass: `${a}-clickable`,
            lockClass: `${a}-lock`,
            horizontalClass: `${a}-horizontal`,
            verticalClass: `${a}-vertical`,
            paginationDisabledClass: `${a}-disabled`,
          },
        }),
          (t.pagination = { el: null, $el: null, bullets: [] });
        let l = 0;
        function o() {
          return (
            !t.params.pagination.el ||
            !t.pagination.el ||
            !t.pagination.$el ||
            0 === t.pagination.$el.length
          );
        }
        function d(e, s) {
          const { bulletActiveClass: i } = t.params.pagination;
          e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
        }
        function c() {
          const e = t.rtl,
            s = t.params.pagination;
          if (o()) return;
          const i =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            a = t.pagination.$el;
          let c;
          const p = t.params.loop
            ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          if (
            (t.params.loop
              ? ((c = Math.ceil(
                  (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                )),
                c > i - 1 - 2 * t.loopedSlides && (c -= i - 2 * t.loopedSlides),
                c > p - 1 && (c -= p),
                c < 0 && "bullets" !== t.params.paginationType && (c = p + c))
              : (c = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
            "bullets" === s.type &&
              t.pagination.bullets &&
              t.pagination.bullets.length > 0)
          ) {
            const i = t.pagination.bullets;
            let n, o, p;
            if (
              (s.dynamicBullets &&
                ((r = i
                  .eq(0)
                  [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                a.css(
                  t.isHorizontal() ? "width" : "height",
                  r * (s.dynamicMainBullets + 4) + "px"
                ),
                s.dynamicMainBullets > 1 &&
                  void 0 !== t.previousIndex &&
                  ((l += c - (t.previousIndex - t.loopedSlides || 0)),
                  l > s.dynamicMainBullets - 1
                    ? (l = s.dynamicMainBullets - 1)
                    : l < 0 && (l = 0)),
                (n = Math.max(c - l, 0)),
                (o = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (p = (o + n) / 2)),
              i.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((e) => `${s.bulletActiveClass}${e}`)
                  .join(" ")
              ),
              a.length > 1)
            )
              i.each((e) => {
                const t = f(e),
                  i = t.index();
                i === c && t.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (i >= n &&
                      i <= o &&
                      t.addClass(`${s.bulletActiveClass}-main`),
                    i === n && d(t, "prev"),
                    i === o && d(t, "next"));
              });
            else {
              const e = i.eq(c),
                a = e.index();
              if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                const e = i.eq(n),
                  r = i.eq(o);
                for (let e = n; e <= o; e += 1)
                  i.eq(e).addClass(`${s.bulletActiveClass}-main`);
                if (t.params.loop)
                  if (a >= i.length) {
                    for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                      i.eq(i.length - e).addClass(
                        `${s.bulletActiveClass}-main`
                      );
                    i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                      `${s.bulletActiveClass}-prev`
                    );
                  } else d(e, "prev"), d(r, "next");
                else d(e, "prev"), d(r, "next");
              }
            }
            if (s.dynamicBullets) {
              const n = Math.min(i.length, s.dynamicMainBullets + 4),
                a = (r * n - r) / 2 - p * r,
                l = e ? "right" : "left";
              i.css(t.isHorizontal() ? l : "top", `${a}px`);
            }
          }
          if (
            ("fraction" === s.type &&
              (a.find(ne(s.currentClass)).text(s.formatFractionCurrent(c + 1)),
              a.find(ne(s.totalClass)).text(s.formatFractionTotal(p))),
            "progressbar" === s.type)
          ) {
            let e;
            e = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
              ? "horizontal"
              : "vertical";
            const i = (c + 1) / p;
            let n = 1,
              r = 1;
            "horizontal" === e ? (n = i) : (r = i),
              a
                .find(ne(s.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${r})`)
                .transition(t.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (a.html(s.renderCustom(t, c + 1, p)), n("paginationRender", a[0]))
            : n("paginationUpdate", a[0]),
            t.params.watchOverflow &&
              t.enabled &&
              a[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
        }
        function p() {
          const e = t.params.pagination;
          if (o()) return;
          const s =
              t.virtual && t.params.virtual.enabled
                ? t.virtual.slides.length
                : t.slides.length,
            i = t.pagination.$el;
          let a = "";
          if ("bullets" === e.type) {
            let n = t.params.loop
              ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
              : t.snapGrid.length;
            t.params.freeMode &&
              t.params.freeMode.enabled &&
              !t.params.loop &&
              n > s &&
              (n = s);
            for (let s = 0; s < n; s += 1)
              e.renderBullet
                ? (a += e.renderBullet.call(t, s, e.bulletClass))
                : (a += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
            i.html(a), (t.pagination.bullets = i.find(ne(e.bulletClass)));
          }
          "fraction" === e.type &&
            ((a = e.renderFraction
              ? e.renderFraction.call(t, e.currentClass, e.totalClass)
              : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            i.html(a)),
            "progressbar" === e.type &&
              ((a = e.renderProgressbar
                ? e.renderProgressbar.call(t, e.progressbarFillClass)
                : `<span class="${e.progressbarFillClass}"></span>`),
              i.html(a)),
            "custom" !== e.type && n("paginationRender", t.pagination.$el[0]);
        }
        function u() {
          t.params.pagination = ie(
            t,
            t.originalParams.pagination,
            t.params.pagination,
            { el: "swiper-pagination" }
          );
          const e = t.params.pagination;
          if (!e.el) return;
          let s = f(e.el);
          0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              s.length > 1 &&
              ((s = t.$el.find(e.el)),
              s.length > 1 &&
                (s = s.filter((e) => f(e).parents(".swiper")[0] === t.el))),
            "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
            s.addClass(e.modifierClass + e.type),
            s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            "bullets" === e.type &&
              e.dynamicBullets &&
              (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
              (l = 0),
              e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type &&
              e.progressbarOpposite &&
              s.addClass(e.progressbarOppositeClass),
            e.clickable &&
              s.on("click", ne(e.bulletClass), function (e) {
                e.preventDefault();
                let s = f(this).index() * t.params.slidesPerGroup;
                t.params.loop && (s += t.loopedSlides), t.slideTo(s);
              }),
            Object.assign(t.pagination, { $el: s, el: s[0] }),
            t.enabled || s.addClass(e.lockClass));
        }
        function h() {
          const e = t.params.pagination;
          if (o()) return;
          const s = t.pagination.$el;
          s.removeClass(e.hiddenClass),
            s.removeClass(e.modifierClass + e.type),
            s.removeClass(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass
            ),
            t.pagination.bullets &&
              t.pagination.bullets.removeClass &&
              t.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && s.off("click", ne(e.bulletClass));
        }
        i("init", () => {
          !1 === t.params.pagination.enabled ? m() : (u(), p(), c());
        }),
          i("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && c();
          }),
          i("snapIndexChange", () => {
            t.params.loop || c();
          }),
          i("slidesLengthChange", () => {
            t.params.loop && (p(), c());
          }),
          i("snapGridLengthChange", () => {
            t.params.loop || (p(), c());
          }),
          i("destroy", () => {
            h();
          }),
          i("enable disable", () => {
            const { $el: e } = t.pagination;
            e &&
              e[t.enabled ? "removeClass" : "addClass"](
                t.params.pagination.lockClass
              );
          }),
          i("lock unlock", () => {
            c();
          }),
          i("click", (e, s) => {
            const i = s.target,
              { $el: a } = t.pagination;
            if (
              t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              a &&
              a.length > 0 &&
              !f(i).hasClass(t.params.pagination.bulletClass)
            ) {
              if (
                t.navigation &&
                ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                  (t.navigation.prevEl && i === t.navigation.prevEl))
              )
                return;
              const e = a.hasClass(t.params.pagination.hiddenClass);
              n(!0 === e ? "paginationShow" : "paginationHide"),
                a.toggleClass(t.params.pagination.hiddenClass);
            }
          });
        const m = () => {
          t.$el.addClass(t.params.pagination.paginationDisabledClass),
            t.pagination.$el &&
              t.pagination.$el.addClass(
                t.params.pagination.paginationDisabledClass
              ),
            h();
        };
        Object.assign(t.pagination, {
          enable: () => {
            t.$el.removeClass(t.params.pagination.paginationDisabledClass),
              t.pagination.$el &&
                t.pagination.$el.removeClass(
                  t.params.pagination.paginationDisabledClass
                ),
              u(),
              p(),
              c();
          },
          disable: m,
          render: p,
          update: c,
          init: u,
          destroy: h,
        });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e;
        const l = n(),
          o = r();
        function d(e) {
          if (!t.enabled) return;
          const { rtlTranslate: s } = t;
          let i = e;
          i.originalEvent && (i = i.originalEvent);
          const n = i.keyCode || i.charCode,
            r = t.params.keyboard.pageUpDown,
            d = r && 33 === n,
            c = r && 34 === n,
            p = 37 === n,
            u = 39 === n,
            h = 38 === n,
            f = 40 === n;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && u) || (t.isVertical() && f) || c)
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && p) || (t.isVertical() && h) || d)
          )
            return !1;
          if (
            !(
              i.shiftKey ||
              i.altKey ||
              i.ctrlKey ||
              i.metaKey ||
              (l.activeElement &&
                l.activeElement.nodeName &&
                ("input" === l.activeElement.nodeName.toLowerCase() ||
                  "textarea" === l.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              t.params.keyboard.onlyInViewport &&
              (d || c || p || u || h || f)
            ) {
              let e = !1;
              if (
                t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
                0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
              )
                return;
              const i = t.$el,
                n = i[0].clientWidth,
                a = i[0].clientHeight,
                r = o.innerWidth,
                l = o.innerHeight,
                d = t.$el.offset();
              s && (d.left -= t.$el[0].scrollLeft);
              const c = [
                [d.left, d.top],
                [d.left + n, d.top],
                [d.left, d.top + a],
                [d.left + n, d.top + a],
              ];
              for (let t = 0; t < c.length; t += 1) {
                const s = c[t];
                if (s[0] >= 0 && s[0] <= r && s[1] >= 0 && s[1] <= l) {
                  if (0 === s[0] && 0 === s[1]) continue;
                  e = !0;
                }
              }
              if (!e) return;
            }
            t.isHorizontal()
              ? ((d || c || p || u) &&
                  (i.preventDefault
                    ? i.preventDefault()
                    : (i.returnValue = !1)),
                (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
                (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
              : ((d || c || h || f) &&
                  (i.preventDefault
                    ? i.preventDefault()
                    : (i.returnValue = !1)),
                (c || f) && t.slideNext(),
                (d || h) && t.slidePrev()),
              a("keyPress", n);
          }
        }
        function c() {
          t.keyboard.enabled ||
            (f(l).on("keydown", d), (t.keyboard.enabled = !0));
        }
        function p() {
          t.keyboard.enabled &&
            (f(l).off("keydown", d), (t.keyboard.enabled = !1));
        }
        (t.keyboard = { enabled: !1 }),
          s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
          i("init", () => {
            t.params.keyboard.enabled && c();
          }),
          i("destroy", () => {
            t.keyboard.enabled && p();
          }),
          Object.assign(t.keyboard, { enable: c, disable: p });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = r();
        let l;
        s({
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
          },
        }),
          (t.mousewheel = { enabled: !1 });
        let o,
          d = g();
        const c = [];
        function p() {
          t.enabled && (t.mouseEntered = !0);
        }
        function u() {
          t.enabled && (t.mouseEntered = !1);
        }
        function h(e) {
          return (
            !(
              t.params.mousewheel.thresholdDelta &&
              e.delta < t.params.mousewheel.thresholdDelta
            ) &&
            !(
              t.params.mousewheel.thresholdTime &&
              g() - d < t.params.mousewheel.thresholdTime
            ) &&
            ((e.delta >= 6 && g() - d < 60) ||
              (e.direction < 0
                ? (t.isEnd && !t.params.loop) ||
                  t.animating ||
                  (t.slideNext(), n("scroll", e.raw))
                : (t.isBeginning && !t.params.loop) ||
                  t.animating ||
                  (t.slidePrev(), n("scroll", e.raw)),
              (d = new a.Date().getTime()),
              !1))
          );
        }
        function v(e) {
          let s = e,
            i = !0;
          if (!t.enabled) return;
          const a = t.params.mousewheel;
          t.params.cssMode && s.preventDefault();
          let r = t.$el;
          if (
            ("container" !== t.params.mousewheel.eventsTarget &&
              (r = f(t.params.mousewheel.eventsTarget)),
            !t.mouseEntered && !r[0].contains(s.target) && !a.releaseOnEdges)
          )
            return !0;
          s.originalEvent && (s = s.originalEvent);
          let d = 0;
          const p = t.rtlTranslate ? -1 : 1,
            u = (function (e) {
              let t = 0,
                s = 0,
                i = 0,
                n = 0;
              return (
                "detail" in e && (s = e.detail),
                "wheelDelta" in e && (s = -e.wheelDelta / 120),
                "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                "axis" in e &&
                  e.axis === e.HORIZONTAL_AXIS &&
                  ((t = s), (s = 0)),
                (i = 10 * t),
                (n = 10 * s),
                "deltaY" in e && (n = e.deltaY),
                "deltaX" in e && (i = e.deltaX),
                e.shiftKey && !i && ((i = n), (n = 0)),
                (i || n) &&
                  e.deltaMode &&
                  (1 === e.deltaMode
                    ? ((i *= 40), (n *= 40))
                    : ((i *= 800), (n *= 800))),
                i && !t && (t = i < 1 ? -1 : 1),
                n && !s && (s = n < 1 ? -1 : 1),
                { spinX: t, spinY: s, pixelX: i, pixelY: n }
              );
            })(s);
          if (a.forceToAxis)
            if (t.isHorizontal()) {
              if (!(Math.abs(u.pixelX) > Math.abs(u.pixelY))) return !0;
              d = -u.pixelX * p;
            } else {
              if (!(Math.abs(u.pixelY) > Math.abs(u.pixelX))) return !0;
              d = -u.pixelY;
            }
          else
            d =
              Math.abs(u.pixelX) > Math.abs(u.pixelY)
                ? -u.pixelX * p
                : -u.pixelY;
          if (0 === d) return !0;
          a.invert && (d = -d);
          let v = t.getTranslate() + d * a.sensitivity;
          if (
            (v >= t.minTranslate() && (v = t.minTranslate()),
            v <= t.maxTranslate() && (v = t.maxTranslate()),
            (i =
              !!t.params.loop ||
              !(v === t.minTranslate() || v === t.maxTranslate())),
            i && t.params.nested && s.stopPropagation(),
            t.params.freeMode && t.params.freeMode.enabled)
          ) {
            const e = {
                time: g(),
                delta: Math.abs(d),
                direction: Math.sign(d),
              },
              i =
                o &&
                e.time < o.time + 500 &&
                e.delta <= o.delta &&
                e.direction === o.direction;
            if (!i) {
              (o = void 0), t.params.loop && t.loopFix();
              let r = t.getTranslate() + d * a.sensitivity;
              const p = t.isBeginning,
                u = t.isEnd;
              if (
                (r >= t.minTranslate() && (r = t.minTranslate()),
                r <= t.maxTranslate() && (r = t.maxTranslate()),
                t.setTransition(0),
                t.setTranslate(r),
                t.updateProgress(),
                t.updateActiveIndex(),
                t.updateSlidesClasses(),
                ((!p && t.isBeginning) || (!u && t.isEnd)) &&
                  t.updateSlidesClasses(),
                t.params.freeMode.sticky)
              ) {
                clearTimeout(l), (l = void 0), c.length >= 15 && c.shift();
                const s = c.length ? c[c.length - 1] : void 0,
                  i = c[0];
                if (
                  (c.push(e),
                  s && (e.delta > s.delta || e.direction !== s.direction))
                )
                  c.splice(0);
                else if (
                  c.length >= 15 &&
                  e.time - i.time < 500 &&
                  i.delta - e.delta >= 1 &&
                  e.delta <= 6
                ) {
                  const s = d > 0 ? 0.8 : 0.2;
                  (o = e),
                    c.splice(0),
                    (l = m(() => {
                      t.slideToClosest(t.params.speed, !0, void 0, s);
                    }, 0));
                }
                l ||
                  (l = m(() => {
                    (o = e),
                      c.splice(0),
                      t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                  }, 500));
              }
              if (
                (i || n("scroll", s),
                t.params.autoplay &&
                  t.params.autoplayDisableOnInteraction &&
                  t.autoplay.stop(),
                r === t.minTranslate() || r === t.maxTranslate())
              )
                return !0;
            }
          } else {
            const s = {
              time: g(),
              delta: Math.abs(d),
              direction: Math.sign(d),
              raw: e,
            };
            c.length >= 2 && c.shift();
            const i = c.length ? c[c.length - 1] : void 0;
            if (
              (c.push(s),
              i
                ? (s.direction !== i.direction ||
                    s.delta > i.delta ||
                    s.time > i.time + 150) &&
                  h(s)
                : h(s),
              (function (e) {
                const s = t.params.mousewheel;
                if (e.direction < 0) {
                  if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
                } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                  return !0;
                return !1;
              })(s))
            )
              return !0;
          }
          return (
            s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1
          );
        }
        function w(e) {
          let s = t.$el;
          "container" !== t.params.mousewheel.eventsTarget &&
            (s = f(t.params.mousewheel.eventsTarget)),
            s[e]("mouseenter", p),
            s[e]("mouseleave", u),
            s[e]("wheel", v);
        }
        function b() {
          return t.params.cssMode
            ? (t.wrapperEl.removeEventListener("wheel", v), !0)
            : !t.mousewheel.enabled &&
                (w("on"), (t.mousewheel.enabled = !0), !0);
        }
        function C() {
          return t.params.cssMode
            ? (t.wrapperEl.addEventListener(event, v), !0)
            : !!t.mousewheel.enabled &&
                (w("off"), (t.mousewheel.enabled = !1), !0);
        }
        i("init", () => {
          !t.params.mousewheel.enabled && t.params.cssMode && C(),
            t.params.mousewheel.enabled && b();
        }),
          i("destroy", () => {
            t.params.cssMode && b(), t.mousewheel.enabled && C();
          }),
          Object.assign(t.mousewheel, { enable: b, disable: C });
      },
    ],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: { el: ".swiper-pagination", clickable: !0, dynamicBullets: !0 },
    keyboard: { enabled: !0 },
    autoHeight: !0,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: !0,
    initialSlide: 1,
    loop: !0,
  });
  (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    });
})();
