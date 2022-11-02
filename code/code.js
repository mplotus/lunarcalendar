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
    
}