const depositAmount = document.querySelector("#depositAmount");
const interestRateInput = document.querySelector("#interestRate");
const depositDuration = document.querySelector("#depositDuration");
const valueInterestsDisplay = document.querySelector("#valueInterests");
const form = document.querySelector("#mortgage");
const monthlyPaymentDisplay = document.querySelector("#monthlyPayment");

if (interestRateInput && valueInterestsDisplay) {
    valueInterestsDisplay.textContent = `${interestRateInput.value} %`;
}

interestRateInput.addEventListener("input", (event) => {
    valueInterestsDisplay.textContent = `${event.target.value} %`;
});


function calculateSimpleInterestPayment(P, R, T) {
    
    const totalInterest = (P * R * T) / 100;
    const totalAmount = P + totalInterest;
    const totalMonths = T * 12;
    
    if (totalMonths === 0) return 0;
    
    const monthlyPayment = totalAmount / totalMonths;
    return monthlyPayment;
}


form.onsubmit = (e) => {

    e.preventDefault();

    if (!depositAmount.value || !interestRateInput.value || !depositDuration.value) {
        showValidationError();
        return;
    }

    const P = parseFloat(depositAmount.value);
    const R = parseFloat(interestRateInput.value);
    const T = parseFloat(depositDuration.value);

    const result = (calculateSimpleInterestPayment(P, R, T)) + P;

    if (monthlyPaymentDisplay) {
        monthlyPaymentDisplay.innerHTML = `Jūsų depositas: ${P}, <br> palūkanos: ${R} %, <br> po ${T} metų atgausite:  ${result.toFixed(2)} €`;
    }
};

function showValidationError() {
    
    if (document.querySelector(".alert")) return;

    const alert = document.createElement("div");
    alert.className = "alert";
    alert.style.color = "red";
    alert.style.marginBottom = "10px";
    alert.innerHTML = "Užpildykite visus laukus!";
    
    form.prepend(alert);

    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

