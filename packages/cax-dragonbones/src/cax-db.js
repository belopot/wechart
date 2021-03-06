if (!window.egret) {
    var egret_strings = {
        4001: "Abstract class can not be instantiated!",
        4002: "Unnamed data!",
        4003: "Nonsupport version!"
    }
      , Event = function(t, i, e, a) {
        this.type = t,
        this.bubbles = i || !1,
        this.cancelable = e || !1,
        this.data = a
    }
      , EventDispatcher = function(t) {
        this._listenerDict = {}
    };
    EventDispatcher.prototype = {
        constructor: EventDispatcher,
        addEventListener: function(t, i, e, a, n, s) {
            this._listenerDict[t] || (this._listenerDict[t] = []),
            this._listenerDict[t].push({
                listener: i,
                thisObject: e,
                useCapture: a,
                priority: n,
                once: s
            })
        },
        once: function(t, i, e, a, n) {
            this.addEventListener(t, i, e, a, n, !0)
        },
        removeEventListener: function(t, i, e, a) {
            if (t)
                if (i) {
                    var n = this._listenerDict[t]
                      , s = n.indexOf(i);
                    s > -1 && n.splice(s, 1)
                } else
                    this._listenerDict[t] && (this._listenerDict[t].length = 0);
            else
                this._listenerDict = {}
        },
        hasEventListener: function(t) {
            return this._listenerDict[t]
        },
        dispatchEvent: function(t) {
            if (t && t.type && this._listenerDict[t.type])
                for (var i = this._listenerDict[t.type], e = i.slice(), a = 0; a < e.length; a++) {
                    var n = e[a];
                    if (n.dispatchOnce) {
                        var s = i.indexOf(n);
                        s > -1 && i.splice(s, 1)
                    }
                    n.listener && n.listener.call(n.thisObject || this, t)
                }
        },
        willTrigger: function(t) {
            return this.hasEventListener(t)
        }
    },
    window.egret = {
        getString: function(t) {
            return egret_strings[t] || "no string code"
        },
        Event: Event,
        EventDispatcher: EventDispatcher,
        registerClass: function(t, i, e) {
            var a = t.prototype;
            a.__class__ = i;
            var n = [i];
            e && (n = n.concat(e));
            var s = a.__types__;
            if (a.__types__)
                for (var r = s.length, o = 0; r > o; o++) {
                    var l = s[o];
                    -1 == n.indexOf(l) && n.push(l)
                }
            a.__types__ = n
        }
    }
}
window.__extends = window.__extends || function(t, i, e) {
    function a() {
        this.constructor = t
    }
    for (var n in i)
        i.hasOwnProperty(n) && (t[n] = i[n]);
    if (a.prototype = i.prototype,
    t.prototype = new a,
    e)
        for (var s in e)
            t.prototype[s] = e[s]
}
,
window.__define = window.__define || function(t, i, e, a) {
    Object.defineProperty(t, i, {
        configurable: !0,
        enumerable: !0,
        get: e,
        set: a
    })
}
;
var dragonBones;
!function(t) {
    var i = function() {
        function t() {}
        var i = (__define,
        t);
        i.prototype;
        return t.DATA_VERSION = "4.0",
        t.PARENT_COORDINATE_DATA_VERSION = "3.0",
        t.VERSION = "4.3.5",
        t
    }();
    t.DragonBones = i,
    egret.registerClass(i, "dragonBones.DragonBones")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i(t) {
            this._animationStateCount = 0,
            this._armature = t,
            this._animationList = [],
            this._animationStateList = [],
            this._timeScale = 1,
            this._isPlaying = !1,
            this.tweenEnabled = !0
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return n.dispose = function() {
            this._armature && (this._resetAnimationStateList(),
            this._animationList.length = 0,
            this._armature = null,
            this._animationDataList = null,
            this._animationList = null,
            this._animationStateList = null)
        }
        ,
        n._resetAnimationStateList = function() {
            for (var i, e = this._animationStateList.length; e--; )
                i = this._animationStateList[e],
                i._resetTimelineStateList(),
                t.AnimationState._returnObject(i);
            this._animationStateList.length = 0
        }
        ,
        n.gotoAndPlay = function(e, a, n, s, r, o, l, h, _) {
            if (void 0 === a && (a = -1),
            void 0 === n && (n = -1),
            void 0 === s && (s = NaN),
            void 0 === r && (r = 0),
            void 0 === o && (o = null),
            void 0 === l && (l = i.SAME_LAYER_AND_GROUP),
            void 0 === h && (h = !0),
            void 0 === _ && (_ = !0),
            !this._animationDataList)
                return null;
            for (var u, m = this._animationDataList.length; m--; )
                if (this._animationDataList[m].name == e) {
                    u = this._animationDataList[m];
                    break
                }
            if (!u)
                return null;
            var f = 0 == this._isPlaying;
            this._isPlaying = !0,
            this._isFading = !0,
            a = 0 > a ? u.fadeTime < 0 ? .3 : u.fadeTime : a;
            var d;
            d = 0 > n ? u.scale < 0 ? 1 : u.scale : 1e3 * n / u.duration,
            s = isNaN(s) ? u.playTimes : s;
            var c;
            switch (l) {
            case i.NONE:
                break;
            case i.SAME_LAYER:
                for (m = this._animationStateList.length; m--; )
                    c = this._animationStateList[m],
                    c.layer == r && c.fadeOut(a, h);
                break;
            case i.SAME_GROUP:
                for (m = this._animationStateList.length; m--; )
                    c = this._animationStateList[m],
                    c.group == o && c.fadeOut(a, h);
                break;
            case i.ALL:
                for (m = this._animationStateList.length; m--; )
                    c = this._animationStateList[m],
                    c.fadeOut(a, h);
                break;
            case i.SAME_LAYER_AND_GROUP:
            default:
                for (m = this._animationStateList.length; m--; )
                    c = this._animationStateList[m],
                    c.layer == r && c.group == o && c.fadeOut(a, h)
            }
            this._lastAnimationState = t.AnimationState._borrowObject(),
            this._lastAnimationState._layer = r,
            this._lastAnimationState._group = o,
            this._lastAnimationState.autoTween = this.tweenEnabled,
            this._lastAnimationState._fadeIn(this._armature, u, a, 1 / d, s, _),
            this.addState(this._lastAnimationState);
            var p = this._armature.getSlots(!1);
            for (m = p.length; m--; ) {
                var g = p[m];
                g.childArmature && g.childArmature.animation.gotoAndPlay(e, a)
            }
            return f && this._armature.advanceTime(0),
            this._lastAnimationState
        }
        ,
        n.gotoAndStop = function(t, e, a, n, s, r, o, l) {
            void 0 === a && (a = -1),
            void 0 === n && (n = 0),
            void 0 === s && (s = -1),
            void 0 === r && (r = 0),
            void 0 === o && (o = null),
            void 0 === l && (l = i.ALL);
            var h = this.getState(t, r);
            return h || (h = this.gotoAndPlay(t, n, s, NaN, r, o, l)),
            a >= 0 ? h.setCurrentTime(h.totalTime * a) : h.setCurrentTime(e),
            h.stop(),
            h
        }
        ,
        n.play = function() {
            this._animationDataList && 0 != this._animationDataList.length && (this._lastAnimationState ? this._isPlaying ? this.gotoAndPlay(this._lastAnimationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
        }
        ,
        n.stop = function() {
            this._isPlaying = !1
        }
        ,
        n.getState = function(t, i) {
            void 0 === i && (i = 0);
            for (var e = this._animationStateList.length; e--; ) {
                var a = this._animationStateList[e];
                if (a.name == t && a.layer == i)
                    return a
            }
            return null
        }
        ,
        n.hasAnimation = function(t) {
            for (var i = this._animationDataList.length; i--; )
                if (this._animationDataList[i].name == t)
                    return !0;
            return !1
        }
        ,
        n._advanceTime = function(t) {
            if (this._isPlaying) {
                var i = !1;
                t *= this._timeScale;
                for (var e = this._animationStateList.length; e--; ) {
                    var a = this._animationStateList[e];
                    a._advanceTime(t) ? this.removeState(a) : 1 != a.fadeState && (i = !0)
                }
                this._isFading = i
            }
        }
        ,
        n._updateAnimationStates = function() {
            for (var t = this._animationStateList.length; t--; )
                this._animationStateList[t]._updateTimelineStates()
        }
        ,
        n.addState = function(t) {
            this._animationStateList.indexOf(t) < 0 && (this._animationStateList.unshift(t),
            this._animationStateCount = this._animationStateList.length)
        }
        ,
        n.removeState = function(i) {
            var e = this._animationStateList.indexOf(i);
            e >= 0 && (this._animationStateList.splice(e, 1),
            t.AnimationState._returnObject(i),
            this._lastAnimationState == i && (this._animationStateList.length > 0 ? this._lastAnimationState = this._animationStateList[0] : this._lastAnimationState = null),
            this._animationStateCount = this._animationStateList.length)
        }
        ,
        e(n, "movementList", function() {
            return this._animationList
        }),
        e(n, "movementID", function() {
            return this.lastAnimationName
        }),
        e(n, "lastAnimationState", function() {
            return this._lastAnimationState
        }),
        e(n, "lastAnimationName", function() {
            return this._lastAnimationState ? this._lastAnimationState.name : null
        }),
        e(n, "animationList", function() {
            return this._animationList
        }),
        e(n, "isPlaying", function() {
            return this._isPlaying && !this.isComplete
        }),
        e(n, "isComplete", function() {
            if (this._lastAnimationState) {
                if (!this._lastAnimationState.isComplete)
                    return !1;
                for (var t = this._animationStateList.length; t--; )
                    if (!this._animationStateList[t].isComplete)
                        return !1;
                return !0
            }
            return !0
        }),
        e(n, "timeScale", function() {
            return this._timeScale
        }, function(t) {
            (isNaN(t) || 0 > t) && (t = 1),
            this._timeScale = t
        }),
        e(n, "animationDataList", function() {
            return this._animationDataList
        }, function(t) {
            this._animationDataList = t,
            this._animationList.length = 0;
            for (var i = 0, e = this._animationDataList.length; e > i; i++) {
                var a = this._animationDataList[i];
                this._animationList[this._animationList.length] = a.name
            }
        }),
        i.NONE = "none",
        i.SAME_LAYER = "sameLayer",
        i.SAME_GROUP = "sameGroup",
        i.SAME_LAYER_AND_GROUP = "sameLayerAndGroup",
        i.ALL = "all",
        i
    }();
    t.Animation = i,
    egret.registerClass(i, "dragonBones.Animation")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._layer = 0,
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._currentPlayTimes = 0,
            this._totalTime = 0,
            this._currentTime = 0,
            this._lastTime = 0,
            this._fadeState = 0,
            this._playTimes = 0,
            this._timelineStateList = [],
            this._slotTimelineStateList = [],
            this._boneMasks = []
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return i._borrowObject = function() {
            return 0 == i._pool.length ? new i : i._pool.pop()
        }
        ,
        i._returnObject = function(t) {
            t.clear(),
            i._pool.indexOf(t) < 0 && (i._pool[i._pool.length] = t)
        }
        ,
        i._clear = function() {
            for (var e = i._pool.length; e--; )
                i._pool[e].clear();
            i._pool.length = 0,
            t.TimelineState._clear()
        }
        ,
        n.clear = function() {
            this._resetTimelineStateList(),
            this._boneMasks.length = 0,
            this._armature = null,
            this._clip = null
        }
        ,
        n._resetTimelineStateList = function() {
            for (var i = this._timelineStateList.length; i--; )
                t.TimelineState._returnObject(this._timelineStateList[i]);
            for (this._timelineStateList.length = 0,
            i = this._slotTimelineStateList.length; i--; )
                t.SlotTimelineState._returnObject(this._slotTimelineStateList[i]);
            this._slotTimelineStateList.length = 0
        }
        ,
        n.containsBoneMask = function(t) {
            return 0 == this._boneMasks.length || this._boneMasks.indexOf(t) >= 0
        }
        ,
        n.addBoneMask = function(t, i) {
            if (void 0 === i && (i = !0),
            this.addBoneToBoneMask(t),
            i) {
                var e = this._armature.getBone(t);
                if (e)
                    for (var a = this._armature.getBones(!1), n = a.length; n--; ) {
                        var s = a[n];
                        e.contains(s) && this.addBoneToBoneMask(s.name)
                    }
            }
            return this._updateTimelineStates(),
            this
        }
        ,
        n.removeBoneMask = function(t, i) {
            if (void 0 === i && (i = !0),
            this.removeBoneFromBoneMask(t),
            i) {
                var e = this._armature.getBone(t);
                if (e)
                    for (var a = this._armature.getBones(!1), n = a.length; n--; ) {
                        var s = a[n];
                        e.contains(s) && this.removeBoneFromBoneMask(s.name)
                    }
            }
            return this._updateTimelineStates(),
            this
        }
        ,
        n.removeAllMixingTransform = function() {
            return this._boneMasks.length = 0,
            this._updateTimelineStates(),
            this
        }
        ,
        n.addBoneToBoneMask = function(t) {
            this._clip.getTimeline(t) && this._boneMasks.indexOf(t) < 0 && this._boneMasks.push(t)
        }
        ,
        n.removeBoneFromBoneMask = function(t) {
            var i = this._boneMasks.indexOf(t);
            i >= 0 && this._boneMasks.splice(i, 1)
        }
        ,
        n._updateTimelineStates = function() {
            for (var t, i, e, a = this._timelineStateList.length; a--; )
                t = this._timelineStateList[a],
                this._armature.getBone(t.name) || this.removeTimelineState(t);
            for (a = this._slotTimelineStateList.length; a--; )
                i = this._slotTimelineStateList[a],
                this._armature.getSlot(i.name) || this.removeSlotTimelineState(i);
            if (this._boneMasks.length > 0) {
                for (a = this._timelineStateList.length; a--; )
                    t = this._timelineStateList[a],
                    this._boneMasks.indexOf(t.name) < 0 && this.removeTimelineState(t);
                for (a = 0,
                e = this._boneMasks.length; e > a; a++) {
                    var n = this._boneMasks[a];
                    this.addTimelineState(n)
                }
            } else
                for (a = 0,
                e = this._clip.timelineList.length; e > a; a++) {
                    var s = this._clip.timelineList[a];
                    this.addTimelineState(s.name)
                }
            for (a = 0,
            e = this._clip.slotTimelineList.length; e > a; a++) {
                var r = this._clip.slotTimelineList[a];
                this.addSlotTimelineState(r.name)
            }
        }
        ,
        n.addTimelineState = function(i) {
            var e = this._armature.getBone(i);
            if (e) {
                for (var a = 0, n = this._timelineStateList.length; n > a; a++) {
                    var s = this._timelineStateList[a];
                    if (s.name == i)
                        return
                }
                var r = t.TimelineState._borrowObject();
                r._fadeIn(e, this, this._clip.getTimeline(i)),
                this._timelineStateList.push(r)
            }
        }
        ,
        n.removeTimelineState = function(i) {
            var e = this._timelineStateList.indexOf(i);
            this._timelineStateList.splice(e, 1),
            t.TimelineState._returnObject(i)
        }
        ,
        n.addSlotTimelineState = function(i) {
            var e = this._armature.getSlot(i);
            if (e) {
                for (var a = 0, n = this._slotTimelineStateList.length; n > a; a++) {
                    var s = this._slotTimelineStateList[a];
                    if (s.name == i)
                        return
                }
                var r = t.SlotTimelineState._borrowObject();
                r._fadeIn(e, this, this._clip.getSlotTimeline(i)),
                this._slotTimelineStateList.push(r)
            }
        }
        ,
        n.removeSlotTimelineState = function(i) {
            var e = this._slotTimelineStateList.indexOf(i);
            this._slotTimelineStateList.splice(e, 1),
            t.SlotTimelineState._returnObject(i)
        }
        ,
        n.play = function() {
            return this._isPlaying = !0,
            this
        }
        ,
        n.stop = function() {
            return this._isPlaying = !1,
            this
        }
        ,
        n._fadeIn = function(t, i, e, a, n, s) {
            return this._armature = t,
            this._clip = i,
            this._pausePlayheadInFade = s,
            this._name = this._clip.name,
            this._totalTime = this._clip.duration,
            this.autoTween = this._clip.autoTween,
            this.setTimeScale(a),
            this.setPlayTimes(n),
            this._isComplete = !1,
            this._currentFrameIndex = -1,
            this._currentPlayTimes = -1,
            Math.round(this._totalTime * this._clip.frameRate * .001) < 2 || a == 1 / 0 ? this._currentTime = this._totalTime : this._currentTime = -1,
            this._time = 0,
            this._boneMasks.length = 0,
            this._isFadeOut = !1,
            this._fadeWeight = 0,
            this._fadeTotalWeight = 1,
            this._fadeState = -1,
            this._fadeCurrentTime = 0,
            this._fadeBeginTime = this._fadeCurrentTime,
            this._fadeTotalTime = e * this._timeScale,
            this._isPlaying = !0,
            this.displayControl = !0,
            this.lastFrameAutoTween = !0,
            this.additiveBlending = !1,
            this.weight = 1,
            this.fadeOutTime = e,
            this._updateTimelineStates(),
            this
        }
        ,
        n.fadeOut = function(t, i) {
            if (!this._armature)
                return null;
            if ((isNaN(t) || 0 > t) && (t = 0),
            this._pausePlayheadInFade = i,
            this._isFadeOut) {
                if (t > this._fadeTotalTime / this._timeScale - (this._fadeCurrentTime - this._fadeBeginTime))
                    return this
            } else
                for (var e = 0, a = this._timelineStateList.length; a > e; e++) {
                    var n = this._timelineStateList[e];
                    n._fadeOut()
                }
            return this._isFadeOut = !0,
            this._fadeTotalWeight = this._fadeWeight,
            this._fadeState = -1,
            this._fadeBeginTime = this._fadeCurrentTime,
            this._fadeTotalTime = this._fadeTotalWeight >= 0 ? t * this._timeScale : 0,
            this.displayControl = !1,
            this
        }
        ,
        n._advanceTime = function(t) {
            return t *= this._timeScale,
            this.advanceFadeTime(t),
            this._fadeWeight && this.advanceTimelinesTime(t),
            this._isFadeOut && 1 == this._fadeState
        }
        ,
        n.advanceFadeTime = function(i) {
            var e = !1
              , a = !1;
            if (this._fadeBeginTime >= 0) {
                var n = this._fadeState;
                this._fadeCurrentTime += 0 > i ? -i : i,
                this._fadeCurrentTime >= this._fadeBeginTime + this._fadeTotalTime ? ((1 == this._fadeWeight || 0 == this._fadeWeight) && (n = 1,
                this._pausePlayheadInFade && (this._pausePlayheadInFade = !1,
                this._currentTime = -1)),
                this._fadeWeight = this._isFadeOut ? 0 : 1) : this._fadeCurrentTime >= this._fadeBeginTime ? (n = 0,
                this._fadeWeight = (this._fadeCurrentTime - this._fadeBeginTime) / this._fadeTotalTime * this._fadeTotalWeight,
                this._isFadeOut && (this._fadeWeight = this._fadeTotalWeight - this._fadeWeight)) : (n = -1,
                this._fadeWeight = this._isFadeOut ? 1 : 0),
                this._fadeState != n && (-1 == this._fadeState && (e = !0),
                1 == n && (a = !0),
                this._fadeState = n)
            }
            var s;
            e && (this._isFadeOut ? this._armature.hasEventListener(t.AnimationEvent.FADE_OUT) && (s = new t.AnimationEvent(t.AnimationEvent.FADE_OUT),
            s.animationState = this,
            this._armature._eventList.push(s)) : (this.hideBones(),
            this._armature.hasEventListener(t.AnimationEvent.FADE_IN) && (s = new t.AnimationEvent(t.AnimationEvent.FADE_IN),
            s.animationState = this,
            this._armature._eventList.push(s)))),
            a && (this._isFadeOut ? this._armature.hasEventListener(t.AnimationEvent.FADE_OUT_COMPLETE) && (s = new t.AnimationEvent(t.AnimationEvent.FADE_OUT_COMPLETE),
            s.animationState = this,
            this._armature._eventList.push(s)) : this._armature.hasEventListener(t.AnimationEvent.FADE_IN_COMPLETE) && (s = new t.AnimationEvent(t.AnimationEvent.FADE_IN_COMPLETE),
            s.animationState = this,
            this._armature._eventList.push(s)))
        }
        ,
        n.advanceTimelinesTime = function(i) {
            this._isPlaying && !this._pausePlayheadInFade && (this._time += i);
            var e = !1
              , a = !1
              , n = !1
              , s = !1
              , r = 0
              , o = 1e3 * this._time;
            if (0 == this._playTimes)
                s = !1,
                r = Math.ceil(Math.abs(o) / this._totalTime) || 1,
                o -= o >= 0 ? Math.floor(o / this._totalTime) * this._totalTime : Math.ceil(o / this._totalTime) * this._totalTime,
                0 > o && (o += this._totalTime);
            else {
                var l = this._playTimes * this._totalTime;
                o >= l ? (o = l,
                s = !0) : -l >= o ? (o = -l,
                s = !0) : s = !1,
                0 > o && (o += l),
                r = Math.ceil(o / this._totalTime) || 1,
                o -= o >= 0 ? Math.floor(o / this._totalTime) * this._totalTime : Math.ceil(o / this._totalTime) * this._totalTime,
                s && (o = this._totalTime)
            }
            this._isComplete = s;
            var h = 1e3 * this._time / this._totalTime
              , _ = 0
              , u = 0;
            for (_ = 0,
            u = this._timelineStateList.length; u > _; _++) {
                var m = this._timelineStateList[_];
                m._update(h),
                this._isComplete = m._isComplete && this._isComplete
            }
            for (_ = 0,
            u = this._slotTimelineStateList.length; u > _; _++) {
                var f = this._slotTimelineStateList[_];
                f._update(h),
                this._isComplete = m._isComplete && this._isComplete
            }
            this._currentTime != o && (this._currentPlayTimes != r && (this._currentPlayTimes > 0 && r > 1 && (n = !0),
            this._currentPlayTimes = r),
            this._currentTime < 0 && (e = !0),
            this._isComplete && (a = !0),
            this._lastTime = this._currentTime,
            this._currentTime = o,
            this.updateMainTimeline(s));
            var d;
            e && this._armature.hasEventListener(t.AnimationEvent.START) && (d = new t.AnimationEvent(t.AnimationEvent.START),
            d.animationState = this,
            this._armature._eventList.push(d)),
            a ? (this._armature.hasEventListener(t.AnimationEvent.COMPLETE) && (d = new t.AnimationEvent(t.AnimationEvent.COMPLETE),
            d.animationState = this,
            this._armature._eventList.push(d)),
            this.autoFadeOut && this.fadeOut(this.fadeOutTime, !0)) : n && this._armature.hasEventListener(t.AnimationEvent.LOOP_COMPLETE) && (d = new t.AnimationEvent(t.AnimationEvent.LOOP_COMPLETE),
            d.animationState = this,
            this._armature._eventList.push(d))
        }
        ,
        n.updateMainTimeline = function(t) {
            var i = this._clip.frameList;
            if (i.length > 0) {
                for (var e, a, n = 0, s = this._clip.frameList.length; s > n; ++n) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime))
                            break;
                        if (this._currentFrameIndex++,
                        this._lastTime = this._currentTime,
                        this._currentFrameIndex >= i.length) {
                            if (t) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    a = i[this._currentFrameIndex],
                    e && this._armature._arriveAtFrame(e, null, this, !0),
                    this._currentFrameDuration = a.duration,
                    this._currentFramePosition = a.position,
                    e = a
                }
                a && this._armature._arriveAtFrame(a, null, this, !1)
            }
        }
        ,
        n.hideBones = function() {
            for (var t = 0, i = this._clip.hideTimelineNameMap.length; i > t; t++) {
                var e = this._clip.hideTimelineNameMap[t]
                  , a = this._armature.getBone(e);
                a && a._hideSlots()
            }
            var n;
            for (t = 0,
            i = this._clip.hideSlotTimelineNameMap.length; i > t; t++) {
                n = this._clip.hideSlotTimelineNameMap[t];
                var s = this._armature.getSlot(n);
                s && s._resetToOrigin()
            }
        }
        ,
        n.setAdditiveBlending = function(t) {
            return this.additiveBlending = t,
            this
        }
        ,
        n.setAutoFadeOut = function(t, i) {
            return void 0 === i && (i = -1),
            this.autoFadeOut = t,
            i >= 0 && (this.fadeOutTime = i * this._timeScale),
            this
        }
        ,
        n.setWeight = function(t) {
            return (isNaN(t) || 0 > t) && (t = 1),
            this.weight = t,
            this
        }
        ,
        n.setFrameTween = function(t, i) {
            return this.autoTween = t,
            this.lastFrameAutoTween = i,
            this
        }
        ,
        n.setCurrentTime = function(t) {
            return (0 > t || isNaN(t)) && (t = 0),
            this._time = t,
            this._currentTime = 1e3 * this._time,
            this
        }
        ,
        n.setTimeScale = function(t) {
            return (isNaN(t) || t == 1 / 0) && (t = 1),
            this._timeScale = t,
            this
        }
        ,
        n.setPlayTimes = function(t) {
            return void 0 === t && (t = 0),
            Math.round(.001 * this._totalTime * this._clip.frameRate) < 2 ? this._playTimes = 0 > t ? -1 : 1 : this._playTimes = 0 > t ? -t : t,
            this.autoFadeOut = 0 > t ? !0 : !1,
            this
        }
        ,
        e(n, "name", function() {
            return this._name
        }),
        e(n, "layer", function() {
            return this._layer
        }),
        e(n, "group", function() {
            return this._group
        }),
        e(n, "clip", function() {
            return this._clip
        }),
        e(n, "isComplete", function() {
            return this._isComplete
        }),
        e(n, "isPlaying", function() {
            return this._isPlaying && !this._isComplete
        }),
        e(n, "currentPlayTimes", function() {
            return this._currentPlayTimes < 0 ? 0 : this._currentPlayTimes
        }),
        e(n, "totalTime", function() {
            return .001 * this._totalTime
        }),
        e(n, "currentTime", function() {
            return this._currentTime < 0 ? 0 : .001 * this._currentTime
        }),
        e(n, "fadeWeight", function() {
            return this._fadeWeight
        }),
        e(n, "fadeState", function() {
            return this._fadeState
        }),
        e(n, "fadeTotalTime", function() {
            return this._fadeTotalTime
        }),
        e(n, "timeScale", function() {
            return this._timeScale
        }),
        e(n, "playTimes", function() {
            return this._playTimes
        }),
        i._pool = [],
        i
    }();
    t.AnimationState = i,
    egret.registerClass(i, "dragonBones.AnimationState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._totalTime = 0,
            this._currentTime = 0,
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._updateMode = 0,
            this._durationColor = new t.ColorTransform
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i._borrowObject = function() {
            return 0 == i._pool.length ? new i : i._pool.pop()
        }
        ,
        i._returnObject = function(t) {
            i._pool.indexOf(t) < 0 && (i._pool[i._pool.length] = t),
            t.clear()
        }
        ,
        i._clear = function() {
            for (var t = i._pool.length; t--; )
                i._pool[t].clear();
            i._pool.length = 0
        }
        ,
        a.clear = function() {
            this._slot && (this._slot._removeState(this),
            this._slot = null),
            this._armature = null,
            this._animation = null,
            this._animationState = null,
            this._timelineData = null
        }
        ,
        a._fadeIn = function(t, i, e) {
            switch (this._slot = t,
            this._armature = this._slot.armature,
            this._animation = this._armature.animation,
            this._animationState = i,
            this._timelineData = e,
            this.name = e.name,
            this._totalTime = this._timelineData.duration,
            this._rawAnimationScale = this._animationState.clip.scale,
            this._isComplete = !1,
            this._blendEnabled = !1,
            this._tweenColor = !1,
            this._currentFrameIndex = -1,
            this._currentTime = -1,
            this._tweenEasing = NaN,
            this._weight = 1,
            this._timelineData.frameList.length) {
            case 0:
                this._updateMode = 0;
                break;
            case 1:
                this._updateMode = 1;
                break;
            default:
                this._updateMode = -1
            }
            this._slot._addState(this)
        }
        ,
        a._fadeOut = function() {}
        ,
        a._update = function(t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0,
            this.updateSingleFrame())
        }
        ,
        a.updateMultipleFrame = function(t) {
            var i = 0;
            t /= this._timelineData.scale,
            t += this._timelineData.offset;
            var e = this._totalTime * t
              , a = this._animationState.playTimes;
            if (0 == a)
                this._isComplete = !1,
                i = Math.ceil(Math.abs(e) / this._totalTime) || 1,
                e -= e >= 0 ? Math.floor(e / this._totalTime) * this._totalTime : Math.ceil(e / this._totalTime) * this._totalTime,
                0 > e && (e += this._totalTime);
            else {
                var n = a * this._totalTime;
                e >= n ? (e = n,
                this._isComplete = !0) : -n >= e ? (e = -n,
                this._isComplete = !0) : this._isComplete = !1,
                0 > e && (e += n),
                i = Math.ceil(e / this._totalTime) || 1,
                this._isComplete ? e = this._totalTime : e -= e >= 0 ? Math.floor(e / this._totalTime) * this._totalTime : Math.ceil(e / this._totalTime) * this._totalTime
            }
            if (this._currentTime != e) {
                this._currentTime = e;
                for (var s, r, o = this._timelineData.frameList, l = 0, h = this._timelineData.frameList.length; h > l; ++l) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration))
                            break;
                        if (this._currentFrameIndex++,
                        this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex],
                    s && this._slot._arriveAtFrame(s, this, this._animationState, !0),
                    this._currentFrameDuration = r.duration,
                    this._currentFramePosition = r.position,
                    s = r
                }
                r && (this._slot._arriveAtFrame(r, this, this._animationState, !1),
                this._blendEnabled = r.displayIndex >= 0,
                this._blendEnabled ? this.updateToNextFrame(i) : (this._tweenEasing = NaN,
                this._tweenColor = !1)),
                this._blendEnabled && this.updateTween()
            }
        }
        ,
        a.updateToNextFrame = function(t) {
            void 0 === t && (t = 0);
            var i = this._currentFrameIndex + 1;
            i >= this._timelineData.frameList.length && (i = 0);
            var e = this._timelineData.frameList[this._currentFrameIndex]
              , a = this._timelineData.frameList[i]
              , n = !1;
            0 == i && (!this._animationState.lastFrameAutoTween || this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + t - this._timelineData.offset) * this._timelineData.scale > .999999) ? (this._tweenEasing = NaN,
            n = !1) : e.displayIndex < 0 || a.displayIndex < 0 ? (this._tweenEasing = NaN,
            n = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.clip.tweenEasing,
            isNaN(this._tweenEasing) ? (this._tweenEasing = e.tweenEasing,
            this._tweenCurve = e.curve,
            isNaN(this._tweenEasing) && null == this._tweenCurve ? n = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0),
            n = !0)) : n = !0) : (this._tweenEasing = e.tweenEasing,
            this._tweenCurve = e.curve,
            !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? n = !0 : (this._tweenEasing = NaN,
            n = !1)),
            n ? e.color && a.color ? (this._durationColor.alphaOffset = a.color.alphaOffset - e.color.alphaOffset,
            this._durationColor.redOffset = a.color.redOffset - e.color.redOffset,
            this._durationColor.greenOffset = a.color.greenOffset - e.color.greenOffset,
            this._durationColor.blueOffset = a.color.blueOffset - e.color.blueOffset,
            this._durationColor.alphaMultiplier = a.color.alphaMultiplier - e.color.alphaMultiplier,
            this._durationColor.redMultiplier = a.color.redMultiplier - e.color.redMultiplier,
            this._durationColor.greenMultiplier = a.color.greenMultiplier - e.color.greenMultiplier,
            this._durationColor.blueMultiplier = a.color.blueMultiplier - e.color.blueMultiplier,
            this._durationColor.alphaOffset || this._durationColor.redOffset || this._durationColor.greenOffset || this._durationColor.blueOffset || this._durationColor.alphaMultiplier || this._durationColor.redMultiplier || this._durationColor.greenMultiplier || this._durationColor.blueMultiplier ? this._tweenColor = !0 : this._tweenColor = !1) : e.color ? (this._tweenColor = !0,
            this._durationColor.alphaOffset = -e.color.alphaOffset,
            this._durationColor.redOffset = -e.color.redOffset,
            this._durationColor.greenOffset = -e.color.greenOffset,
            this._durationColor.blueOffset = -e.color.blueOffset,
            this._durationColor.alphaMultiplier = 1 - e.color.alphaMultiplier,
            this._durationColor.redMultiplier = 1 - e.color.redMultiplier,
            this._durationColor.greenMultiplier = 1 - e.color.greenMultiplier,
            this._durationColor.blueMultiplier = 1 - e.color.blueMultiplier) : a.color ? (this._tweenColor = !0,
            this._durationColor.alphaOffset = a.color.alphaOffset,
            this._durationColor.redOffset = a.color.redOffset,
            this._durationColor.greenOffset = a.color.greenOffset,
            this._durationColor.blueOffset = a.color.blueOffset,
            this._durationColor.alphaMultiplier = a.color.alphaMultiplier - 1,
            this._durationColor.redMultiplier = a.color.redMultiplier - 1,
            this._durationColor.greenMultiplier = a.color.greenMultiplier - 1,
            this._durationColor.blueMultiplier = a.color.blueMultiplier - 1) : this._tweenColor = !1 : this._tweenColor = !1,
            !this._tweenColor && this._animationState.displayControl && (e.color ? this._slot._updateDisplayColor(e.color.alphaOffset, e.color.redOffset, e.color.greenOffset, e.color.blueOffset, e.color.alphaMultiplier, e.color.redMultiplier, e.color.greenMultiplier, e.color.blueMultiplier, !0) : this._slot._isColorChanged && this._slot._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !1))
        }
        ,
        a.updateTween = function() {
            var i = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenColor && this._animationState.displayControl) {
                var e = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? e = this._tweenCurve.getValueByProgress(e) : this._tweenEasing && (e = t.MathUtil.getEaseValue(e, this._tweenEasing)),
                i.color ? this._slot._updateDisplayColor(i.color.alphaOffset + this._durationColor.alphaOffset * e, i.color.redOffset + this._durationColor.redOffset * e, i.color.greenOffset + this._durationColor.greenOffset * e, i.color.blueOffset + this._durationColor.blueOffset * e, i.color.alphaMultiplier + this._durationColor.alphaMultiplier * e, i.color.redMultiplier + this._durationColor.redMultiplier * e, i.color.greenMultiplier + this._durationColor.greenMultiplier * e, i.color.blueMultiplier + this._durationColor.blueMultiplier * e, !0) : this._slot._updateDisplayColor(this._durationColor.alphaOffset * e, this._durationColor.redOffset * e, this._durationColor.greenOffset * e, this._durationColor.blueOffset * e, 1 + this._durationColor.alphaMultiplier * e, 1 + this._durationColor.redMultiplier * e, 1 + this._durationColor.greenMultiplier * e, 1 + this._durationColor.blueMultiplier * e, !0)
            }
        }
        ,
        a.updateSingleFrame = function() {
            var t = this._timelineData.frameList[0];
            this._slot._arriveAtFrame(t, this, this._animationState, !1),
            this._isComplete = !0,
            this._tweenEasing = NaN,
            this._tweenColor = !1,
            this._blendEnabled = t.displayIndex >= 0,
            this._blendEnabled && this._animationState.displayControl && (t.color ? this._slot._updateDisplayColor(t.color.alphaOffset, t.color.redOffset, t.color.greenOffset, t.color.blueOffset, t.color.alphaMultiplier, t.color.redMultiplier, t.color.greenMultiplier, t.color.blueMultiplier, !0) : this._slot._isColorChanged && this._slot._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !1))
        }
        ,
        i.HALF_PI = .5 * Math.PI,
        i.DOUBLE_PI = 2 * Math.PI,
        i._pool = [],
        i
    }();
    t.SlotTimelineState = i,
    egret.registerClass(i, "dragonBones.SlotTimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._totalTime = 0,
            this._currentTime = 0,
            this._lastTime = 0,
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._updateMode = 0,
            this._transform = new t.DBTransform,
            this._pivot = new t.Point,
            this._durationTransform = new t.DBTransform,
            this._durationPivot = new t.Point,
            this._durationColor = new t.ColorTransform
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i._borrowObject = function() {
            return 0 == i._pool.length ? new i : i._pool.pop()
        }
        ,
        i._returnObject = function(t) {
            i._pool.indexOf(t) < 0 && (i._pool[i._pool.length] = t),
            t.clear()
        }
        ,
        i._clear = function() {
            for (var t = i._pool.length; t--; )
                i._pool[t].clear();
            i._pool.length = 0
        }
        ,
        a.clear = function() {
            this._bone && (this._bone._removeState(this),
            this._bone = null),
            this._armature = null,
            this._animation = null,
            this._animationState = null,
            this._timelineData = null,
            this._originTransform = null,
            this._originPivot = null
        }
        ,
        a._fadeIn = function(t, i, e) {
            switch (this._bone = t,
            this._armature = this._bone.armature,
            this._animation = this._armature.animation,
            this._animationState = i,
            this._timelineData = e,
            this._originTransform = this._timelineData.originTransform,
            this._originPivot = this._timelineData.originPivot,
            this.name = e.name,
            this._totalTime = this._timelineData.duration,
            this._rawAnimationScale = this._animationState.clip.scale,
            this._isComplete = !1,
            this._tweenTransform = !1,
            this._tweenScale = !1,
            this._currentFrameIndex = -1,
            this._currentTime = -1,
            this._tweenEasing = NaN,
            this._weight = 1,
            this._transform.x = 0,
            this._transform.y = 0,
            this._transform.scaleX = 1,
            this._transform.scaleY = 1,
            this._transform.skewX = 0,
            this._transform.skewY = 0,
            this._pivot.x = 0,
            this._pivot.y = 0,
            this._durationTransform.x = 0,
            this._durationTransform.y = 0,
            this._durationTransform.scaleX = 1,
            this._durationTransform.scaleY = 1,
            this._durationTransform.skewX = 0,
            this._durationTransform.skewY = 0,
            this._durationPivot.x = 0,
            this._durationPivot.y = 0,
            this._timelineData.frameList.length) {
            case 0:
                this._updateMode = 0;
                break;
            case 1:
                this._updateMode = 1;
                break;
            default:
                this._updateMode = -1
            }
            this._bone._addState(this)
        }
        ,
        a._fadeOut = function() {
            this._transform.skewX = t.TransformUtil.formatRadian(this._transform.skewX),
            this._transform.skewY = t.TransformUtil.formatRadian(this._transform.skewY)
        }
        ,
        a._update = function(t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0,
            this.updateSingleFrame())
        }
        ,
        a.updateMultipleFrame = function(t) {
            var i = 0;
            t /= this._timelineData.scale,
            t += this._timelineData.offset;
            var e = this._totalTime * t
              , a = this._animationState.playTimes;
            if (0 == a)
                this._isComplete = !1,
                i = Math.ceil(Math.abs(e) / this._totalTime) || 1,
                e -= e >= 0 ? Math.floor(e / this._totalTime) * this._totalTime : Math.ceil(e / this._totalTime) * this._totalTime,
                0 > e && (e += this._totalTime);
            else {
                var n = a * this._totalTime;
                e >= n ? (e = n,
                this._isComplete = !0) : -n >= e ? (e = -n,
                this._isComplete = !0) : this._isComplete = !1,
                0 > e && (e += n),
                i = Math.ceil(e / this._totalTime) || 1,
                this._isComplete ? e = this._totalTime : e -= e >= 0 ? Math.floor(e / this._totalTime) * this._totalTime : Math.ceil(e / this._totalTime) * this._totalTime
            }
            if (this._currentTime != e) {
                this._lastTime = this._currentTime,
                this._currentTime = e;
                for (var s, r, o = this._timelineData.frameList, l = 0, h = this._timelineData.frameList.length; h > l; ++l) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime))
                            break;
                        if (this._currentFrameIndex++,
                        this._lastTime = this._currentTime,
                        this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex],
                    s && this._bone._arriveAtFrame(s, this, this._animationState, !0),
                    this._currentFrameDuration = r.duration,
                    this._currentFramePosition = r.position,
                    s = r
                }
                r && (this._bone._arriveAtFrame(r, this, this._animationState, !1),
                this.updateToNextFrame(i)),
                this.updateTween()
            }
        }
        ,
        a.updateToNextFrame = function(i) {
            void 0 === i && (i = 0);
            var e = this._currentFrameIndex + 1;
            e >= this._timelineData.frameList.length && (e = 0);
            var a = this._timelineData.frameList[this._currentFrameIndex]
              , n = this._timelineData.frameList[e]
              , s = !1;
            0 == e && (!this._animationState.lastFrameAutoTween || this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + i - this._timelineData.offset) * this._timelineData.scale > .999999) ? (this._tweenEasing = NaN,
            s = !1) : a.displayIndex < 0 || n.displayIndex < 0 ? (this._tweenEasing = NaN,
            s = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.clip.tweenEasing,
            isNaN(this._tweenEasing) ? (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            isNaN(this._tweenEasing) && null == this._tweenCurve ? s = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0),
            s = !0)) : s = !0) : (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? s = !0 : (this._tweenEasing = NaN,
            s = !1)),
            s ? (this._durationTransform.x = n.transform.x - a.transform.x,
            this._durationTransform.y = n.transform.y - a.transform.y,
            this._durationTransform.skewX = n.transform.skewX - a.transform.skewX,
            this._durationTransform.skewY = n.transform.skewY - a.transform.skewY,
            this._durationTransform.scaleX = n.transform.scaleX - a.transform.scaleX + n.scaleOffset.x,
            this._durationTransform.scaleY = n.transform.scaleY - a.transform.scaleY + n.scaleOffset.y,
            this._durationTransform.normalizeRotation(),
            0 == e && (this._durationTransform.skewX = t.TransformUtil.formatRadian(this._durationTransform.skewX),
            this._durationTransform.skewY = t.TransformUtil.formatRadian(this._durationTransform.skewY)),
            this._durationPivot.x = n.pivot.x - a.pivot.x,
            this._durationPivot.y = n.pivot.y - a.pivot.y,
            this._durationTransform.x || this._durationTransform.y || this._durationTransform.skewX || this._durationTransform.skewY || this._durationTransform.scaleX || this._durationTransform.scaleY || this._durationPivot.x || this._durationPivot.y ? (this._tweenTransform = !0,
            this._tweenScale = a.tweenScale) : (this._tweenTransform = !1,
            this._tweenScale = !1)) : (this._tweenTransform = !1,
            this._tweenScale = !1),
            this._tweenTransform ? this._tweenScale || (this._animationState.additiveBlending ? (this._transform.scaleX = a.transform.scaleX,
            this._transform.scaleY = a.transform.scaleY) : (this._transform.scaleX = this._originTransform.scaleX * a.transform.scaleX,
            this._transform.scaleY = this._originTransform.scaleY * a.transform.scaleY)) : (this._animationState.additiveBlending ? (this._transform.x = a.transform.x,
            this._transform.y = a.transform.y,
            this._transform.skewX = a.transform.skewX,
            this._transform.skewY = a.transform.skewY,
            this._transform.scaleX = a.transform.scaleX,
            this._transform.scaleY = a.transform.scaleY,
            this._pivot.x = a.pivot.x,
            this._pivot.y = a.pivot.y) : (this._transform.x = this._originTransform.x + a.transform.x,
            this._transform.y = this._originTransform.y + a.transform.y,
            this._transform.skewX = this._originTransform.skewX + a.transform.skewX,
            this._transform.skewY = this._originTransform.skewY + a.transform.skewY,
            this._transform.scaleX = this._originTransform.scaleX * a.transform.scaleX,
            this._transform.scaleY = this._originTransform.scaleY * a.transform.scaleY,
            this._pivot.x = this._originPivot.x + a.pivot.x,
            this._pivot.y = this._originPivot.y + a.pivot.y),
            this._bone.invalidUpdate())
        }
        ,
        a.updateTween = function() {
            var i = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenTransform) {
                var e = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? e = this._tweenCurve.getValueByProgress(e) : this._tweenEasing && (e = t.MathUtil.getEaseValue(e, this._tweenEasing));
                var a = i.transform
                  , n = i.pivot;
                this._animationState.additiveBlending ? (this._transform.x = a.x + this._durationTransform.x * e,
                this._transform.y = a.y + this._durationTransform.y * e,
                this._transform.skewX = a.skewX + this._durationTransform.skewX * e,
                this._transform.skewY = a.skewY + this._durationTransform.skewY * e,
                this._tweenScale && (this._transform.scaleX = a.scaleX + this._durationTransform.scaleX * e,
                this._transform.scaleY = a.scaleY + this._durationTransform.scaleY * e),
                this._pivot.x = n.x + this._durationPivot.x * e,
                this._pivot.y = n.y + this._durationPivot.y * e) : (this._transform.x = this._originTransform.x + a.x + this._durationTransform.x * e,
                this._transform.y = this._originTransform.y + a.y + this._durationTransform.y * e,
                this._transform.skewX = this._originTransform.skewX + a.skewX + this._durationTransform.skewX * e,
                this._transform.skewY = this._originTransform.skewY + a.skewY + this._durationTransform.skewY * e,
                this._tweenScale && (this._transform.scaleX = this._originTransform.scaleX * a.scaleX + this._durationTransform.scaleX * e,
                this._transform.scaleY = this._originTransform.scaleY * a.scaleY + this._durationTransform.scaleY * e),
                this._pivot.x = this._originPivot.x + n.x + this._durationPivot.x * e,
                this._pivot.y = this._originPivot.y + n.y + this._durationPivot.y * e),
                this._bone.invalidUpdate()
            }
        }
        ,
        a.updateSingleFrame = function() {
            var t = this._timelineData.frameList[0];
            this._bone._arriveAtFrame(t, this, this._animationState, !1),
            this._isComplete = !0,
            this._tweenEasing = NaN,
            this._tweenTransform = !1,
            this._tweenScale = !1,
            this._tweenColor = !1,
            this._animationState.additiveBlending ? (this._transform.x = t.transform.x,
            this._transform.y = t.transform.y,
            this._transform.skewX = t.transform.skewX,
            this._transform.skewY = t.transform.skewY,
            this._transform.scaleX = t.transform.scaleX,
            this._transform.scaleY = t.transform.scaleY,
            this._pivot.x = t.pivot.x,
            this._pivot.y = t.pivot.y) : (this._transform.x = this._originTransform.x + t.transform.x,
            this._transform.y = this._originTransform.y + t.transform.y,
            this._transform.skewX = this._originTransform.skewX + t.transform.skewX,
            this._transform.skewY = this._originTransform.skewY + t.transform.skewY,
            this._transform.scaleX = this._originTransform.scaleX * t.transform.scaleX,
            this._transform.scaleY = this._originTransform.scaleY * t.transform.scaleY,
            this._pivot.x = this._originPivot.x + t.pivot.x,
            this._pivot.y = this._originPivot.y + t.pivot.y),
            this._bone.invalidUpdate()
        }
        ,
        i.HALF_PI = .5 * Math.PI,
        i.DOUBLE_PI = 2 * Math.PI,
        i._pool = [],
        i
    }();
    t.TimelineState = i,
    egret.registerClass(i, "dragonBones.TimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t(t, i) {
            void 0 === t && (t = -1),
            void 0 === i && (i = 1),
            this._time = t >= 0 ? t : .001 * (new Date).getTime(),
            this._timeScale = isNaN(i) ? 1 : i,
            this._animatableList = []
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return i(a, "time", function() {
            return this._time
        }),
        i(a, "timeScale", function() {
            return this._timeScale
        }, function(t) {
            (isNaN(t) || 0 > t) && (t = 1),
            this._timeScale = t
        }),
        a.contains = function(t) {
            return this._animatableList.indexOf(t) >= 0
        }
        ,
        a.add = function(t) {
            t && -1 == this._animatableList.indexOf(t) && this._animatableList.push(t)
        }
        ,
        a.remove = function(t) {
            var i = this._animatableList.indexOf(t);
            i >= 0 && (this._animatableList[i] = null)
        }
        ,
        a.clear = function() {
            this._animatableList.length = 0
        }
        ,
        a.advanceTime = function(t) {
            void 0 === t && (t = -1),
            0 > t && (t = .001 * (new Date).getTime() - this._time),
            t *= this._timeScale,
            this._time += t;
            var i = this._animatableList.length;
            if (0 != i) {
                for (var e = 0, a = 0; i > a; a++) {
                    var n = this._animatableList[a];
                    n && (e != a && (this._animatableList[e] = n,
                    this._animatableList[a] = null),
                    n.advanceTime(t),
                    e++)
                }
                if (e != a) {
                    for (i = this._animatableList.length; i > a; )
                        this._animatableList[e++] = this._animatableList[a++];
                    this._animatableList.length = e
                }
            }
        }
        ,
        t.clock = new t,
        t
    }();
    t.WorldClock = i,
    egret.registerClass(i, "dragonBones.WorldClock", ["dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i) {
            void 0 === i && (i = null),
            t.call(this, i)
        }
        __extends(i, t);
        var e = (__define,
        i);
        e.prototype;
        return i
    }(egret.EventDispatcher);
    t.EventDispatcher = i,
    egret.registerClass(i, "dragonBones.EventDispatcher")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i() {
            if (t.call(this),
            i._instance)
                throw new Error("Singleton already constructed!")
        }
        __extends(i, t);
        var e = (__define,
        i);
        e.prototype;
        return i.getInstance = function() {
            return i._instance || (i._instance = new i),
            i._instance
        }
        ,
        i
    }(t.EventDispatcher);
    t.SoundEventManager = i,
    egret.registerClass(i, "dragonBones.SoundEventManager")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e(e) {
            i.call(this),
            this._display = e,
            this._animation = new t.Animation(this),
            this._slotsZOrderChanged = !1,
            this._slotList = [],
            this._boneList = [],
            this._eventList = [],
            this._delayDispose = !1,
            this._lockDispose = !1,
            this._armatureData = null
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return a(s, "armatureData", function() {
            return this._armatureData
        }),
        a(s, "display", function() {
            return this._display
        }),
        s.getDisplay = function() {
            return this._display
        }
        ,
        a(s, "animation", function() {
            return this._animation
        }),
        s.dispose = function() {
            if (this._delayDispose = !0,
            this._animation && !this._lockDispose) {
                this.userData = null,
                this._animation.dispose();
                for (var t = this._slotList.length; t--; )
                    this._slotList[t].dispose();
                for (t = this._boneList.length; t--; )
                    this._boneList[t].dispose();
                this._armatureData = null,
                this._animation = null,
                this._slotList = null,
                this._boneList = null,
                this._eventList = null
            }
        }
        ,
        s.invalidUpdate = function(t) {
            if (void 0 === t && (t = null),
            t) {
                var i = this.getBone(t);
                i && i.invalidUpdate()
            } else
                for (var e = this._boneList.length; e--; )
                    this._boneList[e].invalidUpdate()
        }
        ,
        s.advanceTime = function(i) {
            this._lockDispose = !0,
            this._animation._advanceTime(i),
            i *= this._animation.timeScale;
            for (var e = this._animation._isFading, a = this._boneList.length; a--; ) {
                var n = this._boneList[a];
                n._update(e)
            }
            for (a = this._slotList.length; a--; ) {
                var s = this._slotList[a];
                if (s._update(),
                s._isShowDisplay) {
                    var r = s.childArmature;
                    r && r.advanceTime(i)
                }
            }
            if (this._slotsZOrderChanged && (this.updateSlotsZOrder(),
            this.hasEventListener(t.ArmatureEvent.Z_ORDER_UPDATED) && this.dispatchEvent(new t.ArmatureEvent(t.ArmatureEvent.Z_ORDER_UPDATED))),
            this._eventList.length > 0) {
                for (var a = 0, o = this._eventList.length; o > a; a++) {
                    var l = this._eventList[a];
                    this.dispatchEvent(l)
                }
                this._eventList.length = 0
            }
            this._lockDispose = !1,
            this._delayDispose && this.dispose()
        }
        ,
        s.resetAnimation = function() {
            this.animation.stop(),
            this.animation._resetAnimationStateList();
            for (var t = 0, i = this._boneList.length; i > t; t++)
                this._boneList[t]._removeAllStates()
        }
        ,
        s.getSlots = function(t) {
            return void 0 === t && (t = !0),
            t ? this._slotList.concat() : this._slotList
        }
        ,
        s.getSlot = function(t) {
            for (var i = this._slotList.length, e = 0; i > e; e++) {
                var a = this._slotList[e];
                if (a.name == t)
                    return a
            }
            return null
        }
        ,
        s.getSlotByDisplay = function(t) {
            if (t)
                for (var i = this._slotList.length, e = 0; i > e; e++) {
                    var a = this._slotList[e];
                    if (a.display == t)
                        return a
                }
            return null
        }
        ,
        s.addSlot = function(t, i) {
            var e = this.getBone(i);
            if (!e)
                throw new Error;
            e.addSlot(t)
        }
        ,
        s.removeSlot = function(t) {
            if (!t || t.armature != this)
                throw new Error;
            t.parent.removeSlot(t)
        }
        ,
        s.removeSlotByName = function(t) {
            var i = this.getSlot(t);
            return i && this.removeSlot(i),
            i
        }
        ,
        s.getBones = function(t) {
            return void 0 === t && (t = !0),
            t ? this._boneList.concat() : this._boneList
        }
        ,
        s.getBone = function(t) {
            for (var i = this._boneList.length, e = 0; i > e; e++) {
                var a = this._boneList[e];
                if (a.name == t)
                    return a
            }
            return null
        }
        ,
        s.getBoneByDisplay = function(t) {
            var i = this.getSlotByDisplay(t);
            return i ? i.parent : null
        }
        ,
        s.addBone = function(t, i, e) {
            void 0 === i && (i = null),
            void 0 === e && (e = !1);
            var a;
            if (i && (a = this.getBone(i),
            !a))
                throw new Error;
            a ? a.addChildBone(t, e) : (t.parent && t.parent.removeChildBone(t, e),
            t._setArmature(this),
            e || this._updateAnimationAfterBoneListChanged())
        }
        ,
        s.removeBone = function(t, i) {
            if (void 0 === i && (i = !1),
            !t || t.armature != this)
                throw new Error;
            t.parent ? t.parent.removeChildBone(t, i) : (t._setArmature(null),
            i || this._updateAnimationAfterBoneListChanged(!1))
        }
        ,
        s.removeBoneByName = function(t) {
            var i = this.getBone(t);
            return i && this.removeBone(i),
            i
        }
        ,
        s._addBoneToBoneList = function(t) {
            this._boneList.indexOf(t) < 0 && (this._boneList[this._boneList.length] = t)
        }
        ,
        s._removeBoneFromBoneList = function(t) {
            var i = this._boneList.indexOf(t);
            i >= 0 && this._boneList.splice(i, 1)
        }
        ,
        s._addSlotToSlotList = function(t) {
            this._slotList.indexOf(t) < 0 && (this._slotList[this._slotList.length] = t)
        }
        ,
        s._removeSlotFromSlotList = function(t) {
            var i = this._slotList.indexOf(t);
            i >= 0 && this._slotList.splice(i, 1)
        }
        ,
        s.updateSlotsZOrder = function() {
            this._slotList.sort(this.sortSlot);
            for (var t = this._slotList.length; t--; ) {
                var i = this._slotList[t];
                i._isShowDisplay && i._addDisplayToContainer(this._display)
            }
            this._slotsZOrderChanged = !1
        }
        ,
        s._updateAnimationAfterBoneListChanged = function(t) {
            void 0 === t && (t = !0),
            t && this.sortBoneList(),
            this._animation._updateAnimationStates()
        }
        ,
        s.sortBoneList = function() {
            var i = this._boneList.length;
            if (0 != i) {
                for (var e = []; i--; ) {
                    for (var a = 0, n = this._boneList[i], s = n; s; )
                        a++,
                        s = s.parent;
                    e[i] = [a, n]
                }
                for (e.sort(t.ArmatureData.sortBoneDataHelpArrayDescending),
                i = e.length; i--; )
                    this._boneList[i] = e[i][1];
                e.length = 0
            }
        }
        ,
        s._arriveAtFrame = function(i, a, n, s) {
            if (i.event && this.hasEventListener(t.FrameEvent.ANIMATION_FRAME_EVENT)) {
                var r = new t.FrameEvent(t.FrameEvent.ANIMATION_FRAME_EVENT);
                r.animationState = n,
                r.frameLabel = i.event,
                this._eventList.push(r)
            }
            if (i.sound && e._soundManager.hasEventListener(t.SoundEvent.SOUND)) {
                var o = new t.SoundEvent(t.SoundEvent.SOUND);
                o.armature = this,
                o.animationState = n,
                o.sound = i.sound,
                e._soundManager.dispatchEvent(o)
            }
            i.action && n.displayControl && this.animation.gotoAndPlay(i.action)
        }
        ,
        s.sortSlot = function(t, i) {
            return t.zOrder < i.zOrder ? 1 : -1
        }
        ,
        s.getAnimation = function() {
            return this._animation
        }
        ,
        e._soundManager = t.SoundEventManager.getInstance(),
        e
    }(t.EventDispatcher);
    t.Armature = i,
    egret.registerClass(i, "dragonBones.Armature", ["dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this.a = 1,
            this.b = 0,
            this.c = 0,
            this.d = 1,
            this.tx = 0,
            this.ty = 0
        }
        var i = (__define,
        t)
          , e = i.prototype;
        return e.invert = function() {
            var t = this.a
              , i = this.b
              , e = this.c
              , a = this.d
              , n = this.tx
              , s = t * a - i * e;
            this.a = a / s,
            this.b = -i / s,
            this.c = -e / s,
            this.d = t / s,
            this.tx = (e * this.ty - a * n) / s,
            this.ty = -(t * this.ty - i * n) / s
        }
        ,
        e.concat = function(t) {
            var i = t.a
              , e = t.b
              , a = t.c
              , n = t.d
              , s = this.tx
              , r = this.ty;
            if (1 != i || 0 != e || 0 != a || 1 != n) {
                var o = this.a
                  , l = this.b
                  , h = this.c
                  , _ = this.d;
                this.a = o * i + l * a,
                this.b = o * e + l * n,
                this.c = h * i + _ * a,
                this.d = h * e + _ * n
            }
            this.tx = s * i + r * a + t.tx,
            this.ty = s * e + r * n + t.ty
        }
        ,
        e.copyFrom = function(t) {
            this.tx = t.tx,
            this.ty = t.ty,
            this.a = t.a,
            this.b = t.b,
            this.c = t.c,
            this.d = t.d
        }
        ,
        t
    }();
    t.Matrix = i,
    egret.registerClass(i, "dragonBones.Matrix")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.x = 0,
            this.y = 0,
            this.skewX = 0,
            this.skewY = 0,
            this.scaleX = 1,
            this.scaleY = 1
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return e(n, "rotation", function() {
            return this.skewX
        }, function(t) {
            this.skewX = this.skewY = t
        }),
        n.copy = function(t) {
            this.x = t.x,
            this.y = t.y,
            this.skewX = t.skewX,
            this.skewY = t.skewY,
            this.scaleX = t.scaleX,
            this.scaleY = t.scaleY
        }
        ,
        n.add = function(t) {
            this.x += t.x,
            this.y += t.y,
            this.skewX += t.skewX,
            this.skewY += t.skewY,
            this.scaleX *= t.scaleX,
            this.scaleY *= t.scaleY
        }
        ,
        n.minus = function(t) {
            this.x -= t.x,
            this.y -= t.y,
            this.skewX -= t.skewX,
            this.skewY -= t.skewY,
            this.scaleX /= t.scaleX,
            this.scaleY /= t.scaleY
        }
        ,
        n.normalizeRotation = function() {
            this.skewX = t.TransformUtil.normalizeRotation(this.skewX),
            this.skewY = t.TransformUtil.normalizeRotation(this.skewY)
        }
        ,
        n.toString = function() {
            var t = "x:" + this.x + " y:" + this.y + " skewX:" + this.skewX + " skewY:" + this.skewY + " scaleX:" + this.scaleX + " scaleY:" + this.scaleY;
            return t
        }
        ,
        i
    }();
    t.DBTransform = i,
    egret.registerClass(i, "dragonBones.DBTransform")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._globalTransformMatrix = new t.Matrix,
            this._global = new t.DBTransform,
            this._origin = new t.DBTransform,
            this._offset = new t.DBTransform,
            this._offset.scaleX = this._offset.scaleY = 1,
            this._visible = !0,
            this._armature = null,
            this._parent = null,
            this.userData = null,
            this.inheritRotation = !0,
            this.inheritScale = !0,
            this.inheritTranslation = !0
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return e(n, "global", function() {
            return this._global
        }),
        e(n, "origin", function() {
            return this._origin
        }),
        e(n, "offset", function() {
            return this._offset
        }),
        e(n, "armature", function() {
            return this._armature
        }),
        n._setArmature = function(t) {
            this._armature = t
        }
        ,
        e(n, "parent", function() {
            return this._parent
        }),
        n._setParent = function(t) {
            this._parent = t
        }
        ,
        n.dispose = function() {
            this.userData = null,
            this._globalTransformMatrix = null,
            this._global = null,
            this._origin = null,
            this._offset = null,
            this._armature = null,
            this._parent = null
        }
        ,
        n._calculateRelativeParentTransform = function() {}
        ,
        n._calculateParentTransform = function() {
            if (this.parent && (this.inheritTranslation || this.inheritRotation || this.inheritScale)) {
                var e = this._parent._globalTransformForChild
                  , a = this._parent._globalTransformMatrixForChild;
                return this.inheritTranslation && this.inheritRotation && this.inheritScale || (e = i._tempParentGlobalTransform,
                e.copy(this._parent._globalTransformForChild),
                this.inheritTranslation || (e.x = 0,
                e.y = 0),
                this.inheritScale || (e.scaleX = 1,
                e.scaleY = 1),
                this.inheritRotation || (e.skewX = 0,
                e.skewY = 0),
                a = i._tempParentGlobalTransformMatrix,
                t.TransformUtil.transformToMatrix(e, a, !0)),
                {
                    parentGlobalTransform: e,
                    parentGlobalTransformMatrix: a
                }
            }
            return null
        }
        ,
        n._updateGlobal = function() {
            this._calculateRelativeParentTransform();
            var i = this._calculateParentTransform();
            if (null != i) {
                var e = i.parentGlobalTransformMatrix
                  , a = i.parentGlobalTransform
                  , n = this._global.x
                  , s = this._global.y;
                this._global.x = e.a * n + e.c * s + e.tx,
                this._global.y = e.d * s + e.b * n + e.ty,
                this.inheritRotation && (this._global.skewX += a.skewX,
                this._global.skewY += a.skewY),
                this.inheritScale && (this._global.scaleX *= a.scaleX,
                this._global.scaleY *= a.scaleY)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix, !0),
            i
        }
        ,
        i._tempParentGlobalTransformMatrix = new t.Matrix,
        i._tempParentGlobalTransform = new t.DBTransform,
        i
    }();
    t.DBObject = i,
    egret.registerClass(i, "dragonBones.DBObject")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e() {
            i.call(this),
            this.applyOffsetTranslationToChild = !0,
            this.applyOffsetRotationToChild = !0,
            this.applyOffsetScaleToChild = !1,
            this._needUpdate = 0,
            this._tween = new t.DBTransform,
            this._tweenPivot = new t.Point,
            this._tween.scaleX = this._tween.scaleY = 1,
            this._boneList = [],
            this._slotList = [],
            this._timelineStateList = [],
            this._needUpdate = 2,
            this._isColorChanged = !1
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return e.initWithBoneData = function(t) {
            var i = new e;
            return i.name = t.name,
            i.inheritRotation = t.inheritRotation,
            i.inheritScale = t.inheritScale,
            i.origin.copy(t.transform),
            i
        }
        ,
        s.dispose = function() {
            if (this._boneList) {
                i.prototype.dispose.call(this);
                for (var t = this._boneList.length; t--; )
                    this._boneList[t].dispose();
                for (t = this._slotList.length; t--; )
                    this._slotList[t].dispose();
                this._tween = null,
                this._tweenPivot = null,
                this._boneList = null,
                this._slotList = null,
                this._timelineStateList = null
            }
        }
        ,
        s.contains = function(t) {
            if (!t)
                throw new Error;
            if (t == this)
                return !1;
            for (var i = t; i != this && null != i; )
                i = i.parent;
            return i == this
        }
        ,
        s.addChildBone = function(t, i) {
            if (void 0 === i && (i = !1),
            !t)
                throw new Error;
            if (t == this || t.contains(this))
                throw new Error;
            t.parent != this && (t.parent && t.parent.removeChildBone(t, i),
            this._boneList[this._boneList.length] = t,
            t._setParent(this),
            t._setArmature(this._armature),
            this._armature && !i && this._armature._updateAnimationAfterBoneListChanged())
        }
        ,
        s.removeChildBone = function(t, i) {
            if (void 0 === i && (i = !1),
            !t)
                throw new Error;
            var e = this._boneList.indexOf(t);
            if (0 > e)
                throw new Error;
            this._boneList.splice(e, 1),
            t._setParent(null),
            t._setArmature(null),
            this._armature && !i && this._armature._updateAnimationAfterBoneListChanged(!1)
        }
        ,
        s.addSlot = function(t) {
            if (!t)
                throw new Error;
            t.parent && t.parent.removeSlot(t),
            this._slotList[this._slotList.length] = t,
            t._setParent(this),
            t.setArmature(this._armature)
        }
        ,
        s.removeSlot = function(t) {
            if (!t)
                throw new Error;
            var i = this._slotList.indexOf(t);
            if (0 > i)
                throw new Error;
            this._slotList.splice(i, 1),
            t._setParent(null),
            t.setArmature(null)
        }
        ,
        s._setArmature = function(t) {
            if (this._armature != t) {
                this._armature && (this._armature._removeBoneFromBoneList(this),
                this._armature._updateAnimationAfterBoneListChanged(!1)),
                this._armature = t,
                this._armature && this._armature._addBoneToBoneList(this);
                for (var i = this._boneList.length; i--; )
                    this._boneList[i]._setArmature(this._armature);
                for (i = this._slotList.length; i--; )
                    this._slotList[i].setArmature(this._armature)
            }
        }
        ,
        s.getBones = function(t) {
            return void 0 === t && (t = !0),
            t ? this._boneList.concat() : this._boneList
        }
        ,
        s.getSlots = function(t) {
            return void 0 === t && (t = !0),
            t ? this._slotList.concat() : this._slotList
        }
        ,
        s.invalidUpdate = function() {
            this._needUpdate = 2
        }
        ,
        s._calculateRelativeParentTransform = function() {
            this._global.scaleX = this._origin.scaleX * this._tween.scaleX * this._offset.scaleX,
            this._global.scaleY = this._origin.scaleY * this._tween.scaleY * this._offset.scaleY,
            this._global.skewX = this._origin.skewX + this._tween.skewX + this._offset.skewX,
            this._global.skewY = this._origin.skewY + this._tween.skewY + this._offset.skewY,
            this._global.x = this._origin.x + this._tween.x + this._offset.x,
            this._global.y = this._origin.y + this._tween.y + this._offset.y
        }
        ,
        s._update = function(i) {
            if (void 0 === i && (i = !1),
            this._needUpdate--,
            i || this._needUpdate > 0 || this._parent && this._parent._needUpdate > 0) {
                this._needUpdate = 1,
                this.blendingTimeline();
                var e = this._updateGlobal()
                  , a = e ? e.parentGlobalTransform : null
                  , n = e ? e.parentGlobalTransformMatrix : null
                  , s = 0 != this._offset.x || 0 != this._offset.y
                  , r = 0 != this._offset.scaleX || 0 != this._offset.scaleY
                  , o = 0 != this._offset.skewX || 0 != this._offset.skewY;
                s && !this.applyOffsetTranslationToChild || r && !this.applyOffsetScaleToChild || o && !this.applyOffsetRotationToChild ? (this._tempGlobalTransformForChild || (this._tempGlobalTransformForChild = new t.DBTransform),
                this._globalTransformForChild = this._tempGlobalTransformForChild,
                this._tempGlobalTransformMatrixForChild || (this._tempGlobalTransformMatrixForChild = new t.Matrix),
                this._globalTransformMatrixForChild = this._tempGlobalTransformMatrixForChild,
                this._globalTransformForChild.x = this._origin.x + this._tween.x,
                this._globalTransformForChild.y = this._origin.y + this._tween.y,
                this._globalTransformForChild.scaleX = this._origin.scaleX * this._tween.scaleX,
                this._globalTransformForChild.scaleY = this._origin.scaleY * this._tween.scaleY,
                this._globalTransformForChild.skewX = this._origin.skewX + this._tween.skewX,
                this._globalTransformForChild.skewY = this._origin.skewY + this._tween.skewY,
                this.applyOffsetTranslationToChild && (this._globalTransformForChild.x += this._offset.x,
                this._globalTransformForChild.y += this._offset.y),
                this.applyOffsetScaleToChild && (this._globalTransformForChild.scaleX *= this._offset.scaleX,
                this._globalTransformForChild.scaleY *= this._offset.scaleY),
                this.applyOffsetRotationToChild && (this._globalTransformForChild.skewX += this._offset.skewX,
                this._globalTransformForChild.skewY += this._offset.skewY),
                t.TransformUtil.transformToMatrix(this._globalTransformForChild, this._globalTransformMatrixForChild, !0),
                n && (this._globalTransformMatrixForChild.concat(n),
                t.TransformUtil.matrixToTransform(this._globalTransformMatrixForChild, this._globalTransformForChild, this._globalTransformForChild.scaleX * a.scaleX >= 0, this._globalTransformForChild.scaleY * a.scaleY >= 0))) : (this._globalTransformForChild = this._global,
                this._globalTransformMatrixForChild = this._globalTransformMatrix)
            }
        }
        ,
        s._updateColor = function(t, i, e, a, n, s, r, o, l) {
            for (var h = this._slotList.length, _ = 0; h > _; _++) {
                var u = this._slotList[_];
                u._updateDisplayColor(t, i, e, a, n, s, r, o)
            }
            this._isColorChanged = l
        }
        ,
        s._hideSlots = function() {
            for (var t = this._slotList.length, i = 0; t > i; i++) {
                var e = this._slotList[i];
                e._changeDisplay(-1)
            }
        }
        ,
        s._arriveAtFrame = function(i, a, n, s) {
            var r = n.displayControl && (!this.displayController || this.displayController == n.name) && n.containsBoneMask(this.name);
            if (r) {
                var o, l = i;
                l.displayIndex;
                if (i.event && this._armature.hasEventListener(t.FrameEvent.BONE_FRAME_EVENT)) {
                    var h = new t.FrameEvent(t.FrameEvent.BONE_FRAME_EVENT);
                    h.bone = this,
                    h.animationState = n,
                    h.frameLabel = i.event,
                    this._armature._eventList.push(h)
                }
                if (i.sound && e._soundManager.hasEventListener(t.SoundEvent.SOUND)) {
                    var _ = new t.SoundEvent(t.SoundEvent.SOUND);
                    _.armature = this._armature,
                    _.animationState = n,
                    _.sound = i.sound,
                    e._soundManager.dispatchEvent(_)
                }
                if (i.action)
                    for (var u = this._slotList.length, m = 0; u > m; m++) {
                        o = this._slotList[m];
                        var f = o.childArmature;
                        f && f.animation.gotoAndPlay(i.action)
                    }
            }
        }
        ,
        s._addState = function(t) {
            this._timelineStateList.indexOf(t) < 0 && (this._timelineStateList.push(t),
            this._timelineStateList.sort(this.sortState))
        }
        ,
        s._removeState = function(t) {
            var i = this._timelineStateList.indexOf(t);
            i >= 0 && this._timelineStateList.splice(i, 1)
        }
        ,
        s._removeAllStates = function() {
            this._timelineStateList.length = 0
        }
        ,
        s.blendingTimeline = function() {
            var t, i, e, a, n = this._timelineStateList.length;
            if (1 == n)
                t = this._timelineStateList[0],
                a = t._animationState.weight * t._animationState.fadeWeight,
                t._weight = a,
                i = t._transform,
                e = t._pivot,
                this._tween.x = i.x * a,
                this._tween.y = i.y * a,
                this._tween.skewX = i.skewX * a,
                this._tween.skewY = i.skewY * a,
                this._tween.scaleX = 1 + (i.scaleX - 1) * a,
                this._tween.scaleY = 1 + (i.scaleY - 1) * a,
                this._tweenPivot.x = e.x * a,
                this._tweenPivot.y = e.y * a;
            else if (n > 1) {
                for (var s = 0, r = 0, o = 0, l = 0, h = 1, _ = 1, u = 0, m = 0, f = 1, d = 0, c = this._timelineStateList[n - 1]._animationState.layer, p = 0; n--; ) {
                    if (t = this._timelineStateList[n],
                    p = t._animationState.layer,
                    c != p) {
                        if (d >= f) {
                            t._weight = 0;
                            break
                        }
                        f -= d
                    }
                    c = p,
                    a = t._animationState.weight * t._animationState.fadeWeight * f,
                    t._weight = a,
                    a && (i = t._transform,
                    e = t._pivot,
                    s += i.x * a,
                    r += i.y * a,
                    o += i.skewX * a,
                    l += i.skewY * a,
                    h += (i.scaleX - 1) * a,
                    _ += (i.scaleY - 1) * a,
                    u += e.x * a,
                    m += e.y * a,
                    d += a)
                }
                this._tween.x = s,
                this._tween.y = r,
                this._tween.skewX = o,
                this._tween.skewY = l,
                this._tween.scaleX = h,
                this._tween.scaleY = _,
                this._tweenPivot.x = u,
                this._tweenPivot.y = m
            }
        }
        ,
        s.sortState = function(t, i) {
            return t._animationState.layer < i._animationState.layer ? -1 : 1
        }
        ,
        a(s, "childArmature", function() {
            return this.slot ? this.slot.childArmature : null
        }),
        a(s, "display", function() {
            return this.slot ? this.slot.display : null
        }, function(t) {
            this.slot && (this.slot.display = t)
        }),
        a(s, "node", function() {
            return this._offset
        }),
        a(s, "visible", void 0, function(t) {
            if (this._visible != t) {
                this._visible = t;
                for (var i = this._slotList.length, e = 0; i > e; e++) {
                    var a = this._slotList[e];
                    a._updateDisplayVisible(this._visible)
                }
            }
        }),
        a(s, "slot", function() {
            return this._slotList.length > 0 ? this._slotList[0] : null
        }),
        e._soundManager = t.SoundEventManager.getInstance(),
        e
    }(t.DBObject);
    t.Bone = i,
    egret.registerClass(i, "dragonBones.Bone")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e(e) {
            if (i.call(this),
            this._currentDisplayIndex = 0,
            e != this)
                throw new Error(egret.getString(4001));
            this._displayList = [],
            this._timelineStateList = [],
            this._currentDisplayIndex = -1,
            this._originZOrder = 0,
            this._tweenZOrder = 0,
            this._offsetZOrder = 0,
            this._isShowDisplay = !1,
            this._colorTransform = new t.ColorTransform,
            this._displayDataList = null,
            this._currentDisplay = null,
            this.inheritRotation = !0,
            this.inheritScale = !0
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return s.initWithSlotData = function(t) {
            this.name = t.name,
            this.blendMode = t.blendMode,
            this._originZOrder = t.zOrder,
            this._displayDataList = t.displayDataList,
            this._originDisplayIndex = t.displayIndex
        }
        ,
        s.dispose = function() {
            this._displayList && (i.prototype.dispose.call(this),
            this._displayList.length = 0,
            this._displayDataList = null,
            this._displayList = null,
            this._currentDisplay = null)
        }
        ,
        s.sortState = function(t, i) {
            return t._animationState.layer < i._animationState.layer ? -1 : 1
        }
        ,
        s._addState = function(t) {
            this._timelineStateList.indexOf(t) < 0 && (this._timelineStateList.push(t),
            this._timelineStateList.sort(this.sortState))
        }
        ,
        s._removeState = function(t) {
            var i = this._timelineStateList.indexOf(t);
            i >= 0 && this._timelineStateList.splice(i, 1)
        }
        ,
        s.setArmature = function(t) {
            this._armature != t && (this._armature && this._armature._removeSlotFromSlotList(this),
            this._armature = t,
            this._armature ? (this._armature._addSlotToSlotList(this),
            this._armature._slotsZOrderChanged = !0,
            this._addDisplayToContainer(this._armature.display)) : this._removeDisplayFromContainer())
        }
        ,
        s._update = function() {
            this._parent._needUpdate <= 0 && !this._needUpdate || (this._updateGlobal(),
            this._updateTransform(),
            this._needUpdate = !1)
        }
        ,
        s._calculateRelativeParentTransform = function() {
            this._global.scaleX = this._origin.scaleX * this._offset.scaleX,
            this._global.scaleY = this._origin.scaleY * this._offset.scaleY,
            this._global.skewX = this._origin.skewX + this._offset.skewX,
            this._global.skewY = this._origin.skewY + this._offset.skewY,
            this._global.x = this._origin.x + this._offset.x + this._parent._tweenPivot.x,
            this._global.y = this._origin.y + this._offset.y + this._parent._tweenPivot.y
        }
        ,
        s.updateChildArmatureAnimation = function() {
            this.childArmature && (this._isShowDisplay ? this._armature && this._armature.animation.lastAnimationState && this.childArmature.animation.hasAnimation(this._armature.animation.lastAnimationState.name) ? this.childArmature.animation.gotoAndPlay(this._armature.animation.lastAnimationState.name) : this.childArmature.animation.play() : (this.childArmature.animation.stop(),
            this.childArmature.animation._lastAnimationState = null))
        }
        ,
        s._changeDisplay = function(t) {
            if (void 0 === t && (t = 0),
            0 > t)
                this._isShowDisplay && (this._isShowDisplay = !1,
                this._removeDisplayFromContainer(),
                this.updateChildArmatureAnimation());
            else if (this._displayList.length > 0) {
                var i = this._displayList.length;
                t >= i && (t = i - 1),
                this._currentDisplayIndex != t ? (this._isShowDisplay = !0,
                this._currentDisplayIndex = t,
                this._updateSlotDisplay(),
                this.updateChildArmatureAnimation(),
                this._displayDataList && this._displayDataList.length > 0 && this._currentDisplayIndex < this._displayDataList.length && this._origin.copy(this._displayDataList[this._currentDisplayIndex].transform),
                this._needUpdate = !0) : this._isShowDisplay || (this._isShowDisplay = !0,
                this._armature && (this._armature._slotsZOrderChanged = !0,
                this._addDisplayToContainer(this._armature.display)),
                this.updateChildArmatureAnimation())
            }
        }
        ,
        s._updateSlotDisplay = function() {
            var i = -1;
            this._currentDisplay && (i = this._getDisplayIndex(),
            this._removeDisplayFromContainer());
            var e = this._displayList[this._currentDisplayIndex];
            e ? e instanceof t.Armature ? this._currentDisplay = e.display : this._currentDisplay = e : this._currentDisplay = null,
            this._updateDisplay(this._currentDisplay),
            this._currentDisplay && (this._armature && this._isShowDisplay && (0 > i ? (this._armature._slotsZOrderChanged = !0,
            this._addDisplayToContainer(this._armature.display)) : this._addDisplayToContainer(this._armature.display, i)),
            this._updateDisplayBlendMode(this._blendMode),
            this._updateDisplayColor(this._colorTransform.alphaOffset, this._colorTransform.redOffset, this._colorTransform.greenOffset, this._colorTransform.blueOffset, this._colorTransform.alphaMultiplier, this._colorTransform.redMultiplier, this._colorTransform.greenMultiplier, this._colorTransform.blueMultiplier, !0),
            this._updateDisplayVisible(this._visible),
            this._updateTransform())
        }
        ,
        a(s, "visible", void 0, function(t) {
            this._visible != t && (this._visible = t,
            this._updateDisplayVisible(this._visible))
        }),
        a(s, "displayList", function() {
            return this._displayList
        }, function(t) {
            if (!t)
                throw new Error;
            this._currentDisplayIndex < 0 && (this._currentDisplayIndex = 0);
            for (var i = this._displayList.length = t.length; i--; )
                this._displayList[i] = t[i];
            var e = this._currentDisplayIndex;
            this._currentDisplayIndex = -1,
            this._changeDisplay(e)
        }),
        a(s, "display", function() {
            return this._currentDisplay
        }, function(t) {
            this._currentDisplayIndex < 0 && (this._currentDisplayIndex = 0),
            this._displayList[this._currentDisplayIndex] != t && (this._displayList[this._currentDisplayIndex] = t,
            this._updateSlotDisplay(),
            this.updateChildArmatureAnimation(),
            this._updateTransform())
        }),
        s.getDisplay = function() {
            return this.display
        }
        ,
        s.setDisplay = function(t) {
            this.display = t
        }
        ,
        a(s, "childArmature", function() {
            return this._displayList[this._currentDisplayIndex]instanceof t.Armature ? this._displayList[this._currentDisplayIndex] : null
        }, function(t) {
            this.display = t
        }),
        a(s, "zOrder", function() {
            return this._originZOrder + this._tweenZOrder + this._offsetZOrder
        }, function(t) {
            this.zOrder != t && (this._offsetZOrder = t - this._originZOrder - this._tweenZOrder,
            this._armature && (this._armature._slotsZOrderChanged = !0))
        }),
        a(s, "blendMode", function() {
            return this._blendMode
        }, function(t) {
            this._blendMode != t && (this._blendMode = t,
            this._updateDisplayBlendMode(this._blendMode))
        }),
        s._updateDisplay = function(t) {
            throw new Error("")
        }
        ,
        s._getDisplayIndex = function() {
            throw new Error(egret.getString(4001))
        }
        ,
        s._addDisplayToContainer = function(t, i) {
            throw void 0 === i && (i = -1),
            new Error(egret.getString(4001))
        }
        ,
        s._removeDisplayFromContainer = function() {
            throw new Error(egret.getString(4001))
        }
        ,
        s._updateTransform = function() {
            throw new Error(egret.getString(4001))
        }
        ,
        s._updateDisplayVisible = function(t) {
            throw new Error(egret.getString(4001))
        }
        ,
        s._updateDisplayColor = function(t, i, e, a, n, s, r, o, l) {
            void 0 === l && (l = !1),
            this._colorTransform.alphaOffset = t,
            this._colorTransform.redOffset = i,
            this._colorTransform.greenOffset = e,
            this._colorTransform.blueOffset = a,
            this._colorTransform.alphaMultiplier = n,
            this._colorTransform.redMultiplier = s,
            this._colorTransform.greenMultiplier = r,
            this._colorTransform.blueMultiplier = o,
            this._isColorChanged = l
        }
        ,
        s._updateDisplayBlendMode = function(t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._arriveAtFrame = function(t, i, e, a) {
            var n = e.displayControl && e.containsBoneMask(this.parent.name);
            if (n) {
                var s = t
                  , r = s.displayIndex;
                this._changeDisplay(r),
                this._updateDisplayVisible(s.visible),
                r >= 0 && (isNaN(s.zOrder) || s.zOrder == this._tweenZOrder || (this._tweenZOrder = s.zOrder,
                this._armature._slotsZOrderChanged = !0)),
                t.action && this.childArmature && this.childArmature.animation.gotoAndPlay(t.action)
            }
        }
        ,
        s._updateGlobal = function() {
            this._calculateRelativeParentTransform(),
            t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix, !0);
            var i = this._calculateParentTransform();
            return i && (this._globalTransformMatrix.concat(i.parentGlobalTransformMatrix),
            t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, this._global.scaleX * i.parentGlobalTransform.scaleX >= 0, this._global.scaleY * i.parentGlobalTransform.scaleY >= 0)),
            i
        }
        ,
        s._resetToOrigin = function() {
            this._changeDisplay(this._originDisplayIndex),
            this._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !0);
        }
        ,
        e
    }(t.DBObject);
    t.Slot = i,
    egret.registerClass(i, "dragonBones.Slot")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.slotTimelineCacheList = [],
            this.slotTimelineCacheDic = {},
            this.frameNum = 0
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i.initWithAnimationData = function(e, a) {
            var n = new i;
            n.name = e.name;
            for (var s, r, o, l, h = e.timelineList, _ = 0, u = h.length; u > _; _++) {
                s = h[_].name;
                for (var m = 0, f = a.slotDataList.length; f > m; m++)
                    r = a.slotDataList[m],
                    l = r.name,
                    r.parent == s && null == n.slotTimelineCacheDic[l] && (o = new t.SlotTimelineCache,
                    o.name = l,
                    n.slotTimelineCacheList.push(o),
                    n.slotTimelineCacheDic[l] = o)
            }
            return n
        }
        ,
        a.initSlotTimelineCacheDic = function(t, i) {
            var e;
            for (var a in this.slotTimelineCacheDic) {
                var n = this.slotTimelineCacheDic[a];
                e = n.name,
                n.cacheGenerator = t[e],
                n.currentFrameCache = i[e]
            }
        }
        ,
        a.bindCacheUserSlotDic = function(t) {
            for (var i in t)
                this.slotTimelineCacheDic[i].bindCacheUser(t[i])
        }
        ,
        a.addFrame = function() {
            this.frameNum++;
            for (var t, i = 0, e = this.slotTimelineCacheList.length; e > i; i++)
                t = this.slotTimelineCacheList[i],
                t.addFrame()
        }
        ,
        a.update = function(t) {
            for (var i, e = Math.floor(t * (this.frameNum - 1)), a = 0, n = this.slotTimelineCacheList.length; n > a; a++)
                i = this.slotTimelineCacheList[a],
                i.update(e)
        }
        ,
        i
    }();
    t.AnimationCache = i,
    egret.registerClass(i, "dragonBones.AnimationCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.animationCacheDic = {},
            this.slotFrameCacheDic = {}
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i.initWithArmatureData = function(t, e) {
            void 0 === e && (e = 0);
            var a = new i;
            if (a.armatureData = t,
            0 >= e) {
                var n = t.animationDataList[0];
                n && (a.frameRate = n.frameRate)
            } else
                a.frameRate = e;
            return a
        }
        ,
        a.initAllAnimationCache = function() {
            for (var i = this.armatureData.animationDataList.length, e = 0; i > e; e++) {
                var a = this.armatureData.animationDataList[e];
                this.animationCacheDic[a.name] = t.AnimationCache.initWithAnimationData(a, this.armatureData)
            }
        }
        ,
        a.initAnimationCache = function(i) {
            this.animationCacheDic[i] = t.AnimationCache.initWithAnimationData(this.armatureData.getAnimationData(i), this.armatureData)
        }
        ,
        a.bindCacheUserArmatures = function(t) {
            for (var i = t.length, e = 0; i > e; e++) {
                var a = t[e];
                this.bindCacheUserArmature(a)
            }
        }
        ,
        a.bindCacheUserArmature = function(t) {
            t.animation.animationCacheManager = this;
            var i;
            for (var e in t._slotDic)
                i = t._slotDic[e],
                i.frameCache = this.slotFrameCacheDic[i.name]
        }
        ,
        a.setCacheGeneratorArmature = function(i) {
            this.cacheGeneratorArmature = i;
            var e;
            for (var a in i._slotDic)
                e = i._slotDic[a],
                this.slotFrameCacheDic[e.name] = new t.SlotFrameCache;
            for (var n in this.animationCacheDic) {
                var s = this.animationCacheDic[n];
                s.initSlotTimelineCacheDic(i._slotDic, this.slotFrameCacheDic)
            }
        }
        ,
        a.generateAllAnimationCache = function(t) {
            for (var i in this.animationCacheDic) {
                var e = this.animationCacheDic[i];
                this.generateAnimationCache(e.name, t)
            }
        }
        ,
        a.generateAnimationCache = function(t, i) {
            var e = this.cacheGeneratorArmature.enableCache;
            this.cacheGeneratorArmature.enableCache = !1;
            var a = this.animationCacheDic[t];
            if (a) {
                var n = this.cacheGeneratorArmature.getAnimation().animationState
                  , s = 1 / this.frameRate;
                i ? this.cacheGeneratorArmature.getAnimation().gotoAndPlay(t, 0, -1, 0) : this.cacheGeneratorArmature.getAnimation().gotoAndPlay(t, 0, -1, 1);
                var r = this.cacheGeneratorArmature.enableEventDispatch;
                this.cacheGeneratorArmature.enableEventDispatch = !1;
                var o;
                do
                    o = n.progress,
                    this.cacheGeneratorArmature.advanceTime(s),
                    a.addFrame();
                while (n.progress >= o && n.progress < 1);this.cacheGeneratorArmature.enableEventDispatch = r,
                this.resetCacheGeneratorArmature(),
                this.cacheGeneratorArmature.enableCache = e
            }
        }
        ,
        a.resetCacheGeneratorArmature = function() {
            this.cacheGeneratorArmature.resetAnimation()
        }
        ,
        a.getAnimationCache = function(t) {
            return this.animationCacheDic[t]
        }
        ,
        i
    }();
    t.AnimationCacheManager = i,
    egret.registerClass(i, "dragonBones.AnimationCacheManager")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.globalTransform = new t.DBTransform,
            this.globalTransformMatrix = new t.Matrix
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return a.copy = function(t) {
            this.globalTransform = t.globalTransform,
            this.globalTransformMatrix = t.globalTransformMatrix
        }
        ,
        a.clear = function() {
            this.globalTransform = i.ORIGIN_TRAMSFORM,
            this.globalTransformMatrix = i.ORIGIN_MATRIX
        }
        ,
        i.ORIGIN_TRAMSFORM = new t.DBTransform,
        i.ORIGIN_MATRIX = new t.Matrix,
        i
    }();
    t.FrameCache = i,
    egret.registerClass(i, "dragonBones.FrameCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i() {
            t.call(this),
            this.displayIndex = -1
        }
        __extends(i, t);
        var e = (__define,
        i)
          , a = e.prototype;
        return a.copy = function(i) {
            t.prototype.copy.call(this, i),
            this.colorTransform = i.colorTransform,
            this.displayIndex = i.displayIndex
        }
        ,
        a.clear = function() {
            t.prototype.clear.call(this),
            this.colorTransform = null,
            this.displayIndex = -1
        }
        ,
        i
    }(t.FrameCache);
    t.SlotFrameCache = i,
    egret.registerClass(i, "dragonBones.SlotFrameCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this.frameCacheList = new Array
        }
        var i = (__define,
        t)
          , e = i.prototype;
        return e.addFrame = function() {}
        ,
        e.update = function(t) {
            void 0 === t && (t = 0),
            this.currentFrameCache.copy(this.frameCacheList[t])
        }
        ,
        e.bindCacheUser = function(t) {
            t.frameCache = this.currentFrameCache
        }
        ,
        t
    }();
    t.TimelineCache = i,
    egret.registerClass(i, "dragonBones.TimelineCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e() {
            i.call(this)
        }
        __extends(e, i);
        var a = (__define,
        e)
          , n = a.prototype;
        return n.addFrame = function() {
            var i = new t.SlotFrameCache;
            i.globalTransform.copy(this.cacheGenerator.global),
            i.globalTransformMatrix.copyFrom(this.cacheGenerator.globalTransformMatrix),
            this.cacheGenerator.colorChanged && (i.colorTransform = t.ColorTransformUtil.cloneColor(this.cacheGenerator.colorTransform)),
            i.displayIndex = this.cacheGenerator.displayIndex,
            this.frameCacheList.push(i)
        }
        ,
        e
    }(t.TimelineCache);
    t.SlotTimelineCache = i,
    egret.registerClass(i, "dragonBones.SlotTimelineCache")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i, e, a) {
            void 0 === e && (e = !1),
            void 0 === a && (a = !1),
            t.call(this, i, e, a)
        }
        __extends(i, t);
        var e = (__define,
        i);
        e.prototype;
        return i
    }(egret.Event);
    t.Event = i,
    egret.registerClass(i, "dragonBones.Event")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i, e) {
            void 0 === e && (e = !1),
            t.call(this, i)
        }
        __extends(i, t);
        var e = __define
          , a = i
          , n = a.prototype;
        return e(i, "MOVEMENT_CHANGE", function() {
            return i.FADE_IN
        }),
        e(n, "movementID", function() {
            return this.animationName
        }),
        e(n, "armature", function() {
            return this.target
        }),
        e(n, "animationName", function() {
            return this.animationState.name
        }),
        i.FADE_IN = "fadeIn",
        i.FADE_OUT = "fadeOut",
        i.START = "start",
        i.COMPLETE = "complete",
        i.LOOP_COMPLETE = "loopComplete",
        i.FADE_IN_COMPLETE = "fadeInComplete",
        i.FADE_OUT_COMPLETE = "fadeOutComplete",
        i
    }(t.Event);
    t.AnimationEvent = i,
    egret.registerClass(i, "dragonBones.AnimationEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i) {
            t.call(this, i)
        }
        __extends(i, t);
        var e = (__define,
        i);
        e.prototype;
        return i.Z_ORDER_UPDATED = "zOrderUpdated",
        i
    }(t.Event);
    t.ArmatureEvent = i,
    egret.registerClass(i, "dragonBones.ArmatureEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i, e) {
            void 0 === e && (e = !1),
            t.call(this, i)
        }
        __extends(i, t);
        var e = __define
          , a = i
          , n = a.prototype;
        return e(i, "MOVEMENT_FRAME_EVENT", function() {
            return i.ANIMATION_FRAME_EVENT
        }),
        e(n, "armature", function() {
            return this.target
        }),
        i.ANIMATION_FRAME_EVENT = "animationFrameEvent",
        i.BONE_FRAME_EVENT = "boneFrameEvent",
        i
    }(t.Event);
    t.FrameEvent = i,
    egret.registerClass(i, "dragonBones.FrameEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i(i, e) {
            void 0 === e && (e = !1),
            t.call(this, i)
        }
        __extends(i, t);
        var e = (__define,
        i);
        e.prototype;
        return i.SOUND = "sound",
        i
    }(t.Event);
    t.SoundEvent = i,
    egret.registerClass(i, "dragonBones.SoundEvent")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function a(t) {
            if (i.call(this),
            this.dragonBonesDataDic = {},
            this.textureAtlasDic = {},
            t != this)
                throw new Error(egret.getString(4001))
        }
        __extends(a, i);
        var n = (__define,
        a)
          , s = n.prototype;
        return s.dispose = function(t) {
            if (void 0 === t && (t = !0),
            t) {
                for (var i in this.dragonBonesDataDic)
                    this.dragonBonesDataDic[i].dispose(),
                    delete this.dragonBonesDataDic[i];
                for (var e in this.textureAtlasDic) {
                    var a = this.textureAtlasDic[e];
                    if (a)
                        for (var n = 0, s = a.length; s > n; n++)
                            a[n].dispose();
                    delete this.textureAtlasDic[e]
                }
            }
            this.dragonBonesDataDic = null,
            this.textureAtlasDic = null
        }
        ,
        s.getDragonBonesData = function(t) {
            return this.dragonBonesDataDic[t]
        }
        ,
        s.getSkeletonData = function(t) {
            return this.getDragonBonesData(t)
        }
        ,
        s.addDragonBonesData = function(t, i) {
            if (void 0 === i && (i = null),
            !t)
                throw new Error;
            if (i = i || t.name,
            !i)
                throw new Error(egret.getString(4002));
            this.dragonBonesDataDic[i] = t
        }
        ,
        s.addSkeletonData = function(t, i) {
            void 0 === i && (i = null),
            this.addDragonBonesData(t, i)
        }
        ,
        s.removeDragonBonesData = function(t) {
            delete this.dragonBonesDataDic[t]
        }
        ,
        s.removeSkeletonData = function(t) {
            delete this.dragonBonesDataDic[t]
        }
        ,
        s.getTextureAtlas = function(t) {
            return this.textureAtlasDic[t]
        }
        ,
        s.addTextureAtlas = function(t, i) {
            if (void 0 === i && (i = null),
            !t)
                throw new Error;
            if (!i && t.hasOwnProperty("name") && (i = t.name),
            !i)
                throw new Error(egret.getString(4002));
            var e = this.textureAtlasDic[i];
            null == e && (e = [],
            this.textureAtlasDic[i] = e),
            -1 == e.indexOf(t) && e.push(t)
        }
        ,
        s.removeTextureAtlas = function(t) {
            delete this.textureAtlasDic[t]
        }
        ,
        s.getTextureDisplay = function(t, i, e, a) {
            void 0 === i && (i = null),
            void 0 === e && (e = NaN),
            void 0 === a && (a = NaN);
            var n, s, r, o;
            if (i) {
                if (s = this.textureAtlasDic[i])
                    for (r = 0,
                    o = s.length; o > r && (n = s[r],
                    !n.getRegion(t)); r++)
                        n = null
            } else
                for (i in this.textureAtlasDic)
                    if (s = this.textureAtlasDic[i]) {
                        for (r = 0,
                        o = s.length; o > r && (n = s[r],
                        !n.getRegion(t)); r++)
                            n = null;
                        if (null != n)
                            break
                    }
            if (!n)
                return null;
            if (isNaN(e) || isNaN(a)) {
                var l = this.dragonBonesDataDic[i];
                if (l = l ? l : this.findFirstDragonBonesData()) {
                    var h = l.getDisplayDataByName(t);
                    h && (e = h.pivot.x,
                    a = h.pivot.y)
                }
            }
            return this._generateDisplay(n, t, e, a)
        }
        ,
        s.buildArmature = function(t, i, e, a) {
            void 0 === i && (i = null),
            void 0 === e && (e = null),
            void 0 === a && (a = null);
            var n = {};
            this.fillBuildArmatureDataPackageArmatureInfo(t, i, n),
            null == e && (e = n.dragonBonesDataName);
            var s = n.dragonBonesData
              , r = n.armatureData;
            return r ? this.buildArmatureUsingArmatureDataFromTextureAtlas(s, r, e, a) : null
        }
        ,
        s.buildFastArmature = function(t, i, a, n) {
            void 0 === i && (i = null),
            void 0 === a && (a = null),
            void 0 === n && (n = null);
            var s = new e;
            this.fillBuildArmatureDataPackageArmatureInfo(t, i, s),
            null == a && (a = s.dragonBonesDataName);
            var r = s.dragonBonesData
              , o = s.armatureData;
            return o ? this.buildFastArmatureUsingArmatureDataFromTextureAtlas(r, o, a, n) : null
        }
        ,
        s.buildArmatureUsingArmatureDataFromTextureAtlas = function(t, i, e, a) {
            void 0 === a && (a = null);
            var n = this._generateArmature();
            return n.name = i.name,
            n.__dragonBonesData = t,
            n._armatureData = i,
            n.animation.animationDataList = i.animationDataList,
            this._buildBones(n),
            this._buildSlots(n, a, e),
            n.advanceTime(0),
            n
        }
        ,
        s.buildFastArmatureUsingArmatureDataFromTextureAtlas = function(t, i, e, a) {
            void 0 === a && (a = null);
            var n = this._generateFastArmature();
            return n.name = i.name,
            n.__dragonBonesData = t,
            n._armatureData = i,
            n.animation.animationDataList = i.animationDataList,
            this._buildFastBones(n),
            this._buildFastSlots(n, a, e),
            n.advanceTime(0),
            n
        }
        ,
        s.copyAnimationsToArmature = function(i, e, a, n) {
            void 0 === a && (a = null),
            void 0 === n && (n = !0);
            var s = {};
            if (!this.fillBuildArmatureDataPackageArmatureInfo(e, a, s))
                return !1;
            var r = s.armatureData;
            i.animation.animationDataList = r.animationDataList;
            for (var o, l, h, _, u, m, f = r.getSkinData(""), d = i.getSlots(!1), c = 0, p = d.length, g = 0; p > g; g++) {
                h = d[g],
                _ = h.displayList,
                c = _.length;
                for (var T = 0; c > T; T++)
                    u = _[T],
                    u instanceof t.Armature && (m = u,
                    o = f.getSlotData(h.name),
                    l = o.displayDataList[T],
                    l.type == t.DisplayData.ARMATURE && this.copyAnimationsToArmature(m, l.name, s.dragonBonesDataName, n))
            }
            return !0
        }
        ,
        s.fillBuildArmatureDataPackageArmatureInfo = function(t, i, e) {
            if (i)
                return e.dragonBonesDataName = i,
                e.dragonBonesData = this.dragonBonesDataDic[i],
                e.armatureData = e.dragonBonesData.getArmatureDataByName(t),
                !0;
            for (i in this.dragonBonesDataDic)
                if (e.dragonBonesData = this.dragonBonesDataDic[i],
                e.armatureData = e.dragonBonesData.getArmatureDataByName(t),
                e.armatureData)
                    return e.dragonBonesDataName = i,
                    !0;
            return !1
        }
        ,
        s.fillBuildArmatureDataPackageTextureInfo = function(t, i) {
            i.textureAtlas = this.textureAtlasDic[t ? t : i.dragonBonesDataName]
        }
        ,
        s.findFirstDragonBonesData = function() {
            for (var t in this.dragonBonesDataDic) {
                var i = this.dragonBonesDataDic[t];
                if (i)
                    return i
            }
            return null
        }
        ,
        s.findFirstTextureAtlas = function() {
            for (var t in this.textureAtlasDic) {
                var i = this.textureAtlasDic[t];
                if (i)
                    return i
            }
            return null
        }
        ,
        s._buildBones = function(i) {
            for (var e, a, n, s = i.armatureData.boneDataList, r = 0; r < s.length; r++)
                e = s[r],
                a = t.Bone.initWithBoneData(e),
                n = e.parent,
                n && null == i.armatureData.getBoneData(n) && (n = null),
                i.addBone(a, n, !0);
            i._updateAnimationAfterBoneListChanged()
        }
        ,
        s._buildSlots = function(i, e, a) {
            var n = i.armatureData.getSkinData(e);
            if (n) {
                i.armatureData.setSkinData(e);
                for (var s, r, o, l = [], h = i.armatureData.slotDataList, _ = 0; _ < h.length; _++)
                    if (s = h[_],
                    o = i.getBone(s.parent)) {
                        r = this._generateSlot(),
                        r.initWithSlotData(s),
                        o.addSlot(r),
                        l.length = 0;
                        for (var u = s.displayDataList.length; u--; ) {
                            var m = s.displayDataList[u];
                            switch (m.type) {
                            case t.DisplayData.ARMATURE:
                                var f = this.buildArmatureUsingArmatureDataFromTextureAtlas(i.__dragonBonesData, i.__dragonBonesData.getArmatureDataByName(m.name), a, e);
                                l[u] = f;
                                break;
                            case t.DisplayData.IMAGE:
                            default:
                                l[u] = this.getTextureDisplay(m.name, a, m.pivot.x, m.pivot.y)
                            }
                        }
                        for (var d = 0, c = l.length; c > d; d++) {
                            var p = l[d];
                            if (p && (p instanceof t.Armature && (p = p.display),
                            p.hasOwnProperty("name")))
                                try {
                                    p.name = r.name
                                } catch (g) {}
                        }
                        r.displayList = l,
                        r._changeDisplay(s.displayIndex)
                    }
            }
        }
        ,
        s._buildFastBones = function(i) {
            for (var e, a, n = i.armatureData.boneDataList, s = 0; s < n.length; s++)
                e = n[s],
                a = t.FastBone.initWithBoneData(e),
                i.addBone(a, e.parent)
        }
        ,
        s._buildFastSlots = function(i, e, a) {
            var n = i.armatureData.getSkinData(e);
            if (n) {
                i.armatureData.setSkinData(e);
                for (var s, r, o = [], l = i.armatureData.slotDataList, h = 0; h < l.length; h++) {
                    o.length = 0,
                    s = l[h],
                    r = this._generateFastSlot(),
                    r.initWithSlotData(s);
                    for (var _ = s.displayDataList.length; _--; ) {
                        var u = s.displayDataList[_];
                        switch (u.type) {
                        case t.DisplayData.ARMATURE:
                            var m = this.buildFastArmatureUsingArmatureDataFromTextureAtlas(i.__dragonBonesData, i.__dragonBonesData.getArmatureDataByName(u.name), a, e);
                            o[_] = m,
                            r.hasChildArmature = !0;
                            break;
                        case t.DisplayData.IMAGE:
                        default:
                            o[_] = this.getTextureDisplay(u.name, a, u.pivot.x, u.pivot.y)
                        }
                    }
                    for (var f = o.length, d = 0; f > d; d++) {
                        var c = o[d];
                        if (c && (c instanceof t.FastArmature && (c = c.display),
                        c.hasOwnProperty("name")))
                            try {
                                c.name = r.name
                            } catch (p) {}
                    }
                    r.initDisplayList(o.concat()),
                    i.addSlot(r, s.parent),
                    r._changeDisplayIndex(s.displayIndex)
                }
            }
        }
        ,
        s._generateArmature = function() {
            return null
        }
        ,
        s._generateSlot = function() {
            return null
        }
        ,
        s._generateFastArmature = function() {
            return null
        }
        ,
        s._generateFastSlot = function() {
            return null
        }
        ,
        s._generateDisplay = function(t, i, e, a) {
            return null
        }
        ,
        a._helpMatrix = new t.Matrix,
        a
    }(t.EventDispatcher);
    t.BaseFactory = i,
    egret.registerClass(i, "dragonBones.BaseFactory");
    var e = function() {
        function t() {}
        var i = (__define,
        t);
        i.prototype;
        return t
    }();
    t.BuildArmatureDataPackage = e,
    egret.registerClass(e, "dragonBones.BuildArmatureDataPackage")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e(e) {
            i.call(this),
            this.isCacheManagerExclusive = !1,
            this._enableEventDispatch = !0,
            this.useCache = !0,
            this._display = e,
            this._animation = new t.FastAnimation(this),
            this._slotsZOrderChanged = !1,
            this._armatureData = null,
            this.boneList = [],
            this._boneDic = {},
            this.slotList = [],
            this._slotDic = {},
            this.slotHasChildArmatureList = [],
            this._eventList = [],
            this._delayDispose = !1,
            this._lockDispose = !1
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return s.dispose = function() {
            if (this._delayDispose = !0,
            this._animation && !this._lockDispose) {
                this.userData = null,
                this._animation.dispose();
                for (var t = this.slotList.length; t--; )
                    this.slotList[t].dispose();
                for (t = this.boneList.length; t--; )
                    this.boneList[t].dispose();
                this.slotList.length = 0,
                this.boneList.length = 0,
                this._armatureData = null,
                this._animation = null,
                this.slotList = null,
                this.boneList = null,
                this._eventList = null
            }
        }
        ,
        s.advanceTime = function(t) {
            this._lockDispose = !0,
            this._animation.advanceTime(t);
            var i, e, a = 0;
            if (this._animation.animationState.isUseCache())
                for (this.useCache || (this.useCache = !0),
                a = this.slotList.length; a--; )
                    e = this.slotList[a],
                    e.updateByCache();
            else {
                if (this.useCache)
                    for (this.useCache = !1,
                    a = this.slotList.length; a--; )
                        e = this.slotList[a],
                        e.switchTransformToBackup();
                for (a = this.boneList.length; a--; )
                    i = this.boneList[a],
                    i.update();
                for (a = this.slotList.length; a--; )
                    e = this.slotList[a],
                    e._update()
            }
            for (a = this.slotHasChildArmatureList.length; a--; ) {
                e = this.slotHasChildArmatureList[a];
                var n = e.childArmature;
                n && n.advanceTime(t)
            }
            for (this._slotsZOrderChanged && this.updateSlotsZOrder(); this._eventList.length > 0; )
                this.dispatchEvent(this._eventList.shift());
            this._lockDispose = !1,
            this._delayDispose && this.dispose()
        }
        ,
        s.enableAnimationCache = function(i, e, a) {
            void 0 === e && (e = null),
            void 0 === a && (a = !0);
            var n = t.AnimationCacheManager.initWithArmatureData(this.armatureData, i);
            if (e)
                for (var s = e.length, r = 0; s > r; r++) {
                    var o = e[r];
                    n.initAnimationCache(o)
                }
            else
                n.initAllAnimationCache();
            return n.setCacheGeneratorArmature(this),
            n.generateAllAnimationCache(a),
            n.bindCacheUserArmature(this),
            this.enableCache = !0,
            n
        }
        ,
        s.getBone = function(t) {
            return this._boneDic[t]
        }
        ,
        s.getSlot = function(t) {
            return this._slotDic[t]
        }
        ,
        s.getBoneByDisplay = function(t) {
            var i = this.getSlotByDisplay(t);
            return i ? i.parent : null
        }
        ,
        s.getSlotByDisplay = function(t) {
            if (t)
                for (var i = 0, e = this.slotList.length; e > i; i++)
                    if (this.slotList[i].display == t)
                        return this.slotList[i];
            return null
        }
        ,
        s.getSlots = function(t) {
            return void 0 === t && (t = !0),
            t ? this.slotList.concat() : this.slotList
        }
        ,
        s._updateBonesByCache = function() {
            for (var t, i = this.boneList.length; i--; )
                t = this.boneList[i],
                t.update()
        }
        ,
        s.addBone = function(t, i) {
            void 0 === i && (i = null);
            var e;
            i && (e = this.getBone(i),
            e.boneList.push(t)),
            t.armature = this,
            t.setParent(e),
            this.boneList.unshift(t),
            this._boneDic[t.name] = t
        }
        ,
        s.addSlot = function(t, i) {
            var e = this.getBone(i);
            if (!e)
                throw new Error;
            t.armature = this,
            t.setParent(e),
            e.slotList.push(t),
            t._addDisplayToContainer(this.display),
            this.slotList.push(t),
            this._slotDic[t.name] = t,
            t.hasChildArmature && this.slotHasChildArmatureList.push(t)
        }
        ,
        s.updateSlotsZOrder = function() {
            this.slotList.sort(this.sortSlot);
            for (var t = this.slotList.length; t--; ) {
                var i = this.slotList[t];
                (i._frameCache && i._frameCache.displayIndex >= 0 || !i._frameCache && i.displayIndex >= 0) && i._addDisplayToContainer(this._display)
            }
            this._slotsZOrderChanged = !1
        }
        ,
        s.sortBoneList = function() {
            var i = this.boneList.length;
            if (0 != i) {
                for (var e = []; i--; ) {
                    for (var a = 0, n = this.boneList[i], s = n; s; )
                        a++,
                        s = s.parent;
                    e[i] = [a, n]
                }
                for (e.sort(t.ArmatureData.sortBoneDataHelpArrayDescending),
                i = e.length; i--; )
                    this.boneList[i] = e[i][1];
                e.length = 0
            }
        }
        ,
        s.arriveAtFrame = function(i, e) {
            if (i.event && this.hasEventListener(t.FrameEvent.ANIMATION_FRAME_EVENT)) {
                var a = new t.FrameEvent(t.FrameEvent.ANIMATION_FRAME_EVENT);
                a.animationState = e,
                a.frameLabel = i.event,
                this._addEvent(a)
            }
            i.action && this.animation.gotoAndPlay(i.action)
        }
        ,
        s.invalidUpdate = function(t) {
            if (void 0 === t && (t = null),
            t) {
                var i = this.getBone(t);
                i && i.invalidUpdate()
            } else
                for (var e = this.boneList.length; e--; )
                    this.boneList[e].invalidUpdate()
        }
        ,
        s.resetAnimation = function() {
            this.animation.animationState._resetTimelineStateList();
            for (var t = this.boneList.length, i = 0; t > i; i++) {
                var e = this.boneList[i];
                e._timelineState = null
            }
            this.animation.stop()
        }
        ,
        s.sortSlot = function(t, i) {
            return t.zOrder < i.zOrder ? 1 : -1
        }
        ,
        s.getAnimation = function() {
            return this._animation
        }
        ,
        a(s, "armatureData", function() {
            return this._armatureData
        }),
        a(s, "animation", function() {
            return this._animation
        }),
        a(s, "display", function() {
            return this._display
        }),
        a(s, "enableCache", function() {
            return this._enableCache
        }, function(t) {
            this._enableCache = t
        }),
        a(s, "enableEventDispatch", function() {
            return this._enableEventDispatch
        }, function(t) {
            this._enableEventDispatch = t
        }),
        s._addEvent = function(t) {
            this._enableEventDispatch && this._eventList.push(t)
        }
        ,
        e
    }(t.EventDispatcher);
    t.FastArmature = i,
    egret.registerClass(i, "dragonBones.FastArmature", ["dragonBones.ICacheableArmature", "dragonBones.IArmature", "dragonBones.IAnimatable"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._globalTransformMatrix = new t.Matrix,
            this._global = new t.DBTransform,
            this._origin = new t.DBTransform,
            this._visible = !0,
            this.armature = null,
            this._parent = null,
            this.userData = null,
            this.inheritRotation = !0,
            this.inheritScale = !0,
            this.inheritTranslation = !0
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return n.updateByCache = function() {
            this._global = this._frameCache.globalTransform,
            this._globalTransformMatrix = this._frameCache.globalTransformMatrix
        }
        ,
        n.switchTransformToBackup = function() {
            this._globalBackup || (this._globalBackup = new t.DBTransform,
            this._globalTransformMatrixBackup = new t.Matrix),
            this._global = this._globalBackup,
            this._globalTransformMatrix = this._globalTransformMatrixBackup
        }
        ,
        n.setParent = function(t) {
            this._parent = t
        }
        ,
        n.dispose = function() {
            this.userData = null,
            this._globalTransformMatrix = null,
            this._global = null,
            this._origin = null,
            this.armature = null,
            this._parent = null
        }
        ,
        n._calculateParentTransform = function() {
            if (this.parent && (this.inheritTranslation || this.inheritRotation || this.inheritScale)) {
                var e = this._parent._global
                  , a = this._parent._globalTransformMatrix;
                return (this.inheritTranslation || 0 == e.x && 0 == e.y) && (this.inheritRotation || 0 == e.skewX && 0 == e.skewY) && (this.inheritScale || 1 == e.scaleX && 1 == e.scaleY) || (e = i._tempParentGlobalTransform,
                e.copy(this._parent._global),
                this.inheritTranslation || (e.x = 0,
                e.y = 0),
                this.inheritScale || (e.scaleX = 1,
                e.scaleY = 1),
                this.inheritRotation || (e.skewX = 0,
                e.skewY = 0),
                a = t.DBObject._tempParentGlobalTransformMatrix,
                t.TransformUtil.transformToMatrix(e, a)),
                i.tempOutputObj.parentGlobalTransform = e,
                i.tempOutputObj.parentGlobalTransformMatrix = a,
                i.tempOutputObj
            }
            return null
        }
        ,
        n._updateGlobal = function() {
            this._calculateRelativeParentTransform();
            var i = this._calculateParentTransform();
            if (null != i) {
                var e = i.parentGlobalTransformMatrix
                  , a = i.parentGlobalTransform
                  , n = this._global.x
                  , s = this._global.y;
                this._global.x = e.a * n + e.c * s + e.tx,
                this._global.y = e.d * s + e.b * n + e.ty,
                this.inheritRotation && (this._global.skewX += a.skewX,
                this._global.skewY += a.skewY),
                this.inheritScale && (this._global.scaleX *= a.scaleX,
                this._global.scaleY *= a.scaleY)
            }
            return t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix, !0),
            i
        }
        ,
        n._calculateRelativeParentTransform = function() {}
        ,
        e(n, "name", function() {
            return this._name
        }, function(t) {
            this._name = t
        }),
        e(n, "global", function() {
            return this._global
        }),
        e(n, "globalTransformMatrix", function() {
            return this._globalTransformMatrix
        }),
        e(n, "origin", function() {
            return this._origin
        }),
        e(n, "parent", function() {
            return this._parent
        }),
        e(n, "visible", function() {
            return this._visible
        }, function(t) {
            this._visible = t
        }),
        e(n, "frameCache", void 0, function(t) {
            this._frameCache = t
        }),
        i._tempParentGlobalTransform = new t.DBTransform,
        i.tempOutputObj = {},
        i
    }();
    t.FastDBObject = i,
    egret.registerClass(i, "dragonBones.FastDBObject")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e() {
            i.call(this),
            this.slotList = [],
            this.boneList = [],
            this._needUpdate = 0,
            this._needUpdate = 2,
            this._tweenPivot = new t.Point
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return e.initWithBoneData = function(t) {
            var i = new e;
            return i.name = t.name,
            i.inheritRotation = t.inheritRotation,
            i.inheritScale = t.inheritScale,
            i.origin.copy(t.transform),
            i
        }
        ,
        s.getBones = function(t) {
            return void 0 === t && (t = !0),
            t ? this.boneList.concat() : this.boneList
        }
        ,
        s.getSlots = function(t) {
            return void 0 === t && (t = !0),
            t ? this.slotList.concat() : this.slotList
        }
        ,
        s.dispose = function() {
            i.prototype.dispose.call(this),
            this._timelineState = null,
            this._tweenPivot = null
        }
        ,
        s.invalidUpdate = function() {
            this._needUpdate = 2
        }
        ,
        s._calculateRelativeParentTransform = function() {
            this._global.copy(this._origin),
            this._timelineState && this._global.add(this._timelineState._transform)
        }
        ,
        s.updateByCache = function() {
            i.prototype.updateByCache.call(this),
            this._global = this._frameCache.globalTransform,
            this._globalTransformMatrix = this._frameCache.globalTransformMatrix
        }
        ,
        s.update = function(t) {
            void 0 === t && (t = !1),
            this._needUpdate--,
            (t || this._needUpdate > 0 || this._parent && this._parent._needUpdate > 0) && (this._needUpdate = 1,
            this.blendingTimeline(),
            this._updateGlobal())
        }
        ,
        s._hideSlots = function() {
            for (var t = this.slotList.length, i = 0; t > i; i++) {
                var e = this.slotList[i];
                e.hideSlots()
            }
        }
        ,
        s.blendingTimeline = function() {
            this._timelineState && (this._tweenPivot.x = this._timelineState._pivot.x,
            this._tweenPivot.y = this._timelineState._pivot.y)
        }
        ,
        s.arriveAtFrame = function(i, e) {
            if (i.event && this.armature.hasEventListener(t.FrameEvent.BONE_FRAME_EVENT)) {
                var a = new t.FrameEvent(t.FrameEvent.BONE_FRAME_EVENT);
                a.bone = this,
                a.animationState = e,
                a.frameLabel = i.event,
                this.armature._addEvent(a)
            }
        }
        ,
        a(s, "childArmature", function() {
            var t = this.slot;
            return t ? t.childArmature : null
        }),
        a(s, "display", function() {
            var t = this.slot;
            return t ? t.display : null
        }, function(t) {
            var i = this.slot;
            i && (i.display = t)
        }),
        a(s, "visible", void 0, function(t) {
            if (this._visible != t) {
                this._visible = t;
                for (var i = 0, e = this.armature.slotList.length; e > i; i++)
                    this.armature.slotList[i].parent == this && this.armature.slotList[i]._updateDisplayVisible(this._visible)
            }
        }),
        a(s, "slot", function() {
            return this.slotList.length > 0 ? this.slotList[0] : null
        }),
        e
    }(t.FastDBObject);
    t.FastBone = i,
    egret.registerClass(i, "dragonBones.FastBone")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e(e) {
            if (i.call(this),
            this._currentDisplayIndex = 0,
            e != this)
                throw new Error("Abstract class can not be instantiated!");
            this.hasChildArmature = !1,
            this._currentDisplayIndex = -1,
            this._originZOrder = 0,
            this._tweenZOrder = 0,
            this._offsetZOrder = 0,
            this._colorTransform = new t.ColorTransform,
            this._isColorChanged = !1,
            this._displayDataList = null,
            this._currentDisplay = null,
            this.inheritRotation = !0,
            this.inheritScale = !0
        }
        __extends(e, i);
        var a = __define
          , n = e
          , s = n.prototype;
        return s.initWithSlotData = function(t) {
            this.name = t.name,
            this.blendMode = t.blendMode,
            this._originZOrder = t.zOrder,
            this._displayDataList = t.displayDataList,
            this._originDisplayIndex = t.displayIndex
        }
        ,
        s.dispose = function() {
            this._displayList && (i.prototype.dispose.call(this),
            this._displayDataList = null,
            this._displayList = null,
            this._currentDisplay = null)
        }
        ,
        s.updateByCache = function() {
            i.prototype.updateByCache.call(this),
            this._updateTransform();
            var e = this._frameCache.colorTransform
              , a = null != e;
            (this.colorChanged != a || this.colorChanged && a && !t.ColorTransformUtil.isEqual(this._colorTransform, e)) && (e = e || t.ColorTransformUtil.originalColor,
            this._updateDisplayColor(e.alphaOffset, e.redOffset, e.greenOffset, e.blueOffset, e.alphaMultiplier, e.redMultiplier, e.greenMultiplier, e.blueMultiplier, a)),
            this._changeDisplayIndex(this._frameCache.displayIndex)
        }
        ,
        s._update = function() {
            this._parent._needUpdate <= 0 || (this._updateGlobal(),
            this._updateTransform())
        }
        ,
        s._calculateRelativeParentTransform = function() {
            this._global.copy(this._origin),
            this._global.x += this._parent._tweenPivot.x,
            this._global.y += this._parent._tweenPivot.y
        }
        ,
        s.initDisplayList = function(t) {
            this._displayList = t
        }
        ,
        s.clearCurrentDisplay = function() {
            if (this.hasChildArmature) {
                var t = this.childArmature;
                t && t.resetAnimation()
            }
            var i = this._getDisplayIndex();
            return this._removeDisplayFromContainer(),
            i
        }
        ,
        s._changeDisplayIndex = function(t) {
            if (void 0 === t && (t = 0),
            this._currentDisplayIndex != t) {
                var i = -1;
                this._currentDisplayIndex >= 0 && (i = this.clearCurrentDisplay()),
                this._currentDisplayIndex = t,
                this._currentDisplayIndex >= 0 && (this._origin.copy(this._displayDataList[this._currentDisplayIndex].transform),
                this.initCurrentDisplay(i))
            }
        }
        ,
        s.changeSlotDisplay = function(t) {
            var i = this.clearCurrentDisplay();
            this._displayList[this._currentDisplayIndex] = t,
            this.initCurrentDisplay(i)
        }
        ,
        s.initCurrentDisplay = function(i) {
            void 0 === i && (i = 0);
            var e = this._displayList[this._currentDisplayIndex];
            if (e ? e instanceof t.FastArmature ? this._currentDisplay = e.display : this._currentDisplay = e : this._currentDisplay = null,
            this._updateDisplay(this._currentDisplay),
            this._currentDisplay && (-1 != i ? this._addDisplayToContainer(this.armature.display, i) : (this.armature._slotsZOrderChanged = !0,
            this._addDisplayToContainer(this.armature.display)),
            this._blendMode && this._updateDisplayBlendMode(this._blendMode),
            this._isColorChanged && this._updateDisplayColor(this._colorTransform.alphaOffset, this._colorTransform.redOffset, this._colorTransform.greenOffset, this._colorTransform.blueOffset, this._colorTransform.alphaMultiplier, this._colorTransform.redMultiplier, this._colorTransform.greenMultiplier, this._colorTransform.blueMultiplier, !0),
            this._updateTransform(),
            e instanceof t.FastArmature)) {
                var a = e;
                this.armature && this.armature.animation.animationState && a.animation.hasAnimation(this.armature.animation.animationState.name) ? a.animation.gotoAndPlay(this.armature.animation.animationState.name) : a.animation.play()
            }
        }
        ,
        a(s, "visible", void 0, function(t) {
            this._visible != t && (this._visible = t,
            this._updateDisplayVisible(this._visible))
        }),
        a(s, "displayList", function() {
            return this._displayList
        }, function(t) {
            if (!t)
                throw new Error;
            var i = t[this._currentDisplayIndex]
              , e = this._currentDisplayIndex >= 0 && this._displayList[this._currentDisplayIndex] != i;
            this._displayList = t,
            e && this.changeSlotDisplay(i)
        }),
        a(s, "display", function() {
            return this._currentDisplay
        }, function(t) {
            this._currentDisplayIndex < 0 || this._displayList[this._currentDisplayIndex] != t && this.changeSlotDisplay(t)
        }),
        a(s, "childArmature", function() {
            return this._displayList[this._currentDisplayIndex]instanceof t.Armature || this._displayList[this._currentDisplayIndex]instanceof t.FastArmature ? this._displayList[this._currentDisplayIndex] : null
        }, function(t) {
            this.display = t
        }),
        a(s, "zOrder", function() {
            return this._originZOrder + this._tweenZOrder + this._offsetZOrder
        }, function(t) {
            this.zOrder != t && (this._offsetZOrder = t - this._originZOrder - this._tweenZOrder,
            this.armature && (this.armature._slotsZOrderChanged = !0))
        }),
        a(s, "blendMode", function() {
            return this._blendMode
        }, function(t) {
            this._blendMode != t && (this._blendMode = t,
            this._updateDisplayBlendMode(this._blendMode))
        }),
        a(s, "colorTransform", function() {
            return this._colorTransform
        }),
        a(s, "displayIndex", function() {
            return this._currentDisplayIndex
        }),
        a(s, "colorChanged", function() {
            return this._isColorChanged
        }),
        s._updateDisplay = function(t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._getDisplayIndex = function() {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._addDisplayToContainer = function(t, i) {
            throw void 0 === i && (i = -1),
            new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._removeDisplayFromContainer = function() {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._updateTransform = function() {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._updateDisplayVisible = function(t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._updateDisplayColor = function(t, i, e, a, n, s, r, o, l) {
            void 0 === l && (l = !1),
            this._colorTransform.alphaOffset = t,
            this._colorTransform.redOffset = i,
            this._colorTransform.greenOffset = e,
            this._colorTransform.blueOffset = a,
            this._colorTransform.alphaMultiplier = n,
            this._colorTransform.redMultiplier = s,
            this._colorTransform.greenMultiplier = r,
            this._colorTransform.blueMultiplier = o,
            this._isColorChanged = l
        }
        ,
        s._updateDisplayBlendMode = function(t) {
            throw new Error("Abstract method needs to be implemented in subclass!")
        }
        ,
        s._arriveAtFrame = function(t, i) {
            var e = t
              , a = e.displayIndex;
            if (this._changeDisplayIndex(a),
            this._updateDisplayVisible(e.visible),
            a >= 0 && (isNaN(e.zOrder) || e.zOrder == this._tweenZOrder || (this._tweenZOrder = e.zOrder,
            this.armature._slotsZOrderChanged = !0)),
            t.action) {
                var n = this.childArmature;
                n && n.getAnimation().gotoAndPlay(t.action)
            }
        }
        ,
        s.hideSlots = function() {
            this._changeDisplayIndex(-1),
            this._removeDisplayFromContainer(),
            this._frameCache && this._frameCache.clear()
        }
        ,
        s._updateGlobal = function() {
            this._calculateRelativeParentTransform(),
            t.TransformUtil.transformToMatrix(this._global, this._globalTransformMatrix, !0);
            var i = this._calculateParentTransform();
            return i && (this._globalTransformMatrix.concat(i.parentGlobalTransformMatrix),
            t.TransformUtil.matrixToTransform(this._globalTransformMatrix, this._global, this._global.scaleX * i.parentGlobalTransform.scaleX >= 0, this._global.scaleY * i.parentGlobalTransform.scaleY >= 0)),
            i
        }
        ,
        s._resetToOrigin = function() {
            this._changeDisplayIndex(this._originDisplayIndex),
            this._updateDisplayColor(0, 0, 0, 0, 1, 1, 1, 1, !0)
        }
        ,
        e
    }(t.FastDBObject);
    t.FastSlot = i,
    egret.registerClass(i, "dragonBones.FastSlot", ["dragonBones.ISlotCacheGenerator", "dragonBones.ICacheUser"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t(t, i) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            this.x = t,
            this.y = i
        }
        var i = (__define,
        t)
          , e = i.prototype;
        return e.toString = function() {
            return "[Point (x=" + this.x + " y=" + this.y + ")]"
        }
        ,
        t
    }();
    t.Point = i,
    egret.registerClass(i, "dragonBones.Point")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t(t, i, e, a) {
            void 0 === t && (t = 0),
            void 0 === i && (i = 0),
            void 0 === e && (e = 0),
            void 0 === a && (a = 0),
            this.x = t,
            this.y = i,
            this.width = e,
            this.height = a
        }
        var i = (__define,
        t);
        i.prototype;
        return t
    }();
    t.Rectangle = i,
    egret.registerClass(i, "dragonBones.Rectangle")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this.duration = 0,
            this._frameList = [],
            this.duration = 0,
            this.scale = 1
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return a.dispose = function() {
            for (var t = this._frameList.length; t--; )
                this._frameList[t].dispose();
            this._frameList = null
        }
        ,
        a.addFrame = function(t) {
            if (!t)
                throw new Error;
            if (!(this._frameList.indexOf(t) < 0))
                throw new Error;
            this._frameList[this._frameList.length] = t
        }
        ,
        i(a, "frameList", function() {
            return this._frameList
        }),
        t
    }();
    t.Timeline = i,
    egret.registerClass(i, "dragonBones.Timeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i() {
            t.call(this),
            this.frameRate = 0,
            this.playTimes = 0,
            this.lastFrameDuration = 0,
            this.fadeTime = 0,
            this.playTimes = 0,
            this.autoTween = !0,
            this.tweenEasing = NaN,
            this.hideTimelineNameMap = [],
            this.hideSlotTimelineNameMap = [],
            this._timelineList = [],
            this._slotTimelineList = []
        }
        __extends(i, t);
        var e = __define
          , a = i
          , n = a.prototype;
        return e(n, "timelineList", function() {
            return this._timelineList
        }),
        e(n, "slotTimelineList", function() {
            return this._slotTimelineList
        }),
        n.dispose = function() {
            t.prototype.dispose.call(this),
            this.hideTimelineNameMap = null;
            var i = 0
              , e = 0;
            for (i = 0,
            e = this._timelineList.length; e > i; i++) {
                var a = this._timelineList[i];
                a.dispose()
            }
            for (this._timelineList = null,
            i = 0,
            e = this._slotTimelineList.length; e > i; i++) {
                var n = this._slotTimelineList[i];
                n.dispose()
            }
            this._slotTimelineList = null
        }
        ,
        n.getTimeline = function(t) {
            for (var i = this._timelineList.length; i--; )
                if (this._timelineList[i].name == t)
                    return this._timelineList[i];
            return null
        }
        ,
        n.addTimeline = function(t) {
            if (!t)
                throw new Error;
            this._timelineList.indexOf(t) < 0 && (this._timelineList[this._timelineList.length] = t)
        }
        ,
        n.getSlotTimeline = function(t) {
            for (var i = this._slotTimelineList.length; i--; )
                if (this._slotTimelineList[i].name == t)
                    return this._slotTimelineList[i];
            return null
        }
        ,
        n.addSlotTimeline = function(t) {
            if (!t)
                throw new Error;
            this._slotTimelineList.indexOf(t) < 0 && (this._slotTimelineList[this._slotTimelineList.length] = t)
        }
        ,
        i
    }(t.Timeline);
    t.AnimationData = i,
    egret.registerClass(i, "dragonBones.AnimationData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this._boneDataList = [],
            this._skinDataList = [],
            this._slotDataList = [],
            this._animationDataList = []
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return t.sortBoneDataHelpArray = function(t, i) {
            return t[0] > i[0] ? 1 : -1
        }
        ,
        t.sortBoneDataHelpArrayDescending = function(t, i) {
            return t[0] > i[0] ? -1 : 1
        }
        ,
        a.setSkinData = function(t) {
            var i = 0
              , e = this._slotDataList.length;
            for (i = 0; e > i; i++)
                this._slotDataList[i].dispose();
            var a;
            if (!t && this._skinDataList.length > 0)
                a = this._skinDataList[0];
            else
                for (i = 0,
                e = this._skinDataList.length; e > i; i++)
                    if (this._skinDataList[i].name == t) {
                        a = this._skinDataList[i];
                        break
                    }
            if (a) {
                var n;
                for (i = 0,
                e = a.slotDataList.length,
                i = 0; e > i; i++)
                    if (n = this.getSlotData(a.slotDataList[i].name)) {
                        var s = 0
                          , r = a.slotDataList[i].displayDataList.length;
                        for (s = 0; r > s; s++)
                            n.addDisplayData(a.slotDataList[i].displayDataList[s])
                    }
            }
        }
        ,
        a.dispose = function() {
            for (var t = this._boneDataList.length; t--; )
                this._boneDataList[t].dispose();
            for (t = this._skinDataList.length; t--; )
                this._skinDataList[t].dispose();
            for (t = this._slotDataList.length; t--; )
                this._slotDataList[t].dispose();
            for (t = this._animationDataList.length; t--; )
                this._animationDataList[t].dispose();
            this._boneDataList = null,
            this._slotDataList = null,
            this._skinDataList = null,
            this._animationDataList = null
        }
        ,
        a.getBoneData = function(t) {
            for (var i = this._boneDataList.length; i--; )
                if (this._boneDataList[i].name == t)
                    return this._boneDataList[i];
            return null
        }
        ,
        a.getSlotData = function(t) {
            for (var i = this._slotDataList.length; i--; )
                if (this._slotDataList[i].name == t)
                    return this._slotDataList[i];
            return null
        }
        ,
        a.getSkinData = function(t) {
            if (!t && this._skinDataList.length > 0)
                return this._skinDataList[0];
            for (var i = this._skinDataList.length; i--; )
                if (this._skinDataList[i].name == t)
                    return this._skinDataList[i];
            return null
        }
        ,
        a.getAnimationData = function(t) {
            for (var i = this._animationDataList.length; i--; )
                if (this._animationDataList[i].name == t)
                    return this._animationDataList[i];
            return null
        }
        ,
        a.addBoneData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._boneDataList.indexOf(t) < 0))
                throw new Error;
            this._boneDataList[this._boneDataList.length] = t
        }
        ,
        a.addSlotData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._slotDataList.indexOf(t) < 0))
                throw new Error;
            this._slotDataList[this._slotDataList.length] = t
        }
        ,
        a.addSkinData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._skinDataList.indexOf(t) < 0))
                throw new Error;
            this._skinDataList[this._skinDataList.length] = t
        }
        ,
        a.addAnimationData = function(t) {
            if (!t)
                throw new Error;
            this._animationDataList.indexOf(t) < 0 && (this._animationDataList[this._animationDataList.length] = t)
        }
        ,
        a.sortBoneDataList = function() {
            var i = this._boneDataList.length;
            if (0 != i) {
                for (var e = []; i--; ) {
                    for (var a = this._boneDataList[i], n = 0, s = a; s; )
                        n++,
                        s = this.getBoneData(s.parent);
                    e[i] = [n, a]
                }
                for (e.sort(t.sortBoneDataHelpArray),
                i = e.length; i--; )
                    this._boneDataList[i] = e[i][1]
            }
        }
        ,
        i(a, "boneDataList", function() {
            return this._boneDataList
        }),
        i(a, "slotDataList", function() {
            return this._slotDataList
        }),
        i(a, "skinDataList", function() {
            return this._skinDataList
        }),
        i(a, "animationDataList", function() {
            return this._animationDataList
        }),
        t
    }();
    t.ArmatureData = i,
    egret.registerClass(i, "dragonBones.ArmatureData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.length = 0,
            this.global = new t.DBTransform,
            this.transform = new t.DBTransform,
            this.inheritRotation = !0,
            this.inheritScale = !1
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return a.dispose = function() {
            this.global = null,
            this.transform = null
        }
        ,
        i
    }();
    t.BoneData = i,
    egret.registerClass(i, "dragonBones.BoneData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this.alphaMultiplier = 1,
            this.alphaOffset = 0,
            this.blueMultiplier = 1,
            this.blueOffset = 0,
            this.greenMultiplier = 1,
            this.greenOffset = 0,
            this.redMultiplier = 1,
            this.redOffset = 0
        }
        var i = (__define,
        t);
        i.prototype;
        return t
    }();
    t.ColorTransform = i,
    egret.registerClass(i, "dragonBones.ColorTransform")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._dataChanged = !1,
            this._pointList = [],
            this.sampling = new Array(i.SamplingTimes);
            for (var e = 0; e < i.SamplingTimes - 1; e++)
                this.sampling[e] = new t.Point
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return n.getValueByProgress = function(t) {
            this._dataChanged && this.refreshSampling();
            for (var e = 0; e < i.SamplingTimes - 1; e++) {
                var a = this.sampling[e];
                if (a.x >= t) {
                    if (0 == e)
                        return a.y * t / a.x;
                    var n = this.sampling[e - 1];
                    return n.y + (a.y - n.y) * (t - n.x) / (a.x - n.x)
                }
            }
            return a.y + (1 - a.y) * (t - a.x) / (1 - a.x)
        }
        ,
        n.refreshSampling = function() {
            for (var t = 0; t < i.SamplingTimes - 1; t++)
                this.bezierCurve(i.SamplingStep * (t + 1), this.sampling[t]);
            this._dataChanged = !1
        }
        ,
        n.bezierCurve = function(t, i) {
            var e = 1 - t;
            i.x = 3 * this.point1.x * t * e * e + 3 * this.point2.x * t * t * e + Math.pow(t, 3),
            i.y = 3 * this.point1.y * t * e * e + 3 * this.point2.y * t * t * e + Math.pow(t, 3)
        }
        ,
        e(n, "pointList", function() {
            return this._pointList
        }, function(t) {
            this._pointList = t,
            this._dataChanged = !0
        }),
        n.isCurve = function() {
            return 0 != this.point1.x || 0 != this.point1.y || 1 != this.point2.x || 1 != this.point2.y
        }
        ,
        e(n, "point1", function() {
            return this.pointList[0]
        }),
        e(n, "point2", function() {
            return this.pointList[1]
        }),
        i.SamplingTimes = 20,
        i.SamplingStep = .05,
        i
    }();
    t.CurveData = i,
    egret.registerClass(i, "dragonBones.CurveData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this.transform = new t.DBTransform,
            this.pivot = new t.Point
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return a.dispose = function() {
            this.transform = null,
            this.pivot = null
        }
        ,
        i.ARMATURE = "armature",
        i.IMAGE = "image",
        i
    }();
    t.DisplayData = i,
    egret.registerClass(i, "dragonBones.DisplayData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this._armatureDataList = [],
            this._displayDataDictionary = {}
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return a.dispose = function() {
            for (var t = 0, i = this._armatureDataList.length; i > t; t++) {
                var e = this._armatureDataList[t];
                e.dispose()
            }
            this._armatureDataList = null,
            this.removeAllDisplayData(),
            this._displayDataDictionary = null
        }
        ,
        i(a, "armatureDataList", function() {
            return this._armatureDataList
        }),
        a.getArmatureDataByName = function(t) {
            for (var i = this._armatureDataList.length; i--; )
                if (this._armatureDataList[i].name == t)
                    return this._armatureDataList[i];
            return null
        }
        ,
        a.addArmatureData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._armatureDataList.indexOf(t) < 0))
                throw new Error;
            this._armatureDataList[this._armatureDataList.length] = t
        }
        ,
        a.removeArmatureData = function(t) {
            var i = this._armatureDataList.indexOf(t);
            i >= 0 && this._armatureDataList.splice(i, 1)
        }
        ,
        a.removeArmatureDataByName = function(t) {
            for (var i = this._armatureDataList.length; i--; )
                this._armatureDataList[i].name == t && this._armatureDataList.splice(i, 1)
        }
        ,
        a.getDisplayDataByName = function(t) {
            return this._displayDataDictionary[t]
        }
        ,
        a.addDisplayData = function(t) {
            this._displayDataDictionary[t.name] = t
        }
        ,
        a.removeDisplayDataByName = function(t) {
            delete this._displayDataDictionary[t]
        }
        ,
        a.removeAllDisplayData = function() {
            for (var t in this._displayDataDictionary)
                delete this._displayDataDictionary[t]
        }
        ,
        t
    }();
    t.DragonBonesData = i,
    egret.registerClass(i, "dragonBones.DragonBonesData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this.position = 0,
            this.duration = 0,
            this.position = 0,
            this.duration = 0
        }
        var i = (__define,
        t)
          , e = i.prototype;
        return e.dispose = function() {}
        ,
        t
    }();
    t.Frame = i,
    egret.registerClass(i, "dragonBones.Frame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this._slotDataList = []
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return a.dispose = function() {
            for (var t = this._slotDataList.length; t--; )
                this._slotDataList[t].dispose();
            this._slotDataList = null
        }
        ,
        a.getSlotData = function(t) {
            for (var i = this._slotDataList.length; i--; )
                if (this._slotDataList[i].name == t)
                    return this._slotDataList[i];
            return null
        }
        ,
        a.addSlotData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._slotDataList.indexOf(t) < 0))
                throw new Error;
            this._slotDataList[this._slotDataList.length] = t
        }
        ,
        i(a, "slotDataList", function() {
            return this._slotDataList
        }),
        t
    }();
    t.SkinData = i,
    egret.registerClass(i, "dragonBones.SkinData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {
            this._displayDataList = [],
            this.zOrder = 0
        }
        var i = __define
          , e = t
          , a = e.prototype;
        return a.dispose = function() {
            this._displayDataList.length = 0
        }
        ,
        a.addDisplayData = function(t) {
            if (!t)
                throw new Error;
            if (!(this._displayDataList.indexOf(t) < 0))
                throw new Error;
            this._displayDataList[this._displayDataList.length] = t
        }
        ,
        a.getDisplayData = function(t) {
            for (var i = this._displayDataList.length; i--; )
                if (this._displayDataList[i].name == t)
                    return this._displayDataList[i];
            return null
        }
        ,
        i(a, "displayDataList", function() {
            return this._displayDataList
        }),
        t
    }();
    t.SlotData = i,
    egret.registerClass(i, "dragonBones.SlotData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i() {
            t.call(this),
            this.displayIndex = 0,
            this.tweenEasing = 10,
            this.displayIndex = 0,
            this.visible = !0,
            this.zOrder = NaN
        }
        __extends(i, t);
        var e = (__define,
        i)
          , a = e.prototype;
        return a.dispose = function() {
            t.prototype.dispose.call(this),
            this.color = null
        }
        ,
        i
    }(t.Frame);
    t.SlotFrame = i,
    egret.registerClass(i, "dragonBones.SlotFrame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(t) {
        function i() {
            t.call(this),
            this.offset = 0
        }
        __extends(i, t);
        var e = (__define,
        i)
          , a = e.prototype;
        return a.dispose = function() {
            t.prototype.dispose.call(this)
        }
        ,
        i
    }(t.Timeline);
    t.SlotTimeline = i,
    egret.registerClass(i, "dragonBones.SlotTimeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e() {
            i.call(this),
            this.tweenRotate = 0,
            this.displayIndex = 0,
            this.tweenEasing = 10,
            this.tweenRotate = 0,
            this.tweenScale = !0,
            this.displayIndex = 0,
            this.visible = !0,
            this.zOrder = NaN,
            this.global = new t.DBTransform,
            this.transform = new t.DBTransform,
            this.pivot = new t.Point,
            this.scaleOffset = new t.Point
        }
        __extends(e, i);
        var a = (__define,
        e)
          , n = a.prototype;
        return n.dispose = function() {
            i.prototype.dispose.call(this),
            this.global = null,
            this.transform = null,
            this.pivot = null,
            this.scaleOffset = null,
            this.color = null
        }
        ,
        e
    }(t.Frame);
    t.TransformFrame = i,
    egret.registerClass(i, "dragonBones.TransformFrame")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function(i) {
        function e() {
            i.call(this),
            this.originTransform = new t.DBTransform,
            this.originTransform.scaleX = 1,
            this.originTransform.scaleY = 1,
            this.originPivot = new t.Point,
            this.offset = 0
        }
        __extends(e, i);
        var a = (__define,
        e)
          , n = a.prototype;
        return n.dispose = function() {
            i.prototype.dispose.call(this),
            this.originTransform = null,
            this.originPivot = null
        }
        ,
        e
    }(t.Timeline);
    t.TransformTimeline = i,
    egret.registerClass(i, "dragonBones.TransformTimeline")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {}
        var e = (__define,
        i);
        e.prototype;
        return i.parseDragonBonesData = function(e) {
            if (!e)
                throw new Error;
            var a = e[t.ConstValues.A_VERSION];
            if (a = a.toString(),
            a.toString() != t.DragonBones.DATA_VERSION && a.toString() != t.DragonBones.PARENT_COORDINATE_DATA_VERSION && "2.3" != a.toString())
                throw new Error("Nonsupport version!");
            var n = i.getNumber(e, t.ConstValues.A_FRAME_RATE, 0) || 0
              , s = new t.DragonBonesData;
            s.name = e[t.ConstValues.A_NAME],
            s.isGlobal = "0" == e[t.ConstValues.A_IS_GLOBAL] ? !1 : !0,
            i.tempDragonBonesData = s;
            for (var r = e[t.ConstValues.ARMATURE], o = 0, l = r.length; l > o; o++) {
                var h = r[o];
                s.addArmatureData(i.parseArmatureData(h, n))
            }
            return i.tempDragonBonesData = null,
            s
        }
        ,
        i.parseArmatureData = function(e, a) {
            var n = new t.ArmatureData;
            n.name = e[t.ConstValues.A_NAME];
            var s, r, o = e[t.ConstValues.BONE];
            for (s = 0,
            r = o.length; r > s; s++) {
                var l = o[s];
                n.addBoneData(i.parseBoneData(l))
            }
            var h = e[t.ConstValues.SKIN];
            for (s = 0,
            r = h.length; r > s; s++)
                for (var _ = h[s], u = _[t.ConstValues.SLOT], m = 0, f = u.length; f > m; m++) {
                    var d = u[m];
                    n.addSlotData(i.parseSlotData(d))
                }
            for (s = 0,
            r = h.length; r > s; s++) {
                var c = h[s];
                n.addSkinData(i.parseSkinData(c))
            }
            i.tempDragonBonesData.isGlobal && t.DBDataUtil.transformArmatureData(n),
            n.sortBoneDataList();
            var p = e[t.ConstValues.ANIMATION];
            for (s = 0,
            r = p.length; r > s; s++) {
                var g = p[s]
                  , T = i.parseAnimationData(g, a);
                t.DBDataUtil.addHideTimeline(T, n),
                t.DBDataUtil.transformAnimationData(T, n, i.tempDragonBonesData.isGlobal),
                n.addAnimationData(T)
            }
            return n
        }
        ,
        i.parseBoneData = function(e) {
            var a = new t.BoneData;
            return a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.length = Number(e[t.ConstValues.A_LENGTH]) || 0,
            a.inheritRotation = i.getBoolean(e, t.ConstValues.A_INHERIT_ROTATION, !0),
            a.inheritScale = i.getBoolean(e, t.ConstValues.A_INHERIT_SCALE, !0),
            i.parseTransform(e[t.ConstValues.TRANSFORM], a.transform),
            i.tempDragonBonesData.isGlobal && a.global.copy(a.transform),
            a
        }
        ,
        i.parseSkinData = function(e) {
            var a = new t.SkinData;
            a.name = e[t.ConstValues.A_NAME];
            for (var n = e[t.ConstValues.SLOT], s = 0, r = n.length; r > s; s++) {
                var o = n[s];
                a.addSlotData(i.parseSkinSlotData(o))
            }
            return a
        }
        ,
        i.parseSkinSlotData = function(e) {
            var a = new t.SlotData;
            a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.zOrder = e[t.ConstValues.A_Z_ORDER],
            a.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, 0) || 0,
            a.blendMode = e[t.ConstValues.A_BLENDMODE];
            var n = e[t.ConstValues.DISPLAY];
            if (n)
                for (var s = 0, r = n.length; r > s; s++) {
                    var o = n[s];
                    a.addDisplayData(i.parseDisplayData(o))
                }
            return a
        }
        ,
        i.parseSlotData = function(e) {
            var a = new t.SlotData;
            return a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.zOrder = e[t.ConstValues.A_Z_ORDER],
            a.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, 0) || 0,
            a.blendMode = e[t.ConstValues.A_BLENDMODE],
            a.displayIndex = 0,
            a
        }
        ,
        i.parseDisplayData = function(e) {
            var a = new t.DisplayData;
            return a.name = e[t.ConstValues.A_NAME],
            a.type = e[t.ConstValues.A_TYPE],
            i.parseTransform(e[t.ConstValues.TRANSFORM], a.transform, a.pivot),
            null != i.tempDragonBonesData && i.tempDragonBonesData.addDisplayData(a),
            a
        }
        ,
        i.parseAnimationData = function(e, a) {
            var n = new t.AnimationData;
            n.name = e[t.ConstValues.A_NAME],
            n.frameRate = a,
            n.duration = Math.round(1e3 * (i.getNumber(e, t.ConstValues.A_DURATION, 1) || 1) / a),
            n.playTimes = i.getNumber(e, t.ConstValues.A_LOOP, 1),
            n.playTimes = NaN != n.playTimes ? n.playTimes : 1,
            n.fadeTime = i.getNumber(e, t.ConstValues.A_FADE_IN_TIME, 0) || 0,
            n.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            n.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, NaN),
            n.autoTween = i.getBoolean(e, t.ConstValues.A_AUTO_TWEEN, !0);
            var s = e[t.ConstValues.FRAME]
              , r = 0
              , o = 0;
            if (s)
                for (r = 0,
                o = s.length; o > r; r++) {
                    var l = s[r]
                      , h = i.parseTransformFrame(l, null, a);
                    n.addFrame(h)
                }
            i.parseTimeline(e, n);
            var _, u = n.duration, m = e[t.ConstValues.TIMELINE];
            if (m) {
                for (r = 0,
                o = m.length; o > r; r++) {
                    var f = m[r]
                      , d = i.parseTransformTimeline(f, n.duration, a);
                    d = i.parseTransformTimeline(f, n.duration, a),
                    u = Math.min(u, d.frameList[d.frameList.length - 1].duration),
                    n.addTimeline(d);
                    var c = i.parseSlotTimeline(f, n.duration, a);
                    if (n.addSlotTimeline(c),
                    n.autoTween && !_)
                        for (var p, g = 0, T = c.frameList.length; T > g; g++)
                            if (p = c.frameList[g],
                            p && p.displayIndex < 0) {
                                _ = !0;
                                break
                            }
                }
                var v = n.tweenEasing;
                if (_) {
                    for (o = n.slotTimelineList.length,
                    r = 0; o > r; r++) {
                        c = n.slotTimelineList[r],
                        d = n.timelineList[r];
                        var D, A, y;
                        for (g = 0,
                        T = c.frameList.length; T > g; g++)
                            A = c.frameList[g],
                            D = d.frameList[g],
                            y = g == T - 1 ? c.frameList[0] : c.frameList[g + 1],
                            A.displayIndex < 0 || y.displayIndex < 0 ? D.tweenEasing = A.tweenEasing = NaN : 10 == v ? D.tweenEasing = A.tweenEasing = 0 : isNaN(v) ? 10 == D.tweenEasing && (D.tweenEasing = 0) : D.tweenEasing = A.tweenEasing = v
                    }
                    n.autoTween = !1
                }
            }
            return n.frameList.length > 0 && (u = Math.min(u, n.frameList[n.frameList.length - 1].duration)),
            n.lastFrameDuration = u,
            n
        }
        ,
        i.parseSlotTimeline = function(e, a, n) {
            var s = new t.SlotTimeline;
            s.name = e[t.ConstValues.A_NAME],
            s.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            s.offset = i.getNumber(e, t.ConstValues.A_OFFSET, 0) || 0,
            s.duration = a;
            for (var r = e[t.ConstValues.FRAME], o = 0, l = r.length; l > o; o++) {
                var h = r[o]
                  , _ = i.parseSlotFrame(h, n);
                s.addFrame(_)
            }
            return i.parseTimeline(e, s),
            s
        }
        ,
        i.parseSlotFrame = function(e, a) {
            var n = new t.SlotFrame;
            i.parseFrame(e, n, a),
            n.visible = !i.getBoolean(e, t.ConstValues.A_HIDE, !1),
            n.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, 10),
            n.displayIndex = Math.floor(i.getNumber(e, t.ConstValues.A_DISPLAY_INDEX, 0) || 0),
            n.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, i.tempDragonBonesData.isGlobal ? NaN : 0);
            var s = e[t.ConstValues.COLOR_TRANSFORM];
            return s && (n.color = new t.ColorTransform,
            i.parseColorTransform(s, n.color)),
            n
        }
        ,
        i.parseTransformTimeline = function(e, a, n) {
            var s = new t.TransformTimeline;
            s.name = e[t.ConstValues.A_NAME],
            s.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            s.offset = i.getNumber(e, t.ConstValues.A_OFFSET, 0) || 0,
            s.originPivot.x = i.getNumber(e, t.ConstValues.A_PIVOT_X, 0) || 0,
            s.originPivot.y = i.getNumber(e, t.ConstValues.A_PIVOT_Y, 0) || 0,
            s.duration = a;
            for (var r, o = e[t.ConstValues.FRAME], l = 0, h = o.length; h > l; l++) {
                var _ = o[l];
                r = h - 1 > l ? o[l + 1] : 0 != l ? o[0] : null;
                var u = i.parseTransformFrame(_, r, n);
                s.addFrame(u)
            }
            return i.parseTimeline(e, s),
            s
        }
        ,
        i.parseTransformFrame = function(e, a, n) {
            var s = new t.TransformFrame;
            return i.parseFrame(e, s, n),
            s.visible = !i.getBoolean(e, t.ConstValues.A_HIDE, !1),
            s.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, 10),
            s.tweenRotate = Math.floor(i.getNumber(e, t.ConstValues.A_TWEEN_ROTATE, 0) || 0),
            s.tweenScale = i.getBoolean(e, t.ConstValues.A_TWEEN_SCALE, !0),
            a && -1 == Math.floor(i.getNumber(a, t.ConstValues.A_DISPLAY_INDEX, 0) || 0) && (s.tweenEasing = NaN),
            i.parseTransform(e[t.ConstValues.TRANSFORM], s.transform, s.pivot),
            i.tempDragonBonesData.isGlobal && s.global.copy(s.transform),
            s.scaleOffset.x = i.getNumber(e, t.ConstValues.A_SCALE_X_OFFSET, 0) || 0,
            s.scaleOffset.y = i.getNumber(e, t.ConstValues.A_SCALE_Y_OFFSET, 0) || 0,
            s
        }
        ,
        i.parseTimeline = function(t, i) {
            for (var e, a = 0, n = i.frameList, s = 0, r = n.length; r > s; s++)
                e = n[s],
                e.position = a,
                a += e.duration;
            e && (e.duration = i.duration - e.position)
        }
        ,
        i.parseFrame = function(i, e, a) {
            void 0 === a && (a = 0),
            e.duration = Math.round(1e3 * (i[t.ConstValues.A_DURATION] || 1) / a),
            e.action = i[t.ConstValues.A_ACTION],
            e.event = i[t.ConstValues.A_EVENT],
            e.sound = i[t.ConstValues.A_SOUND]
        }
        ,
        i.parseTransform = function(e, a, n) {
            void 0 === n && (n = null),
            e && (a && (a.x = i.getNumber(e, t.ConstValues.A_X, 0) || 0,
            a.y = i.getNumber(e, t.ConstValues.A_Y, 0) || 0,
            a.skewX = i.getNumber(e, t.ConstValues.A_SKEW_X, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0,
            a.skewY = i.getNumber(e, t.ConstValues.A_SKEW_Y, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0,
            a.scaleX = i.getNumber(e, t.ConstValues.A_SCALE_X, 1) || 0,
            a.scaleY = i.getNumber(e, t.ConstValues.A_SCALE_Y, 1) || 0),
            n && (n.x = i.getNumber(e, t.ConstValues.A_PIVOT_X, 0) || 0,
            n.y = i.getNumber(e, t.ConstValues.A_PIVOT_Y, 0) || 0))
        }
        ,
        i.parseColorTransform = function(e, a) {
            e && a && (a.alphaOffset = i.getNumber(e, t.ConstValues.A_ALPHA_OFFSET, 0),
            a.redOffset = i.getNumber(e, t.ConstValues.A_RED_OFFSET, 0),
            a.greenOffset = i.getNumber(e, t.ConstValues.A_GREEN_OFFSET, 0),
            a.blueOffset = i.getNumber(e, t.ConstValues.A_BLUE_OFFSET, 0),
            a.alphaMultiplier = .01 * i.getNumber(e, t.ConstValues.A_ALPHA_MULTIPLIER, 100),
            a.redMultiplier = .01 * i.getNumber(e, t.ConstValues.A_RED_MULTIPLIER, 100),
            a.greenMultiplier = .01 * i.getNumber(e, t.ConstValues.A_GREEN_MULTIPLIER, 100),
            a.blueMultiplier = .01 * i.getNumber(e, t.ConstValues.A_BLUE_MULTIPLIER, 100))
        }
        ,
        i.getBoolean = function(t, i, e) {
            if (t && i in t)
                switch (String(t[i])) {
                case "0":
                case "NaN":
                case "":
                case "false":
                case "null":
                case "undefined":
                    return !1;
                case "1":
                case "true":
                default:
                    return !0
                }
            return e
        }
        ,
        i.getNumber = function(t, i, e) {
            if (t && i in t)
                switch (String(t[i])) {
                case "NaN":
                case "":
                case "false":
                case "null":
                case "undefined":
                    return NaN;
                default:
                    return Number(t[i])
                }
            return e
        }
        ,
        i
    }();
    t.Data3Parser = i,
    egret.registerClass(i, "dragonBones.Data3Parser")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {}
        var e = (__define,
        i);
        e.prototype;
        return i.parseTextureAtlasData = function(e, a) {
            void 0 === a && (a = 1);
            for (var n, s = {}, r = e[t.ConstValues.SUB_TEXTURE], o = 0, l = r.length; l > o; o++) {
                var h = r[o]
                  , _ = h[t.ConstValues.A_NAME]
                  , u = new t.Rectangle;
                u.x = i.getNumber(h, t.ConstValues.A_X, 0) / a,
                u.y = i.getNumber(h, t.ConstValues.A_Y, 0) / a,
                u.width = i.getNumber(h, t.ConstValues.A_WIDTH, 0) / a,
                u.height = i.getNumber(h, t.ConstValues.A_HEIGHT, 0) / a;
                var m = "true" == h[t.ConstValues.A_ROTATED]
                  , f = i.getNumber(h, t.ConstValues.A_FRAME_WIDTH, 0) / a
                  , d = i.getNumber(h, t.ConstValues.A_FRAME_HEIGHT, 0) / a;
                f > 0 && d > 0 ? (n = new t.Rectangle,
                n.x = i.getNumber(h, t.ConstValues.A_FRAME_X, 0) / a,
                n.y = i.getNumber(h, t.ConstValues.A_FRAME_Y, 0) / a,
                n.width = f,
                n.height = d) : n = null,
                s[_] = new t.TextureData(u,n,m)
            }
            return s
        }
        ,
        i.parseDragonBonesData = function(e) {
            if (!e)
                throw new Error;
            var a = e[t.ConstValues.A_VERSION];
            if (a = a.toString(),
            a.toString() != t.DragonBones.DATA_VERSION && a.toString() != t.DragonBones.PARENT_COORDINATE_DATA_VERSION && "2.3" != a.toString())
                throw new Error(egret.getString(4003));
            if (a.toString() == t.DragonBones.PARENT_COORDINATE_DATA_VERSION || "2.3" == a.toString())
                return t.Data3Parser.parseDragonBonesData(e);
            var n = i.getNumber(e, t.ConstValues.A_FRAME_RATE, 0) || 0
              , s = new t.DragonBonesData;
            s.name = e[t.ConstValues.A_NAME],
            s.isGlobal = "0" == e[t.ConstValues.A_IS_GLOBAL] ? !1 : !0,
            i.tempDragonBonesData = s;
            for (var r = e[t.ConstValues.ARMATURE], o = 0, l = r.length; l > o; o++) {
                var h = r[o];
                s.addArmatureData(i.parseArmatureData(h, n))
            }
            return i.tempDragonBonesData = null,
            s
        }
        ,
        i.parseArmatureData = function(e, a) {
            var n = new t.ArmatureData;
            n.name = e[t.ConstValues.A_NAME];
            var s, r, o = e[t.ConstValues.BONE];
            for (s = 0,
            r = o.length; r > s; s++) {
                var l = o[s];
                n.addBoneData(i.parseBoneData(l))
            }
            var h = e[t.ConstValues.SLOT];
            for (s = 0,
            r = h.length; r > s; s++) {
                var _ = h[s];
                n.addSlotData(i.parseSlotData(_))
            }
            var u = e[t.ConstValues.SKIN];
            for (s = 0,
            r = u.length; r > s; s++) {
                var m = u[s];
                n.addSkinData(i.parseSkinData(m))
            }
            i.tempDragonBonesData.isGlobal && t.DBDataUtil.transformArmatureData(n),
            n.sortBoneDataList();
            var f = e[t.ConstValues.ANIMATION];
            for (s = 0,
            r = f.length; r > s; s++) {
                var d = f[s]
                  , c = i.parseAnimationData(d, a);
                t.DBDataUtil.addHideTimeline(c, n, !0),
                t.DBDataUtil.transformAnimationData(c, n, i.tempDragonBonesData.isGlobal),
                n.addAnimationData(c)
            }
            return n
        }
        ,
        i.parseBoneData = function(e) {
            var a = new t.BoneData;
            return a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.length = Number(e[t.ConstValues.A_LENGTH]) || 0,
            a.inheritRotation = i.getBoolean(e, t.ConstValues.A_INHERIT_ROTATION, !0),
            a.inheritScale = i.getBoolean(e, t.ConstValues.A_INHERIT_SCALE, !0),
            i.parseTransform(e[t.ConstValues.TRANSFORM], a.transform),
            i.tempDragonBonesData.isGlobal && a.global.copy(a.transform),
            a
        }
        ,
        i.parseSkinData = function(e) {
            var a = new t.SkinData;
            a.name = e[t.ConstValues.A_NAME];
            for (var n = e[t.ConstValues.SLOT], s = 0, r = n.length; r > s; s++) {
                var o = n[s];
                a.addSlotData(i.parseSlotDisplayData(o))
            }
            return a
        }
        ,
        i.parseSlotData = function(e) {
            var a = new t.SlotData;
            return a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, 0) || 0,
            a.displayIndex = i.getNumber(e, t.ConstValues.A_DISPLAY_INDEX, 0),
            a.blendMode = e[t.ConstValues.A_BLENDMODE],
            a
        }
        ,
        i.parseSlotDisplayData = function(e) {
            var a = new t.SlotData;
            a.name = e[t.ConstValues.A_NAME],
            a.parent = e[t.ConstValues.A_PARENT],
            a.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, 0) || 0;
            var n = e[t.ConstValues.DISPLAY];
            if (n)
                for (var s = 0, r = n.length; r > s; s++) {
                    var o = n[s];
                    a.addDisplayData(i.parseDisplayData(o))
                }
            return a
        }
        ,
        i.parseDisplayData = function(e) {
            var a = new t.DisplayData;
            return a.name = e[t.ConstValues.A_NAME],
            a.type = e[t.ConstValues.A_TYPE],
            i.parseTransform(e[t.ConstValues.TRANSFORM], a.transform, a.pivot),
            a.pivot.x = NaN,
            a.pivot.y = NaN,
            null != i.tempDragonBonesData && i.tempDragonBonesData.addDisplayData(a),
            a
        }
        ,
        i.parseAnimationData = function(e, a) {
            var n = new t.AnimationData;
            n.name = e[t.ConstValues.A_NAME],
            n.frameRate = a,
            n.duration = Math.ceil(1e3 * (i.getNumber(e, t.ConstValues.A_DURATION, 1) || 1) / a),
            n.playTimes = i.getNumber(e, t.ConstValues.A_PLAY_TIMES, 1),
            n.playTimes = NaN != n.playTimes ? n.playTimes : 1,
            n.fadeTime = i.getNumber(e, t.ConstValues.A_FADE_IN_TIME, 0) || 0,
            n.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            n.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, NaN),
            n.autoTween = i.getBoolean(e, t.ConstValues.A_AUTO_TWEEN, !0);
            var s = e[t.ConstValues.FRAME]
              , r = 0
              , o = 0;
            if (s)
                for (r = 0,
                o = s.length; o > r; r++) {
                    var l = s[r]
                      , h = i.parseTransformFrame(l, a);
                    n.addFrame(h)
                }
            i.parseTimeline(e, n);
            var _ = n.duration
              , u = e[t.ConstValues.BONE];
            if (u)
                for (r = 0,
                o = u.length; o > r; r++) {
                    var m = u[r];
                    if (m) {
                        var f = i.parseTransformTimeline(m, n.duration, a);
                        f.frameList.length > 0 && (_ = Math.min(_, f.frameList[f.frameList.length - 1].duration)),
                        n.addTimeline(f)
                    }
                }
            var d = e[t.ConstValues.SLOT];
            if (d)
                for (r = 0,
                o = d.length; o > r; r++) {
                    var c = d[r];
                    if (c) {
                        var p = i.parseSlotTimeline(c, n.duration, a);
                        p.frameList.length > 0 && (_ = Math.min(_, p.frameList[p.frameList.length - 1].duration),
                        n.addSlotTimeline(p))
                    }
                }
            return n.frameList.length > 0 && (_ = Math.min(_, n.frameList[n.frameList.length - 1].duration)),
            n.lastFrameDuration = _,
            n
        }
        ,
        i.parseTransformTimeline = function(e, a, n) {
            var s = new t.TransformTimeline;
            s.name = e[t.ConstValues.A_NAME],
            s.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            s.offset = i.getNumber(e, t.ConstValues.A_OFFSET, 0) || 0,
            s.originPivot.x = i.getNumber(e, t.ConstValues.A_PIVOT_X, 0) || 0,
            s.originPivot.y = i.getNumber(e, t.ConstValues.A_PIVOT_Y, 0) || 0,
            s.duration = a;
            for (var r = e[t.ConstValues.FRAME], o = 0, l = r.length; l > o; o++) {
                var h = r[o]
                  , _ = i.parseTransformFrame(h, n);
                s.addFrame(_)
            }
            return i.parseTimeline(e, s),
            s
        }
        ,
        i.parseSlotTimeline = function(e, a, n) {
            var s = new t.SlotTimeline;
            s.name = e[t.ConstValues.A_NAME],
            s.scale = i.getNumber(e, t.ConstValues.A_SCALE, 1) || 0,
            s.offset = i.getNumber(e, t.ConstValues.A_OFFSET, 0) || 0,
            s.duration = a;
            for (var r = e[t.ConstValues.FRAME], o = 0, l = r.length; l > o; o++) {
                var h = r[o]
                  , _ = i.parseSlotFrame(h, n);
                s.addFrame(_)
            }
            return i.parseTimeline(e, s),
            s
        }
        ,
        i.parseTransformFrame = function(e, a) {
            var n = new t.TransformFrame;
            return i.parseFrame(e, n, a),
            n.visible = !i.getBoolean(e, t.ConstValues.A_HIDE, !1),
            n.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, 10),
            n.tweenRotate = Math.floor(i.getNumber(e, t.ConstValues.A_TWEEN_ROTATE, 0) || 0),
            n.tweenScale = i.getBoolean(e, t.ConstValues.A_TWEEN_SCALE, !0),
            n.displayIndex = Math.floor(i.getNumber(e, t.ConstValues.A_DISPLAY_INDEX, 0) || 0),
            i.parseTransform(e[t.ConstValues.TRANSFORM], n.transform, n.pivot),
            i.tempDragonBonesData.isGlobal && n.global.copy(n.transform),
            n.scaleOffset.x = i.getNumber(e, t.ConstValues.A_SCALE_X_OFFSET, 0) || 0,
            n.scaleOffset.y = i.getNumber(e, t.ConstValues.A_SCALE_Y_OFFSET, 0) || 0,
            n
        }
        ,
        i.parseSlotFrame = function(e, a) {
            var n = new t.SlotFrame;
            i.parseFrame(e, n, a),
            n.visible = !i.getBoolean(e, t.ConstValues.A_HIDE, !1),
            n.tweenEasing = i.getNumber(e, t.ConstValues.A_TWEEN_EASING, 10),
            n.displayIndex = Math.floor(i.getNumber(e, t.ConstValues.A_DISPLAY_INDEX, 0) || 0),
            n.zOrder = i.getNumber(e, t.ConstValues.A_Z_ORDER, i.tempDragonBonesData.isGlobal ? NaN : 0);
            var s = e[t.ConstValues.COLOR];
            return s && (n.color = new t.ColorTransform,
            i.parseColorTransform(s, n.color)),
            n
        }
        ,
        i.parseTimeline = function(t, i) {
            for (var e, a = 0, n = i.frameList, s = 0, r = n.length; r > s; s++)
                e = n[s],
                e.position = a,
                a += e.duration;
            e && (e.duration = i.duration - e.position)
        }
        ,
        i.parseFrame = function(i, e, a) {
            void 0 === a && (a = 0),
            e.duration = Math.round(1e3 * (i[t.ConstValues.A_DURATION] || 1) / a),
            e.action = i[t.ConstValues.A_ACTION],
            e.event = i[t.ConstValues.A_EVENT],
            e.sound = i[t.ConstValues.A_SOUND];
            var n = i[t.ConstValues.A_CURVE];
            null != n && 4 == n.length && (e.curve = new t.CurveData,
            e.curve.pointList = [new t.Point(n[0],n[1]), new t.Point(n[2],n[3])])
        }
        ,
        i.parseTransform = function(e, a, n) {
            void 0 === n && (n = null),
            e && (a && (a.x = i.getNumber(e, t.ConstValues.A_X, 0) || 0,
            a.y = i.getNumber(e, t.ConstValues.A_Y, 0) || 0,
            a.skewX = i.getNumber(e, t.ConstValues.A_SKEW_X, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0,
            a.skewY = i.getNumber(e, t.ConstValues.A_SKEW_Y, 0) * t.ConstValues.ANGLE_TO_RADIAN || 0,
            a.scaleX = i.getNumber(e, t.ConstValues.A_SCALE_X, 1) || 0,
            a.scaleY = i.getNumber(e, t.ConstValues.A_SCALE_Y, 1) || 0),
            n && (n.x = i.getNumber(e, t.ConstValues.A_PIVOT_X, 0) || 0,
            n.y = i.getNumber(e, t.ConstValues.A_PIVOT_Y, 0) || 0))
        }
        ,
        i.parseColorTransform = function(e, a) {
            a && (a.alphaOffset = i.getNumber(e, t.ConstValues.A_ALPHA_OFFSET, 0),
            a.redOffset = i.getNumber(e, t.ConstValues.A_RED_OFFSET, 0),
            a.greenOffset = i.getNumber(e, t.ConstValues.A_GREEN_OFFSET, 0),
            a.blueOffset = i.getNumber(e, t.ConstValues.A_BLUE_OFFSET, 0),
            a.alphaMultiplier = .01 * i.getNumber(e, t.ConstValues.A_ALPHA_MULTIPLIER, 100),
            a.redMultiplier = .01 * i.getNumber(e, t.ConstValues.A_RED_MULTIPLIER, 100),
            a.greenMultiplier = .01 * i.getNumber(e, t.ConstValues.A_GREEN_MULTIPLIER, 100),
            a.blueMultiplier = .01 * i.getNumber(e, t.ConstValues.A_BLUE_MULTIPLIER, 100))
        }
        ,
        i.getBoolean = function(t, i, e) {
            if (t && i in t)
                switch (String(t[i])) {
                case "0":
                case "NaN":
                case "":
                case "false":
                case "null":
                case "undefined":
                    return !1;
                case "1":
                case "true":
                default:
                    return !0
                }
            return e
        }
        ,
        i.getNumber = function(t, i, e) {
            if (t && i in t)
                switch (String(t[i])) {
                case "NaN":
                case "":
                case "false":
                case "null":
                case "undefined":
                    return NaN;
                default:
                    return Number(t[i])
                }
            return e
        }
        ,
        i
    }();
    t.DataParser = i,
    egret.registerClass(i, "dragonBones.DataParser")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t(t, i, e) {
            this.region = t,
            this.frame = i,
            this.rotated = e
        }
        var i = (__define,
        t);
        i.prototype;
        return t
    }();
    t.TextureData = i,
    egret.registerClass(i, "dragonBones.TextureData")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {}
        var e = (__define,
        i);
        e.prototype;
        return i.cloneColor = function(i) {
            var e = new t.ColorTransform;
            return e.redMultiplier = i.redMultiplier,
            e.greenMultiplier = i.greenMultiplier,
            e.blueMultiplier = i.blueMultiplier,
            e.alphaMultiplier = i.alphaMultiplier,
            e.redOffset = i.redOffset,
            e.greenOffset = i.greenOffset,
            e.blueOffset = i.blueOffset,
            e.alphaOffset = i.alphaOffset,
            e
        }
        ,
        i.isEqual = function(t, i) {
            return t.alphaOffset == i.alphaOffset && t.redOffset == i.redOffset && t.greenOffset == i.greenOffset && t.blueOffset == i.blueOffset && t.alphaMultiplier == i.alphaMultiplier && t.redMultiplier == i.redMultiplier && t.greenMultiplier == i.greenMultiplier && t.blueMultiplier == i.blueMultiplier
        }
        ,
        i.minus = function(t, i, e) {
            e.alphaOffset = t.alphaOffset - i.alphaOffset,
            e.redOffset = t.redOffset - i.redOffset,
            e.greenOffset = t.greenOffset - i.greenOffset,
            e.blueOffset = t.blueOffset - i.blueOffset,
            e.alphaMultiplier = t.alphaMultiplier - i.alphaMultiplier,
            e.redMultiplier = t.redMultiplier - i.redMultiplier,
            e.greenMultiplier = t.greenMultiplier - i.greenMultiplier,
            e.blueMultiplier = t.blueMultiplier - i.blueMultiplier
        }
        ,
        i.originalColor = new t.ColorTransform,
        i
    }();
    t.ColorTransformUtil = i,
    egret.registerClass(i, "dragonBones.ColorTransformUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {}
        var i = (__define,
        t);
        i.prototype;
        return t.ANGLE_TO_RADIAN = Math.PI / 180,
        t.RADIAN_TO_ANGLE = 180 / Math.PI,
        t.DRAGON_BONES = "dragonBones",
        t.ARMATURE = "armature",
        t.SKIN = "skin",
        t.BONE = "bone",
        t.SLOT = "slot",
        t.DISPLAY = "display",
        t.ANIMATION = "animation",
        t.TIMELINE = "timeline",
        t.FRAME = "frame",
        t.TRANSFORM = "transform",
        t.COLOR_TRANSFORM = "colorTransform",
        t.COLOR = "color",
        t.RECTANGLE = "rectangle",
        t.ELLIPSE = "ellipse",
        t.TEXTURE_ATLAS = "TextureAtlas",
        t.SUB_TEXTURE = "SubTexture",
        t.A_ROTATED = "rotated",
        t.A_FRAME_X = "frameX",
        t.A_FRAME_Y = "frameY",
        t.A_FRAME_WIDTH = "frameWidth",
        t.A_FRAME_HEIGHT = "frameHeight",
        t.A_VERSION = "version",
        t.A_IMAGE_PATH = "imagePath",
        t.A_FRAME_RATE = "frameRate",
        t.A_NAME = "name",
        t.A_IS_GLOBAL = "isGlobal",
        t.A_PARENT = "parent",
        t.A_LENGTH = "length",
        t.A_TYPE = "type",
        t.A_FADE_IN_TIME = "fadeInTime",
        t.A_DURATION = "duration",
        t.A_SCALE = "scale",
        t.A_OFFSET = "offset",
        t.A_LOOP = "loop",
        t.A_PLAY_TIMES = "playTimes",
        t.A_EVENT = "event",
        t.A_EVENT_PARAMETERS = "eventParameters",
        t.A_SOUND = "sound",
        t.A_ACTION = "action",
        t.A_HIDE = "hide",
        t.A_AUTO_TWEEN = "autoTween",
        t.A_TWEEN_EASING = "tweenEasing",
        t.A_TWEEN_ROTATE = "tweenRotate",
        t.A_TWEEN_SCALE = "tweenScale",
        t.A_DISPLAY_INDEX = "displayIndex",
        t.A_Z_ORDER = "z",
        t.A_BLENDMODE = "blendMode",
        t.A_WIDTH = "width",
        t.A_HEIGHT = "height",
        t.A_INHERIT_SCALE = "inheritScale",
        t.A_INHERIT_ROTATION = "inheritRotation",
        t.A_X = "x",
        t.A_Y = "y",
        t.A_SKEW_X = "skX",
        t.A_SKEW_Y = "skY",
        t.A_SCALE_X = "scX",
        t.A_SCALE_Y = "scY",
        t.A_PIVOT_X = "pX",
        t.A_PIVOT_Y = "pY",
        t.A_ALPHA_OFFSET = "aO",
        t.A_RED_OFFSET = "rO",
        t.A_GREEN_OFFSET = "gO",
        t.A_BLUE_OFFSET = "bO",
        t.A_ALPHA_MULTIPLIER = "aM",
        t.A_RED_MULTIPLIER = "rM",
        t.A_GREEN_MULTIPLIER = "gM",
        t.A_BLUE_MULTIPLIER = "bM",
        t.A_CURVE = "curve",
        t.A_SCALE_X_OFFSET = "scXOffset",
        t.A_SCALE_Y_OFFSET = "scYOffset",
        t.A_SCALE_MODE = "scaleMode",
        t.A_FIXED_ROTATION = "fixedRotation",
        t
    }();
    t.ConstValues = i,
    egret.registerClass(i, "dragonBones.ConstValues")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {}
        var e = (__define,
        i);
        e.prototype;
        return i.transformArmatureData = function(i) {
            for (var e = i.boneDataList, a = e.length; a--; ) {
                var n = e[a];
                if (n.parent) {
                    var s = i.getBoneData(n.parent);
                    s && (n.transform.copy(n.global),
                    t.TransformUtil.globalToLocal(n.transform, s.global))
                }
            }
        }
        ,
        i.transformArmatureDataAnimations = function(t) {
            for (var e = t.animationDataList, a = e.length; a--; )
                i.transformAnimationData(e[a], t, !1)
        }
        ,
        i.transformRelativeAnimationData = function(t, i) {}
        ,
        i.transformAnimationData = function(e, a, n) {
            if (!n)
                return void i.transformRelativeAnimationData(e, a);
            var s, r = a.getSkinData(null), o = a.boneDataList;
            r && (s = r.slotDataList);
            for (var l = 0; l < o.length; l++) {
                var h = o[l]
                  , _ = e.getTimeline(h.name)
                  , u = e.getSlotTimeline(h.name);
                if (_ || u) {
                    var m = null;
                    if (s)
                        for (var f = 0, d = s.length; d > f && (m = s[f],
                        m.parent != h.name); f++)
                            ;
                    var c = _.frameList;
                    if (u)
                        var p = u.frameList;
                    for (var g = null, T = c.length, f = 0; T > f; f++) {
                        var v = c[f];
                        if (i.setFrameTransform(e, a, h, v),
                        v.transform.x -= h.transform.x,
                        v.transform.y -= h.transform.y,
                        v.transform.skewX -= h.transform.skewX,
                        v.transform.skewY -= h.transform.skewY,
                        v.transform.scaleX /= h.transform.scaleX,
                        v.transform.scaleY /= h.transform.scaleY,
                        g) {
                            var D = v.transform.skewX - g.transform.skewX;
                            g.tweenRotate ? g.tweenRotate > 0 ? (0 > D && (v.transform.skewX += 2 * Math.PI,
                            v.transform.skewY += 2 * Math.PI),
                            g.tweenRotate > 1 && (v.transform.skewX += 2 * Math.PI * (g.tweenRotate - 1),
                            v.transform.skewY += 2 * Math.PI * (g.tweenRotate - 1))) : (D > 0 && (v.transform.skewX -= 2 * Math.PI,
                            v.transform.skewY -= 2 * Math.PI),
                            g.tweenRotate < 1 && (v.transform.skewX += 2 * Math.PI * (g.tweenRotate + 1),
                            v.transform.skewY += 2 * Math.PI * (g.tweenRotate + 1))) : (v.transform.skewX = g.transform.skewX + t.TransformUtil.formatRadian(v.transform.skewX - g.transform.skewX),
                            v.transform.skewY = g.transform.skewY + t.TransformUtil.formatRadian(v.transform.skewY - g.transform.skewY))
                        }
                        g = v
                    }
                    if (u && p) {
                        T = p.length;
                        for (var f = 0; T > f; f++) {
                            var A = p[f];
                            u.transformed || m && (A.zOrder -= m.zOrder)
                        }
                        u.transformed = !0
                    }
                    _.transformed = !0
                }
            }
        }
        ,
        i.setFrameTransform = function(e, a, n, s) {
            s.transform.copy(s.global);
            var r = a.getBoneData(n.parent);
            if (r) {
                var o = e.getTimeline(r.name);
                if (o) {
                    for (var l = [], h = []; o; )
                        l.push(o),
                        h.push(r),
                        r = a.getBoneData(r.parent),
                        o = r ? e.getTimeline(r.name) : null;
                    for (var _, u = l.length, m = new t.Matrix, f = new t.DBTransform, d = new t.Matrix; u--; )
                        o = l[u],
                        r = h[u],
                        i.getTimelineTransform(o, s.position, f, !_),
                        _ ? (f.x += o.originTransform.x + r.transform.x,
                        f.y += o.originTransform.y + r.transform.y,
                        f.skewX += o.originTransform.skewX + r.transform.skewX,
                        f.skewY += o.originTransform.skewY + r.transform.skewY,
                        f.scaleX *= o.originTransform.scaleX * r.transform.scaleX,
                        f.scaleY *= o.originTransform.scaleY * r.transform.scaleY,
                        t.TransformUtil.transformToMatrix(f, d, !0),
                        d.concat(m),
                        t.TransformUtil.matrixToTransform(d, _, f.scaleX * _.scaleX >= 0, f.scaleY * _.scaleY >= 0)) : (_ = new t.DBTransform,
                        _.copy(f)),
                        t.TransformUtil.transformToMatrix(_, m, !0);
                    t.TransformUtil.globalToLocal(s.transform, _)
                }
            }
        }
        ,
        i.getTimelineTransform = function(i, e, a, n) {
            for (var s = i.frameList, r = s.length; r--; ) {
                var o = s[r];
                if (o.position <= e && o.position + o.duration > e) {
                    if (r == s.length - 1 || e == o.position)
                        a.copy(n ? o.global : o.transform);
                    else {
                        var l = o.tweenEasing
                          , h = (e - o.position) / o.duration;
                        l && 10 != l && (h = t.MathUtil.getEaseValue(h, l));
                        var _ = s[r + 1]
                          , u = n ? o.global : o.transform
                          , m = n ? _.global : _.transform;
                        a.x = u.x + (m.x - u.x) * h,
                        a.y = u.y + (m.y - u.y) * h,
                        a.skewX = t.TransformUtil.formatRadian(u.skewX + (m.skewX - u.skewX) * h),
                        a.skewY = t.TransformUtil.formatRadian(u.skewY + (m.skewY - u.skewY) * h),
                        a.scaleX = u.scaleX + (m.scaleX - u.scaleX) * h,
                        a.scaleY = u.scaleY + (m.scaleY - u.scaleY) * h
                    }
                    break
                }
            }
        }
        ,
        i.addHideTimeline = function(t, i, e) {
            void 0 === e && (e = !1);
            for (var a = i.boneDataList, n = i.slotDataList, s = a.length; s--; ) {
                var r = a[s]
                  , o = r.name;
                t.getTimeline(o) || t.hideTimelineNameMap.indexOf(o) < 0 && t.hideTimelineNameMap.push(o)
            }
            if (e) {
                s = n.length;
                for (var l, h; s--; )
                    l = n[s],
                    h = l.name,
                    t.getSlotTimeline(h) || t.hideSlotTimelineNameMap.indexOf(h) < 0 && t.hideSlotTimelineNameMap.push(h)
            }
        }
        ,
        i
    }();
    t.DBDataUtil = i,
    egret.registerClass(i, "dragonBones.DBDataUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function t() {}
        var i = (__define,
        t);
        i.prototype;
        return t.getEaseValue = function(i, e) {
            var a = 1;
            return e > 1 ? (a = .5 * (1 - t.cos(i * Math.PI)),
            e -= 1) : e > 0 ? a = 1 - Math.pow(1 - i, 2) : 0 > e && (e *= -1,
            a = Math.pow(i, 2)),
            (a - i) * e + i
        }
        ,
        t.isNumber = function(t) {
            return "number" == typeof t && !isNaN(t)
        }
        ,
        t.sin = function(i) {
            i *= t.RADIAN_TO_ANGLE;
            var e = Math.floor(i)
              , a = e + 1
              , n = t.sinInt(e)
              , s = t.sinInt(a);
            return (i - e) * s + (a - i) * n
        }
        ,
        t.sinInt = function(t) {
            return t %= 360,
            0 > t && (t += 360),
            90 > t ? db_sin_map[t] : 180 > t ? db_sin_map[180 - t] : 270 > t ? -db_sin_map[t - 180] : -db_sin_map[360 - t]
        }
        ,
        t.cos = function(i) {
            return t.sin(Math.PI / 2 - i)
        }
        ,
        t.ANGLE_TO_RADIAN = Math.PI / 180,
        t.RADIAN_TO_ANGLE = 180 / Math.PI,
        t
    }();
    t.MathUtil = i,
    egret.registerClass(i, "dragonBones.MathUtil")
}(dragonBones || (dragonBones = {}));
for (var db_sin_map = {}, dbMathIndex = 0; 90 >= dbMathIndex; dbMathIndex++)
    db_sin_map[dbMathIndex] = Math.sin(dbMathIndex * dragonBones.MathUtil.ANGLE_TO_RADIAN);
