const words = [
  "Full Stack Developer",
  "Frontend Developer",
  "UI/UX Learner",
  "Backend Developer",
  "Computer Science Student"
];

const typing = document.getElementById("typing");
const typingSound = document.getElementById("typingSound");
const muteBtn = document.getElementById("muteBtn");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let muted = false;
let soundPlayedForWord = false; // ⭐ NEW

/* unlock audio on first click (browser rule) */
document.addEventListener("click", () => {
  if (!typingSound) return;
  typingSound.play().then(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  });
}, { once: true });

/* mute / unmute */
muteBtn.addEventListener("click", () => {
  muted = !muted;
  typingSound.muted = muted;

  muteBtn.innerHTML = muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
});

/* fade out sound smoothly */
function fadeOutSound(audio) {
  let fade = setInterval(() => {
    if (audio.volume > 0.01) {
      audio.volume -= 0.01;
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0.08; // reset for next word
      clearInterval(fade);
    }
  }, 30);
}

/* typing effect */
function typeEffect() {
  const currentSkill = words[wordIndex];

  if (!deleting) {
    typing.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;

    /* ✅ play sound ONCE when full word typed */
    if (
      charIndex === currentSkill.length &&
      !soundPlayedForWord &&
      !muted
    ) {
      soundPlayedForWord = true;

      typingSound.currentTime = 0;
      typingSound.volume = 0.08;
      typingSound.play().catch(() => {});
      fadeOutSound(typingSound);
    }

    if (charIndex === currentSkill.length) {
      setTimeout(() => deleting = true, 1200);
    }

  } else {
    typing.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      soundPlayedForWord = false; // ⭐ reset for next word
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    // 🚫 Ignore empty or #
    if (targetId === "#" || !document.querySelector(targetId)) return;

    e.preventDefault();
    document.querySelector(targetId)
      .scrollIntoView({ behavior: "smooth" });
  });
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
