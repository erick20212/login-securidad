/**
 * Interface para los datos de PersonaUsuarioDTO.
 */
export interface PersonaUsuarioDTO {
    id?: number;          // ID de la persona (opcional, porque puede ser nueva)
    nombre: string;       // Nombre de la persona
    apellido: string;     // Apellido de la persona
    email: string;        // Email de la persona
    dni: string;          // DNI de la persona (se usa como password encriptado en el backend)
  }
  
  /**
   * Interface para los datos de SupervisorDTO.
   */
  export interface SupervisorDTO {
    id: number;           // Identificador único del supervisor
    nombre: string;       // Nombre del supervisor
    apellido: string;     // Apellido del supervisor
    email: string;        // Correo electrónico del supervisor
    dni: string;          // DNI del supervisor
  }
  