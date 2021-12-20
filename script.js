let addbtn = document.querySelector('.add-btn');
let modal = document.querySelector(".modal-cont");
let removebtn = document.querySelector(".remove-btn")
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".text-area-cont")
let colors = ['lightpink', 'lightblue', 'lightgreen', 'black'];
let modal_priority_color = colors[colors.length - 1];
let toolboxColor = document.querySelectorAll(".color");
let allpriority_color = document.querySelectorAll('.priority-color');

//flags for add and remove
let addFlag = false;
let removeFlag = false;

let ticketArr = [];

let lockedIcon = "fa-lock";
let unlockedIcon = "fa-unlock";

//for colors in the toolbar
for (let i = 0; i < toolboxColor.length; i++) {
    let currentToolboxcolor;
    toolboxColor[i].addEventListener("click", (e) => {
        currentToolboxcolor = toolboxColor[i].classList[0];
        let filteredTickets = ticketArr.filter((ticketobj) => {
            return currentToolboxcolor === ticketobj.ticketColor;
        });

        let ticketsToRemove = document.querySelectorAll(".ticket-cont");
        ticketsToRemove.forEach((tickets) => {
            tickets.remove();
        })

        filteredTickets.forEach((tickets) => {
            createTicket(tickets.ticketColor, tickets.ticketTask, tickets.ticketId);
        })
    });

    toolboxColor[i].addEventListener('dblclick', (e) => {
        let ticketsToRemove = document.querySelectorAll(".ticket-cont");
        ticketsToRemove.forEach((tickets) => {
            tickets.remove();
        });
        ticketArr.forEach((ticketObj) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId);
        });

    })

}
//listeners for priority color
allpriority_color.forEach((priority_color, idx) => {
    priority_color.addEventListener('click', (e) => {
        allpriority_color.forEach((colorEle, idx) => {
            colorEle.classList.remove('border');
        })
        priority_color.classList.add("border");
        modal_priority_color = priority_color.classList[0];
    })
})
//eventlistener for addbtn and when clicked it will initiate
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

//click eventlistener for removebutton
removebtn.addEventListener('click', (e) => {
    removeFlag = !removeFlag;
})

taskArea.addEventListener("keydown", (e) => {
    let keypressed = e.key;
    if (keypressed === 'Shift') {
        createTicket(modal_priority_color, taskArea.value);
        addFlag = false;
        modal.style.display = 'none';
        addbtn.style.backgroundColor = "#636e72";
        taskArea.value = '';
        allpriority_color.forEach((colorEle, idx) => {
            colorEle.classList.remove('border');
        })
        allpriority_color[colors.length - 1].classList.add("border");
    }

})

//ticket creating function

function createTicket(ticketColor, ticketTask, ticketId) {
    let id = ticketId || shortid();
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `
            <div class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id" > #${id}</div>
            <div class="task-area">${ticketTask}</div>
            <div class="lock">
                <i class="fas fa-lock"></i>
            </div>`;
    if (!ticketId) {
        ticketArr.push({ ticketColor, ticketTask, ticketId: id })
    }
    mainCont.appendChild(ticketContainer);
    //handle remove is handled
    handleRemove(ticketContainer);
    handleLock(ticketContainer);
    handleColor(ticketContainer);
}

//function for handling remove
function handleRemove(ticket) {
    if (removeFlag) ticket.remove();
}

function handleLock(ticket) {
    let taskArea = ticket.querySelector('.task-area');
    let lockEle = ticket.querySelector(".lock");
    let ticketLock = lockEle.children[0];
    ticketLock.addEventListener('click', (e) => {
        if (ticketLock.classList.contains(lockedIcon)) {
            ticketLock.classList.remove(lockedIcon);
            ticketLock.classList.add(unlockedIcon)
            taskArea.setAttribute("contenteditable", true);
        } else {
            ticketLock.classList.remove(unlockedIcon);
            ticketLock.classList.add(lockedIcon)
            taskArea.setAttribute("contenteditable", false);
        }
    })
}

//function for handling in change in color bar of the ticket 
function handleColor(ticket) {
    let colorBar = ticket.querySelector(".ticket-color");
    let idBar = ticket.querySelector(".ticket-id")

    colorBar.addEventListener('click', (e) => {
        let currentColor = colorBar.classList[1];
        let currentId = idBar.innerText.slice(1);
        console.log(currentId);
        let indexOfColor = colors.findIndex((color) => {
            return color === currentColor;
        })


        indexOfColor = (indexOfColor + 1) % colors.length;
        colorBar.classList.remove(currentColor);
        ticketArr.forEach((ticketObj) => {
            if (ticketObj.ticketId === currentId) {
                ticketObj.ticketColor = colors[indexOfColor];
            }
        })
        colorBar.classList.add(colors[indexOfColor]);

    })


}