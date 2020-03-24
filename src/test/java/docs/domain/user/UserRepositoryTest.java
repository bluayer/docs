package docs.domain.user;

import docs.domain.posts.Posts;
import docs.domain.posts.PostsRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    @After
    public void cleanup() {
        postsRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void load() {
        // given
        String name = "송정우";
        String email= "wjddn0728@naver.com";
        String picture= "hola/dhdhf";
        Role role = Role.USER;

        String title = "title";
        String content = "hola";

        userRepository.save(User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(role)
                .build()
        );

        User user = userRepository.findByEmail("wjddn0728@naver.com")
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        postsRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .user(user)
                .build()
        );

        // when
        List<User> userList = userRepository.findAll();
        List<Posts> postsList = postsRepository.findAll();

        //then
        User testUser = userList.get(0);
        Posts testPosts = postsList.get(0);
        assertThat(testUser.getName()).isEqualTo(name);
        assertThat(testUser.getEmail()).isEqualTo(email);
        assertThat(testPosts.getTitle()).isEqualTo(title);
        assertThat(testPosts.getContent()).isEqualTo(content);
        assertThat(testPosts.getUser().getId()).isEqualTo(user.getId());
    }

    @Test
    public void updateUser() {
        // given
        String name1 = "송정우";
        String email1= "wjddn0728@naver.com";
        String picture1 = "hola/dhdhf";
        String name2 = "Hi";
        String email2= "hi@gmail.com";
        String picture2 = "whole";
        Role role = Role.USER;

        String testName = "이의천";
        String testPicture = "whole world";

        String title = "title";
        String content = "hola";

        List<Posts> testPosts = new ArrayList<>();

        User user1 = userRepository.save(User.builder()
                .name(name1)
                .email(email1)
                .picture(picture1)
                .role(role)
                .build()
        );

        User user2 = userRepository.save(User.builder()
                .name(name2)
                .email(email2)
                .picture(picture2)
                .role(role)
                .build()
        );

        Posts testPost = postsRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .user(user1)
                .build()
        );

        testPosts.add(testPost);

        // when
        user1.update(testName, testPicture);
        user2.update(testPosts);

        //then
        assertThat(user1.getName()).isEqualTo(testName);
        assertThat(user1.getPicture()).isEqualTo(testPicture);
        assertThat(user2.getPosts().get(0).getTitle()).isEqualTo(title);
        assertThat(user1.getRoleKey()).isEqualTo(role.getKey());
        assertThat(user1.getRole().getTitle()).isEqualTo(role.getTitle());
    }
}
