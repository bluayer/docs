package docs.config.auth.dto;

import docs.domain.user.User;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class OAuthAttributesTest {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    @Before
    public void setUp() {
        this.attributes = new HashMap<>();
        Map<String, Object> response = new HashMap<>();
        response.put("name", "이의천");
        response.put("email", "hi@gmail.com");
        response.put("profile_image", "hihi");

        this.nameAttributeKey = "Google";
        this.name = "송정우";
        this.email = "wjddn0728@naver.com";
        this.picture = "whole";

        this.attributes.put("response", response);
        this.attributes.put("sessionTime", "13000");
        this.attributes.put("name", this.name);
        this.attributes.put("email", this.email);
        this.attributes.put("picture", this.picture);

    }


    @Test
    public void MakeOAuthAttributesTest () {
        // given
        OAuthAttributes oAuthAttributes =  OAuthAttributes.builder()
                .attributes(attributes)
                .email(email)
                .name(name)
                .nameAttributeKey(nameAttributeKey)
                .picture(picture)
                .build();

        OAuthAttributes testGoogleoAuthAttributes;

        OAuthAttributes testNaveroAuthAttributes;

        // when
        User testUser = oAuthAttributes.toEntity();
        testGoogleoAuthAttributes = OAuthAttributes.of(
                "google", "google", this.attributes
        );

        testNaveroAuthAttributes = OAuthAttributes.of(
                "naver", "naver", this.attributes
        );

        // then
        assertThat(testUser.getName()).isEqualTo(this.name);
        assertThat(testGoogleoAuthAttributes.getName()).isEqualTo(this.name);
        assertThat(testNaveroAuthAttributes.getName()).isEqualTo("이의천");
    }

}
