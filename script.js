document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("email-form");
  const emailInput = document.getElementById("email-input");

  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailInput.value.trim();

    if (emailRegex.test(email)) {
      // Simula envio de email para lista de espera
      showNotification(`Obrigado! Enviaremos novidades para ${email}`);
      emailInput.value = ""; // Limpa o campo
    } else {
      showNotification("Por favor, insira um email válido", "error");
    }
  });

  function showNotification(message, type = "success") {
    // Remove notificações anteriores
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Cria elemento de notificação
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    // Adiciona ao corpo do documento
    document.body.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // Suaviza rolagem para seções
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Estilos para notificações
  const notificationStyles = `
    <style>
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.5s ease;
    }

    .notification.success {
        background-color: #84806c;
        color: white;
    }

    .notification.error {
        background-color: #1a1a1a;
        color: #ffc800;
    }

    .notification.fade-out {
        opacity: 0;
    }
    </style>`;

  // Adiciona estilos de notificação ao documento
  document.head.insertAdjacentHTML("beforeend", notificationStyles);
});
