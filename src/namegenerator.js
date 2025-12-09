// Array of nicknames
const nicknames = [
  "Feetlover",
  "CucumberKing",
  "Jokasmoka",
  "xXPussyslayer69Xx",
  "MrBombastic",
  "MrsBombastic",
  "Yomama",
  "Showersareforlosers",
  "Cookiemonster",
  "Woolomoolo",
  "OogieBoogie",
  "ThatDamnPeacock",
  "LadyGagaFan123",
  "MakeMonoMonoGreatAgain",
  "Scoobydoobydoo",
  "HONK",
  "LifeIsPakora",
  "MomSpaghetti",
];

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