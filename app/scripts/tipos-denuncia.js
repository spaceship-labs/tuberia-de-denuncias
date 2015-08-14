window._tiposDenuncia_ = [
  {
    "handle": "bullying",
    "titulo": "Acoso escolar (bullying)",
    "estados": [{
        "opciones": [1, 0, 5, 5],
        "variables": {
          "title": "Acercarte con el director",
          "content": "La primera acción en un caso de acoso escolar o bullying siempre debe ser acercarte con el director del plantel. Él o ella es quien mejor conoce la escuela, a los maestros y alumnos,  y quien podrá darle una solución más rápida al problema.  Si ya te has acercado con el director, dialogado con él, pero aun así no se ha solucionado la  situación de acoso escolar o bullying, entonces debes proceder a levantar un reporte o  denuncia.",
          "actions": ["Sí, ya lo hice", "No, no lo he hecho", "Ya se ha resuelto la situación", "He decidido no continuar con el reporte"]
        }
      },

      {
        "opciones": [2, 0, 5, 5],
        "variables": {
          "title": "Realizar tu reporte en la línea de atención telefónica",
          "content": "Debes llamar al 01 800 222 2676, en horario de 8 am a 8:30 pm, y estar listo para proporcionar por lo menos los siguientes datos, además de otros que el asesor te pueda pedir:",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [3, 1, 5, 5],

        "variables": {
          "title": "Canalización al seguimiento especializado",
          "content": "El área especializada de la Secretaría de Educación al que haya sido canalizada tu caso debe comunicarse contigo vía correo electrónico. Cuando lo hagan, deben informarte  sobre el número de teléfono de esa área, al cual podrás llamar para aportar nueva información  o dar seguimiento a tu caso.",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [4, 1, 5, 5],

        "variables": {
          "title": "Atención especializada",
          "content": "El área especializada de seguimiento debe realizar una investigación y valoración de tu caso. A partir de ella, se determinarán medidas correctivas para lidar con el caso de acoso  escolar. Estas medidas pueden ser charlas, firmar compromisos para corregir conductas, o  aplicar sanciones.",
          "actions": ["se comunicó", "no se comunicó ", "resuelto", "no continuar"]
        }
      }, {
        "opciones": [5, 5],

        "variables": {
          "title": "Resolución",
          "content": "El área especializada debe llevar a cabo las medidas correctivas propuestas para lidar con el caso.",
          "actions": ["si", "no continuar"]
        }
      }, {
        "opciones": [6],

        "variables": {
          "title": "Encuesta de salida",
          "content": "Platicanos tu experiencia",
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
