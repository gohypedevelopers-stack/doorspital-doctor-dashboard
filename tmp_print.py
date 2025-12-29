from pathlib import Path
text = Path('src/pages/dashboard/Onboarding.jsx').read_text()
start = text.index('const DocumentItem')
end = text.find('\n\n', start)
print(repr(text[start:end]))
