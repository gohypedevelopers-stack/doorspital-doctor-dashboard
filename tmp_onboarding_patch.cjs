const fs = require('fs');
const path = 'src/pages/dashboard/Onboarding.jsx';
let content = fs.readFileSync(path, 'utf8');
const replacements = [
  {
    regex: /<InfoCard title="Personal Details" icon="[^"]*">/,
    replacement: '<InfoCard title="Personal Details" icon={<User className="h-5 w-5 text-slate-900 dark:text-slate-100" />>}>'
  },
  {
    regex: /<InfoCard title="Professional Info" icon="[^"]*">/,
    replacement: '<InfoCard title="Professional Info" icon={<Briefcase className="h-5 w-5 text-slate-900 dark:text-slate-100" />>}>'
  },
  {
    regex: /<InfoCard title="Registration" icon="[^"]*">/,
    replacement: '<InfoCard title="Registration" icon={<ShieldCheck className="h-5 w-5 text-slate-900 dark:text-slate-100" />>}>'
  },
  {
    regex: /<InfoCard title="Submitted Documents" icon="[^"]*">/,
    replacement: '<InfoCard title="Submitted Documents" icon={<FileCheck className="h-5 w-5 text-slate-900 dark:text-slate-100" />>}>'
  },
  {
    regex: /<span>dY"\?"<\/span>/,
    replacement: '<MessageSquare className="h-4 w-4 text-blue-900" />'
  }
];
for (const { regex, replacement } of replacements) {
  content = content.replace(regex, replacement);
}
const docRegex = /const DocumentItem[\s\S]*?};\r?\n\r?\n/;
const newBlockLines = [
  'const DocumentItem = ({ label, file }) => {',
  '    const isUploaded = !!file;',
  '    return (',
  '        <div class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted mb-3 last:mb-0">',
  '            <div class="flex items-center gap-3">',
  '                <div',
  '                    className={`h-8 w-8 rounded-full flex items-center justify-center ${isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
  '                    {isUploaded ? <CheckCircle class="h-4 w-4" /> : <FileText class="h-4 w-4" />}',
  '                </div>',
  '                <div>',
  '                    <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>',
  '                    {file && <p class="text-xs text-slate-500 truncate max-w-[200px]">{file.filename}</p>}',
  '                </div>',
  '            </div>',
  '            <span',
  '                className={`text-xs font-medium px-2 py-1 rounded ${isUploaded ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"}`}>
  '                {isUploaded ? "Uploaded" : "Pending"}',
  '            </span>',
  '        </div>',
  '    );',
  '};',
  ''
];
const newBlock = newBlockLines.join('\n');
if (!docRegex.test(content)) throw new Error('document block not found');
content = content.replace(docRegex, newBlock);
fs.writeFileSync(path, content);
