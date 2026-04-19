/* Portfolio v5 — terminal aesthetic interactions */
(function () {
  'use strict';

  /* ---- Year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Header scroll state ---- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Typing animation on hero name ---- */
  var typedEl = document.getElementById('heroTyped');
  if (typedEl) {
    var name = 'Mahesh Babu Pentapati';
    var i = 0;
    function type() {
      if (i <= name.length) {
        typedEl.textContent = name.slice(0, i);
        i++;
        setTimeout(type, 60 + Math.random() * 40);
      }
    }
    setTimeout(type, 500);
  }

  /* ---- Fill ATT&CK coverage dots based on data-cov ---- */
  document.querySelectorAll('.coverage-dots').forEach(function (el) {
    var cov = parseInt(el.getAttribute('data-cov'), 10) || 0;
    var dots = el.querySelectorAll('.cd');
    var cls = cov >= 3 ? 'filled' : 'partial';
    for (var i = 0; i < cov && i < dots.length; i++) {
      // stagger the appearance
      (function (d, idx) {
        setTimeout(function () { d.classList.add(cls); }, 60 * idx);
      })(dots[i], i);
    }
  });

  /* ---- Count-up animation for stats ---- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10);
    if (isNaN(target)) return;
    var duration = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---- Reveal + count-up via IntersectionObserver ---- */
  var revealables = document.querySelectorAll('[data-reveal]');
  var counters = document.querySelectorAll('[data-count-to]');

  if ('IntersectionObserver' in window) {
    var rIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); rIO.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach(function (el) { rIO.observe(el); });

    var cIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cIO.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cIO.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
    counters.forEach(function (el) {
      var t = el.getAttribute('data-count-to');
      if (t) el.textContent = t;
    });
  }

  /* ---- Active nav link on scroll ---- */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = [].slice.call(document.querySelectorAll('.primary-nav a'));
  var linkById = {};
  navLinks.forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    if (id) linkById[id] = a;
  });
  if (sections.length && 'IntersectionObserver' in window) {
    var nIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = linkById[e.target.id];
        if (!link) return;
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { nIO.observe(s); });
  }

  /* ---- Interactive terminal ---- */
  var termBody = document.getElementById('termBody');
  var termInput = document.getElementById('termInput');

  var commands = {
    help: function () {
      return [
        'Available commands:',
        '  <span class="term-hl">help</span>       Show this list',
        '  <span class="term-hl">whoami</span>     Identity info',
        '  <span class="term-hl">about</span>      Background summary',
        '  <span class="term-hl">skills</span>     Toolkit tree',
        '  <span class="term-hl">projects</span>   Selected work',
        '  <span class="term-hl">contact</span>    Reach me',
        '  <span class="term-hl">socials</span>    Links',
        '  <span class="term-hl">date</span>       Current date/time',
        '  <span class="term-hl">clear</span>      Clear screen'
      ];
    },
    whoami: function () {
      return [
        'mahesh_babu_pentapati',
        'role:       Senior SOC Analyst (L3)',
        'employer:   TechOwl InfoSec Pvt. Ltd.',
        'location:   Surat, IN',
        'status:     open to senior roles'
      ];
    },
    about: function () {
      return [
        'I defend the systems that carry trust.',
        '',
        '3+ years across Mastercard and TechOwl InfoSec.',
        'Detection engineering, threat hunting, IR on',
        'FortiSIEM, FortiSOAR, and QRadar for BFSI clients.',
        '',
        'I care about detections that hold up in',
        'production -- not ones that look clever in a deck.'
      ];
    },
    skills: function () {
      return [
        './toolkit',
        '├─ siem_soar/     FortiSIEM, FortiSOAR, QRadar, Splunk',
        '├─ blue_team/     hunting, IR, forensics, triage',
        '├─ frameworks/    MITRE ATT&amp;CK, Kill Chain, NIST CSF',
        '├─ network/       Wireshark, TCP/IP, DNS, FortiGate',
        '├─ endpoint/      Windows, AD, TV1, Sysmon',
        '└─ scripting/     Python, Regex, Bash, SQL'
      ];
    },
    projects: function () {
      return [
        '[01] SQL Injection detection suite',
        '[02] Windows DNS exfiltration hunt',
        '[03] Credential abuse detection',
        '[04] FortiSOAR IR playbooks',
        '[05] Ransomware forensic investigation',
        '[06] TV1 telemetry normalisation',
        '',
        'Scroll up to the <span class="term-hl">Work</span> section for details.'
      ];
    },
    contact: function () {
      return [
        'email:    maheshbabu.soc7@gmail.com',
        'phone:    +91 76708 66926',
        'linkedin: /in/mahesh-babu-pentapati-soc',
        'github:   /maheshpentapati'
      ];
    },
    socials: function () { return this.contact(); },
    date: function () {
      return [new Date().toString()];
    },
    clear: function () {
      termBody.innerHTML = '';
      return null;
    },
    ls: function () {
      return ['about.md  resume.pdf  detections/  playbooks/  hunts/'];
    },
    sudo: function () {
      return ['<span class="term-err">Permission denied.</span> Nice try.'];
    }
  };

  function termPrint(html, cls) {
    var line = document.createElement('p');
    line.className = 'term-line ' + (cls || 'term-out');
    line.innerHTML = html;
    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function handleCommand(raw) {
    var cmd = (raw || '').trim().toLowerCase();
    termPrint('<span class="term-ps1">mahesh@soc:~$</span> ' + escapeHtml(raw), 'term-cmd');
    if (!cmd) return;
    if (commands[cmd]) {
      var out = commands[cmd]();
      if (out) {
        out.forEach(function (ln) { termPrint(ln || '&nbsp;'); });
      }
    } else {
      termPrint('<span class="term-err">' + escapeHtml(cmd) + ': command not found.</span> Type <span class="term-hl">help</span> for options.');
    }
    termPrint('&nbsp;');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  var history = [];
  var historyIdx = -1;
  if (termInput) {
    termInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = termInput.value;
        if (v.trim()) { history.push(v); historyIdx = history.length; }
        handleCommand(v);
        termInput.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length && historyIdx > 0) {
          historyIdx--;
          termInput.value = history[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          historyIdx++;
          termInput.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          termInput.value = '';
        }
      }
    });

    // Focus input when clicking anywhere on the terminal
    var termEl = document.getElementById('term');
    if (termEl) {
      termEl.addEventListener('click', function (e) {
        if (e.target.tagName !== 'A') termInput.focus();
      });
    }
  }

})();

