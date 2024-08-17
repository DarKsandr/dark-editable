var fi = Object.defineProperty;
var pi = (n, t, e) => t in n ? fi(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var $ = (n, t, e) => (pi(n, typeof t != "symbol" ? t + "" : t, e), e);
var x = "top", R = "bottom", k = "right", I = "left", _e = "auto", Mt = [x, R, k, I], _t = "start", Nt = "end", os = "clippingParents", Qe = "viewport", At = "popper", as = "reference", Fe = /* @__PURE__ */ Mt.reduce(function(n, t) {
  return n.concat([t + "-" + _t, t + "-" + Nt]);
}, []), Je = /* @__PURE__ */ [].concat(Mt, [_e]).reduce(function(n, t) {
  return n.concat([t, t + "-" + _t, t + "-" + Nt]);
}, []), cs = "beforeRead", ls = "read", us = "afterRead", hs = "beforeMain", ds = "main", fs = "afterMain", ps = "beforeWrite", _s = "write", ms = "afterWrite", gs = [cs, ls, us, hs, ds, fs, ps, _s, ms];
function G(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function V(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var t = n.ownerDocument;
    return t && t.defaultView || window;
  }
  return n;
}
function mt(n) {
  var t = V(n).Element;
  return n instanceof t || n instanceof Element;
}
function H(n) {
  var t = V(n).HTMLElement;
  return n instanceof t || n instanceof HTMLElement;
}
function Ze(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = V(n).ShadowRoot;
  return n instanceof t || n instanceof ShadowRoot;
}
function _i(n) {
  var t = n.state;
  Object.keys(t.elements).forEach(function(e) {
    var s = t.styles[e] || {}, i = t.attributes[e] || {}, r = t.elements[e];
    !H(r) || !G(r) || (Object.assign(r.style, s), Object.keys(i).forEach(function(o) {
      var a = i[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function mi(n) {
  var t = n.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(s) {
      var i = t.elements[s], r = t.attributes[s] || {}, o = Object.keys(t.styles.hasOwnProperty(s) ? t.styles[s] : e[s]), a = o.reduce(function(l, h) {
        return l[h] = "", l;
      }, {});
      !H(i) || !G(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const tn = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: _i,
  effect: mi,
  requires: ["computeStyles"]
};
function U(n) {
  return n.split("-")[0];
}
var pt = Math.max, he = Math.min, St = Math.round;
function Ke() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Es() {
  return !/^((?!chrome|android).)*safari/i.test(Ke());
}
function Lt(n, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var s = n.getBoundingClientRect(), i = 1, r = 1;
  t && H(n) && (i = n.offsetWidth > 0 && St(s.width) / n.offsetWidth || 1, r = n.offsetHeight > 0 && St(s.height) / n.offsetHeight || 1);
  var o = mt(n) ? V(n) : window, a = o.visualViewport, l = !Es() && e, h = (s.left + (l && a ? a.offsetLeft : 0)) / i, u = (s.top + (l && a ? a.offsetTop : 0)) / r, p = s.width / i, _ = s.height / r;
  return {
    width: p,
    height: _,
    top: u,
    right: h + p,
    bottom: u + _,
    left: h,
    x: h,
    y: u
  };
}
function en(n) {
  var t = Lt(n), e = n.offsetWidth, s = n.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: e,
    height: s
  };
}
function vs(n, t) {
  var e = t.getRootNode && t.getRootNode();
  if (n.contains(t))
    return !0;
  if (e && Ze(e)) {
    var s = t;
    do {
      if (s && n.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function Q(n) {
  return V(n).getComputedStyle(n);
}
function gi(n) {
  return ["table", "td", "th"].indexOf(G(n)) >= 0;
}
function it(n) {
  return ((mt(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function me(n) {
  return G(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (Ze(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    it(n)
  );
}
function wn(n) {
  return !H(n) || // https://github.com/popperjs/popper-core/issues/837
  Q(n).position === "fixed" ? null : n.offsetParent;
}
function Ei(n) {
  var t = /firefox/i.test(Ke()), e = /Trident/i.test(Ke());
  if (e && H(n)) {
    var s = Q(n);
    if (s.position === "fixed")
      return null;
  }
  var i = me(n);
  for (Ze(i) && (i = i.host); H(i) && ["html", "body"].indexOf(G(i)) < 0; ) {
    var r = Q(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Kt(n) {
  for (var t = V(n), e = wn(n); e && gi(e) && Q(e).position === "static"; )
    e = wn(e);
  return e && (G(e) === "html" || G(e) === "body" && Q(e).position === "static") ? t : e || Ei(n) || t;
}
function nn(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function Bt(n, t, e) {
  return pt(n, he(t, e));
}
function vi(n, t, e) {
  var s = Bt(n, t, e);
  return s > e ? e : s;
}
function bs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ys(n) {
  return Object.assign({}, bs(), n);
}
function Ts(n, t) {
  return t.reduce(function(e, s) {
    return e[s] = n, e;
  }, {});
}
var bi = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, ys(typeof t != "number" ? t : Ts(t, Mt));
};
function yi(n) {
  var t, e = n.state, s = n.name, i = n.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, a = U(e.placement), l = nn(a), h = [I, k].indexOf(a) >= 0, u = h ? "height" : "width";
  if (!(!r || !o)) {
    var p = bi(i.padding, e), _ = en(r), f = l === "y" ? x : I, y = l === "y" ? R : k, m = e.rects.reference[u] + e.rects.reference[l] - o[l] - e.rects.popper[u], E = o[l] - e.rects.reference[l], T = Kt(r), w = T ? l === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0, O = m / 2 - E / 2, g = p[f], v = w - _[u] - p[y], b = w / 2 - _[u] / 2 + O, A = Bt(g, b, v), S = l;
    e.modifiersData[s] = (t = {}, t[S] = A, t.centerOffset = A - b, t);
  }
}
function Ti(n) {
  var t = n.state, e = n.options, s = e.element, i = s === void 0 ? "[data-popper-arrow]" : s;
  i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || vs(t.elements.popper, i) && (t.elements.arrow = i));
}
const As = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: yi,
  effect: Ti,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Dt(n) {
  return n.split("-")[1];
}
var Ai = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function wi(n, t) {
  var e = n.x, s = n.y, i = t.devicePixelRatio || 1;
  return {
    x: St(e * i) / i || 0,
    y: St(s * i) / i || 0
  };
}
function On(n) {
  var t, e = n.popper, s = n.popperRect, i = n.placement, r = n.variation, o = n.offsets, a = n.position, l = n.gpuAcceleration, h = n.adaptive, u = n.roundOffsets, p = n.isFixed, _ = o.x, f = _ === void 0 ? 0 : _, y = o.y, m = y === void 0 ? 0 : y, E = typeof u == "function" ? u({
    x: f,
    y: m
  }) : {
    x: f,
    y: m
  };
  f = E.x, m = E.y;
  var T = o.hasOwnProperty("x"), w = o.hasOwnProperty("y"), O = I, g = x, v = window;
  if (h) {
    var b = Kt(e), A = "clientHeight", S = "clientWidth";
    if (b === V(e) && (b = it(e), Q(b).position !== "static" && a === "absolute" && (A = "scrollHeight", S = "scrollWidth")), b = b, i === x || (i === I || i === k) && r === Nt) {
      g = R;
      var N = p && b === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        b[A]
      );
      m -= N - s.height, m *= l ? 1 : -1;
    }
    if (i === I || (i === x || i === R) && r === Nt) {
      O = k;
      var C = p && b === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        b[S]
      );
      f -= C - s.width, f *= l ? 1 : -1;
    }
  }
  var L = Object.assign({
    position: a
  }, h && Ai), j = u === !0 ? wi({
    x: f,
    y: m
  }, V(e)) : {
    x: f,
    y: m
  };
  if (f = j.x, m = j.y, l) {
    var D;
    return Object.assign({}, L, (D = {}, D[g] = w ? "0" : "", D[O] = T ? "0" : "", D.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", D));
  }
  return Object.assign({}, L, (t = {}, t[g] = w ? m + "px" : "", t[O] = T ? f + "px" : "", t.transform = "", t));
}
function Oi(n) {
  var t = n.state, e = n.options, s = e.gpuAcceleration, i = s === void 0 ? !0 : s, r = e.adaptive, o = r === void 0 ? !0 : r, a = e.roundOffsets, l = a === void 0 ? !0 : a, h = {
    placement: U(t.placement),
    variation: Dt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, On(Object.assign({}, h, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, On(Object.assign({}, h, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const sn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Oi,
  data: {}
};
var ee = {
  passive: !0
};
function Ci(n) {
  var t = n.state, e = n.instance, s = n.options, i = s.scroll, r = i === void 0 ? !0 : i, o = s.resize, a = o === void 0 ? !0 : o, l = V(t.elements.popper), h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && h.forEach(function(u) {
    u.addEventListener("scroll", e.update, ee);
  }), a && l.addEventListener("resize", e.update, ee), function() {
    r && h.forEach(function(u) {
      u.removeEventListener("scroll", e.update, ee);
    }), a && l.removeEventListener("resize", e.update, ee);
  };
}
const rn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ci,
  data: {}
};
var Ni = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ce(n) {
  return n.replace(/left|right|bottom|top/g, function(t) {
    return Ni[t];
  });
}
var Si = {
  start: "end",
  end: "start"
};
function Cn(n) {
  return n.replace(/start|end/g, function(t) {
    return Si[t];
  });
}
function on(n) {
  var t = V(n), e = t.pageXOffset, s = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: s
  };
}
function an(n) {
  return Lt(it(n)).left + on(n).scrollLeft;
}
function Li(n, t) {
  var e = V(n), s = it(n), i = e.visualViewport, r = s.clientWidth, o = s.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    var h = Es();
    (h || !h && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + an(n),
    y: l
  };
}
function Di(n) {
  var t, e = it(n), s = on(n), i = (t = n.ownerDocument) == null ? void 0 : t.body, r = pt(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = pt(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -s.scrollLeft + an(n), l = -s.scrollTop;
  return Q(i || e).direction === "rtl" && (a += pt(e.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: a,
    y: l
  };
}
function cn(n) {
  var t = Q(n), e = t.overflow, s = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + i + s);
}
function ws(n) {
  return ["html", "body", "#document"].indexOf(G(n)) >= 0 ? n.ownerDocument.body : H(n) && cn(n) ? n : ws(me(n));
}
function jt(n, t) {
  var e;
  t === void 0 && (t = []);
  var s = ws(n), i = s === ((e = n.ownerDocument) == null ? void 0 : e.body), r = V(s), o = i ? [r].concat(r.visualViewport || [], cn(s) ? s : []) : s, a = t.concat(o);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(jt(me(o)))
  );
}
function Ue(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function $i(n, t) {
  var e = Lt(n, !1, t === "fixed");
  return e.top = e.top + n.clientTop, e.left = e.left + n.clientLeft, e.bottom = e.top + n.clientHeight, e.right = e.left + n.clientWidth, e.width = n.clientWidth, e.height = n.clientHeight, e.x = e.left, e.y = e.top, e;
}
function Nn(n, t, e) {
  return t === Qe ? Ue(Li(n, e)) : mt(t) ? $i(t, e) : Ue(Di(it(n)));
}
function xi(n) {
  var t = jt(me(n)), e = ["absolute", "fixed"].indexOf(Q(n).position) >= 0, s = e && H(n) ? Kt(n) : n;
  return mt(s) ? t.filter(function(i) {
    return mt(i) && vs(i, s) && G(i) !== "body";
  }) : [];
}
function Ii(n, t, e, s) {
  var i = t === "clippingParents" ? xi(n) : [].concat(t), r = [].concat(i, [e]), o = r[0], a = r.reduce(function(l, h) {
    var u = Nn(n, h, s);
    return l.top = pt(u.top, l.top), l.right = he(u.right, l.right), l.bottom = he(u.bottom, l.bottom), l.left = pt(u.left, l.left), l;
  }, Nn(n, o, s));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Os(n) {
  var t = n.reference, e = n.element, s = n.placement, i = s ? U(s) : null, r = s ? Dt(s) : null, o = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, l;
  switch (i) {
    case x:
      l = {
        x: o,
        y: t.y - e.height
      };
      break;
    case R:
      l = {
        x: o,
        y: t.y + t.height
      };
      break;
    case k:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case I:
      l = {
        x: t.x - e.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var h = i ? nn(i) : null;
  if (h != null) {
    var u = h === "y" ? "height" : "width";
    switch (r) {
      case _t:
        l[h] = l[h] - (t[u] / 2 - e[u] / 2);
        break;
      case Nt:
        l[h] = l[h] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return l;
}
function $t(n, t) {
  t === void 0 && (t = {});
  var e = t, s = e.placement, i = s === void 0 ? n.placement : s, r = e.strategy, o = r === void 0 ? n.strategy : r, a = e.boundary, l = a === void 0 ? os : a, h = e.rootBoundary, u = h === void 0 ? Qe : h, p = e.elementContext, _ = p === void 0 ? At : p, f = e.altBoundary, y = f === void 0 ? !1 : f, m = e.padding, E = m === void 0 ? 0 : m, T = ys(typeof E != "number" ? E : Ts(E, Mt)), w = _ === At ? as : At, O = n.rects.popper, g = n.elements[y ? w : _], v = Ii(mt(g) ? g : g.contextElement || it(n.elements.popper), l, u, o), b = Lt(n.elements.reference), A = Os({
    reference: b,
    element: O,
    strategy: "absolute",
    placement: i
  }), S = Ue(Object.assign({}, O, A)), N = _ === At ? S : b, C = {
    top: v.top - N.top + T.top,
    bottom: N.bottom - v.bottom + T.bottom,
    left: v.left - N.left + T.left,
    right: N.right - v.right + T.right
  }, L = n.modifiersData.offset;
  if (_ === At && L) {
    var j = L[i];
    Object.keys(C).forEach(function(D) {
      var at = [k, R].indexOf(D) >= 0 ? 1 : -1, ct = [x, R].indexOf(D) >= 0 ? "y" : "x";
      C[D] += j[ct] * at;
    });
  }
  return C;
}
function Mi(n, t) {
  t === void 0 && (t = {});
  var e = t, s = e.placement, i = e.boundary, r = e.rootBoundary, o = e.padding, a = e.flipVariations, l = e.allowedAutoPlacements, h = l === void 0 ? Je : l, u = Dt(s), p = u ? a ? Fe : Fe.filter(function(y) {
    return Dt(y) === u;
  }) : Mt, _ = p.filter(function(y) {
    return h.indexOf(y) >= 0;
  });
  _.length === 0 && (_ = p);
  var f = _.reduce(function(y, m) {
    return y[m] = $t(n, {
      placement: m,
      boundary: i,
      rootBoundary: r,
      padding: o
    })[U(m)], y;
  }, {});
  return Object.keys(f).sort(function(y, m) {
    return f[y] - f[m];
  });
}
function Pi(n) {
  if (U(n) === _e)
    return [];
  var t = ce(n);
  return [Cn(n), t, Cn(t)];
}
function Ri(n) {
  var t = n.state, e = n.options, s = n.name;
  if (!t.modifiersData[s]._skip) {
    for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, a = o === void 0 ? !0 : o, l = e.fallbackPlacements, h = e.padding, u = e.boundary, p = e.rootBoundary, _ = e.altBoundary, f = e.flipVariations, y = f === void 0 ? !0 : f, m = e.allowedAutoPlacements, E = t.options.placement, T = U(E), w = T === E, O = l || (w || !y ? [ce(E)] : Pi(E)), g = [E].concat(O).reduce(function(bt, Z) {
      return bt.concat(U(Z) === _e ? Mi(t, {
        placement: Z,
        boundary: u,
        rootBoundary: p,
        padding: h,
        flipVariations: y,
        allowedAutoPlacements: m
      }) : Z);
    }, []), v = t.rects.reference, b = t.rects.popper, A = /* @__PURE__ */ new Map(), S = !0, N = g[0], C = 0; C < g.length; C++) {
      var L = g[C], j = U(L), D = Dt(L) === _t, at = [x, R].indexOf(j) >= 0, ct = at ? "width" : "height", P = $t(t, {
        placement: L,
        boundary: u,
        rootBoundary: p,
        altBoundary: _,
        padding: h
      }), F = at ? D ? k : I : D ? R : x;
      v[ct] > b[ct] && (F = ce(F));
      var Xt = ce(F), lt = [];
      if (r && lt.push(P[j] <= 0), a && lt.push(P[F] <= 0, P[Xt] <= 0), lt.every(function(bt) {
        return bt;
      })) {
        N = L, S = !1;
        break;
      }
      A.set(L, lt);
    }
    if (S)
      for (var Qt = y ? 3 : 1, Oe = function(Z) {
        var Ht = g.find(function(Zt) {
          var ut = A.get(Zt);
          if (ut)
            return ut.slice(0, Z).every(function(Ce) {
              return Ce;
            });
        });
        if (Ht)
          return N = Ht, "break";
      }, Vt = Qt; Vt > 0; Vt--) {
        var Jt = Oe(Vt);
        if (Jt === "break")
          break;
      }
    t.placement !== N && (t.modifiersData[s]._skip = !0, t.placement = N, t.reset = !0);
  }
}
const Cs = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ri,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Sn(n, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: n.top - t.height - e.y,
    right: n.right - t.width + e.x,
    bottom: n.bottom - t.height + e.y,
    left: n.left - t.width - e.x
  };
}
function Ln(n) {
  return [x, k, R, I].some(function(t) {
    return n[t] >= 0;
  });
}
function ki(n) {
  var t = n.state, e = n.name, s = t.rects.reference, i = t.rects.popper, r = t.modifiersData.preventOverflow, o = $t(t, {
    elementContext: "reference"
  }), a = $t(t, {
    altBoundary: !0
  }), l = Sn(o, s), h = Sn(a, i, r), u = Ln(l), p = Ln(h);
  t.modifiersData[e] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: h,
    isReferenceHidden: u,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": p
  });
}
const Ns = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ki
};
function Vi(n, t, e) {
  var s = U(n), i = [I, x].indexOf(s) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: n
  })) : e, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * i, [I, k].indexOf(s) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function Hi(n) {
  var t = n.state, e = n.options, s = n.name, i = e.offset, r = i === void 0 ? [0, 0] : i, o = Je.reduce(function(u, p) {
    return u[p] = Vi(p, t.rects, r), u;
  }, {}), a = o[t.placement], l = a.x, h = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += h), t.modifiersData[s] = o;
}
const Ss = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Hi
};
function Wi(n) {
  var t = n.state, e = n.name;
  t.modifiersData[e] = Os({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const ln = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Wi,
  data: {}
};
function Yi(n) {
  return n === "x" ? "y" : "x";
}
function Bi(n) {
  var t = n.state, e = n.options, s = n.name, i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, a = o === void 0 ? !1 : o, l = e.boundary, h = e.rootBoundary, u = e.altBoundary, p = e.padding, _ = e.tether, f = _ === void 0 ? !0 : _, y = e.tetherOffset, m = y === void 0 ? 0 : y, E = $t(t, {
    boundary: l,
    rootBoundary: h,
    padding: p,
    altBoundary: u
  }), T = U(t.placement), w = Dt(t.placement), O = !w, g = nn(T), v = Yi(g), b = t.modifiersData.popperOffsets, A = t.rects.reference, S = t.rects.popper, N = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, C = typeof N == "number" ? {
    mainAxis: N,
    altAxis: N
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, N), L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (b) {
    if (r) {
      var D, at = g === "y" ? x : I, ct = g === "y" ? R : k, P = g === "y" ? "height" : "width", F = b[g], Xt = F + E[at], lt = F - E[ct], Qt = f ? -S[P] / 2 : 0, Oe = w === _t ? A[P] : S[P], Vt = w === _t ? -S[P] : -A[P], Jt = t.elements.arrow, bt = f && Jt ? en(Jt) : {
        width: 0,
        height: 0
      }, Z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : bs(), Ht = Z[at], Zt = Z[ct], ut = Bt(0, A[P], bt[P]), Ce = O ? A[P] / 2 - Qt - ut - Ht - C.mainAxis : Oe - ut - Ht - C.mainAxis, ai = O ? -A[P] / 2 + Qt + ut + Zt + C.mainAxis : Vt + ut + Zt + C.mainAxis, Ne = t.elements.arrow && Kt(t.elements.arrow), ci = Ne ? g === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0 : 0, _n = (D = L == null ? void 0 : L[g]) != null ? D : 0, li = F + Ce - _n - ci, ui = F + ai - _n, mn = Bt(f ? he(Xt, li) : Xt, F, f ? pt(lt, ui) : lt);
      b[g] = mn, j[g] = mn - F;
    }
    if (a) {
      var gn, hi = g === "x" ? x : I, di = g === "x" ? R : k, ht = b[v], te = v === "y" ? "height" : "width", En = ht + E[hi], vn = ht - E[di], Se = [x, I].indexOf(T) !== -1, bn = (gn = L == null ? void 0 : L[v]) != null ? gn : 0, yn = Se ? En : ht - A[te] - S[te] - bn + C.altAxis, Tn = Se ? ht + A[te] + S[te] - bn - C.altAxis : vn, An = f && Se ? vi(yn, ht, Tn) : Bt(f ? yn : En, ht, f ? Tn : vn);
      b[v] = An, j[v] = An - ht;
    }
    t.modifiersData[s] = j;
  }
}
const Ls = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Bi,
  requiresIfExists: ["offset"]
};
function ji(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function Fi(n) {
  return n === V(n) || !H(n) ? on(n) : ji(n);
}
function Ki(n) {
  var t = n.getBoundingClientRect(), e = St(t.width) / n.offsetWidth || 1, s = St(t.height) / n.offsetHeight || 1;
  return e !== 1 || s !== 1;
}
function Ui(n, t, e) {
  e === void 0 && (e = !1);
  var s = H(t), i = H(t) && Ki(t), r = it(t), o = Lt(n, i, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (s || !s && !e) && ((G(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  cn(r)) && (a = Fi(t)), H(t) ? (l = Lt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : r && (l.x = an(r))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function zi(n) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), s = [];
  n.forEach(function(r) {
    t.set(r.name, r);
  });
  function i(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(a) {
      if (!e.has(a)) {
        var l = t.get(a);
        l && i(l);
      }
    }), s.push(r);
  }
  return n.forEach(function(r) {
    e.has(r.name) || i(r);
  }), s;
}
function Gi(n) {
  var t = zi(n);
  return gs.reduce(function(e, s) {
    return e.concat(t.filter(function(i) {
      return i.phase === s;
    }));
  }, []);
}
function qi(n) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(n());
      });
    })), t;
  };
}
function Xi(n) {
  var t = n.reduce(function(e, s) {
    var i = e[s.name];
    return e[s.name] = i ? Object.assign({}, i, s, {
      options: Object.assign({}, i.options, s.options),
      data: Object.assign({}, i.data, s.data)
    }) : s, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var Dn = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function $n() {
  for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
    t[e] = arguments[e];
  return !t.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function ge(n) {
  n === void 0 && (n = {});
  var t = n, e = t.defaultModifiers, s = e === void 0 ? [] : e, i = t.defaultOptions, r = i === void 0 ? Dn : i;
  return function(a, l, h) {
    h === void 0 && (h = r);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Dn, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, p = [], _ = !1, f = {
      state: u,
      setOptions: function(T) {
        var w = typeof T == "function" ? T(u.options) : T;
        m(), u.options = Object.assign({}, r, u.options, w), u.scrollParents = {
          reference: mt(a) ? jt(a) : a.contextElement ? jt(a.contextElement) : [],
          popper: jt(l)
        };
        var O = Gi(Xi([].concat(s, u.options.modifiers)));
        return u.orderedModifiers = O.filter(function(g) {
          return g.enabled;
        }), y(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!_) {
          var T = u.elements, w = T.reference, O = T.popper;
          if ($n(w, O)) {
            u.rects = {
              reference: Ui(w, Kt(O), u.options.strategy === "fixed"),
              popper: en(O)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(C) {
              return u.modifiersData[C.name] = Object.assign({}, C.data);
            });
            for (var g = 0; g < u.orderedModifiers.length; g++) {
              if (u.reset === !0) {
                u.reset = !1, g = -1;
                continue;
              }
              var v = u.orderedModifiers[g], b = v.fn, A = v.options, S = A === void 0 ? {} : A, N = v.name;
              typeof b == "function" && (u = b({
                state: u,
                options: S,
                name: N,
                instance: f
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: qi(function() {
        return new Promise(function(E) {
          f.forceUpdate(), E(u);
        });
      }),
      destroy: function() {
        m(), _ = !0;
      }
    };
    if (!$n(a, l))
      return f;
    f.setOptions(h).then(function(E) {
      !_ && h.onFirstUpdate && h.onFirstUpdate(E);
    });
    function y() {
      u.orderedModifiers.forEach(function(E) {
        var T = E.name, w = E.options, O = w === void 0 ? {} : w, g = E.effect;
        if (typeof g == "function") {
          var v = g({
            state: u,
            name: T,
            instance: f,
            options: O
          }), b = function() {
          };
          p.push(v || b);
        }
      });
    }
    function m() {
      p.forEach(function(E) {
        return E();
      }), p = [];
    }
    return f;
  };
}
var Qi = /* @__PURE__ */ ge(), Ji = [rn, ln, sn, tn], Zi = /* @__PURE__ */ ge({
  defaultModifiers: Ji
}), tr = [rn, ln, sn, tn, Ss, Cs, Ls, As, Ns], un = /* @__PURE__ */ ge({
  defaultModifiers: tr
});
const Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: fs,
  afterRead: us,
  afterWrite: ms,
  applyStyles: tn,
  arrow: As,
  auto: _e,
  basePlacements: Mt,
  beforeMain: hs,
  beforeRead: cs,
  beforeWrite: ps,
  bottom: R,
  clippingParents: os,
  computeStyles: sn,
  createPopper: un,
  createPopperBase: Qi,
  createPopperLite: Zi,
  detectOverflow: $t,
  end: Nt,
  eventListeners: rn,
  flip: Cs,
  hide: Ns,
  left: I,
  main: ds,
  modifierPhases: gs,
  offset: Ss,
  placements: Je,
  popper: At,
  popperGenerator: ge,
  popperOffsets: ln,
  preventOverflow: Ls,
  read: ls,
  reference: as,
  right: k,
  start: _t,
  top: x,
  variationPlacements: Fe,
  viewport: Qe,
  write: _s
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const tt = /* @__PURE__ */ new Map(), Le = {
  set(n, t, e) {
    tt.has(n) || tt.set(n, /* @__PURE__ */ new Map());
    const s = tt.get(n);
    if (!s.has(t) && s.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
      return;
    }
    s.set(t, e);
  },
  get(n, t) {
    return tt.has(n) && tt.get(n).get(t) || null;
  },
  remove(n, t) {
    if (!tt.has(n))
      return;
    const e = tt.get(n);
    e.delete(t), e.size === 0 && tt.delete(n);
  }
}, er = 1e6, nr = 1e3, ze = "transitionend", $s = (n) => (n && window.CSS && window.CSS.escape && (n = n.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), n), sr = (n) => n == null ? `${n}` : Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase(), ir = (n) => {
  do
    n += Math.floor(Math.random() * er);
  while (document.getElementById(n));
  return n;
}, rr = (n) => {
  if (!n)
    return 0;
  let {
    transitionDuration: t,
    transitionDelay: e
  } = window.getComputedStyle(n);
  const s = Number.parseFloat(t), i = Number.parseFloat(e);
  return !s && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * nr);
}, xs = (n) => {
  n.dispatchEvent(new Event(ze));
}, q = (n) => !n || typeof n != "object" ? !1 : (typeof n.jquery < "u" && (n = n[0]), typeof n.nodeType < "u"), et = (n) => q(n) ? n.jquery ? n[0] : n : typeof n == "string" && n.length > 0 ? document.querySelector($s(n)) : null, Pt = (n) => {
  if (!q(n) || n.getClientRects().length === 0)
    return !1;
  const t = getComputedStyle(n).getPropertyValue("visibility") === "visible", e = n.closest("details:not([open])");
  if (!e)
    return t;
  if (e !== n) {
    const s = n.closest("summary");
    if (s && s.parentNode !== e || s === null)
      return !1;
  }
  return t;
}, nt = (n) => !n || n.nodeType !== Node.ELEMENT_NODE || n.classList.contains("disabled") ? !0 : typeof n.disabled < "u" ? n.disabled : n.hasAttribute("disabled") && n.getAttribute("disabled") !== "false", Is = (n) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof n.getRootNode == "function") {
    const t = n.getRootNode();
    return t instanceof ShadowRoot ? t : null;
  }
  return n instanceof ShadowRoot ? n : n.parentNode ? Is(n.parentNode) : null;
}, de = () => {
}, Ut = (n) => {
  n.offsetHeight;
}, Ms = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, De = [], or = (n) => {
  document.readyState === "loading" ? (De.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of De)
      t();
  }), De.push(n)) : n();
}, W = () => document.documentElement.dir === "rtl", B = (n) => {
  or(() => {
    const t = Ms();
    if (t) {
      const e = n.NAME, s = t.fn[e];
      t.fn[e] = n.jQueryInterface, t.fn[e].Constructor = n, t.fn[e].noConflict = () => (t.fn[e] = s, n.jQueryInterface);
    }
  });
}, M = (n, t = [], e = n) => typeof n == "function" ? n(...t) : e, Ps = (n, t, e = !0) => {
  if (!e) {
    M(n);
    return;
  }
  const s = 5, i = rr(t) + s;
  let r = !1;
  const o = ({
    target: a
  }) => {
    a === t && (r = !0, t.removeEventListener(ze, o), M(n));
  };
  t.addEventListener(ze, o), setTimeout(() => {
    r || xs(t);
  }, i);
}, hn = (n, t, e, s) => {
  const i = n.length;
  let r = n.indexOf(t);
  return r === -1 ? !e && s ? n[i - 1] : n[0] : (r += e ? 1 : -1, s && (r = (r + i) % i), n[Math.max(0, Math.min(r, i - 1))]);
}, ar = /[^.]*(?=\..*)\.|.*/, cr = /\..*/, lr = /::\d+$/, $e = {};
let xn = 1;
const Rs = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, ur = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function ks(n, t) {
  return t && `${t}::${xn++}` || n.uidEvent || xn++;
}
function Vs(n) {
  const t = ks(n);
  return n.uidEvent = t, $e[t] = $e[t] || {}, $e[t];
}
function hr(n, t) {
  return function e(s) {
    return dn(s, {
      delegateTarget: n
    }), e.oneOff && c.off(n, s.type, t), t.apply(n, [s]);
  };
}
function dr(n, t, e) {
  return function s(i) {
    const r = n.querySelectorAll(t);
    for (let {
      target: o
    } = i; o && o !== this; o = o.parentNode)
      for (const a of r)
        if (a === o)
          return dn(i, {
            delegateTarget: o
          }), s.oneOff && c.off(n, i.type, t, e), e.apply(o, [i]);
  };
}
function Hs(n, t, e = null) {
  return Object.values(n).find((s) => s.callable === t && s.delegationSelector === e);
}
function Ws(n, t, e) {
  const s = typeof t == "string", i = s ? e : t || e;
  let r = Ys(n);
  return ur.has(r) || (r = n), [s, i, r];
}
function In(n, t, e, s, i) {
  if (typeof t != "string" || !n)
    return;
  let [r, o, a] = Ws(t, e, s);
  t in Rs && (o = ((y) => function(m) {
    if (!m.relatedTarget || m.relatedTarget !== m.delegateTarget && !m.delegateTarget.contains(m.relatedTarget))
      return y.call(this, m);
  })(o));
  const l = Vs(n), h = l[a] || (l[a] = {}), u = Hs(h, o, r ? e : null);
  if (u) {
    u.oneOff = u.oneOff && i;
    return;
  }
  const p = ks(o, t.replace(ar, "")), _ = r ? dr(n, e, o) : hr(n, o);
  _.delegationSelector = r ? e : null, _.callable = o, _.oneOff = i, _.uidEvent = p, h[p] = _, n.addEventListener(a, _, r);
}
function Ge(n, t, e, s, i) {
  const r = Hs(t[e], s, i);
  r && (n.removeEventListener(e, r, !!i), delete t[e][r.uidEvent]);
}
function fr(n, t, e, s) {
  const i = t[e] || {};
  for (const [r, o] of Object.entries(i))
    r.includes(s) && Ge(n, t, e, o.callable, o.delegationSelector);
}
function Ys(n) {
  return n = n.replace(cr, ""), Rs[n] || n;
}
const c = {
  on(n, t, e, s) {
    In(n, t, e, s, !1);
  },
  one(n, t, e, s) {
    In(n, t, e, s, !0);
  },
  off(n, t, e, s) {
    if (typeof t != "string" || !n)
      return;
    const [i, r, o] = Ws(t, e, s), a = o !== t, l = Vs(n), h = l[o] || {}, u = t.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(h).length)
        return;
      Ge(n, l, o, r, i ? e : null);
      return;
    }
    if (u)
      for (const p of Object.keys(l))
        fr(n, l, p, t.slice(1));
    for (const [p, _] of Object.entries(h)) {
      const f = p.replace(lr, "");
      (!a || t.includes(f)) && Ge(n, l, o, _.callable, _.delegationSelector);
    }
  },
  trigger(n, t, e) {
    if (typeof t != "string" || !n)
      return null;
    const s = Ms(), i = Ys(t), r = t !== i;
    let o = null, a = !0, l = !0, h = !1;
    r && s && (o = s.Event(t, e), s(n).trigger(o), a = !o.isPropagationStopped(), l = !o.isImmediatePropagationStopped(), h = o.isDefaultPrevented());
    const u = dn(new Event(t, {
      bubbles: a,
      cancelable: !0
    }), e);
    return h && u.preventDefault(), l && n.dispatchEvent(u), u.defaultPrevented && o && o.preventDefault(), u;
  }
};
function dn(n, t = {}) {
  for (const [e, s] of Object.entries(t))
    try {
      n[e] = s;
    } catch {
      Object.defineProperty(n, e, {
        configurable: !0,
        get() {
          return s;
        }
      });
    }
  return n;
}
function Mn(n) {
  if (n === "true")
    return !0;
  if (n === "false")
    return !1;
  if (n === Number(n).toString())
    return Number(n);
  if (n === "" || n === "null")
    return null;
  if (typeof n != "string")
    return n;
  try {
    return JSON.parse(decodeURIComponent(n));
  } catch {
    return n;
  }
}
function xe(n) {
  return n.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const X = {
  setDataAttribute(n, t, e) {
    n.setAttribute(`data-bs-${xe(t)}`, e);
  },
  removeDataAttribute(n, t) {
    n.removeAttribute(`data-bs-${xe(t)}`);
  },
  getDataAttributes(n) {
    if (!n)
      return {};
    const t = {}, e = Object.keys(n.dataset).filter((s) => s.startsWith("bs") && !s.startsWith("bsConfig"));
    for (const s of e) {
      let i = s.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Mn(n.dataset[s]);
    }
    return t;
  },
  getDataAttribute(n, t) {
    return Mn(n.getAttribute(`data-bs-${xe(t)}`));
  }
};
class zt {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, e) {
    const s = q(e) ? X.getDataAttribute(e, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof s == "object" ? s : {},
      ...q(e) ? X.getDataAttributes(e) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, e = this.constructor.DefaultType) {
    for (const [s, i] of Object.entries(e)) {
      const r = t[s], o = q(r) ? "element" : sr(r);
      if (!new RegExp(i).test(o))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${i}".`);
    }
  }
}
const pr = "5.3.3";
class K extends zt {
  constructor(t, e) {
    super(), t = et(t), t && (this._element = t, this._config = this._getConfig(e), Le.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Le.remove(this._element, this.constructor.DATA_KEY), c.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, e, s = !0) {
    Ps(t, e, s);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Le.get(et(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, e = {}) {
    return this.getInstance(t) || new this(t, typeof e == "object" ? e : null);
  }
  static get VERSION() {
    return pr;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Ie = (n) => {
  let t = n.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let e = n.getAttribute("href");
    if (!e || !e.includes("#") && !e.startsWith("."))
      return null;
    e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? e.trim() : null;
  }
  return t ? t.split(",").map((e) => $s(e)).join(",") : null;
}, d = {
  find(n, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, n));
  },
  findOne(n, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, n);
  },
  children(n, t) {
    return [].concat(...n.children).filter((e) => e.matches(t));
  },
  parents(n, t) {
    const e = [];
    let s = n.parentNode.closest(t);
    for (; s; )
      e.push(s), s = s.parentNode.closest(t);
    return e;
  },
  prev(n, t) {
    let e = n.previousElementSibling;
    for (; e; ) {
      if (e.matches(t))
        return [e];
      e = e.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(n, t) {
    let e = n.nextElementSibling;
    for (; e; ) {
      if (e.matches(t))
        return [e];
      e = e.nextElementSibling;
    }
    return [];
  },
  focusableChildren(n) {
    const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((e) => `${e}:not([tabindex^="-"])`).join(",");
    return this.find(t, n).filter((e) => !nt(e) && Pt(e));
  },
  getSelectorFromElement(n) {
    const t = Ie(n);
    return t && d.findOne(t) ? t : null;
  },
  getElementFromSelector(n) {
    const t = Ie(n);
    return t ? d.findOne(t) : null;
  },
  getMultipleElementsFromSelector(n) {
    const t = Ie(n);
    return t ? d.find(t) : [];
  }
}, Ee = (n, t = "hide") => {
  const e = `click.dismiss${n.EVENT_KEY}`, s = n.NAME;
  c.on(document, e, `[data-bs-dismiss="${s}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), nt(this))
      return;
    const r = d.getElementFromSelector(this) || this.closest(`.${s}`);
    n.getOrCreateInstance(r)[t]();
  });
}, _r = "alert", mr = "bs.alert", Bs = `.${mr}`, gr = `close${Bs}`, Er = `closed${Bs}`, vr = "fade", br = "show";
class ve extends K {
  // Getters
  static get NAME() {
    return _r;
  }
  // Public
  close() {
    if (c.trigger(this._element, gr).defaultPrevented)
      return;
    this._element.classList.remove(br);
    const e = this._element.classList.contains(vr);
    this._queueCallback(() => this._destroyElement(), this._element, e);
  }
  // Private
  _destroyElement() {
    this._element.remove(), c.trigger(this._element, Er), this.dispose();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ve.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Ee(ve, "close");
B(ve);
const yr = "button", Tr = "bs.button", Ar = `.${Tr}`, wr = ".data-api", Or = "active", Pn = '[data-bs-toggle="button"]', Cr = `click${Ar}${wr}`;
class be extends K {
  // Getters
  static get NAME() {
    return yr;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Or));
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = be.getOrCreateInstance(this);
      t === "toggle" && e[t]();
    });
  }
}
c.on(document, Cr, Pn, (n) => {
  n.preventDefault();
  const t = n.target.closest(Pn);
  be.getOrCreateInstance(t).toggle();
});
B(be);
const Nr = "swipe", Rt = ".bs.swipe", Sr = `touchstart${Rt}`, Lr = `touchmove${Rt}`, Dr = `touchend${Rt}`, $r = `pointerdown${Rt}`, xr = `pointerup${Rt}`, Ir = "touch", Mr = "pen", Pr = "pointer-event", Rr = 40, kr = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, Vr = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class fe extends zt {
  constructor(t, e) {
    super(), this._element = t, !(!t || !fe.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return kr;
  }
  static get DefaultType() {
    return Vr;
  }
  static get NAME() {
    return Nr;
  }
  // Public
  dispose() {
    c.off(this._element, Rt);
  }
  // Private
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), M(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Rr)
      return;
    const e = t / this._deltaX;
    this._deltaX = 0, e && M(e > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (c.on(this._element, $r, (t) => this._start(t)), c.on(this._element, xr, (t) => this._end(t)), this._element.classList.add(Pr)) : (c.on(this._element, Sr, (t) => this._start(t)), c.on(this._element, Lr, (t) => this._move(t)), c.on(this._element, Dr, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === Mr || t.pointerType === Ir);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const Hr = "carousel", Wr = "bs.carousel", rt = `.${Wr}`, js = ".data-api", Yr = "ArrowLeft", Br = "ArrowRight", jr = 500, Wt = "next", yt = "prev", wt = "left", le = "right", Fr = `slide${rt}`, Me = `slid${rt}`, Kr = `keydown${rt}`, Ur = `mouseenter${rt}`, zr = `mouseleave${rt}`, Gr = `dragstart${rt}`, qr = `load${rt}${js}`, Xr = `click${rt}${js}`, Fs = "carousel", ne = "active", Qr = "slide", Jr = "carousel-item-end", Zr = "carousel-item-start", to = "carousel-item-next", eo = "carousel-item-prev", Ks = ".active", Us = ".carousel-item", no = Ks + Us, so = ".carousel-item img", io = ".carousel-indicators", ro = "[data-bs-slide], [data-bs-slide-to]", oo = '[data-bs-ride="carousel"]', ao = {
  [Yr]: le,
  [Br]: wt
}, co = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, lo = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Gt extends K {
  constructor(t, e) {
    super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = d.findOne(io, this._element), this._addEventListeners(), this._config.ride === Fs && this.cycle();
  }
  // Getters
  static get Default() {
    return co;
  }
  static get DefaultType() {
    return lo;
  }
  static get NAME() {
    return Hr;
  }
  // Public
  next() {
    this._slide(Wt);
  }
  nextWhenVisible() {
    !document.hidden && Pt(this._element) && this.next();
  }
  prev() {
    this._slide(yt);
  }
  pause() {
    this._isSliding && xs(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        c.one(this._element, Me, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const e = this._getItems();
    if (t > e.length - 1 || t < 0)
      return;
    if (this._isSliding) {
      c.one(this._element, Me, () => this.to(t));
      return;
    }
    const s = this._getItemIndex(this._getActive());
    if (s === t)
      return;
    const i = t > s ? Wt : yt;
    this._slide(i, e[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  // Private
  _configAfterMerge(t) {
    return t.defaultInterval = t.interval, t;
  }
  _addEventListeners() {
    this._config.keyboard && c.on(this._element, Kr, (t) => this._keydown(t)), this._config.pause === "hover" && (c.on(this._element, Ur, () => this.pause()), c.on(this._element, zr, () => this._maybeEnableCycle())), this._config.touch && fe.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const s of d.find(so, this._element))
      c.on(s, Gr, (i) => i.preventDefault());
    const e = {
      leftCallback: () => this._slide(this._directionToOrder(wt)),
      rightCallback: () => this._slide(this._directionToOrder(le)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), jr + this._config.interval));
      }
    };
    this._swipeHelper = new fe(this._element, e);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName))
      return;
    const e = ao[t.key];
    e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement)
      return;
    const e = d.findOne(Ks, this._indicatorsElement);
    e.classList.remove(ne), e.removeAttribute("aria-current");
    const s = d.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    s && (s.classList.add(ne), s.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t)
      return;
    const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = e || this._config.defaultInterval;
  }
  _slide(t, e = null) {
    if (this._isSliding)
      return;
    const s = this._getActive(), i = t === Wt, r = e || hn(this._getItems(), s, i, this._config.wrap);
    if (r === s)
      return;
    const o = this._getItemIndex(r), a = (f) => c.trigger(this._element, f, {
      relatedTarget: r,
      direction: this._orderToDirection(t),
      from: this._getItemIndex(s),
      to: o
    });
    if (a(Fr).defaultPrevented || !s || !r)
      return;
    const h = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
    const u = i ? Zr : Jr, p = i ? to : eo;
    r.classList.add(p), Ut(r), s.classList.add(u), r.classList.add(u);
    const _ = () => {
      r.classList.remove(u, p), r.classList.add(ne), s.classList.remove(ne, p, u), this._isSliding = !1, a(Me);
    };
    this._queueCallback(_, s, this._isAnimated()), h && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(Qr);
  }
  _getActive() {
    return d.findOne(no, this._element);
  }
  _getItems() {
    return d.find(Us, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(t) {
    return W() ? t === wt ? yt : Wt : t === wt ? Wt : yt;
  }
  _orderToDirection(t) {
    return W() ? t === yt ? wt : le : t === yt ? le : wt;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Gt.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        e.to(t);
        return;
      }
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(document, Xr, ro, function(n) {
  const t = d.getElementFromSelector(this);
  if (!t || !t.classList.contains(Fs))
    return;
  n.preventDefault();
  const e = Gt.getOrCreateInstance(t), s = this.getAttribute("data-bs-slide-to");
  if (s) {
    e.to(s), e._maybeEnableCycle();
    return;
  }
  if (X.getDataAttribute(this, "slide") === "next") {
    e.next(), e._maybeEnableCycle();
    return;
  }
  e.prev(), e._maybeEnableCycle();
});
c.on(window, qr, () => {
  const n = d.find(oo);
  for (const t of n)
    Gt.getOrCreateInstance(t);
});
B(Gt);
const uo = "collapse", ho = "bs.collapse", qt = `.${ho}`, fo = ".data-api", po = `show${qt}`, _o = `shown${qt}`, mo = `hide${qt}`, go = `hidden${qt}`, Eo = `click${qt}${fo}`, Pe = "show", Ct = "collapse", se = "collapsing", vo = "collapsed", bo = `:scope .${Ct} .${Ct}`, yo = "collapse-horizontal", To = "width", Ao = "height", wo = ".collapse.show, .collapse.collapsing", qe = '[data-bs-toggle="collapse"]', Oo = {
  parent: null,
  toggle: !0
}, Co = {
  parent: "(null|element)",
  toggle: "boolean"
};
class Ft extends K {
  constructor(t, e) {
    super(t, e), this._isTransitioning = !1, this._triggerArray = [];
    const s = d.find(qe);
    for (const i of s) {
      const r = d.getSelectorFromElement(i), o = d.find(r).filter((a) => a === this._element);
      r !== null && o.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Oo;
  }
  static get DefaultType() {
    return Co;
  }
  static get NAME() {
    return uo;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let t = [];
    if (this._config.parent && (t = this._getFirstLevelChildren(wo).filter((a) => a !== this._element).map((a) => Ft.getOrCreateInstance(a, {
      toggle: !1
    }))), t.length && t[0]._isTransitioning || c.trigger(this._element, po).defaultPrevented)
      return;
    for (const a of t)
      a.hide();
    const s = this._getDimension();
    this._element.classList.remove(Ct), this._element.classList.add(se), this._element.style[s] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(se), this._element.classList.add(Ct, Pe), this._element.style[s] = "", c.trigger(this._element, _o);
    }, o = `scroll${s[0].toUpperCase() + s.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[s] = `${this._element[o]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || c.trigger(this._element, mo).defaultPrevented)
      return;
    const e = this._getDimension();
    this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Ut(this._element), this._element.classList.add(se), this._element.classList.remove(Ct, Pe);
    for (const i of this._triggerArray) {
      const r = d.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const s = () => {
      this._isTransitioning = !1, this._element.classList.remove(se), this._element.classList.add(Ct), c.trigger(this._element, go);
    };
    this._element.style[e] = "", this._queueCallback(s, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Pe);
  }
  // Private
  _configAfterMerge(t) {
    return t.toggle = !!t.toggle, t.parent = et(t.parent), t;
  }
  _getDimension() {
    return this._element.classList.contains(yo) ? To : Ao;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const t = this._getFirstLevelChildren(qe);
    for (const e of t) {
      const s = d.getElementFromSelector(e);
      s && this._addAriaAndCollapsedClass([e], this._isShown(s));
    }
  }
  _getFirstLevelChildren(t) {
    const e = d.find(bo, this._config.parent);
    return d.find(t, this._config.parent).filter((s) => !e.includes(s));
  }
  _addAriaAndCollapsedClass(t, e) {
    if (t.length)
      for (const s of t)
        s.classList.toggle(vo, !e), s.setAttribute("aria-expanded", e);
  }
  // Static
  static jQueryInterface(t) {
    const e = {};
    return typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1), this.each(function() {
      const s = Ft.getOrCreateInstance(this, e);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t]();
      }
    });
  }
}
c.on(document, Eo, qe, function(n) {
  (n.target.tagName === "A" || n.delegateTarget && n.delegateTarget.tagName === "A") && n.preventDefault();
  for (const t of d.getMultipleElementsFromSelector(this))
    Ft.getOrCreateInstance(t, {
      toggle: !1
    }).toggle();
});
B(Ft);
const Rn = "dropdown", No = "bs.dropdown", gt = `.${No}`, fn = ".data-api", So = "Escape", kn = "Tab", Lo = "ArrowUp", Vn = "ArrowDown", Do = 2, $o = `hide${gt}`, xo = `hidden${gt}`, Io = `show${gt}`, Mo = `shown${gt}`, zs = `click${gt}${fn}`, Gs = `keydown${gt}${fn}`, Po = `keyup${gt}${fn}`, Ot = "show", Ro = "dropup", ko = "dropend", Vo = "dropstart", Ho = "dropup-center", Wo = "dropdown-center", dt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Yo = `${dt}.${Ot}`, ue = ".dropdown-menu", Bo = ".navbar", jo = ".navbar-nav", Fo = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Ko = W() ? "top-end" : "top-start", Uo = W() ? "top-start" : "top-end", zo = W() ? "bottom-end" : "bottom-start", Go = W() ? "bottom-start" : "bottom-end", qo = W() ? "left-start" : "right-start", Xo = W() ? "right-start" : "left-start", Qo = "top", Jo = "bottom", Zo = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, ta = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class z extends K {
  constructor(t, e) {
    super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = d.next(this._element, ue)[0] || d.prev(this._element, ue)[0] || d.findOne(ue, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Zo;
  }
  static get DefaultType() {
    return ta;
  }
  static get NAME() {
    return Rn;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (nt(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!c.trigger(this._element, Io, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(jo))
        for (const s of [].concat(...document.body.children))
          c.on(s, "mouseover", de);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ot), this._element.classList.add(Ot), c.trigger(this._element, Mo, t);
    }
  }
  hide() {
    if (nt(this._element) || !this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(t) {
    if (!c.trigger(this._element, $o, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const s of [].concat(...document.body.children))
          c.off(s, "mouseover", de);
      this._popper && this._popper.destroy(), this._menu.classList.remove(Ot), this._element.classList.remove(Ot), this._element.setAttribute("aria-expanded", "false"), X.removeDataAttribute(this._menu, "popper"), c.trigger(this._element, xo, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !q(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Rn.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Ds > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : q(this._config.reference) ? t = et(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const e = this._getPopperConfig();
    this._popper = un(t, this._menu, e);
  }
  _isShown() {
    return this._menu.classList.contains(Ot);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(ko))
      return qo;
    if (t.classList.contains(Vo))
      return Xo;
    if (t.classList.contains(Ho))
      return Qo;
    if (t.classList.contains(Wo))
      return Jo;
    const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Ro) ? e ? Uo : Ko : e ? Go : zo;
  }
  _detectNavbar() {
    return this._element.closest(Bo) !== null;
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    return (this._inNavbar || this._config.display === "static") && (X.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...M(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({
    key: t,
    target: e
  }) {
    const s = d.find(Fo, this._menu).filter((i) => Pt(i));
    s.length && hn(s, e, t === Vn, !s.includes(e)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = z.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Do || t.type === "keyup" && t.key !== kn)
      return;
    const e = d.find(Yo);
    for (const s of e) {
      const i = z.getInstance(s);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = t.composedPath(), o = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === kn || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const a = {
        relatedTarget: i._element
      };
      t.type === "click" && (a.clickEvent = t), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(t) {
    const e = /input|textarea/i.test(t.target.tagName), s = t.key === So, i = [Lo, Vn].includes(t.key);
    if (!i && !s || e && !s)
      return;
    t.preventDefault();
    const r = this.matches(dt) ? this : d.prev(this, dt)[0] || d.next(this, dt)[0] || d.findOne(dt, t.delegateTarget.parentNode), o = z.getOrCreateInstance(r);
    if (i) {
      t.stopPropagation(), o.show(), o._selectMenuItem(t);
      return;
    }
    o._isShown() && (t.stopPropagation(), o.hide(), r.focus());
  }
}
c.on(document, Gs, dt, z.dataApiKeydownHandler);
c.on(document, Gs, ue, z.dataApiKeydownHandler);
c.on(document, zs, z.clearMenus);
c.on(document, Po, z.clearMenus);
c.on(document, zs, dt, function(n) {
  n.preventDefault(), z.getOrCreateInstance(this).toggle();
});
B(z);
const qs = "backdrop", ea = "fade", Hn = "show", Wn = `mousedown.bs.${qs}`, na = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, sa = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class Xs extends zt {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return na;
  }
  static get DefaultType() {
    return sa;
  }
  static get NAME() {
    return qs;
  }
  // Public
  show(t) {
    if (!this._config.isVisible) {
      M(t);
      return;
    }
    this._append();
    const e = this._getElement();
    this._config.isAnimated && Ut(e), e.classList.add(Hn), this._emulateAnimation(() => {
      M(t);
    });
  }
  hide(t) {
    if (!this._config.isVisible) {
      M(t);
      return;
    }
    this._getElement().classList.remove(Hn), this._emulateAnimation(() => {
      this.dispose(), M(t);
    });
  }
  dispose() {
    this._isAppended && (c.off(this._element, Wn), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      t.className = this._config.className, this._config.isAnimated && t.classList.add(ea), this._element = t;
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return t.rootElement = et(t.rootElement), t;
  }
  _append() {
    if (this._isAppended)
      return;
    const t = this._getElement();
    this._config.rootElement.append(t), c.on(t, Wn, () => {
      M(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(t) {
    Ps(t, this._getElement(), this._config.isAnimated);
  }
}
const ia = "focustrap", ra = "bs.focustrap", pe = `.${ra}`, oa = `focusin${pe}`, aa = `keydown.tab${pe}`, ca = "Tab", la = "forward", Yn = "backward", ua = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, ha = {
  autofocus: "boolean",
  trapElement: "element"
};
class Qs extends zt {
  constructor(t) {
    super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return ua;
  }
  static get DefaultType() {
    return ha;
  }
  static get NAME() {
    return ia;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), c.off(document, pe), c.on(document, oa, (t) => this._handleFocusin(t)), c.on(document, aa, (t) => this._handleKeydown(t)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, c.off(document, pe));
  }
  // Private
  _handleFocusin(t) {
    const {
      trapElement: e
    } = this._config;
    if (t.target === document || t.target === e || e.contains(t.target))
      return;
    const s = d.focusableChildren(e);
    s.length === 0 ? e.focus() : this._lastTabNavDirection === Yn ? s[s.length - 1].focus() : s[0].focus();
  }
  _handleKeydown(t) {
    t.key === ca && (this._lastTabNavDirection = t.shiftKey ? Yn : la);
  }
}
const Bn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", jn = ".sticky-top", ie = "padding-right", Fn = "margin-right";
class Xe {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, ie, (e) => e + t), this._setElementAttributes(Bn, ie, (e) => e + t), this._setElementAttributes(jn, Fn, (e) => e - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, ie), this._resetElementAttributes(Bn, ie), this._resetElementAttributes(jn, Fn);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(t, e, s) {
    const i = this.getWidth(), r = (o) => {
      if (o !== this._element && window.innerWidth > o.clientWidth + i)
        return;
      this._saveInitialAttribute(o, e);
      const a = window.getComputedStyle(o).getPropertyValue(e);
      o.style.setProperty(e, `${s(Number.parseFloat(a))}px`);
    };
    this._applyManipulationCallback(t, r);
  }
  _saveInitialAttribute(t, e) {
    const s = t.style.getPropertyValue(e);
    s && X.setDataAttribute(t, e, s);
  }
  _resetElementAttributes(t, e) {
    const s = (i) => {
      const r = X.getDataAttribute(i, e);
      if (r === null) {
        i.style.removeProperty(e);
        return;
      }
      X.removeDataAttribute(i, e), i.style.setProperty(e, r);
    };
    this._applyManipulationCallback(t, s);
  }
  _applyManipulationCallback(t, e) {
    if (q(t)) {
      e(t);
      return;
    }
    for (const s of d.find(t, this._element))
      e(s);
  }
}
const da = "modal", fa = "bs.modal", Y = `.${fa}`, pa = ".data-api", _a = "Escape", ma = `hide${Y}`, ga = `hidePrevented${Y}`, Js = `hidden${Y}`, Zs = `show${Y}`, Ea = `shown${Y}`, va = `resize${Y}`, ba = `click.dismiss${Y}`, ya = `mousedown.dismiss${Y}`, Ta = `keydown.dismiss${Y}`, Aa = `click${Y}${pa}`, Kn = "modal-open", wa = "fade", Un = "show", Re = "modal-static", Oa = ".modal.show", Ca = ".modal-dialog", Na = ".modal-body", Sa = '[data-bs-toggle="modal"]', La = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Da = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class xt extends K {
  constructor(t, e) {
    super(t, e), this._dialog = d.findOne(Ca, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Xe(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return La;
  }
  static get DefaultType() {
    return Da;
  }
  static get NAME() {
    return da;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown || this._isTransitioning || c.trigger(this._element, Zs, {
      relatedTarget: t
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Kn), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown || this._isTransitioning || c.trigger(this._element, ma).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Un), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    c.off(window, Y), c.off(this._dialog, Y), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Xs({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new Qs({
      trapElement: this._element
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const e = d.findOne(Na, this._dialog);
    e && (e.scrollTop = 0), Ut(this._element), this._element.classList.add(Un);
    const s = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, c.trigger(this._element, Ea, {
        relatedTarget: t
      });
    };
    this._queueCallback(s, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    c.on(this._element, Ta, (t) => {
      if (t.key === _a) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), c.on(window, va, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), c.on(this._element, ya, (t) => {
      c.one(this._element, ba, (e) => {
        if (!(this._element !== t.target || this._element !== e.target)) {
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          this._config.backdrop && this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
      document.body.classList.remove(Kn), this._resetAdjustments(), this._scrollBar.reset(), c.trigger(this._element, Js);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(wa);
  }
  _triggerBackdropTransition() {
    if (c.trigger(this._element, ga).defaultPrevented)
      return;
    const e = this._element.scrollHeight > document.documentElement.clientHeight, s = this._element.style.overflowY;
    s === "hidden" || this._element.classList.contains(Re) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Re), this._queueCallback(() => {
      this._element.classList.remove(Re), this._queueCallback(() => {
        this._element.style.overflowY = s;
      }, this._dialog);
    }, this._dialog), this._element.focus());
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const t = this._element.scrollHeight > document.documentElement.clientHeight, e = this._scrollBar.getWidth(), s = e > 0;
    if (s && !t) {
      const i = W() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${e}px`;
    }
    if (!s && t) {
      const i = W() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${e}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(t, e) {
    return this.each(function() {
      const s = xt.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof s[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        s[t](e);
      }
    });
  }
}
c.on(document, Aa, Sa, function(n) {
  const t = d.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && n.preventDefault(), c.one(t, Zs, (i) => {
    i.defaultPrevented || c.one(t, Js, () => {
      Pt(this) && this.focus();
    });
  });
  const e = d.findOne(Oa);
  e && xt.getInstance(e).hide(), xt.getOrCreateInstance(t).toggle(this);
});
Ee(xt);
B(xt);
const $a = "offcanvas", xa = "bs.offcanvas", J = `.${xa}`, ti = ".data-api", Ia = `load${J}${ti}`, Ma = "Escape", zn = "show", Gn = "showing", qn = "hiding", Pa = "offcanvas-backdrop", ei = ".offcanvas.show", Ra = `show${J}`, ka = `shown${J}`, Va = `hide${J}`, Xn = `hidePrevented${J}`, ni = `hidden${J}`, Ha = `resize${J}`, Wa = `click${J}${ti}`, Ya = `keydown.dismiss${J}`, Ba = '[data-bs-toggle="offcanvas"]', ja = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, Fa = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class st extends K {
  constructor(t, e) {
    super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return ja;
  }
  static get DefaultType() {
    return Fa;
  }
  static get NAME() {
    return $a;
  }
  // Public
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (this._isShown || c.trigger(this._element, Ra, {
      relatedTarget: t
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new Xe().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Gn);
    const s = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(zn), this._element.classList.remove(Gn), c.trigger(this._element, ka, {
        relatedTarget: t
      });
    };
    this._queueCallback(s, this._element, !0);
  }
  hide() {
    if (!this._isShown || c.trigger(this._element, Va).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(qn), this._backdrop.hide();
    const e = () => {
      this._element.classList.remove(zn, qn), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Xe().reset(), c.trigger(this._element, ni);
    };
    this._queueCallback(e, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const t = () => {
      if (this._config.backdrop === "static") {
        c.trigger(this._element, Xn);
        return;
      }
      this.hide();
    }, e = !!this._config.backdrop;
    return new Xs({
      className: Pa,
      isVisible: e,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: e ? t : null
    });
  }
  _initializeFocusTrap() {
    return new Qs({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    c.on(this._element, Ya, (t) => {
      if (t.key === Ma) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        c.trigger(this._element, Xn);
      }
    });
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = st.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
c.on(document, Wa, Ba, function(n) {
  const t = d.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && n.preventDefault(), nt(this))
    return;
  c.one(t, ni, () => {
    Pt(this) && this.focus();
  });
  const e = d.findOne(ei);
  e && e !== t && st.getInstance(e).hide(), st.getOrCreateInstance(t).toggle(this);
});
c.on(window, Ia, () => {
  for (const n of d.find(ei))
    st.getOrCreateInstance(n).show();
});
c.on(window, Ha, () => {
  for (const n of d.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(n).position !== "fixed" && st.getOrCreateInstance(n).hide();
});
Ee(st);
B(st);
const Ka = /^aria-[\w-]*$/i, si = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", Ka],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}, Ua = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), za = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Ga = (n, t) => {
  const e = n.nodeName.toLowerCase();
  return t.includes(e) ? Ua.has(e) ? !!za.test(n.nodeValue) : !0 : t.filter((s) => s instanceof RegExp).some((s) => s.test(e));
};
function qa(n, t, e) {
  if (!n.length)
    return n;
  if (e && typeof e == "function")
    return e(n);
  const i = new window.DOMParser().parseFromString(n, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const o of r) {
    const a = o.nodeName.toLowerCase();
    if (!Object.keys(t).includes(a)) {
      o.remove();
      continue;
    }
    const l = [].concat(...o.attributes), h = [].concat(t["*"] || [], t[a] || []);
    for (const u of l)
      Ga(u, h) || o.removeAttribute(u.nodeName);
  }
  return i.body.innerHTML;
}
const Xa = "TemplateFactory", Qa = {
  allowList: si,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, Ja = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, Za = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class tc extends zt {
  constructor(t) {
    super(), this._config = this._getConfig(t);
  }
  // Getters
  static get Default() {
    return Qa;
  }
  static get DefaultType() {
    return Ja;
  }
  static get NAME() {
    return Xa;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((t) => this._resolvePossibleFunction(t)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return this._checkContent(t), this._config.content = {
      ...this._config.content,
      ...t
    }, this;
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, r] of Object.entries(this._config.content))
      this._setContent(t, r, i);
    const e = t.children[0], s = this._resolvePossibleFunction(this._config.extraClass);
    return s && e.classList.add(...s.split(" ")), e;
  }
  // Private
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [e, s] of Object.entries(t))
      super._typeCheckConfig({
        selector: e,
        entry: s
      }, Za);
  }
  _setContent(t, e, s) {
    const i = d.findOne(s, t);
    if (i) {
      if (e = this._resolvePossibleFunction(e), !e) {
        i.remove();
        return;
      }
      if (q(e)) {
        this._putElementInTemplate(et(e), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(e);
        return;
      }
      i.textContent = e;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize ? qa(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return M(t, [this]);
  }
  _putElementInTemplate(t, e) {
    if (this._config.html) {
      e.innerHTML = "", e.append(t);
      return;
    }
    e.textContent = t.textContent;
  }
}
const ec = "tooltip", nc = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), ke = "fade", sc = "modal", re = "show", ic = ".tooltip-inner", Qn = `.${sc}`, Jn = "hide.bs.modal", Yt = "hover", Ve = "focus", rc = "click", oc = "manual", ac = "hide", cc = "hidden", lc = "show", uc = "shown", hc = "inserted", dc = "click", fc = "focusin", pc = "focusout", _c = "mouseenter", mc = "mouseleave", gc = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: W() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: W() ? "right" : "left"
}, Ec = {
  allowList: si,
  animation: !0,
  boundary: "clippingParents",
  container: !1,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: !1,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: !0,
  sanitizeFn: null,
  selector: !1,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
}, vc = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
class kt extends K {
  constructor(t, e) {
    if (typeof Ds > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Ec;
  }
  static get DefaultType() {
    return vc;
  }
  static get NAME() {
    return ec;
  }
  // Public
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (this._activeTrigger.click = !this._activeTrigger.click, this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout), c.off(this._element.closest(Qn), Jn, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const t = c.trigger(this._element, this.constructor.eventName(lc)), s = (Is(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !s)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), c.trigger(this._element, this.constructor.eventName(hc))), this._popper = this._createPopper(i), i.classList.add(re), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        c.on(a, "mouseover", de);
    const o = () => {
      c.trigger(this._element, this.constructor.eventName(uc)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(o, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || c.trigger(this._element, this.constructor.eventName(ac)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(re), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        c.off(i, "mouseover", de);
    this._activeTrigger[rc] = !1, this._activeTrigger[Ve] = !1, this._activeTrigger[Yt] = !1, this._isHovered = null;
    const s = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), c.trigger(this._element, this.constructor.eventName(cc)));
    };
    this._queueCallback(s, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  // Protected
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
  }
  _createTipElement(t) {
    const e = this._getTemplateFactory(t).toHtml();
    if (!e)
      return null;
    e.classList.remove(ke, re), e.classList.add(`bs-${this.constructor.NAME}-auto`);
    const s = ir(this.constructor.NAME).toString();
    return e.setAttribute("id", s), this._isAnimated() && e.classList.add(ke), e;
  }
  setContent(t) {
    this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new tc({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: t,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [ic]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(ke);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(re);
  }
  _createPopper(t) {
    const e = M(this._config.placement, [this, t, this._element]), s = gc[e.toUpperCase()];
    return un(this._element, t, this._getPopperConfig(s));
  }
  _getOffset() {
    const {
      offset: t
    } = this._config;
    return typeof t == "string" ? t.split(",").map((e) => Number.parseInt(e, 10)) : typeof t == "function" ? (e) => t(e, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return M(t, [this._element]);
  }
  _getPopperConfig(t) {
    const e = {
      placement: t,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "preSetPlacement",
        enabled: !0,
        phase: "beforeMain",
        fn: (s) => {
          this._getTipElement().setAttribute("data-popper-placement", s.state.placement);
        }
      }]
    };
    return {
      ...e,
      ...M(this._config.popperConfig, [e])
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const e of t)
      if (e === "click")
        c.on(this._element, this.constructor.eventName(dc), this._config.selector, (s) => {
          this._initializeOnDelegatedTarget(s).toggle();
        });
      else if (e !== oc) {
        const s = e === Yt ? this.constructor.eventName(_c) : this.constructor.eventName(fc), i = e === Yt ? this.constructor.eventName(mc) : this.constructor.eventName(pc);
        c.on(this._element, s, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusin" ? Ve : Yt] = !0, o._enter();
        }), c.on(this._element, i, this._config.selector, (r) => {
          const o = this._initializeOnDelegatedTarget(r);
          o._activeTrigger[r.type === "focusout" ? Ve : Yt] = o._element.contains(r.relatedTarget), o._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, c.on(this._element.closest(Qn), Jn, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    t && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    this._isHovered = !0, this._setTimeout(() => {
      this._isHovered && this.show();
    }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
      this._isHovered || this.hide();
    }, this._config.delay.hide));
  }
  _setTimeout(t, e) {
    clearTimeout(this._timeout), this._timeout = setTimeout(t, e);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const e = X.getDataAttributes(this._element);
    for (const s of Object.keys(e))
      nc.has(s) && delete e[s];
    return t = {
      ...e,
      ...typeof t == "object" && t ? t : {}
    }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t.container = t.container === !1 ? document.body : et(t.container), typeof t.delay == "number" && (t.delay = {
      show: t.delay,
      hide: t.delay
    }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), t;
  }
  _getDelegateConfig() {
    const t = {};
    for (const [e, s] of Object.entries(this._config))
      this.constructor.Default[e] !== s && (t[e] = s);
    return t.selector = !1, t.trigger = "manual", t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = kt.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
B(kt);
const bc = "popover", yc = ".popover-header", Tc = ".popover-body", Ac = {
  ...kt.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, wc = {
  ...kt.DefaultType,
  content: "(null|string|element|function)"
};
class ye extends kt {
  // Getters
  static get Default() {
    return Ac;
  }
  static get DefaultType() {
    return wc;
  }
  static get NAME() {
    return bc;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [yc]: this._getTitle(),
      [Tc]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = ye.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
B(ye);
const Oc = "scrollspy", Cc = "bs.scrollspy", pn = `.${Cc}`, Nc = ".data-api", Sc = `activate${pn}`, Zn = `click${pn}`, Lc = `load${pn}${Nc}`, Dc = "dropdown-item", Tt = "active", $c = '[data-bs-spy="scroll"]', He = "[href]", xc = ".nav, .list-group", ts = ".nav-link", Ic = ".nav-item", Mc = ".list-group-item", Pc = `${ts}, ${Ic} > ${ts}, ${Mc}`, Rc = ".dropdown", kc = ".dropdown-toggle", Vc = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, Hc = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Te extends K {
  constructor(t, e) {
    super(t, e), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return Vc;
  }
  static get DefaultType() {
    return Hc;
  }
  static get NAME() {
    return Oc;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  // Private
  _configAfterMerge(t) {
    return t.target = et(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map((e) => Number.parseFloat(e))), t;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (c.off(this._config.target, Zn), c.on(this._config.target, Zn, He, (t) => {
      const e = this._observableSections.get(t.target.hash);
      if (e) {
        t.preventDefault();
        const s = this._rootElement || window, i = e.offsetTop - this._element.offsetTop;
        if (s.scrollTo) {
          s.scrollTo({
            top: i,
            behavior: "smooth"
          });
          return;
        }
        s.scrollTop = i;
      }
    }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((e) => this._observerCallback(e), t);
  }
  // The logic of selection
  _observerCallback(t) {
    const e = (o) => this._targetLinks.get(`#${o.target.id}`), s = (o) => {
      this._previousScrollData.visibleEntryTop = o.target.offsetTop, this._process(e(o));
    }, i = (this._rootElement || document.documentElement).scrollTop, r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const o of t) {
      if (!o.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(e(o));
        continue;
      }
      const a = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && a) {
        if (s(o), !i)
          return;
        continue;
      }
      !r && !a && s(o);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const t = d.find(He, this._config.target);
    for (const e of t) {
      if (!e.hash || nt(e))
        continue;
      const s = d.findOne(decodeURI(e.hash), this._element);
      Pt(s) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, s));
    }
  }
  _process(t) {
    this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(Tt), this._activateParents(t), c.trigger(this._element, Sc, {
      relatedTarget: t
    }));
  }
  _activateParents(t) {
    if (t.classList.contains(Dc)) {
      d.findOne(kc, t.closest(Rc)).classList.add(Tt);
      return;
    }
    for (const e of d.parents(t, xc))
      for (const s of d.prev(e, Pc))
        s.classList.add(Tt);
  }
  _clearActiveClass(t) {
    t.classList.remove(Tt);
    const e = d.find(`${He}.${Tt}`, t);
    for (const s of e)
      s.classList.remove(Tt);
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Te.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(window, Lc, () => {
  for (const n of d.find($c))
    Te.getOrCreateInstance(n);
});
B(Te);
const Wc = "tab", Yc = "bs.tab", Et = `.${Yc}`, Bc = `hide${Et}`, jc = `hidden${Et}`, Fc = `show${Et}`, Kc = `shown${Et}`, Uc = `click${Et}`, zc = `keydown${Et}`, Gc = `load${Et}`, qc = "ArrowLeft", es = "ArrowRight", Xc = "ArrowUp", ns = "ArrowDown", We = "Home", ss = "End", ft = "active", is = "fade", Ye = "show", Qc = "dropdown", ii = ".dropdown-toggle", Jc = ".dropdown-menu", Be = `:not(${ii})`, Zc = '.list-group, .nav, [role="tablist"]', tl = ".nav-item, .list-group-item", el = `.nav-link${Be}, .list-group-item${Be}, [role="tab"]${Be}`, ri = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', je = `${el}, ${ri}`, nl = `.${ft}[data-bs-toggle="tab"], .${ft}[data-bs-toggle="pill"], .${ft}[data-bs-toggle="list"]`;
class It extends K {
  constructor(t) {
    super(t), this._parent = this._element.closest(Zc), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), c.on(this._element, zc, (e) => this._keydown(e)));
  }
  // Getters
  static get NAME() {
    return Wc;
  }
  // Public
  show() {
    const t = this._element;
    if (this._elemIsActive(t))
      return;
    const e = this._getActiveElem(), s = e ? c.trigger(e, Bc, {
      relatedTarget: t
    }) : null;
    c.trigger(t, Fc, {
      relatedTarget: e
    }).defaultPrevented || s && s.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
  }
  // Private
  _activate(t, e) {
    if (!t)
      return;
    t.classList.add(ft), this._activate(d.getElementFromSelector(t));
    const s = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Ye);
        return;
      }
      t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), c.trigger(t, Kc, {
        relatedTarget: e
      });
    };
    this._queueCallback(s, t, t.classList.contains(is));
  }
  _deactivate(t, e) {
    if (!t)
      return;
    t.classList.remove(ft), t.blur(), this._deactivate(d.getElementFromSelector(t));
    const s = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Ye);
        return;
      }
      t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), c.trigger(t, jc, {
        relatedTarget: e
      });
    };
    this._queueCallback(s, t, t.classList.contains(is));
  }
  _keydown(t) {
    if (![qc, es, Xc, ns, We, ss].includes(t.key))
      return;
    t.stopPropagation(), t.preventDefault();
    const e = this._getChildren().filter((i) => !nt(i));
    let s;
    if ([We, ss].includes(t.key))
      s = e[t.key === We ? 0 : e.length - 1];
    else {
      const i = [es, ns].includes(t.key);
      s = hn(e, t.target, i, !0);
    }
    s && (s.focus({
      preventScroll: !0
    }), It.getOrCreateInstance(s).show());
  }
  _getChildren() {
    return d.find(je, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, e) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const s of e)
      this._setInitialAttributesOnChild(s);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const e = this._elemIsActive(t), s = this._getOuterElement(t);
    t.setAttribute("aria-selected", e), s !== t && this._setAttributeIfNotExists(s, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const e = d.getElementFromSelector(t);
    e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, e) {
    const s = this._getOuterElement(t);
    if (!s.classList.contains(Qc))
      return;
    const i = (r, o) => {
      const a = d.findOne(r, s);
      a && a.classList.toggle(o, e);
    };
    i(ii, ft), i(Jc, Ye), s.setAttribute("aria-expanded", e);
  }
  _setAttributeIfNotExists(t, e, s) {
    t.hasAttribute(e) || t.setAttribute(e, s);
  }
  _elemIsActive(t) {
    return t.classList.contains(ft);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(t) {
    return t.matches(je) ? t : d.findOne(je, t);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(t) {
    return t.closest(tl) || t;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = It.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (e[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        e[t]();
      }
    });
  }
}
c.on(document, Uc, ri, function(n) {
  ["A", "AREA"].includes(this.tagName) && n.preventDefault(), !nt(this) && It.getOrCreateInstance(this).show();
});
c.on(window, Gc, () => {
  for (const n of d.find(nl))
    It.getOrCreateInstance(n);
});
B(It);
const sl = "toast", il = "bs.toast", ot = `.${il}`, rl = `mouseover${ot}`, ol = `mouseout${ot}`, al = `focusin${ot}`, cl = `focusout${ot}`, ll = `hide${ot}`, ul = `hidden${ot}`, hl = `show${ot}`, dl = `shown${ot}`, fl = "fade", rs = "hide", oe = "show", ae = "showing", pl = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, _l = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class Ae extends K {
  constructor(t, e) {
    super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return _l;
  }
  static get DefaultType() {
    return pl;
  }
  static get NAME() {
    return sl;
  }
  // Public
  show() {
    if (c.trigger(this._element, hl).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(fl);
    const e = () => {
      this._element.classList.remove(ae), c.trigger(this._element, dl), this._maybeScheduleHide();
    };
    this._element.classList.remove(rs), Ut(this._element), this._element.classList.add(oe, ae), this._queueCallback(e, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || c.trigger(this._element, ll).defaultPrevented)
      return;
    const e = () => {
      this._element.classList.add(rs), this._element.classList.remove(ae, oe), c.trigger(this._element, ul);
    };
    this._element.classList.add(ae), this._queueCallback(e, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(oe), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(oe);
  }
  // Private
  _maybeScheduleHide() {
    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay)));
  }
  _onInteraction(t, e) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = e;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = e;
        break;
      }
    }
    if (e) {
      this._clearTimeout();
      return;
    }
    const s = t.relatedTarget;
    this._element === s || this._element.contains(s) || this._maybeScheduleHide();
  }
  _setListeners() {
    c.on(this._element, rl, (t) => this._onInteraction(t, !0)), c.on(this._element, ol, (t) => this._onInteraction(t, !1)), c.on(this._element, al, (t) => this._onInteraction(t, !0)), c.on(this._element, cl, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const e = Ae.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof e[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        e[t](this);
      }
    });
  }
}
Ee(Ae);
B(Ae);
class we {
  constructor(t) {
    if (this.constructor === we)
      throw new Error("It's abstract class");
    this.context = t;
  }
  event_show() {
    this.context.typeElement.hideError(), this.context.typeElement.element.value = this.context.value, this.context.element.dispatchEvent(new CustomEvent("show"));
  }
  event_shown() {
    this.context.element.dispatchEvent(new CustomEvent("shown"));
  }
  event_hide() {
    this.context.element.dispatchEvent(new CustomEvent("hide"));
  }
  event_hidden() {
    this.context.element.dispatchEvent(new CustomEvent("hidden"));
  }
  init() {
    throw new Error("Method `init` not define!");
  }
  enable() {
    throw new Error("Method `enable` not define!");
  }
  disable() {
    throw new Error("Method `disable` not define!");
  }
  hide() {
    throw new Error("Method `hide` not define!");
  }
}
class ml extends we {
  init() {
    this.popover = new ye(this.context.element, {
      container: "body",
      content: this.context.typeElement.create(),
      html: !0,
      customClass: "dark-editable",
      title: this.context.title
    }), this.context.element.addEventListener("show.bs.popover", () => {
      this.event_show();
    }), this.context.element.addEventListener("shown.bs.popover", () => {
      this.event_shown();
    }), this.context.element.addEventListener("hide.bs.popover", () => {
      this.event_hide();
    }), this.context.element.addEventListener("hidden.bs.popover", () => {
      this.event_hidden();
    }), document.addEventListener("click", (t) => {
      const e = t.target;
      if (e === this.popover.tip || e === this.context.element)
        return;
      let s = e;
      for (; s = s.parentNode; )
        if (s === this.popover.tip)
          return;
      this.hide();
    });
  }
  enable() {
    this.popover.enable();
  }
  disable() {
    this.popover.disable();
  }
  hide() {
    this.popover.hide();
  }
}
class gl extends we {
  init() {
    const t = () => {
      if (!this.context.disabled) {
        const e = this.context.typeElement.create();
        this.event_show(), this.context.element.removeEventListener("click", t), this.context.element.innerHTML = "", this.context.element.append(e), this.event_shown();
      }
    };
    this.context.element.addEventListener("click", t);
  }
  enable() {
  }
  disable() {
  }
  hide() {
    this.event_hide(), this.context.element.innerHTML = this.context.value, setTimeout(() => {
      this.init(), this.event_hidden();
    }, 100);
  }
}
class vt {
  constructor(t) {
    $(this, "context", null);
    $(this, "element", null);
    $(this, "error", null);
    $(this, "form", null);
    $(this, "load", null);
    $(this, "buttons", { success: null, cancel: null });
    if (this.constructor === vt)
      throw new Error("It's abstract class");
    this.context = t;
  }
  create() {
    throw new Error("Method `create` not define!");
  }
  createContainer(t) {
    const e = document.createElement("div");
    return this.element = t, this.error = this.createContainerError(), this.form = this.createContainerForm(), this.load = this.createContainerLoad(), this.buttons.success = this.createButtonSuccess(), this.buttons.cancel = this.createButtonCancel(), this.form.append(t, this.load, this.buttons.success, this.buttons.cancel), e.append(this.error, this.form), e;
  }
  createContainerError() {
    const t = document.createElement("div");
    return t.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold"), t.style.display = "none", t;
  }
  createContainerForm() {
    const t = document.createElement("form");
    return t.classList.add("d-flex", "align-items-start"), t.style.gap = "20px", t.addEventListener("submit", async (e) => {
      e.preventDefault();
      const s = this.getValue();
      if (this.context.send && this.context.pk && this.context.url && this.context.value !== s) {
        this.showLoad();
        let i;
        try {
          const r = await this.ajax(s);
          r.ok ? i = await this.context.success(r, s) : i = await this.context.error(r, s) || `${r.status} ${r.statusText}`;
        } catch (r) {
          console.error(r), i = r;
        }
        i ? (this.setError(i), this.showError()) : (this.setError(null), this.hideError(), this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText()), this.hideLoad();
      } else
        this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText();
      this.context.element.dispatchEvent(new CustomEvent("save"));
    }), t;
  }
  createContainerLoad() {
    const t = document.createElement("div");
    t.style.display = "none", t.style.position = "absolute", t.style.background = "white", t.style.width = "100%", t.style.height = "100%", t.style.top = 0, t.style.left = 0;
    const e = document.createElement("div");
    return e.classList.add("dark-editable-loader"), t.append(e), t;
  }
  createButton() {
    const t = document.createElement("button");
    return t.type = "button", t.classList.add("btn", "btn-sm"), t.style.color = "transparent", t.style.textShadow = "0 0 0 white", t;
  }
  createButtonSuccess() {
    const t = this.createButton();
    return t.type = "submit", t.classList.add("btn-success"), t.innerHTML = "✔", t;
  }
  createButtonCancel() {
    const t = this.createButton();
    t.classList.add("btn-danger");
    const e = document.createElement("div");
    return e.innerHTML = "✖", t.append(e), t.addEventListener("click", () => {
      this.context.modeElement.hide();
    }), t;
  }
  hideLoad() {
    this.load.style.display = "none";
  }
  showLoad() {
    this.load.style.display = "block";
  }
  ajax(t) {
    let e = this.context.url;
    const s = new FormData();
    s.append("pk", this.context.pk), s.append("name", this.context.name), s.append("value", t);
    const i = {};
    return i.method = this.context.ajaxOptions.method, i.method === "POST" ? i.body = s : e += "?" + new URLSearchParams(s).toString(), fetch(e, i);
  }
  async successResponse(t, e) {
  }
  async errorResponse(t, e) {
  }
  setError(t) {
    this.error.innerHTML = t;
  }
  showError() {
    this.error.style.display = "block";
  }
  hideError() {
    this.error && (this.error.style.display = "none");
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.classList.add("form-control"), this.context.required && (e.required = this.context.required), this.add_focus(e), e;
  }
  add_focus(t) {
    this.context.element.addEventListener("shown", function() {
      t.focus();
    });
  }
  initText() {
    return this.context.value === "" ? (this.context.element.innerHTML = this.context.emptytext, !0) : (this.context.element.innerHTML = this.context.value, !1);
  }
  initOptions() {
  }
  getValue() {
    return this.element.value;
  }
}
class El extends vt {
  create() {
    const t = this.createElement("input");
    return t.type = this.context.type, this.createContainer(t);
  }
}
class vl extends vt {
  create() {
    const t = this.createElement("textarea");
    return this.createContainer(t);
  }
}
class bl extends vt {
  create() {
    const t = this.createElement("select");
    return this.context.source.forEach((e) => {
      const s = document.createElement("option");
      s.value = e.value, s.innerHTML = e.text, t.append(s);
    }), this.createContainer(t);
  }
  initText() {
    if (this.context.element.innerHTML = this.context.emptytext, this.context.value !== "" && this.context.source.length > 0)
      for (const t in this.context.source) {
        const e = this.context.source[t];
        if (e.value == this.context.value)
          return this.context.element.innerHTML = e.text, !1;
      }
    return !0;
  }
  initOptions() {
    this.context.get_opt("source", []), typeof this.context.source == "string" && this.context.source !== "" && (this.context.source = JSON.parse(this.context.source));
  }
}
class oi extends vt {
  create() {
    const t = this.createElement("input");
    return t.type = "date", this.createContainer(t);
  }
  initText() {
    return this.value === "" ? (this.context.element.innerHTML = this.context.emptytext, !0) : (this.context.element.innerHTML = moment(this.context.value).format(this.context.viewformat), !1);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD"), this.context.get_opt("viewformat", "YYYY-MM-DD");
  }
}
class yl extends oi {
  create() {
    const t = this.createElement("input");
    return t.type = "datetime-local", this.createContainer(t);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD HH:mm"), this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm"), this.context.value = moment(this.context.value).format("YYYY-MM-DDTHH:mm");
  }
}
class Al {
  constructor(t, e = {}) {
    $(this, "modeElement", null);
    $(this, "typeElement", null);
    $(this, "mode", null);
    $(this, "type", null);
    $(this, "emptytext", null);
    $(this, "viewformat", null);
    $(this, "pk", null);
    $(this, "name", null);
    this.element = t, this.options = e, this.init_options(), this.typeElement = this.route_type(), this.typeElement.initOptions(), this.modeElement = this.route_mode(), this.modeElement.init(), this.init_text(), this.init_style(), this.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  get_opt(t, e) {
    var s, i;
    return this[t] = ((s = this.element.dataset) == null ? void 0 : s[t]) ?? ((i = this.options) == null ? void 0 : i[t]) ?? e;
  }
  get_opt_bool(t, e) {
    return this.get_opt(t, e), typeof this[t] != "boolean" && (this[t] === "true" ? this[t] = !0 : this[t] === "false" ? this[t] = !1 : this[t] = e), this[t];
  }
  init_options() {
    var t, e, s, i;
    this.get_opt("value", this.element.innerHTML), this.get_opt("name", this.element.id), this.get_opt("pk", null), this.get_opt("title", ""), this.get_opt("type", "text"), this.get_opt("emptytext", "Empty"), this.get_opt("mode", "popup"), this.get_opt("url", null), this.get_opt("ajaxOptions", {}), this.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.ajaxOptions), this.get_opt_bool("send", !0), this.get_opt_bool("disabled", !1), this.get_opt_bool("required", !1), (t = this.options) != null && t.success && typeof ((e = this.options) == null ? void 0 : e.success) == "function" && (this.success = this.options.success), (s = this.options) != null && s.error && typeof ((i = this.options) == null ? void 0 : i.error) == "function" && (this.error = this.options.error);
  }
  init_text() {
    const t = "dark-editable-element-empty";
    this.element.classList.remove(t), this.typeElement.initText() && this.element.classList.add(t);
  }
  init_style() {
    this.element.classList.add("dark-editable-element");
  }
  /* INIT METHODS END */
  route_mode() {
    switch (this.mode) {
      default:
        throw new Error(`Mode ${this.mode} not found!`);
      case "popup":
        return new ml(this);
      case "inline":
        return new gl(this);
    }
  }
  route_type() {
    if (this.type.prototype instanceof vt)
      return new this.type(this);
    if (typeof this.type == "string")
      switch (this.type) {
        case "text":
        case "password":
        case "email":
        case "url":
        case "tel":
        case "number":
        case "range":
        case "time":
          return new El(this);
        case "textarea":
          return new vl(this);
        case "select":
          return new bl(this);
        case "date":
          return new oi(this);
        case "datetime":
          return new yl(this);
      }
    throw new Error("Undefined type");
  }
  /* AJAX */
  async success(t, e) {
    return await this.typeElement.successResponse(t, e);
  }
  async error(t, e) {
    return await this.typeElement.errorResponse(t, e);
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.enable();
  }
  setValue(t) {
    this.value = t, this.init_text();
  }
  getValue() {
    return this.value;
  }
  /* METHODS END */
}
export {
  Al as default
};
