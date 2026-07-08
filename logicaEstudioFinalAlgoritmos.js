// =============================================================
// DATOS DE CONTENIDO — Teoría, flashcards, quiz y ejercicios
// =============================================================

const datosTeoria = [
  {
    tema: "Punteros y memoria dinámica",
    resumen: [
      "Un puntero guarda una <span class='textoCodigoInline'>dirección de memoria</span>. <span class='textoCodigoInline'>int *p;</span> lo declara sin inicializar.",
      "<span class='textoCodigoInline'>p = new int[5];</span> reserva un array dinámico de 5 enteros en el heap.",
      "<span class='textoCodigoInline'>*p</span> desreferencia (valor apuntado). <span class='textoCodigoInline'>p[i]</span> equivale a <span class='textoCodigoInline'>*(p+i)</span>.",
      "<span class='textoCodigoInline'>delete p;</span> libera un elemento. <span class='textoCodigoInline'>delete [] p;</span> libera un array. Siempre liberar lo reservado con new.",
      "Un array pasado por parámetro <strong>no se copia</strong>: se comparte la dirección, así que los cambios impactan afuera de la función."
    ],
    codigo: `void proc(int v[], int len) {
    v[0] = 10;   // modifica el array original
}`
  },
  {
    tema: "Arrays / Vectores y matrices",
    resumen: [
      "Vector de registros: se arma un <span class='textoCodigoInline'>struct</span> con los campos del enunciado y un vector de tamaño fijo conocido.",
      "Búsqueda en vector no ordenado: recorrido lineal comparando la clave hasta encontrar o llegar al final.",
      "Patrón 'recorrer A y actualizar B': (1) recorré A de punta a punta, (2) buscá/ubicá el registro en B, (3) actualizá el campo con la operación pedida (sumar, reemplazar, contar).",
      "Matrices: <span class='textoCodigoInline'>int m[FILAS][COLUMNAS]</span>. Por parámetro, la primera dimensión se puede omitir, la segunda no."
    ],
    codigo: `int buscar(Cuenta v[], int cant, int numBuscado) {
    int i = 0;
    while (i < cant && v[i].numeroCuenta != numBuscado)
        i++;
    return (i < cant) ? i : -1;
}`
  },
  {
    tema: "Listas enlazadas",
    resumen: [
      "Nodo típico: <span class='textoCodigoInline'>struct Nodo { TipoDato dato; Nodo *siguiente; };</span>",
      "Operaciones base a saber programar de memoria: insertar al principio, insertar ordenado, buscar, eliminar (con puntero auxiliar 'anterior').",
      "Vector de listas: patrón muy usado cuando hay categorías — cada posición del vector es la cabecera de una lista distinta.",
      "Si la cátedra te da <span class='textoCodigoInline'>insertarOrdenado</span>, <span class='textoCodigoInline'>buscarEnLista</span>, etc. hechas: usalas tal cual el prototipo, no las reinventes."
    ],
    codigo: `void insertarOrdenado(Lista &l, TipoDato valor) {
    Nodo *nuevo = new Nodo;
    nuevo->dato = valor;
    if (l == NULL || valor <= l->dato) {
        nuevo->siguiente = l;
        l = nuevo;
    } else {
        Nodo *actual = l;
        while (actual->siguiente != NULL &&
               actual->siguiente->dato < valor)
            actual = actual->siguiente;
        nuevo->siguiente = actual->siguiente;
        actual->siguiente = nuevo;
    }
}`
  },
  {
    tema: "Pilas (Stack) y Colas (Queue)",
    resumen: [
      "Pila = LIFO (último entra, primero sale). Operaciones: <span class='textoCodigoInline'>push</span> (apilar) y <span class='textoCodigoInline'>pop</span> (desapilar).",
      "Cola = FIFO (primero entra, primero sale). Operaciones: <span class='textoCodigoInline'>queue</span> (encolar atrás) y <span class='textoCodigoInline'>unQueue</span> (desencolar adelante).",
      "Intersección pila + lista: desapilar todo con pop, buscar cada valor en la lista, e insertar ordenado en el resultado si está presente (evitando duplicados)."
    ],
    codigo: `Lista interseccion(Pila &p, Lista l) {
    Lista resultado = NULL;
    while (!pilaVacia(p)) {
        TipoDato valor = pop(p);
        if (buscarEnLista(l, valor) != NULL &&
            buscarEnLista(resultado, valor) == NULL)
            insertarOrdenado(resultado, valor);
    }
    return resultado;
}`
  },
  {
    tema: "Archivos",
    resumen: [
      "Archivo secuencial: se recorre de punta a punta, no se puede saltar a un registro puntual. Para modificar manteniendo el orden, suele reescribirse completo (archivo temporal).",
      "Archivo de acceso directo: registros de tamaño fijo, se calcula el offset (posición × tamaño del registro) para ir directo a un registro.",
      "Lo que la cátedra evalúa: definir bien el struct del registro, respetar la precondición de orden (clave compuesta, ej. categoría + fecha), y pensar el algoritmo de inserción manteniendo ese orden.",
      "Patrón de reglas de negocio (tipo dictamen CONAIISI): sumar puntajes por bloque, aplicar reglas con if/else if de mayor a menor exigencia, y actualizar el registro correspondiente."
    ],
    codigo: `struct RegistroTrabajo {
    char titulo[50];
    int categoria;
    char correoResponsable[50];
    int idEvaluadores[3];
    int resultados[3];
    char dictamen[40];
};`
  },
  {
    tema: "Recursividad",
    resumen: [
      "Toda función recursiva necesita un <strong>caso base</strong> (corta la recursión) y un <strong>caso recursivo</strong> (se acerca al caso base).",
      "Muy usada con listas enlazadas como alternativa a los while (recorrer, contar, buscar, insertar)."
    ],
    codigo: `int contarNodos(Nodo *l) {
    if (l == NULL) return 0;
    return 1 + contarNodos(l->siguiente);
}`
  }
];

