const sections = document.querySelectorAll(".tab");
const stepBtns = document.getElementsByClassName("step-number");
const prevBtn = document.getElementById("go-back-btn");
const nextBtn = document.getElementById("next-step-btn");
const confirmBtn = document.getElementById("confirm");
const personalInfo = document.getElementsByName("personal");
const planChoice = document.getElementsByName("plan-btn");
const addonsAdded = document.getElementsByName("addon-btn");

//all choices have 0-2 for array


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
const validPhoneNumber = /^(1[0-9]{10})$/;


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
    const nameInput = personalInfo[0];
    const emailInput = personalInfo[1];
    const phoneInput = personalInfo[2];
    let valid = false;

    if (i === 0) { // validate personal info section
        if (nameInput.value) {
            valid = true;
            nameInput.style.border = "1px solid lightgray";
        } else {
            nameInput.style.border = "2px solid red";
        }
        if (validEmail.test(emailInput.value)) {
            valid = true;
            emailInput.style.border = "1px solid lightgray";
        } else {
            emailInput.style.border = "2px solid red";
        }
        if (validPhoneNumber.test(phoneInput.value)) {
            valid = true;
            phoneInput.style.border = "1px solid lightgray";
        } else {
            phoneInput.style.border = "2px solid red";
        }
    }


    if (i === 1) { // validate that plan has been chosen
        Array.from(planChoice).forEach(choice => {
            if (choice.checked) {
                valid = true;
            }
        })
    }

    if (i > 1) // default for other tabs
        valid = true;

    return valid;
}

















Array.from(stepBtns).forEach((btn, index) => { // adds functionality to step buttons
    btn.addEventListener("click", () => {
        if (!validateSection() || i === 4 || i < index) // checks if current tab data is valid, form is not on last tab, & step button is before the current step
            return;
        hideTab();
        i = index;
        showTab();
    })
})

nextBtn.addEventListener("click", () => {
    if (!validateSection()) {
        console.log(validateSection());
        return;
    }
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

