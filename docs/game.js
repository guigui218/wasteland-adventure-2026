// Game State
let gameState = {
    currentLocation: 'start',
    playerStats: {
        health: 100,
        maxHealth: 100,
        hunger: 50,
        maxHunger: 100,
        energy: 75,
        maxEnergy: 100
    },
    inventory: [],
    visitedLocations: new Set(),
    gameStarted: false
};

// Game Locations and Scenes
const gameScenes = {
    start: {
        title: '荒原的边缘',
        description: `你睁开眼睛，发现自己躺在一片废墟中。
        
这是一个被核战争摧毁的世界。2026年的核弹袭击已经过去了10年。
        
周围是残破的建筑、生锈的金属和尘埃。远处传来奇怪的声音。
        
你需要生存。首先，你应该探索周围，寻找食物和庇护所。`,
        choices: [
            { text: '向北探索城市废墟', next: 'city' },
            { text: '向东走向森林', next: 'forest' },
            { text: '检查附近的物品', next: 'scavenge_start' }
        ]
    },
    city: {
        title: '废弃城市',
        description: `你进入了一个被摧毁的城市。
        
高楼大厦现在都是空壳，窗户破碎，街道上散落着各种垃圾。
        
你听到远处传来一些声音——可能是幸存者，也可能是危险的东西。
        
街道上有几栋看起来还能进去的建筑。`,
        choices: [
            { text: '进入最近的建筑', next: 'building' },
            { text: '小心地继续前进', next: 'city_deep' },
            { text: '返回', next: 'start' }
        ]
    },
    building: {
        title: '废弃商店',
        description: `你进入了一栋破旧的商店建筑。
        
里面一片漆黑，只有微弱的光线从破碎的窗户透进来。
        
你能看到货架上还有一些东西——可能是食物或有用的物品。
        
但是，角落里传来了诡异的声音...`,
        choices: [
            { text: '快速搜索并离开', next: 'loot_building', action: 'loot' },
            { text: '调查声音', next: 'encounter_danger' },
            { text: '离开建筑', next: 'city' }
        ]
    },
    loot_building: {
        title: '搜索中...',
        description: `你匆匆忙忙地搜索货架。
        
你找到了：
- 一罐罐头食品
- 一瓶水
- 一个手电筒
- 一些急救用品
        
这些物品可能会救你一命。你的背包里装满了有用的物品。`,
        action: 'addItems',
        items: ['罐头食品', '水瓶', '手电筒', '急救包'],
        choices: [
            { text: '满载而归，离开', next: 'city' }
        ]
    },
    encounter_danger: {
        title: '危险！',
        description: `你走向声音的来源，突然一个巨大的变异生物冲向你！
        
它曾经可能是一只狗，但核辐射使它变成了一个怪物。
        
你需要做出快速决定！`,
        choices: [
            { text: '逃跑', next: 'city_escape' },
            { text: '尝试与它交流', next: 'creature_talk' }
        ]
    },
    city_escape: {
        title: '逃离',
        description: `你冲出建筑，怪物紧追不舍。
        
你全力奔跑，终于甩掉了它。你的心脏剧烈跳动，气喘吁吁。
        
你失去了一些血量，但至少活下来了。`,
        action: 'damage',
        amount: 20,
        choices: [
            { text: '继续探索城市', next: 'city' },
            { text: '向森林进发', next: 'forest' }
        ]
    },
    creature_talk: {
        title: '意想不到的转折',
        description: `你缓缓抬起��手，试图安抚这个生物。
        
令你吃惊的是，它停止了攻击，开始嗅你。
        
也许它曾经是有家的宠物。你轻轻触摸它的头，它发出了一声低鸣。
        
这个生物似乎不会伤害你...`,
        choices: [
            { text: '收留这个生物作为伙伴', next: 'animal_friend', action: 'addCompanion' },
            { text: '小心地离开', next: 'city' }
        ]
    },
    animal_friend: {
        title: '新的伙伴',
        description: `你决定留下这个生物。
        
给它取名为"幸存者"。虽然它看起来很凶，但它现在是你的朋友。
        
有一个伙伴会让生存变得容易一些。`,
        action: 'addItems',
        items: ['忠诚的伙伴'],
        choices: [
            { text: '继续探索', next: 'city' }
        ]
    },
    forest: {
        title: '荒芜的森林',
        description: `你走进了一片森林，但这里没有往日的生机。
        
树木都枯死了，地上覆盖着灰烬和落叶。
        
但是，你注意到一些野生植物——可能是可以吃的。
        
远处有一座小山丘，山顶上似乎有一个建筑物的轮廓。`,
        choices: [
            { text: '采集植物', next: 'gather_plants', action: 'gather' },
            { text: '向山丘前进', next: 'mountain' },
            { text: '返回', next: 'start' }
        ]
    },
    gather_plants: {
        title: '采集资源',
        description: `你小心地采集了一些可以吃的植物。
        
你找到了：
- 浆果
- 蘑菇
- 树根
        
这些不是最美味的食物，但在这个世界里，能吃到任何东西都是幸运的。`,
        action: 'addItems',
        items: ['浆果', '蘑菇', '树根'],
        choices: [
            { text: '继续探索', next: 'forest' },
            { text: '生火做饭', next: 'make_fire', action: 'heal' }
        ]
    },
    make_fire: {
        title: '生火',
        description: `你收集了一些干木头和树枝。
        
用你找到的打火机或者摩擦木头，你终于成功生起了火。
        
温暖的火焰照亮了黑暗，你开始烹饪你采集的植物。
        
食物虽然简陋，但热汤让你感到舒适多了。你的饥饿值和能量恢复了。`,
        action: 'restore',
        choices: [
            { text: '继续探索', next: 'forest' },
            { text: '在此休息', next: 'camp' }
        ]
    },
    camp: {
        title: '临时营地',
        description: `你在火边建立了一个小营地。
        
在这个危险的世界里，一个安全的地方是难得的。
        
你可以在这里休息和恢复。`,
        choices: [
            { text: '睡眠', next: 'sleep', action: 'fullRestore' },
            { text: '继续探索', next: 'forest' }
        ]
    },
    sleep: {
        title: '好好睡一觉',
        description: `你躺在火边，闭上眼睛。
        
在这个混乱的世界里，能够安全而舒适地睡眠是一个巨大的奢侈。
        
当你醒来时，感到精神焕发。所有的属性都恢复了。`,
        choices: [
            { text: '继续你的冒险', next: 'forest' }
        ]
    },
    mountain: {
        title: '山顶的避难所',
        description: `你爬上山丘，来到了一个古老的建筑前。
        
这看起来像是冷战时期的军事设施——一个地下掩体。
        
门上有生锈的标志，但它似乎还可以打开。`,
        choices: [
            { text: '进入掩体', next: 'bunker', action: 'discover' },
            { text: '继续探索', next: 'forest' }
        ]
    },
    bunker: {
        title: '发现！',
        description: `你进入了掩体。内部出乎意料地保存完好。
        
这里有充足的资源和安全的庇护所。
        
你决定在这里建立一个基地。`,
        action: 'addItems',
        items: ['防护服', '罐头x5', '发电机', '幸存者日志'],
        choices: [
            { text: '完成游戏', next: 'end_good' }
        ]
    },
    end_good: {
        title: '新的希望',
        description: `恭喜！你已经找到了安全的庇护所。
        
你在掩体中建立了新的家园。也许会有其他幸存者加入你。
        
你的生存冒险才刚刚开始...`,
        choices: [
            { text: '开始新游戏', next: 'start', action: 'newGame' }
        ]
    },
    city_deep: {
        title: '城市深处',
        description: `你继续深入城市。建筑变得更加密集和危险。`,
        choices: [
            { text: '寻找避难所', next: 'shelter' },
            { text: '返回', next: 'city' }
        ]
    },
    shelter: {
        title: '社区',
        description: `你找到了一个幸存者聚居点！
        
有几个人在这里建立了一个小社区。他们欢迎你加入。`,
        choices: [
            { text: '加入社区', next: 'end_community', action: 'join' },
            { text: '离开', next: 'city' }
        ]
    },
    end_community: {
        title: '有了朋友',
        description: `你加入了这个幸存者社区。
        
恭喜！游戏结束。`,
        choices: [
            { text: '开始新游戏', next: 'start', action: 'newGame' }
        ]
    },
    scavenge_start: {
        title: '搜索废墟',
        description: `你在周围的废墟中搜索。
        
你找到了一些有用的东西。`,
        action: 'addItems',
        items: ['背包', '绳子', '刀子'],
        choices: [
            { text: '继续探索城市', next: 'city' },
            { text: '前往森林', next: 'forest' }
        ]
    }
};

