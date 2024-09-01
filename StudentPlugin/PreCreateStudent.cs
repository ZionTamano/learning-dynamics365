using Microsoft.Xrm.Sdk;
using System.ServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
 
namespace StudentPlugin
{
    
    public class PreCreateStudent : IPlugin
    {
        public async void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the tracing service
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context from the service provider.  
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.  
                Entity student = (Entity)context.InputParameters["Target"];

                // Obtain the organization service reference which you will need for  
                // web service calls.  
                IOrganizationServiceFactory serviceFactory =
                    (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                try
                {
                    ////await HttpApiDynamics.RetrieveUserAsync();
                    //Entity entity = service.Retrieve("account", accountid, new ColumnSet("name"));
                    //RetrieveRequest request = new RetrieveRequest()
                    //{
                    //    ColumnSet = new ColumnSet("soft_student"),
                    //    Target = new EntityReference("account", accountid)
                    //};
                    //var response = (RetrieveResponse)service.Execute(request);
                    //Entity entity = response.Entity;



                    CheckingFirstNameAndLastName(tracingService, student);

                    //      CheckID(tracingService, student);

                }

                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in FollowUpPlugin.", ex);
                }

                catch (Exception ex)
                {
                    tracingService.Trace("FollowUpPlugin: {0}", ex.ToString());
                    throw;
                }
            }

        }

        private static void CheckingFirstNameAndLastName(ITracingService tracingService, Entity student)
        {
            tracingService.Trace("start the try section");
            string message = string.Empty;

            if (student["soft_firstname"] == null || student["soft_lastname"] == null)
            {
                message = "first name and last name are required";
                throw new InvalidPluginExecutionException(message);
            }

            if (student["soft_firstname"].ToString().Length >= 3 && student["soft_lastname"].ToString().Length >= 4)
            {
                student["soft_fullname"] = string.Format("{0} {1}", student["soft_firstname"], student["soft_lastname"]);
            }
            else
            {
                student["soft_fullname"] = null;
                message = "first name and last name length nedd to be firstname>=3 lastname>=4";
                throw new InvalidPluginExecutionException(message);
            }

            tracingService.Trace("end the try section");
        }

        static void CheckID(ITracingService tracingService, Entity student)
        {
            int[] mumbersForCheckId = { 1, 2, 1, 2, 1, 2, 1, 2, 1 };
            int count = 0;
            string id = student["soft_idfield"].ToString();
            string message = string.Empty;

            // id = int.Parse(student["soft_idfield"].ToString());

            if (id == null)
            {
                message = "Id is null";
                throw new InvalidPluginExecutionException(message);
            }

            id = id.PadLeft(9, '0');

            for (int i = 0; i < 9; i++)
            {
                int num = Int32.Parse(id.Substring(i, 1)) * mumbersForCheckId[i];

                if (num > 9)
                    num = (num / 10) + (num % 10);

                count += num;
            }

            if (count / 10 == 0)
            {
                message = "The id is true";
                throw new InvalidPluginExecutionException(message);
            }
            else
                throw new InvalidPluginExecutionException(message = "The id is not true");


            // return (count / 10 == 0);
        }

        private static void RegistrationForTheCourse(ITracingService tracingService, Entity student)
        {
            tracingService.Trace("start the try section");
            string message = string.Empty;

            if (student["soft_student"] == null)
            {
                message = "you need to choose student";
                throw new InvalidPluginExecutionException(message);
            }

            if (student["soft_student"] != null)
            {
                for (int i = 0; i < 0; i++)
                {
                    student["soft_student"].ToString();
                }
            }
            else
            {
                message = "first name and last name length nedd to be firstname>=3 lastname>=4";
                throw new InvalidPluginExecutionException(message);
            }
            tracingService.Trace("end the try section");
        }

        //static void RegistrationForTheCourse()
        //{
        //    Entity entity = services.Retrieve("account", accountid, new ColumnSet("name"));
        //    RetrieveRequest request = new RetrieveRequest()
        //    {
        //        ColumnSet = new ColumnSet("soft_student"),
        //        Target = new EntityReference("account", accountid)
        //    };
        //    var response = (RetrieveResponse)svc.Execute(request);
        //    Entity entity = response.Entity;
          
        //}
    }
}
