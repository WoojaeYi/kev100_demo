/**
 * K-EV100 Admin Demo - Menu Data & Rendering
 * 메뉴 구조: 무공해차 무하부자업무지원시스템 스타일 기반
 */
const MENU_DATA = [
    {
        id: 2, name: '캠페인관리', icon: 'fa-flag',
        children: [
            {
                id: 21, name: '캠페인', icon: 'fa-flag-o', open: true,
                children: [
                    { id: 211, name: '캠페인 목록', url: 'camp/camp_list.html' },
                ]
            },
            {
                id: 29, name: '계정관리', icon: 'fa-users',
                children: [
                    { id: 291, name: '기업계정 목록', url: 'account/account_list.html' },
                    { id: 292, name: '계정 반려 이력', url: 'accountrejectlog/accountrejectlog_list.html' },
                    { id: 293, name: '담당자 변경 이력', url: 'replacemanagerlog/replacemanagerlog_list.html' },
                    { id: 294, name: '탈퇴 이력', url: 'withdrwllog/withdrwllog_list.html' },
                ]
            },
            {
                id: 27, name: '캠페인 통계', icon: 'fa-bar-chart',
                children: [
                    { id: 271, name: '전체 현황', url: 'camp/camp_stat_all.html' },
                    { id: 272, name: '업종별 현황', url: 'camp/campstat_by_biz_cls_cd.html' },
                    { id: 273, name: '날짜별 계정 신청 현황', url: 'camp/campstat_by_date_account.html' },
                    { id: 2731, name: '날짜별 캠페인 신청 현황', url: 'camp/campstat_by_date_campaign.html' },
                    { id: 274, name: '년도별 계획 현황', url: 'camp/campstat_plan.html' },
                    { id: 275, name: '년도별 실적 현황', url: 'camp/campstat_result.html' },
                    { id: 276, name: '기업별 상세 현황', url: 'camp/campstat_enterprise_list.html' },
                    { id: 2711, name: '기업 일반 현황', url: 'camp/campstat_enterprise_general.html' },
                ]
            },
            {
                id: 28, name: '다운로드', icon: 'fa-download',
                children: [
                    { id: 281, name: '보고서/엑셀 다운로드', url: 'camp/report_excel_download.html' },
                ]
            },
        ]
    },
    {
        id: 6, name: '캠페인신청(사용자)', icon: 'fa-user-plus',
        children: [
            {
                id: 61, name: '나의 캠페인 현황', icon: 'fa-list', open: true,
                children: [
                    { id: 611, name: '캠페인 신청 내역', url: 'kor_campaign/campaignList.html' },
                    { id: 612, name: '참여 기업 검색', url: 'kor_campaign/partnerentList.html' },
                ]
            },
            {
                id: 62, name: '가입 신청 (JOIN)', icon: 'fa-handshake-o',
                children: [
                    { id: 621, name: '서약서 안내', url: 'kor_campaign/join/document.html' },
                    { id: 622, name: 'Step1. 약관동의', url: 'kor_campaign/join/step1.html' },
                    { id: 623, name: 'Step2. 기업정보입력', url: 'kor_campaign/join/step2.html' },
                    { id: 624, name: 'Step3. 담당자입력', url: 'kor_campaign/join/step3.html' },
                    { id: 625, name: 'Step4. 증빙서류', url: 'kor_campaign/join/step4.html' },
                    { id: 626, name: 'Step5. 최종확인', url: 'kor_campaign/join/step5.html' },
                    { id: 627, name: '신청 완료', url: 'kor_campaign/join/joinSuccess.html' },
                ]
            },
            {
                id: 63, name: '계획 및 실적 관리', icon: 'fa-bar-chart',
                children: [
                    { id: 631, name: '계획 내역', url: 'kor_campaign/campplandetailRead.html' },
                    { id: 632, name: '계획 제출', url: 'kor_campaign/campplandetailForm.html' },
                    { id: 633, name: '실적 내역', url: 'kor_campaign/campresultRead.html' },
                    { id: 634, name: '실적 제출', url: 'kor_campaign/campresultForm.html' },
                ]
            }
        ]
    }
];

function getBasePath() {
    if (window.__rootLevel) return 'demo/';
    const path = window.location.pathname;
    const parts = path.split('/');
    const demoIdx = parts.findIndex(p => p === 'demo');
    if (demoIdx === -1) return '';
    const depth = parts.length - demoIdx - 2;
    return depth > 0 ? '../'.repeat(depth) : '';
}

function renderGnb(activeGnbId) {
    const base = getBasePath();
    const gnbList = document.getElementById('gnbList');
    if (!gnbList) return;
    gnbList.innerHTML = '';
    MENU_DATA.forEach(function(m) {
        const li = document.createElement('li');
        li.className = 'keco-gnb-item' + (m.id === activeGnbId ? ' active' : '');
        li.setAttribute('data-menu', m.id);
        li.onclick = function() { kecoSwitchMenu(li, m.id); };

        let html = '<a class="keco-gnb-link">' + m.name + '</a>';
        li.innerHTML = html;
        gnbList.appendChild(li);
    });
}