// Initialize Game
function startGame() {
    gameState.gameStarted = true;
    displayScene('start');
}

function newGame() {
    gameState = {
        currentLocation: 'start',
        playerStats: {
            health: 100,
            maxHealth: 100,
            hunger: 50,
            maxHunger: 100,
            energy: 75,
            maxEnergy: 100
        },
        inventory: [],
        visitedLocations: new Set(),
        gameStarted: true
    };
    displayScene('start');
}

function displayScene(locationKey) {
    const scene = gameScenes[locationKey];
    if (!scene) return;

    gameState.currentLocation = locationKey;
    gameState.visitedLocations.add(locationKey);

    document.getElementById('current-scene').textContent = scene.title;
    document.getElementById('scene-description').textContent = scene.description;

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    scene.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.innerHTML = `${index + 1}. ${choice.text}`;
        button.onclick = () => selectChoice(choice);
        choicesContainer.appendChild(button);
    });

    if (scene.action === 'addItems' && scene.items) {
        scene.items.forEach(item => {
            if (!gameState.inventory.includes(item)) {
                gameState.inventory.push(item);
            }
        });
    } else if (scene.action === 'damage' && scene.amount) {
        gameState.playerStats.health -= scene.amount;
    } else if (scene.action === 'heal') {
        gameState.playerStats.health = Math.min(
            gameState.playerStats.health + 30,
            gameState.playerStats.maxHealth
        );
        gameState.playerStats.hunger = Math.max(gameState.playerStats.hunger - 20, 0);
    } else if (scene.action === 'fullRestore') {
        gameState.playerStats.health = gameState.playerStats.maxHealth;
        gameState.playerStats.hunger = 0;
        gameState.playerStats.energy = gameState.playerStats.maxEnergy;
    } else if (scene.action === 'restore') {
        gameState.playerStats.health = Math.min(
            gameState.playerStats.health + 20,
            gameState.playerStats.maxHealth
        );
        gameState.playerStats.hunger = Math.max(gameState.playerStats.hunger - 30, 0);
        gameState.playerStats.energy = Math.min(
            gameState.playerStats.energy + 15,
            gameState.playerStats.maxEnergy
        );
    }

    updateStats();
    updateInventory();
    
    if (gameState.playerStats.health <= 0) {
        endGame();
    }
}

