function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
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
       n = Math.abs(n) % 100; var n1 = n % 10;
       if (n > 10 && n < 20) { return text_forms[2]; }
       if (n1 > 1 && n1 < 5) { return text_forms[1]; }
       if (n1 == 1) { return text_forms[0]; }
       return text_forms[2];
    }
    daysText.innerHTML = declOfNum(t.days, ["День", "Дня", "Дней"]);
    hoursText.innerHTML = declOfNum(t.hours, ["Час", "Часа", "Часов"]);
    minutesText.innerHTML = declOfNum(t.minutes, ["Минуту", "Минуты", "Минут"]);
    secondsText.innerHTML = declOfNum(t.seconds, ["Секунду", "Секунды", "Секунд"]);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    var btn = document.getElementById("copyText");
    btn.onclick = function () {
      let text = t.days + " " + declOfNum(t.days, ["День", "Дня", "Дней"]) + " " + ("0" + t.hours).slice(-2) + " " + declOfNum(t.hours, ["Час", "Часа", "Часов"]) + " " + ("0" + t.minutes).slice(-2) + " " + declOfNum(t.minutes, ["Минуту", "Минуты", "Минут"]) + " и " + ("0" + t.seconds).slice(-2) + " " + declOfNum(t.seconds, ["Секунду", "Секунды", "Секунд"]);
      navigator.clipboard.writeText(text);
    };
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);

}

var deadline = "February 25 2021 00:00:00 GMT+0600"; //for Ukraine
//var deadline = new Date(Date.parse(new Date()) + 5 * 1000); // for endless timer
initializeClock("countdown", deadline);