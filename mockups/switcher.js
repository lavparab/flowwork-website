// Floating mockup switcher: prev / next / all. Not part of any design.
(function () {
  var list = [
    ['01-thread.html', 'Thread'],
    ['02-ledger.html', 'Ledger'],
    ['03-editorial.html', 'Editorial'],
    ['04-control-room.html', 'Control Room'],
    ['05-parcel.html', 'Parcel'],
    ['06-loop.html', 'Loop']
  ];
  var file = location.pathname.split('/').pop();
  var i = list.findIndex(function (x) { return x[0] === file; });
  if (i < 0 || window.self !== window.top) return;
  var prev = list[(i + list.length - 1) % list.length];
  var next = list[(i + 1) % list.length];

  var host = document.createElement('div');
  var root = host.attachShadow({ mode: 'open' });
  root.innerHTML =
    '<style>' +
    ':host{all:initial}' +
    '.bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:2px;' +
    'background:rgba(10,10,10,.92);color:#F7F7F5;border:1px solid #2a2a2a;border-radius:999px;padding:4px;font:500 12px/1 Inter,system-ui,sans-serif;' +
    'box-shadow:0 8px 30px rgba(0,0,0,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
    'a,button{all:unset;cursor:pointer;padding:9px 12px;border-radius:999px;white-space:nowrap}' +
    'a:hover,button:hover{background:#1f1f1f}' +
    '.now{padding:9px 12px;color:#C1FF72;letter-spacing:.02em}' +
    '.now b{color:#F7F7F5;font-weight:600;margin-left:6px}' +
    '.x{color:#8A8A8A}' +
    '.mini{position:fixed;right:16px;bottom:18px;z-index:2147483000;background:#0A0A0A;color:#C1FF72;border:1px solid #2a2a2a;border-radius:999px;padding:9px 12px;font:600 12px/1 Inter,system-ui,sans-serif}' +
    '@media (max-width:560px){.lbl{display:none}}' +
    '</style>' +
    '<div class="bar" part="bar">' +
    '<a href="' + prev[0] + '" title="Previous: ' + prev[1] + '">&larr;<span class="lbl"> ' + prev[1] + '</span></a>' +
    '<span class="now">0' + (i + 1) + ' / 06<b>' + list[i][1] + '</b></span>' +
    '<a href="' + next[0] + '" title="Next: ' + next[1] + '"><span class="lbl">' + next[1] + ' </span>&rarr;</a>' +
    '<a href="index.html">All</a>' +
    '<button class="x" title="Hide">&times;</button>' +
    '</div>';

  var bar = root.querySelector('.bar');
  root.querySelector('.x').addEventListener('click', function () {
    bar.style.display = 'none';
    var mini = document.createElement('button');
    mini.className = 'mini';
    mini.textContent = '0' + (i + 1) + '/06';
    mini.addEventListener('click', function () { mini.remove(); bar.style.display = 'flex'; });
    root.appendChild(mini);
  });

  document.addEventListener('keydown', function (e) {
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowLeft') location.href = prev[0];
    if (e.key === 'ArrowRight') location.href = next[0];
  });

  document.body.appendChild(host);
})();
