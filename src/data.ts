import { ProjectType, WorkPost, ExperienceType, SkillCategory } from './types';

export const PROJECTS_DATA: ProjectType[] = [
  {
    id: "proj_01",
    title: "小红书设计师 KOS 打造（装修 AI 宣发）",
    subtitle: "以“真实旧房案例 + AIGC整屋案例矩阵”打通种草到咨询，为「被窝整装」稳定导流",
    platform: "小红书",
    tags: ["被窝整装导流", "KOS矩阵", "真实旧房改造", "AIGC整屋案例"],
    description: "以真实旧房改造内容建立信任与成交背书，再以风格化 AIGC 案例放大审美覆盖与内容产能，形成“种草—信任—咨询”的矩阵闭环，为被窝整装持续引流。",
    longDescription: `这条案例的核心，不是跑出几篇高曝光内容，而是把装修用户从“先被风格吸引”，到“开始相信方案能落地”，再到“愿意进一步咨询”的路径拆清楚，并放进不同的内容入口里，形成稳定导流。\n\n01｜先看数据结论\n- 从截图样本看，账号表现并不是平均起量，而是很明显的矩阵协同：风格型内容负责放大曝光，真实设计师内容负责承接高意向问题。\n- 样本中有多条内容达到万级曝光，最高约 38.2W，另外还有 24.1W、18.7W、11.1W 等高点，说明已经跑出可重复的内容结构，而不是偶发爆文。\n- 同时也存在 5K 左右的样本，这反而说明项目具备数据筛选能力，能够识别哪些风格、题材与表达方式真正有效。\n\n02｜案例样本各自承担的角色\n- 设计师贝贝：更偏“信任承接”。用户从风格种草进入后，真正关心的是预算、工期、户型适配、避坑与落地，这类内容更适合承接高意向咨询。\n- 初夏-原木设计：更偏“情绪种草”。原木、奶油、侘寂等风格天然更容易形成停留、收藏与扩散，是前端高效拉新的重要入口。\n- Rose极简设计：更偏“理性审美”。它覆盖的是对黑白灰、材质、收口和整体完成度更敏感的人群，更接近高品质决策心智。\n\n03｜为什么这套结构有效\n- 风格型内容解决的是“先停下来”。在小红书场景里，封面是否一眼给出空间结果，直接决定用户会不会继续看。\n- 真实设计师内容解决的是“敢不敢相信”。当用户开始追问预算、工期、可行性时，真实案例比单纯效果图更能降低决策风险。\n- 极简审美内容解决的是“是否匹配目标客群”。它不是简单补充一种风格，而是在矩阵里补齐另一类消费偏好与客单心智。\n\n04｜从数据里反推出来的内容规律\n- 跑到万级以上的内容，通常都具备强结果感，用户能快速代入“如果是我家，会不会也想这样做”。\n- 没有起量的内容，往往不是审美不够，而是封面结果感、标题钩子与评论区承接动作没有同时成立。\n- 高曝光样本之间的差异也说明，项目跑出来的不是单一模板，而是“原木治愈感 / 极简高级感 / 真实旧改落地感”几类内容语义，分别覆盖不同审美与决策阶段。\n\n05｜真正可复用的是导流路径\n- 前端内容负责拉新，让用户先对空间风格产生兴趣。\n- 中段内容负责提纯，把“喜欢”转成“我想知道这套能不能做、多少钱、多久能装完”。\n- 后端通过评论关键词、私信资料包、主页跳转与企微承接，把内容流量转成真实咨询线索。\n- 这样一来，高曝光内容不再只是品牌展示，而会持续为后端销售与转化动作供给前置流量。\n\n06｜项目价值怎么定义更准确\n- 这不是在做几个独立装修号，而是在搭建一套“审美流量 + 信任内容 + 线索承接”的矩阵打法。\n- 它验证了 AIGC 风格案例与真实设计师内容并不冲突，前者负责高效种草，后者负责完成信任与转化。\n- 对被窝整装来说，这类打法比单个爆款更有价值，因为它既能持续产出高审美内容，也能保住成交所必需的真实感与可落地感。`,
    imageUrl: "studio",
    bgColor: "bg-[#6366F1]", // Purple Indigo
    shadowColor: "bg-[#FACC15]", // Yellow
    metrics: [
      { label: "样本最高曝光", value: "38.2W+", growth: "单条峰值" },
      { label: "第二梯队峰值", value: "24.1W+", growth: "稳定放量" },
      { label: "万级内容表现", value: "多篇过万", growth: "非单点爆文" }
    ],
    challenges: [
      "装修内容天然重决策：用户不缺好看图，缺的是“能不能落地、多少钱、多久、怎么避坑”的可信答案。",
      "仅靠真实工地案例更新慢、成本高；仅靠 AIGC 案例又容易被质疑“好看但不真实”，转化链路不稳。",
      "导流路径若过度硬广会伤害信任；若没有标准承接动作（关键词/资料包/表单）又会白白流失高意向咨询。"
    ],
    solutions: [
      "三账号分工：真实号专注旧房落地与成交背书；AIGC号专注风格案例库与收藏扩散；用矩阵互相导流（置顶/评论区引导真实落地）。",
      "内容结构标准化：AIGC号用“风格关键词+户型面积+一句结果”做封面钩子；正文用 3-6 张分镜 + 3 个可复制关键点引导收藏与关键词评论。",
      "真实号负责“把不信变成信”：预算拆解、工期节点、材料清单、验收标准、对比前后；把“能做/不能做/怎么做”讲清楚，提升私信有效率。",
      "承接链路 SOP：评论关键词→私信发资料包（报价/工期/材料清单）→收集城市/户型/预算/时间→预约方案沟通→导入企微/表单完成留资。"
    ],
    achievements: [
      "以“真实旧房 + AIGC风格案例”构建可持续内容飞轮，既有信任背书又能规模化产出风格种草内容。",
      "矩阵形成稳定导流漏斗：风格内容拉新，真实内容提纯，资料包/SOP承接把兴趣变成咨询与留资。",
      "被窝整装获得更可控的线索入口：从“单点爆款”升级为“可复制的账号矩阵打法”，便于后续拓展更多风格号/城市号。"
    ]
  },
  {
    id: "proj_01_copy",
    title: "小红书设计师 KOS 打造（装修 AI 宣发）",
    subtitle: "从 0 到 1 极速搭建设计师人设账户「设牛」，首周视频曝光量 50w+，累计获取 500w+ 精准流量",
    platform: "小红书",
    tags: ["KOS人设打造", "装修AI推广", "首周50w+", "500w+全网流量"],
    description: "用“硬核设计师人设 + 高真实感 AIGC 渲染对比”作为视觉锤，把抽象的 AI 装修能力翻译成可感知的空间结果，完成从内容起量到咨询导流的冷启动闭环。",
    longDescription: `该项目的目标是把“AI 装修/空间设计产品”从抽象功能，变成用户在 3 秒内就能感知价值的“空间结果展示”。我们选择从 0 到 1 打造 KOS 设计师人设「设牛」，用强风格视觉和高密度对比信息，快速完成起量与导流验证。\n\n01｜定位与人设（解决“信谁”的问题）\n- 人设关键词：极客设计师 / 反差审美 / 结果导向。\n- 角色任务：不做“讲道理的产品介绍”，只展示“你给我户型，我给你可落地结果”。\n\n02｜内容策略（解决“看懂”的问题）\n- 核心结构：普通空房/旧房 → 3 秒 AIGC 方案结果 → 关键点拆解（动线/收纳/材质/灯光）→ 引导评论关键词领取资料。\n- 视觉锤：SD/ComfyUI 高真实感渲染 + 前后对比 + 统一的粗黑框信息层，让用户在首屏完成理解。\n\n03｜矩阵协同（解决“产能与信任”的矛盾）\n- 设牛作为主账号承担“高对比冲击 + 起量”，把产品能力做成“可转发的视觉爽点”。\n- 辅助账号承担“屋主视角/自装避坑/翻新日记”，用生活化叙事增强真实感与可信度，承接高意向问价。\n\n04｜承接链路（把热度变线索）\n- 评论关键词 → 私信发资料包（风格清单/预算区间/工期节点/可做与不可做）→ 收集城市/户型/预算/入住时间 → 预约沟通 → 留资/导入企微。\n\n05｜数据复盘（用漏斗而不是用“爆款”评价）\n- 顶层：曝光/完播/收藏（评估起量与内容吸引力）。\n- 中层：关键词评论占比、私信触发率（评估意向密度）。\n- 底层：有效咨询率、留资完成率（评估导流是否可复制）。\n该打法的关键不是“更酷”，而是把产品能力拆成可感知、可提问、可承接的转化路径。`,
    imageUrl: "studio",
    bgColor: "bg-[#6366F1]", // Purple Indigo
    shadowColor: "bg-[#FACC15]", // Yellow
    metrics: [
      { label: "全网曝光", value: "500W+", growth: "站内统计" },
      { label: "首周起量", value: "50W+", growth: "冷启动" },
      { label: "关键词承接", value: "资料包SOP", growth: "评论→私信" },
      { label: "导流路径", value: "5步闭环", growth: "可复制" }
    ],
    challenges: [
      "同类装修设计账号早已审美疲劳，普通实拍视频制作成本过高、效率缓慢，难以保持日更的节奏。",
      "AI 装修产品功能过于学术，缺乏直观、有沉淀 of 个人设计师载体，用户难以秒级触达体验痛点。"
    ],
    solutions: [
      "定义极有个性张力的硬核设计师人设「设牛」，围绕『新粗野主义』『科幻太空奶油家装』，每天快速利用 ComfyUI 渲染爆款空间前后对比图文与极动感视频。",
      "在内容开头设置 3 秒视觉黄金锚点，以高反差的『普通空房 vs 三秒超概念赛博软装』将用户的滑动指尖牢牢黏在屏幕上，配合精妙的 ChatGPT 人设口吻解答。"
    ],
    achievements: [
      "首周完成账号冷启动验证：用 3 秒“结果对比”结构快速起量，形成稳定的收藏与关键词评论。",
      "建立从内容到咨询的标准承接路径，把“审美爽点”转化为可追踪的线索漏斗。"
    ]
  },
  {
    id: "proj_02",
    title: "小红书职场教育账号矩阵",
    subtitle: "从 0 到 1 运营，矩阵式增粉 40w+，图文播放超 100w+，视频播放超 200w+",
    platform: "小红书",
    tags: ["职场教育", "矩阵运营", "零成本起量", "PPT/Excel"],
    description: "从 0 到 1 运营小红书账号“秒可PPT学习教程”、“秒可讲Excel表格”等，搭建起高转化的职场学习技能与效率干货矩阵。",
    longDescription: `该项目的核心是把“PPT/Excel 学习”从零散技巧，做成用户可持续追更的“场景化提效系统”。我们以矩阵方式拆分赛道与意图：PPT 负责演示表达与职场汇报场景，Excel 负责表格处理与数据提效场景；两条线统一用“高信息密度 + 一键可复制”的内容结构起量，并通过资料包承接实现转化闭环。\n\n01｜用户与场景（先选“高频刚需”）\n- 目标人群：大学生/初入职场白领/行政与运营岗位。\n- 高复用场景：周报月报、汇报 PPT、数据整理、打印交付、模板套用。\n\n02｜内容结构（收藏率决定上限）\n- 封面：场景痛点 + 结果导向（例如“10 秒做出可交付表格/一页 PPT 立刻高级”）。\n- 正文：3-5 步可执行操作 + 1 张“速查卡/快捷键卡”，让用户形成“截图即用”的收藏动机。\n- 结尾：评论关键词领取资料包（模板/函数速查/常用版式），把互动变成私信线索。\n\n03｜矩阵协作（两条线互相导流）\n- PPT 账号：抓“汇报表达/版式模板/排版审美”，更适合短视频演示与模板承接。\n- Excel 账号：抓“函数/报表/自动化”，更适合图文速查卡与资料包承接。\n- 统一视觉识别：粗黑边框 + 高对比色块 + 关键点编号，保证滑动场景下的识别度。\n\n04｜承接与转化（从内容到付费的最短路径）\n- 评论关键词 → 私信资料包 → 引导进群/表单 → 课程/服务承接。\n- 资料包的作用不是“赠品”，而是筛选真实学习意图、提高后续转化效率。\n\n05｜数据复盘（用 4 个指标抓住主线）\n- 触达：曝光/播放（评估起量）。\n- 价值：收藏率/评论关键词率（评估内容是否“能交付”）。\n- 意向：私信触发率（评估承接设计是否有效）。\n- 转化：进群/留资/成交（评估商业闭环）。`,
    imageUrl: "laptop",
    bgColor: "bg-[#FF6B6B]", // Coral / Soft red
    shadowColor: "bg-[#3B82F6]", // Blue
    metrics: [
      { label: "矩阵累计增粉", value: "40W+", growth: "0成本裂变" },
      { label: "视频累计播放", value: "200W+", growth: "硬核干货" },
      { label: "图文曝光", value: "100W+", growth: "高收藏" }
    ],
    challenges: [
      "职场技能教学同质化竞争严重，普通的常规干瘪教学或慢速录屏极易被用户直接滑走。",
      "如何使这些大流量的技能账号产出真正的知识付费购买力，而非只换来无转化的表面赞藏。"
    ],
    solutions: [
      "设计一套像素级精致的『新粗野主义高反差表格框 + 吐槽情绪词』主图排版模型，在前3秒重整用户指尖注意力。",
      "将极其枯燥的 PPT 与 Excel 大招提炼为 20-30 秒超明快节奏的重点片段，打包『懒人提效资料礼包』引爆粉丝高黏性关注度。"
    ],
    achievements: [
      "成功将“秒可PPT学习教程”起盘为赛道前列账号，无付费流水输出多条上万赞、高转化的顶流爆帖。",
      "全系列教育矩阵累计吸粉突破 40 万，图文与视频累计引爆百万级播放，极速转化了高额购买用户群。"
    ]
  },
  {
    id: "proj_03",
    title: "公众号 Excel 与插画矩阵项目",
    subtitle: "以热点切入、职场焦虑放大与低门槛转化承接，打通 Excel / AI / 插画服务号矩阵的内容到成交路径",
    platform: "公众号",
    tags: ["公众号10w+", "课程矩阵", "转化率狂飙", "服务号运营"],
    description: "围绕职场提效、AI 应用与副业技能变现三类用户动机，搭建公众号内容矩阵：前端用热点标题与情绪钩子打开阅读，中段用场景收益与案例演示建立价值感，后端用低门槛课程与服务号承接完成转化。",
    longDescription: `这条案例的重点，不在于某一篇文章写得多爆，而在于把公众号矩阵拆成了不同的账号定位，并让每个账号只承接一类核心需求，再通过统一的转化结构把流量导向课程与服务。\n\n01｜先看账号定位：不是多开几个号，而是把用户需求拆开承接\n- Excel职场：定位为“职场提效入口”。核心人群是已经在工作中感受到效率压力的人，关注点不是工具本身，而是“能不能更快交付、更少加班、更快做完表格、PPT 和汇报”。\n- 闯关学Excel：定位为“AI 焦虑承接位”。这类账号承接的是用户对技术变化的危机感，核心心智不是单纯学 Excel，而是“AI 时代来了，我如果不升级能力会不会掉队”。\n- 秒可商业插画设计师：定位为“副业变现入口”。用户更关注技能成长之后能不能带来额外收入、接单机会和作品集提升，因此内容重点不是职场效率，而是技能商业化。\n\n02｜为什么要这样拆账号，而不是都放在一个号里讲\n- 因为这三类人虽然都可能买课，但购买动机完全不同。有人为提效付费，有人为焦虑付费，有人为副业机会付费。\n- 如果把所有需求混在同一个账号里，内容会很杂，用户也很难快速判断“这个号是不是在讲我的问题”。\n- 拆分账号后，每个号都能持续强化单一心智，让用户一进来就知道这个号在解决什么问题，从而提升打开、停留和后续转化效率。\n\n03｜这套矩阵的运营策略，不是“发内容”，而是“分层承接”\n- 前端策略：用不同入口切人群。Excel职场更适合承接职场白领和提效需求，闯关学Excel更适合承接 AI 危机感与技能升级需求，秒可商业插画设计师则更适合承接创意类副业与接单需求。\n- 中段策略：把抽象技能翻译成可感知收益。不是单讲“学 Excel”“学 AI”“学插画”，而是讲清楚这些能力能带来什么结果，比如少加班、做得更快、提高表达效率、增加接单机会、提升收入想象空间。\n- 后端策略：用轻决策产品先完成第一次转化。内容不直接硬推高价产品，而是先用低门槛课程、福利包、限时活动等方式完成第一次成交，再导入后续课程与服务体系。\n\n04｜从内容运营角度，这三个账号分别怎么分工\n- Excel职场负责建立“效率价值感”。内容更适合围绕职场场景、办公提效、实际工具应用展开，让用户先相信这项能力能立刻改善工作状态。\n- 闯关学Excel负责放大“升级必要性”。它承担的是催化作用，让用户意识到学习不只是加分项，而是应对变化的必要动作。\n- 秒可商业插画设计师负责建立“变现想象力”。它承接的是更偏增长和收入导向的人群，让用户从“喜欢技能”进一步走向“愿意为技能投入”。\n\n05｜这条项目真正可复用的方法论\n- 先拆需求，而不是先堆账号。账号数量本身没有价值，关键是每个账号是否承接了清晰的人群与问题。\n- 先做心智占位，再做课程转化。只有用户先认可“这个号讲的就是我当前最关心的问题”，后续转化才会自然发生。\n- 用统一结构提高运营效率。虽然账号定位不同，但底层都遵循同一套逻辑：降低点击门槛、放大行动理由、强化结果感、再用低门槛产品承接。\n- 把公众号当成业务转化链的一环，而不是孤立内容阵地。它前面接流量，后面接成交，中间承担的是说服与筛选作用。\n\n06｜从项目价值看，这条案例说明了什么\n- 它说明服务号矩阵最重要的不是“内容多”，而是“定位清”。\n- 它说明同一套课程业务，可以通过不同账号切入不同需求，而不是依赖单一表达反复触达所有人。\n- 它也说明公众号运营不是单篇爆文思路，而是账号定位、内容策略、转化路径三者协同之后，才能稳定放大业务结果。`,
    imageUrl: "document",
    bgColor: "bg-[#FDCC0D]", // Yellow
    shadowColor: "bg-[#000000]", // Black
    metrics: [
      { label: "Excel单篇点击", value: "10W+", growth: "多篇10w+" },
      { label: "新增粉转化率", value: "71.43%", growth: "起跑点3.7%" },
      { label: "营销推文打开", value: "43.8%", growth: "行业纪录级" }
    ],
    challenges: [
      "传统服务号推文如果直接讲课程卖点，很容易在标题层就被用户划走，打开率和转化率都难以起量。",
      "同一套课程面向的用户动机并不相同：有人要提效、有人怕掉队、有人想做副业，如果内容入口过于单一，转化效率会明显受限。"
    ],
    solutions: [
      "按账号定位拆分内容入口：`Excel职场` 主打效率提效，`闯关学Excel` 主打 AI 生存焦虑，`秒可商业插画设计师` 主打副业与技能变现，避免同质化表达。",
      "统一文章转化结构：热点标题切入 → 情绪/趋势放大 → 场景收益演示 → 课程福利与限时钩子承接，让每篇文章都更像可转化的销售页。",
      "在正文中反复强化具体收益场景，如 PPT、Excel、数据复盘、图片生成、视频制作、插画接单等，让课程价值从抽象能力变成看得见的结果。"
    ],
    achievements: [
      "把服务号文章从单纯推送内容，升级为“可点击、可说服、可承接”的转化型长图文，显著提升课程项目的内容承接效率。",
      "跑通了“热点借势 + 场景证明 + 低门槛转化”的内容模型，使 Excel、AI 与插画等不同技能产品都能套用同一套转化逻辑。",
      "在原有数据基础上，进一步证明公众号矩阵不是只靠单篇爆文，而是可以通过分账号定位与统一转化结构，持续提高打开、留存与进粉转化表现。"
    ]
  },
];

