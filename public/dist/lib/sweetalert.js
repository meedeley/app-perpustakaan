!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (e.Sweetalert2 = t());
})(this, function () {
    "use strict";
    function e() {
        null === y.previousBodyPadding &&
            document.body.scrollHeight > window.innerHeight &&
            ((y.previousBodyPadding = document.body.style.paddingRight),
            (document.body.style.paddingRight = U() + "px"));
    }
    function t() {
        null !== y.previousBodyPadding &&
            ((document.body.style.paddingRight = y.previousBodyPadding),
            (y.previousBodyPadding = null));
    }
    function n() {
        var e =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (e && !q(document.body, c.iosfix)) {
            var t = document.body.scrollTop;
            (document.body.style.top = -1 * t + "px"),
                M(document.body, c.iosfix);
        }
    }
    function o() {
        if (q(document.body, c.iosfix)) {
            var e = parseInt(document.body.style.top, 10);
            T(document.body, c.iosfix), (document.body.scrollTop = -1 * e);
        }
    }
    function r() {
        if (void 0 === arguments[0])
            return (
                console.error("SweetAlert2 expects at least 1 attribute!"), !1
            );
        var e = v({}, Q);
        switch (typeof arguments[0]) {
            case "string":
                (e.title = arguments[0]),
                    (e.text = arguments[1] || ""),
                    (e.type = arguments[2] || "");
                break;
            case "object":
                v(e, arguments[0]),
                    (e.extraParams = arguments[0].extraParams),
                    "email" === e.input &&
                        null === e.inputValidator &&
                        (e.inputValidator = function (e) {
                            return new Promise(function (t, n) {
                                var o =
                                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                                o.test(e) ? t() : n("Invalid email address");
                            });
                        });
                break;
            default:
                return (
                    console.error(
                        'SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' +
                            typeof arguments[0]
                    ),
                    !1
                );
        }
        Z(e);
        var t = w();
        return new Promise(function (n, o) {
            function r(t, n) {
                for (var o = A(e.focusCancel), r = 0; r < o.length; r++) {
                    (t += n),
                        t === o.length
                            ? (t = 0)
                            : -1 === t && (t = o.length - 1);
                    var i = o[t];
                    if (j(i)) return i.focus();
                }
            }
            function l(t) {
                var n = t || window.event,
                    a = n.keyCode || n.which;
                if (-1 !== [9, 13, 32, 27].indexOf(a)) {
                    for (
                        var l = n.target || n.srcElement,
                            s = A(e.focusCancel),
                            c = -1,
                            u = 0;
                        u < s.length;
                        u++
                    )
                        if (l === s[u]) {
                            c = u;
                            break;
                        }
                    9 === a
                        ? (n.shiftKey ? r(c, -1) : r(c, 1), D(n))
                        : 13 === a || 32 === a
                        ? -1 === c && (e.focusCancel ? W(b, n) : W(g, n))
                        : 27 === a &&
                          e.allowEscapeKey === !0 &&
                          (i.closeModal(e.onClose), o("esc"));
                }
            }
            e.timer &&
                (t.timeout = setTimeout(function () {
                    i.closeModal(e.onClose), o("timer");
                }, e.timer));
            var s = function (n) {
                    switch ((n = n || e.input)) {
                        case "select":
                        case "textarea":
                        case "file":
                            return V(t, c[n]);
                        case "checkbox":
                            return t.querySelector("." + c.checkbox + " input");
                        case "radio":
                            return (
                                t.querySelector(
                                    "." + c.radio + " input:checked"
                                ) ||
                                t.querySelector(
                                    "." + c.radio + " input:first-child"
                                )
                            );
                        case "range":
                            return t.querySelector("." + c.range + " input");
                        default:
                            return V(t, c.input);
                    }
                },
                u = function () {
                    var t = s();
                    if (!t) return null;
                    switch (e.input) {
                        case "checkbox":
                            return t.checked ? 1 : 0;
                        case "radio":
                            return t.checked ? t.value : null;
                        case "file":
                            return t.files.length ? t.files[0] : null;
                        default:
                            return e.inputAutoTrim ? t.value.trim() : t.value;
                    }
                };
            e.input &&
                setTimeout(function () {
                    var e = s();
                    e && L(e);
                }, 0);
            var d,
                p = function (t) {
                    e.showLoaderOnConfirm && i.showLoading(),
                        e.preConfirm
                            ? e.preConfirm(t, e.extraParams).then(
                                  function (o) {
                                      i.closeModal(e.onClose), n(o || t);
                                  },
                                  function (e) {
                                      i.hideLoading(),
                                          e && i.showValidationError(e);
                                  }
                              )
                            : (i.closeModal(e.onClose), n(t));
                },
                f = function (t) {
                    var n = t || window.event,
                        r = n.target || n.srcElement,
                        a = E(),
                        l = B(),
                        s = a === r || a.contains(r),
                        c = l === r || l.contains(r);
                    switch (n.type) {
                        case "mouseover":
                        case "mouseup":
                            e.buttonsStyling &&
                                (s
                                    ? (a.style.backgroundColor = h(
                                          e.confirmButtonColor,
                                          -0.1
                                      ))
                                    : c &&
                                      (l.style.backgroundColor = h(
                                          e.cancelButtonColor,
                                          -0.1
                                      )));
                            break;
                        case "mouseout":
                            e.buttonsStyling &&
                                (s
                                    ? (a.style.backgroundColor =
                                          e.confirmButtonColor)
                                    : c &&
                                      (l.style.backgroundColor =
                                          e.cancelButtonColor));
                            break;
                        case "mousedown":
                            e.buttonsStyling &&
                                (s
                                    ? (a.style.backgroundColor = h(
                                          e.confirmButtonColor,
                                          -0.2
                                      ))
                                    : c &&
                                      (l.style.backgroundColor = h(
                                          e.cancelButtonColor,
                                          -0.2
                                      )));
                            break;
                        case "click":
                            if (s && i.isVisible())
                                if (e.input) {
                                    var d = u();
                                    e.inputValidator
                                        ? (i.disableInput(),
                                          e
                                              .inputValidator(d, e.extraParams)
                                              .then(
                                                  function () {
                                                      i.enableInput(), p(d);
                                                  },
                                                  function (e) {
                                                      i.enableInput(),
                                                          e &&
                                                              i.showValidationError(
                                                                  e
                                                              );
                                                  }
                                              ))
                                        : p(d);
                                } else p(!0);
                            else
                                c &&
                                    i.isVisible() &&
                                    (i.closeModal(e.onClose), o("cancel"));
                    }
                },
                v = t.querySelectorAll("button");
            for (d = 0; d < v.length; d++)
                (v[d].onclick = f),
                    (v[d].onmouseover = f),
                    (v[d].onmouseout = f),
                    (v[d].onmousedown = f);
            (P().onclick = function () {
                i.closeModal(e.onClose), o("close");
            }),
                (a.onclick = function (t) {
                    t.target === a &&
                        e.allowOutsideClick &&
                        (i.closeModal(e.onClose), o("overlay"));
                });
            var g = E(),
                b = B();
            e.reverseButtons
                ? g.parentNode.insertBefore(b, g)
                : g.parentNode.insertBefore(g, b),
                (y.previousWindowKeyDown = window.onkeydown),
                (window.onkeydown = l),
                e.buttonsStyling &&
                    ((g.style.borderLeftColor = e.confirmButtonColor),
                    (g.style.borderRightColor = e.confirmButtonColor)),
                (i.showLoading = i.enableLoading =
                    function () {
                        H(k()),
                            H(g, "inline-block"),
                            M(g, c.loading),
                            M(t, c.loading),
                            (g.disabled = !0),
                            (b.disabled = !0);
                    }),
                (i.hideLoading = i.disableLoading =
                    function () {
                        e.showConfirmButton ||
                            (O(g), e.showCancelButton || O(k())),
                            T(g, c.loading),
                            T(t, c.loading),
                            (g.disabled = !1),
                            (b.disabled = !1);
                    }),
                (i.enableButtons = function () {
                    (g.disabled = !1), (b.disabled = !1);
                }),
                (i.disableButtons = function () {
                    (g.disabled = !0), (b.disabled = !0);
                }),
                (i.enableConfirmButton = function () {
                    g.disabled = !1;
                }),
                (i.disableConfirmButton = function () {
                    g.disabled = !0;
                }),
                (i.enableInput = function () {
                    var e = s();
                    if (!e) return !1;
                    if ("radio" === e.type)
                        for (
                            var t = e.parentNode.parentNode,
                                n = t.querySelectorAll("input"),
                                o = 0;
                            o < n.length;
                            o++
                        )
                            n[o].disabled = !1;
                    else e.disabled = !1;
                }),
                (i.disableInput = function () {
                    var e = s();
                    if (!e) return !1;
                    if (e && "radio" === e.type)
                        for (
                            var t = e.parentNode.parentNode,
                                n = t.querySelectorAll("input"),
                                o = 0;
                            o < n.length;
                            o++
                        )
                            n[o].disabled = !0;
                    else e.disabled = !0;
                }),
                (i.recalculateHeight = z(function () {
                    var e = w(),
                        t = e.style.display;
                    (e.style.minHeight = ""),
                        H(e),
                        (e.style.minHeight = e.scrollHeight + 1 + "px"),
                        (e.style.display = t);
                }, 50)),
                (i.showValidationError = function (e) {
                    var t = x();
                    (t.innerHTML = e), H(t);
                    var n = s();
                    L(n), M(n, c.inputerror);
                }),
                (i.resetValidationError = function () {
                    var e = x();
                    O(e), i.recalculateHeight();
                    var t = s();
                    t && T(t, c.inputerror);
                }),
                (i.getProgressSteps = function () {
                    return e.progressSteps;
                }),
                (i.setProgressSteps = function (t) {
                    (e.progressSteps = t), Z(e);
                }),
                (i.showProgressSteps = function () {
                    H(S());
                }),
                (i.hideProgressSteps = function () {
                    O(S());
                }),
                i.enableButtons(),
                i.hideLoading(),
                i.resetValidationError();
            var C,
                q = [
                    "input",
                    "file",
                    "range",
                    "select",
                    "radio",
                    "checkbox",
                    "textarea",
                ];
            for (d = 0; d < q.length; d++) {
                var N = c[q[d]],
                    I = V(t, N);
                if ((C = s(q[d]))) {
                    for (var K in C.attributes)
                        if (C.attributes.hasOwnProperty(K)) {
                            var R = C.attributes[K].name;
                            "type" !== R &&
                                "value" !== R &&
                                C.removeAttribute(R);
                        }
                    for (var U in e.inputAttributes)
                        C.setAttribute(U, e.inputAttributes[U]);
                }
                (I.className = N), e.inputClass && M(I, e.inputClass), O(I);
            }
            var Q;
            switch (e.input) {
                case "text":
                case "email":
                case "password":
                case "number":
                case "tel":
                    (C = V(t, c.input)),
                        (C.value = e.inputValue),
                        (C.placeholder = e.inputPlaceholder),
                        (C.type = e.input),
                        H(C);
                    break;
                case "file":
                    (C = V(t, c.file)),
                        (C.placeholder = e.inputPlaceholder),
                        (C.type = e.input),
                        H(C);
                    break;
                case "range":
                    var Y = V(t, c.range),
                        J = Y.querySelector("input"),
                        $ = Y.querySelector("output");
                    (J.value = e.inputValue),
                        (J.type = e.input),
                        ($.value = e.inputValue),
                        H(Y);
                    break;
                case "select":
                    var _ = V(t, c.select);
                    if (((_.innerHTML = ""), e.inputPlaceholder)) {
                        var G = document.createElement("option");
                        (G.innerHTML = e.inputPlaceholder),
                            (G.value = ""),
                            (G.disabled = !0),
                            (G.selected = !0),
                            _.appendChild(G);
                    }
                    Q = function (t) {
                        for (var n in t) {
                            var o = document.createElement("option");
                            (o.value = n),
                                (o.innerHTML = t[n]),
                                e.inputValue === n && (o.selected = !0),
                                _.appendChild(o);
                        }
                        H(_), _.focus();
                    };
                    break;
                case "radio":
                    var X = V(t, c.radio);
                    (X.innerHTML = ""),
                        (Q = function (t) {
                            for (var n in t) {
                                var o = 1,
                                    r = document.createElement("input"),
                                    i = document.createElement("label"),
                                    a = document.createElement("span");
                                (r.type = "radio"),
                                    (r.name = c.radio),
                                    (r.value = n),
                                    (r.id = c.radio + "-" + o++),
                                    e.inputValue === n && (r.checked = !0),
                                    (a.innerHTML = t[n]),
                                    i.appendChild(r),
                                    i.appendChild(a),
                                    (i["for"] = r.id),
                                    X.appendChild(i);
                            }
                            H(X);
                            var l = X.querySelectorAll("input");
                            l.length && l[0].focus();
                        });
                    break;
                case "checkbox":
                    var ee = V(t, c.checkbox),
                        te = s("checkbox");
                    (te.type = "checkbox"),
                        (te.value = 1),
                        (te.id = c.checkbox),
                        (te.checked = Boolean(e.inputValue));
                    var ne = ee.getElementsByTagName("span");
                    ne.length && ee.removeChild(ne[0]),
                        (ne = document.createElement("span")),
                        (ne.innerHTML = e.inputPlaceholder),
                        ee.appendChild(ne),
                        H(ee);
                    break;
                case "textarea":
                    var oe = V(t, c.textarea);
                    (oe.value = e.inputValue),
                        (oe.placeholder = e.inputPlaceholder),
                        H(oe);
                    break;
                case null:
                    break;
                default:
                    console.error(
                        'SweetAlert2: Unexpected type of input! Expected "text" or "email" or "password", "select", "checkbox", "textarea" or "file", got "' +
                            e.input +
                            '"'
                    );
            }
            ("select" !== e.input && "radio" !== e.input) ||
                (e.inputOptions instanceof Promise
                    ? (i.showLoading(),
                      e.inputOptions.then(function (e) {
                          i.hideLoading(), Q(e);
                      }))
                    : "object" == typeof e.inputOptions
                    ? Q(e.inputOptions)
                    : console.error(
                          "SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got " +
                              typeof e.inputOptions
                      )),
                F(e.animation, e.onOpen),
                r(-1, 1),
                (a.scrollTop = 0),
                "undefined" == typeof MutationObserver ||
                    m ||
                    ((m = new MutationObserver(i.recalculateHeight)),
                    m.observe(t, {
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                    }));
        });
    }
    function i() {
        var e = arguments;
        return i.isVisible() && i.close(), r.apply(this, e);
    }
    var a,
        l = "swal2-",
        s = function (e) {
            var t = {};
            for (var n in e) t[e[n]] = l + e[n];
            return t;
        },
        c = s([
            "container",
            "in",
            "iosfix",
            "modal",
            "overlay",
            "fade",
            "show",
            "hide",
            "noanimation",
            "close",
            "content",
            "spacer",
            "confirm",
            "cancel",
            "icon",
            "image",
            "input",
            "file",
            "range",
            "select",
            "radio",
            "checkbox",
            "textarea",
            "inputerror",
            "validationerror",
            "progresssteps",
            "activeprogressstep",
            "progresscircle",
            "progressline",
            "loading",
            "styled",
        ]),
        u = s(["success", "warning", "info", "question", "error"]),
        d = {
            title: "",
            text: "",
            html: "",
            type: null,
            customClass: "",
            animation: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
            confirmButtonClass: null,
            cancelButtonText: "Cancel",
            cancelButtonColor: "#aaa",
            cancelButtonClass: null,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusCancel: !1,
            showCloseButton: !1,
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageClass: null,
            timer: null,
            width: 500,
            padding: 20,
            background: "#fff",
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: null,
            inputAttributes: {},
            inputValidator: null,
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: "40px",
            onOpen: null,
            onClose: null,
        },
        p =
            '<div class="' +
            c.modal +
            '" style="display: none" tabIndex="-1"><ul class="' +
            c.progresssteps +
            '"></ul><div class="' +
            c.icon +
            " " +
            u.error +
            '"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="' +
            c.icon +
            " " +
            u.question +
            '">?</div><div class="' +
            c.icon +
            " " +
            u.warning +
            '">!</div><div class="' +
            c.icon +
            " " +
            u.info +
            '">i</div><div class="' +
            c.icon +
            " " +
            u.success +
            '"><span class="line tip"></span> <span class="line long"></span><div class="placeholder"></div> <div class="fix"></div></div><img class="' +
            c.image +
            '"><h2></h2><div class="' +
            c.content +
            '"></div><input class="' +
            c.input +
            '"><input type="file" class="' +
            c.file +
            '"><div class="' +
            c.range +
            '"><output></output><input type="range"></div><select class="' +
            c.select +
            '"></select><div class="' +
            c.radio +
            '"></div><label for="' +
            c.checkbox +
            '" class="' +
            c.checkbox +
            '"><input type="checkbox"></label><textarea class="' +
            c.textarea +
            '"></textarea><div class="' +
            c.validationerror +
            '"></div><hr class="' +
            c.spacer +
            '"><button type="button" class="' +
            c.confirm +
            '">OK</button><button type="button" class="' +
            c.cancel +
            '">Cancel</button><span class="' +
            c.close +
            '">&times;</span></div>',
        f = document.getElementsByClassName(c.container);
    f.length
        ? (a = f[0])
        : ((a = document.createElement("div")),
          (a.className = c.container),
          (a.innerHTML = p));
    var m,
        v = function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e;
        },
        h = function (e, t) {
            (e = String(e).replace(/[^0-9a-f]/gi, "")),
                e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
                (t = t || 0);
            for (var n = "#", o = 0; 3 > o; o++) {
                var r = parseInt(e.substr(2 * o, 2), 16);
                (r = Math.round(Math.min(Math.max(0, r + r * t), 255)).toString(
                    16
                )),
                    (n += ("00" + r).substr(r.length));
            }
            return n;
        },
        y = {
            previousWindowKeyDown: null,
            previousActiveElement: null,
            previousBodyPadding: null,
        },
        g = function () {
            if ("undefined" == typeof document)
                return void console.error(
                    "SweetAlert2 requires document to initialize"
                );
            if (!document.getElementsByClassName(c.container).length) {
                document.body.appendChild(a);
                var e = w(),
                    t = V(e, c.input),
                    n = V(e, c.file),
                    o = e.querySelector("." + c.range + " input"),
                    r = V(e, c.select),
                    l = e.querySelector("." + c.checkbox + " input"),
                    s = V(e, c.textarea);
                return (
                    (t.oninput = function () {
                        i.resetValidationError();
                    }),
                    (t.onkeydown = function (e) {
                        setTimeout(function () {
                            13 === e.keyCode &&
                                (e.stopPropagation(), i.clickConfirm());
                        }, 0);
                    }),
                    (n.onchange = function () {
                        i.resetValidationError();
                    }),
                    (o.oninput = function () {
                        i.resetValidationError(),
                            (o.previousSibling.value = o.value);
                    }),
                    (o.onchange = function () {
                        i.resetValidationError(),
                            (o.previousSibling.value = o.value);
                    }),
                    (r.onchange = function () {
                        i.resetValidationError();
                    }),
                    (l.onchange = function () {
                        i.resetValidationError();
                    }),
                    (s.oninput = function () {
                        i.resetValidationError();
                    }),
                    e
                );
            }
        },
        b = function (e) {
            return a.querySelector("." + e);
        },
        w = function () {
            return document.body.querySelector("." + c.modal) || g();
        },
        C = function () {
            var e = w();
            return e.querySelectorAll("." + c.icon);
        },
        k = function () {
            return b(c.spacer);
        },
        S = function () {
            return b(c.progresssteps);
        },
        x = function () {
            return b(c.validationerror);
        },
        E = function () {
            return b(c.confirm);
        },
        B = function () {
            return b(c.cancel);
        },
        P = function () {
            return b(c.close);
        },
        A = function (e) {
            var t = [E(), B()];
            return (
                e && t.reverse(),
                t.concat(
                    Array.prototype.slice.call(
                        w().querySelectorAll(
                            "button:not([class^=" +
                                l +
                                "]), input:not([type=hidden]), textarea, select"
                        )
                    )
                )
            );
        },
        q = function (e, t) {
            return e.classList.contains(t);
        },
        L = function (e) {
            if ((e.focus(), "file" !== e.type)) {
                var t = e.value;
                (e.value = ""), (e.value = t);
            }
        },
        M = function (e, t) {
            if (e && t) {
                var n = t.split(/\s+/);
                n.forEach(function (t) {
                    e.classList.add(t);
                });
            }
        },
        T = function (e, t) {
            if (e && t) {
                var n = t.split(/\s+/);
                n.forEach(function (t) {
                    e.classList.remove(t);
                });
            }
        },
        V = function (e, t) {
            for (var n = 0; n < e.childNodes.length; n++)
                if (q(e.childNodes[n], t)) return e.childNodes[n];
        },
        H = function (e, t) {
            t || (t = "block"), (e.style.opacity = ""), (e.style.display = t);
        },
        O = function (e) {
            (e.style.opacity = ""), (e.style.display = "none");
        },
        N = function (e) {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
        },
        j = function (e) {
            return e.offsetWidth || e.offsetHeight || e.getClientRects().length;
        },
        I = function (e, t) {
            e.style.removeProperty
                ? e.style.removeProperty(t)
                : e.style.removeAttribute(t);
        },
        W = function (e) {
            if ("function" == typeof MouseEvent) {
                var t = new MouseEvent("click", {
                    view: window,
                    bubbles: !1,
                    cancelable: !0,
                });
                e.dispatchEvent(t);
            } else if (document.createEvent) {
                var n = document.createEvent("MouseEvents");
                n.initEvent("click", !1, !1), e.dispatchEvent(n);
            } else
                document.createEventObject
                    ? e.fireEvent("onclick")
                    : "function" == typeof e.onclick && e.onclick();
        },
        D = function (e) {
            "function" == typeof e.stopPropagation
                ? (e.stopPropagation(), e.preventDefault())
                : window.event &&
                  window.event.hasOwnProperty("cancelBubble") &&
                  (window.event.cancelBubble = !0);
        },
        K = (function () {
            var e = document.createElement("div"),
                t = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd oanimationend",
                    msAnimation: "MSAnimationEnd",
                    animation: "animationend",
                };
            for (var n in t)
                if (t.hasOwnProperty(n) && void 0 !== e.style[n]) return t[n];
            return !1;
        })(),
        R = function () {
            var e = w();
            (window.onkeydown = y.previousWindowKeyDown),
                y.previousActiveElement &&
                    y.previousActiveElement.focus &&
                    y.previousActiveElement.focus(),
                clearTimeout(e.timeout);
        },
        U = function () {
            var e = document.createElement("div");
            (e.style.width = "50px"),
                (e.style.height = "50px"),
                (e.style.overflow = "scroll"),
                document.body.appendChild(e);
            var t = e.offsetWidth - e.clientWidth;
            return document.body.removeChild(e), t;
        },
        z = function (e, t, n) {
            var o;
            return function () {
                var r = this,
                    i = arguments,
                    a = function () {
                        (o = null), n || e.apply(r, i);
                    },
                    l = n && !o;
                clearTimeout(o), (o = setTimeout(a, t)), l && e.apply(r, i);
            };
        },
        Q = v({}, d),
        Y = [],
        Z = function (e) {
            var t = w();
            for (var n in e)
                d.hasOwnProperty(n) ||
                    "extraParams" === n ||
                    console.warn('SweetAlert2: Unknown parameter "' + n + '"');
            (t.style.width =
                "number" == typeof e.width ? e.width + "px" : e.width),
                (t.style.padding = e.padding + "px"),
                (t.style.background = e.background);
            var o = t.querySelector("h2"),
                r = t.querySelector("." + c.content),
                a = E(),
                l = B(),
                s = t.querySelector("." + c.close);
            o.innerHTML = e.title.split("\n").join("<br>");
            var p;
            if (e.text || e.html) {
                if ("object" == typeof e.html)
                    if (((r.innerHTML = ""), 0 in e.html))
                        for (p = 0; p in e.html; p++)
                            r.appendChild(e.html[p].cloneNode(!0));
                    else r.appendChild(e.html.cloneNode(!0));
                else r.innerHTML = e.html || e.text.split("\n").join("<br>");
                H(r);
            } else O(r);
            e.showCloseButton ? H(s) : O(s),
                (t.className = c.modal),
                e.customClass && M(t, e.customClass);
            var f = S(),
                m = parseInt(
                    null === e.currentProgressStep
                        ? i.getQueueStep()
                        : e.currentProgressStep,
                    10
                );
            e.progressSteps.length
                ? (H(f),
                  N(f),
                  m >= e.progressSteps.length &&
                      console.warn(
                          "SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
                      ),
                  e.progressSteps.forEach(function (t, n) {
                      var o = document.createElement("li");
                      if (
                          (M(o, c.progresscircle),
                          (o.innerHTML = t),
                          n === m && M(o, c.activeprogressstep),
                          f.appendChild(o),
                          n !== e.progressSteps.length - 1)
                      ) {
                          var r = document.createElement("li");
                          M(r, c.progressline),
                              (r.style.width = e.progressStepsDistance),
                              f.appendChild(r);
                      }
                  }))
                : O(f);
            var v = C();
            for (p = 0; p < v.length; p++) O(v[p]);
            if (e.type) {
                var h = !1;
                for (var y in u)
                    if (e.type === y) {
                        h = !0;
                        break;
                    }
                if (!h)
                    return (
                        console.error(
                            "SweetAlert2: Unknown alert type: " + e.type
                        ),
                        !1
                    );
                var g = t.querySelector("." + c.icon + "." + u[e.type]);
                switch ((H(g), e.type)) {
                    case "success":
                        M(g, "animate"),
                            M(g.querySelector(".tip"), "animate-success-tip"),
                            M(g.querySelector(".long"), "animate-success-long");
                        break;
                    case "error":
                        M(g, "animate-error-icon"),
                            M(g.querySelector(".x-mark"), "animate-x-mark");
                        break;
                    case "warning":
                        M(g, "pulse-warning");
                }
            }
            var b = t.querySelector("." + c.image);
            e.imageUrl
                ? (b.setAttribute("src", e.imageUrl),
                  H(b),
                  e.imageWidth
                      ? b.setAttribute("width", e.imageWidth)
                      : b.removeAttribute("width"),
                  e.imageHeight
                      ? b.setAttribute("height", e.imageHeight)
                      : b.removeAttribute("height"),
                  (b.className = c.image),
                  e.imageClass && M(b, e.imageClass))
                : O(b),
                e.showCancelButton ? (l.style.display = "inline-block") : O(l),
                e.showConfirmButton ? I(a, "display") : O(a);
            var x = k();
            e.showConfirmButton || e.showCancelButton ? H(x) : O(x),
                (a.innerHTML = e.confirmButtonText),
                (l.innerHTML = e.cancelButtonText),
                e.buttonsStyling &&
                    ((a.style.backgroundColor = e.confirmButtonColor),
                    (l.style.backgroundColor = e.cancelButtonColor)),
                (a.className = c.confirm),
                M(a, e.confirmButtonClass),
                (l.className = c.cancel),
                M(l, e.cancelButtonClass),
                e.buttonsStyling
                    ? (M(a, c.styled), M(l, c.styled))
                    : (T(a, c.styled),
                      T(l, c.styled),
                      (a.style.backgroundColor =
                          a.style.borderLeftColor =
                          a.style.borderRightColor =
                              ""),
                      (l.style.backgroundColor =
                          l.style.borderLeftColor =
                          l.style.borderRightColor =
                              "")),
                e.animation === !0 ? T(t, c.noanimation) : M(t, c.noanimation);
        },
        F = function (t, o) {
            var r = w();
            t ? (M(r, c.show), M(a, c.fade), T(r, c.hide)) : T(r, c.fade),
                H(r),
                (a.style.overflowY = "hidden"),
                K && !q(r, c.noanimation)
                    ? r.addEventListener(K, function i() {
                          r.removeEventListener(K, i),
                              (a.style.overflowY = "auto");
                      })
                    : (a.style.overflowY = "auto"),
                M(a, c["in"]),
                M(document.body, c["in"]),
                e(),
                n(),
                (y.previousActiveElement = document.activeElement),
                null !== o && "function" == typeof o && o.call(this, r);
        };
    return (
        (i.isVisible = function () {
            var e = w();
            return j(e);
        }),
        (i.queue = function (e) {
            Y = e;
            var t = w(),
                n = function () {
                    (Y = []), t.removeAttribute("data-queue-step");
                },
                o = [];
            return new Promise(function (e, r) {
                !(function a(l, s) {
                    l < Y.length
                        ? (t.setAttribute("data-queue-step", l),
                          i(Y[l]).then(
                              function (e) {
                                  o.push(e), a(l + 1, s);
                              },
                              function (e) {
                                  n(), r(e);
                              }
                          ))
                        : (n(), e(o));
                })(0);
            });
        }),
        (i.getQueueStep = function () {
            return w().getAttribute("data-queue-step");
        }),
        (i.insertQueueStep = function (e, t) {
            return t && t < Y.length ? Y.splice(t, 0, e) : Y.push(e);
        }),
        (i.deleteQueueStep = function (e) {
            "undefined" != typeof Y[e] && Y.splice(e, 1);
        }),
        (i.close = i.closeModal =
            function (e) {
                var n = w();
                T(n, c.show), M(n, c.hide);
                var r = n.querySelector("." + c.icon + "." + u.success);
                T(r, "animate"),
                    T(r.querySelector(".tip"), "animate-success-tip"),
                    T(r.querySelector(".long"), "animate-success-long");
                var i = n.querySelector("." + c.icon + "." + u.error);
                T(i, "animate-error-icon"),
                    T(i.querySelector(".x-mark"), "animate-x-mark");
                var l = n.querySelector("." + c.icon + "." + u.warning);
                T(l, "pulse-warning"), R();
                var s = function () {
                    O(n),
                        (n.style.minHeight = ""),
                        T(a, c["in"]),
                        T(document.body, c["in"]),
                        t(),
                        o();
                };
                K && !q(n, c.noanimation)
                    ? n.addEventListener(K, function d() {
                          n.removeEventListener(K, d), q(n, c.hide) && s();
                      })
                    : s(),
                    null !== e && "function" == typeof e && e.call(this, n);
            }),
        (i.clickConfirm = function () {
            E().click();
        }),
        (i.clickCancel = function () {
            B().click();
        }),
        (i.setDefaults = function (e) {
            if (!e) throw new Error("userParams is required");
            if ("object" != typeof e)
                throw new Error("userParams has to be a object");
            v(Q, e);
        }),
        (i.resetDefaults = function () {
            Q = v({}, d);
        }),
        (i.noop = function () {}),
        (i.version = "5.3.8"),
        "function" == typeof Promise
            ? (Promise.prototype.done =
                  Promise.prototype.done ||
                  function () {
                      return this["catch"](function () {});
                  })
            : console.warn(
                  "SweetAlert2: Please inlude Promise polyfill BEFORE including sweetalert2.js if IE10+ support needed."
              ),
        i
    );
}),
    window.Sweetalert2 &&
        (window.sweetAlert = window.swal = window.Sweetalert2);
