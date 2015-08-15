window._tiposDenuncia_ = [
  {
    "handle": "bullying",
    "titulo": "Acoso escolar (bullying)",
    "estados": [{
        "opciones": [1, 0, 5, 5],
        "variables": {
          "title": "Acercarte con el director",
          "content": "acercate-con-el-director.md",
          "actions": ["Sí, ya lo hice", "No, no lo he hecho", "Ya se ha resuelto la situación", "He decidido no continuar con el reporte"]
        }
      },

      {
        "opciones": [2, 0, 5, 5],
        "variables": {
          "title": "Realizar tu reporte en la línea de atención telefónica",
          "content": "realizar-reporte-telefonico.md",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [3, 1, 5, 5],

        "variables": {
          "title": "Canalización al seguimiento especializado",
          "content": "canalizacion.md",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [4, 1, 5, 5],

        "variables": {
          "title": "Atención especializada",
          "content": "atencion-especializada.md",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [5, 5],

        "variables": {
          "title": "Resolución",
          "content": "resolucion.md",
          "actions": ["si", "no continuar"]
        }
      }, {
        "opciones": [6],

        "variables": {
          "title": "Encuesta de salida",
          "content": "encuesta-salida.md",
          "form": {
            "method": "/api/encuesta",
            "fields": [{
              "label": "nombre",
              "handle": "name",
              "type": "text"
            }, {
              "label": "comentario",
              "handle": "comment",
              "type": "textarea"
            }]
          }
        }
      }, {
        "opciones": [0],

        "variables": {
          "title": "Gracias",
          "content": ""
        }
      }


    ]
  },
  {
    "handle": "inscripcion",
    "titulo": "Inscripción",
    "estados": [
      {
        "paso": "director"
      }
    ]
  }
];
