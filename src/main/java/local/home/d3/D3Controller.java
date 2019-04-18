package local.home.d3;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1")
public class D3Controller {
    private BlizzardAccessToken accessToken;
    private AuthService authService;
    private LocalDateTime tokenExpire;

    public D3Controller(AuthService authService) {
        this.authService = authService;
        reAuthenticate();
    }

    @GetMapping("/getProfile")
    public Object getProfile(@RequestParam(value = "profile") String profile) {
        validateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(String.format("https://us.api.blizzard.com/d3/profile/%s/?locale=en_US&access_token=%s", profile, accessToken.getAccessToken()), Object.class);
    }

    @GetMapping("/getHero")
    public Object getHero(@RequestParam(value = "profile") String profile,
                          @RequestParam(value = "heroId") String heroId) {
        validateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(String.format("https://us.api.blizzard.com/d3/profile/%s/hero/%s?locale=en_US&access_token=%s", profile, heroId, accessToken.getAccessToken()), Object.class);
        } catch (HttpClientErrorException e) {
            return "";
        }
    }

    @GetMapping("/getDetailedItems")
    public Object getDetailedItems(@RequestParam(value = "profile") String profile,
                                   @RequestParam(value = "heroId") String heroId) {
        validateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(String.format("https://us.api.blizzard.com/d3/profile/%s/hero/%s/items?locale=en_US&access_token=%s", profile, heroId, accessToken.getAccessToken()), Object.class);
    }

    @GetMapping("/getLeaderboard")
    public Object getLeaderboard(@RequestParam(value = "season") String season,
                                 @RequestParam(value = "leaderboard") String leaderboard) {
        validateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(String.format("https://us.api.blizzard.com/data/d3/season/%s/leaderboard/%s?access_token=%s", season, leaderboard, accessToken.getAccessToken()), Object.class);
    }

    private void validateAccessToken() {
        if (LocalDateTime.now().isAfter(this.tokenExpire)) {
            reAuthenticate();
        }
    }

    private void reAuthenticate() {
        this.accessToken = this.authService.getAccessToken();
        this.tokenExpire = LocalDateTime.now().plusSeconds(this.accessToken.getExpiresIn());
    }
}
