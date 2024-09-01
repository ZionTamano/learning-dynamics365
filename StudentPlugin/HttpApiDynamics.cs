using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace StudentPlugin
{
    public class HttpApiDynamics
    {
        public static async Task RetrieveUserAsync(string accessToken = "acct")
        {

            try
            {
                // Replace with your Dynamics 365 Web API base URL and user ID
                string baseUrl = "https://org7b5e8ce7.crm4.dynamics.com/";
                string userEndpoint = $"admin@trailuserdynamics3652gmailc.onmicrosoft";

                using (var httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(baseUrl);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                    HttpResponseMessage response = await httpClient.GetAsync(userEndpoint);
                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();
                    // Parse the responseBody (likely JSON) to get user details here

                    Console.WriteLine(responseBody);
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                Console.WriteLine(ex.Message);
            }
                   // return responseBody;


        }
    }
}
