const imagenesPorCarrusel = {
  0: [
    'imagenes/dr strange/ds1.jpg',
    'imagenes/dr strange/ds2.jpg',
    'imagenes/dr strange/ds3.jpg',
    'imagenes/dr strange/ds4.jpg'
  ],
  1: [
    'imagenes/dc/hq1.jpg',
    'imagenes/dc/hq2.jpg',
    'imagenes/dc/hq3.jpg'
  ],
  2: [
    'imagenes/dc/ww4.jpg',
    'imagenes/dc/ww5.jpg',
    'imagenes/dc/ww6.jpg'
  ],
  3: [
    'imagenes/dc/ww1.jpg',
    'imagenes/dc/ww2.jpg',
    'imagenes/dc/ww3.jpg'
  ],
  4: [
    'imagenes/d&w/dw1.jpg',
    'imagenes/d&w/dw2.jpg',
    'imagenes/d&w/dw3.jpg'
  ],
  5: [
    'imagenes/Harry potter/dobby.jpg',
    'imagenes/Harry potter/hp.jpg',
    'imagenes/Harry potter/lv.jpg',
    'imagenes/Harry potter/mw1.jpg',
    'imagenes/Harry potter/mw2.jpg',
    'imagenes/Harry potter/mw3.jpg',
    
  ],
  6: [
    'imagenes/Toy story/b1.jpg',
    'imagenes/Toy story/b2.jpg',
    'imagenes/Toy story/b3.jpg',
    'imagenes/Toy story/b4.jpg',
    'imagenes/Toy story/b5.jpg',
    'imagenes/Toy story/w1.jpg',
    'imagenes/Toy story/w2.jpg',
    'imagenes/Toy story/w3.jpg',
  ]
};

const indices = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

document.addEventListener('DOMContentLoaded', () => {
  // Carruseles
  document.querySelectorAll('.anterior').forEach(btn =>
    btn.addEventListener('click', () => cambiarImagen(btn.dataset.id, -1))
  );
  document.querySelectorAll('.siguiente').forEach(btn =>
    btn.addEventListener('click', () => cambiarImagen(btn.dataset.id, 1))
  );

  // Abrir modal al clickear miniatura
  document.querySelectorAll('.miniatura').forEach(img =>
    img.addEventListener('click', () => {
      document.getElementById(img.dataset.modal).style.display = 'block';
      // Mostrar imágenes previa, principal y siguiente correctas
      const id = img.dataset.modal.split('-')[1];
      mostrarCarruselInicial(id);
    })
  );

  // Cerrar modal
  document.querySelectorAll('.cerrar').forEach(btn =>
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.modal).style.display = 'none';
    })
  );

  // Cerrar modal al hacer click fuera del contenido
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('mousedown', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
        }
      });
    }
  });

  // --- PRODUCTOS ---
  const productosLista = document.getElementById('productos-lista');
  const contadorCarrito = document.getElementById('contador-carrito');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Renderiza el contador de carrito
  function renderContadorCarrito() {
    contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  // Renderiza productos desde la API dummyjson
  async function cargarProductos() {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=12');
      const data = await res.json();
      productosLista.innerHTML = '';
      data.products.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
          <img src="${producto.thumbnail}" alt="${producto.title}">
          <h3>${producto.title}</h3>
          <p>$${producto.price}</p>
          <button data-id="${producto.id}">Agregar al carrito</button>
        `;
        card.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
        productosLista.appendChild(card);
      });
    } catch (error) {
      productosLista.innerHTML = '<p>Error al cargar productos.</p>';
    }
  }

  // Agrega producto al carrito
  function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ id: producto.id, title: producto.title, price: producto.price, thumbnail: producto.thumbnail, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderContadorCarrito();
    actualizarNotificacionCarrito();
  }

  cargarProductos();
  renderContadorCarrito();

  // --- FORMULARIO DE CONTACTO ---
  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      const mensajeDiv = document.getElementById('mensaje-formulario');
      mensajeDiv.classList.remove('error');
      // Validación básica
      if (!nombre || !email || !mensaje) {
        mensajeDiv.textContent = 'Por favor completa todos los campos.';
        mensajeDiv.classList.add('error');
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        mensajeDiv.textContent = 'Correo electrónico no válido.';
        mensajeDiv.classList.add('error');
        return;
      }
      // Si pasa validación, enviar el formulario
      form.submit();
      mensajeDiv.textContent = '¡Mensaje enviado!';
      form.reset();
    });
  }
});

function cambiarImagen(id, dir) {
  const lista = imagenesPorCarrusel[id];
  indices[id] = (indices[id] + dir + lista.length) % lista.length;
  // Imagen principal
  document.getElementById(`imagen-${id}`).src = lista[indices[id]];
  // Imagen previa
  const previaIdx = (indices[id] - 1 + lista.length) % lista.length;
  document.getElementById(`previa-${id}`).src = lista[previaIdx];
  // Imagen siguiente
  const siguienteIdx = (indices[id] + 1) % lista.length;
  document.getElementById(`siguiente-${id}`).src = lista[siguienteIdx];
}

// Al abrir el modal, mostrar la imagen previa y siguiente correctas
function mostrarCarruselInicial(id) {
  const lista = imagenesPorCarrusel[id];
  // Imagen principal
  document.getElementById(`imagen-${id}`).src = lista[indices[id]];
  // Imagen previa
  const previaIdx = (indices[id] - 1 + lista.length) % lista.length;
  document.getElementById(`previa-${id}`).src = lista[previaIdx];
  // Imagen siguiente
  const siguienteIdx = (indices[id] + 1) % lista.length;
  document.getElementById(`siguiente-${id}`).src = lista[siguienteIdx];
}

// --- CONTADOR DE CARRITO EN HEADER ---
function actualizarNotificacionCarrito() {
  const noti = document.getElementById('carrito-notificacion');
  if (noti) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    noti.textContent = total;
    noti.style.display = total > 0 ? 'inline-block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarNotificacionCarrito();

  // Menú desplegable por click
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const navDropdown = document.getElementById('navDropdown');

  dropdownToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const expanded = dropdownMenu.classList.toggle('show');
    dropdownToggle.setAttribute('aria-expanded', expanded);
  });

  dropdownMenu.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', function(e) {
    if (!navDropdown.contains(e.target)) {
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', false);
    }
  });
});

window.addEventListener('storage', actualizarNotificacionCarrito);