export const WORKS_DATA: WorkPost[] = [
  {
    id: "work_01",
    title: "【自然原木侘寂风】越简单越好看🏠",
    platform: "Xiaohongshu",
    publishDate: "2025-11-08",
    category: "家居设计 | 自然原木侘寂风",
    likes: "250",
    collects: "253",
    comments: "18",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20interior%20photography%2C%20minimalist%20wabi-sabi%20living%20room%2C%20natural%20oak%20wood%20furniture%2C%20warm%20beige%20textured%20plaster%20walls%2C%20linen%20sofa%2C%20stone%20coffee%20table%2C%20soft%20morning%20sunlight%2C%20calm%20neutral%20palette%2C%20high-end%20editorial%20style%2C%20subtle%20film%20grain%2C%2035mm%20lens%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://www.xiaohongshu.com/discovery/item/68fb6ccd000000000301bbf5?source=webshare&xhsshare=pc_web&xsec_token=ABBteH6sMXEdDmWMubQX1DkNdxrj-teGx62V0x9QRceZI=&xsec_source=pc_share",
    bgHex: "#CBA37A",
    summary: "这篇内容不是空泛讲风格，而是把“自然原木侘寂风”拆成一套可照搬的空间表达：米白、浅灰、原木三色定调，再按客厅、书房、餐厅、厨房、玄关、卫生间逐个落到材质、尺寸和细节处理上，兼顾氛围感与实用性。",
    richContent: {
      paragraphs: [
        "这条笔记的核心钩子是“越简单越好看”，它精准击中了装修用户最常见的焦虑：越做越满、越堆越乱。作者没有只讲审美概念，而是把侘寂风翻译成普通人能理解的做法，让风格从“好看但不会装”变成“能直接参考”。",
        "正文非常适合收藏，因为它不是抽象描述，而是空间逐项拆解：客厅讲沙发包裹感，书房讲走线槽，餐厅讲吊灯下垂和木纹方向，厨房讲台面和圆弧收口，玄关讲透气缝，卫生间讲防水沿。每一段都兼顾氛围和功能，信息密度很高。",
        "从运营角度看，这类家居内容的强点在于“风格名词 + 场景细节 + 可私信领取资料”。前面用风格抓点击，中段用具体尺寸和材质留住用户，最后再用《原木侘寂风私宅装修指南》承接高意向咨询，形成完整转化链路。"
      ],
      tips: [
        "家居类标题里，“越简单越好看”这类低门槛审美结论，比纯风格术语更容易被点开。",
        "高收藏的关键不只是效果图，而是给出可执行细节：材质、尺寸、收口、配色、功能优化。",
        "这类卡片很适合承接“私信领装修指南/材料清单”，比直接硬转化更自然。"
      ]
    }
  },
  {
    id: "work_02",
    title: "那些不加班的人，是怎么做Excel的？",
    platform: "WeChat",
    publishDate: "公众号文章",
    category: "职场提效 | Excel",
    likes: "—",
    collects: "—",
    comments: "—",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20modern%20office%20desk%20at%20sunset%2C%20laptop%20showing%20spreadsheet%20dashboard%20with%20blurred%20cells%2C%20tidy%20workspace%2C%20coffee%20cup%2C%20desk%20clock%2C%20warm%20natural%20light%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://mp.weixin.qq.com/s/sm2NFO2lkiR5Xk61EM2cDQ",
    bgHex: "#A3E635",
    summary: "用“别人还在加班做表，你已经1分钟搞定”的强对比，快速把读者带进“Excel提效=不加班”的结果叙事，并用闯关式课程/资料包/社群督学完成转化。",
    richContent: {
      paragraphs: [
        "开头用“效率差=加班”的职场焦虑做钩子：同样的核对、跨表查询、做统计表，有人按小时熬夜，有人按分钟完成，制造强烈阶层差。",
        "中段用清单式场景对照（核对数据/跨表找数/做统计表）把“提效点”具体化，再用“每天20分钟”“闯关式学习”等机制降低学习门槛。",
        "后段给出“教研背书 + 1v1督学社群 + 资料包赠送 + 课程安排/学员评价”的组合拳，把“想学”推进到“现在就行动”。"
      ],
      tips: [
        "标题公式：结果（不加班）+方法（怎么做Excel）比“学Excel”更容易打开。",
        "正文先给3个可感知的“痛点场景对照”，再给1个“低门槛学习方案”，转化更顺。",
        "卖课型内容一定要“堆价值”而不是“堆口号”：学习模式、督学机制、资料包、课程安排、学员反馈缺一不可。"
      ]
    }
  },
  {
    id: "work_03",
    title: "如何有效率地制作 PPT？",
    platform: "Zhihu",
    publishDate: "知乎回答",
    category: "知乎回答拆解 | PPT提效",
    likes: "134",
    collects: "762",
    comments: "13",
    clicks: "248万",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20productivity%20desk%20setup%2C%20laptop%20showing%20presentation%20slides%20with%20blurred%20text%2C%20keyboard%20and%20shortcut%20cheat%20sheet%2C%20sticky%20notes%2C%20clean%20office%20lighting%2C%20modern%20editorial%20photography%2C%20high%20contrast%2C%20subtle%20film%20grain%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://www.zhihu.com/question/20499534/answer/2230526674",
    bgHex: "#0066FF",
    summary: "这篇回答不是空谈“多练就会了”，而是把 PPT 提效拆成可立刻执行的动作清单：快捷键、格式刷、自动恢复、默认版式清理，以及插件工具库，一口气解决“做得慢、容易乱、还总返工”的核心问题。",
    richContent: {
      paragraphs: [
        "内容结构很典型：先用“做 PPT 总加班、效果还差”的高频痛点建立共鸣，再连续给出可执行的小技巧，降低读者的理解门槛和行动门槛。",
        "中段的核心价值在于“立刻可用”。回答没有堆设计理论，而是直接给出快捷键、格式刷、自动恢复设置、删除默认版式这类操作级建议，让读者读完就能马上上手。",
        "后半段再补上 iSlide、口袋动画、OneKeyTools、PPT 美化大师等工具资源，最后顺势延展到系统学习路径，形成“先给干货，再给进阶方案”的完整转化链路。"
      ],
      tips: [
        "高效内容的关键不是讲“大道理”，而是优先输出“马上能省时间”的动作型建议，用户更容易收藏。",
        "适合做卡片的拆解顺序是：常用快捷键 → 格式统一 → 自动保存 → 空白版式 → 插件推荐，天然就是一套信息清单。",
        "如果要继续优化成作品卡，可把主题进一步提炼成“PPT 提效 5 步法”，强化截图收藏和快速浏览价值。"
      ]
    }
  },
  {
    id: "work_04",
    title: "EXCEL学习的顺序是什么？",
    platform: "Zhihu",
    publishDate: "知乎回答",
    category: "知乎回答拆解 | Excel学习路径",
    likes: "2.6万",
    collects: "14.2万",
    comments: "197",
    clicks: "708万",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20excel%20learning%20roadmap%20workspace%2C%20laptop%20showing%20spreadsheet%20dashboard%20with%20blurred%20cells%2C%20notebook%20with%20a%20hand-drawn%20skill%20tree%20diagram%2C%20pen%20and%20highlighter%2C%20clean%20desk%2C%20bright%20daylight%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://www.zhihu.com/question/29086276/answer/606445896",
    bgHex: "#217346",
    summary: "这篇回答的价值不在于零散技巧，而在于把 Excel 学习顺序梳理成一棵完整技能树：先打牢软件基础操作，再进函数、图表、数据透视表，最后再进入 VBA，把“学什么、先后顺序、掌握程度”一次讲清。",
    richContent: {
      paragraphs: [
        "回答最大的亮点是把 Excel 从“东学一点、西学一点”的碎片状态，整理成清晰学习路径：软件基础操作、函数进阶、图表基础、数据透视表、实战应用、VBA 编程，天然适合做成可收藏的路线型内容。",
        "在基础部分，作者强调排版、单元格格式、数据分列/验证、序列填充、查找替换、文档保护与打印，这些内容不花哨，但决定了新手能否真正看懂和操作 Excel。",
        "中后段把常用函数、图表、数据透视表分别拆成模块，再补充官方函数文档和课程入口，形成“学习顺序 + 知识地图 + 资源承接”的完整内容结构，收藏价值非常高。"
      ],
      tips: [
        "最适合卡片化呈现的主线是：基础操作 → 常用函数 → 图表 → 数据透视表 → VBA，顺序越清晰，用户越容易判断自己该学到哪一步。",
        "这类内容的核心不是炫技巧，而是帮用户建立“知识地图”，所以比起堆案例，更适合用阶段拆解和模块清单来表达。",
        "卡片摘要要直接点出“学习顺序”和“技能树”两个关键词，这正是用户最愿意收藏和转发的价值点。"
      ]
    }
  },
  {
    id: "work_05",
    title: "【北京旧房翻新】前任以为我在北京过得很差…",
    platform: "Xiaohongshu",
    publishDate: "2025-11-14",
    category: "北京旧房翻新 | 老破小改造",
    likes: "1007",
    collects: "191",
    comments: "68",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20split-screen%20before%20and%20after%20renovation%20of%20a%20small%20Beijing%20old%20apartment%2C%20left%20side%20dated%20cramped%20interior%2C%20right%20side%20bright%20minimal%20modern%20warm%20wood%20design%20with%20built-in%20storage%2C%20natural%20daylight%2C%20editorial%20photography%2C%2035mm%20lens%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://www.xiaohongshu.com/discovery/item/690d6734000000000700198e?source=webshare&xhsshare=pc_web&xsec_token=ABIKdSWypFm-rid9Z39I2dGsZlR9U82Unsbiy_1qa4Vag=&xsec_source=pc_share",
    bgHex: "#F59E0B",
    summary: "标题用“前任以为我在北京过得很差”的情绪反差做开场，把用户注意力拉进来；内容核心是北京老破小翻新前后对比：用可视化的“翻新成果”证明生活状态，并顺带承接咨询型需求（评论区回复预算约 15W，仅供参考）。",
    richContent: {
      paragraphs: [
        "这条笔记把“生活过得好不好”用空间结果直接可视化：用“外部条件一般/内部翻新惊喜”的反差，满足围观心理，同时让用户自然接受“旧房翻新是可被实现的”。",
        "内容结构本质是“情绪钩子 → 前后对比 → 改造逻辑 → 引导咨询”。观众先被标题吸引，再被翻新成果留住，最后在评论区追问预算、工期和可复制方案。",
        "评论区出现了高频问题：多少钱、值不值、老楼管道/油烟/邻居影响怎么处理。这类问题本身就是二次内容素材，适合继续做“北京旧房翻新答疑”系列承接流量。"
      ],
      tips: [
        "旧房翻新内容最强的表达是“前后对比”：外观平平无奇 vs 室内别有洞天，天然提升停留与转发。",
        "在卡片里优先呈现可回答的问题：预算区间、工期、关键改造点、避坑项，比单纯展示效果更容易促评论。",
        "把评论区高频问题沉淀成下一条内容标题（比如“老楼油烟/管道怎么解决”），能稳定续航该系列。"
      ]
    }
  },
  {
    id: "work_07",
    title: "拜托啊😭做PPT一定要会用工具啊❗️❗️",
    platform: "Xiaohongshu",
    publishDate: "2026-05-30",
    category: "职场提效 | PPT素材工具",
    likes: "2.7万",
    collects: "3.9万",
    comments: "1275",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20presentation%20toolkit%20workspace%2C%20laptop%20showing%20a%20slide%20template%20library%20with%20blurred%20thumbnails%2C%20icons%20and%20stock%20photo%20cards%20on%20screen%2C%20color%20swatches%2C%20clean%20desk%2C%20bright%20daylight%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "http://xhslink.com/o/7lxKZFIqni9",
    bgHex: "#FDCC0D",
    summary: "用“做PPT天天加班”的情绪钩子，抛出解决方案：别从零开始堆积木，先把模板、图片等素材库建好，效率直接翻倍。",
    richContent: {
      paragraphs: [
        "开头用“老实人做PPT=效率低下天天加班”的对比图强拉共鸣，把痛点从“不会设计”改写成“没工具没素材”。",
        "内容中段直接给“PPT素材库”清单式输出，强调即使是 PPT 小白也能用工具快速做出更专业的效果。",
        "结尾用编号清单强化收藏价值，把“哪里找素材/怎么不侵权”这类高频问题一次性打包解决。"
      ],
      tips: [
        "素材库优先级：模板 > 无版权图片 > 图标/插画 > 字体，先解决 80% 场景再精修。",
        "清单要做成“可截图页”，编号 + 关键词，评论区更容易被反复引用。",
        "封面用“前后对比+大字痛点”，让用户一眼知道是“省时间”的内容。"
      ]
    }
  },
  {
    id: "work_08",
    title: "哭了啊😭学Excel前有人告诉我这些多好啊",
    platform: "Xiaohongshu",
    publishDate: "2024-02-18",
    category: "Excel自学 | 7天入门攻略",
    likes: "2.8万",
    collects: "2.3万",
    comments: "243",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20excel%20beginner%20starter%20kit%20desk%2C%20laptop%20showing%20spreadsheet%20with%20blurred%20cells%2C%20printed%20cheat%20sheet%20and%20sticky%20notes%2C%20notebook%20with%207-day%20plan%20checkboxes%2C%20bright%20daylight%2C%20clean%20editorial%20photography%2C%20high%20contrast%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "http://xhslink.com/o/247Z9DQz4WA",
    bgHex: "#FF6B6B",
    summary: "这条内容核心卖点不是单个技巧，而是一份“Excel 新手 7 天自学导航包”：从界面认知、快捷键、常用函数到办公技巧和图表入门，帮零基础用户快速建立一套能直接照着学的入门路径。",
    richContent: {
      paragraphs: [
        "标题先抓住“学 Excel 前没人告诉我”的后悔情绪，再把内容包装成“新手宝藏导航”，天然适合吸引零基础用户停留和收藏。",
        "正文非常标准地用了清单式结构：自学计划、界面认知、常用快捷键、函数汇总、办公技巧、图表选择、基础案例，信息组织清楚，降低了用户的执行门槛。",
        "这类内容的高转发点在于，它不是教一个功能，而是给“从哪开始学”的路线答案，所以特别适合做成可截图、可私信索要的资料型笔记。"
      ],
      tips: [
        "标题公式很有效：后悔情绪 + 学习捷径，比纯知识标题更容易出收藏。",
        "清单顺序建议固定为：认界面 → 学快捷键 → 学函数 → 学办公技巧 → 学图表，最符合新手认知。",
        "这类卡片的承接动作适合写成“求资料/求电子版”，评论区天然容易形成高互动。"
      ]
    }
  },
  {
    id: "work_10",
    title: "文员刚需技能❗掌握Excel🔥工作效率翻倍",
    platform: "Xiaohongshu",
    publishDate: "2022-11-26",
    category: "Excel技能 | 文员提效训练营",
    likes: "1.3万",
    collects: "1.6万",
    comments: "1567",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20admin%20office%20desk%20scene%2C%20laptop%20showing%20a%20spreadsheet%20and%20charts%20with%20blurred%20cells%2C%20stack%20of%20documents%2C%20checklist%20notepad%2C%20clean%20workspace%2C%20bright%20daylight%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "http://xhslink.com/o/3BXFNE31qMp",
    bgHex: "#0066FF",
    summary: "这条笔记直接把“文员为什么一定要学 Excel”说透了：不是为了炫技能，而是为了减少无效加班。内容用训练营入口承接，把数据透视表、函数、图表、制表基础和数据分析打包成一套能立刻提升效率的能力清单。",
    richContent: {
      paragraphs: [
        "开头连续用几个对照问句制造强代入感：别人十分钟搞定表格，你却要一小时；别人下班了，你还在犹豫要不要继续加班，这种差距感非常适合职场提效赛道。",
        "中段把课程收益直接写成模块清单：数据透视表、函数公式、可视化图表、制表基础、图表美化和数据分析直播课，让用户快速判断“这东西值不值得学”。",
        "收尾再叠加“1 元、4 天、每天 1 小时、AI 交互式课程、送资料模板”这些低门槛转化点，把焦虑流量顺势推进到报名动作。"
      ],
      tips: [
        "职场类内容最有效的钩子之一就是“时间差距”：别人 10 分钟，你 1 小时。",
        "训练营转化笔记最好把收益模块直接写在封面或正文前半段，减少用户理解成本。",
        "这类内容后续最适合拆成系列：透视表一条、函数一条、图表一条，持续承接评论区高意向用户。"
      ]
    }
  },
  {
    id: "work_11",
    title: "职场人怎么学Excel❓这个1元课程不要太香‼",
    platform: "Xiaohongshu",
    publishDate: "2026-05-30",
    category: "Excel技能 | 入门课",
    likes: "3450",
    collects: "3711",
    comments: "475",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20smartphone%20on%20desk%20showing%20a%20learning%20app%20interface%20with%20blurred%20spreadsheet%20exercise%2C%20small%20coin%20next%20to%20phone%2C%20notebook%20checklist%2C%20pen%2C%20clean%20daylight%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://www.xiaohongshu.com/explore/636b4336000000000601c910",
    bgHex: "#F59E0B",
    summary: "用“1元get职场必备Excel技能”做低门槛转化钩子，围绕“学什么/先学哪些函数/去哪学”三个核心问题给出路径建议。",
    richContent: {
      paragraphs: [
        "内容把用户最常问的三类问题打包回答：学习Excel主要学哪些内容、Excel函数那么多先学哪些、哪里有学习渠道。",
        "强调“全新AI交互式课程体验”，把学习过程从枯燥变成“可对话+可实操”的产品卖点。",
        "封面采用大字+模块清单的强信息型排版，降低决策成本，直接推用户进入“收藏/下单/关注”的动作。"
      ],
      tips: [
        "转化文案三件套：低门槛价格 + 明确收益（不加班） + 解决路径（学什么/怎么学）。",
        "把“常见问题”写成标题/小标题，天然适配搜索流量。",
        "评论区用“要学习路线/函数清单”做关键词承接更稳。"
      ]
    }
  },
  {
    id: "work_14",
    title: "抗癌七年，慢慢懂得身体的底气藏在营养里",
    platform: "Xiaohongshu",
    publishDate: "01-19",
    category: "肿瘤营养 | 抗癌长期记录",
    likes: "32",
    collects: "14",
    comments: "2",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20warm%20kitchen%20counter%20still%20life%2C%20glass%20of%20nutrition%20shake%2C%20fresh%20fruit%2C%20simple%20bowl%2C%20notebook%20and%20pen%2C%20soft%20morning%20light%2C%20calm%20neutral%20palette%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "http://xhslink.com/o/8eaMK1XSvBc",
    bgHex: "#8B5CF6",
    summary: "这条内容并不是泛泛聊“抗癌心态”，而是围绕放化后最具体的一个现实难题展开：胃口差、味觉苦、营养跟不上。作者用个人长期经历引出对营养粉口味、配方和体感反馈的真实筛选过程，重点落在“找到自己身体能接受的营养支持”。",
    richContent: {
      paragraphs: [
        "标题里的“七年”天然提供了长期可信度，让读者默认这不是一次性的种草，而是有时间沉淀的身体经验复盘。",
        "正文写法很克制，没有直接夸大功效，而是先写“甜到发腻、腥气重、入口负担大”这些具体问题，再过渡到自己能接受的口味和体感变化，可信度会更高。",
        "内容最终传达的不是某个单品有多神，而是“营养补对了，人会更有坚持下去的底气”，这是一种更容易被病友群体接受的叙事方式。"
      ],
      tips: [
        "病程类内容最重要的是细节真实：味觉变化、食欲状态、入口负担，比空泛感受更打动人。",
        "涉及营养产品时，把结论落在“个人适配”而不是绝对疗效，更稳也更可信。",
        "这类内容适合延展成系列：胃口差怎么办、体力恢复、营养补充、日常陪伴感。"
      ]
    }
  },
  {
    id: "work_15",
    title: "连吃一周，白细胞蹭蹭涨！",
    platform: "Xiaohongshu",
    publishDate: "2025-02-26",
    category: "饮食疗法 | 升白食谱",
    likes: "2029",
    collects: "2298",
    comments: "21",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20home-cooked%20soup%20and%20porridge%20meal%20prep%20scene%2C%20steaming%20bowl%20of%20soup%2C%20ingredients%20on%20wooden%20table%2C%20cozy%20kitchen%20lighting%2C%20clean%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "http://xhslink.com/o/3JgQNTs8npb",
    bgHex: "#0EA5E9",
    summary: "这条笔记用“连吃一周，白细胞蹭蹭涨”做强结果钩子，核心内容是一组适合身体调养阶段的升白汤/营养食谱合集：鸡汤、牛尾汤、乌鸡汤、南瓜玉米粥等，主打“做法简单、容易收藏、适合持续参考”。",
    richContent: {
      paragraphs: [
        "封面和标题都把结果导向拉满，先不讲原理，直接告诉用户“这是一条升白食谱合集”，非常符合小红书饮食疗法内容的点击逻辑。",
        "正文把多款汤品按菜名逐条列出，每一道都给到一句非常直观的好处解释，像“滋养身体”“补充气血”“容易消化”，用户几乎不用思考就能判断值不值得收藏。",
        "评论区之所以容易起讨论，是因为这类内容天然带争议和经验补充属性，别人会继续追问“鸡肉能不能吃”“白细胞高低怎么看”“还有什么食谱”，所以互动通常不低。"
      ],
      tips: [
        "食谱类最强模板之一就是“结果承诺 + 多方案合集”，天然适合做收藏型内容。",
        "每道菜都给一句最短理由，比长篇营养科普更适合平台浏览习惯。",
        "涉及身体指标时，结尾补一句“个体差异/遵医嘱”，更能稳住信任感。"
      ]
    }
  },
  {
    id: "work_17",
    title: "B站员工深夜猝死，年仅25岁......",
    platform: "WeChat",
    publishDate: "公众号文章",
    category: "职场健康 | 反加班叙事",
    likes: "—",
    collects: "—",
    comments: "—",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20late-night%20office%20scene%2C%20empty%20chair%2C%20computer%20monitor%20glowing%2C%20desk%20lamp%2C%20clock%20showing%202am%2C%20dark%20moody%20lighting%2C%20cinematic%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://mp.weixin.qq.com/s/wlgpnsR5yGrTrdUpAVWwcg",
    bgHex: "#60A5FA",
    summary: "用极端新闻事件做“加班焦虑”开场，迅速把读者情绪推到峰值，再把解决方案落回“用Excel提效，把时间还给生活”的可执行路径。",
    richContent: {
      paragraphs: [
        "强钩子策略：用“25岁猝死”这种高冲击标题抢占注意力，第一屏直接完成情绪定调（恐惧+愤怒+共鸣）。",
        "叙事转折：从“加班/内耗”切换到“可控变量=效率”，把问题从宏观制度拉回到个人可行动的技能升级。",
        "转化收口：用“课程安排/你将获得/学员评价”三段式，补齐信息，降低决策成本，引导读者完成下一步（扫码/报名/进群）。"
      ],
      tips: [
        "社会新闻型标题要注意措辞：少下结论、多给行动路径，避免引战与争议。",
        "情绪钩子之后必须立刻给“可执行解法清单”，否则用户只会停留在情绪发泄。",
        "课程转化文案优先写“你能省下什么时间/避免什么痛苦”，而不是写“我们很专业”。"
      ]
    }
  },
  {
    id: "work_18",
    title: "23岁胃癌姑娘叫醒6亿网友！996工作制真的会死人！",
    platform: "WeChat",
    publishDate: "2022-01-12",
    category: "职场健康 | 反996叙事",
    likes: "—",
    collects: "—",
    comments: "—",
    clicks: "—",
    coverImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ultra%20realistic%20overtime%20office%20desk%20scene%2C%20calendar%20and%20stack%20of%20papers%2C%20laptop%20with%20spreadsheet%20and%20charts%20blurred%2C%20cold%20fluorescent%20lighting%2C%20late%20night%20mood%2C%20editorial%20photography%2C%20high%20contrast%2C%20no%20text%2C%20no%20logo%2C%20no%20watermark%2C%20no%20people&image_size=landscape_4_3",
    sourceUrl: "https://mp.weixin.qq.com/s/mgPlMe5GjBJucSNGuMr0nQ",
    bgHex: "#FB923C",
    summary: "用“年轻+重病”的反差制造强震撼，围绕“996透支健康”的集体焦虑做扩散，再把解决路径收束到“学会Excel等硬技能→提高效率→减少无效加班”。",
    richContent: {
      paragraphs: [
        "传播底层：用“23岁”“胃癌”“6亿网友”三连击做权威与规模感，强化“这不是个例”从而扩大共鸣面。",
        "内容结构：先讲风险与代价，再讲“怎么自救”，把“健康焦虑”转成“技能投资”，让读者产生“我也该开始”的行动冲动。",
        "产品承接：用图文长页承接信息密度，把课程卖点拆成模块化信息（学习方式/陪跑/资料/安排），适合在朋友圈被截图二次传播。"
      ],
      tips: [
        "健康议题最好加一句“个体差异/理性看待”，减少被质疑与举报风险。",
        "从“制度问题”转到“个人解法”时，要明确：提效不是为加班服务，而是为了拿回生活。",
        "长图卖点建议按“学习门槛→能解决的场景→你将获得→口碑证明”排序，读者更好扫读。"
      ]
    }
  }
];

