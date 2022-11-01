class SolarDate {
    constructor() {
        this.Day = 1; this.Month = 1; this.Year = 2000;
        this.Hour = 0; this.Minute = 0; this.Second = 0;
    }
    getJulian(timeZone) {
        return julianNumber(timeZone, this.Hour, this.Minute, this.Day, this.Month, this.Year);
    }
    getJulianDate() {
        return toJulian(this.Day, this.Month, this.Year);
    }
    getLunarDate() {
        
    }
    setFromNumber(_day, _month, _year) {
        var sd = parseInt(_day); var sm = parseInt(_month); var sy = parseInt(_year);
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
            this.Month = _date.getMonth() + 1;
            this.Day = _date.getDate();
            this.Hour = _date.getHours();
            this.Minute = _date.getMinutes();
            this.Second = _date.getSeconds();
        }
    }
    toString(_sep) {
        if(_sep.length == 1 && isNaN(parseInt(_sep))) return this.Day + _sep + this.Month + _sep + this.Year;
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
const julianNumber = (timeZone, _hour, _minute, _day, _month, _year) => {
    var jdInt = toJulian(_day, _month, _year);
    var jdDiv = (_hour - 12 - timeZone) / 24.0 + _minute / 1440.0;
    return (jdInt + jdDiv);
}
const toJulian = (_day, _month, _year) => {
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
const fromJulian = _julian => {
    var a, b, c, d, e, m, day, month, year;
    if (_julian > 2299160){
        a = _julian + 32044;
        b = Math.floor((4 * a + 3) / 146097);
        c = a - Math.floor((b * 146097) / 4);
    }
    else{
        b = 0;
        c = _julian + 32082;
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
const newMoon = (k, timeZone) => {
    var T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
    var PI = Math.PI;
    T = k/1236.85; // Time in Julian centuries from 1900 January 0.5
    T2 = T * T;
    T3 = T2 * T;
    dr = PI/180.0;
    Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;
    Jd1 = Jd1 + 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr); // Mean new moon
    M = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3; // Sun's mean anomaly
    Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3; // Moon's mean anomaly
    F = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3; // Moon's argument of latitude
    C1=(0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);
    C1 = C1 - 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(dr*2*Mpr);
    C1 = C1 - 0.0004*Math.sin(dr*3*Mpr);
    C1 = C1 + 0.0104*Math.sin(dr*2*F) - 0.0051*Math.sin(dr*(M+Mpr));
    C1 = C1 - 0.0074*Math.sin(dr*(M-Mpr)) + 0.0004*Math.sin(dr*(2*F+M));
    C1 = C1 - 0.0004*Math.sin(dr*(2*F-M)) - 0.0006*Math.sin(dr*(2*F+Mpr));
    C1 = C1 + 0.0010*Math.sin(dr*(2*F-Mpr)) + 0.0005*Math.sin(dr*(2*Mpr+M));
    if (T < -11){
        deltat= 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;
    } 
    else{
        deltat= -0.000278 + 0.000265*T + 0.000262*T2;
    }
    JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone/24.0);
}
const sunLongitude = (_julian, timeZone) => {
    var T, T2, dr, M, L0, DL, L;
    var PI = Math.PI;
    T = (_julian - 2451545.5 - timeZone/24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    T2 = T*T;
    dr = PI/180; // degree to radian
    M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2; // mean anomaly, degree
    L0 = 280.46645 + 36000.76983*T + 0.0003032*T2; // mean longitude, degree
    DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
    DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
    L = L0 + DL; // true longitude, degree
    L = L*dr;
    L = L - PI*2*(Math.floor(L/(PI*2))); // Normalize to (0, 2*PI)
    return (L * 180.0 / PI);
}