const datosFlashcards = [
  { frente: "¿Qué diferencia hay entre pasar un array por parámetro y pasar un int por valor?", dorso: "El array NO se copia: viaja la dirección del primer elemento, así que los cambios dentro de la función impactan afuera. Un int por valor sí se copia." },
  { frente: "¿Qué hace delete [] p; ?", dorso: "Libera la memoria de un array reservado con new[]. Si reservaste con new[] y liberás solo con delete (sin corchetes), es un error." },
  { frente: "Pila (Stack): ¿qué orden de salida tiene?", dorso: "LIFO — Last In, First Out. El último elemento apilado (push) es el primero en salir (pop)." },
  { frente: "Cola (Queue): ¿qué orden de salida tiene?", dorso: "FIFO — First In, First Out. El primero en encolarse (queue) es el primero en desencolarse (unQueue)." },
  { frente: "¿Cómo se declara correctamente un vector por parámetro en C++?", dorso: "int vec[] o int *vec. La forma 'int *vec[]' declara un ARRAY DE PUNTEROS, no un puntero a un array — es un error clásico de V/F." },
  { frente: "Al insertar en una lista enlazada ordenada, ¿qué dos casos hay que contemplar?", dorso: "1) Insertar como nuevo primer nodo (lista vacía o valor menor al primero). 2) Insertar en el medio/final recorriendo con un puntero auxiliar hasta encontrar la posición." },
  { frente: "¿Cuál es la diferencia entre archivo secuencial y de acceso directo?", dorso: "Secuencial: se recorre de punta a punta, sin saltos. Acceso directo: registros de tamaño fijo, se calcula el offset y se salta directo a la posición (fseek)." },
  { frente: "¿Qué dos elementos necesita toda función recursiva?", dorso: "Caso base (corta la recursión) y caso recursivo (se acerca al caso base, normalmente pasando l->siguiente o n-1)." },
  { frente: "Al eliminar un nodo del medio de una lista simplemente enlazada, ¿qué puntero auxiliar necesitás?", dorso: "Un puntero 'anterior' que vaya un paso atrás de 'actual', para poder reconectar anterior->siguiente = actual->siguiente." },
  { frente: "¿Por qué en un vector de listas por categoría el índice suele ser categoria - 1?", dorso: "Porque las categorías del enunciado suelen numerarse de 1 a N, pero los índices de un array en C++ arrancan en 0." },
  { frente: "¿Qué significa 'mantener el archivo ordenado' en un ejercicio de cátedra?", dorso: "Que cada vez que insertás un registro nuevo, tenés que ubicarlo en la posición correcta según la clave de orden (ej. categoría + fecha), no simplemente agregarlo al final." },
  { frente: "En una tabla de dictamen con varios umbrales (aprobado, requiere modif., rechazado), ¿en qué orden hay que evaluar los if/else if?", dorso: "De mayor a menor exigencia: primero el caso más estricto (aprobado totalmente), y en cascada hacia el menos estricto, terminando en rechazado por defecto." }
];

