from pathlib import Path
lines = Path('src/pages/DoctorDashboard.jsx').read_text().splitlines()
for i,line in enumerate(lines[930:1020], start=931):
    print(f'{i}: {line}')
