"use strict";

import participants from "./mock.js";

document.addEventListener("DOMContentLoaded", () => {
  const participantsContainer = document.querySelector(".participants-section-content");
  const perview = document.querySelector(".perview");
  const total = document.querySelector(".total");

  let participantsPerView = window.innerWidth < 768 ? 1 : 3;
  let currentSlide = 0;

  const renderParticipants = (participants) => {
    participantsContainer.innerHTML = participants
      .map((participant) =>
        `<div class="participant-card flex flex-col align-center">
          <div class="participant-image-wrap flex align-end justify-center">
            <img src="./assets/icons/participant-ava.svg" alt="Participant Avatar Icon">
          </div>
          <h4>${participant.name}</h4>
          <p>${participant.title}</p>
          <button>Подробнее</button>
        </div>`
      ).join("");
  };
  
  total.textContent = participants.length;

  const updateView = () => {
    renderParticipants(participants.slice(currentSlide * participantsPerView, (currentSlide + 1) * participantsPerView));
    perview.textContent = (currentSlide + 1) * participantsPerView;;

    const LeftButton = document.getElementById("left-button");
    const RightButton = document.getElementById("right-button");

    LeftButton.disabled = currentSlide === 0;
    RightButton.disabled = currentSlide >= Math.ceil(participants.length / participantsPerView) - 1;
  };

  const LeftButton = document.getElementById("left-button");
  const RightButton = document.getElementById("right-button");

  LeftButton.addEventListener("click", () => {
    if (currentSlide === 0) return;
    currentSlide--;
    updateView();
  });

  RightButton.addEventListener("click", () => {
    if (currentSlide >= Math.ceil(participants.length / participantsPerView) - 1) return;
    currentSlide++;
    updateView();
  });

  const advanceSlide = () => {
    if (currentSlide >= Math.ceil(participants.length / participantsPerView) - 1) {
      currentSlide = 0; 
    } else {
      currentSlide++; 
    }
    updateView();
  };

  setInterval(advanceSlide, 4000);

  updateView(); 
});
