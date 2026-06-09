#!/usr/bin/env python3
"""Parse Skolverket HTML and output JSON for all courses."""
import re, json
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'data'

def parse_course(html: str, course_code: str) -> dict:
    codes = ['MATMAT01a', 'MATMAT01b', 'MATMAT01c',
             'MATMAT02a', 'MATMAT02b', 'MATMAT02c',
             'MATMAT03b', 'MATMAT03c']
    
    anchors = {}
    for code in codes:
        m = re.search(f'id="anchor_{code}"', html)
        anchors[code] = m.start() if m else -1
    
    if course_code not in anchors or anchors[course_code] == -1:
        return {'central_content': [], 'knowledge_requirements': []}
    
    start = anchors[course_code]
    next_pos = len(html)
    idx = codes.index(course_code)
    for nc in codes[idx+1:]:
        if anchors[nc] > start and anchors[nc] < next_pos:
            next_pos = anchors[nc]
    
    section = html[start:next_pos]
    
    # Centralt innehåll: from "Undervisningen i" h4 to "<h3>Betygskriterier"
    start_marker = '<h4>Undervisningen i kursen ska behandla'
    end_marker = '<h3>Betygskriterier'
    
    s = section.find(start_marker)
    e = section.find(end_marker)
    if s == -1 or e == -1:
        print(f"    WARNING: s={s}, e={e}")
        return {'central_content': [], 'knowledge_requirements': []}
    
    ci_section = section[s:e]
    
    # Extract all <li> items
    ci_items = []
    for li in re.findall(r'<li[^>]*>(.*?)</li>', ci_section, re.DOTALL):
        text = re.sub(r'<[^>]+>', '', li).replace('&nbsp;', ' ').replace('\n', ' ').strip()
        text = re.sub(r'\s+', ' ', text)
        if len(text) > 15:
            ci_items.append(text)
    
    # Knowledge requirements: from "<h3>Betygskriterier" to end of section
    kr_section = section[e:]
    kr_data = {}
    for grade in ['E', 'C', 'A']:
        g_match = re.search(
            rf'<h4>Betyget\s+{grade}(.*?)(?=<h4>Betyget\s+[A-Z]|$)',
            kr_section, re.DOTALL | re.IGNORECASE
        )
        if g_match:
            text = re.sub(r'<[^>]+>', ' ', g_match.group(1)).replace('&nbsp;', ' ').replace('\n', ' ').strip()
            text = re.sub(r'\s+', ' ', text)
            text = re.sub(r'^Elevens kunskaper bedöms sammantaget[^.]+\.\s*', '', text, flags=re.IGNORECASE)
            if len(text) > 20:
                kr_data[grade] = text
    
    return {'central_content': ci_items, 'knowledge_requirements': kr_data}

def main():
    html_path = DATA_DIR / 'MATMAT01a.html'
    if not html_path.exists():
        print(f"Cache miss: {html_path} not found. Run fetch-skolverket.ts first.")
        return
    
    html = open(html_path).read()
    
    codes = ['MATMAT01a', 'MATMAT01b', 'MATMAT01c',
             'MATMAT02a', 'MATMAT02b', 'MATMAT02c',
             'MATMAT03b', 'MATMAT03c']
    
    results = {}
    for code in codes:
        parsed = parse_course(html, code)
        results[code] = parsed
        out_path = DATA_DIR / f'{code}-parsed.json'
        json.dump(parsed, open(out_path, 'w'), indent=2, ensure_ascii=False)
        ci_count = len(parsed['central_content'])
        kr_grades = list(parsed['knowledge_requirements'].keys())
        print(f"{code}: {ci_count} CI items, KR={kr_grades}")
        if ci_count > 0:
            print(f"  First: {parsed['central_content'][0][:80]}")
    
    combined = DATA_DIR / 'all-courses-parsed.json'
    json.dump(results, open(combined, 'w'), indent=2, ensure_ascii=False)
    print(f"\nSaved to {combined}")

if __name__ == '__main__':
    main()