const datosQuiz = [
  { enunciado: "La manera correcta de enviar como parámetro por referencia un vector es: 'int *vec[]'", correcta: false, justificacion: "FALSO. 'int *vec[]' declara un array de punteros a int, no un puntero a un array. Lo correcto es 'int vec[]' o 'int *vec'." },
  { enunciado: "Un array pasado como parámetro a una función en C++ se copia completo, como un int.", correcta: false, justificacion: "FALSO. Se pasa la dirección del primer elemento; los cambios dentro de la función SÍ afectan al array original." },
  { enunciado: "Si reservás memoria con new int[10], debés liberarla con delete [] p; y no con delete p;", correcta: true, justificacion: "VERDADERO. delete sin corchetes en un array reservado con new[] es comportamiento indefinido / mala práctica grave." },
  { enunciado: "En una pila (stack), el primer elemento que se apiló es el primero en salir.", correcta: false, justificacion: "FALSO. Eso es una cola (FIFO). La pila es LIFO: el ÚLTIMO en entrar es el PRIMERO en salir." },
  { enunciado: "Para insertar ordenado en una lista enlazada hay que contemplar el caso especial de insertar como primer nodo.", correcta: true, justificacion: "VERDADERO. Si la lista está vacía o el valor es menor al del primer nodo, hay que actualizar el puntero cabecera de la lista." },
  { enunciado: "Un archivo de acceso directo permite ir a un registro puntual sin leer los anteriores.", correcta: true, justificacion: "VERDADERO, siempre que los registros sean de tamaño fijo: se calcula el offset (posición × tamaño) y se salta directo." },
  { enunciado: "Toda función recursiva necesita únicamente un caso recursivo, el caso base es opcional.", correcta: false, justificacion: "FALSO. Sin caso base la recursión nunca termina (stack overflow). Es obligatorio." },
  { enunciado: "Al eliminar un nodo del medio de una lista simple, alcanza con mover el puntero 'actual' sin usar un puntero auxiliar.", correcta: false, justificacion: "FALSO. Se necesita un puntero 'anterior' para poder reconectar la lista (anterior->siguiente = actual->siguiente)." },
  { enunciado: "La estrategia de apareo (merge) solo puede aplicarse en archivos, nunca en listas ni vectores.", correcta: false, justificacion: "FALSO. El apareo es una técnica general para combinar dos estructuras ordenadas (archivos, listas o vectores), no exclusiva de archivos." },
  { enunciado: "En un vector de listas por categoría, cada posición del vector es la cabecera (primer nodo) de una lista distinta.", correcta: true, justificacion: "VERDADERO. Es el patrón típico para separar datos por categoría manteniendo una lista independiente por cada una." }
];

