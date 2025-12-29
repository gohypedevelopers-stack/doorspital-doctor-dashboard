const fs = require('fs');
const path = 'src/pages/dashboard/Onboarding.jsx';
const content = fs.readFileSync(path, 'utf8');
const start = content.indexOf('const DocumentItem =');
if (start === -1) throw new Error('start not found');
const endSeq = '\r\n\r\n';
let end = content.indexOf(endSeq, start);
if (end === -1) {
  end = content.indexOf('\n\n', start);
}
if (end === -1) throw new Error('end not found');
const before = content.slice(0, start);
const after = content.slice(end + endSeq.length);
const newBlock = `const DocumentItem = ({ label, file }) => {
    const isUploaded = !!file;
    return (
        <div class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted mb-3 last:mb-0">
            <div class="flex items-center gap-3">
                <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                    {isUploaded ? <CheckCircle class="h-4 w-4" /> : <FileText class="h-4 w-4" />}
                </div>
                <div>
                    <p class="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
                    {file && <p class="text-xs text-slate-500 truncate max-w-[200px]">{file.filename}</p>}
                </div>
            </div>
            <span
                className={`text-xs font-medium px-2 py-1 rounded ${isUploaded ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"}`}>
                {isUploaded ? "Uploaded" : "Pending"}
            </span>
        </div>
    );
};

`;
fs.writeFileSync(path, before + newBlock + after);
