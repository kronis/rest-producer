package restproducer;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by kronis on 06/04/2017.
 */
@RestController
public class GreetingControllerImpl implements GreetingController {

    @Override
    public String greeting(@PathVariable("username") String username) {
        return String.format("Hello mr. %s!\n", username);
    }
}
