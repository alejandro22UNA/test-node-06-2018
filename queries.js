var conexion = require('./connection');
var jwt = require('jsonwebtoken');

function MetodosDB() {
   
   this.seleccionar = function(respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('select * from inventario', function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' })
            } else {
               respuesta.send(resultado);
            }
         })
      }) 
   }

   this.seleccionarId = function(id, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('select * from inventario where id=?',id, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error'});
            } else {
               respuesta.send(resultado);
            }
         })
      })
   }

   this.insertar = function(datos, respuesta) {
      conexion.obtener(function(er, cn){
         cn.query('insert into inventario set ?', datos, function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   this.actualizar = function(datos, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('update inventario set ? where id = ?', [datos, datos.id], function(error, resultado){
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   this.borrar = function(id, respuesta) {
      conexion.obtener(function(er, cn) {
         cn.query('delete from inventario where id = ?', id, function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send({ estado: 'Error' });
            } else {
               respuesta.send({ estado: 'Ok' });
            }
         })
      })
   }

   this.login = function(datos, respuesta) {

      conexion.obtener(function(er, cn) {
         cn.query('select * from usuarios where user=? and pass=?',[datos.user, datos.pass], function(error, resultado) {
            cn.release();
            if (error) {
               respuesta.send('error');
            } else {
               if (resultado.length == 0) {
                  console.log('No se encuentra el usuario');
                  respuesta.send('nofound');
               } else {
                  var token = jwt.sign({
                     user: datos.user,
                     rol: 'admin'
                  },'secreto',{expiresIn: '120s'});
                  respuesta.send(token);
               }
            }
         })
      })
   }
   this.root = function(req, res) {
      // body...
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Servidor Node Funcionado correctamente :');
        console.log('APP FUNCIONANDO');
   
   
}

}
module.exports = new MetodosDB();