// Array of nicknames
const nicknames = [
  "Feetlover",
  "Cucumberking",
  "Jokasmoka",
  "xXPussyslayer69Xx",
  "MrBombastic",
  "MrsBombastic",
  "Yomama",
  "Showersareforlosers",
  "Cookiemonster",
  "ThatDamnPeacock",
  "LadyGagaFan123",
  "MakeMonoMonoGreatAgain",
  "Scoobydoobydoo",
];
    const userNicknames = new Map();

    export class NicknameGenerator {
        constructor() {
            this.userNicknames = new Map();
         }

    generate(socketId) {
        //check if nickname has been assigned
        if (this.userNicknames.has(socketId)) {
            return this.userNicknames.get(socketId);
        }
        
        //generate new nickname
        const randomIndex = Math.floor(Math.random() * nicknames.length);
        const nickname = nicknames[randomIndex];

        //Store new nickname
        this.userNicknames.set(socketId, nickname);

        return nickname;

        }
    }