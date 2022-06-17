const passwordWindow1 = document.getElementById("pass1");
const passwordWindow2 = document.getElementById("pass2");
const passwordWindow3 = document.getElementById("pass3");
const passwordWindow4 = document.getElementById("pass4");
const button = document.getElementById("btn--generate");
const buttonLength5 = document.getElementById("btn--length--5");
const buttonLength7 = document.getElementById("btn--length--7");
const buttonLength9 = document.getElementById("btn--length--9");
const buttonLengthMany = document.getElementById("btn--length--many");
let isCopied = false;

const passwordWindows = [passwordWindow1, passwordWindow2, passwordWindow3, passwordWindow4];
const lengthButtons = [buttonLength5, buttonLength7, buttonLength9, buttonLengthMany];

function createPassword() {
    const passPart1 = Math.random().toString(36).slice(2);
    const passPart2 = Math.random().toString(36).toUpperCase().slice(2);
    const passPart3 = "~`!@#$%^&*_-+={[}]|\:;'<,>.?/";
    let passArr = [...passPart1, ...passPart2];
    let passArr2 = [...passPart2, ...passPart3];

    if (passArr.length > passArr2.length) {
        passArr.length = passArr2.length;
    } else {
        passArr2.length = passArr.length;
    }
    for (let i = (Math.floor(Math.random() * 10)); i < passArr.length; i += 3) {
        passArr.splice(i, 1, passArr2[i]);
    }
    return passArr = passArr.join("");
}

button.addEventListener("click", () => {
    for (let i = 0; i < lengthButtons.length; i++) {
        if (lengthButtons[i].checked && lengthButtons[i].value === "5") {
            generatePasswords(5);
        } else if (lengthButtons[i].checked && lengthButtons[i].value === "7") {
            generatePasswords(7);
        } else if (lengthButtons[i].checked && lengthButtons[i].value === "9") {
            generatePasswords(9);
        } else if (lengthButtons[i].checked) {
            generatePasswords();
        }
    }
    for (let pass of passwordWindows) {
        pass.classList.remove("password--copied");
    }
    isCopied = false;
})

generatePasswords = (howManyCharacters) => {
    for (let pass of passwordWindows) {
        pass.value = createPassword().substring(0, howManyCharacters);
    }
}

for (let pass of passwordWindows) {
    pass.addEventListener("click", copyOnClick);
}

function copyOnClick() {
    if (this.value !== "" && isCopied === false) {
        navigator.clipboard.writeText(this.value);
        this.value = "copied to clipboard";
        this.classList.add("password--copied");
        isCopied = true;
    }
}

