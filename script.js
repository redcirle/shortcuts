
const tagline = document.getElementById("tagline");
const phraseArray = ["构建iPhone快捷指令，召唤你的限定魔法。"];
let phraseIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeWriter() {
  const currentPhrase = phraseArray[phraseIndex];
  if (isTyping) {
    if (charIndex < currentPhrase.length) {
      tagline.innerHTML += currentPhrase[charIndex];
      charIndex++;
      setTimeout(typeWriter, 200);
    } else {
      isTyping = false;
      setTimeout(typeWriter, 100);
    }
  } else {
    phraseIndex++;
    if (phraseIndex >= phraseArray.length) {
      setTimeout(() => {
        tagline.innerHTML = "";
        phraseIndex = 0;
        charIndex = 0;
        isTyping = true;
        typeWriter();
      }, 1600);
    } else {
      charIndex = 0;
      isTyping = true;
      setTimeout(typeWriter, 300);
    }
  }
}

window.onload = () => {
  typeWriter();

  const images = document.querySelectorAll(".swiper-slide img");
  let loadedCount = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          initSwiper();
        }
      };
    }
  });

  if (loadedCount === images.length) {
    initSwiper();
  }

  function initSwiper() {
    new Swiper(".swiper-container", {
      on: {
        slideChangeTransitionStart: function () {
          // 先移除所有按钮上的 auto-hover
          document.querySelectorAll('.card-button').forEach(btn => {
            btn.classList.remove('auto-hover');
          });

          // 添加 auto-hover（延迟 300ms），再 300ms 后移除
          setTimeout(() => {
            const activeSlide = document.querySelector('.swiper-slide-active');
            const activeBtn = activeSlide?.querySelector('.card-button');
            if (activeBtn) {
              activeBtn.classList.add('auto-hover');

              // 300ms 后自动移除
              setTimeout(() => {
                activeBtn.classList.remove('auto-hover');
              }, 1500); // 持续高亮的时间（可调）
            }
          }, 600); // 卡片转完多久后开始高亮（可调）
        }
      },
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
};

function confirmAndGoXHS() {
  const confirmed = confirm("是否前往小红书主页？");
  if (confirmed) {
    window.open("https://www.xiaohongshu.com", "_blank");
  }
}
function toggleQR() {
  const popup = document.getElementById("qr-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
function toggleWeChatPublicQR() {
  const popup = document.getElementById("wechat-public-qr-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
function confirmAndMail() {
  const confirmed = confirm("是否跳转到邮件应用？");
  if (confirmed) {
    window.location.href = "mailto:hello@joker.red";
  }
}
function toggleSecondQR() {
  const popup = document.getElementById("second-qr-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
function isWeChatBrowser() {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes("micromessenger");
}
function confirmAndGoJoker() {
  const confirmed = confirm("是否跳转到小丑猫主页？");
  if (confirmed) {
    window.open("https://joker.red", "_blank");
  }
}
