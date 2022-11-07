var ip_month, tb_month, sl_timezone, date_0, date_1, date_2;
const page_load = () => {
    // Initialize control of page
    sl_timezone = document.getElementById('sl_timezone');
    ip_month = document.getElementById('ip_month');
    tb_month = document.getElementById('tb_month');
    // Make 3 paper calendar
    var rightPanel = document.getElementById('right_panel');
    for(i=0;i<3;i++) {
        var date_panel = document.createElement('div');
        date_panel.id = 'date_panel_' + i.toString();
        if(i==0) { date_panel.classList.add('date_show'); date_panel.classList.add('date_mid'); }
        else if(i==1) { date_panel.classList.add('date_show'); date_panel.classList.add('date_behind'); }
        else date_panel.classList.add('date_hide');
        // Top table display solar month and year
        var topMY = document.createElement('table');
        topMY.classList.add('topMY');
        var trTopMY = document.createElement('tr');
        var tdMonth = document.createElement('td');
        tdMonth.style = 'width: 60%;';
        for(j=0;j<2;j++) {
            var dvMonth = document.createElement('div');
            // == Index: 0 & 1, solar month name
            dvMonth.classList.add('panel_' + i.toString());
            tdMonth.appendChild(dvMonth);
        }
        trTopMY.appendChild(tdMonth);
        var tdYear = document.createElement('td');
        tdYear.style = 'width: 40%;';
        var dvYear = document.createElement('div');
        // == Index: 2, solar year
        dvYear.classList.add('panel_' + i.toString());
        tdYear.appendChild(dvYear);
        trTopMY.appendChild(tdYear);
        topMY.appendChild(trTopMY);
        date_panel.appendChild(topMY);
        // Middle table display solar day and day of week
        var midSD = document.createElement('table');
        midSD.classList.add('midSD');
        var trSolarDay = document.createElement('tr');
        var tdSolarDay = document.createElement('td');
        tdSolarDay.colSpan = '2';
        tdSolarDay.style = 'width:100%; font-size: 400%;';
        var dvSolarDay = document.createElement('div');
        // == Index: 3, solar day
        dvSolarDay.classList.add('panel_' + i.toString());
        tdSolarDay.appendChild(dvSolarDay);
        trSolarDay.appendChild(tdSolarDay);
        midSD.appendChild(trSolarDay);
        var trDOW = document.createElement('tr');
        var tdDOW1 = document.createElement('td');
        tdDOW1.style = 'width: 40%;';
        var dvDOW1 = document.createElement('div');
        // == Index: 4, eastern day of week
        dvDOW1.classList.add('panel_' + i.toString());
        tdDOW1.appendChild(dvDOW1);
        trDOW.appendChild(tdDOW1);
        var tdDOW2 = document.createElement('td');
        tdDOW2.style = 'width: 60%';
        var dvDOW2 = document.createElement('div');
        // == Index: 5, english day of week
        dvDOW2.classList.add('panel_' + i.toString());
        tdDOW2.appendChild(dvDOW2);
        trDOW.appendChild(tdDOW2);
        midSD.appendChild(trDOW);
        date_panel.appendChild(midSD);
        // Bottom table
        var botInf = document.createElement('table');
        botInf.classList.add('botInf');
        var trBotInf = document.createElement('tr');
        var tdInf1 = document.createElement('td');
        tdInf1.style = 'width: 50%;';
        tdInf1.rowSpan = '6'; // Span to number of row at right column
        var dvLMonth = document.createElement('div');
        // == Index: 6, lunar month
        dvLMonth.classList.add('panel_' + i.toString());
        tdInf1.appendChild(dvLMonth);
        var dvLDay = document.createElement('div');
        // == Index: 7, lunar day
        dvLDay.classList.add('panel_' + i.toString());
        tdInf1.appendChild(dvLDay);
        var dvLYear = document.createElement('div');
        // == Index: 8, lunar year
        dvLYear.classList.add('panel_' + i.toString());
        tdInf1.appendChild(dvLYear);
        trBotInf.appendChild(tdInf1);
        var tdInf2 = document.createElement('td');
        tdInf2.style = 'width: 10%;';
        tdInf2.innerHTML = '<div style="padding-left: 2%;">&#' + 0x1f552 + ';</div>';
        trBotInf.appendChild(tdInf2);
        var tdInf3 = document.createElement('td');
        tdInf3.style = 'width: 40%;';
        tdInf3.colSpan = '3';
        var dvJulian = document.createElement('div');
        // == Index: 9, julian number at 00:00
        dvJulian.classList.add('panel_' + i.toString());
        tdInf3.appendChild(dvJulian);
        trBotInf.appendChild(tdInf3);
        botInf.appendChild(trBotInf);
        var trInf2 = document.createElement('tr');
        var td21 = document.createElement('td');
        td21.innerHTML = '<div style="padding-left: 2%;">&#' + 0x1f30f + ';</div>';
        trInf2.appendChild(td21);
        var td22 = document.createElement('td');
        td22.colSpan = '3';
        var dvELoc = document.createElement('div');
        // == Index: 10, earth location
        dvELoc.classList.add('panel_' + i.toString());
        td22.appendChild(dvELoc);
        trInf2.appendChild(td22);
        botInf.appendChild(trInf2);
        var trInf3 = document.createElement('tr');
        var td31 = document.createElement('td');
        td31.style = 'width: 10%;';
        td31.innerHTML = '<div style="padding-left: 2%;">&#' + 0x1f4c6 + ';</div>';
        trInf3.appendChild(td31);

        var td32 = document.createElement('td');
        td32.style = 'width: 15%;';
        var dvDOY = document.createElement('div');
        // == Index: 11, day of year
        dvDOY.classList.add('panel_' + i.toString());
        td32.appendChild(dvDOY);
        trInf3.appendChild(td32);

        var td33 = document.createElement('td');
        td33.style = 'width: 10%;';
        td33.innerHTML = '<div style="padding-left: 2%;">&#' + 0x1f5d3 + ';</div>';
        trInf3.appendChild(td33);

        var td34 = document.createElement('td');
        td34.style = 'width: 15%;';
        var dvWOY = document.createElement('div');
        // == Index: 12, week of year
        dvWOY.classList.add('panel_' + i.toString());
        td34.appendChild(dvWOY);
        trInf3.appendChild(td34);
        botInf.appendChild(trInf3);

        var trInf4 = document.createElement('tr');
        var td41 = document.createElement('td');
        // == Index: 13, lunar year icon
        td41.classList.add('panel_' + i.toString());
        trInf4.appendChild(td41);
        var td42 = document.createElement('td');
        td42.colSpan = '3';
        var dvLYName = document.createElement('div');
        // == Index: 14, lunar year name
        dvLYName.classList.add('panel_' + i.toString());
        td42.appendChild(dvLYName);
        trInf4.appendChild(td42);
        botInf.appendChild(trInf4);

        var trInf5 = document.createElement('tr');
        var td51 = document.createElement('td');
        // == Index: 15, lunar month icon
        td51.classList.add('panel_' + i.toString());
        trInf5.appendChild(td51);
        var td52 = document.createElement('td');
        td52.colSpan = '3';
        var dvLMName = document.createElement('div');
        // == Index: 16, lunar month name
        dvLMName.classList.add('panel_' + i.toString());
        td52.appendChild(dvLMName);
        trInf5.appendChild(td52);
        botInf.appendChild(trInf5);

        var trInf6 = document.createElement('tr');
        var td61 = document.createElement('td');
        // == Index: 17, lunar day icon
        td61.classList.add('panel_' + i.toString());
        trInf6.appendChild(td61);
        var td62 = document.createElement('td');
        td62.colSpan = '3';
        var dvLDName = document.createElement('div');
        // == Index: 18, lunar year name
        dvLDName.classList.add('panel_' + i.toString());
        td62.appendChild(dvLDName);
        trInf6.appendChild(td62);
        botInf.appendChild(trInf6);

        var trInf7 = document.createElement('tr');
        var td71 = document.createElement('td');
        // == Index: 19, solar term icon
        td71.classList.add('panel_' + i.toString());
        trInf7.appendChild(td71);
        var td72 = document.createElement('td');
        td72.colSpan = '3';
        var dvSolTerm = document.createElement('div');
        // == Index: 20, solar term name
        dvSolTerm.classList.add('panel_' + i.toString());
        td72.appendChild(dvSolTerm);
        trInf7.appendChild(td72);
        botInf.appendChild(trInf7);

        var trInf8 = document.createElement('tr');
        var td81 = document.createElement('td');
        // == Index: 21, zodiac icon
        td81.classList.add('panel_' + i.toString());
        trInf8.appendChild(td81);
        var td82 = document.createElement('td');
        td82.colSpan = '3';
        var dvZodiac = document.createElement('div');
        // == Index: 22, zodiac name
        dvZodiac.classList.add('panel_' + i.toString());
        td82.appendChild(dvZodiac);
        trInf8.appendChild(td82);
        botInf.appendChild(trInf8);

        date_panel.appendChild(botInf);
        rightPanel.appendChild(date_panel);
    }
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
    shownPanel = 1;
    printPaper(selectedDate);
    slidePaper();
    monthCalendar(dNow.getMonth()+1,dNow.getFullYear());
    
}
var shownPanel;
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
    monthCalendar(_month, _year);
}
const sl_timezone_change = () => {
    var dows = document.getElementsByClassName('dayOfWeeks');
    for(i=0;i<dows.length;i++) {
        dows[i].innerText = _dayOfWeek[i][sl_timezone.selectedIndex];
    }
    ip_month_change();
    printPaper(selectedDate);
    slidePaper();
}
const bt_reset_click = () => {
    var dNow = new Date();
    selectedDate = new SolarDate(dNow.getDate(), dNow.getMonth() + 1, dNow.getFullYear());
    ip_month.value = dNow.getFullYear() + '-' + ((dNow.getMonth() < 9) ? 
        ('0' + (dNow.getMonth() + 1)) : (dNow.getMonth() + 1));
    monthCalendar(dNow.getMonth() + 1, dNow.getFullYear());
    printPaper(selectedDate);
    slidePaper();
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
const around2 = number => {
    if(number==0) return 1;
    else if(number==1) return 2;
    else return 0;
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
    if(selDay!=selectedDate.Day || _month!=selectedDate.Month || _year!=selectedDate.Year) {
        selectedDate = new SolarDate(selDay, _month, _year);
        printPaper(selectedDate);
        slidePaper();
    }
}
const slidePaper = () => {
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
    shownPanel = around2(shownPanel);
}
const enMonthName = ['January','February','March','April','May','June',
                     'July', 'August','September','October','November', 'December'];
const _dayOfWeek = [['T2',String.fromCharCode(0x4e00)],['T3',String.fromCharCode(0x4e8c)],
                     ['T4',String.fromCharCode(0x4e09)],['T5',String.fromCharCode(0x56db)],
                     ['T6',String.fromCharCode(0x4e94)],['T7',String.fromCharCode(0x516d)],
                     ['CN',String.fromCharCode(0x65e5)]];
const dayOfWeekName = [[String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x48,0x61,0x69),
                        String.fromCharCode(0x661f,0x671f,0x4e00),
                        'Monday'],
                        [String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x42,0x61),
                        String.fromCharCode(0x661f,0x671f,0x4e8c),
                        'Tuesday'],
                        [String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x54,0x1b0),
                        String.fromCharCode(0x661f,0x671f,0x4e09),
                        'Wednesday'],
                        [String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x4e,0x103,0x6d),
                        String.fromCharCode(0x661f,0x671f,0x56db),
                        'Thursday'],
                        [String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x53,0xe1,0x75),
                        String.fromCharCode(0x661f,0x671f,0x4e94),
                        'Friday'],
                        [String.fromCharCode(0x54,0x68,0x1b0,0x301,0x20,0x42,0x61,0x309,0x79),
                        String.fromCharCode(0x661f,0x671f,0x516d),
                        'Saturday'],
                        [String.fromCharCode(0x43,0x68,0x75,0x309,0x20,0x4e,0x68,0xe2,0x323,0x74),
                        String.fromCharCode(0x661f,0x671f,0x65e5),
                        'Sunday']];
