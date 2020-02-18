package docs.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {
    @GetMapping("/{name}")
    public String page(@PathVariable String name, Model model) {
        model.addAttribute("pageName", name);
        return "page";
    }
}