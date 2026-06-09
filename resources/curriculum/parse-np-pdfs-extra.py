#!/usr/bin/env python3
"""
Download and parse remaining NP PDFs for Matematik 1, 2, 3.
Sources: matteboken.se (Matte 1) + arkiv.edusci.umu.se (Matte 2-3).
"""
import re, os, sys, json
import urllib.request
import subprocess
from pathlib import Path

DATA_DIR = Path(__file__).parent / 'np-pdfs'
os.makedirs(DATA_DIR, exist_ok=True)

# All NP PDFs to download
# Format: (url, course-slug, year, term, name)
NP_PDFS = [
    # Matematik 1a/1b/1c — vt22 (matteboken.se)
    ('https://www.matteboken.se/media/0mhowbwm/vt-2022-ma-1a_delprov-b-d_230907.pdf', 'matematik-1', '2022', 'vt', 'Ma1a-vt22'),
    ('https://www.matteboken.se/media/yn5btxze/ma1b-vt22-b-d.pdf', 'matematik-1', '2022', 'vt', 'Ma1b-vt22'),
    ('https://www.matteboken.se/media/fs2fq4zb/ma1c-vt22-b-d.pdf', 'matematik-1', '2022', 'vt', 'Ma1c-vt22'),
    # Matematik 1a/1b/1c — exempelprov 2017 + bedömning
    ('https://www.matteboken.se/media/2019274/exempelprov-2017-matte-1a-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1a-2017ex'),
    ('https://www.matteboken.se/media/2019275/exempelprov-2017-matte-1b-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1b-2017ex'),
    ('https://www.matteboken.se/media/2019276/exempelprov-2017-matte-1c-delprov-b-c-och-facit_red.pdf', 'matematik-1', '2017', 'vt', 'Ma1c-2017ex'),
    # Matematik 1a/1b/1c — ht16
    ('https://www.matteboken.se/media/2019267/np-matte-1a-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1a-ht16'),
    ('https://www.matteboken.se/media/2019268/np-matte-1b-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1b-ht16'),
    ('https://www.matteboken.se/media/2019269/np-matte-1c-ht16-delprov-b-d-och-facit_red.pdf', 'matematik-1', '2016', 'ht', 'Ma1c-ht16'),
    # Matematik 1a/1b/1c — vt16
    ('https://www.matteboken.se/media/tpugttuk/kpvt-2016-ma-1a-delprov-b-d.pdf', 'matematik-1', '2016', 'vt', 'Ma1a-vt16'),
    ('https://www.matteboken.se/media/vbwlcasr/kpvt-2016-ma-1b-delprov-b-d.pdf', 'matematik-1', '2016', 'vt', 'Ma1b-vt16'),
    ('https://www.matteboken.se/media/14gdr5mu/kpvt-2016-ma-1c-delprov-b-d.pdf', 'matematik-1', '2016', 'vt', 'Ma1c-vt16'),
    # Matematik 2 — extra (vt16, vt15)
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt16.pdf', 'matematik-2', '2016', 'vt', 'Ma2a-vt16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt16.pdf', 'matematik-2', '2016', 'vt', 'Ma2b-vt16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt16.pdf', 'matematik-2', '2016', 'vt', 'Ma2c-vt16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt15.pdf', 'matematik-2', '2015', 'vt', 'Ma2a-vt15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt15.pdf', 'matematik-2', '2015', 'vt', 'Ma2b-vt15'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt15.pdf', 'matematik-2', '2015', 'vt', 'Ma2c-vt15'),
    # Matematik 3 — extra (ht16, vt16, ht15, vt15, ht14, vt14)
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-ht16.pdf', 'matematik-3', '2016', 'ht', 'Ma3b-ht16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-ht16.pdf', 'matematik-3', '2016', 'ht', 'Ma3c-ht16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3b-vt16.pdf', 'matematik-3', '2016', 'vt', 'Ma3b-vt16'),
    ('https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma3c-vt16.pdf', 'matematik-3', '2016', 'vt', 'Ma3c-vt16'),
]

def download_pdf(url, name):
    path = DATA_DIR / f'{name}.pdf'
    if path.exists():
        return path
    try:
        # Use urllib with custom User-Agent
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/pdf,*/*',
        })
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(path, 'wb') as f:
                f.write(response.read())
        return path
    except Exception as e:
        return None

def parse_np_pdf(pdf_path, course, year, term, name):
    result = subprocess.run(['pdftotext', str(pdf_path), '-'], capture_output=True, text=True)
    if result.returncode != 0:
        return []
    
    text = result.stdout
    questions = []
    
    # Split by question numbers (lines that are just digits)
    blocks = re.split(r'\n(?=\d+\.?\s*\n)', text)
    
    for block in blocks:
        m = re.match(r'^(\d+)\.?\s*\n(.*?)(?=\n\d+\.?\s*\n|\Z)', block, re.DOTALL)
        if not m:
            continue
        q_num = int(m.group(1))
        if q_num > 50 or q_num < 1:  # Sanity check
            continue
        content = m.group(2).strip()
        
        # Extract E/C/A points
        pts = re.search(r'\((\d+)/(\d+)/(\d+)\)', content)
        if not pts:
            continue
        e_pts, c_pts, a_pts = int(pts.group(1)), int(pts.group(2)), int(pts.group(3))
        
        # Clean
        content = re.sub(r'_+\s*', '', content)
        content = re.sub(r'\(\d+/\d+/\d+\)\s*', '', content)
        content = re.sub(r'\s+\n', '\n', content)
        content = content.strip()
        
        if len(content) < 25:
            continue
        
        questions.append({
            'question_num': q_num,
            'content': content[:1500],
            'e_points': e_pts,
            'c_points': c_pts,
            'a_points': a_pts,
            'year': year,
            'term': term,
            'course': course,
            'source_pdf': name,
        })
    
    return questions

def main():
    print(f'Downloading and parsing {len(NP_PDFS)} NP PDFs...\n')
    all_questions = []
    
    for url, course, year, term, name in NP_PDFS:
        pdf_path = DATA_DIR / f'{name}.pdf'
        cached = pdf_path.exists()
        print(f'[{name}] {"(cached)" if cached else "downloading..."}', end=' ', flush=True)
        
        if not cached:
            pdf_path = download_pdf(url, name)
            if not pdf_path:
                print('FAILED')
                continue
        
        questions = parse_np_pdf(pdf_path, course, year, term, name)
        for q in questions:
            q['source_url'] = url
        all_questions.extend(questions)
        print(f'{len(questions)} questions')
    
    out_path = DATA_DIR / 'all-np-questions-extra.json'
    json.dump(all_questions, open(out_path, 'w'), indent=2, ensure_ascii=False)
    print(f'\nTotal new: {len(all_questions)} questions saved to {out_path}')

if __name__ == '__main__':
    main()