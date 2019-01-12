using System;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Linq;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetOneByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> GetOneById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<ICollection<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> Update(string username, UserForUpdateDto userForUpdateDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            user.FirstName = userForUpdateDto.FirstName;
            user.LastName = userForUpdateDto.LastName;
            user.Street = userForUpdateDto.Street;
            user.StreetNumber = userForUpdateDto.StreetNumber;
            user.ZipCode = userForUpdateDto.ZipCode;
            user.City = userForUpdateDto.City;
            user.Phone = userForUpdateDto.Phone;
            user.Email = userForUpdateDto.Email;

            if (userForUpdateDto.Role != 0)
            {
                user.Role = (Enums.RoleEnum)userForUpdateDto.Role;
            }

            _context.Users.Update(user);
            _context.SaveChanges();

            return user;
        }

        public async Task<bool> updateDisabled(string username) 
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            user.disabled = !user.disabled;

            _context.Users.Update(user);
            _context.SaveChanges();

            return true;
        }
    }
}