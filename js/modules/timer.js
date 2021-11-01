function timer(id, deadline) {

     function getTimeLeft(endTime) {
         const t = new Date(endTime) - new Date(),
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor(t / (1000 * 60 * 60) % 24),
             minutes = Math.floor(t / (1000 * 60) % 60),
             seconds = Math.floor(t / 1000 % 60);
 
         return {
             t,
             days,
             hours,
             minutes,
             seconds
         };
 
     }
 
     const timer = setInterval(showTime, 1000);
     showTime();
 
     function addZero(num) {
 
         if (num >= 0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
 
     }
 
     function showTime() {
 
         const timerEl = document.querySelector(id),
             daysEl = timerEl.querySelector('#days'),
             hoursEl = timerEl.querySelector('#hours'),
             minutesEl = timerEl.querySelector('#minutes'),
             secondsEl = timerEl.querySelector('#seconds');
 
         const timeLeft = getTimeLeft(deadline);
 
         if (timeLeft.t >= 0) {
             daysEl.innerHTML = addZero(timeLeft.days);
             hoursEl.innerHTML = addZero(timeLeft.hours);
             minutesEl.innerHTML = addZero(timeLeft.minutes);
             secondsEl.innerHTML = addZero(timeLeft.seconds);
         } else {
             clearInterval(timer);
         }
 
     }
 
}

export default timer;