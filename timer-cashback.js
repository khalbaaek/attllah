function startCountdown(duration, display, storageKey) {
    let endTime = localStorage.getItem(storageKey);

    if (!endTime) {
        // If no end time yet, set new one
        endTime = Date.now() + duration * 1000;
        localStorage.setItem(storageKey, endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }

    let timerInterval = setInterval(function () {
        let now = Date.now();
        let remaining = Math.floor((endTime - now) / 1000);

        if (remaining <= 0) {
            clearInterval(timerInterval);
            display.textContent = "Expired";
            display.closest(".cashback-box").classList.add("expired");
            return;
        }

        let minutes = Math.floor(remaining / 60);
        let seconds = remaining % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    }, 1000);
}

window.onload = function () {
    
    document.querySelectorAll(".timer").forEach(function(timerEl) {
        let startNameSet = timerEl.getAttribute("data-start");
        let duration = timerEl.getAttribute("data-timer-duration");
        let id = timerEl.getAttribute("data-timer-id");
        let storageKey = "cb_" +startNameSet+ "_"+ id;
        let twelveMinutes = 60 * duration; // 12 minutes
        startCountdown(twelveMinutes, timerEl, storageKey);
    });
};