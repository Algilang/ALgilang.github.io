// =============================================
// Jalankan setelah halaman selesai dimuat
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  // -------------------------------------------
  // FITUR 1: ANIMASI FADE-UP SAAT SCROLL
  // -------------------------------------------
  const fadeElements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // -------------------------------------------
  // FITUR 2: NAVBAR AKTIF OTOMATIS
  // -------------------------------------------
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav ul a");

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // -------------------------------------------
  // FITUR 3: TYPING EFFECT
  // -------------------------------------------
  const typingEl = document.querySelector(".typing-text");

  if (typingEl) {
    const words = [
      "Web Developer",
      "UI Enthusiast",
      "Problem Solver",
      "Laravel Developer",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const speed = isDeleting ? 60 : 100;
      setTimeout(type, speed);
    }

    type(); // mulai!
  }

  // -------------------------------------------
  // FITUR 4: SMOOTH SCROLL
  // -------------------------------------------
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  // -------------------------------------------
  // FITUR 5: SKILL BAR ANIMATION
  // Bar melebar saat section skills terlihat
  // -------------------------------------------
  const skillBars = document.querySelectorAll(".bar-fill");

  const barObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.style.width; // ambil nilai dari HTML
          bar.style.width = "0"; // reset ke 0 dulu
          setTimeout(function () {
            bar.style.width = targetWidth; // baru isi ke target
          }, 200);
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillBars.forEach(function (bar) {
    barObserver.observe(bar);
  });

  // -------------------------------------------
  // FITUR 6: PROJECT FILTER
  // Klik tombol filter → tampilkan project sesuai kategori
  // -------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-full");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Hapus active dari semua tombol, pasang ke yang diklik
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // Tampilkan/sembunyikan card sesuai filter
      projectCards.forEach(function (card) {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // -------------------------------------------
  // FITUR 7: CONTACT FORM HANDLER
  // Validasi & simulasi kirim pesan
  // -------------------------------------------
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // batalkan reload halaman

      const btnText = document.querySelector(".btn-text");
      const btnLoading = document.querySelector(".btn-loading");
      const btnSubmit = document.querySelector(".btn-submit");
      const formStatus = document.getElementById("formStatus");

      // Ambil nilai input
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validasi sederhana
      if (!name || !email || !message) {
        formStatus.className = "form-status error";
        formStatus.textContent = "⚠ Mohon isi semua field yang wajib diisi.";
        return;
      }

      // Simulasi loading
      btnText.style.display = "none";
      btnLoading.style.display = "inline";
      btnSubmit.disabled = true;
      formStatus.className = "form-status";
      formStatus.textContent = "";

      // Simulasi pengiriman (2 detik)
      // Nanti bisa diganti dengan fetch() ke backend/EmailJS
      setTimeout(function () {
        btnText.style.display = "inline";
        btnLoading.style.display = "none";
        btnSubmit.disabled = false;

        formStatus.className = "form-status success";
        formStatus.textContent =
          "✓ Pesan berhasil dikirim! Saya akan segera membalas.";

        contactForm.reset(); // kosongkan form
      }, 2000);
    });
  }
  // -------------------------------------------
  // FITUR 8: SCROLL PROGRESS BAR
  // Garis teal di atas halaman bergerak saat scroll
  // -------------------------------------------
  const progressBar = document.getElementById("scrollProgress");

  if (progressBar) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPct = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPct + "%";
    });
  }

  // -------------------------------------------
  // FITUR 9: NAVBAR SHADOW SAAT SCROLL
  // Navbar makin gelap + shadow saat user scroll
  // -------------------------------------------
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // -------------------------------------------
  // FITUR 10: BACK TO TOP BUTTON
  // Tombol muncul setelah scroll 400px
  // -------------------------------------------
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    // Tampilkan tombol saat scroll cukup jauh
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    // Scroll ke atas saat diklik
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}); // ← tutup DOMContentLoaded
