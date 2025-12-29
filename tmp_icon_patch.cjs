const fs = require('fs');
const path = 'src/pages/dashboard/Onboarding.jsx';
let content = fs.readFileSync(path, 'utf8');
const icons = [
  { name: 'Personal Details', icon: '??' },
  { name: 'Professional Info', icon: '??' },
  { name: 'Registration', icon: '???' },
  { name: 'Submitted Documents', icon: '??' }
];
for (const item of icons) {
  content = content.replace(new RegExp(`<InfoCard title="${item.name}" icon="[^"]*">`), `<InfoCard title="${item.name}" icon="${item.icon}">`);
}
content = content.replace(/<span>dY"\?"<\/span>/, '<span class="text-blue-900">??</span>');
content = content.replace(/\{isUploaded \? 'ƒo"' : 'ƒ\?"'\}/, `{isUploaded ? '?' : '?'}`);
simulate = content;
fs.writeFileSync(path, content);
