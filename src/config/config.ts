// Configuración global de la aplicación
const configGlobal = {
  canvasBackgraundColor: "#002", // Color de fondo del lienzo
  spriteBackgroundColor: "#002", // Color de fondo de los sprites
  linksColor: "rgb(173, 167, 167)", // Color de los enlaces
  particleColor: "rgb(235, 243, 124)", // Color de las partículas
  arrowsColor: "rgb(88, 88, 88)", // Color de las flechas

  cameraPosition: [200, 0, 0] as [number, number, number], // Posición inicial de la cámara
  cameraMaxDistance: 400, // Distancia máxima de la cámara
  cameraMinDistance: 10, // Distancia mínima de la cámara
  nodeClickDistance: 70, // Distancia al nodo despues del click
  DataBaseDir: "datasets/miserables.json" // Directorio de la base de datos
};

// Colores asignados a los grupos de nodos
const groupColors: Record<string, string> = {
  control: "rgb(104, 104, 241)", // Azul
  sumision: "rgb(250, 112, 112)", // Rojo
  pasaje: "rgb(242, 242, 109)", // Amarillo
};

/**
   * Definición de tipo para los enlaces
   * @typedef {Object} LinkType
   * @property {string} source - Nodo fuente del enlace
   * @property {string} target - Nodo destino del enlace
   * @property {boolean} isBidirectional - Indica si el enlace es bidireccional
   */
interface LinkType {
  source: string;
  target: string;
  isBidirectional: boolean;
}

/**
* Definición de tipo para los nodos
* @typedef {Object} NodeType
* @property {number} id - Identificador del nodo
* @property {string} name - Nombre del nodo
* @property {number} source - Origen del nodo
* @property {number} target - Destino del nodo
* @property {string} group - Grupo al que pertenece el nodo
*/
type NodeType = {
  // Defición de tipo para los nodos
  id: number;
  name: string;
  source: number;
  target: number;
  group: string;
  url: string,
  start: number,
  end: number
};

/**
 * @typedef {Object} GraphLink
 * @property {number} id - Identificador del enlace
 * @property {string} name - Nombre del enlace
 * @property {number} source - Nodo fuente del enlace
 * @property {number} target - Nodo destino del enlace
 * @property {string} group - Grupo al que pertenece el enlace
 * @property {boolean} isReversed - Indica si el enlace está invertido
 * @property {number} curvature - Curvatura del enlace
 */
type GraphLink = {
  id: number;
  name: string;
  source: number;
  target: number;
  group?: string;
  isReversed?: boolean;
  curvature?: number
  start: number,
  end: number
};

/**
 * @typedef {Object} GraphNode
 * @property {number} id - Identificador del nodo
 * @property {number} x - Posición en el eje x
 *  @property {number} y - Posición en el eje y
 * @property {number} z - Posición en el eje z
 * @property {string} name - Nombre del nodo
 * @property {string} color - Color del nodo
 * @property {string} group - Grupo al que pertenece el nodo
 * @property {string} type - Tipo de nodo
 */
type GraphNode = {
  id: number;
  x?: number;
  y?: number;
  z?: number;
  name?: string;
  color?: string;
  group?: string;
};


export { configGlobal, groupColors, NodeType, LinkType, GraphLink, GraphNode }; 
