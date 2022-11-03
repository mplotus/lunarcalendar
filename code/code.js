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
    var dNow = new Date();
    var dRows = document.getElementsByClassName('daterow');
    if(dRows.length!=0) {
        while(dRows.length!=0) {
            tb_month.removeChild(dRows[0]);
        }
    }
    var ldMonth = new SolarDate(endMonth(_month, _year), _month, _year);
    var ndRows = ldMonth.weekOfMonth() + 1;
    for(i=0;i<ndRows;i++) {
        var rDates = document.createElement('tr');
        rDates.className = 'daterow';
        for(j=0;j<7;j++) {
            var cDates = document.createElement('td');
            cDates.classList.add('cell_normal');
            cDates.id = 'cell' + i.toString() + j.toString();
            rDates.appendChild(cDates);
        }
        tb_month.appendChild(rDates);
    }
    for(i=1;i<=ldMonth.Day;i++) {
        var iDate = new SolarDate(i, _month, _year);
        var iCol = iDate.dayOfWeek();
        var iRow = iDate.weekOfMonth();
        var infDate = document.createElement('div');
        if(i==dNow.getDate() && _month==(dNow.getMonth() + 1) && _year==dNow.getFullYear())
            infDate.classList.add('date_today');
        else
            infDate.classList.add('date_normal');
        var lDate = iDate.getLunarDate(7);
        var lStr = '';
        if(i==1 || lDate.Day==1) lStr = lDate.Day + '/' + lDate.Month + ((lDate.Leap)?'*':'');
        else lStr = lDate.Day;
        infDate.innerHTML = '<center><b>' + i + '</b></center>' + 
            '<div style=\'font-size: 60%; text-align: right; width: 90%;\'>' + lStr + '</div>';
        infDate.id = 'datecell' + iRow + iCol;
        infDate.addEventListener('mouseenter', infDate_mouseover);
        infDate.addEventListener('mouseleave', infDate_mouseover);
        var ceDate = document.getElementById('cell' + iRow + iCol);
        ceDate.appendChild(infDate);
    }
}
const ip_month_change = () => {
    var _year = ip_month.value.toString().substring(0,4);
    var _month = ip_month.value.toString().substring(5,7);
    monthCalendar(_month, _year);
}
const infDate_mouseover = (event) => {
    var infId = event.currentTarget.id.substring(4,10);
    var outCell = document.getElementById(infId);
    outCell.classList.toggle('cell_hover');
}