import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Zap, Play, ArrowRight, 
  SlidersHorizontal, Terminal, Code, Cpu, Layers, 
  Image as ImageIcon, RefreshCw, Eye
} from 'lucide-react';

export default function AigcSection() {
  const [activeTab, setActiveTab] = useState<'workflow' | 'prompts' | 'demo'>('workflow');
  
  // Custom states for prompt builder
  const [imageKeywords, setImageKeywords] = useState<string>('通勤女孩, 奶油白键盘, 桌面好物');
  const [coverText, setCoverText] = useState<string>('通勤女孩桌面好物');
  const [imageStyle, setImageStyle] = useState<'cover' | 'lifestyle' | 'comparison'>('cover');
  const [imageCount, setImageCount] = useState<number>(3);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(0);
  const [activePromptIndex, setActivePromptIndex] = useState<number>(0);
  const [generatedGalleryUrls, setGeneratedGalleryUrls] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // States for AI interactive demo generator
  const [industry, setIndustry] = useState<string>('beauty');
  const [sellingPoint, setSellingPoint] = useState<string>('culture');
  const [hook, setHook] = useState<string>('workplace');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genProgress, setGenProgress] = useState<number>(0);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const wrapCanvasText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number
  ) => {
    const chars = text.trim().split('');
    const lines: string[] = [];
    let currentLine = '';

    chars.forEach((char) => {
      const nextLine = currentLine + char;
      if (ctx.measureText(nextLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = nextLine;
      }
    });

    if (currentLine) lines.push(currentLine);

    if (lines.length <= maxLines) return lines;

    const truncated = lines.slice(0, maxLines);
    const lastLine = truncated[maxLines - 1];
    truncated[maxLines - 1] = lastLine.length > 1 ? `${lastLine.slice(0, -1)}…` : `${lastLine}…`;
    return truncated;
  };

  const buildCompositeImageBlob = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return blob;

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    if (coverText.trim()) {
      const padding = Math.round(canvas.width * 0.06);
      const titleAreaHeight = Math.round(canvas.height * 0.3);
      const gradient = ctx.createLinearGradient(0, canvas.height - titleAreaHeight, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.82)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - titleAreaHeight, canvas.width, titleAreaHeight);

      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'top';
      ctx.font = `900 ${Math.round(canvas.width * 0.07)}px sans-serif`;
      const lines = wrapCanvasText(ctx, coverText, canvas.width - padding * 2, 3);
      const lineHeight = Math.round(canvas.width * 0.09);
      const textBlockHeight = lines.length * lineHeight;
      let currentY = canvas.height - padding - textBlockHeight;

      lines.forEach((line) => {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.lineWidth = Math.max(2, Math.round(canvas.width * 0.004));
        ctx.strokeText(line, padding, currentY);
        ctx.fillText(line, padding, currentY);
        currentY += lineHeight;
      });
    }

    return await new Promise<Blob>((resolve) => {
      canvas.toBlob((result) => resolve(result ?? blob), 'image/png');
    });
  };

  const copyImageToClipboard = async (imageUrl: string, index: number) => {
    try {
      const blob = await buildCompositeImageBlob(imageUrl);

      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type || 'image/png']: blob
          })
        ]);
      } else {
        await navigator.clipboard.writeText(imageUrl);
      }

      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      await navigator.clipboard.writeText(imageUrl);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  // AI product works
  const aiProductCards = [
    {
      id: 'decor-ai',
      title: "装修搭子·设牛",
      status: "点击整卡跳转",
      badge: "Readdy 预览",
      chip: "AI 装修需求梳理工具",
      color: "bg-[#FDE68A]",
      tone: "light",
      summary: "AI 装修需求梳理工具，当前链接内包含两个核心页面：微信聊天引导页与小程序欢迎页。",
      bullets: ["微信聊天引导页", "小程序欢迎页", "装修需求梳理", "服务引导入口"],
      previewUrl: "https://readdy.link/preview/06668812-37e9-4224-9545-0484b710774b/3807328"
    },
    {
      id: 'food-picker',
      title: "等会儿吃什么",
      status: "点击整卡跳转",
      badge: "在线访问",
      chip: "移动端随机选餐厅工具",
      color: "bg-[#C4B5FD]",
      tone: "light",
      summary: "面向手机端的随机吃饭决策小工具，支持地址搜索、附近餐厅检索、随机选店和一键导航。",
      bullets: ["地址搜索", "附近餐厅检索", "随机选店", "导航跳转"],
      previewUrl: "https://siyu.website/food-picker"
    }
  ];

  const xhsStyleOptions = {
    cover: {
      label: '封面冲击感',
      chip: '高点击封面',
      description: '适合小红书首屏封面，大主体、强反差、留出标题区。',
      promptTone: 'Xiaohongshu viral cover aesthetic, bold subject focus, scroll-stopping composition',
      composition: 'clear headline-safe negative space, clean background, strong hierarchy, high save-and-share potential',
      shotNotes: ['hero shot', '45-degree close-up', 'top-down tidy layout', 'editorial poster framing']
    },
    lifestyle: {
      label: '真实种草感',
      chip: '生活方式',
      description: '偏自然光与生活流，强调可信度和想收藏的质感。',
      promptTone: 'authentic Xiaohongshu lifestyle photography, natural light, realistic daily-use mood',
      composition: 'warm lived-in texture, relaxed composition, credible product storytelling, no over-retouching',
      shotNotes: ['handheld usage scene', 'window light flatlay', 'casual room corner shot', 'detail macro with props']
    },
    comparison: {
      label: '教程清单感',
      chip: '教程对比',
      description: '适合做前后对比、步骤拆解、合集清单型图文。',
      promptTone: 'Xiaohongshu tutorial card style, informative visual storytelling, swipe-worthy sequence',
      composition: 'before-after logic, multi-scene storytelling, clean annotation space, checklist-friendly layout',
      shotNotes: ['before vs after split scene', 'step-by-step collage', 'three-panel comparison', 'annotated clean demo shot']
    }
  } as const;

  // Midjourney Prompt Engineering Data
  const promptsCollection = [
    {
      title: "【真人出镜种草】生活方式主视觉",
      description: "最适合小红书首页点击的真人出镜图，强调人物状态、穿搭/动作和真实生活氛围。",
      tags: ["真人出镜", "种草封面", "生活方式"],
      promptBase: "Xiaohongshu lifestyle portrait photography",
      visualLanguage: "attractive young woman in a natural daily scene, expressive pose, clean styling, warm natural light, polished but realistic skin texture, high-end social media composition",
      shotVariants: ["half-body eye-contact portrait", "mirror selfie style framing", "walking-in-scene candid shot", "holding-product natural smile shot"],
      sampleImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=young%20stylish%20woman%20in%20a%20cozy%20minimal%20bedroom%2C%20xiaohongshu%20lifestyle%20photo%2C%20natural%20window%20light%2C%20soft%20cream%20and%20wood%20tones%2C%20realistic%20skin%20texture%2C%20clean%20composition%2C%20fashionable%20but%20authentic%2C%20vertical%20social%20cover&image_size=portrait_4_3"
    },
    {
      title: "【场景化好物】家居桌面陈列图",
      description: "适合小红书图文的静物种草图，突出空间氛围、单品质感和可直接抄作业的布置感。",
      tags: ["静物种草", "空间氛围", "好物陈列"],
      promptBase: "Xiaohongshu product lifestyle photography",
      visualLanguage: "beautiful styled tabletop or room corner, layered props, soft daylight, warm home atmosphere, realistic material details, premium but approachable mood",
      shotVariants: ["top-down flatlay arrangement", "desk corner styling shot", "close-up product texture shot", "clean shelf corner composition"],
      sampleImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=styled%20home%20desk%20setup%20with%20cream%20white%20keyboard%2C%20wooden%20desk%2C%20coffee%20cup%2C%20soft%20daylight%2C%20xiaohongshu%20product%20photography%2C%20warm%20cozy%20room%20corner%2C%20realistic%20materials%2C%20clean%20aesthetic%2C%20vertical%20social%20cover&image_size=portrait_4_3"
    },
    {
      title: "【干货教程对比】步骤拆解封面图",
      description: "适合前后对比、合集清单、改造步骤等内容，强调信息结构清晰和可收藏复用。",
      tags: ["教程对比", "干货合集", "可收藏"],
      promptBase: "Xiaohongshu tutorial cover design",
      visualLanguage: "clear before-after or step-by-step layout, neat modular composition, visual storytelling for social tutorial posts, realistic objects with clean annotation-safe space",
      shotVariants: ["before and after split layout", "three-step collage cover", "checklist-friendly comparison board", "organized transformation storyboard"],
      sampleImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=before%20and%20after%20home%20desk%20makeover%20cover%2C%20xiaohongshu%20tutorial%20style%2C%20clean%20split%20layout%2C%20organized%20visual%20storytelling%2C%20cream%20and%20wood%20color%20palette%2C%20realistic%20objects%2C%20save-worthy%20social%20graphic%2C%20vertical%20cover&image_size=portrait_4_3"
    }
  ];

  const buildPromptSeries = (
    recipe: typeof promptsCollection[number],
    keywords: string,
    styleKey: keyof typeof xhsStyleOptions,
    count: number
  ) => {
    const styleMeta = xhsStyleOptions[styleKey];
    const safeKeywords = keywords.trim() || 'Xiaohongshu product hero shot';
    const variationNotes = [
      'strong opening-frame composition',
      'clean blogger-style framing',
      'high save-rate cover composition',
      'social-first editorial arrangement',
      'shareable lifestyle storytelling',
      'comment-triggering detail focus',
      'premium but natural visual rhythm',
      'soft trending xiaohongshu atmosphere',
      'distinctive non-repetitive composition'
    ];
    const propNotes = [
      'subtle props for daily-life realism',
      'clear foreground-background layering',
      'highlighted texture and material detail',
      'balanced warm color accents',
      'gentle depth and visual breathing room',
      'structured visual focal point'
    ];

    return Array.from({ length: count }, (_, idx) => {
      const styleShot = styleMeta.shotNotes[idx % styleMeta.shotNotes.length];
      const recipeShot = recipe.shotVariants[idx % recipe.shotVariants.length];
      const variationNote = variationNotes[idx % variationNotes.length];
      const propNote = propNotes[idx % propNotes.length];

      return `${recipe.promptBase} of ${safeKeywords}, ${recipe.visualLanguage}, ${styleMeta.promptTone}, ${styleMeta.composition}, ${styleShot}, ${recipeShot}, ${variationNote}, ${propNote}, image variation ${idx + 1}, designed for Xiaohongshu social sharing, save-worthy and repost-friendly, realistic texture, reserve clean title-safe area for post overlay, absolutely no Chinese characters, no English letters, no typography, no fake glyphs, no watermark, text added only in post-production, vertical mobile-first framing --ar 3:4 --stylize 350 --chaos 12 --v 6.0`;
    });
  };

  const selectedRecipe = promptsCollection[selectedRecipeIndex];
  const selectedPromptList = buildPromptSeries(selectedRecipe, imageKeywords, imageStyle, imageCount);
  const safeActivePromptIndex = Math.min(activePromptIndex, Math.max(selectedPromptList.length - 1, 0));
  const activePromptText = selectedPromptList[safeActivePromptIndex];

  const buildGeneratedImageUrl = (promptText: string, idx: number) => {
    const imageSize = imageStyle === 'comparison' ? 'landscape_4_3' : 'portrait_4_3';
    const encodedPrompt = encodeURIComponent(promptText);
    return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=${imageSize}&t=${Date.now()}-${idx}`;
  };

  const handleGeneratePromptImages = () => {
    setGeneratedGalleryUrls(
      selectedPromptList.map((promptText, idx) => buildGeneratedImageUrl(promptText, idx))
    );
  };

  // Interactive AI results generator helper
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenProgress(0);
    setGeneratedResult(null);

    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            generateContent();
            setIsGenerating(false);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const generateContent = () => {
    // Generate simulated intelligent output based on dynamic choices
    const industryNames: Record<string, string> = {
      beauty: '美妆个护 / 国潮护肤',
      tech: '客制桌搭 / 数码周边',
      food: '新中式茶饮 / 本地小酒馆',
      lifestyle: '潮流穿搭 / 独立户外品牌'
    };

    const sellingNames: Record<string, string> = {
      organic: '天然原生力量与无害添加',
      value: '打破溢价的极致性价比平替',
      culture: '独特的主理人理想主义国潮怀抱',
      tech: '无可挑剔的硬核工学黑科技'
    };

    const hookNames: Record<string, string> = {
      workplace: '解救焦虑破防、熬夜晚起的打工人常态',
      geek: '拒绝大众潮流的极客小众文化优越感',
      emotion: '深夜微醺陪伴与无压力精神情绪自留地',
      gift: '拉满情绪价值与仪式感的绝佳好礼'
    };

    // Predefined smart templates
    const templates: Record<string, Record<string, any>> = {
      beauty: {
        workplace: {
          title: "熬夜垮脸拯救者！早八打工人的 5 分钟『新粗野』自重回春秘方",
          tagline: "千万别买那些动辄千元的熬夜霜，被暴利税收割！教你用 1/10 预算，打工人用大白话完成抗老高转单。",
          topic: "早八急速通勤妆 × 熬夜打工人急救。摒弃精美修图，用大面积色块高对比度的避坑视觉红利。",
          mjPrompt: "Neobrutalism collage style poster element, hands holding an amber medicine serum glass bottle dropper, glowing fluid droplets, vivid high contrast lavender neon purple and bright sun yellow background, bold comic book action effects, thick strokes --ar 3:4 --v 6.0",
          hookText: "‘熬夜加班到两点，早八依然要打卡开会，照镜子脸垮得像烂西红柿？’",
          script: `
[第1秒：痛点直勾] (画面展示：大黄字粗体『加班脸有救了』配以眼部微距照片)
“别再相信上千块的贵妇面霜了！大厂打工人每天高强度对着电脑十二小时，最需要不是去皱，而是【快速去黄气】和【无脑锁水】！”

[第10秒：AIGC核心配方] (画面展示：SD渲染的高饱和原料图，配红字『大白话看成分』)
“我们拆解出这个平价单品里的核心复合物——极速抗老多肽加深层积雪草。不跟你玩虚的，核心就是阻断熬夜红血丝和提供高强度水合。直接省掉了繁琐的5步水乳，早晨两滴搞定！”

[第20s：痛点转折]
“在小红书，大家都喜欢推荐昂贵精修照片。但这瓶没有铺天盖地广告费的‘小黄瓶’，才是不溢价的硬解法。评论区留【急救】我把打工人专享的高性价比配比发你！”
          `,
          seo: "#小红书爆文 #打工人早八 #成分党 #极简护肤 #熬夜急救 #性价比好物"
        },
        geek: {
          title: "拒绝大厂伪概念！成分党极极客冷硬护肤：只谈阻断公式和活性浓度",
          tagline: "护肤在极客眼里就是一个严谨的化学式。摒弃香精、摒弃花哨包装，只算核心靶向透皮率。",
          topic: "理工男/极客成分自研高冷文案，高冷科技灰配荧光橙视觉。",
          mjPrompt: "A sleek minimalist tech lab glass flask, inside a glowing blue serum, high contrast grid retro illustration, cyberpunk accents, bright neon orange outlines, highly technical graphics --ar 3:4 --v 6.0",
          hookText: "‘智商税还是真高能？用逻辑电路的严密性拆解一瓶精华，拒绝任何玄学吹嘘。’",
          script: `
[第1s-5s：硬核亮牌] (配发光实验烧杯与数据卡组)
“精修广告没法提高你的活性物透皮率。今天我们用10篇学术文献，直接拆解护肤界最大的暴利谎言……”

[第10s：数据反差]
“别看宣传写着99%浓度。真正看的是纳米级微脂囊的靶点包裹技术。没有这套技术，你涂在脸上全是废角质！我们的这个小众极客单品只谈这组黄金浓度配比：2.5%视黄醇加高纯蓝铜胜肽！”

[第25s：购买驱动]
“这是一瓶专门为拒绝交高额营销智商税、追求像素级科学护肤的极客准备的‘实验室常备瓶’。不用水军吹嘘，实测数据会让你心跳加速。”
          `,
          seo: "#成分党 #极客护肤 #科学护肤 #视黄醇 #研发人日志"
        }
      },
      tech: {
        geek: {
          title: "把赛博解压搬到底！我的折腾日常：24小时会发光的机械手感桌面玩具",
          tagline: "在狭窄的出租屋里，用几平方分米，搭建全网男粉心动、疯狂求链接的‘桌面解压精神角落’。",
          topic: "客制化解压缩，搭配发光霓虹和硬核声波，首创潮玩玩具展示流。",
          mjPrompt: "High-contrast commercial photography of custom glowing mechanical macro keyboard switches, transparent bright teal keycaps, vaporwave purple light trails, dark metallic desk, dramatic key light --ar 3:4 --v 6.0",
          hookText: "‘只要这个灯光亮起，我能一个人在桌前呆一整晚，这就是我最解压的精神庇护所。’",
          script: `
[前3s-声色起调] (伴随噼里啪啦客制化键盘沉浸式敲击声，深邃霓虹渐亮)
“每一个不愿在工作低头的极客，桌面都有他绝不向标准妥协的客制化玩具。这不单是一把发光小键盘，而是我抗衡无聊生活的武器……”

[第15s-独树一格] (红绿新粗野气泡框：『普通设备 vs 神级外设』数据对比)
“传统大厂总是堆参数，而我们追逐的是那一丝只属于个人的客制手感。全铝合金硬核描边，配上自制的超解压客制红轴，按压的瞬间，所有的KPI和繁重日志都被这一声敲击粉碎！”

[第30s-社群转化]
“我把桌面搭建用到的自训练 MJ 提示词和完整清单做成了表格。点下赞，评论区回复【桌面】，即刻发送给你，今晚就来打造你的精神飞地。”
          `,
          seo: "#桌面美学 #极客装备 #客制化键盘 #数码发烧友 #解压治愈"
        },
        emotion: {
          title: "深夜下班后的10厘米私密角落。极简暗色桌摆, 拯救每一个打工人的灵魂失焦",
          tagline: "白天是无能为力的螺丝钉，夜晚在这里和属于我的客制灯光、极酷香薰无缝链接，重新找回生活掌控权。",
          topic: "情绪共鸣软植入，暖洋洋的暗色系桌面，极致的生活治愈和自我关怀。",
          mjPrompt: "Cozy warm desktop setting, glowing small soft lamp light, visual vintage cassette tape player, thick bold outlines illustration, lofi background vibe, deep muted colors --ar 3:4 --v 6.0",
          hookText: "‘给紧绷了一天的灵魂，按下一个温柔的降载暂停键。’",
          script: `
[前5s-情绪切入] (慢节奏，Lo-Fi 背景音乐，暖黄台灯缓缓打亮桌面)
“你有算过吗？从写字楼格子间到那张出租屋的普通桌子，直线距离只有几公里，但确实隔开了紧绷的白天和松弛的黑夜。”

[第15s-温暖质感]
“我喜欢在这张小桌上点亮它。它不是普通的工业产品，而是融合了黑胶唱机和机械客制美学的精神玩物。每一个咬合的齿轮声，都很治愈。”

[第30s-私域闭环]
“在朋友圈，我们总在做别人眼中的成功标本。但在这一方寸之间，你只需做你自己。点击评论区，进群和同城 500 位也爱折腾桌子的朋友一起微醺交流。”
          `,
          seo: "#我的精神角落 #桌面美学 #治愈客制 #氛围感灯光 #小众潮玩"
        }
      }
    };

    // Fallback default dynamic templates if indices do not exist
    const defaultTemplate = {
      title: `【AIGC × 小红书】${industryNames[industry] || '创意行业'} - 突破瀑布流的爆款增长方案`,
      tagline: `融合 ${sellingNames[sellingPoint] || '产品优势'} 核心价值，利用 ${hookNames[hook] || '用户痛点'} 进行强有力的新媒体裂变转化。`,
      topic: `${industryNames[industry] || '该行业'}的‘AIGC 极致美学视觉化与脚本生成’`,
      mjPrompt: `Neobrutalism dynamic vibrant illustration of ${industryNames[industry] || 'subject'}, high contrast fluorescent colors, thick black borders, ripped textures, bold retro futuristic vector layout --ar 3:4 --v 6.0`,
      hookText: `打破行业常规模版，用情绪和数据指标，1小时实现高粘性种草。`,
      script: `
[0-5秒：黄金情绪开局] 
“如果你还在用小红书千篇一律的滤镜大片，难怪你一直在被边缘化。现在，用这一套结合 AIGC 荧光撞色的新丑视觉，你的转化率可以瞬间提高 4 倍……”

[6-20秒：核心价值展示]
“针对我们这款【${sellingNames[sellingPoint] || '极致单品'}】，别再去套那些沉闷的硬广词库。让 AI 去搜集用户在各大平台的破防评论，结合年轻人专用的讽刺、自制黑梗，直截了当输出真话。记住，大白话就是最高的转化信任！”

[21-30秒：爆款评论互动]
“我把自制的 Stable Diffusion 品牌定制 Lora 以及这套完整的 AI 生成工作流做成了一键运行模板，点赞本帖并在聊天室私信，免费拿走闭环方案！”
      `,
      seo: `#小红书冷启动 #AIGC提效 #运营干货 #新粗野主义 #内容飞轮 #品牌营销`
    };

    const selectedIndustry = templates[industry];
    const finalData = (selectedIndustry && selectedIndustry[hook]) ? selectedIndustry[hook] : defaultTemplate;
    
    // Inject the real names back
    setGeneratedResult({
      ...finalData,
      metaIndustry: industryNames[industry],
      metaSelling: sellingNames[sellingPoint],
      metaHook: hookNames[hook]
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-10 sm:space-y-12 animate-fade-in">
      
      {/* 1. Page Title & Brand Header */}
      <div className="text-center space-y-4">
        <span className="bg-[#8B5CF6] text-white text-xs font-mono font-bold px-3 py-1 border-2 border-black rounded-md neo-shadow-sm inline-block">
          AIGC & INTELLIGENT CONTENT PRODUCTION
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-black">
          AIGC 智能内容与{' '}
          <span className="bg-[#A3E635] text-black px-2 py-0.5 border-2 border-black rounded-lg inline-block neo-shadow-sm transform rotate-[-1deg] transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:rotate-0">
            视觉提效飞轮
          </span>
        </h2>
        {/* Level 2 Sub-Nav tabs */}
        <div className="pt-4 grid grid-cols-1 sm:flex justify-center gap-2 flex-wrap max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 text-xs sm:text-sm font-display font-bold border-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5
              ${activeTab === 'workflow'
                ? 'bg-black text-white border-black neo-shadow-sm -translate-y-[1px]'
                : 'bg-white text-gray-800 border-black hover:bg-violet-50'
              }`}
          >
            <Cpu size={14} />
            <span>AI 产品案例</span>
          </button>
          
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 text-xs sm:text-sm font-display font-bold border-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5
              ${activeTab === 'prompts'
                ? 'bg-black text-white border-black neo-shadow-sm -translate-y-[1px]'
                : 'bg-white text-gray-800 border-black hover:bg-violet-50'
              }`}
          >
            <Code size={14} />
            <span>提示词工程 (MJ)</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`px-4 py-2 text-xs sm:text-sm font-display font-bold border-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5
              ${activeTab === 'demo'
                ? 'bg-[#8B5CF6] text-white border-black neo-shadow-sm -translate-y-[1px]'
                : 'bg-white text-gray-800 border-black hover:bg-violet-50'
              }`}
          >
            <Sparkles size={14} />
            <span>AI 互动内容生成</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: AI WORKFLOWS */}
      {activeTab === 'workflow' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-[#FAF6F0] border-4 border-black rounded-3xl p-5 sm:p-8 neo-shadow-lg space-y-6">
            <div className="space-y-2 px-1">
              <span className="bg-[#FDCC0D] text-black border-2 border-black rounded px-2.5 py-0.5 text-[10px] font-mono font-bold inline-block neo-shadow-xs">
                AI PRODUCT CASE STUDIES / AI 产品案例精选
              </span>
              <h3 className="font-serif font-black text-2xl italic text-[#1a1a1a]">
                AI 产品案例总览
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                当前收录 {aiProductCards.length} 个已完成接入的 AI 产品案例，采用统一卡片式入口展示，便于快速浏览、对比评估与后续持续扩展。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiProductCards.map((card) =>
                card.previewUrl ? (
                  <a
                    key={card.id}
                    href={card.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`border-3 border-black rounded-2xl p-4 sm:p-5 transition-all flex flex-col justify-between min-h-[220px] ${card.color} neo-shadow-sm hover:-translate-y-[2px] hover:translate-x-[1px] group`}
                    title={`点击跳转至 ${card.title} 预览`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-mono text-[10px] font-black border border-black px-1.5 py-0.5 rounded leading-none uppercase ${
                          card.tone === 'dark' ? 'bg-indigo-500 text-white' : 'bg-white text-black'
                        }`}>
                          {card.badge}
                        </span>
                        <span className={`font-mono text-[9px] font-bold text-right ${
                          card.tone === 'dark' ? 'text-slate-300' : 'text-gray-700'
                        }`}>
                          {card.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-mono font-bold ${
                          card.tone === 'dark'
                            ? 'border-indigo-300/50 bg-white/10 text-white'
                            : 'border-black bg-white/70 text-black'
                        }`}>
                          <Eye size={10} />
                          <span>{card.chip ?? 'AI 产品预览'}</span>
                        </div>
                        <h4 className={`font-display font-black text-lg leading-snug ${
                          card.tone === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          {card.title}
                        </h4>
                        <p className={`text-xs font-sans leading-relaxed ${
                          card.tone === 'dark' ? 'text-slate-300' : 'text-gray-800'
                        }`}>
                          {card.summary}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {card.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className={`border-2 rounded-xl px-3 py-2 text-[11px] font-display font-bold ${
                            card.tone === 'dark'
                              ? 'bg-white/10 border-white/20 text-white'
                              : 'bg-white/80 border-black text-black'
                          }`}>
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`pt-4 border-t border-dashed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 ${
                      card.tone === 'dark' ? 'border-white/15' : 'border-black/20'
                    }`}>
                      <span className={`text-[11px] font-display font-bold ${
                        card.tone === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        点击整张卡片进入预览
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold ${
                        card.tone === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        查看原型
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-[2px]" />
                      </span>
                    </div>
                  </a>
                ) : (
                  <div
                    key={card.id}
                    className="border-3 border-dashed border-black rounded-2xl p-5 transition-all flex flex-col justify-between min-h-[220px] bg-white/80"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-black border border-black px-1.5 py-0.5 rounded bg-white text-black leading-none uppercase">
                          {card.badge}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-gray-500">
                          {card.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-black text-base text-black leading-snug">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-600 font-sans leading-relaxed">
                          {card.summary}
                        </p>
                      </div>
                      <ul className="space-y-1 text-[11px] font-sans text-gray-700 list-disc list-inside">
                        {card.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-dashed border-black/20 flex justify-end">
                      <span className="text-[11px] font-display font-bold text-gray-400">
                        预留位置
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: PROMPTS COLLECTION */}
      {activeTab === 'prompts' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Prompt builder dynamic sidebar / widgets */}
          <div className="bg-[#FAF6F0] border-4 border-black rounded-3xl p-5 sm:p-8 neo-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Interactive Prompt parameters panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal size={16} className="text-[#8B5CF6]" />
                  <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    XHS Prompt Builder / 小红书图片提示词实时拼装
                  </span>
                </div>
                <h4 className="font-display font-black text-xl text-black">
                  小红书图片提示词控制台
                </h4>
                <p className="text-xs text-gray-500 font-sans">
                  输入图片关键词，选择图片风格与出图数量，右侧会同步生成更贴近小红书封面/图文种草调性的 Midjourney 提示词组。
                </p>
              </div>

              {/* Dynamic inputs */}
              <div className="space-y-4 pt-2 border-t-2 border-gray-100">
                
                {/* Keywords Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-black text-gray-900 flex items-center justify-between">
                    <span>1. 图片关键词 (Keywords)</span>
                    <span className="font-mono text-[10px] text-gray-400">custom input</span>
                  </label>
                  <input 
                    type="text" 
                    value={imageKeywords}
                    onChange={(e) => {
                      setImageKeywords(e.target.value);
                      setGeneratedGalleryUrls([]);
                    }}
                    className="w-full bg-slate-50 border-2 border-black rounded-xl px-3 py-2 text-xs font-mono focus:bg-white focus:outline-none focus:ring-0"
                    placeholder="例如: 通勤女孩, 奶油白键盘, 咖啡杯"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-display font-black text-gray-900 flex items-center justify-between">
                    <span>2. 精确文案叠字 (Overlay Text)</span>
                    <span className="font-mono text-[10px] text-gray-400">post overlay</span>
                  </label>
                  <input
                    type="text"
                    value={coverText}
                    onChange={(e) => {
                      setCoverText(e.target.value);
                      setGeneratedGalleryUrls([]);
                    }}
                    className="w-full bg-slate-50 border-2 border-black rounded-xl px-3 py-2 text-xs font-mono focus:bg-white focus:outline-none focus:ring-0"
                    placeholder="例如: 小红书通勤女孩桌面好物"
                  />
                  <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
                    AI 只负责生成画面，中文标题由页面精确叠加，避免模型直接生字导致错别字。
                  </p>
                </div>

                {/* Style Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-black text-gray-900 flex items-center justify-between">
                    <span>3. 图片风格 (Style)</span>
                    <span className="font-mono text-[10px] text-[#8B5CF6]">{xhsStyleOptions[imageStyle].chip}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(Object.entries(xhsStyleOptions) as Array<[keyof typeof xhsStyleOptions, typeof xhsStyleOptions[keyof typeof xhsStyleOptions]]>).map(([styleKey, styleMeta]) => (
                      <button
                        key={styleKey}
                        onClick={() => {
                          setImageStyle(styleKey);
                          setActivePromptIndex(0);
                          setGeneratedGalleryUrls([]);
                        }}
                        className={`p-2 rounded-md border-2 text-left cursor-pointer select-none transition-all
                          ${imageStyle === styleKey 
                            ? 'bg-black text-white border-black neo-shadow-xs' 
                            : 'bg-white text-gray-800 border-gray-200'
                          }`}
                      >
                        <span className="block text-[11px] font-display font-black">{styleMeta.label}</span>
                        <span className={`block text-[9px] leading-snug mt-1 ${imageStyle === styleKey ? 'text-white/80' : 'text-gray-500'}`}>
                          {styleMeta.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-black text-gray-900 flex items-center justify-between">
                    <span>4. 图片数量 (Count)</span>
                    <span className="font-mono text-[10px] text-red-500">{imageCount} prompts</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 9].map((count) => (
                      <button
                        key={count}
                        onClick={() => {
                          setImageCount(count);
                          setActivePromptIndex(0);
                          setGeneratedGalleryUrls([]);
                        }}
                        className={`py-1.5 rounded-md border-2 text-xxs font-mono font-bold cursor-pointer select-none
                          ${imageCount === count
                            ? 'bg-black text-white border-black neo-shadow-xs'
                            : 'bg-white text-gray-800 border-gray-200'
                          }`}
                      >
                        {count} 张
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF6F0] border-2 border-black rounded-xl p-3 space-y-1.5">
                  <span className="font-mono text-[9px] font-black text-gray-500 uppercase tracking-widest block">
                    XHS SPREAD TONE / 平台传播调性
                  </span>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed">
                    当前输出会自动强调：竖版移动端首屏、可做封面留白、真实种草感、适合收藏转发、避免过度精修；同时明确禁止模型直接生成文字，标题改由工程内精确叠加。
                  </p>
                </div>

              </div>
            </div>

            {/* Generated results cards collection showoff */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 pb-2">
                Curated Recipe Catalog / 单卡切换式提示词配方
              </span>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {promptsCollection.map((recipe, idx) => (
                    <button
                      key={recipe.title}
                      onClick={() => {
                        setSelectedRecipeIndex(idx);
                        setActivePromptIndex(0);
                        setGeneratedGalleryUrls([]);
                      }}
                      className={`rounded-xl border-2 p-2.5 text-left transition-all cursor-pointer ${
                        selectedRecipeIndex === idx
                          ? 'bg-black text-white border-black neo-shadow-xs'
                          : 'bg-white text-gray-800 border-black'
                      }`}
                    >
                      <span className="block text-[11px] font-display font-black leading-snug">{recipe.title}</span>
                      <span className={`block text-[9px] mt-1 leading-snug ${selectedRecipeIndex === idx ? 'text-white/75' : 'text-gray-500'}`}>
                        {recipe.description}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="bg-[#FAF6F0] border-3 border-black rounded-2xl p-4 sm:p-5 neo-shadow-sm hover:translate-y-[-1px] transition-transform grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  <div className="sm:col-span-12 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {selectedRecipe.tags.map((t, tIdx) => (
                          <span key={tIdx} className="bg-white border border-black text-[9px] font-display font-medium px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                        <span className="bg-white border border-black text-[9px] font-display font-medium px-1.5 py-0.5 rounded">
                          {xhsStyleOptions[imageStyle].chip}
                        </span>
                        <span className="bg-white border border-black text-[9px] font-display font-medium px-1.5 py-0.5 rounded">
                          {imageCount} 张图
                        </span>
                      </div>
                      <h5 className="font-display font-black text-xs sm:text-sm text-black">
                        {selectedRecipe.title}
                      </h5>
                      <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
                        {selectedRecipe.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedPromptList.map((_, promptIdx) => (
                        <button
                          key={promptIdx}
                          onClick={() => setActivePromptIndex(promptIdx)}
                          className={`px-2 py-1 rounded-md border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            safeActivePromptIndex === promptIdx
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-gray-700 border-black'
                          }`}
                        >
                          Prompt {promptIdx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="bg-white border-2 border-black rounded-lg p-2 relative overflow-hidden">
                      <div className="max-h-44 overflow-y-auto pr-16 space-y-2">
                        <code className="block font-mono text-[9px] text-gray-700 whitespace-pre-wrap leading-relaxed select-all">
                          {`[Prompt ${safeActivePromptIndex + 1}] ${activePromptText}`}
                        </code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedPromptList.join('\n\n'), selectedRecipeIndex)}
                        className="absolute top-2 right-2 bg-black text-white hover:bg-gray-800 p-1.5 rounded-md border border-neutral-700 flex-shrink-0 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                        title="复制提示词"
                      >
                        {copiedIndex === selectedRecipeIndex ? <Check size={11} className="text-lime-400" /> : <Copy size={11} />}
                      </button>
                    </div>

                    <div className="bg-white border-2 border-dashed border-black rounded-lg px-3 py-2 flex items-center justify-between gap-3">
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                          Overlay Copy / 精确文案输出
                        </span>
                        <p className="text-xs font-display font-black text-black truncate">
                          {coverText.trim() || '未填写叠字文案'}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-bold text-lime-600">
                        精确叠字
                      </span>
                    </div>

                    <button
                      onClick={handleGeneratePromptImages}
                      className="w-full bg-[#A3E635] text-black border-2 border-black rounded-xl py-2 font-display font-black text-xs neo-shadow-sm hover:translate-y-[1px] active:translate-y-[2px] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles size={12} />
                      <span>{`按当前数量生成 ${imageCount} 张图片`}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {generatedGalleryUrls.length > 0 && (
            <div className="bg-[#FAF6F0] border-4 border-black rounded-3xl p-6 sm:p-8 neo-shadow-lg space-y-5">
              <div className="space-y-2 border-b border-dashed border-gray-200 pb-4">
                <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  Generated Gallery / 当前提示词批量出图结果
                </span>
                <h4 className="font-display font-black text-lg text-black">
                  已按当前设置生成 {generatedGalleryUrls.length} 张不重复图片
                </h4>
                <p className="text-xs text-gray-500 font-sans">
                  图片基于当前选中的配方、关键词、风格与数量生成；修改参数后重新点击按钮可刷新整组结果。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedGalleryUrls.map((imageUrl, idx) => (
                  <div key={imageUrl} className="bg-[#FAF6F0] border-3 border-black rounded-2xl p-3 neo-shadow-sm space-y-2">
                    <div className="aspect-[3/4] overflow-hidden rounded-xl border-2 border-black bg-slate-100 relative">
                      <img
                        src={imageUrl}
                        alt={`Generated prompt result ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {coverText.trim() && (
                        <>
                          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                          <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                            <p className="text-white font-display font-black text-lg leading-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)]">
                              {coverText}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-gray-500">
                        {`图 ${idx + 1}`}
                      </span>
                      <button
                        onClick={() => copyImageToClipboard(imageUrl, 200 + idx)}
                        className="bg-black text-white hover:bg-gray-800 px-2 py-1 rounded-md border border-neutral-700 flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-transform text-[10px] font-mono"
                        title="复制图片"
                      >
                        {copiedIndex === 200 + idx ? <Check size={10} className="text-lime-400" /> : <Copy size={10} />}
                        <span>复制图片</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* 4. TAB 3: AI INTERACTIVE DEMO */}
      {activeTab === 'demo' && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="bg-[#FAF6F0] border-4 border-black rounded-3xl p-6 sm:p-8 neo-shadow-lg space-y-8">
            <div className="border-b-2 border-dashed border-black pb-5 space-y-2">
              <span className="bg-[#A3E635] text-black border-2 border-black rounded px-2.5 py-0.5 text-[10px] font-mono font-bold inline-block neo-shadow-xs">
                AI CO-CREATE SANDBOX / 智能策划分身沙盒
              </span>
              <h3 className="font-serif font-black text-2xl italic text-[#1a1a1a]">
                小红书 AIGC 爆品内容策划生成器
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                输入您的【行业赛道】、【核心卖点】和【受众情绪】，AI分身将在后台调拨爆款配比公式，实时拼装出极具小红书低粉爆文网感的『内容选题、Midjourney提示词和黄金转化脚本』：
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Option 1: Industry */}
              <div className="space-y-2">
                <label className="text-xs font-display font-black text-black flex items-center gap-1">
                  <span className="w-5 h-5 rounded border border-black bg-[#FF6B6B] flex items-center justify-center text-[10px] font-mono font-black text-white">A</span>
                  <span>选择您的行业 (Industry)</span>
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-display font-medium focus:outline-none"
                >
                  <option value="beauty">💄 美妆个护与护肤国潮</option>
                  <option value="tech">⌨️ 极客客制化数码桌摆</option>
                  <option value="food">🍵 新型茶饮与本地精酿餐吧</option>
                  <option value="lifestyle">🚴 潮流户外生活轻奢方式</option>
                </select>
              </div>

              {/* Option 2: Unique Selling Point */}
              <div className="space-y-2">
                <label className="text-xs font-display font-black text-black flex items-center gap-1">
                  <span className="w-5 h-5 rounded border border-black bg-[#FDCC0D] flex items-center justify-center text-[10px] font-mono font-black text-black">B</span>
                  <span>核心主打卖点 (USP)</span>
                </label>
                <select
                  value={sellingPoint}
                  onChange={(e) => setSellingPoint(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-display font-medium focus:outline-none"
                >
                  <option value="organic">🌿 绿色有机安全 / 无添加硬道理</option>
                  <option value="value">🏷️ 极致平替 / 拒绝奢侈暴利税</option>
                  <option value="culture">🎴 独立新中式主理人情怀</option>
                  <option value="tech">⚡ 硬核人体工学 / 数字生产力</option>
                </select>
              </div>

              {/* Option 3: Audience Emotional Hook */}
              <div className="space-y-2">
                <label className="text-xs font-display font-black text-black flex items-center gap-1">
                  <span className="w-5 h-5 rounded border border-black bg-[#A3E635] flex items-center justify-center text-[10px] font-mono font-black text-black">C</span>
                  <span>粉丝情绪挂钩 (Hook)</span>
                </label>
                <select
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  className="w-full bg-white border-2 border-black rounded-xl p-2.5 text-xs font-display font-medium focus:outline-none"
                >
                  <option value="workplace">🥱 拯救加班晚睡早八打工人焦虑</option>
                  <option value="geek">🎮 拒绝流俗的小众发烧圈心智</option>
                  <option value="emotion">🍻 深夜emo治愈和解压精神庇护</option>
                  <option value="gift">🎁 精准满足面子里的送礼惊喜感</option>
                </select>
              </div>

            </div>

            {/* Large Generate Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-[#1a1a1a] text-[#FAF9F6] border-3 border-black text-xs sm:text-sm font-display font-black py-3 px-8 rounded-xl neo-shadow flex items-center justify-center gap-2 cursor-pointer hover:translate-y-[1px] hover:shadow-sm active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-75 disabled:cursor-wait"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>智能算法配比中 {genProgress}%</span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="fill-white" />
                    <span>一键生成 AIGC 小红书内容策划 🚀</span>
                  </>
                )}
              </button>
            </div>

            {/* Generation details block */}
            {isGenerating && (
              <div className="bg-black text-[#A3E635] rounded-xl p-4 font-mono text-[10px] space-y-1 border-2 border-black select-none max-w-lg mx-auto">
                <p>{`[${new Date().toLocaleTimeString()}] INF: Initializing LLM System prompt...`}</p>
                {genProgress >= 30 && <p>{`[${new Date().toLocaleTimeString()}] INF: Mapping emotional nodes [${hook}]...`}</p>}
                {genProgress >= 60 && <p>{`[${new Date().toLocaleTimeString()}] INF: Injecting visual color palette [${industry}]...`}</p>}
                {genProgress >= 90 && <p className="text-white animate-pulse">{`[${new Date().toLocaleTimeString()}] SUCCESS: Compiled AI Content strategy.`}</p>}
              </div>
            )}

            {/* Results Display Panel */}
            {generatedResult && !isGenerating && (
              <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 neo-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 relative animate-slide-down">
                
                {/* Visual badge */}
                <div className="absolute top-4 right-4 bg-[#A3E635] text-black border border-black rounded px-2 py-0.5 text-[8px] font-mono font-black uppercase">
                  ✓ Generation Match 200 OK
                </div>

                {/* Left Column: Title tags and details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                      Generated Outline / 推荐低粉爆文黄金标题
                    </span>
                    <h4 className="font-display font-black text-base sm:text-lg text-black leading-snug">
                      {generatedResult.title}
                    </h4>
                    <p className="text-xs text-gray-700 font-sans italic font-medium leading-relaxed pt-1 select-all">
                      “{generatedResult.tagline}”
                    </p>
                  </div>

                  {/* Operational direction summary */}
                  <div className="bg-indigo-50 border-2 border-black rounded-xl p-3.5 space-y-1">
                    <span className="font-mono text-[9px] font-black text-indigo-900 block">
                      ✦ 选题起盘逻辑 (GROWTH LOGIC)
                    </span>
                    <p className="text-xs text-indigo-950 font-sans leading-relaxed">
                      该企划采用 <strong className="text-[#8B5CF6] font-bold">{generatedResult.metaHook}</strong> 作为切口，主打这款小众爆品的 <strong className="text-black font-bold">{generatedResult.metaSelling}</strong>，在视觉排版中采用打破常规千篇一律白嫩精修的【新粗野撞色拼贴海报】，可捕获额外 250% 粉丝停留。
                    </p>
                  </div>

                  {/* Highly polished dynamic script */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                      Golden Video & Thread Script / 30秒无水文本转化脚本 (A/B对赌版)
                    </label>
                    <div className="bg-slate-50 border-2 border-black rounded-lg p-3 font-mono text-[11px] text-gray-800 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
                      {generatedResult.script}
                    </div>
                  </div>
                </div>

                {/* Right Column: Suggested prompt recipes + tags */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        AI Image Recipe / 配属 Midjourney 图片提示词
                      </span>
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg border-2 border-black relative">
                        <code className="block font-mono text-[10px] leading-relaxed break-words select-all font-medium pr-10">
                          {generatedResult.mjPrompt}
                        </code>
                        <button
                          onClick={() => copyToClipboard(generatedResult.mjPrompt, 99)}
                          className="absolute bottom-2.5 right-2.5 bg-black/80 hover:bg-black text-white border border-[#A3E635] p-1 rounded cursor-pointer transition-colors"
                          title="复制提示词"
                        >
                          {copiedIndex === 99 ? <Check size={10} className="text-lime-400" /> : <Copy size={10} />}
                        </button>
                      </div>
                      <span className="text-[8px] font-sans text-gray-400 mt-1 block leading-none">
                        💡 贴入 Midjourney / 配合 ComfyUI 专属 Lora 渲染荧光黑描边封面效果极好。
                      </span>
                    </div>

                    <div className="space-y-1 bg-[#FAF6F0] border-2 border-black p-3 rounded-xl">
                      <span className="font-mono text-[9px] font-medium text-gray-500 uppercase tracking-widest block">
                        SEO Keyword Clouds / 流量检索红利词云
                      </span>
                      <p className="font-mono text-xs text-black font-bold leading-normal select-all">
                        {generatedResult.seo}
                      </p>
                    </div>
                  </div>

                  {/* Copy all output success dialog buttons */}
                  <button
                    onClick={() => {
                      const allToCopy = `【爆款选题】\n${generatedResult.title}\n\n【爆款预告】\n${generatedResult.tagline}\n\n【MJ提示词】\n${generatedResult.mjPrompt}\n\n【黄金脚本】\n${generatedResult.script}\n\n【SEO词组】\n${generatedResult.seo}`;
                      copyToClipboard(allToCopy, 100);
                    }}
                    className="w-full bg-[#A3E635] text-black border-2 border-black rounded-xl py-2 font-display font-black text-xs neo-shadow-sm hover:translate-y-[1px] active:translate-y-[2px] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    {copiedIndex === 100 ? (
                      <>
                        <Check size={12} />
                        <span>已全部复制到剪贴板！</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>一键打包复制全部策划文案</span>
                      </>
                    )}
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
