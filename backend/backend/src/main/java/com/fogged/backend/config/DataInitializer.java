package com.fogged.backend.config;

import com.fogged.backend.entity.UserItem;
import com.fogged.backend.repository.UserItemRepository;
import com.fogged.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final UserItemRepository userItemRepository;
    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userItemRepository.count() > 0) return; // 이미 데이터 있으면 스킵

        String p1 = "[\"#E8E4DF\",\"#C9C0B5\",\"#A89F94\",\"#D4CFC9\",\"#F0EDE8\"]";
        String pn1 = "[\"Mist White\",\"Linen Gray\",\"Warm Stone\",\"Pearl\",\"Soft Ivory\"]";

        String p2 = "[\"#C4714A\",\"#8B4E35\",\"#E8C4A0\",\"#A0522D\",\"#F2D4B8\"]";
        String pn2 = "[\"Terracotta\",\"Burnt Sienna\",\"Warm Sand\",\"Rust\",\"Peach Dust\"]";

        String p3 = "[\"#1A1A1A\",\"#2D2D2D\",\"#404040\",\"#111111\",\"#555555\"]";
        String pn3 = "[\"Void Black\",\"Carbon\",\"Ash Dark\",\"Deep Space\",\"Graphite\"]";

        String p4 = "[\"#7B8FA1\",\"#4A6274\",\"#D4DDE4\",\"#9AAAB8\",\"#C0CDD6\"]";
        String pn4 = "[\"Steel Blue\",\"Deep Teal\",\"Morning Mist\",\"Slate\",\"Ice Gray\"]";

        String p5 = "[\"#C8C2BB\",\"#A09890\",\"#E2DDD8\",\"#B8B0A8\",\"#D4CEC8\"]";
        String pn5 = "[\"Pale Ash\",\"Worn Gray\",\"Chalk\",\"Cement\",\"Paper White\"]";

        String p6 = "[\"#F0EDE8\",\"#D8D0C5\",\"#B8AFA4\",\"#E4E0DA\",\"#C8C0B5\"]";
        String pn6 = "[\"Cloud White\",\"Warm Cream\",\"Driftwood\",\"Linen\",\"Sand\"]";

        String p7 = "[\"#9B5E3C\",\"#C4855A\",\"#E8C8A8\",\"#7A4A2E\",\"#D4A882\"]";
        String pn7 = "[\"Rust\",\"Copper\",\"Warm Linen\",\"Mahogany\",\"Blush Sand\"]";

        String p8 = "[\"#222222\",\"#333333\",\"#888888\",\"#1A1A1A\",\"#4A4A4A\"]";
        String pn8 = "[\"Iron Black\",\"Carbon Dark\",\"Steel\",\"Midnight\",\"Gunmetal\"]";

        String p9 = "[\"#A8B5BF\",\"#C8D4DC\",\"#E8EDF0\",\"#8FA0AC\",\"#B8C8D4\"]";
        String pn9 = "[\"Morning Steel\",\"Milk Blue\",\"Cloud Glass\",\"Slate Blue\",\"Mist\"]";

        userItemRepository.saveAll(java.util.List.of(
                build(null, "Mist Corridor", "반투명 린넨 커튼, 바닥부터 천장까지", "fog", "large",
                        "안개가 스며들듯, 빛이 천천히 공간을 채우는 복도. 바닥부터 천장까지 이어진 반투명 린넨 커튼이 외부의 소음과 시선을 부드럽게 차단하며 내밀한 분위기를 만들어냅니다.",
                        "[\"#린넨\",\"#화이트\",\"#자연광\"]", p1, pn1, "#B5AFA8"),
                build(null, "Ember Corner", "웜 톤 테라코타와 번아웃 벨벳의 만남", "dusk", "small",
                        "황혼 무렵, 창문을 통해 들어오는 주황빛 빛이 테라코타 벽면과 만나는 순간.",
                        "[\"#테라코타\",\"#벨벳\",\"#간접조명\"]", p2, pn2, "#C4714A"),
                build(null, "Silent Volume", "소리 없는 공간 — 올 블랙 매트 텍스처", "void", "medium",
                        "모든 것이 흡수되는 공간. 빛도, 소리도, 시간도.",
                        "[\"#블랙\",\"#매트\",\"#미니멀\"]", p3, pn3, "#888888"),
                build(null, "Blue Hour Study", "새벽 5시의 서재, 냉기와 고요함", "dawn", "small",
                        "세상이 아직 잠든 새벽 5시. 창밖은 블루아워의 차가운 빛으로 가득하고, 서재에는 독서등 하나만이 켜져 있습니다.",
                        "[\"#블루그레이\",\"#우드\",\"#서재\"]", p4, pn4, "#7B8FA1"),
                build(null, "Pale Archive", "탈색된 콘크리트, 오래된 종이의 냄새", "ash", "large",
                        "시간이 천천히 모든 색을 빼앗아 간 공간.",
                        "[\"#콘크리트\",\"#베이지\",\"#인더스트리얼\"]", p5, pn5, "#A09890"),
                build(null, "Float Room", "바닥에 닿지 않는 가구들, 부유하는 공간", "fog", "medium",
                        "중력을 거스르는 공간. 모든 가구가 바닥으로부터 살짝 떠 있어 공기가 자유롭게 흐릅니다.",
                        "[\"#화이트오크\",\"#플로팅\",\"#스칸디\"]", p6, pn6, "#C5BDB4"),
                build(null, "Rust Linen Bed", "황혼빛 침실, 구겨진 린넨의 온도", "dusk", "medium",
                        "아무것도 정돈하지 않아도 되는 침실.",
                        "[\"#러스트\",\"#린넨\",\"#침실\"]", p7, pn7, "#9B5E3C"),
                build(null, "Monolith Shelf", "검정 철제 선반, 오브제만이 말한다", "void", "small",
                        "선반 그 자체는 존재를 지웁니다.",
                        "[\"#아이언\",\"#블랙\",\"#오브제\"]", p8, pn8, "#888888"),
                build(null, "Grey Milk Light", "흐린 아침, 유리창 너머 확산된 빛", "dawn", "large",
                        "비가 오려는 흐린 아침. 유리창 너머로 균일하게 확산된 회백색 빛이 공간 전체를 같은 온도로 채웁니다.",
                        "[\"#그레이\",\"#유리\",\"#확산광\"]", p9, pn9, "#A8B5BF")
        ));
    }

    private UserItem build(com.fogged.backend.entity.User user, String title, String desc,
                           String mood, String size, String longDesc,
                           String tags, String palette, String paletteNames, String accent) {
        return UserItem.builder()
                .user(user)
                .title(title)
                .desc(desc)
                .mood(mood)
                .size(size)
                .longDesc(longDesc)
                .tags(tags)
                .palette(palette)
                .paletteNames(paletteNames)
                .accent(accent)
                .build();
    }
}