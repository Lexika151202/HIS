
const fs = require('fs');
const content = fs.readFileSync('c:/Users/admin/.gemini/antigravity/scratch/HIS/src/pages/his/Examination.jsx', 'utf8');
let level = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let opens = (line.match(/\{/g) || []).length;
    let closes = (line.match(/\}/g) || []).length;
    level += opens - closes;
    if (level < 0) {
        console.log(`Imbalance at line ${i + 1}: level ${level}`);
        // break;
    }
}
console.log(`Final level: ${level}`);