var dragonBones;
!function(t) {
    var i = function() {
        function i() {}
        var e = (__define,
        i);
        e.prototype;
        return i.globalToLocal = function(t, e) {
            i.transformToMatrix(t, i._helpTransformMatrix, !0),
            i.transformToMatrix(e, i._helpParentTransformMatrix, !0),
            i._helpParentTransformMatrix.invert(),
            i._helpTransformMatrix.concat(i._helpParentTransformMatrix),
            i.matrixToTransform(i._helpTransformMatrix, t, t.scaleX * e.scaleX >= 0, t.scaleY * e.scaleY >= 0)
        }
        ,
        i.transformToMatrix = function(i, e, a) {
            void 0 === a && (a = !1),
            a ? (e.a = i.scaleX * t.MathUtil.cos(i.skewY),
            e.b = i.scaleX * t.MathUtil.sin(i.skewY),
            e.c = -i.scaleY * t.MathUtil.sin(i.skewX),
            e.d = i.scaleY * t.MathUtil.cos(i.skewX),
            e.tx = i.x,
            e.ty = i.y) : (e.a = t.MathUtil.cos(i.skewY),
            e.b = t.MathUtil.sin(i.skewY),
            e.c = -t.MathUtil.sin(i.skewX),
            e.d = t.MathUtil.cos(i.skewX),
            e.tx = i.x,
            e.ty = i.y)
        }
        ,
        i.matrixToTransform = function(t, i, e, a) {
            i.x = t.tx,
            i.y = t.ty,
            i.scaleX = Math.sqrt(t.a * t.a + t.b * t.b) * (e ? 1 : -1),
            i.scaleY = Math.sqrt(t.d * t.d + t.c * t.c) * (a ? 1 : -1);
            var n = [];
            n[0] = Math.acos(t.d / i.scaleY),
            n[1] = -n[0],
            n[2] = Math.asin(-t.c / i.scaleY),
            n[3] = n[2] >= 0 ? Math.PI - n[2] : n[2] - Math.PI,
            Number(n[0]).toFixed(4) == Number(n[2]).toFixed(4) || Number(n[0]).toFixed(4) == Number(n[3]).toFixed(4) ? i.skewX = n[0] : i.skewX = n[1];
            var s = [];
            s[0] = Math.acos(t.a / i.scaleX),
            s[1] = -s[0],
            s[2] = Math.asin(t.b / i.scaleX),
            s[3] = s[2] >= 0 ? Math.PI - s[2] : s[2] - Math.PI,
            Number(s[0]).toFixed(4) == Number(s[2]).toFixed(4) || Number(s[0]).toFixed(4) == Number(s[3]).toFixed(4) ? i.skewY = s[0] : i.skewY = s[1]
        }
        ,
        i.formatRadian = function(t) {
            return t > Math.PI && (t -= i.DOUBLE_PI),
            t < -Math.PI && (t += i.DOUBLE_PI),
            t
        }
        ,
        i.normalizeRotation = function(t) {
            return t = (t + Math.PI) % (2 * Math.PI),
            t = t > 0 ? t : 2 * Math.PI + t,
            t - Math.PI
        }
        ,
        i.HALF_PI = .5 * Math.PI,
        i.DOUBLE_PI = 2 * Math.PI,
        i._helpTransformMatrix = new t.Matrix,
        i._helpParentTransformMatrix = new t.Matrix,
        i
    }();
    t.TransformUtil = i,
    egret.registerClass(i, "dragonBones.TransformUtil")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i(i) {
            this.animationState = new t.FastAnimationState,
            this._armature = i,
            this.animationState._armature = i,
            this.animationList = [],
            this._animationDataObj = {},
            this._isPlaying = !1,
            this._timeScale = 1
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return n.dispose = function() {
            this._armature && (this._armature = null,
            this._animationDataList = null,
            this.animationList = null,
            this.animationState = null)
        }
        ,
        n.gotoAndPlay = function(t, i, e, a) {
            if (void 0 === i && (i = -1),
            void 0 === e && (e = -1),
            void 0 === a && (a = NaN),
            !this._animationDataList)
                return null;
            var n = this._animationDataObj[t];
            if (!n)
                return null;
            this._isPlaying = !0,
            i = 0 > i ? n.fadeTime < 0 ? .3 : n.fadeTime : i;
            var s;
            s = 0 > e ? n.scale < 0 ? 1 : n.scale : 1e3 * e / n.duration,
            a = isNaN(a) ? n.playTimes : a,
            this.animationState._fadeIn(n, a, 1 / s, i),
            this._armature.enableCache && this.animationCacheManager && (this.animationState.animationCache = this.animationCacheManager.getAnimationCache(t));
            for (var r = this._armature.slotHasChildArmatureList.length; r--; ) {
                var o = this._armature.slotHasChildArmatureList[r]
                  , l = o.childArmature;
                l && l.getAnimation().gotoAndPlay(t)
            }
            return this.animationState
        }
        ,
        n.gotoAndStop = function(t, i, e, a, n) {
            return void 0 === e && (e = -1),
            void 0 === a && (a = 0),
            void 0 === n && (n = -1),
            this.animationState.name != t && this.gotoAndPlay(t, a, n),
            e >= 0 ? this.animationState.setCurrentTime(this.animationState.totalTime * e) : this.animationState.setCurrentTime(i),
            this.animationState.stop(),
            this.animationState
        }
        ,
        n.play = function() {
            this._animationDataList && (this.animationState.name ? this._isPlaying ? this.gotoAndPlay(this.animationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
        }
        ,
        n.stop = function() {
            this._isPlaying = !1
        }
        ,
        n.advanceTime = function(t) {
            this._isPlaying && this.animationState._advanceTime(t * this._timeScale)
        }
        ,
        n.hasAnimation = function(t) {
            return null != this._animationDataObj[t]
        }
        ,
        e(n, "timeScale", function() {
            return this._timeScale
        }, function(t) {
            (isNaN(t) || 0 > t) && (t = 1),
            this._timeScale = t
        }),
        e(n, "animationDataList", function() {
            return this._animationDataList
        }, function(t) {
            this._animationDataList = t,
            this.animationList.length = 0;
            for (var i = this._animationDataList.length, e = 0; i > e; e++) {
                var a = this._animationDataList[e];
                this.animationList.push(a.name),
                this._animationDataObj[a.name] = a
            }
        }),
        e(n, "movementList", function() {
            return this.animationList
        }),
        e(n, "movementID", function() {
            return this.lastAnimationName
        }),
        n.isPlaying = function() {
            return this._isPlaying && !this.isComplete
        }
        ,
        e(n, "isComplete", function() {
            return this.animationState.isComplete
        }),
        e(n, "lastAnimationState", function() {
            return this.animationState
        }),
        e(n, "lastAnimationName", function() {
            return this.animationState ? this.animationState.name : null
        }),
        i
    }();
    t.FastAnimation = i,
    egret.registerClass(i, "dragonBones.FastAnimation")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._boneTimelineStateList = [],
            this._slotTimelineStateList = [],
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._currentPlayTimes = 0,
            this._totalTime = 0,
            this._currentTime = 0,
            this._lastTime = 0,
            this._playTimes = 0,
            this._fading = !1
        }
        var e = __define
          , a = i
          , n = a.prototype;
        return n.dispose = function() {
            this._resetTimelineStateList(),
            this._armature = null
        }
        ,
        n.play = function() {
            return this._isPlaying = !0,
            this
        }
        ,
        n.stop = function() {
            return this._isPlaying = !1,
            this
        }
        ,
        n.setCurrentTime = function(t) {
            return (0 > t || isNaN(t)) && (t = 0),
            this._time = t,
            this._currentTime = 1e3 * this._time,
            this
        }
        ,
        n._resetTimelineStateList = function() {
            for (var i = this._boneTimelineStateList.length; i--; )
                t.FastBoneTimelineState.returnObject(this._boneTimelineStateList[i]);
            for (this._boneTimelineStateList.length = 0,
            i = this._slotTimelineStateList.length; i--; )
                t.FastSlotTimelineState.returnObject(this._slotTimelineStateList[i]);
            this._slotTimelineStateList.length = 0,
            this.name = null
        }
        ,
        n._fadeIn = function(t, i, e, a) {
            this.animationData = t,
            this.name = this.animationData.name,
            this._totalTime = this.animationData.duration,
            this.autoTween = t.autoTween,
            this.setTimeScale(e),
            this.setPlayTimes(i),
            this._isComplete = !1,
            this._currentFrameIndex = -1,
            this._currentPlayTimes = -1,
            Math.round(this._totalTime * this.animationData.frameRate * .001) < 2 ? this._currentTime = this._totalTime : this._currentTime = -1,
            this._fadeTotalTime = a * this._timeScale,
            this._fading = this._fadeTotalTime > 0,
            this._isPlaying = !0,
            this._armature.enableCache && this.animationCache && this._fading && this._boneTimelineStateList && this.updateTransformTimeline(this.progress),
            this._time = 0,
            this._progress = 0,
            this._updateTimelineStateList(),
            this.hideBones()
        }
        ,
        n._updateTimelineStateList = function() {
            this._resetTimelineStateList();
            for (var i, e = this.animationData.timelineList.length, a = 0; e > a; a++) {
                var n = this.animationData.timelineList[a];
                i = n.name;
                var s = this._armature.getBone(i);
                if (s) {
                    var r = t.FastBoneTimelineState.borrowObject();
                    r.fadeIn(s, this, n),
                    this._boneTimelineStateList.push(r)
                }
            }
            for (var o = this.animationData.slotTimelineList.length, l = 0; o > l; l++) {
                var h = this.animationData.slotTimelineList[l];
                i = h.name;
                var _ = this._armature.getSlot(i);
                if (_ && _.displayList.length > 0) {
                    var u = t.FastSlotTimelineState.borrowObject();
                    u.fadeIn(_, this, h),
                    this._slotTimelineStateList.push(u)
                }
            }
        }
        ,
        n._advanceTime = function(t) {
            if (t *= this._timeScale,
            this._fading && (this._time += t,
            this._progress = this._time / this._fadeTotalTime,
            this._progress >= 1 && (this._progress = 0,
            this._time = 0,
            this._fading = !1)),
            this._fading) {
                for (var i = this._boneTimelineStateList.length, e = 0; i > e; e++) {
                    var a = this._boneTimelineStateList[e];
                    a.updateFade(this.progress)
                }
                for (var n = this._slotTimelineStateList.length, s = 0; n > s; s++) {
                    var r = this._slotTimelineStateList[s];
                    r.updateFade(this.progress)
                }
            } else
                this.advanceTimelinesTime(t)
        }
        ,
        n.advanceTimelinesTime = function(i) {
            this._isPlaying && (this._time += i);
            var e = !1
              , a = !1
              , n = !1
              , s = !1
              , r = 0
              , o = 1e3 * this._time;
            0 == this._playTimes || o < this._playTimes * this._totalTime ? (s = !1,
            this._progress = o / this._totalTime,
            r = Math.ceil(this.progress) || 1,
            this._progress -= Math.floor(this.progress),
            o %= this._totalTime) : (r = this._playTimes,
            o = this._totalTime,
            s = !0,
            this._progress = 1),
            this._isComplete = s,
            this.isUseCache() ? this.animationCache.update(this.progress) : this.updateTransformTimeline(this.progress),
            this._currentTime != o && (this._currentPlayTimes != r && (this._currentPlayTimes > 0 && r > 1 && (a = !0),
            this._currentPlayTimes = r),
            this._currentTime < 0 && (e = !0),
            this._isComplete && (n = !0),
            this._lastTime = this._currentTime,
            this._currentTime = o,
            this.updateMainTimeline(s));
            var l;
            e && this._armature.hasEventListener(t.AnimationEvent.START) && (l = new t.AnimationEvent(t.AnimationEvent.START),
            l.animationState = this,
            this._armature._addEvent(l)),
            n ? this._armature.hasEventListener(t.AnimationEvent.COMPLETE) && (l = new t.AnimationEvent(t.AnimationEvent.COMPLETE),
            l.animationState = this,
            this._armature._addEvent(l)) : a && this._armature.hasEventListener(t.AnimationEvent.LOOP_COMPLETE) && (l = new t.AnimationEvent(t.AnimationEvent.LOOP_COMPLETE),
            l.animationState = this,
            this._armature._addEvent(l))
        }
        ,
        n.updateTransformTimeline = function(t) {
            var i, e, a = this._boneTimelineStateList.length;
            if (this._isComplete) {
                for (; a--; )
                    i = this._boneTimelineStateList[a],
                    i.update(t),
                    this._isComplete = i._isComplete && this._isComplete;
                for (a = this._slotTimelineStateList.length; a--; )
                    e = this._slotTimelineStateList[a],
                    e.update(t),
                    this._isComplete = e._isComplete && this._isComplete
            } else {
                for (; a--; )
                    i = this._boneTimelineStateList[a],
                    i.update(t);
                for (a = this._slotTimelineStateList.length; a--; )
                    e = this._slotTimelineStateList[a],
                    e.update(t)
            }
        }
        ,
        n.updateMainTimeline = function(t) {
            var i = this.animationData.frameList;
            if (i.length > 0) {
                for (var e, a, n = 0, s = this.animationData.frameList.length; s > n; ++n) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime))
                            break;
                        if (this._lastTime = this._currentTime,
                        this._currentFrameIndex++,
                        this._currentFrameIndex >= i.length) {
                            if (t) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    a = i[this._currentFrameIndex],
                    e && this._armature.arriveAtFrame(e, this),
                    this._currentFrameDuration = a.duration,
                    this._currentFramePosition = a.position,
                    e = a
                }
                a && this._armature.arriveAtFrame(a, this)
            }
        }
        ,
        n.setTimeScale = function(t) {
            return (isNaN(t) || t == 1 / 0) && (t = 1),
            this._timeScale = t,
            this
        }
        ,
        n.setPlayTimes = function(t) {
            return void 0 === t && (t = 0),
            Math.round(.001 * this._totalTime * this.animationData.frameRate) < 2 ? this._playTimes = 1 : this._playTimes = t,
            this
        }
        ,
        e(n, "playTimes", function() {
            return this._playTimes
        }),
        e(n, "currentPlayTimes", function() {
            return this._currentPlayTimes < 0 ? 0 : this._currentPlayTimes
        }),
        e(n, "isComplete", function() {
            return this._isComplete
        }),
        e(n, "isPlaying", function() {
            return this._isPlaying && !this._isComplete
        }),
        e(n, "totalTime", function() {
            return .001 * this._totalTime
        }),
        e(n, "currentTime", function() {
            return this._currentTime < 0 ? 0 : .001 * this._currentTime
        }),
        n.isUseCache = function() {
            return this._armature.enableCache && this.animationCache && !this._fading
        }
        ,
        n.hideBones = function() {
            for (var t = this.animationData.hideTimelineNameMap.length, i = 0; t > i; i++) {
                var e = this.animationData.hideTimelineNameMap[i]
                  , a = this._armature.getBone(e);
                a && a._hideSlots()
            }
            var n;
            for (i = 0,
            t = this.animationData.hideSlotTimelineNameMap.length; t > i; i++) {
                n = this.animationData.hideSlotTimelineNameMap[i];
                var s = this._armature.getSlot(n);
                s && s._resetToOrigin()
            }
        }
        ,
        e(n, "progress", function() {
            return this._progress
        }),
        i
    }();
    t.FastAnimationState = i,
    egret.registerClass(i, "dragonBones.FastAnimationState", ["dragonBones.IAnimationState"])
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._totalTime = 0,
            this._currentTime = 0,
            this._lastTime = 0,
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._updateMode = 0,
            this._transform = new t.DBTransform,
            this._durationTransform = new t.DBTransform,
            this._transformToFadein = new t.DBTransform,
            this._pivot = new t.Point,
            this._durationPivot = new t.Point
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i.borrowObject = function() {
            return 0 == i._pool.length ? new i : i._pool.pop()
        }
        ,
        i.returnObject = function(t) {
            i._pool.indexOf(t) < 0 && (i._pool[i._pool.length] = t),
            t.clear()
        }
        ,
        i.clear = function() {
            for (var t = i._pool.length; t--; )
                i._pool[t].clear();
            i._pool.length = 0
        }
        ,
        a.clear = function() {
            this._bone && (this._bone._timelineState = null,
            this._bone = null),
            this._animationState = null,
            this._timelineData = null,
            this._originPivot = null
        }
        ,
        a.fadeIn = function(i, e, a) {
            switch (this._bone = i,
            this._animationState = e,
            this._timelineData = a,
            this.name = a.name,
            this._totalTime = this._timelineData.duration,
            this._isComplete = !1,
            this._tweenTransform = !1,
            this._currentFrameIndex = -1,
            this._currentTime = -1,
            this._tweenEasing = NaN,
            this._durationPivot.x = 0,
            this._durationPivot.y = 0,
            this._pivot.x = 0,
            this._pivot.y = 0,
            this._originPivot = this._timelineData.originPivot,
            this._timelineData.frameList.length) {
            case 0:
                this._updateMode = 0;
                break;
            case 1:
                this._updateMode = 1;
                break;
            default:
                this._updateMode = -1
            }
            if (e._fadeTotalTime > 0) {
                this._bone._timelineState ? this._transformToFadein.copy(this._bone._timelineState._transform) : this._transformToFadein = new t.DBTransform;
                var n = this._timelineData.frameList[0];
                this._durationTransform.copy(n.transform),
                this._durationTransform.minus(this._transformToFadein)
            }
            this._bone._timelineState = this
        }
        ,
        a.updateFade = function(t) {
            this._transform.x = this._transformToFadein.x + this._durationTransform.x * t,
            this._transform.y = this._transformToFadein.y + this._durationTransform.y * t,
            this._transform.scaleX = this._transformToFadein.scaleX * (1 + (this._durationTransform.scaleX - 1) * t),
            this._transform.scaleY = this._transformToFadein.scaleX * (1 + (this._durationTransform.scaleY - 1) * t),
            this._transform.rotation = this._transformToFadein.rotation + this._durationTransform.rotation * t,
            this._bone.invalidUpdate()
        }
        ,
        a.update = function(t) {
            1 == this._updateMode ? (this._updateMode = 0,
            this.updateSingleFrame()) : -1 == this._updateMode && this.updateMultipleFrame(t)
        }
        ,
        a.updateSingleFrame = function() {
            var t = this._timelineData.frameList[0];
            this._bone.arriveAtFrame(t, this._animationState),
            this._isComplete = !0,
            this._tweenEasing = NaN,
            this._tweenTransform = !1,
            this._pivot.x = this._originPivot.x + t.pivot.x,
            this._pivot.y = this._originPivot.y + t.pivot.y,
            this._transform.copy(t.transform),
            this._bone.invalidUpdate()
        }
        ,
        a.updateMultipleFrame = function(t) {
            var i = 0;
            t /= this._timelineData.scale,
            t += this._timelineData.offset;
            var e = this._totalTime * t
              , a = this._animationState.playTimes;
            if (0 == a)
                this._isComplete = !1,
                i = Math.ceil(Math.abs(e) / this._totalTime) || 1,
                e -= Math.floor(e / this._totalTime) * this._totalTime,
                0 > e && (e += this._totalTime);
            else {
                var n = a * this._totalTime;
                e >= n ? (e = n,
                this._isComplete = !0) : -n >= e ? (e = -n,
                this._isComplete = !0) : this._isComplete = !1,
                0 > e && (e += n),
                i = Math.ceil(e / this._totalTime) || 1,
                this._isComplete ? e = this._totalTime : e -= Math.floor(e / this._totalTime) * this._totalTime
            }
            if (this._currentTime != e) {
                this._lastTime = this._currentTime,
                this._currentTime = e;
                for (var s, r, o = this._timelineData.frameList, l = 0, h = this._timelineData.frameList.length; h > l; ++l) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration || this._currentTime < this._lastTime))
                            break;
                        if (this._currentFrameIndex++,
                        this._lastTime = this._currentTime,
                        this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex],
                    s && this._bone.arriveAtFrame(s, this._animationState),
                    this._currentFrameDuration = r.duration,
                    this._currentFramePosition = r.position,
                    s = r
                }
                r && (this._bone.arriveAtFrame(r, this._animationState),
                this.updateToNextFrame(i)),
                this._tweenTransform && this.updateTween()
            }
        }
        ,
        a.updateToNextFrame = function(i) {
            void 0 === i && (i = 0);
            var e = this._currentFrameIndex + 1;
            e >= this._timelineData.frameList.length && (e = 0);
            var a = this._timelineData.frameList[this._currentFrameIndex]
              , n = this._timelineData.frameList[e]
              , s = !1;
            0 == e && this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + i - this._timelineData.offset) * this._timelineData.scale > .999999 ? (this._tweenEasing = NaN,
            s = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.animationData.tweenEasing,
            isNaN(this._tweenEasing) ? (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            isNaN(this._tweenEasing) && null == this._tweenCurve ? s = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0),
            s = !0)) : s = !0) : (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? s = !0 : (this._tweenEasing = NaN,
            s = !1)),
            s ? (this._durationTransform.x = n.transform.x - a.transform.x,
            this._durationTransform.y = n.transform.y - a.transform.y,
            this._durationTransform.skewX = n.transform.skewX - a.transform.skewX,
            this._durationTransform.skewY = n.transform.skewY - a.transform.skewY,
            this._durationTransform.scaleX = n.transform.scaleX - a.transform.scaleX + n.scaleOffset.x,
            this._durationTransform.scaleY = n.transform.scaleY - a.transform.scaleY + n.scaleOffset.y,
            this._durationPivot.x = n.pivot.x - a.pivot.x,
            this._durationPivot.y = n.pivot.y - a.pivot.y,
            this._durationTransform.normalizeRotation(),
            0 == e && (this._durationTransform.skewX = t.TransformUtil.formatRadian(this._durationTransform.skewX),
            this._durationTransform.skewY = t.TransformUtil.formatRadian(this._durationTransform.skewY)),
            this._durationTransform.x || this._durationTransform.y || this._durationTransform.skewX || this._durationTransform.skewY || 1 != this._durationTransform.scaleX || 1 != this._durationTransform.scaleY || this._durationPivot.x || this._durationPivot.y ? this._tweenTransform = !0 : this._tweenTransform = !1) : this._tweenTransform = !1,
            this._tweenTransform || (this._transform.copy(a.transform),
            this._pivot.x = this._originPivot.x + a.pivot.x,
            this._pivot.y = this._originPivot.y + a.pivot.y,
            this._bone.invalidUpdate())
        }
        ,
        a.updateTween = function() {
            var i = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
            this._tweenCurve ? i = this._tweenCurve.getValueByProgress(i) : this._tweenEasing && (i = t.MathUtil.getEaseValue(i, this._tweenEasing));
            var e = this._timelineData.frameList[this._currentFrameIndex]
              , a = e.transform
              , n = e.pivot;
            this._transform.x = a.x + this._durationTransform.x * i,
            this._transform.y = a.y + this._durationTransform.y * i,
            this._transform.skewX = a.skewX + this._durationTransform.skewX * i,
            this._transform.skewY = a.skewY + this._durationTransform.skewY * i,
            this._transform.scaleX = a.scaleX + this._durationTransform.scaleX * i,
            this._transform.scaleY = a.scaleY + this._durationTransform.scaleY * i,
            this._pivot.x = n.x + this._durationPivot.x * i,
            this._pivot.y = n.y + this._durationPivot.y * i,
            this._bone.invalidUpdate()
        }
        ,
        i._pool = [],
        i
    }();
    t.FastBoneTimelineState = i,
    egret.registerClass(i, "dragonBones.FastBoneTimelineState")
}(dragonBones || (dragonBones = {}));
var dragonBones;
!function(t) {
    var i = function() {
        function i() {
            this._totalTime = 0,
            this._currentTime = 0,
            this._currentFrameIndex = 0,
            this._currentFramePosition = 0,
            this._currentFrameDuration = 0,
            this._updateMode = 0,
            this._durationColor = new t.ColorTransform
        }
        var e = (__define,
        i)
          , a = e.prototype;
        return i.borrowObject = function() {
            return 0 == i._pool.length ? new i : i._pool.pop()
        }
        ,
        i.returnObject = function(t) {
            i._pool.indexOf(t) < 0 && (i._pool[i._pool.length] = t),
            t.clear()
        }
        ,
        i.clear = function() {
            for (var t = i._pool.length; t--; )
                i._pool[t].clear();
            i._pool.length = 0
        }
        ,
        a.clear = function() {
            this._slot = null,
            this._armature = null,
            this._animation = null,
            this._animationState = null,
            this._timelineData = null
        }
        ,
        a.fadeIn = function(t, i, e) {
            switch (this._slot = t,
            this._armature = this._slot.armature,
            this._animation = this._armature.animation,
            this._animationState = i,
            this._timelineData = e,
            this.name = e.name,
            this._totalTime = this._timelineData.duration,
            this._isComplete = !1,
            this._blendEnabled = !1,
            this._tweenColor = !1,
            this._currentFrameIndex = -1,
            this._currentTime = -1,
            this._tweenEasing = NaN,
            this._weight = 1,
            this._timelineData.frameList.length) {
            case 0:
                this._updateMode = 0;
                break;
            case 1:
                this._updateMode = 1;
                break;
            default:
                this._updateMode = -1
            }
        }
        ,
        a.updateFade = function(t) {}
        ,
        a.update = function(t) {
            -1 == this._updateMode ? this.updateMultipleFrame(t) : 1 == this._updateMode && (this._updateMode = 0,
            this.updateSingleFrame())
        }
        ,
        a.updateMultipleFrame = function(t) {
            var i = 0;
            t /= this._timelineData.scale,
            t += this._timelineData.offset;
            var e = this._totalTime * t
              , a = this._animationState.playTimes;
            if (0 == a)
                this._isComplete = !1,
                i = Math.ceil(Math.abs(e) / this._totalTime) || 1,
                e -= Math.floor(e / this._totalTime) * this._totalTime,
                0 > e && (e += this._totalTime);
            else {
                var n = a * this._totalTime;
                e >= n ? (e = n,
                this._isComplete = !0) : -n >= e ? (e = -n,
                this._isComplete = !0) : this._isComplete = !1,
                0 > e && (e += n),
                i = Math.ceil(e / this._totalTime) || 1,
                this._isComplete ? e = this._totalTime : e -= Math.floor(e / this._totalTime) * this._totalTime
            }
            if (this._currentTime != e) {
                this._currentTime = e;
                for (var s, r, o = this._timelineData.frameList, l = 0, h = this._timelineData.frameList.length; h > l; ++l) {
                    if (this._currentFrameIndex < 0)
                        this._currentFrameIndex = 0;
                    else {
                        if (!(this._currentTime < this._currentFramePosition || this._currentTime >= this._currentFramePosition + this._currentFrameDuration))
                            break;
                        if (this._currentFrameIndex++,
                        this._currentFrameIndex >= o.length) {
                            if (this._isComplete) {
                                this._currentFrameIndex--;
                                break
                            }
                            this._currentFrameIndex = 0
                        }
                    }
                    r = o[this._currentFrameIndex],
                    s && this._slot._arriveAtFrame(s, this._animationState),
                    this._currentFrameDuration = r.duration,
                    this._currentFramePosition = r.position,
                    s = r
                }
                r && (this._slot._arriveAtFrame(r, this._animationState),
                this._blendEnabled = r.displayIndex >= 0,
                this._blendEnabled ? this.updateToNextFrame(i) : (this._tweenEasing = NaN,
                this._tweenColor = !1)),
                this._blendEnabled && this.updateTween()
            }
        }
        ,
        a.updateToNextFrame = function(i) {
            void 0 === i && (i = 0);
            var e = this._currentFrameIndex + 1;
            e >= this._timelineData.frameList.length && (e = 0);
            var a = this._timelineData.frameList[this._currentFrameIndex]
              , n = this._timelineData.frameList[e]
              , s = !1;
            if (0 == e && this._animationState.playTimes && this._animationState.currentPlayTimes >= this._animationState.playTimes && ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + i - this._timelineData.offset) * this._timelineData.scale > .999999 ? (this._tweenEasing = NaN,
            s = !1) : a.displayIndex < 0 || n.displayIndex < 0 ? (this._tweenEasing = NaN,
            s = !1) : this._animationState.autoTween ? (this._tweenEasing = this._animationState.animationData.tweenEasing,
            isNaN(this._tweenEasing) ? (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            isNaN(this._tweenEasing) && null == this._tweenCurve ? s = !1 : (10 == this._tweenEasing && (this._tweenEasing = 0),
            s = !0)) : s = !0) : (this._tweenEasing = a.tweenEasing,
            this._tweenCurve = a.curve,
            !isNaN(this._tweenEasing) && 10 != this._tweenEasing || null != this._tweenCurve ? s = !0 : (this._tweenEasing = NaN,
            s = !1)),
            s && (a.color || n.color) ? (t.ColorTransformUtil.minus(n.color || t.ColorTransformUtil.originalColor, a.color || t.ColorTransformUtil.originalColor, this._durationColor),
            this._tweenColor = 0 != this._durationColor.alphaOffset || 0 != this._durationColor.redOffset || 0 != this._durationColor.greenOffset || 0 != this._durationColor.blueOffset || 0 != this._durationColor.alphaMultiplier || 0 != this._durationColor.redMultiplier || 0 != this._durationColor.greenMultiplier || 0 != this._durationColor.blueMultiplier) : this._tweenColor = !1,
            !this._tweenColor) {
                var r, o;
                a.color ? (r = a.color,
                o = !0) : (r = t.ColorTransformUtil.originalColor,
                o = !1),
                (this._slot._isColorChanged || o) && (t.ColorTransformUtil.isEqual(this._slot._colorTransform, r) || this._slot._updateDisplayColor(r.alphaOffset, r.redOffset, r.greenOffset, r.blueOffset, r.alphaMultiplier, r.redMultiplier, r.greenMultiplier, r.blueMultiplier, o))
            }
        }
        ,
        a.updateTween = function() {
            var i = this._timelineData.frameList[this._currentFrameIndex];
            if (this._tweenColor) {
                var e = (this._currentTime - this._currentFramePosition) / this._currentFrameDuration;
                null != this._tweenCurve ? e = this._tweenCurve.getValueByProgress(e) : this._tweenEasing && (e = t.MathUtil.getEaseValue(e, this._tweenEasing)),
                i.color ? this._slot._updateDisplayColor(i.color.alphaOffset + this._durationColor.alphaOffset * e, i.color.redOffset + this._durationColor.redOffset * e, i.color.greenOffset + this._durationColor.greenOffset * e, i.color.blueOffset + this._durationColor.blueOffset * e, i.color.alphaMultiplier + this._durationColor.alphaMultiplier * e, i.color.redMultiplier + this._durationColor.redMultiplier * e, i.color.greenMultiplier + this._durationColor.greenMultiplier * e, i.color.blueMultiplier + this._durationColor.blueMultiplier * e, !0) : this._slot._updateDisplayColor(this._durationColor.alphaOffset * e, this._durationColor.redOffset * e, this._durationColor.greenOffset * e, this._durationColor.blueOffset * e, this._durationColor.alphaMultiplier * e + 1, this._durationColor.redMultiplier * e + 1, this._durationColor.greenMultiplier * e + 1, this._durationColor.blueMultiplier * e + 1, !0)
            }
        }
        ,
        a.updateSingleFrame = function() {
            var i = this._timelineData.frameList[0];
            if (this._slot._arriveAtFrame(i, this._animationState),
            this._isComplete = !0,
            this._tweenEasing = NaN,
            this._tweenColor = !1,
            this._blendEnabled = i.displayIndex >= 0,
            this._blendEnabled) {
                var e, a;
                i.color ? (e = i.color,
                a = !0) : (e = t.ColorTransformUtil.originalColor,
                a = !1),
                (this._slot._isColorChanged || a) && (t.ColorTransformUtil.isEqual(this._slot._colorTransform, e) || this._slot._updateDisplayColor(e.alphaOffset, e.redOffset, e.greenOffset, e.blueOffset, e.alphaMultiplier, e.redMultiplier, e.greenMultiplier, e.blueMultiplier, a))
            }
        }
        ,
        i.HALF_PI = .5 * Math.PI,
        i.DOUBLE_PI = 2 * Math.PI,
        i._pool = [],
        i
    }();
    t.FastSlotTimelineState = i,
    egret.registerClass(i, "dragonBones.FastSlotTimelineState")
}(dragonBones || (dragonBones = {})),
function() {
    var t = dragonBones.DataParser
      , i = dragonBones.TextureData
      , e = function(t, i, e) {
        this._textureDatas = {},
        this.scale = e || 1,
        this.texture = t,
        this.name = i.name,
        this.parseData(i)
    };
    e.rotatedDic = {},
    e.prototype = {
        constructor: e,
        getTexture: function(t) {
            var i = this._textureDatas[t];
            return i && (i.texture = this.texture,
            i.rotated && (e.rotatedDic[t] = 1)),
            i
        },
        dispose: function() {
            this.texture = null,
            this._textureDatas = {}
        },
        getRegion: function(t) {
            var e = this._textureDatas[t];
            return e && e instanceof i ? e.region : null
        },
        getFrame: function(t) {
            var e = this._textureDatas[t];
            return e && e instanceof i ? e.frame : null
        },
        parseData: function(i) {
            this._textureDatas = t.parseTextureAtlasData(i, this.scale)
        }
    },
    dragonBones.TextureAtlas = e
}(),
function(t) {
    var i = 180 / Math.PI
      , e = dragonBones.TextureAtlas
      , a = function() {
        t.call(this, this),
        this._display = null
    };
    __extends(a, t, {
        dispose: function() {
            if (this._displayList)
                for (var i = this._displayList.length, e = 0; i > e; e++) {
                    var a = this._displayList[e];
                    a instanceof Armature && a.dispose()
                }
            t.prototype.dispose(),
            this._display = null
        },
        _updateDisplay: function(t) {
            this._display = t
        },
        _getDisplayIndex: function() {
            return this._display && this._display.parent ? this._display.parent.getChildIndex(this._display) : -1
        },
        _addDisplayToContainer: function(t, i) {
            this._display && t && (i ? t.addChildAt(this._display, i) : t.add(this._display))
        },
        _removeDisplayFromContainer: function() {
            this._display && this._display.parent && this._display.parent.removeChild(this._display)
        },
        _updateTransform: function() {
            this._display && (this._display.x = this._global.x,
            this._display.y = this._global.y,
            this._display.scaleX = this._global.scaleX,
            this._display.scaleY = this._global.scaleY,
            this._display.rotation = this._global.skewX * i)
        },
        _updateDisplayVisible: function(t) {
            this._display && this._parent && (this._display.visible = this._parent._visible && this._visible && t)
        },
        _updateDisplayColor: function(i, e, a, n, s, r, o, l, h) {
            t.prototype._updateDisplayColor.call(this, i, e, a, n, s, r, o, l, h),
            this._display && (this._display.alpha = s)
        },
        _updateDisplayBlendMode: function(t) {},
        _calculateRelativeParentTransform: function() {
            this._global.scaleX = this._origin.scaleX * this._offset.scaleX,
            this._global.scaleY = this._origin.scaleY * this._offset.scaleY,
            this._global.skewX = this._origin.skewX + this._offset.skewX,
            this._global.skewY = this._origin.skewY + this._offset.skewY,
            this._global.x = this._origin.x + this._offset.x + this._parent._tweenPivot.x,
            this._global.y = this._origin.y + this._offset.y + this._parent._tweenPivot.y,
            this._displayDataList && this._currentDisplayIndex >= 0 && this._displayDataList[this._currentDisplayIndex] && 1 == e.rotatedDic[this._displayDataList[this._currentDisplayIndex].name] && (this._global.skewX -= 1.57,
            this._global.skewY -= 1.57)
        }
    }),
    dragonBones.CaxSlot = a
}(dragonBones.Slot),
function(t) {
    var i = dragonBones.Armature
      , e = dragonBones.CaxSlot
      , a = function() {
        t.call(this, this)
    };
    __extends(a, t, {
        _generateArmature: function() {
            var t = new i(new cax.Group);
            return t
        },
        _generateSlot: function() {
            var t = new e;
            return t
        },
        _generateDisplay: function(t, i, e, a) {
            var n = t.getTexture(i)
              , s = n.region
              , r = new cax.Bitmap(t.texture);
            if (r.rect = [s.x,s.y,s.width,s.height],
            isNaN(e) || isNaN(a)) {
                var o = t.getFrame(i);
                null != o ? (e = o.width / 2 + o.x,
                a = o.height / 2 + o.y) : (e = n.region.width / 2,
                a = n.region.height / 2)
            }
            return r.originX = e,
            r.originY = a,
            r
        }
    }),
    dragonBones.CaxFactory = a
}(dragonBones.BaseFactory);