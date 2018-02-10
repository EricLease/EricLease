using System.Web;
using System.Web.Optimization;

namespace EricLease
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/style/site").Include(
                "~/Content/site.css"));
        }
    }
}
