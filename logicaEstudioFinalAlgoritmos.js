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
  },
  {
    tema: "Paso de parámetros: valor, referencia y puntero",
    resumen: [
      "<strong>Por valor</strong> (<span class='textoCodigoInline'>int x</span>): la función recibe una <em>copia</em>. Lo que hace adentro no afecta a la variable original de afuera.",
      "<strong>Por referencia</strong> (<span class='textoCodigoInline'>int &x</span>): x es un <em>alias</em> de la variable original. Se usa como una variable normal (sin *), y los cambios sí se reflejan afuera.",
      "<strong>Por puntero</strong> (<span class='textoCodigoInline'>int *x</span>): x guarda la <em>dirección</em> de la variable original. Hay que desreferenciar con <span class='textoCodigoInline'>*x</span> para leer o modificar el valor, y se llama pasando <span class='textoCodigoInline'>&variable</span>.",
      "Regla práctica: si una función necesita <em>devolver más de un resultado</em> o modificar una estructura grande sin copiarla entera, se usa referencia o puntero."
    ],
    codigo: `void porValor(int x)      { x = x + 10; }       // copia: no afecta afuera
void porReferencia(int &x){ x = x + 10; }       // alias: sí afecta afuera
void porPuntero(int *x)   { *x = *x + 10; }     // dirección: hay que usar *`
  },
  {
    tema: "Structs y vectores de structs",
    resumen: [
      "Se declara con <span class='textoCodigoInline'>typedef struct { ... } NombreTipo;</span> — así el nombre del tipo queda disponible directo, sin escribir 'struct' cada vez.",
      "Se accede a un campo con el operador punto: <span class='textoCodigoInline'>variable.campo</span>.",
      "Un <strong>vector de structs</strong> combina ambos: <span class='textoCodigoInline'>Alumno alumno[3];</span> declara 3 registros, y se accede con <span class='textoCodigoInline'>alumno[i].campo</span>.",
      "Cargar/imprimir un vector de structs siempre sigue el mismo patrón: un <span class='textoCodigoInline'>for</span> que recorre el índice, y adentro un acceso <span class='textoCodigoInline'>vector[i].campo</span> por cada dato del registro."
    ],
    codigo: `typedef struct {
    int edad;
    char nombre[20];
    float promedio;
} Alumno;

Alumno alumno[3];
for (int i = 0; i < 3; i++) {
    cin >> alumno[i].nombre;
    cin >> alumno[i].edad;
}`
  },
  {
    tema: "Vectores: agregar, quitar y ordenar (burbuja)",
    resumen: [
      "<strong>Agregar al final:</strong> <span class='textoCodigoInline'>v[cant] = valor; cant++;</span> — por eso 'cant' casi siempre se pasa por referencia, la función necesita modificar el contador real.",
      "<strong>Quitar una posición:</strong> se corren todos los elementos siguientes un lugar hacia la izquierda (<span class='textoCodigoInline'>v[pos] = v[pos+1]</span> en bucle) y se decrementa la cantidad.",
      "<strong>Ordenamiento burbuja:</strong> recorrer el vector varias veces comparando pares adyacentes e intercambiando si están en el orden incorrecto.",
      "<strong>Cuidado clásico:</strong> si el bucle interno compara <span class='textoCodigoInline'>v[i]</span> con <span class='textoCodigoInline'>v[i+1]</span>, el índice <span class='textoCodigoInline'>i</span> tiene que llegar como máximo a <span class='textoCodigoInline'>n-2</span> (condición <span class='textoCodigoInline'>i < n-1</span>), si no accedés fuera del vector."
    ],
    codigo: `// Burbuja — OJO con el límite del bucle interno
for (int j = 0; j < n; j++) {
    for (int i = 0; i < n - 1; i++) {   // <- no "i < n"
        if (v[i] > v[i+1]) {
            int aux = v[i];
            v[i] = v[i+1];
            v[i+1] = aux;
        }
    }
}`
  },
  {
    tema: "Archivos de texto: fopen, fgetc, putc, fseek",
    resumen: [
      "Modos de apertura: <span class='textoCodigoInline'>\"r\"</span> lectura (el archivo debe existir), <span class='textoCodigoInline'>\"w\"</span> escritura (crea o trunca), <span class='textoCodigoInline'>\"r+\"</span>/<span class='textoCodigoInline'>\"w+\"</span> lectura y escritura combinadas.",
      "<span class='textoCodigoInline'>fopen</span> devuelve <span class='textoCodigoInline'>NULL</span> si falla — siempre hay que chequear antes de usar el puntero al archivo.",
      "<span class='textoCodigoInline'>fgetc(f)</span> lee un carácter y avanza el cursor; <span class='textoCodigoInline'>putc(c, f)</span> escribe uno. Se compara contra <span class='textoCodigoInline'>EOF</span> para saber si se acabó el archivo.",
      "<span class='textoCodigoInline'>fseek(f, 0, SEEK_SET)</span> reposiciona el cursor al principio del archivo — necesario antes de releer algo que ya se recorrió."
    ],
    codigo: `FILE* f1 = fopen("Ejemplo1.txt", "w+");
if (f1 == NULL) { /* manejar error */ }
putc('A', f1);
fclose(f1);

f1 = fopen("Ejemplo1.txt", "r+");
fseek(f1, 0, SEEK_SET);
char d = fgetc(f1);`
  },
  {
    tema: "Archivos binarios: fread, fwrite y CRUD por struct",
    resumen: [
      "Se guardan registros completos con <span class='textoCodigoInline'>fwrite(&dato, sizeof(Tipo), 1, f)</span>, y se leen simétricamente con <span class='textoCodigoInline'>fread(&dato, sizeof(Tipo), 1, f)</span>.",
      "<span class='textoCodigoInline'>rewind(f)</span> es un atajo para volver el cursor al principio (equivale a <span class='textoCodigoInline'>fseek(f, 0, SEEK_SET)</span>).",
      "<strong>Patrón CRUD sobre archivo binario:</strong> listar = leer todo con un while(fread(...)); buscar = leer hasta encontrar la clave; modificar = leer hasta encontrar la clave, retroceder con fseek la longitud de un registro (<span class='textoCodigoInline'>ftell(f) - sizeof(Tipo)</span>), y sobreescribir con fwrite en esa posición exacta.",
      "Esto permite actualizar <em>un solo registro</em> sin reescribir el archivo entero — muy usado en los ejercicios de cátedra con archivos."
    ],
    codigo: `void modificar(FILE* f, int idBuscado, int nuevoValor) {
    Producto p;
    rewind(f);
    while (fread(&p, sizeof(Producto), 1, f)) {
        if (p.id == idBuscado) {
            p.valor = nuevoValor;
            long pos = ftell(f) - sizeof(Producto);
            fseek(f, pos, SEEK_SET);
            fwrite(&p, sizeof(Producto), 1, f);
            return;
        }
    }
}`
  },
  {
    tema: "Pilas y colas con un struct propio (no genérico)",
    resumen: [
      "El mismo patrón de push/pop (pila) o agregar/suprimir (cola) se usa aunque el dato no sea un int suelto, sino un struct completo (ej. Alumno).",
      "El puntero a la cabecera de la pila (o frente/fin de la cola) se pasa <strong>por referencia a puntero</strong> (<span class='textoCodigoInline'>NodoAlumno*& a</span>): la función necesita modificar el puntero externo para que apunte al nuevo nodo.",
      "En la cola se mantienen dos punteros: <span class='textoCodigoInline'>frente</span> (por dónde se saca) y <span class='textoCodigoInline'>fin</span> (por dónde se agrega) — si la cola queda vacía, ambos vuelven a NULL."
    ],
    codigo: `void push(NodoAlumno*& a, Alumno valor) {
    NodoAlumno* aux = new NodoAlumno();
    aux->alumno = valor;
    aux->sgte = a;
    a = aux;                 // el puntero externo ahora apunta acá
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
  { frente: "En una tabla de dictamen con varios umbrales (aprobado, requiere modif., rechazado), ¿en qué orden hay que evaluar los if/else if?", dorso: "De mayor a menor exigencia: primero el caso más estricto (aprobado totalmente), y en cascada hacia el menos estricto, terminando en rechazado por defecto." },
  { frente: "¿Qué diferencia hay entre pasar por referencia (&) y por puntero (*)?", dorso: "Referencia: es un alias directo de la variable original, se usa igual que una variable normal (sin *). Puntero: guarda una dirección de memoria, hay que desreferenciar con *x para leer/modificar el valor apuntado." },
  { frente: "¿Qué le pasa a una variable pasada por valor si la función la modifica adentro?", dorso: "Nada afuera: la función trabaja sobre una copia local, así que el valor original de la variable no cambia." },
  { frente: "¿Cómo se accede al campo 'edad' del elemento i de un vector de structs llamado alumno?", dorso: "alumno[i].edad — primero el índice del vector entre corchetes, después el campo con punto." },
  { frente: "En un bubble sort de un vector de n elementos, ¿qué cuidado hay que tener con el límite del bucle interno?", dorso: "El índice i no puede llegar hasta n-1 si comparás v[i] con v[i+1] — hay que frenar en i < n-1, si no accedés una posición fuera del vector." },
  { frente: "¿Qué hace fopen(\"archivo.txt\", \"w+\")?", dorso: "Abre el archivo en modo lectura y escritura, creándolo vacío si no existe, o truncándolo (borrando su contenido) si ya existía." },
  { frente: "¿Qué hace rewind(f)?", dorso: "Vuelve el cursor del archivo a la posición 0. Es un atajo equivalente a fseek(f, 0, SEEK_SET)." },
  { frente: "En un archivo binario de registros de tamaño fijo, ¿cómo se sobreescribe un registro puntual sin reescribir todo el archivo?", dorso: "Se ubica su posición (por ejemplo con ftell(f) - sizeof(Tipo) justo después de leerlo), se hace fseek hacia esa posición, y se hace fwrite del registro actualizado ahí mismo." },
  { frente: "¿Por qué agregarValor(v, cant, valor) recibe 'cant' por referencia?", dorso: "Porque la función necesita modificar la cantidad real de elementos usados en el vector, y ese cambio tiene que reflejarse afuera, en la variable de quien la llamó." }
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
  { enunciado: "En un vector de listas por categoría, cada posición del vector es la cabecera (primer nodo) de una lista distinta.", correcta: true, justificacion: "VERDADERO. Es el patrón típico para separar datos por categoría manteniendo una lista independiente por cada una." },
  { enunciado: "Si a una función le pasás una variable por valor y la modificás adentro, el cambio se refleja afuera de la función.", correcta: false, justificacion: "FALSO. Por valor la función recibe una copia; lo que hace con esa copia no afecta a la variable original." },
  { enunciado: "Pasar una variable por referencia (int &x) permite modificar la variable original sin usar el operador de desreferencia *.", correcta: true, justificacion: "VERDADERO. La referencia es un alias: se usa como una variable común, sin *, y los cambios sí impactan afuera." },
  { enunciado: "Con un puntero como parámetro (int *x), para modificar el valor apuntado hay que escribir *x = ...", correcta: true, justificacion: "VERDADERO. x guarda una dirección; *x desreferencia para acceder o modificar el valor en esa dirección." },
  { enunciado: "Para acceder al campo 'edad' del elemento en la posición i de un vector de structs llamado alumno, la sintaxis correcta es alumno[i].edad", correcta: true, justificacion: "VERDADERO. Primero se indexa el vector con [i], y después se accede al campo del struct con el punto." },
  { enunciado: "fwrite(&p, sizeof(Producto), 1, f); escribe un solo registro de tipo Producto en el archivo f.", correcta: true, justificacion: "VERDADERO. El tercer parámetro (1) indica que se escribe un solo elemento de ese tamaño." },
  { enunciado: "rewind(f) cierra el archivo y lo vuelve a abrir.", correcta: false, justificacion: "FALSO. Solamente reposiciona el cursor de lectura/escritura al principio del archivo, sin cerrarlo ni reabrirlo." },
  { enunciado: "En un bubble sort sobre un vector de 5 elementos (índices 0 a 4), un bucle interno que llega hasta i=4 comparando v[i] con v[i+1] puede acceder a una posición fuera del vector.", correcta: true, justificacion: "VERDADERO. Cuando i=4, v[i+1] es v[5], que no existe en un vector de 5 elementos (índices válidos 0 a 4) — es un error clásico de límites." },
  { enunciado: "fopen siempre abre el archivo con éxito, no hace falta verificar el puntero que devuelve.", correcta: false, justificacion: "FALSO. fopen puede devolver NULL (ej. si el archivo no existe en modo lectura), y siempre hay que chequearlo antes de usarlo." },
  { enunciado: "Una función push para una pila de structs necesita recibir el puntero a la cabecera por referencia a puntero (Nodo*& a) para que el cambio se refleje en la variable de quien la llamó.", correcta: true, justificacion: "VERDADERO. Si 'a' se pasara por valor, el nuevo nodo se agregaría a una copia local del puntero y la pila original en el llamador no se enteraría." }
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

const datosRepo = [
  {
    titulo: "I/O básica y funciones (con retorno vs. void)",
    meta: "Ejercicio1.cpp · Ejercicio2.cpp · Ejercicio3.cpp",
    quePractica: ["Entrada/salida con cin/cout", "Prototipo y definición de una función", "Diferencia entre función con retorno (int) y función void"],
    codigo: `int devolverC(){        // función CON retorno
    return 'C';
}
void imprimir(int a){   // función SIN retorno (void)
    cout << a << endl;
}
int main(){
    char letra = devolverC();   // se usa en una asignación
    imprimir(5);                 // se usa como instrucción sola
}`,
    pregunta: "¿Por qué devolverC() se puede usar del lado derecho de una asignación (letra = devolverC()) pero imprimir(5) no?",
    solucion: "Porque devolverC() tiene tipo de retorno int (en este caso guarda un char en un int) — la llamada 'vale' como una expresión con un valor, entonces se puede asignar a una variable. imprimir es void: no produce ningún valor, así que solo puede usarse como instrucción independiente, nunca del lado derecho de un '='."
  },
  {
    titulo: "Paso de parámetros: valor, referencia y puntero",
    meta: "Ejercicio4.cpp · Ejercicio5.cpp",
    quePractica: ["Diferencia entre copiar (valor) y compartir (referencia/puntero)", "Sintaxis de cada mecanismo", "Por qué a veces hay que usar & o *"],
    codigo: `void porValor(int x)       { x = x + 10; }
void porReferencia(int &x) { x = x + 10; }
void porPuntero(int *x)    { *x = *x + 10; }

int main() {
    int numero = 5;
    porValor(numero);
    cout << numero << endl;      // ¿qué imprime?
    porReferencia(numero);
    cout << numero << endl;      // ¿qué imprime?
    porPuntero(&numero);
    cout << numero << endl;      // ¿qué imprime?
}`,
    pregunta: "Trace: escribí los tres valores que imprime el programa, en orden.",
    solucion: "<strong>5, 15, 25</strong><br><br>1) porValor(numero): trabaja sobre una copia, numero sigue en 5 afuera.<br>2) porReferencia(numero): x es un alias de numero, entonces numero = 5+10 = 15.<br>3) porPuntero(&numero): *x = 15+10 = 25.<br><br><em>Ojo:</em> en el repo original los comentarios de este ejercicio decían '// ahora es 15' después de porValor y '// sigue siendo 5' después de porReferencia — están al revés. Por valor NUNCA cambia el original (sigue en 5), y por referencia SÍ lo cambia (pasa a 15). Es un error de comentario muy fácil de cometer — por eso conviene trazar el código en vez de confiar en los comentarios."
  },
  {
    titulo: "Estructuras de control: while, for, do-while, switch",
    meta: "Ejercicio6.cpp",
    quePractica: ["Bucles while y for equivalentes", "do-while para validar entrada", "switch-case con default"],
    codigo: `void bucleWhile(int numero1, int numero2) {
    while (numero1 < 6) {
        numero2 = numero2 + 10;
        numero1++;
    }
    cout << "WHILE: " << numero2 << endl;
}
void bucleFor(int numero1, int numero2) {
    for (numero1 = 0; numero1 < 6; numero1++) {
        numero2 = numero2 + 10;
    }
    cout << "FOR: " << numero2 << endl;
}
// ambas se llaman así: bucleWhile(numero1, numero2); con numero1=0, numero2=0 en main`,
    pregunta: "Las dos funciones reciben numero1 y numero2 por valor. ¿Qué imprime cada una, y qué pasa con numero1/numero2 en main después de llamarlas?",
    solucion: "Ambas imprimen <strong>60</strong> (0, 10, 20, 30, 40, 50, 60 — seis incrementos de +10, ya que arrancan en numero1=0 y suben hasta 6).<br><br>Como numero1 y numero2 se reciben <strong>por valor</strong>, cada función trabaja sobre copias propias. Las variables numero1 y numero2 de main quedan exactamente igual que antes de cada llamada (0 y 0) — por eso ambas funciones, llamadas por separado, arrancan siempre desde cero e imprimen lo mismo."
  },
  {
    titulo: "Structs y vectores de structs",
    meta: "structs.cpp",
    quePractica: ["Declarar un struct con typedef", "Acceso a campos con el punto", "Cargar/imprimir un vector de structs con un for"],
    codigo: `typedef struct {
    int edad;
    char nombre[20];
    float promedio;
} Alumno;

Alumno alumno[3];
for (int i = 0; i < 3; i++) {
    cin >> alumno[i].nombre;
    cin >> alumno[i].edad;
    cin >> alumno[i].promedio;
}`,
    pregunta: "Ejercicio para extender: agregale al struct Alumno un campo entero 'legajo' y escribí las líneas necesarias para cargarlo e imprimirlo dentro de los mismos bucles for.",
    solucion: "<p>Agregar el campo:</p><pre style='background:#060b09;color:#d7e9df;padding:10px;border-radius:5px;font-size:0.85em;'>typedef struct {\n    int edad;\n    int legajo;\n    char nombre[20];\n    float promedio;\n} Alumno;</pre><p>Dentro del for de carga: <span class='textoCodigoInline'>cin >> alumno[i].legajo;</span></p><p>Dentro del for de impresión: <span class='textoCodigoInline'>cout << alumno[j].legajo << endl;</span></p><p>La idea clave: cualquier campo nuevo del struct se carga/imprime exactamente igual que los demás, solo agregando una línea más dentro del mismo bucle — no hace falta tocar la estructura del for.</p>"
  },
  {
    titulo: "Vectores: acceso, agregar/quitar y burbuja (con bug real)",
    meta: "vectores.cpp · agregarOeliminar.cpp · ordenarConVectores.cpp",
    quePractica: ["Acceso indexado a un vector", "Correr elementos al eliminar una posición", "Ordenamiento burbuja y sus límites"],
    codigo: `int vector[5] = {4, 6, 200, 2, 0};

for (int j = 0; j < 5; j++) {
    for (int i = 0; i < 5; i++) {           // <- este es el bucle real del repo
        if (vector[i] > vector[i+1]) {
            int aux = vector[i];
            vector[i] = vector[i+1];
            vector[i+1] = aux;
        }
    }
}`,
    pregunta: "Este código de burbuja tiene un error de límites (está tal cual en el repo). ¿Cuál es, y cómo lo corregirías?",
    solucion: "El bucle interno usa <span class='textoCodigoInline'>i < 5</span>, pero adentro compara <span class='textoCodigoInline'>vector[i]</span> con <span class='textoCodigoInline'>vector[i+1]</span>. Cuando i llega a 4 (el último índice válido de un vector de 5 elementos), <span class='textoCodigoInline'>vector[i+1]</span> es <span class='textoCodigoInline'>vector[5]</span>, que <strong>no existe</strong> — es acceso fuera de los límites del vector (comportamiento indefinido, puede compilar y 'andar' de casualidad o directamente fallar).<br><br><strong>Corrección:</strong> cambiar la condición del bucle interno a <span class='textoCodigoInline'>i < 4</span> (en general, <span class='textoCodigoInline'>i < n - 1</span> para un vector de n elementos). Una versión más prolija además reduce el rango en cada pasada: <span class='textoCodigoInline'>i < n - 1 - j</span>, porque después de cada vuelta el elemento más grande ya quedó bien ubicado al final."
  },
  {
    titulo: "Nodos con distintos tipos de dato (base de las listas)",
    meta: "vectoresNodo.cpp",
    quePractica: ["Cómo se arma un nodo para distintos tipos de dato (int, char, struct)", "Diferencia entre declarar un nodo y realmente encadenar una lista", "Leer con cuidado una condición de bucle"],
    codigo: `struct NodoEntero {
    int valorEntero;
    NodoEntero* siguiente;
};

void haceAlgo(){ cout << "Haciendo algo..." << endl; }

int main () {
    NodoEntero* punteroNodo1 = NULL;
    while (punteroNodo1 != NULL) {
        haceAlgo();
    }
    return 0;
}`,
    pregunta: "¿Qué imprime este programa al ejecutarse? (Pensalo antes de mirar la solución — es más simple de lo que parece.)",
    solucion: "<strong>No imprime nada.</strong><br><br>punteroNodo1 se inicializa en NULL, y la condición del while es <span class='textoCodigoInline'>punteroNodo1 != NULL</span>, que es FALSA desde el arranque. El bucle nunca entra ni una vez, entonces haceAlgo() nunca se ejecuta.<br><br>Este es un buen recordatorio para el final: antes de trazar el cuerpo de un bucle, siempre chequeá primero si la condición se cumple aunque sea una vez — muchos ejercicios de V/F juegan justo con esto."
  },
  {
    titulo: "Pilas y colas con struct propio (Alumno)",
    meta: "listasConPilas.cpp · listasConColas.cpp",
    quePractica: ["push/pop sobre una pila de structs (no de int genérico)", "agregar/suprimir sobre una cola con frente y fin", "Por qué el puntero a la cabecera va por referencia"],
    codigo: `struct NodoAlumno { Alumno alumno; NodoAlumno* sgte; };

void push(NodoAlumno*& a, Alumno valor) {
    NodoAlumno* aux = new NodoAlumno();
    aux->alumno = valor;
    aux->sgte = a;
    a = aux;
}
Alumno pop(NodoAlumno*& primerElem) {
    Alumno retorno = primerElem->alumno;
    NodoAlumno* q = primerElem;
    primerElem = q->sgte;
    delete q;
    return retorno;
}`,
    pregunta: "¿Por qué push recibe 'NodoAlumno*& a' (puntero por referencia) en vez de simplemente 'NodoAlumno* a'?",
    solucion: "Porque push necesita que la variable del llamador (por ejemplo 'p' en main, que apunta a la cabecera de la pila) quede apuntando al nodo nuevo después de la llamada. Si 'a' se recibiera por valor (sin &), la línea 'a = aux;' solo modificaría la copia local del puntero dentro de push — 'p' en main seguiría apuntando al viejo primer nodo, y el nuevo elemento se perdería. Con '&' el cambio se propaga hacia afuera, igual que cuando insertás en una lista enlazada genérica."
  },
  {
    titulo: "Archivos de texto: fopen, fgetc, putc",
    meta: "archivo.cpp",
    quePractica: ["Modos de apertura de archivo", "Lectura/escritura carácter por carácter", "Reposicionar el cursor con fseek"],
    codigo: `FILE* f1 = fopen("Ejemplo1.txt", "w+");
int i = 0;
char c;
cin >> c;
while (i < 9) {
    putc(c, f1);
    cin >> c;
    i++;
}
putc(c, f1);
fclose(f1);

f1 = fopen("Ejemplo1.txt", "r+");
fseek(f1, 0, SEEK_SET);
char d = fgetc(f1);`,
    pregunta: "¿Por qué hay que volver a hacer fopen y fseek(f1, 0, SEEK_SET) antes de leer, si el archivo ya se había abierto arriba?",
    solucion: "Porque después de escribir con putc en el primer bloque, el cursor del archivo quedó posicionado al FINAL de lo que se escribió (y encima se cerró con fclose). Para leer desde el principio hay que: 1) volver a abrirlo (esta vez en modo lectura/escritura 'r+'), y 2) reposicionar el cursor al inicio con fseek(f1, 0, SEEK_SET) — sin ese fseek, fgetc empezaría a leer desde donde haya quedado el cursor, no necesariamente desde el principio."
  },
  {
    titulo: "Archivos binarios: fread, fwrite y CRUD por struct",
    meta: "archivoBinario.cpp · funcionesArchivos.cpp",
    quePractica: ["Guardar/leer registros de tamaño fijo con fwrite/fread", "rewind para volver al inicio", "Patrón para modificar un registro puntual sin reescribir todo el archivo"],
    codigo: `void modificarArchivo(FILE* f, int id_buscado, int nuevoValor) {
    Producto p;
    rewind(f);
    while (fread(&p, sizeof(Producto), 1, f)) {
        if (p.id == id_buscado) {
            p.valor = nuevoValor;
            long pos = ftell(f) - sizeof(Producto);
            fseek(f, pos, SEEK_SET);
            fwrite(&p, sizeof(Producto), 1, f);
            return;
        }
    }
}`,
    pregunta: "¿Para qué sirve exactamente la línea 'long pos = ftell(f) - sizeof(Producto);'?",
    solucion: "ftell(f) devuelve la posición ACTUAL del cursor. Pero justo antes se hizo fread, que ya avanzó el cursor un registro completo (dejándolo al final del registro leído, no al principio). Restando sizeof(Producto) se calcula la posición donde EMPEZABA ese registro. Con fseek se vuelve exactamente ahí, y recién entonces fwrite sobreescribe ese registro puntual — sin este cálculo, se terminaría escribiendo en el lugar equivocado (un registro más adelante) y se corrompería el archivo."
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
// EJERCICIOS DEL REPO (Final-AyED-Ejercicios)
// =============================================================

function renderizarRepo() {
  const contenedor = document.getElementById("listaEjerciciosRepo");
  contenedor.innerHTML = "";

  datosRepo.forEach((ejercicio, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaEjercicio";

    const listaPractica = ejercicio.quePractica.map(p => `<li>${p}</li>`).join("");

    tarjeta.innerHTML = `
      <h3 class="tituloEjercicio">${ejercicio.titulo}</h3>
      <p class="metaEjercicio">${ejercicio.meta}</p>
      <ul style="color:var(--textoSecundario); font-size:0.9rem; margin:0 0 14px; padding-left:20px;">${listaPractica}</ul>
      <div class="bloqueCodigoEjercicio">${escaparHtml(ejercicio.codigo)}</div>
      <p class="enunciadoEjercicio"><strong style="color:var(--verdeFosforo);">Pregunta:</strong> ${ejercicio.pregunta}</p>
      <textarea class="campoRespuestaEjercicio" placeholder="Escribí tu respuesta antes de ver la solución..."></textarea>
      <button class="botonMostrarSolucion" data-indice="${indice}">Ver solución</button>
      <div class="bloqueSolucionEjercicio" id="solucionRepo${indice}">${ejercicio.solucion}</div>
    `;
    contenedor.appendChild(tarjeta);
  });

  contenedor.querySelectorAll(".botonMostrarSolucion").forEach(boton => {
    boton.addEventListener("click", () => {
      const solucion = document.getElementById(`solucionRepo${boton.dataset.indice}`);
      solucion.classList.toggle("bloqueSolucionVisible");
      boton.textContent = solucion.classList.contains("bloqueSolucionVisible") ? "Ocultar solución" : "Ver solución";
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
  renderizarRepo();
});