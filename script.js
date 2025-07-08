const tagline = document.getElementById("tagline");

// 分段标语数组
const phraseArray = ["小丑猫邀请你，解锁专属魔法捷径。"];

let phraseIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeWriter() {
  const currentPhrase = phraseArray[phraseIndex];

  if (isTyping) {
    if (charIndex < currentPhrase.length) {
      tagline.innerHTML += currentPhrase[charIndex];
      charIndex++;
      setTimeout(typeWriter, 200); // 每个字符速度
    } else {
      isTyping = false;
      setTimeout(typeWriter, 100); // 整句打完后停顿
    }
  } else {
    phraseIndex++;
    if (phraseIndex >= phraseArray.length) {
      // 打完所有，准备清空后重来
      setTimeout(() => {
        tagline.innerHTML = "";
        phraseIndex = 0;
        charIndex = 0;
        isTyping = true;
        typeWriter();
      }, 1600); // 整句结束再停顿一会
    } else {
      charIndex = 0;
      isTyping = true;
      setTimeout(typeWriter, 300); // 下一段之间的小停顿
    }
  }
}

window.onload = () => {
  typeWriter();
  // 你原本还有 Swiper 初始化，记得加回来
};

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

  // 如果所有图片都已经加载
  if (loadedCount === images.length) {
    initSwiper();
  }

  function initSwiper() {
    new Swiper(".swiper-container", {
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