export const EXPERIENCES_DATA: ExperienceType[] = [
  {
    id: "exp_01",
    period: "2025.04 - 2026.04",
    company: "贝壳找房（北京）科技有限公司",
    role: "装修 AI 产品运营",
    description: "负责装修 AI 产品的体验评测与迭代推进：搭建 badcase/案例样本库与问题分级口径，排查对话交互逻辑并优化模型输出；联动研发完成关键链路 A/B 优化、版本验收与上线复盘，推动用户反馈转化为可执行的产品需求。同步从 0 到 1 搭建小红书种草矩阵（设计师 KOS + 素人赛道），首周视频播放 50W+、累计曝光 500W+；沉淀可复用的内容素材与话术 SOP，私信承接“种草→咨询/留资”闭环，优化视频前 2s 退出率 62%→28.4%。",
    logoBg: "bg-[#FF6B6B]",
    iconType: "growth"
  },
  {
    id: "exp_02",
    period: "2024.03-2025.01",
    company: "北京阳光全息健康管理有限公司",
    role: "新媒体运营（营养品增长）",
    description: "从 0 到 1 搭建小红书种草矩阵与素材中台，跨平台店铺月 GMV 实现 1028% 增长（单月 7.9 万）；使用 RPA-GPT-Python 搭建自动化内容生产与分发流程，配合投放复盘与关键词策略，提升内容曝光与转化效率。",
    logoBg: "bg-[#FDCC0D]",
    iconType: "viral"
  },
  {
    id: "exp_02b",
    period: "2023.04-2023.11",
    company: "南京医格尔信息科技有限公司",
    role: "文案策划（医疗科研服务）",
    description: "负责 50W+ 体量服务号「小狗阅读」的图文运营，面向医生群体优化内容选题、打开率与点击转化表现；深度分析用户群体的需求、结构与阅读偏好，输出更贴合医生决策场景的文案表达与内容策略；基于数据反馈持续迭代内容选题、标题与分发节奏，通过效果评估和用户反馈优化内容表现；任职期间累计新增用户 8000+，头条活动转化率最高提升至 20%+。",
    logoBg: "bg-[#A3E635]",
    iconType: "edit"
  },
  {
    id: "exp_03",
    period: "2021.07-2022.11",
    company: "广州秒可科技有限公司",
    role: "新媒体运营（职教/办公提效）",
    description: "从 0 到 1 搭建小红书内容矩阵，主理账号（PPT/Excel 提效方向）累计实现 40 万+ 课程增收、100 万+ 图文曝光、200 万+ 视频播放；同时负责公众号运营与转化链路优化，推动投放页转化率与咨询效率提升。",
    logoBg: "bg-[#3B82F6]",
    iconType: "edit"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    name: "平台内容运营与增长策略",
    score: 94,
    details: [
      "覆盖小红书/公众号/知乎内容生态：定位、人设、选题、脚本、封面到发布节奏的全链路操盘。",
      "擅长把内容目标写进增长指标：以收藏/私信/留资/成交为导向设计内容结构与承接动作。"
    ]
  },
  {
    name: "数据分析与增长实验",
    score: 90,
    details: [
      "熟悉 GMV、转化漏斗与关键路径指标拆解，能用 A/B 测试与复盘机制驱动迭代。",
      "结合站内搜索/关键词趋势与投放数据回流，优化标题词库与内容分发策略。"
    ]
  },
  {
    name: "AIGC 提效与自动化工作流",
    score: 92,
    details: [
      "熟悉 MJ/SD/LLMs 与 Prompt 工作流，将 AIGC 用于选题发散、脚本、素材生成与版本迭代提速。",
      "能使用 RPA-GPT-Python 等方式搭建自动化内容生产/整理/分发流程，提升交付稳定性。"
    ]
  },
  {
    name: "产品运营与用户研究",
    score: 88,
    details: [
      "能把用户反馈沉淀为问题分级与需求列表，推进研发排期、验收与上线节奏。",
      "关注“可用、可理解、可转化”的产品体验，擅长在内容与产品之间搭建承接闭环。"
    ]
  },
  {
    name: "视觉表达与效率工具",
    score: 86,
    details: [
      "熟悉 PR/PS/Xmind 等工具，能快速完成封面、卡片、图文排版与基础剪辑交付。",
      "可建立模板化资产库与组件化产出规范，保证多账号矩阵风格一致与交付效率。"
    ]
  }
];
