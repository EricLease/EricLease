using System;
using System.Configuration;

namespace EricLease
{
    public static class Settings
    {
        public static bool UseWebpackDevServer => 
            "true".Equals(ConfigurationManager.AppSettings["UseWebpackDevServer"], StringComparison.InvariantCultureIgnoreCase);

        public static string WebpackDevServerRoot => 
            ConfigurationManager.AppSettings["WebpackDevServerRoot"];
    }
}