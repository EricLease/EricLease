using System.Web.Mvc;

namespace EricLease.Controllers
{
    public class AngularController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "EricLease Angular";

            return View();
        }
    }
}
