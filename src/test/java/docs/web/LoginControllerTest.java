package docs.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import docs.domain.posts.Posts;
import docs.domain.user.UserRepository;
import docs.web.dto.PostsSaveRequestDto;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private UserRepository userRepository;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @After
    public void tearDown() throws Exception {
        userRepository.deleteAll();
    }

    @Test
    public void user_login_google() throws Exception {
        //given
        String url = "http://localhost:" + port + "/api/v1/login/"+"google";

        //when
        MvcResult result = mvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().is(302))
                .andReturn();

        //then
    }

    @Test
    public void get_user_before_login() throws Exception {
        //given
        String url = "http://localhost:" + port + "/api/v1/login/"+"user";

        //when
        MvcResult result = mvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();

        //then
        // System.out.println(content);
        assertThat(content.contains("fail")).isTrue();
    }

}
