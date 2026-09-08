// 游戏状态管理
const gameState = {
    chapter: 1,
    currentScene: 'awakening',
    hp: 100,
    maxHp: 100,
    hunger: 100,
    maxHunger: 100,
    thirst: 100,
    maxThirst: 100,
    radiation: 0,
    maxRadiation: 100,
    caps: 50,
    inventory: [
        { id: 1, name: '破旧衣服', quantity: 1, icon: '👕' },
        { id: 2, name: '生锈匕首', quantity: 1, icon: '🔪' },
        { id: 3, name: '旧水瓶', quantity: 2, icon: '🍾' },
        { id: 4, name: '罐头食物', quantity: 3, icon: '🥫' }
    ],
    companions: [],
    choices: [],
    flags: {
        metRex: false,
        joinedGroup: false,
        enteredTown: false,
        metMia: false
    }
};

// 故事场景数据库
const storyDatabase = {
    awakening: {
        title: '第一章：苏醒',
        text: '<p>你缓缓睁开眼睛。头部传来阵阵刺痛。周围是一片模糊的轮廓——生锈的金属、破碎的混凝土。</p><p>你躺在一个废弃的地下掩体中。通过裂开的天窗，你能看到外面那片荒凉的废土——焦黑的地面、枯死的树木、远处闪烁的绿色辐射光。</p><p>记忆逐渐恢复。那场核弹浩劫摧毁了一切。文明崩塌了。</p><p>你检查了一下身体——还活着。口袋里还有一些东西：破旧的衣服、一把匕首、一个水瓶和几罐食物。</p><p>在掩体角落，你发现了一张泛黄的地图，标记了"锈水镇"。那里曾是一个幸存者社区。</p><p>你需要做出选择。留在这里可能安全，但资源有限。出去找锈水镇可能很危险，但那里可能有希望。</p>',
        choices: [
            { text: '🚶 前往锈水镇', next: 'journey_start', consequence: '踏上未知旅途' },
            { text: '🔍 探索附近废墟', next: 'explore_ruins', consequence: '收集补给' },
            { text: '😴 休息一会', next: 'rest_bunker', consequence: '恢复体力' }
        ]
    },
    
    journey_start: {
        title: '踏上旅途',
        text: '<p>你决定立即出发。外面的废土比你想象的还要荒凉。</p><p>焦黑的地面闪闪发光，远处的天空呈现病态的绿色。</p><p>走了三小时后，你听到了声音——人类的对话声。前面有一个破烂的营地，几个人影在火堆周围。</p><p>你需要决定如何接近他们。</p>',
        choices: [
            { text: '🤝 主动打招呼', next: 'meet_camp_friendly', consequence: '展现友好' },
            { text: '🤫 潜行靠近', next: 'meet_camp_stealthy', consequence: '收集情报' },
            { text: '🚶 绕过他们', next: 'avoid_camp', consequence: '保持安全' }
        ]
    },

    explore_ruins: {
        title: '探索废墟',
        text: '<p>你决定先搜索附近的废墟。掩体外面是一座倒塌的建筑——曾经的超市。</p><p>你小心进入。里面很暗，架子上散落着已经腐烂的东西。</p><p>突然，你听到了声音——某样东西在移动。你的手按在匕首上。</p>',
        choices: [
            { text: '⚔️ 拔出匕首战斗', next: 'fight_creature', consequence: '可能受伤' },
            { text: '🚪 迅速离开', next: 'escape_ruins', consequence: '保留体力' },
            { text: '👂 躲藏观察', next: 'hide_ruins', consequence: '可能发现什么' }
        ]
    },

    rest_bunker: {
        title: '在掩体中休息',
        text: '<p>你在掩体角落找到了床垫。躺下来后，睡眠并不安宁——你做了噩梦。</p><p>醒来时已是第二天早上。你感觉好多了，但意识到一个问题：掩体里的水只够几天了。</p><p>你必须做出决定。无论如何，你都不能永远待在这里。</p>',
        choices: [
            { text: '🚶 出发寻找锈水镇', next: 'journey_start', consequence: '体力恢复' },
            { text: '🔍 再探索一下', next: 'explore_ruins', consequence: '寻找补给' }
        ]
    },

    meet_camp_friendly: {
        title: '初识幸存者',
        text: '<p>你走出藏身处。"嘿！我是个幸存者！"</p><p>营地里的人停止了工作。一个四十多岁的男人站起来，脸上有道疤痕。</p><p>"别动！你是一个人吗？"</p><p>"是的，我在找锈水镇。"</p><p>"锈水镇？我叫雷克斯，这是我的队伍。我们也在前往那边。"他伸出粗糙的手。</p>',
        choices: [
            { text: '🤝 握手加入', next: 'join_group', consequence: '获得队友' },
            { text: '❓ 先问几个问题', next: 'question_group', consequence: '了解信息' },
            { text: '⚠️ 保持警惕拒绝', next: 'avoid_camp', consequence: '保持独立' }
        ]
    },

    meet_camp_stealthy: {
        title: '潜行侦察',
        text: '<p>你蹲下身体，利用废墟掩护靠近。听到他们讨论锈水镇和一个叫"米娅"的女人。</p><p>他们的武装都是简陋的，但看起来很有威胁性。突然，你踩到干树枝。</p><p>"那边有人！"他大声喊道。</p>',
        choices: [
            { text: '🏃 立即逃跑', next: 'escape_encounter', consequence: '失去机会' },
            { text: '🙋 走出谈判', next: 'meet_camp_friendly', consequence: '冒风险' },
            { text: '⚔️ 准备战斗', next: 'fight_group', consequence: '可能受伤' }
        ]
    },

    avoid_camp: {
        title: '独行者',
        text: '<p>���绕过他们，继续前进。又走了几小时后，你终于看到了锈水镇的轮廓。</p><p>这曾经是个小镇，现在是经过改造的要塞。残破的建筑被改成防御工事。</p><p>镇子入口站着两个守卫。他们看到你后，立即举起武器。"站住！说出你的名字和意图！"</p>',
        choices: [
            { text: '😊 友好介绍', next: 'town_enter_friendly', consequence: '获得许可' },
            { text: '❓ 询问条件', next: 'town_enter_questions', consequence: '了解规则' },
            { text: '🚶 转身离开', next: 'journey_start', consequence: '保持距离' }
        ]
    },

    fight_creature: {
        title: '战斗',
        text: '<p>你拔出匕首，准备迎战。从黑暗中冲出了一只巨大的变异鼠。它的眼睛闪闪发光，全身散发绿色辐射光。</p><p>激烈的搏斗中，你勉强击败了变异鼠，但也受了伤。你在尸体附近找到了一些有用的东西。</p>',
        choices: [
            { text: '💊 收集物资，离开', next: 'explore_ruins_victory', consequence: '获得补给' }
        ]
    },

    escape_ruins: {
        title: '仓皇逃离',
        text: '<p>你没有时间思考，立即转身跑出建筑。身后传来生物愤怒的嚎叫，但你没有回头。</p><p>跑了好久才停下。当心跳平复时，你意识到自己活了下来。但也失去了一个寻找补给的机会。</p>',
        choices: [
            { text: '🚶 前往锈水镇', next: 'journey_start', consequence: '继续冒险' }
        ]
    },

    hide_ruins: {
        title: '潜伏观察',
        text: '<p>你躲在掩蔽处，屏住呼吸。一只巨大的变异鼠经过你的藏身处，似乎没有发现你。</p><p>等它离开后，你才敢活动。你在废墟中搜索并找到了一些物资和瓶盖。</p>',
        choices: [
            { text: '💰 收集战利品继续', next: 'explore_ruins_victory', consequence: '获得补给' }
        ]
    },

    explore_ruins_victory: {
        title: '离开废墟',
        text: '<p>你整理好背包，离开了这个危险的地方。补给足够了，现在可以出发去锈水镇。</p>',
        choices: [
            { text: '🚶 前往锈水镇', next: 'journey_start', consequence: '补给充足' }
        ]
    },

    join_group: {
        title: '加入队伍',
        text: '<p>你握住了雷克斯的手。他的握力很强，但笑容真诚。</p><p>"欢迎加入。现在有四个人了。我们今晚出发。锈水镇还有两天的路程。路上会很危险，但至少我们在一起。"</p><p>你加入了队伍，感到有些安心。至少你不再是一个人了。</p>',
        choices: [
            { text: '👥 继续故事', next: 'chapter2_start', consequence: '进入第二章' }
        ]
    },

    question_group: {
        title: '询问信息',
        text: '<p>"锈水镇怎么样？"你问道。</p><p>雷克斯放下手。"那里由长老会管理。相对稳定，有房屋、食物，甚至有医生。但也有危险——政治、资源竞争、还有外面的威胁。没有完全安全的地方。"</p><p>他看着你。"你想和我们一起去吗？"</p>',
        choices: [
            { text: '✅ 同意加入', next: 'join_group', consequence: '团队行动' },
            { text: '❌ 拒绝', next: 'avoid_camp', consequence: '独立行动' }
        ]
    },

    escape_encounter: {
        title: '危险逃脱',
        text: '<p>你转身就跑。身后传来追赶声，但你越来越快，利用地形优势甩掉了他们。</p><p>累得气喘吁吁，但活了下来。</p>',
        choices: [
            { text: '🚶 继续前往镇子', next: 'avoid_camp', consequence: '更加警惕' }
        ]
    },

    fight_group: {
        title: '殊死搏斗',
        text: '<p>你拔出匕首，准备战斗。对方也拔出了武器。战斗异常激烈。</p><p>你奋力反抗，但因为人数差异而败下阵来。你倒在地上，意识开始模糊...</p><p><span style="color:#ff6b6b;">【游戏结束】</span></p>',
        choices: [
            { text: '🔄 开始新游戏', next: 'awakening', consequence: '重新开始' }
        ]
    },

    town_enter_friendly: {
        title: '进入锈水镇',
        text: '<p>"我叫一个旅行者，"你说。"我来自南方的掩体。我听说这里有社区。我想加入。"</p><p>守卫们相互看了眼。其中一个走向内部。几分钟后回来了。"长老会要见你。跟我来。"</p><p>你被带进了镇子。这个地方比你想象的更有组织。你看到许多幸存者在活动。</p>',
        choices: [
            { text: '👥 继续故事', next: 'chapter2_start', consequence: '进入第二章' }
        ]
    },

    town_enter_questions: {
        title: '交涉',
        text: '<p>"进入锈水镇需要什么条件？"你问道。</p><p>守卫冷冷回答："通常需要证明你不是强盗。我们可以搜身审查，或者你可以付通行费。"</p><p>"多少？"</p><p>"50瓶盖。或者你有什么值钱的东西？"</p>',
        choices: [
            { text: '💰 支付50瓶盖', next: 'town_enter_pay', consequence: '消耗资源' },
            { text: '🤝 接受搜身审查', next: 'town_enter_friendly', consequence: '保留资源' },
            { text: '🚶 先离开考虑', next: 'journey_start', consequence: '保留自由' }
        ]
    },

    town_enter_pay: {
        title: '进入锈水镇',
        text: '<p>你拿出50瓶盖，递给守卫。他点了点头，让开了道路。"欢迎来到锈水镇。希望你在这里能找到你要的东西。"</p><p>你进入了镇子。一个全新的世界展现在你眼前。</p>',
        choices: [
            { text: '👥 继续故事', next: 'chapter2_start', consequence: '进入第二章' }
        ]
    },

    chapter2_start: {
        title: '第二章：归属',
        text: '<p>你在锈水镇度过了第一个月。长老会接纳了你。他们给了你一间小屋、一份工作和基本补给。</p><p>你开始学习这个社区如何运作。长老会由三个人组成：史蒂文（前工程师）、米娅（医生）和杰克（前军人）。</p><p>但镇子里有紧张局势。有个派系反对长老会，叫"铁血团"。</p><p>一天，米娅来找你。表情很严肃。"我需要你的帮助。有些东西威胁我们。"</p>',
        choices: [
            { text: '🤝 答应帮助', next: 'side_quest_medicine', consequence: '开启新剧情' },
            { text: '❓ 先了解详情', next: 'question_mia', consequence: '获取信息' },
            { text: '⚠️ 礼貌拒绝', next: 'town_events_neutral', consequence: '保持中立' }
        ]
    },

    question_mia: {
        title: '了解情况',
        text: '<p>"什么问题？"你问道。</p><p>米娅叹了口气。"东边农场区有个变异生物巢穴。它们正吃掉我们的作物，还攻击了几个农民。我们需要清理它们，但我们的战士都被派到了其他地方。"</p><p>"你想让我去处理？"</p><p>"如果你愿意。我们会给你报酬。这对社区很重要。"</p>',
        choices: [
            { text: '✅ 去猎杀变异生物', next: 'side_quest_medicine', consequence: '接受任务' },
            { text: '❌ 拒绝', next: 'town_events_neutral', consequence: '保持中立' }
        ]
    },

    side_quest_medicine: {
        title: '任务：清理变异生物',
        text: '<p>你来到农场区边缘。这里确实很危险。你看到被破坏的菜地和几具死去的变异生物。</p><p>一只巨大的变异狼从灌木丛中跳了出来。它的眼睛闪闪发光，全身散发绿光。</p><p>战斗开始了！</p>',
        choices: [
            { text: '⚔️ 与变异狼战斗', next: 'battle_mutant_wolf', consequence: '激烈战斗' }
        ]
    },

    battle_mutant_wolf: {
        title: '激烈的战斗',
        text: '<p>你们互相厮杀。变异狼凶猛无比，爪子和牙齿能造成致命伤害。你用匕首和它搏斗，受了伤，但更聪明。</p><p>你利用地形优势，最终击败了变异狼。<span style="color:#7cd986;">你胜利了！</span></p><p>浑身是血，但活了下来。米娅为你治疗伤口，给了你丰厚报酬。</p>',
        choices: [
            { text: '✨ 继续故事', next: 'chapter3_start', consequence: '进入第三章' }
        ]
    },

    town_events_neutral: {
        title: '镇子的日常',
        text: '<p>你选择保持中立。日子一天天过去。镇子里的生活相对平静，但紧张局势在加剧。</p><p>长老会和铁血团之间的冲突越来越明显。一天，你听说了消息——东方传来了新威胁。有人看到巨大变异生物在荒野游荡。</p>',
        choices: [
            { text: '🔍 深入调查', next: 'investigate_threat', consequence: '了解更多' },
            { text: '⚔️ 主动狩猎', next: 'hunt_creature', consequence: '主动出击' }
        ]
    },

    investigate_threat: {
        title: '深入调查',
        text: '<p>你决定深入调查这个威胁。询问见过这个生物的人，他们描述了极其危险的东西——可能是死亡之爪。</p><p>这对锈水镇是严重威胁。如果靠近，可能造成灾难。</p>',
        choices: [
            { text: '🎯 向长老会报告', next: 'report_elders', consequence: '通知领导' },
            { text: '⚔️ 主动猎杀', next: 'hunt_deathclaw', consequence: '英雄气概' }
        ]
    },

    report_elders: {
        title: '向长老会报告',
        text: '<p>你来到长老会总部，向三位长老报告发现。他们听得很认真。杰克表情变得严肃。"死亡之爪...我们需要立即行动。"</p><p>长老会决定组织狩猎队。他们问你是否愿意加入。</p>',
        choices: [
            { text: '✅ 加入狩猎队', next: 'hunt_deathclaw', consequence: '成为英雄' },
            { text: '❌ 拒绝', next: 'chapter3_start', consequence: '保持安全' }
        ]
    },

    hunt_creature: {
        title: '狩猎',
        text: '<p>你决定自己去狩猎。这很危险，但你有能力。你进入荒野，寻找怪物踪迹。足迹很清晰，非常巨大。</p><p>跟踪几小时后，你在山谷里找到了它。</p>',
        choices: [
            { text: '⚔️ 与生物战斗', next: 'hunt_deathclaw', consequence: '激烈战斗' }
        ]
    },

    hunt_deathclaw: {
        title: '与死亡之爪战斗',
        text: '<p>这是可怕的生物。它看起来像巨大的蜥蜴，有锋利爪子和强大尾巴。战斗异常激烈。</p><p>你多次险些被击倒，但坚持了下来。你的技巧和决心最终战胜了野兽的原始力量。</p><p><span style="color:#7cd986;">你成功击败死亡之爪！</span></p><p>这个胜利让你在镇子里获得英雄声誉。</p>',
        choices: [
            { text: '🎉 进入第三章', next: 'chapter3_start', consequence: '英雄进入第三章' }
        ]
    },

    chapter3_start: {
        title: '第三章：冲突',
        text: '<p>你在锈水镇声誉越来越高。长老会开始重视你的意见。铁血团则对你充满敌���，认为你威胁到他们的权力。</p><p>一天晚上，杰克找到你。看起来很担忧。"我们有麻烦了。铁血团计划发动政变，推翻长老会。我们需要你帮助。"</p>',
        choices: [
            { text: '⚔️ 帮长老会对抗', next: 'civil_conflict_defend', consequence: '选择立场' },
            { text: '🤔 寻求和平解决', next: 'civil_conflict_neutral', consequence: '寻求和平' },
            { text: '❌ 支持铁血团', next: 'civil_conflict_betray', consequence: '背叛(坏结局)' }
        ]
    },

    civil_conflict_defend: {
        title: '保卫长老会',
        text: '<p>你站在长老会这边。这是艰难的决定，但你相信他们更好。那个晚上，铁血团袭击了。</p><p>战斗在镇子爆发。你和长老会支持者一起对抗。战斗激烈，但最终长老会赢了。铁血团首领被击败并逃离。镇子恢复和平。</p>',
        choices: [
            { text: '✨ 继续故事', next: 'after_civil_conflict', consequence: '和平时代' }
        ]
    },

    civil_conflict_neutral: {
        title: '调停',
        text: '<p>你试图调停，寻求和平解决。与双方都谈过话。虽然冲突没完全解决，但调停避免了大规模战争。</p><p>镇子陷入紧张平衡。双方相对克制。你成为尊重的和平使者。</p>',
        choices: [
            { text: '✨ 继续故事', next: 'after_civil_conflict', consequence: '和平使者' }
        ]
    },

    civil_conflict_betray: {
        title: '背叛',
        text: '<p>你加入铁血团。这是重大背叛。长老会失败了。铁血团建立独裁统治。镇子变得压抑。</p><p>你获得权力，但失去尊重和朋友。<span style="color:#ffbc52;">【坏结局：你成为了压制者】</span></p>',
        choices: [
            { text: '🔄 重新开始', next: 'awakening', consequence: '新冒险' }
        ]
    },

    after_civil_conflict: {
        title: '新的开始',
        text: '<p>无论通过战斗还是调停，镇子都找到相对稳定。米娅来找你。"我们想建立更强大防卫队。你愿意领导吗？"</p><p>这是荣誉，但也是巨大责任。</p>',
        choices: [
            { text: '✅ 接受领导', next: 'final_chapter_start', consequence: '走向终章' },
            { text: '❌ 拒绝，继续冒险', next: 'wanderer_ending', consequence: '选���自由' }
        ]
    },

    final_chapter_start: {
        title: '第四章：领导者之路',
        text: '<p>你正式成为防卫队领导。在你领导下，镇子防御变得强大。你训练了有纪律的队伍。</p><p>日子一天天过去。锈水镇在你保护下繁荣。但一天，新威胁出现——北方强大掠夺团正逼近。</p><p>这将是终极战斗。</p>',
        choices: [
            { text: '⚔️ 准备迎战', next: 'final_battle', consequence: '最终对决' }
        ]
    },

    final_battle: {
        title: '最终对决',
        text: '<p>掠夺团规模很大，但你的防卫队已准备好。战斗在镇外平原爆发。这是史诗般的战斗。</p><p>你亲自指挥防卫队，利用地形和战术击败掠夺团。伤亡很大，但你保卫了镇子。</p><p><span style="color:#7cd986;">【胜利】锈水镇安全了。</span></p><p>你成为传奇。你的名字将被记住几代人。</p>',
        choices: [
            { text: '🏆 达成胜利结局', next: 'victory_ending', consequence: '游戏完成' }
        ]
    },

    wanderer_ending: {
        title: '流浪者的终章',
        text: '<p>你拒绝领导权，选择继续冒险。你离开锈水镇，踏入更广阔的废土。</p><p>前方等待的是无尽冒险，未知危险，无限可能。你是真正的流浪者，永远不会被束缚的灵魂。</p><p><span style="color:#7cd986;">【流浪者结局】</span></p>',
        choices: [
            { text: '🏆 游戏完成', next: 'victory_ending', consequence: '游戏结束' }
        ]
    },

    victory_ending: {
        title: '冒险的终点',
        text: '<p>无论选择什么样的路，你都走到了这里。废土的故事继续，但你已完成冒险。</p><p>感谢你的游玩！<span style="color:#7cd986;">🎉 游戏完成 🎉</span></p>',
        choices: [
            { text: '🔄 开始新游戏', next: 'awakening', consequence: '重新开始' }
        ]
    }
};

