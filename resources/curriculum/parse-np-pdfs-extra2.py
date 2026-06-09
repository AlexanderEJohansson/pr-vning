#!/usr/bin/env python3
"""Download remaining NP PDFs from Umeå (2012-2014, ht14, ht15, vt15)."""
import re, os, json
import urllib.request
import subprocess
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'np-pdfs'

NP_PDFS = [
    # Matematik 2 — ht14, vt14, ht13, vt13, ht12
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-ht15.pdf', 'matematik-2', '2015', 'ht', 'Ma2a-ht15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-ht15.pdf', 'matematik-2', '2015', 'ht', 'Ma2b-ht15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-ht15.pdf', 'matematik-2', '2015', 'ht', 'Ma2c-ht15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-ht14.pdf', 'matematik-2', '2014', 'ht', 'Ma2a-ht14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-ht14.pdf', 'matematik-2', '2014', 'ht', 'Ma2b-ht14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-ht14.pdf', 'matematik-2', '2014', 'ht', 'Ma2c-ht14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt14.pdf', 'matematik-2', '2014', 'vt', 'Ma2a-vt14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt14.pdf', 'matematik-2', '2014', 'vt', 'Ma2b-vt14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt14.pdf', 'matematik-2', '2014', 'vt', 'Ma2c-vt14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-ht13.pdf', 'matematik-2', '2013', 'ht', 'Ma2a-ht13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-ht13.pdf', 'matematik-2', '2013', 'ht', 'Ma2b-ht13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-ht13.pdf', 'matematik-2', '2013', 'ht', 'Ma2c-ht13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt13.pdf', 'matematik-2', '2013', 'vt', 'Ma2a-vt13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt13.pdf', 'matematik-2', '2013', 'vt', 'Ma2b-vt13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt13.pdf', 'matematik-2', '2013', 'vt', 'Ma2c-vt13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-ht12.pdf', 'matematik-2', '2012', 'ht', 'Ma2a-ht12'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-ht12.pdf', 'matematik-2', '2012', 'ht', 'Ma2b-ht12'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-ht12.pdf', 'matematik-2', '2012', 'ht', 'Ma2c-ht12'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt12.pdf', 'matematik-2', '2012', 'vt', 'Ma2b-vt12-umu'),
    # Matematik 3 — ht14, vt14, ht13, vt13, ht12
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-ht15.pdf', 'matematik-3', '2015', 'ht', 'Ma3b-ht15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-ht15.pdf', 'matematik-3', '2015', 'ht', 'Ma3c-ht15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt15.pdf', 'matematik-3', '2015', 'vt', 'Ma3b-vt15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt15.pdf', 'matematik-3', '2015', 'vt', 'Ma3c-vt15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-ht14.pdf', 'matematik-3', '2014', 'ht', 'Ma3b-ht14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-ht14.pdf', 'matematik-3', '2014', 'ht', 'Ma3c-ht14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt14.pdf', 'matematik-3', '2014', 'vt', 'Ma3b-vt14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt14.pdf', 'matematik-3', '2014', 'vt', 'Ma3c-vt14'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-ht13.pdf', 'matematik-3', '2013', 'ht', 'Ma3b-ht13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-ht13.pdf', 'matematik-3', '2013', 'ht', 'Ma3c-ht13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt13.pdf', 'matematik-3', '2013', 'vt', 'Ma3b-vt13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt13.pdf', 'matematik-3', '2013', 'vt', 'Ma3c-vt13'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-ht12.pdf', 'matematik-3', '2012', 'ht', 'Ma3b-ht12'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-ht12.pdf', 'matematik-3', '2012', 'ht', 'Ma3c-ht12'),
]

def download(url, name):
    path = DATA_DIR / f'{name}.pdf'
    if path.exists():
        return path
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if not data.startswith(b'%PDF'):
            return None
        with open(path, 'wb') as f:
            f.write(data)
        return path
    except Exception:
        return None

def parse(pdf_path, course, year, term, name):
    result = subprocess.run(['pdftotext', str(pdf_path), '-'], capture_output=True, text=True)
    if result.returncode != 0:
        return []
    text = result.stdout
    questions = []
    blocks = re.split(r'\n(?=\d+\.?\s*\n)', text)
    for block in blocks:
        m = re.match(r'^(\d+)\.?\s*\n(.*?)(?=\n\d+\.?\s*\n|\Z)', block, re.DOTALL)
        if not m:
            continue
        q_num = int(m.group(1))
        if q_num > 50 or q_num < 1:
            continue
        content = m.group(2).strip()
        pts = re.search(r'\((\d+)/(\d+)/(\d+)\)', content)
        if pts:
            e_pts, c_pts, a_pts = int(pts.group(1)), int(pts.group(2)), int(pts.group(3))
        else:
            max_match = re.search(r'\(Max\s+(\d+)\s*p\)', content, re.IGNORECASE)
            if max_match:
                e_pts = int(max_match.group(1))
                c_pts, a_pts = 0, 0
            else:
                continue
        content = re.sub(r'_+\s*', '', content)
        content = re.sub(r'\(\d+/\d+/\d+\)\s*', '', content)
        content = re.sub(r'\(Max\s+\d+\s*p\)\s*', '', content)
        content = re.sub(r'\s+\n', '\n', content).strip()
        if len(content) < 25:
            continue
        questions.append({
            'question_num': q_num, 'content': content[:1500],
            'e_points': e_pts, 'c_points': c_pts, 'a_points': a_pts,
            'year': year, 'term': term, 'course': course, 'source_pdf': name,
        })
    return questions

def main():
    all_questions = []
    print(f'Processing {len(NP_PDFS)} additional NP PDFs...\n')
    for url, course, year, term, name in NP_PDFS:
        path = DATA_DIR / f'{name}.pdf'
        cached = path.exists()
        print(f'[{name}] ', end='', flush=True)
        if not cached:
            path = download(url, name)
            if not path:
                print('FAILED')
                continue
        qs = parse(path, course, year, term, name)
        for q in qs:
            q['source_url'] = url
        all_questions.extend(qs)
        print(f'{len(qs)} q' + (' (cached)' if cached else ''))
    out = DATA_DIR / 'all-np-questions-extra2.json'
    json.dump(all_questions, open(out, 'w'), indent=2, ensure_ascii=False)
    print(f'\nTotal new: {len(all_questions)}')

if __name__ == '__main__':
    main()