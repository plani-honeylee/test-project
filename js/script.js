// GSAP 및 ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    /* ---------------------------------------------------
       1. 텍스트 Fade-in (페이지 로드 시)
    --------------------------------------------------- */
    const heroSection = document.querySelector('.hero-section');
    
    // 약간의 딜레이를 주어 화면이 렌더링된 후 자연스럽게 올라오도록 처리
    setTimeout(() => {
        heroSection.classList.add('is-active');
    }, 100);

    /* ---------------------------------------------------
       2. 사진 이벤트 (ScrollTrigger Parallax)
    --------------------------------------------------- */
    // scrub: true 를 통해 사용자의 스크롤 양에 비례해서 부드럽게 움직이게 설정
    const imgTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",      // 섹션의 상단이 뷰포트 상단에 닿을 때 시작
            end: "bottom center",  // 섹션의 하단이 뷰포트 중앙에 올 때 종료
            scrub: 1               // 1초 지연을 주어 더 부드러운 스크롤 효과
        }
    });

    imgTimeline
        .to(".img1", { y: 180 }, 0)   // y + 180
        .to(".img2", { y: 100 }, 0)   // y 100
        .to(".img3", { y: -20 }, 0)   // y -20
        .to(".img4", { y: -60 }, 0);  // y -60

    /* ---------------------------------------------------
       3. NEOPLAS 타이포그래피 (Width 채워짐)
    --------------------------------------------------- */
    // 창 크기가 변할 때 타이포그래피 마스크 내부 이미지의 너비를 동기화
    // (반응형 환경에서 이미지가 찌그러지지 않고 자연스럽게 마스킹되게 하기 위함)
    const typoWrap = document.querySelector('.typo-wrap');
    const typoFront = document.querySelector('.typo-front');

    function resizeTypoFront() {
        if(typoWrap && typoFront) {
            typoFront.style.width = typoWrap.offsetWidth + 'px';
        }
    }
    window.addEventListener('resize', resizeTypoFront);
    resizeTypoFront(); // 초기 1회 실행

    // 스크롤에 따른 width 변경 애니메이션
    gsap.to(".typo-blue-mask", {
        width: "100%", // 폭을 0% 에서 100%로
        ease: "none",
        scrollTrigger: {
            trigger: ".typo-wrap",
            start: "top 80%",  // 타이포그래피가 화면 하단 80% 지점에 올 때 시작
            end: "bottom 50%", // 타이포그래피가 화면 중앙에 올 때 완성 (100%)
            scrub: true
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    
    /* ---------------------------------------------------
       1. 라인 애니메이션 (가운데서 100%로 확장)
    --------------------------------------------------- */
    gsap.to(".line-wrap .line", {
        width: "100%",
        duration: 1.2,
        ease: "power3.out", // 부드럽게 감속하는 이징
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%", // 푸터가 뷰포트 80% 지점에 도달했을 때 실행
            toggleActions: "play none none none" // 한 번만 실행
        }
    });

    /* ---------------------------------------------------
       2. NEOPLAS 타이포그래피 애니메이션
    --------------------------------------------------- */
    // 창 크기 조절 시 마스크 내부 이미지의 너비 동기화 (찌그러짐 방지)
    const footerTypoWrap = document.querySelector('.footer-typo');
    const typoWhite = document.querySelector('.typo-white');

    function resizeFooterTypo() {
        if(footerTypoWrap && typoWhite) {
            typoWhite.style.width = footerTypoWrap.offsetWidth + 'px';
        }
    }
    window.addEventListener('resize', resizeFooterTypo);
    resizeFooterTypo(); // 초기화

    // 타이포그래피 너비가 0%에서 100%로 채워지는 애니메이션
    gsap.to(".typo-fill-mask", {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer-typo",
            start: "top 90%", // 타이포 영역이 화면 하단 90%에 보일 때 실행
            toggleActions: "play none none none"
        }
    });

});


