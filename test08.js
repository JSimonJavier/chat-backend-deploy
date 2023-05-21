//? ROUTER Y MULTER

/*
!--> EXPRESS ROUTER
    problema: muchas rutas iguales que solo cambiaban el metodo por lo que el codigo seria engorroso
    *solucion:
        router en express: permite separar los endpoint comunes en entidades separadas como mini aplicaciones logrando un codigo ordenado
        
    *¿como aplicarlo?
        - RERCORDATORIO: estructura de nuestro proyecto => carpeta donde vive, carpeta src donde vive nuestro codigo y nuestro servidor dentro
        - dentro de src agregamos una carpeta => ROUTES => dond vivirian nuestros diferentes routes (app.js fuera de esta carpeta)
        - cuerpo de un rounter (ver carpeta routes)

    *HANDS ON LAB

    * Servicios de archivos estaticos con Express
        - carpeta PUBLIC (index.html, css, imagenes)
        - alojar recursos visibles para el cliente
        - el usuario puede acceder y ver los recursos

        ? como convertir una carpeta en un recurso estatico
        --> app.use(express.static('public'))

        ? prefijo virtual
        - debemos especificar un path de acceso de montaje para el directorio estático
        --> app.use('/static', express.static('public'))

        ? path absoluto
        


!--> EXPRESS Y MIDDLEWARES


!-->MULTER
*/