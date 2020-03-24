package docs.service;

import docs.config.auth.dto.OAuthAttributes;
import docs.domain.posts.Posts;
import docs.domain.posts.PostsRepository;
import docs.domain.user.User;
import docs.domain.user.UserRepository;
import docs.web.dto.PostsListResponseDto;
import docs.web.dto.PostsResponseDto;
import docs.web.dto.PostsSaveRequestDto;
import docs.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto, String userEmail) {
        System.out.println(userEmail);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. email" + userEmail));

        Posts savedPosts = postsRepository.save(Posts.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .user(user)
                .build()
        );

        user.update(savedPosts);

        return savedPosts.getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        posts.update(requestDto.getTitle(), requestDto.getContent());

        return id;
    }

    @Transactional
    public PostsResponseDto findById (Long id) {
        System.out.println("id is " + id);
        Posts entity = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        return new PostsResponseDto(entity);
    }

//    @Transactional(readOnly=true)
//    public List<PostsListResponseDto> findAllDesc() {
//        return postsRepository.findAllDesc().stream()
//                .map(PostsListResponseDto::new)
//                .collect(Collectors.toList());
//    }

    @Transactional(readOnly=true)
    public List<PostsListResponseDto> findAllDescById(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. email" + userEmail));

        return postsRepository.findAllDescById(user.getId()).stream()
                .map(PostsListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete (Long id) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        postsRepository.delete(posts);
    }
}
