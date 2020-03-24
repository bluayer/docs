package docs.web;

<<<<<<< Updated upstream
=======
import com.fasterxml.jackson.databind.ObjectMapper;
import docs.config.auth.dto.SessionUser;
>>>>>>> Stashed changes
import docs.domain.posts.Posts;
import docs.domain.posts.PostsRepository;
import docs.domain.user.Role;
import docs.domain.user.User;
import docs.domain.user.UserRepository;
import docs.web.dto.PostsListResponseDto;
import docs.web.dto.PostsResponseDto;
import docs.web.dto.PostsSaveRequestDto;
import docs.web.dto.PostsUpdateRequestDto;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
<<<<<<< Updated upstream
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
=======
import org.springframework.http.*;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.test.context.support.WithMockUser;
>>>>>>> Stashed changes
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Array;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostsApiControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PostsRepository postsRepository;

<<<<<<< Updated upstream
=======
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    private MockHttpSession session;

    @Autowired
    UserRepository userRepository;

    private User user;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        List<User> userList;
        String name = "송정우";
        String email = "wjddn0728@naver.com";
        String picture = "hola/dhdhf";
        Role role = Role.USER;


        user = userRepository.save(User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(role)
                .build()
        );

        session = new MockHttpSession();
        SessionUser sUser = new SessionUser(user);
        session.setAttribute("user", sUser);
    }


>>>>>>> Stashed changes
    @After
    public void tearDown() throws Exception {
        postsRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void posts_save() throws Exception {
        //given
        String title = "title";
        String content = "content";
        PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
                .title(title)
                .content(content)
                .build();

        String url = "http://localhost:" + port + "/api/v1/posts";

        //when
<<<<<<< Updated upstream
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);
=======
        mvc.perform(post(url)
                .session(session)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isOk());
>>>>>>> Stashed changes

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);
        List<Posts> all = postsRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getContent()).isEqualTo(content);
    }

    @Test
    public void posts_delete() throws Exception {
        // given
        Posts savedPosts = postsRepository.save(Posts.builder()
                .title("title")
                .content("content")
                .user(user)
                .build());

        Long deletedId = savedPosts.getId();

        String url = "http://localhost:" + port + "/api/v1/posts/" + deletedId;


        // when
        ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, HttpEntity.EMPTY, Long.class);

        assertThat(responseEntity.getBody()).isEqualTo(deletedId);
    }

    @Test
    public void posts_read() throws Exception {
        // given
        Posts savedPosts = postsRepository.save(Posts.builder()
                .title("title")
                .content("content")
                .user(user)
                .build());

        Long id = savedPosts.getId();

        String url = "http://localhost:" + port + "/api/v1/posts/" + id;

        // when
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, HttpEntity.EMPTY, String.class);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().length()).isNotNull();
    }

    @Test
    public void posts_readAll() throws Exception {
        // given
        Posts savedPosts = postsRepository.save(Posts.builder()
                .title("title1")
                .content("content1")
                .user(user)
                .build());

        postsRepository.save(Posts.builder()
                .title("title2")
                .content("content2")
                .user(user)
                .build());

        Long deletedId = savedPosts.getId();

        String url = "http://localhost:" + port + "/api/v1/posts";

<<<<<<< Updated upstream
=======
        // when
        MvcResult result = mvc.perform(get(url)
                .session(session)
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk())
                .andReturn();
>>>>>>> Stashed changes

        // when
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, HttpEntity.EMPTY, String.class);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().charAt(0)).isEqualTo('[');
    }


    @Test
    public void posts_update() throws Exception {
        //given
        Posts savedPosts = postsRepository.save(Posts.builder()
                .title("title")
                .content("content")
                .user(user)
                .build());

        Long updateId = savedPosts.getId();
        String expectedTitle = "title2";
        String expectedContent = "content2";

        PostsUpdateRequestDto requestDto = PostsUpdateRequestDto.builder()
                .title(expectedTitle)
                .content(expectedContent)
                .build();

        String url = "http://localhost:" + port + "/api/v1/posts/" + updateId;

        HttpEntity<PostsUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

        //when
        ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Long.class);

        //Then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Posts> all = postsRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
        assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
    }
}
