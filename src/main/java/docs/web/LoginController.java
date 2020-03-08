package docs.web;

import docs.config.auth.LoginUser;
import docs.config.auth.dto.SessionUser;
import docs.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Session;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@RestController
public class LoginController {

    @GetMapping("/api/v1/login/{service}")
    public String login( @PathVariable("service") String service) {
        if (service == "google") {
            return "/oauth2/authorization/google";
        }

        return "/error";
    }

    @GetMapping("/api/v1/login/user")
    @ResponseBody
    public SessionUser getUser (@LoginUser SessionUser user) {
        if (user != null) {
            return user;
        }
        return null;
    }

//    public String username(@LoginUser SessionUser user) {
//
//        if(user != null) {
//           return user.getName();
//        }
//
//        return "Wrong";
//    }
}
