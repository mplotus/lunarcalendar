class SolarDate {
    constructor() {
        this.Day = 1; this.Month = 1; this.Year = 2000;
        this.Hour = 0; this.Minute = 0; this.Second = 0;
    }
    getJulius(timeZone) {
        return juliusNumber(timeZone, this.Hour, this.Minute, this.Day, this.Month, this.Year);
    }
    getJuliusDate() {
        return toJulius(this.Day, this.Month, this.Year);
    }
    getLunarDate() {
        
    }
    setFromNumber(_day, _month, _year) {
        var sd = parseMath.floor(_day); var sm = parseMath.floor(_month); var sy = parseMath.floor(_year);
        if(!isNaN(sd) && !isNaN(sm) && !isNaN(sy)) {
            this.Year = (sy < 0) ? 0 : ((sy > 3000) ? 3000 : sy);
            this.Month = (sm < 1) ? 1 : ((sm > 12) ? 12 : sm);
            this.Day = (sd < 1) ? 1 : ((sd > endMonth(this.Month, this.Year)) ? 
                        endMonth(this.Month, this.Year) : sd);
        }
    }
    setFromDate(_date) {
        if(_date instanceof Date) {
            this.Year = _date.getFullYear();
            this.Month = _date.getMonth();
            this.Day = _date.getDate();
            this.Hour = _date.getHours();
            this.Minute = _date.getMinutes();
            this.Second = _date.getSeconds();
        }
    }
    toString(_sep) {
        if(_sep.length == 1 && isNaN(parseMath.floor(_sep))) return this.Day + _sep + this.Month + _sep + this.Year;
        else return this.Day + '/' + this.Month + '/' + this.Year;
    }
}
class LunarDate {
    constructor() {
        this.Day = 25; this.Month = 11; this.Year = 1999; this.Leap = false;
    }
}
const endMonth = (_month, _year) => {
    if(_month == 2) {
        if(_year % 4 == 0) return 29;
        else return 28;
    }
    else {
        switch (_month) {
            case 1,3,5,7,8,10,12 : 
                return 31;
            case 4,6,9,11 : 
                return 30;
            default : 
                return 0;
        }
    }
}
const juliusNumber = (timeZone, _hour, _minute, _day, _month, _year) => {
    var jdInt = jdFromDate(_day, _month, _year);
    var jdDiv = (_hour - 12 - timeZone) / 24.0 + _minute / 1440.0;
    return (jdInt + jdDiv);
}
const toJulius = (_day, _month, _year) => {
    var a, y, m, jd;
    a = Math.floor((14 - _month) / 12.0);
    y = _year + 4800 - a;
    m = _month + 12 * a - 3;
    jd = _day + Math.floor((153 * m + 2) / 5.0) + 365 * y + Math.floor(y / 4.0) - 
            Math.floor(y / 100.0) + Math.floor(y / 400.0) - 32045;
    if (jd < 2299161){
        jd = _day + Math.floor((153 * m + 2) / 5.0) + 365 * y + Math.floor(y / 4.0) - 32083;
    }
    return jd;
}
const fromJulius = _julius => {
    var a, b, c, d, e, m, day, month, year;
    if (_julius > 2299160){
        a = _julius + 32044;
        b = Math.floor((4 * a + 3) / 146097);
        c = a - Math.floor((b * 146097) / 4);
    }
    else{
        b = 0;
        c = _julius + 32082;
    }
    d = Math.floor((4 * c + 3) / 1461);
    e = c - Math.floor((1461 * d) / 4);
    m = Math.floor((5 * e + 2) / 153);
    day = e - Math.floor((153 * m + 2) / 5) + 1;
    month = m + 3 - 12 * Math.floor(m / 10);
    year = b * 100 + d - 4800 + Math.floor(m / 10);
    var date = new SolarDate();
    date.setFromNumber(day,month,year);
    return date;
}
