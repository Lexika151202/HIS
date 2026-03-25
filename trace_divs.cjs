
const fs = require('fs');
const content = fs.readFileSync('c:/Users/admin/.gemini/antigravity/scratch/HIS/src/pages/his/Examination.jsx', 'utf8');
let level = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let opens = (line.match(/<div/g) || []).length;
    let closes = (line.match(/<\/div/g) || []).length;
    level += opens - closes;
    console.log(`${i + 1}: [${level}] ${line.trim().substring(0, 30)}`);
}
