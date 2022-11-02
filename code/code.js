var ip_month, tb_month;
const page_load = () => {
    // Initialize control of page
    ip_month = document.getElementById('ip_month');
    tb_month = document.getElementById('tb_month');
    // Event when page load
    var dNow = new Date();
    ip_month.value = dNow.getFullYear() + '-' + ((dNow.getMonth() < 9) ? 
        ('0' + (dNow.getMonth() + 1)) : (dNow.getMonth() + 1));
    var dows = ['T2','T3','T4','T5','T6','T7','CN'];
    var mHeader = document.createElement('tr');
    mHeader.className = 'header';
    for(i=0;i<7;i++) {
        var eHeader = document.createElement('th');
        eHeader.innerText = dows[i];
        eHeader.style = 'color: #606060;';
        mHeader.appendChild(eHeader);
    }
    tb_month.appendChild(mHeader);
    monthCalendar(dNow.getMonth()+1,dNow.getFullYear());
}
const monthCalendar = (_month, _year) => {
    var dRows = tb_month.getElementsByClassName('daterow');
    if(dRows.length!=0) {
        for(i=0;i<dRows.length;i++) {
            tb_month.removeChild(dRows[i]);
        }
    }
    var ldMonth = new SolarDate(endMonth(_month, _year), _month, _year);
    var ndRows = ldMonth.weekOfMonth() + 1;
    for(i=0;i<ndRows;i++) {
        var rDates = document.createElement('tr');
        rDates.className = 'daterow';
        for(j=0;j<7;j++) {
            var cDates = document.createElement('td');
            cDates.classList.add('date_normal');
            cDates.id = 'cell' + i.toString() + j.toString();
            rDates.appendChild(cDates);
        }
        tb_month.appendChild(rDates);
    }
    for(i=1;i<=ldMonth.Day;i++) {
        var iDate = new SolarDate(i, _month, _year);
        var iCol = iDate.dayOfWeek();
        var iRow = iDate.weekOfMonth();
        var soDate = document.createElement('div');
        soDate.classList.add('solar_normal');
        soDate.innerText = i;
        var ceDate = document.getElementById('cell' + iRow + iCol);
        ceDate.appendChild(soDate);
    }
}