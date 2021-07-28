using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ejercicio01.Models
{
    public class Contacto2
    {
        public int Id { get; set; }
        public int DireccionId { get; set; }

        public string Estado { get; set; }

        public string Nombre { get; set; }
        //[DataType(DataType.PhoneNumber)]
        //[StringLength(10, ErrorMessage = "Deberá tener 10 dígitos",
        //              MinimumLength = 10)]
        //[Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Telefono { get; set; }
        public string Calle { get; set; }
        [Display(Name = "Número Exterior")]
        public int? NumeroExt { get; set; }
        public string Colonia { get; set; }
        public int? Cp { get; set; }
        public string Ciudad { get; set; }
        public string Entidad { get; set; }
        public int Quantity { get; set; }
    }
}
