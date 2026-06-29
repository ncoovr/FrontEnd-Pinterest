# U | GALLERY 

**U | GALLERY** es una aplicación web de contenido multimedia inspirada en el modelo de tableros de Pinterest. Diseñada bajo una arquitectura modular en la nube, permite a los usuarios autenticarse, buscar, organizar y publicar contenido visual en una interfaz de cuadrícula dinámica. 

Este proyecto integra desarrollo Frontend, Backend, Cloud Computing (AWS) y normativas éticas de moderación de contenido para garantizar un entorno seguro y escalable.

---

## 🚀 Características Principales

* **Feed Dinámico:** Visualización de imágenes en formato mosaico responsivo.
* **Autenticación Segura:** Sistema de login y registro con encriptación de contraseñas (Bcrypt) y manejo de sesiones mediante JSON Web Tokens (JWT).
* **Almacenamiento Cloud:** Externalización de la carga multimedia hacia Amazon S3, garantizando alta disponibilidad y escalabilidad[cite: 2].
* **Moderación Ética (Privacy by Design):** 
  * Verificación de edad algorítmica en el registro para protección infantil.
  * Filtro de lenguaje proactivo en el backend para comentarios.
  * Consentimiento informado explícito en el manejo de datos.

---

## 🛠️ Stack Tecnológico y Arquitectura

El sistema está dividido en capas independientes para facilitar el mantenimiento y despliegue[cite: 2]:

### Frontend (Capa de Presentación)
* **Framework:** React.js optimizado con Vite[cite: 2].
* **Metodología:** Diseño Atómico (Átomos, Moléculas, Organismos, Páginas)[cite: 2].
* **Estilos:** CSS/SCSS modular y variables globales para Modo Oscuro[cite: 2].

### Backend (Capa de Lógica y Negocio)
* **Framework:** Python 3.x con FastAPI (asíncrono y de alto rendimiento)[cite: 2].
* **Base de Datos:** SQLite gestionado a través de SQLModel (ORM)[cite: 2].
* **Seguridad:** PyJWT, Passlib.

### Cloud (Infraestructura como Servicio - IaaS)
* **Amazon S3:** Almacenamiento de objetos para la ingesta de archivos multimedia[cite: 2].
* **AWS IAM:** Gestión de identidades con políticas de mínimo privilegio para la API (Usuario Programático)[cite: 2].
* **Integración:** SDK `boto3` para comunicación directa entre FastAPI y AWS.

---

## ⚙️ Requisitos Previos

Antes de levantar el entorno local, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (v16 o superior)
* [Python](https://www.python.org/) (v3.9 o superior)
* Git
* Cuenta activa en AWS (con un Bucket S3 creado y credenciales IAM).

---

## 💻 Instalación y Despliegue Local

Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/ncoovr/FrontEnd-Pinterest.git](https://github.com/ncoovr/FrontEnd-Pinterest.git)
cd FrontEnd-Pinterest
