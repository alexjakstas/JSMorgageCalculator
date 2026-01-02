const loanAmount = document.querySelector("#loanAmount");
const interestRate = document.querySelector("#interestRate");
const loanDuration = document.querySelector("#loanDuration");
const form = document.querySelector("#mortgage");

const valueInterests = document.querySelector("#valueInterests");
const input = document.querySelector("#interestRate");

valueInterests.textContent = input.value;

input.addEventListener("input", (event) => {
  valueInterests.textContent = parseFloat(event.target.value).toFixed(1);
});

function calculateMortgage(loanAmountValue, interestRatePercent, years) {
  const ratePercent = interestRatePercent / 100 / 12;
  const monthCount = years * 12;

  if (ratePercent === 0) return (loanAmountValue / monthCount).toFixed(2);

  const mortgage =
    (loanAmountValue * ratePercent * Math.pow(1 + ratePercent, monthCount)) /
    (Math.pow(1 + ratePercent, monthCount) - 1);

  return mortgage.toFixed(2);
}

form.onsubmit = (e) => {
  e.preventDefault();

  if (!loanAmount.value || !interestRate.value || !loanDuration.value) {
    validate();
    return;
  }

  const loanAmountValue = parseFloat(loanAmount.value);
  const interestRateValue = parseFloat(interestRate.value);
  const loanDurationValue = parseFloat(loanDuration.value);

  const monthlyPayment = calculateMortgage(
    loanAmountValue,
    interestRateValue,
    loanDurationValue
  );

  document.querySelector("#monthlyPayment").innerHTML = `${monthlyPayment} €`;
};

function validate() {
  if (document.querySelector(".alert")) return;

  const alert = document.createElement("div");
  alert.className = "alert text";
  alert.style.color = "red";
  alert.innerHTML = "Užpildykite visus laukus!";
  form.prepend(alert);

  setTimeout(() => alert.remove(), 3000);
}