const datosTrace = [
  {
    titulo: "Trace #1 — Punteros y arrays dinámicos",
    meta: "Final 26/02/2024 · Ejercicio 3",
    codigo: `void proc (int v[], int len){
   *v = 10;
}
int main() {
    int *p = NULL;
    int x = 30;
    p = new int[3];
    p[1] = x;
    proc(p, 3);
    p[2] = *(p+1) + x;
    for (int i=0; i<3; i++)
       cout << *(p+i) << " " << endl;
    delete []p;
    return 0;
}`,
    solucion: "<strong>Salida: 10  30  60</strong> (cada uno en su línea).<br><br>1) p[1] = x → p[1] = 30.<br>2) proc(p,3) hace *v = 10, o sea v[0] = p[0] = 10 (comparten memoria).<br>3) p[2] = *(p+1) + x = 30 + 30 = 60.<br>4) Se imprime p[0], p[1], p[2] → 10 30 60."
  },
  {
    titulo: "Trace #2 — Aritmética de punteros",
    meta: "Final 26/02/2024 · Ejercicio 3",
    codigo: `int main() {
   int *p;
   int x = 10;
   p = new int [10];
   p[0] = 20;
   p[1] = 21;
   p[2] = *p;
   p[3] = *(p+1);
   p[4] = *p + *(p+1);
   cout << *(p+4) << endl;
   return 0;
}`,
    solucion: "<strong>Salida: 41</strong><br><br>p[2] = p[0] = 20.<br>p[3] = p[1] = 21.<br>p[4] = p[0] + p[1] = 20 + 21 = 41.<br>Se imprime *(p+4) = p[4] = 41."
  }
];

const datosCatedra = [
  {
    titulo: "Función Derivación — CONAIISI",
    meta: "Final 22/07/2024",
    enunciado: "Los evaluadores son 20 por categoría (los primeros 20 para la categoría 1, los siguientes 20 para la 2, etc). Cada trabajo se asigna a 3 evaluadores, en cantidades similares. Definí la función de Derivación.",
    solucion: "<p><strong>Idea:</strong> calcular el rango de evaluadores de la categoría (desde = (cat-1)*20+1, hasta = cat*20), mantener un puntero rotativo por categoría que indique el próximo evaluador a asignar (round-robin), y por cada trabajo asignarle los siguientes 3 evaluadores disponibles del rango, reiniciando el puntero si se pasa del 'hasta'.</p><p>Estructuras a declarar: vector proximoEvaluadorPorCategoria[6], inicializado en el 'desde' de cada categoría.</p>"
  },
  {
    titulo: "Función Dictamen — CONAIISI",
    meta: "Final 29/07/2024",
    enunciado: "Con las tablas de puntaje (Aspectos Formales, Ciencia y Tecnología, Autores), completá el campo resultado del trabajo según las notas del evaluador.",
    solucion: "<p><strong>Idea:</strong> (1) sumar los puntajes por bloque, (2) chequear rechazo automático si algún ítem dio 0, (3) aplicar las reglas con if/else if de mayor a menor exigencia (aprobado totalmente → requiere modificaciones → reformular → rechazado), (4) buscar el nodo del trabajo por categoría+título y actualizar su campo dictamen.</p><p>Este patrón — sumar por tabla, aplicar reglas en cascada, actualizar el registro — se repite en casi todos los finales de cátedra, aunque cambien los números.</p>"
  }
];

// =============================================================
// ESTADO GLOBAL
// =============================================================

let indiceFlashcardActual = 0;
let contadorFlashcardsSabidas = 0;
let contadorFlashcardsRepasar = 0;
let estadoFlashcards = [];

let indiceQuizActual = 0;
let puntajeQuizActual = 0;
let quizOrdenAleatorio = [];

// =============================================================
// NAVEGACION POR PESTAÑAS
// =============================================================

function inicializarNavegacionPestanas() {
  const botones = document.querySelectorAll(".botonPestana");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      botones.forEach(b => b.classList.remove("botonPestanaActivo"));
      boton.classList.add("botonPestanaActivo");

      document.querySelectorAll(".pestanaContenido").forEach(p => {
        p.classList.remove("pestanaContenidoActiva");
      });
      document.getElementById(boton.dataset.pestana).classList.add("pestanaContenidoActiva");
    });
  });
}

