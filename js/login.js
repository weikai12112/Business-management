var change ={
    1:0,
    0:1
},identy={
    staff:1,
    admin:2
},type="-1"
function wayNav(obj) {
    console.log($("#info")[0].children[$(obj)[0].id],$("#info")[0].children[change[$(obj)[0].id]])
    $("#info")[0].children[$(obj)[0].id].classList.remove('none')
    $("#info")[0].children[change[$(obj)[0].id]].classList.add('none')
    $(obj).siblings('div').removeClass('active')
    obj.classList.add('active')

}
function regist() {
    if ($("#account").val() == ''||$("#account").val().length!=12){
        return alert('请输入正确的账号')
    }
    if ($("#password1").val()==''||$("#password2").val()==''||$("#password1").val()!=$("#password2").val()||$("#password1").val().length<6||$("#password1").val().length>16){
        console.log($("#password1").val(),$("#password2").val())
        return alert('两次密码输入错误')
    }
    if (type == "-1"){
        return alert('请选择注册类型')
    }
    var sendData = new FormData();
    sendData.append('id',$("#account").val())
    sendData.append('password',$("#password1").val())
    sendData.append('roleId',type)
    $.ajax({
        url:'http://47.96.133.207:8080/user/registered',
        type:'POST',
        data:{
            userName:$("#account").val(),
            password:$("#password1").val(),
            roleId:type
        },
        success:function (res) {
            if (res.code == 200){
                alert('注册成功')
            }else {
                alert(res.data)
            }
        }
    })
}
function identySwitch(obj) {
    $(obj).css({
        "border":"1px solid #01438f",
        "color":"#01438f"
    })
    $(obj).siblings('div').css({
        "border":"1px solid grey",
        "color":"grey"
    })
    console.log($(obj)[0].id)
    type=identy[$(obj)[0].id]
}
function login() {
    $.ajax({
        url:"http://47.96.133.207:8080/user/login",
        type:"POST",
        data:{
            userName:$("#loginAccount").val(),
            password:$("#loginPassword").val()
        },
        success:function (res) {
            console.log(res)

            $.cookie('user',JSON.stringify(res.data))
            if (res.data.r.roleName == '员工'){
                $(location).attr('href','../html/index.html')
            }else{
                $(location).attr('href','../html/admin.html')
            }
        }
    })
}
