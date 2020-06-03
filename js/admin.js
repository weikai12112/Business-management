var part = {
    1:'开发部',
    2:'人事部'
}, vacateResult = {
        0:'未审批',
        1:'已批准',
        2:'不通过'
    }, parts = {
        '开发部':1,
        '人事部':2
    };

if ($.cookie('user')){
    var userData = JSON.parse($.cookie('user'));
    console.log(userData)
    $("#userId").text(userData.userName)
    $("#account").text(userData.userName)
}else {
    alert('请先登录')
    $(location).attr('href',"../html/login.html")
}
function leftNav(obj) {
    $("#content").children('div').eq(obj.id).addClass('active')
    $("#content").children('div').eq(obj.id).siblings('div').removeClass('active')
}
function sendWorkInfo() {
    var jobIpt = $(".jobEdit").find('input')
    console.log(jobIpt)
    for (let key = 0 ;key<7;key++){
        console.log(jobIpt[key].value,jobIpt[key])
        if (jobIpt[key].value == ''){
            return alert('请完善信息')
        }
    }
console.log(userData)
    $.ajax({
        url:'http://47.96.133.207:8080/recruitment',
        type:'POST',
        data:{
            id:userData.id,
            companyProfile:$("#companyProfile").val(),
            technicalRequirement	:$("#technicalRequirement\t").val(),
            salaryRange:$("#salaryRange").val(),
            address:$("#address").val(),
            welfare:$("#welfare").val(),
            phone:$("#phone").val(),
            email:$("#email").val(),
        },
        success:function (res) {
            if (res.code == 200){
                alert('发布成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })

}
function deleteJob(obj) {
    let id = obj.id.match(/delete(\S*)/)[1]
    $.ajax({
        url:"http://47.96.133.207:8080/recruitment/"+id,
        type:"DELETE",
        success:function (res) {
            console.log(res)
            if (res.code == 200){
                alert('删除成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}
function pass(obj) {
    let uid = obj.id.match(/uid(\S*)/)[1]
    console.log(uid)
    $.ajax({
        url:'http://47.96.133.207:8080/vacate/updateStatePass/'+uid,
        type:'PUT',
        success:function (res) {
            if (res.code == 200){
                alert('成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}
function refuse(obj) {
    let uid = obj.id.match(/id(\S*)/)[1]
    console.log(uid)
    $.ajax({
        url:'http://47.96.133.207:8080/vacate/updateStatePass/'+uid,
        type:'PUT',
        success:function (res) {
            if (res.code == 200){
                alert('成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}
function quit() {
    $.removeCookie('user')
    $(location).attr('href','../html/login.html')
}
function newUser() {
    if ($("#uName").val() == ''||$("#uName").val().length!=12){
        console.log($("#uName").val())
        return alert('请输入正确的账号')
    }
    if ($("#password1").val()==''||$("#password2").val()==''||$("#password1").val()!=$("#password2").val()||$("#password1").val().length<6||$("#password1").val().length>16){
        console.log($("#password1").val(),$("#password2").val())
        return alert('两次密码输入错误')
    }
    $.ajax({
        url:'http://47.96.133.207:8080/user/registered',
        type:'POST',
        data:{
            userName:$("#uName").val(),
            password:$("#password1").val(),
            roleId:parts[$("#nPart").val()]
        },
        success:function (res) {
            if (res.code == 200){
                alert('创建成功')
            }else {
                alert(res.data)
            }
        }
    })
}
function change(obj) {
    for (let key in $("#infoChange").find('input')){
        if ($("#infoChange").find('input')[key].value==''){
            return alert('请完善信息')
        }
    }
    console.log($("#part").val())
    console.log($("#part"))
    $.ajax({
        url:'http://47.96.133.207:8080/employee',
        type:'PUT',
        data:{
            id: obj.id.match(/Bid(\S*)/)[1],
            userName:$("#userName").val(),
            // d.departmentName:$("#d.departmentName").val(),
            name:$("#name").val(),
            sex:$("#sex").val(),
            nation:$("#nation").val(),
            hobby:$("#hobby").val(),
            birth:$("#birth").val(),
            phone:$("#uphone").val(),
            address:$("#uaddress").val(),
            departmentId:parts[$("#part").val()]
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
function changeInfo(obj) {
    let uid = obj.id.match(/Aid(\S*)/)[1]
    console.log(uid)
    $.ajax({
        url:"http://47.96.133.207:8080/employee/"+uid,
        type:"GET",
        success:function (res) {
            console.log(res)
            document.getElementById('infoChange').remove()
            $("#infoEdit").append('<div class="jobEdit" id="infoChange">\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>用户名</div>\n' +
                '                        <input type="text" id="userName" value="'+res.data.userName+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>姓名</div>\n' +
                '                        <input type="text" id="name" value="'+res.data.name+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>性别</div>\n' +
                '                        <input type="text" id="sex" value="'+res.data.sex+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>国家</div>\n' +
                '                        <input type="text" id="nation" value="'+res.data.nation+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>爱好</div>\n' +
                '                        <input type="text" id="hobby" value="'+res.data.hobby+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>生日</div>\n' +
                '                        <input type="text" id="birth" value="'+res.data.birth+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>手机号</div>\n' +
                '                        <input type="text"id="uphone" value="'+res.data.phone+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob">\n' +
                '                        <div>地址</div>\n' +
                '                        <input type="text" id="uaddress" value="'+res.data.address+'">\n' +
                '                    </div>\n' +
                '                    <div class="info-line sendJob" id="departmentId">\n' +
                '                        <div>部门</div>\n' +
                '                        <select name="" id="part">\n' +
                '                            <option id="p1">开发部</option>\n' +
                '                            <option id="p2">人事部</option>\n' +
                '                        </select>\n' +
                '                    </div>\n' +
                '                    <div class="BOTTOM send" id="Bid'+res.data.id+'" onclick="change(this)">确定修改</div>\n' +
                '                </div>')
        }
    })
    $("#infoEdit").addClass('active')
    $("#infoEdit").siblings('div').removeClass('active')
}
function changeVacate(obj) {
    $("#allVacate").children('div').removeClass('active')
    console.log(document.getElementById(obj.id.match(/(\S*)1/)[1]),obj.id.match(/(\S*)1/)[1])
    if (document.getElementById(obj.id.match(/(\S*)1/)[1]) == null){
        return console.log(document.getElementById(obj.id.match(/(\S*)1/)[1]))
    }
    document.getElementById(obj.id.match(/(\S*)1/)[1]).classList.add('active')
}
function deleteAnou(obj) {
    $.ajax({
        url:'http://47.96.133.207:8080/announcement/'+obj.id,
        type:'DELETE',
        success:function (res) {
            if (res.code == 200){
                alert('删除成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}
function announceMent() {
    $.ajax({
        url:"http://47.96.133.207:8080/announcement",
        type:"POST",
        data:{
            content:$("#announceMent").val()
        },
        success:function (res) {
            if (res.code == 200){
                alert('发布成功')
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}

var parem = encodeURIComponent("{}");

var Fdata = new FormData()
Fdata.append('check',{})
$.ajax({
    url:"http://47.96.133.207:8080/selectAbsentee",
    type:"POST",
    contentType:'application/json',
    data:'{}',
    success:function (res) {
        console.log(res)
        for(let key in res.data){
            $("#check").append('<div class="block nocheck">\n' +
                '                    <div>账号：'+res.data[key].userName+'</div>\n' +
                '                    <div>未签到</div>\n' +
                '                </div>')
        }
    }
})
$.ajax({
    url:'http://47.96.133.207:8080/getAbsenteeNum',
    type:"POST",
    contentType:'application/json',
    data:'{}',
    success:function (res) {
        $("#num").text('应到人数：'+res.data.numOfAbsentee+'，未签人数：'+res.data.numOfStudent)
    }
})
$.ajax({
    url:'http://47.96.133.207:8080/employee/list',
    type:"GET",
    success:function (res) {
        for (let key in res.data){
            $("#employ").append('<div class="block employ">\n' +
                '                    <h4>用户名：'+res.data[key].userName+'，'+res.data[key].name+'</h4>\n' +
                '                    <div>性别：'+res.data[key].sex+'，国家：'+res.data[key].nation+'</div>\n' +
                '                    <div>爱好：'+res.data[key].hobby+'，生日：'+res.data[key].birth+'</div>\n' +
                '                    <div>电话：'+res.data[key].phone+'，地址：'+res.data[key].address+'</div>\n' +
                '                    <div class="part">'+part[res.data[key].departmentId]+'</div>\n' +
                '                    <div class="vacateR" id="Aid'+res.data[key].id+'" onclick="changeInfo(this)">更改信息</div>\n' +
                '                </div>')
        }
    }
});
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
                '                    <div class="delete" id="delete'+res.records[keys].id+'" onclick="deleteJob(this)">删除</div>\n' +
                '                    <h4 class="salary">月薪：'+res.records[keys].salaryRange+'人民币</h4>\n' +
                '                    <div>技术要求：'+res.records[keys].technicalRequirement+'</div>\n' +
                '                    <div>地址：'+res.records[keys].address+'</div>\n' +
                '                    <div>工作福利：'+res.records[keys].welfare+'</div>\n' +
                '                    <div>电话：'+res.records[keys].phone+'</div>\n' +
                '                    <div>邮箱：'+res.records[keys].email+'</div>\n' +
                '                </div>\n' +
                '            </div>')
        }
    }
});
$.ajax({
    url:'http://47.96.133.207:8080/announcement/list',
    type:'GET',
    success:function(res){
        console.log(res)
        for (let key in res.data){
            $("#history").append('<div class="block">\n' +
                '                        <div>'+res.data[key].content+'</div>\n' +
                '                        <div class="delete" id="'+res.data[key].id+'" onclick="deleteAnou(this)">删除</div>\n' +
                '                        <div class="time">'+res.data[key].date+'</div>\n' +
                '                    </div>')
        }
    }
})
$.ajax({
    url:'http://47.96.133.207:8080/vacate/list',
    type:"GET",
    success:function (res) {
        console.log(res)
        var vacateData = new Array(),vacatePass= new Array(),vacatRefuse= new Array()
        for (let key in res.data){
            if (res.data[key].state == 0){
                vacateData.push(res.data[key])
            }
            if (res.data[key].state == 1){
                vacatePass.push(res.data[key])
            }
            if (res.data[key].state == 2){
                vacatRefuse.push(res.data[key])
            }
        }
console.log(vacateData,vacatePass,vacatRefuse)
        for (let key in vacateData){
            $("#noResult").append('<div class="block employ">\n' +
                '                    <h4>用户名：'+vacateData[key].userName+'</h4>\n' +
                '                    <div>开始时间：'+vacateData[key].startTime+'，结束时间：'+res.data[key].endTime+'</div>\n' +
                '                    <div>原因：'+vacateData[key].reason+'</div>\n' +
                '                    <div class="part">'+vacateResult[vacateData[key].state]+'</div>\n' +
                '                    <div class="vacateR" id="uid'+vacateData[key].id+'" onclick="pass(this)">批准</div>\n' +
                '                    <div class="vacateL" id="id'+vacateData[key].id+'" onclick="refuse(this)">拒绝</div>\n' +
                '                </div>')
        }
        for (let key in vacatePass){
            $("#hadPass").append('<div class="block employ">\n' +
                '                    <h4>用户名：'+vacatePass[key].userName+'</h4>\n' +
                '                    <div>开始时间：'+vacatePass[key].startTime+'，结束时间：'+res.data[key].endTime+'</div>\n' +
                '                    <div>原因：'+vacatePass[key].reason+'</div>\n' +
                '                    <div class="part">'+vacateResult[vacatePass[key].state]+'</div>\n' +
                '                </div>')
        }
        for (let key in vacatRefuse){
            $("#hadRefuse").append('<div class="block employ">\n' +
                '                    <h4>用户名：'+vacatRefuse[key].userName+'</h4>\n' +
                '                    <div>开始时间：'+vacatRefuse[key].startTime+'，结束时间：'+res.data[key].endTime+'</div>\n' +
                '                    <div>原因：'+vacatRefuse[key].reason+'</div>\n' +
                '                    <div class="part">'+vacateResult[vacatRefuse[key].state]+'</div>\n' +
                '                </div>')
        }
    }
});