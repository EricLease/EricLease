using System.Web.Mvc;

namespace EricLease.Controllers
{
    public class VueController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "EricLease Vue";

            return View();
        }
    }
}
