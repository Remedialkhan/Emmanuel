using Ejercicio01.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Ejercicio01.Datos
{
    public class ContactoAd
    {
        public List<Contacto2> Consulta()
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                try
                {
                    List<Contacto2> consulta2 =
                   contexto.Contactos.Select(x => new Contacto2
                   {
                       Nombre = x.Nombre,
                       DireccionId = x.DireccionId,
                       Id = x.Id,
                       Estado = x.Estado,
                       Telefono = x.Telefono,
                       Calle = x.Direccion.Calle,
                       Entidad = x.Direccion.Entidad,
                       NumeroExt = x.Direccion.NumeroExt,
                       Colonia = x.Direccion.Colonia,
                       Ciudad = x.Direccion.Ciudad,
                       Cp = x.Direccion.Cp
                   }).ToList();
                    return consulta2;
                }
                catch (Exception e)
                {
                    throw e;
                }


            }
        }
        public Contacto2 ConsultaId(int? id)
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                Contacto2 contacto2 = new Contacto2();

                try
                {
                    var consulta = contexto.Contactos.Include(x => x.Direccion).FirstOrDefault(x => x.Id == id);
                    contacto2.Id = consulta.Id;
                    contacto2.Nombre = consulta.Nombre;
                    contacto2.Estado = consulta.Estado;
                    contacto2.Telefono = consulta.Telefono;
                    contacto2.Calle = consulta.Direccion.Calle;
                    contacto2.NumeroExt = consulta.Direccion.NumeroExt;
                    contacto2.Colonia = consulta.Direccion.Colonia;
                    contacto2.Cp = consulta.Direccion.Cp;
                    contacto2.Ciudad = consulta.Direccion.Ciudad;
                    contacto2.Entidad = consulta.Direccion.Entidad;
                    contacto2.DireccionId = consulta.Direccion.Id;

                    return contacto2;
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }
        public List<Category> GetCategory()
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                try
                {
                    var consulta = new List<Category>();
                    var category = contexto.Contactos.Select(x => x.Estado).ToList();
                    var category1 = contexto.Contactos.Select(x => x.Estado).Distinct().ToList();
                    //Cambiar tipo de dato
                    for (var i = 0; i < category1.Count(); i++)
                    {
                        consulta.Add(new Category { Nombre = category1[i], Quantity = category.Where(x => x == category1[i]).Count() });
                    }
                    return consulta;
                }
                catch (Exception e)
                {
                    throw e;
                }


            }
        }
        public Contacto2 CreateC(Contacto2 context)
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                Direccion direccion = new Direccion();
                Contacto contacto = new Contacto();
                try
                {
                    direccion.Calle = context.Calle;
                    direccion.Ciudad = context.Ciudad;
                    direccion.Entidad = context.Entidad;
                    direccion.Colonia = context.Colonia;
                    direccion.NumeroExt = context.NumeroExt;
                    direccion.Cp = context.Cp;
                    contexto.Direccions.Add(direccion);
                    contexto.SaveChanges();

                    var consulta = contexto.Direccions.OrderByDescending(y => y.Id).Select(x => x.Id).First().ToString();
                    var idcons = Int32.Parse(consulta);

                    contacto.Nombre = context.Nombre;
                    contacto.Telefono = context.Telefono;
                    contacto.DireccionId = idcons;
                    contexto.Contactos.Add(contacto);
                    contexto.SaveChanges();
                    return (context);
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }
        //Método Update
        public Contacto2 Update(Contacto2 context)
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                Direccion direccion = new Direccion();
                Contacto contacto = new Contacto();

                try
                {
                    direccion.Calle = context.Calle;
                    direccion.Ciudad = context.Ciudad;
                    direccion.Entidad = context.Entidad;
                    direccion.Colonia = context.Colonia;
                    direccion.NumeroExt = context.NumeroExt;
                    direccion.Cp = context.Cp;
                    direccion.Id = context.DireccionId;

                    contacto.Nombre = context.Nombre;
                    contacto.Telefono = context.Telefono;
                    contacto.Id = context.Id;
                    contacto.DireccionId = context.DireccionId;
                    contacto.Estado = context.Estado;

                    contexto.Entry(contacto).State = EntityState.Modified;
                    contexto.SaveChanges();
                    contexto.Entry(direccion).State = EntityState.Modified;
                    contexto.SaveChanges();
                    return (context);
                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
        }
        public int Delete(Contacto2 modelo)
        {
            using (Ejercicio01Context contexto = new Ejercicio01Context())
            {
                var direccion = modelo.DireccionId;
                var contacto = modelo.Id;
                var estado = modelo.Estado;
                var a = 0;
                var comprobar = modelo.Estado;
                try
                {
                    if (comprobar == "")
                    {
                        estado = null;
                    }

                    Contacto remove1 = contexto.Contactos.Find(contacto);
                    Direccion remove2 = contexto.Direccions.Find(direccion);
                    if (estado != null)
                    {
                        contexto.Entry(remove1).State = EntityState.Deleted;
                        contexto.Entry(remove2).State = EntityState.Deleted;
                        contexto.SaveChanges();
                        return a = 1;
                    }
                    else
                    {
                        return a = 0;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
        }
    }

    public class Category
    {
        public String Nombre { get; set; }
        public int Quantity { get; set; }
    }
}
