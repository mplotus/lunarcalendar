var ip_month, tb_month, sl_timezone, date_0, date_1, date_2;
var _dayOfWeek = [['T2',String.fromCharCode(0x4e00)],['T3',String.fromCharCode(0x4e8c)],
                    ['T4',String.fromCharCode(0x4e09)],['T5',String.fromCharCode(0x56db)],
                    ['T6',String.fromCharCode(0x4e94)],['T7',String.fromCharCode(0x516d)],
                    ['CN',String.fromCharCode(0x65e5)]];
const page_load = () => {
    // Initialize control of page
    sl_timezone = document.getElementById('sl_timezone');
    ip_month = document.getElementById('ip_month');
    tb_month = document.getElementById('tb_month');
    date_0 = document.getElementById('date_panel_0');
    date_1 = document.getElementById('date_panel_1');
    date_2 = document.getElementById('date_panel_2');
    // Event when page load
    var dNow = new Date();
    ip_month.value = dNow.getFullYear() + '-' + ((dNow.getMonth() < 9) ? 
        ('0' + (dNow.getMonth() + 1)) : (dNow.getMonth() + 1));
    var mHeader = document.createElement('tr');
    mHeader.className = 'header';
    for(i=0;i<7;i++) {
        var eHeader = document.createElement('th');
        eHeader.className = 'dayOfWeeks';
        eHeader.innerText = _dayOfWeek[i][0];
        if(i!=6) eHeader.style = 'color: #606060;';
        else eHeader.style = 'color: #ff8080'
        mHeader.appendChild(eHeader);
    }
    tb_month.appendChild(mHeader);
    selectedDate = new SolarDate(dNow.getDate(), dNow.getMonth() + 1, dNow.getFullYear());
    monthCalendar(dNow.getMonth()+1,dNow.getFullYear());
}
var selectedDate;
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
    var lTimezone = (sl_timezone.selectedIndex==0)?7:8;
    for(i=1;i<=ldMonth.Day;i++) {
        var iDate = new SolarDate(i, _month, _year);
        var iCol = iDate.dayOfWeek();
        var iRow = iDate.weekOfMonth();
        var infDate = document.createElement('div');
        if(i==dNow.getDate() && _month==(dNow.getMonth() + 1) && _year==dNow.getFullYear())
            infDate.classList.add('date_today');
        else {
            if(iCol!=6) infDate.classList.add('date_normal');
            else infDate.classList.add('date_sunday');
        }
        if(i==selectedDate.Day && _month==selectedDate.Month && _year==selectedDate.Year) {
            var selCell = document.getElementById('cell' + iRow + '' + iCol);
            selCell.classList.add('cell_selected');
        }
        var lDate = iDate.getLunarDate(lTimezone);
        var lStr = '';
        if(i==1 || lDate.Day==1) lStr = lDate.Day + '/' + lDate.Month + ((lDate.Leap)?'*':'');
        else lStr = lDate.Day;
        infDate.innerHTML = '<center><b>' + i + '</b></center>' + 
            '<div style=\'font-size: 45%; text-align: right; width: 90%;\'>' + lStr + '</div>';
        infDate.id = 'datecell' + iRow.toString() + iCol.toString() + i.toString();
        infDate.addEventListener('mouseenter', infDate_hover);
        infDate.addEventListener('mouseleave', infDate_hover);
        infDate.addEventListener('click', infDate_click);
        var ceDate = document.getElementById('cell' + iRow + iCol);
        ceDate.appendChild(infDate);
    }
}
const ip_month_change = () => {
    var _year = ip_month.value.toString().substring(0,4);
    var _month = ip_month.value.toString().substring(5,7);
    var dows = document.getElementsByClassName('dayOfWeeks');
    for(i=0;i<dows.length;i++) {
        dows[i].innerText = _dayOfWeek[i][sl_timezone.selectedIndex];
    }
    monthCalendar(_month, _year);
}
const bt_reset_click = () => {
    var dNow = new Date();
    selectedDate = new SolarDate(dNow.getDate(), dNow.getMonth() + 1, dNow.getFullYear());
    ip_month.value = dNow.getFullYear() + '-' + ((dNow.getMonth() < 9) ? 
        ('0' + (dNow.getMonth() + 1)) : (dNow.getMonth() + 1));
    monthCalendar(dNow.getMonth() + 1, dNow.getFullYear());
}
const infDate_hover = (event) => {
    var infId = event.currentTarget.id.substring(4,10);
    var outCell = document.getElementById(infId);
    outCell.classList.toggle('cell_hover');
}
const pullId = date_panel => {
    var index = date_panel.substring(11,12);
    if(index == '2') return 'date_panel_0';
    else if(index == '1') return 'date_panel_2';
    else return 'date_panel_1';
}
const infDate_click = (event) => {
    var cells = document.getElementsByClassName('cell_normal');
    var thisId = event.currentTarget.id;
    for(i=0;i<cells.length;i++) {
        cells[i].classList.remove('cell_selected');
    }
    var roundMe = thisId.substring(4,10);
    var ctrlMe = document.getElementById(roundMe);
    ctrlMe.classList.add('cell_selected');
    var selDay = thisId.substring(10, thisId.length);
    var _year = ip_month.value.toString().substring(0,4);
    var _month = ip_month.value.toString().substring(5,7);
    selectedDate = new SolarDate(selDay, _month, _year);
    var dId0, dId1, dId2;
    dId0 = pullId(date_0.id);
    dId1 = pullId(date_1.id);
    dId2 = pullId(date_2.id);
    date_0.classList.toggle('date_mid');
    date_0.classList.toggle('date_hide');
    date_0.classList.toggle('date_show');
    date_1.classList.toggle('date_mid');
    date_1.classList.toggle('date_behind');
    date_2.classList.toggle('date_behind');
    date_2.classList.toggle('date_show');
    date_2.classList.toggle('date_hide');
    date_0 = document.getElementById(dId0);
    date_1 = document.getElementById(dId1);
    date_2 = document.getElementById(dId2);
}