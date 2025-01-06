var wo = Object.defineProperty;
var To = (t, e, s) => e in t ? wo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var z = (t, e, s) => To(t, typeof e != "symbol" ? e + "" : e, s);
var K = "top", J = "bottom", ee = "right", q = "left", Ps = "auto", Ct = [K, J, ee, q], rt = "start", St = "end", Tr = "clippingParents", Vn = "viewport", pt = "popper", Sr = "reference", Dn = /* @__PURE__ */ Ct.reduce(function(t, e) {
  return t.concat([e + "-" + rt, e + "-" + St]);
}, []), Fn = /* @__PURE__ */ [].concat(Ct, [Ps]).reduce(function(t, e) {
  return t.concat([e, e + "-" + rt, e + "-" + St]);
}, []), Or = "beforeRead", Ar = "read", Dr = "afterRead", Mr = "beforeMain", Nr = "main", kr = "afterMain", Cr = "beforeWrite", xr = "write", Lr = "afterWrite", Ir = [Or, Ar, Dr, Mr, Nr, kr, Cr, xr, Lr];
function Ee(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function te(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function at(t) {
  var e = te(t).Element;
  return t instanceof e || t instanceof Element;
}
function ie(t) {
  var e = te(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Un(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = te(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function So(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(s) {
    var n = e.styles[s] || {}, i = e.attributes[s] || {}, r = e.elements[s];
    !ie(r) || !Ee(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(a) {
      var o = i[a];
      o === !1 ? r.removeAttribute(a) : r.setAttribute(a, o === !0 ? "" : o);
    }));
  });
}
function Oo(t) {
  var e = t.state, s = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, s.popper), e.styles = s, e.elements.arrow && Object.assign(e.elements.arrow.style, s.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var i = e.elements[n], r = e.attributes[n] || {}, a = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : s[n]), o = a.reduce(function(l, d) {
        return l[d] = "", l;
      }, {});
      !ie(i) || !Ee(i) || (Object.assign(i.style, o), Object.keys(r).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const jn = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: So,
  effect: Oo,
  requires: ["computeStyles"]
};
function ve(t) {
  return t.split("-")[0];
}
var nt = Math.max, Ds = Math.min, Ot = Math.round;
function Mn() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Yr() {
  return !/^((?!chrome|android).)*safari/i.test(Mn());
}
function At(t, e, s) {
  e === void 0 && (e = !1), s === void 0 && (s = !1);
  var n = t.getBoundingClientRect(), i = 1, r = 1;
  e && ie(t) && (i = t.offsetWidth > 0 && Ot(n.width) / t.offsetWidth || 1, r = t.offsetHeight > 0 && Ot(n.height) / t.offsetHeight || 1);
  var a = at(t) ? te(t) : window, o = a.visualViewport, l = !Yr() && s, d = (n.left + (l && o ? o.offsetLeft : 0)) / i, c = (n.top + (l && o ? o.offsetTop : 0)) / r, g = n.width / i, v = n.height / r;
  return {
    width: g,
    height: v,
    top: c,
    right: d + g,
    bottom: c + v,
    left: d,
    x: d,
    y: c
  };
}
function Gn(t) {
  var e = At(t), s = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - s) <= 1 && (s = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: s,
    height: n
  };
}
function Pr(t, e) {
  var s = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (s && Un(s)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function xe(t) {
  return te(t).getComputedStyle(t);
}
function Ao(t) {
  return ["table", "td", "th"].indexOf(Ee(t)) >= 0;
}
function Ge(t) {
  return ((at(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function $s(t) {
  return Ee(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Un(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ge(t)
  );
}
function Yi(t) {
  return !ie(t) || // https://github.com/popperjs/popper-core/issues/837
  xe(t).position === "fixed" ? null : t.offsetParent;
}
function Do(t) {
  var e = /firefox/i.test(Mn()), s = /Trident/i.test(Mn());
  if (s && ie(t)) {
    var n = xe(t);
    if (n.position === "fixed")
      return null;
  }
  var i = $s(t);
  for (Un(i) && (i = i.host); ie(i) && ["html", "body"].indexOf(Ee(i)) < 0; ) {
    var r = xe(i);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || e && r.willChange === "filter" || e && r.filter && r.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Qt(t) {
  for (var e = te(t), s = Yi(t); s && Ao(s) && xe(s).position === "static"; )
    s = Yi(s);
  return s && (Ee(s) === "html" || Ee(s) === "body" && xe(s).position === "static") ? e : s || Do(t) || e;
}
function Bn(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function jt(t, e, s) {
  return nt(t, Ds(e, s));
}
function Mo(t, e, s) {
  var n = jt(t, e, s);
  return n > s ? s : n;
}
function $r() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Rr(t) {
  return Object.assign({}, $r(), t);
}
function Wr(t, e) {
  return e.reduce(function(s, n) {
    return s[n] = t, s;
  }, {});
}
var No = function(e, s) {
  return e = typeof e == "function" ? e(Object.assign({}, s.rects, {
    placement: s.placement
  })) : e, Rr(typeof e != "number" ? e : Wr(e, Ct));
};
function ko(t) {
  var e, s = t.state, n = t.name, i = t.options, r = s.elements.arrow, a = s.modifiersData.popperOffsets, o = ve(s.placement), l = Bn(o), d = [q, ee].indexOf(o) >= 0, c = d ? "height" : "width";
  if (!(!r || !a)) {
    var g = No(i.padding, s), v = Gn(r), y = l === "y" ? K : q, C = l === "y" ? J : ee, b = s.rects.reference[c] + s.rects.reference[l] - a[l] - s.rects.popper[c], O = a[l] - s.rects.reference[l], x = Qt(r), $ = x ? l === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, R = b / 2 - O / 2, w = g[y], M = $ - v[c] - g[C], N = $ / 2 - v[c] / 2 + R, P = jt(w, N, M), U = l;
    s.modifiersData[n] = (e = {}, e[U] = P, e.centerOffset = P - N, e);
  }
}
function Co(t) {
  var e = t.state, s = t.options, n = s.element, i = n === void 0 ? "[data-popper-arrow]" : n;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Pr(e.elements.popper, i) && (e.elements.arrow = i));
}
const Hr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ko,
  effect: Co,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Dt(t) {
  return t.split("-")[1];
}
var xo = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Lo(t, e) {
  var s = t.x, n = t.y, i = e.devicePixelRatio || 1;
  return {
    x: Ot(s * i) / i || 0,
    y: Ot(n * i) / i || 0
  };
}
function Pi(t) {
  var e, s = t.popper, n = t.popperRect, i = t.placement, r = t.variation, a = t.offsets, o = t.position, l = t.gpuAcceleration, d = t.adaptive, c = t.roundOffsets, g = t.isFixed, v = a.x, y = v === void 0 ? 0 : v, C = a.y, b = C === void 0 ? 0 : C, O = typeof c == "function" ? c({
    x: y,
    y: b
  }) : {
    x: y,
    y: b
  };
  y = O.x, b = O.y;
  var x = a.hasOwnProperty("x"), $ = a.hasOwnProperty("y"), R = q, w = K, M = window;
  if (d) {
    var N = Qt(s), P = "clientHeight", U = "clientWidth";
    if (N === te(s) && (N = Ge(s), xe(N).position !== "static" && o === "absolute" && (P = "scrollHeight", U = "scrollWidth")), N = N, i === K || (i === q || i === ee) && r === St) {
      w = J;
      var F = g && N === M && M.visualViewport ? M.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[P]
      );
      b -= F - n.height, b *= l ? 1 : -1;
    }
    if (i === q || (i === K || i === J) && r === St) {
      R = ee;
      var H = g && N === M && M.visualViewport ? M.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[U]
      );
      y -= H - n.width, y *= l ? 1 : -1;
    }
  }
  var j = Object.assign({
    position: o
  }, d && xo), ue = c === !0 ? Lo({
    x: y,
    y: b
  }, te(s)) : {
    x: y,
    y: b
  };
  if (y = ue.x, b = ue.y, l) {
    var B;
    return Object.assign({}, j, (B = {}, B[w] = $ ? "0" : "", B[R] = x ? "0" : "", B.transform = (M.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + b + "px)" : "translate3d(" + y + "px, " + b + "px, 0)", B));
  }
  return Object.assign({}, j, (e = {}, e[w] = $ ? b + "px" : "", e[R] = x ? y + "px" : "", e.transform = "", e));
}
function Io(t) {
  var e = t.state, s = t.options, n = s.gpuAcceleration, i = n === void 0 ? !0 : n, r = s.adaptive, a = r === void 0 ? !0 : r, o = s.roundOffsets, l = o === void 0 ? !0 : o, d = {
    placement: ve(e.placement),
    variation: Dt(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Pi(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Pi(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const zn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Io,
  data: {}
};
var hs = {
  passive: !0
};
function Yo(t) {
  var e = t.state, s = t.instance, n = t.options, i = n.scroll, r = i === void 0 ? !0 : i, a = n.resize, o = a === void 0 ? !0 : a, l = te(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return r && d.forEach(function(c) {
    c.addEventListener("scroll", s.update, hs);
  }), o && l.addEventListener("resize", s.update, hs), function() {
    r && d.forEach(function(c) {
      c.removeEventListener("scroll", s.update, hs);
    }), o && l.removeEventListener("resize", s.update, hs);
  };
}
const Kn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Yo,
  data: {}
};
var Po = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function bs(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Po[e];
  });
}
var $o = {
  start: "end",
  end: "start"
};
function $i(t) {
  return t.replace(/start|end/g, function(e) {
    return $o[e];
  });
}
function qn(t) {
  var e = te(t), s = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: s,
    scrollTop: n
  };
}
function Zn(t) {
  return At(Ge(t)).left + qn(t).scrollLeft;
}
function Ro(t, e) {
  var s = te(t), n = Ge(t), i = s.visualViewport, r = n.clientWidth, a = n.clientHeight, o = 0, l = 0;
  if (i) {
    r = i.width, a = i.height;
    var d = Yr();
    (d || !d && e === "fixed") && (o = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: a,
    x: o + Zn(t),
    y: l
  };
}
function Wo(t) {
  var e, s = Ge(t), n = qn(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, r = nt(s.scrollWidth, s.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = nt(s.scrollHeight, s.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), o = -n.scrollLeft + Zn(t), l = -n.scrollTop;
  return xe(i || s).direction === "rtl" && (o += nt(s.clientWidth, i ? i.clientWidth : 0) - r), {
    width: r,
    height: a,
    x: o,
    y: l
  };
}
function Xn(t) {
  var e = xe(t), s = e.overflow, n = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(s + i + n);
}
function Vr(t) {
  return ["html", "body", "#document"].indexOf(Ee(t)) >= 0 ? t.ownerDocument.body : ie(t) && Xn(t) ? t : Vr($s(t));
}
function Gt(t, e) {
  var s;
  e === void 0 && (e = []);
  var n = Vr(t), i = n === ((s = t.ownerDocument) == null ? void 0 : s.body), r = te(n), a = i ? [r].concat(r.visualViewport || [], Xn(n) ? n : []) : n, o = e.concat(a);
  return i ? o : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    o.concat(Gt($s(a)))
  );
}
function Nn(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Ho(t, e) {
  var s = At(t, !1, e === "fixed");
  return s.top = s.top + t.clientTop, s.left = s.left + t.clientLeft, s.bottom = s.top + t.clientHeight, s.right = s.left + t.clientWidth, s.width = t.clientWidth, s.height = t.clientHeight, s.x = s.left, s.y = s.top, s;
}
function Ri(t, e, s) {
  return e === Vn ? Nn(Ro(t, s)) : at(e) ? Ho(e, s) : Nn(Wo(Ge(t)));
}
function Vo(t) {
  var e = Gt($s(t)), s = ["absolute", "fixed"].indexOf(xe(t).position) >= 0, n = s && ie(t) ? Qt(t) : t;
  return at(n) ? e.filter(function(i) {
    return at(i) && Pr(i, n) && Ee(i) !== "body";
  }) : [];
}
function Fo(t, e, s, n) {
  var i = e === "clippingParents" ? Vo(t) : [].concat(e), r = [].concat(i, [s]), a = r[0], o = r.reduce(function(l, d) {
    var c = Ri(t, d, n);
    return l.top = nt(c.top, l.top), l.right = Ds(c.right, l.right), l.bottom = Ds(c.bottom, l.bottom), l.left = nt(c.left, l.left), l;
  }, Ri(t, a, n));
  return o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
function Fr(t) {
  var e = t.reference, s = t.element, n = t.placement, i = n ? ve(n) : null, r = n ? Dt(n) : null, a = e.x + e.width / 2 - s.width / 2, o = e.y + e.height / 2 - s.height / 2, l;
  switch (i) {
    case K:
      l = {
        x: a,
        y: e.y - s.height
      };
      break;
    case J:
      l = {
        x: a,
        y: e.y + e.height
      };
      break;
    case ee:
      l = {
        x: e.x + e.width,
        y: o
      };
      break;
    case q:
      l = {
        x: e.x - s.width,
        y: o
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var d = i ? Bn(i) : null;
  if (d != null) {
    var c = d === "y" ? "height" : "width";
    switch (r) {
      case rt:
        l[d] = l[d] - (e[c] / 2 - s[c] / 2);
        break;
      case St:
        l[d] = l[d] + (e[c] / 2 - s[c] / 2);
        break;
    }
  }
  return l;
}
function Mt(t, e) {
  e === void 0 && (e = {});
  var s = e, n = s.placement, i = n === void 0 ? t.placement : n, r = s.strategy, a = r === void 0 ? t.strategy : r, o = s.boundary, l = o === void 0 ? Tr : o, d = s.rootBoundary, c = d === void 0 ? Vn : d, g = s.elementContext, v = g === void 0 ? pt : g, y = s.altBoundary, C = y === void 0 ? !1 : y, b = s.padding, O = b === void 0 ? 0 : b, x = Rr(typeof O != "number" ? O : Wr(O, Ct)), $ = v === pt ? Sr : pt, R = t.rects.popper, w = t.elements[C ? $ : v], M = Fo(at(w) ? w : w.contextElement || Ge(t.elements.popper), l, c, a), N = At(t.elements.reference), P = Fr({
    reference: N,
    element: R,
    strategy: "absolute",
    placement: i
  }), U = Nn(Object.assign({}, R, P)), F = v === pt ? U : N, H = {
    top: M.top - F.top + x.top,
    bottom: F.bottom - M.bottom + x.bottom,
    left: M.left - F.left + x.left,
    right: F.right - M.right + x.right
  }, j = t.modifiersData.offset;
  if (v === pt && j) {
    var ue = j[i];
    Object.keys(H).forEach(function(B) {
      var Ke = [ee, J].indexOf(B) >= 0 ? 1 : -1, qe = [K, J].indexOf(B) >= 0 ? "y" : "x";
      H[B] += ue[qe] * Ke;
    });
  }
  return H;
}
function Uo(t, e) {
  e === void 0 && (e = {});
  var s = e, n = s.placement, i = s.boundary, r = s.rootBoundary, a = s.padding, o = s.flipVariations, l = s.allowedAutoPlacements, d = l === void 0 ? Fn : l, c = Dt(n), g = c ? o ? Dn : Dn.filter(function(C) {
    return Dt(C) === c;
  }) : Ct, v = g.filter(function(C) {
    return d.indexOf(C) >= 0;
  });
  v.length === 0 && (v = g);
  var y = v.reduce(function(C, b) {
    return C[b] = Mt(t, {
      placement: b,
      boundary: i,
      rootBoundary: r,
      padding: a
    })[ve(b)], C;
  }, {});
  return Object.keys(y).sort(function(C, b) {
    return y[C] - y[b];
  });
}
function jo(t) {
  if (ve(t) === Ps)
    return [];
  var e = bs(t);
  return [$i(t), e, $i(e)];
}
function Go(t) {
  var e = t.state, s = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var i = s.mainAxis, r = i === void 0 ? !0 : i, a = s.altAxis, o = a === void 0 ? !0 : a, l = s.fallbackPlacements, d = s.padding, c = s.boundary, g = s.rootBoundary, v = s.altBoundary, y = s.flipVariations, C = y === void 0 ? !0 : y, b = s.allowedAutoPlacements, O = e.options.placement, x = ve(O), $ = x === O, R = l || ($ || !C ? [bs(O)] : jo(O)), w = [O].concat(R).reduce(function(dt, $e) {
      return dt.concat(ve($e) === Ps ? Uo(e, {
        placement: $e,
        boundary: c,
        rootBoundary: g,
        padding: d,
        flipVariations: C,
        allowedAutoPlacements: b
      }) : $e);
    }, []), M = e.rects.reference, N = e.rects.popper, P = /* @__PURE__ */ new Map(), U = !0, F = w[0], H = 0; H < w.length; H++) {
      var j = w[H], ue = ve(j), B = Dt(j) === rt, Ke = [K, J].indexOf(ue) >= 0, qe = Ke ? "width" : "height", Q = Mt(e, {
        placement: j,
        boundary: c,
        rootBoundary: g,
        altBoundary: v,
        padding: d
      }), de = Ke ? B ? ee : q : B ? J : K;
      M[qe] > N[qe] && (de = bs(de));
      var os = bs(de), Ze = [];
      if (r && Ze.push(Q[ue] <= 0), o && Ze.push(Q[de] <= 0, Q[os] <= 0), Ze.every(function(dt) {
        return dt;
      })) {
        F = j, U = !1;
        break;
      }
      P.set(j, Ze);
    }
    if (U)
      for (var ls = C ? 3 : 1, nn = function($e) {
        var Wt = w.find(function(us) {
          var Xe = P.get(us);
          if (Xe)
            return Xe.slice(0, $e).every(function(rn) {
              return rn;
            });
        });
        if (Wt)
          return F = Wt, "break";
      }, Rt = ls; Rt > 0; Rt--) {
        var cs = nn(Rt);
        if (cs === "break") break;
      }
    e.placement !== F && (e.modifiersData[n]._skip = !0, e.placement = F, e.reset = !0);
  }
}
const Ur = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Go,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Wi(t, e, s) {
  return s === void 0 && (s = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - s.y,
    right: t.right - e.width + s.x,
    bottom: t.bottom - e.height + s.y,
    left: t.left - e.width - s.x
  };
}
function Hi(t) {
  return [K, ee, J, q].some(function(e) {
    return t[e] >= 0;
  });
}
function Bo(t) {
  var e = t.state, s = t.name, n = e.rects.reference, i = e.rects.popper, r = e.modifiersData.preventOverflow, a = Mt(e, {
    elementContext: "reference"
  }), o = Mt(e, {
    altBoundary: !0
  }), l = Wi(a, n), d = Wi(o, i, r), c = Hi(l), g = Hi(d);
  e.modifiersData[s] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: d,
    isReferenceHidden: c,
    hasPopperEscaped: g
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": g
  });
}
const jr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Bo
};
function zo(t, e, s) {
  var n = ve(t), i = [q, K].indexOf(n) >= 0 ? -1 : 1, r = typeof s == "function" ? s(Object.assign({}, e, {
    placement: t
  })) : s, a = r[0], o = r[1];
  return a = a || 0, o = (o || 0) * i, [q, ee].indexOf(n) >= 0 ? {
    x: o,
    y: a
  } : {
    x: a,
    y: o
  };
}
function Ko(t) {
  var e = t.state, s = t.options, n = t.name, i = s.offset, r = i === void 0 ? [0, 0] : i, a = Fn.reduce(function(c, g) {
    return c[g] = zo(g, e.rects, r), c;
  }, {}), o = a[e.placement], l = o.x, d = o.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += d), e.modifiersData[n] = a;
}
const Gr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ko
};
function qo(t) {
  var e = t.state, s = t.name;
  e.modifiersData[s] = Fr({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Qn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: qo,
  data: {}
};
function Zo(t) {
  return t === "x" ? "y" : "x";
}
function Xo(t) {
  var e = t.state, s = t.options, n = t.name, i = s.mainAxis, r = i === void 0 ? !0 : i, a = s.altAxis, o = a === void 0 ? !1 : a, l = s.boundary, d = s.rootBoundary, c = s.altBoundary, g = s.padding, v = s.tether, y = v === void 0 ? !0 : v, C = s.tetherOffset, b = C === void 0 ? 0 : C, O = Mt(e, {
    boundary: l,
    rootBoundary: d,
    padding: g,
    altBoundary: c
  }), x = ve(e.placement), $ = Dt(e.placement), R = !$, w = Bn(x), M = Zo(w), N = e.modifiersData.popperOffsets, P = e.rects.reference, U = e.rects.popper, F = typeof b == "function" ? b(Object.assign({}, e.rects, {
    placement: e.placement
  })) : b, H = typeof F == "number" ? {
    mainAxis: F,
    altAxis: F
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, F), j = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, ue = {
    x: 0,
    y: 0
  };
  if (N) {
    if (r) {
      var B, Ke = w === "y" ? K : q, qe = w === "y" ? J : ee, Q = w === "y" ? "height" : "width", de = N[w], os = de + O[Ke], Ze = de - O[qe], ls = y ? -U[Q] / 2 : 0, nn = $ === rt ? P[Q] : U[Q], Rt = $ === rt ? -U[Q] : -P[Q], cs = e.elements.arrow, dt = y && cs ? Gn(cs) : {
        width: 0,
        height: 0
      }, $e = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : $r(), Wt = $e[Ke], us = $e[qe], Xe = jt(0, P[Q], dt[Q]), rn = R ? P[Q] / 2 - ls - Xe - Wt - H.mainAxis : nn - Xe - Wt - H.mainAxis, mo = R ? -P[Q] / 2 + ls + Xe + us + H.mainAxis : Rt + Xe + us + H.mainAxis, an = e.elements.arrow && Qt(e.elements.arrow), go = an ? w === "y" ? an.clientTop || 0 : an.clientLeft || 0 : 0, Ai = (B = j == null ? void 0 : j[w]) != null ? B : 0, vo = de + rn - Ai - go, yo = de + mo - Ai, Di = jt(y ? Ds(os, vo) : os, de, y ? nt(Ze, yo) : Ze);
      N[w] = Di, ue[w] = Di - de;
    }
    if (o) {
      var Mi, Eo = w === "x" ? K : q, bo = w === "x" ? J : ee, Qe = N[M], ds = M === "y" ? "height" : "width", Ni = Qe + O[Eo], ki = Qe - O[bo], on = [K, q].indexOf(x) !== -1, Ci = (Mi = j == null ? void 0 : j[M]) != null ? Mi : 0, xi = on ? Ni : Qe - P[ds] - U[ds] - Ci + H.altAxis, Li = on ? Qe + P[ds] + U[ds] - Ci - H.altAxis : ki, Ii = y && on ? Mo(xi, Qe, Li) : jt(y ? xi : Ni, Qe, y ? Li : ki);
      N[M] = Ii, ue[M] = Ii - Qe;
    }
    e.modifiersData[n] = ue;
  }
}
const Br = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Xo,
  requiresIfExists: ["offset"]
};
function Qo(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Jo(t) {
  return t === te(t) || !ie(t) ? qn(t) : Qo(t);
}
function el(t) {
  var e = t.getBoundingClientRect(), s = Ot(e.width) / t.offsetWidth || 1, n = Ot(e.height) / t.offsetHeight || 1;
  return s !== 1 || n !== 1;
}
function tl(t, e, s) {
  s === void 0 && (s = !1);
  var n = ie(e), i = ie(e) && el(e), r = Ge(e), a = At(t, i, s), o = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !s) && ((Ee(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Xn(r)) && (o = Jo(e)), ie(e) ? (l = At(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : r && (l.x = Zn(r))), {
    x: a.left + o.scrollLeft - l.x,
    y: a.top + o.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function sl(t) {
  var e = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(r) {
    e.set(r.name, r);
  });
  function i(r) {
    s.add(r.name);
    var a = [].concat(r.requires || [], r.requiresIfExists || []);
    a.forEach(function(o) {
      if (!s.has(o)) {
        var l = e.get(o);
        l && i(l);
      }
    }), n.push(r);
  }
  return t.forEach(function(r) {
    s.has(r.name) || i(r);
  }), n;
}
function nl(t) {
  var e = sl(t);
  return Ir.reduce(function(s, n) {
    return s.concat(e.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function il(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(s) {
      Promise.resolve().then(function() {
        e = void 0, s(t());
      });
    })), e;
  };
}
function rl(t) {
  var e = t.reduce(function(s, n) {
    var i = s[n.name];
    return s[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, s;
  }, {});
  return Object.keys(e).map(function(s) {
    return e[s];
  });
}
var Vi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Fi() {
  for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++)
    e[s] = arguments[s];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Rs(t) {
  t === void 0 && (t = {});
  var e = t, s = e.defaultModifiers, n = s === void 0 ? [] : s, i = e.defaultOptions, r = i === void 0 ? Vi : i;
  return function(o, l, d) {
    d === void 0 && (d = r);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Vi, r),
      modifiersData: {},
      elements: {
        reference: o,
        popper: l
      },
      attributes: {},
      styles: {}
    }, g = [], v = !1, y = {
      state: c,
      setOptions: function(x) {
        var $ = typeof x == "function" ? x(c.options) : x;
        b(), c.options = Object.assign({}, r, c.options, $), c.scrollParents = {
          reference: at(o) ? Gt(o) : o.contextElement ? Gt(o.contextElement) : [],
          popper: Gt(l)
        };
        var R = nl(rl([].concat(n, c.options.modifiers)));
        return c.orderedModifiers = R.filter(function(w) {
          return w.enabled;
        }), C(), y.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!v) {
          var x = c.elements, $ = x.reference, R = x.popper;
          if (Fi($, R)) {
            c.rects = {
              reference: tl($, Qt(R), c.options.strategy === "fixed"),
              popper: Gn(R)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(H) {
              return c.modifiersData[H.name] = Object.assign({}, H.data);
            });
            for (var w = 0; w < c.orderedModifiers.length; w++) {
              if (c.reset === !0) {
                c.reset = !1, w = -1;
                continue;
              }
              var M = c.orderedModifiers[w], N = M.fn, P = M.options, U = P === void 0 ? {} : P, F = M.name;
              typeof N == "function" && (c = N({
                state: c,
                options: U,
                name: F,
                instance: y
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: il(function() {
        return new Promise(function(O) {
          y.forceUpdate(), O(c);
        });
      }),
      destroy: function() {
        b(), v = !0;
      }
    };
    if (!Fi(o, l))
      return y;
    y.setOptions(d).then(function(O) {
      !v && d.onFirstUpdate && d.onFirstUpdate(O);
    });
    function C() {
      c.orderedModifiers.forEach(function(O) {
        var x = O.name, $ = O.options, R = $ === void 0 ? {} : $, w = O.effect;
        if (typeof w == "function") {
          var M = w({
            state: c,
            name: x,
            instance: y,
            options: R
          }), N = function() {
          };
          g.push(M || N);
        }
      });
    }
    function b() {
      g.forEach(function(O) {
        return O();
      }), g = [];
    }
    return y;
  };
}
var al = /* @__PURE__ */ Rs(), ol = [Kn, Qn, zn, jn], ll = /* @__PURE__ */ Rs({
  defaultModifiers: ol
}), cl = [Kn, Qn, zn, jn, Gr, Ur, Br, Hr, jr], Jn = /* @__PURE__ */ Rs({
  defaultModifiers: cl
});
const zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: kr,
  afterRead: Dr,
  afterWrite: Lr,
  applyStyles: jn,
  arrow: Hr,
  auto: Ps,
  basePlacements: Ct,
  beforeMain: Mr,
  beforeRead: Or,
  beforeWrite: Cr,
  bottom: J,
  clippingParents: Tr,
  computeStyles: zn,
  createPopper: Jn,
  createPopperBase: al,
  createPopperLite: ll,
  detectOverflow: Mt,
  end: St,
  eventListeners: Kn,
  flip: Ur,
  hide: jr,
  left: q,
  main: Nr,
  modifierPhases: Ir,
  offset: Gr,
  placements: Fn,
  popper: pt,
  popperGenerator: Rs,
  popperOffsets: Qn,
  preventOverflow: Br,
  read: Ar,
  reference: Sr,
  right: ee,
  start: rt,
  top: K,
  variationPlacements: Dn,
  viewport: Vn,
  write: xr
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const Re = /* @__PURE__ */ new Map(), ln = {
  set(t, e, s) {
    Re.has(t) || Re.set(t, /* @__PURE__ */ new Map());
    const n = Re.get(t);
    if (!n.has(e) && n.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
      return;
    }
    n.set(e, s);
  },
  get(t, e) {
    return Re.has(t) && Re.get(t).get(e) || null;
  },
  remove(t, e) {
    if (!Re.has(t))
      return;
    const s = Re.get(t);
    s.delete(e), s.size === 0 && Re.delete(t);
  }
}, ul = 1e6, dl = 1e3, kn = "transitionend", Kr = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (e, s) => `#${CSS.escape(s)}`)), t), hl = (t) => t == null ? `${t}` : Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(), fl = (t) => {
  do
    t += Math.floor(Math.random() * ul);
  while (document.getElementById(t));
  return t;
}, _l = (t) => {
  if (!t)
    return 0;
  let {
    transitionDuration: e,
    transitionDelay: s
  } = window.getComputedStyle(t);
  const n = Number.parseFloat(e), i = Number.parseFloat(s);
  return !n && !i ? 0 : (e = e.split(",")[0], s = s.split(",")[0], (Number.parseFloat(e) + Number.parseFloat(s)) * dl);
}, qr = (t) => {
  t.dispatchEvent(new Event(kn));
}, Me = (t) => !t || typeof t != "object" ? !1 : (typeof t.jquery < "u" && (t = t[0]), typeof t.nodeType < "u"), Fe = (t) => Me(t) ? t.jquery ? t[0] : t : typeof t == "string" && t.length > 0 ? document.querySelector(Kr(t)) : null, xt = (t) => {
  if (!Me(t) || t.getClientRects().length === 0)
    return !1;
  const e = getComputedStyle(t).getPropertyValue("visibility") === "visible", s = t.closest("details:not([open])");
  if (!s)
    return e;
  if (s !== t) {
    const n = t.closest("summary");
    if (n && n.parentNode !== s || n === null)
      return !1;
  }
  return e;
}, Ue = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains("disabled") ? !0 : typeof t.disabled < "u" ? t.disabled : t.hasAttribute("disabled") && t.getAttribute("disabled") !== "false", Zr = (t) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof t.getRootNode == "function") {
    const e = t.getRootNode();
    return e instanceof ShadowRoot ? e : null;
  }
  return t instanceof ShadowRoot ? t : t.parentNode ? Zr(t.parentNode) : null;
}, Ms = () => {
}, Jt = (t) => {
  t.offsetHeight;
}, Xr = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, cn = [], pl = (t) => {
  document.readyState === "loading" ? (cn.length || document.addEventListener("DOMContentLoaded", () => {
    for (const e of cn)
      e();
  }), cn.push(t)) : t();
}, re = () => document.documentElement.dir === "rtl", oe = (t) => {
  pl(() => {
    const e = Xr();
    if (e) {
      const s = t.NAME, n = e.fn[s];
      e.fn[s] = t.jQueryInterface, e.fn[s].Constructor = t, e.fn[s].noConflict = () => (e.fn[s] = n, t.jQueryInterface);
    }
  });
}, X = (t, e = [], s = t) => typeof t == "function" ? t(...e) : s, Qr = (t, e, s = !0) => {
  if (!s) {
    X(t);
    return;
  }
  const i = _l(e) + 5;
  let r = !1;
  const a = ({
    target: o
  }) => {
    o === e && (r = !0, e.removeEventListener(kn, a), X(t));
  };
  e.addEventListener(kn, a), setTimeout(() => {
    r || qr(e);
  }, i);
}, ei = (t, e, s, n) => {
  const i = t.length;
  let r = t.indexOf(e);
  return r === -1 ? !s && n ? t[i - 1] : t[0] : (r += s ? 1 : -1, n && (r = (r + i) % i), t[Math.max(0, Math.min(r, i - 1))]);
}, ml = /[^.]*(?=\..*)\.|.*/, gl = /\..*/, vl = /::\d+$/, un = {};
let Ui = 1;
const Jr = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, yl = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function ea(t, e) {
  return e && `${e}::${Ui++}` || t.uidEvent || Ui++;
}
function ta(t) {
  const e = ea(t);
  return t.uidEvent = e, un[e] = un[e] || {}, un[e];
}
function El(t, e) {
  return function s(n) {
    return ti(n, {
      delegateTarget: t
    }), s.oneOff && u.off(t, n.type, e), e.apply(t, [n]);
  };
}
function bl(t, e, s) {
  return function n(i) {
    const r = t.querySelectorAll(e);
    for (let {
      target: a
    } = i; a && a !== this; a = a.parentNode)
      for (const o of r)
        if (o === a)
          return ti(i, {
            delegateTarget: a
          }), n.oneOff && u.off(t, i.type, e, s), s.apply(a, [i]);
  };
}
function sa(t, e, s = null) {
  return Object.values(t).find((n) => n.callable === e && n.delegationSelector === s);
}
function na(t, e, s) {
  const n = typeof e == "string", i = n ? s : e || s;
  let r = ia(t);
  return yl.has(r) || (r = t), [n, i, r];
}
function ji(t, e, s, n, i) {
  if (typeof e != "string" || !t)
    return;
  let [r, a, o] = na(e, s, n);
  e in Jr && (a = ((C) => function(b) {
    if (!b.relatedTarget || b.relatedTarget !== b.delegateTarget && !b.delegateTarget.contains(b.relatedTarget))
      return C.call(this, b);
  })(a));
  const l = ta(t), d = l[o] || (l[o] = {}), c = sa(d, a, r ? s : null);
  if (c) {
    c.oneOff = c.oneOff && i;
    return;
  }
  const g = ea(a, e.replace(ml, "")), v = r ? bl(t, s, a) : El(t, a);
  v.delegationSelector = r ? s : null, v.callable = a, v.oneOff = i, v.uidEvent = g, d[g] = v, t.addEventListener(o, v, r);
}
function Cn(t, e, s, n, i) {
  const r = sa(e[s], n, i);
  r && (t.removeEventListener(s, r, !!i), delete e[s][r.uidEvent]);
}
function wl(t, e, s, n) {
  const i = e[s] || {};
  for (const [r, a] of Object.entries(i))
    r.includes(n) && Cn(t, e, s, a.callable, a.delegationSelector);
}
function ia(t) {
  return t = t.replace(gl, ""), Jr[t] || t;
}
const u = {
  on(t, e, s, n) {
    ji(t, e, s, n, !1);
  },
  one(t, e, s, n) {
    ji(t, e, s, n, !0);
  },
  off(t, e, s, n) {
    if (typeof e != "string" || !t)
      return;
    const [i, r, a] = na(e, s, n), o = a !== e, l = ta(t), d = l[a] || {}, c = e.startsWith(".");
    if (typeof r < "u") {
      if (!Object.keys(d).length)
        return;
      Cn(t, l, a, r, i ? s : null);
      return;
    }
    if (c)
      for (const g of Object.keys(l))
        wl(t, l, g, e.slice(1));
    for (const [g, v] of Object.entries(d)) {
      const y = g.replace(vl, "");
      (!o || e.includes(y)) && Cn(t, l, a, v.callable, v.delegationSelector);
    }
  },
  trigger(t, e, s) {
    if (typeof e != "string" || !t)
      return null;
    const n = Xr(), i = ia(e), r = e !== i;
    let a = null, o = !0, l = !0, d = !1;
    r && n && (a = n.Event(e, s), n(t).trigger(a), o = !a.isPropagationStopped(), l = !a.isImmediatePropagationStopped(), d = a.isDefaultPrevented());
    const c = ti(new Event(e, {
      bubbles: o,
      cancelable: !0
    }), s);
    return d && c.preventDefault(), l && t.dispatchEvent(c), c.defaultPrevented && a && a.preventDefault(), c;
  }
};
function ti(t, e = {}) {
  for (const [s, n] of Object.entries(e))
    try {
      t[s] = n;
    } catch {
      Object.defineProperty(t, s, {
        configurable: !0,
        get() {
          return n;
        }
      });
    }
  return t;
}
function Gi(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  if (t === Number(t).toString())
    return Number(t);
  if (t === "" || t === "null")
    return null;
  if (typeof t != "string")
    return t;
  try {
    return JSON.parse(decodeURIComponent(t));
  } catch {
    return t;
  }
}
function dn(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
const Ne = {
  setDataAttribute(t, e, s) {
    t.setAttribute(`data-bs-${dn(e)}`, s);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-bs-${dn(e)}`);
  },
  getDataAttributes(t) {
    if (!t)
      return {};
    const e = {}, s = Object.keys(t.dataset).filter((n) => n.startsWith("bs") && !n.startsWith("bsConfig"));
    for (const n of s) {
      let i = n.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = Gi(t.dataset[n]);
    }
    return e;
  },
  getDataAttribute(t, e) {
    return Gi(t.getAttribute(`data-bs-${dn(e)}`));
  }
};
class es {
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
  _getConfig(e) {
    return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e;
  }
  _mergeConfigObj(e, s) {
    const n = Me(s) ? Ne.getDataAttribute(s, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof n == "object" ? n : {},
      ...Me(s) ? Ne.getDataAttributes(s) : {},
      ...typeof e == "object" ? e : {}
    };
  }
  _typeCheckConfig(e, s = this.constructor.DefaultType) {
    for (const [n, i] of Object.entries(s)) {
      const r = e[n], a = Me(r) ? "element" : hl(r);
      if (!new RegExp(i).test(a))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${i}".`);
    }
  }
}
const Tl = "5.3.3";
class pe extends es {
  constructor(e, s) {
    super(), e = Fe(e), e && (this._element = e, this._config = this._getConfig(s), ln.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    ln.remove(this._element, this.constructor.DATA_KEY), u.off(this._element, this.constructor.EVENT_KEY);
    for (const e of Object.getOwnPropertyNames(this))
      this[e] = null;
  }
  _queueCallback(e, s, n = !0) {
    Qr(e, s, n);
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  // Static
  static getInstance(e) {
    return ln.get(Fe(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, s = {}) {
    return this.getInstance(e) || new this(e, typeof s == "object" ? s : null);
  }
  static get VERSION() {
    return Tl;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(e) {
    return `${e}${this.EVENT_KEY}`;
  }
}
const hn = (t) => {
  let e = t.getAttribute("data-bs-target");
  if (!e || e === "#") {
    let s = t.getAttribute("href");
    if (!s || !s.includes("#") && !s.startsWith("."))
      return null;
    s.includes("#") && !s.startsWith("#") && (s = `#${s.split("#")[1]}`), e = s && s !== "#" ? s.trim() : null;
  }
  return e ? e.split(",").map((s) => Kr(s)).join(",") : null;
}, m = {
  find(t, e = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(e, t));
  },
  findOne(t, e = document.documentElement) {
    return Element.prototype.querySelector.call(e, t);
  },
  children(t, e) {
    return [].concat(...t.children).filter((s) => s.matches(e));
  },
  parents(t, e) {
    const s = [];
    let n = t.parentNode.closest(e);
    for (; n; )
      s.push(n), n = n.parentNode.closest(e);
    return s;
  },
  prev(t, e) {
    let s = t.previousElementSibling;
    for (; s; ) {
      if (s.matches(e))
        return [s];
      s = s.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(t, e) {
    let s = t.nextElementSibling;
    for (; s; ) {
      if (s.matches(e))
        return [s];
      s = s.nextElementSibling;
    }
    return [];
  },
  focusableChildren(t) {
    const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((s) => `${s}:not([tabindex^="-"])`).join(",");
    return this.find(e, t).filter((s) => !Ue(s) && xt(s));
  },
  getSelectorFromElement(t) {
    const e = hn(t);
    return e && m.findOne(e) ? e : null;
  },
  getElementFromSelector(t) {
    const e = hn(t);
    return e ? m.findOne(e) : null;
  },
  getMultipleElementsFromSelector(t) {
    const e = hn(t);
    return e ? m.find(e) : [];
  }
}, Ws = (t, e = "hide") => {
  const s = `click.dismiss${t.EVENT_KEY}`, n = t.NAME;
  u.on(document, s, `[data-bs-dismiss="${n}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), Ue(this))
      return;
    const r = m.getElementFromSelector(this) || this.closest(`.${n}`);
    t.getOrCreateInstance(r)[e]();
  });
}, Sl = "alert", Ol = "bs.alert", ra = `.${Ol}`, Al = `close${ra}`, Dl = `closed${ra}`, Ml = "fade", Nl = "show";
class Hs extends pe {
  // Getters
  static get NAME() {
    return Sl;
  }
  // Public
  close() {
    if (u.trigger(this._element, Al).defaultPrevented)
      return;
    this._element.classList.remove(Nl);
    const s = this._element.classList.contains(Ml);
    this._queueCallback(() => this._destroyElement(), this._element, s);
  }
  // Private
  _destroyElement() {
    this._element.remove(), u.trigger(this._element, Dl), this.dispose();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = Hs.getOrCreateInstance(this);
      if (typeof e == "string") {
        if (s[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        s[e](this);
      }
    });
  }
}
Ws(Hs, "close");
oe(Hs);
const kl = "button", Cl = "bs.button", xl = `.${Cl}`, Ll = ".data-api", Il = "active", Bi = '[data-bs-toggle="button"]', Yl = `click${xl}${Ll}`;
class Vs extends pe {
  // Getters
  static get NAME() {
    return kl;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Il));
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = Vs.getOrCreateInstance(this);
      e === "toggle" && s[e]();
    });
  }
}
u.on(document, Yl, Bi, (t) => {
  t.preventDefault();
  const e = t.target.closest(Bi);
  Vs.getOrCreateInstance(e).toggle();
});
oe(Vs);
const Pl = "swipe", Lt = ".bs.swipe", $l = `touchstart${Lt}`, Rl = `touchmove${Lt}`, Wl = `touchend${Lt}`, Hl = `pointerdown${Lt}`, Vl = `pointerup${Lt}`, Fl = "touch", Ul = "pen", jl = "pointer-event", Gl = 40, Bl = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, zl = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Ns extends es {
  constructor(e, s) {
    super(), this._element = e, !(!e || !Ns.isSupported()) && (this._config = this._getConfig(s), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return Bl;
  }
  static get DefaultType() {
    return zl;
  }
  static get NAME() {
    return Pl;
  }
  // Public
  dispose() {
    u.off(this._element, Lt);
  }
  // Private
  _start(e) {
    if (!this._supportPointerEvents) {
      this._deltaX = e.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
  }
  _end(e) {
    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), X(this._config.endCallback);
  }
  _move(e) {
    this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const e = Math.abs(this._deltaX);
    if (e <= Gl)
      return;
    const s = e / this._deltaX;
    this._deltaX = 0, s && X(s > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (u.on(this._element, Hl, (e) => this._start(e)), u.on(this._element, Vl, (e) => this._end(e)), this._element.classList.add(jl)) : (u.on(this._element, $l, (e) => this._start(e)), u.on(this._element, Rl, (e) => this._move(e)), u.on(this._element, Wl, (e) => this._end(e)));
  }
  _eventIsPointerPenTouch(e) {
    return this._supportPointerEvents && (e.pointerType === Ul || e.pointerType === Fl);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const Kl = "carousel", ql = "bs.carousel", Be = `.${ql}`, aa = ".data-api", Zl = "ArrowLeft", Xl = "ArrowRight", Ql = 500, Ht = "next", ht = "prev", mt = "left", ws = "right", Jl = `slide${Be}`, fn = `slid${Be}`, ec = `keydown${Be}`, tc = `mouseenter${Be}`, sc = `mouseleave${Be}`, nc = `dragstart${Be}`, ic = `load${Be}${aa}`, rc = `click${Be}${aa}`, oa = "carousel", fs = "active", ac = "slide", oc = "carousel-item-end", lc = "carousel-item-start", cc = "carousel-item-next", uc = "carousel-item-prev", la = ".active", ca = ".carousel-item", dc = la + ca, hc = ".carousel-item img", fc = ".carousel-indicators", _c = "[data-bs-slide], [data-bs-slide-to]", pc = '[data-bs-ride="carousel"]', mc = {
  [Zl]: ws,
  [Xl]: mt
}, gc = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, vc = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class ts extends pe {
  constructor(e, s) {
    super(e, s), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = m.findOne(fc, this._element), this._addEventListeners(), this._config.ride === oa && this.cycle();
  }
  // Getters
  static get Default() {
    return gc;
  }
  static get DefaultType() {
    return vc;
  }
  static get NAME() {
    return Kl;
  }
  // Public
  next() {
    this._slide(Ht);
  }
  nextWhenVisible() {
    !document.hidden && xt(this._element) && this.next();
  }
  prev() {
    this._slide(ht);
  }
  pause() {
    this._isSliding && qr(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        u.one(this._element, fn, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(e) {
    const s = this._getItems();
    if (e > s.length - 1 || e < 0)
      return;
    if (this._isSliding) {
      u.one(this._element, fn, () => this.to(e));
      return;
    }
    const n = this._getItemIndex(this._getActive());
    if (n === e)
      return;
    const i = e > n ? Ht : ht;
    this._slide(i, s[e]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  // Private
  _configAfterMerge(e) {
    return e.defaultInterval = e.interval, e;
  }
  _addEventListeners() {
    this._config.keyboard && u.on(this._element, ec, (e) => this._keydown(e)), this._config.pause === "hover" && (u.on(this._element, tc, () => this.pause()), u.on(this._element, sc, () => this._maybeEnableCycle())), this._config.touch && Ns.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const n of m.find(hc, this._element))
      u.on(n, nc, (i) => i.preventDefault());
    const s = {
      leftCallback: () => this._slide(this._directionToOrder(mt)),
      rightCallback: () => this._slide(this._directionToOrder(ws)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Ql + this._config.interval));
      }
    };
    this._swipeHelper = new Ns(this._element, s);
  }
  _keydown(e) {
    if (/input|textarea/i.test(e.target.tagName))
      return;
    const s = mc[e.key];
    s && (e.preventDefault(), this._slide(this._directionToOrder(s)));
  }
  _getItemIndex(e) {
    return this._getItems().indexOf(e);
  }
  _setActiveIndicatorElement(e) {
    if (!this._indicatorsElement)
      return;
    const s = m.findOne(la, this._indicatorsElement);
    s.classList.remove(fs), s.removeAttribute("aria-current");
    const n = m.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
    n && (n.classList.add(fs), n.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const e = this._activeElement || this._getActive();
    if (!e)
      return;
    const s = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
    this._config.interval = s || this._config.defaultInterval;
  }
  _slide(e, s = null) {
    if (this._isSliding)
      return;
    const n = this._getActive(), i = e === Ht, r = s || ei(this._getItems(), n, i, this._config.wrap);
    if (r === n)
      return;
    const a = this._getItemIndex(r), o = (y) => u.trigger(this._element, y, {
      relatedTarget: r,
      direction: this._orderToDirection(e),
      from: this._getItemIndex(n),
      to: a
    });
    if (o(Jl).defaultPrevented || !n || !r)
      return;
    const d = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = r;
    const c = i ? lc : oc, g = i ? cc : uc;
    r.classList.add(g), Jt(r), n.classList.add(c), r.classList.add(c);
    const v = () => {
      r.classList.remove(c, g), r.classList.add(fs), n.classList.remove(fs, g, c), this._isSliding = !1, o(fn);
    };
    this._queueCallback(v, n, this._isAnimated()), d && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(ac);
  }
  _getActive() {
    return m.findOne(dc, this._element);
  }
  _getItems() {
    return m.find(ca, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(e) {
    return re() ? e === mt ? ht : Ht : e === mt ? Ht : ht;
  }
  _orderToDirection(e) {
    return re() ? e === ht ? mt : ws : e === ht ? ws : mt;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = ts.getOrCreateInstance(this, e);
      if (typeof e == "number") {
        s.to(e);
        return;
      }
      if (typeof e == "string") {
        if (s[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
u.on(document, rc, _c, function(t) {
  const e = m.getElementFromSelector(this);
  if (!e || !e.classList.contains(oa))
    return;
  t.preventDefault();
  const s = ts.getOrCreateInstance(e), n = this.getAttribute("data-bs-slide-to");
  if (n) {
    s.to(n), s._maybeEnableCycle();
    return;
  }
  if (Ne.getDataAttribute(this, "slide") === "next") {
    s.next(), s._maybeEnableCycle();
    return;
  }
  s.prev(), s._maybeEnableCycle();
});
u.on(window, ic, () => {
  const t = m.find(pc);
  for (const e of t)
    ts.getOrCreateInstance(e);
});
oe(ts);
const yc = "collapse", Ec = "bs.collapse", ss = `.${Ec}`, bc = ".data-api", wc = `show${ss}`, Tc = `shown${ss}`, Sc = `hide${ss}`, Oc = `hidden${ss}`, Ac = `click${ss}${bc}`, _n = "show", yt = "collapse", _s = "collapsing", Dc = "collapsed", Mc = `:scope .${yt} .${yt}`, Nc = "collapse-horizontal", kc = "width", Cc = "height", xc = ".collapse.show, .collapse.collapsing", xn = '[data-bs-toggle="collapse"]', Lc = {
  parent: null,
  toggle: !0
}, Ic = {
  parent: "(null|element)",
  toggle: "boolean"
};
class zt extends pe {
  constructor(e, s) {
    super(e, s), this._isTransitioning = !1, this._triggerArray = [];
    const n = m.find(xn);
    for (const i of n) {
      const r = m.getSelectorFromElement(i), a = m.find(r).filter((o) => o === this._element);
      r !== null && a.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return Lc;
  }
  static get DefaultType() {
    return Ic;
  }
  static get NAME() {
    return yc;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let e = [];
    if (this._config.parent && (e = this._getFirstLevelChildren(xc).filter((o) => o !== this._element).map((o) => zt.getOrCreateInstance(o, {
      toggle: !1
    }))), e.length && e[0]._isTransitioning || u.trigger(this._element, wc).defaultPrevented)
      return;
    for (const o of e)
      o.hide();
    const n = this._getDimension();
    this._element.classList.remove(yt), this._element.classList.add(_s), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(_s), this._element.classList.add(yt, _n), this._element.style[n] = "", u.trigger(this._element, Tc);
    }, a = `scroll${n[0].toUpperCase() + n.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[a]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || u.trigger(this._element, Sc).defaultPrevented)
      return;
    const s = this._getDimension();
    this._element.style[s] = `${this._element.getBoundingClientRect()[s]}px`, Jt(this._element), this._element.classList.add(_s), this._element.classList.remove(yt, _n);
    for (const i of this._triggerArray) {
      const r = m.getElementFromSelector(i);
      r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const n = () => {
      this._isTransitioning = !1, this._element.classList.remove(_s), this._element.classList.add(yt), u.trigger(this._element, Oc);
    };
    this._element.style[s] = "", this._queueCallback(n, this._element, !0);
  }
  _isShown(e = this._element) {
    return e.classList.contains(_n);
  }
  // Private
  _configAfterMerge(e) {
    return e.toggle = !!e.toggle, e.parent = Fe(e.parent), e;
  }
  _getDimension() {
    return this._element.classList.contains(Nc) ? kc : Cc;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const e = this._getFirstLevelChildren(xn);
    for (const s of e) {
      const n = m.getElementFromSelector(s);
      n && this._addAriaAndCollapsedClass([s], this._isShown(n));
    }
  }
  _getFirstLevelChildren(e) {
    const s = m.find(Mc, this._config.parent);
    return m.find(e, this._config.parent).filter((n) => !s.includes(n));
  }
  _addAriaAndCollapsedClass(e, s) {
    if (e.length)
      for (const n of e)
        n.classList.toggle(Dc, !s), n.setAttribute("aria-expanded", s);
  }
  // Static
  static jQueryInterface(e) {
    const s = {};
    return typeof e == "string" && /show|hide/.test(e) && (s.toggle = !1), this.each(function() {
      const n = zt.getOrCreateInstance(this, s);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
u.on(document, Ac, xn, function(t) {
  (t.target.tagName === "A" || t.delegateTarget && t.delegateTarget.tagName === "A") && t.preventDefault();
  for (const e of m.getMultipleElementsFromSelector(this))
    zt.getOrCreateInstance(e, {
      toggle: !1
    }).toggle();
});
oe(zt);
const zi = "dropdown", Yc = "bs.dropdown", ot = `.${Yc}`, si = ".data-api", Pc = "Escape", Ki = "Tab", $c = "ArrowUp", qi = "ArrowDown", Rc = 2, Wc = `hide${ot}`, Hc = `hidden${ot}`, Vc = `show${ot}`, Fc = `shown${ot}`, ua = `click${ot}${si}`, da = `keydown${ot}${si}`, Uc = `keyup${ot}${si}`, gt = "show", jc = "dropup", Gc = "dropend", Bc = "dropstart", zc = "dropup-center", Kc = "dropdown-center", et = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', qc = `${et}.${gt}`, Ts = ".dropdown-menu", Zc = ".navbar", Xc = ".navbar-nav", Qc = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Jc = re() ? "top-end" : "top-start", eu = re() ? "top-start" : "top-end", tu = re() ? "bottom-end" : "bottom-start", su = re() ? "bottom-start" : "bottom-end", nu = re() ? "left-start" : "right-start", iu = re() ? "right-start" : "left-start", ru = "top", au = "bottom", ou = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, lu = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class ye extends pe {
  constructor(e, s) {
    super(e, s), this._popper = null, this._parent = this._element.parentNode, this._menu = m.next(this._element, Ts)[0] || m.prev(this._element, Ts)[0] || m.findOne(Ts, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return ou;
  }
  static get DefaultType() {
    return lu;
  }
  static get NAME() {
    return zi;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Ue(this._element) || this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    if (!u.trigger(this._element, Vc, e).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Xc))
        for (const n of [].concat(...document.body.children))
          u.on(n, "mouseover", Ms);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(gt), this._element.classList.add(gt), u.trigger(this._element, Fc, e);
    }
  }
  hide() {
    if (Ue(this._element) || !this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    this._completeHide(e);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(e) {
    if (!u.trigger(this._element, Wc, e).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const n of [].concat(...document.body.children))
          u.off(n, "mouseover", Ms);
      this._popper && this._popper.destroy(), this._menu.classList.remove(gt), this._element.classList.remove(gt), this._element.setAttribute("aria-expanded", "false"), Ne.removeDataAttribute(this._menu, "popper"), u.trigger(this._element, Hc, e);
    }
  }
  _getConfig(e) {
    if (e = super._getConfig(e), typeof e.reference == "object" && !Me(e.reference) && typeof e.reference.getBoundingClientRect != "function")
      throw new TypeError(`${zi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return e;
  }
  _createPopper() {
    if (typeof zr > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let e = this._element;
    this._config.reference === "parent" ? e = this._parent : Me(this._config.reference) ? e = Fe(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
    const s = this._getPopperConfig();
    this._popper = Jn(e, this._menu, s);
  }
  _isShown() {
    return this._menu.classList.contains(gt);
  }
  _getPlacement() {
    const e = this._parent;
    if (e.classList.contains(Gc))
      return nu;
    if (e.classList.contains(Bc))
      return iu;
    if (e.classList.contains(zc))
      return ru;
    if (e.classList.contains(Kc))
      return au;
    const s = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return e.classList.contains(jc) ? s ? eu : Jc : s ? su : tu;
  }
  _detectNavbar() {
    return this._element.closest(Zc) !== null;
  }
  _getOffset() {
    const {
      offset: e
    } = this._config;
    return typeof e == "string" ? e.split(",").map((s) => Number.parseInt(s, 10)) : typeof e == "function" ? (s) => e(s, this._element) : e;
  }
  _getPopperConfig() {
    const e = {
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
    return (this._inNavbar || this._config.display === "static") && (Ne.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...e,
      ...X(this._config.popperConfig, [e])
    };
  }
  _selectMenuItem({
    key: e,
    target: s
  }) {
    const n = m.find(Qc, this._menu).filter((i) => xt(i));
    n.length && ei(n, s, e === qi, !n.includes(s)).focus();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = ye.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
  static clearMenus(e) {
    if (e.button === Rc || e.type === "keyup" && e.key !== Ki)
      return;
    const s = m.find(qc);
    for (const n of s) {
      const i = ye.getInstance(n);
      if (!i || i._config.autoClose === !1)
        continue;
      const r = e.composedPath(), a = r.includes(i._menu);
      if (r.includes(i._element) || i._config.autoClose === "inside" && !a || i._config.autoClose === "outside" && a || i._menu.contains(e.target) && (e.type === "keyup" && e.key === Ki || /input|select|option|textarea|form/i.test(e.target.tagName)))
        continue;
      const o = {
        relatedTarget: i._element
      };
      e.type === "click" && (o.clickEvent = e), i._completeHide(o);
    }
  }
  static dataApiKeydownHandler(e) {
    const s = /input|textarea/i.test(e.target.tagName), n = e.key === Pc, i = [$c, qi].includes(e.key);
    if (!i && !n || s && !n)
      return;
    e.preventDefault();
    const r = this.matches(et) ? this : m.prev(this, et)[0] || m.next(this, et)[0] || m.findOne(et, e.delegateTarget.parentNode), a = ye.getOrCreateInstance(r);
    if (i) {
      e.stopPropagation(), a.show(), a._selectMenuItem(e);
      return;
    }
    a._isShown() && (e.stopPropagation(), a.hide(), r.focus());
  }
}
u.on(document, da, et, ye.dataApiKeydownHandler);
u.on(document, da, Ts, ye.dataApiKeydownHandler);
u.on(document, ua, ye.clearMenus);
u.on(document, Uc, ye.clearMenus);
u.on(document, ua, et, function(t) {
  t.preventDefault(), ye.getOrCreateInstance(this).toggle();
});
oe(ye);
const ha = "backdrop", cu = "fade", Zi = "show", Xi = `mousedown.bs.${ha}`, uu = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, du = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class fa extends es {
  constructor(e) {
    super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return uu;
  }
  static get DefaultType() {
    return du;
  }
  static get NAME() {
    return ha;
  }
  // Public
  show(e) {
    if (!this._config.isVisible) {
      X(e);
      return;
    }
    this._append();
    const s = this._getElement();
    this._config.isAnimated && Jt(s), s.classList.add(Zi), this._emulateAnimation(() => {
      X(e);
    });
  }
  hide(e) {
    if (!this._config.isVisible) {
      X(e);
      return;
    }
    this._getElement().classList.remove(Zi), this._emulateAnimation(() => {
      this.dispose(), X(e);
    });
  }
  dispose() {
    this._isAppended && (u.off(this._element, Xi), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const e = document.createElement("div");
      e.className = this._config.className, this._config.isAnimated && e.classList.add(cu), this._element = e;
    }
    return this._element;
  }
  _configAfterMerge(e) {
    return e.rootElement = Fe(e.rootElement), e;
  }
  _append() {
    if (this._isAppended)
      return;
    const e = this._getElement();
    this._config.rootElement.append(e), u.on(e, Xi, () => {
      X(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(e) {
    Qr(e, this._getElement(), this._config.isAnimated);
  }
}
const hu = "focustrap", fu = "bs.focustrap", ks = `.${fu}`, _u = `focusin${ks}`, pu = `keydown.tab${ks}`, mu = "Tab", gu = "forward", Qi = "backward", vu = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, yu = {
  autofocus: "boolean",
  trapElement: "element"
};
class _a extends es {
  constructor(e) {
    super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return vu;
  }
  static get DefaultType() {
    return yu;
  }
  static get NAME() {
    return hu;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), u.off(document, ks), u.on(document, _u, (e) => this._handleFocusin(e)), u.on(document, pu, (e) => this._handleKeydown(e)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, u.off(document, ks));
  }
  // Private
  _handleFocusin(e) {
    const {
      trapElement: s
    } = this._config;
    if (e.target === document || e.target === s || s.contains(e.target))
      return;
    const n = m.focusableChildren(s);
    n.length === 0 ? s.focus() : this._lastTabNavDirection === Qi ? n[n.length - 1].focus() : n[0].focus();
  }
  _handleKeydown(e) {
    e.key === mu && (this._lastTabNavDirection = e.shiftKey ? Qi : gu);
  }
}
const Ji = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", er = ".sticky-top", ps = "padding-right", tr = "margin-right";
class Ln {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const e = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - e);
  }
  hide() {
    const e = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, ps, (s) => s + e), this._setElementAttributes(Ji, ps, (s) => s + e), this._setElementAttributes(er, tr, (s) => s - e);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, ps), this._resetElementAttributes(Ji, ps), this._resetElementAttributes(er, tr);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(e, s, n) {
    const i = this.getWidth(), r = (a) => {
      if (a !== this._element && window.innerWidth > a.clientWidth + i)
        return;
      this._saveInitialAttribute(a, s);
      const o = window.getComputedStyle(a).getPropertyValue(s);
      a.style.setProperty(s, `${n(Number.parseFloat(o))}px`);
    };
    this._applyManipulationCallback(e, r);
  }
  _saveInitialAttribute(e, s) {
    const n = e.style.getPropertyValue(s);
    n && Ne.setDataAttribute(e, s, n);
  }
  _resetElementAttributes(e, s) {
    const n = (i) => {
      const r = Ne.getDataAttribute(i, s);
      if (r === null) {
        i.style.removeProperty(s);
        return;
      }
      Ne.removeDataAttribute(i, s), i.style.setProperty(s, r);
    };
    this._applyManipulationCallback(e, n);
  }
  _applyManipulationCallback(e, s) {
    if (Me(e)) {
      s(e);
      return;
    }
    for (const n of m.find(e, this._element))
      s(n);
  }
}
const Eu = "modal", bu = "bs.modal", ae = `.${bu}`, wu = ".data-api", Tu = "Escape", Su = `hide${ae}`, Ou = `hidePrevented${ae}`, pa = `hidden${ae}`, ma = `show${ae}`, Au = `shown${ae}`, Du = `resize${ae}`, Mu = `click.dismiss${ae}`, Nu = `mousedown.dismiss${ae}`, ku = `keydown.dismiss${ae}`, Cu = `click${ae}${wu}`, sr = "modal-open", xu = "fade", nr = "show", pn = "modal-static", Lu = ".modal.show", Iu = ".modal-dialog", Yu = ".modal-body", Pu = '[data-bs-toggle="modal"]', $u = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Ru = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class Nt extends pe {
  constructor(e, s) {
    super(e, s), this._dialog = m.findOne(Iu, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ln(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return $u;
  }
  static get DefaultType() {
    return Ru;
  }
  static get NAME() {
    return Eu;
  }
  // Public
  toggle(e) {
    return this._isShown ? this.hide() : this.show(e);
  }
  show(e) {
    this._isShown || this._isTransitioning || u.trigger(this._element, ma, {
      relatedTarget: e
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(sr), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
  }
  hide() {
    !this._isShown || this._isTransitioning || u.trigger(this._element, Su).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(nr), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    u.off(window, ae), u.off(this._dialog, ae), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new fa({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new _a({
      trapElement: this._element
    });
  }
  _showElement(e) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const s = m.findOne(Yu, this._dialog);
    s && (s.scrollTop = 0), Jt(this._element), this._element.classList.add(nr);
    const n = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, u.trigger(this._element, Au, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    u.on(this._element, ku, (e) => {
      if (e.key === Tu) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), u.on(window, Du, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), u.on(this._element, Nu, (e) => {
      u.one(this._element, Mu, (s) => {
        if (!(this._element !== e.target || this._element !== s.target)) {
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
      document.body.classList.remove(sr), this._resetAdjustments(), this._scrollBar.reset(), u.trigger(this._element, pa);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(xu);
  }
  _triggerBackdropTransition() {
    if (u.trigger(this._element, Ou).defaultPrevented)
      return;
    const s = this._element.scrollHeight > document.documentElement.clientHeight, n = this._element.style.overflowY;
    n === "hidden" || this._element.classList.contains(pn) || (s || (this._element.style.overflowY = "hidden"), this._element.classList.add(pn), this._queueCallback(() => {
      this._element.classList.remove(pn), this._queueCallback(() => {
        this._element.style.overflowY = n;
      }, this._dialog);
    }, this._dialog), this._element.focus());
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const e = this._element.scrollHeight > document.documentElement.clientHeight, s = this._scrollBar.getWidth(), n = s > 0;
    if (n && !e) {
      const i = re() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${s}px`;
    }
    if (!n && e) {
      const i = re() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${s}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(e, s) {
    return this.each(function() {
      const n = Nt.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e](s);
      }
    });
  }
}
u.on(document, Cu, Pu, function(t) {
  const e = m.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && t.preventDefault(), u.one(e, ma, (i) => {
    i.defaultPrevented || u.one(e, pa, () => {
      xt(this) && this.focus();
    });
  });
  const s = m.findOne(Lu);
  s && Nt.getInstance(s).hide(), Nt.getOrCreateInstance(e).toggle(this);
});
Ws(Nt);
oe(Nt);
const Wu = "offcanvas", Hu = "bs.offcanvas", Ie = `.${Hu}`, ga = ".data-api", Vu = `load${Ie}${ga}`, Fu = "Escape", ir = "show", rr = "showing", ar = "hiding", Uu = "offcanvas-backdrop", va = ".offcanvas.show", ju = `show${Ie}`, Gu = `shown${Ie}`, Bu = `hide${Ie}`, or = `hidePrevented${Ie}`, ya = `hidden${Ie}`, zu = `resize${Ie}`, Ku = `click${Ie}${ga}`, qu = `keydown.dismiss${Ie}`, Zu = '[data-bs-toggle="offcanvas"]', Xu = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, Qu = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class je extends pe {
  constructor(e, s) {
    super(e, s), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Xu;
  }
  static get DefaultType() {
    return Qu;
  }
  static get NAME() {
    return Wu;
  }
  // Public
  toggle(e) {
    return this._isShown ? this.hide() : this.show(e);
  }
  show(e) {
    if (this._isShown || u.trigger(this._element, ju, {
      relatedTarget: e
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new Ln().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(rr);
    const n = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(ir), this._element.classList.remove(rr), u.trigger(this._element, Gu, {
        relatedTarget: e
      });
    };
    this._queueCallback(n, this._element, !0);
  }
  hide() {
    if (!this._isShown || u.trigger(this._element, Bu).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ar), this._backdrop.hide();
    const s = () => {
      this._element.classList.remove(ir, ar), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Ln().reset(), u.trigger(this._element, ya);
    };
    this._queueCallback(s, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const e = () => {
      if (this._config.backdrop === "static") {
        u.trigger(this._element, or);
        return;
      }
      this.hide();
    }, s = !!this._config.backdrop;
    return new fa({
      className: Uu,
      isVisible: s,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: s ? e : null
    });
  }
  _initializeFocusTrap() {
    return new _a({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    u.on(this._element, qu, (e) => {
      if (e.key === Fu) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        u.trigger(this._element, or);
      }
    });
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = je.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (s[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        s[e](this);
      }
    });
  }
}
u.on(document, Ku, Zu, function(t) {
  const e = m.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), Ue(this))
    return;
  u.one(e, ya, () => {
    xt(this) && this.focus();
  });
  const s = m.findOne(va);
  s && s !== e && je.getInstance(s).hide(), je.getOrCreateInstance(e).toggle(this);
});
u.on(window, Vu, () => {
  for (const t of m.find(va))
    je.getOrCreateInstance(t).show();
});
u.on(window, zu, () => {
  for (const t of m.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(t).position !== "fixed" && je.getOrCreateInstance(t).hide();
});
Ws(je);
oe(je);
const Ju = /^aria-[\w-]*$/i, Ea = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", Ju],
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
}, ed = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), td = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, sd = (t, e) => {
  const s = t.nodeName.toLowerCase();
  return e.includes(s) ? ed.has(s) ? !!td.test(t.nodeValue) : !0 : e.filter((n) => n instanceof RegExp).some((n) => n.test(s));
};
function nd(t, e, s) {
  if (!t.length)
    return t;
  if (s && typeof s == "function")
    return s(t);
  const i = new window.DOMParser().parseFromString(t, "text/html"), r = [].concat(...i.body.querySelectorAll("*"));
  for (const a of r) {
    const o = a.nodeName.toLowerCase();
    if (!Object.keys(e).includes(o)) {
      a.remove();
      continue;
    }
    const l = [].concat(...a.attributes), d = [].concat(e["*"] || [], e[o] || []);
    for (const c of l)
      sd(c, d) || a.removeAttribute(c.nodeName);
  }
  return i.body.innerHTML;
}
const id = "TemplateFactory", rd = {
  allowList: Ea,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, ad = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, od = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class ld extends es {
  constructor(e) {
    super(), this._config = this._getConfig(e);
  }
  // Getters
  static get Default() {
    return rd;
  }
  static get DefaultType() {
    return ad;
  }
  static get NAME() {
    return id;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((e) => this._resolvePossibleFunction(e)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(e) {
    return this._checkContent(e), this._config.content = {
      ...this._config.content,
      ...e
    }, this;
  }
  toHtml() {
    const e = document.createElement("div");
    e.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, r] of Object.entries(this._config.content))
      this._setContent(e, r, i);
    const s = e.children[0], n = this._resolvePossibleFunction(this._config.extraClass);
    return n && s.classList.add(...n.split(" ")), s;
  }
  // Private
  _typeCheckConfig(e) {
    super._typeCheckConfig(e), this._checkContent(e.content);
  }
  _checkContent(e) {
    for (const [s, n] of Object.entries(e))
      super._typeCheckConfig({
        selector: s,
        entry: n
      }, od);
  }
  _setContent(e, s, n) {
    const i = m.findOne(n, e);
    if (i) {
      if (s = this._resolvePossibleFunction(s), !s) {
        i.remove();
        return;
      }
      if (Me(s)) {
        this._putElementInTemplate(Fe(s), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(s);
        return;
      }
      i.textContent = s;
    }
  }
  _maybeSanitize(e) {
    return this._config.sanitize ? nd(e, this._config.allowList, this._config.sanitizeFn) : e;
  }
  _resolvePossibleFunction(e) {
    return X(e, [this]);
  }
  _putElementInTemplate(e, s) {
    if (this._config.html) {
      s.innerHTML = "", s.append(e);
      return;
    }
    s.textContent = e.textContent;
  }
}
const cd = "tooltip", ud = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), mn = "fade", dd = "modal", ms = "show", hd = ".tooltip-inner", lr = `.${dd}`, cr = "hide.bs.modal", Vt = "hover", gn = "focus", fd = "click", _d = "manual", pd = "hide", md = "hidden", gd = "show", vd = "shown", yd = "inserted", Ed = "click", bd = "focusin", wd = "focusout", Td = "mouseenter", Sd = "mouseleave", Od = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: re() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: re() ? "right" : "left"
}, Ad = {
  allowList: Ea,
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
}, Dd = {
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
class It extends pe {
  constructor(e, s) {
    if (typeof zr > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(e, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Ad;
  }
  static get DefaultType() {
    return Dd;
  }
  static get NAME() {
    return cd;
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
    clearTimeout(this._timeout), u.off(this._element.closest(lr), cr, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const e = u.trigger(this._element, this.constructor.eventName(gd)), n = (Zr(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (e.defaultPrevented || !n)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: r
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), u.trigger(this._element, this.constructor.eventName(yd))), this._popper = this._createPopper(i), i.classList.add(ms), "ontouchstart" in document.documentElement)
      for (const o of [].concat(...document.body.children))
        u.on(o, "mouseover", Ms);
    const a = () => {
      u.trigger(this._element, this.constructor.eventName(vd)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(a, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || u.trigger(this._element, this.constructor.eventName(pd)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(ms), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        u.off(i, "mouseover", Ms);
    this._activeTrigger[fd] = !1, this._activeTrigger[gn] = !1, this._activeTrigger[Vt] = !1, this._isHovered = null;
    const n = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), u.trigger(this._element, this.constructor.eventName(md)));
    };
    this._queueCallback(n, this.tip, this._isAnimated());
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
  _createTipElement(e) {
    const s = this._getTemplateFactory(e).toHtml();
    if (!s)
      return null;
    s.classList.remove(mn, ms), s.classList.add(`bs-${this.constructor.NAME}-auto`);
    const n = fl(this.constructor.NAME).toString();
    return s.setAttribute("id", n), this._isAnimated() && s.classList.add(mn), s;
  }
  setContent(e) {
    this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(e) {
    return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new ld({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: e,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [hd]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(e) {
    return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(mn);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(ms);
  }
  _createPopper(e) {
    const s = X(this._config.placement, [this, e, this._element]), n = Od[s.toUpperCase()];
    return Jn(this._element, e, this._getPopperConfig(n));
  }
  _getOffset() {
    const {
      offset: e
    } = this._config;
    return typeof e == "string" ? e.split(",").map((s) => Number.parseInt(s, 10)) : typeof e == "function" ? (s) => e(s, this._element) : e;
  }
  _resolvePossibleFunction(e) {
    return X(e, [this._element]);
  }
  _getPopperConfig(e) {
    const s = {
      placement: e,
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
        fn: (n) => {
          this._getTipElement().setAttribute("data-popper-placement", n.state.placement);
        }
      }]
    };
    return {
      ...s,
      ...X(this._config.popperConfig, [s])
    };
  }
  _setListeners() {
    const e = this._config.trigger.split(" ");
    for (const s of e)
      if (s === "click")
        u.on(this._element, this.constructor.eventName(Ed), this._config.selector, (n) => {
          this._initializeOnDelegatedTarget(n).toggle();
        });
      else if (s !== _d) {
        const n = s === Vt ? this.constructor.eventName(Td) : this.constructor.eventName(bd), i = s === Vt ? this.constructor.eventName(Sd) : this.constructor.eventName(wd);
        u.on(this._element, n, this._config.selector, (r) => {
          const a = this._initializeOnDelegatedTarget(r);
          a._activeTrigger[r.type === "focusin" ? gn : Vt] = !0, a._enter();
        }), u.on(this._element, i, this._config.selector, (r) => {
          const a = this._initializeOnDelegatedTarget(r);
          a._activeTrigger[r.type === "focusout" ? gn : Vt] = a._element.contains(r.relatedTarget), a._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, u.on(this._element.closest(lr), cr, this._hideModalHandler);
  }
  _fixTitle() {
    const e = this._element.getAttribute("title");
    e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
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
  _setTimeout(e, s) {
    clearTimeout(this._timeout), this._timeout = setTimeout(e, s);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(e) {
    const s = Ne.getDataAttributes(this._element);
    for (const n of Object.keys(s))
      ud.has(n) && delete s[n];
    return e = {
      ...s,
      ...typeof e == "object" && e ? e : {}
    }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e.container = e.container === !1 ? document.body : Fe(e.container), typeof e.delay == "number" && (e.delay = {
      show: e.delay,
      hide: e.delay
    }), typeof e.title == "number" && (e.title = e.title.toString()), typeof e.content == "number" && (e.content = e.content.toString()), e;
  }
  _getDelegateConfig() {
    const e = {};
    for (const [s, n] of Object.entries(this._config))
      this.constructor.Default[s] !== n && (e[s] = n);
    return e.selector = !1, e.trigger = "manual", e;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = It.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
oe(It);
const Md = "popover", Nd = ".popover-header", kd = ".popover-body", Cd = {
  ...It.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, xd = {
  ...It.DefaultType,
  content: "(null|string|element|function)"
};
class Fs extends It {
  // Getters
  static get Default() {
    return Cd;
  }
  static get DefaultType() {
    return xd;
  }
  static get NAME() {
    return Md;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Nd]: this._getTitle(),
      [kd]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = Fs.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
oe(Fs);
const Ld = "scrollspy", Id = "bs.scrollspy", ni = `.${Id}`, Yd = ".data-api", Pd = `activate${ni}`, ur = `click${ni}`, $d = `load${ni}${Yd}`, Rd = "dropdown-item", ft = "active", Wd = '[data-bs-spy="scroll"]', vn = "[href]", Hd = ".nav, .list-group", dr = ".nav-link", Vd = ".nav-item", Fd = ".list-group-item", Ud = `${dr}, ${Vd} > ${dr}, ${Fd}`, jd = ".dropdown", Gd = ".dropdown-toggle", Bd = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, zd = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class Us extends pe {
  constructor(e, s) {
    super(e, s), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return Bd;
  }
  static get DefaultType() {
    return zd;
  }
  static get NAME() {
    return Ld;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
    for (const e of this._observableSections.values())
      this._observer.observe(e);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  // Private
  _configAfterMerge(e) {
    return e.target = Fe(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((s) => Number.parseFloat(s))), e;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (u.off(this._config.target, ur), u.on(this._config.target, ur, vn, (e) => {
      const s = this._observableSections.get(e.target.hash);
      if (s) {
        e.preventDefault();
        const n = this._rootElement || window, i = s.offsetTop - this._element.offsetTop;
        if (n.scrollTo) {
          n.scrollTo({
            top: i,
            behavior: "smooth"
          });
          return;
        }
        n.scrollTop = i;
      }
    }));
  }
  _getNewObserver() {
    const e = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((s) => this._observerCallback(s), e);
  }
  // The logic of selection
  _observerCallback(e) {
    const s = (a) => this._targetLinks.get(`#${a.target.id}`), n = (a) => {
      this._previousScrollData.visibleEntryTop = a.target.offsetTop, this._process(s(a));
    }, i = (this._rootElement || document.documentElement).scrollTop, r = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const a of e) {
      if (!a.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(s(a));
        continue;
      }
      const o = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (r && o) {
        if (n(a), !i)
          return;
        continue;
      }
      !r && !o && n(a);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const e = m.find(vn, this._config.target);
    for (const s of e) {
      if (!s.hash || Ue(s))
        continue;
      const n = m.findOne(decodeURI(s.hash), this._element);
      xt(n) && (this._targetLinks.set(decodeURI(s.hash), s), this._observableSections.set(s.hash, n));
    }
  }
  _process(e) {
    this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(ft), this._activateParents(e), u.trigger(this._element, Pd, {
      relatedTarget: e
    }));
  }
  _activateParents(e) {
    if (e.classList.contains(Rd)) {
      m.findOne(Gd, e.closest(jd)).classList.add(ft);
      return;
    }
    for (const s of m.parents(e, Hd))
      for (const n of m.prev(s, Ud))
        n.classList.add(ft);
  }
  _clearActiveClass(e) {
    e.classList.remove(ft);
    const s = m.find(`${vn}.${ft}`, e);
    for (const n of s)
      n.classList.remove(ft);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = Us.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (s[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
u.on(window, $d, () => {
  for (const t of m.find(Wd))
    Us.getOrCreateInstance(t);
});
oe(Us);
const Kd = "tab", qd = "bs.tab", lt = `.${qd}`, Zd = `hide${lt}`, Xd = `hidden${lt}`, Qd = `show${lt}`, Jd = `shown${lt}`, eh = `click${lt}`, th = `keydown${lt}`, sh = `load${lt}`, nh = "ArrowLeft", hr = "ArrowRight", ih = "ArrowUp", fr = "ArrowDown", yn = "Home", _r = "End", tt = "active", pr = "fade", En = "show", rh = "dropdown", ba = ".dropdown-toggle", ah = ".dropdown-menu", bn = `:not(${ba})`, oh = '.list-group, .nav, [role="tablist"]', lh = ".nav-item, .list-group-item", ch = `.nav-link${bn}, .list-group-item${bn}, [role="tab"]${bn}`, wa = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', wn = `${ch}, ${wa}`, uh = `.${tt}[data-bs-toggle="tab"], .${tt}[data-bs-toggle="pill"], .${tt}[data-bs-toggle="list"]`;
class kt extends pe {
  constructor(e) {
    super(e), this._parent = this._element.closest(oh), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), u.on(this._element, th, (s) => this._keydown(s)));
  }
  // Getters
  static get NAME() {
    return Kd;
  }
  // Public
  show() {
    const e = this._element;
    if (this._elemIsActive(e))
      return;
    const s = this._getActiveElem(), n = s ? u.trigger(s, Zd, {
      relatedTarget: e
    }) : null;
    u.trigger(e, Qd, {
      relatedTarget: s
    }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(s, e), this._activate(e, s));
  }
  // Private
  _activate(e, s) {
    if (!e)
      return;
    e.classList.add(tt), this._activate(m.getElementFromSelector(e));
    const n = () => {
      if (e.getAttribute("role") !== "tab") {
        e.classList.add(En);
        return;
      }
      e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), u.trigger(e, Jd, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, e, e.classList.contains(pr));
  }
  _deactivate(e, s) {
    if (!e)
      return;
    e.classList.remove(tt), e.blur(), this._deactivate(m.getElementFromSelector(e));
    const n = () => {
      if (e.getAttribute("role") !== "tab") {
        e.classList.remove(En);
        return;
      }
      e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), u.trigger(e, Xd, {
        relatedTarget: s
      });
    };
    this._queueCallback(n, e, e.classList.contains(pr));
  }
  _keydown(e) {
    if (![nh, hr, ih, fr, yn, _r].includes(e.key))
      return;
    e.stopPropagation(), e.preventDefault();
    const s = this._getChildren().filter((i) => !Ue(i));
    let n;
    if ([yn, _r].includes(e.key))
      n = s[e.key === yn ? 0 : s.length - 1];
    else {
      const i = [hr, fr].includes(e.key);
      n = ei(s, e.target, i, !0);
    }
    n && (n.focus({
      preventScroll: !0
    }), kt.getOrCreateInstance(n).show());
  }
  _getChildren() {
    return m.find(wn, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((e) => this._elemIsActive(e)) || null;
  }
  _setInitialAttributes(e, s) {
    this._setAttributeIfNotExists(e, "role", "tablist");
    for (const n of s)
      this._setInitialAttributesOnChild(n);
  }
  _setInitialAttributesOnChild(e) {
    e = this._getInnerElement(e);
    const s = this._elemIsActive(e), n = this._getOuterElement(e);
    e.setAttribute("aria-selected", s), n !== e && this._setAttributeIfNotExists(n, "role", "presentation"), s || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e);
  }
  _setInitialAttributesOnTargetPanel(e) {
    const s = m.getElementFromSelector(e);
    s && (this._setAttributeIfNotExists(s, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(s, "aria-labelledby", `${e.id}`));
  }
  _toggleDropDown(e, s) {
    const n = this._getOuterElement(e);
    if (!n.classList.contains(rh))
      return;
    const i = (r, a) => {
      const o = m.findOne(r, n);
      o && o.classList.toggle(a, s);
    };
    i(ba, tt), i(ah, En), n.setAttribute("aria-expanded", s);
  }
  _setAttributeIfNotExists(e, s, n) {
    e.hasAttribute(s) || e.setAttribute(s, n);
  }
  _elemIsActive(e) {
    return e.classList.contains(tt);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(e) {
    return e.matches(wn) ? e : m.findOne(wn, e);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(e) {
    return e.closest(lh) || e;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = kt.getOrCreateInstance(this);
      if (typeof e == "string") {
        if (s[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
u.on(document, eh, wa, function(t) {
  ["A", "AREA"].includes(this.tagName) && t.preventDefault(), !Ue(this) && kt.getOrCreateInstance(this).show();
});
u.on(window, sh, () => {
  for (const t of m.find(uh))
    kt.getOrCreateInstance(t);
});
oe(kt);
const dh = "toast", hh = "bs.toast", ze = `.${hh}`, fh = `mouseover${ze}`, _h = `mouseout${ze}`, ph = `focusin${ze}`, mh = `focusout${ze}`, gh = `hide${ze}`, vh = `hidden${ze}`, yh = `show${ze}`, Eh = `shown${ze}`, bh = "fade", mr = "hide", gs = "show", vs = "showing", wh = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Th = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class js extends pe {
  constructor(e, s) {
    super(e, s), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Th;
  }
  static get DefaultType() {
    return wh;
  }
  static get NAME() {
    return dh;
  }
  // Public
  show() {
    if (u.trigger(this._element, yh).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(bh);
    const s = () => {
      this._element.classList.remove(vs), u.trigger(this._element, Eh), this._maybeScheduleHide();
    };
    this._element.classList.remove(mr), Jt(this._element), this._element.classList.add(gs, vs), this._queueCallback(s, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || u.trigger(this._element, gh).defaultPrevented)
      return;
    const s = () => {
      this._element.classList.add(mr), this._element.classList.remove(vs, gs), u.trigger(this._element, vh);
    };
    this._element.classList.add(vs), this._queueCallback(s, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(gs), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(gs);
  }
  // Private
  _maybeScheduleHide() {
    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay)));
  }
  _onInteraction(e, s) {
    switch (e.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = s;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = s;
        break;
      }
    }
    if (s) {
      this._clearTimeout();
      return;
    }
    const n = e.relatedTarget;
    this._element === n || this._element.contains(n) || this._maybeScheduleHide();
  }
  _setListeners() {
    u.on(this._element, fh, (e) => this._onInteraction(e, !0)), u.on(this._element, _h, (e) => this._onInteraction(e, !1)), u.on(this._element, ph, (e) => this._onInteraction(e, !0)), u.on(this._element, mh, (e) => this._onInteraction(e, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const s = js.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e](this);
      }
    });
  }
}
Ws(js);
oe(js);
class Gs {
  constructor(e) {
    if (this.constructor === Gs)
      throw new Error("It's abstract class");
    this.context = e;
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
class Sh extends Gs {
  init() {
    this.popover = new Fs(this.context.element, {
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
    }), document.addEventListener("click", (e) => {
      const s = e.target;
      if (s === this.popover.tip || s === this.context.element) return;
      let n = s;
      for (; n = n.parentNode; )
        if (n === this.popover.tip) return;
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
class Oh extends Gs {
  init() {
    const e = () => {
      if (!this.context.disabled) {
        const s = this.context.typeElement.create();
        this.event_show(), this.context.element.removeEventListener("click", e), this.context.element.innerHTML = "", this.context.element.append(s), this.event_shown();
      }
    };
    this.context.element.addEventListener("click", e);
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
class ct {
  constructor(e) {
    z(this, "context", null);
    z(this, "element", null);
    z(this, "error", null);
    z(this, "form", null);
    z(this, "load", null);
    z(this, "buttons", { success: null, cancel: null });
    if (this.constructor === ct)
      throw new Error("It's abstract class");
    this.context = e;
  }
  create() {
    throw new Error("Method `create` not define!");
  }
  createContainer(e) {
    const s = document.createElement("div");
    return this.element = e, this.error = this.createContainerError(), this.form = this.createContainerForm(), this.load = this.createContainerLoad(), this.form.append(e, this.load), this.buttons.success = null, this.buttons.cancel = null, this.context.showbuttons && (this.buttons.success = this.createButtonSuccess(), this.buttons.cancel = this.createButtonCancel(), this.form.append(this.buttons.success, this.buttons.cancel)), s.append(this.error, this.form), s;
  }
  createContainerError() {
    const e = document.createElement("div");
    return e.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold"), e.style.display = "none", e;
  }
  createContainerForm() {
    const e = document.createElement("form");
    return e.classList.add("d-flex", "align-items-start"), e.style.gap = "20px", e.addEventListener("submit", async (s) => {
      s.preventDefault();
      const n = this.getValue();
      if (this.context.send && this.context.pk && this.context.url && this.context.value !== n) {
        this.showLoad();
        let i;
        try {
          const r = await this.ajax(n);
          r.ok ? i = await this.context.success(r, n) : i = await this.context.error(r, n) || `${r.status} ${r.statusText}`;
        } catch (r) {
          console.error(r), i = r;
        }
        i ? (this.setError(i), this.showError()) : (this.setError(null), this.hideError(), this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText()), this.hideLoad();
      } else
        this.context.value = this.getValue(), this.context.modeElement.hide(), this.initText();
      this.context.element.dispatchEvent(new CustomEvent("save"));
    }), e;
  }
  createContainerLoad() {
    const e = document.createElement("div");
    e.style.display = "none", e.style.position = "absolute", e.style.background = "white", e.style.width = "100%", e.style.height = "100%", e.style.top = 0, e.style.left = 0;
    const s = document.createElement("div");
    return s.classList.add("dark-editable-loader"), e.append(s), e;
  }
  createButton() {
    const e = document.createElement("button");
    return e.type = "button", e.classList.add("btn", "btn-sm"), e.style.color = "transparent", e.style.textShadow = "0 0 0 white", e;
  }
  createButtonSuccess() {
    const e = this.createButton();
    return e.type = "submit", e.classList.add("btn-success"), e.innerHTML = "✔", e;
  }
  createButtonCancel() {
    const e = this.createButton();
    e.classList.add("btn-danger");
    const s = document.createElement("div");
    return s.innerHTML = "✖", e.append(s), e.addEventListener("click", () => {
      this.context.modeElement.hide();
    }), e;
  }
  hideLoad() {
    this.load.style.display = "none";
  }
  showLoad() {
    this.load.style.display = "block";
  }
  ajax(e) {
    let s = this.context.url;
    const n = new FormData();
    n.append("pk", this.context.pk), n.append("name", this.context.name), n.append("value", e);
    const i = {};
    return i.method = this.context.ajaxOptions.method, i.method === "POST" ? i.body = n : s += "?" + new URLSearchParams(n).toString(), fetch(s, i);
  }
  async successResponse(e, s) {
  }
  async errorResponse(e, s) {
  }
  setError(e) {
    this.error.innerHTML = e;
  }
  showError() {
    this.error.style.display = "block";
  }
  hideError() {
    this.error && (this.error.style.display = "none");
  }
  createElement(e) {
    const s = document.createElement(e);
    return s.classList.add("form-control"), this.context.required && (s.required = this.context.required), this.context.showbuttons || s.addEventListener("change", () => {
      this.form.dispatchEvent(new Event("submit"));
    }), this.add_focus(s), s;
  }
  add_focus(e) {
    this.context.element.addEventListener("shown", function() {
      e.focus();
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
class Ah extends ct {
  create() {
    const e = this.createElement("input");
    return e.type = this.context.type, this.createContainer(e);
  }
}
class Dh extends ct {
  create() {
    const e = this.createElement("textarea");
    return this.createContainer(e);
  }
}
class Mh extends ct {
  create() {
    const e = this.createElement("select");
    return this.context.source.forEach((s) => {
      const n = document.createElement("option");
      n.value = s.value, n.innerHTML = s.text, e.append(n);
    }), this.createContainer(e);
  }
  initText() {
    if (this.context.element.innerHTML = this.context.emptytext, this.context.value !== "" && this.context.source.length > 0)
      for (const e in this.context.source) {
        const s = this.context.source[e];
        if (s.value == this.context.value)
          return this.context.element.innerHTML = s.text, !1;
      }
    return !0;
  }
  initOptions() {
    this.context.get_opt("source", []), typeof this.context.source == "string" && this.context.source !== "" && (this.context.source = JSON.parse(this.context.source));
  }
}
class Ta extends ct {
  create() {
    const e = this.createElement("input");
    return e.type = "date", this.createContainer(e);
  }
  initText() {
    return this.value === "" ? (this.context.element.innerHTML = this.context.emptytext, !0) : (this.context.element.innerHTML = moment(this.context.value).format(this.context.viewformat), !1);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD"), this.context.get_opt("viewformat", "YYYY-MM-DD");
  }
}
//! moment.js
//! version : 2.30.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Sa;
function f() {
  return Sa.apply(null, arguments);
}
function Nh(t) {
  Sa = t;
}
function fe(t) {
  return t instanceof Array || Object.prototype.toString.call(t) === "[object Array]";
}
function it(t) {
  return t != null && Object.prototype.toString.call(t) === "[object Object]";
}
function A(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function ii(t) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(t).length === 0;
  var e;
  for (e in t)
    if (A(t, e))
      return !1;
  return !0;
}
function Z(t) {
  return t === void 0;
}
function Le(t) {
  return typeof t == "number" || Object.prototype.toString.call(t) === "[object Number]";
}
function ns(t) {
  return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
}
function Oa(t, e) {
  var s = [], n, i = t.length;
  for (n = 0; n < i; ++n)
    s.push(e(t[n], n));
  return s;
}
function We(t, e) {
  for (var s in e)
    A(e, s) && (t[s] = e[s]);
  return A(e, "toString") && (t.toString = e.toString), A(e, "valueOf") && (t.valueOf = e.valueOf), t;
}
function we(t, e, s, n) {
  return Ka(t, e, s, n, !0).utc();
}
function kh() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1
  };
}
function E(t) {
  return t._pf == null && (t._pf = kh()), t._pf;
}
var In;
Array.prototype.some ? In = Array.prototype.some : In = function(t) {
  var e = Object(this), s = e.length >>> 0, n;
  for (n = 0; n < s; n++)
    if (n in e && t.call(this, e[n], n, e))
      return !0;
  return !1;
};
function ri(t) {
  var e = null, s = !1, n = t._d && !isNaN(t._d.getTime());
  if (n && (e = E(t), s = In.call(e.parsedDateParts, function(i) {
    return i != null;
  }), n = e.overflow < 0 && !e.empty && !e.invalidEra && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && s), t._strict && (n = n && e.charsLeftOver === 0 && e.unusedTokens.length === 0 && e.bigHour === void 0)), Object.isFrozen == null || !Object.isFrozen(t))
    t._isValid = n;
  else
    return n;
  return t._isValid;
}
function Bs(t) {
  var e = we(NaN);
  return t != null ? We(E(e), t) : E(e).userInvalidated = !0, e;
}
var gr = f.momentProperties = [], Tn = !1;
function ai(t, e) {
  var s, n, i, r = gr.length;
  if (Z(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), Z(e._i) || (t._i = e._i), Z(e._f) || (t._f = e._f), Z(e._l) || (t._l = e._l), Z(e._strict) || (t._strict = e._strict), Z(e._tzm) || (t._tzm = e._tzm), Z(e._isUTC) || (t._isUTC = e._isUTC), Z(e._offset) || (t._offset = e._offset), Z(e._pf) || (t._pf = E(e)), Z(e._locale) || (t._locale = e._locale), r > 0)
    for (s = 0; s < r; s++)
      n = gr[s], i = e[n], Z(i) || (t[n] = i);
  return t;
}
function is(t) {
  ai(this, t), this._d = new Date(t._d != null ? t._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), Tn === !1 && (Tn = !0, f.updateOffset(this), Tn = !1);
}
function _e(t) {
  return t instanceof is || t != null && t._isAMomentObject != null;
}
function Aa(t) {
  f.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + t);
}
function le(t, e) {
  var s = !0;
  return We(function() {
    if (f.deprecationHandler != null && f.deprecationHandler(null, t), s) {
      var n = [], i, r, a, o = arguments.length;
      for (r = 0; r < o; r++) {
        if (i = "", typeof arguments[r] == "object") {
          i += `
[` + r + "] ";
          for (a in arguments[0])
            A(arguments[0], a) && (i += a + ": " + arguments[0][a] + ", ");
          i = i.slice(0, -2);
        } else
          i = arguments[r];
        n.push(i);
      }
      Aa(
        t + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
      ), s = !1;
    }
    return e.apply(this, arguments);
  }, e);
}
var vr = {};
function Da(t, e) {
  f.deprecationHandler != null && f.deprecationHandler(t, e), vr[t] || (Aa(e), vr[t] = !0);
}
f.suppressDeprecationWarnings = !1;
f.deprecationHandler = null;
function Te(t) {
  return typeof Function < "u" && t instanceof Function || Object.prototype.toString.call(t) === "[object Function]";
}
function Ch(t) {
  var e, s;
  for (s in t)
    A(t, s) && (e = t[s], Te(e) ? this[s] = e : this["_" + s] = e);
  this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function Yn(t, e) {
  var s = We({}, t), n;
  for (n in e)
    A(e, n) && (it(t[n]) && it(e[n]) ? (s[n] = {}, We(s[n], t[n]), We(s[n], e[n])) : e[n] != null ? s[n] = e[n] : delete s[n]);
  for (n in t)
    A(t, n) && !A(e, n) && it(t[n]) && (s[n] = We({}, s[n]));
  return s;
}
function oi(t) {
  t != null && this.set(t);
}
var Pn;
Object.keys ? Pn = Object.keys : Pn = function(t) {
  var e, s = [];
  for (e in t)
    A(t, e) && s.push(e);
  return s;
};
var xh = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function Lh(t, e, s) {
  var n = this._calendar[t] || this._calendar.sameElse;
  return Te(n) ? n.call(e, s) : n;
}
function be(t, e, s) {
  var n = "" + Math.abs(t), i = e - n.length, r = t >= 0;
  return (r ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + n;
}
var li = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, ys = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Sn = {}, bt = {};
function p(t, e, s, n) {
  var i = n;
  typeof n == "string" && (i = function() {
    return this[n]();
  }), t && (bt[t] = i), e && (bt[e[0]] = function() {
    return be(i.apply(this, arguments), e[1], e[2]);
  }), s && (bt[s] = function() {
    return this.localeData().ordinal(
      i.apply(this, arguments),
      t
    );
  });
}
function Ih(t) {
  return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
}
function Yh(t) {
  var e = t.match(li), s, n;
  for (s = 0, n = e.length; s < n; s++)
    bt[e[s]] ? e[s] = bt[e[s]] : e[s] = Ih(e[s]);
  return function(i) {
    var r = "", a;
    for (a = 0; a < n; a++)
      r += Te(e[a]) ? e[a].call(i, t) : e[a];
    return r;
  };
}
function Ss(t, e) {
  return t.isValid() ? (e = Ma(e, t.localeData()), Sn[e] = Sn[e] || Yh(e), Sn[e](t)) : t.localeData().invalidDate();
}
function Ma(t, e) {
  var s = 5;
  function n(i) {
    return e.longDateFormat(i) || i;
  }
  for (ys.lastIndex = 0; s >= 0 && ys.test(t); )
    t = t.replace(
      ys,
      n
    ), ys.lastIndex = 0, s -= 1;
  return t;
}
var Ph = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function $h(t) {
  var e = this._longDateFormat[t], s = this._longDateFormat[t.toUpperCase()];
  return e || !s ? e : (this._longDateFormat[t] = s.match(li).map(function(n) {
    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
  }).join(""), this._longDateFormat[t]);
}
var Rh = "Invalid date";
function Wh() {
  return this._invalidDate;
}
var Hh = "%d", Vh = /\d{1,2}/;
function Fh(t) {
  return this._ordinal.replace("%d", t);
}
var Uh = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function jh(t, e, s, n) {
  var i = this._relativeTime[s];
  return Te(i) ? i(t, e, s, n) : i.replace(/%d/i, t);
}
function Gh(t, e) {
  var s = this._relativeTime[t > 0 ? "future" : "past"];
  return Te(s) ? s(e) : s.replace(/%s/i, e);
}
var yr = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function ce(t) {
  return typeof t == "string" ? yr[t] || yr[t.toLowerCase()] : void 0;
}
function ci(t) {
  var e = {}, s, n;
  for (n in t)
    A(t, n) && (s = ce(n), s && (e[s] = t[n]));
  return e;
}
var Bh = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function zh(t) {
  var e = [], s;
  for (s in t)
    A(t, s) && e.push({ unit: s, priority: Bh[s] });
  return e.sort(function(n, i) {
    return n.priority - i.priority;
  }), e;
}
var Na = /\d/, se = /\d\d/, ka = /\d{3}/, ui = /\d{4}/, zs = /[+-]?\d{6}/, I = /\d\d?/, Ca = /\d\d\d\d?/, xa = /\d\d\d\d\d\d?/, Ks = /\d{1,3}/, di = /\d{1,4}/, qs = /[+-]?\d{1,6}/, Yt = /\d+/, Zs = /[+-]?\d+/, Kh = /Z|[+-]\d\d:?\d\d/gi, Xs = /Z|[+-]\d\d(?::?\d\d)?/gi, qh = /[+-]?\d+(\.\d{1,3})?/, rs = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, Pt = /^[1-9]\d?/, hi = /^([1-9]\d|\d)/, Cs;
Cs = {};
function _(t, e, s) {
  Cs[t] = Te(e) ? e : function(n, i) {
    return n && s ? s : e;
  };
}
function Zh(t, e) {
  return A(Cs, t) ? Cs[t](e._strict, e._locale) : new RegExp(Xh(t));
}
function Xh(t) {
  return ke(
    t.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(e, s, n, i, r) {
        return s || n || i || r;
      }
    )
  );
}
function ke(t) {
  return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function ne(t) {
  return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
}
function T(t) {
  var e = +t, s = 0;
  return e !== 0 && isFinite(e) && (s = ne(e)), s;
}
var $n = {};
function k(t, e) {
  var s, n = e, i;
  for (typeof t == "string" && (t = [t]), Le(e) && (n = function(r, a) {
    a[e] = T(r);
  }), i = t.length, s = 0; s < i; s++)
    $n[t[s]] = n;
}
function as(t, e) {
  k(t, function(s, n, i, r) {
    i._w = i._w || {}, e(s, i._w, i, r);
  });
}
function Qh(t, e, s) {
  e != null && A($n, t) && $n[t](e, s._a, s, t);
}
function Qs(t) {
  return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
}
var G = 0, Ae = 1, ge = 2, V = 3, he = 4, De = 5, st = 6, Jh = 7, ef = 8;
p("Y", 0, 0, function() {
  var t = this.year();
  return t <= 9999 ? be(t, 4) : "+" + t;
});
p(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
p(0, ["YYYY", 4], 0, "year");
p(0, ["YYYYY", 5], 0, "year");
p(0, ["YYYYYY", 6, !0], 0, "year");
_("Y", Zs);
_("YY", I, se);
_("YYYY", di, ui);
_("YYYYY", qs, zs);
_("YYYYYY", qs, zs);
k(["YYYYY", "YYYYYY"], G);
k("YYYY", function(t, e) {
  e[G] = t.length === 2 ? f.parseTwoDigitYear(t) : T(t);
});
k("YY", function(t, e) {
  e[G] = f.parseTwoDigitYear(t);
});
k("Y", function(t, e) {
  e[G] = parseInt(t, 10);
});
function Bt(t) {
  return Qs(t) ? 366 : 365;
}
f.parseTwoDigitYear = function(t) {
  return T(t) + (T(t) > 68 ? 1900 : 2e3);
};
var La = $t("FullYear", !0);
function tf() {
  return Qs(this.year());
}
function $t(t, e) {
  return function(s) {
    return s != null ? (Ia(this, t, s), f.updateOffset(this, e), this) : Kt(this, t);
  };
}
function Kt(t, e) {
  if (!t.isValid())
    return NaN;
  var s = t._d, n = t._isUTC;
  switch (e) {
    case "Milliseconds":
      return n ? s.getUTCMilliseconds() : s.getMilliseconds();
    case "Seconds":
      return n ? s.getUTCSeconds() : s.getSeconds();
    case "Minutes":
      return n ? s.getUTCMinutes() : s.getMinutes();
    case "Hours":
      return n ? s.getUTCHours() : s.getHours();
    case "Date":
      return n ? s.getUTCDate() : s.getDate();
    case "Day":
      return n ? s.getUTCDay() : s.getDay();
    case "Month":
      return n ? s.getUTCMonth() : s.getMonth();
    case "FullYear":
      return n ? s.getUTCFullYear() : s.getFullYear();
    default:
      return NaN;
  }
}
function Ia(t, e, s) {
  var n, i, r, a, o;
  if (!(!t.isValid() || isNaN(s))) {
    switch (n = t._d, i = t._isUTC, e) {
      case "Milliseconds":
        return void (i ? n.setUTCMilliseconds(s) : n.setMilliseconds(s));
      case "Seconds":
        return void (i ? n.setUTCSeconds(s) : n.setSeconds(s));
      case "Minutes":
        return void (i ? n.setUTCMinutes(s) : n.setMinutes(s));
      case "Hours":
        return void (i ? n.setUTCHours(s) : n.setHours(s));
      case "Date":
        return void (i ? n.setUTCDate(s) : n.setDate(s));
      // case 'Day': // Not real
      //    return void (isUTC ? d.setUTCDay(value) : d.setDay(value));
      // case 'Month': // Not used because we need to pass two variables
      //     return void (isUTC ? d.setUTCMonth(value) : d.setMonth(value));
      case "FullYear":
        break;
      // See below ...
      default:
        return;
    }
    r = s, a = t.month(), o = t.date(), o = o === 29 && a === 1 && !Qs(r) ? 28 : o, i ? n.setUTCFullYear(r, a, o) : n.setFullYear(r, a, o);
  }
}
function sf(t) {
  return t = ce(t), Te(this[t]) ? this[t]() : this;
}
function nf(t, e) {
  if (typeof t == "object") {
    t = ci(t);
    var s = zh(t), n, i = s.length;
    for (n = 0; n < i; n++)
      this[s[n].unit](t[s[n].unit]);
  } else if (t = ce(t), Te(this[t]))
    return this[t](e);
  return this;
}
function rf(t, e) {
  return (t % e + e) % e;
}
var W;
Array.prototype.indexOf ? W = Array.prototype.indexOf : W = function(t) {
  var e;
  for (e = 0; e < this.length; ++e)
    if (this[e] === t)
      return e;
  return -1;
};
function fi(t, e) {
  if (isNaN(t) || isNaN(e))
    return NaN;
  var s = rf(e, 12);
  return t += (e - s) / 12, s === 1 ? Qs(t) ? 29 : 28 : 31 - s % 7 % 2;
}
p("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
p("MMM", 0, 0, function(t) {
  return this.localeData().monthsShort(this, t);
});
p("MMMM", 0, 0, function(t) {
  return this.localeData().months(this, t);
});
_("M", I, Pt);
_("MM", I, se);
_("MMM", function(t, e) {
  return e.monthsShortRegex(t);
});
_("MMMM", function(t, e) {
  return e.monthsRegex(t);
});
k(["M", "MM"], function(t, e) {
  e[Ae] = T(t) - 1;
});
k(["MMM", "MMMM"], function(t, e, s, n) {
  var i = s._locale.monthsParse(t, n, s._strict);
  i != null ? e[Ae] = i : E(s).invalidMonth = t;
});
var af = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), Ya = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Pa = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, of = rs, lf = rs;
function cf(t, e) {
  return t ? fe(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Pa).test(e) ? "format" : "standalone"][t.month()] : fe(this._months) ? this._months : this._months.standalone;
}
function uf(t, e) {
  return t ? fe(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Pa.test(e) ? "format" : "standalone"][t.month()] : fe(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
}
function df(t, e, s) {
  var n, i, r, a = t.toLocaleLowerCase();
  if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
      r = we([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
        r,
        ""
      ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
  return s ? e === "MMM" ? (i = W.call(this._shortMonthsParse, a), i !== -1 ? i : null) : (i = W.call(this._longMonthsParse, a), i !== -1 ? i : null) : e === "MMM" ? (i = W.call(this._shortMonthsParse, a), i !== -1 ? i : (i = W.call(this._longMonthsParse, a), i !== -1 ? i : null)) : (i = W.call(this._longMonthsParse, a), i !== -1 ? i : (i = W.call(this._shortMonthsParse, a), i !== -1 ? i : null));
}
function hf(t, e, s) {
  var n, i, r;
  if (this._monthsParseExact)
    return df.call(this, t, e, s);
  for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
    if (i = we([2e3, n]), s && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
      "^" + this.months(i, "").replace(".", "") + "$",
      "i"
    ), this._shortMonthsParse[n] = new RegExp(
      "^" + this.monthsShort(i, "").replace(".", "") + "$",
      "i"
    )), !s && !this._monthsParse[n] && (r = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[n] = new RegExp(r.replace(".", ""), "i")), s && e === "MMMM" && this._longMonthsParse[n].test(t))
      return n;
    if (s && e === "MMM" && this._shortMonthsParse[n].test(t))
      return n;
    if (!s && this._monthsParse[n].test(t))
      return n;
  }
}
function $a(t, e) {
  if (!t.isValid())
    return t;
  if (typeof e == "string") {
    if (/^\d+$/.test(e))
      e = T(e);
    else if (e = t.localeData().monthsParse(e), !Le(e))
      return t;
  }
  var s = e, n = t.date();
  return n = n < 29 ? n : Math.min(n, fi(t.year(), s)), t._isUTC ? t._d.setUTCMonth(s, n) : t._d.setMonth(s, n), t;
}
function Ra(t) {
  return t != null ? ($a(this, t), f.updateOffset(this, !0), this) : Kt(this, "Month");
}
function ff() {
  return fi(this.year(), this.month());
}
function _f(t) {
  return this._monthsParseExact ? (A(this, "_monthsRegex") || Wa.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (A(this, "_monthsShortRegex") || (this._monthsShortRegex = of), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
}
function pf(t) {
  return this._monthsParseExact ? (A(this, "_monthsRegex") || Wa.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (A(this, "_monthsRegex") || (this._monthsRegex = lf), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
}
function Wa() {
  function t(l, d) {
    return d.length - l.length;
  }
  var e = [], s = [], n = [], i, r, a, o;
  for (i = 0; i < 12; i++)
    r = we([2e3, i]), a = ke(this.monthsShort(r, "")), o = ke(this.months(r, "")), e.push(a), s.push(o), n.push(o), n.push(a);
  e.sort(t), s.sort(t), n.sort(t), this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._monthsShortStrictRegex = new RegExp(
    "^(" + e.join("|") + ")",
    "i"
  );
}
function mf(t, e, s, n, i, r, a) {
  var o;
  return t < 100 && t >= 0 ? (o = new Date(t + 400, e, s, n, i, r, a), isFinite(o.getFullYear()) && o.setFullYear(t)) : o = new Date(t, e, s, n, i, r, a), o;
}
function qt(t) {
  var e, s;
  return t < 100 && t >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = t + 400, e = new Date(Date.UTC.apply(null, s)), isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t)) : e = new Date(Date.UTC.apply(null, arguments)), e;
}
function xs(t, e, s) {
  var n = 7 + e - s, i = (7 + qt(t, 0, n).getUTCDay() - e) % 7;
  return -i + n - 1;
}
function Ha(t, e, s, n, i) {
  var r = (7 + s - n) % 7, a = xs(t, n, i), o = 1 + 7 * (e - 1) + r + a, l, d;
  return o <= 0 ? (l = t - 1, d = Bt(l) + o) : o > Bt(t) ? (l = t + 1, d = o - Bt(t)) : (l = t, d = o), {
    year: l,
    dayOfYear: d
  };
}
function Zt(t, e, s) {
  var n = xs(t.year(), e, s), i = Math.floor((t.dayOfYear() - n - 1) / 7) + 1, r, a;
  return i < 1 ? (a = t.year() - 1, r = i + Ce(a, e, s)) : i > Ce(t.year(), e, s) ? (r = i - Ce(t.year(), e, s), a = t.year() + 1) : (a = t.year(), r = i), {
    week: r,
    year: a
  };
}
function Ce(t, e, s) {
  var n = xs(t, e, s), i = xs(t + 1, e, s);
  return (Bt(t) - n + i) / 7;
}
p("w", ["ww", 2], "wo", "week");
p("W", ["WW", 2], "Wo", "isoWeek");
_("w", I, Pt);
_("ww", I, se);
_("W", I, Pt);
_("WW", I, se);
as(
  ["w", "ww", "W", "WW"],
  function(t, e, s, n) {
    e[n.substr(0, 1)] = T(t);
  }
);
function gf(t) {
  return Zt(t, this._week.dow, this._week.doy).week;
}
var vf = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function yf() {
  return this._week.dow;
}
function Ef() {
  return this._week.doy;
}
function bf(t) {
  var e = this.localeData().week(this);
  return t == null ? e : this.add((t - e) * 7, "d");
}
function wf(t) {
  var e = Zt(this, 1, 4).week;
  return t == null ? e : this.add((t - e) * 7, "d");
}
p("d", 0, "do", "day");
p("dd", 0, 0, function(t) {
  return this.localeData().weekdaysMin(this, t);
});
p("ddd", 0, 0, function(t) {
  return this.localeData().weekdaysShort(this, t);
});
p("dddd", 0, 0, function(t) {
  return this.localeData().weekdays(this, t);
});
p("e", 0, 0, "weekday");
p("E", 0, 0, "isoWeekday");
_("d", I);
_("e", I);
_("E", I);
_("dd", function(t, e) {
  return e.weekdaysMinRegex(t);
});
_("ddd", function(t, e) {
  return e.weekdaysShortRegex(t);
});
_("dddd", function(t, e) {
  return e.weekdaysRegex(t);
});
as(["dd", "ddd", "dddd"], function(t, e, s, n) {
  var i = s._locale.weekdaysParse(t, n, s._strict);
  i != null ? e.d = i : E(s).invalidWeekday = t;
});
as(["d", "e", "E"], function(t, e, s, n) {
  e[n] = T(t);
});
function Tf(t, e) {
  return typeof t != "string" ? t : isNaN(t) ? (t = e.weekdaysParse(t), typeof t == "number" ? t : null) : parseInt(t, 10);
}
function Sf(t, e) {
  return typeof t == "string" ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
}
function _i(t, e) {
  return t.slice(e, 7).concat(t.slice(0, e));
}
var Of = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Va = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Af = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Df = rs, Mf = rs, Nf = rs;
function kf(t, e) {
  var s = fe(this._weekdays) ? this._weekdays : this._weekdays[t && t !== !0 && this._weekdays.isFormat.test(e) ? "format" : "standalone"];
  return t === !0 ? _i(s, this._week.dow) : t ? s[t.day()] : s;
}
function Cf(t) {
  return t === !0 ? _i(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
}
function xf(t) {
  return t === !0 ? _i(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
}
function Lf(t, e, s) {
  var n, i, r, a = t.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
      r = we([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
        r,
        ""
      ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
        r,
        ""
      ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
  return s ? e === "dddd" ? (i = W.call(this._weekdaysParse, a), i !== -1 ? i : null) : e === "ddd" ? (i = W.call(this._shortWeekdaysParse, a), i !== -1 ? i : null) : (i = W.call(this._minWeekdaysParse, a), i !== -1 ? i : null) : e === "dddd" ? (i = W.call(this._weekdaysParse, a), i !== -1 || (i = W.call(this._shortWeekdaysParse, a), i !== -1) ? i : (i = W.call(this._minWeekdaysParse, a), i !== -1 ? i : null)) : e === "ddd" ? (i = W.call(this._shortWeekdaysParse, a), i !== -1 || (i = W.call(this._weekdaysParse, a), i !== -1) ? i : (i = W.call(this._minWeekdaysParse, a), i !== -1 ? i : null)) : (i = W.call(this._minWeekdaysParse, a), i !== -1 || (i = W.call(this._weekdaysParse, a), i !== -1) ? i : (i = W.call(this._shortWeekdaysParse, a), i !== -1 ? i : null));
}
function If(t, e, s) {
  var n, i, r;
  if (this._weekdaysParseExact)
    return Lf.call(this, t, e, s);
  for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
    if (i = we([2e3, 1]).day(n), s && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
      "^" + this.weekdays(i, "").replace(".", "\\.?") + "$",
      "i"
    ), this._shortWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$",
      "i"
    ), this._minWeekdaysParse[n] = new RegExp(
      "^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$",
      "i"
    )), this._weekdaysParse[n] || (r = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[n] = new RegExp(r.replace(".", ""), "i")), s && e === "dddd" && this._fullWeekdaysParse[n].test(t))
      return n;
    if (s && e === "ddd" && this._shortWeekdaysParse[n].test(t))
      return n;
    if (s && e === "dd" && this._minWeekdaysParse[n].test(t))
      return n;
    if (!s && this._weekdaysParse[n].test(t))
      return n;
  }
}
function Yf(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  var e = Kt(this, "Day");
  return t != null ? (t = Tf(t, this.localeData()), this.add(t - e, "d")) : e;
}
function Pf(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return t == null ? e : this.add(t - e, "d");
}
function $f(t) {
  if (!this.isValid())
    return t != null ? this : NaN;
  if (t != null) {
    var e = Sf(t, this.localeData());
    return this.day(this.day() % 7 ? e : e - 7);
  } else
    return this.day() || 7;
}
function Rf(t) {
  return this._weekdaysParseExact ? (A(this, "_weekdaysRegex") || pi.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (A(this, "_weekdaysRegex") || (this._weekdaysRegex = Df), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
}
function Wf(t) {
  return this._weekdaysParseExact ? (A(this, "_weekdaysRegex") || pi.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (A(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Mf), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
}
function Hf(t) {
  return this._weekdaysParseExact ? (A(this, "_weekdaysRegex") || pi.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (A(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Nf), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
}
function pi() {
  function t(c, g) {
    return g.length - c.length;
  }
  var e = [], s = [], n = [], i = [], r, a, o, l, d;
  for (r = 0; r < 7; r++)
    a = we([2e3, 1]).day(r), o = ke(this.weekdaysMin(a, "")), l = ke(this.weekdaysShort(a, "")), d = ke(this.weekdays(a, "")), e.push(o), s.push(l), n.push(d), i.push(o), i.push(l), i.push(d);
  e.sort(t), s.sort(t), n.sort(t), i.sort(t), this._weekdaysRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
    "^(" + n.join("|") + ")",
    "i"
  ), this._weekdaysShortStrictRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  ), this._weekdaysMinStrictRegex = new RegExp(
    "^(" + e.join("|") + ")",
    "i"
  );
}
function mi() {
  return this.hours() % 12 || 12;
}
function Vf() {
  return this.hours() || 24;
}
p("H", ["HH", 2], 0, "hour");
p("h", ["hh", 2], 0, mi);
p("k", ["kk", 2], 0, Vf);
p("hmm", 0, 0, function() {
  return "" + mi.apply(this) + be(this.minutes(), 2);
});
p("hmmss", 0, 0, function() {
  return "" + mi.apply(this) + be(this.minutes(), 2) + be(this.seconds(), 2);
});
p("Hmm", 0, 0, function() {
  return "" + this.hours() + be(this.minutes(), 2);
});
p("Hmmss", 0, 0, function() {
  return "" + this.hours() + be(this.minutes(), 2) + be(this.seconds(), 2);
});
function Fa(t, e) {
  p(t, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      e
    );
  });
}
Fa("a", !0);
Fa("A", !1);
function Ua(t, e) {
  return e._meridiemParse;
}
_("a", Ua);
_("A", Ua);
_("H", I, hi);
_("h", I, Pt);
_("k", I, Pt);
_("HH", I, se);
_("hh", I, se);
_("kk", I, se);
_("hmm", Ca);
_("hmmss", xa);
_("Hmm", Ca);
_("Hmmss", xa);
k(["H", "HH"], V);
k(["k", "kk"], function(t, e, s) {
  var n = T(t);
  e[V] = n === 24 ? 0 : n;
});
k(["a", "A"], function(t, e, s) {
  s._isPm = s._locale.isPM(t), s._meridiem = t;
});
k(["h", "hh"], function(t, e, s) {
  e[V] = T(t), E(s).bigHour = !0;
});
k("hmm", function(t, e, s) {
  var n = t.length - 2;
  e[V] = T(t.substr(0, n)), e[he] = T(t.substr(n)), E(s).bigHour = !0;
});
k("hmmss", function(t, e, s) {
  var n = t.length - 4, i = t.length - 2;
  e[V] = T(t.substr(0, n)), e[he] = T(t.substr(n, 2)), e[De] = T(t.substr(i)), E(s).bigHour = !0;
});
k("Hmm", function(t, e, s) {
  var n = t.length - 2;
  e[V] = T(t.substr(0, n)), e[he] = T(t.substr(n));
});
k("Hmmss", function(t, e, s) {
  var n = t.length - 4, i = t.length - 2;
  e[V] = T(t.substr(0, n)), e[he] = T(t.substr(n, 2)), e[De] = T(t.substr(i));
});
function Ff(t) {
  return (t + "").toLowerCase().charAt(0) === "p";
}
var Uf = /[ap]\.?m?\.?/i, jf = $t("Hours", !0);
function Gf(t, e, s) {
  return t > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
}
var ja = {
  calendar: xh,
  longDateFormat: Ph,
  invalidDate: Rh,
  ordinal: Hh,
  dayOfMonthOrdinalParse: Vh,
  relativeTime: Uh,
  months: af,
  monthsShort: Ya,
  week: vf,
  weekdays: Of,
  weekdaysMin: Af,
  weekdaysShort: Va,
  meridiemParse: Uf
}, Y = {}, Ft = {}, Xt;
function Bf(t, e) {
  var s, n = Math.min(t.length, e.length);
  for (s = 0; s < n; s += 1)
    if (t[s] !== e[s])
      return s;
  return n;
}
function Er(t) {
  return t && t.toLowerCase().replace("_", "-");
}
function zf(t) {
  for (var e = 0, s, n, i, r; e < t.length; ) {
    for (r = Er(t[e]).split("-"), s = r.length, n = Er(t[e + 1]), n = n ? n.split("-") : null; s > 0; ) {
      if (i = Js(r.slice(0, s).join("-")), i)
        return i;
      if (n && n.length >= s && Bf(r, n) >= s - 1)
        break;
      s--;
    }
    e++;
  }
  return Xt;
}
function Kf(t) {
  return !!(t && t.match("^[^/\\\\]*$"));
}
function Js(t) {
  var e = null, s;
  if (Y[t] === void 0 && typeof module < "u" && module && module.exports && Kf(t))
    try {
      e = Xt._abbr, s = require, s("./locale/" + t), Ve(e);
    } catch {
      Y[t] = null;
    }
  return Y[t];
}
function Ve(t, e) {
  var s;
  return t && (Z(e) ? s = Ye(t) : s = gi(t, e), s ? Xt = s : typeof console < "u" && console.warn && console.warn(
    "Locale " + t + " not found. Did you forget to load it?"
  )), Xt._abbr;
}
function gi(t, e) {
  if (e !== null) {
    var s, n = ja;
    if (e.abbr = t, Y[t] != null)
      Da(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ), n = Y[t]._config;
    else if (e.parentLocale != null)
      if (Y[e.parentLocale] != null)
        n = Y[e.parentLocale]._config;
      else if (s = Js(e.parentLocale), s != null)
        n = s._config;
      else
        return Ft[e.parentLocale] || (Ft[e.parentLocale] = []), Ft[e.parentLocale].push({
          name: t,
          config: e
        }), null;
    return Y[t] = new oi(Yn(n, e)), Ft[t] && Ft[t].forEach(function(i) {
      gi(i.name, i.config);
    }), Ve(t), Y[t];
  } else
    return delete Y[t], null;
}
function qf(t, e) {
  if (e != null) {
    var s, n, i = ja;
    Y[t] != null && Y[t].parentLocale != null ? Y[t].set(Yn(Y[t]._config, e)) : (n = Js(t), n != null && (i = n._config), e = Yn(i, e), n == null && (e.abbr = t), s = new oi(e), s.parentLocale = Y[t], Y[t] = s), Ve(t);
  } else
    Y[t] != null && (Y[t].parentLocale != null ? (Y[t] = Y[t].parentLocale, t === Ve() && Ve(t)) : Y[t] != null && delete Y[t]);
  return Y[t];
}
function Ye(t) {
  var e;
  if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)
    return Xt;
  if (!fe(t)) {
    if (e = Js(t), e)
      return e;
    t = [t];
  }
  return zf(t);
}
function Zf() {
  return Pn(Y);
}
function vi(t) {
  var e, s = t._a;
  return s && E(t).overflow === -2 && (e = s[Ae] < 0 || s[Ae] > 11 ? Ae : s[ge] < 1 || s[ge] > fi(s[G], s[Ae]) ? ge : s[V] < 0 || s[V] > 24 || s[V] === 24 && (s[he] !== 0 || s[De] !== 0 || s[st] !== 0) ? V : s[he] < 0 || s[he] > 59 ? he : s[De] < 0 || s[De] > 59 ? De : s[st] < 0 || s[st] > 999 ? st : -1, E(t)._overflowDayOfYear && (e < G || e > ge) && (e = ge), E(t)._overflowWeeks && e === -1 && (e = Jh), E(t)._overflowWeekday && e === -1 && (e = ef), E(t).overflow = e), t;
}
var Xf = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Qf = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Jf = /Z|[+-]\d\d(?::?\d\d)?/, Es = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, !1],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, !1],
  ["YYYY", /\d{4}/, !1]
], On = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], e_ = /^\/?Date\((-?\d+)/i, t_ = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, s_ = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Ga(t) {
  var e, s, n = t._i, i = Xf.exec(n) || Qf.exec(n), r, a, o, l, d = Es.length, c = On.length;
  if (i) {
    for (E(t).iso = !0, e = 0, s = d; e < s; e++)
      if (Es[e][1].exec(i[1])) {
        a = Es[e][0], r = Es[e][2] !== !1;
        break;
      }
    if (a == null) {
      t._isValid = !1;
      return;
    }
    if (i[3]) {
      for (e = 0, s = c; e < s; e++)
        if (On[e][1].exec(i[3])) {
          o = (i[2] || " ") + On[e][0];
          break;
        }
      if (o == null) {
        t._isValid = !1;
        return;
      }
    }
    if (!r && o != null) {
      t._isValid = !1;
      return;
    }
    if (i[4])
      if (Jf.exec(i[4]))
        l = "Z";
      else {
        t._isValid = !1;
        return;
      }
    t._f = a + (o || "") + (l || ""), Ei(t);
  } else
    t._isValid = !1;
}
function n_(t, e, s, n, i, r) {
  var a = [
    i_(t),
    Ya.indexOf(e),
    parseInt(s, 10),
    parseInt(n, 10),
    parseInt(i, 10)
  ];
  return r && a.push(parseInt(r, 10)), a;
}
function i_(t) {
  var e = parseInt(t, 10);
  return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
}
function r_(t) {
  return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function a_(t, e, s) {
  if (t) {
    var n = Va.indexOf(t), i = new Date(
      e[0],
      e[1],
      e[2]
    ).getDay();
    if (n !== i)
      return E(s).weekdayMismatch = !0, s._isValid = !1, !1;
  }
  return !0;
}
function o_(t, e, s) {
  if (t)
    return s_[t];
  if (e)
    return 0;
  var n = parseInt(s, 10), i = n % 100, r = (n - i) / 100;
  return r * 60 + i;
}
function Ba(t) {
  var e = t_.exec(r_(t._i)), s;
  if (e) {
    if (s = n_(
      e[4],
      e[3],
      e[2],
      e[5],
      e[6],
      e[7]
    ), !a_(e[1], s, t))
      return;
    t._a = s, t._tzm = o_(e[8], e[9], e[10]), t._d = qt.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), E(t).rfc2822 = !0;
  } else
    t._isValid = !1;
}
function l_(t) {
  var e = e_.exec(t._i);
  if (e !== null) {
    t._d = /* @__PURE__ */ new Date(+e[1]);
    return;
  }
  if (Ga(t), t._isValid === !1)
    delete t._isValid;
  else
    return;
  if (Ba(t), t._isValid === !1)
    delete t._isValid;
  else
    return;
  t._strict ? t._isValid = !1 : f.createFromInputFallback(t);
}
f.createFromInputFallback = le(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(t) {
    t._d = /* @__PURE__ */ new Date(t._i + (t._useUTC ? " UTC" : ""));
  }
);
function vt(t, e, s) {
  return t ?? e ?? s;
}
function c_(t) {
  var e = new Date(f.now());
  return t._useUTC ? [
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate()
  ] : [e.getFullYear(), e.getMonth(), e.getDate()];
}
function yi(t) {
  var e, s, n = [], i, r, a;
  if (!t._d) {
    for (i = c_(t), t._w && t._a[ge] == null && t._a[Ae] == null && u_(t), t._dayOfYear != null && (a = vt(t._a[G], i[G]), (t._dayOfYear > Bt(a) || t._dayOfYear === 0) && (E(t)._overflowDayOfYear = !0), s = qt(a, 0, t._dayOfYear), t._a[Ae] = s.getUTCMonth(), t._a[ge] = s.getUTCDate()), e = 0; e < 3 && t._a[e] == null; ++e)
      t._a[e] = n[e] = i[e];
    for (; e < 7; e++)
      t._a[e] = n[e] = t._a[e] == null ? e === 2 ? 1 : 0 : t._a[e];
    t._a[V] === 24 && t._a[he] === 0 && t._a[De] === 0 && t._a[st] === 0 && (t._nextDay = !0, t._a[V] = 0), t._d = (t._useUTC ? qt : mf).apply(
      null,
      n
    ), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), t._tzm != null && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[V] = 24), t._w && typeof t._w.d < "u" && t._w.d !== r && (E(t).weekdayMismatch = !0);
  }
}
function u_(t) {
  var e, s, n, i, r, a, o, l, d;
  e = t._w, e.GG != null || e.W != null || e.E != null ? (r = 1, a = 4, s = vt(
    e.GG,
    t._a[G],
    Zt(L(), 1, 4).year
  ), n = vt(e.W, 1), i = vt(e.E, 1), (i < 1 || i > 7) && (l = !0)) : (r = t._locale._week.dow, a = t._locale._week.doy, d = Zt(L(), r, a), s = vt(e.gg, t._a[G], d.year), n = vt(e.w, d.week), e.d != null ? (i = e.d, (i < 0 || i > 6) && (l = !0)) : e.e != null ? (i = e.e + r, (e.e < 0 || e.e > 6) && (l = !0)) : i = r), n < 1 || n > Ce(s, r, a) ? E(t)._overflowWeeks = !0 : l != null ? E(t)._overflowWeekday = !0 : (o = Ha(s, n, i, r, a), t._a[G] = o.year, t._dayOfYear = o.dayOfYear);
}
f.ISO_8601 = function() {
};
f.RFC_2822 = function() {
};
function Ei(t) {
  if (t._f === f.ISO_8601) {
    Ga(t);
    return;
  }
  if (t._f === f.RFC_2822) {
    Ba(t);
    return;
  }
  t._a = [], E(t).empty = !0;
  var e = "" + t._i, s, n, i, r, a, o = e.length, l = 0, d, c;
  for (i = Ma(t._f, t._locale).match(li) || [], c = i.length, s = 0; s < c; s++)
    r = i[s], n = (e.match(Zh(r, t)) || [])[0], n && (a = e.substr(0, e.indexOf(n)), a.length > 0 && E(t).unusedInput.push(a), e = e.slice(
      e.indexOf(n) + n.length
    ), l += n.length), bt[r] ? (n ? E(t).empty = !1 : E(t).unusedTokens.push(r), Qh(r, n, t)) : t._strict && !n && E(t).unusedTokens.push(r);
  E(t).charsLeftOver = o - l, e.length > 0 && E(t).unusedInput.push(e), t._a[V] <= 12 && E(t).bigHour === !0 && t._a[V] > 0 && (E(t).bigHour = void 0), E(t).parsedDateParts = t._a.slice(0), E(t).meridiem = t._meridiem, t._a[V] = d_(
    t._locale,
    t._a[V],
    t._meridiem
  ), d = E(t).era, d !== null && (t._a[G] = t._locale.erasConvertYear(d, t._a[G])), yi(t), vi(t);
}
function d_(t, e, s) {
  var n;
  return s == null ? e : t.meridiemHour != null ? t.meridiemHour(e, s) : (t.isPM != null && (n = t.isPM(s), n && e < 12 && (e += 12), !n && e === 12 && (e = 0)), e);
}
function h_(t) {
  var e, s, n, i, r, a, o = !1, l = t._f.length;
  if (l === 0) {
    E(t).invalidFormat = !0, t._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i = 0; i < l; i++)
    r = 0, a = !1, e = ai({}, t), t._useUTC != null && (e._useUTC = t._useUTC), e._f = t._f[i], Ei(e), ri(e) && (a = !0), r += E(e).charsLeftOver, r += E(e).unusedTokens.length * 10, E(e).score = r, o ? r < n && (n = r, s = e) : (n == null || r < n || a) && (n = r, s = e, a && (o = !0));
  We(t, s || e);
}
function f_(t) {
  if (!t._d) {
    var e = ci(t._i), s = e.day === void 0 ? e.date : e.day;
    t._a = Oa(
      [e.year, e.month, s, e.hour, e.minute, e.second, e.millisecond],
      function(n) {
        return n && parseInt(n, 10);
      }
    ), yi(t);
  }
}
function __(t) {
  var e = new is(vi(za(t)));
  return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
}
function za(t) {
  var e = t._i, s = t._f;
  return t._locale = t._locale || Ye(t._l), e === null || s === void 0 && e === "" ? Bs({ nullInput: !0 }) : (typeof e == "string" && (t._i = e = t._locale.preparse(e)), _e(e) ? new is(vi(e)) : (ns(e) ? t._d = e : fe(s) ? h_(t) : s ? Ei(t) : p_(t), ri(t) || (t._d = null), t));
}
function p_(t) {
  var e = t._i;
  Z(e) ? t._d = new Date(f.now()) : ns(e) ? t._d = new Date(e.valueOf()) : typeof e == "string" ? l_(t) : fe(e) ? (t._a = Oa(e.slice(0), function(s) {
    return parseInt(s, 10);
  }), yi(t)) : it(e) ? f_(t) : Le(e) ? t._d = new Date(e) : f.createFromInputFallback(t);
}
function Ka(t, e, s, n, i) {
  var r = {};
  return (e === !0 || e === !1) && (n = e, e = void 0), (s === !0 || s === !1) && (n = s, s = void 0), (it(t) && ii(t) || fe(t) && t.length === 0) && (t = void 0), r._isAMomentObject = !0, r._useUTC = r._isUTC = i, r._l = s, r._i = t, r._f = e, r._strict = n, __(r);
}
function L(t, e, s, n) {
  return Ka(t, e, s, n, !1);
}
var m_ = le(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var t = L.apply(null, arguments);
    return this.isValid() && t.isValid() ? t < this ? this : t : Bs();
  }
), g_ = le(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var t = L.apply(null, arguments);
    return this.isValid() && t.isValid() ? t > this ? this : t : Bs();
  }
);
function qa(t, e) {
  var s, n;
  if (e.length === 1 && fe(e[0]) && (e = e[0]), !e.length)
    return L();
  for (s = e[0], n = 1; n < e.length; ++n)
    (!e[n].isValid() || e[n][t](s)) && (s = e[n]);
  return s;
}
function v_() {
  var t = [].slice.call(arguments, 0);
  return qa("isBefore", t);
}
function y_() {
  var t = [].slice.call(arguments, 0);
  return qa("isAfter", t);
}
var E_ = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
}, Ut = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function b_(t) {
  var e, s = !1, n, i = Ut.length;
  for (e in t)
    if (A(t, e) && !(W.call(Ut, e) !== -1 && (t[e] == null || !isNaN(t[e]))))
      return !1;
  for (n = 0; n < i; ++n)
    if (t[Ut[n]]) {
      if (s)
        return !1;
      parseFloat(t[Ut[n]]) !== T(t[Ut[n]]) && (s = !0);
    }
  return !0;
}
function w_() {
  return this._isValid;
}
function T_() {
  return me(NaN);
}
function en(t) {
  var e = ci(t), s = e.year || 0, n = e.quarter || 0, i = e.month || 0, r = e.week || e.isoWeek || 0, a = e.day || 0, o = e.hour || 0, l = e.minute || 0, d = e.second || 0, c = e.millisecond || 0;
  this._isValid = b_(e), this._milliseconds = +c + d * 1e3 + // 1000
  l * 6e4 + // 1000 * 60
  o * 1e3 * 60 * 60, this._days = +a + r * 7, this._months = +i + n * 3 + s * 12, this._data = {}, this._locale = Ye(), this._bubble();
}
function Os(t) {
  return t instanceof en;
}
function Rn(t) {
  return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t);
}
function S_(t, e, s) {
  var n = Math.min(t.length, e.length), i = Math.abs(t.length - e.length), r = 0, a;
  for (a = 0; a < n; a++)
    T(t[a]) !== T(e[a]) && r++;
  return r + i;
}
function Za(t, e) {
  p(t, 0, 0, function() {
    var s = this.utcOffset(), n = "+";
    return s < 0 && (s = -s, n = "-"), n + be(~~(s / 60), 2) + e + be(~~s % 60, 2);
  });
}
Za("Z", ":");
Za("ZZ", "");
_("Z", Xs);
_("ZZ", Xs);
k(["Z", "ZZ"], function(t, e, s) {
  s._useUTC = !0, s._tzm = bi(Xs, t);
});
var O_ = /([\+\-]|\d\d)/gi;
function bi(t, e) {
  var s = (e || "").match(t), n, i, r;
  return s === null ? null : (n = s[s.length - 1] || [], i = (n + "").match(O_) || ["-", 0, 0], r = +(i[1] * 60) + T(i[2]), r === 0 ? 0 : i[0] === "+" ? r : -r);
}
function wi(t, e) {
  var s, n;
  return e._isUTC ? (s = e.clone(), n = (_e(t) || ns(t) ? t.valueOf() : L(t).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + n), f.updateOffset(s, !1), s) : L(t).local();
}
function Wn(t) {
  return -Math.round(t._d.getTimezoneOffset());
}
f.updateOffset = function() {
};
function A_(t, e, s) {
  var n = this._offset || 0, i;
  if (!this.isValid())
    return t != null ? this : NaN;
  if (t != null) {
    if (typeof t == "string") {
      if (t = bi(Xs, t), t === null)
        return this;
    } else Math.abs(t) < 16 && !s && (t = t * 60);
    return !this._isUTC && e && (i = Wn(this)), this._offset = t, this._isUTC = !0, i != null && this.add(i, "m"), n !== t && (!e || this._changeInProgress ? Ja(
      this,
      me(t - n, "m"),
      1,
      !1
    ) : this._changeInProgress || (this._changeInProgress = !0, f.updateOffset(this, !0), this._changeInProgress = null)), this;
  } else
    return this._isUTC ? n : Wn(this);
}
function D_(t, e) {
  return t != null ? (typeof t != "string" && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
}
function M_(t) {
  return this.utcOffset(0, t);
}
function N_(t) {
  return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Wn(this), "m")), this;
}
function k_() {
  if (this._tzm != null)
    this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var t = bi(Kh, this._i);
    t != null ? this.utcOffset(t) : this.utcOffset(0, !0);
  }
  return this;
}
function C_(t) {
  return this.isValid() ? (t = t ? L(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0) : !1;
}
function x_() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function L_() {
  if (!Z(this._isDSTShifted))
    return this._isDSTShifted;
  var t = {}, e;
  return ai(t, this), t = za(t), t._a ? (e = t._isUTC ? we(t._a) : L(t._a), this._isDSTShifted = this.isValid() && S_(t._a, e.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
}
function I_() {
  return this.isValid() ? !this._isUTC : !1;
}
function Y_() {
  return this.isValid() ? this._isUTC : !1;
}
function Xa() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var P_ = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, $_ = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function me(t, e) {
  var s = t, n = null, i, r, a;
  return Os(t) ? s = {
    ms: t._milliseconds,
    d: t._days,
    M: t._months
  } : Le(t) || !isNaN(+t) ? (s = {}, e ? s[e] = +t : s.milliseconds = +t) : (n = P_.exec(t)) ? (i = n[1] === "-" ? -1 : 1, s = {
    y: 0,
    d: T(n[ge]) * i,
    h: T(n[V]) * i,
    m: T(n[he]) * i,
    s: T(n[De]) * i,
    ms: T(Rn(n[st] * 1e3)) * i
    // the millisecond decimal point is included in the match
  }) : (n = $_.exec(t)) ? (i = n[1] === "-" ? -1 : 1, s = {
    y: Je(n[2], i),
    M: Je(n[3], i),
    w: Je(n[4], i),
    d: Je(n[5], i),
    h: Je(n[6], i),
    m: Je(n[7], i),
    s: Je(n[8], i)
  }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (a = R_(
    L(s.from),
    L(s.to)
  ), s = {}, s.ms = a.milliseconds, s.M = a.months), r = new en(s), Os(t) && A(t, "_locale") && (r._locale = t._locale), Os(t) && A(t, "_isValid") && (r._isValid = t._isValid), r;
}
me.fn = en.prototype;
me.invalid = T_;
function Je(t, e) {
  var s = t && parseFloat(t.replace(",", "."));
  return (isNaN(s) ? 0 : s) * e;
}
function br(t, e) {
  var s = {};
  return s.months = e.month() - t.month() + (e.year() - t.year()) * 12, t.clone().add(s.months, "M").isAfter(e) && --s.months, s.milliseconds = +e - +t.clone().add(s.months, "M"), s;
}
function R_(t, e) {
  var s;
  return t.isValid() && e.isValid() ? (e = wi(e, t), t.isBefore(e) ? s = br(t, e) : (s = br(e, t), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
}
function Qa(t, e) {
  return function(s, n) {
    var i, r;
    return n !== null && !isNaN(+n) && (Da(
      e,
      "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
    ), r = s, s = n, n = r), i = me(s, n), Ja(this, i, t), this;
  };
}
function Ja(t, e, s, n) {
  var i = e._milliseconds, r = Rn(e._days), a = Rn(e._months);
  t.isValid() && (n = n ?? !0, a && $a(t, Kt(t, "Month") + a * s), r && Ia(t, "Date", Kt(t, "Date") + r * s), i && t._d.setTime(t._d.valueOf() + i * s), n && f.updateOffset(t, r || a));
}
var W_ = Qa(1, "add"), H_ = Qa(-1, "subtract");
function eo(t) {
  return typeof t == "string" || t instanceof String;
}
function V_(t) {
  return _e(t) || ns(t) || eo(t) || Le(t) || U_(t) || F_(t) || t === null || t === void 0;
}
function F_(t) {
  var e = it(t) && !ii(t), s = !1, n = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i, r, a = n.length;
  for (i = 0; i < a; i += 1)
    r = n[i], s = s || A(t, r);
  return e && s;
}
function U_(t) {
  var e = fe(t), s = !1;
  return e && (s = t.filter(function(n) {
    return !Le(n) && eo(t);
  }).length === 0), e && s;
}
function j_(t) {
  var e = it(t) && !ii(t), s = !1, n = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i, r;
  for (i = 0; i < n.length; i += 1)
    r = n[i], s = s || A(t, r);
  return e && s;
}
function G_(t, e) {
  var s = t.diff(e, "days", !0);
  return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
}
function B_(t, e) {
  arguments.length === 1 && (arguments[0] ? V_(arguments[0]) ? (t = arguments[0], e = void 0) : j_(arguments[0]) && (e = arguments[0], t = void 0) : (t = void 0, e = void 0));
  var s = t || L(), n = wi(s, this).startOf("day"), i = f.calendarFormat(this, n) || "sameElse", r = e && (Te(e[i]) ? e[i].call(this, s) : e[i]);
  return this.format(
    r || this.localeData().calendar(i, this, L(s))
  );
}
function z_() {
  return new is(this);
}
function K_(t, e) {
  var s = _e(t) ? t : L(t);
  return this.isValid() && s.isValid() ? (e = ce(e) || "millisecond", e === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(e).valueOf()) : !1;
}
function q_(t, e) {
  var s = _e(t) ? t : L(t);
  return this.isValid() && s.isValid() ? (e = ce(e) || "millisecond", e === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(e).valueOf() < s.valueOf()) : !1;
}
function Z_(t, e, s, n) {
  var i = _e(t) ? t : L(t), r = _e(e) ? e : L(e);
  return this.isValid() && i.isValid() && r.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(i, s) : !this.isBefore(i, s)) && (n[1] === ")" ? this.isBefore(r, s) : !this.isAfter(r, s))) : !1;
}
function X_(t, e) {
  var s = _e(t) ? t : L(t), n;
  return this.isValid() && s.isValid() ? (e = ce(e) || "millisecond", e === "millisecond" ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf())) : !1;
}
function Q_(t, e) {
  return this.isSame(t, e) || this.isAfter(t, e);
}
function J_(t, e) {
  return this.isSame(t, e) || this.isBefore(t, e);
}
function ep(t, e, s) {
  var n, i, r;
  if (!this.isValid())
    return NaN;
  if (n = wi(t, this), !n.isValid())
    return NaN;
  switch (i = (n.utcOffset() - this.utcOffset()) * 6e4, e = ce(e), e) {
    case "year":
      r = As(this, n) / 12;
      break;
    case "month":
      r = As(this, n);
      break;
    case "quarter":
      r = As(this, n) / 3;
      break;
    case "second":
      r = (this - n) / 1e3;
      break;
    // 1000
    case "minute":
      r = (this - n) / 6e4;
      break;
    // 1000 * 60
    case "hour":
      r = (this - n) / 36e5;
      break;
    // 1000 * 60 * 60
    case "day":
      r = (this - n - i) / 864e5;
      break;
    // 1000 * 60 * 60 * 24, negate dst
    case "week":
      r = (this - n - i) / 6048e5;
      break;
    // 1000 * 60 * 60 * 24 * 7, negate dst
    default:
      r = this - n;
  }
  return s ? r : ne(r);
}
function As(t, e) {
  if (t.date() < e.date())
    return -As(e, t);
  var s = (e.year() - t.year()) * 12 + (e.month() - t.month()), n = t.clone().add(s, "months"), i, r;
  return e - n < 0 ? (i = t.clone().add(s - 1, "months"), r = (e - n) / (n - i)) : (i = t.clone().add(s + 1, "months"), r = (e - n) / (i - n)), -(s + r) || 0;
}
f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function tp() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function sp(t) {
  if (!this.isValid())
    return null;
  var e = t !== !0, s = e ? this.clone().utc() : this;
  return s.year() < 0 || s.year() > 9999 ? Ss(
    s,
    e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
  ) : Te(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", Ss(s, "Z")) : Ss(
    s,
    e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function np() {
  if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)";
  var t = "moment", e = "", s, n, i, r;
  return this.isLocal() || (t = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", e = "Z"), s = "[" + t + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", i = "-MM-DD[T]HH:mm:ss.SSS", r = e + '[")]', this.format(s + n + i + r);
}
function ip(t) {
  t || (t = this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
  var e = Ss(this, t);
  return this.localeData().postformat(e);
}
function rp(t, e) {
  return this.isValid() && (_e(t) && t.isValid() || L(t).isValid()) ? me({ to: this, from: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function ap(t) {
  return this.from(L(), t);
}
function op(t, e) {
  return this.isValid() && (_e(t) && t.isValid() || L(t).isValid()) ? me({ from: this, to: t }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function lp(t) {
  return this.to(L(), t);
}
function to(t) {
  var e;
  return t === void 0 ? this._locale._abbr : (e = Ye(t), e != null && (this._locale = e), this);
}
var so = le(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(t) {
    return t === void 0 ? this.localeData() : this.locale(t);
  }
);
function no() {
  return this._locale;
}
var Ls = 1e3, wt = 60 * Ls, Is = 60 * wt, io = (365 * 400 + 97) * 24 * Is;
function Tt(t, e) {
  return (t % e + e) % e;
}
function ro(t, e, s) {
  return t < 100 && t >= 0 ? new Date(t + 400, e, s) - io : new Date(t, e, s).valueOf();
}
function ao(t, e, s) {
  return t < 100 && t >= 0 ? Date.UTC(t + 400, e, s) - io : Date.UTC(t, e, s);
}
function cp(t) {
  var e, s;
  if (t = ce(t), t === void 0 || t === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? ao : ro, t) {
    case "year":
      e = s(this.year(), 0, 1);
      break;
    case "quarter":
      e = s(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      e = s(this.year(), this.month(), 1);
      break;
    case "week":
      e = s(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      e = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      e = s(this.year(), this.month(), this.date());
      break;
    case "hour":
      e = this._d.valueOf(), e -= Tt(
        e + (this._isUTC ? 0 : this.utcOffset() * wt),
        Is
      );
      break;
    case "minute":
      e = this._d.valueOf(), e -= Tt(e, wt);
      break;
    case "second":
      e = this._d.valueOf(), e -= Tt(e, Ls);
      break;
  }
  return this._d.setTime(e), f.updateOffset(this, !0), this;
}
function up(t) {
  var e, s;
  if (t = ce(t), t === void 0 || t === "millisecond" || !this.isValid())
    return this;
  switch (s = this._isUTC ? ao : ro, t) {
    case "year":
      e = s(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      e = s(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      e = s(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      e = s(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      e = s(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      e = s(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      e = this._d.valueOf(), e += Is - Tt(
        e + (this._isUTC ? 0 : this.utcOffset() * wt),
        Is
      ) - 1;
      break;
    case "minute":
      e = this._d.valueOf(), e += wt - Tt(e, wt) - 1;
      break;
    case "second":
      e = this._d.valueOf(), e += Ls - Tt(e, Ls) - 1;
      break;
  }
  return this._d.setTime(e), f.updateOffset(this, !0), this;
}
function dp() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function hp() {
  return Math.floor(this.valueOf() / 1e3);
}
function fp() {
  return new Date(this.valueOf());
}
function _p() {
  var t = this;
  return [
    t.year(),
    t.month(),
    t.date(),
    t.hour(),
    t.minute(),
    t.second(),
    t.millisecond()
  ];
}
function pp() {
  var t = this;
  return {
    years: t.year(),
    months: t.month(),
    date: t.date(),
    hours: t.hours(),
    minutes: t.minutes(),
    seconds: t.seconds(),
    milliseconds: t.milliseconds()
  };
}
function mp() {
  return this.isValid() ? this.toISOString() : null;
}
function gp() {
  return ri(this);
}
function vp() {
  return We({}, E(this));
}
function yp() {
  return E(this).overflow;
}
function Ep() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
p("N", 0, 0, "eraAbbr");
p("NN", 0, 0, "eraAbbr");
p("NNN", 0, 0, "eraAbbr");
p("NNNN", 0, 0, "eraName");
p("NNNNN", 0, 0, "eraNarrow");
p("y", ["y", 1], "yo", "eraYear");
p("y", ["yy", 2], 0, "eraYear");
p("y", ["yyy", 3], 0, "eraYear");
p("y", ["yyyy", 4], 0, "eraYear");
_("N", Ti);
_("NN", Ti);
_("NNN", Ti);
_("NNNN", Cp);
_("NNNNN", xp);
k(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(t, e, s, n) {
    var i = s._locale.erasParse(t, n, s._strict);
    i ? E(s).era = i : E(s).invalidEra = t;
  }
);
_("y", Yt);
_("yy", Yt);
_("yyy", Yt);
_("yyyy", Yt);
_("yo", Lp);
k(["y", "yy", "yyy", "yyyy"], G);
k(["yo"], function(t, e, s, n) {
  var i;
  s._locale._eraYearOrdinalRegex && (i = t.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? e[G] = s._locale.eraYearOrdinalParse(t, i) : e[G] = parseInt(t, 10);
});
function bp(t, e) {
  var s, n, i, r = this._eras || Ye("en")._eras;
  for (s = 0, n = r.length; s < n; ++s) {
    switch (typeof r[s].since) {
      case "string":
        i = f(r[s].since).startOf("day"), r[s].since = i.valueOf();
        break;
    }
    switch (typeof r[s].until) {
      case "undefined":
        r[s].until = 1 / 0;
        break;
      case "string":
        i = f(r[s].until).startOf("day").valueOf(), r[s].until = i.valueOf();
        break;
    }
  }
  return r;
}
function wp(t, e, s) {
  var n, i, r = this.eras(), a, o, l;
  for (t = t.toUpperCase(), n = 0, i = r.length; n < i; ++n)
    if (a = r[n].name.toUpperCase(), o = r[n].abbr.toUpperCase(), l = r[n].narrow.toUpperCase(), s)
      switch (e) {
        case "N":
        case "NN":
        case "NNN":
          if (o === t)
            return r[n];
          break;
        case "NNNN":
          if (a === t)
            return r[n];
          break;
        case "NNNNN":
          if (l === t)
            return r[n];
          break;
      }
    else if ([a, o, l].indexOf(t) >= 0)
      return r[n];
}
function Tp(t, e) {
  var s = t.since <= t.until ? 1 : -1;
  return e === void 0 ? f(t.since).year() : f(t.since).year() + (e - t.offset) * s;
}
function Sp() {
  var t, e, s, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
      return n[t].name;
  return "";
}
function Op() {
  var t, e, s, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
      return n[t].narrow;
  return "";
}
function Ap() {
  var t, e, s, n = this.localeData().eras();
  for (t = 0, e = n.length; t < e; ++t)
    if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
      return n[t].abbr;
  return "";
}
function Dp() {
  var t, e, s, n, i = this.localeData().eras();
  for (t = 0, e = i.length; t < e; ++t)
    if (s = i[t].since <= i[t].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), i[t].since <= n && n <= i[t].until || i[t].until <= n && n <= i[t].since)
      return (this.year() - f(i[t].since).year()) * s + i[t].offset;
  return this.year();
}
function Mp(t) {
  return A(this, "_erasNameRegex") || Si.call(this), t ? this._erasNameRegex : this._erasRegex;
}
function Np(t) {
  return A(this, "_erasAbbrRegex") || Si.call(this), t ? this._erasAbbrRegex : this._erasRegex;
}
function kp(t) {
  return A(this, "_erasNarrowRegex") || Si.call(this), t ? this._erasNarrowRegex : this._erasRegex;
}
function Ti(t, e) {
  return e.erasAbbrRegex(t);
}
function Cp(t, e) {
  return e.erasNameRegex(t);
}
function xp(t, e) {
  return e.erasNarrowRegex(t);
}
function Lp(t, e) {
  return e._eraYearOrdinalRegex || Yt;
}
function Si() {
  var t = [], e = [], s = [], n = [], i, r, a, o, l, d = this.eras();
  for (i = 0, r = d.length; i < r; ++i)
    a = ke(d[i].name), o = ke(d[i].abbr), l = ke(d[i].narrow), e.push(a), t.push(o), s.push(l), n.push(a), n.push(o), n.push(l);
  this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
    "^(" + s.join("|") + ")",
    "i"
  );
}
p(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
p(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function tn(t, e) {
  p(0, [t, t.length], 0, e);
}
tn("gggg", "weekYear");
tn("ggggg", "weekYear");
tn("GGGG", "isoWeekYear");
tn("GGGGG", "isoWeekYear");
_("G", Zs);
_("g", Zs);
_("GG", I, se);
_("gg", I, se);
_("GGGG", di, ui);
_("gggg", di, ui);
_("GGGGG", qs, zs);
_("ggggg", qs, zs);
as(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(t, e, s, n) {
    e[n.substr(0, 2)] = T(t);
  }
);
as(["gg", "GG"], function(t, e, s, n) {
  e[n] = f.parseTwoDigitYear(t);
});
function Ip(t) {
  return oo.call(
    this,
    t,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function Yp(t) {
  return oo.call(
    this,
    t,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function Pp() {
  return Ce(this.year(), 1, 4);
}
function $p() {
  return Ce(this.isoWeekYear(), 1, 4);
}
function Rp() {
  var t = this.localeData()._week;
  return Ce(this.year(), t.dow, t.doy);
}
function Wp() {
  var t = this.localeData()._week;
  return Ce(this.weekYear(), t.dow, t.doy);
}
function oo(t, e, s, n, i) {
  var r;
  return t == null ? Zt(this, n, i).year : (r = Ce(t, n, i), e > r && (e = r), Hp.call(this, t, e, s, n, i));
}
function Hp(t, e, s, n, i) {
  var r = Ha(t, e, s, n, i), a = qt(r.year, 0, r.dayOfYear);
  return this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this;
}
p("Q", 0, "Qo", "quarter");
_("Q", Na);
k("Q", function(t, e) {
  e[Ae] = (T(t) - 1) * 3;
});
function Vp(t) {
  return t == null ? Math.ceil((this.month() + 1) / 3) : this.month((t - 1) * 3 + this.month() % 3);
}
p("D", ["DD", 2], "Do", "date");
_("D", I, Pt);
_("DD", I, se);
_("Do", function(t, e) {
  return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
});
k(["D", "DD"], ge);
k("Do", function(t, e) {
  e[ge] = T(t.match(I)[0]);
});
var lo = $t("Date", !0);
p("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
_("DDD", Ks);
_("DDDD", ka);
k(["DDD", "DDDD"], function(t, e, s) {
  s._dayOfYear = T(t);
});
function Fp(t) {
  var e = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return t == null ? e : this.add(t - e, "d");
}
p("m", ["mm", 2], 0, "minute");
_("m", I, hi);
_("mm", I, se);
k(["m", "mm"], he);
var Up = $t("Minutes", !1);
p("s", ["ss", 2], 0, "second");
_("s", I, hi);
_("ss", I, se);
k(["s", "ss"], De);
var jp = $t("Seconds", !1);
p("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
p(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
p(0, ["SSS", 3], 0, "millisecond");
p(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
p(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
p(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
p(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
p(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
p(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
_("S", Ks, Na);
_("SS", Ks, se);
_("SSS", Ks, ka);
var He, co;
for (He = "SSSS"; He.length <= 9; He += "S")
  _(He, Yt);
function Gp(t, e) {
  e[st] = T(("0." + t) * 1e3);
}
for (He = "S"; He.length <= 9; He += "S")
  k(He, Gp);
co = $t("Milliseconds", !1);
p("z", 0, 0, "zoneAbbr");
p("zz", 0, 0, "zoneName");
function Bp() {
  return this._isUTC ? "UTC" : "";
}
function zp() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var h = is.prototype;
h.add = W_;
h.calendar = B_;
h.clone = z_;
h.diff = ep;
h.endOf = up;
h.format = ip;
h.from = rp;
h.fromNow = ap;
h.to = op;
h.toNow = lp;
h.get = sf;
h.invalidAt = yp;
h.isAfter = K_;
h.isBefore = q_;
h.isBetween = Z_;
h.isSame = X_;
h.isSameOrAfter = Q_;
h.isSameOrBefore = J_;
h.isValid = gp;
h.lang = so;
h.locale = to;
h.localeData = no;
h.max = g_;
h.min = m_;
h.parsingFlags = vp;
h.set = nf;
h.startOf = cp;
h.subtract = H_;
h.toArray = _p;
h.toObject = pp;
h.toDate = fp;
h.toISOString = sp;
h.inspect = np;
typeof Symbol < "u" && Symbol.for != null && (h[Symbol.for("nodejs.util.inspect.custom")] = function() {
  return "Moment<" + this.format() + ">";
});
h.toJSON = mp;
h.toString = tp;
h.unix = hp;
h.valueOf = dp;
h.creationData = Ep;
h.eraName = Sp;
h.eraNarrow = Op;
h.eraAbbr = Ap;
h.eraYear = Dp;
h.year = La;
h.isLeapYear = tf;
h.weekYear = Ip;
h.isoWeekYear = Yp;
h.quarter = h.quarters = Vp;
h.month = Ra;
h.daysInMonth = ff;
h.week = h.weeks = bf;
h.isoWeek = h.isoWeeks = wf;
h.weeksInYear = Rp;
h.weeksInWeekYear = Wp;
h.isoWeeksInYear = Pp;
h.isoWeeksInISOWeekYear = $p;
h.date = lo;
h.day = h.days = Yf;
h.weekday = Pf;
h.isoWeekday = $f;
h.dayOfYear = Fp;
h.hour = h.hours = jf;
h.minute = h.minutes = Up;
h.second = h.seconds = jp;
h.millisecond = h.milliseconds = co;
h.utcOffset = A_;
h.utc = M_;
h.local = N_;
h.parseZone = k_;
h.hasAlignedHourOffset = C_;
h.isDST = x_;
h.isLocal = I_;
h.isUtcOffset = Y_;
h.isUtc = Xa;
h.isUTC = Xa;
h.zoneAbbr = Bp;
h.zoneName = zp;
h.dates = le(
  "dates accessor is deprecated. Use date instead.",
  lo
);
h.months = le(
  "months accessor is deprecated. Use month instead",
  Ra
);
h.years = le(
  "years accessor is deprecated. Use year instead",
  La
);
h.zone = le(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  D_
);
h.isDSTShifted = le(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  L_
);
function Kp(t) {
  return L(t * 1e3);
}
function qp() {
  return L.apply(null, arguments).parseZone();
}
function uo(t) {
  return t;
}
var D = oi.prototype;
D.calendar = Lh;
D.longDateFormat = $h;
D.invalidDate = Wh;
D.ordinal = Fh;
D.preparse = uo;
D.postformat = uo;
D.relativeTime = jh;
D.pastFuture = Gh;
D.set = Ch;
D.eras = bp;
D.erasParse = wp;
D.erasConvertYear = Tp;
D.erasAbbrRegex = Np;
D.erasNameRegex = Mp;
D.erasNarrowRegex = kp;
D.months = cf;
D.monthsShort = uf;
D.monthsParse = hf;
D.monthsRegex = pf;
D.monthsShortRegex = _f;
D.week = gf;
D.firstDayOfYear = Ef;
D.firstDayOfWeek = yf;
D.weekdays = kf;
D.weekdaysMin = xf;
D.weekdaysShort = Cf;
D.weekdaysParse = If;
D.weekdaysRegex = Rf;
D.weekdaysShortRegex = Wf;
D.weekdaysMinRegex = Hf;
D.isPM = Ff;
D.meridiem = Gf;
function Ys(t, e, s, n) {
  var i = Ye(), r = we().set(n, e);
  return i[s](r, t);
}
function ho(t, e, s) {
  if (Le(t) && (e = t, t = void 0), t = t || "", e != null)
    return Ys(t, e, s, "month");
  var n, i = [];
  for (n = 0; n < 12; n++)
    i[n] = Ys(t, n, s, "month");
  return i;
}
function Oi(t, e, s, n) {
  typeof t == "boolean" ? (Le(e) && (s = e, e = void 0), e = e || "") : (e = t, s = e, t = !1, Le(e) && (s = e, e = void 0), e = e || "");
  var i = Ye(), r = t ? i._week.dow : 0, a, o = [];
  if (s != null)
    return Ys(e, (s + r) % 7, n, "day");
  for (a = 0; a < 7; a++)
    o[a] = Ys(e, (a + r) % 7, n, "day");
  return o;
}
function Zp(t, e) {
  return ho(t, e, "months");
}
function Xp(t, e) {
  return ho(t, e, "monthsShort");
}
function Qp(t, e, s) {
  return Oi(t, e, s, "weekdays");
}
function Jp(t, e, s) {
  return Oi(t, e, s, "weekdaysShort");
}
function em(t, e, s) {
  return Oi(t, e, s, "weekdaysMin");
}
Ve("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(t) {
    var e = t % 10, s = T(t % 100 / 10) === 1 ? "th" : e === 1 ? "st" : e === 2 ? "nd" : e === 3 ? "rd" : "th";
    return t + s;
  }
});
f.lang = le(
  "moment.lang is deprecated. Use moment.locale instead.",
  Ve
);
f.langData = le(
  "moment.langData is deprecated. Use moment.localeData instead.",
  Ye
);
var Se = Math.abs;
function tm() {
  var t = this._data;
  return this._milliseconds = Se(this._milliseconds), this._days = Se(this._days), this._months = Se(this._months), t.milliseconds = Se(t.milliseconds), t.seconds = Se(t.seconds), t.minutes = Se(t.minutes), t.hours = Se(t.hours), t.months = Se(t.months), t.years = Se(t.years), this;
}
function fo(t, e, s, n) {
  var i = me(e, s);
  return t._milliseconds += n * i._milliseconds, t._days += n * i._days, t._months += n * i._months, t._bubble();
}
function sm(t, e) {
  return fo(this, t, e, 1);
}
function nm(t, e) {
  return fo(this, t, e, -1);
}
function wr(t) {
  return t < 0 ? Math.floor(t) : Math.ceil(t);
}
function im() {
  var t = this._milliseconds, e = this._days, s = this._months, n = this._data, i, r, a, o, l;
  return t >= 0 && e >= 0 && s >= 0 || t <= 0 && e <= 0 && s <= 0 || (t += wr(Hn(s) + e) * 864e5, e = 0, s = 0), n.milliseconds = t % 1e3, i = ne(t / 1e3), n.seconds = i % 60, r = ne(i / 60), n.minutes = r % 60, a = ne(r / 60), n.hours = a % 24, e += ne(a / 24), l = ne(_o(e)), s += l, e -= wr(Hn(l)), o = ne(s / 12), s %= 12, n.days = e, n.months = s, n.years = o, this;
}
function _o(t) {
  return t * 4800 / 146097;
}
function Hn(t) {
  return t * 146097 / 4800;
}
function rm(t) {
  if (!this.isValid())
    return NaN;
  var e, s, n = this._milliseconds;
  if (t = ce(t), t === "month" || t === "quarter" || t === "year")
    switch (e = this._days + n / 864e5, s = this._months + _o(e), t) {
      case "month":
        return s;
      case "quarter":
        return s / 3;
      case "year":
        return s / 12;
    }
  else
    switch (e = this._days + Math.round(Hn(this._months)), t) {
      case "week":
        return e / 7 + n / 6048e5;
      case "day":
        return e + n / 864e5;
      case "hour":
        return e * 24 + n / 36e5;
      case "minute":
        return e * 1440 + n / 6e4;
      case "second":
        return e * 86400 + n / 1e3;
      // Math.floor prevents floating point math errors here
      case "millisecond":
        return Math.floor(e * 864e5) + n;
      default:
        throw new Error("Unknown unit " + t);
    }
}
function Pe(t) {
  return function() {
    return this.as(t);
  };
}
var po = Pe("ms"), am = Pe("s"), om = Pe("m"), lm = Pe("h"), cm = Pe("d"), um = Pe("w"), dm = Pe("M"), hm = Pe("Q"), fm = Pe("y"), _m = po;
function pm() {
  return me(this);
}
function mm(t) {
  return t = ce(t), this.isValid() ? this[t + "s"]() : NaN;
}
function ut(t) {
  return function() {
    return this.isValid() ? this._data[t] : NaN;
  };
}
var gm = ut("milliseconds"), vm = ut("seconds"), ym = ut("minutes"), Em = ut("hours"), bm = ut("days"), wm = ut("months"), Tm = ut("years");
function Sm() {
  return ne(this.days() / 7);
}
var Oe = Math.round, Et = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function Om(t, e, s, n, i) {
  return i.relativeTime(e || 1, !!s, t, n);
}
function Am(t, e, s, n) {
  var i = me(t).abs(), r = Oe(i.as("s")), a = Oe(i.as("m")), o = Oe(i.as("h")), l = Oe(i.as("d")), d = Oe(i.as("M")), c = Oe(i.as("w")), g = Oe(i.as("y")), v = r <= s.ss && ["s", r] || r < s.s && ["ss", r] || a <= 1 && ["m"] || a < s.m && ["mm", a] || o <= 1 && ["h"] || o < s.h && ["hh", o] || l <= 1 && ["d"] || l < s.d && ["dd", l];
  return s.w != null && (v = v || c <= 1 && ["w"] || c < s.w && ["ww", c]), v = v || d <= 1 && ["M"] || d < s.M && ["MM", d] || g <= 1 && ["y"] || ["yy", g], v[2] = e, v[3] = +t > 0, v[4] = n, Om.apply(null, v);
}
function Dm(t) {
  return t === void 0 ? Oe : typeof t == "function" ? (Oe = t, !0) : !1;
}
function Mm(t, e) {
  return Et[t] === void 0 ? !1 : e === void 0 ? Et[t] : (Et[t] = e, t === "s" && (Et.ss = e - 1), !0);
}
function Nm(t, e) {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var s = !1, n = Et, i, r;
  return typeof t == "object" && (e = t, t = !1), typeof t == "boolean" && (s = t), typeof e == "object" && (n = Object.assign({}, Et, e), e.s != null && e.ss == null && (n.ss = e.s - 1)), i = this.localeData(), r = Am(this, !s, n, i), s && (r = i.pastFuture(+this, r)), i.postformat(r);
}
var An = Math.abs;
function _t(t) {
  return (t > 0) - (t < 0) || +t;
}
function sn() {
  if (!this.isValid())
    return this.localeData().invalidDate();
  var t = An(this._milliseconds) / 1e3, e = An(this._days), s = An(this._months), n, i, r, a, o = this.asSeconds(), l, d, c, g;
  return o ? (n = ne(t / 60), i = ne(n / 60), t %= 60, n %= 60, r = ne(s / 12), s %= 12, a = t ? t.toFixed(3).replace(/\.?0+$/, "") : "", l = o < 0 ? "-" : "", d = _t(this._months) !== _t(o) ? "-" : "", c = _t(this._days) !== _t(o) ? "-" : "", g = _t(this._milliseconds) !== _t(o) ? "-" : "", l + "P" + (r ? d + r + "Y" : "") + (s ? d + s + "M" : "") + (e ? c + e + "D" : "") + (i || n || t ? "T" : "") + (i ? g + i + "H" : "") + (n ? g + n + "M" : "") + (t ? g + a + "S" : "")) : "P0D";
}
var S = en.prototype;
S.isValid = w_;
S.abs = tm;
S.add = sm;
S.subtract = nm;
S.as = rm;
S.asMilliseconds = po;
S.asSeconds = am;
S.asMinutes = om;
S.asHours = lm;
S.asDays = cm;
S.asWeeks = um;
S.asMonths = dm;
S.asQuarters = hm;
S.asYears = fm;
S.valueOf = _m;
S._bubble = im;
S.clone = pm;
S.get = mm;
S.milliseconds = gm;
S.seconds = vm;
S.minutes = ym;
S.hours = Em;
S.days = bm;
S.weeks = Sm;
S.months = wm;
S.years = Tm;
S.humanize = Nm;
S.toISOString = sn;
S.toString = sn;
S.toJSON = sn;
S.locale = to;
S.localeData = no;
S.toIsoString = le(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  sn
);
S.lang = so;
p("X", 0, 0, "unix");
p("x", 0, 0, "valueOf");
_("x", Zs);
_("X", qh);
k("X", function(t, e, s) {
  s._d = new Date(parseFloat(t) * 1e3);
});
k("x", function(t, e, s) {
  s._d = new Date(T(t));
});
//! moment.js
f.version = "2.30.1";
Nh(L);
f.fn = h;
f.min = v_;
f.max = y_;
f.now = E_;
f.utc = we;
f.unix = Kp;
f.months = Zp;
f.isDate = ns;
f.locale = Ve;
f.invalid = Bs;
f.duration = me;
f.isMoment = _e;
f.weekdays = Qp;
f.parseZone = qp;
f.localeData = Ye;
f.isDuration = Os;
f.monthsShort = Xp;
f.weekdaysMin = em;
f.defineLocale = gi;
f.updateLocale = qf;
f.locales = Zf;
f.weekdaysShort = Jp;
f.normalizeUnits = ce;
f.relativeTimeRounding = Dm;
f.relativeTimeThreshold = Mm;
f.calendarFormat = G_;
f.prototype = h;
f.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
class km extends Ta {
  create() {
    const e = this.createElement("input");
    return e.type = "datetime-local", this.createContainer(e);
  }
  initOptions() {
    this.context.get_opt("format", "YYYY-MM-DD HH:mm"), this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm"), this.context.value = f(this.context.value).format("YYYY-MM-DDTHH:mm");
  }
}
class xm {
  constructor(e, s = {}) {
    z(this, "modeElement", null);
    z(this, "typeElement", null);
    z(this, "mode", null);
    z(this, "type", null);
    z(this, "emptytext", null);
    z(this, "viewformat", null);
    z(this, "pk", null);
    z(this, "name", null);
    this.element = e, this.options = s, this.init_options(), this.typeElement = this.route_type(), this.typeElement.initOptions(), this.modeElement = this.route_mode(), this.modeElement.init(), this.init_text(), this.init_style(), this.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init"));
  }
  /* INIT METHODS */
  get_opt(e, s) {
    var n, i;
    return this[e] = ((n = this.element.dataset) == null ? void 0 : n[e]) ?? ((i = this.options) == null ? void 0 : i[e]) ?? s;
  }
  get_opt_bool(e, s) {
    return this.get_opt(e, s), typeof this[e] != "boolean" && (this[e] === "true" ? this[e] = !0 : this[e] === "false" ? this[e] = !1 : this[e] = s), this[e];
  }
  init_options() {
    var e, s, n, i;
    this.get_opt("value", this.element.innerHTML), this.get_opt("name", this.element.id), this.get_opt("pk", null), this.get_opt("title", ""), this.get_opt("type", "text"), this.get_opt("emptytext", "Empty"), this.get_opt("mode", "popup"), this.get_opt("url", null), this.get_opt("ajaxOptions", {}), this.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text"
    }, this.ajaxOptions), this.get_opt_bool("send", !0), this.get_opt_bool("disabled", !1), this.get_opt_bool("required", !1), this.get_opt_bool("showbuttons", !0), (e = this.options) != null && e.success && typeof ((s = this.options) == null ? void 0 : s.success) == "function" && (this.success = this.options.success), (n = this.options) != null && n.error && typeof ((i = this.options) == null ? void 0 : i.error) == "function" && (this.error = this.options.error);
  }
  init_text() {
    const e = "dark-editable-element-empty";
    this.element.classList.remove(e), this.typeElement.initText() && this.element.classList.add(e);
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
        return new Sh(this);
      case "inline":
        return new Oh(this);
    }
  }
  route_type() {
    if (this.type.prototype instanceof ct)
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
          return new Ah(this);
        case "textarea":
          return new Dh(this);
        case "select":
          return new Mh(this);
        case "date":
          return new Ta(this);
        case "datetime":
          return new km(this);
      }
    throw new Error("Undefined type");
  }
  /* AJAX */
  async success(e, s) {
    return await this.typeElement.successResponse(e, s);
  }
  async error(e, s) {
    return await this.typeElement.errorResponse(e, s);
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.enable();
  }
  setValue(e) {
    this.value = e, this.init_text();
  }
  getValue() {
    return this.value;
  }
  /* METHODS END */
}
export {
  xm as default
};
