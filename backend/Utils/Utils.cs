using System.Linq;
using System.Reflection;

namespace backend.Utils
{
    public static class Utils
    {
        public static BindingFlags flags = BindingFlags.IgnoreCase |  BindingFlags.Public | BindingFlags.Instance;

        public static void CopyPropertiesTo<T, TU>(this T source, TU dest)
        {
            var sourceProps = typeof (T).GetProperties(flags).Where(x => x.CanRead).ToList();
            var destProps = typeof(TU).GetProperties(flags)
                    .Where(x => x.CanWrite)
                    .ToList();

            foreach (var sourceProp in sourceProps)
            {
                if (destProps.Any(x => x.Name == sourceProp.Name))
                {
                    var p = destProps.First(x => x.Name == sourceProp.Name);
                    if(p.CanWrite) { // check if the property can be set or no.
                        p.SetValue(dest, sourceProp.GetValue(source, null), null);
                    }
                }

            }
        }
    }
}