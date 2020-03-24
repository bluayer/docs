package docs.domain.posts;

import docs.domain.user.User;
import docs.web.dto.PostsListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();

    @Query("SELECT p FROM Posts p where p.user.id=?1 ORDER BY p.modifiedDate DESC")
    List<Posts> findAllDescById(Long userId);
}
