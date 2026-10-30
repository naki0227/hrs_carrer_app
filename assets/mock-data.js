/* 架空のデータだけを使う発表用デモです。 */
window.CAREER_DEMO_DATA = {
  jobs: [
    {id:"job-101",company:"MACHI MARKET",initial:"M",industry:"小売",title:"店舗から始める商品企画・マーケティング",role:"企画・マーケティング",area:"大阪",place:"大阪市北区",wage:1300,weekly:3,field:2,office:1,shift:"平日・土日相談",remote:false,tagline:"売り場の気づきを、次の企画に。",mentor:"商品企画部の先輩社員",task:"新商品の陳列・販促施策を考え、社員に提案",description:"直営店舗で接客や発注の基本を経験したあと、本部の企画チームで売上データの見方や販促企画を学びます。",fieldTasks:["接客・レジ・商品補充","発注補助と売り場づくり"],officeTasks:["売上の傾向を調査","販促施策の提案"],steps:["店舗でお客様や商品の流れを知る","売上・販促のデータを読み解く","自分の改善案を発表する"],skills:["顧客理解","データ分析","企画提案"],employment:"同一法人の直営店舗と本部",schedule:"週3日・1日5〜6時間を想定",perks:"交通費支給（上限あり）",color:"#cfe9dd"},
    {id:"job-102",company:"LUMI HOTEL",initial:"L",industry:"宿泊",title:"フロント業務 × ホテルの人事・採用企画",role:"人事・採用",area:"大阪",place:"大阪市中央区",wage:1250,weekly:3,field:2,office:1,shift:"土日を含め相談",remote:false,tagline:"おもてなしの裏側にある、働く仕組みへ。",mentor:"人事チーム採用担当",task:"新人スタッフ向け研修の改善案づくり",description:"宿泊のお客様に接する現場からスタート。人事チームと一緒に採用・教育の課題に取り組めます。",fieldTasks:["フロント補助","お客様の問い合わせ対応"],officeTasks:["研修資料の改善","採用広報の企画"],steps:["現場オペレーションを理解する","スタッフへのヒアリングを行う","研修改善案を提案する"],skills:["コミュニケーション","人材育成","課題発見"],employment:"同一法人の直営施設と本部",schedule:"週3日・1日5時間目安",perks:"制服貸与",color:"#f2e3d0"},
    {id:"job-103",company:"NEST COFFEE",initial:"N",industry:"飲食",title:"カフェ運営 × ブランド・SNS企画",role:"企画・マーケティング",area:"京都",place:"京都市下京区",wage:1200,weekly:3,field:2,office:1,shift:"週末歓迎・平日相談",remote:false,tagline:"人気の理由を、つくる仕事も。",mentor:"ブランドマネージャー",task:"季節限定メニューのSNS投稿企画を制作",description:"店舗運営と発信企画をセットで経験。お客様の反応を生かした企画を社員と考えます。",fieldTasks:["接客・ドリンク提供補助","店舗の在庫確認"],officeTasks:["SNS投稿案の制作","販促結果の振り返り"],steps:["ブランドとお客様を理解する","企画案を作りテストする","結果を報告する"],skills:["SNS運用","マーケティング","協働"],employment:"同一法人の直営店",schedule:"週3日・1日4〜6時間",perks:"まかないあり",color:"#e8ddce"},
    {id:"job-104",company:"AOI FOODS",initial:"A",industry:"メーカー",title:"製造現場 × 商品開発アシスタント",role:"商品開発",area:"大阪",place:"大阪府吹田市",wage:1350,weekly:3,field:2,office:1,shift:"平日のみ",remote:false,tagline:"つくる現場から、新商品を考える。",mentor:"商品開発チームの社員",task:"新商品のアンケート集計と改善案の作成",description:"食品製造の現場で品質と工程を理解し、開発担当と試作品の改善を考える仕事です。",fieldTasks:["製造ライン補助","品質チェック補助"],officeTasks:["顧客アンケートの整理","試作品の企画会議参加"],steps:["安全と品質を学ぶ","商品開発の考え方を学ぶ","改善案をまとめる"],skills:["商品理解","品質意識","企画力"],employment:"同一法人の工場と開発部門",schedule:"週3日・1日6時間",perks:"交通費支給",color:"#d9e8f0"},
    {id:"job-105",company:"HARBOR LOGISTICS",initial:"H",industry:"物流",title:"物流倉庫 × 業務改善・DX",role:"業務改善・DX",area:"兵庫",place:"神戸市中央区",wage:1400,weekly:3,field:2,office:1,shift:"平日中心",remote:false,tagline:"現場の『もっとよくできる』を仕事に。",mentor:"業務改善チームの社員",task:"作業時間を観察し、改善のアイデアを提案",description:"物流現場の安全・品質を理解し、社員と一緒に改善案を検討します。",fieldTasks:["倉庫作業の補助","安全・出荷チェック"],officeTasks:["業務フローの可視化","改善案の検討"],steps:["現場の動きを知る","作業時間を可視化する","改善案を提案する"],skills:["業務分析","改善提案","チームワーク"],employment:"同一法人の物流拠点と本部",schedule:"週3日・1日5時間",perks:"作業着貸与",color:"#e5e9f4"},
    {id:"job-106",company:"CLEAR STUDIO",initial:"C",industry:"IT・制作",title:"Web制作の現場で学ぶデザイン・企画",role:"デザイン・IT",area:"東京",place:"東京都渋谷区",wage:1500,weekly:3,field:0,office:3,shift:"平日中心・一部在宅相談",remote:true,tagline:"見て学ぶだけじゃない、つくって学ぶ。",mentor:"制作チームリーダー",task:"実際のWebサイト改善案とプロトタイプ制作",description:"通常の専門業務中心の長期インターン型。先輩社員のレビューを受けながら制作工程を経験します。",fieldTasks:[],officeTasks:["Webサイトの改善調査","小さなデザイン制作","ユーザーテスト補助"],steps:["制作の進め方を学ぶ","小さな改善を実装する","成果をレビューする"],skills:["UI設計","プロトタイピング","レビュー"],employment:"同一法人の制作部門",schedule:"週3日・1日4〜6時間",perks:"一部リモート相談",color:"#e8e0f0"}
  ],
  candidates: [
    {id:"candidate-01",name:"佐藤 みな",year:"大学2年",interest:"商品企画・マーケティング",jobId:"job-101",stage:"応募受付",summary:"カフェでの接客経験。企画の仕事に興味。",skill:["接客","発信"]},
    {id:"candidate-02",name:"高橋 りく",year:"大学3年",interest:"人事・教育",jobId:"job-102",stage:"面談調整中",summary:"サークルの新歓企画を担当。人事の仕事を体験したい。",skill:["運営","コミュニケーション"]},
    {id:"candidate-03",name:"山本 あおい",year:"大学2年",interest:"商品企画・マーケティング",jobId:"job-101",stage:"体験中",summary:"店舗業務と本部の販促課題を進行中。",skill:["現場理解","改善"]},
    {id:"candidate-04",name:"小林 はる",year:"大学1年",interest:"業務改善・DX",jobId:"job-105",stage:"応募受付",summary:"職種を探している段階。未経験から学びたい。",skill:["学習意欲"]}
  ],
  milestones: [
    {id:"m1",label:"現場の仕事の流れを理解する",detail:"接客や日々の業務を一通り体験",done:true},
    {id:"m2",label:"課題を一つ見つける",detail:"現場から改善のヒントを探す",done:true},
    {id:"m3",label:"社員と企画案を形にする",detail:"データを見ながら提案資料を作る",done:false},
    {id:"m4",label:"学びと進路を振り返る",detail:"向いている仕事、違うと思った仕事を記録",done:false}
  ],
  reflections: [
    {id:"reflection-1",date:"10/21",type:"現場",title:"お客様が商品を選ぶ理由を観察",body:"売れ筋以外にも、場所や商品の説明で選ばれ方が変わることに気づいた。"},
    {id:"reflection-2",date:"10/24",type:"社員業務",title:"販促会議に参加",body:"数字だけでなく、お店で見た声が企画のヒントになると分かった。"}
  ]
};
