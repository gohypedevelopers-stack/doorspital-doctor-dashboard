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
    r'"#fff"': '"var(--card)"',
    r'"#ffffff"': '"var(--card)"',
    
    # Text colors
    r'"#0f172a"': '"var(--foreground)"',  # Dark slate
    r'"#1e293b"': '"var(--foreground)"',
    r'"#334155"': '"var(--foreground)"',
    r'"#111827"': '"var(--foreground)"',
    r'"#1f2937"': '"var(--foreground)"',
    
    r'"#475569"': '"var(--muted-foreground)"',
    r'"#64748b"': '"var(--muted-foreground)"',
    r'"#4b5563"': '"var(--muted-foreground)"',
    
    r'"#374151"': '"var(--foreground)"',
    
    # Backgrounds and borders
    r'"#f8fafc"': '"var(--background)"', # Very light bg
    r'"#f9fafb"': '"var(--background)"',
    r'"#f1f5f9"': '"var(--secondary)"',
    r'"#f3f4f6"': '"var(--secondary)"',
    
    r'"#e2e8f0"': '"var(--border)"',
    r'"#e5e7eb"': '"var(--border)"',
    r'"#d1d5db"': '"var(--border)"',
    r'"#cbd5e1"': '"var(--border)"',
}

src_dir = r"d:\handover goHype Doorspital\doorspital-doctor-dashboard\src\pages"

for filename in files_to_fix:
    filepath = os.path.join(src_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We only want to replace standalone color hexes inside style={{}} safely.
        # But wait, there are also solid backgrounds like background: "#fff"
        # We can just do a direct string replace if it matches exactly.
        
        new_content = content
        for hex_color, var_color in color_map.items():
            new_content = new_content.replace(hex_color, var_color)
            # also handle uppercase versions
            new_content = new_content.replace(hex_color.upper(), var_color)
            
        # specifically fix top level background in minHeight: 100vh if they use background: '#fff' -> background: 'var(--background)'
        # It's okay if background is var(--card) for now, but var(--background) is better for root
        new_content = new_content.replace('background: "var(--card)"', 'backgroundColor: "var(--card)"')
        new_content = new_content.replace('background: "var(--background)"', 'backgroundColor: "var(--background)"')
        new_content = new_content.replace('background: "var(--secondary)"', 'backgroundColor: "var(--secondary)"')
        
        # fix hardcoded root style `background: "#fff"` or similar under minHeight: "100vh"
        new_content = new_content.replace('background: "var(--card)", minHeight: "100vh"', 'backgroundColor: "var(--background)", minHeight: "100vh"')
        new_content = new_content.replace('minHeight: "100vh", padding: "60px 16px", maxWidth: 800, margin: "0 auto", backgroundColor: "var(--card)"', 'minHeight: "100vh", padding: "60px 16px", maxWidth: 800, margin: "0 auto", backgroundColor: "var(--background)"')
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
    else:
        print(f"Not found: {filename}")
