
export default class Countdown {
    constructor(options) {
        options = Object.assign({
            remainTime: 0,
            interval: 1000,
            type: 0
        }, options)
        this.recordTime = options.remainTime, 
        this.remainTime = options.remainTime, 
        this.interval = options.interval, 
        this.type = options.type;
        this.timers = []
    }
    start() {
        var t = this;
        this.timer && this.stop();
        for (let item in this.timers) {
            clearInterval(this.timers[item])
            this.timers.splice(item, 1)
        }  
        this.__tick(!0), 
        this.timer = setInterval(function() {
            t.__tick();
        }, this.interval), 
        this.timers.push(this.timer);
    }
    __tick(flag) {
        var t = flag, 
            remainTime = this.remainTime,  //e
            interval = this.interval; //i
            interval = t ? 0 : interval;
            var n = remainTime = Math.max(0, remainTime - 1);
            if (1 == this.type) {
                var d = Math.floor(n / 86400);
                n -= 86400 * d;  
            }
            var h = Math.floor(n / 3600); //a
            n -= 3600 * h;
            var m = Math.floor(n / 60); //s
            n -= 60 * m;
            var s = Math.floor(n / 1); //h
            1 == this.type ? this.callback({
                d,
                h,
                m,
                s,
            }) : this.callback({
                h,
                m,
                s
            }), 
            this.remainTime = remainTime, 
            0 === remainTime && this.stop();
    }
    stop() {
        var t = !this.remainTime;
        clearInterval(this.timer)
        this.events.stop && this.events.stop(t);
    }
    on(name, fn) {
        this.events = this.events || [], this.events[name] = fn;
    }
    callback(fn) {
        this.events.tick && this.events.tick(fn);
    }
    getPassedTime() {
        return this.recordTime - this.remainTime;
    }
    clearTimer() {
        for (let item in this.timers) {
            clearInterval(this.timers[item])
        }
        this.timers = []
    }
}