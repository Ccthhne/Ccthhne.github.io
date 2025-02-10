const counterFormArea = document.querySelector('.form-area');
const counterForm = document.getElementById('counter-form');
const counterEl = document.getElementById('counter');

const counterTitleEl = document.getElementById('counter-title');
const timeElements = document.querySelectorAll('span');
const counterResetBtn = document.getElementById('counter-reset');

const complete = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

const datePicker = document.getElementById('counter-date');

let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let title = '';
let date = '';

// Set min date for date picker
let today = new Date().toISOString().split('T')[0];
datePicker.setAttribute('min', today);

// Update DOM with countdown values
function updateDom() {
    countdownActive = setInterval(() => {
        let now = new Date().getTime();
        let distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        if (distance < 0) {
            counterEl.hidden = true;
            counterFormArea.hidden = true;
            complete.hidden = false;
            clearInterval(countdownActive);
            completeInfo.textContent = 'Ngày Cưng Mong Chờ Đã Đến!';
        } else {
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            counterTitleEl.textContent = title;
            counterFormArea.hidden = true;
            counterEl.hidden = false;
        }
    }, 1000);
}

// Handle form submission
function updateCountDown(e) {
    e.preventDefault();
    title = e.srcElement[0].value;
    date = e.srcElement[1].value;

    if (title.trim() === "" || date === "") {
        alert("Chọn đê đã!");
        return;
    }

    const savedCountdown = {
        title: title,
        date: date,
    };

    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    countdownValue = new Date(date).getTime();
    updateDom();
}

// Reset countdown
function reset() {
    localStorage.removeItem('countdown');
    counterEl.hidden = true;
    complete.hidden = true;
    clearInterval(countdownActive);
    title = '';
    date = '';
    counterFormArea.hidden = false;
}

// Restore countdown from localStorage
function restoreCountdown() {
    if (localStorage.getItem('countdown')) {
        counterFormArea.hidden = true;
        let countdownData = JSON.parse(localStorage.getItem('countdown'));
        title = countdownData.title;
        date = countdownData.date;
        countdownValue = new Date(date).getTime();
        updateDom();
    }
}

// Event listeners
counterForm.addEventListener('submit', updateCountDown);
counterResetBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// Restore countdown on page load
restoreCountdown();