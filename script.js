if (window.innerWidth < 768) {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 3rem; font-family: sans-serif; color: white; background: #111;">
            <h1>🚫 Sorry, no bananas on mobile</h1>
            <p>Please use a larger screen to play 🍌</p>
        </div>
    `;
    throw new Error("Blocked on small screen");
}
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("qrModal").classList.add("hidden");

    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("qrModal").classList.add("hidden");
    });

    const showQrButton = document.getElementById("showQrButton");
    showQrButton.addEventListener("click", showQRCodeModal);

    showQrButton.addEventListener("mouseover", () => {
        showQrButton.textContent = "Mária Richard";
    });
    showQrButton.addEventListener("mouseout", () => {
        showQrButton.textContent = "Merge Request";
    });
});
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("step1").classList.remove("hidden");
});

const bananaInput = document.getElementById("bananaInput");
const primeNumbers = document.getElementById("prime");
const year = document.getElementById("year");
const coordinates = document.getElementById("coordinates");
const catchButton = document.getElementById("catchButton");
const instructions = document.getElementById("instructions");

let currentStep = 0;

function handleStep0(value) {
    const expectedBanana = ("B" + "a" + +"a" + "a");
    if (value.includes(expectedBanana)) {
        // primeNumbers.textContent = "Correct!";
        primeNumbers.classList.add("correct");
        catchButton.classList.remove("hidden");
        return true;
    } else {
        primeNumbers.textContent = "";
        primeNumbers.classList.remove("correct");
        catchButton.classList.add("hidden");
        return false;
    }
}

function handleStep1(value) {
    if (!value.includes("57")) {
        primeNumbers.textContent = "";
        primeNumbers.classList.remove("correct");
        return false;
    }
    primeNumbers.textContent = "Prime numbers accepted.";
    primeNumbers.classList.add("correct");
    return true;
}

function handleStep2(value) {
    if (!value.includes("2025")) {
        year.textContent = "Now add 7e9 in decimal.";
        year.classList.remove("correct");
        return false;
    }
    year.textContent = "Hex decoded!";
    year.classList.add("correct");
    return true;
}

function handleStep3(value) {
    if (!value.toLowerCase().includes("pliesovce") && !value.toLowerCase().includes("pliešovce")) {
        coordinates.innerHTML = 'Find place:<br>N: 110000.011011001<br>E: 010011.001001111';
        coordinates.classList.remove("correct");
        return false;
    }
    coordinates.innerHTML = "Place found!<br> Great job!";
    coordinates.classList.add("correct");
    return true;
}

bananaInput.addEventListener("input", () => {
    const value = bananaInput.value.trim();

    if (currentStep === 0) {
        handleStep0(value);
    }
    if (currentStep === 1) {
        const primesOk = handleStep1(value);
        let yearOk = false;
        let gpsOk = false;

        if (primesOk) {
            yearOk = handleStep2(value);
        }
        if (primesOk && yearOk) {
            gpsOk = handleStep3(value);
        }
        if (primesOk && yearOk && gpsOk) {
            document.getElementById("showQrButton").classList.remove("hidden");
        }
    }

});

catchButton.addEventListener("click", () => {
    alert("BananaException: Something slipped through the catch block.\nPlease check the console.");
    bananaInput.value = "";
    catchButton.classList.add("hidden");
    instructions.classList.add("hidden");
    console.log("Write two prime numbers whose sum is 12 (in ascending order).");
    currentStep = 1;
});

function showQRCodeModal() {
    document.getElementById("qrModal").classList.remove("hidden");
}