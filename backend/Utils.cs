using System.Collections.Generic;
using System.Data.SqlClient;

namespace backend
{
    public class Utils
    {
        public const string CONNECTION_STRING =
            "Server=tcp:carscustoms.database.windows.net,1433;Initial Catalog=CarsCustoms;Persist Security Info=False;User ID=server;Password=groep4HHS;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        public static List<T> GetDataObjects<T>(SqlDataReader reader) where T : class, new()
        {
            var list = new List<T>();

            if (reader == null)
                return list;

            HashSet<string> tableColumnNames = null;
            while (reader.Read())
            {
                tableColumnNames = tableColumnNames ?? CollectColumnNames(reader);
                var entity = new T();
                foreach (var propertyInfo in typeof(T).GetProperties())
                {
                    object retrievedObject;
                    if (tableColumnNames.Contains(propertyInfo.Name.ToLower()) &&
                        (retrievedObject = reader[propertyInfo.Name.ToLower()]) != null)
                        propertyInfo.SetValue(entity, retrievedObject, null);
                }

                list.Add(entity);
            }

            return list;
        }

        private static HashSet<string> CollectColumnNames(SqlDataReader reader)
        {
            var collectedColumnInfo = new HashSet<string>();
            for (var i = 0; i < reader.FieldCount; i++) collectedColumnInfo.Add(reader.GetName(i));
            return collectedColumnInfo;
        }

        public static SqlConnection OpenConnection()
        {
            var connection = new SqlConnection(CONNECTION_STRING);
            connection.Open();

            return connection;
        }
    }
}