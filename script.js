/* ============================================================================
   EKO SOLUÇÕES — script.js
   JavaScript puro (Vanilla JS), sem dependências externas.
   Índice:
     1. Configuração (número do WhatsApp)
     2. Montagem dos links de WhatsApp e telefone
     3. Cabeçalho fixo com sombra ao rolar
     4. Menu mobile (abrir/fechar)
     5. Accordion do FAQ
     6. Botão "voltar ao topo"
     7. Animações de entrada (IntersectionObserver)
     8. Ano atual no rodapé
============================================================================ */

/* ----------------------------------------------------------------------
   1. CONFIGURAÇÃO — ÚNICO PONTO PARA TROCAR O NÚMERO DO WHATSAPP
   -----------------------------------------------------------------------
   Para alterar o número de contato da empresa, troque APENAS o valor
   abaixo. Todos os botões do site (header, hero, CTA final, rodapé e
   botão flutuante) usam esta mesma constante — veja o README.md.
   Formato: código do país + DDD + número, apenas dígitos.
------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "5562981833627";

/* Número de telefone usado nos botões "Ligar agora" / rodapé.
   Por padrão usamos o mesmo número do WhatsApp; troque aqui se a empresa
   tiver uma linha fixa diferente para chamadas de voz. */
const PHONE_NUMBER = WHATSAPP_NUMBER;
const PHONE_DISPLAY = "(62) 98183-3627";

(function () {
  "use strict";

  /* --------------------------------------------------------------------
     2. MONTAGEM DOS LINKS DE WHATSAPP E TELEFONE
     -----------------------------------------------------------------
     Todos os elementos com a classe ".js-whatsapp-link" recebem
     automaticamente o href "https://wa.me/<numero>?text=<mensagem>".
     O atributo "data-wa-message" define a mensagem pré-preenchida de
     cada botão (pode ser diferente por CTA, se desejado).
  --------------------------------------------------------------------- */
  function setupWhatsappLinks() {
    var links = document.querySelectorAll(".js-whatsapp-link");
    links.forEach(function (link) {
      var message = link.getAttribute("data-wa-message") || "Olá! Vim pelo site da Eko Soluções.";
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  function setupPhoneLinks() {
    var links = document.querySelectorAll(".js-phone-link");
    links.forEach(function (link) {
      link.setAttribute("href", "tel:+" + PHONE_NUMBER);
      if (!link.textContent.trim()) {
        link.textContent = PHONE_DISPLAY;
      }
    });
  }

  /* --------------------------------------------------------------------
     3. CABEÇALHO FIXO — adiciona sombra/opacidade ao rolar a página
  --------------------------------------------------------------------- */
  function setupHeaderScroll() {
    var header = document.getElementById("header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------
     4. MENU MOBILE
  --------------------------------------------------------------------- */
  function setupMobileMenu() {
    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu de navegação");
    }

    function openMenu() {
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu de navegação");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Fecha o menu ao clicar em qualquer link (âncora) dentro dele */
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    /* Fecha o menu ao pressionar a tecla Esc (acessibilidade / teclado) */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* --------------------------------------------------------------------
     5. ACCORDION DO FAQ
     -----------------------------------------------------------------
     Cada pergunta é um <button aria-expanded="...">. Ao clicar, alterna
     o estado aberto/fechado e atualiza o atributo ARIA correspondente,
     garantindo compatibilidade com leitores de tela.
  --------------------------------------------------------------------- */
  function setupAccordion() {
    var triggers = document.querySelectorAll(".accordion__trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
      });
    });
  }

  /* --------------------------------------------------------------------
     6. BOTÃO "VOLTAR AO TOPO"
  --------------------------------------------------------------------- */
  function setupBackToTop() {
    var button = document.getElementById("backToTop");
    if (!button) return;

    function toggleVisibility() {
      if (window.scrollY > 480) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------------------
     7. ANIMAÇÕES DE ENTRADA — IntersectionObserver
     -----------------------------------------------------------------
     Elementos com a classe ".reveal" começam invisíveis (ver style.css)
     e recebem ".is-visible" assim que entram na área visível da tela,
     produzindo uma animação suave de fade + translação para cima.
  --------------------------------------------------------------------- */
  function setupRevealAnimations() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    /* Sem suporte a IntersectionObserver: mostra tudo direto (fallback) */
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // anima apenas uma vez
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------------------
     8. ANO ATUAL NO RODAPÉ
  --------------------------------------------------------------------- */
  function setupCurrentYear() {
    var yearEl = document.getElementById("anoAtual");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* --------------------------------------------------------------------
     INICIALIZAÇÃO
  --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setupWhatsappLinks();
    setupPhoneLinks();
    setupHeaderScroll();
    setupMobileMenu();
    setupAccordion();
    setupBackToTop();
    setupRevealAnimations();
    setupCurrentYear();
  });
})();
