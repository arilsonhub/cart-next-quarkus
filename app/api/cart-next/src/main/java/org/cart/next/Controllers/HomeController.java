package org.cart.next.Controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
public class HomeController {
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String welcome()
    {
        return new String("Welcome to Quarkus API");
    }
}