// =============================================================
// CUENTA REGRESIVA HASTA EL FINAL (24/07)
// =============================================================

function inicializarCuentaRegresiva() {
  const ahora = new Date();
  let anioFinal = ahora.getFullYear();
  let fechaFinal = new Date(anioFinal, 6, 24, 9, 0, 0); // mes 6 = julio (0-indexado)

  if (fechaFinal < ahora) {
    fechaFinal = new Date(anioFinal + 1, 6, 24, 9, 0, 0);
  }

  const diferenciaMs = fechaFinal - ahora;
  const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

  const elementoNumero = document.getElementById("numeroCuentaRegresiva");
  const elementoEtiqueta = document.getElementById("etiquetaDiasHoras");

  if (diasRestantes >= 0) {
    elementoNumero.textContent = diasRestantes;
    elementoEtiqueta.textContent = diasRestantes === 1 ? "día" : "días";
  } else {
    elementoNumero.textContent = "¡Éxitos!";
    elementoEtiqueta.textContent = "";
  }
}

// =============================================================
// RENDERIZADO DE TEORIA (ACORDEON)
// =============================================================

function renderizarTeoria() {
  const contenedor = document.getElementById("listaAcordeonTeoria");
  contenedor.innerHTML = "";

  datosTeoria.forEach((item, indice) => {
    const elementoItem = document.createElement("div");
    elementoItem.className = "itemAcordeon";

    const listaItems = item.resumen.map(linea => `<li>${linea}</li>`).join("");

    elementoItem.innerHTML = `
      <button class="encabezadoItemAcordeon" type="button">
        <span><span class="numeroTemaAcordeon">${String(indice + 1).padStart(2, "0")}</span>${item.tema}</span>
        <span class="iconoToggleAcordeon">+</span>
      </button>
      <div class="cuerpoItemAcordeon">
        <ul>${listaItems}</ul>
        <div class="bloqueCodigoAcordeon">${escaparHtml(item.codigo)}</div>
      </div>
    `;

    const botonEncabezado = elementoItem.querySelector(".encabezadoItemAcordeon");
    botonEncabezado.addEventListener("click", () => {
      const yaAbierto = elementoItem.classList.contains("itemAcordeonAbierto");
      elementoItem.classList.toggle("itemAcordeonAbierto");
      const cuerpo = elementoItem.querySelector(".cuerpoItemAcordeon");
      cuerpo.style.maxHeight = yaAbierto ? "0" : cuerpo.scrollHeight + "40px";
    });

    contenedor.appendChild(elementoItem);
  });
}

function escaparHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// =============================================================
// FLASHCARDS
// =============================================================

function inicializarFlashcards() {
  estadoFlashcards = datosFlashcards.map(() => "sinRevisar");
  indiceFlashcardActual = 0;
  contadorFlashcardsSabidas = 0;
  contadorFlashcardsRepasar = 0;
  document.getElementById("totalFlashcards").textContent = datosFlashcards.length;
  renderizarFlashcardActual();
  actualizarContadoresFlashcards();
}

function renderizarFlashcardActual() {
  const datoActual = datosFlashcards[indiceFlashcardActual];
  document.getElementById("caraFrenteFlashcard").textContent = datoActual.frente;
  document.getElementById("caraDorsoFlashcard").textContent = datoActual.dorso;
  document.getElementById("posicionFlashcardActual").textContent = indiceFlashcardActual + 1;
  document.getElementById("tarjetaFlashcard").classList.remove("tarjetaFlashcardVolteada");
}

function actualizarContadoresFlashcards() {
  document.getElementById("contadorSabidas").textContent = contadorFlashcardsSabidas;
  document.getElementById("contadorRepasar").textContent = contadorFlashcardsRepasar;
}

function recalcularContadoresFlashcards() {
  contadorFlashcardsSabidas = estadoFlashcards.filter(e => e === "sabida").length;
  contadorFlashcardsRepasar = estadoFlashcards.filter(e => e === "repasar").length;
  actualizarContadoresFlashcards();
}