const monthName = [[String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x4d,0xf4,0x323,0x74),
                        String.fromCharCode(0x4e00,0x6708)], // Th1
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x48,0x61,0x69),
                        String.fromCharCode(0x4e8c,0x6708)], // Th2
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x42,0x61),
                        String.fromCharCode(0x4e09,0x6708)], // Th3
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x54,0x1b0),
                        String.fromCharCode(0x56db,0x6708)], // Th4
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x4e,0x103,0x6d),
                        String.fromCharCode(0x4e94,0x6708)], // Th5
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x53,0xe1,0x75),
                        String.fromCharCode(0x516d,0x6708)], // Th6
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x42,0x61,0x309,0x79),
                        String.fromCharCode(0x4e03,0x6708)], // Th7
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x54,0xe1,0x6d),
                        String.fromCharCode(0x516b,0x6708)], // Th8
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x43,0x68,0xed,0x6e),
                        String.fromCharCode(0x4e5d,0x6708)], // Th9
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x4d,0x1b0,0x1a1,0x300,0x69),
                        String.fromCharCode(0x5341,0x6708)], // Th10
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x4d,0x1b0,0x1a1,0x300,0x69,0x20,0x4d,0xf4,0x323,0x74),
                        String.fromCharCode(0x5341,0x4e00,0x6708)], //Th11
                        [String.fromCharCode(0x54,0x68,0xe1,0x6e,0x67,0x20,0x4d,0x1b0,0x1a1,0x300,0x69,0x20,0x48,0x61,0x69),
                        String.fromCharCode(0x5341,0x4e8c,0x6708)]];
