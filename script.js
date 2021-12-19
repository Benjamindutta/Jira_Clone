let addbtn = document.querySelector('.add-btn');
let modal = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".text-area-cont")
let addFlag = false;

addbtn.addEventListener('click', (e) => {
    //display modal
    //Generate ticket

    //addflag=true-> modal display
    //addflag=false-> modal none

    addFlag = !addFlag;
    if (addFlag) {
        modal.style.display = 'flex';
        addbtn.style.backgroundColor = "#9AECDB";
    } else {
        modal.style.display = 'none';
        addbtn.style.backgroundColor = "#636e72";
    }

});


taskArea.addEventListener("keydown", (e) => {
    let keypressed = e.key;
    if (keypressed === 'Shift') {
        createTicket();
        addFlag = false;
        modal.style.display = 'none';
        addbtn.style.backgroundColor = "#636e72";
        taskArea.value = '';
    }

})
function createTicket() {
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `
            <div class="ticket-color"></div>
            <div class="ticket-id"></div>
            <div class="task-area"></div>`;
    mainCont.appendChild(ticketContainer);

}