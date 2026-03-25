
const fs = require('fs');
const content = fs.readFileSync('c:/Users/admin/.gemini/antigravity/scratch/HIS/src/pages/his/Examination.jsx', 'utf8');
let divLevel = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let opens = (line.match(/<div/g) || []).length;
    let closes = (line.match(/<\/div/g) || []).length;
    divLevel += opens - closes;
    if (divLevel < 0) {
        console.log(`Div Mismatch at line ${i + 1}: level ${divLevel}`);
        // break;
    }
}
console.log(`Final div level: ${divLevel}`);
