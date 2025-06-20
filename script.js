const sections = document.querySelectorAll(".tab");
const stepBtns = document.getElementsByClassName("step-number");
const prevBtn = document.getElementById("go-back-btn");
const nextBtn = document.getElementById("next-step-btn");
const confirmBtn = document.getElementById("confirm");
const personalInfo = document.getElementsByName("personal");
const planChoice = document.getElementsByName("plan-btn");
const addonsAdded = document.getElementsByName("addon-btn");


const userData = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
    planOption: "",
    planPrice: 0,
    addons: [],
    addonPrices: [],
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

const highlightStep = () => { // highlights current step button
    Array.from(stepBtns).forEach((btn, index) => {
        if (index == i)
            btn.classList.add('highlight-step');
        else
            btn.classList.remove('highlight-step');
    })
}

const showTab = () => { // toggles page & buttons on
    sections[i].classList.toggle('hidden');
    showButtons();
    highlightStep();
}

const hideTab = () => { // toggles page off
    sections[i].classList.toggle('hidden');
}




const validateSection = () => { // validates each section
    const nameInput = personalInfo[0];
    const emailInput = personalInfo[1];
    const phoneInput = personalInfo[2];
    let valid = false;

    if (i === 0) { // validate personal info section & retrieve valid data
        if (nameInput.value) {
            valid = true;
            nameInput.style.border = "1px solid lightgray";
            userData.name = nameInput.value;
        } else {
            nameInput.style.border = "2px solid red";
        }
        if (validEmail.test(emailInput.value)) {
            valid = true;
            emailInput.style.border = "1px solid lightgray";
            userData.emailAddress = emailInput.value;
        } else {
            emailInput.style.border = "2px solid red";
        }
        if (validPhoneNumber.test(phoneInput.value)) {
            valid = true;
            phoneInput.style.border = "1px solid lightgray";
            userData.phoneNumber = phoneInput.value;
        } else {
            phoneInput.style.border = "2px solid red";
        }
    }


    if (i === 1) { // validate that plan has been chosen & retrieve valid data
        Array.from(planChoice).forEach((choice, index) => {
            if (choice.checked) {
                valid = true;
                userData.planOption = choice.labels[0].firstElementChild.textContent;
                switch(index) {
                    case 0:
                        userData.planPrice = 9;
                    case 1:
                        userData.planPrice = 12;
                    case 2:
                        userData.planPrice = 15;
                }
            }
        })
    }
    if (i > 1)
        valid = true;

    return valid;
}

const finishingUpPage = () => { // Gets total for selections and creates summary page HTML
    let sum = 0;
    for (let l = 0; l < userData.addons.length; l++) {
        sum += Number(userData.addonPrices[l]);
    }
    userData.addonsTotal = sum;
    userData.totalCost = userData.addonsTotal + userData.planPrice;

    let addonSummary = '';
    if (userData.addons.length > 0) {
        addonSummary = `
            <div class="divider"></div>
            <div id="chosen-addons">
        `
        userData.addons.forEach((addon, index) => {
            addonSummary += `<p>${addon}<span>+$${userData.addonPrices[index]}/mo</span></p>`
        })
        addonSummary += `</div>`;
    }




    sections[3].innerHTML = `
        <h1 class="tab-header">Finishing up</h1>
        <span class="tab-description">Double-check everything looks OK before confirming.</span>
        <div class="totalling-container">
            <p class="plan-choice">${userData.planOption} (Monthly)<span>$${userData.planPrice}/mo</span></p>
            <a href="#" id="change" onclick="hideTab(); i = 1; showTab();">Change</a>
            ${addonSummary}
        </div>
        <p id="total">Total (per month)</p>
        <p id="total-price">+$${userData.totalCost}/mo</p>
    `
}



Array.from(addonsAdded).forEach(addon => { // highlights and retrieves addon selections
    addon.addEventListener("click", () => {
        addon.labels[0].classList.toggle("highlight-chosen");
        const currentAddon = addon.labels[0].children[1].textContent;
        const currentAddonPrice = addon.labels[0].children[2].textContent[2];
        if (addon.checked) {
            userData.addons.push(currentAddon);
            userData.addonPrices.push(currentAddonPrice)
        } else {
            const addonToRemove = userData.addons.indexOf(currentAddon)
            const addonPriceToRemove = userData.addonPrices.indexOf(currentAddonPrice)
            userData.addons.splice(addonToRemove, 1);
            userData.addonPrices.splice(addonPriceToRemove, 1);
        }
    })
})

Array.from(planChoice).forEach(choice => {  // highlights plan choice
    choice.addEventListener("click", () => {
        planChoice[0].labels[0].classList.remove("highlight-chosen");
        planChoice[1].labels[0].classList.remove("highlight-chosen");
        planChoice[2].labels[0].classList.remove("highlight-chosen");
        if (choice.checked)
            choice.labels[0].classList.add("highlight-chosen");
    })

})



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
    if (i === 2) {
        finishingUpPage();
    }
    hideTab();
    i++;
    showTab();
    console.log(userData);
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

