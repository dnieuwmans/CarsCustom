using System.Runtime.Serialization;
using backend.Enums;

namespace backend.Models
{
    [DataContract]
    public class User
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Street { get; set; }

        [DataMember]
        public string StreetNumber { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string ZipCode { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        [DataMember]
        public RoleEnum Role { get; set; }

        [DataMember]
        public bool disabled { get; set; }
    }
}