const monthFullName = [[String.fromCharCode(0x111, 0x1ee7), String.fromCharCode(0x5927)],
                        [String.fromCharCode(0x74, 0x68, 0x69, 0x1ebf, 0x75), String.fromCharCode(0x5c0f)]];
const easternZodiacIcon = [[String.fromCharCode(0x1f42d),String.fromCharCode(0x1f42d)],
                            [String.fromCharCode(0x1f42e),String.fromCharCode(0x1f42e)],
                            [String.fromCharCode(0x1f42f),String.fromCharCode(0x1f42f)],
                            [String.fromCharCode(0x1f431),String.fromCharCode(0x1f430)],
                            [String.fromCharCode(0x1f432),String.fromCharCode(0x1f432)],
                            [String.fromCharCode(0x1f40d),String.fromCharCode(0x1f40d)],
                            [String.fromCharCode(0x1f434),String.fromCharCode(0x1f434)],
                            [String.fromCharCode(0x1f410),String.fromCharCode(0x1f410)],
                            [String.fromCharCode(0x1f435),String.fromCharCode(0x1f435)],
                            [String.fromCharCode(0x1f414),String.fromCharCode(0x1f414)],
                            [String.fromCharCode(0x1f436),String.fromCharCode(0x1f436)],
                            [String.fromCharCode(0x1f437),String.fromCharCode(0x1f437)]];
