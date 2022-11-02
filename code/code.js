const page_load = () => {
    var ldate = new SolarDate(23,3,2023);
    alert(ldate.getLunarDate(7).toString('N'));
}