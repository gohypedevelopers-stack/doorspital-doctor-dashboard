import os
import re

files_to_fix = [
    "About.jsx",
    "Benefits.jsx",
    "Contact.jsx",
    "HelpCenter.jsx",
    "Faqs.jsx",
    "RefundPolicy.jsx",
    "GrievancePolicy.jsx",
    "DeleteAccount.jsx",
    "PrivacyPolicy.jsx",
    "Terms.jsx",
    "CookiePolicy.jsx",
    "ShippingPolicy.jsx",
    "Testimonials.jsx",
]

color_map = {
    r'#fff\b': 'var(--card)',
    r'#ffffff\b': 'var(--card)',
    r'#0f172a\b': 'var(--foreground)',
    r'#1e293b\b': 'var(--foreground)',
    r'#334155\b': 'var(--foreground)',
    r'#111827\b': 'var(--foreground)',
    r'#1f2937\b': 'var(--foreground)',
    r'#475569\b': 'var(--muted-foreground)',
    r'#64748b\b': 'var(--muted-foreground)',
    r'#4b5563\b': 'var(--muted-foreground)',
    r'#374151\b': 'var(--foreground)',
    r'#f8fafc\b': 'var(--background)',
    r'#f9fafb\b': 'var(--background)',
    r'#f1f5f9\b': 'var(--secondary)',
    r'#f3f4f6\b': 'var(--secondary)',
    r'#e2e8f0\b': 'var(--border)',
    r'#e5e7eb\b': 'var(--border)',
    r'#d1d5db\b': 'var(--border)',
    r'#cbd5e1\b': 'var(--border)',
}

src_dir = r"d:\handover goHype Doorspital\doorspital-doctor-dashboard\src\pages"

for filename in files_to_fix:
    filepath = os.path.join(src_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        
        # fix the previous partial replacements first if any
        # actually, my previous replacement replaced '"#fff"' with '"var(--card)"'
        # so var(--card) is already there. For the borders we have '#e2e8f0'. Let's replace those.
        for hex_color, var_color in color_map.items():
            # ignore case
            new_content = re.sub(hex_color, var_color, new_content, flags=re.IGNORECASE)
            
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename} again")
