package local.home.d3;

import org.springframework.beans.factory.annotation.Value;
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

    @Value("${D3COMPARE_URL}")
    private String d3compareUrl;

    public D3Controller(AuthService authService) {
        this.authService = authService;
        reAuthenticate();
    }

    @GetMapping("/getProfile")
    public Object getProfile(@RequestParam(value = "profile") String profile,
                             @RequestParam(value = "region") String region,
                             @RequestHeader(value = "referer", required = false) String referrer) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/?locale=en_US&access_token=%s", region, profile, accessToken.getAccessToken());
        return makeGetRequest(requestUrl, referrer);
    }

    @GetMapping("/getHero")
    public Object getHero(@RequestParam(value = "profile") String profile,
                          @RequestParam(value = "region") String region,
                          @RequestParam(value = "heroId") String heroId,
                          @RequestHeader(value = "referer", required = false) String referrer) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/hero/%s?locale=en_US&access_token=%s", region, profile, heroId, accessToken.getAccessToken());
        return makeGetRequest(requestUrl, referrer);
    }

    @GetMapping("/getDetailedItems")
    public Object getDetailedItems(@RequestParam(value = "profile") String profile,
                                   @RequestParam(value = "region") String region,
                                   @RequestParam(value = "heroId") String heroId,
                                   @RequestHeader(value = "referer", required = false) String referrer) {
        String requestUrl = String.format("https://%s.api.blizzard.com/d3/profile/%s/hero/%s/items?locale=en_US&access_token=%s", region, profile, heroId, accessToken.getAccessToken());
        return makeGetRequest(requestUrl, referrer);
    }

    @GetMapping("/getLeaderboard")
    public Object getLeaderboard(@RequestParam(value = "season") String season,
                                 @RequestParam(value = "leaderboard") String leaderboard,
                                 @RequestHeader(value = "referer", required = false) String referrer) {
        String requestUrl = String.format("https://us.api.blizzard.com/data/d3/season/%s/leaderboard/%s?access_token=%s", season, leaderboard, accessToken.getAccessToken());
        return makeGetRequest(requestUrl, referrer);
    }

    private Object makeGetRequest(String requestUrl, String referrer) {
        if (referrer == null || !referrer.contains(d3compareUrl)) {
            return "Ah, ah ah!  You didn't say the magic word!";
        }
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