// UI 函数
function startGame() {
    loadSave();
    document.getElementById('mainMenu').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    updateStats();
    updateInventory();
    loadScene('awakening');
}

function loadScene(sceneId) {
    const scene = storyDatabase[sceneId];
    if (!scene) {
        console.error('场景未找到:', sceneId);
        return;
    }

    gameState.currentScene = sceneId;
    
    document.getElementById('chapterTitle').textContent = scene.title;
    document.getElementById('storyText').innerHTML = scene.text;
    
    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';
    
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => {
            loadScene(choice.next);
            showNotification(choice.consequence);
        };
        choicesContainer.appendChild(button);
    });

    // 自动滚动到顶部（手机适配）
    setTimeout(() => {
        const storyText = document.getElementById('storyText');
        if (storyText) {
            storyText.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 50);
}

function showNotification(message) {
    document.getElementById('infoContent').innerHTML = `<p>💬 ${message}</p>`;
}

function updateStats() {
    if (!document.getElementById('hpFill')) return;
    
    document.getElementById('hpFill').style.width = (gameState.hp / gameState.maxHp * 100) + '%';
    document.getElementById('hpValue').textContent = `${gameState.hp}/${gameState.maxHp}`;
    
    document.getElementById('hungerFill').style.width = (gameState.hunger / gameState.maxHunger * 100) + '%';
    document.getElementById('hungerValue').textContent = `${gameState.hunger}/${gameState.maxHunger}`;
    
    document.getElementById('thirstFill').style.width = (gameState.thirst / gameState.maxThirst * 100) + '%';
    document.getElementById('thirstValue').textContent = `${gameState.thirst}/${gameState.maxThirst}`;
    
    document.getElementById('radiationFill').style.width = (gameState.radiation / gameState.maxRadiation * 100) + '%';
    document.getElementById('radiationValue').textContent = `${gameState.radiation}/${gameState.maxRadiation}`;
    
    document.getElementById('capsValue').textContent = gameState.caps;
}

function updateInventory() {
    const grid = document.getElementById('inventoryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    gameState.inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-quantity">x${item.quantity}</div>
        `;
        grid.appendChild(itemDiv);
    });
}

function toggleStory() {
    const panel = document.getElementById('storyPanel');
    const others = document.querySelectorAll('.inventory-panel, .save-panel');
    others.forEach(p => p.style.display = 'none');
    panel.style.display = 'block';
}

function toggleStats() {
    const panel = document.getElementById('statsPanel');
    panel.classList.toggle('active');
    updateStats();
}

function toggleInventory() {
    const panel = document.getElementById('inventoryPanel');
    const others = document.querySelectorAll('.story-panel, .save-panel');
    others.forEach(p => p.style.display = 'none');
    panel.style.display = 'block';
    updateInventory();
}

function toggleSave() {
    const panel = document.getElementById('savePanel');
    const others = document.querySelectorAll('.story-panel', '.inventory-panel');
    others.forEach(p => p.style.display = 'none');
    panel.style.display = 'block';
}

function saveGame() {
    const saveName = `保存_${new Date().toLocaleString()}`;
    const saveData = {
        name: saveName,
        timestamp: new Date().toISOString(),
        state: JSON.parse(JSON.stringify(gameState))
    };
    let saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    saves.push(saveData);
    localStorage.setItem('gameSaves', JSON.stringify(saves));
    showNotification('✅ 游戏已自动保存！');
    displaySaveList();
}

function loadGame(index) {
    const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    if (saves[index]) {
        Object.assign(gameState, saves[index].state);
        loadScene(gameState.currentScene);
        updateStats();
        showNotification('✅ 游戏已加载！');
    }
}

function resetGame() {
    gameState.chapter = 1;
    gameState.currentScene = 'awakening';
    gameState.hp = 100;
    gameState.hunger = 100;
    gameState.thirst = 100;
    gameState.radiation = 0;
    gameState.caps = 50;
    gameState.inventory = [
        { id: 1, name: '破旧衣服', quantity: 1, icon: '👕' },
        { id: 2, name: '生锈匕首', quantity: 1, icon: '🔪' },
        { id: 3, name: '旧水瓶', quantity: 2, icon: '🍾' },
        { id: 4, name: '罐头食物', quantity: 3, icon: '🥫' }
    ];
    loadScene('awakening');
    updateStats();
    showNotification('🎮 新游戏已开始！');
}

function displaySaveList() {
    const saveList = document.getElementById('saveList');
    if (!saveList) return;
    
    const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    
    saveList.innerHTML = '';
    if (saves.length === 0) {
        saveList.innerHTML = '<p>还没有存档。</p>';
        return;
    }
    
    saves.forEach((save, index) => {
        const item = document.createElement('div');
        item.className = 'save-item';
        item.innerHTML = `
            <strong>${index}: ${save.name}</strong><br>
            <small>${new Date(save.timestamp).toLocaleString()}</small>
        `;
        item.onclick = () => loadGame(index);
        saveList.appendChild(item);
    });
}

function doSave() {
    saveGame();
}

function loadSave() {
    // 游戏启动时自动检查存档
}

// 初始化游戏
window.addEventListener('load', () => {
    updateStats();
    updateInventory();
    displaySaveList();
});
