U | GALLERYU | GALLERY es una aplicación web de contenido multimedia inspirada en el modelo de tableros de Pinterest. Diseñada bajo una arquitectura modular en la nube, permite a los usuarios autenticarse, buscar, organizar y publicar contenido visual en una interfaz de cuadrícula dinámica.  Este proyecto integra desarrollo Frontend, Backend, Cloud Computing (AWS) y normativas éticas de moderación de contenido para garantizar un entorno seguro y escalable.  🚀 Características PrincipalesFeed Dinámico: Visualización de imágenes en formato mosaico responsivo.  Autenticación Segura: Sistema de login y registro con encriptación de contraseñas (Bcrypt) y manejo de sesiones mediante JSON Web Tokens (JWT).Almacenamiento Cloud: Externalización de la carga multimedia hacia Amazon S3, garantizando alta disponibilidad y escalabilidad.  Moderación Ética (Privacy by Design):Verificación de edad algorítmica en el registro para protección infantil.Filtro de lenguaje proactivo en el backend para comentarios.Consentimiento informado explícito en el manejo de datos.🛠️ Stack Tecnológico y ArquitecturaEl sistema está dividido en capas independientes para facilitar el mantenimiento y despliegue:  Frontend (Capa de Presentación)Framework: React.js optimizado con Vite.  Metodología: Diseño Atómico (Átomos, Moléculas, Organismos, Páginas).  Estilos: CSS/SCSS modular y variables globales para Modo Oscuro.  Backend (Capa de Lógica y Negocio)Framework: Python 3.x con FastAPI (asíncrono y de alto rendimiento).  Base de Datos: SQLite gestionado a través de SQLModel (ORM).  Seguridad: PyJWT, Passlib.Cloud (Infraestructura como Servicio - IaaS)Amazon S3: Almacenamiento de objetos para la ingesta de archivos multimedia.  AWS IAM: Gestión de identidades con políticas de mínimo privilegio para la API (Usuario Programático).  Integración: SDK boto3 para comunicación directa entre FastAPI y AWS.⚙️ Requisitos PreviosAntes de levantar el entorno local, asegúrate de tener instalado:Node.js (v16 o superior)Python (v3.9 o superior)GitCuenta activa en AWS (con un Bucket S3 creado y credenciales IAM).💻 Instalación y Despliegue LocalPara ejecutar el proyecto en tu máquina local, sigue estos pasos:1. Clonar el repositorioBashgit clone https://github.com/tu-usuario/UGallery.git
cd UGallery
2. Configuración del Backend (FastAPI)Aísla el entorno de ejecución instalando las dependencias en un entorno virtual.Bash# Navegar a la carpeta del backend
cd Backend-Pinterest

# Crear y activar entorno virtual (Windows)
python -m venv .venv
.venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
Variables de Entorno:Duplica el archivo .env.example, renómbralo a .env y configura tus credenciales (este archivo está ignorado en Git por seguridad):Fragmento de códigoAWS_ACCESS_KEY_ID="tu_access_key"
AWS_SECRET_ACCESS_KEY="tu_secret_key"
AWS_S3_BUCKET="nombre_de_tu_bucket"
AWS_DEFAULT_REGION="us-east-1"
Ejecutar Servidor Backend:Bashuvicorn main:app --reload
La documentación automática (Swagger UI) estará disponible en: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)3. Configuración del Frontend (React/Vite)Abre una nueva terminal y ejecuta el cliente web.Bash# Navegar a la carpeta del frontend
cd FrontEnd-Pinterest

# Instalar módulos de Node
npm install

# Levantar el servidor de desarrollo
npm run dev
La aplicación estará disponible en: http://localhost:5173  🛡️ Estructura del RepositorioPlaintextU-GALLERY/
├── Backend-Pinterest/       # Lógica del servidor e integración Cloud
│   ├── app/
│   │   ├── routers/         # Endpoints modulares (auth, posts, users)
│   │   ├── models.py        # Esquemas de base de datos (SQLModel)
│   │   └── auth_utils.py    # Lógica JWT y encriptación
│   ├── main.py              # Entry point y configuración CORS
│   └── requirements.txt     # Dependencias de Python
│
└── FrontEnd-Pinterest/      # Interfaz gráfica y consumo de API
    ├── src/
    │   ├── components/      # Diseño Atómico
    │   ├── pages/           # Vistas (Index, Login, Register, Profile)
    │   └── styles/          # Hojas de estilo
    └── package.json         # Dependencias de Node