document.addEventListener("DOMContentLoaded", () => {
    
    // 타임라인 생성: .pin-wrap 자체를 트리거로 잡고 고정합니다.
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pin-wrap",  // 고정할 대상을 정확히 지정
            start: "top top",      // 화면 상단에 닿으면 시작
            end: "+=500%",         // 스크롤 길이를 500%로 늘려 충분한 고정 시간 확보
            scrub: 1,              // 스크롤에 맞춰 부드럽게 재생
            pin: true,             // 화면 고정!
            pinSpacing: true       // 고정된 만큼 아래 여백을 만들어 뒷 섹션이 침범하지 않게 함
        }
    });

    /* --- [STEP 1] 중앙 박스 확대 & 기존 텍스트 숨김 --- */
    tl.to(".intro-wrap", { opacity: 0, y: -50, duration: 1 }, 0)
      .to(".expand-box", { 
          width: "100%",   // vw 대신 %를 사용하여 스크롤바 겹침 방지
          height: "100%",  // vh 대신 % 사용
          top: "50%", 
          borderRadius: 0, 
          duration: 1.5, 
          ease: "power2.inOut" 
      }, 0);

    /* --- [STEP 2] Slide 1 텍스트 페이드인 & 대기 --- */
    tl.to(".slide-1 .slide-content", { 
        opacity: 1, 
        y: "-50%", 
        duration: 0.8 
    }, "-=0.3")
    // ★ 이 부분이 핵심: 애니메이션 없이 화면이 멈춰있는(고정된) 구간
    .to({}, { duration: 2 }); 

    /* --- [STEP 3] Slide 2 크로스페이드 & 대기 --- */
    tl.to(".slide-2", { opacity: 1, duration: 1 })
      .fromTo(".slide-2 .slide-content", 
          { y: "-40%", opacity: 0 }, 
          { y: "-50%", opacity: 1, duration: 0.8 }, 
          "<0.3" // 배경 페이드인이 0.3초 진행됐을 때 텍스트가 같이 올라옴
      )
      .to({}, { duration: 2 }); // ★ 고정 구간

    /* --- [STEP 4] Slide 3 크로스페이드 & 대기 --- */
    tl.to(".slide-3", { opacity: 1, duration: 1 })
      .fromTo(".slide-3 .slide-content", 
          { y: "-40%", opacity: 0 }, 
          { y: "-50%", opacity: 1, duration: 0.8 }, 
          "<0.3"
      )
      .to({}, { duration: 2 }); // ★ 마지막 고정 구간

});


document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const floatingNav = document.getElementById("floatingNav");
    
    let lastScrollTop = 0;
    const hideThreshold = 150; // 이 픽셀 이상 스크롤해야 Aside가 나타남

    window.addEventListener("scroll", () => {
        // 현재 스크롤 위치 가져오기
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        /* -------------------------------------------
           1. Header 인터랙션 (스크롤 내릴 때 숨김, 올릴 때 표시)
        ------------------------------------------- */
        if (currentScroll > lastScrollTop && currentScroll > 50) {
            // 아래로 스크롤 중 & 최상단이 아닐 때 -> 헤더 숨김
            header.classList.add("is-hidden");
        } else {
            // 위로 스크롤 중 -> 헤더 표시
            header.classList.remove("is-hidden");
        }

        /* -------------------------------------------
           2. Floating Aside 인터랙션 (일정 이상 스크롤 시 고정 노출)
        ------------------------------------------- */
        if (currentScroll > hideThreshold) {
            // 지정한 높이 이상 내려가면 노출
            floatingNav.classList.add("is-visible");
        } else {
            // 다시 최상단으로 올라가면 숨김
            floatingNav.classList.remove("is-visible");
        }

        // 마지막 스크롤 위치 업데이트 (모바일 바운스 스크롤 대응 위해 0 이하 방지)
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});