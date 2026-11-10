'use strict';

const paths = {
  server:'<rect x="4" y="3" width="16" height="7" rx="2"/><rect x="4" y="14" width="16" height="7" rx="2"/><path d="M8 6.5h.01M8 17.5h.01M13 6.5h4M13 17.5h4"/>',
  message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-1 1v-9.5A8.5 8.5 0 0 1 11.5 3h1A8.5 8.5 0 0 1 21 11.5Z"/><path d="M7 9h10M7 13h7"/>',
  chart:'<path d="M4 4v16h17M8 15v-4M13 15V6M18 15v-7"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4M10 5h4"/>',
  external:'<path d="M14 3h7v7M21 3 10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  moon:'<path d="M20 15.3A9 9 0 0 1 8.7 4 9 9 0 1 0 20 15.3Z"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  logout:'<path d="M9 4H5v16h4M14 8l4 4-4 4M8 12h13"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
  'chevron-right':'<path d="m9 5 7 7-7 7"/>',
  'chevron-left':'<path d="m15 5-7 7 7 7"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-2l2 2M4 17l2 2a7 7 0 0 0 12-2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  offline:'<path d="m3 3 18 18M5 8a11 11 0 0 0-2 1M8 5a16 16 0 0 1 14 4M8 12a7 7 0 0 0-2 1M12 9a9 9 0 0 1 6 4M9 17a4 4 0 0 1 6 0M12 21h.01"/>',
  wifi:'<path d="M2 8.8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 15.3a6 6 0 0 1 8 0M12 20h.01"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  pin:'<path d="m16 3 5 5-4 2-2 5-2 1-5-5 1-2 5-2 2-4ZM8 16l-5 5"/>',
  terminal:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
  edit:'<path d="m16 3 5 5-12 12-6 1 1-6L16 3ZM13 6l5 5"/>',
  trash:'<path d="M3 6h18M8 6V3h8v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  monitor:'<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M12 16v5M7 21h10M7 8h10M7 11h6"/>',
  logs:'<path d="M7 3h12v18H5V5M8 7h8M8 11h8M8 15h6M8 19h8"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  x:'<path d="m6 6 12 12M18 6 6 18"/>',
  send:'<path d="m3 3 19 9-19 9 4-9-4-9ZM7 12h15"/>',
  package:'<path d="m12 3 9 5v9l-9 5-9-5V8l9-5ZM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',
  windows:'<path d="m3 5 8-1v7H3V5ZM14 3.5 22 2v9h-8V3.5ZM3 14h8v7l-8-1v-6ZM14 14h8v9l-8-1.5V14Z"/>',
  power:'<path d="M12 2v10M6 5a9 9 0 1 0 12 0"/>'
};
function icon(name, classes='') { return '<svg class="icon '+classes+'" viewBox="0 0 24 24" aria-hidden="true">'+(paths[name]||paths.info)+'</svg>'; }
function hydrateIcons(root=document) { root.querySelectorAll('[data-icon]').forEach(el=>{ el.innerHTML=icon(el.dataset.icon); }); }
function esc(value) { return String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function integer(value) { return (Number(value)||0).toLocaleString('zh-CN'); }
function yuan(value, precise=false) { const number=Number(value)||0;return '¥'+number.toLocaleString('zh-CN',{minimumFractionDigits:precise&&number<1?4:2,maximumFractionDigits:precise&&number<1?4:2}); }
function duration(seconds) { seconds=Math.max(0,Number(seconds)||0);const d=Math.floor(seconds/86400),h=Math.floor(seconds%86400/3600),m=Math.floor(seconds%3600/60);return d?d+' 天'+(h?' '+h+' 小时':''):h?h+' 小时'+(m?' '+m+' 分':''):m?m+' 分钟':'刚刚'; }
function timeText(date=new Date()) { return new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(date); }
function button(label, action, name='', options={}) {
  return '<button type="button" class="button '+esc(options.variant||'')+'" data-action="'+esc(action)+'"'+(options.port!=null?' data-port="'+esc(options.port)+'"':'')+(options.disabled?' disabled':'')+(options.title?' title="'+esc(options.title)+'"':'')+'>'+(name?icon(name):'')+esc(label)+'</button>';
}
function iconButton(label, action, name, port, classes='') {
  return '<button type="button" class="icon-button '+classes+'" data-action="'+action+'"'+(port!=null?' data-port="'+esc(port)+'"':'')+' aria-label="'+esc(label)+'" title="'+esc(label)+'">'+icon(name)+'</button>';
}
function empty(title, text, name='server') { return '<div class="empty-state"><div class="empty-icon">'+icon(name)+'</div><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></div>'; }
const view=document.getElementById('view'),modal=document.getElementById('modal'),drawer=document.getElementById('drawer');
const state={devices:[],loaded:false,page:'devices',filter:'all',search:'',sort:'status',pageNumber:1,pageSize:20,updated:null,listPromise:null,pins:new Set(),creating:false,modal:null,drawerPort:null,drawerTab:'info',drawerGeneration:0,chatGeneration:0,chatTimer:null,chat:null,chatSearch:'',usage:null,usageGeneration:0};
let toastTimer, pollTimer;
function toast(text,error=false) { const el=document.getElementById('toast');clearTimeout(toastTimer);el.textContent=text;el.className='toast'+(error?' error':'');el.hidden=false;toastTimer=setTimeout(()=>{el.hidden=true;},error?6500:3500); }
function globalError(text='') { const el=document.getElementById('global-error');el.hidden=!text;el.innerHTML=text?esc(text)+' <button type="button" data-action="refresh">重新同步</button>':''; }
function connection(online) { document.getElementById('connection-dot').classList.toggle('online',online);document.getElementById('connection-label').textContent=online?'服务已连接':'连接暂时中断'; }
async function api(path,options={}) {
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),options.timeout||20000);
  try {
    const response=await fetch(path,{method:options.method||'GET',headers:options.body!==undefined?{'Content-Type':'application/json'}:{},body:options.body!==undefined?JSON.stringify(options.body):undefined,signal:controller.signal,cache:'no-store'});
    if(response.status===401){location.replace('/login?next='+encodeURIComponent(location.pathname+location.search));throw new Error('登录已过期');}
    let data;try{data=await response.json();}catch(_){throw new Error('服务响应异常，请稍后重试');}
    if(!response.ok||(!options.allowFailure&&data.ok===false)){const error=new Error(data.msg||data.reply||'请求未成功');error.status=response.status;error.data=data;throw error;}
    return data;
  } catch(error) {
    if(error.name==='AbortError'){const timeout=new Error('请求超时，结果尚未确认，请先核对状态再操作');timeout.uncertain=true;throw timeout;}
    throw error;
  } finally { clearTimeout(timer); }
}
function setTheme(theme) {
  document.documentElement.dataset.theme=theme;
  try{localStorage.setItem('sr-desktop-theme',theme);}catch(_){}
  const control=document.querySelector('[data-action="theme"]');
  if(control){control.querySelector('[data-icon]').innerHTML=icon(theme==='dark'?'moon':'sun');document.getElementById('theme-label').textContent=theme==='dark'?'切换浅色':'切换深色';}
}
function device(port) { return state.devices.find(row=>String(row.port)===String(port)); }
function statusBadge(row) {
  if(row.pending)return '<span class="status-badge pending">待部署</span>';
  return '<span class="status-badge '+(row.online?'online':'')+'">'+(row.online?'在线':'离线')+'</span>';
}
function offlineLabel(row) {
  if(row.online)return row.run==='running'?'运维任务运行中':row.run==='done'?'最近任务已完成':row.run==='failed'?'最近任务失败':'设备已连接';
  if(row.pending)return '剩余 '+Math.max(0,Math.ceil(Number(row.left_sec||0)/60))+' 分钟';
  if(row.never)return '尚未上线';
  if(row.offline_since)return '离线 '+(row.approx?'≥ ':'')+duration(Date.now()/1000-Number(row.offline_since));
  return '暂无最近在线记录';
}
function filteredDevices() {
  let rows=state.devices.filter(row=>(state.filter==='all'||state.filter==='online'&&row.online||state.filter==='offline'&&!row.online&&!row.pending||state.filter==='pending'&&row.pending));
  const search=state.search.trim().toLocaleLowerCase();
  if(search)rows=rows.filter(row=>[row.name,row.node,row.port].some(value=>String(value).toLocaleLowerCase().includes(search)));
  rows.sort((a,b)=>{
    if(a.pinned!==b.pinned)return a.pinned?-1:1;
    if(a.pinned&&b.pinned&&a.pin_idx!==b.pin_idx)return Number(a.pin_idx)-Number(b.pin_idx);
    if(state.sort==='name')return String(a.name).localeCompare(String(b.name),'zh-CN');
    if(state.sort==='port')return Number(a.port)-Number(b.port);
    if(state.sort==='cost')return Number(b.cost_cny||0)-Number(a.cost_cny||0);
    if(state.sort==='created')return String(b.created).localeCompare(String(a.created));
    if(state.sort==='stale'){
      if(a.online!==b.online)return a.online?1:-1;
      return Number(a.offline_since||Infinity)-Number(b.offline_since||Infinity);
    }
    if(a.pending!==b.pending)return a.pending?-1:1;
    if(a.online!==b.online)return a.online?-1:1;
    return String(a.name).localeCompare(String(b.name),'zh-CN');
  });
  return rows;
}
function heading(title,subtitle,actions='') { return '<section class="page-heading"><div><h1>'+esc(title)+'</h1><p>'+esc(subtitle)+'</p></div><div class="heading-actions">'+actions+'</div></section>'; }
function metric(label,value,name,variant,foot) { return '<article class="stat-card"><div class="stat-head"><span>'+esc(label)+'</span><span class="stat-icon '+variant+'">'+icon(name)+'</span></div><div class="stat-value">'+value+'</div><div class="stat-foot">'+foot+'</div></article>'; }
function renderDevices(preserveScroll=true) {
  if(searchComposing)return;
  const focused=document.activeElement,focusId=focused&&focused.id,selection=focused&&focused.selectionStart;
  const oldTable=view.querySelector('.device-panel .data-table-wrap'),tableScroll=preserveScroll&&oldTable?oldTable.scrollTop:0;
  const rows=filteredDevices(),total=state.devices.length,online=state.devices.filter(d=>d.online).length,pending=state.devices.filter(d=>d.pending).length,offline=state.devices.filter(d=>!d.online&&!d.pending).length;
  const pages=Math.max(1,Math.ceil(rows.length/state.pageSize));state.pageNumber=Math.min(state.pageNumber,pages);
  const count=state.loaded?integer(total):'—',value=n=>state.loaded?integer(n):'—';
  let html=heading('设备管理','集中查看设备状态，管理客户交付与远程运维。',button('刷新','refresh','refresh',{variant:'refresh-button'})+button('新建客户','create','plus',{variant:'primary'}));
  html+='<section class="stat-grid" aria-label="设备概况">'+metric('全部设备',count,'server','',state.loaded?'当前在用客户与待部署设备':'正在获取设备数据')+metric('在线设备',value(online),'wifi','green',state.loaded?'<i class="tiny-dot"></i><strong>'+Math.round(total?online/total*100:0)+'%</strong> 的设备已连接':'等待同步')+metric('离线设备',value(offline),'offline','gray','不含待部署设备')+metric('待部署',value(pending),'package','amber','部署链接有效期 30 分钟')+'</section>';
  html+='<section class="panel device-panel"><div class="panel-header"><h2>设备列表 <span class="count-pill">'+(state.loaded?integer(rows.length):'—')+'</span></h2><span class="sync-time">'+icon('clock')+(state.updated?'同步于 '+timeText(state.updated):'正在同步')+'</span></div><div class="toolbar"><div class="status-tabs" aria-label="按状态筛选">';
  for(const [key,label,num] of [['all','全部',total],['online','在线',online],['offline','离线',offline],['pending','待部署',pending]])html+='<button type="button" class="status-tab '+(state.filter===key?'active':'')+'" data-action="filter" data-filter="'+key+'" aria-pressed="'+(state.filter===key)+'">'+label+'<span class="tab-count">'+(state.loaded?num:'—')+'</span></button>';
  html+='</div><div class="toolbar-right"><label class="search-box">'+icon('search')+'<input id="device-search" type="search" placeholder="搜索客户、节点或端口" aria-label="搜索客户、节点或端口" value="'+esc(state.search)+'" autocomplete="off"></label><select id="device-sort" aria-label="设备排序">';
  for(const [key,label] of [['status','在线优先'],['name','按客户名称'],['port','按端口升序'],['cost','按累计费用'],['created','按创建时间'],['stale','离线最久优先']])html+='<option value="'+key+'"'+(state.sort===key?' selected':'')+'>'+label+'</option>';
  html+='</select></div></div>';
  if(!state.loaded)html+=empty('正在同步设备','请稍候，正在连接现有管理服务。','refresh');
  else if(!rows.length)html+=empty(state.devices.length?'没有匹配的设备':'还没有设备',state.devices.length?'试试其他关键词，或调整状态筛选。':'点击「新建客户」生成部署链接。');
  else {
    html+='<div class="data-table-wrap"><table class="data-table"><thead><tr><th scope="col">客户 / 设备</th><th scope="col">连接状态</th><th scope="col">节点 / SSH 端口</th><th scope="col" class="cost-column" title="费用快照每天更新">累计费用 · 每日更新</th><th scope="col" class="created-column">创建日期</th><th scope="col">操作</th></tr></thead><tbody>';
    for(const row of rows.slice((state.pageNumber-1)*state.pageSize,state.pageNumber*state.pageSize)){
      html+='<tr data-device="'+esc(row.port)+'"><td><div class="device-cell"><span class="device-avatar">'+icon('server')+'</span><div><button type="button" class="device-title" data-action="details" data-port="'+esc(row.port)+'" title="'+esc(row.name)+'">'+esc(row.name)+'</button><div class="device-subtitle">'+(row.pinned?icon('pin')+'已置顶 · ':'')+(row.screen===true?'支持屏显控制':'远程运维设备')+'</div></div></div></td><td>'+statusBadge(row)+(row.run==='running'?'<span class="status-badge running">运行中</span>':'')+'<div class="cell-sub">'+esc(offlineLabel(row))+'</div></td><td><div class="node-code">节点 '+esc(row.node)+'</div><div class="cell-sub mono">:'+esc(row.port)+'</div></td><td class="cost-column"><div class="cost-value">'+yuan(row.cost_cny,true)+'</div><div class="cell-sub">'+integer(row.cost_tokens)+' token · '+integer(row.cost_calls)+' 次</div></td><td class="created-column"><span class="cell-sub">'+esc(row.created||'—')+'</span></td><td><div class="row-actions"><button type="button" class="link-button" data-action="chat" data-port="'+esc(row.port)+'">'+icon('message')+'对话</button>'+(row.pending?iconButton('查看部署码','code','package',row.port):iconButton(row.pinned?'取消置顶':'置顶设备','pin','pin',row.port,row.pinned?'pinned':''))+iconButton('查看设备详情和操作','details','more',row.port)+'</div></td></tr>';
    }
    html+='</tbody></table></div>';
  }
  html+='<div class="table-footer"><span>'+(rows.length?'显示 '+((state.pageNumber-1)*state.pageSize+1)+'–'+Math.min(state.pageNumber*state.pageSize,rows.length)+' 条，共 '+rows.length+' 台设备':'共 0 台设备')+'</span><div class="pager">'+pageButton(state.pageNumber-1,'上一页','chevron-left',state.pageNumber===1);
  for(let page=1;page<=pages;page++)html+='<button type="button" class="page-button '+(page===state.pageNumber?'active':'')+'" data-action="page" data-page="'+page+'" aria-label="第 '+page+' 页"'+(page===state.pageNumber?' aria-current="page"':'')+'>'+page+'</button>';
  html+=pageButton(state.pageNumber+1,'下一页','chevron-right',state.pageNumber===pages)+'</div></div></section>';
  view.innerHTML=html;
  const newTable=view.querySelector('.device-panel .data-table-wrap');if(newTable)newTable.scrollTop=tableScroll;
  if(focusId){const input=document.getElementById(focusId);if(input){input.focus({preventScroll:true});if(selection!=null&&input.setSelectionRange)try{input.setSelectionRange(selection,selection);}catch(_){}}}
}
function pageButton(page,label,name,disabled) { return '<button type="button" class="page-button" data-action="page" data-page="'+page+'" aria-label="'+label+'"'+(disabled?' disabled':'')+'>'+icon(name)+'</button>'; }
async function loadDevices(manual=false) {
  if(state.listPromise)return state.listPromise;
  state.listPromise=(async()=>{
    try{
      const result=await api('/api/list');
      if(!Array.isArray(result.items))throw new Error('设备列表格式异常');
      state.devices=result.items.filter(row=>Number.isInteger(row.port)&&row.port>0&&row.port<=65535);
      state.loaded=true;state.updated=new Date();connection(true);globalError();
      document.getElementById('nav-count').textContent=state.devices.length;
      if(state.page==='devices')renderDevices();
      else if(state.page==='chat')renderChatDevices();
      if(manual)toast('设备状态已更新');
    }catch(error){connection(false);globalError('同步失败：'+error.message+'。已显示的数据会保留。');if(manual)toast(error.message,true);}
    finally{state.listPromise=null;}
  })();
  return state.listPromise;
}
async function pollDevices() {
  if(!document.hidden)await loadDevices();
  pollTimer=setTimeout(pollDevices,state.devices.some(row=>row.run==='running')?5000:20000);
}
function navigate(page,port=null,push=true) {
  searchComposing=false;composing=false;
  const path=page==='chat'?'/chat'+(port?'?port='+encodeURIComponent(port):''):page==='usage'?'/usage':'/';
  if(push)history.pushState({},'',path);
  clearTimeout(state.chatTimer);state.chatGeneration++;state.usageGeneration++;
  state.page=page;state.chat=null;closeDrawer();if(modal.open)modal.close();
  const label={devices:'设备管理',chat:'运维对话',usage:'用量统计'}[page];
  document.title=label+' · SUNIP 控制台';document.getElementById('breadcrumb-title').textContent=label;
  document.querySelectorAll('[data-nav]').forEach(el=>{const selected=el.dataset.nav===page;el.classList.toggle('active',selected);if(selected)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
  if(page==='devices')renderDevices();
  else if(page==='chat'){renderChat();if(port)selectChat(port);}
  else renderUsage();
}
function routeFromLocation() { const page=location.pathname==='/chat'?'chat':location.pathname==='/usage'?'usage':'devices';navigate(page,new URLSearchParams(location.search).get('port'),false); }


let drawerFocus=null;
function closeDrawer() {
  if(!state.drawerPort)return;
  state.drawerGeneration++;state.drawerPort=null;
  drawer.hidden=true;document.getElementById('drawer-backdrop').hidden=true;
  if(drawerFocus&&document.contains(drawerFocus))drawerFocus.focus({preventScroll:true});
}
async function openDrawer(port,tab='info') {
  const row=device(port);if(!row){toast('这台设备不在当前列表中',true);return;}
  if(!state.drawerPort)drawerFocus=document.activeElement;
  state.drawerPort=String(port);state.drawerTab=tab;const generation=++state.drawerGeneration;
  drawer.hidden=false;document.getElementById('drawer-backdrop').hidden=false;
  drawer.innerHTML='<div class="drawer-header"><div><h2>'+esc(row.name)+'</h2>'+statusBadge(row)+'<div class="cell-sub">节点 '+esc(row.node)+' · 端口 '+esc(row.port)+'</div></div>'+iconButton('关闭设备详情','close-drawer','x')+'</div><div class="drawer-tabs" role="tablist"><button type="button" class="drawer-tab '+(tab==='info'?'active':'')+'" data-action="drawer-tab" data-tab="info" role="tab" aria-selected="'+(tab==='info')+'">设备概览</button><button type="button" class="drawer-tab '+(tab==='logs'?'active':'')+'" data-action="drawer-tab" data-tab="logs" role="tab" aria-selected="'+(tab==='logs')+'">操作日志</button></div><div class="drawer-body" id="drawer-body">'+empty('正在读取','请稍候…','refresh')+'</div><div class="drawer-footer">'+button('进入运维对话','chat','message',{port,variant:'primary'})+button('复制 SSH 命令','ssh','terminal',{port})+'</div>';
  drawer.querySelector('[data-action="close-drawer"]').focus({preventScroll:true});
  try {
    if(tab==='logs'){
      const result=await api('/api/logs?port='+encodeURIComponent(port));if(generation!==state.drawerGeneration)return;
      document.getElementById('drawer-body').innerHTML=result.items&&result.items.length?result.items.map(log=>'<article class="log-entry"><div class="log-head"><span>'+esc(log.action)+'</span><time>'+esc(log.iso)+'</time></div><div class="log-actor">'+esc(log.actor)+'</div><div class="log-detail">'+esc(log.detail)+'</div></article>').join(''):empty('暂无操作记录','这台设备的操作日志会显示在这里。','logs');
    } else {
      const result=await api('/api/info?port='+encodeURIComponent(port));if(generation!==state.drawerGeneration)return;
      let html='<div class="detail-group"><h3 class="detail-label">设备信息</h3>'+keyValues([['客户名称',result.name],['节点 / 端口',result.node+' / '+result.port],['当前状态',result.status_text],['创建日期',result.created||'—'],['最近在线',result.last_online||'暂无记录'],['台账状态',result.state==='active'?'在用':result.state]])+'</div>';
      html+='<div class="detail-group"><h3 class="detail-label">用量与交付</h3>'+keyValues([['累计花费',result.cost_text],['使用线路',result.cost_lines||'暂无记录'],['统计更新',result.cost_updated||'—'],['交付文件',result.package?'已生成':'未生成'],['部署码',result.code?'存在部署码记录':'无部署码记录']])+'</div>';
      html+='<div class="detail-group"><h3 class="detail-label">连接信息</h3>'+keyValues([['SSH 主机',result.site],['SSH 端口',result.ssh_port],['隧道代理',result.proxy]])+'</div>';
      if(result.note)html+='<div class="detail-group"><h3 class="detail-label">台账备注</h3><div class="notice">'+esc(result.note)+'</div></div>';
      html+='<div class="operation-buttons">'+button(row.pinned?'取消置顶':'置顶设备','pin','pin',{port})+button('修改名称','rename','edit',{port})+(row.pending?button('查看部署码','code','package',{port}):'')+(row.screen===true?button('屏显与灯控','screen','monitor',{port}):'')+button('删除客户','retire','trash',{port,variant:'danger-text'})+'</div>';
      document.getElementById('drawer-body').innerHTML=html;
    }
  } catch(error){if(generation===state.drawerGeneration)document.getElementById('drawer-body').innerHTML=empty('暂时无法读取',error.message,'info');}
}
function keyValues(rows) { return '<dl class="key-value">'+rows.map(([key,value])=>'<dt>'+esc(key)+'</dt><dd>'+esc(value==null?'—':value)+'</dd>').join('')+'</dl>'; }
let modalSequence=0;
function showModal(options) {
  state.modal=Object.assign({id:++modalSequence,busy:false},options);
  const header='<div class="modal-header"><div><h2>'+esc(options.title)+'</h2><p>'+esc(options.description||'')+'</p></div>'+iconButton('关闭弹窗','close-modal','x')+'</div>';
  document.getElementById('modal-content').innerHTML=header+(options.form?'<form data-form="'+options.form+'">':'<div>')+'<div class="modal-body">'+options.body+'<div id="modal-error" class="form-error" role="alert" aria-live="polite"></div></div><div class="modal-footer">'+(options.footer||button('关闭','close-modal'))+'</div>'+(options.form?'</form>':'</div>');
  if(!modal.open)modal.showModal();
  const focus=modal.querySelector('input:not([type="radio"]),textarea')||modal.querySelector('[data-action="close-modal"]');if(focus)focus.focus({preventScroll:true});
  return state.modal;
}
function submitButton(label,name='check',variant='primary') { return '<button type="submit" class="button '+variant+'">'+icon(name)+esc(label)+'</button>'; }
function modalError(text) { const el=document.getElementById('modal-error');if(el)el.textContent=text; }
function modalBusy(busy) {
  if(!state.modal)return;
  state.modal.busy=busy;
  modal.querySelectorAll('input,select,textarea,button[type="submit"],button[data-action="screen-mode"],button[data-action="lamp"]').forEach(el=>{el.disabled=busy;});
}
function openCreate() {
  if(state.creating){showModal({type:'create',waiting:true,title:'正在创建客户',description:'创建请求仍在后台处理中',body:'<div class="notice">正在登记客户并核对部署文件，请勿重复创建。完成后将提示结果；关闭窗口不会取消已提交的请求。</div>'});return;}
  const context=showModal({type:'create',title:'新建客户',description:'生成设备部署命令与限时交付链接',form:'create',body:'<div class="segment-options"><label class="segment-option"><input type="radio" name="kind" value="wget" checked><span>'+icon('server')+'软路由 / Linux</span></label><label class="segment-option"><input type="radio" name="kind" value="winrm"><span>'+icon('windows')+'Windows / WinRM</span></label></div><div class="field"><label class="field-label" for="customer-name">客户名称</label><input id="customer-name" name="name" required maxlength="24" placeholder="为这台设备设置一个容易辨认的名称" autocomplete="off"><p class="field-note">1–24 字，不能包含换行、制表符或竖线。</p></div><div id="pool-notice" class="notice" style="margin-top:19px">正在读取端口池…</div>',footer:button('取消','close-modal')+submitButton('创建并生成部署码','plus')});
  api('/api/pool').then(result=>{if(state.modal===context)document.getElementById('pool-notice').textContent='端口池 '+result.min+'–'+result.max+' · 可分配 '+result.free+' 个。历史端口保留，不重复分配。';}).catch(error=>{if(state.modal===context)document.getElementById('pool-notice').textContent='端口池读取失败：'+error.message;});
}
async function createCustomer(form) {
  if(state.creating||!form.reportValidity())return;
  const values=new FormData(form),name=String(values.get('name')||'').trim(),kind=String(values.get('kind'));
  if(!validCustomerName(name))return;
  state.creating=true;const context=state.modal;modalBusy(true);modalError('正在创建，请勿重复提交…');
  let result,error;
  try{result=await api('/api/create',{method:'POST',body:{name,kind},timeout:360000});}
  catch(failure){error=failure;}
  finally{state.creating=false;}
  if(error){
    if(state.modal&&state.modal.type==='create'){if(state.modal!==context)openCreate();modalBusy(false);modalError(error.message);}
    else toast('创建结果：'+error.message,true);
    return;
  }
  if(state.modal&&state.modal.type==='create')showDeployment(result,result.port,'客户创建成功');
  toast('客户已创建，部署链接有效期 30 分钟');await loadDevices();
}
function validCustomerName(value) { if(!value||value.length>24||/[\u0000-\u001f\u007f|]/.test(value)){modalError('名称须为 1–24 字，不能含换行、制表符或竖线');return false;}return true; }
function showDeployment(result,port,title='设备部署码') {
  const row=device(port),name=result.name||(row&&row.name)||'设备';
  let body='<div class="notice success">请在目标设备上运行下方命令。交付链接含访问凭证，请妥善保管。</div><pre class="code-block" id="copy-code">'+esc(result.cmd||'')+'</pre><div class="detail-group" style="margin-top:20px">'+keyValues([['客户名称',name],['部署类型',result.kind==='winrm'?'Windows / WinRM':'软路由 / Linux'],['设备端口',port],['部署码',result.code||'—'],['剩余时效',result.left_text||'30 分钟'],['下载链接',result.link||'—']])+'</div>';
  if(result.warning)body+='<div class="notice warning" style="margin-top:16px">'+esc(result.warning)+'</div>';
  showModal({type:'code',port,title,description:'端口 '+port+' · '+name,body,footer:button('关闭','close-modal')+button('复制部署命令','copy-code','copy',{variant:'primary'})});
}
async function showCode(port) {
  const context=showModal({type:'code',port,title:'设备部署码',description:'端口 '+port,body:empty('正在读取部署码','请稍候…','package')});
  try{const result=await api('/api/code?port='+encodeURIComponent(port));if(state.modal===context)showDeployment(result,port);}
  catch(error){if(state.modal===context)modalError(error.message);}
}
async function showSSH(port) {
  const row=device(port),context=showModal({type:'ssh',port,title:'SSH 连接命令',description:(row?row.name+' · ':'')+'端口 '+port,body:empty('正在读取连接信息','请稍候…','terminal')});
  try {
    const result=await api('/api/ssh?port='+encodeURIComponent(port));if(state.modal!==context)return;
    showModal({type:'ssh',port,title:'SSH 连接命令',description:(row?row.name+' · ':'')+'端口 '+port,body:'<div class="notice">复制命令后，在本机终端中连接设备。'+(result.has_pw?'命令包含设备口令，请妥善保管。':'')+'</div><pre class="code-block" id="copy-code">'+esc(result.cmd)+'</pre>'+(result.note?'<p class="field-note">'+esc(result.note)+'</p>':''),footer:button('关闭','close-modal')+button('复制命令','copy-code','copy',{variant:'primary'})});
  } catch(error){if(state.modal===context)modalError(error.message);}
}
function openRename(port) {
  const row=device(port);if(!row)return;
  showModal({type:'rename',port,title:'修改客户名称',description:'节点 '+row.node+' · 端口 '+port,form:'rename',body:'<div class="field"><label class="field-label" for="rename-name">客户名称</label><input id="rename-name" name="name" value="'+esc(row.name)+'" required maxlength="24" autocomplete="off"><p class="field-note">客户名称调整后，会同步更新设备列表。</p></div>',footer:button('取消','close-modal')+submitButton('保存名称')});
}
async function renameCustomer(form) {
  const context=state.modal;if(!context||context.busy||!form.reportValidity())return;
  const name=String(new FormData(form).get('name')||'').trim();if(!validCustomerName(name))return;
  modalBusy(true);modalError('');
  try{await api('/api/rename',{method:'POST',body:{port:context.port,name}});if(state.modal===context)modal.close();toast('客户名称已更新');await loadDevices();if(state.drawerPort===String(context.port))openDrawer(context.port);}
  catch(error){if(state.modal===context){modalError(error.message);modalBusy(false);}else toast(error.message,true);}
}
function openRetire(port) {
  const row=device(port);if(!row)return;
  showModal({type:'retire',port,title:'删除客户',description:'节点 '+row.node+' · 端口 '+port,form:'retire',body:'<p style="margin:0 0 16px;font-size:13px">确认删除「<strong>'+esc(row.name)+'</strong>」？</p><div class="notice warning">'+(row.online?'这台设备当前在线。':'')+'删除后，该客户会从设备列表隐藏。历史端口会保留，不会分给其他客户。</div>',footer:button('取消','close-modal')+submitButton('确认删除','trash','danger')});
}
async function retireCustomer() {
  const context=state.modal;if(!context||context.busy)return;modalBusy(true);modalError('');
  try{await api('/api/retire',{method:'POST',body:{port:context.port},timeout:60000});if(state.modal===context)modal.close();if(state.drawerPort===String(context.port))closeDrawer();toast('客户已标记删除');await loadDevices();}
  catch(error){if(state.modal===context){modalError(error.message);modalBusy(false);}else toast(error.message,true);}
}
async function togglePin(port) {
  if(state.pins.has(String(port)))return;state.pins.add(String(port));
  try{const result=await api('/api/pin',{method:'POST',body:{port}});toast(result.pinned?'设备已置顶':'已取消置顶');await loadDevices();if(state.drawerPort===String(port))openDrawer(port,state.drawerTab);}
  catch(error){toast(error.message,true);}
  finally{state.pins.delete(String(port));}
}
async function copyCode() {
  const pre=document.getElementById('copy-code');if(!pre||!pre.textContent)return;
  try{await navigator.clipboard.writeText(pre.textContent);toast('命令已复制');}
  catch(_){const range=document.createRange();range.selectNodeContents(pre);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);toast('未能自动复制，已选中命令，请使用 Ctrl+C',true);}
}
function selectOptions(value,start,end) { let html='';for(let i=start;i<=end;i++)html+='<option value="'+i+'"'+(String(value)===String(i)?' selected':'')+'>'+i+'</option>';return html; }
async function showScreen(port) {
  const row=device(port),context=showModal({type:'screen',port,title:'屏显与指示灯',description:(row?row.name+' · ':'')+'端口 '+port,body:empty('正在读取设备','读取过程不会修改设备设置。','monitor')});
  try {
    const result=await api('/api/screen?port='+encodeURIComponent(port),{timeout:60000});if(state.modal!==context)return;
    if(!result.has){document.querySelector('#modal .modal-body').innerHTML=empty('这台设备没有可控屏幕','设备型号：'+(result.model||'未知')+'。目前支持带 athena_led 屏显服务的雅典娜机型。','monitor');return;}
    const normal=String(result.option||'').includes('date')||String(result.option||'').includes('time');
    let body='<div class="notice '+(result.is_off?'warning':'')+'">当前状态：'+(result.is_off?'已关屏':normal?'时间与日期':'自定义文字')+' · 亮度 '+esc(result.light)+' · 服务进程 '+esc(result.running)+' 个</div><div class="field" style="margin-top:20px"><label class="field-label" for="screen-text">屏显文字</label><input id="screen-text" name="text" value="'+esc(result.value||'')+'" maxlength="64" placeholder="例如 HELLO WORLD" required><p class="field-note">支持英文、数字及部分符号，最多 64 字；不支持中文。</p></div><div class="modal-row" style="margin-top:18px"><div class="field"><label class="field-label" for="screen-seconds">滚动间隔 / 秒</label><select id="screen-seconds" name="seconds">'+selectOptions(result.seconds||3,1,5)+'</select></div><div class="field"><label class="field-label" for="screen-light">屏幕亮度</label><select id="screen-light" name="light">'+selectOptions(result.light==null||result.light===''?5:result.light,0,7)+'</select></div></div>';
    body+='<div class="mode-grid"><button type="button" class="mode-button '+(normal&&!result.is_off?'selected':'')+'" data-action="screen-mode" data-mode="on">'+icon('clock')+'<span>正常显示<small>恢复时间与日期</small></span></button><button type="button" class="mode-button '+(result.is_off?'selected':'')+'" data-action="screen-mode" data-mode="off">'+icon('moon')+'<span>关闭屏幕<small>保持配置，熄灭屏幕</small></span></button></div><div class="screen-section"><label class="field-label">RGB 状态指示灯</label><div id="lamp-controls" class="field-note">正在读取指示灯…</div></div>';
    const current=showModal({type:'screen',port,title:'屏显与指示灯',description:(row?row.name+' · ':'')+'端口 '+port,form:'screen',body,footer:button('重新读取','screen','refresh',{port})+submitButton('显示这句文字','monitor')});
    loadLamp(port,current);
  } catch(error){if(state.modal===context)modalError(error.message);}
}
async function loadLamp(port,context) {
  try {
    const result=await api('/api/lamp?port='+encodeURIComponent(port),{timeout:50000});if(state.modal!==context)return;
    const modes=[['blue','蓝色','#5a8af4'],['green','绿色','#38b68c'],['red','红色','#e76c79'],['all','全亮','#c8cad5'],['off','关灯','#8895ab']];
    document.getElementById('lamp-controls').innerHTML='<div class="lamp-row">'+modes.map(([mode,label,color])=>'<button type="button" class="lamp-button '+(result.mode===mode?'selected':'')+'" data-action="lamp" data-mode="'+mode+'" aria-pressed="'+(result.mode===mode)+'"><i class="lamp-swatch" style="--swatch:'+color+'"></i>'+label+'</button>').join('')+'</div><p class="field-note">指示灯设置会保存在设备上，重启后保持。</p>';
  }catch(error){if(state.modal===context)document.getElementById('lamp-controls').textContent='指示灯读取失败：'+error.message;}
}
async function applyScreen(mode,form) {
  const context=state.modal;if(!context||context.type!=='screen'||context.busy)return;
  let body={port:context.port};
  if(mode)body.mode=mode;else {
    if(!form.reportValidity())return;
    const values=new FormData(form);body=Object.assign(body,{text:values.get('text'),seconds:values.get('seconds'),light:values.get('light')});
  }
  modalBusy(true);modalError('正在写入设备并回读核对，请勿重复操作…');
  try{await api('/api/screen',{method:'POST',body,timeout:100000});toast('屏显设置已由设备回读确认');if(state.modal===context)showScreen(context.port);}
  catch(error){if(state.modal===context){modalError(error.message);modalBusy(false);}else toast(error.message,true);}
}
async function applyLamp(mode) {
  const context=state.modal;if(!context||context.type!=='screen'||context.busy)return;
  modalBusy(true);modalError('正在设置指示灯并核对…');
  try{await api('/api/lamp',{method:'POST',body:{port:context.port,mode},timeout:100000});toast('指示灯设置已确认');if(state.modal===context){modalBusy(false);modalError('');await loadLamp(context.port,context);}}
  catch(error){if(state.modal===context){modalError(error.message);modalBusy(false);}else toast(error.message,true);}
}


state.chatDrafts=new Map();
function renderChat() {
  view.innerHTML=heading('运维对话','选择设备，查看历史记录并继续远程运维。',button('刷新记录','refresh-chat','refresh'))+'<section class="chat-layout"><aside class="chat-devices" aria-label="选择运维设备"><div class="chat-device-header"><strong>设备 <span class="count-pill">'+state.devices.length+'</span></strong><label class="search-box">'+icon('search')+'<input id="chat-device-search" type="search" placeholder="搜索设备" aria-label="搜索运维设备" value="'+esc(state.chatSearch)+'"></label></div><div id="chat-device-list" class="chat-device-list"></div></aside><section id="chat-pane" class="chat-pane" aria-label="设备运维对话">'+empty('选择一台设备','从左侧选择设备，查看历史记录并开始对话。','message')+'</section></section>';
  renderChatDevices();
}
function renderChatDevices() {
  const list=document.getElementById('chat-device-list');if(!list)return;
  const query=state.chatSearch.trim().toLocaleLowerCase();
  const rows=state.devices.filter(row=>!query||[row.name,row.node,row.port].some(value=>String(value).toLocaleLowerCase().includes(query))).slice().sort((a,b)=>Number(b.online)-Number(a.online)||String(a.name).localeCompare(String(b.name),'zh-CN'));
  list.innerHTML=rows.length?rows.map(row=>'<button type="button" class="chat-device '+(state.chat&&String(row.port)===state.chat.port?'selected':'')+'" data-action="select-chat" data-port="'+esc(row.port)+'" aria-label="选择 '+esc(row.name)+'，端口 '+esc(row.port)+'"><span class="device-avatar">'+icon('server')+'<i class="device-presence '+(row.online?'online':'')+'"></i></span><span><strong>'+esc(row.name)+'</strong><small>节点 '+esc(row.node)+' · :'+esc(row.port)+'</small></span></button>').join(''):empty('没有匹配设备','试试其他关键词。','search');
}
async function selectChat(port) {
  const row=device(port);if(!row){toast('这台设备不在当前在用客户列表中',true);return;}
  composing=false;
  if(state.chat)state.chatDrafts.set(state.chat.port,state.chat.draft);
  clearTimeout(state.chatTimer);const generation=++state.chatGeneration;
  const chat=state.chat={port:String(port),row,busy:true,loading:true,messages:[],systems:[],draft:state.chatDrafts.get(String(port))||'',status:'正在恢复对话和任务状态…',started:0};
  history.replaceState({},'','/chat?port='+encodeURIComponent(port));
  renderChatDevices();renderChatPane();
  try {
    const [historyResult,active]=await Promise.all([api('/api/chat/history?port='+encodeURIComponent(port)),api('/api/chat/active?port='+encodeURIComponent(port))]);
    if(generation!==state.chatGeneration)return;
    chat.messages=Array.isArray(historyResult.items)?historyResult.items:[];chat.loading=false;chat.busy=!!active.job;chat.status=active.job?'正在继续跟踪后台任务…':'';chat.started=Number(active.started)||Date.now()/1000;
    renderChatPane();
    api('/api/chat/seen',{method:'POST',body:{port}}).catch(()=>{});
    if(active.job)watchChat(active.job,generation);
  } catch(error) {
    if(generation!==state.chatGeneration)return;
    chat.loading=false;chat.busy=true;chat.status='无法确认后台任务状态，请点击「刷新记录」重试。';
    chat.systems.push(error.message);renderChatPane();
  }
}
function renderChatPane() {
  const pane=document.getElementById('chat-pane'),chat=state.chat;if(!pane||!chat)return;
  pane.innerHTML='<header class="chat-header"><div><h2>'+esc(chat.row.name)+' '+statusBadge(chat.row)+'</h2><div class="cell-sub">节点 '+esc(chat.row.node)+' · 端口 '+esc(chat.port)+'</div></div><div class="chat-header-right">'+button('设备详情','details','info',{port:chat.port,variant:'small'})+'<button type="button" class="button small" data-action="clear-chat"'+(chat.busy?' disabled':'')+'>'+icon('trash')+'清空记录</button></div></header><div id="chat-messages" class="chat-messages" role="log" aria-label="聊天记录"></div><div id="chat-status" class="chat-status" role="status"'+(!chat.status?' hidden':'')+'>'+icon('refresh','spin')+'<span>'+esc(chat.status)+'</span></div><form id="chat-form" class="chat-composer"><label class="skip-link" for="chat-input">向当前设备发送运维需求</label><textarea id="chat-input" placeholder="'+(chat.loading?'正在恢复任务状态…':'描述要查询或处理的问题…')+'" rows="2"'+(chat.loading?' disabled':'')+'>'+esc(chat.draft)+'</textarea><div class="composer-footer"><span id="composer-hint" class="composer-hint">'+(chat.busy?'任务处理中，可继续编辑草稿':'Enter 发送 · Shift+Enter 换行')+'</span><button id="chat-send" type="submit" class="button primary"'+(chat.busy?' disabled':'')+'>'+icon('send')+'发送</button></div></form>';
  renderChatMessages(true);
}
function messageHTML(message) {
  const user=message.role==='user',usage=message.usage||{},logs=Array.isArray(message.log)?message.log:[];
  let content='<div>'+esc(message.text||'')+'</div>';
  if(logs.length)content+='<details class="command-log"><summary>查看执行记录 · '+logs.length+' 条</summary>'+logs.map(log=>'<div class="command-item"><strong class="'+(log.ok?'':'failed')+'">'+(log.ok?'执行成功':'未确认成功')+'</strong><pre>$ '+esc(log.cmd)+'</pre><pre>'+esc(log.out||'（无输出）')+'</pre></div>').join('')+'</details>';
  const stamp=message.ts?timeText(new Date(Number(message.ts)*1000)):'';
  return '<article class="chat-message '+(user?'user':'assistant')+'"><span class="message-avatar">'+icon(user?'user':'activity')+'</span><div class="message-content"><div class="message-meta">'+(user?'你':'运维助手')+(stamp?' · '+stamp:'')+'</div><div class="message-bubble">'+content+'</div>'+(!user&&usage.calls?'<div class="message-usage">'+esc((usage.lines||[]).join(' / '))+' · 输入 '+integer(usage.in)+' / 输出 '+integer(usage.out)+' token · '+yuan(usage.cost_cny,true)+'</div>':'')+'</div></article>';
}
function renderChatMessages(forceScroll=false) {
  const box=document.getElementById('chat-messages'),chat=state.chat;if(!box||!chat)return;
  const near=box.scrollHeight-box.scrollTop-box.clientHeight<150,previous=box.scrollTop;
  box.innerHTML=chat.messages.map(messageHTML).join('')+chat.systems.map(text=>'<div class="chat-system">'+esc(text)+'</div>').join('');
  if(!chat.messages.length&&!chat.systems.length)box.innerHTML='<div class="chat-system">'+(chat.loading?'正在读取历史记录…':'还没有对话。可以直接说明要查询的状态或要处理的问题。')+'</div>';
  if(forceScroll||near)box.scrollTop=box.scrollHeight;else box.scrollTop=previous;
}
function updateChatState() {
  const chat=state.chat;if(!chat)return;
  const status=document.getElementById('chat-status'),send=document.getElementById('chat-send'),clear=view.querySelector('[data-action="clear-chat"]'),hint=document.getElementById('composer-hint');
  if(status){status.hidden=!chat.status;status.querySelector('span').textContent=chat.status;}
  if(send)send.disabled=chat.busy||chat.loading;
  if(clear)clear.disabled=chat.busy||chat.loading;
  if(hint)hint.textContent=chat.busy?'任务处理中，可继续编辑草稿':'Enter 发送 · Shift+Enter 换行';
}
async function watchChat(job,generation) {
  if(generation!==state.chatGeneration||!state.chat)return;
  const chat=state.chat;
  try {
    const result=await api('/api/chat/job?id='+encodeURIComponent(job),{allowFailure:true,timeout:15000});
    if(generation!==state.chatGeneration)return;
    if(result.done){
      if(result.ok===false){chat.systems.push(result.reply||'任务记录不可用，请先核对设备状态。');}
      try {
        const historyResult=await api('/api/chat/history?port='+encodeURIComponent(chat.port));
        if(generation!==state.chatGeneration)return;
        chat.messages=Array.isArray(historyResult.items)?historyResult.items:chat.messages;
        if(result.ok!==false&&result.reply&&(!chat.messages.length||chat.messages[chat.messages.length-1].text!==result.reply))chat.messages.push({role:'ai',text:result.reply,log:result.log,usage:result.usage,ts:Date.now()/1000});
      }catch(error){if(generation!==state.chatGeneration)return;if(result.reply&&result.ok!==false)chat.messages.push({role:'ai',text:result.reply,log:result.log,usage:result.usage});chat.systems.push('历史同步失败：'+error.message);}
      chat.busy=false;chat.status='';renderChatMessages();updateChatState();loadDevices();return;
    }
    const elapsed=Math.max(0,Math.floor(Date.now()/1000-chat.started));
    chat.status=(result.step||'后台处理中')+' · 已等待 '+duration(elapsed)+(elapsed>480?'；执行结果尚未确认，请勿重复发送':'');
  }catch(error){if(generation!==state.chatGeneration)return;chat.status='连接暂时中断，正在继续查询任务状态，请勿重复发送。';}
  updateChatState();
  state.chatTimer=setTimeout(()=>watchChat(job,generation),1500);
}
async function sendChat() {
  const chat=state.chat,input=document.getElementById('chat-input');if(!chat||chat.busy||chat.loading||!input)return;
  const text=input.value.trim();if(!text)return;
  const generation=state.chatGeneration;chat.draft=input.value;chat.busy=true;chat.status='正在提交并确认任务…';updateChatState();
  try {
    const result=await api('/api/chat',{method:'POST',body:{port:chat.port,text,name:chat.row.name},timeout:15000});if(generation!==state.chatGeneration)return;
    chat.messages.push({role:'user',text,ts:Date.now()/1000});if(chat.draft.trim()===text){chat.draft='';input.value='';state.chatDrafts.delete(chat.port);}
    chat.started=Date.now()/1000;renderChatMessages(true);watchChat(result.job,generation);
  }catch(error){
    if(generation!==state.chatGeneration)return;
    if(error.status===409&&error.data&&error.data.job){chat.status=error.message;chat.started=Date.now()/1000;updateChatState();watchChat(error.data.job,generation);return;}
    if(error.status&&error.status<500){chat.busy=false;chat.status='';chat.systems.push(error.message);renderChatMessages();updateChatState();return;}
    chat.systems.push('提交结果尚未确认，正在重新读取后台记录；请核对后再操作。');renderChatMessages();
    await recoverChat(generation);
  }
}
async function recoverChat(generation) {
  if(generation!==state.chatGeneration||!state.chat)return;
  const chat=state.chat;
  try {
    const result=await api('/api/chat/active?port='+encodeURIComponent(chat.port));if(generation!==state.chatGeneration)return;
    if(result.job){chat.started=Number(result.started)||Date.now()/1000;watchChat(result.job,generation);return;}
    const historyResult=await api('/api/chat/history?port='+encodeURIComponent(chat.port));if(generation!==state.chatGeneration)return;
    chat.messages=historyResult.items||chat.messages;chat.busy=false;chat.status='';renderChatMessages();updateChatState();
  }catch(error){if(generation!==state.chatGeneration)return;chat.status='尚未确认后台状态，正在继续查询，请勿重复发送。';updateChatState();state.chatTimer=setTimeout(()=>recoverChat(generation),3000);}
}
function openClearChat() {
  const chat=state.chat;if(!chat||chat.busy)return;
  showModal({type:'clear-chat',port:chat.port,title:'清空聊天记录',description:chat.row.name,form:'clear-chat',body:'<div class="notice warning">确认清空这台设备的聊天记录？设备配置不会随聊天记录一起删除。</div>',footer:button('取消','close-modal')+submitButton('确认清空','trash','danger')});
}
async function clearChat() {
  const context=state.modal;if(!context||context.busy)return;modalBusy(true);
  try {
    await api('/api/chat/clear',{method:'POST',body:{port:context.port}});
    if(state.modal===context)modal.close();
    if(state.chat&&state.chat.port===String(context.port)){state.chat.messages=[];state.chat.systems=['聊天记录已清空'];renderChatMessages(true);}
    toast('聊天记录已清空');
  }catch(error){if(state.modal===context){modalBusy(false);modalError(error.message);}else toast(error.message,true);}
}
function usageBars(rows) {
  if(!rows.length)return '<div class="notice">暂无用量记录</div>';
  const maximum=Math.max(0.000001,...rows.map(row=>Number(row.cost)||0));
  return rows.map((row,index)=>'<div class="usage-line"><div class="usage-line-head"><div>'+esc(row.name)+'<br><span>'+integer(row.calls)+' 次 · '+integer(row.tokens)+' token</span></div><strong>'+yuan(row.cost,true)+'</strong></div><div class="usage-track"><div class="usage-fill '+(index%2?'secondary':'')+'" style="width:'+Math.max(1,Number(row.cost||0)/maximum*100)+'%"></div></div></div>').join('');
}
function usageContent(data) {
  const grand=data.grand||{},panel=data.panel||{},system=data.sys_total||{},rate=Number(data.rate)||0;
  let html='<section class="stat-grid" aria-label="累计用量">'+metric('累计总花费',yuan(grand.cost_cny),'chart','','人民币折算汇率：1 USD = '+esc(rate))+metric('累计 token',integer(grand.tokens),'activity','green',integer(grand.calls)+' 次模型调用')+metric('面板与脚本',yuan(panel.cost_cny),'message','',integer(panel.tokens)+' token · '+integer(panel.calls)+' 次调用')+metric('系统任务',yuan(system.cost_cny),'server','gray',integer(system.tokens)+' token · '+integer(system.calls)+' 次调用')+'</section>';
  const lines=Object.entries(data.by_line||{}).map(([name,value])=>({name:'面板 · '+name,cost:Number(value.cost_cny)||0,calls:value.calls,tokens:value.tokens}));
  for(const model of data.sys||[])lines.push({name:'系统 · '+model.model,cost:Number(model.cost_usd||0)*rate,calls:model.calls,tokens:model.tokens});
  lines.sort((a,b)=>b.cost-a.cost);
  const days={};for(const [day,value] of Object.entries(data.by_day||{}))days[day]=Number(value.cost_cny)||0;
  for(const row of data.sys_daily||[])days[row.day]=(days[row.day]||0)+Number(row.cost_usd||0)*rate;
  const recent=Object.entries(days).sort(([a],[b])=>a.localeCompare(b)).slice(-14),maxDay=Math.max(.000001,...recent.map(row=>row[1]));
  html+='<div class="usage-grid"><section class="panel"><div class="panel-header"><h2>线路与模型</h2><span class="usage-kicker">累计费用 · 前 8 项</span></div><div class="usage-panel-body">'+usageBars(lines.slice(0,8))+'</div></section><section class="panel"><div class="panel-header"><h2>每日花费</h2><span class="usage-kicker">最近 14 个有记录的日期</span></div><div class="usage-panel-body">'+(recent.length?'<div class="daily-chart">'+recent.map(([day,cost])=>'<div class="daily-column"><div class="daily-bar" style="height:'+Math.max(2,Number(cost)/maxDay*130)+'px" title="'+esc(day+' · '+yuan(cost,true))+'" aria-label="'+esc(day+'，'+yuan(cost,true))+'"><span class="daily-value">'+yuan(cost)+'</span></div><span class="daily-label">'+esc(day.slice(-5))+'</span></div>').join('')+'</div>':'<div class="notice">暂无按日统计记录</div>')+'</div></section></div>';
  const ports=Object.entries(data.by_port||{}).map(([port,value])=>Object.assign({port},value)).sort((a,b)=>Number(b.cost_cny)-Number(a.cost_cny));
  html+='<section class="panel"><div class="panel-header"><h2>客户运维费用 <span class="count-pill">'+ports.length+'</span></h2><span class="usage-kicker">累计费用前 20 项</span></div>';
  if(!ports.length)html+=empty('暂无客户运维费用','通过面板进行运维对话后，用量会显示在这里。','chart');
  else html+='<div class="data-table-wrap"><table class="data-table usage-table"><thead><tr><th>客户</th><th>端口</th><th>调用次数</th><th>累计 token</th><th>累计费用</th></tr></thead><tbody>'+ports.slice(0,20).map(row=>{const client=device(row.port);return '<tr><td><strong>'+esc(client?client.name:'历史设备')+'</strong></td><td class="mono">'+esc(row.port)+'</td><td>'+integer(row.calls)+'</td><td>'+integer(row.tokens)+'</td><td class="cost-value">'+yuan(row.cost_cny,true)+'</td></tr>';}).join('')+'</tbody></table></div>';
  return html+'</section>';
}
async function renderUsage() {
  const generation=++state.usageGeneration;
  view.innerHTML=heading('用量统计','查看面板、脚本与系统任务的累计模型用量。',button('刷新统计','refresh-usage','refresh'))+'<div id="usage-content">'+(state.usage?usageContent(state.usage):'<section class="panel">'+empty('正在读取用量','请稍候，正在汇总用量记录。','chart')+'</section>')+'</div>';
  try{const result=await api('/api/usage',{timeout:30000});if(generation!==state.usageGeneration||state.page!=='usage')return;state.usage=result;document.getElementById('usage-content').innerHTML=usageContent(result);}
  catch(error){if(generation===state.usageGeneration&&state.page==='usage')document.getElementById('usage-content').innerHTML='<div class="global-error" role="alert">用量读取失败：'+esc(error.message)+'</div>'+(state.usage?usageContent(state.usage):'');}
}

let composing=false,searchComposing=false;
document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-nav]');
  if(nav){event.preventDefault();if(state.chat)state.chatDrafts.set(state.chat.port,state.chat.draft);navigate(nav.dataset.nav);return;}
  const target=event.target.closest('[data-action]');if(!target||target.disabled)return;
  const action=target.dataset.action,port=target.dataset.port;
  if(action==='theme'){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');return;}
  if(action==='refresh'){loadDevices(true);return;}
  if(action==='refresh-usage'){renderUsage();return;}
  if(action==='refresh-chat'){if(state.chat)selectChat(state.chat.port);else loadDevices(true);return;}
  if(action==='filter'){state.filter=target.dataset.filter;state.pageNumber=1;renderDevices(false);return;}
  if(action==='page'){state.pageNumber=Math.max(1,Number(target.dataset.page)||1);renderDevices(false);return;}
  if(action==='details'){openDrawer(port);return;}
  if(action==='close-drawer'){closeDrawer();return;}
  if(action==='drawer-tab'){if(state.drawerPort)openDrawer(state.drawerPort,target.dataset.tab);return;}
  if(action==='close-modal'){modal.close();return;}
  if(action==='create'){openCreate();return;}
  if(action==='rename'){openRename(port);return;}
  if(action==='retire'){openRetire(port);return;}
  if(action==='pin'){togglePin(port);return;}
  if(action==='code'){showCode(port);return;}
  if(action==='ssh'){showSSH(port);return;}
  if(action==='copy-code'){copyCode();return;}
  if(action==='screen'){showScreen(port);return;}
  if(action==='screen-mode'){applyScreen(target.dataset.mode);return;}
  if(action==='lamp'){applyLamp(target.dataset.mode);return;}
  if(action==='chat'){navigate('chat',port);return;}
  if(action==='select-chat'){selectChat(port);return;}
  if(action==='clear-chat'){openClearChat();return;}
  if(action==='logout'){
    target.disabled=true;
    api('/desktop/logout',{method:'POST',body:{}}).then(()=>location.replace('/login')).catch(error=>{target.disabled=false;toast(error.message,true);});
  }
});
document.addEventListener('input',event=>{
  const input=event.target;
  if(input.id==='device-search'){state.search=input.value;state.pageNumber=1;if(!input.isComposing&&!event.isComposing&&!searchComposing)renderDevices(false);}
  else if(input.id==='chat-device-search'){state.chatSearch=input.value;renderChatDevices();}
  else if(input.id==='chat-input'&&state.chat)state.chat.draft=input.value;
});
document.addEventListener('change',event=>{if(event.target.id==='device-sort'){state.sort=event.target.value;state.pageNumber=1;renderDevices(false);}});
document.addEventListener('submit',event=>{
  if(event.target.id==='chat-form'){event.preventDefault();if(!composing)sendChat();return;}
  const form=event.target,kind=form.dataset.form;if(!kind)return;event.preventDefault();
  if(kind==='create')createCustomer(form);
  else if(kind==='rename')renameCustomer(form);
  else if(kind==='retire')retireCustomer();
  else if(kind==='clear-chat')clearChat();
  else if(kind==='screen')applyScreen(null,form);
});
document.addEventListener('compositionstart',event=>{if(event.target.id==='chat-input')composing=true;else if(event.target.id==='device-search')searchComposing=true;});
document.addEventListener('compositionend',event=>{if(event.target.id==='chat-input')composing=false;else if(event.target.id==='device-search'){searchComposing=false;state.search=event.target.value;state.pageNumber=1;renderDevices(false);}});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!modal.open)closeDrawer();
  if(event.target.id==='chat-input'&&event.key==='Enter'&&!event.shiftKey&&!event.isComposing&&!composing&&event.keyCode!==229){event.preventDefault();sendChat();}
});
modal.addEventListener('close',()=>{state.modal=null;});
document.getElementById('drawer-backdrop').addEventListener('click',closeDrawer);
window.addEventListener('popstate',()=>{if(state.chat)state.chatDrafts.set(state.chat.port,state.chat.draft);routeFromLocation();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadDevices();});
hydrateIcons();
try{setTheme(localStorage.getItem('sr-desktop-theme')==='dark'?'dark':'light');}catch(_){setTheme('light');}
document.getElementById('today').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',month:'long',day:'numeric',weekday:'long'}).format(new Date());
document.getElementById('mobile-link').href='https://'+location.hostname+':5500/';
renderDevices();
loadDevices().then(()=>{routeFromLocation();pollTimer=setTimeout(pollDevices,20000);});


