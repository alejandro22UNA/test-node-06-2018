var db = require('./queries');

function http() {
   this.configurar = function(app) {
    
    app.get("/", function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Servidor Node Funcionado correctamente :)');
        console.log('APP FUNCIONANDO');
    });
      
      app.get('/inventario/', function(solicitud, respuesta) {
         db.seleccionar(respuesta);
      })

      app.get('/inventario/:id/', function(solicitud, respuesta) {
         db.seleccionarId(solicitud.params.id, respuesta);
      })

      app.post('/inventario/', function(solicitud, respuesta) {
         db.insertar(solicitud.body, respuesta);
      })

      app.put('/inventario/', function(solicitud, respuesta) {
         db.actualizar(solicitud.body, respuesta);
      })

      app.delete('/inventario/:id/', function(solicitud, respuesta) {
         db.borrar(solicitud.params.id, respuesta);
      })

      app.post('/auth/login/',function(solicitud, respuesta){
         db.login(solicitud.body, respuesta);
      })

   }  
}

module.exports = new http();