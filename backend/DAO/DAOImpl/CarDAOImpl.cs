using System.Collections.Generic;
using System.Data.SqlClient;
using backend.DAO.Interface;
using backend.Models;

namespace backend.DAO.DAOImpl
{
    public class CarDAOImpl : ICarDAO
    {
        public List<CarDto> GetAll()
        {
            var connection = Utils.OpenConnection();

            const string sql = @"SELECT * 
                                 FROM Car";

            var command = new SqlCommand(sql, connection);
            var reader = command.ExecuteReader();

            var carDtos = Utils.GetDataObjects<CarDto>(reader);

            connection.Close();

            return carDtos;
        }
    }
}