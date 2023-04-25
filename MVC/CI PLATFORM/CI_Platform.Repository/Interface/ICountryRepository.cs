using CI_Platform.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_Platform.Repository.Interface
{
  
    public interface ICountryRepository
    {
        IEnumerable<Country> GetAllCountries();
        IEnumerable<City> GetCitiesByCountryId(int countryId);
    }
}
