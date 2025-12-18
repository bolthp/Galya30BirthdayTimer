function getTimeRemaining(endtime) {
  var endDate = new Date(endtime);
  var now = new Date();

  var t = endDate.getTime() - now.getTime();

  if (t <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);

  if (!clock) {
    console.error("Element with id '" + id + "' not found");
    return;
  }

  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");
  var daysText = clock.querySelector(".days-text");
  var hoursText = clock.querySelector(".hours-text");
  var minutesText = clock.querySelector(".minutes-text");
  var secondsText = clock.querySelector(".seconds-text");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      document.getElementById("countdown").className = "hidden";
      document.getElementById("copyText").className = "hidden";

      let countdownTitle = document.getElementsByClassName("countdown-title");
      for (var i = 0; i < countdownTitle.length; i++) {
        countdownTitle.item(i).className += " h1-hidden";
      }

      let deadlineTitle = document.getElementsByClassName("deadline-message");
      for (var i = 0; i < deadlineTitle.length; i++) {
        deadlineTitle.item(i).className += " h1-visible";
      }

      clearInterval(timeinterval);
      return true;
    }

    function declOfNum(n, text_forms) {
       n = Math.abs(n) % 100;
       var n1 = n % 10;
       if (n > 10 && n < 20) { return text_forms[2]; }
       if (n1 > 1 && n1 < 5) { return text_forms[1]; }
       if (n1 == 1) { return text_forms[0]; }
       return text_forms[2];
    }

    if (daysText) daysText.innerHTML = declOfNum(t.days, ["День", "Дня", "Дней"]);
    if (hoursText) hoursText.innerHTML = declOfNum(t.hours, ["Час", "Часа", "Часов"]);
    if (minutesText) minutesText.innerHTML = declOfNum(t.minutes, ["Минуту", "Минуты", "Минут"]);
    if (secondsText) secondsText.innerHTML = declOfNum(t.seconds, ["Секунду", "Секунды", "Секунд"]);

    if (daysSpan) daysSpan.innerHTML = t.days;
    if (hoursSpan) hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    if (minutesSpan) minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    if (secondsSpan) secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    var btn = document.getElementById("copyText");
    if (btn) {
      btn.onclick = function () {
        let text = t.days + " " + declOfNum(t.days, ["День", "Дня", "Дней"]) + " " +
                   ("0" + t.hours).slice(-2) + " " + declOfNum(t.hours, ["Час", "Часа", "Часов"]) + " " +
                   ("0" + t.minutes).slice(-2) + " " + declOfNum(t.minutes, ["Минуту", "Минуты", "Минут"]) +
                   " и " + ("0" + t.seconds).slice(-2) + " " + declOfNum(t.seconds, ["Секунду", "Секунды", "Секунд"]);
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
      };
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.UTC(2026, 1, 25, 0, 0, 0));

document.addEventListener('DOMContentLoaded', function() {
  initializeClock("countdown", deadline);

  console.log("Текущее локальное время:", new Date().toString());
  console.log("Дедлайн (локальное время):", new Date(deadline).toString());
  console.log("Дедлайн (UTC):", deadline.toUTCString());
  console.log("Часовой пояс пользователя:", Intl.DateTimeFormat().resolvedOptions().timeZone);
});
