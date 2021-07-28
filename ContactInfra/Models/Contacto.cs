using System;
using System.Collections.Generic;

#nullable disable

namespace Ejercicio01.Models
{
    public partial class Contacto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Estado { get; set; }
        public int DireccionId { get; set; }

        public virtual Direccion Direccion { get; set; }
    }
}