function renderSidebar(activeGnbId, activePageUrl) {
    const base = getBasePath();
    const sidebarContent = document.getElementById('leftMenuSection') || document.querySelector('.menu_section');
    if (!sidebarContent) return;
    sidebarContent.innerHTML = '';

    MENU_DATA.forEach(function(m) {
        const div = document.createElement('div');
        div.className = 'keco-sub-group';
        div.id = 'subGroup_' + m.id;
        div.style.display = (m.id === activeGnbId) ? 'block' : 'none';

        // 사이드바 상단 타이틀 박스 (이미지 스타일)
        let html = '<div class="sidebar-group-title">' + m.name + '</div>';
        html += '<ul class="keco-side-menu">';

        (m.children || []).forEach(function(sub) {
            const hasChildren = sub.children && sub.children.length > 0;
            if (hasChildren) {
                // 하위 항목이 있으면 기본적으로 열림 (accordion 방식 X)
                const isOpen = true;
                html += '<li class="leftMenu' + (isOpen ? ' active' : '') + '">';
                html += '<a href="#" onclick="kecoToggleSub(this); return false;" class="keco-parent-link">';
                html += '<span class="keco-parent-txt">' + sub.name + '</span>';
                html += '<span class="keco-arrow fa fa-minus' + (isOpen ? '' : ' fa-plus-alt') + '"></span></a>';
                html += '<ul class="keco-child-menu' + (isOpen ? ' open' : '') + '">';
                sub.children.forEach(function(child) {
                    const childUrl = base + (child.url || '#');
                    const isCurrent = child.url && activePageUrl && activePageUrl.endsWith(child.url);
                    html += '<li class="' + (isCurrent ? 'current-page' : '') + '">';
                    html += '<a href="' + childUrl + '" class="keco-child-link' + (isCurrent ? ' on' : '') + '">- ' + child.name + '</a>';
                    html += '</li>';
                });
                html += '</ul></li>';
            } else {
                const subUrl = base + (sub.url || '#');
                const isCurrent = sub.url && activePageUrl && activePageUrl.endsWith(sub.url);
                html += '<li class="' + (isCurrent ? 'current-page' : '') + '">';
                html += '<a href="' + subUrl + '" class="keco-parent-link keco-solo' + (isCurrent ? ' on' : '') + '">';
                html += '<span class="keco-parent-txt">' + sub.name + '</span>';
                html += '</a></li>';
            }
        });

        html += '</ul>';
        div.innerHTML = html;
        sidebarContent.appendChild(div);
    });
}

function kecoSwitchMenu(el, menuNo) {
    document.querySelectorAll('.keco-gnb-item').forEach(function(item) {
        item.classList.remove('active');
    });
    el.classList.add('active');
    document.querySelectorAll('.keco-sub-group').forEach(function(group) {
        group.style.display = 'none';
    });
    var target = document.getElementById('subGroup_' + menuNo);
    if (target) target.style.display = 'block';
}

function kecoToggleSub(el) {
    var li = el.parentElement;
    var childMenu = li.querySelector('.keco-child-menu');
    if (!childMenu) return;
    // 아코디언 방식 X: 형제 메뉴를 닫지 않고 개별 토글
    if (childMenu.classList.contains('open')) {
        childMenu.classList.remove('open');
        li.classList.remove('active');
    } else {
        childMenu.classList.add('open');
        li.classList.add('active');
    }
}

function initMenu() {
    const currentUrl = window.location.pathname;
    let activeGnbId = null;

    if (window.currentGnb !== undefined && window.currentGnb !== null) {
        activeGnbId = window.currentGnb;
    } else {
        outer: for (var i = 0; i < MENU_DATA.length; i++) {
            var m = MENU_DATA[i];
            for (var j = 0; j < (m.children || []).length; j++) {
                var sub = m.children[j];
                if (sub.url && currentUrl.endsWith(sub.url)) {
                    activeGnbId = m.id; break outer;
                }
                for (var k = 0; k < (sub.children || []).length; k++) {
                    var child = sub.children[k];
                    if (child.url && currentUrl.endsWith(child.url)) {
                        activeGnbId = m.id; break outer;
                    }
                }
            }
        }
        if (!activeGnbId) activeGnbId = MENU_DATA[0].id;
    }

    renderGnb(activeGnbId);
    renderSidebar(activeGnbId, currentUrl);

    const toggle = document.getElementById('menu_toggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            document.querySelector('.container.body').classList.toggle('menu-collapsed');
        });
    }

    const logoLink = document.querySelector('.site_title');
    if (logoLink) {
        logoLink.href = window.__rootLevel ? 'demo/camp/camp_list.html' : (getBasePath() + 'camp/camp_list.html');
    }
}

document.addEventListener('DOMContentLoaded', initMenu);
