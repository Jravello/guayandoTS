#Discord Bot Musica Spotify y Youtube

Funcionamiento:

    -Recibe los datos del argumento
    -Valida tipos
    -Si es tipo Spotify, busca los datos en su API y luego hace esta busqueda en Youtube
    -Si es tipo Youtube, busca los datos
    -Añade a una Lista
    -Reproduce la lista

Para mejor funcionamiento se necesita un mejorador en stream de audio:
    -ffmpeg.exe
    -ffplay.exe
    -ffprobe.exe

Windows
    Añadir carpeta PATH_PROGRAMS al Path (Variables de Entorno).

Linux y Despliegue
    -sudo apt install ffmpeg
	
*Quizas ya no sea necesaria la instalacion busque algo con npm e instala ffmpeg*

