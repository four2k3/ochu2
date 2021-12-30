var $=document.querySelector.bind(document)
var $$=document.querySelectorAll.bind(document)
var indexQuestion = 0
var btnAnswer = $('.btnAnswer')
var inputAnswer= $('.inputAnswer')
var tableSquare= $('.tableSquare')
var listHtmls = [];
var listQuestion = ["ABCD","XXX","Từ khoá","VietNam","XX"]
var listAnswer = ["ABCD","XXX","Từ khoá","VietNam","XX"]
var listAnswer = []
var listQuestion =[]
//Render square
function render(){
    listAnswer.forEach(function(vl,id){
       var htmls = ""; 
        htmls+=`
        <tr class="rowTable">
        <th><button class="askIndex">${id+1}</button></th> 
        `
        for(var i=0;i<vl.length;i++){
            htmls+= `<td class="columTable">
            <h1 class="contentSquare" ></h1>
            </td> `
        }
        htmls+=`</tr>`
        listHtmls.push(htmls)
    })
    const renderTable  = listHtmls.map(function(vl,id){
        return `
        ${vl}
        `
    })
    tableSquare.innerHTML = renderTable.join('')
  
    $('.boxAnswer').style.display = "block"
}
// affterRender()
function affterRender(){
    // Create var
    var askIndex = $$('.askIndex')
    var rowTable = $$('.rowTable')
                // if(askIndex[0]) askIndex[0].classList.add('askIndexActivate')  // set Activate
    
    // Activate ask
    askIndex.forEach(function(vl,id){
        vl.onclick=function(){
            indexQuestion=id
            $('.textShowQuestion').textContent = 
            `Câu ${indexQuestion+1}. ${listQuestion[indexQuestion]}`
            if($('.askIndexActivate')) $('.askIndexActivate').classList.remove('askIndexActivate')
            vl.classList.add('askIndexActivate')
            inputAnswer.focus()
        }
    })

    // Button Submit
    function btnAnsWerFunct(){
        inputAnswer.value = inputAnswer.value.replace(/\s+/g, '')
        inputAnswer.value = inputAnswer.value.toUpperCase()
        if(inputAnswer.value != ""){
            // Add, remove rowTable false or true
            if(inputAnswer.value!=listAnswer[indexQuestion]) {
                rowTable[indexQuestion].classList.add('rowTableFalse')
                rowTable[indexQuestion].classList.remove('rowTableTrue')
    
            }
            else {
                rowTable[indexQuestion].classList.add('rowTableTrue')
                rowTable[indexQuestion].classList.remove('rowTableFalse')
            }
            // 
            rowTable[indexQuestion].querySelectorAll('.contentSquare').forEach(function(vl,id){
            vl.textContent = inputAnswer.value[id]
            })
            inputAnswer.value=""
        }
    }
    btnAnswer.onclick=function(){
        btnAnsWerFunct()
    }
    
    // Enter answer
    inputAnswer.onkeyup = function(event){
        if(event.which == 13) btnAnsWerFunct();
    }
    //Show Answer
    $('.showAnswer').onclick = function(){
    inputAnswer.value = listAnswer[indexQuestion]
    btnAnsWerFunct()
}
}
//End affterRender

// Create new
var countAskJS = 0;
var checkFinsh = false;
function resetGame(){
    countAskJS = 0;
    listAnswer=[]
    listHtmls=[]
    listQuestion = []
    checkFinsh = true;
    render()
    $('.countAsk').textContent = ""
    $('.countAsk').textContent = ""
    $('.textShowQuestion').textContent=""
    $('.boxAnswer').style.display = "none"
    $('.nextAsk').style.display="inline-block"
    $('.finish').style.display="inline-block"
    $('.boxNewGame').style.display="inline-block"
    nextAskFunct()
    affterRender()
}
$('.newGameBtn').onclick  = function(){
    resetGame()
}
function nextAskFunct(){
    if(checkFinsh){
            var newQuestion= $('.newQuestion')
            var newAnswer = $('.newAnswer')
            //Delete space
            // newQuestion.value = newQuestion.value.replace(/\s+/g, '')
            newAnswer.value = newAnswer.value.replace(/\s+/g, '')
            if(newAnswer.value==""||newQuestion.value=="") $('.message_next').textContent="Vui lòng nhập đầy đủ"
            else {
                $('.message_next').textContent=""
                // $('.message_finish').style.display="none"
                // newQuestion.value = newQuestion.value.toUpperCase()
                newAnswer.value = newAnswer.value.toUpperCase()
                listQuestion.push(newQuestion.value)
                listAnswer.push(newAnswer.value)
                newQuestion.value=""
                newAnswer.value=""
                countAskJS++
                $('.countAsk').textContent=`Số câu đã làm ${countAskJS}`
                }
    }
    else {
        $('.message_next').textContent =`Bạn phải tạo lại2.`
        $('.countAsk').textContent=``
        }
        $('.newQuestion').focus()
}
    $('.nextAsk').onclick = function() {
        nextAskFunct();
    }
    $('.finish').onclick = function(){
    if(checkFinsh&&countAskJS>0) {
        render()
        affterRender()
        checkFinsh = false
        $('.nextAsk').style.display="none"
        $('.finish').style.display="none"
        $('.boxNewGame').style.display="none"
    }
    else  $('.message_next').textContent =`Bạn phải tạo lại.`
    // if(!checkFinsh&&countAskJS>0) $('.message_next').textContent =`Bạn phải tạo lại.`
}
//Enter input answer _ question
$('.newQuestion').onkeyup = function(event){
    if(event.which == 13) {
        nextAskFunct();
    }
}
$('.newAnswer').onkeyup = function(event){
    if(event.which == 13) nextAskFunct();
}





// Check Answer
//rowTableFalse