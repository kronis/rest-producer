package restproducer;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by kronis on 06/04/2017.
 */
public interface GreetingController {
    @RequestMapping("/greeting/{username}")
    String greeting(@PathVariable("username") String username);
}
