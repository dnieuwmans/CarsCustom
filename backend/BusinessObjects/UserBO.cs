using System.Collections.Generic;
using System.Data.SqlClient;
using backend.DTO;

namespace backend.BusinessObjects
{
    public class UserBO
    {
        public static List<UserDto> GetAll()
        {
            var connection = new SqlConnection(Utils.CONNECTION_STRING);
            connection.Open();

            var command = new SqlCommand("Select * from [User]", connection);
            var reader = command.ExecuteReader();
            var userDTOs = Utils.GetDataObjects<UserDto>(reader);

            connection.Close();

            return userDTOs;
        }
    }
}