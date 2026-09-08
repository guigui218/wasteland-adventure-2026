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
    choices: []
};

// 故事场景数据库
const storyDatabase = {
    awakening: {
        title: '第一章：苏醒',
        text: `
            <p>你缓缓睁开眼睛。头部传来阵阵刺痛。周围是一片模糊的轮廓——生锈的金属、破碎的混凝土。</p>
            <p>你躺在一个废弃的地下掩体中。通过裂开的天窗，你能看到外面那片荒凉的废土——焦黑的地面、枯死的树木、远处闪烁的绿色辐射光。</p>
            <p>记忆逐渐恢复。那场核弹浩劫摧毁了一切。文明崩塌了。你不知道自己在这里昏迷了多久。</p>
            <p>你检查了一下身体——还活着，虽然有些伤痕。你口袋里还有一些旧时代的东西：破旧的衣服、一把生锈的匕首、一个旧水瓶和几罐食物。</p>
            <p>在掩体的角落里，你发现了一张泛黄的地图。上面标记了一个地点——"锈水镇"。根据记忆，那里曾是一个幸存者社区。</p>
            <p>你需要做出选择。留在这个掩体可能很安全，但资源有限。出去寻找锈水镇可能会很危险，但那里可能有希望。</p>
        `,
        choices: [
            { text: '🚶 收拾行李，前往锈水镇', next: 'journey_start', consequence: '选择踏上未知的旅途' },
            { text: '🔍 先探索附近的废墟', next: 'explore_ruins', consequence: '收集更多补给' },
            { text: '😴 在掩体里再休息一会儿', next: 'rest_bunker', consequence: '恢复一些体力' }
        ]
    },
    
    journey_start: {
        title: '踏上旅途',
        text: `
            <p>你决定立即出发。外面的废土比你想象的还要荒凉。</p>
            <p>焦黑的地面在阳光下闪闪发光，那不是反光，而是某种放射性物质的光芒。远处的天空呈现病态的绿色，偶尔闪现紫色的闪电。</p>
            <p>你沿着地图上标记的路线前进。大约走了三小时后，你听到了声音——不是野兽的嚎叫，而是人类的对话声。</p>
            <p>前面有一个破烂的营地。几个人影在火堆周围忙碌着。他们看起来不像强盗，但也不完全可信。</p>
            <p>你需要决定如何接近他们。</p>
        `,
        choices: [
            { text: '🤝 走出去，主动打招呼', next: 'meet_camp_friendly', consequence: '展现友好的一面' },
            { text: '🤫 潜行靠近，先观察一下', next: 'meet_camp_stealthy', consequence: '收集情报' },
            { text: '🚶 绕过他们，继续前进', next: 'avoid_camp', consequence: '保持安全距离' }
        ]
    },

    explore_ruins: {
        title: '探索废墟',
        text: `
            <p>你决定先搜索附近的废墟，看能否找到更多有用的物资。</p>
            <p>掩体外面不远处是一座倒塌的建筑。那曾是一个超市——你还能看到破损的招牌。</p>
            <p>你小心翼翼地进入建筑。里面很暗，只有透过缝隙的微弱阳光照亮部分区域。架子上还散落着一些东西，虽然大多数已经腐烂了。</p>
            <p>突然，你听到了声音——某样东西在移动。那声音来自建筑的深处。</p>
            <p>你的手按在了匕首的刀柄上。是老鼠吗？还是...其他的什么？</p>
        `,
        choices: [
            { text: '⚔️ 拔出匕首，准备战斗', next: 'fight_creature', consequence: '可能会受伤' },
            { text: '🚪 迅速离开建筑', next: 'escape_ruins', consequence: '保留体力' },
            { text: '👂 静静地躲藏，观察情况', next: 'hide_ruins', consequence: '可能发现什么' }
        ]
    },

    rest_bunker: {
        title: '在掩体中休息',
        text: `
            <p>你觉得累极了。也许多休息一会儿能帮助恢复。你在掩体的角落里找到了一个勉强可用的床垫。</p>
            <p>你躺下来，闭上眼睛。掩体很安静，只有远处微弱的风声。</p>
            <p>但睡眠并不安宁。你做了噩梦——核弹爆炸的声音，尖叫声，然后是一片虚无。</p>
            <p>你醒来时已经是第二天早上。你感觉好多了，但也意识到了一个问题：掩体里的水只够几天了。</p>
            <p>你必须做出决定。无论如何，你都不能永远待在这里。</p>
        `,
        choices: [
            { text: '🚶 现在出发寻找锈水镇', next: 'journey_start', consequence: '体力恢复，精神百倍' },
            { text: '🔍 再探索一下附近', next: 'explore_ruins', consequence: '寻找更多补给' }
        ]
    },

    meet_camp_friendly: {
        title: '初识幸存者',
        text: `
            <p>你深呼一口气，走出了藏身处。</p>
            <p>"嘿！"你大声喊道。"我是个幸存者！"</p>
            <p>营地里的人立即停止了手中的工作。他们相互看了一眼，然后最前面的一个男人站了起来。他大约四十多岁，脸上有一道疤痕。</p>
            <p>"别动！"他喊道，但语气中没有敌意。"你是一个人吗？"</p>
            <p>"是的，"你回答，"我在找锈水镇。"</p>
            <p>男人的表情顿时改变了。"锈水镇？那个地方...很有意思。我叫雷克斯，这是我的队伍。我们也在前往那边。"</p>
            <p>他伸出了一只粗糙的手。</p>
        `,
        choices: [
            { text: '🤝 握手，加入他们', next: 'join_group', consequence: '获得队友和保护' },
            { text: '❓ 先问他们一些问题', next: 'question_group', consequence: '了解更多信息' },
            { text: '⚠️ 保持警惕，谢绝邀请', next: 'refuse_group', consequence: '保持独立' }
        ]
    },

    meet_camp_stealthy: {
        title: '潜行侦察',
        text: `
            <p>你蹲下身体，利用废墟的掩护靠近营地。</p>
            <p>你听到了他们的对话——他们在讨论一个叫"锈水镇"的地方，以及那里的一个叫"米娅"的女人。他们似乎是在进行某种交易。</p>
            <p>你注意到他们的武装——都是些简陋的武器，但看起来很有威胁性。其中一个人提到了"抢劫者"和"变异生物"的威胁。</p>
            <p>突然，你踩到了一根干树枝。声音很小，但在寂静的废土上足够清晰。</p>
            <p>营地里的人停止了说话。一个人站起身，向你的方向看来。</p>
            <p>"那边有人！"他大声喊道。</p>
        `,
        choices: [
            { text: '🏃 立即逃跑', next: 'escape_encounter', consequence: '失去机会，但保持安全' },
            { text: '🙋 走出来，试图和平谈判', next: 'meet_camp_friendly', consequence: '冒一些风险' },
            { text: '🔫 准备战斗', next: 'fight_group', consequence: '可能会受伤或死亡' }
        ]
    },

    avoid_camp: {
        title: '独行者',
        text: `
            <p>你决定绕过他们。信任陌生人似乎太冒险了。</p>
            <p>你小心地绕过营地，继续沿着地图标记的路线前进。</p>
            <p>又走了几个小时后，你终于看到了锈水镇的轮廓。这曾经是一个小镇，现在是一个经过改造的要塞。残破的建筑被改建成了防御工事，还有用废料制作的栅栏。</p>
            <p>镇子的入口处站着两个守卫。他们看到你后，立即举起了武器。</p>
            <p>"站住！"其中一个守卫喊道。"说出你的名字和意图！"</p>
        `,
        choices: [
            { text: '😊 友好地自我介绍', next: 'town_enter_friendly', consequence: '获得进入许可' },
            { text: '❓ 询问进入的条件', next: 'town_enter_questions', consequence: '了解更多规则' },
            { text: '🚶 转身离开', next: 'town_avoid', consequence: '保持距离' }
        ]
    },

    join_group: {
        title: '加入队伍',
        text: `
            <p>你握住了雷克斯的手。他的握力很强，但他的笑容是真诚的。</p>
            <p>"欢迎加入，"他说。"我叫你什么？"</p>
            <p>你报上了名字。</p>
            <p>"好的，${gameState.inventory[0].name ? '伙计' : '伙计'}。现在有四个人了。我们今晚就出发。锈水镇还有两天的路程。路上会很危险，但至少我们在一起。"</p>
            <p>你加入了队伍。他们给了你一个位置，分配了一些任务。你感到有些安心——至少你不再是一个人了。</p>
        `,
        choices: [
            { text: '👥 继续故事', next: 'chapter2_start', consequence: '故事进展到第二章' }
        ]
    },

    question_group: {
        title: '询问信息',
        text: `
            <p>"锈水镇怎么样？"你问道。"那里真的有幸存者吗？"</p>
            <p>雷克斯放下了手。"有。那个地方由一个叫'长老会'的组织管理。他们建立了一个相对稳定的社区。有房屋、食物、甚至有医生。"</p>
            <p>"为什么你们离开了？"</p>
            <p>"我们从未在那里。我们想去那里交易一些东西。"他指了指他们的背包。"这个世界上，无论在哪里，都需要交易。"</p>
            <p>"那里安全吗？"</p>
            <p>"相对来说。比外面安全得多。但也有危险——政治、资源竞争、还有外面的威胁。没有完全安全的地方。"</p>
            <p>他看着你。"你想和我们一起去吗？"</p>
        `,
        choices: [
            { text: '✅ 同意加入', next: 'join_group', consequence: '和队伍一起行动' },
            { text: '❌ 礼貌地拒绝', next: 'avoid_camp', consequence: '继续独立行动' }
        ]
    },

    town_enter_friendly: {
        title: '进入锈水镇',
        text: `
            <p>"我叫${gameState.inventory[0].name ? '一个幸存者' : '旅人'}，"你说。"我来自南方的一个掩体。我听说这里有一个社区。我想加入。"</p>
            <p>守卫们相互看了一眼。其中一个走向内部，可能去向上级报告了。</p>
            <p>几分钟后，他回来了。"长老会要见你。跟我来。"</p>
            <p>你被带进了镇子。这个地方比你想象的更有组织——有巡逻队、种植区、甚至一个简陋的市场。</p>
            <p>你看到了许多幸存者在日常生活中活动。有些在建筑，有些在种植，有些在修理东西。这确实是一个社区。</p>
            <p>你被带到了镇子中心的一个建筑前。这曾经是一个市政厅。现在，它成了长老会的总部。</p>
        `,
        choices: [
            { text: '👥 继续故事', next: 'chapter2_start', consequence: '进入第二章' }
        ]
    },

    chapter2_start: {
        title: '第二章：归属',
        text: `
            <p>你在锈水镇度过了第一个月。</p>
            <p>长老会接纳了你。他们给了你一间小屋、一份工作（维修和建筑）以及基本的补给。生活变得有了结构——虽然不舒适，但有希望。</p>
            <p>你开始学习这个社区是如何运作的。长老会由三个人组成：一个叫"史蒂文"的前工程师，一个叫"米娅"的医生，还有一个叫"杰克"的前军人。</p>
            <p>但镇子里也有紧张局势。有一个派系反对长老会的统治，主张更独裁的管理。他们叫自己"铁血团"。</p>
            <p>一天，米娅来找你。她的表情很严肃。"我需要你的帮助，"她说。"有些东西正在威胁我们。"</p>
        `,
        choices: [
            { text: '🤝 答应帮助', next: 'side_quest_medicine', consequence: '开启新的剧情分支' },
            { text: '❓ 先了解详情', next: 'question_mia', consequence: '获取更多信息' },
            { text: '⚠️ 礼貌地拒绝', next: 'refuse_mia', consequence: '保持中立' }
        ]
    }
};