function avanzarFlashcard(delta) {
  indiceFlashcardActual = (indiceFlashcardActual + delta + datosFlashcards.length) % datosFlashcards.length;
  renderizarFlashcardActual();
}

function inicializarControlesFlashcards() {
  document.getElementById("tarjetaFlashcard").addEventListener("click", () => {
    document.getElementById("tarjetaFlashcard").classList.toggle("tarjetaFlashcardVolteada");
  });

  document.getElementById("botonFlashcardSiguiente").addEventListener("click", () => avanzarFlashcard(1));
  document.getElementById("botonFlashcardAnterior").addEventListener("click", () => avanzarFlashcard(-1));

  document.getElementById("botonFlashcardSiSabia").addEventListener("click", () => {
    estadoFlashcards[indiceFlashcardActual] = "sabida";
    recalcularContadoresFlashcards();
    avanzarFlashcard(1);
  });

  document.getElementById("botonFlashcardNoSabia").addEventListener("click", () => {
    estadoFlashcards[indiceFlashcardActual] = "repasar";
    recalcularContadoresFlashcards();
    avanzarFlashcard(1);
  });

  document.getElementById("botonReiniciarFlashcards").addEventListener("click", inicializarFlashcards);
}

// =============================================================
// QUIZ V/F
// =============================================================

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function inicializarQuiz() {
  quizOrdenAleatorio = mezclarArray(datosQuiz.map((_, i) => i));
  indiceQuizActual = 0;
  puntajeQuizActual = 0;
  document.getElementById("totalQuiz").textContent = datosQuiz.length;
  document.getElementById("puntajeQuiz").textContent = puntajeQuizActual;
  renderizarQuizActual();
}

function renderizarQuizActual() {
  const pregunta = datosQuiz[quizOrdenAleatorio[indiceQuizActual]];
  document.getElementById("enunciadoQuiz").textContent = pregunta.enunciado;
  document.getElementById("posicionQuizActual").textContent = indiceQuizActual + 1;

  const botonV = document.getElementById("botonRespuestaVerdadero");
  const botonF = document.getElementById("botonRespuestaFalso");
  const resultado = document.getElementById("resultadoQuiz");

  [botonV, botonF].forEach(b => {
    b.disabled = false;
    b.classList.remove("botonRespuestaCorrecta", "botonRespuestaIncorrecta");
  });
  resultado.classList.remove("resultadoQuizVisible");
  resultado.textContent = "";
}

function responderQuiz(respuestaElegida) {
  const pregunta = datosQuiz[quizOrdenAleatorio[indiceQuizActual]];
  const botonV = document.getElementById("botonRespuestaVerdadero");
  const botonF = document.getElementById("botonRespuestaFalso");
  const resultado = document.getElementById("resultadoQuiz");

  botonV.disabled = true;
  botonF.disabled = true;

  const botonElegido = respuestaElegida ? botonV : botonF;
  const botonCorrectoRef = pregunta.correcta ? botonV : botonF;

  if (respuestaElegida === pregunta.correcta) {
    botonElegido.classList.add("botonRespuestaCorrecta");
    puntajeQuizActual++;
  } else {
    botonElegido.classList.add("botonRespuestaIncorrecta");
    botonCorrectoRef.classList.add("botonRespuestaCorrecta");
  }

  document.getElementById("puntajeQuiz").textContent = puntajeQuizActual;
  resultado.innerHTML = `<strong>${pregunta.correcta ? "VERDADERO" : "FALSO"}.</strong> ${pregunta.justificacion}`;
  resultado.classList.add("resultadoQuizVisible");
}

function siguientePreguntaQuiz() {
  if (indiceQuizActual < quizOrdenAleatorio.length - 1) {
    indiceQuizActual++;
    renderizarQuizActual();
  } else {
    document.getElementById("enunciadoQuiz").textContent =
      `Terminaste el quiz. Puntaje final: ${puntajeQuizActual} / ${datosQuiz.length}. Tocá "Reiniciar quiz" para repetirlo con otro orden.`;
    document.getElementById("botonRespuestaVerdadero").style.display = "none";
    document.getElementById("botonRespuestaFalso").style.display = "none";
    document.getElementById("resultadoQuiz").classList.remove("resultadoQuizVisible");
  }
}

