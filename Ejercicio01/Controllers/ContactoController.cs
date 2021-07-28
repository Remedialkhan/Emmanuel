using Ejercicio01.Datos;
using Ejercicio01.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


namespace Ejercicio01.Controllers
{
    public class ContactoController : Controller
    {
        ContactoAd ad = new ContactoAd();

        //GET
        [HttpGet]
        public ActionResult Index()
        {
            try
            {
                List<Contacto2> listContactos = ad.Consulta();
                return View(listContactos);
            }
            catch (System.Exception e)
            {
                ViewBag.alert = e.Message + " Contacte al Administrador";
                return PartialView("Error");
            }

        }
        public PartialViewResult Nuevo()
        {
            try
            {
                List<Contacto2> listContactos = ad.Consulta();
                return PartialView(listContactos);
            }
            catch (System.Exception e)
            {
                ViewBag.alert = e.Message + " Contacte al Administrador";
                return PartialView("Error");
            }

        }
        //Vista Parcial
        [HttpGet]
        public ActionResult Create()
        {
            return PartialView();

        }
        //Update

        public ActionResult Edit(int? id)
        {
            try
            {
                Contacto2 modelo = ad.ConsultaId(id);
                return PartialView(modelo);
            }
            catch (System.Exception e)
            {
                ViewBag.alert = e.Message + " Contacte al Administrador";
                return PartialView("Error");
            }

        }
        //Delete
        [HttpPost]
        public ActionResult Delete(int? id)
        {
            try
            {
                Contacto2 modelo = ad.ConsultaId(id);
                return PartialView(modelo);
            }
            catch (System.Exception e)
            {
                ViewBag.alert = e.Message + " Contacte al Administrador";
                return PartialView("Error");
            }
        }

    }
}
