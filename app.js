function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            battleLogs: [],
            playerHealth: 100,
            monsterHealth: 100,
            gameOver: false,
            round: 1
        }
    },

    methods: {



        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameOver = false;
            this.battleLogs = [];
            this.round = 1;
        },

        surrender() {
            this.gameOver = true;
            this.battleLogs.unshift('The Player Surrendered');
        },

        healPlayer() {

            if (this.playerHealth < 100) {
                this.playerHealth += 15;
                this.battleLogs.unshift('The Player Healed +15');
                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }
            }
            this.round++;
            this.attackPlayer();
        },

        attackMonster() {

            if (this.monsterHealth > 0 && this.playerHealth !== 0) {
                const damage = getRandomValue(20, 10);
                this.monsterHealth -= damage;
                this.round++;
                this.battleLogs.unshift(`The Player Attacked by ${damage} `);
                if (this.monsterHealth <= 0) {
                    this.monsterHealth = 0;
                    this.gameOver = true;
                    this.battleLogs.unshift('GAME OVER - PLAYER WIN');
                    return
                } else { this.attackPlayer(); }

            }

        },
        attackPlayer() {

            if (this.playerHealth > 0 && this.monsterHealth !== 0) {
                const damage = getRandomValue(20, 12);
                this.playerHealth -= damage;
                this.battleLogs.unshift(`The Monster Attacked by ${damage} `);

                if (this.playerHealth <= 0) {
                    this.playerHealth = 0;
                    this.gameOver = true;
                    this.battleLogs.unshift('GAME OVER - MONSTER WIN');
                }

            }
        },

        specialAttackMonster() {
            if (this.monsterHealth > 0 && this.playerHealth !== 0) {
                const damage = getRandomValue(40, 20);
                this.monsterHealth -= damage;
                this.battleLogs.unshift(`SPECIAL ATTACK with the Player by ${damage} `);
                this.round++;
                if (this.monsterHealth <= 0) {
                    this.monsterHealth = 0;
                    this.gameOver = true;
                    this.battleLogs.unshift('GAME OVER - PLAYER WIN');
                    return
                } else { this.specialAttackPlayer(); }

            }

        },
        specialAttackPlayer() {
            if (this.playerHealth > 0 && this.monsterHealth !== 0) {
                const damage = getRandomValue(30, 20);
                this.playerHealth -= damage;
                this.battleLogs.unshift(`SPECIAL ATTACK with the Monster by ${damage} `);

                if (this.playerHealth <= 0) {
                    this.playerHealth = 0;
                    this.gameOver = true;
                    this.battleLogs.unshift('GAME OVER - MONSTER WIN');

                }

            }
        }
    },

    computed: {
        happyHour() {
            if (this.round % 3 !== 0) {
                return true
            } else { return false }
        },
        monsterBar() {
            return { width: this.monsterHealth + '%' }
        },

        playerBar() {
            return { width: this.playerHealth + '%' }
        }


    }
});
app.mount('#game');