const stemName = [[String.fromCharCode(0x47, 0x69, 0xe1, 0x70),String.fromCharCode(0x7532)],
                    [String.fromCharCode(0x1ea4, 0x74),String.fromCharCode(0x4e59)],
                    [String.fromCharCode(0x42, 0xed, 0x6e, 0x68),String.fromCharCode(0x4e19)],
                    [String.fromCharCode(0x110, 0x69, 0x6e, 0x68),String.fromCharCode(0x4e01)],
                    [String.fromCharCode(0x4d, 0x1ead, 0x75),String.fromCharCode(0x620a)],
                    [String.fromCharCode(0x4b, 0x1ec9),String.fromCharCode(0x5df1)],
                    ['Canh',String.fromCharCode(0x5e9a)],
                    [String.fromCharCode(0x54, 0xe2, 0x6e),String.fromCharCode(0x8f9b)],
                    [String.fromCharCode(0x4e, 0x68, 0xe2, 0x6d),String.fromCharCode(0x58ec)],
                    [String.fromCharCode(0x51, 0x75, 0xfd),String.fromCharCode(0x7678)]];
const branchName = [[String.fromCharCode(0x54, 0xfd),String.fromCharCode(0x5b50)],
                    [String.fromCharCode(0x53, 0x1eed, 0x75),String.fromCharCode(0x4e11)],
                    [String.fromCharCode(0x44, 0x1ea7, 0x6e),String.fromCharCode(0x5bc5)],
                    [String.fromCharCode(0x4d, 0xe3, 0x6f),String.fromCharCode(0x536f)],
                    [String.fromCharCode(0x54, 0x68, 0xec, 0x6e),String.fromCharCode(0x8fb0)],
                    [String.fromCharCode(0x54, 0x1ef5),String.fromCharCode(0x5df3)],
                    [String.fromCharCode(0x4e, 0x67, 0x1ecd),String.fromCharCode(0x5348)],
                    [String.fromCharCode(0x4d, 0xf9, 0x69),String.fromCharCode(0x672a)],
                    [String.fromCharCode(0x54, 0x68, 0xe2, 0x6e),String.fromCharCode(0x7533)],
                    [String.fromCharCode(0x44, 0x1ead, 0x75),String.fromCharCode(0x9149)],
                    [String.fromCharCode(0x54, 0x75, 0x1ea5, 0x74),String.fromCharCode(0x620c)],
                    [String.fromCharCode(0x48, 0x1ee3, 0x69),String.fromCharCode(0x4ea5)]];
