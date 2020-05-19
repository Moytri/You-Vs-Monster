new Vue({
    el: "#app",
    data: {
        isGameRunning: true,
        playerHealth: 100,
        monsterHealth: 100,
    },
    methods: {
        startGame: function() {
            this.isGameRunning = !this.isGameRunning;
        },
        attack: function() {

        },
        specialAttack: function() {

        },
        heal: function() {

        },
        giveUp: function() {
            this.isGameRunning = !this.isGameRunning;
        }
    }
})