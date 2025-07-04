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
  // Carruseles (solo si existen)
  if (document.querySelectorAll('.anterior').length) {
    document.querySelectorAll('.anterior').forEach(btn =>
      btn.addEventListener('click', () => cambiarImagen(btn.dataset.id, -1))
    );
    document.querySelectorAll('.siguiente').forEach(btn =>
      btn.addEventListener('click', () => cambiarImagen(btn.dataset.id, 1))
    );
    document.querySelectorAll('.miniatura').forEach(img =>
      img.addEventListener('click', () => {
        document.getElementById(img.dataset.modal).style.display = 'block';
        const id = img.dataset.modal.split('-')[1];
        mostrarCarruselInicial(id);
      })
    );
    document.querySelectorAll('.cerrar').forEach(btn =>
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.modal).style.display = 'none';
      })
    );
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('mousedown', function(e) {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
          if (modal.style.display === 'block') modal.style.display = 'none';
        });
      }
    });
  }

  // Productos y carrito (solo si existen)
  const productosLista = document.getElementById('productos-lista');
  const contadorCarrito = document.getElementById('contador-carrito');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  function renderContadorCarrito() {
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
  }

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
          <button data-id="${producto.id}">Agregar al carrito</button>`;
        card.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
        productosLista.appendChild(card);
      });
    } catch (error) {
      productosLista.innerHTML = '<p>Error al cargar productos.</p>';
    }
  }

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

  if (productosLista) {
    cargarProductos();
    renderContadorCarrito();
  }

  // Formulario de contacto/pedido (solo si existen)
  const form = document.getElementById('form-contacto') || document.getElementById('form-pedido');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let nombre = form.nombre?.value.trim() || '';
      let email = form.email?.value.trim() || '';
      let mensaje = form.mensaje?.value.trim() || '';
      let mensajeDiv = document.getElementById('mensaje-formulario');
      if (mensajeDiv) mensajeDiv.classList.remove('error');
      if (!nombre || !email || (form.mensaje && !mensaje)) {
        if (mensajeDiv) {
          mensajeDiv.textContent = 'Por favor completa todos los campos.';
          mensajeDiv.classList.add('error');
        }
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        if (mensajeDiv) {
          mensajeDiv.textContent = 'Correo electrónico no válido.';
          mensajeDiv.classList.add('error');
        }
        return;
      }
      form.submit();
      if (mensajeDiv) mensajeDiv.textContent = '¡Mensaje enviado!';
      form.reset();
    });
  }

  actualizarNotificacionCarrito();

  // Menú desplegable (solo si existen)
  const dropdownToggle = document.getElementById('dropdownToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const navDropdown = document.getElementById('navDropdown');
  if (dropdownToggle && dropdownMenu && navDropdown) {
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
  }
});

window.addEventListener('storage', actualizarNotificacionCarrito);

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

