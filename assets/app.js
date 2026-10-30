(function(){
"use strict";
const seed=window.CAREER_DEMO_DATA||{jobs:[],candidates:[],milestones:[],reflections:[]};
const storageKey="career-baito-demo-v5";
const $=s=>document.querySelector(s);
const clone=x=>JSON.parse(JSON.stringify(x));
function initial(){return {jobs:clone(seed.jobs),saved:[],applications:[],candidates:clone(seed.candidates),milestones:clone(seed.milestones),reflections:clone(seed.reflections),evaluations:{}};}
function restore(){try{const s=JSON.parse(localStorage.getItem(storageKey));if(s&&Array.isArray(s.jobs)&&Array.isArray(s.applications))return {...initial(),...s};}catch{}return initial();}
let data=restore(),toastTimer;
const ui={role:"student",page:"browse",jobId:"",candidateId:"",query:"",area:"all",roleFilter:"all",sort:"featured",companyJobId:"job-101"};
const page=$("#page"),modal=$("#modal"),toast=$("#toast"),side=$("#side-nav"),mobile=$("#mobile-nav");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const yen=n=>Number(n||0).toLocaleString("ja-JP");
const getJob=id=>data.jobs.find(j=>j.id===id);
const fav=id=>data.saved.includes(id);
const applied=id=>data.applications.some(a=>a.jobId===id);
const button=(text,action,id,cls="link-button")=>'<button type="button" class="'+cls+'" data-action="'+action+'"'+(id?' data-id="'+esc(id)+'"':"")+">"+text+"</button>";
const opts=(pairs,current)=>pairs.map(([v,label])=>'<option value="'+esc(v)+'"'+(v===current?" selected":"")+">"+esc(label)+"</option>").join("");
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(data));}catch{}}
function say(s){toast.textContent=s;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),2600);}
function navigate(p,extra={}){ui.page=p;Object.assign(ui,extra);draw();window.scrollTo({top:0,behavior:"instant"});}
function roleChange(r){ui.role=r;ui.page=r==="student"?"browse":"company";ui.jobId="";draw();window.scrollTo(0,0);}
function links(){return ui.role==="student"?[
 ["browse","求人を探す","⌕"],["saved","保存した求人","☆"],["applications","応募した仕事","▤"],["learning","活動ノート","✎"]
]:[["company","募集一覧","▤"],["candidates","応募者","♙"],["training","育成状況","✓"],["editor","募集を作成","＋"]];}
function drawNav(){
 document.querySelectorAll('[data-action="role"]').forEach(x=>x.classList.toggle("selected",x.dataset.role===ui.role));
 $("#side-label").textContent=ui.role==="student"?"学生メニュー":"企業メニュー";
 const items=links();
 side.innerHTML=items.map(([id,name,symbol])=>'<button type="button" data-action="nav" data-page="'+id+'" class="'+(ui.page===id?"active":"")+'"><span class="nav-symbol" aria-hidden="true">'+symbol+"</span>"+name+"</button>").join("");
 mobile.innerHTML=items.map(([id,name,symbol])=>'<button type="button" data-action="nav" data-page="'+id+'" class="'+(ui.page===id?"active":"")+'"><b aria-hidden="true">'+symbol+'</b><span>'+name+"</span></button>").join("");
}
function header(title,description){return '<div class="hero"><h1>'+title+"</h1>"+(description?'<p class="lead">'+description+"</p>":"")+"</div>";}
function empty(title,text,cta=""){return '<div class="empty"><h3>'+title+"</h3><p>"+text+"</p>"+cta+"</div>";}
function logo(j){return '<div class="company-logo" style="background:'+esc(j.color||"#e8f2f6")+'">'+esc(j.initial||j.company.slice(0,1))+"</div>";}
function workType(j){return j.field>0&&j.office>0?"現場＋社員業務":j.field===0?"社員業務中心":"現場中心";}
function jobRow(j){
 return '<article class="job-row">'+logo(j)+'<div><div class="job-company">'+esc(j.company)+'</div>'+
 '<button type="button" class="job-title" data-action="detail" data-id="'+esc(j.id)+'">'+esc(j.title)+'</button>'+
 '<div class="job-meta"><span><strong>時給 '+yen(j.wage)+'円</strong></span><span>'+esc(j.place)+'</span><span>'+esc(workType(j))+'</span></div>'+
 '<p class="job-desc">'+esc(j.tagline)+'</p></div>'+
 '<div class="job-row-actions">'+button("詳しく見る","detail",j.id,"btn secondary small")+
 button(fav(j.id)?"★":"☆","fav",j.id,"icon-button"+(fav(j.id)?" is-on":""))+"</div></article>";
}
function jobList(jobs){return jobs.length?'<div class="job-list">'+jobs.map(jobRow).join("")+"</div>":empty("該当する仕事がありません","検索条件を変えて探してみてください。",button("条件をクリア","clear","", "btn secondary"));}
function filterJobs(){
 let out=data.jobs.filter(j=>{
  const needle=ui.query.trim().toLowerCase();
  return (!needle||[j.title,j.company,j.industry,j.role,j.description].join(" ").toLowerCase().includes(needle))&&
   (ui.area==="all"||j.area===ui.area)&&(ui.roleFilter==="all"||j.role===ui.roleFilter);
 });
 if(ui.sort==="wage")out.sort((a,b)=>b.wage-a.wage);
 return out;
}
function browse(){
 const areas=[...new Set(data.jobs.map(j=>j.area))].sort();
 const roles=[...new Set(data.jobs.map(j=>j.role))].sort();
 return header("仕事を探す","アルバイトとして働きながら、社員の仕事も経験できる求人を集めました。気になる職種から探せます。")+
 '<form id="search-form" class="search-line">'+
 '<div class="field query-field"><label for="query">キーワード</label><input id="query" name="query" value="'+esc(ui.query)+'" placeholder="会社名・仕事内容など"></div>'+
 '<div class="field"><label for="area">地域</label><select id="area" name="area">'+opts([["all","すべて"],...areas.map(s=>[s,s])],ui.area)+'</select></div>'+
 '<div class="field"><label for="roleFilter">職種</label><select id="roleFilter" name="roleFilter">'+opts([["all","すべて"],...roles.map(s=>[s,s])],ui.roleFilter)+'</select></div>'+
 '<button class="btn blue" type="submit">検索</button></form>'+
 '<div class="filter-hint"><span>'+filterJobs().length+'件の求人（架空）</span><label>並び替え <select data-change="sort" aria-label="並び替え">'+opts([["featured","おすすめ順"],["wage","時給順"]],ui.sort)+'</select></label></div>'+
 jobList(filterJobs())+'<p class="note">掲載企業、時給、求人内容はすべて架空のデモです。応募は外部に送信されません。</p>';
}
function week(j){let out="";for(let i=0;i<j.weekly;i++){const office=i>=j.field;out+='<div class="day '+(office?"office":"")+'">'+(i+1)+'日目<b>'+(office?"社員業務":"現場の仕事")+"</b></div>";}return '<div class="week-plan">'+out+"</div>";}
function details(){
 const j=getJob(ui.jobId);if(!j)return empty("求人が見つかりません","一覧からもう一度選んでください。",button("一覧を見る","nav-browse","","btn secondary"));
 return '<div class="breadcrumb">'+button("求人一覧","nav-browse")+' / '+esc(j.company)+'</div>'+
 '<div class="detail-head"><div>'+
 '<div class="detail-company">'+logo(j)+'<div><div class="job-company">'+esc(j.company)+'</div><span class="muted">'+esc(j.industry)+'</span></div></div>'+
 '<h1>'+esc(j.title)+'</h1><p class="lead">'+esc(j.description)+'</p>'+
 '<div class="job-meta" style="margin-top:17px"><span>'+esc(j.place)+'</span><span>'+esc(workType(j))+'</span><span>'+esc(j.shift)+'</span></div></div>'+
 '<aside class="detail-aside"><span class="stat-label">給与</span><div class="large-wage">'+yen(j.wage)+' <small>円 / 時間</small></div><p>現場・社員業務ともに有給</p>'+
 button(applied(j.id)?"応募済み":"この仕事に応募する","apply",j.id,"btn blue")+
 button(fav(j.id)?"保存を解除":"求人を保存","fav",j.id,"btn secondary")+
 '<p>※応募はデモ内でのみ記録されます。</p></aside></div>'+
 '<div class="detail-body">'+
 '<section class="detail-section"><h2>1週間の働き方</h2><p class="prose">週'+j.weekly+'日勤務の例です。現場の仕事 '+j.field+'日、社員業務 '+j.office+'日。</p>'+week(j)+'<p class="small">'+esc(j.schedule)+'</p></section>'+
 '<section class="detail-section"><h2>具体的な仕事</h2><div class="two-cols"><div><h3>現場の仕事</h3>'+(j.field?'<ul class="plain-list">'+j.fieldTasks.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':"<p>社員業務中心の募集です。</p>")+'</div><div><h3>社員と取り組む仕事</h3><ul class="plain-list">'+j.officeTasks.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></div></div></section>'+
 '<section class="detail-section"><h2>体験の流れ</h2><div class="timeline">'+j.steps.map((s,i)=>'<div class="timeline-item"><time>STEP '+(i+1)+'</time><strong>'+esc(s)+'</strong></div>').join("")+'</div></section>'+
 '<section class="detail-section"><h2>募集内容</h2><dl class="spec-list"><dt>職種</dt><dd>'+esc(j.role)+'</dd><dt>勤務地</dt><dd>'+esc(j.place)+'</dd><dt>勤務日数</dt><dd>週'+j.weekly+'日（現場'+j.field+'日 / 社員業務'+j.office+'日）</dd><dt>時給</dt><dd>'+yen(j.wage)+'円</dd><dt>指導担当</dt><dd>'+esc(j.mentor)+'</dd><dt>実務課題</dt><dd>'+esc(j.task)+'</dd><dt>雇用形態</dt><dd>有給のアルバイト（デモ設定）</dd><dt>運営主体</dt><dd>'+esc(j.employment)+'</dd><dt>その他</dt><dd>'+esc(j.perks)+'</dd></dl></section>'+
 '<section class="detail-section"><h2>身につく経験</h2><p class="prose">'+j.skills.map(esc).join(" / ")+'</p><p class="small">社員と定期的に振り返ることを想定しています。</p></section></div>';
}
function savedView(){
 const jobs=data.jobs.filter(j=>fav(j.id));
 return header("保存した求人","気になる仕事を比較できます。")+
 jobList(jobs);
}
function applicationView(){
 return header("応募した仕事","デモ上の応募状況です。実際の企業には送信されていません。")+
 (data.applications.length?'<div class="table-wrap"><table class="data-table"><thead><tr><th>応募先</th><th>内容</th><th>状態</th><th></th></tr></thead><tbody>'+
 data.applications.map(a=>{const j=getJob(a.jobId);return j?'<tr><td class="name">'+esc(j.company)+'</td><td>'+esc(j.title)+'</td><td><span class="status">'+esc(a.status)+'</span></td><td>'+button("見る","detail",j.id)+'</td></tr>':"";}).join("")+"</tbody></table></div>":
 empty("応募した仕事はありません","求人の詳細から応募を試せます。",button("求人を探す","nav-browse","","btn blue")));
}
function learning(){
 const count=data.milestones.filter(m=>m.done).length;
 return header("活動ノート","どんな仕事が自分に合っているか、経験を残しておきましょう。")+
 '<section class="section"><div class="section-heading"><h2>実務の進み具合</h2><span class="section-note">'+count+" / "+data.milestones.length+' 完了</span></div>'+
 '<div class="progress-track"><span style="width:'+Math.round(count/Math.max(1,data.milestones.length)*100)+'%"></span></div>'+
 data.milestones.map(m=>'<div class="milestone '+(m.done?"done":"")+'"><input aria-label="'+esc(m.label)+'" type="checkbox" data-check="milestone" data-id="'+esc(m.id)+'" '+(m.done?"checked":"")+'><div><label>'+esc(m.label)+'</label><p>'+esc(m.detail)+'</p></div></div>').join("")+"</section>"+
 '<section class="section"><div class="section-heading"><h2>振り返り</h2>'+button("記録を追加","reflection-add","","btn secondary small")+'</div>'+
 data.reflections.map(r=>'<article class="reflection"><div class="reflection-top"><span>'+esc(r.date)+'</span><span>'+esc(r.type)+'</span></div><h3>'+esc(r.title)+'</h3><p>'+esc(r.body)+'</p></article>').join("")+"</section>";
}
function company(){
 const own=data.jobs;
 const hired=data.candidates.filter(c=>c.stage==="体験中").length;
 return header("募集一覧","現場の仕事と社員業務を組み合わせた募集を管理します。")+
 '<div class="section-heading section"><h2>公開中の募集（デモ）</h2>'+button("募集を作る","open-editor","", "btn blue small")+"</div>"+
 '<div class="table-wrap"><table class="data-table"><thead><tr><th>求人</th><th>勤務配分</th><th>時給</th><th>操作</th></tr></thead><tbody>'+
 own.map(j=>'<tr><td><div class="name">'+esc(j.title)+'</div><div class="small">'+esc(j.company)+'</div></td><td>現場 '+j.field+'日 / 社員業務 '+j.office+'日</td><td>'+yen(j.wage)+'円</td><td>'+button("編集","edit-job",j.id)+'</td></tr>').join("")+"</tbody></table></div>"+
 '<section class="section"><div class="section-heading"><h2>応募・受入の状況</h2>'+button("応募者を見る","nav-candidates")+'</div>'+
 '<div class="feature-row"><div><strong>応募・面談中</strong><p>受入前の学生</p></div><strong>'+(data.candidates.filter(c=>c.stage!=="体験中").length+data.applications.length)+'人</strong></div>'+
 '<div class="feature-row"><div><strong>体験中</strong><p>現場・社員業務の育成を進行中</p></div><strong>'+hired+'人</strong></div></section>'+
 '<div class="note">この画面は複数社の募集を1画面に表示するデモです。実サービスでは企業ごとに閲覧・編集権限を分ける必要があります。</div>';
}
function allCandidates(){
 const additions=data.applications.map((a,i)=>({id:"demo-application-"+i,name:a.name||"デモ応募者",year:a.year||"大学2年",interest:"未設定",jobId:a.jobId,stage:a.status||"応募受付",summary:a.message||"今回の求人に応募",skill:["応募"]}));
 return data.candidates.concat(additions);
}
function candidates(){
 const list=allCandidates();
 return header("応募者","実務経験や関心のある仕事を確認できます。")+
 '<div class="section-heading section"><h2>応募者一覧</h2><span class="section-note">'+list.length+'人（デモ）</span></div>'+
 '<div class="table-wrap"><table class="data-table"><thead><tr><th>氏名</th><th>関心のある仕事</th><th>状況</th><th>操作</th></tr></thead><tbody>'+
 list.map(c=>'<tr><td><div class="name">'+esc(c.name)+'</div><span class="small">'+esc(c.year)+'</span></td><td>'+esc(c.interest)+'</td><td><span class="status '+(c.stage==="体験中"?"active":"")+'">'+esc(c.stage)+'</span></td><td>'+button("詳細","candidate",c.id)+'</td></tr>').join("")+"</tbody></table></div>";
}
function candidateDetail(){
 const c=allCandidates().find(c=>c.id===ui.candidateId);if(!c)return empty("応募者が見つかりません","一覧から選び直してください。");
 const j=getJob(c.jobId);
 return '<div class="breadcrumb">'+button("応募者一覧","nav-candidates")+' / '+esc(c.name)+'</div>'+
 header(esc(c.name),esc(c.year)+" / "+esc(c.interest))+
 '<section class="section"><h2>これまでの経験</h2><p class="prose">'+esc(c.summary)+'</p><p class="small">本人が共有したと想定するダミー情報です。</p>'+
 '<dl class="spec-list"><dt>応募先</dt><dd>'+(j?esc(j.title):"なし")+'</dd><dt>得意なこと</dt><dd>'+c.skill.map(esc).join("、")+'</dd></dl></section>'+
 '<section class="section"><h2>選考・体験状況</h2><form id="candidate-form"><div class="form-grid"><div class="field"><label for="stage">進捗</label><select id="stage" name="stage">'+opts([["応募受付","応募受付"],["面談調整中","面談調整中"],["体験中","体験中"],["辞退","辞退"],["終了","終了"]],c.stage)+'</select></div><div class="field" style="justify-content:end"><button class="btn blue" type="submit">進捗を更新</button></div></div><input type="hidden" name="candidateId" value="'+esc(c.id)+'"></form></section>'+
 '<section class="section"><h2>実務評価</h2><p class="prose">成長や学習の記録を残します。人柄を単一の点数で決めつけるのではなく、仕事で確認できた行動を記録する想定です。</p>'+
 '<form id="evaluation-form" class="form-grid"><input type="hidden" name="candidateId" value="'+esc(c.id)+'"><div class="field wide"><label for="evaluation">社員からのフィードバック</label><textarea id="evaluation" name="evaluation" placeholder="観察した行動・成果・今後経験してほしいこと">'+esc(data.evaluations[c.id]||"")+'</textarea></div><div class="wide"><button type="submit" class="btn blue">評価を保存</button></div></form></section>';
}
function training(){
 return header("育成状況","アルバイトだけで終わらないよう、社員業務の担当者と課題を明確にします。")+
 '<section class="section"><div class="section-heading"><h2>募集ごとの育成内容</h2></div>'+
 data.jobs.map(j=>'<div class="feature-row"><div><strong>'+esc(j.company)+'｜'+esc(j.role)+'</strong><p>社員業務 '+j.office+'日 / 指導：'+esc(j.mentor)+'<br>実務課題：'+esc(j.task)+'</p></div>'+button("編集","edit-job",j.id,"btn secondary small")+'</div>').join("")+'</section>'+
 '<div class="note">社員業務の日も給与を支払う想定です。指導担当、実務課題、振り返りを募集の条件として設定します。</div>';
}
function editor(){
 const j=getJob(ui.companyJobId)||data.jobs[0];
 return header("募集を作成・編集","現場の仕事と社員業務の割合を決め、学生にどんな仕事を経験してもらうか設定します。")+
 '<div class="grid-form-preview"><form id="editor-form">'+
 '<section class="form-section"><div class="form-section-head"><h2>募集内容</h2></div><div class="form-grid">'+
 '<div class="field wide"><label for="job-select">編集する求人</label><select id="job-select" data-change="job-select">'+opts(data.jobs.map(x=>[x.id,x.company+"｜"+x.title]),j.id)+'</select></div>'+
 '<div class="field"><label for="company">会社名</label><input id="company" name="company" maxlength="60" required value="'+esc(j.company)+'"></div>'+
 '<div class="field"><label for="area">エリア</label><input id="area" name="area" maxlength="20" required value="'+esc(j.area)+'"></div>'+
 '<div class="field wide"><label for="title">募集タイトル</label><input id="title" name="title" maxlength="70" required value="'+esc(j.title)+'"></div>'+
 '<div class="field"><label for="role">体験できる職種</label><input id="role" name="role" maxlength="40" required value="'+esc(j.role)+'"></div>'+
 '<div class="field"><label for="wage">時給（現場も社員業務も有給）</label><input type="number" min="1000" max="10000" step="50" id="wage" name="wage" required value="'+j.wage+'"><span class="form-help">1,000円未満はデモ上では保存不可。実際の最低賃金は地域ごとに確認してください。</span></div>'+
 '</div></section>'+
 '<section class="form-section"><h2>1週間の配分</h2><p class="subheading">最大5日まで。社員業務を最低1日設定してください。</p><div class="form-grid">'+
 '<div class="field"><label for="field">現場の仕事（日 / 週）</label><input type="number" min="0" max="4" name="field" id="field" required value="'+j.field+'"></div>'+
 '<div class="field"><label for="office">社員業務（日 / 週）</label><input type="number" min="1" max="5" name="office" id="office" required value="'+j.office+'"></div>'+
 '</div></section>'+
 '<section class="form-section"><h2>社員業務の内容</h2><div class="form-grid">'+
 '<div class="field wide"><label for="mentor">指導する社員・チーム</label><input id="mentor" name="mentor" maxlength="80" required value="'+esc(j.mentor)+'"></div>'+
 '<div class="field wide"><label for="task">実際に担当してもらう課題</label><textarea id="task" name="task" maxlength="260" required>'+esc(j.task)+'</textarea></div>'+
 '<div class="field wide"><label for="description">仕事の説明</label><textarea id="description" name="description" maxlength="500" required>'+esc(j.description)+'</textarea></div>'+
 '</div></section>'+
 '<div class="form-actions"><button type="submit" class="btn blue">内容を保存</button>'+button("新しい募集を追加","new-job","","btn secondary")+'</div>'+
 '<p class="small">変更はこのブラウザのデモにのみ保存されます。実際の求人は掲載されません。</p></form>'+
 '<aside class="preview-panel"><p class="callout-title">学生から見える内容</p><div class="job-company">'+esc(j.company)+'</div><div class="preview-job">'+esc(j.title)+'</div>'+
 '<p class="preview-point">時給 '+yen(j.wage)+'円｜'+esc(j.area)+'</p>'+week(j)+'<h3>社員業務の課題</h3><p class="prose">'+esc(j.task)+'</p>'+
 '<p class="small">募集を保存すると学生向け一覧・詳細も更新されます。</p></aside></div>';
}
function modalOpen(inner){modal.hidden=false;modal.innerHTML='<div class="modal-dialog" role="dialog" aria-modal="true" aria-label="デモ操作"><button class="modal-close" type="button" data-action="close" aria-label="閉じる">×</button>'+inner+"</div>";modal.querySelector(".modal-close").focus();}
function close(){modal.hidden=true;modal.innerHTML="";}
function applyModal(id){
 const j=getJob(id);if(!j)return;
 if(applied(id)){say("この求人には応募済みです");return;}
 modalOpen('<h2>応募内容を入力</h2><p class="small">'+esc(j.company)+'｜'+esc(j.title)+'</p>'+
 '<form id="apply-form" class="modal-form"><input name="jobId" type="hidden" value="'+esc(id)+'">'+
 '<div class="field"><label for="apply-name">名前（架空でOK）</label><input id="apply-name" name="name" maxlength="40" placeholder="例：山田 はるか" required></div>'+
 '<div class="field"><label for="apply-year">学年</label><select id="apply-year" name="year">'+opts([["大学1年","大学1年"],["大学2年","大学2年"],["大学3年","大学3年"],["大学4年","大学4年"]],"大学2年")+'</select></div>'+
 '<div class="field"><label for="apply-msg">興味を持った理由（任意）</label><textarea id="apply-msg" name="message" maxlength="240" placeholder="体験してみたい仕事など"></textarea></div>'+
 '<label class="checkline"><input type="checkbox" required><span>架空のデモ応募として、このブラウザ内に保存することを理解しました。</span></label>'+
 '<button type="submit" class="btn blue">デモ応募する</button></form>');
}
function reflectionModal(){
 modalOpen('<h2>振り返りを追加</h2><p class="small">このブラウザ内にだけ保存します。</p>'+
 '<form id="reflection-form" class="modal-form"><div class="field"><label for="reflection-type">経験の種類</label><select id="reflection-type" name="type">'+opts([["現場","現場"],["社員業務","社員業務"],["その他","その他"]],"現場")+'</select></div>'+
 '<div class="field"><label for="reflection-title">振り返りの題名</label><input id="reflection-title" name="title" maxlength="60" required placeholder="例：初めて売上データを見た"></div>'+
 '<div class="field"><label for="reflection-body">気づいたこと</label><textarea id="reflection-body" name="body" maxlength="500" required placeholder="何をして、何が分かった？"></textarea></div><button type="submit" class="btn blue">保存する</button></form>');
}
function draw(){
 drawNav();
 let html;
 if(ui.role==="student"){
  html=({browse,saved:savedView,applications:applicationView,learning,detail:details})[ui.page]?.()||browse();
 }else{
  html=({company,candidates,training,editor,candidateDetail})[ui.page]?.()||company();
 }
 page.innerHTML=html;
}
document.addEventListener("click",e=>{
 const node=e.target.closest("[data-action]");if(!node)return;
 const action=node.dataset.action,id=node.dataset.id;
 if(action==="role"){roleChange(node.dataset.role);return;}
 if(action==="nav"){navigate(node.dataset.page);return;}
 if(action==="home"){roleChange("student");return;}
 if(action==="nav-browse"){navigate("browse");return;}
 if(action==="nav-candidates"){navigate("candidates");return;}
 if(action==="detail"){navigate("detail",{jobId:id});return;}
 if(action==="fav"){data.saved=fav(id)?data.saved.filter(x=>x!==id):data.saved.concat(id);persist();draw();say(fav(id)?"求人を保存しました":"保存を解除しました");return;}
 if(action==="apply"){applyModal(id);return;}
 if(action==="close"){close();return;}
 if(action==="clear"){ui.query="";ui.area="all";ui.roleFilter="all";navigate("browse");return;}
 if(action==="reflection-add"){reflectionModal();return;}
 if(action==="candidate"){navigate("candidateDetail",{candidateId:id});return;}
 if(action==="edit-job"){navigate("editor",{companyJobId:id});return;}
 if(action==="open-editor"){navigate("editor");return;}
 if(action==="new-job"){const base=getJob(ui.companyJobId)||data.jobs[0];const id="new-"+Date.now();data.jobs.push({...clone(base),id,company:"新しい会社",initial:"新",title:"新しいキャリアバイト募集",role:"企画・マーケティング",field:2,office:1,weekly:3,task:"社員と一緒に実務課題を考える",mentor:"指導社員"});ui.companyJobId=id;persist();navigate("editor");say("新しい募集案を追加しました");return;}
 if(action==="reset"){if(window.confirm("このブラウザ内のデモ内容を初期化しますか？")){data=initial();persist();close();roleChange("student");say("初期化しました");}return;}
});
document.addEventListener("change",e=>{
 const t=e.target;
 if(t.dataset.change==="sort"){ui.sort=t.value;draw();}
 if(t.dataset.change==="job-select"){ui.companyJobId=t.value;draw();}
 if(t.dataset.check==="milestone"){const m=data.milestones.find(m=>m.id===t.dataset.id);if(m){m.done=t.checked;persist();draw();}}
});
document.addEventListener("submit",e=>{
 const form=e.target;if(!form.id)return;
 e.preventDefault();const v=Object.fromEntries(new FormData(form).entries());
 if(form.id==="search-form"){ui.query=v.query||"";ui.area=v.area;ui.roleFilter=v.roleFilter;draw();return;}
 if(form.id==="apply-form"){if(applied(v.jobId)){say("すでに応募済みです");close();return;}data.applications.push({jobId:v.jobId,name:v.name.trim(),year:v.year,message:v.message.trim(),status:"応募受付"});persist();close();navigate("applications");say("応募をデモ内に保存しました（外部送信なし）");return;}
 if(form.id==="reflection-form"){data.reflections.unshift({id:"reflection-"+Date.now(),date:new Date().toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}),type:v.type,title:v.title.trim(),body:v.body.trim()});persist();close();draw();say("振り返りを保存しました");return;}
 if(form.id==="editor-form"){
  const j=getJob(ui.companyJobId);if(!j)return;
  const field=Number(v.field),office=Number(v.office),wage=Number(v.wage);
  if(!Number.isInteger(field)||!Number.isInteger(office)||field<0||office<1||field+office>5||field+office<1){say("現場0〜4日・社員業務1日以上、合計5日以内にしてください");return;}
  if(!Number.isFinite(wage)||wage<1000){say("時給は1,000円以上で入力してください");return;}
  Object.assign(j,{company:v.company.trim(),initial:v.company.trim().slice(0,1),area:v.area.trim(),title:v.title.trim(),role:v.role.trim(),wage,field,office,weekly:field+office,mentor:v.mentor.trim(),task:v.task.trim(),description:v.description.trim()});
  persist();draw();say("募集を更新しました。学生画面にも反映されます");return;
 }
 if(form.id==="candidate-form"){const c=allCandidates().find(x=>x.id===v.candidateId);if(c){if(c.id.startsWith("demo-application-")){const ix=Number(c.id.slice("demo-application-".length));if(data.applications[ix])data.applications[ix].status=v.stage;}else{const actual=data.candidates.find(x=>x.id===c.id);if(actual)actual.stage=v.stage;}persist();draw();say("進捗を更新しました");}return;}
 if(form.id==="evaluation-form"){data.evaluations[v.candidateId]=String(v.evaluation||"").trim();persist();say("評価メモを保存しました");return;}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)close();});
modal.addEventListener("click",e=>{if(e.target===modal)close();});
draw();
})();