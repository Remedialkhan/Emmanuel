using System;
using System.Collections.Generic;

#nullable disable

namespace Ejercicio01.Models
{
    public partial class Direccion
    {
        public Direccion()
        {
            Contactos = new HashSet<Contacto>();
        }
        public int Id { get; set; }
        public string Calle { get; set; }
        public int? NumeroExt { get; set; }
        public string Colonia { get; set; }
        public int? Cp { get; set; }
        public string Ciudad { get; set; }
        public string Entidad { get; set; }
        public virtual ICollection<Contacto> Contactos { get; set; }
    }
}
