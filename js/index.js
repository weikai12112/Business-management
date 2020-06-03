let IndexInformation={
    timeInner:[],
    timeInnerKey:false,
}
var part = {
    '开发部':1,
    '人事部':2
}
if ($.cookie('user')){
    var userData = JSON.parse($.cookie('user'));
    $("#account").text(userData.userName)
    $("#uaccount").text(userData.userName)
    $("#identy").text(userData.r.roleName)
}else {
    alert('请先登录')
    $(location).attr('href',"../html/login.html")
}
$.ajax({
    url:"http://47.96.133.207:8080/recruitment/page",
    type:"GET",
    data:{
        pageNum:1,
        pageSize:10
    },
    success:function (res) {
        for (let keys in  res.records){
            $("#job").append('<div class="block job">\n' +
                '                <h3>'+res.records[keys].companyProfile+'</h3>\n' +
                '                <div>\n' +
                '                    <h4 class="salary">月薪：'+res.records[keys].salaryRange+'人民币</h4>\n' +
                '                    <div>技术要求：'+res.records[keys].technicalRequirement+'</div>\n' +
                '                    <div>地址：'+res.records[keys].address+'</div>\n' +
                '                    <div>工作福利：'+res.records[keys].welfare+'</div>\n' +
                '                    <div>电话：'+res.records[keys].phone+';邮箱：'+res.records[keys].email+'</div>\n' +
                '                </div>\n' +
                '            </div>')
        }
    }
})
$.ajax({
    url:'http://47.96.133.207:8080/getStuCheckInDay',
    type:'POST',
    success:function (res) {
        console.log(res)
        for (let key in res.data){
            $("#hasClock").append('<div class="clockList">\n' +
                '                            <div>'+res.data[key].userName+'</div>\n' +
                '                            <div>'+res.data[key].triggerTime+'</div>\n' +
                '                        </div>')
        }
    }
})
$.ajax({
    url:"http://47.96.133.207:8080/userCheckList",
    type:"GET",
    data:{
        userName:userData.userName
    },
    success:function (res) {
        for (let key in res.data){
            $("#hadClock").append('<div class="clockList">\n' +
                '                            <div>'+res.data[key].userName+'</div>\n' +
                '                            <div>'+res.data[key].triggerTime+'</div>\n' +
                '                        </div>')
        }
    }
})
$.ajax({
    url:"http://47.96.133.207:8080/announcement/lastRecord",
    type:"GET",
    success:function (res) {
        console.log(res.data)
        $("#content").text(res.data.content)
        $(".time").text(res.data.date)
    }
})
var userData = JSON.parse($.cookie('user'));
var change ={
    1:0,
    0:1
}
function closeIt(obj) {
    console.log(111)
    $("#notice").fadeOut()
}
function changePassword() {
    for (let key in $("#passwordChange").find('input')){
        if ($("#passwordChange").find('input')[key].value==''){
            return alert('请完善信息')
        }
    }
    $.ajax({
        url:'http://47.96.133.207:8080/user/updatePassword',
        type:'PUT',
        data:{
            userName:userData.userName,
            password:$("#newPassword").val()
        },
        success:function (res) {
            console.log(res)
            if (res.code == 200){
                alert('修改成功')
                $("#passwordChange").fadeOut()
            }else{
                alert(res.data)
            }
        }
    })
}
function quit() {
    $.removeCookie('user')
    $(location).attr('href','../html/login.html')
}
function changeInfo() {
    for (let key in $("#infoEdit").find('input')){
        if ($("#infoEdit").find('input')[key].value==''){
            return alert('请完善信息')
        }
    }
    console.log($("#part").val())
    console.log($("#part"))
    $.ajax({
        url:'http://47.96.133.207:8080/employee',
        type:'POST',
        data:{
            userName:userData.userName,
            // d.departmentName:$("#d.departmentName").val(),
            name:$("#name").val(),
            sex:$("#sex").val(),
            nation:$("#nation").val(),
            hobby:$("#hobby").val(),
            birth:$("#birth").val(),
            phone:$("#phone").val(),
            address:$("#address").val(),
            departmentId:part[$("#part").val()]
        },
        success:function (res) {
            console.log(res)
            if (res.code == 200){
                alert('修改成功')
                $("#infoEdit").fadeOut()
            }else{
                alert(res.data)
            }
        }
    })
}
function switchIt(obj) {
    console.log($("#switch")[0].children[$(obj)[0].id],$("#switch")[0].children[change[$(obj)[0].id]])
    $("#switch")[0].children[$(obj)[0].id].classList.remove('none')
    $("#switch")[0].children[change[$(obj)[0].id]].classList.add('none')
    $(obj).siblings('div').removeClass('active')
    obj.classList.add('active')
}
function checkIt() {
    $.ajax({
        url: 'http://47.96.133.207:8080/addCheck',
        type:"POST",
        data:{
            userName:userData.userName
        },
        success(res){
            alert(res.data)
        }
    })
}
function closeInfoEdit() {
    $("#infoEdit").fadeOut()
}
function closeChange() {
    $("#passwordChange").fadeOut()
}
function openIt() {
    $("#infoEdit").fadeIn()
}
function changeP() {
    $("#passwordChange").fadeIn()
}
function vacate(){
    if ($("#beginTime").val()==''||$("#endTime").val()==''||$("#reason").val()==''){
        return alert('请完善信息')
    }
    $.ajax({
        url:"http://47.96.133.207:8080/vacate",
        type:"POST",
        data:{
            userName:userData.userName,
            startTime:$("#beginTime").val(),
            endTime:$("#endTime").val(),
            reason:$("#reason").val()
        },
        success:function (res) {
            if (res.code == 200){
                alert('发送成功')
            }
        }
    })
}


