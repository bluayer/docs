package docs.web;

import docs.config.auth.LoginUser;
import docs.config.auth.dto.SessionUser;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @GetMapping("/api/v1/login/{service}")
    public RedirectView login(@PathVariable("service") String service) {
        if (service.equals("google")) {
            return new RedirectView("/oauth2/authorization/google");
        }

        return new RedirectView("/api/v1/login/user");
    }

    @GetMapping("/api/v1/login/user")
    @ResponseBody
    public Map<String, String> getUser (@LoginUser SessionUser user) {
        Map<String, String> map = new HashMap<>();
        if (user != null) {
            map.put("login", "success");
            map.put("name", user.getName());
            map.put("email", user.getEmail());
            map.put("picture", user.getPicture());
        } else {
            map.put("login", "fail");
        }
        return map;
    }
}
