/* K-EV100 Admin Demo - Global App JS */
document.addEventListener('DOMContentLoaded', function() {
    // 메뉴 토글 (모바일)
    const toggle = document.getElementById('menu_toggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('nav-sm');
        });
    }

    // ── 팝업 모드 감지: ?popup=1 이면 메뉴·헤더·푸터 숨김 ──
    if (new URLSearchParams(window.location.search).get('popup') === '1') {
        var style = document.createElement('style');
        style.textContent = [
            '.left_col, .top_nav, footer, .nav_menu, .keco-gnb, #kecoGnb, .sidebar-group-title { display: none !important; }',
            '.right_col { margin-left: 0 !important; width: 100% !important; min-height: 100vh; }',
            '.container.body .main_container { padding-left: 0 !important; }',
            '.page-title { margin: 0 !important; padding: 8px 16px !important; }',
            /* 팝업 안에서 "목록" 버튼 숨김 */
            'a.btn[href*="enterprise_list"], a.btn[href*="campstat_enterprise_list"] { display: none !important; }'
        ].join('\n');
        document.head.appendChild(style);
    }
});
