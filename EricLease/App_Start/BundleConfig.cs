using System.Web.Optimization;

namespace EricLease
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/scripts/home").Include(
                "~/dist/vendor.home.js",
                "~/dist/app.home.js"));
        }
    }
}
