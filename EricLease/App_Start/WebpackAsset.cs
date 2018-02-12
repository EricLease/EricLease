using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using Newtonsoft.Json;

namespace EricLease
{
    public static class WebpackAsset
    {
        private static bool _registered;
        private static Dictionary<string, Dictionary<string, string>> _assets;

        public static void RegisterAssets()
        {
            if (_registered) return;

            _registered = true;
            _assets = new Dictionary<string, Dictionary<string, string>>();

            var path = HostingEnvironment.MapPath("~/dist/webpack.assets.json");

            if(!File.Exists(path))
            {
                throw new InvalidOperationException($"File does not exist ({path})");
            }

            dynamic vals;

            using (var reader = new StreamReader(path))
            {
                var json = reader.ReadToEnd();

                vals = JsonConvert.DeserializeObject(json);
            }

            foreach(var chunk in vals)
            {
                var chunkKey = (string)chunk.Name;
                dynamic chunkValue = chunk.Value;

                _assets.Add(chunkKey, new Dictionary<string, string>());

                foreach(var file in chunkValue)
                {
                    var fileKey = (string)file.Name;
                    var fileValue = (string)file.Value;

                    _assets[chunkKey].Add(fileKey, fileValue);
                }
            }
        }

        public static string Script(string name)
        {
            if (!_registered) RegisterAssets();

            if(!_assets.ContainsKey(name) || !_assets[name].ContainsKey("js"))
            {
                throw new InvalidOperationException($"Webpack script asset could not be found ({name})");
            }

            return _assets[name]["js"];
        }

        public static string Style(string name)
        {
            if (!_registered) RegisterAssets();

            if (!_assets.ContainsKey(name) || !_assets[name].ContainsKey("css"))
            {
                throw new InvalidOperationException($"Webpack style asset could not be found ({name})");
            }

            return _assets[name]["css"];
        }
    }
}