using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using System.ServiceModel;

namespace StudentPlugin
{
    internal class PreUpdateStudent : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
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
                    //int[] phoneNumberCheck = { 0, 5 };
                    //string phoneNumber = (student["soft_phoneforsendingmessage"].ToString());

                    //for (int i = 0; i < phoneNumberCheck.Length; i++)
                    //{
                    //    int num = Int32.Parse(phoneNumber.Substring(i, 1)) ==string.p phoneNumberCheck[i];
                    //}
                    //string fullName;
                    //if (string.IsNullOrEmpty(fName) || string.IsNullOrEmpty(lName))
                    //{
                    //    message = "first name and last name are required";
                    //    throw new Exception(message);
                    //}
                    //if (fName.Length >= 3 && lName.Length >= 4)
                    //{
                    //    fullName = fName + " " + lName;
                    //}
                    ///*------------------------------------------------------------*/
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
    }
}
