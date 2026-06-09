#!/usr/bin/env python3
"""Mathleaks Matematik 1b/1c VT12 NP PDFs."""
import re, os, json
import urllib.request
import subprocess
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'np-pdfs'

NP_PDFS = [
    # Matematik 1b vt12
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1b-del1-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1b-vt12-del1'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1b-del2-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1b-vt12-del2'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1b-del3-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1b-vt12-del3'),
    # Matematik 1c vt12
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1c-del1-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1c-vt12-del1'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1c-del2-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1c-vt12-del2'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-1c-del3-vt12.pdf', 'matematik-1', '2012', 'vt', 'Ma1c-vt12-del3'),
    # Matematik 2b vt12 (komplettering)
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-2b-vt12.pdf', 'matematik-2', '2012', 'vt', 'Ma2b-vt12-mathleaks'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-2c-vt12.pdf', 'matematik-2', '2012', 'vt', 'Ma2c-vt12-mathleaks'),
    # Matematik 3b ht12
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-3b-ht12.pdf', 'matematik-3', '2012', 'ht', 'Ma3b-ht12-mathleaks'),
    ('https://mathleaks.se/wp-content/uploads/2014/12/nationella-prov-matematik-3c-ht12.pdf', 'matematik-3', '2012', 'ht', 'Ma3c-ht12-mathleaks'),
]

def download(url, name):
    path = DATA_DIR / f'{name}.pdf'
    if path.exists():
        return path
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/pdf,*/*',
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        if not data.startswith(b'%PDF'):
            return None
        with open(path, 'wb') as f:
            f.write(data)
        return path
    except Exception as e:
        print(f'  ERROR: {e}')
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
        if not pts:
            # Older format: (Max N p) or just points
            max_match = re.search(r'\(Max\s+(\d+)\s*p\)', content, re.IGNORECASE)
            if max_match:
                # Old NP format (pre-2017): use max points as E-points
                e_pts = int(max_match.group(1))
                c_pts, a_pts = 0, 0
            else:
                continue
        else:
            e_pts, c_pts, a_pts = int(pts.group(1)), int(pts.group(2)), int(pts.group(3))
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
    for url, course, year, term, name in NP_PDFS:
        path = DATA_DIR / f'{name}.pdf'
        cached = path.exists()
        print(f'[{name}] {"(cached)" if cached else "downloading..."}', end=' ', flush=True)
        if not cached:
            path = download(url, name)
            if not path:
                print('FAILED')
                continue
        qs = parse(path, course, year, term, name)
        for q in qs:
            q['source_url'] = url
        all_questions.extend(qs)
        print(f'{len(qs)} questions')
    out = DATA_DIR / 'all-np-questions-mathleaks.json'
    json.dump(all_questions, open(out, 'w'), indent=2, ensure_ascii=False)
    print(f'\nTotal: {len(all_questions)} questions')

if __name__ == '__main__':
    main()