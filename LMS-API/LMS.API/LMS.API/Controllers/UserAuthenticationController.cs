using LMS.API.Data;
using LMS.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace LMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthenticationController : Controller
    {
        private readonly LMSDbContext _lmsDbContext;
        private readonly IConfiguration _configuration;

        public UserAuthenticationController(LMSDbContext lmsDbContext, IConfiguration configuration)
        {
            _lmsDbContext = lmsDbContext;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] User userRequest)
        {
            //check if user exists?
            var user = _lmsDbContext.Users.FirstOrDefault(x => x.Email == userRequest.Email);

            if(user != null)
            {
                return Ok("User Already Exists!");
            }

            //Password Encryption [One Way]
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(userRequest.Password));
                userRequest.Password = Convert.ToBase64String(hashedBytes);
            }
            _lmsDbContext.Users.Add(userRequest);
            _lmsDbContext.SaveChanges();
            return Ok("Account Registered Succesfully");
        }

        [HttpGet]
        public IActionResult AuthUser(string email,string password)
        {
            //Encrypt Password
            var encryptedPass = "";
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                encryptedPass = Convert.ToBase64String(hashedBytes);
            }
             
            var user = _lmsDbContext.Users.FirstOrDefault(x=> x.Email == email && x.Password == encryptedPass);

            if(user != null)
            {
                var jwt = new Jwt(_configuration["Jwt:Key"],_configuration["Jwt:Duration"]);
                var token = jwt.GenerateToken(user);
                string message = "Logging you in....";
                var response = new { Token = token, Message = message };

                return Ok(response);
            }
            return Ok(new { Token = "", Message = "No User Exists!" });
        }

    }
}