const b = 0;
const printPaper = (_date) => {
    var panel = document.getElementsByClassName('panel_' + shownPanel.toString());
    var dow = _date.dayOfWeek();
    var themeColor;
    if(dow<6) {
        themeColor = ['#99d7ff','#60c0ff'];
    }
    else {
        themeColor = ['#ffa8ae','#ff8080'];
    }
    panel[0].style = 'width: 100%; height: auto; font-size: 150%; padding: 2%;' + 
    'font-weight: bold; color: white; background:' + themeColor[0] + ';';
    panel[0].innerText = enMonthName[_date.Month - 1].toUpperCase();
    panel[1].style = 'width: 100%; height: auto; font-size: 120%; padding: 2%;' +
    'font-weight: bold; color:' + themeColor[1] + ';';
    panel[1].innerHTML = monthName[_date.Month - 1][sl_timezone.selectedIndex];
    panel[2].style = 'width: 100%; height: auto; font-size: 200%; padding: 2%;' +
    'font-weight: bold; color: white; background:' + themeColor[1] + '; text-align: right;';
    panel[2].innerText = _date.Year;
    panel[3].style = 'width: 100%; height: auto; padding: 0 2% 0 2%; font-size: 250%;' + 
    'font-weight: bold; text-align: center; color: ' + themeColor[1] + ';';
    panel[3].innerText = _date.Day;
    panel[4].style = 'width: 100%; height: auto; padding: 2%; font-size: 120%; text-align: center;' +
    'font-weight: bold; color: white; background: ' + themeColor[1] + ';';
    panel[4].innerText = dayOfWeekName[_date.dayOfWeek()][sl_timezone.selectedIndex];
    panel[5].style = 'width: 100%; height: auto; padding: 2%; font-size: 160%; text-align: center;' +
    'font-weight: bold; color: white; background: ' + themeColor[0] + ';';
    panel[5].innerText = dayOfWeekName[_date.dayOfWeek()][2];
    var timeZone = ((sl_timezone.selectedIndex==0)?7:8);
    var _lDate = _date.getLunarDate(timeZone);
    var m29 = isFullLunar(_date, timeZone)?0:1;
    panel[6].style = 'width: 100%; padding: 2%; font-size: 100%; text-align:center; font-weight: bold;' + 
    'color: white; background: ' + themeColor[0] + ';';
    panel[6].innerHTML = monthName[_lDate.Month - 1][sl_timezone.selectedIndex] + '<br>' +
                        '<span style="font-size: 70%;">' + 
                        monthFullName[m29][sl_timezone.selectedIndex].toUpperCase() + '</span>';
    var mSize = (sl_timezone.selectedIndex == 0)?600:350;
    panel[7].style = 'width: 100%; padding: 2%; font-size: ' + mSize + '%; text-align: center; ' + 
    'font-weight: bold; color: ' + themeColor[1] + ';';
    panel[7].innerText = lunarDayString(_lDate.Day, sl_timezone.selectedIndex);
    var ySize = (sl_timezone.selectedIndex == 0)?200:150;
    panel[8].style = 'width: 100%; padding: 2%; font-size: ' + ySize + '%; text-align: center; ' +
    'font-weight: bold; color: white; background: ' + themeColor[1] + ';';
    panel[8].innerText = lunarYearString(_lDate.Year, sl_timezone.selectedIndex);
    panel[9].style = 'width: 100%; text-align: center; color: ' + themeColor[1] + ';';
    panel[9].innerText = roundTo(_date.getJulian(timeZone), 3);
    panel[10].style = 'width: 100%; text-align: center; color: ' + themeColor[1] + ';';
    panel[10].innerText = degreeFrom(_date.sunLongitude(timeZone));
    panel[11].style = 'width: 100%; text-align: center; color: ' + themeColor[1] + ';';
    panel[11].innerText = _date.dayOfYear() + 1;
    panel[12].style = 'width: 100%; text-align: center; color: ' + themeColor[1] + ';';
    panel[12].innerText = _date.weekOfYear() + 1;
}
const isFullLunar = (_date, timeZone) => {
    var jul = _date.getJulianDate();
    var lday = _date.getLunarDate(timeZone).Day;
    var oEnd = 30 - lday;
    var jEnd = jul + oEnd;
    var sEnd = fromJulian(jEnd);
    var lEndDay = sEnd.getLunarDate(timeZone).Day;
    if(lEndDay == 30) return true;
    else return false;
}
const lunarDayString = (_lunarDay, timeZoneIndex) => {
    if(timeZoneIndex == 0) return _lunarDay.toString();
    else {
        var decStr = [0x4e00, 0x4e8c, 0x4e09, 0x56db, 0x4e94, 0x516d, 0x4e03, 0x516b, 0x4e5d, 0x5341];
        if(_lunarDay<11) return String.fromCharCode(0x521d,decStr[_lunarDay - 1]);
        else if(_lunarDay<20) return String.fromCharCode(0x5341, decStr[(_lunarDay % 10) - 1]);
        else if(_lunarDay==20) return String.fromCharCode(0x4e8c, 0x5341);
        else if(_lunarDay<30) return String.fromCharCode(0x5eff, decStr[(_lunarDay % 10) - 1]);
        else return String.fromCharCode(0x4e09,0x5341);
    }
}
const lunarYearString = (_year, timeZoneIndex) => {
    if(timeZoneIndex == 0) return _year.toString();
    else {
        var decStr = [0x96f6, 0x4e00, 0x4e8c, 0x4e09, 0x56db, 0x4e94, 0x516d, 0x4e03, 0x516b, 0x4e5d];
        var resStr = '';
        if(_year<10) resStr = String.fromCharCode(decStr[_year]);
        else if(_year<100)
            resStr = String.fromCharCode(decStr[Math.floor(_year/10)],decStr[_year % 10]);
        else if(_year<1000) 
            resStr = String.fromCharCode(decStr[Math.floor(_year/100)],
                decStr[Math.floor((_year % 100)/10)], decStr[_year % 10]);
        else
            resStr = String.fromCharCode(decStr[Math.floor(_year/1000)],
                decStr[Math.floor((_year % 1000)/100)],
                decStr[Math.floor((_year % 100)/10)],
                decStr[_year % 10]);
        return resStr + String.fromCharCode(0x5e74);
    }
}
const roundTo = (_number, _digit) => {
    return Math.round(_number * Math.pow(10, _digit)) / Math.pow(10, _digit);
}
const degreeFrom = _number => {
    var deg = Math.floor(_number);
    var min = Math.floor((_number - deg) * 60);
    var sec = roundTo(((_number - deg) - (min / 60)) * 3600, 2);
    return deg + String.fromCharCode(0xb0) + min + String.fromCharCode(0x27) + 
        sec + String.fromCharCode(0x22);
}