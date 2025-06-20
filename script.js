const sections = document.querySelectorAll(".tab");
const stepBtns = document.getElementsByClassName("step-number");
const prevBtn = document.getElementById("go-back-btn");
const nextBtn = document.getElementById("next-step-btn");
const confirmBtn = document.getElementById("confirm");

const userData = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
    planOption: "",
    planPrice: 0,
    addons: [],
    addonsTotal: 0,
    totalCost: 0
}

const validEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,})$/;
const validPhoneNumber = /^(1[0-9]{9})$/;


let i = 0;

const showButtons = () => { // shows buttons depending on the tab
    switch(i) {
        case 0:
            prevBtn.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            confirmBtn.classList.add('hidden');
            break;
        case 1:
        case 2:
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
            confirmBtn.classList.add('hidden');
            break;
        case 3:
            prevBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
            confirmBtn.classList.remove('hidden');
            break;
        case 4:
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
            confirmBtn.classList.add('hidden');
            break;
    }
}

const highlightStep = () => {
    Array.from(stepBtns).forEach((btn, index) => {
        if (index == i)
            btn.classList.add('highlight-step');
        else
            btn.classList.remove('highlight-step');
    })
}

const validateTabData = () => {

}

const showTab = () => { // toggles page & buttons on
    sections[i].classList.toggle('hidden');
    showButtons();
    highlightStep();
}

const hideTab = () => { // toggles page off
    sections[i].classList.toggle('hidden');
}




const validateSection = () => {
    // working on validing sections based on index number, then showing an invalid response if false
    let valid = true;


    return valid;
}

















Array.from(stepBtns).forEach((btn, index) => { // adds functionality to step buttons
    btn.addEventListener("click", () => {
        if (i === 4)
            return;

        hideTab();
        i = index;
        showTab();
    })
})

nextBtn.addEventListener("click", () => {
    hideTab();
    i++;
    showTab();
})

prevBtn.addEventListener("click", () => {
    hideTab();
    i--;
    showTab();
})

confirmBtn.addEventListener("click", () => {
    hideTab();
    i++;
    showTab();
    console.log(i)
})