// UI 函数
function startGame() {
    document.getElementById('mainMenu').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    loadScene('awakening');
}

function loadScene(sceneId) {
    const scene = storyDatabase[sceneId];
    if (!scene) return;

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
            updateInfo(choice.consequence);
        };
        choicesContainer.appendChild(button);
    });
}

function updateStats() {
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

function updateInfo(message) {
    document.getElementById('infoContent').innerHTML = `<p>💬 ${message}</p>`;
}

function toggleStory() {
    const panel = document.getElementById('storyPanel');
    const others = document.querySelectorAll('.inventory-panel, .save-panel');
    others.forEach(p => p.style.display = 'none');
    panel.style.display = 'flex';
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
    panel.style.display = 'flex';
    updateInventory();
}

function toggleSave() {
    const panel = document.getElementById('savePanel');
    const others = document.querySelectorAll('.story-panel, .inventory-panel');
    others.forEach(p => p.style.display = 'none');
    panel.style.display = 'flex';
}

function saveGame() {
    const saveName = prompt('输入存档名称：', `保存_${new Date().toLocaleString()}`);
    if (saveName) {
        const saveData = {
            name: saveName,
            timestamp: new Date().toISOString(),
            state: JSON.parse(JSON.stringify(gameState))
        };
        let saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
        saves.push(saveData);
        localStorage.setItem('gameSaves', JSON.stringify(saves));
        alert('游戏已保存！');
        displaySaveList();
    }
}

function loadGame() {
    const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    if (saves.length === 0) {
        alert('没有保存的游戏。');
        return;
    }
    
    const index = prompt(`选择存档编号 (0-${saves.length-1})：\n${saves.map((s, i) => `${i}: ${s.name}`).join('\n')}`);
    if (index !== null && saves[index]) {
        Object.assign(gameState, saves[index].state);
        loadScene(gameState.currentScene);
        updateStats();
        alert('游戏已加载！');
    }
}

function resetGame() {
    if (confirm('确定要开始新游戏吗？这将清除当前进度！')) {
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
    }
}

function displaySaveList() {
    const saveList = document.getElementById('saveList');
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
        item.onclick = () => {
            Object.assign(gameState, save.state);
            loadScene(gameState.currentScene);
            updateStats();
            alert('游戏已加载！');
        };
        saveList.appendChild(item);
    });
}

// 初始化游戏
window.addEventListener('load', () => {
    updateStats();
    updateInventory();
    displaySaveList();
});