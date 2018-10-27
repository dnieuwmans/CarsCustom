using System.Collections.Generic;
using System.Data.SqlClient;
using backend.DAO.Interface;
using backend.Models;

namespace backend.DAO.DAOImpl
{
    public class ColorDAOImpl : IColorDAO
    {
        public List<ColorDto> GetByCarId(int carId)
        {
            var connection = Utils.OpenConnection();

            var sql = $@"SELECT c.id
                         ,      c.[name]
                         ,      c.hex
                         FROM color c
                         INNER JOIN CarColor cc ON cc.color_id = c.id 
                                               AND cc.car_id = {carId}";

            var command = new SqlCommand(sql, connection);
            var reader = command.ExecuteReader();

            var colorDtos = Utils.GetDataObjects<ColorDto>(reader);

            connection.Close();

            return colorDtos;
        }
    }
}