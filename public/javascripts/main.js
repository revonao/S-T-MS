var demoImg = document.getElementById("demo_img");
var demoInput = document.getElementById("password");
//隐藏text block，显示password block
function hideShowPsw(){
    if (demoInput.type === "password") {
        demoInput.type = "text";
        demo_img.src = "invisible.png";
    }else {
        demoInput.type = "password";
        demo_img.src = "visible.png";
    }
}