using System.Collections.Generic;
using backend.DAO.DAOImpl;
using backend.DAO.Interface;
using backend.Models;

namespace backend.BusinessObjects
{
    internal class ColorBO
    {
        private static readonly IColorDAO DAO = new ColorDAOImpl();

        public static List<ColorDto> GetByCarId(int carId)
        {
            return DAO.GetByCarId(carId);
        }
    }
}