/* ========== SOC CONSOLE: live clock + rolling event stream ========== */
(function () {
  'use strict';

  /* Live clock in the console bar */
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var el = document.getElementById('liveClock');
    if (!el) return;
    var d = new Date();
    el.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  tick();
  setInterval(tick, 1000);

  /* Enhanced count-up supporting data-divide (for decimals) and data-format (comma) and data-suffix */
  function animateValue(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (isNaN(target)) return;
    var divide = parseFloat(el.getAttribute('data-divide')) || 1;
    var fmt    = el.getAttribute('data-format') || '';
    var sfx    = el.getAttribute('data-suffix') || '';
    var duration = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var cur = target * eased;
      var out;
      if (divide !== 1) {
        out = (cur / divide).toFixed(2);
      } else if (fmt === 'comma') {
        out = Math.floor(cur).toLocaleString('en-US');
      } else {
        out = Math.floor(cur).toString();
      }
      el.textContent = out + sfx;
      if (p < 1) requestAnimationFrame(step);
      else {
        var final;
        if (divide !== 1) final = (target / divide).toFixed(2);
        else if (fmt === 'comma') final = target.toLocaleString('en-US');
        else final = String(target);
        el.textContent = final + sfx;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var socIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          if (el.hasAttribute('data-format') || el.hasAttribute('data-divide') || el.hasAttribute('data-suffix')) {
            animateValue(el);
          }
          socIO.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.soc-console [data-count-to]').forEach(function (el) {
      if (el.hasAttribute('data-format') || el.hasAttribute('data-divide') || el.hasAttribute('data-suffix')) {
        socIO.observe(el);
      }
    });
  }

  /* Threat severity bar fills */
  if ('IntersectionObserver' in window) {
    var tsIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var bar = e.target;
          var pct = parseInt(bar.getAttribute('data-bar'), 10) || 0;
          var fill = bar.querySelector('span');
          if (fill) {
            setTimeout(function () { fill.style.width = pct + '%'; }, 100);
          }
          tsIO.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.ts-bar[data-bar]').forEach(function (el) { tsIO.observe(el); });
  } else {
    document.querySelectorAll('.ts-bar[data-bar]').forEach(function (el) {
      var pct = parseInt(el.getAttribute('data-bar'), 10) || 0;
      var fill = el.querySelector('span');
      if (fill) fill.style.width = pct + '%';
    });
  }

  /* Rolling event stream — timestamps + RFC1918 placeholder IPs */
  var events = [
    { p: 'P2', cat: 'phishing_email_detected',      src: '10.12.x.x' },
    { p: 'P3', cat: 'dns_anomaly_detected',         src: '10.24.x.x' },
    { p: 'P1', cat: 'brute_force_vpn',              src: '203.0.x.x' },
    { p: 'P3', cat: 'login_from_new_geo',           src: '10.41.x.x' },
    { p: 'P2', cat: 'lateral_tool_transfer',        src: '10.12.x.x' },
    { p: 'P1', cat: 'lsass_access_attempt',         src: '10.8.x.x'  },
    { p: 'P4', cat: 'usb_mass_storage_mount',       src: '192.168.x.x' },
    { p: 'P3', cat: 'service_creation_anomaly',     src: '10.17.x.x' },
    { p: 'P2', cat: 'waf_block_sqli',               src: '198.51.x.x' },
    { p: 'P4', cat: 'scheduled_task_created',       src: '10.3.x.x'  },
    { p: 'P2', cat: 'process_injection_suspected',  src: '10.12.x.x' },
    { p: 'P3', cat: 'impossible_travel',            src: '172.20.x.x' },
    { p: 'P2', cat: 'powershell_encoded_command',   src: '10.31.x.x' },
    { p: 'P3', cat: 'uncommon_parent_child',        src: '10.9.x.x'  }
  ];

  var streamEl = document.getElementById('alertStream');
  if (streamEl) {
    var pos = Math.floor(Math.random() * events.length);
    function esc(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function timestampOffset(secondsAgo) {
      var d = new Date(Date.now() - secondsAgo * 1000);
      return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    function addEvent() {
      var a = events[pos % events.length];
      pos++;
      var ts = timestampOffset(Math.floor(Math.random() * 6) + 1);
      var line = document.createElement('div');
      line.className = 'as-line as-' + a.p.toLowerCase();
      line.innerHTML =
        '<span class="as-ts">' + ts + '</span>' +
        '<span class="as-p">' + esc(a.p) + '</span>' +
        '<span class="as-cat">' + esc(a.cat) + '</span>' +
        '<span class="as-src">' + esc(a.src) + '</span>';
      streamEl.insertBefore(line, streamEl.firstChild);
      while (streamEl.children.length > 5) {
        streamEl.removeChild(streamEl.lastChild);
      }
    }
    for (var i = 0; i < 4; i++) addEvent();
    setInterval(addEvent, 3200);
  }
})();
