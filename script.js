const top = document.getElementById("top")

document.onkeydown = insertText

function insertText(e){
    e = e || window.event
    if(e.keyCode == "38"){
        top.innerText = "tool tip"
    }
}