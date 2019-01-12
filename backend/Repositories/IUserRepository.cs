using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
         Task<ICollection<User>> GetAll();
         Task<User> GetOneByUsername(string username);
         Task<User> GetOneById(int id);
         Task<User> Update(string username, UserForUpdateDto userForUpdateDto);
         Task<bool> updateDisabled(string username);
    }
}