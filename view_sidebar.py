from pathlib import Path\ntext = Path('src/pharmacy/components/Sidebar.jsx').read_text().splitlines()\nfor i,line in enumerate(text,1):\n    print(f'{i:03} {line}')