$('#time').click(function () {
    IndexInformation.timeInnerKey=true;
    $('#time').change(function () {
        if (IndexInformation.timeInnerKey){
            if (!IndexInformation.timeInner[0]){
                IndexInformation.timeInner.push($(this).val());
                $(this).attr('placeholder',IndexInformation.timeInner[0]+' 结束请假日期');
                IndexInformation.timeInnerKey=false;
                $(this).val('');
            }else {
                IndexInformation.timeInner.push($(this).val());
                IndexInformation.timeInnerKey=false;
                $(this).val(IndexInformation.timeInner[0]+' '+IndexInformation.timeInner[1]);
                IndexInformation.timeInner=[];
            }
        }
    })


})

// let checkScreen=function (){
//     let IntvId=setInterval(function () {
//         if (window.orientation == 180 || window.orientation == 0) {
//             $('#horizontalScreenTips').eq(0).removeClass('hidden');
//         }
//         if (window.orientation == 90 || window.orientation == -90) {
//             $('#horizontalScreenTips').eq(0).addClass('hidden');
//         }
//         window.clearInterval(IntvId);
//     },1000)
// }
$.fn.datetimepicker.dates['zh'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    meridiem: ["上午", "下午"],
    //suffix:      ["st", "nd", "rd", "th"],
    today: "今天"
};
$("#time").datetimepicker({
    language: 'zh',  //用自己设置的时间文字
    //weekStart: 1,  //一周从那天开始，默认为0，从周日开始，可以设为1从周一开始
    // startDate:"2018-5-20", //开始时间，可以写字符串，也可以直接写日期格式new Date(),在这之前的日期不能选择
    //endDate:"2018-6-20",
    //daysOfWeekDisabled: [0,4,6],  //一周的周几不能选
    todayBtn: 1,  //是否显示今天按钮，0为不显示
    autoclose: 1, //选完时间后是否自动关闭
    todayHighlight: 1,  //高亮显示当天日期
    startView: 2, //0从小时视图开始，选分;1	从天视图开始，选小时;2从月视图开始，选天;3从年视图开始，选月;4从十年视图开始，选年
    minView: 2,//最精确时间，默认0；0从小时视图开始，选分；1从天视图开始，选小时；2从月视图开始，选天；3从年视图开始，选月；4从十年视图开始，选年
    //maxView:4,  //默认值：4, ‘decade’
    //keyboardNavigation:true,  //是否可以用键盘方向键选日期，默认true
    forceParse: 0, //强制解析,你输入的可能不正规，但是它胡强制尽量解析成你规定的格式（format）
    format: 'yyyy-mm-dd',// 格式,注意ii才是分，mm或MM都是月
    minuteStep: 5, //选择分钟时的跨度，默认为5分钟
    //pickerPosition:"top-right",  // ‘bottom-left’，’top-right’，’top-left’’bottom-right’
    showMeridian: 0, //在日期和小时选择界面，出现上下午的选项,默认false
    // showSecond: false,
    // showMillisec: true,
    //timeFormat: 'hh:mm:ss:l',
    //bootcssVer: 3,

})
$("#birth").datetimepicker({
    language: 'zh',  //用自己设置的时间文字
    //weekStart: 1,  //一周从那天开始，默认为0，从周日开始，可以设为1从周一开始
    // startDate:"2018-5-20", //开始时间，可以写字符串，也可以直接写日期格式new Date(),在这之前的日期不能选择
    //endDate:"2018-6-20",
    //daysOfWeekDisabled: [0,4,6],  //一周的周几不能选
    todayBtn: 1,  //是否显示今天按钮，0为不显示
    autoclose: 1, //选完时间后是否自动关闭
    todayHighlight: 1,  //高亮显示当天日期
    startView: 2, //0从小时视图开始，选分;1	从天视图开始，选小时;2从月视图开始，选天;3从年视图开始，选月;4从十年视图开始，选年
    minView: 2,//最精确时间，默认0；0从小时视图开始，选分；1从天视图开始，选小时；2从月视图开始，选天；3从年视图开始，选月；4从十年视图开始，选年
    //maxView:4,  //默认值：4, ‘decade’
    //keyboardNavigation:true,  //是否可以用键盘方向键选日期，默认true
    forceParse: 0, //强制解析,你输入的可能不正规，但是它胡强制尽量解析成你规定的格式（format）
    format: 'yyyy-mm-dd',// 格式,注意ii才是分，mm或MM都是月
    minuteStep: 5, //选择分钟时的跨度，默认为5分钟
    //pickerPosition:"top-right",  // ‘bottom-left’，’top-right’，’top-left’’bottom-right’
    showMeridian: 0, //在日期和小时选择界面，出现上下午的选项,默认false
    // showSecond: false,
    // showMillisec: true,
    //timeFormat: 'hh:mm:ss:l',
    //bootcssVer: 3,

})
$("#beginTime").datetimepicker({
    language: 'zh',  //用自己设置的时间文字
    //weekStart: 1,  //一周从那天开始，默认为0，从周日开始，可以设为1从周一开始
    // startDate:"2018-5-20", //开始时间，可以写字符串，也可以直接写日期格式new Date(),在这之前的日期不能选择
    //endDate:"2018-6-20",
    //daysOfWeekDisabled: [0,4,6],  //一周的周几不能选
    todayBtn: 1,  //是否显示今天按钮，0为不显示
    autoclose: 1, //选完时间后是否自动关闭
    todayHighlight: 1,  //高亮显示当天日期
    startView: 2, //0从小时视图开始，选分;1	从天视图开始，选小时;2从月视图开始，选天;3从年视图开始，选月;4从十年视图开始，选年
    minView: 2,//最精确时间，默认0；0从小时视图开始，选分；1从天视图开始，选小时；2从月视图开始，选天；3从年视图开始，选月；4从十年视图开始，选年
    //maxView:4,  //默认值：4, ‘decade’
    //keyboardNavigation:true,  //是否可以用键盘方向键选日期，默认true
    forceParse: 0, //强制解析,你输入的可能不正规，但是它胡强制尽量解析成你规定的格式（format）
    format: 'yyyy-mm-dd',// 格式,注意ii才是分，mm或MM都是月
    minuteStep: 5, //选择分钟时的跨度，默认为5分钟
    //pickerPosition:"top-right",  // ‘bottom-left’，’top-right’，’top-left’’bottom-right’
    showMeridian: 0, //在日期和小时选择界面，出现上下午的选项,默认false
    // showSecond: false,
    // showMillisec: true,
    //timeFormat: 'hh:mm:ss:l',
    //bootcssVer: 3,

})
$("#endTime").datetimepicker({
    language: 'zh',  //用自己设置的时间文字
    //weekStart: 1,  //一周从那天开始，默认为0，从周日开始，可以设为1从周一开始
    // startDate:"2018-5-20", //开始时间，可以写字符串，也可以直接写日期格式new Date(),在这之前的日期不能选择
    //endDate:"2018-6-20",
    //daysOfWeekDisabled: [0,4,6],  //一周的周几不能选
    todayBtn: 1,  //是否显示今天按钮，0为不显示
    autoclose: 1, //选完时间后是否自动关闭
    todayHighlight: 1,  //高亮显示当天日期
    startView: 2, //0从小时视图开始，选分;1	从天视图开始，选小时;2从月视图开始，选天;3从年视图开始，选月;4从十年视图开始，选年
    minView: 2,//最精确时间，默认0；0从小时视图开始，选分；1从天视图开始，选小时；2从月视图开始，选天；3从年视图开始，选月；4从十年视图开始，选年
    //maxView:4,  //默认值：4, ‘decade’
    //keyboardNavigation:true,  //是否可以用键盘方向键选日期，默认true
    forceParse: 0, //强制解析,你输入的可能不正规，但是它胡强制尽量解析成你规定的格式（format）
    format: 'yyyy-mm-dd',// 格式,注意ii才是分，mm或MM都是月
    minuteStep: 5, //选择分钟时的跨度，默认为5分钟
    //pickerPosition:"top-right",  // ‘bottom-left’，’top-right’，’top-left’’bottom-right’
    showMeridian: 0, //在日期和小时选择界面，出现上下午的选项,默认false
    // showSecond: false,
    // showMillisec: true,
    //timeFormat: 'hh:mm:ss:l',
    //bootcssVer: 3,

})
// checkScreen();
