const mathInt = number => {
    if(isNaN(new Number(number))) return NaN;
    else return Math.floor(number);
}
class SolarDate {
    constructor(_day, _month, _year) {
        var sd = parseInt(_day);
        var sm = parseInt(_month);
        var sy = parseInt(_year);
        if(isNaN(sd) || isNaN(sm) || isNaN(sy)) {
            this.Day = 1; this.Month = 1; this.Year = 2000;
        }
        else {
            
        }
    }
    constructor(_date) {

    }
}