using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace backend.Utils
{
    public static class Utils
    {
        public static BindingFlags flags = BindingFlags.IgnoreCase |  BindingFlags.Public | BindingFlags.Instance;

        public static void CopyPropertiesTo(object source, object dest)
        {
            List<PropertyInfo> sourceProps = source.GetType().GetProperties(flags).Where(x => x.CanRead).ToList();
            List<PropertyInfo> destProps = dest.GetType().GetProperties(flags).Where(x => x.CanWrite).ToList();

            foreach (PropertyInfo sourceProp in sourceProps)
            {
                PropertyInfo p = destProps.FirstOrDefault(x => x.Name == sourceProp.Name);
                if (p != null && p.CanWrite)
                    p.SetValue(dest, sourceProp.GetValue(source, null), null);
            }
        }
    }
}