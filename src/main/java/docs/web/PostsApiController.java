package docs.web;

import docs.config.auth.LoginUser;
import docs.config.auth.dto.SessionUser;
import docs.service.PostsService;
import docs.web.dto.PostsListResponseDto;
import docs.web.dto.PostsResponseDto;
import docs.web.dto.PostsSaveRequestDto;
import docs.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostsApiController {

    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto requestDto, @LoginUser SessionUser user) {
        System.out.println("======+" + user.getEmail());
        return postsService.save(requestDto, user.getEmail());
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(id, requestDto);
    }

    @GetMapping("/api/v1/posts")
    public List<PostsListResponseDto> findAll(@LoginUser SessionUser user) {
        return postsService.findAllDescById(user.getEmail());
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id) {
        postsService.delete(id);
        return id;
    }
}