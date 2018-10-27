using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DAO.Interface
{
    interface IColorDAO
    {
        List<ColorDto> GetByCarId(int carId);
    }
}
