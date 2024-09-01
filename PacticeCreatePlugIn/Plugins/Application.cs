using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace PacticeCreatePlugIn.Plugins
{
    internal class Application : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            try
            {
                IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    ITracingService trace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
                    IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                    if (context.MessageName.ToLower() != "create" && context.Stage != 20)
                    {
                        return;
                    }
                    Entity targetEntity = context.InputParameters["Target"] as Entity;
                    Entity updateAutoNumberConfig = new Entity("za_applicationautonumber");
                    StringBuilder autoNumber = new StringBuilder();
                    string prefix, suffix, seperator, current, year, month, day;
                    DateTime today = DateTime.Now;
                    day = today.Day.ToString("00");
                    month = today.Month.ToString("00");
                    year = today.Year.ToString();

                    QueryExpression qeAutoNumberComfig = new QueryExpression()
                    {
                        EntityName = "za_applicationautonumber",
                        ColumnSet = new ColumnSet("za_prefixs", "za_suffix", "za_seperator", "za_currentnumber", "za_name")
                    };
                    EntityCollection ecAutoNumberConfig = service.RetrieveMultiple(qeAutoNumberComfig);
                    if (ecAutoNumberConfig.Entities.Count == 0)
                    {

                        return;
                    }
                    foreach (Entity entity in ecAutoNumberConfig.Entities)
                    {
                        if (entity.Attributes["za_name"].ToString().ToLower() == "applicationautoNumber")
                        {
                            prefix = entity.GetAttributeValue<string>("za_prefixs");
                            suffix = entity.GetAttributeValue<string>("za_suffix");
                            seperator = entity.GetAttributeValue<string>("za_seperator");
                            current = entity.GetAttributeValue<string>("za_currentnumber");
                            int tenpCurrent = int.Parse(current);
                            tenpCurrent++;
                            current = tenpCurrent.ToString("000000");
                            updateAutoNumberConfig.Id = entity.Id;
                            updateAutoNumberConfig["za_currentnumber"] = current;
                            service.Update(updateAutoNumberConfig);
                            autoNumber.Append(prefix + seperator + year + month + day + seperator + suffix + current);
                            break;
                        }
                    }
                    targetEntity["za_applicationnumber"] = autoNumber.ToString();
                }
            }
            catch (Exception ex)
            {

                throw new InvalidPluginExecutionException(ex.Message);
            }
           

        }
    }
}
