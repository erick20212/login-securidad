export interface SolicitudDto {
  id: number | null;
  estudiante: EstudianteDto | null;
  empresa: EmpresaDto | null; // Cambiado para usar la interfaz completa
  lineaCarrera: LineaCarreraDto | null; // Cambiado para usar la interfaz completa
  estado: string | null;
  empresas: EmpresaDto[]; // Lista de empresas
  lineasCarrera: LineaCarreraDto[]; // Lista de líneas de carrera
}

export interface EstudianteDto {
  nombre: string | null;
  codigo: string | null;
  dni: string | null;
  telefono: string | null;
  correo: string | null;
}

export interface EmpresaDto {
  id: number | null;
  razonSocial: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
}

export interface LineaCarreraDto {
  id: number | null;
  nombre: string | null;
}
