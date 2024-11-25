/**
 * Interface para los datos de PersonaUsuarioDTO.
 */
// persona-usuario-dto.ts
// persona-usuario-dto.ts
export interface PersonaUsuarioDTO {
  nombre: string;       // Nombre de la persona
  apellido: string;     // Apellido de la persona
  emailPersona: string; // Email de la persona
  dni: string;          // DNI de la persona (este dato será encriptado y se usará como password)
}


  
  /**
   * Interface para los datos de SupervisorDTO.
   */
// supervisor-dto.ts
export interface SupervisorDTO {
  id: number;           // Identificador único del supervisor
  nombre: string;       // Nombre del supervisor
  apellido: string;     // Apellido del supervisor
  email: string;        // Correo electrónico del supervisor
  dni: string;          // DNI del supervisor
}

  