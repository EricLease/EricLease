using System.Web.Optimization;

namespace EricLease
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/scripts/home").Include(
                "~/dist/common_vendor.js",
                "~/dist/home_vendor.js",
                "~/dist/home.js"));

            bundles.Add(new StyleBundle("~/styles/home").Include(
                "~/dist/common_vendor.css"));
        }
    }
}
