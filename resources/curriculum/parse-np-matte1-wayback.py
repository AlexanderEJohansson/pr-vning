#!/usr/bin/env python3
"""Download Matematik 1 NP PDFs via Wayback Machine."""
import re, os, json
import urllib.request
import subprocess
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'np-pdfs'

# (wayback_url, course, year, term, name)
NP_PDFS = [
    ('http://web.archive.org/web/20250823031130id_/https://www.matteboken.se/media/2019267/np-matte-1a-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1a-ht16-mb'),
    ('http://web.archive.org/web/20250823034804id_/https://www.matteboken.se/media/2019268/np-matte-1b-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1b-ht16-mb'),
    ('http://web.archive.org/web/20250823025920id_/https://www.matteboken.se/media/2019269/np-matte-1c-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1c-ht16-mb'),
    ('http://web.archive.org/web/20240713172927id_/https://www.matteboken.se/media/2019274/exempelprov-2017-matte-1a-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1a-2017ex-mb'),
    ('http://web.archive.org/web/20240721033953id_/https://www.matteboken.se/media/2019275/exempelprov-2017-matte-1b-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1b-2017ex-mb'),
    ('http://web.archive.org/web/20240719095411id_/https://www.matteboken.se/media/2019276/exempelprov-2017-matte-1c-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1c-2017ex-mb'),
]

def download(url, name):
    path = DATA_DIR / f'{name}.pdf'
    if path.exists() and path.stat().st_size > 50000:
        return path
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    })
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = r.read()
        if not data.startswith(b'%PDF'):
            return None
        with open(path, 'wb') as f:
            f.write(data)
        return path
    except Exception as e:
        print(f' ERR {e}', end='')
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
                e_pts = int(max_match.group(1)); c_pts, a_pts = 0, 0
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
    for url, course, year, term, name in NP_PDFS:
        path = DATA_DIR / f'{name}.pdf'
        cached = path.exists() and path.stat().st_size > 50000
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
        print(f'{len(qs)} q')
    out = DATA_DIR / 'all-np-questions-matte1.json'
    json.dump(all_questions, open(out, 'w'), indent=2, ensure_ascii=False)
    print(f'\nTotal Ma1: {len(all_questions)}')

if __name__ == '__main__':
    main()