function inicializarControlesQuiz() {
  document.getElementById("botonRespuestaVerdadero").addEventListener("click", () => responderQuiz(true));
  document.getElementById("botonRespuestaFalso").addEventListener("click", () => responderQuiz(false));
  document.getElementById("botonQuizSiguiente").addEventListener("click", siguientePreguntaQuiz);
  document.getElementById("botonReiniciarQuiz").addEventListener("click", () => {
    document.getElementById("botonRespuestaVerdadero").style.display = "";
    document.getElementById("botonRespuestaFalso").style.display = "";
    inicializarQuiz();
  });
}

// =============================================================
// TRACE DE CODIGO
// =============================================================

function renderizarTrace() {
  const contenedor = document.getElementById("listaEjerciciosTrace");
  contenedor.innerHTML = "";

  datosTrace.forEach((ejercicio, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaEjercicio";
    tarjeta.innerHTML = `
      <h3 class="tituloEjercicio">${ejercicio.titulo}</h3>
      <p class="metaEjercicio">${ejercicio.meta}</p>
      <div class="bloqueCodigoEjercicio">${escaparHtml(ejercicio.codigo)}</div>
      <textarea class="campoRespuestaEjercicio" placeholder="Escribí acá qué pensás que imprime, antes de ver la solución..."></textarea>
      <button class="botonMostrarSolucion" data-indice="${indice}">Ver solución</button>
      <div class="bloqueSolucionEjercicio" id="solucionTrace${indice}">${ejercicio.solucion}</div>
    `;
    contenedor.appendChild(tarjeta);
  });

  contenedor.querySelectorAll(".botonMostrarSolucion").forEach(boton => {
    boton.addEventListener("click", () => {
      const solucion = document.getElementById(`solucionTrace${boton.dataset.indice}`);
      solucion.classList.toggle("bloqueSolucionVisible");
      boton.textContent = solucion.classList.contains("bloqueSolucionVisible") ? "Ocultar solución" : "Ver solución";
    });
  });
}

// =============================================================
// EJERCICIOS DE CATEDRA
// =============================================================

function renderizarCatedra() {
  const contenedor = document.getElementById("listaEjerciciosCatedra");
  contenedor.innerHTML = "";

  datosCatedra.forEach((ejercicio, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaEjercicio";
    tarjeta.innerHTML = `
      <h3 class="tituloEjercicio">${ejercicio.titulo}</h3>
      <p class="metaEjercicio">${ejercicio.meta}</p>
      <p class="enunciadoEjercicio">${ejercicio.enunciado}</p>
      <textarea class="campoRespuestaEjercicio" placeholder="Anotá tu idea de resolución (estructuras a declarar, pasos del algoritmo) antes de ver la solución..."></textarea>
      <button class="botonMostrarSolucion" data-indice="${indice}">Ver resolución</button>
      <div class="bloqueSolucionEjercicio" id="solucionCatedra${indice}">${ejercicio.solucion}</div>
    `;
    contenedor.appendChild(tarjeta);
  });

  contenedor.querySelectorAll(".botonMostrarSolucion").forEach(boton => {
    boton.addEventListener("click", () => {
      const solucion = document.getElementById(`solucionCatedra${boton.dataset.indice}`);
      solucion.classList.toggle("bloqueSolucionVisible");
      boton.textContent = solucion.classList.contains("bloqueSolucionVisible") ? "Ocultar resolución" : "Ver resolución";
    });
  });
}

// =============================================================
// INICIALIZACION GENERAL
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  inicializarNavegacionPestanas();
  inicializarCuentaRegresiva();
  renderizarTeoria();
  inicializarFlashcards();
  inicializarControlesFlashcards();
  inicializarQuiz();
  inicializarControlesQuiz();
  renderizarTrace();
  renderizarCatedra();
});
