using System.Web.Mvc;

namespace EricLease.Controllers
{
    public class ReactController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "EricLease React";

            return View();
        }
    }
}
