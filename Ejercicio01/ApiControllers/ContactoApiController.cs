using Ejercicio01.Datos;
using Ejercicio01.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Ejercicio01.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ContactoApiController : ControllerBase
    {

        ContactoAd ad = new ContactoAd();
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                List<Contacto2> contacto = ad.Consulta();
                return Ok(contacto);
            }
            catch (System.Exception ex)
            {
                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }

        }        
        [HttpGet("GetCategory")]
        public ActionResult GetCategory()
        {
            try
            {
                var contacto = ad.GetCategory();
                return Ok(contacto);
            }
            catch (System.Exception ex)
            {
                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }

        }

        [HttpGet("Get")]
        public ActionResult Get(int id)
        {
            try
            {
                Contacto2 contacto = ad.ConsultaId(id);
                if (contacto != null)
                {
                    return Ok(contacto);
                }
                var bad = NotFound("No existe el ID: " + id.ToString());
                return bad;
            }
            catch (System.Exception ex)
            {
                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }
        }

        [HttpPost("Create")]
        public ActionResult Create(Contacto2 model)
        {
            try
            {
                var create = ad.CreateC(model);
                return Ok(create);
            }
            catch (System.Exception ex)
            {

                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }
        }

        [HttpPut("Put")]
        public ActionResult Put([FromBody] Contacto2 model)
        {
            try
            {
                var edit = ad.Update(model);
                return Ok(edit);
            }
            catch (System.Exception ex)
            {

                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }
        }

        [HttpDelete("Delete")]
        public ActionResult Delete([FromBody] Contacto2 model)
        {
            try
            {
                var a = ad.Delete(model);
                return Ok(a);
            }
            catch (System.Exception ex)
            {
                var bad = NotFound("Error: " + ex.Message);
                return bad;
            }
        }
    }
}
