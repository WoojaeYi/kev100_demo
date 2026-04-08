/**
 * K-EV100 Admin Demo - Layout Injector
 * 각 서브페이지의 <body> 시작 직후 호출하여 공통 shell을 주입합니다.
 * Usage: layoutInject({ gnbId: 1, pageTitle: '기업계정 목록', breadcrumb: ['계정관리','기업계정 목록'], pageIcon:'fa-users' });
 */
function layoutInject(opts) {
    opts = Object.assign({ gnbId: null, pageTitle: '', pageIcon: 'fa-file', breadcrumb: [] }, opts || {});
    window.currentGnb = opts.gnbId;

    // base path: 현재 파일 위치에서 demo/ 루트까지
    const depth = (window.location.pathname.match(/\//g) || []).length;
    // 간단히 경로 depth 이용: demo 폴더에서 한 단계 하위면 '../' 하나
    const parts = window.location.pathname.split('/').filter(Boolean);
    const demoIdx = parts.findIndex(p => p === 'demo');
    const sub = demoIdx >= 0 ? parts.length - demoIdx - 1 : 0; // 파일 자신 포함
    const base = sub > 1 ? '../'.repeat(sub - 1) : '';

    const breadcrumbHtml = opts.breadcrumb.map((b, i) =>
        (i === 0 ? '' : '<li><i class="fa fa-angle-right"></i></li>') + '<li>' + b + '</li>'
    ).join('');

    const shell = `
<div class="col-md-3 left_col menu_fixed">
  <div class="left_col scroll-view">
    <div class="navbar nav_title" style="border:0;">
      <a href="${base}index.html" class="site_title"><i class="fa fa-bolt"></i><span>K-EV100 관리자</span></a>
    </div>
    <div class="clearfix"></div>
    <div class="profile clearfix">
      <div class="profile_pic"><div class="profile_avatar">관</div></div>
      <div class="profile_info"><span>Welcome,</span><h2>관리자</h2></div>
    </div>
    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
      <div id="leftMenuSection" class="menu_section"></div>
    </div>
    <div class="sidebar-footer hidden-small">
      <a title="Logout" href="#"><span class="glyphicon glyphicon-off" aria-hidden="true"></span></a>
    </div>
  </div>
</div>
<div class="top_nav">
  <div class="nav_menu">
    <div class="nav toggle"><a id="menu_toggle"><i class="fa fa-bars"></i></a></div>
    <div id="kecoGnb" class="keco-gnb"><ul class="keco-gnb-list" id="gnbList"></ul></div>
    <nav class="nav navbar-nav">
      <ul class="navbar-right">
        <li class="nav-item dropdown open" style="padding-left:15px;">
          <a href="#" class="user-profile dropdown-toggle" data-toggle="dropdown">
            <div class="nav-avatar">관</div>관리자
          </a>
          <div class="dropdown-menu dropdown-usermenu pull-right">
            <a href="#" class="dropdown-item">개인정보 수정</a>
            <a href="#" class="dropdown-item"><i class="fa fa-sign-out pull-right"></i> 로그아웃</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</div>
<div class="right_col" role="main" id="pageMainContent">
  <div class="row">
    <div class="page-title">
      <div class="col-md-6"><div class="ml-3">
        <span style="font-size:20px;"><i class="fa ${opts.pageIcon} mr-2"></i>${opts.pageTitle}</span>
      </div></div>
      <div class="col-md-6 d-none d-sm-block">
        <div class="locationWrap text-right mr-3 float-right" style="line-height:30px;">
          <ul class="locationList" style="list-style:none;padding:0;margin:0;display:flex;gap:6px;align-items:center;">
            <li><i class="fa fa-home"></i> <a href="${base}index.html">홈</a></li>
            ${breadcrumbHtml}
          </ul>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
  <div class="row" style="padding-bottom:40px;">
    <div class="col-md-12" id="pageContent">
`;

    const shellClose = `
    </div>
  </div>
</div>
<footer>
  <div class="pull-right">K-EV100 서비스 포털 <a href="#" target="_blank"><i class="fa fa-external-link ml-1"></i> 포털로 이동</a></div>
  <div class="clearfix"></div>
</footer>
`;

    // body에 container 구조 주입
    const containerDiv = document.querySelector('.main_container');
    if (containerDiv) {
        containerDiv.innerHTML = shell + (containerDiv.innerHTML || '') + shellClose;
    }
}

