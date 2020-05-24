new Vue({
    el: "#app",
    data: {
        isGameRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        turns: []
    },
    methods: {
        startGame: function() {
            this.isGameRunning = !this.isGameRunning;
        },
        attack: function() {
            // monster damage
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.updateTurns(true, damage);
            if (this.selectWinner(this.monsterHealth, this.playerHealth)){
                return;
            }

            // player damage
            this.monsterAttack();
        },
        specialAttack: function() {
            // monster damage
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.updateTurns(true, damage, {
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if (this.selectWinner(this.monsterHealth, this.playerHealth)){
                return;
            }

            // player damage
            this.monsterAttack();
        },
        heal: function() {
            // player heal
            this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
            this.updateTurns(true, null, {
                isPlayer: true,
                text: 'Player heals for 10'
            });
            // player damage
            this.monsterAttack();
        },
        giveUp: function() {
            this.isGameRunning = !this.isGameRunning;
            this.resetHealth();
        },
        calculateDamage: function(min, max) {
            return Math.min(Math.floor(Math.random() * max) + 1, min);
        },
        selectWinner: function(monsterScore, playerScore) {
            if (monsterScore <= 0) {
                alert("You Won!");
                this.giveUp();
                return true;                           
            }
            if (playerScore <= 0) {
                alert("You lost!");
                this.giveUp();
                return true;
            }
            return false;
        },
        // when game finishes or not running health is 100
        resetHealth: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        monsterAttack: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.updateTurns(false, damage);
            this.selectWinner(this.monsterHealth, this.playerHealth); 
        },

        updateTurns: function(isPlayer, damage, info) {
            let defaultInfo = {
                isPlayer: isPlayer,
                text: isPlayer ? 'Player hits Monster for ' + damage : 'Monster hits Player for ' + damage
            };
            info ? this.turns.unshift(info) : this.turns.unshift(defaultInfo);
        }
    }
})