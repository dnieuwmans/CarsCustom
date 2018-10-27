using System.Collections.Generic;
using backend.DAO.DAOImpl;
using backend.DAO.Interface;
using backend.Models;

namespace backend.BusinessObjects
{
    public class CarBO
    {
        private static readonly ICarDAO DAO = new CarDAOImpl();

        public static List<CarDto> GetAll()
        {
            var carDtos = DAO.GetAll();

            SetCarColors(carDtos);

            return carDtos;
        }

        private static void SetCarColors(IEnumerable<CarDto> carDtos)
        {
            foreach (var carDto in carDtos)
                carDto.Colors = ColorBO.GetByCarId(carDto.Id);
        }
    }
}