function selectChoice(choice) {
    if (choice.action === 'newGame') {
        newGame();
    } else {
        displayScene(choice.next);
    }
}

function submitCommand() {
    const input = document.getElementById('command-input').value.toLowerCase().trim();
    document.getElementById('command-input').value = '';

    if (!gameState.gameStarted) {
        startGame();
        return;
    }

    const scene = gameScenes[gameState.currentLocation];
    if (scene) {
        const choiceIndex = parseInt(input) - 1;
        if (choiceIndex >= 0 && choiceIndex < scene.choices.length) {
            selectChoice(scene.choices[choiceIndex]);
            return;
        }
    }

    handleCommand(input);
}

function handleCommand(cmd) {
    if (cmd === 'status' || cmd === 'stats') {
        showStatus();
    } else if (cmd === 'inventory' || cmd === 'inv') {
        showInventory();
    } else if (cmd === 'help') {
        toggleHelp();
    } else if (cmd === 'look') {
        const scene = gameScenes[gameState.currentLocation];
        if (scene) {
            document.getElementById('scene-description').textContent = scene.description;
        }
    }
}

function showStatus() {
    const stats = gameState.playerStats;
    alert(`生命值: ${stats.health}/${stats.maxHealth}\n饥饿值: ${stats.hunger}/${stats.maxHunger}\n精力: ${stats.energy}/${stats.maxEnergy}`);
}

function showInventory() {
    const items = gameState.inventory.length > 0 
        ? gameState.inventory.join(', ')
        : '背包是空的';
    alert(`背包: ${items}`);
}

function updateStats() {
    document.getElementById('health-text').textContent = 
        `${gameState.playerStats.health}/${gameState.playerStats.maxHealth}`;
    document.getElementById('health-bar').style.width = 
        `${(gameState.playerStats.health / gameState.playerStats.maxHealth) * 100}%`;

    document.getElementById('hunger-text').textContent = 
        `${gameState.playerStats.hunger}/${gameState.playerStats.maxHunger}`;
    document.getElementById('hunger-bar').style.width = 
        `${(gameState.playerStats.hunger / gameState.playerStats.maxHunger) * 100}%`;

    document.getElementById('energy-text').textContent = 
        `${gameState.playerStats.energy}/${gameState.playerStats.maxEnergy}`;
    document.getElementById('energy-bar').style.width = 
        `${(gameState.playerStats.energy / gameState.playerStats.maxEnergy) * 100}%`;
}

function updateInventory() {
    const inventoryDiv = document.getElementById('inventory');
    if (gameState.inventory.length === 0) {
        inventoryDiv.innerHTML = '<p style="color: #aaa;">背包为空</p>';
    } else {
        inventoryDiv.innerHTML = gameState.inventory.map(item => 
            `<span class="inventory-item">${item}</span>`
        ).join('');
    }
}

function saveGame() {
    localStorage.setItem('wasteland_save', JSON.stringify(gameState));
    alert('游戏已保存！');
}

function loadGame() {
    const saved = localStorage.getItem('wasteland_save');
    if (saved) {
        gameState = JSON.parse(saved);
        displayScene(gameState.currentLocation);
        alert('游戏已读取！');
    } else {
        alert('没有保存的游戏数据');
    }
}

function toggleHelp() {
    const modal = document.getElementById('help-modal');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

function endGame() {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '<button class="choice-button" onclick="newGame()">开始新游戏</button>';
    document.getElementById('current-scene').textContent = '游戏结束';
    document.getElementById('scene-description').textContent = '你已经牺牲了。但你的故事将在其他幸存者的心中继续...';
}

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitCommand();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '<button class="choice-button" onclick="startGame()">开始游戏</button>';
    document.getElementById('current-scene').textContent = '荒原冒险 2026';
    document.getElementById('scene-description').textContent = '欢迎来到一个被核战争摧毁的世界。你是幸存者之一。\n\n点击下面的按钮开始你的冒险...';
});