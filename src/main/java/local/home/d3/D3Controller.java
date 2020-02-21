package local.home.d3;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
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
    public Object getProfile(@RequestParam(value = "profile") String profile,
                             @RequestParam(value = "region") String region) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/?locale=en_US&access_token=%s", region, profile, accessToken.getAccessToken());
        return makeGetRequest(requestUrl);
    }

    @GetMapping("/getHero")
    public Object getHero(@RequestParam(value = "profile") String profile,
                          @RequestParam(value = "region") String region,
                          @RequestParam(value = "heroId") String heroId) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/hero/%s?locale=en_US&access_token=%s", region, profile, heroId, accessToken.getAccessToken());
        return makeGetRequest(requestUrl);
    }

    @GetMapping("/getDetailedItems")
    public Object getDetailedItems(@RequestParam(value = "profile") String profile,
                                   @RequestParam(value = "region") String region,
                                   @RequestParam(value = "heroId") String heroId) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/hero/%s/items?locale=en_US&access_token=%s", region, profile, heroId, accessToken.getAccessToken());
        return makeGetRequest(requestUrl);
    }

    @GetMapping("/getLeaderboard")
    public Object getLeaderboard(@RequestParam(value = "season") String season,
                                 @RequestParam(value = "leaderboard") String leaderboard) {
        String requestUrl = String.format("https://us.api.blizzard.com/data/d3/season/%s/leaderboard/%s?access_token=%s", season, leaderboard, accessToken.getAccessToken());
        return makeGetRequest(requestUrl);
    }

    @GetMapping("/getSeasons")
    public Object getSeasons() {
        String requestUrl = String.format("https://us.api.blizzard.com/data/d3/season/?access_token=%s", accessToken.getAccessToken());
        return makeGetRequest(requestUrl);
    }

    private Object makeGetRequest(String requestUrl) {
        validateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(requestUrl, Object.class);
        } catch (HttpClientErrorException e) {
            return "error";
        }
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
